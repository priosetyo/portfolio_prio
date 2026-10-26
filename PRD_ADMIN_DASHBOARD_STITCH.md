# Product Requirements Document (PRD): Atelier Studio CMS (Admin Dashboard)
**Dokumen Spesifikasi Desain & Rekayasa Antarmuka untuk Google Stitch**

* **Produk:** Prio Setyo Portfolio — Atelier Studio CMS v2.0
* **Pemilik Produk:** Prio Setyo (Creative Director & Visual Storyteller)
* **Tanggal Dokumen:** 26 Oktober 2026
* **Status:** Siap Digunakan untuk Prototyping di Google Stitch

---

## 1. Visi Produk & Filosofi Desain (Creative Direction)

### 1.1 Visi Utama
Membangun sebuah antarmuka **Executive Creative Director CMS** yang melampaui tampilan admin database konvensional (tabel kaku dan formulir datar). Admin ini dirancang sebagai **"Digital Atelier"**—sebuah ruang kurasi visual premium yang memberikan *feedback* visual seketika (*real-time preview*), kontrol 1-klik yang intuitif, serta estetika visual yang selaras 100% dengan portofolio publik Prio Setyo (*Warm Obsidian & Volcanic Vermilion*).

### 1.2 Filosofi Estetika (The Stitch Aesthetic)
* **Warna Dasar:** Warm Obsidian (`#131317`, `#0e0e12`, `#1b1b1f`) dengan sentuhan kontras permukaan gelap berlapis (*elevated surfaces*).
* **Warna Aksen:** Volcanic Vermilion (`#ff571a` ke `#ff7f1c`) dengan efek pendaran ambient (*neon glow*).
* **Tipografi:** 
  * Headings & Angka Metrik: **Syne** (Geometris, ekspresif, berbobot 700–900).
  * Body Text & Label: **Inter** (Presisi, netral, keterbacaan tinggi pada ukuran mikro).
  * Monospace / Slug / Kodifikasi: **JetBrains Mono**.
* **Finishing Visual:** *Glassmorphism* halus (`backdrop-filter: blur(20px)`), sudut membulat modern (`border-radius: 1rem` hingga `1.5rem`), serta garis batas halus transparan (`rgba(230, 190, 178, 0.12)`).

---

## 2. Arsitektur Layar & Alur Pengguna (User Journey)

Dashboard Admin terdiri dari **4 layar utama** yang harus diproduksi pada Stitch:

```
[Layar 1: Login Studio Portal]
       │
       ▼ (Autentikasi Sukses / 1-Klik Demo)
[Layar 2: Executive Dashboard & Manajemen Karya] ──(Klik Preview)──► [Modal: Quick Preview]
       │                                         ──(Toggle View)──► [Mode Tabel Data Kompak]
       ├──► [Layar 3: Editor Karya 2-Kolom (Add / Edit)] ◄── (Live Preview Real-time)
       │
       └──► [Layar 4: Kurasi Karir & Creative Toolkit]
```

---

## 3. Spesifikasi Detail Setiap Layar (Screen Specifications)

### Layar 1: Portal Masuk Studio (`/admin/login`)
* **Tujuan:** Gerbang masuk eksklusif terenkripsi untuk Prio Setyo dengan opsi akses uji coba instan (*Demo Bypass*).
* **Komponen & Tata Letak:**
  1. **Latar Belakang:** Deep Charcoal `#0e0e12` dengan dua orbe pendaran radial dinamis (oranye pudar `rgba(255, 87, 26, 0.16)`).
  2. **Kartu Tengah (Glassmorphic Obsidian Card):**
     * Lebar maksimal: `460px`, padding: `2.5rem`, sudut: `1.5rem`.
     * Batas: `1px solid rgba(230, 190, 178, 0.15)`.
  3. **Header Kartu:**
     * Tombol pil sudut kiri atas: `← Kembali ke Portofolio Publik`.
     * Lencana keamanan kanan atas: `ShieldCheck Studio Portal`.
     * Monogram Studio: Kotak gradien oranye `PS` (font Syne 900) dengan bayangan pendaran neon.
     * Judul: `Atelier CMS` (Syne 800) + Subjudul: *"Sistem manajemen portofolio eksklusif untuk kurasi karya visual, media, dan narasi kreatif Prio Setyo."*
  4. **Pill Aksi Cepat (Highlight UX):**
     * Kotak bergradien dengan lampu indikator hijau berdenyut (*pulsing green dot*).
     * Tombol utama bergradien penuh: `⚡ Masuk Mode Demo Studio` (1-Klik akses cepat tanpa mengetik sandi).
  5. **Formulir Kredensial (Alternatif):**
     * Field Surel dengan ikon `Mail`.
     * Field Kata Sandi dengan ikon `Lock` dan tombol toggle `Eye / EyeOff`.
     * Tombol `Masuk dengan Kredensial`.
     * Footer lencana enkripsi Supabase RLS.

---

### Layar 2: Executive Dashboard & Manajemen Karya (`/admin`)
* **Tujuan:** Pusat komando untuk memantau performa portofolio, menyaring karya, menerbitkan draf, serta menata urutan karya di beranda.
* **Komponen & Tata Letak:**

#### A. Sticky Glassmorphic Header (Top Navigation)
* **Kiri:** Avatar Monogram `PS`, Teks Brand `PRIO SETYO`, Tag `Atelier CMS v2.0`, dan pil status database dengan lampu menyala:
  * 🟢 `Database Terhubung` (Hijau) atau 🟠 `Mode Demo Aktif` (Kuning).
* **Kanan:** 
  * Tombol pil `Lihat Web Publik ↗`
  * Tombol bulat *Theme Switcher* (Sun / Moon)
  * Tombol aksen merah lembut `Keluar` (LogOut)

#### B. 4 Kartu Metrik KPI (Hero Stats Grid)
Grid 4 kolom responsif dengan kartu bergaya obsidian:
1. **Total Portofolio:** Ikon `FolderKanban`, Angka besar font Syne, Keterangan: *"Semua Arsip Visual"*.
2. **Karya Live Publik:** Ikon `Sparkles`, Angka hijau menyala `#34d399`, Lampu dot berdenyut, Keterangan: *"Tampil aktif di web"*.
3. **Draf / Tersembunyi:** Ikon `EyeOff`, Angka abu-abu, Keterangan: *"Hanya diakses admin"*.
4. **Keahlian & Karir:** Ikon `Layers`, Angka peach `#ffb59e`, Keterangan: *"X karir • Y toolkit"*.

#### C. Segmented Navigation & Action Bar
* **Pills Tab Kiri:**
  * `[FolderKanban] Portofolio Karya (6)`
  * `[FileText] Karir & Toolkit Studio (18)`
* **Tombol Aksi Kanan:**
  * Tombol kapsul besar oranye menyala dengan ikon `+ Tambah Karya Baru` (memiliki efek hover terangkat *-1px*).

#### D. Toolbar Kontrol & Filter
* **Pencarian Real-Time:** Input teks dengan ikon kaca pembesar dan tombol 'X' pembersih instan.
* **Filter Status Kapsul:** Pilihan segmented: `Semua Status` | `Live` | `Draf`.
* **Toggle Tampilan:** Tombol alih antara `[LayoutGrid] Kartu` dan `[Table] Tabel`.
* **Pil Kategori Karya:** Kapsul oval dinamis:
  * `Semua Kategori (6)`
  * `Fotografi (2)`
  * `Videografi (1)`
  * `Desain Grafis (2)`
  * `Copywriting (1)`

#### E. Tampilan 1: Grid Kartu Visual (Default Creative View)
Setiap karya ditampilkan sebagai kartu visual rasio `16:10`:
* **Thumbnail Visual:** Menampilkan foto karya kualitas tinggi dengan overlay gradien lembut.
* **Badge Kategori:** Menempel di kiri atas (`FOTOGRAFI`, `VIDEOGRAFI`, `DESAIN GRAFIS`, `COPYWRITING`).
* **Badge Urutan:** Menempel di kanan atas (Contoh: `Urutan #1`).
* **Klien & Tahun:** Teks mengambang di bawah thumbnail (Contoh: `Spatial Labs Tokyo • 2026`).
* **Konten Teks:** Judul karya (Syne Bold), URL Slug (`/nova-spatial-os`), dan ringkasan 2 baris.
* **1-Klik Toggle Publikasi:** Sakelar interaktif dengan lampu indikator hijau `Live` atau abu-abu `Draf`.
* **Action Buttons:** Ikon mata (Quick Preview), Tombol `Edit`, dan Ikon tong sampah (Hapus).

#### F. Tampilan 2: Tabel Data Kompak
Untuk pengguna yang menginginkan tampilan tabel dengan efisiensi tinggi:
* Kolom: Urutan (`#1`), Thumbnail & Judul + Slug, Kategori (Badge), Klien & Tahun, Status (Toggle 1-klik), dan Aksi.

#### G. Modal Quick Preview (Pop-up Lightbox)
* Muncul saat mengklik tombol mata pada karya.
* Menampilkan gambar rasio `16:9`, judul besar, slug, metadata klien, kutipan narasi, serta tombol langsung `Buka Editor Karya`.

---

### Layar 3: Studio Project Editor 2-Kolom (`/admin/projects/edit`)
* **Tujuan:** Formulir terstruktur dengan sistem umpan balik visual (*Live Preview*) seketika.
* **Tata Letak 2 Kolom:**

#### Sticky Top Header Bar
* Tombol: `← Kembali ke Daftar`
* Judul Dokumen: `Ubah Karya: [Judul]` atau `Buat Entri Karya Baru`
* Tombol Aksi: `Batal` dan `Simpan Perubahan (Ctrl+S)` dengan gradien oranye menyala.

#### Kolom Kiri: Formulir Data & Storytelling (60% Lebar Layar)
1. **Pemilih Kategori Visual:** 4 kartu interaktif ber-ikon:
   * 📷 Fotografi (*Editorial, Fashion, Still Life*)
   * 🎬 Videografi (*Commercial, Cinematic, 3D Motion*)
   * 🎨 Desain Grafis (*Spatial UI/UX, Visual Identity*)
   * ✍️ Copywriting (*Brand Storytelling, Tagline*)
2. **Identitas Judul & URL:**
   * Input Judul Karya.
   * Input Slug Otomatis dengan awalan tanda `/`.
3. **Metadata Klien & Produksi:**
   * Klien / Brand, Tahun Rilis, dan Peran Utama (*e.g. Creative Director*).
4. **Narasi & Storytelling:**
   * Ringkasan Singkat (*Summary*) untuk kartu beranda (maksimal 2 baris).
   * Deskripsi Lengkap / Naskah Copywriting (*Long-form story*).
5. **Spesifikasi Teknis Dinamis (JSONB):**
   * *Jika Foto:* Kamera, Lensa, Aperture, Shutter Speed, ISO.
   * *Jika Video:* Resolusi (e.g. 4K DCI), FPS, Color Grading, Durasi.
   * *Jika Desain:* Software (Figma, Blender), Deliverables, Typefaces.
   * *Jika Copywriting:* Kanal Distribusi, Tone of Voice, Metrik Impact.

#### Kolom Kanan: Live Preview & Manajemen Aset (40% Lebar Layar)
1. **Live Studio Card Preview (Fitur Unggulan UX):**
   * Menampilkan miniatur kartu persis seperti yang akan tampil di halaman portofolio publik.
   * Thumbnail otomatis berganti saat file diunggah.
   * Judul, kategori, klien, dan ringkasan langsung ter-update secara *real-time* saat admin mengetik di kolom kiri!
2. **Pengunggah Media & Video:**
   * Area drag-and-drop file foto / video.
   * Sistem kompresi WebP otomatis (800px untuk thumb, 2400px untuk full-res).
   * Generator poster frame video otomatis.
   * Opsi tautan embed video YouTube & Vimeo.
3. **Pengaturan Visibilitas & Urutan:**
   * Sakelar besar: `Terbitkan ke Galeri Publik` (Live vs Draf).
   * Input Angka Urutan Tampilan (*Sort Order*).

---

### Layar 4: Kurasi Karir & Creative Toolkit (`/admin/content`)
* **Tujuan:** Mengelola riwayat pengalaman profesional dan daftar keahlian tanpa menyentuh kode.
* **Tata Letak:**
  * **Sub-Tab Kapsul:** `Riwayat Pengalaman (4)` | `Toolkit & Kompetensi (14)`
  * **Sisi Kiri:** Daftar kartu linimasa karir (Peran, Studio/Agensi, Periode, Poin Pencapaian) atau kartu toolkit dengan badge kategori.
  * **Sisi Kanan:** Formulir penambahan/pengeditan instan dengan tombol simpan.

---

## 4. Panduan Desain Token untuk Google Stitch

Gunakan token desain berikut sebagai acuan styling ketika membuat komponen di Stitch:

| Elemen Token | Nilai Hex / CSS | Penggunaan di Stitch |
| :--- | :--- | :--- |
| `surface-lowest` | `#0e0e12` | Warna latar belakang layar penuh |
| `surface-low` | `#131317` | Latar belakang kartu media & form input |
| `surface-container` | `#1b1b1f` | Warna kartu utama & modal dialog |
| `surface-high` | `#2a292e` | Efek hover kartu & baris tabel |
| `primary-container` | `#ff571a` | Warna aksen utama, tombol CTA, border aktif |
| `secondary-container` | `#ff7f1c` | Warna gradien sekunder |
| `on-surface` | `#e4e1e7` | Warna teks judul utama (putih pudar elegan) |
| `on-surface-variant` | `#e6beb2` | Warna teks isi & deskripsi (peach lembut) |
| `outline` | `rgba(230, 190, 178, 0.12)` | Garis tepi (*border*) kartu & divider |
| `badge-live` | `#10b981` / `rgba(16, 185, 129, 0.15)` | Lampu indikator status online & publish |
| `radius-card` | `1.25rem` (20px) | Sudut kartu dashboard & form |
| `radius-pill` | `9999px` | Seluruh tombol filter, switch, dan badge |
| `font-display` | Syne (Bold 800) | Judul dashboard, angka metrik, judul karya |
| `font-body` | Inter (Regular 400, Medium 500) | Label input, navigasi, paragraf deskripsi |

---

## 5. Master Prompt Siap Pakai untuk Google Stitch

Salin dan tempel prompt di bawah ini langsung ke dalam kolom prompt Google Stitch untuk menghasilkan desain antarmuka dashboard admin yang presisi:

```text
Design a luxury, high-end Creative Director Admin Dashboard for "Prio Setyo - Atelier Studio CMS v2.0". 
Theme & Palette:
- Deep obsidian and charcoal background (#0e0e12 and #131317)
- Volcanic neon vermilion accents (#ff571a and #ff7f1c)
- Warm peach-white typography (#e4e1e7 and #e6beb2) using Syne for bold headlines and Inter for clean body labels
- Ultra-refined glassmorphism with subtle borders (rgba(230, 190, 178, 0.12)) and soft ambient orange glows

Layout & Screens to include:
1. TOP NAVBAR: Fixed glassmorphic header with an orange gradient "PS" monogram badge, title "PRIO SETYO / Atelier CMS v2.0", a glowing green status badge "Database Terhubung", a pill button "Lihat Web Publik ↗", dark/light toggle, and a sleek sign-out button.
2. HERO METRICS (4 CARDS): 
   - "Total Portofolio" with folder icon and large bold stat "6"
   - "Live Publik" with glowing green live dot and bold stat "6"
   - "Draf / Tersembunyi" with eye-off icon and stat "0"
   - "Keahlian & Karir" with layers icon and stat "18"
3. TOOLBAR CONTROLS:
   - Search input box with search icon and clear button
   - Segmented status pill filter (Semua, Live, Draf)
   - Dual view toggle (Card Grid icon vs Table List icon)
   - Category oval pill filter with counters: "Semua Kategori (6)", "Fotografi (2)", "Videografi (1)", "Desain Grafis (2)", "Copywriting (1)"
   - Prominent glowing orange CTA button "+ Tambah Karya Baru"
4. WORK SHOWCASE GRID (DUAL VIEW):
   - 3-column card grid with 16:10 aspect ratio visual thumbnails, category badge on top-left, sort order "#1" on top-right, client and year info, Syne bold title, monospace slug, 1-click animated Live/Draft status switch with green indicator, and action buttons (Preview eye icon, Edit button, Delete icon).
5. 2-COLUMN PROJECT EDITOR VIEW:
   - Sticky header with back button and "Simpan Perubahan" CTA.
   - Left Column: 4 interactive discipline cards (Fotografi, Videografi, Desain Grafis, Copywriting) with distinct icons, title and auto-slug inputs, client/year/role inputs, summary and narrative textarea, and dynamic technical specs (Camera, Lens, ISO / Resolution, FPS).
   - Right Column: A real-time "Live Preview Card" showing exactly how the showcase card looks in the public portfolio, integrated drag-and-drop media uploader, and publish toggle switch.

Ensure the entire UI looks theatrical, editorial, extremely premium, and perfectly tailored for an international Creative Director.
```

---

## 6. Kriteria Keberhasilan & Penerimaan (Acceptance Criteria)

1. **Konsistensi Visual:** Estetika antarmuka admin terasa seperti bagian dari satu kesatuan produk yang sama dengan web portofolio publik (`Desain Stitch.md`).
2. **Keterbacaan & Hirarki:** Informasi penting (status publikasi, judul karya, kategori, metrik live) dapat dipindai dalam waktu kurang dari 3 detik.
3. **Efisiensi Alur Kurasi:** Menambah karya baru atau mengubah status *Draf* ke *Live* dapat diselesaikan dalam waktu kurang dari 60 detik.
4. **Umpan Balik Visual (Visual Feedback):** Terdapat pratinjau kartu langsung (*Live Preview*) sebelum karya diterbitkan ke publik.
5. **Responsif & Aksesibilitas:** Seluruh tombol dan kontrol navigasi memiliki target sentuh minimal `44x44px` dan tetap nyaman digunakan di perangkat tablet/laptop.
