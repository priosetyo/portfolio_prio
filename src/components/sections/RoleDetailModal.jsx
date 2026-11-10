import React, { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import { getStoragePublicUrl } from '../../lib/queries';

const HELVETICA_STACK = "'Helvetica Neue', Helvetica, Arial, sans-serif";

// 5 Proyek Kurasi Sinematik untuk Masing-Masing Disiplin Visual
export const DISCIPLINE_GALLERY_DATA = {
  photo: {
    disciplineKey: 'photo',
    name: 'Photography',
    themeColor: '#00529B',
    accentColor: '#38bdf8',
    projects: [
      {
        id: 'photo-1',
        title: 'Refinery Twilight Operations',
        category: 'Kilang & Industri',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368810064-9uc6.jpg'
      },
      {
        id: 'photo-2',
        title: 'Offshore Marine Terminal & Fleet',
        category: 'Maritim & Logistik',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368701318-a4eb.jpg'
      },
      {
        id: 'photo-3',
        title: 'Turnaround Engineering Precision',
        category: 'Inspeksi & Engineering',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368636694-7mq2.jpg'
      },
      {
        id: 'photo-4',
        title: 'Perwira Energi Executive Portrait',
        category: 'Komersial & Portret',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368767298-jnio.jpg'
      },
      {
        id: 'photo-5',
        title: 'Mangrove Coastal Conservation',
        category: 'ESG & Lingkungan Hidup',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368839399-7ioy.jpg'
      }
    ]
  },
  video: {
    disciplineKey: 'video',
    name: 'Videography',
    themeColor: '#ED1C24',
    accentColor: '#f87171',
    projects: [
      {
        id: 'video-1',
        title: 'Pertamina Patra Niaga Anthem',
        category: 'Cinema Commercial',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368810064-9uc6.jpg'
      },
      {
        id: 'video-2',
        title: 'Beyond Zero Incident',
        category: 'Dokumenter Keselamatan',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368701318-a4eb.jpg'
      },
      {
        id: 'video-3',
        title: 'Selat Malaka Aerial Symphony',
        category: 'Sinematografi Drone',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368839399-7ioy.jpg'
      },
      {
        id: 'video-4',
        title: 'Turnaround: The Pulse of Energy',
        category: 'Video Profil Turnaround',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368636694-7mq2.jpg'
      },
      {
        id: 'video-5',
        title: 'Anugrah Humas Indonesia Winner Film',
        category: 'Penghargaan Nasional',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368767298-jnio.jpg'
      }
    ]
  },
  design: {
    disciplineKey: 'design',
    name: 'Graphic Design',
    themeColor: '#7AC142',
    accentColor: '#86efac',
    projects: [
      {
        id: 'design-1',
        title: 'Corporate Sustainability Report',
        category: 'Desain Editorial',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368767298-jnio.jpg'
      },
      {
        id: 'design-2',
        title: 'Refinery Spatial Infographic System',
        category: 'Infografis Teknis',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368810064-9uc6.jpg'
      },
      {
        id: 'design-3',
        title: 'HSSE Golden Rules Iconography',
        category: 'Sistem Piktogram',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368636694-7mq2.jpg'
      },
      {
        id: 'design-4',
        title: 'Annual Energy Summit Brand Identity',
        category: 'Brand Identity',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEofPaya-ZGWveRCDy8cNUJRN_N5NCwX8ngR_QWgpEBmZTMQSRSh6bxRyttNiIroK5QcXboYpJxqPZs9QkCWZcOtUeAGvDkKGmo-uebF1mBjT3YA7YmeL8Csg_uPYRVhbCmdunD9DPNpU9f3Sb3ARiTfkBAzuu8v5JuA6WzP9sHblTo2IT7q4-IVdBGZ-q_-tkeuAJxBOf8ewixWB6K-4TYKjcKa2VI3i50WA3Er0'
      },
      {
        id: 'design-5',
        title: 'Gema Kilang Internal Magazine',
        category: 'Desain Majalah',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368701318-a4eb.jpg'
      }
    ]
  },
  social: {
    disciplineKey: 'social',
    name: 'Social Media Strategy',
    themeColor: '#ffffff',
    accentColor: '#ffffff',
    projects: [
      {
        id: 'social-1',
        title: 'Instagram 8K to 67K+ Hyper-Growth',
        category: 'Studi Kasus Pertumbuhan',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368701318-a4eb.jpg'
      },
      {
        id: 'social-2',
        title: 'Hari Energi Nasional Carousel',
        category: 'Kampanye Edukasi Viral',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368810064-9uc6.jpg'
      },
      {
        id: 'social-3',
        title: 'Behind the Helmet Reels Series',
        category: 'Serial Video Humanis',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368767298-jnio.jpg'
      },
      {
        id: 'social-4',
        title: 'Digital Crisis Communication Protocol',
        category: 'Manajemen Reputasi',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368636694-7mq2.jpg'
      },
      {
        id: 'social-5',
        title: 'Interactive Live Session & Q&A',
        category: 'Keterlibatan Komunitas',
        image: 'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368839399-7ioy.jpg'
      }
    ]
  }
};

// Pola Staggered (Tinggi & Translasi Zig-zag) untuk 5 Kartu Vertikal
const STAGGER_PRESETS = [
  { height: '84%', translateY: '18px' },
  { height: '92%', translateY: '-16px' },
  { height: '98%', translateY: '-24px' }, // Center Heroic
  { height: '92%', translateY: '16px' },
  { height: '84%', translateY: '-18px' }
];

export function RoleDetailModal({
  isOpen,
  onClose,
  role
}) {
  const [selectedDisciplineKey, setSelectedDisciplineKey] = useState('photo');
  const [hoveredStripIdx, setHoveredStripIdx] = useState(null);
  const [activeProjectIdx, setActiveProjectIdx] = useState(null);

  // Sinkronisasi disiplin awal saat modal dibuka berdasarkan kartu yang diklik di section About
  useEffect(() => {
    if (role && role.roleKey && DISCIPLINE_GALLERY_DATA[role.roleKey]) {
      setSelectedDisciplineKey(role.roleKey);
    } else {
      setSelectedDisciplineKey('photo');
    }
    setActiveProjectIdx(null);
    setHoveredStripIdx(null);
  }, [role, isOpen]);

  // Lock scroll background saat modal aktif & dengarkan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeProjectIdx !== null) {
          setActiveProjectIdx(null);
        } else if (onClose) {
          onClose();
        }
      } else if (e.key === 'ArrowRight' && activeProjectIdx !== null) {
        setActiveProjectIdx((prev) => (prev + 1) % 5);
      } else if (e.key === 'ArrowLeft' && activeProjectIdx !== null) {
        setActiveProjectIdx((prev) => (prev - 1 + 5) % 5);
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
  }, [isOpen, activeProjectIdx, onClose]);

  const activeDiscipline = useMemo(() => {
    return DISCIPLINE_GALLERY_DATA[selectedDisciplineKey] || DISCIPLINE_GALLERY_DATA.photo;
  }, [selectedDisciplineKey]);

  // 5 Kartu Proyek
  const displayProjects = useMemo(() => {
    return (activeDiscipline.projects || []).slice(0, 5);
  }, [activeDiscipline]);

  if (!isOpen) return null;

  const isAnyActive = activeProjectIdx !== null;

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
          padding: '0 4vw',
          opacity: isAnyActive ? 0.15 : 1,
          transition: 'opacity 850ms cubic-bezier(0.19, 1, 0.22, 1)'
        }}
      >
        {[...Array(6)].map((_, i) => (
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
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (isAnyActive) {
            setActiveProjectIdx(null);
          } else if (onClose) {
            onClose();
          }
        }}
        aria-label={isAnyActive ? 'Tutup Foto (ESC)' : 'Tutup Galeri (ESC)'}
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
          backgroundColor: isAnyActive ? 'rgba(0, 0, 0, 0.75)' : 'rgba(255, 255, 255, 0.08)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '0.06em',
          cursor: 'pointer',
          transition: 'all 200ms ease',
          boxShadow: isAnyActive ? '0 4px 20px rgba(0, 0, 0, 0.6)' : 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(237, 28, 36, 0.85)';
          e.currentTarget.style.borderColor = 'transparent';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isAnyActive
            ? 'rgba(0, 0, 0, 0.75)'
            : 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
        }}
      >
        <span>ESC</span>
        <X size={14} />
      </button>

      {/* 3. Badan Konten Utama: 5 Kartu Vertikal dengan Transisi Membuka Hampir Penuh Layar */}
      <div
        style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}
        onClick={() => {
          if (isAnyActive) setActiveProjectIdx(null);
        }}
      >
        <main
          style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isAnyActive ? '1.5vh 2.5vw' : '2rem clamp(1rem, 3.5vw, 3.5rem)',
            transition: 'padding 850ms cubic-bezier(0.19, 1, 0.22, 1)',
            overflow: 'hidden'
          }}
        >
          {/* Kontainer Horizontal untuk 5 Kartu Vertikal */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isAnyActive ? '0px' : '16px',
              width: '100%',
              height: '100%',
              maxWidth: isAnyActive ? '95vw' : '1360px',
              position: 'relative',
              transition:
                'gap 850ms cubic-bezier(0.19, 1, 0.22, 1), max-width 850ms cubic-bezier(0.19, 1, 0.22, 1)'
            }}
          >
            {displayProjects.map((project, idx) => {
              const isSelected = activeProjectIdx === idx;
              const isOtherSelected = isAnyActive && !isSelected;
              const isHovered = hoveredStripIdx === idx && !isAnyActive;
              const stagger = STAGGER_PRESETS[idx % STAGGER_PRESETS.length];

              // Penentuan Dimensi: Saat Terpilih Dibuat Besar Hampir Penuh Layar
              let flexValue = '1';
              let heightValue = stagger.height;
              let transformValue = `translate3d(0, ${stagger.translateY}, 0)`;
              let borderRadiusValue = '16px';
              let opacityValue = 1;
              let zIndexValue = 2;

              if (isSelected) {
                // Saat diklik: Melebar besar hampir penuh layar (95vw & 88vh)
                flexValue = '1 1 100%';
                heightValue = 'clamp(420px, 88vh, 880px)';
                transformValue = 'translate3d(0, 0px, 0)';
                borderRadiusValue = '16px';
                zIndexValue = 40;
              } else if (isOtherSelected) {
                // Kartu lainnya menyusut secara sangat halus ke 0
                flexValue = '0 0 0%';
                heightValue = stagger.height;
                transformValue = `translate3d(0, ${stagger.translateY}, 0) scale(0.92)`;
                opacityValue = 0;
                zIndexValue = 1;
              } else if (isHovered) {
                // Hover normal: melebar elastis
                flexValue = '3.8';
                zIndexValue = 10;
              }

              return (
                <div
                  key={project.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isSelected) {
                      setActiveProjectIdx(null);
                    } else {
                      setActiveProjectIdx(idx);
                    }
                  }}
                  onMouseEnter={() => !isAnyActive && setHoveredStripIdx(idx)}
                  onMouseLeave={() => !isAnyActive && setHoveredStripIdx(null)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveProjectIdx(isSelected ? null : idx);
                    }
                  }}
                  aria-label={isSelected ? 'Klik untuk memperkecil' : `Buka karya ${project.title}`}
                  style={{
                    position: 'relative',
                    flex: flexValue,
                    height: heightValue,
                    transform: transformValue,
                    opacity: opacityValue,
                    borderRadius: borderRadiusValue,
                    overflow: 'hidden',
                    cursor: isSelected ? 'zoom-out' : 'pointer',
                    backgroundColor: '#050505',
                    border: isSelected
                      ? '1px solid rgba(255, 255, 255, 0.16)'
                      : isHovered
                      ? `1px solid ${activeDiscipline.accentColor || '#38bdf8'}`
                      : '1px solid rgba(255, 255, 255, 0.09)',
                    boxShadow: isSelected
                      ? '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 1px rgba(255, 255, 255, 0.25)'
                      : isHovered
                      ? '0 24px 48px rgba(0, 0, 0, 0.8)'
                      : '0 10px 24px rgba(0, 0, 0, 0.4)',
                    transition:
                      'flex 850ms cubic-bezier(0.19, 1, 0.22, 1), ' +
                      'height 850ms cubic-bezier(0.19, 1, 0.22, 1), ' +
                      'transform 850ms cubic-bezier(0.19, 1, 0.22, 1), ' +
                      'border-radius 850ms cubic-bezier(0.19, 1, 0.22, 1), ' +
                      'opacity 600ms cubic-bezier(0.19, 1, 0.22, 1), ' +
                      'border-color 350ms ease, ' +
                      'box-shadow 500ms ease',
                    pointerEvents: isOtherSelected ? 'none' : 'auto',
                    zIndex: zIndexValue,
                    willChange: 'flex, height, transform',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {/* Media Karya: object-fit: cover Konsisten Tanpa Snap untuk Transisi Paling Halus */}
                  {project.videoUrl && isSelected ? (
                    <video
                      src={project.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        backgroundColor: '#000000'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
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
                        // Transisi skala halus: scale(1) -> scale(1.02) saat dibuka
                        transform: isSelected
                          ? 'scale(1.02)'
                          : isHovered
                          ? 'scale(1.05)'
                          : 'scale(1)',
                        filter: isSelected
                          ? 'brightness(1) contrast(1.03)'
                          : isHovered
                          ? 'brightness(0.95) contrast(1.06)'
                          : 'brightness(0.55) contrast(1.02)',
                        transition:
                          'transform 900ms cubic-bezier(0.19, 1, 0.22, 1), filter 600ms ease',
                        willChange: 'transform'
                      }}
                    />
                  )}

                  {/* Efek Gelap (Overlay Hitam): Menghilang Penuh Saat Kartu Dibuka */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: isHovered
                        ? 'linear-gradient(180deg, rgba(11, 11, 11, 0.15) 0%, rgba(11, 11, 11, 0.72) 100%)'
                        : 'linear-gradient(180deg, rgba(11, 11, 11, 0.55) 0%, rgba(11, 11, 11, 0.85) 100%)',
                      opacity: isSelected ? 0 : 1,
                      transition: 'opacity 500ms ease, background 400ms ease',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Teks Judul Kategori/Karya di Tengah Kartu: Fade-out Halus Saat Dibuka */}
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
                      zIndex: 3,
                      opacity: isSelected ? 0 : 1,
                      transform: isSelected ? 'scale(0.92) translateY(16px)' : 'scale(1) translateY(0)',
                      transition:
                        'opacity 350ms ease, transform 450ms cubic-bezier(0.19, 1, 0.22, 1)',
                      pointerEvents: 'none'
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
                            maxWidth: '140px',
                            lineHeight: 1.3
                          }}
                        >
                          {project.title}
                        </span>
                      </div>
                    ) : (
                      /* Saat di-Hover: Judul Melebar Penuh */
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          maxWidth: '300px'
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
                            fontSize: '21px',
                            fontWeight: '900',
                            lineHeight: 1.2,
                            letterSpacing: '-0.02em',
                            textTransform: 'uppercase',
                            color: '#ffffff',
                            margin: 0
                          }}
                        >
                          {project.title}
                        </h3>
                      </div>
                    )}
                  </div>

                  {/* Indikator Garis Aksen Halus di Dasar Kartu (Hilang Saat Dibuka) */}
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
                      opacity: isSelected ? 0 : 1,
                      transition: 'background-color 300ms ease, opacity 350ms ease'
                    }}
                  />
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
