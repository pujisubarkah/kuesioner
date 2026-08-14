<template>
  <div class="app-container">
    <!-- Top Header -->
    <Navbar />

    <main id="konten-utama" class="main-content">
      <div>
        <!-- Completion / Thank You Screen -->
        <div v-if="isSubmitted" class="card" style="text-align: center; padding: 4rem 2rem;">
          <div style="width: 72px; height: 72px; background: var(--brand-lan-blue-light); color: var(--brand-lan-blue); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--color-text-primary); margin-bottom: 0.75rem;">
            Terima Kasih atas Partisipasi Anda!
          </h2>
          <p style="font-size: 1rem; color: var(--color-text-secondary); max-width: 580px; margin: 0 auto 2rem auto; line-height: 1.6;">
            Jawaban Anda telah tersimpan di database kuesioner dan sangat berharga dalam memetakan konteks belajar, hambatan teknis, serta dinamika kedinasan ASN untuk pengembangan sistem e-learning yang lebih baik di Indonesia.
          </p>

          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-primary" @click="handleRestart">
              Isi Kembali / Respon Baru
            </button>
          </div>
        </div>

        <!-- Welcome / Introduction Screen -->
        <div v-else-if="!isStarted" class="card" style="padding: 2.5rem 2rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
            <span class="section-badge" style="margin-bottom: 0;">Pengantar Riset Disertasi Doktoral</span>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted);">• Estimasi Waktu: 5–7 Menit</span>
          </div>

          <h2 style="font-size: 1.65rem; font-weight: 800; color: var(--color-text-primary); line-height: 1.3; margin-bottom: 1rem;">
            Kuesioner Pembelajaran Digital ASN: Konteks Belajar & Kendala Kedinasan
          </h2>

          <!-- Researcher Academic Intro Box -->
          <div style="background: var(--color-surface-secondary); border: 1.5px solid var(--color-stroke-secondary); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.25rem; border-left: 4px solid var(--brand-lan-blue);">
            <div style="font-size: 0.775rem; font-weight: 800; text-transform: uppercase; color: var(--brand-lan-blue); margin-bottom: 0.35rem; letter-spacing: 0.5px;">
              Pengantar
            </div>
            <p style="font-size: 0.95rem; color: var(--color-text-primary); line-height: 1.6; margin-bottom: 0.5rem;">
              Bapak/Ibu/Saudara/i ASN yang terhormat, perkenalkan saya <strong>Pujiatmo Subarkah</strong>, Mahasiswa Program Doktoral (S3). Kuesioner ini dirancang khusus sebagai instrumen pengumpulan data riset akademis disertasi untuk memetakan pengalaman nyata, kendala teknis jaringan, sarana perangkat, serta dinamika beban tugas kedinasan saat ASN mengikuti pembelajaran digital (e-learning/LMS/MOOC).
            </p>
            <p style="font-size: 0.875rem; color: var(--color-text-secondary); font-style: italic;">
              Partisipasi dan jawaban jujur dari pengalaman lapangan Anda sangat berharga untuk menghasilkan analisis empiris yang obyektif dan membumi demi kemajuan kualitas pelatihan ASN di Indonesia.
            </p>
          </div>

          <!-- Anti-Phishing & Security Guarantee Banner -->
          <div style="background: #F0FDF4; border: 1.5px solid #BBF7D0; border-left: 4px solid #16A34A; padding: 1rem 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.75rem; display: flex; gap: 0.75rem; align-items: flex-start;">
            <svg style="color: #16A34A; flex-shrink: 0; margin-top: 2px;" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            <div>
              <strong style="color: #166534; font-size: 0.9rem;">Jaminan Keamanan & Bebas Phishing:</strong>
              <p style="color: #15803D; font-size: 0.85rem; margin-top: 0.2rem; line-height: 1.5;">
                Kuesioner riset murni ini <strong>TIDAK PERNAH meminta kode OTP, password, PIN, NIK, maupun akses keuangan/kedinasan</strong> Anda. Formulir ini aman digunakan dan hanya mengumpulkan persepsi serta pengalaman pembelajaran digital ASN.
              </p>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 2.25rem;">
            <div style="background: var(--color-surface-secondary); border: 1.5px solid var(--color-stroke-secondary); padding: 1.1rem; border-radius: var(--radius-md);">
              <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; color: var(--brand-lan-navy); font-size: 0.95rem; margin-bottom: 0.35rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Jaminan Kerahasiaan
              </div>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.5;">
                Kuesioner ini <strong>bukan evaluasi kinerja individu/instansi</strong> dan tidak mengumpulkan identitas pribadi sensitif.
              </p>
            </div>

            <div style="background: var(--color-surface-secondary); border: 1.5px solid var(--color-stroke-secondary); padding: 1.1rem; border-radius: var(--radius-md);">
              <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; color: var(--brand-lan-navy); font-size: 0.95rem; margin-bottom: 0.35rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                Pengisian Ringkas
              </div>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.5;">
                Dapat diselesaikan dalam waktu sekitar <strong>5 s.d. 7 menit</strong> dengan indikator kemajuan per bagian.
              </p>
            </div>

            <div style="background: var(--color-surface-secondary); border: 1.5px solid var(--color-stroke-secondary); padding: 1.1rem; border-radius: var(--radius-md);">
              <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; color: var(--brand-lan-navy); font-size: 0.95rem; margin-bottom: 0.35rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Konteks Spasial & Wilayah
              </div>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.5;">
                Pengalaman Anda di tempat bertugas sangat berharga tanpa harus dikelompokkan secara prematur.
              </p>
            </div>

            <div style="background: var(--color-surface-secondary); border: 1.5px solid var(--color-stroke-secondary); padding: 1.1rem; border-radius: var(--radius-md);">
              <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; color: var(--brand-lan-navy); font-size: 0.95rem; margin-bottom: 0.35rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Kebebasan Berpendapat
              </div>
              <p style="font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.5;">
                Tersedia ruang ekspresi terbuka untuk menyampaikan cerita & kendala sebenarnya di lapangan.
              </p>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-primary" style="padding: 0.9rem 2.25rem; font-size: 1.05rem; width: 100%; max-width: 320px;" @click="isStarted = true">
              Mulai Pengisian Kuesioner
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>

        <!-- Multi-step Form Wizard -->
        <div v-else>
          <!-- Stepper & Progress Header -->
          <ProgressBar 
            :sections="SURVEY_SECTIONS"
            :current-index="currentSectionIndex"
            :total-sections="SURVEY_SECTIONS.length"
            :progress-percent="progressPercent"
            @jump="jumpToSection"
          />

          <!-- Section Card -->
          <div class="card">
            <!-- Section Header -->
            <div class="section-header">
              <span class="section-badge">Bagian {{ currentSection.code }}</span>
              <h2 class="section-title">{{ currentSection.title }}</h2>
              <p class="section-subtitle">{{ currentSection.description }}</p>
            </div>

            <!-- Validation / Database Error Alerts -->
            <div v-if="validationError || submitError" class="info-box" style="border-left-color: var(--color-error); background: var(--color-error-subtle); border-color: #FECACA; margin-bottom: 1.5rem; color: #991B1B;">
              <svg class="info-box-icon" style="color: var(--color-error);" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <div>
                <strong style="color: #991B1B; font-size: 0.9rem;">Peringatan Pengisian Kuesioner:</strong>
                <p style="color: #B91C1C; font-size: 0.85rem; margin-top: 0.2rem;">{{ validationError || submitError }}</p>
              </div>
            </div>

            <!-- Active Questions List -->
            <div v-for="q in activeQuestions" :key="q.id" class="question-item">
              <div class="question-header">
                <div class="question-num">{{ q.code }}</div>
                <div style="flex: 1;">
                  <span v-if="q.isGoldQuestion" class="gold-question-tag">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    Pertanyaan Kontekstual / Bebas
                  </span>
                  <div class="question-title">
                    {{ q.text }}
                    <span v-if="q.isRequired" class="required-star">*</span>
                  </div>
                  <p v-if="q.hint" class="question-hint">{{ q.hint }}</p>
                </div>
              </div>

              <!-- QUESTION TYPE: Region Picker (Q1) -->
              <div v-if="q.type === 'region'">
                <RegionSelect 
                  :selected-prov="answers['q_1_prov'] || ''"
                  :selected-kab="answers['q_1_kab'] || ''"
                  :custom-kab="answers['q_1_custom_kab'] || ''"
                  @update:prov="val => answers['q_1_prov'] = val"
                  @update:kab="val => answers['q_1_kab'] = val"
                  @update:customKab="val => answers['q_1_custom_kab'] = val"
                />
              </div>

              <!-- QUESTION TYPE: Single Select (Radio) -->
              <div v-else-if="q.type === 'single'">
                <div class="options-grid">
                  <label 
                    v-for="opt in q.options" 
                    :key="opt"
                    class="option-card"
                    :class="{ selected: answers[`q_${q.id}`] === opt }"
                  >
                    <input 
                      type="radio" 
                      :name="`q_${q.id}`"
                      :value="opt"
                      :checked="answers[`q_${q.id}`] === opt"
                      @change="answers[`q_${q.id}`] = opt"
                    />
                    <span class="option-label">{{ opt }}</span>
                  </label>

                  <label 
                    v-if="q.hasOtherOption"
                    class="option-card"
                    :class="{ selected: answers[`q_${q.id}`] === 'Lainnya' }"
                  >
                    <input 
                      type="radio" 
                      :name="`q_${q.id}`"
                      value="Lainnya"
                      :checked="answers[`q_${q.id}`] === 'Lainnya'"
                      @change="answers[`q_${q.id}`] = 'Lainnya'"
                    />
                    <span class="option-label">Lainnya</span>
                  </label>
                </div>

                <div v-if="q.hasOtherOption && answers[`q_${q.id}`] === 'Lainnya'" style="margin-top: 0.75rem;">
                  <input 
                    type="text"
                    class="form-control"
                    placeholder="Tuliskan jawaban lainnya..."
                    v-model="answers[`q_${q.id}_other`]"
                  />
                </div>
              </div>

              <!-- QUESTION TYPE: Multi Select (Checkbox) -->
              <div v-else-if="q.type === 'multi'">
                <div class="options-grid">
                  <label 
                    v-for="opt in q.options" 
                    :key="opt"
                    class="option-card"
                    :class="{ selected: isArrayOptionSelected(q.id, opt) }"
                  >
                    <input 
                      type="checkbox"
                      :value="opt"
                      :checked="isArrayOptionSelected(q.id, opt)"
                      @change="toggleArrayOption(q.id, opt)"
                    />
                    <span class="option-label">{{ opt }}</span>
                  </label>

                  <label 
                    v-if="q.hasOtherOption"
                    class="option-card"
                    :class="{ selected: isArrayOptionSelected(q.id, 'Lainnya') }"
                  >
                    <input 
                      type="checkbox"
                      value="Lainnya"
                      :checked="isArrayOptionSelected(q.id, 'Lainnya')"
                      @change="toggleArrayOption(q.id, 'Lainnya')"
                    />
                    <span class="option-label">Lainnya</span>
                  </label>
                </div>

                <div v-if="q.hasOtherOption && isArrayOptionSelected(q.id, 'Lainnya')" style="margin-top: 0.75rem;">
                  <input 
                    type="text"
                    class="form-control"
                    placeholder="Tuliskan jenis lainnya..."
                    v-model="answers[`q_${q.id}_other`]"
                  />
                </div>
              </div>

              <!-- QUESTION TYPE: Multi Max Select (Q23 max 2, Q28 max 3) -->
              <div v-else-if="q.type === 'multi-max'">
                <MultiMaxSelect 
                  :options="q.options || []"
                  :max-selections="q.maxSelections"
                  :has-other="q.hasOtherOption"
                  :model-value="answers[`q_${q.id}`] || []"
                  :other-value="answers[`q_${q.id}_other`] || ''"
                  @update:modelValue="val => answers[`q_${q.id}`] = val"
                  @update:otherValue="val => answers[`q_${q.id}_other`] = val"
                />
              </div>

              <!-- QUESTION TYPE: Likert 1-5 Scale -->
              <div v-else-if="q.type === 'likert'">
                <LikertInput 
                  :model-value="answers[`q_${q.id}`]"
                  :type="q.id === 12 ? 'frequency' : 'agree'"
                  @update:modelValue="val => answers[`q_${q.id}`] = val"
                />
              </div>

              <!-- QUESTION TYPE: Narrative Text Area -->
              <div v-else-if="q.type === 'text'">
                <textarea 
                  class="form-control"
                  rows="4"
                  placeholder="Tuliskan pengalaman atau pendapat Anda secara rinci di sini..."
                  v-model="answers[`q_${q.id}`]"
                ></textarea>
              </div>

              <!-- QUESTION TYPE: Matrix Scale (Q33) -->
              <div v-else-if="q.type === 'matrix'">
                <MatrixInput 
                  :items="q.matrixItems || []"
                  :scales="q.matrixScales || []"
                  :model-value="answers[`q_${q.id}`] || {}"
                  @update:modelValue="val => answers[`q_${q.id}`] = val"
                />
              </div>
            </div>

            <!-- Footer Action Buttons -->
            <div class="actions-row">
              <button 
                class="btn btn-secondary"
                :disabled="isFirstSection"
                @click="goToPrevSection"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                Sebelumnya
              </button>

              <button 
                v-if="!isLastSection"
                class="btn btn-primary"
                @click="validateAndNext"
              >
                Selanjutnya
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>

              <button 
                v-else
                class="btn btn-navy"
                :disabled="isSubmitting"
                @click="validateAndSubmit"
              >
                <span v-if="isSubmitting">Menyimpan ke Database...</span>
                <span v-else style="display: flex; align-items: center; gap: 0.5rem;">
                  Kirim Jawaban Kuesioner
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SURVEY_SECTIONS } from '~/data/questions-data';
import { useSurvey } from '~/composables/useSurvey';

const {
  currentSectionIndex,
  currentSection,
  activeQuestions,
  answers,
  submittedResponses,
  isSubmitted,
  isSubmitting,
  submitError,
  isFirstSection,
  isLastSection,
  progressPercent,
  goToNextSection,
  goToPrevSection,
  jumpToSection,
  resetForm,
  submitSurvey,
  seedMockData,
  exportJSON,
  exportCSV
} = useSurvey();

const validationError = ref<string | null>(null);
const isStarted = ref(false);

const handleRestart = () => {
  resetForm();
  isStarted.value = false;
};

const isArrayOptionSelected = (qId: number, opt: string) => {
  const current = answers.value[`q_${qId}`] || [];
  return Array.isArray(current) && current.includes(opt);
};

const toggleArrayOption = (qId: number, opt: string) => {
  const current = [...(answers.value[`q_${qId}`] || [])];
  const idx = current.indexOf(opt);
  if (idx > -1) {
    current.splice(idx, 1);
  } else {
    current.push(opt);
  }
  answers.value[`q_${qId}`] = current;
};

// Validate section inputs before proceeding
const validateCurrentSection = (): boolean => {
  validationError.value = null;

  for (const q of activeQuestions.value) {
    if (!q.isRequired) continue;

    if (q.type === 'region') {
      if (!answers.value['q_1_prov'] || !answers.value['q_1_kab']) {
        validationError.value = `${q.code}: Harap pilih Provinsi dan Kabupaten/Kota tempat Anda bertugas.`;
        return false;
      }
    } else if (q.type === 'single' || q.type === 'likert') {
      if (!answers.value[`q_${q.id}`]) {
        validationError.value = `${q.code}: Harap pilih salah satu opsi jawaban.`;
        return false;
      }
    } else if (q.type === 'multi' || q.type === 'multi-max') {
      const selected = answers.value[`q_${q.id}`];
      if (!selected || !Array.isArray(selected) || selected.length === 0) {
        validationError.value = `${q.code}: Harap pilih minimal satu opsi.`;
        return false;
      }
    } else if (q.type === 'text') {
      const val = answers.value[`q_${q.id}`];
      if (!val || val.trim() === '') {
        validationError.value = `${q.code}: Harap isi uraian jawaban pada kolom teks yang disediakan.`;
        return false;
      }
    } else if (q.type === 'matrix') {
      const matrixVal = answers.value[`q_${q.id}`] || {};
      const missingItems = (q.matrixItems || []).filter(item => !matrixVal[item]);
      if (missingItems.length > 0) {
        validationError.value = `${q.code}: Harap lengkapi skala frekuensi untuk seluruh item ("${missingItems[0]}").`;
        return false;
      }
    }
  }

  return true;
};

const validateAndNext = () => {
  if (validateCurrentSection()) {
    goToNextSection();
  }
};

const validateAndSubmit = () => {
  if (validateCurrentSection()) {
    submitSurvey();
  }
};
</script>

