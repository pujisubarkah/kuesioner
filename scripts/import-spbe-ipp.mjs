import fs from 'fs';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL || 'postgresql://makarti:SuperRahasia123%21@172.236.154.243:5432/makarti';
const sql = postgres(connectionString);

function parseCsv(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');
  if (lines.length < 2) return [];

  // Parse header
  const headerLine = lines[0];
  const headers = parseCsvLine(headerLine);

  const results = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    if (values.length >= 2) {
      const row = {};
      headers.forEach((h, idx) => {
        row[h.trim()] = values[idx] !== undefined ? values[idx].trim() : '';
      });
      results.push(row);
    }
  }
  return results;
}

function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

async function run() {
  console.log('Connecting to PostgreSQL...');

  try {
    // 1. Ensure Schema
    await sql`CREATE SCHEMA IF NOT EXISTS kuesioner;`;

    // 2. Create IPP Table
    console.log('Creating table kuesioner.ipp_evaluations...');
    await sql`
      CREATE TABLE IF NOT EXISTS kuesioner.ipp_evaluations (
        id SERIAL PRIMARY KEY,
        nama TEXT NOT NULL,
        ipp_predikat VARCHAR(50),
        tahun INTEGER DEFAULT 2025,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

    // 3. Create SPBE Table
    console.log('Creating table kuesioner.spbe_evaluations...');
    await sql`
      CREATE TABLE IF NOT EXISTS kuesioner.spbe_evaluations (
        id SERIAL PRIMARY KEY,
        nama TEXT NOT NULL,
        spbe_predikat VARCHAR(50),
        tahun INTEGER DEFAULT 2025,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

    // 4. Import IPP Data
    const ippPath = 'C:\\Users\\pujia\\Downloads\\ipp_2025_satudata.csv';
    console.log(`Reading IPP CSV from: ${ippPath}`);
    const ippRows = parseCsv(ippPath);
    console.log(`Parsed ${ippRows.length} IPP records.`);

    // Truncate first to allow idempotent re-running
    await sql`TRUNCATE TABLE kuesioner.ipp_evaluations RESTART IDENTITY;`;
    
    let ippCount = 0;
    for (const row of ippRows) {
      if (row.nama) {
        const tahun = parseInt(row.tahun, 10) || 2025;
        await sql`
          INSERT INTO kuesioner.ipp_evaluations (nama, ipp_predikat, tahun)
          VALUES (${row.nama}, ${row.ipp_predikat || null}, ${tahun});
        `;
        ippCount++;
      }
    }
    console.log(`Successfully inserted ${ippCount} IPP records.`);

    // 5. Import SPBE Data
    const spbePath = 'C:\\Users\\pujia\\Downloads\\spbe_2025_satudata.csv';
    console.log(`Reading SPBE CSV from: ${spbePath}`);
    const spbeRows = parseCsv(spbePath);
    console.log(`Parsed ${spbeRows.length} SPBE records.`);

    // Truncate first
    await sql`TRUNCATE TABLE kuesioner.spbe_evaluations RESTART IDENTITY;`;

    let spbeCount = 0;
    for (const row of spbeRows) {
      if (row.nama) {
        const tahun = parseInt(row.tahun, 10) || 2025;
        await sql`
          INSERT INTO kuesioner.spbe_evaluations (nama, spbe_predikat, tahun)
          VALUES (${row.nama}, ${row.spbe_predikat || null}, ${tahun});
        `;
        spbeCount++;
      }
    }
    console.log(`Successfully inserted ${spbeCount} SPBE records.`);

    // 6. Verify Counts
    const [ippTotal] = await sql`SELECT COUNT(*)::int as count FROM kuesioner.ipp_evaluations;`;
    const [spbeTotal] = await sql`SELECT COUNT(*)::int as count FROM kuesioner.spbe_evaluations;`;

    console.log('\n--- VERIFIKASI DATA DI DATABASE ---');
    console.log(`Total data di kuesioner.ipp_evaluations: ${ippTotal.count} baris`);
    console.log(`Total data di kuesioner.spbe_evaluations: ${spbeTotal.count} baris`);

    // Sample data check
    const sampleIpp = await sql`SELECT * FROM kuesioner.ipp_evaluations LIMIT 3;`;
    const sampleSpbe = await sql`SELECT * FROM kuesioner.spbe_evaluations LIMIT 3;`;
    console.log('\nSample IPP:', sampleIpp);
    console.log('\nSample SPBE:', sampleSpbe);

  } catch (err) {
    console.error('Error importing CSV to database:', err);
  } finally {
    await sql.end();
  }
}

run();
