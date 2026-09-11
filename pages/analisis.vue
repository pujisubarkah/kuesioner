<template>
  <div class="app-container">
    <!-- Top Header Navigation -->
    <Navbar />

    <main id="konten-utama" class="main-content">
      <!-- TOP TITLE & STATUS BANNER -->
      <div class="card header-banner">
        <div class="header-flex-row">
          <div>
            <div class="header-badge-row">
              <span class="badge badge-blue">⚡ Baseline: LinUCB (Li et al., 2010)</span>
              <span class="badge badge-amber">⚖️ Target Riset: Regional Disparity Aware</span>
              <span class="badge badge-yellow">🟡 Status: Under Development</span>
            </div>
            <h2 class="header-title">
              Evolusi Algoritma: Dari Baseline LinUCB Menuju Candidate Disparity-Aware LinUCB
            </h2>
            <p class="header-desc">
              Studi komputasional komparatif: Menguji bagaimana penambahan penalti disparitas regional (<code class="formula-code">λ_t · D_{a,t}</code>) pada algoritma <strong>LinUCB</strong> menyeimbangkan trade-off antara efektivitas pembelajaran agregat (<em>expected reward</em>) dan keadilan luaran (<em>equity</em>) antara ASN wilayah 3T vs Perkotaan (Urban).
            </p>
          </div>

          <div class="header-stats-group">
            <div class="stat-pill">
              <span class="stat-value text-green">{{ liveRewardScore.toFixed(2) }}</span>
              <span class="stat-label">Live Candidate Score</span>
            </div>
            <div class="stat-pill">
              <span class="stat-value" :style="{ color: deltaBColor }">{{ liveDeltaB.toFixed(2) }}</span>
              <span class="stat-label">Residual ΔB</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- TAHAP 1 & 2: BASELINE & RESEARCH PROBLEM                                 -->
      <!-- ========================================================================= -->
      <div class="theory-framework-grid">
        <!-- 1. Baseline: LinUCB -->
        <div class="card theory-card border-blue">
          <div class="card-tag-row">
            <span class="stage-tag blue">TAHAP 1: BASELINE ALGORITHM</span>
            <span class="ref-pill">Li et al., 2010 (ACM WWW)</span>
          </div>
          <h3 class="theory-card-title">1. Baseline Algorithm — LinUCB</h3>
          <p class="theory-card-p">
            LinUCB digunakan sebagai <em>baseline algorithm</em> karena terbukti tangguh memilih intervensi adaptif berdasarkan vektor konteks fitur (<code class="formula-code">x_t</code>) dan menyeimbangkan <em>exploitation–exploration trade-off</em> melalui bound UCB:
          </p>
          
          <div class="formula-display-box formula-blue">
            <div class="formula-math">
              A_t^* = \arg\max_a \left[ x_t^T \hat{\theta}_a + \alpha \sqrt{x_t^T A_a^{-1} x_t} \right]
            </div>
            <div class="formula-subnote">
              <span>x_t^T θ̂_a : Estimasi Reward</span>
              <span>•</span>
              <span>α √(x_t^T A_a⁻¹ x_t) : Bonus Eksplorasi Ketidakpastian</span>
            </div>
          </div>
          <p class="theory-card-note">
            💡 <strong>Kekuatan Baseline:</strong> Mampu mempersonalisasi rekomendasi konten/modalitas secara dinamis pada data kontinu.
          </p>
        </div>

        <!-- 2. Research Problem: Belum Disparity-Aware -->
        <div class="card theory-card border-red">
          <div class="card-tag-row">
            <span class="stage-tag red">TAHAP 2: RESEARCH PROBLEM</span>
            <span class="ref-pill">Celah Metodologis</span>
          </div>
          <h3 class="theory-card-title">2. Problem: LinUCB Belum Disparity-Aware</h3>
          <p class="theory-card-p">
            <strong>Masalah Mendasar:</strong> LinUCB mengoptimalkan <em>expected reward</em> berdasarkan konteks individu, <strong>tetapi belum secara eksplisit memperhitungkan disparitas outcome antar kelompok/konteks wilayah</strong> (3T vs Non-3T).
          </p>

          <!-- Visual Diagram of Disparity -->
          <div class="disparity-flow-box">
            <div class="flow-item">
              <span class="flow-node">LinUCB Standar</span>
            </div>
            <div class="flow-arrow">➔</div>
            <div class="flow-item">
              <span class="flow-node high">High Overall Reward (0.71)</span>
            </div>
            <div class="flow-arrow">➔</div>
            <div class="flow-item gap">
              <div class="split-outcome">
                <span class="badge-3t">🏝️ 3T: Outcome Rendah (0.42)</span>
                <span class="badge-urban">🏢 Urban: Outcome Tinggi (0.71)</span>
              </div>
              <span class="gap-result">⚠️ Regional Disparity Gap: D = 0.29</span>
            </div>
          </div>
          <p class="theory-card-note text-red">
            ⚠️ <strong>Dampak:</strong> ASN 3T tertinggal secara akumulatif karena algoritma standar lebih sering mengeksploitasi format berat yang hanya optimal untuk wilayah urban.
          </p>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- TAHAP 3: ALGORITHM DEVELOPMENT ROADMAP                                    -->
      <!-- ========================================================================= -->
      <div class="card roadmap-card">
        <div class="roadmap-header">
          <div>
            <div class="badge-tag-line">
              <span class="badge badge-purple">🛣️ Kerangka Pengembangan Bertahap</span>
              <span class="badge badge-yellow">🟡 Status: Under Development</span>
            </div>
            <h3 class="roadmap-title">3. Algorithm Development Roadmap</h3>
            <p class="roadmap-desc">
              Peta jalan iteratif evolusi formulasi matematika dari standard bandit hingga adaptive disparity mitigation:
            </p>
          </div>
        </div>

        <div class="timeline-steps-grid">
          <div class="step-card done">
            <div class="step-badge">STEP 0</div>
            <h4 class="step-title">Standard LinUCB</h4>
            <p class="step-p">Baseline Li et al. (2010) dengan fitur kontekstual standar.</p>
            <span class="step-status">✅ Baseline Selesai</span>
          </div>

          <div class="step-card done">
            <div class="step-badge">STEP 1</div>
            <h4 class="step-title">Context-Aware LinUCB</h4>
            <p class="step-p">Pemodelan vektor kendala spasial, bandwidth (β_bw), latensi (β_lat), & beban dinas (T_work).</p>
            <span class="step-status">✅ Fitur Dipetakan</span>
          </div>

          <div class="step-card done">
            <div class="step-badge">STEP 2</div>
            <h4 class="step-title">Disparity Measurement</h4>
            <p class="step-p">Pengukuran gap luaran antar wilayah: D_{a,t} = |μ̂_{a,3T} - μ̂_{a,Urban}|.</p>
            <span class="step-status">✅ Metrik Terdefinisi</span>
          </div>

          <div class="step-card in-progress">
            <div class="step-badge">STEP 3</div>
            <h4 class="step-title">Disparity-Aware Decision</h4>
            <p class="step-p">Penetapan fungsi skor keputusan berbobot disparitas Score_{a,t}.</p>
            <span class="step-status yellow">🟡 Under Development</span>
          </div>

          <div class="step-card prototype">
            <div class="step-badge">STEP 4</div>
            <h4 class="step-title">Adaptive LinUCB Controller</h4>
            <p class="step-p">Kontroler adaptif parameter penalti λ_t berbasis kestabilan konvergensi.</p>
            <span class="step-status yellow">🟡 Under Development</span>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- TAHAP 4: FORMULA KANDIDAT DISERTASI                                       -->
      <!-- ========================================================================= -->
      <div class="card candidate-formula-card">
        <div class="candidate-header">
          <div>
            <span class="badge badge-amber">📐 Formulasi Matematika Kandidat</span>
            <h3 class="candidate-title">4. Candidate Disparity-Aware Formulation</h3>
          </div>
          <span class="candidate-note-pill">Candidate Formulation (Subject to Theoretical Validation)</span>
        </div>

        <div class="formula-candidate-box">
          <div class="math-row">
            <div class="math-chunk">
              <span class="term">Score_{a,t} =</span>
            </div>
            <div class="math-chunk chunk-reward">
              <span class="term">x_t^T \hat{\theta}_a</span>
              <span class="sub-label">Expected Reward (Individual Context)</span>
            </div>
            <span class="op">+</span>
            <div class="math-chunk chunk-explore">
              <span class="term">\alpha \sqrt{x_t^T A_a^{-1} x_t}</span>
              <span class="sub-label">Exploration Bonus (Uncertainty)</span>
            </div>
            <span class="op">-</span>
            <div class="math-chunk chunk-disparity">
              <span class="term">\lambda_t D_{a,t}</span>
              <span class="sub-label">Regional Disparity Penalty</span>
            </div>
          </div>

          <div class="decision-rule-row">
            <div class="math-rule">
              a_t^* = \arg\max_a Score_{a,t}
            </div>
            <div class="math-disparity-def">
              \text{dengan } D_{a,t} = |\hat{\mu}_{a,3T} - \hat{\mu}_{a,\text{Urban}}|
            </div>
          </div>
        </div>

        <div class="candidate-disclaimer">
          <span class="disc-icon">⚠️</span>
          <p class="disc-text">
            <strong>Catatan Ilmiah:</strong> <em>Candidate formulation — subject to theoretical validation and comparison with existing fair contextual bandit approaches. Formulasi ini dirancang untuk mengontrol gap disparitas D tanpa mendegradasi performa agregat secara berlebihan.</em>
          </p>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- TAHAP 5: SIMULATOR EKSPERIMEN VISUAL & EVALUASI TRADE-OFF                -->
      <!-- ========================================================================= -->
      <div class="section-title-row" style="margin-top: 2rem; margin-bottom: 1rem;">
        <div>
          <h3 style="font-size: 1.3rem; font-weight: 800; color: #0F172A; margin: 0;">
            5. Simulator Interaktif & Evaluasi Trade-off (Effectiveness vs Equity)
          </h3>
          <p style="font-size: 0.85rem; color: #64748B; margin: 0.2rem 0 0 0;">
            Uji sensitivitas model terhadap kendala lapangan aktual dan periksa dampak mitigasi kesenjangan antar skenario kebijakan.
          </p>
        </div>
      </div>

      <!-- Comparison Summary Cards (Scenario A vs Scenario B) -->
      <div class="scenarios-comparison-grid">
        <!-- Scenario A Card -->
        <div class="card scenario-box border-slate">
          <div class="scenario-top">
            <span class="scenario-tag slate">SKENARIO A</span>
            <span class="scenario-type">Standard LinUCB</span>
          </div>
          <div class="scenario-stats">
            <div class="s-stat">
              <span class="s-val text-slate">0.71</span>
              <span class="s-lbl">Overall Reward</span>
            </div>
            <div class="s-stat">
              <span class="s-val text-red">0.42</span>
              <span class="s-lbl">3T Outcome</span>
            </div>
            <div class="s-stat">
              <span class="s-val text-green">0.71</span>
              <span class="s-lbl">Urban Outcome</span>
            </div>
          </div>
          <div class="scenario-gap-bar bg-red-light">
            <span>Disparity Gap: <strong>D = 0.29</strong> (Tinggi / Kesenjangan Lebar)</span>
          </div>
        </div>

        <!-- Scenario B Card -->
        <div class="card scenario-box border-emerald">
          <div class="scenario-top">
            <span class="scenario-tag emerald">SKENARIO B (KANDIDAT)</span>
            <span class="scenario-type">Candidate Disparity-Aware LinUCB</span>
          </div>
          <div class="scenario-stats">
            <div class="s-stat">
              <span class="s-val text-emerald">0.68</span>
              <span class="s-lbl">Overall Reward</span>
            </div>
            <div class="s-stat">
              <span class="s-val text-emerald">0.61</span>
              <span class="s-lbl">3T Outcome (Terangkat)</span>
            </div>
            <div class="s-stat">
              <span class="s-val text-emerald">0.68</span>
              <span class="s-lbl">Urban Outcome</span>
            </div>
          </div>
          <div class="scenario-gap-bar bg-green-light">
            <span>Disparity Gap: <strong>D = 0.07</strong> (Menyempit Signifikan -75%)</span>
          </div>
        </div>
      </div>

      <!-- Trade-off Table -->
      <div class="card" style="margin-bottom: 1.5rem; padding: 1.25rem 1.5rem; background: #FFFFFF; border: 1px solid #E2E8F0;">
        <h4 style="font-size: 0.95rem; font-weight: 800; color: #0F172A; margin: 0 0 0.85rem 0;">
          📊 Tabel Evaluasi Trade-off: Efektivitas Agregat vs Keadilan Regional (Equity)
        </h4>
        <div class="tradeoff-table-wrapper">
          <table class="tradeoff-table">
            <thead>
              <tr>
                <th>Metrik Evaluasi</th>
                <th>Scenario A (Standard LinUCB)</th>
                <th>Scenario B (Candidate Disparity-Aware)</th>
                <th>Delta / Dampak Perlakuan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Overall Reward</strong> (Efektivitas Agregat)</td>
                <td><span class="badge-tbl">0.71</span></td>
                <td><span class="badge-tbl">0.68</span></td>
                <td class="text-amber"><strong>-0.03</strong> (Trade-off efisiensi minimal)</td>
              </tr>
              <tr>
                <td><strong>3T Region Outcome</strong> (Kelompok Rentan)</td>
                <td><span class="badge-tbl text-red">0.42 (Tertinggal)</span></td>
                <td><span class="badge-tbl text-green">0.61 (Meningkat)</span></td>
                <td class="text-green"><strong>+0.19</strong> (Perbaikan keadilan luaran)</td>
              </tr>
              <tr>
                <td><strong>Urban Region Outcome</strong> (Perkotaan)</td>
                <td><span class="badge-tbl">0.71</span></td>
                <td><span class="badge-tbl">0.68</span></td>
                <td class="text-slate">-0.03</td>
              </tr>
              <tr class="highlight-row">
                <td><strong>Disparity Gap D = |μ̂_{3T} - μ̂_{Urban}|</strong></td>
                <td><span class="badge-tbl bg-red-pill">0.29 (Kesenjangan Lebar)</span></td>
                <td><span class="badge-tbl bg-green-pill">0.07 (Kesenjangan Rata)</span></td>
                <td class="text-emerald"><strong>-0.22 (Reduksi Kesenjangan ~75%)</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- MAIN SIMULATOR INTERFACE -->
      <div class="simulator-grid">
        <!-- LEFT COLUMN: Input Constraints (Keterbatasan Akses & Konteks) -->
        <div class="sim-card card">
          <div class="card-header-row">
            <h4 class="sim-section-title">🎛️ Input Kendala Akses & Konteks ASN</h4>
            <span class="step-tag">Vektor x_t ∈ C(t)</span>
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
              <label>Throughput Jaringan (β_bw):</label>
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
              <label>Latensi & Stall Ratio (β_lat):</label>
              <span class="val-badge">{{ latencyMs }} ms / Buffer {{ stallRatio }}%</span>
            </div>
            <input type="range" min="20" max="1200" step="20" v-model.number="latencyMs" class="slider" />
          </div>

          <!-- Parameter 3: Device Form Factor -->
          <div class="control-item">
            <div class="control-label-row">
              <label>Perangkat (δ_dev):</label>
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
              <label>Beban Pelayanan & Interupsi Dinas (T_work):</label>
              <span class="val-badge text-red">{{ workloadLevel }}/5 ({{ workloadDesc }})</span>
            </div>
            <input type="range" min="1" max="5" step="1" v-model.number="workloadLevel" class="slider" />
          </div>

          <!-- Parameter 5: Sinyal Telemetri Perilaku Aktual -->
          <div class="telemetry-input-box">
            <h5 style="font-size: 0.825rem; font-weight: 700; color: #0F172A; margin-bottom: 0.5rem;">
              📡 Sinyal Bukti Telemetri Aktual Responden (B_tele):
            </h5>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <div>
                <label style="font-size: 0.75rem; color: #64748B;">Tab-Focus Ratio (τ_focus):</label>
                <input type="range" min="0.05" max="1.0" step="0.05" v-model.number="observedFocus" class="slider" />
                <span style="font-size: 0.75rem; font-weight: 700; color: #1E293B;">{{ (observedFocus * 100).toFixed(0) }}% aktif</span>
              </div>
              <div>
                <label style="font-size: 0.75rem; color: #64748B;">Partial Retention (R_partial):</label>
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
              <span class="formula-inline">ΔB = B_obs - E[B | C]</span>
            </div>
            <div class="ccbn-metrics-grid">
              <div class="metric-item">
                <span class="metric-title">Ekspektasi Konteks E[τ_focus | C]:</span>
                <span class="metric-val">{{ (expectedFocus * 100).toFixed(0) }}%</span>
                <span class="metric-note">Dihitung dari beban kerja & sinyal</span>
              </div>
              <div class="metric-item">
                <span class="metric-title">Perilaku Teramati B_obs:</span>
                <span class="metric-val">{{ (observedFocus * 100).toFixed(0) }}%</span>
                <span class="metric-note">Fokus tab aktual</span>
              </div>
              <div class="metric-item highlight">
                <span class="metric-title">Sinyal Residual ΔB:</span>
                <span class="metric-val" :style="{ color: deltaBColor }">{{ liveDeltaB.toFixed(2) }}</span>
                <span class="metric-note"><strong>{{ deltaBInterpretation }}</strong></span>
              </div>
            </div>
          </div>

          <!-- Step 2: Algorithmic Action Selection (YouTube Bitrate Analogy) -->
          <div class="calc-box border-green" style="margin-top: 1rem;">
            <div class="calc-header">
              <span class="calc-step-num">CANDIDATE DISPARITY-AWARE ACTION SELECTION</span>
              <span class="formula-inline">a* = argmax_a Score_{a,t}</span>
            </div>
            
            <div class="recommended-action-card">
              <div class="action-badge-row">
                <span class="action-badge-tag">{{ selectedAction.tag }}</span>
                <span class="action-badge-score">Score = {{ liveRewardScore.toFixed(2) }}</span>
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
                <span>Status Evaluasi Keadilan</span>
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
                <span class="p-name">3. Candidate Disparity-Aware LinUCB</span>
                <span class="p-act">{{ selectedAction.name }}</span>
                <span class="p-fair text-green">✅ Evaluating Effectiveness–Equity Trade-off</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- CCBN & Fair-LinUCB Theoretical Literature Matrix -->
      <CcbnLiteratureGrounding />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Navbar from '~/components/Navbar.vue';
import CcbnLiteratureGrounding from '~/components/CcbnLiteratureGrounding.vue';

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

/* ========================================================================= */
/* STYLES UNTUK 5 TAHAP EVOLUSI LINUCB & TRADE-OFF EVALUATION                */
/* ========================================================================= */
.header-flex-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.header-badge-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.badge-blue {
  background: rgba(59, 130, 246, 0.25);
  color: #60A5FA;
  border: 1px solid rgba(96, 165, 250, 0.3);
}

.badge-amber {
  background: rgba(245, 158, 11, 0.25);
  color: #FBBF24;
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.badge-yellow {
  background: rgba(234, 179, 8, 0.25);
  color: #FDE047;
  border: 1px solid rgba(253, 224, 71, 0.3);
}

.badge-purple {
  background: rgba(168, 85, 247, 0.25);
  color: #C084FC;
  border: 1px solid rgba(192, 132, 252, 0.3);
}

.header-title {
  font-size: 1.45rem;
  font-weight: 800;
  color: #F8FAFC;
  margin: 0 0 0.35rem 0;
  letter-spacing: -0.02em;
}

.header-desc {
  font-size: 0.875rem;
  color: #94A3B8;
  margin: 0;
  max-width: 850px;
  line-height: 1.55;
}

.formula-code {
  font-family: monospace;
  background: rgba(255, 255, 255, 0.12);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  color: #FBBF24;
}

.header-stats-group {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
}

.theory-framework-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 900px) {
  .theory-framework-grid {
    grid-template-columns: 1fr;
  }
}

.theory-card {
  padding: 1.35rem 1.5rem;
  background: #FFFFFF;
  border-radius: var(--radius-lg, 12px);
  border: 1px solid #E2E8F0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.theory-card.border-blue { border-left: 5px solid #3B82F6; }
.theory-card.border-red { border-left: 5px solid #EF4444; }

.card-tag-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
}

.stage-tag {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.stage-tag.blue { background: #EFF6FF; color: #1D4ED8; }
.stage-tag.red { background: #FEF2F2; color: #DC2626; }

.ref-pill {
  font-size: 0.725rem;
  font-weight: 700;
  color: #64748B;
  background: #F8FAFC;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #E2E8F0;
}

.theory-card-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 0.4rem 0;
}

.theory-card-p {
  font-size: 0.85rem;
  color: #475569;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.formula-display-box {
  background: #F8FAFC;
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  padding: 0.85rem 1rem;
  margin-bottom: 0.75rem;
}

.formula-blue {
  background: #EFF6FF;
  border-color: #BFDBFE;
}

.formula-math {
  font-family: monospace;
  font-size: 0.9rem;
  font-weight: 700;
  color: #1E3A8A;
  text-align: center;
  margin-bottom: 0.4rem;
}

.formula-subnote {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  color: #64748B;
  font-weight: 600;
  flex-wrap: wrap;
}

.theory-card-note {
  font-size: 0.8rem;
  color: #334155;
  margin: 0;
  line-height: 1.45;
}

.disparity-flow-box {
  background: #FFF1F2;
  border: 1px solid #FECDD3;
  border-radius: 8px;
  padding: 0.85rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.flow-node {
  font-size: 0.75rem;
  font-weight: 700;
  background: #FFFFFF;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  border: 1px solid #FDA4AF;
  color: #9F1239;
}

.flow-node.high {
  color: #047857;
  border-color: #A7F3D0;
  background: #ECFDF5;
}

.flow-arrow {
  color: #E11D48;
  font-weight: 800;
}

.split-outcome {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.badge-3t {
  font-size: 0.7rem;
  font-weight: 700;
  color: #DC2626;
  background: #FFFFFF;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
}

.badge-urban {
  font-size: 0.7rem;
  font-weight: 700;
  color: #15803D;
  background: #FFFFFF;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
}

.gap-result {
  font-size: 0.725rem;
  font-weight: 800;
  color: #9F1239;
  display: block;
  margin-top: 0.25rem;
}

.roadmap-card {
  padding: 1.35rem 1.5rem;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: var(--radius-lg, 12px);
  margin-bottom: 1.5rem;
}

.roadmap-header {
  margin-bottom: 1.15rem;
}

.badge-tag-line {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.35rem;
}

.roadmap-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 0.25rem 0;
}

.roadmap-desc {
  font-size: 0.85rem;
  color: #64748B;
  margin: 0;
}

.timeline-steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.step-card {
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
  background: #F8FAFC;
  display: flex;
  flex-direction: column;
}

.step-card.done {
  border-color: #BFDBFE;
  background: #F0F9FF;
}

.step-card.in-progress {
  border-color: #FEF08A;
  background: #FEFCE8;
  border-width: 2px;
}

.step-card.prototype {
  border-color: #E2E8F0;
  background: #F8FAFC;
}

.step-badge {
  font-size: 0.675rem;
  font-weight: 800;
  color: #64748B;
  margin-bottom: 0.25rem;
}

.step-title {
  font-size: 0.875rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 0.35rem 0;
}

.step-p {
  font-size: 0.775rem;
  color: #475569;
  line-height: 1.45;
  margin-bottom: 0.75rem;
  flex: 1;
}

.step-status {
  font-size: 0.7rem;
  font-weight: 700;
  color: #0369A1;
}

.step-status.yellow {
  color: #B45309;
}

.candidate-formula-card {
  padding: 1.5rem;
  background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%);
  border: 2px solid #FCD34D;
  border-radius: var(--radius-lg, 12px);
  margin-bottom: 1.5rem;
}

.candidate-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.candidate-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #78350F;
  margin: 0.25rem 0 0 0;
}

.candidate-note-pill {
  font-size: 0.725rem;
  font-weight: 700;
  color: #92400E;
  background: #FDE68A;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  border: 1px solid #F59E0B;
}

.formula-candidate-box {
  background: #FFFFFF;
  border: 1px solid #FDE68A;
  border-radius: 10px;
  padding: 1.25rem;
  margin-bottom: 0.85rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.03);
}

.math-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  font-family: monospace;
  font-size: 1.05rem;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 1rem;
}

.math-chunk {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem 0.65rem;
  border-radius: 6px;
}

.chunk-reward { background: #EFF6FF; border: 1px solid #BFDBFE; color: #1E3A8A; }
.chunk-explore { background: #F3E8FF; border: 1px solid #DDD6FE; color: #6B21A8; }
.chunk-disparity { background: #FEF2F2; border: 1px solid #FECDD3; color: #9F1239; }

.sub-label {
  font-size: 0.65rem;
  font-weight: 600;
  font-family: sans-serif;
  color: #64748B;
  margin-top: 0.25rem;
}

.op {
  font-size: 1.2rem;
  color: #64748B;
}

.decision-rule-row {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  border-top: 1px dashed #E2E8F0;
  padding-top: 0.75rem;
  font-family: monospace;
  font-size: 0.875rem;
  font-weight: 700;
  color: #1E293B;
}

.candidate-disclaimer {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.6);
  padding: 0.75rem 1rem;
  border-radius: 8px;
}

.disc-icon { font-size: 1rem; }
.disc-text { font-size: 0.8rem; color: #78350F; margin: 0; line-height: 1.45; }

.scenarios-comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
}

@media (max-width: 850px) {
  .scenarios-comparison-grid {
    grid-template-columns: 1fr;
  }
}

.scenario-box {
  padding: 1.25rem;
  background: #FFFFFF;
  border-radius: var(--radius-lg, 12px);
  border: 1px solid #E2E8F0;
}

.scenario-box.border-slate { border-left: 5px solid #64748B; }
.scenario-box.border-emerald { border-left: 5px solid #10B981; }

.scenario-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.85rem;
}

.scenario-tag {
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.scenario-tag.slate { background: #F1F5F9; color: #475569; }
.scenario-tag.emerald { background: #D1FAE5; color: #047857; }

.scenario-type {
  font-size: 0.8rem;
  font-weight: 700;
  color: #0F172A;
}

.scenario-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

.s-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #F8FAFC;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #E2E8F0;
}

.s-val {
  font-size: 1.15rem;
  font-weight: 800;
}

.s-lbl {
  font-size: 0.65rem;
  color: #64748B;
  font-weight: 600;
  margin-top: 0.15rem;
  text-align: center;
}

.scenario-gap-bar {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.775rem;
  text-align: center;
}

.bg-red-light { background: #FEF2F2; color: #991B1B; border: 1px solid #F87171; }
.bg-green-light { background: #ECFDF5; color: #065F46; border: 1px solid #34D399; }

.tradeoff-table-wrapper {
  overflow-x: auto;
}

.tradeoff-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.825rem;
}

.tradeoff-table th, .tradeoff-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #E2E8F0;
}

.tradeoff-table th {
  background: #F8FAFC;
  font-weight: 700;
  color: #334155;
}

.tradeoff-table .highlight-row {
  background: #F0FDF4;
  font-weight: 700;
}

.badge-tbl {
  font-family: monospace;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  background: #F1F5F9;
  color: #0F172A;
}

.bg-red-pill { background: #FEE2E2; color: #DC2626; }
.bg-green-pill { background: #D1FAE5; color: #059669; }
</style>
