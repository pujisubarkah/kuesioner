<template>
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <!-- Top Action Bar -->
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; background: var(--color-surface-card); padding: 1.25rem 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--color-stroke-secondary); box-shadow: var(--shadow-sm);">
      <div>
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
          <span class="section-badge" style="margin-bottom: 0;">Analisis Data ASN</span>
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--brand-lan-navy);">Riset Mandiri • Analytics</span>
        </div>
        <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--color-text-primary);">Dashboard Hasil & Analisis Riset E-Learning</h2>
        <p style="font-size: 0.875rem; color: var(--color-text-secondary);">
          Kompilasi data kuantitatif & ekspresi kualitatif responden ASN di seluruh Indonesia.
        </p>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
        <button class="btn btn-outline" @click="$emit('seed-mock')" title="Tambahkan 3 contoh respons responden lengkap untuk pengujian">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
          Load Data Simulasi Riset
        </button>

        <button class="btn btn-secondary" @click="$emit('export-json')" :disabled="responses.length === 0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export JSON
        </button>

        <button class="btn btn-primary" @click="$emit('export-csv')" :disabled="responses.length === 0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          Export CSV
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="responses.length === 0" class="card" style="text-align: center; padding: 4rem 2rem;">
      <div style="width: 64px; height: 64px; background: var(--brand-lan-blue-light); color: var(--brand-lan-blue); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto;">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--color-text-primary); margin-bottom: 0.5rem;">Belum Ada Respon Kuesioner Terdata</h3>
      <p style="font-size: 0.9rem; color: var(--color-text-secondary); max-width: 500px; margin: 0 auto 1.5rem auto;">
        Belum ada jawaban kuesioner yang tersimpan di sistem. Anda dapat mengklik tombol "Load Data Simulasi Riset" untuk mengisi sampel data riset ASN.
      </p>
      <button class="btn btn-primary" @click="$emit('seed-mock')">
        Muat Data Simulasi Riset Sekarang
      </button>
    </div>

    <template v-else>
      <!-- Stats Overview Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
        <div class="card" style="padding: 1.25rem; margin-bottom: 0;">
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase;">Total Responden</div>
          <div style="font-size: 2.25rem; font-weight: 800; color: var(--brand-lan-navy); margin-top: 0.25rem;">{{ responses.length }}</div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.2rem;">Orang ASN terdata</div>
        </div>

        <div class="card" style="padding: 1.25rem; margin-bottom: 0;">
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase;">Pernah E-Learning</div>
          <div style="font-size: 2.25rem; font-weight: 800; color: var(--brand-lan-blue); margin-top: 0.25rem;">{{ elearningParticipationRate }}%</div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.2rem;">Dalam 12 bulan terakhir</div>
        </div>

        <div class="card" style="padding: 1.25rem; margin-bottom: 0;">
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase;">Beban Tugas Kedinasan</div>
          <div style="font-size: 2.25rem; font-weight: 800; color: var(--brand-lan-gold-dark); margin-top: 0.25rem;">{{ avgWorkloadDisruption }}/5.0</div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.2rem;">Indikator Beban Bekerja (Q15)</div>
        </div>

        <div class="card" style="padding: 1.25rem; margin-bottom: 0;">
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase;">Perangkat Utama</div>
          <div style="font-size: 1.35rem; font-weight: 800; color: var(--color-text-primary); margin-top: 0.5rem; text-transform: capitalize;">{{ topDevice }}</div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.2rem;">Paling banyak digunakan</div>
        </div>
      </div>

      <!-- Regional Distribution -->
      <div class="card">
        <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--color-text-primary); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          Sebaran Wilayah Penugasan Responden
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
          <div>
            <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--color-text-secondary); margin-bottom: 0.75rem;">Per Provinsi:</h4>
            <div v-for="(count, prov) in provinceBreakdown" :key="prov" style="margin-bottom: 0.6rem;">
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.2rem;">
                <span>{{ prov }}</span>
                <span>{{ count }} ASN ({{ Math.round((count / responses.length) * 100) }}%)</span>
              </div>
              <div style="height: 8px; background: var(--color-surface-secondary); border-radius: 999px; overflow: hidden;">
                <div :style="{ width: `${(count / responses.length) * 100}%` }" style="height: 100%; background: var(--brand-lan-navy); border-radius: 999px;"></div>
              </div>
            </div>
          </div>

          <div>
            <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--color-text-secondary); margin-bottom: 0.75rem;">Jenis Wilayah (Q2):</h4>
            <div v-for="(count, area) in areaTypeBreakdown" :key="area" style="margin-bottom: 0.6rem;">
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.2rem;">
                <span>{{ area }}</span>
                <span>{{ count }} ASN</span>
              </div>
              <div style="height: 8px; background: var(--color-surface-secondary); border-radius: 999px; overflow: hidden;">
                <div :style="{ width: `${(count / responses.length) * 100}%` }" style="height: 100%; background: var(--brand-lan-blue); border-radius: 999px;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Qualitative Findings Section -->
      <div class="card" style="border-left: 5px solid var(--brand-lan-gold);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <span class="gold-question-tag">Temuan Kualitatif Utama (Open-ended)</span>
            <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--color-text-primary);">Eksplorasi Konteks Belajar & Suara Lapangan ASN</h3>
          </div>

          <!-- Question Selector Filter -->
          <select class="form-control" style="width: auto; font-size: 0.85rem;" v-model="selectedQualitativeQ">
            <option value="q_31">Q31: Kondisi Khusus Tempat Penugasan (Spatial Context)</option>
            <option value="q_14">Q14: Pengalaman Paling Mengganggu saat E-Learning</option>
            <option value="q_29">Q29: Masalah Terbesar saat Pelatihan Online</option>
            <option value="q_30">Q30: Hal yang Ingin Diubah dari Sistem Pelatihan</option>
            <option value="q_32">Q32: Hal yang Belum Dipahami Penyelenggara</option>
          </select>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
          <div 
            v-for="(ans, idx) in currentQualitativeAnswers" 
            :key="idx"
            style="background: var(--brand-lan-gold-subtle); border: 1px solid #FDE68A; padding: 1.1rem; border-radius: var(--radius-md);"
          >
            <div style="display: flex; justify-content: space-between; font-size: 0.775rem; font-weight: 700; color: var(--brand-lan-gold-dark); margin-bottom: 0.4rem;">
              <span>ASN #{{ idx + 1 }} • {{ ans.province }} ({{ ans.regency }})</span>
              <span>Instansi: {{ ans.instansi }} | Usia: {{ ans.age }}</span>
            </div>
            <div style="font-size: 0.95rem; font-style: italic; color: #78350F; line-height: 1.5;">
              "{{ ans.text }}"
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { SurveyResponse } from '~/composables/useSurvey';

const props = defineProps<{
  responses: SurveyResponse[];
}>();

defineEmits<{
  (e: 'seed-mock'): void;
  (e: 'export-json'): void;
  (e: 'export-csv'): void;
}>();

const selectedQualitativeQ = ref<'q_14' | 'q_29' | 'q_30' | 'q_31' | 'q_32'>('q_31');

const elearningParticipationRate = computed(() => {
  if (props.responses.length === 0) return 0;
  const countYa = props.responses.filter(r => r.answers['q_6'] === 'Ya').length;
  return Math.round((countYa / props.responses.length) * 100);
});

const avgWorkloadDisruption = computed(() => {
  if (props.responses.length === 0) return '0.0';
  const sum = props.responses.reduce((acc, r) => acc + (Number(r.answers['q_15']) || 0), 0);
  return (sum / props.responses.length).toFixed(1);
});

const topDevice = computed(() => {
  if (props.responses.length === 0) return '-';
  const counts: Record<string, number> = {};
  props.responses.forEach(r => {
    const dev = r.answers['q_9'];
    if (dev) counts[dev] = (counts[dev] || 0) + 1;
  });
  let maxDev = '-';
  let maxCount = 0;
  for (const [k, v] of Object.entries(counts)) {
    if (v > maxCount) {
      maxCount = v;
      maxDev = k;
    }
  }
  return maxDev;
});

const provinceBreakdown = computed(() => {
  const counts: Record<string, number> = {};
  props.responses.forEach(r => {
    const prov = r.province || 'Lainnya';
    counts[prov] = (counts[prov] || 0) + 1;
  });
  return counts;
});

const areaTypeBreakdown = computed(() => {
  const counts: Record<string, number> = {};
  props.responses.forEach(r => {
    const area = r.answers['q_2'] || 'Tidak diisi';
    counts[area] = (counts[area] || 0) + 1;
  });
  return counts;
});

const currentQualitativeAnswers = computed(() => {
  const qKey = selectedQualitativeQ.value;
  return props.responses
    .filter(r => r.answers[qKey] && r.answers[qKey].trim() !== '')
    .map(r => ({
      province: r.province || 'Unknown',
      regency: r.regency || 'Unknown',
      instansi: r.answers['q_3'] || 'ASN',
      age: r.answers['q_4'] || '-',
      text: r.answers[qKey]
    }));
});
</script>
