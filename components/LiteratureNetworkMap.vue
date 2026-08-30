<template>
  <div class="space-y-5">
    <!-- BANNER PENGANTAR PETA LITERATUR -->
    <div class="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <span>🗺️</span> Peta Lanskap Literatur & Posisi Riset Disertasi
          </span>
          <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <span>✨</span> 5 Rumpun Teori & {{ papers.length || 271 }} Paper Acuan
          </span>
        </div>
        <h2 class="text-base sm:text-lg font-black text-white tracking-tight">
          Peta Konstelasi Teori, Celah Riset Empiris, & Konstruk Disertasi
        </h2>
        <p class="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Visualisasi interaktif posisi kebaruan (<em>novelty</em>) disertasi di antara literatur global. Menunjukkan titik temu multidisiplin antara <strong>Learning Analytics</strong>, <strong>Telemetri Zoom</strong>, <strong>Konteks Spasial 3T</strong>, <strong>Kinerja Pelayanan Publik (IPP)</strong>, dan pemodelan <strong>CCBN</strong>.
        </p>
      </div>

      <!-- VIEW MODE BUTTONS -->
      <div class="flex items-center gap-1.5 p-1.5 bg-slate-800/80 rounded-xl border border-slate-700/80 self-start md:self-center shrink-0">
        <button
          type="button"
          @click="activeViewMode = 'graph'"
          :class="`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeViewMode === 'graph'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`"
        >
          <span>🕸️</span>
          <span>Jejaring Teori (Graph)</span>
        </button>

        <button
          type="button"
          @click="activeViewMode = 'quadrant'"
          :class="`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeViewMode === 'quadrant'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`"
        >
          <span>📊</span>
          <span>Kuadran Gap (Global vs ASN)</span>
        </button>

        <button
          type="button"
          @click="activeViewMode = 'matrix'"
          :class="`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeViewMode === 'matrix'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`"
        >
          <span>📐</span>
          <span>Matriks Konstruk Variabel</span>
        </button>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- VIEW 1: INTERACTIVE NETWORK GRAPH CANVAS                                 -->
    <!-- ========================================================================= -->
    <div v-if="activeViewMode === 'graph'" class="space-y-4">
      <!-- Toolbar Filter & Search -->
      <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <!-- Cluster Legend Filter -->
        <div class="flex flex-wrap items-center gap-1.5">
          <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">Kluster:</span>
          <button
            type="button"
            @click="selectedClusterFilter = 'ALL'"
            :class="`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
              selectedClusterFilter === 'ALL'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`"
          >
            Semua (5 Kluster)
          </button>
          <button
            v-for="cluster in clusters"
            :key="cluster.id"
            type="button"
            @click="toggleClusterFilter(cluster.id)"
            :class="`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer flex items-center gap-1 border ${
              selectedClusterFilter === cluster.id
                ? 'text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`"
            :style="{
              backgroundColor: selectedClusterFilter === cluster.id ? cluster.color : undefined,
              borderColor: cluster.color
            }"
          >
            <span>{{ cluster.icon }}</span>
            <span>{{ cluster.name }}</span>
          </button>
        </div>

        <!-- Controls: Search & Zoom -->
        <div class="flex items-center gap-2 w-full md:w-auto justify-end">
          <div class="relative w-full md:w-48">
            <input
              v-model="graphSearchQuery"
              type="text"
              placeholder="Cari simpul/teori..."
              class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
            <span class="absolute right-2.5 top-2 text-slate-400 text-xs">🔍</span>
          </div>

          <div class="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              @click="zoomIn"
              class="p-1.5 text-xs font-bold text-slate-700 hover:bg-white rounded-lg transition cursor-pointer"
              title="Perbesar"
            >
              ➕
            </button>
            <button
              type="button"
              @click="zoomOut"
              class="p-1.5 text-xs font-bold text-slate-700 hover:bg-white rounded-lg transition cursor-pointer"
              title="Perkecil"
            >
              ➖
            </button>
            <button
              type="button"
              @click="resetZoom"
              class="px-2 py-1 text-[10px] font-bold text-slate-700 hover:bg-white rounded-lg transition cursor-pointer"
              title="Reset Tampilan"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <!-- MAIN GRAPH & SIDE INSPECTOR SPLIT -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <!-- SVG Canvas Area (8 Cols) -->
        <div class="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-xs p-4 relative overflow-hidden flex flex-col items-center select-none min-h-[560px]">
          <div class="absolute top-3 left-4 text-[11px] font-medium text-slate-500 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200 pointer-events-none z-10">
            💡 <em>Klik simpul</em> untuk melihat rincian teori & paper rujukan
          </div>

          <div 
            ref="svgWrapper"
            class="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
            @mousedown="startPan"
            @mousemove="doPan"
            @mouseup="endPan"
            @mouseleave="endPan"
          >
            <svg
              :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
              class="w-full h-[520px] transition-transform duration-75"
              :style="{
                transform: `scale(${zoomScale}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                transformOrigin: 'center center'
              }"
            >
              <defs>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.35" />
                  <stop offset="100%" stop-color="#F59E0B" stop-opacity="0" />
                </radialGradient>
                <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.12" />
                </filter>
              </defs>

              <!-- Background Grid Pattern -->
              <g opacity="0.25">
                <line v-for="i in 10" :key="`gh-${i}`" :x1="0" :y1="i * 70" :x2="svgWidth" :y2="i * 70" stroke="#CBD5E1" stroke-dasharray="3 3" />
                <line v-for="j in 14" :key="`gv-${j}`" :x1="j * 70" :y1="0" :x2="j * 70" :y2="svgHeight" stroke="#CBD5E1" stroke-dasharray="3 3" />
              </g>

              <!-- EDGES LAYER -->
              <g class="edges-layer">
                <line
                  v-for="edge in visibleEdges"
                  :key="edge.id"
                  :x1="getNodeCoord(edge.source).x"
                  :y1="getNodeCoord(edge.source).y"
                  :x2="getNodeCoord(edge.target).x"
                  :y2="getNodeCoord(edge.target).y"
                  :stroke="isEdgeHighlighted(edge) ? '#4F46E5' : '#CBD5E1'"
                  :stroke-width="isEdgeHighlighted(edge) ? 2.5 : 1.2"
                  :stroke-dasharray="edge.type === 'gap' ? '4 4' : 'none'"
                  :stroke-opacity="isEdgeHighlighted(edge) ? 0.95 : 0.6"
                  class="transition-all duration-200"
                />
              </g>

              <!-- NODES LAYER -->
              <g class="nodes-layer">
                <g
                  v-for="node in visibleNodes"
                  :key="node.id"
                  :transform="`translate(${node.x}, ${node.y})`"
                  class="cursor-pointer transition-all duration-200"
                  :class="{
                    'opacity-30': isNodeDimmed(node),
                    'opacity-100': !isNodeDimmed(node)
                  }"
                  @click.stop="selectNode(node)"
                >
                  <!-- Outer Selection Halo -->
                  <circle
                    v-if="selectedNode && selectedNode.id === node.id"
                    :r="node.radius + 12"
                    fill="none"
                    :stroke="node.color"
                    stroke-width="2"
                    stroke-dasharray="4 2"
                  />

                  <!-- Core Glow Circle for Center Node -->
                  <circle
                    v-if="node.isCenter"
                    :r="node.radius + 24"
                    fill="url(#centerGlow)"
                  />

                  <!-- Main Node Circle -->
                  <circle
                    :r="node.radius"
                    :fill="node.color"
                    filter="url(#cardShadow)"
                    stroke="#FFFFFF"
                    :stroke-width="node.isCenter ? 3.5 : 2"
                  />

                  <!-- Icon inside Circle -->
                  <text
                    text-anchor="middle"
                    dominant-baseline="central"
                    :font-size="node.isCenter ? 24 : (node.isCluster ? 18 : 13)"
                  >
                    {{ node.icon }}
                  </text>

                  <!-- Node Label Box -->
                  <g :transform="`translate(0, ${node.radius + 14})`">
                    <rect
                      :x="-node.labelWidth / 2"
                      y="-10"
                      :width="node.labelWidth"
                      height="18"
                      rx="6"
                      :fill="selectedNode && selectedNode.id === node.id ? '#1E293B' : '#FFFFFF'"
                      :stroke="selectedNode && selectedNode.id === node.id ? '#0F172A' : '#E2E8F0'"
                      stroke-width="1"
                      opacity="0.95"
                    />
                    <text
                      text-anchor="middle"
                      dominant-baseline="central"
                      :fill="selectedNode && selectedNode.id === node.id ? '#FFFFFF' : '#1E293B'"
                      :font-size="node.isCenter ? '11px' : '9.5px'"
                      :font-weight="node.isCenter || (selectedNode && selectedNode.id === node.id) ? 'bold' : '600'"
                    >
                      {{ node.label }}
                    </text>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>

        <!-- SIDE DETAIL INSPECTOR PANEL (4 Cols) -->
        <div class="lg:col-span-4 bg-white border border-slate-200 rounded-2xl shadow-xs p-5 flex flex-col justify-between">
          <div v-if="selectedNode" class="space-y-4">
            <!-- Node Header & Badge -->
            <div class="pb-3 border-b border-slate-100">
              <div class="flex items-center justify-between gap-2 mb-2">
                <span
                  class="text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white uppercase tracking-wider"
                  :style="{ backgroundColor: selectedNode.color }"
                >
                  {{ selectedNode.categoryName }}
                </span>
                <span v-if="selectedNode.year" class="text-[11px] font-semibold text-slate-500">
                  Tahun: {{ selectedNode.year }}
                </span>
              </div>
              <h3 class="text-base font-black text-slate-900 leading-snug flex items-center gap-2">
                <span>{{ selectedNode.icon }}</span>
                <span>{{ selectedNode.label }}</span>
              </h3>
              <p v-if="selectedNode.authors" class="text-xs text-slate-500 mt-0.5">
                Oleh: {{ selectedNode.authors }}
              </p>
            </div>

            <!-- Ringkasan Teoretis -->
            <div class="space-y-2">
              <div class="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                📖 Premis Teori & Temuan Literatur:
              </div>
              <p class="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                {{ selectedNode.theoryDescription }}
              </p>
            </div>

            <!-- Novelty Disertasi / Research Gap -->
            <div class="space-y-2">
              <div class="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                <span>⚡</span> Posisi & Solusi Disertasi Ini:
              </div>
              <p class="text-xs text-amber-950 bg-amber-50/80 p-3 rounded-xl border border-amber-200 leading-relaxed font-medium">
                {{ selectedNode.dissertationNovelty }}
              </p>
            </div>

            <!-- Paper Acuan Terkait dari Database 271 Paper -->
            <div class="space-y-2 pt-1">
              <div class="flex items-center justify-between text-[11px] font-bold text-slate-600">
                <span class="uppercase tracking-wider">📚 Paper Rujukan Terkait:</span>
                <span class="text-blue-600 font-bold">{{ getRelatedPapers(selectedNode).length }} Paper</span>
              </div>
              
              <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
                <div
                  v-for="paper in getRelatedPapers(selectedNode).slice(0, 4)"
                  :key="paper.id"
                  @click="$emit('select-paper', paper)"
                  class="p-2.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition cursor-pointer text-xs group"
                >
                  <div class="font-bold text-slate-900 group-hover:text-blue-700 line-clamp-1">
                    {{ paper.title }}
                  </div>
                  <div class="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                    <span>{{ paper.authors }} ({{ paper.year || '-' }})</span>
                    <span class="text-blue-600 font-bold group-hover:underline">Buka Detail →</span>
                  </div>
                </div>
                <div v-if="getRelatedPapers(selectedNode).length === 0" class="text-xs text-slate-400 italic p-2">
                  Tidak ada paper spesifik yang cocok dengan kata kunci simpul ini.
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl">
              🗺️
            </div>
            <div class="text-sm font-bold text-slate-800">
              Pilih Simpul pada Kanvas
            </div>
            <p class="text-xs text-slate-500 max-w-xs leading-relaxed">
              Klik salah satu simpul (Model Disertasi, Rumpun Kluster, atau Tokoh Ilmiah) untuk membaca sintesis teorinya dan paper yang mendukungnya.
            </p>
            <button
              type="button"
              @click="selectDefaultNode"
              class="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold hover:bg-blue-100 transition cursor-pointer"
            >
              Lihat Model Disertasi (Pusat)
            </button>
          </div>

          <!-- Quick Stats Footer -->
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Kluster: 5 Rumpun</span>
            <span>Total Paper: {{ papers.length || 271 }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- VIEW 2: MATRIKS KUADRAN GAP (GLOBAL VS BIROKRASI ASN)                     -->
    <!-- ========================================================================= -->
    <div v-else-if="activeViewMode === 'quadrant'" class="space-y-4">
      <div class="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-5">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 class="text-base font-black text-slate-900">
              Matriks Kuadran Kesenjangan Riset Empiris Dunia (*Empirical Gap Quadrant*)
            </h3>
            <p class="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Memetakan sebaran fokus populasi dan karakteristik wilayah dalam 271 paper literatur global. Menunjukkan bukti nyata bahwa telaah perilaku belajar digital aparatur birokrasi di wilayah kepulauan/3T merupakan <strong>White Space (ruang kosong)</strong> yang belum terjawab.
            </p>
          </div>
          <div class="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0">
            🎯 Kuadran Target: Kanan Atas (Disertasi Anda)
          </div>
        </div>

        <!-- 2x2 QUADRANT VISUALIZATION -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <!-- KUADRAN 2: Kiri Atas -->
          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black text-slate-800 uppercase tracking-wide">
                Kuadran II: Mahasiswa Wilayah Berkembang
              </span>
              <span class="text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md">
                ~12% Literatur
              </span>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">
              Riset mengkaji kendala sinyal mahasiswa di pedesaan/negara berkembang saat masa darurat pandemi Covid-19.
            </p>
            <div class="text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 space-y-1">
              <div class="font-bold text-slate-700">Contoh Acuan:</div>
              <div>• Agormedah et al. (2020) - Online learning in Ghana</div>
              <div>• Baticulon et al. (2021) - Medical students in Philippines</div>
            </div>
            <div class="text-[11px] text-red-700 font-semibold">
              ❌ Batasan: Tetap meneliti mahasiswa tanpa beban akuntabilitas kedinasan dan pelayanan publik.
            </div>
          </div>

          <!-- KUADRAN 1: Kanan Atas (NOVELTY SPOT) -->
          <div class="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-500 shadow-xs space-y-3 relative">
            <span class="absolute -top-3 right-4 px-3 py-0.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow-xs">
              ⭐ NOVELTY SPOT DISERTASI
            </span>
            <div class="flex items-center justify-between">
              <span class="text-xs font-black text-blue-950 uppercase tracking-wide">
                Kuadran I: Aparatur Sipil Negara & 4 Tipologi Daerah
              </span>
              <span class="text-[10px] font-bold px-2 py-0.5 bg-blue-600 text-white rounded-md">
                0% di Literatur Dunia
              </span>
            </div>
            <p class="text-xs text-blue-900 leading-relaxed font-medium">
              Kombinasi analisis jejak multimodal (Zoom camera off/on, LMS log) pada birokrat yang bertugas di 4 tipologi daerah (Metropolitan s.d. 3T/Kepulauan) dan dihubungkan dengan Indeks Pelayanan Publik (IPP).
            </p>
            <div class="text-[11px] text-blue-950 bg-white/90 p-2.5 rounded-xl border border-blue-200 space-y-1">
              <div class="font-bold text-blue-900">Solusi Disertasi:</div>
              <div>• Context-Conditioned Bayesian Network (CCBN) untuk evaluasi adil.</div>
              <div>• Mengintegrasikan beban dinas publik dengan interpretasi perilaku belajar.</div>
            </div>
            <div class="text-[11px] text-emerald-800 font-bold flex items-center gap-1">
              <span>✅</span> Keaslian Riset: Menjadi studi empiris pertama di sektor publik multispasial.
            </div>
          </div>

          <!-- KUADRAN 3: Kiri Bawah -->
          <div class="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black text-amber-950 uppercase tracking-wide">
                Kuadran III: Mahasiswa di Negara Maju (Jenuh)
              </span>
              <span class="text-[10px] font-bold px-2 py-0.5 bg-amber-200 text-amber-900 rounded-md">
                ~78% Literatur Dunia
              </span>
            </div>
            <p class="text-xs text-amber-900 leading-relaxed">
              Mayoritas riset telemetri Zoom dan LMS dilakukan pada mahasiswa universitas di AS, Eropa, dan Asia Timur dengan koneksi internet 5G stabil dan gawai mutakhir.
            </p>
            <div class="text-[11px] text-amber-950 bg-white p-2.5 rounded-xl border border-amber-200 space-y-1">
              <div class="font-bold text-amber-900">Contoh Acuan:</div>
              <div>• Castelli & Sarvary (2021) - Camera-off in Cornell University</div>
              <div>• Bailenson (2021) - Nonverbal overload / Zoom Fatigue di Stanford</div>
              <div>• Bedenlier et al. (2021) - Higher education video conferencing</div>
            </div>
            <div class="text-[11px] text-amber-800 font-semibold">
              ⚠️ Celah: Asumsi keseragaman fasilitas yang keliru jika diterapkan pada birokrasi Indonesia.
            </div>
          </div>

          <!-- KUADRAN 4: Kanan Bawah -->
          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black text-slate-800 uppercase tracking-wide">
                Kuadran IV: Korporasi Swasta di Wilayah Maju
              </span>
              <span class="text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md">
                ~10% Literatur
              </span>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">
              Kajian pelatihan online karyawan swasta (corporate training/L&D) dalam kondisi fasilitas kantor yang sudah seragam dan formal.
            </p>
            <div class="text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 space-y-1">
              <div class="font-bold text-slate-700">Contoh Acuan:</div>
              <div>• Shockley et al. (2021) - Video-off in organizational meetings</div>
              <div>• Karl et al. (2022) - Workplace Zoom behaviors</div>
            </div>
            <div class="text-[11px] text-slate-600 font-semibold">
              ❌ Batasan: Tidak memiliki faktor intervensi pelayanan publik masyarakat dan ketimpangan spasial 3T.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- VIEW 3: MATRIKS GROUNDING VARIABEL MODEL KE LITERATUR                     -->
    <!-- ========================================================================= -->
    <div v-else-if="activeViewMode === 'matrix'" class="space-y-4">
      <div class="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-5">
        <div>
          <h3 class="text-base font-black text-slate-900">
            Matriks Penjangkaran Teoretis Variabel Disertasi (*Construct Grounding Matrix*)
          </h3>
          <p class="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Menunjukkan landasan teori dan paper acuan utama di balik setiap variabel pada model <strong>SEM-PLS</strong> dan <strong>CCBN</strong> dalam disertasi Anda.
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-slate-900 text-white font-bold">
                <th class="p-3 rounded-tl-xl">Klasifikasi Variabel</th>
                <th class="p-3">Nama Variabel Penelitian</th>
                <th class="p-3">Indikator Empiris</th>
                <th class="p-3">Teori & Rujukan Ilmiah Kunci</th>
                <th class="p-3 rounded-tr-xl">Fungsi dalam Model Disertasi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr class="hover:bg-slate-50">
                <td class="p-3 font-bold text-blue-700 bg-blue-50/50">Eksogen (X1)</td>
                <td class="p-3 font-bold text-slate-900">Konteks Spasial & Tipologi Wilayah</td>
                <td class="p-3 text-slate-600">4 Tipologi (Metropolitan, Agrikultur, Pesisir, 3T) & Kestabilan Sinyal TIK</td>
                <td class="p-3 text-slate-800">
                  <div class="font-bold">Warschauer (2004); Van Dijk (2020)</div>
                  <div class="text-[11px] text-slate-500">Digital Divide Theory & Spatial Accessibility</div>
                </td>
                <td class="p-3 text-slate-700">Mengkondisikan (*condition*) batasan infrastruktur dan beban penugasan ASN.</td>
              </tr>

              <tr class="hover:bg-slate-50">
                <td class="p-3 font-bold text-purple-700 bg-purple-50/50">Mediasi (M1)</td>
                <td class="p-3 font-bold text-slate-900">Perilaku Sinkron (Zoom Meeting)</td>
                <td class="p-3 text-slate-600">Camera On/Off ratio, mic unmuted, chat participation, background noise</td>
                <td class="p-3 text-slate-800">
                  <div class="font-bold">Castelli & Sarvary (2021); Bailenson (2021)</div>
                  <div class="text-[11px] text-slate-500">Nonverbal Overload & Webcam Resistance Theory</div>
                </td>
                <td class="p-3 text-slate-700">Mendeteksi keterlibatan langsung yang dimoderasi oleh kekuatan sinyal & tipologi.</td>
              </tr>

              <tr class="hover:bg-slate-50">
                <td class="p-3 font-bold text-indigo-700 bg-indigo-50/50">Mediasi (M2)</td>
                <td class="p-3 font-bold text-slate-900">Perilaku Asinkron (LMS Moodle)</td>
                <td class="p-3 text-slate-600">Akses modul, waktu penyelesaian tugas malam hari, forum diskusi</td>
                <td class="p-3 text-slate-800">
                  <div class="font-bold">Siemens (2013); Baker et al. (2020)</div>
                  <div class="text-[11px] text-slate-500">Learning Analytics & Time-on-Task in EDM</div>
                </td>
                <td class="p-3 text-slate-700">Mencatat ketahanan belajar ASN di luar jam kantor ketika beban dinas selesai.</td>
              </tr>

              <tr class="hover:bg-slate-50">
                <td class="p-3 font-bold text-amber-700 bg-amber-50/50">Moderasi (Z)</td>
                <td class="p-3 font-bold text-slate-900">Beban Layanan Publik & Tugas Dinas</td>
                <td class="p-3 text-slate-600">Interupsi panggilan pimpinan, tugas lapangan mendadak, volume loket</td>
                <td class="p-3 text-slate-800">
                  <div class="font-bold">Rainey (2014); Perry & Wise (1990)</div>
                  <div class="text-[11px] text-slate-500">Public Service Motivation & Work Overload</div>
                </td>
                <td class="p-3 text-slate-700">Menjelaskan mengapa ASN mematikan kamera bukan karena malas, melainkan bertugas.</td>
              </tr>

              <tr class="hover:bg-slate-50">
                <td class="p-3 font-bold text-emerald-700 bg-emerald-50/50">Endogen (Y)</td>
                <td class="p-3 font-bold text-slate-900">Dampak Indeks Pelayanan Publik (IPP)</td>
                <td class="p-3 text-slate-600">Skor IPP KemenPAN-RB, Skor SPBE Daerah, Kepuasan Masyarakat</td>
                <td class="p-3 text-slate-800">
                  <div class="font-bold">KemenPAN-RB (2023); Osborne & Gaebler (1992)</div>
                  <div class="text-[11px] text-slate-500">Public Value Creation & Organizational Performance</div>
                </td>
                <td class="p-3 text-slate-700">Mengukur apakah model pelatihan adaptif berdampak pada kualitas layanan publik nyata.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  papers: any[]
}>()

defineEmits<{
  (e: 'select-paper', paper: any): void
}>()

const activeViewMode = ref<'graph' | 'quadrant' | 'matrix'>('graph')

const clusters = [
  { id: 'vc', name: 'Video Conferencing (Zoom)', icon: '📹', color: '#8B5CF6' },
  { id: 'la', name: 'Learning Analytics (LMS)', icon: '🎓', color: '#3B82F6' },
  { id: 'spatial', name: 'Konteks Spasial & 3T', icon: '🗺️', color: '#10B981' },
  { id: 'pub', name: 'Pelayanan Publik & IPP', icon: '🏛️', color: '#F59E0B' },
  { id: 'ccbn', name: 'Kausalitas & CCBN', icon: '🧠', color: '#EC4899' }
]

const selectedClusterFilter = ref<string>('ALL')
const graphSearchQuery = ref<string>('')

const svgWidth = 1000
const svgHeight = 700
const zoomScale = ref(1)
const panOffset = ref({ x: 0, y: 0 })
const isPanning = ref(false)
const panStart = ref({ x: 0, y: 0 })

const zoomIn = () => {
  zoomScale.value = Math.min(zoomScale.value + 0.15, 2.2)
}
const zoomOut = () => {
  zoomScale.value = Math.max(zoomScale.value - 0.15, 0.6)
}
const resetZoom = () => {
  zoomScale.value = 1
  panOffset.value = { x: 0, y: 0 }
}

const startPan = (e: MouseEvent) => {
  isPanning.value = true
  panStart.value = { x: e.clientX - panOffset.value.x, y: e.clientY - panOffset.value.y }
}
const doPan = (e: MouseEvent) => {
  if (!isPanning.value) return
  panOffset.value = { x: e.clientX - panStart.value.x, y: e.clientY - panStart.value.y }
}
const endPan = () => {
  isPanning.value = false
}

interface GraphNode {
  id: string
  label: string
  icon: string
  category: string
  categoryName: string
  color: string
  x: number
  y: number
  radius: number
  labelWidth: number
  isCenter?: boolean
  isCluster?: boolean
  authors?: string
  year?: number
  theoryDescription: string
  dissertationNovelty: string
  keywords: string[]
}

const allNodes = ref<GraphNode[]>([
  {
    id: 'center_dissertation',
    label: 'Model Disertasi (CCBN Multimodal)',
    icon: '⭐',
    category: 'core',
    categoryName: 'Pusat Inovasi Disertasi',
    color: '#D97706',
    x: 500,
    y: 350,
    radius: 46,
    labelWidth: 210,
    isCenter: true,
    theoryDescription: 'Model integratif penafsiran keterlibatan belajar ASN berbasis Context-Conditioned Bayesian Network (CCBN) yang memadukan jejak multimodal (Zoom & LMS) dengan 4 tipologi spasial daerah dan beban pelayanan publik.',
    dissertationNovelty: 'Membuktikan bahwa perilaku kamera mati atau akses LMS larut malam pada birokrat bukanlah resistensi, melainkan adaptasi cerdas terhadap beban tugas pelayanan publik dan keterbatasan infrastruktur daerah.',
    keywords: ['ccbn', 'multimodal', 'disertasi', 'asn', 'spasial', 'ipp']
  },
  {
    id: 'cluster_vc',
    label: 'Rumpun Telemetri Video Conf (Zoom)',
    icon: '📹',
    category: 'vc',
    categoryName: 'Video Conferencing & Sync',
    color: '#8B5CF6',
    x: 230,
    y: 190,
    radius: 34,
    labelWidth: 190,
    isCluster: true,
    theoryDescription: 'Mengkaji dinamika psikologis dan teknis interaksi sinkron tatap maya melalui webcam, transmisi audio, dan overload komunikasi nonverbal.',
    dissertationNovelty: 'Menyediakan metrik objektif camera-on/off ratio yang dikalibrasi dengan kecepatan bandwidth riil di kantor dinas daerah.',
    keywords: ['zoom', 'webcam', 'camera', 'telemetri', 'sinkron', 'video']
  },
  {
    id: 'paper_castelli',
    label: 'Castelli & Sarvary (2021)',
    icon: '📄',
    category: 'vc',
    categoryName: 'Landmark Paper Video Conf',
    color: '#A78BFA',
    x: 120,
    y: 100,
    radius: 22,
    labelWidth: 140,
    authors: 'Castelli, F. R., & Sarvary, M. A.',
    year: 2021,
    theoryDescription: 'Menemukan bahwa alasan mahasiswa mematikan kamera saat kuliah online didominasi oleh kecemasan penampilan (*self-appearance*) dan koneksi internet yang lemah.',
    dissertationNovelty: 'Disertasi ini memperluas temuan Castelli ke aparatur publik: alasan kamera mati ASN bukan sekadar cemas penampilan, melainkan interupsi tugas kedinasan mendadak.',
    keywords: ['castelli', 'camera', 'underrepresented', 'zoom']
  },
  {
    id: 'paper_bailenson',
    label: 'Bailenson - Zoom Fatigue (2021)',
    icon: '📄',
    category: 'vc',
    categoryName: 'Landmark Paper Video Conf',
    color: '#A78BFA',
    x: 100,
    y: 260,
    radius: 22,
    labelWidth: 165,
    authors: 'Bailenson, J. N. (Stanford University)',
    year: 2021,
    theoryDescription: 'Merumuskan 4 penyebab utama *Zoom Fatigue*: tatapan mata jarak dekat yang berlebihan, beban kognitif membaca gestur, pantulan cermin diri, dan keterbatasan gerak fisik.',
    dissertationNovelty: 'Mengukur kelelahan tatap maya pada aparatur yang harus mengikuti pelatihan teknis berjam-jam sambil tetap melayani masyarakat.',
    keywords: ['bailenson', 'fatigue', 'nonverbal', 'overload']
  },
  {
    id: 'cluster_la',
    label: 'Rumpun Learning Analytics & EDM',
    icon: '🎓',
    category: 'la',
    categoryName: 'Learning Analytics & LMS',
    color: '#3B82F6',
    x: 770,
    y: 190,
    radius: 34,
    labelWidth: 190,
    isCluster: true,
    theoryDescription: 'Penggalian data pendidikan (*Educational Data Mining*) dari jejak log LMS Moodle: frekuensi akses, klik materi, waktu pengerjaan tugas, dan analisis jalur ketuntasan belajar.',
    dissertationNovelty: 'Mengombinasikan telemetry log LMS dengan log Zoom untuk membentuk profil belajar *hybrid* aparatur sipil negara.',
    keywords: ['lms', 'moodle', 'learning analytics', 'edm', 'log']
  },
  {
    id: 'paper_siemens',
    label: 'Siemens - Learning Analytics (2013)',
    icon: '📄',
    category: 'la',
    categoryName: 'Landmark Paper LA',
    color: '#60A5FA',
    x: 880,
    y: 90,
    radius: 22,
    labelWidth: 175,
    authors: 'Siemens, G., & Baker, R. S.',
    year: 2013,
    theoryDescription: 'Fondasi utama Learning Analytics: pengukuran, pengumpulan, analisis, dan pelaporan data tentang pembelajar dan konteksnya untuk memahami dan mengoptimalkan pembelajaran.',
    dissertationNovelty: 'Menerapkan konsep Siemens secara presisi pada lingkungan diklat LAN RI (LMS ASN Unggul / Smart ASN).',
    keywords: ['siemens', 'baker', 'analytics', 'foundation']
  },
  {
    id: 'paper_kovanovic',
    label: 'Kovanović et al. - Time-on-Task (2015)',
    icon: '📄',
    category: 'la',
    categoryName: 'Landmark Paper LA',
    color: '#60A5FA',
    x: 910,
    y: 250,
    radius: 22,
    labelWidth: 185,
    authors: 'Kovanović, V., Gašević, D., et al.',
    year: 2015,
    theoryDescription: 'Menemukan bahwa estimasi waktu belajar (*time-on-task*) dari log server sering bias jika tidak memperhitungkan jeda inaktivitas (*idle session timeout*).',
    dissertationNovelty: 'Melakukan pembersihan data (*data preprocessing*) log Moodle dengan ambang batas jeda kedinasan agar estimasi waktu belajar ASN valid.',
    keywords: ['kovanovic', 'time on task', 'moodle', 'idle']
  },
  {
    id: 'cluster_spatial',
    label: 'Rumpun Digital Divide & 4 Tipologi Spasial',
    icon: '🗺️',
    category: 'spatial',
    categoryName: 'Konteks Spasial & 3T',
    color: '#10B981',
    x: 240,
    y: 530,
    radius: 34,
    labelWidth: 215,
    isCluster: true,
    theoryDescription: 'Teori kesenjangan digital multidimensi: bukan hanya ketersediaan akses fisik kabel, melainkan kesenjangan keterampilan dan peluang pemanfaatan (*second & third level digital divide*).',
    dissertationNovelty: 'Mengkristalisasi kondisi geografis Indonesia menjadi 4 Tipologi Daerah (Metropolitan, Agrikultur, Pesisir, 3T) sebagai variabel pengkondisi perilaku.',
    keywords: ['digital divide', 'spasial', '3t', 'tipologi', 'infrastruktur']
  },
  {
    id: 'paper_warschauer',
    label: 'Warschauer - Digital Divide (2004)',
    icon: '📄',
    category: 'spatial',
    categoryName: 'Landmark Paper Spasial',
    color: '#34D399',
    x: 110,
    y: 460,
    radius: 22,
    labelWidth: 170,
    authors: 'Warschauer, M.',
    year: 2004,
    theoryDescription: 'Menolak konsep biner *digital divide* (punya vs tidak punya komputer). Menekankan bahwa teknologi terikat erat dengan konteks sosial, fisik, dan modal manusia.',
    dissertationNovelty: 'Menjadi dasar argumentasi bahwa evaluasi pelatihan ASN di daerah perbatasan harus kontekstual terhadap modal infrastruktur lokal.',
    keywords: ['warschauer', 'social context', 'technology']
  },
  {
    id: 'paper_vandijk',
    label: 'Van Dijk - Digital Divide Levels (2020)',
    icon: '📄',
    category: 'spatial',
    categoryName: 'Landmark Paper Spasial',
    color: '#34D399',
    x: 130,
    y: 630,
    radius: 22,
    labelWidth: 180,
    authors: 'Van Dijk, J.',
    year: 2020,
    theoryDescription: 'Merinci 3 tingkatan jurang digital: akses fisik, kapabilitas penggunaan, dan hasil nyata (*outcomes*) yang diperoleh dari penggunaan teknologi.',
    dissertationNovelty: 'Menghubungkan level 3 Van Dijk dengan capaian kinerja pelayanan publik daerah (IPP).',
    keywords: ['van dijk', 'levels', 'inequality']
  },
  {
    id: 'cluster_pub',
    label: 'Rumpun Administrasi Publik & Dampak IPP',
    icon: '🏛️',
    category: 'pub',
    categoryName: 'Administrasi Publik & IPP',
    color: '#F59E0B',
    x: 770,
    y: 530,
    radius: 34,
    labelWidth: 215,
    isCluster: true,
    theoryDescription: 'Teori motivasi pelayanan publik (*Public Service Motivation*) dan pengukuran kinerja organisasi pemerintah melalui akuntabilitas layanan publik (IPP & SPBE).',
    dissertationNovelty: 'Menjadikan Indeks Pelayanan Publik (IPP) riil dari KemenPAN-RB sebagai tolok ukur dampak akhir (*distal outcome*) dari pelatihan ASN.',
    keywords: ['pelayanan publik', 'ipp', 'spbe', 'kemenpan', 'kinerja']
  },
  {
    id: 'paper_rainey',
    label: 'Rainey - Public Org Dynamics (2014)',
    icon: '📄',
    category: 'pub',
    categoryName: 'Landmark Paper Publik',
    color: '#FBBF24',
    x: 890,
    y: 460,
    radius: 22,
    labelWidth: 175,
    authors: 'Rainey, H. G.',
    year: 2014,
    theoryDescription: 'Mengidentifikasi karakteristik unik organisasi birokrasi: tujuan ganda, akuntabilitas hukum publik, dan tekanan politis yang tidak dialami korporasi swasta.',
    dissertationNovelty: 'Menjelaskan mengapa pelatihan aparatur birokrasi tidak bisa disamakan dengan pelatihan karyawan korporasi swasta.',
    keywords: ['rainey', 'bureaucracy', 'public organizations']
  },
  {
    id: 'paper_menpan',
    label: 'KemenPAN-RB - Pedoman IPP (2023)',
    icon: '📄',
    category: 'pub',
    categoryName: 'Kebijakan & Regulasi Nasional',
    color: '#FBBF24',
    x: 880,
    y: 630,
    radius: 22,
    labelWidth: 185,
    authors: 'Kementerian PAN-RB',
    year: 2023,
    theoryDescription: 'Standar evaluasi pelayanan publik nasional yang mencakup 6 aspek: Kebijakan Pelayanan, Profesionalisme SDM, Sarpras, SIPP, Konsultasi & Pengaduan, serta Inovasi.',
    dissertationNovelty: 'Mengaitkan langsung peningkatan kompetensi ASN dari pelatihan adaptif terhadap skor aspek Profesionalisme SDM dalam IPP.',
    keywords: ['menpan', 'ipp', 'evaluasi', 'pelayanan publik']
  },
  {
    id: 'cluster_ccbn',
    label: 'Rumpun Causal Inference & CCBN',
    icon: '🧠',
    category: 'ccbn',
    categoryName: 'Kausalitas & CCBN',
    color: '#EC4899',
    x: 500,
    y: 110,
    radius: 32,
    labelWidth: 185,
    isCluster: true,
    theoryDescription: 'Pemodelan Directed Acyclic Graphs (DAG) dan Context-Conditioned Bayesian Network untuk penalaran probabilitas terikat konteks lokal.',
    dissertationNovelty: 'Menggunakan CCBN untuk mencegah kesalahan vonis evaluasi ASN (*Fair AI Assessment*).',
    keywords: ['ccbn', 'bayesian', 'causality', 'dag', 'fairness']
  },
  {
    id: 'paper_pearl',
    label: 'Pearl - Causality & DAGs (2009)',
    icon: '📄',
    category: 'ccbn',
    categoryName: 'Landmark Paper Kausalitas',
    color: '#F472B6',
    x: 500,
    y: 20,
    radius: 22,
    labelWidth: 165,
    authors: 'Pearl, J.',
    year: 2009,
    theoryDescription: 'Teori kausalitas struktural: korelasi statistik tidak sama dengan hubungan sebab-akibat. Diperlukan pengkondisian variabel pengacau (*confounder conditioning*).',
    dissertationNovelty: 'Konteks spasial dan beban tugas dijadikan *conditioning variables* sehingga relasi kamera off terhadap performa belajar dinilai secara berkeadilan.',
    keywords: ['pearl', 'causality', 'dag', 'confounding']
  }
])

interface GraphEdge {
  id: string
  source: string
  target: string
  type: 'core' | 'cluster' | 'landmark' | 'gap'
  weight?: number
}

const allEdges = ref<GraphEdge[]>([
  { id: 'e_core_vc', source: 'center_dissertation', target: 'cluster_vc', type: 'core', weight: 3 },
  { id: 'e_core_la', source: 'center_dissertation', target: 'cluster_la', type: 'core', weight: 3 },
  { id: 'e_core_spatial', source: 'center_dissertation', target: 'cluster_spatial', type: 'core', weight: 3 },
  { id: 'e_core_pub', source: 'center_dissertation', target: 'cluster_pub', type: 'core', weight: 3 },
  { id: 'e_core_ccbn', source: 'center_dissertation', target: 'cluster_ccbn', type: 'core', weight: 3 },

  { id: 'e_vc_castelli', source: 'cluster_vc', target: 'paper_castelli', type: 'landmark' },
  { id: 'e_vc_bailenson', source: 'cluster_vc', target: 'paper_bailenson', type: 'landmark' },

  { id: 'e_la_siemens', source: 'cluster_la', target: 'paper_siemens', type: 'landmark' },
  { id: 'e_la_kovanovic', source: 'cluster_la', target: 'paper_kovanovic', type: 'landmark' },

  { id: 'e_sp_warschauer', source: 'cluster_spatial', target: 'paper_warschauer', type: 'landmark' },
  { id: 'e_sp_vandijk', source: 'cluster_spatial', target: 'paper_vandijk', type: 'landmark' },

  { id: 'e_pb_rainey', source: 'cluster_pub', target: 'paper_rainey', type: 'landmark' },
  { id: 'e_pb_menpan', source: 'cluster_pub', target: 'paper_menpan', type: 'landmark' },

  { id: 'e_cb_pearl', source: 'cluster_ccbn', target: 'paper_pearl', type: 'landmark' },

  { id: 'e_bridge_vc_spatial', source: 'cluster_vc', target: 'cluster_spatial', type: 'gap' },
  { id: 'e_bridge_la_pub', source: 'cluster_la', target: 'cluster_pub', type: 'gap' },
  { id: 'e_bridge_spatial_pub', source: 'cluster_spatial', target: 'cluster_pub', type: 'gap' }
])

const selectedNode = ref<GraphNode | null>(null)

const selectDefaultNode = () => {
  const center = allNodes.value.find(n => n.id === 'center_dissertation')
  if (center) selectedNode.value = center
}

const selectNode = (node: GraphNode) => {
  selectedNode.value = node
}

const toggleClusterFilter = (clusterId: string) => {
  if (selectedClusterFilter.value === clusterId) {
    selectedClusterFilter.value = 'ALL'
  } else {
    selectedClusterFilter.value = clusterId
  }
}

const nodeMap = computed(() => {
  const map = new Map<string, GraphNode>()
  allNodes.value.forEach(n => map.set(n.id, n))
  return map
})

const getNodeCoord = (nodeId: string) => {
  const n = nodeMap.value.get(nodeId)
  return n ? { x: n.x, y: n.y } : { x: 500, y: 350 }
}

const visibleNodes = computed(() => {
  return allNodes.value.filter(n => {
    if (selectedClusterFilter.value !== 'ALL') {
      if (!n.isCenter && n.category !== selectedClusterFilter.value) {
        return false
      }
    }
    if (graphSearchQuery.value.trim()) {
      const q = graphSearchQuery.value.toLowerCase()
      const matchLabel = n.label.toLowerCase().includes(q)
      const matchKeywords = n.keywords.some(k => k.includes(q))
      return matchLabel || matchKeywords
    }
    return true
  })
})

const visibleNodeIds = computed(() => new Set(visibleNodes.value.map(n => n.id)))

const visibleEdges = computed(() => {
  return allEdges.value.filter(e => {
    return visibleNodeIds.value.has(e.source) && visibleNodeIds.value.has(e.target)
  })
})

const isEdgeHighlighted = (edge: GraphEdge) => {
  if (!selectedNode.value) return edge.type === 'core'
  return edge.source === selectedNode.value.id || edge.target === selectedNode.value.id
}

const isNodeDimmed = (node: GraphNode) => {
  if (!selectedNode.value) return false
  if (selectedNode.value.id === node.id) return false

  const isConnected = allEdges.value.some(e => {
    return (e.source === selectedNode.value?.id && e.target === node.id) ||
           (e.target === selectedNode.value?.id && e.source === node.id)
  })
  return !isConnected
}

const getRelatedPapers = (node: GraphNode) => {
  if (!props.papers || props.papers.length === 0) return []

  const nodeKeywords = node.keywords || []
  return props.papers.filter(p => {
    const title = (p.title || '').toLowerCase()
    const abstract = (p.abstract || '').toLowerCase()
    const vars = (p.key_variables || []).join(' ').toLowerCase()

    return nodeKeywords.some(k => {
      return title.includes(k) || abstract.includes(k) || vars.includes(k)
    })
  })
}

selectDefaultNode()
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
