import postgres from 'postgres';

const sql = postgres('postgresql://makarti:SuperRahasia123%21@172.236.154.243:5432/makarti');

async function main() {
  const rows = await sql`SELECT q15_workload_overlap, q27_focus_level, q16_interrupted_by_work, q17_sufficient_time, q18_supervisor_support, q20_easy_access, q21_file_size_issue, q12_disruption_frequency FROM kuesioner.responses LIMIT 10`;
  console.log('Sample rows:', rows);
  
  const counts15 = await sql`SELECT q15_workload_overlap, count(*) as n FROM kuesioner.responses GROUP BY q15_workload_overlap ORDER BY q15_workload_overlap`;
  const counts27 = await sql`SELECT q27_focus_level, count(*) as n FROM kuesioner.responses GROUP BY q27_focus_level ORDER BY q27_focus_level`;
  console.log('\nQ15 Distribution (1=Sangat Tidak Setuju s.d. 5=Sangat Setuju):', counts15);
  console.log('\nQ27 Distribution (1=Sangat Tidak Setuju s.d. 5=Sangat Setuju):', counts27);
  
  const cross = await sql`
    SELECT 
      q15_workload_overlap, 
      ROUND(AVG(q27_focus_level)::numeric, 3) as avg_focus_q27,
      COUNT(*) as count
    FROM kuesioner.responses 
    WHERE q15_workload_overlap IS NOT NULL AND q27_focus_level IS NOT NULL
    GROUP BY q15_workload_overlap 
    ORDER BY q15_workload_overlap
  `;
  console.log('\nCross-tab: Q15 vs Average Q27 Focus Level:', cross);

  const cross16 = await sql`
    SELECT 
      q16_interrupted_by_work, 
      ROUND(AVG(q27_focus_level)::numeric, 3) as avg_focus_q27,
      COUNT(*) as count
    FROM kuesioner.responses 
    WHERE q16_interrupted_by_work IS NOT NULL AND q27_focus_level IS NOT NULL
    GROUP BY q16_interrupted_by_work 
    ORDER BY q16_interrupted_by_work
  `;
  console.log('\nCross-tab: Q16 (Interrupted by work) vs Average Q27 Focus Level:', cross16);

  const cross18 = await sql`
    SELECT 
      q18_supervisor_support, 
      ROUND(AVG(q27_focus_level)::numeric, 3) as avg_focus_q27,
      COUNT(*) as count
    FROM kuesioner.responses 
    WHERE q18_supervisor_support IS NOT NULL AND q27_focus_level IS NOT NULL
    GROUP BY q18_supervisor_support 
    ORDER BY q18_supervisor_support
  `;
  console.log('\nCross-tab: Q18 (Supervisor Support) vs Average Q27 Focus Level:', cross18);

  const corrMatrix = await sql`
    SELECT 
      ROUND(corr(q15_workload_overlap, q27_focus_level)::numeric, 4) as r_q15_q27,
      ROUND(corr(q16_interrupted_by_work, q27_focus_level)::numeric, 4) as r_q16_q27,
      ROUND(corr(q17_sufficient_time, q27_focus_level)::numeric, 4) as r_q17_q27,
      ROUND(corr(q18_supervisor_support, q27_focus_level)::numeric, 4) as r_q18_q27,
      ROUND(corr(q20_easy_access, q27_focus_level)::numeric, 4) as r_q20_q27,
      ROUND(corr(q21_file_size_issue, q27_focus_level)::numeric, 4) as r_q21_q27,
      ROUND(corr(q12_disruption_frequency, q27_focus_level)::numeric, 4) as r_q12_q27,
      ROUND(corr(q15_workload_overlap, q18_supervisor_support)::numeric, 4) as r_q15_q18
    FROM kuesioner.responses
  `;
  console.log('\nDirect Correlations from PostgreSQL corr():', corrMatrix);

  await sql.end();
}

main().catch(console.error);
