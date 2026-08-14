export interface QuestionSection {
  id: string;
  code: string;
  title: string;
  description?: string;
}

export interface Question {
  id: number;
  sectionId: string;
  code: string;
  text: string;
  hint?: string;
  type: 'single' | 'multi' | 'multi-max' | 'likert' | 'text' | 'region' | 'matrix';
  options?: string[];
  hasOtherOption?: boolean;
  maxSelections?: number;
  isRequired?: boolean;
  isGoldQuestion?: boolean;
  matrixItems?: string[];
  matrixScales?: string[];
  dependsOn?: {
    questionId: number;
    value: string;
  };
}

export const SURVEY_SECTIONS: QuestionSection[] = [
  {
    id: 'section_a',
    code: 'A',
    title: 'Profil Peserta',
    description: 'Mengetahui konteks belajar tempat Anda bertugas (bukan mengumpulkan identitas pribadi).'
  },
  {
    id: 'section_b',
    code: 'B',
    title: 'Pengalaman Mengikuti E-Learning',
    description: 'Bagian utama mengenai keterlibatan Anda dalam pelatihan berbasis digital.'
  },
  {
    id: 'section_c',
    code: 'C',
    title: 'Perangkat dan Konektivitas',
    description: 'Mengukur sarana teknis dan kendala aksesibilitas jaringan saat belajar.'
  },
  {
    id: 'section_d',
    code: 'D',
    title: 'Lingkungan Pekerjaan',
    description: 'Dinamika kedinasan, beban kerja (workload), dan alokasi waktu pelatihan.'
  },
  {
    id: 'section_e',
    code: 'E',
    title: 'Pengalaman terhadap Materi Pembelajaran',
    description: 'Kesesuaian format materi, kemudahan akses, dan preferensi belajar.'
  },
  {
    id: 'section_f',
    code: 'F',
    title: 'Interaksi dan Pengalaman Belajar',
    description: 'Fokus, kesempatan berdiskusi, dan faktor penyebab ketidakaktifan.'
  },
  {
    id: 'section_g',
    code: 'G',
    title: 'Refleksi & Kondisi Khusus Lokasi Penugasan',
    description: 'Pertanyaan mendalam untuk mengungkap realita lapangan dan kontekstual spastal.'
  },
  {
    id: 'section_h',
    code: 'H',
    title: 'Perspektif Penyelenggara Pelatihan',
    description: 'Perspektif ASN mengenai aspek yang perlu dipahami oleh pihak penyelenggara.'
  },
  {
    id: 'section_sync',
    code: 'I',
    title: 'Pengalaman Pembelajaran Synchronous (Zoom/Meet)',
    description: 'Dinamika perilaku dan kendala teknis saat menghadiri sesi tatap muka virtual.'
  }
];

export const LIKERT_5_LABELS = [
  { value: 1, label: 'Sangat Tidak Setuju' },
  { value: 2, label: 'Tidak Setuju' },
  { value: 3, label: 'Netral' },
  { value: 4, label: 'Setuju' },
  { value: 5, label: 'Sangat Setuju' }
];

export const FREQUENCY_5_LABELS = [
  { value: 1, label: 'Tidak Pernah' },
  { value: 2, label: 'Jarang' },
  { value: 3, label: 'Kadang-kadang' },
  { value: 4, label: 'Sering' },
  { value: 5, label: 'Sangat Sering' }
];

export const SYNC_FREQUENCY_LABELS = ['Tidak pernah', 'Jarang', 'Kadang', 'Sering', 'Selalu'];

export const SURVEY_QUESTIONS: Question[] = [
  // SECTION A
  {
    id: 1,
    sectionId: 'section_a',
    code: 'Q1',
    text: 'Wilayah tempat Anda bertugas',
    hint: 'Pilih Provinsi dan Kabupaten/Kota tempat Anda berkedudukan saat ini.',
    type: 'region',
    isRequired: true
  },
  {
    id: 2,
    sectionId: 'section_a',
    code: 'Q2',
    text: 'Jenis wilayah tempat Anda bertugas',
    hint: 'Biarkan data lokasi diklasifikasikan secara obyektif berdasarkan karakteristik wilayah Anda.',
    type: 'single',
    options: ['Perkotaan', 'Perdesaan', 'Wilayah terpencil', 'Wilayah perbatasan', 'Wilayah kepulauan'],
    hasOtherOption: true,
    isRequired: true
  },
  {
    id: 3,
    sectionId: 'section_a',
    code: 'Q3',
    text: 'Jenis instansi',
    type: 'single',
    options: ['Kementerian/Lembaga', 'Pemerintah Provinsi', 'Pemerintah Kabupaten/Kota'],
    hasOtherOption: true,
    isRequired: true
  },
  {
    id: 4,
    sectionId: 'section_a',
    code: 'Q4',
    text: 'Kelompok usia',
    type: 'single',
    options: ['<25', '25–34', '35–44', '45–54', '≥55'],
    isRequired: true
  },
  {
    id: 5,
    sectionId: 'section_a',
    code: 'Q5',
    text: 'Sudah berapa lama Anda bekerja sebagai ASN?',
    type: 'single',
    options: ['<5 tahun', '5–10 tahun', '11–20 tahun', '>20 tahun'],
    isRequired: true
  },

  // SECTION B
  {
    id: 6,
    sectionId: 'section_b',
    code: 'Q6',
    text: 'Dalam 12 bulan terakhir, apakah Anda pernah mengikuti pelatihan yang menggunakan LMS/MOOC/e-learning?',
    type: 'single',
    options: ['Ya', 'Tidak'],
    isRequired: true
  },
  {
    id: 7,
    sectionId: 'section_b',
    code: 'Q7',
    text: 'Jenis pembelajaran digital yang pernah Anda ikuti',
    hint: 'Dapat memilih lebih dari satu jawaban.',
    type: 'multi',
    options: [
      'MOOC',
      'Latsar',
      'Pelatihan kepemimpinan',
      'Pelatihan teknis',
      'Pelatihan fungsional',
      'Webinar/synchronous training',
      'Blended learning'
    ],
    hasOtherOption: true,
    dependsOn: { questionId: 6, value: 'Ya' }
  },
  {
    id: 8,
    sectionId: 'section_b',
    code: 'Q8',
    text: 'Platform yang pernah digunakan',
    hint: 'Dapat memilih lebih dari satu jawaban.',
    type: 'multi',
    options: [
      'ASN Unggul',
      'Kolabjar',
      'LMS instansi',
      'Moodle',
      'Zoom',
      'Google Meet'
    ],
    hasOtherOption: true,
    dependsOn: { questionId: 6, value: 'Ya' }
  },

  // SECTION C
  {
    id: 9,
    sectionId: 'section_c',
    code: 'Q9',
    text: 'Perangkat utama yang Anda gunakan untuk mengikuti pembelajaran digital',
    type: 'single',
    options: ['Laptop', 'Desktop', 'Smartphone', 'Tablet', 'Bergantian beberapa perangkat'],
    isRequired: true
  },
  {
    id: 10,
    sectionId: 'section_c',
    code: 'Q10',
    text: 'Di mana biasanya Anda mengikuti pembelajaran?',
    type: 'multi',
    options: ['Kantor', 'Rumah', 'Tempat kerja/lokasi lapangan', 'Fasilitas publik'],
    hasOtherOption: true,
    isRequired: true
  },
  {
    id: 11,
    sectionId: 'section_c',
    code: 'Q11',
    text: 'Bagaimana Anda biasanya memperoleh koneksi internet?',
    type: 'multi',
    options: ['Wi-Fi kantor', 'Wi-Fi rumah', 'Paket data pribadi', 'Hotspot dari perangkat lain'],
    hasOtherOption: true,
    isRequired: true
  },
  {
    id: 12,
    sectionId: 'section_c',
    code: 'Q12',
    text: 'Seberapa sering Anda mengalami gangguan ketika mengikuti pembelajaran online?',
    hint: '1 = Tidak pernah s.d. 5 = Sangat sering',
    type: 'likert',
    options: FREQUENCY_5_LABELS.map(f => `${f.value} = ${f.label}`),
    isRequired: true
  },
  {
    id: 13,
    sectionId: 'section_c',
    code: 'Q13',
    text: 'Jenis gangguan yang pernah Anda alami',
    type: 'multi',
    options: [
      'Koneksi terputus',
      'Video buffering',
      'Audio terputus',
      'Sulit membuka materi',
      'Sulit mengunduh materi',
      'Sulit mengunggah tugas',
      'LMS tidak dapat diakses',
      'Harus login kembali',
      'Perangkat lambat',
      'Kehabisan kuota',
      'Tidak mengalami gangguan'
    ],
    hasOtherOption: true
  },
  {
    id: 14,
    sectionId: 'section_c',
    code: 'Q14',
    text: 'Ceritakan pengalaman paling mengganggu yang pernah Anda alami ketika mengikuti pembelajaran online.',
    hint: 'Ceritakan secara bebas (misal: gangguan teknis, harus melayani masyarakat saat kelas, masalah jaringan, dll).',
    type: 'text',
    isGoldQuestion: true,
    isRequired: false
  },

  // SECTION D
  {
    id: 15,
    sectionId: 'section_d',
    code: 'Q15',
    text: 'Ketika mengikuti pelatihan, saya tetap harus menjalankan pekerjaan kedinasan.',
    hint: '1 = Sangat tidak setuju s.d. 5 = Sangat setuju',
    type: 'likert',
    isRequired: true
  },
  {
    id: 16,
    sectionId: 'section_d',
    code: 'Q16',
    text: 'Saya sering harus menghentikan atau meninggalkan pembelajaran karena pekerjaan kedinasan.',
    hint: '1 = Sangat tidak setuju s.d. 5 = Sangat setuju',
    type: 'likert',
    isRequired: true
  },
  {
    id: 17,
    sectionId: 'section_d',
    code: 'Q17',
    text: 'Saya memiliki waktu yang cukup untuk menyelesaikan materi dan tugas pelatihan.',
    hint: '1 = Sangat tidak setuju s.d. 5 = Sangat setuju',
    type: 'likert',
    isRequired: true
  },
  {
    id: 18,
    sectionId: 'section_d',
    code: 'Q18',
    text: 'Atasan/unit kerja saya memberikan waktu yang cukup untuk mengikuti pelatihan.',
    hint: '1 = Sangat tidak setuju s.d. 5 = Sangat setuju',
    type: 'likert',
    isRequired: true
  },
  {
    id: 19,
    sectionId: 'section_d',
    code: 'Q19',
    text: 'Ketika mengikuti pembelajaran, saya sering harus berpindah lokasi karena tuntutan pekerjaan.',
    hint: '1 = Sangat tidak setuju s.d. 5 = Sangat setuju',
    type: 'likert',
    isRequired: true
  },

  // SECTION E
  {
    id: 20,
    sectionId: 'section_e',
    code: 'Q20',
    text: 'Materi pembelajaran dapat diakses dengan mudah menggunakan perangkat yang saya miliki.',
    hint: '1 = Sangat tidak setuju s.d. 5 = Sangat setuju',
    type: 'likert',
    isRequired: true
  },
  {
    id: 21,
    sectionId: 'section_e',
    code: 'Q21',
    text: 'Ukuran video/materi membuat saya kesulitan mengakses pembelajaran.',
    hint: '1 = Sangat tidak setuju s.d. 5 = Sangat setuju',
    type: 'likert',
    isRequired: true
  },
  {
    id: 22,
    sectionId: 'section_e',
    code: 'Q22',
    text: 'Materi pembelajaran sesuai dengan kebutuhan pekerjaan saya.',
    hint: '1 = Sangat tidak setuju s.d. 5 = Sangat setuju',
    type: 'likert',
    isRequired: true
  },
  {
    id: 23,
    sectionId: 'section_e',
    code: 'Q23',
    text: 'Saya lebih mudah memahami materi melalui:',
    hint: 'Pilih MAKSIMAL 2 opsi pilihan.',
    type: 'multi-max',
    maxSelections: 2,
    options: ['Teks', 'Video', 'Audio', 'Infografis', 'Simulasi', 'Diskusi langsung', 'Praktik/studi kasus'],
    isRequired: true
  },
  {
    id: 24,
    sectionId: 'section_e',
    code: 'Q24',
    text: 'Format pembelajaran yang saya ikuti sudah sesuai dengan kondisi saya sebagai ASN yang tetap menjalankan pekerjaan.',
    hint: '1 = Sangat tidak setuju s.d. 5 = Sangat setuju',
    type: 'likert',
    isRequired: true
  },

  // SECTION F
  {
    id: 25,
    sectionId: 'section_f',
    code: 'Q25',
    text: 'Saya memiliki kesempatan yang cukup untuk bertanya kepada fasilitator.',
    hint: '1 = Sangat tidak setuju s.d. 5 = Sangat setuju',
    type: 'likert',
    isRequired: true
  },
  {
    id: 26,
    sectionId: 'section_f',
    code: 'Q26',
    text: 'Saya dapat berinteraksi dengan peserta lain selama pembelajaran.',
    hint: '1 = Sangat tidak setuju s.d. 5 = Sangat setuju',
    type: 'likert',
    isRequired: true
  },
  {
    id: 27,
    sectionId: 'section_f',
    code: 'Q27',
    text: 'Saya merasa tetap fokus selama mengikuti pembelajaran online.',
    hint: '1 = Sangat tidak setuju s.d. 5 = Sangat setuju',
    type: 'likert',
    isRequired: true
  },
  {
    id: 28,
    sectionId: 'section_f',
    code: 'Q28',
    text: 'Ketika saya tidak aktif dalam pembelajaran online, biasanya penyebabnya adalah:',
    hint: 'Pilih MAKSIMAL 3 opsi penyebab utama.',
    type: 'multi-max',
    maxSelections: 3,
    options: [
      'Tidak memahami materi',
      'Materi kurang menarik',
      'Koneksi internet',
      'Perangkat',
      'Pekerjaan kedinasan',
      'Kelelahan',
      'Tidak memiliki waktu',
      'Gangguan lingkungan',
      'Masalah platform/LMS',
      'Materi kurang relevan',
      'Saya memang tidak tertarik'
    ],
    hasOtherOption: true,
    isRequired: true
  },

  // SECTION G
  {
    id: 29,
    sectionId: 'section_g',
    code: 'Q29',
    text: 'Menurut Anda, apa masalah terbesar yang Anda hadapi ketika mengikuti pelatihan secara online?',
    hint: 'Tuliskan secara bebas masalah paling krusial bagi Anda.',
    type: 'text',
    isGoldQuestion: true,
    isRequired: true
  },
  {
    id: 30,
    sectionId: 'section_g',
    code: 'Q30',
    text: 'Jika Anda dapat mengubah satu hal dari sistem pelatihan online yang pernah Anda ikuti, apa yang akan Anda ubah?',
    hint: 'Gagasan atau masukan perbaikan sistemik.',
    type: 'text',
    isGoldQuestion: true,
    isRequired: true
  },
  {
    id: 31,
    sectionId: 'section_g',
    code: 'Q31',
    text: 'Apakah ada kondisi khusus di tempat Anda bertugas yang membuat pengalaman mengikuti pelatihan online berbeda dengan ASN di daerah lain?',
    hint: 'Bebas sebutkan hal geografis, listrik, jaringan, pelayanan masyarakat, jarak, perangkat, atau budaya kerja setempat.',
    type: 'text',
    isGoldQuestion: true,
    isRequired: true
  },

  // SECTION H
  {
    id: 32,
    sectionId: 'section_h',
    code: 'Q32',
    text: 'Menurut Anda, apa yang belum dipahami oleh penyelenggara pelatihan mengenai kesulitan ASN ketika mengikuti pembelajaran online?',
    hint: 'Temuan atau perspektif tak terduga yang sering luput dari perhatian pembuat kebijakan pelatihan.',
    type: 'text',
    isGoldQuestion: true,
    isRequired: true
  },

  // SECTION SYNCHRONOUS (Q33)
  {
    id: 33,
    sectionId: 'section_sync',
    code: 'Q33',
    text: 'Ketika mengikuti pembelajaran melalui Zoom/Google Meet, seberapa sering Anda melakukan hal berikut:',
    hint: 'Pilih frekuensi (1 = Tidak pernah s.d. 5 = Selalu) untuk masing-masing aktivitas.',
    type: 'matrix',
    matrixItems: [
      'Menyalakan kamera',
      'Mematikan kamera',
      'Menggunakan smartphone',
      'Mengikuti sambil melakukan pekerjaan lain',
      'Berpindah tempat selama sesi',
      'Mengalami koneksi terputus'
    ],
    matrixScales: SYNC_FREQUENCY_LABELS,
    isRequired: true
  }
];
