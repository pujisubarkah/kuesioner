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

export interface ContextProfileOptions {
  temporal?: string;
  temporalHour?: number;
  bandwidthKbps: number;
  latencyMs: number;
  packetLossPct?: number;
  organization?: string;
  organizationSupportScore?: number;
  device?: string;
  deviceType?: string;
  workload?: number;
  workloadScore?: number;
  spatialClusterScore?: number;
  spatialIndex: number;
}

/**
 * Eq. (2a): Structural Spatial Cluster K_i
 * Represents macro structural spatial context from open data (BPS, Podes, APJII, Ookla).
 */
export function computeSpatialClusterScore(regionType?: '3T' | 'Urban' | string | number | null): number {
  if (regionType === undefined || regionType === null) {
    return 0.50;
  }
  if (typeof regionType === 'number') {
    return regionType <= 0.50 ? 0.30 : 0.80;
  }
  const str = String(regionType).toLowerCase();
  if (str === '3t' || str.includes('3t') || str.includes('tertinggal') || str.includes('remote')) {
    return 0.30;
  }
  return 0.80;
}

/**
 * Eq. (2b): Session Network Quality N_{i,t}
 * Normalizes live telemetry metrics into a [0, 1] readiness score.
 */
export function computeSessionNetworkQuality(
  telemetryOrBandwidth: SessionNetworkTelemetry | number,
  latencyMsParam?: number
): number {
  let bw = 1000;
  let lat = 50;

  if (typeof telemetryOrBandwidth === 'object' && telemetryOrBandwidth !== null) {
    bw = telemetryOrBandwidth.bandwidthKbps ?? 1000;
    lat = telemetryOrBandwidth.latencyMs ?? 50;
  } else if (typeof telemetryOrBandwidth === 'number') {
    bw = telemetryOrBandwidth;
    lat = latencyMsParam ?? 50;
  }

  const bandwidthScore = Math.min(Math.max(bw / 5000, 0), 1);
  const latencyScore = Math.max(0, 1 - (lat / 1200));
  
  const w1 = 0.4;
  const w2 = 0.6;
  return Math.round(((bandwidthScore * w2) + (latencyScore * w1)) * 100) / 100;
}

/**
 * Eq. (2c): Composite Spatial Index S_{i,t} = δ K_i + (1 - δ) N_{i,t}
 * S is a contextual moderator variable within c_{i,t}.
 */
export function computeSpatialIndex(
  regionType: '3T' | 'Urban' | string | number,
  telemetryOrBandwidth: SessionNetworkTelemetry | number,
  latencyOrDelta: number = 50,
  deltaParam: number = 0.35
): number {
  const Ki = computeSpatialClusterScore(regionType);
  let Nit = 0.5;
  let delta = 0.35;

  if (typeof telemetryOrBandwidth === 'object' && telemetryOrBandwidth !== null) {
    Nit = computeSessionNetworkQuality(telemetryOrBandwidth);
    delta = typeof latencyOrDelta === 'number' ? latencyOrDelta : 0.35;
  } else if (typeof telemetryOrBandwidth === 'number') {
    const lat = typeof latencyOrDelta === 'number' ? latencyOrDelta : 50;
    Nit = computeSessionNetworkQuality(telemetryOrBandwidth, lat);
    delta = typeof deltaParam === 'number' ? deltaParam : 0.35;
  }

  const S = (delta * Ki) + ((1 - delta) * Nit);
  return Math.round(S * 100) / 100;
}

/**
 * Eq. (2): Six-Dimensional Context Vector c_{i,t} = [T, I, O, D, W, S]
 */
export function createContextProfile(
  param1: ContextProfileOptions | string,
  bandwidthKbps?: number,
  latencyMs?: number,
  organization?: string,
  device?: string,
  workload?: number,
  spatialIndex?: number
): Context6D {
  if (typeof param1 === 'object' && param1 !== null) {
    const opts = param1 as ContextProfileOptions;
    const bw = opts.bandwidthKbps ?? 1000;
    const lat = opts.latencyMs ?? 50;
    const temporal = opts.temporal || (opts.temporalHour ? `Jam ${opts.temporalHour}:00 (Sesi Mandiri)` : 'Sesi Rutin');
    const org = opts.organization || (opts.organizationSupportScore ? `Dukungan Instansi (${Math.round(opts.organizationSupportScore * 100)}%)` : 'Standar Instansi');
    const dev = opts.device || opts.deviceType || 'Smartphone';
    const wl = opts.workload ?? opts.workloadScore ?? 3;
    const s = opts.spatialIndex ?? 0.5;

    return {
      T: temporal,
      I: {
        bandwidthKbps: bw,
        latencyMs: lat,
        description: `${bw} kbps / ${lat} ms`
      },
      O: org,
      D: dev,
      W: Math.min(Math.max(wl, 1), 5),
      S: Math.min(Math.max(s, 0), 1)
    };
  }

  const temporal = typeof param1 === 'string' ? param1 : 'Sesi Rutin';
  const bw = bandwidthKbps ?? 1000;
  const lat = latencyMs ?? 50;
  const org = organization ?? 'Dukungan Mandiri';
  const dev = device ?? 'Smartphone';
  const wl = workload ?? 3;
  const s = spatialIndex ?? 0.5;

  return {
    T: temporal,
    I: {
      bandwidthKbps: bw,
      latencyMs: lat,
      description: `${bw} kbps / ${lat} ms`
    },
    O: org,
    D: dev,
    W: Math.min(Math.max(wl, 1), 5),
    S: Math.min(Math.max(s, 0), 1)
  };
}
