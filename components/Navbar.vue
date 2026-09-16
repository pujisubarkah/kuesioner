<template>
  <header class="navbar">
    <!-- Top Bar -->
    <div class="navbar-top-bar">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #22C55E;"></span>
        <span>RISET MANDIRI • KUESIONER PEMBELAJARAN DIGITAL ASN</span>
      </div>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span style="font-size: 0.75rem; opacity: 0.85; font-weight: 500;">
          Instrumen Penelitian Akademis
        </span>
      </div>
    </div>

    <!-- Main Header -->
    <div class="navbar-content" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
      <div class="logo-group">
        <div class="logo-badge-lan" style="background: var(--brand-lan-navy);">
          <span class="logo-badge-emblem" style="background: var(--brand-lan-blue);">ASN</span>
          <span class="logo-badge-text">RISET</span>
        </div>
        <div class="logo-text">
          <h1>Kuesioner Pembelajaran Digital ASN</h1>
          <p>Riset Konteks, Perangkat & Kendala Kedinasan E-Learning</p>
        </div>
      </div>

      <!-- Navigation Tabs (Hanya ditampilkan pada halaman internal riset, disembunyikan untuk responden pada halaman /) -->
      <nav v-if="!isRespondentView" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <NuxtLink 
          to="/" 
          class="nav-tab" 
          active-class="active"
          exact
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          Form Sinyal Bukti
        </NuxtLink>

        <NuxtLink 
          to="/hasil-survey/sementara" 
          class="nav-tab" 
          active-class="active"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          Data Baseline
        </NuxtLink>

        <NuxtLink 
          to="/referensi" 
          class="nav-tab" 
          active-class="active"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          Referensi
        </NuxtLink>

        <NuxtLink 
          to="/research-gap" 
          class="nav-tab" 
          active-class="active"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/></svg>
          Research Gap
        </NuxtLink>

        <NuxtLink 
          to="/dataset-hub" 
          class="nav-tab" 
          active-class="active"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
          Dataset Telemetri
        </NuxtLink>

        <NuxtLink 
          to="/model" 
          class="nav-tab" 
          active-class="active"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          Model & Algoritma CCBN
        </NuxtLink>

        <NuxtLink 
          to="/analisis" 
          class="nav-tab" 
          active-class="active"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/><line x1="19" y1="6" x2="19" y2="18"/></svg>
          Simulator Fair-LinUCB
        </NuxtLink>

        <NuxtLink 
          to="/validasi-pakar" 
          class="nav-tab" 
          active-class="active"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          Validasi Pakar
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isRespondentView = computed(() => route.path === '/');
</script>

<style scoped>
.nav-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  background: var(--color-surface-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid var(--color-stroke-secondary);
}

.nav-tab:hover {
  color: var(--brand-lan-navy);
  background: #E0E7FF;
}

.nav-tab.active {
  color: #FFFFFF;
  background: var(--brand-lan-navy);
  border-color: var(--brand-lan-navy);
  box-shadow: var(--shadow-sm);
}
</style>


