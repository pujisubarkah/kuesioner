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
              <span class="badge" style="background: rgba(59, 130, 246, 0.25); color: #60A5FA; border: 1px solid rgba(96, 165, 250, 0.3);">
                📚 Repositori Literatur Akademis
              </span>
              <span 
                class="badge" 
                :style="apiData?.source === 'gdrive_api' ? 'background: rgba(34, 197, 94, 0.2); color: #4ADE80; border: 1px solid rgba(74, 222, 128, 0.3);' : 'background: rgba(245, 158, 11, 0.2); color: #FBBF24; border: 1px solid rgba(251, 191, 36, 0.3);'"
              >
                ⚡ Status: {{ syncSource }}
              </span>
            </div>
            <h2 style="font-size: 1.6rem; font-weight: 800; color: #F8FAFC; margin-bottom: 0.35rem; letter-spacing: -0.02em;">
              Referensi & Dokumen Pendukung Riset
            </h2>
            <p style="font-size: 0.925rem; color: #94A3B8; margin: 0; max-width: 780px; line-height: 1.5;">
              Kumpulan jurnal, artikel ilmiah, dan studi kebijakan yang dikategorikan dalam tema utama untuk mendukung penyusunan riset Kuesioner Pembelajaran Digital ASN.
            </p>
          </div>

          <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
            <div class="stat-pill">
              <span style="font-size: 1.25rem; font-weight: 800; color: #60A5FA;">{{ totalPdfCount }}</span>
              <span style="font-size: 0.725rem; color: #94A3B8; font-weight: 600; text-transform: uppercase;">Berkas PDF</span>
            </div>
            <div class="stat-pill" title="Total celah penelitian dalam knowledge base PostgreSQL">
              <span style="font-size: 1.25rem; font-weight: 800; color: #C084FC;">{{ allGaps.length || 271 }}</span>
              <span style="font-size: 0.725rem; color: #94A3B8; font-weight: 600; text-transform: uppercase;">Basis Celah Riset</span>
            </div>
            <div class="stat-pill" title="Dokumen PDF yang telah dipetakan intisari permasalahannya dari database">
              <span style="font-size: 1.25rem; font-weight: 800; color: #4ADE80;">{{ matchedPdfsCount }}</span>
              <span style="font-size: 0.725rem; color: #94A3B8; font-weight: 600; text-transform: uppercase;">Terpetakan Masalah</span>
            </div>
            <button 
              @click="handleRefresh" 
              class="btn-refresh-link"
              :disabled="isRefreshing"
              title="Sinkronisasi ulang data dari Google Drive"
            >
              <svg :class="{ 'spin-icon': isRefreshing }" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6"/><path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
              {{ isRefreshing ? 'Menyinkronkan...' : 'Sinkronkan GDrive' }}
            </button>
            <a 
              v-if="activeCategory"
              :href="activeCategory.driveFolderUrl" 
              target="_blank" 
              class="btn-drive-link"
              title="Buka folder Google Drive publik"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Buka Folder GDrive
            </a>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" style="padding: 3rem 1rem; text-align: center;">
        <div style="display: inline-block; width: 36px; height: 36px; border: 3px solid rgba(59, 130, 246, 0.3); border-radius: 50%; border-top-color: #3B82F6; animation: spin 0.8s linear infinite;"></div>
        <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--color-text-secondary);">Memuat referensi dari Google Drive...</p>
      </div>

      <template v-else>
        <!-- Sub-Tabs Navigation (Categories) -->
        <div class="subtabs-container" style="margin-bottom: 1.5rem;">
          <button 
            v-for="cat in referensiCategories" 
            :key="cat.id"
            class="subtab-button"
            :class="{ active: activeCategory?.id === cat.id }"
            @click="selectCategory(cat)"
          >
            <span class="category-icon">{{ getCategoryIcon(cat.name) }}</span>
            <span class="subtab-title">{{ getCategoryTitle(cat) }}</span>
            <span class="subtab-count">{{ cat.files.length }}</span>
          </button>
        </div>

        <!-- Active Category Info & Search Bar -->
        <div v-if="activeCategory" class="card" style="margin-bottom: 1.5rem; padding: 1.25rem 1.5rem; background: var(--color-surface); border: 1px solid var(--color-stroke);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
                <span class="badge" style="background: rgba(59, 130, 246, 0.15); color: #2563EB; font-weight: 800; font-size: 0.75rem; border: 1px solid rgba(59, 130, 246, 0.25);">
                  {{ getCategoryBadge(activeCategory.name) }}
                </span>
                <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--color-text-primary); margin: 0;">
                  {{ getCategoryIcon(activeCategory.name) }} {{ getCategoryTitle(activeCategory) }}
                </h3>
              </div>
              <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-bottom: 0.35rem; font-family: monospace;">
                📁 Folder GDrive: <strong>{{ activeCategory.name }}</strong>
              </div>
              <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin: 0; max-width: 750px; line-height: 1.5;">
                {{ activeCategory.description }}
              </p>
            </div>

            <!-- Search File Input -->
            <div style="position: relative; width: 100%; max-width: 320px;">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Cari nama dokumen PDF..."
                class="form-control"
                style="padding-left: 2.25rem; font-size: 0.875rem;"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--color-text-secondary);"
              >
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Main Split Content (File List + PDF Reader) -->
        <div class="referensi-grid">
          <!-- Panel Kiri: Daftar File PDF -->
          <div class="card pdf-list-card" style="padding: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--color-stroke);">
              <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--color-text-primary); margin: 0;">
                Daftar Dokumen ({{ filteredFiles.length }})
              </h4>
              <span style="font-size: 0.75rem; color: var(--color-text-secondary); font-weight: 500;">
                Klik untuk membaca
              </span>
            </div>

            <!-- Empty State when filtering -->
            <div v-if="filteredFiles.length === 0" style="padding: 2rem 1rem; text-align: center; color: var(--color-text-secondary);">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem; opacity: 0.5;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <p style="font-size: 0.875rem; margin: 0;">Tidak ditemukan PDF dengan kata kunci "{{ searchQuery }}"</p>
            </div>

            <!-- File Items List -->
            <div class="pdf-items-list" v-else>
              <div 
                v-for="file in filteredFiles" 
                :key="file.id"
                class="pdf-item"
                :class="{ active: selectedPdf?.id === file.id }"
                @click="selectPdf(file)"
              >
                <div class="pdf-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M10 12h4"/><path d="M10 16h4"/></svg>
                </div>

                <div class="pdf-item-info">
                  <span class="pdf-item-title" :title="file.title">{{ file.title }}</span>
                  <span class="pdf-item-subtitle" style="display: flex; align-items: center; gap: 0.35rem;">
                    <span>Dokumen PDF</span>
                    <span v-if="findMatchingGap(file)" style="color: #2563EB; font-weight: 700; font-size: 0.675rem;">• 📌 Intisari Tersedia</span>
                  </span>
                </div>

                <div v-if="selectedPdf?.id === file.id" class="pdf-active-indicator">
                  <span>Reading</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Panel Kanan: Interactive PDF Embedded Reader -->
          <div class="card pdf-viewer-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column; min-height: 650px;">
            <!-- Reader Controls Bar -->
            <div class="viewer-header" v-if="selectedPdf">
              <div style="display: flex; align-items: center; gap: 0.75rem; flex: 1; overflow: hidden;">
                <div style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: #EF4444; color: white; border-radius: 6px; flex-shrink: 0;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                  <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--color-text-primary); margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    {{ selectedPdf.title }}
                  </h4>
                  <p style="font-size: 0.75rem; color: var(--color-text-secondary); margin: 0;">
                    <span v-if="matchedGap" style="color: #2563EB; font-weight: 600;">
                      ⚡ Terpetakan ke Celah Riset #{{ matchedGap.id }}: {{ matchedGap.topic }}
                    </span>
                    <span v-else>
                      Dokumen Fisik Google Drive
                    </span>
                  </p>
                </div>
              </div>

              <div style="display: flex; gap: 0.5rem; align-items: center; flex-shrink: 0; flex-wrap: wrap;">
                <!-- TOMBOL BUKA MODAL INTISARI PERMASALAHAN -->
                <button
                  v-if="matchedGap"
                  type="button"
                  @click="isModalOpen = true"
                  class="btn-executive-brief"
                  style="padding: 0.45rem 0.85rem; font-size: 0.8rem; font-weight: 700; background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); color: #FFFFFF; border: none; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem; box-shadow: 0 2px 4px rgba(37, 99, 235, 0.25);"
                  title="Klik untuk membuka intisari permasalahan utama & celah riset dalam jendela pop-up"
                >
                  <span>📌</span>
                  <span>Intisari Masalah & Celah</span>
                </button>

                <NuxtLink
                  v-if="matchedGap"
                  to="/research-gap"
                  class="btn btn-secondary btn-sm"
                  style="padding: 0.4rem 0.75rem; font-size: 0.8rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;"
                  title="Lihat seluruh daftar celah riset di halaman Research Gap"
                >
                  <span>🎯</span>
                  <span>Research Gap</span>
                </NuxtLink>

                <a 
                  :href="selectedPdf.directDriveUrl" 
                  target="_blank" 
                  class="btn btn-secondary btn-sm"
                  title="Buka di tab baru Google Drive"
                  style="padding: 0.4rem 0.75rem; font-size: 0.8rem;"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  GDrive
                </a>
              </div>
            </div>

            <!-- Empty State PDF Reader -->
            <div v-if="!selectedPdf" class="pdf-viewer-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-secondary); opacity: 0.5; margin-bottom: 1rem;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--color-text-primary);">Pilih Dokumen PDF</h4>
              <p style="font-size: 0.875rem; color: var(--color-text-secondary); max-width: 360px;">
                Silakan pilih salah satu berkas PDF di panel sebelah kiri untuk menampilkan preview dokumen di sini.
              </p>
            </div>

            <!-- Embedded Iframe (Full Clean Height) -->
            <div v-if="selectedPdf" class="iframe-container" style="flex: 1; position: relative; width: 100%; height: 100%; min-height: 700px; background: #525659;">
              <iframe 
                :src="selectedPdf.previewUrl"
                style="width: 100%; height: 100%; border: none; min-height: 700px;"
                allow="autoplay"
                title="Google Drive PDF Reader"
              ></iframe>
            </div>
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- MODAL POPUP: INTISARI PERMASALAHAN UTAMA & CELAH RISET                   -->
        <!-- ========================================================================= -->
        <Teleport to="body">
          <div 
            v-if="isModalOpen && matchedGap"
            class="modal-backdrop"
            @click.self="isModalOpen = false"
            style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 1.25rem;"
          >
            <div class="modal-card" style="background: white; border-radius: 16px; max-width: 780px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35); display: flex; flex-direction: column; border: 1px solid #CBD5E1;">
              <!-- Modal Header -->
              <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; background: #F8FAFC; border-top-left-radius: 16px; border-top-right-radius: 16px;">
                <div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.4rem;">
                    <span class="badge" style="background: rgba(147, 51, 234, 0.12); color: #7C3AED; font-weight: 800; font-size: 0.75rem; border: 1px solid rgba(147, 51, 234, 0.25);">
                      ⚡ {{ matchedGap.gapType || 'Celah Penelitian' }}
                    </span>
                    <span 
                      class="badge" 
                      :style="matchedGap.priority === 'High' ? 'background: rgba(239, 68, 68, 0.12); color: #DC2626; border: 1px solid rgba(239, 68, 68, 0.25); font-weight: 800;' : 'background: rgba(245, 158, 11, 0.12); color: #D97706; border: 1px solid rgba(245, 158, 11, 0.25); font-weight: 800;'"
                    >
                      Priority: {{ matchedGap.priority || 'Normal' }}
                    </span>
                    <span style="font-size: 0.75rem; font-weight: 700; color: #475569;">
                      Topik: {{ matchedGap.topic }}
                    </span>
                    <span style="font-size: 0.75rem; color: #64748B;">
                      (Gap ID: #{{ matchedGap.id }})
                    </span>
                  </div>
                  <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin: 0; line-height: 1.4;">
                    📄 {{ matchedGap.sourcePaperTitle || selectedPdf?.title }}
                  </h3>
                </div>

                <button 
                  type="button"
                  @click="isModalOpen = false"
                  style="background: #E2E8F0; border: none; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 1rem; color: #475569; cursor: pointer; flex-shrink: 0; transition: background 0.2s;"
                  title="Tutup Jendela"
                >
                  ✕
                </button>
              </div>

              <!-- Modal Body -->
              <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1.15rem;">
                <!-- 1. PERMASALAHAN UTAMA (Problem Statement) -->
                <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-left: 4px solid #2563EB; border-radius: 10px; padding: 1.1rem 1.25rem;">
                  <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.775rem; font-weight: 800; color: #1D4ED8; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.45rem;">
                    <span>📌</span> Permasalahan Utama (Problem Statement):
                  </div>
                  <p style="font-size: 0.925rem; color: #1E3A8A; margin: 0; line-height: 1.6; font-weight: 500;">
                    {{ matchedGap.problemStatement }}
                  </p>
                </div>

                <!-- 2. KONDISI RISET SAAT INI (Current State) -->
                <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 1rem 1.15rem;">
                  <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; font-weight: 800; color: #475569; text-transform: uppercase; margin-bottom: 0.35rem;">
                    <span>🔍</span> Kondisi Riset Saat Ini (Current State / Batasan Peneliti Sebelumnya):
                  </div>
                  <p style="font-size: 0.85rem; color: #334155; margin: 0; line-height: 1.55;">
                    {{ matchedGap.currentState || 'Belum ada catatan batasan spesifik dalam literatur.' }}
                  </p>
                </div>

                <!-- 3. PELUANG & CELAH DISERTASI (Future Opportunity / Novelty) -->
                <div style="background: #FEFCE8; border: 1px solid #FEF08A; border-left: 4px solid #EAB308; border-radius: 10px; padding: 1rem 1.15rem;">
                  <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; font-weight: 800; color: #854D0E; text-transform: uppercase; margin-bottom: 0.35rem;">
                    <span>⚡</span> Peluang & Celah yang Dijawab Disertasi Anda:
                  </div>
                  <p style="font-size: 0.875rem; color: #713F12; margin: 0; line-height: 1.55; font-weight: 500;">
                    {{ matchedGap.futureOpportunity || 'Menjadi celah pembuktian empiris yang diisi oleh model disertasi.' }}
                  </p>
                </div>
              </div>

              <!-- Modal Footer -->
              <div style="padding: 1rem 1.5rem; background: #F8FAFC; border-top: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;">
                <div style="font-size: 0.8rem; color: #64748B;">
                  Berkas PDF: <code style="background: #E2E8F0; padding: 0.2rem 0.4rem; border-radius: 4px;">{{ selectedPdf?.title }}</code>
                </div>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                  <NuxtLink
                    to="/research-gap"
                    class="btn btn-secondary btn-sm"
                    style="padding: 0.45rem 0.85rem; font-size: 0.8rem; text-decoration: none;"
                  >
                    Buka di Katalog Research Gap →
                  </NuxtLink>
                  <button
                    type="button"
                    @click="isModalOpen = false"
                    class="btn btn-primary btn-sm"
                    style="padding: 0.45rem 1rem; font-size: 0.8rem; cursor: pointer;"
                  >
                    Tutup & Kembali ke PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Teleport>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import Navbar from '~/components/Navbar.vue';
import type { ReferensiFolder, ReferensiPdf } from '~/data/referensiData';

const { data: apiData, pending, refresh } = await useFetch('/api/referensi');
const { data: gapApiResponse } = await useFetch<{ success: boolean; data?: any[] }>('/api/research-gap');

const isRefreshing = ref(false);
const showPdfIframe = ref(true);
const isModalOpen = ref(false);

onMounted(() => {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') isModalOpen.value = false;
  };
  window.addEventListener('keydown', onKeyDown);
  onUnmounted(() => {
    window.removeEventListener('keydown', onKeyDown);
  });
});

const allGaps = computed(() => gapApiResponse.value?.data || []);

const referensiCategories = computed<ReferensiFolder[]>(() => {
  return apiData.value?.categories || [];
});

const syncSource = computed(() => {
  return apiData.value?.source === 'gdrive_api' ? 'Google Drive Live' : 'Data Standar (Lokal)';
});

const activeCategory = ref<ReferensiFolder | null>(null);
const selectedPdf = ref<ReferensiPdf | null>(null);
const searchQuery = ref('');

function normalizeTitle(str: string): string {
  return (str || '')
    .toLowerCase()
    .replace(/\.pdf$/i, '')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function findMatchingGap(pdf: ReferensiPdf | null) {
  if (!pdf || !allGaps.value.length) return null;
  const pNorm = normalizeTitle(pdf.title);
  if (!pNorm) return null;

  return allGaps.value.find(g => {
    const gNorm = normalizeTitle(g.sourcePaperTitle);
    if (!gNorm) return false;
    if (pNorm === gNorm) return true;
    if (pNorm.includes(gNorm) && gNorm.length > 4) return true;
    if (gNorm.includes(pNorm) && pNorm.length > 4) return true;

    // Check token overlap
    const tokensP = pNorm.split(' ').filter(t => t.length >= 4);
    const tokensG = gNorm.split(' ').filter(t => t.length >= 4);
    const overlap = tokensP.filter(t => tokensG.includes(t));
    return overlap.length >= 3;
  }) || null;
}

const matchedGap = computed(() => {
  return findMatchingGap(selectedPdf.value);
});

const matchedPdfsCount = computed(() => {
  const allPdfs = referensiCategories.value.flatMap(c => c.files);
  return allPdfs.filter(p => findMatchingGap(p) !== null).length;
});

// Initialize activeCategory once data is available
watch(referensiCategories, (cats) => {
  if (cats.length > 0) {
    if (!activeCategory.value || !cats.find(c => c.id === activeCategory.value?.id)) {
      activeCategory.value = cats[0];
      selectedPdf.value = cats[0].files[0] || null;
    } else {
      const updatedActive = cats.find(c => c.id === activeCategory.value?.id);
      if (updatedActive) {
        activeCategory.value = updatedActive;
      }
    }
  }
}, { immediate: true });

const totalPdfCount = computed(() => {
  return referensiCategories.value.reduce((acc, cat) => acc + cat.files.length, 0);
});

const filteredFiles = computed(() => {
  if (!activeCategory.value) return [];
  if (!searchQuery.value.trim()) {
    return activeCategory.value.files;
  }
  const q = searchQuery.value.toLowerCase();
  return activeCategory.value.files.filter(f => f.title.toLowerCase().includes(q));
});

function selectCategory(cat: ReferensiFolder) {
  activeCategory.value = cat;
  searchQuery.value = '';
  if (cat.files.length > 0) {
    selectedPdf.value = cat.files[0];
  } else {
    selectedPdf.value = null;
  }
}

function selectPdf(pdf: ReferensiPdf) {
  selectedPdf.value = pdf;
}

function getCategoryBadge(name: string): string {
  const n = (name || '').toLowerCase();
  if (n.includes('00_') || n.includes('faudantion') || n.includes('foundation')) return '00';
  if (n.includes('01_') || n.includes('rq1')) return 'RQ1';
  if (n.includes('02_') || n.includes('rq2')) return 'RQ2';
  if (n.includes('03_') || n.includes('rq3')) return 'RQ3';
  if (n.includes('04_') || n.includes('rq4')) return 'RQ4';
  if (n.includes('05_') || n.includes('rq5')) return 'RQ5';
  return 'REF';
}

function getCategoryIcon(name: string): string {
  const n = (name || '').toLowerCase();
  if (n.includes('00_') || n.includes('faudantion') || n.includes('foundation')) return '🏛️';
  if (n.includes('01_') || n.includes('rq1')) return '🧠';
  if (n.includes('02_') || n.includes('rq2')) return '📡';
  if (n.includes('03_') || n.includes('rq3')) return '📊';
  if (n.includes('04_') || n.includes('rq4')) return '📹';
  if (n.includes('05_') || n.includes('rq5')) return '⚖️';
  return '📁';
}

function getCategoryTitle(cat: ReferensiFolder): string {
  if (cat.displayName) return cat.displayName;
  const n = (cat.name || '').toLowerCase();
  if (n.includes('00_') || n.includes('faudantion') || n.includes('foundation')) return '00. Foundation & Theory';
  if (n.includes('01_') || n.includes('rq1')) return 'RQ1: Behavioral Traces & Gating';
  if (n.includes('02_') || n.includes('rq2')) return 'RQ2: Infra Confounding';
  if (n.includes('03_') || n.includes('rq3')) return 'RQ3: Missingness Cluster';
  if (n.includes('04_') || n.includes('rq4')) return 'RQ4: Visual Observability';
  if (n.includes('05_') || n.includes('rq5')) return 'RQ5: Fair XAI & Acceptance';
  return cat.name;
}

async function handleRefresh() {
  isRefreshing.value = true;
  try {
    await $fetch('/api/referensi?refresh=true');
    await refresh();
  } catch (err) {
    console.error('Refresh error:', err);
  } finally {
    isRefreshing.value = false;
  }
}

watch(filteredFiles, (newFiles) => {
  if (newFiles.length > 0 && (!selectedPdf.value || !newFiles.find(f => f.id === selectedPdf.value?.id))) {
    selectedPdf.value = newFiles[0];
  }
});
</script>

<style scoped>
.subtabs-container {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scrollbar-width: thin;
}

.subtab-button {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.15rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-stroke);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.subtab-button:hover {
  background: var(--color-surface-secondary);
  color: var(--brand-lan-navy);
  border-color: var(--brand-lan-blue-light);
}

.subtab-button.active {
  background: var(--brand-lan-navy);
  color: #FFFFFF;
  border-color: var(--brand-lan-navy);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
}

.subtab-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.15rem 0.45rem;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.08);
}

.subtab-button.active .subtab-count {
  background: rgba(255, 255, 255, 0.2);
  color: #FFFFFF;
}

.referensi-grid {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 1.5rem;
}

@media (max-width: 992px) {
  .referensi-grid {
    grid-template-columns: 1fr;
  }
}

.pdf-list-card {
  height: fit-content;
  max-height: 720px;
  display: flex;
  flex-direction: column;
}

.pdf-items-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  max-height: 600px;
  padding-right: 0.25rem;
}

.pdf-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-stroke);
  background: var(--color-surface);
  cursor: pointer;
  transition: all 0.2s ease;
}

.pdf-item:hover {
  background: #F1F5F9;
  border-color: #CBD5E1;
}

.pdf-item.active {
  background: #EFF6FF;
  border-color: #3B82F6;
}

.pdf-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #FEE2E2;
  color: #DC2626;
  flex-shrink: 0;
}

.pdf-item.active .pdf-icon-wrapper {
  background: #3B82F6;
  color: #FFFFFF;
}

.pdf-item-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.pdf-item-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pdf-item-subtitle {
  font-size: 0.725rem;
  color: var(--color-text-secondary);
}

.pdf-active-indicator {
  padding: 0.2rem 0.5rem;
  background: #DBEAFE;
  color: #1D4ED8;
  font-size: 0.7rem;
  font-weight: 700;
  border-radius: 4px;
  flex-shrink: 0;
}

.viewer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: #F8FAFC;
  border-bottom: 1px solid var(--color-stroke);
}

.pdf-viewer-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  min-height: 600px;
}

.stat-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem 1rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.btn-drive-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  background: #2563EB;
  color: #FFFFFF;
  font-weight: 600;
  font-size: 0.85rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-drive-link:hover {
  background: #1D4ED8;
  color: #FFFFFF;
}

.btn-refresh-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  background: rgba(255, 255, 255, 0.12);
  color: #FFFFFF;
  font-weight: 600;
  font-size: 0.85rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-refresh-link:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.22);
}

.btn-refresh-link:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spin-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
