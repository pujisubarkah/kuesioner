<template>
  <div class="app-container">
    <!-- Top Header Navigation -->
    <Navbar />

    <main id="konten-utama" class="main-content">
      <!-- TOP TITLE & STATUS BANNER (EXECUTIVE HERO) -->
      <section class="hero-banner">
        <div class="hero-content">
          <div class="hero-badge-row">
            <span class="badge badge-blue">⚡ Baseline: LinUCB (Li et al., 2010)</span>
            <span class="badge badge-amber">⚖️ Target Riset: Regional Disparity Aware</span>
            <span class="badge badge-yellow">🟡 Status: Under Development</span>
          </div>
          <h1 class="hero-title">
            Evolusi Algoritma: Dari Baseline LinUCB Menuju Candidate Disparity-Aware LinUCB
          </h1>
          <p class="hero-subtitle">
            Studi komputasional komparatif: Menguji bagaimana penambahan penalti disparitas regional (<code class="formula-code">λ_t · D_{a,t}</code>) pada algoritma <strong>LinUCB</strong> menyeimbangkan trade-off antara efektivitas pembelajaran agregat (<em>expected reward</em>) dan keadilan luaran (<em>equity</em>) antara ASN wilayah 3T vs Perkotaan (Urban).
          </p>
        </div>

        <div class="hero-kpi-deck">
          <div class="kpi-card">
            <span class="kpi-label">Live Candidate Score</span>
            <span class="kpi-val text-emerald">{{ liveRewardScore.toFixed(2) }}</span>
            <span class="kpi-sub">Score_{a,t} aktif</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">Residual CCBN (ΔB)</span>
            <span class="kpi-val" :style="{ color: deltaBColor }">{{ liveDeltaB >= 0 ? '+' : '' }}{{ liveDeltaB.toFixed(2) }}</span>
            <span class="kpi-sub">B_obs - E[B|C]</span>
          </div>
          <div class="kpi-card highlight">
            <span class="kpi-label">Disparity Gap (D)</span>
            <span class="kpi-val text-amber">{{ liveDisparityGap.toFixed(2) }}</span>
            <span class="kpi-sub">Reduksi -{{ liveGapReductionPct }}%</span>
          </div>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- TAHAP 1 & 2: BASELINE & RESEARCH PROBLEM DUAL CARDS                      -->
      <!-- ========================================================================= -->
      <section class="theory-grid">
        <!-- 1. Baseline: LinUCB -->
        <div class="card stage-card border-blue">
          <div class="stage-card-header">
            <span class="stage-pill pill-blue">TAHAP 1: BASELINE ALGORITHM</span>
            <span class="stage-ref">Li et al., 2010 (ACM WWW)</span>
          </div>
          <h2 class="stage-title">1. Baseline Algorithm — LinUCB</h2>
          <p class="stage-p">
            LinUCB digunakan sebagai <em>baseline algorithm</em> karena terbukti tangguh memilih intervensi adaptif berdasarkan vektor konteks fitur (<code class="code-sm">x_t</code>) dan menyeimbangkan <em>exploitation–exploration trade-off</em> melalui bound UCB:
          </p>
          
          <div class="math-box math-blue">
            <div class="math-formula-rendered">
              <span class="m-lhs"><span class="m-bold">A</span><sub class="m-idx">t</sub><sup class="m-ast">*</sup></span>
              <span class="m-sign">=</span>
              <span class="m-operator"><span class="m-op-txt">arg max</span><sub class="m-op-cond">a ∈ &#119964;</sub></span>
              <span class="m-bracket">[</span>
              <span class="m-term-box term-blue">
                <span class="m-bold">x</span><sub class="m-idx">t</sub><sup class="m-exp">T</sup> <span class="m-bold">&theta;&#770;</span><sub class="m-idx">a</sub>
              </span>
              <span class="m-sign">+</span>
              <span class="m-term-box term-purple">
                <span class="m-sym">&alpha;</span>
                <span class="m-sqrt-wrap">
                  <span class="m-sqrt-symbol">&radic;</span>
                  <span class="m-sqrt-inner">
                    <span class="m-bold">x</span><sub class="m-idx">t</sub><sup class="m-exp">T</sup> <span class="m-bold">A</span><sub class="m-idx">a</sub><sup class="m-exp">-1</sup> <span class="m-bold">x</span><sub class="m-idx">t</sub>
                  </span>
                </span>
              </span>
              <span class="m-bracket">]</span>
            </div>
            <div class="math-legend">
              <span class="leg-pill pill-blue-sm"><strong>x<sub>t</sub><sup>T</sup> &theta;&#770;<sub>a</sub></strong> : Estimasi Reward (Eksploitasi)</span>
              <span class="dot">•</span>
              <span class="leg-pill pill-purple-sm"><strong>&alpha; &radic;(x<sub>t</sub><sup>T</sup> A<sub>a</sub><sup>-1</sup> x<sub>t</sub>)</strong> : Bonus Eksplorasi Ketidakpastian (UCB Bound)</span>
            </div>
          </div>
          <div class="stage-callout callout-blue">
            <span class="callout-icon">💡</span>
            <span><strong>Kekuatan Baseline:</strong> Mampu mempersonalisasi rekomendasi konten/modalitas secara dinamis pada data kontinu.</span>
          </div>
        </div>

        <!-- 2. Research Problem: Belum Disparity-Aware -->
        <div class="card stage-card border-rose">
          <div class="stage-card-header">
            <span class="stage-pill pill-rose">TAHAP 2: RESEARCH PROBLEM</span>
            <span class="stage-ref">Celah Metodologis</span>
          </div>
          <h2 class="stage-title">2. Problem: LinUCB Belum Disparity-Aware</h2>
          <p class="stage-p">
            <strong>Masalah Mendasar:</strong> LinUCB mengoptimalkan <em>expected reward</em> berdasarkan konteks individu, <strong>tetapi belum secara eksplisit memperhitungkan disparitas outcome antar kelompok/konteks wilayah</strong> (3T vs Non-3T).
          </p>

          <!-- Visual Flow Diagram of Disparity -->
          <div class="disparity-flow">
            <div class="flow-step">
              <span class="flow-badge">LinUCB Standar</span>
            </div>
            <div class="flow-arrow">➔</div>
            <div class="flow-step">
              <span class="flow-badge badge-high">High Overall Reward (0.71)</span>
            </div>
            <div class="flow-arrow">➔</div>
            <div class="flow-step flow-split">
              <div class="split-pill split-3t">🏝️ 3T: Outcome Rendah (0.42)</div>
              <div class="split-pill split-urban">🏢 Urban: Outcome Tinggi (0.71)</div>
              <div class="split-gap-alert">⚠️ Regional Disparity Gap: D = 0.29</div>
            </div>
          </div>
          <div class="stage-callout callout-rose">
            <span class="callout-icon">⚠️</span>
            <span><strong>Dampak:</strong> ASN 3T tertinggal secara akumulatif karena algoritma standar mengeksploitasi format berat yang hanya optimal untuk infrastruktur perkotaan.</span>
          </div>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- DIAGRAM KERANGKA BERPIKIR: MODERASI SPASIAL DALAM CABA-CCBN (GAMBAR 2 & 3)-->
      <!-- ========================================================================= -->
      <section class="card spatial-moderation-diagram-card">
        <div class="diagram-head">
          <div class="badge-row">
            <span class="badge badge-indigo">🔬 Diagram Kerangka Berpikir (Gambar 2 & 3 Proposal)</span>
            <span class="badge badge-dashed">┆ Moderasi Spasial (Garis Putus-Putus)</span>
            <span class="badge badge-cyan">Persamaan (1)–(11)</span>
          </div>
          <h2 class="diagram-title">
            Struktur Alur Pipeline Komputasi & Efek Moderasi Spasial CABA–CCBN
          </h2>
          <p class="diagram-desc">
            Sesuai perumusan proposal disertasi, jalur vertikal padat (<em>solid arrow</em>) menggambarkan <strong>data pipeline primer</strong> dari trace mentah hingga rekomendasi adaptif. Jalur samping bergaris putus-putus (<strong><em>dashed border & connector</em></strong>) merepresentasikan peran <strong>Moderasi Konteks Spasial ($S_{i,t}$)</strong> yang mengondisikan ekspektasi baseline perilaku wajar dan mengatur bobot <em>spatially-gated fusion</em> ($g_{i,t}$).
          </p>
        </div>

        <div class="diagram-interactive-body">
          <!-- Main Sequential Flow Column -->
          <div class="flow-pipeline-col">
            <!-- Box 1 -->
            <div class="pipe-box pipe-blue">
              <div class="pipe-header">
                <span class="pipe-step-num">LANGKAH 1</span>
                <span class="pipe-eq">Persamaan (1)</span>
              </div>
              <div class="pipe-title">1) Trace LMS Mentah (<strong>x</strong><sub>i,t</sub>)</div>
              <div class="pipe-content">
                <div class="math-sym-row">
                  <span class="m-bold">x</span><sub>i,t</sub> = [<span class="m-var">login</span><sub>i,t</sub>, <span class="m-var">durasi</span><sub>i,t</sub>, <span class="m-var">clickstream</span><sub>i,t</sub>, <span class="m-var">completion</span><sub>i,t</sub>, <span class="m-var">artifact</span><sub>i,t</sub>]
                </div>
                <span class="pipe-note">Bukan label mutlak kemampuan, melainkan evidensi probabilistik awal.</span>
              </div>
            </div>

            <div class="solid-connector-down">
              <span class="connector-line"></span>
              <span class="connector-arrow">▼</span>
            </div>

            <!-- Box 2 -->
            <div class="pipe-box pipe-indigo">
              <div class="pipe-header">
                <span class="pipe-step-num">LANGKAH 2</span>
                <span class="pipe-eq">Persamaan (2)</span>
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
                  <span class="p-tag highlight-tag">Spasial (S)</span>
                </span>
              </div>
            </div>

            <div class="solid-connector-down">
              <span class="connector-line"></span>
              <span class="connector-arrow">▼</span>
            </div>

            <!-- Box 3 -->
            <div class="pipe-box pipe-amber">
              <div class="pipe-header">
                <span class="pipe-step-num">LANGKAH 3</span>
                <span class="pipe-eq">Persamaan (3) & (4)</span>
              </div>
              <div class="pipe-title">3) Missingness (m<sub>i,t</sub>) & Kualitas Evidensi (q<sub>i,t</sub>)</div>
              <div class="pipe-content">
                <div class="math-sym-row">
                  <span class="m-var">q</span><sub>i,t</sub> = 1 - <span class="m-var">m</span><sub>i,t</sub> - <span class="m-sym">&lambda;</span> &middot; <span class="m-var">noise</span><sub>i,t</sub>
                </div>
                <span class="pipe-note">Uji MNAR via Little's Test & Pattern-Mixture Model (PMM). Data hilang tidak otomatis dianggap lalai.</span>
              </div>
            </div>

            <div class="solid-connector-down">
              <span class="connector-line"></span>
              <span class="connector-arrow">▼</span>
            </div>

            <!-- Box 4: CCBN Baseline (Target of Moderation) -->
            <div class="pipe-box pipe-purple moderated-target-box">
              <div class="pipe-header">
                <span class="pipe-step-num">LANGKAH 4 (INTI CCBN)</span>
                <span class="pipe-eq">Persamaan (5) & (7, 8)</span>
              </div>
              <div class="pipe-title">4) Baseline Perilaku Kontekstual (<strong>b</strong><sub>i,t</sub>) & Spatially-Gated Fusion (<strong>z</strong><sub>i,t</sub>)</div>
              <div class="pipe-content">
                <div class="formula-subgrid">
                  <div class="math-sub-cell">
                    <span class="f-lbl">Baseline Perilaku Wajar:</span>
                    <span class="m-bold">b</span><sub>i,t</sub> = <span class="m-func">f</span>(<span class="m-bold">c</span><sub>i,t</sub>, <span class="m-var">q</span><sub>i,t</sub>)
                  </div>
                  <div class="math-sub-cell">
                    <span class="f-lbl">Bobot Gerbang Spasial:</span>
                    <span class="m-var">g</span><sub>i,t</sub> = <span class="m-sym">&sigma;</span>(<span class="m-sym">&alpha;</span><span class="m-var">S</span><sub>i,t</sub> + <span class="m-sym">&beta;</span><span class="m-var">I</span><sub>i,t</sub> + <span class="m-sym">&gamma;</span><span class="m-var">q</span><sub>i,t</sub>)
                  </div>
                  <div class="math-sub-cell full-w">
                    <span class="f-lbl">Representasi Fusi Akhir (Persamaan 8):</span>
                    <span class="m-bold">z</span><sub>i,t</sub> = <span class="m-var">g</span><sub>i,t</sub> &middot; <span class="m-bold">x</span><sub>i,t</sub> + (1 - <span class="m-var">g</span><sub>i,t</sub>) &middot; <span class="m-bold">c</span><sub>i,t</sub>
                  </div>
                </div>
              </div>
              <div class="moderated-receive-badge">
                <span class="dot-pulse"></span> Dimoderasi langsung oleh Indeks Spasial <strong>S<sub>i,t</sub></strong>
              </div>
            </div>

            <div class="solid-connector-down">
              <span class="connector-line"></span>
              <span class="connector-arrow">▼</span>
            </div>

            <!-- Box 5 -->
            <div class="pipe-box pipe-cyan">
              <div class="pipe-header">
                <span class="pipe-step-num">LANGKAH 5</span>
                <span class="pipe-eq">Persamaan (6)</span>
              </div>
              <div class="pipe-title">5) Deviasi Aktual terhadap Baseline (<strong>d</strong><sub>i,t</sub>)</div>
              <div class="pipe-content">
                <div class="math-sym-row">
                  <span class="m-bold">d</span><sub>i,t</sub> = <span class="m-bold">x</span><sub>i,t</sub> - <span class="m-bold">b</span><sub>i,t</sub>
                </div>
                <span class="pipe-note">Membedakan kendala infrastruktur dari deviasi belajar otentik.</span>
              </div>
            </div>

            <div class="solid-connector-down">
              <span class="connector-line"></span>
              <span class="connector-arrow">▼</span>
            </div>

            <!-- Box 6 -->
            <div class="pipe-box pipe-rose">
              <div class="pipe-header">
                <span class="pipe-step-num">LANGKAH 6</span>
                <span class="pipe-eq">Persamaan (9), (9a), (9b)</span>
              </div>
              <div class="pipe-title">6) Evaluasi Keadilan Formal (*Contextual Fairness*)</div>
              <div class="pipe-content">
                <div class="fairness-two-pillars">
                  <div class="f-pil">
                    <strong>Persamaan (9a) Recommendation Burden Gap:</strong>
                    <span class="m-func">max</span><sub>g,h &isin; G</sub> | <span class="m-sym">&#120124;</span>[<span class="m-var">CB</span><sub>i,a,t</sub> | g] - <span class="m-sym">&#120124;</span>[<span class="m-var">CB</span><sub>i,a,t</sub> | h] |
                  </div>
                  <div class="f-pil">
                    <strong>Persamaan (9b) Interpretation Error Gap:</strong>
                    <span class="m-func">max</span><sub>g,h &isin; G</sub> | <span class="m-var">MAE</span><sub>g,t</sub>(d) - <span class="m-var">MAE</span><sub>h,t</sub>(d) |
                  </div>
                </div>
              </div>
            </div>

            <div class="solid-connector-down">
              <span class="connector-line"></span>
              <span class="connector-arrow">▼</span>
            </div>

            <!-- Box 7 -->
            <div class="pipe-box pipe-emerald">
              <div class="pipe-header">
                <span class="pipe-step-num">LANGKAH 7 (OUTPUT)</span>
                <span class="pipe-eq">Persamaan (10) & (11)</span>
              </div>
              <div class="pipe-title">7) Rekomendasi LinUCB Time-Varying Non-Punitif (<strong>a</strong><sub>t+1</sub><sup>*</sup>)</div>
              <div class="pipe-content">
                <div class="math-sym-row wrap">
                  <span class="m-bold">a</span><sub>t+1</sub><sup>*</sup> = <span class="m-func">arg max</span><sub>a &isin; &#119964;</sub> [ <span class="m-bold">&theta;&#770;</span><sub>a,t</sub><sup>T</sup> <span class="m-bold">z</span><sub>i,t</sub> + <span class="m-sym">&alpha;</span><sub>t</sub> &radic;(<span class="m-bold">z</span><sub>i,t</sub><sup>T</sup> <span class="m-bold">A</span><sub>a,t</sub><sup>-1</sup> <span class="m-bold">z</span><sub>i,t</sub>) - <span class="m-sym">&mu;</span><sub>t</sub> <span class="m-var">CB</span><sub>i,a,t</sub> - <span class="m-sym">&nu;</span><sub>t</sub> <span class="m-var">OB</span><sub>i,a,t</sub> - <span class="m-sym">&rho;</span><sub>t</sub> &Delta;<span class="m-bold">c</span><sub>i,t</sub> ]
                </div>
                <span class="pipe-note">Pemilihan materi (materi hemat bandwidth, micro-chunking, audio mikro) dengan dukungan tata kelola HITL.</span>
              </div>
            </div>
          </div>

          <!-- Spatial Moderation Sidebar (Dashed Line Component) -->
          <div class="spatial-moderator-sidebar">
            <div class="dashed-moderator-card">
              <div class="dashed-badge">
                <span class="dashed-icon">┆</span>
                <span>VARIABEL MODERATOR UTAMA</span>
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
                  <!-- Layer 1 -->
                  <div class="layer-item">
                    <span class="layer-dot blue"></span>
                    <div class="layer-txt">
                      <strong>Lapis 1: Klaster Struktural Makro (K<sub>i</sub>)</strong>
                      <span>Data Terbuka BPS, Podes sinyal desa, APJII, Ookla Speedtest (Persamaan 2a).</span>
                    </div>
                  </div>
                  <!-- Layer 2 -->
                  <div class="layer-item">
                    <span class="layer-dot amber"></span>
                    <div class="layer-txt">
                      <strong>Lapis 2: Kualitas Jaringan Sesi (N<sub>i,t</sub>)</strong>
                      <span>Telemetri real-time: Latency, Retry Rate, Buffering, Sync Failure (Persamaan 2b).</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Dashed Connector Visual Indicator -->
              <div class="dashed-action-indicator">
                <div class="indicator-arrow-box">
                  <span class="dashed-arrow-line">---------------------------------➔</span>
                  <span class="indicator-label">Efek Moderasi Statistik (H2a: K<sub>i</sub> &times; x<sub>i,t</sub>)</span>
                </div>
                <ul class="mod-impact-list">
                  <li>
                    <span class="icon-check">✓</span>
                    <span><strong>Mengondisikan Baseline (b<sub>i,t</sub>):</strong> Standar keaktifan wajar di 3T disesuaikan secara adil.</span>
                  </li>
                  <li>
                    <span class="icon-check">✓</span>
                    <span><strong>Mengontrol Gerbang Spasial (g<sub>i,t</sub>):</strong> Jika sinyal drop (S<sub>i,t</sub> &rarr; 0), model beralih mengandalkan konteks c<sub>i,t</sub> agar tidak menghukum peserta.</span>
                  </li>
                  <li>
                    <span class="icon-check">✓</span>
                    <span><strong>Mencegah infrastructural confounding:</strong> Menjaga validitas epistemik sebelum pemilihan rekomendasi.</span>
                  </li>
                </ul>
              </div>

              <div class="service-dynamics-box">
                <div class="sd-head">
                  <span class="sd-tag">⚙️ Service Dynamics Fusion (OB<sub>i,a,t</sub>)</span>
                </div>
                <p class="sd-desc">
                  Data beban layanan publik agregat (SP4N-LAPOR) berinteraksi memoderasi penalti beban operasional pada Persamaan (10) & (11).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- TAHAP 3: ALGORITHM DEVELOPMENT ROADMAP                                    -->
      <!-- ========================================================================= -->
      <section class="card roadmap-section">
        <div class="section-head">
          <div class="badge-row">
            <span class="badge badge-purple">🛣️ Kerangka Pengembangan Bertahap</span>
            <span class="badge badge-yellow">🟡 Status: Under Development</span>
          </div>
          <h2 class="section-title">3. Algorithm Development Roadmap</h2>
          <p class="section-desc">
            Peta jalan iteratif evolusi formulasi matematika dari standard bandit hingga adaptive disparity mitigation:
          </p>
        </div>

        <div class="roadmap-grid">
          <div class="roadmap-step step-done">
            <div class="step-num">STEP 0</div>
            <h3 class="step-heading">Standard LinUCB</h3>
            <p class="step-text">Baseline Li et al. (2010) dengan fitur kontekstual standar.</p>
            <span class="step-tag tag-blue">✅ Baseline Selesai</span>
          </div>

          <div class="roadmap-step step-done">
            <div class="step-num">STEP 1</div>
            <h3 class="step-heading">Context-Aware LinUCB</h3>
            <p class="step-text">Pemodelan vektor kendala spasial, bandwidth (&beta;<sub>bw</sub>), latensi (&beta;<sub>lat</sub>), & beban dinas (T<sub>work</sub>).</p>
            <span class="step-tag tag-blue">✅ Fitur Dipetakan</span>
          </div>

          <div class="roadmap-step step-done">
            <div class="step-num">STEP 2</div>
            <h3 class="step-heading">Disparity Measurement</h3>
            <p class="step-text">Pengukuran gap luaran antar wilayah: D<sub>a,t</sub> = |&mu;&#770;<sub>a,3T</sub> - &mu;&#770;<sub>a,Urban</sub>|.</p>
            <span class="step-tag tag-blue">✅ Metrik Terdefinisi</span>
          </div>

          <div class="roadmap-step step-active">
            <div class="step-num">STEP 3</div>
            <h3 class="step-heading">Disparity-Aware Decision</h3>
            <p class="step-text">Penetapan fungsi skor keputusan berbobot penalti disparitas Score<sub>a,t</sub>.</p>
            <span class="step-tag tag-amber">🟡 Under Development</span>
          </div>

          <div class="roadmap-step step-future">
            <div class="step-num">STEP 4</div>
            <h3 class="step-heading">Adaptive Controller</h3>
            <p class="step-text">Kontroler adaptif parameter penalti &lambda;<sub>t</sub> berbasis kestabilan konvergensi.</p>
            <span class="step-tag tag-amber">🟡 Under Development</span>
          </div>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- TAHAP 4: FORMULASI MATEMATIKA CABA-CCBN DISERTASI (PERSAMAAN 1-11)        -->
      <!-- ========================================================================= -->
      <section class="card candidate-section">
        <div class="candidate-header">
          <div>
            <div class="badge-row">
              <span class="badge badge-amber">📐 Formulasi Matematika Lengkap Proposal</span>
              <span class="badge badge-outline">Persamaan (1) s/d Persamaan (11) Terintegrasi</span>
            </div>
            <h2 class="candidate-title">4. Formulasi Komputasional Utama CABA–CCBN LinUCB</h2>
          </div>
        </div>

        <div class="candidate-math-card">
          <div class="candidate-equation-row">
            <div class="eq-token eq-target">
              <span class="eq-sym"><span class="m-bold">a</span><sub>t+1</sub><sup>*</sup></span>
              <span class="eq-lbl">Aksi Optimal (Persamaan 11)</span>
            </div>
            <span class="eq-op">=</span>
            <span class="eq-op-txt"><span class="m-func">arg max</span><sub>a &isin; &#119964;</sub> [</span>
            <div class="eq-token eq-reward">
              <span class="eq-sym"><span class="m-bold">&theta;&#770;</span><sub>a,t</sub><sup>T</sup> <span class="m-bold">z</span><sub>i,t</sub></span>
              <span class="eq-lbl">Expected Learning Utility</span>
            </div>
            <span class="eq-op">+</span>
            <div class="eq-token eq-explore">
              <span class="eq-sym"><span class="m-sym">&alpha;</span><sub>t</sub> &radic;(<span class="m-bold">z</span><sub>i,t</sub><sup>T</sup> <span class="m-bold">A</span><sub>a,t</sub><sup>-1</sup> <span class="m-bold">z</span><sub>i,t</sub>)</span>
              <span class="eq-lbl">UCB Exploration Bound</span>
            </div>
            <span class="eq-op">-</span>
            <div class="eq-token eq-penalty">
              <span class="eq-sym"><span class="m-sym">&mu;</span><sub>t</sub> <span class="m-var">CB</span><sub>i,a,t</sub></span>
              <span class="eq-lbl">Contextual Burden (Eq. 9)</span>
            </div>
            <span class="eq-op">-</span>
            <div class="eq-token eq-penalty" style="background:#FFF1F2; border-color:#FDA4AF;">
              <span class="eq-sym"><span class="m-sym">&nu;</span><sub>t</sub> <span class="m-var">OB</span><sub>i,a,t</sub> + <span class="m-sym">&rho;</span><sub>t</sub> &Delta;<span class="m-bold">c</span><sub>i,t</sub></span>
              <span class="eq-lbl">Service Burden & Context Shift</span>
            </div>
            <span class="eq-op">]</span>
          </div>

          <div class="candidate-rules-row">
            <div class="rule-box">
              <span class="rule-k">Spatially-Gated Fusion (Eq. 8):</span>
              <span class="rule-v"><span class="m-bold">z</span><sub>i,t</sub> = <span class="m-var">g</span><sub>i,t</sub> &middot; <span class="m-bold">x</span><sub>i,t</sub> + (1 - <span class="m-var">g</span><sub>i,t</sub>) &middot; <span class="m-bold">c</span><sub>i,t</sub></span>
            </div>
            <div class="rule-box">
              <span class="rule-k">Bobot Gerbang Spasial (Eq. 7):</span>
              <span class="rule-v"><span class="m-var">g</span><sub>i,t</sub> = <span class="m-sym">&sigma;</span>(<span class="m-sym">&alpha;</span><span class="m-var">S</span><sub>i,t</sub> + <span class="m-sym">&beta;</span><span class="m-var">I</span><sub>i,t</sub> + <span class="m-sym">&gamma;</span><span class="m-var">q</span><sub>i,t</sub>)</span>
            </div>
            <div class="rule-box">
              <span class="rule-k">Indeks Spasial Komposit (Eq. 2c):</span>
              <span class="rule-v"><span class="m-bold">S</span><sub>i,t</sub> = <span class="m-sym">&delta;</span> <span class="m-bold">K</span><sub>i</sub> + (1 - <span class="m-sym">&delta;</span>) <span class="m-bold">N</span><sub>i,t</sub></span>
            </div>
          </div>
        </div>

        <div class="candidate-disclaimer">
          <span class="disc-icon">💡</span>
          <div class="disc-text">
            <strong>Keterkaitan Konseptual Proposal:</strong> Formulasi Persamaan (11) ini memastikan bahwa algoritma tidak hanya mengejar <em>utility</em> kognitif secara buta, melainkan mengurangi penalti beban kontekstual (<span class="m-var">CB</span><sub>i,a,t</sub>) dan beban operasional dinas (<span class="m-var">OB</span><sub>i,a,t</sub>). Fitur yang digunakan oleh Contextual Bandit berasal dari vektor fusi terkalibrasi <span class="m-bold">z</span><sub>i,t</sub> yang telah dimoderasi oleh kondisi spasial <span class="m-bold">S</span><sub>i,t</sub> dan kualitas data <span class="m-var">q</span><sub>i,t</sub>.
          </div>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- TAHAP 5: SIMULATOR EKSPERIMEN VISUAL & EVALUASI TRADE-OFF                -->
      <!-- ========================================================================= -->
      <section class="section-title-wrap">
        <div class="title-col">
          <h2 class="main-sec-title">5. Simulator Interaktif & Evaluasi Trade-off (Effectiveness vs Equity)</h2>
          <p class="main-sec-desc">
            Uji sensitivitas model terhadap penalti disparitas (λ_t) dan kendala lapangan aktual ASN untuk melihat perbandingan skenario.
          </p>
        </div>
      </section>

      <!-- DYNAMIC LAMBDA CONTROLLER BAR -->
      <section class="card lambda-controller-card">
        <div class="lambda-grid">
          <div class="lambda-control-side">
            <div class="lambda-title-row">
              <label for="lambda-range" class="lambda-label">
                🎚️ Bobot Penalti Disparitas Regional (λ_t):
              </label>
              <span class="lambda-badge">λ_t = {{ lambdaWeight.toFixed(2) }}</span>
            </div>
            <input 
              id="lambda-range"
              type="range" 
              min="0.0" 
              max="1.0" 
              step="0.05" 
              v-model.number="lambdaWeight" 
              class="slider lambda-slider" 
            />
            <div class="lambda-ticks">
              <span>λ = 0.0 (Standard LinUCB / No Fairness)</span>
              <span>λ = 0.50 (Balanced Trade-off)</span>
              <span>λ = 1.0 (Strict Equity Maximization)</span>
            </div>
          </div>

          <div class="lambda-impact-side">
            <div class="impact-pill">
              <span class="imp-k">3T Outcome Terangkat:</span>
              <span class="imp-v text-emerald">{{ dynamic3TOutcome.toFixed(2) }} (+{{ (dynamic3TOutcome - 0.42).toFixed(2) }})</span>
            </div>
            <div class="impact-pill">
              <span class="imp-k">Disparity Gap D:</span>
              <span class="imp-v text-amber">{{ liveDisparityGap.toFixed(2) }} (-{{ liveGapReductionPct }}%)</span>
            </div>
            <div class="impact-pill">
              <span class="imp-k">Efisiensi Agregat:</span>
              <span class="imp-v text-slate">{{ dynamicOverallReward.toFixed(2) }} (Trade-off: -{{ (0.71 - dynamicOverallReward).toFixed(2) }})</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Scenario Comparison Deck (Scenario A vs Scenario B Live) -->
      <div class="scenarios-grid">
        <!-- Scenario A Card -->
        <div class="card scenario-card border-slate">
          <div class="sc-header">
            <span class="sc-tag tag-slate">SKENARIO A</span>
            <span class="sc-name">Standard LinUCB (λ = 0)</span>
          </div>
          <div class="sc-stats-row">
            <div class="sc-stat">
              <span class="sc-val text-slate">0.71</span>
              <span class="sc-lbl">Overall Reward</span>
            </div>
            <div class="sc-stat">
              <span class="sc-val text-rose">0.42</span>
              <span class="sc-lbl">3T Outcome</span>
            </div>
            <div class="sc-stat">
              <span class="sc-val text-emerald">0.71</span>
              <span class="sc-lbl">Urban Outcome</span>
            </div>
          </div>
          <div class="sc-bar-alert bar-rose">
            <span>Disparity Gap: <strong>D = 0.29</strong> (Kesenjangan Lebar / Unfair)</span>
          </div>
        </div>

        <!-- Scenario B Card (Live Reactive) -->
        <div class="card scenario-card border-emerald">
          <div class="sc-header">
            <span class="sc-tag tag-emerald">SKENARIO B (KANDIDAT)</span>
            <span class="sc-name">Candidate Disparity-Aware LinUCB (λ = {{ lambdaWeight.toFixed(2) }})</span>
          </div>
          <div class="sc-stats-row">
            <div class="sc-stat">
              <span class="sc-val text-emerald">{{ dynamicOverallReward.toFixed(2) }}</span>
              <span class="sc-lbl">Overall Reward</span>
            </div>
            <div class="sc-stat">
              <span class="sc-val text-emerald">{{ dynamic3TOutcome.toFixed(2) }}</span>
              <span class="sc-lbl">3T Outcome (Terangkat)</span>
            </div>
            <div class="sc-stat">
              <span class="sc-val text-emerald">{{ dynamicUrbanOutcome.toFixed(2) }}</span>
              <span class="sc-lbl">Urban Outcome</span>
            </div>
          </div>
          <div class="sc-bar-alert bar-emerald">
            <span>Disparity Gap: <strong>D = {{ liveDisparityGap.toFixed(2) }}</strong> (Kesenjangan Menyempit -{{ liveGapReductionPct }}%)</span>
          </div>
        </div>
      </div>

      <!-- Trade-off Evaluation Table -->
      <div class="card table-section-card">
        <h3 class="table-card-title">
          📊 Tabel Evaluasi Trade-off: Efektivitas Agregat vs Keadilan Regional (Equity)
        </h3>
        <div class="table-responsive">
          <table class="tradeoff-tbl">
            <thead>
              <tr>
                <th>Metrik Evaluasi Komparatif</th>
                <th>Scenario A (Standard LinUCB)</th>
                <th>Scenario B (Candidate Disparity-Aware)</th>
                <th>Delta / Dampak Perlakuan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Overall Reward</strong> (Efektivitas Agregat)</td>
                <td><span class="tbl-badge">0.71</span></td>
                <td><span class="tbl-badge">{{ dynamicOverallReward.toFixed(2) }}</span></td>
                <td class="text-amber"><strong>-{{ (0.71 - dynamicOverallReward).toFixed(2) }}</strong> (Trade-off efisiensi terkendali)</td>
              </tr>
              <tr>
                <td><strong>3T Region Outcome</strong> (Kelompok Rentan Spasial)</td>
                <td><span class="tbl-badge text-rose">0.42 (Tertinggal)</span></td>
                <td><span class="tbl-badge text-emerald">{{ dynamic3TOutcome.toFixed(2) }} (Meningkat)</span></td>
                <td class="text-emerald"><strong>+{{ (dynamic3TOutcome - 0.42).toFixed(2) }}</strong> (Perbaikan keadilan luaran)</td>
              </tr>
              <tr>
                <td><strong>Urban Region Outcome</strong> (Perkotaan)</td>
                <td><span class="tbl-badge">0.71</span></td>
                <td><span class="tbl-badge">{{ dynamicUrbanOutcome.toFixed(2) }}</span></td>
                <td class="text-slate">-{{ (0.71 - dynamicUrbanOutcome).toFixed(2) }}</td>
              </tr>
              <tr class="highlight-tr">
                <td><strong>Disparity Gap D = |μ̂_{3T} - μ̂_{Urban}|</strong></td>
                <td><span class="tbl-badge badge-rose">0.29 (Kesenjangan Lebar)</span></td>
                <td><span class="tbl-badge badge-emerald">{{ liveDisparityGap.toFixed(2) }} (Kesenjangan Rata)</span></td>
                <td class="text-emerald"><strong>-{{ (0.29 - liveDisparityGap).toFixed(2) }} (Reduksi Disparitas ~{{ liveGapReductionPct }}%)</strong></td>
              </tr>
              <tr>
                <td><strong>Recommendation Burden Gap (Persamaan 9a)</strong><br><small class="text-slate">max |E[CB|3T] - E[CB|Urban]| (Disparitas Beban Kuota/Waktu)</small></td>
                <td><span class="tbl-badge badge-rose">0.38 (Beban Timpang)</span></td>
                <td><span class="tbl-badge badge-emerald">{{ (liveDisparityGap * 0.45).toFixed(2) }} (Beban Setara)</span></td>
                <td class="text-emerald"><strong>Mencegah modul berbobot berat dipaksakan di 3T</strong></td>
              </tr>
              <tr>
                <td><strong>Interpretation Error Gap (Persamaan 9b)</strong><br><small class="text-slate">max |MAE_{3T}(d) - MAE_{Urban}(d)| (Guardrail Epistemik MNAR)</small></td>
                <td><span class="tbl-badge badge-rose">0.24 (Bias Observabilitas)</span></td>
                <td><span class="tbl-badge badge-emerald">{{ (0.04 + liveDisparityGap * 0.1).toFixed(2) }} (&lt; 0.05 Target)</span></td>
                <td class="text-emerald"><strong>Validitas pembacaan trace seimbang di semua wilayah</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- MAIN SIMULATOR INTERFACE (TWO COLUMNS HIGH-TECH DECK) -->
      <div class="sim-deck-grid">
        <!-- LEFT COLUMN: Input Constraints (Keterbatasan Akses & Konteks) -->
        <div class="card sim-panel-card">
          <div class="panel-head">
            <div class="panel-head-left">
              <span class="icon-pulse">🎛️</span>
              <h3 class="panel-title">Input Kendala Akses & Konteks ASN</h3>
            </div>
            <span class="code-pill">Vektor x_t ∈ C(t)</span>
          </div>

          <!-- Presets -->
          <div class="preset-wrap">
            <span class="preset-label">Skenario Lapangan Cepat:</span>
            <div class="preset-btn-group">
              <button @click="applyPreset('3T_mobile')" class="p-btn" :class="{ active: currentPreset === '3T_mobile' }">
                <span class="p-icon">🏝️</span>
                <span class="p-txt">Daerah 3T (Ponsel, Sinyal Drop)</span>
              </button>
              <button @click="applyPreset('office_rush')" class="p-btn" :class="{ active: currentPreset === 'office_rush' }">
                <span class="p-icon">🏢</span>
                <span class="p-txt">Jam Kantor Sibuk (Desktop, SPPD)</span>
              </button>
              <button @click="applyPreset('night_study')" class="p-btn" :class="{ active: currentPreset === 'night_study' }">
                <span class="p-icon">🌙</span>
                <span class="p-txt">Belajar Malam (Mandiri, Lancar)</span>
              </button>
            </div>
          </div>

          <!-- Parameter 1: Bandwidth & Throughput -->
          <div class="control-box">
            <div class="ctrl-header">
              <label class="ctrl-lbl">Throughput Jaringan (β_bw):</label>
              <span class="val-pill pill-blue">{{ bandwidthKbps }} kbps ({{ bandwidthQuality }})</span>
            </div>
            <input type="range" min="50" max="10000" step="50" v-model.number="bandwidthKbps" class="slider slider-blue" />
            <div class="slider-marks">
              <span>50 kbps (3T Satelit)</span>
              <span>1000 kbps (3G)</span>
              <span>10.000 kbps (Fiber)</span>
            </div>
          </div>

          <!-- Parameter 2: Latency & Stall Ratio -->
          <div class="control-box">
            <div class="ctrl-header">
              <label class="ctrl-lbl">Latensi & Stall Ratio (β_lat):</label>
              <span class="val-pill" :class="stallRatio > 20 ? 'pill-rose' : 'pill-slate'">{{ latencyMs }} ms / Buffer {{ stallRatio }}%</span>
            </div>
            <input type="range" min="20" max="1200" step="20" v-model.number="latencyMs" class="slider slider-amber" />
          </div>

          <!-- Parameter 3: Device Form Factor -->
          <div class="control-box">
            <div class="ctrl-header">
              <label class="ctrl-lbl">Perangkat Akses (δ_dev):</label>
              <span class="val-pill pill-slate">{{ deviceName }} (Bobot: {{ devicePenalty }})</span>
            </div>
            <div class="segmented-box">
              <button :class="{ active: deviceType === 'smartphone' }" @click="deviceType = 'smartphone'">
                📱 Smartphone <span class="dev-w">(1.0)</span>
              </button>
              <button :class="{ active: deviceType === 'tablet' }" @click="deviceType = 'tablet'">
                📲 Tablet <span class="dev-w">(0.6)</span>
              </button>
              <button :class="{ active: deviceType === 'desktop' }" @click="deviceType = 'desktop'">
                💻 Desktop <span class="dev-w">(0.2)</span>
              </button>
            </div>
          </div>

          <!-- Parameter 4: Workload & Task Interruption -->
          <div class="control-box">
            <div class="ctrl-header">
              <label class="ctrl-lbl">Beban Pelayanan & Interupsi Dinas (T_work):</label>
              <span class="val-pill pill-rose">{{ workloadLevel }}/5 ({{ workloadDesc }})</span>
            </div>
            <input type="range" min="1" max="5" step="1" v-model.number="workloadLevel" class="slider slider-rose" />
            <div class="workload-meter">
              <div v-for="i in 5" :key="i" class="meter-bar" :class="{ filled: i <= workloadLevel, high: i > 3 }"></div>
            </div>
          </div>

          <!-- Parameter 5: Sinyal Telemetri Perilaku Aktual -->
          <div class="telemetry-box">
            <div class="tele-header">
              <span class="tele-badge">📡 Telemetri Lapangan Aktual</span>
              <span class="tele-subhead">Bukti Objektif Perilaku (B_tele)</span>
            </div>
            <div class="tele-grid">
              <div class="tele-col">
                <div class="tele-label-row">
                  <label class="tele-lbl">Tab-Focus Ratio (τ_focus):</label>
                  <span class="tele-val">{{ (observedFocus * 100).toFixed(0) }}% aktif</span>
                </div>
                <input type="range" min="0.05" max="1.0" step="0.05" v-model.number="observedFocus" class="slider slider-purple" />
                <div class="tele-bar-bg">
                  <div class="tele-bar-fill" :style="{ width: `${observedFocus * 100}%` }"></div>
                </div>
              </div>
              <div class="tele-col">
                <div class="tele-label-row">
                  <label class="tele-lbl">Partial Retention (R_partial):</label>
                  <span class="tele-val">{{ (observedRetention * 100).toFixed(0) }}% inti</span>
                </div>
                <input type="range" min="0.1" max="1.0" step="0.05" v-model.number="observedRetention" class="slider slider-emerald" />
                <div class="tele-bar-bg">
                  <div class="tele-bar-fill fill-green" :style="{ width: `${observedRetention * 100}%` }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Algorithmic Mediation Output & Comparison -->
        <div class="card sim-panel-card">
          <div class="panel-head">
            <div class="panel-head-left">
              <span class="icon-pulse purple">🧠</span>
              <h3 class="panel-title">Kalkulasi Komputasi CCBN & Fair-LinUCB</h3>
            </div>
            <span class="code-pill pill-purple">Output Mediasi Real-Time</span>
          </div>

          <!-- Step 1: CCBN Counterfactual Normalization -->
          <div class="calc-panel border-purple">
            <div class="calc-top">
              <span class="calc-tag">STEP 1: CCBN NORMALISASI RESIDUAL</span>
              <span class="formula-sm">ΔB = B_obs - E[B | C]</span>
            </div>
            <div class="metrics-3-col">
              <div class="m-card">
                <span class="m-lbl">Ekspektasi E[τ_focus | C]:</span>
                <span class="m-val">{{ (expectedFocus * 100).toFixed(0) }}%</span>
                <span class="m-sub">Dihitung dari kendala C(t)</span>
              </div>
              <div class="m-card">
                <span class="m-lbl">Perilaku Teramati B_obs:</span>
                <span class="m-val">{{ (observedFocus * 100).toFixed(0) }}%</span>
                <span class="m-sub">Fokus tab riil</span>
              </div>
              <div class="m-card m-highlight">
                <span class="m-lbl">Sinyal Residual ΔB:</span>
                <span class="m-val" :style="{ color: deltaBColor }">{{ liveDeltaB >= 0 ? '+' : '' }}{{ liveDeltaB.toFixed(2) }}</span>
                <span class="m-sub"><strong>{{ deltaBInterpretation }}</strong></span>
              </div>
            </div>
          </div>

          <!-- Step 2: Algorithmic Action Selection (YouTube Bitrate Analogy) -->
          <div class="calc-panel border-emerald" style="margin-top: 1rem;">
            <div class="calc-top">
              <span class="calc-tag tag-green">CANDIDATE DISPARITY-AWARE ACTION SELECTION</span>
              <span class="formula-sm">a_t^* = \arg\max_a Score_{a,t}</span>
            </div>
            
            <div class="action-card">
              <div class="action-top">
                <span class="act-badge">{{ selectedAction.tag }}</span>
                <span class="act-score">Score = {{ liveRewardScore.toFixed(2) }}</span>
              </div>
              <h4 class="act-title">{{ selectedAction.name }}</h4>
              <p class="act-desc">{{ selectedAction.desc }}</p>
              
              <div class="specs-grid">
                <div class="spec-cell">
                  <span class="sk">Resolusi Kognitif:</span>
                  <span class="sv">{{ selectedAction.cognitiveResolution }}</span>
                </div>
                <div class="spec-cell">
                  <span class="sk">Modalitas:</span>
                  <span class="sv">{{ selectedAction.modality }}</span>
                </div>
                <div class="spec-cell">
                  <span class="sk">Biaya Bandwidth:</span>
                  <span class="sv text-emerald">{{ selectedAction.bandwidthCost }}</span>
                </div>
                <div class="spec-cell">
                  <span class="sk">Disrupsi Waktu Kerja:</span>
                  <span class="sv">{{ selectedAction.workloadFriction }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Policy Comparison (3-Way Modern Cards) -->
          <div style="margin-top: 1.25rem;">
            <h4 class="policy-sec-title">
              ⚖️ Perbandingan Perlakuan Antar Kebijakan Algoritmik:
            </h4>
            <div class="policy-card-stack">
              <!-- Policy 1: Punitive -->
              <div class="pol-item-card pol-danger">
                <div class="pol-top">
                  <span class="pol-name">1. LMS Konvensional (Punitive)</span>
                  <span class="pol-status status-danger">❌ Unfair Penalty (Context Blind)</span>
                </div>
                <div class="pol-body">
                  <span class="pol-decision">Keputusan: <strong>{{ punitivePolicyDecision }}</strong></span>
                  <span class="pol-note">Menghukum ASN yang terkendala jaringan/tugas kedinasan tanpa normalisasi konteks.</span>
                </div>
              </div>

              <!-- Policy 2: Static Rule -->
              <div class="pol-item-card pol-warning">
                <div class="pol-top">
                  <span class="pol-name">2. Static Rule-Based</span>
                  <span class="pol-status status-warning">⚠️ Drop / Kaku (Rigid Threshold)</span>
                </div>
                <div class="pol-body">
                  <span class="pol-decision">Keputusan: <strong>{{ staticRuleDecision }}</strong></span>
                  <span class="pol-note">Gagal beradaptasi pada fluktuasi bandwidth dinamis dan interupsi pelayanan publik.</span>
                </div>
              </div>

              <!-- Policy 3: Candidate Disparity-Aware LinUCB -->
              <div class="pol-item-card pol-success">
                <div class="pol-top">
                  <span class="pol-name">3. Candidate Disparity-Aware LinUCB</span>
                  <span class="pol-status status-success">✅ Evaluating Effectiveness–Equity Trade-off</span>
                </div>
                <div class="pol-body">
                  <span class="pol-decision text-emerald">Keputusan: <strong>{{ selectedAction.name }}</strong></span>
                  <span class="pol-note">Memilih aksi adaptif secara adil berdasarkan residu ΔB dan memitigasi disparitas luaran antar wilayah.</span>
                </div>
              </div>
            </div>

            <!-- Human-in-the-Loop (HITL) Widyaiswara Action & Audit Box -->
            <div class="hitl-governance-card">
              <div class="hitl-head">
                <div class="hitl-title-row">
                  <span class="hitl-icon">🛡️</span>
                  <span class="hitl-heading">Human-in-the-Loop (HITL) & Non-Punitive Audit</span>
                </div>
                <span class="hitl-badge" :class="hitlStatus === 'approved' ? 'badge-green' : 'badge-amber'">
                  {{ hitlStatus === 'approved' ? '✅ Rekomendasi Terverifikasi' : (hitlStatus === 'modified' ? '✏️ Dikoreksi Widyaiswara' : '⏸️ Ditunda / Reschedule') }}
                </span>
              </div>
              <p class="hitl-desc">
                Sesuai batasan tata kelola proposal (Sub-bab 4.3), seluruh rekomendasi algoritma berada di bawah supervisi Widyaiswara dan hanya berfungsi sebagai <strong>dukungan peningkatan kapasitas</strong>, bukan instrumen penilaian disiplin/punitif.
              </p>
              <div class="hitl-btn-group">
                <button 
                  class="hitl-btn" 
                  :class="{ active: hitlStatus === 'approved' }"
                  @click="setHitlStatus('approved')"
                >
                  <span>✓ Setujui Format Adaptif</span>
                </button>
                <button 
                  class="hitl-btn" 
                  :class="{ active: hitlStatus === 'modified' }"
                  @click="setHitlStatus('modified')"
                >
                  <span>✏️ Koreksi Moda Belajar</span>
                </button>
                <button 
                  class="hitl-btn" 
                  :class="{ active: hitlStatus === 'deferred' }"
                  @click="setHitlStatus('deferred')"
                >
                  <span>⏸️ Jadwal Ulang (Beban Dinas)</span>
                </button>
              </div>
              <div class="hitl-audit-log">
                <span class="log-label">📋 Entri Log Audit Tata Kelola:</span>
                <code>[AUDIT-LOG: {{ currentPreset.toUpperCase() }}] Rekomendasi='{{ selectedAction.name }}' | Residual ΔB={{ liveDeltaB.toFixed(2) }} | Status={{ hitlStatus.toUpperCase() }} | Proteksi: Data Dipseudonimkan & Non-Punitif.</code>
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

// Human-in-the-Loop State
const hitlStatus = ref<'approved' | 'modified' | 'deferred'>('approved');
function setHitlStatus(status: 'approved' | 'modified' | 'deferred') {
  hitlStatus.value = status;
}

// Dynamic Lambda (Disparity Penalty Weight)
const lambdaWeight = ref<number>(0.50);

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

// Dynamic Disparity Trade-off Computations
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
  const gap = Math.abs(dynamicUrbanOutcome.value - dynamic3TOutcome.value);
  return Math.round(gap * 100) / 100;
});

const liveGapReductionPct = computed(() => {
  const initialGap = 0.29;
  const currentGap = liveDisparityGap.value;
  const reduction = Math.max(0, ((initialGap - currentGap) / initialGap) * 100);
  return Math.round(reduction);
});

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
  let base = 0.90;
  base -= (workloadLevel.value / 5) * 0.45;
  if (bandwidthKbps.value < 250) base -= 0.15;
  if (deviceType.value === 'smartphone') base -= 0.10;
  return Math.max(Math.min(base, 0.95), 0.20);
});

const liveDeltaB = computed(() => {
  return observedFocus.value - expectedFocus.value;
});

const deltaBColor = computed(() => {
  if (liveDeltaB.value >= -0.05) return '#10B981'; // Emerald (Safe/Wajar)
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

// Candidate Action Selection
const selectedAction = computed(() => {
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
  let gain = observedRetention.value * 1.2;
  let workPenalty = (workloadLevel.value / 5) * 0.3;
  let infraPenalty = (1000 / Math.max(bandwidthKbps.value, 100)) * 0.15;
  let fairnessBonus = liveDeltaB.value >= -0.05 ? 0.35 : -0.25;
  let disparityPenalty = lambdaWeight.value * liveDisparityGap.value * 0.4;

  return Math.max(gain - workPenalty - infraPenalty + fairnessBonus - disparityPenalty, 0.1);
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

.badge {
  font-size: 0.725rem;
  font-weight: 700;
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  letter-spacing: 0.02em;
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

.badge-outline {
  background: transparent;
  color: #64748B;
  border: 1px dashed #CBD5E1;
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
  font-size: 0.9rem;
  color: #CBD5E1;
  line-height: 1.6;
  margin: 0;
}

.formula-code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  background: rgba(255, 255, 255, 0.12);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  color: #FDE047;
}

.hero-kpi-deck {
  display: flex;
  gap: 0.85rem;
  flex-wrap: wrap;
}

.kpi-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(8px);
  padding: 0.85rem 1.15rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
}

.kpi-card.highlight {
  border-color: rgba(245, 158, 11, 0.4);
  background: rgba(245, 158, 11, 0.08);
}

.kpi-label {
  font-size: 0.675rem;
  font-weight: 700;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.kpi-val {
  font-size: 1.45rem;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
  margin: 0.2rem 0;
}

.kpi-sub {
  font-size: 0.65rem;
  color: #64748B;
  font-weight: 600;
}

/* ========================================================================= */
/* TAHAP 1 & 2: DUAL THEORY CARDS                                            */
/* ========================================================================= */
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
  background: #FFFFFF;
  border-radius: 14px;
  padding: 1.5rem;
  border: 1px solid #E2E8F0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);
}

.stage-card.border-blue {
  border-top: 5px solid #2563EB;
}

.stage-card.border-rose {
  border-top: 5px solid #E11D48;
}

.stage-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.stage-pill {
  font-size: 0.675rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
}

.pill-blue { background: #EFF6FF; color: #1D4ED8; }
.pill-rose { background: #FFF1F2; color: #BE123C; }

.stage-ref {
  font-size: 0.725rem;
  font-weight: 700;
  color: #64748B;
  background: #F8FAFC;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #E2E8F0;
}

.stage-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 0.5rem 0;
}

.stage-p {
  font-size: 0.85rem;
  color: #475569;
  line-height: 1.55;
  margin-bottom: 1rem;
}

.code-sm {
  font-family: monospace;
  font-weight: 700;
  background: #F1F5F9;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  color: #1E293B;
}

.math-box {
  padding: 1rem 1.15rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.math-blue {
  background: #F0F7FF;
  border: 1px solid #BFDBFE;
}

.math-display {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.925rem;
  font-weight: 700;
  color: #1E40AF;
  text-align: center;
  margin-bottom: 0.5rem;
}

.math-legend {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.725rem;
  color: #475569;
  flex-wrap: wrap;
}

.dot { color: #94A3B8; }

.stage-callout {
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  line-height: 1.45;
}

.callout-blue { background: #EFF6FF; color: #1E3A8A; border: 1px solid #DBEAFE; }
.callout-rose { background: #FFF1F2; color: #9F1239; border: 1px solid #FFE4E6; }
.callout-icon { font-size: 0.95rem; }

/* Disparity Flow Visual */
.disparity-flow {
  background: #FFF5F5;
  border: 1px solid #FECDD3;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.flow-step {
  display: flex;
  flex-direction: column;
}

.flow-badge {
  font-size: 0.75rem;
  font-weight: 700;
  background: #FFFFFF;
  padding: 0.4rem 0.65rem;
  border-radius: 6px;
  border: 1px solid #FDA4AF;
  color: #9F1239;
}

.flow-badge.badge-high {
  color: #047857;
  border-color: #A7F3D0;
  background: #ECFDF5;
}

.flow-arrow {
  color: #E11D48;
  font-weight: 800;
}

.flow-split {
  gap: 0.25rem;
}

.split-pill {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.45rem;
  border-radius: 4px;
}

.split-3t { background: #FEF2F2; color: #DC2626; border: 1px solid #FECDD3; }
.split-urban { background: #ECFDF5; color: #059669; border: 1px solid #A7F3D0; }
.split-gap-alert {
  font-size: 0.75rem;
  font-weight: 800;
  color: #BE123C;
  margin-top: 0.3rem;
}

/* ========================================================================= */
/* TAHAP 3: ROADMAP                                                          */
/* ========================================================================= */
.roadmap-section {
  background: #FFFFFF;
  border-radius: 14px;
  padding: 1.75rem;
  border: 1px solid #E2E8F0;
  margin-bottom: 2rem;
}

.section-head {
  margin-bottom: 1.25rem;
}

.badge-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.4rem;
  flex-wrap: wrap;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 0.35rem 0;
}

.section-desc {
  font-size: 0.85rem;
  color: #64748B;
  margin: 0;
}

.roadmap-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 1rem;
}

.roadmap-step {
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #E2E8F0;
  background: #F8FAFC;
  display: flex;
  flex-direction: column;
}

.step-done {
  background: #F0F9FF;
  border-color: #BAE6FD;
}

.step-active {
  background: #FFFBEB;
  border-color: #FDE047;
  border-width: 2px;
}

.step-future {
  background: #F8FAFC;
  border-color: #E2E8F0;
}

.step-num {
  font-size: 0.675rem;
  font-weight: 800;
  color: #64748B;
  margin-bottom: 0.25rem;
}

.step-heading {
  font-size: 0.9rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 0.35rem 0;
}

.step-text {
  font-size: 0.775rem;
  color: #475569;
  line-height: 1.45;
  margin-bottom: 0.75rem;
  flex: 1;
}

.step-tag {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
  align-self: flex-start;
}

.tag-blue { background: #E0F2FE; color: #0369A1; }
.tag-amber { background: #FEF3C7; color: #B45309; }

/* ========================================================================= */
/* TAHAP 4: CANDIDATE FORMULATION                                            */
/* ========================================================================= */
.candidate-section {
  background: linear-gradient(135deg, #FFFDF5 0%, #FEF9C3 100%);
  border: 2px solid #FCD34D;
  border-radius: 14px;
  padding: 1.75rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.08);
}

.candidate-header {
  margin-bottom: 1.25rem;
}

.candidate-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #78350F;
  margin: 0.35rem 0 0 0;
}

.candidate-math-card {
  background: #FFFFFF;
  border: 1px solid #FDE68A;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
}

.candidate-equation-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  font-family: 'JetBrains Mono', monospace;
  margin-bottom: 1.25rem;
}

.eq-token {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0.85rem;
  border-radius: 8px;
}

.eq-sym {
  font-size: 1.1rem;
  font-weight: 800;
}

.eq-lbl {
  font-size: 0.65rem;
  font-family: sans-serif;
  font-weight: 600;
  color: #64748B;
  margin-top: 0.25rem;
}

.eq-target { background: #F8FAFC; border: 1px solid #CBD5E1; color: #0F172A; }
.eq-reward { background: #EFF6FF; border: 1px solid #BFDBFE; color: #1E3A8A; }
.eq-explore { background: #F3E8FF; border: 1px solid #DDD6FE; color: #6B21A8; }
.eq-penalty { background: #FEF2F2; border: 1px solid #FECDD3; color: #9F1239; }

.eq-op {
  font-size: 1.35rem;
  font-weight: 700;
  color: #64748B;
}

.candidate-rules-row {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  border-top: 1px dashed #CBD5E1;
  padding-top: 1rem;
  font-size: 0.875rem;
}

.rule-box {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.rule-k { color: #64748B; font-weight: 600; }
.rule-v { font-family: monospace; font-weight: 800; color: #1E293B; }

.candidate-disclaimer {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.75);
  padding: 0.85rem 1.15rem;
  border-radius: 8px;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.disc-text {
  font-size: 0.8rem;
  color: #78350F;
  line-height: 1.5;
}

/* ========================================================================= */
/* TAHAP 5: INTERACTIVE SIMULATOR & TRADE-OFF CONTROLLER                     */
/* ========================================================================= */
.section-title-wrap {
  margin-bottom: 1.25rem;
}

.main-sec-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 0.3rem 0;
}

.main-sec-desc {
  font-size: 0.875rem;
  color: #64748B;
  margin: 0;
}

/* LAMBDA CONTROLLER CARD */
.lambda-controller-card {
  background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
  border-radius: 14px;
  padding: 1.5rem 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 20px -4px rgba(15, 23, 42, 0.3);
  margin-bottom: 1.5rem;
}

.lambda-grid {
  display: grid;
  grid-template-columns: 1.3fr 1.7fr;
  gap: 1.5rem;
  align-items: center;
}

@media (max-width: 960px) {
  .lambda-grid {
    grid-template-columns: 1fr;
  }
}

.lambda-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.lambda-label {
  font-size: 0.875rem;
  font-weight: 700;
  color: #F8FAFC;
}

.lambda-badge {
  font-family: monospace;
  font-size: 0.85rem;
  font-weight: 800;
  color: #F59E0B;
  background: rgba(245, 158, 11, 0.18);
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  border: 1px solid rgba(245, 158, 11, 0.35);
}

.lambda-slider {
  width: 100%;
  accent-color: #F59E0B;
  cursor: pointer;
}

.lambda-ticks {
  display: flex;
  justify-content: space-between;
  font-size: 0.675rem;
  color: #94A3B8;
  margin-top: 0.35rem;
}

.lambda-impact-side {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

@media (max-width: 600px) {
  .lambda-impact-side {
    grid-template-columns: 1fr;
  }
}

.impact-pill {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.75rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.imp-k {
  font-size: 0.675rem;
  font-weight: 600;
  color: #CBD5E1;
  margin-bottom: 0.25rem;
}

.imp-v {
  font-size: 1.1rem;
  font-weight: 800;
  font-family: monospace;
}

/* SCENARIOS COMPARISON CARDS */
.scenarios-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 850px) {
  .scenarios-grid {
    grid-template-columns: 1fr;
  }
}

.scenario-card {
  background: #FFFFFF;
  border-radius: 14px;
  padding: 1.35rem 1.5rem;
  border: 1px solid #E2E8F0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);
}

.scenario-card.border-slate { border-left: 5px solid #64748B; }
.scenario-card.border-emerald { border-left: 5px solid #10B981; }

.sc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.sc-tag {
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.25rem 0.55rem;
  border-radius: 4px;
}

.tag-slate { background: #F1F5F9; color: #475569; }
.tag-emerald { background: #D1FAE5; color: #047857; }

.sc-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: #0F172A;
}

.sc-stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.sc-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #F8FAFC;
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
}

.sc-val {
  font-size: 1.25rem;
  font-weight: 800;
  font-family: monospace;
}

.sc-lbl {
  font-size: 0.65rem;
  color: #64748B;
  font-weight: 600;
  margin-top: 0.15rem;
  text-align: center;
}

.sc-bar-alert {
  padding: 0.6rem 0.85rem;
  border-radius: 8px;
  font-size: 0.8rem;
  text-align: center;
}

.bar-rose { background: #FFF1F2; color: #9F1239; border: 1px solid #FECDD3; }
.bar-emerald { background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; }

/* TRADEOFF TABLE */
.table-section-card {
  background: #FFFFFF;
  border-radius: 14px;
  padding: 1.5rem;
  border: 1px solid #E2E8F0;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);
}

.table-card-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 1rem 0;
}

.table-responsive {
  overflow-x: auto;
}

.tradeoff-tbl {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.tradeoff-tbl th, .tradeoff-tbl td {
  padding: 0.85rem 1.15rem;
  text-align: left;
  border-bottom: 1px solid #E2E8F0;
}

.tradeoff-tbl th {
  background: #F8FAFC;
  font-weight: 700;
  color: #334155;
}

.tradeoff-tbl .highlight-tr {
  background: #F0FDF4;
  font-weight: 700;
}

.tbl-badge {
  font-family: monospace;
  font-size: 0.825rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: #F1F5F9;
  color: #0F172A;
}

.badge-rose { background: #FFE4E6; color: #BE123C; }
.badge-emerald { background: #D1FAE5; color: #047857; }

/* ========================================================================= */
/* MAIN SIMULATOR INTERFACE (TWO COLUMNS HIGH-TECH DECK)                     */
/* ========================================================================= */
.sim-deck-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (max-width: 960px) {
  .sim-deck-grid {
    grid-template-columns: 1fr;
  }
}

.sim-panel-card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 1.65rem;
  border: 1px solid #E2E8F0;
  box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.05);
}

.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.85rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid #F1F5F9;
}

.panel-head-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon-pulse {
  font-size: 1.15rem;
}

.panel-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0;
  letter-spacing: -0.01em;
}

.code-pill {
  font-size: 0.725rem;
  font-weight: 700;
  color: #2563EB;
  background: #EFF6FF;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  border: 1px solid #BFDBFE;
}

.code-pill.pill-purple {
  color: #7C3AED;
  background: #F5F3FF;
  border-color: #DDD6FE;
}

/* Presets */
.preset-wrap {
  margin-bottom: 1.25rem;
}

.preset-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748B;
  display: block;
  margin-bottom: 0.45rem;
}

.preset-btn-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.p-btn {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.45rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #CBD5E1;
  background: #F8FAFC;
  color: #334155;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.p-btn:hover {
  background: #EEF2F6;
  border-color: #94A3B8;
  transform: translateY(-1px);
}

.p-btn.active {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  color: #FFFFFF;
  border-color: #0F172A;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.2);
}

/* Control Items */
.control-box {
  margin-bottom: 1.25rem;
  background: #F8FAFC;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  border: 1px solid #F1F5F9;
}

.ctrl-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.45rem;
}

.ctrl-lbl {
  font-size: 0.825rem;
  font-weight: 700;
  color: #1E293B;
}

.val-pill {
  font-size: 0.75rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
}

.pill-blue { background: #EFF6FF; color: #1D4ED8; border: 1px solid #BFDBFE; }
.pill-rose { background: #FFF1F2; color: #BE123C; border: 1px solid #FECDD3; }
.pill-slate { background: #F1F5F9; color: #334155; border: 1px solid #CBD5E1; }

.slider {
  width: 100%;
  cursor: pointer;
  height: 6px;
  border-radius: 4px;
}

.slider-blue { accent-color: #2563EB; }
.slider-amber { accent-color: #F59E0B; }
.slider-rose { accent-color: #E11D48; }
.slider-purple { accent-color: #8B5CF6; }
.slider-emerald { accent-color: #10B981; }

.slider-marks {
  display: flex;
  justify-content: space-between;
  font-size: 0.65rem;
  color: #94A3B8;
  margin-top: 0.25rem;
}

.segmented-box {
  display: flex;
  gap: 0.35rem;
  background: #E2E8F0;
  padding: 0.25rem;
  border-radius: 8px;
}

.segmented-box button {
  flex: 1;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.45rem;
  border: none;
  background: transparent;
  color: #475569;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.segmented-box button .dev-w {
  font-size: 0.65rem;
  opacity: 0.75;
}

.segmented-box button.active {
  background: #FFFFFF;
  color: #0F172A;
  font-weight: 800;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

/* Workload Meter */
.workload-meter {
  display: flex;
  gap: 0.3rem;
  margin-top: 0.4rem;
}

.meter-bar {
  flex: 1;
  height: 5px;
  background: #E2E8F0;
  border-radius: 3px;
  transition: background 0.3s ease;
}

.meter-bar.filled {
  background: #F59E0B;
}

.meter-bar.filled.high {
  background: #EF4444;
}

/* Telemetry Box */
.telemetry-box {
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  padding: 1.15rem;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  margin-top: 1.25rem;
}

.tele-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.85rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px dashed #CBD5E1;
}

.tele-badge {
  font-size: 0.775rem;
  font-weight: 800;
  color: #0F172A;
}

.tele-subhead {
  font-size: 0.7rem;
  color: #64748B;
  font-weight: 600;
}

.tele-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.tele-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.35rem;
}

.tele-lbl {
  font-size: 0.75rem;
  font-weight: 700;
  color: #334155;
}

.tele-val {
  font-size: 0.75rem;
  font-weight: 800;
  color: #0F172A;
  font-family: monospace;
}

.tele-bar-bg {
  height: 6px;
  background: #E2E8F0;
  border-radius: 999px;
  overflow: hidden;
  margin-top: 0.35rem;
}

.tele-bar-fill {
  height: 100%;
  background: #8B5CF6;
  border-radius: 999px;
  transition: width 0.3s ease;
}

.tele-bar-fill.fill-green {
  background: #10B981;
}

/* Calculation Right Panel */
.calc-panel {
  padding: 1.25rem;
  border-radius: 12px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
}

.calc-panel.border-purple { border-left: 5px solid #8B5CF6; }
.calc-panel.border-emerald { border-left: 5px solid #10B981; }

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
  letter-spacing: 0.05em;
}

.calc-tag.tag-green {
  color: #047857;
}

.formula-sm {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.775rem;
  color: #2563EB;
  font-weight: 700;
}

.metrics-3-col {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.65rem;
}

@media (max-width: 600px) {
  .metrics-3-col {
    grid-template-columns: 1fr;
  }
}

.m-card {
  background: #FFFFFF;
  padding: 0.85rem;
  border-radius: 10px;
  border: 1px solid #E2E8F0;
  display: flex;
  flex-direction: column;
}

.m-card.m-highlight {
  background: #F0FDF4;
  border-color: #86EFAC;
}

.m-lbl {
  font-size: 0.65rem;
  font-weight: 700;
  color: #64748B;
  margin-bottom: 0.25rem;
}

.m-val {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0F172A;
  font-family: 'JetBrains Mono', monospace;
}

.m-sub {
  font-size: 0.65rem;
  color: #64748B;
  margin-top: 0.25rem;
  line-height: 1.35;
}

.action-card {
  background: #FFFFFF;
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.action-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.act-badge {
  font-size: 0.675rem;
  font-weight: 800;
  color: #047857;
  background: #D1FAE5;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  border: 1px solid #A7F3D0;
}

.act-score {
  font-size: 0.85rem;
  font-weight: 800;
  color: #10B981;
  font-family: 'JetBrains Mono', monospace;
}

.act-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 0.45rem 0;
  line-height: 1.35;
}

.act-desc {
  font-size: 0.85rem;
  color: #475569;
  line-height: 1.55;
  margin-bottom: 0.85rem;
}

.specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
  background: #F8FAFC;
  padding: 0.85rem;
  border-radius: 10px;
  border: 1px solid #E2E8F0;
}

.spec-cell {
  display: flex;
  flex-direction: column;
}

.sk { font-size: 0.675rem; color: #64748B; font-weight: 600; }
.sv { font-size: 0.8rem; font-weight: 700; color: #1E293B; }

/* Policy Stack */
.policy-sec-title {
  font-size: 0.925rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 0.75rem 0;
}

.policy-card-stack {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.pol-item-card {
  border-radius: 10px;
  padding: 0.85rem 1rem;
  border: 1px solid #E2E8F0;
  background: #FFFFFF;
  transition: all 0.2s ease;
}

.pol-danger {
  background: #FFFBFB;
  border-left: 5px solid #EF4444;
  border-color: #FECDD3;
}

.pol-warning {
  background: #FFFDF5;
  border-left: 5px solid #F59E0B;
  border-color: #FDE68A;
}

.pol-success {
  background: #F0FDF4;
  border-left: 5px solid #10B981;
  border-color: #A7F3D0;
}

.pol-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.35rem;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.pol-name {
  font-size: 0.825rem;
  font-weight: 800;
  color: #0F172A;
}

.pol-status {
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.status-danger { background: #FEE2E2; color: #DC2626; }
.status-warning { background: #FEF3C7; color: #B45309; }
.status-success { background: #DCFCE7; color: #15803D; }

.pol-body {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.pol-decision {
  font-size: 0.8rem;
  color: #1E293B;
}

.pol-note {
  font-size: 0.725rem;
  color: #64748B;
  line-height: 1.4;
}

/* Colors Helper */
.text-slate { color: #475569; }
.text-rose { color: #E11D48; }
.text-amber { color: #D97706; }
.text-emerald { color: #059669; }
.font-bold { font-weight: 700; }

/* ========================================================================= */
/* DIAGRAM MODERASI SPASIAL (GAMBAR 2 & 3 PROPOSAL)                          */
/* ========================================================================= */
.spatial-moderation-diagram-card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 1.75rem 2rem;
  margin-bottom: 2rem;
  border: 1px solid #CBD5E1;
  box-shadow: 0 4px 15px -2px rgba(15, 23, 42, 0.05);
}

.diagram-head {
  margin-bottom: 1.5rem;
}

.badge-indigo {
  background: rgba(99, 102, 241, 0.15);
  color: #4F46E5;
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.badge-cyan {
  background: rgba(6, 182, 212, 0.15);
  color: #0891B2;
  border: 1px solid rgba(6, 182, 212, 0.3);
}

.badge-dashed {
  background: #F5F3FF;
  color: #6D28D9;
  border: 1.5px dashed #8B5CF6;
}

.diagram-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0.4rem 0 0.35rem 0;
  line-height: 1.35;
}

.diagram-desc {
  font-size: 0.85rem;
  color: #475569;
  line-height: 1.6;
  margin: 0;
}

.diagram-interactive-body {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 1.75rem;
  align-items: start;
}

@media (max-width: 960px) {
  .diagram-interactive-body {
    grid-template-columns: 1fr;
  }
}

.flow-pipeline-col {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.pipe-box {
  background: #FFFFFF;
  border-radius: 10px;
  padding: 0.9rem 1.15rem;
  border: 1px solid #E2E8F0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
}

.pipe-box:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

.pipe-blue { border-left: 4px solid #3B82F6; }
.pipe-indigo { border-left: 4px solid #6366F1; }
.pipe-amber { border-left: 4px solid #F59E0B; }
.pipe-purple { border-left: 4px solid #A855F7; }
.pipe-cyan { border-left: 4px solid #06B6D4; }
.pipe-rose { border-left: 4px solid #F43F5E; }
.pipe-emerald { border-left: 4px solid #10B981; }

.pipe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.pipe-step-num {
  font-size: 0.65rem;
  font-weight: 800;
  color: #64748B;
  letter-spacing: 0.05em;
}

.pipe-eq {
  font-size: 0.675rem;
  font-weight: 700;
  color: #2563EB;
  background: #EFF6FF;
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
}

.pipe-title {
  font-size: 0.875rem;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 0.35rem;
}

.pipe-content {
  font-size: 0.775rem;
  color: #475569;
}

.pipe-content code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.725rem;
  background: #F1F5F9;
  padding: 0.2rem 0.45rem;
  border-radius: 4px;
  display: block;
  margin-bottom: 0.25rem;
  color: #1E293B;
  overflow-x: auto;
}

.pipe-note {
  font-size: 0.7rem;
  color: #64748B;
  display: block;
  line-height: 1.4;
}

.pipe-tags {
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
  margin-top: 0.3rem;
}

.p-tag {
  font-size: 0.65rem;
  font-weight: 700;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  color: #475569;
}

.highlight-tag {
  background: #EEF2FF;
  border-color: #C7D2FE;
  color: #4338CA;
  font-weight: 800;
}

.solid-connector-down {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.2rem 0;
  color: #94A3B8;
  font-size: 0.7rem;
}

.connector-line {
  width: 2px;
  height: 8px;
  background: #CBD5E1;
}

.connector-arrow {
  margin-top: -3px;
}

.moderated-target-box {
  background: #FAF5FF;
  border: 1.5px solid #DDD6FE;
  position: relative;
}

.formula-subgrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.45rem;
  margin-bottom: 0.35rem;
}

.full-w {
  grid-column: 1 / -1;
}

.f-lbl {
  font-size: 0.65rem;
  font-weight: 700;
  color: #6B21A8;
  display: block;
  margin-bottom: 0.15rem;
}

.moderated-receive-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.675rem;
  font-weight: 800;
  color: #6D28D9;
  background: #EDE9FE;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  margin-top: 0.4rem;
}

.dot-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #8B5CF6;
  animation: pulse 1.5s infinite;
}

.fairness-two-pillars {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.f-pil {
  font-size: 0.675rem;
  background: #FFF1F2;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  border: 1px solid #FFE4E6;
}

.f-pil strong {
  display: block;
  color: #9F1239;
  margin-bottom: 0.2rem;
}

/* ========================================================================= */
/* SPATIAL MODERATOR SIDEBAR (GARIS PUTUS-PUTUS / DASHED STYLING)            */
/* ========================================================================= */
.spatial-moderator-sidebar {
  position: sticky;
  top: 1.5rem;
}

.dashed-moderator-card {
  background: linear-gradient(145deg, #FAF5FF 0%, #F5F3FF 100%);
  border: 2.5px dashed #7C3AED;
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.08);
  position: relative;
}

.dashed-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.675rem;
  font-weight: 800;
  color: #6D28D9;
  background: #EDE9FE;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  border: 1px solid #DDD6FE;
  margin-bottom: 0.65rem;
  letter-spacing: 0.04em;
}

.dashed-icon {
  font-size: 0.85rem;
  font-weight: 900;
  color: #7C3AED;
}

.mod-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #4C1D95;
  margin: 0 0 0.3rem 0;
}

.mod-subtitle {
  font-size: 0.775rem;
  color: #6D28D9;
  font-weight: 600;
  margin: 0 0 0.65rem 0;
}

.mod-formula-box {
  background: #FFFFFF;
  border-radius: 10px;
  padding: 0.85rem;
  border: 1px solid #DDD6FE;
  margin-bottom: 1rem;
}

.mod-formula-main code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  font-weight: 800;
  color: #5B21B6;
  display: block;
  text-align: center;
  background: #F5F3FF;
  padding: 0.35rem;
  border-radius: 6px;
  margin-bottom: 0.65rem;
}

.mod-layers {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.layer-item {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  font-size: 0.725rem;
}

.layer-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 0.3rem;
  flex-shrink: 0;
}

.layer-dot.blue { background: #3B82F6; }
.layer-dot.amber { background: #F59E0B; }

.layer-txt strong {
  display: block;
  color: #1E293B;
  font-size: 0.725rem;
}

.layer-txt span {
  color: #64748B;
  font-size: 0.675rem;
  line-height: 1.35;
  display: block;
}

.dashed-action-indicator {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 0.85rem;
  border: 1px dashed #A78BFA;
  margin-bottom: 0.85rem;
}

.indicator-arrow-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #6D28D9;
}

.dashed-arrow-line {
  font-family: monospace;
  font-weight: 800;
  letter-spacing: -1px;
  color: #7C3AED;
}

.indicator-label {
  font-size: 0.675rem;
  font-weight: 800;
  color: #5B21B6;
  text-transform: uppercase;
  margin-top: 0.15rem;
}

.mod-impact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.mod-impact-list li {
  display: flex;
  gap: 0.4rem;
  align-items: flex-start;
  font-size: 0.725rem;
  color: #334155;
  line-height: 1.4;
}

.icon-check {
  color: #7C3AED;
  font-weight: 800;
  flex-shrink: 0;
}

.service-dynamics-box {
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 8px;
  padding: 0.65rem 0.85rem;
}

.sd-head {
  font-size: 0.7rem;
  font-weight: 800;
  color: #92400E;
  margin-bottom: 0.2rem;
}

.sd-desc {
  font-size: 0.675rem;
  color: #78350F;
  margin: 0;
  line-height: 1.35;
}

/* ========================================================================= */
/* HUMAN-IN-THE-LOOP (HITL) GOVERNANCE CARD                                  */
/* ========================================================================= */
.hitl-governance-card {
  margin-top: 1.25rem;
  background: #F8FAFC;
  border: 1px solid #CBD5E1;
  border-radius: 12px;
  padding: 1.15rem;
}

.hitl-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.hitl-title-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.hitl-icon {
  font-size: 1rem;
}

.hitl-heading {
  font-size: 0.85rem;
  font-weight: 800;
  color: #0F172A;
}

.hitl-badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
}

.badge-green { background: #DCFCE7; color: #166534; border: 1px solid #86EFAC; }

.hitl-desc {
  font-size: 0.75rem;
  color: #475569;
  line-height: 1.45;
  margin: 0 0 0.75rem 0;
}

.hitl-btn-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.hitl-btn {
  font-size: 0.725rem;
  font-weight: 700;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #CBD5E1;
  background: #FFFFFF;
  color: #334155;
  cursor: pointer;
  transition: all 0.2s ease;
}

.hitl-btn:hover {
  background: #F1F5F9;
  border-color: #94A3B8;
}

.hitl-btn.active {
  background: #0F172A;
  color: #FFFFFF;
  border-color: #0F172A;
}

.hitl-audit-log {
  background: #0F172A;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 0.675rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.log-label {
  color: #94A3B8;
  font-weight: 700;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.hitl-audit-log code {
  font-family: 'JetBrains Mono', monospace;
  color: #38BDF8;
  font-size: 0.675rem;
  word-break: break-all;
}

/* ========================================================================= */
/* MATHEMATICAL SYMBOL & TYPOGRAPHY STYLING                                 */
/* ========================================================================= */
.math-formula-rendered {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  flex-wrap: wrap;
  font-family: 'KaTeX_Math', 'KaTeX_Main', 'Cambria Math', 'Latin Modern Math', 'Times New Roman', serif;
  font-size: 1.15rem;
  color: #1E293B;
  padding: 0.5rem;
}

.m-bold {
  font-weight: 700;
  font-family: 'KaTeX_Math', 'Cambria Math', serif;
}

.m-sym {
  font-style: italic;
  font-family: 'KaTeX_Math', 'Cambria Math', serif;
}

.m-var {
  font-style: italic;
  font-family: 'KaTeX_Math', 'Cambria Math', serif;
}

.m-func {
  font-family: 'KaTeX_Main', 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-style: normal;
  color: #1E40AF;
}

.m-idx, .m-cond {
  font-size: 0.725em;
  font-style: italic;
  color: #475569;
}

.m-ast {
  color: #D97706;
  font-weight: 800;
  font-size: 0.85em;
}

.m-exp {
  font-size: 0.7em;
  font-weight: 700;
  color: #334155;
}

.m-sign {
  font-size: 1.1em;
  font-weight: 600;
  color: #64748B;
  margin: 0 0.15rem;
}

.m-bracket {
  font-size: 1.4em;
  font-weight: 300;
  color: #64748B;
}

.m-operator {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
}

.m-op-txt {
  font-family: 'KaTeX_Main', sans-serif;
  font-weight: 800;
  font-size: 0.95rem;
  color: #1E3A8A;
}

.m-op-cond {
  font-size: 0.65rem;
  font-weight: 600;
  color: #64748B;
  margin-top: 0.15rem;
}

.m-term-box {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.55rem;
  border-radius: 6px;
  border: 1px solid transparent;
}

.term-blue {
  background: #EFF6FF;
  border-color: #BFDBFE;
  color: #1E40AF;
}

.term-purple {
  background: #FAF5FF;
  border-color: #DDD6FE;
  color: #6D28D9;
}

.m-sqrt-wrap {
  display: inline-flex;
  align-items: center;
  margin-left: 0.15rem;
}

.m-sqrt-symbol {
  font-size: 1.35em;
  font-weight: 400;
  color: #7C3AED;
  margin-right: -1px;
}

.m-sqrt-inner {
  border-top: 1.5px solid #7C3AED;
  padding-top: 2px;
  padding-left: 2px;
  padding-right: 2px;
}

.leg-pill {
  font-size: 0.725rem;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
}

.pill-blue-sm { background: #EFF6FF; color: #1E40AF; border: 1px solid #DBEAFE; }
.pill-purple-sm { background: #FAF5FF; color: #6D28D9; border: 1px solid #EDE9FE; }

.math-sym-row {
  font-family: 'KaTeX_Math', 'KaTeX_Main', 'Cambria Math', 'Times New Roman', serif;
  font-size: 0.85rem;
  color: #0F172A;
  background: #F8FAFC;
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  border: 1px solid #E2E8F0;
  margin-bottom: 0.3rem;
  display: inline-block;
}

.math-sym-row.wrap {
  display: block;
  line-height: 1.6;
}

.math-sub-cell {
  background: #FFFFFF;
  padding: 0.5rem 0.65rem;
  border-radius: 6px;
  border: 1px solid #DDD6FE;
  font-family: 'KaTeX_Math', 'KaTeX_Main', serif;
  font-size: 0.8rem;
  color: #3B0764;
}
</style>
