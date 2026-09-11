<template>
  <div class="app-container">
    <!-- Top Header Navigation -->
    <Navbar />

    <main id="konten-utama" class="main-content">
      <!-- Loading State -->
      <div v-if="pending" class="card" style="text-align: center; padding: 3.5rem 2rem;">
        <div style="display: inline-block; width: 44px; height: 44px; border: 4px solid rgba(59, 130, 246, 0.2); border-top-color: #2563EB; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 1rem;"></div>
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text-primary);">Menghubungkan Model Disertasi ke Database...</h3>
        <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-top: 0.35rem;">Sinkronisasi skor diagnostik empiris dari data ASN aktif...</p>
      </div>

      <!-- Main Model Content -->
      <div v-else style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- Top Status & View Switcher Bar -->
        <div class="card" style="padding: 1rem 1.5rem; background: var(--color-surface-card); border: 1px solid var(--color-stroke-secondary); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <!-- Left: View Mode Pills -->
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <button 
              @click="activeModelView = 'theory-structural'"
              :class="['view-mode-btn', activeModelView === 'theory-structural' ? 'active' : '']"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              Arsitektur Komputasional & CCBN
            </button>
            <button 
              @click="activeModelView = 'dataset-framework'"
              :class="['view-mode-btn', activeModelView === 'dataset-framework' ? 'active' : '']"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              Sumber Bukti & Dataset Telemetri
            </button>
            <button 
              @click="activeModelView = 'literature-matrix'"
              :class="['view-mode-btn', activeModelView === 'literature-matrix' ? 'active' : '']"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              Matriks Literatur & CCBN (ΔB)
            </button>
          </div>

          <!-- Right: Connection Badge & Actions -->
          <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
            <span v-if="isDbConnected" style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.75rem; font-weight: 700; color: #166534; background: #DCFCE7; padding: 0.25rem 0.65rem; border-radius: 999px; border: 1px solid #86EFAC;">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: #22C55E;"></span>
              Live Data ({{ normalizedResponses.length }} ASN)
            </span>
            <span v-else style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.75rem; font-weight: 700; color: #9A3412; background: #FFEDD5; padding: 0.25rem 0.65rem; border-radius: 999px; border: 1px solid #FDBA74;">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: #F97316;"></span>
              Data Lokal / Simulasi ({{ normalizedResponses.length }} ASN)
            </span>

            <button class="btn btn-secondary" @click="refreshData" style="font-size: 0.825rem; padding: 0.4rem 0.8rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
              Refresh
            </button>
            <NuxtLink to="/analisis" class="btn btn-outline" style="font-size: 0.825rem; padding: 0.4rem 0.8rem; text-decoration: none;">
              Simulator Fair-LinUCB
            </NuxtLink>
          </div>
        </div>

        <!-- VIEW 1: Theoretical & Structural CCBN Architecture -->
        <div v-if="activeModelView === 'theory-structural'">
          <DissertationModelViewer :responses="normalizedResponses" />
        </div>

        <!-- VIEW 2: Dataset Requirements Framework based on Literature -->
        <div v-else-if="activeModelView === 'dataset-framework'">
          <DatasetRequirementFramework />
        </div>

        <!-- VIEW 3: Literature Matrix & Formal Theoretical Grounding -->
        <div v-else-if="activeModelView === 'literature-matrix'">
          <CcbnLiteratureGrounding />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Navbar from '~/components/Navbar.vue';
import DatasetRequirementFramework from '~/components/DatasetRequirementFramework.vue';
import DissertationModelViewer from '~/components/DissertationModelViewer.vue';
import CcbnLiteratureGrounding from '~/components/CcbnLiteratureGrounding.vue';
import type { SurveyResponse } from '~/composables/useSurvey';
import { useSurvey } from '~/composables/useSurvey';

const { responses: localMockResponses } = useSurvey();

const activeModelView = ref<'dataset-framework' | 'theory-structural' | 'literature-matrix'>('dataset-framework');
const pending = ref(true);
const fetchError = ref<string | null>(null);
const rawDbData = ref<any[]>([]);
const isDbConnected = ref(false);

function normalizeResponse(row: any): SurveyResponse {
  let answersObj: Record<string, any> = {};
  if (typeof row.answers === 'string') {
    try { answersObj = JSON.parse(row.answers); } catch (e) {}
  } else if (typeof row.answers === 'object' && row.answers !== null) {
    answersObj = { ...row.answers };
  }

  if (!answersObj.q_1_prov && row.province) answersObj.q_1_prov = row.province;
  if (!answersObj.q_1_kab && row.regency) answersObj.q_1_kab = row.regency;
  if (!answersObj.q_2 && row.areaType) answersObj.q_2 = row.areaType;
  if (!answersObj.q_3 && row.institutionType) answersObj.q_3 = row.institutionType;
  if (!answersObj.q_4 && row.ageGroup) answersObj.q_4 = row.ageGroup;
  if (!answersObj.q_5 && row.workDuration) answersObj.q_5 = row.workDuration;
  if (!answersObj.q_6 && row.hasElearning) answersObj.q_6 = row.hasElearning;
  if (!answersObj.q_7 && row.q7ElearningTypes) answersObj.q_7 = row.q7ElearningTypes;
  if (!answersObj.q_8 && row.q8ElearningProviders) answersObj.q_8 = row.q8ElearningProviders;
  if (!answersObj.q_9 && row.q9MainDevice) answersObj.q_9 = row.q9MainDevice;
  if (!answersObj.q_10 && row.q10LearningLocations) answersObj.q_10 = row.q10LearningLocations;
  if (!answersObj.q_11 && row.q11InternetSources) answersObj.q_11 = row.q11InternetSources;
  if (!answersObj.q_12 && row.q12DisruptionFreq) answersObj.q_12 = row.q12DisruptionFreq;
  if (!answersObj.q_13 && row.q13DisruptionTypes) answersObj.q_13 = row.q13DisruptionTypes;
  if (!answersObj.q_14 && row.q14LearningConditions) answersObj.q_14 = row.q14LearningConditions;
  if (!answersObj.q_15 && row.q15WorkloadLevel) answersObj.q_15 = row.q15WorkloadLevel;
  if (!answersObj.q_16 && row.q16WorkloadReasons) answersObj.q_16 = row.q16WorkloadReasons;
  if (!answersObj.q_17 && row.q17UrgentTaskFreq) answersObj.q_17 = row.q17UrgentTaskFreq;
  if (!answersObj.q_18 && row.q18SpecialStudyTime) answersObj.q_18 = row.q18SpecialStudyTime;
  if (!answersObj.q_19 && row.q19FormatDifficulties) answersObj.q_19 = row.q19FormatDifficulties;
  if (!answersObj.q_20 && row.q20EasyFormats) answersObj.q_20 = row.q20EasyFormats;
  if (!answersObj.q_21 && row.q21LowSignalFormats) answersObj.q_21 = row.q21LowSignalFormats;
  if (!answersObj.q_22 && row.q22RelevanceImportance) answersObj.q_22 = row.q22RelevanceImportance;
  if (!answersObj.q_23 && row.q23RelevanceExperiences) answersObj.q_23 = row.q23RelevanceExperiences;
  if (!answersObj.q_24 && row.q24AdaptiveFormatPref) answersObj.q_24 = row.q24AdaptiveFormatPref;
  if (!answersObj.q_25 && row.q25FocusDurations) answersObj.q_25 = row.q25FocusDurations;
  if (!answersObj.q_26 && row.q26InactivityReasons) answersObj.q_26 = row.q26InactivityReasons;
  if (!answersObj.q_27 && row.q27MultitaskFreq) answersObj.q_27 = row.q27MultitaskFreq;
  if (!answersObj.q_28 && row.q28MultitaskActivities) answersObj.q_28 = row.q28MultitaskActivities;
  if (!answersObj.q_29 && row.q29DiscussionOpportunities) answersObj.q_29 = row.q29DiscussionOpportunities;
  if (!answersObj.q_30 && row.q30DiscussionBarriers) answersObj.q_30 = row.q30DiscussionBarriers;
  if (!answersObj.q_31 && row.q31EffectiveFormats) answersObj.q_31 = row.q31EffectiveFormats;
  if (!answersObj.q_32 && row.q32IdealPlatformDesires) answersObj.q_32 = row.q32IdealPlatformDesires;
  if (!answersObj.q_33 && row.q33SpatialConstraints) answersObj.q_33 = row.q33SpatialConstraints;
  if (!answersObj.q_34 && row.q34ReflectionWorkEnv) answersObj.q_34 = row.q34ReflectionWorkEnv;
  if (!answersObj.q_35 && row.q35ReflectionFormatSuitability) answersObj.q_35 = row.q35ReflectionFormatSuitability;
  if (!answersObj.q_36 && row.q36ReflectionRegionalCharacteristics) answersObj.q_36 = row.q36ReflectionRegionalCharacteristics;
  if (!answersObj.q_37 && row.q37ReflectionSpecialConditions) answersObj.q_37 = row.q37ReflectionSpecialConditions;
  if (!answersObj.q_38 && row.q38ReflectionOrganizersShouldKnow) answersObj.q_38 = row.q38ReflectionOrganizersShouldKnow;
  if (!answersObj.q_39 && row.q39AdminUnderstandingOfRegion) answersObj.q_39 = row.q39AdminUnderstandingOfRegion;
  if (!answersObj.q_40 && row.q40AdminMisconceptions) answersObj.q_40 = row.q40AdminMisconceptions;
  if (!answersObj.q_41 && row.q41PolicyChangesNeeded) answersObj.q_41 = row.q41PolicyChangesNeeded;
  if (!answersObj.q_42 && row.q42FutureExpectations) answersObj.q_42 = row.q42FutureExpectations;
  if (!answersObj.q_43 && row.q43SyncParticipationFreq) answersObj.q_43 = row.q43SyncParticipationFreq;
  if (!answersObj.q_44 && row.q44SyncDevices) answersObj.q_44 = row.q44SyncDevices;
  if (!answersObj.q_45 && row.q45SyncNetworkDisruptions) answersObj.q_45 = row.q45SyncNetworkDisruptions;
  if (!answersObj.q_46 && row.q46SyncMultitaskBehaviors) answersObj.q_46 = row.q46SyncMultitaskBehaviors;
  if (!answersObj.q_47 && row.q47SyncCameraOffReasons) answersObj.q_47 = row.q47SyncCameraOffReasons;
  if (!answersObj.q_48 && row.q48SyncEngagementRatings) answersObj.q_48 = row.q48SyncEngagementRatings;

  return {
    id: row.id?.toString() || '0',
    timestamp: row.createdAt || new Date().toISOString(),
    province: row.province || answersObj.q_1_prov || '',
    regency: row.regency || answersObj.q_1_kab || '',
    answers: answersObj
  };
}

const normalizedResponses = computed<SurveyResponse[]>(() => {
  if (rawDbData.value.length > 0) {
    return rawDbData.value.map(normalizeResponse);
  }
  return localMockResponses.value || [];
});

async function refreshData() {
  pending.value = true;
  fetchError.value = null;

  try {
    const res: any = await $fetch('/api/responses');
    if (res && res.success && Array.isArray(res.data)) {
      rawDbData.value = res.data;
      isDbConnected.value = true;
    } else {
      throw new Error(res?.error || 'Format respon API tidak valid');
    }
  } catch (err: any) {
    fetchError.value = err.message || 'Gagal memuat data dari API PostgreSQL';
    isDbConnected.value = false;
  } finally {
    pending.value = false;
  }
}

onMounted(() => {
  refreshData();
});
</script>

<style scoped>
.view-mode-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 700;
  border: 1px solid var(--color-stroke-secondary);
  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-mode-btn:hover {
  color: #2563EB;
  border-color: #2563EB;
}

.view-mode-btn.active {
  background: #2563EB;
  color: #FFFFFF;
  border-color: #2563EB;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
