import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  ArrowUpRight,
  ArrowDown,
  Camera,
  Video,
  Palette,
  Share2,
  Award,
  Layers,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { getStoragePublicUrl } from '../../lib/queries';

const HELVETICA_STACK = "'Helvetica Neue', Helvetica, Arial, sans-serif";

// Data kurasi karya mendalam untuk masing-masing peran visual
const DISCIPLINE_DATA = {
  photo: {
    tagline: 'Presisi Visual Skala Industri, Dokumentasi Operasi Energi & Fotografi Komersial',
    icon: Camera,
    themeColor: '#00529B', // Pertamina Blue
    stats: [
      { label: 'Pengalaman', value: '6+ Tahun', desc: 'Sektor Migas & Industri Energi' },
      { label: 'Kualitas Sensor', value: '8K / Full-Frame', desc: 'Optik Anamorphic & Cinema Prime' },
      { label: 'Dokumentasi', value: '500+ Aset', desc: 'Kilang, Maritim & Operasi Site' },
      { label: 'Cakupan Area', value: 'Nasional', desc: 'Dumai, Riau & Seluruh Indonesia' }
    ],
    filters: ['Semua', 'Kilang & Industri', 'Komersial & Portret', 'ESG & Lingkungan'],
    gallery: [
      {
        id: 'photo-1',
        title: 'Refinery Twilight Operations',
        category: 'Kilang & Industri',
        client: 'PT Pertamina Patra Niaga RU II',
        year: '2025',
        image:
          'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368810064-9uc6.jpg',
        desc: 'Dokumentasi lanskap unit distilasi kilang minyak Dumai pada momen golden hour, menangkap interaksi struktur baja monumental dengan pencahayaan operasional malam.',
        specs: ['Sony Alpha 7R V', 'FE 24-70mm f/2.8 GM II', 'Raw 14-bit Uncompressed']
      },
      {
        id: 'photo-2',
        title: 'Offshore Energy Transfer & Marine Terminal',
        category: 'Kilang & Industri',
        client: 'PT Pertamina Patra Niaga',
        year: '2025',
        image:
          'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368701318-a4eb.jpg',
        desc: 'Visualisasi presisi transfer energi maritim dari dermaga khusus kilang Dumai menuju armada kapal tanker di perairan strategis Selat Malaka.',
        specs: ['FE 70-200mm f/2.8 GM OSS II', 'CPL Polarizer', 'High Shutter Precision']
      },
      {
        id: 'photo-3',
        title: 'Turnaround Engineering Precision',
        category: 'Kilang & Industri',
        client: 'Refinery Unit Dumai',
        year: '2024',
        image:
          'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368636694-7mq2.jpg',
        desc: 'Liputan teknis intensif perbaikan dan pemeliharaan berkala (Turnaround) komponen krusial kilang dengan kepatuhan standar keselamatan kerja HSSE tertinggi.',
        specs: ['FE 16-35mm f/2.8 GM II', 'ATEX Intrinsically Safe Zone Workflow']
      },
      {
        id: 'photo-4',
        title: 'Perwira Energi Executive Portraiture',
        category: 'Komersial & Portret',
        client: 'PT Pertamina (Persero)',
        year: '2025',
        image:
          'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368767298-jnio.jpg',
        desc: 'Seri potret editorial kepemimpinan perwira energi dan operator garda depan dengan pencahayaan rim studio yang dramatis dan berwibawa.',
        specs: ['FE 85mm f/1.4 GM', 'Elinchrom Off-Camera Flash', 'Color Checker Calibrated']
      },
      {
        id: 'photo-5',
        title: 'Mangrove Ecosystem & CSR Sustainability',
        category: 'ESG & Lingkungan',
        client: 'Pertamina RU II Dumai',
        year: '2024',
        image:
          'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368839399-7ioy.jpg',
        desc: 'Eksplorasi narasi visual program tanggung jawab sosial lingkungan (TJSL) rehabilitasi hutan mangrove pesisir Riau bersama kelompok tani lokal.',
        specs: ['Sony Alpha 1', 'FE 24mm f/1.4 GM', 'Natural Light HDR']
      }
    ]
  },
  video: {
    tagline: 'Sinematografi Korporat Berstandar Broadcast, Drone Aerial & Video Profil Peraih Penghargaan',
    icon: Video,
    themeColor: '#ED1C24', // Pertamina Red
    stats: [
      { label: 'Penghargaan', value: 'Winner AHI', desc: 'Anugrah Humas Indonesia' },
      { label: 'Format Produksi', value: '4K / 8K Cinema', desc: 'ACES Workflow & Broadcast Grade' },
      { label: 'Sertifikasi', value: 'Licensed Pilot', desc: 'Remote Pilot Drone Komersial' },
      { label: 'Karya Rilis', value: '40+ Produksi', desc: 'Video Profil, Anthem & ESG Doc' }
    ],
    filters: ['Semua', 'Video Profil Korporat', 'Commercial Anthem', 'Dokumenter ESG'],
    gallery: [
      {
        id: 'video-1',
        title: 'Pertamina Patra Niaga Anthem: Mengalirkan Energi',
        category: 'Commercial Anthem',
        client: 'PT Pertamina Patra Niaga',
        year: '2025',
        image:
          'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368839399-7ioy.jpg',
        desc: 'Manifesto sinematik berenergi tinggi yang memadukan keindahan instalasi energi industri, armada logistik maritim, dan ketangguhan pekerja kilang dengan komposisi orkestra megah.',
        specs: ['RED V-Raptor 8K', 'Cooke Anamorphic /i', 'DaVinci Resolve Studio ACES']
      },
      {
        id: 'video-2',
        title: 'Refinery Unit Dumai: Resilience & Modernity',
        category: 'Video Profil Korporat',
        client: 'Refinery Unit Dumai',
        year: '2024',
        image:
          'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368810064-9uc6.jpg',
        desc: 'Video profil resmi kilang minyak Dumai berdurasi 7 menit, memaparkan kapasitas produksi kilang, efisiensi energi hijau, serta pencapaian nihil kecelakaan kerja (Zero LTI).',
        specs: ['Arri Alexa Mini LF', 'Angénieux EZ Zooms', 'Dolby 5.1 Surround Mastering']
      },
      {
        id: 'video-3',
        title: 'Penjaga Selat: Ekspedisi Maritim Energi Riau',
        category: 'Dokumenter ESG',
        client: 'Pertamina RU II Dumai',
        year: '2025',
        image:
          'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368701318-a4eb.jpg',
        desc: 'Dokumenter naratif menyusuri dedikasi tim Marine and Supply Chain dalam menjaga kestabilan pasokan energi nusantara melewati perairan tersibuk di dunia.',
        specs: ['DJI Inspire 3 X9-8K Air', 'ProRes RAW 8K', 'Sound Design & Foley Studio']
      },
      {
        id: 'video-4',
        title: 'HSSE Golden Rules: Kampanye Keselamatan Kerja',
        category: 'Commercial Anthem',
        client: 'PT Pertamina (Persero)',
        year: '2024',
        image:
          'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368767298-jnio.jpg',
        desc: 'Video edukasi korporat dinamis bertema kepatuhan keselamatan kerja (Patuh, Peduli, Tanggap) dengan visual pacing cepat dan efek tipografi kinetik modern.',
        specs: ['Sony FX6 & FX3 Rig', 'G Master Cinema Glass', 'Motion Graphics 3D Blender']
      }
    ]
  },
  design: {
    tagline: 'Perancangan Identitas Visual Berdisiplin Swiss Modernist, Infografis Presisi & Desain Editorial Korporat',
    icon: Palette,
    themeColor: '#7AC142', // Pertamina Green
    stats: [
      { label: 'Metodologi', value: 'Swiss Modernist', desc: 'Grid Terstruktur & Tipografi Rasional' },
      { label: 'Publikasi', value: '100+ Publikasi', desc: 'Buku Tahunan, Infografis & Brand Book' },
      { label: 'Desain Sistem', value: 'Design Tokens', desc: 'Figma System & Corporate Assets' },
      { label: 'Fokus Desain', value: 'High Contrast', desc: 'Kejelasan Hierarki Informasi' }
    ],
    filters: ['Semua', 'Identitas Brand & Guidelines', 'Desain Editorial & Buku', 'Infografis Industri'],
    gallery: [
      {
        id: 'design-1',
        title: 'Refinery Unit II Annual Monograph & Report',
        category: 'Desain Editorial & Buku',
        client: 'PT Pertamina Patra Niaga RU II',
        year: '2024',
        image:
          'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368767298-jnio.jpg',
        desc: 'Buku monograf korporat hardbound setebal 180 halaman dengan tata letak grid Swiss ekstrem, huruf Neue Haas Grotesk, dan finishing debossed foil perak elegan.',
        specs: ['Adobe InDesign', 'Foil Debossed Binding', 'Uncoated Munken Pure Paper']
      },
      {
        id: 'design-2',
        title: 'Industrial Energy Processing Infographics System',
        category: 'Infografis Industri',
        client: 'Refinery Unit Dumai',
        year: '2025',
        image:
          'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368810064-9uc6.jpg',
        desc: 'Sistem diagram dan infografis visual teknis yang menyederhanakan alur distilasi minyak mentah menjadi avtur dan solar ramah lingkungan.',
        specs: ['Adobe Illustrator', 'Isometric Vector System', 'High-Contrast Print Specs']
      },
      {
        id: 'design-3',
        title: 'Corporate Digital Guidelines & Asset Tokens',
        category: 'Identitas Brand & Guidelines',
        client: 'PT Pertamina Patra Niaga',
        year: '2025',
        image:
          'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368839399-7ioy.jpg',
        desc: 'Perancangan manual grafis digital lengkap yang mengatur standarisasi penggunaan warna, rasio grid, dan komponen UI lintas saluran komunikasi korporat.',
        specs: ['Figma Design Tokens', 'Atomic Design Methodology', 'Responsive Guidelines']
      },
      {
        id: 'design-4',
        title: 'Hari Energi Nasional Kinetic Poster Series',
        category: 'Identitas Brand & Guidelines',
        client: 'National Energy Forum',
        year: '2024',
        image:
          'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368701318-a4eb.jpg',
        desc: 'Koleksi poster tipografi kinetik yang mengusung pesan keberlanjutan energi hijau dengan sentuhan visual Bauhaus dan Swiss Style modern.',
        specs: ['Swiss Grid System', 'Experimental Typography', 'Silkscreen Print Edition']
      }
    ]
  },
  social: {
    tagline: 'Strategi Komunikasi Digital Terintegrasi, Akselerasi Audiens & Manajemen Akun Kilang #1 di Indonesia',
    icon: Share2,
    themeColor: '#00529B', // Deep Navy / White Accent
    stats: [
      { label: 'Pertumbuhan', value: '8K ➔ 67K+', desc: 'Pengikut Organik @pertaminaru2' },
      { label: 'Peringkat', value: '#1 Nasional', desc: 'Akun Kilang Terpopuler di Indonesia' },
      { label: 'Engagement', value: '4.8% Rata-rata', desc: 'Di Atas Standar Industri Korporat' },
      { label: 'Konten Rilis', value: '500+ Aset', desc: 'Reels, Carousel, Story & Live' }
    ],
    filters: ['Semua', 'Strategi Kampanye', 'Serial Reels Kinetik', 'Crisis & Community'],
    gallery: [
      {
        id: 'social-1',
        title: 'Akselerasi Audiens Organik Instagram @pertaminaru2',
        category: 'Strategi Kampanye',
        client: 'PT Pertamina Patra Niaga RU II',
        year: '2024 - 2025',
        image:
          'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368701318-a4eb.jpg',
        desc: 'Studi kasus orkestrasi konten yang berhasil menumbuhkan akun dari 8.000 menjadi lebih dari 67.000 pengikut loyal, menjadikannya kilang percontohan nasional.',
        specs: ['Content Matrix Strategy', 'Data-Driven Analytics', 'Daily Engagement Protocol']
      },
      {
        id: 'social-2',
        title: 'Behind The Fuel: Serial Reels Edukasi Kilang',
        category: 'Serial Reels Kinetik',
        client: 'Refinery Unit Dumai',
        year: '2025',
        image:
          'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368810064-9uc6.jpg',
        desc: 'Serial video vertikal 9:16 yang membongkar mitos dan fakta seputar bahan bakar avtur dan solar, mengumpulkan lebih dari 1,2 juta total penayangan organik.',
        specs: ['Vertical 9:16 Cinema Rig', 'CapCut & Premiere Pro', 'Dynamic Motion Captions']
      },
      {
        id: 'social-3',
        title: 'Dialog Komunitas & Manajemen Krisis Digital',
        category: 'Crisis & Community',
        client: 'Pertamina RU II Dumai',
        year: '2024',
        image:
          'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368839399-7ioy.jpg',
        desc: 'Protokol respons cepat dan mitigasi narasi negatif melalui transparansi operasional, infografis fakta lapangan, dan sesi interaktif tanya-jawab rutin.',
        specs: ['Real-Time Social Listening', 'Crisis Playbook Response', 'Stakeholder Bridging']
      },
      {
        id: 'social-4',
        title: 'Inovasi Hijau Dumai: Carousel ESG Bertingkat',
        category: 'Strategi Kampanye',
        client: 'PT Pertamina (Persero)',
        year: '2025',
        image:
          'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368767298-jnio.jpg',
        desc: 'Format konten carousel geser dengan retention rate 82%, memaparkan dekarbonisasi operasional kilang dan konservasi ekosistem gambut Riau.',
        specs: ['10-Slide Seamless Panoramic Grid', 'Infographic Visual Storytelling']
      }
    ]
  }
};

export function RoleDetailModal({
  isOpen,
  onClose,
  role,
  allRoles = [],
  onSelectRole,
  onOpenContact
}) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('Semua');
  const [lightboxItem, setLightboxItem] = useState(null);

  // Kunci scroll halaman utama saat modal terbuka
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxItem) {
          setLightboxItem(null);
        } else {
          onClose();
        }
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
  }, [isOpen, lightboxItem, onClose]);

  // Reset filter saat berpindah kartu peran
  useEffect(() => {
    setActiveCategoryFilter('Semua');
    setLightboxItem(null);
  }, [role?.roleKey]);

  if (!isOpen || !role) return null;

  const roleKey = role.roleKey || 'photo';
  const disciplineInfo = DISCIPLINE_DATA[roleKey] || DISCIPLINE_DATA.photo;
  const DisciplineIcon = disciplineInfo.icon || Camera;

  // Saring galeri berdasarkan filter kategori aktif
  const filteredGallery =
    activeCategoryFilter === 'Semua'
      ? disciplineInfo.gallery
      : disciplineInfo.gallery.filter((item) => item.category === activeCategoryFilter);

  const heroPhotoUrl = getStoragePublicUrl(role.photo) || role.photo || disciplineInfo.gallery[0]?.image;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(7, 19, 32, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        overflowY: 'auto',
        fontFamily: HELVETICA_STACK,
        animation: 'roleModalFadeIn 280ms cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#071320',
          boxShadow: '0 0 100px rgba(0, 0, 0, 0.8)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          position: 'relative'
        }}
      >
        {/* Sticky Top Bar (Navigasi Netflix-Style + Quick Switcher + Tombol Close) */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 40,
            backgroundColor: 'rgba(7, 19, 32, 0.88)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '0.85rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          {/* Sisi Kiri: Badge Disiplin & Tombol Kembali */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 200ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <span>← Kembali</span>
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 12px',
                borderRadius: '9999px',
                backgroundColor: disciplineInfo.themeColor || '#00529B',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: '800',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}
            >
              <DisciplineIcon size={13} />
              <span>{role.badge || role.title}</span>
            </div>
          </div>

          {/* Quick Switcher 4 Peran (Gaya Netflix Navigation) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              overflowX: 'auto',
              scrollbarWidth: 'none'
            }}
          >
            {allRoles.map((r, idx) => {
              const isActive = (r.roleKey || `role-${idx}`) === roleKey;
              return (
                <button
                  key={r.id || idx}
                  type="button"
                  onClick={() => onSelectRole && onSelectRole(r, idx)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    backgroundColor: isActive ? '#ffffff' : 'transparent',
                    color: isActive ? '#071320' : 'rgba(255, 255, 255, 0.65)',
                    border: isActive ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '11px',
                    fontWeight: isActive ? '800' : '600',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 200ms ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)';
                  }}
                >
                  0{idx + 1} {r.badge || r.title.replace('As a ', '')}
                </button>
              );
            })}
          </div>

          {/* Tombol Tutup Silang */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Halaman Detail"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 200ms ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(237, 28, 36, 0.85)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            }}
          >
            <X size={18} />
          </button>
        </header>

        {/* Cinematic Widescreen Banner (Sesuai Video Referensi Netflix / Interstellar Showcase) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(360px, 52vh, 520px)',
            overflow: 'hidden',
            backgroundColor: '#071320'
          }}
        >
          {/* Media Gambar Latar Sinematik */}
          <img
            src={heroPhotoUrl}
            alt={role.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'brightness(0.85) contrast(1.08)'
            }}
          />

          {/* Gradient Overlay Menyeluruh (Gelap di Bawah & Kiri untuk Keterbacaan Teks Monumental) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(7, 19, 32, 0.4) 0%, rgba(7, 19, 32, 0.2) 30%, rgba(7, 19, 32, 0.85) 80%, #071320 100%), linear-gradient(90deg, rgba(7, 19, 32, 0.8) 0%, rgba(7, 19, 32, 0.4) 50%, transparent 100%)'
            }}
          />

          {/* Konten Hero Banner */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              padding: 'clamp(1.5rem, 4vw, 3.5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              zIndex: 2,
              maxWidth: '920px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#7AC142',
                  backgroundColor: 'rgba(122, 193, 66, 0.15)',
                  padding: '3px 10px',
                  borderRadius: '4px',
                  border: '1px solid rgba(122, 193, 66, 0.3)'
                }}
              >
                DISCIPLINE SHOWCASE
              </span>
              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: '600' }}>
                PRIO SETYO PORTFOLIO ARCHIVE
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
                fontWeight: '800',
                lineHeight: 1.05,
                color: '#ffffff',
                margin: '0 0 1rem 0',
                textTransform: 'uppercase',
                letterSpacing: '-0.03em'
              }}
            >
              {role.title}
            </h1>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.9)',
                margin: '0 0 1.75rem 0',
                maxWidth: '720px'
              }}
            >
              {disciplineInfo.tagline}
            </p>

            {/* Tombol Aksi Hero Banner */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.85rem' }}>
              <a
                href="#gallery-section"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('role-gallery-anchor');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.85rem 1.65rem',
                  borderRadius: '9999px',
                  backgroundColor: '#ffffff',
                  color: '#071320',
                  fontSize: '13px',
                  fontWeight: '800',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                  transition: 'all 200ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>Jelajahi Galeri Karya</span>
                <ArrowDown size={15} />
              </a>

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
                    padding: '0.85rem 1.5rem',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    transition: 'all 200ms ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <span>Mulai Diskusi Proyek</span>
                  <ArrowUpRight size={15} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bagian Overview Filosofi & 4 Indikator Metrik Unggulan */}
        <section
          style={{
            padding: '2.5rem clamp(1.5rem, 4vw, 3.5rem)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: '#0A1726'
          }}
        >
          {/* Deskripsi & Ringkasan Peran */}
          <div style={{ maxWidth: '860px', marginBottom: '2.25rem' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-secondary-fixed, #a5c7ff)',
                display: 'block',
                marginBottom: '0.5rem'
              }}
            >
              IKHTISAR KOMPETENSI
            </span>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: '#d2e4ff',
                margin: 0
              }}
            >
              {role.desc}
            </p>
          </div>

          {/* Grid 4 Kartu Metrik Spesifik Disiplin */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem'
            }}
          >
            {disciplineInfo.stats.map((st, i) => (
              <div
                key={i}
                style={{
                  padding: '1.25rem 1.4rem',
                  borderRadius: '1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    color: 'rgba(255, 255, 255, 0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}
                >
                  {st.label}
                </span>
                <span
                  style={{
                    fontSize: '22px',
                    fontWeight: '800',
                    color: '#ffffff',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {st.value}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.55)',
                    lineHeight: 1.4,
                    marginTop: '2px'
                  }}
                >
                  {st.desc}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section Galeri Karya Interaktif */}
        <section
          id="role-gallery-anchor"
          style={{
            padding: '3rem clamp(1.5rem, 4vw, 3.5rem) 5rem clamp(1.5rem, 4vw, 3.5rem)',
            flex: 1
          }}
        >
          {/* Header Galeri + Filter Kategori */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1.25rem',
              marginBottom: '2rem'
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#7AC142',
                  display: 'block',
                  marginBottom: '0.4rem'
                }}
              >
                GALERI ARSIP TERKURASI
              </span>
              <h2
                style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  margin: 0
                }}
              >
                Koleksi Karya Pilihan ({filteredGallery.length})
              </h2>
            </div>

            {/* Filter Tabs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px'
              }}
            >
              {disciplineInfo.filters.map((filter) => {
                const isCurrent = activeCategoryFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveCategoryFilter(filter)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      backgroundColor: isCurrent ? '#ffffff' : 'rgba(255, 255, 255, 0.06)',
                      color: isCurrent ? '#071320' : 'rgba(255, 255, 255, 0.75)',
                      border: isCurrent ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                      fontSize: '11px',
                      fontWeight: isCurrent ? '800' : '600',
                      cursor: 'pointer',
                      transition: 'all 200ms ease'
                    }}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid Galeri Karya */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxItem(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setLightboxItem(item);
                }}
                style={{
                  borderRadius: '1rem',
                  backgroundColor: '#0c1a29',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.45)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                {/* Media Image Container */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '220px',
                    overflow: 'hidden',
                    backgroundColor: '#071320'
                  }}
                >
                  <img
                    src={getStoragePublicUrl(item.image) || item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 500ms ease'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(7, 19, 32, 0.85) 100%)'
                    }}
                  />

                  {/* Kategori Tag & Year */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(7, 19, 32, 0.75)',
                        backdropFilter: 'blur(8px)',
                        color: '#ffffff',
                        fontSize: '10px',
                        fontWeight: '700',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        border: '1px solid rgba(255, 255, 255, 0.15)'
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Icon Maximize Preview */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(7, 19, 32, 0.7)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Maximize2 size={13} />
                  </div>
                </div>

                {/* Deskripsi Karya */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '11px', color: '#7AC142', fontWeight: '700' }}>
                        {item.client}
                      </span>
                      <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', fontWeight: '600' }}>
                        {item.year}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#ffffff',
                        margin: '0 0 8px 0',
                        lineHeight: 1.35
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '12px',
                        lineHeight: 1.6,
                        color: 'rgba(255, 255, 255, 0.7)',
                        margin: '0 0 12px 0'
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* Specs Tags */}
                  {Array.isArray(item.specs) && item.specs.length > 0 && (
                    <div
                      style={{
                        paddingTop: '10px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4px'
                      }}
                    >
                      {item.specs.map((sp, sIdx) => (
                        <span
                          key={sIdx}
                          style={{
                            fontSize: '10px',
                            padding: '2px 6px',
                            borderRadius: '3px',
                            backgroundColor: 'rgba(255, 255, 255, 0.06)',
                            color: 'rgba(255, 255, 255, 0.65)',
                            fontWeight: '500'
                          }}
                        >
                          {sp}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal Lightbox Popup untuk Foto/Video Terpilih */}
        {lightboxItem && (
          <div
            role="dialog"
            aria-modal="true"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              backgroundColor: 'rgba(0, 0, 0, 0.92)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              animation: 'roleModalFadeIn 200ms ease'
            }}
            onClick={() => setLightboxItem(null)}
          >
            <div
              style={{
                position: 'relative',
                maxWidth: '960px',
                width: '100%',
                maxHeight: '90vh',
                backgroundColor: '#071320',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tombol Tutup Lightbox */}
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  zIndex: 20,
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(7, 19, 32, 0.8)',
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

              {/* Lightbox Image */}
              <div
                style={{
                  width: '100%',
                  height: 'clamp(280px, 50vh, 520px)',
                  backgroundColor: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img
                  src={getStoragePublicUrl(lightboxItem.image) || lightboxItem.image}
                  alt={lightboxItem.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>

              {/* Lightbox Details */}
              <div style={{ padding: '1.5rem 1.75rem', backgroundColor: '#0A1726' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      color: '#7AC142',
                      backgroundColor: 'rgba(122, 193, 66, 0.15)',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    {lightboxItem.category}
                  </span>
                  <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                    {lightboxItem.client} • {lightboxItem.year}
                  </span>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: '0 0 8px 0' }}>
                  {lightboxItem.title}
                </h3>

                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#d2e4ff', margin: '0 0 12px 0' }}>
                  {lightboxItem.desc}
                </p>

                {Array.isArray(lightboxItem.specs) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {lightboxItem.specs.map((s, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '11px',
                          color: '#ffffff',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          padding: '3px 8px',
                          borderRadius: '4px'
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes roleModalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
