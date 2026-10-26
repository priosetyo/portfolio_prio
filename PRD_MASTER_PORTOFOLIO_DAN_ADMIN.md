# Master Product Requirements Document (PRD)
## Web Portofolio & Atelier Studio CMS — Prio Setyo

* **Pemilik Produk:** Prio Setyo (Creative Director & Visual Storyteller)
* **Versi Dokumen:** 2.0 (Master Unified Edition)
* **Tanggal Rilis:** 26 Oktober 2026
* **Status:** Siap Menjadi Blueprint & Acuan Prototyping Google Stitch

---

## 1. Ringkasan Eksekutif & Visi Desain

### 1.1 Visi Utama
Membangun platform portofolio *single-domain* berskala internasional yang memadukan dua sisi ekosistem digital:
1. **Halaman Publik (User-Facing Portfolio):** Etalase visual teatrikal kelas atas yang memikat rekruter global, kurator seni, dan calon klien agensi internasional melalui narasi visual multidisiplin (*Fotografi, Videografi, Desain Grafis, dan Copywriting*).
2. **Halaman Admin (Atelier Studio CMS):** Panel kendali eksekutif internal bagi Prio Setyo untuk mengkurasi karya, mengatur visibilitas publik (*1-click publish/draft*), mengelola linimasa karir, serta memperbarui toolkit dengan fitur *Real-time Live Preview*.

### 1.2 Filosofi Desain: "Warm Obsidian & Volcanic Vermilion"
Mengadopsi bahasa desain modernis asimetris (*Asymmetrical Modernist Bento Grid*) dengan karakteristik visual:
* **Nuansa Gelap Hangat:** Menggunakan palet obsidian bertingkat (`#0e0e12`, `#131317`, `#1b1b1f`) yang memberikan kedalaman latar belakang tanpa membuat mata lelah.
* **Pendaran Kinetik (Volcanic Glow):** Aksen oranye-vermilion menyala (`#ff571a` dan `#ff7f1c`) dengan pendaran halo ambient yang menuntun perhatian pengunjung ke titik fokus utama (*focal points*).
* **Tipografi Berkarakter:**
  * **Headings & Angka Metrik:** `Syne` (Bobot 700–900; berani, bersudut tegas, dan sarat cita rasa seni kontemporer).
  * **Body & Antarmuka:** `Inter` (Bobot 400–600; geometris, netral, sangat mudah dibaca pada layar retina).
  * **Kodifikasi & Teknis:** `JetBrains Mono` (Untuk metadata kamera, slug URL, rasio, dan angka urutan).

---

## 2. Arsitektur Informasi & Peta Situs (Sitemap)

```
prioworks.my.id (Domain Tunggal)
├── Rute Publik (/)
│   ├── #navbar (Sticky Glassmorphic Nav)
│   ├── #hero (Theatrical Hero Banner & Metrik)
│   ├── #about (Bento Grid Filosofi & 4 Pilar Strategis)
│   ├── #skills (Creative Toolkit & Eksperimen 3D)
│   ├── #work (Curated Showcase & Modal Dialog Detail)
│   ├── #experience (Linimasa Karir Profesional)
│   ├── #contact (Interactive CopyField & WhatsApp CTA)
│   └── #footer (Status Ketersediaan & Lokasi Studio)
│
└── Rute Admin (/admin)
    ├── /admin/login (Studio Portal & 1-Klik Demo Mode)
    ├── /admin/dashboard (Executive CMS, KPI Stats & Showcase Manager)
    ├── /admin/projects/editor (Editor 2-Kolom & Live Preview Card)
    └── /admin/content (Manajemen Linimasa Karir & Keahlian)
```

---

## 3. Spesifikasi Lengkap Halaman Publik (User-Facing)

### 3.1 Sticky Glassmorphic Navbar
* **Perilaku:** Melayang di posisi atas layar (*sticky*), memiliki latar belakang kaca obsidian transparan berbayang (`rgba(19, 19, 23, 0.85)` dengan `backdrop-filter: blur(20px)`).
* **Elemen Navigasi:**
  * **Kiri (Branding):** Avatar monogram `PS` kotak bergradien oranye menyala + Nama *"Prio Setyo"* (Syne 800) + label dinamis *"Creative Director"*.
  * **Tengah (Center Pill Navigation):** Kapsul mengambang dengan tautan menu halus: `Karya (#work)`, `Filosofi (#about)`, `Toolkit (#skills)`, `Pengalaman (#experience)`.
  * **Kanan (Action CTA):** Tombol kapsul menyala *"Mulai Diskusi"* yang langsung menggulirkan layar ke bagian `#contact`.

---

### 3.2 Theatrical Hero Section
* **Latar Belakang:** Efek pencahayaan ambient radial oranye kinetik ganda yang memberikan ilusi panggung teatrikal gelap.
* **Status Badge:** Kapsul dengan lampu hijau berdenyut (*pulsing green dot*): *"TERSEDIA UNTUK KOLABORASI Q2/Q3"*.
* **Headline & Tipografi:**
  * Sub-headline atas: *"CREATIVE DIRECTOR & VISUAL STORYTELLER"*.
  * Headline Utama: Nama besar **"PRIO SETYO"** bergradien putih-ke-peach (`linear-gradient(135deg, #ffffff 40%, #ffb68b 100%)`).
  * Paragraf Narasi: Menjelaskan sintesis antara estetika spasial, arahan seni komersial, dan penulisan naskah persuasif.
* **3-Kolom Metrik Kunci:**
  1. `10+` Tahun Pengalaman Industri
  2. `35+` Penghargaan & Seleksi Desain Global
  3. `120+` Proyek Berskala Komersial & Editorial
* **21:9 Studio Portrait Banner:** Frame visual sinematik ultra-wide yang dilengkapi lencana akrilik melayang di sudut kiri bawah: *"Prio Setyo — Studio Atelier Jakarta & Tokyo"*.

---

### 3.3 About Bento Grid (Filosofi & 4 Pilar Strategis)
Menggunakan tata letak grid asimetris 2 kolom besar:
* **Kartu Kiri (Filosofi Desain):**
  * Teks kutipan besar (*blockquote*): *"Desain bukan sekadar apa yang tampak di permukaan, melainkan bagaimana narasi tak kasat mata menyentuh alam bawah sadar penikmatnya."*
  * Rincian pendekatan kerja: Riset kultural, komposisi cahaya dramatis, dan tipografi berbobot.
* **Kartu Kanan (Pilar Strategis Disiplin Kreasi):**
  * **01 / Arah Kreatif & Naratif:** Konseptualisasi kampanye holistik dan orkestrasi identitas merek.
  * **02 / Sinematografi & Pencahayaan:** Penguasaan color grading DaVinci Resolve dan tata cahaya sinematik.
  * **03 / Desain Spasial & Komposisi:** Eksplorasi antarmuka spasial UI/UX Vision Pro dan render 3D Unreal Engine 5.
  * **04 / Copywriting & Arsitektur Pesan:** Penulisan naskah komersial, manifesto merek, dan microcopy persuasif.

---

### 3.4 Skills & Pipeline Produksi
* **Bento Card Toolkit:** Menampilkan perangkat lunak utama dengan logo dan level keahlian:
  * *Figma Spatials*, *Unreal Engine 5*, *DaVinci Resolve Studio*, *Cinema 4D*, *Adobe Creative Cloud*, dan *Ableton Live*.
* **Showcase Eksperimen Estetika:** Showcase visual preview 3D *"Eksperimen Estetika Q1"* yang mendemonstrasikan eksplorasi pencahayaan volumetrik.

---

### 3.5 Curated Work Showcase (Galeri Portofolio)
* **Sistem Filter Kategori:** 5 tombol kapsul oval:
  1. `Semua Karya`
  2. `Fotografi` (Editorial, Fashion, Still Life)
  3. `Videografi` (Commercial, Cinematic Motion)
  4. `Desain Grafis` (Spatial UI/UX, Visual Identity)
  5. `Copywriting` (Brand Storytelling, Campaign Tagline)
* **Kartu Karya (WorkTile Grid):**
  * Aspek rasio visual tetap `16:11` untuk estetika grid yang rapi.
  * Kiri atas: Tag kategori bergradien sesuai disiplin (*Photo, Video, Design, Copy*).
  * Kanan bawah: Tombol panah bulat melayang yang berpendar oranye saat kartu di-hover.
  * Teks: Judul karya berhuruf Syne tebal, nama klien/brand, tahun produksi, dan ringkasan eksekutif 2 baris.
* **Modal Dialog Detail Karya (WorkDialog):**
  * Membuka tampilan jendela inspeksi beresolusi tinggi saat kartu diklik.
  * Pemutar video otomatis untuk karya video / embed YouTube/Vimeo.
  * Tabel spesifikasi teknis: Kamera, Lensa, Aperture, ISO, Color Profile, atau Tools yang digunakan.
  * Teks narasi lengkap proses kurasi dan tantangan kreatif.

---

### 3.6 Linimasa Pengalaman Profesional
Menampilkan rekam jejak karir kuratif secara kronologis terbalik (posisi terkini di atas):
1. **Studio Artefak (2024 — Sekarang):** Principal Creative Director — Jakarta & Singapore.
2. **Global Kinetic Agency (2022 — 2024):** Senior Art & Motion Director — Tokyo Remote.
3. **Monolith Creative Lab (2020 — 2022):** Lead Visual Strategist & Photographer.
4. **Neo Jakarta Advertising (2018 — 2020):** Creative Copywriter & Brand Conceptor.

---

### 3.7 Kontak & Inisiasi Kolaborasi
* **Atmospheric Under-Glow Reflector:** Pendaran oranye lembut di bagian bawah section.
* **3 Kartu Salin Cepat (1-Click CopyField Cards):**
  1. **Surel Resmi:** `contact@prioworks.my.id` (dengan tombol salin dan feedback visual centang hijau).
  2. **WhatsApp Bisnis:** Salin nomor / tautan instan ke chat bisnis.
  3. **LinkedIn Profil:** Tautan langsung ke portofolio profesional.
* **Tombol Utama (Big Capsule CTA):** *"Jadwalkan Konsultasi 1-on-1 (30 Menit)"* dengan pendaran neon.

---

### 3.8 Footer Studio
* Lokasi atelier: *"Jakarta & Singapore"*.
* Status Ketersediaan: *"Tersedia untuk Kolaborasi Q2/Q3"* dengan dot hijau berkedip.
* Tautan media sosial: LinkedIn, Dribbble, Behance, Instagram.
* Hak cipta: *"© 2026 Prio Setyo. Seluruh hak cipta dilindungi undang-undang."*

---

## 4. Spesifikasi Lengkap Halaman Admin (Atelier Studio CMS)

### 4.1 Layar Login Portal (`/admin/login`)
* **Latar Belakang:** Deep Obsidian `#0e0e12` dengan dua orbe pendaran radial oranye.
* **Monogram Studio:** Kotak `PS` gradien oranye menyala.
* **Tombol 1-Klik Akses Cepat:** *"Masuk Mode Demo Studio"* dengan indikator hijau menyala (memungkinkan pengujian langsung tanpa hambatan sandi).
* **Formulir Kredensial:** Surel dan sandi dengan toggle intip kata sandi serta keamanan enkripsi Supabase RLS.

---

### 4.2 Layar Dashboard Eksekutif (`/admin`)
* **Header CMS:** Avatar PS, nama *"PRIO SETYO / Atelier CMS v2.0"*, status koneksi database (*Supabase Live* / *Mode Demo*), tombol *"Lihat Web Publik ↗"*, *Theme Switcher*, dan tombol *Keluar*.
* **4 Kartu Metrik KPI:**
  1. **Total Portofolio:** Total karya terdaftar.
  2. **Live Publik:** Total karya aktif berstatus live (dengan dot hijau menyala).
  3. **Draf / Tersembunyi:** Karya yang diarsipkan atau belum rampung.
  4. **Keahlian & Karir:** Akumulasi riwayat pengalaman dan toolkit aktif.
* **Toolbar Manajemen Karya:**
  * Kolom pencarian instan (judul, klien, slug).
  * Filter status kapsul: `Semua Status` | `Live` | `Draf`.
  * Mode Tampilan Ganda: Tombol alih `[Kartu Visual]` vs `[Tabel Kompak]`.
  * Pil kategori dengan angka jumlah karya (*Fotografi, Videografi, Desain, Copy*).
  * Tombol CTA melayang: `+ Tambah Karya Baru`.
* **Interaktivitas Kartu Karya:**
  * Thumbnail 16:10 kualitas tinggi.
  * **1-Klik Toggle Status Publikasi:** Mengubah karya dari *Draf* ke *Live* hanya dengan sekali klik langsung dari kartu!
  * Tombol aksi: Ikon mata (*Quick Preview Lightbox*), Tombol *Edit*, dan Ikon *Hapus*.

---

### 4.3 Layar Editor Karya Studio 2-Kolom (`/admin/projects/editor`)
* **Sticky Header:** Tombol kembali, indikator ID karya, dan tombol *"Simpan Perubahan (Ctrl+S)"* bergradien oranye.
* **Kolom Kiri (Formulir Detail & Narasi - 60%):**
  1. **Pemilih Kategori Visual:** 4 kartu interaktif ber-ikon (*Foto, Video, Desain, Copywriting*).
  2. **Judul & Auto-Slug:** Slug URL terisi otomatis saat judul diketik.
  3. **Klien, Tahun, & Peran Utama:** Metadata standar industri.
  4. **Narasi Storytelling:** Ringkasan kartu (*summary*) dan deskripsi panjang (*case study*).
  5. **Spesifikasi Teknis Dinamis (JSONB):** Formulir otomatis berubah mengikuti kategori (ISO/Lensa untuk Foto; Resolusi/FPS untuk Video; Software untuk Desain).
* **Kolom Kanan (Live Preview & Media Asset - 40%):**
  1. **Real-Time Live Preview Card:** Menampilkan persis wujud kartu di web publik secara seketika saat admin mengetik teks atau mengganti gambar!
  2. **Pengunggah Media:** Kompresi otomatis WebP (800px & 2400px), ekstraksi frame poster video, dan tautan YouTube/Vimeo.
  3. **Pengaturan Visibilitas:** Sakelar *Live/Draf* dan angka urutan prioritas (*sort order*).

---

### 4.4 Layar Kurasi Karir & Toolkit (`/admin/content`)
* **Sub-Tab Kapsul:** `Riwayat Pengalaman` | `Toolkit & Kompetensi`.
* **Linimasa Karir:** Manajemen jabatan, nama agensi/studio, periode tahun, lokasi, dan poin pencapaian (*bullet points*).
* **Creative Toolkit:** Manajemen nama software/keahlian yang dikelompokkan berdasarkan disiplin.

---

## 5. Token Desain Terpadu (Unified Design System)

| Token Desain | Nilai Kode CSS | Kegunaan pada Stitch / UI |
| :--- | :--- | :--- |
| `--color-surface-lowest` | `#0e0e12` | Latar belakang kanvas utama |
| `--color-surface` | `#131317` | Latar belakang bento card & navbar |
| `--color-surface-container` | `#1b1b1f` | Permukaan kartu portofolio & modal |
| `--color-surface-high` | `#2a292e` | Status hover & latar belakang tombol sekunder |
| `--color-primary-container`| `#ff571a` | Aksen oranye-vermilion utama & tombol CTA |
| `--color-secondary-container`|`#ff7f1c` | Gradien aksen sekunder |
| `--color-on-surface` | `#e4e1e7` | Warna teks judul & headline (putih pudar hangat) |
| `--color-on-surface-variant`|`#e6beb2` | Warna teks deskripsi & label (peach netral) |
| `--color-outline` | `rgba(230, 190, 178, 0.12)` | Garis tepi (*border*) kaca & garis pembagi |
| `--badge-live` | `#10b981` | Indikator dot hijau status online & live publish |
| `--font-display` | `'Syne', sans-serif` | Tipografi headline, brand monogram, & angka metrik |
| `--font-sans` | `'Inter', sans-serif` | Tipografi tubuh teks, input formulir, & navigasi |
| `--font-mono` | `'JetBrains Mono', monospace` | Slug URL, spesifikasi kamera, & urutan karya |
| `--radius-card` | `1.25rem` – `1.5rem` | Sudut membulat kartu bento & dialog modal |
| `--radius-pill` | `9999px` | Bentuk tombol kapsul, filter, dan lencana status |
| `--shadow-glow` | `0 12px 32px -4px rgba(255, 87, 26, 0.45)` | Efek pendaran neon pada tombol aktif & kartu unggulan |

---

## 6. Model Data & Arsitektur Backend (Supabase Postgres)

```sql
-- 1. TABEL PENGATURAN SITUS
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'Prio Setyo',
  headline TEXT NOT NULL,
  bio TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  linkedin_url TEXT,
  dribbble_url TEXT,
  behance_url TEXT,
  instagram_url TEXT,
  location TEXT DEFAULT 'Jakarta & Singapore',
  availability_status TEXT DEFAULT 'Tersedia untuk Kolaborasi Q2/Q3'
);

-- 2. TABEL KARYA PORTOFOLIO (PROJECTS)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('photo', 'video', 'design', 'copy')),
  client TEXT,
  year INTEGER DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
  role TEXT,
  summary TEXT,
  description TEXT,
  excerpt TEXT,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  meta JSONB DEFAULT '{}'::jsonb, -- Spesifikasi dinamis kamera/software/channel
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL ASET MEDIA KARYA (PROJECT MEDIA)
CREATE TABLE project_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  kind TEXT NOT NULL CHECK (kind IN ('image', 'video', 'embed')),
  storage_path TEXT,
  thumb_path TEXT,
  poster_path TEXT,
  external_url TEXT,
  alt_text TEXT,
  width INTEGER,
  height INTEGER,
  duration_sec INTEGER,
  sort_order INTEGER DEFAULT 0
);

-- 4. TABEL PENGALAMAN KERJA (EXPERIENCES)
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  org TEXT NOT NULL,
  location TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT,
  bullets TEXT[] DEFAULT ARRAY[]::TEXT[],
  sort_order INTEGER DEFAULT 0
);

-- 5. TABEL TOOLKIT & KEAHLIAN (SKILLS)
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_name TEXT NOT NULL,
  name TEXT NOT NULL,
  proficiency_level INTEGER DEFAULT 90,
  sort_order INTEGER DEFAULT 0
);
```

---

## 7. Master Prompts Siap Pakai untuk Google Stitch

Anda dapat menyalin prompt di bawah ini langsung ke Google Stitch untuk memproduksi rancangan visual secara terpisah atau bersamaan:

### Prompt 1: Halaman Publik (User Portfolio)
```text
Design a luxury, high-end theatrical Portfolio Website for "Prio Setyo - Creative Director & Visual Storyteller".
Style & Palette:
- Dark Warm Obsidian background (#0e0e12 and #131317)
- Volcanic Neon Vermilion glows (#ff571a and #ff7f1c)
- Warm off-white text (#e4e1e7 and #e6beb2) using Syne for bold headlines and Inter for clean body text
- Asymmetrical Modernist Bento Grid layout with refined glassmorphism (rgba(230, 190, 178, 0.12) borders)

Sections:
1. FIXED NAVBAR: Glassmorphic bar with "PS" orange monogram, center capsule nav (Karya, Filosofi, Toolkit, Pengalaman), and glowing "Mulai Diskusi" CTA pill.
2. HERO BANNER: Atmospheric radial glow, status pill with pulsing green dot "TERSEDIA UNTUK KOLABORASI Q2/Q3", headline "PRIO SETYO", 3 stats (10+ Tahun, 35+ Penghargaan, 120+ Proyek), and a cinematic 21:9 studio portrait banner with an acrylic floating atelier badge.
3. ABOUT BENTO GRID: Left card with bold design philosophy blockquote; right card with 4 strategic discipline rows (Creative Direction, Cinematography, Spatial Design, Copywriting).
4. CREATIVE TOOLKIT: Bento card showcasing Figma Spatials, Unreal Engine 5, DaVinci Resolve, Cinema 4D, and a 3D volumetric lighting artwork preview "Eksperimen Estetika Q1".
5. CURATED SHOWCASE (WORK GRID): 5 pill filter buttons (Semua, Fotografi, Videografi, Desain Grafis, Copywriting) and a 3-column grid with 16:11 cards featuring category badges, Syne bold titles, client tags, and floating orange hover arrows.
6. EXPERIENCE TIMELINE: Chronological cards for Studio Artefak, Global Kinetic Agency, Monolith Lab, and Neo Jakarta.
7. CONTACT SECTION: Atmospheric under-glow reflector, 3 interactive copy cards (Email, WhatsApp, LinkedIn) with 1-click copy feedback, and a big capsule consultation CTA button.
8. FOOTER: Studio location (Jakarta & Singapore), availability status, and social media links.
```

### Prompt 2: Halaman Admin (Atelier Studio CMS)
```text
Design an executive, studio-grade Creative Director CMS Dashboard called "Atelier CMS v2.0" for Prio Setyo.
Style & Palette:
- Deep obsidian backdrop (#0e0e12 and #131317), neon vermilion accents (#ff571a), Syne display fonts, and Inter body labels.
- Dual-view interface with high aesthetic precision.

Screens & Layout:
1. LOGIN SCREEN: Obsidian glass card with radial backdrop glows, "PS" studio monogram, prominent 1-click "Masuk Mode Demo Studio" button with a live green indicator, and sleek email/password fields.
2. DASHBOARD OVERVIEW:
   - Sticky header with "PS" monogram, live database indicator, link to public site, and dark/light toggle.
   - 4 KPI metric cards: Total Portofolio (6), Live Publik (6 with glowing green dot), Draf (0), and Keahlian & Karir (18).
   - Control Toolbar: Search bar, status segmented pills (Semua, Live, Draf), view mode toggle (Card Grid vs Compact Table), category oval pills with count badges, and glowing "+ Tambah Karya Baru" CTA button.
   - Dual-View Project List: 16:10 visual cards with category pills, client info, 1-click animated Live/Draft toggle switch, and edit/preview/delete action buttons.
3. 2-COLUMN PROJECT EDITOR:
   - Sticky top bar with Save button.
   - Left Column: 4 interactive discipline cards (Fotografi, Videografi, Desain Grafis, Copywriting), title and auto-slug input, client/year fields, narrative textareas, and category-specific technical specs (Camera/Lens/ISO or Resolution/FPS).
   - Right Column: A real-time "Live Preview Card" reflecting edits as the user types, media asset uploader with WebP & video poster support, and publish visibility switch.
4. CAREER & TOOLKIT MANAGER: Sub-tabs for managing timeline experiences and creative competencies.
```
