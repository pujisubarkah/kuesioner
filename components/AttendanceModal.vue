<template>
  <Teleport to="body">
    <div v-if="modelValue" class="attendance-modal-backdrop" @click.self="closeModal">
      <div class="attendance-modal-card" role="dialog" aria-modal="true">
        <!-- Modal Header -->
        <div class="modal-header">
          <div class="modal-title-group">
            <div class="modal-icon-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                <path d="M9 14l2 2 4-4"></path>
              </svg>
            </div>
            <div>
              <div class="modal-tag">Presensi Kegiatan Webinar</div>
              <h3 class="modal-title">Formulir Daftar Hadir Peserta</h3>
            </div>
          </div>
          <button class="modal-close-btn" @click="closeModal" aria-label="Tutup popup">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- MODE 1: PROMPT VIEW (Default Gate) -->
        <div v-if="viewMode === 'prompt'" class="modal-body">
          <div class="prompt-hero">
            <p class="prompt-text">
              Bapak/Ibu Peserta Webinar yang terhormat, sebelum melanjutkan ke pengisian instrumen kuesioner kajian, mohon kesediaannya untuk memastikan telah mengisi <strong>Daftar Hadir Webinar</strong> untuk kelengkapan administrasi dan rekapitulasi kehadiran.
            </p>
          </div>

          <div class="options-container">
            <!-- Option A: Fill Form in Modal / New Tab -->
            <div class="option-box primary-option">
              <div class="option-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </div>
              <div class="option-details">
                <div class="option-title">Belum Mengisi Presensi?</div>
                <div class="option-desc">Isi formulir daftar hadir webinar sekarang langsung di sini.</div>
                <div class="option-btn-group">
                  <button class="btn-action-primary" @click="viewMode = 'embed'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    Buka Form Presensi
                  </button>
                </div>
              </div>
            </div>

            <!-- Option B: Already Filled / Proceed to Survey -->
            <div class="option-box success-option">
              <div class="option-icon success">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div class="option-details">
                <div class="option-title">Sudah Mengisi Presensi?</div>
                <div class="option-desc">Jika Bapak/Ibu sudah mengisi form presensi webinar, silakan langsung melanjutkan ke kuesioner.</div>
                <div class="option-btn-group">
                  <button class="btn-proceed" @click="handleProceed">
                    Lanjut Isi Kuesioner
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- MODE 2: EMBEDDED GOOGLE FORM -->
        <div v-else class="modal-body-embed">
          <div class="embed-toolbar">
            <button class="toolbar-back-btn" @click="viewMode = 'prompt'">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Kembali
            </button>
            <span class="toolbar-status">Formulir Daftar Hadir Webinar</span>
          </div>

          <div class="iframe-wrapper">
            <iframe 
              :src="embedUrl" 
              class="attendance-iframe"
              title="Google Forms Presensi Webinar"
              frameborder="0" 
              marginheight="0" 
              marginwidth="0"
            >
              Memuat formulir...
            </iframe>
          </div>

          <div class="modal-footer-embed">
            <p class="embed-hint">Setelah menyelesaikan pengisian form di atas, klik tombol di bawah untuk melanjutkan ke kuesioner.</p>
            <button class="btn-proceed full-width" @click="handleProceed">
              ✅ Selesai Presensi, Lanjut ke Kuesioner ➔
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    formUrl?: string;
    embedUrl?: string;
  }>(),
  {
    formUrl: 'https://forms.gle/yNKLGjr2zrr3zY2C9',
    embedUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScuCbdBKSY7Zge3v8fQC6TQr_HWYrIVcnzjoUyJ6XOJ0J60GQ/viewform?embedded=true'
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'proceed'): void;
}>();

const viewMode = ref<'prompt' | 'embed'>('prompt');

const closeModal = () => {
  emit('update:modelValue', false);
  viewMode.value = 'prompt';
};

const handleProceed = () => {
  emit('proceed');
  closeModal();
};
</script>

<style scoped>
.attendance-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.attendance-modal-card {
  background: #FFFFFF;
  border-radius: var(--radius-xl, 16px);
  box-shadow: 0 25px 50px -12px rgba(15, 44, 89, 0.25);
  width: 100%;
  max-width: 680px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--color-stroke-secondary, #E2E8F0);
  animation: modalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--color-stroke-secondary, #E2E8F0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #F8FAFC;
}

.modal-title-group {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.modal-icon-badge {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #EFF6FF;
  color: #1D4ED8;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1.5px solid #BFDBFE;
}

.modal-tag {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #1D4ED8;
  margin-bottom: 0.15rem;
}

.modal-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0F2C59;
  margin: 0;
  line-height: 1.2;
}

.modal-close-btn {
  background: transparent;
  border: none;
  color: #64748B;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
}

.modal-close-btn:hover {
  background: #E2E8F0;
  color: #0F172A;
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
}

.prompt-hero {
  background: #EFF6FF;
  border: 1.5px solid #BFDBFE;
  border-left: 4px solid #1D4ED8;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  margin-bottom: 1.25rem;
}

.prompt-text {
  font-size: 0.925rem;
  color: #1E3A8A;
  line-height: 1.55;
  margin: 0;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-box {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 12px;
  border: 1.5px solid #E2E8F0;
  background: #FFFFFF;
  transition: all 0.2s ease;
}

.primary-option {
  border-color: #CBD5E1;
  background: #F8FAFC;
}

.success-option {
  border-color: #BBF7D0;
  background: #F0FDF4;
}

.option-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #EFF6FF;
  color: #1D4ED8;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.option-icon.success {
  background: #DCFCE7;
  color: #16A34A;
}

.option-details {
  flex: 1;
}

.option-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: #0F172A;
  margin-bottom: 0.25rem;
}

.option-desc {
  font-size: 0.85rem;
  color: #475569;
  line-height: 1.45;
  margin-bottom: 0.85rem;
}

.option-btn-group {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.btn-action-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  background: #1D4ED8;
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.btn-action-primary:hover {
  background: #1E40AF;
}

.btn-action-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  background: #FFFFFF;
  color: #1D4ED8;
  border: 1px solid #BFDBFE;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.15s ease;
}

.btn-action-secondary:hover {
  background: #EFF6FF;
  border-color: #93C5FD;
}

.btn-proceed {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 700;
  background: #16A34A;
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 2px 4px rgba(22, 163, 74, 0.2);
}

.btn-proceed:hover {
  background: #15803D;
  box-shadow: 0 4px 6px rgba(22, 163, 74, 0.3);
}

.btn-proceed.full-width {
  width: 100%;
  padding: 0.85rem 1.25rem;
  font-size: 0.95rem;
}

/* Modal Embed View */
.modal-body-embed {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.embed-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1.25rem;
  background: #F1F5F9;
  border-bottom: 1px solid #E2E8F0;
  font-size: 0.825rem;
}

.toolbar-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  font-size: 0.8rem;
  font-weight: 600;
  background: #FFFFFF;
  border: 1px solid #CBD5E1;
  border-radius: 6px;
  color: #475569;
  cursor: pointer;
}

.toolbar-back-btn:hover {
  background: #E2E8F0;
  color: #0F172A;
}

.toolbar-status {
  font-weight: 600;
  color: #64748B;
}

.toolbar-link {
  font-weight: 700;
  color: #1D4ED8;
  text-decoration: none;
}

.toolbar-link:hover {
  text-decoration: underline;
}

.iframe-wrapper {
  flex: 1;
  min-height: 480px;
  max-height: 60vh;
  background: #F8FAFC;
}

.attendance-iframe {
  width: 100%;
  height: 100%;
  min-height: 480px;
  border: none;
}

.modal-footer-embed {
  padding: 1rem 1.5rem;
  border-top: 1px solid #E2E8F0;
  background: #FFFFFF;
  text-align: center;
}

.embed-hint {
  font-size: 0.825rem;
  color: #64748B;
  margin-bottom: 0.65rem;
}

@media (max-width: 640px) {
  .attendance-modal-card {
    max-height: 95vh;
  }
  .option-box {
    flex-direction: column;
    gap: 0.75rem;
  }
  .iframe-wrapper {
    min-height: 380px;
  }
}
</style>
