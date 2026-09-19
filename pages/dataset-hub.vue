<template>
  <div class="app-container">
    <!-- Navbar Header -->
    <Navbar />

    <main id="konten-utama" class="main-content">
      
      <!-- ========================================================================= -->
      <!-- 1. HERO BANNER & RESEARCH COGNITIVE DECK                                  -->
      <!-- ========================================================================= -->
      <section class="hero-banner">
        <div class="hero-content">
          <div class="hero-badge-row">
            <span class="badge badge-emerald">📁 Data & Evidence Layer</span>
            <span class="badge badge-indigo">🏛️ CABA Framework Foundation</span>
            <span class="badge badge-blue">📐 Input to CCBN Engine (Eq. 1–4, 10)</span>
            <span class="badge badge-purple">🛡️ MNAR Missingness Diagnostics</span>
            <span class="badge badge-amber">🎯 S1–S4 Situational States</span>
          </div>

          <h1 class="hero-title">
            CABA Research Data & Evidence Hub
          </h1>
          <p class="hero-subtitle-lead">
            Empirical Foundations for Context-Conditioned Behavioral Analytics
          </p>
          <p class="hero-subtitle">
            Fondasi akuisisi data, telemetri jejak mentah ((X_{i,t})), evidensi perilaku ((B_{i,t})), serta variabel moderator kontekstual enam dimensi ((c_{i,t} = [T, I, O, D, W, S])). Lapisan ini mengisolasi kualitas observabilitas ((q_{i,t})) dan kendala data hilang (*Missing Not At Random*) sebelum diteruskan ke model inferensi non-punitif CCBN di <code class="hero-code-link">/analisis</code>.
          </p>

          <div class="hero-synthetic-warning">
            <span class="warn-icon">ℹ️</span>
            <div>
              <strong>CATATAN DATA PROTOTIPE:</strong> Seluruh metrik numerik, log telemetri, dan stream pada hub ini merupakan <strong>SYNTHETIC PROTOTYPE VALUES — NOT EMPIRICAL RESULTS</strong> untuk pembuktian konsep instrumen riset disertasi.
            </div>
          </div>
        </div>

        <!-- Quick KPI Deck -->
        <div class="hero-kpi-deck">
          <div class="kpi-card">
            <span class="kpi-label">Dimensi Konteks (c)</span>
            <span class="kpi-val text-blue">6D Space</span>
            <span class="kpi-sub">[T, I, O, D, W, S]</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">Traceability Matrix</span>
            <span class="kpi-val text-purple">17 Constructs</span>
            <span class="kpi-sub">Eq. (1) s.d. (11)</span>
          </div>
          <div class="kpi-card highlight">
            <span class="kpi-label">Observability Gate</span>
            <span class="kpi-val text-emerald">MNAR Safe</span>
            <span class="kpi-sub">Non-Punitif q_{i,t}</span>
          </div>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- 2. LIVE PERSONA TELEMETRY SIMULATOR                                       -->
      <!-- ========================================================================= -->
      <section class="card persona-simulator-card">
        <div class="sim-header">
          <div class="sim-title-group">
            <div class="badge-row">
              <span class="badge badge-indigo">⚡ Interactive Telemetry Sandbox</span>
              <span class="badge badge-cyan">Sensing Pipeline</span>
              <span class="badge badge-emerald">Real-Time Synthesis</span>
            </div>
            <h2 class="sim-title">
              Simulasi Akuisisi Sinyal Telemetri & Transformasi Evidensi
            </h2>
            <p class="sim-desc">
              Pilih profil persona ASN di bawah ini untuk melihat bagaimana data mentah ((X_{i,t})), konteks ((c_{i,t})), dan missingness ((m_{i,t}, q_{i,t})) diolah menjadi evidensi perilaku sebelum dikirim ke engine komputasi CCBN:
            </p>
          </div>

          <NuxtLink
            to="/analisis"
            class="btn-open-analisis"
          >
            <span>🧪 Buka Lab CCBN (/analisis) →</span>
          </NuxtLink>
        </div>

        <!-- Persona Selector Pills -->
        <div class="persona-pills-row">
          <button
            type="button"
            v-for="p in personaList"
            :key="p.id"
            @click="activePersonaId = p.id"
            :class="['persona-btn', { active: activePersonaId === p.id }]"
          >
            <span class="p-icon">{{ p.icon }}</span>
            <div class="p-meta">
              <strong class="p-name">{{ p.name }}</strong>
              <span class="p-region">{{ p.region }} • {{ p.infra }}</span>
            </div>
          </button>
        </div>

        <!-- Live Telemetry Telemetry Deck for Active Persona -->
        <div class="telemetry-live-deck">
          
          <!-- Column 1: Context 6D (c) -->
          <div class="live-col col-context">
            <div class="col-head">
              <span class="col-pill pill-blue">1. KONTEKS 6D (c_{i,t})</span>
              <span class="col-eq">Eq. (2)</span>
            </div>
            <div class="metrics-stack">
              <div class="m-row">
                <span class="m-k">Temporal (T):</span>
                <span class="m-v">{{ currentPersona.context.T }}</span>
              </div>
              <div class="m-row">
                <span class="m-k">Infrastruktur (I):</span>
                <span class="m-v">{{ currentPersona.context.I }}</span>
              </div>
              <div class="m-row">
                <span class="m-k">Organisasi (O):</span>
                <span class="m-v">{{ currentPersona.context.O }}</span>
              </div>
              <div class="m-row">
                <span class="m-k">Device (D):</span>
                <span class="m-v">{{ currentPersona.context.D }}</span>
              </div>
              <div class="m-row">
                <span class="m-k">Workload (W):</span>
                <span class="m-v">{{ currentPersona.context.W }}</span>
              </div>
              <div class="m-row">
                <span class="m-k">Spasial Komposit (S):</span>
                <span class="m-v font-bold text-cyan">{{ currentPersona.context.S.toFixed(2) }}</span>
              </div>
            </div>
            <div class="bar-progress-wrap">
              <div class="bar-progress-label">
                <span>Spatial Index S_{i,t}:</span>
                <span>{{ (currentPersona.context.S * 100).toFixed(0) }}%</span>
              </div>
              <div class="bar-progress-track">
                <div class="bar-progress-fill fill-cyan" :style="{ width: (currentPersona.context.S * 100) + '%' }"></div>
              </div>
            </div>
          </div>

          <!-- Column 2: Raw Traces (X) -> Evidence (B) -->
          <div class="live-col col-traces">
            <div class="col-head">
              <span class="col-pill pill-purple">2. JEJAK (X) ➔ EVIDENSI (B)</span>
              <span class="col-eq">Eq. (1)</span>
            </div>
            <div class="metrics-stack">
              <div class="m-row">
                <span class="m-k">Playback Speed:</span>
                <span class="m-v">{{ currentPersona.traces.playbackSpeed }}</span>
              </div>
              <div class="m-row">
                <span class="m-k">Tab Focus Ratio:</span>
                <span class="m-v">{{ currentPersona.traces.tabFocus.toFixed(2) }}</span>
              </div>
              <div class="m-row">
                <span class="m-k">Buffer Stalls:</span>
                <span class="m-v text-rose font-bold">{{ currentPersona.traces.bufferStalls }} kali</span>
              </div>
              <div class="m-row">
                <span class="m-k">Rewind / Revisit:</span>
                <span class="m-v">{{ currentPersona.traces.rewinds }} kali</span>
              </div>
              <div class="m-row">
                <span class="m-k">Dwell Time Efektif:</span>
                <span class="m-v">{{ currentPersona.traces.dwellMinutes }} menit</span>
              </div>
              <div class="m-row highlight-row">
                <span class="m-k">Evidence Score (B_{i,t}):</span>
                <span class="m-v text-emerald font-bold">{{ currentPersona.evidenceB.toFixed(2) }}</span>
              </div>
            </div>
            <div class="bar-progress-wrap">
              <div class="bar-progress-label">
                <span>Observed Evidence B_{i,t}:</span>
                <span>{{ (currentPersona.evidenceB * 100).toFixed(0) }}%</span>
              </div>
              <div class="bar-progress-track">
                <div class="bar-progress-fill fill-emerald" :style="{ width: (currentPersona.evidenceB * 100) + '%' }"></div>
              </div>
            </div>
          </div>

          <!-- Column 3: Observability (m, q) & Situational State -->
          <div class="live-col col-obs">
            <div class="col-head">
              <span class="col-pill pill-amber">3. OBSERVABILITAS (m, q)</span>
              <span class="col-eq">Eq. (3 & 4)</span>
            </div>
            <div class="metrics-stack">
              <div class="m-row">
                <span class="m-k">Missingness (m_{i,t}):</span>
                <span class="m-v" :class="currentPersona.missingnessM > 0.3 ? 'text-amber' : 'text-slate'">
                  {{ (currentPersona.missingnessM * 100).toFixed(0) }}% ({{ currentPersona.missingnessType }})
                </span>
              </div>
              <div class="m-row">
                <span class="m-k">Evidence Quality (q_{i,t}):</span>
                <span class="m-v font-bold text-emerald">{{ currentPersona.qualityQ.toFixed(2) }}</span>
              </div>
              <div class="m-row">
                <span class="m-k">Validity Gate Status:</span>
                <span :class="['gate-badge', currentPersona.gateStatusClass]">
                  {{ currentPersona.gateStatus }}
                </span>
              </div>
              <div class="m-row highlight-row">
                <span class="m-k">Operational State:</span>
                <span class="m-v font-bold text-purple">{{ currentPersona.supportState.code }}: {{ currentPersona.supportState.name }}</span>
              </div>
              <div class="state-action-box">
                <span class="sa-label">Aksi Andragogis Lapangan:</span>
                <span class="sa-text">{{ currentPersona.supportState.action }}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- 3. MATHEMATICAL FORMULAS & EVIDENCE MECHANISM SPECIFICATION               -->
      <!-- ========================================================================= -->
      <section class="card math-spec-card">
        <div class="diagram-head">
          <div class="badge-row">
            <span class="badge badge-indigo">📐 Perumusan Matematis Data</span>
            <span class="badge badge-blue">Persamaan (1) s.d. (4) & (10)</span>
            <span class="badge badge-emerald">Source of Truth: Proposal Rev 2</span>
          </div>
          <h2 class="diagram-title">
            Spesifikasi Matematis: Transformasi Jejak Menjadi Evidensi Teramati
          </h2>
          <p class="diagram-desc">
            Bagaimana lapisan data mengolah vektor konteks, telemetri jejak mentah, degradasi observabilitas, hingga fusi sinyal visual adaptif:
          </p>
        </div>

        <div class="math-grid-2col">
          
          <!-- Box 1: Persamaan (1) & (2) -->
          <div class="math-card">
            <div class="mc-head">
              <span class="stage-pill pill-blue">PERSAMAAN (1) & (2): JEJAK & KONTEKS</span>
              <span class="mc-scope">Input Vektor</span>
            </div>
            
            <div class="math-box math-blue">
              <div class="math-formula-rendered">
                <span class="m-lhs">X<sub class="m-idx">i,t</sub></span>
                <span class="m-sign">=</span>
                <span class="m-bracket">[</span>
                <span class="m-term-box term-blue">T<sub class="m-idx">i,t</sub></span>
                <span class="m-sign">,</span>
                <span class="m-term-box term-blue">D<sub class="m-idx">i,t</sub></span>
                <span class="m-sign">,</span>
                <span class="m-term-box term-blue">C<sub class="m-idx">i,t</sub></span>
                <span class="m-sign">,</span>
                <span class="m-term-box term-blue">K<sub class="m-idx">i,t</sub></span>
                <span class="m-sign">,</span>
                <span class="m-term-box term-blue">A<sub class="m-idx">i,t</sub></span>
                <span class="m-bracket">]</span>
              </div>
              <div class="math-formula-rendered" style="margin-top: 0.6rem;">
                <span class="m-lhs">c<sub class="m-idx">i,t</sub></span>
                <span class="m-sign">=</span>
                <span class="m-bracket">[</span>
                <span class="m-term-box term-purple">T</span>
                <span class="m-sign">,</span>
                <span class="m-term-box term-purple">I</span>
                <span class="m-sign">,</span>
                <span class="m-term-box term-purple">O</span>
                <span class="m-sign">,</span>
                <span class="m-term-box term-purple">D</span>
                <span class="m-sign">,</span>
                <span class="m-term-box term-purple">W</span>
                <span class="m-sign">,</span>
                <span class="m-term-box term-cyan">S</span>
                <span class="m-bracket">]</span>
              </div>
              <div class="math-legend">
                <span class="leg-pill pill-blue-sm"><strong>X<sub>i,t</sub></strong> : Jejak telemetri mentah (waktu, durasi, klik, komplesi, artefak)</span>
                <span class="dot">•</span>
                <span class="leg-pill pill-purple-sm"><strong>c<sub>i,t</sub></strong> : Vektor konteks 6-dimensi pembelajar</span>
              </div>
            </div>
            <p class="mc-note">
              📌 Kuesioner bertindak sebagai instrumen akuisisi konteks (c_{i,t}); sedangkan telemetri LMS mencatat jejak aktivitas (X_{i,t}).
            </p>
          </div>

          <!-- Box 2: Persamaan (3) & (4) -->
          <div class="math-card">
            <div class="mc-head">
              <span class="stage-pill pill-amber">PERSAMAAN (3) & (4): OBSERVABILITAS & KUALITAS</span>
              <span class="mc-scope">MNAR Filter</span>
            </div>

            <div class="math-box math-amber">
              <div class="math-formula-rendered">
                <span class="m-lhs">m<sub class="m-idx">i,t</sub></span>
                <span class="m-sign">=</span>
                <span class="m-term-box term-amber">
                  1 - <span class="m-frac"><span class="m-num">n<sub class="m-idx">obs</sub></span><span class="m-den">n<sub class="m-idx">exp</sub></span></span>
                </span>
                <span class="m-sign">;&nbsp;&nbsp;</span>
                <span class="m-lhs">q<sub class="m-idx">i,t</sub></span>
                <span class="m-sign">=</span>
                <span class="m-term-box term-emerald">
                  1 - m<sub class="m-idx">i,t</sub> - &lambda;&middot;noise
                </span>
              </div>
              <div class="math-legend">
                <span class="leg-pill pill-amber-sm"><strong>m<sub>i,t</sub></strong> : Missingness akibat kendala observabilitas telemetri</span>
                <span class="dot">•</span>
                <span class="leg-pill pill-emerald-sm"><strong>q<sub>i,t</sub></strong> : Indeks keandalan data evidensi</span>
              </div>
            </div>
            <p class="mc-note">
              🛡️ Nilai (m_{i,t}) tinggi pada wilayah 3T diklasifikasikan sebagai MNAR (sinyal padam), bukan kegagalan atau defisit motivasi peserta.
            </p>
          </div>

        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- 4. SUB-TABS NAVIGATION DECK (6 TABS)                                      -->
      <!-- ========================================================================= -->
      <section class="card tabs-controller-card">
        
        <!-- Segmented Tab Navigation -->
        <div class="nav-tabs-segmented">
          <button
            type="button"
            v-for="t in mainHubTabs"
            :key="t.id"
            @click="activeTab = t.id"
            :class="['tab-seg-btn', { active: activeTab === t.id }]"
          >
            <span class="tab-icon">{{ t.icon }}</span>
            <span class="tab-label">{{ t.label }}</span>
            <span class="tab-badge">{{ t.badge }}</span>
          </button>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 1: 6-CATEGORY DATA TAXONOMY                                           -->
        <!-- ========================================================================= -->
        <div v-if="activeTab === 'taxonomy'" class="tab-pane-content">
          <div class="pane-header">
            <div>
              <span class="sub-pill pill-blue">DATA TAXONOMY</span>
              <h3 class="pane-title">Klasifikasi 6 Kategori Sumber Data Riset CABA–CCBN</h3>
              <p class="pane-desc">Struktur formal pembagian data mentah, bukti, konteks, observabilitas, dan sinyal pendukung:</p>
            </div>
          </div>

          <div class="taxonomy-cards-grid">
            
            <!-- Category A -->
            <div class="tax-card card-blue">
              <div class="tc-top">
                <span class="tc-tag tag-blue">KATEGORI A</span>
                <span class="tc-eq">Persamaan (2)</span>
              </div>
              <h4 class="tc-title">🌐 Context Data ((c_{i,t}))</h4>
              <p class="tc-p">Vektor 6-dimensi (c_{i,t} = [T, I, O, D, W, S]) yang mengondisikan lingkungan nyata pembelajaran ASN.</p>
              <ul class="tc-list">
                <li>• <strong>Temporal (T):</strong> Jam kerja vs malam</li>
                <li>• <strong>Infrastruktur (I):</strong> Bandwidth & stabilitas</li>
                <li>• <strong>Organisasi (O):</strong> Dukungan instansi</li>
                <li>• <strong>Device (D):</strong> HP, laptop, desktop</li>
                <li>• <strong>Workload (W):</strong> Beban kedinasan</li>
                <li>• <strong>Spatial (S):</strong> Indeks komposit spasial</li>
              </ul>
              <div class="tc-callout callout-blue">
                📌 Instrumen kuesioner adalah akuisisi konteks; bukan model inferensi itu sendiri.
              </div>
            </div>

            <!-- Category B -->
            <div class="tax-card card-purple">
              <div class="tc-top">
                <span class="tc-tag tag-purple">KATEGORI B</span>
                <span class="tc-eq">Persamaan (1)</span>
              </div>
              <h4 class="tc-title">⚡ Raw Traces ((X_{i,t}))</h4>
              <p class="tc-p">Jejak telemetri mentah (X_{i,t} = [T, D, C, K, A]) dari interaksi platform e-learning.</p>
              <ul class="tc-list">
                <li>• <strong>Sesi Login:</strong> Frekuensi & durasi akses</li>
                <li>• <strong>Clickstream:</strong> Pola navigasi materi</li>
                <li>• <strong>Video Logs:</strong> Kecepatan, jeda, checkpoint</li>
                <li>• <strong>Kuis/Tugas:</strong> Nilai & submission time</li>
              </ul>
              <div class="tc-callout callout-purple">
                📌 Jejak mentah adalah telemetri bukti; bukan vonis mutlak motivasi peserta.
              </div>
            </div>

            <!-- Category C -->
            <div class="tax-card card-emerald">
              <div class="tc-top">
                <span class="tc-tag tag-emerald">KATEGORI C</span>
                <span class="tc-eq">B_{i,t} Evidence</span>
              </div>
              <h4 class="tc-title">🎯 Behavioral Evidence ((B_{i,t}))</h4>
              <p class="tc-p">Evidensi komposit teramati hasil pemetaan jejak mentah sebagai bukti keterlibatan substantif.</p>
              <ul class="tc-list">
                <li>• <strong>Bukan Engagement Tunggal:</strong> Bukti belajar terdistribusi</li>
                <li>• <strong>Revisits & Quizzes:</strong> Pengulangan dan pengujian pemahaman</li>
                <li>• <strong>Multimodal Activity:</strong> Fusi interaksi LMS yang terverifikasi</li>
              </ul>
              <div class="tc-callout callout-emerald">
                📌 Evidensi (B_{i,t}) siap dibandingkan dengan baseline wajar (b̂_{i,t}) di CCBN.
              </div>
            </div>

            <!-- Category D -->
            <div class="tax-card card-amber">
              <div class="tc-top">
                <span class="tc-tag tag-amber">KATEGORI D</span>
                <span class="tc-eq">Persamaan (3 & 4)</span>
              </div>
              <h4 class="tc-title">🛡️ Observability & Missingness</h4>
              <p class="tc-p">Evaluasi keteramatan (m_{i,t} = 1 - (n_{obs}/n_{exp})) dan indeks kualitas (q_{i,t}).</p>
              <ul class="tc-list">
                <li>• <strong>Batas Observasi (m):</strong> Data hilang akibat sinyal/pemadaman (MNAR)</li>
                <li>• <strong>Kualitas Evidensi (q):</strong> Diskon reliabilitas sinyal</li>
                <li>• <strong>Non-Punitif:</strong> Mencegah atribusi salah pada ASN daerah 3T</li>
              </ul>
              <div class="tc-callout callout-amber">
                📌 Memicu *Baseline Validity Gate* (Eq. 18) untuk integritas rekomendasi.
              </div>
            </div>

            <!-- Category E -->
            <div class="tax-card card-cyan">
              <div class="tc-top">
                <span class="tc-tag tag-cyan">KATEGORI E</span>
                <span class="tc-eq">Persamaan (2a, 2b, 2c)</span>
              </div>
              <h4 class="tc-title">🗺️ Spatial Moderator ((S_{i,t}))</h4>
              <p class="tc-p">Penggabungan klaster makro (K_i) dan jaringan sesi (N_{i,t}): (S_{i,t} = delta K_i + (1-delta) N_{i,t}).</p>
              <ul class="tc-list">
                <li>• <strong>Klaster Makro (K):</strong> BPS / Podes sinyal desa</li>
                <li>• <strong>Sesi Jaringan (N):</strong> Latensi riil, retry, buffering</li>
                <li>• <strong>Grouping (g ∈ G):</strong> 3T vs Urban adalah ilustrasi riset keadilan</li>
              </ul>
              <div class="tc-callout callout-cyan">
                📌 Spasial adalah variabel moderator lingkungan; bukan pengganti model CCBN.
              </div>
            </div>

            <!-- Category F -->
            <div class="tax-card card-rose">
              <div class="tc-top">
                <span class="tc-tag tag-rose">KATEGORI F</span>
                <span class="tc-eq">Persamaan (10 & 10a)</span>
              </div>
              <h4 class="tc-title">👁️ Supporting Visual Signals</h4>
              <p class="tc-p">Sinyal kamera on-device sebagai pendukung observabilitas berbobot sigmoid (w(S, q_{vis})).</p>
              <ul class="tc-list">
                <li>• <strong>Bobot Sigmoid:</strong> w mengecil saat sinyal 3T atau kamera redup</li>
                <li>• <strong>Fusi Terbatas:</strong> (F_{i,t} = w V_{i,t} + (1-w) b_{LMS})</li>
                <li>• <strong>Fallback Aman:</strong> LMS telemetry tetap berjalan jika kamera mati</li>
              </ul>
              <div class="tc-callout callout-rose">
                📌 Visual hanya sinyal pendukung, bukan vonis mutlak kelulusan atau kepribadian.
              </div>
            </div>

          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 2: PROPOSAL ↔ DATASET TRACEABILITY MATRIX                             -->
        <!-- ========================================================================= -->
        <div v-if="activeTab === 'traceability'" class="tab-pane-content">
          <div class="pane-header flex-between">
            <div>
              <span class="sub-pill pill-emerald">TRACEABILITY MATRIX</span>
              <h3 class="pane-title">Matriks Keterlacakan Proposal Disertasi Revisi 2 ↔ Dataset</h3>
              <p class="pane-desc">Pemetaan formal 17 konstruk matematis terhadap variabel telemetri dan destinasi aplikasi:</p>
            </div>

            <div class="filter-pills-row">
              <button
                type="button"
                v-for="c in ['All', 'Context', 'Evidence', 'Observability', 'Spatial', 'Decision']"
                :key="c"
                @click="traceFilter = c"
                :class="['filter-btn', { active: traceFilter === c }]"
              >
                {{ c }}
              </button>
            </div>
          </div>

          <div class="table-wrap">
            <table class="benchmark-table">
              <thead>
                <tr>
                  <th>Konstruk Proposal</th>
                  <th>Persamaan</th>
                  <th>Sumber Data</th>
                  <th>Variabel Kunci</th>
                  <th>Peran dalam Arsitektur</th>
                  <th>Destinasi Komputasi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="t in filteredTraceabilityList" :key="t.equation + t.construct">
                  <td><strong>{{ t.construct }}</strong></td>
                  <td><span class="eq-pill">{{ t.equation }}</span></td>
                  <td>{{ t.dataSource }}</td>
                  <td><code class="code-sm">{{ t.variables }}</code></td>
                  <td>{{ t.role }}</td>
                  <td><span class="dest-pill">{{ t.destination }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 3: DATASET STREAMS & TELEMETRY LOGS                                   -->
        <!-- ========================================================================= -->
        <div v-if="activeTab === 'streams'" class="tab-pane-content">
          <div class="pane-header flex-between">
            <div>
              <span class="sub-pill pill-purple">DATA STREAMS & LOGS</span>
              <h3 class="pane-title">Katalog Log Telemetri & Data Stream Operasional</h3>
              <p class="pane-desc">Eksplorasi sampel data terstruktur yang dapat diekspor untuk verifikasi replikasi:</p>
            </div>

            <div class="export-btns-row">
              <button type="button" @click="exportCurrentDatasetCSV" class="btn-export">📥 Unduh CSV</button>
              <button type="button" @click="exportCurrentDatasetJSON" class="btn-export">📋 Unduh JSON</button>
            </div>
          </div>

          <!-- Stream Selector Cards -->
          <div class="stream-selector-grid">
            <button
              type="button"
              v-for="s in cabaDatasetStreams"
              :key="s.id"
              @click="selectedStreamId = s.id"
              :class="['stream-card-btn', { active: selectedStreamId === s.id }]"
            >
              <span class="s-icon">{{ s.icon }}</span>
              <strong class="s-title">{{ s.title }}</strong>
              <span class="s-file">{{ s.filename }}</span>
            </button>
          </div>

          <div class="stream-details-bar">
            <p><strong>Deskripsi Stream:</strong> {{ currentActiveStreamObj.description }}</p>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Cari dalam stream..."
              class="search-input"
            />
          </div>

          <div class="table-wrap">
            <table class="benchmark-table">
              <thead>
                <tr>
                  <th v-for="c in currentActiveStreamObj.columns" :key="c">{{ c }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, idx) in filteredStreamRows" :key="idx">
                  <td v-for="c in currentActiveStreamObj.columns" :key="c">{{ row[c] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 4: OPERATIONAL SUPPORT STATES (S1 TO S4)                              -->
        <!-- ========================================================================= -->
        <!-- ========================================================================= -->
        <!-- TAB 4: OPERATIONAL SUPPORT STATES (S1 TO S4)                              -->
        <!-- ========================================================================= -->
        <div v-if="activeTab === 'states'" class="tab-pane-content">
          <div class="pane-header">
            <div>
              <span class="sub-pill pill-amber">ANDRAGOGIC STATES & SURVEY MAPPING</span>
              <h3 class="pane-title">Pemetaan Butir Kuesioner Konteks (c_{i,t}) ➔ 4 Status Situasional (S1–S4)</h3>
              <p class="pane-desc">
                Bagaimana jawaban instrumen kuesioner profil peserta mengondisikan aktivasi status operasional lapangan untuk mencegah kesalahan atribusi (*attribution error*):
              </p>
            </div>
          </div>

          <!-- Prominent Questionnaire ➔ S1-S4 Mapping Table -->
          <div class="table-wrap" style="box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            <table class="benchmark-table">
              <thead>
                <tr style="background: linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%);">
                  <th style="width: 18%;">Status Situasional</th>
                  <th style="width: 25%;">Butir Kuesioner Pemicu (c_{i,t})</th>
                  <th style="width: 22%;">Pola Telemetri Jejak (X_{i,t})</th>
                  <th style="width: 20%;">Aksi Adaptif Andragogis</th>
                  <th style="width: 15%;">Mekanisme Epistemik</th>
                </tr>
              </thead>
              <tbody>
                <!-- S1 Row -->
                <tr style="background: rgba(239, 246, 255, 0.3);">
                  <td>
                    <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                      <span class="sc-code" style="background: #1D4ED8; width: fit-content;">S1: Low-Engagement Risk</span>
                      <strong style="color: #1E40AF; font-size: 0.775rem;">Risiko Atensi Murni</strong>
                    </div>
                  </td>
                  <td>
                    <ul style="margin: 0; padding-left: 1rem; font-size: 0.725rem; color: #334155; line-height: 1.4;">
                      <li>• Dukungan pimpinan tinggi (<strong>O</strong>)</li>
                      <li>• Koneksi internet lancar / stabil (<strong>I</strong>)</li>
                      <li>• Beban kerja dinas rendah (<strong>W</strong>)</li>
                    </ul>
                  </td>
                  <td>
                    <div style="font-size: 0.725rem; color: #475569;">
                      Kecepatan video <strong>2.0x</strong>, tab-focus rendah (<strong>&lt; 0.30</strong>), zero rewind, kuis formatif rendah.
                    </div>
                  </td>
                  <td>
                    <span class="dest-pill" style="background: #EFF6FF; color: #1D4ED8; border-color: #BFDBFE;">
                      Stop-Gate Verification
                    </span>
                    <p style="font-size: 0.7rem; color: #64748B; margin: 0.25rem 0 0 0;">Kuis konseptual sebelum modul berikutnya.</p>
                  </td>
                  <td>
                    <span style="font-size: 0.7rem; font-weight: 700; color: #1E40AF;">Verifikasi Atensi</span>
                  </td>
                </tr>

                <!-- S2 Row -->
                <tr style="background: rgba(250, 245, 255, 0.3);">
                  <td>
                    <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                      <span class="sc-code" style="background: #7E22CE; width: fit-content;">S2: Office-Hour Learning</span>
                      <strong style="color: #6B21A8; font-size: 0.775rem;">Konflik Jam Dinas</strong>
                    </div>
                  </td>
                  <td>
                    <ul style="margin: 0; padding-left: 1rem; font-size: 0.725rem; color: #334155; line-height: 1.4;">
                      <li>• Waktu akses saat jam kerja dinas (<strong>T</strong>)</li>
                      <li>• Beban tugas kedinasan / pelayanan tinggi (<strong>W</strong>)</li>
                      <li>• Menggunakan PC kantor bersama (<strong>D</strong>)</li>
                    </ul>
                  </td>
                  <td>
                    <div style="font-size: 0.725rem; color: #475569;">
                      Sering *tab-switching* ke aplikasi persuratan/layanan, sesi belajar terpecah-pecah.
                    </div>
                  </td>
                  <td>
                    <span class="dest-pill" style="background: #FAF5FF; color: #7E22CE; border-color: #E9D5FF;">
                      Micro-Chunking (3–5 min)
                    </span>
                    <p style="font-size: 0.7rem; color: #64748B; margin: 0.25rem 0 0 0;">Ringkasan modular + audio background.</p>
                  </td>
                  <td>
                    <span style="font-size: 0.7rem; font-weight: 700; color: #6B21A8;">Akomodasi Tugas</span>
                  </td>
                </tr>

                <!-- S3 Row -->
                <tr style="background: rgba(236, 254, 255, 0.3);">
                  <td>
                    <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                      <span class="sc-code" style="background: #0E7490; width: fit-content;">S3: Cognitive Struggling</span>
                      <strong style="color: #155E75; font-size: 0.775rem;">Kesulitan Pemahaman</strong>
                    </div>
                  </td>
                  <td>
                    <ul style="margin: 0; padding-left: 1rem; font-size: 0.725rem; color: #334155; line-height: 1.4;">
                      <li>• Latar belakang pendidikan non-linier</li>
                      <li>• Materi dinilai rumit / terlalu teoritis</li>
                      <li>• Pengalaman e-learning pemula</li>
                    </ul>
                  </td>
                  <td>
                    <div style="font-size: 0.725rem; color: #475569;">
                      Pengulangan video berulang (*rewinds* tinggi), *dwell time* sangat lama pada paragraf/soal.
                    </div>
                  </td>
                  <td>
                    <span class="dest-pill" style="background: #ECFEFF; color: #0E7490; border-color: #A5F3FC;">
                      Adaptive Scaffolding
                    </span>
                    <p style="font-size: 0.7rem; color: #64748B; margin: 0.25rem 0 0 0;">Infografis, studi kasus instansi, glosarium.</p>
                  </td>
                  <td>
                    <span style="font-size: 0.7rem; font-weight: 700; color: #0E7490;">Bantuan Kognitif</span>
                  </td>
                </tr>

                <!-- S4 Row -->
                <tr style="background: rgba(255, 251, 235, 0.4);">
                  <td>
                    <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                      <span class="sc-code" style="background: #B45309; width: fit-content;">S4: Infrastructural Constraint</span>
                      <strong style="color: #92400E; font-size: 0.775rem;">Kendala Sinyal / Listrik 3T</strong>
                    </div>
                  </td>
                  <td>
                    <ul style="margin: 0; padding-left: 1rem; font-size: 0.725rem; color: #334155; line-height: 1.4;">
                      <li>• Kualitas sinyal buruk / latensi tinggi (<strong>I</strong>)</li>
                      <li>• Wilayah 3T / Kepulauan terpencil (<strong>S</strong>)</li>
                      <li>• Keterbatasan kuota mandiri / sering padam</li>
                    </ul>
                  </td>
                  <td>
                    <div style="font-size: 0.725rem; color: #475569;">
                      *Buffering stalls* tinggi (<strong>&gt; 5x</strong>), paket data *dropped*, durasi memanjang akibat teknis.
                    </div>
                  </td>
                  <td>
                    <span class="dest-pill" style="background: #FFFBEB; color: #B45309; border-color: #FDE68A;">
                      Audio-First &amp; Offline PWA
                    </span>
                    <p style="font-size: 0.7rem; color: #64748B; margin: 0.25rem 0 0 0;">Modul PDF ringkas + sinkronisasi offline.</p>
                  </td>
                  <td>
                    <span style="font-size: 0.7rem; font-weight: 700; color: #B45309;">Fairness (Non-Punitif)</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Section Divider & Heading for Deep-Dive Cards -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.5rem;">
            <h4 style="font-size: 0.875rem; font-weight: 800; color: #1E293B; margin: 0;">
              🔍 Rincian Kartu Spesifikasi Situasional (S1–S4)
            </h4>
            <span style="font-size: 0.725rem; color: #64748B;">4 Status Andragogis Operasional</span>
          </div>

          <div class="states-grid-2col">
            <div
              v-for="s in SITUATED_OPERATIONAL_STATES"
              :key="s.code"
              class="state-card"
            >
              <div class="sc-header">
                <span class="sc-code">{{ s.code }}</span>
                <span class="sc-role">{{ s.role }}</span>
              </div>
              <h4 class="sc-name">{{ s.name }}</h4>

              <div class="sc-triggers">
                <span class="sc-label">Sinyal Pemicu (Triggers):</span>
                <ul>
                  <li v-for="t in s.triggers" :key="t">• {{ t }}</li>
                </ul>
              </div>

              <div class="sc-action">
                <span class="sc-label">Aksi Dukungan Suportif:</span>
                <strong>{{ s.supportAction }}</strong>
              </div>

              <div class="sc-disclaimer">
                <strong>Disclaimer:</strong> {{ s.disclaimer }}
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 5: 4-LAYER CABA ARCHITECTURE DIAGRAM                                  -->
        <!-- ========================================================================= -->
        <div v-if="activeTab === 'lineage'" class="tab-pane-content">
          <div class="pane-header">
            <div>
              <span class="sub-pill pill-blue">RESEARCH LINEAGE</span>
              <h3 class="pane-title">Diagram Arsitektur 4-Layer CABA (Manuskrip JISEBI ➔ Rev 2)</h3>
              <p class="pane-desc">Evolusi dari model analitik awal hingga model matematika CCBN terdisparitas-aware:</p>
            </div>
          </div>

          <div class="lineage-flow-container">
            <div class="l-layer layer-1">
              <span class="l-tag">LAYER 1: SENSING & TELEMETRY</span>
              <h4>EVALUATE MULTIMODAL SIGNALS</h4>
              <p>Temporal • Device • Network • Tab Focus • Playback Speed • Dwell Time</p>
            </div>

            <div class="l-arrow">↓</div>

            <div class="l-grid-3">
              <div class="l-box box-s1">
                <span class="lb-code">S1</span>
                <strong>Low-Engagement Risk</strong>
                <p>Speed 2x • Low Focus ➔ Stop-Gate</p>
              </div>
              <div class="l-box box-s2">
                <span class="lb-code">S2</span>
                <strong>Office-Hour Learning</strong>
                <p>Office Hours • Multi-task ➔ Micro-Chunking</p>
              </div>
              <div class="l-box box-s3">
                <span class="lb-code">S3</span>
                <strong>Cognitive Struggling</strong>
                <p>Rewinds • High Dwell ➔ Scaffolding</p>
              </div>
            </div>

            <div class="l-arrow">↓</div>

            <div class="l-box box-s4">
              <span class="lb-code">S4</span>
              <strong>Infrastructural Constraints (3T Regions)</strong>
              <p>Low Bandwidth • Buffer Stalls ➔ Audio-First Podcast Mode + Offline PWA Caching</p>
            </div>

            <div class="l-arrow">↓</div>

            <div class="l-layer layer-4">
              <span class="l-tag">LAYER 4: EQUITABLE ACCUMULATION</span>
              <h4>ADJUSTED EVIDENCE ACCUMULATION</h4>
              <p>Akumulasi bukti autentik tanpa vonis durasi linear 100%.</p>
            </div>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 6: BIBLIOGRAPHY & BENCHMARK DATASETS                                  -->
        <!-- ========================================================================= -->
        <div v-if="activeTab === 'references'" class="tab-pane-content">
          <div class="pane-header flex-between">
            <div>
              <span class="sub-pill pill-blue">BIBLIOGRAPHY & BENCHMARKS</span>
              <h3 class="pane-title">22 Referensi Manuskrip JISEBI & Benchmark Terbuka</h3>
              <p class="pane-desc">Daftar literatur pendukung kerangka kerja CABA dan repositori data terbuka:</p>
            </div>

            <div class="filter-pills-row">
              <button
                type="button"
                @click="refFilter = 'all'"
                :class="['filter-btn', { active: refFilter === 'all' }]"
              >
                Semua
              </button>
              <button
                type="button"
                v-for="c in refCategories"
                :key="c"
                @click="refFilter = c"
                :class="['filter-btn', { active: refFilter === c }]"
              >
                {{ c }}
              </button>
            </div>
          </div>

          <div class="refs-grid">
            <div
              v-for="r in filteredJisebiReferences"
              :key="r.key"
              class="ref-card"
            >
              <div class="rc-top">
                <span class="rc-key">[{{ r.key }}]</span>
                <span class="rc-cat">{{ r.year }} • {{ r.category }}</span>
              </div>
              <strong class="rc-title">{{ r.title }}</strong>
              <p class="rc-author">{{ r.authors }} ({{ r.source }})</p>
              <div class="rc-rel">
                <strong>Relevansi CABA:</strong> {{ r.relevance }}
              </div>
            </div>
          </div>
        </div>

      </section>

      <!-- ========================================================================= -->
      <!-- 5. BOTTOM CTA TO /analisis                                                -->
      <!-- ========================================================================= -->
      <section class="card cta-jump-card">
        <div class="cta-content">
          <span class="badge badge-emerald">⚡ NEXT COMPUTATIONAL STAGE</span>
          <h2 class="cta-title">Siap Mengeksekusi Estimator CCBN di /analisis?</h2>
          <p class="cta-desc">
            Vektor konteks ((c_{i,t})), evidensi perilaku ((B_{i,t})), dan batas observabilitas ((q_{i,t})) yang telah disiapkan di Data Hub ini siap diumpankan ke model matematika CCBN untuk menghitung ekspektasi baseline wajar ((b̂_{i,t})), residual diagnostik ((d_{i,t})), disparitas wilayah ((D_t)), dan optimasi kebijakan LinUCB di rute <code class="code-sm">/analisis</code>.
          </p>
        </div>
        <NuxtLink to="/analisis" class="btn-cta-main">
          <span>Buka Lab Komputasi CCBN (/analisis) →</span>
        </NuxtLink>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Navbar from '~/components/Navbar.vue';

import {
  CABA_DATASETS_METADATA,
  SITUATED_OPERATIONAL_STATES,
  RESEARCH_LINEAGE_STAGES,
  PROPOSAL_DATASET_TRACEABILITY
} from '~/data/caba';

// Tab list
const mainHubTabs = [
  { id: 'taxonomy', label: '1. Taksonomi Sumber Data', icon: '🗂️', badge: '6 Kategori' },
  { id: 'traceability', label: '2. Matriks Traceability', icon: '🔗', badge: '17 Konstruk' },
  { id: 'streams', label: '3. Data Streams & Logs', icon: '📋', badge: 'Telemetry' },
  { id: 'states', label: '4. Status Situasional S1–S4', icon: '🎯', badge: 'Andragogi' },
  { id: 'lineage', label: '5. Diagram 4-Layer', icon: '🗺️', badge: 'JISEBI Lineage' },
  { id: 'references', label: '6. Referensi & Benchmark', icon: '📚', badge: '22 Papers' }
];

const activeTab = ref<string>('taxonomy');
const traceFilter = ref<string>('All');
const selectedStreamId = ref<string>('telemetry_stream');
const searchQuery = ref<string>('');
const refFilter = ref<string>('all');
const jisebiReferences = ref<any[]>([]);
const loading = ref<boolean>(false);

// Live Simulator Personas
const personaList = [
  {
    id: 'urban_jkt',
    name: 'ASN-0101 (DKI Jakarta)',
    icon: '🏢',
    region: 'Metropolitan',
    infra: 'Fiber 100Mbps',
    context: { T: 'Malam (19:30)', I: 'Tinggi (95 Mbps)', O: 'Sangat Mendukung', D: 'Laptop Dual Monitor', W: 'Sedang', S: 0.88 },
    traces: { playbackSpeed: '2.0x', tabFocus: 0.22, bufferStalls: 0, rewinds: 0, dwellMinutes: 12 },
    evidenceB: 0.82,
    missingnessM: 0.00,
    missingnessType: 'MCAR None',
    qualityQ: 0.98,
    gateStatus: 'VALID (q >= 0.60)',
    gateStatusClass: 'gate-valid',
    supportState: { code: 'S1', name: 'Low-Engagement Risk', action: 'Stop-Gate Verification jika evaluasi formatif rendah' }
  },
  {
    id: 'semi_urban',
    name: 'ASN-0201 (Banyumas)',
    icon: '🏛️',
    region: 'Daratan Jawa',
    infra: '4G LTE 15Mbps',
    context: { T: 'Jam Kantor (10:15)', I: 'Sedang (12 Mbps)', O: 'Mendukung', D: 'PC Kantor Bersama', W: 'Tinggi (Pelayanan)', S: 0.68 },
    traces: { playbackSpeed: '1.25x', tabFocus: 0.65, bufferStalls: 1, rewinds: 1, dwellMinutes: 28 },
    evidenceB: 0.74,
    missingnessM: 0.15,
    missingnessType: 'MAR Low',
    qualityQ: 0.82,
    gateStatus: 'VALID (q >= 0.60)',
    gateStatusClass: 'gate-valid',
    supportState: { code: 'S2', name: 'Office-Hour Learning', action: 'Micro-Chunking 3–5 menit + Audio Background' }
  },
  {
    id: 'natuna_3t',
    name: 'ASN-0401 (Natuna - 3T)',
    icon: '🏝️',
    region: 'Perbatasan Maritim',
    infra: 'Satelit 2Mbps',
    context: { T: 'Sore (16:40)', I: 'Terbatas (1.2 Mbps)', O: 'Sedang', D: 'Smartphone Android 4G', W: 'Tinggi', S: 0.26 },
    traces: { playbackSpeed: '1.0x', tabFocus: 0.88, bufferStalls: 8, rewinds: 0, dwellMinutes: 45 },
    evidenceB: 0.52,
    missingnessM: 0.45,
    missingnessType: 'MNAR Sinyal 3T',
    qualityQ: 0.55,
    gateStatus: 'BOUNDARY (0.40 <= q < 0.60)',
    gateStatusClass: 'gate-boundary',
    supportState: { code: 'S4', name: 'Infrastructural Constraint', action: 'Podcast Audio Mode + Offline PWA Sync' }
  },
  {
    id: 'aru_3t',
    name: 'ASN-0402 (Kep. Aru - 3T)',
    icon: '⛵',
    region: 'Pulau Terluar',
    infra: 'VSAT Sering Padam',
    context: { T: 'Malam (20:10)', I: 'Kritis (0.4 Mbps)', O: 'Terbatas', D: 'Smartphone Entry Level', W: 'Sangat Tinggi', S: 0.21 },
    traces: { playbackSpeed: '1.0x', tabFocus: 0.92, bufferStalls: 14, rewinds: 2, dwellMinutes: 60 },
    evidenceB: 0.42,
    missingnessM: 0.65,
    missingnessType: 'MNAR Pemadaman',
    qualityQ: 0.35,
    gateStatus: 'INVALID (HITL Widyaiswara)',
    gateStatusClass: 'gate-invalid',
    supportState: { code: 'S4', name: 'Severe Offline Mode', action: 'Full Offline PDF Modules + Evaluasi Berbasis Hasil Kerja' }
  }
];

const activePersonaId = ref<string>('natuna_3t');
const currentPersona = computed(() => {
  return personaList.find(p => p.id === activePersonaId.value) || personaList[0];
});

// Traceability Filtered
const filteredTraceabilityList = computed(() => {
  if (traceFilter.value === 'All') return PROPOSAL_DATASET_TRACEABILITY;
  return PROPOSAL_DATASET_TRACEABILITY.filter(t => t.category === traceFilter.value);
});

// Telemetry Streams
const cabaDatasetStreams = [
  {
    id: 'telemetry_stream',
    title: 'Stream 1: Telemetri Sesi & Bukti (B)',
    icon: '📡',
    filename: 'caba_telemetry_evidence_stream.csv',
    description: 'Log telemetri interaksi waktu nyata (playback speed, tab focus, buffering, rewind, dwell time) dengan evidensi perilaku teramati B_{i,t}.',
    columns: ['user_id', 'klaster_wilayah', 'jam_akses', 'kecepatan_video', 'tab_focus_ratio', 'buffer_stalls', 'rewind_count', 'evidence_B', 'evidence_quality_q', 'status_gate'],
    rows: [
      { user_id: 'ASN-0101', klaster_wilayah: 'Urban (DKI Jakarta)', jam_akses: '10:15 WIB', kecepatan_video: '2.0x', tab_focus_ratio: '0.22', buffer_stalls: '0', rewind_count: '0', evidence_B: '0.82', evidence_quality_q: '0.98', status_gate: 'VALID' },
      { user_id: 'ASN-0102', klaster_wilayah: 'Urban (Surabaya)', jam_akses: '14:40 WIB', kecepatan_video: '1.75x', tab_focus_ratio: '0.28', buffer_stalls: '0', rewind_count: '1', evidence_B: '0.85', evidence_quality_q: '0.95', status_gate: 'VALID' },
      { user_id: 'ASN-0201', klaster_wilayah: 'Semi-Urban (Banyumas)', jam_akses: '09:30 WIB', kecepatan_video: '1.0x', tab_focus_ratio: '0.65', buffer_stalls: '1', rewind_count: '0', evidence_B: '0.74', evidence_quality_q: '0.88', status_gate: 'VALID' },
      { user_id: 'ASN-0401', klaster_wilayah: '3T (Kab. Natuna)', jam_akses: '14:20 WIB', kecepatan_video: '1.0x', tab_focus_ratio: '0.88', buffer_stalls: '8', rewind_count: '0', evidence_B: '0.52', evidence_quality_q: '0.62', status_gate: 'BOUNDARY' },
      { user_id: 'ASN-0402', klaster_wilayah: '3T (Kep. Aru)', jam_akses: '16:10 WIT', kecepatan_video: '1.0x', tab_focus_ratio: '0.85', buffer_stalls: '11', rewind_count: '0', evidence_B: '0.45', evidence_quality_q: '0.48', status_gate: 'INVALID (HITL)' }
    ]
  },
  {
    id: 'spatial_weights',
    title: 'Stream 2: Bobot Spasial Komposit (S)',
    icon: '⚖️',
    filename: 'spatial_composite_index_stream.csv',
    description: 'Matriks parameter normalisasi Indeks Spasial Komposit S_{i,t} = δ K_i + (1-δ) N_{i,t} dari data terbuka BPS/Podes dan telemetri jaringan.',
    columns: ['wilayah_id', 'klaster_makro_K', 'network_session_N', 'delta_weight', 'composite_S', 'throughput_kbps', 'latency_ms'],
    rows: [
      { wilayah_id: 'Wilayah Urban / Metropolitan', klaster_makro_K: '0.80', network_session_N: '0.92', delta_weight: '0.35', composite_S: '0.88', throughput_kbps: '8500 kbps', latency_ms: '25 ms' },
      { wilayah_id: 'Wilayah Daratan Sedang', klaster_makro_K: '0.65', network_session_N: '0.70', delta_weight: '0.35', composite_S: '0.68', throughput_kbps: '2500 kbps', latency_ms: '65 ms' },
      { wilayah_id: 'Wilayah Kepulauan Maritim', klaster_makro_K: '0.40', network_session_N: '0.45', delta_weight: '0.35', composite_S: '0.43', throughput_kbps: '450 kbps', latency_ms: '280 ms' },
      { wilayah_id: 'Wilayah 3T / Perbatasan', klaster_makro_K: '0.30', network_session_N: '0.24', delta_weight: '0.35', composite_S: '0.26', throughput_kbps: '110 kbps', latency_ms: '520 ms' }
    ]
  },
  {
    id: 'missingness_log',
    title: 'Stream 3: Missingness (m) & Kualitas (q)',
    icon: '🛡️',
    filename: 'missingness_diagnostics_log.csv',
    description: 'Log evaluasi rasio keteramatan checkpoint dan skor kualitas evidensi q_{i,t} untuk memisahkan MNAR dari kelalaian.',
    columns: ['session_id', 'user_id', 'expected_points', 'observed_points', 'missingness_m', 'noise_level', 'quality_q', 'mcar_test_p'],
    rows: [
      { session_id: 'SES-001', user_id: 'ASN-0101 (Urban)', expected_points: '10', observed_points: '10', missingness_m: '0.00', noise_level: '0.02', quality_q: '0.98', mcar_test_p: 'p > 0.05' },
      { session_id: 'SES-002', user_id: 'ASN-0201 (Daratan)', expected_points: '10', observed_points: '8', missingness_m: '0.20', noise_level: '0.08', quality_q: '0.72', mcar_test_p: 'p < 0.05' },
      { session_id: 'SES-003', user_id: 'ASN-0401 (3T Natuna)', expected_points: '10', observed_points: '5', missingness_m: '0.50', noise_level: '0.22', quality_q: '0.28', mcar_test_p: 'p < 0.01 (MNAR)' },
      { session_id: 'SES-004', user_id: 'ASN-0402 (3T Aru)', expected_points: '10', observed_points: '4', missingness_m: '0.60', noise_level: '0.25', quality_q: '0.15', mcar_test_p: 'p < 0.01 (MNAR)' }
    ]
  }
];

const currentActiveStreamObj = computed(() => {
  return cabaDatasetStreams.find(s => s.id === selectedStreamId.value) || cabaDatasetStreams[0];
});

const filteredStreamRows = computed(() => {
  const stream = currentActiveStreamObj.value;
  let rows = stream.rows;
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    rows = rows.filter(r => Object.values(r).some(val => String(val).toLowerCase().includes(q)));
  }
  return rows;
});

// Exports
const exportCurrentDatasetCSV = () => {
  const stream = currentActiveStreamObj.value;
  const rows = filteredStreamRows.value;
  if (!rows || rows.length === 0) return;
  const headerLine = stream.columns.join(',');
  const rowLines = rows.map(r => stream.columns.map(c => `"${(r[c] || '').replace(/"/g, '""')}"`).join(','));
  const csvContent = 'data:text/csv;charset=utf-8,' + [headerLine, ...rowLines].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', stream.filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const exportCurrentDatasetJSON = () => {
  const stream = currentActiveStreamObj.value;
  const rows = filteredStreamRows.value;
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(rows, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', stream.filename.replace('.csv', '.json'));
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  document.body.removeChild(downloadAnchor);
};

// References
const refCategories = computed(() => {
  const set = new Set<string>();
  jisebiReferences.value.forEach(r => {
    if (r.category) set.add(r.category);
  });
  return Array.from(set);
});

const filteredJisebiReferences = computed(() => {
  if (refFilter.value === 'all') return jisebiReferences.value;
  return jisebiReferences.value.filter(r => r.category === refFilter.value);
});

const fetchDatasetHubData = async () => {
  loading.value = true;
  try {
    const res = await fetch('/api/literature-hunter/dataset-hub?limit=600');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.success) {
      jisebiReferences.value = data.jisebi_manuscript_references || [];
    }
  } catch (e) {
    console.error('Failed to load dataset hub data:', e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDatasetHubData();
});
</script>

<style scoped>
/* App Container & Main Content */
.app-container {
  min-height: 100vh;
  background-color: #F8FAFC;
  color: #0F172A;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.main-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Hero Banner */
.hero-banner {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%);
  border: 1px solid #334155;
  border-radius: 1.25rem;
  padding: 2rem;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

@media (min-width: 1024px) {
  .hero-banner {
    display: grid;
    grid-template-columns: 1fr 320px;
    align-items: center;
    gap: 2rem;
  }
}

.hero-badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.badge {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.badge-emerald { background: rgba(16, 185, 129, 0.15); color: #34D399; border: 1px solid rgba(16, 185, 129, 0.3); }
.badge-indigo { background: rgba(99, 102, 241, 0.15); color: #A5B4FC; border: 1px solid rgba(99, 102, 241, 0.3); }
.badge-blue { background: rgba(59, 130, 246, 0.15); color: #93C5FD; border: 1px solid rgba(59, 130, 246, 0.3); }
.badge-purple { background: rgba(168, 85, 247, 0.15); color: #D8B4FE; border: 1px solid rgba(168, 85, 247, 0.3); }
.badge-amber { background: rgba(245, 158, 11, 0.15); color: #FCD34D; border: 1px solid rgba(245, 158, 11, 0.3); }
.badge-cyan { background: rgba(6, 182, 212, 0.15); color: #67E8F9; border: 1px solid rgba(6, 182, 212, 0.3); }

.hero-title {
  font-size: 1.75rem;
  font-weight: 900;
  letter-spacing: -0.025em;
  margin: 0;
  line-height: 1.2;
}

@media (min-width: 640px) {
  .hero-title { font-size: 2.25rem; }
}

.hero-subtitle-lead {
  font-size: 0.95rem;
  font-weight: 700;
  color: #93C5FD;
  margin-top: 0.35rem;
  margin-bottom: 0.5rem;
}

.hero-subtitle {
  font-size: 0.825rem;
  color: #CBD5E1;
  line-height: 1.6;
  margin: 0;
  max-width: 54rem;
}

.hero-code-link {
  font-family: monospace;
  font-weight: 700;
  color: #34D399;
  background: #020617;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.hero-synthetic-warning {
  margin-top: 1rem;
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.3);
  padding: 0.5rem 0.85rem;
  border-radius: 8px;
  font-size: 0.75rem;
  color: #FDE68A;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  line-height: 1.45;
}

.warn-icon { font-size: 1rem; flex-shrink: 0; }

/* Hero KPI Deck */
.hero-kpi-deck {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.kpi-card {
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid #334155;
  border-radius: 0.875rem;
  padding: 0.85rem 1rem;
  display: flex;
  flex-direction: column;
}

.kpi-card.highlight {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%);
  border-color: rgba(16, 185, 129, 0.4);
}

.kpi-label { font-size: 0.7rem; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.05em; }
.kpi-val { font-size: 1.25rem; font-weight: 900; font-family: 'JetBrains Mono', monospace; margin-top: 0.15rem; }
.kpi-sub { font-size: 0.675rem; color: #64748B; margin-top: 0.15rem; }

.text-blue { color: #60A5FA; }
.text-purple { color: #C084FC; }
.text-emerald { color: #34D399; }
.text-cyan { color: #22D3EE; }
.text-amber { color: #FBBF24; }
.text-rose { color: #FB7185; }

/* General Cards */
.card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
}

/* Simulator Card */
.persona-simulator-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.sim-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .sim-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.sim-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0.35rem 0 0 0;
}

.sim-desc {
  font-size: 0.8rem;
  color: #64748B;
  margin: 0.25rem 0 0 0;
  max-width: 50rem;
}

.btn-open-analisis {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.15rem;
  border-radius: 0.75rem;
  background: #10B981;
  color: #FFFFFF;
  font-size: 0.8rem;
  font-weight: 800;
  text-decoration: none;
  transition: background 0.15s;
  flex-shrink: 0;
}

.btn-open-analisis:hover {
  background: #059669;
}

.persona-pills-row {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.65rem;
}

@media (min-width: 640px) {
  .persona-pills-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .persona-pills-row {
    grid-template-columns: repeat(4, 1fr);
  }
}

.persona-btn {
  background: #F8FAFC;
  border: 1.5px solid #E2E8F0;
  border-radius: 0.875rem;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s;
}

.persona-btn:hover {
  background: #F1F5F9;
  border-color: #CBD5E1;
}

.persona-btn.active {
  background: #EFF6FF;
  border-color: #3B82F6;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.15);
}

.p-icon { font-size: 1.5rem; flex-shrink: 0; }
.p-meta { display: flex; flex-direction: column; overflow: hidden; }
.p-name { font-size: 0.775rem; font-weight: 800; color: #1E293B; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
.p-region { font-size: 0.675rem; color: #64748B; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }

/* Live Telemetry Deck */
.telemetry-live-deck {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 1024px) {
  .telemetry-live-deck {
    grid-template-columns: repeat(3, 1fr);
  }
}

.live-col {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 1rem;
  padding: 1.15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
}

.col-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #E2E8F0;
  padding-bottom: 0.65rem;
}

.col-pill {
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
}

.pill-blue { background: #DBEAFE; color: #1D4ED8; }
.pill-purple { background: #F3E8FF; color: #7E22CE; }
.pill-amber { background: #FEF3C7; color: #B45309; }
.pill-emerald { background: #D1FAE5; color: #047857; }
.pill-cyan { background: #CFFAFE; color: #0E7490; }

.col-eq {
  font-size: 0.7rem;
  font-weight: 700;
  font-family: monospace;
  color: #64748B;
}

.metrics-stack {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.m-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.775rem;
  padding: 0.25rem 0;
  border-bottom: 1px dashed #E2E8F0;
}

.m-row.highlight-row {
  background: #FFFFFF;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  border: 1px solid #E2E8F0;
  margin-top: 0.25rem;
}

.m-k { color: #64748B; font-weight: 600; }
.m-v { font-weight: 700; color: #1E293B; font-family: 'JetBrains Mono', monospace; }

.bar-progress-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background: #FFFFFF;
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
}

.bar-progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  font-weight: 700;
  color: #475569;
}

.bar-progress-track {
  height: 6px;
  background: #E2E8F0;
  border-radius: 9999px;
  overflow: hidden;
}

.bar-progress-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.3s ease;
}

.fill-cyan { background: #06B6D4; }
.fill-emerald { background: #10B981; }

.gate-badge {
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.gate-valid { background: #D1FAE5; color: #065F46; }
.gate-boundary { background: #FEF3C7; color: #92400E; }
.gate-invalid { background: #FEE2E2; color: #991B1B; }

.state-action-box {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 0.5rem 0.65rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: 0.35rem;
}

.sa-label { font-size: 0.65rem; font-weight: 800; color: #64748B; text-transform: uppercase; }
.sa-text { font-size: 0.75rem; font-weight: 700; color: #047857; }

/* Math Spec Card */
.math-spec-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.diagram-head {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.diagram-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0.25rem 0 0 0;
}

.diagram-desc {
  font-size: 0.8rem;
  color: #64748B;
  margin: 0;
}

.math-grid-2col {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 1024px) {
  .math-grid-2col {
    grid-template-columns: repeat(2, 1fr);
  }
}

.math-card {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 1rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.mc-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stage-pill {
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
}

.mc-scope { font-size: 0.7rem; font-weight: 700; color: #64748B; }

.math-box {
  background: #FFFFFF;
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid #E2E8F0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.math-blue { border-left: 4px solid #3B82F6; }
.math-amber { border-left: 4px solid #F59E0B; }

.math-formula-rendered {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem;
  color: #0F172A;
}

.m-lhs { font-weight: 800; color: #1E293B; }
.m-sign { color: #64748B; font-weight: 700; }
.m-bracket { color: #94A3B8; font-weight: 800; }

.m-term-box {
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-weight: 700;
}

.term-blue { background: #EFF6FF; color: #1D4ED8; border: 1px solid #BFDBFE; }
.term-purple { background: #FAF5FF; color: #7E22CE; border: 1px solid #E9D5FF; }
.term-cyan { background: #ECFEFF; color: #0E7490; border: 1px solid #A5F3FC; }
.term-amber { background: #FFFBEB; color: #B45309; border: 1px solid #FDE68A; }
.term-emerald { background: #ECFDF5; color: #047857; border: 1px solid #A7F3D0; }

.math-legend {
  font-size: 0.7rem;
  color: #64748B;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  border-top: 1px dashed #E2E8F0;
  padding-top: 0.5rem;
}

.leg-pill { padding: 0.1rem 0.4rem; border-radius: 4px; }
.pill-blue-sm { background: #EFF6FF; color: #1E40AF; }
.pill-purple-sm { background: #FAF5FF; color: #6B21A8; }
.pill-amber-sm { background: #FFFBEB; color: #92400E; }
.pill-emerald-sm { background: #ECFDF5; color: #065F46; }

.dot { color: #CBD5E1; }
.mc-note { font-size: 0.75rem; color: #475569; line-height: 1.45; margin: 0; }

/* Tabs Controller Card */
.tabs-controller-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.nav-tabs-segmented {
  display: flex;
  gap: 0.5rem;
  background: #F1F5F9;
  padding: 0.35rem;
  border-radius: 0.875rem;
  overflow-x: auto;
}

.tab-seg-btn {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.6rem 1rem;
  border-radius: 0.65rem;
  border: none;
  background: transparent;
  color: #475569;
  font-size: 0.775rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
}

.tab-seg-btn:hover {
  color: #0F172A;
  background: rgba(255, 255, 255, 0.5);
}

.tab-seg-btn.active {
  background: #FFFFFF;
  color: #0F172A;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.tab-badge {
  font-size: 0.65rem;
  font-weight: 800;
  background: #E2E8F0;
  color: #475569;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.tab-seg-btn.active .tab-badge {
  background: #EFF6FF;
  color: #1D4ED8;
}

/* Tab Pane Contents */
.tab-pane-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.pane-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.pane-header.flex-between {
  flex-direction: column;
  gap: 0.75rem;
}

@media (min-width: 768px) {
  .pane-header.flex-between {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
}

.sub-pill {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 0.25rem;
}

.pane-title { font-size: 1.15rem; font-weight: 800; color: #0F172A; margin: 0; }
.pane-desc { font-size: 0.775rem; color: #64748B; margin: 0; }

/* Taxonomy Cards Grid */
.taxonomy-cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .taxonomy-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .taxonomy-cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.tax-card {
  background: #F8FAFC;
  border: 1.5px solid #E2E8F0;
  border-radius: 1rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.85rem;
}

.tc-top { display: flex; justify-content: space-between; align-items: center; }
.tc-tag { font-size: 0.65rem; font-weight: 800; padding: 0.15rem 0.5rem; border-radius: 4px; }
.tag-blue { background: #DBEAFE; color: #1E40AF; }
.tag-purple { background: #F3E8FF; color: #6B21A8; }
.tag-emerald { background: #D1FAE5; color: #065F46; }
.tag-amber { background: #FEF3C7; color: #92400E; }
.tag-cyan { background: #CFFAFE; color: #155E75; }
.tag-rose { background: #FFE4E6; color: #9F1239; }

.tc-eq { font-size: 0.7rem; font-weight: 700; font-family: monospace; color: #64748B; }
.tc-title { font-size: 0.95rem; font-weight: 800; color: #0F172A; margin: 0; }
.tc-p { font-size: 0.75rem; color: #475569; line-height: 1.45; margin: 0; }

.tc-list {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 0.65rem 0.85rem;
  font-size: 0.725rem;
  color: #334155;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0;
  list-style: none;
}

.tc-callout {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1.4;
}

.callout-blue { background: #EFF6FF; color: #1E40AF; border: 1px solid #BFDBFE; }
.callout-purple { background: #FAF5FF; color: #6B21A8; border: 1px solid #E9D5FF; }
.callout-emerald { background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; }
.callout-amber { background: #FFFBEB; color: #92400E; border: 1px solid #FDE68A; }
.callout-cyan { background: #ECFEFF; color: #155E75; border: 1px solid #A5F3FC; }
.callout-rose { background: #FFF1F2; color: #9F1239; border: 1px solid #FECDD3; }

/* Filter Buttons Row */
.filter-pills-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.filter-btn {
  background: #F1F5F9;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 0.35rem 0.65rem;
  font-size: 0.725rem;
  font-weight: 700;
  color: #475569;
  cursor: pointer;
}

.filter-btn.active {
  background: #0F172A;
  color: #FFFFFF;
  border-color: #0F172A;
}

/* Benchmark Table */
.table-wrap {
  overflow-x: auto;
  border: 1px solid #E2E8F0;
  border-radius: 0.875rem;
}

.benchmark-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.775rem;
}

.benchmark-table th, .benchmark-table td {
  padding: 0.65rem 0.85rem;
  border-bottom: 1px solid #E2E8F0;
  text-align: left;
}

.benchmark-table th {
  background: #F8FAFC;
  font-weight: 800;
  color: #334155;
  white-space: nowrap;
}

.eq-pill {
  font-family: monospace;
  font-weight: 700;
  background: #EFF6FF;
  color: #1D4ED8;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  border: 1px solid #BFDBFE;
}

.dest-pill {
  font-family: monospace;
  font-weight: 700;
  background: #ECFDF5;
  color: #047857;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  border: 1px solid #A7F3D0;
}

.code-sm {
  font-family: monospace;
  font-size: 0.725rem;
  color: #475569;
}

/* Streams & Logs */
.export-btns-row { display: flex; gap: 0.5rem; }
.btn-export {
  background: #F8FAFC;
  border: 1px solid #CBD5E1;
  border-radius: 6px;
  padding: 0.35rem 0.75rem;
  font-size: 0.725rem;
  font-weight: 700;
  color: #334155;
  cursor: pointer;
}
.btn-export:hover { background: #F1F5F9; }

.stream-selector-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.65rem;
}

@media (min-width: 640px) {
  .stream-selector-grid { grid-template-columns: repeat(3, 1fr); }
}

.stream-card-btn {
  background: #F8FAFC;
  border: 1.5px solid #E2E8F0;
  border-radius: 0.875rem;
  padding: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: left;
  cursor: pointer;
}

.stream-card-btn.active {
  background: #EFF6FF;
  border-color: #3B82F6;
}

.s-icon { font-size: 1.25rem; }
.s-title { font-size: 0.8rem; color: #0F172A; }
.s-file { font-size: 0.675rem; font-family: monospace; color: #64748B; }

.stream-details-bar {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 0.65rem 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #334155;
}

@media (min-width: 768px) {
  .stream-details-bar {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.search-input {
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  border: 1px solid #CBD5E1;
  font-size: 0.725rem;
  width: 14rem;
}

/* S1-S4 States Grid */
.states-grid-2col {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .states-grid-2col { grid-template-columns: repeat(2, 1fr); }
}

.state-card {
  background: #F8FAFC;
  border: 1.5px solid #E2E8F0;
  border-radius: 1rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sc-header { display: flex; justify-content: space-between; align-items: center; }
.sc-code { font-size: 0.75rem; font-weight: 900; background: #0F172A; color: #FFFFFF; padding: 0.2rem 0.55rem; border-radius: 6px; }
.sc-role { font-size: 0.725rem; font-weight: 700; color: #64748B; }
.sc-name { font-size: 0.95rem; font-weight: 800; color: #0F172A; margin: 0; }

.sc-triggers {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 0.65rem;
  font-size: 0.725rem;
}

.sc-triggers ul { margin: 0.25rem 0 0 0; padding-left: 0; list-style: none; color: #475569; }

.sc-action {
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  border-radius: 6px;
  padding: 0.65rem;
  font-size: 0.725rem;
  color: #065F46;
}

.sc-label { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: #64748B; display: block; margin-bottom: 0.15rem; }
.sc-disclaimer { font-size: 0.675rem; color: #92400E; background: #FEF3C7; padding: 0.4rem 0.6rem; border-radius: 6px; }

/* Lineage Flow Container */
.lineage-flow-container {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.l-layer {
  width: 100%;
  max-width: 42rem;
  background: #FFFFFF;
  border: 2px solid #334155;
  border-radius: 0.875rem;
  padding: 1rem;
  text-align: center;
}

.layer-1 { border-color: #3B82F6; background: #EFF6FF; }
.layer-4 { border-color: #10B981; background: #ECFDF5; }

.l-tag { font-size: 0.65rem; font-weight: 800; color: #64748B; letter-spacing: 0.05em; display: block; }
.l-layer h4 { font-size: 0.95rem; font-weight: 800; color: #0F172A; margin: 0.25rem 0; }
.l-layer p { font-size: 0.75rem; color: #475569; margin: 0; }

.l-arrow { font-size: 1.25rem; color: #94A3B8; font-weight: 900; }

.l-grid-3 {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.65rem;
  width: 100%;
  max-width: 48rem;
}

@media (min-width: 640px) {
  .l-grid-3 { grid-template-columns: repeat(3, 1fr); }
}

.l-box {
  background: #FFFFFF;
  border: 1px solid #CBD5E1;
  border-radius: 0.75rem;
  padding: 0.85rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.box-s1 { border-color: #93C5FD; background: #EFF6FF; }
.box-s2 { border-color: #C4B5FD; background: #F5F3FF; }
.box-s3 { border-color: #A5F3FC; background: #ECFEFF; }
.box-s4 { border-color: #FDE68A; background: #FFFBEB; max-width: 48rem; width: 100%; }

.lb-code { font-size: 0.65rem; font-weight: 800; background: #0F172A; color: #FFFFFF; padding: 0.1rem 0.4rem; border-radius: 4px; }
.l-box strong { font-size: 0.8rem; color: #0F172A; }
.l-box p { font-size: 0.7rem; color: #64748B; margin: 0; }

/* References Grid */
.refs-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.85rem;
}

@media (min-width: 768px) {
  .refs-grid { grid-template-columns: repeat(2, 1fr); }
}

.ref-card {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 0.875rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.rc-top { display: flex; justify-content: space-between; align-items: center; }
.rc-key { font-size: 0.7rem; font-weight: 800; font-family: monospace; color: #1D4ED8; }
.rc-cat { font-size: 0.65rem; font-weight: 700; color: #64748B; }
.rc-title { font-size: 0.8rem; color: #0F172A; line-height: 1.35; }
.rc-author { font-size: 0.725rem; color: #64748B; font-style: italic; margin: 0; }
.rc-rel { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 6px; padding: 0.4rem 0.6rem; font-size: 0.7rem; color: #334155; }

/* Bottom CTA Card */
.cta-jump-card {
  background: linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #064E3B 100%);
  border: 1px solid #3B82F6;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 2rem;
}

@media (min-width: 768px) {
  .cta-jump-card {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.cta-content { display: flex; flex-direction: column; gap: 0.5rem; max-width: 48rem; }
.cta-title { font-size: 1.35rem; font-weight: 900; margin: 0; color: #FFFFFF; }
.cta-desc { font-size: 0.825rem; color: #CBD5E1; line-height: 1.55; margin: 0; }

.btn-cta-main {
  background: #10B981;
  color: #FFFFFF;
  font-size: 0.875rem;
  font-weight: 800;
  padding: 0.85rem 1.5rem;
  border-radius: 0.875rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3);
  transition: all 0.2s;
  flex-shrink: 0;
}

.btn-cta-main:hover {
  background: #059669;
  transform: translateY(-1px);
}
</style>
