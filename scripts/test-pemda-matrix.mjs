import postgres from 'postgres';
const sql = postgres('postgresql://makarti:SuperRahasia123%21@172.236.154.243:5432/makarti');

async function testPemda() {
  const pemdaStats = await sql`
    WITH unified AS (
      SELECT 
        COALESCE(i.nama, s.nama) as nama,
        i.ipp_predikat,
        s.spbe_predikat,
        CASE 
          WHEN COALESCE(i.nama, s.nama) ILIKE 'Pemerintah Provinsi%' THEN 'Pemerintah Provinsi'
          WHEN COALESCE(i.nama, s.nama) ILIKE 'Pemerintah Kabupaten%' OR COALESCE(i.nama, s.nama) ILIKE 'Pemerintah Kab%' THEN 'Pemerintah Kabupaten'
          WHEN COALESCE(i.nama, s.nama) ILIKE 'Pemerintah Kota%' THEN 'Pemerintah Kota'
          ELSE 'Kementerian / Lembaga (Pusat - Jakarta)'
        END as category,
        CASE
          WHEN s.spbe_predikat IN ('Memuaskan', 'Sangat Baik', 'Baik') AND i.ipp_predikat IN ('A', '-A') THEN 'q1'
          WHEN (s.spbe_predikat IN ('Cukup', 'Kurang') OR s.spbe_predikat IS NULL) AND i.ipp_predikat IN ('A', '-A') THEN 'q2'
          WHEN s.spbe_predikat IN ('Memuaskan', 'Sangat Baik', 'Baik') AND (i.ipp_predikat IN ('B', '-B', 'C') OR i.ipp_predikat IS NULL) THEN 'q3'
          ELSE 'q4'
        END as quadrant_code
      FROM kuesioner.ipp_evaluations i
      FULL OUTER JOIN kuesioner.spbe_evaluations s ON lower(trim(i.nama)) = lower(trim(s.nama))
    )
    SELECT 
      category,
      quadrant_code,
      count(*)::int as count
    FROM unified
    GROUP BY category, quadrant_code
    ORDER BY category, quadrant_code;
  `;
  console.log('Pemda vs KL Quadrant Matrix:', pemdaStats);

  await sql.end();
}

testPemda();
