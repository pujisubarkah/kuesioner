/**
 * CABA-CCBN Module: Evidence Formation & Missingness (Equations 1, 3, 4)
 * Source of Truth: Dissertation Proposal Revision 2 (Pujiatmo Subarkah, 2026)
 */

export interface RawBehavioralTraces {
  loginCount: number;
  durationMinutes: number;
  clickstreamCount: number;
  substantiveCompletionRatio: number; // 0 to 1
  quizArtifactScore: number; // 0 to 1
  revisitCount: number;
  interactionCount: number;
}

/**
 * Eq. (1): Raw Behavioral Traces X_{i,t} -> Behavioral Outcome B_{i,t}
 * Normalizes multiple raw telemetry traces into a continuous behavioral evidence scalar B_{i,t}.
 * Note: X is NOT a direct measure of learner motivation/competence.
 */
export function computeBehavioralEvidence(traces: RawBehavioralTraces): number {
  const bWatch = Math.min(Math.max(traces.substantiveCompletionRatio, 0), 1.0);
  const bInteraction = Math.min(Math.max(traces.interactionCount / 10, 0), 1.0);
  const bRevisit = Math.min(Math.max(traces.revisitCount / 3, 0), 1.0);
  const bArtifact = Math.min(Math.max(traces.quizArtifactScore, 0), 1.0);

  // Operational weighting for behavioral evidence formulation
  const B = (0.35 * bWatch) + (0.25 * bInteraction) + (0.20 * bRevisit) + (0.20 * bArtifact);
  return Math.round(B * 100) / 100;
}

/**
 * Eq. (3): Missingness m_{i,t} = 1 - (n_observed / n_expected)
 * Represents system observability limitations (MNAR), NOT learner negligence.
 */
export function computeMissingness(observedEvents: number, expectedEvents: number = 10): number {
  if (expectedEvents <= 0) return 0;
  const observedRatio = Math.min(Math.max(observedEvents / expectedEvents, 0), 1);
  const m = 1 - observedRatio;
  return Math.round(m * 100) / 100;
}

/**
 * Eq. (4): Evidence Quality q_{i,t} = 1 - m_{i,t} - λ * noise_{i,t}
 * Measures the reliability/observability of available evidence.
 */
export function computeEvidenceQuality(
  missingnessRate: number,
  noiseRate: number,
  lambdaPenalty: number = 0.50
): number {
  const q = 1 - missingnessRate - (lambdaPenalty * noiseRate);
  return Math.max(0, Math.min(1, Math.round(q * 100) / 100));
}
