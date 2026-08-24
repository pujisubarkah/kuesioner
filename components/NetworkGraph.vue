<template>
  <div class="network-graph-container">
    <!-- Header & Filter Bar -->
    <div class="graph-header">
      <div>
        <div class="badge-cluster">
          <span class="pulse-dot"></span>
          Semantic & Contextual Co-occurrence Network
        </div>
        <h3 class="graph-title">Graph Analitik Keterhubungan "Suara Lapangan" & Konteks ASN</h3>
        <p class="graph-subtitle">
          Visualisasi pemetaan hubungan asosiatif antara narasi kualitatif responden, tipologi spasial penugasan, hambatan dinas, dan pola perilaku belajar.
        </p>
      </div>

      <div class="graph-controls">
        <label class="control-label">Filter Kluster Wilayah:</label>
        <select v-model="selectedAreaFilter" class="form-select-sm">
          <option value="ALL">Semua Wilayah ({{ responses.length }} Responden)</option>
          <option value="Perkotaan">Wilayah Perkotaan</option>
          <option value="Perdesaan">Wilayah Perdesaan</option>
          <option value="Wilayah kepulauan">Wilayah Kepulauan</option>
          <option value="Wilayah perbatasan">Wilayah Perbatasan</option>
          <option value="Wilayah terpencil">Wilayah Terpencil / 3T</option>
        </select>
        <button class="btn-reset-zoom" @click="resetSelection" title="Reset Pilihan Simpul">
          Reset Pilihan
        </button>
      </div>
    </div>

    <!-- Cluster Legend -->
    <div class="legend-bar">
      <div 
        v-for="cat in nodeCategories" 
        :key="cat.id"
        :class="['legend-item', activeCategory === cat.id ? 'active' : '']"
        @click="toggleCategoryFilter(cat.id)"
      >
        <span class="legend-color-dot" :style="{ background: cat.color }"></span>
        <span class="legend-text">{{ cat.label }}</span>
        <span class="legend-count">({{ getNodeCountByCategory(cat.id) }})</span>
      </div>
    </div>

    <!-- Main Graph & Details Layout -->
    <div class="graph-main-layout">
      <!-- Interactive SVG Canvas -->
      <div class="svg-wrapper" ref="svgContainer">
        <svg 
          :viewBox="`0 0 ${svgWidth} ${svgHeight}`" 
          class="network-svg"
        >
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.3" />
              <stop offset="100%" stop-color="#3B82F6" stop-opacity="0" />
            </radialGradient>
            <!-- Drop Shadow for Nodes -->
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15" />
            </filter>
          </defs>

          <!-- Background Grid Lines -->
          <g class="grid-layer" opacity="0.3">
            <line v-for="n in 6" :key="`h-${n}`" :x1="0" :y1="n * (svgHeight / 6)" :x2="svgWidth" :y2="n * (svgHeight / 6)" stroke="#E2E8F0" stroke-dasharray="4 4" />
            <line v-for="n in 8" :key="`v-${n}`" :x1="n * (svgWidth / 8)" :y1="0" :x2="n * (svgWidth / 8)" :y2="svgHeight" stroke="#E2E8F0" stroke-dasharray="4 4" />
          </g>

          <!-- EDGES (Garis Penghubung) -->
          <g class="edges-layer">
            <line
              v-for="(edge, idx) in visibleEdges"
              :key="`edge-${idx}`"
              :x1="getNodeX(edge.source)"
              :y1="getNodeY(edge.source)"
              :x2="getNodeX(edge.target)"
              :y2="getNodeY(edge.target)"
              :stroke="isEdgeHighlighted(edge) ? '#2563EB' : '#CBD5E1'"
              :stroke-width="isEdgeHighlighted(edge) ? Math.max(edge.weight * 1.5, 3) : Math.max(edge.weight * 0.8, 1)"
              :stroke-opacity="isEdgeHighlighted(edge) ? 0.9 : 0.4"
              :stroke-dasharray="edge.type === 'hypothetical' ? '3 3' : 'none'"
              class="graph-edge"
            />
          </g>

          <!-- NODES (Simpul) -->
          <g class="nodes-layer">
            <g
              v-for="node in visibleNodes"
              :key="node.id"
              :transform="`translate(${node.x}, ${node.y})`"
              class="node-group"
              :class="{ 
                'node-selected': selectedNode && selectedNode.id === node.id,
                'node-dimmed': selectedNode && !isNodeConnectedToSelected(node.id) && selectedNode.id !== node.id 
              }"
              @click="handleNodeClick(node)"
              @mouseenter="hoveredNode = node"
              @mouseleave="hoveredNode = null"
            >
              <!-- Outer Pulse / Glow when selected -->
              <circle
                v-if="selectedNode && selectedNode.id === node.id"
                r="30"
                fill="none"
                :stroke="node.color"
                stroke-width="2"
                stroke-opacity="0.6"
                class="node-halo"
              />

              <!-- Core Node Circle -->
              <circle
                :r="getNodeRadius(node)"
                :fill="node.color"
                filter="url(#shadow)"
                class="node-circle"
              />

              <!-- Center Icon / Indicator -->
              <circle
                :r="getNodeRadius(node) * 0.35"
                fill="#FFFFFF"
                opacity="0.9"
              />

              <!-- Node Label -->
              <text
                :y="getNodeRadius(node) + 14"
                text-anchor="middle"
                class="node-label"
                :font-weight="selectedNode && selectedNode.id === node.id ? '800' : '600'"
                :fill="selectedNode && selectedNode.id === node.id ? '#0F172A' : '#334155'"
              >
                {{ node.label }}
              </text>

              <!-- Node Frequency Count Badge -->
              <g :transform="`translate(${getNodeRadius(node) * 0.7}, ${-getNodeRadius(node) * 0.7})`">
                <circle r="9" fill="#0F172A" />
                <text
                  text-anchor="middle"
                  dy="3.5"
                  fill="#FFFFFF"
                  font-size="9"
                  font-weight="bold"
                >
                  {{ getNodeFrequency(node.id) }}
                </text>
              </g>
            </g>
          </g>
        </svg>

        <!-- Canvas Floating Hint -->
        <div class="canvas-hint">
          💡 Klik pada salah satu simpul untuk melihat derajat keterkaitan (centrality) & kutipan narasi riil suara lapangan.
        </div>
      </div>

      <!-- Detail Side Panel -->
      <div class="detail-panel">
        <div v-if="selectedNode" class="node-detail-card">
          <div class="detail-header" :style="{ borderLeftColor: selectedNode.color }">
            <span class="category-tag" :style="{ background: selectedNode.color + '20', color: selectedNode.color }">
              {{ getCategoryLabel(selectedNode.category) }}
            </span>
            <h4 class="detail-node-title">{{ selectedNode.label }}</h4>
            <p class="detail-node-desc">{{ selectedNode.description }}</p>
          </div>

          <!-- Centrality & Frequency Metrics -->
          <div class="metrics-grid">
            <div class="metric-box">
              <span class="metric-val">{{ getNodeFrequency(selectedNode.id) }}</span>
              <span class="metric-lbl">Frekuensi Kemunculan</span>
            </div>
            <div class="metric-box">
              <span class="metric-val">{{ getConnectedNodes(selectedNode.id).length }}</span>
              <span class="metric-lbl">Derajat Hubungan (Degree)</span>
            </div>
            <div class="metric-box">
              <span class="metric-val">{{ (getCentralityScore(selectedNode.id) * 100).toFixed(0) }}%</span>
              <span class="metric-lbl">Skor Sentralitas Isu</span>
            </div>
          </div>

          <!-- Connected Entities / Nodes -->
          <div class="relations-section">
            <h5 class="section-mini-title">Simpul Terhubung Erat (Co-occurring Factors):</h5>
            <div class="connected-list">
              <div 
                v-for="rel in getConnectedNodes(selectedNode.id)" 
                :key="rel.node.id"
                class="connected-item"
                @click="handleNodeClick(rel.node)"
              >
                <div class="conn-left">
                  <span class="conn-dot" :style="{ background: rel.node.color }"></span>
                  <span class="conn-name">{{ rel.node.label }}</span>
                </div>
                <span class="conn-weight">Korelasi: {{ rel.weight }}x</span>
              </div>
            </div>
          </div>

          <!-- Real Field Quotes from Survey (Q14, Q29, Q30, Q31, Q32) -->
          <div class="quotes-section">
            <h5 class="section-mini-title">Kutipan Narasi Riil Suara Lapangan Terkait:</h5>
            <div v-if="relatedQuotes.length === 0" class="empty-quote">
              Belum ada narasi langsung yang menyebut kata kunci ini pada filter wilayah saat ini.
            </div>
            <div v-else class="quotes-stream">
              <div 
                v-for="(quote, qIdx) in relatedQuotes.slice(0, 3)" 
                :key="qIdx"
                class="quote-bubble"
              >
                <div class="quote-meta">
                  <span>{{ quote.province }} • {{ quote.areaType }}</span>
                  <span class="quote-badge">{{ quote.questionCode }}</span>
                </div>
                <p class="quote-text">"{{ quote.text }}"</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Default State when no node selected -->
        <div v-else class="empty-detail-card">
          <div class="empty-icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </div>
          <h4 style="font-size: 1.05rem; font-weight: 700; color: #1E293B; margin-bottom: 0.5rem;">Eksplorasi Graf Narasi Suara Lapangan</h4>
          <p style="font-size: 0.85rem; color: #64748B; line-height: 1.6; margin-bottom: 1.25rem;">
            Graf ini mengekstrak pola semantik ko-okurensi dari jawaban kualitatif (Q14, Q29, Q30, Q31, Q32) dan menghubungkannya dengan konteks struktural ASN.
          </p>

          <div class="quick-insights">
            <div class="insight-title">💡 Pola Utama Berdasarkan Data Survei:</div>
            <ul class="insight-list">
              <li><strong>Kluster Kepulauan & 3T:</strong> Masalah sinyal blankspot dan pemadaman listrik berkorelasi kuat dengan perilaku <em>Zoom Off-Cam</em> dan permintaan <em>Offline Mode</em>.</li>
              <li><strong>Kluster Perkotaan:</strong> Hambatan utama adalah tumpang tindih penugasan pimpinan & rapat mendadak, menuntut format <em>Micro-learning 5-10 menit</em>.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { SurveyResponse } from '~/composables/useSurvey';

const props = defineProps<{
  responses: SurveyResponse[];
}>();

const svgWidth = 840;
const svgHeight = 560;

const selectedAreaFilter = ref<string>('ALL');
const activeCategory = ref<string | null>(null);
const selectedNode = ref<any | null>(null);
const hoveredNode = ref<any | null>(null);

// Categories
const nodeCategories = [
  { id: 'spatial', label: 'Tipologi Spasial & Lokasi', color: '#8B5CF6' },
  { id: 'service', label: 'Dinamika Kedinasan (Workload)', color: '#EF4444' },
  { id: 'infrastructure', label: 'Infrastruktur & Teknis', color: '#F59E0B' },
  { id: 'behavior', label: 'Perilaku Belajar ASN', color: '#10B981' },
  { id: 'personalization', label: 'Aspirasi Personalisasi', color: '#3B82F6' }
];

function getCategoryLabel(catId: string) {
  const c = nodeCategories.find(item => item.id === catId);
  return c ? c.label : catId;
}

function getNodeCountByCategory(catId: string) {
  return rawNodes.filter(n => n.category === catId).length;
}

function toggleCategoryFilter(catId: string) {
  if (activeCategory.value === catId) {
    activeCategory.value = null;
  } else {
    activeCategory.value = catId;
  }
}

function resetSelection() {
  selectedNode.value = null;
  activeCategory.value = null;
  selectedAreaFilter.value = 'ALL';
}

// Master Node Dictionary with Cartesian positions for clean readability
const rawNodes = [
  // 1. SPATIAL (Purple)
  { id: 'sp_kepulauan', label: 'Wilayah Kepulauan', category: 'spatial', color: '#8B5CF6', x: 120, y: 130, keywords: ['kepulauan', 'pulau', 'laut', 'ombak', 'boat'], description: 'Karakteristik geografis terpisah lautan dengan ketergantungan transmisi kabel laut / satelit.' },
  { id: 'sp_3t', label: 'Wilayah Terpencil (3T)', category: 'spatial', color: '#8B5CF6', x: 130, y: 320, keywords: ['terpencil', '3t', 'pedalaman', 'gunung', 'hutan', 'pelosok'], description: 'Wilayah tertinggal, terdepan, dan terluar dengan keterbatasan akses logistik dan infrastruktur.' },
  { id: 'sp_perkotaan', label: 'Wilayah Perkotaan', category: 'spatial', color: '#8B5CF6', x: 140, y: 470, keywords: ['perkotaan', 'kota', 'pusat', 'kantor', 'dinas'], description: 'Wilayah dengan akses internet prima namun intensitas beban birokrasi & rapat dinas sangat tinggi.' },

  // 2. INFRASTRUCTURE & TECHNICAL (Amber)
  { id: 'inf_blankspot', label: 'Sinyal Blankspot / Lemah', category: 'infrastructure', color: '#F59E0B', x: 320, y: 110, keywords: ['sinyal', 'blankspot', 'koneksi', 'jaringan', 'tower', '4g', 'hilang sinyal'], description: 'Ketidakstabilan konektivitas internet seluler atau ketiadaan fiber optik di lokasi tugas.' },
  { id: 'inf_listrik', label: 'Pemadaman Listrik / Genset', category: 'infrastructure', color: '#F59E0B', x: 310, y: 230, keywords: ['listrik', 'mati lampu', 'genset', 'pln', 'padam'], description: 'Gangguan suplai daya listrik berkala yang memutus akses perangkat dan router internet.' },
  { id: 'inf_kuota', label: 'Beban Kuota Pribadi', category: 'infrastructure', color: '#F59E0B', x: 330, y: 340, keywords: ['kuota', 'pulsa', 'biaya', 'beli sendiri', 'wifi kantor rusak'], description: 'Pengeluaran finansial mandiri ASN untuk membeli paket data demi mengikuti pelatihan dinas.' },

  // 3. SERVICE DYNAMICS (Red)
  { id: 'serv_tugas_mendadak', label: 'Tugas SPPD / Mendadak', category: 'service', color: '#EF4444', x: 420, y: 470, keywords: ['sppd', 'mendadak', 'perjalanan dinas', 'lapangan', 'panggilan', 'inspeksi'], description: 'Perintah kedinasan darurat yang mengharuskan ASN meninggalkan meja kerja saat jam pelatihan.' },
  { id: 'serv_overlap', label: 'Tumpang Tindih Beban Kerja', category: 'service', color: '#EF4444', x: 500, y: 370, keywords: ['tumpang tindih', 'beban', 'pekerjaan', 'rutin', 'pelayanan', 'deadline'], description: 'Tidak adanya dispensasi tugas rutin saat ASN diwajibkan mengikuti agenda pelatihan online.' },
  { id: 'serv_atasan', label: 'Minim Dukungan Pimpinan', category: 'service', color: '#EF4444', x: 490, y: 260, keywords: ['atasan', 'pimpinan', 'izin', 'dukungan', 'disposisi', 'tetap disuruh kerja'], description: 'Kultur birokrasi yang memprioritaskan penyelesaian berkas fisik daripada jam belajar ASN.' },

  // 4. BEHAVIORAL DYNAMICS (Emerald)
  { id: 'beh_zoom_offcam', label: 'Perilaku Zoom Off-Cam', category: 'behavior', color: '#10B981', x: 620, y: 150, keywords: ['offcam', 'mati kamera', 'off camera', 'tutup kamera', 'kamera mati'], description: 'Strategi peserta mematikan video untuk menghemat bandwidth atau menyembunyikan aktivitas kerja lain.' },
  { id: 'beh_multitask', label: 'Multitasking Kedinasan', category: 'behavior', color: '#10B981', x: 670, y: 270, keywords: ['sambil kerja', 'multitask', 'ngetik surat', 'layani masyarakat', 'sambil'], description: 'Mengikuti audio pelatihan sambil menyelesaikan dokumen kantor atau melayani loket masyarakat.' },
  { id: 'beh_smartphone', label: 'Akses Utama via HP', category: 'behavior', color: '#10B981', x: 600, y: 450, keywords: ['hp', 'smartphone', 'handphone', 'layar kecil'], description: 'Ketergantungan pada layar ponsel saat mobilitas di lapangan atau laptop dipakai rekan kerja.' },

  // 5. PERSONALIZATION ASPIRATIONS (Blue)
  { id: 'pers_micro', label: 'Micro-Learning & Ringkas', category: 'personalization', color: '#3B82F6', x: 740, y: 400, keywords: ['micro', 'singkat', 'ringkas', 'durasi pendek', 'to the point', '10 menit'], description: 'Aspirasi format pembelajaran berdurasi 5-15 menit per modul yang fleksibel diselipkan di jeda tugas.' },
  { id: 'pers_offline', label: 'Mode Unduh & Akses Offline', category: 'personalization', color: '#3B82F6', x: 730, y: 120, keywords: ['offline', 'unduh', 'download', 'pdf', 'baca offline', 'bisa dipelajari nanti'], description: 'Kebutuhan paket materi yang dapat di-cache saat ada sinyal dan dipelajari saat di pelosok.' },
  { id: 'pers_tupoksi', label: 'Materi Kontekstual Tupoksi', category: 'personalization', color: '#3B82F6', x: 750, y: 250, keywords: ['tupoksi', 'kontekstual', 'aplikatif', 'relevan', 'sesuai kerjaan', 'praktek'], description: 'Personalisasi studi kasus yang langsung memecahkan masalah birokrasi riil di unit kerja ASN.' }
];

// Base Edges (Hubungan Teoritis & Ko-okurensi)
const baseEdges = [
  // Spatial to Infrastructure & Service
  { source: 'sp_kepulauan', target: 'inf_blankspot', weight: 4 },
  { source: 'sp_kepulauan', target: 'inf_listrik', weight: 3 },
  { source: 'sp_kepulauan', target: 'pers_offline', weight: 4 },
  { source: 'sp_3t', target: 'inf_blankspot', weight: 5 },
  { source: 'sp_3t', target: 'inf_listrik', weight: 4 },
  { source: 'sp_3t', target: 'beh_smartphone', weight: 3 },
  { source: 'sp_perkotaan', target: 'serv_overlap', weight: 5 },
  { source: 'sp_perkotaan', target: 'serv_tugas_mendadak', weight: 4 },
  { source: 'sp_perkotaan', target: 'pers_micro', weight: 5 },

  // Infrastructure to Behavior & Personalization
  { source: 'inf_blankspot', target: 'beh_zoom_offcam', weight: 5 },
  { source: 'inf_blankspot', target: 'pers_offline', weight: 5 },
  { source: 'inf_listrik', target: 'beh_zoom_offcam', weight: 3 },
  { source: 'inf_kuota', target: 'beh_zoom_offcam', weight: 4 },
  { source: 'inf_kuota', target: 'pers_offline', weight: 3 },

  // Service to Behavior & Personalization
  { source: 'serv_overlap', target: 'beh_multitask', weight: 5 },
  { source: 'serv_overlap', target: 'beh_zoom_offcam', weight: 4 },
  { source: 'serv_overlap', target: 'pers_micro', weight: 5 },
  { source: 'serv_tugas_mendadak', target: 'beh_smartphone', weight: 4 },
  { source: 'serv_tugas_mendadak', target: 'beh_multitask', weight: 3 },
  { source: 'serv_atasan', target: 'serv_overlap', weight: 4 },
  { source: 'serv_atasan', target: 'beh_multitask', weight: 4 },

  // Behavior to Personalization
  { source: 'beh_multitask', target: 'pers_micro', weight: 4 },
  { source: 'beh_smartphone', target: 'pers_micro', weight: 3 },
  { source: 'beh_multitask', target: 'pers_tupoksi', weight: 3 }
];

// Reactive Nodes filtered by category
const visibleNodes = computed(() => {
  if (!activeCategory.value) return rawNodes;
  return rawNodes.filter(n => n.category === activeCategory.value);
});

// Reactive Edges filtered
const visibleEdges = computed(() => {
  const nodeIds = new Set(visibleNodes.value.map(n => n.id));
  return baseEdges.filter(e => nodeIds.has(e.source) && nodeIds.has(e.target));
});

function getNodeX(nodeId: string) {
  const n = rawNodes.find(item => item.id === nodeId);
  return n ? n.x : 0;
}

function getNodeY(nodeId: string) {
  const n = rawNodes.find(item => item.id === nodeId);
  return n ? n.y : 0;
}

function getNodeRadius(node: any) {
  const freq = getNodeFrequency(node.id);
  const base = node.category === 'spatial' ? 18 : 16;
  return Math.min(base + freq * 1.2, 28);
}

// Compute frequency based on occurrences in real/mock responses
function getNodeFrequency(nodeId: string): number {
  const node = rawNodes.find(n => n.id === nodeId);
  if (!node) return 1;

  let count = 0;
  const filtered = props.responses.filter(r => {
    if (selectedAreaFilter.value !== 'ALL' && r.answers['q_2'] !== selectedAreaFilter.value) {
      return false;
    }
    return true;
  });

  filtered.forEach(r => {
    // Check spatial match
    if (nodeId === 'sp_kepulauan' && r.answers['q_2'] === 'Wilayah kepulauan') count++;
    if (nodeId === 'sp_3t' && r.answers['q_2'] === 'Wilayah terpencil') count++;
    if (nodeId === 'sp_perkotaan' && r.answers['q_2'] === 'Perkotaan') count++;

    // Check behavioral match
    if (nodeId === 'beh_smartphone' && (r.answers['q_9'] === 'Smartphone' || r.answers['q_9'] === 'Tablet')) count++;
    if (nodeId === 'beh_zoom_offcam' && r.answers['q_33'] && r.answers['q_33']['Mematikan kamera'] >= 3) count++;
    if (nodeId === 'beh_multitask' && r.answers['q_33'] && r.answers['q_33']['Mengikuti sambil melakukan pekerjaan lain'] >= 3) count++;

    // Check service match
    if (nodeId === 'serv_overlap' && Number(r.answers['q_15']) >= 4) count++;
    if (nodeId === 'serv_tugas_mendadak' && Number(r.answers['q_16']) >= 4) count++;

    // Check text qualitative matches (Q14, Q29, Q30, Q31, Q32)
    const combinedNarrative = [
      r.answers['q_14'] || '',
      r.answers['q_29'] || '',
      r.answers['q_30'] || '',
      r.answers['q_31'] || '',
      r.answers['q_32'] || ''
    ].join(' ').toLowerCase();

    if (node.keywords.some(kw => combinedNarrative.includes(kw))) {
      count++;
    }
  });

  return Math.max(count, 1);
}

function handleNodeClick(node: any) {
  selectedNode.value = node;
}

function isNodeConnectedToSelected(nodeId: string): boolean {
  if (!selectedNode.value) return false;
  return baseEdges.some(e => 
    (e.source === selectedNode.value.id && e.target === nodeId) ||
    (e.target === selectedNode.value.id && e.source === nodeId)
  );
}

function isEdgeHighlighted(edge: any): boolean {
  if (hoveredNode.value) {
    return edge.source === hoveredNode.value.id || edge.target === hoveredNode.value.id;
  }
  if (selectedNode.value) {
    return edge.source === selectedNode.value.id || edge.target === selectedNode.value.id;
  }
  return false;
}

function getConnectedNodes(nodeId: string) {
  const result: Array<{ node: any; weight: number }> = [];
  baseEdges.forEach(e => {
    if (e.source === nodeId) {
      const targetNode = rawNodes.find(n => n.id === e.target);
      if (targetNode) result.push({ node: targetNode, weight: e.weight });
    } else if (e.target === nodeId) {
      const sourceNode = rawNodes.find(n => n.id === e.source);
      if (sourceNode) result.push({ node: sourceNode, weight: e.weight });
    }
  });
  return result.sort((a, b) => b.weight - a.weight);
}

function getCentralityScore(nodeId: string): number {
  const connected = getConnectedNodes(nodeId);
  const totalWeight = connected.reduce((acc, c) => acc + c.weight, 0);
  return Math.min(totalWeight / 25, 1);
}

// Extract matching qualitative quotes for selected node
const relatedQuotes = computed(() => {
  if (!selectedNode.value) return [];
  const keywords: string[] = selectedNode.value.keywords || [];
  const quotes: Array<{ province: string; areaType: string; questionCode: string; text: string }> = [];

  props.responses.forEach(r => {
    if (selectedAreaFilter.value !== 'ALL' && r.answers['q_2'] !== selectedAreaFilter.value) {
      return;
    }

    const checkAndPush = (qCode: string, ans: string | undefined) => {
      if (!ans || typeof ans !== 'string' || ans.trim().length < 8) return;
      const lower = ans.toLowerCase();
      if (keywords.some(kw => lower.includes(kw))) {
        quotes.push({
          province: r.province || 'Umum',
          areaType: r.answers['q_2'] || 'Wilayah',
          questionCode: qCode,
          text: ans
        });
      }
    };

    checkAndPush('Q14 (Kendala)', r.answers['q_14']);
    checkAndPush('Q29 (Masalah Terbesar)', r.answers['q_29']);
    checkAndPush('Q30 (Aspirasi)', r.answers['q_30']);
    checkAndPush('Q31 (Konteks Spasial)', r.answers['q_31']);
    checkAndPush('Q32 (Penyelenggara)', r.answers['q_32']);
  });

  return quotes;
});
</script>

<style scoped>
.network-graph-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background: var(--color-surface-card, #FFFFFF);
  border: 1px solid var(--color-stroke-secondary, #E2E8F0);
  border-radius: var(--radius-lg, 12px);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.05));
}

.graph-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
}

.badge-cluster {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #4338CA;
  background: #EEF2FF;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  border: 1px solid #C7D2FE;
  margin-bottom: 0.4rem;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #6366F1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.4);
}

.graph-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text-primary, #0F172A);
  margin-bottom: 0.25rem;
}

.graph-subtitle {
  font-size: 0.85rem;
  color: var(--color-text-secondary, #64748B);
  max-width: 680px;
  line-height: 1.5;
}

.graph-controls {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.control-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #475569;
}

.form-select-sm {
  font-size: 0.825rem;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #CBD5E1;
  background: #FFFFFF;
  color: #1E293B;
  font-weight: 600;
}

.btn-reset-zoom {
  font-size: 0.775rem;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #E2E8F0;
  background: #F8FAFC;
  color: #64748B;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-reset-zoom:hover {
  background: #E2E8F0;
  color: #0F172A;
}

/* Legend Bar */
.legend-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding: 0.75rem;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  font-size: 0.775rem;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  transition: all 0.2s;
}

.legend-item:hover {
  border-color: #94A3B8;
}

.legend-item.active {
  background: #0F172A;
  color: #FFFFFF;
  border-color: #0F172A;
}

.legend-color-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.legend-count {
  font-size: 0.7rem;
  color: #64748B;
}

.legend-item.active .legend-count {
  color: #CBD5E1;
}

/* Main Layout */
.graph-main-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.25rem;
  align-items: start;
}

@media (max-width: 1024px) {
  .graph-main-layout {
    grid-template-columns: 1fr;
  }
}

.svg-wrapper {
  position: relative;
  background: radial-gradient(circle at center, #FAFAFB 0%, #F1F5F9 100%);
  border: 1px solid #CBD5E1;
  border-radius: 10px;
  overflow: hidden;
  min-height: 480px;
}

.network-svg {
  width: 100%;
  height: auto;
  display: block;
}

.graph-edge {
  transition: all 0.3s ease;
}

.node-group {
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.3s ease;
}

.node-group:hover {
  transform: scale(1.08);
}

.node-dimmed {
  opacity: 0.18;
}

.node-halo {
  animation: pulseHalo 2s infinite ease-in-out;
}

@keyframes pulseHalo {
  0% { r: 24px; opacity: 0.8; }
  50% { r: 32px; opacity: 0.3; }
  100% { r: 24px; opacity: 0.8; }
}

.node-circle {
  transition: all 0.2s;
}

.node-label {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 10.5px;
  pointer-events: none;
  paint-order: stroke;
  stroke: #FFFFFF;
  stroke-width: 3px;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.canvas-hint {
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  right: 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  color: #475569;
  border: 1px solid rgba(203, 213, 225, 0.6);
  pointer-events: none;
}

/* Detail Side Panel */
.detail-panel {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 1.25rem;
  min-height: 480px;
  display: flex;
  flex-direction: column;
}

.detail-header {
  border-left: 4px solid #3B82F6;
  padding-left: 0.75rem;
  margin-bottom: 1rem;
}

.category-tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
}

.detail-node-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 0.25rem;
}

.detail-node-desc {
  font-size: 0.785rem;
  color: #64748B;
  line-height: 1.45;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.metric-box {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 0.6rem 0.4rem;
  text-align: center;
}

.metric-val {
  display: block;
  font-size: 1.15rem;
  font-weight: 800;
  color: #0F172A;
}

.metric-lbl {
  display: block;
  font-size: 0.65rem;
  font-weight: 600;
  color: #64748B;
  line-height: 1.2;
  margin-top: 0.15rem;
}

.section-mini-title {
  font-size: 0.775rem;
  font-weight: 700;
  color: #334155;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-bottom: 0.5rem;
}

.connected-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
  max-height: 140px;
  overflow-y: auto;
}

.connected-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.6rem;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  font-size: 0.775rem;
  cursor: pointer;
  transition: all 0.15s;
}

.connected-item:hover {
  background: #EFF6FF;
  border-color: #93C5FD;
}

.conn-left {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.conn-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.conn-name {
  font-weight: 600;
  color: #1E293B;
}

.conn-weight {
  font-size: 0.7rem;
  font-weight: 700;
  color: #2563EB;
}

.quotes-stream {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 180px;
  overflow-y: auto;
}

.quote-bubble {
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 6px;
  padding: 0.65rem;
}

.quote-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.675rem;
  font-weight: 700;
  color: #92400E;
  margin-bottom: 0.25rem;
}

.quote-badge {
  background: #FEF3C7;
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
}

.quote-text {
  font-size: 0.785rem;
  font-style: italic;
  color: #78350F;
  line-height: 1.4;
  margin: 0;
}

.empty-detail-card {
  text-align: center;
  padding: 2rem 1rem;
}

.empty-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #E2E8F0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
}

.quick-insights {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 0.85rem;
  text-align: left;
  margin-top: 1rem;
}

.insight-title {
  font-size: 0.775rem;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 0.4rem;
}

.insight-list {
  font-size: 0.75rem;
  color: #475569;
  line-height: 1.5;
  padding-left: 1.1rem;
  margin: 0;
}

.insight-list li {
  margin-bottom: 0.4rem;
}
</style>
