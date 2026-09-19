<template>
  <div class="app-container">
    <!-- Top Header Navigation -->
    <Navbar />

    <main id="konten-utama" class="main-content">
      <!-- TOP TITLE & STATUS BANNER (EXECUTIVE HERO) -->
      <section class="hero-banner">
        <div class="hero-content">
          <div class="hero-badge-row">
            <span class="badge badge-emerald">🔬 Research Prototype</span>
            <span class="badge badge-indigo">🏛️ Primary Framework: CABA</span>
            <span class="badge badge-blue">📐 Core Mechanism: CCBN Baseline</span>
            <span class="badge badge-purple">⚡ Decision Layer: Adaptive LinUCB</span>
            <span class="badge badge-amber">⚖️ Fairness: Regional Disparity-Aware</span>
          </div>
          <h1 class="hero-title">
            CABA–CCBN Research Prototype
          </h1>
          <p class="hero-subtitle" style="font-weight: 700; color: #93C5FD; margin-bottom: 0.35rem;">
            Context-Conditioned Behavioral Baseline for Context-Aware and Disparity-Sensitive Adaptive Learning
          </p>
          <p class="hero-subtitle">
            Prototipe komputasional Disertasi untuk menguji bagaimana jejak perilaku pembelajaran digital ASN dikalibrasi oleh konteks enam dimensi ($c_{i,t}$) dan kualitas evidensi ($q_{i,t}$) untuk membentuk baseline perilaku wajar ($hat{b}_{i,t}$), mengukur residual diagnostik individual ($d_{i,t}$), mengevaluasi disparitas kelompok ($D_t$), serta menghasilkan rekomendasi adaptif suportif yang adil dan non-punitif.
          </p>
          <div class="hero-synthetic-warning">
            <span class="warn-icon">ℹ️</span>
            <span><strong>CATATAN PROTOTIPE:</strong> Seluruh metrik numerik dan nilai evaluasi dalam simulator ini merupakan <strong>SYNTHETIC PROTOTYPE VALUES — NOT EMPIRICAL RESULTS</strong> (Simulasi Proof-of-Concept terkalibrasi, bukan temuan empiris atau evaluasi lapangan final).</span>
          </div>
        </div>

        <div class="hero-kpi-deck">
          <div class="kpi-card">
            <span class="kpi-label">Candidate Reward (Eq. 9)</span>
            <span class="kpi-val text-emerald">{{ liveRewardScore.toFixed(2) }}*</span>
            <span class="kpi-sub">Reward terkalibrasi aktif</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">Contextual Residual (Eq. 6)</span>
            <span class="kpi-val" :style="{ color: deltaBColor }">{{ liveResidual >= 0 ? '+' : '' }}{{ liveResidual.toFixed(2) }}</span>
            <span class="kpi-sub">d_{i,t} = B_{i,t} - hat{b}_{i,t}</span>
          </div>
          <div class="kpi-card highlight">
            <span class="kpi-label">Disparity Gap (Eq. 7)</span>
            <span class="kpi-val text-amber">{{ liveDisparityGap.toFixed(2) }}*</span>
            <span class="kpi-sub">Gap simulatif: -{{ liveGapReductionPct }}%*</span>
          </div>
          <div class="kpi-card" :class="'validity-card-' + validityResult.state">
            <span class="kpi-label">Baseline Validity (Eq. 18)</span>
            <span class="kpi-val uppercase">{{ validityResult.state }}</span>
            <span class="kpi-sub">S: {{ spatialIndex.toFixed(2) }} | q: {{ evidenceQuality.toFixed(2) }}</span>
          </div>
        </div>
      </section>

      <!-- PROPOSAL EQUATION LEDGER -->
      <section class="card proposal-equation-ledger" aria-labelledby="proposal-equations-title">
        <div class="equation-ledger-head">
          <div>
            <span class="stage-pill pill-indigo">PROPOSAL REVISI 2 · PERSAMAAN (1)–(18c)</span>
            <h2 id="proposal-equations-title" class="stage-title">Ledger Persamaan Operasional CABA–CCBN</h2>
            <p class="stage-p">
              Pemetaan matematis formal dari Proposal Disertasi Revisi 2. Nilai di bawah dihitung secara dinamis dari status simulator aktif saat ini.
            </p>
          </div>
          <div class="baseline-status" :class="`status-${validityResult.state}`">
            <span>Status Baseline Gate (Eq. 18a–18c)</span>
            <strong>{{ validityResult.state.toUpperCase() }}</strong>
            <small>{{ validityResult.message }}</small>
          </div>
        </div>

        <div class="equation-ledger-grid">
          <article v-for="equation in proposalEquationLedger" :key="equation.id" class="equation-ledger-item" :class="{ safeguard: equation.id.startsWith('(18') }">
            <div class="equation-ledger-meta">
              <span>{{ equation.id }}</span>
              <strong>{{ equation.title }}</strong>
            </div>
            <code>{{ equation.formula }}</code>
            <p>{{ equation.live }}</p>
          </article>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- TAHAP 1 & 2: SCIENTIFIC FOUNDATIONS DUAL CARDS                            -->
      <!-- ========================================================================= -->
      <section class="theory-grid">
        <!-- 1. Scientific Problem -->
        <div class="card stage-card border-rose">
          <div class="stage-card-header">
            <span class="stage-pill pill-rose">MASALAH ILMIAH UTAMA</span>
            <span class="stage-ref">Infrastructural Confounding & Epistemic Bias</span>
          </div>
          <h2 class="stage-title">1. Masalah: Bias Ambang Universal pada Learning Analytics</h2>
          <p class="stage-p">
            Sistem analitik konvensional sering menggunakan ambang tunggal universal (durasi login kaku, komplesi video 100%) sebagai proksi keterlibatan peserta. Dalam konteks pelatihan ASN dengan ketimpangan infrastruktur digital nyata:
          </p>
          
          <div class="disparity-flow">
            <div class="flow-step">
              <span class="flow-badge">Trace LMS Mentah (X_{i,t})</span>
            </div>
            <div class="flow-arrow">➔</div>
            <div class="flow-step">
              <span class="flow-badge badge-rose">Ambang Universal / Naive Interpretation</span>
            </div>
            <div class="flow-arrow">➔</div>
            <div class="flow-step flow-split">
              <div class="split-pill split-3t">🏝️ Wilayah Terkendala: Sinyal Drop → Salah Vonis "Tidak Aktif"</div>
              <div class="split-pill split-urban">🏢 Wilayah Ideal: Koneksi Cepat → Dianggap "Sangat Terlibat"</div>
              <div class="split-gap-alert">⚠️ Infrastructural Confounding: Hambatan akses keliru dibaca sebagai defisit belajar</div>
            </div>
          </div>

          <div class="stage-callout callout-rose">
            <span class="callout-icon">⚠️</span>
            <span><strong>Dampak Epistemik:</strong> Peserta di wilayah berinfrastruktur terbatas dihukum secara tidak adil karena keterbatasan observasi sistem keliru ditafsirkan sebagai kelalaian atau rendahnya motivasi.</span>
          </div>
        </div>

        <!-- 2. CABA-CCBN Solution -->
        <div class="card stage-card border-emerald">
          <div class="stage-card-header">
            <span class="stage-pill pill-emerald">SOLUSI DISERTASI: CABA–CCBN</span>
            <span class="stage-ref">Pujiatmo Subarkah (2026)</span>
          </div>
          <h2 class="stage-title">2. Solusi: Baseline Perilaku Terkondisi Konteks (CCBN)</h2>
          <p class="stage-p">
            <strong>CABA–CCBN</strong> menyelesaikan masalah ini dengan mengondisikan ekspektasi perilaku wajar melalui vektor konteks enam dimensi ($c_{i,t}$) dan kualitas evidensi ($q_{i,t}$), menghitung residual individual ($d_{i,t}$), dan menilai disparitas kelompok ($D_t$):
          </p>

          <div class="math-box math-emerald">
            <div class="math-formula-rendered">
              <span class="m-lhs">hat{b}_{i,t} = mathbb{E}[B_{i,t} mid c_{i,t}, q_{i,t}] = f(c_{i,t}, q_{i,t})</span>
            </div>
            <div class="math-formula-rendered" style="margin-top: 0.5rem;">
              <span class="m-lhs">d_{i,t} = B_{i,t} - hat{b}_{i,t} quad implies quad D_t = 	ext{disparity}(d_{i,t} mid 	ext{group})</span>
            </div>
            <div class="math-legend">
              <span class="leg-pill pill-blue-sm"><strong>c_{i,t} = [T, I, O, D, W, S]</strong> : Konteks 6D</span>
              <span class="dot">•</span>
              <span class="leg-pill pill-purple-sm"><strong>q_{i,t}</strong> : Kualitas Evidensi</span>
              <span class="dot">•</span>
              <span class="leg-pill pill-emerald-sm"><strong>d_{i,t}</strong> : Residual Diagnostik</span>
              <span class="dot">•</span>
              <span class="leg-pill pill-amber-sm"><strong>D_t</strong> : Disparitas Kelompok</span>
            </div>
          </div>

          <div class="stage-callout callout-emerald">
            <span class="callout-icon">💡</span>
            <span><strong>Prinsip Suportif Non-Punitif:</strong> Data hilang karena sinyal drop diperlakukan sebagai batasan observabilitas sistem ($m_{i,t}$), bukan bukti absensi belajar. LinUCB diposisikan sebagai <em>decision support layer</em> setelah evidensi dan fairness dikalibrasi.</span>
          </div>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- DIAGRAM KERANGKA BERPIKIR: PIPELINE CABA-CCBN (GAMBAR 2 & 3 PROPOSAL)    -->
      <!-- ========================================================================= -->
      <section class="card spatial-moderation-diagram-card">
        <div class="diagram-head">
          <div class="badge-row">
            <span class="badge badge-indigo">🔬 Diagram Kerangka Berpikir (Gambar 2 & 3 Proposal)</span>
            <span class="badge badge-dashed">┆ Moderasi Spasial S_{i,t} (Garis Putus-Putus)</span>
            <span class="badge badge-cyan">Pipeline Primer: X → B → (c,q) → b̂ → d → D → A</span>
          </div>
          <h2 class="diagram-title">
            Struktur Alur Pipeline Komputasi CABA–CCBN & Peran Moderasi Konteks Spasial
          </h2>
          <p class="diagram-desc">
            Sesuai perumusan Proposal Disertasi Bab 8 & 11, jalur vertikal padat menggambarkan <strong>data pipeline primer</strong> dari trace mentah hingga rekomendasi adaptif. Jalur samping bergaris putus-putus merepresentasikan peran <strong>Moderasi Konteks Spasial ($S_{i,t}$)</strong> yang mengondisikan ekspektasi baseline perilaku wajar dan mengatur bobot observabilitas visual ($w_{i,t}$).
          </p>
        </div>

        <div class="diagram-interactive-body">
          <!-- Main Sequential Flow Column -->
          <div class="flow-pipeline-col">
            <!-- Step 1 -->
            <div class="pipe-box pipe-blue">
              <div class="pipe-header">
                <span class="pipe-step-num">LANGKAH 1</span>
                <span class="pipe-eq">Persamaan (1)</span>
              </div>
              <div class="pipe-title">1) Raw Behavioral Traces (<strong>X</strong><sub>i,t</sub>) → Behavioral Outcome (<strong>B</strong><sub>i,t</sub>)</div>
              <div class="pipe-content">
                <div class="math-sym-row">
                  <span class="m-bold">X</span><sub>i,t</sub> = [<span class="m-var">login</span>, <span class="m-var">durasi</span>, <span class="m-var">clickstream</span>, <span class="m-var">completion</span>, <span class="m-var">artifact</span>, ...]
                </div>
                <span class="pipe-note">X adalah telemetri mentah; B adalah evidensi perilaku ternormalisasi. X bukan label langsung kompetensi/motivasi.</span>
              </div>
            </div>

            <div class="solid-connector-down"><span class="connector-arrow">▼</span></div>

            <!-- Step 2 -->
            <div class="pipe-box pipe-indigo">
              <div class="pipe-header">
                <span class="pipe-step-num">LANGKAH 2</span>
                <span class="pipe-eq">Persamaan (2) & (2a–2c)</span>
              </div>
              <div class="pipe-title">2) Konteks Enam Dimensi (<strong>c</strong><sub>i,t</sub>)</div>
              <div class="pipe-content">
                <div class="math-sym-row">
                  <span class="m-bold">c</span><sub>i,t</sub> = [<span class="m-var">T</span><sub>i,t</sub>, <span class="m-var">I</span><sub>i,t</sub>, <span class="m-var">O</span><sub>i,t</sub>, <span class="m-var">D</span><sub>i,t</sub>, <span class="m-var">W</span><sub>i,t</sub>, <span class="m-var">S</span><sub>i,t</sub>]
                </div>
                <span class="pipe-tags">
                  <span class="p-tag">Temporal (T)</span>
                  <span class="p-tag">Infrastruktur (I)</span>
                  <span class="p-tag">Organisasi (O)</span>
                  <span class="p-tag">Perangkat (D)</span>
                  <span class="p-tag">Beban Kerja (W)</span>
                  <span class="p-tag highlight-tag">Spasial Komposit (S)</span>
                </span>
              </div>
            </div>

            <div class="solid-connector-down"><span class="connector-arrow">▼</span></div>

            <!-- Step 3 -->
            <div class="pipe-box pipe-amber">
              <div class="pipe-header">
                <span class="pipe-step-num">LANGKAH 3</span>
                <span class="pipe-eq">Persamaan (3) & (4)</span>
              </div>
              <div class="pipe-title">3) Missingness (m<sub>i,t</sub>) & Kualitas Evidensi (q<sub>i,t</sub>)</div>
              <div class="pipe-content">
                <div class="math-sym-row">
                  <span class="m-var">m</span><sub>i,t</sub> = 1 - (n<sub>obs</sub> / n<sub>exp</sub>), quad <span class="m-var">q</span><sub>i,t</sub> = 1 - <span class="m-var">m</span><sub>i,t</sub> - <span class="m-sym">&lambda;</span> &middot; <span class="m-var">noise</span><sub>i,t</sub>
                </div>
                <span class="pipe-note">Observabilitas sistem diuji melalui Little's MCAR Test & Pattern-Mixture Model. Data hilang tidak otomatis dianggap lalai.</span>
              </div>
            </div>

            <div class="solid-connector-down"><span class="connector-arrow">▼</span></div>

            <!-- Step 4 -->
            <div class="pipe-box pipe-purple moderated-target-box">
              <div class="pipe-header">
                <span class="pipe-step-num">LANGKAH 4 (INTI CCBN)</span>
                <span class="pipe-eq">Persamaan (5), (10) & (10a)</span>
              </div>
              <div class="pipe-title">4) Expected Behavioral Baseline (<span class="m-bold">b̂</span><sub>i,t</sub>) & Observabilitas Visual (<span class="m-bold">F</span><sub>i,t</sub>)</div>
              <div class="pipe-content">
                <div class="formula-subgrid">
                  <div class="math-sub-cell">
                    <span class="f-lbl">Baseline Perilaku Terkondisi Konteks (Eq. 5):</span>
                    <span class="m-bold">b̂</span><sub>i,t</sub> = <span class="m-func">E</span>[<span class="m-bold">B</span><sub>i,t</sub> | <span class="m-bold">c</span><sub>i,t</sub>, <span class="m-var">q</span><sub>i,t</sub>] = <span class="m-func">f</span>(<span class="m-bold">c</span><sub>i,t</sub>, <span class="m-var">q</span><sub>i,t</sub>)
                  </div>
                  <div class="math-sub-cell">
                    <span class="f-lbl">Bobot Observabilitas Visual (Eq. 10):</span>
                    <span class="m-var">w</span><sub>i,t</sub> = <span class="m-sym">&sigma;</span>(&alpha;<sub>1</sub>(1 - S<sub>i,t</sub>) + &alpha;<sub>2</sub>q<sup>visual</sup><sub>i,t</sub>)
                  </div>
                  <div class="math-sub-cell full-w">
                    <span class="f-lbl">Fusi Multimodal Terbatas (Eq. 10a):</span>
                    <span class="m-bold">F</span><sub>i,t</sub> = <span class="m-var">w</span><sub>i,t</sub> &middot; <span class="m-bold">V</span><sub>i,t</sub> + (1 - <span class="m-var">w</span><sub>i,t</sub>) &middot; <span class="m-bold">b</span><sub>LMS,i,t</sub>
                  </div>
                </div>
              </div>
              <div class="moderated-receive-badge">
                <span class="dot-pulse"></span> Dimoderasi langsung oleh Indeks Spasial <strong>S<sub>i,t</sub></strong> dan Kualitas Evidensi <strong>q<sub>i,t</sub></strong>
              </div>
            </div>

            <div class="solid-connector-down"><span class="connector-arrow">▼</span></div>

            <!-- Step 5 -->
            <div class="pipe-box pipe-cyan">
              <div class="pipe-header">
                <span class="pipe-step-num">LANGKAH 5</span>
                <span class="pipe-eq">Persamaan (6)</span>
              </div>
              <div class="pipe-title">5) Contextual Residual Individual (<strong>d</strong><sub>i,t</sub>)</div>
              <div class="pipe-content">
                <div class="math-sym-row">
                  <span class="m-bold">d</span><sub>i,t</sub> = <span class="m-bold">B</span><sub>i,t</sub> - <span class="m-bold">b̂</span><sub>i,t</sub>
                </div>
                <span class="pipe-note">Deviasi individual terhadap ekspektasi wajar. Membedakan hambatan akses dari kebutuhan intervensi belajar otentik.</span>
              </div>
            </div>

            <div class="solid-connector-down"><span class="connector-arrow">▼</span></div>

            <!-- Step 6 -->
            <div class="pipe-box pipe-rose">
              <div class="pipe-header">
                <span class="pipe-step-num">LANGKAH 6</span>
                <span class="pipe-eq">Persamaan (7), (8), (8a), (8b)</span>
              </div>
              <div class="pipe-title">6) Contextual Disparity Kelompok (<strong>D</strong><sub>t</sub>) & Evaluasi Beban Rekomendasi</div>
              <div class="pipe-content">
                <div class="fairness-two-pillars">
                  <div class="f-pil">
                    <strong>Persamaan (8a) Recommendation Burden Gap:</strong>
                    <span class="m-func">max</span><sub>g,h &isin; G</sub> | <span class="m-sym">&#120124;</span>[<span class="m-var">CB</span><sub>i,a,t</sub> | g] - <span class="m-sym">&#120124;</span>[<span class="m-var">CB</span><sub>i,a,t</sub> | h] |
                  </div>
                  <div class="f-pil">
                    <strong>Persamaan (8b) Interpretation Error Gap:</strong>
                    <span class="m-func">max</span><sub>g,h &isin; G</sub> | <span class="m-var">MAE</span><sub>g,t</sub>(d) - <span class="m-var">MAE</span><sub>h,t</sub>(d) |
                  </div>
                </div>
              </div>
            </div>

            <div class="solid-connector-down"><span class="connector-arrow">▼</span></div>

            <!-- Step 7 -->
            <div class="pipe-box pipe-emerald">
              <div class="pipe-header">
                <span class="pipe-step-num">LANGKAH 7 (OUTPUT & HITL)</span>
                <span class="pipe-eq">Persamaan (9) & LinUCB</span>
              </div>
              <div class="pipe-title">7) Keputusan Adaptif Suportif (<strong>a</strong><sub>t+1</sub><sup>*</sup>) Berbasis Reward Terkalibrasi</div>
              <div class="pipe-content">
                <div class="math-sym-row wrap">
                  <span class="m-bold">r′</span><sub>i,a,t+1</sub> = <span class="m-var">r</span><sub>i,a,t</sub> + &eta;<sub>t</sub> <span class="m-var">U</span>(a, <span class="m-bold">d</span><sub>i,t</sub>) - &mu;<sub>t</sub> <span class="m-var">CB</span><sub>i,a,t</sub> - &nu;<sub>t</sub> <span class="m-var">OB</span><sub>i,a,t</sub> - &rho;<sub>t</sub> &Delta;<span class="m-bold">c</span><sub>i,t</sub> - &gamma;<sub>t</sub> <span class="m-bold">D</span><sub>t</sub>
                </div>
                <span class="pipe-note">Pilihan intervensi: materi rendah bandwidth, audio mikro, microlearning, mentoring dengan pengawasan Human-in-the-Loop.</span>
              </div>
            </div>
          </div>

          <!-- Spatial Moderation Sidebar -->
          <div class="spatial-moderator-sidebar">
            <div class="dashed-moderator-card">
              <div class="dashed-badge">
                <span class="dashed-icon">┆</span>
                <span>VARIABEL MODERATOR KONTEKS</span>
              </div>

              <h3 class="mod-title">
                🌐 Moderasi Konteks Spasial (<strong>S</strong><sub>i,t</sub>)
              </h3>
              <p class="mod-subtitle">
                Indeks Komposit Dua Lapis (Persamaan 2a–2c):
              </p>

              <div class="mod-formula-box">
                <div class="mod-formula-main">
                  <span class="m-bold">S</span><sub>i,t</sub> = <span class="m-sym">&delta;</span> &middot; <span class="m-bold">K</span><sub>i</sub> + (1 - <span class="m-sym">&delta;</span>) &middot; <span class="m-bold">N</span><sub>i,t</sub>
                </div>
                <div class="mod-layers">
                  <div class="layer-item">
                    <span class="layer-dot blue"></span>
                    <div class="layer-txt">
                      <strong>Lapis 1: Klaster Struktural Makro (K<sub>i</sub>)</strong>
                      <span>Data Terbuka BPS, Podes sinyal desa, APJII, Ookla Speedtest (Persamaan 2a).</span>
                    </div>
                  </div>
                  <div class="layer-item">
                    <span class="layer-dot amber"></span>
                    <div class="layer-txt">
                      <strong>Lapis 2: Kualitas Jaringan Sesi (N<sub>i,t</sub>)</strong>
                      <span>Telemetri real-time: Latency, Retry Rate, Buffering, Sync Failure (Persamaan 2b).</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="dashed-action-indicator">
                <div class="indicator-arrow-box">
                  <span class="dashed-arrow-line">---------------------------------➔</span>
                  <span class="indicator-label">Efek Moderasi Konseptual (c<sub>i,t</sub> & q<sub>i,t</sub>)</span>
                </div>
                <ul class="mod-impact-list">
                  <li>
                    <span class="icon-check">✓</span>
                    <span><strong>Mengondisikan Baseline (b̂<sub>i,t</sub>):</strong> Standar keaktifan wajar di 3T disesuaikan secara adil.</span>
                  </li>
                  <li>
                    <span class="icon-check">✓</span>
                    <span><strong>Mengontrol Gerbang Observabilitas (w<sub>i,t</sub>):</strong> Jika sinyal/observabilitas drop, sistem tidak memaksakan sinyal visual.</span>
                  </li>
                  <li>
                    <span class="icon-check">✓</span>
                    <span><strong>Mencegah infrastructural confounding:</strong> Menjaga validitas epistemik sebelum rekomendasi diputuskan.</span>
                  </li>
                </ul>
              </div>

              <div class="service-dynamics-box">
                <div class="sd-head">
                  <span class="sd-tag">⚙️ Service Dynamics Fusion (OB<sub>i,a,t</sub>)</span>
                </div>
                <p class="sd-desc">
                  Data beban layanan publik agregat (SP4N-LAPOR) berinteraksi memoderasi penalti beban operasional pada Persamaan (9).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- DISTINGSI KONSEPTUAL: RESIDUAL vs DISPARITY                              -->
      <!-- ========================================================================= -->
      <section class="card disparity-levels-card" style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color: #FFFFFF; border-radius: 14px; padding: 1.35rem 1.65rem; margin-bottom: 2rem; border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.35);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="background: rgba(59, 130, 246, 0.25); color: #93C5FD; padding: 0.25rem 0.65rem; border-radius: 999px; font-size: 0.725rem; font-weight: 800; border: 1px solid rgba(147, 197, 253, 0.35);">
              📐 Distingsi Konseptual Disertasi
            </span>
            <h3 style="font-size: 1.1rem; font-weight: 800; color: #FFFFFF; margin: 0;">
              Pemisahan Dua Tingkat: Contextual Residual (d_{i,t}) vs Group Disparity (D_t)
            </h3>
          </div>
          <span style="font-size: 0.725rem; color: #FCD34D; font-family: monospace; font-weight: 800; background: rgba(245, 158, 11, 0.15); padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid rgba(245, 158, 11, 0.3);">
            Individual Residual (d_{i,t}) ≠ Group Disparity (D_t)
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
          <!-- Level 1: Contextual Residual -->
          <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(147, 197, 253, 0.25); border-radius: 10px; padding: 1.1rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.35rem;">
              <span style="font-size: 0.725rem; font-weight: 800; color: #93C5FD; text-transform: uppercase; letter-spacing: 0.03em;">Level 1 — Contextual Residual (Individual Diagnostic Signal)</span>
              <code style="color: #34D399; font-size: 0.8rem; background: rgba(0,0,0,0.4); padding: 0.15rem 0.45rem; border-radius: 4px; font-family: monospace;">d_{i,t} = B_{i,t} - hat{b}_{i,t}</code>
            </div>
            <p style="font-size: 0.8rem; color: #E2E8F0; line-height: 1.5; margin: 0 0 0.65rem 0;">
              <strong>Pertanyaan Diagnostik:</strong> <em>"Apakah perilaku belajar individu menyimpang dari ekspektasi wajar pada konteks kendalanya?"</em>
            </p>
            <div style="font-size: 0.725rem; color: #94A3B8; background: rgba(0,0,0,0.25); padding: 0.45rem 0.75rem; border-radius: 6px; line-height: 1.45;">
              📌 <strong>Fungsi Diagnostik:</strong> Memisahkan hambatan teknis/infrastruktur dari kebutuhan intervensi otentik agar peserta di wilayah terkendala tidak menerima penalti bias.
            </div>
          </div>

          <!-- Level 2: Group Disparity -->
          <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(248, 113, 113, 0.25); border-radius: 10px; padding: 1.1rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.35rem;">
              <span style="font-size: 0.725rem; font-weight: 800; color: #FCA5A5; text-transform: uppercase; letter-spacing: 0.03em;">Level 2 — Contextual Disparity (Group Fairness Metric)</span>
              <code style="color: #F87171; font-size: 0.8rem; background: rgba(0,0,0,0.4); padding: 0.15rem 0.45rem; border-radius: 4px; font-family: monospace;">D_t = 	ext{disparity}(d_{i,t} mid 	ext{group})</code>
            </div>
            <p style="font-size: 0.8rem; color: #E2E8F0; line-height: 1.5; margin: 0 0 0.65rem 0;">
              <strong>Pertanyaan Keadilan:</strong> <em>"Apakah keputusan/rekomendasi adaptif menghasilkan disparitas beban atau kesalahan interpretasi antar kelompok konteks?"</em>
            </p>
            <div style="font-size: 0.725rem; color: #94A3B8; background: rgba(0,0,0,0.25); padding: 0.45rem 0.75rem; border-radius: 6px; line-height: 1.45;">
              📌 <strong>Fungsi Keadilan:</strong> Menjaga kesetaraan beban rekomendasi (Eq. 8a) dan galat interpretasi (Eq. 8b) antar wilayah yang diregulasi via penalti disparitas (γ) pada Persamaan (9).
            </div>
          </div>
        </div>

        <!-- Hierarchical Pipeline Flow -->
        <div style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px dashed rgba(255, 255, 255, 0.15); display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; color: #E2E8F0; flex-wrap: wrap;">
          <span style="font-weight: 800; color: #FCD34D;">Alur Hierarki Disertasi:</span>
          <span style="background: rgba(255,255,255,0.08); padding: 0.2rem 0.5rem; border-radius: 4px;">Raw Traces X</span>
          <span style="color: #64748B;">➔</span>
          <span style="background: rgba(255,255,255,0.08); padding: 0.2rem 0.5rem; border-radius: 4px;">Behavioral Evidence B</span>
          <span style="color: #64748B;">➔</span>
          <span style="background: rgba(59,130,246,0.2); color: #93C5FD; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: 4px;">b̂ = E[B|c,q]</span>
          <span style="color: #64748B;">➔</span>
          <span style="background: rgba(16,185,129,0.2); color: #6EE7B7; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: 4px;">d = B - b̂ (Individu)</span>
          <span style="color: #64748B;">➔</span>
          <span style="background: rgba(239,68,68,0.2); color: #FCA5A5; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: 4px;">D_t (Kelompok)</span>
          <span style="color: #64748B;">➔</span>
          <span style="background: rgba(245,158,11,0.2); color: #FCD34D; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: 4px;">Adaptive Action (a*)</span>
        </div>
      </section>

      <!-- DSR RESEARCH ROADMAP -->
      <section class="card dsr-roadmap-card">
        <div class="dsr-header-row">
          <div class="dsr-title-block">
            <span class="dsr-badge">📐 DESIGN SCIENCE RESEARCH (DSR) ROADMAP</span>
            <h3 class="dsr-heading">Kedudukan Ilmiah & Tahapan Validasi Artefak CABA–CCBN</h3>
          </div>
          <span class="dsr-phase-pill">STATUS: TAHAP 1 (SYNTHETIC OPERATIONALIZATION)</span>
        </div>

        <div class="dsr-phases-grid">
          <div class="dsr-phase-item active-phase">
            <div class="phase-badge-row">
              <span class="phase-num">TAHAP 1 (Saat Ini / Paper 1)</span>
              <span class="phase-status-tag tag-active">● Active Prototype</span>
            </div>
            <h4 class="phase-title">Theoretical Formulation & Synthetic Operationalization</h4>
            <p class="phase-desc">Membuktikan artefak dan formulasi matematika (Level 1 d_{i,t} + Level 2 D_t) bekerja menghasilkan adaptasi moda non-punitif tanpa bias penalti.</p>
          </div>

          <div class="dsr-phase-item">
            <div class="phase-badge-row">
              <span class="phase-num">TAHAP 2 (Disertasi / Lapangan)</span>
              <span class="phase-status-tag">○ Next Step</span>
            </div>
            <h4 class="phase-title">Empirical Validation on Real LMS & Spatial Dataset</h4>
            <p class="phase-desc">Pengujian validitas eksternal menggunakan log telemetri riil LMS serta instrumen kuesioner konteks ASN di lapangan.</p>
          </div>

          <div class="dsr-phase-item">
            <div class="phase-badge-row">
              <span class="phase-num">TAHAP 3 (DSR Feedback Loop)</span>
              <span class="phase-status-tag">○ Iteration Loop</span>
            </div>
            <h4 class="phase-title">Algorithmic Improvement & Policy Convergence</h4>
            <p class="phase-desc">Penyempurnaan bobot penalti disparitas (γ) dan konvergensi bandit dinamis berdasarkan umpan balik empiris Widyaiswara (HITL).</p>
          </div>
        </div>

        <div class="reasoning-behind-box">
          <div class="rb-head">
            <span class="rb-icon">💡</span>
            <strong>Rasional Pedagogis: Kuesioner sebagai Sumber Data Konteks (Bukan CCBN itu Sendiri)</strong>
          </div>
          <p class="rb-p">
            Instrumen kuesioner pembelajaran digital berfungsi sebagai <strong>sumber data konteks</strong> ($T, I, O, D, W, S$) dan verifikasi persepsi hambatan. CCBN memproses konteks tersebut bersama telemetri riil LMS untuk membentuk ekspektasi baseline perilaku wajar ($hat{b}_{i,t}$), memastikan peserta yang mengalami gangguan koneksi tidak menerima label tidak disiplin.
          </p>
        </div>
      </section>

      <!-- PIPELINE TRAJECTORY TRACKER & SIMULATOR BUTTON -->
      <section class="card pipeline-tracker-card" :class="{ 'simulating-pulse': isSimulating }">
        <div class="pipeline-header-row">
          <div class="pipe-title-left">
            <span class="pipe-icon">🔄</span>
            <div>
              <h3 class="pipeline-heading">End-to-End Computational Pipeline (5 Macro Stages)</h3>
              <p class="pipeline-sub">1. CONTEXT ➔ 2. EVIDENCE ➔ 3. FAIRNESS ➔ 4. DECISION ➔ 5. LEARNING LOOP</p>
            </div>
          </div>
          <div class="pipe-actions">
            <button 
              class="btn-simulate"
              :class="{ 'btn-running': isSimulating }"
              @click="simulateTrajectory"
              :disabled="isSimulating"
            >
              <span class="sim-play-icon">{{ isSimulating ? '⏳' : '▶' }}</span>
              <span>{{ isSimulating ? 'Simulasi Berjalan (Tahap ' + simulationActiveStep + '/5)...' : 'Simulate Learning Trajectory' }}</span>
            </button>
          </div>
        </div>

        <!-- 5-Stage Macro Architecture Interactive Pipeline Stepper -->
        <div class="pipeline-stepper">
          <!-- STAGE 1: CONTEXT -->
          <div 
            class="pipe-step-node" 
            :class="{ active: simulationActiveStep === 1, done: simulationActiveStep > 1 }"
            @click="simulationActiveStep = 1; openModuleModal(1)"
            title="Klik untuk melihat Tahap 1: Context Profile (Modul 01)"
          >
            <div class="step-circle">01</div>
            <div class="step-label-box">
              <span class="step-name">1. CONTEXT</span>
              <span class="step-detail">Context 6D (c_{i,t})</span>
            </div>
          </div>
          <div class="pipe-step-divider">➔</div>

          <!-- STAGE 2: EVIDENCE -->
          <div 
            class="pipe-step-node" 
            :class="{ active: simulationActiveStep === 2, done: simulationActiveStep > 2 }"
            @click="simulationActiveStep = 2; openModuleModal(4)"
            title="Klik untuk melihat Tahap 2: Evidence (Modul 02, 03, 04, 05)"
          >
            <div class="step-circle">02</div>
            <div class="step-label-box">
              <span class="step-name">2. EVIDENCE</span>
              <span class="step-detail">X, B, m, q, b̂, d, Gate 18</span>
            </div>
          </div>
          <div class="pipe-step-divider">➔</div>

          <!-- STAGE 3: FAIRNESS -->
          <div 
            class="pipe-step-node" 
            :class="{ active: simulationActiveStep === 3, done: simulationActiveStep > 3 }"
            @click="simulationActiveStep = 3; openModuleModal(6)"
            title="Klik untuk melihat Tahap 3: Fairness (Modul 06, 11)"
          >
            <div class="step-circle">03</div>
            <div class="step-label-box">
              <span class="step-name">3. FAIRNESS</span>
              <span class="step-detail">Disparity D, Burden, Eq 11-17</span>
            </div>
          </div>
          <div class="pipe-step-divider">➔</div>

          <!-- STAGE 4: DECISION -->
          <div 
            class="pipe-step-node" 
            :class="{ active: simulationActiveStep === 4, done: simulationActiveStep > 4 }"
            @click="simulationActiveStep = 4; openModuleModal(7)"
            title="Klik untuk melihat Tahap 4: Decision (Modul 07, 08)"
          >
            <div class="step-circle">04</div>
            <div class="step-label-box">
              <span class="step-name">4. DECISION</span>
              <span class="step-detail">Reward (Eq. 9) & HITL</span>
            </div>
          </div>
          <div class="pipe-step-divider">➔</div>

          <!-- STAGE 5: LEARNING LOOP -->
          <div 
            class="pipe-step-node" 
            :class="{ active: simulationActiveStep === 5, done: simulationActiveStep > 5 }"
            @click="simulationActiveStep = 5; openModuleModal(10)"
            title="Klik untuk melihat Tahap 5: Learning Loop (Modul 09, 10, 12)"
          >
            <div class="step-circle">05</div>
            <div class="step-label-box">
              <span class="step-name">5. LEARNING LOOP</span>
              <span class="step-detail">Trajectory, θ Update, Shift</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- 5 MACRO ARCHITECTURE SECTIONS (12 NUMBERED COMPUTATIONAL MODULES)        -->
      <!-- ========================================================================= -->
      <div class="modules-lab-wrapper">

        <!-- ===================================================================== -->
        <!-- TAHAP 1: CONTEXT (MODUL 01)                                           -->
        <!-- ===================================================================== -->
        <section class="lab-layer-section">
          <div class="layer-section-header">
            <div class="layer-pill">TAHAP 1: CONTEXT (CONTEXT PROFILE ENAM DIMENSI)</div>
            <span class="layer-desc">Pemetaan parameter lingkungan kendala peserta: Temporal (T), Infrastruktur (I), Organisasi (O), Perangkat (D), Beban Kerja (W), Spasial Komposit (S) [Persamaan 2 & 2a–2c]</span>
          </div>

          <!-- MODUL 01: CONTEXT PROFILE -->
          <div class="card sim-panel-card" :class="{ 'step-highlight-active': simulationActiveStep === 1 }">
            <div class="panel-head">
              <div class="panel-head-left">
                <span class="icon-pulse blue">📍</span>
                <div>
                  <span class="mod-num-badge badge-blue">MODUL 01</span>
                  <h3 class="panel-title">Profil Vektor Konteks Enam Dimensi (Context Profile)</h3>
                </div>
              </div>
              <div class="panel-head-right">
                <button class="btn-inspect-modal" @click.stop="openModuleModal(1)" title="Buka Detail Komputasi & Telemetri">
                  <span>🔍 Detail</span>
                </button>
                <span class="code-pill pill-blue">Vektor c_{i,t} (Eq. 2)</span>
              </div>
            </div>

            <!-- Presets -->
            <div class="preset-wrap">
              <span class="preset-label">Skenario Konteks Cepat (Simulasi):</span>
              <div class="preset-btn-group">
                <button @click="applyPreset('3T_mobile')" class="p-btn" :class="{ active: currentPreset === '3T_mobile' }">
                  <span class="p-icon">🏝️</span>
                  <span class="p-txt">3T (Ponsel, Sinyal Drop)</span>
                </button>
                <button @click="applyPreset('office_rush')" class="p-btn" :class="{ active: currentPreset === 'office_rush' }">
                  <span class="p-icon">🏢</span>
                  <span class="p-txt">Jam Kantor Sibuk</span>
                </button>
                <button @click="applyPreset('night_study')" class="p-btn" :class="{ active: currentPreset === 'night_study' }">
                  <span class="p-icon">🌙</span>
                  <span class="p-txt">Belajar Mandiri (Lancar)</span>
                </button>
              </div>
            </div>

            <div class="sub-input-section">
              <div class="layer-grid-2">
                <!-- Parameter 1: Bandwidth -->
                <div class="control-box">
                  <div class="ctrl-header">
                    <label class="ctrl-lbl">Infrastruktur Bandwidth (I_{i,t}):</label>
                    <span class="val-pill pill-blue">{{ bandwidthKbps }} kbps ({{ bandwidthQuality }})</span>
                  </div>
                  <input type="range" min="50" max="10000" step="50" v-model.number="bandwidthKbps" class="slider slider-blue" />
                </div>

                <!-- Parameter 2: Latency -->
                <div class="control-box">
                  <div class="ctrl-header">
                    <label class="ctrl-lbl">Session Latency (N_{i,t} component):</label>
                    <span class="val-pill" :class="stallRatio > 20 ? 'pill-rose' : 'pill-slate'">{{ latencyMs }} ms</span>
                  </div>
                  <input type="range" min="20" max="1200" step="20" v-model.number="latencyMs" class="slider slider-amber" />
                </div>
              </div>

              <div class="layer-grid-2" style="margin-top: 0.75rem;">
                <!-- Parameter 3: Device -->
                <div class="control-box">
                  <div class="ctrl-header">
                    <label class="ctrl-lbl">Device / Delivery Context (D_{i,t}):</label>
                    <span class="val-pill pill-slate">{{ deviceName }}</span>
                  </div>
                  <div class="segmented-box">
                    <button :class="{ active: deviceType === 'smartphone' }" @click="deviceType = 'smartphone'">
                      📱 Smartphone
                    </button>
                    <button :class="{ active: deviceType === 'tablet' }" @click="deviceType = 'tablet'">
                      📲 Tablet
                    </button>
                    <button :class="{ active: deviceType === 'desktop' }" @click="deviceType = 'desktop'">
                      💻 Desktop
                    </button>
                  </div>
                </div>

                <!-- Parameter 4: Workload -->
                <div class="control-box">
                  <div class="ctrl-header">
                    <label class="ctrl-lbl">Workload / Beban Kerja Kedinasan (W_{i,t}):</label>
                    <span class="val-pill pill-rose">{{ workloadLevel }} / 5 ({{ workloadDesc }})</span>
                  </div>
                  <input type="range" min="1" max="5" step="1" v-model.number="workloadLevel" class="slider slider-rose" />
                </div>
              </div>

              <!-- Parameter 5: Spatial Context -->
              <div class="control-box" style="margin-top: 0.75rem;">
                <div class="ctrl-header">
                  <label class="ctrl-lbl">Konteks Spasial Komposit (S_{i,t} = δK_i + (1-δ)N_{i,t}):</label>
                  <span class="val-pill pill-purple">Indeks Spasial S_{i,t} = {{ spatialIndex.toFixed(2) }} ({{ spatialType === '3T' ? 'Klaster 3T' : 'Klaster Perkotaan' }})</span>
                </div>
                <div class="segmented-box">
                  <button :class="{ active: spatialType === '3T' }" @click="spatialType = '3T'">
                    🏝️ Klaster Wilayah 3T (K_i = 0.30)
                  </button>
                  <button :class="{ active: spatialType === 'Urban' }" @click="spatialType = 'Urban'">
                    🏢 Klaster Non-3T / Perkotaan (K_i = 0.80)
                  </button>
                </div>
              </div>

              <!-- Mathematical Context Vector Output -->
              <div class="math-vector-callout" style="margin-top: 1rem;">
                <span class="vec-label">Formal Context Vector c_{i,t} (Persamaan 2):</span>
                <code class="vec-code">c_{i,t} = [ T="Sesi Mandiri", I="{{ bandwidthKbps }}k/{{ latencyMs }}ms", O="Instansi Daerah", D="{{ deviceType }}", W="{{ workloadLevel }}/5", S="{{ spatialIndex.toFixed(2) }}" ]</code>
              </div>
            </div>
          </div>
        </section>

        <!-- ===================================================================== -->
        <!-- TAHAP 2: EVIDENCE (MODUL 02, 03, 04, 05)                              -->
        <!-- ===================================================================== -->
        <section class="lab-layer-section">
          <div class="layer-section-header">
            <div class="layer-pill">TAHAP 2: EVIDENCE (EVIDENCE FORMATION, CCBN BASELINE & VALIDITY GATE)</div>
            <span class="layer-desc">Pembentukan evidensi perilaku B_{i,t}, penilaian missingness m_{i,t} & kualitas q_{i,t}, estimasi baseline CCBN b̂_{i,t}, residual d_{i,t}, dan pengujian Baseline Validity Gate [Persamaan 1–6, 10, 10a, 18a–18c]</span>
          </div>

          <div class="layer-grid-2">
            <!-- MODUL 02: RAW TRACES & BEHAVIORAL EVIDENCE -->
            <div class="card sim-panel-card" :class="{ 'step-highlight-active': simulationActiveStep === 2 }">
              <div class="panel-head">
                <div class="panel-head-left">
                  <span class="icon-pulse purple">🎬</span>
                  <div>
                    <span class="mod-num-badge badge-purple">MODUL 02</span>
                    <h3 class="panel-title">Trace LMS Mentah (X) & Evidensi Perilaku (B)</h3>
                  </div>
                </div>
                <div class="panel-head-right">
                  <button class="btn-inspect-modal" @click.stop="openModuleModal(2)" title="Buka Detail Komputasi & Telemetri">
                    <span>🔍 Detail</span>
                  </button>
                  <span class="code-pill pill-purple">Persamaan (1) & (10a)</span>
                </div>
              </div>

              <div class="sub-input-section">
                <!-- Observational Signals -->
                <div class="control-box">
                  <div class="ctrl-header">
                    <label class="ctrl-lbl">Sinyal Atensi Teramati (Observed Learning Signal):</label>
                    <span class="val-pill pill-blue">{{ (observedFocus * 100).toFixed(0) }}%</span>
                  </div>
                  <input type="range" min="0.1" max="1.0" step="0.05" v-model.number="observedFocus" class="slider slider-blue" />
                </div>

                <div class="control-box">
                  <div class="ctrl-header">
                    <label class="ctrl-lbl">Durasi Akses Substansi (Substantive Completion):</label>
                    <span class="val-pill pill-indigo">{{ watchCompletionRatio }}% ({{ watchedMin.toFixed(1) }} / {{ videoDurationMin }} min)</span>
                  </div>
                  <input type="range" min="0.5" :max="videoDurationMin" step="0.1" v-model.number="watchedMin" class="slider slider-indigo" />
                </div>

                <div class="control-box">
                  <div class="dual-ctrl-row">
                    <div class="ctrl-half">
                      <div class="ctrl-header">
                        <label class="ctrl-lbl">Revisit Konten:</label>
                        <span class="val-pill pill-purple">{{ revisitEvents }}× Revisit</span>
                      </div>
                      <input type="range" min="0" max="5" step="1" v-model.number="revisitEvents" class="slider slider-purple" />
                    </div>
                    <div class="ctrl-half">
                      <div class="ctrl-header">
                        <label class="ctrl-lbl">Artefak Evaluasi Inti:</label>
                        <span class="val-pill pill-emerald">{{ (observedRetention * 100).toFixed(0) }}% Retensi</span>
                      </div>
                      <input type="range" min="0.1" max="1.0" step="0.05" v-model.number="observedRetention" class="slider slider-emerald" />
                    </div>
                  </div>
                </div>

                <div class="control-box">
                  <div class="ctrl-header">
                    <label class="ctrl-lbl">Aktivitas Checkpoint LMS (Interaksi):</label>
                    <span class="val-pill pill-emerald">{{ interactionCoveragePct }}% ({{ interactionEvents }}/10 Checkpoint)</span>
                  </div>
                  <input type="range" min="1" max="10" step="1" v-model.number="interactionEvents" class="slider slider-emerald" />
                </div>

                <!-- Verification of Missingness Mechanism -->
                <div class="missingness-verify-box" style="margin-top: 1rem;">
                  <div class="mv-head">
                    <span class="mv-icon">🔬</span>
                    <strong>Penilaian Mekanisme Missingness (Observabilitas):</strong>
                  </div>
                  <div class="mv-grid">
                    <div class="mv-item">
                      <span class="mv-k">Tingkat Data Hilang (m_{i,t}):</span>
                      <span class="mv-v text-amber">{{ missingnessRate.toFixed(2) }} ({{ 100 - interactionCoveragePct }}% unobserved)</span>
                    </div>
                    <div class="mv-item">
                      <span class="mv-k">Little's MCAR Test:</span>
                      <span class="mv-v text-rose">p &lt; 0.05 (Tolak MCAR → MNAR)</span>
                    </div>
                    <div class="mv-item">
                      <span class="mv-k">Kualitas Evidensi (q_{i,t}):</span>
                      <span class="mv-v text-purple">{{ evidenceQuality.toFixed(2) }} (Eq. 4)</span>
                    </div>
                    <div class="mv-item">
                      <span class="mv-k">Tindakan Epistemik:</span>
                      <span class="mv-v text-emerald">Kompensasi Konteks (Bukan Vonis Gagal)</span>
                    </div>
                  </div>
                  <span class="mv-note">
                    *Data hilang berkorelasi dengan latensi ({{ latencyMs }} ms) & bandwidth rendah ({{ bandwidthKbps }} kbps), bukan kelalaian belajar peserta.
                  </span>
                </div>
              </div>
            </div>

            <!-- MODUL 03: MISSINGNESS & EVIDENCE QUALITY -->
            <div class="card sim-panel-card" :class="{ 'step-highlight-active': simulationActiveStep === 2 }">
              <div class="panel-head">
                <div class="panel-head-left">
                  <span class="icon-pulse amber">🛡️</span>
                  <div>
                    <span class="mod-num-badge badge-amber">MODUL 03</span>
                    <h3 class="panel-title">Missingness (m_{i,t}) & Kualitas Evidensi (q_{i,t})</h3>
                  </div>
                </div>
                <div class="panel-head-right">
                  <button class="btn-inspect-modal" @click.stop="openModuleModal(3)" title="Buka Detail Komputasi & Telemetri">
                    <span>🔍 Detail</span>
                  </button>
                  <span class="code-pill pill-amber">Persamaan (3) & (4)</span>
                </div>
              </div>

              <div class="calc-panel border-purple">
                <div class="calc-top">
                  <span class="calc-tag">EVIDENCE RELIABILITY SCORE</span>
                  <span class="formula-sm">q_{i,t} = 1 - m_{i,t} - lambda cdot 	ext{noise}_{i,t}</span>
                </div>
                <div class="metrics-3-col">
                  <div class="m-card">
                    <span class="m-lbl">Missingness Rate (m_{i,t}):</span>
                    <span class="m-val">{{ missingnessRate.toFixed(2) }}</span>
                    <span class="m-sub">Proporsi checkpoint tak teramati</span>
                  </div>
                  <div class="m-card">
                    <span class="m-lbl">Noise / Telemetry Friction:</span>
                    <span class="m-val">{{ evidenceNoise.toFixed(2) }}</span>
                    <span class="m-sub">Ketidakstabilan sinyal</span>
                  </div>
                  <div class="m-card m-highlight">
                    <span class="m-lbl">Evidence Quality (q_{i,t}):</span>
                    <span class="m-val text-purple">{{ evidenceQuality.toFixed(2) }}</span>
                    <span class="m-sub"><strong>Keandalan evidensi aktual</strong></span>
                  </div>
                </div>

                <div class="stage-callout callout-blue" style="margin-top: 1rem;">
                  <span class="callout-icon">💡</span>
                  <span><strong>Distingsi Kunci:</strong> Nilai perilaku ($B_{i,t}$) berbeda dari kualitas evidensi ($q_{i,t}$). Jika $q_{i,t}$ rendah akibat sinyal drop, sistem menurunkan bobot vonis dan membatasi rekomendasi ke modalitas berbeban rendah.</span>
                </div>
              </div>
            </div>
          </div>

          <!-- MODUL 04 & MODUL 05 ROW -->
          <div class="layer-grid-2" style="margin-top: 1.5rem;">
            <!-- MODUL 04: CCBN BASELINE & CONTEXTUAL RESIDUAL -->
            <div class="card sim-panel-card" :class="{ 'step-highlight-active': simulationActiveStep === 2 }">
              <div class="panel-head">
                <div class="panel-head-left">
                  <span class="icon-pulse emerald">⚖️</span>
                  <div>
                    <span class="mod-num-badge badge-emerald">MODUL 04</span>
                    <h3 class="panel-title">Baseline Perilaku CCBN (b̂_{i,t}) & Contextual Residual (d_{i,t})</h3>
                  </div>
                </div>
                <div class="panel-head-right">
                  <button class="btn-inspect-modal" @click.stop="openModuleModal(4)" title="Buka Detail Komputasi & Telemetri">
                    <span>🔍 Detail</span>
                  </button>
                  <span class="code-pill pill-emerald">Persamaan (5) & (6)</span>
                </div>
              </div>

              <div class="sufficiency-card-body">
                <div class="suff-metrics-grid">
                  <div class="suff-kpi-item">
                    <span class="suff-kpi-lbl">Behavioral Outcome (B_{i,t})</span>
                    <span class="suff-kpi-val text-blue">{{ behavioralEvidence.toFixed(2) }}</span>
                  </div>
                  <div class="suff-kpi-item">
                    <span class="suff-kpi-lbl">Expected Baseline (b̂_{i,t})</span>
                    <span class="suff-kpi-val text-purple">{{ contextualBaseline.toFixed(2) }}</span>
                  </div>
                  <div class="suff-kpi-item">
                    <span class="suff-kpi-lbl">Contextual Residual (d_{i,t})</span>
                    <span class="suff-kpi-val" :style="{ color: deltaBColor }">{{ liveResidual >= 0 ? '+' : '' }}{{ liveResidual.toFixed(2) }}</span>
                  </div>
                  <div class="suff-kpi-item">
                    <span class="suff-kpi-lbl">Evidence Sufficiency (LS)</span>
                    <span class="suff-kpi-val text-amber">{{ behavioralEvidence.toFixed(2) }}</span>
                  </div>
                </div>

                <div class="suff-score-banner" :class="isSufficient ? 'banner-sufficient' : 'banner-insufficient'">
                  <div class="suff-score-left">
                    <span class="score-banner-label">CONTEXT-ADJUSTED RESIDUAL EVALUATION</span>
                    <div class="score-banner-num-row">
                      <span class="score-banner-val">{{ liveResidual >= 0 ? '+' : '' }}{{ liveResidual.toFixed(2) }}</span>
                      <span class="score-banner-threshold">Baseline Wajar: {{ contextualBaseline.toFixed(2) }}</span>
                    </div>
                  </div>
                  <div class="suff-score-right">
                    <div class="suff-verdict-badge" :class="liveResidual >= -0.05 ? 'badge-green' : 'badge-amber'">
                      <span class="verdict-icon">{{ liveResidual >= -0.05 ? '●' : '○' }}</span>
                      <span class="verdict-text">{{ liveResidual >= -0.05 ? 'RESIDUAL POSITIF / WAJAR' : 'DEVIASI MEMERLUKAN DUKUNGAN' }}</span>
                    </div>
                  </div>
                </div>

                <div class="insight-highlight-callout">
                  <div class="ihc-head">
                    <span class="ihc-icon">💡</span>
                    <strong>Prinsip Keadilan Epistemik: Residual Negatif ≠ Peserta Buruk</strong>
                  </div>
                  <p class="ihc-p">
                    Residual negatif ($d_{i,t} < 0$) diposisikan sebagai indikator kebutuhan <strong>dukungan belajar alternatif</strong> (misal switch ke teks/audio mikro atau microlearning), bukan sebagai dasar penilaian kedisiplinan atau sanksi administratif.
                  </p>
                </div>
              </div>
            </div>

            <!-- MODUL 05: BASELINE VALIDITY GATE (PERSAMAAN 18a-18c) -->
            <div class="card sim-panel-card" :class="{ 'step-highlight-active': simulationActiveStep === 2 }">
              <div class="panel-head">
                <div class="panel-head-left">
                  <span class="icon-pulse blue">🛡️</span>
                  <div>
                    <span class="mod-num-badge badge-blue">MODUL 05</span>
                    <h3 class="panel-title">Baseline Validity Gate & Safeguard Observabilitas</h3>
                  </div>
                </div>
                <div class="panel-head-right">
                  <button class="btn-inspect-modal" @click.stop="openModuleModal(5)" title="Buka Detail Komputasi & Telemetri">
                    <span>🔍 Detail</span>
                  </button>
                  <span class="code-pill pill-blue">Persamaan (18a)–(18c)</span>
                </div>
              </div>

              <div class="timeline-card-body">
                <div class="gate-status-card" :class="'gate-' + validityResult.state">
                  <div class="gate-head">
                    <span class="gate-tag">BASELINE VALIDITY STATUS:</span>
                    <strong class="gate-val">{{ validityResult.state.toUpperCase() }}</strong>
                  </div>
                  <p class="gate-desc">
                    {{ validityResult.message }}
                  </p>
                  <div class="gate-params-grid">
                    <div class="gp-item">
                      <span>Spatial Index S_{i,t}:</span>
                      <strong>{{ spatialIndex.toFixed(2) }} (Ambang: &theta;_S = {{ DEFAULT_VALIDITY_THRESHOLDS.thetaSpatial }}, &theta;'_S = {{ DEFAULT_VALIDITY_THRESHOLDS.thetaSpatialBoundary }})</strong>
                    </div>
                    <div class="gp-item">
                      <span>Evidence Quality q_{i,t}:</span>
                      <strong>{{ evidenceQuality.toFixed(2) }} (Ambang: &theta;_q = {{ DEFAULT_VALIDITY_THRESHOLDS.thetaQuality }}, &theta;'_q = {{ DEFAULT_VALIDITY_THRESHOLDS.thetaQualityBoundary }})</strong>
                    </div>
                  </div>
                </div>

                <div class="gate-rules-explanation">
                  <div class="gr-item" :class="{ active: validityResult.state === 'valid' }">
                    <span class="gr-dot green"></span>
                    <div>
                      <strong>18a: VALID (S &ge; &theta;_S &and; q &ge; &theta;_q)</strong>
                      <span>Residual dihitung normal; rekomendasi adaptif otomatis diizinkan.</span>
                    </div>
                  </div>
                  <div class="gr-item" :class="{ active: validityResult.state === 'boundary' }">
                    <span class="gr-dot amber"></span>
                    <div>
                      <strong>18b: BOUNDARY (&theta;'_S &le; S &lt; &theta;_S &or; &theta;'_q &le; q &lt; &theta;_q)</strong>
                      <span>Residual berkepercayaan rendah; dibatasi pada dukungan berbeban rendah.</span>
                    </div>
                  </div>
                  <div class="gr-item" :class="{ active: validityResult.state === 'invalid' }">
                    <span class="gr-dot red"></span>
                    <div>
                      <strong>18c: INVALID (S &lt; &theta;'_S &or; q &lt; &theta;'_q)</strong>
                      <span>Not observable: Eskalasi langsung ke Human-in-the-Loop tanpa rekomendasi otomatis.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ===================================================================== -->
        <!-- TAHAP 3: FAIRNESS (MODUL 06 & 11)                                     -->
        <!-- ===================================================================== -->
        <section class="lab-layer-section">
          <div class="layer-section-header">
            <div class="layer-pill">TAHAP 3: FAIRNESS & EVALUATION (CONTEXTUAL DISPARITY & METRICS)</div>
            <span class="layer-desc">Evaluasi disparitas kelompok D_t, Recommendation Burden Gap (Eq. 8a), Interpretation Error Gap (Eq. 8b), dan 7 Metrik Keadilan Spasial [Persamaan 7, 8, 8a, 8b, 11–17]</span>
          </div>

          <div class="layer-grid-2">
            <!-- MODUL 06: CONTEXTUAL DISPARITY & BURDEN GAP -->
            <div class="card sim-panel-card" :class="{ 'step-highlight-active': simulationActiveStep === 3 }">
              <div class="panel-head">
                <div class="panel-head-left">
                  <span class="icon-pulse rose">⚖️</span>
                  <div>
                    <span class="mod-num-badge badge-rose">MODUL 06</span>
                    <h3 class="panel-title">Contextual Disparity (D_t) & Beban Rekomendasi</h3>
                  </div>
                </div>
                <div class="panel-head-right">
                  <button class="btn-inspect-modal" @click.stop="openModuleModal(6)" title="Buka Detail Komputasi & Telemetri">
                    <span>🔍 Detail</span>
                  </button>
                  <span class="code-pill pill-rose">Persamaan (7), (8), (8a), (8b)</span>
                </div>
              </div>

              <div class="fairness-spec-card">
                <div class="f-spec-head">
                  <span class="f-title">GROUP DISPARITY EVALUATION</span>
                  <span class="f-badge">Disparity Metric (D_t)</span>
                </div>
                <div class="f-metrics-grid">
                  <div class="f-cell">
                    <span class="fk">Individual Residual (d_{i,t}):</span>
                    <span class="fv text-emerald">{{ liveResidual >= 0 ? '+' : '' }}{{ liveResidual.toFixed(2) }}</span>
                  </div>
                  <div class="f-cell">
                    <span class="fk">Group Disparity Gap (D_t):</span>
                    <span class="fv text-amber">{{ liveDisparityGap.toFixed(2) }}* (Synthetic)</span>
                  </div>
                  <div class="f-cell">
                    <span class="fk">Recommendation Burden (Eq. 8a):</span>
                    <span class="fv text-blue">&le; 0.12* (Toleransi Rendah)</span>
                  </div>
                  <div class="f-cell">
                    <span class="fk">Interpretation Error Gap (Eq. 8b):</span>
                    <span class="fv text-emerald">&Delta;MAE = 0.04* (&lt; 0.05)</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- MODUL 11: 7 SPATIAL FAIRNESS METRICS BENCHMARK -->
            <div class="card sim-panel-card" :class="{ 'step-highlight-active': simulationActiveStep === 3 }">
              <div class="panel-head">
                <div class="panel-head-left">
                  <span class="icon-pulse rose">📊</span>
                  <div>
                    <span class="mod-num-badge badge-rose">MODUL 11</span>
                    <h3 class="panel-title">7 Metrik Fairness Spasial & Komparasi Algoritma</h3>
                  </div>
                </div>
                <div class="panel-head-right">
                  <button class="btn-inspect-modal" @click.stop="openModuleModal(11)" title="Buka Detail Komputasi & Telemetri">
                    <span>🔍 Detail</span>
                  </button>
                  <span class="code-pill pill-rose">Persamaan (11)–(17)</span>
                </div>
              </div>

              <div class="benchmark-body">
                <span class="sub-sec-title">Perbandingan Performa Simulatif & Disparity Gap:</span>
                <table class="benchmark-table">
                  <thead>
                    <tr>
                      <th>Algorithm Approach</th>
                      <th>Expected Utility*</th>
                      <th>Disparity Gap (D)*</th>
                      <th>Karakteristik Operasional</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="bench in benchmarkAlgorithms" :key="bench.name">
                      <td><strong>{{ bench.name }}</strong></td>
                      <td><span class="tbl-badge">{{ bench.reward }}</span></td>
                      <td><span class="tbl-badge" :class="bench.disparity.includes('0.15') ? 'badge-emerald' : 'badge-rose'">{{ bench.disparity }}</span></td>
                      <td class="text-slate">{{ bench.note }}</td>
                    </tr>
                  </tbody>
                </table>
                <span class="bench-footnote">*SYNTHETIC PROTOTYPE VALUES — NOT EMPIRICAL RESULTS (Nilai simulasi ilustratif untuk pengujian logika artefak).</span>
              </div>
            </div>
          </div>
        </section>

        <!-- ===================================================================== -->
        <!-- TAHAP 4: DECISION (MODUL 07 & 08)                                     -->
        <!-- ===================================================================== -->
        <section class="lab-layer-section">
          <div class="layer-section-header">
            <div class="layer-pill">TAHAP 4: DECISION (ADAPTIVE REWARD & HITL GOVERNANCE)</div>
            <span class="layer-desc">Pemilihan aksi intervensi adaptif suportif LinUCB berbasis reward terkalibrasi multi-objektif (Eq. 9) dan tata kelola Human-in-the-Loop [Persamaan 9, 17]</span>
          </div>

          <div class="layer-grid-2">
            <!-- MODUL 07: CALIBRATED REWARD & LINUCB SELECTION -->
            <div class="card sim-panel-card" :class="{ 'step-highlight-active': simulationActiveStep === 4 }">
              <div class="panel-head">
                <div class="panel-head-left">
                  <span class="icon-pulse purple">🧠</span>
                  <div>
                    <span class="mod-num-badge badge-purple">MODUL 07</span>
                    <h3 class="panel-title">Reward Terkalibrasi & Pemilihan Aksi LinUCB</h3>
                  </div>
                </div>
                <div class="panel-head-right">
                  <button class="btn-inspect-modal" @click.stop="openModuleModal(7)" title="Buka Detail Komputasi & Telemetri">
                    <span>🔍 Detail</span>
                  </button>
                  <span class="code-pill pill-purple">Persamaan (9) & LinUCB</span>
                </div>
              </div>

              <div>
                <span class="sub-sec-title">Candidate Action Space & Trade-off Scoring (Eq. 9):</span>
                <div class="candidate-actions-grid">
                  <div class="action-item-box" :class="{ active: selectedActionKey === 'A1' }">
                    <div class="act-top-row">
                      <span class="act-id">A1</span>
                      <span class="act-score-tag">Score: 0.88*</span>
                    </div>
                    <span class="act-item-title">Video HD + Case Study</span>
                    <span class="act-constraint-note">> 2 Mbps (Tinggi Beban)</span>
                  </div>

                  <div class="action-item-box" :class="{ active: selectedActionKey === 'A2' }">
                    <div class="act-top-row">
                      <span class="act-id">A2</span>
                      <span class="act-score-tag text-emerald">Score: 0.71* (Selected)</span>
                    </div>
                    <span class="act-item-title">Text-First + Audio Mikro</span>
                    <span class="act-constraint-note text-emerald">✓ Hemat Bandwidth (< 200k)</span>
                  </div>

                  <div class="action-item-box" :class="{ active: selectedActionKey === 'A3' }">
                    <div class="act-top-row">
                      <span class="act-id">A3</span>
                      <span class="act-score-tag">Score: 0.74*</span>
                    </div>
                    <span class="act-item-title">Interactive Scenario Check</span>
                    <span class="act-constraint-note">Dukungan Konseptual</span>
                  </div>

                  <div class="action-item-box" :class="{ active: selectedActionKey === 'A4' }">
                    <div class="act-top-row">
                      <span class="act-id">A4</span>
                      <span class="act-score-tag">Score: 0.79*</span>
                    </div>
                    <span class="act-item-title">Dynamic Micro-Chunking</span>
                    <span class="act-constraint-note">Penyesuaian Beban Kerja</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- MODUL 08: REASONING CHAIN & HITL REVIEW -->
            <div class="card sim-panel-card" :class="{ 'step-highlight-active': simulationActiveStep === 4 }">
              <div class="panel-head">
                <div class="panel-head-left">
                  <span class="icon-pulse cyan">🔍</span>
                  <div>
                    <span class="mod-num-badge badge-cyan">MODUL 08</span>
                    <h3 class="panel-title">Rantai Penalaran Transparan & Tata Kelola HITL</h3>
                  </div>
                </div>
                <div class="panel-head-right">
                  <button class="btn-inspect-modal" @click.stop="openModuleModal(8)" title="Buka Detail Komputasi & Telemetri">
                    <span>🔍 Detail</span>
                  </button>
                  <span class="code-pill pill-cyan">Explainable XAI + HITL</span>
                </div>
              </div>

              <div class="why-card-body">
                <div class="why-summary-grid">
                  <div class="why-row">
                    <span class="why-k">1. Konteks 6D (c_{i,t}):</span>
                    <span class="why-v">✓ Bandwidth {{ bandwidthKbps }} kbps • Latensi {{ latencyMs }} ms • {{ deviceName }} • Beban Kerja {{ workloadLevel }}/5</span>
                  </div>
                  <div class="why-row">
                    <span class="why-k">2. Kualitas Evidensi (q_{i,t}):</span>
                    <span class="why-v text-purple">q_{i,t} = {{ evidenceQuality.toFixed(2) }} (Missingness m_{i,t} = {{ missingnessRate.toFixed(2) }})</span>
                  </div>
                  <div class="why-row">
                    <span class="why-k">3. Baseline CCBN (b̂_{i,t}):</span>
                    <span class="why-v">Expected Baseline: {{ contextualBaseline.toFixed(2) }}</span>
                  </div>
                  <div class="why-row">
                    <span class="why-k">4. Contextual Residual (d_{i,t}):</span>
                    <span class="why-v text-emerald"><strong>{{ liveResidual >= 0 ? '+' : '' }}{{ liveResidual.toFixed(2) }}</strong> (Residual Wajar — Dukungan Adaptif Suportif)</span>
                  </div>
                  <div class="why-row">
                    <span class="why-k">5. Status Baseline Gate:</span>
                    <span class="why-v text-emerald"><strong>{{ validityResult.state.toUpperCase() }}</strong> ({{ validityResult.message }})</span>
                  </div>
                  <div class="why-row highlight-why">
                    <span class="why-k">6. Rekomendasi Aksi:</span>
                    <span class="why-v text-emerald">
                      <strong>{{ selectedActionKey === 'A2' ? 'Text-First + Audio Mikro (A2)' : selectedActionKey === 'A4' ? 'Dynamic Microlearning (A4)' : 'Interactive Scenario (A3)' }}</strong>
                    </span>
                  </div>
                </div>

                <!-- HITL Decision Support Governance Flow -->
                <div class="hitl-governance-box" style="margin-top: 1rem;">
                  <span class="hitl-gov-title">🏛️ Decision-Support Governance Pipeline (Human-in-the-Loop):</span>
                  <div class="hitl-flow-steps">
                    <div class="hf-step">Sistem (CABA-CCBN)</div>
                    <div class="hf-arrow">➔</div>
                    <div class="hf-step hf-rec">Rekomendasi Suportif</div>
                    <div class="hf-arrow">➔</div>
                    <div class="hf-step hf-human">Review Widyaiswara (Audit/Override)</div>
                    <div class="hf-arrow">➔</div>
                    <div class="hf-step hf-act">Intervensi LMS Non-Punitif</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ===================================================================== -->
        <!-- TAHAP 5: LEARNING LOOP (MODUL 09, 10, 12)                             -->
        <!-- ===================================================================== -->
        <section class="lab-layer-section">
          <div class="layer-section-header">
            <div class="layer-pill">TAHAP 5: LEARNING LOOP (REWARD TRAJECTORY, MODEL UPDATE & RECALIBRATION)</div>
            <span class="layer-desc">Pencatatan trajektori online, pembaruan parameter bandit θ_a, simulator pergeseran konteks (t1 ⇌ t2), dan pengatur trade-off penalti disparitas (λ Controller)</span>
          </div>

          <div class="layer-grid-2">
            <!-- MODUL 09: CONTEXT SHIFT SIMULATOR -->
            <div class="card sim-panel-card" :class="{ 'step-highlight-active': simulationActiveStep === 5 }">
              <div class="panel-head">
                <div class="panel-head-left">
                  <span class="icon-pulse amber">🔀</span>
                  <div>
                    <span class="mod-num-badge badge-amber">MODUL 09</span>
                    <h3 class="panel-title">Simulator Pergeseran Konteks Dinamis (Context Shift)</h3>
                  </div>
                </div>
                <div class="panel-head-right">
                  <button class="btn-inspect-modal" @click.stop="openModuleModal(9)" title="Buka Detail Komputasi & Telemetri">
                    <span>🔍 Detail</span>
                  </button>
                  <span class="code-pill pill-amber">Δc_{i,t} Adaptation</span>
                </div>
              </div>

              <div class="context-shift-body">
                <div class="shift-control-bar">
                  <button class="btn-shift-toggle" @click="toggleContextShift">
                    <span>{{ contextShiftState === 't1' ? '▶ Simulasi Shift Konteks (t1 → t2)' : '↺ Reset ke State Awal (t2 → t1)' }}</span>
                  </button>
                  <span class="shift-state-indicator">
                    State: <strong>{{ contextShiftState === 't1' ? 'State t1 (3T Terkendala)' : 'State t2 (WiFi Kantor Lancar)' }}</strong>
                  </span>
                </div>

                <div class="shift-flow-container">
                  <!-- State t1 -->
                  <div class="shift-state-card" :class="{ active: contextShiftState === 't1' }">
                    <span class="state-badge">STATE t1 (KENDALA 3T)</span>
                    <ul class="state-list">
                      <li><span>Bandwidth:</span> <strong>110 kbps</strong></li>
                      <li><span>Perangkat:</span> <strong>Smartphone</strong></li>
                      <li><span>Beban Kerja:</span> <strong>4 / 5 (Tinggi)</strong></li>
                    </ul>
                    <div class="state-result">
                      <span class="res-lbl">Aksi Terpilih:</span>
                      <span class="res-act text-blue">Text-First + Audio Mikro</span>
                      <span class="res-r">Reward: 0.71*</span>
                    </div>
                  </div>

                  <div class="shift-arrow-col">
                    <span class="arrow-sym">➔</span>
                    <span class="arrow-txt">SHIFT</span>
                  </div>

                  <!-- State t2 -->
                  <div class="shift-state-card" :class="{ active: contextShiftState === 't2' }">
                    <span class="state-badge badge-emerald">STATE t2 (WIFI KANTOR)</span>
                    <ul class="state-list">
                      <li><span>Bandwidth:</span> <strong>8000 kbps</strong></li>
                      <li><span>Perangkat:</span> <strong>Desktop</strong></li>
                      <li><span>Beban Kerja:</span> <strong>2 / 5 (Rendah)</strong></li>
                    </ul>
                    <div class="state-result">
                      <span class="res-lbl">Aksi Terpilih:</span>
                      <span class="res-act text-emerald">Video HD + Interactive</span>
                      <span class="res-r">Reward: 0.88*</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- MODUL 12: MULTI-OBJECTIVE TRADE-OFF CONTROLLER -->
            <div class="card sim-panel-card" :class="{ 'step-highlight-active': simulationActiveStep === 5 }">
              <div class="panel-head">
                <div class="panel-head-left">
                  <span class="icon-pulse emerald">🎛️</span>
                  <div>
                    <span class="mod-num-badge badge-emerald">MODUL 12</span>
                    <h3 class="panel-title">Kontroler Trade-off Multi-Objektif Reward ↔ Disparitas (λ / γ)</h3>
                  </div>
                </div>
                <div class="panel-head-right">
                  <button class="btn-inspect-modal" @click.stop="openModuleModal(12)" title="Buka Detail Komputasi & Telemetri">
                    <span>🔍 Detail</span>
                  </button>
                  <span class="code-pill pill-emerald">Multi-Objective Controller</span>
                </div>
              </div>

              <div class="tradeoff-container">
                <div class="to-head">
                  <span class="sub-sec-title">Bobot Penalti Disparitas (γ / λ):</span>
                  <span class="lambda-badge">λ = {{ lambdaWeight.toFixed(2) }}</span>
                </div>
                <input type="range" min="0.0" max="1.0" step="0.05" v-model.number="lambdaWeight" class="slider lambda-slider" />
                <div class="tradeoff-pills-row" style="margin-top: 1rem;">
                  <div class="to-pill">
                    <span class="to-k">Efektivitas Agregat*:</span>
                    <span class="to-v text-slate">{{ dynamicOverallReward.toFixed(2) }}</span>
                  </div>
                  <div class="to-pill">
                    <span class="to-k">Disparity Gap (D_t)*:</span>
                    <span class="to-v text-emerald">{{ liveDisparityGap.toFixed(2) }} (-{{ liveGapReductionPct }}%)</span>
                  </div>
                  <div class="to-pill">
                    <span class="to-k">3T Outcome Estimasi*:</span>
                    <span class="to-v text-emerald">{{ dynamic3TOutcome.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- MODUL 10: REWARD TRAJECTORY & ONLINE UPDATE -->
          <div class="card sim-panel-card" :class="{ 'step-highlight-active': simulationActiveStep === 5 }" style="margin-top: 1.5rem;">
            <div class="panel-head">
              <div class="panel-head-left">
                <span class="icon-pulse emerald">📈</span>
                <div>
                  <span class="mod-num-badge badge-emerald">MODUL 10</span>
                  <h3 class="panel-title">Trajektori Reward & Pembaruan Parameter Model (Online Update)</h3>
                </div>
              </div>
              <div class="panel-head-right">
                <button class="btn-inspect-modal" @click.stop="openModuleModal(10)" title="Buka Detail Komputasi & Telemetri">
                  <span>🔍 Detail</span>
                </button>
                <span class="code-pill pill-emerald">θ_{a,t+1} Online Ridge Update</span>
              </div>
            </div>

            <div class="trajectory-card-body">
              <div class="trajectory-chart-wrap">
                <div class="chart-y-axis">
                  <span>1.0</span>
                  <span>0.8</span>
                  <span>0.6</span>
                  <span>0.4</span>
                </div>
                <div class="chart-canvas">
                  <svg class="chart-svg" viewBox="0 0 500 120" preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke="#10B981"
                      stroke-width="3"
                      points="40,58 120,48 200,36 280,24 360,42 440,18"
                    />
                    <circle cx="40" cy="58" r="5" fill="#3B82F6" />
                    <circle cx="120" cy="48" r="5" fill="#3B82F6" />
                    <circle cx="200" cy="36" r="5" fill="#10B981" />
                    <circle cx="280" cy="24" r="5" fill="#10B981" />
                    <circle cx="360" cy="42" r="5" fill="#F59E0B" />
                    <circle cx="440" cy="18" r="6" fill="#059669" />
                  </svg>
                  <div class="chart-x-labels">
                    <span>t1 (0.71*)</span>
                    <span>t2 (0.76*)</span>
                    <span>t3 (0.82*)</span>
                    <span>t4 (0.88*)</span>
                    <span>t5 (0.79*)</span>
                    <span>t6 (0.91*)</span>
                  </div>
                </div>
              </div>

              <div class="trajectory-table-wrap">
                <table class="traj-table">
                  <thead>
                    <tr>
                      <th>Step</th>
                      <th>Context (c_{i,t})</th>
                      <th>Action (a_t)</th>
                      <th>Reward (r_t)*</th>
                      <th>Model Parameter Update (θ_a)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="log in trajectoryLogs" :key="log.t">
                      <td><span class="tbl-badge">{{ log.t }}</span></td>
                      <td>{{ log.context }}</td>
                      <td><strong>{{ log.action }}</strong></td>
                      <td><span class="tbl-badge badge-emerald">{{ log.reward }}*</span></td>
                      <td><code class="code-sm">{{ log.update }}</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

      </div>

      <!-- ========================================================================= -->
      <!-- SECTION 10: MATHEMATICAL MODEL — CABA-CCBN REFERENCE PANEL (GROUPS A-G)   -->
      <!-- ========================================================================= -->
      <section class="card math-ref-panel-section">
        <div class="math-ref-head" @click="isMathPanelCollapsed = !isMathPanelCollapsed" style="cursor: pointer;">
          <div class="badge-row">
            <span class="badge badge-indigo">📐 SECTION 10 · MATHEMATICAL MODEL</span>
            <span class="badge badge-blue">Formulasi Lengkap CABA–CCBN</span>
            <span class="badge badge-cyan">Grup A s/d G (Proposal Revisi 2)</span>
            <span class="badge badge-yellow" style="margin-left: auto;">{{ isMathPanelCollapsed ? '▼ Buka Panel' : '▲ Tutup Panel' }}</span>
          </div>
          <h2 class="math-ref-title">Mathematical Model — CABA–CCBN Reference Taxonomy</h2>
          <p class="math-ref-desc">
            Rangkuman taksonomi persamaan operasional lengkap dari Proposal Disertasi Revisi 2, dikelompokkan ke dalam 7 klaster matematis beserta definisi variabel, interpretasi ilmiah, dan perannya dalam pipeline.
          </p>
        </div>

        <div v-show="!isMathPanelCollapsed" class="math-groups-grid" style="margin-top: 1.25rem;">
          <!-- GROUP A: Evidence Formation -->
          <div class="math-group-card border-blue">
            <div class="mg-head">
              <span class="mg-pill pill-blue">GRUP A</span>
              <h3 class="mg-title">Evidence Formation (Persamaan 1–4)</h3>
            </div>
            <div class="mg-eq-list">
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (1) Raw Traces:</strong> <code>X_{i,t} = [	ext{login}, 	ext{durasi}, 	ext{clickstream}, 	ext{completion}, 	ext{artifact}, dots]</code></div>
                <p class="mg-eq-desc"><strong>Definisi:</strong> Vektor telemetri mentah LMS. $X$ bukan label langsung kompetensi atau motivasi; $B_{i,t}$ dibentuk dari $X_{i,t}$.</p>
              </div>
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (2) Konteks 6D:</strong> <code>c_{i,t} = [T_{i,t}, I_{i,t}, O_{i,t}, D_{i,t}, W_{i,t}, S_{i,t}]</code></div>
                <p class="mg-eq-desc"><strong>Definisi:</strong> Temporal ($T$), Infrastruktur ($I$), Organisasi ($O$), Perangkat ($D$), Beban Kerja ($W$), Spasial ($S$). Kuesioner menjadi sumber data konteks.</p>
              </div>
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (2a–2c) Spasial Komposit:</strong> <code>S_{i,t} = delta K_i + (1 - delta) N_{i,t}</code></div>
                <p class="mg-eq-desc"><strong>Definisi:</strong> Menggabungkan klaster makro terbuka $K_i$ (BPS, Podes, Ookla) dengan kualitas jaringan sesi $N_{i,t}$ (latensi, buffering, retry).</p>
              </div>
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (3) & (4) Missingness & Quality:</strong> <code>m_{i,t} = 1 - rac{n_{	ext{obs}}}{n_{	ext{exp}}}, quad q_{i,t} = 1 - m_{i,t} - lambda cdot 	ext{noise}_{i,t}</code></div>
                <p class="mg-eq-desc"><strong>Definisi:</strong> Mengukur batas observabilitas sistem (MNAR). Data hilang tidak otomatis divonis sebagai kelalaian belajar.</p>
              </div>
            </div>
          </div>

          <!-- GROUP B: Context-Conditioned Baseline -->
          <div class="math-group-card border-purple">
            <div class="mg-head">
              <span class="mg-pill pill-purple">GRUP B</span>
              <h3 class="mg-title">Context-Conditioned Baseline (Persamaan 5–6)</h3>
            </div>
            <div class="mg-eq-list">
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (5) Expected Baseline CCBN:</strong> <code>hat{b}_{i,t} = mathbb{E}[B_{i,t} mid c_{i,t}, q_{i,t}] = f(c_{i,t}, q_{i,t})</code></div>
                <p class="mg-eq-desc"><strong>Definisi:</strong> Estimator perilaku wajar yang diekspektasikan pada kondisi kendala $c_{i,t}$ dan keandalan $q_{i,t}$. Inti inovasi CCBN.</p>
              </div>
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (6) Contextual Residual:</strong> <code>d_{i,t} = B_{i,t} - hat{b}_{i,t}</code></div>
                <p class="mg-eq-desc"><strong>Definisi:</strong> Selisih individual antara bukti aktual $B_{i,t}$ dan baseline $hat{b}_{i,t}$. Memisahkan kendala akses dari kebutuhan dukungan belajar.</p>
              </div>
            </div>
          </div>

          <!-- GROUP C: Contextual Disparity & Burden -->
          <div class="math-group-card border-rose">
            <div class="mg-head">
              <span class="mg-pill pill-rose">GRUP C</span>
              <h3 class="mg-title">Contextual Disparity & Burden (Persamaan 7, 8, 8a, 8b)</h3>
            </div>
            <div class="mg-eq-list">
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (7) Contextual Disparity:</strong> <code>D_t = 	ext{disparity}(d_{i,t} mid 	ext{context/group})</code></div>
                <p class="mg-eq-desc"><strong>Definisi:</strong> Disparitas tingkat kelompok agregat dari distribusi residual $d_{i,t}$. Jelas berbeda dari residual individu $d_{i,t}$.</p>
              </div>
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (8) Contextual Burden:</strong> <code>CB_{i,a,t} = 	ext{cost}_a(c_{i,t}, Delta c_{i,t})</code></div>
                <p class="mg-eq-desc"><strong>Definisi:</strong> Beban kontekstual pelaksanaan aksi $a$ (kebutuhan kuota, waktu belajar, beban operasional dinas).</p>
              </div>
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (8a) Recommendation Burden Gap:</strong> <code>	ext{Gap}_{	ext{burden}} = max_{g,h} |mathbb{E}[CB mid g] - mathbb{E}[CB mid h]|</code></div>
                <p class="mg-eq-desc"><strong>Definisi:</strong> Memastikan intervensi berat tidak membebani wilayah berinfrastruktur rendah secara timpang.</p>
              </div>
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (8b) Interpretation Error Gap:</strong> <code>	ext{Gap}_{	ext{interpretation}} = max_{g,h} |	ext{MAE}_g(d) - 	ext{MAE}_h(d)|</code></div>
                <p class="mg-eq-desc"><strong>Definisi:</strong> Guardrail epistemik untuk memastikan akurasi pembacaan residual tidak timpang antar wilayah.</p>
              </div>
            </div>
          </div>

          <!-- GROUP D: Adaptive Decision -->
          <div class="math-group-card border-emerald">
            <div class="mg-head">
              <span class="mg-pill pill-emerald">GRUP D</span>
              <h3 class="mg-title">Adaptive Decision (Persamaan 9 & LinUCB)</h3>
            </div>
            <div class="mg-eq-list">
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (9) Calibrated Multi-Objective Reward:</strong> <code>r'_{i,a,t+1} = r_{i,a,t} + eta_t U(a, d_{i,t}) - mu_t CB_{i,a,t} - 
u_t OB_{i,a,t} - ho_t Delta c_{i,t} - gamma_t D_t</code></div>
                <p class="mg-eq-desc"><strong>Definisi:</strong> Fungsi optimasi keputusan yang menyeimbangkan utility belajar $U$, beban kontekstual $CB$, beban dinas $OB$, pergeseran konteks $Delta c$, dan penalti disparitas $D_t$. LinUCB berperan sebagai decision layer operasional.</p>
              </div>
            </div>
          </div>

          <!-- GROUP E: Multimodal Observability -->
          <div class="math-group-card border-cyan">
            <div class="mg-head">
              <span class="mg-pill pill-cyan">GRUP E</span>
              <h3 class="mg-title">Multimodal Observability (Persamaan 10, 10a)</h3>
            </div>
            <div class="mg-eq-list">
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (10) Observability Weight:</strong> <code>w(S_{i,t}, q_{	ext{visual},i,t}) = sigma(alpha_1 (1 - S_{i,t}) + alpha_2 q_{	ext{visual},i,t})</code></div>
                <p class="mg-eq-desc"><strong>Definisi:</strong> Bobot sigmoid yang menurunkan ketergantungan pada sinyal visual saat koneksi/kamera drop.</p>
              </div>
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (10a) Multimodal Fusion:</strong> <code>F_{i,t} = w_{i,t} V_{i,t} + (1 - w_{i,t}) b_{	ext{LMS},i,t}</code></div>
                <p class="mg-eq-desc"><strong>Definisi:</strong> Fusi terbatas di mana sinyal visual hanya menjadi pendukung observabilitas, bukan vonis mutlak.</p>
              </div>
            </div>
          </div>

          <!-- GROUP F: Fairness & Robustness Evaluation -->
          <div class="math-group-card border-amber">
            <div class="mg-head">
              <span class="mg-pill pill-amber">GRUP F</span>
              <h3 class="mg-title">Fairness & Robustness Evaluation (Persamaan 11–17)</h3>
            </div>
            <div class="mg-eq-list">
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (11) Spatial Performance Gap:</strong> <code>max_{g,h} |L_{g,t}(d) - L_{h,t}(d)|</code></div>
                <p class="mg-eq-desc">Evaluasi galat residual terhadap status komplesi substantif antar klaster wilayah.</p>
              </div>
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (12) Low-Engagement Misinterpretation Gap:</strong> <code>max_{g,h} |P(	ext{low}(d)=1 mid 	ext{complete}, g) - P(dots mid h)|</code></div>
                <p class="mg-eq-desc">Menguji risiko kesalahan interpretasi residual negatif sebagai low engagement pada peserta yang menyelesaikan materi.</p>
              </div>
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (13a–13c) FPR / FNR Gap:</strong> <code>max_{g,h} { |FPR_g - FPR_h|, |FNR_g - FNR_h| }</code></div>
                <p class="mg-eq-desc">Keseimbangan kesalahan pembacaan residual risiko antar wilayah dengan batas kualitas evidensi $q ge 	au_q$.</p>
              </div>
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (14)–(17):</strong> Calibration Error Gap (14), Missingness Bias Gap (15), Visual Observability Gap (16, 16a), Human Override Rate Gap (17).</div>
              </div>
            </div>
          </div>

          <!-- GROUP G: Baseline Validity Gate -->
          <div class="math-group-card border-emerald">
            <div class="mg-head">
              <span class="mg-pill pill-emerald">GRUP G</span>
              <h3 class="mg-title">Baseline Validity Gate (Persamaan 18a–18c)</h3>
            </div>
            <div class="mg-eq-list">
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (18a) VALID:</strong> <code>	ext{status} = 	ext{VALID if } S_{i,t} ge 	heta_S land q_{i,t} ge 	heta_q</code></div>
                <p class="mg-eq-desc">Data cukup teramati; residual dihitung penuh dan dapat memicu adaptasi normal.</p>
              </div>
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (18b) BOUNDARY:</strong> <code>	ext{status} = 	ext{BOUNDARY if } 	heta'_S le S < 	heta_S lor 	heta'_q le q < 	heta_q</code></div>
                <p class="mg-eq-desc">Zona batas observabilitas; kepercayaan rendah, dibatasi pada rekomendasi berbeban rendah.</p>
              </div>
              <div class="mg-eq-item">
                <div class="mg-eq-token"><strong>Eq. (18c) INVALID:</strong> <code>	ext{status} = 	ext{INVALID if } S_{i,t} < 	heta'_S lor q_{i,t} < 	heta'_q</code></div>
                <p class="mg-eq-desc">Not observable; tidak menjalankan rekomendasi otomatis, eskalasi langsung ke Human-in-the-Loop.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- SECTION 11: PROPOSAL ↔ APPLICATION TRACEABILITY MATRIX PANEL              -->
      <!-- ========================================================================= -->
      <section class="card traceability-section">
        <div class="trace-head">
          <div class="badge-row">
            <span class="badge badge-indigo">🔗 SECTION 11 · TRACEABILITY MATRIX</span>
            <span class="badge badge-emerald">Proposal Disertasi Revisi 2 ↔ Modul Aplikasi</span>
          </div>
          <h2 class="trace-title">Proposal ↔ Application Traceability Matrix</h2>
          <p class="trace-desc">
            Matriks keterlacakan end-to-end yang menjamin korespondensi 1:1 antara formula dalam naskah proposal disertasi dan implementasi modul komputasi pada aplikasi.
          </p>
        </div>

        <div class="trace-table-wrap">
          <table class="trace-table">
            <thead>
              <tr>
                <th>Komponen Proposal</th>
                <th>Persamaan</th>
                <th>Modul Aplikasi</th>
                <th>Input Data</th>
                <th>Output / Representasi</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in traceabilityList" :key="t.eq">
                <td><strong>{{ t.component }}</strong></td>
                <td><span class="tbl-badge badge-blue">{{ t.eq }}</span></td>
                <td><span class="tbl-badge badge-purple">{{ t.module }}</span></td>
                <td><code class="code-sm">{{ t.input }}</code></td>
                <td><code class="code-sm">{{ t.output }}</code></td>
                <td><span class="tbl-badge badge-emerald">Implemented</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- CCBN & Fair-LinUCB Theoretical Literature Matrix -->
      <CcbnLiteratureGrounding />

      <!-- ========================================================================= -->
      <!-- COMPUTATIONAL MODULE DETAIL MODAL DIALOG (TELEPORTED TO BODY)              -->
      <!-- ========================================================================= -->
      <Teleport to="body">
        <div v-if="isModalOpen" class="modal-backdrop" @click.self="closeModuleModal">
          <div class="modal-dialog-card">
            <!-- Modal Header -->
            <div class="modal-head">
              <div class="modal-head-left">
                <span class="mod-num-badge" :class="modalModuleData.badgeClass">{{ modalModuleData.num }}</span>
                <div>
                  <span class="modal-layer-tag">{{ modalModuleData.layer }}</span>
                  <h3 class="modal-title">{{ modalModuleData.title }}</h3>
                </div>
              </div>
              <button class="modal-close-btn" @click="closeModuleModal" title="Tutup Dialog Detail">✕</button>
            </div>

            <!-- Modal Body Content -->
            <div class="modal-body-content">
              <!-- Role / Purpose Box -->
              <div class="modal-sec-box">
                <span class="modal-sec-lbl">🎯 Peran & Tujuan Komputasi:</span>
                <p class="modal-sec-desc">{{ modalModuleData.role }}</p>
              </div>

              <!-- Mathematical Formulation -->
              <div class="modal-sec-box modal-math-box">
                <div class="modal-math-header">
                  <span class="modal-sec-lbl">📐 Formulasi Matematis & Landasan Teoretis:</span>
                  <span class="modal-eq-ref">{{ modalModuleData.equationRef }}</span>
                </div>
                <div class="modal-eq-display">
                  <code>{{ modalModuleData.formula }}</code>
                </div>
              </div>

              <!-- Live Telemetry State Grid -->
              <div class="modal-sec-box">
                <span class="modal-sec-lbl">⚡ Status Telemetri & Variabel Live (Simulator):</span>
                <div class="modal-live-grid">
                  <div v-for="(val, key) in modalModuleData.liveState" :key="key" class="live-grid-item">
                    <span class="live-k">{{ key }}:</span>
                    <span class="live-v">{{ val }}</span>
                  </div>
                </div>
              </div>

              <!-- Epistemic Insight & Causal Interpretation -->
              <div class="modal-sec-box modal-insight-box">
                <div class="modal-insight-head">
                  <span class="insight-icon">💡</span>
                  <strong>Wawasan Epistemik & Pedagogis (Non-Punitif):</strong>
                </div>
                <p class="modal-insight-desc">{{ modalModuleData.insight }}</p>
              </div>
            </div>

            <!-- Modal Footer: Navigation & Actions -->
            <div class="modal-foot">
              <div class="modal-nav-btns">
                <button class="btn-modal-nav" @click="prevModalModule">
                  <span>◀ Modul Sebelumnya</span>
                </button>
                <button class="btn-modal-nav" @click="nextModalModule">
                  <span>Modul Selanjutnya ▶</span>
                </button>
              </div>
              <button class="btn-modal-close-foot" @click="closeModuleModal">
                <span>Tutup Detail</span>
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Navbar from '~/components/Navbar.vue';
import CcbnLiteratureGrounding from '~/components/CcbnLiteratureGrounding.vue';

// Import centralized CABA-CCBN computational engine functions and constants
import {
  computeSpatialIndex,
  createContextProfile,
  computeMissingness,
  computeEvidenceQuality,
  computeBehavioralEvidence,
  computeCCBNBaseline,
  computeResidual,
  computeDisparity,
  computeContextualBurden,
  computeCalibratedReward,
  computeVisualObservabilityQuality,
  computeVisualObservabilityWeight,
  computeValidityGate,
  DEFAULT_VALIDITY_THRESHOLDS,
  selectAdaptiveAction
} from '~/utils/caba-ccbn';

// Dynamic Lambda (Disparity Penalty Weight)
const lambdaWeight = ref<number>(0.50);

// Simulator State: Context Profile (Module 01)
const currentPreset = ref<string>('3T_mobile');
const bandwidthKbps = ref<number>(110);
const latencyMs = ref<number>(520);
const deviceType = ref<'smartphone' | 'tablet' | 'desktop'>('smartphone');
const workloadLevel = ref<number>(4);
const spatialType = ref<'3T' | 'Urban'>('3T');

// Behavioral Signals (Module 02)
const observedFocus = ref<number>(0.35);
const observedRetention = ref<number>(0.70);
const videoDurationMin = ref<number>(10.0);
const watchedMin = ref<number>(6.2);
const skipEvents = ref<number>(3);
const revisitEvents = ref<number>(2);
const interactionEvents = ref<number>(8);
const sufficiencyThreshold = ref<number>(0.70);

// UI Panel State
const isMathPanelCollapsed = ref<boolean>(false);

// Trajectory Simulation Animation State
const isSimulating = ref<boolean>(false);
const simulationActiveStep = ref<number>(0);

function simulateTrajectory() {
  if (isSimulating.value) return;
  isSimulating.value = true;
  simulationActiveStep.value = 1;

  let step = 1;
  const interval = setInterval(() => {
    step++;
    if (step <= 5) {
      simulationActiveStep.value = step;
    } else {
      clearInterval(interval);
      isSimulating.value = false;
    }
  }, 800);
}

// Module 09: Context Shift Simulator State
const contextShiftState = ref<'t1' | 't2'>('t1');

function toggleContextShift() {
  if (contextShiftState.value === 't1') {
    contextShiftState.value = 't2';
    bandwidthKbps.value = 8000;
    latencyMs.value = 25;
    deviceType.value = 'desktop';
    workloadLevel.value = 2;
    spatialType.value = 'Urban';
    observedFocus.value = 0.85;
    watchedMin.value = 8.8;
  } else {
    contextShiftState.value = 't1';
    bandwidthKbps.value = 110;
    latencyMs.value = 520;
    deviceType.value = 'smartphone';
    workloadLevel.value = 4;
    spatialType.value = '3T';
    observedFocus.value = 0.35;
    watchedMin.value = 6.2;
  }
}

// Module 10: Trajectory Log Dataset (Synthetic Demo Values)
const trajectoryLogs = ref([
  { t: 't1', context: 'Low BW (120k), Phone, 3T', action: 'A2: Text-First + Audio', reward: 0.71, update: 'θ₁ update (explore text format)' },
  { t: 't2', context: 'Low BW (150k), Phone, 3T', action: 'A4: Microlearning Chunk', reward: 0.76, update: 'θ₂ update (friction down)' },
  { t: 't3', context: 'Med BW (2.5M), Desktop, Urban', action: 'A3: Interactive Scenario', reward: 0.82, update: 'θ₃ update (support bonus)' },
  { t: 't4', context: 'High BW (5M), Desktop, Urban', action: 'A1: Full Video HD', reward: 0.88, update: 'θ₄ update (high completion)' },
  { t: 't5', context: 'Mobile Rush (3G), Phone, Urban', action: 'A4: Micro-Chunking', reward: 0.79, update: 'θ₅ update (workload adapt)' },
  { t: 't6', context: 'Stable Fiber (8M), Desktop, Urban', action: 'A1 + A3: Video + Interactive', reward: 0.91, update: 'θ₆ update (optimal convergence)' }
]);

// Module 11: Benchmark Algorithms Matrix (Synthetic Demo Values)
const benchmarkAlgorithms = ref([
  { name: 'Standard Analytics (Universal Threshold)', reward: '0.68*', disparity: '0.31*', note: 'Bias punitif: menghukum data hilang di wilayah terkendala' },
  { name: 'Standard LinUCB (Tanpa Kalibrasi Disparitas)', reward: '0.71*', disparity: '0.29*', note: 'Eksploitasi format berat di perkotaan' },
  { name: 'CABA–CCBN Adaptive LinUCB (Usulan)', reward: '0.69*', disparity: '0.15*', note: 'Reduksi gap disparitas -48%* dengan rekomendasi adil' }
]);

function applyPreset(preset: string) {
  currentPreset.value = preset;
  if (preset === '3T_mobile') {
    bandwidthKbps.value = 110;
    latencyMs.value = 520;
    deviceType.value = 'smartphone';
    workloadLevel.value = 4;
    spatialType.value = '3T';
    observedFocus.value = 0.35;
    observedRetention.value = 0.70;
    watchedMin.value = 6.2;
    skipEvents.value = 3;
    revisitEvents.value = 2;
    interactionEvents.value = 8;
  } else if (preset === 'office_rush') {
    bandwidthKbps.value = 2500;
    latencyMs.value = 45;
    deviceType.value = 'desktop';
    workloadLevel.value = 5;
    spatialType.value = 'Urban';
    observedFocus.value = 0.25;
    observedRetention.value = 0.60;
    watchedMin.value = 4.5;
    skipEvents.value = 4;
    revisitEvents.value = 1;
    interactionEvents.value = 6;
  } else if (preset === 'night_study') {
    bandwidthKbps.value = 5000;
    latencyMs.value = 30;
    deviceType.value = 'desktop';
    workloadLevel.value = 1;
    spatialType.value = 'Urban';
    observedFocus.value = 0.90;
    observedRetention.value = 0.95;
    watchedMin.value = 9.8;
    skipEvents.value = 1;
    revisitEvents.value = 3;
    interactionEvents.value = 10;
  }
}

// Substantive Completion Computations
const watchCompletionRatio = computed(() => {
  return Math.min(Math.round((watchedMin.value / videoDurationMin.value) * 100), 100);
});

const interactionCoveragePct = computed(() => {
  return Math.min(Math.round((interactionEvents.value / 10) * 100), 100);
});

// Context & Spatial Index Computation using Engine
const spatialIndex = computed(() => {
  return computeSpatialIndex(spatialType.value, {
    bandwidthKbps: bandwidthKbps.value,
    latencyMs: latencyMs.value
  });
});

const contextProfile = computed(() => {
  return createContextProfile(
    'Sesi Mandiri / Rutin',
    bandwidthKbps.value,
    latencyMs.value,
    'Instansi Daerah',
    deviceType.value,
    workloadLevel.value,
    spatialIndex.value
  );
});

// Evidence & Missingness Computation using Engine
const missingnessRate = computed(() => {
  return computeMissingness(interactionEvents.value, 10);
});

const evidenceNoise = computed(() => {
  return Math.round((1 - observedRetention.value) * 100) / 100;
});

const evidenceQuality = computed(() => {
  return computeEvidenceQuality(missingnessRate.value, evidenceNoise.value);
});

const behavioralEvidence = computed(() => {
  return computeBehavioralEvidence({
    loginCount: 1,
    durationMinutes: watchedMin.value,
    clickstreamCount: 15,
    substantiveCompletionRatio: watchedMin.value / videoDurationMin.value,
    quizArtifactScore: observedRetention.value,
    revisitCount: revisitEvents.value,
    interactionCount: interactionEvents.value
  });
});

const isSufficient = computed(() => {
  return behavioralEvidence.value >= sufficiencyThreshold.value;
});

// Contextual Baseline & Residual Computation using Engine
const networkReadiness = computed(() => {
  const bandwidthScore = Math.min(bandwidthKbps.value / 5000, 1);
  const latencyScore = Math.max(0, 1 - (latencyMs.value / 1200));
  return Math.round(((bandwidthScore * 0.6) + (latencyScore * 0.4)) * 100) / 100;
});

const contextualBaseline = computed(() => {
  return computeCCBNBaseline(contextProfile.value, evidenceQuality.value, networkReadiness.value);
});

const liveResidual = computed(() => {
  return computeResidual(behavioralEvidence.value, contextualBaseline.value);
});

const deltaBColor = computed(() => {
  if (liveResidual.value >= -0.05) return '#10B981';
  if (liveResidual.value >= -0.20) return '#F59E0B';
  return '#EF4444';
});

// Baseline Validity Gate Evaluation using Engine
const validityResult = computed(() => {
  return computeValidityGate(spatialIndex.value, evidenceQuality.value);
});

// Visual Observability Computation using Engine
const visualObservabilityQuality = computed(() => {
  return computeVisualObservabilityQuality(evidenceQuality.value, spatialType.value === '3T');
});

const visualFusionWeight = computed(() => {
  return computeVisualObservabilityWeight(spatialIndex.value, visualObservabilityQuality.value);
});

// Disparity & Multi-Objective Trade-offs
const dynamicOverallReward = computed(() => {
  const reward = 0.71 - (lambdaWeight.value * 0.05);
  return Math.round(reward * 100) / 100;
});

const dynamic3TOutcome = computed(() => {
  const outcome = 0.42 + (lambdaWeight.value * 0.23);
  return Math.round(outcome * 100) / 100;
});

const dynamicUrbanOutcome = computed(() => {
  const outcome = 0.71 - (lambdaWeight.value * 0.04);
  return Math.round(outcome * 100) / 100;
});

const liveDisparityGap = computed(() => {
  return computeDisparity(dynamicUrbanOutcome.value, dynamic3TOutcome.value);
});

const liveGapReductionPct = computed(() => {
  const initialGap = 0.29;
  const currentGap = liveDisparityGap.value;
  const reduction = Math.max(0, ((initialGap - currentGap) / initialGap) * 100);
  return Math.round(reduction);
});

const selectedActionKey = computed(() => {
  return selectAdaptiveAction(contextProfile.value, liveResidual.value);
});

const liveContextualBurden = computed(() => {
  return computeContextualBurden(selectedActionKey.value, contextProfile.value);
});

// Multi-Objective Calibrated Reward Score (Equation 9)
const liveRewardScore = computed(() => {
  return computeCalibratedReward(
    0.70,
    liveResidual.value,
    liveContextualBurden.value,
    (workloadLevel.value / 5) * 0.30,
    0.05,
    liveDisparityGap.value,
    lambdaWeight.value
  );
});

const bandwidthQuality = computed(() => {
  if (bandwidthKbps.value < 200) return '3T Satelit Terbatas';
  if (bandwidthKbps.value < 1000) return 'Sedang (3G/4G)';
  return 'Fiber Optic Stabil';
});

const stallRatio = computed(() => {
  if (bandwidthKbps.value < 150) return 35;
  if (bandwidthKbps.value < 500) return 15;
  return 2;
});

const deviceName = computed(() => {
  if (deviceType.value === 'smartphone') return 'Smartphone (Layar Kecil)';
  if (deviceType.value === 'tablet') return 'Tablet';
  return 'Desktop / Workstation';
});

const workloadDesc = computed(() => {
  if (workloadLevel.value >= 4) return 'Tinggi (Tugas Layanan Dinamis)';
  if (workloadLevel.value === 3) return 'Sedang (Tugas Rutin)';
  return 'Rendah / Mandiri';
});

// Proposal Equation Ledger (1 to 18c)
const proposalEquationLedger = computed(() => [
  { id: '(1)', title: 'Raw behavioral traces', formula: 'X_{i,t} = [login, duration, clickstream, completion, artifact, ...]', live: `Trace sesi: tonton ${watchedMin.value.toFixed(1)}/${videoDurationMin.value} menit; ${interactionEvents.value}/10 checkpoint; B_{i,t} = ${behavioralEvidence.value.toFixed(2)}.` },
  { id: '(2)', title: 'Konteks enam dimensi', formula: 'c_{i,t} = [T_{i,t}, I_{i,t}, O_{i,t}, D_{i,t}, W_{i,t}, S_{i,t}]', live: `I: ${bandwidthKbps.value} kbps / ${latencyMs.value} ms; D: ${deviceName.value}; W: ${workloadLevel.value}/5; S: ${spatialIndex.value.toFixed(2)}.` },
  { id: '(2a–2c)', title: 'Indeks spasial komposit', formula: 'S_{i,t} = δK_i + (1 − δ)N_{i,t}', live: `K: ${spatialType.value === '3T' ? '0.30' : '0.80'}; N: ${networkReadiness.value.toFixed(2)}; S_{i,t}: ${spatialIndex.value.toFixed(2)}.` },
  { id: '(3)', title: 'Missingness (Observabilitas)', formula: 'm_{i,t} = 1 − n_{observed,i,t} / n_{expected,i,t}', live: `m_{i,t}: ${missingnessRate.value.toFixed(2)} dari ${interactionEvents.value} observasi atas 10 checkpoint (MNAR).` },
  { id: '(4)', title: 'Kualitas evidensi', formula: 'q_{i,t} = 1 − m_{i,t} − λ · noise_{i,t}', live: `noise: ${evidenceNoise.value.toFixed(2)}; q_{i,t}: ${evidenceQuality.value.toFixed(2)}.` },
  { id: '(5)', title: 'CCBN expected baseline', formula: 'b̂_{i,t} = E[B_{i,t} | c_{i,t}, q_{i,t}] = f(c_{i,t}, q_{i,t})', live: `Expected Baseline CCBN: ${contextualBaseline.value.toFixed(2)}.` },
  { id: '(6)', title: 'Contextual residual', formula: 'd_{i,t} = B_{i,t} − b̂_{i,t}', live: `B: ${behavioralEvidence.value.toFixed(2)}; d_{i,t}: ${liveResidual.value >= 0 ? '+' : ''}${liveResidual.value.toFixed(2)}.` },
  { id: '(7)', title: 'Contextual disparity', formula: 'D_t = disparity(d_{i,t} | context/group)', live: `Gap disparitas kelompok: ${liveDisparityGap.value.toFixed(2)}* (Synthetic).` },
  { id: '(8, 8a, 8b)', title: 'Beban & gap fairness', formula: 'CB_{i,a,t} = cost_a(c_{i,t}, Δc_{i,t}); max |E[CB|g] − E[CB|h]|; max |MAE_g(d) − MAE_h(d)|', live: `CB: ${liveContextualBurden.value.toFixed(2)}; Guardrail toleransi beban & interpretasi.` },
  { id: '(9)', title: 'Reward terkalibrasi LinUCB', formula: "r′_{i,a,t+1} = r_{i,a,t} + ηU(a,d_{i,t}) − μCB_{i,a,t} − νOB_{i,a,t} − ρΔc_{i,t} − γD_t", live: `Candidate reward: ${liveRewardScore.value.toFixed(2)}*; D_t: ${liveDisparityGap.value.toFixed(2)}*.` },
  { id: '(10, 10a)', title: 'Observabilitas & fusi visual', formula: 'w_{i,t} = σ(α₁(1 − S_{i,t}) + α₂q_{visual,i,t}); F_{i,t} = w_{i,t}V_{i,t} + (1 − w_{i,t})b_{LMS,i,t}', live: `q_visual: ${visualObservabilityQuality.value.toFixed(2)}; w: ${visualFusionWeight.value.toFixed(2)}. Visual adalah pendukung observabilitas.` },
  { id: '(11–17)', title: 'Tujuh metrik fairness spasial', formula: 'Spatial performance, low-engagement, FPR/FNR, calibration, missingness, visual-observability, & override gaps', live: 'Dihitung pada evaluasi kelompok saat data empiris / sandbox multi-wilayah tersedia.' },
  { id: '(18a–18c)', title: 'Baseline Validity Gate', formula: 'valid / boundary / invalid berdasarkan S_{i,t} dan q_{i,t} terhadap ambang metodologis', live: `Status: ${validityResult.value.state.toUpperCase()} — ${validityResult.value.message}` }
]);

// Section 11: Traceability Table Data
const traceabilityList = [
  { component: 'Raw behavioral traces', eq: 'Eq. (1)', module: 'Modul 02: Trace & Evidence', input: 'LMS Telemetry (login, clickstream, duration)', output: 'Vektor X_{i,t} & Outcome B_{i,t}' },
  { component: 'Context Profile 6D', eq: 'Eq. (2)', module: 'Modul 01: Context Profile', input: 'Kuesioner + Telemetri Sistem', output: 'Vektor c_{i,t} = [T, I, O, D, W, S]' },
  { component: 'Klaster Spasial Makro', eq: 'Eq. (2a)', module: 'Modul 01 & Sidebar Spasial', input: 'Data Terbuka (BPS, Podes, APJII, Ookla)', output: 'Klaster K_i' },
  { component: 'Kualitas Jaringan Sesi', eq: 'Eq. (2b)', module: 'Modul 01 & Sidebar Spasial', input: 'Telemetri Sesi (latency, retry, buffering)', output: 'Kualitas Jaringan N_{i,t}' },
  { component: 'Indeks Spasial Komposit', eq: 'Eq. (2c)', module: 'Modul 01 & Sidebar Spasial', input: 'K_i dan N_{i,t}', output: 'Indeks Spasial S_{i,t}' },
  { component: 'Missingness (Observabilitas)', eq: 'Eq. (3)', module: 'Modul 03: Missingness & Quality', input: 'Jumlah data teramati vs ekspektasi', output: 'Tingkat Missingness m_{i,t}' },
  { component: 'Evidence Quality', eq: 'Eq. (4)', module: 'Modul 03: Missingness & Quality', input: 'm_{i,t} dan noise sinyal', output: 'Skor Kualitas Evidensi q_{i,t}' },
  { component: 'Expected Baseline CCBN', eq: 'Eq. (5)', module: 'Modul 04: CCBN Baseline & Residual', input: 'Konteks c_{i,t} dan Kualitas q_{i,t}', output: 'Baseline Wajar b̂_{i,t}' },
  { component: 'Contextual Residual', eq: 'Eq. (6)', module: 'Modul 04: CCBN Baseline & Residual', input: 'Evidensi B_{i,t} dan Baseline b̂_{i,t}', output: 'Residual Diagnostik d_{i,t}' },
  { component: 'Contextual Disparity', eq: 'Eq. (7)', module: 'Modul 06: Contextual Disparity', input: 'Distribusi d_{i,t} antarkelompok', output: 'Metrik Disparitas D_t' },
  { component: 'Contextual Burden', eq: 'Eq. (8)', module: 'Modul 06 & Modul 07', input: 'Aksi a, konteks c, pergeseran Δc', output: 'Beban Intervensi CB_{i,a,t}' },
  { component: 'Recommendation Burden Gap', eq: 'Eq. (8a)', module: 'Modul 06 & Evaluator', input: 'Distribusi CB antarkelompok', output: 'Gap Beban Rekomendasi' },
  { component: 'Interpretation Error Gap', eq: 'Eq. (8b)', module: 'Modul 06 & Evaluator', input: 'MAE(d) antarkelompok', output: 'Gap Kesalahan Interpretasi' },
  { component: 'Calibrated Reward / LinUCB', eq: 'Eq. (9)', module: 'Modul 07 & Modul 08', input: 'd_{i,t}, D_t, CB, OB, Δc, LinUCB UCB bound', output: 'Aksi Terpilih a*_{t+1}' },
  { component: 'Observabilitas Visual', eq: 'Eq. (10, 10a)', module: 'Modul 02 & Sidebar', input: 'S_{i,t}, sinyal visual pilot (FDR, HRLV)', output: 'Bobot w_{i,t} & Fusi F_{i,t}' },
  { component: '7 Metrik Fairness Spasial', eq: 'Eq. (11)–(17)', module: 'Modul 11: Benchmark & Metrics', input: 'Residual d, status komplesi, log HITL', output: 'Tujuh gap evaluasi keadilan' },
  { component: 'Baseline Validity Gate', eq: 'Eq. (18a–18c)', module: 'Modul 05: Validity Gate', input: 'S_{i,t} dan q_{i,t} terhadap ambang θ', output: 'Status VALID / BOUNDARY / INVALID' }
];

// =========================================================================
// COMPUTATIONAL MODULE DETAIL MODAL STATE & LOGIC
// =========================================================================
const isModalOpen = ref<boolean>(false);
const activeModalModuleId = ref<number>(1);

function openModuleModal(moduleId: number) {
  activeModalModuleId.value = Math.max(1, Math.min(moduleId, 12));
  isModalOpen.value = true;
}

function closeModuleModal() {
  isModalOpen.value = false;
}

function nextModalModule() {
  if (activeModalModuleId.value < 12) {
    activeModalModuleId.value++;
  } else {
    activeModalModuleId.value = 1;
  }
}

function prevModalModule() {
  if (activeModalModuleId.value > 1) {
    activeModalModuleId.value--;
  } else {
    activeModalModuleId.value = 12;
  }
}

const modalModuleData = computed(() => {
  const id = activeModalModuleId.value;
  switch (id) {
    case 1:
      return {
        num: 'MODUL 01',
        title: 'Profil Vektor Konteks Enam Dimensi (Context Profile)',
        layer: 'TAHAP 1: CONTEXT (CONTEXT PROFILE)',
        badgeClass: 'badge-blue',
        role: 'Menangkap vektor fitur 6-dimensi kendala temporal, infrastruktur, organisasi, perangkat, beban kerja kedinasan, dan kewilayahan spasial ASN.',
        formula: 'c_{i,t} = [ T_{i,t}, I_{i,t}, O_{i,t}, D_{i,t}, W_{i,t}, S_{i,t} ]',
        equationRef: 'Persamaan (2) & (2a–2c) Proposal Revisi 2',
        liveState: {
          'Temporal (T)': 'Sesi Belajar Mandiri / Rutin',
          'Infrastruktur (I)': `${bandwidthKbps.value} kbps (${bandwidthQuality.value})`,
          'Device / Delivery (D)': deviceName.value,
          'Workload (W)': `${workloadLevel.value} / 5 (${workloadDesc.value})`,
          'Spatial Index (S_{i,t})': `${spatialIndex.value.toFixed(2)} (Klaster: ${spatialType.value === '3T' ? '3T' : 'Perkotaan'})`,
          'Role Kuesioner': 'Sumber data konteks (Bukan CCBN itu sendiri)'
        },
        insight: 'Vektor konteks memastikan bahwa performa belajar tidak dinilai dalam ruang hampa, melainkan dikondisikan oleh keterbatasan nyata infrastruktur dan operasional kantor peserta.'
      };
    case 2:
      return {
        num: 'MODUL 02',
        title: 'Trace LMS Mentah (X) & Evidensi Perilaku (B)',
        layer: 'TAHAP 2: EVIDENCE (EVIDENCE FORMATION)',
        badgeClass: 'badge-purple',
        role: 'Mengumpulkan telemetri interaksi autentik LMS (login, durasi, clickstream, checkpoint) dan membentuk evidensi perilaku ternormalisasi B_{i,t}.',
        formula: 'X_{i,t} = [\text{login}, \text{durasi}, \text{clickstream}, \text{completion}, \dots] \implies B_{i,t}',
        equationRef: 'Persamaan (1) & (10a) Proposal Revisi 2',
        liveState: {
          'Sinyal Atensi Teramati': `${(observedFocus.value * 100).toFixed(0)}%`,
          'Durasi Akses Substansi': `${watchCompletionRatio.value}% (${watchedMin.value.toFixed(1)}/10 min)`,
          'Revisit Konten': `${revisitEvents.value}× Revisit`,
          'Aktivitas Checkpoint': `${interactionCoveragePct.value}% (${interactionEvents.value}/10 Checkpoint)`,
          'Artefak Evaluasi': `${(observedRetention.value * 100).toFixed(0)}%`
        },
        insight: 'Data trace mentah X diposisikan sebagai bukti awal perilaku, bukan sebagai label langsung kemampuan intelektual atau motivasi belajar.'
      };
    case 3:
      return {
        num: 'MODUL 03',
        title: 'Missingness (m_{i,t}) & Kualitas Evidensi (q_{i,t})',
        layer: 'TAHAP 2: EVIDENCE (OBSERVABILITY & RELIABILITY)',
        badgeClass: 'badge-amber',
        role: 'Mengukur ketidaklengkapan data sebagai batas observabilitas sistem (MNAR) dan menghitung skor kualitas evidensi q_{i,t}.',
        formula: 'm_{i,t} = 1 - \frac{n_{\text{obs}}}{n_{\text{exp}}}, \quad q_{i,t} = 1 - m_{i,t} - \lambda \cdot \text{noise}_{i,t}',
        equationRef: 'Persamaan (3) & (4) Proposal Revisi 2',
        liveState: {
          'Missingness Rate (m_{i,t})': `${missingnessRate.value.toFixed(2)}`,
          'Noise Telemetri': `${evidenceNoise.value.toFixed(2)}`,
          'Evidence Quality (q_{i,t})': `${evidenceQuality.value.toFixed(2)}`,
          'Uji MCAR': 'p < 0.05 (Tolak MCAR → MNAR karena latensi/sinyal)'
        },
        insight: 'Data hilang akibat sinyal putus diperlakukan sebagai batasan observabilitas sistem, bukan ketidakaktifan atau kelalaian peserta.'
      };
    case 4:
      return {
        num: 'MODUL 04',
        title: 'Expected Behavioral Baseline CCBN (b̂_{i,t}) & Residual (d_{i,t})',
        layer: 'TAHAP 2: EVIDENCE (CCBN BASELINE MECHANISM)',
        badgeClass: 'badge-emerald',
        role: 'Level 1: Menghitung baseline ekspektasi perilaku wajar b̂_{i,t} = E[B|c,q] berdasarkan kendala lingkungan, lalu mengkalkulasi deviasi residual individual d_{i,t}.',
        formula: 'b̂_{i,t} = f(c_{i,t}, q_{i,t}), \quad d_{i,t} = B_{i,t} - b̂_{i,t} = ' + (liveResidual.value >= 0 ? '+' : '') + liveResidual.value.toFixed(2),
        equationRef: 'Persamaan (5) & (6) — Core CCBN Mechanism',
        liveState: {
          'Observed Evidence (B_{i,t})': `${behavioralEvidence.value.toFixed(2)}`,
          'Expected Baseline (b̂_{i,t})': `${contextualBaseline.value.toFixed(2)} (Ekspektasi Wajar 3T)`,
          'Contextual Residual (d_{i,t})': `${liveResidual.value >= 0 ? '+' : ''}${liveResidual.value.toFixed(2)}`,
          'Interpretasi Residual': liveResidual.value >= 0 ? 'Positif Wajar (Belajar sungguh-sungguh di tengah kendala)' : 'Deviasi Memerlukan Dukungan'
        },
        insight: 'CCBN memisahkan kendala infrastruktur dari penurunan atensi otentik. Residual positif di tengah kendala membuktikan partisipasi belajar yang layak diapresiasi.'
      };
    case 5:
      return {
        num: 'MODUL 05',
        title: 'Baseline Validity Gate & Safeguard Observabilitas',
        layer: 'TAHAP 2: EVIDENCE (EPISTEMIC SAFEGUARD)',
        badgeClass: 'badge-blue',
        role: 'Mengevaluasi kelayakan epistemik baseline sebelum residual digunakan: VALID (18a), BOUNDARY (18b), atau INVALID (18c).',
        formula: "\text{Status: } \begin{cases} \text{VALID} & S_{i,t} \ge \theta_S \land q_{i,t} \ge \theta_q \\ \text{BOUNDARY} & \theta'_S \le S < \theta_S \lor \theta'_q \le q < \theta_q \\ \text{INVALID} & S < \theta'_S \lor q < \theta'_q \end{cases}",
        equationRef: 'Persamaan (18a)–(18c) Proposal Revisi 2',
        liveState: {
          'Spatial Index S_{i,t}': `${spatialIndex.value.toFixed(2)} (&theta;_S = ${DEFAULT_VALIDITY_THRESHOLDS.thetaSpatial})`,
          'Evidence Quality q_{i,t}': `${evidenceQuality.value.toFixed(2)} (&theta;_q = ${DEFAULT_VALIDITY_THRESHOLDS.thetaQuality})`,
          'Status Gerbang': validityResult.value.state.toUpperCase(),
          'Respon Sistem': validityResult.value.message
        },
        insight: 'Safeguard epistemik: jika observabilitas tidak memadai (INVALID), sistem tidak memaksa inferensi otomatis, melainkan mengeskalasi kasus ke Human-in-the-Loop.'
      };
    case 6:
      return {
        num: 'MODUL 06',
        title: 'Contextual Disparity (D_t) & Beban Rekomendasi (CB)',
        layer: 'TAHAP 3: FAIRNESS (GROUP DISPARITY & BURDEN)',
        badgeClass: 'badge-rose',
        role: 'Level 2: Mengevaluasi disparitas kelompok agregat D_t, Recommendation Burden Gap (8a), dan Interpretation Error Gap (8b).',
        formula: 'D_t = \text{disparity}(d_{i,t} \mid \text{group}), \quad \text{Gap}_{\text{burden}} = \max_{g,h} |\mathbb{E}[CB \mid g] - \mathbb{E}[CB \mid h]|',
        equationRef: 'Persamaan (7), (8), (8a), (8b) Proposal Revisi 2',
        liveState: {
          'Individual Residual (d_{i,t})': `${liveResidual.value >= 0 ? '+' : ''}${liveResidual.value.toFixed(2)}`,
          'Group Disparity Gap (D_t)': `${liveDisparityGap.value.toFixed(2)}* (Synthetic)`,
          'Recommendation Burden Gap': '< 0.15* (Toleransi Tercapai)',
          'Interpretation Error Gap': 'ΔMAE = 0.04* (< 0.05)'
        },
        insight: 'Menjamin kesetaraan antar kelompok wilayah dengan meregulasi rekomendasi agar intervensi tidak menambah beban kuota/waktu berlebih kepada wilayah 3T.'
      };
    case 7:
      return {
        num: 'MODUL 07',
        title: 'Algoritma Keputusan Adaptif Berbasis Reward Terkalibrasi (LinUCB)',
        layer: 'TAHAP 4: DECISION (ADAPTIVE DECISION LAYER)',
        badgeClass: 'badge-purple',
        role: 'Memilih aksi modalitas adaptif yang memaksimalkan reward terkalibrasi multi-objektif (Eq. 9) dengan eksplorasi LinUCB.',
        formula: "a^*_{t+1} = \arg\max_{a \in \mathcal{A}} [ r'_{i,a,t+1} + \alpha_t \sqrt{z_{i,t}^T A_{a,t}^{-1} z_{i,t}} ]",
        equationRef: 'Persamaan (9) & Adaptive LinUCB Decision Layer',
        liveState: {
          'Aksi Terpilih': selectedActionKey.value === 'A2' ? 'A2: Text-First + Audio Mikro' : selectedActionKey.value === 'A4' ? 'A4: Dynamic Microlearning' : 'A3: Interactive Scenario',
          'Candidate Reward Score': `${liveRewardScore.value.toFixed(2)}*`,
          'Beban Kontekstual (CB)': '< 1 MB (Ultra Low Bandwidth)',
          'Ruang Aksi': '4 Kandidat Modalitas (A1 s/d A4)'
        },
        insight: 'Mengintegrasikan penalti beban kontekstual (CB), beban dinas (OB), dan disparitas (D) ke dalam reward agar rekomendasi selalu realistis bagi kondisi peserta.'
      };
    case 8:
      return {
        num: 'MODUL 08',
        title: 'Rantai Penalaran Transparan & Tata Kelola HITL',
        layer: 'TAHAP 4: DECISION (EXPLAINABLE AI & HITL)',
        badgeClass: 'badge-cyan',
        role: 'Menyajikan rantai inferensi explainable AI (XAI) dan menempatkan Widyaiswara sebagai reviewer akhir intervensi.',
        formula: 'c_{i,t} \to X_{i,t} \to (b̂, d) \to \text{Validity Gate} \to D_t \to \text{Rekomendasi Aksi} \to \text{Review HITL}',
        equationRef: 'Persamaan (17) — Human Override Governance',
        liveState: {
          'Rantai Inferensi': `Konteks (${bandwidthKbps.value}k) → Evidensi (${(observedFocus.value * 100).toFixed(0)}%) → Residual (${liveResidual.value >= 0 ? '+' : ''}${liveResidual.value.toFixed(2)}) → Format ${selectedActionKey.value}`,
          'Tipe Intervensi': 'Decision-Support bagi Pengampu/Widyaiswara',
          'Wewenang Review': 'Persetujuan, Pengubahan Moda, Penjadwalan Ulang'
        },
        insight: 'Sistem tidak mengeksekusi vonis otomatis, melainkan memberikan rekomendasi cerdas dan transparan kepada pendidik manusia untuk diaudit.'
      };
    case 9:
      return {
        num: 'MODUL 09',
        title: 'Simulator Pergeseran Konteks Dinamis (Context Shift)',
        layer: 'TAHAP 5: LEARNING LOOP (NON-STATIONARY ADAPTATION)',
        badgeClass: 'badge-amber',
        role: 'Menguji ketangguhan adaptasi real-time saat konteks jaringan/perangkat bergeser secara tiba-tiba (analogi YouTube bitrate).',
        formula: 't_1 (110 \text{ kbps, Phone, 3T}) \rightleftharpoons t_2 (8000 \text{ kbps, Desktop, WiFi})',
        equationRef: 'Context Drift & Non-Stationary Shift (\Delta c_{i,t})',
        liveState: {
          'State Aktif': contextShiftState.value === 't1' ? 'State t1 (3T Terkendala)' : 'State t2 (WiFi Kantor Lancar)',
          'Bandwidth Sesi': `${bandwidthKbps.value} kbps`,
          'Aksi Terpilih': contextShiftState.value === 't1' ? 'Text-First + Audio Mikro' : 'Video HD + Interactive',
          'Candidate Reward': contextShiftState.value === 't1' ? '0.71*' : '0.88*'
        },
        insight: 'Menunjukkan bagaimana algoritma langsung merespons peningkatan maupun penurunan kualitas jaringan secara mulus tanpa mengganggu peserta.'
      };
    case 10:
      return {
        num: 'MODUL 10',
        title: 'Trajektori Reward & Pembaruan Parameter Model (Online Update)',
        layer: 'TAHAP 5: LEARNING LOOP (MODEL PARAMETER UPDATE)',
        badgeClass: 'badge-emerald',
        role: 'Mencatat log pembelajaran sekuensial dan memperbarui parameter bobot bandit θ_a setelah intervensi selesai.',
        formula: "A_{a, t+1} \leftarrow A_{a, t} + z_{i,t} z_{i,t}^T, \quad b_{a, t+1} \leftarrow b_{a, t} + r'_t z_{i,t}",
        equationRef: 'Online Ridge Regression Parameter Update',
        liveState: {
          'Time Step Terkini': 't6 (Reward 0.91*)',
          'Konvergensi Trajektori': '0.71* (t1) → 0.76* → 0.82* → 0.88* → 0.79* → 0.91* (t6)',
          'Log Record': '6 Sesi Pembelajaran Terpetakan (Simulatif)'
        },
        insight: 'Model terus belajar dari interaksi setiap peserta di berbagai wilayah sehingga rekomendasi masa depan semakin presisi dan kontekstual.'
      };
    case 11:
      return {
        num: 'MODUL 11',
        title: '7 Metrik Fairness Spasial & Matriks Benchmark Komparasi',
        layer: 'TAHAP 3: FAIRNESS & EVALUATION (METRICS & BENCHMARK)',
        badgeClass: 'badge-rose',
        role: 'Evaluasi komparatif multi-metrik (Spatial Performance, Low-Engagement Misinterpretation, FPR/FNR, Calibration, Missingness Bias, Visual Observability, Override Gaps).',
        formula: '\text{Evaluasi: } [\text{Eq. 11: Perf Gap} \mid \text{Eq. 12: Low-Eng Gap} \mid \text{Eq. 13c: FPR/FNR} \mid \text{Eq. 14: Calib} \mid \text{Eq. 15: Miss} \mid \text{Eq. 16: Visual} \mid \text{Eq. 17: Override}]',
        equationRef: 'Persamaan (11)–(17) Proposal Revisi 2',
        liveState: {
          'Spatial Performance Gap (11)': '0.06* (Terkalibrasi)',
          'Low-Engagement Misinterpretation (12)': '0.04* (Operasional)',
          'FPR/FNR Residual Gap (13c)': '0.05* (Seimbang)',
          'Human Override Rate Gap (17)': '0.08* (Log Audit)'
        },
        insight: '7 metrik spasial memastikan evaluasi tidak hanya berhenti pada akurasi prediksi, melainkan memverifikasi keadilan interpretasi di seluruh dimensi kewilayahan.'
      };
    case 12:
      return {
        num: 'MODUL 12',
        title: 'Kontroler Trade-off Multi-Objektif Reward ↔ Disparitas (λ / γ)',
        layer: 'TAHAP 5: LEARNING LOOP (MULTI-OBJECTIVE TUNING)',
        badgeClass: 'badge-emerald',
        role: 'Menyediakan instrumen kendali interaktif untuk mengatur bobot penalti disparitas (γ / λ) antara efisiensi agregat vs keadilan kesetaraan luaran.',
        formula: "r'_{i,a,t+1} = \dots - \gamma_t D_t \quad (\text{Slider } \lambda = " + lambdaWeight.value.toFixed(2) + ")",
        equationRef: 'Multi-Objective Equity Optimization (Persamaan 9)',
        liveState: {
          'Bobot Penalti (λ)': `${lambdaWeight.value.toFixed(2)}`,
          'Expected Utility Agregat': `${dynamicOverallReward.value.toFixed(2)}*`,
          'Disparity Gap (D_t)': `${liveDisparityGap.value.toFixed(2)}* (-${liveGapReductionPct.value}%*)`,
          '3T Outcome Estimasi': `${dynamic3TOutcome.value.toFixed(2)}*`
        },
        insight: 'Dalam simulasi ini, kontroler mendemonstrasikan bagaimana sistem meregulasi trade-off antara efisiensi agregat vs kesetaraan luaran bagi ASN daerah 3T.'
      };
    default:
      return {
        num: 'MODUL 01',
        title: 'Profil Vektor Konteks Enam Dimensi',
        layer: 'TAHAP 1: CONTEXT',
        badgeClass: 'badge-blue',
        role: '',
        formula: '',
        equationRef: '',
        liveState: {},
        insight: ''
      };
  }
});
</script>

<style scoped>
.proposal-equation-ledger {
  margin: 1.5rem 0;
  padding: 1.35rem;
  border: 1px solid #c7d2fe;
  background: linear-gradient(135deg, #f8faff 0%, #f5f3ff 100%);
}

.equation-ledger-head {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.baseline-status {
  flex: 0 0 16rem;
  padding: 0.7rem 0.8rem;
  border-radius: 0.65rem;
  border: 1px solid;
  display: grid;
  gap: 0.15rem;
  font-size: 0.75rem;
}

.baseline-status strong { font-size: 0.92rem; letter-spacing: 0.04em; }
.baseline-status small { line-height: 1.35; }
.status-valid { color: #047857; border-color: #6ee7b7; background: #ecfdf5; }
.status-boundary { color: #92400e; border-color: #fcd34d; background: #fffbeb; }
.status-invalid { color: #b91c1c; border-color: #fca5a5; background: #fef2f2; }

.equation-ledger-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
}

.equation-ledger-item {
  padding: 0.8rem;
  border: 1px solid #e0e7ff;
  border-radius: 0.6rem;
  background: rgba(255, 255, 255, 0.88);
}

.equation-ledger-item.safeguard { border-color: #fbbf24; background: #fffbeb; }
.equation-ledger-meta { display: flex; gap: 0.45rem; align-items: baseline; margin-bottom: 0.4rem; color: #3730a3; }
.equation-ledger-meta span { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; font-weight: 800; }
.equation-ledger-meta strong { font-size: 0.82rem; }
.equation-ledger-item code { display: block; color: #334155; font-size: 0.72rem; line-height: 1.45; white-space: normal; word-break: break-word; }
.equation-ledger-item p { margin: 0.45rem 0 0; color: #475569; font-size: 0.72rem; line-height: 1.4; }

@media (max-width: 760px) {
  .equation-ledger-head { flex-direction: column; }
  .baseline-status { flex-basis: auto; width: 100%; }
  .equation-ledger-grid { grid-template-columns: 1fr; }
}

/* ========================================================================= */
/* EXECUTIVE HERO BANNER                                                     */
/* ========================================================================= */
.hero-banner {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #0F2038 100%);
  border-radius: 16px;
  padding: 2rem 2.25rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.hero-content {
  max-width: 780px;
  flex: 1;
}

.hero-badge-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.hero-synthetic-warning {
  margin-top: 1rem;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.35);
  padding: 0.5rem 0.85rem;
  border-radius: 8px;
  font-size: 0.75rem;
  color: #FDE68A;
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  line-height: 1.45;
}

.badge {
  font-size: 0.725rem;
  font-weight: 700;
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  letter-spacing: 0.02em;
}

.badge-emerald {
  background: rgba(16, 185, 129, 0.2);
  color: #6EE7B7;
  border: 1px solid rgba(110, 231, 183, 0.35);
}

.badge-indigo {
  background: rgba(99, 102, 241, 0.2);
  color: #A5B4FC;
  border: 1px solid rgba(165, 180, 252, 0.35);
}

.badge-blue {
  background: rgba(59, 130, 246, 0.2);
  color: #93C5FD;
  border: 1px solid rgba(147, 197, 253, 0.35);
}

.badge-amber {
  background: rgba(245, 158, 11, 0.2);
  color: #FCD34D;
  border: 1px solid rgba(252, 211, 77, 0.35);
}

.badge-yellow {
  background: rgba(234, 179, 8, 0.2);
  color: #FEF08A;
  border: 1px solid rgba(254, 240, 138, 0.35);
}

.badge-purple {
  background: rgba(168, 85, 247, 0.2);
  color: #D8B4FE;
  border: 1px solid rgba(216, 180, 254, 0.35);
}

.badge-cyan {
  background: rgba(6, 182, 212, 0.2);
  color: #67E8F9;
  border: 1px solid rgba(103, 232, 249, 0.35);
}

.badge-rose {
  background: rgba(244, 63, 94, 0.2);
  color: #FDA4AF;
  border: 1px solid rgba(253, 164, 175, 0.35);
}

.badge-dashed {
  background: rgba(255, 255, 255, 0.05);
  color: #E2E8F0;
  border: 1px dashed rgba(255, 255, 255, 0.35);
}

.hero-title {
  font-size: 1.55rem;
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.35;
  margin: 0 0 0.6rem 0;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 0.875rem;
  color: #94A3B8;
  margin: 0 0 0.4rem 0;
  line-height: 1.55;
}

.hero-kpi-deck {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
  flex: 0 0 340px;
}

@media (max-width: 900px) {
  .hero-kpi-deck {
    flex: 1 1 100%;
  }
}

.kpi-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.85rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  backdrop-filter: blur(8px);
}

.kpi-card.highlight {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.3);
}

.validity-card-valid {
  border-color: rgba(16, 185, 129, 0.4);
  background: rgba(16, 185, 129, 0.1);
}

.validity-card-boundary {
  border-color: rgba(245, 158, 11, 0.4);
  background: rgba(245, 158, 11, 0.1);
}

.validity-card-invalid {
  border-color: rgba(239, 68, 68, 0.4);
  background: rgba(239, 68, 68, 0.1);
}

.kpi-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.kpi-val {
  font-size: 1.25rem;
  font-weight: 800;
  color: #FFFFFF;
}

.kpi-sub {
  font-size: 0.675rem;
  color: #64748B;
  font-family: monospace;
}

.text-emerald { color: #10B981; }
.text-amber { color: #F59E0B; }
.text-blue { color: #3B82F6; }
.text-purple { color: #8B5CF6; }
.text-rose { color: #F43F5E; }
.text-slate { color: #64748B; }

/* Theory Grid */
.theory-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (max-width: 900px) {
  .theory-grid {
    grid-template-columns: 1fr;
  }
}

.stage-card {
  padding: 1.5rem;
  border-radius: 14px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.stage-card.border-rose { border-top: 4px solid #F43F5E; }
.stage-card.border-emerald { border-top: 4px solid #10B981; }

.stage-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.stage-pill {
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  text-transform: uppercase;
}

.pill-indigo { background: #EEF2FF; color: #4F46E5; }
.pill-blue { background: #EFF6FF; color: #2563EB; }
.pill-rose { background: #FFF1F2; color: #E11D48; }
.pill-emerald { background: #ECFDF5; color: #059669; }
.pill-amber { background: #FEF3C7; color: #D97706; }
.pill-purple { background: #F5F3FF; color: #7C3AED; }
.pill-cyan { background: #ECFEFF; color: #0891B2; }
.pill-slate { background: #F1F5F9; color: #475569; }

.stage-ref {
  font-size: 0.725rem;
  color: #64748B;
  font-weight: 600;
}

.stage-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 0.5rem 0;
}

.stage-p {
  font-size: 0.85rem;
  color: #334155;
  line-height: 1.55;
  margin: 0 0 1rem 0;
}

.math-box {
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.math-emerald {
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
}

.math-formula-rendered {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  font-weight: 700;
  color: #065F46;
  overflow-x: auto;
}

.math-legend {
  display: flex;
  gap: 0.4rem;
  align-items: center;
  flex-wrap: wrap;
  font-size: 0.725rem;
  color: #475569;
  margin-top: 0.35rem;
}

.leg-pill {
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-size: 0.7rem;
}

.pill-blue-sm { background: #DBEAFE; color: #1E40AF; }
.pill-purple-sm { background: #EDE9FE; color: #5B21B6; }
.pill-emerald-sm { background: #D1FAE5; color: #065F46; }
.pill-amber-sm { background: #FEF3C7; color: #92400E; }

.stage-callout {
  border-radius: 8px;
  padding: 0.75rem 1rem;
  display: flex;
  gap: 0.5rem;
  font-size: 0.8rem;
  line-height: 1.45;
  margin-top: auto;
}

.callout-rose { background: #FFF1F2; border: 1px solid #FECDD3; color: #9F1239; }
.callout-emerald { background: #ECFDF5; border: 1px solid #A7F3D0; color: #065F46; }
.callout-blue { background: #EFF6FF; border: 1px solid #BFDBFE; color: #1E40AF; }

.disparity-flow {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.flow-step {
  display: flex;
  align-items: center;
}

.flow-badge {
  background: #F1F5F9;
  border: 1px solid #CBD5E1;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.775rem;
  font-weight: 700;
  color: #1E293B;
}

.flow-arrow {
  color: #94A3B8;
  font-size: 0.85rem;
  padding-left: 0.5rem;
}

.flow-split {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
}

.split-pill {
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
}

.split-3t { background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA; }
.split-urban { background: #EFF6FF; color: #1E40AF; border: 1px solid #BFDBFE; }
.split-gap-alert {
  background: #FFFBEB;
  color: #92400E;
  border: 1px dashed #FCD34D;
  padding: 0.4rem 0.65rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 800;
}

/* Spatial Moderation Diagram Card */
.spatial-moderation-diagram-card {
  padding: 1.75rem;
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.diagram-head {
  margin-bottom: 1.5rem;
}

.diagram-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0.5rem 0 0.4rem 0;
}

.diagram-desc {
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.55;
  margin: 0;
}

.diagram-interactive-body {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.75rem;
}

@media (max-width: 960px) {
  .diagram-interactive-body {
    grid-template-columns: 1fr;
  }
}

.flow-pipeline-col {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.pipe-box {
  border-radius: 12px;
  padding: 1rem 1.25rem;
  border: 1px solid #E2E8F0;
  background: #F8FAFC;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.pipe-blue { border-left: 5px solid #3B82F6; }
.pipe-indigo { border-left: 5px solid #6366F1; }
.pipe-amber { border-left: 5px solid #F59E0B; }
.pipe-purple { border-left: 5px solid #8B5CF6; background: #FAF5FF; border-color: #E9D5FF; }
.pipe-cyan { border-left: 5px solid #06B6D4; }
.pipe-rose { border-left: 5px solid #F43F5E; }
.pipe-emerald { border-left: 5px solid #10B981; background: #F0FDF4; border-color: #BBF7D0; }

.pipe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pipe-step-num {
  font-size: 0.675rem;
  font-weight: 800;
  color: #64748B;
  letter-spacing: 0.04em;
}

.pipe-eq {
  font-size: 0.725rem;
  font-weight: 700;
  color: #3730A3;
  background: #EEF2FF;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.pipe-title {
  font-size: 0.95rem;
  font-weight: 800;
  color: #0F172A;
}

.pipe-content {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.math-sym-row {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: #1E293B;
  background: #FFFFFF;
  padding: 0.45rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #E2E8F0;
}

.pipe-note {
  font-size: 0.75rem;
  color: #64748B;
  line-height: 1.4;
}

.pipe-tags {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.p-tag {
  background: #FFFFFF;
  border: 1px solid #CBD5E1;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  color: #334155;
}

.highlight-tag {
  border-color: #A855F7;
  color: #7E22CE;
  background: #FAF5FF;
}

.solid-connector-down {
  display: flex;
  justify-content: center;
  color: #94A3B8;
  font-size: 0.75rem;
  padding: 0.2rem 0;
}

.formula-subgrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.math-sub-cell {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-family: 'JetBrains Mono', monospace;
}

.math-sub-cell.full-w {
  grid-column: 1 / -1;
}

.f-lbl {
  display: block;
  font-size: 0.675rem;
  font-family: sans-serif;
  color: #64748B;
  font-weight: 700;
  margin-bottom: 0.2rem;
}

.moderated-receive-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.725rem;
  font-weight: 700;
  color: #6B21A8;
  background: #F3E8FF;
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  margin-top: 0.35rem;
}

.dot-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #9333EA;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
}

.fairness-two-pillars {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.f-pil {
  background: #FFFFFF;
  border: 1px solid #FECDD3;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

/* Spatial Moderator Sidebar */
.spatial-moderator-sidebar {
  display: flex;
  flex-direction: column;
}

.dashed-moderator-card {
  border: 2px dashed #818CF8;
  border-radius: 14px;
  padding: 1.25rem;
  background: #F8FAFF;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dashed-badge {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.675rem;
  font-weight: 800;
  color: #4338CA;
  letter-spacing: 0.05em;
}

.mod-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #1E1B4B;
  margin: 0;
}

.mod-subtitle {
  font-size: 0.775rem;
  color: #475569;
  margin: 0;
}

.mod-formula-box {
  background: #FFFFFF;
  border: 1px solid #C7D2FE;
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mod-formula-main {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  font-weight: 800;
  color: #3730A3;
}

.mod-layers {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.layer-item {
  display: flex;
  gap: 0.45rem;
  font-size: 0.725rem;
}

.layer-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.layer-dot.blue { background: #3B82F6; }
.layer-dot.amber { background: #F59E0B; }

.layer-txt {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.layer-txt strong { color: #1E293B; }
.layer-txt span { color: #64748B; }

.dashed-action-indicator {
  background: rgba(99, 102, 241, 0.06);
  border: 1px solid #C7D2FE;
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.indicator-arrow-box {
  display: flex;
  flex-direction: column;
  font-size: 0.7rem;
  font-weight: 700;
  color: #4F46E5;
}

.dashed-arrow-line {
  font-family: monospace;
  letter-spacing: -0.1em;
}

.mod-impact-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.mod-impact-list li {
  display: flex;
  gap: 0.35rem;
  font-size: 0.725rem;
  color: #334155;
  line-height: 1.4;
}

.icon-check {
  color: #10B981;
  font-weight: 800;
}

.service-dynamics-box {
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 8px;
  padding: 0.65rem 0.85rem;
}

.sd-tag {
  font-size: 0.725rem;
  font-weight: 800;
  color: #92400E;
}

.sd-desc {
  font-size: 0.725rem;
  color: #78350F;
  margin: 0.25rem 0 0 0;
  line-height: 1.4;
}

/* DSR Roadmap Card */
.dsr-roadmap-card {
  padding: 1.5rem;
  background: #FFFFFF;
  border-radius: 14px;
  border: 1px solid #E2E8F0;
  margin-bottom: 2rem;
}

.dsr-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.dsr-badge {
  font-size: 0.675rem;
  font-weight: 800;
  color: #6366F1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 0.2rem;
}

.dsr-heading {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0;
}

.dsr-phase-pill {
  font-size: 0.725rem;
  font-weight: 800;
  background: #EEF2FF;
  color: #4338CA;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  border: 1px solid #C7D2FE;
}

.dsr-phases-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.25rem;
}

@media (max-width: 860px) {
  .dsr-phases-grid {
    grid-template-columns: 1fr;
  }
}

.dsr-phase-item {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.dsr-phase-item.active-phase {
  border-color: #3B82F6;
  background: #EFF6FF;
}

.phase-badge-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.phase-num {
  font-size: 0.675rem;
  font-weight: 800;
  color: #64748B;
}

.phase-status-tag {
  font-size: 0.675rem;
  font-weight: 700;
  color: #64748B;
}

.tag-active {
  color: #2563EB;
}

.phase-title {
  font-size: 0.875rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0;
}

.phase-desc {
  font-size: 0.775rem;
  color: #475569;
  line-height: 1.45;
  margin: 0;
}

.reasoning-behind-box {
  background: linear-gradient(135deg, #F0FDF4 0%, #EFF6FF 100%);
  border: 1px solid #86EFAC;
  border-radius: 10px;
  padding: 1rem 1.25rem;
}

.rb-head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #065F46;
  font-size: 0.85rem;
  font-weight: 800;
  margin-bottom: 0.35rem;
}

.rb-p {
  font-size: 0.8rem;
  color: #1E293B;
  line-height: 1.5;
  margin: 0;
}

/* Pipeline Tracker Stepper */
.pipeline-tracker-card {
  padding: 1.5rem;
  background: #FFFFFF;
  border-radius: 14px;
  border: 1px solid #E2E8F0;
  margin-bottom: 2rem;
}

.pipeline-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.pipe-title-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.pipe-icon {
  font-size: 1.5rem;
}

.pipeline-heading {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 0.2rem 0;
}

.pipeline-sub {
  font-size: 0.75rem;
  color: #64748B;
  font-weight: 700;
  margin: 0;
}

.btn-simulate {
  background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
  color: #FFFFFF;
  border: none;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
  transition: all 0.2s;
}

.btn-simulate:hover {
  background: #1E40AF;
  transform: translateY(-1px);
}

.btn-simulate:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.pipeline-stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
}

.pipe-step-node {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.85rem;
  border-radius: 10px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  min-width: 150px;
}

.pipe-step-node:hover {
  background: #EFF6FF;
  border-color: #93C5FD;
}

.pipe-step-node.active {
  background: #0F172A;
  color: #FFFFFF;
  border-color: #0F172A;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
}

.pipe-step-node.done {
  border-color: #86EFAC;
  background: #F0FDF4;
}

.step-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 800;
  flex-shrink: 0;
}

.pipe-step-node.active .step-circle {
  background: #2563EB;
  color: #FFFFFF;
}

.step-label-box {
  display: flex;
  flex-direction: column;
}

.step-name {
  font-size: 0.75rem;
  font-weight: 800;
}

.step-detail {
  font-size: 0.675rem;
  color: #64748B;
}

.pipe-step-node.active .step-detail {
  color: #94A3B8;
}

.pipe-step-divider {
  color: #CBD5E1;
  font-size: 0.85rem;
}

/* Lab Layer Modules */
.modules-lab-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}

.lab-layer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.layer-section-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.layer-pill {
  font-size: 0.75rem;
  font-weight: 800;
  color: #1E293B;
  background: #E2E8F0;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  display: inline-block;
  align-self: flex-start;
  letter-spacing: 0.04em;
}

.layer-desc {
  font-size: 0.825rem;
  color: #64748B;
}

.layer-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

@media (max-width: 900px) {
  .layer-grid-2 {
    grid-template-columns: 1fr;
  }
}

.sim-panel-card {
  background: #FFFFFF;
  border-radius: 14px;
  border: 1px solid #E2E8F0;
  padding: 1.35rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
}

.sim-panel-card.step-highlight-active {
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.panel-head-left {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.panel-head-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mod-num-badge {
  font-size: 0.675rem;
  font-weight: 800;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  display: block;
  margin-bottom: 0.15rem;
}

.panel-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0;
}

.btn-inspect-modal {
  background: #F1F5F9;
  border: 1px solid #CBD5E1;
  color: #334155;
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-inspect-modal:hover {
  background: #E2E8F0;
  color: #0F172A;
}

.code-pill {
  font-family: monospace;
  font-size: 0.725rem;
  font-weight: 700;
  padding: 0.25rem 0.55rem;
  border-radius: 6px;
}

/* Preset & Controls */
.preset-wrap {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.preset-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748B;
}

.preset-btn-group {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.p-btn {
  background: #F8FAFC;
  border: 1px solid #CBD5E1;
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #334155;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.2s;
}

.p-btn.active {
  background: #0F172A;
  color: #FFFFFF;
  border-color: #0F172A;
}

.sub-input-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-box {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 0.75rem;
}

.ctrl-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.45rem;
}

.ctrl-lbl {
  font-size: 0.75rem;
  font-weight: 700;
  color: #334155;
}

.val-pill {
  font-size: 0.725rem;
  font-weight: 800;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}

.slider-blue { accent-color: #2563EB; }
.slider-amber { accent-color: #D97706; }
.slider-rose { accent-color: #E11D48; }
.slider-purple { accent-color: #7C3AED; }
.slider-emerald { accent-color: #059669; }

.segmented-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.35rem;
}

.segmented-box button {
  background: #FFFFFF;
  border: 1px solid #CBD5E1;
  border-radius: 6px;
  padding: 0.4rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
}

.segmented-box button.active {
  background: #0F172A;
  color: #FFFFFF;
  border-color: #0F172A;
}

.math-vector-callout {
  background: #0F172A;
  color: #FFFFFF;
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.vec-label {
  font-size: 0.675rem;
  color: #93C5FD;
  font-weight: 700;
  text-transform: uppercase;
}

.vec-code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: #34D399;
  word-break: break-all;
}

.missingness-verify-box {
  background: #FEFCE8;
  border: 1px solid #FEF08A;
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.mv-head {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.775rem;
  color: #854D0E;
}

.mv-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;
}

.mv-item {
  display: flex;
  flex-direction: column;
  font-size: 0.725rem;
}

.mv-k { color: #713F12; }
.mv-v { font-weight: 800; }
.mv-note { font-size: 0.675rem; color: #854D0E; font-style: italic; }

.calc-panel {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 1rem;
}

.calc-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.calc-tag {
  font-size: 0.7rem;
  font-weight: 800;
  color: #64748B;
  letter-spacing: 0.04em;
}

.formula-sm {
  font-family: monospace;
  font-size: 0.725rem;
  color: #7C3AED;
  font-weight: 700;
}

.metrics-3-col {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.65rem;
}

.m-card {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 0.65rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.m-card.m-highlight {
  background: #ECFDF5;
  border-color: #A7F3D0;
}

.m-lbl { font-size: 0.675rem; color: #64748B; font-weight: 700; }
.m-val { font-size: 1.1rem; font-weight: 800; color: #0F172A; }
.m-sub { font-size: 0.65rem; color: #94A3B8; }

.sufficiency-card-body {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.suff-metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .suff-metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.suff-kpi-item {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 0.5rem 0.65rem;
  display: flex;
  flex-direction: column;
}

.suff-kpi-lbl { font-size: 0.675rem; color: #64748B; font-weight: 700; }
.suff-kpi-val { font-size: 0.95rem; font-weight: 800; }

.suff-score-banner {
  border-radius: 10px;
  padding: 0.85rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.banner-sufficient {
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
}

.banner-insufficient {
  background: #FFFBEB;
  border: 1px solid #FDE68A;
}

.score-banner-label {
  font-size: 0.675rem;
  font-weight: 800;
  color: #475569;
  letter-spacing: 0.04em;
  display: block;
}

.score-banner-num-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.score-banner-val {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0F172A;
}

.score-banner-threshold {
  font-size: 0.75rem;
  color: #64748B;
  font-weight: 700;
}

.suff-verdict-badge {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.725rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.badge-green { background: #10B981; color: #FFFFFF; }

.insight-highlight-callout {
  background: #F8FAFC;
  border-left: 4px solid #3B82F6;
  padding: 0.65rem 0.85rem;
  border-radius: 0 8px 8px 0;
}

.ihc-head {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.775rem;
  font-weight: 800;
  color: #1E40AF;
  margin-bottom: 0.2rem;
}

.ihc-p {
  font-size: 0.75rem;
  color: #334155;
  margin: 0;
  line-height: 1.45;
}

/* Baseline Validity Gate */
.gate-status-card {
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.gate-valid { background: #ECFDF5; border: 1.5px solid #6EE7B7; }
.gate-boundary { background: #FFFBEB; border: 1.5px solid #FCD34D; }
.gate-invalid { background: #FEF2F2; border: 1.5px solid #FCA5A5; }

.gate-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.35rem;
}

.gate-tag { font-size: 0.7rem; font-weight: 800; color: #475569; letter-spacing: 0.04em; }
.gate-val { font-size: 1.1rem; letter-spacing: 0.04em; }
.gate-desc { font-size: 0.8rem; color: #1E293B; line-height: 1.45; margin: 0 0 0.65rem 0; }

.gate-params-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  font-size: 0.725rem;
}

.gate-rules-explanation {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.gr-item {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 0.65rem;
  border-radius: 6px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  font-size: 0.725rem;
  opacity: 0.7;
}

.gr-item.active {
  opacity: 1;
  border-color: #3B82F6;
  background: #EFF6FF;
}

.gr-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.gr-dot.green { background: #10B981; }
.gr-dot.amber { background: #F59E0B; }
.gr-dot.red { background: #EF4444; }

.gr-item div {
  display: flex;
  flex-direction: column;
}

.gr-item strong { color: #0F172A; }
.gr-item span { color: #64748B; }

/* Fairness Spec Card */
.fairness-spec-card {
  background: #FFF1F2;
  border: 1px solid #FECDD3;
  border-radius: 10px;
  padding: 1rem;
}

.f-spec-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.f-title { font-size: 0.725rem; font-weight: 800; color: #9F1239; letter-spacing: 0.04em; }
.f-badge { font-size: 0.7rem; font-weight: 700; background: #FFFFFF; color: #E11D48; padding: 0.15rem 0.45rem; border-radius: 4px; }

.f-metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}

.f-cell {
  background: #FFFFFF;
  border: 1px solid #FFE4E6;
  border-radius: 6px;
  padding: 0.5rem 0.65rem;
  display: flex;
  flex-direction: column;
}

.fk { font-size: 0.675rem; color: #64748B; }
.fv { font-size: 0.85rem; font-weight: 800; color: #0F172A; }

/* Benchmark Table */
.benchmark-body {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.sub-sec-title {
  font-size: 0.775rem;
  font-weight: 700;
  color: #475569;
}

.benchmark-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.775rem;
}

.benchmark-table th {
  background: #F1F5F9;
  padding: 0.5rem 0.65rem;
  text-align: left;
  font-weight: 800;
  color: #334155;
  border-bottom: 1px solid #CBD5E1;
}

.benchmark-table td {
  padding: 0.55rem 0.65rem;
  border-bottom: 1px solid #E2E8F0;
}

.tbl-badge {
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-weight: 800;
  font-family: monospace;
}

.bench-footnote {
  font-size: 0.675rem;
  color: #64748B;
  font-style: italic;
}

/* Candidate Actions Grid */
.candidate-actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.65rem;
  margin-top: 0.45rem;
}

.action-item-box {
  background: #F8FAFC;
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  padding: 0.65rem 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.action-item-box.active {
  background: #ECFDF5;
  border-color: #10B981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.act-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.act-id { font-size: 0.725rem; font-weight: 800; color: #64748B; }
.act-score-tag { font-size: 0.7rem; font-weight: 800; }
.act-item-title { font-size: 0.825rem; font-weight: 800; color: #0F172A; }
.act-constraint-note { font-size: 0.675rem; color: #64748B; }

/* Why Summary Grid */
.why-summary-grid {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 0.75rem;
}

.why-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  font-size: 0.75rem;
  gap: 0.5rem;
}

.why-row.highlight-why {
  background: #ECFDF5;
  padding: 0.35rem 0.45rem;
  border-radius: 6px;
  border: 1px solid #A7F3D0;
}

.why-k { font-weight: 700; color: #475569; }
.why-v { color: #0F172A; }

.hitl-governance-box {
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 8px;
  padding: 0.65rem 0.85rem;
}

.hitl-gov-title {
  font-size: 0.725rem;
  font-weight: 800;
  color: #1E40AF;
  display: block;
  margin-bottom: 0.35rem;
}

.hitl-flow-steps {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
  font-size: 0.7rem;
  font-weight: 700;
}

.hf-step { background: #FFFFFF; padding: 0.2rem 0.45rem; border-radius: 4px; border: 1px solid #CBD5E1; }
.hf-rec { background: #FEF3C7; color: #92400E; border-color: #FDE68A; }
.hf-human { background: #DBEAFE; color: #1E40AF; border-color: #93C5FD; font-weight: 800; }
.hf-act { background: #D1FAE5; color: #065F46; border-color: #6EE7B7; }
.hf-arrow { color: #94A3B8; }

/* Context Shift Body */
.context-shift-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.shift-control-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.btn-shift-toggle {
  background: #0F172A;
  color: #FFFFFF;
  border: none;
  padding: 0.45rem 0.85rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
}

.shift-state-indicator {
  font-size: 0.75rem;
  color: #475569;
}

.shift-flow-container {
  display: grid;
  grid-template-columns: 1fr 40px 1fr;
  align-items: center;
  gap: 0.5rem;
}

.shift-state-card {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  opacity: 0.6;
}

.shift-state-card.active {
  opacity: 1;
  border-color: #3B82F6;
  background: #EFF6FF;
}

.state-badge {
  font-size: 0.65rem;
  font-weight: 800;
  color: #64748B;
  letter-spacing: 0.04em;
}

.state-list {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.725rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.state-result {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 4px;
  padding: 0.35rem 0.5rem;
  font-size: 0.7rem;
  display: flex;
  flex-direction: column;
}

.shift-arrow-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #3B82F6;
  font-weight: 800;
  font-size: 0.75rem;
}

/* Tradeoff Controller */
.tradeoff-container {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.to-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lambda-badge {
  background: #0F172A;
  color: #FFFFFF;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.8rem;
  font-weight: 800;
}

.lambda-slider { accent-color: #10B981; }

.tradeoff-pills-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.to-pill {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
}

.to-k { font-size: 0.65rem; color: #64748B; }
.to-v { font-size: 0.95rem; font-weight: 800; }

/* Trajectory Chart & Table */
.trajectory-card-body {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.trajectory-chart-wrap {
  display: flex;
  gap: 0.75rem;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 1rem;
}

.chart-y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.675rem;
  font-family: monospace;
  color: #94A3B8;
}

.chart-canvas {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.chart-svg {
  width: 100%;
  height: 90px;
}

.chart-x-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.675rem;
  color: #64748B;
  font-family: monospace;
}

.trajectory-table-wrap {
  overflow-x: auto;
}

.traj-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.75rem;
}

.traj-table th {
  background: #F1F5F9;
  padding: 0.45rem 0.65rem;
  text-align: left;
  font-weight: 800;
  color: #334155;
  border-bottom: 1px solid #CBD5E1;
}

.traj-table td {
  padding: 0.5rem 0.65rem;
  border-bottom: 1px solid #E2E8F0;
}

/* Mathematical Model Reference Section */
.math-ref-panel-section {
  padding: 1.75rem;
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  margin-bottom: 2rem;
}

.math-ref-head { margin-bottom: 0.5rem; }
.math-ref-title { font-size: 1.35rem; font-weight: 800; color: #0F172A; margin: 0.4rem 0 0.2rem 0; }
.math-ref-desc { font-size: 0.85rem; color: #475569; line-height: 1.5; margin: 0; }

.math-groups-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

@media (max-width: 960px) {
  .math-groups-grid {
    grid-template-columns: 1fr;
  }
}

.math-group-card {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.math-group-card.border-blue { border-top: 4px solid #3B82F6; }
.math-group-card.border-purple { border-top: 4px solid #8B5CF6; }
.math-group-card.border-rose { border-top: 4px solid #F43F5E; }
.math-group-card.border-emerald { border-top: 4px solid #10B981; }
.math-group-card.border-cyan { border-top: 4px solid #06B6D4; }
.math-group-card.border-amber { border-top: 4px solid #F59E0B; }

.mg-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mg-pill {
  font-size: 0.675rem;
  font-weight: 800;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.mg-title {
  font-size: 0.95rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0;
}

.mg-eq-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.mg-eq-item {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 0.65rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mg-eq-token {
  font-size: 0.75rem;
  color: #1E293B;
}

.mg-eq-token code {
  font-family: 'JetBrains Mono', monospace;
  color: #4338CA;
  font-size: 0.725rem;
  word-break: break-all;
}

.mg-eq-desc {
  font-size: 0.725rem;
  color: #475569;
  line-height: 1.4;
  margin: 0;
}

/* Traceability Section */
.traceability-section {
  padding: 1.75rem;
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  margin-bottom: 2rem;
}

.trace-head { margin-bottom: 1.25rem; }
.trace-title { font-size: 1.35rem; font-weight: 800; color: #0F172A; margin: 0.4rem 0 0.2rem 0; }
.trace-desc { font-size: 0.85rem; color: #475569; line-height: 1.5; margin: 0; }

.trace-table-wrap {
  overflow-x: auto;
}

.trace-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.775rem;
}

.trace-table th {
  background: #F1F5F9;
  padding: 0.6rem 0.75rem;
  text-align: left;
  font-weight: 800;
  color: #334155;
  border-bottom: 1px solid #CBD5E1;
}

.trace-table td {
  padding: 0.6rem 0.75rem;
  border-bottom: 1px solid #E2E8F0;
  vertical-align: middle;
}

/* Modal Dialog Styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1.5rem;
}

.modal-dialog-card {
  background: #FFFFFF;
  border-radius: 16px;
  width: 100%;
  max-width: 780px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border: 1px solid #CBD5E1;
}

.modal-head {
  padding: 1.25rem 1.5rem;
  background: #0F172A;
  color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-head-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.modal-layer-tag {
  font-size: 0.675rem;
  font-weight: 700;
  color: #93C5FD;
  letter-spacing: 0.04em;
  display: block;
}

.modal-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0;
}

.modal-close-btn {
  background: transparent;
  border: none;
  color: #94A3B8;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
}

.modal-close-btn:hover { color: #FFFFFF; }

.modal-body-content {
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-sec-box {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 1rem 1.25rem;
}

.modal-sec-lbl {
  font-size: 0.75rem;
  font-weight: 800;
  color: #334155;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  display: block;
  margin-bottom: 0.45rem;
}

.modal-sec-desc {
  font-size: 0.85rem;
  color: #1E293B;
  line-height: 1.55;
  margin: 0;
}

.modal-math-box {
  background: #0F172A;
  border-color: #1E293B;
  color: #FFFFFF;
}

.modal-math-box .modal-sec-lbl {
  color: #93C5FD;
}

.modal-math-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.65rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.modal-eq-ref {
  font-size: 0.7rem;
  font-weight: 700;
  color: #FCD34D;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.35);
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
}

.modal-eq-display {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.85rem 1rem;
  border-radius: 8px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.875rem;
  color: #34D399;
  overflow-x: auto;
  letter-spacing: 0.02em;
}

.modal-live-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.live-grid-item {
  background: #FFFFFF;
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  padding: 0.65rem 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.live-k {
  font-size: 0.7rem;
  font-weight: 700;
  color: #64748B;
}

.live-v {
  font-size: 0.825rem;
  font-weight: 800;
  color: #0F172A;
}

.modal-insight-box {
  background: linear-gradient(135deg, #ECFDF5 0%, #EFF6FF 100%);
  border: 1.5px solid #86EFAC;
}

.modal-insight-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #065F46;
  font-size: 0.825rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
}

.modal-insight-desc {
  font-size: 0.8rem;
  color: #1E293B;
  line-height: 1.55;
  margin: 0;
}

.modal-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #F8FAFC;
  border-top: 1px solid #E2E8F0;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.modal-nav-btns {
  display: flex;
  gap: 0.65rem;
}

.btn-modal-nav {
  background: #FFFFFF;
  border: 1px solid #CBD5E1;
  color: #334155;
  font-size: 0.775rem;
  font-weight: 700;
  padding: 0.45rem 0.85rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-modal-nav:hover {
  background: #EFF6FF;
  border-color: #3B82F6;
  color: #1D4ED8;
}

.btn-modal-close-foot {
  background: #0F172A;
  color: #FFFFFF;
  border: none;
  font-size: 0.775rem;
  font-weight: 700;
  padding: 0.45rem 1.15rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-modal-close-foot:hover {
  background: #334155;
}
</style>
