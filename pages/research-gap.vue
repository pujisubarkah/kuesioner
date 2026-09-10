<template>
  <div class="app-container">
    <!-- Navbar Header -->
    <Navbar />

    <main id="konten-utama" class="main-content">
      <!-- Top Title & Stats Banner -->
      <div class="card header-card" style="margin-bottom: 1.5rem; padding: 1.75rem 2rem; background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); color: #FFFFFF; border: none;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.25rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
              <span class="badge" style="background: rgba(147, 51, 234, 0.25); color: #C084FC; border: 1px solid rgba(192, 132, 252, 0.3);">
                🔬 Pemetaan Celah Riset Komputasional
              </span>
              <span class="badge" style="background: rgba(34, 197, 94, 0.25); color: #4ADE80; border: 1px solid rgba(74, 222, 128, 0.3);">
                🎯 Kontribusi: CCBN Normalization & Fair-LinUCB Adaptive Engine
              </span>
            </div>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: #F8FAFC; margin-bottom: 0.35rem; letter-spacing: -0.02em;">
              Celah Penelitian Algoritma Pembelajaran Adaptif Berkeadilan (Fairness-Aware)
            </h2>
            <p style="font-size: 0.9rem; color: #94A3B8; margin: 0; max-width: 850px; line-height: 1.5;">
              Pemetaan 271 celah riset yang diselaraskan dengan 3 pilar komputasi: <strong>(1) Sumber Bukti Otentik & Retensi Parsial</strong>, <strong>(2) Definisi Contextual Fairness & Residual \(\Delta B\)</strong>, dan <strong>(3) Optimisasi Dynamic Reward Multi-Armed Bandit</strong>.
            </p>
          </div>

          <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
            <div class="stat-pill">
              <span style="font-size: 1.25rem; font-weight: 800; color: #60A5FA;">{{ filteredGaps.length }}</span>
              <span style="font-size: 0.725rem; color: #94A3B8; font-weight: 600; text-transform: uppercase;">Gap Relevan</span>
            </div>
            <div class="stat-pill">
              <span style="font-size: 1.25rem; font-weight: 800; color: #C084FC;">5</span>
              <span style="font-size: 0.725rem; color: #94A3B8; font-weight: 600; text-transform: uppercase;">Pilar Riset</span>
            </div>
            <div class="stat-pill">
              <span style="font-size: 1.25rem; font-weight: 800; color: #F87171;">{{ highPriorityCount }}</span>
              <span style="font-size: 0.725rem; color: #94A3B8; font-weight: 600; text-transform: uppercase;">High Priority</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 5 PILLARS NAVIGATION BAR -->
      <div class="card" style="margin-bottom: 1.25rem; padding: 1rem 1.25rem; background: #FFFFFF;">
        <div style="font-size: 0.8rem; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.75rem;">
          📌 Filter 5 Pilar Utama Penelitian Anda:
        </div>
        <div class="pillar-buttons">
          <button 
            :class="['pillar-btn', activePillar === 'ALL' ? 'active' : '']"
            @click="activePillar = 'ALL'"
          >
            🌐 Semua Pilar ({{ relevantCoreGapsCount }})
          </button>
          <button 
            :class="['pillar-btn', activePillar === 'BEHAVIORAL' ? 'active' : '']"
            @click="activePillar = 'BEHAVIORAL'"
          >
            🧠 Behavioral Learning ({{ pillarCounts.BEHAVIORAL }})
          </button>
          <button 
            :class="['pillar-btn', activePillar === 'SERVICE_DYNAMICS' ? 'active' : '']"
            @click="activePillar = 'SERVICE_DYNAMICS'"
          >
            💼 Service Dynamics ({{ pillarCounts.SERVICE_DYNAMICS }})
          </button>
          <button 
            :class="['pillar-btn', activePillar === 'MULTIMODAL' ? 'active' : '']"
            @click="activePillar = 'MULTIMODAL'"
          >
            📸 Multimodal Fusion ({{ pillarCounts.MULTIMODAL }})
          </button>
          <button 
            :class="['pillar-btn', activePillar === 'PERSONALIZATION' ? 'active' : '']"
            @click="activePillar = 'PERSONALIZATION'"
          >
            🎯 Personalisasi Pelatihan ({{ pillarCounts.PERSONALIZATION }})
          </button>
          <button 
            :class="['pillar-btn', activePillar === 'SPATIAL' ? 'active' : '']"
            @click="activePillar = 'SPATIAL'"
          >
            🗺️ Konteks Spasial ({{ pillarCounts.SPATIAL }})
          </button>
        </div>
      </div>

      <!-- Filter & Controls Bar -->
      <div class="card" style="margin-bottom: 1.5rem; padding: 1.1rem 1.25rem;">
        <div style="display: flex; gap: 1rem; align-items: center; justify-content: space-between; flex-wrap: wrap;">
          <!-- Search Input -->
          <div style="flex: 1; min-width: 250px; position: relative;">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari permasalahan, kata kunci, paper..."
              class="form-input"
              style="padding-left: 2.5rem; width: 100%;"
            />
            <svg style="position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); color: #94A3B8;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>

          <!-- Filters & Controls -->
          <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
            <!-- Filter Relevansi E-Learning -->
            <label class="toggle-switch-label" title="Saring hanya paper yang relevan dengan pembelajaran online ASN">
              <input type="checkbox" v-model="onlyCoreElearning" />
              <span class="switch-slider"></span>
              <span style="font-size: 0.825rem; font-weight: 600; color: #334155;">Fokus E-Learning ASN</span>
            </label>

            <select v-model="filterPriority" class="form-input" style="min-width: 130px;">
              <option value="">Semua Prioritas</option>
              <option value="HIGH">HIGH Priority</option>
              <option value="MEDIUM">MEDIUM Priority</option>
              <option value="LOW">LOW Priority</option>
            </select>

            <!-- View Switcher Toggle -->
            <div class="view-toggle-group">
              <button 
                :class="['toggle-btn', viewMode === 'table' ? 'active' : '']"
                @click="viewMode = 'table'"
                title="Tampilan Tabel Data"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
                Tabel
              </button>
              <button 
                :class="['toggle-btn', viewMode === 'cards' ? 'active' : '']"
                @click="viewMode = 'cards'"
                title="Tampilan Kartu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                Kartu
              </button>
            </div>

            <button 
              @click="refreshData" 
              class="btn-refresh" 
              :disabled="pending"
              title="Refresh Data"
            >
              <svg :class="{ 'spin-icon': pending }" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6"/><path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" style="padding: 3rem 1rem; text-align: center;">
        <div style="display: inline-block; width: 36px; height: 36px; border: 3px solid rgba(59, 130, 246, 0.3); border-radius: 50%; border-top-color: #3B82F6; animation: spin 0.8s linear infinite;"></div>
        <p style="margin-top: 1rem; color: #64748B; font-weight: 500;">Memuat data research gap dari database PostgreSQL...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="errorMessage" class="card" style="padding: 2rem; text-align: center; border-left: 4px solid #EF4444;">
        <p style="color: #EF4444; font-weight: 600; margin-bottom: 0.5rem;">Gagal Memuat Data</p>
        <p style="color: #64748B; font-size: 0.9rem;">{{ errorMessage }}</p>
        <button @click="refreshData" class="btn-refresh" style="margin-top: 1rem;">Coba Lagi</button>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredGaps.length === 0" class="card" style="padding: 3rem 1rem; text-align: center;">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
        <h3 style="font-size: 1.1rem; font-weight: 700; color: #1E293B; margin-bottom: 0.25rem;">Tidak Ada Research Gap Ditemukan</h3>
        <p style="color: #64748B; font-size: 0.9rem; margin: 0;">Tidak ada data yang sesuai dengan pilar atau kriteria pencarian Anda.</p>
        <button v-if="onlyCoreElearning" @click="onlyCoreElearning = false" class="btn-primary" style="margin-top: 1rem; padding: 0.4rem 1rem;">
          Tampilkan Semua (Termasuk Non E-Learning)
        </button>
      </div>

      <!-- Content Area -->
      <div v-else>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; font-size: 0.85rem; color: #64748B; padding: 0 0.25rem;">
          <span>Menampilkan <strong>{{ paginatedGaps.length }}</strong> dari <strong>{{ filteredGaps.length }}</strong> research gap</span>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <span>Per Halaman:</span>
            <select v-model.number="pageSize" class="form-input" style="padding: 0.2rem 0.5rem; font-size: 0.8rem;">
              <option :value="15">15</option>
              <option :value="30">30</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
          </div>
        </div>

        <!-- 1. TABLE VIEW -->
        <div v-if="viewMode === 'table'" class="card table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 50px; text-align: center;">ID</th>
                <th style="width: 170px;">Pilar Penelitian</th>
                <th>Permasalahan Utama (Problem Statement)</th>
                <th style="width: 220px;">Paper Sumber</th>
                <th style="width: 100px; text-align: center;">Prioritas</th>
                <th style="width: 90px; text-align: center;">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="gap in paginatedGaps" 
                :key="gap.id" 
                class="table-row"
                @click="openDetail(gap)"
              >
                <td style="text-align: center; font-weight: 700; color: #64748B;">#{{ gap.id }}</td>
                <td>
                  <span :class="['pillar-chip', getPillarBadge(gap).class]">
                    {{ getPillarBadge(gap).icon }} {{ getPillarBadge(gap).label }}
                  </span>
                  <div style="font-size: 0.725rem; color: #94A3B8; margin-top: 0.25rem;">
                    {{ gap.gapType || 'Research Gap' }}
                  </div>
                </td>
                <td>
                  <div class="problem-text-clamp">
                    {{ gap.problemStatement || gap.topic }}
                  </div>
                </td>
                <td>
                  <div v-if="gap.sourcePaperTitle" class="paper-title-clamp" :title="gap.sourcePaperTitle">
                    📄 {{ gap.sourcePaperTitle }}
                  </div>
                  <span v-else style="color: #CBD5E1;">-</span>
                </td>
                <td style="text-align: center;">
                  <span :class="['priority-badge', getPriorityClass(gap.priority)]">
                    {{ gap.priority || 'NORMAL' }}
                  </span>
                </td>
                <td style="text-align: center;">
                  <button class="btn-detail-sm">
                    Detail
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 2. CARDS VIEW -->
        <div v-else class="gap-grid">
          <div 
            v-for="gap in paginatedGaps" 
            :key="gap.id" 
            class="card gap-card"
            @click="openDetail(gap)"
          >
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.75rem;">
              <span :class="['pillar-chip', getPillarBadge(gap).class]">
                {{ getPillarBadge(gap).icon }} {{ getPillarBadge(gap).label }}
              </span>
              <span :class="['priority-badge', getPriorityClass(gap.priority)]">
                {{ gap.priority || 'NORMAL' }}
              </span>
            </div>

            <h3 class="gap-title">
              {{ gap.problemStatement || gap.topic }}
            </h3>

            <p v-if="gap.sourcePaperTitle" class="source-paper-info">
              📄 <strong>Paper:</strong> {{ gap.sourcePaperTitle }}
            </p>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid #F1F5F9; font-size: 0.8rem; color: #94A3B8;">
              <span>ID #{{ gap.id }} • {{ gap.gapType || 'Gap' }}</span>
              <span class="link-detail">Detail Rincian →</span>
            </div>
          </div>
        </div>

        <!-- Pagination Bar -->
        <div v-if="totalPages > 1" class="pagination-bar">
          <button 
            class="btn-page" 
            :disabled="currentPage === 1" 
            @click="currentPage--"
          >
            ‹ Sebelumnya
          </button>
          
          <span style="font-size: 0.85rem; font-weight: 600; color: #475569;">
            Halaman {{ currentPage }} dari {{ totalPages }}
          </span>

          <button 
            class="btn-page" 
            :disabled="currentPage === totalPages" 
            @click="currentPage++"
          >
            Selanjutnya ›
          </button>
        </div>
      </div>
    </main>

    <!-- Modal Detail Research Gap -->
    <div v-if="selectedGap" class="modal-overlay" @click.self="closeDetail">
      <div class="modal-card">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 1.25rem;">
          <div>
            <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.5rem;">
              <span :class="['pillar-chip', getPillarBadge(selectedGap).class]">
                {{ getPillarBadge(selectedGap).icon }} {{ getPillarBadge(selectedGap).label }}
              </span>
              <span :class="['priority-badge', getPriorityClass(selectedGap.priority)]">
                {{ selectedGap.priority || 'NORMAL' }} Priority
              </span>
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 700; color: #0F172A; margin: 0; line-height: 1.4;">
              Detail Research Gap #{{ selectedGap.id }}
            </h3>
          </div>
          <button @click="closeDetail" class="btn-close">&times;</button>
        </div>

        <!-- Content Details -->
        <div class="detail-body">
          <div v-if="selectedGap.topic" class="detail-section">
            <label class="detail-label">Topik Kategori Database</label>
            <div class="detail-text" style="font-weight: 600; color: #475569;">{{ selectedGap.topic }}</div>
          </div>

          <div v-if="selectedGap.gapType" class="detail-section">
            <label class="detail-label">Jenis Gap (Gap Type)</label>
            <div class="detail-text">{{ selectedGap.gapType }}</div>
          </div>

          <div v-if="selectedGap.problemStatement" class="detail-section">
            <label class="detail-label">Permasalahan Utama (Problem Statement)</label>
            <div class="detail-text highlight-box">{{ selectedGap.problemStatement }}</div>
          </div>

          <div v-if="selectedGap.sourcePaperTitle" class="detail-section">
            <label class="detail-label">Sumber Paper (Source Paper)</label>
            <div class="detail-text">
              {{ selectedGap.sourcePaperTitle }}
              <div v-if="selectedGap.sourcePaperUrl" style="margin-top: 0.5rem;">
                <a :href="selectedGap.sourcePaperUrl" target="_blank" class="paper-url-btn">
                  🔗 Buka Link / File Paper
                </a>
              </div>
            </div>
          </div>

          <div v-if="selectedGap.currentState" class="detail-section">
            <label class="detail-label">Kondisi Saat Ini (Current State)</label>
            <div class="detail-text">{{ selectedGap.currentState }}</div>
          </div>

          <div v-if="selectedGap.futureOpportunity" class="detail-section">
            <label class="detail-label">Peluang Penelitian Masa Depan (Future Opportunity)</label>
            <div class="detail-text future-box">{{ selectedGap.futureOpportunity }}</div>
          </div>
        </div>

        <!-- Footer -->
        <div style="display: flex; justify-content: flex-end; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #E2E8F0;">
          <button @click="closeDetail" class="btn-primary" style="padding: 0.5rem 1.25rem;">Tutup</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

interface ResearchGapItem {
  id: number;
  topic: string | null;
  sourcePaperTitle: string | null;
  sourcePaperUrl: string | null;
  gapType: string | null;
  problemStatement: string | null;
  currentState: string | null;
  futureOpportunity: string | null;
  priority: string | null;
  isSolved: boolean;
  createdAt: string;
}

type PillarKey = 'ALL' | 'BEHAVIORAL' | 'SERVICE_DYNAMICS' | 'MULTIMODAL' | 'PERSONALIZATION' | 'SPATIAL';

const gaps = ref<ResearchGapItem[]>([]);
const pending = ref(true);
const errorMessage = ref('');

// Active Pillar & Filter States
const activePillar = ref<PillarKey>('ALL');
const onlyCoreElearning = ref(true); // Filter out general non-elearning papers by default
const searchQuery = ref('');
const filterPriority = ref('');
const viewMode = ref<'table' | 'cards'>('table');
const selectedGap = ref<ResearchGapItem | null>(null);

// Pagination
const currentPage = ref(1);
const pageSize = ref(15);

const fetchGaps = async () => {
  pending.value = true;
  errorMessage.value = '';
  try {
    const res = await $fetch<{ success: boolean; data?: ResearchGapItem[]; error?: string }>('/api/research-gap');
    if (res.success && Array.isArray(res.data)) {
      gaps.value = res.data;
    } else {
      errorMessage.value = res.error || 'Gagal memuat data research gap.';
    }
  } catch (err: any) {
    errorMessage.value = err.message || 'Terjadi kesalahan saat menghubungi API.';
  } finally {
    pending.value = false;
  }
};

const refreshData = () => {
  fetchGaps();
};

onMounted(() => {
  fetchGaps();
});

// Classification Helper: Maps gap item to one of 5 Pillars
const getPillarKey = (item: ResearchGapItem): 'BEHAVIORAL' | 'SERVICE_DYNAMICS' | 'MULTIMODAL' | 'PERSONALIZATION' | 'SPATIAL' => {
  const t = (item.topic || '').toLowerCase();
  const ps = (item.problemStatement || '').toLowerCase();
  const st = (item.sourcePaperTitle || '').toLowerCase();
  const text = `${t} ${ps} ${st}`;

  if (t.includes('adaptive') || t.includes('rekomendasi') || text.includes('personalisasi') || text.includes('adaptif')) {
    return 'PERSONALIZATION';
  }
  if (t.includes('multimodal') || t.includes('computer vision') || t.includes('analytic') || text.includes('multimodal') || text.includes('log aktivitas')) {
    return 'MULTIMODAL';
  }
  if (t.includes('pelatihan asn') || t.includes('dinamika') || text.includes('beban kerja') || text.includes('interruption') || text.includes('tugas kantor') || text.includes('pelayanan')) {
    return 'SERVICE_DYNAMICS';
  }
  if (t.includes('spasial') || t.includes('infrastruktur') || text.includes('geografis') || text.includes('3t') || text.includes('daerah') || text.includes('wfh')) {
    return 'SPATIAL';
  }
  return 'BEHAVIORAL';
};

const getPillarBadge = (item: ResearchGapItem) => {
  const p = getPillarKey(item);
  switch (p) {
    case 'BEHAVIORAL':
      return { icon: '🧠', label: 'Behavioral Learning', class: 'chip-behavioral' };
    case 'SERVICE_DYNAMICS':
      return { icon: '💼', label: 'Service Dynamics', class: 'chip-service' };
    case 'MULTIMODAL':
      return { icon: '📸', label: 'Multimodal Fusion', class: 'chip-multimodal' };
    case 'PERSONALIZATION':
      return { icon: '🎯', label: 'Personalisasi', class: 'chip-personalization' };
    case 'SPATIAL':
      return { icon: '🗺️', label: 'Konteks Spasial', class: 'chip-spatial' };
  }
};

// Exclude irrelevant general papers (e.g. general merit recruitment, primary school, quota subsidy policy) if onlyCoreElearning is true
const isRelevantElearning = (item: ResearchGapItem): boolean => {
  if (!onlyCoreElearning.value) return true;
  const ps = (item.problemStatement || '').toLowerCase();
  const st = (item.sourcePaperTitle || '').toLowerCase();
  
  // Filter out non-elearning merit recruitment or general non-ASN elementary school papers
  if (st.includes('rekrutmen') || ps.includes('rekrutmen dan promosi') || st.includes('elementary school')) {
    return false;
  }
  return true;
};

// Counts for each pillar
const pillarCounts = computed(() => {
  const counts = {
    BEHAVIORAL: 0,
    SERVICE_DYNAMICS: 0,
    MULTIMODAL: 0,
    PERSONALIZATION: 0,
    SPATIAL: 0
  };
  gaps.value.forEach(item => {
    if (isRelevantElearning(item)) {
      const p = getPillarKey(item);
      counts[p]++;
    }
  });
  return counts;
});

const relevantCoreGapsCount = computed(() => {
  return gaps.value.filter(isRelevantElearning).length;
});

const highPriorityCount = computed(() => {
  return filteredGaps.value.filter(g => (g.priority || '').toUpperCase() === 'HIGH').length;
});

const filteredGaps = computed(() => {
  return gaps.value.filter(item => {
    // Relevance check
    if (!isRelevantElearning(item)) return false;

    // Pillar filter
    if (activePillar.value !== 'ALL') {
      if (getPillarKey(item) !== activePillar.value) return false;
    }

    // Search query matching
    const q = searchQuery.value.toLowerCase().trim();
    if (q) {
      const matchTopic = (item.topic || '').toLowerCase().includes(q);
      const matchTitle = (item.sourcePaperTitle || '').toLowerCase().includes(q);
      const matchProb = (item.problemStatement || '').toLowerCase().includes(q);
      const matchGapType = (item.gapType || '').toLowerCase().includes(q);
      if (!matchTopic && !matchTitle && !matchProb && !matchGapType) return false;
    }

    // Priority filter
    if (filterPriority.value) {
      if ((item.priority || '').toUpperCase() !== filterPriority.value.toUpperCase()) return false;
    }

    return true;
  });
});

// Reset page to 1 on filter changes
watch([searchQuery, activePillar, onlyCoreElearning, filterPriority, pageSize], () => {
  currentPage.value = 1;
});

const totalPages = computed(() => Math.ceil(filteredGaps.value.length / pageSize.value) || 1);

const paginatedGaps = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredGaps.value.slice(start, start + pageSize.value);
});

const openDetail = async (gap: ResearchGapItem) => {
  try {
    const res = await $fetch<{ success: boolean; data?: ResearchGapItem }>(`/api/research-gap/${gap.id}`);
    if (res.success && res.data) {
      selectedGap.value = res.data;
    } else {
      selectedGap.value = gap;
    }
  } catch {
    selectedGap.value = gap;
  }
};

const closeDetail = () => {
  selectedGap.value = null;
};

const getPriorityClass = (priority: string | null) => {
  const p = (priority || '').toUpperCase();
  if (p === 'HIGH') return 'priority-high';
  if (p === 'MEDIUM') return 'priority-medium';
  if (p === 'LOW') return 'priority-low';
  return 'priority-default';
};
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #F8FAFC;
}

.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem 1rem 4rem 1rem;
}

.card {
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.stat-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  min-width: 90px;
}

/* Pillar Buttons */
.pillar-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.pillar-btn {
  padding: 0.5rem 0.85rem;
  font-size: 0.825rem;
  font-weight: 600;
  color: #475569;
  background: #F1F5F9;
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pillar-btn:hover {
  background: #E2E8F0;
  color: #0F172A;
}

.pillar-btn.active {
  background: #1E293B;
  color: #FFFFFF;
  border-color: #1E293B;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-input {
  padding: 0.55rem 0.85rem;
  border-radius: 8px;
  border: 1px solid #CBD5E1;
  font-size: 0.85rem;
  color: #1E293B;
  outline: none;
  background: #FFFFFF;
  transition: all 0.2s ease;
}

.form-input:focus {
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

/* Toggle Switch */
.toggle-switch-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.toggle-switch-label input {
  display: none;
}

.switch-slider {
  width: 36px;
  height: 20px;
  background-color: #CBD5E1;
  border-radius: 20px;
  position: relative;
  transition: background-color 0.2s;
}

.switch-slider::before {
  content: "";
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: white;
  top: 3px;
  left: 3px;
  transition: transform 0.2s;
}

.toggle-switch-label input:checked + .switch-slider {
  background-color: #2563EB;
}

.toggle-switch-label input:checked + .switch-slider::before {
  transform: translateX(16px);
}

.view-toggle-group {
  display: flex;
  background: #F1F5F9;
  padding: 3px;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
}

.toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  border: none;
  background: transparent;
  color: #64748B;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-btn.active {
  background: #FFFFFF;
  color: #1E293B;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.btn-refresh {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem;
  background: #F1F5F9;
  color: #334155;
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-refresh:hover {
  background: #E2E8F0;
}

/* Pillar Chips */
.pillar-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.55rem;
  font-size: 0.725rem;
  font-weight: 700;
  border-radius: 6px;
}

.chip-behavioral { background: #EFF6FF; color: #1D4ED8; border: 1px solid #BFDBFE; }
.chip-service { background: #FEF3C7; color: #B45309; border: 1px solid #FDE68A; }
.chip-multimodal { background: #F3E8FF; color: #7E22CE; border: 1px solid #E9D5FF; }
.chip-personalization { background: #ECFDF5; color: #047857; border: 1px solid #A7F3D0; }
.chip-spatial { background: #FEE2E2; color: #B91C1C; border: 1px solid #FCA5A5; }

/* Data Table Styling */
.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.875rem;
}

.data-table th {
  background: #F8FAFC;
  color: #475569;
  font-weight: 700;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #E2E8F0;
  font-size: 0.775rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.table-row {
  border-bottom: 1px solid #F1F5F9;
  transition: background 0.15s ease;
  cursor: pointer;
}

.table-row:hover {
  background: #F8FAFC;
}

.table-row td {
  padding: 0.85rem 1rem;
  vertical-align: middle;
  color: #334155;
}

.problem-text-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.45;
  font-size: 0.875rem;
  color: #1E293B;
}

.paper-title-clamp {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 210px;
  font-size: 0.825rem;
  color: #475569;
}

.priority-badge {
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  border-radius: 4px;
  text-transform: uppercase;
}

.priority-high { background: #FEE2E2; color: #991B1B; }
.priority-medium { background: #FEF3C7; color: #92400E; }
.priority-low { background: #E0E7FF; color: #3730A3; }
.priority-default { background: #F1F5F9; color: #475569; }

.btn-detail-sm {
  padding: 0.3rem 0.65rem;
  font-size: 0.775rem;
  font-weight: 600;
  color: #2563EB;
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-detail-sm:hover {
  background: #2563EB;
  color: #FFFFFF;
}

/* Cards View */
.gap-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.25rem;
}

.gap-card {
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.gap-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  border-color: #93C5FD;
}

.gap-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 0.5rem;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.source-paper-info {
  font-size: 0.825rem;
  color: #64748B;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.link-detail {
  font-weight: 600;
  color: #2563EB;
}

/* Pagination Bar */
.pagination-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding: 0.75rem 1rem;
  background: #FFFFFF;
  border-radius: 10px;
  border: 1px solid #E2E8F0;
}

.btn-page {
  padding: 0.45rem 0.9rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #334155;
  background: #F8FAFC;
  border: 1px solid #CBD5E1;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-page:hover:not(:disabled) {
  background: #E2E8F0;
}

.btn-page:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Modal Styling */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-card {
  background: #FFFFFF;
  border-radius: 16px;
  max-width: 680px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  padding: 1.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #94A3B8;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.btn-close:hover {
  color: #1E293B;
}

.detail-body {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.detail-label {
  font-size: 0.775rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #64748B;
}

.detail-text {
  font-size: 0.95rem;
  color: #1E293B;
  line-height: 1.55;
}

.highlight-box {
  background: #F8FAFC;
  border-left: 4px solid #3B82F6;
  padding: 0.85rem 1rem;
  border-radius: 0 8px 8px 0;
  font-weight: 500;
}

.future-box {
  background: #FAF5FF;
  border-left: 4px solid #A855F7;
  padding: 0.85rem 1rem;
  border-radius: 0 8px 8px 0;
}

.paper-url-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.825rem;
  font-weight: 600;
  color: #2563EB;
  text-decoration: none;
  word-break: break-all;
}

.paper-url-btn:hover {
  text-decoration: underline;
}

.btn-primary {
  background: #2563EB;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
}

.btn-primary:hover {
  background: #1D4ED8;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spin-icon {
  animation: spin 0.8s linear infinite;
}
</style>
