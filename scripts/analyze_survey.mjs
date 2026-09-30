import postgres from 'postgres';

const sql = postgres('postgresql://makarti:SuperRahasia123%21@172.236.154.243:5432/makarti');

function mean(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function stdDev(arr, sample = true) {
  if (!arr || arr.length < 2) return 0;
  const m = mean(arr);
  const variance = arr.reduce((acc, val) => acc + Math.pow(val - m, 2), 0) / (arr.length - (sample ? 1 : 0));
  return Math.sqrt(variance);
}

function logGamma(z) {
  const g = 7;
  const C = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.138571095856205,
    9.9843695780195716e-6,
    1.5056327351493116e-7
  ];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - logGamma(1 - z);
  z -= 1;
  let base = C[0];
  for (let i = 1; i < g + 2; i++) base += C[i] / (z + i);
  const t = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(base);
}

function betaContinuedFraction(a, b, x) {
  const maxIterations = 200;
  const eps = 1e-12;
  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;
  let c = 1;
  let d = 1 - qab * x / qap;
  if (Math.abs(d) < eps) d = eps;
  d = 1 / d;
  let h = d;
  for (let m = 1; m <= maxIterations; m++) {
    const m2 = 2 * m;
    let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < eps) d = eps;
    c = 1 + aa / c;
    if (Math.abs(c) < eps) c = eps;
    d = 1 / d;
    h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < eps) d = eps;
    c = 1 + aa / c;
    if (Math.abs(c) < eps) c = eps;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < eps) break;
  }
  return h;
}

function betaInc(a, b, x) {
  if (x === 0) return 0;
  if (x === 1) return 1;
  const bt = Math.exp(logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  if (x < (a + 1) / (a + b + 2)) {
    return bt * betaContinuedFraction(a, b, x) / a;
  } else {
    return 1 - bt * betaContinuedFraction(b, a, 1 - x) / b;
  }
}

function fPValue(f, df1, df2) {
  if (f <= 0) return 1.0;
  const x = df2 / (df2 + df1 * f);
  return betaInc(df2 / 2, df1 / 2, x);
}

function gammaInc(a, x) {
  if (x <= 0) return 0;
  let sum = 1 / a;
  let term = 1 / a;
  for (let n = 1; n < 200; n++) {
    term *= x / (a + n);
    sum += term;
    if (term < sum * 1e-12) break;
  }
  return Math.exp(-x + a * Math.log(x) - logGamma(a)) * sum;
}

function chiSquarePValue(chi2, df) {
  if (chi2 <= 0) return 1.0;
  return 1 - gammaInc(df / 2, chi2 / 2);
}

function oneWayANOVA(groups) {
  const k = groups.length;
  const groupMeans = groups.map(g => mean(g));
  const groupSizes = groups.map(g => g.length);
  const totalN = groupSizes.reduce((a, b) => a + b, 0);
  if (totalN <= k) return { fStat: 0, pVal: 1, etaSquared: 0, dfBetween: 0, dfWithin: 0 };
  const grandMean = groups.flat().reduce((a, b) => a + b, 0) / totalN;

  let ssBetween = 0;
  for (let i = 0; i < k; i++) {
    ssBetween += groupSizes[i] * Math.pow(groupMeans[i] - grandMean, 2);
  }

  let ssWithin = 0;
  for (let i = 0; i < k; i++) {
    for (const val of groups[i]) {
      ssWithin += Math.pow(val - groupMeans[i], 2);
    }
  }

  const ssTotal = ssBetween + ssWithin;
  const dfBetween = k - 1;
  const dfWithin = totalN - k;

  const msBetween = ssBetween / dfBetween;
  const msWithin = ssWithin / dfWithin;
  const fStat = msBetween / msWithin;
  const pVal = fPValue(fStat, dfBetween, dfWithin);
  const etaSquared = ssBetween / ssTotal;

  return {
    k,
    totalN,
    grandMean,
    ssBetween,
    ssWithin,
    ssTotal,
    dfBetween,
    dfWithin,
    msBetween,
    msWithin,
    fStat,
    pVal,
    etaSquared
  };
}

function kruskalWallis(groups) {
  const k = groups.length;
  const totalN = groups.reduce((acc, g) => acc + g.length, 0);
  
  const all = [];
  groups.forEach((g, gIdx) => {
    g.forEach(val => all.push({ val, gIdx }));
  });
  
  all.sort((a, b) => a.val - b.val);
  
  let i = 0;
  while (i < all.length) {
    let j = i;
    while (j < all.length && all[j].val === all[i].val) j++;
    const avgRank = (i + 1 + j) / 2;
    for (let m = i; m < j; m++) {
      all[m].rank = avgRank;
    }
    i = j;
  }

  const groupRankSums = new Array(k).fill(0);
  all.forEach(item => {
    groupRankSums[item.gIdx] += item.rank;
  });

  let h = (12 / (totalN * (totalN + 1))) * 
    groupRankSums.reduce((acc, rSum, idx) => acc + Math.pow(rSum, 2) / groups[idx].length, 0) - 
    3 * (totalN + 1);

  let tieSum = 0;
  i = 0;
  while (i < all.length) {
    let j = i;
    while (j < all.length && all[j].val === all[i].val) j++;
    const t = j - i;
    if (t > 1) {
      tieSum += (Math.pow(t, 3) - t);
    }
    i = j;
  }
  const tieCorrection = 1 - (tieSum / (Math.pow(totalN, 3) - totalN));
  if (tieCorrection > 0) h = h / tieCorrection;

  const df = k - 1;
  const pVal = chiSquarePValue(h, df);
  const epsilonSquared = (h - k + 1) / (totalN - k);

  return { h, df, pVal, epsilonSquared };
}

function matrixInverse(A) {
  const n = A.length;
  const I = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  const M = A.map((row, i) => [...row, ...I[i]]);

  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) maxRow = k;
    }
    [M[i], M[maxRow]] = [M[maxRow], M[i]];

    const pivot = M[i][i];
    if (Math.abs(pivot) < 1e-12) throw new Error('Singular matrix');
    for (let j = 0; j < 2 * n; j++) M[i][j] /= pivot;

    for (let k = 0; k < n; k++) {
      if (k !== i) {
        const factor = M[k][i];
        for (let j = 0; j < 2 * n; j++) {
          M[k][j] -= factor * M[i][j];
        }
      }
    }
  }

  return M.map(row => row.slice(n));
}

function multipleRegression(Y, X_matrix, varNames) {
  const n = Y.length;
  const p = X_matrix[0].length;

  const Xt = Array.from({ length: p }, (_, i) => Array.from({ length: n }, (_, j) => X_matrix[j][i]));

  const XtX = Array.from({ length: p }, (_, i) =>
    Array.from({ length: p }, (_, j) => {
      let sum = 0;
      for (let k = 0; k < n; k++) sum += Xt[i][k] * X_matrix[k][j];
      return sum;
    })
  );

  const invXtX = matrixInverse(XtX);

  const XtY = Array.from({ length: p }, (_, i) => {
    let sum = 0;
    for (let k = 0; k < n; k++) sum += Xt[i][k] * Y[k];
    return sum;
  });

  const beta = Array.from({ length: p }, (_, i) => {
    let sum = 0;
    for (let j = 0; j < p; j++) sum += invXtX[i][j] * XtY[j];
    return sum;
  });

  const yMean = mean(Y);
  let ssTotal = 0;
  let ssRes = 0;
  for (let i = 0; i < n; i++) {
    let yPred = 0;
    for (let j = 0; j < p; j++) yPred += X_matrix[i][j] * beta[j];
    ssTotal += Math.pow(Y[i] - yMean, 2);
    ssRes += Math.pow(Y[i] - yPred, 2);
  }

  const ssReg = ssTotal - ssRes;
  const rSquared = ssReg / ssTotal;
  const dfRes = n - p;
  const dfReg = p - 1;
  const adjRSquared = 1 - ((1 - rSquared) * (n - 1) / dfRes);
  const msRes = ssRes / dfRes;
  const msReg = ssReg / dfReg;
  const fStat = msReg / msRes;
  const fPVal = fPValue(fStat, dfReg, dfRes);

  const seBeta = Array.from({ length: p }, (_, i) => Math.sqrt(msRes * invXtX[i][i]));
  const tStats = beta.map((b, i) => b / seBeta[i]);

  const pVals = tStats.map(t => {
    const z = Math.abs(t);
    const pOneTail = 0.5 * (1 - Math.erf(z / Math.SQRT2));
    return pOneTail * 2;
  });

  const sy = stdDev(Y);
  const stdBetas = beta.map((b, i) => {
    if (i === 0) return 0;
    const sx = stdDev(X_matrix.map(row => row[i]));
    return b * (sx / sy);
  });

  return {
    n,
    p,
    rSquared,
    adjRSquared,
    fStat,
    dfReg,
    dfRes,
    fPVal,
    coefficients: varNames.map((name, i) => ({
      name,
      b: beta[i],
      se: seBeta[i],
      stdBeta: stdBetas[i],
      t: tStats[i],
      p: pVals[i],
      ciLower: beta[i] - 1.96 * seBeta[i],
      ciUpper: beta[i] + 1.96 * seBeta[i]
    }))
  };
}

Math.erf = Math.erf || function(x) {
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
};

async function run() {
  console.log('================================================================');
  console.log('=== RIGOROUS STATISTICAL AUDIT & RE-ANALYSIS OF SURVEY DATA  ===');
  console.log('================================================================\n');

  const rows = await sql`SELECT * FROM kuesioner.responses`;
  console.log(`Total Records in Database: ${rows.length}`);

  // 1. Area type distribution
  const areaCounts = {};
  rows.forEach(r => {
    const a = r.area_type || 'Missing / Not Stated';
    areaCounts[a] = (areaCounts[a] || 0) + 1;
  });
  console.log('\n--- 1. DISTRIBUTION OF AREA TYPOLOGY (Q2 / area_type) ---');
  console.table(Object.entries(areaCounts).map(([type, count]) => ({
    'Area Typology': type,
    n: count,
    '%': ((count / rows.length) * 100).toFixed(2) + '%'
  })));

  // 2. Descriptive statistics of core indicators
  const indicators = [
    { code: 'Q12', col: 'q12_disruption_frequency', name: 'Technical Disruption Frequency' },
    { code: 'Q15', col: 'q15_workload_overlap', name: 'Workload Overlap (Doing tasks during training)' },
    { code: 'Q16', col: 'q16_interrupted_by_work', name: 'Leaving/Discontinuing learning for work' },
    { code: 'Q17', col: 'q17_sufficient_time', name: 'Sufficient Time for Learning' },
    { code: 'Q18', col: 'q18_supervisor_support', name: 'Supervisor Support (Allocated Time)' },
    { code: 'Q19', col: 'q19_location_mobility', name: 'Location Mobility during Learning' },
    { code: 'Q20', col: 'q20_easy_access', name: 'Device Ease of Access' },
    { code: 'Q21', col: 'q21_file_size_issue', name: 'Large File / Bandwidth Difficulty' },
    { code: 'Q22', col: 'q22_relevance', name: 'Material Relevance' },
    { code: 'Q24', col: 'q24_format_suitability', name: 'Training Format Suitability' },
    { code: 'Q25', col: 'q25_qna_opportunity', name: 'Q&A Opportunity' },
    { code: 'Q26', col: 'q26_peer_interaction', name: 'Peer Interaction Opportunity' },
    { code: 'Q27', col: 'q27_focus_level', name: 'Learning Focus Level' }
  ];

  console.log('\n--- 2. OVERALL DESCRIPTIVE STATISTICS (N = ' + rows.length + ') ---');
  const overallStats = indicators.map(ind => {
    const vals = rows.map(r => r[ind.col]).filter(v => typeof v === 'number' && !isNaN(v));
    return {
      Code: ind.code,
      Indicator: ind.name,
      N: vals.length,
      Mean: mean(vals).toFixed(2),
      SD: stdDev(vals).toFixed(2),
      Min: Math.min(...vals),
      Max: Math.max(...vals)
    };
  });
  console.table(overallStats);

  // Synchronous dynamics Q33
  const syncCols = [
    { col: 'q33_sync_camera_on', name: 'Turning Camera ON' },
    { col: 'q33_sync_camera_off', name: 'Turning Camera OFF' },
    { col: 'q33_sync_mobile', name: 'Using Smartphone' },
    { col: 'q33_sync_multitask', name: 'Multitasking with Work' },
    { col: 'q33_sync_location_change', name: 'Changing Locations' },
    { col: 'q33_sync_disconnect', name: 'Experiencing Disconnect' }
  ];
  console.log('\n--- 2.1 SYNCHRONOUS BEHAVIOR DYNAMICS (Q33) ---');
  console.table(syncCols.map(c => {
    const vals = rows.map(r => r[c.col]).filter(v => typeof v === 'number' && !isNaN(v));
    return {
      Behavior: c.name,
      N: vals.length,
      Mean: mean(vals).toFixed(2),
      SD: stdDev(vals).toFixed(2)
    };
  }));

  // Disruption Types Q13
  const disruptionTypes = {};
  rows.forEach(r => {
    if (Array.isArray(r.q13_disruption_types)) {
      r.q13_disruption_types.forEach(t => {
        disruptionTypes[t] = (disruptionTypes[t] || 0) + 1;
      });
    }
  });
  console.log('\n--- 2.2 TECHNICAL DISRUPTION TYPES EXPERIENCED (Q13) ---');
  console.table(Object.entries(disruptionTypes).sort((a,b)=>b[1]-a[1]).map(([type, count]) => ({
    'Disruption Type': type,
    n: count,
    '% of Respondents': ((count / rows.length) * 100).toFixed(1) + '%'
  })));

  // 3. RQ2: ANOVA & Kruskal-Wallis across Area Types
  console.log('\n================================================================');
  console.log('=== 3. RQ2: TYPOLOGY COMPARISONS (ANOVA & KRUSKAL-WALLIS)   ===');
  console.log('================================================================');

  const distinctAreas = ['Perkotaan', 'Pedesaan', 'Wilayah Kepulauan', 'Wilayah Perbatasan', 'Wilayah Terpencil/3T'];
  
  const rq2Indicators = [
    { code: 'Q12', col: 'q12_disruption_frequency', name: 'Disruption Frequency' },
    { code: 'Q15', col: 'q15_workload_overlap', name: 'Workload Overlap' },
    { code: 'Q16', col: 'q16_interrupted_by_work', name: 'Interrupted by Work' },
    { code: 'Q18', col: 'q18_supervisor_support', name: 'Supervisor Support' },
    { code: 'Q19', col: 'q19_location_mobility', name: 'Location Mobility' },
    { code: 'Q20', col: 'q20_easy_access', name: 'Ease of Access' },
    { code: 'Q21', col: 'q21_file_size_issue', name: 'File Size Issue' },
    { code: 'Q27', col: 'q27_focus_level', name: 'Learning Focus' }
  ];

  const anovaSummaryTable = [];

  for (const ind of rq2Indicators) {
    const areaGroups = distinctAreas.map(area => {
      return rows
        .filter(r => r.area_type === area)
        .map(r => r[ind.col])
        .filter(v => typeof v === 'number' && !isNaN(v));
    });

    const breakdown = distinctAreas.map((area, idx) => ({
      area,
      n: areaGroups[idx].length,
      mean: mean(areaGroups[idx]),
      sd: stdDev(areaGroups[idx])
    }));

    const anova = oneWayANOVA(areaGroups);
    const kw = kruskalWallis(areaGroups);

    console.log(`\n>>> Variable: ${ind.code} - ${ind.name} <<<`);
    console.table(breakdown.map(b => ({
      'Typology': b.area,
      'n': b.n,
      'Mean': b.mean.toFixed(2),
      'SD': b.sd.toFixed(2),
      '95% CI': `[${(b.mean - 1.96 * b.sd / Math.sqrt(b.n)).toFixed(2)}, ${(b.mean + 1.96 * b.sd / Math.sqrt(b.n)).toFixed(2)}]`
    })));

    console.log(`One-Way ANOVA : F(${anova.dfBetween}, ${anova.dfWithin}) = ${anova.fStat.toFixed(3)}, p = ${anova.pVal < 0.001 ? '< .001' : anova.pVal.toFixed(4)}, eta^2 = ${anova.etaSquared.toFixed(4)}`);
    console.log(`Kruskal-Wallis: H(${kw.df}) = ${kw.h.toFixed(3)}, p = ${kw.pVal < 0.001 ? '< .001' : kw.pVal.toFixed(4)}, epsilon^2 = ${kw.epsilonSquared.toFixed(4)}`);

    anovaSummaryTable.push({
      Variable: `${ind.code} (${ind.name})`,
      'Perkotaan (M±SD)': `${breakdown[0].mean.toFixed(2)} ± ${breakdown[0].sd.toFixed(2)}`,
      'Pedesaan (M±SD)': `${breakdown[1].mean.toFixed(2)} ± ${breakdown[1].sd.toFixed(2)}`,
      'Kepulauan (M±SD)': `${breakdown[2].mean.toFixed(2)} ± ${breakdown[2].sd.toFixed(2)}`,
      'Perbatasan (M±SD)': `${breakdown[3].mean.toFixed(2)} ± ${breakdown[3].sd.toFixed(2)}`,
      'Terpencil (M±SD)': `${breakdown[4].mean.toFixed(2)} ± ${breakdown[4].sd.toFixed(2)}`,
      'F-Stat': anova.fStat.toFixed(2),
      'p (ANOVA)': anova.pVal < 0.001 ? '< .001' : anova.pVal.toFixed(3),
      'eta^2': anova.etaSquared.toFixed(3),
      'H (KW)': kw.h.toFixed(2),
      'p (KW)': kw.pVal < 0.001 ? '< .001' : kw.pVal.toFixed(3)
    });
  }

  console.log('\n--- SUMMARY INFERENTIAL TABLE FOR RQ2 ---');
  console.table(anovaSummaryTable);

  // 4. RQ3: Correlation & Multiple Linear Regression
  console.log('\n================================================================');
  console.log('=== 4. RQ3: MULTIPLE LINEAR REGRESSION ON LEARNING FOCUS    ===');
  console.log('================================================================');

  const regRows = rows.filter(r => 
    typeof r.q27_focus_level === 'number' &&
    typeof r.q18_supervisor_support === 'number' &&
    typeof r.q20_easy_access === 'number' &&
    typeof r.q15_workload_overlap === 'number' &&
    typeof r.q12_disruption_frequency === 'number' &&
    typeof r.q19_location_mobility === 'number' &&
    typeof r.q21_file_size_issue === 'number'
  );

  console.log(`Valid sample for regression: N = ${regRows.length}`);

  const Y = regRows.map(r => r.q27_focus_level);
  const X_mat = regRows.map(r => [
    1,
    r.q18_supervisor_support,
    r.q20_easy_access,
    r.q15_workload_overlap,
    r.q12_disruption_frequency,
    r.q19_location_mobility,
    r.q21_file_size_issue
  ]);
  const varNames = [
    'Constant',
    'Q18 (Supervisor Support)',
    'Q20 (Device Ease of Access)',
    'Q15 (Workload Overlap)',
    'Q12 (Disruption Frequency)',
    'Q19 (Location Mobility)',
    'Q21 (File Size Issue)'
  ];

  const regModel = multipleRegression(Y, X_mat, varNames);
  console.log(`\nModel Fit:`);
  console.log(`R = ${Math.sqrt(regModel.rSquared).toFixed(3)}, R^2 = ${regModel.rSquared.toFixed(3)}, Adjusted R^2 = ${regModel.adjRSquared.toFixed(3)}`);
  console.log(`ANOVA F(${regModel.dfReg}, ${regModel.dfRes}) = ${regModel.fStat.toFixed(2)}, p = ${regModel.fPVal < 0.001 ? '< .001' : regModel.fPVal.toFixed(4)}`);

  console.log('\n--- REGRESSION COEFFICIENTS TABLE ---');
  console.table(regModel.coefficients.map(c => ({
    'Predictor': c.name,
    'Unstd B': c.b.toFixed(3),
    'SE': c.se.toFixed(3),
    'Std Beta (β)': c.stdBeta ? c.stdBeta.toFixed(3) : '-',
    't-statistic': c.t.toFixed(2),
    'p-value': c.p < 0.001 ? '< .001' : c.p.toFixed(4),
    '95% CI': `[${c.ciLower.toFixed(3)}, ${c.ciUpper.toFixed(3)}]`
  })));

  // 5. Macro-Regional (Spatial Clusters) Analysis
  console.log('\n================================================================');
  console.log('=== 5. TRUE SPATIAL ANALYSIS: REGIONAL & ISLAND CLUSTERS     ===');
  console.log('================================================================');

  function getMacroRegion(prov) {
    if (!prov) return 'Unknown';
    const p = prov.toLowerCase();
    if (p.includes('aceh') || p.includes('sumatera') || p.includes('riau') || p.includes('jambi') || p.includes('bengkulu') || p.includes('lampung') || p.includes('bangka')) return 'Sumatera';
    if (p.includes('dki') || p.includes('jakarta') || p.includes('jawa') || p.includes('banten') || p.includes('yogyakarta')) return 'Jawa';
    if (p.includes('bali') || p.includes('nusa tenggara') || p.includes('ntb') || p.includes('ntt')) return 'Bali & Nusa Tenggara';
    if (p.includes('kalimantan')) return 'Kalimantan';
    if (p.includes('sulawesi') || p.includes('gorontalo')) return 'Sulawesi';
    if (p.includes('maluku') || p.includes('papua')) return 'Maluku & Papua';
    return 'Lainnya';
  }

  const macroStats = {};
  rows.forEach(r => {
    const region = getMacroRegion(r.province);
    if (!macroStats[region]) {
      macroStats[region] = { n: 0, q12: [], q15: [], q27: [] };
    }
    macroStats[region].n++;
    if (typeof r.q12_disruption_frequency === 'number') macroStats[region].q12.push(r.q12_disruption_frequency);
    if (typeof r.q15_workload_overlap === 'number') macroStats[region].q15.push(r.q15_workload_overlap);
    if (typeof r.q27_focus_level === 'number') macroStats[region].q27.push(r.q27_focus_level);
  });

  const macroTable = Object.entries(macroStats).map(([region, d]) => ({
    'Macro-Region': region,
    n: d.n,
    '%': ((d.n / rows.length) * 100).toFixed(1) + '%',
    'Disruption (Q12) M±SD': `${mean(d.q12).toFixed(2)} ± ${stdDev(d.q12).toFixed(2)}`,
    'Workload (Q15) M±SD': `${mean(d.q15).toFixed(2)} ± ${stdDev(d.q15).toFixed(2)}`,
    'Focus (Q27) M±SD': `${mean(d.q27).toFixed(2)} ± ${stdDev(d.q27).toFixed(2)}`
  }));
  console.table(macroTable);

  const regionNames = Object.keys(macroStats).filter(k => k !== 'Unknown' && k !== 'Lainnya');
  const regionQ12Groups = regionNames.map(r => macroStats[r].q12);
  const macroAnovaQ12 = oneWayANOVA(regionQ12Groups);
  console.log(`\nMacro-Region Disruption ANOVA: F(${macroAnovaQ12.dfBetween}, ${macroAnovaQ12.dfWithin}) = ${macroAnovaQ12.fStat.toFixed(3)}, p = ${macroAnovaQ12.pVal < 0.001 ? '< .001' : macroAnovaQ12.pVal.toFixed(4)}, eta^2 = ${macroAnovaQ12.etaSquared.toFixed(4)}`);

  const regionQ15Groups = regionNames.map(r => macroStats[r].q15);
  const macroAnovaQ15 = oneWayANOVA(regionQ15Groups);
  console.log(`Macro-Region Workload ANOVA: F(${macroAnovaQ15.dfBetween}, ${macroAnovaQ15.dfWithin}) = ${macroAnovaQ15.fStat.toFixed(3)}, p = ${macroAnovaQ15.pVal < 0.001 ? '< .001' : macroAnovaQ15.pVal.toFixed(4)}, eta^2 = ${macroAnovaQ15.etaSquared.toFixed(4)}`);

  // 6. Top & Bottom Provinces in Disruption
  const provMap = {};
  rows.forEach(r => {
    const prov = r.province || 'Unspecified';
    if (!provMap[prov]) provMap[prov] = { n: 0, q12: [], q15: [], q27: [] };
    provMap[prov].n++;
    if (typeof r.q12_disruption_frequency === 'number') provMap[prov].q12.push(r.q12_disruption_frequency);
    if (typeof r.q15_workload_overlap === 'number') provMap[prov].q15.push(r.q15_workload_overlap);
    if (typeof r.q27_focus_level === 'number') provMap[prov].q27.push(r.q27_focus_level);
  });

  const provList = Object.entries(provMap)
    .filter(([p, d]) => d.n >= 15) // at least 15 respondents
    .map(([p, d]) => ({
      Province: p,
      n: d.n,
      DisruptionMean: mean(d.q12),
      DisruptionSD: stdDev(d.q12),
      WorkloadMean: mean(d.q15),
      FocusMean: mean(d.q27)
    }))
    .sort((a, b) => b.DisruptionMean - a.DisruptionMean);

  console.log('\n--- PROVINCES RANKED BY DISRUPTION SEVERITY (n >= 15) ---');
  console.table(provList.map(p => ({
    Province: p.Province,
    n: p.n,
    'Disruption (Q12)': p.DisruptionMean.toFixed(2),
    'Workload (Q15)': p.WorkloadMean.toFixed(2),
    'Focus (Q27)': p.FocusMean.toFixed(2)
  })));

  await sql.end();
}

run().catch(err => {
  console.error('Error running analysis:', err);
  process.exit(1);
});
