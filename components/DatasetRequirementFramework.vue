<template>
  <div class="dataset-framework-container">
    <!-- Banner Header -->
    <div class="framework-banner">
      <div class="banner-top-badges">
        <span class="badge-tag mindmap">🧠 Visual Mindmap Framework</span>
        <span class="badge-tag academic">📚 Literature-Grounded Dataset</span>
        <span class="badge-tag context">🏛️ SPBE & IPP Data Terintegrasi</span>
        <span class="badge-tag validation">⚡ Explanatory Power Grounded</span>
      </div>
      <h2 class="banner-title">
        Mindmap & Kerangka Spesifikasi Dataset Berbasis Literatur
      </h2>
      <p class="banner-desc">
        Peta pohon konseptual (<em>Mindmap</em>) yang menghubungkan domain spesifik <strong>Kompetensi Layanan Publik ASN</strong> dengan variabel dataset empiris kuesioner, data evaluasi nasional (<strong>Indeks SPBE & IPP 2025</strong>), dan acuan jurnal ilmiah.
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

    <!-- TAB 2: Data Evaluasi Nasional (SPBE & IPP 2025) -->
    <div v-if="activeTab === 'spbe-ipp'" class="framework-content-section">
      <!-- Top Overview KPI Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
        <div class="card" style="padding: 1.25rem; border-top: 4px solid #2563EB;">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase;">Total Data Indeks Pelayanan Publik (IPP)</div>
          <div style="font-size: 2.25rem; font-weight: 800; color: #2563EB; margin-top: 0.2rem;">{{ evalSummary.totalIpp }} <span style="font-size: 0.9rem; color: var(--color-text-muted);">Instansi / Pemda</span></div>
          <div style="font-size: 0.75rem; color: #166534; background: #DCFCE7; display: inline-block; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700; margin-top: 0.35rem;">
            Tersimpan di DB PostgreSQL (2025)
          </div>
        </div>

        <div class="card" style="padding: 1.25rem; border-top: 4px solid #7C3AED;">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase;">Total Data Indeks SPBE Nasional</div>
          <div style="font-size: 2.25rem; font-weight: 800; color: #7C3AED; margin-top: 0.2rem;">{{ evalSummary.totalSpbe }} <span style="font-size: 0.9rem; color: var(--color-text-muted);">Instansi / Pemda</span></div>
          <div style="font-size: 0.75rem; color: #166534; background: #DCFCE7; display: inline-block; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 700; margin-top: 0.35rem;">
            Tersimpan di DB PostgreSQL (2025)
          </div>
        </div>

        <div class="card" style="padding: 1.25rem; border-top: 4px solid #10B981;">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase;">Status Integrasi Triangulasi</div>
          <div style="font-size: 1.25rem; font-weight: 800; color: #10B981; margin-top: 0.5rem;">C_apply Auto-Enrichment Ready</div>
          <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.2rem; line-height: 1.4;">
            Terhubung otomatis dengan pilihan wilayah penugasan ASN pada Kuesioner (Q1-Q3).
          </p>
        </div>
      </div>

      <!-- Predicate Distribution Pills -->
      <div class="card" style="padding: 1.25rem 1.5rem;">
        <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--color-text-primary); margin-bottom: 0.75rem;">
          📊 Distribusi Predikat KemenPAN-RB (2025)
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
          <!-- IPP Breakdown -->
          <div>
            <div style="font-size: 0.8rem; font-weight: 700; color: #2563EB; margin-bottom: 0.5rem;">Indeks Pelayanan Publik (IPP)</div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <span v-for="stat in evalSummary.ippStats" :key="stat.predikat" class="badge" style="background: #EFF6FF; color: #1E40AF; border: 1px solid #BFDBFE; font-size: 0.8rem; padding: 0.3rem 0.6rem;">
                <strong>Predikat {{ stat.predikat || 'N/A' }}:</strong> {{ stat.count }} Pemda
              </span>
            </div>
          </div>

          <!-- SPBE Breakdown -->
          <div>
            <div style="font-size: 0.8rem; font-weight: 700; color: #7C3AED; margin-bottom: 0.5rem;">Indeks SPBE (Digital Governance)</div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <span v-for="stat in evalSummary.spbeStats" :key="stat.predikat" class="badge" style="background: #FAF5FF; color: #6B21A8; border: 1px solid #E9D5FF; font-size: 0.8rem; padding: 0.3rem 0.6rem;">
                <strong>{{ stat.predikat || 'N/A' }}:</strong> {{ stat.count }} Instansi
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Scope Bar (Pemda vs KL / Jakarta) -->
      <div class="control-panel-card" style="margin-bottom: 0;">
        <div class="filter-group">
          <label class="filter-label">Cakupan Wilayah / Entitas Instansi:</label>
          <div class="pill-buttons-row">
            <button 
              :class="['pill-btn', evalTypeFilter === 'pemda' ? 'active' : '']"
              @click="setEvalTypeFilter('pemda')"
            >
              🏛️ Pemerintah Daerah Saja (509 Pemda - Prov/Kab/Kota)
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

        <div style="font-size: 0.8rem; color: #64748B; max-width: 420px; line-height: 1.4;">
          💡 <em>Rekomendasi Disertasi:</em> Fokuskan analisis pada <strong>Pemerintah Daerah</strong> untuk menguji disparitas spasial antar-wilayah (3T vs Perkotaan). ASN K/L otomatis dikelompokkan ke <strong>DKI Jakarta (Pusat)</strong>.
        </div>
      </div>

      <!-- Live Search & Data Explorer -->
      <div class="table-card">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
          <div>
            <h3 class="table-title">🔍 Data Explorer: Nilai Evaluasi IPP & SPBE Instansi / Daerah</h3>
            <p style="font-size: 0.825rem; color: var(--color-text-secondary); margin: 0.2rem 0 0 0;">
              Data ini menjadi ground-truth objektif untuk menentukan kuadran kesiapan layanan publik ASN.
            </p>
          </div>
          <div style="width: 320px;">
            <input 
              v-model="evalSearchQuery"
              @input="fetchEvaluationsData"
              type="text" 
              placeholder="Cari nama kementerian / pemprov / kab / kota..." 
              class="form-control"
              style="font-size: 0.85rem;"
            />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem;">
          <!-- IPP Table -->
          <div style="border: 1px solid var(--color-stroke-secondary); border-radius: var(--radius-md); overflow: hidden;">
            <div style="background: #EFF6FF; padding: 0.75rem 1rem; border-bottom: 1px solid #BFDBFE; font-weight: 800; font-size: 0.85rem; color: #1E40AF; display: flex; justify-content: space-between;">
              <span>Tabel Indeks Pelayanan Publik (IPP)</span>
              <span>{{ evalData.ippList.length }} Ditampilkan</span>
            </div>
            <div style="max-height: 400px; overflow-y: auto;">
              <table class="spec-table" style="font-size: 0.8rem;">
                <thead>
                  <tr>
                    <th>Nama Instansi / Pemda</th>
                    <th style="width: 30%;">Predikat IPP</th>
                    <th style="width: 20%;">Tahun</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in evalData.ippList" :key="'ipp-' + item.id">
                    <td style="font-weight: 600;">{{ item.nama }}</td>
                    <td>
                      <span class="badge" :style="getIppBadgeStyle(item.ipp_predikat)">
                        {{ item.ipp_predikat }}
                      </span>
                    </td>
                    <td>{{ item.tahun }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- SPBE Table -->
          <div style="border: 1px solid var(--color-stroke-secondary); border-radius: var(--radius-md); overflow: hidden;">
            <div style="background: #FAF5FF; padding: 0.75rem 1rem; border-bottom: 1px solid #E9D5FF; font-weight: 800; font-size: 0.85rem; color: #6B21A8; display: flex; justify-content: space-between;">
              <span>Tabel Indeks SPBE (Digital Maturity)</span>
              <span>{{ evalData.spbeList.length }} Ditampilkan</span>
            </div>
            <div style="max-height: 400px; overflow-y: auto;">
              <table class="spec-table" style="font-size: 0.8rem;">
                <thead>
                  <tr>
                    <th>Nama Instansi / Pemda</th>
                    <th style="width: 35%;">Predikat SPBE</th>
                    <th style="width: 20%;">Tahun</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in evalData.spbeList" :key="'spbe-' + item.id">
                    <td style="font-weight: 600;">{{ item.nama }}</td>
                    <td>
                      <span class="badge" :style="getSpbeBadgeStyle(item.spbe_predikat)">
                        {{ item.spbe_predikat }}
                      </span>
                    </td>
                    <td>{{ item.tahun }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: Matriks Pemetaan Dataset & Literatur Review (Table View) -->
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

    <!-- TAB 4: Matriks Dualitas Konteks Interaktif (C_learn x C_apply) -->
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

    <!-- TAB 5: Kamus Data & Struktur Skema Dataset (Data Dictionary) -->
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

    <!-- TAB 6: Formula Matematis Explanatory Power & Justifikasi -->
    <div v-if="activeTab === 'validation'" class="framework-content-section">
      <div class="validation-grid">
        <!-- Formula Card -->
        <div class="val-card">
          <h4 class="val-title">📐 Model Persamaan Explanatory Power ($R^2$ & $\Delta R^2$)</h4>
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
              <li><strong>Signifikansi Moderasi:</strong> Koefisien interaksi $\beta_4$ memiliki nilai $p < 0.05$.</li>
              <li><strong>Peningkatan Varians ($\Delta R^2$):</strong> $\Delta R^2 \ge 0.05$ (Meningkat minimal 5% daya jelas).</li>
              <li><strong>Effect Size ($f^2$):</strong> $f^2 = \frac{R^2_{\text{augmented}} - R^2_{\text{baseline}}}{1 - R^2_{\text{augmented}}} \ge 0.15$ (Kategori Medium/Large Effect).</li>
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

const activeTab = ref<'mindmap' | 'spbe-ipp' | 'mapping' | 'matrix' | 'dictionary' | 'validation'>('mindmap');
const selectedCategory = ref('SEMUA');
const searchQuery = ref('');
const evalSearchQuery = ref('');
const evalTypeFilter = ref<'pemda' | 'kl' | 'all'>('pemda');
const selectedQuadrant = ref('q1');
const selectedNodeInfo = ref<any | null>(null);

const mindmapContainerRef = ref<HTMLDivElement | null>(null);
let mindmapChartInstance: echarts.ECharts | null = null;

// Evaluations SPBE & IPP State
const evalSummary = ref({
  totalIpp: 509,
  totalSpbe: 238,
  ippStats: [] as any[],
  spbeStats: [] as any[]
});

const evalData = ref({
  ippList: [] as any[],
  spbeList: [] as any[]
});

function setEvalTypeFilter(type: 'pemda' | 'kl' | 'all') {
  evalTypeFilter.value = type;
  fetchEvaluationsData();
}

async function fetchEvaluationsData() {
  try {
    const res: any = await $fetch('/api/evaluations/spbe-ipp', {
      params: { 
        q: evalSearchQuery.value,
        type: evalTypeFilter.value
      }
    });
    if (res && res.success && res.data) {
      evalData.value.ippList = res.data.ippList || [];
      evalData.value.spbeList = res.data.spbeList || [];
      evalSummary.value.totalIpp = evalTypeFilter.value === 'pemda' ? res.data.totalIppPemda : (evalTypeFilter.value === 'all' ? res.data.totalIppAll : res.data.currentIppCount);
      evalSummary.value.totalSpbe = evalTypeFilter.value === 'pemda' ? res.data.totalSpbePemda : (evalTypeFilter.value === 'all' ? res.data.totalSpbeAll : res.data.currentSpbeCount);
      evalSummary.value.ippStats = res.data.ippStats || [];
      evalSummary.value.spbeStats = res.data.spbeStats || [];
    }
  } catch (e) {
    console.error('Failed to fetch SPBE/IPP evaluations:', e);
  }
}

function getIppBadgeStyle(predikat: string) {
  if (predikat === 'A' || predikat === '-A') return 'background: #DCFCE7; color: #166534; border: 1px solid #86EFAC;';
  if (predikat === 'B' || predikat === '-B') return 'background: #DBEAFE; color: #1E40AF; border: 1px solid #93C5FD;';
  return 'background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;';
}

function getSpbeBadgeStyle(predikat: string) {
  if (predikat === 'Memuaskan') return 'background: #DCFCE7; color: #166534; border: 1px solid #86EFAC; font-weight: 800;';
  if (predikat === 'Sangat Baik') return 'background: #DBEAFE; color: #1E40AF; border: 1px solid #93C5FD; font-weight: 700;';
  if (predikat === 'Baik') return 'background: #FAF5FF; color: #6B21A8; border: 1px solid #E9D5FF;';
  return 'background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;';
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
          literature: 'KemenPAN-RB Satudata (582 IPP & 267 SPBE)',
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
      name: '3. State Perilaku Belajar (X_behavior)',
      category: 'Behavioral State',
      itemStyle: { color: '#059669' },
      label: { color: '#059669', fontWeight: 'bold' },
      description: 'Dinamika kebiasaan ASN saat mengikuti pelatihan daring tatap muka maupun mandiri.',
      children: [
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
        },
        {
          name: 'Sesi Sinkronus & Kamera Mati',
          category: 'Missingness & Engagement',
          literature: 'Computer Vision & Dropout Analysis',
          questions: 'Q43, Q47, Q48',
          role: 'Friction Trigger Detection',
          description: 'Kamera dimatikan akibat kendala bandwidth atau kelelahan layar.',
          children: [
            { name: 'Fallback ke Transkrip & Ringkasan Audio' }
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
    dimensionName: 'Dinamika Perilaku Belajar',
    dimensionCategory: 'Perilaku & Beban Kerja',
    dimensionBadgeClass: 'badge-green',
    variableName: 'Behavioral Multitasking & Engagement State',
    description: 'Frekuensi multitasking saat pelatihan, mematikan kamera saat synchronous zoom, dan durasi retensi fokus.',
    featureTags: ['Multitasking', 'Kamera Mati', 'Durasi Fokus', 'Dropout'],
    literature: {
      author: 'SLR Multimodal Engagement',
      year: '2025',
      title: 'Students Engagement Detection Based on Computer Vision & Missingness Analysis',
      journal: 'Expert Systems with Applications',
      groundingTheory: 'Ketidakaktifan pebelajar pada instrumen sinkronus mencerminkan beban kognitif dan friksi lingkungan kerja.'
    },
    instrumentSource: 'Kuesioner Section B, F, I',
    questionCodes: ['Q25', 'Q27', 'Q28', 'Q43', 'Q46', 'Q47'],
    dataType: 'Frekuensi 1-5 & Durasi (Menit)',
    roleType: 'Predictor State (X)',
    roleBadgeClass: 'role-predictor',
    explanatoryExplanation: 'Mengatur pacing adaptif, rekomendasi durasi modul per sesi (bite-sized 5-10 menit), dan pengingat kognitif.'
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

.badge-tag.academic {
  background: rgba(59, 130, 246, 0.2);
  color: #60A5FA;
  border: 1px solid rgba(96, 165, 250, 0.3);
}

.badge-tag.context {
  background: rgba(168, 85, 247, 0.2);
  color: #C084FC;
  border: 1px solid rgba(192, 132, 252, 0.3);
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
</style>
