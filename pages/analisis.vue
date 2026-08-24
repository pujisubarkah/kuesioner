<template>
  <div class="analisis-page-wrapper">
    <!-- Top Header Navigation -->
    <Navbar />

    <main id="konten-utama" class="analisis-main-content">
      <!-- Main Knowledge Graph Card -->
      <div class="kg-card">
        
        <!-- Top Header Bar -->
        <div class="kg-header-bar">
          <div class="kg-header-left">
            <div class="kg-header-icon">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div>
              <div class="kg-title-row">
                <h2 class="kg-title">Knowledge Graph: Triangulasi Suara Lapangan & Literatur</h2>
                <span class="kg-badge blue">
                  {{ graphData?.totalResponses || 0 }} Respon Kuesioner
                </span>
                <span class="kg-badge purple">
                  2.103 Korpus Paper & 271 Gaps
                </span>
              </div>
              <p class="kg-subtitle">
                Peta sintesis hubungan antara realita empiris suara lapangan ASN (Q14-Q32) dan tinjauan literatur global model disertasi.
              </p>
            </div>
          </div>

          <!-- View Switcher & Controls -->
          <div class="kg-header-right">
            <div class="view-switcher-pill">
              <button 
                @click="activeView = 'graph'"
                :class="['switch-btn', activeView === 'graph' ? 'active' : '']"
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
                </svg>
                Force Graph
              </button>
              <button 
                @click="activeView = 'timeline'"
                :class="['switch-btn', activeView === 'timeline' ? 'active' : '']"
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
                Disparitas Wilayah
              </button>
            </div>

            <button 
              v-if="activeView === 'graph'"
              @click="resetGraphZoom" 
              title="Reset Zoom & Posisi"
              class="btn-icon-control"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Filter & Search Sub-bar (Only in Graph View) -->
        <div v-if="activeView === 'graph'" class="kg-filter-bar">
          <!-- Category Pills -->
          <div class="category-pills-row">
            <span class="filter-label">Filter Pilar/Kategori:</span>
            <button 
              v-for="cat in (graphData?.categories ? ['ALL', ...graphData.categories.map((c: any) => c.name)] : ['ALL'])"
              :key="cat"
              @click="selectedCategory = cat"
              :class="['cat-pill-btn', selectedCategory === cat ? 'active' : '']"
            >
              {{ cat }}
            </button>
          </div>

          <!-- Search & Threshold -->
          <div class="search-controls-row">
            <div class="search-input-wrapper">
              <svg class="search-icon" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Cari tema / topik riset..." 
                class="search-text-input"
              />
            </div>

            <div class="threshold-wrapper">
              <span class="threshold-label">Min Ko-okurensi:</span>
              <select v-model.number="minCooccurrence" class="threshold-select">
                <option :value="1">Semua Relasi (≥1)</option>
                <option :value="2">Relasi Sedang (≥2)</option>
                <option :value="3">Relasi Kuat (≥3)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Main Canvas / Chart Area -->
        <div class="kg-canvas-container">
          <!-- Loading State -->
          <div v-if="isLoading" class="kg-loading-overlay">
            <div class="kg-spinner"></div>
            <p class="kg-loading-text">Membangun graf triangulasi suara lapangan & literatur...</p>
          </div>

          <!-- Graph View Canvas -->
          <div 
            v-show="activeView === 'graph'" 
            ref="graphChartRef" 
            class="echarts-dom-container"
          ></div>

          <!-- Timeline View Canvas -->
          <div 
            v-show="activeView === 'timeline'" 
            ref="timelineChartRef" 
            class="echarts-dom-container timeline-padding"
          ></div>

          <!-- Floating Graph Quick Hint -->
          <div v-if="activeView === 'graph' && !isLoading" class="kg-floating-hint">
            <span class="hint-dot"></span>
            <span>💡 Drag simpul untuk eksplorasi • Scroll zoom • Klik simpul untuk melihat Suara Lapangan & Paper Literatur Terkait</span>
          </div>

          <!-- Right Slide-over Inspector Drawer for Selected Node / Link -->
          <div v-if="isDrawerOpen" class="kg-drawer">
            <!-- Drawer Header -->
            <div class="drawer-header">
              <div class="drawer-header-left">
                <div class="drawer-dot" :style="{ backgroundColor: graphData?.categories[selectedNode?.category]?.itemStyle?.color || '#3B82F6' }"></div>
                <span class="drawer-category-title">
                  {{ selectedNode ? (graphData?.categories[selectedNode.category]?.name || 'Pilar Disertasi') : 'Triangulasi Hubungan Relasi' }}
                </span>
              </div>
              <button @click="isDrawerOpen = false" class="drawer-close-btn">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Drawer Content -->
            <div class="drawer-body">
              <!-- Node Details -->
              <div v-if="selectedNode">
                <h3 class="drawer-node-name">{{ selectedNode.name }}</h3>
                <div class="stats-pills-row">
                  <span class="stat-pill-item green">👥 {{ selectedNode.respondentCount || selectedNode.suaraLapangan?.length || 0 }} Respon ASN</span>
                  <span class="stat-pill-item blue">📚 {{ selectedNode.paperCount || selectedNode.papers?.length || 0 }} Paper Literatur</span>
                </div>

                <!-- 3 Navigation Tabs for Node Inspector -->
                <div class="drawer-nav-tabs">
                  <button 
                    :class="['d-tab-btn', drawerActiveTab === 'lapangan' ? 'active' : '']"
                    @click="drawerActiveTab = 'lapangan'"
                  >
                    📢 Suara Lapangan
                  </button>
                  <button 
                    :class="['d-tab-btn', drawerActiveTab === 'literatur' ? 'active' : '']"
                    @click="drawerActiveTab = 'literatur'"
                  >
                    📚 Tinjauan Literatur
                  </button>
                  <button 
                    :class="['d-tab-btn', drawerActiveTab === 'gap' ? 'active' : '']"
                    @click="drawerActiveTab = 'gap'"
                  >
                    🔬 Gap & Solusi Disertasi
                  </button>
                </div>

                <!-- TAB 1: SUARA LAPANGAN -->
                <div v-if="drawerActiveTab === 'lapangan'" class="drawer-tab-pane">
                  <div class="section-lead-note">
                    Kutipan langsung dari 5 Pertanyaan Emas (Gold Questions Q14-Q32) responden ASN:
                  </div>

                  <div v-if="!selectedNode.suaraLapangan || selectedNode.suaraLapangan.length === 0" class="empty-box-note">
                    Belum ada narasi langsung untuk simpul ini pada filter saat ini.
                  </div>

                  <div v-else class="papers-list-stack">
                    <div 
                      v-for="(ans, aIdx) in selectedNode.suaraLapangan" 
                      :key="aIdx"
                      class="paper-item-card quote-card"
                    >
                      <div class="quote-header-tag">
                        <span class="q-badge">{{ ans.question }}</span>
                        <span class="asn-id">{{ ans.id }}</span>
                      </div>
                      <p class="quote-real-text">"{{ ans.text }}"</p>
                      <div class="paper-meta-row">
                        <span>📍 {{ ans.province }} ({{ ans.regency || ans.areaType }})</span>
                        <span class="instansi-text">{{ ans.institutionType }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- TAB 2: LITERATURE REVIEW -->
                <div v-if="drawerActiveTab === 'literatur'" class="drawer-tab-pane">
                  <div class="section-lead-note">
                    Rujukan paper internasional & nasional yang melandasi konsep ini:
                  </div>

                  <div v-if="!selectedNode.papers || selectedNode.papers.length === 0" class="empty-box-note">
                    Belum ada paper rujukan terindeks untuk topik ini.
                  </div>

                  <div v-else class="papers-list-stack">
                    <div 
                      v-for="paper in selectedNode.papers" 
                      :key="paper.title"
                      class="paper-item-card"
                    >
                      <h5 class="paper-title-text">{{ paper.title }}</h5>
                      <div class="paper-meta-row">
                        <span>{{ paper.year || 'N/A' }} • {{ Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors }}</span>
                        <a 
                          v-if="paper.doi" 
                          :href="`https://doi.org/${paper.doi}`" 
                          target="_blank"
                          class="doi-link"
                        >
                          DOI ↗
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- TAB 3: RESEARCH GAP & NOVELTY -->
                <div v-if="drawerActiveTab === 'gap'" class="drawer-tab-pane">
                  <div class="gap-novelty-box">
                    <div class="gap-header-badge">
                      <span>🔬 Tipe Gap: {{ selectedNode.researchGap?.gapType || 'Contextual & Methodological Gap' }}</span>
                    </div>

                    <div class="gap-section">
                      <h5 class="gap-subheading text-red">⚠️ Kelemahan Sistem/Model Saat Ini:</h5>
                      <p class="gap-desc-text">{{ selectedNode.researchGap?.problem || 'Model pembelajaran konvensional belum mengakomodasi dinamika kedinasan dan spasial ASN.' }}</p>
                    </div>

                    <div class="gap-section" style="border-top: 1px solid #334155; padding-top: 0.75rem;">
                      <h5 class="gap-subheading text-green">💡 Kontribusi Kebaruan (Novelty) Disertasi Anda:</h5>
                      <p class="gap-desc-text">{{ selectedNode.researchGap?.solution || 'Menggunakan Multimodal Fusion Engine yang dimoderasi Konteks Spasial untuk rekomendasi micro-learning adaptif.' }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Link Details (Bridge the Gap) -->
              <div v-else-if="selectedLink">
                <h3 class="drawer-node-name" style="font-size: 1.05rem;">
                  {{ selectedLink.source }} ↔ {{ selectedLink.target }}
                </h3>
                <p class="drawer-subtext">
                  Ko-okurensi simultan dialami oleh <b>{{ selectedLink.value }}</b> responden ASN yang sama.
                </p>

                <!-- Triangulation Card for Edge -->
                <div class="triangulation-edge-box">
                  <div class="tri-section">
                    <span class="tri-badge gold">📢 Realita Empiris Lapangan:</span>
                    <p class="tri-text">{{ selectedLink.gapBridge?.empiricalFact || `Responden mengalami kendala "${selectedLink.source}" bersamaan dengan "${selectedLink.target}".` }}</p>
                  </div>

                  <div class="tri-section">
                    <span class="tri-badge blue">📚 Keterbatasan Teori Saat Ini:</span>
                    <p class="tri-text">{{ selectedLink.gapBridge?.theoreticalLimitation || 'Literatur sebelumnya memisahkan analisis infrastruktur dengan analisis kognitif beban tugas.' }}</p>
                  </div>

                  <div class="tri-section">
                    <span class="tri-badge purple">🌉 Solusi Jembatan Model Disertasi:</span>
                    <p class="tri-text">{{ selectedLink.gapBridge?.dissertationNovelty || 'Arsitektur Multimodal Fusion memadukan sinyal spasial sebagai variabel moderator untuk personalisasi konten adaptif.' }}</p>
                  </div>
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
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import * as echarts from 'echarts';
import Navbar from '~/components/Navbar.vue';

const emit = defineEmits(['ask-topic', 'select-paper', 'bridge-gap']);

const activeView = ref<'graph' | 'timeline'>('graph');
const isLoading = ref(true);
const graphData = ref<any>(null);
const timelineData = ref<any>(null);
const selectedCategory = ref('ALL');
const searchQuery = ref('');
const minCooccurrence = ref(1);

// Drawer state & active inner tab
const selectedNode = ref<any>(null);
const selectedLink = ref<any>(null);
const isDrawerOpen = ref(false);
const drawerActiveTab = ref<'lapangan' | 'literatur' | 'gap'>('lapangan');

const graphChartRef = ref<HTMLElement | null>(null);
const timelineChartRef = ref<HTMLElement | null>(null);
let graphChartInstance: any = null;
let timelineChartInstance: any = null;

const fetchAnalyticsData = async () => {
  isLoading.value = true;
  try {
    const [graphRes, timelineRes] = await Promise.all([
      fetch(`/api/literature-hunter/analytics/knowledge-graph?min_cooccurrence=${minCooccurrence.value}&max_nodes=45`),
      fetch(`/api/literature-hunter/analytics/topic-timeline`)
    ]);

    if (graphRes.ok) {
      graphData.value = await graphRes.json();
    }
    if (timelineRes.ok) {
      timelineData.value = await timelineRes.json();
    }
  } catch (err) {
    console.error('Failed to load analytics data from local Nuxt endpoint:', err);
  } finally {
    isLoading.value = false;
    await nextTick();
    renderCurrentView();
  }
};

const renderCurrentView = () => {
  if (activeView.value === 'graph') {
    renderGraphChart();
  } else {
    renderTimelineChart();
  }
};

const renderGraphChart = () => {
  if (!graphChartRef.value || !graphData.value) return;

  if (!graphChartInstance) {
    graphChartInstance = echarts.init(graphChartRef.value);
    graphChartInstance.on('click', (params: any) => {
      if (params.dataType === 'node') {
        selectedLink.value = null;
        selectedNode.value = params.data;
        drawerActiveTab.value = 'lapangan';
        isDrawerOpen.value = true;
      } else if (params.dataType === 'edge') {
        selectedNode.value = null;
        selectedLink.value = params.data;
        isDrawerOpen.value = true;
      }
    });
  }

  // Filter nodes based on selectedCategory & searchQuery
  let filteredNodes = (graphData.value.nodes || []).map((n: any) => ({ ...n }));
  if (selectedCategory.value !== 'ALL') {
    const catIdx = graphData.value.categories.findIndex(
      (c: any) => c.name.toLowerCase() === selectedCategory.value.toLowerCase()
    );
    if (catIdx !== -1) {
      filteredNodes = filteredNodes.filter((n: any) => n.category === catIdx);
    }
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    filteredNodes = filteredNodes.filter((n: any) => n.name.toLowerCase().includes(q));
  }

  const validNodeIds = new Set(filteredNodes.map((n: any) => n.id));
  const filteredLinks = (graphData.value.links || []).filter(
    (l: any) => validNodeIds.has(l.source) && validNodeIds.has(l.target)
  );

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        if (params.dataType === 'node') {
          const d = params.data;
          const catName = graphData.value.categories[d.category]?.name || 'Pilar';
          return `
            <div style="padding: 8px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; color: #1E293B; background: #FFFFFF; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
              <div style="font-weight: 800; font-size: 13px; color: #0F172A;">${d.name}</div>
              <div style="color: #2563EB; font-weight: 700; margin: 4px 0;">Kategori: ${catName}</div>
              <div style="color: #475569;">👥 <b>${d.respondentCount || d.paperCount || 0}</b> respon ASN • 📚 <b>${d.papers?.length || 0}</b> paper terhubung</div>
              <div style="font-size: 11px; color: #94A3B8; margin-top: 4px; font-style: italic;">Klik untuk melihat Triangulasi Suara Lapangan & Literatur</div>
            </div>
          `;
        } else if (params.dataType === 'edge') {
          return `
            <div style="padding: 8px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; color: #1E293B; background: #FFFFFF; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
              <div style="font-weight: 800; color: #0F172A;">${params.data.source} ↔ ${params.data.target}</div>
              <div style="color: #059669; font-weight: 700; margin-top: 4px;">Ko-okurensi: Muncul pada <b>${params.data.value}</b> ASN yang sama</div>
              <div style="font-size: 11px; color: #94A3B8; margin-top: 4px; font-style: italic;">Klik untuk melihat Bridge the Gap & Solusi Disertasi</div>
            </div>
          `;
        }
      }
    },
    legend: {
      data: (graphData.value.categories || []).map((c: any) => c.name),
      orient: 'horizontal',
      top: 10,
      textStyle: {
        color: '#94A3B8',
        fontSize: 12
      }
    },
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'force',
        data: filteredNodes,
        links: filteredLinks,
        categories: graphData.value.categories,
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}',
          fontSize: 11,
          color: '#CBD5E1'
        },
        labelLayout: {
          hideOverlap: true
        },
        scaleLimit: {
          min: 0.4,
          max: 3.5
        },
        lineStyle: {
          color: 'source',
          curveness: 0.2
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 5
          }
        },
        force: {
          repulsion: 380,
          gravity: 0.12,
          edgeLength: [60, 220],
          friction: 0.6
        }
      }
    ]
  };

  graphChartInstance.setOption(option, true);
};

const renderTimelineChart = () => {
  if (!timelineChartRef.value || !timelineData.value) return;

  if (!timelineChartInstance) {
    timelineChartInstance = echarts.init(timelineChartRef.value);
  }

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: { backgroundColor: '#6a7985' }
      }
    },
    legend: {
      data: timelineData.value.topics,
      textStyle: { color: '#94A3B8' },
      top: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '5%',
      top: '18%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: timelineData.value.years,
      axisLine: { lineStyle: { color: '#475569' } },
      axisLabel: { color: '#94A3B8' }
    },
    yAxis: {
      type: 'value',
      name: 'Frekuensi Respon Suara Lapangan',
      nameTextStyle: { color: '#94A3B8' },
      splitLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#94A3B8' }
    },
    series: (timelineData.value.series || []).map((s: any, idx: number) => {
      const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#E11D48', '#84CC16'];
      const color = colors[idx % colors.length];
      return {
        ...s,
        itemStyle: { color: color },
        areaStyle: {
          opacity: 0.15,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: color },
            { offset: 1, color: 'transparent' }
          ])
        }
      };
    })
  };

  timelineChartInstance.setOption(option, true);
};

const handleResize = () => {
  if (graphChartInstance) graphChartInstance.resize();
  if (timelineChartInstance) timelineChartInstance.resize();
};

const resetGraphZoom = () => {
  if (graphChartInstance) {
    graphChartInstance.dispatchAction({
      type: 'restore'
    });
  }
};

watch(activeView, async (newVal) => {
  await nextTick();
  if (newVal === 'graph') {
    if (graphChartInstance) graphChartInstance.resize();
    else renderGraphChart();
  } else {
    if (timelineChartInstance) timelineChartInstance.resize();
    else renderTimelineChart();
  }
});

watch([selectedCategory, searchQuery, minCooccurrence], () => {
  if (activeView.value === 'graph') {
    renderGraphChart();
  }
});

onMounted(() => {
  fetchAnalyticsData();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  if (graphChartInstance) graphChartInstance.dispose();
  if (timelineChartInstance) timelineChartInstance.dispose();
});
</script>

<style scoped>
.analisis-page-wrapper {
  background-color: #0F172A;
  min-height: 100vh;
  color: #F8FAFC;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.analisis-main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
}

.kg-card {
  background-color: #0F172A;
  border: 1px solid #1E293B;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 720px;
  position: relative;
}

/* Header */
.kg-header-bar {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #1E293B;
  background-color: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(8px);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.kg-header-left {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.kg-header-icon {
  padding: 0.65rem;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: #818CF8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kg-title-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.kg-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #F8FAFC;
  margin: 0;
}

.kg-badge {
  font-size: 0.725rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
}

.kg-badge.blue {
  background: rgba(59, 130, 246, 0.12);
  color: #60A5FA;
  border: 1px solid rgba(59, 130, 246, 0.25);
}

.kg-badge.purple {
  background: rgba(168, 85, 247, 0.12);
  color: #C084FC;
  border: 1px solid rgba(168, 85, 247, 0.25);
}

.kg-subtitle {
  font-size: 0.775rem;
  color: #94A3B8;
  margin: 0.2rem 0 0 0;
}

.kg-header-right {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.view-switcher-pill {
  background: rgba(30, 41, 59, 0.9);
  padding: 0.25rem;
  border-radius: 12px;
  border: 1px solid rgba(51, 65, 85, 0.8);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.switch-btn {
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #94A3B8;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s;
}

.switch-btn:hover {
  color: #F1F5F9;
}

.switch-btn.active {
  background: #4F46E5;
  color: #FFFFFF;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.btn-icon-control {
  padding: 0.5rem;
  border-radius: 12px;
  background: #1E293B;
  color: #CBD5E1;
  border: 1px solid #334155;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-icon-control:hover {
  background: #334155;
  color: #FFFFFF;
}

/* Filter Sub-bar */
.kg-filter-bar {
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid rgba(30, 41, 59, 0.8);
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: 0.75rem;
}

.category-pills-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  overflow-x: auto;
}

.filter-label {
  color: #94A3B8;
  font-weight: 600;
  margin-right: 0.25rem;
}

.cat-pill-btn {
  padding: 0.3rem 0.65rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid #334155;
  background: rgba(30, 41, 59, 0.6);
  color: #94A3B8;
  cursor: pointer;
  transition: all 0.2s;
}

.cat-pill-btn:hover {
  color: #F1F5F9;
  border-color: #475569;
}

.cat-pill-btn.active {
  background: rgba(99, 102, 241, 0.2);
  color: #A5B4FC;
  border-color: rgba(99, 102, 241, 0.5);
}

.search-controls-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 0.6rem;
  color: #94A3B8;
  pointer-events: none;
}

.search-text-input {
  background: #1E293B;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 0.35rem 0.65rem 0.35rem 1.85rem;
  color: #E2E8F0;
  font-size: 0.75rem;
  width: 170px;
  outline: none;
}

.search-text-input:focus {
  border-color: #6366F1;
}

.threshold-wrapper {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #94A3B8;
}

.threshold-select {
  background: #1E293B;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 0.35rem 0.6rem;
  color: #E2E8F0;
  font-size: 0.75rem;
  outline: none;
}

/* Canvas Area */
.kg-canvas-container {
  flex: 1;
  min-height: 600px;
  height: 620px;
  position: relative;
  background: #0B1120;
}

.echarts-dom-container {
  width: 100%;
  height: 100%;
  min-height: 600px;
}

.timeline-padding {
  padding: 1rem;
}

.kg-loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.85);
  z-index: 20;
}

.kg-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(99, 102, 241, 0.2);
  border-top-color: #6366F1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.kg-loading-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #94A3B8;
  margin-top: 0.75rem;
}

.kg-floating-hint {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid #1E293B;
  backdrop-filter: blur(6px);
  padding: 0.5rem 0.85rem;
  border-radius: 12px;
  font-size: 0.725rem;
  color: #94A3B8;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.hint-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34D399;
}

/* Drawer */
.kg-drawer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 470px;
  background: rgba(15, 23, 42, 0.97);
  backdrop-filter: blur(12px);
  border-left: 1px solid #1E293B;
  box-shadow: -10px 0 25px -5px rgba(0, 0, 0, 0.6);
  z-index: 30;
  display: flex;
  flex-direction: column;
}

.drawer-header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #1E293B;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(30, 41, 59, 0.4);
}

.drawer-header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.drawer-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.drawer-category-title {
  font-size: 0.725rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #94A3B8;
  text-transform: uppercase;
}

.drawer-close-btn {
  background: transparent;
  border: none;
  color: #94A3B8;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}

.drawer-close-btn:hover {
  background: #334155;
  color: #FFFFFF;
}

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem;
  font-size: 0.75rem;
  color: #CBD5E1;
}

.drawer-node-name {
  font-size: 1.15rem;
  font-weight: 800;
  color: #F8FAFC;
  margin-bottom: 0.35rem;
}

.stats-pills-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.stat-pill-item {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
}

.stat-pill-item.green {
  background: rgba(16, 185, 129, 0.15);
  color: #34D399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.stat-pill-item.blue {
  background: rgba(59, 130, 246, 0.15);
  color: #60A5FA;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

/* 3 Navigation Tabs in Drawer */
.drawer-nav-tabs {
  display: flex;
  gap: 0.3rem;
  border-bottom: 1px solid #334155;
  padding-bottom: 0.4rem;
  margin-bottom: 1rem;
}

.d-tab-btn {
  flex: 1;
  padding: 0.4rem 0.2rem;
  font-size: 0.7rem;
  font-weight: 700;
  border: none;
  background: transparent;
  color: #94A3B8;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  text-align: center;
}

.d-tab-btn:hover {
  color: #F1F5F9;
  background: rgba(51, 65, 85, 0.4);
}

.d-tab-btn.active {
  background: #334155;
  color: #FFFFFF;
}

.drawer-tab-pane {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.section-lead-note {
  font-size: 0.725rem;
  color: #94A3B8;
  font-weight: 500;
}

.empty-box-note {
  padding: 1.5rem;
  text-align: center;
  color: #64748B;
  background: rgba(30, 41, 59, 0.3);
  border-radius: 8px;
}

.drawer-subtext {
  font-size: 0.75rem;
  color: #94A3B8;
  margin-bottom: 0.85rem;
}

.btn-action-primary {
  width: 100%;
  padding: 0.65rem 0.85rem;
  border-radius: 10px;
  background: linear-gradient(135deg, #4F46E5 0%, #2563EB 100%);
  color: #FFFFFF;
  font-weight: 700;
  font-size: 0.75rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  transition: all 0.2s;
}

.btn-action-primary:hover {
  background: linear-gradient(135deg, #4338CA 0%, #1D4ED8 100%);
}

.btn-action-purple {
  width: 100%;
  padding: 0.65rem 0.85rem;
  border-radius: 10px;
  background: #9333EA;
  color: #FFFFFF;
  font-weight: 700;
  font-size: 0.75rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.btn-action-purple:hover {
  background: #7E22CE;
}

.papers-list-stack {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.paper-item-card {
  padding: 0.85rem;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(51, 65, 85, 0.7);
  border-radius: 10px;
  transition: all 0.2s;
}

.paper-item-card:hover {
  background: rgba(30, 41, 59, 0.85);
  border-color: #60A5FA;
}

.paper-title-text {
  font-size: 0.775rem;
  font-weight: 700;
  color: #E2E8F0;
  line-height: 1.4;
  margin-bottom: 0.4rem;
}

.quote-header-tag {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.35rem;
}

.q-badge {
  font-size: 0.65rem;
  font-weight: 700;
  color: #FCD34D;
  background: rgba(217, 119, 6, 0.2);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.asn-id {
  font-size: 0.65rem;
  font-family: monospace;
  color: #94A3B8;
}

.quote-real-text {
  font-size: 0.8rem;
  font-style: italic;
  color: #FEF08A;
  line-height: 1.5;
  margin: 0 0 0.5rem 0;
}

.paper-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.675rem;
  color: #94A3B8;
  border-top: 1px dashed rgba(51, 65, 85, 0.6);
  padding-top: 0.35rem;
}

.instansi-text {
  color: #CBD5E1;
}

.doi-link {
  color: #818CF8;
  text-decoration: underline;
  font-family: monospace;
}

/* Gap & Novelty Box */
.gap-novelty-box {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.gap-header-badge {
  font-size: 0.7rem;
  font-weight: 700;
  color: #C084FC;
  background: rgba(168, 85, 247, 0.15);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  display: inline-block;
}

.gap-subheading {
  font-size: 0.75rem;
  font-weight: 800;
  margin-bottom: 0.3rem;
}

.text-red { color: #F87171; }
.text-green { color: #4ADE80; }

.gap-desc-text {
  font-size: 0.75rem;
  color: #E2E8F0;
  line-height: 1.5;
  margin: 0;
}

/* Triangulation Edge Box */
.triangulation-edge-box {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tri-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.tri-badge {
  font-size: 0.675rem;
  font-weight: 700;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  display: inline-block;
  width: fit-content;
}

.tri-badge.gold {
  background: rgba(245, 158, 11, 0.2);
  color: #FCD34D;
}

.tri-badge.blue {
  background: rgba(59, 130, 246, 0.2);
  color: #93C5FD;
}

.tri-badge.purple {
  background: rgba(168, 85, 247, 0.2);
  color: #D8B4FE;
}

.tri-text {
  font-size: 0.75rem;
  color: #CBD5E1;
  line-height: 1.45;
  margin: 0;
}

/* Modal */
.ai-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  padding: 1rem;
}

.ai-modal-box {
  background: #0F172A;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 1.5rem;
  max-width: 540px;
  width: 100%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  color: #E2E8F0;
}

.ai-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.ai-modal-header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 800;
  color: #818CF8;
  font-size: 0.9rem;
}

.ai-modal-close-btn {
  background: transparent;
  border: none;
  color: #94A3B8;
  font-size: 1rem;
  cursor: pointer;
}

.ai-modal-prompt-text {
  font-size: 0.85rem;
  font-weight: 700;
  color: #F8FAFC;
  margin-bottom: 0.75rem;
}

.ai-modal-body {
  padding: 1rem;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 10px;
  border: 1px solid #334155;
  font-size: 0.775rem;
  line-height: 1.6;
  color: #CBD5E1;
}

.ai-modal-footer {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.btn-modal-close {
  padding: 0.5rem 1rem;
  background: #4F46E5;
  color: #FFFFFF;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
}
</style>
