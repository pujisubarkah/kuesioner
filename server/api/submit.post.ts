import { getRequestIP, getRequestHeader } from 'h3';
import { db } from '../db';
import { responses } from '../db/schema';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body || !body.answers) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Data jawaban kuesioner tidak valid atau kosong.'
      });
    }

    // Capture Client IP Address automatically (supports Cloudflare, Nginx, H3)
    const rawIp = getRequestHeader(event, 'cf-connecting-ip') ||
                  getRequestHeader(event, 'x-real-ip') ||
                  getRequestIP(event, { xForwardedFor: true }) ||
                  event.node.req.socket?.remoteAddress || '';
    const firstIp = typeof rawIp === 'string' ? rawIp.split(',')[0].trim() : '';
    const clientIp = firstIp.replace(/^::ffff:/, '');

    // Check if IP is private / local loopback / docker bridge
    const isPrivateIp = !clientIp || 
      clientIp === '127.0.0.1' || 
      clientIp === '::1' || 
      clientIp.startsWith('10.') || 
      clientIp.startsWith('192.168.') || 
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(clientIp);

    // Lookup Geolocation based on IP (using ip-api.com)
    let geo = { city: '', regionName: '', country: '', lat: '', lon: '' };
    try {
      // If public IP, query specific IP; if private/local IP (dev mode), query server/tester public IP
      const geoUrl = isPrivateIp
        ? `http://ip-api.com/json/?fields=status,country,regionName,city,lat,lon`
        : `http://ip-api.com/json/${clientIp}?fields=status,country,regionName,city,lat,lon`;

      const geoRes = await fetch(geoUrl);
      if (geoRes.ok) {
        const geoData = await geoRes.json();
        if (geoData.status === 'success') {
          geo = {
            city: geoData.city || '',
            regionName: geoData.regionName || '',
            country: geoData.country || '',
            lat: geoData.lat != null ? String(geoData.lat) : '',
            lon: geoData.lon != null ? String(geoData.lon) : ''
          };
        }
      }
    } catch (err) {
      console.error('GeoIP lookup failed:', err);
    }

    const answers = body.answers || {};
    const id = body.id || `RESP-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const province = answers['q_1_prov'] || body.province || '';
    const regency = answers['q_1_kab'] || body.regency || '';

    const syncMatrix = answers['q_33'] || {};

    const toArray = (val: any) => Array.isArray(val) ? val : (val ? [val] : []);
    const toInt = (val: any) => typeof val === 'number' ? val : (parseInt(val, 10) || null);

    // Insert into PostgreSQL schema "kuesioner.responses" wide table
    const inserted = await db.insert(responses).values({
      id,
      ipAddress: clientIp,
      locationCity: geo.city,
      locationRegion: geo.regionName,
      locationCountry: geo.country,
      latitude: geo.lat,
      longitude: geo.lon,

      province,
      regency,
      areaType: answers['q_2'] || '',
      institutionType: answers['q_3'] || '',
      ageGroup: answers['q_4'] || '',
      workDuration: answers['q_5'] || '',
      hasElearning: answers['q_6'] || '',

      q7ElearningTypes: toArray(answers['q_7']),
      q8Platforms: toArray(answers['q_8']),

      q9MainDevice: answers['q_9'] || '',
      q10Locations: toArray(answers['q_10']),
      q11InternetSources: toArray(answers['q_11']),
      q12DisruptionFrequency: toInt(answers['q_12']),
      q13DisruptionTypes: toArray(answers['q_13']),
      q14DisruptionNarrative: answers['q_14'] || '',

      q15WorkloadOverlap: toInt(answers['q_15']),
      q16InterruptedByWork: toInt(answers['q_16']),
      q17SufficientTime: toInt(answers['q_17']),
      q18SupervisorSupport: toInt(answers['q_18']),
      q19LocationMobility: toInt(answers['q_19']),

      q20EasyAccess: toInt(answers['q_20']),
      q21FileSizeIssue: toInt(answers['q_21']),
      q22Relevance: toInt(answers['q_22']),
      q23PreferredFormats: toArray(answers['q_23']),
      q24FormatSuitability: toInt(answers['q_24']),

      q25QnaOpportunity: toInt(answers['q_25']),
      q26PeerInteraction: toInt(answers['q_26']),
      q27FocusLevel: toInt(answers['q_27']),
      q28InactivityReasons: toArray(answers['q_28']),

      q29BiggestProblemNarrative: answers['q_29'] || '',
      q30ChangeNarrative: answers['q_30'] || '',
      q31SpatialContextNarrative: answers['q_31'] || '',
      q32OrganizerNarrative: answers['q_32'] || '',

      q33SyncCameraOn: toInt(syncMatrix['Menyalakan kamera']),
      q33SyncCameraOff: toInt(syncMatrix['Mematikan kamera']),
      q33SyncMobile: toInt(syncMatrix['Menggunakan smartphone']),
      q33SyncMultitask: toInt(syncMatrix['Mengikuti sambil melakukan pekerjaan lain']),
      q33SyncLocationChange: toInt(syncMatrix['Berpindah tempat selama sesi']),
      q33SyncDisconnect: toInt(syncMatrix['Mengalami koneksi terputus']),

      answers: answers
    }).returning();

    return {
      success: true,
      message: 'Jawaban kuesioner berhasil disimpan ke database PostgreSQL (Schema: kuesioner).',
      data: inserted[0]
    };
  } catch (error: any) {
    console.error('Error saving questionnaire to PostgreSQL:', error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Gagal menyimpan ke database PostgreSQL.'
    });
  }
});

