<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-16">
    <!-- Top Navigation Bar -->
    <Navbar />

    <!-- Main Container -->
    <main id="konten-utama" class="max-w-[1520px] mx-auto px-3 sm:px-6 pt-6 space-y-8">

      <!-- ========================================================================= -->
      <!-- 1. HERO BANNER & RESEARCH COGNITIVE COCKPIT                               -->
      <!-- ========================================================================= -->
      <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800/80 shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
        <!-- Glow Orbs in Background -->
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 flex flex-col gap-6">
          <!-- Top Micro-Bar: Lineage & Operational Mode -->
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4 text-[11px] font-mono">
            <div class="flex items-center gap-2.5 flex-wrap">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                CABA–CCBN Research Ecosystem
              </span>
              <span class="text-slate-600">/</span>
              <span class="text-slate-300 font-semibold flex items-center gap-1.5">
                <span class="text-emerald-400 font-bold">●</span> Data & Evidence Layer (Foundation)
              </span>
              <span class="text-slate-600 hidden md:inline">/</span>
              <span class="text-slate-400 hidden md:inline">Truth Source: Dissertation Proposal Rev 2 (2026)</span>
            </div>

            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                SYNTHETIC PROTOTYPE DATA
              </span>
              <span class="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                OPEN ARTIFACT v2.4
              </span>
            </div>
          </div>

          <!-- Hero Main Title & Executive Summary -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div class="lg:col-span-8 space-y-4">
              <div class="flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  📁 Multimodal Telemetry
                </span>
                <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  🌐 6D Context Space c_{i,t}
                </span>
                <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  🛡️ MNAR Missingness (m, q)
                </span>
                <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  🎯 S1–S4 Operational States
                </span>
              </div>

              <h1 class="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                CABA Data & Evidence Hub
                <span class="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-emerald-300 to-teal-200 text-lg sm:text-2xl font-bold mt-1">
                  Empirical Foundations for Context-Conditioned Behavioral Analytics
                </span>
              </h1>

              <p class="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-3xl">
                Hub repositori data riset, telemetri jejak mentah ((X_{i,t})), evidensi perilaku ((B_{i,t})), serta variabel moderator kontekstual 6-dimensi ((c_{i,t} = [T, I, O, D, W, S])). Lapisan ini mengisolasi kualitas observabilitas ((q_{i,t})) dan kendala data hilang (*Missing Not At Random*) sebelum diteruskan ke model inferensi non-punitif CCBN di rute <code class="text-emerald-400 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">/analisis</code>.
              </p>
            </div>

            <!-- Quick Action & Analytics Jump Card -->
            <div class="lg:col-span-4 flex flex-col gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>⚡ Integrasi Komputasi</span>
                <span class="text-emerald-400 text-[10px]">Ready</span>
              </span>

              <p class="text-[11px] text-slate-400 leading-snug">
                Data yang disiapkan pada hub ini menjadi input langsung bagi estimator ekspektasi wajar (b̂_{i,t}) dan LinUCB reward:
              </p>

              <NuxtLink
                to="/analisis"
                class="w-full py-3 px-4 rounded-xl font-black text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 no-underline cursor-pointer group"
              >
                <span>🧪</span>
                <span>Buka Lab Analisis CCBN (/analisis)</span>
                <span class="group-hover:translate-x-1 transition-transform">→</span>
              </NuxtLink>

              <div class="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px]">
                <button
                  type="button"
                  @click="fetchDatasetHubData"
                  :disabled="loading"
                  class="text-slate-400 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span :class="{ 'animate-spin': loading }">🔄</span>
                  <span>Sinkronisasi Ulang Data</span>
                </button>
                <span class="text-slate-500 font-mono text-[10px]">Latency: 14ms</span>
              </div>
            </div>
          </div>

          <!-- KPI Metric Pill Gauges -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div class="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-lg">
                📊
              </div>
              <div>
                <span class="text-[10px] text-slate-400 font-semibold block uppercase">Dimensi Konteks (c)</span>
                <span class="text-base font-black text-white font-mono">6 Dimensi</span>
                <span class="text-[10px] text-blue-400 block">[T, I, O, D, W, S]</span>
              </div>
            </div>

            <div class="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-lg">
                📑
              </div>
              <div>
                <span class="text-[10px] text-slate-400 font-semibold block uppercase">Traceability Matrix</span>
                <span class="text-base font-black text-white font-mono">17 Konstruk</span>
                <span class="text-[10px] text-purple-400 block">Eq. (1) s.d. (11)</span>
              </div>
            </div>

            <div class="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-lg">
                🎯
              </div>
              <div>
                <span class="text-[10px] text-slate-400 font-semibold block uppercase">Status Situasional</span>
                <span class="text-base font-black text-white font-mono">4 Status</span>
                <span class="text-[10px] text-amber-400 block">S1, S2, S3, S4 (Andragogi)</span>
              </div>
            </div>

            <div class="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-lg">
                🛡️
              </div>
              <div>
                <span class="text-[10px] text-slate-400 font-semibold block uppercase">Missingness Policy</span>
                <span class="text-base font-black text-white font-mono">MNAR Guard</span>
                <span class="text-[10px] text-emerald-400 block">Non-Punitif</span>
              </div>
            </div>
          </div>

          <!-- SCIENTIFIC DISCLAIMER CALLOUT -->
          <div class="p-3 rounded-xl bg-amber-950/40 border border-amber-600/40 flex items-center gap-3 text-xs text-amber-200/90">
            <span class="text-amber-400 text-base">⚠️</span>
            <div class="flex-1">
              <strong>PERSISTENT DISCLAIMER:</strong> Data telemetri, log stream, dan estimasi pada antarmuka ini merupakan <strong>SYNTHETIC PROTOTYPE VALUES — NOT EMPIRICAL RESULTS</strong> untuk verifikasi instrumen dan kelayakan pipeline komputasi.
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- 2. ARCHITECTURAL BOUNDARY & PIPELINE VISUALIZER                           -->
      <!-- ========================================================================= -->
      <section class="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                PIPELINE SEPARATION
              </span>
              <h2 class="text-base sm:text-lg font-black text-white">
                Batas Arsitektural: Lapisan Data & Bukti ➔ Engine Komputasi CCBN
              </h2>
            </div>
            <p class="text-xs text-slate-400 mt-1">
              Visualisasi batas domain tanggung jawab sistem antara penyiapan data di <code class="text-indigo-300">/dataset-hub</code> dan pengolahan matematis di <code class="text-emerald-300">/analisis</code>.
            </p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <span class="text-[11px] font-mono text-slate-400 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
              Flow: <span class="text-indigo-400 font-bold">X → B</span> ➔ <span class="text-purple-400 font-bold">(c, q)</span> ➔ <span class="text-emerald-400 font-bold">b̂ → d → D → π</span>
            </span>
          </div>
        </div>

        <!-- Interactive Flow Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          <!-- DOMAIN 1: /dataset-hub (Data & Evidence Layer) -->
          <div class="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/40 space-y-4">
            <div class="flex items-center justify-between border-b border-indigo-500/20 pb-3">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 text-xs font-bold">1</span>
                <strong class="text-indigo-200 text-sm font-bold">Data & Evidence Boundary (/dataset-hub)</strong>
              </div>
              <span class="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold">INPUTS & SENSING</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span class="text-indigo-400 font-mono text-[10px] font-bold block">1. KONTEKS 6D (c_{i,t})</span>
                <div class="text-slate-200 font-mono text-xs font-semibold">c = [T, I, O, D, W, S]</div>
                <p class="text-[10px] text-slate-400 leading-relaxed">
                  Profil spasial (BPS/Podes), telemetri jaringan ((N_{i,t})), beban kerja & gawai.
                </p>
              </div>

              <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span class="text-indigo-400 font-mono text-[10px] font-bold block">2. JEJAK MENTAH (X_{i,t}) → B</span>
                <div class="text-slate-200 font-mono text-xs font-semibold">X_{i,t} ➔ B_{i,t}</div>
                <p class="text-[10px] text-slate-400 leading-relaxed">
                  Log clickstream, revisits, durasi modul, checkpoints, artefak tugas formatif.
                </p>
              </div>
            </div>

            <div class="p-3.5 rounded-xl bg-indigo-950/70 border border-indigo-500/30 flex items-center justify-between text-xs">
              <div>
                <span class="text-indigo-300 font-bold block text-[11px]">3. OBSERVABILITAS & KUALITAS (Eq. 3 & 4)</span>
                <span class="font-mono text-slate-300 text-[11px]">m_{i,t} = 1 - (n_{obs}/n_{exp}) & q_{i,t} = 1 - m - λ·noise</span>
              </div>
              <span class="px-2.5 py-1 rounded-lg bg-indigo-900/80 text-indigo-200 font-bold text-[10px] border border-indigo-700">
                MNAR Diagnostics
              </span>
            </div>
          </div>

          <!-- DOMAIN 2: /analisis (Analytical CCBN Engine) -->
          <div class="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/40 space-y-4">
            <div class="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 text-xs font-bold">2</span>
                <strong class="text-emerald-200 text-sm font-bold">CCBN Computational Engine (/analisis)</strong>
              </div>
              <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">MATHEMATICAL MODEL</span>
            </div>

            <div class="space-y-2 text-xs">
              <div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span class="text-emerald-400 font-mono text-[10px] font-bold block">BASELINE & RESIDUAL (Eq. 5 & 6)</span>
                  <span class="text-slate-200 font-mono text-xs">b̂_{i,t} = 𝔼[B_{i,t} | c_{i,t}, q_{i,t}] & d_{i,t} = B_{i,t} - b̂_{i,t}</span>
                </div>
                <span class="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                  Non-Punitif
                </span>
              </div>

              <div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span class="text-teal-400 font-mono text-[10px] font-bold block">FAIRNESS & BURDEN (Eq. 7, 8a, 8b)</span>
                  <span class="text-slate-200 font-mono text-xs">D_t & Gap_{burden} & Gap_{interpretation}</span>
                </div>
                <span class="text-[10px] font-bold text-teal-400 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/30">
                  Algorithmic Equity
                </span>
              </div>

              <div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span class="text-amber-400 font-mono text-[10px] font-bold block">POLICY REWARD & HITL (Eq. 9 & Governance)</span>
                  <span class="text-slate-200 font-mono text-xs">r'_{i,a,t+1} = r + ηU - μCB - νOB - ρΔc - γD_t ➔ HITL</span>
                </div>
                <span class="text-[10px] font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                  Human Oversight
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- 3. MAIN NAVIGATION TABS (6 RICH SCIENTIFIC TABS)                          -->
      <!-- ========================================================================= -->
      <section class="space-y-6">
        <!-- Segmented Tab Bar -->
        <div class="p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-1.5 overflow-x-auto">
          <button
            type="button"
            v-for="tab in hubTabs"
            :key="tab.id"
            @click="activeMainTab = tab.id"
            :class="`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeMainTab === tab.id
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`"
          >
            <span>{{ tab.icon }}</span>
            <span>{{ tab.label }}</span>
            <span v-if="tab.badge" :class="`text-[10px] px-1.5 py-0.2 rounded ${activeMainTab === tab.id ? 'bg-indigo-400/30 text-white' : 'bg-slate-800 text-slate-400'}`">
              {{ tab.badge }}
            </span>
          </button>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 1: DATA SOURCE TAXONOMY (6 CATEGORIES WITH LUXURY CARDS)               -->
        <!-- ========================================================================= -->
        <div v-if="activeMainTab === 'taxonomy'" class="space-y-6 animate-slide-in">
          <div class="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-indigo-400 font-mono">
                  TAXONOMY & DATA SPECIFICATION
                </span>
                <h2 class="text-lg sm:text-xl font-black text-white mt-1">
                  Klasifikasi 6 Kategori Sumber Data Pendukung CABA–CCBN
                </h2>
                <p class="text-xs text-slate-400 mt-1">
                  Struktur formal klasifikasi sumber data berdasarkan Proposal Disertasi Revisi 2 untuk mengondisikan baseline analitik secara objektif.
                </p>
              </div>

              <div class="flex items-center gap-2">
                <span class="text-xs text-slate-400">Total Kategori: <strong class="text-white">6 (A s.d. F)</strong></span>
              </div>
            </div>

            <!-- 6 Taxonomy Category Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <!-- CATEGORY A: CONTEXT DATA -->
              <div class="p-5 rounded-2xl bg-gradient-to-b from-blue-950/30 to-slate-900/90 border border-blue-500/30 flex flex-col justify-between space-y-4 hover:border-blue-500/50 transition shadow-lg">
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="px-2.5 py-1 rounded-md font-mono text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      KATEGORI A
                    </span>
                    <span class="text-xs font-mono font-bold text-blue-400">Persamaan (2)</span>
                  </div>

                  <h3 class="text-base font-bold text-white flex items-center gap-2">
                    <span>🌐</span> Context Data ((c_{i,t}))
                  </h3>

                  <p class="text-xs text-slate-300 leading-relaxed">
                    Vektor profil 6-dimensi: <strong class="text-blue-300 font-mono">c_{i,t} = [T, I, O, D, W, S]</strong> yang mengondisikan lingkungan nyata pembelajaran ASN.
                  </p>

                  <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 text-xs text-slate-300">
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Temporal (T):</span> <span class="font-mono text-blue-300">Jam kerja / malam</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Infrastruktur (I):</span> <span class="font-mono text-blue-300">Bandwidth & stabilitas</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Organisasi (O):</span> <span class="font-mono text-blue-300">Dukungan instansi</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Device (D):</span> <span class="font-mono text-blue-300">Smartphone / Desktop</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Workload (W):</span> <span class="font-mono text-blue-300">Beban tugas kedinasan</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Spatial (S):</span> <span class="font-mono text-blue-300">Indeks komposit wilayah</span></div>
                  </div>
                </div>

                <div class="p-2.5 rounded-xl bg-blue-950/50 border border-blue-800/40 text-[11px] text-blue-200">
                  📌 <strong>Pernyataan Kunci:</strong> Kuesioner adalah instrumen akuisisi variabel konteks, bukan model inferensi CCBN itu sendiri.
                </div>
              </div>

              <!-- CATEGORY B: RAW BEHAVIORAL TRACES -->
              <div class="p-5 rounded-2xl bg-gradient-to-b from-purple-950/30 to-slate-900/90 border border-purple-500/30 flex flex-col justify-between space-y-4 hover:border-purple-500/50 transition shadow-lg">
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="px-2.5 py-1 rounded-md font-mono text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      KATEGORI B
                    </span>
                    <span class="text-xs font-mono font-bold text-purple-400">Persamaan (1)</span>
                  </div>

                  <h3 class="text-base font-bold text-white flex items-center gap-2">
                    <span>⚡</span> Raw Traces ((X_{i,t}))
                  </h3>

                  <p class="text-xs text-slate-300 leading-relaxed">
                    Jejak telemetri interaksi: <strong class="text-purple-300 font-mono">X_{i,t} = [login, dur, clicks, comp, art]</strong> sebagai log mentah aktivitas.
                  </p>

                  <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 text-xs text-slate-300">
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Sesi Akses:</span> <span class="font-mono text-purple-300">Timestamp login/logout</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Durasi Materi:</span> <span class="font-mono text-purple-300">Detik efektif interaksi</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Clickstream:</span> <span class="font-mono text-purple-300">Sekuens navigasi tombol</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Checkpoint:</span> <span class="font-mono text-purple-300">Progres pemutaran video</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Formatif:</span> <span class="font-mono text-purple-300">Skor kuis & artefak</span></div>
                  </div>
                </div>

                <div class="p-2.5 rounded-xl bg-purple-950/50 border border-purple-800/40 text-[11px] text-purple-200">
                  📌 <strong>Pernyataan Kunci:</strong> Jejak mentah adalah telemetri bukti; bukan vonis mutlak kecerdasan atau motivasi peserta.
                </div>
              </div>

              <!-- CATEGORY C: BEHAVIORAL EVIDENCE -->
              <div class="p-5 rounded-2xl bg-gradient-to-b from-emerald-950/30 to-slate-900/90 border border-emerald-500/30 flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition shadow-lg">
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="px-2.5 py-1 rounded-md font-mono text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      KATEGORI C
                    </span>
                    <span class="text-xs font-mono font-bold text-emerald-400">(B_{i,t}) Evidence</span>
                  </div>

                  <h3 class="text-base font-bold text-white flex items-center gap-2">
                    <span>🎯</span> Behavioral Evidence ((B_{i,t}))
                  </h3>

                  <p class="text-xs text-slate-300 leading-relaxed">
                    Evidensi perilaku teramati hasil transformasi jejak mentah menjadi bukti komposit keterlibatan belajar substantif.
                  </p>

                  <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 text-xs text-slate-300">
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Revisit Frequency:</span> <span class="font-mono text-emerald-300">Pengulangan materi</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Active Engagement:</span> <span class="font-mono text-emerald-300">Diskusi & pengerjaan kuis</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Multimodal Scope:</span> <span class="font-mono text-emerald-300">Fusi interaksi LMS</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Non-Engagement Score:</span> <span class="font-mono text-emerald-300">Bukan angka kaku tunggal</span></div>
                  </div>
                </div>

                <div class="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-800/40 text-[11px] text-emerald-200">
                  📌 <strong>Pernyataan Kunci:</strong> Evidensi (B_{i,t}) siap dibandingkan terhadap baseline wajar (b̂_{i,t}) di CCBN.
                </div>
              </div>

              <!-- CATEGORY D: MISSINGNESS & QUALITY -->
              <div class="p-5 rounded-2xl bg-gradient-to-b from-amber-950/30 to-slate-900/90 border border-amber-500/30 flex flex-col justify-between space-y-4 hover:border-amber-500/50 transition shadow-lg">
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="px-2.5 py-1 rounded-md font-mono text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      KATEGORI D
                    </span>
                    <span class="text-xs font-mono font-bold text-amber-400">Persamaan (3) & (4)</span>
                  </div>

                  <h3 class="text-base font-bold text-white flex items-center gap-2">
                    <span>🛡️</span> Observability & Missingness
                  </h3>

                  <p class="text-xs text-slate-300 leading-relaxed">
                    Evaluasi batas keteramatan: <strong class="text-amber-300 font-mono">m_{i,t} = 1 - (n_{obs}/n_{exp})</strong> dan skor keandalan <strong class="text-amber-300 font-mono">q_{i,t}</strong>.
                  </p>

                  <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 text-xs text-slate-300">
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Missingness (m):</span> <span class="font-mono text-amber-300">Rasio data hilang (MNAR)</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Kualitas (q):</span> <span class="font-mono text-amber-300">Keandalan sinyal telemetri</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Noise Penalty (λ):</span> <span class="font-mono text-amber-300">Diskon kualitas noise</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Non-Punitif:</span> <span class="font-mono text-amber-300">Bukan defisit motivasi</span></div>
                  </div>
                </div>

                <div class="p-2.5 rounded-xl bg-amber-950/50 border border-amber-800/40 text-[11px] text-amber-200">
                  📌 <strong>Pernyataan Kunci:</strong> Missingness (m_{i,t}) memicu *Baseline Validity Gate* (Eq. 18) untuk mencegah vonis salah.
                </div>
              </div>

              <!-- CATEGORY E: COMPOSITE SPATIAL DATA -->
              <div class="p-5 rounded-2xl bg-gradient-to-b from-teal-950/30 to-slate-900/90 border border-teal-500/30 flex flex-col justify-between space-y-4 hover:border-teal-500/50 transition shadow-lg">
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="px-2.5 py-1 rounded-md font-mono text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      KATEGORI E
                    </span>
                    <span class="text-xs font-mono font-bold text-teal-400">Persamaan (2a, 2b, 2c)</span>
                  </div>

                  <h3 class="text-base font-bold text-white flex items-center gap-2">
                    <span>🗺️</span> Spatial Moderator ((S_{i,t}))
                  </h3>

                  <p class="text-xs text-slate-300 leading-relaxed">
                    Penggabungan klaster makro (K_i) dan jaringan sesi (N_{i,t}): <strong class="text-teal-300 font-mono">S_{i,t} = δ K_i + (1 - δ) N_{i,t}</strong>.
                  </p>

                  <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 text-xs text-slate-300">
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Klaster Makro (K):</span> <span class="font-mono text-teal-300">BPS / Podes sinyal desa</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Sesi Jaringan (N):</span> <span class="font-mono text-teal-300">Throughput, latency, jitter</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Bobot Kalibrasi (δ):</span> <span class="font-mono text-teal-300">δ = 0.35 (default riset)</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Grouping (g ∈ G):</span> <span class="font-mono text-teal-300">3T vs Urban ilustratif riset</span></div>
                  </div>
                </div>

                <div class="p-2.5 rounded-xl bg-teal-950/50 border border-teal-800/40 text-[11px] text-teal-200">
                  📌 <strong>Pernyataan Kunci:</strong> Spasial adalah variabel moderator lingkungan dalam konteks (c_{i,t}); bukan penentu tunggal.
                </div>
              </div>

              <!-- CATEGORY F: VISUAL OBSERVABILITY -->
              <div class="p-5 rounded-2xl bg-gradient-to-b from-rose-950/30 to-slate-900/90 border border-rose-500/30 flex flex-col justify-between space-y-4 hover:border-rose-500/50 transition shadow-lg">
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="px-2.5 py-1 rounded-md font-mono text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      KATEGORI F
                    </span>
                    <span class="text-xs font-mono font-bold text-rose-400">Persamaan (10 & 10a)</span>
                  </div>

                  <h3 class="text-base font-bold text-white flex items-center gap-2">
                    <span>👁️</span> Supporting Visual Signals
                  </h3>

                  <p class="text-xs text-slate-300 leading-relaxed">
                    Sinyal kamera/visi on-device sebagai <strong class="text-rose-300">pendukung observabilitas</strong> tanpa pemaksaan bandwidth tinggi.
                  </p>

                  <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 text-xs text-slate-300">
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Bobot Adaptif (w):</span> <span class="font-mono text-rose-300">w(S, q_vis) turun di 3T</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Fusi Terbatas (F):</span> <span class="font-mono text-rose-300">F_{i,t} = w V_{i,t} + (1-w) b</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Privacy-Preserving:</span> <span class="font-mono text-rose-300">On-device edge inference</span></div>
                    <div class="flex items-center justify-between"><span class="text-slate-400">• Graceful Fallback:</span> <span class="font-mono text-rose-300">LMS telemetry primary</span></div>
                  </div>
                </div>

                <div class="p-2.5 rounded-xl bg-rose-950/50 border border-rose-800/40 text-[11px] text-rose-200">
                  📌 <strong>Pernyataan Kunci:</strong> Visual hanya sinyal observabilitas opsional, bukan vonis kepribadian atau kelulusan.
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 2: PROPOSAL ↔ DATASET TRACEABILITY MATRIX                             -->
        <!-- ========================================================================= -->
        <div v-if="activeMainTab === 'traceability'" class="space-y-6 animate-slide-in">
          <div class="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                  FORMAL TRACEABILITY MATRIX
                </span>
                <h2 class="text-lg sm:text-xl font-black text-white mt-1">
                  Matriks Keterlacakan Proposal Disertasi Revisi 2 ↔ Sumber Data
                </h2>
                <p class="text-xs text-slate-400 mt-1">
                  Pemetaan matematis dari konstruk proposal, persamaan, variabel telemetri, peran sistemik, hingga rute destinasi komputasi.
                </p>
              </div>

              <!-- Interactive Category Filter -->
              <div class="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  v-for="cat in ['All', 'Context', 'Evidence', 'Observability', 'Spatial', 'Decision']"
                  :key="cat"
                  @click="traceFilter = cat"
                  :class="`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    traceFilter === cat
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`"
                >
                  {{ cat }}
                </button>
              </div>
            </div>

            <!-- Traceability Data Table -->
            <div class="overflow-x-auto rounded-2xl border border-slate-800">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-950 text-slate-300 border-b border-slate-800 font-bold uppercase text-[11px] tracking-wider">
                    <th class="p-3.5">Konstruk Proposal</th>
                    <th class="p-3.5">Persamaan</th>
                    <th class="p-3.5">Sumber Data Empiris</th>
                    <th class="p-3.5">Variabel Kunci</th>
                    <th class="p-3.5">Peran dalam Arsitektur</th>
                    <th class="p-3.5">Destinasi Komputasi</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 font-sans">
                  <tr
                    v-for="t in filteredTraceabilityList"
                    :key="t.equation + t.construct"
                    class="hover:bg-slate-800/40 transition duration-150"
                  >
                    <td class="p-3.5 font-bold text-white flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                      {{ t.construct }}
                    </td>
                    <td class="p-3.5 font-mono font-bold whitespace-nowrap">
                      <span class="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                        {{ t.equation }}
                      </span>
                    </td>
                    <td class="p-3.5 text-slate-300">{{ t.dataSource }}</td>
                    <td class="p-3.5 font-mono text-[11px] text-slate-400">{{ t.variables }}</td>
                    <td class="p-3.5 text-slate-300">{{ t.role }}</td>
                    <td class="p-3.5">
                      <span class="px-2.5 py-1 rounded-md font-mono text-[11px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
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
        <!-- TAB 3: DATASET METADATA CATALOG & LIVE STREAM EXPLORER                   -->
        <!-- ========================================================================= -->
        <div v-if="activeMainTab === 'metadata_catalog'" class="space-y-6 animate-slide-in">
          <div class="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-purple-400 font-mono">
                  METADATA REPOSITORY & TELEMETRY STREAMS
                </span>
                <h2 class="text-lg sm:text-xl font-black text-white mt-1">
                  Katalog Metadata Sumber Data & Log Stream Interaksi
                </h2>
                <p class="text-xs text-slate-400 mt-1">
                  Eksplorasi skema data, variabel telemetri, dan sampel stream data operasional yang dapat diekspor untuk replikasi riset.
                </p>
              </div>

              <!-- Download Export Buttons -->
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  @click="exportCurrentDatasetCSV"
                  class="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition flex items-center gap-1.5 cursor-pointer border border-slate-700"
                >
                  <span>📥</span>
                  <span>Unduh CSV</span>
                </button>
                <button
                  type="button"
                  @click="exportCurrentDatasetJSON"
                  class="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition flex items-center gap-1.5 cursor-pointer border border-slate-700"
                >
                  <span>📋</span>
                  <span>Unduh JSON</span>
                </button>
              </div>
            </div>

            <!-- Stream Selector Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                type="button"
                v-for="st in cabaDatasetStreams"
                :key="st.id"
                @click="selectedCabaStream = st.id"
                :class="`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  selectedCabaStream === st.id
                    ? 'border-indigo-500 bg-indigo-950/40 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                    : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/40'
                }`"
              >
                <div>
                  <span class="text-xl mb-2 block">{{ st.icon }}</span>
                  <strong class="text-xs font-bold text-white block leading-tight">{{ st.title }}</strong>
                  <span class="text-[10px] text-slate-400 font-mono block mt-1">{{ st.filename }}</span>
                </div>
                <div class="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                  <span class="text-slate-400">{{ st.rows.length }} Records</span>
                  <span :class="selectedCabaStream === st.id ? 'text-indigo-400 font-bold' : 'text-slate-400'">Active Preview</span>
                </div>
              </button>
            </div>

            <!-- Active Stream Details & Filter -->
            <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div class="space-y-0.5">
                <span class="text-indigo-400 font-bold text-[11px] block">Deskripsi Log Stream:</span>
                <p class="text-slate-300">{{ currentActiveStreamObj.description }}</p>
              </div>
              <div class="shrink-0 flex items-center gap-2">
                <input
                  type="text"
                  v-model="datasetSearchQuery"
                  placeholder="Cari dalam stream..."
                  class="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-white text-xs w-48 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <!-- Stream Table Data Preview -->
            <div class="overflow-x-auto rounded-2xl border border-slate-800">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-950 text-slate-300 border-b border-slate-800 font-mono uppercase text-[11px]">
                    <th v-for="col in currentActiveStreamObj.columns" :key="col" class="p-3 whitespace-nowrap">
                      {{ col }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 font-mono text-[11px]">
                  <tr
                    v-for="(row, rIdx) in filteredStreamRows"
                    :key="rIdx"
                    class="hover:bg-slate-800/40 transition duration-150"
                  >
                    <td v-for="col in currentActiveStreamObj.columns" :key="col" class="p-3 whitespace-nowrap text-slate-200">
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
        <div v-if="activeMainTab === 'states_matrix'" class="space-y-6 animate-slide-in">
          <div class="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-1 rounded-md font-mono text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  🎯 OPERATIONAL SUPPORT STATES
                </span>
                <span class="text-xs font-bold text-slate-400">Kategori Dukungan Andragogis Lapangan</span>
              </div>
              <h2 class="text-lg sm:text-xl font-black text-white mt-2">
                4 Status Situasional Operasional Pembelajar (S1–S4)
              </h2>
              <p class="text-xs text-slate-400 mt-1 leading-relaxed">
                Status situasional S1–S4 merupakan <strong>kategori dukungan operasional</strong> untuk memicu logika intervensi adaptif suportif pada prototipe aplikasi. Status ini <strong>BUKAN</strong> definisi matematis CCBN, melainkan pengelompokan intervensi lapangan.
              </p>
            </div>

            <!-- S1-S4 Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="state in SITUATED_OPERATIONAL_STATES"
                :key="state.code"
                class="p-5 rounded-2xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between space-y-4 hover:border-slate-700 transition shadow-lg"
              >
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="px-3 py-1 rounded-lg font-mono font-black text-xs bg-indigo-600 text-white shadow">
                      {{ state.code }}
                    </span>
                    <span class="text-xs font-bold text-slate-400">{{ state.role }}</span>
                  </div>

                  <h3 class="text-base font-bold text-white">{{ state.name }}</h3>

                  <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <span class="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                      Sinyal Pemicu Telemetri (Triggers):
                    </span>
                    <ul class="text-xs text-slate-300 space-y-1">
                      <li v-for="t in state.triggers" :key="t" class="flex items-center gap-1.5">
                        <span class="text-indigo-400">•</span> {{ t }}
                      </li>
                    </ul>
                  </div>

                  <div class="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30 space-y-1">
                    <span class="text-[10px] font-bold uppercase text-emerald-400 block tracking-wider">
                      Aksi Dukungan Andragogis:
                    </span>
                    <span class="text-xs font-bold text-emerald-200 block">{{ state.supportAction }}</span>
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-amber-950/40 border border-amber-600/30 text-[11px] text-amber-300 leading-relaxed">
                  <strong>Disclaimer:</strong> {{ state.disclaimer }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 5: 4-LAYER CABA ARCHITECTURE DIAGRAM (MANUSCRIPT LINEAGE)             -->
        <!-- ========================================================================= -->
        <div v-if="activeMainTab === 'architecture'" class="space-y-6 animate-slide-in">
          <div class="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                  MANUSCRIPT LINEAGE ARTIFACT
                </span>
                <h2 class="text-lg sm:text-xl font-black text-white mt-1">
                  Diagram Arsitektur Empat Layer CABA (Figure 1 Manuskrip JISEBI)
                </h2>
                <p class="text-xs text-slate-400 mt-1">
                  Representasi konseptual empat layer awal yang mendasari evolusi menuju model matematika CABA–CCBN Proposal Disertasi Revisi 2.
                </p>
              </div>
            </div>

            <!-- Flow Architecture Diagram -->
            <div class="p-8 rounded-3xl bg-slate-950/80 border border-slate-800 flex flex-col items-center space-y-4">
              
              <!-- Layer 1: Signals -->
              <div class="w-full max-w-2xl p-5 rounded-2xl border border-indigo-500/40 bg-indigo-950/30 text-center shadow-lg">
                <div class="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">LAYER 1: SENSING & TELEMETRY</div>
                <div class="text-base font-black text-white mt-1">EVALUATE MULTIMODAL SIGNALS</div>
                <div class="text-xs text-slate-400 mt-1">
                  Temporal • Device • Network • Tab Focus • Playback Speed • Dwell Time
                </div>
              </div>

              <div class="text-indigo-400 text-lg">↓</div>

              <!-- Layer 2: Situations S1-S3 -->
              <div class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="p-4 rounded-2xl border border-blue-500/30 bg-blue-950/20 text-center space-y-1">
                  <span class="text-[10px] font-bold text-blue-400 uppercase">Situational S1</span>
                  <div class="text-sm font-bold text-white">Low-Engagement Risk</div>
                  <div class="text-[11px] text-slate-400">Speed 2x • Low Tab-Focus ➔ Stop-Gate Verification</div>
                </div>

                <div class="p-4 rounded-2xl border border-purple-500/30 bg-purple-950/20 text-center space-y-1">
                  <span class="text-[10px] font-bold text-purple-400 uppercase">Situational S2</span>
                  <div class="text-sm font-bold text-white">Office-Hour Learning</div>
                  <div class="text-[11px] text-slate-400">Office Hours • Dual Tasking ➔ Micro-Chunking (3–5m)</div>
                </div>

                <div class="p-4 rounded-2xl border border-teal-500/30 bg-teal-950/20 text-center space-y-1">
                  <span class="text-[10px] font-bold text-teal-400 uppercase">Situational S3</span>
                  <div class="text-sm font-bold text-white">Cognitive Struggling</div>
                  <div class="text-[11px] text-slate-400">Rewinds • High Dwell ➔ Adaptive Scaffolding</div>
                </div>
              </div>

              <div class="text-amber-400 text-lg">↓</div>

              <!-- Layer 3: S4 Spatial Constraint -->
              <div class="w-full max-w-4xl p-4 rounded-2xl border border-amber-500/40 bg-amber-950/20 text-center space-y-1">
                <span class="text-[10px] font-bold text-amber-400 uppercase">Situational S4 (Infrastructural Constraint)</span>
                <div class="text-sm font-bold text-white">Bandwidth & Electricity Constraints (3T Regions)</div>
                <div class="text-[11px] text-slate-400">Low Bandwidth • Buffer Stalls ➔ Audio-First Podcast Mode + Offline PWA Caching</div>
              </div>

              <div class="text-emerald-400 text-lg">↓</div>

              <!-- Layer 4: Evidence Accumulation -->
              <div class="w-full max-w-2xl p-5 rounded-2xl border border-emerald-500/40 bg-emerald-950/30 text-center shadow-lg">
                <div class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">LAYER 4: EQUITABLE ACCUMULATION</div>
                <div class="text-base font-black text-white mt-1">ADJUSTED EVIDENCE ACCUMULATION</div>
                <div class="text-xs text-slate-400 mt-1">
                  Akumulasi bukti autentik tanpa vonis kaku durasi pemutaran video linear.
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 6: REFERENCES & BENCHMARK DATASETS                                    -->
        <!-- ========================================================================= -->
        <div v-if="activeMainTab === 'references'" class="space-y-6 animate-slide-in">
          <div class="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                  BIBLIOGRAPHY & BENCHMARKS
                </span>
                <h2 class="text-lg sm:text-xl font-black text-white mt-1">
                  22 Referensi Manuskrip JISEBI & Benchmark Datasets Terbuka
                </h2>
              </div>

              <div class="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  @click="refCategoryFilter = 'all'"
                  :class="`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${refCategoryFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`"
                >
                  Semua
                </button>
                <button
                  type="button"
                  v-for="c in refCategories"
                  :key="c"
                  @click="refCategoryFilter = c"
                  :class="`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${refCategoryFilter === c ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`"
                >
                  {{ c }}
                </button>
              </div>
            </div>

            <!-- References Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="r in filteredJisebiReferences"
                :key="r.key"
                class="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between space-y-3 hover:border-slate-700 transition"
              >
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between gap-2">
                    <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      [{{ r.key }}]
                    </span>
                    <span class="text-[10px] text-slate-400 font-semibold">{{ r.year }} • {{ r.category }}</span>
                  </div>

                  <strong class="text-white block text-xs leading-snug">{{ r.title }}</strong>
                  <p class="text-[11px] text-slate-400 italic">{{ r.authors }} ({{ r.source }})</p>
                </div>

                <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                  <strong class="text-indigo-400">Relevansi CABA:</strong> {{ r.relevance }}
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      <!-- ========================================================================= -->
      <!-- 4. BOTTOM PROMINENT JUMP TO /analisis                                     -->
      <!-- ========================================================================= -->
      <section class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-emerald-950 border border-indigo-500/40 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div class="space-y-2 max-w-3xl">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                PROCEED TO ENGINE
              </span>
              <span class="text-xs text-slate-300 font-bold">CCBN Computational Decision Lab</span>
            </div>
            <h3 class="text-lg sm:text-2xl font-black text-white">
              Siap Menghitung Baseline Wajar & Kebijakan Intervensi?
            </h3>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Gunakan vektor konteks ((c_{i,t})), evidensi perilaku ((B_{i,t})), dan observabilitas ((q_{i,t})) yang telah didefinisikan pada Data Hub ini ke dalam model matematika CCBN ((b̂_{i,t})), analisis disparitas ((D_t)), serta kebijakan multi-objektif LinUCB di <code class="text-emerald-400 font-bold">/analisis</code>.
            </p>
          </div>

          <NuxtLink
            to="/analisis"
            class="px-6 py-3.5 rounded-2xl font-black text-sm text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all duration-200 flex items-center gap-2 shadow-xl shadow-emerald-500/20 shrink-0 no-underline cursor-pointer group"
          >
            <span>Buka Lab Komputasi CCBN (/analisis)</span>
            <span class="group-hover:translate-x-1 transition-transform">→</span>
          </NuxtLink>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Navbar from '~/components/Navbar.vue';

// Centralized CABA Metadata & Traceability
import {
  CABA_DATASETS_METADATA,
  SITUATED_OPERATIONAL_STATES,
  RESEARCH_LINEAGE_STAGES,
  PROPOSAL_DATASET_TRACEABILITY
} from '~/data/caba';

// Hub Tabs Definition
const hubTabs = [
  { id: 'taxonomy', label: '1. Taksonomi Sumber Data (6 Kategori)', icon: '🗂️', badge: 'A–F' },
  { id: 'traceability', label: '2. Matriks Traceability Proposal', icon: '🔗', badge: '17 Konstruk' },
  { id: 'metadata_catalog', label: '3. Katalog Metadata & Telemetri', icon: '📋', badge: 'Streams' },
  { id: 'states_matrix', label: '4. Status Situasional (S1–S4)', icon: '🎯', badge: 'Andragogi' },
  { id: 'architecture', label: '5. Diagram 4-Layer (Lineage)', icon: '🗺️', badge: 'Figure 1' },
  { id: 'references', label: '6. Referensi & Benchmark', icon: '📚', badge: '22 Papers' }
];

// Active State
const activeMainTab = ref<string>('taxonomy');
const traceFilter = ref<string>('All');
const selectedCabaStream = ref<string>('telemetry_stream');
const datasetSearchQuery = ref<string>('');
const refCategoryFilter = ref<string>('all');
const jisebiReferences = ref<any[]>([]);
const benchmarkDatasets = ref<any[]>([]);
const loading = ref<boolean>(true);

// Filtered Traceability
const filteredTraceabilityList = computed(() => {
  if (traceFilter.value === 'All') return PROPOSAL_DATASET_TRACEABILITY;
  return PROPOSAL_DATASET_TRACEABILITY.filter(t => t.category === traceFilter.value);
});

// Telemetry Streams Config
interface CabaStreamConfig {
  id: string;
  title: string;
  icon: string;
  description: string;
  filename: string;
  columns: string[];
  rows: Record<string, string>[];
}

const cabaDatasetStreams: CabaStreamConfig[] = [
  {
    id: 'telemetry_stream',
    title: 'Stream 1: Telemetri Sesi & Evidensi (B)',
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
    title: 'Stream 2: Bobot Spasial Komposit (S)',
    icon: '⚖️',
    filename: 'spatial_composite_index_stream.csv',
    description: 'Matriks parameter normalisasi Indeks Spasial Komposit S_{i,t} = δ K_i + (1-δ) N_{i,t} dari data BPS/Podes dan telemetri jaringan.',
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
    title: 'Stream 3: Missingness (m) & Kualitas (q)',
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
    title: 'Stream 4: Validasi Ahli & HITL Logs',
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

// CSV / JSON Exporters
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
    transform: translateY(8px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
