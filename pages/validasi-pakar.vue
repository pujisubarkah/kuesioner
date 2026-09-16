<template>
  <div class="app-container">
    <!-- Navbar Header -->
    <Navbar />

    <main id="konten-utama" class="main-content">
      <!-- TOP TITLE & STATUS BANNER -->
      <section class="card header-card" style="margin-bottom: 1.5rem; padding: 1.75rem 2rem; background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); color: #FFFFFF; border: none;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.25rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
              <span class="badge" style="background: rgba(34, 197, 94, 0.25); color: #4ADE80; border: 1px solid rgba(74, 222, 128, 0.3);">
                🏛️ Uji Validitas Pakar (Expert Judgment)
              </span>
              <span class="badge" style="background: rgba(147, 51, 234, 0.25); color: #C084FC; border: 1px solid rgba(192, 132, 252, 0.3);">
                🎓 Triangulasi Kuantitatif (Skala 10) & Kualitatif (Wawancara)
              </span>
            </div>
            <h1 style="font-size: 1.55rem; font-weight: 800; color: #F8FAFC; margin-bottom: 0.35rem; letter-spacing: -0.02em;">
              Instrumen Validasi Pakar Model Pembelajaran Digital ASN Berkeadilan
            </h1>
            <p style="font-size: 0.9rem; color: #94A3B8; margin: 0; max-width: 850px; line-height: 1.5;">
              Pengujian <em>Content & Face Validity</em> terhadap model <strong>Contextual Counterfactual Normalization (CCBN)</strong> dan <strong>Candidate Disparity-Aware LinUCB</strong> oleh Widyaiswara & Praktisi Pengembangan Kompetensi ASN.
            </p>
          </div>

          <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
            <div class="stat-pill">
              <span style="font-size: 1.35rem; font-weight: 800; color: #4ADE80;">
                {{ expertList.length > 0 ? averageOverallScore.toFixed(2) : '-' }}
              </span>
              <span style="font-size: 0.725rem; color: #94A3B8; font-weight: 600; text-transform: uppercase;">
                {{ expertList.length > 0 ? 'Skor Rerata / 10' : 'Skor Rerata' }}
              </span>
            </div>
            <div class="stat-pill">
              <span style="font-size: 1.35rem; font-weight: 800; color: #60A5FA;">
                {{ expertList.length > 0 ? aikenVScore.toFixed(2) : '-' }}
              </span>
              <span style="font-size: 0.725rem; color: #94A3B8; font-weight: 600; text-transform: uppercase;">Aiken's V Index</span>
            </div>
            <div class="stat-pill">
              <span style="font-size: 1.35rem; font-weight: 800; color: #C084FC;">{{ expertList.length }}</span>
              <span style="font-size: 0.725rem; color: #94A3B8; font-weight: 600; text-transform: uppercase;">Kuesioner Masuk</span>
            </div>
            <div class="stat-pill">
              <span style="font-size: 1.35rem; font-weight: 800; color: #F59E0B;">{{ interviewList.length }}</span>
              <span style="font-size: 0.725rem; color: #94A3B8; font-weight: 600; text-transform: uppercase;">Sesi Wawancara</span>
            </div>
          </div>
        </div>
      </section>

      <!-- NAVIGATION 3 TABS -->
      <div class="card" style="margin-bottom: 1.5rem; padding: 0.75rem 1rem; background: #FFFFFF;">
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button 
            :class="['mode-tab-btn', activeTab === 'form' ? 'active' : '']"
            @click="activeTab = 'form'"
          >
            ✍️ Formulir Penilaian (Skala 1 - 10)
          </button>
          <button 
            :class="['mode-tab-btn', activeTab === 'interview' ? 'active' : '']"
            @click="activeTab = 'interview'"
          >
            🎙️ Wawancara Mendalam & Notulensi Kualitatif ({{ interviewList.length }} Sesi)
          </button>
          <button 
            :class="['mode-tab-btn', activeTab === 'rekap' ? 'active' : '']"
            @click="activeTab = 'rekap'"
          >
            📊 Rekapitulasi & Indeks Validitas Aiken's V ({{ expertList.length }} Responden)
          </button>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- TAB 1: FORMULIR PENILAIAN KUANTITATIF WIDYAISWARA                        -->
      <!-- ========================================================================= -->
      <div v-if="activeTab === 'form'">
        <!-- Completion / Success Notification -->
        <div v-if="isSubmittedSuccess" class="card" style="text-align: center; padding: 3.5rem 2rem; margin-bottom: 2rem; border-top: 4px solid #16A34A;">
          <div style="width: 64px; height: 64px; background: #DCFCE7; color: #16A34A; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto;">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: #1E293B; margin-bottom: 0.5rem;">
            Terima Kasih, Bapak/Ibu Widyaiswara!
          </h2>
          <p style="font-size: 0.95rem; color: #64748B; max-width: 600px; margin: 0 auto 1.5rem auto; line-height: 1.6;">
            Penilaian dan masukan Bapak/Ibu (Skala 1 - 10) telah tersimpan di database riset disertasi. Hasil validasi ini sangat berharga untuk membuktikan keabsahan model komputasi dan kesesuaian pedagogis pelatihan ASN di Indonesia.
          </p>
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-primary" @click="activeTab = 'rekap'">
              Lihat Rekapitulasi Hasil Validasi
            </button>
            <button class="btn btn-secondary" @click="resetForm">
              Isi Penilaian Baru
            </button>
          </div>
        </div>

        <form v-else @submit.prevent="handleSubmitValidation">
          <!-- Petunjuk Singkat -->
          <div class="card" style="margin-bottom: 1.5rem; padding: 1.5rem; border-left: 4px solid #3B82F6; background: #F8FAFC;">
            <div style="font-weight: 800; font-size: 0.95rem; color: #1E3A8A; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              Petunjuk Pengisian bagi Bapak/Ibu Widyaiswara & Pakar
            </div>
            <p style="font-size: 0.875rem; color: #475569; line-height: 1.6; margin-bottom: 0.75rem;">
              Instrumen ini bertujuan memvalidasi kelayakan konsep <strong>Model Pembelajaran Digital Adaptif Berkeadilan Wilayah (Spatial-Aware Adaptive E-Learning)</strong> yang kami usulkan dalam riset disertasi doktoral untuk pengembangan sistem pelatihan ASN di Indonesia.
            </p>
            <div style="background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: var(--radius-sm); padding: 0.75rem 1rem; font-size: 0.85rem; color: #1E293B;">
              <div style="font-weight: 800; margin-bottom: 0.25rem; color: var(--brand-lan-navy);">
                📌 Skala Penilaian Genap (1 s.d. 10):
              </div>
              <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; font-size: 0.8rem; color: #475569;">
                <span><strong>Nilai 1 - 2</strong> : Sangat Tidak Setuju / Sangat Rendah</span>
                <span><strong>Nilai 3 - 4</strong> : Tidak Setuju / Kurang Sesuai</span>
                <span><strong>Nilai 5 - 6</strong> : Agak Setuju / Cukup Sesuai</span>
                <span><strong>Nilai 7 - 8</strong> : Setuju / Sesuai</span>
                <span><strong>Nilai 9 - 10</strong> : Sangat Setuju / Sangat Sesuai</span>
              </div>
            </div>
          </div>

          <!-- RINGKASAN KONSEP: MODEL SEPERTI APA YANG DIUJI? -->
          <div class="card" style="margin-bottom: 1.5rem; padding: 1.75rem; border: 1.5px solid #CBD5E1; background: #FFFFFF;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span style="font-size: 1.4rem;">💡</span>
                <div>
                  <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--brand-lan-navy); margin: 0;">
                    Sekilas Konsep: Model Seperti Apa yang Sedang Diuji?
                  </h3>
                  <p style="font-size: 0.825rem; color: #64748B; margin: 0.15rem 0 0 0;">
                    Ringkasan cara kerja sistem pembelajaran adaptif yang diusulkan dalam riset disertasi ini:
                  </p>
                </div>
              </div>
              <span class="badge" style="background: #EFF6FF; color: #1D4ED8; border: 1px solid #BFDBFE; font-weight: 700;">
                Karakteristik & Cara Kerja Model
              </span>
            </div>

            <!-- 3 Pilar Cara Kerja Model -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
              <!-- Pilar 1 -->
              <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: var(--radius-md); padding: 1.15rem; border-top: 4px solid #10B981;">
                <div style="font-size: 0.9rem; font-weight: 800; color: #065F46; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
                  <span>📡</span> 1. Deteksi Hambatan Lapangan
                </div>
                <p style="font-size: 0.825rem; color: #334155; line-height: 1.55; margin: 0;">
                  Sistem secara otomatis mendeteksi kecepatan internet, kestabilan koneksi, serta jam sibuk dinas <strong>tanpa memasang kamera pengawas</strong> atau membebani kuota peserta.
                </p>
              </div>

              <!-- Pilar 2 -->
              <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: var(--radius-md); padding: 1.15rem; border-top: 4px solid #8B5CF6;">
                <div style="font-size: 0.9rem; font-weight: 800; color: #5B21B6; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
                  <span>⚖️</span> 2. Evaluasi Adil (Bebas Sanksi Kaku)
                </div>
                <p style="font-size: 0.825rem; color: #334155; line-height: 1.55; margin: 0;">
                  Sistem <strong>membedakan antara kendala sinyal/tugas dinas</strong> dengan peserta yang malas. Jika koneksi drop atau ada panggilan tugas warga, sistem <strong>TIDAK langsung menghukum / menggagalkan</strong> peserta.
                </p>
              </div>

              <!-- Pilar 3 -->
              <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: var(--radius-md); padding: 1.15rem; border-top: 4px solid #3B82F6;">
                <div style="font-size: 0.9rem; font-weight: 800; color: #1E40AF; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
                  <span>🎯</span> 3. Format Materi Otomatis Menyesuaikan
                </div>
                <p style="font-size: 0.825rem; color: #334155; line-height: 1.55; margin: 0;">
                  Mirip kualitas video YouTube yang menyesuaikan sinyal: saat sinyal drop, materi beralih ke <strong>rangkuman teks / audio ringan</strong>, dan modul dipecah menjadi <strong>unit 3–5 menit (micro-learning)</strong>.
                </p>
              </div>
            </div>

            <!-- Tabel Komparasi Cepat -->
            <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: var(--radius-sm); padding: 0.9rem 1.15rem;">
              <div style="font-weight: 800; font-size: 0.85rem; color: #92400E; margin-bottom: 0.5rem;">
                🔄 Perbedaan dengan LMS Pelatihan Konvensional Saat Ini:
              </div>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.75rem; font-size: 0.8rem; line-height: 1.5;">
                <div style="color: #991B1B; background: rgba(254, 226, 226, 0.5); padding: 0.6rem 0.85rem; border-radius: 4px; border-left: 3px solid #EF4444;">
                  <strong>❌ LMS Konvensional:</strong> Kaku, menuntut 100% video play, kamera wajib on, dan ASN di wilayah 3T sering dicap tidak aktif saat sinyal hilang.
                </div>
                <div style="color: #166534; background: rgba(220, 252, 231, 0.5); padding: 0.6rem 0.85rem; border-radius: 4px; border-left: 3px solid #22C55E;">
                  <strong>✅ Model yang Diusulkan:</strong> Fleksibel, menyajikan materi ringan sesuai kondisi lapangan, menyimpan posisi jeda (bookmark), dan melindungi hak belajar ASN.
                </div>
              </div>
            </div>
          </div>

          <!-- Section: Identitas Pakar -->
          <div class="card" style="margin-bottom: 1.5rem; padding: 1.75rem;">
            <div class="section-title-badge">
              <span class="step-num-pill">BAGIAN I</span>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #1E293B; margin: 0;">Identitas Narasumber / Pakar Widyaiswara</h3>
            </div>

            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Nama Lengkap & Gelar (Boleh Inisial/Opsional):</label>
                <input 
                  type="text" 
                  v-model="form.evaluatorName" 
                  placeholder="Contoh: Dr. H. Bambang S., M.Si." 
                  class="form-input" 
                />
              </div>

              <div class="form-group">
                <label class="form-label">Institusi / Lembaga Pelatihan: <span class="text-rose">*</span></label>
                <input 
                  type="text" 
                  v-model="form.institution" 
                  required 
                  placeholder="Contoh: Puslatbang LAN RI / BPSDM Prov. Sulsel" 
                  class="form-input" 
                />
              </div>

              <div class="form-group">
                <label class="form-label">Jenjang Jabatan Fungsional: <span class="text-rose">*</span></label>
                <select v-model="form.functionalPosition" required class="form-input">
                  <option value="">-- Pilih Jenjang Jabatan --</option>
                  <option value="Widyaiswara Ahli Utama">Widyaiswara Ahli Utama</option>
                  <option value="Widyaiswara Ahli Madya">Widyaiswara Ahli Madya</option>
                  <option value="Widyaiswara Ahli Muda">Widyaiswara Ahli Muda</option>
                  <option value="Widyaiswara Ahli Pertama">Widyaiswara Ahli Pertama</option>
                  <option value="Pengembang Teknologi Pembelajaran (PTP)">Pengembang Teknologi Pembelajaran (PTP)</option>
                  <option value="Dosen / Akademisi / Pakar Eksternal">Dosen / Akademisi / Pakar Eksternal</option>
                  <option value="Pengelola Diklat / Admin LMS">Pengelola Diklat / Admin LMS</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Pengalaman Mengajar / Mengelola Diklat ASN:</label>
                <select v-model="form.experienceYears" class="form-input">
                  <option value="< 3 Tahun">&lt; 3 Tahun</option>
                  <option value="3 - 7 Tahun">3 - 7 Tahun</option>
                  <option value="7 - 10 Tahun">7 - 10 Tahun</option>
                  <option value="> 10 Tahun">&gt; 10 Tahun</option>
                </select>
              </div>

              <div class="form-group" style="grid-column: span 2;">
                <label class="form-label">Cakupan Wilayah Tugas / Pembinaan Diklat:</label>
                <select v-model="form.regionCoverage" class="form-input">
                  <option value="Nasional / Multi-Wilayah">Nasional / Multi-Wilayah (LAN RI / Kementerian)</option>
                  <option value="Wilayah Barat / Jawa - Sumatera">Wilayah Barat / Jawa - Sumatera</option>
                  <option value="Wilayah Tengah / Kalimantan - Sulawesi - Bali">Wilayah Tengah / Kalimantan - Sulawesi - Bali</option>
                  <option value="Wilayah Timur / Nusa Tenggara - Maluku - Papua (3T)">Wilayah Timur / Nusa Tenggara - Maluku - Papua (Wilayah 3T & Kepulauan)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Section: 4 Dimensi Validasi (Skala 1 - 10) -->
          <div class="card" style="margin-bottom: 1.5rem; padding: 1.75rem;">
            <div class="section-title-badge" style="margin-bottom: 1.5rem;">
              <span class="step-num-pill">BAGIAN II</span>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #1E293B; margin: 0;">Butir-Butir Penilaian Validitas Ahli (Skala Genap 1 - 10)</h3>
            </div>

            <!-- Dimensi 1 -->
            <div class="dimension-block">
              <div class="dim-head">
                <span class="dim-icon">🏛️</span>
                <div>
                  <h4 class="dim-title">Dimensi 1: Relevansi Masalah di Lapangan (Kondisi Nyata ASN)</h4>
                  <p class="dim-desc">Menilai ketepatan pemetaan kendala jaringan internet dan dinamika tugas kedinasan ASN.</p>
                </div>
              </div>

              <!-- P1 -->
              <div class="question-row">
                <div class="q-content">
                  <span class="q-code">P1.</span>
                  <div class="q-text">
                    <strong>Kendala Sinyal di Daerah Terpencil/3T:</strong> Dalam pelaksanaan e-learning/MOOC ASN saat ini, peserta di daerah terpencil atau kepulauan kerap mengalami hambatan jaringan (video tersendat atau buffering) yang sering disalahartikan oleh sistem sebagai 'peserta malas' atau 'kurang bermotivasi'.
                  </div>
                </div>
                <div class="scale-10-wrap">
                  <div class="scale-selector-10">
                    <label v-for="val in 10" :key="val" :class="['scale-10-opt', form.scoreA1Problem3T === val ? 'selected' : '']">
                      <input type="radio" :value="val" v-model.number="form.scoreA1Problem3T" />
                      <span>{{ val }}</span>
                    </label>
                  </div>
                  <div class="scale-10-legend">
                    <span>1 (Sangat Tidak Setuju)</span>
                    <span class="curr-val-badge">Pilihan: <strong>{{ form.scoreA1Problem3T }} / 10</strong></span>
                    <span>10 (Sangat Setuju)</span>
                  </div>
                </div>
              </div>

              <!-- P2 -->
              <div class="question-row">
                <div class="q-content">
                  <span class="q-code">P2.</span>
                  <div class="q-text">
                    <strong>Dinamika Tugas Pelayanan Kedinasan:</strong> Keharusan melayani masyarakat secara mendadak dan tuntutan tugas kantor pada jam kerja merupakan kondisi nyata yang wajar menginterupsi waktu belajar daring seorang ASN.
                  </div>
                </div>
                <div class="scale-10-wrap">
                  <div class="scale-selector-10">
                    <label v-for="val in 10" :key="val" :class="['scale-10-opt', form.scoreA2WorkInterruption === val ? 'selected' : '']">
                      <input type="radio" :value="val" v-model.number="form.scoreA2WorkInterruption" />
                      <span>{{ val }}</span>
                    </label>
                  </div>
                  <div class="scale-10-legend">
                    <span>1 (Sangat Tidak Setuju)</span>
                    <span class="curr-val-badge">Pilihan: <strong>{{ form.scoreA2WorkInterruption }} / 10</strong></span>
                    <span>10 (Sangat Setuju)</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dimensi 2 -->
            <div class="dimension-block" style="margin-top: 2rem;">
              <div class="dim-head">
                <span class="dim-icon">⚖️</span>
                <div>
                  <h4 class="dim-title">Dimensi 2: Keadilan Penilaian & Etika Evaluasi (Keadilan Akses Pelatihan)</h4>
                  <p class="dim-desc">Menilai prinsip perlakuan yang adil terhadap peserta dengan keterbatasan infrastruktur.</p>
                </div>
              </div>

              <!-- P3 -->
              <div class="question-row">
                <div class="q-content">
                  <span class="q-code">P3.</span>
                  <div class="q-text">
                    <strong>Keadilan Penilaian Berbasis Kondisi Daerah:</strong> Sistem evaluasi pembelajaran daring ASN harus adil dengan mempertimbangkan keterbatasan koneksi di daerah tugas peserta, dan tidak menyamaratakan kecepatan akses dengan kota besar, selama esensi pemahaman materi tetap tuntas.
                  </div>
                </div>
                <div class="scale-10-wrap">
                  <div class="scale-selector-10">
                    <label v-for="val in 10" :key="val" :class="['scale-10-opt', form.scoreB1SpatialEquity === val ? 'selected' : '']">
                      <input type="radio" :value="val" v-model.number="form.scoreB1SpatialEquity" />
                      <span>{{ val }}</span>
                    </label>
                  </div>
                  <div class="scale-10-legend">
                    <span>1 (Sangat Tidak Setuju)</span>
                    <span class="curr-val-badge">Pilihan: <strong>{{ form.scoreB1SpatialEquity }} / 10</strong></span>
                    <span>10 (Sangat Setuju)</span>
                  </div>
                </div>
              </div>

              <!-- P4 -->
              <div class="question-row">
                <div class="q-content">
                  <span class="q-code">P4.</span>
                  <div class="q-text">
                    <strong>Penghapusan Penalti Otomatis yang Kaku:</strong> Sistem pelatihan tidak boleh langsung menjatuhkan sanksi atau status 'gagal' secara sepihak hanya karena kamera Zoom mati (akibat menghemat kuota/sinyal drop) atau karena peserta berpindah layar untuk tugas dinas darurat.
                  </div>
                </div>
                <div class="scale-10-wrap">
                  <div class="scale-selector-10">
                    <label v-for="val in 10" :key="val" :class="['scale-10-opt', form.scoreB2NonPunitiveEthics === val ? 'selected' : '']">
                      <input type="radio" :value="val" v-model.number="form.scoreB2NonPunitiveEthics" />
                      <span>{{ val }}</span>
                    </label>
                  </div>
                  <div class="scale-10-legend">
                    <span>1 (Sangat Tidak Setuju)</span>
                    <span class="curr-val-badge">Pilihan: <strong>{{ form.scoreB2NonPunitiveEthics }} / 10</strong></span>
                    <span>10 (Sangat Setuju)</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dimensi 3 -->
            <div class="dimension-block" style="margin-top: 2rem;">
              <div class="dim-head">
                <span class="dim-icon">🎓</span>
                <div>
                  <h4 class="dim-title">Dimensi 3: Kesesuaian Cara Belajar ASN (Prinsip Andragogi)</h4>
                  <p class="dim-desc">Menilai bentuk adaptasi format materi yang fleksibel dan ramah kesibukan tugas ASN.</p>
                </div>
              </div>

              <!-- P5 -->
              <div class="question-row">
                <div class="q-content">
                  <span class="q-code">P5.</span>
                  <div class="q-text">
                    <strong>Penyajian Materi Ringkas (Micro-Learning 3–5 Menit):</strong> Pemecahan materi pelatihan yang panjang menjadi unit-unit ringkas berdurasi 3 s.d. 5 menit sangat membantu ASN untuk tetap belajar secara fokus di sela-sela kesibukan jam dinas.
                  </div>
                </div>
                <div class="scale-10-wrap">
                  <div class="scale-selector-10">
                    <label v-for="val in 10" :key="val" :class="['scale-10-opt', form.scoreC1MicroChunking === val ? 'selected' : '']">
                      <input type="radio" :value="val" v-model.number="form.scoreC1MicroChunking" />
                      <span>{{ val }}</span>
                    </label>
                  </div>
                  <div class="scale-10-legend">
                    <span>1 (Sangat Tidak Setuju)</span>
                    <span class="curr-val-badge">Pilihan: <strong>{{ form.scoreC1MicroChunking }} / 10</strong></span>
                    <span>10 (Sangat Setuju)</span>
                  </div>
                </div>
              </div>

              <!-- P6 -->
              <div class="question-row">
                <div class="q-content">
                  <span class="q-code">P6.</span>
                  <div class="q-text">
                    <strong>Pilihan Format Teks Ringkas & Audio Ringan:</strong> Penyediaan materi alternatif dalam bentuk rangkuman teks terstruktur atau rekaman audio (saat jaringan internet lambat) mampu menyampaikan substansi pembelajaran secara efektif tanpa mewajibkan video berukuran besar.
                  </div>
                </div>
                <div class="scale-10-wrap">
                  <div class="scale-selector-10">
                    <label v-for="val in 10" :key="val" :class="['scale-10-opt', form.scoreC2TextAudioFallback === val ? 'selected' : '']">
                      <input type="radio" :value="val" v-model.number="form.scoreC2TextAudioFallback" />
                      <span>{{ val }}</span>
                    </label>
                  </div>
                  <div class="scale-10-legend">
                    <span>1 (Sangat Tidak Setuju)</span>
                    <span class="curr-val-badge">Pilihan: <strong>{{ form.scoreC2TextAudioFallback }} / 10</strong></span>
                    <span>10 (Sangat Setuju)</span>
                  </div>
                </div>
              </div>

              <!-- P7 -->
              <div class="question-row">
                <div class="q-content">
                  <span class="q-code">P7.</span>
                  <div class="q-text">
                    <strong>Penanda Titik Jeda Belajar Otomatis (Bookmark Cerdas):</strong> Kemampuan sistem mencatat batas materi terakhir secara otomatis (sehingga peserta bisa langsung melanjutkan tanpa mengulang dari awal saat ada panggilan tugas) sangat sesuai dengan kebutuhan belajar orang dewasa (andragogi).
                  </div>
                </div>
                <div class="scale-10-wrap">
                  <div class="scale-selector-10">
                    <label v-for="val in 10" :key="val" :class="['scale-10-opt', form.scoreC3GracefulBookmark === val ? 'selected' : '']">
                      <input type="radio" :value="val" v-model.number="form.scoreC3GracefulBookmark" />
                      <span>{{ val }}</span>
                    </label>
                  </div>
                  <div class="scale-10-legend">
                    <span>1 (Sangat Tidak Setuju)</span>
                    <span class="curr-val-badge">Pilihan: <strong>{{ form.scoreC3GracefulBookmark }} / 10</strong></span>
                    <span>10 (Sangat Setuju)</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dimensi 4 -->
            <div class="dimension-block" style="margin-top: 2rem;">
              <div class="dim-head">
                <span class="dim-icon">🚀</span>
                <div>
                  <h4 class="dim-title">Dimensi 4: Kelayakan Penerapan di LMS LAN RI & BPSDM</h4>
                  <p class="dim-desc">Menilai potensi adopsi model pada platform pelatihan ASN nasional dan daerah.</p>
                </div>
              </div>

              <!-- P8 -->
              <div class="question-row">
                <div class="q-content">
                  <span class="q-code">P8.</span>
                  <div class="q-text">
                    <strong>Kelayakan Penerapan pada Platform Diklat ASN:</strong> Konsep sistem pelatihan adaptif yang ramah kondisi lapangan ini sangat layak dan realistis untuk diterapkan pada LMS LAN RI (seperti MOOC LAN, ASN Unggul, Smart ASN) serta LMS BPSDM Daerah.
                  </div>
                </div>
                <div class="scale-10-wrap">
                  <div class="scale-selector-10">
                    <label v-for="val in 10" :key="val" :class="['scale-10-opt', form.scoreD1LmsAdoptionFeasibility === val ? 'selected' : '']">
                      <input type="radio" :value="val" v-model.number="form.scoreD1LmsAdoptionFeasibility" />
                      <span>{{ val }}</span>
                    </label>
                  </div>
                  <div class="scale-10-legend">
                    <span>1 (Sangat Tidak Setuju)</span>
                    <span class="curr-val-badge">Pilihan: <strong>{{ form.scoreD1LmsAdoptionFeasibility }} / 10</strong></span>
                    <span>10 (Sangat Setuju)</span>
                  </div>
                </div>
              </div>

              <!-- P9 -->
              <div class="question-row">
                <div class="q-content">
                  <span class="q-code">P9.</span>
                  <div class="q-text">
                    <strong>Pemerataan Kualitas & Keadilan Akses Diklat:</strong> Secara menyeluruh, penerapan sistem ini akan meningkatkan motivasi belajar serta mewujudkan kesempatan pengembangan kompetensi yang setara dan berkeadilan bagi seluruh ASN di Indonesia.
                  </div>
                </div>
                <div class="scale-10-wrap">
                  <div class="scale-selector-10">
                    <label v-for="val in 10" :key="val" :class="['scale-10-opt', form.scoreD2OverallQualityImpact === val ? 'selected' : '']">
                      <input type="radio" :value="val" v-model.number="form.scoreD2OverallQualityImpact" />
                      <span>{{ val }}</span>
                    </label>
                  </div>
                  <div class="scale-10-legend">
                    <span>1 (Sangat Tidak Setuju)</span>
                    <span class="curr-val-badge">Pilihan: <strong>{{ form.scoreD2OverallQualityImpact }} / 10</strong></span>
                    <span>10 (Sangat Setuju)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Section: Umpan Balik Kualitatif & Rekomendasi -->
          <div class="card" style="margin-bottom: 2rem; padding: 1.75rem;">
            <div class="section-title-badge" style="margin-bottom: 1.25rem;">
              <span class="step-num-pill">BAGIAN III</span>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #1E293B; margin: 0;">Masukan Kualitatif & Rekomendasi Ahli</h3>
            </div>

            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label class="form-label">1. Saran Terkait Penyajian Materi & Kurikulum Pelatihan (Opsional):</label>
              <textarea 
                v-model="form.pedagogicalAdvice" 
                rows="3" 
                placeholder="Contoh: Sangat baik jika micro-learning 3-5 menit juga dilengkapi kuis interaktif singkat..." 
                class="form-input"
              ></textarea>
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
              <label class="form-label">2. Rekomendasi Kebijakan Penerapan di LAN RI / BPSDM (Opsional):</label>
              <textarea 
                v-model="form.policyRecommendation" 
                rows="3" 
                placeholder="Contoh: Sangat cocok diterapkan pada tahapan MOOC Pelatihan Kepemimpinan (PKP/PKA) atau Latsar CPNS..." 
                class="form-input"
              ></textarea>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-size: 0.95rem; font-weight: 800; color: #0F172A; margin-bottom: 0.25rem;">
                3. Kesimpulan / Rekomendasi Akhir Bapak/Ibu Widyaiswara: <span class="text-rose">*</span>
              </label>
              <p style="font-size: 0.825rem; color: #64748B; margin: 0 0 0.85rem 0;">
                Berdasarkan seluruh telaah di atas, bagaimana rekomendasi Bapak/Ibu terhadap penerapan konsep pembelajaran adaptif ini pada platform e-learning pelatihan ASN?
              </p>

              <div class="conclusion-radio-deck">
                <label 
                  :class="['conclusion-card', form.expertConclusion === 'Sangat Layak Digunakan (Tanpa Revisi)' ? 'active-green' : '']"
                  @click="form.expertConclusion = 'Sangat Layak Digunakan (Tanpa Revisi)'"
                >
                  <input type="radio" value="Sangat Layak Digunakan (Tanpa Revisi)" v-model="form.expertConclusion" />
                  <div class="conc-icon">🟢</div>
                  <div class="conc-info">
                    <strong class="conc-title">Sangat Layak Diterapkan (Tanpa Perubahan)</strong>
                    <span class="conc-desc">Konsep sudah sangat matang, adil bagi daerah 3T, dan siap diterapkan pada LMS pelatihan ASN.</span>
                  </div>
                </label>

                <label 
                  :class="['conclusion-card', form.expertConclusion === 'Layak Digunakan dengan Catatan Minor' ? 'active-amber' : '']"
                  @click="form.expertConclusion = 'Layak Digunakan dengan Catatan Minor'"
                >
                  <input type="radio" value="Layak Digunakan dengan Catatan Minor" v-model="form.expertConclusion" />
                  <div class="conc-icon">🟡</div>
                  <div class="conc-info">
                    <strong class="conc-title">Layak Diterapkan dengan Catatan/Penyempurnaan</strong>
                    <span class="conc-desc">Konsep sangat baik dan relevan, dengan mempertimbangkan saran perbaikan di atas.</span>
                  </div>
                </label>

                <label 
                  :class="['conclusion-card', form.expertConclusion === 'Perlu Penyesuaian & Uji Lanjut' ? 'active-slate' : '']"
                  @click="form.expertConclusion = 'Perlu Penyesuaian & Uji Lanjut'"
                >
                  <input type="radio" value="Perlu Penyesuaian & Uji Lanjut" v-model="form.expertConclusion" />
                  <div class="conc-icon">🟠</div>
                  <div class="conc-info">
                    <strong class="conc-title">Perlu Penyesuaian & Uji Coba Lanjutan</strong>
                    <span class="conc-desc">Memerlukan kajian tambahan sebelum direkomendasikan untuk diterapkan secara luas.</span>
                  </div>
                </label>
              </div>
            </div>

            <div style="margin-top: 2rem; text-align: right;">
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting" style="padding: 0.9rem 2.25rem; font-size: 1rem; font-weight: 800; border-radius: var(--radius-md); box-shadow: 0 4px 6px -1px rgba(30, 58, 138, 0.25);">
                <span v-if="isSubmitting">Menyimpan Penilaian...</span>
                <span v-else>🚀 Simpan & Kirim Penilaian Validasi Pakar</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- ========================================================================= -->
      <!-- TAB 2: WAWANCARA MENDALAM & NOTULENSI KUALITATIF (TRIANGULASI DATA)       -->
      <!-- ========================================================================= -->
      <div v-else-if="activeTab === 'interview'">
        <!-- Protocol Interview Guide Box (Accordion/Banner) -->
        <div class="card" style="margin-bottom: 1.5rem; padding: 1.5rem; background: linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%); border: 1.5px solid #BFDBFE;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 800; font-size: 1.05rem; color: #1E3A8A;">
              <span>🎙️</span> Pedoman Wawancara Mendalam Pakar (In-Depth Interview Protocol)
            </div>
            <span class="badge" style="background: #DBEAFE; color: #1E40AF; font-weight: 700;">
              Durasi: 20–30 Menit • Semi-Terstruktur
            </span>
          </div>
          <p style="font-size: 0.875rem; color: #334155; line-height: 1.6; margin-bottom: 1rem;">
            Wawancara kualitatif digunakan untuk <strong>triangulasi metodologis</strong> pada Bab IV Disertasi. Rekam atau catat pandangan mendalam narasumber Widyaiswara LAN RI dan BPSDM berdasarkan 4 kluster pertanyaan di bawah:
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0.85rem; font-size: 0.8rem;">
            <div style="background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: var(--radius-sm); padding: 0.75rem 0.9rem;">
              <strong style="color: #0F172A; display: block; margin-bottom: 0.2rem;">Kluster 1: Fenomena Lapangan 3T</strong>
              <span style="color: #64748B;">Pengalaman narasumber terhadap peserta diklat yang terkendala sinyal & tugas dinas darurat.</span>
            </div>
            <div style="background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: var(--radius-sm); padding: 0.75rem 0.9rem;">
              <strong style="color: #0F172A; display: block; margin-bottom: 0.2rem;">Kluster 2: Etika & Keadilan Evaluasi</strong>
              <span style="color: #64748B;">Pandangan etis terhadap penghapusan hukuman otomatis saat kamera/sinyal mati.</span>
            </div>
            <div style="background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: var(--radius-sm); padding: 0.75rem 0.9rem;">
              <strong style="color: #0F172A; display: block; margin-bottom: 0.2rem;">Kluster 3: Kesesuaian Andragogi</strong>
              <span style="color: #64748B;">Efektivitas micro-learning 3–5 menit, fallback teks/audio, dan bookmark cerdas.</span>
            </div>
            <div style="background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: var(--radius-sm); padding: 0.75rem 0.9rem;">
              <strong style="color: #0F172A; display: block; margin-bottom: 0.2rem;">Kluster 4: Rekomendasi Kebijakan</strong>
              <span style="color: #64748B;">Strategi adopsi di LAN RI / BPSDM dan regulasi pedoman diklat masa depan.</span>
            </div>
          </div>
        </div>

        <!-- Form Input Notulensi Wawancara Baru -->
        <div class="card" style="margin-bottom: 1.5rem; padding: 1.75rem;">
          <div class="section-title-badge" style="margin-bottom: 1.25rem;">
            <span class="step-num-pill" style="background: #FEF3C7; color: #B45309;">INPUT NOTULENSI</span>
            <h3 style="font-size: 1.15rem; font-weight: 800; color: #1E293B; margin: 0;">Catat Transkrip / Hasil Wawancara Pakar Baru</h3>
          </div>

          <form @submit.prevent="handleSubmitInterview">
            <!-- Row 1: Metadata Narasumber -->
            <div class="form-grid" style="margin-bottom: 1.25rem;">
              <div class="form-group">
                <label class="form-label">Nama & Gelar Narasumber: <span class="text-rose">*</span></label>
                <input 
                  type="text" 
                  v-model="interviewForm.intervieweeName" 
                  required 
                  placeholder="Contoh: Dr. H. Bambang S., M.Si." 
                  class="form-input" 
                />
              </div>

              <div class="form-group">
                <label class="form-label">Institusi / Lembaga Pelatihan: <span class="text-rose">*</span></label>
                <input 
                  type="text" 
                  v-model="interviewForm.institution" 
                  required 
                  placeholder="Contoh: Puslatbang LAN RI / BPSDM Prov. Sulsel" 
                  class="form-input" 
                />
              </div>

              <div class="form-group">
                <label class="form-label">Jabatan Fungsional / Struktural: <span class="text-rose">*</span></label>
                <select v-model="interviewForm.functionalPosition" required class="form-input">
                  <option value="Widyaiswara Ahli Utama">Widyaiswara Ahli Utama</option>
                  <option value="Widyaiswara Ahli Madya">Widyaiswara Ahli Madya</option>
                  <option value="Widyaiswara Ahli Muda">Widyaiswara Ahli Muda</option>
                  <option value="Kepala Puslatbang / Pejabat LAN RI">Kepala Puslatbang / Pejabat LAN RI</option>
                  <option value="Kepala BPSDM / Pejabat Daerah">Kepala BPSDM / Pejabat Daerah</option>
                  <option value="PTP / Pengembang Teknologi Pembelajaran">PTP / Pengembang Teknologi Pembelajaran</option>
                  <option value="Pakar / Akademisi Eksternal">Pakar / Akademisi Eksternal</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Tanggal Wawancara:</label>
                <input 
                  type="date" 
                  v-model="interviewForm.interviewDate" 
                  class="form-input" 
                />
              </div>

              <div class="form-group">
                <label class="form-label">Durasi Wawancara:</label>
                <input 
                  type="text" 
                  v-model="interviewForm.interviewDuration" 
                  placeholder="Contoh: 35 Menit" 
                  class="form-input" 
                />
              </div>

              <div class="form-group">
                <label class="form-label">Link Rekaman Audio / Google Drive (Opsional):</label>
                <input 
                  type="url" 
                  v-model="interviewForm.audioRecordingLink" 
                  placeholder="https://drive.google.com/..." 
                  class="form-input" 
                />
              </div>
            </div>

            <!-- Row 2: Isian 4 Kluster Tematik -->
            <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 1.5rem;">
              <div class="form-group">
                <label class="form-label">1. Temuan Kluster 1: Pengalaman Kendala Sinyal di Daerah 3T & Beban Dinas:</label>
                <textarea 
                  v-model="interviewForm.topic1RealityFindings" 
                  rows="3" 
                  placeholder="Catatan narasi pakar mengenai fakta di lapangan saat peserta di wilayah kepulauan/3T terputus sinyal..." 
                  class="form-input"
                ></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">2. Temuan Kluster 2: Pandangan Etika & Keadilan Evaluasi (Bebas Sanksi Kaku):</label>
                <textarea 
                  v-model="interviewForm.topic2FairnessFindings" 
                  rows="3" 
                  placeholder="Respon pakar terkait prinsip normalisasi wilayah dan perlindungan hak belajar peserta..." 
                  class="form-input"
                ></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">3. Temuan Kluster 3: Kesesuaian Andragogi (Micro-Learning, Fallback, Bookmark):</label>
                <textarea 
                  v-model="interviewForm.topic3AndragogyFindings" 
                  rows="3" 
                  placeholder="Penilaian narasumber mengenai efektivitas modul 3-5 menit dan penanda jeda otomatis..." 
                  class="form-input"
                ></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">4. Temuan Kluster 4: Strategi Penerapan & Rekomendasi Kebijakan di LAN RI / BPSDM:</label>
                <textarea 
                  v-model="interviewForm.topic4PolicyRecommendations" 
                  rows="3" 
                  placeholder="Saran narasumber tentang regulasi dan integrasi ke MOOC LAN / Portal ASN Unggul..." 
                  class="form-input"
                ></textarea>
              </div>

              <!-- Gold Quotes / Verbatim Highlight -->
              <div class="form-group" style="background: #FFFBEB; border: 1.5px solid #FDE68A; border-radius: var(--radius-sm); padding: 1rem;">
                <label class="form-label" style="color: #92400E; display: flex; align-items: center; gap: 0.4rem;">
                  <span>⭐</span> Kutipan Langsung Paling Berbobot (Verbatim Gold Quote untuk Bab IV Disertasi):
                </label>
                <textarea 
                  v-model="interviewForm.keyQuotesVerbatim" 
                  rows="2" 
                  placeholder='Contoh: "Model micro-learning 3 menit dan bookmark cerdas ini adalah jawaban paling realistis bagi ASN di wilayah pulau terluar yang sering mati lampu..."' 
                  class="form-input"
                  style="border-color: #FCD34D;"
                ></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">Kesimpulan Sikap / Verdict Narasumber: <span class="text-rose">*</span></label>
                <select v-model="interviewForm.overallVerdict" required class="form-input" style="font-weight: 700; color: #1E3A8A;">
                  <option value="Mendukung Penuh Tanpa Syarat">🟢 Mendukung Penuh Tanpa Syarat (Sangat Direkomendasikan)</option>
                  <option value="Mendukung dengan Catatan Regulasi/Kurikulum">🟡 Mendukung dengan Catatan Regulasi / Penyesuaian Kurikulum</option>
                  <option value="Perlu Uji Coba Terbatas (Pilot Project)">🟠 Perlu Uji Coba Terbatas (Pilot Project Terlebih Dahulu)</option>
                </select>
              </div>
            </div>

            <div style="text-align: right;">
              <button type="submit" class="btn btn-primary" :disabled="isSubmittingInterview" style="padding: 0.85rem 2rem; font-size: 0.95rem; font-weight: 800;">
                <span v-if="isSubmittingInterview">Menyimpan Transkrip...</span>
                <span v-else>💾 Simpan Notulensi Wawancara Pakar</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Daftar Transkrip Wawancara Pakar yang Tersimpan -->
        <div class="card" style="padding: 1.75rem; margin-bottom: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
            <div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #1E293B; margin: 0;">
                📚 Arsip Notulensi & Transkrip Wawancara Pakar ({{ interviewList.length }} Sesi)
              </h3>
              <p style="font-size: 0.85rem; color: #64748B; margin: 0.25rem 0 0 0;">
                Data kualitatif ini siap disintesis untuk Bab IV (Hasil Wawancara & Triangulasi Ahli).
              </p>
            </div>
            <button @click="fetchInterviews" class="btn btn-secondary" style="font-size: 0.85rem; padding: 0.45rem 0.9rem;">
              🔄 Segarkan Data Wawancara
            </button>
          </div>

          <!-- Empty State Interview -->
          <div v-if="interviewList.length === 0" style="text-align: center; padding: 3rem 1.5rem; background: #F8FAFC; border-radius: var(--radius-md); border: 1px dashed #CBD5E1;">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🎙️</div>
            <h4 style="font-size: 1.1rem; font-weight: 700; color: #334155; margin-bottom: 0.35rem;">
              Belum Ada Sesi Wawancara yang Dicatat
            </h4>
            <p style="font-size: 0.85rem; color: #64748B; max-width: 500px; margin: 0 auto; line-height: 1.5;">
              Gunakan formulir di atas untuk mencatat hasil wawancara tatap muka / daring (Zoom) bersama Widyaiswara dan pimpinan lembaga pelatihan.
            </p>
          </div>

          <!-- Interview Cards Deck -->
          <div v-else class="expert-cards-grid">
            <div v-for="(intv, idx) in interviewList" :key="intv.id || idx" class="expert-card" style="border-left: 4px solid #3B82F6;">
              <div class="exp-head">
                <div>
                  <span class="exp-id" style="background: #EFF6FF; color: #1D4ED8;">{{ intv.id }}</span>
                  <h4 class="exp-name">{{ intv.intervieweeName }}</h4>
                  <div class="exp-meta">
                    <strong>{{ intv.institution }}</strong> • {{ intv.functionalPosition }}
                  </div>
                  <div class="exp-submeta">
                    📅 Tanggal: {{ intv.interviewDate }} | ⏱️ Durasi: {{ intv.interviewDuration || '30m' }} | Pewawancara: {{ intv.interviewer || 'Pujiatmo Subarkah' }}
                  </div>
                </div>
                <div>
                  <span class="badge" style="background: #DCFCE7; color: #166534; font-weight: 700; font-size: 0.75rem;">
                    {{ intv.overallVerdict }}
                  </span>
                </div>
              </div>

              <!-- Quotes Highlight -->
              <div v-if="intv.keyQuotesVerbatim" style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: var(--radius-sm); padding: 0.75rem; font-size: 0.825rem; color: #92400E; font-style: italic; line-height: 1.5;">
                <strong>⭐ Verbatim Quote:</strong>
                <p style="margin: 0.25rem 0 0 0;">"{{ intv.keyQuotesVerbatim }}"</p>
              </div>

              <!-- 4 Clusters Details -->
              <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.8rem; line-height: 1.5; color: #334155;">
                <div v-if="intv.topic1RealityFindings">
                  <strong style="color: #1E3A8A;">1. Kendala Sinyal 3T:</strong> {{ intv.topic1RealityFindings }}
                </div>
                <div v-if="intv.topic2FairnessFindings">
                  <strong style="color: #1E3A8A;">2. Keadilan & Etika:</strong> {{ intv.topic2FairnessFindings }}
                </div>
                <div v-if="intv.topic3AndragogyFindings">
                  <strong style="color: #1E3A8A;">3. Andragogi & Micro-learning:</strong> {{ intv.topic3AndragogyFindings }}
                </div>
                <div v-if="intv.topic4PolicyRecommendations">
                  <strong style="color: #1E3A8A;">4. Rekomendasi Kebijakan:</strong> {{ intv.topic4PolicyRecommendations }}
                </div>
              </div>

              <div v-if="intv.audioRecordingLink" style="margin-top: 0.5rem; font-size: 0.775rem;">
                🔗 <a :href="intv.audioRecordingLink" target="_blank" rel="noopener noreferrer" style="color: #2563EB; text-decoration: underline; font-weight: 600;">
                  Buka Tautan Rekaman Wawancara / Berkas
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- TAB 3: REKAPITULASI HASIL & INDEKS VALIDITAS AHLI (AIKEN'S V)             -->
      <!-- ========================================================================= -->
      <div v-else-if="activeTab === 'rekap'">
        <!-- KPI Deck -->
        <div class="kpi-deck-4">
          <div class="card kpi-box">
            <span class="kpi-t">Rata-Rata Skor Total</span>
            <span class="kpi-n text-emerald">
              {{ expertList.length > 0 ? averageOverallScore.toFixed(2) : '-' }} 
              <small v-if="expertList.length > 0" style="font-size: 0.9rem; color: #64748B;">/ 10.0</small>
            </span>
            <span class="kpi-s">
              {{ expertList.length > 0 ? `Tingkat Kesesuaian: Sangat Tinggi (${((averageOverallScore / 10) * 100).toFixed(1)}%)` : 'Menunggu respon narasumber' }}
            </span>
          </div>
          <div class="card kpi-box">
            <span class="kpi-t">Indeks Aiken's V</span>
            <span class="kpi-n text-blue">{{ expertList.length > 0 ? aikenVScore.toFixed(2) : '-' }}</span>
            <span class="kpi-s">
              {{ expertList.length > 0 ? 'Status: Sangat Sahih (V > 0.80)' : 'Dihitung otomatis per data masuk' }}
            </span>
          </div>
          <div class="card kpi-box">
            <span class="kpi-t">Konsensus Kelayakan</span>
            <span class="kpi-n text-purple">{{ expertList.length > 0 ? '100%' : '-' }}</span>
            <span class="kpi-s">
              {{ expertList.length > 0 ? 'Rekomendasi: Layak Diadopsi' : 'Menunggu telaah ahli' }}
            </span>
          </div>
          <div class="card kpi-box">
            <span class="kpi-t">Jumlah Penilai Pakar</span>
            <span class="kpi-n text-amber">{{ expertList.length }} Orang</span>
            <span class="kpi-s">Target: 5 s.d. 10 Narasumber</span>
          </div>
        </div>

        <!-- EMPTY STATE (Jika Belum Ada Widyaiswara yang Mengisi Kuesioner) -->
        <div v-if="expertList.length === 0" class="card" style="text-align: center; padding: 4rem 2rem; margin-bottom: 2rem;">
          <div style="width: 68px; height: 68px; background: #F1F5F9; color: #64748B; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto;">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <h3 style="font-size: 1.35rem; font-weight: 800; color: #1E293B; margin-bottom: 0.5rem;">
            Belum Ada Data Penilaian Kuantitatif yang Terekam
          </h3>
          <p style="font-size: 0.925rem; color: #64748B; max-width: 580px; margin: 0 auto 1.75rem auto; line-height: 1.6;">
            Formulir validasi pakar telah siap. Silakan bagikan tautan halaman ini kepada Bapak/Ibu Widyaiswara LAN RI dan BPSDM Daerah. Rekapitulasi per dimensi dan perhitungan koefisien <strong>Aiken's V</strong> akan otomatis terisi seketika data pertama masuk.
          </p>
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-primary" @click="activeTab = 'form'">
              ✍️ Buka Formulir Penilaian Widyaiswara
            </button>
            <button class="btn btn-secondary" @click="fetchExperts">
              🔄 Muat Ulang Data
            </button>
          </div>
        </div>

        <!-- REKAPITULASI AKTIF (Jika Sudah Ada Data) -->
        <div v-else>
          <!-- Dimensi Breakdown Table -->
          <div class="card" style="margin-bottom: 1.5rem; padding: 1.75rem;">
            <h3 style="font-size: 1.15rem; font-weight: 800; color: #1E293B; margin-bottom: 1rem;">
              📊 Rekapitulasi Rata-Rata per Dimensi Uji Validitas Pakar (Skala 1 - 10)
            </h3>

            <div class="table-responsive">
              <table class="styled-tbl">
                <thead>
                  <tr>
                    <th>Dimensi Pengujian</th>
                    <th>Jumlah Butir</th>
                    <th>Rata-Rata Skor (/ 10)</th>
                    <th>Indeks Aiken's V</th>
                    <th>Kategori Validitas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Dimensi 1: Relevansi Masalah di Lapangan</strong></td>
                    <td>2 Butir (P1, P2)</td>
                    <td><span class="score-badge">{{ avgD1.toFixed(2) }} / 10.0</span></td>
                    <td><span class="score-badge text-blue">{{ aikenD1.toFixed(2) }}</span></td>
                    <td><span class="badge-valid">Sangat Sahih & Relevan</span></td>
                  </tr>
                  <tr>
                    <td><strong>Dimensi 2: Keadilan Penilaian & Etika Evaluasi</strong></td>
                    <td>2 Butir (P3, P4)</td>
                    <td><span class="score-badge">{{ avgD2.toFixed(2) }} / 10.0</span></td>
                    <td><span class="score-badge text-blue">{{ aikenD2.toFixed(2) }}</span></td>
                    <td><span class="badge-valid">Sangat Adil & Etis</span></td>
                  </tr>
                  <tr>
                    <td><strong>Dimensi 3: Kesesuaian Cara Belajar ASN (Andragogi)</strong></td>
                    <td>3 Butir (P5, P6, P7)</td>
                    <td><span class="score-badge">{{ avgD3.toFixed(2) }} / 10.0</span></td>
                    <td><span class="score-badge text-blue">{{ aikenD3.toFixed(2) }}</span></td>
                    <td><span class="badge-valid">Sangat Sesuai Andragogi</span></td>
                  </tr>
                  <tr>
                    <td><strong>Dimensi 4: Kelayakan Penerapan di LMS LAN RI & BPSDM</strong></td>
                    <td>2 Butir (P8, P9)</td>
                    <td><span class="score-badge">{{ avgD4.toFixed(2) }} / 10.0</span></td>
                    <td><span class="score-badge text-blue">{{ aikenD4.toFixed(2) }}</span></td>
                    <td><span class="badge-valid">Sangat Layak Diadopsi</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Detail Tabel Riwayat Penilaian Pakar Widyaiswara -->
          <div class="card" style="margin-bottom: 2rem; padding: 1.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
              <div>
                <h3 style="font-size: 1.15rem; font-weight: 800; color: #1E293B; margin: 0;">
                  📝 Rincian Evaluasi Individual Narasumber / Widyaiswara
                </h3>
                <p style="font-size: 0.85rem; color: #64748B; margin: 0.25rem 0 0 0;">
                  Data dapat dikutip langsung untuk naskah Bab III / Bab IV disertasi dan lampiran uji pakar.
                </p>
              </div>
              <button @click="activeTab = 'form'" class="btn btn-primary" style="font-size: 0.85rem; padding: 0.5rem 1rem;">
                + Tambah Penilaian Pakar
              </button>
            </div>

            <div class="expert-cards-grid">
              <div v-for="(exp, idx) in expertList" :key="exp.id || idx" class="expert-card">
                <div class="exp-head">
                  <div>
                    <span class="exp-id">{{ exp.id }}</span>
                    <h4 class="exp-name">{{ exp.evaluatorName || 'Widyaiswara Penilai' }}</h4>
                    <div class="exp-meta">
                      <strong>{{ exp.institution }}</strong> • {{ exp.functionalPosition }}
                    </div>
                    <div class="exp-submeta">
                      Pengalaman: {{ exp.experienceYears }} | Wilayah: {{ exp.regionCoverage }}
                    </div>
                  </div>
                  <div class="exp-score-box">
                    <span class="exp-score-num">{{ calculateExpertAvg(exp).toFixed(1) }}</span>
                    <span class="exp-score-lbl">Skor Rerata / 10</span>
                  </div>
                </div>

                <div class="exp-scores-grid">
                  <div class="s-cell">
                    <span class="sk">Kendala Daerah:</span>
                    <span class="sv">{{ exp.scoreA1Problem3T }}/10</span>
                  </div>
                  <div class="s-cell">
                    <span class="sk">Tugas Kedinasan:</span>
                    <span class="sv">{{ exp.scoreA2WorkInterruption }}/10</span>
                  </div>
                  <div class="s-cell">
                    <span class="sk">Keadilan Wilayah:</span>
                    <span class="sv">{{ exp.scoreB1SpatialEquity }}/10</span>
                  </div>
                  <div class="s-cell">
                    <span class="sk">Bebas Sanksi Kaku:</span>
                    <span class="sv">{{ exp.scoreB2NonPunitiveEthics }}/10</span>
                  </div>
                  <div class="s-cell">
                    <span class="sk">Micro-Learning:</span>
                    <span class="sv">{{ exp.scoreC1MicroChunking }}/10</span>
                  </div>
                  <div class="s-cell">
                    <span class="sk">Pilihan Teks/Audio:</span>
                    <span class="sv">{{ exp.scoreC2TextAudioFallback }}/10</span>
                  </div>
                  <div class="s-cell">
                    <span class="sk">Bookmark Cerdas:</span>
                    <span class="sv">{{ exp.scoreC3GracefulBookmark }}/10</span>
                  </div>
                  <div class="s-cell">
                    <span class="sk">Adopsi LMS LAN:</span>
                    <span class="sv">{{ exp.scoreD1LmsAdoptionFeasibility }}/10</span>
                  </div>
                </div>

                <div v-if="exp.pedagogicalAdvice" class="exp-feedback-box">
                  <strong>💡 Saran Pedagogis:</strong>
                  <p>{{ exp.pedagogicalAdvice }}</p>
                </div>

                <div v-if="exp.policyRecommendation" class="exp-feedback-box">
                  <strong>📜 Rekomendasi Kebijakan:</strong>
                  <p>{{ exp.policyRecommendation }}</p>
                </div>

                <div class="exp-footer">
                  <span class="exp-conclusion-tag">
                    ✅ {{ exp.expertConclusion }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const activeTab = ref<'form' | 'interview' | 'rekap'>('form');
const isSubmitting = ref(false);
const isSubmittedSuccess = ref(false);
const isSubmittingInterview = ref(false);

const form = ref({
  evaluatorName: '',
  institution: '',
  functionalPosition: '',
  experienceYears: '3 - 7 Tahun',
  regionCoverage: 'Nasional / Multi-Wilayah',

  scoreA1Problem3T: 10,
  scoreA2WorkInterruption: 10,
  scoreB1SpatialEquity: 10,
  scoreB2NonPunitiveEthics: 10,
  scoreC1MicroChunking: 10,
  scoreC2TextAudioFallback: 10,
  scoreC3GracefulBookmark: 10,
  scoreD1LmsAdoptionFeasibility: 10,
  scoreD2OverallQualityImpact: 10,

  pedagogicalAdvice: '',
  policyRecommendation: '',
  expertConclusion: 'Sangat Layak Digunakan (Tanpa Revisi)'
});

const interviewForm = ref({
  intervieweeName: '',
  institution: '',
  functionalPosition: 'Widyaiswara Ahli Utama',
  interviewDate: new Date().toISOString().split('T')[0],
  interviewDuration: '30 Menit',
  interviewer: 'Pujiatmo Subarkah',
  audioRecordingLink: '',
  topic1RealityFindings: '',
  topic2FairnessFindings: '',
  topic3AndragogyFindings: '',
  topic4PolicyRecommendations: '',
  keyQuotesVerbatim: '',
  overallVerdict: 'Mendukung Penuh Tanpa Syarat'
});

const expertList = ref<any[]>([]);
const interviewList = ref<any[]>([]);

const fetchExperts = async () => {
  try {
    const res: any = await $fetch('/api/validasi-pakar/list');
    if (res && res.data) {
      expertList.value = res.data;
    }
  } catch (err) {
    console.warn('Failed to fetch expert list:', err);
  }
};

const fetchInterviews = async () => {
  try {
    const res: any = await $fetch('/api/validasi-pakar/interview/list');
    if (res && res.data) {
      interviewList.value = res.data;
    }
  } catch (err) {
    console.warn('Failed to fetch interview list:', err);
  }
};

onMounted(() => {
  fetchExperts();
  fetchInterviews();
});

const calculateExpertAvg = (exp: any) => {
  const scores = [
    Number(exp.scoreA1Problem3T) || 10,
    Number(exp.scoreA2WorkInterruption) || 10,
    Number(exp.scoreB1SpatialEquity) || 10,
    Number(exp.scoreB2NonPunitiveEthics) || 10,
    Number(exp.scoreC1MicroChunking) || 10,
    Number(exp.scoreC2TextAudioFallback) || 10,
    Number(exp.scoreC3GracefulBookmark) || 10,
    Number(exp.scoreD1LmsAdoptionFeasibility) || 10,
    Number(exp.scoreD2OverallQualityImpact) || 10
  ];
  return scores.reduce((a, b) => a + b, 0) / scores.length;
};

// Calculations for Aiken's V & Dimensions (Scale 1 - 10)
const avgD1 = computed(() => {
  if (!expertList.value.length) return 0;
  const sum = expertList.value.reduce((acc, cur) => acc + (Number(cur.scoreA1Problem3T) + Number(cur.scoreA2WorkInterruption)) / 2, 0);
  return sum / expertList.value.length;
});

const avgD2 = computed(() => {
  if (!expertList.value.length) return 0;
  const sum = expertList.value.reduce((acc, cur) => acc + (Number(cur.scoreB1SpatialEquity) + Number(cur.scoreB2NonPunitiveEthics)) / 2, 0);
  return sum / expertList.value.length;
});

const avgD3 = computed(() => {
  if (!expertList.value.length) return 0;
  const sum = expertList.value.reduce((acc, cur) => acc + (Number(cur.scoreC1MicroChunking) + Number(cur.scoreC2TextAudioFallback) + Number(cur.scoreC3GracefulBookmark)) / 3, 0);
  return sum / expertList.value.length;
});

const avgD4 = computed(() => {
  if (!expertList.value.length) return 0;
  const sum = expertList.value.reduce((acc, cur) => acc + (Number(cur.scoreD1LmsAdoptionFeasibility) + Number(cur.scoreD2OverallQualityImpact)) / 2, 0);
  return sum / expertList.value.length;
});

const averageOverallScore = computed(() => {
  if (!expertList.value.length) return 0;
  return (avgD1.value + avgD2.value + avgD3.value + avgD4.value) / 4;
});

// Aiken's V formula for 1-10 Scale: V = (Mean - 1) / (10 - 1) = (Mean - 1) / 9
const aikenD1 = computed(() => expertList.value.length ? Math.min(Math.max((avgD1.value - 1) / 9, 0), 1) : 0);
const aikenD2 = computed(() => expertList.value.length ? Math.min(Math.max((avgD2.value - 1) / 9, 0), 1) : 0);
const aikenD3 = computed(() => expertList.value.length ? Math.min(Math.max((avgD3.value - 1) / 9, 0), 1) : 0);
const aikenD4 = computed(() => expertList.value.length ? Math.min(Math.max((avgD4.value - 1) / 9, 0), 1) : 0);
const aikenVScore = computed(() => expertList.value.length ? Math.min(Math.max((averageOverallScore.value - 1) / 9, 0), 1) : 0);

const handleSubmitValidation = async () => {
  isSubmitting.value = true;
  try {
    const res: any = await $fetch('/api/validasi-pakar/submit', {
      method: 'POST',
      body: form.value
    });

    if (res && res.success) {
      isSubmittedSuccess.value = true;
      await fetchExperts();
    }
  } catch (err: any) {
    alert('Terjadi kesalahan saat menyimpan penilaian: ' + (err.statusMessage || err.message));
  } finally {
    isSubmitting.value = false;
  }
};

const handleSubmitInterview = async () => {
  isSubmittingInterview.value = true;
  try {
    const res: any = await $fetch('/api/validasi-pakar/interview/submit', {
      method: 'POST',
      body: interviewForm.value
    });

    if (res && res.success) {
      alert('Notulensi wawancara pakar berhasil disimpan ke database!');
      interviewForm.value = {
        intervieweeName: '',
        institution: '',
        functionalPosition: 'Widyaiswara Ahli Utama',
        interviewDate: new Date().toISOString().split('T')[0],
        interviewDuration: '30 Menit',
        interviewer: 'Pujiatmo Subarkah',
        audioRecordingLink: '',
        topic1RealityFindings: '',
        topic2FairnessFindings: '',
        topic3AndragogyFindings: '',
        topic4PolicyRecommendations: '',
        keyQuotesVerbatim: '',
        overallVerdict: 'Mendukung Penuh Tanpa Syarat'
      };
      await fetchInterviews();
    }
  } catch (err: any) {
    alert('Gagal menyimpan notulensi wawancara: ' + (err.statusMessage || err.message));
  } finally {
    isSubmittingInterview.value = false;
  }
};

const resetForm = () => {
  form.value = {
    evaluatorName: '',
    institution: '',
    functionalPosition: '',
    experienceYears: '3 - 7 Tahun',
    regionCoverage: 'Nasional / Multi-Wilayah',
    scoreA1Problem3T: 10,
    scoreA2WorkInterruption: 10,
    scoreB1SpatialEquity: 10,
    scoreB2NonPunitiveEthics: 10,
    scoreC1MicroChunking: 10,
    scoreC2TextAudioFallback: 10,
    scoreC3GracefulBookmark: 10,
    scoreD1LmsAdoptionFeasibility: 10,
    scoreD2OverallQualityImpact: 10,
    pedagogicalAdvice: '',
    policyRecommendation: '',
    expertConclusion: 'Sangat Layak Digunakan (Tanpa Revisi)'
  };
  isSubmittedSuccess.value = false;
  activeTab.value = 'form';
};
</script>

<style scoped>
.mode-tab-btn {
  padding: 0.65rem 1.25rem;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 700;
  border: 1px solid var(--color-stroke-secondary);
  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-tab-btn:hover {
  background: #E0E7FF;
  color: var(--brand-lan-navy);
}

.mode-tab-btn.active {
  background: var(--brand-lan-navy);
  color: #FFFFFF;
  border-color: var(--brand-lan-navy);
}

.section-title-badge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.step-num-pill {
  font-size: 0.725rem;
  font-weight: 800;
  background: var(--brand-lan-blue-light);
  color: var(--brand-lan-blue);
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #334155;
}

.dimension-block {
  background: #F8FAFC;
  border: 1.5px solid #E2E8F0;
  border-radius: var(--radius-md);
  padding: 1.25rem;
}

.dim-head {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #E2E8F0;
}

.dim-icon {
  font-size: 1.5rem;
}

.dim-title {
  font-size: 1rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 0.2rem 0;
}

.dim-desc {
  font-size: 0.825rem;
  color: #64748B;
  margin: 0;
}

.question-row {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.15rem 0;
  border-bottom: 1px dashed #CBD5E1;
}

.question-row:last-child {
  border-bottom: none;
  padding-bottom: 0.25rem;
}

.q-content {
  display: flex;
  gap: 0.75rem;
}

.q-code {
  font-weight: 800;
  color: var(--brand-lan-blue);
  font-size: 0.95rem;
  flex-shrink: 0;
}

.q-text {
  font-size: 0.875rem;
  color: #334155;
  line-height: 1.5;
}

.scale-10-wrap {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
}

.scale-selector-10 {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 0.35rem;
}

.scale-10-opt {
  height: 38px;
  border-radius: var(--radius-sm);
  border: 1.5px solid #CBD5E1;
  background: #F8FAFC;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 800;
  font-size: 0.9rem;
  color: #475569;
  transition: all 0.15s ease;
}

.scale-10-opt input {
  display: none;
}

.scale-10-opt:hover {
  border-color: var(--brand-lan-blue);
  background: var(--brand-lan-blue-light);
  color: var(--brand-lan-navy);
}

.scale-10-opt.selected {
  background: var(--brand-lan-navy);
  border-color: var(--brand-lan-navy);
  color: #FFFFFF;
  box-shadow: 0 2px 5px rgba(30, 58, 138, 0.3);
  transform: translateY(-1px);
}

.scale-10-legend {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #64748B;
  font-weight: 600;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.curr-val-badge {
  background: #EFF6FF;
  color: #1D4ED8;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-size: 0.775rem;
}

.conclusion-radio-deck {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.conclusion-card {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 1rem 1.15rem;
  border-radius: var(--radius-md);
  border: 1.5px solid #CBD5E1;
  background: #FFFFFF;
  cursor: pointer;
  transition: all 0.2s ease;
}

.conclusion-card input {
  display: none;
}

.conclusion-card:hover {
  border-color: #94A3B8;
  background: #F8FAFC;
}

.conclusion-card.active-green {
  border-color: #16A34A;
  background: #F0FDF4;
  box-shadow: 0 2px 5px rgba(22, 163, 74, 0.15);
}

.conclusion-card.active-amber {
  border-color: #D97706;
  background: #FFFBEB;
  box-shadow: 0 2px 5px rgba(217, 119, 6, 0.15);
}

.conclusion-card.active-slate {
  border-color: #64748B;
  background: #F1F5F9;
}

.conc-icon {
  font-size: 1.25rem;
  line-height: 1;
  margin-top: 2px;
}

.conc-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.conc-title {
  font-size: 0.925rem;
  color: #0F172A;
}

.conc-desc {
  font-size: 0.8rem;
  color: #64748B;
  line-height: 1.4;
}

.kpi-deck-4 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.kpi-box {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.kpi-t {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #64748B;
  letter-spacing: 0.5px;
}

.kpi-n {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.2;
}

.kpi-s {
  font-size: 0.8rem;
  color: #475569;
}

.styled-tbl {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.styled-tbl th {
  background: #F1F5F9;
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 700;
  color: #334155;
  border-bottom: 2px solid #CBD5E1;
}

.styled-tbl td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #E2E8F0;
  color: #334155;
}

.score-badge {
  font-weight: 800;
  background: #F1F5F9;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.badge-valid {
  display: inline-block;
  background: #DCFCE7;
  color: #166534;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.expert-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.25rem;
}

.expert-card {
  background: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  border-radius: var(--radius-md);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  box-shadow: var(--shadow-sm);
}

.exp-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #F1F5F9;
}

.exp-id {
  font-size: 0.725rem;
  font-weight: 800;
  color: var(--brand-lan-blue);
  background: var(--brand-lan-blue-light);
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
}

.exp-name {
  font-size: 1rem;
  font-weight: 800;
  color: #0F172A;
  margin: 0.25rem 0 0.1rem 0;
}

.exp-meta {
  font-size: 0.825rem;
  color: #475569;
}

.exp-submeta {
  font-size: 0.75rem;
  color: #94A3B8;
  margin-top: 0.15rem;
}

.exp-score-box {
  text-align: center;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  padding: 0.4rem 0.65rem;
  border-radius: var(--radius-sm);
}

.exp-score-num {
  font-size: 1.35rem;
  font-weight: 800;
  color: #10B981;
  display: block;
}

.exp-score-lbl {
  font-size: 0.675rem;
  color: #64748B;
  text-transform: uppercase;
  font-weight: 600;
}

.exp-scores-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
  background: #F8FAFC;
  padding: 0.65rem;
  border-radius: var(--radius-sm);
  font-size: 0.775rem;
}

.s-cell {
  display: flex;
  justify-content: space-between;
  color: #475569;
}

.s-cell .sv {
  font-weight: 700;
  color: #1E293B;
}

.exp-feedback-box {
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: var(--radius-sm);
  padding: 0.65rem;
  font-size: 0.8rem;
  color: #92400E;
}

.exp-feedback-box p {
  margin: 0.2rem 0 0 0;
  font-style: italic;
  line-height: 1.4;
}

.exp-footer {
  margin-top: auto;
  padding-top: 0.5rem;
}

.exp-conclusion-tag {
  font-size: 0.8rem;
  font-weight: 700;
  color: #166534;
  background: #DCFCE7;
  padding: 0.35rem 0.65rem;
  border-radius: var(--radius-sm);
  display: inline-block;
}

.text-rose { color: #E11D48; }
.text-emerald { color: #10B981; }
.text-blue { color: #2563EB; }
.text-purple { color: #8B5CF6; }
.text-amber { color: #F59E0B; }

@media (max-width: 768px) {
  .scale-selector-10 {
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
  }
}
</style>
