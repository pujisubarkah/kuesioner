import { defineEventHandler, getQuery } from 'h3';
import { db } from '~/server/db';
import { ippEvaluations, spbeEvaluations } from '~/server/db/schema';
import { sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const search = ((query.q as string) || '').trim();
    const typeFilter = (query.type as string) || 'pemda'; // 'pemda' | 'kl' | 'all'
    const quadrantFilter = (query.quadrant as string) || 'all'; // 'all' | 'q1' | 'q2' | 'q3' | 'q4'

    // Fetch unified comparison list using FULL OUTER JOIN
    const rawData = await db.execute(sql`
      WITH unified AS (
        SELECT 
          COALESCE(i.nama, s.nama) as nama,
          i.ipp_predikat,
          s.spbe_predikat,
          COALESCE(i.tahun, s.tahun, '2025') as tahun,
          CASE 
            WHEN COALESCE(i.nama, s.nama) ILIKE 'Pemerintah Provinsi%' THEN 'Pemerintah Provinsi'
            WHEN COALESCE(i.nama, s.nama) ILIKE 'Pemerintah Kabupaten%' OR COALESCE(i.nama, s.nama) ILIKE 'Pemerintah Kab%' THEN 'Pemerintah Kabupaten'
            WHEN COALESCE(i.nama, s.nama) ILIKE 'Pemerintah Kota%' THEN 'Pemerintah Kota'
            ELSE 'Kementerian / Lembaga (Pusat - DKI Jakarta)'
          END as category,
          CASE
            WHEN s.spbe_predikat IN ('Memuaskan', 'Sangat Baik', 'Baik') AND i.ipp_predikat IN ('A', '-A') THEN 'q1'
            WHEN (s.spbe_predikat IN ('Cukup', 'Kurang') OR s.spbe_predikat IS NULL) AND i.ipp_predikat IN ('A', '-A') THEN 'q2'
            WHEN s.spbe_predikat IN ('Memuaskan', 'Sangat Baik', 'Baik') AND (i.ipp_predikat IN ('B', '-B', 'C') OR i.ipp_predikat IS NULL) THEN 'q3'
            ELSE 'q4'
          END as quadrant_code,
          CASE
            WHEN s.spbe_predikat IN ('Memuaskan', 'Sangat Baik', 'Baik') AND i.ipp_predikat IN ('A', '-A') THEN 'Kuadran I: Digital Exemplar'
            WHEN (s.spbe_predikat IN ('Cukup', 'Kurang') OR s.spbe_predikat IS NULL) AND i.ipp_predikat IN ('A', '-A') THEN 'Kuadran II: Human-Heroic'
            WHEN s.spbe_predikat IN ('Memuaskan', 'Sangat Baik', 'Baik') AND (i.ipp_predikat IN ('B', '-B', 'C') OR i.ipp_predikat IS NULL) THEN 'Kuadran III: Digital Silo / Adoption Gap'
            ELSE 'Kuadran IV: Priority Scaffolding / 3T'
          END as quadrant_title,
          CASE
            WHEN s.spbe_predikat IN ('Memuaskan', 'Sangat Baik', 'Baik') AND i.ipp_predikat IN ('A', '-A') THEN 'Digital Era Governance (Dunleavy et al., 2006; Bovens & Zouridis, 2002)'
            WHEN (s.spbe_predikat IN ('Cukup', 'Kurang') OR s.spbe_predikat IS NULL) AND i.ipp_predikat IN ('A', '-A') THEN 'Street-Level Bureaucracy & Situated CoP (Lipsky, 2010; Lave & Wenger, 1991)'
            WHEN s.spbe_predikat IN ('Memuaskan', 'Sangat Baik', 'Baik') AND (i.ipp_predikat IN ('B', '-B', 'C') OR i.ipp_predikat IS NULL) THEN 'Design-Actuality Gap & UTAUT2 (Heeks, 2006; Venkatesh et al., 2012)'
            ELSE 'Instructional Scaffolding & E-Learning 3T (Agustyarsyah et al., 2025; Vygotsky, 1978)'
          END as quadrant_theory,
          CASE
            WHEN s.spbe_predikat IN ('Memuaskan', 'Sangat Baik', 'Baik') AND i.ipp_predikat IN ('A', '-A') THEN 'Smart MPP, Predictive AI Service, & Big Data SPBE'
            WHEN (s.spbe_predikat IN ('Cukup', 'Kurang') OR s.spbe_predikat IS NULL) AND i.ipp_predikat IN ('A', '-A') THEN 'Transisi Digital Bertahap, Mobile SOP, & Standardisasi Layanan'
            WHEN s.spbe_predikat IN ('Memuaskan', 'Sangat Baik', 'Baik') AND (i.ipp_predikat IN ('B', '-B', 'C') OR i.ipp_predikat IS NULL) THEN 'UX Pelayanan Publik, Komunikasi Empatis, & Manajemen Komplain'
            ELSE 'Standar Pelayanan Minimal (SPM) Dasar & Layanan Jemput Bola 3T'
          END as recommended_module
        FROM kuesioner.ipp_evaluations i
        FULL OUTER JOIN kuesioner.spbe_evaluations s ON lower(trim(i.nama)) = lower(trim(s.nama))
      )
      SELECT *
      FROM unified
      ORDER BY nama ASC;
    `);

    let list = (rawData as any[]) || [];

    // Filter by type (pemda vs kl vs all)
    if (typeFilter === 'pemda') {
      list = list.filter((r) => r.category !== 'Kementerian / Lembaga (Pusat - DKI Jakarta)');
    } else if (typeFilter === 'kl') {
      list = list.filter((r) => r.category === 'Kementerian / Lembaga (Pusat - DKI Jakarta)');
    }

    // Compute quadrant counts before filtering by quadrant
    const quadrantCounts = {
      q1: list.filter((r) => r.quadrant_code === 'q1').length,
      q2: list.filter((r) => r.quadrant_code === 'q2').length,
      q3: list.filter((r) => r.quadrant_code === 'q3').length,
      q4: list.filter((r) => r.quadrant_code === 'q4').length,
      total: list.length
    };

    // Filter by quadrant if specified
    if (quadrantFilter !== 'all') {
      list = list.filter((r) => r.quadrant_code === quadrantFilter);
    }

    // Filter by search query if specified
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.nama?.toLowerCase().includes(q) ||
          r.category?.toLowerCase().includes(q) ||
          r.recommended_module?.toLowerCase().includes(q) ||
          r.quadrant_theory?.toLowerCase().includes(q)
      );
    }

    return {
      success: true,
      data: {
        filter: typeFilter,
        quadrantFilter,
        quadrantCounts,
        totalItems: list.length,
        items: list
      }
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Gagal memuat data matriks evaluasi SPBE & IPP'
    };
  }
});
