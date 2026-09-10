<template>
  <div class="app-container">
    <!-- Top Header Navigation -->
    <Navbar />

    <main id="konten-utama" class="main-content">
      <!-- Top Title & Stats Banner -->
      <div class="card header-banner" style="margin-bottom: 1.5rem; padding: 1.75rem 2rem; background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color: #FFFFFF; border: none;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.25rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
              <span class="badge" style="background: rgba(59, 130, 246, 0.25); color: #60A5FA; border: 1px solid rgba(96, 165, 250, 0.3);">
                ⚡ Algorithmic Mediation Demonstration Testbed
              </span>
              <span class="badge" style="background: rgba(168, 85, 247, 0.25); color: #C084FC; border: 1px solid rgba(192, 132, 252, 0.3);">
                🎯 Model: Fair-LinUCB & CCBN Dynamic Reward
              </span>
            </div>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: #F8FAFC; margin-bottom: 0.35rem; letter-spacing: -0.02em;">
              Simulator Algoritma Mediasi & Optimisasi Berkeadilan
            </h2>
            <p style="font-size: 0.9rem; color: #94A3B8; margin: 0; max-width: 850px; line-height: 1.5;">
              Demonstrator komputasional: Menguji bagaimana algoritma <strong>Fair-LinUCB</strong> menyeimbangkan trade-off antara capaian kompetensi dan beban kendala ASN (analogi <em>YouTube Adaptive Bitrate</em>) dengan normalisasi counterfactual \(\mathbb{E}[B \mid \text{Context}]\) dan residual \(\Delta B\).
            </p>
          </div>

          <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
            <div class="stat-pill">
              <span style="font-size: 1.25rem; font-weight: 800; color: #4ADE80;">{{ liveRewardScore.toFixed(2) }}</span>
              <span style="font-size: 0.725rem; color: #94A3B8; font-weight: 600; text-transform: uppercase;">Dynamic Reward \(r_t\)</span>
            </div>
            <div class="stat-pill">
              <span style="font-size: 1.25rem; font-weight: 800" :style="{ color: deltaBColor }">{{ liveDeltaB.toFixed(2) }}</span>
              <span style="font-size: 0.725rem; color: #94A3B8; font-weight: 600; text-transform: uppercase;">Residual \(\Delta B\)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- MAIN SIMULATOR INTERFACE -->
      <div class="simulator-grid">
        <!-- LEFT COLUMN: Input Constraints (Keterbatasan Akses & Konteks) -->
        <div class="sim-card card">
          <div class="card-header-row">
            <h4 class="sim-section-title">🎛️ Input Kendala Akses & Konteks ASN</h4>
            <span class="step-tag">Vektor \(x_t \in \mathcal{C}(t)\)</span>
          </div>

          <!-- Presets -->
          <div class="preset-group">
            <span class="preset-label">Skenario Lapangan Cepat:</span>
            <div class="preset-buttons">
              <button @click="applyPreset('3T_mobile')" class="preset-btn" :class="{ active: currentPreset === '3T_mobile' }">
                🏝️ Daerah 3T (Ponsel, Sinyal Drop)
              </button>
              <button @click="applyPreset('office_rush')" class="preset-btn" :class="{ active: currentPreset === 'office_rush' }">
                🏢 Jam Kantor Sibuk (Desktop, SPPD)
              </button>
              <button @click="applyPreset('night_study')" class="preset-btn" :class="{ active: currentPreset === 'night_study' }">
                🌙 Belajar Malam (Mandiri, Lancar)
              </button>
            </div>
          </div>

          <!-- Parameter 1: Bandwidth & Throughput -->
          <div class="control-item">
            <div class="control-label-row">
              <label>Throughput Jaringan (\(\beta_{bw}\)):</label>
              <span class="val-badge">{{ bandwidthKbps }} kbps ({{ bandwidthQuality }})</span>
            </div>
            <input type="range" min="50" max="10000" step="50" v-model.number="bandwidthKbps" class="slider" />
            <div class="range-marks">
              <span>50 kbps (3T Satelit)</span>
              <span>1000 kbps (3G)</span>
              <span>10.000 kbps (Fiber)</span>
            </div>
          </div>

          <!-- Parameter 2: Latency & Stall Ratio -->
          <div class="control-item">
            <div class="control-label-row">
              <label>Latensi & Stall Ratio (\(\beta_{lat}\)):</label>
              <span class="val-badge">{{ latencyMs }} ms / Buffer {{ stallRatio }}%</span>
            </div>
            <input type="range" min="20" max="1200" step="20" v-model.number="latencyMs" class="slider" />
          </div>

          <!-- Parameter 3: Device Form Factor -->
          <div class="control-item">
            <div class="control-label-row">
              <label>Perangkat (\(\delta_{dev}\)):</label>
              <span class="val-badge">{{ deviceName }} (Bobot: {{ devicePenalty }})</span>
            </div>
            <div class="segmented-control">
              <button :class="{ active: deviceType === 'smartphone' }" @click="deviceType = 'smartphone'">📱 Smartphone (1.0)</button>
              <button :class="{ active: deviceType === 'tablet' }" @click="deviceType = 'tablet'">📲 Tablet (0.6)</button>
              <button :class="{ active: deviceType === 'desktop' }" @click="deviceType = 'desktop'">💻 Desktop (0.2)</button>
            </div>
          </div>

          <!-- Parameter 4: Workload & Task Interruption -->
          <div class="control-item">
            <div class="control-label-row">
              <label>Beban Pelayanan & Interupsi Dinas (\(T_{work}\)):</label>
              <span class="val-badge text-red">{{ workloadLevel }}/5 ({{ workloadDesc }})</span>
            </div>
            <input type="range" min="1" max="5" step="1" v-model.number="workloadLevel" class="slider" />
          </div>

          <!-- Parameter 5: Sinyal Telemetri Perilaku Aktual -->
          <div class="telemetry-input-box">
            <h5 style="font-size: 0.825rem; font-weight: 700; color: #0F172A; margin-bottom: 0.5rem;">
              📡 Sinyal Bukti Telemetri Aktual Responden (\(B_{tele}\)):
            </h5>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <div>
                <label style="font-size: 0.75rem; color: #64748B;">Tab-Focus Ratio (\(\tau_{focus}\)):</label>
                <input type="range" min="0.05" max="1.0" step="0.05" v-model.number="observedFocus" class="slider" />
                <span style="font-size: 0.75rem; font-weight: 700; color: #1E293B;">{{ (observedFocus * 100).toFixed(0) }}% aktif</span>
              </div>
              <div>
                <label style="font-size: 0.75rem; color: #64748B;">Partial Retention (\(R_{partial}\)):</label>
                <input type="range" min="0.1" max="1.0" step="0.05" v-model.number="observedRetention" class="slider" />
                <span style="font-size: 0.75rem; font-weight: 700; color: #1E293B;">{{ (observedRetention * 100).toFixed(0) }}% segmen inti</span>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Algorithmic Mediation Output & Comparison -->
        <div class="sim-card card">
          <div class="card-header-row">
            <h4 class="sim-section-title">🧠 Kalkulasi Komputasi CCBN & Fair-LinUCB</h4>
            <span class="step-tag purple">Output Mediasi Real-Time</span>
          </div>

          <!-- Step 1: CCBN Counterfactual Normalization -->
          <div class="calc-box border-purple">
            <div class="calc-header">
              <span class="calc-step-num">STEP 1: CCBN NORMALISASI</span>
              <span class="formula-inline">\(\Delta B = B_{obs} - \mathbb{E}[B \mid C]\)</span>
            </div>
            <div class="ccbn-metrics-grid">
              <div class="metric-item">
                <span class="metric-title">Ekspektasi Konteks \(\mathbb{E}[\tau_{focus} \mid C]\):</span>
                <span class="metric-val">{{ (expectedFocus * 100).toFixed(0) }}%</span>
                <span class="metric-note">Dihitung dari beban kerja & sinyal</span>
              </div>
              <div class="metric-item">
                <span class="metric-title">Perilaku Teramati \(B_{obs}\):</span>
                <span class="metric-val">{{ (observedFocus * 100).toFixed(0) }}%</span>
                <span class="metric-note">Fokus tab aktual</span>
              </div>
              <div class="metric-item highlight">
                <span class="metric-title">Sinyal Residual \(\Delta B\):</span>
                <span class="metric-val" :style="{ color: deltaBColor }">{{ liveDeltaB.toFixed(2) }}</span>
                <span class="metric-note"><strong>{{ deltaBInterpretation }}</strong></span>
              </div>
            </div>
          </div>

          <!-- Step 2: Algorithmic Action Selection (YouTube Bitrate Analogy) -->
          <div class="calc-box border-green" style="margin-top: 1rem;">
            <div class="calc-header">
              <span class="calc-step-num">STEP 2: FAIR-LINUCB ACTION SELECTION</span>
              <span class="formula-inline">\(A^* = \arg\max_{a} r_t(a)\)</span>
            </div>
            
            <div class="recommended-action-card">
              <div class="action-badge-row">
                <span class="action-badge-tag">{{ selectedAction.tag }}</span>
                <span class="action-badge-score">Reward \(r_t = {{ liveRewardScore.toFixed(2) }}\)</span>
              </div>
              <h4 class="action-title">{{ selectedAction.name }}</h4>
              <p class="action-desc">{{ selectedAction.desc }}</p>
              
              <div class="action-specs-grid">
                <div class="spec-item">
                  <span class="spec-k">Resolusi Kognitif:</span>
                  <span class="spec-v">{{ selectedAction.cognitiveResolution }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-k">Modalitas:</span>
                  <span class="spec-v">{{ selectedAction.modality }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-k">Biaya Bandwidth:</span>
                  <span class="spec-v">{{ selectedAction.bandwidthCost }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-k">Disrupsi Waktu Kerja:</span>
                  <span class="spec-v">{{ selectedAction.workloadFriction }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Policy Comparison (Static vs Adaptive) -->
          <div style="margin-top: 1rem;">
            <h5 style="font-size: 0.85rem; font-weight: 700; color: #1E293B; margin-bottom: 0.5rem;">
              ⚖️ Perbandingan Perlakuan Antar Kebijakan Algoritmik:
            </h5>
            <div class="policy-compare-table">
              <div class="policy-row header">
                <span>Kebijakan Sistem</span>
                <span>Keputusan Sistem</span>
                <span>Status Keadilan (Fairness)</span>
              </div>
              <div class="policy-row danger">
                <span class="p-name">1. LMS Konvensional (Punitive)</span>
                <span class="p-act">{{ punitivePolicyDecision }}</span>
                <span class="p-fair text-red">❌ Unfair Penalty (Context Blind)</span>
              </div>
              <div class="policy-row warning">
                <span class="p-name">2. Static Rule-Based</span>
                <span class="p-act">{{ staticRuleDecision }}</span>
                <span class="p-fair text-amber">⚠️ Drop / Kaku (Rigid Threshold)</span>
              </div>
              <div class="policy-row success">
                <span class="p-name">3. Fair-LinUCB (Disertasi)</span>
                <span class="p-act">{{ selectedAction.name }}</span>
                <span class="p-fair text-green">✅ Pareto Optimal & Zero Unfair Penalty</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Navbar from '~/components/Navbar.vue';

// Simulator State
const currentPreset = ref<string>('3T_mobile');
const bandwidthKbps = ref<number>(120);
const latencyMs = ref<number>(450);
const deviceType = ref<'smartphone' | 'tablet' | 'desktop'>('smartphone');
const workloadLevel = ref<number>(4);
const observedFocus = ref<number>(0.35);
const observedRetention = ref<number>(0.70);

function applyPreset(preset: string) {
  currentPreset.value = preset;
  if (preset === '3T_mobile') {
    bandwidthKbps.value = 110;
    latencyMs.value = 520;
    deviceType.value = 'smartphone';
    workloadLevel.value = 3;
    observedFocus.value = 0.40;
    observedRetention.value = 0.65;
  } else if (preset === 'office_rush') {
    bandwidthKbps.value = 2500;
    latencyMs.value = 45;
    deviceType.value = 'desktop';
    workloadLevel.value = 5;
    observedFocus.value = 0.25;
    observedRetention.value = 0.60;
  } else if (preset === 'night_study') {
    bandwidthKbps.value = 5000;
    latencyMs.value = 30;
    deviceType.value = 'desktop';
    workloadLevel.value = 1;
    observedFocus.value = 0.90;
    observedRetention.value = 0.95;
  }
}

// Computed Descriptions
const bandwidthQuality = computed(() => {
  if (bandwidthKbps.value < 200) return 'Sangat Terbatas (3T)';
  if (bandwidthKbps.value < 1000) return 'Sedang (3G/4G Low)';
  return 'Tinggi / Stabil';
});

const stallRatio = computed(() => {
  if (bandwidthKbps.value < 150) return Math.min(Math.round((150 / bandwidthKbps.value) * 35), 85);
  if (bandwidthKbps.value < 500) return 15;
  return 2;
});

const deviceName = computed(() => {
  if (deviceType.value === 'smartphone') return 'Smartphone (Layar Kecil)';
  if (deviceType.value === 'tablet') return 'Tablet';
  return 'Desktop / Laptop Workstation';
});

const devicePenalty = computed(() => {
  if (deviceType.value === 'smartphone') return 1.0;
  if (deviceType.value === 'tablet') return 0.6;
  return 0.2;
});

const workloadDesc = computed(() => {
  if (workloadLevel.value >= 4) return 'Tinggi (Tugas Dinamis / SPPD / Pelayanan)';
  if (workloadLevel.value === 3) return 'Sedang (Tugas Rutin Kantor)';
  return 'Rendah / Waktu Belajar Didedikasikan';
});

// CCBN Calculations
const expectedFocus = computed(() => {
  // Baseline expectation formula E[tau_focus | Context]
  let base = 0.90;
  // Workload deduction
  base -= (workloadLevel.value / 5) * 0.45;
  // Bandwidth frustration deduction
  if (bandwidthKbps.value < 250) base -= 0.15;
  // Device penalty deduction
  if (deviceType.value === 'smartphone') base -= 0.10;
  return Math.max(Math.min(base, 0.95), 0.20);
});

const liveDeltaB = computed(() => {
  // Residual = B_obs - E[B | Context]
  return observedFocus.value - expectedFocus.value;
});

const deltaBColor = computed(() => {
  if (liveDeltaB.value >= -0.05) return '#10B981'; // Green (Safe/Wajar)
  if (liveDeltaB.value >= -0.20) return '#F59E0B'; // Amber (Mild Residual)
  return '#EF4444'; // Red (Significant Ghost Learning)
});

const deltaBInterpretation = computed(() => {
  if (liveDeltaB.value >= -0.05) {
    return 'Wajar (Perilaku sesuai kendala situasi lingkungan, tidak ada hukuman)';
  } else if (liveDeltaB.value >= -0.20) {
    return 'Friksi Ringan (Disarankan Dynamic Micro-Chunking)';
  }
  return 'Penyimpangan Signifikan (Terindikasi Ghost Learning otentik)';
});

// Fair-LinUCB Decision & Dynamic Reward
const selectedAction = computed(() => {
  // If bandwidth severely constrained -> Adaptive Modality Fallback
  if (bandwidthKbps.value < 200 || stallRatio.value > 30) {
    return {
      tag: 'AKSI ADAPTIF 1: BANDWIDTH FALLBACK',
      name: 'Modality Fallback: Text-First & Audio Checklist Ringkas',
      desc: 'Mengalihkan stream video berat ke modul teks terstruktur berukuran <100KB dengan audio podcast kompresi rendah dan pre-cached quiz.',
      cognitiveResolution: 'Format Esensial (Hemat Bandwidth)',
      modality: 'Teks Ringkas + Infografis + Audio',
      bandwidthCost: '< 1 MB (Sangat Rendah)',
      workloadFriction: 'Dapat dibaca offline'
    };
  }

  // If high workload during office hours -> Dynamic Micro-Chunking
  if (workloadLevel.value >= 4) {
    return {
      tag: 'AKSI ADAPTIF 2: WORKLOAD MICRO-CHUNKING',
      name: 'Dynamic Micro-Chunking: 3-Minute Case Scaffolding',
      desc: 'Memecah modul panjang 45 menit menjadi skenario interaktif 3 menit. Titik jeda tersimpan otomatis saat tab berpindah tanpa penalti.',
      cognitiveResolution: 'Bite-sized Micro Learning',
      modality: 'Studi Kasus 1 Soal + Infografis Inti',
      bandwidthCost: 'Sedang (5 MB)',
      workloadFriction: 'Nol (Adaptif terhadap interupsi kantor)'
    };
  }

  // If ghost learning detected (Delta B << 0) -> Active Verification Stop-Gate
  if (liveDeltaB.value < -0.20) {
    return {
      tag: 'AKSI ADAPTIF 3: ACTIVE VERIFICATION',
      name: 'Active Verification Stop-Gate: 1-Question Checkpoint',
      desc: 'Menjeda video latar belakang secara halus dan menampilkan 1 pertanyaan skenario kontekstual untuk mengubah kepatuhan pasif menjadi atensi kognitif aktif.',
      cognitiveResolution: 'Verifikasi Atensi Aktif',
      modality: 'Interactive Scenario Checkpoint',
      bandwidthCost: 'Rendah',
      workloadFriction: 'Ringan (1 Pertanyaan Interaktif)'
    };
  }

  // Default optimal learning
  return {
    tag: 'AKSI ADAPTIF 4: STANDARD INTERACTIVE',
    name: 'Standard Interactive Multimedia & Case Discussion',
    desc: 'Menyajikan materi video interaktif penuh dengan simulasi komprehensif karena kondisi jaringan dan ketersediaan waktu sangat mendukung.',
    cognitiveResolution: 'Penuh (Standard Resolution)',
    modality: 'Video HD + Simulasi Interaktif',
    bandwidthCost: 'Tinggi (> 50 MB)',
    workloadFriction: 'Memerlukan fokus penuh'
  };
});

const liveRewardScore = computed(() => {
  // Multi-objective reward r_t = CompGain - lambda_1 * WorkCost - lambda_2 * InfraCost + gamma * FairPenalty
  let gain = observedRetention.value * 1.2;
  let workPenalty = (workloadLevel.value / 5) * 0.3;
  let infraPenalty = (1000 / Math.max(bandwidthKbps.value, 100)) * 0.15;
  let fairnessBonus = liveDeltaB.value >= -0.05 ? 0.35 : -0.25;

  return Math.max(gain - workPenalty - infraPenalty + fairnessBonus, 0.1);
});

// Comparison Decisions
const punitivePolicyDecision = computed(() => {
  if (observedFocus.value < 0.5) return 'Gagal / Diberi Penalti Nilai karena Tab Tidak Fokus';
  if (stallRatio.value > 25) return 'Session Timeout / Tugas Dianggap Terlambat';
  return 'Lulus Bersyarat';
});

const staticRuleDecision = computed(() => {
  if (workloadLevel.value >= 4) return 'Dropout / Modul Terhenti di Tengah';
  if (bandwidthKbps.value < 200) return 'Video Error / Layar Hitam Buffering';
  return 'Modul Tetap Berjalan Kaku';
});
</script>

<style scoped>
.header-banner {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.stat-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.simulator-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 960px) {
  .simulator-grid {
    grid-template-columns: 1fr;
  }
}

.sim-card {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-stroke-secondary);
  background: #FFFFFF;
}

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #E2E8F0;
}

.sim-section-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0;
}

.step-tag {
  font-size: 0.75rem;
  font-weight: 700;
  color: #2563EB;
  background: #EFF6FF;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  border: 1px solid #BFDBFE;
}

.step-tag.purple {
  color: #8B5CF6;
  background: #F3E8FF;
  border-color: #DDD6FE;
}

.preset-group {
  margin-bottom: 1.25rem;
}

.preset-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748B;
  display: block;
  margin-bottom: 0.4rem;
}

.preset-buttons {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.preset-btn {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.35rem 0.65rem;
  border-radius: var(--radius-sm);
  border: 1px solid #CBD5E1;
  background: #F8FAFC;
  color: #334155;
  cursor: pointer;
  transition: all 0.2s ease;
}

.preset-btn:hover {
  background: #E2E8F0;
}

.preset-btn.active {
  background: #1E293B;
  color: #FFFFFF;
  border-color: #1E293B;
}

.control-item {
  margin-bottom: 1.15rem;
}

.control-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.825rem;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 0.35rem;
}

.val-badge {
  font-size: 0.75rem;
  font-family: monospace;
  font-weight: 700;
  color: #2563EB;
  background: #EFF6FF;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.val-badge.text-red {
  color: #DC2626;
  background: #FEF2F2;
}

.slider {
  width: 100%;
  accent-color: #2563EB;
  cursor: pointer;
}

.range-marks {
  display: flex;
  justify-content: space-between;
  font-size: 0.65rem;
  color: #94A3B8;
  margin-top: 0.2rem;
}

.segmented-control {
  display: flex;
  gap: 0.35rem;
  background: #F1F5F9;
  padding: 0.25rem;
  border-radius: var(--radius-md);
}

.segmented-control button {
  flex: 1;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.4rem;
  border: none;
  background: transparent;
  color: #475569;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
}

.segmented-control button.active {
  background: #FFFFFF;
  color: #0F172A;
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.telemetry-input-box {
  background: #F8FAFC;
  padding: 0.85rem;
  border-radius: var(--radius-md);
  border: 1px solid #E2E8F0;
  margin-top: 1rem;
}

.calc-box {
  padding: 1rem;
  border-radius: var(--radius-md);
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
}

.calc-box.border-purple {
  border-left: 4px solid #8B5CF6;
}

.calc-box.border-green {
  border-left: 4px solid #10B981;
}

.calc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.65rem;
}

.calc-step-num {
  font-size: 0.7rem;
  font-weight: 800;
  color: #64748B;
  letter-spacing: 0.05em;
}

.formula-inline {
  font-family: monospace;
  font-size: 0.75rem;
  color: #2563EB;
  font-weight: 700;
}

.ccbn-metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.metric-item {
  background: #FFFFFF;
  padding: 0.65rem;
  border-radius: var(--radius-sm);
  border: 1px solid #E2E8F0;
  display: flex;
  flex-direction: column;
}

.metric-item.highlight {
  border-color: #CBD5E1;
  background: #F1F5F9;
}

.metric-title {
  font-size: 0.65rem;
  font-weight: 700;
  color: #64748B;
  margin-bottom: 0.2rem;
}

.metric-val {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0F172A;
  line-height: 1.2;
}

.metric-note {
  font-size: 0.65rem;
  color: #94A3B8;
  margin-top: 0.2rem;
}

.recommended-action-card {
  background: #FFFFFF;
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 1px solid #E2E8F0;
}

.action-badge-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.35rem;
}

.action-badge-tag {
  font-size: 0.65rem;
  font-weight: 800;
  color: #047857;
  background: #D1FAE5;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.action-badge-score {
  font-size: 0.75rem;
  font-weight: 800;
  color: #10B981;
  font-family: monospace;
}

.action-title {
  font-size: 1rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0.25rem 0 0.35rem 0;
}

.action-desc {
  font-size: 0.8rem;
  color: #475569;
  line-height: 1.45;
  margin-bottom: 0.75rem;
}

.action-specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  background: #F8FAFC;
  padding: 0.65rem;
  border-radius: var(--radius-sm);
  border: 1px solid #E2E8F0;
}

.spec-item {
  display: flex;
  flex-direction: column;
}

.spec-k {
  font-size: 0.65rem;
  color: #64748B;
  font-weight: 600;
}

.spec-v {
  font-size: 0.75rem;
  font-weight: 700;
  color: #1E293B;
}

.policy-compare-table {
  border: 1px solid #E2E8F0;
  border-radius: var(--radius-md);
  overflow: hidden;
  font-size: 0.775rem;
}

.policy-row {
  display: grid;
  grid-template-columns: 1.2fr 1.5fr 1.3fr;
  padding: 0.6rem 0.75rem;
  border-bottom: 1px solid #E2E8F0;
  align-items: center;
}

.policy-row:last-child {
  border-bottom: none;
}

.policy-row.header {
  background: #F1F5F9;
  font-weight: 700;
  color: #334155;
}

.policy-row.danger { background: #FEF2F2; }
.policy-row.warning { background: #FFFBEB; }
.policy-row.success { background: #F0FDF4; font-weight: 600; }

.p-name { font-weight: 700; color: #0F172A; }
.p-act { color: #334155; }
.p-fair { font-weight: 700; }
</style>
