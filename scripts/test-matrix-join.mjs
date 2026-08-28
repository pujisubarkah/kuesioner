import postgres from 'postgres';
const sql = postgres('postgresql://makarti:SuperRahasia123%21@172.236.154.243:5432/makarti');

async function testJoin() {
  const matchDirect = await sql`
    SELECT 
      i.nama,
      i.ipp_predikat,
      s.spbe_predikat
    FROM kuesioner.ipp_evaluations i
    JOIN kuesioner.spbe_evaluations s ON lower(trim(i.nama)) = lower(trim(s.nama))
    LIMIT 10;
  `;
  console.log('Direct Name Match Sample (10):', matchDirect);

  const [totalDirectMatch] = await sql`
    SELECT count(*)::int as count
    FROM kuesioner.ipp_evaluations i
    JOIN kuesioner.spbe_evaluations s ON lower(trim(i.nama)) = lower(trim(s.nama));
  `;
  console.log('Total Exact Matches:', totalDirectMatch.count);

  // Check FULL OUTER JOIN or LEFT JOIN to see all entities
  const quadrantStats = await sql`
    WITH unified AS (
      SELECT 
        COALESCE(i.nama, s.nama) as nama,
        i.ipp_predikat,
        s.spbe_predikat,
        CASE 
          WHEN COALESCE(i.nama, s.nama) ILIKE 'Pemerintah Provinsi%' THEN 'Pemprov'
          WHEN COALESCE(i.nama, s.nama) ILIKE 'Pemerintah Kabupaten%' OR COALESCE(i.nama, s.nama) ILIKE 'Pemerintah Kab%' THEN 'Pemkab'
          WHEN COALESCE(i.nama, s.nama) ILIKE 'Pemerintah Kota%' THEN 'Pemkot'
          ELSE 'K/L (Pusat)'
        END as category,
        CASE
          WHEN s.spbe_predikat IN ('Memuaskan', 'Sangat Baik', 'Baik') AND i.ipp_predikat IN ('A', '-A') THEN 'Kuadran I: Digital Exemplar'
          WHEN (s.spbe_predikat IN ('Cukup', 'Kurang') OR s.spbe_predikat IS NULL) AND i.ipp_predikat IN ('A', '-A') THEN 'Kuadran II: Human-Heroic'
          WHEN s.spbe_predikat IN ('Memuaskan', 'Sangat Baik', 'Baik') AND (i.ipp_predikat IN ('B', '-B', 'C') OR i.ipp_predikat IS NULL) THEN 'Kuadran III: Digital Silo / Adoption Gap'
          ELSE 'Kuadran IV: Priority Scaffolding / 3T'
        END as quadrant
      FROM kuesioner.ipp_evaluations i
      FULL OUTER JOIN kuesioner.spbe_evaluations s ON lower(trim(i.nama)) = lower(trim(s.nama))
    )
    SELECT quadrant, count(*)::int as count
    FROM unified
    GROUP BY quadrant
    ORDER BY count DESC;
  `;
  console.log('\nQuadrant Breakdown (All Unified Entities):', quadrantStats);

  await sql.end();
}

testJoin();
