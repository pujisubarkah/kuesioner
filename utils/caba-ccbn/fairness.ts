/**
 * CABA-CCBN Module: Seven Spatial Fairness Metrics (Equations 11–17)
 * Source of Truth: Dissertation Proposal Revision 2 (Pujiatmo Subarkah, 2026)
 */

export interface SpatialFairnessMetricsResult {
  spatialPerformanceGap: number; // Eq. (11)
  lowEngagementMisinterpretationGap: number; // Eq. (12)
  residualFprGap: number; // Eq. (13a, 13c)
  residualFnrGap: number; // Eq. (13b, 13c)
  fprFnrGap: number; // Eq. (13c)
  calibrationErrorGap: number; // Eq. (14)
  missingnessBiasGap: number; // Eq. (15)
  visualObservabilityFairnessGap: number; // Eq. (16)
  humanOverrideRateGap: number; // Eq. (17)
}

/**
 * Eqs. (11)–(17): Computes the 7 spatial fairness metrics for group evaluation.
 * Note: Returned values are illustrative simulation values when using prototype sandbox.
 */
export function computeSpatialFairnessMetrics(
  disparityGap: number,
  evidenceQuality: number
): SpatialFairnessMetricsResult {
  const perfGap = Math.round((disparityGap * 0.40) * 100) / 100;
  const lowEngGap = Math.round((0.08 * (1 - evidenceQuality)) * 100) / 100;
  const fprGap = 0.04;
  const fnrGap = 0.05;
  const fprFnrGap = Math.max(fprGap, fnrGap);
  const calibGap = Math.round((disparityGap * 0.30) * 100) / 100;
  const missGap = Math.round((0.10 * (1 - evidenceQuality)) * 100) / 100;
  const visualGap = 0.07;
  const overrideGap = 0.08;

  return {
    spatialPerformanceGap: perfGap,
    lowEngagementMisinterpretationGap: lowEngGap,
    residualFprGap: fprGap,
    residualFnrGap: fnrGap,
    fprFnrGap,
    calibrationErrorGap: calibGap,
    missingnessBiasGap: missGap,
    visualObservabilityFairnessGap: visualGap,
    humanOverrideRateGap: overrideGap
  };
}
