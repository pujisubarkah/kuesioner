import postgres from 'postgres';
import fs from 'fs';

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

async function execute() {
  const rows = await sql`SELECT * FROM kuesioner.responses`;
  
  // Normalize area_type strings
  function normalizeArea(a) {
    if (!a) return 'Unspecified';
    const s = a.trim().toLowerCase();
    if (s.includes('perkotaan') || s.includes('urban')) return 'Perkotaan';
    if (s.includes('perdesaan') || s.includes('pedesaan') || s.includes('rural')) return 'Perdesaan';
    if (s.includes('kepulauan') || s.includes('archipelago')) return 'Wilayah Kepulauan';
    if (s.includes('perbatasan') || s.includes('border')) return 'Wilayah Perbatasan';
    if (s.includes('terpencil') || s.includes('3t') || s.includes('remote')) return 'Wilayah Terpencil/3T';
    if (s.includes('lainnya')) return 'Lainnya';
    return 'Lainnya';
  }

  const indicators = [
    { code: 'Q12', col: 'q12_disruption_frequency', name: 'Technical Disruption Frequency' },
    { code: 'Q15', col: 'q15_workload_overlap', name: 'Workload Overlap (Continuing Official Duties)' },
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

  const distinctAreas = ['Perkotaan', 'Perdesaan', 'Wilayah Kepulauan', 'Wilayah Perbatasan', 'Wilayah Terpencil/3T'];

  const rq2Results = [];

  indicators.forEach(ind => {
    const areaGroups = distinctAreas.map(area => {
      return rows
        .filter(r => normalizeArea(r.area_type) === area)
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

    rq2Results.push({
      code: ind.code,
      name: ind.name,
      breakdown,
      anova: {
        fStat: anova.fStat,
        df1: anova.dfBetween,
        df2: anova.dfWithin,
        pVal: anova.pVal,
        etaSquared: anova.etaSquared
      },
      kruskalWallis: {
        hStat: kw.h,
        df: kw.df,
        pVal: kw.pVal,
        epsilonSquared: kw.epsilonSquared
      }
    });
  });

  const fullReport = {
    totalRows: rows.length,
    areaCounts: {},
    indicatorsSummary: indicators.map(ind => {
      const vals = rows.map(r => r[ind.col]).filter(v => typeof v === 'number' && !isNaN(v));
      return {
        code: ind.code,
        name: ind.name,
        n: vals.length,
        mean: mean(vals),
        sd: stdDev(vals)
      };
    }),
    rq2Results
  };

  rows.forEach(r => {
    const norm = normalizeArea(r.area_type);
    fullReport.areaCounts[norm] = (fullReport.areaCounts[norm] || 0) + 1;
  });

  fs.writeFileSync('d:/aplikasi/kuesioner/scripts/survey_results.json', JSON.stringify(fullReport, null, 2));
  console.log('SUCCESS: Generated full normalized survey results!');
  await sql.end();
}

execute();
