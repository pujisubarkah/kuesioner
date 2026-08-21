<template>
  <div class="app-container">
    <!-- Top Header Navigation -->
    <Navbar />

    <main id="konten-utama" class="main-content">
      <!-- Loading State -->
      <div v-if="pending" class="card" style="text-align: center; padding: 4rem 2rem;">
        <div style="display: inline-block; width: 48px; height: 48px; border: 4px solid var(--brand-lan-blue-light); border-top-color: var(--brand-lan-blue); border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 1rem;"></div>
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-text-primary);">Memuat Data Hasil Kuesioner dari Database...</h3>
        <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin-top: 0.5rem;">Connecting to PostgreSQL database...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="fetchError" class="card" style="padding: 2.5rem 2rem; border-left: 5px solid var(--color-error);">
        <div style="display: flex; align-items: center; gap: 0.75rem; color: var(--color-error); margin-bottom: 1rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <h3 style="font-size: 1.25rem; font-weight: 800;">Gagal Memuat Data Database</h3>
        </div>
        <p style="font-size: 0.95rem; color: var(--color-text-secondary); margin-bottom: 1.5rem; line-height: 1.6;">
          Terjadi kendala saat menghubungkan ke database PostgreSQL: <code>{{ fetchError }}</code>
        </p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <button class="btn btn-primary" @click="refreshData">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
            Coba Muat Ulang
          </button>
          <button class="btn btn-secondary" @click="useLocalFallback">
            Gunakan Data Simulasi / Lokal
          </button>
        </div>
      </div>

      <!-- Main Dashboard Component -->
      <div v-else>
        <AnalyticsDashboard 
          :responses="normalizedResponses"
          :is-db-connected="isDbConnected"
          :last-updated="lastUpdated"
          @refresh="refreshData"
          @seed-mock="seedMockData"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Navbar from '~/components/Navbar.vue';
import AnalyticsDashboard from '~/components/AnalyticsDashboard.vue';
import type { SurveyResponse } from '~/composables/useSurvey';
import { useSurvey } from '~/composables/useSurvey';

const { seedMockData } = useSurvey();

const pending = ref(true);
const fetchError = ref<string | null>(null);
const rawDbData = ref<any[]>([]);
const isDbConnected = ref(false);
const lastUpdated = ref<string>('');

// Normalization adapter from DB columns/JSON to standard SurveyResponse
function normalizeResponse(row: any): SurveyResponse {
  let answersObj: Record<string, any> = {};
  if (typeof row.answers === 'string') {
    try { answersObj = JSON.parse(row.answers); } catch (e) {}
  } else if (typeof row.answers === 'object' && row.answers !== null) {
    answersObj = { ...row.answers };
  }

  // Populate missing keys from DB wide-table columns if needed
  if (!answersObj.q_1_prov && row.province) answersObj.q_1_prov = row.province;
  if (!answersObj.q_1_kab && row.regency) answersObj.q_1_kab = row.regency;
  if (!answersObj.q_2 && row.areaType) answersObj.q_2 = row.areaType;
  if (!answersObj.q_3 && row.institutionType) answersObj.q_3 = row.institutionType;
  if (!answersObj.q_4 && row.ageGroup) answersObj.q_4 = row.ageGroup;
  if (!answersObj.q_5 && row.workDuration) answersObj.q_5 = row.workDuration;
  if (!answersObj.q_6 && row.hasElearning) answersObj.q_6 = row.hasElearning;
  if (!answersObj.q_7 && row.q7ElearningTypes) answersObj.q_7 = row.q7ElearningTypes;
  if (!answersObj.q_8 && row.q8Platforms) answersObj.q_8 = row.q8Platforms;
  if (!answersObj.q_9 && row.q9MainDevice) answersObj.q_9 = row.q9MainDevice;
  if (!answersObj.q_10 && row.q10Locations) answersObj.q_10 = row.q10Locations;
  if (!answersObj.q_11 && row.q11InternetSources) answersObj.q_11 = row.q11InternetSources;
  if (!answersObj.q_12 && row.q12DisruptionFrequency) answersObj.q_12 = row.q12DisruptionFrequency;
  if (!answersObj.q_13 && row.q13DisruptionTypes) answersObj.q_13 = row.q13DisruptionTypes;
  if (!answersObj.q_14 && row.q14DisruptionNarrative) answersObj.q_14 = row.q14DisruptionNarrative;
  if (!answersObj.q_15 && row.q15WorkloadOverlap) answersObj.q_15 = row.q15WorkloadOverlap;
  if (!answersObj.q_16 && row.q16InterruptedByWork) answersObj.q_16 = row.q16InterruptedByWork;
  if (!answersObj.q_17 && row.q17SufficientTime) answersObj.q_17 = row.q17SufficientTime;
  if (!answersObj.q_18 && row.q18SupervisorSupport) answersObj.q_18 = row.q18SupervisorSupport;
  if (!answersObj.q_19 && row.q19LocationMobility) answersObj.q_19 = row.q19LocationMobility;
  if (!answersObj.q_20 && row.q20EasyAccess) answersObj.q_20 = row.q20EasyAccess;
  if (!answersObj.q_21 && row.q21FileSizeIssue) answersObj.q_21 = row.q21FileSizeIssue;
  if (!answersObj.q_22 && row.q22Relevance) answersObj.q_22 = row.q22Relevance;
  if (!answersObj.q_23 && row.q23PreferredFormats) answersObj.q_23 = row.q23PreferredFormats;
  if (!answersObj.q_24 && row.q24FormatSuitability) answersObj.q_24 = row.q24FormatSuitability;
  if (!answersObj.q_25 && row.q25QnaOpportunity) answersObj.q_25 = row.q25QnaOpportunity;
  if (!answersObj.q_26 && row.q26PeerInteraction) answersObj.q_26 = row.q26PeerInteraction;
  if (!answersObj.q_27 && row.q27FocusLevel) answersObj.q_27 = row.q27FocusLevel;
  if (!answersObj.q_28 && row.q28InactivityReasons) answersObj.q_28 = row.q28InactivityReasons;
  if (!answersObj.q_29 && row.q29BiggestProblemNarrative) answersObj.q_29 = row.q29BiggestProblemNarrative;
  if (!answersObj.q_30 && row.q30ChangeNarrative) answersObj.q_30 = row.q30ChangeNarrative;
  if (!answersObj.q_31 && row.q31SpatialContextNarrative) answersObj.q_31 = row.q31SpatialContextNarrative;
  if (!answersObj.q_32 && row.q32OrganizerNarrative) answersObj.q_32 = row.q32OrganizerNarrative;

  if (!answersObj.q_33) {
    answersObj.q_33 = {
      'Menyalakan kamera': row.q33SyncCameraOn,
      'Mematikan kamera': row.q33SyncCameraOff,
      'Menggunakan smartphone': row.q33SyncMobile,
      'Mengikuti sambil melakukan pekerjaan lain': row.q33SyncMultitask,
      'Berpindah tempat selama sesi': row.q33SyncLocationChange,
      'Mengalami koneksi terputus': row.q33SyncDisconnect
    };
  }

  return {
    id: row.id || `RESP-${Date.now()}`,
    timestamp: row.createdAt || new Date().toISOString(),
    province: row.province || answersObj.q_1_prov || 'Belum diisi',
    regency: row.regency || answersObj.q_1_kab || 'Belum diisi',
    answers: answersObj
  };
}

const normalizedResponses = computed(() => {
  return rawDbData.value.map(normalizeResponse);
});

async function refreshData() {
  pending.value = true;
  fetchError.value = null;
  try {
    const res: any = await $fetch('/api/responses');
    if (res && res.success && Array.isArray(res.data)) {
      rawDbData.value = res.data;
      isDbConnected.value = true;
      lastUpdated.value = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } else {
      fetchError.value = res.error || 'Respon API tidak mengembalikan data yang valid.';
      isDbConnected.value = false;
    }
  } catch (err: any) {
    console.error('Error fetching dashboard responses:', err);
    fetchError.value = err.message || 'Gagal terhubung ke endpoint /api/responses';
    isDbConnected.value = false;
  } finally {
    pending.value = false;
  }
}

function useLocalFallback() {
  fetchError.value = null;
  pending.value = false;
  if (process.client) {
    const local = localStorage.getItem('kuesioner_asn_responses_v1');
    if (local) {
      try {
        rawDbData.value = JSON.parse(local);
      } catch (e) {
        rawDbData.value = [];
      }
    }
  }
}

onMounted(() => {
  refreshData();
});
</script>

<style scoped>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
