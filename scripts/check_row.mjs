import postgres from 'postgres';
const sql = postgres('postgresql://makarti:SuperRahasia123%21@172.236.154.243:5432/makarti');

async function checkRow() {
  const [firstRow] = await sql`SELECT * FROM kuesioner.responses LIMIT 1`;
  console.log('Row column names:', Object.keys(firstRow));
  console.log('\nFirst row values:');
  console.log(JSON.stringify(firstRow, null, 2));
  await sql.end();
}

checkRow();
