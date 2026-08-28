import { defineEventHandler, getQuery } from 'h3';
import { db } from '~/server/db';
import { ippEvaluations, spbeEvaluations } from '~/server/db/schema';
import { sql, ilike, and, or, not } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const search = (query.q as string)?.trim() || '';
    const typeFilter = (query.type as string) || 'pemda'; // 'all' | 'pemda' | 'kl'

    // Condition builder for Pemda vs KL
    const isPemdaIpp = or(
      ilike(ippEvaluations.nama, 'Pemerintah Provinsi%'),
      ilike(ippEvaluations.nama, 'Pemerintah Kabupaten%'),
      ilike(ippEvaluations.nama, 'Pemerintah Kab%'),
      ilike(ippEvaluations.nama, 'Pemerintah Kota%')
    );

    const isPemdaSpbe = or(
      ilike(spbeEvaluations.nama, 'Pemerintah Provinsi%'),
      ilike(spbeEvaluations.nama, 'Pemerintah Kabupaten%'),
      ilike(spbeEvaluations.nama, 'Pemerintah Kab%'),
      ilike(spbeEvaluations.nama, 'Pemerintah Kota%')
    );

    // Fetch IPP list
    let ippConditions: any[] = [];
    if (search) {
      ippConditions.push(ilike(ippEvaluations.nama, `%${search}%`));
    }
    if (typeFilter === 'pemda') {
      ippConditions.push(isPemdaIpp);
    } else if (typeFilter === 'kl') {
      ippConditions.push(not(isPemdaIpp));
    }

    const ippList = await db
      .select({
        id: ippEvaluations.id,
        nama: ippEvaluations.nama,
        ipp_predikat: ippEvaluations.ippPredikat,
        tahun: ippEvaluations.tahun,
        category: sql<string>`
          CASE 
            WHEN nama ILIKE 'Pemerintah Provinsi%' THEN 'Pemerintah Provinsi'
            WHEN nama ILIKE 'Pemerintah Kabupaten%' OR nama ILIKE 'Pemerintah Kab%' THEN 'Pemerintah Kabupaten'
            WHEN nama ILIKE 'Pemerintah Kota%' THEN 'Pemerintah Kota'
            ELSE 'Kementerian / Lembaga (Pusat - DKI Jakarta)'
          END
        `
      })
      .from(ippEvaluations)
      .where(ippConditions.length > 0 ? and(...ippConditions) : undefined)
      .limit(200);

    // Fetch SPBE list
    let spbeConditions: any[] = [];
    if (search) {
      spbeConditions.push(ilike(spbeEvaluations.nama, `%${search}%`));
    }
    if (typeFilter === 'pemda') {
      spbeConditions.push(isPemdaSpbe);
    } else if (typeFilter === 'kl') {
      spbeConditions.push(not(isPemdaSpbe));
    }

    const spbeList = await db
      .select({
        id: spbeEvaluations.id,
        nama: spbeEvaluations.nama,
        spbe_predikat: spbeEvaluations.spbePredikat,
        tahun: spbeEvaluations.tahun,
        category: sql<string>`
          CASE 
            WHEN nama ILIKE 'Pemerintah Provinsi%' THEN 'Pemerintah Provinsi'
            WHEN nama ILIKE 'Pemerintah Kabupaten%' OR nama ILIKE 'Pemerintah Kab%' THEN 'Pemerintah Kabupaten'
            WHEN nama ILIKE 'Pemerintah Kota%' THEN 'Pemerintah Kota'
            ELSE 'Kementerian / Lembaga (Pusat - DKI Jakarta)'
          END
        `
      })
      .from(spbeEvaluations)
      .where(spbeConditions.length > 0 ? and(...spbeConditions) : undefined)
      .limit(200);

    // Total counts breakdown
    const [ippTotalAll] = await db.select({ count: sql<number>`count(*)::int` }).from(ippEvaluations);
    const [spbeTotalAll] = await db.select({ count: sql<number>`count(*)::int` }).from(spbeEvaluations);

    const [ippTotalPemda] = await db.select({ count: sql<number>`count(*)::int` }).from(ippEvaluations).where(isPemdaIpp);
    const [spbeTotalPemda] = await db.select({ count: sql<number>`count(*)::int` }).from(spbeEvaluations).where(isPemdaSpbe);

    const ippStats = await db
      .select({
        predikat: ippEvaluations.ippPredikat,
        count: sql<number>`count(*)::int`
      })
      .from(ippEvaluations)
      .where(typeFilter === 'pemda' ? isPemdaIpp : (typeFilter === 'kl' ? not(isPemdaIpp) : undefined))
      .groupBy(ippEvaluations.ippPredikat);

    const spbeStats = await db
      .select({
        predikat: spbeEvaluations.spbePredikat,
        count: sql<number>`count(*)::int`
      })
      .from(spbeEvaluations)
      .where(typeFilter === 'pemda' ? isPemdaSpbe : (typeFilter === 'kl' ? not(isPemdaSpbe) : undefined))
      .groupBy(spbeEvaluations.spbePredikat);

    return {
      success: true,
      data: {
        filter: typeFilter,
        totalIppAll: ippTotalAll.count,
        totalSpbeAll: spbeTotalAll.count,
        totalIppPemda: ippTotalPemda.count,
        totalSpbePemda: spbeTotalPemda.count,
        currentIppCount: ippList.length,
        currentSpbeCount: spbeList.length,
        ippStats,
        spbeStats,
        ippList,
        spbeList
      }
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Gagal memuat data evaluasi SPBE & IPP'
    };
  }
});
