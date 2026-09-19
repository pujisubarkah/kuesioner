/**
 * CABA-CCBN Module: Context Representation (Equations 2, 2a, 2b, 2c)
 * Source of Truth: Dissertation Proposal Revision 2 (Pujiatmo Subarkah, 2026)
 */

export interface Context6D {
  T: string; // Temporal context (e.g. session phase, routine vs peak)
  I: {
    bandwidthKbps: number;
    latencyMs: number;
    description: string;
  }; // Infrastructure context
  O: string; // Organizational context
  D: string; // Device & delivery context
  W: number; // Workload context (1-5 scale)
  S: number; // Composite spatial index S_{i,t}
}

export interface SessionNetworkTelemetry {
  latencyMs: number;
  retryRate?: number;
  syncFailureRate?: number;
  bufferingRate?: number;
  bandwidthKbps: number;
}

/**
 * Eq. (2a): Structural Spatial Cluster K_i
 * Represents macro structural spatial context from open data (BPS, Podes, APJII, Ookla).
 */
export function computeSpatialClusterScore(regionType: '3T' | 'Urban' | string): number {
  if (regionType === '3T' || regionType.toLowerCase().includes('3t') || regionType.toLowerCase().includes('tertinggal')) {
    return 0.30;
  }
  return 0.80;
}

/**
 * Eq. (2b): Session Network Quality N_{i,t}
 * Normalizes live telemetry metrics into a [0, 1] readiness score.
 */
export function computeSessionNetworkQuality(telemetry: SessionNetworkTelemetry): number {
  const bandwidthScore = Math.min(Math.max(telemetry.bandwidthKbps / 5000, 0), 1);
  const latencyScore = Math.max(0, 1 - (telemetry.latencyMs / 1200));
  
  // Weights w1..w4 as per design parameter defaults
  const w1 = 0.4;
  const w2 = 0.6;
  return Math.round(((bandwidthScore * w2) + (latencyScore * w1)) * 100) / 100;
}

/**
 * Eq. (2c): Composite Spatial Index S_{i,t} = δ K_i + (1 - δ) N_{i,t}
 * S is a contextual moderator variable within c_{i,t}.
 */
export function computeSpatialIndex(
  regionType: '3T' | 'Urban',
  telemetry: SessionNetworkTelemetry,
  delta: number = 0.60
): number {
  const Ki = computeSpatialClusterScore(regionType);
  const Nit = computeSessionNetworkQuality(telemetry);
  const S = (delta * Ki) + ((1 - delta) * Nit);
  return Math.round(S * 100) / 100;
}

/**
 * Eq. (2): Six-Dimensional Context Vector c_{i,t} = [T, I, O, D, W, S]
 */
export function createContextProfile(
  temporal: string,
  bandwidthKbps: number,
  latencyMs: number,
  organization: string,
  device: string,
  workload: number,
  spatialIndex: number
): Context6D {
  return {
    T: temporal,
    I: {
      bandwidthKbps,
      latencyMs,
      description: `${bandwidthKbps} kbps / ${latencyMs} ms`
    },
    O: organization,
    D: device,
    W: Math.min(Math.max(workload, 1), 5),
    S: Math.min(Math.max(spatialIndex, 0), 1)
  };
}
