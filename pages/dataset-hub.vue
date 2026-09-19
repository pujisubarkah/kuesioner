<template>
  <div class="app-container">
    <!-- Navbar Header -->
    <Navbar />

    <main id="konten-utama" class="main-content" style="max-width: 1440px; margin: 0 auto; padding: 1.5rem 1rem;">
      <div class="flex flex-col h-full bg-slate-50/60 text-slate-900 p-2 sm:p-4 rounded-2xl overflow-y-auto space-y-6">
        
        <!-- ========================================================================= -->
        <!-- HEADER UTAMA CABA-CCBN DATA & EVIDENCE HUB                                -->
        <!-- ========================================================================= -->
        <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col gap-4">
          
          <!-- Lineage & Indexing Bar -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2 text-[11px] text-slate-500 font-mono">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-bold text-slate-800">CABA–CCBN Research Prototype</span>
              <span>•</span>
              <span class="text-blue-700 font-semibold">Data & Evidence Layer</span>
              <span class="hidden md:inline">• Source of Truth: Dissertation Proposal Revision 2 (2026)</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">Data & Observability Hub</span>
              <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">Open Access Artifact</span>
            </div>
          </div>

          <!-- Title & Core Role Presentation -->
          <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pt-1">
            <div class="space-y-2">
              <div class="flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  <span>🏛️</span> Data Layer: CABA Framework
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                  <span>📐</span> Input to CCBN Baseline (Eq. 5)
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span>⚖️</span> Context 6D + Missingness Diagnostics
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  <span>🎯</span> 4 Operational Support States (S1–S4)
                </span>
              </div>

              <h1 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                CABA–CCBN Research Data & Evidence Hub
              </h1>

              <p class="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-4xl">
                Data sources, behavioral evidence, contextual variables, and observability inputs supporting the CABA–CCBN research prototype. Lapisan ini mengelola bagaimana telemetri jejak mentah ($X$), profil konteks enam dimensi ($c$), dan kualitas observabilitas ($q$) disiapkan sebelum diproses oleh model matematika CCBN pada rute <code class="text-blue-700 font-bold">/analisis</code>.
              </p>
            </div>

            <!-- ACTION BUTTONS -->
            <div class="flex items-center gap-2 self-start flex-wrap shrink-0">
              <NuxtLink
                to="/analisis"
                class="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition cursor-pointer flex items-center gap-2 shadow-sm no-underline"
              >
                <span>🧪</span>
                <span>Buka Lab Komputasi CCBN (/analisis) →</span>
              </NuxtLink>
              <button
                type="button"
                @click="fetchDatasetHubData"
                :disabled="loading"
                class="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <span :class="{ 'animate-spin': loading }">🔄</span>
                <span>Refresh Data</span>
              </button>
            </div>
          </div>

          <!-- PERSISTENT SYNTHETIC DATA POLICY & NOTICE BANNER -->
          <div class="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
            <span class="text-base shrink-0">ℹ️</span>
            <div>
              <strong>CATATAN DATA PROTOTIPE & ATRIBUSI:</strong> Seluruh metrik numerik dan log stream dalam hub ini merupakan <strong>SYNTHETIC PROTOTYPE VALUES — NOT EMPIRICAL RESULTS</strong> (Simulasi operasional terkalibrasi untuk pembuktian konsep artifak, bukan hasil survei lapangan final).
            </div>
          </div>

          <!-- RESEARCH LINEAGE (JISEBI MANUSCRIPT ➔ DISSERTATION PROPOSAL REV 2) -->
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <span class="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span>🧬</span> Garis Keturunan Riset (Research Lineage & Evolution)
              </span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                Lineage: JISEBI Baseline ➔ Dissertation Rev 2
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-2.5 text-xs mt-1">
              <div v-for="lineage in RESEARCH_LINEAGE_STAGES" :key="lineage.stage" class="p-2.5 rounded-lg bg-white border border-slate-200 flex flex-col justify-between">
                <div>
                  <strong class="text-slate-900 block text-[11px]">{{ lineage.stage }}</strong>
                  <p class="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{{ lineage.focus }}</p>
                </div>
                <span class="text-[10px] font-bold text-indigo-700 mt-1.5 pt-1 border-t border-slate-100">{{ lineage.role }}</span>
              </div>
            </div>
          </div>

          <!-- ========================================================================= -->
          <!-- CORE ARCHITECTURE: DATA FLOW & BOUNDARY VISUALIZATION                     -->
          <!-- ========================================================================= -->
          <div class="p-5 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white border border-slate-700 flex flex-col gap-4">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  🏛️ CORE ARCHITECTURE PIPELINE
                </span>
                <span class="text-xs font-bold text-slate-200">
                  Batas Pemisahan: Lapisan Data & Evidensi (/dataset-hub) ➔ Model Komputasi (/analisis)
                </span>
              </div>
              <span class="text-[11px] text-emerald-400 font-mono font-bold">
                X → B → (c, q) → b̂ → d → D → A → HITL
              </span>
            </div>

            <!-- Visual Data Boundary Flow -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
              <!-- Left: Dataset Hub Domain -->
              <div class="p-4 rounded-xl bg-slate-900/80 border border-blue-500/30 space-y-2.5">
                <div class="flex items-center justify-between border-b border-slate-700 pb-2">
                  <strong class="text-blue-300 text-xs flex items-center gap-1.5">
                    <span>📁</span> 1. DATA & EVIDENCE BOUNDARY (/dataset-hub)
                  </strong>
                  <span class="px-2 py-0.2 rounded bg-blue-900/60 text-[10px] font-mono text-blue-200">Inputs & Observability</span>
                </div>
                
                <div class="grid grid-cols-2 gap-2 text-[11px]">
                  <div class="p-2 rounded bg-slate-800/80 border border-slate-700">
                    <span class="text-slate-400 block text-[10px] font-bold">KONTEKS 6D (c_{i,t}):</span>
                    <span class="text-slate-200 font-mono">c = [T, I, O, D, W, S]</span>
                    <p class="text-[10px] text-slate-400 mt-0.5">Kuesioner + Telemetri Jaringan N_{i,t} + Klaster K_i</p>
                  </div>

                  <div class="p-2 rounded bg-slate-800/80 border border-slate-700">
                    <span class="text-slate-400 block text-[10px] font-bold">JEJAK MENTAH (X_{i,t}) → EVIDENSI (B):</span>
                    <span class="text-slate-200 font-mono">X → B_{i,t}</span>
                    <p class="text-[10px] text-slate-400 mt-0.5">LMS clickstream, durasi, checkpoint, revisits</p>
                  </div>
                </div>

                <div class="p-2 rounded bg-indigo-950/60 border border-indigo-700/40 text-[11px] flex items-center justify-between">
                  <div>
                    <span class="text-indigo-300 font-bold block text-[10px]">OBSERVABILITAS & MISSINGNESS (Eq. 3 & 4):</span>
                    <span class="text-slate-200 font-mono">m_{i,t} = 1 - (n_{obs}/n_{exp}) & q_{i,t} = 1 - m - λ·noise</span>
                  </div>
                  <span class="px-2 py-1 rounded bg-indigo-900 text-indigo-200 font-bold text-[10px]">q_{i,t} Reliability</span>
                </div>
              </div>

              <!-- Right: /analisis Analytical Domain -->
              <div class="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-2.5">
                <div class="flex items-center justify-between border-b border-slate-700 pb-2">
                  <strong class="text-emerald-300 text-xs flex items-center gap-1.5">
                    <span>📐</span> 2. CCBN ANALYTICAL MODEL (/analisis)
                  </strong>
                  <span class="px-2 py-0.2 rounded bg-emerald-900/60 text-[10px] font-mono text-emerald-200">Mathematical Engine</span>
                </div>

                <div class="space-y-1.5 text-[11px]">
                  <div class="p-2 rounded bg-slate-800/80 border border-slate-700 flex justify-between items-center">
                    <div>
                      <span class="text-emerald-300 font-bold block text-[10px]">CCBN Expected Baseline (Eq. 5) & Residual (Eq. 6):</span>
                      <span class="text-slate-200 font-mono">b̂_{i,t} = E[B_{i,t} | c_{i,t}, q_{i,t}] & d_{i,t} = B_{i,t} - b̂_{i,t}</span>
                    </div>
                    <span class="text-[10px] text-emerald-400 font-bold">Non-Punitif</span>
                  </div>

                  <div class="p-2 rounded bg-slate-800/80 border border-slate-700 flex justify-between items-center">
                    <div>
                      <span class="text-amber-300 font-bold block text-[10px]">Disparitas (Eq. 7) & Beban Rekomendasi (Eq. 8, 8a, 8b):</span>
                      <span class="text-slate-200 font-mono">D_t & Gap_{burden} & Gap_{interpretation}</span>
                    </div>
                    <span class="text-[10px] text-amber-400 font-bold">Epistemic Guardrail</span>
                  </div>

                  <div class="p-2 rounded bg-slate-800/80 border border-slate-700 flex justify-between items-center">
                    <div>
                      <span class="text-purple-300 font-bold block text-[10px]">LinUCB Multi-Objective Reward (Eq. 9) & Tata Kelola HITL:</span>
                      <span class="text-slate-200 font-mono">r'_{i,a,t+1} = r + ηU - μCB - νOB - ρΔc - γD_t → HITL</span>
                    </div>
                    <span class="text-[10px] text-purple-400 font-bold">Decision Layer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- SUB TABS NAVIGATION -->
          <div class="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap">
            <button
              type="button"
              @click="activeMainTab = 'taxonomy'"
              :class="`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeMainTab === 'taxonomy'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`"
            >
              <span>🗂️</span>
              <span>1. Taksonomi Sumber Data & Evidensi (6 Kategori)</span>
            </button>

            <button
              type="button"
              @click="activeMainTab = 'traceability'"
              :class="`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeMainTab === 'traceability'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`"
            >
              <span>🔗</span>
              <span>2. Matriks Traceability Proposal ↔ Dataset</span>
            </button>

            <button
              type="button"
              @click="activeMainTab = 'metadata_catalog'"
              :class="`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeMainTab === 'metadata_catalog'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`"
            >
              <span>📋</span>
              <span>3. Katalog Metadata & Log Stream Data</span>
            </button>

            <button
              type="button"
              @click="activeMainTab = 'states_matrix'"
              :class="`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeMainTab === 'states_matrix'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`"
            >
              <span>🎯</span>
              <span>4. Status Situasional Operasional (S1–S4)</span>
            </button>

            <button
              type="button"
              @click="activeMainTab = 'architecture'"
              :class="`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeMainTab === 'architecture'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`"
            >
              <span>🗺️</span>
              <span>5. Diagram 4-Layer CABA (Manuskrip Lineage)</span>
            </button>

            <button
              type="button"
              @click="activeMainTab = 'references'"
              :class="`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeMainTab === 'references'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`"
            >
              <span>📚</span>
              <span>6. Referensi Literatur & Benchmark</span>
            </button>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 1: DATA SOURCE TAXONOMY (CATEGORIES A TO F)                           -->
        <!-- ========================================================================= -->
        <div v-if="activeMainTab === 'taxonomy'" class="space-y-6">
          <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-blue-700">DATA SOURCE TAXONOMY</span>
              <h2 class="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                Klasifikasi 6 Kategori Data Pendukung Kerangka Kerja CABA–CCBN
              </h2>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">
                Struktur klasifikasi formal sumber data yang membedakan data konteks, jejak perilaku mentah, evidensi perilaku, observabilitas, spasial, dan sinyal visual pendukung sesuai Proposal Disertasi Revisi 2.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              
              <!-- CATEGORY A: CONTEXT DATA -->
              <div class="p-4 rounded-xl bg-blue-50/40 border border-blue-200 flex flex-col justify-between space-y-3">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-blue-100 text-blue-800">KATEGORI A</span>
                    <span class="text-[10px] text-blue-700 font-bold">Persamaan (2)</span>
                  </div>
                  <h3 class="text-sm font-bold text-blue-950">Context Data (c_{i,t})</h3>
                  <p class="text-[11px] text-slate-600 leading-relaxed">
                    Vektor konteks 6-dimensi: <strong>c_{i,t} = [T, I, O, D, W, S]</strong>. Mengondisikan lingkungan belajar nyata peserta.
                  </p>
                  <ul class="text-[11px] text-slate-700 space-y-1 bg-white p-2.5 rounded-lg border border-blue-100">
                    <li>• <strong>Temporal (T):</strong> Jam kerja, sesi malam, waktu belajar</li>
                    <li>• <strong>Infrastruktur (I):</strong> Bandwidth, latensi, stabilitas</li>
                    <li>• <strong>Organisasi (O):</strong> Dukungan instansi, komitmen pimpinan</li>
                    <li>• <strong>Device (D):</strong> Smartphone, tablet, desktop</li>
                    <li>• <strong>Workload (W):</strong> Beban tugas kedinasan kantor</li>
                    <li>• <strong>Spatial (S):</strong> Indeks komposit spasial</li>
                  </ul>
                </div>
                <div class="p-2 rounded bg-blue-100/70 text-[10px] text-blue-900 font-medium">
                  📌 <strong>Pernyataan Kunci:</strong> Kuesioner adalah instrumen akuisisi data konteks; bukan model inferensi CCBN itu sendiri.
                </div>
              </div>

              <!-- CATEGORY B: RAW BEHAVIORAL TRACES -->
              <div class="p-4 rounded-xl bg-purple-50/40 border border-purple-200 flex flex-col justify-between space-y-3">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-purple-100 text-purple-800">KATEGORI B</span>
                    <span class="text-[10px] text-purple-700 font-bold">Persamaan (1)</span>
                  </div>
                  <h3 class="text-sm font-bold text-purple-950">Raw Behavioral Traces (X_{i,t})</h3>
                  <p class="text-[11px] text-slate-600 leading-relaxed">
                    Jejak mentah telemetri sistem: <strong>X_{i,t} = [login, duration, clickstream, completion, artifact, ...]</strong>.
                  </p>
                  <ul class="text-[11px] text-slate-700 space-y-1 bg-white p-2.5 rounded-lg border border-purple-100">
                    <li>• <strong>Log Login:</strong> Frekuensi & stempel waktu akses</li>
                    <li>• <strong>Durasi Akses:</strong> Menit terakses substantif</li>
                    <li>• <strong>Clickstream:</strong> Interaksi antarmuka & navigasi</li>
                    <li>• <strong>Komplesi:</strong> Status penyelesaian modul/video</li>
                    <li>• <strong>Artefak:</strong> Skor kuis & tugas formatif</li>
                  </ul>
                </div>
                <div class="p-2 rounded bg-purple-100/70 text-[10px] text-purple-900 font-medium">
                  📌 <strong>Pernyataan Kunci:</strong> Jejak mentah adalah input bukti, bukan vonis mutlak motivasi atau kecerdasan peserta.
                </div>
              </div>

              <!-- CATEGORY C: BEHAVIORAL EVIDENCE -->
              <div class="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200 flex flex-col justify-between space-y-3">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-100 text-emerald-800">KATEGORI C</span>
                    <span class="text-[10px] text-emerald-700 font-bold">B_{i,t} Evidence</span>
                  </div>
                  <h3 class="text-sm font-bold text-emerald-950">Behavioral Evidence (B_{i,t})</h3>
                  <p class="text-[11px] text-slate-600 leading-relaxed">
                    Evidensi perilaku teramati yang ditransformasikan dari jejak mentah sebagai bukti keterlibatan substantif.
                  </p>
                  <ul class="text-[11px] text-slate-700 space-y-1 bg-white p-2.5 rounded-lg border border-emerald-100">
                    <li>• <strong>Bukan "Engagement Score" Kaku:</strong> Fokus pada bukti belajar substantif autentik</li>
                    <li>• <strong>Multimodal Activity:</strong> Pengulangan materi (revisit), pengerjaan kuis, diskusi kasus</li>
                    <li>• <strong>Operational Indicator:</strong> Indikator operasional perilaku; bukan diagnosis psikologis mutlak</li>
                  </ul>
                </div>
                <div class="p-2 rounded bg-emerald-100/70 text-[10px] text-emerald-900 font-medium">
                  📌 <strong>Pernyataan Kunci:</strong> Evidensi perilaku B_{i,t} siap dikalibrasi oleh CCBN baseline wajar b̂_{i,t}.
                </div>
              </div>

              <!-- CATEGORY D: MISSINGNESS & OBSERVABILITY -->
              <div class="p-4 rounded-xl bg-amber-50/40 border border-amber-200 flex flex-col justify-between space-y-3">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-100 text-amber-800">KATEGORI D</span>
                    <span class="text-[10px] text-amber-700 font-bold">Persamaan (3) & (4)</span>
                  </div>
                  <h3 class="text-sm font-bold text-amber-950">Evidence Observability & Missingness</h3>
                  <p class="text-[11px] text-slate-600 leading-relaxed">
                    Evaluasi batas keteramatan data: <strong>m_{i,t} = 1 - (n_obs / n_exp)</strong> dan <strong>q_{i,t} = 1 - m - λ·noise</strong>.
                  </p>
                  <ul class="text-[11px] text-slate-700 space-y-1 bg-white p-2.5 rounded-lg border border-amber-100">
                    <li>• <strong>Batas Observabilitas (m):</strong> Data hilang akibat sinyal drop/timeout (MNAR)</li>
                    <li>• <strong>Kualitas Evidensi (q):</strong> Keandalan sinyal telemetri yang tersedia</li>
                    <li>• <strong>Bukan Defisit Motivasi:</strong> Data hilang tidak dihukum sebagai kemalasan peserta</li>
                  </ul>
                </div>
                <div class="p-2 rounded bg-amber-100/70 text-[10px] text-amber-900 font-medium">
                  📌 <strong>Pernyataan Kunci:</strong> Missingness m memicu Baseline Validity Gate (Eq. 18) di /analisis untuk mencegah vonis keliru.
                </div>
              </div>

              <!-- CATEGORY E: SPATIAL DATA -->
              <div class="p-4 rounded-xl bg-cyan-50/40 border border-cyan-200 flex flex-col justify-between space-y-3">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-cyan-100 text-cyan-800">KATEGORI E</span>
                    <span class="text-[10px] text-cyan-700 font-bold">Persamaan (2a, 2b, 2c)</span>
                  </div>
                  <h3 class="text-sm font-bold text-cyan-950">Composite Spatial Variable (S_{i,t})</h3>
                  <p class="text-[11px] text-slate-600 leading-relaxed">
                    Penggabungan klaster struktural makro K_i dan kualitas jaringan sesi N_{i,t}: <strong>S_{i,t} = δ K_i + (1 - δ) N_{i,t}</strong>.
                  </p>
                  <ul class="text-[11px] text-slate-700 space-y-1 bg-white p-2.5 rounded-lg border border-cyan-100">
                    <li>• <strong>Klaster Makro (K_i):</strong> BPS, Podes sinyal desa, APJII, Ookla</li>
                    <li>• <strong>Jaringan Sesi (N_{i,t}):</strong> Latensi riil, retry, buffering, sync</li>
                    <li>• <strong>General Grouping (g ∈ G):</strong> 3T vs Urban adalah contoh pengelompokan ilustratif riset</li>
                  </ul>
                </div>
                <div class="p-2 rounded bg-cyan-100/70 text-[10px] text-cyan-900 font-medium">
                  📌 <strong>Pernyataan Kunci:</strong> Spasial adalah variabel moderator dalam konteks c_{i,t}, bukan pengganti model CCBN.
                </div>
              </div>

              <!-- CATEGORY F: VISUAL OBSERVABILITY -->
              <div class="p-4 rounded-xl bg-rose-50/40 border border-rose-200 flex flex-col justify-between space-y-3">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-rose-100 text-rose-800">KATEGORI F</span>
                    <span class="text-[10px] text-rose-700 font-bold">Persamaan (10 & 10a)</span>
                  </div>
                  <h3 class="text-sm font-bold text-rose-950">Supporting Visual Signals</h3>
                  <p class="text-[11px] text-slate-600 leading-relaxed">
                    Sinyal kamera/visi komputer on-device sebagai <strong>pendukung observabilitas</strong> (bukan ground truth atensi).
                  </p>
                  <ul class="text-[11px] text-slate-700 space-y-1 bg-white p-2.5 rounded-lg border border-rose-100">
                    <li>• <strong>Bobot Sigmoid w:</strong> w(S, q_visual) menurunkan bobot visual saat sinyal/kamera drop</li>
                    <li>• <strong>Fusi Terbatas:</strong> F_{i,t} = w V_{i,t} + (1-w) b_{LMS}</li>
                    <li>• <strong>Fallback Aman:</strong> Jika kamera mati/gelap, sistem tetap bekerja normal berbasis telemetri LMS</li>
                  </ul>
                </div>
                <div class="p-2 rounded bg-rose-100/70 text-[10px] text-rose-900 font-medium">
                  📌 <strong>Pernyataan Kunci:</strong> Visual hanya sinyal pendukung observabilitas, bukan vonis kelulusan atau kepribadian.
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 2: PROPOSAL ↔ DATASET TRACEABILITY MATRIX                             -->
        <!-- ========================================================================= -->
        <div v-if="activeMainTab === 'traceability'" class="space-y-6">
          <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-700">TRACEABILITY SPECIFICATION</span>
                <h2 class="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                  Matriks Keterlacakan Proposal Disertasi Revisi 2 ↔ Sumber Data
                </h2>
                <p class="text-xs text-slate-600 mt-1">
                  Menunjukkan asal-usul setiap variabel dan persamaan matematika dalam proposal disertasi terhadap sumber data empiris dan destinasi modul komputasi pada aplikasi.
                </p>
              </div>

              <!-- Category Filter -->
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-xs font-bold text-slate-600">Filter Kategori:</span>
                <button
                  type="button"
                  v-for="cat in ['All', 'Context', 'Evidence', 'Observability', 'Spatial', 'Decision']"
                  :key="cat"
                  @click="traceFilter = cat"
                  :class="`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    traceFilter === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`"
                >
                  {{ cat }}
                </button>
              </div>
            </div>

            <!-- Traceability Table -->
            <div class="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                    <th class="p-3">Konstruk Proposal</th>
                    <th class="p-3">Persamaan</th>
                    <th class="p-3">Sumber Data</th>
                    <th class="p-3">Variabel Kunci</th>
                    <th class="p-3">Peran dalam Arsitektur</th>
                    <th class="p-3">Destinasi Komputasi</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr v-for="t in filteredTraceabilityList" :key="t.equation + t.construct" class="hover:bg-blue-50/30 transition">
                    <td class="p-3 font-bold text-slate-900">{{ t.construct }}</td>
                    <td class="p-3 font-mono font-bold text-blue-700 whitespace-nowrap">
                      <span class="px-2 py-0.5 rounded bg-blue-50 border border-blue-200">{{ t.equation }}</span>
                    </td>
                    <td class="p-3 text-slate-700">{{ t.dataSource }}</td>
                    <td class="p-3 font-mono text-[11px] text-slate-600">{{ t.variables }}</td>
                    <td class="p-3 text-slate-700">{{ t.role }}</td>
                    <td class="p-3">
                      <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 whitespace-nowrap">
                        {{ t.destination }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 3: DATASET METADATA CATALOG & DATA STREAMS                            -->
        <!-- ========================================================================= -->
        <div v-if="activeMainTab === 'metadata_catalog'" class="space-y-6">
          
          <!-- Stream Selector Cards -->
          <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-purple-700">CATALOG & METADATA</span>
                <h2 class="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                  Katalog Metadata Sumber Data & Telemetri Interaksi
                </h2>
              </div>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  @click="exportCurrentDatasetCSV"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1"
                >
                  <span>📥</span>
                  <span>Unduh CSV</span>
                </button>
                <button
                  type="button"
                  @click="exportCurrentDatasetJSON"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1"
                >
                  <span>📋</span>
                  <span>Unduh JSON</span>
                </button>
              </div>
            </div>

            <!-- Stream Tabs -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <button
                type="button"
                v-for="st in cabaDatasetStreams"
                :key="st.id"
                @click="selectedCabaStream = st.id"
                :class="`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  selectedCabaStream === st.id
                    ? 'border-blue-600 bg-blue-50/80 shadow-xs ring-1 ring-blue-300'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`"
              >
                <div>
                  <span class="text-base mb-1 block">{{ st.icon }}</span>
                  <strong class="text-xs font-bold text-slate-900 block leading-tight">{{ st.title }}</strong>
                  <span class="text-[10px] text-slate-500 font-mono block mt-0.5">{{ st.filename }}</span>
                </div>
              </button>
            </div>

            <!-- Active Stream Description -->
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p class="leading-relaxed">
                <strong>Deskripsi Stream:</strong> {{ currentActiveStreamObj.description }}
              </p>
              <div class="shrink-0 flex items-center gap-2">
                <input
                  type="text"
                  v-model="datasetSearchQuery"
                  placeholder="Cari data..."
                  class="px-2.5 py-1 rounded-lg border border-slate-300 bg-white text-xs w-36 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <!-- Stream Table Data Preview -->
            <div class="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                    <th v-for="col in currentActiveStreamObj.columns" :key="col" class="p-2.5 whitespace-nowrap text-[11px]">
                      {{ col }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-mono text-[11px]">
                  <tr v-for="(row, rIdx) in filteredStreamRows" :key="rIdx" class="hover:bg-blue-50/40">
                    <td v-for="col in currentActiveStreamObj.columns" :key="col" class="p-2.5 whitespace-nowrap text-slate-800">
                      {{ row[col] }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 4: OPERATIONAL SUPPORT STATES (S1 TO S4 REPOSITIONED)                 -->
        <!-- ========================================================================= -->
        <div v-if="activeMainTab === 'states_matrix'" class="space-y-6">
          <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  🎯 OPERATIONAL SUPPORT STATES
                </span>
                <span class="text-xs font-bold text-slate-700">Kategori Dukungan Intervensi Lapangan</span>
              </div>
              <h2 class="text-base sm:text-lg font-black text-slate-900 mt-1">
                4 Status Situasional Operasional Pembelajar (S1–S4)
              </h2>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">
                Status situasional S1–S4 merupakan <strong>kategori dukungan operasional</strong> untuk memicu logika intervensi adaptif suportif pada prototipe. Status ini <strong>BUKAN</strong> definisi matematis CCBN, melainkan kategori bantuan andragogis lapangan.
              </p>
            </div>

            <!-- S1-S4 Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div
                v-for="state in SITUATED_OPERATIONAL_STATES"
                :key="state.code"
                class="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3"
              >
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="px-2.5 py-0.5 rounded font-bold text-xs bg-slate-900 text-white">{{ state.code }}</span>
                    <span class="text-[11px] font-bold text-slate-500">{{ state.role }}</span>
                  </div>
                  <h3 class="text-sm font-bold text-slate-900">{{ state.name }}</h3>
                  
                  <div class="p-2.5 rounded-lg bg-white border border-slate-200 space-y-1">
                    <span class="text-[10px] font-bold uppercase text-slate-500 block">Sinyal Pemicu (Triggers):</span>
                    <ul class="text-[11px] text-slate-700 space-y-0.5">
                      <li v-for="t in state.triggers" :key="t">• {{ t }}</li>
                    </ul>
                  </div>

                  <div class="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span class="text-[10px] font-bold uppercase text-emerald-900 block">Aksi Dukungan Suportif:</span>
                    <span class="text-[11px] font-bold text-emerald-800">{{ state.supportAction }}</span>
                  </div>
                </div>

                <div class="p-2 rounded bg-amber-50 border border-amber-200 text-[10px] text-amber-900">
                  <strong>Disclaimers:</strong> {{ state.disclaimer }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 5: 4-LAYER CABA ARCHITECTURE DIAGRAM (MANUSCRIPT LINEAGE)             -->
        <!-- ========================================================================= -->
        <div v-if="activeMainTab === 'architecture'" class="space-y-6">
          <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-blue-700">MANUSCRIPT LINEAGE ARTIFACT</span>
                <h2 class="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                  Diagram Arsitektur Empat Layer CABA (Figure 1 Manuskrip JISEBI)
                </h2>
                <p class="text-xs text-slate-600 mt-1">
                  Representasi konseptual empat layer awal yang mendasari evolusi menuju model matematika CABA–CCBN Proposal Disertasi Revisi 2.
                </p>
              </div>
            </div>

            <!-- Interactive Figure 1 Blocks -->
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center">
              <div class="w-full max-w-xl p-4 rounded-xl border-2 border-slate-800 bg-slate-900 text-white text-center">
                <div class="text-sm font-black uppercase tracking-wider">EVALUATE SIGNALS</div>
                <div class="text-xs font-semibold text-slate-300 mt-0.5">Context Sensing + Behavioral Telemetry</div>
                <div class="text-[11px] text-slate-400 mt-1">Temporal • Device • Network • Tab Focus • Speed • Dwell Time</div>
              </div>

              <div class="text-slate-400 text-xs py-2">▼</div>

              <div class="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="p-3.5 rounded-xl border border-blue-300 bg-blue-50/50">
                  <div class="text-xs font-bold text-blue-950">S1: Low-Engagement Risk</div>
                  <div class="text-[11px] text-slate-600 mt-1">Speed 2x • Low Tab-Focus → Stop-Gate Verification</div>
                </div>
                <div class="p-3.5 rounded-xl border border-indigo-300 bg-indigo-50/50">
                  <div class="text-xs font-bold text-indigo-950">S2: Office-Hour Learning</div>
                  <div class="text-[11px] text-slate-600 mt-1">Office Hours • Tab Switching → Micro-Chunking (3–5 min)</div>
                </div>
                <div class="p-3.5 rounded-xl border border-cyan-300 bg-cyan-50/50">
                  <div class="text-xs font-bold text-cyan-950">S3: Cognitive Struggling</div>
                  <div class="text-[11px] text-slate-600 mt-1">Rewinds • Long Dwell → Adaptive Scaffolding</div>
                </div>
              </div>

              <div class="text-slate-400 text-xs py-2">▼</div>

              <div class="w-full max-w-3xl p-3.5 rounded-xl border border-amber-300 bg-amber-50/50 text-center">
                <div class="text-xs font-bold text-amber-950">S4: Infrastructural Constraint (3T Regions)</div>
                <div class="text-[11px] text-slate-700 mt-1">Low Bandwidth • Buffering Stalls → Audio-First Podcast Mode + Offline PWA Caching</div>
              </div>

              <div class="text-slate-400 text-xs py-2">▼</div>

              <div class="w-full max-w-xl p-3.5 rounded-xl border border-emerald-500 bg-emerald-50/70 text-center">
                <div class="text-xs font-bold text-emerald-950">ADJUSTED EVIDENCE ACCUMULATION</div>
                <div class="text-[11px] text-slate-700 mt-1">Akumulasi bukti autentik tanpa vonis kaku durasi video 100% linear.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 6: REFERENCES & BENCHMARK DATASETS                                    -->
        <!-- ========================================================================= -->
        <div v-if="activeMainTab === 'references'" class="space-y-6">
          <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-blue-700">BIBLIOGRAPHY & BENCHMARKS</span>
                <h2 class="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                  22 Referensi Manuskrip JISEBI & Benchmark Datasets Terbuka
                </h2>
              </div>
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-xs font-bold text-slate-600">Filter:</span>
                <button
                  type="button"
                  @click="refCategoryFilter = 'all'"
                  :class="`px-2 py-0.5 rounded text-xs font-bold ${refCategoryFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`"
                >
                  Semua
                </button>
                <button
                  type="button"
                  v-for="c in refCategories"
                  :key="c"
                  @click="refCategoryFilter = c"
                  :class="`px-2 py-0.5 rounded text-xs font-bold ${refCategoryFilter === c ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`"
                >
                  {{ c }}
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div
                v-for="r in filteredJisebiReferences"
                :key="r.key"
                class="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-2"
              >
                <div>
                  <div class="flex items-center justify-between gap-2 mb-1">
                    <span class="px-2 py-0.2 rounded font-mono text-[10px] font-bold bg-blue-100 text-blue-800">[{{ r.key }}]</span>
                    <span class="text-[10px] text-slate-500 font-semibold">{{ r.year }} • {{ r.category }}</span>
                  </div>
                  <strong class="text-slate-900 block text-xs leading-snug">{{ r.title }}</strong>
                  <p class="text-[11px] text-slate-600 mt-1 italic">{{ r.authors }} ({{ r.source }})</p>
                </div>
                <div class="p-2 rounded bg-white border border-slate-200 text-[10px] text-slate-700">
                  <strong>Relevansi CABA:</strong> {{ r.relevance }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- BOTTOM PROMINENT NAVIGATION CARD TO /analisis                             -->
        <!-- ========================================================================= -->
        <div class="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white border border-indigo-700 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="space-y-1.5 max-w-3xl">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              ⚡ NEXT STEP IN PIPELINE
            </span>
            <h3 class="text-lg font-black text-white">
              Lanjutkan ke Lab Komputasi CABA–CCBN (/analisis)
            </h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Gunakan konteks teramati ($c_{i,t}$), jejak perilaku ($X_{i,t} 	o B_{i,t}$), dan kualitas observabilitas ($q_{i,t}$) yang disediakan lapisan data ini sebagai input komputasi bagi estimator baseline wajar CCBN ($hat{b}_{i,t}$), deviasi residual ($d_{i,t}$), disparitas kelompok ($D_t$), serta optimasi kebijakan adaptif LinUCB ($r'_{i,a,t+1}$).
            </p>
          </div>

          <NuxtLink
            to="/analisis"
            class="px-5 py-3 rounded-xl text-xs sm:text-sm font-black bg-emerald-500 hover:bg-emerald-600 text-slate-950 transition cursor-pointer flex items-center gap-2 shadow-lg shrink-0 no-underline"
          >
            <span>Buka CABA–CCBN Analysis →</span>
          </NuxtLink>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Navbar from '~/components/Navbar.vue';

// Import centralized CABA metadata and traceability specifications
import {
  CABA_DATASETS_METADATA,
  SITUATED_OPERATIONAL_STATES,
  RESEARCH_LINEAGE_STAGES,
  PROPOSAL_DATASET_TRACEABILITY
} from '~/data/caba';

// Active Tab State
const activeMainTab = ref<string>('taxonomy');
const showAbstract = ref<boolean>(false);
const traceFilter = ref<string>('All');

// Filtered Traceability List
const filteredTraceabilityList = computed(() => {
  if (traceFilter.value === 'All') return PROPOSAL_DATASET_TRACEABILITY;
  return PROPOSAL_DATASET_TRACEABILITY.filter(t => t.category === traceFilter.value);
});

// Keywords List
const keywordsList = [
  'Context-Aware Behavioral Analytics (CABA)',
  'Context-Conditioned Behavioral Baseline (CCBN)',
  'Public Sector E-Learning',
  'Civil Servant Competency Training',
  'Algorithmic Equity',
  'Missingness Diagnostics (MNAR)',
  'Human-in-the-Loop Governance'
];

// Data Stream Configs & Interactive Preview
interface CabaStreamConfig {
  id: string;
  title: string;
  icon: string;
  description: string;
  filename: string;
  columns: string[];
  rows: Record<string, string>[];
}

const selectedCabaStream = ref<string>('telemetry_stream');
const datasetSearchQuery = ref<string>('');

const cabaDatasetStreams: CabaStreamConfig[] = [
  {
    id: 'telemetry_stream',
    title: 'Stream 1: Telemetri Sesi & Bukti Perilaku (B)',
    icon: '📡',
    filename: 'caba_telemetry_evidence_stream.csv',
    description: 'Log telemetri interaksi waktu nyata (durasi, playback speed, tab focus, buffering, rewind, dwell time) dengan evidensi perilaku teramati B_{i,t}.',
    columns: ['user_id', 'klaster_wilayah', 'jam_akses', 'kecepatan_video', 'tab_focus_ratio', 'buffer_stalls', 'rewind_count', 'evidence_B', 'evidence_quality_q', 'status_gate'],
    rows: [
      { user_id: 'ASN-0101', klaster_wilayah: 'Urban (DKI Jakarta)', jam_akses: '10:15 WIB', kecepatan_video: '2.0x', tab_focus_ratio: '0.22', buffer_stalls: '0', rewind_count: '0', evidence_B: '0.82', evidence_quality_q: '0.98', status_gate: 'VALID' },
      { user_id: 'ASN-0102', klaster_wilayah: 'Urban (Surabaya)', jam_akses: '14:40 WIB', kecepatan_video: '1.75x', tab_focus_ratio: '0.28', buffer_stalls: '0', rewind_count: '1', evidence_B: '0.85', evidence_quality_q: '0.95', status_gate: 'VALID' },
      { user_id: 'ASN-0201', klaster_wilayah: 'Semi-Urban (Banyumas)', jam_akses: '09:30 WIB', kecepatan_video: '1.0x', tab_focus_ratio: '0.65', buffer_stalls: '1', rewind_count: '0', evidence_B: '0.74', evidence_quality_q: '0.88', status_gate: 'VALID' },
      { user_id: 'ASN-0401', klaster_wilayah: '3T (Kab. Natuna)', jam_akses: '14:20 WIB', kecepatan_video: '1.0x', tab_focus_ratio: '0.88', buffer_stalls: '8', rewind_count: '0', evidence_B: '0.52', evidence_quality_q: '0.62', status_gate: 'BOUNDARY' },
      { user_id: 'ASN-0402', klaster_wilayah: '3T (Kep. Aru)', jam_akses: '16:10 WIT', kecepatan_video: '1.0x', tab_focus_ratio: '0.85', buffer_stalls: '11', rewind_count: '0', evidence_B: '0.45', evidence_quality_q: '0.48', status_gate: 'INVALID (HITL)' },
      { user_id: 'ASN-0403', klaster_wilayah: '3T (Kab. Belu)', jam_akses: '19:40 WITA', kecepatan_video: '1.0x', tab_focus_ratio: '0.90', buffer_stalls: '9', rewind_count: '1', evidence_B: '0.50', evidence_quality_q: '0.55', status_gate: 'BOUNDARY' }
    ]
  },
  {
    id: 'spatial_weights',
    title: 'Stream 2: Bobot Spasial & Variabel Moderator (S)',
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
    id: 'evidence_accumulation',
    title: 'Stream 3: Missingness Diagnostics (m) & Kualitas (q)',
    icon: '🎯',
    filename: 'missingness_diagnostics_log.csv',
    description: 'Log evaluasi rasio keteramatan checkpoint dan skor kualitas evidensi q_{i,t} untuk memisahkan MNAR dari kelalaian.',
    columns: ['session_id', 'user_id', 'expected_points', 'observed_points', 'missingness_m', 'noise_level', 'quality_q', 'mcar_test_p'],
    rows: [
      { session_id: 'SES-001', user_id: 'ASN-0101 (Urban)', expected_points: '10', observed_points: '10', missingness_m: '0.00', noise_level: '0.02', quality_q: '0.98', mcar_test_p: 'p > 0.05' },
      { session_id: 'SES-002', user_id: 'ASN-0201 (Daratan)', expected_points: '10', observed_points: '8', missingness_m: '0.20', noise_level: '0.08', quality_q: '0.72', mcar_test_p: 'p < 0.05' },
      { session_id: 'SES-003', user_id: 'ASN-0401 (3T Natuna)', expected_points: '10', observed_points: '5', missingness_m: '0.50', noise_level: '0.22', quality_q: '0.28', mcar_test_p: 'p < 0.01 (MNAR)' },
      { session_id: 'SES-004', user_id: 'ASN-0403 (3T Belu)', expected_points: '10', observed_points: '6', missingness_m: '0.40', noise_level: '0.18', quality_q: '0.42', mcar_test_p: 'p < 0.01 (MNAR)' }
    ]
  },
  {
    id: 'widyaiswara_validation',
    title: 'Stream 4: Validasi Ahli Widyaiswara & HITL Logs',
    icon: '👨‍🏫',
    filename: 'widyaiswara_hitl_audit_log.csv',
    description: 'Rubrik penilaian validasi konseptual oleh Widyaiswara pengelola diklat ASN serta log audit Human-in-the-Loop.',
    columns: ['evaluator_id', 'institusi_diklat', 'jabatan_fungsional', 'validitas_baseline_skor', 'fairness_equity_skor', 'cooldown_suitability', 'rekomendasi_ahli'],
    rows: [
      { evaluator_id: 'EXP-WI-01', institusi_diklat: 'Puslatbang LAN RI', jabatan_fungsional: 'Widyaiswara Ahli Utama', validitas_baseline_skor: '4.8 / 5.0', fairness_equity_skor: '4.9 / 5.0', cooldown_suitability: '4.7 / 5.0', rekomendasi_ahli: 'Sangat Sesuai Praktik Diklat ASN' },
      { evaluator_id: 'EXP-WI-02', institusi_diklat: 'BPSDM Prov. Sulsel', jabatan_fungsional: 'Widyaiswara Ahli Madya', validitas_baseline_skor: '4.6 / 5.0', fairness_equity_skor: '4.8 / 5.0', cooldown_suitability: '4.5 / 5.0', rekomendasi_ahli: 'Sangat Sesuai untuk Wilayah Kepulauan' },
      { evaluator_id: 'EXP-WI-03', institusi_diklat: 'Bapelkes Mataram', jabatan_fungsional: 'Widyaiswara Ahli Madya', validitas_baseline_skor: '4.7 / 5.0', fairness_equity_skor: '4.7 / 5.0', cooldown_suitability: '4.6 / 5.0', rekomendasi_ahli: 'Mengatasi Masalah Klasik Sinyal 3T' },
      { evaluator_id: 'EXP-WI-04', institusi_diklat: 'BPSDM Jawa Tengah', jabatan_fungsional: 'Widyaiswara Ahli Utama', validitas_baseline_skor: '4.9 / 5.0', fairness_equity_skor: '4.8 / 5.0', cooldown_suitability: '4.8 / 5.0', rekomendasi_ahli: 'Efektif Mencegah Attribution Error' }
    ]
  }
];

const currentActiveStreamObj = computed<CabaStreamConfig>(() => {
  return cabaDatasetStreams.find(s => s.id === selectedCabaStream.value) || cabaDatasetStreams[0];
});

const filteredStreamRows = computed(() => {
  const stream = currentActiveStreamObj.value;
  let rows = stream.rows;
  if (datasetSearchQuery.value.trim()) {
    const q = datasetSearchQuery.value.toLowerCase();
    rows = rows.filter(r => Object.values(r).some(val => String(val).toLowerCase().includes(q)));
  }
  return rows;
});

// CSV / JSON Export Functions
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

// References and Benchmark state
const refCategoryFilter = ref<string>('all');
const jisebiReferences = ref<any[]>([]);
const benchmarkDatasets = ref<any[]>([]);
const loading = ref<boolean>(true);

const refCategories = computed(() => {
  const set = new Set<string>();
  jisebiReferences.value.forEach(r => {
    if (r.category) set.add(r.category);
  });
  return Array.from(set);
});

const filteredJisebiReferences = computed(() => {
  if (refCategoryFilter.value === 'all') return jisebiReferences.value;
  return jisebiReferences.value.filter(r => r.category === refCategoryFilter.value);
});

const fetchDatasetHubData = async () => {
  loading.value = true;
  try {
    const res = await fetch('/api/literature-hunter/dataset-hub?limit=600');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.success) {
      jisebiReferences.value = data.jisebi_manuscript_references || [];
      benchmarkDatasets.value = data.open_benchmark_datasets || [];
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
@keyframes slideIn {
  from {
    transform: translateY(6px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
