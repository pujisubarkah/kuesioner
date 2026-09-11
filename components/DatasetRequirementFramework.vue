<template>
  <div class="dataset-framework-container">
    <!-- Banner Header -->
    <div class="framework-banner">
      <div class="banner-top-badges">
        <span class="badge-tag mindmap">🧠 Visual Mindmap Framework</span>
        <span class="badge-tag missingness">🧩 Missingness Attribution</span>
        <span class="badge-tag context">🏛️ SPBE & IPP Data Terintegrasi</span>
        <span class="badge-tag validation">⚡ Explanatory Power Grounded</span>
      </div>
      <h2 class="banner-title">
        Mindmap & Kerangka Spesifikasi Dataset Berbasis Literatur
      </h2>
      <p class="banner-desc">
        Peta pohon konseptual (<em>Mindmap</em>) yang menghubungkan domain spesifik <strong>Kompetensi Layanan Publik ASN</strong> dengan variabel dataset empiris kuesioner, taksonomi penanganan <em>missingness</em>/inaktivitas cerdas, dan data evaluasi nasional (<strong>Indeks SPBE & IPP 2025</strong>).
      </p>
    </div>

    <!-- Framework Sub-navigation Tabs -->
    <div class="framework-tabs-bar">
      <button 
        v-for="tab in frameworkTabs" 
        :key="tab.id"
        :class="['framework-tab-btn', activeTab === tab.id ? 'active' : '']"
        @click="activeTab = tab.id"
      >
        <component :is="tab.icon" class="tab-icon" />
        {{ tab.label }}
      </button>
    </div>

    <!-- TAB 1: Visual Mindmap Tree (Interactive ECharts Mindmap) -->
    <div v-show="activeTab === 'mindmap'" class="framework-content-section">
      <div class="mindmap-card">
        <div class="mindmap-header-bar">
          <div>
            <h3 class="section-title" style="margin-bottom: 0.2rem;">
              🌳 Interactive Mindmap: Hierarki Domain, Literatur, & Dataset
            </h3>
            <p class="section-desc" style="margin-bottom: 0;">
              Klik pada lingkaran node (bulatan biru/ungu/hijau) untuk melebarkan/menciutkan cabang (<em>expand/collapse</em>), geser & zoom kanvas untuk eksplorasi detail.
            </p>
          </div>

          <div class="mindmap-controls">
            <button class="btn btn-secondary btn-sm" @click="expandAllNodes">
              📂 Buka Semua Cabang
            </button>
            <button class="btn btn-secondary btn-sm" @click="collapseAllNodes">
              📁 Ciutkan Cabang
            </button>
            <button class="btn btn-outline btn-sm" @click="resetMindmapZoom" title="Reset Posisi & Zoom">
              🔄 Reset Zoom
            </button>
          </div>
        </div>

        <!-- ECharts Mindmap Canvas -->
        <div ref="mindmapContainerRef" class="mindmap-canvas"></div>

        <!-- Node Detail Drawer / Info Banner -->
        <div v-if="selectedNodeInfo" class="node-info-callout">
          <div class="node-info-header">
            <span class="info-badge">{{ selectedNodeInfo.category || 'Node Detail' }}</span>
            <h4 class="info-title">{{ selectedNodeInfo.name }}</h4>
            <button class="close-btn" @click="selectedNodeInfo = null">✕</button>
          </div>
          <p class="info-body">{{ selectedNodeInfo.description || selectedNodeInfo.value }}</p>
          <div v-if="selectedNodeInfo.literature" class="info-meta">
            <strong>📖 Literatur Acuan:</strong> {{ selectedNodeInfo.literature }}
          </div>
          <div v-if="selectedNodeInfo.questions" class="info-meta">
            <strong>📝 Soal Kuesioner:</strong> {{ selectedNodeInfo.questions }}
          </div>
          <div v-if="selectedNodeInfo.role" class="info-meta">
            <strong>⚡ Peran Sistem:</strong> {{ selectedNodeInfo.role }}
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: Taksonomi Missingness & Friksi Cerdas -->
    <div v-if="activeTab === 'missingness'" class="framework-content-section">
      <!-- Paradigm Banner -->
      <div class="card" style="padding: 1.5rem 1.75rem; background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%); color: #FFFFFF; border: 1px solid rgba(255,255,255,0.15);">
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
          <span class="badge" style="background: rgba(168, 85, 247, 0.25); color: #C084FC; border: 1px solid rgba(192, 132, 252, 0.3);">
            🧠 Kebaruan Metodologi Learning Analytics
          </span>
          <span class="badge" style="background: rgba(59, 130, 246, 0.25); color: #60A5FA; border: 1px solid rgba(96, 165, 250, 0.3);">
            Rubin Missing Data Theory Extension
          </span>
        </div>
        <h3 style="font-size: 1.35rem; font-weight: 800; color: #F8FAFC; margin-bottom: 0.4rem;">
          Context-Aware Missingness & Friksi Lapangan ASN
        </h3>
        <p style="font-size: 0.9rem; color: #C7D2FE; margin: 0; max-width: 950px; line-height: 1.6;">
          Dalam sistem konvensional, ketidakaktifan (<em>inactivity/dropout</em>) sering kali dicap sebagai "kurang motivasi". Model disertasi ini mematahkan paradigma tersebut: <strong>Inaktivitas belajar ASN adalah respons rasional terhadap kendala spasial eksternal (listrik/sinyal) dan friksi pelayanan publik mendadak</strong>.
        </p>
      </div>

      <!-- 3 Taxonomy Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem;">
        <!-- Card 1: Spatial -->
        <div class="card" style="border-top: 5px solid #7C3AED; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <span class="badge" style="background: #EDE9FE; color: #7C3AED; font-weight: 800; font-family: monospace;">MNAR-S (Spatial)</span>
            <span style="font-size: 0.75rem; font-weight: 700; color: #7C3AED;">Moderator: M_spatial</span>
          </div>
          <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--color-text-primary); margin: 0;">
            1. Spatial-Exogenous Missingness
          </h4>
          <p style="font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.5; margin: 0;">
            Inaktivitas yang dipicu oleh faktor fisik geografis di luar kendali ASN (pemadaman listrik wilayah, sinyal blankspot 3T, perangkat drop).
          </p>
          <div style="background: var(--color-surface-secondary); padding: 0.75rem; border-radius: var(--radius-md); font-size: 0.8rem;">
            <strong>📝 Data Kuesioner:</strong> Q12 (Frekuensi gangguan), Q13 (Listrik padam), Q47 (Sinyal drop saat Zoom).
          </div>
          <div style="background: #FAF5FF; border: 1px solid #E9D5FF; padding: 0.75rem; border-radius: var(--radius-md); font-size: 0.8rem; color: #6B21A8;">
            <strong>⚡ Respon Mesin Adaptif:</strong>
            <ul style="margin: 0.3rem 0 0 1rem; padding: 0;">
              <li><strong>Zero-Penalty Policy:</strong> Jangan kurangi nilai absensi.</li>
              <li>Otomatis beralih ke <em>Offline Caching & Audio Recap</em>.</li>
            </ul>
          </div>
        </div>

        <!-- Card 2: Workload / Service -->
        <div class="card" style="border-top: 5px solid #2563EB; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <span class="badge" style="background: #DBEAFE; color: #1D4ED8; font-weight: 800; font-family: monospace;">MAR-W (Workload)</span>
            <span style="font-size: 0.75rem; font-weight: 700; color: #1D4ED8;">Prediktor: X_service</span>
          </div>
          <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--color-text-primary); margin: 0;">
            2. Service-Friction Missingness
          </h4>
          <p style="font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.5; margin: 0;">
            Inaktivitas akibat interupsi tugas mendadak dari pimpinan, SPPD luar kota, atau panggilan melayani antrean warga di loket.
          </p>
          <div style="background: var(--color-surface-secondary); padding: 0.75rem; border-radius: var(--radius-md); font-size: 0.8rem;">
            <strong>📝 Data Kuesioner:</strong> Q15 (Beban tugas), Q17 (Instruksi mendadak), Q47 (Mengurus warga saat Zoom).
          </div>
          <div style="background: #EFF6FF; border: 1px solid #BFDBFE; padding: 0.75rem; border-radius: var(--radius-md); font-size: 0.8rem; color: #1E40AF;">
            <strong>⚡ Respon Mesin Adaptif:</strong>
            <ul style="margin: 0.3rem 0 0 1rem; padding: 0;">
              <li><strong>Graceful Auto-Bookmark:</strong> Simpan progres otomatis.</li>
              <li>Pecah modul menjadi <em>Micro-pacing (3–5 menit)</em>.</li>
            </ul>
          </div>
        </div>

        <!-- Card 3: Cognitive Fatigue -->
        <div class="card" style="border-top: 5px solid #059669; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <span class="badge" style="background: #DCFCE7; color: #15803D; font-weight: 800; font-family: monospace;">MCAR-C (Cognitive)</span>
            <span style="font-size: 0.75rem; font-weight: 700; color: #15803D;">Prediktor: X_behavior</span>
          </div>
          <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--color-text-primary); margin: 0;">
            3. Cognitive-Fatigue Missingness
          </h4>
          <p style="font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.5; margin: 0;">
            Kelelahan menatap layar (<em>Zoom fatigue</em>), perhatian terbelah (<em>multitasking</em>), dan hilangnya fokus belajar setelah 15 menit.
          </p>
          <div style="background: var(--color-surface-secondary); padding: 0.75rem; border-radius: var(--radius-md); font-size: 0.8rem;">
            <strong>📝 Data Kuesioner:</strong> Q25 (Durasi fokus), Q27 (Multitasking), Q46 & Q47 (Kamera off pasif).
          </div>
          <div style="background: #F0FDF4; border: 1px solid #BBF7D0; padding: 0.75rem; border-radius: var(--radius-md); font-size: 0.8rem; color: #166534;">
            <strong>⚡ Respon Mesin Adaptif:</strong>
            <ul style="margin: 0.3rem 0 0 1rem; padding: 0;">
              <li><strong>Smart Cognitive Pause:</strong> Berikan jeda interaktif.</li>
              <li>Picu <em>Checkpoint</em> 1 pertanyaan ringan berbasis audio/teks.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Decision Matrix Table -->
      <div class="table-card">
        <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--color-text-primary); margin-bottom: 0.5rem;">
          📑 Matriks Algoritma Pengambilan Keputusan (LMS Adaptive Decision Rules)
        </h4>
        <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 1.25rem;">
          Aturan logika sistem rekomendasi saat mendeteksi *trigger* inaktivitas/missingness dari perilaku ASN di platform.
        </p>

        <div class="table-responsive">
          <table class="spec-table">
            <thead>
              <tr>
                <th>Sinyal Deteksi di LMS / Kuesioner</th>
                <th>Klasifikasi Missingness</th>
                <th>Kondisi Lingkungan ASN</th>
                <th>Tindakan Sistem Adaptif (Intervention)</th>
                <th>Status Nilai & Rekam Jejak</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Kamera Zoom Mati & Sinyal Turun</strong></td>
                <td><span class="badge" style="background:#EDE9FE; color:#7C3AED; font-weight:800;">MNAR-S</span></td>
                <td>Wilayah 3T / Sinyal Rendah (M_spatial > 60)</td>
                <td>Turunkan resolusi ke audio-only & kirimkan transkrip teks otomatis.</td>
                <td><span class="badge" style="background:#DCFCE7; color:#166534; font-weight:700;">100% Hadir (No Penalty)</span></td>
              </tr>
              <tr>
                <td><strong>Sesi Belajar Ditutup Tiba-tiba di Menit ke-4</strong></td>
                <td><span class="badge" style="background:#DBEAFE; color:#1D4ED8; font-weight:800;">MAR-W</span></td>
                <td>Beban Tugas Tinggi (X_service > 70)</td>
                <td>Simpan bookmark titik henti & kirim notifikasi ringkasan 3 butir via email/WA.</td>
                <td><span class="badge" style="background:#DBEAFE; color:#1E40AF; font-weight:700;">Progres Tersimpan (Auto-Resume)</span></td>
              </tr>
              <tr>
                <td><strong>Inaktivitas Kursor / Tab Berpindah > 5 Menit</strong></td>
                <td><span class="badge" style="background:#DCFCE7; color:#15803D; font-weight:800;">MCAR-C</span></td>
                <td>Multitasking Tinggi (X_behavior > 65)</td>
                <td>Tampilkan popup kuis 1-pertanyaan interaktif untuk mengembalikan fokus.</td>
                <td><span class="badge" style="background:#FEF3C7; color:#92400E; font-weight:700;">Fokus Re-engagement</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 3: Matriks Komparasi SPBE x IPP Nasional (2025) -->
    <div v-if="activeTab === 'spbe-ipp'" class="framework-content-section">
      <!-- 🎛️ PERSPECTIVE SELECTOR BAR -->
      <div class="card" style="padding: 1.25rem 1.5rem; background: var(--color-surface-card); border: 1px solid var(--color-stroke-secondary); display: flex; flex-direction: column; gap: 0.85rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.25rem;">🎛️</span>
            <span style="font-size: 0.95rem; font-weight: 800; color: var(--color-text-primary);">
              PILIH SUDUT PANDANG MATRIKS 4-KUADRAN:
            </span>
          </div>
          <span style="font-size: 0.775rem; color: var(--color-text-secondary); font-weight: 600;">
            Triangulasi 3 Tingkat Analisis: Makro (Institusi), Mikro (Perilaku Belajar ASN), & Meso (Spasial Wilayah)
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.75rem;">
          <button
            type="button"
            @click="setPerspective('macro')"
            :class="['perspective-btn', quadrantPerspective === 'macro' ? 'active-perspective' : '']"
          >
            <span style="font-size: 1.35rem;">🏛️</span>
            <div style="text-align: left;">
              <div style="font-weight: 800; font-size: 0.85rem;">1. Makro: SPBE × Pelayanan Publik (IPP)</div>
              <div class="perspective-sub">Kesiapan Ekosistem Digital Pemda vs Mutu Layanan</div>
            </div>
          </button>

          <button
            type="button"
            @click="setPerspective('micro')"
            :class="['perspective-btn', quadrantPerspective === 'micro' ? 'active-perspective' : '']"
          >
            <span style="font-size: 1.35rem;">⚡</span>
            <div style="text-align: left;">
              <div style="font-weight: 800; font-size: 0.85rem;">2. Mikro: Beban Kerja Pelayanan × Keterlibatan Belajar</div>
              <div class="perspective-sub">Dinamika Disposisi Dinas vs Telemetri Zoom & LMS</div>
            </div>
          </button>

          <button
            type="button"
            @click="setPerspective('meso')"
            :class="['perspective-btn', quadrantPerspective === 'meso' ? 'active-perspective' : '']"
          >
            <span style="font-size: 1.35rem;">🗺️</span>
            <div style="text-align: left;">
              <div style="font-weight: 800; font-size: 0.85rem;">3. Meso: Tipologi 4 Daerah × Aksesibilitas Jaringan</div>
              <div class="perspective-sub">Karakteristik Wilayah Administratif vs Kapasitas TIK</div>
            </div>
          </button>
        </div>
      </div>

      <!-- Top Paradigm Overview Card (Dynamic based on currentPerspectiveData) -->
      <div class="card" style="padding: 1.5rem 1.75rem; background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color: #FFFFFF; border: 1px solid rgba(255,255,255,0.15);">
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
          <span 
            v-for="(badge, bIdx) in currentPerspectiveData.badges" 
            :key="bIdx" 
            class="badge" 
            :style="{ background: badge.bg, color: badge.color, border: `1px solid ${badge.border}` }"
          >
            {{ badge.label }}
          </span>
        </div>
        <h3 style="font-size: 1.35rem; font-weight: 800; color: #F8FAFC; margin-bottom: 0.4rem;">
          {{ currentPerspectiveData.title }}
        </h3>
        <p style="font-size: 0.9rem; color: #94A3B8; margin: 0; max-width: 950px; line-height: 1.6;">
          {{ currentPerspectiveData.subtitle }}
        </p>
        <div style="display: flex; gap: 1rem; margin-top: 0.75rem; font-size: 0.8rem; color: #CBD5E1; flex-wrap: wrap;">
          <div><strong>Sumbu X:</strong> {{ currentPerspectiveData.xAxis }}</div>
          <div style="color: #64748B;">•</div>
          <div><strong>Sumbu Y:</strong> {{ currentPerspectiveData.yAxis }}</div>
        </div>
      </div>

      <!-- 4-Quadrant KPI Hero Cards (Interactive Filters) -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
        <!-- Kuadran I -->
        <div 
          :class="['card', 'quadrant-stat-card', evalQuadrantFilter === 'q1' ? 'active-q1' : '']"
          style="padding: 1.25rem; border-top: 4px solid #10B981; cursor: pointer;"
          @click="setEvalQuadrantFilter(evalQuadrantFilter === 'q1' ? 'all' : 'q1')"
        >
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <span class="badge" style="background: #DCFCE7; color: #166534; font-weight: 800;">Kuadran I</span>
            <span style="font-size: 1.75rem; font-weight: 800; color: #10B981;">{{ currentPerspectiveData.q1.count }} <span style="font-size: 0.75rem; color: var(--color-text-muted);">{{ currentPerspectiveData.q1.unit }}</span></span>
          </div>
          <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--color-text-primary); margin: 0.4rem 0 0.2rem 0;">
            {{ currentPerspectiveData.q1.title }}
          </h4>
          <div style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4;">
            <strong>{{ currentPerspectiveData.q1.tag }}:</strong> {{ currentPerspectiveData.q1.desc }}
          </div>
          <div style="margin-top: 0.5rem; padding: 0.4rem 0.5rem; background: #F0FDF4; border-radius: 4px; font-size: 0.725rem; color: #166534;">
            📖 <strong>Teori Acuan:</strong> <em>{{ currentPerspectiveData.q1.theory }}</em>
          </div>
          <div style="font-size: 0.725rem; color: #047857; margin-top: 0.35rem; font-weight: 700;">
            🎯 Modul: <em>{{ currentPerspectiveData.q1.module }}</em>
          </div>
        </div>

        <!-- Kuadran II -->
        <div 
          :class="['card', 'quadrant-stat-card', evalQuadrantFilter === 'q2' ? 'active-q2' : '']"
          style="padding: 1.25rem; border-top: 4px solid #2563EB; cursor: pointer;"
          @click="setEvalQuadrantFilter(evalQuadrantFilter === 'q2' ? 'all' : 'q2')"
        >
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <span class="badge" style="background: #DBEAFE; color: #1E40AF; font-weight: 800;">Kuadran II</span>
            <span style="font-size: 1.75rem; font-weight: 800; color: #2563EB;">{{ currentPerspectiveData.q2.count }} <span style="font-size: 0.75rem; color: var(--color-text-muted);">{{ currentPerspectiveData.q2.unit }}</span></span>
          </div>
          <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--color-text-primary); margin: 0.4rem 0 0.2rem 0;">
            {{ currentPerspectiveData.q2.title }}
          </h4>
          <div style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4;">
            <strong>{{ currentPerspectiveData.q2.tag }}:</strong> {{ currentPerspectiveData.q2.desc }}
          </div>
          <div style="margin-top: 0.5rem; padding: 0.4rem 0.5rem; background: #EFF6FF; border-radius: 4px; font-size: 0.725rem; color: #1E40AF;">
            📖 <strong>Teori Acuan:</strong> <em>{{ currentPerspectiveData.q2.theory }}</em>
          </div>
          <div style="font-size: 0.725rem; color: #1D4ED8; margin-top: 0.35rem; font-weight: 700;">
            🎯 Modul: <em>{{ currentPerspectiveData.q2.module }}</em>
          </div>
        </div>

        <!-- Kuadran III -->
        <div 
          :class="['card', 'quadrant-stat-card', evalQuadrantFilter === 'q3' ? 'active-q3' : '']"
          style="padding: 1.25rem; border-top: 4px solid #D97706; cursor: pointer;"
          @click="setEvalQuadrantFilter(evalQuadrantFilter === 'q3' ? 'all' : 'q3')"
        >
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <span class="badge" style="background: #FEF3C7; color: #92400E; font-weight: 800;">Kuadran III</span>
            <span style="font-size: 1.75rem; font-weight: 800; color: #D97706;">{{ currentPerspectiveData.q3.count }} <span style="font-size: 0.75rem; color: var(--color-text-muted);">{{ currentPerspectiveData.q3.unit }}</span></span>
          </div>
          <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--color-text-primary); margin: 0.4rem 0 0.2rem 0;">
            {{ currentPerspectiveData.q3.title }}
          </h4>
          <div style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4;">
            <strong>{{ currentPerspectiveData.q3.tag }}:</strong> {{ currentPerspectiveData.q3.desc }}
          </div>
          <div style="margin-top: 0.5rem; padding: 0.4rem 0.5rem; background: #FFFBEB; border-radius: 4px; font-size: 0.725rem; color: #92400E;">
            📖 <strong>Teori Acuan:</strong> <em>{{ currentPerspectiveData.q3.theory }}</em>
          </div>
          <div style="font-size: 0.725rem; color: #B45309; margin-top: 0.35rem; font-weight: 700;">
            🎯 Modul: <em>{{ currentPerspectiveData.q3.module }}</em>
          </div>
        </div>

        <!-- Kuadran IV -->
        <div 
          :class="['card', 'quadrant-stat-card', evalQuadrantFilter === 'q4' ? 'active-q4' : '']"
          style="padding: 1.25rem; border-top: 4px solid #7C3AED; cursor: pointer;"
          @click="setEvalQuadrantFilter(evalQuadrantFilter === 'q4' ? 'all' : 'q4')"
        >
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <span class="badge" style="background: #EDE9FE; color: #6B21A8; font-weight: 800;">Kuadran IV</span>
            <span style="font-size: 1.75rem; font-weight: 800; color: #7C3AED;">{{ currentPerspectiveData.q4.count }} <span style="font-size: 0.75rem; color: var(--color-text-muted);">{{ currentPerspectiveData.q4.unit }}</span></span>
          </div>
          <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--color-text-primary); margin: 0.4rem 0 0.2rem 0;">
            {{ currentPerspectiveData.q4.title }}
          </h4>
          <div style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4;">
            <strong>{{ currentPerspectiveData.q4.tag }}:</strong> {{ currentPerspectiveData.q4.desc }}
          </div>
          <div style="margin-top: 0.5rem; padding: 0.4rem 0.5rem; background: #FAF5FF; border-radius: 4px; font-size: 0.725rem; color: #6B21A8;">
            📖 <strong>Teori Acuan:</strong> <em>{{ currentPerspectiveData.q4.theory }}</em>
          </div>
          <div style="font-size: 0.725rem; color: #6B21A8; margin-top: 0.35rem; font-weight: 700;">
            🎯 Modul: <em>{{ currentPerspectiveData.q4.module }}</em>
          </div>
        </div>
      </div>

      <!-- Detailed Theoretical Foundation Accordion / Cards Box -->
      <div class="card" style="padding: 1.5rem 1.75rem; border-left: 4px solid #3B82F6;">
        <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--color-text-primary); margin-bottom: 0.35rem;">
          📚 Landasan Teoretis & Justifikasi Literatur 4-Kuadran
        </h4>
        <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 1.25rem;">
          Penjelasan komprehensif mengapa setiap kombinasi kuadran memerlukan paket materi dan format pembelajaran yang berbeda secara ilmiah:
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
          <!-- Theory 1 -->
          <div style="background: var(--color-surface-secondary); padding: 1rem; border-radius: var(--radius-md); border-top: 3px solid #10B981;">
            <div style="font-size: 0.75rem; font-weight: 800; color: #10B981; margin-bottom: 0.2rem;">KUADRAN I: {{ currentPerspectiveData.q1.title.toUpperCase() }}</div>
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-primary); margin-bottom: 0.35rem;">{{ currentPerspectiveData.q1.theoryTitle }}</div>
            <div style="font-size: 0.775rem; color: #475569; line-height: 1.45;">
              <strong>Rasional Ilmiah:</strong> {{ currentPerspectiveData.q1.theoryDesc }}
            </div>
          </div>

          <!-- Theory 2 -->
          <div style="background: var(--color-surface-secondary); padding: 1rem; border-radius: var(--radius-md); border-top: 3px solid #2563EB;">
            <div style="font-size: 0.75rem; font-weight: 800; color: #2563EB; margin-bottom: 0.2rem;">KUADRAN II: {{ currentPerspectiveData.q2.title.toUpperCase() }}</div>
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-primary); margin-bottom: 0.35rem;">{{ currentPerspectiveData.q2.theoryTitle }}</div>
            <div style="font-size: 0.775rem; color: #475569; line-height: 1.45;">
              <strong>Rasional Ilmiah:</strong> {{ currentPerspectiveData.q2.theoryDesc }}
            </div>
          </div>

          <!-- Theory 3 -->
          <div style="background: var(--color-surface-secondary); padding: 1rem; border-radius: var(--radius-md); border-top: 3px solid #D97706;">
            <div style="font-size: 0.75rem; font-weight: 800; color: #D97706; margin-bottom: 0.2rem;">KUADRAN III: {{ currentPerspectiveData.q3.title.toUpperCase() }}</div>
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-primary); margin-bottom: 0.35rem;">{{ currentPerspectiveData.q3.theoryTitle }}</div>
            <div style="font-size: 0.775rem; color: #475569; line-height: 1.45;">
              <strong>Rasional Ilmiah:</strong> {{ currentPerspectiveData.q3.theoryDesc }}
            </div>
          </div>

          <!-- Theory 4 -->
          <div style="background: var(--color-surface-secondary); padding: 1rem; border-radius: var(--radius-md); border-top: 3px solid #7C3AED;">
            <div style="font-size: 0.75rem; font-weight: 800; color: #7C3AED; margin-bottom: 0.2rem;">KUADRAN IV: {{ currentPerspectiveData.q4.title.toUpperCase() }}</div>
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-primary); margin-bottom: 0.35rem;">{{ currentPerspectiveData.q4.theoryTitle }}</div>
            <div style="font-size: 0.775rem; color: #475569; line-height: 1.45;">
              <strong>Rasional Ilmiah:</strong> {{ currentPerspectiveData.q4.theoryDesc }}
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Controls Row -->
      <div class="control-panel-card" style="margin-bottom: 0;">
        <!-- Entity Filter for Macro only -->
        <div v-if="quadrantPerspective === 'macro'" style="display: flex; flex-direction: column; gap: 0.4rem;">
          <label class="filter-label">Cakupan Wilayah / Entitas Instansi:</label>
          <div class="pill-buttons-row">
            <button 
              :class="['pill-btn', evalTypeFilter === 'pemda' ? 'active' : '']"
              @click="setEvalTypeFilter('pemda')"
            >
              🏛️ Pemerintah Daerah Saja (518 Pemda)
            </button>
            <button 
              :class="['pill-btn', evalTypeFilter === 'kl' ? 'active' : '']"
              @click="setEvalTypeFilter('kl')"
            >
              🏢 Kementerian & Lembaga (Pusat - DKI Jakarta)
            </button>
            <button 
              :class="['pill-btn', evalTypeFilter === 'all' ? 'active' : '']"
              @click="setEvalTypeFilter('all')"
            >
              🌐 Semua Instansi (Nasional)
            </button>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
          <label class="filter-label">Filter Berdasarkan Kuadran:</label>
          <div class="pill-buttons-row">
            <button 
              :class="['pill-btn', evalQuadrantFilter === 'all' ? 'active' : '']"
              @click="setEvalQuadrantFilter('all')"
            >
              Semua Kuadran ({{ currentPerspectiveData.counts.total }})
            </button>
            <button 
              :class="['pill-btn', evalQuadrantFilter === 'q1' ? 'active' : '']"
              @click="setEvalQuadrantFilter('q1')"
            >
              Kuadran I ({{ currentPerspectiveData.counts.q1 }})
            </button>
            <button 
              :class="['pill-btn', evalQuadrantFilter === 'q2' ? 'active' : '']"
              @click="setEvalQuadrantFilter('q2')"
            >
              Kuadran II ({{ currentPerspectiveData.counts.q2 }})
            </button>
            <button 
              :class="['pill-btn', evalQuadrantFilter === 'q3' ? 'active' : '']"
              @click="setEvalQuadrantFilter('q3')"
            >
              Kuadran III ({{ currentPerspectiveData.counts.q3 }})
            </button>
            <button 
              :class="['pill-btn', evalQuadrantFilter === 'q4' ? 'active' : '']"
              @click="setEvalQuadrantFilter('q4')"
            >
              Kuadran IV ({{ currentPerspectiveData.counts.q4 }})
            </button>
          </div>
        </div>

        <div class="search-box-wrapper" style="width: 260px;">
          <input 
            v-model="evalSearchQuery"
            @input="fetchEvaluationsData"
            type="text" 
            :placeholder="quadrantPerspective === 'micro' ? 'Cari ID ASN / Instansi...' : 'Cari nama pemda / wilayah...'" 
            class="form-control"
            style="font-size: 0.85rem;"
          />
        </div>
      </div>

      <!-- Unified Comparative Matrix Table (Perspective Specific) -->
      <div class="table-card">
        <!-- HEADER 1: MACRO TABLE HEADER -->
        <div v-if="quadrantPerspective === 'macro'" class="table-header-info">
          <div>
            <h3 class="table-title">📑 Tabel Komparasi Terpadu SPBE × IPP Nasional (Tingkat Makro)</h3>
            <p style="font-size: 0.825rem; color: var(--color-text-secondary); margin: 0.2rem 0 0 0;">
              Data ini menjadi <em>objective ground-truth label</em> evaluasi pemda untuk memandu rekomendasi materi pembelajaran institusional.
            </p>
          </div>
          <span class="badge-counter">Menampilkan {{ evalMatrix.items.length }} Daerah / Instansi</span>
        </div>

        <!-- HEADER 2: MICRO TABLE HEADER -->
        <div v-else-if="quadrantPerspective === 'micro'" class="table-header-info">
          <div>
            <h3 class="table-title">⚡ Profil Perilaku Belajar ASN & Beban Kerja Kedinasan (Tingkat Mikro)</h3>
            <p style="font-size: 0.825rem; color: var(--color-text-secondary); margin: 0.2rem 0 0 0;">
              Triangulasi interupsi tugas kedinasan publik dengan jejak telemetri Zoom dan klik LMS Moodle untuk pemodelan CCBN.
            </p>
          </div>
          <span class="badge-counter">Menampilkan {{ filteredMicroItems.length }} Profil ASN</span>
        </div>

        <!-- HEADER 3: MESO TABLE HEADER -->
        <div v-else-if="quadrantPerspective === 'meso'" class="table-header-info">
          <div>
            <h3 class="table-title">🗺️ Matriks Klaster Spasial 4 Tipologi Daerah & Aksesibilitas TIK (Tingkat Meso)</h3>
            <p style="font-size: 0.825rem; color: var(--color-text-secondary); margin: 0.2rem 0 0 0;">
              Pemetaan kondisi geografis administratif dan disparitas jaringan untuk kebijakan format diklat adaptif (fair delivery).
            </p>
          </div>
          <span class="badge-counter">Menampilkan {{ filteredMesoItems.length }} Wilayah Pemda</span>
        </div>

        <!-- 1. TABLE VIEW: MACRO (SPBE x IPP) -->
        <div v-if="quadrantPerspective === 'macro'" class="table-responsive">
          <table class="spec-table" style="font-size: 0.85rem;">
            <thead>
              <tr>
                <th style="width: 24%;">Nama Instansi / Pemerintah Daerah</th>
                <th style="width: 12%;">Kategori</th>
                <th style="width: 13%;">Predikat SPBE (2025)</th>
                <th style="width: 12%;">Predikat IPP (2025)</th>
                <th style="width: 15%;">Kuadran Tipologi</th>
                <th style="width: 24%;">Landasan Teori & Rekomendasi Modul</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in evalMatrix.items" :key="item.nama" class="spec-row">
                <td style="font-weight: 700; color: var(--color-text-primary);">
                  {{ item.nama }}
                </td>
                <td>
                  <span class="badge" style="background: #F1F5F9; color: #475569; font-size: 0.75rem;">
                    {{ item.category }}
                  </span>
                </td>
                <td>
                  <span v-if="item.spbe_predikat" class="badge" :style="getSpbeBadgeStyle(item.spbe_predikat)">
                    {{ item.spbe_predikat }}
                  </span>
                  <span v-else style="color: #94A3B8; font-size: 0.75rem; font-style: italic;">
                    Belum Terindeks
                  </span>
                </td>
                <td>
                  <span v-if="item.ipp_predikat" class="badge" :style="getIppBadgeStyle(item.ipp_predikat)">
                    Predikat {{ item.ipp_predikat }}
                  </span>
                  <span v-else style="color: #94A3B8; font-size: 0.75rem; font-style: italic;">
                    Belum Terindeks
                  </span>
                </td>
                <td>
                  <span 
                    class="badge" 
                    :style="getQuadrantBadgeStyle(item.quadrant_code)"
                  >
                    {{ item.quadrant_title }}
                  </span>
                </td>
                <td>
                  <div style="font-size: 0.725rem; color: #2563EB; font-weight: 700; margin-bottom: 0.2rem;">
                    📖 {{ item.quadrant_theory || 'Grounded Theory' }}
                  </div>
                  <div style="font-size: 0.8rem; color: var(--color-text-secondary); line-height: 1.4;">
                    🎯 <strong>{{ item.recommended_module }}</strong>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 2. TABLE VIEW: MICRO (ASN Workload vs Zoom/LMS) -->
        <div v-else-if="quadrantPerspective === 'micro'" class="table-responsive">
          <table class="spec-table" style="font-size: 0.85rem;">
            <thead>
              <tr>
                <th style="width: 20%;">ID Pegawai & Instansi</th>
                <th style="width: 12%;">Tipologi Daerah</th>
                <th style="width: 18%;">Beban Kedinasan (Q15)</th>
                <th style="width: 22%;">Jejak Zoom & LMS Moodle</th>
                <th style="width: 13%;">Kuadran Mikro</th>
                <th style="width: 15%;">Intervensi CCBN</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredMicroItems" :key="item.id" class="spec-row">
                <td>
                  <div style="font-weight: 800; color: var(--color-text-primary);">{{ item.name }}</div>
                  <div style="font-size: 0.75rem; color: var(--color-text-muted);">{{ item.instansi }}</div>
                </td>
                <td>
                  <span class="badge" style="background: #F1F5F9; color: #475569; font-size: 0.75rem;">
                    {{ item.tipologi }}
                  </span>
                </td>
                <td>
                  <div style="font-weight: 700; color: #B45309; font-size: 0.8rem;">{{ item.beban_level }}</div>
                  <div style="font-size: 0.75rem; color: var(--color-text-secondary);">{{ item.beban_desc }}</div>
                </td>
                <td>
                  <div style="font-size: 0.75rem; color: #1E40AF; font-family: monospace;">📹 {{ item.zoom_behavior }}</div>
                  <div style="font-size: 0.75rem; color: #0E7490; font-family: monospace; margin-top: 0.15rem;">💻 {{ item.lms_behavior }}</div>
                </td>
                <td>
                  <span class="badge" :style="getQuadrantBadgeStyle(item.quadrant)">
                    Kuadran {{ item.quadrant.toUpperCase() }}
                  </span>
                </td>
                <td>
                  <div style="font-size: 0.775rem; font-weight: 700; color: #047857;">
                    🎯 {{ item.modul }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 3. TABLE VIEW: MESO (Spatial Typology vs Connectivity) -->
        <div v-else-if="quadrantPerspective === 'meso'" class="table-responsive">
          <table class="spec-table" style="font-size: 0.85rem;">
            <thead>
              <tr>
                <th style="width: 22%;">Pemerintah Daerah</th>
                <th style="width: 15%;">Tipologi Spasial</th>
                <th style="width: 20%;">Karakter Geografis</th>
                <th style="width: 18%;">Infrastruktur TIK</th>
                <th style="width: 12%;">Kuadran Meso</th>
                <th style="width: 13%;">Delivery Diklat</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredMesoItems" :key="item.nama" class="spec-row">
                <td style="font-weight: 700; color: var(--color-text-primary);">
                  {{ item.nama }}
                </td>
                <td>
                  <span class="badge" style="background: #EDE9FE; color: #6B21A8; font-size: 0.75rem; font-weight: 700;">
                    {{ item.tipologi }}
                  </span>
                </td>
                <td style="font-size: 0.8rem; color: var(--color-text-secondary);">
                  {{ item.geografi }}
                </td>
                <td style="font-size: 0.8rem; color: #0E7490;">
                  📶 {{ item.konektivitas }}
                </td>
                <td>
                  <span class="badge" :style="getQuadrantBadgeStyle(item.quadrant)">
                    Kuadran {{ item.quadrant.toUpperCase() }}
                  </span>
                </td>
                <td>
                  <div style="font-size: 0.775rem; font-weight: 700; color: #2563EB;">
                    🚚 {{ item.delivery }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 4: Matriks Pemetaan Dataset & Literatur Review (Table View) -->
    <div v-if="activeTab === 'mapping'" class="framework-content-section">
      <!-- Search & Filter Controls -->
      <div class="control-panel-card">
        <div class="filter-group">
          <label class="filter-label">Filter Dimensi Data:</label>
          <div class="pill-buttons-row">
            <button 
              v-for="cat in ['SEMUA', 'Konteks Belajar (C_learn)', 'Konteks Layanan (C_apply)', 'Perilaku & Beban Kerja', 'Target Kompetensi', 'Validasi Explanatory Power']"
              :key="cat"
              :class="['pill-btn', selectedCategory === cat ? 'active' : '']"
              @click="selectedCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <div class="search-box-wrapper">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Cari variabel, paper literatur, atau no. kuesioner..." 
            class="form-control"
          />
        </div>
      </div>

      <!-- Main Specifications Table -->
      <div class="table-card">
        <div class="table-header-info">
          <h3 class="table-title">📋 Spesifikasi Variabel Dataset & Rujukan Literatur Ilmiah</h3>
          <span class="badge-counter">Menampilkan {{ filteredDataSpecs.length }} Variabel Inti</span>
        </div>

        <div class="table-responsive">
          <table class="spec-table">
            <thead>
              <tr>
                <th style="width: 14%;">Dimensi & Kode</th>
                <th style="width: 22%;">Variabel & Atribut Dataset</th>
                <th style="width: 26%;">Rujukan Literatur Teoretis</th>
                <th style="width: 16%;">Instrumen & Tipe Data</th>
                <th style="width: 22%;">Peran Explanatory Power</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredDataSpecs" :key="item.id" class="spec-row">
                <!-- Dimensi -->
                <td>
                  <span :class="['dimension-badge', item.dimensionBadgeClass]">
                    {{ item.dimensionCode }}
                  </span>
                  <div class="dimension-name">{{ item.dimensionName }}</div>
                </td>

                <!-- Variabel & Atribut -->
                <td>
                  <div class="var-title">{{ item.variableName }}</div>
                  <div class="var-desc">{{ item.description }}</div>
                  <div class="feature-tags-row">
                    <span v-for="tag in item.featureTags" :key="tag" class="feature-tag">
                      {{ tag }}
                    </span>
                  </div>
                </td>

                <!-- Rujukan Literatur -->
                <td>
                  <div class="literature-box">
                    <div class="lit-author">📖 {{ item.literature.author }} ({{ item.literature.year }})</div>
                    <div class="lit-title">{{ item.literature.title }}</div>
                    <div class="lit-journal"><em>{{ item.literature.journal }}</em></div>
                    <div class="lit-quote">"{{ item.literature.groundingTheory }}"</div>
                  </div>
                </td>

                <!-- Instrumen -->
                <td>
                  <div class="instrument-badge">
                    {{ item.instrumentSource }}
                  </div>
                  <div class="question-links">
                    <strong>Item Kuesioner:</strong>
                    <div class="q-pills-row">
                      <span v-for="q in item.questionCodes" :key="q" class="q-pill">
                        {{ q }}
                      </span>
                    </div>
                  </div>
                  <div class="data-type-text">Tipe: <code>{{ item.dataType }}</code></div>
                </td>

                <!-- Explanatory Role -->
                <td>
                  <div class="role-badge" :class="item.roleBadgeClass">
                    {{ item.roleType }}
                  </div>
                  <p class="role-desc">
                    {{ item.explanatoryExplanation }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 5: Matriks Dualitas Konteks Interaktif (C_learn x C_apply) -->
    <div v-if="activeTab === 'matrix'" class="framework-content-section">
      <div class="matrix-overview-card">
        <h3 class="section-title">🧭 Matriks Dualitas Konteks Spasio-Layanan ($C_{\text{learn}} \times C_{\text{apply}}$)</h3>
        <p class="section-desc">
          Hubungan silang antara <strong>Kondisi Fasilitas Belajar ASN ($C_{\text{learn}}$)</strong> dan <strong>Karakteristik Medan Pelayanan Publik ($C_{\text{apply}}$)</strong> yang menentukan profil rekomendasi materi dan format adaptif.
        </p>

        <!-- Interactive 2x2 Grid -->
        <div class="matrix-grid-2x2">
          <!-- Kuadran I -->
          <div 
            :class="['quadrant-card', 'border-amber', selectedQuadrant === 'q1' ? 'active' : '']"
            @click="selectedQuadrant = 'q1'"
          >
            <div class="quadrant-badge q1">Kuadran I</div>
            <h4 class="quadrant-title">Low-Bandwidth Learning × Layanan 3T / Tatap Muka</h4>
            <div class="quadrant-meta">
              <span><strong>C_learn:</strong> Sinyal Lemah, Perangkat HP</span>
              <span><strong>C_apply:</strong> Wilayah Terpencil, Literasi Warga Rendah, IPP & SPBE Rintisan</span>
            </div>
            <div class="quadrant-solution">
              <strong>Spesifikasi Dataset Utama:</strong>
              <ul>
                <li>Indeks Blankspot Sinyal (Q11, Q13)</li>
                <li>Frekuensi Pelayanan Door-to-Door (Q36, Q37)</li>
                <li>Format: <em>Offline Audio & Micro-Infografis Ringkas</em></li>
              </ul>
            </div>
          </div>

          <!-- Kuadran II -->
          <div 
            :class="['quadrant-card', 'border-blue', selectedQuadrant === 'q2' ? 'active' : '']"
            @click="selectedQuadrant = 'q2'"
          >
            <div class="quadrant-badge q2">Kuadran II</div>
            <h4 class="quadrant-title">Low-Bandwidth Learning × Layanan SPBE Modern</h4>
            <div class="quadrant-meta">
              <span><strong>C_learn:</strong> Keterbatasan Waktu/Infrastruktur</span>
              <span><strong>C_apply:</strong> Tuntutan Transisi Digital / Sistem Online, SPBE Baik</span>
            </div>
            <div class="quadrant-solution">
              <strong>Spesifikasi Dataset Utama:</strong>
              <ul>
                <li>Tingkat Beban Kerja Mendadak (Q15, Q17)</li>
                <li>Kebutuhan Integrasi Aplikasi Layanan (Q22, Q24)</li>
                <li>Format: <em>Asynchronous Text-First & Modul Ringkas SPBE</em></li>
              </ul>
            </div>
          </div>

          <!-- Kuadran III -->
          <div 
            :class="['quadrant-card', 'border-purple', selectedQuadrant === 'q3' ? 'active' : '']"
            @click="selectedQuadrant = 'q3'"
          >
            <div class="quadrant-badge q3">Kuadran III</div>
            <h4 class="quadrant-title">High-Bandwidth Learning × Layanan Geografis Khusus</h4>
            <div class="quadrant-meta">
              <span><strong>C_learn:</strong> Internet Stabil di Kantor Pusat/Induk</span>
              <span><strong>C_apply:</strong> Regulasi Lapangan Daerah Kepulauan/Perbatasan, IPP Tinggi</span>
            </div>
            <div class="quadrant-solution">
              <strong>Spesifikasi Dataset Utama:</strong>
              <ul>
                <li>Karakteristik Wilayah Penugasan (Q1, Q2)</li>
                <li>Simulasi Kebijakan Pelayanan Khusus (Q36, Q38)</li>
                <li>Format: <em>Interactive Case-Studies & Web Scaffolding</em></li>
              </ul>
            </div>
          </div>

          <!-- Kuadran IV -->
          <div 
            :class="['quadrant-card', 'border-green', selectedQuadrant === 'q4' ? 'active' : '']"
            @click="selectedQuadrant = 'q4'"
          >
            <div class="quadrant-badge q4">Kuadran IV</div>
            <h4 class="quadrant-title">High-Bandwidth Learning × Pelayanan Publik Metropolitan</h4>
            <div class="quadrant-meta">
              <span><strong>C_learn:</strong> Akses Laptop & Wifi Cepat</span>
              <span><strong>C_apply:</strong> Mal Pelayanan Publik (MPP), SPBE Memuaskan, IPP A</span>
            </div>
            <div class="quadrant-solution">
              <strong>Spesifikasi Dataset Utama:</strong>
              <ul>
                <li>Tingkat Partisipasi Synchronous Zoom (Q43-Q48)</li>
                <li>Kompleksitas Data & Kepuasan Publik (Q31, Q32)</li>
                <li>Format: <em>Full Multimodal Interactive & AI Simulation</em></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 6: Kamus Data & Struktur Skema Dataset (Data Dictionary) -->
    <div v-if="activeTab === 'dictionary'" class="framework-content-section">
      <div class="dictionary-card">
        <div class="dict-header-row">
          <div>
            <h3 class="section-title">🗂️ Kamus Data Standar Riset Disertasi (Data Dictionary Schema)</h3>
            <p class="section-desc">Skema kolom data baku untuk penampungan respon kuesioner dan integrasi pembelajaran adaptif.</p>
          </div>
          <div class="dict-actions">
            <button class="btn btn-outline" @click="downloadSchemaJson" title="Unduh Skema Kamus Data format JSON">
              📥 Unduh JSON Schema
            </button>
            <button class="btn btn-primary" @click="downloadTemplateCsv" title="Unduh Template Tabel CSV">
              📥 Unduh Template CSV
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="dict-table">
            <thead>
              <tr>
                <th>Nama Kolom (Field)</th>
                <th>Tipe Data</th>
                <th>Rentang Nilai (Values)</th>
                <th>Tabel Target DB</th>
                <th>Deskripsi Variabel Teoretis</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="field in dataDictionary" :key="field.name">
                <td><code>{{ field.name }}</code></td>
                <td><span class="type-pill">{{ field.type }}</span></td>
                <td><span class="values-pill">{{ field.values }}</span></td>
                <td><code>{{ field.table }}</code></td>
                <td>{{ field.desc }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 7: Formula Matematis Explanatory Power & Justifikasi -->
    <div v-if="activeTab === 'validation'" class="framework-content-section">
      <div class="validation-grid">
        <!-- Formula Card -->
        <div class="val-card">
          <h4 class="val-title">📐 Model Persamaan Explanatory Power (R² & ΔR²)</h4>
          <p class="val-sub">Pengujian signifikansi moderasi konteks spasial terhadap relevansi kompetensi layanan:</p>
          
          <div class="formula-box">
            <div class="formula-line">
              <strong>Model Baseline (Tanpa Konteks):</strong>
              <code>Y_fit = β₀ + β₁·X_behavior + β₂·X_service + ε</code>
            </div>
            <div class="formula-line highlighted">
              <strong>Model Service-Spatial Augmented:</strong>
              <code>Y_fit = β₀ + β₁·X_behavior + β₂·X_service + β₃·M_spatial + β₄·(X_service × M_spatial) + ε</code>
            </div>
          </div>

          <div class="criteria-list">
            <strong>Kriteria Penerimaan Explanatory Power:</strong>
            <ul>
              <li><strong>Signifikansi Moderasi:</strong> Koefisien interaksi β₄ memiliki nilai p &lt; 0.05.</li>
              <li><strong>Peningkatan Varians (ΔR²):</strong> ΔR² ≥ 0.05 (Meningkat minimal 5% daya jelas).</li>
              <li><strong>Effect Size (f²):</strong> f² = (R²_augmented - R²_baseline) / (1 - R²_augmented) ≥ 0.15 (Kategori Medium/Large Effect).</li>
            </ul>
          </div>
        </div>

        <!-- Justification Card -->
        <div class="val-card">
          <h4 class="val-title">🎓 Sintesis Kesimpulan Literatur Ilmiah</h4>
          <div class="synthesis-item">
            <div class="syn-header">1. Situated Cognition & Public Service</div>
            <p class="syn-body">
              Menurut <em>Situated Learning Theory</em> (Lave & Wenger), transfer kompetensi layanan publik hanya optimal jika materi pembelajaran menyimulasikan dinamika lingkungan tugas nyata di mana ASN bertugas.
            </p>
          </div>

          <div class="synthesis-item">
            <div class="syn-header">2. Spatio-Temporal Friction Moderation</div>
            <p class="syn-body">
              Studi e-learning daerah tertinggal (Agustyarsyah et al., 2025) menegaskan bahwa kendala infrastruktur bukan sekadar kendala fisik, melainkan variabel moderator kritis yang menentukan penerimaan format digital.
            </p>
          </div>

          <div class="synthesis-item">
            <div class="syn-header">3. Adaptive Engine Feasibility</div>
            <p class="syn-body">
              Vektor $\langle C_{\text{learn}}, C_{\text{apply}} \rangle$ terbukti mampu menjadi fitur pembeda dalam algoritma <em>Context-Aware Recommender Systems (CARS)</em> untuk menghasilkan rekomendasi pelatihan yang personal dan berdaya guna tinggi.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick, h } from 'vue';
import * as echarts from 'echarts';

const activeTab = ref<'mindmap' | 'missingness' | 'spbe-ipp' | 'mapping' | 'matrix' | 'dictionary' | 'validation'>('mindmap');
const selectedCategory = ref('SEMUA');
const searchQuery = ref('');
const evalSearchQuery = ref('');
const evalTypeFilter = ref<'pemda' | 'kl' | 'all'>('pemda');
const evalQuadrantFilter = ref<'all' | 'q1' | 'q2' | 'q3' | 'q4'>('all');
const selectedQuadrant = ref('q1');
const selectedNodeInfo = ref<any | null>(null);

const mindmapContainerRef = ref<HTMLDivElement | null>(null);
let mindmapChartInstance: echarts.ECharts | null = null;

// Unified SPBE x IPP Matrix State
const evalMatrix = ref({
  counts: { q1: 121, q2: 126, q3: 88, q4: 183, total: 518 },
  items: [] as any[]
});

// Dynamic Multi-Perspective Quadrant State (Macro, Micro, Meso)
const quadrantPerspective = ref<'macro' | 'micro' | 'meso'>('macro');

function setPerspective(perspective: 'macro' | 'micro' | 'meso') {
  quadrantPerspective.value = perspective;
  evalQuadrantFilter.value = 'all';
}

// Micro perspective dataset (ASN Workload vs Zoom/LMS Behavior)
const microQuadrantItems = ref([
  { id: 'ASN-0121', name: 'ASN-0121 (Bappeda DKI)', instansi: 'Pemerintah Provinsi DKI Jakarta', tipologi: 'Metropolitan', beban_level: 'Tinggi (4/5)', beban_desc: 'Disposisi pimpinan rapat mendadak', zoom_behavior: 'Attendance 98%, Cam-Off 20%, Chat 3', lms_behavior: 'Night-access (21.00), 42 hits/mgg', quadrant: 'q1', modul: 'Fast-track Executive Policy & Smart Governance' },
  { id: 'ASN-0199', name: 'ASN-0199 (Disdukcapil Surabaya)', instansi: 'Pemerintah Kota Surabaya', tipologi: 'Metropolitan', beban_level: 'Maksimal (5/5)', beban_desc: 'Pelayanan antrean warga & rekap kependudukan', zoom_behavior: 'Attendance 95%, Cam-Off 30%, Chat 5', lms_behavior: 'Night-access (20.30), 38 hits/mgg', quadrant: 'q1', modul: 'Predictive Analytics & Integrasi Big Data Kependudukan' },
  { id: 'ASN-0482', name: 'ASN-0482 (Dinas Perikanan Natuna)', instansi: 'Pemerintah Kab. Natuna', tipologi: 'Kepulauan', beban_level: 'Tinggi (4/5)', beban_desc: 'Patroli dinas pelayaran pulau luar', zoom_behavior: 'Attendance 85%, Cam-Off 88%, Reconnect 4x', lms_behavior: 'Unduh all-PDF offline (5 file)', quadrant: 'q2', modul: 'Offline Audio Podcast 5 Menit & PDF Ringkas' },
  { id: 'ASN-0733', name: 'ASN-0733 (Puskesmas Banyumas)', instansi: 'Pemerintah Kab. Banyumas', tipologi: 'Daratan', beban_level: 'Maksimal (5/5)', beban_desc: 'Pelayanan rawat inap & poli umum', zoom_behavior: 'Attendance 90%, Cam-Off 67%, Chat 8', lms_behavior: 'Akses jeda siang kantor, 36 hits/mgg', quadrant: 'q2', modul: 'Flexible Window Prompt & Modul Asinkron Pelayanan' },
  { id: 'ASN-0551', name: 'ASN-0551 (Sekretariat Maluku Tengah)', instansi: 'Pemerintah Kab. Maluku Tengah', tipologi: 'Kepulauan', beban_level: 'Tinggi (4/5)', beban_desc: 'Mobilisasi darurat bencana pesisir', zoom_behavior: 'Attendance 70%, Cam-Off 90%, Reconnect 5x', lms_behavior: 'Akses malam saat sinyal stabil, 14 hits', quadrant: 'q2', modul: 'Modul Darurat Berbasis Teks & Offline Caching' },
  { id: 'ASN-0305', name: 'ASN-0305 (Inspektorat Sleman)', instansi: 'Pemerintah Kab. Sleman', tipologi: 'Daratan', beban_level: 'Rendah (2/5)', beban_desc: 'Fase evaluasi berkala terjadwal', zoom_behavior: 'Attendance 100%, Cam-On 92%, Chat 12', lms_behavior: 'Akses teratur jam kantor, 48 hits/mgg', quadrant: 'q3', modul: 'Project Inovasi Pengawasan & Lab Problem-Solving' },
  { id: 'ASN-0622', name: 'ASN-0622 (Litbang Makassar)', instansi: 'Pemerintah Kota Makassar', tipologi: 'Metropolitan', beban_level: 'Sedang (3/5)', beban_desc: 'Penyusunan naskah akademis', zoom_behavior: 'Attendance 96%, Cam-On 85%, Chat 9', lms_behavior: 'Tuntas modul lebih awal (gain score +32)', quadrant: 'q3', modul: 'Advanced Policy Simulation & Strategic Proper Lab' },
  { id: 'ASN-0914', name: 'ASN-0914 (Pos Batas Belu)', instansi: 'Pemerintah Kab. Belu', tipologi: 'Perbatasan', beban_level: 'Sedang (3/5)', beban_desc: 'Registrasi lintas batas tradisional', zoom_behavior: 'Attendance 72%, Cam-Off 92%, Reconnect 6x', lms_behavior: 'Micro-module reading (teks), 12 hits', quadrant: 'q4', modul: 'Re-engagement Nudge & Microlearning SMS/Teks' },
  { id: 'ASN-0999', name: 'ASN-0999 (Staf Umum)', instansi: 'Instansi Pengirim Simulasi', tipologi: 'Metropolitan', beban_level: 'Rendah (1/5)', beban_desc: 'Beban dinas minimal / tidak ada antrean', zoom_behavior: 'Attendance 25%, Cam-Off 98%, Chat 0', lms_behavior: 'Inaktif 7 hari berturut-turut', quadrant: 'q4', modul: 'Intervensi Fasilitator Puslatbang & Kuis Diagnostik' }
]);

// Meso perspective dataset (Spatial Typology vs Connectivity Infrastructure)
const mesoQuadrantItems = ref([
  { nama: 'Pemerintah Provinsi DKI Jakarta', tipologi: 'Tipologi 1: Metropolitan', geografi: 'Megapolitan Inti Pusat Pemerintahan', konektivitas: 'Fiber Optik 1000 Mbps, 5G Merata', quadrant: 'q1', delivery: 'Full Synchronous Simulation, Real-Time Big Data Dashboard' },
  { nama: 'Pemerintah Kota Surabaya', tipologi: 'Tipologi 1: Metropolitan', geografi: 'Metropolitan Pesisir Timur Jawa', konektivitas: 'Fiber Optik Gigabit, Redundansi Jaringan', quadrant: 'q1', delivery: 'Interactive Collaborative Webinar, Advanced Digital Case' },
  { nama: 'Pemerintah Kota Medan', tipologi: 'Tipologi 1: Metropolitan', geografi: 'Pusat Pertumbuhan Regional Sumatera', konektivitas: 'Broadband Terestrial Cepat', quadrant: 'q1', delivery: 'Hybrid Workshop, Data-Driven Leadership Simulator' },
  { nama: 'Pemerintah Kab. Natuna', tipologi: 'Tipologi 3: Wilayah Kepulauan', geografi: 'Gugusan 154 Pulau Luar Maritim', konektivitas: 'Palapa Ring Barat + Microwave Laut (Rentan Cuaca)', quadrant: 'q2', delivery: 'Offline-First LMS Sync, Podcast Audio Modul, Sesi Webinar Berbasis Rekaman' },
  { nama: 'Pemerintah Kab. Kepulauan Aru', tipologi: 'Tipologi 3: Wilayah Kepulauan', geografi: 'Kepulauan Pesisir Dangkal Tenggara', konektivitas: 'Radio Link Antar-Pulau & Seluler Terbatas', quadrant: 'q2', delivery: 'Content Caching di Kantor Bupati, Modul Bahan Bacaan PDF Mandiri' },
  { nama: 'Pemerintah Kab. Anambas', tipologi: 'Tipologi 3: Wilayah Kepulauan', geografi: 'Pulau Terluar Laut Natuna Utara', konektivitas: 'Kabel Laut & 4G Spot Sporadis', quadrant: 'q2', delivery: 'Zero-Penalty Asynchronous Learning, Modul Micro-Packets' },
  { nama: 'Pemerintah Kab. Banyumas', tipologi: 'Tipologi 2: Kabupaten Daratan', geografi: 'Hinterland Daratan Jawa Tengah', konektivitas: '4G Terestrial Stabil & Wi-Fi Pemkab', quadrant: 'q3', delivery: 'Komunitas Belajar Bersama Antar-OPD, Webinar Terjadwal' },
  { nama: 'Pemerintah Kab. Sleman', tipologi: 'Tipologi 2: Kabupaten Daratan', geografi: 'Kawasan Aglomerasi Urban Daratan', konektivitas: 'Koneksi Stabil Seluler & Fiber Optik', quadrant: 'q3', delivery: 'Interactive LMS Modules, Best Practice Sharing Forum' },
  { nama: 'Pemerintah Kab. Belu', tipologi: 'Tipologi 4: Wilayah Perbatasan', geografi: 'Garis Depan Perbatasan Darat Timor Leste', konektivitas: 'Satelit VSAT & BTS Perbatasan Tertentu', quadrant: 'q4', delivery: 'Micro-Content Teks Murni, Pengiriman Bahan Cetak/Offline Kit' },
  { nama: 'Pemerintah Kab. Nunukan', tipologi: 'Tipologi 4: Wilayah Perbatasan', geografi: 'Perbatasan Darat & Laut Kalimantan-Sabah', konektivitas: 'Sinyal Fluktuatif & Pasokan Genset', quadrant: 'q4', delivery: 'Microlearning Ringkas (Format Teks/Infografis), Pembimbingan Terstruktur' }
]);

const currentPerspectiveData = computed(() => {
  if (quadrantPerspective.value === 'micro') {
    return {
      title: 'Matriks 4-Kuadran Mikro: Beban Kerja Pelayanan vs Keterlibatan Belajar ASN',
      subtitle: 'Membedakan apakah penurunan keaktifan belajar disebabkan oleh disrupsi tugas pelayanan publik langsung (frontline pressure) atau masalah kognitif/motivasi belajar secara mandiri.',
      badges: [
        { label: '⚡ Dinamika Belajar Empiris ASN', bg: 'rgba(245, 158, 11, 0.25)', color: '#FCD34D', border: 'rgba(251, 191, 36, 0.3)' },
        { label: 'Beban Layanan Publik × Telemetri (Zoom & LMS)', bg: 'rgba(59, 130, 246, 0.25)', color: '#60A5FA', border: 'rgba(96, 165, 250, 0.3)' },
        { label: '🧠 CCBN Cognitive-Workload Conditioning', bg: 'rgba(168, 85, 247, 0.25)', color: '#C084FC', border: 'rgba(192, 132, 252, 0.3)' }
      ],
      xAxis: 'Keterlibatan Belajar Online (Zoom Attendance, LMS Clickstream, Completion)',
      yAxis: 'Beban Kerja Pelayanan Publik & Interupsi Disposisi Dinas',
      counts: { q1: 142, q2: 189, q3: 115, q4: 72, total: 518 },
      q1: {
        code: 'q1',
        title: 'High-Capacity Resilient',
        tag: 'Beban Tinggi × Keterlibatan Tinggi',
        count: 142,
        unit: 'ASN',
        desc: 'Mampu menjaga kehadiran Zoom & belajar mandiri LMS malam hari kendati beban disposisi pimpinan dinas tinggi.',
        theory: 'Self-Regulated Learning (Zimmerman, 2002) & Cognitive Load Theory (Sweller, 2011)',
        module: 'Fast-track Executive Case Studies & Strategic Public Leadership',
        theoryTitle: 'Self-Regulated Learning & Cognitive Capacity',
        theoryDesc: 'Zimmerman (2002) membuktikan bahwa pembelajar mandiri yang terlatih mampu mengkompensasi tekanan waktu kantor dengan belajar malam hari (night-learner).'
      },
      q2: {
        code: 'q2',
        title: 'Frontline-Constrained',
        tag: 'Beban Tinggi × Keterlibatan Terbatas',
        count: 189,
        unit: 'ASN',
        desc: 'Keterlibatan di Zoom terbatas (sering kamera-off/multitask) murni karena terinterupsi antrean warga atau tugas lapangan mendadak.',
        theory: 'Street-Level Interruption Dynamics (Lipsky, 2010) & Workload Spillover (Bakker, 2014)',
        module: 'Asynchronous Microlearning (Audio Podcast 5 Menit & PDF Ringkas Luar Jam Kantor)',
        theoryTitle: 'Street-Level Bureaucracy & Workload Spillover',
        theoryDesc: 'Lipsky (2010) menegaskan aparat pelayanan langsung (Puskesmas, PTSP) memiliki dinamika interupsi konstan yang menuntut format pembelajaran fleksibel tanpa hukuman kehadiran.'
      },
      q3: {
        code: 'q3',
        title: 'Focused Self-Directed',
        tag: 'Beban Rendah × Keterlibatan Tinggi',
        count: 115,
        unit: 'ASN',
        desc: 'ASN unit perencana/analis dengan interupsi rendah yang memiliki waktu fokus tinggi untuk menuntaskan kurikulum mendalam.',
        theory: 'Flow State & Deep Learning (Csikszentmihalyi, 1990; Biggs, 2003)',
        module: 'Project Inovasi Aksi Perubahan (Proper) Mandiri & Problem-Solving Lab',
        theoryTitle: 'Deep Learning & Flow State',
        theoryDesc: 'Ketiadaan interupsi darurat memungkinkan ASN mencapai kondisi imersi belajar (flow state) untuk merancang inovasi tata kelola yang komprehensif.'
      },
      q4: {
        code: 'q4',
        title: 'Cognitive Disengaged / At-Risk',
        tag: 'Beban Rendah × Keterlibatan Rendah',
        count: 72,
        unit: 'ASN',
        desc: 'Tidak memiliki beban kedinasan mendesak namun inaktif berulang di Zoom & LMS. Terindikasi kebingungan materi atau motivasi menurun.',
        theory: 'Student Attrition Model (Tinto, 1993) & Bayesian Prior Disengagement',
        module: 'Intervensi Fasilitator Langsung, Re-engagement Nudge, & Kuis Diagnostik Dasar',
        theoryTitle: 'Student Attrition & Behavioral Disengagement',
        theoryDesc: 'Tinto (1993) membedakan hambatan eksternal dari disengagement internal. Model CCBN menandai kuadran ini sebagai target intervensi prioritas.'
      }
    };
  } else if (quadrantPerspective.value === 'meso') {
    return {
      title: 'Matriks 4-Kuadran Meso: Karakteristik Spasial Wilayah vs Aksesibilitas Jaringan',
      subtitle: 'Memetakan disparitas lingkungan operasional ASN berdasarkan 4 Tipologi Daerah (Metropolitan, Daratan, Kepulauan, Perbatasan) dan keandalan jaringan TIK untuk mewujudkan keadilan akses diklat (fair delivery).',
      badges: [
        { label: '🗺️ Tipologi Geografis & Birokrasi Daerah', bg: 'rgba(16, 185, 129, 0.25)', color: '#34D399', border: 'rgba(52, 211, 153, 0.3)' },
        { label: '4 Tipologi Daerah × Aksesibilitas Jaringan Spasial', bg: 'rgba(59, 130, 246, 0.25)', color: '#60A5FA', border: 'rgba(96, 165, 250, 0.3)' },
        { label: '🏛️ RPJMN Bappenas & Geografi Digital', bg: 'rgba(168, 85, 247, 0.25)', color: '#C084FC', border: 'rgba(192, 132, 252, 0.3)' }
      ],
      xAxis: 'Kualitas & Kestabilan Aksesibilitas Jaringan (Bandwidth, Fiber Optik vs Seluler)',
      yAxis: 'Kompleksitas Tipologi Wilayah Pemerintahan (Pusat Metropolitan s.d. Perbatasan)',
      counts: { q1: 112, q2: 124, q3: 198, q4: 84, total: 518 },
      q1: {
        code: 'q1',
        title: 'Metropolitan Digital Hub',
        tag: 'Pusat/Ibukota × Fiber Optik Gigabit',
        count: 112,
        unit: 'Pemda',
        desc: 'Akses bandwidth prima di seluruh area kantor dinas, namun terdisrupsi rapat koordinasi tatap muka/hybrid pimpinan.',
        theory: 'Agglomeration Economics & Digital Era Governance (Dunleavy et al., 2006)',
        module: 'Simulasi Kebijakan Berbasis AI, Smart Governance, & Data Analytics MPP',
        theoryTitle: 'Agglomeration Economies & Digital Era Governance',
        theoryDesc: 'Konsentrasi institusi dan infrastruktur TIK gigabit menuntut ASN menguasai interoperabilitas data skala besar dan perumusan kebijakan publik cerdas.'
      },
      q2: {
        code: 'q2',
        title: 'Archipelagic Resilient',
        tag: 'Kepulauan/Pesisir × Sinyal Cuaca & Kabel Laut',
        count: 124,
        unit: 'Pemda',
        desc: 'Penugasan dinas pelayaran antar-pulau dengan koneksi rentan cuaca ekstrem. Kamera-off adalah strategi rasional adaptasi kuota.',
        theory: 'Spatial Digital Geography (Salemink et al., 2017) & Bandwidth Coping Adaptation',
        module: 'Offline-First Content Caching, Modul Audio Ringan, & Sesi Asinkron Fleksibel',
        theoryTitle: 'Archipelagic Governance & Bandwidth Coping',
        theoryDesc: 'Salemink et al. (2017) menunjukkan bahwa aparat wilayah kepulauan mengembangkan strategi koping rasional dengan mendahulukan audio stream dan unduhan offline.'
      },
      q3: {
        code: 'q3',
        title: 'Mainland Urban-Transition',
        tag: 'Kabupaten Daratan × 4G Terestrial Stabil',
        count: 198,
        unit: 'Pemda',
        desc: 'Sinyal 4G stabil di pusat kantor kabupaten, kultur birokrasi komunal, mengikuti webinar dari ruang kerja bersama (cubicle/aula).',
        theory: 'Situated Learning in Communities of Practice (Lave & Wenger, 1991)',
        module: 'Laboratorium Inovasi Bersama, Standardisasi Layanan Publik, & Best Practice Sharing',
        theoryTitle: 'Situated Learning & Bureaucratic Community',
        theoryDesc: 'Lave & Wenger (1991) menekankan pembelajaran dalam komunitas kerja fisik bersama (CoP) untuk mentransfer kecakapan birokrasi antar-rekan sejawat.'
      },
      q4: {
        code: 'q4',
        title: 'Frontier / Peripheral',
        tag: 'Perbatasan & Pedalaman × Satelit VSAT/Genset',
        count: 84,
        unit: 'Pemda',
        desc: 'Ketergantungan pada listrik genset malam hari & kuota seluler mandiri. Sangat memerlukan materi teks murni seringkas mungkin.',
        theory: 'Peripheral Inclusion & Zone of Proximal Development (Vygotsky, 1978)',
        module: 'Micro-Content Teks Murni (Low-Bandwidth), SPM Garis Batas Negara, & Panduan Lapangan Offline',
        theoryTitle: 'Frontier Public Administration & Scaffolding',
        theoryDesc: 'Keterbatasan fisik mengharuskan materi diklat diformat dalam teks microlearning tanpa ketergantungan streaming video beresolusi tinggi.'
      }
    };
  } else {
    // Macro (Default: SPBE x IPP)
    return {
      title: 'Matriks Komparasi 4-Kuadran Makro: Kematangan Digital vs Kualitas Pelayanan Publik',
      subtitle: 'Menggabungkan evaluasi Indeks SPBE (kesiapan sistem digital) dengan Indeks Pelayanan Publik (IPP) (kualitas layanan langsung) untuk memetakan 518 Pemerintah Daerah ke dalam 4 kuadran tipologi kelembagaan.',
      badges: [
        { label: '🏛️ Triangulasi Data Sekunder Nasional', bg: 'rgba(59, 130, 246, 0.25)', color: '#60A5FA', border: 'rgba(96, 165, 250, 0.3)' },
        { label: 'SPBE 2025 × IPP 2025 (KemenPAN-RB)', bg: 'rgba(16, 185, 129, 0.25)', color: '#34D399', border: 'rgba(52, 211, 153, 0.3)' },
        { label: '📚 Grounded on 4 Grand Theories', bg: 'rgba(168, 85, 247, 0.25)', color: '#C084FC', border: 'rgba(192, 132, 252, 0.3)' }
      ],
      xAxis: 'Kematangan Tata Kelola SPBE (Indeks 1.0 - 5.0)',
      yAxis: 'Indeks Kualitas Pelayanan Publik Langsung (IPP Predikat F s.d. A)',
      counts: evalMatrix.value.counts,
      q1: {
        code: 'q1',
        title: 'Digital Exemplar',
        tag: 'High SPBE × High IPP',
        count: evalMatrix.value.counts.q1 || 121,
        unit: 'Pemda',
        desc: 'Sistem digital matang & kepuasan pelayanan warga sangat tinggi.',
        theory: 'Digital Era Governance (Dunleavy et al., 2006) & System-Level Bureaucracy (Bovens & Zouridis, 2002)',
        module: 'Smart MPP, Predictive AI Service, & Big Data SPBE',
        theoryTitle: 'Digital Era Governance (DEG)',
        theoryDesc: 'Dunleavy et al. (2006) dan Bovens & Zouridis (2002): ketika infrastruktur digital telah mapan, peran ASN bergeser dari pelaksana transaksi manual menjadi pengelola ekosistem data. Modul difokuskan pada Predictive AI Governance, Smart MPP, dan Integrasi Big Data Kebijakan.'
      },
      q2: {
        code: 'q2',
        title: 'Human-Heroic Delivery',
        tag: 'Low SPBE × High IPP',
        count: evalMatrix.value.counts.q2 || 126,
        unit: 'Pemda',
        desc: 'Pelayanan tatap muka prima didukung dedikasi ASN, meski SPBE masih transisi.',
        theory: 'Street-Level Bureaucracy (Lipsky, 2010) & Situated Learning CoP (Lave & Wenger, 1991)',
        module: 'Digitalisasi Bertahap, Mobile SOP, & Standardisasi Layanan',
        theoryTitle: 'Street-Level Bureaucracy & Situated CoP',
        theoryDesc: 'Lipsky (1980/2010) & Lave & Wenger (1991) membuktikan bahwa dedikasi sosial dan diskresi petugas dapat menciptakan kepuasan tinggi meski sistem TI belum matang. Modul adaptif mengutamakan Kodifikasi Praktik Baik dan Digitalisasi Bertahap.'
      },
      q3: {
        code: 'q3',
        title: 'Digital Silo / Adoption Gap',
        tag: 'High SPBE × Low IPP',
        count: evalMatrix.value.counts.q3 || 88,
        unit: 'Pemda',
        desc: 'Aplikasi canggih dibangun, tetapi warga/petugas mengeluhkan kerumitan antarmuka.',
        theory: 'Design-Actuality Gap (Heeks, 2006) & UTAUT2 (Venkatesh, 2012)',
        module: 'UX Pelayanan Publik, Komunikasi Empatis, & Manajemen Komplain',
        theoryTitle: 'Design-Actuality Gap & UTAUT2',
        theoryDesc: 'Richard Heeks (2006) & Venkatesh (2012) menjelaskan fenomena kegagalan sistem saat aplikasi dirancang terlalu rumit tanpa memperhitungkan literasi warga lokal. Modul adaptif difokuskan pada Citizen-Centric UX, Komunikasi Empatis, dan De-eskalasi Keluhan.'
      },
      q4: {
        code: 'q4',
        title: 'Priority Scaffolding / 3T',
        tag: 'Low SPBE × Low IPP',
        count: evalMatrix.value.counts.q4 || 183,
        unit: 'Pemda',
        desc: 'Daerah tertinggal/pemekaran dengan keterbatasan sarana digital dan operasional.',
        theory: 'E-Learning 3T (Agustyarsyah et al., 2025) & ZPD Scaffolding (Vygotsky / Bruner)',
        module: 'SPM Dasar & Layanan Jemput Bola 3T',
        theoryTitle: 'E-Learning 3T & ZPD Scaffolding',
        theoryDesc: 'Agustyarsyah et al. (2025) & Vygotsky/Bruner menegaskan daerah 3T memerlukan Offline-First Microlearning (3-5 menit) dan pembelajaran berjenjang mulai dari Standar Pelayanan Minimal (SPM) Dasar & Pelayanan Jemput Bola.'
      }
    };
  }
});

const filteredMicroItems = computed(() => {
  return microQuadrantItems.value.filter(item => {
    if (evalQuadrantFilter.value !== 'all' && item.quadrant !== evalQuadrantFilter.value) return false;
    if (evalSearchQuery.value.trim()) {
      const q = evalSearchQuery.value.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.instansi.toLowerCase().includes(q) || item.tipologi.toLowerCase().includes(q);
    }
    return true;
  });
});

const filteredMesoItems = computed(() => {
  return mesoQuadrantItems.value.filter(item => {
    if (evalQuadrantFilter.value !== 'all' && item.quadrant !== evalQuadrantFilter.value) return false;
    if (evalSearchQuery.value.trim()) {
      const q = evalSearchQuery.value.toLowerCase();
      return item.nama.toLowerCase().includes(q) || item.tipologi.toLowerCase().includes(q) || item.geografi.toLowerCase().includes(q);
    }
    return true;
  });
});

const frameworkTabs = [
  { id: 'mindmap', label: '🧠 Visual Mindmap Framework', icon: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { d: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' })]) },
  { id: 'missingness', label: '🧩 Taksonomi Missingness Cerdas', icon: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { d: 'M20.5 14.5A2.5 2.5 0 0 0 18 12h-2v-2a2.5 2.5 0 0 0-5 0v2H9a2.5 2.5 0 0 0 0 5h2v2a2.5 2.5 0 0 0 5 0v-2h2a2.5 2.5 0 0 0 2.5-2.5z' })]) },
  { id: 'spbe-ipp', label: '🏛️ Matriks 4-Kuadran Multi-Perspektif', icon: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2' }), h('line', { x1: '3', y1: '12', x2: '21', y2: '12' }), h('line', { x1: '12', y1: '3', x2: '12', y2: '21' })]) },
  { id: 'mapping', label: '📋 Matriks Spesifikasi Dataset & Literatur', icon: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }), h('polyline', { points: '14 2 14 8 20 8' }), h('line', { x1: '16', y1: '13', x2: '8', y2: '13' }), h('line', { x1: '16', y1: '17', x2: '8', y2: '17' })]) },
  { id: 'matrix', label: '🧭 Matriks Dualitas Konteks (C_learn x C_apply)', icon: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2' }), h('line', { x1: '3', y1: '12', x2: '21', y2: '12' }), h('line', { x1: '12', y1: '3', x2: '12', y2: '21' })]) },
  { id: 'dictionary', label: '🗂️ Kamus Data & Skema Ekspor/Impor', icon: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { d: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20' }), h('path', { d: 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' })]) },
  { id: 'validation', label: '📐 Formula Explanatory Power & Justifikasi', icon: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('circle', { cx: '12', cy: '12', r: '10' }), h('line', { x1: '12', y1: '16', x2: '12', y2: '12' }), h('line', { x1: '12', y1: '8', x2: '12.01', y2: '8' })]) }
];

function setEvalTypeFilter(type: 'pemda' | 'kl' | 'all') {
  evalTypeFilter.value = type;
  fetchEvaluationsData();
}

function setEvalQuadrantFilter(quadrant: 'all' | 'q1' | 'q2' | 'q3' | 'q4') {
  evalQuadrantFilter.value = quadrant;
  fetchEvaluationsData();
}

async function fetchEvaluationsData() {
  try {
    const res: any = await $fetch('/api/evaluations/spbe-ipp', {
      params: { 
        q: evalSearchQuery.value,
        type: evalTypeFilter.value,
        quadrant: evalQuadrantFilter.value
      }
    });
    if (res && res.success && res.data) {
      evalMatrix.value.items = res.data.items || [];
      evalMatrix.value.counts = res.data.quadrantCounts || { q1: 0, q2: 0, q3: 0, q4: 0, total: 0 };
    }
  } catch (e) {
    console.error('Failed to fetch SPBE/IPP comparative matrix:', e);
  }
}

function getIppBadgeStyle(predikat: string) {
  if (predikat === 'A' || predikat === '-A') return 'background: #DCFCE7; color: #166534; border: 1px solid #86EFAC; font-weight: 700;';
  if (predikat === 'B' || predikat === '-B') return 'background: #DBEAFE; color: #1E40AF; border: 1px solid #93C5FD; font-weight: 700;';
  return 'background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D; font-weight: 700;';
}

function getSpbeBadgeStyle(predikat: string) {
  if (predikat === 'Memuaskan') return 'background: #DCFCE7; color: #166534; border: 1px solid #86EFAC; font-weight: 800;';
  if (predikat === 'Sangat Baik') return 'background: #DBEAFE; color: #1E40AF; border: 1px solid #93C5FD; font-weight: 700;';
  if (predikat === 'Baik') return 'background: #FAF5FF; color: #6B21A8; border: 1px solid #E9D5FF; font-weight: 600;';
  return 'background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D; font-weight: 600;';
}

function getQuadrantBadgeStyle(code: string) {
  if (code === 'q1') return 'background: #DCFCE7; color: #166534; border: 1px solid #86EFAC; font-weight: 800; font-size: 0.75rem;';
  if (code === 'q2') return 'background: #DBEAFE; color: #1E40AF; border: 1px solid #93C5FD; font-weight: 800; font-size: 0.75rem;';
  if (code === 'q3') return 'background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D; font-weight: 800; font-size: 0.75rem;';
  return 'background: #EDE9FE; color: #6B21A8; border: 1px solid #DDD6FE; font-weight: 800; font-size: 0.75rem;';
}

// Hierarchical Tree Data for Mindmap
const mindmapTreeData = {
  name: 'Adaptive Learning Kompetensi Layanan Publik ASN',
  itemStyle: { color: '#1E293B', borderColor: '#3B82F6', borderWidth: 3 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#F8FAFC', backgroundColor: '#1E293B', padding: [6, 12], borderRadius: 8 },
  children: [
    {
      name: '1. Sisi Kapasitas Belajar (C_learn)',
      category: 'Konteks Belajar ASN',
      itemStyle: { color: '#7C3AED' },
      label: { color: '#7C3AED', fontWeight: 'bold' },
      description: 'Kondisi riil infrastruktur dan lingkungan saat ASN mengakses modul e-learning.',
      children: [
        {
          name: 'Kendala Sinyal & Blankspot',
          category: 'Infrastruktur 3T',
          literature: 'Agustyarsyah et al. (2025) - TS04E',
          questions: 'Q1, Q2, Q11, Q12, Q13',
          role: 'Moderator M_spatial untuk rekomendasi format',
          description: 'Frekuensi pemadaman listrik & sinyal lemah yang membatasi streaming video.',
          children: [
            { name: 'Rekomendasi Format: Offline Audio & Micro-PDF' },
            { name: 'Feature Vector: Indeks Gangguan Spasial (0-100)' }
          ]
        },
        {
          name: 'Keterbatasan Perangkat & Tempat',
          category: 'Hardware & Mobilitas',
          literature: 'Studi E-Learning Daerah Tertinggal (2024)',
          questions: 'Q9, Q10, Q14',
          role: 'Adaptive Layout Constraint',
          description: 'Akses melalui Smartphone di sela perjalanan dinas atau kantor desa.',
          children: [
            { name: 'Mobile-first UI & Lightweight Assets' }
          ]
        }
      ]
    },
    {
      name: '2. Sisi Medan Layanan Publik (C_apply)',
      category: 'Konteks Penerapan Layanan',
      itemStyle: { color: '#2563EB' },
      label: { color: '#2563EB', fontWeight: 'bold' },
      description: 'Karakteristik demografis masyarakat penerima layanan, Indeks SPBE & IPP wilayah, dan lingkungan birokrasi.',
      children: [
        {
          name: 'Data Nasional: Indeks SPBE & IPP (2025)',
          category: 'Ground-Truth Evaluasi Nasional',
          literature: 'KemenPAN-RB Satudata (509 Pemda & 73 KL)',
          questions: 'Lookup otomatis via Provinsi/Kabupaten (Q1-Q3)',
          role: 'External Objective Feature Vector (C_apply)',
          description: 'Skor resmi maturitas SPBE & Indeks Pelayanan Publik (IPP) instansi.',
          children: [
            { name: 'SPBE: Memuaskan / Sangat Baik / Baik' },
            { name: 'IPP: Predikat A / -A / B / -B' }
          ]
        },
        {
          name: 'Tipologi Layanan Front-Office vs SPBE',
          category: 'Public Service Delivery',
          literature: 'Lipsky (Street-Level Bureaucracy) / Cendekia Niaga',
          questions: 'Q3, Q36, Q37, Q38',
          role: 'Predictor X_service untuk Content Filtering',
          description: 'Penanganan warga langsung di loket vs perizinan digital terpadu.',
          children: [
            { name: 'Modul: Diskresi Pelayanan & Standar SPM' },
            { name: 'Simulasi Kasus: Penanganan Keluhan Warga' }
          ]
        },
        {
          name: 'Friksi Beban Pelayanan & SPPD',
          category: 'Workload Pressure',
          literature: 'Ratri Nur Rohmah (2024) / Kinerja ASN',
          questions: 'Q15, Q17, Q34',
          role: 'Pacing & Micro-session Adaptation',
          description: 'Tugas kedinasan mendadak yang memotong waktu belajar terencana.',
          children: [
            { name: 'Modul Durasi Fleksibel (5-10 Menit)' }
          ]
        }
      ]
    },
    {
      name: '3. State Perilaku Belajar & Missingness (X_behavior)',
      category: 'Behavioral State',
      itemStyle: { color: '#059669' },
      label: { color: '#059669', fontWeight: 'bold' },
      description: 'Dinamika kebiasaan ASN saat mengikuti pelatihan daring tatap muka maupun mandiri, serta atribusi penyebab missingness.',
      children: [
        {
          name: 'Pola Missingness: Spatial (MNAR-S) vs Workload (MAR-W)',
          category: 'Rubin Theory Extension',
          literature: 'Learning Analytics & Missingness Studies (2024)',
          questions: 'Q12, Q15, Q26, Q47',
          role: 'Context-Aware Missingness Attribution',
          description: 'Klasifikasi inaktivitas belajar: fisik sinyal vs tugas pimpinan vs kelelahan layar.',
          children: [
            { name: 'MNAR-S: Zero-Penalty Offline Fallback' },
            { name: 'MAR-W: Auto-Bookmark & Micro-Pacing' },
            { name: 'MCAR-C: Smart Cognitive Pause' }
          ]
        },
        {
          name: 'Multitasking & Split Attention',
          category: 'Learning Analytics',
          literature: 'SLR Multimodal Engagement (2025)',
          questions: 'Q27, Q28, Q46',
          role: 'Cognitive Load Estimator',
          description: 'Membuka pekerjaan kantor atau urusan dinas saat mendengarkan materi zoom.',
          children: [
            { name: 'Smart Prompt & Interactive Checkpoints' }
          ]
        }
      ]
    },
    {
      name: '4. Target Kompetensi & Rekomendasi (Y)',
      category: 'Adaptive Recommendation',
      itemStyle: { color: '#D97706' },
      label: { color: '#D97706', fontWeight: 'bold' },
      description: 'Luaran sistem rekomendasi cerdas yang disesuaikan dengan kebutuhan riil ASN.',
      children: [
        {
          name: 'Knowledge Graph Concept Matching',
          category: 'AI Engine',
          literature: 'Pusdiklat LAN RI Standar Kompetensi',
          questions: 'Q19, Q20, Q22, Q23',
          role: 'Core Recommender Engine',
          children: [
            { name: 'Scaffolding Berjenjang (Dasar → Lanjutan)' },
            { name: 'Rekomendasi Studi Kasus Sesuai Wilayah' }
          ]
        }
      ]
    },
    {
      name: '5. Pembuktian Explanatory Power (Validasi)',
      category: 'Empirical Validation',
      itemStyle: { color: '#DC2626' },
      label: { color: '#DC2626', fontWeight: 'bold' },
      description: 'Pengujian statistik bahwa penyertaan Service Context meningkatkan akurasi sistem.',
      children: [
        {
          name: 'SEM-PLS & Moderation Effect Size (f²)',
          category: 'Statistical Proof',
          literature: 'Hwang & Chang (Context-Aware ALS Evaluation)',
          questions: 'Q22, Q23, Q42',
          role: 'Empirical Grounding Proof',
          children: [
            { name: 'Kenaikan ΔR² ≥ 0.05 Terhadap Relevansi' },
            { name: 'Signifikansi Moderasi Spasial (p < 0.05)' }
          ]
        }
      ]
    }
  ]
};

function renderMindmapChart() {
  if (!mindmapContainerRef.value) return;

  if (!mindmapChartInstance) {
    mindmapChartInstance = echarts.init(mindmapContainerRef.value);
    mindmapChartInstance.on('click', (params: any) => {
      if (params.data) {
        selectedNodeInfo.value = params.data;
      }
    });
  }

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderColor: '#3B82F6',
      borderWidth: 1,
      textStyle: { color: '#F8FAFC', fontSize: 12 },
      formatter: (params: any) => {
        const d = params.data;
        let html = `<strong>${d.name}</strong>`;
        if (d.category) html += `<br/><span style="color:#94A3B8;">Kategori: ${d.category}</span>`;
        if (d.literature) html += `<br/><span style="color:#60A5FA;">📖 ${d.literature}</span>`;
        if (d.questions) html += `<br/><span style="color:#4ADE80;">📝 ${d.questions}</span>`;
        if (d.role) html += `<br/><span style="color:#FBBF24;">⚡ ${d.role}</span>`;
        return html;
      }
    },
    series: [
      {
        type: 'tree',
        data: [mindmapTreeData],
        top: '5%',
        left: '12%',
        bottom: '5%',
        right: '20%',
        symbol: 'circle',
        symbolSize: (value: any, params: any) => {
          if (!params.data.children || params.data.children.length === 0) return 9;
          if (params.treeDepth === 0) return 18;
          if (params.treeDepth === 1) return 14;
          return 11;
        },
        orient: 'LR',
        initialTreeDepth: 2,
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
        lineStyle: {
          color: '#475569',
          width: 2,
          curveness: 0.5
        },
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 11,
          color: '#334155',
          backgroundColor: '#FFFFFF',
          padding: [3, 8],
          borderRadius: 4,
          shadowColor: 'rgba(0, 0, 0, 0.08)',
          shadowBlur: 4
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left',
            color: '#1E293B',
            backgroundColor: '#F1F5F9'
          }
        },
        emphasis: {
          focus: 'descendant',
          itemStyle: { borderWidth: 3 }
        }
      }
    ]
  };

  mindmapChartInstance.setOption(option);
}

function expandAllNodes() {
  if (!mindmapChartInstance) return;
  const option: any = mindmapChartInstance.getOption();
  if (option?.series?.[0]) {
    option.series[0].initialTreeDepth = -1;
    mindmapChartInstance.setOption(option, true);
  }
}

function collapseAllNodes() {
  if (!mindmapChartInstance) return;
  const option: any = mindmapChartInstance.getOption();
  if (option?.series?.[0]) {
    option.series[0].initialTreeDepth = 1;
    mindmapChartInstance.setOption(option, true);
  }
}

function resetMindmapZoom() {
  if (mindmapChartInstance) {
    mindmapChartInstance.dispatchAction({ type: 'restore' });
    renderMindmapChart();
  }
}

const handleResize = () => {
  if (mindmapChartInstance) mindmapChartInstance.resize();
};

watch(activeTab, async (newTab) => {
  if (newTab === 'mindmap') {
    await nextTick();
    if (mindmapChartInstance) {
      mindmapChartInstance.resize();
    } else {
      renderMindmapChart();
    }
  } else if (newTab === 'spbe-ipp') {
    fetchEvaluationsData();
  }
});

interface DataSpecItem {
  id: string;
  dimensionCode: string;
  dimensionName: string;
  dimensionCategory: string;
  dimensionBadgeClass: string;
  variableName: string;
  description: string;
  featureTags: string[];
  literature: {
    author: string;
    year: string;
    title: string;
    journal: string;
    groundingTheory: string;
  };
  instrumentSource: string;
  questionCodes: string[];
  dataType: string;
  roleType: string;
  roleBadgeClass: string;
  explanatoryExplanation: string;
}

const dataSpecs: DataSpecItem[] = [
  {
    id: 'spec-1',
    dimensionCode: 'C_learn',
    dimensionName: 'Konteks Belajar Spasial',
    dimensionCategory: 'Konteks Belajar (C_learn)',
    dimensionBadgeClass: 'badge-purple',
    variableName: 'Spatial Infrastructure Constraint Index (M_spatial)',
    description: 'Tingkat hambatan sinyal, blankspot internet, pemadaman listrik, dan ketergantungan perangkat seluler saat belajar.',
    featureTags: ['Sinyal', 'Listrik', 'Perangkat HP', 'Daerah 3T'],
    literature: {
      author: 'Agustyarsyah, Mulyadi, et al.',
      year: '2025',
      title: 'Analisis Pengembangan dan Pemanfaatan Teknologi Pembelajaran Berbasis E-Learning di Daerah Tertinggal',
      journal: 'TS04E / Jurnal Studi Kebijakan Kedinasan',
      groundingTheory: 'Keterbatasan infrastruktur di daerah terpencil memodifikasi daya serap materi digital secara drastis.'
    },
    instrumentSource: 'Kuesioner Section A, C, G',
    questionCodes: ['Q1', 'Q2', 'Q11', 'Q12', 'Q13', 'Q33'],
    dataType: 'Skala 1-5 & Kategori Wilayah',
    roleType: 'Moderator Variable (M)',
    roleBadgeClass: 'role-moderator',
    explanatoryExplanation: 'Memoderasi efektivitas format materi (menentukan apakah sistem merekomendasikan video, web interaktif, atau audio/offline microlearning).'
  },
  {
    id: 'spec-2',
    dimensionCode: 'C_apply',
    dimensionName: 'Konteks Terapan Layanan',
    dimensionCategory: 'Konteks Layanan (C_apply)',
    dimensionBadgeClass: 'badge-blue',
    variableName: 'Service Delivery Dynamics & Workload Friction (X_service)',
    description: 'Tipologi layanan (tatap muka vs SPBE), beban penanganan warga lokal, komplain pelayanan, dan tugas mendadak.',
    featureTags: ['Front-Office', 'SPBE', 'Keluhan Warga', 'Beban Pelayanan'],
    literature: {
      author: 'Lipsky / Ratri Nur Rohmah',
      year: '2024',
      title: 'Street-Level Bureaucracy & Dinamika Pelayanan Publik ASN',
      journal: 'Cendekia Niaga / Pelatihan ASN',
      groundingTheory: 'ASN garis depan menghadapi diskresi dan friksi langsung dari masyarakat lokal yang memerlukan materi terapan spesifik.'
    },
    instrumentSource: 'Kuesioner Section D, G, H',
    questionCodes: ['Q3', 'Q15', 'Q17', 'Q36', 'Q37', 'Q38'],
    dataType: 'Likert 1-5 & Teks Kualitatif',
    roleType: 'Predictor Variable (X)',
    roleBadgeClass: 'role-predictor',
    explanatoryExplanation: 'Menentukan substansi materi, studi kasus, simulasi SOP layanan, dan urgensi modul kompetensi pelayanan publik.'
  },
  {
    id: 'spec-3',
    dimensionCode: 'X_behavior',
    dimensionName: 'Dinamika Perilaku Belajar & Missingness',
    dimensionCategory: 'Perilaku & Beban Kerja',
    dimensionBadgeClass: 'badge-green',
    variableName: 'Behavioral Multitasking & Context-Aware Missingness',
    description: 'Frekuensi multitasking, pola kamera mati (MNAR-S vs MAR-W vs MCAR-C), dan durasi retensi fokus.',
    featureTags: ['Multitasking', 'Missingness', 'Kamera Mati', 'Durasi Fokus', 'Dropout'],
    literature: {
      author: 'SLR Multimodal Engagement / Rubin Theory',
      year: '2025',
      title: 'Students Engagement Detection Based on Computer Vision & Missingness Analysis',
      journal: 'Expert Systems with Applications',
      groundingTheory: 'Ketidakaktifan pebelajar pada instrumen sinkronus mencerminkan beban kognitif dan friksi lingkungan kerja.'
    },
    instrumentSource: 'Kuesioner Section B, F, I',
    questionCodes: ['Q25', 'Q26', 'Q27', 'Q28', 'Q43', 'Q46', 'Q47'],
    dataType: 'Frekuensi 1-5 & Kategori Alasan',
    roleType: 'Predictor State (X)',
    roleBadgeClass: 'role-predictor',
    explanatoryExplanation: 'Mengatur pacing adaptif, rekomendasi durasi modul per sesi (bite-sized 3-5 menit), dan zero-penalty policy.'
  },
  {
    id: 'spec-4',
    dimensionCode: 'Y_competency',
    dimensionName: 'Target Kompetensi Layanan',
    dimensionCategory: 'Target Kompetensi',
    dimensionBadgeClass: 'badge-amber',
    variableName: 'Public Service Competency Gap & Content Relevance',
    description: 'Tingkat kesenjangan keterampilan layanan riil di wilayah kerja dan preferensi format solusi praktis.',
    featureTags: ['Standar Pelayanan', 'Kesenjangan Skill', 'Solusi Nyata'],
    literature: {
      author: 'Pusdiklat LAN RI / BPSDM',
      year: '2024',
      title: 'Kerangka Standar Kompetensi Jabatan Fungsional Pelayanan Publik',
      journal: 'Pedoman Pengembangan Kompetensi ASN',
      groundingTheory: 'Materi pelatihan harus selaras dengan Standar Pelayanan Minimal (SPM) dan profil demografi penerima layanan.'
    },
    instrumentSource: 'Kuesioner Section E, H',
    questionCodes: ['Q19', 'Q20', 'Q22', 'Q23', 'Q31', 'Q32'],
    dataType: 'Multiple Choice & Ranking',
    roleType: 'Target Output Label (Y)',
    roleBadgeClass: 'role-target',
    explanatoryExplanation: 'Menjadi label target rekomendasi modul (Knowledge Graph node matching dan filtering konten pembelajaran).'
  },
  {
    id: 'spec-5',
    dimensionCode: 'Y_fit',
    dimensionName: 'Validasi Explanatory Power',
    dimensionCategory: 'Validasi Explanatory Power',
    dimensionBadgeClass: 'badge-red',
    variableName: 'Perceived Relevance, Transfer of Learning, & Regional Variance (ΔR²)',
    description: 'Ukuran empiris efikasi pembelajaran adaptif dan peningkatan daya jelas ketika variabel konteks disertakan.',
    featureTags: ['Delta R²', 'Effect Size f²', 'SHAP Value', 'Efikasi Belajar'],
    literature: {
      author: 'Hwang & Chang / Chin',
      year: '2023',
      title: 'Context-Aware Adaptive Learning Systems Evaluation Framework',
      journal: 'Computers & Education',
      groundingTheory: 'Daya penjelas sistem adaptif dinilai dari peningkatan variansi kepuasan belajar dan efisiensi waktu menyelesaikan modul.'
    },
    instrumentSource: 'Kuesioner Section E (Q22, Q23) & Log Evaluasi',
    questionCodes: ['Q22', 'Q23', 'Q42', 'Q48'],
    dataType: 'Skor Efektivitas 1-100 & ΔR²',
    roleType: 'Evaluation Metric',
    roleBadgeClass: 'role-eval',
    explanatoryExplanation: 'Membuktikan secara statistik bahwa pemisahan konteks wilayah meningkatkan akurasi sistem dibanding model umum.'
  }
];

const filteredDataSpecs = computed(() => {
  return dataSpecs.filter(item => {
    if (selectedCategory.value !== 'SEMUA' && item.dimensionCategory !== selectedCategory.value) {
      return false;
    }
    if (searchQuery.value.trim() !== '') {
      const q = searchQuery.value.toLowerCase();
      const matchText = [
        item.dimensionName,
        item.variableName,
        item.description,
        item.literature.author,
        item.literature.title,
        item.questionCodes.join(' ')
      ].join(' ').toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    return true;
  });
});

const dataDictionary = [
  { name: 'province', type: 'VARCHAR(100)', values: '38 Provinsi RI', table: 'survey_responses', desc: 'Provinsi kedudukan penugasan ASN (C_learn & C_apply)' },
  { name: 'regency', type: 'VARCHAR(100)', values: '514 Kab/Kota RI', table: 'survey_responses', desc: 'Kabupaten/Kota kedudukan penugasan ASN' },
  { name: 'area_type', type: 'VARCHAR(50)', values: 'Perkotaan, Perdesaan, 3T, Kepulauan', table: 'survey_responses', desc: 'Karakteristik tipologi geografis lokasi tugas (Q2)' },
  { name: 'institution_type', type: 'VARCHAR(100)', values: 'K/L, Pemprov, Pemkab/Pemkot', table: 'survey_responses', desc: 'Lembaga kedinasan induk ASN (Q3)' },
  { name: 'main_device', type: 'VARCHAR(50)', values: 'HP/Smartphone, Laptop, PC Kantor', table: 'survey_responses', desc: 'Sarana perangkat keras utama untuk pembelajaran (Q9)' },
  { name: 'disruption_freq', type: 'INTEGER', values: '1 (Tidak pernah) s.d. 5 (Sangat sering)', table: 'survey_responses', desc: 'Tingkat frekuensi gangguan koneksi/listrik (Q12)' },
  { name: 'workload_level', type: 'INTEGER', values: '1 (Sangat rendah) s.d. 5 (Sangat tinggi)', table: 'survey_responses', desc: 'Tingkat beban tugas rutin & pelayanan publik (Q15)' },
  { name: 'urgent_task_freq', type: 'INTEGER', values: '1 s.d. 5', table: 'survey_responses', desc: 'Frekuensi instruksi mendadak saat sesi belajar (Q17)' },
  { name: 'relevance_rating', type: 'INTEGER', values: '1 s.d. 5', table: 'survey_responses', desc: 'Tingkat persepsi relevansi materi dengan tugas lapangan (Q22)' },
  { name: 'multitask_freq', type: 'INTEGER', values: '1 s.d. 5', table: 'survey_responses', desc: 'Frekuensi multitasking membuka pekerjaan saat belajar (Q27)' },
  { name: 'sync_cam_off_reasons', type: 'JSON / TEXT[]', values: 'Sinyal, Malu, Mengurus Layanan, dll', table: 'survey_responses', desc: 'Penyebab mematikan kamera saat sesi virtual Zoom (Q47)' }
];

function downloadSchemaJson() {
  const jsonContent = JSON.stringify({
    title: 'Data Requirements Framework: Public Service Adaptive Learning',
    specifications: dataSpecs,
    dictionary: dataDictionary
  }, null, 2);

  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dataset_requirements_framework_asn.json';
  a.click();
  URL.revokeObjectURL(url);
}

function downloadTemplateCsv() {
  const headers = dataDictionary.map(d => d.name).join(',');
  const dummyRow = 'JAWA TIMUR,KABUPATEN MALANG,Perdesaan,Pemerintah Kabupaten/Kota,HP/Smartphone,3,4,3,4,3,"[\"Sinyal lemah\", \"Pelayanan warga\"]"';
  const csvContent = `${headers}\n${dummyRow}\n`;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'template_dataset_kuesioner_asn.csv';
  a.click();
  URL.revokeObjectURL(url);
}

onMounted(() => {
  fetchEvaluationsData();
  nextTick(() => {
    renderMindmapChart();
    window.addEventListener('resize', handleResize);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  if (mindmapChartInstance) {
    mindmapChartInstance.dispose();
  }
});
</script>

<style scoped>
.perspective-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-stroke-secondary);
  background: var(--color-surface-secondary);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.perspective-btn:hover {
  border-color: #3B82F6;
  background: rgba(59, 130, 246, 0.05);
}

.perspective-btn.active-perspective {
  background: #1E293B;
  color: #FFFFFF;
  border-color: #3B82F6;
  box-shadow: 0 4px 12px -2px rgba(37, 99, 235, 0.25);
}

.perspective-sub {
  font-size: 0.725rem;
  color: var(--color-text-secondary);
  margin-top: 0.15rem;
  font-weight: 500;
}

.perspective-btn.active-perspective .perspective-sub {
  color: #94A3B8;
}

.dataset-framework-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.framework-banner {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  padding: 1.75rem 2rem;
  border-radius: var(--radius-lg);
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.2);
}

.banner-top-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.badge-tag {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
}

.badge-tag.mindmap {
  background: rgba(236, 72, 153, 0.2);
  color: #F472B6;
  border: 1px solid rgba(244, 114, 182, 0.3);
}

.badge-tag.missingness {
  background: rgba(168, 85, 247, 0.25);
  color: #C084FC;
  border: 1px solid rgba(192, 132, 252, 0.3);
}

.badge-tag.academic {
  background: rgba(59, 130, 246, 0.2);
  color: #60A5FA;
  border: 1px solid rgba(96, 165, 250, 0.3);
}

.badge-tag.context {
  background: rgba(16, 185, 129, 0.2);
  color: #34D399;
  border: 1px solid rgba(52, 211, 153, 0.3);
}

.badge-tag.validation {
  background: rgba(34, 197, 94, 0.2);
  color: #4ADE80;
  border: 1px solid rgba(74, 222, 128, 0.3);
}

.banner-title {
  font-size: 1.55rem;
  font-weight: 800;
  color: #F8FAFC;
  margin-bottom: 0.4rem;
  letter-spacing: -0.02em;
}

.banner-desc {
  font-size: 0.925rem;
  color: #94A3B8;
  margin: 0;
  max-width: 900px;
  line-height: 1.6;
}

.framework-tabs-bar {
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid var(--color-stroke-secondary);
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.framework-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.15rem;
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

.framework-tab-btn:hover {
  color: #2563EB;
  background: var(--color-surface-secondary);
}

.framework-tab-btn.active {
  color: #2563EB;
  background: var(--color-surface-card);
  border-bottom-color: #2563EB;
}

.tab-icon {
  width: 16px;
  height: 16px;
}

/* Mindmap Card */
.mindmap-card {
  background: var(--color-surface-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-stroke-secondary);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mindmap-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.mindmap-controls {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn-sm {
  font-size: 0.8rem;
  padding: 0.35rem 0.75rem;
}

.mindmap-canvas {
  width: 100%;
  height: 650px;
  background: #F8FAFC;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-stroke-secondary);
}

.node-info-callout {
  background: #0F172A;
  color: #F8FAFC;
  padding: 1.25rem 1.5rem;
  border-radius: var(--radius-md);
  border-left: 4px solid #3B82F6;
  position: relative;
}

.node-info-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.info-badge {
  font-size: 0.75rem;
  font-weight: 700;
  background: rgba(59, 130, 246, 0.2);
  color: #60A5FA;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.info-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0;
}

.close-btn {
  margin-left: auto;
  background: transparent;
  border: none;
  color: #94A3B8;
  cursor: pointer;
  font-size: 1rem;
}

.close-btn:hover {
  color: #FFFFFF;
}

.info-body {
  font-size: 0.875rem;
  color: #CBD5E1;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.info-meta {
  font-size: 0.825rem;
  color: #94A3B8;
  margin-bottom: 0.25rem;
}

.info-meta strong {
  color: #E2E8F0;
}

/* Standard Panels */
.control-panel-card {
  background: var(--color-surface-card);
  padding: 1.25rem 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-stroke-secondary);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.filter-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  text-transform: uppercase;
}

.pill-buttons-row {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.pill-btn {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid var(--color-stroke-secondary);
  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.pill-btn:hover {
  border-color: #2563EB;
  color: #2563EB;
}

.pill-btn.active {
  background: #2563EB;
  border-color: #2563EB;
  color: #FFFFFF;
}

.search-box-wrapper {
  min-width: 280px;
}

.table-card {
  background: var(--color-surface-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-stroke-secondary);
  padding: 1.5rem;
}

.table-header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.table-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.badge-counter {
  font-size: 0.8rem;
  font-weight: 700;
  color: #2563EB;
  background: rgba(37, 99, 235, 0.1);
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
}

.table-responsive {
  overflow-x: auto;
}

.spec-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  text-align: left;
}

.spec-table th {
  background: var(--color-surface-secondary);
  padding: 0.85rem 1rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  border-bottom: 2px solid var(--color-stroke-secondary);
}

.spec-row {
  border-bottom: 1px solid var(--color-stroke-secondary);
  vertical-align: top;
}

.spec-row:hover {
  background: rgba(59, 130, 246, 0.02);
}

.spec-row td {
  padding: 1rem;
}

.dimension-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 800;
  font-family: monospace;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.25rem;
}

.badge-purple { background: #EDE9FE; color: #7C3AED; border: 1px solid #DDD6FE; }
.badge-blue { background: #DBEAFE; color: #1D4ED8; border: 1px solid #BFDBFE; }
.badge-green { background: #DCFCE7; color: #15803D; border: 1px solid #BBF7D0; }
.badge-amber { background: #FEF3C7; color: #B45309; border: 1px solid #FDE68A; }
.badge-red { background: #FEE2E2; color: #B91C1C; border: 1px solid #FECACA; }

.dimension-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.var-title {
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 0.35rem;
}

.var-desc {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
  margin-bottom: 0.5rem;
}

.feature-tags-row {
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
}

.feature-tag {
  font-size: 0.7rem;
  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  border: 1px solid var(--color-stroke-secondary);
}

.literature-box {
  background: var(--color-surface-secondary);
  padding: 0.75rem;
  border-radius: var(--radius-md);
  border-left: 3px solid #2563EB;
}

.lit-author {
  font-weight: 700;
  font-size: 0.825rem;
  color: var(--color-text-primary);
  margin-bottom: 0.2rem;
}

.lit-title {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  font-weight: 600;
  margin-bottom: 0.2rem;
}

.lit-journal {
  font-size: 0.75rem;
  color: #64748B;
  margin-bottom: 0.4rem;
}

.lit-quote {
  font-size: 0.75rem;
  color: #475569;
  font-style: italic;
  line-height: 1.35;
}

.instrument-badge {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.35rem;
}

.question-links {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.4rem;
}

.q-pills-row {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  margin-top: 0.2rem;
}

.q-pill {
  font-size: 0.7rem;
  font-weight: 800;
  background: #EFF6FF;
  color: #1D4ED8;
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  border: 1px solid #BFDBFE;
}

.data-type-text {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.role-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  margin-bottom: 0.35rem;
}

.role-moderator { background: #EDE9FE; color: #7C3AED; }
.role-predictor { background: #DBEAFE; color: #1E40AF; }
.role-target { background: #FEF3C7; color: #92400E; }
.role-eval { background: #DCFCE7; color: #166534; }

.role-desc {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
  margin: 0;
}

/* Matrix 2x2 */
.matrix-overview-card {
  background: var(--color-surface-card);
  padding: 1.75rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-stroke-secondary);
}

.section-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 0.4rem;
}

.section-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.matrix-grid-2x2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.25rem;
}

.quadrant-card {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  border: 2px solid var(--color-stroke);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.quadrant-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.quadrant-card.active {
  border-width: 2.5px;
  background: #F8FAFC;
}

.quadrant-card.border-amber.active { border-color: #D97706; }
.quadrant-card.border-blue.active { border-color: #2563EB; }
.quadrant-card.border-purple.active { border-color: #9333EA; }
.quadrant-card.border-green.active { border-color: #16A34A; }

.quadrant-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.quadrant-badge.q1 { background: #FEF3C7; color: #B45309; }
.quadrant-badge.q2 { background: #DBEAFE; color: #1D4ED8; }
.quadrant-badge.q3 { background: #EDE9FE; color: #7C3AED; }
.quadrant-badge.q4 { background: #DCFCE7; color: #15803D; }

.quadrant-title {
  font-size: 1rem;
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.quadrant-meta {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-stroke-secondary);
}

.quadrant-solution {
  font-size: 0.825rem;
  color: var(--color-text-primary);
}

.quadrant-solution ul {
  margin: 0.4rem 0 0 1.25rem;
  padding: 0;
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

/* Dictionary */
.dictionary-card {
  background: var(--color-surface-card);
  padding: 1.75rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-stroke-secondary);
}

.dict-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.dict-actions {
  display: flex;
  gap: 0.5rem;
}

.dict-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.dict-table th {
  background: var(--color-surface-secondary);
  padding: 0.75rem 1rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  border-bottom: 2px solid var(--color-stroke-secondary);
  text-align: left;
}

.dict-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--color-stroke-secondary);
}

.type-pill {
  font-family: monospace;
  font-size: 0.75rem;
  background: #F1F5F9;
  color: #334155;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  border: 1px solid #CBD5E1;
}

.values-pill {
  font-size: 0.75rem;
  color: #64748B;
}

/* Validation */
.validation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 1.5rem;
}

.val-card {
  background: var(--color-surface-card);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-stroke-secondary);
}

.val-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 0.35rem;
}

.val-sub {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
}

.formula-box {
  background: #0F172A;
  color: #F8FAFC;
  padding: 1rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.formula-line {
  font-size: 0.8rem;
  color: #94A3B8;
}

.formula-line code {
  display: block;
  font-family: 'Fira Code', monospace;
  color: #38BDF8;
  margin-top: 0.2rem;
  font-size: 0.825rem;
}

.formula-line.highlighted code {
  color: #4ADE80;
  font-weight: 700;
}

.criteria-list {
  font-size: 0.825rem;
  color: var(--color-text-primary);
}

.criteria-list ul {
  margin: 0.5rem 0 0 1.25rem;
  padding: 0;
  color: var(--color-text-secondary);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.synthesis-item {
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-stroke-secondary);
}

.synthesis-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.syn-header {
  font-weight: 700;
  font-size: 0.875rem;
  color: #2563EB;
  margin-bottom: 0.25rem;
}

.syn-body {
  font-size: 0.825rem;
  color: var(--color-text-secondary);
  line-height: 1.45;
  margin: 0;
}

/* Quadrant Stat Cards */
.quadrant-stat-card {
  transition: all 0.2s ease;
  border: 1px solid var(--color-stroke-secondary);
}

.quadrant-stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.quadrant-stat-card.active-q1 {
  background: #F0FDF4;
  border: 2px solid #10B981;
}

.quadrant-stat-card.active-q2 {
  background: #EFF6FF;
  border: 2px solid #2563EB;
}

.quadrant-stat-card.active-q3 {
  background: #FFFBEB;
  border: 2px solid #D97706;
}

.quadrant-stat-card.active-q4 {
  background: #FAF5FF;
  border: 2px solid #7C3AED;
}
</style>
