<template>
  <div class="app-container">
    <!-- Navbar Header -->
    <Navbar />

    <main id="konten-utama" class="main-content" style="max-width: 1440px; margin: 0 auto; padding: 1.5rem 1rem;">
      <div class="flex flex-col h-full bg-slate-50/60 text-slate-900 p-2 sm:p-4 rounded-2xl overflow-y-auto space-y-6">
        
        <!-- HEADER BAR UTAMA PRESENTASI DISERTASI -->
        <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col gap-4">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-1.5">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  <span>🏛️</span> Standar Metodologi Disertasi (Konteks LAN RI)
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                  <span>🔬</span> Triangulasi Multimodal: Context + Zoom + LMS + Layanan Publik
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span>📊</span> 4 Tipologi Daerah & Dampak IPP
                </span>
              </div>
              <h1 class="text-2xl font-black text-slate-900 tracking-tight">
                Dataset Hub & Cetak Biru Kebutuhan Data Empiris
              </h1>
              <p class="text-xs sm:text-sm text-slate-600 mt-1 max-w-4xl leading-relaxed">
                Pemetaan kebutuhan dataset riset disertasi untuk menguji pengaruh <strong>Konteks Kedinasan & 4 Tipologi Spasial Daerah</strong> terhadap <strong>Jejak Perilaku Online (Zoom Meeting & LMS Moodle)</strong>, dimodelkan secara adil melalui <strong>CCBN</strong>, serta diukur dampaknya pada <strong>Indeks Pelayanan Publik (IPP)</strong>.
              </p>
            </div>

            <!-- ACTION BUTTONS -->
            <div class="flex items-center gap-2 self-start lg:self-center flex-wrap">
              <button
                type="button"
                @click="fetchDatasetHubData"
                :disabled="loading"
                class="px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <span :class="{ 'animate-spin': loading }">🔄</span>
                <span>Refresh Data</span>
              </button>
              <NuxtLink
                to="/model"
                class="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer flex items-center gap-1.5 shadow-2xs no-underline"
              >
                <span>📐</span>
                <span>Buka Model SEM-PLS →</span>
              </NuxtLink>
            </div>
          </div>

          <!-- SUB TABS NAVIGATION -->
          <div class="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap">
            <button
              type="button"
              @click="activeMainTab = 'architecture'"
              :class="`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeMainTab === 'architecture'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`"
            >
              <span>🗺️</span>
              <span>1. Alur Arsitektur Triangulasi Data (Diagram Disertasi)</span>
            </button>

            <button
              type="button"
              @click="activeMainTab = 'typology_spec'"
              :class="`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeMainTab === 'typology_spec'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`"
            >
              <span>🏛️</span>
              <span>2. 4 Tipologi Daerah & Spesifikasi Data Bab 3</span>
            </button>

            <button
              type="button"
              @click="activeMainTab = 'literature_map'"
              :class="`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeMainTab === 'literature_map'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`"
            >
              <span>🕸️</span>
              <span>3. Peta Literatur & Lanskap Teori (Network & Gap)</span>
            </button>

            <button
              type="button"
              @click="activeMainTab = 'literature_repo'"
              :class="`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeMainTab === 'literature_repo'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`"
            >
              <span>📚</span>
              <span>4. Repositori Literatur Acuan ({{ papers.length }} Paper)</span>
            </button>

            <button
              type="button"
              @click="activeMainTab = 'benchmarks'"
              :class="`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeMainTab === 'benchmarks'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`"
            >
              <span>🌐</span>
              <span>5. Benchmark Datasets ({{ benchmarkDatasets.length }})</span>
            </button>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 1: ARSITEKTUR ALUR TRIANGULASI DATA (INTERACTIVE FLOWCHART)          -->
        <!-- ========================================================================= -->
        <div v-if="activeMainTab === 'architecture'" class="space-y-6">
          
          <!-- Banner Pengantar Presentasi ke Promotor -->
          <div class="p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-white border border-blue-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300 mb-1.5">
                💡 Kerangka Metodologi & Triangulasi Data Disertasi
              </span>
              <h2 class="text-base font-black text-slate-900">
                Bagaimana Context Mengondisikan Interpretasi Perilaku Belajar ASN?
              </h2>
              <p class="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                ASN yang mematikan kamera Zoom atau jarang aktif bukan otomatis berarti tidak berniat belajar. Melalui pemodelan <strong>CCBN</strong>, perilaku tersebut dikontekstualisasikan berdasarkan <strong>Tipologi Daerah</strong> dan <strong>Beban Layanan Publik</strong>, sehingga diagnosis status keterlibatan ASN akurat dan objektif.
              </p>
            </div>
            <div class="shrink-0 text-xs font-bold text-slate-500 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs">
              Klik pada tiap tahapan kotak di bawah untuk melihat rincian datanya ⬇️
            </div>
          </div>

          <!-- DIAGRAM CANVAS INTERAKTIF -->
          <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col items-center">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6 text-center">
              PETA ARSITEKTUR INTEGRASI DATASET RISET DISERTASI
            </h3>

            <!-- LEVEL 1: CONTEXT DATA -->
            <div
              @click="openFlowModal('context')"
              :class="`w-full max-w-2xl p-4 rounded-xl border-2 transition cursor-pointer text-center relative ${
                selectedFlowStep === 'context'
                  ? 'border-blue-600 bg-blue-50/80 shadow-md ring-2 ring-blue-300'
                  : 'border-blue-300 bg-blue-50/40 hover:bg-blue-50'
              }`"
            >
              <span class="absolute -top-3 left-4 px-2 py-0.5 bg-blue-600 text-white rounded text-[10px] font-bold uppercase tracking-wider">
                Langkah 1: Input Konteks
              </span>
              <div class="text-xs font-bold text-blue-950 uppercase tracking-wide">
                CONTEXT DATA (DATA KONTEKS PEMODELAN)
              </div>
              <div class="text-xs font-medium text-blue-800 mt-1">
                Learner Profile • Service & Layanan Publik • 4 Tipologi Daerah • Kematangan SPBE Instansi
              </div>
              <div class="mt-2 text-[11px] text-slate-600">
                <strong>Sumber:</strong> Kuesioner Mandiri (48 Indikator) + Portal SPBE KemenPAN-RB + Data Pemda
              </div>
            </div>

            <!-- ARROW DOWN -->
            <div class="flex flex-col items-center py-2 text-slate-400">
              <span class="text-lg leading-none">│</span>
              <span class="text-lg leading-none">▼</span>
            </div>

            <!-- LEVEL 2: CONTEXT CONDITIONING -->
            <div
              @click="openFlowModal('conditioning')"
              :class="`w-full max-w-md p-3 rounded-xl border transition cursor-pointer text-center ${
                selectedFlowStep === 'conditioning'
                  ? 'border-slate-800 bg-slate-900 text-white shadow-md ring-2 ring-slate-400'
                  : 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`"
            >
              <div class="text-xs font-black uppercase tracking-wider">
                ⚙️ CONTEXT CONDITIONING
              </div>
              <div class="text-[11px] mt-0.5 opacity-90">
                Penetapan Baseline & Pembobotan Karakteristik Daerah & Beban Dinas
              </div>
            </div>

            <!-- BRANCHING ARROWS DOWN -->
            <div class="w-full max-w-2xl flex justify-around py-2 text-slate-400 text-xs">
              <span>┌─────────────────────────────</span>
              <span>┼</span>
              <span>─────────────────────────────┐</span>
            </div>

            <!-- LEVEL 3: 3 BEHAVIORAL TRACES SOURCES -->
            <div class="w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-3">
              <!-- Source 1: Zoom Log -->
              <div
                @click="openFlowModal('zoom')"
                :class="`p-3.5 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between ${
                  selectedFlowStep === 'zoom'
                    ? 'border-indigo-600 bg-indigo-50/80 shadow-md ring-2 ring-indigo-300'
                    : 'border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50'
                }`"
              >
                <div>
                  <span class="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                    📹 Sesi Virtual Online
                  </span>
                  <h4 class="text-xs font-bold text-slate-900 mt-1.5">ZOOM TELEMETRY</h4>
                  <ul class="text-[11px] text-slate-600 mt-1.5 space-y-1">
                    <li>• <strong>Camera State:</strong> On/Off ratio</li>
                    <li>• <strong>Chat Activity:</strong> Tanya/respons</li>
                    <li>• <strong>Attendance:</strong> Durasi & disconnect</li>
                  </ul>
                </div>
                <div class="mt-2 pt-2 border-t border-indigo-100 text-[10px] text-indigo-700 font-semibold">
                  Meeting Report & Telemetry Log
                </div>
              </div>

              <!-- Source 2: LMS Log -->
              <div
                @click="openFlowModal('lms')"
                :class="`p-3.5 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between ${
                  selectedFlowStep === 'lms'
                    ? 'border-cyan-600 bg-cyan-50/80 shadow-md ring-2 ring-cyan-300'
                    : 'border-cyan-200 bg-cyan-50/30 hover:bg-cyan-50'
                }`"
              >
                <div>
                  <span class="px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 text-[10px] font-bold">
                    💻 Sesi Asinkron Mandiri
                  </span>
                  <h4 class="text-xs font-bold text-slate-900 mt-1.5">LMS LOGS (MOODLE)</h4>
                  <ul class="text-[11px] text-slate-600 mt-1.5 space-y-1">
                    <li>• <strong>Access Time:</strong> Jam dinas vs malam</li>
                    <li>• <strong>Clickstream:</strong> Modul & materi</li>
                    <li>• <strong>Offline Download:</strong> Modul PDF</li>
                  </ul>
                </div>
                <div class="mt-2 pt-2 border-t border-cyan-100 text-[10px] text-cyan-700 font-semibold">
                  mdl_logstore_standard_log LAN
                </div>
              </div>

              <!-- Source 3: Other Traces -->
              <div
                @click="openFlowModal('traces')"
                :class="`p-3.5 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between ${
                  selectedFlowStep === 'traces'
                    ? 'border-teal-600 bg-teal-50/80 shadow-md ring-2 ring-teal-300'
                    : 'border-teal-200 bg-teal-50/30 hover:bg-teal-50'
                }`"
              >
                <div>
                  <span class="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-[10px] font-bold">
                    📝 Evaluasi Berkala
                  </span>
                  <h4 class="text-xs font-bold text-slate-900 mt-1.5">OTHER TRACES</h4>
                  <ul class="text-[11px] text-slate-600 mt-1.5 space-y-1">
                    <li>• Kuis formatif pemahaman</li>
                    <li>• Forum diskusi & peer review</li>
                    <li>• Latensi pengerjaan tugas</li>
                  </ul>
                </div>
                <div class="mt-2 pt-2 border-t border-teal-100 text-[10px] text-teal-700 font-semibold">
                  Formative Assessment Data
                </div>
              </div>
            </div>

            <!-- ARROWS MERGE DOWN -->
            <div class="w-full max-w-2xl flex justify-around py-2 text-slate-400 text-xs">
              <span>└─────────────────────────────</span>
              <span>┼</span>
              <span>─────────────────────────────┘</span>
            </div>
            <div class="text-slate-400 text-lg leading-none">▼</div>

            <!-- LEVEL 4: INTEGRATED BEHAVIOR PATTERNS -->
            <div
              @click="openFlowModal('patterns')"
              :class="`w-full max-w-md p-3 rounded-xl border transition cursor-pointer text-center ${
                selectedFlowStep === 'patterns'
                  ? 'border-purple-600 bg-purple-50 shadow-md ring-2 ring-purple-300'
                  : 'border-purple-200 bg-purple-50/40 hover:bg-purple-50'
              }`"
            >
              <div class="text-xs font-bold text-purple-950 uppercase tracking-wider">
                INTEGRATED BEHAVIOR PATTERNS
              </div>
              <div class="text-[11px] text-purple-800 mt-0.5">
                Fusi Multimodal: Attendance + Camera State + LMS Navigation Frequency
              </div>
            </div>

            <!-- ARROW DOWN -->
            <div class="flex flex-col items-center py-2 text-slate-400">
              <span class="text-lg leading-none">│</span>
              <span class="text-lg leading-none">▼</span>
            </div>

            <!-- LEVEL 5: CCBN ENGINE -->
            <div
              @click="openFlowModal('ccbn')"
              :class="`w-full max-w-md p-4 rounded-xl border-2 transition cursor-pointer text-center relative ${
                selectedFlowStep === 'ccbn'
                  ? 'border-amber-600 bg-amber-50 shadow-md ring-2 ring-amber-300'
                  : 'border-amber-300 bg-amber-50/50 hover:bg-amber-50'
              }`"
            >
              <span class="absolute -top-3 left-4 px-2 py-0.5 bg-amber-600 text-white rounded text-[10px] font-bold uppercase tracking-wider">
                Inti Pemodelan Inferensi
              </span>
              <div class="text-xs font-black text-amber-950 uppercase tracking-wider">
                🧠 CCBN (Context-Conditioned Bayesian Network)
              </div>
              <div class="text-[11px] font-bold text-amber-800 mt-1">
                Hierarchical Baseline &rarr; Deviation Analysis
              </div>
              <div class="text-[11px] text-slate-600 mt-1">
                Membedakan inaktivitas akibat kendala spasial/dinas vs penurunan minat kognitif
              </div>
            </div>

            <!-- ARROW DOWN -->
            <div class="flex flex-col items-center py-2 text-slate-400">
              <span class="text-lg leading-none">│</span>
              <span class="text-lg leading-none">▼</span>
            </div>

            <!-- LEVEL 6: CONTEXTUAL STATE TRIO -->
            <div class="w-full max-w-xl grid grid-cols-3 gap-2 text-center">
              <div
                @click="openFlowModal('state_stable')"
                :class="`p-2.5 rounded-xl border transition cursor-pointer ${
                  selectedFlowStep === 'state_stable'
                    ? 'border-emerald-600 bg-emerald-100 ring-2 ring-emerald-300'
                    : 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100'
                }`"
              >
                <div class="text-[11px] font-bold text-emerald-900">🟢 STABLE</div>
                <div class="text-[10px] text-emerald-700 mt-0.5">Sesuai Baseline</div>
                <div class="text-[10px] font-bold text-slate-500 mt-1">No Action</div>
              </div>

              <div
                @click="openFlowModal('state_adaptive')"
                :class="`p-2.5 rounded-xl border transition cursor-pointer ${
                  selectedFlowStep === 'state_adaptive'
                    ? 'border-blue-600 bg-blue-100 ring-2 ring-blue-300'
                    : 'border-blue-200 bg-blue-50 hover:bg-blue-100'
                }`"
              >
                <div class="text-[11px] font-bold text-blue-900">🔵 ADAPTIVE</div>
                <div class="text-[10px] text-blue-700 mt-0.5">Penyesuaian Format</div>
                <div class="text-[10px] font-bold text-slate-500 mt-1">Supportive Cue</div>
              </div>

              <div
                @click="openFlowModal('state_atrisk')"
                :class="`p-2.5 rounded-xl border transition cursor-pointer ${
                  selectedFlowStep === 'state_atrisk'
                    ? 'border-rose-600 bg-rose-100 ring-2 ring-rose-300'
                    : 'border-rose-200 bg-rose-50 hover:bg-rose-100'
                }`"
              >
                <div class="text-[11px] font-bold text-rose-900">🔴 AT-RISK</div>
                <div class="text-[10px] text-rose-700 mt-0.5">Deviasi Kritis</div>
                <div class="text-[10px] font-bold text-rose-700 mt-1">Target Intervensi</div>
              </div>
            </div>

            <!-- LEVEL 7: IMPACT ON PUBLIC SERVICES (OUTCOME HILIR) -->
            <div class="flex flex-col items-center py-2 text-slate-400">
              <span class="text-lg leading-none">│</span>
              <span class="text-lg leading-none">▼</span>
            </div>

            <div
              @click="openFlowModal('public_service_outcome')"
              :class="`w-full max-w-2xl p-4 rounded-xl border-2 transition cursor-pointer text-center relative ${
                selectedFlowStep === 'public_service_outcome'
                  ? 'border-emerald-600 bg-emerald-50/80 shadow-md ring-2 ring-emerald-300'
                  : 'border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50'
              }`"
            >
              <span class="absolute -top-3 left-4 px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold uppercase tracking-wider">
                Tujuan Hilir Disertasi (Outcome)
              </span>
              <div class="text-xs font-black text-emerald-950 uppercase tracking-wider">
                🏆 DAMPAK TERHADAP PENINGKATAN MUTU LAYANAN PUBLIK
              </div>
              <div class="text-xs font-semibold text-emerald-800 mt-1">
                Implementasi Aksi Perubahan • Indeks Pelayanan Publik (IPP) 2025 • Efektivitas Pelatihan
              </div>
              <div class="mt-1 text-[11px] text-slate-600">
                Menjawab mandat UU ASN: Pelatihan harus bermuara pada perbaikan pelayanan birokrasi kepada masyarakat
              </div>
            </div>

          </div>

          <!-- MODAL POP-UP PREVIEW DATASET ALUR RISET -->
          <div
            v-if="isFlowModalOpen && currentStepDetail"
            class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-6 transition-opacity"
            @click.self="closeFlowModal"
          >
            <div class="w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-slide-in text-slate-900">
              <!-- Modal Header -->
              <div class="p-5 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-3">
                <div>
                  <div class="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 uppercase tracking-wider">
                      {{ currentStepDetail.category }}
                    </span>
                    <span class="text-[11px] text-slate-500 font-semibold">
                      Katalog Dataset Empiris Disertasi
                    </span>
                  </div>
                  <h3 class="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    {{ currentStepDetail.title }}
                  </h3>
                </div>
                <button
                  type="button"
                  @click="closeFlowModal"
                  class="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition cursor-pointer text-base"
                  title="Tutup Modal (ESC)"
                >
                  ✕
                </button>
              </div>

              <!-- Modal Body (Scrollable) -->
              <div class="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs">
                <!-- Penjelasan Konseptual -->
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed space-y-1">
                  <span class="font-bold text-slate-900 block text-xs">🎯 Rasionalisasi Metodologi & Kebutuhan Data:</span>
                  <p>{{ currentStepDetail.description }}</p>
                </div>

                <!-- PREVIEW TABEL DATASET NYATA -->
                <div v-if="currentStepDetail.datasetPreview" class="space-y-2">
                  <div class="flex items-center justify-between flex-wrap gap-2">
                    <span class="font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <span>📊</span> Preview Struktur Data Ekstraksi (Sample Dataset):
                    </span>
                    <span class="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-100 text-blue-700 border border-slate-200 font-bold">
                      📁 {{ currentStepDetail.datasetPreview.tableName }}
                    </span>
                  </div>

                  <div class="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs">
                    <table class="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr class="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                          <th
                            v-for="col in currentStepDetail.datasetPreview.columns"
                            :key="col"
                            class="p-2.5 whitespace-nowrap text-[11px]"
                          >
                            {{ col }}
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-100 font-mono text-[11px]">
                        <tr
                          v-for="(row, rIdx) in currentStepDetail.datasetPreview.rows"
                          :key="rIdx"
                          class="hover:bg-blue-50/50 transition-colors"
                        >
                          <td
                            v-for="col in currentStepDetail.datasetPreview.columns"
                            :key="col"
                            class="p-2.5 whitespace-nowrap text-slate-800"
                          >
                            <span
                              v-if="row[col] && (row[col].includes('Sangat Baik') || row[col].includes('STABLE') || row[col].includes('Prima') || row[col].includes('Lulus'))"
                              class="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]"
                            >
                              {{ row[col] }}
                            </span>
                            <span
                              v-else-if="row[col] && (row[col].includes('ADAPTIVE') || row[col].includes('Supportive') || row[col].includes('Wajar'))"
                              class="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px]"
                            >
                              {{ row[col] }}
                            </span>
                            <span
                              v-else-if="row[col] && (row[col].includes('AT-RISK') || row[col].includes('Maksimal') || row[col].includes('Ekstrem'))"
                              class="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 font-bold text-[10px]"
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
                  <div class="text-[10px] text-slate-500 italic">
                    * Menampilkan cuplikan 4 baris data representatif yang mencakup variasi 4 Tipologi Daerah (Metropolitan, Daratan, Kepulauan, Perbatasan).
                  </div>
                </div>

                <!-- Parameter & Literatur Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <!-- Variabel & Parameter -->
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                      Variabel & Parameter Operasional
                    </span>
                    <ul class="space-y-1.5 text-xs text-slate-800">
                      <li v-for="(v, idx) in currentStepDetail.variables" :key="idx" class="flex items-start gap-1.5">
                        <span class="text-blue-600 font-bold">•</span>
                        <span>{{ v }}</span>
                      </li>
                    </ul>
                  </div>

                  <!-- Sumber Data & Literatur Acuan -->
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                      Sumber Pengambilan Data & Literatur Acuan
                    </span>
                    <div class="text-xs text-slate-800">
                      <strong>🏛️ Sumber Pengambilan:</strong> {{ currentStepDetail.source }}
                    </div>
                    <div class="text-xs text-slate-700 leading-relaxed mt-1">
                      📖 <strong>Rujukan Ilmiah:</strong> {{ currentStepDetail.literature }}
                    </div>
                    <div v-if="currentStepDetail.gapNote" class="mt-2.5 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-snug">
                      ⚡ <strong>Kebaruan & Celah Penelitian (Research Gap):</strong><br>
                      {{ currentStepDetail.gapNote }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Modal Footer -->
              <div class="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                <span class="text-xs text-slate-500 font-medium hidden sm:inline">
                  Spesifikasi data siap ditranskripsi ke Bab 3 Disertasi
                </span>
                <button
                  type="button"
                  @click="closeFlowModal"
                  class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer ml-auto shadow-2xs"
                >
                  Tutup Preview Dataset
                </button>
              </div>
            </div>
          </div>

        </div>

        <!-- ========================================================================= -->
        <!-- TAB 2: 4 TIPOLOGI DAERAH & SPESIFIKASI DATA BAB 3                        -->
        <!-- ========================================================================= -->
        <div v-else-if="activeMainTab === 'typology_spec'" class="space-y-6">
          
          <!-- Banner Tipologi Berbasis Literatur Bappenas & Geografi Digital -->
          <div class="p-6 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-white border border-purple-200 shadow-xs">
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                🏛️ Rujukan Resmi: Tipologi Wilayah Bappenas (RPJMN) & Perka BPS No. 120/2020
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                📚 Rujukan Akademis: Salemink et al. (2017) & Pratama (2020)
              </span>
            </div>
            <h2 class="text-xl font-black text-slate-900">
              Klasifikasi 4 Tipologi Daerah Pemerintahan & Konteks Belajar ASN
            </h2>
            <p class="text-xs sm:text-sm text-slate-600 mt-1 max-w-4xl leading-relaxed">
              Konteks spasial tidak disederhanakan hanya sebagai "daerah 3T", melainkan dikelompokkan ke dalam 4 spektrum tipologi administratif pemerintahan di Indonesia. Variasi ini memoderasi beban kerja, kestabilan jaringan, dan pola perilaku peserta pelatihan.
            </p>
          </div>

          <!-- 4 CARDS TIPOLOGI DAERAH -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <!-- Tipologi 1: Metropolitan -->
            <div class="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500 shadow-2xs transition flex flex-col justify-between space-y-3">
              <div>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                  Tipologi 1
                </span>
                <h3 class="text-sm font-bold text-slate-900 mt-1.5">Metropolitan & Pusat Pertumbuhan</h3>
                <p class="text-[11px] text-slate-500 font-medium">DKI Jakarta, Surabaya, Medan, Bandung, Makassar</p>
                <div class="mt-3 space-y-1.5 text-xs text-slate-700">
                  <div><strong>Infrastruktur:</strong> Fiber optik gigabit, 4G/5G merata, laptop dinas mandiri.</div>
                  <div><strong>Beban Kerja:</strong> Disposisi rapat pimpinan sangat tinggi & mendadak.</div>
                  <div><strong>Pola Zoom:</strong> Sering <em>multitasking</em>, kamera On saat diminta, chat minim karena mengerjakan berkas kantor.</div>
                  <div><strong>Pola LMS:</strong> Belajar malam hari (20.00-23.00) setelah jam kantor reda.</div>
                </div>
              </div>
              <div class="p-2 rounded-lg bg-blue-50 text-[10px] font-semibold text-blue-900 border border-blue-200">
                Pilar Evaluasi: Disrupsi waktu & beban tugas kantor.
              </div>
            </div>

            <!-- Tipologi 2: Perkotaan Sedang & Daratan -->
            <div class="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 shadow-2xs transition flex flex-col justify-between space-y-3">
              <div>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Tipologi 2
                </span>
                <h3 class="text-sm font-bold text-slate-900 mt-1.5">Perkotaan Sedang & Kabupaten Daratan</h3>
                <p class="text-[11px] text-slate-500 font-medium">Kab. Banyumas, Sleman, Malang, Banjar, Maros</p>
                <div class="mt-3 space-y-1.5 text-xs text-slate-700">
                  <div><strong>Infrastruktur:</strong> 4G stabil, Wi-Fi kantor pemda memadai, listrik stabil.</div>
                  <div><strong>Beban Kerja:</strong> Pelayanan publik tatap muka rutin di kantor dinas.</div>
                  <div><strong>Pola Zoom:</strong> Mengikuti Zoom dari ruang kerja bersama (cubicle/aula dinas), kamera Off saat ruangan berisik.</div>
                  <div><strong>Pola LMS:</strong> Akses teratur di sela-sela jam kerja dinas siang hari.</div>
                </div>
              </div>
              <div class="p-2 rounded-lg bg-emerald-50 text-[10px] font-semibold text-emerald-900 border border-emerald-200">
                Pilar Evaluasi: Ruang kerja bersama & fokus pelayanan publik.
              </div>
            </div>

            <!-- Tipologi 3: Kepulauan & Maritim -->
            <div class="p-4 rounded-xl bg-white border border-slate-200 hover:border-cyan-500 shadow-2xs transition flex flex-col justify-between space-y-3">
              <div>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-100 text-cyan-800">
                  Tipologi 3
                </span>
                <h3 class="text-sm font-bold text-slate-900 mt-1.5">Wilayah Kepulauan & Maritim</h3>
                <p class="text-[11px] text-slate-500 font-medium">Kab. Natuna, Kep. Anambas, Kep. Aru, Kep. Sangihe</p>
                <div class="mt-3 space-y-1.5 text-xs text-slate-700">
                  <div><strong>Infrastruktur:</strong> Kabel laut / radio link, rentan cuaca ekstrem laut.</div>
                  <div><strong>Beban Kerja:</strong> Mobilitas penugasan dinas pelayaran antar-pulau.</div>
                  <div><strong>Pola Zoom:</strong> Matikan kamera demi menjaga kestabilan audio agar tidak terputus (*bandwidth coping*).</div>
                  <div><strong>Pola LMS:</strong> Sangat membutuhkan pengunduhan materi PDF untuk dibaca offline.</div>
                </div>
              </div>
              <div class="p-2 rounded-lg bg-cyan-50 text-[10px] font-semibold text-cyan-900 border border-cyan-200">
                Pilar Evaluasi: Strategi adaptasi kuota & pembelajaran offline.
              </div>
            </div>

            <!-- Tipologi 4: Perbatasan & Wilayah Khusus -->
            <div class="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-500 shadow-2xs transition flex flex-col justify-between space-y-3">
              <div>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                  Tipologi 4
                </span>
                <h3 class="text-sm font-bold text-slate-900 mt-1.5">Perbatasan & Wilayah Khusus Pedalaman</h3>
                <p class="text-[11px] text-slate-500 font-medium">Kab. Belu, Nunukan, Jayawijaya, Mahakam Ulu</p>
                <div class="mt-3 space-y-1.5 text-xs text-slate-700">
                  <div><strong>Infrastruktur:</strong> Satelit VSAT / genset bergilir malam hari.</div>
                  <div><strong>Beban Kerja:</strong> Multi-role aparat di garda terdepan kedaulatan negara.</div>
                  <div><strong>Pola Zoom:</strong> Mengakses Zoom via smartphone di titik sinyal tertentu, sering reconnect.</div>
                  <div><strong>Pola LMS:</strong> Memilih ringkasan materi microlearning 3-5 menit.</div>
                </div>
              </div>
              <div class="p-2 rounded-lg bg-amber-50 text-[10px] font-semibold text-amber-900 border border-amber-200">
                Pilar Evaluasi: Keterbatasan akses fisik & format ringkas adaptif.
              </div>
            </div>

          </div>

          <!-- TABEL SPESIFIKASI VARIABEL DATA BAB 3 DISERTASI -->
          <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
              <div>
                <h3 class="text-sm font-black text-slate-900">
                  TABEL MATRIKS OPERASIONAL VARIABEL DATASET (BAB 3 DISERTASI)
                </h3>
                <p class="text-xs text-slate-500">
                  Triangulasi 3 aliran data empiris: Konteks Kedinasan, Jejak Digital Online, dan Evaluasi Kinerja Layanan Publik
                </p>
              </div>
              <span class="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold">
                ✓ Matriks Operasional Bab 3 Terverifikasi
              </span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th class="p-3 font-bold">Aliran Data (Stream)</th>
                    <th class="p-3 font-bold">Variabel / Indikator Operasional</th>
                    <th class="p-3 font-bold">Cara & Sumber Pengambilan</th>
                    <th class="p-3 font-bold">Skala / Satuan</th>
                    <th class="p-3 font-bold">Rujukan Literatur & Status Gap</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 text-slate-800">
                  
                  <!-- Stream 1: Context Data -->
                  <tr class="hover:bg-slate-50">
                    <td class="p-3 font-bold text-blue-900 align-top">
                      1. Context Data<br>
                      <span class="text-[10px] font-normal text-slate-500">Konteks Kedinasan & Spasial</span>
                    </td>
                    <td class="p-3 space-y-1 align-top">
                      <div>• <strong>Spasial:</strong> 4 Tipologi Daerah & Zona Waktu (WIB/WITA/WIT)</div>
                      <div>• <strong>Service:</strong> Frontline (Pelayanan Langsung) vs Back-office</div>
                      <div>• <strong>Workload:</strong> Overlap penugasan mendadak pimpinan</div>
                      <div>• <strong>Institutional:</strong> Indeks SPBE Instansi Pengirim</div>
                    </td>
                    <td class="p-3 align-top">
                      Instrumen Kuesioner Mandiri (48 butir) + Integrasi Data SPBE KemenPAN-RB
                    </td>
                    <td class="p-3 align-top">
                      Skala Likert (1–5), Kategori Nominal, Indeks SPBE (1–5)
                    </td>
                    <td class="p-3 align-top">
                      <div class="font-semibold text-slate-900">Bappenas RPJMN; Salemink (2017); Pratama (2020)</div>
                      <div class="text-[11px] text-slate-500 mt-0.5">Mendasari klasifikasi spasial & SPBE</div>
                    </td>
                  </tr>

                  <!-- Stream 2: Zoom Traces -->
                  <tr class="hover:bg-slate-50">
                    <td class="p-3 font-bold text-indigo-900 align-top">
                      2. Zoom Behavioral Traces<br>
                      <span class="text-[10px] font-normal text-slate-500">Sesi Synchronous Virtual</span>
                    </td>
                    <td class="p-3 space-y-1 align-top">
                      <div>• <strong>Camera State:</strong> Rasio durasi On vs Off</div>
                      <div>• <strong>Chat Engagement:</strong> Frekuensi chat tanya/jawab</div>
                      <div>• <strong>Attendance:</strong> Durasi hadir & jumlah reconnect</div>
                      <div>• <strong>Reaction:</strong> Penggunaan emoji & hand-raise</div>
                    </td>
                    <td class="p-3 align-top">
                      Meeting Report CSV Penyelenggara Zoom & Telemetri WebRTC
                    </td>
                    <td class="p-3 align-top">
                      Menit, Rasio Persentase, Count Interaksi, Jumlah Putus
                    </td>
                    <td class="p-3 align-top">
                      <div class="font-semibold text-slate-900">Castelli & Sarvary (2021); Bedenlier (2021)</div>
                      <div class="text-[11px] text-amber-700 font-bold mt-0.5">⚡ Gap: Belum ada kajian pada birokrasi ASN Indonesia</div>
                    </td>
                  </tr>

                  <!-- Stream 3: LMS Logs -->
                  <tr class="hover:bg-slate-50">
                    <td class="p-3 font-bold text-cyan-900 align-top">
                      3. LMS Interaction Traces<br>
                      <span class="text-[10px] font-normal text-slate-500">Sesi Asynchronous Mandiri</span>
                    </td>
                    <td class="p-3 space-y-1 align-top">
                      <div>• <strong>Temporal Access:</strong> Jam dinas (08-16) vs malam</div>
                      <div>• <strong>Download Activity:</strong> Pengunduhan materi PDF</div>
                      <div>• <strong>Video Interaction:</strong> Drop-off rate & rewind</div>
                      <div>• <strong>Navigation Stream:</strong> Urutan modul dibuka</div>
                    </td>
                    <td class="p-3 align-top">
                      Database Log Moodle LMS ASN Unggul LAN (<code class="text-[10px] bg-slate-100 px-1 py-0.5 rounded">mdl_logstore_standard_log</code>)
                    </td>
                    <td class="p-3 align-top">
                      Timestamp, Hit Count, Durasi Detik Tonton
                    </td>
                    <td class="p-3 align-top">
                      <div class="font-semibold text-slate-900">OULAD Benchmark (2020); Moodle EDM Literature</div>
                      <div class="text-[11px] text-slate-500 mt-0.5">Acuan ekstraksi fitur clickstream</div>
                    </td>
                  </tr>

                  <!-- Stream 4: Public Service Outcome -->
                  <tr class="hover:bg-slate-50">
                    <td class="p-3 font-bold text-emerald-900 align-top">
                      4. Public Service Outcome<br>
                      <span class="text-[10px] font-normal text-slate-500">Dampak Hilir Layanan Publik</span>
                    </td>
                    <td class="p-3 space-y-1 align-top">
                      <div>• <strong>IPP 2025:</strong> Indeks Pelayanan Publik Pemda</div>
                      <div>• <strong>Aksi Perubahan:</strong> Skor adopsi proyek inovasi</div>
                      <div>• <strong>Pre/Post Test:</strong> Gain score kompetensi</div>
                      <div>• <strong>Mentor Feedback:</strong> Evaluasi atasan langsung</div>
                    </td>
                    <td class="p-3 align-top">
                      Portal Evaluasi KemenPAN-RB & Database Puslatbang LAN RI
                    </td>
                    <td class="p-3 align-top">
                      Nilai Numerik (0–100), Predikat Mutu Layanan (A s.d. F)
                    </td>
                    <td class="p-3 align-top">
                      <div class="font-semibold text-slate-900">Kirkpatrick Level 3-4; PermenPAN-RB Evaluasi Pelayanan Publik</div>
                      <div class="text-[11px] text-emerald-700 font-bold mt-0.5">🎯 Tolok ukur kebermanfaatan disertasi bagi negara</div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

        </div>

        <!-- ========================================================================= -->
        <!-- TAB 3: PETA LITERATUR & LANSKAP TEORETIS (NETWORK & GAP)                  -->
        <!-- ========================================================================= -->
        <div v-else-if="activeMainTab === 'literature_map'">
          <LiteratureNetworkMap :papers="papers" @select-paper="openPaperDetail" />
        </div>

        <!-- ========================================================================= -->
        <!-- TAB 4: REPOSITORI LITERATUR ACUAN (271 PAPERS)                           -->
        <!-- ========================================================================= -->
        <div v-else-if="activeMainTab === 'literature_repo'" class="space-y-5">
          
          <!-- Summary Box Gap Ilmiah -->
          <div class="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
            <h3 class="font-bold flex items-center gap-1.5 text-sm text-amber-900">
              <span>⚡</span> Kebaruan & Celah Riset Empiris (State of the Art & Research Gap)
            </h3>
            <p class="leading-relaxed">
              Sebagian besar literatur global <em>learning analytics</em> dan telemetri Zoom (misal: <em>Castelli & Sarvary, 2021</em>; <em>Bedenlier et al., 2021</em>) menguji populasi <strong>mahasiswa di negara maju</strong> yang memiliki infrastruktur seragam dan tidak memiliki tanggung jawab kedinasan publik. 
              <strong>Kebaruan disertasi ini adalah membuktikan bahwa perilaku belajar online aparatur birokrasi dipengaruhi secara kuat oleh Tipologi Daerah penugasan dan dinamika pelayanan publik.</strong>
            </p>
          </div>

          <!-- FILTER BAR -->
          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between">
            <div class="relative w-full md:w-80">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari paper, variabel, atau tipologi..."
                class="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
              <span class="absolute right-3 top-2.5 text-slate-400 text-xs">🔍</span>
            </div>

            <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <select
                v-model="selectedDataType"
                class="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="all">Semua Tipe Data ({{ papers.length }})</option>
                <option v-for="item in dataTypeDist" :key="item.name" :value="item.name">
                  {{ item.name }} ({{ item.count }})
                </option>
              </select>

              <select
                v-model="selectedPopulation"
                class="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="all">Semua Populasi</option>
                <option v-for="item in popDist" :key="item.name" :value="item.name">
                  {{ item.name }} ({{ item.count }})
                </option>
              </select>
            </div>
          </div>

          <!-- PAPERS GRID -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="paper in paginatedPapers"
              :key="paper.id"
              class="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-500 shadow-2xs hover:shadow-md transition flex flex-col justify-between gap-3"
            >
              <div>
                <div class="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                  <span :class="`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getDataTypeBadgeClass(paper.primary_data_type)}`">
                    {{ paper.primary_data_type }}
                  </span>
                  <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    👥 {{ paper.population }}
                  </span>
                </div>

                <h4 class="text-sm font-bold text-slate-900 leading-snug hover:text-blue-700 cursor-pointer" @click="openPaperDetail(paper)">
                  {{ paper.title }}
                </h4>
                <p class="text-[11px] text-slate-500 mt-1">
                  👤 {{ paper.authors }} • <span v-if="paper.year">{{ paper.year }} •</span> {{ paper.journal }}
                </p>

                <div class="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1 text-[11px]">
                  <div class="flex items-center justify-between">
                    <span class="text-slate-500">📏 Sampel:</span>
                    <span class="font-bold text-amber-800">{{ paper.sample_size }}</span>
                  </div>
                  <div class="flex items-start justify-between gap-2">
                    <span class="text-slate-500 shrink-0">🏷️ Variabel:</span>
                    <div class="flex flex-wrap gap-1 justify-end">
                      <span v-for="v in paper.key_variables" :key="v" class="px-1.5 py-0.5 rounded text-[10px] bg-white border border-slate-200 text-slate-700">
                        {{ v }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  @click="openPaperDetail(paper)"
                  class="text-blue-700 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  Detail Metodologi ➔
                </button>
                <a
                  :href="paper.landing_url || `http://localhost:8088/api/literature-hunter/files/${paper.id}/view`"
                  target="_blank"
                  class="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold transition no-underline"
                >
                  📄 Dokumen
                </a>
              </div>
            </div>
          </div>

          <!-- PAGINATION -->
          <div v-if="totalPages > 1" class="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between text-xs">
            <span class="text-slate-500">
              Menampilkan {{ startItemIndex }}-{{ endItemIndex }} dari {{ totalFilteredCount }} paper (Hal {{ currentPage }}/{{ totalPages }})
            </span>
            <div class="flex items-center gap-1.5">
              <button
                :disabled="currentPage === 1"
                @click="goToPage(currentPage - 1)"
                class="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 disabled:opacity-30 font-bold"
              >
                ‹
              </button>
              <button
                v-for="p in visiblePages"
                :key="p"
                @click="goToPage(p)"
                :class="`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  currentPage === p ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
                }`"
              >
                {{ p }}
              </button>
              <button
                :disabled="currentPage === totalPages"
                @click="goToPage(currentPage + 1)"
                class="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 disabled:opacity-30 font-bold"
              >
                ›
              </button>
            </div>
          </div>

        </div>

        <!-- ========================================================================= -->
        <!-- TAB 4: BENCHMARK DATASETS                                                -->
        <!-- ========================================================================= -->
        <div v-else-if="activeMainTab === 'benchmarks'" class="space-y-4">
          <div class="p-5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
            <h3 class="font-bold text-blue-950 mb-1 flex items-center gap-1.5 text-sm">
              <span>🌐</span> Katalog Benchmark Datasets & Data Primer Riset
            </h3>
            <p>
              Dataset terbuka berskala internasional digunakan sebagai acuan awal (baseline) pengujian algoritma machine learning, berdampingan dengan data primer internal kuesioner dan log telemetri kedinasan LAN RI.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="bm in benchmarkDatasets"
              :key="bm.id"
              class="p-5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition flex flex-col justify-between gap-4"
            >
              <div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {{ bm.data_type }}
                </span>
                <h4 class="text-base font-bold text-slate-900 mt-1.5">{{ bm.name }}</h4>
                <p class="text-[11px] text-slate-500 font-medium">🏛️ {{ bm.provider }} • Lisensi: {{ bm.license }}</p>

                <p class="text-xs text-slate-600 leading-relaxed mt-2">
                  {{ bm.description }}
                </p>

                <div class="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-700">
                  <div class="flex justify-between">
                    <span class="text-slate-500">Volume:</span>
                    <span class="font-bold text-blue-800">{{ bm.volume }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-500">Format:</span>
                    <span class="font-mono text-slate-800">{{ bm.format }}</span>
                  </div>
                  <div class="flex justify-between items-start gap-2">
                    <span class="text-slate-500 shrink-0">Variabel:</span>
                    <span class="font-mono text-[10px] text-slate-600 text-right">{{ bm.variables.join(', ') }}</span>
                  </div>
                </div>

                <div class="mt-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800">
                  💡 <strong>Relevansi Disertasi:</strong> {{ bm.relevance }}
                </div>

                <div v-if="bm.is_open === false" class="mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                  🔒 <strong>Akses Kedinasan:</strong> {{ bm.access_note || 'Data internal tertutup. Dilindungi UU PDP & memerlukan izin resmi institusi LAN RI.' }}
                </div>
              </div>

              <div class="pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                <span :class="`text-xs font-semibold ${bm.is_open !== false ? 'text-emerald-700' : 'text-amber-700'}`">
                  {{ bm.is_open !== false ? '🌐 Akses Publik & Terbuka' : '🔒 Akses Tertutup (Institusional)' }}
                </span>
                <a
                  :href="bm.url"
                  target="_blank"
                  :class="`px-3.5 py-1.5 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 transition shadow-2xs no-underline ${
                    bm.is_open !== false ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-800 hover:bg-slate-900'
                  }`"
                >
                  <span v-if="bm.is_open !== false">🔗 Buka Repository Dataset</span>
                  <span v-else>🏛️ Kunjungi Portal Institusi</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- SLIDE-OUT PAPER DETAIL DRAWER                                             -->
        <!-- ========================================================================= -->
        <div
          v-if="isDrawerOpen && selectedPaper"
          class="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs transition-opacity"
          @click.self="closeDrawer"
        >
          <div class="w-full max-w-2xl bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl overflow-hidden animate-slide-in text-slate-900">
            <div class="p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between">
              <div>
                <span :class="`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getDataTypeBadgeClass(selectedPaper.primary_data_type)}`">
                  {{ selectedPaper.primary_data_type }}
                </span>
                <h3 class="text-base font-bold text-slate-900 mt-1.5 leading-snug">{{ selectedPaper.title }}</h3>
                <p class="text-xs text-slate-500 mt-1">👤 {{ selectedPaper.authors }} • {{ selectedPaper.journal }}</p>
              </div>
              <button
                type="button"
                @click="closeDrawer"
                class="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div class="flex-1 overflow-y-auto p-6 space-y-5">
              <div class="grid grid-cols-2 gap-3 text-xs">
                <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span class="text-slate-500 uppercase font-bold text-[10px]">Populasi / Subjek</span>
                  <p class="font-bold text-slate-900 mt-1">{{ selectedPaper.population }}</p>
                </div>
                <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span class="text-slate-500 uppercase font-bold text-[10px]">Ukuran Sampel / Volume</span>
                  <p class="font-bold text-amber-800 mt-1">{{ selectedPaper.sample_size }}</p>
                </div>
              </div>

              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-600">Variabel & Parameter yang Diuji:</h4>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="v in selectedPaper.key_variables"
                    :key="v"
                    class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 shadow-2xs"
                  >
                    {{ v }}
                  </span>
                </div>
              </div>

              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-600">Abstrak Lengkap & Analisis Metodologi:</h4>
                <p class="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {{ selectedPaper.full_abstract || selectedPaper.abstract }}
                </p>
              </div>
            </div>

            <div class="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <a
                :href="selectedPaper.landing_url || `http://localhost:8088/api/literature-hunter/files/${selectedPaper.id}/view`"
                target="_blank"
                class="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-2xs no-underline"
              >
                📄 Buka Dokumen Referensi
              </a>
              <button
                type="button"
                @click="closeDrawer"
                class="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import Navbar from '~/components/Navbar.vue'
import LiteratureNetworkMap from '~/components/LiteratureNetworkMap.vue'

// Inject Tailwind Play CDN safely with preflight disabled
useHead({
  title: 'Dataset Hub & Kebutuhan Data Empiris - Disertasi ASN',
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

// Tab Navigation State
const activeMainTab = ref<'architecture' | 'typology_spec' | 'literature_map' | 'literature_repo' | 'benchmarks'>('architecture')

// Flowchart Inspector Step & Modal State
const selectedFlowStep = ref<string>('context')
const isFlowModalOpen = ref<boolean>(false)

const openFlowModal = (stepKey: string) => {
  selectedFlowStep.value = stepKey
  isFlowModalOpen.value = true
}

const closeFlowModal = () => {
  isFlowModalOpen.value = false
}

interface DatasetPreviewTable {
  tableName: string
  columns: string[]
  rows: Record<string, string>[]
}

interface StepDetail {
  title: string
  category: string
  description: string
  variables: string[]
  source: string
  literature: string
  gapNote?: string
  datasetPreview?: DatasetPreviewTable
}

const flowStepsDictionary: Record<string, StepDetail> = {
  context: {
    title: 'CONTEXT DATA (Konteks Moderasi Kedinasan & Wilayah)',
    category: 'Input Conditioning Layer',
    description: 'Data fondasi yang menangkap karakteristik unik ASN sebelum dan selama pelatihan. Menjadi prior condition agar analisis perilaku tidak bias atau seragam.',
    variables: [
      'Learner Demographics: Usia, masa kerja, tipe perangkat (Mobile vs Laptop pribadi/kantor)',
      'Service Dynamics: Penugasan pelayanan publik langsung (frontline) vs back-office',
      'Spatial Typology: 4 Tipologi Daerah (Metropolitan, Daratan, Kepulauan, Perbatasan)',
      'Time-Zone Disparity: Zona waktu instansi (WIB, WITA, WIT) terhadap jadwal pusat',
      'Institutional Maturity: Skor & Predikat Kematangan SPBE Pemda (KemenPAN-RB)'
    ],
    source: 'Instrumen Kuesioner Empiris (48 Butir) & Portal Resmi KemenPAN-RB',
    literature: 'Bappenas RPJMN Tipologi Spasial; Salemink et al. (2017); Kukulska-Hulme (2021)',
    gapNote: 'Di literatur Barat, konteks birokrasi kepulauan dan perbedaan zona waktu pelatihan jarang diteliti secara bersamaan.',
    datasetPreview: {
      tableName: 'asn_context_demographics.csv',
      columns: ['asn_id', 'tipologi_daerah', 'provinsi_kab', 'zona_waktu', 'tipe_layanan', 'beban_disposisi', 'spbe_indeks', 'perangkat'],
      rows: [
        {
          asn_id: 'ASN-0121',
          tipologi_daerah: 'Metropolitan',
          provinsi_kab: 'DKI Jakarta',
          zona_waktu: 'WIB',
          tipe_layanan: 'Back-Office (Sekretariat)',
          beban_disposisi: 'Tinggi (4/5)',
          spbe_indeks: '4.21 (Sangat Baik)',
          perangkat: 'Laptop Dinas'
        },
        {
          asn_id: 'ASN-0482',
          tipologi_daerah: 'Kepulauan',
          provinsi_kab: 'Kep. Riau (Natuna)',
          zona_waktu: 'WIB',
          tipe_layanan: 'Frontline (Pesisir)',
          beban_disposisi: 'Sedang (3/5)',
          spbe_indeks: '2.84 (Baik)',
          perangkat: 'Smartphone 4G'
        },
        {
          asn_id: 'ASN-0733',
          tipologi_daerah: 'Daratan',
          provinsi_kab: 'Jateng (Banyumas)',
          zona_waktu: 'WIB',
          tipe_layanan: 'Frontline (Puskesmas)',
          beban_disposisi: 'Maksimal (5/5)',
          spbe_indeks: '3.62 (Baik)',
          perangkat: 'Laptop Pribadi'
        },
        {
          asn_id: 'ASN-0914',
          tipologi_daerah: 'Perbatasan',
          provinsi_kab: 'NTT (Kab. Belu)',
          zona_waktu: 'WITA',
          tipe_layanan: 'Frontline (Pos Batas)',
          beban_disposisi: 'Sedang (3/5)',
          spbe_indeks: '2.45 (Cukup)',
          perangkat: 'Smartphone Mobile'
        }
      ]
    }
  },
  conditioning: {
    title: 'CONTEXT CONDITIONING (Normalisasi Bobot Konteks)',
    category: 'Mathematical Conditioning Engine',
    description: 'Mekanisme komputasi yang menyesuaikan baseline ekspektasi keaktifan berdasarkan profil daerah dan beban kerja dinas yang sedang dihadapi ASN.',
    variables: [
      'Context Weighting Vector: Penyesuaian threshold toleransi inaktivitas',
      'Bandwidth Penalty Factor: Normalisasi kendala sinyal maritim/cuaca buruk',
      'Urgent Dispatch Masking: Penandaan izin penugasan mendadak pimpinan daerah'
    ],
    source: 'Algoritma Bayesian Prior Normalization di server',
    literature: 'Pearl (Causal Inference in Statistics); Gelman et al. (Hierarchical Bayesian Modeling)',
    datasetPreview: {
      tableName: 'context_conditioning_weights.csv',
      columns: ['tipologi_daerah', 'bobot_prior_toleransi', 'faktor_bandwidth_penalty', 'izin_disposisi_dinas', 'threshold_inaktivitas'],
      rows: [
        {
          tipologi_daerah: 'Metropolitan',
          bobot_prior_toleransi: '1.00 (Standard)',
          faktor_bandwidth_penalty: '0.05 (Koneksi Stabil)',
          izin_disposisi_dinas: 'Diizinkan (Multitasking)',
          threshold_inaktivitas: 'Toleransi 15 menit'
        },
        {
          tipologi_daerah: 'Daratan',
          bobot_prior_toleransi: '1.15 (Sedang)',
          faktor_bandwidth_penalty: '0.15 (Toleransi wajar)',
          izin_disposisi_dinas: 'Diizinkan (Prioritas Layanan)',
          threshold_inaktivitas: 'Toleransi 30 menit'
        },
        {
          tipologi_daerah: 'Kepulauan',
          bobot_prior_toleransi: '1.45 (Tinggi)',
          faktor_bandwidth_penalty: '0.40 (Toleransi kabel laut/cuaca)',
          izin_disposisi_dinas: 'Diizinkan (Dinas Lapangan Laut)',
          threshold_inaktivitas: 'Toleransi 60 menit'
        },
        {
          tipologi_daerah: 'Perbatasan',
          bobot_prior_toleransi: '1.60 (Maksimal)',
          faktor_bandwidth_penalty: '0.50 (Toleransi satelit/genset)',
          izin_disposisi_dinas: 'Diizinkan (Garda Depan Kedaulatan)',
          threshold_inaktivitas: 'Toleransi 90 menit'
        }
      ]
    }
  },
  zoom: {
    title: 'ZOOM TELEMETRY (Jejak Perilaku Sesi Virtual Synchronous)',
    category: 'Real-time Synchronous Behavioral Traces',
    description: 'Data telemetri langsung dari platform webinar Zoom saat materi tatap muka virtual berlangsung.',
    variables: [
      'Camera State Ratio: Durasi kamera On vs Off sepanjang sesi (detik/persen)',
      'Chat Engagement Frequency: Jumlah chat tanya-jawab dan respons diskusi',
      'Attendance & Reconnect Continuity: Waktu join-to-leave dan frekuensi terpental sinyal',
      'Non-verbal Reaction: Frekuensi raise-hand dan penggunaan emoji respons'
    ],
    source: 'Meeting Attendance Report CSV & WebRTC Call Quality Metrics Zoom',
    literature: 'Castelli & Sarvary (2021) - "Why students turn off cameras"; Bedenlier et al. (2021)',
    gapNote: 'Studi Zoom pada pelatihan ASN sangat langka; mematikan kamera sering disalahartikan sebagai ketidakpedulian padahal merupakan strategi hemat kuota.',
    datasetPreview: {
      tableName: 'zoom_session_telemetry_report.csv',
      columns: ['asn_id', 'tipologi', 'durasi_sesi_menit', 'camera_on_menit', 'camera_off_menit', 'rasio_camera_off', 'frekuensi_chat', 'reconnect_count', 'catatan_telemetri'],
      rows: [
        {
          asn_id: 'ASN-0121',
          tipologi: 'Metropolitan',
          durasi_sesi_menit: '120 min',
          camera_on_menit: '95 min',
          camera_off_menit: '25 min',
          rasio_camera_off: '20.8%',
          frekuensi_chat: '3 pesan',
          reconnect_count: '0 kali',
          catatan_telemetri: 'Kamera On mayoritas, chat minim (fokus berkas dinas)'
        },
        {
          asn_id: 'ASN-0482',
          tipologi: 'Kepulauan',
          durasi_sesi_menit: '120 min',
          camera_on_menit: '15 min',
          camera_off_menit: '105 min',
          rasio_camera_off: '87.5%',
          frekuensi_chat: '1 pesan',
          reconnect_count: '4 kali',
          catatan_telemetri: 'Kamera Off untuk hemat bandwidth & cuaca laut'
        },
        {
          asn_id: 'ASN-0733',
          tipologi: 'Daratan',
          durasi_sesi_menit: '120 min',
          camera_on_menit: '40 min',
          camera_off_menit: '80 min',
          rasio_camera_off: '66.7%',
          frekuensi_chat: '8 pesan',
          reconnect_count: '1 kali',
          catatan_telemetri: 'Kamera Off saat ruangan puskesmas ramai warga'
        },
        {
          asn_id: 'ASN-0914',
          tipologi: 'Perbatasan',
          durasi_sesi_menit: '120 min',
          camera_on_menit: '10 min',
          camera_off_menit: '110 min',
          rasio_camera_off: '91.7%',
          frekuensi_chat: '0 pesan',
          reconnect_count: '6 kali',
          catatan_telemetri: 'Sering reconnect akibat sinyal tower bergantian'
        }
      ]
    }
  },
  lms: {
    title: 'LMS MOODLE LOGS (Jejak Interaksi Asinkron Mandiri)',
    category: 'Asynchronous Platform Interaction Traces',
    description: 'Log klik dan navigasi peserta saat mengakses modul pembelajaran mandiri di LMS ASN Unggul LAN RI.',
    variables: [
      'Temporal Access Pattern: Jam akses modul (Jam kantor dinas 08.00-16.00 vs malam hari)',
      'Content Navigation Flow: Urutan modul, video, dan kuis yang diakses',
      'Offline Download Ratio: Frekuensi pengunduhan file modul PDF ringkas',
      'Video Engagement: Rasio durasi tonton video microlearning (drop-off rate & rewind)'
    ],
    source: 'Database Log Moodle LAN RI (mdl_logstore_standard_log)',
    literature: 'OULAD Dataset Benchmark (2020); Romero & Ventura (Educational Data Mining in Moodle)',
    datasetPreview: {
      tableName: 'moodle_mdl_logstore_standard_log.csv',
      columns: ['asn_id', 'timestamp', 'jam_akses', 'kategori_jam', 'komponen_moodle', 'aksi', 'unduh_pdf_offline', 'video_completion_pct'],
      rows: [
        {
          asn_id: 'ASN-0121',
          timestamp: '2026-08-25 21:14:02',
          jam_akses: '21:14',
          kategori_jam: 'Malam (Luar Kantor)',
          komponen_moodle: 'mod_resource',
          aksi: 'viewed',
          unduh_pdf_offline: '1 kali',
          video_completion_pct: '100% (Selesai)'
        },
        {
          asn_id: 'ASN-0482',
          timestamp: '2026-08-26 13:40:11',
          jam_akses: '13:40',
          kategori_jam: 'Jam Kerja (Istirahat)',
          komponen_moodle: 'mod_folder',
          aksi: 'download_all_pdf',
          unduh_pdf_offline: '5 dokumen',
          video_completion_pct: '35% (Drop-off Sinyal)'
        },
        {
          asn_id: 'ASN-0733',
          timestamp: '2026-08-26 10:20:05',
          jam_akses: '10:20',
          kategori_jam: 'Jam Dinas Pelayanan',
          komponen_moodle: 'mod_quiz',
          aksi: 'attempt_started',
          unduh_pdf_offline: '0 kali',
          video_completion_pct: '85%'
        },
        {
          asn_id: 'ASN-0914',
          timestamp: '2026-08-26 19:05:40',
          jam_akses: '19:05',
          kategori_jam: 'Malam (Genset Nyala)',
          komponen_moodle: 'mod_lesson',
          aksi: 'micro_module_read',
          unduh_pdf_offline: '3 dokumen',
          video_completion_pct: '95% (Format Teks Ringkas)'
        }
      ]
    }
  },
  traces: {
    title: 'OTHER TRACES (Evaluasi Formatif & Kolaborasi)',
    category: 'Formative Assessment & Social Learning',
    description: 'Catatan asesmen jangka pendek dan interaksi kelompok penugasan.',
    variables: [
      'Formative Quiz Score: Skor kuis pemahaman antar-modul',
      'Submission Latency: Ketepatan waktu pengumpulan lembar kerja',
      'Peer Forum Discussion: Keterlibatan pada forum tanya jawab modul'
    ],
    source: 'Moodle Gradebook & Assignment Submission Tables',
    literature: 'Garrison, Anderson & Archer (Community of Inquiry Framework)',
    datasetPreview: {
      tableName: 'formative_assessment_gradebook.csv',
      columns: ['asn_id', 'modul_ke', 'skor_kuis_formatif', 'latensi_submit_jam', 'interaksi_forum_peer', 'status_evaluasi'],
      rows: [
        {
          asn_id: 'ASN-0121',
          modul_ke: 'Modul 2 (Kepemimpinan)',
          skor_kuis_formatif: '88 / 100',
          latensi_submit_jam: 'Tepat Waktu (+1.2h)',
          interaksi_forum_peer: '2 tanggapan diskusi',
          status_evaluasi: 'Lulus Formatif'
        },
        {
          asn_id: 'ASN-0482',
          modul_ke: 'Modul 2 (Kepemimpinan)',
          skor_kuis_formatif: '80 / 100',
          latensi_submit_jam: 'Terlambat (+14h - Cuaca)',
          interaksi_forum_peer: '1 tanggapan diskusi',
          status_evaluasi: 'Lulus Formatif'
        },
        {
          asn_id: 'ASN-0733',
          modul_ke: 'Modul 2 (Kepemimpinan)',
          skor_kuis_formatif: '92 / 100',
          latensi_submit_jam: 'Tepat Waktu (+0.5h)',
          interaksi_forum_peer: '4 tanggapan diskusi',
          status_evaluasi: 'Lulus Formatif (Aktif)'
        },
        {
          asn_id: 'ASN-0914',
          modul_ke: 'Modul 2 (Kepemimpinan)',
          skor_kuis_formatif: '78 / 100',
          latensi_submit_jam: 'Terlambat (+28h - Sinyal)',
          interaksi_forum_peer: '0 tanggapan diskusi',
          status_evaluasi: 'Lulus Formatif'
        }
      ]
    }
  },
  patterns: {
    title: 'INTEGRATED BEHAVIOR PATTERNS (Pola Perilaku Terpadu)',
    category: 'Multimodal Fusion Layer',
    description: 'Penggabungan jejak Zoom dan LMS menjadi satu profil perilaku terintegrasi.',
    variables: [
      'Synchronous-Asynchronous Balance Index: Keseimbangan hadir di webinar vs belajar mandiri',
      'Engagement Consistency Score: Konsistensi belajar harian',
      'Multitasking Indicator: Terdeteksi mengikuti Zoom sambil mengakses sistem kantor'
    ],
    source: 'Pipeline Fusi Data Multimodal',
    literature: 'Blikstein & Worsley (Multimodal Learning Analytics - MMLA)',
    datasetPreview: {
      tableName: 'integrated_behavior_vectors.csv',
      columns: ['asn_id', 'sync_attendance_pct', 'sync_camera_off_pct', 'async_lms_hit_per_week', 'multitask_prob', 'fused_pattern_cluster'],
      rows: [
        {
          asn_id: 'ASN-0121',
          sync_attendance_pct: '100%',
          sync_camera_off_pct: '20.8%',
          async_lms_hit_per_week: '42 hit/mgg',
          multitask_prob: '0.78 (Tinggi)',
          fused_pattern_cluster: 'Cluster 1: Night-Learner Multitasker'
        },
        {
          asn_id: 'ASN-0482',
          sync_attendance_pct: '85%',
          sync_camera_off_pct: '87.5%',
          async_lms_hit_per_week: '18 hit/mgg (PDF offline)',
          multitask_prob: '0.35 (Rendah)',
          fused_pattern_cluster: 'Cluster 2: Offline-First Island Scholar'
        },
        {
          asn_id: 'ASN-0733',
          sync_attendance_pct: '95%',
          sync_camera_off_pct: '66.7%',
          async_lms_hit_per_week: '36 hit/mgg',
          multitask_prob: '0.62 (Sedang)',
          fused_pattern_cluster: 'Cluster 3: Daytime Service-Interrupted'
        },
        {
          asn_id: 'ASN-0914',
          sync_attendance_pct: '75%',
          sync_camera_off_pct: '91.7%',
          async_lms_hit_per_week: '12 hit/mgg',
          multitask_prob: '0.20 (Rendah)',
          fused_pattern_cluster: 'Cluster 4: Frontier Mobile Survivor'
        }
      ]
    }
  },
  ccbn: {
    title: 'CCBN (Context-Conditioned Bayesian Network)',
    category: 'Core Probabilistic Inference Model',
    description: 'Jantung model inferensi probabilistik disertasi. Menganalisis apakah deviasi perilaku (misal kamera mati 3 hari) disebabkan oleh hambatan spasial/dinas atau masalah kognitif.',
    variables: [
      'Hierarchical Baseline: Nilai dasar perilaku yang disesuaikan tipologi pemda',
      'Conditional Probability Table (CPT): Peluang bersyarat P(State | Zoom, LMS, Context)',
      'Deviation Significance: Besaran simpangan terhadap baseline kelompok tipologinya'
    ],
    source: 'Model Bayesian Network Disertasi',
    literature: 'Koller & Friedman (Probabilistic Graphical Models); Conati et al. (Student Modeling in Intelligent Tutoring)',
    datasetPreview: {
      tableName: 'ccbn_hierarchical_inference_matrix.csv',
      columns: ['asn_id', 'observed_camera_off', 'baseline_camera_off', 'deviation_score', 'prob_cognitive_atrisk', 'final_inferred_state'],
      rows: [
        {
          asn_id: 'ASN-0121 (Metro)',
          observed_camera_off: '20.8%',
          baseline_camera_off: 'Baseline Metro: 25%',
          deviation_score: '-4.2% (Wajar)',
          prob_cognitive_atrisk: 'P = 0.08',
          final_inferred_state: 'STABLE (No Action)'
        },
        {
          asn_id: 'ASN-0482 (Kepulauan)',
          observed_camera_off: '87.5%',
          baseline_camera_off: 'Baseline Kepulauan: 85%',
          deviation_score: '+2.5% (Wajar spasial)',
          prob_cognitive_atrisk: 'P = 0.12',
          final_inferred_state: 'ADAPTIVE (Format Ringan)'
        },
        {
          asn_id: 'ASN-0733 (Daratan)',
          observed_camera_off: '66.7%',
          baseline_camera_off: 'Baseline Daratan: 60%',
          deviation_score: '+6.7% (Wajar pelayanan)',
          prob_cognitive_atrisk: 'P = 0.15',
          final_inferred_state: 'ADAPTIVE (Supportive Cue)'
        },
        {
          asn_id: 'ASN-0999 (Anomali)',
          observed_camera_off: '98.0%',
          baseline_camera_off: 'Baseline Metro: 25%',
          deviation_score: '+73.0% (Deviasi Ekstrem)',
          prob_cognitive_atrisk: 'P = 0.89',
          final_inferred_state: 'AT-RISK (Target Intervensi)'
        }
      ]
    }
  },
  state_stable: {
    title: 'CONTEXTUAL STATE: STABLE (Stabil & Sesuai Jalur)',
    category: 'Inference State Output',
    description: 'Peserta menunjukkan keterlibatan yang konsisten dan sesuai dengan kapasitas tipologi daerahnya. Tidak memerlukan intervensi tambahan.',
    variables: ['Attendance normal', 'Kamera On/Off wajar', 'LMS tuntas tepat waktu'],
    source: 'Klasifikasi Inferensi CCBN',
    literature: 'Baker et al. (State Modeling in Adaptive Systems)',
    datasetPreview: {
      tableName: 'state_stable_records.csv',
      columns: ['asn_id', 'status_state', 'action_taken', 'target_nudge', 'outcome_status'],
      rows: [
        {
          asn_id: 'ASN-0121',
          status_state: 'STABLE',
          action_taken: 'NO ACTION',
          target_nudge: 'Tidak ada intervensi tambahan',
          outcome_status: 'Pembelajaran mandiri berjalan lancar'
        }
      ]
    }
  },
  state_adaptive: {
    title: 'CONTEXTUAL STATE: ADAPTIVE (Penyesuaian Format Ringan)',
    category: 'Inference State Output',
    description: 'Peserta mengalami kendala sementara (misal sedang dinas luar pulau atau cuaca buruk). Sistem memberikan dukungan format ringan (audio/PDF offline).',
    variables: ['Perpindahan lokasi terdeteksi', 'Kamera Off karena bandwidth', 'Tetap mengunduh modul PDF'],
    source: 'Klasifikasi Inferensi CCBN',
    literature: 'Kukulska-Hulme (Context-Aware Microlearning Adaptation)',
    datasetPreview: {
      tableName: 'state_adaptive_interventions.csv',
      columns: ['asn_id', 'status_state', 'action_taken', 'rekomendasi_format', 'respon_asn'],
      rows: [
        {
          asn_id: 'ASN-0482',
          status_state: 'ADAPTIVE',
          action_taken: 'Supportive Micro-Prompt',
          rekomendasi_format: 'Rekomendasi Paket Audio Podcast & PDF',
          respon_asn: 'Modul audio diunduh dalam 4 jam'
        },
        {
          asn_id: 'ASN-0733',
          status_state: 'ADAPTIVE',
          action_taken: 'Flexible Window Prompt',
          rekomendasi_format: 'Penjadwalan ulang asesmen di luar jam pelayanan',
          respon_asn: 'Kuis dikerjakan pukul 19.30 WIB'
        }
      ]
    }
  },
  state_atrisk: {
    title: 'CONTEXTUAL STATE: AT-RISK (Berisiko Drop-out / Terkendala Serius)',
    category: 'Inference State Output',
    description: 'Peserta menunjukkan deviasi keaktifan yang bukan karena kendala jaringan atau tugas kantor semata, melainkan kebingungan kognitif atau kehilangan motivasi.',
    variables: ['Tidak hadir tanpa izin', 'Kuis gagal berulang', 'Tidak ada interaksi Zoom & LMS'],
    source: 'Klasifikasi Inferensi CCBN',
    literature: 'Kuzilek et al. (Early Dropout Prediction in VLEs)',
    datasetPreview: {
      tableName: 'state_atrisk_intervention_triggers.csv',
      columns: ['asn_id', 'status_state', 'action_taken', 'intervention_policy', 'instructor_alert'],
      rows: [
        {
          asn_id: 'ASN-0999',
          status_state: 'AT-RISK',
          action_taken: 'High-Priority Alert',
          intervention_policy: 'Fasilitator Intervention + Diagnostic Form',
          instructor_alert: 'Notifikasi terkirim ke Fasilitator Puslatbang LAN'
        }
      ]
    }
  },
  public_service_outcome: {
    title: 'DAMPAK TERHADAP MUTU LAYANAN PUBLIK (Outcome Hilir)',
    category: 'Public Value & Kirkpatrick Level 4 Outcome',
    description: 'Muara akhir dari seluruh efektivitas pelatihan kedinasan ASN: perbaikan kualitas pelayanan birokrasi kepada masyarakat di daerah.',
    variables: [
      'Indeks Pelayanan Publik (IPP) 2025: Evaluasi resmi unit layanan instansi asal ASN',
      'Skor Implementasi Aksi Perubahan: Keberhasilan penerapan inovasi pasca-pelatihan',
      'Gain Score Pre-to-Post Test: Peningkatan kompetensi manajerial/teknis ASN',
      'Indeks Kepuasan Masyarakat (IKM): Survei kepuasan publik terhadap unit layanan'
    ],
    source: 'Portal Resmi KemenPAN-RB & Evaluasi Puslatbang LAN RI',
    literature: 'Kirkpatrick & Phillips Framework; Dwiyanto (Pelayanan Publik Indonesia); UU No. 20/2023 tentang ASN',
    datasetPreview: {
      tableName: 'public_service_eval_ipp_2025.csv',
      columns: ['asn_id', 'instansi_pemda', 'indeks_spbe_2025', 'ipp_predikat_2025', 'pre_test', 'post_test', 'gain_score', 'skor_inovasi', 'status_layanan_publik'],
      rows: [
        {
          asn_id: 'ASN-0121',
          instansi_pemda: 'Pemprov DKI Jakarta',
          indeks_spbe_2025: '4.21 (Sangat Baik)',
          ipp_predikat_2025: 'Pelayanan Prima (A)',
          pre_test: '68',
          post_test: '94',
          gain_score: '+26',
          skor_inovasi: '95.5',
          status_layanan_publik: 'Inovasi antrean digital kelurahan diterapkan'
        },
        {
          asn_id: 'ASN-0482',
          instansi_pemda: 'Pemkab Natuna',
          indeks_spbe_2025: '2.84 (Baik)',
          ipp_predikat_2025: 'Sangat Baik (A-)',
          pre_test: '55',
          post_test: '84',
          gain_score: '+29',
          skor_inovasi: '88.0',
          status_layanan_publik: 'SOP perizinan kapal nelayan terintegrasi'
        },
        {
          asn_id: 'ASN-0733',
          instansi_pemda: 'Pemkab Banyumas',
          indeks_spbe_2025: '3.62 (Baik)',
          ipp_predikat_2025: 'Pelayanan Prima (A)',
          pre_test: '62',
          post_test: '90',
          gain_score: '+28',
          skor_inovasi: '92.5',
          status_layanan_publik: 'Peningkatan mutu layanan puskesmas rawat inap'
        },
        {
          asn_id: 'ASN-0914',
          instansi_pemda: 'Pemkab Belu',
          indeks_spbe_2025: '2.45 (Cukup)',
          ipp_predikat_2025: 'Baik (B)',
          pre_test: '50',
          post_test: '78',
          gain_score: '+28',
          skor_inovasi: '84.0',
          status_layanan_publik: 'Digitalisasi registrasi pos perbatasan negara'
        }
      ]
    }
  }
}

const currentStepDetail = computed<StepDetail>(() => {
  return flowStepsDictionary[selectedFlowStep.value] || flowStepsDictionary.context
})

// Database-Driven Paper Data Profiles
interface PaperDataProfile {
  id: string
  title: string
  year?: number
  authors: string
  journal?: string
  abstract: string
  full_abstract: string
  landing_url?: string
  doi?: string
  primary_data_type: string
  data_types: string[]
  population: string
  sample_size: string
  is_open_dataset: boolean
  open_repo_name?: string
  key_variables: string[]
}

interface DistributionItem {
  name: string
  count: number
  percentage: number
}

interface BenchmarkDataset {
  id: string
  name: string
  provider: string
  data_type: string
  population: string
  volume: string
  format: string
  description: string
  variables: string[]
  url: string
  license: string
  relevance: string
  is_open?: boolean
  access_note?: string
}

const loading = ref(true)
const error = ref<string | null>(null)
const papers = ref<PaperDataProfile[]>([])
const benchmarkDatasets = ref<BenchmarkDataset[]>([])
const dataTypeDist = ref<DistributionItem[]>([])
const popDist = ref<DistributionItem[]>([])

// Filter State
const searchQuery = ref('')
const selectedDataType = ref<string>('all')
const selectedPopulation = ref<string>('all')

// Pagination State
const currentPage = ref(1)
const pageSize = ref(10)

// Drawer State
const selectedPaper = ref<PaperDataProfile | null>(null)
const isDrawerOpen = ref(false)

const fetchDatasetHubData = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await fetch('/api/literature-hunter/dataset-hub?limit=600')
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    const data = await res.json()
    if (data.success) {
      dataTypeDist.value = data.data_type_distribution || []
      popDist.value = data.population_distribution || []
      benchmarkDatasets.value = data.open_benchmark_datasets || []
      papers.value = data.papers || []
    } else {
      throw new Error(data.message || 'Gagal memuat dataset hub')
    }
  } catch (err: any) {
    console.error('Failed to load dataset hub:', err)
    error.value = err.message || 'Gagal terhubung ke database'
  } finally {
    loading.value = false
  }
}

const filteredPapers = computed(() => {
  return papers.value.filter(p => {
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      const matchTitle = p.title && p.title.toLowerCase().includes(q)
      const matchAuthors = p.authors && p.authors.toLowerCase().includes(q)
      const matchVars = p.key_variables && p.key_variables.some(v => v.toLowerCase().includes(q))
      if (!matchTitle && !matchAuthors && !matchVars) return false
    }
    if (selectedDataType.value !== 'all' && p.primary_data_type !== selectedDataType.value) {
      return false
    }
    if (selectedPopulation.value !== 'all' && p.population !== selectedPopulation.value) {
      return false
    }
    return true
  })
})

const totalFilteredCount = computed(() => filteredPapers.value.length)
const totalPages = computed(() => Math.ceil(totalFilteredCount.value / pageSize.value) || 1)

const paginatedPapers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredPapers.value.slice(start, start + pageSize.value)
})

const startItemIndex = computed(() => {
  if (totalFilteredCount.value === 0) return 0
  return (currentPage.value - 1) * pageSize.value + 1
})

const endItemIndex = computed(() => {
  return Math.min(currentPage.value * pageSize.value, totalFilteredCount.value)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const cur = currentPage.value
  const delta = 2
  const range: (number | string)[] = []
  for (let i = Math.max(2, cur - delta); i <= Math.min(total - 1, cur + delta); i++) {
    range.push(i)
  }
  if (cur - delta > 2) range.unshift('...')
  range.unshift(1)
  if (cur + delta < total - 1) range.push('...')
  if (total > 1) range.push(total)
  return range
})

const goToPage = (page: number | string) => {
  if (typeof page === 'number' && page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

watch([searchQuery, selectedDataType, selectedPopulation], () => {
  currentPage.value = 1
})

const openPaperDetail = (paper: PaperDataProfile) => {
  selectedPaper.value = paper
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
  setTimeout(() => {
    selectedPaper.value = null
  }, 200)
}

const getDataTypeBadgeClass = (type: string) => {
  if (!type) return 'bg-slate-50 text-slate-800 border-slate-200'
  if (type.includes('Log')) return 'bg-cyan-50 text-cyan-800 border-cyan-200'
  if (type.includes('Kuesioner')) return 'bg-sky-50 text-sky-800 border-sky-200'
  if (type.includes('Pre/Post') || type.includes('Ujian')) return 'bg-purple-50 text-purple-800 border-purple-200'
  if (type.includes('Kinerja') || type.includes('Layanan') || type.includes('SPBE')) return 'bg-emerald-50 text-emerald-800 border-emerald-200'
  if (type.includes('Spasial')) return 'bg-indigo-50 text-indigo-800 border-indigo-200'
  return 'bg-amber-50 text-amber-800 border-amber-200'
}

onMounted(() => {
  fetchDatasetHubData()
})
</script>

<style scoped>
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
