<template>
  <div class="ccbn-literature-container">
    <!-- Header Banner -->
    <div class="card lit-header-card">
      <div class="lit-header-flex">
        <div>
          <div class="lit-badge-row">
            <span class="badge badge-indigo">📚 Landasan Teoretis Disertasi</span>
            <span class="badge badge-purple">⚖️ Counterfactual & Equity-Aware AI</span>
            <span class="badge badge-cyan">🎯 Multi-Armed Bandit Grounding</span>
          </div>
          <h3 class="lit-main-title">
            Matriks Rujukan Literatur: Isu Keadilan, CCBN (ΔB), & Fair-LinUCB
          </h3>
          <p class="lit-sub-desc">
            Pemetaan komprehensif literatur rujukan utama dunia yang mendasari justifikasi pedagogis, formulasi matematis residual kausal, serta arsitektur intervensi adaptif dalam riset disertasi ini.
          </p>
        </div>

        <div class="lit-stat-group">
          <div class="stat-box">
            <span class="stat-num">4</span>
            <span class="stat-lbl">Pilar Teori</span>
          </div>
          <div class="stat-box">
            <span class="stat-num">7</span>
            <span class="stat-lbl">Makalah Kunci</span>
          </div>
          <div class="stat-box">
            <span class="stat-num">100%</span>
            <span class="stat-lbl">Terpetakan ke Formula</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Filter Tabs -->
    <div class="filter-tabs-wrapper">
      <button 
        class="filter-tab"
        :class="{ active: activeFilter === 'all' }"
        @click="activeFilter = 'all'"
      >
        <span class="tab-icon">🌐</span>
        <span>Semua Pilar ({{ literatureList.length }})</span>
      </button>
      <button 
        v-for="cat in categories" 
        :key="cat.id"
        class="filter-tab"
        :class="{ active: activeFilter === cat.id }"
        @click="activeFilter = cat.id"
      >
        <span class="tab-icon">{{ cat.icon }}</span>
        <span>{{ cat.title }}</span>
        <span class="tab-count">{{ getCategoryCount(cat.id) }}</span>
      </button>
    </div>

    <!-- Literature Cards Grid -->
    <div class="literature-grid">
      <div 
        v-for="item in filteredLiterature" 
        :key="item.id"
        class="card lit-card"
        :class="item.categoryClass"
      >
        <!-- Card Top Bar -->
        <div class="card-top">
          <div class="category-tag">
            <span>{{ item.categoryIcon }}</span>
            <span>{{ item.categoryName }}</span>
          </div>
          <span class="venue-tag">{{ item.venue }}</span>
        </div>

        <!-- Citation & Title -->
        <h4 class="paper-title">
          "{{ item.paperTitle }}"
        </h4>
        <div class="authors-row">
          <span class="author-name">👤 {{ item.authors }} ({{ item.year }})</span>
          <span class="source-journal">• <em>{{ item.source }}</em></span>
        </div>

        <!-- 2 Split Content Boxes: Finding vs Relevance -->
        <div class="split-boxes-grid">
          <!-- Box 1: Temuan Kunci Makalah Asli -->
          <div class="content-box finding-box">
            <div class="box-badge finding-badge">
              <span>💡 Temuan Kunci Makalah Asli</span>
            </div>
            <p class="box-text">
              {{ item.keyFindings }}
            </p>
          </div>

          <!-- Box 2: Relevansi ke Formula Disertasi -->
          <div class="content-box formula-box">
            <div class="box-badge formula-badge">
              <span>⚡ Relevansi ke Formula Disertasi</span>
            </div>
            <p class="box-text">
              {{ item.dissertationRelevance }}
            </p>
            <div class="formula-inline-tag" v-if="item.formulaSnippet">
              <code>{{ item.formulaSnippet }}</code>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="card-footer">
          <div class="code-variable-links">
            <span class="var-label">Variabel Kode Terhubung:</span>
            <span 
              v-for="v in item.codeVariables" 
              :key="v" 
              class="var-pill"
            >
              {{ v }}
            </span>
          </div>

          <button 
            class="btn-copy-cite" 
            @click="copyText(item.citationAPA, item.id)"
            :title="'Salin sitasi formal ' + item.authors"
          >
            <span v-if="copiedKey === item.id">✅ Sitasi Disalin!</span>
            <span v-else>📋 Salin Sitasi APA</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const activeFilter = ref<string>('all');
const copiedKey = ref<string | null>(null);

function copyText(text: string, key: string) {
  navigator.clipboard.writeText(text);
  copiedKey.value = key;
  setTimeout(() => {
    if (copiedKey.value === key) {
      copiedKey.value = null;
    }
  }, 2500);
}

const categories = [
  { id: 'camera', title: 'Camera-Off & Inklusivitas', icon: '📷' },
  { id: 'fairness', title: 'Algorithmic Fairness in AIED', icon: '⚖️' },
  { id: 'counterfactual', title: 'Causal & Counterfactual (CCBN)', icon: '🔬' },
  { id: 'linucb', title: 'LinUCB & Intervensi Adaptif', icon: '🎯' }
];

interface LiteratureItem {
  id: string;
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  categoryClass: string;
  authors: string;
  year: number;
  paperTitle: string;
  source: string;
  venue: string;
  citationAPA: string;
  keyFindings: string;
  dissertationRelevance: string;
  formulaSnippet: string;
  codeVariables: string[];
}

const literatureList: LiteratureItem[] = [
  {
    id: 'castelli2021',
    categoryId: 'camera',
    categoryName: 'Camera-Off & Inklusivitas Pedagogis',
    categoryIcon: '📷',
    categoryClass: 'border-blue',
    authors: 'Castelli, F. R., & Sarvary, M. A.',
    year: 2021,
    paperTitle: 'Why students do not turn on their video cameras during online classes and an equitable and inclusive approach to solve it',
    source: 'Ecology and Evolution, 11(8), 3565-3576',
    venue: 'Ecology & Evolution (Wiley)',
    citationAPA: 'Castelli, F. R., & Sarvary, M. A. (2021). Why students do not turn on their video cameras during online classes and an equitable and inclusive approach to solve it. Ecology and Evolution, 11(8), 3565–3576.',
    keyFindings: 'Studi empiris menunjukkan bahwa alasan utama peserta mematikan kamera adalah kelemahan koneksi internet, keterbatasan perangkat, serta kecemasan lingkungan (privasi/ruang fisik). Menghukum peserta karena kamera non-aktif merupakan bentuk ketidakadilan pedagogis sistemik.',
    dissertationRelevance: 'Menjadi landasan etik mengapa model disertasi menolak metrik naif kewajiban kamera aktif dan melarang penalti otomatis saat video conferencing tidak aktif pada ASN di lokasi terpencil / perangkat mobile.',
    formulaSnippet: 'Penalti Kamera-Off = 0 (Grounded in Castelli & Sarvary)',
    codeVariables: ['observedFocus', 'q47SyncCameraOffReasons', 'devicePenalty']
  },
  {
    id: 'kizilcec2022',
    categoryId: 'fairness',
    categoryName: 'Algorithmic Fairness & Subgroup Calibration',
    categoryIcon: '⚖️',
    categoryClass: 'border-purple',
    authors: 'Kizilcec, R. F., & Lee, H.',
    year: 2022,
    paperTitle: 'Algorithmic fairness in education',
    source: 'The Ethics of Artificial Intelligence in Education (Routledge), 174-202',
    venue: 'Routledge / AIED Ethics Book',
    citationAPA: 'Kizilcec, R. F., & Lee, H. (2022). Algorithmic fairness in education. In The Ethics of Artificial Intelligence in Education (pp. 174-202). Routledge.',
    keyFindings: 'Model prediktif analitik pembelajaran standar cenderung memperkuat bias historis dan merugikan kelompok marjinal / terpencil (underrepresented groups). Diperlukan kalibrasi subgrup (subgroup calibration) dan perlakuan berbasis konteks lingkungan.',
    dissertationRelevance: 'Mendasari perancangan kalibrasi ekspektasi kondisional E[B | C] yang membagi ASN ke dalam subgrup infrastruktur (3T vs Non-3T) agar tidak terjadi diskriminasi performa.',
    formulaSnippet: 'E[B | C = c_k] : Subgroup Calibration by Infrastructure Cluster',
    codeVariables: ['expectedFocus', 'spatialConstraintIndex', 'workloadLevel']
  },
  {
    id: 'baker2021',
    categoryId: 'fairness',
    categoryName: 'Algorithmic Bias in Learning Analytics',
    categoryIcon: '⚖️',
    categoryClass: 'border-purple',
    authors: 'Baker, R. S., & Hawn, A.',
    year: 2021,
    paperTitle: 'Algorithmic bias in education',
    source: 'International Journal of Artificial Intelligence in Education (IJAIED), 1-41',
    venue: 'IJAIED (Springer)',
    citationAPA: 'Baker, R. S., & Hawn, A. (2021). Algorithmic bias in education. International Journal of Artificial Intelligence in Education, 1-41.',
    keyFindings: 'Mengulas bagaimana metrik keaktifan yang naif (durasi login kaku, click-rate mentah) melahirkan diskriminasi algoritma jika tidak memperhitungkan variasi demografis, keterbatasan akses, dan friksi perangkat fisik.',
    dissertationRelevance: 'Menjadi rujukan pemisahan antara "inaktivitas karena kendala teknis" dengan "ketidakaktifan otentik", yang membimbing penentuan penalti keadilan γ dalam fungsi reward optimisasi.',
    formulaSnippet: 'FairPenalty = γ · Indicator(ΔB < θ_unfair)',
    codeVariables: ['fairnessBonus', 'liveDeltaB', 'punitivePolicyDecision']
  },
  {
    id: 'kusner2017',
    categoryId: 'counterfactual',
    categoryName: 'Causal Debiasing & Counterfactual Fairness',
    categoryIcon: '🔬',
    categoryClass: 'border-amber',
    authors: 'Kusner, M. J., Loftus, J., Russell, C., & Silva, R.',
    year: 2017,
    paperTitle: 'Counterfactual Fairness',
    source: 'Advances in Neural Information Processing Systems (NeurIPS 30)',
    venue: 'NeurIPS (Top AI Conference)',
    citationAPA: 'Kusner, M. J., Loftus, J., Russell, C., & Silva, R. (2017). Counterfactual fairness. Advances in Neural Information Processing Systems, 30.',
    keyFindings: 'Sebuah keputusan atau penilaian algoritma dianggap adil (counterfactually fair) jika nilai evaluasi peserta di dunia nyata sama dengan nilai yang ia dapatkan seandainya ia berada pada lingkungan tanpa kendala atribut sensitif (infrastruktur setara).',
    dissertationRelevance: 'Landasan matematis formal untuk rumus residual CCBN: ΔB = B_actual - E[B | C]. Mengisolasi efek kausal kendala infrastruktur C terhadap perilaku B.',
    formulaSnippet: 'ΔB = B_actual - E[B | C] (Counterfactual Residual)',
    codeVariables: ['liveDeltaB', 'observedFocus', 'expectedFocus']
  },
  {
    id: 'sharma2020',
    categoryId: 'counterfactual',
    categoryName: 'Multimodal Telemetry & Non-Invasive Traces',
    categoryIcon: '🔬',
    categoryClass: 'border-amber',
    authors: 'Sharma, K., Giannakos, M., & Dillenbourg, P.',
    year: 2020,
    paperTitle: 'Multimodal data capabilities for learning analytics: A systematic review',
    source: 'Computers & Education, 104058',
    venue: 'Computers & Education (Elsevier Q1)',
    citationAPA: 'Sharma, K., Giannakos, M., & Dillenbourg, P. (2020). Multimodal data capabilities for learning analytics: A systematic review. Computers & Education, 104058.',
    keyFindings: 'Menunjukkan pentingnya mengalihkan metrik visual ke kanal non-invasif alternatif (log chat teks, respon kuis mikro, pola interaksi fokus tab, clickstream) saat modalitas video beresolusi tinggi tidak layak diakses.',
    dissertationRelevance: 'Mendasari pilar telemetri autentik: mengukur retensi kognitif parsial (R_partial) dan rasio fokus window (τ_focus) sebagai bukti belajar tanpa membebani bandwidth jaringan.',
    formulaSnippet: 'B_tele = w_1 · τ_focus + w_2 · R_partial',
    codeVariables: ['observedRetention', 'observedFocus', 'telemetrySignals']
  },
  {
    id: 'li2010',
    categoryId: 'linucb',
    categoryName: 'Contextual Multi-Armed Bandit (LinUCB)',
    categoryIcon: '🎯',
    categoryClass: 'border-emerald',
    authors: 'Li, L., Chu, W., Langford, J., & Schapire, R. E.',
    year: 2010,
    paperTitle: 'A contextual-bandit approach to personalized recommendation',
    source: 'Proceedings of the 19th International Conference on World Wide Web (WWW), 661-670',
    venue: 'ACM WWW (Seminal LinUCB Paper)',
    citationAPA: 'Li, L., Chu, W., Langford, J., & Schapire, R. E. (2010). A contextual-bandit approach to personalized recommendation. In Proceedings of the 19th international conference on World wide web (pp. 661-670).',
    keyFindings: 'Makalah seminal LinUCB. Menunjukkan bagaimana algoritma secara dinamis memilih aksi rekomendasi intervensi terbaik berdasarkan vektor fitur konteks pengguna (x_t) dengan menyeimbangkan eksplorasi ketidakpastian dan eksploitasi.',
    dissertationRelevance: 'Menjadi mesin algoritma utama untuk mengestimasi pay-off tiap modalitas konten berdasarkan vektor konteks kendala ASN (bandwidth, beban pelayanan dinas, dan form factor perangkat).',
    formulaSnippet: 'A* = argmax_a [ x_t^T θ_a + α √(x_t^T A_a^-1 x_t) ]',
    codeVariables: ['selectedAction', 'liveRewardScore', 'bandwidthKbps', 'workloadLevel']
  },
  {
    id: 'clement2015',
    categoryId: 'linucb',
    categoryName: 'Bandits for Intelligent Tutoring Systems',
    categoryIcon: '🎯',
    categoryClass: 'border-emerald',
    authors: 'Clement, B., Roy, D., Oudeyer, P. Y., & Lopes, M.',
    year: 2015,
    paperTitle: 'Multi-Armed Bandits for Intelligent Tutoring Systems',
    source: 'Journal of Educational Data Mining (JEDM), 7(2), 20-48',
    venue: 'JEDM (Educational Data Mining)',
    citationAPA: 'Clement, B., Roy, D., Oudeyer, P. Y., & Lopes, M. (2015). Multi-Armed Bandits for Intelligent Tutoring Systems. Journal of Educational Data Mining, 7(2), 20-48.',
    keyFindings: 'Penerapan Contextual Multi-Armed Bandits pada sistem pembelajaran cerdas (ITS) untuk mengalokasikan tipe aktivitas pedagogis (teks vs audio vs studi kasus interaktif) sesuai laju kemajuan dan keterbatasan peserta secara adaptif.',
    dissertationRelevance: 'Mendasari analogi "YouTube Adaptive Bitrate" pada modul pelatihan ASN: menurunkan beban modalitas saat terjadi friksi pelayanan dan latensi, lalu menaikkan resolusi kognitif saat kapasitas pulih.',
    formulaSnippet: 'Reward r_t = ΔComp - λ_1·WorkloadCost - λ_2·InfraCost + FairBonus',
    codeVariables: ['selectedAction', 'liveRewardScore', 'punitivePolicyDecision', 'staticRuleDecision']
  }
];

const filteredLiterature = computed(() => {
  if (activeFilter.value === 'all') return literatureList;
  return literatureList.filter(item => item.categoryId === activeFilter.value);
});

function getCategoryCount(catId: string): number {
  return literatureList.filter(item => item.categoryId === catId).length;
}
</script>

<style scoped>
.ccbn-literature-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.lit-header-card {
  padding: 1.5rem 1.75rem;
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  color: #FFFFFF;
  border: none;
  border-radius: var(--radius-lg, 12px);
}

.lit-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.lit-badge-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.badge {
  font-size: 0.725rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
}

.badge-indigo {
  background: rgba(99, 102, 241, 0.25);
  color: #A5B4FC;
  border: 1px solid rgba(165, 180, 252, 0.3);
}

.badge-purple {
  background: rgba(168, 85, 247, 0.25);
  color: #C084FC;
  border: 1px solid rgba(192, 132, 252, 0.3);
}

.badge-cyan {
  background: rgba(6, 182, 212, 0.25);
  color: #67E8F9;
  border: 1px solid rgba(103, 232, 249, 0.3);
}

.lit-main-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #F8FAFC;
  margin: 0 0 0.4rem 0;
  letter-spacing: -0.02em;
}

.lit-sub-desc {
  font-size: 0.875rem;
  color: #94A3B8;
  margin: 0;
  max-width: 800px;
  line-height: 1.5;
}

.lit-stat-group {
  display: flex;
  gap: 0.75rem;
}

.stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0.85rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.stat-num {
  font-size: 1.25rem;
  font-weight: 800;
  color: #60A5FA;
}

.stat-lbl {
  font-size: 0.675rem;
  color: #94A3B8;
  font-weight: 600;
  text-transform: uppercase;
}

/* Filter Tabs */
.filter-tabs-wrapper {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.35rem;
  scrollbar-width: thin;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-md, 8px);
  border: 1px solid var(--color-stroke-secondary, #CBD5E1);
  background: #FFFFFF;
  color: #475569;
  font-size: 0.825rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.filter-tab:hover {
  background: #F8FAFC;
  border-color: #94A3B8;
}

.filter-tab.active {
  background: #0F172A;
  color: #FFFFFF;
  border-color: #0F172A;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.15);
}

.tab-count {
  background: rgba(0, 0, 0, 0.08);
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  font-size: 0.7rem;
}

.filter-tab.active .tab-count {
  background: rgba(255, 255, 255, 0.2);
  color: #FFFFFF;
}

/* Literature Cards */
.literature-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.lit-card {
  padding: 1.35rem 1.5rem;
  background: #FFFFFF;
  border-radius: var(--radius-lg, 12px);
  border: 1px solid #E2E8F0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.lit-card.border-blue { border-left: 5px solid #3B82F6; }
.lit-card.border-purple { border-left: 5px solid #8B5CF6; }
.lit-card.border-amber { border-left: 5px solid #F59E0B; }
.lit-card.border-emerald { border-left: 5px solid #10B981; }

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.65rem;
}

.category-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 800;
  color: #1E293B;
  background: #F1F5F9;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
}

.venue-tag {
  font-size: 0.725rem;
  font-weight: 700;
  color: #64748B;
  background: #F8FAFC;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  border: 1px solid #E2E8F0;
}

.paper-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 0.35rem 0;
  line-height: 1.4;
}

.authors-row {
  font-size: 0.8rem;
  color: #64748B;
  margin-bottom: 1rem;
}

.author-name {
  font-weight: 700;
  color: #334155;
}

.split-boxes-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 860px) {
  .split-boxes-grid {
    grid-template-columns: 1fr;
  }
}

.content-box {
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.finding-box {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
}

.formula-box {
  background: #FEFCE8;
  border: 1px solid #FEF08A;
}

.box-badge {
  font-size: 0.725rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.45rem;
}

.finding-badge { color: #1E293B; }
.formula-badge { color: #854D0E; }

.box-text {
  font-size: 0.85rem;
  color: #334155;
  line-height: 1.55;
  margin: 0;
}

.formula-inline-tag {
  margin-top: 0.6rem;
  background: #FFFFFF;
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  border: 1px solid #FDE047;
  font-family: monospace;
  font-size: 0.775rem;
  font-weight: 700;
  color: #A16207;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #F1F5F9;
}

.code-variable-links {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.var-label {
  font-size: 0.725rem;
  font-weight: 700;
  color: #64748B;
}

.var-pill {
  font-family: monospace;
  font-size: 0.7rem;
  font-weight: 700;
  color: #2563EB;
  background: #EFF6FF;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  border: 1px solid #DBEAFE;
}

.btn-copy-cite {
  background: #F1F5F9;
  border: 1px solid #CBD5E1;
  color: #334155;
  border-radius: 6px;
  padding: 0.35rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-copy-cite:hover {
  background: #E2E8F0;
  color: #0F172A;
}
</style>
