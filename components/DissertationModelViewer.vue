<template>
  <div class="model-viewer-container">
    <!-- Banner Disertasi Header -->
    <div class="dissertation-banner">
      <div class="banner-top-badges">
        <span class="badge-tag academic">🎓 Kontribusi Komputasional Disertasi</span>
        <span class="badge-tag fusion">⚡ CCBN & Fair-LinUCB Adaptive Engine</span>
      </div>
      <h2 class="banner-title">
        Arsitektur Komputasional: Contextual Counterfactual Behavioral Normalization (CCBN) & Algoritma Fair-LinUCB
      </h2>
      <p class="banner-desc">
        Reposisi dari evaluasi deskriptif ke <strong>kontribusi algoritmik murni</strong>: Memodelkan mediasi cerdas antara kurikulum pembelajaran dan kendala kontekstual ASN melalui estimasi baseline ekspektasi \(\mathbb{E}[B \mid \text{Context}]\), sinyal residual kausal \(\Delta B\), dan optimisasi bandit adaptif berkeadilan.
      </p>
    </div>

    <!-- 3 Core Computational Pillars (Arahan Co-Promotor) -->
    <div class="card" style="margin-bottom: 1.5rem; padding: 1.25rem 1.5rem; background: #FFFFFF; border: 1px solid var(--color-stroke-secondary);">
      <div style="font-size: 0.85rem; font-weight: 800; color: #1E293B; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.85rem; display: flex; align-items: center; gap: 0.5rem;">
        <span>🎯 Tiga Pilar Komputasional Algoritma (Kerangka Utama Disertasi)</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
        <!-- Pilar 1 -->
        <div class="core-pillar-box border-blue">
          <div class="core-num">PILAR 1: SUMBER BUKTI (EVIDENCE)</div>
          <h4 class="core-title">Sinyal Telemetri Otentik & Retensi Parsial</h4>
          <p class="core-desc">
            Mengambil log klik, rasio fokus window (\(\tau_{focus}\)), akselerasi (\(\nu_{play}\)), skip-dynamics, dan <strong>TikTok-style Partial Retention (\(R_{partial}\))</strong>. Menolak asumsi video 100% linear; berfokus pada frame retensi kognitif esensial.
          </p>
          <div class="core-badge">Data: Clickstream, LMS Logs, Zoom Telemetry</div>
        </div>

        <!-- Pilar 2 -->
        <div class="core-pillar-box border-purple">
          <div class="core-num">PILAR 2: DEFINISI FAIRNESS & CCBN</div>
          <h4 class="core-title">Normalisasi Kausal: \(\mathbb{E}[B \mid C]\) & \(\Delta B\)</h4>
          <p class="core-desc">
            Fairness didefinisikan secara kontekstual: Perilaku \(B\) dinilai terhadap ekspektasi wajar lingkungan \(\mathbb{E}[B \mid \text{Learner, Service, Spatial}]\). Sinyal residual \(\Delta B = B - \mathbb{E}[B \mid C]\) memisahkan hambatan situasi dari disengagement otentik.
          </p>
          <div class="core-badge">Formula: \(\Delta B = B - \mathbb{E}[B \mid \text{Context}]\)</div>
        </div>

        <!-- Pilar 3 -->
        <div class="core-pillar-box border-green">
          <div class="core-num">PILAR 3: OPTIMISASI ADAPTIF</div>
          <h4 class="core-title">Fair-LinUCB & Dynamic Reward</h4>
          <p class="core-desc">
            <strong>Analogi YouTube Adaptive Bitrate:</strong> Sistem tidak memakai rule statis, melainkan bandit algorithm yang dinamis menurunkan "resolusi kognitif/modalitas" saat beban kerja/latensi melonjak, dan menaikkan kembali saat atensi pulih.
          </p>
          <div class="core-badge">Algoritma: Multi-Armed Bandit with Dynamic Reward</div>
        </div>
      </div>
    </div>

    <!-- Live Empirical Constraint Parameters -->
    <div class="live-index-section">
      <div class="index-section-header">
        <div>
          <h4 class="section-title">📊 Parameter Operasional Kendala Akses (Ground Truth Lapangan)</h4>
          <p class="section-sub">Ruang parameter kalibrasi yang dihitung dari {{ responses.length }} respon ASN nyata untuk memvalidasi vektor kendala sistem.</p>
        </div>
        <div class="sample-badge">
          Sampel Kalibrasi: <strong>{{ responses.length }} ASN</strong>
        </div>
      </div>

      <div class="index-cards-grid">
        <!-- 1. Spatial Infrastructure & Bandwidth Constraint -->
        <div class="index-card border-purple">
          <div class="index-card-header">
            <span class="pillar-num">Variabel Formal</span>
            <span class="index-abbr">E_infra(t)</span>
          </div>
          <div class="index-val-row">
            <span class="index-val text-purple">{{ spatialConstraintIndex.toFixed(1) }}</span>
            <span class="index-scale">/ 100</span>
          </div>
          <div class="index-name">Infrastructural & Bandwidth Stress (\(\beta_{bw}, \beta_{lat}\))</div>
          <div class="index-progress-bg">
            <div class="index-progress-fill bg-purple" :style="{ width: `${spatialConstraintIndex}%` }"></div>
          </div>
          <p class="index-interpret">
            Operasionalisasi: Throughput (\(\beta_{bw}\)), latensi packet-loss (\(\beta_{lat}\)), kuota seluler (\(T_{quota}\)), dan disparitas wilayah 3T/Pulau.
          </p>
        </div>

        <!-- 2. Workload & Service Dynamics -->
        <div class="index-card border-red">
          <div class="index-card-header">
            <span class="pillar-num">Variabel Formal</span>
            <span class="index-abbr">T_work(t)</span>
          </div>
          <div class="index-val-row">
            <span class="index-val text-red">{{ serviceDynamicsIndex.toFixed(1) }}</span>
            <span class="index-scale">/ 100</span>
          </div>
          <div class="index-name">Workload & Task Interruption Index (\(T_{work}\))</div>
          <div class="index-progress-bg">
            <div class="index-progress-fill bg-red" :style="{ width: `${serviceDynamicsIndex}%` }"></div>
          </div>
          <p class="index-interpret">
            Operasionalisasi: Disrupsi tugas dinas mendadak (Q16), tumpang tindih waktu kerja aktif (\(t_{hour}\)), dan mobilitas tugas lapangan.
          </p>
        </div>

        <!-- 3. Behavioral Telemetry Signals -->
        <div class="index-card border-green">
          <div class="index-card-header">
            <span class="pillar-num">Variabel Formal</span>
            <span class="index-abbr">B_tele(t)</span>
          </div>
          <div class="index-val-row">
            <span class="index-val text-green">{{ behavioralFrictionIndex.toFixed(1) }}</span>
            <span class="index-scale">/ 100</span>
          </div>
          <div class="index-name">Multitasking & Telemetry Friction (\(B_{tele}\))</div>
          <div class="index-progress-bg">
            <div class="index-progress-fill bg-green" :style="{ width: `${behavioralFrictionIndex}%` }"></div>
          </div>
          <p class="index-interpret">
            Operasionalisasi: Rasio fokus tab (\(\tau_{focus}\)), video backgrounding, akselerasi (\(\nu_{play}\)), dan off-camera webinar (Q33).
          </p>
        </div>

        <!-- 4. Device Restriction Weight -->
        <div class="index-card border-amber">
          <div class="index-card-header">
            <span class="pillar-num">Variabel Formal</span>
            <span class="index-abbr">δ_dev</span>
          </div>
          <div class="index-val-row">
            <span class="index-val text-amber">{{ multimodalDemandIndex.toFixed(1) }}</span>
            <span class="index-scale">/ 100</span>
          </div>
          <div class="index-name">Device Form-Factor Penalty (\(\delta_{dev}\))</div>
          <div class="index-progress-bg">
            <div class="index-progress-fill bg-amber" :style="{ width: `${multimodalDemandIndex}%` }"></div>
          </div>
          <p class="index-interpret">
            Operasionalisasi: Restriksi layar ponsel vs desktop, kebutuhan modalitas hemat kuota (audio-first, teks ringkas, infografis micro-chunk).
          </p>
        </div>

        <!-- 5. Algorithmic Trade-off Urgency -->
        <div class="index-card border-blue">
          <div class="index-card-header">
            <span class="pillar-num">Target Optimisasi</span>
            <span class="index-abbr">A* (Fair-LinUCB)</span>
          </div>
          <div class="index-val-row">
            <span class="index-val text-blue">{{ personalizationUrgencyIndex.toFixed(1) }}</span>
            <span class="index-scale">/ 100</span>
          </div>
          <div class="index-name">Adaptive Mediation Urgency Index</div>
          <div class="index-progress-bg">
            <div class="index-progress-fill bg-blue" :style="{ width: `${personalizationUrgencyIndex}%` }"></div>
          </div>
          <p class="index-interpret">
            Kebutuhan intervensi adaptif non-punitif: konversi modul panjang ke micro-case 3 menit tanpa sanksi otomatis saat ASN terganggu tugas kedinasan.
          </p>
        </div>
      </div>
    </div>

    <!-- Interactive Computational Architecture Pipeline -->
    <div class="model-architecture-card">
      <div class="arch-header">
        <h4 class="section-title">🏛️ Pipeline Komputasional: Dari Sinyal Bukti ke Fair-LinUCB</h4>
        <p class="section-sub">Klik blok tahapan di bawah untuk mengeksplorasi formulasi matematis, variabel laten, dan rincian implementasi komputasi.</p>
      </div>

      <div class="pillars-flow-grid">
        <!-- Stage 1: Context Sensing -->
        <div 
          :class="['pillar-flow-box border-green', activePillarDetail === 'sensing' ? 'selected' : '']"
          @click="activePillarDetail = 'sensing'"
        >
          <div class="flow-step-tag">STAGE 1: INPUT TELEMETRI</div>
          <h5 class="flow-title">1. Context Sensing & Behavioral Traces</h5>
          <div class="formula-badge">C(t) = ⟨ T_work, E_infra, O_gov, B_tele ⟩</div>
          <ul class="flow-features">
            <li>Throughput \(\beta_{bw}\) & Latensi \(\beta_{lat}\)</li>
            <li>Tab Focus \(\tau_{focus}\) & Scrubbing \(N_{scrub}\)</li>
            <li>TikTok Partial Retention \(R_{partial}\)</li>
          </ul>
        </div>

        <!-- Arrow connector -->
        <div class="flow-operator">➔</div>

        <!-- Stage 2: Contextual Counterfactual Normalization -->
        <div 
          :class="['pillar-flow-box border-purple', activePillarDetail === 'ccbn' ? 'selected' : '']"
          @click="activePillarDetail = 'ccbn'"
        >
          <div class="flow-step-tag">STAGE 2: CCBN NORMALISASI</div>
          <h5 class="flow-title">2. Counterfactual Expectation & Residual</h5>
          <div class="formula-badge">ΔB = B - E[ B | Learner, Service, Spatial ]</div>
          <ul class="flow-features">
            <li>Baseline Ekspektasi Kontekstual</li>
            <li>Eliminasi Hukuman Palsu (*Unfair Penalties*)</li>
            <li>Isolasi Sinyal Disengagement Otentik</li>
          </ul>
        </div>

        <!-- Arrow connector -->
        <div class="flow-operator">➔</div>

        <!-- Stage 3: Fair-LinUCB Bandit Optimizer -->
        <div 
          :class="['pillar-flow-box border-amber center-fusion', activePillarDetail === 'bandit' ? 'selected' : '']"
          @click="activePillarDetail = 'bandit'"
        >
          <div class="flow-step-tag">STAGE 3: BANDIT OPTIMIZER</div>
          <h5 class="flow-title">3. Fair-LinUCB Decision Engine</h5>
          <div class="formula-badge">A* = arg max_{a} [ θ̂_a^T x_t + α √(x_t^T A_a^{-1} x_t) ]</div>
          <ul class="flow-features">
            <li>Dynamic Mid-Stream Reward \(r_t(a)\)</li>
            <li>Penyeimbang Trade-off Pareto</li>
            <li>Analogi Adaptive Bitrate YouTube</li>
          </ul>
        </div>

        <!-- Arrow connector -->
        <div class="flow-operator">➔</div>

        <!-- Stage 4: Supportive Situated Intervention -->
        <div 
          :class="['pillar-flow-box border-blue', activePillarDetail === 'intervention' ? 'selected' : '']"
          @click="activePillarDetail = 'intervention'"
        >
          <div class="flow-step-tag">STAGE 4: INTERVENSI SITUASIONAL</div>
          <h5 class="flow-title">4. Situated Adaptation Delivery</h5>
          <div class="formula-badge">Action a ∈ { MicroChunk, ModalityFallback, StopGate }</div>
          <ul class="flow-features">
            <li>Dynamic Micro-Chunking (3 menit)</li>
            <li>Low-Bandwidth Text/Audio Fallback</li>
            <li>Non-Punitive Bookmark Recovery</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Active Detail Deep-Dive Card -->
    <div class="pillar-deep-dive card">
      <div class="deep-dive-header" :style="{ borderLeftColor: currentDetailObj.color }">
        <span class="detail-tag" :style="{ background: currentDetailObj.color + '20', color: currentDetailObj.color }">
          {{ currentDetailObj.tag }}
        </span>
        <h3 class="detail-title">{{ currentDetailObj.title }}</h3>
        <p class="detail-lead">{{ currentDetailObj.lead }}</p>
      </div>

      <div class="deep-dive-grid">
        <div class="deep-card">
          <h5 class="deep-card-title">📐 Formulasi Matematis & Komputasional</h5>
          <p class="deep-card-text">{{ currentDetailObj.roleAi }}</p>
          <div class="code-box">
            <code>{{ currentDetailObj.formula }}</code>
          </div>
        </div>

        <div class="deep-card">
          <h5 class="deep-card-title">📋 Variabel Operasional & Sumber Bukti</h5>
          <ul class="deep-indicator-list">
            <li v-for="(ind, iIdx) in currentDetailObj.indicators" :key="iIdx">
              <strong>{{ ind.code }}:</strong> {{ ind.desc }}
            </li>
          </ul>
        </div>

        <div class="deep-card">
          <h5 class="deep-card-title">📖 Rasional Algoritmik Tingkat Doktoral</h5>
          <p class="deep-card-text">{{ currentDetailObj.dissertationGuide }}</p>
        </div>
      </div>
    </div>

    <!-- Variable Mapping Table -->
    <div class="mapping-table-card card">
      <div class="table-header-row">
        <div>
          <h4 class="section-title">📑 Matriks Operasionalisasi Variabel Komputasional & Sumber Bukti</h4>
          <p class="section-sub">Definisi formal variabel hambatan akses, sumber telemetri, dan perannya dalam formulasi optimisasi Fair-LinUCB.</p>
        </div>
      </div>

      <div class="table-responsive">
        <table class="academic-table">
          <thead>
            <tr>
              <th>Komponen Komputasi</th>
              <th>Simbol Variabel Formal</th>
              <th>Operasionalisasi Lapangan / Sinyal</th>
              <th>Tipe & Domain Nilai</th>
              <th>Peran dalam Algoritma Adaptif</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in mappingRows" :key="row.pillar">
              <td class="fw-bold">{{ row.pillar }}</td>
              <td><code class="symbol-badge">{{ row.symbol }}</code></td>
              <td><span class="q-chips">{{ row.questions }}</span></td>
              <td>{{ row.scale }}</td>
              <td class="role-desc">{{ row.role }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { SurveyResponse } from '~/composables/useSurvey';

const props = defineProps<{
  responses: SurveyResponse[];
}>();

const activePillarDetail = ref<'sensing' | 'ccbn' | 'bandit' | 'intervention'>('ccbn');

// 1. Spatial Constraint Index (0 - 100)
const spatialConstraintIndex = computed(() => {
  if (props.responses.length === 0) return 0;
  let totalScore = 0;
  props.responses.forEach(r => {
    let score = 0;
    const area = r.answers['q_2'];
    if (area === 'Wilayah kepulauan') score += 35;
    else if (area === 'Wilayah terpencil') score += 40;
    else if (area === 'Wilayah perbatasan') score += 30;
    else if (area === 'Perdesaan') score += 20;
    else score += 10;

    const q12 = Number(r.answers['q_12']) || 2;
    score += (q12 / 5) * 40;

    const q19 = Number(r.answers['q_19']) || 2;
    score += (q19 / 5) * 20;

    totalScore += score;
  });
  return Math.min(Math.max(totalScore / props.responses.length, 0), 100);
});

// 2. Service Dynamics & Workload Index (0 - 100)
const serviceDynamicsIndex = computed(() => {
  if (props.responses.length === 0) return 0;
  let totalScore = 0;
  props.responses.forEach(r => {
    const q15 = Number(r.answers['q_15']) || 3;
    const q16 = Number(r.answers['q_16']) || 3;
    const q17Inv = 6 - (Number(r.answers['q_17']) || 3);
    const q18Inv = 6 - (Number(r.answers['q_18']) || 3);

    const avgFriction = (q15 + q16 + q17Inv + q18Inv) / 4;
    totalScore += (avgFriction / 5) * 100;
  });
  return Math.min(Math.max(totalScore / props.responses.length, 0), 100);
});

// 3. Behavioral Friction Index (0 - 100)
const behavioralFrictionIndex = computed(() => {
  if (props.responses.length === 0) return 0;
  let totalScore = 0;
  props.responses.forEach(r => {
    let score = 0;
    if (r.answers['q_9'] === 'Smartphone') score += 25;
    else if (r.answers['q_9'] === 'Tablet') score += 15;
    else score += 5;

    const q28 = r.answers['q_28'];
    if (Array.isArray(q28)) score += Math.min(q28.length * 5, 20);

    if (r.answers['q_33']) {
      const offCam = Number(r.answers['q_33']['Mematikan kamera']) || 2;
      const multitask = Number(r.answers['q_33']['Mengikuti sambil melakukan pekerjaan lain']) || 2;
      score += ((offCam + multitask) / 10) * 55;
    } else {
      score += 25;
    }

    totalScore += score;
  });
  return Math.min(Math.max(totalScore / props.responses.length, 0), 100);
});

// 4. Multimodal Demand Index (0 - 100)
const multimodalDemandIndex = computed(() => {
  if (props.responses.length === 0) return 0;
  let totalScore = 0;
  props.responses.forEach(r => {
    const q21 = Number(r.answers['q_21']) || 3;
    const q24Inv = 6 - (Number(r.answers['q_24']) || 3);
    const formats = r.answers['q_23'];
    let formatWeight = 20;
    if (Array.isArray(formats)) {
      if (formats.includes('Modul ringkas / infografis') || formats.includes('Podcast / audio')) {
        formatWeight += 15;
      }
    }
    const score = ((q21 + q24Inv) / 10) * 65 + formatWeight;
    totalScore += score;
  });
  return Math.min(Math.max(totalScore / props.responses.length, 0), 100);
});

// 5. Personalization Urgency Index (0 - 100)
const personalizationUrgencyIndex = computed(() => {
  if (props.responses.length === 0) return 0;
  let totalScore = 0;
  props.responses.forEach(r => {
    const q22Inv = 6 - (Number(r.answers['q_22']) || 3);
    const q25Inv = 6 - (Number(r.answers['q_25']) || 3);
    const q26Inv = 6 - (Number(r.answers['q_26']) || 3);
    const hasAspiration = (r.answers['q_30'] && r.answers['q_30'].length > 10) ? 20 : 5;

    const score = ((q22Inv + q25Inv + q26Inv) / 15) * 80 + hasAspiration;
    totalScore += score;
  });
  return Math.min(Math.max(totalScore / props.responses.length, 0), 100);
});

// Detailed Stage Descriptions
const pillarDetails: Record<string, any> = {
  sensing: {
    tag: 'STAGE 1: SUMBER BUKTI',
    title: 'Context Sensing & Sinyal Telemetri Otentik (C(t))',
    color: '#10B981',
    lead: 'Menangkap sinyal telemetri non-invasif dari clickstream, LMS logs, dan metrik retensi parsial tanpa sensor biometrik/kamera pengawas.',
    roleAi: 'Mengekstrak vektor fitur x_t = [T_work, E_infra, O_gov, B_tele] sebagai input pembelajar bagi bandit algorithm.',
    formula: 'x_t = Concat( t_hour, Δt_session, β_bw, β_lat, T_quota, δ_dev, R_tier, τ_focus, ν_play, R_partial )',
    indicators: [
      { code: 'β_bw & β_lat', desc: 'Throughput jaringan (kbps), latensi (ms), dan video stall-ratio' },
      { code: 'δ_dev & T_quota', desc: 'Restriksi perangkat smartphone vs desktop dan jenis paket kuota seluler' },
      { code: 'R_partial', desc: 'TikTok-style partial retention: Persentase frame kunci yang diserap tanpa tuntutan 100% video linear' }
    ],
    dissertationGuide: 'Menjawab pertanyaan co-promotor 1: Sumber bukti otentik yang dapat diimplementasikan langsung pada LMS pemerintah.'
  },
  ccbn: {
    tag: 'STAGE 2: DEFINISI FAIRNESS',
    title: 'Contextual Counterfactual Normalization (CCBN)',
    color: '#8B5CF6',
    lead: 'Mengeliminasi bias evaluasi dengan menghitung ekspektasi wajar perilaku belajar berdasarkan situasi lingkungan aktual.',
    roleAi: 'Menghitung ekspektasi E[B | Context] dan mengekstrak residual causal ΔB untuk mendeteksi disengagement murni.',
    formula: 'ΔB = B_obs - E[ B | Learner_tier, Workload_hours, Spatial_constraints ]',
    indicators: [
      { code: 'E[B | C]', desc: 'Baseline ekspektasi perilaku yang dipelajari secara statistical counterfactual dari cluster sejenis' },
      { code: 'ΔB ≈ 0', desc: 'Perilaku pasif/skip merupakan konsekuensi wajar dari beban kerja atau sinyal drop (Fairness Safe)' },
      { code: 'ΔB ≪ 0', desc: 'Penyimpangan signifikan dari ekspektasi wajar (terindikasi authentic ghost learning)' }
    ],
    dissertationGuide: 'Menjawab pertanyaan co-promotor 2: Definisi fairness kontekstual lokal yang melindungi ASN di daerah terbatas tanpa mengorbankan standar capaian.'
  },
  bandit: {
    tag: 'STAGE 3: ALGORITMA OPTIMISASI',
    title: 'Fair-LinUCB Adaptive Multi-Armed Bandit',
    color: '#F59E0B',
    lead: 'Mekanisme adaptasi dinamis (analogi YouTube Adaptive Bitrate) yang menyeimbangkan trade-off capaian vs disrupsi tugas.',
    roleAi: 'Memilih aksi intervensi terbaik a* secara online dengan mengeksplorasi dan mengeksploitasi ruang kebijakan adaptif.',
    formula: 'r_t(a) = CompGain(a) - λ_1 WorkCost(a|T_work) - λ_2 InfraCost(a|E_infra) + γ FairPenalty(ΔB)',
    indicators: [
      { code: 'θ̂_a', desc: 'Vektor parameter trade-off yang dipelajari online per modalitas aksi' },
      { code: 'Dynamic Reward', desc: 'Sinyal reward adaptif yang berubah di tengah jalan sesuai kondisi beban kerja/sinyal' },
      { code: 'Pareto Optimization', desc: 'Menjamin kurva efisiensi Pareto antara retensi kompetensi dan non-disruption waktu kerja' }
    ],
    dissertationGuide: 'Menjawab pertanyaan co-promotor 3: Kontribusi komputasional utama level doktoral yang mengungguli static rule-based matching.'
  },
  intervention: {
    tag: 'STAGE 4: INTERVENSI SITUASIONAL',
    title: 'Situated Non-Punitive Interventions Delivery',
    color: '#3B82F6',
    lead: 'Menyajikan intervensi pedagogis adaptif yang bersifat memfasilitasi (enablement) dan bebas dari sanksi pemaksaan.',
    roleAi: 'Mengonversi format materi secara runtime sesuai aksi a* yang direkomendasikan bandit engine.',
    formula: 'A* ∈ { a_micro (Micro-Chunking 3m), a_text (Text-First Fallback), a_stopgate (Active Checkpoint) }',
    indicators: [
      { code: 'a_micro', desc: 'Pemotongan modul panjang menjadi unit ringkas 3 menit saat jam sibuk kedinasan' },
      { code: 'a_text / a_audio', desc: 'Fallback otomatis ke format teks/audio kompresi rendah saat throughput drop' },
      { code: 'Graceful Bookmark', desc: 'Penyimpanan titik jeda otomatis tanpa penalti saat ASN terpaksa berpindah tab' }
    ],
    dissertationGuide: 'Membuktikan bahwa interface berfungsi sebagai mediation demonstration testbed antara kurikulum dan ASN.'
  }
};

const currentDetailObj = computed(() => {
  return pillarDetails[activePillarDetail.value] || pillarDetails.ccbn;
});

const mappingRows = [
  {
    pillar: 'Infrastruktur & Jaringan',
    symbol: 'β_bw, β_lat',
    questions: 'Q11, Q12, Q13 (Throughput, Latensi, Buffering)',
    scale: 'Kontinu (kbps, ms)',
    role: 'Kendala E_infra(t) untuk memicu adaptive modality fallback'
  },
  {
    pillar: 'Bobot Restriksi Perangkat',
    symbol: 'δ_dev',
    questions: 'Q9 (Smartphone, Tablet, Desktop)',
    scale: 'Diskret {0.2, 0.5, 1.0}',
    role: 'Faktor penalti kognitif layar kecil pada fungsi reward bandit'
  },
  {
    pillar: 'Beban Tugas Kedinasan',
    symbol: 'T_work(t)',
    questions: 'Q15, Q16, Q17 (Overlap tugas, SPPD, Jam kantor)',
    scale: 'Skala 1–5 & Waktu (t_hour)',
    role: 'Kendala beban kerja untuk menentukan threshold micro-chunking'
  },
  {
    pillar: 'Telemetri & Retensi Parsial',
    symbol: 'B_tele, R_partial',
    questions: 'Q27, Q28, Q33 (Focus ratio, Off-Cam, Skip)',
    scale: 'Rasio [0.0 – 1.0]',
    role: 'Sinyal perilaku otentik yang dinormalisasi via CCBN'
  },
  {
    pillar: 'Sinyal Residual Kausal',
    symbol: 'ΔB',
    questions: 'B_tele - E[B | Learner, Service, Spatial]',
    scale: 'Residual [-1.0 s.d. +1.0]',
    role: 'Metrik inti Contextual Fairness penentu sanksi vs bantuan'
  },
  {
    pillar: 'Aksi Mediasi Adaptif',
    symbol: 'A* (Fair-LinUCB)',
    questions: 'Q23, Q30, Q32 (Preferensi Micro-learning & Format)',
    scale: 'Action Space A = {a_1 ... a_K}',
    role: 'Keputusan optimisasi intervensi runtime sistem'
  }
];
</script>

<style scoped>
.model-viewer-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dissertation-banner {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  color: #FFFFFF;
  padding: 2rem 2.25rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.banner-top-badges {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.badge-tag {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  letter-spacing: 0.02em;
}

.badge-tag.academic {
  background: rgba(59, 130, 246, 0.2);
  color: #93C5FD;
  border: 1px solid rgba(147, 197, 253, 0.3);
}

.badge-tag.fusion {
  background: rgba(168, 85, 247, 0.2);
  color: #D8B4FE;
  border: 1px solid rgba(216, 180, 254, 0.3);
}

.banner-title {
  font-size: 1.45rem;
  font-weight: 800;
  line-height: 1.35;
  margin-bottom: 0.65rem;
  color: #F8FAFC;
}

.banner-desc {
  font-size: 0.9rem;
  color: #94A3B8;
  line-height: 1.55;
  max-width: 950px;
  margin: 0;
}

.core-pillar-box {
  padding: 1.15rem;
  border-radius: var(--radius-md);
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.core-pillar-box.border-blue { border-top: 4px solid #2563EB; }
.core-pillar-box.border-purple { border-top: 4px solid #8B5CF6; }
.core-pillar-box.border-green { border-top: 4px solid #10B981; }

.core-num {
  font-size: 0.7rem;
  font-weight: 800;
  color: #64748B;
  letter-spacing: 0.05em;
  margin-bottom: 0.35rem;
}

.core-title {
  font-size: 1rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
}

.core-desc {
  font-size: 0.825rem;
  color: #475569;
  line-height: 1.5;
  margin-bottom: 0.85rem;
}

.core-badge {
  font-size: 0.75rem;
  font-weight: 600;
  color: #1E293B;
  background: #E2E8F0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  width: fit-content;
}

.live-index-section {
  background: #FFFFFF;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-stroke-secondary);
  box-shadow: var(--shadow-sm);
}

.index-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.section-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.section-sub {
  font-size: 0.825rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.sample-badge {
  font-size: 0.825rem;
  background: #EFF6FF;
  color: #1D4ED8;
  border: 1px solid #BFDBFE;
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-md);
}

.index-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1rem;
}

.index-card {
  padding: 1rem;
  border-radius: var(--radius-md);
  background: var(--color-surface-secondary);
  border: 1px solid var(--color-stroke-secondary);
  display: flex;
  flex-direction: column;
}

.border-purple { border-top: 3px solid #8B5CF6; }
.border-red { border-top: 3px solid #EF4444; }
.border-green { border-top: 3px solid #10B981; }
.border-amber { border-top: 3px solid #F59E0B; }
.border-blue { border-top: 3px solid #3B82F6; }

.index-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.pillar-num {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
}

.index-abbr {
  font-size: 0.75rem;
  font-weight: 800;
  font-family: monospace;
  background: #FFFFFF;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  border: 1px solid var(--color-stroke-secondary);
}

.index-val-row {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  margin-bottom: 0.25rem;
}

.index-val {
  font-size: 1.65rem;
  font-weight: 800;
  line-height: 1;
}

.text-purple { color: #8B5CF6; }
.text-red { color: #EF4444; }
.text-green { color: #10B981; }
.text-amber { color: #D97706; }
.text-blue { color: #2563EB; }

.index-scale {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
}

.index-name {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.65rem;
  min-height: 2.2rem;
}

.index-progress-bg {
  height: 5px;
  background: #E2E8F0;
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 0.65rem;
}

.index-progress-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.5s ease;
}

.bg-purple { background: #8B5CF6; }
.bg-red { background: #EF4444; }
.bg-green { background: #10B981; }
.bg-amber { background: #F59E0B; }
.bg-blue { background: #3B82F6; }

.index-interpret {
  font-size: 0.725rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
  margin: 0;
}

.model-architecture-card {
  background: #FFFFFF;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-stroke-secondary);
  box-shadow: var(--shadow-sm);
}

.arch-header {
  margin-bottom: 1.25rem;
}

.pillars-flow-grid {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.75rem;
}

.pillar-flow-box {
  flex: 1;
  min-width: 220px;
  padding: 1rem;
  border-radius: var(--radius-md);
  background: #FFFFFF;
  border: 1px solid var(--color-stroke-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.pillar-flow-box:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.pillar-flow-box.selected {
  border-color: #2563EB;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  background: #F8FAFC;
}

.flow-step-tag {
  font-size: 0.65rem;
  font-weight: 800;
  color: #64748B;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.flow-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
}

.formula-badge {
  font-family: monospace;
  font-size: 0.7rem;
  background: #0F172A;
  color: #38BDF8;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.65rem;
  overflow-x: auto;
  white-space: nowrap;
}

.flow-features {
  padding-left: 1rem;
  margin: 0;
  font-size: 0.75rem;
  color: #475569;
  line-height: 1.45;
}

.flow-operator {
  font-size: 1.2rem;
  font-weight: 800;
  color: #94A3B8;
  padding: 0 0.25rem;
}

.pillar-deep-dive {
  padding: 1.5rem;
  background: #FFFFFF;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-stroke-secondary);
}

.deep-dive-header {
  border-left: 4px solid #2563EB;
  padding-left: 1rem;
  margin-bottom: 1.25rem;
}

.detail-tag {
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  letter-spacing: 0.05em;
}

.detail-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0.35rem 0 0.25rem 0;
}

.detail-lead {
  font-size: 0.85rem;
  color: #475569;
  margin: 0;
}

.deep-dive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.deep-card {
  padding: 1rem;
  background: var(--color-surface-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-stroke-secondary);
}

.deep-card-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
}

.deep-card-text {
  font-size: 0.8rem;
  color: #475569;
  line-height: 1.5;
  margin-bottom: 0.65rem;
}

.code-box {
  background: #0F172A;
  padding: 0.65rem;
  border-radius: 4px;
  overflow-x: auto;
}

.code-box code {
  color: #38BDF8;
  font-size: 0.75rem;
  font-family: monospace;
}

.deep-indicator-list {
  padding-left: 1.1rem;
  margin: 0;
  font-size: 0.775rem;
  color: #334155;
  line-height: 1.5;
}

.mapping-table-card {
  background: #FFFFFF;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-stroke-secondary);
}

.table-responsive {
  overflow-x: auto;
  margin-top: 1rem;
}

.academic-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.825rem;
}

.academic-table th {
  background: #F1F5F9;
  color: #1E293B;
  font-weight: 700;
  text-align: left;
  padding: 0.75rem 1rem;
  border-bottom: 2px solid #CBD5E1;
}

.academic-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #E2E8F0;
  color: #334155;
  vertical-align: top;
}

.symbol-badge {
  background: #EEF2FF;
  color: #3730A3;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
  font-weight: 700;
}

.q-chips {
  color: #0369A1;
  font-weight: 600;
}

.role-desc {
  font-size: 0.775rem;
  color: #475569;
  line-height: 1.45;
}
</style>
