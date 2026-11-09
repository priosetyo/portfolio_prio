import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Play,
  Plus,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import { getStoragePublicUrl } from '../../lib/queries';

const HELVETICA_STACK = "'Helvetica Neue', Helvetica, Arial, sans-serif";

// 7 Proyek Kurasi Sinematik untuk Masing-Masing Disiplin (Total 28 Karya)
export const DISCIPLINE_GALLERY_DATA = {
  photo: {
    disciplineKey: 'photo',
    name: 'Photography',
    badge: 'Commercial & Industrial Photography',
    themeColor: '#00529B',
    accentColor: '#38bdf8',
    summary: 'Presisi visual skala industri energi, dokumentasi kilang migas, infrastruktur maritim, dan potret korporat komersial.',
    projects: [
      {
        id: 'photo-1',
        title: 'Refinery Twilight Operations',
        category: 'Kilang & Industri',
        client: 'PT Pertamina Patra Niaga RU II',
        year: '2025',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368810064-9uc6.jpg',
        synopsis: 'Dokumentasi monumental unit distilasi kilang minyak Dumai pada golden hour, menangkap interaksi struktur baja raksasa dengan pencahayaan operasional malam.',
        story: 'Mengabadikan dinamika operasi kilang minyak 24/7 di pesisir Selat Malaka. Menggunakan teknik long-exposure berstandar keselamatan kilang minyak zona ATEX untuk memotret flare stack dan unit fraksinasi tanpa mengorbankan ketajaman detail struktural.',
        deliverables: ['Foto Hero Komersial Kalender Perusahaan', 'Aset Visual Laporan Keberlanjutan Tahunan', 'Arsip Digital Humas Pertamina'],
        specs: ['Sony Alpha 7R V (61MP)', 'FE 24-70mm f/2.8 GM II', 'Raw 14-bit Uncompressed', 'Tripod Karbon Anti-Static'],
        metrics: 'Dijadikan visual utama laporan korporat & pameran energi nasional.'
      },
      {
        id: 'photo-2',
        title: 'Offshore Marine Terminal & Fleet',
        category: 'Maritim & Logistik',
        client: 'PT Pertamina Patra Niaga',
        year: '2025',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368701318-a4eb.jpg',
        synopsis: 'Visualisasi presisi transfer energi maritim dari dermaga khusus kilang Dumai menuju armada kapal tanker di jalur pelayaran tersibuk dunia.',
        story: 'Pemotretan dilakukan dari tugboat pendamping saat manuver sandar kapal tanker minyak mentah berbobot mati puluhan ribu ton. Mengutamakan komposisi leading lines haluan kapal dengan latar kilang.',
        deliverables: ['Dokumentasi Armada Maritim Nasional', 'Materi Publikasi Media Nasional', 'Visual Kampanye Ketahanan Energi'],
        specs: ['FE 70-200mm f/2.8 GM OSS II', 'Filter Polarizer CPL B+W', 'Shutter 1/1600s Dynamic Tracking'],
        metrics: 'Liputan featured di portal berita nasional & majalah maritim BUMN.'
      },
      {
        id: 'photo-3',
        title: 'Turnaround Engineering Precision',
        category: 'Inspeksi & Engineering',
        client: 'Refinery Unit Dumai',
        year: '2024',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368636694-7mq2.jpg',
        synopsis: 'Liputan intensif pemeliharaan berkala komponen krusial kilang dengan disiplin keselamatan kerja (HSSE) tanpa kompromi.',
        story: 'Turnaround adalah momen sakral pemeliharaan menyeluruh kilang. Melibatkan ribuan engineer dan teknisi ahli. Dokumentasi berfokus pada ketelitian visual pengerjaan reaktor kolom perengkahan suhu tinggi.',
        deliverables: ['Buku Dokumentasi Turnaround 2024', 'Arsip Audit Keselamatan Kerja', 'Video Still Sequence'],
        specs: ['FE 16-35mm f/2.8 GM II', 'HSSE ATEX Certified Zone Kit', 'Color Calibrated X-Rite'],
        metrics: 'Mendokumentasikan lebih dari 2.000 titik kerja kritis tanpa insiden.'
      },
      {
        id: 'photo-4',
        title: 'Perwira Energi Executive Portrait',
        category: 'Komersial & Portret',
        client: 'PT Pertamina (Persero)',
        year: '2025',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368767298-jnio.jpg',
        synopsis: 'Seri potret editorial kepemimpinan operator garda depan dan jajaran manajemen dengan rim lighting studio yang tegas dan berwibawa.',
        story: 'Menyoroti aspek humanis di balik industri berteknologi tinggi. Menangkap sorot mata optimisme pekerja energi Nusantara yang berdedikasi menjaga suplai energi Indonesia.',
        deliverables: ['Editorial Portraiture Direksi & Pekerja', 'Billboard & Media Komunikasi Internal', 'Profil Media Cetak Humas'],
        specs: ['Sony Alpha 1', 'FE 85mm f/1.4 GM', 'Elinchrom Mobile Battery Strobes', 'Softbox 120cm Octa'],
        metrics: 'Digunakan pada seluruh media internal & signage resmi korporat.'
      },
      {
        id: 'photo-5',
        title: 'Mangrove Coastal Conservation',
        category: 'ESG & Lingkungan Hidup',
        client: 'Pertamina RU II Dumai',
        year: '2024',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368839399-7ioy.jpg',
        synopsis: 'Eksplorasi narasi visual program tanggung jawab sosial lingkungan (TJSL) rehabilitasi ekosistem hutan bakau pesisir Riau.',
        story: 'Menggambarkan keseimbangan antara aktivitas kilang dengan pelestarian keanekaragaman hayati mangrove. Bekerja sama dengan kelompok tani lokal dalam aksi penanaman puluhan ribu bibit.',
        deliverables: ['Foto Booklet Laporan ESG Pertamina', 'Galeri Pameran Hari Lingkungan Hidup', 'Aset Siaran Pers Media Hijau'],
        specs: ['FE 24mm f/1.4 GM', 'Natural Light HDR Multi-Exposure', 'Drone Hasselblad Sensor'],
        metrics: 'Mendukung perolehan PROPER Emas dari Kementerian LHK.'
      },
      {
        id: 'photo-6',
        title: 'Spherical Geometry & Storage',
        category: 'Arsitektur Industri',
        client: 'Infrastruktur Migas',
        year: '2024',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw-HjHTxu0iiEQ5z7YvjAbVP9wfRoOcfUb13m1mFshL5HU6LfmOEyk_w9r7ILa2sS5f7YN6AT4xK9vAXIfYQRiV0s1IagWRXCZndw5C-09Y5hCK0pIeBZtWRgQ8ROcmnmez5qemMezfiQ9P0sdjBnbsAJkJRPodhoCrxzeh-quGgzLEdorxq0VQtnxJF_SLz3-iHG5jz2SojHZd69KaE4NN6YwL2UGlbXJTZ00ZV8',
        synopsis: 'Kajian geometri simetris tangki penyimpanan bola (spherical tank) di bawah langit senja dengan ritme pipa industrial kontras tinggi.',
        story: 'Menemukan keindahan seni dalam infrastruktur mekanis. Menggunakan lensa tilt-shift perspektif lurus untuk menjaga garis tegak vertikal tanpa distorsi optik sudut lebar.',
        deliverables: ['Koleksi Seni Visual Korporat', 'Poster Pameran Fotografi Industri', 'Aset Kalender Eksekutif'],
        specs: ['Schneider 35mm Tilt-Shift', 'Full Frame 100% Optical Flat', 'ISO 50 Ultra Low Noise'],
        metrics: 'Dipilih sebagai foto sampul buku arsip rekayasa kilang.'
      },
      {
        id: 'photo-7',
        title: 'Emergency Response Drill & Action',
        category: 'HSSE & Tanggap Darurat',
        client: 'Emergency Response Team',
        year: '2025',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJJWJQHqgaJrmmXgNkWqjiPjVu7ZXUY93Ukc-HYliONfsYpK_nSAnrYbzGboJ0gyL8MSQnESy0w6V8M6mAAlq-Zh1zMtIsBlD2evEHv5yejd9hJk4BSVDi0ZThWFhJ2xzbDkXnZQ-qPEqNJyWPJc7Xiec9xXS4QrDZqG2jWs0Eg49tPpt08SC6Lc3RGOU5LszmeDEkUa64Dfvu31LzCX-tPZBOsWCs6Kz2FuKgrtU',
        synopsis: 'Aksi dramatis simulasi pemadaman kebakaran kilang skala besar oleh tim Fire & Safety dengan semprotan busa kimia berkecepatan tinggi.',
        story: 'Menangkap aksi dinamis di tengah panasnya simulasi api dan uap air bertekanan tinggi. Memerlukan perlindungan kamera khusus serta timing rana cepat untuk membekukan partikel busa.',
        deliverables: ['Dokumentasi Standar Kesiapsiagaan Darurat', 'Materi Video & Foto Pelatihan Tim Pemadam', 'Sosialisasi Budaya Keselamatan'],
        specs: ['1/4000s High Speed Shutter', 'Weather-Sealed Magnesium Body', 'FE 135mm f/1.8 GM'],
        metrics: 'Dipuji oleh pimpinan fungsi HSSE sebagai foto aksi drill terbaik tahun ini.'
      }
    ]
  },
  video: {
    disciplineKey: 'video',
    name: 'Videography',
    badge: 'Broadcast & Corporate Cinema',
    themeColor: '#ED1C24',
    accentColor: '#f87171',
    summary: 'Sinematografi korporat berstandar broadcast, drone aerial bersertifikasi, commercial anthem, dan video dokumenter peraih penghargaan nasional AHI.',
    projects: [
      {
        id: 'video-1',
        title: 'Pertamina Patra Niaga Anthem',
        category: 'Cinema Commercial',
        client: 'PT Pertamina Patra Niaga',
        year: '2025',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368810064-9uc6.jpg',
        synopsis: 'Video manifesto komersial energi skala nasional yang menggabungkan rekaman operasi kilang darat dan armada laut dengan orkestrasi epik.',
        story: 'Menjadi sutradara visual dan lead sinematografer untuk peluncuran anthem resmi. Memadukan warna sinematik ACES DaVinci Resolve dengan pacing dinamis 24fps film anamorphic.',
        deliverables: ['Video Anthem Komersial TV & Bioskop 90s', 'Cutdown Media Sosial 30s & 15s', 'Original Score Audio Master'],
        specs: ['RED V-Raptor 8K VV Cinema', 'Cooke Anamorphic /i Prime Lenses', 'ACES 2065-1 Color Pipeline'],
        metrics: 'Ditayangkan pada seluruh perhelatan resmi dan kanal digital BUMN nasional.'
      },
      {
        id: 'video-2',
        title: 'Beyond Zero Incident (HSSE Film)',
        category: 'Dokumenter Keselamatan',
        client: 'Pertamina RU II Dumai',
        year: '2024',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368701318-a4eb.jpg',
        synopsis: 'Film dokumenter pendek tentang komitmen pekerja garda depan dalam menjaga nihil kecelakaan kerja (Zero Incident) di lingkungan kilang.',
        story: 'Menghindari kesan edukasi kaku dengan menyajikan cerita dari sudut pandang keluarga pekerja yang menanti kepulangan mereka dengan selamat di rumah.',
        deliverables: ['Film Edukasi Induksi Keselamatan', 'Versi Bahasa Indonesia & Inggris', 'Materi Briefing Harian ToolBox'],
        specs: ['Sony FX9 Full-Frame 6K', 'Fujinon MK Cinema Zoom', 'Sennheiser Wireless Audio Pro'],
        metrics: 'Mencapai skor evaluasi pemahaman keselamatan 98.4% bagi ribuan mitra kerja.'
      },
      {
        id: 'video-3',
        title: 'Selat Malaka Aerial Symphony',
        category: 'Sinematografi Drone',
        client: 'Corporate Communication',
        year: '2025',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368839399-7ioy.jpg',
        synopsis: 'Karya sinema udara yang menangkap geometri armada kapal tanker saat berlayar di jalur pelayaran energi tersibuk Selat Malaka.',
        story: 'Penerbangan drone komersial berizin resmi di area maritim restricted. Mengikuti pergerakan kapal dengan koordinasi radio navigasi pelabuhan untuk angle sinematik terukur.',
        deliverables: ['Kompilasi B-Roll 4K ProRes 422HQ', 'Video Showcase Pameran Maritim', 'Aset Grafis Pembuka Video Profil'],
        specs: ['DJI Inspire 3 (8K Full Frame)', 'DL 24mm, 35mm, 50mm Cinema Lenses', 'CineCore 3.0 Processing'],
        metrics: 'Ditayangkan pada International Maritime Forum di Bali.'
      },
      {
        id: 'video-4',
        title: 'Turnaround: The Pulse of Energy',
        category: 'Video Profil Turnaround',
        client: 'Refinery Unit Dumai',
        year: '2024',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368636694-7mq2.jpg',
        synopsis: 'Film dokumenter mendalam yang merekam kerja keras tanpa henti para insinyur kilang selama 35 hari siklus pemeliharaan akbar.',
        story: 'Kamera berada di tengah percikan api pengelasan reaktor dan perakitan turbin raksasa, mengabadikan keringat dan keahlian teknis tingkat tinggi para perwira kilang.',
        deliverables: ['Video Dokumenter Panjang 18 Menit', 'Highlight Reel Berita Resmi', 'Arsip Sejarah Turnaround Kilang'],
        specs: ['ARRI Alexa Mini LF', 'Cooke Panchro Classic Primes', 'Sound Design 5.1 Surround'],
        metrics: 'Meraih sambutan kehormatan dalam penutupan Turnaround oleh Dewan Direksi.'
      },
      {
        id: 'video-5',
        title: 'Anugrah Humas Indonesia Winner Film',
        category: 'Penghargaan Nasional',
        client: 'Pertamina RU II Dumai',
        year: '2024',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368767298-jnio.jpg',
        synopsis: 'Video profil korporat strategis yang memenangkan Anugrah Humas Indonesia (AHI) sebagai karya komunikasi publik terbaik kategori BUMN.',
        story: 'Menyatukan pesan ketahanan energi, kepedulian lingkungan, dan inovasi anak bangsa dalam kemasan visual puitis dan menggetarkan hati dewan juri.',
        deliverables: ['Master Submission Video AHI 2024', 'Laporan Presentasi Studi Kasus', 'Piala & Piagam Penghargaan'],
        specs: ['RED Cinema Camera', 'Angenieux Optimo Zoom', 'Color Grading Baselight'],
        metrics: 'Pemenang Kategori Utama Video Profil Terpuji Anugrah Humas Indonesia.'
      },
      {
        id: 'video-6',
        title: 'Lumina Narrative Cinematic',
        category: 'Cinema Narrative',
        client: 'Creative Lab Studio',
        year: '2024',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQDL8KyX67MLyaR7WRfaYFlh9D3zIMs9-FgF-5WUMaZP98VJN0u0HWQnagcNiYU21us6WzS1dos1hALtR8p9j1Y1cJS6p7Y5y8PF80Vcr0kUHLBjdnwxTe2og09FZy-SgOiug8FWF4K8yPNODiqBk7_L-EoD4JSpFPMnDuzUUCTGGo1s70qVEUA80yLgJdIy2XO46DFN7rIdbSRUJopu4F23RB7b9BsrukJGrePAc',
        synopsis: 'Eksplorasi sinema naratif pendek chiaroscuro kontras tinggi dan pencahayaan volumetrik di malam hari perkotaan.',
        story: 'Karya eksperimental mengeksplorasi kedalaman bayangan dan atmosfer misterius untuk memperkaya perbendaharaan visual komersial.',
        deliverables: ['Short Film Festival 4K Master', 'Color Grading Breakdown Video', 'Stills Photography Catalog'],
        specs: ['Cooke S4/i Cinema Primes', 'Volumetric Fog Systems', 'ACEScg Linear Workflow'],
        metrics: 'Masuk dalam kurasi pameran visual indie art nusantara.'
      },
      {
        id: 'video-7',
        title: 'Community Empowerment Voices',
        category: 'ESG CSR Video',
        client: 'TJSL Pertamina Dumai',
        year: '2025',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOa2CZ7oJQpqn24tmFYPG-ipuAF3HbDXddDuzTXTZAyrz6xjDOt8yFhNRKAkgRmmKn_3QxK46zh2_b-h-2PhTyVYBzsVN65eou6dmKd4O_qZwRSwaU5k3tsRRZoV04gACDu0yG9lCCXLgVYWiFyCr-CGC8IHce3IttCfbl-wafpe7Vr5dh2EOaWiOF-_5xa6I5-wae3cbmqwVwku8JQRBHQ17xgv0hTGBrIAocOJg',
        synopsis: 'Dokumentasi suara hati masyarakat pesisir dan petani binaan CSR yang kini mandiri secara ekonomi berkat program berkelanjutan.',
        story: 'Wawancara hangat dan tanpa rekayasa, membingkai senyum ketulusan warga desa dalam narasi pemberdayaan yang menyentuh.',
        deliverables: ['Serial Video Mini-Doc 4 Episode', 'Konten Reels Edukasi ESG', 'Dokumentasi Audit Kemenko'],
        specs: ['Sony FX6 Dual Base ISO', 'Rode Wireless Pro 32-bit Float', 'Natural Sunlight Diffusers'],
        metrics: 'Ditonton lebih dari 250.000 kali di kanal media sosial korporat.'
      }
    ]
  },
  design: {
    disciplineKey: 'design',
    name: 'Graphic Design',
    badge: 'Swiss Modernist & Visual Identity',
    themeColor: '#7AC142',
    accentColor: '#86efac',
    summary: 'Sistem identitas visual terstruktur berdisiplin Swiss Modernist, desain editorial laporan korporat, infografis industri presisi tinggi, dan panduan brand komersial.',
    projects: [
      {
        id: 'design-1',
        title: 'Corporate Sustainability Report',
        category: 'Desain Editorial',
        client: 'PT Pertamina Patra Niaga',
        year: '2025',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368767298-jnio.jpg',
        synopsis: 'Desain tata letak laporan keberlanjutan 180 halaman dengan disiplin grid Swiss, tipografi Helvetica modern, dan visualisasi data ESG berstandar GRI.',
        story: 'Mengubah lembaran data emisi karbon dan metrik lingkungan yang rumit menjadi buku laporan berestetika tinggi yang mudah dipahami investor institusional dan publik.',
        deliverables: ['Buku Laporan Cetak Hardcover Eksklusif', 'Versi Digital Interaktif PDF', 'Infografis Ringkasan Eksekutif'],
        specs: ['Adobe InDesign Grid Master', 'Helvetica Neue Bold Typography', 'Pantone Spot Color Printing'],
        metrics: 'Mendapat apresiasi tertinggi dalam peninjauan tata kelola ESG regional.'
      },
      {
        id: 'design-2',
        title: 'Refinery Spatial Infographic System',
        category: 'Infografis Teknis',
        client: 'Humas Kilang Dumai',
        year: '2024',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368810064-9uc6.jpg',
        synopsis: 'Peta visual sistematis alur pengolahan minyak mentah menjadi BBM dan produk petrokimia bernilai tambah tinggi di Kilang Dumai.',
        story: 'Menyederhanakan diagram piping and instrumentation (P&ID) pabrik menjadi ilustrasi isometrik yang artistik dan informatif untuk materi edukasi tamu VIP dan menteri.',
        deliverables: ['Wall Display 6x2 Meter Ruang Kontrol', 'Flyer Edukasi Kunjungan Kerja', 'Format Vektor Modular'],
        specs: ['Adobe Illustrator Vector Precision', 'Isometric Grid System', 'Micro-Typography Scale'],
        metrics: 'Terpasang permanen di lobi VIP Kilang Dumai sebagai pusat orientasi tamu kenegaraan.'
      },
      {
        id: 'design-3',
        title: 'HSSE Golden Rules Iconography',
        category: 'Sistem Piktogram',
        client: 'Fungsi HSSE Pertamina',
        year: '2024',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368636694-7mq2.jpg',
        synopsis: 'Perancangan ulang sistem simbol keselamatan kerja kilang dengan tingkat keterbacaan instan dalam kondisi pencahayaan darurat.',
        story: 'Mengembangkan piktogram berbobot garis 3px dengan geometri universal agar pesan keselamatan dapat langsung dicerna sekilas oleh seluruh pekerja multi-bahasa.',
        deliverables: ['Font Piktogram Keselamatan Khusus', 'Signboard Lapangan Standar ISO', 'Buku Panduan Standarisasi Simbol'],
        specs: ['Optical Size Icon Testing', 'High Contrast Color Palette (RAL)', 'Screen Print Ready Vectors'],
        metrics: 'Diterapkan di lebih dari 400 papan instruksi keselamatan di seluruh unit operasi.'
      },
      {
        id: 'design-4',
        title: 'Annual Energy Summit Brand Identity',
        category: 'Brand Identity',
        client: 'Indonesian Energy Forum',
        year: '2025',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEofPaya-ZGWveRCDy8cNUJRN_N5NCwX8ngR_QWgpEBmZTMQSRSh6bxRyttNiIroK5QcXboYpJxqPZs9QkCWZcOtUeAGvDkKGmo-uebF1mBjT3YA7YmeL8Csg_uPYRVhbCmdunD9DPNpU9f3Sb3ARiTfkBAzuu8v5JuA6WzP9sHblTo2IT7q4-IVdBGZ-q_-tkeuAJxBOf8ewixWB6K-4TYKjcKa2VI3i50WA3Er0',
        synopsis: 'Sistem identitas visual holistik untuk perhelatan akbar energi nasional: logo dinamis, motion assets, sertifikat, dan panggung konferensi.',
        story: 'Mengambil inspirasi dari aliran energi kinetik yang menghubungkan nusantara. Sistem identitas dirancang adaptif dari lencana peserta hingga panggung LED 30 meter.',
        deliverables: ['Brand Guidelines Book 60 Halaman', 'Desain Panggung LED & Backdrop Utama', 'Merchandise & Identitas Peserta'],
        specs: ['Figma Brand Tokens', 'Variable Font Motion Kinetic', 'After Effects Asset Generator'],
        metrics: 'Dihadiri lebih dari 1.500 delegasi internasional dan pejabat kementerian.'
      },
      {
        id: 'design-5',
        title: 'Gema Kilang Internal Magazine',
        category: 'Desain Majalah',
        client: 'Corporate Communication',
        year: '2024',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368701318-a4eb.jpg',
        synopsis: 'Tata letak editorial majalah internal edisi triwulan dengan sentuhan editorial modern gaya majalah monokrom internasional.',
        story: 'Meningkatkan citra media internal korporat dengan tata letak artikel berani, kutipan besar (*pull-quotes*), dan penempatan foto jurnalistik yang bernapas lega.',
        deliverables: ['Majalah Cetak Art Paper 56 Halaman', 'E-Magazine Interaktif Page-Flip', 'Kutipan Media Sosial Pendukung'],
        specs: ['Editorial Swiss Layout 12-Column Grid', 'Custom Drop-Cap Font Design', 'High Dynamic CMYK Separation'],
        metrics: 'Tingkat keterbacaan majalah internal meningkat 65% berdasarkan survei internal.'
      },
      {
        id: 'design-6',
        title: 'Monolith Corporate Design System',
        category: 'Sistem Desain Visual',
        client: 'Monolith Global Architecture',
        year: '2025',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOa2CZ7oJQpqn24tmFYPG-ipuAF3HbDXddDuzTXTZAyrz6xjDOt8yFhNRKAkgRmmKn_3QxK46zh2_b-h-2PhTyVYBzsVN65eou6dmKd4O_qZwRSwaU5k3tsRRZoV04gACDu0yG9lCCXLgVYWiFyCr-CGC8IHce3IttCfbl-wafpe7Vr5dh2EOaWiOF-_5xa6I5-wae3cbmqwVwku8JQRBHQ17xgv0hTGBrIAocOJg',
        synopsis: 'Sistem visual monolitik beraliran brutalist modern untuk arsitektur identitas korporasi multi-sektor energi dan konstruksi.',
        story: 'Menekankan kejujuran material dan kekuatan tipografi tanpa dekorasi berlebihan. Menghasilkan citra solid, matang, dan tahan uji waktu.',
        deliverables: ['Panduan Brand Manual Lengkap', 'Stationery & Kop Surat Resmi', 'Aset Desain Presentasi Keynote'],
        specs: ['Swiss Grid Architecture', 'Corporate Typographic Hierarchy', 'Minimal Contrast Ratio 12:1'],
        metrics: 'Diadopsi sebagai standar identitas 5 anak perusahaan induk.'
      },
      {
        id: 'design-7',
        title: 'Dumai Green Refinery Logo & Identity',
        category: 'Identitas Produk Hijau',
        client: 'Green Refinery Initiative',
        year: '2025',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368839399-7ioy.jpg',
        synopsis: 'Logo dan kemasan identitas visual bahan bakar terbarukan (Biofuel & SAF) yang diproduksi langsung dari kilang hijau Dumai.',
        story: 'Menggabungkan simbol daun kelapa sawit berkelanjutan dengan molekul hidrokarbon murni, merepresentasikan transisi energi ramah lingkungan.',
        deliverables: ['Logo Vektor & Aset Paten Merek', 'Desain Kemasan Drum & Tangki Produk', 'Materi Kampanye Transisi Energi'],
        specs: ['Geometric Logo Construction', 'Golden Ratio Circle Harmonics', 'Pantone Eco Green Inks'],
        metrics: 'Resmi didaftarkan di Ditjen KI sebagai merek dagang terdaftar energi hijau.'
      }
    ]
  },
  social: {
    disciplineKey: 'social',
    name: 'Social Media Strategy',
    badge: 'Digital Audience & Community Growth',
    themeColor: '#ffffff',
    accentColor: '#ffffff',
    isLight: true,
    summary: 'Strategi komunikasi digital terintegrasi yang berhasil melipatgandakan audiens Instagram @pertaminaru2 dari 8.000 ke 67.000+ followers—menjadikannya akun kilang #1 di Indonesia.',
    projects: [
      {
        id: 'social-1',
        title: 'Instagram 8K to 67K+ Hyper-Growth',
        category: 'Studi Kasus Pertumbuhan',
        client: 'PT Pertamina Patra Niaga RU II',
        year: '2024-2025',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368701318-a4eb.jpg',
        synopsis: 'Transformasi menyeluruh strategi konten digital yang mengantarkan akun @pertaminaru2 menjadi akun kilang migas nomor satu di Indonesia.',
        story: 'Menggeser pola komunikasi satu arah konvensional menjadi narasi storytelling visual humanis yang beresonansi kuat dengan generasi muda dan masyarakat lokal.',
        deliverables: ['Pilar Konten Komprehensif (Edu-Energy, Human, ESG)', 'Template Visual Feed & Story Berstandar Brand', 'Panduan Tone of Voice & Copywriting Terukur'],
        specs: ['Data Analytics Instagram Meta Suite', 'Content Calendar Sprint Tiap Pekan', 'A/B Testing Hook Headline Visual'],
        metrics: 'Pertumbuhan 8K → 67K+ Followers murni organik (#1 Refinery Account di Indonesia).'
      },
      {
        id: 'social-2',
        title: 'Hari Energi Nasional Carousel Campaign',
        category: 'Kampanye Edukasi Viral',
        client: 'Pertamina RU II Dumai',
        year: '2025',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368810064-9uc6.jpg',
        synopsis: 'Serial konten carousel interaktif 10 slide yang mengupas perjalanan satu liter minyak mentah hingga menjadi bahan bakar kendaraan.',
        story: 'Disusun dengan gaya micro-storytelling berirama cepat dan infografis visual berkontras tinggi sehingga mendorong puluhan ribu aksi simpan (save) dan bagikan (share).',
        deliverables: ['Serial Carousel Edukasi 10 Slide', 'Kuis Interaktif di Instagram Story', 'Infografis Ringkas Twitter/X Thread'],
        specs: ['1080x1350 High Resolution Seamless Carousel', 'Copywriting Storytelling Hook Formula', 'Canva & Illustrator Hybrid Workflow'],
        metrics: 'Meraih jangkauan organik 120.000+ akun dengan 6.400+ shares & saves.'
      },
      {
        id: 'social-3',
        title: 'Behind the Helmet Reels Series',
        category: 'Serial Video Humanis',
        client: 'Corporate Communication',
        year: '2024',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368767298-jnio.jpg',
        synopsis: 'Serial Reels dokumenter mikro yang menyoroti kisah kehidupan sehari-hari teknisi, operator wanita, dan penyelam bawah air dermaga kilang.',
        story: 'Membangun empati publik dengan memperlihatkan dedikasi di balik pasokan BBM sehari-hari. Format vertikal sinematik dengan audio original suara lingkungan kilang.',
        deliverables: ['12 Episode Serial Reels Instagram', 'Audio Voiceover & Sound Foley Kilang Asli', 'Format Vertikal 9:16 Full HD'],
        specs: ['Sony FX3 Cinema Rig', 'CapCut & Premiere Pro Sound Design', 'Subtitles Kinetic Typography Dynamic'],
        metrics: 'Total penayangan menembus 1.200.000+ views di Instagram & TikTok korporat.'
      },
      {
        id: 'social-4',
        title: 'Digital Crisis Communication Protocol',
        category: 'Manajemen Reputasi',
        client: 'Tim Krisis Humas RU II',
        year: '2024',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368636694-7mq2.jpg',
        synopsis: 'Protokol penanganan cepat isu dan disinformasi di media sosial dengan sistem klarifikasi transparan, terukur, dan berbasis fakta.',
        story: 'Menyiapkan pedoman respon media dalam waktu kurang dari 15 menit, visual klarifikasi berkontras tinggi, dan pemantauan sentimen real-time.',
        deliverables: ['SOP Respon Media Sosial Saat Insiden', 'Template Grafis Klarifikasi Siaga Darurat', 'Monitoring Dashboard Sentimen Netizen'],
        specs: ['Social Listening Tools (Brand24 & Meltwater)', 'Crisis Template Vector Kit', 'Jalur Koordinasi Command Center'],
        metrics: 'Membalikkan sentimen negatif dari 72% menjadi 88% netral-positif dalam tempo 24 jam.'
      },
      {
        id: 'social-5',
        title: 'Interactive Live Session & Q&A',
        category: 'Keterlibatan Komunitas',
        client: 'Humas Pertamina RU II',
        year: '2025',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368839399-7ioy.jpg',
        synopsis: 'Program siaran langsung Instagram interaktif yang menghubungkan pimpinan kilang dengan generasi muda dan mahasiswa teknik perminyakan.',
        story: 'Menghadirkan sesi tanya jawab terbuka seputar karier, inovasi energi terbarukan, dan kontribusi kilang bagi pembangunan daerah Dumai.',
        deliverables: ['Produksi Multi-Camera Live Instagram', 'Grafis On-Screen Live lower-third', 'Rekap Konten Pasca Siaran'],
        specs: ['OBS Studio Dual Camera Feed', 'Shure SM7B Broadcast Mic', 'Real-Time Comment Moderation'],
        metrics: 'Dihadiri lebih dari 3.200 penonton langsung dengan 15.000+ interaksi komentar.'
      },
      {
        id: 'social-6',
        title: 'National PR Award-Winning Digital Campaign',
        category: 'Kampanye Media Sosial AHI',
        client: 'Pertamina RU II Dumai',
        year: '2024',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQDL8KyX67MLyaR7WRfaYFlh9D3zIMs9-FgF-5WUMaZP98VJN0u0HWQnagcNiYU21us6WzS1dos1hALtR8p9j1Y1cJS6p7Y5y8PF80Vcr0kUHLBjdnwxTe2og09FZy-SgOiug8FWF4K8yPNODiqBk7_L-EoD4JSpFPMnDuzUUCTGGo1s70qVEUA80yLgJdIy2XO46DFN7rIdbSRUJopu4F23RB7b9BsrukJGrePAc',
        synopsis: 'Strategi kampanye digital terpadu yang memenangkan penghargaan bergengsi Anugrah Humas Indonesia kategori Pengelolaan Media Sosial BUMN.',
        story: 'Membuktikan bahwa akun industri energi berat dapat menjadi ruang interaksi yang hangat, edukatif, dan membanggakan bagi seluruh masyarakat.',
        deliverables: ['Buku Portofolio Strategi Konten 1 Tahun', 'Analisis Dampak & Return on Engagement', 'Video Reel Showcase Kampanye'],
        specs: ['Comprehensive PR Case Study Deck', 'Audience Growth Data Visualization', 'Best Practices Playbook'],
        metrics: 'Pemenang Gold Anugrah Humas Indonesia kategori Media Sosial Terpopuler.'
      },
      {
        id: 'social-7',
        title: 'Employer Branding & Recruitment Push',
        category: 'Branding Pemberi Kerja',
        client: 'Fungsi HR & Komunikasi RU II',
        year: '2025',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw-HjHTxu0iiEQ5z7YvjAbVP9wfRoOcfUb13m1mFshL5HU6LfmOEyk_w9r7ILa2sS5f7YN6AT4xK9vAXIfYQRiV0s1IagWRXCZndw5C-09Y5hCK0pIeBZtWRgQ8ROcmnmez5qemMezfiQ9P0sdjBnbsAJkJRPodhoCrxzeh-quGgzLEdorxq0VQtnxJF_SLz3-iHG5jz2SojHZd69KaE4NN6YwL2UGlbXJTZ00ZV8',
        synopsis: 'Kampanye visual perekrutan talenta terbaik nusantara menjadi Perwira Energi baru melalui storytelling budaya kerja inklusif dan progresif.',
        story: 'Menampilkan testimoni jujur para insinyur muda yang baru bergabung, fasilitas kerja modern kilang, dan peluang pengembangan karier global.',
        deliverables: ['Serial Konten Karir & Beasiswa BUMN', 'Guidebook Pertanyaan Wawancara Kerja', 'Short Reels Q&A Rekrutmen Bersama'],
        specs: ['1080x1350 Carousel & 9:16 Video Sync', 'High Engagement Polls & Interactive Stickers', 'Direct Message Auto-Responder FAQ'],
        metrics: 'Meningkatkan pendaftar talenta terbaik dari universitas ternama hingga 300%.'
      }
    ]
  }
};

// Pola Staggered (Tinggi & Translasi Zig-zag) untuk 7 Kartu Vertikal
const STAGGER_PRESETS = [
  { height: '82%', translateY: '22px' },
  { height: '90%', translateY: '-20px' },
  { height: '84%', translateY: '18px' },
  { height: '96%', translateY: '-24px' }, // Heroic center
  { height: '86%', translateY: '22px' },
  { height: '92%', translateY: '-16px' },
  { height: '80%', translateY: '18px' }
];

export function RoleDetailModal({
  isOpen,
  onClose,
  role,
  onOpenContact
}) {
  const [selectedDisciplineKey, setSelectedDisciplineKey] = useState('photo');
  const [hoveredStripIdx, setHoveredStripIdx] = useState(null);
  const [activeProjectIdx, setActiveProjectIdx] = useState(null);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [showMediaLightbox, setShowMediaLightbox] = useState(false);

  // Sinkronisasi disiplin awal saat modal dibuka berdasarkan kartu yang diklik di section About
  useEffect(() => {
    if (role && role.roleKey && DISCIPLINE_GALLERY_DATA[role.roleKey]) {
      setSelectedDisciplineKey(role.roleKey);
    } else {
      setSelectedDisciplineKey('photo');
    }
    setActiveProjectIdx(null);
    setHoveredStripIdx(null);
    setShowDetailDrawer(false);
    setShowMediaLightbox(false);
  }, [role, isOpen]);

  // Lock scroll background saat modal aktif & dengarkan tombol keyboard (Escape, Arrow Left, Arrow Right)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showMediaLightbox) {
          setShowMediaLightbox(false);
        } else if (showDetailDrawer) {
          setShowDetailDrawer(false);
        } else if (activeProjectIdx !== null) {
          setActiveProjectIdx(null);
        } else if (onClose) {
          onClose();
        }
      } else if (e.key === 'ArrowRight' && activeProjectIdx !== null) {
        setActiveProjectIdx((prev) => (prev + 1) % 7);
      } else if (e.key === 'ArrowLeft' && activeProjectIdx !== null) {
        setActiveProjectIdx((prev) => (prev - 1 + 7) % 7);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeProjectIdx, showDetailDrawer, showMediaLightbox, onClose]);

  const activeDiscipline = useMemo(() => {
    return DISCIPLINE_GALLERY_DATA[selectedDisciplineKey] || DISCIPLINE_GALLERY_DATA.photo;
  }, [selectedDisciplineKey]);

  const displayProjects = useMemo(() => {
    return activeDiscipline.projects || [];
  }, [activeDiscipline]);

  if (!isOpen) return null;

  const currentProject = activeProjectIdx !== null ? displayProjects[activeProjectIdx] || displayProjects[0] : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#0b0b0b',
        color: '#ffffff',
        fontFamily: HELVETICA_STACK,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none'
      }}
    >
      {/* 1. Latar Belakang Hitam Pekat dengan Aksen Garis Vertikal Tipis (Grid Lines) Transparan */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 4vw'
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              width: '1px',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }}
          />
        ))}
      </div>

      {/* 2. Tombol Tutup Floating Minimalis di Kanan Atas */}
      {activeProjectIdx === null && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup Galeri (ESC)"
          style={{
            position: 'absolute',
            top: '24px',
            right: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            zIndex: 50,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.06em',
            cursor: 'pointer',
            transition: 'all 200ms ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(237, 28, 36, 0.85)';
            e.currentTarget.style.borderColor = 'transparent';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          }}
        >
          <span>ESC</span>
          <X size={13} />
        </button>
      )}

      {/* 3. Badan Konten Utama: 7 Kartu Vertikal Ramping (Vertical Strips Accordion) */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
        <main
          style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem clamp(1rem, 3vw, 3rem)',
            overflow: 'hidden'
          }}
        >
          {/* Kontainer Horizontal untuk 7 Kartu Vertikal */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: activeProjectIdx !== null ? '0px' : '14px',
              width: '100%',
              height: '100%',
              maxWidth: '1440px',
              position: 'relative',
              transition: 'gap 500ms ease'
            }}
          >
            {displayProjects.slice(0, 7).map((project, idx) => {
              const isHovered = hoveredStripIdx === idx;
              const isSelected = activeProjectIdx === idx;
              const isOtherSelected = activeProjectIdx !== null && !isSelected;
              const stagger = STAGGER_PRESETS[idx % STAGGER_PRESETS.length];

              // State Melebar Penuh (Full-Width Detail Reveal)
              if (isSelected) {
                return (
                  <div
                    key={project.id}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 30,
                      borderRadius: '0px',
                      overflow: 'hidden',
                      backgroundColor: '#071320',
                      animation: 'fullRevealFade 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
                    }}
                  >
                    {/* Gambar Full-Width Latar Belakang */}
                    <img
                      src={getStoragePublicUrl(project.image) || project.image}
                      alt={project.title}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        filter: 'brightness(0.72) contrast(1.08)',
                        transform: 'scale(1)',
                        animation: 'heroImageZoom 8000ms ease-out infinite alternate'
                      }}
                    />

                    {/* Gradient Overlay Menyeluruh untuk Keterbacaan Teks Maksimal */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(180deg, rgba(11, 11, 11, 0.5) 0%, rgba(11, 11, 11, 0.2) 25%, rgba(11, 11, 11, 0.85) 75%, #0b0b0b 100%), linear-gradient(90deg, rgba(11, 11, 11, 0.95) 0%, rgba(11, 11, 11, 0.6) 45%, transparent 100%)'
                      }}
                    />

                    {/* Tombol Kembali (Back to Gallery) di Kiri Atas */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '24px',
                        left: 'clamp(1.5rem, 4vw, 3.5rem)',
                        zIndex: 40,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveProjectIdx(null)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 18px',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(11, 11, 11, 0.75)',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(12px)',
                          fontSize: '12px',
                          fontWeight: '700',
                          letterSpacing: '0.04em',
                          cursor: 'pointer',
                          transition: 'all 200ms ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#ffffff';
                          e.currentTarget.style.color = '#0b0b0b';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(11, 11, 11, 0.75)';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                      >
                        <ArrowLeft size={14} />
                        <span>KEMBALI KE GALERI</span>
                      </button>
                    </div>

                    {/* Navigasi Next & Prev di Kanan Atas */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '24px',
                        right: 'clamp(1.5rem, 4vw, 3.5rem)',
                        zIndex: 40,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveProjectIdx((prev) => (prev - 1 + 7) % 7)}
                        title="Proyek Sebelumnya"
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(11, 11, 11, 0.75)',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        <ArrowLeft size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveProjectIdx((prev) => (prev + 1) % 7)}
                        title="Proyek Berikutnya"
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(11, 11, 11, 0.75)',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        <ArrowRight size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={onClose}
                        title="Tutup Galeri"
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(11, 11, 11, 0.75)',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          backdropFilter: 'blur(10px)',
                          marginLeft: '4px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(237, 28, 36, 0.85)';
                          e.currentTarget.style.borderColor = 'transparent';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(11, 11, 11, 0.75)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                        }}
                      >
                        <X size={15} />
                      </button>
                    </div>

                    {/* Konten Kiri-Tengah: Judul Karya Berukuran Besar & Informasi Narasi */}
                    <div
                      style={{
                        position: 'absolute',
                        left: 'clamp(1.5rem, 4.5vw, 4.5rem)',
                        bottom: 'clamp(6rem, 15vh, 9rem)',
                        maxWidth: '780px',
                        zIndex: 35,
                        animation: 'fadeInUpContent 500ms ease-out 150ms both'
                      }}
                    >
                      {/* Label Kategori & Klien */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          marginBottom: '1rem',
                          flexWrap: 'wrap'
                        }}
                      >
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: '800',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: activeDiscipline.accentColor || '#38bdf8',
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            border: '1px solid rgba(255, 255, 255, 0.15)'
                          }}
                        >
                          {project.category}
                        </span>
                        <span
                          style={{
                            fontSize: '12px',
                            color: 'rgba(255, 255, 255, 0.65)',
                            fontWeight: '600'
                          }}
                        >
                          {project.client} • {project.year}
                        </span>
                      </div>

                      {/* Judul Karya Berukuran Besar */}
                      <h1
                        style={{
                          fontSize: 'clamp(2.4rem, 5.8vw, 4.8rem)',
                          fontWeight: '900',
                          lineHeight: 1.04,
                          letterSpacing: '-0.03em',
                          textTransform: 'uppercase',
                          color: '#ffffff',
                          margin: '0 0 1.25rem 0',
                          textShadow: '0 8px 30px rgba(0, 0, 0, 0.6)'
                        }}
                      >
                        {project.title}
                      </h1>

                      {/* Sinopsis / Deskripsi Karya */}
                      <p
                        style={{
                          fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
                          lineHeight: 1.68,
                          color: 'rgba(255, 255, 255, 0.88)',
                          margin: 0,
                          maxWidth: '680px',
                          fontWeight: '400',
                          textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
                        }}
                      >
                        {project.synopsis}
                      </p>
                    </div>

                    {/* Tombol Aksi di Kiri Bawah: "Lihat Karya" dengan Ikon Panah/Play Bulat */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 'clamp(1.5rem, 4vh, 2.5rem)',
                        left: 'clamp(1.5rem, 4.5vw, 4.5rem)',
                        zIndex: 35,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        animation: 'fadeInUpContent 500ms ease-out 250ms both'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setShowMediaLightbox(true)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 24px 12px 16px',
                          borderRadius: '9999px',
                          backgroundColor: '#ffffff',
                          color: '#0b0b0b',
                          border: 'none',
                          fontSize: '13px',
                          fontWeight: '800',
                          letterSpacing: '0.04em',
                          cursor: 'pointer',
                          boxShadow: '0 8px 24px rgba(255, 255, 255, 0.25)',
                          transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                          e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 255, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0) scale(1)';
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 255, 255, 0.25)';
                        }}
                      >
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: '#0b0b0b',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Play size={13} fill="#ffffff" style={{ marginLeft: '2px' }} />
                        </div>
                        <span>Lihat Karya</span>
                      </button>

                      {/* Tombol Sekunder Diskusi Proyek */}
                      {onOpenContact && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenContact();
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 20px',
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            color: '#ffffff',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(10px)',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 200ms ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                          }}
                        >
                          <span>Mulai Kolaborasi</span>
                          <ArrowUpRight size={14} />
                        </button>
                      )}
                    </div>

                    {/* Tombol Sekunder di Kanan Bawah: "Detail Project" dengan Ikon Tambah (+) Bulat */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 'clamp(1.5rem, 4vh, 2.5rem)',
                        right: 'clamp(1.5rem, 4vw, 3.5rem)',
                        zIndex: 35,
                        animation: 'fadeInUpContent 500ms ease-out 300ms both'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setShowDetailDrawer(true)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 22px 12px 16px',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(11, 11, 11, 0.85)',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.22)',
                          backdropFilter: 'blur(14px)',
                          fontSize: '13px',
                          fontWeight: '700',
                          letterSpacing: '0.04em',
                          cursor: 'pointer',
                          transition: 'all 250ms ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
                          e.currentTarget.style.borderColor = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(11, 11, 11, 0.85)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                        }}
                      >
                        <div
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.08)'
                          }}
                        >
                          <Plus size={16} />
                        </div>
                        <span>Detail Project</span>
                      </button>
                    </div>
                  </div>
                );
              }

              // Tampilan Normal: 7 Kartu Vertikal Ramping dengan Posisi Staggered (Zig-zag)
              const flexValue = isHovered ? 4.2 : isOtherSelected ? 0 : 1;
              const opacityValue = isOtherSelected ? 0 : 1;

              return (
                <div
                  key={project.id}
                  onClick={() => setActiveProjectIdx(idx)}
                  onMouseEnter={() => setHoveredStripIdx(idx)}
                  onMouseLeave={() => setHoveredStripIdx(null)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveProjectIdx(idx);
                    }
                  }}
                  aria-label={`Buka karya ${project.title}`}
                  style={{
                    position: 'relative',
                    flex: flexValue,
                    height: stagger.height,
                    transform: `translateY(${stagger.translateY})`,
                    opacity: opacityValue,
                    borderRadius: '14px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    backgroundColor: '#121212',
                    border: isHovered
                      ? `1px solid ${activeDiscipline.accentColor || '#38bdf8'}`
                      : '1px solid rgba(255, 255, 255, 0.09)',
                    boxShadow: isHovered
                      ? '0 24px 48px rgba(0, 0, 0, 0.8)'
                      : '0 10px 24px rgba(0, 0, 0, 0.4)',
                    transition:
                      'flex 650ms cubic-bezier(0.25, 1, 0.5, 1), transform 650ms cubic-bezier(0.25, 1, 0.5, 1), border-color 300ms ease, box-shadow 400ms ease, opacity 400ms ease',
                    pointerEvents: isOtherSelected ? 'none' : 'auto'
                  }}
                >
                  {/* Gambar Preview Project (object-fit: cover) */}
                  <img
                    src={getStoragePublicUrl(project.image) || project.image}
                    alt={project.title}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                      filter: isHovered ? 'brightness(0.95) contrast(1.06)' : 'brightness(0.55) contrast(1.02)',
                      transition:
                        'transform 750ms cubic-bezier(0.25, 1, 0.5, 1), filter 400ms ease'
                    }}
                  />

                  {/* Efek Gelap (Overlay Hitam Transparan) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: isHovered
                        ? 'linear-gradient(180deg, rgba(11, 11, 11, 0.2) 0%, rgba(11, 11, 11, 0.75) 100%)'
                        : 'linear-gradient(180deg, rgba(11, 11, 11, 0.55) 0%, rgba(11, 11, 11, 0.85) 100%)',
                      transition: 'background 400ms ease'
                    }}
                  />

                  {/* Teks Judul Kategori/Karya Tepat di Tengah Kartu */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1.25rem',
                      textAlign: 'center',
                      zIndex: 3
                    }}
                  >
                    {!isHovered ? (
                      /* Saat Tidak di-Hover: Judul Kategori & Judul Karya Ramping */
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: '700',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: 'rgba(255, 255, 255, 0.5)'
                          }}
                        >
                          {project.category}
                        </span>
                        <span
                          style={{
                            fontSize: '13px',
                            fontWeight: '800',
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            color: '#ffffff',
                            maxWidth: '130px',
                            lineHeight: 1.3
                          }}
                        >
                          {project.title}
                        </span>
                      </div>
                    ) : (
                      /* Saat di-Hover: Judul Melebar Penuh & Info Klien */
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          maxWidth: '280px',
                          animation: 'fadeInUpContent 300ms ease forwards'
                        }}
                      >
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: '800',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: activeDiscipline.accentColor || '#38bdf8',
                            marginBottom: '6px'
                          }}
                        >
                          {project.category}
                        </span>
                        <h3
                          style={{
                            fontSize: '20px',
                            fontWeight: '900',
                            lineHeight: 1.2,
                            letterSpacing: '-0.02em',
                            textTransform: 'uppercase',
                            color: '#ffffff',
                            margin: '0 0 8px 0'
                          }}
                        >
                          {project.title}
                        </h3>
                        <p
                          style={{
                            fontSize: '11px',
                            lineHeight: 1.5,
                            color: 'rgba(255, 255, 255, 0.85)',
                            margin: 0
                          }}
                        >
                          {project.client} • {project.year}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Indikator Garis Aksen di Dasar Kartu */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      backgroundColor: isHovered
                        ? activeDiscipline.accentColor || '#38bdf8'
                        : 'rgba(255, 255, 255, 0.1)',
                      transition: 'background-color 300ms ease'
                    }}
                  />
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* 4. Drawer Modal: "Detail Project" (Popup Slide-In dari Kanan) */}
      {showDetailDrawer && currentProject && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'fadeInOverlay 250ms ease'
          }}
          onClick={() => setShowDetailDrawer(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
              height: '100%',
              backgroundColor: '#0f141c',
              borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
              padding: '2.5rem clamp(1.5rem, 3vw, 2.5rem)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-20px 0 60px rgba(0, 0, 0, 0.8)',
              animation: 'slideInRight 300ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Drawer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: activeDiscipline.accentColor || '#38bdf8'
                  }}
                >
                  PROJECT SPECIFICATIONS
                </span>
                <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff', margin: '6px 0 0 0' }}>
                  {currentProject.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowDetailDrawer(false)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Cerita di Balik Karya (Narrative Story) */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.45)', marginBottom: '8px' }}>
                NARASI & PROSES KREATIF
              </h4>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#e2e8f0', margin: 0 }}>
                {currentProject.story || currentProject.synopsis}
              </p>
            </div>

            {/* Deliverables / Hasil Karya */}
            {Array.isArray(currentProject.deliverables) && (
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.45)', marginBottom: '10px' }}>
                  DELIVERABLES & FORMAT HASIL
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {currentProject.deliverables.map((del, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.07)',
                        fontSize: '13px',
                        color: '#ffffff'
                      }}
                    >
                      <CheckCircle2 size={15} color="#7AC142" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Spesifikasi Teknis / Gear & Tools */}
            {Array.isArray(currentProject.specs) && (
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.45)', marginBottom: '10px' }}>
                  PERANGKAT & WORKFLOW TEKNIS
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {currentProject.specs.map((sp, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '12px',
                        color: '#dbeafe',
                        backgroundColor: 'rgba(56, 189, 248, 0.12)',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontWeight: '600'
                      }}
                    >
                      {sp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Dampak / Metrik Prestasi */}
            {currentProject.metrics && (
              <div
                style={{
                  marginTop: 'auto',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(122, 193, 66, 0.1)',
                  border: '1px solid rgba(122, 193, 66, 0.25)'
                }}
              >
                <div style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7AC142', marginBottom: '4px' }}>
                  IMPACT & HIGHLIGHT
                </div>
                <div style={{ fontSize: '13px', color: '#ffffff', fontWeight: '600', lineHeight: 1.5 }}>
                  {currentProject.metrics}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. Lightbox Fullscreen: "Lihat Karya" */}
      {showMediaLightbox && currentProject && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10001,
            backgroundColor: 'rgba(0, 0, 0, 0.94)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            animation: 'fadeInOverlay 250ms ease'
          }}
          onClick={() => setShowMediaLightbox(false)}
        >
          {/* Header Lightbox */}
          <div
            style={{
              padding: '1.5rem 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div>
              <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {currentProject.category}
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: '4px 0 0 0' }}>
                {currentProject.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setShowMediaLightbox(false)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Visual Media Showcase */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              overflow: 'hidden'
            }}
          >
            <img
              src={getStoragePublicUrl(currentProject.image) || currentProject.image}
              alt={currentProject.title}
              style={{
                maxWidth: '92%',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)'
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Global CSS Animasi & Transisi Lembut */}
      <style>{`
        @keyframes fullRevealFade {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUpContent {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes heroImageZoom {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
