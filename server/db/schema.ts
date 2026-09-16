import { pgSchema, text, timestamp, jsonb, integer, serial, boolean, varchar } from 'drizzle-orm/pg-core';

// PostgreSQL Schema: kuesioner
export const kuesionerSchema = pgSchema('kuesioner');

// Table: kuesioner.responses (Wide Table for easy SQL/BI analysis)
export const responses = kuesionerSchema.table('responses', {
  id: text('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),

  // Auto-captured IP & Location Metadata
  ipAddress: text('ip_address'),
  locationCity: text('location_city'),
  locationRegion: text('location_region'),
  locationCountry: text('location_country'),
  latitude: text('latitude'),
  longitude: text('longitude'),

  // Section A: Demografi (Q1 - Q5)
  province: text('province'),
  regency: text('regency'),
  areaType: text('area_type'),
  institutionType: text('institution_type'),
  ageGroup: text('age_group'),
  workDuration: text('work_duration'),

  // Section B: Pengalaman E-learning (Q6 - Q8)
  hasElearning: text('has_elearning'),
  q7ElearningTypes: text('q7_elearning_types').array(),
  q8Platforms: text('q8_platforms').array(),

  // Section C: Perangkat & Konektivitas (Q9 - Q14)
  q9MainDevice: text('q9_main_device'),
  q10Locations: text('q10_locations').array(),
  q11InternetSources: text('q11_internet_sources').array(),
  q12DisruptionFrequency: integer('q12_disruption_frequency'),
  q13DisruptionTypes: text('q13_disruption_types').array(),
  q14DisruptionNarrative: text('q14_disruption_narrative'),

  // Section D: Lingkungan Pekerjaan & Beban Kerja (Q15 - Q19)
  q15WorkloadOverlap: integer('q15_workload_overlap'),
  q16InterruptedByWork: integer('q16_interrupted_by_work'),
  q17SufficientTime: integer('q17_sufficient_time'),
  q18SupervisorSupport: integer('q18_supervisor_support'),
  q19LocationMobility: integer('q19_location_mobility'),

  // Section E: Pengalaman Terhadap Materi (Q20 - Q24)
  q20EasyAccess: integer('q20_easy_access'),
  q21FileSizeIssue: integer('q21_file_size_issue'),
  q22Relevance: integer('q22_relevance'),
  q23PreferredFormats: text('q23_preferred_formats').array(),
  q24FormatSuitability: integer('q24_format_suitability'),

  // Section F: Interaksi & Keaktifan (Q25 - Q28)
  q25QnaOpportunity: integer('q25_qna_opportunity'),
  q26PeerInteraction: integer('q26_peer_interaction'),
  q27FocusLevel: integer('q27_focus_level'),
  q28InactivityReasons: text('q28_inactivity_reasons').array(),

  // Section G & H: Refleksi & Narasi Kualitatif (Q29 - Q32)
  q29BiggestProblemNarrative: text('q29_biggest_problem_narrative'),
  q30ChangeNarrative: text('q30_change_narrative'),
  q31SpatialContextNarrative: text('q31_spatial_context_narrative'),
  q32OrganizerNarrative: text('q32_organizer_narrative'),

  // Section I: Sesi Synchronous Zoom/Meet (Q33 Matrix 1-5)
  q33SyncCameraOn: integer('q33_sync_camera_on'),
  q33SyncCameraOff: integer('q33_sync_camera_off'),
  q33SyncMobile: integer('q33_sync_mobile'),
  q33SyncMultitask: integer('q33_sync_multitask'),
  q33SyncLocationChange: integer('q33_sync_location_change'),
  q33SyncDisconnect: integer('q33_sync_disconnect'),

  // Backup Full JSON Document
  answers: jsonb('answers').notNull()
});

// Table: kuesioner.research_gaps_simple
export const researchGapsSimple = kuesionerSchema.table('research_gaps_simple', {
  id: serial('id').primaryKey(),
  topic: varchar('topic', { length: 255 }),
  sourcePaperTitle: text('source_paper_title'),
  sourcePaperUrl: text('source_paper_url'),
  gapType: varchar('gap_type', { length: 255 }),
  problemStatement: text('problem_statement'),
  currentState: text('current_state'),
  futureOpportunity: text('future_opportunity'),
  priority: varchar('priority', { length: 50 }),
  isSolved: boolean('is_solved').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// Alias for backward compatibility
export const researchGapSimple = researchGapsSimple;

// Table: kuesioner.ipp_evaluations (Indeks Pelayanan Publik 2025)
export const ippEvaluations = kuesionerSchema.table('ipp_evaluations', {
  id: serial('id').primaryKey(),
  nama: text('nama').notNull(),
  ippPredikat: varchar('ipp_predikat', { length: 50 }),
  tahun: integer('tahun').default(2025),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// Table: kuesioner.spbe_evaluations (Indeks SPBE 2025)
export const spbeEvaluations = kuesionerSchema.table('spbe_evaluations', {
  id: serial('id').primaryKey(),
  nama: text('nama').notNull(),
  spbePredikat: varchar('spbe_predikat', { length: 50 }),
  tahun: integer('tahun').default(2025),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// Table: kuesioner.expert_validations (Uji Validitas Pakar Widyaiswara / Expert Judgment)
export const expertValidations = kuesionerSchema.table('expert_validations', {
  id: text('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),

  // Identitas Pakar Widyaiswara
  evaluatorName: text('evaluator_name'),
  institution: text('institution').notNull(), // e.g., Puslatbang LAN RI, BPSDM Prov. Sulsel
  functionalPosition: text('functional_position').notNull(), // Widyaiswara Ahli Utama/Madya/Muda/Pertama/PTP/Lainnya
  experienceYears: text('experience_years'), // <3 thn, 3-7 thn, >7 thn
  regionCoverage: text('region_coverage'), // Wilayah Barat, Tengah, Timur/3T

  // Skor Penilaian (Skala 1 - 5)
  // Dimensi 1: Relevansi Masalah Lapangan (A1 - A2)
  scoreA1Problem3T: integer('score_a1_problem_3t').notNull(),
  scoreA2WorkInterruption: integer('score_a2_work_interruption').notNull(),

  // Dimensi 2: Keadilan Algoritmik & Etika Evaluasi (B1 - B2)
  scoreB1SpatialEquity: integer('score_b1_spatial_equity').notNull(),
  scoreB2NonPunitiveEthics: integer('score_b2_non_punitive_ethics').notNull(),

  // Dimensi 3: Kesesuaian Pedagogis & Andragogi (C1 - C3)
  scoreC1MicroChunking: integer('score_c1_micro_chunking').notNull(),
  scoreC2TextAudioFallback: integer('score_c2_text_audio_fallback').notNull(),
  scoreC3GracefulBookmark: integer('score_c3_graceful_bookmark').notNull(),

  // Dimensi 4: Kelayakan Implementasi Kebijakan (D1 - D2)
  scoreD1LmsAdoptionFeasibility: integer('score_d1_lms_adoption_feasibility').notNull(),
  scoreD2OverallQualityImpact: integer('score_d2_overall_quality_impact').notNull(),

  // Kualitatif & Rekomendasi
  pedagogicalAdvice: text('pedagogical_advice'),
  policyRecommendation: text('policy_recommendation'),
  expertConclusion: text('expert_conclusion').notNull(), // Layak Tanpa Revisi / Layak dengan Catatan Minor / Perlu Penyesuaian

  // Metadata tambahan
  ipAddress: text('ip_address')
});

// Table: kuesioner.expert_interviews (Transkrip & Notulensi Wawancara Kualitatif Pakar / Qualitative Triangulation)
export const expertInterviews = kuesionerSchema.table('expert_interviews', {
  id: text('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),

  // Metadata Wawancara
  interviewDate: text('interview_date').notNull(),
  intervieweeName: text('interviewee_name').notNull(),
  institution: text('institution').notNull(),
  functionalPosition: text('functional_position').notNull(),
  interviewDuration: text('interview_duration'), // e.g. "30 Menit", "45 Menit"
  interviewer: text('interviewer').default('Pujiatmo Subarkah'),
  audioRecordingLink: text('audio_recording_link'),

  // Catatan 4 Kluster Tematik Wawancara
  topic1RealityFindings: text('topic1_reality_findings'), // Hambatan Sinyal 3T & Tugas Kedinasan
  topic2FairnessFindings: text('topic2_fairness_findings'), // Pandangan Keadilan Evaluasi & Bebas Sanksi
  topic3AndragogyFindings: text('topic3_andragogy_findings'), // Kesesuaian Micro-learning, Teks/Audio, Bookmark
  topic4PolicyRecommendations: text('topic4_policy_recommendations'), // Strategi Implementasi LAN/BPSDM

  // Kutipan Kunci / Gold Quotes (Verbatim untuk Bab IV Disertasi)
  keyQuotesVerbatim: text('key_quotes_verbatim'),

  // Kesimpulan Sikap Narasumber
  overallVerdict: text('overall_verdict').notNull(), // e.g. "Mendukung Penuh Tanpa Syarat", "Mendukung dengan Catatan Regulasi", "Perlu Kajian Lanjutan"
  ipAddress: text('ip_address')
});


