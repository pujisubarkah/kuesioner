/**
 * CABA-CCBN Module: Contextual Burden & Fairness Gaps (Equations 8, 8a, 8b)
 * Source of Truth: Dissertation Proposal Revision 2 (Pujiatmo Subarkah, 2026)
 */

import type { Context6D } from './context';

export interface ActionBurdenCost {
  bandwidthRequiredKbps: number;
  screenSizeRequired: 'small' | 'medium' | 'large';
  uninterruptedMinutes: number;
}

/**
 * Eq. (8): Contextual Burden
 * CB_{i,a,t} = cost_a(c_{i,t}, Δc_{i,t})
 * Measures the physical, infrastructural, and operational burden imposed by action a.
 */
export function computeContextualBurden(
  actionId: string,
  context: Context6D
): number {
  let cost = 0.10;
  if (actionId === 'A1') { // High-Def Video + Intensive Case
    cost = context.I.bandwidthKbps < 500 ? 0.85 : 0.25;
  } else if (actionId === 'A2') { // Text-First + Audio Mikro
    cost = 0.15; // Low burden
  } else if (actionId === 'A3') { // Interactive Scenario
    cost = context.W >= 4 ? 0.50 : 0.20;
  } else if (actionId === 'A4') { // Dynamic Micro-Chunking
    cost = 0.10; // Very low burden
  }
  return Math.round(cost * 100) / 100;
}

/**
 * Eq. (8a): Recommendation Burden Gap
 * Gap_burden = max_{g,h} | E[CB | g] - E[CB | h] |
 */
export function computeRecommendationBurdenGap(burdenGroupA: number, burdenGroupB: number): number {
  return Math.round(Math.abs(burdenGroupA - burdenGroupB) * 100) / 100;
}

/**
 * Eq. (8b): Interpretation Error Gap
 * Gap_interpretation = max_{g,h} | MAE_g(d) - MAE_h(d) |
 * Serves as an epistemic guardrail.
 */
export function computeInterpretationErrorGap(maeGroupA: number, maeGroupB: number): number {
  return Math.round(Math.abs(maeGroupA - maeGroupB) * 100) / 100;
}
