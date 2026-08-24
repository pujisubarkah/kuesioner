<template>
  <div class="model-viewer-container">
    <!-- Banner Disertasi Header -->
    <div class="dissertation-banner">
      <div class="banner-top-badges">
        <span class="badge-tag academic">🎓 Kerangka Teori & Metodologi Disertasi</span>
        <span class="badge-tag fusion">🧠 Multimodal Fusion & Spatial Moderation</span>
      </div>
      <h2 class="banner-title">
        Model Behavioral Learning – Service Dynamics Fusion Multimodal untuk Personalisasi Pelatihan ASN yang Dimoderasi oleh Konteks Spasial
      </h2>
      <p class="banner-desc">
        Pemetaan empiris integratif antara instrumen kuesioner, vektor fitur kecerdasan buatan, variabel laten SEM-PLS/MRA, dan mesin rekomendasi personalisasi pembelajaran ASN.
      </p>
    </div>

    <!-- Live Empirical Index Scores from Active Dataset -->
    <div class="live-index-section">
      <div class="index-section-header">
        <div>
          <h4 class="section-title">📊 Indeks Diagnostik Empiris Data Lapangan Saat Ini</h4>
          <p class="section-sub">Skor teragregasi secara otomatis dari {{ responses.length }} respon ASN yang tersimpan di sistem.</p>
        </div>
        <div class="sample-badge">
          Sampel Aktif: <strong>{{ responses.length }} ASN</strong>
        </div>
      </div>

      <div class="index-cards-grid">
        <!-- 1. Spatial Constraint Index -->
        <div class="index-card border-purple">
          <div class="index-card-header">
            <span class="pillar-num">Pilar 5 (Moderator)</span>
            <span class="index-abbr">M_spatial</span>
          </div>
          <div class="index-val-row">
            <span class="index-val text-purple">{{ spatialConstraintIndex.toFixed(1) }}</span>
            <span class="index-scale">/ 100</span>
          </div>
          <div class="index-name">Spatial Infrastructure Constraint Index</div>
          <div class="index-progress-bg">
            <div class="index-progress-fill bg-purple" :style="{ width: `${spatialConstraintIndex}%` }"></div>
          </div>
          <p class="index-interpret">
            Tingkat hambatan geografis, blankspot sinyal, dan pemadaman listrik di lokasi tugas penugasan ASN (Q1, Q2, Q11-Q13).
          </p>
        </div>

        <!-- 2. Workload & Service Dynamics Index -->
        <div class="index-card border-red">
          <div class="index-card-header">
            <span class="pillar-num">Pilar 2 (Prediktor)</span>
            <span class="index-abbr">X_service</span>
          </div>
          <div class="index-val-row">
            <span class="index-val text-red">{{ serviceDynamicsIndex.toFixed(1) }}</span>
            <span class="index-scale">/ 100</span>
          </div>
          <div class="index-name">Workload & Service Friction Index</div>
          <div class="index-progress-bg">
            <div class="index-progress-fill bg-red" :style="{ width: `${serviceDynamicsIndex}%` }"></div>
          </div>
          <p class="index-interpret">
            Tingkat friksi beban kerja rutin, tugas mendadak/SPPD, dan defisit waktu khusus belajar kedinasan (Q15-Q18).
          </p>
        </div>

        <!-- 3. Behavioral Learning Dynamics Index -->
        <div class="index-card border-green">
          <div class="index-card-header">
            <span class="pillar-num">Pilar 1 (Prediktor)</span>
            <span class="index-abbr">X_behavior</span>
          </div>
          <div class="index-val-row">
            <span class="index-val text-green">{{ behavioralFrictionIndex.toFixed(1) }}</span>
            <span class="index-scale">/ 100</span>
          </div>
          <div class="index-name">Behavioral Multitasking & Drop Index</div>
          <div class="index-progress-bg">
            <div class="index-progress-fill bg-green" :style="{ width: `${behavioralFrictionIndex}%` }"></div>
          </div>
          <p class="index-interpret">
            Frekuensi perilaku multitasking, mematikan kamera saat zoom, dan ketergantungan layar ponsel (Q9, Q27, Q33).
          </p>
        </div>

        <!-- 4. Multimodal Format Readiness Index -->
        <div class="index-card border-amber">
          <div class="index-card-header">
            <span class="pillar-num">Pilar 3 (Engine Fusi)</span>
            <span class="index-abbr">F_multimodal</span>
          </div>
          <div class="index-val-row">
            <span class="index-val text-amber">{{ multimodalDemandIndex.toFixed(1) }}</span>
            <span class="index-scale">/ 100</span>
          </div>
          <div class="index-name">Lightweight Multimodal Need Index</div>
          <div class="index-progress-bg">
            <div class="index-progress-fill bg-amber" :style="{ width: `${multimodalDemandIndex}%` }"></div>
          </div>
          <p class="index-interpret">
            Kebutuhan fusi modalitas ringan (infografis ringkas, podcast audio, video kompresi rendah) vs modul PDF tebal (Q21, Q23, Q24).
          </p>
        </div>

        <!-- 5. Personalization Urgency Index -->
        <div class="index-card border-blue">
          <div class="index-card-header">
            <span class="pillar-num">Pilar 4 (Target Output)</span>
            <span class="index-abbr">Y_personalization</span>
          </div>
          <div class="index-val-row">
            <span class="index-val text-blue">{{ personalizationUrgencyIndex.toFixed(1) }}</span>
            <span class="index-scale">/ 100</span>
          </div>
          <div class="index-name">Personalization Demand Index</div>
          <div class="index-progress-bg">
            <div class="index-progress-fill bg-blue" :style="{ width: `${personalizationUrgencyIndex}%` }"></div>
          </div>
          <p class="index-interpret">
            Tingkat urgensi rekomendasi materi adaptif tupoksi, mentoring interaktif, dan fleksibilitas durasi micro-learning (Q22, Q25, Q30, Q32).
          </p>
        </div>
      </div>
    </div>

    <!-- Interactive 5-Pillar Architecture Diagram -->
    <div class="model-architecture-card">
      <div class="arch-header">
        <h4 class="section-title">🏛️ Diagram Alur Model Fusi & Moderasi Spasial</h4>
        <p class="section-sub">Klik salah satu blok pilar untuk melihat formulasi matematis, variabel laten, dan rincian fitur AI.</p>
      </div>

      <div class="pillars-flow-grid">
        <!-- Input Layer 1: Behavioral -->
        <div 
          :class="['pillar-flow-box border-green', activePillarDetail === 'behavior' ? 'selected' : '']"
          @click="activePillarDetail = 'behavior'"
        >
          <div class="flow-step-tag">INPUT VECTOR 1</div>
          <h5 class="flow-title">1. Behavioral Learning Dynamics</h5>
          <div class="formula-badge">X_behavior = [Dev, Loc, Foc, Sync_behav]</div>
          <ul class="flow-features">
            <li>Ketergantungan Mobile/Laptop (Q9)</li>
            <li>Fokus & Atensi Belajar (Q27)</li>
            <li>Matriks Zoom Sync: Off-Cam & Multitask (Q33)</li>
          </ul>
        </div>

        <!-- Plus connector -->
        <div class="flow-operator">+</div>

        <!-- Input Layer 2: Service -->
        <div 
          :class="['pillar-flow-box border-red', activePillarDetail === 'service' ? 'selected' : '']"
          @click="activePillarDetail = 'service'"
        >
          <div class="flow-step-tag">INPUT VECTOR 2</div>
          <h5 class="flow-title">2. Service Dynamics</h5>
          <div class="formula-badge">X_service = [Overlap, Interrupt, Time, Support]</div>
          <ul class="flow-features">
            <li>Tumpang Tindih Beban Kerja (Q15)</li>
            <li>Interupsi Tugas Mendadak/SPPD (Q16)</li>
            <li>Dukungan Atasan & Izin Belajar (Q18)</li>
          </ul>
        </div>

        <!-- Arrow connector -->
        <div class="flow-operator">➔</div>

        <!-- Multimodal Fusion Engine -->
        <div 
          :class="['pillar-flow-box border-amber center-fusion', activePillarDetail === 'fusion' ? 'selected' : '']"
          @click="activePillarDetail = 'fusion'"
        >
          <div class="flow-step-tag">FUSION ENGINE</div>
          <h5 class="flow-title">3. Multimodal Fusion Engine</h5>
          <div class="formula-badge">Z = Fusion(W_t * X_t + W_a * X_a + W_v * X_v)</div>
          <ul class="flow-features">
            <li>Pembobotan Dinamis Modalitas</li>
            <li>Teks Ringkas, Audio Podcast, Video Mikro (Q23)</li>
            <li>Adaptasi Kendala Kuota & File (Q21, Q24)</li>
          </ul>
        </div>

        <!-- Arrow connector -->
        <div class="flow-operator">➔</div>

        <!-- Personalization Output -->
        <div 
          :class="['pillar-flow-box border-blue', activePillarDetail === 'personalization' ? 'selected' : '']"
          @click="activePillarDetail = 'personalization'"
        >
          <div class="flow-step-tag">TARGET OUTPUT</div>
          <h5 class="flow-title">4. Personalisasi Pelatihan</h5>
          <div class="formula-badge">Y_opt = ArgMax Policy(Z | Context)</div>
          <ul class="flow-features">
            <li>Micro-learning Learning Path (Q30)</li>
            <li>Materi Kontekstual Tupoksi (Q22)</li>
            <li>Mode Akses Offline & On-Demand (Q32)</li>
          </ul>
        </div>
      </div>

      <!-- Moderator Layer (Spatial Context) -->
      <div class="moderator-layer">
        <div class="moderator-arrow-up">▲ Dimoderasi Oleh (Moderating Matrix) ▲</div>
        <div 
          :class="['moderator-box border-purple', activePillarDetail === 'spatial' ? 'selected' : '']"
          @click="activePillarDetail = 'spatial'"
        >
          <div class="moderator-inner-header">
            <div>
              <span class="flow-step-tag purple">MODERATING VARIABLE</span>
              <h5 class="flow-title">5. Konteks Spasial & Infrastruktur Wilayah Penugasan</h5>
            </div>
            <div class="formula-badge">M_spatial = [Geotype, Sinyal, Listrik, Mobilitas]</div>
          </div>
          <div class="moderator-desc-row">
            <span>🗺️ Tipologi Spasial: Kepulauan, Perbatasan, 3T, Perdesaan, Perkotaan (Q1, Q2)</span>
            <span>⚡ Infrastruktur: Frekuensi Gangguan Sinyal & Listrik (Q11, Q12, Q13)</span>
            <span>🚗 Mobilitas Lapangan (Q19)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Detail Deep-Dive Card -->
    <div class="pillar-deep-dive card">
      <div class="deep-dive-header" :style="{ borderLeftColor: currentDetailObj.color }">
        <span class="detail-tag" :style="{ background: currentDetailObj.color + '20', color: currentDetailObj.color }">
          {{ currentDetailObj.tag }}
        </span>
        <h3 class="detail-title">{{ currentDetailObj.title }}</h3>
        <p class="detail-lead">{{ currentDetailObj.lead }}</p>
      </div>

      <div class="deep-dive-grid">
        <div class="deep-card">
          <h5 class="deep-card-title">📐 Peran dalam Model Matematis & AI</h5>
          <p class="deep-card-text">{{ currentDetailObj.roleAi }}</p>
          <div class="code-box">
            <code>{{ currentDetailObj.formula }}</code>
          </div>
        </div>

        <div class="deep-card">
          <h5 class="deep-card-title">📋 Indikator Kuesioner Terkait</h5>
          <ul class="deep-indicator-list">
            <li v-for="(ind, iIdx) in currentDetailObj.indicators" :key="iIdx">
              <strong>{{ ind.code }}:</strong> {{ ind.desc }}
            </li>
          </ul>
        </div>

        <div class="deep-card">
          <h5 class="deep-card-title">📖 Panduan Naskah Disertasi</h5>
          <p class="deep-card-text">{{ currentDetailObj.dissertationGuide }}</p>
        </div>
      </div>
    </div>

    <!-- Variable Mapping Table (Kuesioner to SEM-PLS & AI Embedding) -->
    <div class="mapping-table-card card">
      <div class="table-header-row">
        <div>
          <h4 class="section-title">📑 Matriks Pemetaan Butir Kuesioner ke Model Disertasi</h4>
          <p class="section-sub">Daftar konstruk laten, instrumen butir survei, dan perannya dalam pemodelan kuantitatif & AI.</p>
        </div>
      </div>

      <div class="table-responsive">
        <table class="academic-table">
          <thead>
            <tr>
              <th>Pilar / Konstruk Disertasi</th>
              <th>Simbol Variabel</th>
              <th>Butir Kuesioner</th>
              <th>Tipe Data / Skala</th>
              <th>Peran dalam Algoritma / Analisis</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in mappingRows" :key="row.pillar">
              <td class="fw-bold">{{ row.pillar }}</td>
              <td><code class="symbol-badge">{{ row.symbol }}</code></td>
              <td><span class="q-chips">{{ row.questions }}</span></td>
              <td>{{ row.scale }}</td>
              <td class="role-desc">{{ row.role }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { SurveyResponse } from '~/composables/useSurvey';

const props = defineProps<{
  responses: SurveyResponse[];
}>();

const activePillarDetail = ref<'behavior' | 'service' | 'fusion' | 'personalization' | 'spatial'>('spatial');

// 1. Spatial Constraint Index (0 - 100)
const spatialConstraintIndex = computed(() => {
  if (props.responses.length === 0) return 0;
  let totalScore = 0;
  props.responses.forEach(r => {
    let score = 0;
    // Area type weight
    const area = r.answers['q_2'];
    if (area === 'Wilayah kepulauan') score += 35;
    else if (area === 'Wilayah terpencil') score += 40;
    else if (area === 'Wilayah perbatasan') score += 30;
    else if (area === 'Perdesaan') score += 20;
    else score += 10;

    // Disruption frequency (Q12) scale 1-5
    const q12 = Number(r.answers['q_12']) || 2;
    score += (q12 / 5) * 40;

    // Mobility (Q19) scale 1-5
    const q19 = Number(r.answers['q_19']) || 2;
    score += (q19 / 5) * 20;

    totalScore += score;
  });
  return Math.min(Math.max(totalScore / props.responses.length, 0), 100);
});

// 2. Service Dynamics & Workload Index (0 - 100)
const serviceDynamicsIndex = computed(() => {
  if (props.responses.length === 0) return 0;
  let totalScore = 0;
  props.responses.forEach(r => {
    const q15 = Number(r.answers['q_15']) || 3; // Workload overlap
    const q16 = Number(r.answers['q_16']) || 3; // Interrupted by work
    const q17Inv = 6 - (Number(r.answers['q_17']) || 3); // Sufficient time (inverted)
    const q18Inv = 6 - (Number(r.answers['q_18']) || 3); // Supervisor support (inverted)

    const avgFriction = (q15 + q16 + q17Inv + q18Inv) / 4;
    totalScore += (avgFriction / 5) * 100;
  });
  return Math.min(Math.max(totalScore / props.responses.length, 0), 100);
});

// 3. Behavioral Friction Index (0 - 100)
const behavioralFrictionIndex = computed(() => {
  if (props.responses.length === 0) return 0;
  let totalScore = 0;
  props.responses.forEach(r => {
    let score = 0;
    // Mobile device usage (Q9)
    if (r.answers['q_9'] === 'Smartphone') score += 25;
    else if (r.answers['q_9'] === 'Tablet') score += 15;
    else score += 5;

    // Inactivity reasons (Q28)
    const q28 = r.answers['q_28'];
    if (Array.isArray(q28)) score += Math.min(q28.length * 5, 20);

    // Zoom matrix (Q33)
    if (r.answers['q_33']) {
      const offCam = Number(r.answers['q_33']['Mematikan kamera']) || 2;
      const multitask = Number(r.answers['q_33']['Mengikuti sambil melakukan pekerjaan lain']) || 2;
      score += ((offCam + multitask) / 10) * 55;
    } else {
      score += 25;
    }

    totalScore += score;
  });
  return Math.min(Math.max(totalScore / props.responses.length, 0), 100);
});

// 4. Multimodal Demand Index (0 - 100)
const multimodalDemandIndex = computed(() => {
  if (props.responses.length === 0) return 0;
  let totalScore = 0;
  props.responses.forEach(r => {
    const q21 = Number(r.answers['q_21']) || 3; // File size issues
    const q24Inv = 6 - (Number(r.answers['q_24']) || 3); // Format suitability
    const formats = r.answers['q_23'];
    let formatWeight = 20;
    if (Array.isArray(formats)) {
      if (formats.includes('Modul ringkas / infografis') || formats.includes('Podcast / audio')) {
        formatWeight += 15;
      }
    }
    const score = ((q21 + q24Inv) / 10) * 65 + formatWeight;
    totalScore += score;
  });
  return Math.min(Math.max(totalScore / props.responses.length, 0), 100);
});

// 5. Personalization Urgency Index (0 - 100)
const personalizationUrgencyIndex = computed(() => {
  if (props.responses.length === 0) return 0;
  let totalScore = 0;
  props.responses.forEach(r => {
    const q22Inv = 6 - (Number(r.answers['q_22']) || 3); // Relevance
    const q25Inv = 6 - (Number(r.answers['q_25']) || 3); // QnA opportunity
    const q26Inv = 6 - (Number(r.answers['q_26']) || 3); // Peer interaction
    const hasAspiration = (r.answers['q_30'] && r.answers['q_30'].length > 10) ? 20 : 5;

    const score = ((q22Inv + q25Inv + q26Inv) / 15) * 80 + hasAspiration;
    totalScore += score;
  });
  return Math.min(Math.max(totalScore / props.responses.length, 0), 100);
});

// Detailed Pillar Descriptions
const pillarDetails: Record<string, any> = {
  spatial: {
    tag: 'VARIABEL MODERATOR',
    title: 'Konteks Spasial & Infrastruktur (M_spatial)',
    color: '#8B5CF6',
    lead: 'Memoderasi kekuatan hubungan antara dinamika perilaku belajar dan beban kedinasan terhadap efektivitas personalisasi.',
    roleAi: 'Menjadi pembobot matriks atensi (Spatial Attention Weights) atau layer kontekstual dalam Graph Neural Network / Transformer.',
    formula: 'M_spatial = σ( W_geo * Type + W_net * Signal + W_elec * Outage + W_mob * Mobility )',
    indicators: [
      { code: 'Q1 & Q2', desc: 'Sebaran Provinsi, Kab/Kota, dan Karakteristik Tipologi Wilayah (Perkotaan, 3T, Kepulauan, Perbatasan)' },
      { code: 'Q11, Q12, Q13', desc: 'Sumber internet, frekuensi gangguan sinyal/listrik, dan tipe hambatan teknis' },
      { code: 'Q19 & Q31', desc: 'Tingkat mobilitas lapangan dan narasi kondisi spesifik lokasi penugasan' }
    ],
    dissertationGuide: 'Digunakan di Bab 3 untuk hipotesis moderasi (H_mod) dan di Bab 4 untuk memvalidasi algoritma adaptif geospasial.'
  },
  behavior: {
    tag: 'VARIABEL PREDIKTOR 1',
    title: 'Behavioral Learning Dynamics (X_behavior)',
    color: '#10B981',
    lead: 'Menangkap pola perilaku interaksi, habituasi perangkat, keterlibatan (engagement), dan atensi belajar ASN.',
    roleAi: 'Menghasilkan User State Representation Vector (h_behavior) untuk mendeteksi kelelahan kognitif dan waktu ideal belajar.',
    formula: 'X_behavior = Concat( Device_emb, Location_emb, Zoom_multitask_score, Inactivity_factors )',
    indicators: [
      { code: 'Q9 & Q10', desc: 'Perangkat dominan (Smartphone vs Laptop) dan lokasi pembelajaran' },
      { code: 'Q27 & Q28', desc: 'Tingkat fokus/atensi dan alasan ketidakaktifan saat e-learning' },
      { code: 'Q33', desc: 'Matriks perilaku webinar synchronous (Off-Cam, Multitasking kedinasan, Sinyal drop)' }
    ],
    dissertationGuide: 'Membuktikan bahwa perilaku pasif (seperti kamera off) bukanlah ketidakmampuan, melainkan adaptasi terhadap beban/sinyal.'
  },
  service: {
    tag: 'VARIABEL PREDIKTOR 2',
    title: 'Service Dynamics / Beban Kedinasan (X_service)',
    color: '#EF4444',
    lead: 'Mengukur friksi birokrasi, tumpang tindih waktu kerja, dan kultur dukungan struktural pimpinan instansi.',
    roleAi: 'Menjadi batasan dinamis (Constraint Vector) pada sistem penjadwalan micro-learning dan interval pengiriman konten.',
    formula: 'X_service = [ Workload_Overlap, SPPD_Interruption, Dedicated_Time, Superior_Support ]',
    indicators: [
      { code: 'Q15 & Q16', desc: 'Tumpang tindih beban kerja kedinasan & interupsi tugas mendadak saat jam pelatihan' },
      { code: 'Q17 & Q18', desc: 'Ketersediaan alokasi waktu khusus dan izin/dukungan atasan langsung' },
      { code: 'Q3 & Q5', desc: 'Jenis instansi (Pusat/Prov/Kab) dan masa kerja ASN' }
    ],
    dissertationGuide: 'Menjelaskan akar masalah sistemik mengapa e-learning konvensional berdurasi panjang sering ditinggalkan ASN.'
  },
  fusion: {
    tag: 'ARSITEKTUR INTI FUSI',
    title: 'Multimodal Fusion Engine (F_multimodal)',
    color: '#F59E0B',
    lead: 'Mengintegrasikan berbagai modalitas materi (teks ringkas, audio podcast, video mikro, infografis) secara adaptif.',
    roleAi: 'Menggunakan Cross-Attention Fusion atau Gated Multimodal Unit (GMU) untuk memilih modalitas terbaik sesuai bandwidth & lokasi.',
    formula: 'Z_fused = GatedFusion( Text_emb, Audio_emb, Video_emb | Bandwidth_Constraint, Mobility_State )',
    indicators: [
      { code: 'Q21', desc: 'Kendala ukuran file besar & kuota internet terbatas' },
      { code: 'Q23', desc: 'Preferensi format konten (Infografis, Ringkasan Teks, Video pendek, Podcast audio)' },
      { code: 'Q24', desc: 'Kesesuaian format materi yang ada terhadap kondisi riil penugasan' }
    ],
    dissertationGuide: 'Merupakan kontribusi kebaruan (novelty) teknis model AI Anda dalam menangani disparitas bandwidth di Indonesia.'
  },
  personalization: {
    tag: 'TARGET OUTPUT',
    title: 'Personalisasi Pelatihan ASN (Y_personalization)',
    color: '#3B82F6',
    lead: 'Menghasilkan rekomendasi jalur belajar, durasi adaptif (micro-learning), materi relevan tupoksi, dan opsi offline caching.',
    roleAi: 'Contextual Bandit Recommender System atau Reinforcement Learning from Human Feedback (RLHF) untuk modul pelatihan ASN.',
    formula: 'Y_policy = Softmax( W_p * (Z_fused ⊙ M_spatial) + b )',
    indicators: [
      { code: 'Q22 & Q24', desc: 'Tingkat relevansi materi terhadap tugas riil & efektivitas modul' },
      { code: 'Q25 & Q26', desc: 'Kebutuhan tanya jawab, mentoring langsung, dan interaksi rekan sejawat' },
      { code: 'Q30 & Q32', desc: 'Narasi aspirasi perubahan sistem pelatihan & pemahaman penyelenggara LAN' }
    ],
    dissertationGuide: 'Menjadi rekomendasi kebijakan (*policy brief*) konkret bagi LAN RI dan BPSDM Kementerian/Daerah.'
  }
};

const currentDetailObj = computed(() => {
  return pillarDetails[activePillarDetail.value] || pillarDetails.spatial;
});

// Mapping Table Rows
const mappingRows = [
  {
    pillar: '1. Behavioral Learning',
    symbol: 'X_behavior',
    questions: 'Q9, Q10, Q27, Q28, Q33',
    scale: 'Kategorikal, Likert 1-5, Matrix 1-5',
    role: 'Fitur Input Status Peserta & Tingkat Atensi'
  },
  {
    pillar: '2. Service Dynamics',
    symbol: 'X_service',
    questions: 'Q3, Q5, Q15, Q16, Q17, Q18',
    scale: 'Kategorikal, Likert 1-5',
    role: 'Fitur Input Friksi Beban Kerja & Dukungan Atasan'
  },
  {
    pillar: '3. Multimodal Fusion Engine',
    symbol: 'F_multimodal',
    questions: 'Q21, Q23, Q24',
    scale: 'Multi-select, Likert 1-5',
    role: 'Mekanisme Pemilihan & Pembobotan Modalitas Konten'
  },
  {
    pillar: '4. Personalisasi Pelatihan',
    symbol: 'Y_personalization',
    questions: 'Q22, Q25, Q26, Q30, Q32',
    scale: 'Likert 1-5, Narasi Terbuka',
    role: 'Fungsi Target Optimasi Rekomendasi Pelatihan'
  },
  {
    pillar: '5. Konteks Spasial (Moderator)',
    symbol: 'M_spatial',
    questions: 'Q1, Q2, Q11, Q12, Q13, Q19, Q31',
    scale: 'Geospasial, Multi-select, Likert, Narasi',
    role: 'Variabel Moderator Laten & Attention Masking'
  }
];
</script>

<style scoped>
.model-viewer-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Banner */
.dissertation-banner {
  background: linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #311042 100%);
  color: #FFFFFF;
  padding: 1.75rem 2rem;
  border-radius: var(--radius-lg, 12px);
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.15);
}

.banner-top-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.badge-tag {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
}

.badge-tag.academic {
  background: rgba(139, 92, 246, 0.25);
  color: #C4B5FD;
  border: 1px solid rgba(196, 181, 253, 0.3);
}

.badge-tag.fusion {
  background: rgba(245, 158, 11, 0.25);
  color: #FCD34D;
  border: 1px solid rgba(252, 211, 77, 0.3);
}

.banner-title {
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.35;
  color: #F8FAFC;
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
}

.banner-desc {
  font-size: 0.875rem;
  color: #94A3B8;
  line-height: 1.6;
  max-width: 860px;
  margin: 0;
}

/* Live Index Section */
.live-index-section {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: var(--radius-lg, 12px);
  padding: 1.25rem 1.5rem;
}

.index-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0;
}

.section-sub {
  font-size: 0.8rem;
  color: #64748B;
  margin: 0.2rem 0 0 0;
}

.sample-badge {
  font-size: 0.8rem;
  background: #F1F5F9;
  color: #334155;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  border: 1px solid #CBD5E1;
}

.index-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1rem;
}

.index-card {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-top-width: 4px;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.border-purple { border-top-color: #8B5CF6; }
.border-red { border-top-color: #EF4444; }
.border-green { border-top-color: #10B981; }
.border-amber { border-top-color: #F59E0B; }
.border-blue { border-top-color: #3B82F6; }

.index-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}

.pillar-num {
  font-size: 0.675rem;
  font-weight: 700;
  color: #64748B;
  text-transform: uppercase;
}

.index-abbr {
  font-size: 0.65rem;
  font-family: monospace;
  font-weight: 700;
  background: #E2E8F0;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  color: #334155;
}

.index-val-row {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  margin-bottom: 0.2rem;
}

.index-val {
  font-size: 1.85rem;
  font-weight: 800;
}

.text-purple { color: #8B5CF6; }
.text-red { color: #EF4444; }
.text-green { color: #10B981; }
.text-amber { color: #D97706; }
.text-blue { color: #2563EB; }

.index-scale {
  font-size: 0.75rem;
  color: #94A3B8;
  font-weight: 600;
}

.index-name {
  font-size: 0.8rem;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.index-progress-bg {
  height: 6px;
  background: #E2E8F0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.6rem;
}

.index-progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.4s ease;
}

.bg-purple { background: #8B5CF6; }
.bg-red { background: #EF4444; }
.bg-green { background: #10B981; }
.bg-amber { background: #F59E0B; }
.bg-blue { background: #3B82F6; }

.index-interpret {
  font-size: 0.725rem;
  color: #64748B;
  line-height: 1.45;
  margin: 0;
}

/* Architecture Flow Diagram */
.model-architecture-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: var(--radius-lg, 12px);
  padding: 1.5rem;
}

.arch-header {
  margin-bottom: 1.5rem;
}

.pillars-flow-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1.15fr auto 1fr;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
}

@media (max-width: 1024px) {
  .pillars-flow-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}

.pillar-flow-box {
  background: #F8FAFC;
  border: 2px solid #E2E8F0;
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.pillar-flow-box:hover {
  transform: translateY(-2px);
  border-color: #94A3B8;
}

.pillar-flow-box.selected {
  border-color: #0F172A;
  background: #FFFFFF;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}

.flow-step-tag {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #64748B;
  margin-bottom: 0.35rem;
}

.flow-step-tag.purple {
  color: #8B5CF6;
}

.flow-title {
  font-size: 0.9rem;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 0.35rem;
  line-height: 1.3;
}

.formula-badge {
  font-family: monospace;
  font-size: 0.675rem;
  font-weight: 700;
  color: #1E293B;
  background: #E2E8F0;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  word-break: break-all;
}

.flow-features {
  font-size: 0.725rem;
  color: #475569;
  line-height: 1.4;
  padding-left: 1rem;
  margin: 0;
}

.flow-features li {
  margin-bottom: 0.2rem;
}

.flow-operator {
  font-size: 1.25rem;
  font-weight: 800;
  color: #94A3B8;
  text-align: center;
}

/* Moderator Layer */
.moderator-layer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.moderator-arrow-up {
  font-size: 0.75rem;
  font-weight: 800;
  color: #8B5CF6;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.moderator-box {
  width: 100%;
  background: #FAF5FF;
  border: 2px dashed #C084FC;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.moderator-box:hover {
  background: #F3E8FF;
}

.moderator-box.selected {
  border-style: solid;
  border-color: #8B5CF6;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
}

.moderator-inner-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.moderator-desc-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  font-size: 0.775rem;
  font-weight: 600;
  color: #6B21A8;
}

/* Deep Dive Card */
.pillar-deep-dive {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: var(--radius-lg, 12px);
  padding: 1.5rem;
}

.deep-dive-header {
  border-left: 5px solid #8B5CF6;
  padding-left: 1rem;
  margin-bottom: 1.25rem;
}

.detail-tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  margin-bottom: 0.35rem;
}

.detail-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 0.35rem;
}

.detail-lead {
  font-size: 0.875rem;
  color: #64748B;
  margin: 0;
  line-height: 1.5;
}

.deep-dive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.deep-card {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 1.1rem;
}

.deep-card-title {
  font-size: 0.85rem;
  font-weight: 800;
  color: #1E293B;
  margin-bottom: 0.6rem;
}

.deep-card-text {
  font-size: 0.825rem;
  color: #475569;
  line-height: 1.55;
  margin: 0 0 0.75rem 0;
}

.code-box {
  background: #0F172A;
  color: #38BDF8;
  padding: 0.6rem 0.75rem;
  border-radius: 6px;
  font-size: 0.775rem;
  font-family: monospace;
  overflow-x: auto;
}

.deep-indicator-list {
  font-size: 0.8rem;
  color: #334155;
  line-height: 1.5;
  padding-left: 1.1rem;
  margin: 0;
}

.deep-indicator-list li {
  margin-bottom: 0.4rem;
}

/* Mapping Table */
.mapping-table-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: var(--radius-lg, 12px);
  padding: 1.5rem;
}

.table-header-row {
  margin-bottom: 1rem;
}

.table-responsive {
  overflow-x: auto;
}

.academic-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.825rem;
  text-align: left;
}

.academic-table th {
  background: #F1F5F9;
  color: #334155;
  font-weight: 700;
  padding: 0.75rem 1rem;
  border-bottom: 2px solid #CBD5E1;
}

.academic-table td {
  padding: 0.8rem 1rem;
  border-bottom: 1px solid #E2E8F0;
  color: #475569;
}

.academic-table tr:hover td {
  background: #F8FAFC;
}

.symbol-badge {
  background: #EEF2FF;
  color: #4F46E5;
  font-weight: 700;
  padding: 0.2rem 0.45rem;
  border-radius: 4px;
  font-family: monospace;
}

.q-chips {
  font-weight: 600;
  color: #0F172A;
}

.role-desc {
  color: #1E293B;
  font-weight: 500;
}
</style>
