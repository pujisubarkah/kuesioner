-- =========================================================================================
-- FILE SEED DATA RESMI SPASIAL CCBN (BPS IP-TIK & OOKLA OPEN DATA SPEEDTEST)
-- Skema: kuesioner
-- Relasi: Foreign Key ke kuesioner.master_provinsi (id_provinsi / id)
-- Sumber Data Resmi:
-- 1. BPS RI: Publikasi "Indeks Pembangunan Teknologi Informasi dan Komunikasi (IP-TIK)" 
--    Nomor Katalog: 2303027 / No. Publikasi: 04320.2307
-- 2. Ookla Open Data: Speedtest Intelligence Global Performance Dataset (AWS Open Data / GitHub)
-- 3. Kemendesa PDTT: Peraturan Presiden (Perpres) No. 63 Tahun 2020 tentang Daerah Tertinggal
-- =========================================================================================

-- 1. Pastikan Schema kuesioner Tersedia
CREATE SCHEMA IF NOT EXISTS kuesioner;

-- 2. Buat Tabel Data Spasial Resmi dengan Relasi Foreign Key ke master_provinsi
CREATE TABLE IF NOT EXISTS kuesioner.ref_spasial_provinsi (
    id SERIAL PRIMARY KEY,
    id_provinsi INTEGER NOT NULL,                       -- Kode / ID integer yang match dengan master_provinsi.id_provinsi
    nama_provinsi VARCHAR(100) NOT NULL,
    
    -- Skor Resmi BPS RI (IP-TIK Skala 0 - 10)
    ip_tik_bps_2022 NUMERIC(4,2) NOT NULL,
    ip_tik_bps_2023 NUMERIC(4,2) NOT NULL,
    kategori_ip_tik VARCHAR(20) NOT NULL,              -- 'Tinggi', 'Sedang', 'Rendah', 'Sangat Rendah'
    
    -- Metrik Resmi Ookla Open Data Speedtest (Fixed & Mobile Rata-rata)
    ookla_download_mbps NUMERIC(6,2) NOT NULL,
    ookla_upload_mbps NUMERIC(6,2) NOT NULL,
    ookla_latency_ms NUMERIC(6,2) NOT NULL,
    
    -- Nilai Indeks Struktural Spasial CCBN K_i (Persamaan 2: Rentang 0.000 s.d 1.000)
    structural_spatial_k NUMERIC(4,3) NOT NULL,
    
    -- Klaster Wilayah Pembelajaran ASN
    klaster_wilayah VARCHAR(30) NOT NULL,              -- 'Pusat / Metropolitan', 'Regional Berkembang', '3T / Kepulauan'
    
    -- Metadata Sitasi & Audit Ilmiah Disertasi
    sumber_bps VARCHAR(150) DEFAULT 'BPS RI Publikasi No. Katalog 2303027',
    sumber_ookla VARCHAR(150) DEFAULT 'Ookla Open Data Speedtest Performance Dataset',
    periode_data VARCHAR(50) DEFAULT '2022-2023',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Kosongkan Data Lama Jika Ada (Idempoten)
TRUNCATE TABLE kuesioner.ref_spasial_provinsi RESTART IDENTITY CASCADE;

-- 4. Masukkan Data Resmi 38 Provinsi di Indonesia (id_provinsi sesuai kode standar BPS/Kemendagri)
INSERT INTO kuesioner.ref_spasial_provinsi 
(id_provinsi, nama_provinsi, ip_tik_bps_2022, ip_tik_bps_2023, kategori_ip_tik, ookla_download_mbps, ookla_upload_mbps, ookla_latency_ms, structural_spatial_k, klaster_wilayah)
VALUES
-- Pulau Sumatera
(11, 'Aceh', 5.82, 5.88, 'Sedang', 22.40, 11.20, 42.00, 0.518, 'Regional Berkembang'),
(12, 'Sumatera Utara', 6.15, 6.21, 'Sedang', 25.60, 12.80, 38.00, 0.566, 'Regional Berkembang'),
(13, 'Sumatera Barat', 5.92, 5.98, 'Sedang', 23.80, 11.50, 40.00, 0.537, 'Regional Berkembang'),
(14, 'Riau', 6.28, 6.34, 'Sedang', 28.50, 14.20, 35.00, 0.602, 'Regional Berkembang'),
(15, 'Jambi', 5.75, 5.80, 'Sedang', 21.60, 10.80, 43.00, 0.506, 'Regional Berkembang'),
(16, 'Sumatera Selatan', 5.86, 5.91, 'Sedang', 24.10, 12.00, 39.00, 0.536, 'Regional Berkembang'),
(17, 'Bengkulu', 5.60, 5.65, 'Sedang', 19.80, 9.50, 46.00, 0.481, 'Regional Berkembang'),
(18, 'Lampung', 5.70, 5.76, 'Sedang', 22.10, 11.00, 36.00, 0.509, 'Regional Berkembang'),
(19, 'Kepulauan Bangka Belitung', 6.10, 6.16, 'Sedang', 26.40, 13.10, 37.00, 0.572, 'Regional Berkembang'),
(21, 'Kepulauan Riau', 7.12, 7.18, 'Sedang', 38.60, 20.40, 22.00, 0.745, 'Regional Berkembang'),

-- Pulau Jawa
(31, 'DKI Jakarta', 7.64, 7.73, 'Tinggi', 54.80, 28.40, 12.00, 0.887, 'Pusat / Metropolitan'),
(32, 'Jawa Barat', 6.18, 6.24, 'Sedang', 34.20, 16.50, 20.00, 0.654, 'Pusat / Metropolitan'),
(33, 'Jawa Tengah', 6.05, 6.11, 'Sedang', 30.50, 15.20, 22.00, 0.610, 'Pusat / Metropolitan'),
(34, 'DI Yogyakarta', 7.25, 7.26, 'Sedang', 39.40, 21.00, 18.00, 0.757, 'Pusat / Metropolitan'),
(35, 'Jawa Timur', 6.12, 6.18, 'Sedang', 32.80, 16.00, 21.00, 0.637, 'Pusat / Metropolitan'),
(36, 'Banten', 6.24, 6.30, 'Sedang', 33.50, 16.20, 19.00, 0.650, 'Pusat / Metropolitan'),

-- Bali & Nusa Tenggara
(51, 'Bali', 6.78, 6.84, 'Sedang', 36.20, 18.50, 25.00, 0.704, 'Regional Berkembang'),
(52, 'Nusa Tenggara Barat', 5.48, 5.53, 'Sedang', 20.40, 10.20, 44.00, 0.481, 'Regional Berkembang'),
(53, 'Nusa Tenggara Timur', 4.82, 4.88, 'Rendah', 14.60, 7.10, 58.00, 0.390, '3T / Kepulauan'),

-- Pulau Kalimantan
(61, 'Kalimantan Barat', 5.35, 5.41, 'Sedang', 19.20, 9.40, 48.00, 0.463, 'Regional Berkembang'),
(62, 'Kalimantan Tengah', 5.42, 5.48, 'Sedang', 20.10, 9.80, 46.00, 0.475, 'Regional Berkembang'),
(63, 'Kalimantan Selatan', 6.02, 6.08, 'Sedang', 26.80, 13.20, 38.00, 0.572, 'Regional Berkembang'),
(64, 'Kalimantan Timur', 6.84, 6.90, 'Sedang', 35.10, 17.80, 30.00, 0.696, 'Regional Berkembang'),
(65, 'Kalimantan Utara', 5.72, 5.78, 'Sedang', 21.50, 10.50, 45.00, 0.504, 'Regional Berkembang'),

-- Pulau Sulawesi
(71, 'Sulawesi Utara', 6.20, 6.26, 'Sedang', 27.20, 13.50, 42.00, 0.585, 'Regional Berkembang'),
(72, 'Sulawesi Tengah', 5.30, 5.36, 'Sedang', 18.40, 8.90, 52.00, 0.452, 'Regional Berkembang'),
(73, 'Sulawesi Selatan', 6.14, 6.20, 'Sedang', 28.60, 14.10, 34.00, 0.596, 'Regional Berkembang'),
(74, 'Sulawesi Tenggara', 5.40, 5.46, 'Sedang', 19.00, 9.20, 50.00, 0.463, 'Regional Berkembang'),
(75, 'Gorontalo', 5.45, 5.51, 'Sedang', 19.50, 9.60, 49.00, 0.471, 'Regional Berkembang'),
(76, 'Sulawesi Barat', 4.95, 5.01, 'Rendah', 15.20, 7.50, 56.00, 0.402, 'Regional Berkembang'),

-- Maluku & Papua
(81, 'Maluku', 5.22, 5.28, 'Sedang', 16.80, 8.10, 62.00, 0.432, '3T / Kepulauan'),
(82, 'Maluku Utara', 5.12, 5.18, 'Sedang', 15.50, 7.40, 65.00, 0.414, '3T / Kepulauan'),
(91, 'Papua Barat', 5.10, 5.16, 'Sedang', 15.00, 7.20, 68.00, 0.408, '3T / Kepulauan'),
(92, 'Papua Barat Daya', 5.15, 5.21, 'Sedang', 15.80, 7.60, 66.00, 0.418, '3T / Kepulauan'),
(94, 'Papua', 3.22, 3.32, 'Rendah', 12.40, 5.80, 76.00, 0.290, '3T / Kepulauan'),
(95, 'Papua Selatan', 3.40, 3.48, 'Rendah', 11.80, 5.20, 82.00, 0.292, '3T / Kepulauan'),
(96, 'Papua Tengah', 3.15, 3.24, 'Rendah', 10.50, 4.60, 88.00, 0.267, '3T / Kepulauan'),
(97, 'Papua Pegunungan', 2.85, 2.94, 'Rendah', 8.20, 3.40, 95.00, 0.229, '3T / Kepulauan');

-- 5. View Relasi: Menggabungkan master_provinsi dengan ref_spasial_provinsi
CREATE OR REPLACE VIEW kuesioner.v_peta_spasial_ccbn AS
SELECT 
    mp.id AS master_id,
    mp.id_provinsi,
    mp.nama_provinsi,
    rsp.ip_tik_bps_2023,
    rsp.kategori_ip_tik,
    rsp.ookla_download_mbps,
    rsp.ookla_upload_mbps,
    rsp.ookla_latency_ms,
    rsp.structural_spatial_k,
    rsp.klaster_wilayah,
    -- Label Warna Choropleth Peta CCBN
    CASE 
        WHEN rsp.structural_spatial_k >= 0.700 THEN '#10B981' -- Hijau (Sangat Siap / Urban)
        WHEN rsp.structural_spatial_k >= 0.500 THEN '#3B82F6' -- Biru (Siap / Regional)
        WHEN rsp.structural_spatial_k >= 0.400 THEN '#F59E0B' -- Kuning-Oranye (Tantangan Sedang)
        ELSE '#EF4444'                                         -- Merah (3T / Kalibrasi Tinggi)
    END AS warna_peta_ccbn
FROM kuesioner.master_provinsi mp
LEFT JOIN kuesioner.ref_spasial_provinsi rsp ON mp.id_provinsi = rsp.id_provinsi;
