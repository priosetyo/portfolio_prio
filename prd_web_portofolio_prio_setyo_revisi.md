# Product Requirements Document (PRD): Web Portofolio Prio Setyo

**Tanggal Dokumen:** 25 Oktober 2026
**Pemilik Produk:** Prio Setyo
**Status:** Draft / Review

## 1. Ringkasan Eksekutif & Tujuan
Proyek ini bertujuan untuk membangun sebuah situs web portofolio *single-domain* yang menampilkan profil profesional dan galeri karya, termasuk fotografi, videografi, desain grafis, serta *copywriting* dari Prio Setyo. Sistem ini dilengkapi dengan *dashboard* admin internal yang memungkinkan pengelolaan konten tanpa perlu memodifikasi kode sumber sama sekali.

**Tujuan Utama (Versi 1.0):**
* Memberikan kemudahan bagi rekruter dan HRD untuk menilai profil dan bukti karya secara komprehensif dalam satu kali *scroll* melalui antarmuka responsif (*mobile-first*).
* Menyediakan *dashboard* admin khusus bagi Prio agar dapat menambah, mengubah, atau menyembunyikan karya secara efisien, dengan target kurang dari 5 menit per pembaruan.
* Membangun infrastruktur modern menggunakan React (.jsx) dengan komponen yang dapat digunakan kembali (*reusable components*) di sisi *frontend*.
* Menggunakan Supabase untuk *backend*, mencakup pengelolaan basis data (Postgres), penyimpanan media (Storage), dan otentikasi login admin.

## 2. Target Pengguna (User Personas)
| Persona | Kebutuhan Utama | Perilaku Pengguna |
| :--- | :--- | :--- |
| **Rekruter & HR** | Evaluasi kecocokan kandidat secara cepat berdasarkan pengalaman dan bukti visual karya. | Mengakses web via tautan CV atau LinkedIn, didominasi penggunaan perangkat seluler, dengan waktu pemindaian cepat (1–3 menit). |
| **Hiring Manager / Calon Klien** | Menilai kualitas *output*, detail teknis, dan cara berpikir kreator. | Membuka detail portofolio karya, memutar video, dan menavigasi galeri secara spesifik. |
| **Admin (Prio)** | Mengelola konten portofolio secara mandiri tanpa menyentuh kode. | *Login* ke *dashboard*, mengunggah aset visual (foto/video), serta mengatur status visibilitas dan urutan karya. |

## 3. Ruang Lingkup Proyek (Scope)
**In-Scope (Versi 1.0):**
* Satu halaman publik utama yang mencakup bagian: Tentang Saya, Keahlian, Galeri Karya (terbaru), Pengalaman Kerja, dan Kontak.
* Galeri karya interaktif dengan sistem filter berdasarkan empat kategori: Fotografi, Videografi, Desain Grafis, dan Copywriting.
* Tampilan detail karya (berupa dialog/modal) yang mendukung penayangan foto resolusi tinggi, pemutar video, dan teks deskripsi penuh.
* *Dashboard* otentikasi admin (pada rute `/admin`) untuk manajemen konten dan aset.
* Dukungan fitur mode terang dan gelap, optimasi SEO dasar, serta tata letak responsif mulai dari resolusi 360 px.

**Out-of-Scope (Diluar Versi 1.0):**
* Modul *Blog*, fitur multi-bahasa, kolom komentar pengunjung, integrasi formulir kontak berbasis *server*, dan analitik buatan sendiri.

## 4. Persyaratan Fungsional (Functional Requirements)
*Catatan: P0 = Wajib ada saat rilis, P1 = Menyusul di rilis kedua, P2 = Opsional.*

| ID | Fitur Utama | User Story | Kriteria Penerimaan (Acceptance Criteria) | Prioritas |
| :--- | :--- | :--- | :--- | :--- |
| **F01** | Hero & Navigasi | Sebagai rekruter, saya langsung memahami identitas Prio dan bidang keahlian utamanya. | Judul, peran, dan dua tombol aksi (CTA) terlihat jelas tanpa *scroll* pada layar 360 px. | P0 |
| **F02** | Tentang Saya | Sebagai pengunjung, saya ingin membaca ringkasan profil dan fakta singkat Prio. | Data dirender secara dinamis dari tabel `site_settings`. | P0 |
| **F03** | Keahlian (Skills) | Sebagai rekruter, saya ingin mengetahui cakupan kompetensi dan kemampuan. | Daftar kelompok keahlian dirender secara dinamis berdasarkan tabel `skills`. | P0 |
| **F04** | Galeri Karya | Sebagai pengunjung, saya bisa menyaring portofolio karya berdasarkan kategori. | Tersedia 4 filter kategori ditambah 'Semua', perhitungan jumlah karya, dan menggunakan tata letak grid dengan frame tetap. | P0 |
| **F05** | Detail Karya (Modal) | Sebagai *hiring manager*, saya ingin menginspeksi karya dalam format yang lebih besar. | Terdapat modal interaktif dengan *image viewer* resolusi tinggi, *video player*, yang bisa ditutup dengan tombol Esc. | P0 |
| **F06** | Pengalaman Kerja | Sebagai rekruter, saya dapat melihat riwayat karir secara runut. | Garis waktu (timeline) dirender dari tabel `experiences`, dengan posisi terbaru di atas. | P0 |
| **F07** | Kontak | Sebagai calon klien, saya ingin menghubungi Prio dengan mudah. | Tersedia modul Email, WhatsApp, dan LinkedIn lengkap dengan fitur salin cepat (*Copy to Clipboard*). | P0 |
| **F08** | Manajemen Sesi Admin | Sebagai admin, saya bisa masuk dengan aman untuk mengelola situs. | Terdapat *login* khusus admin, sistem membatasi penulisan hanya untuk akun *authenticated*, dan mendukung indikator unggah progres. | P0 |
| **F09** | CRUD Teks Konten | Sebagai admin, saya dapat mengubah teks pengalaman tanpa menyentuh kode. | Tersedia formulir khusus untuk manajemen entitas di tabel `experiences` dan `skills`. | P1 |
| **F10** | Tema UI (Dark/Light) | Sebagai pengunjung, saya ingin tampilan situs yang nyaman di mata. | Sistem otomatis mengikuti pengaturan OS pengguna (*prefers-color-scheme*) ditambah tombol manual pengubah tema. | P1 |
| **F11** | Optimasi SEO & OG | Sebagai Prio, saya ingin tautan portofolio terlihat rapi dan profesional saat dibagikan. | Setiap halaman memiliki kelengkapan atribut Judul, Deskripsi, dan *Open Graph image* yang terstruktur. | P1 |
| **F12** | Unduh Resume / CV | Sebagai HR, saya bisa mengunduh *file* resume Prio secara langsung. | Tersedia tombol unduhan yang merujuk ke *file* PDF dari Supabase Storage. | P2 |

## 5. Arsitektur Sistem & Komponen Frontend
Sistem menggunakan pola arsitektur aplikasi tunggal berbasis React (Vite, `.jsx`). Komunikasi dan agregasi data dilakukan sepenuhnya melalui lapisan abstraksi *hooks* (seperti `useProjects`, `useSiteContent`) serta direktori `lib/`, dan komponen tampilan diharamkan memanggil Supabase secara langsung.

**Prinsip Desain Komponen:**
* Pengelolaan gaya visual (CSS) terpusat pada *design tokens* (`tokens.css`) dan CSS Modules, melarang keras penulisan ulang warna atau ukuran (*hardcode*) secara sembarangan.
* Komponen presentasional pada `/ui`, `/sections`, dan `/work` hanya menerima proporsi instruksi (*props*) dan memiliki hanya satu tanggung jawab (Single Responsibility Principle).

**Inventaris Komponen Utama:**
* `Section`, `Button`, `Dialog`, `CopyField`: Komponen UI fundamental halaman publik.
* `Chip`, `Tag`: Label statis dan tombol navigasi penyaringan berukuran mikro.
* `WorkGrid`, `WorkTile`: Komponen orkestrasi galeri yang mampu beradaptasi terhadap kategori karya (*masonry layout*, *skeleton*, dan *empty states*).
* `MediaViewer`, `VideoPlayer`: Penanganan rendering file media interaktif (unggah langsung maupun tautan *embed*) di dalam dialog.
* `ProjectForm`, `MediaUploader`: Form pengelolaan data baru dan antarmuka pengecilan file unggahan (*uploader*) khusus halaman admin.

## 6. Model Data & Keamanan (Supabase)
Sistem penyimpanan dipisah menjadi dua: Relational Database (Postgres) untuk metadata/konfigurasi, dan Object Storage untuk aset visual.

**Struktur Tabel Utama:**
1. `site_settings`: Berisi seting baris tunggal profil situs (kolom: `name`, `headline`, `email`, `linkedin`, `cv_path`, dll).
2. `projects`: Entitas galeri karya utama (kolom: `slug`, `title`, `category`, `description`, `role`, `meta` berformat JSONB untuk fleksibilitas masa depan, dan `is_published`).
3. `project_media`: Relasi media karya (kolom: `kind`, `storage_path`, `external_url`, `alt_text`).
4. `experiences`: Riwayat organisasi, pekerjaan dan pendidikan.
5. `skills`: Taksonomi kelompok keahlian (kolom: `group_name`, `name`).

**Kebijakan Keamanan (Row Level Security / RLS):**
* **Akses Publik:** Diizinkan hak membaca secara ketat hanya pada entitas *projects* dan *project_media* dengan kriteria `is_published = true`.
* **Akses Admin:** Hak baca/tulis/hapus (ALL) dikunci menggunakan filter validasi JWT `auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'`. Pendaftaran publik pada Auth dimatikan sepenuhnya.

## 7. Alur Pengelolaan Konten (Admin Workflow)
1. Prio melakukan *login* dengan metode email dan kata sandi di rute `/admin` dan memilih opsi pendaftaran karya baru.
2. Prio melengkapi atribut utama seperti judul, taksonomi kategori, tahun, klien, peran dan deskripsi. Kolom tambahan di-*generate* otomatis sesuai kategori spesifik.
3. Saat *file* foto dipilih, *browser* melakukan *downscaling* otomatis (menjadi format WebP beresolusi 800 px dan 2400 px), atau menarik satu poster tangkapan bingkai khusus untuk *file* video.
4. Transmisi ke *bucket* publik `portfolio-media` berjalan dengan indikator progres visual, dan objek `project_media` tercipta otomatis.
5. Sistem mengunci status publikasi sampai atribut *Alt Text* pada foto telah diisi valid oleh Prio sebagai mandat aksesibilitas sistem.

## 8. Persyaratan Non-Fungsional
| Aspek Evaluasi | Matriks Standar Target | Strategi Implementasi |
| :--- | :--- | :--- |
| **Performa Akses** | Lighthouse (Mobile) ≥ 90, skor LCP ≤ 2,5 detik di jaringan 4G, rasio CLS ≤ 0,1. | *Lazy loading* gambar, penggunaan *thumbnail* WebP, penerapan *code splitting* rute khusus, dan `font-display: swap`. |
| **Aksesibilitas** | Kepatuhan WCAG 2.1 AA, nilai kontras minimum ≥ 4,5:1. | Implementasi pengoperasian penuh keyboard UI, pelarangan *publish* aset tanpa *alt_text*, penghormatan indikator *prefers-reduced-motion*. |
| **Integritas Privasi** | Tanpa retensi Cookie Pelacak pihak ketiga. | Tidak ada adopsi program Google Analytics/Tracker komersial pada iterasi versi 1.0 ini. |
| **Ketahanan Situs** | Tampilan *Graceful Degradation* di kondisi jaringan ekstrim. | Memuat *Skeleton loader* pra-render, perancangan notifikasi *error*, dan retensi basis *caching state* via modul TanStack Query. |

## 9. Metrik Keberhasilan Terukur
* Penghematan waktu operasional Prio: penambahan entitas karya baru maksimal ≤ 5 Menit.
* Pencapaian Skor Lighthouse web secara holistik ≥ 90 poin di lingkungan seluler.
* Rasio integrasi *Alt text* media: 100% pada semua karya yang berstatus diterbitkan.
* Pencatatan kebocoran hak tulis anonim: 0 kejadian yang divalidasi ke dalam log *Database* atau Supabase Storage.

## 10. Manajemen Risiko & Pertanyaan Terbuka
**Mitigasi Risiko:**
* *Batas Ukuran Paket Storage*: Video dengan durasi melebihi kapasitas standar akan dialihkan sebagai tautan *embed* (YouTube/Vimeo) dan klip berdurasi mini akan melalui pre-kompresi lokal sebelum dilempar ke basis data.
* *Konflik Rendering SEO*: Tautan pratinjau OG sosial dapat tidak terbaca karena struktur *Client-Side Rendering*; ini ditanggulangi dengan strategi *Pre-render static* selama tahap *build time* Vite.
* *Kebocoran RLS Security*: Diuji ganda memakai replika pengakses anonim dengan pengecekan kueri SQL di dalam *repository* Github sebelum *live-deploy*.

**Pertanyaan Terbuka:**
* Keputusan penggunaan pangkalan *hosting*: Apakah menggunakan Vercel atau *provider* lain?
* Pemilihan aset domain top-level untuk portofolio?
* Protokol eksposur keamanan identitas: Apakah nomor WhatsApp Prio ditampilkan secara umum, atau lalu lintas kontak dialihkan sepenuhnya ke LinkedIn dan surel?
* Apakah situs portofolio ini dirancang *English-first* untuk rekruter mancanegara, atau tetap berpusat pada bahasa Indonesia?