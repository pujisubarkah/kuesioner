/**
 * CABA–CCBN Research Data & Evidence Sources Specification
 * Source of Truth: Dissertation Proposal Revision 2 (Pujiatmo Subarkah, 2026)
 * 
 * Boundary: This module defines the DATA & EVIDENCE LAYER (Inputs to CCBN).
 * The analytical CCBN engine and decision logic reside in /analisis.
 */

export interface DatasetMetadata {
  id: string;
  name: string;
  category: 'Context Data' | 'Raw Behavioral Trace' | 'Behavioral Evidence' | 'Observability / Missingness' | 'Spatial Data' | 'Visual Observability';
  source: string;
  role: string;
  sensitivity: 'Low (Public/Aggregated)' | 'Medium (Internal Anonymized)' | 'High (Individual Telemetry)';
  temporalResolution: string;
  spatialResolution: string;
  variables: string[];
  equationMapping: string;
  output: string;
  destination: string;
  status: 'Prototype / Data Collection' | 'Prototype / Available' | 'Synthetic / Simulation' | 'Field Ready';
  description: string;
  scientificNotes?: string;
}

export const CABA_DATASETS_METADATA: DatasetMetadata[] = [
  {
    id: 'ds-questionnaire',
    name: 'Kuesioner Konteks & Kendala Pembelajaran ASN',
    category: 'Context Data',
    source: 'Survei Kuesioner Digital (Instrumen Pengumpulan Data Konteks)',
    role: 'Akuisisi data profil konteks statis & kuasi-statis peserta',
    sensitivity: 'Medium (Internal Anonymized)',
    temporalResolution: 'Per-Survei / Pre-Training Baseline',
    spatialResolution: 'Tingkat Kabupaten/Kota & Klaster Instansi',
    variables: [
      'Provinsi & Kabupaten (q_1)',
      'Tipe Wilayah 3T / Urban (q_2)',
      'Kategori Instansi (q_3)',
      'Perangkat Utama (q_9)',
      'Sumber Koneksi & Kuota (q_11)',
      'Frekuensi & Tipe Disrupsi Sinyal (q_12, q_13)',
      'Beban Kerja Kedinasan (q_15, q_16)',
      'Dukungan Pimpinan / Organisasi (q_18)'
    ],
    equationMapping: 'Persamaan (2): c_{i,t} = [T, I, O, D, W, S]',
    output: 'Vektor Konteks 6-Dimensi (c_{i,t})',
    destination: '/analisis (Input Pembentuk Baseline CCBN)',
    status: 'Prototype / Data Collection',
    description: 'Instrumen akuisisi data primer untuk memetakan kendala lingkungan belajar ASN. Kuesioner bertindak sebagai sumber data konteks, bukan model CCBN itu sendiri.',
    scientificNotes: 'Kuesioner adalah instrumen pengumpul data konteks; bukan model inferensi atau pengambil keputusan adaptif.'
  },
  {
    id: 'ds-lms-telemetry',
    name: 'Telemetri Jejak Perilaku LMS (Raw Traces)',
    category: 'Raw Behavioral Trace',
    source: 'Log Server LMS Instansi / Smart ASN Training Platform',
    role: 'Perekaman jejak aktivitas perilaku digital autentik saat sesi belajar berlangsung',
    sensitivity: 'High (Individual Telemetry)',
    temporalResolution: 'Event-driven / Milliseconds log timestamp',
    spatialResolution: 'IP Geolocation / Sesi Jaringan',
    variables: [
      'login_timestamp',
      'session_duration_minutes',
      'clickstream_event_counts',
      'substantive_video_watch_ratio',
      'quiz_and_artifact_submissions',
      'page_revisit_frequency',
      'checkpoint_interaction_events'
    ],
    equationMapping: 'Persamaan (1): X_{i,t} = [login, duration, clickstream, completion, artifact, ...]',
    output: 'Vektor Jejak Mentah (X_{i,t}) → Evidensi Perilaku (B_{i,t})',
    destination: '/analisis (Evidence Formation Layer)',
    status: 'Prototype / Available',
    description: 'Data interaksi non-invasif dari platform e-learning. Jejak mentah X diposisikan sebagai evidensi input awal, bukan label langsung kecerdasan atau motivasi.',
    scientificNotes: 'Jejak mentah X bukan vonis kompetensi. Nilai X harus dikalibrasi terhadap konteks sebelum residual dihitung.'
  },
  {
    id: 'ds-network-telemetry',
    name: 'Telemetri Kualitas Jaringan Real-Time Sesi',
    category: 'Context Data',
    source: 'Client-side Telemetry / Web Performance API',
    role: 'Mengukur friksi teknis dan kualitas koneksi aktual selama sesi pembelajaran',
    sensitivity: 'Low (Public/Aggregated)',
    temporalResolution: 'Per-Detik / Sesi Sempit (Periodic Ping 5s)',
    spatialResolution: 'Tingkat Titik Akses / Base Station Sesi',
    variables: [
      'bandwidth_effective_kbps',
      'round_trip_latency_ms',
      'packet_loss_percentage',
      'video_buffering_and_stalls',
      'telemetry_sync_failures',
      'retry_connection_rate'
    ],
    equationMapping: 'Persamaan (2b): N_{i,t} = normalize(w1·latency + w2·retry + w3·sync + w4·buffer)',
    output: 'Skor Kesiapan Jaringan Sesi (N_{i,t})',
    destination: '/analisis (Komponen Indeks Spasial S_{i,t})',
    status: 'Synthetic / Simulation',
    description: 'Data telemetri jaringan yang merekam latensi, jitter, buffering, dan kegagalan sinkronisasi untuk menghitung kesiapan koneksi riil peserta.',
    scientificNotes: 'Kualitas jaringan sesi N_{i,t} mengondisikan ekspektasi durasi interaksi wajar pada waktu t.'
  },
  {
    id: 'ds-spatial-macro',
    name: 'Basis Data Spasial Makro Wilayah (Open Spatial Data)',
    category: 'Spatial Data',
    source: 'BPS (Statistik Wilayah), Potensi Desa (Podes), APJII, & Ookla Open Data',
    role: 'Karakterisasi struktural lingkungan geografis dan infrastruktur wilayah',
    sensitivity: 'Low (Public/Aggregated)',
    temporalResolution: 'Tahunan / Semesteran (Macro Survey)',
    spatialResolution: 'Tingkat Kecamatan / Kabupaten / Desa',
    variables: [
      'Status Desa 3T / Non-3T (BPS/Kemendesa)',
      'Indeks Sinyal Komunikasi Desa (Podes)',
      'Penetrasi Internet Daerah (APJII)',
      'Rata-rata Kecepatan Seluler & Fixed Broadband (Ookla)'
    ],
    equationMapping: 'Persamaan (2a): K_i = cluster(BPS, Podes, APJII, Ookla)',
    output: 'Klaster Spasial Struktural Makro (K_i)',
    destination: '/analisis (Lapis 1 Indeks Spasial S_{i,t})',
    status: 'Field Ready',
    description: 'Data terbuka kewilayahan untuk menentukan profil struktural K_i yang digabungkan dengan kualitas jaringan sesi N_{i,t} membentuk indeks komposit S_{i,t}.',
    scientificNotes: 'Spasial (S_{i,t}) bertindak sebagai moderator kontekstual dalam c_{i,t}, bukan pengganti model CCBN.'
  },
  {
    id: 'ds-visual-observability',
    name: 'Sinyal Observabilitas Visual Kamera (Supporting CV)',
    category: 'Visual Observability',
    source: 'Webcam Stream Client-side (MediaPipe / Pose & Gaze Estimation)',
    role: 'Sinyal pendukung observabilitas atensi saat kondisi bandwidth dan pencahayaan memungkinkan',
    sensitivity: 'High (Individual Telemetry - On-device Processing Only)',
    temporalResolution: 'Sampling 1 frame/detik (Low-frame-rate on-device)',
    spatialResolution: 'Lokal Perangkat Klien (No Video Transmitted to Server)',
    variables: [
      'face_detection_confidence',
      'gaze_on_screen_ratio',
      'head_pose_yaw_pitch_roll',
      'ambient_lighting_score',
      'visual_observability_quality (q_visual)'
    ],
    equationMapping: 'Persamaan (10 & 10a): w(S_{i,t}, q_visual) & F_{i,t} = w V_{i,t} + (1-w) b_{LMS}',
    output: 'Sinyal Observabilitas Visual (V_{i,t}) & Bobot Fusi (w_{i,t})',
    destination: '/analisis (Multimodal Observability Support)',
    status: 'Prototype / Available',
    description: 'Sinyal pendukung observabilitas berbasis visi komputer on-device. Sinyal visual BUKAN ground truth mutlak motivasi, melainkan pembobotan pelengkap saat kamera aktif.',
    scientificNotes: 'Sinyal visual hanya aktif jika q_visual memadai. Jika kamera mati/gelap, sistem fallback penuh ke telemetri LMS tanpa penalti.'
  },
  {
    id: 'ds-observability-missingness',
    name: 'Metrik Ketidaklengkapan Telemetri (Missingness Diagnostics)',
    category: 'Observability / Missingness',
    source: 'Observability Assessment Module / Diagnostic Checkpoints',
    role: 'Mengevaluasi rasio checkpoint tak teramati dan membedakan batas observabilitas (MNAR) dari kelalaian',
    sensitivity: 'Low (Public/Aggregated)',
    temporalResolution: 'Per-Sesi Pembelajaran (10 Checkpoints)',
    spatialResolution: 'Tingkat Sesi Individu',
    variables: [
      'expected_telemetry_checkpoints (n_exp)',
      'observed_telemetry_checkpoints (n_obs)',
      'missingness_rate (m_{i,t})',
      'telemetry_noise_level (noise_{i,t})',
      'evidence_quality_score (q_{i,t})',
      'missingness_mechanism (MCAR vs MNAR)'
    ],
    equationMapping: 'Persamaan (3 & 4): m_{i,t} = 1 - (n_obs / n_exp), q_{i,t} = 1 - m - λ·noise',
    output: 'Kualitas Evidensi (q_{i,t}) & Tingkat Missingness (m_{i,t})',
    destination: '/analisis (Baseline Validity Gate & CCBN Input)',
    status: 'Prototype / Available',
    description: 'Mengukur kualitas dan keandalan data telemetri. Data hilang akibat koneksi putus (MNAR) dicatat sebagai batas observabilitas sistem, bukan kelalaian peserta.',
    scientificNotes: 'Missingness m menandakan keterbatasan pandangan sistem. Kualitas q menentukan apakah baseline valid (Eq. 18a-c).'
  }
];

export interface SituatedOperationalState {
  code: string;
  name: string;
  role: string;
  triggers: string[];
  supportAction: string;
  operationalIndicator: string;
  disclaimer: string;
}

export const SITUATED_OPERATIONAL_STATES: SituatedOperationalState[] = [
  {
    code: 'S1',
    name: 'Low-Engagement Completion Risk',
    role: 'Kategori Dukungan Operasional 1',
    triggers: ['Kecepatan playback 2x', 'Fokus tab rendah', 'Mendekati deadline tugas', 'Skip ke bagian akhir video'],
    supportAction: 'Ringkasan Interaktif + 3 Spot-Tests Mandiri Berbeban Rendah',
    operationalIndicator: 'Indikator risiko salah tafsir operasional (bukan vonis motivasi intrinsik)',
    disclaimer: 'Label operasional untuk memicu intervensi ringkas; bukan penilaian kepribadian atau status kelulusan peserta.'
  },
  {
    code: 'S2',
    name: 'Fragmented Office-Hour Learning',
    role: 'Kategori Dukungan Operasional 2',
    triggers: ['Sesi di jam dinas kantor', 'Perpindahan tab frekuen ke sistem layanan', 'Interupsi tugas mendadak', 'Akses dalam potongan waktu pendek'],
    supportAction: 'State Preservation (Penyimpanan Titik Belajar) + Modul Mikro (3–5 Menit)',
    operationalIndicator: 'Interupsi layanan publik kedinasan',
    disclaimer: 'Merespons realitas ASN yang belajar di sela tugas pelayanan publik tanpa memberi hukuman pengulangan materi.'
  },
  {
    code: 'S3',
    name: 'Cognitive Struggling',
    role: 'Kategori Dukungan Operasional 3',
    triggers: ['Frekuensi rewind tinggi pada konsep tertentu', 'Pause berkepanjangan', 'Dwell time panjang pada paragraf sulit', 'Nilai uji pemahaman awal rendah'],
    supportAction: 'Scaffolding Adaptif: Infografis Ringkas + Analogi + Petunjuk Bertahap (Hints)',
    operationalIndicator: 'Kebutuhan scaffolding pedagogis tambahan',
    disclaimer: 'Membantu pembelajar memahami materi inti melalui representasi multimodal yang lebih mudah dicerna.'
  },
  {
    code: 'S4',
    name: 'Infrastructural Constraint (3T)',
    role: 'Kategori Dukungan Operasional 4',
    triggers: ['Throughput < 200 kbps', 'Packet loss tinggi (> 5%)', 'Buffering berulang / video stall', 'Profil jaringan mobile EDGE/3G'],
    supportAction: 'Mode Audio-First Podcast + Cache Luring (Offline PWA) + Sinkronisasi Telemetri Asinkron',
    operationalIndicator: 'Hambatan infrastruktur fisik & konektivitas',
    disclaimer: 'Kondisi hambatan akses; sistem segera mengganti modalitas ke format ultra-hemat kuota agar peserta tetap dapat belajar setara.'
  }
];

export const RESEARCH_LINEAGE_STAGES = [
  {
    stage: '1. JISEBI Manuscript Baseline',
    focus: 'Arsitektur Konseptual Awal (4-Layer CABA, 4 Situated States S1-S4, Paradigma Context-Aware)',
    role: 'Manuskrip pendukung & garis keturunan riset (Research Lineage Artifact)'
  },
  {
    stage: '2. CABA Framework Expansion',
    focus: 'Pengondisian Konteks 6-Dimensi (c_{i,t}), Observabilitas Telemetri & Diagnosis Missingness (MNAR)',
    role: 'Pengembangan Fondasi Konseptual Disertasi'
  },
  {
    stage: '3. Dissertation Proposal Revision 2',
    focus: 'Mekanisme CCBN Terkalibrasi (Eq. 5), Residual Diagnostik (Eq. 6), Disparitas (Eq. 7), Beban Kontekstual (Eq. 8, 8a, 8b), Multi-objective LinUCB (Eq. 9), Baseline Validity Gate (Eq. 18a-c)',
    role: 'Sumber Kebenaran Ilmiah Utama (Source of Truth)'
  },
  {
    stage: '4. CABA–CCBN Research Prototype',
    focus: 'Implementasi Komputasional (/analisis) didukung oleh Fondasi Data & Evidensi (/dataset-hub)',
    role: 'Artifak Prototipe Eksperimental Terintegrasi'
  }
];
