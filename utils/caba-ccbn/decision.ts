/**
 * CABA-CCBN Module: Adaptive Decision & Calibrated Reward (Equation 9 & LinUCB)
 * Source of Truth: Dissertation Proposal Revision 2 (Pujiatmo Subarkah, 2026)
 */

import type { Context6D } from './context';

export interface AdaptiveAction {
  id: string;
  name: string;
  description: string;
  suitabilityCondition: string;
  bandwidthRequirement: string;
}

export const ADAPTIVE_ACTION_SPACE: AdaptiveAction[] = [
  {
    id: 'A1',
    name: 'Video HD + Studi Kasus Interaktif',
    description: 'Format multimedia komprehensif untuk konektivitas stabil dan beban kerja terkelola.',
    suitabilityCondition: 'Bandwidth > 2 Mbps, Workload <= 3',
    bandwidthRequirement: 'High (> 2 Mbps)'
  },
  {
    id: 'A2',
    name: 'Text-First + Audio Mikro Terkompresi',
    description: 'Format pembelajaran esensial hemat kuota untuk mengatasi hambatan konektivitas 3T.',
    suitabilityCondition: 'Bandwidth < 200 kbps, 3T Cluster',
    bandwidthRequirement: 'Ultra Low (< 200 kbps)'
  },
  {
    id: 'A3',
    name: 'Interactive Scenario Checkpoint',
    description: 'Kuis mikro berbasis studi kasus interaktif untuk mengkalibrasi retensi konseptual.',
    suitabilityCondition: 'Residual d < -0.15 (Dukungan Konseptual)',
    bandwidthRequirement: 'Medium (300-800 kbps)'
  },
  {
    id: 'A4',
    name: 'Dynamic Micro-Chunking',
    description: 'Modul ringkas 3-5 menit untuk mengakomodasi jadwal pelayanan dinas yang padat.',
    suitabilityCondition: 'Workload >= 4 (Beban Pelayanan Tinggi)',
    bandwidthRequirement: 'Low (< 500 kbps)'
  }
];

/**
 * Eq. (9): Calibrated Multi-Objective Reward Function
 * r'_{i,a,t+1} = r_{i,a,t} + η_t U(a, d_{i,t}) - μ_t CB_{i,a,t} - ν_t OB_{i,a,t} - ρ_t Δc_{i,t} - γ_t D_t
 * Demonstrates trade-offs between learning utility, contextual burden, service load, context shift, and disparity.
 */
export function computeCalibratedReward(
  baseReward: number,
  contextualResidual: number,
  contextualBurden: number,
  operationalBurden: number,
  contextShiftDelta: number,
  disparityGap: number,
  lambdaDisparityWeight: number = 0.50
): number {
  const eta = 0.35;
  const mu = 0.25;
  const nu = 0.20;
  const rho = 0.10;
  const gamma = lambdaDisparityWeight * 0.40;

  const utilityGain = contextualResidual >= -0.05 ? eta : -eta * 0.8;
  const score = baseReward + utilityGain - (mu * contextualBurden) - (nu * operationalBurden) - (rho * contextShiftDelta) - (gamma * disparityGap);

  return Math.max(0.10, Math.round(score * 100) / 100);
}

/**
 * Selects the optimal non-punitive adaptive learning action based on context, residual, and burden.
 */
export function selectAdaptiveAction(
  context: Context6D,
  contextualResidual: number
): string {
  if (context.I.bandwidthKbps < 200) return 'A2'; // Text-First + Audio Mikro
  if (context.W >= 4) return 'A4'; // Microlearning Chunking for heavy workload
  if (contextualResidual < -0.15) return 'A3'; // Interactive Support Scenario
  return 'A1'; // Standard Full Video HD
}
