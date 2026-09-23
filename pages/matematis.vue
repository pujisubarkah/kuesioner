<template>
  <div class="app-container">
    <Navbar />

    <main id="konten-utama" class="main-content">
      <!-- Header Banner -->
      <div class="card header-hero">
        <div class="header-hero-content">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            <span>LANDASAN FORMAL & TEORI MATEMATIS DISERTASI</span>
          </div>
          <h1 class="hero-title">Formulasi Matematis CCBN</h1>
          <p class="hero-subtitle">
            <strong>Context-Calibrated Behavioral Norms (CCBN)</strong> — Kerangka 7 Blok Persamaan (Persamaan 1–18c) untuk 
            pembentukan evidensi terkalibrasi, baseline kontekstual, disparitas keadilan, keputusan adaptif, dan safeguard sistemik pada pelatihan digital ASN.
          </p>
        </div>

        <!-- Quick Stats / Block Summary -->
        <div class="hero-stats-grid">
          <div class="hero-stat-card">
            <span class="stat-num">7</span>
            <span class="stat-label">Blok Formulasi Formal</span>
          </div>
          <div class="hero-stat-card">
            <span class="stat-num">18+</span>
            <span class="stat-label">Persamaan Matematis</span>
          </div>
          <div class="hero-stat-card">
            <span class="stat-num">6</span>
            <span class="stat-label">Dimensi Konteks ASN</span>
          </div>
          <div class="hero-stat-card">
            <span class="stat-num">3</span>
            <span class="stat-label">Garis Batas Validitas</span>
          </div>
        </div>
      </div>

      <!-- Quick Sticky Navigation Bar for Blocks -->
      <div class="block-nav-bar">
        <div class="block-nav-scroll">
          <button 
            v-for="b in blocks" 
            :key="b.id"
            @click="scrollToBlock(b.id)"
            :class="['block-nav-btn', activeSection === b.id ? 'active' : '']"
          >
            <span class="nav-btn-icon">{{ b.icon }}</span>
            <span class="nav-btn-text">{{ b.navTitle }}</span>
          </button>
        </div>

        <div class="block-nav-actions">
          <NuxtLink 
            to="/hasil-survey/sementara" 
            class="survey-link-pill"
            title="Buka Data Hasil Kuesioner Empiris ASN"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            Data Survei Empiris
          </NuxtLink>

          <button 
            @click="toggleInteractiveSandbox" 
            class="sandbox-toggle-btn"
            :class="{ 'active': showSandbox }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            {{ showSandbox ? 'Tutup Simulator' : 'Simulator Parameter' }}
          </button>
        </div>
      </div>

      <!-- Hint Banner for Click-to-Inspect Formula Feature -->
      <div class="hint-banner">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span class="hint-icon">💡</span>
          <span><strong>Fitur Interaktif:</strong> Klik pada kartu rumus mana pun di bawah ini untuk membuka <em>Modal Inspeksi Rumus & Derivasi Formal</em> dengan visualisasi lengkap, tabel variabel, kalkulator mini, dan salin kode LaTeX.</span>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION: KOMPARASI KASUS NYATA ASN         -->
      <!-- ========================================== -->
      <section id="persona-sandbox" class="card persona-section">
        <div class="persona-header">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span class="persona-badge">EMBEDDED CASE STUDY</span>
            <h2 class="persona-main-title">Komparasi Kasus Nyata ASN (Real Persona CCBN)</h2>
          </div>
          <p class="persona-main-desc">
            Membuktikan bagaimana formulasi matematis CCBN mengolah data jawaban kuesioner riil dari berbagai daerah menjadi baseline wajar ($\hat{b}_{i,t}$), 
            residual ($d_{i,t}$), dan perlakuan safeguard yang adil:
          </p>
        </div>

        <div class="persona-cards-grid">
          <!-- Persona 1: 3T -->
          <div class="persona-card morotai">
            <div class="persona-card-header">
              <div class="persona-avatar">🏝️</div>
              <div>
                <div class="persona-name">Persona A: Nakes Puskesmas Pulau Morotai</div>
                <div class="persona-tag">Wilayah 3T & Perbatasan • Sinyal Seluler 3G Fluktuatif</div>
              </div>
            </div>

            <div class="persona-survey-facts">
              <strong>📋 Bukti Fakta Kuesioner:</strong>
              <ul>
                <li><strong>Q1 & Q11:</strong> Kab. Pulau Morotai, Provider Seluler Lemah</li>
                <li><strong>Q12 & Q13:</strong> Gangguan sinyal harian & listrik sering padam</li>
                <li><strong>Q15 & Q17:</strong> Tugas dinas vaksinasi darurat jam kerja dinas</li>
              </ul>
            </div>

            <div class="persona-math-breakdown">
              <div class="persona-stat-row">
                <span>Vektor Konteks $c_{i,t}$:</span>
                <span class="font-mono">$S=0.28, W=0.85, m=0.45$</span>
              </div>
              <div class="persona-stat-row">
                <span>Kualitas Evidensi $q_{i,t}$ (Pers. 4):</span>
                <span class="font-mono text-amber">0.50 (Moderat/Buram)</span>
              </div>
              <div class="persona-stat-row">
                <span>Baseline Wajar $\hat{b}_{i,t}$ (Pers. 5):</span>
                <span class="font-mono font-bold">0.38 (Wajar Rendah)</span>
              </div>
              <div class="persona-stat-row">
                <span>Perilaku Aktual $B_{i,t}$:</span>
                <span class="font-mono">0.60 (Aktif 40 menit & kuis)</span>
              </div>
              <div class="persona-stat-row highlight">
                <span>Residual Kontekstual $d_{i,t}$ (Pers. 6):</span>
                <span class="font-mono text-emerald font-bold">+0.22 (Sangat Aktif!)</span>
              </div>
            </div>

            <div class="persona-safeguard-badge status-boundary">
              <strong>🛡️ Safeguard: BOUNDARY (Pers. 18b)</strong>
              <p>Sistem otomatis mengirim ringkasan teks rendah bandwidth & audio mikro. <em>Peserta dipuji atas dedikasinya di atas keterbatasan konteks.</em></p>
            </div>
          </div>

          <!-- Persona 2: Metropolitan -->
          <div class="persona-card jakarta">
            <div class="persona-card-header">
              <div class="persona-avatar">🏢</div>
              <div>
                <div class="persona-name">Persona B: Perencana Bappeda DKI Jakarta</div>
                <div class="persona-tag">Wilayah Metropolitan • Fiber Optic 100 Mbps Dedicated</div>
              </div>
            </div>

            <div class="persona-survey-facts">
              <strong>📋 Bukti Fakta Kuesioner:</strong>
              <ul>
                <li><strong>Q1 & Q11:</strong> DKI Jakarta, Wifi Kantor Super Cepat</li>
                <li><strong>Q12 & Q13:</strong> Tidak pernah ada gangguan sinyal/listrik</li>
                <li><strong>Q15 & Q18:</strong> Diberikan jam khusus belajar mandiri dari pimpinan</li>
              </ul>
            </div>

            <div class="persona-math-breakdown">
              <div class="persona-stat-row">
                <span>Vektor Konteks $c_{i,t}$:</span>
                <span class="font-mono">$S=0.95, W=0.20, m=0.02$</span>
              </div>
              <div class="persona-stat-row">
                <span>Kualitas Evidensi $q_{i,t}$ (Pers. 4):</span>
                <span class="font-mono text-blue">0.97 (Sangat Jernih)</span>
              </div>
              <div class="persona-stat-row">
                <span>Baseline Wajar $\hat{b}_{i,t}$ (Pers. 5):</span>
                <span class="font-mono font-bold">0.88 (Ekspektasi Tinggi)</span>
              </div>
              <div class="persona-stat-row">
                <span>Perilaku Aktual $B_{i,t}$:</span>
                <span class="font-mono">0.50 (Hanya login pasif)</span>
              </div>
              <div class="persona-stat-row highlight">
                <span>Residual Kontekstual $d_{i,t}$ (Pers. 6):</span>
                <span class="font-mono text-rose font-bold">-0.38 (Kurang Aktif)</span>
              </div>
            </div>

            <div class="persona-safeguard-badge status-valid">
              <strong>🛡️ Safeguard: VALID (Pers. 18a)</strong>
              <p>Sistem memberikan modul video interaktif penuh dan notifikasi motivasi karena fasilitas belajar lengkap namun keterlibatan pasif.</p>
            </div>
          </div>

          <!-- Persona 3: Gangguan Ekstrem / Invalid -->
          <div class="persona-card sorong">
            <div class="persona-card-header">
              <div class="persona-avatar">⚠️</div>
              <div>
                <div class="persona-name">Persona C: ASN Pedalaman Kab. Sorong</div>
                <div class="persona-tag">Wilayah Terpencil • Tower BTS Padam & Banjir</div>
              </div>
            </div>

            <div class="persona-survey-facts">
              <strong>📋 Bukti Fakta Kuesioner:</strong>
              <ul>
                <li><strong>Q1 & Q11:</strong> Papua Barat Daya, BTS mati 3 hari</li>
                <li><strong>Q13 & Q26:</strong> Missingness total 75% paket log gagal masuk</li>
                <li><strong>Q31:</strong> Menyeberang pulau demi cari sinyal kuis</li>
              </ul>
            </div>

            <div class="persona-math-breakdown">
              <div class="persona-stat-row">
                <span>Vektor Konteks $c_{i,t}$:</span>
                <span class="font-mono">$S=0.18, W=0.90, m=0.75$</span>
              </div>
              <div class="persona-stat-row">
                <span>Kualitas Evidensi $q_{i,t}$ (Pers. 4):</span>
                <span class="font-mono text-rose font-bold">0.20 (&lt; &theta;<sub>q</sub>' = 0.40)</span>
              </div>
              <div class="persona-stat-row">
                <span>Baseline Wajar $\hat{b}_{i,t}$:</span>
                <span class="font-mono">TIDAK BISA DIHITUNG VALID</span>
              </div>
              <div class="persona-stat-row">
                <span>Perilaku Aktual $B_{i,t}$:</span>
                <span class="font-mono">Data Terputus Ekstrem</span>
              </div>
              <div class="persona-stat-row highlight">
                <span>Residual Kontekstual $d_{i,t}$:</span>
                <span class="font-mono text-muted">Dibekukan (Hard-Stop)</span>
              </div>
            </div>

            <div class="persona-safeguard-badge status-invalid">
              <strong>🛡️ Safeguard: INVALID (Pers. 18c)</strong>
              <p>Otomatisasi AI <strong>DIHENTIKAN TOTAL</strong>. Kasus dieskalasi ke Widyaiswara untuk penjadwalan ujian susulan tanpa pengurangan nilai.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- INTERACTIVE SANDBOX CALCULATOR (Collapsible) -->
      <transition name="fade">
        <div v-if="showSandbox" class="card sandbox-card" id="sandbox-calculator">
          <div class="sandbox-header">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <span class="sandbox-badge">SIMULATOR FORMAL</span>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #1E293B; margin: 0;">
                Kalkulator Interaktif CCBN & Garis Batas Validitas
              </h3>
            </div>
            <button @click="showSandbox = false" class="btn-close-sandbox" title="Tutup">✕</button>
          </div>
          <p style="font-size: 0.85rem; color: #64748B; margin: 0.25rem 0 1.25rem 0;">
            Eksperimen langsung parameter missingness, indeks spasial, estimasi baseline, dan amati perubahan residual serta evaluasi status validitas safeguard.
          </p>

          <div class="sandbox-grid">
            <!-- Parameter Inputs Column 1 -->
            <div class="sandbox-col">
              <h4 class="sandbox-col-title">1. Parameter Konteks & Sinyal</h4>
              
              <div class="calc-control">
                <div class="calc-label-row">
                  <label>Klaster Wilayah Struktural ($K_i$):</label>
                  <span class="calc-val">{{ simKi.toFixed(2) }} ({{ getKiLabel(simKi) }})</span>
                </div>
                <input type="range" min="0" max="1" step="0.05" v-model.number="simKi" class="calc-range" />
              </div>

              <div class="calc-control">
                <div class="calc-label-row">
                  <label>Kualitas Jaringan Aktual ($N_{i,t}$):</label>
                  <span class="calc-val">{{ simNit.toFixed(2) }}</span>
                </div>
                <input type="range" min="0" max="1" step="0.05" v-model.number="simNit" class="calc-range" />
              </div>

              <div class="calc-control">
                <div class="calc-label-row">
                  <label>Bobot Struktural Wilayah ($\delta$):</label>
                  <span class="calc-val">{{ simDelta.toFixed(2) }}</span>
                </div>
                <input type="range" min="0" max="1" step="0.05" v-model.number="simDelta" class="calc-range" />
              </div>

              <div class="calc-control">
                <div class="calc-label-row">
                  <label>Missingness Telemetri ($m_{i,t}$):</label>
                  <span class="calc-val">{{ (simMissingness * 100).toFixed(0) }}% data hilang</span>
                </div>
                <input type="range" min="0" max="0.9" step="0.05" v-model.number="simMissingness" class="calc-range" />
              </div>
            </div>

            <!-- Parameter Inputs Column 2 -->
            <div class="sandbox-col">
              <h4 class="sandbox-col-title">2. Perilaku Aktual vs Ekspektasi</h4>

              <div class="calc-control">
                <div class="calc-label-row">
                  <label>Perilaku Aktual Peserta ($B_{i,t}$):</label>
                  <span class="calc-val">{{ simActualB.toFixed(2) }}</span>
                </div>
                <input type="range" min="0" max="1" step="0.05" v-model.number="simActualB" class="calc-range" />
              </div>

              <div class="calc-control">
                <div class="calc-label-row">
                  <label>Noise / Sinyal Palsu ($\text{noise}_{i,t}$):</label>
                  <span class="calc-val">{{ simNoise.toFixed(2) }}</span>
                </div>
                <input type="range" min="0" max="0.5" step="0.02" v-model.number="simNoise" class="calc-range" />
              </div>

              <div class="calc-control">
                <div class="calc-label-row">
                  <label>Beban Rekomendasi ($CB_{i,a,t}$):</label>
                  <span class="calc-val">{{ simCostBeban.toFixed(2) }}</span>
                </div>
                <input type="range" min="0" max="1" step="0.05" v-model.number="simCostBeban" class="calc-range" />
              </div>

              <div class="calc-control">
                <div class="calc-label-row">
                  <label>Penalti Disparitas Kelompok ($D_t$):</label>
                  <span class="calc-val">{{ simDisparity.toFixed(2) }}</span>
                </div>
                <input type="range" min="0" max="1" step="0.05" v-model.number="simDisparity" class="calc-range" />
              </div>
            </div>

            <!-- Computed Real-time Outputs Column 3 -->
            <div class="sandbox-col result-col">
              <h4 class="sandbox-col-title">3. Hasil Kalkulasi Persamaan CCBN</h4>

              <div class="sim-output-box">
                <div class="sim-metric">
                  <span class="sim-metric-name">Indeks Spasial $S_{i,t}$ (Pers. 2c):</span>
                  <span class="sim-metric-val font-mono">{{ simSit.toFixed(3) }}</span>
                </div>
                <div class="sim-metric">
                  <span class="sim-metric-name">Kualitas Evidensi $q_{i,t}$ (Pers. 4):</span>
                  <span class="sim-metric-val font-mono">{{ simQit.toFixed(3) }}</span>
                </div>
                <div class="sim-metric">
                  <span class="sim-metric-name">Baseline Ekspektasi $\hat{b}_{i,t}$ (Pers. 5):</span>
                  <span class="sim-metric-val font-mono">{{ simExpectedBaseline.toFixed(3) }}</span>
                </div>
                <div class="sim-metric highlight">
                  <span class="sim-metric-name">Residual Kontekstual $d_{i,t}$ (Pers. 6):</span>
                  <span class="sim-metric-val font-mono" :class="simResidual >= 0 ? 'text-emerald' : 'text-rose'">
                    {{ simResidual >= 0 ? '+' : '' }}{{ simResidual.toFixed(3) }}
                  </span>
                </div>
                <div class="sim-metric">
                  <span class="sim-metric-name">Reward Terkalibrasi $r'_{i,a,t+1}$ (Pers. 9):</span>
                  <span class="sim-metric-val font-mono text-blue">{{ simCalibratedReward.toFixed(3) }}</span>
                </div>
              </div>

              <!-- Safeguard Badge Output -->
              <div class="safeguard-result" :class="'status-' + simSafeguardStatus.type">
                <div class="safeguard-tag">STATUS SAFEGUARD (PERS. 18a–18c)</div>
                <div class="safeguard-title">{{ simSafeguardStatus.title }}</div>
                <p class="safeguard-desc">{{ simSafeguardStatus.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- ========================================== -->
      <!-- 7 BLOK PERSAMAAN FORMAL                    -->
      <!-- ========================================== -->

      <div class="blocks-container">
        <!-- ========================================== -->
        <!-- BLOK 1: PEMBENTUKAN EVIDENSI (Persamaan 1–4) -->
        <!-- ========================================== -->
        <section id="blok-1" class="card block-section">
          <div class="block-header">
            <div class="block-number-badge">BLOK 1</div>
            <div class="block-header-info">
              <h2 class="block-title">Pembentukan Evidensi</h2>
              <div class="block-range-pill">Persamaan (1) – (4)</div>
            </div>
          </div>

          <div class="block-function-banner">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            <div>
              <strong>Fungsi Utama:</strong> Mengolah data mentah LMS menjadi "bukti perilaku" (behavioral evidence) yang sudah dikalibrasi konteks struktural & situasional.
            </div>
          </div>

          <!-- Persamaan 1 -->
          <div class="equation-card clickable" @click="openFormulaModal('eq1')">
            <div class="eq-header">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span class="eq-badge">Persamaan (1)</span>
                <h3 class="eq-name">Raw Behavioral Traces (Jejak Perilaku Mentah)</h3>
              </div>
              <button class="btn-inspect-pill">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                Klik Detail Rumus
              </button>
            </div>
            
            <MathFormula 
              formula="X_{i,t} = \left[ \text{login}_{i,t},\, \text{durasi}_{i,t},\, \text{clickstream}_{i,t},\, \text{completion}_{i,t},\, \text{artefak}_{i,t},\, \dots \right]" 
            />

            <!-- Grounding Badge -->
            <div class="emp-grounding-badge">
              <span class="emp-grounding-tag">📊 INPUT LMS & DATASET:</span>
              <span>Dihasilkan dari log platform e-learning (Moodle/LAN) sebelum dihubungkan dengan faktor konteks.</span>
            </div>

            <div class="eq-breakdown-grid">
              <div class="eq-explanation">
                <h4 class="sub-heading">📖 Makna Matematis:</h4>
                <p>
                  Vektor $X_{i,t}$ adalah representasi <em>bahan mentah</em> dari seluruh rekaman jejak digital peserta $i$ pada sesi pembelajaran $t$. 
                  Mencakup waktu login, durasi aktif, frekuensi klik modul, proporsi materi yang diselesaikan, hingga interaksi artefak penugasan.
                </p>
              </div>
              <div class="eq-analogy">
                <h4 class="sub-heading">💡 Analogi Konseptual E-Learning ASN:</h4>
                <p>
                  Seperti <strong>log rekaman klik mentah di portal MOOC / LMS ASN</strong> — sistem hanya mencatat peserta login 30 menit dan klik modul 4 kali, tanpa mengetahui apakah waktu belajarnya terputus karena pemadaman listrik kantor, kuota habis, atau dipanggil rapat mendadak oleh pimpinan.
                </p>
              </div>
            </div>
          </div>

          <!-- Persamaan 2 -->
          <div class="equation-card clickable" @click="openFormulaModal('eq2')">
            <div class="eq-header">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span class="eq-badge">Persamaan (2)</span>
                <h3 class="eq-name">Konteks Enam Dimensi ($c_{i,t}$)</h3>
              </div>
              <button class="btn-inspect-pill">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                Klik Detail Rumus
              </button>
            </div>
            
            <MathFormula 
              formula="c_{i,t} = \left[ T_{i,t},\, I_{i,t},\, O_{i,t},\, D_{i,t},\, W_{i,t},\, S_{i,t} \right]" 
            />

            <!-- Grounding Badge -->
            <div class="emp-grounding-badge">
              <span class="emp-grounding-tag">📊 PEMETAAN KUESIONER:</span>
              <span>Seluruh 48 butir pertanyaan kuesioner dipetakan ke 6 dimensi: Temporal (Q10/Q18), Infra (Q11-13), Org (Q18/Q32), Device (Q9), Workload (Q15-17), Spasial (Q1-2, Q31).</span>
              <NuxtLink to="/hasil-survey/sementara" class="emp-link-btn">Buka Data Survei ➔</NuxtLink>
            </div>

            <div class="eq-explanation">
              <h4 class="sub-heading">📖 Makna & 6 Dimensi Konteks ASN:</h4>
              <p>
                Konteks komprehensif yang memengaruhi kemampuan belajar peserta, terbagi atas enam dimensi:
              </p>
              <div class="dimensions-pill-grid">
                <div class="dim-pill">
                  <span class="dim-code">T</span>
                  <div class="dim-info"><strong>Temporal:</strong> Jam kerja dinas, shift piket, malam vs siang</div>
                </div>
                <div class="dim-pill">
                  <span class="dim-code">I</span>
                  <div class="dim-info"><strong>Infrastruktur:</strong> Stabilitas listrik, provider seluler, kuota dinas</div>
                </div>
                <div class="dim-pill">
                  <span class="dim-code">O</span>
                  <div class="dim-info"><strong>Organisasi:</strong> Dukungan pimpinan, target kinerja, kultur instansi</div>
                </div>
                <div class="dim-pill">
                  <span class="dim-code">D</span>
                  <div class="dim-info"><strong>Perangkat (Delivery):</strong> HP jadul, PC bersama, RAM minim vs Laptop dinas</div>
                </div>
                <div class="dim-pill">
                  <span class="dim-code">W</span>
                  <div class="dim-info"><strong>Beban Kerja (Workload):</strong> Penugasan mendadak, deadline pimpinan</div>
                </div>
                <div class="dim-pill">
                  <span class="dim-code">S</span>
                  <div class="dim-info"><strong>Spasial:</strong> Indeks wilayah 3T, non-3T, disparitas regional</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sub-persamaan Spasial 2a, 2b, 2c -->
          <div class="sub-equations-group">
            <h4 class="group-title">Dekomposisi Dimensi Spasial ($S_{i,t}$)</h4>
            <div class="sub-eq-grid">
              <!-- 2a -->
              <div class="sub-eq-card clickable" @click="openFormulaModal('eq2a')">
                <div class="sub-eq-header">
                  <span class="sub-eq-badge">Persamaan (2a)</span>
                  <strong>Klaster Wilayah Struktural</strong>
                </div>
                <MathFormula 
                  formula="K_i = \text{cluster}\left(\text{BPS}_{\text{region}},\, \text{Podes}_{\text{region}},\, \text{APJII}_{\text{region}},\, \text{Ookla}_{\text{region}}\right)" 
                />
                <p class="sub-eq-desc">
                  Mengelompokkan wilayah kerja/kecamatan berdasarkan data infrastruktur publik terbuka (BPS, Podes, APJII, Ookla). Bersifat <em>makro & stabil</em>.
                </p>
              </div>

              <!-- 2b -->
              <div class="sub-eq-card clickable" @click="openFormulaModal('eq2b')">
                <div class="sub-eq-header">
                  <span class="sub-eq-badge">Persamaan (2b)</span>
                  <strong>Kualitas Jaringan Aktual</strong>
                </div>
                <MathFormula 
                  formula="N_{i,t} = \text{normalize}\left(w_1 \cdot \text{latency} + w_2 \cdot \text{retry} + w_3 \cdot \text{sync\_fail} + w_4 \cdot \text{buffer}\right)" 
                />
                <p class="sub-eq-desc">
                  Mengukur kualitas telemetri koneksi riil saat sesi berlangsung — gabungan latensi TCP, rasio pengulangan paket, kegagalan sinkronisasi, dan buffering video. Bersifat <em>mikro & dinamis</em>.
                </p>
              </div>

              <!-- 2c -->
              <div class="sub-eq-card wide clickable" @click="openFormulaModal('eq2c')">
                <div class="sub-eq-header">
                  <span class="sub-eq-badge">Persamaan (2c)</span>
                  <strong>Indeks Spasial Komposit</strong>
                </div>
                <MathFormula 
                  formula="S_{i,t} = \delta \cdot K_i + (1 - \delta) \cdot N_{i,t}" 
                />
                <div class="emp-grounding-badge">
                  <span class="emp-grounding-tag">📊 FAKTA LAPANGAN:</span>
                  <span>Hasil kuesioner Q12 membuktikan 68% ASN di wilayah perdesaan/3T mengalami lonjakan latensi dan sinyal putus, memvalidasi bobot pembagian &delta;.</span>
                  <NuxtLink to="/hasil-survey/sementara" class="emp-link-btn">Lihat Grafik Q12 ➔</NuxtLink>
                </div>
                <div class="sub-eq-footer-note">
                  <strong>🎯 Inti Konseptual:</strong> Menggabungkan kondisi struktural wilayah ($K_i$) dengan kondisi situasional jaringan ($N_{i,t}$) melalui parameter bobot relatif $\delta$.
                  Sistem mampu membedakan: <em>"wilayah memang daerah 3T susah sinyal"</em> vs <em>"wilayah maju perkotaan tapi ISP sedang gangguan sesaat hari ini"</em>.
                </div>
              </div>
            </div>
          </div>

          <!-- Persamaan 3 & 4 -->
          <div class="grid-2-col">
            <!-- Persamaan 3 -->
            <div class="equation-card clickable" @click="openFormulaModal('eq3')">
              <div class="eq-header">
                <div style="display: flex; align-items: center; gap: 0.6rem;">
                  <span class="eq-badge">Persamaan (3)</span>
                  <h3 class="eq-name">Rasio Missingness ($m_{i,t}$)</h3>
                </div>
                <button class="btn-inspect-pill">Detail</button>
              </div>
              <MathFormula 
                formula="m_{i,t} = 1 - \frac{n_{\text{observed},i,t}}{n_{\text{expected},i,t}}" 
              />
              <div class="emp-grounding-badge">
                <span class="emp-grounding-tag">📊 BUKTI Q13:</span>
                <span>41.2% responden melaporkan listrik padam dan kuota habis di tengah kuis. Missingness $m_{i,t}$ adalah bukti kendala fisik, bukan bolos belajar.</span>
              </div>
              <div class="eq-explanation">
                <p>
                  Proporsi paket telemetri yang hilang ($n_{\text{observed}}$) dari total paket yang seharusnya terekam ($n_{\text{expected}}$). 
                  Semakin tinggi nilai $m_{i,t}$, semakin rendah observabilitas peserta.
                </p>
              </div>
            </div>

            <!-- Persamaan 4 -->
            <div class="equation-card clickable" @click="openFormulaModal('eq4')">
              <div class="eq-header">
                <div style="display: flex; align-items: center; gap: 0.6rem;">
                  <span class="eq-badge">Persamaan (4)</span>
                  <h3 class="eq-name">Kualitas Evidensi ($q_{i,t}$)</h3>
                </div>
                <button class="btn-inspect-pill">Detail</button>
              </div>
              <MathFormula 
                formula="q_{i,t} = 1 - m_{i,t} - \lambda \cdot \text{noise}_{i,t}" 
              />
              <div class="eq-explanation">
                <p>
                  Skor kualitas bukti empiris. Nilai $q_{i,t}$ menurun jika data banyak hilang ($m$) atau terkontaminasi derau/sinyal bias ($\text{noise}$).
                </p>
                <div class="callout-important">
                  <strong>⚠️ Prinsip Keadilan:</strong> Data hilang bukan berarti ASN malas atau membolos — dalam CCBN, missingness adalah bukti kendala transmisi jaringan.
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ========================================== -->
        <!-- BLOK 2: BASELINE KONTEKSTUAL & RESIDUAL    -->
        <!-- ========================================== -->
        <section id="blok-2" class="card block-section">
          <div class="block-header">
            <div class="block-number-badge accent-purple">BLOK 2</div>
            <div class="block-header-info">
              <h2 class="block-title">Baseline Kontekstual & Residual</h2>
              <div class="block-range-pill">Persamaan (5) – (6)</div>
            </div>
          </div>

          <div class="block-function-banner bg-purple">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/></svg>
            <div>
              <strong>Fungsi Utama:</strong> Inti paradigma CCBN — membandingkan perilaku aktual peserta bukan dengan standar absolut seragam, melainkan dengan <em>"perilaku yang wajar dicapai pada kondisi konteks tersebut"</em>.
            </div>
          </div>

          <!-- Persamaan 5 -->
          <div class="equation-card clickable" @click="openFormulaModal('eq5')">
            <div class="eq-header">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span class="eq-badge">Persamaan (5)</span>
                <h3 class="eq-name">Expected Behavioral Baseline ($\hat{b}_{i,t}$)</h3>
              </div>
              <button class="btn-inspect-pill">Detail Rumus</button>
            </div>
            
            <MathFormula 
              formula="\hat{b}_{i,t} = \mathbb{E}\left[ B_{i,t} \mid c_{i,t},\, q_{i,t} \right] = f(c_{i,t},\, q_{i,t})" 
            />

            <!-- Grounding Badge -->
            <div class="emp-grounding-badge">
              <span class="emp-grounding-tag">📊 JUSTIFIKASI EMPIRIS:</span>
              <span>Data survei menunjukkan rata-rata durasi belajar ASN 3T hanya 35 menit vs Metropolitan 95 menit. Model menetapkan $\hat{b}$ yang adil dan realistis.</span>
            </div>

            <div class="eq-breakdown-grid">
              <div class="eq-explanation">
                <h4 class="sub-heading">📖 Makna Matematis:</h4>
                <p>
                  $\hat{b}_{i,t}$ adalah nilai ekspektasi matematis dari performa/perilaku peserta $i$ pada sesi $t$, dikondisikan pada seluruh vektor konteks $c_{i,t}$ dan kualitas bukti $q_{i,t}$.
                </p>
                <p>
                  <strong>Implikasi Ilmiah:</strong> ASN di wilayah 3T dengan jaringan buruk dan beban kedinasan tinggi memiliki batas baseline wajar yang berbeda dari ASN di kantor pusat berfasilitas fiber-optic.
                </p>
              </div>
              <div class="eq-analogy">
                <h4 class="sub-heading">💡 Analogi Konseptual E-Learning ASN:</h4>
                <p>
                  Seperti <strong>target wajar penyelesaian modul harian</strong> — ASN di Puskesmas pedalaman yang merangkap pelayanan darurat wajar jika hanya menyelesaikan 1 modul per hari ($\hat{b}$ lebih rendah), dibanding ASN di Bappeda kota besar yang mendapat izin waktu khusus belajar di ruang ber-AC dengan wifi cepat ($\hat{b}$ lebih tinggi).
                </p>
              </div>
            </div>
          </div>

          <!-- Persamaan 6 -->
          <div class="equation-card clickable" @click="openFormulaModal('eq6')">
            <div class="eq-header">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span class="eq-badge">Persamaan (6)</span>
                <h3 class="eq-name">Contextual Residual ($d_{i,t}$)</h3>
              </div>
              <button class="btn-inspect-pill">Detail Rumus</button>
            </div>
            
            <MathFormula 
              formula="d_{i,t} = B_{i,t} - \hat{b}_{i,t}" 
            />

            <div class="residual-interpretation-grid">
              <div class="residual-card positive">
                <div class="res-badge">+ POSITIF</div>
                <div class="res-formula">$d_{i,t} > 0$</div>
                <div class="res-desc">Peserta <strong>lebih aktif & melampaui ekspektasi</strong> yang diharapkan untuk kondisi konteks belajarnya.</div>
              </div>

              <div class="residual-card neutral">
                <div class="res-badge">≈ NETRAL</div>
                <div class="res-formula">$d_{i,t} \approx 0$</div>
                <div class="res-desc">Peserta <strong>sesuai dengan kewajaran konteks</strong> kondisinya.</div>
              </div>

              <div class="residual-card negative">
                <div class="res-badge">- NEGATIF</div>
                <div class="res-formula">$d_{i,t} < 0$</div>
                <div class="res-desc">Peserta <strong>lebih pasif dari ekspektasi</strong> konteksnya (indikasi disengagement murni).</div>
              </div>
            </div>

            <div class="analogy-box mt-3">
              <strong>💡 Analogi Evaluasi Pelatihan ASN:</strong> Mengukur <em>nilai tambah (effort murni)</em> peserta. ASN di daerah terpencil yang berhasil login dan submit tugas di tengah pemadaman listrik dinilai memiliki residual positif tinggi ($d > 0$), bukan dianggap tertinggal dibanding peserta di ibukota.
            </div>
          </div>
        </section>

        <!-- ========================================== -->
        <!-- BLOK 3: CONTEXTUAL DISPARITY               -->
        <!-- ========================================== -->
        <section id="blok-3" class="card block-section">
          <div class="block-header">
            <div class="block-number-badge accent-amber">BLOK 3</div>
            <div class="block-header-info">
              <h2 class="block-title">Contextual Disparity & Audit Keadilan</h2>
              <div class="block-range-pill">Persamaan (7) – (8b)</div>
            </div>
          </div>

          <div class="block-function-banner bg-amber">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
            <div>
              <strong>Fungsi Utama:</strong> Mengukur dan membatasi ketimpangan atau disparitas sistemik antar-kelompok wilayah/konteks agar algoritma tidak mendiskriminasi kelompok tertentu.
            </div>
          </div>

          <!-- Persamaan 7 -->
          <div class="equation-card clickable" @click="openFormulaModal('eq7')">
            <div class="eq-header">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span class="eq-badge">Persamaan (7)</span>
                <h3 class="eq-name">Fungsi Disparitas Kontekstual Umum ($D_t$)</h3>
              </div>
              <button class="btn-inspect-pill">Detail</button>
            </div>
            
            <MathFormula 
              formula="D_t = \text{disparity}\left( d_{i,t} \mid \text{context/group} \right)" 
            />

            <p class="eq-desc">
              Fungsi umum yang mengukur derajat sebaran dan asimetri residual ($d_{i,t}$) lintas kelompok konteks wilayah $G$.
            </p>
          </div>

          <!-- Persamaan 8, 8a, 8b -->
          <div class="grid-3-col">
            <!-- 8 -->
            <div class="equation-card clickable" @click="openFormulaModal('eq8')">
              <div class="eq-header">
                <span class="eq-badge">Persamaan (8)</span>
                <h4 class="eq-name">Beban Rekomendasi ($CB_{i,a,t}$)</h4>
              </div>
              <MathFormula 
                formula="CB_{i,a,t} = \text{cost}_a(c_{i,t},\, \Delta c_{i,t})" 
              />
              <div class="emp-grounding-badge">
                <span class="emp-grounding-tag">📊 BUKTI Q15-Q17:</span>
                <span>Rata-rata beban kerja kedinasan mencapai 4.1/5.0. Penalti $CB$ mencegah rekomendasi video berat saat jam kerja padat.</span>
                <NuxtLink to="/hasil-survey/sementara" class="emp-link-btn">Lihat Grafik Beban ➔</NuxtLink>
              </div>
              <p class="sub-eq-desc">
                "Biaya/Beban" yang harus dibayar peserta $i$ untuk mengeksekusi rekomendasi aksi $a$ (kuota data, beban komputasi HP, interupsi jam kerja dinas).
              </p>
            </div>

            <!-- 8a -->
            <div class="equation-card clickable" @click="openFormulaModal('eq8a')">
              <div class="eq-header">
                <span class="eq-badge">Persamaan (8a)</span>
                <h4 class="eq-name">Kesenjangan Beban Rekomendasi</h4>
              </div>
              <MathFormula 
                formula="\text{Gap}_{\text{beban}} = \max_{g,h \in G} \left\| \mathbb{E}[CB_{i,a,t} \mid g] - \mathbb{E}[CB_{i,a,t} \mid h] \right\|" 
              />
              <p class="sub-eq-desc">
                Selisih maksimum beban rekomendasi antara kelompok wilayah $g$ dan $h$. Menjamin rekomendasi tidak timpang membebani daerah tertentu.
              </p>
            </div>

            <!-- 8b -->
            <div class="equation-card clickable" @click="openFormulaModal('eq8b')">
              <div class="eq-header">
                <span class="eq-badge">Persamaan (8b)</span>
                <h4 class="eq-name">Kesenjangan Kesalahan Interpretasi</h4>
              </div>
              <MathFormula 
                formula="\text{Gap}_{\text{interpretasi}} = \max_{g,h \in G} \left\| \text{MAE}_{g,t}(d) - \text{MAE}_{h,t}(d) \right\|" 
              />
              <p class="sub-eq-desc">
                Selisih galat pembacaan residual ($d$) antar-kelompok wilayah. Menjamin akurasi model seimbang di seluruh pelosok.
              </p>
            </div>
          </div>
        </section>

        <!-- ========================================== -->
        <!-- BLOK 4: ADAPTIVE DECISION                  -->
        <!-- ========================================== -->
        <section id="blok-4" class="card block-section">
          <div class="block-header">
            <div class="block-number-badge accent-emerald">BLOK 4</div>
            <div class="block-header-info">
              <h2 class="block-title">Adaptive Decision (Keputusan Adaptif)</h2>
              <div class="block-range-pill">Persamaan (9)</div>
            </div>
          </div>

          <div class="block-function-banner bg-emerald">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
            <div>
              <strong>Fungsi Utama:</strong> Memilih rekomendasi modalitas belajar terbaik yang mengoptimalkan manfaat pembelajaran sekaligus meminimalkan beban biaya dan disparitas keadilan.
            </div>
          </div>

          <!-- Persamaan 9 -->
          <div class="equation-card highlight-card clickable" @click="openFormulaModal('eq9')">
            <div class="eq-header">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span class="eq-badge">Persamaan (9)</span>
                <h3 class="eq-name">Fungsi Reward Terkalibrasi Multi-Objektif ($r'_{i,a,t+1}$)</h3>
              </div>
              <button class="btn-inspect-pill">Detail Lengkap</button>
            </div>
            
            <MathFormula 
              formula="r'_{i,a,t+1} = r_{i,a,t} + \underbrace{\eta_t U(a,\, d_{i,t})}_{\text{manfaat individual}} - \underbrace{\mu_t CB_{i,a,t}}_{\text{beban peserta}} - \underbrace{\nu_t OB_{i,a,t}}_{\text{beban operasional}} - \underbrace{\rho_t \Delta c_{i,t}}_{\text{perubahan konteks}} - \underbrace{\gamma_t D_t}_{\text{penalti disparitas}}" 
            />

            <div class="reward-terms-breakdown">
              <h4 class="sub-heading">🔍 Anatomi Komponen Penimbang:</h4>
              <div class="terms-grid">
                <div class="term-box benefit">
                  <div class="term-math">$\eta_t U(a, d_{i,t})$</div>
                  <div class="term-title">Utilitas Manfaat (+)</div>
                  <p>Kesesuaian modalitas aksi $a$ dengan kebutuhan residual individu peserta $d_{i,t}$.</p>
                </div>

                <div class="term-box penalty">
                  <div class="term-math">$\mu_t CB_{i,a,t}$</div>
                  <div class="term-title">Beban Kontekstual (-)</div>
                  <p>Penalti konsumsi bandwidth, kuota, dan kompatibilitas gawai peserta.</p>
                </div>

                <div class="term-box penalty">
                  <div class="term-math">$\nu_t OB_{i,a,t}$</div>
                  <div class="term-title">Beban Operasional (-)</div>
                  <p>Beban sumber daya server pelatihan, instruktur, dan logistik LMS.</p>
                </div>

                <div class="term-box penalty">
                  <div class="term-math">$\rho_t \Delta c_{i,t}$</div>
                  <div class="term-title">Dinamika Konteks (-)</div>
                  <p>Penalti volatilitas apabila terjadi pergeseran situasi mendadak saat belajar.</p>
                </div>

                <div class="term-box fairness">
                  <div class="term-math">$\gamma_t D_t$</div>
                  <div class="term-title">Penalti Disparitas Spasial (-)</div>
                  <p>Safeguard keadilan agar rekomendasi yang dipilih tidak memperlebar jurang disparitas regional.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ========================================== -->
        <!-- BLOK 5: FUSI MULTIMODAL TERBATAS           -->
        <!-- ========================================== -->
        <section id="blok-5" class="card block-section">
          <div class="block-header">
            <div class="block-number-badge accent-rose">BLOK 5</div>
            <div class="block-header-info">
              <h2 class="block-title">Fusi Multimodal Terbatas</h2>
              <div class="block-range-pill">Persamaan (10) – (10a)</div>
            </div>
          </div>

          <div class="block-function-banner bg-rose">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
            <div>
              <strong>Fungsi Utama:</strong> Mengintegrasikan sinyal visual video sinkronus secara hati-hati (gated fusion) agar tidak mendiskriminasi peserta di wilayah minim bandwidth.
            </div>
          </div>

          <div class="grid-2-col">
            <!-- Persamaan 10 -->
            <div class="equation-card clickable" @click="openFormulaModal('eq10')">
              <div class="eq-header">
                <div style="display: flex; align-items: center; gap: 0.6rem;">
                  <span class="eq-badge">Persamaan (10)</span>
                  <h3 class="eq-name">Bobot Fusi Gated Sigmoid ($w$)</h3>
                </div>
                <button class="btn-inspect-pill">Detail</button>
              </div>
              <MathFormula 
                formula="w(S_{i,t},\, q_{i,t}^{\text{visual}}) = \sigma\left( \alpha_1 (1 - S_{i,t}) + \alpha_2 \cdot q_{i,t}^{\text{visual}} \right)" 
              />
              <div class="emp-grounding-badge">
                <span class="emp-grounding-tag">📊 BUKTI SURVEI Q33:</span>
                <span>82.6% ASN mematikan kamera saat Zoom sinkronus demi menghemat kuota & mencegah lag. Bobot sigmoid $w \to 0$ melindungi mereka dari vonis keliru.</span>
                <NuxtLink to="/hasil-survey/sementara" class="emp-link-btn">Lihat Grafik Q33 ➔</NuxtLink>
              </div>
              <div class="eq-explanation">
                <p>
                  Bobot kepercayaan sinyal visual dihitung via fungsi sigmoid $\sigma$. 
                  Semakin rendah indeks spasial $S_{i,t}$ atau kualitas kamera/bandwidth visual $q^{\text{visual}}$, maka $w \to 0$.
                </p>
                <div class="callout-important">
                  <strong>🛡️ Prinsip Non-Diskriminasi:</strong> ASN di pelosok yang mematikan kamera demi hemat kuota tidak dipaksa dan tidak dihukum sinyal visual kosongnya.
                </div>
              </div>
            </div>

            <!-- Persamaan 10a -->
            <div class="equation-card clickable" @click="openFormulaModal('eq10a')">
              <div class="eq-header">
                <div style="display: flex; align-items: center; gap: 0.6rem;">
                  <span class="eq-badge">Persamaan (10a)</span>
                  <h3 class="eq-name">Evidensi Fusi Multimodal ($F_{i,t}$)</h3>
                </div>
                <button class="btn-inspect-pill">Detail</button>
              </div>
              <MathFormula 
                formula="F_{i,t} = w_{i,t} \cdot V_{i,t} + (1 - w_{i,t}) \cdot b_{i,t}^{\text{LMS}}" 
              />
              <div class="eq-explanation">
                <p>
                  Evidensi gabungan akhir menggabungkan fitur visual $V_{i,t}$ dengan baseline telemetri LMS $b_{i,t}^{\text{LMS}}$.
                </p>
                <p>
                  Jika $w_{i,t} \approx 0$, sistem secara otomatis sepenuhnya bertumpu pada telemetri LMS tanpa kehilangan keabsahan bukti.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- ========================================== -->
        <!-- BLOK 6: 7 METRIK FAIRNESS SPASIAL          -->
        <!-- ========================================== -->
        <section id="blok-6" class="card block-section">
          <div class="block-header">
            <div class="block-number-badge accent-indigo">BLOK 6</div>
            <div class="block-header-info">
              <h2 class="block-title">Tujuh Metrik Fairness Spasial</h2>
              <div class="block-range-pill">Persamaan (11) – (17)</div>
            </div>
          </div>

          <div class="block-function-banner bg-indigo">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            <div>
              <strong>Fungsi Utama:</strong> Matriks audit kuantitatif untuk menguji keadilan sistemik rekomendasi AI dari berbagai sudut pandang disparitas regional.
            </div>
          </div>

          <!-- Interactive Table of 7 Fairness Metrics -->
          <div class="table-responsive">
            <table class="fairness-table">
              <thead>
                <tr>
                  <th style="width: 70px;">No.</th>
                  <th style="width: 220px;">Nama Metrik Formal</th>
                  <th>Formula Matematis</th>
                  <th>Objek yang Diukur</th>
                  <th>Tujuan Audit Keadilan</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="m in fairnessMetrics" :key="m.no" class="clickable-row" @click="openMetricModal(m)">
                  <td class="text-center font-bold">{{ m.no }}</td>
                  <td>
                    <div class="metric-name-id">{{ m.name }}</div>
                    <div class="metric-name-en">{{ m.alias }}</div>
                  </td>
                  <td>
                    <MathFormula :formula="m.formula" :displayMode="false" />
                  </td>
                  <td class="text-muted">{{ m.measured }}</td>
                  <td>
                    <span class="audit-goal-tag">{{ m.goal }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ========================================== -->
        <!-- BLOK 7: GARIS BATAS VALIDITAS BASELINE     -->
        <!-- ========================================== -->
        <section id="blok-7" class="card block-section">
          <div class="block-header">
            <div class="block-number-badge accent-red">BLOK 7</div>
            <div class="block-header-info">
              <h2 class="block-title">Garis Batas Validitas Baseline (Safeguard Triase)</h2>
              <div class="block-range-pill">Persamaan (18a) – (18c)</div>
            </div>
          </div>

          <div class="block-function-banner bg-red">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            <div>
              <strong>Fungsi Utama:</strong> Mekanisme perlindungan etik (algorithmic safety safeguard) — menentukan kapan sistem AI diizinkan memberikan rekomendasi otomatis penuh, rekomendasi terbatas, atau harus memutus rantai otomatisasi ke Widyaiswara.
            </div>
          </div>

          <!-- Safeguard 3 Zones Cards -->
          <div class="safeguard-zones-grid">
            <!-- 18a: VALID -->
            <div class="safeguard-zone-card valid clickable" @click="openFormulaModal('eq18a')">
              <div class="zone-badge">STATUS: VALID</div>
              <div class="zone-equation-num">Persamaan (18a)</div>
              
              <MathFormula 
                formula="\text{Status} = \mathbf{VALID} \iff S_{i,t} \ge \theta_S \;\land\; q_{i,t} \ge \theta_q" 
              />

              <div class="zone-content">
                <h4>✅ Data Teramati & Cukup</h4>
                <p>Kondisi spasial dan kualitas bukti berada di atas ambang batas operasional baku ($\theta_S, \theta_q$).</p>
                <div class="zone-action-box">
                  <strong>Aksi Algoritma:</strong> Residual dihitung penuh, rekomendasi adaptif otomatis berjalan normal tanpa restriksi.
                </div>
              </div>
            </div>

            <!-- 18b: BOUNDARY -->
            <div class="safeguard-zone-card boundary clickable" @click="openFormulaModal('eq18b')">
              <div class="zone-badge">STATUS: BOUNDARY</div>
              <div class="zone-equation-num">Persamaan (18b)</div>
              
              <MathFormula 
                formula="\text{Status} = \mathbf{BOUNDARY} \iff \theta_S' \le S_{i,t} < \theta_S \;\lor\; \theta_q' \le q_{i,t} < \theta_q" 
              />

              <div class="zone-content">
                <h4>⚠️ Zona Ambigu / Moderat</h4>
                <p>Data berada di zona abu-abu akibat koneksi tidak stabil atau sebagian telemetri hilang.</p>
                <div class="zone-action-box">
                  <strong>Aksi Algoritma:</strong> Residual dihitung terbatas; hanya merekomendasikan intervensi ringan (ringkasan teks rendah kuota, audio mikro, penjadwalan ulang).
                </div>
              </div>
            </div>

            <!-- 18c: INVALID -->
            <div class="safeguard-zone-card invalid clickable" @click="openFormulaModal('eq18c')">
              <div class="zone-badge">STATUS: INVALID</div>
              <div class="zone-equation-num">Persamaan (18c)</div>
              
              <MathFormula 
                formula="\text{Status} = \mathbf{INVALID} \iff S_{i,t} < \theta_S' \;\lor\; q_{i,t} < \theta_q'" 
              />

              <div class="zone-content">
                <h4>🛑 Data Tidak Observabel</h4>
                <p>Data telemetri rusak parah / terputus ekstrem di bawah ambang batas minimal ($\theta_S', \theta_q'$).</p>
                <div class="zone-action-box">
                  <strong>Aksi Algoritma:</strong> Otomatisasi AI <strong>DIHENTIKAN TOTAL</strong>. Langsung eskalasi ke <em>Human-in-the-loop</em> (Widyaiswara / Fasilitator Pelatihan).
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Action Footer Links -->
      <div class="footer-links-card card">
        <div class="footer-links-content">
          <div>
            <h3 style="font-size: 1.1rem; font-weight: 700; color: #0F172A; margin-bottom: 0.25rem;">
              Implementasi Empiris & Simulasi Algoritma
            </h3>
            <p style="font-size: 0.85rem; color: #64748B;">
              Formulasi matematis di atas diimplementasikan secara komputasional pada modul simulator dan pembuktian empiris dataset ASN.
            </p>
          </div>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <NuxtLink to="/hasil-survey/sementara" class="btn btn-secondary" style="text-decoration: none;">
              Dashboard Hasil Survei
            </NuxtLink>
            <NuxtLink to="/analisis" class="btn btn-primary" style="text-decoration: none;">
              Simulator Fair-LinUCB
            </NuxtLink>
            <NuxtLink to="/model" class="btn btn-outline" style="text-decoration: none;">
              Arsitektur Komputasional
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>

    <!-- ========================================== -->
    <!-- MODAL INSPEKSI RUMUS LENGKAP (POP-OUT)     -->
    <!-- ========================================== -->
    <div v-if="selectedFormula" class="formula-modal-backdrop" @click.self="closeFormulaModal">
      <div class="formula-modal-card">
        <!-- Modal Top Bar -->
        <div class="modal-top-bar">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span class="modal-badge">{{ selectedFormula.blockTag }}</span>
            <span class="modal-eq-num">{{ selectedFormula.equationNum }}</span>
          </div>
          <button @click="closeFormulaModal" class="modal-close-btn" title="Tutup Modal">✕</button>
        </div>

        <!-- Modal Title -->
        <h2 class="modal-formula-title">{{ selectedFormula.title }}</h2>
        <p class="modal-formula-subtitle">{{ selectedFormula.subtitle }}</p>

        <!-- Main Math Display Box in Modal -->
        <div class="modal-math-hero">
          <MathFormula :formula="selectedFormula.formula" :displayMode="true" />
        </div>

        <!-- Modal Details Sections -->
        <div class="modal-sections-grid">
          <!-- Left Col: Parameter Table & Math Meaning -->
          <div class="modal-detail-col">
            <h3 class="modal-col-heading">📋 Rincian Notasi & Variabel</h3>
            
            <div class="var-table-wrapper">
              <table class="var-table">
                <thead>
                  <tr>
                    <th>Notasi</th>
                    <th>Nama & Definisi</th>
                    <th>Domain</th>
                    <th>Sumber Data</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(v, idx) in selectedFormula.variables" :key="idx">
                    <td class="font-mono text-blue font-bold">
                      <MathFormula :formula="v.symbol" :displayMode="false" />
                    </td>
                    <td>{{ v.name }}</td>
                    <td class="text-muted font-mono">{{ v.domain }}</td>
                    <td><span class="data-src-pill">{{ v.source }}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Mathematical Interpretation & Derivation -->
            <div class="modal-block-text">
              <h4 class="sub-heading">📐 Interpretasi & Derivasi Matematis:</h4>
              <p>{{ selectedFormula.derivation }}</p>
            </div>
          </div>

          <!-- Right Col: Analogy, Policy Implication & Code Copy -->
          <div class="modal-detail-col">
            <!-- Real World Analogy Box -->
            <div class="analogy-modal-box">
              <div class="analogy-modal-title">💡 Analogi Konseptual Dunia Nyata</div>
              <p>{{ selectedFormula.analogy }}</p>
            </div>

            <!-- Policy & Academic Impact -->
            <div class="policy-modal-box">
              <div class="policy-modal-title">🏛️ Implikasi Kebijakan & Disertasi</div>
              <p>{{ selectedFormula.policyImpact }}</p>
            </div>

            <!-- Raw LaTeX Box -->
            <div class="latex-modal-box">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span style="font-size: 0.75rem; font-weight: 700; color: #475569;">KODE LATEX UNTUK NASKAH:</span>
                <button @click="copyModalLatex" class="btn-copy-modal-latex">
                  {{ modalLatexCopied ? '✓ Tersalin!' : 'Salin TeX' }}
                </button>
              </div>
              <pre class="latex-code-preview"><code>{{ selectedFormula.formula }}</code></pre>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer-bar">
          <span style="font-size: 0.8rem; color: #64748B;">
            Landasan Model Disertasi CCBN • Terhubung dengan Data Survei Empiris
          </span>
          <button @click="closeFormulaModal" class="btn btn-primary" style="font-size: 0.85rem; padding: 0.4rem 1.25rem;">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Navbar from '~/components/Navbar.vue';
import MathFormula from '~/components/MathFormula.vue';

// Active section for sticky nav
const activeSection = ref('blok-1');
const showSandbox = ref(false);

// Blocks definition
const blocks = [
  { id: 'persona-sandbox', navTitle: 'Persona Kasus Nyata', icon: '👥' },
  { id: 'blok-1', navTitle: 'Blok 1: Evidensi', icon: '📝' },
  { id: 'blok-2', navTitle: 'Blok 2: Baseline & Residual', icon: '🎯' },
  { id: 'blok-3', navTitle: 'Blok 3: Disparitas', icon: '⚖️' },
  { id: 'blok-4', navTitle: 'Blok 4: Keputusan Adaptif', icon: '🎁' },
  { id: 'blok-5', navTitle: 'Blok 5: Fusi Multimodal', icon: '🎥' },
  { id: 'blok-6', navTitle: 'Blok 6: 7 Metrik Fairness', icon: '📊' },
  { id: 'blok-7', navTitle: 'Blok 7: Safeguard Validitas', icon: '🛡️' }
];

// Interactive Sandbox Reactive Parameters
const simKi = ref(0.40);           // Klaster wilayah
const simNit = ref(0.65);          // Sinyal dinamis
const simDelta = ref(0.60);        // Bobot struktural vs situasional
const simMissingness = ref(0.15);  // m_{i,t}
const simNoise = ref(0.05);        // noise_{i,t}
const simActualB = ref(0.72);      // B_{i,t}
const simCostBeban = ref(0.25);    // CB_{i,a,t}
const simDisparity = ref(0.18);    // D_t

// Computed outputs
const simSit = computed(() => {
  return simDelta.value * simKi.value + (1 - simDelta.value) * simNit.value;
});

const simQit = computed(() => {
  const lambda = 0.5;
  const q = 1 - simMissingness.value - lambda * simNoise.value;
  return Math.max(0, Math.min(1, q));
});

const simExpectedBaseline = computed(() => {
  const rawExpected = 0.35 + 0.45 * simSit.value + 0.20 * simQit.value;
  return Math.max(0.1, Math.min(0.95, rawExpected));
});

const simResidual = computed(() => {
  return simActualB.value - simExpectedBaseline.value;
});

const simCalibratedReward = computed(() => {
  const eta = 1.0;
  const mu = 0.4;
  const nu = 0.2;
  const rho = 0.1;
  const gamma = 0.5;
  
  const utility = Math.max(0, 0.5 + simResidual.value);
  const costOperational = 0.15;
  const deltaC = 0.1;

  return 0.5 + eta * utility - mu * simCostBeban.value - nu * costOperational - rho * deltaC - gamma * simDisparity.value;
});

// Safeguard thresholds:
const simSafeguardStatus = computed(() => {
  const s = simSit.value;
  const q = simQit.value;

  const thetaS = 0.60;
  const thetaQ = 0.70;
  const thetaSPrime = 0.30;
  const thetaQPrime = 0.40;

  if (s >= thetaS && q >= thetaQ) {
    return {
      type: 'valid',
      title: 'STATUS VALID (Persamaan 18a)',
      desc: 'Observabilitas dan infrastruktur memadai. Model CCBN memberikan rekomendasi adaptif otomatis penuh.'
    };
  } else if (s < thetaSPrime || q < thetaQPrime) {
    return {
      type: 'invalid',
      title: 'STATUS INVALID (Persamaan 18c)',
      desc: 'Data telemetri hilang parah / jaringan lumpuh. Rekomendasi otomatis DIMATIKAN dan dialihkan ke Widyaiswara.'
    };
  } else {
    return {
      type: 'boundary',
      title: 'STATUS BOUNDARY (Persamaan 18b)',
      desc: 'Zona moderat/abu-abu. Sistem membatasi diri pada rekomendasi hemat kuota (teks mikro, audio, resched).'
    };
  }
});

function getKiLabel(val: number) {
  if (val < 0.35) return 'Wilayah 3T / Terpencil';
  if (val < 0.70) return 'Wilayah Berkembang';
  return 'Metropolitan / Maju';
}

function scrollToBlock(blockId: string) {
  activeSection.value = blockId;
  const el = document.getElementById(blockId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function toggleInteractiveSandbox() {
  showSandbox.value = !showSandbox.value;
  if (showSandbox.value) {
    setTimeout(() => {
      const el = document.getElementById('sandbox-calculator');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }
}

// Formula modal dictionary
interface FormulaDetail {
  id: string;
  blockTag: string;
  equationNum: string;
  title: string;
  subtitle: string;
  formula: string;
  variables: { symbol: string; name: string; domain: string; source: string }[];
  derivation: string;
  analogy: string;
  policyImpact: string;
}

const formulaDatabase: Record<string, FormulaDetail> = {
  eq1: {
    id: 'eq1',
    blockTag: 'BLOK 1',
    equationNum: 'Persamaan (1)',
    title: 'Raw Behavioral Traces (Jejak Perilaku Mentah)',
    subtitle: 'Vektor akumulasi rekaman sinyal telemetri interaksi peserta LMS sebelum dikalibrasi konteks',
    formula: 'X_{i,t} = \\left[ \\text{login}_{i,t},\\, \\text{durasi}_{i,t},\\, \\text{clickstream}_{i,t},\\, \\text{completion}_{i,t},\\, \\text{artefak}_{i,t},\\, \\dots \\right]',
    variables: [
      { symbol: 'X_{i,t}', name: 'Vektor jejak perilaku mentah peserta i pada sesi t', domain: '\\mathbb{R}^k', source: 'LMS Telemetri' },
      { symbol: '\\text{login}_{i,t}', name: 'Timestamp dan durasi sesi login', domain: '[0, \\infty)', source: 'Log Autentikasi' },
      { symbol: '\\text{durasi}_{i,t}', name: 'Lama waktu aktif membaca modul', domain: 'detik / menit', source: 'Client Heartbeat' },
      { symbol: '\\text{clickstream}', name: 'Frekuensi navigasi dan interaksi konten', domain: '\\mathbb{Z}^+', source: 'Event Tracker' },
      { symbol: '\\text{completion}', name: 'Rasio materi/tugas yang diselesaikan', domain: '[0, 1]', source: 'Database LMS' }
    ],
    derivation: 'Vektor X merupakan himpunan mentah (uncalibrated) yang merefleksikan kuantitas observasi tanpa memperhitungkan kendala eksternal peserta seperti pemadaman listrik atau overload tugas kedinasan.',
    analogy: 'Seperti log rekaman klik mentah di portal MOOC / LMS ASN — sistem hanya mencatat peserta login 30 menit dan klik modul 4 kali, tanpa mengetahui apakah waktu belajarnya terputus karena pemadaman listrik kantor, kuota habis, atau dipanggil rapat mendadak oleh pimpinan.',
    policyImpact: 'Mencegah pimpinan instansi menjatuhkan sanksi/hukuman disiplin belajar hanya berdasarkan angka login mentah.'
  },
  eq2: {
    id: 'eq2',
    blockTag: 'BLOK 1',
    equationNum: 'Persamaan (2)',
    title: 'Konteks Enam Dimensi ASN (c_{i,t})',
    subtitle: 'Vektor multidimensi penentu batasan struktural dan lingkungan belajar kedinasan',
    formula: 'c_{i,t} = \\left[ T_{i,t},\\, I_{i,t},\\, O_{i,t},\\, D_{i,t},\\, W_{i,t},\\, S_{i,t} \\right]',
    variables: [
      { symbol: 'T_{i,t}', name: 'Dimensi Temporal (waktu belajar vs jam dinas)', domain: '[0, 1]', source: 'Survey / Jadwal' },
      { symbol: 'I_{i,t}', name: 'Dimensi Infrastruktur (kestabilan listrik & paket data)', domain: '[0, 1]', source: 'Telemetri Jaringan' },
      { symbol: 'O_{i,t}', name: 'Dimensi Organisasi (kultur & izin pimpinan)', domain: '[0, 1]', source: 'Kuesioner ASN' },
      { symbol: 'D_{i,t}', name: 'Dimensi Delivery / Perangkat (spesifikasi HP/PC)', domain: '[0, 1]', source: 'User-Agent Log' },
      { symbol: 'W_{i,t}', name: 'Dimensi Workload (beban tugas mendadak)', domain: '[0, 1]', source: 'Kuesioner ASN' },
      { symbol: 'S_{i,t}', name: 'Dimensi Spasial (indeks wilayah & sinyal)', domain: '[0, 1]', source: 'BPS / Ookla / IP' }
    ],
    derivation: 'Seluruh dimensi dinormalisasi ke interval [0, 1] di mana nilai 1 merepresentasikan kondisi ekologi belajar yang paling kondusif dan 0 kondisi paling terhambat.',
    analogy: 'Seperti ekosistem nyata di meja kerja ASN saat pelatihan daring — kesuksesan belajar tidak hanya ditentukan niat individu, melainkan apakah pimpinan memberi izin waktu (O), kestabilan jaringan internet kantor (I/S), perangkat yang dipakai (D), dan ada tidaknya disposisi surat mendadak (W).',
    policyImpact: 'Membuktikan secara ilmiah bahwa performa pelatihan ASN dipengaruhi ekosistem kerja birokrasi, bukan semata niat individu.'
  },
  eq2a: {
    id: 'eq2a',
    blockTag: 'BLOK 1',
    equationNum: 'Persamaan (2a)',
    title: 'Klaster Wilayah Struktural (K_i)',
    subtitle: 'Pengelompokan wilayah berdasarkan basis data infrastruktur digital makro nasional',
    formula: 'K_i = \\text{cluster}\\left(\\text{BPS}_{\\text{region}},\\, \\text{Podes}_{\\text{region}},\\, \\text{APJII}_{\\text{region}},\\, \\text{Ookla}_{\\text{region}}\\right)',
    variables: [
      { symbol: 'K_i', name: 'Indeks klaster struktural wilayah peserta i', domain: '[0, 1]', source: 'Model Clustering' },
      { symbol: '\\text{BPS}', name: 'Indeks Pembangunan Teknologi Informasi Komunikasi BPS', domain: 'Skala 0-10', source: 'BPS RI' },
      { symbol: '\\text{Podes}', name: 'Potensi Desa sinyal BTS & fiber optik', domain: 'Kategori 1-4', source: 'Kemenkomdigi / BPS' },
      { symbol: '\\text{Ookla}', name: 'Rata-rata kecepatan download/upload per kabupaten', domain: 'Mbps', source: 'Ookla Open Data' }
    ],
    derivation: 'K_i dihitung melalui algoritma K-Means / Hierarchical Clustering untuk mengelompokkan 514 Kab/Kota menjadi 3 tier utama (3T Terpencil, Berkembang, Metropolitan Maju).',
    analogy: 'Seperti ketersediaan sarana digital dasar di kantor instansi — ASN di Bappeda Ibukota Provinsi memiliki fiber optic 100 Mbps permanen (K=1.0), sedangkan ASN di Kantor Distrik perbatasan 3T secara struktural hanya mengandalkan BTS seluler terbatas (K=0.2).',
    policyImpact: 'Menjadi dasar bagi LAN RI untuk memberikan kuota diferensial pelatihan antar daerah.'
  },
  eq2b: {
    id: 'eq2b',
    blockTag: 'BLOK 1',
    equationNum: 'Persamaan (2b)',
    title: 'Kualitas Jaringan Aktual Telemetri (N_{i,t})',
    subtitle: 'Pengukuran empiris kualitas koneksi sesi riil secara dinamis pada saat pembelajaran berlangsung',
    formula: 'N_{i,t} = \\text{normalize}\\left(w_1 \\cdot \\text{latency} + w_2 \\cdot \\text{retry} + w_3 \\cdot \\text{sync\\_fail} + w_4 \\cdot \\text{buffer}\\right)',
    variables: [
      { symbol: 'N_{i,t}', name: 'Skor kualitas jaringan dinamis sesi t', domain: '[0, 1]', source: 'Telemetri Real-time' },
      { symbol: '\\text{latency}', name: 'RTT (Round Trip Time) paket ke server LMS', domain: 'milidetik (ms)', source: 'WebSocket Ping' },
      { symbol: '\\text{retry}', name: 'Rasio paket HTTP yang harus dikirim ulang', domain: '[0, 1]', source: 'Network Worker' },
      { symbol: '\\text{sync\\_fail}', name: 'Frekuensi gagal simpan state kuis/modul', domain: '\\mathbb{Z}^+', source: 'Service Worker Log' }
    ],
    derivation: 'Menggunakan normalisasi min-max berbobot terbalik, di mana latensi tinggi dan frekuensi retry menurunkan skor N menuju 0.',
    analogy: 'Seperti kelancaran koneksi Zoom/LMS saat jam pelatihan berlangsung — mendeteksi apakah terjadi lag suara pemateri, video modul tersendat, atau gagal klik tombol simpan kuis karena koneksi drop sesaat.',
    policyImpact: 'Mendeteksi gangguan ISP dadakan meskipun peserta berada di kantor pusat kementerian di Jakarta.'
  },
  eq2c: {
    id: 'eq2c',
    blockTag: 'BLOK 1',
    equationNum: 'Persamaan (2c)',
    title: 'Indeks Spasial Komposit (S_{i,t})',
    subtitle: 'Fusi pembobotan antara kondisi struktural makro dan kondisi situasional mikro',
    formula: 'S_{i,t} = \\delta \\cdot K_i + (1 - \\delta) \\cdot N_{i,t}',
    variables: [
      { symbol: 'S_{i,t}', name: 'Indeks spasial komposit final sesi t', domain: '[0, 1]', source: 'Komputasi CCBN' },
      { symbol: '\\delta', name: 'Parameter bobot kestabilan struktural', domain: '[0, 1] (default 0.6)', source: 'Konfigurasi Model' },
      { symbol: 'K_i', name: 'Klaster struktural wilayah', domain: '[0, 1]', source: 'Persamaan (2a)' },
      { symbol: 'N_{i,t}', name: 'Kualitas jaringan sesi riil', domain: '[0, 1]', source: 'Persamaan (2b)' }
    ],
    derivation: 'Formulasi linear konveks memastikan S bernilai stabil namun tetap responsif terhadap anomali fluktuasi koneksi situasional peserta.',
    analogy: 'Membedakan penanganan sistem: ASN di Puskesmas 3T memang membutuhkan materi format teks ringan offline (K rendah), sedangkan ASN Jakarta yang ISP kantornya mendadak putus hanya butuh dispensasi waktu ujian susulan (N rendah sesaat).',
    policyImpact: 'Membedakan penanganan: bantuan perangkat permanen (K rendah) vs perpanjangan batas waktu penugasan (N rendah).'
  },
  eq3: {
    id: 'eq3',
    blockTag: 'BLOK 1',
    equationNum: 'Persamaan (3)',
    title: 'Rasio Missingness Telemetri (m_{i,t})',
    subtitle: 'Proporsi data log yang hilang dari total paket ekspektasi telemetri',
    formula: 'm_{i,t} = 1 - \\frac{n_{\\text{observed},i,t}}{n_{\\text{expected},i,t}}',
    variables: [
      { symbol: 'm_{i,t}', name: 'Tingkat missingness paket telemetri', domain: '[0, 1]', source: 'Audit Telemetri' },
      { symbol: 'n_{\\text{observed}}', name: 'Jumlah paket heartbeat yang berhasil diterima server', domain: '\\mathbb{Z}^+', source: 'Ingestion Queue' },
      { symbol: 'n_{\\text{expected}}', name: 'Jumlah paket yang seharusnya terkirim berdasarkan durasi', domain: '\\mathbb{Z}^+', source: 'Timer LMS' }
    ],
    derivation: 'Ketika jaringan drop, heartbeat gagal menjangkau server sehingga n_observed turun dan m meningkat mendekati 1.0.',
    analogy: 'Seperti data log kuis LMS yang terputus di tengah jalan — ketika layar ASN mendadak freeze akibat sinyal drop, sistem tidak mencatat aktivitas sehingga n_observed turun drastis padahal ASN tersebut sedang di depan layar.',
    policyImpact: 'Data yang tidak tercatat diakui sebagai kendala koneksi, bukan ketiadaan aktivitas belajar.'
  },
  eq4: {
    id: 'eq4',
    blockTag: 'BLOK 1',
    equationNum: 'Persamaan (4)',
    title: 'Kualitas Evidensi Terkalibrasi (q_{i,t})',
    subtitle: 'Skor integritas bukti empiris setelah penalti missingness dan derau sinyal',
    formula: 'q_{i,t} = 1 - m_{i,t} - \\lambda \\cdot \\text{noise}_{i,t}',
    variables: [
      { symbol: 'q_{i,t}', name: 'Indeks kualitas evidensi terkalibrasi', domain: '[0, 1]', source: 'Komputasi CCBN' },
      { symbol: 'm_{i,t}', name: 'Rasio data telemetri hilang', domain: '[0, 1]', source: 'Persamaan (3)' },
      { symbol: '\\lambda', name: 'Koefisien penalti sensitivitas derau', domain: '> 0 (default 0.5)', source: 'Kalibrasi Model' },
      { symbol: '\\text{noise}', name: 'Tingkat jitter / klik liar / sinyal bias', domain: '[0, 1]', source: 'Event Anomaly Detector' }
    ],
    derivation: 'Nilai q_it di-clamp pada interval [0, 1]. q_it menjadi pengontrol derajat keyakinan pada estimasi baseline di Blok 2.',
    analogy: 'Seperti tingkat keabsahan data presensi pelatihan — Widyaiswara tidak boleh langsung menjatuhkan vonis tidak lulus jika rekaman log kehadiran peserta rusak akibat kendala server atau jaringan.',
    policyImpact: 'Menjamin AI tidak mengambil keputusan rekomendasi berisiko tinggi saat data bukti sedang buram.'
  },
  eq5: {
    id: 'eq5',
    blockTag: 'BLOK 2',
    equationNum: 'Persamaan (5)',
    title: 'Expected Behavioral Baseline (\\hat{b}_{i,t})',
    subtitle: 'Ekspektasi perilaku yang wajar dicapai peserta dengan memperhitungkan batasan ekosistem konteks',
    formula: '\\hat{b}_{i,t} = \\mathbb{E}\\left[ B_{i,t} \\mid c_{i,t},\\, q_{i,t} \\right] = f(c_{i,t},\\, q_{i,t})',
    variables: [
      { symbol: '\\hat{b}_{i,t}', name: 'Baseline perilaku wajar kontekstual', domain: '[0, 1]', source: 'Model Regresi CCBN' },
      { symbol: 'B_{i,t}', name: 'Variabel perilaku aktual yang diamati', domain: '[0, 1]', source: 'Telemetri Terukur' },
      { symbol: 'c_{i,t}', name: 'Vektor 6 dimensi konteks ASN', domain: '[0, 1]^6', source: 'Persamaan (2)' },
      { symbol: 'q_{i,t}', name: 'Kualitas evidensi pengamatan', domain: '[0, 1]', source: 'Persamaan (4)' }
    ],
    derivation: 'Fungsi f dimodelkan melalui Gaussian Process / Contextual Ridge Regression yang melatih ekspektasi dinamis berdasarkan cluster konteks peserta sejenis di masa lalu.',
    analogy: 'Seperti penetapan target wajar penyelesaian modul — ASN di instansi pelayanan darurat di wilayah 3T wajar jika ditargetkan menyelesaikan 1 modul per hari (b̂ wajar lebih rendah), berbeda dengan ASN yang sedang bebas tugas belajar di kantor pusat (b̂ wajar lebih tinggi).',
    policyImpact: 'Mencegah diskriminasi peringkat kelulusan ASN di daerah pelosok yang selama ini dirugikan oleh tolok ukur tunggal nasional.'
  },
  eq6: {
    id: 'eq6',
    blockTag: 'BLOK 2',
    equationNum: 'Persamaan (6)',
    title: 'Contextual Residual (d_{i,t})',
    subtitle: 'Selisih antara kinerja aktual dengan baseline kontekstual wajar',
    formula: 'd_{i,t} = B_{i,t} - \\hat{b}_{i,t}',
    variables: [
      { symbol: 'd_{i,t}', name: 'Residual kontekstual (deviasi dari baseline wajar)', domain: '[-1, 1]', source: 'Komputasi CCBN' },
      { symbol: 'B_{i,t}', name: 'Capaian perilaku aktual terukur', domain: '[0, 1]', source: 'LMS Telemetri' },
      { symbol: '\\hat{b}_{i,t}', name: 'Baseline wajar yang diharapkan', domain: '[0, 1]', source: 'Persamaan (5)' }
    ],
    derivation: 'Residual d_it adalah sinyal inti keputusan CCBN. d > 0 membuktikan usaha ekstra di atas batas wajar konteksnya, d < 0 mengindikasikan masalah keterlibatan murni.',
    analogy: 'Seperti penilaian usaha murni (effort) belajar ASN — peserta dari daerah 3T yang berhasil menyelesaikan kuis di tengah pemadaman listrik dinilai memiliki residual positif tinggi (d > 0) dan diapresiasi, bukan dianggap tertinggal.',
    policyImpact: 'Widyaiswara dapat mendeteksi peserta yang benar-benar membutuhkan bimbingan afektif vs yang hanya terkendala infrastruktur.'
  },
  eq7: {
    id: 'eq7',
    blockTag: 'BLOK 3',
    equationNum: 'Persamaan (7)',
    title: 'Contextual Disparity Umum (D_t)',
    subtitle: 'Fungsi agregasi untuk mengukur derajat asimetri residual lintas klaster spasial',
    formula: 'D_t = \\text{disparity}\\left( d_{i,t} \\mid \\text{context/group} \\right)',
    variables: [
      { symbol: 'D_t', name: 'Indeks disparitas kontekstual keseluruhan sesi t', domain: '[0, 1]', source: 'Audit Spasial' },
      { symbol: 'd_{i,t}', name: 'Residual peserta individu', domain: '[-1, 1]', source: 'Persamaan (6)' },
      { symbol: 'G', name: 'Kelompok/klaster demografi wilayah', domain: '\\{g_1, g_2, \\dots, g_K\\}', source: 'BPS Region' }
    ],
    derivation: 'Dihitung sebagai varians antar-grup dari residual rata-rata d_g atau rasio disparitas maksimum lintas kelompok spasial.',
    analogy: 'Seperti audit kesenjangan kelulusan pelatihan antar-provinsi — mengukur apakah sistem e-learning secara tidak adil meluluskan ASN kota besar lebih banyak semata-mata karena fasilitas internet.',
    policyImpact: 'Menjadi indikator KPI keadilan algoritma sistem LMS nasional bagi LAN & KemenPAN-RB.'
  },
  eq8: {
    id: 'eq8',
    blockTag: 'BLOK 3',
    equationNum: 'Persamaan (8)',
    title: 'Beban Kontekstual Rekomendasi (CB_{i,a,t})',
    subtitle: 'Beban sumber daya yang harus dikorbankan peserta untuk menjalankan rekomendasi',
    formula: 'CB_{i,a,t} = \\text{cost}_a(c_{i,t},\\, \\Delta c_{i,t})',
    variables: [
      { symbol: 'CB_{i,a,t}', name: 'Beban kontekstual aksi rekomendasi a', domain: '[0, 1]', source: 'Model Cost' },
      { symbol: 'a', name: 'Pilihan modalitas pembelajaran (Video HD, Audio, Teks, Reschedule)', domain: '\\mathcal{A}', source: 'Action Space' },
      { symbol: 'c_{i,t}', name: 'Status konteks saat ini', domain: '[0, 1]^6', source: 'Persamaan (2)' },
      { symbol: '\\Delta c_{i,t}', name: 'Pergeseran beban kerja/waktu', domain: '\\mathbb{R}^6', source: 'Estimasi Perubahan' }
    ],
    derivation: 'Aksi berupa video streaming 1080p pada peserta di daerah 3T dengan sisa kuota menipis memiliki CB mendekati 1.0, sedangkan teks ringkas PDF memiliki CB mendekati 0.05.',
    analogy: 'Seperti beban kuota & waktu dinas saat menjalankan rekomendasi materi — jika sistem merekomendasikan video webinar 2 jam (CB tinggi) kepada ASN yang kuotanya menipis dan sedang piket malam, rekomendasi tersebut sangat membebani peserta.',
    policyImpact: 'Sistem tidak merekomendasikan webinar video berat kepada ASN yang sedang tugas dinas lapangan di pedalaman.'
  },
  eq8a: {
    id: 'eq8a',
    blockTag: 'BLOK 3',
    equationNum: 'Persamaan (8a)',
    title: 'Kesenjangan Beban Rekomendasi (Gap_{beban})',
    subtitle: 'Selisih maksimum beban rekomendasi antara kelompok wilayah paling beruntung dan paling terbebani',
    formula: '\\text{Gap}_{\\text{beban}} = \\max_{g,h \\in G} \\left\\| \\mathbb{E}[CB_{i,a,t} \\mid g] - \\mathbb{E}[CB_{i,a,t} \\mid h] \\right\\|',
    variables: [
      { symbol: '\\text{Gap}_{\\text{beban}}', name: 'Kesenjangan beban rekomendasi antar grup', domain: '[0, 1]', source: 'Audit Algoritma' },
      { symbol: 'g, h', name: 'Dua klaster wilayah yang dibandingkan', domain: 'g, h \\in G', source: 'Regional Cluster' },
      { symbol: 'CB', name: 'Beban kontekstual modalitas', domain: '[0, 1]', source: 'Persamaan (8)' }
    ],
    derivation: 'Audit berkala untuk memastikan rekomendasi modalitas materi tidak menciptakan beban biaya kuota berlebih di satu provinsi dibanding provinsi lain.',
    analogy: 'Menjamin kurikulum pelatihan tidak mewajibkan penugasan video streaming berkuota mahal yang hanya sanggup dijalankan ASN di kota besar.',
    policyImpact: 'Menjamin keadilan perlakuan bagi seluruh ASN di 38 provinsi di Indonesia.'
  },
  eq8b: {
    id: 'eq8b',
    blockTag: 'BLOK 3',
    equationNum: 'Persamaan (8b)',
    title: 'Kesenjangan Kesalahan Interpretasi (Gap_{interpretasi})',
    subtitle: 'Selisih galat pembacaan residual (MAE) antar kelompok wilayah',
    formula: '\\text{Gap}_{\\text{interpretasi}} = \\max_{g,h \\in G} \\left\\| \\text{MAE}_{g,t}(d) - \\text{MAE}_{h,t}(d) \\right\\|',
    variables: [
      { symbol: '\\text{Gap}_{\\text{interpretasi}}', name: 'Kesenjangan galat pembacaan residual model', domain: '[0, 1]', source: 'Model Audit' },
      { symbol: '\\text{MAE}_g(d)', name: 'Mean Absolute Error residual pada grup g', domain: '\\mathbb{R}^+', source: 'Validasi Model' }
    ],
    derivation: 'Menjamin akurasi estimasi baseline CCBN memiliki tingkat keandalan yang seragam di seluruh klaster geografis.',
    analogy: 'Menjamin akurasi penilaian sistem LMS sama adilnya dan sama presisinya saat mengevaluasi ASN di pulau terpencil maupun di kantor kementerian ibukota.',
    policyImpact: 'Menghindari bias algoritma AI yang hanya akurat membaca perilaku ASN di pulau Jawa.'
  },
  eq9: {
    id: 'eq9',
    blockTag: 'BLOK 4',
    equationNum: 'Persamaan (9)',
    title: 'Fungsi Reward Terkalibrasi Multi-Objektif (r\'_{i,a,t+1})',
    subtitle: 'Formulasi pengambil keputusan Fair-LinUCB multi-kendala yang menyeimbangkan manfaat, beban, dan disparitas',
    formula: 'r\'_{i,a,t+1} = r_{i,a,t} + \\underbrace{\\eta_t U(a,\\, d_{i,t})}_{\\text{manfaat individual}} - \\underbrace{\\mu_t CB_{i,a,t}}_{\\text{beban peserta}} - \\underbrace{\\nu_t OB_{i,a,t}}_{\\text{beban operasional}} - \\underbrace{\\rho_t \\Delta c_{i,t}}_{\\text{perubahan konteks}} - \\underbrace{\\gamma_t D_t}_{\\text{penalti disparitas}}',
    variables: [
      { symbol: 'r\'', name: 'Reward terkalibrasi final untuk memilih aksi a', domain: '\\mathbb{R}', source: 'Bandit Engine' },
      { symbol: 'U(a, d)', name: 'Utilitas kecocokan aksi a terhadap residual d', domain: '[0, 1]', source: 'Payoff Function' },
      { symbol: 'CB', name: 'Penalti beban kontekstual bagi peserta', domain: '[0, 1]', source: 'Persamaan (8)' },
      { symbol: 'OB', name: 'Beban operasional server / instruktur', domain: '[0, 1]', source: 'LMS Telemetri' },
      { symbol: 'D_t', name: 'Penalti disparitas keadilan regional', domain: '[0, 1]', source: 'Persamaan (7)' }
    ],
    derivation: 'Algoritma memilih aksi a* = \\arg\\max_a r\'_{i,a,t+1}. Pembobotan dinamis (\\eta, \\mu, \\nu, \\rho, \\gamma) dioptimalkan secara daring via Fair-LinUCB dengan batasan keadilan Pareto.',
    analogy: 'Seperti Widyaiswara bijak yang memilihkan metode belajar terbaik — bukan hanya materi yang bermutu tinggi (manfaat U), tapi juga memperhatikan kemampuan kuota peserta (beban CB), kapasitas server pelatihan (OB), dan tidak memperlebar jurang antar daerah (penalti D).',
    policyImpact: 'Mekanisme komputasional yang menjamin rekomendasi LMS ASN selalu relevan, hemat kuota, dan berkeadilan sosial.'
  },
  eq10: {
    id: 'eq10',
    blockTag: 'BLOK 5',
    equationNum: 'Persamaan (10)',
    title: 'Bobot Fusi Gated Sigmoid (w)',
    subtitle: 'Mekanisme gatekeeper sinyal visual berdasarkan indeks spasial dan kualitas kamera',
    formula: 'w(S_{i,t},\\, q_{i,t}^{\\text{visual}}) = \\sigma\\left( \\alpha_1 (1 - S_{i,t}) + \\alpha_2 \\cdot q_{i,t}^{\\text{visual}} \\right)',
    variables: [
      { symbol: 'w', name: 'Bobot fusi multimodal visual vs LMS', domain: '[0, 1]', source: 'Sigmoid Gating' },
      { symbol: '\\sigma(z)', name: 'Fungsi sigmoid standar \\frac{1}{1 + e^{-z}}', domain: '[0, 1]', source: 'Fungsi Aktivasi' },
      { symbol: 'S_{i,t}', name: 'Indeks spasial komposit peserta', domain: '[0, 1]', source: 'Persamaan (2c)' },
      { symbol: 'q^{\\text{visual}}', name: 'Kualitas frame kamera / bitrate video', domain: '[0, 1]', source: 'WebRTC Telemetri' }
    ],
    derivation: 'Jika kondisi spasial buruk atau kualitas video rendah, w mendekati 0 sehingga sistem secara otomatis mengabaikan analisis ekspresi wajah kamera.',
    analogy: 'Seperti toleransi mematikan kamera saat webinar Zoom pelatihan ASN — saat sinyal peserta di daerah melemah, sistem secara otomatis mengabaikan kamera (w mendekati 0) agar koneksi suara dan materi tetap berjalan lancar tanpa mengurangi penilaian keaktifan.',
    policyImpact: 'Melindungi privasi dan keadilan ASN di daerah terpencil yang tidak mampu streaming webcam HD terus-menerus.'
  },
  eq10a: {
    id: 'eq10a',
    blockTag: 'BLOK 5',
    equationNum: 'Persamaan (10a)',
    title: 'Evidensi Fusi Multimodal (F_{i,t})',
    subtitle: 'Integrasi linear adaptif antara sinyal visual dan jejak telemetri LMS',
    formula: 'F_{i,t} = w_{i,t} \\cdot V_{i,t} + (1 - w_{i,t}) \\cdot b_{i,t}^{\\text{LMS}}',
    variables: [
      { symbol: 'F_{i,t}', name: 'Vektor evidensi multimodal terintegrasi final', domain: '\\mathbb{R}^d', source: 'Fusion Module' },
      { symbol: 'V_{i,t}', name: 'Fitur visual (atensi wajah / tatapan webcam)', domain: '\\mathbb{R}^d', source: 'Computer Vision' },
      { symbol: 'b^{\\text{LMS}}', name: 'Baseline telemetri LMS terbukti', domain: '\\mathbb{R}^d', source: 'LMS Engine' }
    ],
    derivation: 'Mekanisme ini mencegah catastrophic failure jika sinyal kamera macet atau mati mendadak di tengah sesi synchronous.',
    analogy: 'Penilaian kelulusan pelatihan daring yang sah dan kokoh — jika kamera video peserta mati, sistem secara otomatis 100% beralih ke bukti pengerjaan modul dan kuis di LMS.',
    policyImpact: 'Memastikan proses asesmen kelulusan pelatihan tetap sah meskipun terjadi gangguan video meeting.'
  },
  eq18a: {
    id: 'eq18a',
    blockTag: 'BLOK 7',
    equationNum: 'Persamaan (18a)',
    title: 'Safeguard Triase: Status VALID',
    subtitle: 'Kondisi operasional normal di mana observabilitas data dan infrastruktur terpenuhi penuh',
    formula: '\\text{Status} = \\mathbf{VALID} \\iff S_{i,t} \\ge \\theta_S \\;\\land\\; q_{i,t} \\ge \\theta_q',
    variables: [
      { symbol: 'S_{i,t}', name: 'Indeks spasial sesi t', domain: '[0, 1]', source: 'Persamaan (2c)' },
      { symbol: 'q_{i,t}', name: 'Kualitas evidensi data', domain: '[0, 1]', source: 'Persamaan (4)' },
      { symbol: '\\theta_S', name: 'Ambang batas spasial validitas baku (default 0.60)', domain: '[0, 1]', source: 'Threshold Kalibrasi' },
      { symbol: '\\theta_q', name: 'Ambang batas kualitas evidensi baku (default 0.70)', domain: '[0, 1]', source: 'Threshold Kalibrasi' }
    ],
    derivation: 'Ketika kedua kondisi terpenuhi, model CCBN memiliki keyakinan statistik tinggi untuk memberikan rekomendasi modalitas adaptif otomatis penuh.',
    analogy: 'Kondisi pembelajaran normal dan lancar — koneksi internet stabil dan data aktivitas lengkap, sehingga sistem AI diizinkan memberikan rekomendasi modul video interaktif dan materi pengayaan secara otomatis.',
    policyImpact: 'Efisiensi automasi pelatihan ASN pada wilayah dengan infrastruktur mapan.'
  },
  eq18b: {
    id: 'eq18b',
    blockTag: 'BLOK 7',
    equationNum: 'Persamaan (18b)',
    title: 'Safeguard Triase: Status BOUNDARY',
    subtitle: 'Zona transisi moderat akibat koneksi tidak stabil atau missingness parsial',
    formula: '\\text{Status} = \\mathbf{BOUNDARY} \\iff \\theta_S\' \\le S_{i,t} < \\theta_S \\;\\lor\\; \\theta_q\' \\le q_{i,t} < \\theta_q',
    variables: [
      { symbol: '\\theta_S\'', name: 'Ambang batas batas bawah spasial (default 0.30)', domain: '[0, 1]', source: 'Threshold Kalibrasi' },
      { symbol: '\\theta_q\'', name: 'Ambang batas batas bawah kualitas (default 0.40)', domain: '[0, 1]', source: 'Threshold Kalibrasi' }
    ],
    derivation: 'Sistem membatasi ruang aksi rekomendasi (restricted action space) hanya pada intervensi berisiko rendah seperti teks ringkas, modul offline download, atau perpanjangan batas submit tugas.',
    analogy: 'Kondisi koneksi pas-pasan / tidak stabil — sistem AI secara otomatis membatasi diri hanya menyarankan modul teks PDF ringkas, materi audio mikro, atau perpanjangan batas submit tugas agar tidak membebani kuota peserta.',
    policyImpact: 'Mencegah sistem membebani kuota peserta yang sedang mengalami koneksi fluktuatif.'
  },
  eq18c: {
    id: 'eq18c',
    blockTag: 'BLOK 7',
    equationNum: 'Persamaan (18c)',
    title: 'Safeguard Triase: Status INVALID (Human-in-the-Loop)',
    subtitle: 'Mekanisme pemutus darurat saat data telemetri terputus parah',
    formula: '\\text{Status} = \\mathbf{INVALID} \\iff S_{i,t} < \\theta_S\' \\;\\lor\\; q_{i,t} < \\theta_q\'',
    variables: [
      { symbol: 'S_{i,t}', name: 'Indeks spasial berada di bawah batas minimum', domain: '< 0.30', source: 'Persamaan (2c)' },
      { symbol: 'q_{i,t}', name: 'Kualitas evidensi berada di bawah batas minimum', domain: '< 0.40', source: 'Persamaan (4)' }
    ],
    derivation: 'Otomatisasi algoritma AI langsung DIHENTIKAN TOTAL (hard-stop) dan kasus dialihkan langsung ke dashboard Widyaiswara / fasilitator manusia.',
    analogy: 'Kondisi darurat gangguan sinyal total / BTS mati — rekomendasi otomatis AI dihentikan total (hard-stop) dan penanganan dialihkan langsung ke Widyaiswara / Penyelenggara LAN RI untuk penjadwalan ujian susulan tanpa sanksi nilai.',
    policyImpact: 'Kepatuhan etika AI tingkat tertinggi — tidak ada ASN yang dirugikan status kelulusannya akibat kegagalan sistemik algoritma komputer.'
  }
};

// Selected modal formula state
const selectedFormula = ref<FormulaDetail | null>(null);
const modalLatexCopied = ref(false);

function openFormulaModal(eqId: string) {
  if (formulaDatabase[eqId]) {
    selectedFormula.value = formulaDatabase[eqId];
    modalLatexCopied.value = false;
  }
}

function openMetricModal(metric: any) {
  selectedFormula.value = {
    id: 'metric_' + metric.no,
    blockTag: 'BLOK 6',
    equationNum: `Metrik (${metric.no})`,
    title: metric.name,
    subtitle: metric.alias,
    formula: metric.formula,
    variables: [
      { symbol: '\\Delta', name: 'Besaran kesenjangan disparitas keadilan', domain: '[0, 1]', source: 'Audit Spasial' },
      { symbol: 'g, h \\in G', name: 'Pasangan klaster wilayah yang diaudit', domain: 'Himpunan Wilayah', source: 'BPS Region' }
    ],
    derivation: `Metrik ini mengukur ${metric.measured} untuk memastikan tidak terjadi asimetri perlakuan antar daerah.`,
    analogy: 'Seperti inspeksi berkala badan pengawas mutu untuk memastikan standar keadilan pelayanan publik.',
    policyImpact: metric.goal
  };
  modalLatexCopied.value = false;
}

function closeFormulaModal() {
  selectedFormula.value = null;
}

async function copyModalLatex() {
  if (selectedFormula.value) {
    try {
      await navigator.clipboard.writeText(selectedFormula.value.formula);
      modalLatexCopied.value = true;
      setTimeout(() => {
        modalLatexCopied.value = false;
      }, 2000);
    } catch (e) {
      console.error(e);
    }
  }
}

// 7 Fairness Metrics Data
const fairnessMetrics = [
  {
    no: '11',
    name: 'Spatial Performance Gap',
    alias: 'Kesenjangan Performa Spasial',
    formula: '\\Delta_{\\text{perf},t} = \\max_{g,h \\in G} \\left| \\bar{d}_{g,t} - \\bar{d}_{h,t} \\right|',
    measured: 'Selisih galat residual rata-rata antar-klaster wilayah kerja',
    goal: 'Memastikan residual tidak timpang memvonis wilayah tertentu'
  },
  {
    no: '12',
    name: 'Low Engagement Keliru Gap',
    alias: 'Kesalahan Label Low-Engagement',
    formula: '\\Delta_{\\text{LE},t} = \\max_{g,h} \\left| P(\\hat{y}=0 \\mid y=1, g) - P(\\hat{y}=0 \\mid y=1, h) \\right|',
    measured: 'Tingkat peserta yang sebenarnya lulus/selesai namun salah divonis "tidak aktif"',
    goal: 'Mencegah vonis keliru akibat sinyal terputus'
  },
  {
    no: '13a–c',
    name: 'FPR / FNR Parity Gap',
    alias: 'Kesenjangan Galat Tipe I & II',
    formula: '\\Delta_{\\text{FPR},t} = \\max_{g,h} |\\text{FPR}_g - \\text{FPR}_h|; \\; \\Delta_{\\text{FNR},t} = \\max_{g,h} |\\text{FNR}_g - \\text{FNR}_h|',
    measured: 'Konsentrasi False Positive dan False Negative pada kelompok spasial',
    goal: 'Keseimbangan keadilan distributif antar-provinsi'
  },
  {
    no: '14',
    name: 'Calibration Error Gap',
    alias: 'Kesenjangan Kalibrasi Model',
    formula: '\\Delta_{\\text{cal},t} = \\max_{g,h} \\left| \\text{ECE}_g - \\text{ECE}_h \\right|',
    measured: 'Apakah estimasi probabilitas risiko terlalu optimis/pesimis di wilayah tertentu',
    goal: 'Tingkat keyakinan model seragam di semua daerah'
  },
  {
    no: '15',
    name: 'Missingness Bias Gap',
    alias: 'Bias Akibat Data Hilang',
    formula: '\\Delta_{\\text{miss},t} = \\text{Corr}\\left( m_{i,t},\\, |d_{i,t}| \\right)',
    measured: 'Seberapa kuat hilangnya data telemetri mendistorsi pembacaan residual',
    goal: 'Menghindari penalti pada peserta saat koneksi hilang'
  },
  {
    no: '16–16a',
    name: 'Visual Observability Fairness',
    alias: 'Keadilan Observabilitas Visual',
    formula: '\\Delta_{\\text{vis},t} = \\max_{g,h} \\left| \\bar{q}_{g}^{\\text{vis}} - \\bar{q}_{h}^{\\text{vis}} \\right|',
    measured: 'Perbedaan mutu sinyal video sinkronus antar-wilayah',
    goal: 'Mencegah diskriminasi kamera mati saat sinkronus'
  },
  {
    no: '17',
    name: 'Human Override Rate Gap',
    alias: 'Tingkat Koreksi Manusia',
    formula: '\\Delta_{\\text{override},t} = \\max_{g,h} \\left| \\text{Rate}_{\\text{override}}(g) - \\text{Rate}_{\\text{override}}(h) \\right|',
    measured: 'Frekuensi Widyaiswara membatalkan rekomendasi AI di daerah tertentu',
    goal: 'Indikator audit lapangan atas kegagalan model AI'
  }
];
</script>

<style scoped>
.header-hero {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  color: #FFFFFF;
  border-radius: var(--radius-lg, 12px);
  padding: 2.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #334155;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(96, 165, 250, 0.3);
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #93C5FD;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3B82F6;
  box-shadow: 0 0 8px #60A5FA;
}

.hero-title {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #FFFFFF;
  margin: 0 0 0.75rem 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.05rem;
  line-height: 1.6;
  color: #CBD5E1;
  max-width: 860px;
  margin-bottom: 2rem;
}

.hero-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.hero-stat-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-num {
  font-size: 1.75rem;
  font-weight: 800;
  color: #60A5FA;
  font-family: 'JetBrains Mono', monospace;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* Hint Banner */
.hint-banner {
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  color: #1E40AF;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hint-icon {
  font-size: 1.1rem;
}

/* Block Navigation Bar */
.block-nav-bar {
  position: sticky;
  top: 1rem;
  z-index: 30;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border: 1px solid #CBD5E1;
  border-radius: var(--radius-md, 8px);
  padding: 0.6rem 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.07);
}

.block-nav-scroll {
  display: flex;
  gap: 0.4rem;
  overflow-x: auto;
  padding-bottom: 2px;
}

.block-nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  border: 1px solid transparent;
  background: #F1F5F9;
  color: #475569;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.block-nav-btn:hover {
  background: #E2E8F0;
  color: #0F172A;
}

.block-nav-btn.active {
  background: #2563EB;
  color: #FFFFFF;
  border-color: #1D4ED8;
}

.block-nav-actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.survey-link-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  background: #F8FAFC;
  color: #0F172A;
  border: 1px solid #CBD5E1;
  text-decoration: none;
  transition: all 0.15s ease;
}

.survey-link-pill:hover {
  background: #0F172A;
  color: #FFFFFF;
}

.sandbox-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  border: 1px solid #3B82F6;
  background: #EFF6FF;
  color: #1D4ED8;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.sandbox-toggle-btn.active, .sandbox-toggle-btn:hover {
  background: #2563EB;
  color: #FFFFFF;
}

/* ========================================== */
/* PERSONA REAL CASE STUDY SECTION            */
/* ========================================== */
.persona-section {
  padding: 2rem;
  border-radius: 12px;
  background: #FFFFFF;
  border: 1px solid #CBD5E1;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
}

.persona-badge {
  background: #DBEAFE;
  color: #1E40AF;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.25rem 0.65rem;
  border-radius: 4px;
}

.persona-main-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0;
}

.persona-main-desc {
  font-size: 0.875rem;
  color: #64748B;
  margin: 0.5rem 0 1.5rem 0;
  line-height: 1.5;
}

.persona-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  gap: 1.25rem;
}

.persona-card {
  border-radius: 10px;
  border: 1px solid #CBD5E1;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  background: #FAFCFF;
  transition: all 0.2s ease;
}

.persona-card.morotai { border-top: 4px solid #D97706; }
.persona-card.jakarta { border-top: 4px solid #2563EB; }
.persona-card.sorong { border-top: 4px solid #DC2626; }

.persona-card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #E2E8F0;
}

.persona-avatar {
  font-size: 1.75rem;
}

.persona-name {
  font-size: 0.95rem;
  font-weight: 800;
  color: #0F172A;
}

.persona-tag {
  font-size: 0.75rem;
  color: #64748B;
}

.persona-survey-facts {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.85rem;
  font-size: 0.775rem;
}

.persona-survey-facts ul {
  margin: 0.35rem 0 0 1.1rem;
  padding: 0;
  line-height: 1.4;
  color: #334155;
}

.persona-math-breakdown {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.persona-stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.775rem;
  padding: 0.3rem 0.5rem;
  background: #FFFFFF;
  border: 1px solid #F1F5F9;
  border-radius: 4px;
}

.persona-stat-row.highlight {
  background: #F0FDF4;
  border-color: #86EFAC;
}

.persona-safeguard-badge {
  margin-top: auto;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.775rem;
  line-height: 1.4;
}

.persona-safeguard-badge.status-boundary {
  background: #FEF3C7;
  color: #92400E;
  border: 1px solid #FCD34D;
}

.persona-safeguard-badge.status-valid {
  background: #DCFCE7;
  color: #166534;
  border: 1px solid #86EFAC;
}

.persona-safeguard-badge.status-invalid {
  background: #FEE2E2;
  color: #991B1B;
  border: 1px solid #FCA5A5;
}

/* Empirical Grounding Box in Formula Cards */
.emp-grounding-badge {
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 6px;
  padding: 0.6rem 0.85rem;
  margin: 0.75rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #166534;
}

.emp-grounding-tag {
  font-weight: 800;
  font-size: 0.7rem;
  color: #15803D;
  letter-spacing: 0.03em;
}

.emp-link-btn {
  font-weight: 700;
  font-size: 0.75rem;
  color: #15803D;
  text-decoration: underline;
  cursor: pointer;
  white-space: nowrap;
}

.emp-link-btn:hover {
  color: #047857;
}

/* Sandbox Calculator Card */
.sandbox-card {
  background: #FFFFFF;
  border: 2px solid #3B82F6;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.15);
}

.sandbox-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sandbox-badge {
  background: #DBEAFE;
  color: #1E40AF;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

.btn-close-sandbox {
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #94A3B8;
  padding: 0.2rem 0.5rem;
}

.btn-close-sandbox:hover {
  color: #0F172A;
}

.sandbox-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1.2fr;
  gap: 1.5rem;
}

.sandbox-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sandbox-col-title {
  font-size: 0.85rem;
  font-weight: 800;
  color: #334155;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #E2E8F0;
  margin: 0;
}

.calc-control {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.calc-label-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #1E293B;
  font-weight: 600;
}

.calc-val {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  color: #2563EB;
}

.calc-range {
  width: 100%;
  accent-color: #2563EB;
  cursor: pointer;
}

.result-col {
  background: #F8FAFC;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
}

.sim-output-box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sim-metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.825rem;
  padding: 0.4rem 0.6rem;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
}

.sim-metric.highlight {
  background: #F0FDF4;
  border-color: #86EFAC;
}

.font-mono {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
}

.text-emerald { color: #16A34A; }
.text-rose { color: #E11D48; }
.text-blue { color: #2563EB; }
.text-amber { color: #D97706; }

.safeguard-result {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid transparent;
}

.safeguard-result.status-valid {
  background: #DCFCE7;
  border-color: #86EFAC;
  color: #166534;
}

.safeguard-result.status-boundary {
  background: #FEF3C7;
  border-color: #FCD34D;
  color: #92400E;
}

.safeguard-result.status-invalid {
  background: #FEE2E2;
  border-color: #FCA5A5;
  color: #991B1B;
}

.safeguard-tag {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  opacity: 0.85;
}

.safeguard-title {
  font-size: 0.95rem;
  font-weight: 800;
  margin: 0.2rem 0;
}

.safeguard-desc {
  font-size: 0.775rem;
  line-height: 1.4;
  margin: 0;
}

/* Blocks styling */
.blocks-container {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.block-section {
  padding: 2rem;
  border-radius: 12px;
  background: #FFFFFF;
  border: 1px solid var(--color-stroke-secondary, #E2E8F0);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.block-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.block-number-badge {
  background: #2563EB;
  color: #FFFFFF;
  font-size: 0.85rem;
  font-weight: 800;
  padding: 0.4rem 0.85rem;
  border-radius: 6px;
  letter-spacing: 0.05em;
}

.block-number-badge.accent-purple { background: #7C3AED; }
.block-number-badge.accent-amber { background: #D97706; }
.block-number-badge.accent-emerald { background: #059669; }
.block-number-badge.accent-rose { background: #E11D48; }
.block-number-badge.accent-indigo { background: #4F46E5; }
.block-number-badge.accent-red { background: #DC2626; }

.block-header-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.block-title {
  font-size: 1.45rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0;
}

.block-range-pill {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748B;
  background: #F1F5F9;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  border: 1px solid #E2E8F0;
}

.block-function-banner {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  color: #1E40AF;
  padding: 0.9rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.75rem;
}

.block-function-banner.bg-purple { background: #F5F3FF; border-color: #DDD6FE; color: #5B21B6; }
.block-function-banner.bg-amber { background: #FFFBEB; border-color: #FDE68A; color: #92400E; }
.block-function-banner.bg-emerald { background: #ECFDF5; border-color: #A7F3D0; color: #065F46; }
.block-function-banner.bg-rose { background: #FFF1F2; border-color: #FECDD3; color: #9F1239; }
.block-function-banner.bg-indigo { background: #EEF2FF; border-color: #C7D2FE; color: #3730A3; }
.block-function-banner.bg-red { background: #FEF2F2; border-color: #FECACA; color: #991B1B; }

/* Equation Card with Clickable State */
.equation-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
  position: relative;
}

.equation-card.clickable, .sub-eq-card.clickable, .safeguard-zone-card.clickable {
  cursor: pointer;
}

.equation-card.clickable:hover {
  border-color: #3B82F6;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.08);
  transform: translateY(-2px);
}

.btn-inspect-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #2563EB;
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.equation-card:hover .btn-inspect-pill {
  background: #2563EB;
  color: #FFFFFF;
  border-color: #2563EB;
}

.equation-card.highlight-card {
  border: 2px solid #3B82F6;
  background: #FAFCFF;
}

.eq-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.eq-badge {
  font-size: 0.75rem;
  font-weight: 800;
  background: #1E293B;
  color: #FFFFFF;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  letter-spacing: 0.03em;
}

.eq-name {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0;
}

.eq-breakdown-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1.25rem;
  margin-top: 1rem;
}

.sub-heading {
  font-size: 0.85rem;
  font-weight: 800;
  color: #334155;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0 0 0.4rem 0;
}

.eq-explanation p, .eq-analogy p {
  font-size: 0.875rem;
  line-height: 1.6;
  color: #334155;
  margin: 0;
}

.eq-analogy {
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  padding: 1rem;
  border-radius: 8px;
  color: #78350F;
}

.eq-analogy p {
  color: #78350F;
}

.dimensions-pill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.dim-pill {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  padding: 0.6rem 0.85rem;
  border-radius: 6px;
  font-size: 0.825rem;
}

.dim-code {
  background: #2563EB;
  color: #FFFFFF;
  font-weight: 800;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  flex-shrink: 0;
}

/* Sub Equations Group */
.sub-equations-group {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.group-title {
  font-size: 0.95rem;
  font-weight: 800;
  color: #1E293B;
  margin: 0 0 1rem 0;
}

.sub-eq-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.sub-eq-card {
  background: #FFFFFF;
  border: 1px solid #CBD5E1;
  border-radius: 6px;
  padding: 1rem;
  transition: all 0.2s ease;
}

.sub-eq-card.clickable:hover {
  border-color: #2563EB;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.06);
}

.sub-eq-card.wide {
  grid-column: 1 / -1;
}

.sub-eq-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
}

.sub-eq-badge {
  font-size: 0.7rem;
  font-weight: 700;
  background: #E2E8F0;
  color: #334155;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.sub-eq-desc {
  font-size: 0.8rem;
  color: #475569;
  line-height: 1.5;
  margin: 0.5rem 0 0 0;
}

.sub-eq-footer-note {
  font-size: 0.85rem;
  color: #1E293B;
  line-height: 1.5;
  background: #EFF6FF;
  border-left: 3px solid #3B82F6;
  padding: 0.6rem 0.85rem;
  border-radius: 0 4px 4px 0;
  margin-top: 0.75rem;
}

.grid-2-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.grid-3-col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.callout-important {
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #991B1B;
  font-size: 0.8rem;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  margin-top: 0.75rem;
  line-height: 1.4;
}

/* Residual Interpretation Cards */
.residual-interpretation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.residual-card {
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.residual-card.positive {
  background: #ECFDF5;
  border-color: #A7F3D0;
}

.residual-card.neutral {
  background: #F8FAFC;
  border-color: #E2E8F0;
}

.residual-card.negative {
  background: #FFF1F2;
  border-color: #FECDD3;
}

.res-badge {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.05em;
}

.residual-card.positive .res-badge { color: #059669; }
.residual-card.neutral .res-badge { color: #475569; }
.residual-card.negative .res-badge { color: #E11D48; }

.res-formula {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  font-weight: 800;
}

.res-desc {
  font-size: 0.8rem;
  color: #334155;
  line-height: 1.4;
}

.analogy-box {
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  color: #166534;
  padding: 0.85rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  line-height: 1.5;
}

/* Terms Breakdown in Block 4 */
.terms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.term-box {
  padding: 0.85rem;
  border-radius: 8px;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.term-box.benefit { background: #ECFDF5; border-color: #A7F3D0; }
.term-box.penalty { background: #FEF2F2; border-color: #FECACA; }
.term-box.fairness { background: #EEF2FF; border-color: #C7D2FE; }

.term-math {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.95rem;
  font-weight: 800;
}

.term-box.benefit .term-math { color: #059669; }
.term-box.penalty .term-math { color: #DC2626; }
.term-box.fairness .term-math { color: #4F46E5; }

.term-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: #0F172A;
}

.term-box p {
  font-size: 0.75rem;
  color: #475569;
  line-height: 1.4;
  margin: 0;
}

/* Fairness Table in Block 6 */
.table-responsive {
  overflow-x: auto;
  border: 1px solid #CBD5E1;
  border-radius: 8px;
}

.fairness-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.fairness-table th {
  background: #F8FAFC;
  color: #334155;
  font-weight: 700;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #CBD5E1;
  text-align: left;
}

.fairness-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #E2E8F0;
  vertical-align: middle;
}

.clickable-row {
  cursor: pointer;
  transition: all 0.15s ease;
}

.clickable-row:hover {
  background: #EFF6FF !important;
}

.metric-name-id {
  font-weight: 700;
  color: #0F172A;
}

.metric-name-en {
  font-size: 0.75rem;
  color: #64748B;
}

.audit-goal-tag {
  display: inline-block;
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  color: #1D4ED8;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

/* Safeguard Triase in Block 7 */
.safeguard-zones-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
}

.safeguard-zone-card {
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.safeguard-zone-card.clickable:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.safeguard-zone-card.valid {
  background: #F0FDF4;
  border-color: #86EFAC;
}

.safeguard-zone-card.boundary {
  background: #FFFBEB;
  border-color: #FCD34D;
}

.safeguard-zone-card.invalid {
  background: #FEF2F2;
  border-color: #FCA5A5;
}

.zone-badge {
  display: inline-block;
  align-self: flex-start;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  letter-spacing: 0.04em;
  margin-bottom: 0.5rem;
}

.safeguard-zone-card.valid .zone-badge { background: #16A34A; color: #FFFFFF; }
.safeguard-zone-card.boundary .zone-badge { background: #D97706; color: #FFFFFF; }
.safeguard-zone-card.invalid .zone-badge { background: #DC2626; color: #FFFFFF; }

.zone-equation-num {
  font-size: 0.8rem;
  font-weight: 700;
  color: #64748B;
  margin-bottom: 0.5rem;
}

.zone-content h4 {
  font-size: 1rem;
  font-weight: 800;
  margin: 0.75rem 0 0.35rem 0;
}

.safeguard-zone-card.valid .zone-content h4 { color: #166534; }
.safeguard-zone-card.boundary .zone-content h4 { color: #92400E; }
.safeguard-zone-card.invalid .zone-content h4 { color: #991B1B; }

.zone-content p {
  font-size: 0.825rem;
  line-height: 1.5;
  color: #334155;
  margin: 0 0 1rem 0;
}

.zone-action-box {
  font-size: 0.8rem;
  line-height: 1.5;
  padding: 0.75rem;
  border-radius: 6px;
}

.safeguard-zone-card.valid .zone-action-box {
  background: #DCFCE7;
  color: #14532D;
}

.safeguard-zone-card.boundary .zone-action-box {
  background: #FEF3C7;
  color: #78350F;
}

.safeguard-zone-card.invalid .zone-action-box {
  background: #FEE2E2;
  color: #7F1D1D;
}

/* Footer links card */
.footer-links-card {
  padding: 1.5rem 2rem;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  margin-top: 1.5rem;
}

.footer-links-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

/* ========================================== */
/* MODAL INSPECTOR STYLES                     */
/* ========================================== */
.formula-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(6px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.formula-modal-card {
  background: #FFFFFF;
  width: 100%;
  max-width: 960px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
  border: 1px solid #CBD5E1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  animation: modalScaleUp 0.25s ease-out;
}

@keyframes modalScaleUp {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.modal-badge {
  background: #2563EB;
  color: #FFFFFF;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

.modal-eq-num {
  font-size: 0.85rem;
  font-weight: 700;
  color: #64748B;
}

.modal-close-btn {
  background: #F1F5F9;
  border: none;
  font-size: 1.25rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #475569;
  transition: all 0.15s ease;
}

.modal-close-btn:hover {
  background: #E2E8F0;
  color: #0F172A;
}

.modal-formula-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 0.25rem 0;
}

.modal-formula-subtitle {
  font-size: 0.9rem;
  color: #64748B;
  margin: 0 0 1.25rem 0;
}

.modal-math-hero {
  background: linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%);
  border: 2px solid #BFDBFE;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.modal-sections-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.modal-detail-col {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.modal-col-heading {
  font-size: 0.95rem;
  font-weight: 800;
  color: #1E293B;
  margin: 0;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #E2E8F0;
}

.var-table-wrapper {
  overflow-x: auto;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
}

.var-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

.var-table th {
  background: #F8FAFC;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #E2E8F0;
  text-align: left;
  font-weight: 700;
  color: #475569;
}

.var-table td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #F1F5F9;
  vertical-align: middle;
}

.data-src-pill {
  background: #F1F5F9;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #475569;
}

.modal-block-text p {
  font-size: 0.85rem;
  line-height: 1.6;
  color: #334155;
  margin: 0;
}

.analogy-modal-box {
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  padding: 1rem;
  border-radius: 8px;
}

.analogy-modal-title {
  font-size: 0.8rem;
  font-weight: 800;
  color: #92400E;
  margin-bottom: 0.35rem;
  text-transform: uppercase;
}

.analogy-modal-box p {
  font-size: 0.825rem;
  line-height: 1.5;
  color: #78350F;
  margin: 0;
}

.policy-modal-box {
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  padding: 1rem;
  border-radius: 8px;
}

.policy-modal-title {
  font-size: 0.8rem;
  font-weight: 800;
  color: #166534;
  margin-bottom: 0.35rem;
  text-transform: uppercase;
}

.policy-modal-box p {
  font-size: 0.825rem;
  line-height: 1.5;
  color: #14532D;
  margin: 0;
}

.latex-modal-box {
  background: #0F172A;
  border-radius: 8px;
  padding: 0.85rem 1rem;
}

.btn-copy-modal-latex {
  background: #334155;
  color: #93C5FD;
  border: 1px solid #475569;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-copy-modal-latex:hover {
  background: #2563EB;
  color: #FFFFFF;
}

.latex-code-preview {
  margin: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: #E2E8F0;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
}

.modal-footer-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.25rem;
  border-top: 1px solid #E2E8F0;
  margin-top: auto;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 900px) {
  .sandbox-grid, .modal-sections-grid {
    grid-template-columns: 1fr;
  }
  .grid-2-col, .sub-eq-grid, .eq-breakdown-grid, .persona-cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
