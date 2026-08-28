import postgres from 'postgres';
const sql = postgres('postgresql://makarti:SuperRahasia123%21@172.236.154.243:5432/makarti');

async function run() {
  const ippTypes = await sql`
    SELECT 
      CASE 
        WHEN nama ILIKE 'Pemerintah Provinsi%' THEN 'Pemerintah Provinsi'
        WHEN nama ILIKE 'Pemerintah Kabupaten%' OR nama ILIKE 'Pemerintah Kab%' THEN 'Pemerintah Kabupaten'
        WHEN nama ILIKE 'Pemerintah Kota%' THEN 'Pemerintah Kota'
        ELSE 'Kementerian / Lembaga (Pusat - Jakarta)'
      END as category,
      count(*)::int as total
    FROM kuesioner.ipp_evaluations
    GROUP BY 1
    ORDER BY total DESC;
  `;
  console.log('IPP Category Breakdown:', ippTypes);

  const spbeTypes = await sql`
    SELECT 
      CASE 
        WHEN nama ILIKE 'Pemerintah Provinsi%' THEN 'Pemerintah Provinsi'
        WHEN nama ILIKE 'Pemerintah Kabupaten%' OR nama ILIKE 'Pemerintah Kab%' THEN 'Pemerintah Kabupaten'
        WHEN nama ILIKE 'Pemerintah Kota%' THEN 'Pemerintah Kota'
        ELSE 'Kementerian / Lembaga (Pusat - Jakarta)'
      END as category,
      count(*)::int as total
    FROM kuesioner.spbe_evaluations
    GROUP BY 1
    ORDER BY total DESC;
  `;
  console.log('SPBE Category Breakdown:', spbeTypes);

  await sql.end();
}

run();
