import fs from 'fs';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL || 'postgresql://makarti:SuperRahasia123%21@172.236.154.243:5432/makarti';
const sql = postgres(connectionString);

function parseCsv(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');
  if (lines.length < 2) return [];

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
  console.log('Connecting to PostgreSQL for Batch Import...');

  try {
    await sql`CREATE SCHEMA IF NOT EXISTS kuesioner;`;

    // 1. Create IPP Table
    await sql`
      CREATE TABLE IF NOT EXISTS kuesioner.ipp_evaluations (
        id SERIAL PRIMARY KEY,
        nama TEXT NOT NULL,
        ipp_predikat VARCHAR(50),
        tahun INTEGER DEFAULT 2025,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

    // 2. Create SPBE Table
    await sql`
      CREATE TABLE IF NOT EXISTS kuesioner.spbe_evaluations (
        id SERIAL PRIMARY KEY,
        nama TEXT NOT NULL,
        spbe_predikat VARCHAR(50),
        tahun INTEGER DEFAULT 2025,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

    // 3. Batch Import IPP
    const ippPath = 'C:\\Users\\pujia\\Downloads\\ipp_2025_satudata.csv';
    const ippRows = parseCsv(ippPath);
    console.log(`Parsed ${ippRows.length} IPP records.`);

    await sql`TRUNCATE TABLE kuesioner.ipp_evaluations RESTART IDENTITY;`;
    
    const formattedIpp = ippRows
      .filter(r => r.nama && r.nama.trim() !== '')
      .map(r => ({
        nama: r.nama.trim(),
        ipp_predikat: r.ipp_predikat ? r.ipp_predikat.trim() : null,
        tahun: parseInt(r.tahun, 10) || 2025
      }));

    if (formattedIpp.length > 0) {
      await sql`
        INSERT INTO kuesioner.ipp_evaluations ${sql(formattedIpp, 'nama', 'ipp_predikat', 'tahun')}
      `;
    }
    console.log(`Successfully batch-inserted ${formattedIpp.length} IPP records.`);

    // 4. Batch Import SPBE
    const spbePath = 'C:\\Users\\pujia\\Downloads\\spbe_2025_satudata.csv';
    const spbeRows = parseCsv(spbePath);
    console.log(`Parsed ${spbeRows.length} SPBE records.`);

    await sql`TRUNCATE TABLE kuesioner.spbe_evaluations RESTART IDENTITY;`;

    const formattedSpbe = spbeRows
      .filter(r => r.nama && r.nama.trim() !== '')
      .map(r => ({
        nama: r.nama.trim(),
        spbe_predikat: r.spbe_predikat ? r.spbe_predikat.trim() : null,
        tahun: parseInt(r.tahun, 10) || 2025
      }));

    if (formattedSpbe.length > 0) {
      await sql`
        INSERT INTO kuesioner.spbe_evaluations ${sql(formattedSpbe, 'nama', 'spbe_predikat', 'tahun')}
      `;
    }
    console.log(`Successfully batch-inserted ${formattedSpbe.length} SPBE records.`);

    // 5. Verification
    const [ippTotal] = await sql`SELECT COUNT(*)::int as count FROM kuesioner.ipp_evaluations;`;
    const [spbeTotal] = await sql`SELECT COUNT(*)::int as count FROM kuesioner.spbe_evaluations;`;

    console.log('\n=== STATUS IMPORT DATABASE SELESAI ===');
    console.log(`✅ Total baris kuesioner.ipp_evaluations: ${ippTotal.count}`);
    console.log(`✅ Total baris kuesioner.spbe_evaluations: ${spbeTotal.count}`);

  } catch (err) {
    console.error('Error during batch import:', err);
  } finally {
    await sql.end();
  }
}

run();
