import { ref, computed, onMounted } from 'vue';
import { SURVEY_SECTIONS, SURVEY_QUESTIONS, type Question } from '~/data/questions-data';

export interface SurveyResponse {
  id: string;
  timestamp: string;
  answers: Record<string, any>;
  province?: string;
  regency?: string;
}

const STORAGE_KEY_DRAFT = 'kuesioner_asn_draft_v1';
const STORAGE_KEY_RESPONSES = 'kuesioner_asn_responses_v1';

export function useSurvey() {
  const currentSectionIndex = ref(0);
  const answers = ref<Record<string, any>>({});
  const submittedResponses = ref<SurveyResponse[]>([]);
  const isSubmitted = ref(false);
  const activeTab = ref<'survey' | 'admin'>('survey');

  // Load draft & submitted responses from localStorage
  const loadStoredData = () => {
    if (process.client) {
      try {
        const savedDraft = localStorage.getItem(STORAGE_KEY_DRAFT);
        if (savedDraft) {
          answers.value = JSON.parse(savedDraft);
        }

        const savedResponses = localStorage.getItem(STORAGE_KEY_RESPONSES);
        if (savedResponses) {
          submittedResponses.value = JSON.parse(savedResponses);
        }
      } catch (err) {
        console.error('Error loading stored survey data', err);
      }
    }
  };

  // Save current draft
  const saveDraft = () => {
    if (process.client) {
      localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(answers.value));
    }
  };

  // Reset current form
  const resetForm = () => {
    answers.value = {};
    currentSectionIndex.value = 0;
    isSubmitted.value = false;
    if (process.client) {
      localStorage.removeItem(STORAGE_KEY_DRAFT);
    }
  };

  const currentSection = computed(() => SURVEY_SECTIONS[currentSectionIndex.value]);

  const isFirstSection = computed(() => currentSectionIndex.value === 0);
  const isLastSection = computed(() => currentSectionIndex.value === SURVEY_SECTIONS.length - 1);

  // Active questions in current section, respecting skip logic
  const activeQuestions = computed(() => {
    const sec = currentSection.value;
    if (!sec) return [];

    return SURVEY_QUESTIONS.filter(q => {
      if (q.sectionId !== sec.id) return false;

      // Skip logic for Q7 and Q8 if Q6 == "Tidak"
      if (q.dependsOn) {
        const parentVal = answers.value[`q_${q.dependsOn.questionId}`];
        if (parentVal !== q.dependsOn.value) {
          return false;
        }
      }
      return true;
    });
  });

  // Calculate completion percentage
  const progressPercent = computed(() => {
    const total = SURVEY_SECTIONS.length;
    return Math.round(((currentSectionIndex.value + 1) / total) * 100);
  });

  // Next section handler with skip logic
  const goToNextSection = () => {
    // If Q6 answered "Tidak" and user is at Section B, auto-skip Section B's dependent questions or advance
    if (currentSectionIndex.value < SURVEY_SECTIONS.length - 1) {
      currentSectionIndex.value++;
      saveDraft();
      if (process.client) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const goToPrevSection = () => {
    if (currentSectionIndex.value > 0) {
      currentSectionIndex.value--;
      if (process.client) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const jumpToSection = (index: number) => {
    if (index >= 0 && index < SURVEY_SECTIONS.length) {
      currentSectionIndex.value = index;
      if (process.client) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Submit survey response
  const isSubmitting = ref(false);
  const submitError = ref<string | null>(null);

  const submitSurvey = async () => {
    isSubmitting.value = true;
    submitError.value = null;

    const newResponse: SurveyResponse = {
      id: `RESP-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      answers: { ...answers.value },
      province: answers.value['q_1_prov'] || 'Belum diisi',
      regency: answers.value['q_1_kab'] || 'Belum diisi'
    };

    try {
      if (process.client) {
        await $fetch('/api/submit', {
          method: 'POST',
          body: newResponse
        });
      }

      submittedResponses.value.push(newResponse);

      if (process.client) {
        localStorage.setItem(STORAGE_KEY_RESPONSES, JSON.stringify(submittedResponses.value));
        localStorage.removeItem(STORAGE_KEY_DRAFT);
      }

      isSubmitted.value = true;
    } catch (err: any) {
      console.error('Error submitting survey:', err);
      submitError.value = err.data?.statusMessage || err.message || 'Gagal menyimpan jawaban ke database.';
    } finally {
      isSubmitting.value = false;
    }
  };

  // Seed sample mock responses for research visualization
  const seedMockData = () => {
    const mockData: SurveyResponse[] = [
      {
        id: 'RESP-MOCK-001',
        timestamp: '2026-08-14T09:30:00Z',
        province: 'Papua Barat',
        regency: 'Manokwari',
        answers: {
          q_1_prov: 'Papua Barat',
          q_1_kab: 'Manokwari',
          q_2: 'Wilayah terpencil',
          q_3: 'Pemerintah Provinsi',
          q_4: '35–44',
          q_5: '11–20 tahun',
          q_6: 'Ya',
          q_7: ['Blended learning', 'Pelatihan teknis'],
          q_8: ['ASN Unggul', 'Zoom'],
          q_9: 'Laptop',
          q_10: ['Kantor', 'Tempat kerja/lokasi lapangan'],
          q_11: ['Wi-Fi kantor', 'Hotspot dari perangkat lain'],
          q_12: 4,
          q_13: ['Koneksi terputus', 'Video buffering', 'Harus login kembali'],
          q_14: 'Seringkali sinyal hilang mendadak saat sesi Zoom webinar jam 10 pagi, padahal saya juga sedang piket pelayanan publik di kantor camat.',
          q_15: 5,
          q_16: 4,
          q_17: 2,
          q_18: 2,
          q_19: 4,
          q_20: 3,
          q_21: 4,
          q_22: 4,
          q_23: ['Infografis', 'Praktik/studi kasus'],
          q_24: 2,
          q_25: 3,
          q_26: 3,
          q_27: 2,
          q_28: ['Pekerjaan kedinasan', 'Koneksi internet', 'Kelelahan'],
          q_29: 'Jadwal pelatihan online bentrok dengan tugas mendesak pelayanan masyarakat di daerah.',
          q_30: 'Diberikan fleksibilitas waktu (asynchronous) daripada wajib Zoom berjam-jam secara synchronous.',
          q_31: 'Listrik dan internet sering padam bergiliran di jam kerja kantor.',
          q_32: 'Penyelenggara menganggap ASN daerah memiliki akses internet berkecepatan tinggi dan bebas tugas harian saat webinar.',
          q_33: {
            'Menyalakan kamera': 2,
            'Mematikan kamera': 4,
            'Menggunakan smartphone': 4,
            'Mengikuti sambil melakukan pekerjaan lain': 5,
            'Berpindah tempat selama sesi': 4,
            'Mengalami koneksi terputus': 4
          }
        }
      },
      {
        id: 'RESP-MOCK-002',
        timestamp: '2026-08-14T10:15:00Z',
        province: 'Jawa Barat',
        regency: 'Bandung',
        answers: {
          q_1_prov: 'Jawa Barat',
          q_1_kab: 'Bandung',
          q_2: 'Perkotaan',
          q_3: 'Kementerian/Lembaga',
          q_4: '25–34',
          q_5: '5–10 tahun',
          q_6: 'Ya',
          q_7: ['MOOC', 'Pelatihan teknis'],
          q_8: ['ASN Unggul', 'Moodle'],
          q_9: 'Laptop',
          q_10: ['Kantor', 'Rumah'],
          q_11: ['Wi-Fi kantor', 'Wi-Fi rumah'],
          q_12: 2,
          q_13: ['Perangkat lambat'],
          q_14: 'Materi modul terlalu banyak teks tanpa interaktivitas.',
          q_15: 4,
          q_16: 3,
          q_17: 4,
          q_18: 4,
          q_19: 1,
          q_20: 5,
          q_21: 1,
          q_22: 5,
          q_23: ['Video', 'Simulasi'],
          q_24: 4,
          q_25: 4,
          q_26: 4,
          q_27: 4,
          q_28: ['Pekerjaan kedinasan', 'Materi kurang menarik'],
          q_29: 'Beban tugas kerjaan dinas tetap harus selesai tepat waktu di hari yang sama.',
          q_30: 'Materi video dibuat pendek (micro-learning) maksimal 5 menit per modul.',
          q_31: 'Di wilayah perkotaan internet stabil, tetapi dinamika rapat mendadak dari pimpinan sangat tinggi.',
          q_32: 'Kurang memahami bahwa ASN kerap terdistraksi panggilan dinas mendadak saat pelatihan.',
          q_33: {
            'Menyalakan kamera': 4,
            'Mematikan kamera': 2,
            'Menggunakan smartphone': 2,
            'Mengikuti sambil melakukan pekerjaan lain': 4,
            'Berpindah tempat selama sesi': 2,
            'Mengalami koneksi terputus': 1
          }
        }
      },
      {
        id: 'RESP-MOCK-003',
        timestamp: '2026-08-14T10:40:00Z',
        province: 'Nusa Tenggara Timur',
        regency: 'Alor',
        answers: {
          q_1_prov: 'Nusa Tenggara Timur',
          q_1_kab: 'Alor',
          q_2: 'Wilayah kepulauan',
          q_3: 'Pemerintah Kabupaten/Kota',
          q_4: '45–54',
          q_5: '>20 tahun',
          q_6: 'Ya',
          q_7: ['Pelatihan fungsional'],
          q_8: ['Kolabjar', 'Zoom'],
          q_9: 'Smartphone',
          q_10: ['Kantor', 'Tempat kerja/lokasi lapangan'],
          q_11: ['Paket data pribadi', 'Hotspot dari perangkat lain'],
          q_12: 5,
          q_13: ['Koneksi terputus', 'Video buffering', 'Kehabisan kuota', 'Sulit mengunduh materi'],
          q_14: 'Kuota habis di tengah ujian online dan sinyal seluler hilang saat hujan deras.',
          q_15: 5,
          q_16: 5,
          q_17: 1,
          q_18: 2,
          q_19: 5,
          q_20: 2,
          q_21: 5,
          q_22: 3,
          q_23: ['Teks', 'Infografis'],
          q_24: 1,
          q_25: 2,
          q_26: 2,
          q_27: 2,
          q_28: ['Koneksi internet', 'Perangkat', 'Pekerjaan kedinasan'],
          q_29: 'Biaya kuota internet mahal dan sinyal tidak stabil di wilayah kepulauan.',
          q_30: 'Materi pelatihan dapat diunduh (offline mode) agar tidak boros kuota.',
          q_31: 'Kami bertugas di pulau terluar dengan keterbatasan tower seluler.',
          q_32: 'Penyelenggara belum sadar bahwa tidak semua ASN memiliki fasilitas laptop dinas dan WiFi gratis.',
          q_33: {
            'Menyalakan kamera': 1,
            'Mematikan kamera': 5,
            'Menggunakan smartphone': 5,
            'Mengikuti sambil melakukan pekerjaan lain': 5,
            'Berpindah tempat selama sesi': 4,
            'Mengalami koneksi terputus': 5
          }
        }
      }
    ];

    submittedResponses.value = mockData;
    if (process.client) {
      localStorage.setItem(STORAGE_KEY_RESPONSES, JSON.stringify(mockData));
    }
  };

  // Export JSON file
  const exportJSON = () => {
    if (!process.client) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(submittedResponses.value, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kuesioner_asn_responses_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Export CSV file
  const exportCSV = () => {
    if (!process.client || submittedResponses.value.length === 0) return;
    
    // Headers
    const headers = ['Response ID', 'Timestamp', 'Provinsi', 'Kabupaten/Kota', ...SURVEY_QUESTIONS.map(q => `${q.code}_${q.text.substring(0, 30)}`)];
    
    const rows = submittedResponses.value.map(res => {
      const row = [
        res.id,
        res.timestamp,
        `"${res.province || ''}"`,
        `"${res.regency || ''}"`
      ];

      SURVEY_QUESTIONS.forEach(q => {
        let val = res.answers[`q_${q.id}`];
        if (q.type === 'region') {
          val = `${res.answers['q_1_prov'] || ''} - ${res.answers['q_1_kab'] || ''}`;
        }
        if (Array.isArray(val)) {
          val = val.join('; ');
        } else if (typeof val === 'object' && val !== null) {
          val = JSON.stringify(val);
        }
        row.push(`"${(val || '').toString().replace(/"/g, '""')}"`);
      });

      return row.join(',');
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `kuesioner_asn_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  onMounted(() => {
    loadStoredData();
  });

  return {
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
    activeTab,
    goToNextSection,
    goToPrevSection,
    jumpToSection,
    saveDraft,
    resetForm,
    submitSurvey,
    seedMockData,
    exportJSON,
    exportCSV
  };
}
