export interface ReferensiPdf {
  id: string;
  title: string;
  driveFileId: string;
  previewUrl: string;
  directDriveUrl: string;
}

export interface ReferensiFolder {
  id: string;
  name: string;
  description: string;
  driveFolderId: string;
  driveFolderUrl: string;
  files: ReferensiPdf[];
}

export const referensiCategories: ReferensiFolder[] = [
  {
    id: 'adaptive-learning',
    name: 'Adaptive Learning & Rekomendasi',
    description: 'Penelitian terkait sistem pembelajaran adaptif, personalisasi e-learning, dan algoritma rekomendasi.',
    driveFolderId: '1H5evQ6nxYMKb3psL5vE3nzFZIkfxtXAE',
    driveFolderUrl: 'https://drive.google.com/drive/folders/1H5evQ6nxYMKb3psL5vE3nzFZIkfxtXAE',
    files: [
      {
        id: 'EL_32_9_08',
        title: 'EL_32_9_08.pdf',
        driveFileId: '1VHQNMHE4RGrCK7K5avPnK9e0M99XR8_C',
        previewUrl: 'https://drive.google.com/file/d/1VHQNMHE4RGrCK7K5avPnK9e0M99XR8_C/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1VHQNMHE4RGrCK7K5avPnK9e0M99XR8_C/view'
      }
    ]
  },
  {
    id: 'konteks-spasial',
    name: 'Konteks Spasial & Infrastruktur',
    description: 'Studi infrastruktur digital, kendala daerah 3T/tertinggal, serta variasi spasial pelatihan kedinasan.',
    driveFolderId: '1quOH9RTquxueGc7a4sdSpNcpvYS8Rl1z',
    driveFolderUrl: 'https://drive.google.com/drive/folders/1quOH9RTquxueGc7a4sdSpNcpvYS8Rl1z',
    files: [
      {
        id: '2025-vol17',
        title: '2025-volume-17-issue-9--2071-1050-17-9-4082-.pdf',
        driveFileId: '1o0F0wNB93hzFiBurjyB8Cxeh25v-YkzH',
        previewUrl: 'https://drive.google.com/file/d/1o0F0wNB93hzFiBurjyB8Cxeh25v-YkzH/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1o0F0wNB93hzFiBurjyB8Cxeh25v-YkzH/view'
      },
      {
        id: 'analisis-daerah-tertinggal',
        title: 'Analisis Pengembangan dan Pemanfaatan Teknologi Pembelajaran Berbasis E-Learning di Daerah Tertinggal.pdf',
        driveFileId: '17MfuOrZrFJCzZS3hTW1QWBaZyu6K70Mn',
        previewUrl: 'https://drive.google.com/file/d/17MfuOrZrFJCzZS3hTW1QWBaZyu6K70Mn/preview',
        directDriveUrl: 'https://drive.google.com/file/d/17MfuOrZrFJCzZS3hTW1QWBaZyu6K70Mn/view'
      },
      {
        id: 'TS04E_agustyarsyah',
        title: 'TS04E_agustyarsyah_mulyadi_et_al_11523.pdf',
        driveFileId: '1J6rjao2qKBODmGakZD7COmuUyY1sIrN8',
        previewUrl: 'https://drive.google.com/file/d/1J6rjao2qKBODmGakZD7COmuUyY1sIrN8/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1J6rjao2qKBODmGakZD7COmuUyY1sIrN8/view'
      }
    ]
  },
  {
    id: 'learning-analytics',
    name: 'Learning Analytics & Missingness',
    description: 'Analisis data aktivitas pembelajaran, penanganan missing values, dan perilaku inaktivitas.',
    driveFolderId: '1N6mVrtfBqKYafBPQrDu4P0K8Jb5lz6yr',
    driveFolderUrl: 'https://drive.google.com/drive/folders/1N6mVrtfBqKYafBPQrDu4P0K8Jb5lz6yr',
    files: [
      {
        id: '1..pdf',
        title: '1..pdf',
        driveFileId: '1B7id2yHUQvcbAATVtdKCmU04F_hG6Vlp',
        previewUrl: 'https://drive.google.com/file/d/1B7id2yHUQvcbAATVtdKCmU04F_hG6Vlp/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1B7id2yHUQvcbAATVtdKCmU04F_hG6Vlp/view'
      },
      {
        id: '1571299088_paper',
        title: '1571299088 paper.pdf',
        driveFileId: '1BOOAaKoyD1Cthpu4sjpusqX7rHgllLsI',
        previewUrl: 'https://drive.google.com/file/d/1BOOAaKoyD1Cthpu4sjpusqX7rHgllLsI/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1BOOAaKoyD1Cthpu4sjpusqX7rHgllLsI/view'
      },
      {
        id: '2026220595',
        title: '2026220595.pdf',
        driveFileId: '1dljQu4HisUB6y4FRo_Meb3toHQ90T52J',
        previewUrl: 'https://drive.google.com/file/d/1dljQu4HisUB6y4FRo_Meb3toHQ90T52J/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1dljQu4HisUB6y4FRo_Meb3toHQ90T52J/view'
      },
      {
        id: '2026220887',
        title: '2026220887.pdf',
        driveFileId: '1VwJOmeYQ3zs4AJFtMJ4vQbZA-3pPupIm',
        previewUrl: 'https://drive.google.com/file/d/1VwJOmeYQ3zs4AJFtMJ4vQbZA-3pPupIm/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1VwJOmeYQ3zs4AJFtMJ4vQbZA-3pPupIm/view'
      },
      {
        id: 'elearning_komplemen',
        title: 'E-Learning Sebagai Komplemen dalam Pembelajaran.pdf',
        driveFileId: '1q1ZPmQ9865aoCUrS-M-iuk7PoSkz8XfO',
        previewUrl: 'https://drive.google.com/file/d/1q1ZPmQ9865aoCUrS-M-iuk7PoSkz8XfO/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1q1ZPmQ9865aoCUrS-M-iuk7PoSkz8XfO/view'
      },
      {
        id: 'safrida',
        title: 'safrida.pdf',
        driveFileId: '1epHlM5cEBd8IdLVWgec8fbRq4ANtPKmC',
        previewUrl: 'https://drive.google.com/file/d/1epHlM5cEBd8IdLVWgec8fbRq4ANtPKmC/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1epHlM5cEBd8IdLVWgec8fbRq4ANtPKmC/view'
      }
    ]
  },
  {
    id: 'multimodal-vision',
    name: 'Multimodal & Computer Vision',
    description: 'Riset keterlibatan (engagement), pengenalan gestur/ekspresi, serta analisis multimodal sesi pembelajaran.',
    driveFolderId: '16IIomJmDltK0RB5oVPHBnp3sOEIB83Rw',
    driveFolderUrl: 'https://drive.google.com/drive/folders/16IIomJmDltK0RB5oVPHBnp3sOEIB83Rw',
    files: [
      {
        id: '1-s2.0-S0016003226000773',
        title: '1-s2.0-S0016003226000773-main.pdf',
        driveFileId: '1PtkNjgZN2M5RkFPqhETvO7NvxMFkZ_z5',
        previewUrl: 'https://drive.google.com/file/d/1PtkNjgZN2M5RkFPqhETvO7NvxMFkZ_z5/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1PtkNjgZN2M5RkFPqhETvO7NvxMFkZ_z5/view'
      },
      {
        id: '1-s2.0-S0957417425018585-toward',
        title: '1-s2.0-S0957417425018585-main (toward_data).pdf',
        driveFileId: '1caLXbrAQqfnBrV7LfI34DQb42OAhZlcP',
        previewUrl: 'https://drive.google.com/file/d/1caLXbrAQqfnBrV7LfI34DQb42OAhZlcP/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1caLXbrAQqfnBrV7LfI34DQb42OAhZlcP/view'
      },
      {
        id: '1-s2.0-S0957417425018585-main',
        title: '1-s2.0-S0957417425018585-main.pdf',
        driveFileId: '1oI6vYEeoklKTEefqufD9AuhPrfhX0uad',
        previewUrl: 'https://drive.google.com/file/d/1oI6vYEeoklKTEefqufD9AuhPrfhX0uad/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1oI6vYEeoklKTEefqufD9AuhPrfhX0uad/view'
      },
      {
        id: '13_pdf',
        title: '13.pdf',
        driveFileId: '1yjv1vHw4GTU9sXDp4XUi2inlZpfNj_2g',
        previewUrl: 'https://drive.google.com/file/d/1yjv1vHw4GTU9sXDp4XUi2inlZpfNj_2g/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1yjv1vHw4GTU9sXDp4XUi2inlZpfNj_2g/view'
      },
      {
        id: '2002.05242v2',
        title: '2002.05242v2.pdf',
        driveFileId: '1KO_ahsQK_04UBetZIuBUZjG6j0Ql0Ke2',
        previewUrl: 'https://drive.google.com/file/d/1KO_ahsQK_04UBetZIuBUZjG6j0Ql0Ke2/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1KO_ahsQK_04UBetZIuBUZjG6j0Ql0Ke2/view'
      },
      {
        id: '2403.17175v2',
        title: '2403.17175v2.pdf',
        driveFileId: '1iViYoaYVCocKaVxXnSbbArvSYxhpMuvd',
        previewUrl: 'https://drive.google.com/file/d/1iViYoaYVCocKaVxXnSbbArvSYxhpMuvd/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1iViYoaYVCocKaVxXnSbbArvSYxhpMuvd/view'
      },
      {
        id: '2502.20209v2',
        title: '2502.20209v2.pdf',
        driveFileId: '1KY0uWT-izY37jvI32AUbEKarC5dq9iVf',
        previewUrl: 'https://drive.google.com/file/d/1KY0uWT-izY37jvI32AUbEKarC5dq9iVf/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1KY0uWT-izY37jvI32AUbEKarC5dq9iVf/view'
      },
      {
        id: 'DeepLearning',
        title: 'DeepLearning.pdf',
        driveFileId: '1w1eAbGr-L1e0cDifSSuTx7hFP4zyJbqZ',
        previewUrl: 'https://drive.google.com/file/d/1w1eAbGr-L1e0cDifSSuTx7hFP4zyJbqZ/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1w1eAbGr-L1e0cDifSSuTx7hFP4zyJbqZ/view'
      },
      {
        id: 'Emotion_Detection',
        title: 'Emotion Detection and Student Engagement in Distance Learning.pdf',
        driveFileId: '1L8eJhrMYb3O1dp1WUBu86GuY-cfvEE18',
        previewUrl: 'https://drive.google.com/file/d/1L8eJhrMYb3O1dp1WUBu86GuY-cfvEE18/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1L8eJhrMYb3O1dp1WUBu86GuY-cfvEE18/view'
      },
      {
        id: 'ETASR_13816',
        title: 'ETASR_13816.pdf',
        driveFileId: '1S6HCHfngp9Q_mDXpGDBBoHEfxDjcAe6F',
        previewUrl: 'https://drive.google.com/file/d/1S6HCHfngp9Q_mDXpGDBBoHEfxDjcAe6F/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1S6HCHfngp9Q_mDXpGDBBoHEfxDjcAe6F/view'
      },
      {
        id: 'ID9859CE',
        title: 'ID 9859 CE.pdf',
        driveFileId: '1L4-ZmvF5Cz9ieNxqpt8xAf91n5_jwQ2g',
        previewUrl: 'https://drive.google.com/file/d/1L4-ZmvF5Cz9ieNxqpt8xAf91n5_jwQ2g/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1L4-ZmvF5Cz9ieNxqpt8xAf91n5_jwQ2g/view'
      },
      {
        id: 'IJARCCE',
        title: 'IJARCCE.2026.15410-real.pdf',
        driveFileId: '1aNW1ylzxc0W5KV2AhmYPtHes6bnpFXzY',
        previewUrl: 'https://drive.google.com/file/d/1aNW1ylzxc0W5KV2AhmYPtHes6bnpFXzY/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1aNW1ylzxc0W5KV2AhmYPtHes6bnpFXzY/view'
      },
      {
        id: 'IJRTI2603168',
        title: 'IJRTI2603168.pdf',
        driveFileId: '1pCY2iqEDbykSgTyXblpkGSvb46bauVVk',
        previewUrl: 'https://drive.google.com/file/d/1pCY2iqEDbykSgTyXblpkGSvb46bauVVk/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1pCY2iqEDbykSgTyXblpkGSvb46bauVVk/view'
      },
      {
        id: 'imrj.2001.31',
        title: 'imrj.2001.31.pdf',
        driveFileId: '1T0t55xX3DME3h01IZbrLi8WUokVdOOQS',
        previewUrl: 'https://drive.google.com/file/d/1T0t55xX3DME3h01IZbrLi8WUokVdOOQS/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1T0t55xX3DME3h01IZbrLi8WUokVdOOQS/view'
      },
      {
        id: 'jurnal_1',
        title: 'jurnal_1.pdf',
        driveFileId: '1Z16Rc6RkccVVwiML5RvtMWCoY-Zh5ufq',
        previewUrl: 'https://drive.google.com/file/d/1Z16Rc6RkccVVwiML5RvtMWCoY-Zh5ufq/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1Z16Rc6RkccVVwiML5RvtMWCoY-Zh5ufq/view'
      },
      {
        id: 'KidoVision',
        title: 'KidoVision A Review on Computer Vision-Based Interactive E-Learning Platforms.pdf',
        driveFileId: '1KqifFhLXdxsEt5qtY1e-BeO0DF5bC109',
        previewUrl: 'https://drive.google.com/file/d/1KqifFhLXdxsEt5qtY1e-BeO0DF5bC109/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1KqifFhLXdxsEt5qtY1e-BeO0DF5bC109/view'
      },
      {
        id: 'mti-10-00008',
        title: 'mti-10-00008.pdf',
        driveFileId: '12M2l6J_g4ITLSYJ16PzNw7Wlz_temdJf',
        previewUrl: 'https://drive.google.com/file/d/12M2l6J_g4ITLSYJ16PzNw7Wlz_temdJf/preview',
        directDriveUrl: 'https://drive.google.com/file/d/12M2l6J_g4ITLSYJ16PzNw7Wlz_temdJf/view'
      },
      {
        id: 'paper_multimodal',
        title: 'paper.pdf',
        driveFileId: '14re_2u0zm2cit6ox-2b00I92axSLszZl',
        previewUrl: 'https://drive.google.com/file/d/14re_2u0zm2cit6ox-2b00I92axSLszZl/preview',
        directDriveUrl: 'https://drive.google.com/file/d/14re_2u0zm2cit6ox-2b00I92axSLszZl/view'
      },
      {
        id: 's00521-025-11317-z',
        title: 's00521-025-11317-z.pdf',
        driveFileId: '1KI9OI1sdPBVGv7jd5qsvRRu3wSds1_Ne',
        previewUrl: 'https://drive.google.com/file/d/1KI9OI1sdPBVGv7jd5qsvRRu3wSds1_Ne/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1KI9OI1sdPBVGv7jd5qsvRRu3wSds1_Ne/view'
      },
      {
        id: 's41598-025-15486-8',
        title: 's41598-025-15486-8.pdf',
        driveFileId: '18pBC4Xn_vn150lhgbbqr85IiDnRGVTGb',
        previewUrl: 'https://drive.google.com/file/d/18pBC4Xn_vn150lhgbbqr85IiDnRGVTGb/preview',
        directDriveUrl: 'https://drive.google.com/file/d/18pBC4Xn_vn150lhgbbqr85IiDnRGVTGb/view'
      },
      {
        id: 's41598-026-52123-4_reference',
        title: 's41598-026-52123-4_reference.pdf',
        driveFileId: '10XKjOevdxOkeH_MMWiBvpa0ybzUjna7r',
        previewUrl: 'https://drive.google.com/file/d/10XKjOevdxOkeH_MMWiBvpa0ybzUjna7r/preview',
        directDriveUrl: 'https://drive.google.com/file/d/10XKjOevdxOkeH_MMWiBvpa0ybzUjna7r/view'
      },
      {
        id: 'Student_Engagement_EEG',
        title: 'Student Engagement Recognition Comprehensive Analysis Through EEG.pdf',
        driveFileId: '1Bvw_qCmgRPVR-64YzExZYV1hxzIYmPdU',
        previewUrl: 'https://drive.google.com/file/d/1Bvw_qCmgRPVR-64YzExZYV1hxzIYmPdU/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1Bvw_qCmgRPVR-64YzExZYV1hxzIYmPdU/view'
      },
      {
        id: 'Students_Engagement_Detection_SLR',
        title: 'Students Engagement Detection Based on Computer Vision A Systematic Literature Review.pdf',
        driveFileId: '1op2p9XAvuPYDsNY9-Jm9baO5UCJ0a6LB',
        previewUrl: 'https://drive.google.com/file/d/1op2p9XAvuPYDsNY9-Jm9baO5UCJ0a6LB/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1op2p9XAvuPYDsNY9-Jm9baO5UCJ0a6LB/view'
      },
      {
        id: 'Tampilan_Klasifikasi_Emosi',
        title: 'Tampilan Klasifikasi Emosi Pada Raut Wajah Pelajar Menggunakan Ekstraktor Fitur Face Mesh.pdf',
        driveFileId: '1YxyWAi5oE2uoh2LaqJpc2Yz_3B-RRo_J',
        previewUrl: 'https://drive.google.com/file/d/1YxyWAi5oE2uoh2LaqJpc2Yz_3B-RRo_J/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1YxyWAi5oE2uoh2LaqJpc2Yz_3B-RRo_J/view'
      },
      {
        id: 'techrxiv_175416075',
        title: 'techrxiv.175416075.52956738_v1.pdf',
        driveFileId: '1iHSss5C8IdOKRF8-r3lgvmvp6DqMauu9',
        previewUrl: 'https://drive.google.com/file/d/1iHSss5C8IdOKRF8-r3lgvmvp6DqMauu9/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1iHSss5C8IdOKRF8-r3lgvmvp6DqMauu9/view'
      }
    ]
  },
  {
    id: 'pelatihan-asn',
    name: 'Pelatihan ASN & Dinamika Publik',
    description: 'Literatur kebijakan kedinasan, pengembangan kompetensi ASN, kinerja, dan kepuasan publik.',
    driveFolderId: '19uBSMBj3BGAyxFWEBV5Hjs4Dvu8fPaTe',
    driveFolderUrl: 'https://drive.google.com/drive/folders/19uBSMBj3BGAyxFWEBV5Hjs4Dvu8fPaTe',
    files: [
      {
        id: '13597-51198-1-PB',
        title: '13597-51198-1-PB.pdf',
        driveFileId: '1m6jyCUNn1gkffgj5rheWheLzbvGgfd5c',
        previewUrl: 'https://drive.google.com/file/d/1m6jyCUNn1gkffgj5rheWheLzbvGgfd5c/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1m6jyCUNn1gkffgj5rheWheLzbvGgfd5c/view'
      },
      {
        id: '25453-Article',
        title: '25453-Article Text-69469-75906-10-20221005.pdf',
        driveFileId: '1D0ldjxW_sXrgUpcv0-AQA3QF0nMmf9_t',
        previewUrl: 'https://drive.google.com/file/d/1D0ldjxW_sXrgUpcv0-AQA3QF0nMmf9_t/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1D0ldjxW_sXrgUpcv0-AQA3QF0nMmf9_t/view'
      },
      {
        id: 'Analisis_Penilaian_Kinerja',
        title: 'Analisis Penilaian Kinerja Karyawan Menggunakan Metode 360 Degree Feedback Pada Dinas Sosial DKI Jakarta.pdf',
        driveFileId: '1VixuV4LFPPnA4t2Q0miXxeIf4oQT6eov',
        previewUrl: 'https://drive.google.com/file/d/1VixuV4LFPPnA4t2Q0miXxeIf4oQT6eov/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1VixuV4LFPPnA4t2Q0miXxeIf4oQT6eov/view'
      },
      {
        id: '7539-Article',
        title: '7539-Article Text-33071-1-10-20250608.pdf',
        driveFileId: '1eo6C1R5drQu8d-P8epQDsXFBeqQ28iB0',
        previewUrl: 'https://drive.google.com/file/d/1eo6C1R5drQu8d-P8epQDsXFBeqQ28iB0/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1eo6C1R5drQu8d-P8epQDsXFBeqQ28iB0/view'
      },
      {
        id: 'admin_journal_manager',
        title: 'admin, Journal manager, 6 artikel abdi.pdf',
        driveFileId: '1WbCZHW6vqHcx3sKeNXbZYreTPkTE5wQf',
        previewUrl: 'https://drive.google.com/file/d/1WbCZHW6vqHcx3sKeNXbZYreTPkTE5wQf/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1WbCZHW6vqHcx3sKeNXbZYreTPkTE5wQf/view'
      },
      {
        id: 'ednan_3_cendekia',
        title: 'ednan, 3 Cendekia Niaga Ratri Nur Rohmah Final Rev.pdf',
        driveFileId: '14ZdMs2IShO4URtjyFvt7j_HBxNWHTo3i',
        previewUrl: 'https://drive.google.com/file/d/14ZdMs2IShO4URtjyFvt7j_HBxNWHTo3i/preview',
        directDriveUrl: 'https://drive.google.com/file/d/14ZdMs2IShO4URtjyFvt7j_HBxNWHTo3i/view'
      },
      {
        id: 'Prosiding_Inspirasi',
        title: 'Prosiding Inspirasi.pdf',
        driveFileId: '1PKNLxsZUfB-uqZO-rdbmwY0QbjzBPSU9',
        previewUrl: 'https://drive.google.com/file/d/1PKNLxsZUfB-uqZO-rdbmwY0QbjzBPSU9/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1PKNLxsZUfB-uqZO-rdbmwY0QbjzBPSU9/view'
      },
      {
        id: 'View_of_The_Influence',
        title: 'The Influence of Video Marketing and Digital Storytelling on Perceived Increase in Consumer Purchase Intention.pdf',
        driveFileId: '1FxUDLRXT2cK0nkMTQNZQYkjoQgxaWW8Y',
        previewUrl: 'https://drive.google.com/file/d/1FxUDLRXT2cK0nkMTQNZQYkjoQgxaWW8Y/preview',
        directDriveUrl: 'https://drive.google.com/file/d/1FxUDLRXT2cK0nkMTQNZQYkjoQgxaWW8Y/view'
      }
    ]
  }
];
