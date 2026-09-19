/**
 * Proposal ↔ Dataset Traceability Specification
 * Source of Truth: Dissertation Proposal Revision 2 (Pujiatmo Subarkah, 2026)
 */

export interface ProposalDatasetTraceabilityItem {
  construct: string;
  equation: string;
  dataSource: string;
  variables: string;
  role: string;
  destination: string;
  category: 'Context' | 'Evidence' | 'Observability' | 'Spatial' | 'Decision';
}

export const PROPOSAL_DATASET_TRACEABILITY: ProposalDatasetTraceabilityItem[] = [
  {
    construct: 'Raw Behavioral Traces',
    equation: 'Eq. (1)',
    dataSource: 'LMS Platform Logs & Telemetry',
    variables: 'login, duration, clickstream, completion, artifacts, revisit',
    role: 'Input bukti interaksi perilaku belajar digital mentah',
    destination: '/analisis (Modul 02: Trace & Evidence)',
    category: 'Evidence'
  },
  {
    construct: 'Six-Dimensional Context Profile',
    equation: 'Eq. (2)',
    dataSource: 'Kuesioner Konteks ASN + Telemetri Sistem',
    variables: 'T (Temporal), I (Infrastruktur), O (Organisasi), D (Device), W (Workload), S (Spasial)',
    role: 'Vektor pengondisi lingkungan belajar nyata peserta',
    destination: '/analisis (Modul 01: Context Profile 6D)',
    category: 'Context'
  },
  {
    construct: 'Structural Spatial Cluster',
    equation: 'Eq. (2a)',
    dataSource: 'BPS, Potensi Desa (Podes), APJII, Ookla Speedtest',
    variables: 'Status 3T/Non-3T, indeks sinyal desa, penetrasi internet, kecepatan bandwidth',
    role: 'Karakterisasi makro kewilayahan (Lapis 1 Indeks Spasial)',
    destination: '/analisis (Modul 01 & Sidebar Spasial)',
    category: 'Spatial'
  },
  {
    construct: 'Session Network Quality',
    equation: 'Eq. (2b)',
    dataSource: 'Client-side Telemetry / Web Performance API',
    variables: 'latency (ms), retry_rate, sync_failure, buffering_duration',
    role: 'Kesiapan konektivitas mikro pada saat sesi aktif',
    destination: '/analisis (Modul 01: N_{i,t})',
    category: 'Context'
  },
  {
    construct: 'Composite Spatial Variable',
    equation: 'Eq. (2c)',
    dataSource: 'Fusi Klaster K_i dan Telemetri N_{i,t}',
    variables: 'S_{i,t} = δ K_i + (1 - δ) N_{i,t}',
    role: 'Variabel moderator spasial dalam vektor konteks c_{i,t}',
    destination: '/analisis (Modul 01: S_{i,t})',
    category: 'Spatial'
  },
  {
    construct: 'Missingness (Observability Limitation)',
    equation: 'Eq. (3)',
    dataSource: 'Diagnostic Checkpoint Logger (LMS & Video)',
    variables: 'n_observed / n_expected checkpoints, loss ratio',
    role: 'Mengukur batas observabilitas sistem (MNAR, bukan kelalaian)',
    destination: '/analisis (Modul 03: Missingness m_{i,t})',
    category: 'Observability'
  },
  {
    construct: 'Evidence Quality Score',
    equation: 'Eq. (4)',
    dataSource: 'Telemetry Friction & Noise Analyzer',
    variables: 'm_{i,t}, noise_{i,t}, jitter, packet loss',
    role: 'Menentukan keandalan data sebelum baseline CCBN dihitung',
    destination: '/analisis (Modul 03: Evidence Quality q_{i,t})',
    category: 'Observability'
  },
  {
    construct: 'Context-Conditioned Baseline (CCBN)',
    equation: 'Eq. (5)',
    dataSource: 'Fungsi CCBN berbasis c_{i,t} dan q_{i,t}',
    variables: 'b̂_{i,t} = E[B_{i,t} | c_{i,t}, q_{i,t}] = f(c_{i,t}, q_{i,t})',
    role: 'Estimator ekspektasi perilaku wajar terkalibrasi kendala',
    destination: '/analisis (Modul 04: CCBN Baseline b̂_{i,t})',
    category: 'Evidence'
  },
  {
    construct: 'Contextual Residual',
    equation: 'Eq. (6)',
    dataSource: 'Selisih Bukti Aktual B_{i,t} dan Baseline b̂_{i,t}',
    variables: 'd_{i,t} = B_{i,t} - b̂_{i,t}',
    role: 'Deviasi diagnostik individual untuk memicu dukungan adaptif',
    destination: '/analisis (Modul 04: Residual d_{i,t})',
    category: 'Evidence'
  },
  {
    construct: 'Contextual Group Disparity',
    equation: 'Eq. (7)',
    dataSource: 'Distribusi Agregat Residual Antar-Kelompok Wilayah',
    variables: 'D_t = disparity(d_{i,t} | group/context)',
    role: 'Metrik evaluasi disparitas luaran antar kelompok (g, h ∈ G)',
    destination: '/analisis (Modul 06: Contextual Disparity D_t)',
    category: 'Decision'
  },
  {
    construct: 'Contextual Burden of Intervention',
    equation: 'Eq. (8)',
    dataSource: 'Spesifikasi Modalitas Aksi & Profil Konteks',
    variables: 'CB_{i,a,t} = cost_a(c_{i,t}, Δc_{i,t})',
    role: 'Beban kuota, waktu, dan perangkat dari materi yang disarankan',
    destination: '/analisis (Modul 06 & Modul 07)',
    category: 'Decision'
  },
  {
    construct: 'Recommendation Burden Gap',
    equation: 'Eq. (8a)',
    dataSource: 'Evaluator Beban Lintas-Kelompok Wilayah',
    variables: 'Gap_burden = max_{g,h} | E[CB | g] - E[CB | h] |',
    role: 'Guardrail keadilan beban agar wilayah 3T tidak dibebani materi berat',
    destination: '/analisis (Modul 06 & Section 10)',
    category: 'Decision'
  },
  {
    construct: 'Interpretation Error Gap',
    equation: 'Eq. (8b)',
    dataSource: 'Evaluator Galat Penaksiran Residual Antardaerah',
    variables: 'Gap_interpretation = max_{g,h} | MAE_g(d) - MAE_h(d) |',
    role: 'Guardrail epistemik agar keakuratan penafsiran residual tidak bias',
    destination: '/analisis (Modul 06 & Section 10)',
    category: 'Observability'
  },
  {
    construct: 'Calibrated Multi-Objective Reward',
    equation: 'Eq. (9)',
    dataSource: 'Decision Support Optimization Layer',
    variables: "r'_{i,a,t+1} = r_{i,a,t} + η U - μ CB - ν OB - ρ Δc - γ D_t",
    role: 'Fungsi reward adaptif terkalibrasi disparitas dan beban dinas',
    destination: '/analisis (Modul 07: LinUCB Policy)',
    category: 'Decision'
  },
  {
    construct: 'Visual Observability Weight & Fusion',
    equation: 'Eq. (10, 10a)',
    dataSource: 'Webcam Stream On-device & Log LMS',
    variables: 'w(S, q_visual) & F_{i,t} = w V + (1-w) b_LMS',
    role: 'Sinyal pendukung observabilitas (bukan ground truth mutlak)',
    destination: '/analisis (Modul 02 & Observability Layer)',
    category: 'Observability'
  },
  {
    construct: 'Baseline Validity Gate',
    equation: 'Eq. (18a–18c)',
    dataSource: 'Threshold Evaluator atas S_{i,t} dan q_{i,t}',
    variables: 'VALID (18a), BOUNDARY (18b), INVALID (18c)',
    role: 'Safeguard epistemik pengontrol inferensi otomatis vs eskalasi HITL',
    destination: '/analisis (Modul 05 & Top Ledger)',
    category: 'Observability'
  }
];
