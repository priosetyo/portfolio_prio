# Roadmap & Checklist Pengerjaan Web Portofolio Prio Setyo

> **Berdasarkan PRD Revisi (Versi 1.0)**  
> **Target Utama**: Portofolio interaktif multi-kategori (Foto, Video, Desain, Copywriting) dengan stack React (Vite) + Supabase, performa tinggi (Lighthouse ≥ 90), dan Dashboard Admin mandiri.

---

> [!IMPORTANT]
> ### 🎉 STATUS PROGRES: SELURUH FASE SELESAI (100% ROADMAP TUNTAS)
> - **Fase 1 s/d Fase 6**: **Telah Selesai Penuh (6/6 Fase Selesai)**
> - **Terakhir Diperbarui**: 25 Oktober 2026
> - **Kondisi Aplikasi**:
>   - **Performa & Web Vitals**: Code splitting rute admin (`React.lazy`), manual chunking vendor (React, Supabase, Lucide), dan `loading="lazy"` dengan nol layout shift (CLS ≤ 0.1).
>   - **Aksesibilitas (WCAG 2.1 AA)**: Skip link untuk pembaca layar, indikator fokus `:focus-visible`, navigasi keyboard lengkap (`Esc`, panah galeri, `Enter`), dan validasi wajib `alt_text`.
>   - **SEO & Social Sharing**: Tag Open Graph lengkap, Twitter cards, preconnect fonts, dan Schema.org JSON-LD `Person`.
>   - **Kesiapan Hosting**: SPA rewrites untuk Vercel (`vercel.json`) dan Netlify/Cloudflare (`public/_redirects`), build production sukses (`npm run build`).

---

## Ringkasan Progres

- [x] **Fase 1**: Database, Storage & Keamanan (Supabase) - *5 Tabel Utama*
- [x] **Fase 2**: Fondasi Frontend & Design System (Vite + React)
- [x] **Fase 3**: Halaman Publik & Integrasi Konten Teks
- [x] **Fase 4**: Galeri Karya, Filter & Media Viewer Interaktif
- [x] **Fase 5**: Dashboard Admin (`/admin`) & Pengelolaan Media
- [x] **Fase 6**: Poles, Optimasi Performa, Aksesibilitas & Rilis 🎉 (TUNTAS)

---

## Detail Rencana Kerja Per Fase

### Fase 1: Database, Storage & Keamanan (Supabase)
> **Kriteria Selesai**: Skema 5 tabel, enum, RLS, storage bucket, dan akun admin aktif di Supabase. Query anonim hanya membaca karya berstatus terbit (`is_published = true`).

- [x] **1.1. Inisialisasi Skema Database & Enum**
  - [x] Buat ENUM `work_category` (`'photo'`, `'video'`, `'design'`, `'copy'`).
  - [x] Buat ENUM `media_kind` (`'image'`, `'video'`, `'embed'`).
  - [x] Buat tabel `site_settings` (profil situs, kontak, resume/CV path).
  - [x] Buat tabel `projects` (slug, title, category, summary, description, client, year, role, excerpt, meta jsonb, is_published, sort_order).
  - [x] Buat tabel `project_media` (relasi file/embed media, width, height, duration_sec, alt_text, sort_order).
  - [x] Buat tabel `experiences` (riwayat kerja & pendidikan).
  - [x] Buat tabel `skills` (keahlian per kelompok).
  - [x] Bersihkan tabel lama yang tidak dipakai (`metrics`, `case_studies`).
  - [x] Tambahkan index pada `slug`, `category`, `is_published`, `sort_order`, `group_name`.

- [x] **1.2. Row Level Security (RLS)**
  - [x] Aktifkan RLS di ke-5 tabel.
  - [x] Setup policy publik: hanya bisa `SELECT` data yang berstatus `is_published = true` (untuk `projects` & `project_media`) dan data publik (`site_settings`, `experiences`, `skills`).
  - [x] Setup policy admin: hak penuh (`ALL`) untuk user dengan `app_metadata.role = 'admin'`.

- [x] **1.3. Supabase Storage**
  - [x] Buat bucket publik `portfolio-media`.
  - [x] Terapkan konvensi path: `{category}/{project_id}/{uuid}-{size}.{ext}` dan folder `cv/`.
  - [x] Pasang policy storage: publik hanya baca (`SELECT`), tulis/hapus hanya admin.

- [x] **1.4. Autentikasi & Akun Admin**
  - [x] Nonaktifkan pendaftaran publik (disable signups).
  - [x] Buat user admin utama untuk Prio.
  - [x] Berikan claim role `'admin'` pada `app_metadata` akun admin.

- [x] **1.5. Data Awal (Seed Data)**
  - [x] Masukkan data awal profil Prio, data kontak, keahlian, dan riwayat pengalaman.

---

### Fase 2: Fondasi Frontend & Design System (Vite + React)
> **Kriteria Selesai**: Struktur proyek Vite siap, tema gelap/terang berfungsi mulus, token CSS terintegrasi, dan komponen UI dasar selesai.

- [x] **2.1. Setup Proyek & Dependencies**
  - [x] Inisialisasi Vite + React (`.jsx`).
  - [x] Pasang pustaka pendukung: `@supabase/supabase-js`, `lucide-react`, `react-router-dom`.
  - [x] Konfigurasi environment `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

- [x] **2.2. Design System & CSS Tokens**
  - [x] `src/styles/tokens.css`: Token warna (Light/Dark mode), tipografi, spacing, radius, bayangan, dan glassmorphism.
  - [x] `src/styles/global.css`: Reset CSS, tipografi responsif, scrollbar styling, utilitas animasi mikro, dan `prefers-reduced-motion`.

- [x] **2.3. Helper Library (`src/lib/`)**
  - [x] `supabaseClient.js`: Inisialisasi Supabase client dengan anon key.
  - [x] `queries.js`: Fungsi query terisolasi untuk semua pemanggilan data.
  - [x] `image.js`: Kompresor gambar sisi klien (WebP 800px & 2400px) & snapshot frame video untuk poster.
  - [x] `format.js`: Format penomoran frame (F01, F02, dst), tanggal, dan durasi.

- [x] **2.4. Custom Hooks Dasar (`src/hooks/`)**
  - [x] `useTheme.js`: Pengatur tema sistem/manual yang tersimpan di `localStorage`.
  - [x] `useAuth.js`: Pengelola state session admin Supabase.
  - [x] `useCopy.js`: Helper copy-to-clipboard dengan indikator visual.

- [x] **2.5. Komponen UI Reusable (`src/components/ui/`)**
  - [x] `Section.jsx`: Wrapper section dengan label di kiri dan judul besar.
  - [x] `Button.jsx`: Tombol solid, outline, ghost, dan link.
  - [x] `Tag.jsx`: Badge mono kecil untuk frame, kategori, atau status.
  - [x] `Chip.jsx`: Tombol filter kategori dengan jumlah karya.
  - [x] `Dialog.jsx`: Modal aksesibel (focus trap, backdrop blur, tutup via keyboard `Esc`).
  - [x] `CopyField.jsx`: Baris kontak dengan tombol salin.

---

### Fase 3: Halaman Publik & Integrasi Konten Teks
> **Kriteria Selesai**: Seluruh teks dari Hero sampai Kontak diambil dinamis dari Supabase Postgres tanpa hardcoded string.

- [x] **3.1. Hook Konten (`useSiteContent.js`)**
  - [x] Fetch data paralel: `site_settings`, `skills`, `experiences`.
  - [x] State loading (skeleton) dan penanganan galat jaringan.

- [x] **3.2. Implementasi Section Publik (`src/components/sections/`)**
  - [x] `Hero.jsx`: Judul, peran, deskripsi singkat, tombol CTA "Lihat Karya" & "Hubungi Saya" (tampil tanpa scroll di layar 360px).
  - [x] `About.jsx`: Profil mendalam, bio, dan ringkasan lokasi dari `site_settings`.
  - [x] `Skills.jsx`: Daftar keahlian per kelompok (Fotografi, Videografi, Desain, Copywriting).
  - [x] `Experience.jsx`: Garis waktu pengalaman kerja & pendidikan (terbaru di atas).
  - [x] `Contact.jsx`: Baris kontak (Email, WhatsApp, LinkedIn dengan fitur salin cepat) + tombol unduh CV PDF.
  - [x] `Navbar / Header`: Navigasi cepat antar bagian + tombol ganti tema terang/gelap.

---

### Fase 4: Galeri Karya, Filter & Media Viewer Interaktif
> **Kriteria Selesai**: Galeri masonry responsif, filter 4 kategori + Semua, nomor frame konsisten, dan detail karya dapat dibuka di dialog lengkap.

- [x] **4.1. Hook Karya (`useProjects.js`)**
  - [x] Fetch list karya terbit (`is_published = true`) beserta relasi `project_media`.

- [x] **4.2. Galeri & Filter (`WorkFilter.jsx` & `WorkGrid.jsx`)**
  - [x] Filter 4 kategori: Fotografi (`photo`), Videografi (`video`), Desain Grafis (`design`), Copywriting (`copy`), plus tab `Semua`.
  - [x] Badge hitungan jumlah karya dinamis per kategori.
  - [x] Layout grid masonry responsif (1 kolom di mobile 360px, 2-3 kolom di layar lebar).
  - [x] Nomor frame tetap (F01, F02, ...) tidak berubah nomornya saat filter aktif.

- [x] **4.3. Kartu Karya (`WorkTile.jsx`)**
  - [x] Tampilan khusus kategori:
    - **Foto & Desain**: Thumbnail WebP tajam, rasio aspek proporsional.
    - **Video**: Poster frame dengan durasi dan tombol play.
    - **Copywriting**: Kutipan teks/headline yang menonjol dan tipografi nyaman dibaca.

- [x] **4.4. Dialog Detail Karya (`WorkDialog.jsx`, `MediaViewer.jsx`, `VideoPlayer.jsx`)**
  - [x] Tampilan foto resolusi tinggi (2400px WebP) dengan navigasi panah kiri/kanan.
  - [x] Pemutar video langsung (`<video controls playsInline>`) atau lazy-loaded embed (YouTube/Vimeo).
  - [x] Tampilan teks copywriting lengkap / deskripsi proyek.
  - [x] Metadata karya: Klien, tahun, peran, serta info teknis dari kolom `meta`.
  - [x] Aksesibilitas: Tombol `Esc` untuk menutup dan tombol navigasi keyboard.

---

### Fase 5: Dashboard Admin (`/admin`) & Pengelolaan Media
> **Kriteria Selesai**: Prio bisa login, menambah, mengubah, mengurutkan, dan menyembunyikan karya serta media dalam waktu < 5 menit per karya tanpa menyentuh kode.

- [x] **5.1. Autentikasi Admin (`AdminPage.jsx` & `LoginForm.jsx`)**
  - [x] Form login email dan password via Supabase Auth.
  - [x] Proteksi halaman: dialihkan otomatis jika belum terautentikasi sebagai admin.

- [x] **5.2. Tabel Manajemen Karya (`ProjectTable.jsx`)**
  - [x] Daftar semua karya (draf & terbit).
  - [x] Fitur cepat: Toggle publikasi (`is_published`), edit karya, hapus karya, dan atur urutan (`sort_order`).

- [x] **5.3. Form Karya (`ProjectForm.jsx`)**
  - [x] Input data umum: judul, slug, kategori, ringkasan, deskripsi, klien, tahun, peran, excerpt.
  - [x] Field dinamis `meta` (JSONB) menyesuaikan kategori yang dipilih (misal: setting kamera/lensa untuk foto, durasi/platform untuk video).

- [x] **5.4. Pengunggah Media (`MediaUploader.jsx`)**
  - [x] Kompresi gambar otomatis di browser menjadi 2 ukuran WebP (800px dan 2400px).
  - [x] Pengambilan 1 frame video sebagai poster.
  - [x] Input embed video (YouTube/Vimeo unlisted) untuk video berukuran besar.
  - [x] Indikator progres upload ke bucket `portfolio-media`.
  - [x] Validasi wajib teks alternatif (`alt_text`) sebelum karya foto dapat diterbitkan.
  - [x] Fitur atur urutan media (`sort_order`).

- [x] **5.5. (P1) Manajemen Konten Teks Admin**
  - [x] Form kelola pengalaman (`experiences`) dan keahlian (`skills`).

---

### Fase 6: Poles, Optimasi Performa, Aksesibilitas & Rilis
> **Kriteria Selesai**: Seluruh target non-fungsional tercapai (Lighthouse mobile ≥ 90, WCAG 2.1 AA, RLS lolos audit, siap di-hosting).

- [x] **6.1. Optimasi Performa & Web Vitals**
  - [x] Lazy loading gambar (`loading="lazy"`), `srcset` dua ukuran, dan penetapan dimensi `width`/`height` untuk mencegah CLS (target CLS ≤ 0.1).
  - [x] Code splitting rute admin (`React.lazy` untuk `AdminPage`).
  - [x] Manual vendor chunking di `vite.config.js` untuk cache browser optimal.
  - [x] Target Lighthouse Mobile: Performa ≥ 90, LCP ≤ 2.5s di jaringan 4G.

- [x] **6.2. Aksesibilitas (WCAG 2.1 AA)**
  - [x] Kontras warna teks ≥ 4.5:1 di tema terang dan gelap.
  - [x] Skip link aksesibilitas (`.skip-link`) untuk keyboard & pembaca layar.
  - [x] Navigasi lengkap via keyboard di seluruh tombol, dialog, dan form (`Esc`, panah, `Enter`).
  - [x] Verifikasi semua gambar terbit memiliki `alt_text` yang deskriptif.

- [x] **6.3. SEO & Open Graph Preview**
  - [x] Tag meta Open Graph lengkap (OG Title, OG Description, OG Image, OG Type, OG Locale) di `index.html`.
  - [x] Tag Twitter Cards (summary_large_image).
  - [x] Data terstruktur JSON-LD schema `Person` (Prio Setyo).
  - [x] Preconnect font Google Fonts untuk mengurangi render blocking.
  - [x] Favicon SVG dan meta theme-color untuk dark/light mode.

- [x] **6.4. Deployment & Kesiapan Hosting**
  - [x] Konfigurasi build dan deploy SPA rewrite untuk Vercel (`vercel.json`) dan Netlify/Cloudflare (`public/_redirects`).
  - [x] Pengujian alur admin: login (Supabase Auth + Demo Bypass), tambah karya, kompresi otomatis WebP (800/2400), ekstraksi poster video, dan publikasi instan.
  - [x] Build production lolos uji (`npm run build`).
