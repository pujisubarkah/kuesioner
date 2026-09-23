<template>
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <!-- Top Action & Connection Bar -->
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; background: var(--color-surface-card); padding: 1.25rem 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--color-stroke-secondary); box-shadow: var(--shadow-sm);">
      <div>
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
          <span class="section-badge" style="margin-bottom: 0;">Analisis Data Real-Time</span>
          <span v-if="isDbConnected" style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.75rem; font-weight: 700; color: #166534; background: #DCFCE7; padding: 0.2rem 0.6rem; border-radius: 999px; border: 1px solid #86EFAC;">
            <span style="width: 6px; height: 6px; border-radius: 50%; background: #22C55E;"></span>
            Database PostgreSQL Terhubung
          </span>
          <span v-else style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.75rem; font-weight: 700; color: #9A3412; background: #FFEDD5; padding: 0.2rem 0.6rem; border-radius: 999px; border: 1px solid #FDBA74;">
            <span style="width: 6px; height: 6px; border-radius: 50%; background: #F97316;"></span>
            Data Lokal / Offline
          </span>
          <span v-if="lastUpdated" style="font-size: 0.75rem; color: var(--color-text-muted);">
            • Diperbarui: {{ lastUpdated }}
          </span>
        </div>
        <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--color-text-primary);">Dashboard Hasil & Analisis Riset E-Learning ASN</h2>
        <p style="font-size: 0.875rem; color: var(--color-text-secondary);">
          Kompilasi data kuantitatif & ekspresi kualitatif responden ASN dari seluruh instansi dan wilayah Indonesia.
        </p>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: center;">
        <button class="btn btn-secondary" @click="$emit('refresh')" title="Muat ulang data terbaru dari database">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
          Refresh Data
        </button>

        <button class="btn btn-outline" @click="$emit('seed-mock')" title="Tambahkan 3 contoh respons sampel untuk simulasi">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          Muat Data Simulasi
        </button>

      </div>
    </div>

    <!-- Empty State if zero responses -->
    <div v-if="responses.length === 0" class="card" style="text-align: center; padding: 4rem 2rem;">
      <div style="width: 64px; height: 64px; background: var(--brand-lan-blue-light); color: var(--brand-lan-blue); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto;">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--color-text-primary); margin-bottom: 0.5rem;">Belum Ada Respon Kuesioner Terdata di Database</h3>
      <p style="font-size: 0.9rem; color: var(--color-text-secondary); max-width: 520px; margin: 0 auto 1.5rem auto; line-height: 1.6;">
        Database saat ini belum berisi pengisian kuesioner. Anda dapat mengklik "Form Kuesioner" untuk mengirimkan respon baru, atau mengklik tombol "Muat Data Simulasi" untuk pengujian visualisasi analytics.
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <NuxtLink to="/" class="btn btn-primary">
          Buka Form Kuesioner
        </NuxtLink>
        <button class="btn btn-secondary" @click="$emit('seed-mock')">
          Muat Data Simulasi Riset (3 Sampel)
        </button>
      </div>
    </div>

    <template v-else>
      <!-- Filter Bar -->
      <div class="card" style="padding: 1rem 1.25rem; margin-bottom: 0;">
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between;">
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; flex: 1;">
            <div style="font-weight: 700; font-size: 0.85rem; color: var(--color-text-secondary); display: flex; align-items: center; gap: 0.4rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Filter Data:
            </div>

            <!-- Filter Provinsi -->
            <select class="form-control" style="width: auto; font-size: 0.85rem; padding: 0.4rem 0.75rem;" v-model="filterProvince">
              <option value="">Semua Provinsi ({{ uniqueProvinces.length }})</option>
              <option v-for="prov in uniqueProvinces" :key="prov" :value="prov">{{ prov }}</option>
            </select>

            <!-- Filter Jenis Wilayah -->
            <select class="form-control" style="width: auto; font-size: 0.85rem; padding: 0.4rem 0.75rem;" v-model="filterAreaType">
              <option value="">Semua Jenis Wilayah</option>
              <option value="Perkotaan">Perkotaan</option>
              <option value="Perdesaan">Perdesaan</option>
              <option value="Wilayah terpencil">Wilayah Terpencil</option>
              <option value="Wilayah perbatasan">Wilayah Perbatasan</option>
              <option value="Wilayah kepulauan">Wilayah Kepulauan</option>
            </select>

            <!-- Filter Jenis Instansi -->
            <select class="form-control" style="width: auto; font-size: 0.85rem; padding: 0.4rem 0.75rem;" v-model="filterInstansi">
              <option value="">Semua Jenis Instansi</option>
              <option value="Kementerian/Lembaga">Kementerian / Lembaga</option>
              <option value="Pemerintah Provinsi">Pemerintah Provinsi</option>
              <option value="Pemerintah Kabupaten/Kota">Pemerintah Kabupaten / Kota</option>
            </select>

            <!-- Text Search Input -->
            <input 
              type="text" 
              class="form-control" 
              placeholder="Cari narasi / wilayah..." 
              style="width: 200px; font-size: 0.85rem; padding: 0.4rem 0.75rem;"
              v-model="searchQuery"
            />
          </div>

          <div style="font-size: 0.85rem; font-weight: 700; color: var(--brand-lan-navy);">
            Menampilkan: {{ filteredResponses.length }} dari {{ responses.length }} Responden
          </div>
        </div>
      </div>

      <!-- Mathematical Grounding Bridge Banner -->
      <div style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color: white; padding: 1rem 1.5rem; border-radius: var(--radius-lg); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border: 1px solid #334155; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span style="font-size: 1.5rem;">📐</span>
          <div>
            <div style="font-weight: 800; font-size: 0.95rem; color: #93C5FD;">Jembatan Empiris & Formulasi Formal CCBN</div>
            <div style="font-size: 0.8rem; color: #CBD5E1;">Seluruh temuan kendala ASN di bawah ini dipetakan secara matematis ke dalam 7 Blok Persamaan (Pers. 1–18c).</div>
          </div>
        </div>
        <NuxtLink to="/matematis" class="btn btn-primary" style="font-size: 0.825rem; padding: 0.45rem 1rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          Buka Formulasi Matematis CCBN
        </NuxtLink>
      </div>

      <!-- Key KPI Stats Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
        <div class="card" style="padding: 1.25rem; margin-bottom: 0; border-top: 4px solid var(--brand-lan-navy);">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase;">Total Responden</div>
          <div style="font-size: 2.25rem; font-weight: 800; color: var(--brand-lan-navy); margin-top: 0.2rem;">{{ filteredResponses.length }}</div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.1rem;">ASN Terdaftar</div>
        </div>

        <div class="card" style="padding: 1.25rem; margin-bottom: 0; border-top: 4px solid var(--brand-lan-blue);">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase;">Partisipasi E-Learning</div>
          <div style="font-size: 2.25rem; font-weight: 800; color: var(--brand-lan-blue); margin-top: 0.2rem;">{{ elearningRate }}%</div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.1rem;">Pernah ikut (Q6)</div>
        </div>

        <div class="card" style="padding: 1.25rem; margin-bottom: 0; border-top: 4px solid var(--brand-lan-gold-dark);">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase;">Beban Kerja Kedinasan</div>
          <div style="font-size: 2.25rem; font-weight: 800; color: var(--brand-lan-gold-dark); margin-top: 0.2rem;">{{ avgWorkload.toFixed(1) }} <span style="font-size: 1rem; color: var(--color-text-muted);">/ 5.0</span></div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.1rem;">Indikator Overlap Tugas (Q15)</div>
        </div>

        <div class="card" style="padding: 1.25rem; margin-bottom: 0; border-top: 4px solid #EF4444;">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase;">Frekuensi Gangguan</div>
          <div style="font-size: 2.25rem; font-weight: 800; color: #DC2626; margin-top: 0.2rem;">{{ avgDisruption.toFixed(1) }} <span style="font-size: 1rem; color: var(--color-text-muted);">/ 5.0</span></div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.1rem;">Rata-rata Gangguan Teknis (Q12)</div>
        </div>

        <div class="card" style="padding: 1.25rem; margin-bottom: 0; border-top: 4px solid #8B5CF6;">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase;">Perangkat Dominan</div>
          <div style="font-size: 1.25rem; font-weight: 800; color: var(--color-text-primary); margin-top: 0.5rem;">{{ topDevice }}</div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.1rem;">Sarana Pembelajaran (Q9)</div>
        </div>
      </div>

      <!-- Navigation Tabs for Analytics Sections -->
      <div style="display: flex; gap: 0.5rem; border-bottom: 2px solid var(--color-stroke-secondary); overflow-x: auto; padding-bottom: 0.25rem;">
        <button 
          v-for="tab in dashboardTabs" 
          :key="tab.id"
          class="tab-button"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <component :is="tab.icon" style="width: 16px; height: 16px;" />
          {{ tab.label }}
        </button>
      </div>

      <!-- TAB 1: Demografi & Profil ASN -->
      <div v-if="activeTab === 'demografi'" style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--color-text-primary); margin: 0;">
              Sebaran Demografi & Lokasi Tugas ASN
            </h3>
            <NuxtLink to="/matematis#blok-1" class="math-bridge-pill" title="Lihat bagaimana wilayah ini dikluster dalam Persamaan (2a)">
              📐 Persamaan (2a): Klaster Spasial K_i
            </NuxtLink>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            <!-- Provinsi -->
            <div>
              <h4 class="sub-chart-title">Sebaran Provinsi (Q1)</h4>
              <div v-for="(count, prov) in provinceBreakdown" :key="prov" style="margin-bottom: 0.6rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.2rem;">
                  <span>{{ prov }}</span>
                  <span>{{ count }} ASN ({{ Math.round((count / filteredResponses.length) * 100) }}%)</span>
                </div>
                <div class="progress-bar-bg">
                  <div class="progress-bar-fill" :style="{ width: `${(count / filteredResponses.length) * 100}%`, background: 'var(--brand-lan-navy)' }"></div>
                </div>
              </div>
            </div>

            <!-- Jenis Wilayah -->
            <div>
              <h4 class="sub-chart-title">Karakteristik Jenis Wilayah (Q2)</h4>
              <div v-for="(count, area) in areaTypeBreakdown" :key="area" style="margin-bottom: 0.6rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.2rem;">
                  <span>{{ area }}</span>
                  <span>{{ count }} ASN ({{ Math.round((count / filteredResponses.length) * 100) }}%)</span>
                </div>
                <div class="progress-bar-bg">
                  <div class="progress-bar-fill" :style="{ width: `${(count / filteredResponses.length) * 100}%`, background: 'var(--brand-lan-blue)' }"></div>
                </div>
              </div>
            </div>

            <!-- Jenis Instansi -->
            <div>
              <h4 class="sub-chart-title">Jenis Instansi (Q3)</h4>
              <div v-for="(count, inst) in instansiBreakdown" :key="inst" style="margin-bottom: 0.6rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.2rem;">
                  <span>{{ inst }}</span>
                  <span>{{ count }} ASN ({{ Math.round((count / filteredResponses.length) * 100) }}%)</span>
                </div>
                <div class="progress-bar-bg">
                  <div class="progress-bar-fill" :style="{ width: `${(count / filteredResponses.length) * 100}%`, background: 'var(--brand-lan-gold-dark)' }"></div>
                </div>
              </div>
            </div>

            <!-- Kelompok Usia & Lama Kerja -->
            <div>
              <h4 class="sub-chart-title">Kelompok Usia (Q4)</h4>
              <div v-for="(count, age) in ageBreakdown" :key="age" style="margin-bottom: 0.6rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.2rem;">
                  <span>{{ age }} tahun</span>
                  <span>{{ count }} ASN</span>
                </div>
                <div class="progress-bar-bg">
                  <div class="progress-bar-fill" :style="{ width: `${(count / filteredResponses.length) * 100}%`, background: '#8B5CF6' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 2: Perangkat & Konektivitas -->
      <div v-if="activeTab === 'perangkat'" style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--color-text-primary); margin: 0;">
              Perangkat, Lokasi Belajar & Sumber Internet ASN
            </h3>
            <NuxtLink to="/matematis#blok-1" class="math-bridge-pill" title="Lihat formula kualitas jaringan N_it & rasio missingness m_it">
              📐 Persamaan (2b & 3): Sinyal N_it & Missingness m_it
            </NuxtLink>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            <!-- Q9 Main Device -->
            <div>
              <h4 class="sub-chart-title">Perangkat Utama diguanakan (Q9)</h4>
              <div v-for="(count, dev) in deviceBreakdown" :key="dev" style="margin-bottom: 0.6rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.2rem;">
                  <span>{{ dev }}</span>
                  <span>{{ count }} ASN ({{ Math.round((count / filteredResponses.length) * 100) }}%)</span>
                </div>
                <div class="progress-bar-bg">
                  <div class="progress-bar-fill" :style="{ width: `${(count / filteredResponses.length) * 100}%`, background: 'var(--brand-lan-blue)' }"></div>
                </div>
              </div>
            </div>

            <!-- Q10 Learning Locations -->
            <div>
              <h4 class="sub-chart-title">Lokasi Mengikuti Pembelajaran (Q10 - Multi)</h4>
              <div v-for="(count, loc) in locationBreakdown" :key="loc" style="margin-bottom: 0.6rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.2rem;">
                  <span>{{ loc }}</span>
                  <span>{{ count }} Kali dipilih</span>
                </div>
                <div class="progress-bar-bg">
                  <div class="progress-bar-fill" :style="{ width: `${(count / filteredResponses.length) * 100}%`, background: 'var(--brand-lan-navy)' }"></div>
                </div>
              </div>
            </div>

            <!-- Q11 Internet Sources -->
            <div>
              <h4 class="sub-chart-title">Sumber Akses Internet (Q11 - Multi)</h4>
              <div v-for="(count, src) in internetBreakdown" :key="src" style="margin-bottom: 0.6rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.2rem;">
                  <span>{{ src }}</span>
                  <span>{{ count }} Kali dipilih</span>
                </div>
                <div class="progress-bar-bg">
                  <div class="progress-bar-fill" :style="{ width: `${(count / filteredResponses.length) * 100}%`, background: 'var(--brand-lan-gold-dark)' }"></div>
                </div>
              </div>
            </div>

            <!-- Q13 Disruption Types -->
            <div>
              <h4 class="sub-chart-title">Jenis Gangguan Teknis dialami (Q13 - Multi)</h4>
              <div v-for="(count, dis) in disruptionTypeBreakdown" :key="dis" style="margin-bottom: 0.6rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.2rem;">
                  <span>{{ dis }}</span>
                  <span>{{ count }} Laporan</span>
                </div>
                <div class="progress-bar-bg">
                  <div class="progress-bar-fill" :style="{ width: `${(count / filteredResponses.length) * 100}%`, background: '#EF4444' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 3: Dinamika Kedinasan & Synchronous Zoom -->
      <div v-if="activeTab === 'kedinasan'" style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- Section D & E Likert Means -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem;">
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--color-text-primary); margin: 0;">
              Dinamika Pekerjaan, Beban Kerja & Dukungan Atasan (Skala 1-5)
            </h3>
            <NuxtLink to="/matematis#blok-3" class="math-bridge-pill" title="Lihat bagaimana beban kerja dihitung dalam Persamaan (8) CB_iat">
              📐 Persamaan (8 & 9): Beban Kerja CB_iat & Reward
            </NuxtLink>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
            <div v-for="item in likertMetrics" :key="item.code" style="background: var(--color-surface-secondary); padding: 1.1rem; border-radius: var(--radius-md); border: 1px solid var(--color-stroke-secondary);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                <span style="font-weight: 800; font-size: 0.8rem; background: var(--brand-lan-navy); color: white; padding: 0.15rem 0.5rem; border-radius: 4px;">{{ item.code }}</span>
                <span style="font-size: 1.35rem; font-weight: 800; color: var(--brand-lan-navy);">{{ item.mean.toFixed(1) }} <span style="font-size: 0.8rem; color: var(--color-text-muted);">/ 5.0</span></span>
              </div>
              <p style="font-size: 0.85rem; font-weight: 600; color: var(--color-text-primary); line-height: 1.4;">{{ item.text }}</p>
            </div>
          </div>
        </div>

        <!-- Synchronous Zoom Matrix breakdown -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.75rem;">
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--color-text-primary); margin: 0;">
              Dinamika Perilaku Pembelajaran Synchronous / Zoom / Google Meet (Q33)
            </h3>
            <NuxtLink to="/matematis#blok-5" class="math-bridge-pill" title="Lihat proteksi fusi kamera non-diskriminatif pada Persamaan (10)">
              📐 Persamaan (10): Fusi Gated Kamera w(S, q_vis)
            </NuxtLink>
          </div>
          <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 1.25rem;">
            Persentase frekuensi perilaku ASN saat menghadiri webinar synchronous (Skala 1 = Tidak Pernah s.d. 5 = Selalu):
          </p>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div v-for="syncItem in syncMatrixBreakdown" :key="syncItem.item" style="border-bottom: 1px solid var(--color-stroke-secondary); padding-bottom: 0.75rem;">
              <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 0.9rem; color: var(--color-text-primary); margin-bottom: 0.4rem;">
                <span>{{ syncItem.item }}</span>
                <span>Rata-rata: {{ syncItem.avg.toFixed(1) }} / 5.0</span>
              </div>
              <div style="display: flex; height: 12px; border-radius: 6px; overflow: hidden; background: var(--color-stroke-secondary);">
                <div title="1: Tidak pernah" :style="{ width: `${syncItem.percents[1]}%`, background: '#22C55E' }"></div>
                <div title="2: Jarang" :style="{ width: `${syncItem.percents[2]}%`, background: '#84CC16' }"></div>
                <div title="3: Kadang" :style="{ width: `${syncItem.percents[3]}%`, background: '#EAB308' }"></div>
                <div title="4: Sering" :style="{ width: `${syncItem.percents[4]}%`, background: '#F97316' }"></div>
                <div title="5: Selalu" :style="{ width: `${syncItem.percents[5]}%`, background: '#EF4444' }"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.725rem; color: var(--color-text-muted); margin-top: 0.2rem;">
                <span>1 (Tidak pernah): {{ syncItem.percents[1] }}%</span>
                <span>3 (Kadang): {{ syncItem.percents[3] }}%</span>
                <span>5 (Selalu): {{ syncItem.percents[5] }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 4: Suara Lapangan & Narasi Kualitatif -->
      <div v-if="activeTab === 'kualitatif'" style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div class="card" style="border-left: 5px solid var(--brand-lan-gold);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem;">
            <div>
              <span class="gold-question-tag">Eksplorasi Kualitatif Responden ASN</span>
              <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--color-text-primary);">Suara Lapangan & Narasi Terbuka (Gold Questions)</h3>
            </div>

            <select class="form-control" style="width: auto; font-size: 0.85rem;" v-model="selectedQualitativeQ">
              <option value="q_31">Q31: Kondisi Khusus Tempat Penugasan (Spatial Context)</option>
              <option value="q_14">Q14: Pengalaman Paling Mengganggu saat E-Learning</option>
              <option value="q_29">Q29: Masalah Terbesar saat Pelatihan Online</option>
              <option value="q_30">Q30: Hal yang Ingin Diubah dari Sistem Pelatihan</option>
              <option value="q_32">Q32: Perspektif yang Belum Dipahami Penyelenggara</option>
            </select>
          </div>

          <div v-if="currentQualitativeAnswers.length === 0" style="text-align: center; padding: 2.5rem; color: var(--color-text-secondary);">
            Tidak ditemukan jawaban untuk kategori atau kata kunci pencarian ini.
          </div>

          <div v-else style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
            <div 
              v-for="(ans, idx) in currentQualitativeAnswers" 
              :key="idx"
              style="background: var(--brand-lan-gold-subtle); border: 1px solid #FDE68A; padding: 1.15rem; border-radius: var(--radius-md);"
            >
              <div style="display: flex; justify-content: space-between; font-size: 0.775rem; font-weight: 700; color: var(--brand-lan-gold-dark); margin-bottom: 0.4rem; flex-wrap: wrap; gap: 0.4rem;">
                <span>ASN #{{ idx + 1 }} • {{ ans.province }} ({{ ans.regency }})</span>
                <span>Instansi: {{ ans.instansi }} | Usia: {{ ans.age }}</span>
              </div>
              <div style="font-size: 0.95rem; font-style: italic; color: #78350F; line-height: 1.6;">
                "{{ ans.text }}"
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 5: Tabel Data Mentah Database -->
      <div v-if="activeTab === 'raw'" style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div class="card" style="padding: 1.25rem;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--color-text-primary); margin-bottom: 1rem;">
            Tabel Data Mentah Database ({{ filteredResponses.length }} Data)
          </h3>

          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.825rem; text-align: left;">
              <thead>
                <tr style="background: var(--color-surface-secondary); border-bottom: 2px solid var(--color-stroke-secondary);">
                  <th style="padding: 0.75rem;">ID Response</th>
                  <th style="padding: 0.75rem;">Waktu Submit</th>
                  <th style="padding: 0.75rem;">Provinsi</th>
                  <th style="padding: 0.75rem;">Kabupaten/Kota</th>
                  <th style="padding: 0.75rem;">Wilayah</th>
                  <th style="padding: 0.75rem;">Instansi</th>
                  <th style="padding: 0.75rem;">Perangkat</th>
                  <th style="padding: 0.75rem;">Beban (Q15)</th>
                  <th style="padding: 0.75rem;">Gangguan (Q12)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="res in filteredResponses" :key="res.id" style="border-bottom: 1px solid var(--color-stroke-secondary);">
                  <td style="padding: 0.75rem; font-weight: 700; font-family: monospace;">{{ res.id }}</td>
                  <td style="padding: 0.75rem; color: var(--color-text-muted);">{{ formatDate(res.timestamp) }}</td>
                  <td style="padding: 0.75rem; font-weight: 600;">{{ res.province }}</td>
                  <td style="padding: 0.75rem;">{{ res.regency }}</td>
                  <td style="padding: 0.75rem;">{{ res.answers['q_2'] || '-' }}</td>
                  <td style="padding: 0.75rem;">{{ res.answers['q_3'] || '-' }}</td>
                  <td style="padding: 0.75rem;">{{ res.answers['q_9'] || '-' }}</td>
                  <td style="padding: 0.75rem; font-weight: 700;">{{ res.answers['q_15'] || '-' }} / 5</td>
                  <td style="padding: 0.75rem; font-weight: 700; color: #DC2626;">{{ res.answers['q_12'] || '-' }} / 5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- TAB 6: Model Disertasi & Network Graph (Multimodal Fusion & Spatial Moderation) -->
      <div v-if="activeTab === 'model-analitik'" style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Network Analytic Graph for Suara Lapangan -->
        <NetworkGraph :responses="filteredResponses" />

        <!-- 5-Pillar Architecture & Live Empirical Index Model -->
        <DissertationModelViewer :responses="filteredResponses" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue';
import type { SurveyResponse } from '~/composables/useSurvey';
import NetworkGraph from '~/components/NetworkGraph.vue';
import DissertationModelViewer from '~/components/DissertationModelViewer.vue';

const props = withDefaults(defineProps<{
  responses: SurveyResponse[];
  isDbConnected?: boolean;
  lastUpdated?: string;
}>(), {
  isDbConnected: false,
  lastUpdated: ''
});

defineEmits<{
  (e: 'refresh'): void;
  (e: 'seed-mock'): void;
  (e: 'export-json'): void;
  (e: 'export-csv'): void;
}>();

// Filter States
const filterProvince = ref('');
const filterAreaType = ref('');
const filterInstansi = ref('');
const searchQuery = ref('');

const activeTab = ref<'demografi' | 'perangkat' | 'kedinasan' | 'kualitatif' | 'model-analitik' | 'raw'>('demografi');
const selectedQualitativeQ = ref<'q_14' | 'q_29' | 'q_30' | 'q_31' | 'q_32'>('q_31');

// Tab Configuration Icons
const dashboardTabs = [
  { id: 'demografi', label: 'Profil & Demografi', icon: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }), h('circle', { cx: '9', cy: '7', r: '4' })]) },
  { id: 'perangkat', label: 'Perangkat & Konektivitas', icon: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('rect', { x: '2', y: '3', width: '20', height: '14', rx: '2' }), h('line', { x1: '8', y1: '21', x2: '16', y2: '21' })]) },
  { id: 'kedinasan', label: 'Beban Tugas & Zoom', icon: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('rect', { x: '2', y: '7', width: '20', height: '14', rx: '2' }), h('path', { d: 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' })]) },
  { id: 'kualitatif', label: 'Suara Lapangan (Narasi)', icon: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' })]) },
  { id: 'model-analitik', label: 'Model Disertasi & Graph', icon: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('circle', { cx: '18', cy: '5', r: '3' }), h('circle', { cx: '6', cy: '12', r: '3' }), h('circle', { cx: '18', cy: '19', r: '3' }), h('line', { x1: '8.59', y1: '13.51', x2: '15.42', y2: '17.49' }), h('line', { x1: '15.41', y1: '6.51', x2: '8.59', y2: '10.49' })]) },
  { id: 'raw', label: 'Tabel Data Mentah', icon: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2' }), h('line', { x1: '3', y1: '9', x2: '21', y2: '9' }), h('line', { x1: '3', y1: '15', x2: '21', y2: '15' })]) }
];

// Unique Provinces for filter dropdown
const uniqueProvinces = computed(() => {
  const provs = new Set<string>();
  props.responses.forEach(r => {
    if (r.province) provs.add(r.province);
  });
  return Array.from(provs).sort();
});

// Filtered Responses
const filteredResponses = computed(() => {
  return props.responses.filter(r => {
    if (filterProvince.value && r.province !== filterProvince.value) return false;
    if (filterAreaType.value && r.answers['q_2'] !== filterAreaType.value) return false;
    if (filterInstansi.value && r.answers['q_3'] !== filterInstansi.value) return false;
    
    if (searchQuery.value.trim() !== '') {
      const q = searchQuery.value.toLowerCase();
      const textConcat = [
        r.province,
        r.regency,
        r.answers['q_2'],
        r.answers['q_3'],
        r.answers['q_14'],
        r.answers['q_29'],
        r.answers['q_30'],
        r.answers['q_31'],
        r.answers['q_32']
      ].join(' ').toLowerCase();

      if (!textConcat.includes(q)) return false;
    }

    return true;
  });
});

// Key KPI Computations
const elearningRate = computed(() => {
  if (filteredResponses.value.length === 0) return 0;
  const count = filteredResponses.value.filter(r => r.answers['q_6'] === 'Ya').length;
  return Math.round((count / filteredResponses.value.length) * 100);
});

const avgWorkload = computed(() => {
  if (filteredResponses.value.length === 0) return 0;
  const sum = filteredResponses.value.reduce((acc, r) => acc + (Number(r.answers['q_15']) || 0), 0);
  return sum / filteredResponses.value.length;
});

const avgDisruption = computed(() => {
  if (filteredResponses.value.length === 0) return 0;
  const sum = filteredResponses.value.reduce((acc, r) => acc + (Number(r.answers['q_12']) || 0), 0);
  return sum / filteredResponses.value.length;
});

const topDevice = computed(() => {
  if (filteredResponses.value.length === 0) return '-';
  const counts: Record<string, number> = {};
  filteredResponses.value.forEach(r => {
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

// Breakdowns
const provinceBreakdown = computed(() => getBreakdown('province'));
const areaTypeBreakdown = computed(() => getAnswerBreakdown('q_2'));
const instansiBreakdown = computed(() => getAnswerBreakdown('q_3'));
const ageBreakdown = computed(() => getAnswerBreakdown('q_4'));
const deviceBreakdown = computed(() => getAnswerBreakdown('q_9'));

const locationBreakdown = computed(() => getMultiAnswerBreakdown('q_10'));
const internetBreakdown = computed(() => getMultiAnswerBreakdown('q_11'));
const disruptionTypeBreakdown = computed(() => getMultiAnswerBreakdown('q_13'));

function getBreakdown(key: 'province' | 'regency') {
  const counts: Record<string, number> = {};
  filteredResponses.value.forEach(r => {
    const val = r[key] || 'Belum diisi';
    counts[val] = (counts[val] || 0) + 1;
  });
  return counts;
}

function getAnswerBreakdown(qKey: string) {
  const counts: Record<string, number> = {};
  filteredResponses.value.forEach(r => {
    const val = r.answers[qKey] || 'Belum diisi';
    counts[val] = (counts[val] || 0) + 1;
  });
  return counts;
}

function getMultiAnswerBreakdown(qKey: string) {
  const counts: Record<string, number> = {};
  filteredResponses.value.forEach(r => {
    const arr = r.answers[qKey];
    if (Array.isArray(arr)) {
      arr.forEach(item => {
        counts[item] = (counts[item] || 0) + 1;
      });
    }
  });
  return counts;
}

// Likert Metrics (Q15 - Q19)
const likertMetrics = computed(() => {
  const items = [
    { code: 'Q15', text: 'Tetap harus menjalankan pekerjaan kedinasan saat pelatihan', key: 'q_15' },
    { code: 'Q16', text: 'Sering menghentikan/meninggalkan pembelajaran karena dinas', key: 'q_16' },
    { code: 'Q17', text: 'Memiliki waktu yang cukup menyelesaikan materi dan tugas', key: 'q_17' },
    { code: 'Q18', text: 'Atasan/unit kerja memberikan waktu yang cukup', key: 'q_18' },
    { code: 'Q19', text: 'Sering berpindah lokasi karena tuntutan pekerjaan', key: 'q_19' },
    { code: 'Q20', text: 'Materi dapat diakses dengan mudah di perangkat', key: 'q_20' },
    { code: 'Q24', text: 'Format pembelajaran sesuai kondisi ASN yang tetap bekerja', key: 'q_24' }
  ];

  return items.map(item => {
    let sum = 0;
    let count = 0;
    filteredResponses.value.forEach(r => {
      const val = Number(r.answers[item.key]);
      if (val > 0) {
        sum += val;
        count++;
      }
    });
    return {
      ...item,
      mean: count > 0 ? sum / count : 0
    };
  });
});

// Synchronous Q33 Breakdown
const syncMatrixBreakdown = computed(() => {
  const syncItems = [
    'Menyalakan kamera',
    'Mematikan kamera',
    'Menggunakan smartphone',
    'Mengikuti sambil melakukan pekerjaan lain',
    'Berpindah tempat selama sesi',
    'Mengalami koneksi terputus'
  ];

  return syncItems.map(item => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let sum = 0;
    let total = 0;

    filteredResponses.value.forEach(r => {
      const matrix = r.answers['q_33'] || {};
      const score = Number(matrix[item]) || 0;
      if (score >= 1 && score <= 5) {
        counts[score] = (counts[score] || 0) + 1;
        sum += score;
        total++;
      }
    });

    const percents: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    if (total > 0) {
      for (let i = 1; i <= 5; i++) {
        percents[i] = Math.round((counts[i] / total) * 100);
      }
    }

    return {
      item,
      avg: total > 0 ? sum / total : 0,
      counts,
      percents
    };
  });
});

// Qualitative Answers
const currentQualitativeAnswers = computed(() => {
  const qKey = selectedQualitativeQ.value;
  return filteredResponses.value
    .filter(r => r.answers[qKey] && r.answers[qKey].trim() !== '' && r.answers[qKey] !== '...')
    .map(r => ({
      province: r.province || 'Unknown',
      regency: r.regency || 'Unknown',
      instansi: r.answers['q_3'] || 'ASN',
      age: r.answers['q_4'] || '-',
      text: r.answers[qKey]
    }));
});

function formatDate(isoStr: string) {
  if (!isoStr) return '-';
  try {
    const d = new Date(isoStr);
    return d.toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });
  } catch (e) {
    return isoStr;
  }
}
</script>

<style scoped>
.tab-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  border-bottom: 3px solid transparent;
}

.tab-button:hover {
  color: var(--brand-lan-navy);
  background: var(--color-surface-secondary);
}

.tab-button.active {
  color: var(--brand-lan-navy);
  background: var(--color-surface-card);
  border-bottom-color: var(--brand-lan-navy);
}

.sub-chart-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  margin-bottom: 0.75rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--color-stroke-secondary);
}

.progress-bar-bg {
  height: 8px;
  background: var(--color-surface-secondary);
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.4s ease;
}

.math-bridge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  color: #1D4ED8;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
}

.math-bridge-pill:hover {
  background: #2563EB;
  color: #FFFFFF;
  border-color: #2563EB;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.2);
}
</style>
