/**
 * CABA-CCBN Module: Multimodal Observability & Weighting (Equations 10, 10a, 16a)
 * Source of Truth: Dissertation Proposal Revision 2 (Pujiatmo Subarkah, 2026)
 */

/**
 * Eq. (16a): Visual Observability Quality
 * q_visual_{i,t} = 1 - visual_missingness - λ_v * noise_visual(FDR, HRLV)
 */
export function computeVisualObservabilityQuality(
  evidenceQuality: number,
  is3TRegion: boolean
): number {
  const penalty = is3TRegion ? 0.10 : 0.0;
  return Math.max(0, Math.min(1, Math.round((evidenceQuality - penalty) * 100) / 100));
}

/**
 * Eq. (10): Visual Observability Weighting
 * w(S_{i,t}, q_visual_{i,t}) = σ(α1 * (1 - S_{i,t}) + α2 * q_visual_{i,t})
 * If visual observability is poor (e.g. camera-off, poor bandwidth), the weight decreases.
 */
export function computeVisualObservabilityWeight(
  spatialIndex: number,
  visualObservabilityQuality: number,
  alpha1: number = 1.0,
  alpha2: number = 1.0
): number {
  const sigmoidInput = (alpha1 * (1 - spatialIndex)) + (alpha2 * visualObservabilityQuality) - 1.0;
  const w = 1 / (1 + Math.exp(-sigmoidInput));
  return Math.round(w * 100) / 100;
}

/**
 * Eq. (10a): Multimodal Fusion
 * F_{i,t} = w_{i,t} * V_{i,t} + (1 - w_{i,t}) * b_LMS_{i,t}
 * Visual signals are supporting observability signals; they do not dominate if unobservable.
 */
export function computeMultimodalFusion(
  visualSignal: number,
  lmsBaseline: number,
  visualWeight: number
): number {
  const F = (visualWeight * visualSignal) + ((1 - visualWeight) * lmsBaseline);
  return Math.round(F * 100) / 100;
}
