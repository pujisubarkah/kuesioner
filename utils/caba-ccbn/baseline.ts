/**
 * CABA-CCBN Module: Core Context-Conditioned Behavioral Baseline & Residual (Equations 5, 6)
 * Source of Truth: Dissertation Proposal Revision 2 (Pujiatmo Subarkah, 2026)
 */

import type { Context6D } from './context';

/**
 * Eq. (5): Context-Conditioned Expected Behavioral Baseline
 * b̂_{i,t} = E[B_{i,t} | c_{i,t}, q_{i,t}] = f(c_{i,t}, q_{i,t})
 * This is the CORE CCBN mechanism: estimating what behavioral outcome is expected
 * given the specific environmental constraints and evidence quality.
 */
export function computeCCBNBaseline(
  context: Context6D,
  evidenceQuality: number,
  networkReadiness: number
): number {
  let expectedBase = 0.82;
  
  // Moderate by workload context W (1 to 5)
  expectedBase -= (context.W / 5) * 0.22;
  
  // Moderate by network / infrastructure friction
  expectedBase -= (1 - networkReadiness) * 0.12;
  
  // Moderate by evidence quality / observability
  expectedBase -= (1 - evidenceQuality) * 0.08;
  
  return Math.max(0.20, Math.min(0.90, Math.round(expectedBase * 100) / 100));
}

/**
 * Eq. (6): Contextual Residual
 * d_{i,t} = B_{i,t} - b̂_{i,t}
 * Individual-level deviation from context-conditioned expected behavior.
 * Non-punitive: d < 0 indicates need for alternative modality support, not poor character.
 */
export function computeResidual(behavioralEvidence: number, expectedBaseline: number): number {
  const d = behavioralEvidence - expectedBaseline;
  return Math.round(d * 100) / 100;
}
