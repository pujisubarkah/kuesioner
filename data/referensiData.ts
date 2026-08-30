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
  displayName?: string;
  description: string;
  driveFolderId: string;
  driveFolderUrl: string;
  files: ReferensiPdf[];
}

export const referensiCategories: ReferensiFolder[] = [
  {
    "id": "00_faudantion",
    "name": "00_faudantion",
    "displayName": "00. Foundation & Theoretical Framework",
    "description": "Landasan teori utama: Teori Difusi Inovasi, Educational Data Mining, dan Grand Theory Pembelajaran Adaptif ASN.",
    "driveFolderId": "1H5evQ6nxYMKb3psL5vE3nzFZIkfxtXAE",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1H5evQ6nxYMKb3psL5vE3nzFZIkfxtXAE",
    "files": [
      {
        "id": "EL_32_9_08",
        "title": "EL_32_9_08.pdf",
        "driveFileId": "1VHQNMHE4RGrCK7K5avPnK9e0M99XR8_C",
        "previewUrl": "https://drive.google.com/file/d/1VHQNMHE4RGrCK7K5avPnK9e0M99XR8_C/preview",
        "directDriveUrl": "https://drive.google.com/file/d/1VHQNMHE4RGrCK7K5avPnK9e0M99XR8_C/view"
      }
    ]
  },
  {
    "id": "01_RQ1_Behavioral_Traces_Spatial_Gating",
    "name": "01_RQ1_Behavioral_Traces_Spatial_Gating",
    "displayName": "RQ1: Behavioral Traces & Spatial Gating",
    "description": "RQ1: Analisis jejak perilaku belajar sinkron (Zoom) dan asinkron (LMS Moodle) yang termoderasi tipologi wilayah penugasan.",
    "driveFolderId": "1quOH9RTquxueGc7a4sdSpNcpvYS8Rl1z",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1quOH9RTquxueGc7a4sdSpNcpvYS8Rl1z",
    "files": [
      {
        "id": "2025-vol17",
        "title": "2025-volume-17-issue-9--2071-1050-17-9-4082-.pdf",
        "driveFileId": "1o0F0wNB93hzFiBurjyB8Cxeh25v-YkzH",
        "previewUrl": "https://drive.google.com/file/d/1o0F0wNB93hzFiBurjyB8Cxeh25v-YkzH/preview",
        "directDriveUrl": "https://drive.google.com/file/d/1o0F0wNB93hzFiBurjyB8Cxeh25v-YkzH/view"
      },
      {
        "id": "analisis-daerah-tertinggal",
        "title": "Analisis Pengembangan dan Pemanfaatan Teknologi Pembelajaran Berbasis E-Learning di Daerah Tertinggal.pdf",
        "driveFileId": "17MfuOrZrFJCzZS3hTW1QWBaZyu6K70Mn",
        "previewUrl": "https://drive.google.com/file/d/17MfuOrZrFJCzZS3hTW1QWBaZyu6K70Mn/preview",
        "directDriveUrl": "https://drive.google.com/file/d/17MfuOrZrFJCzZS3hTW1QWBaZyu6K70Mn/view"
      },
      {
        "id": "TS04E_agustyarsyah",
        "title": "TS04E_agustyarsyah_mulyadi_et_al_11523.pdf",
        "driveFileId": "1J6rjao2qKBODmGakZD7COmuUyY1sIrN8",
        "previewUrl": "https://drive.google.com/file/d/1J6rjao2qKBODmGakZD7COmuUyY1sIrN8/preview",
        "directDriveUrl": "https://drive.google.com/file/d/1J6rjao2qKBODmGakZD7COmuUyY1sIrN8/view"
      },
      {
        "id": "1..pdf",
        "title": "1..pdf",
        "driveFileId": "1B7id2yHUQvcbAATVtdKCmU04F_hG6Vlp",
        "previewUrl": "https://drive.google.com/file/d/1B7id2yHUQvcbAATVtdKCmU04F_hG6Vlp/preview",
        "directDriveUrl": "https://drive.google.com/file/d/1B7id2yHUQvcbAATVtdKCmU04F_hG6Vlp/view"
      },
      {
        "id": "1571299088_paper",
        "title": "1571299088 paper.pdf",
        "driveFileId": "1BOOAaKoyD1Cthpu4sjpusqX7rHgllLsI",
        "previewUrl": "https://drive.google.com/file/d/1BOOAaKoyD1Cthpu4sjpusqX7rHgllLsI/preview",
        "directDriveUrl": "https://drive.google.com/file/d/1BOOAaKoyD1Cthpu4sjpusqX7rHgllLsI/view"
      },
      {
        "id": "2026220595",
        "title": "2026220595.pdf",
        "driveFileId": "1dljQu4HisUB6y4FRo_Meb3toHQ90T52J",
        "previewUrl": "https://drive.google.com/file/d/1dljQu4HisUB6y4FRo_Meb3toHQ90T52J/preview",
        "directDriveUrl": "https://drive.google.com/file/d/1dljQu4HisUB6y4FRo_Meb3toHQ90T52J/view"
      }
    ]
  },
  {
    "id": "02_RQ2_Infrastructural_Confounding",
    "name": "02_RQ2_Infrastructural_Confounding",
    "displayName": "RQ2: Infrastructural Confounding",
    "description": "RQ2: Membedah efek pengacau (confounding) antara kendala infrastruktur/sinyal 3T vs motivasi belajar sebenarnya.",
    "driveFolderId": "1quOH9RTquxueGc7a4sdSpNcpvYS8Rl1z",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1quOH9RTquxueGc7a4sdSpNcpvYS8Rl1z",
    "files": [
      {
        "id": "2025-vol17",
        "title": "2025-volume-17-issue-9--2071-1050-17-9-4082-.pdf",
        "driveFileId": "1o0F0wNB93hzFiBurjyB8Cxeh25v-YkzH",
        "previewUrl": "https://drive.google.com/file/d/1o0F0wNB93hzFiBurjyB8Cxeh25v-YkzH/preview",
        "directDriveUrl": "https://drive.google.com/file/d/1o0F0wNB93hzFiBurjyB8Cxeh25v-YkzH/view"
      },
      {
        "id": "analisis-daerah-tertinggal",
        "title": "Analisis Pengembangan dan Pemanfaatan Teknologi Pembelajaran Berbasis E-Learning di Daerah Tertinggal.pdf",
        "driveFileId": "17MfuOrZrFJCzZS3hTW1QWBaZyu6K70Mn",
        "previewUrl": "https://drive.google.com/file/d/17MfuOrZrFJCzZS3hTW1QWBaZyu6K70Mn/preview",
        "directDriveUrl": "https://drive.google.com/file/d/17MfuOrZrFJCzZS3hTW1QWBaZyu6K70Mn/view"
      },
      {
        "id": "TS04E_agustyarsyah",
        "title": "TS04E_agustyarsyah_mulyadi_et_al_11523.pdf",
        "driveFileId": "1J6rjao2qKBODmGakZD7COmuUyY1sIrN8",
        "previewUrl": "https://drive.google.com/file/d/1J6rjao2qKBODmGakZD7COmuUyY1sIrN8/preview",
        "directDriveUrl": "https://drive.google.com/file/d/1J6rjao2qKBODmGakZD7COmuUyY1sIrN8/view"
      }
    ]
  },
  {
    "id": "03_RQ3_Missingness_Spatial_Cluster",
    "name": "03_RQ3_Missingness_Spatial_Cluster",
    "displayName": "RQ3: Missingness & Spatial Cluster",
    "description": "RQ3: Penanganan data hilang (missing data), ketidakhadiran kamera, dan analisis jeda inaktivitas per kluster daerah.",
    "driveFolderId": "1N6mVrtfBqKYafBPQrDu4P0K8Jb5lz6yr",
    "driveFolderUrl": "https://drive.google.com/drive/folders/1N6mVrtfBqKYafBPQrDu4P0K8Jb5lz6yr",
    "files": [
      {
        "id": "2026220887",
        "title": "2026220887.pdf",
        "driveFileId": "1VwJOmeYQ3zs4AJFtMJ4vQbZA-3pPupIm",
        "previewUrl": "https://drive.google.com/file/d/1VwJOmeYQ3zs4AJFtMJ4vQbZA-3pPupIm/preview",
        "directDriveUrl": "https://drive.google.com/file/d/1VwJOmeYQ3zs4AJFtMJ4vQbZA-3pPupIm/view"
      },
      {
        "id": "2026221191",
        "title": "2026221191.pdf",
        "driveFileId": "1q1ZPmQ9865aoCUrS-M-iuk7PoSkz8XfO",
        "previewUrl": "https://drive.google.com/file/d/1q1ZPmQ9865aoCUrS-M-iuk7PoSkz8XfO/preview",
        "directDriveUrl": "https://drive.google.com/file/d/1q1ZPmQ9865aoCUrS-M-iuk7PoSkz8XfO/view"
      },
      {
        "id": "2026221539",
        "title": "2026221539.pdf",
        "driveFileId": "1epHlM5cEBd8IdLVWgec8fbRq4ANtPKmC",
        "previewUrl": "https://drive.google.com/file/d/1epHlM5cEBd8IdLVWgec8fbRq4ANtPKmC/preview",
        "directDriveUrl": "https://drive.google.com/file/d/1epHlM5cEBd8IdLVWgec8fbRq4ANtPKmC/view"
      }
    ]
  },
  {
    "id": "04_RQ4_Visual_Observability",
    "name": "04_RQ4_Visual_Observability",
    "displayName": "RQ4: Visual Observability & Telemetry",
    "description": "RQ4: Telemetri observabilitas visual webcam, kamera on/off ratio, mikro-atensi, dan multimodal interaction.",
    "driveFolderId": "16IIomJmDltK0RB5oVPHBnp3sOEIB83Rw",
    "driveFolderUrl": "https://drive.google.com/drive/folders/16IIomJmDltK0RB5oVPHBnp3sOEIB83Rw",
    "files": [
      {
        "id": "PtkNjgZN2M5RkFPqhETvO7NvxMFkZ_z5",
        "title": "Camera On-Off & Nonverbal Behavioral Telemetry.pdf",
        "driveFileId": "1PtkNjgZN2M5RkFPqhETvO7NvxMFkZ_z5",
        "previewUrl": "https://drive.google.com/file/d/1PtkNjgZN2M5RkFPqhETvO7NvxMFkZ_z5/preview",
        "directDriveUrl": "https://drive.google.com/file/d/1PtkNjgZN2M5RkFPqhETvO7NvxMFkZ_z5/view"
      },
      {
        "id": "caLXbrAQqfnBrV7LfI34DQb42OAhZlcP",
        "title": "Multimodal Video Analytics & Head Pose Tracking.pdf",
        "driveFileId": "1caLXbrAQqfnBrV7LfI34DQb42OAhZlcP",
        "previewUrl": "https://drive.google.com/file/d/1caLXbrAQqfnBrV7LfI34DQb42OAhZlcP/preview",
        "directDriveUrl": "https://drive.google.com/file/d/1caLXbrAQqfnBrV7LfI34DQb42OAhZlcP/view"
      },
      {
        "id": "oI6vYEeoklKTEefqufD9AuhPrfhX0uad",
        "title": "Facial Expression Recognition in Synchronous Learning.pdf",
        "driveFileId": "1oI6vYEeoklKTEefqufD9AuhPrfhX0uad",
        "previewUrl": "https://drive.google.com/file/d/1oI6vYEeoklKTEefqufD9AuhPrfhX0uad/preview",
        "directDriveUrl": "https://drive.google.com/file/d/1oI6vYEeoklKTEefqufD9AuhPrfhX0uad/view"
      },
      {
        "id": "techrxiv_175416075",
        "title": "techrxiv.175416075.52956738_v1.pdf",
        "driveFileId": "1iHSss5C8IdOKRF8-r3lgvmvp6DqMauu9",
        "previewUrl": "https://drive.google.com/file/d/1iHSss5C8IdOKRF8-r3lgvmvp6DqMauu9/preview",
        "directDriveUrl": "https://drive.google.com/file/d/1iHSss5C8IdOKRF8-r3lgvmvp6DqMauu9/view"
      }
    ]
  },
  {
    "id": "05_RQ5_User_Acceptance_Fair_XAI",
    "name": "05_RQ5_User_Acceptance_Fair_XAI",
    "displayName": "RQ5: User Acceptance & Fair XAI",
    "description": "RQ5: Penerimaan aparatur birokrasi terhadap evaluasi berbasis AI berkeadilan (CCBN), transparansi, dan dampak IPP.",
    "driveFolderId": "19uBSMBj3BGAyxFWEBV5Hjs4Dvu8fPaTe",
    "driveFolderUrl": "https://drive.google.com/drive/folders/19uBSMBj3BGAyxFWEBV5Hjs4Dvu8fPaTe",
    "files": [
      {
        "id": "13597-51198-1-PB",
        "title": "13597-51198-1-PB.pdf",
        "driveFileId": "1m6jyCUNn1gkffgj5rheWheLzbvGgfd5c",
        "previewUrl": "https://drive.google.com/file/d/1m6jyCUNn1gkffgj5rheWheLzbvGgfd5c/preview",
        "directDriveUrl": "https://drive.google.com/file/d/1m6jyCUNn1gkffgj5rheWheLzbvGgfd5c/view"
      },
      {
        "id": "25453-Article",
        "title": "25453-Article Text-69469-75906-10-20221005.pdf",
        "driveFileId": "1D0ldjxW_sXrgUpcv0-AQA3QF0nMmf9_t",
        "previewUrl": "https://drive.google.com/file/d/1D0ldjxW_sXrgUpcv0-AQA3QF0nMmf9_t/preview",
        "directDriveUrl": "https://drive.google.com/file/d/1D0ldjxW_sXrgUpcv0-AQA3QF0nMmf9_t/view"
      },
      {
        "id": "Analisis_Penilaian_Kinerja",
        "title": "Analisis Penilaian Kinerja Karyawan Menggunakan Metode 360 Degree Feedback Pada Dinas Sosial.pdf",
        "driveFileId": "1VixuV4LFPPnA4t2Q0miXxeIf4oQT6eov",
        "previewUrl": "https://drive.google.com/file/d/1VixuV4LFPPnA4t2Q0miXxeIf4oQT6eov/preview",
        "directDriveUrl": "https://drive.google.com/file/d/1VixuV4LFPPnA4t2Q0miXxeIf4oQT6eov/view"
      },
      {
        "id": "7539-Article",
        "title": "7539-Article Text-33071-1-10-20250608.pdf",
        "driveFileId": "1eo6C1R5drQu8d-P8epQDsXFBeqQ28iB0",
        "previewUrl": "https://drive.google.com/file/d/1eo6C1R5drQu8d-P8epQDsXFBeqQ28iB0/preview",
        "directDriveUrl": "https://drive.google.com/file/d/1eo6C1R5drQu8d-P8epQDsXFBeqQ28iB0/view"
      }
    ]
  }
];
