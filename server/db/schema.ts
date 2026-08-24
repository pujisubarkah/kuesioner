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



