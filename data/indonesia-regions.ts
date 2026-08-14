export interface Province {
  id: string;
  name: string;
  regencies: string[];
}

export const INDONESIA_PROVINCES: Province[] = [
  {
    id: "ACEH",
    name: "Aceh",
    regencies: ["Banda Aceh", "Sabang", "Lhokseumawe", "Langsa", "Subulussalam", "Aceh Besar", "Aceh Selatan", "Aceh Utara", "Aceh Timur", "Aceh Tengah", "Aceh Barat", "Aceh Singkil", "Bener Meriah", "Pidie", "Simeulue"]
  },
  {
    id: "SUMUT",
    name: "Sumatera Utara",
    regencies: ["Medan", "Pematangsiantar", "Sibolga", "Tanjungbalai", "Tebing Tinggi", "Binjai", "Padangsidimpuan", "Gunungsitoli", "Deli Serdang", "Karo", "Langkat", "Nias", "Simalungun", "Toba"]
  },
  {
    id: "SUMBAR",
    name: "Sumatera Barat",
    regencies: ["Padang", "Bukittinggi", "Payakumbuh", "Solok", "Padang Panjang", "Sawahlunto", "Pariaman", "Agam", "Pasaman", "Pesisir Selatan", "Tanah Datar", "Kepulauan Mentawai"]
  },
  {
    id: "RIAU",
    name: "Riau",
    regencies: ["Pekanbaru", "Dumai", "Bengkalis", "Indragiri Hilir", "Indragiri Hulu", "Kampar", "Kuantan Singingi", "Pelalawan", "Rokan Hilir", "Rokan Hulu", "Siak", "Kepulauan Meranti"]
  },
  {
    id: "KEPRI",
    name: "Kepulauan Riau",
    regencies: ["Tanjungpinang", "Batam", "Bintan", "Karimun", "Kepulauan Anambas", "Lingga", "Natuna"]
  },
  {
    id: "JAMBI",
    name: "Jambi",
    regencies: ["Jambi", "Sungai Penuh", "Batanghari", "Bungo", "Kerinci", "Merangin", "Muaro Jambi", "Sarolangun", "Tanjung Jabung Barat", "Tanjung Jabung Timur", "Tebo"]
  },
  {
    id: "SUMSEL",
    name: "Sumatera Selatan",
    regencies: ["Palembang", "Prabumulih", "Pagar Alam", "Lubuklinggau", "Banyuasin", "Empat Lawang", "Lahat", "Muara Enim", "Musi Banyuasin", "Musi Rawas", "Ogan Ilir", "Ogan Komering Ilir", "Ogan Komering Ulu"]
  },
  {
    id: "BABEL",
    name: "Kepulauan Bangka Belitung",
    regencies: ["Pangkalpinang", "Bangka", "Bangka Barat", "Bangka Selatan", "Bangka Tengah", "Belitung", "Belitung Timur"]
  },
  {
    id: "BENGKULU",
    name: "Bengkulu",
    regencies: ["Bengkulu", "Bengkulu Selatan", "Bengkulu Tengah", "Bengkulu Utara", "Kaur", "Kepahiang", "Lebong", "Mukomuko", "Rejang Lebong", "Seluma"]
  },
  {
    id: "LAMPUNG",
    name: "Lampung",
    regencies: ["Bandar Lampung", "Metro", "Lampung Barat", "Lampung Selatan", "Lampung Tengah", "Lampung Timur", "Lampung Utara", "Mesuji", "Pesawaran", "Pringsewu", "Tanggamus", "Tulang Bawang", "Way Kanan"]
  },
  {
    id: "DKI",
    name: "DKI Jakarta",
    regencies: ["Jakarta Pusat", "Jakarta Utara", "Jakarta Barat", "Jakarta Selatan", "Jakarta Timur", "Kepulauan Seribu"]
  },
  {
    id: "JABAR",
    name: "Jawa Barat",
    regencies: ["Bandung", "Bekasi", "Bogor", "Cimahi", "Cirebon", "Depok", "Sukabumi", "Tasikmalaya", "Banjar", "Bandung Barat", "Ciamis", "Cianjur", "Garut", "Indramayu", "Karawang", "Kuningan", "Majalengka", "Pangandaran", "Purwakarta", "Subang", "Sumedang"]
  },
  {
    id: "JATENG",
    name: "Jawa Tengah",
    regencies: ["Semarang", "Surakarta (Solo)", "Magelang", "Pekalongan", "Salatiga", "Tegal", "Banjarnegara", "Banyumas", "Batang", "Blora", "Boyolali", "Brebes", "Cilacap", "Demak", "Grobogan", "Jepara", "Karanganyar", "Kebumen", "Kendal", "Klaten", "Kudus", "Pati", "Purbalingga", "Purworejo", "Rembang", "Sragen", "Sukoharjo", "Wonogiri", "Wonosobo"]
  },
  {
    id: "DIY",
    name: "DI Yogyakarta",
    regencies: ["Yogyakarta", "Bantul", "Gunungkidul", "Kulon Progo", "Sleman"]
  },
  {
    id: "JATIM",
    name: "Jawa Timur",
    regencies: ["Surabaya", "Malang", "Batu", "Blitar", "Kediri", "Madiun", "Mojokerto", "Pasuruan", "Probolinggo", "Banyuwangi", "Bojonegoro", "Bondowoso", "Gresik", "Jember", "Jombang", "Lamongan", "Lumajang", "Magetan", "Nganjuk", "Ngawi", "Pacitan", "Pamekasan", "Pasuruan", "Ponorogo", "Sampang", "Sidoarjo", "Situbondo", "Sumenep", "Trenggalek", "Tuban", "Tulungagung"]
  },
  {
    id: "BANTEN",
    name: "Banten",
    regencies: ["Serang", "Tangerang", "Cilegon", "Tangerang Selatan", "Lebak", "Pandeglang"]
  },
  {
    id: "BALI",
    name: "Bali",
    regencies: ["Denpasar", "Badung", "Bangli", "Buleleng", "Gianyar", "Jembrana", "Karangasem", "Klungkung", "Tabanan"]
  },
  {
    id: "NTB",
    name: "Nusa Tenggara Barat",
    regencies: ["Mataram", "Bima", "Dompu", "Lombok Barat", "Lombok Tengah", "Lombok Timur", "Lombok Utara", "Sumbawa", "Sumbawa Barat"]
  },
  {
    id: "NTT",
    name: "Nusa Tenggara Timur",
    regencies: ["Kupang", "Alor", "Belu", "Ende", "Flores Timur", "Kupang", "Lembata", "Manggarai", "Manggarai Barat", "Manggarai Timur", "Nagekeo", "Rote Ndao", "Sikka", "Sumba Barat", "Sumba Timur", "Timor Tengah Selatan", "Timor Tengah Utara"]
  },
  {
    id: "KALBAR",
    name: "Kalimantan Barat",
    regencies: ["Pontianak", "Singkawang", "Bengkayang", "Kapuas Hulu", "Kayong Utara", "Ketapang", "Kubu Raya", "Lapak", "Melawi", "Mempawah", "Sambas", "Sintang"]
  },
  {
    id: "KALTENG",
    name: "Kalimantan Tengah",
    regencies: ["Palangka Raya", "Barito Selatan", "Barito Timur", "Barito Utara", "Gunung Mas", "Kapuas", "Katingan", "Kotawaringin Barat", "Kotawaringin Timur", "Lamandau", "Murung Raya", "Pulang Pisau", "Sukamara", "Seruyan"]
  },
  {
    id: "KALSEL",
    name: "Kalimantan Selatan",
    regencies: ["Banjarmasin", "Banjarbaru", "Balangan", "Banjar", "Barito Kuala", "Hulu Sungai Selatan", "Hulu Sungai Tengah", "Hulu Sungai Utara", "Kotabaru", "Tabalong", "Tanah Bumbu", "Tanah Laut", "Tapin"]
  },
  {
    id: "KALTIM",
    name: "Kalimantan Timur",
    regencies: ["Samarinda", "Balikpapan", "Bontang", "Berau", "Kutai Barat", "Kutai Kartanegara", "Kutai Timur", "Mahakam Ulu", "Paser", "Penajam Paser Utara"]
  },
  {
    id: "KALTARA",
    name: "Kalimantan Utara",
    regencies: ["Tarakan", "Bulungan", "Malinau", "Nunukan", "Tana Tidung"]
  },
  {
    id: "SULUT",
    name: "Sulawesi Utara",
    regencies: ["Manado", "Bitung", "Tomohon", "Kotamobagu", "Bolaang Mongondow", "Kepulauan Sangihe", "Kepulauan Talaud", "Minahasa", "Minahasa Selatan", "Minahasa Tenggara", "Minahasa Utara"]
  },
  {
    id: "SULTENG",
    name: "Sulawesi Tengah",
    regencies: ["Palu", "Banggai", "Banggai Kepulauan", "Banggai Laut", "Buol", "Donggala", "Morowali", "Morowali Utara", "Parigi Moutong", "Poso", "Sigi", "Tojo Una-Una", "Toli-Toli"]
  },
  {
    id: "SULSEL",
    name: "Sulawesi Selatan",
    regencies: ["Makassar", "Palopo", "Parepare", "Bantaeng", "Barru", "Bone", "Bulukumba", "Enrekang", "Gowa", "Jeneponto", "Kepulauan Selayar", "Luwu", "Luwu Timur", "Luwu Utara", "Maros", "Pangkajene dan Kepulauan", "Pinrang", "Sidenreng Rappang", "Sinjai", "Soppeng", "Takalar", "Tana Toraja", "Toraja Utara", "Wajo"]
  },
  {
    id: "SULTRA",
    name: "Sulawesi Tenggara",
    regencies: ["Kendari", "Baubau", "Bombana", "Buton", "Buton Selatan", "Buton Tengah", "Buton Utara", "Kolaka", "Kolaka Timur", "Kolaka Utara", "Konawe", "Konawe Kepulauan", "Konawe Selatan", "Konawe Utara", "Muna", "Muna Barat", "Wakatobi"]
  },
  {
    id: "GORONTALO",
    name: "Gorontalo",
    regencies: ["Gorontalo", "Boalemo", "Bone Bolango", "Gorontalo Utara", "Pohuwato"]
  },
  {
    id: "SULBAR",
    name: "Sulawesi Barat",
    regencies: ["Mamuju", "Majene", "Mamasa", "Mamuju Tengah", "Pasangkayu", "Polewali Mandar"]
  },
  {
    id: "MALUKU",
    name: "Maluku",
    regencies: ["Ambon", "Tual", "Buru", "Buru Selatan", "Kepulauan Aru", "Kepulauan Tanimbar", "Maluku Barat Daya", "Maluku Tengah", "Maluku Tenggara", "Seram Bagian Barat", "Seram Bagian Timur"]
  },
  {
    id: "MALUT",
    name: "Maluku Utara",
    regencies: ["Ternate", "Tidore Kepulauan", "Halmahera Barat", "Halmahera Tengah", "Halmahera Timur", "Halmahera Selatan", "Halmahera Utara", "Kepulauan Sula", "Pulau Morotai", "Pulau Taliabu"]
  },
  {
    id: "PAPUA",
    name: "Papua",
    regencies: ["Jayapura", "Biak Numfor", "Keerom", "Kepulauan Yapen", "Mamberamo Raya", "Sarmi", "Supiori", "Waropen"]
  },
  {
    id: "PAPUABAR",
    name: "Papua Barat",
    regencies: ["Manokwari", "Fakfak", "Kaimana", "Manokwari Selatan", "Teluk Bintuni", "Teluk Wondama", "Pegunungan Arfak"]
  },
  {
    id: "PAPUASLT",
    name: "Papua Selatan",
    regencies: ["Merauke", "Asmat", "Boven Digoel", "Mappi"]
  },
  {
    id: "PAPUATG",
    name: "Papua Tengah",
    regencies: ["Nabire", "Deiyai", "Dogiyai", "Intan Jaya", "Mimika", "Paniai", "Puncak", "Puncak Jaya"]
  },
  {
    id: "PAPUAPG",
    name: "Papua Pegunungan",
    regencies: ["Jayawijaya", "Lanny Jaya", "Mamberamo Tengah", "Nduga", "Pegunungan Bintang", "Yahukimo", "Yalimo"]
  },
  {
    id: "PAPUABARDYA",
    name: "Papua Barat Daya",
    regencies: ["Sorong", "Maybrat", "Raja Ampat", "Sorong Selatan", "Tambrauw"]
  }
];
