<template>
  <div class="app-container">
    <!-- Navbar Header -->
    <Navbar />

    <main id="konten-utama" class="main-content" style="max-width: 1440px; margin: 0 auto; padding: 1.5rem 1rem;">
      <div class="flex flex-col h-full bg-slate-50/60 text-slate-900 p-2 sm:p-4 rounded-2xl overflow-y-auto space-y-6">
        
        <!-- ========================================================================= -->
        <!-- HEADER UTAMA JURNAL JISEBI & METADATA PAPER CABA FRAMEWORK               -->
        <!-- ========================================================================= -->
        <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col gap-4">
          
          <!-- Journal & Indexing Bar -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2 text-[11px] text-slate-500 font-mono">
            <div>
              <span class="font-bold text-slate-800">Journal of Information Systems Engineering and Business Intelligence (JISEBI)</span>
              <span class="hidden md:inline"> • Vol.X, No.X, February/June/October XXXX</span>
            </div>
            <div class="flex items-center gap-3">
              <span>ISSN: 2443-2555 (online) / 2598-6333 (print)</span>
              <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">Open Access (CC BY 4.0)</span>
            </div>
          </div>

          <!-- Title & Core Presentation -->
          <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pt-1">
            <div class="space-y-2">
              <div class="flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  <span>🏛️</span> DSR Artifact: CABA Framework
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                  <span>⚙️</span> 4-Layer Architecture Pipeline
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span>⚖️</span> Spatial-Aware Algorithmic Equity
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  <span>🎯</span> 4 Situated Learner States (S1–S4)
                </span>
              </div>

              <h1 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                Context-Aware Behavioral Analytics for Adaptive Public Sector Training: A Conceptual Baseline Informed by Preliminary Observational Insights and Framework Design
              </h1>

              <div class="text-xs text-slate-600 font-medium">
                <strong>First Author <sup>1)*</sup>, Second Author <sup>2)</sup>, Third Author <sup>3)</sup></strong>
                <span class="text-slate-400 mx-2">|</span>
                <span>Konteks Empiris: Pelatihan Aparatur Sipil Negara (ASN) & Lembaga Administrasi Negara (LAN RI)</span>
              </div>
            </div>

            <!-- ACTION BUTTONS -->
            <div class="flex items-center gap-2 self-start flex-wrap shrink-0">
              <button
                type="button"
                @click="showAbstract = !showAbstract"
                class="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <span>📄</span>
                <span>{{ showAbstract ? 'Tutup Abstrak' : 'Baca Abstrak JISEBI' }}</span>
              </button>
              <button
                type="button"
                @click="fetchDatasetHubData"
                :disabled="loading"
                class="px-3 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <span :class="{ 'animate-spin': loading }">🔄</span>
                <span>Refresh Data</span>
              </button>
              <NuxtLink
                to="/model"
                class="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer flex items-center gap-1.5 shadow-2xs no-underline"
              >
                <span>📐</span>
                <span>Model SEM-PLS →</span>
              </NuxtLink>
            </div>
          </div>

          <!-- COLLAPSIBLE STRUCTURED ABSTRACT -->
          <div v-if="showAbstract" class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2.5 animate-slide-in">
            <div class="flex items-center justify-between font-bold text-slate-900 border-b border-slate-200 pb-1.5">
              <span class="uppercase tracking-wider text-[11px] text-blue-900">📑 Structured Abstract (JISEBI Standard)</span>
              <span class="text-[10px] text-slate-500 font-normal">doi: 10.20473/jisebi.X.X.pp-pp</span>
            </div>
            <p><strong>Background:</strong> Digital transformation in public governance has expanded the use of Learning Management Systems for Public Sector Training, yet many platforms remain context-blind. Conventional Learning Analytics often interprets watch time, login frequency, completion status, and post-test scores without considering fragmented work schedules, infrastructural disparity, device constraints, and low-engagement learning patterns among civil servants.</p>
            <p><strong>Objective:</strong> This study proposes a Context-Aware Behavioral Analytics (CABA) framework for Adaptive Learning in civil servant professional development. The objective is to show how Context-Aware Computing can be used to interpret learner behavior in relation to workplace demands, spatial-infrastructural conditions, organizational routines, and attentional constraints.</p>
            <p><strong>Methods:</strong> Using a Design Science Research approach, this study develops a proof-of-concept artifact based on structured literature synthesis, policy document analysis, and contextual inquiry into Indonesian civil servant learning conditions. The framework is grounded in situated cognition, self-regulated learning, cognitive load theory, and andragogy to support Civil Service Competency development under heterogeneous service-work and infrastructure conditions.</p>
            <p><strong>Results:</strong> The resulting CABA artifact consists of a four-layer architecture: context sensing and behavioral telemetry, learner-state inference, adaptive decision logic, and situated support delivery. The framework introduces Spatial-Aware Algorithmic Equity to normalize engagement metrics against spatial, device, workload, and network profiles. It also operationalizes Dynamic Modality Trade-off and Authentic Evidence Accumulation, enabling Engagement-Aware Learning through micro-chunking, scenario checkpoints, scaffolded explanations, offline-first caching, audio-first fallback, and asynchronous telemetry synchronization.</p>
            <p><strong>Conclusion:</strong> CABA reframes behavioral telemetry as contextual evidence for pedagogical support rather than as a surveillance mechanism. By replacing uniform completion assumptions with context-sensitive evidence accumulation, the framework offers a proof-of-concept architectural blueprint for fairer, more adaptive government e-learning ecosystems that respect civil servants' workload, infrastructure constraints, and privacy boundaries.</p>
            <div class="pt-2 border-t border-slate-200 flex flex-wrap items-center gap-1.5 text-[11px]">
              <span class="font-bold text-slate-900">Keywords:</span>
              <span v-for="kw in keywordsList" :key="kw" class="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-medium">
                {{ kw }}
              </span>
            </div>
          </div>

          <!-- SUB TABS NAVIGATION SESUAI STRUKTUR MANUSKRIP -->
          <div class="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap">
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
              <span>1. Arsitektur 4-Layer CABA & Diagram Fig. 1</span>
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
              <span>📊</span>
              <span>2. Matriks 4 Situated Learner States (Tabel II)</span>
            </button>

            <button
              type="button"
              @click="activeMainTab = 'paradigm_theories'"
              :class="`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeMainTab === 'paradigm_theories'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`"
            >
              <span>⚖️</span>
              <span>3. Komparasi Paradigma & Landasan Teori (Tabel I)</span>
            </button>

            <button
              type="button"
              @click="activeMainTab = 'scenarios'"
              :class="`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeMainTab === 'scenarios'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`"
            >
              <span>🎬</span>
              <span>4. Demonstrasi Skenario Operasional (Section III-D)</span>
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
              <span>5. 22 Referensi Paper JISEBI & Benchmark Datasets</span>
            </button>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 1: ARSITEKTUR 4-LAYER CABA & DIAGRAM ALUR FIG. 1                     -->
        <!-- ========================================================================= -->
        <div v-if="activeMainTab === 'architecture'" class="space-y-6">
          
          <!-- Banner Pengantar Arsitektur -->
          <div class="p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-white border border-blue-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300 mb-1.5">
                💡 Figure 1: The Four-Layer Architecture of CABA Framework
              </span>
              <h2 class="text-base font-black text-slate-900">
                Alur Multi-Signal Reasoning & Penyesuaian Metrik Kelulusan Autentik
              </h2>
              <p class="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                Menghubungkan telemetri non-invasif (kecepatan video, tab focus, buffering) dengan kondisi kontekstual (jam kantor, dinas luar, jaringan 3T) untuk mengestimasi 4 state pembelajar secara probabilistik dan adil.
              </p>
            </div>
            <div class="shrink-0 text-xs font-bold text-slate-600 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs">
              Klik pada tiap blok diagram di bawah untuk melihat preview data & aturan inferensi ⬇️
            </div>
          </div>

          <!-- DIAGRAM CANVAS INTERAKTIF FIG. 1 -->
          <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col items-center">
            
            <div class="text-center mb-6">
              <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Gambar 1 (Figure 1 Manuskrip JISEBI)</span>
              <h3 class="text-sm font-black text-slate-900 mt-0.5">
                ARSITEKTUR EMPAT LAYER CONTEXT-AWARE BEHAVIORAL ANALYTICS (CABA)
              </h3>
            </div>

            <!-- LEVEL 1: TOP BOX EVALUATE SIGNALS -->
            <div
              @click="openFigureModal('evaluate_signals')"
              :class="`w-full max-w-xl p-4 rounded-xl border-2 transition cursor-pointer text-center relative ${
                selectedFigureNode === 'evaluate_signals'
                  ? 'border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-300'
                  : 'border-slate-800 bg-slate-900 text-white hover:bg-slate-800'
              }`"
            >
              <div :class="`text-sm font-black uppercase tracking-wider ${selectedFigureNode === 'evaluate_signals' ? 'text-blue-950' : 'text-white'}`">
                EVALUATE SIGNALS
              </div>
              <div :class="`text-xs font-semibold mt-0.5 ${selectedFigureNode === 'evaluate_signals' ? 'text-blue-800' : 'text-slate-300'}`">
                Multi-signal Reasoning Layer (Context Sensing + Behavioral Telemetry)
              </div>
              <div :class="`text-[11px] mt-1 ${selectedFigureNode === 'evaluate_signals' ? 'text-slate-600' : 'text-slate-400'}`">
                Temporal Workload • Device Category • Network Profiles • Tab Focus • Playback Speed • Dwell Time
              </div>
            </div>

            <!-- BRANCHING ARROWS DOWN -->
            <div class="w-full max-w-3xl flex justify-around py-2 text-slate-400 text-xs">
              <span>┌─────────────────────────────────</span>
              <span>┼</span>
              <span>─────────────────────────────────┐</span>
            </div>

            <!-- LEVEL 2: 3 PARALLEL STATES (S1, S2, S3) -->
            <div class="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-3">
              
              <!-- S1: Low-Engagement Completion Risk -->
              <div
                @click="openFigureModal('state_s1')"
                :class="`p-4 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between ${
                  selectedFigureNode === 'state_s1'
                    ? 'border-blue-600 bg-blue-50/90 shadow-md ring-2 ring-blue-300'
                    : 'border-blue-300 bg-blue-50/40 hover:bg-blue-50'
                }`"
              >
                <div>
                  <div class="text-xs font-black text-blue-950 uppercase tracking-wide">
                    S1: Low-Engagement Completion Risk
                  </div>
                  <div class="mt-2 text-xs font-semibold text-slate-700">Triggers:</div>
                  <ul class="text-[11px] text-slate-600 mt-1 space-y-0.5">
                    <li>• Speed 2x</li>
                    <li>• Low tab focus</li>
                    <li>• Deadline near</li>
                    <li>• Skip to end</li>
                  </ul>
                </div>
                <div class="mt-3 pt-2.5 border-t border-blue-200">
                  <div class="text-[10px] font-bold uppercase tracking-wider text-blue-900">TRADE-OFF:</div>
                  <div class="text-xs font-bold text-blue-800 mt-0.5">
                    Interactive Summary + 3 Spot-Tests
                  </div>
                </div>
              </div>

              <!-- S2: Fragmented Office-Hour Learning -->
              <div
                @click="openFigureModal('state_s2')"
                :class="`p-4 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between ${
                  selectedFigureNode === 'state_s2'
                    ? 'border-indigo-600 bg-indigo-50/90 shadow-md ring-2 ring-indigo-300'
                    : 'border-indigo-300 bg-indigo-50/40 hover:bg-indigo-50'
                }`"
              >
                <div>
                  <div class="text-xs font-black text-indigo-950 uppercase tracking-wide">
                    S2: Fragmented Office-Hour Learning
                  </div>
                  <div class="mt-2 text-xs font-semibold text-slate-700">Triggers:</div>
                  <ul class="text-[11px] text-slate-600 mt-1 space-y-0.5">
                    <li>• Office hours</li>
                    <li>• High tab-switching</li>
                    <li>• Service interruptions</li>
                    <li>• Short bursts</li>
                  </ul>
                </div>
                <div class="mt-3 pt-2.5 border-t border-indigo-200">
                  <div class="text-[10px] font-bold uppercase tracking-wider text-indigo-900">TRADE-OFF:</div>
                  <div class="text-xs font-bold text-indigo-800 mt-0.5">
                    State Preservation + Micro-chunking (3–5 min)
                  </div>
                </div>
              </div>

              <!-- S3: Cognitive Struggling -->
              <div
                @click="openFigureModal('state_s3')"
                :class="`p-4 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between ${
                  selectedFigureNode === 'state_s3'
                    ? 'border-cyan-600 bg-cyan-50/90 shadow-md ring-2 ring-cyan-300'
                    : 'border-cyan-300 bg-cyan-50/40 hover:bg-cyan-50'
                }`"
              >
                <div>
                  <div class="text-xs font-black text-cyan-950 uppercase tracking-wide">
                    S3: Cognitive Struggling
                  </div>
                  <div class="mt-2 text-xs font-semibold text-slate-700">Triggers:</div>
                  <ul class="text-[11px] text-slate-600 mt-1 space-y-0.5">
                    <li>• Frequent rewind</li>
                    <li>• Long pause</li>
                    <li>• Extended dwell time</li>
                    <li>• Low quiz score</li>
                  </ul>
                </div>
                <div class="mt-3 pt-2.5 border-t border-cyan-200">
                  <div class="text-[10px] font-bold uppercase tracking-wider text-cyan-900">TRADE-OFF:</div>
                  <div class="text-xs font-bold text-cyan-800 mt-0.5">
                    Adaptive Scaffold: Infographic + Analogy + Hints
                  </div>
                </div>
              </div>

            </div>

            <!-- ARROWS MERGE DOWN TO S4 -->
            <div class="w-full max-w-3xl flex justify-around py-2 text-slate-400 text-xs">
              <span>└─────────────────────────────────</span>
              <span>┼</span>
              <span>─────────────────────────────────┘</span>
            </div>
            <div class="text-slate-400 text-lg leading-none">▼</div>

            <!-- LEVEL 3: S4 INFRASTRUCTURAL CONSTRAINT (3T) -->
            <div
              @click="openFigureModal('state_s4')"
              :class="`w-full max-w-3xl p-4 rounded-xl border-2 transition cursor-pointer my-2 ${
                selectedFigureNode === 'state_s4'
                  ? 'border-amber-600 bg-amber-50 shadow-md ring-2 ring-amber-300'
                  : 'border-amber-300 bg-amber-50/50 hover:bg-amber-50'
              }`"
            >
              <div class="text-xs font-black text-amber-950 uppercase tracking-wide text-center">
                S4: Infrastructural Constraint (3T Regions & Low Bandwidth)
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-xs">
                <div class="p-2.5 rounded-lg bg-white/80 border border-amber-200">
                  <span class="font-bold text-slate-700 block mb-1">Triggers:</span>
                  <ul class="text-[11px] text-slate-600 space-y-0.5">
                    <li>• Low throughput & high packet loss</li>
                    <li>• Repeated buffering events & stalls</li>
                    <li>• Mobile + EDGE connectivity profile</li>
                  </ul>
                </div>
                <div class="p-2.5 rounded-lg bg-white/80 border border-amber-200">
                  <span class="font-bold text-amber-900 block mb-1">Trade-offs & Fallbacks:</span>
                  <ul class="text-[11px] text-amber-800 space-y-0.5">
                    <li>• <strong>Audio-first podcast mode</strong> (hemat bandwidth)</li>
                    <li>• <strong>Offline PWA cache</strong> (unduh lokal)</li>
                    <li>• <strong>Async telemetry sync</strong> (sinkronisasi tertunda)</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- ARROW DOWN TO ADJUSTED COMPLETION METRIC -->
            <div class="flex flex-col items-center py-2 text-slate-400">
              <span class="text-lg leading-none">│</span>
              <span class="text-lg leading-none">▼</span>
            </div>

            <!-- LEVEL 4: ADJUSTED COMPLETION METRIC -->
            <div
              @click="openFigureModal('adjusted_metric')"
              :class="`w-full max-w-xl p-4 rounded-xl border-2 transition cursor-pointer text-center relative ${
                selectedFigureNode === 'adjusted_metric'
                  ? 'border-emerald-600 bg-emerald-50 shadow-md ring-2 ring-emerald-300'
                  : 'border-emerald-500 bg-emerald-50/70 hover:bg-emerald-50'
              }`"
            >
              <span class="absolute -top-3 left-4 px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold uppercase tracking-wider">
                Output Metrik Keadilan Kontekstual
              </span>
              <div class="text-xs font-black text-emerald-950 uppercase tracking-wider">
                ADJUSTED COMPLETION METRIC
              </div>
              <div class="text-xs font-bold text-emerald-800 mt-0.5">
                Authentic Evidence Accumulation + Spatial-Aware Algorithmic Equity
              </div>
              <div class="text-[11px] text-slate-600 mt-1">
                Mengganti syarat kaku 100% linear watch time dengan akumulasi bukti pemahaman berbasis skenario, aktivitas offline terverifikasi, dan normalisasi disparitas infrastruktur.
              </div>
            </div>

          </div>

          <!-- 4-LAYER ARCHITECTURAL CARDS BREAKDOWN -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <!-- Layer 1 -->
            <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">Layer 1</span>
                <h4 class="text-xs font-bold text-slate-900 mt-1.5">Context Sensing & Telemetry</h4>
                <p class="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Menangkap data temporal (jam kantor vs malam), kategori perangkat, kondisi jaringan (throughput, latency), serta telemetri non-invasif (tab focus, scrubbing, dwell time).
                </p>
              </div>
              <div class="mt-3 pt-2 border-t border-slate-100 text-[10px] font-semibold text-blue-700">
                Non-invasive LMS & Zoom Telemetry
              </div>
            </div>

            <!-- Layer 2 -->
            <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">Layer 2</span>
                <h4 class="text-xs font-bold text-slate-900 mt-1.5">Learner-State Inference</h4>
                <p class="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Melakukan <em>multi-signal reasoning</em> untuk memetakan kombinasi pemicu ke dalam 4 status situasional (S1: Compliance Risk, S2: Office-Hour, S3: Struggle, S4: 3T Constraint).
                </p>
              </div>
              <div class="mt-3 pt-2 border-t border-slate-100 text-[10px] font-semibold text-indigo-700">
                Probabilistic Conjunction Engine
              </div>
            </div>

            <!-- Layer 3 -->
            <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">Layer 3</span>
                <h4 class="text-xs font-bold text-slate-900 mt-1.5">Adaptive Decision Logic</h4>
                <p class="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Menerapkan <em>Spatial-Aware Algorithmic Equity</em> dan <em>Dynamic Modality Trade-Off</em> dengan aturan andragogi dan <em>intervention cooldown</em> untuk mencegah alert fatigue.
                </p>
              </div>
              <div class="mt-3 pt-2 border-t border-slate-100 text-[10px] font-semibold text-purple-700">
                Fairness & Modality Trade-off Logic
              </div>
            </div>

            <!-- Layer 4 -->
            <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Layer 4</span>
                <h4 class="text-xs font-bold text-slate-900 mt-1.5">Situated Support Delivery</h4>
                <p class="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Mendistribusikan intervensi pedagogis tepat sasaran: micro-chunking 3-5 menit, scenario stop-gates, scaffolding worked examples, dan offline PWA audio fallback.
                </p>
              </div>
              <div class="mt-3 pt-2 border-t border-slate-100 text-[10px] font-semibold text-emerald-700">
                Authentic Evidence Accumulation
              </div>
            </div>

          </div>

          <!-- MODAL DETAIL POP-UP (INTERACTIVE INSPECTOR FIG. 1) -->
          <div
            v-if="isFigureModalOpen && currentFigureDetail"
            class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-6 transition-opacity"
            @click.self="closeFigureModal"
          >
            <div class="w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-slide-in text-slate-900">
              
              <!-- Modal Header -->
              <div class="p-5 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-3">
                <div>
                  <div class="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 uppercase tracking-wider">
                      {{ currentFigureDetail.layer }}
                    </span>
                    <span class="text-[11px] text-slate-500 font-semibold">
                      Spesifikasi Manuskrip JISEBI & Data Empiris
                    </span>
                  </div>
                  <h3 class="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    {{ currentFigureDetail.title }}
                  </h3>
                </div>
                <button
                  type="button"
                  @click="closeFigureModal"
                  class="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition cursor-pointer text-base"
                  title="Tutup (ESC)"
                >
                  ✕
                </button>
              </div>

              <!-- Modal Body -->
              <div class="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs">
                
                <!-- Deskripsi Konseptual -->
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed space-y-1.5">
                  <span class="font-bold text-slate-900 block text-xs">🎯 Penjelasan Teoretis & Logika Komputasi:</span>
                  <p>{{ currentFigureDetail.description }}</p>
                </div>

                <!-- PREVIEW TABEL DATASET NYATA -->
                <div v-if="currentFigureDetail.sampleTable" class="space-y-2">
                  <div class="flex items-center justify-between flex-wrap gap-2">
                    <span class="font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <span>📊</span> Struktur Data Telemetri / Matriks Inferensi (Sample Data):
                    </span>
                    <span class="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-100 text-blue-700 border border-slate-200 font-bold">
                      📁 {{ currentFigureDetail.sampleTable.name }}
                    </span>
                  </div>

                  <div class="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs">
                    <table class="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr class="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                          <th v-for="col in currentFigureDetail.sampleTable.columns" :key="col" class="p-2.5 whitespace-nowrap text-[11px]">
                            {{ col }}
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-100 font-mono text-[11px]">
                        <tr v-for="(row, rIdx) in currentFigureDetail.sampleTable.rows" :key="rIdx" class="hover:bg-blue-50/40">
                          <td v-for="col in currentFigureDetail.sampleTable.columns" :key="col" class="p-2.5 whitespace-nowrap text-slate-800">
                            {{ row[col] }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Pemicu & Kebijakan Intervensi Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                      ⚡ Sinyal & Pemicu (Contextual Triggers)
                    </span>
                    <ul class="space-y-1 text-xs text-slate-800">
                      <li v-for="(t, idx) in currentFigureDetail.triggers" :key="idx" class="flex items-start gap-1.5">
                        <span class="text-blue-600 font-bold">•</span>
                        <span>{{ t }}</span>
                      </li>
                    </ul>
                  </div>

                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                      🛠️ Kebijakan Adaptasi & Rasional Pedagogis
                    </span>
                    <div class="text-xs text-slate-800">
                      <strong>Kebijakan Adaptasi:</strong> {{ currentFigureDetail.policy }}
                    </div>
                    <div class="text-xs text-slate-700 leading-relaxed mt-1">
                      <strong>Rasional Pedagogis:</strong> {{ currentFigureDetail.rationale }}
                    </div>
                  </div>
                </div>

              </div>

              <!-- Modal Footer -->
              <div class="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                <span class="text-xs text-slate-500">
                  Manuskrip JISEBI: Context-Aware Behavioral Analytics (CABA)
                </span>
                <button
                  type="button"
                  @click="closeFigureModal"
                  class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer shadow-2xs"
                >
                  Tutup Rincian
                </button>
              </div>

            </div>
          </div>

        </div>

        <!-- ========================================================================= -->
        <!-- TAB 2: MATRIKS 4 SITUATED LEARNER STATES (TABEL II MANUSKRIP)            -->
        <!-- ========================================================================= -->
        <div v-else-if="activeMainTab === 'states_matrix'" class="space-y-6">
          
          <!-- Banner Pengantar Tabel II -->
          <div class="p-6 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-white border border-purple-200 shadow-xs">
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                📊 Tabel II Manuskrip JISEBI: Situated Learner-State Inference Policies
              </span>
            </div>
            <h2 class="text-xl font-black text-slate-900">
              Tipologi 4 Status Pembelajar Kedinasan & Kebijakan Intervensi Adaptif
            </h2>
            <p class="text-xs sm:text-sm text-slate-600 mt-1 max-w-4xl leading-relaxed">
              Status pembelajar tidak diposisikan sebagai label statis individu, melainkan kondisi kontekstual dinamis yang memerlukan inferensi multi-sinyal guna mencegah <em>Contextual Attribution Error</em> (menghukum ASN atas kendala di luar kendali mereka).
            </p>
          </div>

          <!-- TABEL II RESMI MANUSKRIP JISEBI -->
          <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
              <h3 class="text-sm font-black text-slate-900 uppercase">
                TABLE II. Situated Learner-State Inference Policies in the CABA Framework
              </h3>
              <span class="px-2.5 py-0.5 rounded bg-blue-50 text-blue-800 font-mono text-[11px] font-bold border border-blue-200">
                Section III-A Proof-of-Concept Baseline
              </span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                    <th class="p-3 w-44">Inferred State</th>
                    <th class="p-3 w-48">Contextual Triggers</th>
                    <th class="p-3">Target Adaptation Policy</th>
                    <th class="p-3">Pedagogical Rationale</th>
                    <th class="p-3 w-48">Actionable Trade-Off</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 text-slate-800">
                  
                  <!-- S1 -->
                  <tr class="hover:bg-blue-50/30 transition-colors">
                    <td class="p-3 font-bold text-blue-900 align-top">
                      <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px] block w-max mb-1">S1</span>
                      Low-Engagement Completion Risk
                    </td>
                    <td class="p-3 align-top text-slate-600">
                      Low tab-focus ratio, background playback, high acceleration (speed 2x), near deadline, skip to end.
                    </td>
                    <td class="p-3 align-top font-medium text-slate-900">
                      Active verification stop-gate with scenario checkpoint.
                    </td>
                    <td class="p-3 align-top text-slate-600 leading-relaxed">
                      Converts passive compliance into active cognitive processing before completion is credited.
                    </td>
                    <td class="p-3 align-top">
                      <span class="px-2 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200 font-bold text-[11px] block">
                        Interactive Summary + 3 Spot-Tests
                      </span>
                    </td>
                  </tr>

                  <!-- S2 -->
                  <tr class="hover:bg-indigo-50/30 transition-colors">
                    <td class="p-3 font-bold text-indigo-900 align-top">
                      <span class="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold text-[10px] block w-max mb-1">S2</span>
                      Fragmented Office-Hour Learning
                    </td>
                    <td class="p-3 align-top text-slate-600">
                      Office hours, desktop access, frequent interruptions, high tab-switching, short activity bursts.
                    </td>
                    <td class="p-3 align-top font-medium text-slate-900">
                      Dynamic modality trade-off: switch among micro-video, text brief, audio recap, or deferred checkpoint based on interruption density and available attention window.
                    </td>
                    <td class="p-3 align-top text-slate-600 leading-relaxed">
                      Preserves authentic evidence accumulation by recognizing fragmented attention as a service-context condition while maintaining competency-oriented checkpoints.
                    </td>
                    <td class="p-3 align-top">
                      <span class="px-2 py-1 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 font-bold text-[11px] block">
                        State Preservation + Micro-chunking (3–5 min)
                      </span>
                    </td>
                  </tr>

                  <!-- S3 -->
                  <tr class="hover:bg-cyan-50/30 transition-colors">
                    <td class="p-3 font-bold text-cyan-900 align-top">
                      <span class="px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-bold text-[10px] block w-max mb-1">S3</span>
                      Cognitive Struggling
                    </td>
                    <td class="p-3 align-top text-slate-600">
                      Repeated rewinds, long pauses, extended dwell time on single concept, low quiz performance.
                    </td>
                    <td class="p-3 align-top font-medium text-slate-900">
                      Scaffolded clarification through worked examples, hints, infographics, and simplified regulatory explanations.
                    </td>
                    <td class="p-3 align-top text-slate-600 leading-relaxed">
                      Reduces extraneous cognitive load and supports situated understanding of complex bureaucratic regulations.
                    </td>
                    <td class="p-3 align-top">
                      <span class="px-2 py-1 rounded bg-cyan-50 text-cyan-800 border border-cyan-200 font-bold text-[11px] block">
                        Adaptive Scaffold: Infographic + Analogy + Hints
                      </span>
                    </td>
                  </tr>

                  <!-- S4 -->
                  <tr class="hover:bg-amber-50/30 transition-colors">
                    <td class="p-3 font-bold text-amber-900 align-top">
                      <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px] block w-max mb-1">S4</span>
                      Infrastructural Constraint (Low Bandwidth / 3T Access)
                    </td>
                    <td class="p-3 align-top text-slate-600">
                      Low throughput, packet loss, repeated buffering stalls, mobile + EDGE network profile.
                    </td>
                    <td class="p-3 align-top font-medium text-slate-900">
                      Dynamic modality trade-off with offline-first caching, audio-first podcast fallback, compressed micro-content, and asynchronous telemetry synchronization.
                    </td>
                    <td class="p-3 align-top text-slate-600 leading-relaxed">
                      Accumulates authentic evidence despite connectivity gaps by adjusting completion metrics for buffering, packet loss, and deferred synchronization events [13]–[16].
                    </td>
                    <td class="p-3 align-top">
                      <span class="px-2 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[11px] block">
                        Audio-First Podcast + Offline PWA Cache + Async Sync
                      </span>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

          <!-- INTERACTIVE MULTI-SIGNAL INFERENCE SIMULATOR -->
          <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
              <div>
                <h3 class="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <span>🧠</span> SIMULATOR INFERENSI MULTI-SINYAL CABA (INTERACTIVE TESTBENCH)
                </h3>
                <p class="text-xs text-slate-500">
                  Uji bagaimana kombinasi sinyal telemetri dan konteks kedinasan menghasilkan inferensi state dan intervensi yang adil.
                </p>
              </div>
              <button
                type="button"
                @click="resetSimulator"
                class="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
              >
                Reset Simulator
              </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <!-- Input Sinyal Checkboxes -->
              <div class="lg:col-span-2 space-y-4">
                <span class="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                  1. Pilih Sinyal Telemetri & Konteks Kedinasan yang Terdeteksi:
                </span>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    v-for="sig in availableSignals"
                    :key="sig.id"
                    :class="`p-3 rounded-xl border transition cursor-pointer flex items-start gap-2.5 ${
                      activeSignalIds.includes(sig.id)
                        ? 'border-blue-500 bg-blue-50/70 shadow-xs'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70'
                    }`"
                  >
                    <input
                      type="checkbox"
                      :value="sig.id"
                      v-model="activeSignalIds"
                      class="mt-0.5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div class="text-xs">
                      <div class="font-bold text-slate-900">{{ sig.label }}</div>
                      <div class="text-[11px] text-slate-500 mt-0.5">{{ sig.desc }}</div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Output Hasil Inferensi -->
              <div class="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-blue-50/30 border border-slate-200 flex flex-col justify-between space-y-4">
                <div>
                  <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    2. Hasil Inferensi CABA Engine:
                  </span>
                  
                  <div v-if="simulatedResult.states.length === 0" class="p-4 rounded-xl bg-white border border-slate-200 text-center text-xs text-slate-500">
                    Pilih minimal 1 sinyal telemetri di sebelah kiri untuk melihat hasil inferensi adaptif.
                  </div>

                  <div v-else class="space-y-3">
                    <div
                      v-for="st in simulatedResult.states"
                      :key="st.code"
                      :class="`p-3.5 rounded-xl border ${st.badgeClass}`"
                    >
                      <div class="flex items-center justify-between">
                        <span class="text-xs font-black">{{ st.code }}: {{ st.name }}</span>
                        <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/80 border">
                          Confidence: {{ st.confidence }}%
                        </span>
                      </div>
                      <div class="mt-2 text-xs font-semibold">Kebijakan Adaptasi:</div>
                      <div class="text-[11px] mt-0.5">{{ st.policy }}</div>
                    </div>
                  </div>
                </div>

                <div v-if="simulatedResult.states.length > 0" class="p-3 rounded-xl bg-white border border-slate-200 space-y-1 text-xs text-slate-700">
                  <div class="font-bold text-slate-900">🛡️ Pencegahan Bias / Error:</div>
                  <div class="text-[11px] text-slate-600 leading-snug">
                    {{ simulatedResult.fairnessNote }}
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- NARRATIVE CASE EXAMPLES FROM MANUSCRIPT -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                Kasus Naratif S1 (Integrity Module)
              </span>
              <h4 class="text-xs font-bold text-slate-900">Penyelesaian Modul Integritas di Akhir Periode</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Seorang peserta ASN memutar video integritas wajib dengan kecepatan 2x sementara tab browser tidak aktif menjelang batas akhir pelaporan. CABA tidak mencap ini sebagai kecurangan, melainkan memicu <em>scenario-based checkpoint</em> singkat untuk memverifikasi pemahaman sebelum modul dinyatakan tuntas.
              </p>
            </div>

            <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">
                Kasus Naratif S2 (Disposisi Dinas Kantor)
              </span>
              <h4 class="text-xs font-bold text-slate-900">Belajar Pengadaan Barang/Jasa di Sela Layanan Warga</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Administrator daerah mempelajari modul pengadaan saat jam kerja tetapi sering berpindah tab untuk merespons pimpinan dan berkas warga. CABA mengenali disrupsi dinas ini dan mengubah sisa modul menjadi segmen video mikro 3 menit dan ringkasan audio recap.
              </p>
            </div>

            <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-100 text-cyan-800">
                Kasus Naratif S3 (Hambatan Regulasi Baru)
              </span>
              <h4 class="text-xs font-bold text-slate-900">Kebingungan Konseptual pada Regulasi Baru</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Pejabat fungsional memutar ulang bagian aturan etika berkali-kali dan mendapatkan nilai rendah pada kuis pengadaan. CABA menginterpretasikannya sebagai hambatan kognitif dan menyajikan <em>worked examples</em> serta infografis analogi regulasi yang disederhanakan.
              </p>
            </div>

            <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                Kasus Naratif S4 (Aparatur Perbatasan 3T)
              </span>
              <h4 class="text-xs font-bold text-slate-900">Aparatur Garda Terdepan dengan Jaringan EDGE</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Petugas di wilayah 3T mengakses modul etika via smartphone dengan buffering tinggi. CABA mengaktifkan PWA offline cache dan audio podcast mode, menyesuaikan kalkulasi metrik kelulusan tanpa mengharuskan streaming video kontinu.
              </p>
            </div>

          </div>

        </div>

        <!-- ========================================================================= -->
        <!-- TAB 3: KOMPARASI PARADIGMA & LANDASAN TEORI (TABEL I & SECTION II)       -->
        <!-- ========================================================================= -->
        <div v-else-if="activeMainTab === 'paradigm_theories'" class="space-y-6">
          
          <!-- Banner Pengantar Teori -->
          <div class="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200 shadow-xs">
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                ⚖️ Tabel I Manuskrip JISEBI: Paradigmatic Positioning
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                4 Theoretical Foundations: Section II-A
              </span>
            </div>
            <h2 class="text-xl font-black text-slate-900">
              Posisi Paradigmatis CABA & 4 Pilar Teoretis Fondasi
            </h2>
            <p class="text-xs sm:text-sm text-slate-600 mt-1 max-w-4xl leading-relaxed">
              Membedakan secara tegas pendekatan CABA dengan <em>Traditional Learning Analytics</em> dan <em>General Adaptive E-Learning</em> yang dirancang untuk lingkungan akademis statis.
            </p>
          </div>

          <!-- TABEL I KOMPARASI PARADIGMA (TABLE I FROM MANUSCRIPT) -->
          <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
              <h3 class="text-sm font-black text-slate-900 uppercase">
                TABLE I. Comparison of Traditional Learning Analytics, General Adaptive E-Learning, and the Proposed CABA Framework
              </h3>
              <span class="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono text-[11px] font-bold border border-emerald-200">
                Section I Introduction Positioning
              </span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                    <th class="p-3 w-44">Dimension</th>
                    <th class="p-3">Traditional Learning Analytics</th>
                    <th class="p-3">General Adaptive E-Learning</th>
                    <th class="p-3 bg-blue-50/80 text-blue-950 font-black border-l border-r border-blue-200">
                      Proposed CABA Framework
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 text-slate-800">
                  
                  <tr class="hover:bg-slate-50">
                    <td class="p-3 font-bold text-slate-900 align-top">
                      Primary Target Audience
                    </td>
                    <td class="p-3 text-slate-600 align-top">
                      K-12 and higher education students
                    </td>
                    <td class="p-3 text-slate-600 align-top">
                      General academic or lifelong learners
                    </td>
                    <td class="p-3 bg-blue-50/40 font-bold text-blue-900 align-top border-l border-r border-blue-200">
                      Civil servants and public sector professionals
                    </td>
                  </tr>

                  <tr class="hover:bg-slate-50">
                    <td class="p-3 font-bold text-slate-900 align-top">
                      Context Dimensions
                    </td>
                    <td class="p-3 text-slate-600 align-top">
                      Minimal; primarily timestamps
                    </td>
                    <td class="p-3 text-slate-600 align-top">
                      Academic schedules and prior scores
                    </td>
                    <td class="p-3 bg-blue-50/40 font-semibold text-blue-950 align-top border-l border-r border-blue-200">
                      Workload blocks, device and bandwidth constraints, infrastructure, and institutional tier
                    </td>
                  </tr>

                  <tr class="hover:bg-slate-50">
                    <td class="p-3 font-bold text-slate-900 align-top">
                      Behavioral Telemetry
                    </td>
                    <td class="p-3 text-slate-600 align-top">
                      Page visits, login duration, and completion
                    </td>
                    <td class="p-3 text-slate-600 align-top">
                      Navigation sequences and quiz response times
                    </td>
                    <td class="p-3 bg-blue-50/40 font-semibold text-blue-950 align-top border-l border-r border-blue-200">
                      Video interactions, tab-focus dynamics, response latency, idle periods, and engagement-continuity signals
                    </td>
                  </tr>

                  <tr class="hover:bg-slate-50">
                    <td class="p-3 font-bold text-slate-900 align-top">
                      Pedagogical Basis
                    </td>
                    <td class="p-3 text-slate-600 align-top">
                      Standard pedagogy and summative assessment
                    </td>
                    <td class="p-3 text-slate-600 align-top">
                      Cognitivism, mastery learning, and item-response logic
                    </td>
                    <td class="p-3 bg-blue-50/40 font-semibold text-blue-950 align-top border-l border-r border-blue-200">
                      Situated cognition, self-regulated learning, cognitive load management, and andragogy
                    </td>
                  </tr>

                  <tr class="hover:bg-slate-50">
                    <td class="p-3 font-bold text-slate-900 align-top">
                      Adaptive Interventions
                    </td>
                    <td class="p-3 text-slate-600 align-top">
                      Static instructor reports
                    </td>
                    <td class="p-3 text-slate-600 align-top">
                      Difficulty adjustment and sequencing
                    </td>
                    <td class="p-3 bg-blue-50/40 font-semibold text-blue-950 align-top border-l border-r border-blue-200">
                      Micro-chunking, engagement checkpoints, bandwidth fallback, and role-differentiated scaffolding
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

          <!-- 4 THEORETICAL FOUNDATIONS (SECTION II-A) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <!-- Pillar 1 -->
            <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div class="flex items-center justify-between">
                <span class="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">Pilar 1</span>
                <span class="text-[11px] font-mono text-slate-500">Brown, Collins & Duguid (1989) [3]</span>
              </div>
              <h4 class="text-sm font-bold text-slate-900">Situated Cognition (Kognisi Terkondisi Situasi)</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Pengetahuan tidak terpisah dari aktivitas, konteks, dan budaya di mana ia dipelajari. Pembelajaran ASN tertanam kuat dalam rutinitas administratif, hierarki birokrasi, dan disrupsi layanan publik mendadak.
              </p>
            </div>

            <!-- Pillar 2 -->
            <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div class="flex items-center justify-between">
                <span class="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">Pilar 2</span>
                <span class="text-[11px] font-mono text-slate-500">Barnard-Brak, Lan & Paton (2010) [4]</span>
              </div>
              <h4 class="text-sm font-bold text-slate-900">Self-Regulated Learning (SRL)</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Pembelajaran mandiri menuntut pengaturan tujuan, waktu, strategi, dan evaluasi diri. Dalam diklat wajib, sistem adaptif harus mendeteksi pola regulasi yang lemah untuk memberikan <em>scaffolding</em> suportif, bukan sanksi sepihak.
              </p>
            </div>

            <!-- Pillar 3 -->
            <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div class="flex items-center justify-between">
                <span class="px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">Pilar 3</span>
                <span class="text-[11px] font-mono text-slate-500">Knowles (1984) [5]</span>
              </div>
              <h4 class="text-sm font-bold text-slate-900">Andragogy (Pendidikan Orang Dewasa)</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Pembelajar dewasa bersifat mandiri, kaya pengalaman kerja, berorientasi masalah praktis, dan termotivasi oleh relevansi jabatan. CABA menyesuaikan waktu, format, dan scaffolding sesuai peran tugas ASN.
              </p>
            </div>

            <!-- Pillar 4 -->
            <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div class="flex items-center justify-between">
                <span class="px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-100 text-cyan-800">Pilar 4</span>
                <span class="text-[11px] font-mono text-slate-500">Sweller (1988) [6]</span>
              </div>
              <h4 class="text-sm font-bold text-slate-900">Cognitive Load Theory (Beban Kognitif)</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Membuka video panjang 45 menit di sela-sela rapat birokrasi membebani <em>extraneous cognitive load</em> akibat <em>context-switching</em>. CABA mereduksinya melalui <em>micro-chunking</em> 3–5 menit dan format multimodal ringkas.
              </p>
            </div>

          </div>

          <!-- DSR METHODOLOGY CYCLES -->
          <div class="p-5 rounded-xl bg-slate-100 border border-slate-200 space-y-3">
            <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">
              🔬 Metodologi Design Science Research (Hevner et al., 2004; Peffers et al., 2007)
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div class="p-3 bg-white rounded-lg border border-slate-200">
                <strong class="text-blue-900 block mb-1">1. Relevance Cycle</strong>
                <p class="text-slate-600">Mengidentifikasi masalah context-blindness pada pelatihan Latsar & kepemimpinan ASN di Indonesia.</p>
              </div>
              <div class="p-3 bg-white rounded-lg border border-slate-200">
                <strong class="text-indigo-900 block mb-1">2. Rigor Cycle</strong>
                <p class="text-slate-600">Menghubungkan rancangan dengan 4 pilar teori serta literatur telemetri Global South & etika keadilan AI.</p>
              </div>
              <div class="p-3 bg-white rounded-lg border border-slate-200">
                <strong class="text-emerald-900 block mb-1">3. Design Cycle</strong>
                <p class="text-slate-600">Menghasilkan artefak arsitektur CABA 4-layer dan baseline inferensi 4 situated learner states.</p>
              </div>
            </div>
          </div>

        </div>

        <!-- ========================================================================= -->
        <!-- TAB 4: DEMONSTRASI SKENARIO OPERASIONAL (SECTION III-D)                   -->
        <!-- ========================================================================= -->
        <div v-else-if="activeMainTab === 'scenarios'" class="space-y-6">
          
          <!-- Banner Pengantar Skenario -->
          <div class="p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-white border border-amber-200 shadow-xs">
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                🎬 Section III-D: Operational Scenario Demonstrations
              </span>
            </div>
            <h2 class="text-xl font-black text-slate-900">
              Simulasi Skenario Operasional CABA Framework
            </h2>
            <p class="text-xs sm:text-sm text-slate-600 mt-1 max-w-4xl leading-relaxed">
              Demonstrasi pembuktian konsep (*proof-of-concept*) yang memperlihatkan bagaimana pipeline 4-layer memproses masukan konteks dan perilaku, lalu menghasilkan adaptasi dan penyesuaian metrik yang adil.
            </p>
          </div>

          <!-- 2 OPERATIONAL SCENARIOS CARDS -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <!-- SKENARIO 1 -->
            <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div class="flex items-center justify-between gap-2 flex-wrap mb-2">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                    Skenario 1
                  </span>
                  <span class="text-[11px] font-semibold text-slate-500">
                    Workload Pressure • Office Hours
                  </span>
                </div>

                <h3 class="text-sm sm:text-base font-black text-slate-900 leading-snug">
                  Fragmented Office-Hour Learning with Low-Engagement Completion Risk
                </h3>

                <div class="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                  <div><strong>👤 Profil:</strong> Pejabat Administrator (Mid-level bureaucrat) di kantor dinas daerah perkotaan.</div>
                  <div><strong>📱 Kondisi Sesi:</strong> Mengakses modul pengadaan wajib pukul 10.30 WIB via PC kantor, sambil melayani disposisi pimpinan dan berkas warga.</div>
                  <div><strong>📡 Sinyal Terdeteksi:</strong> Kecepatan video 2x, rasio tab focus rendah (25%), sering switch window, mendekati tenggat pelaporan.</div>
                </div>

                <div class="mt-4 space-y-2 text-xs">
                  <div class="font-bold text-slate-900">⚙️ Pemrosesan Pipeline CABA:</div>
                  <div class="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200 space-y-1 text-[11px] text-blue-950">
                    <div><strong>Layer 2 Inferensi:</strong> Kombinasi S1 (Low-Engagement Risk) + S2 (Fragmented Office-Hour).</div>
                    <div><strong>Layer 3 Keputusan:</strong> Mengaktifkan <em>Dynamic Modality Trade-off</em> & <em>State Preservation</em>.</div>
                    <div><strong>Layer 4 Intervensi:</strong> Sistem menyimpan progress, menyajikan ringkasan intisari materi singkat, dan membuka <em>scenario checkpoint</em> 3 soal kasus relevan.</div>
                  </div>
                </div>
              </div>

              <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
                🎯 <strong>Hasil:</strong> Mengubah kepatuhan pasif menjadi pemrosesan kognitif aktif tanpa menghukum beban kerja kedinasan ASN.
              </div>
            </div>

            <!-- SKENARIO 2 -->
            <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div class="flex items-center justify-between gap-2 flex-wrap mb-2">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                    Skenario 2
                  </span>
                  <span class="text-[11px] font-semibold text-slate-500">
                    Infrastructural Disparity • 3T Region
                  </span>
                </div>

                <h3 class="text-sm sm:text-base font-black text-slate-900 leading-snug">
                  Infrastructural Constraint in Frontier (3T) Region
                </h3>

                <div class="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                  <div><strong>👤 Profil:</strong> Aparatur garis depan (Frontline officer) di wilayah kepulauan/perbatasan 3T.</div>
                  <div><strong>📱 Kondisi Sesi:</strong> Mengakses modul etika melalui smartphone dengan sinyal seluler EDGE/3G yang tidak stabil.</div>
                  <div><strong>📡 Sinyal Terdeteksi:</strong> Throughput &lt; 256 kbps, packet loss 35%, repeated buffering (7 kali per video), latensi submit tinggi.</div>
                </div>

                <div class="mt-4 space-y-2 text-xs">
                  <div class="font-bold text-slate-900">⚙️ Pemrosesan Pipeline CABA:</div>
                  <div class="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 space-y-1 text-[11px] text-amber-950">
                    <div><strong>Layer 2 Inferensi:</strong> S4 (Infrastructural Constraint 3T) - Bukan ketidakinginan belajar.</div>
                    <div><strong>Layer 3 Keputusan:</strong> <em>Spatial-Aware Algorithmic Equity</em> & <em>Modality Fallback</em>.</div>
                    <div><strong>Layer 4 Intervensi:</strong> Sistem otomatis beralih ke <strong>PWA Offline Caching</strong> dan <strong>Audio-First Podcast</strong>, mengizinkan kuis offline dengan sinkronisasi telemetri asinkron.</div>
                  </div>
                </div>
              </div>

              <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
                🎯 <strong>Hasil:</strong> Metrik kelulusan 100% video streaming diganti dengan kombinasi bobot mikro-interaksi & bukti offline terverifikasi.
              </div>
            </div>

          </div>

        </div>

        <!-- ========================================================================= -->
        <!-- TAB 5: DATASET EMPIRIS CABA, 22 REFERENSI JISEBI & BENCHMARK HUB        -->
        <!-- ========================================================================= -->
        <div v-else-if="activeMainTab === 'references'" class="space-y-6">
          
          <!-- Banner Pengantar Referensi & Dataset -->
          <div class="p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-slate-50 to-white border border-blue-200 shadow-xs">
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                📊 4 Stream Dataset Empiris CABA Framework
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                📚 22 Core References cited in JISEBI Manuscript
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                12 Global Benchmark Datasets
              </span>
            </div>
            <h2 class="text-xl font-black text-slate-900">
              Katalog Dataset Empiris CABA, Literatur JISEBI, & Benchmark Global
            </h2>
            <p class="text-xs sm:text-sm text-slate-600 mt-1 max-w-4xl leading-relaxed">
              Koleksi data terintegrasi mencakup log telemetri multi-sinyal ASN, matriks normalisasi keadilan spasial, akumulasi bukti autentik, rubrik validasi Widyaiswara, serta 22 rujukan ilmiah resmi manuskrip JISEBI.
            </p>
          </div>

          <!-- ========================================================================= -->
          <!-- 1. CABA EMPIRICAL DATASETS EXPLORER (4 DATA STREAMS + EXPORT)             -->
          <!-- ========================================================================= -->
          <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div class="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-3 gap-3">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    💾 DATASET PRIMER & MATRIKS CABA
                  </span>
                  <span class="text-[11px] font-mono text-slate-500">
                    Format: Tabular CSV / JSON
                  </span>
                </div>
                <h3 class="text-sm font-black text-slate-900">
                  EXPLORER DATASET EMPIRIS PENELITIAN CABA FRAMEWORK
                </h3>
              </div>

              <!-- Export & Download Actions -->
              <div class="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  @click="exportCurrentDatasetCSV"
                  class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <span>📥</span>
                  <span>Unduh Dataset (CSV)</span>
                </button>
                <button
                  type="button"
                  @click="exportCurrentDatasetJSON"
                  class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <span>📦</span>
                  <span>Unduh JSON</span>
                </button>
              </div>
            </div>

            <!-- Sub-tab Selector for 4 CABA Streams -->
            <div class="flex items-center gap-2 border-b border-slate-100 pb-2 flex-wrap">
              <button
                v-for="st in cabaDatasetStreams"
                :key="st.id"
                type="button"
                @click="selectedCabaStream = st.id"
                :class="`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  selectedCabaStream === st.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`"
              >
                <span>{{ st.icon }}</span>
                <span>{{ st.title }}</span>
                <span :class="`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${selectedCabaStream === st.id ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-700'}`">
                  {{ st.rows.length }}
                </span>
              </button>
            </div>

            <!-- Description & Filter Bar -->
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div class="text-slate-600">
                <strong>Deskripsi:</strong> {{ currentActiveStreamObj.description }}
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <input
                  v-model="datasetSearchQuery"
                  type="text"
                  placeholder="Filter data..."
                  class="bg-white border border-slate-300 rounded-lg px-3 py-1 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <select
                  v-if="selectedCabaStream === 'telemetry_stream'"
                  v-model="selectedStateFilter"
                  class="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">Semua State (S1–S4)</option>
                  <option value="S1">S1: Low-Engagement Risk</option>
                  <option value="S2">S2: Fragmented Office-Hour</option>
                  <option value="S3">S3: Cognitive Struggling</option>
                  <option value="S4">S4: 3T Constraint</option>
                </select>
              </div>
            </div>

            <!-- Interactive Tabular Data Viewer -->
            <div class="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs max-h-96">
              <table class="w-full text-left text-xs border-collapse">
                <thead class="sticky top-0 bg-slate-100 text-slate-700 border-b border-slate-200 font-bold shadow-xs">
                  <tr>
                    <th
                      v-for="col in currentActiveStreamObj.columns"
                      :key="col"
                      class="p-2.5 whitespace-nowrap text-[11px] font-bold"
                    >
                      {{ col }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-mono text-[11px]">
                  <tr
                    v-for="(row, rIdx) in filteredStreamRows"
                    :key="rIdx"
                    class="hover:bg-blue-50/50 transition-colors"
                  >
                    <td
                      v-for="col in currentActiveStreamObj.columns"
                      :key="col"
                      class="p-2.5 whitespace-nowrap text-slate-800"
                    >
                      <span
                        v-if="row[col] && (row[col].includes('S1') || row[col].includes('Low-Engagement'))"
                        class="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]"
                      >
                        {{ row[col] }}
                      </span>
                      <span
                        v-else-if="row[col] && (row[col].includes('S2') || row[col].includes('Office-Hour'))"
                        class="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold text-[10px]"
                      >
                        {{ row[col] }}
                      </span>
                      <span
                        v-else-if="row[col] && (row[col].includes('S3') || row[col].includes('Cognitive'))"
                        class="px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-800 font-bold text-[10px]"
                      >
                        {{ row[col] }}
                      </span>
                      <span
                        v-else-if="row[col] && (row[col].includes('S4') || row[col].includes('3T') || row[col].includes('Infrastructural'))"
                        class="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]"
                      >
                        {{ row[col] }}
                      </span>
                      <span
                        v-else-if="row[col] && (row[col].includes('Lulus') || row[col].includes('Verified') || row[col].includes('100%') || row[col].includes('Sangat Sesuai'))"
                        class="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]"
                      >
                        {{ row[col] }}
                      </span>
                      <span v-else>
                        {{ row[col] }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-[10px] text-slate-500 italic flex items-center justify-between">
              <span>* Menampilkan {{ filteredStreamRows.length }} baris record data operasional CABA Framework.</span>
              <span class="font-bold text-slate-600">Terbuka untuk verifikasi empiris & pengujian komputasi.</span>
            </div>
          </div>

          <!-- ========================================================================= -->
          <!-- 2. 22 REFERENSI RESMI MANUSKRIP JISEBI                                    -->
          <!-- ========================================================================= -->
          <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
              <div>
                <h3 class="text-sm font-black text-slate-900">
                  DAFTAR 22 REFERENSI UTAMA MANUSKRIP JISEBI (SECTION REFERENCES)
                </h3>
                <p class="text-xs text-slate-500">
                  Sitasi standar IEEE dengan rincian relevansi terhadap perancangan CABA Framework
                </p>
              </div>

              <!-- Filter Kategori Referensi -->
              <div class="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  @click="refCategoryFilter = 'all'"
                  :class="`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    refCategoryFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`"
                >
                  Semua ({{ jisebiReferences.length }})
                </button>
                <button
                  v-for="cat in refCategories"
                  :key="cat"
                  @click="refCategoryFilter = cat"
                  :class="`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    refCategoryFilter === cat ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`"
                >
                  {{ cat }}
                </button>
              </div>
            </div>

            <!-- List Referensi Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="refItem in filteredJisebiReferences"
                :key="refItem.ref_id"
                class="p-4 rounded-xl bg-slate-50/60 border border-slate-200 hover:border-blue-400 shadow-2xs hover:shadow-xs transition flex flex-col justify-between gap-3"
              >
                <div>
                  <div class="flex items-center justify-between gap-2 mb-1.5">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                      [{{ refItem.ref_id }}] {{ refItem.category }}
                    </span>
                    <span class="text-[11px] font-mono font-bold text-slate-600">
                      {{ refItem.year }}
                    </span>
                  </div>

                  <h4 class="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {{ refItem.title }}
                  </h4>
                  <p class="text-[11px] text-slate-500 mt-1">
                    👤 {{ refItem.authors }} • <em>{{ refItem.journal }}</em>
                  </p>

                  <div class="mt-2.5 p-2.5 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-700 space-y-1">
                    <div>💡 <strong>Relevansi CABA:</strong> {{ refItem.relevance }}</div>
                    <div v-if="refItem.doi" class="font-mono text-[10px] text-blue-600">
                      DOI: {{ refItem.doi }}
                    </div>
                  </div>
                </div>

                <div class="flex flex-wrap gap-1 pt-2 border-t border-slate-200/60">
                  <span v-for="tag in refItem.key_concepts" :key="tag" class="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600">
                    #{{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- ========================================================================= -->
          <!-- 3. 12 BENCHMARK DATASETS CATALOG                                          -->
          <!-- ========================================================================= -->
          <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div class="border-b border-slate-100 pb-3">
              <h3 class="text-sm font-black text-slate-900">
                🌐 12 OPEN BENCHMARK & INSTITUTIONAL DATASETS
              </h3>
              <p class="text-xs text-slate-500">
                Dataset rujukan internasional (OULAD, EdNet, FiRAT 2026, B-Smart 2025) dan data internal kedinasan LAN RI
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="bm in benchmarkDatasets"
                :key="bm.id"
                class="p-4 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-blue-400 shadow-2xs transition flex flex-col justify-between gap-3"
              >
                <div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {{ bm.data_type }}
                  </span>
                  <h4 class="text-xs font-bold text-slate-900 mt-1.5">{{ bm.name }}</h4>
                  <p class="text-[10px] text-slate-500 font-medium">🏛️ {{ bm.provider }}</p>

                  <p class="text-[11px] text-slate-600 mt-2 line-clamp-3">
                    {{ bm.description }}
                  </p>
                </div>

                <div class="pt-2 border-t border-slate-200 text-xs flex items-center justify-between">
                  <span class="text-[10px] font-bold text-slate-500">{{ bm.volume }}</span>
                  <a
                    :href="bm.url"
                    target="_blank"
                    class="px-2.5 py-1 rounded bg-slate-900 text-white text-[10px] font-bold no-underline hover:bg-slate-800"
                  >
                    Buka Data ➔
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Navbar from '~/components/Navbar.vue'

useHead({
  title: 'CABA Framework & Dataset Hub - JISEBI Manuscript Baseline',
  script: [
    {
      src: 'https://cdn.tailwindcss.com',
      id: 'tailwind-cdn'
    },
    {
      innerHTML: 'if (window.tailwind) { tailwind.config = { corePlugins: { preflight: false } } }',
      type: 'text/javascript'
    }
  ]
})

// Tab State
const activeMainTab = ref<'architecture' | 'states_matrix' | 'paradigm_theories' | 'scenarios' | 'references'>('architecture')
const showAbstract = ref<boolean>(false)

// Keywords from Manuscript
const keywordsList = [
  'Learning Analytics',
  'Context-Aware Computing',
  'Public Sector Training',
  'Adaptive Learning',
  'Civil Service Competency',
  'Engagement-Aware Learning'
]

// Figure 1 Interactive Node Inspector State
const selectedFigureNode = ref<string>('evaluate_signals')
const isFigureModalOpen = ref<boolean>(false)

const openFigureModal = (nodeKey: string) => {
  selectedFigureNode.value = nodeKey
  isFigureModalOpen.value = true
}

const closeFigureModal = () => {
  isFigureModalOpen.value = false
}

interface SampleTableData {
  name: string
  columns: string[]
  rows: Record<string, string>[]
}

interface FigureNodeDetail {
  layer: string
  title: string
  description: string
  triggers: string[]
  policy: string
  rationale: string
  sampleTable?: SampleTableData
}

const figureNodesDictionary: Record<string, FigureNodeDetail> = {
  evaluate_signals: {
    layer: 'Layer 1 & 2: Multi-Signal Telemetry & Inference',
    title: 'EVALUATE SIGNALS (Multi-signal Reasoning Layer)',
    description: 'Menangkap parameter kontekstual dinas (jam kantor, perangkat, profil jaringan 3T) dan telemetri interaksi non-invasif tanpa menimbulkan beban pengawasan invasif pada pegawai.',
    triggers: [
      'Temporal Workload: Jam dinas kantor (08.00-16.00) vs luar jam dinas',
      'Device Category: Desktop instansi, Laptop pribadi, Smartphone mobile',
      'Network Profile: 4G/5G gigabit vs Satelit VSAT / 3G / EDGE',
      'Non-invasive Telemetry: Video playback speed (1x-2x), Tab focus ratio, Rewind count, Dwell time'
    ],
    policy: 'Continuous Context Sensing & Telemetry Stream Filtering',
    rationale: 'Menyediakan input kontekstual yang kaya agar perilaku belajar tidak diinterpretasikan secara seragam.',
    sampleTable: {
      name: 'caba_telemetry_stream_log.csv',
      columns: ['user_id', 'jam_akses', 'perangkat', 'sinyal_koneksi', 'playback_speed', 'tab_focus_ratio', 'buffer_count'],
      rows: [
        { user_id: 'ASN-012', jam_akses: '10:15 WIB', perangkat: 'Desktop PC', sinyal_koneksi: 'Fiber Gigabit', playback_speed: '2.0x', tab_focus_ratio: '0.24', buffer_count: '0' },
        { user_id: 'ASN-048', jam_akses: '14:20 WITA', perangkat: 'Smartphone', sinyal_koneksi: 'EDGE 3T', playback_speed: '1.0x', tab_focus_ratio: '0.88', buffer_count: '8' },
        { user_id: 'ASN-073', jam_akses: '20:45 WIB', perangkat: 'Laptop', sinyal_koneksi: '4G LTE', playback_speed: '1.0x', tab_focus_ratio: '0.95', buffer_count: '1' }
      ]
    }
  },
  state_s1: {
    layer: 'Layer 2 State: S1 Low-Engagement Completion Risk',
    title: 'S1: Low-Engagement Completion Risk (Passive Compliance)',
    description: 'Terjadi saat peserta mengejar target penyelesaian administratif dengan memutar video di latar belakang atau mempercepat tontonan secara ekstrem menjelang batas pelaporan.',
    triggers: ['Playback Speed 2x', 'Low Tab-Focus Ratio', 'Deadline Pelaporan Dekat', 'Skip Langsung ke Akhir'],
    policy: 'Active verification stop-gate with scenario checkpoint',
    rationale: 'Mengonversi kepatuhan pasif menjadi pemrosesan kognitif aktif sebelum jam belajar diakui.',
    sampleTable: {
      name: 's1_verification_gate_records.csv',
      columns: ['asn_id', 'speed_detected', 'tab_focus', 'stop_gate_status', 'spot_test_result', 'completion_credited'],
      rows: [
        { asn_id: 'ASN-012', speed_detected: '2.0x', tab_focus: '24%', stop_gate_status: 'TRIGGERED', spot_test_result: '3/3 Soal Benar', completion_credited: 'YES (Verified)' },
        { asn_id: 'ASN-099', speed_detected: '2.0x', tab_focus: '12%', stop_gate_status: 'TRIGGERED', spot_test_result: '1/3 Soal Benar', completion_credited: 'NO (Needs Review)' }
      ]
    }
  },
  state_s2: {
    layer: 'Layer 2 State: S2 Fragmented Office-Hour Learning',
    title: 'S2: Fragmented Office-Hour Learning (Learning amid Work Demands)',
    description: 'Terjadi saat peserta belajar di kantor tetapi kerap terinterupsi tugas kedinasan mendadak, disposisi pimpinan, atau pelayanan langsung warga.',
    triggers: ['Office Hours Access', 'High Tab-Switching Frequency', 'Service Interruption Bursts', 'Desktop Office IP'],
    policy: 'State Preservation + Micro-chunking (3–5 min) & Dynamic Modality Trade-off',
    rationale: 'Menghargai perhatian terfragmentasi sebagai kondisi kedinasan yang sah tanpa mengurangi pencapaian kompetensi.',
    sampleTable: {
      name: 's2_microchunking_state.csv',
      columns: ['asn_id', 'interupsi_count', 'durasi_potongan', 'format_adaptif', 'saved_state_timestamp'],
      rows: [
        { asn_id: 'ASN-034', interupsi_count: '6 kali/sesi', durasi_potongan: '3.5 menit', format_adaptif: 'Micro-Video + Text Brief', saved_state_timestamp: 'Menit 04:12 Disimpan' },
        { asn_id: 'ASN-077', interupsi_count: '9 kali/sesi', durasi_potongan: '5.0 menit', format_adaptif: 'Audio Podcast Summary', saved_state_timestamp: 'Menit 08:30 Disimpan' }
      ]
    }
  },
  state_s3: {
    layer: 'Layer 2 State: S3 Cognitive Struggling',
    title: 'S3: Cognitive Struggling (Conceptual Obstacles)',
    description: 'Peserta mengalami kesulitan memahami substansi materi baru (misal regulasi pengadaan barang/jasa atau etika digital).',
    triggers: ['Frequent Rewind (>3 kali di segmen sama)', 'Extended Dwell Time', 'Long Pause', 'Low Formative Quiz Score'],
    policy: 'Adaptive Scaffold: Infographic + Analogy + Hints & Worked Examples',
    rationale: 'Mengurangi beban kognitif asing dan memberikan scaffolding situated understanding sesuai tugas birokrasi.',
    sampleTable: {
      name: 's3_scaffolding_delivery.csv',
      columns: ['asn_id', 'rewind_segment', 'dwell_time', 'scaffold_type', 'post_scaffold_score'],
      rows: [
        { asn_id: 'ASN-055', rewind_segment: 'Modul Pengadaan: Pasal 12', dwell_time: '14.5 min', scaffold_type: 'Infografis Pohon Keputusan', post_scaffold_score: '85 / 100' },
        { asn_id: 'ASN-082', rewind_segment: 'Modul Akuntabilitas Kinerja', dwell_time: '18.2 min', scaffold_type: 'Worked Example Kasus Pemda', post_scaffold_score: '90 / 100' }
      ]
    }
  },
  state_s4: {
    layer: 'Layer 2 State: S4 Infrastructural Constraint (3T)',
    title: 'S4: Infrastructural Constraint (3T Regions & Low Bandwidth)',
    description: 'Peserta menghadapi kendala fisik infrastruktur telekomunikasi seperti sinyal seluler EDGE lemah, pemadaman listrik berkala, atau kabel laut maritim.',
    triggers: ['Low Downlink Throughput (<256kbps)', 'High Packet Loss (>25%)', 'Repeated Buffering Stalls', 'Mobile EDGE Network'],
    policy: 'Audio-First Podcast Mode + Offline PWA Cache + Asynchronous Telemetry Synchronization',
    rationale: 'Mengumpulkan bukti pembelajaran autentik tanpa menuntut koneksi streaming video kontinu berkecepatan tinggi.',
    sampleTable: {
      name: 's4_offline_sync_telemetry.csv',
      columns: ['asn_id', 'lokasi_wilayah', 'mode_aktif', 'cached_items', 'sync_latency_hours', 'metric_adjustment'],
      rows: [
        { asn_id: 'ASN-048', lokasi_wilayah: 'Kab. Natuna (Kepulauan)', mode_aktif: 'Audio Podcast PWA', cached_items: '4 Modul Offline', sync_latency_hours: '+6.2 Jam (Cuaca)', metric_adjustment: 'Normalisasi Buffer' },
        { asn_id: 'ASN-091', lokasi_wilayah: 'Kab. Belu (Perbatasan)', mode_aktif: 'Offline Text Pack', cached_items: '6 Modul Offline', sync_latency_hours: '+12.0 Jam (Genset)', metric_adjustment: 'Normalisasi Buffer' }
      ]
    }
  },
  adjusted_metric: {
    layer: 'Layer 3 & 4: Spatial Equity & Metric Adjustment',
    title: 'ADJUSTED COMPLETION METRIC (Authentic Evidence Accumulation)',
    description: 'Menggantikan metrik kaku 100% linear watch time dengan akumulasi multi-modal: penyelesaian kuis offline terverifikasi, audio completion traces, dan scenario stop-gates.',
    triggers: ['Spatial-Aware Algorithmic Equity Normalization', 'Buffer Stall Masking', 'Multi-modal Evidence Weighting'],
    policy: 'Accumulated Authentic Competency Evidence Formula',
    rationale: 'Mencegah contextual attribution error serta memberikan kesempatan evaluasi yang adil bagi seluruh aparatur di berbagai daerah.',
    sampleTable: {
      name: 'caba_adjusted_completion_matrix.csv',
      columns: ['asn_id', 'watch_time_raw', 'buffer_penalty_offset', 'scenario_test_score', 'offline_verified_task', 'final_caba_metric'],
      rows: [
        { asn_id: 'ASN-012 (Metro)', watch_time_raw: '45% (Speed 2x)', buffer_penalty_offset: '0%', scenario_test_score: '100% (3/3)', offline_verified_task: 'N/A', final_caba_metric: '100% (Lulus Terverifikasi)' },
        { asn_id: 'ASN-048 (3T)', watch_time_raw: '30% (Buffer Drop)', buffer_penalty_offset: '+40% (Kompensasi Sinyal)', scenario_test_score: '85% (Audio Quiz)', offline_verified_task: 'Tuntas Offline', final_caba_metric: '100% (Lulus Terverifikasi)' }
      ]
    }
  }
}

const currentFigureDetail = computed<FigureNodeDetail>(() => {
  return figureNodesDictionary[selectedFigureNode.value] || figureNodesDictionary.evaluate_signals
})

// Simulator State
const availableSignals = [
  { id: 'sig_speed2x', label: 'Kecepatan Video 2.0x', desc: 'Pemutaran video dipercepat maksimal' },
  { id: 'sig_tab_low', label: 'Tab Focus Rendah (<30%)', desc: 'Browser berada di latar belakang' },
  { id: 'sig_deadline', label: 'Mendekati Batas Waktu', desc: 'Kurang dari 24 jam sebelum pelaporan ditutup' },
  { id: 'sig_office_hour', label: 'Jam Kerja Kantor Dinas', desc: 'Akses berlangsung pukul 08.00–16.00' },
  { id: 'sig_tab_switch', label: 'Sering Pindah Jendela (Switching)', desc: 'Membuka aplikasi persuratan/layanan publik' },
  { id: 'sig_rewind', label: 'Rewind Video Berulang', desc: '>3 kali mengulang bagian penjelasan regulasi' },
  { id: 'sig_dwell', label: 'Dwell Time Lama di 1 Halaman', desc: 'Waktu henti lama tanpa navigasi maju' },
  { id: 'sig_buffer', label: 'Buffering & Packet Loss Tinggi', desc: 'Sinyal seluler EDGE / cuaca buruk laut' },
  { id: 'sig_3t_mobile', label: 'Smartphone di Wilayah 3T', desc: 'Aparatur perbatasan/kepulauan terluar' }
]

const activeSignalIds = ref<string[]>(['sig_office_hour', 'sig_tab_switch'])

const resetSimulator = () => {
  activeSignalIds.value = ['sig_office_hour', 'sig_tab_switch']
}

const simulatedResult = computed(() => {
  const sigs = activeSignalIds.value
  const states: any[] = []
  let fairnessNote = 'Evaluasi berbasis baseline tipologi daerah dan norma kontekstual.'

  // Check S1
  if (sigs.includes('sig_speed2x') || sigs.includes('sig_tab_low') || sigs.includes('sig_deadline')) {
    states.push({
      code: 'S1',
      name: 'Low-Engagement Completion Risk',
      confidence: (sigs.includes('sig_speed2x') && sigs.includes('sig_tab_low')) ? 92 : 75,
      badgeClass: 'bg-blue-50 border-blue-200 text-blue-950',
      policy: 'Active Verification Stop-Gate: 3 Soal Spot-Test Kasus Skenario'
    })
  }

  // Check S2
  if (sigs.includes('sig_office_hour') && sigs.includes('sig_tab_switch')) {
    states.push({
      code: 'S2',
      name: 'Fragmented Office-Hour Learning',
      confidence: 88,
      badgeClass: 'bg-indigo-50 border-indigo-200 text-indigo-950',
      policy: 'State Preservation + Micro-chunking (3–5 menit) & Audio Summary'
    })
  }

  // Check S3
  if (sigs.includes('sig_rewind') || sigs.includes('sig_dwell')) {
    states.push({
      code: 'S3',
      name: 'Cognitive Struggling',
      confidence: sigs.includes('sig_rewind') && sigs.includes('sig_dwell') ? 95 : 70,
      badgeClass: 'bg-cyan-50 border-cyan-200 text-cyan-950',
      policy: 'Adaptive Scaffolding: Infografis Penjelas & Worked Examples'
    })
  }

  // Check S4
  if (sigs.includes('sig_buffer') || sigs.includes('sig_3t_mobile')) {
    states.push({
      code: 'S4',
      name: 'Infrastructural Constraint (3T)',
      confidence: 96,
      badgeClass: 'bg-amber-50 border-amber-200 text-amber-950',
      policy: 'Audio-First Podcast Fallback + Offline PWA Caching + Async Sync'
    })
  }

  if (states.some(s => s.code === 'S4')) {
    fairnessNote = 'Spatial-Aware Equity aktif: Buffering dan jeda sinkronisasi dinormalisasi agar ASN 3T tidak dirugikan oleh kendala infrastruktur.'
  } else if (states.some(s => s.code === 'S2')) {
    fairnessNote = 'Contextual Normalization aktif: Sering berpindah tab pada jam dinas diakui sebagai disrupsi pelayanan warga, bukan defisit motivasi.'
  }

  return { states, fairnessNote }
})

// =========================================================================
// CABA EMPIRICAL DATASETS DEFINITIONS & STATE
// =========================================================================
interface CabaStreamConfig {
  id: string
  title: string
  icon: string
  description: string
  filename: string
  columns: string[]
  rows: Record<string, string>[]
}

const selectedCabaStream = ref<string>('telemetry_stream')
const datasetSearchQuery = ref<string>('')
const selectedStateFilter = ref<string>('all')

const cabaDatasetStreams: CabaStreamConfig[] = [
  {
    id: 'telemetry_stream',
    title: 'Stream 1: Telemetri Sesi & Deteksi S1–S4',
    icon: '📡',
    filename: 'caba_empirical_telemetry_stream.csv',
    description: 'Log telemetri interaksi waktu nyata (playback speed, tab focus, buffering, rewind, dwell time) dengan inferensi status pembelajar situasional S1–S4.',
    columns: ['user_id', 'tipologi_daerah', 'jam_akses', 'kecepatan_video', 'tab_focus_ratio', 'buffer_stalls', 'rewind_count', 'inferred_state', 'active_policy', 'completion_metric'],
    rows: [
      { user_id: 'ASN-0101', tipologi_daerah: 'Metropolitan (DKI Jakarta)', jam_akses: '10:15 WIB', kecepatan_video: '2.0x', tab_focus_ratio: '0.22', buffer_stalls: '0', rewind_count: '0', inferred_state: 'S1: Low-Engagement Risk', active_policy: 'Active Stop-Gate Spot-Test', completion_metric: '100% (Verified 3/3)' },
      { user_id: 'ASN-0102', tipologi_daerah: 'Metropolitan (Surabaya)', jam_akses: '14:40 WIB', kecepatan_video: '1.75x', tab_focus_ratio: '0.28', buffer_stalls: '0', rewind_count: '1', inferred_state: 'S1: Low-Engagement Risk', active_policy: 'Active Stop-Gate Spot-Test', completion_metric: '100% (Verified 3/3)' },
      { user_id: 'ASN-0201', tipologi_daerah: 'Daratan (Kab. Banyumas)', jam_akses: '09:30 WIB', kecepatan_video: '1.0x', tab_focus_ratio: '0.65', buffer_stalls: '1', rewind_count: '0', inferred_state: 'S2: Office-Hour Learning', active_policy: 'Micro-chunking (3.5 min) + Text Brief', completion_metric: '100% (Modul Parsial)' },
      { user_id: 'ASN-0202', tipologi_daerah: 'Daratan (Kab. Sleman)', jam_akses: '11:10 WIB', kecepatan_video: '1.0x', tab_focus_ratio: '0.58', buffer_stalls: '0', rewind_count: '1', inferred_state: 'S2: Office-Hour Learning', active_policy: 'Micro-chunking (4.0 min) + Audio Recap', completion_metric: '100% (Modul Parsial)' },
      { user_id: 'ASN-0203', tipologi_daerah: 'Daratan (Kab. Maros)', jam_akses: '13:50 WITA', kecepatan_video: '1.0x', tab_focus_ratio: '0.45', buffer_stalls: '2', rewind_count: '0', inferred_state: 'S2: Office-Hour Learning', active_policy: 'State Preservation & Progress Resume', completion_metric: '100% (Modul Parsial)' },
      { user_id: 'ASN-0301', tipologi_daerah: 'Metropolitan (Bandung)', jam_akses: '21:05 WIB', kecepatan_video: '1.0x', tab_focus_ratio: '0.94', buffer_stalls: '0', rewind_count: '5', inferred_state: 'S3: Cognitive Struggling', active_policy: 'Scaffolded Infographic + Analogi', completion_metric: '100% (Gain Score +30)' },
      { user_id: 'ASN-0302', tipologi_daerah: 'Daratan (Kab. Malang)', jam_akses: '20:15 WIB', kecepatan_video: '1.0x', tab_focus_ratio: '0.92', buffer_stalls: '1', rewind_count: '4', inferred_state: 'S3: Cognitive Struggling', active_policy: 'Worked Example Kasus Pengadaan', completion_metric: '100% (Gain Score +28)' },
      { user_id: 'ASN-0401', tipologi_daerah: 'Kepulauan (Kab. Natuna)', jam_akses: '14:20 WIB', kecepatan_video: '1.0x', tab_focus_ratio: '0.88', buffer_stalls: '8', rewind_count: '0', inferred_state: 'S4: 3T Infrastructural Constraint', active_policy: 'Audio-First Podcast + Offline PWA', completion_metric: '100% (Buffer Masked)' },
      { user_id: 'ASN-0402', tipologi_daerah: 'Kepulauan (Kep. Aru)', jam_akses: '16:10 WIT', kecepatan_video: '1.0x', tab_focus_ratio: '0.85', buffer_stalls: '11', rewind_count: '0', inferred_state: 'S4: 3T Infrastructural Constraint', active_policy: 'Offline PWA Cache + Async Sync', completion_metric: '100% (Buffer Masked)' },
      { user_id: 'ASN-0403', tipologi_daerah: 'Perbatasan (Kab. Belu)', jam_akses: '19:40 WITA', kecepatan_video: '1.0x', tab_focus_ratio: '0.90', buffer_stalls: '9', rewind_count: '1', inferred_state: 'S4: 3T Infrastructural Constraint', active_policy: 'Audio-First Mode + Asynchronous Sync', completion_metric: '100% (Buffer Masked)' },
      { user_id: 'ASN-0404', tipologi_daerah: 'Perbatasan (Nunukan)', jam_akses: '20:30 WITA', kecepatan_video: '1.0x', tab_focus_ratio: '0.89', buffer_stalls: '7', rewind_count: '0', inferred_state: 'S4: 3T Infrastructural Constraint', active_policy: 'Compressed Text Pack + Offline Quiz', completion_metric: '100% (Buffer Masked)' },
      { user_id: 'ASN-0501', tipologi_daerah: 'Metropolitan (Medan)', jam_akses: '22:00 WIB', kecepatan_video: '1.0x', tab_focus_ratio: '0.98', buffer_stalls: '0', rewind_count: '0', inferred_state: 'STABLE (Standard Baseline)', active_policy: 'No Intervention (Progress Normal)', completion_metric: '100% (Linear Completion)' }
    ]
  },
  {
    id: 'spatial_weights',
    title: 'Stream 2: Bobot Spasial & Keadilan Algoritma',
    icon: '⚖️',
    filename: 'spatial_equity_normalization_weights.csv',
    description: 'Matriks parameter normalisasi Spatial-Aware Algorithmic Equity untuk mengompensasi disparitas infrastruktur 4 tipologi daerah di Indonesia.',
    columns: ['tipologi_daerah', 'karakteristik_jaringan', 'prior_weight_tolerance', 'buffer_mask_factor', 'inactivity_threshold_min', 'modality_fallback_primary', 'async_telemetry_window'],
    rows: [
      { tipologi_daerah: 'Tipologi 1: Metropolitan', karakteristik_jaringan: 'Fiber Optic Gigabit / 4G Merata', prior_weight_tolerance: '1.00 (Standard)', buffer_mask_factor: '0.00 (Tanpa Kompensasi)', inactivity_threshold_min: '15 Menit', modality_fallback_primary: 'Micro-Video Segments', async_telemetry_window: 'Real-time (<10s)' },
      { tipologi_daerah: 'Tipologi 2: Perkotaan Sedang & Daratan', karakteristik_jaringan: '4G Stabil / Wi-Fi Kantor Pemda', prior_weight_tolerance: '1.15 (Sedang)', buffer_mask_factor: '0.10 (Toleransi Ringan)', inactivity_threshold_min: '30 Menit', modality_fallback_primary: 'Interactive Text Brief', async_telemetry_window: 'Near Real-time (1-5 min)' },
      { tipologi_daerah: 'Tipologi 3: Kepulauan & Maritim', karakteristik_jaringan: 'Kabel Laut / Radio Link / Cuaca Laut', prior_weight_tolerance: '1.45 (Tinggi)', buffer_mask_factor: '0.40 (Kompensasi Cuaca)', inactivity_threshold_min: '60 Menit', modality_fallback_primary: 'Audio-First Podcast & PWA Cache', async_telemetry_window: 'Deferred Batch (4-8 Jam)' },
      { tipologi_daerah: 'Tipologi 4: Perbatasan & Pedalaman 3T', karakteristik_jaringan: 'VSAT Satelit / Genset Malam Hari', prior_weight_tolerance: '1.60 (Maksimal)', buffer_mask_factor: '0.55 (Kompensasi Satelit)', inactivity_threshold_min: '90 Menit', modality_fallback_primary: 'Offline-First Package + Async Telemetry', async_telemetry_window: 'Deferred Batch (12-24 Jam)' }
    ]
  },
  {
    id: 'evidence_accumulation',
    title: 'Stream 3: Akumulasi Bukti Autentik (Adjusted Metric)',
    icon: '🎯',
    filename: 'authentic_evidence_accumulation_log.csv',
    description: 'Log perhitungan metrik penyelesaian pembelajaran adaptif yang menggabungkan watch-time, checkpoint skenario, audio traces, dan bukti offline.',
    columns: ['asn_id', 'instansi_asal', 'raw_watch_time', 'buffer_penalty_offset', 'scenario_test_pct', 'audio_trace_pct', 'offline_task_status', 'final_caba_status'],
    rows: [
      { asn_id: 'ASN-0101', instansi_asal: 'Bappeda DKI Jakarta', raw_watch_time: '48% (Speed 2x)', buffer_penalty_offset: '0%', scenario_test_pct: '100% (3/3 Benar)', audio_trace_pct: 'N/A', offline_task_status: 'N/A', final_caba_status: '100% (Lulus Terverifikasi)' },
      { asn_id: 'ASN-0201', instansi_asal: 'Dinkes Kab. Banyumas', raw_watch_time: '62% (Office Interrupted)', buffer_penalty_offset: '+10%', scenario_test_pct: '90% (2 Kasus)', audio_trace_pct: '100% (Audio Recap)', offline_task_status: 'Tuntas', final_caba_status: '100% (Lulus Terverifikasi)' },
      { asn_id: 'ASN-0401', instansi_asal: 'Dinas Kelautan Natuna', raw_watch_time: '28% (Buffer Drop)', buffer_penalty_offset: '+42%', scenario_test_pct: '85% (Audio Quiz)', audio_trace_pct: '100% (Podcast 18 min)', offline_task_status: 'Tuntas Offline', final_caba_status: '100% (Lulus Terverifikasi)' },
      { asn_id: 'ASN-0403', instansi_asal: 'Batas Negara Kab. Belu', raw_watch_time: '22% (EDGE Sinyal)', buffer_penalty_offset: '+48%', scenario_test_pct: '80% (PWA Quiz)', audio_trace_pct: '100% (Podcast 22 min)', offline_task_status: 'Tuntas Offline', final_caba_status: '100% (Lulus Terverifikasi)' }
    ]
  },
  {
    id: 'widyaiswara_validation',
    title: 'Stream 4: Validasi Ahli Widyaiswara & BPSDM',
    icon: '👨‍🏫',
    filename: 'widyaiswara_expert_validation_rubric.csv',
    description: 'Rubrik penilaian validasi konseptual oleh Widyaiswara dan pengelola diklat aparatur sipil negara di berbagai institusi pelatihan.',
    columns: ['evaluator_id', 'institusi_bpsdm', 'jabatan_fungsional', 'distinguishability_s1_s4', 'fairness_equity_score', 'cooldown_suitability', 'kesimpulan_ahli'],
    rows: [
      { evaluator_id: 'EXP-WI-01', institusi_bpsdm: 'Puslatbang LAN RI', jabatan_fungsional: 'Widyaiswara Ahli Utama', distinguishability_s1_s4: '4.8 / 5.0', fairness_equity_score: '4.9 / 5.0', cooldown_suitability: '4.7 / 5.0', kesimpulan_ahli: 'Sangat Sesuai Praktik Diklat ASN' },
      { evaluator_id: 'EXP-WI-02', institusi_bpsdm: 'BPSDM Prov. Sulsel', jabatan_fungsional: 'Widyaiswara Ahli Madya', distinguishability_s1_s4: '4.6 / 5.0', fairness_equity_score: '4.8 / 5.0', cooldown_suitability: '4.5 / 5.0', kesimpulan_ahli: 'Sangat Sesuai untuk Wilayah Kepulauan' },
      { evaluator_id: 'EXP-WI-03', institusi_bpsdm: 'Bapelkes Mataram', jabatan_fungsional: 'Widyaiswara Ahli Madya', distinguishability_s1_s4: '4.7 / 5.0', fairness_equity_score: '4.7 / 5.0', cooldown_suitability: '4.6 / 5.0', kesimpulan_ahli: 'Mengatasi Masalah Klasik Sinyal 3T' },
      { evaluator_id: 'EXP-WI-04', institusi_bpsdm: 'BPSDM Jawa Tengah', jabatan_fungsional: 'Widyaiswara Ahli Utama', distinguishability_s1_s4: '4.9 / 5.0', fairness_equity_score: '4.8 / 5.0', cooldown_suitability: '4.8 / 5.0', kesimpulan_ahli: 'Efektif Mencegah Attribution Error' }
    ]
  }
]

const currentActiveStreamObj = computed<CabaStreamConfig>(() => {
  return cabaDatasetStreams.find(s => s.id === selectedCabaStream.value) || cabaDatasetStreams[0]
})

const filteredStreamRows = computed(() => {
  const stream = currentActiveStreamObj.value
  let rows = stream.rows

  // Filter by state if applicable
  if (selectedCabaStream.value === 'telemetry_stream' && selectedStateFilter.value !== 'all') {
    rows = rows.filter(r => r.inferred_state && r.inferred_state.startsWith(selectedStateFilter.value))
  }

  // Filter by search query
  if (datasetSearchQuery.value.trim()) {
    const q = datasetSearchQuery.value.toLowerCase()
    rows = rows.filter(r => Object.values(r).some(val => String(val).toLowerCase().includes(q)))
  }

  return rows
})

// Export CSV Function
const exportCurrentDatasetCSV = () => {
  const stream = currentActiveStreamObj.value
  const rows = filteredStreamRows.value
  if (!rows || rows.length === 0) return

  const headerLine = stream.columns.join(',')
  const rowLines = rows.map(r => stream.columns.map(c => `"${(r[c] || '').replace(/"/g, '""')}"`).join(','))
  const csvContent = 'data:text/csv;charset=utf-8,' + [headerLine, ...rowLines].join('\n')
  
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', stream.filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Export JSON Function
const exportCurrentDatasetJSON = () => {
  const stream = currentActiveStreamObj.value
  const rows = filteredStreamRows.value
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(rows, null, 2))
  const downloadAnchor = document.createElement('a')
  downloadAnchor.setAttribute('href', dataStr)
  downloadAnchor.setAttribute('download', stream.filename.replace('.csv', '.json'))
  document.body.appendChild(downloadAnchor)
  downloadAnchor.click()
  document.body.removeChild(downloadAnchor)
}

// 22 References Filtering State
const refCategoryFilter = ref<string>('all')
const jisebiReferences = ref<any[]>([])
const benchmarkDatasets = ref<any[]>([])
const papers = ref<any[]>([])
const loading = ref<boolean>(true)

const refCategories = computed(() => {
  const set = new Set<string>()
  jisebiReferences.value.forEach(r => {
    if (r.category) set.add(r.category)
  })
  return Array.from(set)
})

const filteredJisebiReferences = computed(() => {
  if (refCategoryFilter.value === 'all') return jisebiReferences.value
  return jisebiReferences.value.filter(r => r.category === refCategoryFilter.value)
})

const fetchDatasetHubData = async () => {
  loading.value = true
  try {
    const res = await fetch('/api/literature-hunter/dataset-hub?limit=600')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (data.success) {
      jisebiReferences.value = data.jisebi_manuscript_references || []
      benchmarkDatasets.value = data.open_benchmark_datasets || []
      papers.value = data.papers || []
    }
  } catch (e) {
    console.error('Failed to load dataset hub data:', e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDatasetHubData()
})
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

