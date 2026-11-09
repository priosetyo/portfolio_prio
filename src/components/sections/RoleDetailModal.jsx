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

      {/* 2. Tombol Tutup Floating Minimalis di Kanan Atas (Tampilan 5 Kartu Awal) */}
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
          <X size={14} />
        </button>
      )}

      {/* 3. Badan Konten Utama: 5 Kartu Vertikal Ramping (Vertical Strips Accordion) */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
        <main
          style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem clamp(1rem, 3.5vw, 3.5rem)',
            overflow: 'hidden'
          }}
        >
          {/* Kontainer Horizontal untuk 5 Kartu Vertikal */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: activeProjectIdx !== null ? '0px' : '16px',
              width: '100%',
              height: '100%',
              maxWidth: '1360px',
              position: 'relative',
              transition: 'gap 500ms ease'
            }}
          >
            {displayProjects.map((project, idx) => {
              const isHovered = hoveredStripIdx === idx;
              const isSelected = activeProjectIdx === idx;
              const isOtherSelected = activeProjectIdx !== null && !isSelected;
              const stagger = STAGGER_PRESETS[idx % STAGGER_PRESETS.length];

              // State Ketika Diklik: Murni Menampilkan Foto / Video Saja Tanpa Emblem Apapun
              if (isSelected) {
                return (
                  <div
                    key={project.id}
                    onClick={() => setActiveProjectIdx(null)}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 40,
                      backgroundColor: '#000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      cursor: 'zoom-out',
                      animation: 'pureMediaReveal 380ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
                    }}
                  >
                    {/* Media Murni: Foto atau Video Fullscreen */}
                    {project.videoUrl ? (
                      <video
                        src={project.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          backgroundColor: '#000000'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <img
                        src={getStoragePublicUrl(project.image) || project.image}
                        alt={project.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          backgroundColor: '#000000'
                        }}
                      />
                    )}

                    {/* Satu-satunya Elemen: Tombol Tutup / ESC */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveProjectIdx(null);
                      }}
                      aria-label="Tutup Tampilan (ESC)"
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
                        backgroundColor: 'rgba(0, 0, 0, 0.65)',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(12px)',
                        fontSize: '11px',
                        fontWeight: '700',
                        letterSpacing: '0.06em',
                        cursor: 'pointer',
                        transition: 'all 200ms ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(237, 28, 36, 0.9)';
                        e.currentTarget.style.borderColor = 'transparent';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.65)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                      }}
                    >
                      <span>ESC</span>
                      <X size={14} />
                    </button>
                  </div>
                );
              }

              // Tampilan Normal: 5 Kartu Vertikal Ramping dengan Posisi Staggered (Zig-zag)
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
                    borderRadius: '16px',
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
                          maxWidth: '300px',
                          animation: 'fadeInText 250ms ease forwards'
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

                  {/* Indikator Garis Aksen Halus di Dasar Kartu */}
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

      {/* Global CSS Animasi & Transisi Lembut */}
      <style>{`
        @keyframes pureMediaReveal {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInText {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
