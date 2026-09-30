import postgres from 'postgres';
import fs from 'fs';

const sql = postgres('postgresql://makarti:SuperRahasia123%21@172.236.154.243:5432/makarti');

function mean(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function variance(arr, sample = true) {
  if (!arr || arr.length < 2) return 0;
  const m = mean(arr);
  return arr.reduce((acc, val) => acc + Math.pow(val - m, 2), 0) / (arr.length - (sample ? 1 : 0));
}

function stdDev(arr, sample = true) {
  return Math.sqrt(variance(arr, sample));
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
  if (x <= 0) return 0;
  if (x >= 1) return 1;
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

function tPValue(t, df) {
  const x = df / (df + t * t);
  return betaInc(df / 2, 0.5, x);
}

function studentizedRangePValue(q, k, df) {
  if (q <= 0) return 1.0;
  const t = q / Math.SQRT2;
  const p_t = tPValue(t, df);
  const p_adj = 1 - Math.pow(1 - p_t, k * (k - 1) / 2);
  return Math.min(1.0, Math.max(0.0, p_adj));
}

function studentizedRangeCrit(k, df, alpha = 0.05) {
  const alpha_adj = 1 - Math.pow(1 - alpha, 1 / (k * (k - 1) / 2));
  let low = 0, high = 10;
  for (let iter = 0; iter < 50; iter++) {
    const mid = (low + high) / 2;
    const p = tPValue(mid, df);
    if (p > alpha_adj) low = mid;
    else high = mid;
  }
  return low * Math.SQRT2;
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

function multipleRegression(Y, X_matrix) {
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
  const residuals = new Array(n);
  for (let i = 0; i < n; i++) {
    let yPred = 0;
    for (let j = 0; j < p; j++) yPred += X_matrix[i][j] * beta[j];
    residuals[i] = Y[i] - yPred;
    ssTotal += Math.pow(Y[i] - yMean, 2);
    ssRes += Math.pow(residuals[i], 2);
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
  const pVals = tStats.map(t => tPValue(Math.abs(t), dfRes));

  const sy = stdDev(Y);
  const stdBetas = beta.map((b, i) => {
    if (i === 0) return 0;
    const sx = stdDev(X_matrix.map(row => row[i]));
    return b * (sx / sy);
  });

  return {
    n,
    p,
    beta,
    residuals,
    invXtX,
    XtX,
    rSquared,
    adjRSquared,
    fStat,
    dfReg,
    dfRes,
    fPVal,
    seBeta,
    tStats,
    pVals,
    stdBetas
  };
}

function principalComponentAnalysis(dataMatrix) {
  const n = dataMatrix.length;
  const m = dataMatrix[0].length;

  const means = Array.from({ length: m }, (_, j) => mean(dataMatrix.map(row => row[j])));
  const sds = Array.from({ length: m }, (_, j) => stdDev(dataMatrix.map(row => row[j])));

  const Z = dataMatrix.map(row => row.map((val, j) => (sds[j] === 0 ? 0 : (val - means[j]) / sds[j])));

  const R = Array.from({ length: m }, (_, i) =>
    Array.from({ length: m }, (_, j) => {
      let sum = 0;
      for (let k = 0; k < n; k++) sum += Z[k][i] * Z[k][j];
      return sum / (n - 1);
    })
  );

  let v = new Array(m).fill(1 / Math.sqrt(m));
  for (let iter = 0; iter < 100; iter++) {
    const nextV = new Array(m).fill(0);
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < m; j++) {
        nextV[i] += R[i][j] * v[j];
      }
    }
    const norm = Math.sqrt(nextV.reduce((acc, val) => acc + val * val, 0));
    v = nextV.map(x => x / norm);
  }

  let eigenvalue = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      eigenvalue += v[i] * R[i][j] * v[j];
    }
  }
  const varianceExplained = (eigenvalue / m) * 100;
  return { eigenvalue, varianceExplained, totalVariance: m };
}

function welchANOVA(groups) {
  const k = groups.length;
  const n = groups.map(g => g.length);
  const means = groups.map(g => mean(g));
  const variances = groups.map(g => variance(g));

  const weights = n.map((ni, i) => ni / variances[i]);
  const W = weights.reduce((a, b) => a + b, 0);

  const meanPrime = weights.reduce((acc, w, i) => acc + w * means[i], 0) / W;

  let num = 0;
  for (let i = 0; i < k; i++) {
    num += weights[i] * Math.pow(means[i] - meanPrime, 2);
  }
  num /= (k - 1);

  let denomSum = 0;
  for (let i = 0; i < k; i++) {
    const term = Math.pow(1 - weights[i] / W, 2) / (n[i] - 1);
    denomSum += term;
  }
  const denom = 1 + (2 * (k - 2) / (Math.pow(k, 2) - 1)) * denomSum;

  const fWelch = num / denom;
  const df1 = k - 1;
  const df2 = (Math.pow(k, 2) - 1) / (3 * denomSum);
  const pVal = fPValue(fWelch, df1, df2);

  return { fWelch, df1, df2, pVal, means, variances, n };
}

function gamesHowell(groups, groupNames) {
  const k = groups.length;
  const n = groups.map(g => g.length);
  const means = groups.map(g => mean(g));
  const variances = groups.map(g => variance(g));

  const pairs = [];
  for (let i = 0; i < k; i++) {
    for (let j = i + 1; j < k; j++) {
      const meanDiff = means[i] - means[j];
      const seDiff = Math.sqrt((variances[i] / n[i]) + (variances[j] / n[j]));

      const vi_ni = variances[i] / n[i];
      const vj_nj = variances[j] / n[j];
      const dfWS = Math.pow(vi_ni + vj_nj, 2) / (Math.pow(vi_ni, 2) / (n[i] - 1) + Math.pow(vj_nj, 2) / (n[j] - 1));

      const q = Math.SQRT2 * Math.abs(meanDiff) / seDiff;
      const pAdj = studentizedRangePValue(q, k, dfWS);
      const qCrit = studentizedRangeCrit(k, dfWS, 0.05);

      const marginError = (qCrit / Math.SQRT2) * seDiff;
      const ciLower = meanDiff - marginError;
      const ciUpper = meanDiff + marginError;

      pairs.push({
        groupA: groupNames[i],
        groupB: groupNames[j],
        meanDiff,
        seDiff,
        dfWS,
        q,
        pAdj,
        ciLower,
        ciUpper,
        isSignificant: pAdj < 0.05
      });
    }
  }

  return pairs;
}

function pearsonCorr(x, y) {
  const mx = mean(x), my = mean(y);
  const sx = stdDev(x), sy = stdDev(y);
  let cov = 0;
  for (let i = 0; i < x.length; i++) cov += (x[i] - mx) * (y[i] - my);
  cov /= (x.length - 1);
  return cov / (sx * sy);
}

async function run() {
  console.log('=== ADVANCED STATISTICAL AUDIT & DIAGNOSTICS FOR PUBLICATION ===\n');

  const rows = await sql`SELECT * FROM kuesioner.responses`;
  console.log(`Total database records: N = ${rows.length}`);

  const regRows = rows.filter(r => 
    typeof r.q27_focus_level === 'number' &&
    typeof r.q18_supervisor_support === 'number' &&
    typeof r.q20_easy_access === 'number' &&
    typeof r.q15_workload_overlap === 'number' &&
    typeof r.q12_disruption_frequency === 'number' &&
    typeof r.q19_location_mobility === 'number' &&
    typeof r.q21_file_size_issue === 'number' &&
    r.province
  );

  const Y = regRows.map(r => r.q27_focus_level);
  const predictors = [
    { code: 'Q18', name: 'Supervisor Support', vals: regRows.map(r => r.q18_supervisor_support) },
    { code: 'Q20', name: 'Device Ease of Access', vals: regRows.map(r => r.q20_easy_access) },
    { code: 'Q15', name: 'Workload Overlap', vals: regRows.map(r => r.q15_workload_overlap) },
    { code: 'Q12', name: 'Disruption Frequency', vals: regRows.map(r => r.q12_disruption_frequency) },
    { code: 'Q19', name: 'Location Mobility', vals: regRows.map(r => r.q19_location_mobility) },
    { code: 'Q21', name: 'File Size Issue', vals: regRows.map(r => r.q21_file_size_issue) }
  ];

  // 1.1 Zero-order Pearson Correlation with Q27
  const zeroOrder = predictors.map(p => {
    const r = pearsonCorr(p.vals, Y);
    const t = r * Math.sqrt((Y.length - 2) / (1 - r * r));
    const pVal = tPValue(Math.abs(t), Y.length - 2);
    return {
      Predictor: `${p.code} (${p.name})`,
      'Zero-Order r': r.toFixed(3),
      'r^2': (r * r).toFixed(3),
      't-stat': t.toFixed(2),
      'p-value': pVal < 0.001 ? '< .001' : pVal.toFixed(4)
    };
  });
  console.log('\n>>> 1.1 Korelasi Orde Nol (Zero-Order Correlation) dengan Q27:');
  console.table(zeroOrder);

  // 1.2 Intercorrelation Matrix among Predictors
  console.log('\n>>> 1.2 Matriks Interkorelasi Antar-Prediktor:');
  const interCorrMatrix = {};
  predictors.forEach(p1 => {
    interCorrMatrix[p1.code] = {};
    predictors.forEach(p2 => {
      interCorrMatrix[p1.code][p2.code] = pearsonCorr(p1.vals, p2.vals).toFixed(3);
    });
  });
  console.table(interCorrMatrix);

  // 1.3 Full Multiple Linear Regression Model
  const X_mat = regRows.map(r => [
    1,
    r.q18_supervisor_support,
    r.q20_easy_access,
    r.q15_workload_overlap,
    r.q12_disruption_frequency,
    r.q19_location_mobility,
    r.q21_file_size_issue
  ]);
  const varNames = ['Constant', 'Q18', 'Q20', 'Q15', 'Q12', 'Q19', 'Q21'];
  const regModel = multipleRegression(Y, X_mat);

  // 1.4 Multicollinearity Diagnostics: VIF & Tolerance (Fast!)
  const vifList = [];
  const N_cases = regRows.length;
  for (let j = 0; j < predictors.length; j++) {
    const targetX = predictors[j].vals;
    const otherX_mat = Array.from({ length: N_cases }, (_, r_idx) => {
      const row = [1];
      for (let k = 0; k < predictors.length; k++) {
        if (k !== j) row.push(predictors[k].vals[r_idx]);
      }
      return row;
    });
    const subReg = multipleRegression(targetX, otherX_mat);
    const tolerance = 1 - subReg.rSquared;
    const vif = 1 / tolerance;
    vifList.push({
      Predictor: `${predictors[j].code} (${predictors[j].name})`,
      Tolerance: tolerance.toFixed(3),
      VIF: vif.toFixed(3)
    });
  }
  console.log('\n>>> 1.3 Multicollinearity Diagnostics (VIF & Tolerance):');
  console.table(vifList);

  // 1.5 Suppression Effect & Coding Direction Analysis
  console.log('\n>>> 1.4 Suppression Effect & Coding Direction Verification:');
  const suppressionTable = predictors.map((p, i) => {
    const r = pearsonCorr(p.vals, Y);
    const beta = regModel.stdBetas[i + 1];
    const diff = beta - r;
    let suppressionType = 'Direct Relationship';
    if (Math.sign(r) !== Math.sign(beta) && Math.abs(beta) > 0.05) {
      suppressionType = 'Negative Suppression / Sign Flip';
    } else if (Math.abs(beta) > Math.abs(r) + 0.05) {
      suppressionType = 'Cooperative / Net Suppression';
    } else if (Math.abs(beta) < 0.05 && Math.abs(r) > 0.05) {
      suppressionType = 'Redundant / Spurious Bivariate';
    }
    return {
      Predictor: `${p.code} (${p.name})`,
      'Zero-Order r': r.toFixed(3),
      'Std Beta (β)': beta.toFixed(3),
      'Difference (β - r)': diff.toFixed(3),
      'Suppression Assessment': suppressionType
    };
  });
  console.table(suppressionTable);

  // 1.6 Common Method Bias & Acquiescence Diagnostics
  console.log('\n>>> 1.5 Common-Method Bias & Acquiescence Diagnostics:');
  const likertCols = [
    'q12_disruption_frequency', 'q15_workload_overlap', 'q16_interrupted_by_work',
    'q17_sufficient_time', 'q18_supervisor_support', 'q19_location_mobility',
    'q20_easy_access', 'q21_file_size_issue', 'q22_relevance',
    'q24_format_suitability', 'q25_qna_opportunity', 'q26_peer_interaction', 'q27_focus_level'
  ];

  const fullLikertData = rows
    .filter(r => likertCols.every(col => typeof r[col] === 'number'))
    .map(r => likertCols.map(col => r[col]));

  const pcaResult = principalComponentAnalysis(fullLikertData);

  let straightliningCount = 0;
  fullLikertData.forEach(row => {
    const s = new Set(row);
    if (s.size === 1) straightliningCount++;
  });

  console.log(`- Harman's Single-Factor Test (1st Unrotated Component Variance): ${pcaResult.varianceExplained.toFixed(2)}% (Threshold: < 50%)`);
  console.log(`- Total Likert Items Tested: ${likertCols.length}`);
  console.log(`- Straightlining / Zero-Variance Responses: ${straightliningCount} (${((straightliningCount / fullLikertData.length) * 100).toFixed(2)}%)`);

  // -------------------------------------------------------------
  // 2. KETERGANTUNGAN RESPONDEN DALAM PROVINSI (ICC & CLUSTERING)
  // -------------------------------------------------------------
  console.log('\n-------------------------------------------------------------');
  console.log('2. KETERGANTUNGAN RESPONDEN DALAM PROVINSI (ICC & CLUSTER ROBUST)');
  console.log('-------------------------------------------------------------');

  const provMap = {};
  regRows.forEach((r, idx) => {
    if (!provMap[r.province]) provMap[r.province] = [];
    provMap[r.province].push({ val: r.q27_focus_level, idx });
  });

  const provinces = Object.keys(provMap);
  const G = provinces.length;
  const groupSizes = provinces.map(p => provMap[p].length);
  const N_total = Y.length;

  const groupMeans = provinces.map(p => mean(provMap[p].map(item => item.val)));
  const grandMeanY = mean(Y);

  let ssBetweenProv = 0;
  provinces.forEach((p, idx) => {
    ssBetweenProv += groupSizes[idx] * Math.pow(groupMeans[idx] - grandMeanY, 2);
  });
  let ssWithinProv = 0;
  provinces.forEach((p, idx) => {
    provMap[p].forEach(item => {
      ssWithinProv += Math.pow(item.val - groupMeans[idx], 2);
    });
  });

  const dfBetweenProv = G - 1;
  const dfWithinProv = N_total - G;
  const msBetweenProv = ssBetweenProv / dfBetweenProv;
  const msWithinProv = ssWithinProv / dfWithinProv;
  const fProv = msBetweenProv / msWithinProv;
  const pValProv = fPValue(fProv, dfBetweenProv, dfWithinProv);

  const sumN2 = groupSizes.reduce((acc, ni) => acc + ni * ni, 0);
  const n0 = (N_total - (sumN2 / N_total)) / (G - 1);

  const tau00 = Math.max(0, (msBetweenProv - msWithinProv) / n0);
  const sigma2 = msWithinProv;
  const icc = tau00 / (tau00 + sigma2);

  console.log(`>>> 2.1 Unconditional Null Model ICC (Level 2: Province, G = ${G}):`);
  console.log(`Between-Province Variance (tau00): ${tau00.toFixed(5)}`);
  console.log(`Within-Province Variance (sigma2): ${sigma2.toFixed(5)}`);
  console.log(`Intraclass Correlation Coefficient (ICC): ${icc.toFixed(4)} (${(icc * 100).toFixed(2)}%)`);
  console.log(`One-Way ANOVA across Provinces: F(${dfBetweenProv}, ${dfWithinProv}) = ${fProv.toFixed(3)}, p = ${pValProv.toFixed(4)}`);

  // Cluster-Robust Standard Errors (CRSE / Huber-White)
  const invXtX = regModel.invXtX;
  const p_dim = regModel.p;
  const meat = Array.from({ length: p_dim }, () => new Array(p_dim).fill(0));

  provinces.forEach(prov => {
    const provItems = provMap[prov];
    const u_g = new Array(p_dim).fill(0);
    provItems.forEach(item => {
      const e_i = regModel.residuals[item.idx];
      const x_i = X_mat[item.idx];
      for (let j = 0; j < p_dim; j++) {
        u_g[j] += x_i[j] * e_i;
      }
    });

    for (let i = 0; i < p_dim; i++) {
      for (let j = 0; j < p_dim; j++) {
        meat[i][j] += u_g[i] * u_g[j];
      }
    }
  });

  const smallSampleFactor = (G / (G - 1)) * ((N_total - 1) / (N_total - p_dim));
  for (let i = 0; i < p_dim; i++) {
    for (let j = 0; j < p_dim; j++) {
      meat[i][j] *= smallSampleFactor;
    }
  }

  const temp = Array.from({ length: p_dim }, () => new Array(p_dim).fill(0));
  for (let i = 0; i < p_dim; i++) {
    for (let j = 0; j < p_dim; j++) {
      for (let k = 0; k < p_dim; k++) {
        temp[i][j] += invXtX[i][k] * meat[k][j];
      }
    }
  }

  const vcovCluster = Array.from({ length: p_dim }, () => new Array(p_dim).fill(0));
  for (let i = 0; i < p_dim; i++) {
    for (let j = 0; j < p_dim; j++) {
      for (let k = 0; k < p_dim; k++) {
        vcovCluster[i][j] += temp[i][k] * invXtX[k][j];
      }
    }
  }

  const crseList = Array.from({ length: p_dim }, (_, i) => Math.sqrt(vcovCluster[i][i]));
  const tCluster = regModel.beta.map((b, i) => b / crseList[i]);
  const pCluster = tCluster.map(t => tPValue(Math.abs(t), G - 1));

  console.log('\n>>> 2.2 Model Comparison: OLS Standard Errors vs. Cluster-Robust Standard Errors (CRSE, G = 38):');
  console.table(varNames.map((name, i) => ({
    Parameter: name,
    'Unstd B': regModel.beta[i].toFixed(3),
    'OLS SE': regModel.seBeta[i].toFixed(3),
    'Cluster-Robust SE (CRSE)': crseList[i].toFixed(3),
    'CRSE t-stat': tCluster[i].toFixed(2),
    'CRSE p-value (df=37)': pCluster[i] < 0.001 ? '< .001' : pCluster[i].toFixed(4),
    '95% Cluster CI': `[${(regModel.beta[i] - 2.026 * crseList[i]).toFixed(3)}, ${(regModel.beta[i] + 2.026 * crseList[i]).toFixed(3)}]`
  })));

  // -------------------------------------------------------------
  // 3. PERBANDINGAN REGIONAL (WELCH ANOVA & GAMES-HOWELL)
  // -------------------------------------------------------------
  console.log('\n-------------------------------------------------------------');
  console.log('3. PERBANDINGAN REGIONAL (WELCH ANOVA & GAMES-HOWELL POST-HOC)');
  console.log('-------------------------------------------------------------');

  function normalizeArea(a) {
    if (!a) return 'Unspecified';
    const s = a.trim().toLowerCase();
    if (s.includes('perkotaan') || s.includes('urban')) return 'Perkotaan';
    if (s.includes('perdesaan') || s.includes('pedesaan') || s.includes('rural')) return 'Perdesaan';
    if (s.includes('kepulauan') || s.includes('archipelago')) return 'Wilayah Kepulauan';
    if (s.includes('perbatasan') || s.includes('border')) return 'Wilayah Perbatasan';
    if (s.includes('terpencil') || s.includes('3t') || s.includes('remote')) return 'Wilayah Terpencil/3T';
    return 'Lainnya';
  }

  const distinctAreas = ['Perkotaan', 'Perdesaan', 'Wilayah Kepulauan', 'Wilayah Perbatasan', 'Wilayah Terpencil/3T'];

  const testVars = [
    { code: 'Q12', col: 'q12_disruption_frequency', name: 'Disruption Frequency' },
    { code: 'Q15', col: 'q15_workload_overlap', name: 'Workload Overlap' },
    { code: 'Q16', col: 'q16_interrupted_by_work', name: 'Leaving Learning for Duties' },
    { code: 'Q18', col: 'q18_supervisor_support', name: 'Supervisor Support' },
    { code: 'Q19', col: 'q19_location_mobility', name: 'Location Mobility' },
    { code: 'Q20', col: 'q20_easy_access', name: 'Device Ease of Access' },
    { code: 'Q21', col: 'q21_file_size_issue', name: 'File Size Issue' },
    { code: 'Q27', col: 'q27_focus_level', name: 'Learning Focus' }
  ];

  const welchSummary = [];
  const gamesHowellResults = {};

  for (const v of testVars) {
    const groups = distinctAreas.map(area => {
      return rows
        .filter(r => normalizeArea(r.area_type) === area)
        .map(r => r[v.col])
        .filter(val => typeof val === 'number' && !isNaN(val));
    });

    const wRes = welchANOVA(groups);
    welchSummary.push({
      Variable: `${v.code} (${v.name})`,
      'Perkotaan (n=3020)': `${wRes.means[0].toFixed(2)} ± ${Math.sqrt(wRes.variances[0]).toFixed(2)}`,
      'Perdesaan (n=524)': `${wRes.means[1].toFixed(2)} ± ${Math.sqrt(wRes.variances[1]).toFixed(2)}`,
      'Kepulauan (n=237)': `${wRes.means[2].toFixed(2)} ± ${Math.sqrt(wRes.variances[2]).toFixed(2)}`,
      'Perbatasan (n=91)': `${wRes.means[3].toFixed(2)} ± ${Math.sqrt(wRes.variances[3]).toFixed(2)}`,
      'Terpencil (n=30)': `${wRes.means[4].toFixed(2)} ± ${Math.sqrt(wRes.variances[4]).toFixed(2)}`,
      'Welch F': wRes.fWelch.toFixed(2),
      'df1': wRes.df1.toFixed(0),
      'df2': wRes.df2.toFixed(1),
      'p-value': wRes.pVal < 0.001 ? '< .001' : wRes.pVal.toFixed(4)
    });

    if (wRes.pVal < 0.05) {
      gamesHowellResults[v.code] = gamesHowell(groups, distinctAreas);
    }
  }

  console.log('\n>>> 3.1 Ringkasan Uji Welch ANOVA Lintas Tipologi:');
  console.table(welchSummary);

  ['Q12', 'Q15', 'Q16', 'Q19'].forEach(code => {
    if (gamesHowellResults[code]) {
      console.log(`\n>>> 3.2 Games-Howell Post-Hoc Pairwise Comparisons untuk ${code}:`);
      console.table(gamesHowellResults[code].map(gh => ({
        Comparison: `${gh.groupA} vs ${gh.groupB}`,
        'Mean Diff (A - B)': gh.meanDiff.toFixed(3),
        'SE Diff': gh.seDiff.toFixed(3),
        'df (WS)': gh.dfWS.toFixed(1),
        '95% CI of Difference': `[${gh.ciLower.toFixed(3)}, ${gh.ciUpper.toFixed(3)}]`,
        'Adjusted p': gh.pAdj < 0.001 ? '< .001' : gh.pAdj.toFixed(4),
        'Significant?': gh.isSignificant ? 'YES (p < .05)' : 'No'
      })));
    }
  });

  fs.writeFileSync('d:/aplikasi/kuesioner/scripts/advanced_diagnostics.json', JSON.stringify({
    zeroOrder,
    vifList,
    suppressionTable,
    pcaResult,
    iccResults: { tau00, sigma2, icc, fProv, pValProv, G, N_total },
    crseComparison: varNames.map((name, i) => ({
      name,
      beta: regModel.beta[i],
      olsSE: regModel.seBeta[i],
      crseSE: crseList[i],
      tCluster: tCluster[i],
      pCluster: pCluster[i]
    })),
    welchSummary,
    gamesHowellResults
  }, null, 2));

  console.log('\nSUCCESS: Advanced diagnostics computed and exported to d:/aplikasi/kuesioner/scripts/advanced_diagnostics.json');
  await sql.end();
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
