/**
 * CABA-CCBN Module: Baseline Validity Gate (Equations 18a, 18b, 18c)
 * Source of Truth: Dissertation Proposal Revision 2 (Pujiatmo Subarkah, 2026)
 */

export type BaselineValidityState = 'valid' | 'boundary' | 'invalid';

export interface ValidityGateThresholds {
  thetaSpatial: number; // e.g. 0.35
  thetaSpatialBoundary: number; // e.g. 0.15
  thetaQuality: number; // e.g. 0.65
  thetaQualityBoundary: number; // e.g. 0.35
}

export const DEFAULT_VALIDITY_THRESHOLDS: ValidityGateThresholds = {
  thetaSpatial: 0.35,
  thetaSpatialBoundary: 0.15,
  thetaQuality: 0.65,
  thetaQualityBoundary: 0.35
};

export interface ValidityGateResult {
  state: BaselineValidityState;
  equationNumber: string;
  message: string;
  allowAutomaticRecommendation: boolean;
  restrictToLowBurden: boolean;
  escalateToHITL: boolean;
}

/**
 * Eqs. (18a)–(18c): Baseline Validity Gate
 * Evaluates whether contextual conditions and evidence quality meet epistemic standards.
 * Thresholds are implementation parameters, not universal constants.
 */
export function computeValidityGate(
  spatialIndex: number,
  evidenceQuality: number,
  thresholds: ValidityGateThresholds = DEFAULT_VALIDITY_THRESHOLDS
): ValidityGateResult {
  // Eq. (18a): VALID
  if (spatialIndex >= thresholds.thetaSpatial && evidenceQuality >= thresholds.thetaQuality) {
    return {
      state: 'valid',
      equationNumber: 'Persamaan (18a)',
      message: 'Persamaan (18a) VALID: Evidensi cukup teramati; residual dihitung normal dan rekomendasi adaptif otomatis diizinkan.',
      allowAutomaticRecommendation: true,
      restrictToLowBurden: false,
      escalateToHITL: false
    };
  }

  // Eq. (18c): INVALID
  if (spatialIndex < thresholds.thetaSpatialBoundary || evidenceQuality < thresholds.thetaQualityBoundary) {
    return {
      state: 'invalid',
      equationNumber: 'Persamaan (18c)',
      message: 'Persamaan (18c) INVALID: Not observable; sistem tidak memaksa rekomendasi otomatis, eskalasi langsung ke Human-in-the-Loop.',
      allowAutomaticRecommendation: false,
      restrictToLowBurden: true,
      escalateToHITL: true
    };
  }

  // Eq. (18b): BOUNDARY
  return {
    state: 'boundary',
    equationNumber: 'Persamaan (18b)',
    message: 'Persamaan (18b) BOUNDARY: Zona batas observabilitas; residual berkepercayaan rendah, rekomendasi dibatasi pada dukungan berbeban rendah.',
    allowAutomaticRecommendation: true,
    restrictToLowBurden: true,
    escalateToHITL: false
  };
}
