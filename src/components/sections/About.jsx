import React, { useState, useMemo } from 'react';
import { getStoragePublicUrl } from '../../lib/queries';
import { ArrowUpRight } from 'lucide-react';
import { RoleDetailModal } from './RoleDetailModal';

export const DEFAULT_ABOUT_ROLES = [
  {
    id: 'role-photographer',
    roleKey: 'photo',
    title: 'As a Photographer',
    badge: 'Photographer',
    color: '#00529B', // Pertamina Blue
    hoverBg: 'linear-gradient(160deg, #00529B 0%, #003666 100%)',
    photo:
      'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368810064-9uc6.jpg',
    desc: 'Menangkap esensi operasi industri energi skala besar, dokumentasi infrastruktur kilang, maritim, hingga potret komersial berdaya pikat dengan pencahayaan sinematik dan komposisi presisi.',
    actionLabel: 'Selengkapnya',
    actionUrl: '#recent-work'
  },
  {
    id: 'role-videographer',
    roleKey: 'video',
    title: 'As a Videographer',
    badge: 'Videographer',
    color: '#ED1C24', // Pertamina Red
    hoverBg: 'linear-gradient(160deg, #ED1C24 0%, #A80010 100%)',
    photo:
      'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368839399-7ioy.jpg',
    desc: 'Memproduksi video profil korporat berstandar broadcast, sinematografi aerial drone, commercial anthem, dan dokumenter ESG peraih penghargaan nasional Anugrah Humas Indonesia.',
    actionLabel: 'Selengkapnya',
    actionUrl: '#recent-work'
  },
  {
    id: 'role-designer',
    roleKey: 'design',
    title: 'As a Graphic Designer',
    badge: 'Graphic Designer',
    color: '#7AC142', // Pertamina Vibrant Green / Olive
    hoverBg: 'linear-gradient(160deg, #7AC142 0%, #528A25 100%)',
    photo:
      'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368767298-jnio.jpg',
    desc: 'Merancang sistem identitas visual yang fungsional berdisiplin Swiss Modernist, desain editorial laporan korporat, infografis industri berkontras tinggi, dan materi komunikasi publik.',
    actionLabel: 'Selengkapnya',
    actionUrl: '#recent-work'
  },
  {
    id: 'role-social-media',
    roleKey: 'social',
    title: 'As a Social Media Specialist',
    badge: 'Social Media Specialist',
    color: '#ffffff', // Clean White
    hoverColor: '#ffffff',
    hoverBg: '#ffffff',
    isLight: true,
    photo:
      'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/hero-backgrounds/hero-bg-photo-1793368701318-a4eb.jpg',
    desc: 'Memimpin strategi komunikasi digital terintegrasi yang berhasil melipatgandakan audiens Instagram @pertaminaru2 dari 8.000 ke 67.000+ followers—menjadikannya akun kilang refinery #1 di Indonesia.',
    actionLabel: 'Selengkapnya',
    actionUrl: 'https://www.instagram.com/pertaminaru2/'
  }
];

export function isColorLight(hexOrColor) {
  if (!hexOrColor) return false;
  const str = String(hexOrColor).trim().toLowerCase();
  if (str === '#ffffff' || str === '#fff' || str === 'white' || str.startsWith('rgb(255, 255, 255)')) return true;
  if (str.startsWith('#')) {
    const hex = str.replace('#', '');
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      return (r * 299 + g * 587 + b * 114) / 1000 > 180;
    }
    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return (r * 299 + g * 587 + b * 114) / 1000 > 180;
    }
  }
  return false;
}

export function About({ settings }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [touchedIdx, setTouchedIdx] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const aboutRoles = useMemo(() => {
    let custom = settings?.about_roles;
    if (typeof custom === 'string') {
      try {
        custom = JSON.parse(custom);
      } catch (e) {
        custom = null;
      }
    }
    if (Array.isArray(custom) && custom.length > 0) {
      return DEFAULT_ABOUT_ROLES.map((def, idx) => {
        const item = custom[idx] || {};
        const rawColor =
          idx === 3 && (item.color === '#0A2540' || item.hoverColor === '#0A2540')
            ? '#ffffff'
            : (item.hoverColor || item.color || def.color);
        const isLight = isColorLight(rawColor) || Boolean(def.isLight) || Boolean(item.isLight);
        return {
          ...def,
          ...item,
          color: rawColor,
          hoverColor: rawColor,
          hoverBg: rawColor === '#ffffff' ? '#ffffff' : (item.hoverBg || def.hoverBg),
          isLight,
          photo: getStoragePublicUrl(item.photo) || item.photo || def.photo
        };
      });
    }
    return DEFAULT_ABOUT_ROLES;
  }, [settings?.about_roles]);

  const handleCardClick = (role, idx) => {
    setSelectedRole(role);
  };

  return (
    <section
      id="about"
      style={{
        width: '100%',
        backgroundColor: '#F4F7FA',
        padding: '5rem 0 5.5rem 0',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 var(--margin-mobile)'
        }}
      >
        {/* Header Section */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span
            className="font-label-mono-sm"
            style={{
              color: 'var(--color-primary-container)',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            ABOUT PRIO SETYO
          </span>
          <h2
            className="font-headline-lg"
            style={{
              color: 'var(--color-on-surface)',
              fontWeight: '700',
              letterSpacing: '-0.025em',
              marginBottom: '0.65rem'
            }}
          >
            Multi-Disciplinary Visual Practitioner
          </h2>
          <p
            className="font-body-md"
            style={{
              color: '#334155',
              fontSize: '1.05rem',
              maxWidth: '46rem',
              lineHeight: 1.65,
              margin: 0
            }}
          >
            Menjembatani kedisiplinan dan presisi komunikasi industri energi dengan estetika visual modern, desain fungsional, dan strategi narasi digital berdaya pikat.
          </p>
        </div>

        {/* 4 Interactive Vertical Cards Grid (Pertamina Patra Niaga Style) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            alignItems: 'stretch'
          }}
          className="about-roles-grid"
        >
          {aboutRoles.map((role, idx) => {
            const isHovered = hoveredIdx === idx || touchedIdx === idx;
            const photoUrl = getStoragePublicUrl(role.photo) || role.photo;
            const isLight = isColorLight(role.hoverColor || role.color) || Boolean(role.isLight);
            const activeBg = role.hoverBg || role.hoverColor || role.color || '#00529B';

            return (
              <div
                key={role.id || idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => handleCardClick(role, idx)}
                onTouchStart={() => setTouchedIdx((prev) => (prev === idx ? null : idx))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(role, idx);
                  }
                }}
                aria-label={`${role.title} — ${role.desc}`}
                style={{
                  position: 'relative',
                  height: '480px',
                  borderRadius: '1.25rem',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: '#071320',
                  border: 'none',
                  boxShadow: isHovered
                    ? isLight
                      ? '0 24px 48px rgba(10, 37, 64, 0.12)'
                      : '0 20px 38px rgba(10, 37, 64, 0.22)'
                    : '0 4px 16px rgba(10, 37, 64, 0.08)',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  transition:
                    'transform 400ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 400ms cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Background Photo */}
                <img
                  src={photoUrl}
                  alt={role.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    opacity: isHovered ? (isLight ? 0.04 : 0.18) : 1,
                    filter: isHovered ? (isLight ? 'grayscale(100%)' : 'grayscale(30%)') : 'none',
                    transition:
                      'transform 650ms cubic-bezier(0.16, 1, 0.3, 1), opacity 350ms ease, filter 350ms ease'
                  }}
                />

                {/* Base Dark Gradient (Default State) */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to bottom, rgba(7, 19, 32, 0.72) 0%, rgba(7, 19, 32, 0.12) 42%, rgba(7, 19, 32, 0.88) 100%)',
                    opacity: isHovered ? 0 : 1,
                    transition: 'opacity 350ms ease'
                  }}
                />

                {/* Vibrant Hover Color Overlay (Pertamina Style / White for Column 4) */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: activeBg,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 350ms ease'
                  }}
                />

                {/* Card Content Structure */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    height: '100%',
                    padding: '2rem 1.65rem 1.65rem 1.65rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    color: '#ffffff'
                  }}
                >
                  {/* Top: Role Title */}
                  <div>
                    <h3
                      className="font-headline-sm"
                      style={{
                        fontSize: '21px',
                        fontWeight: '700',
                        color: isHovered && isLight ? '#071320' : '#ffffff',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.3,
                        margin: 0,
                        textShadow: isHovered && isLight ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.45)',
                        transition: 'color 300ms ease, text-shadow 300ms ease'
                      }}
                    >
                      {role.title}
                    </h3>
                  </div>

                  {/* Bottom: Information Reveal on Hover */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end'
                    }}
                  >
                    {/* Hover Content Block */}
                    <div
                      style={{
                        maxHeight: isHovered ? '240px' : '0px',
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateY(0)' : 'translateY(12px)',
                        overflow: 'hidden',
                        transition:
                          'max-height 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease, transform 350ms cubic-bezier(0.16, 1, 0.3, 1)',
                        marginBottom: isHovered ? '0.5rem' : '0'
                      }}
                    >
                      {/* Pill Badge (Pertamina Style / Soft Neutral Pill for White Card) */}
                      <span
                        className="font-label-mono-sm"
                        style={{
                          display: 'inline-block',
                          padding: '0.35rem 0.85rem',
                          borderRadius: '9999px',
                          backgroundColor: isLight ? 'rgba(7, 19, 32, 0.06)' : '#ffffff',
                          color: isLight ? '#071320' : (role.hoverColor || role.color || '#00529B'),
                          fontSize: '11px',
                          fontWeight: '700',
                          letterSpacing: '0.02em',
                          marginBottom: '0.85rem',
                          border: 'none',
                          boxShadow: isLight ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.15)',
                          transition: 'all 350ms ease'
                        }}
                      >
                        {role.badge}
                      </span>

                      {/* Descriptive Paragraph */}
                      <p
                        className="font-body-sm"
                        style={{
                          fontSize: '13px',
                          lineHeight: 1.62,
                          color: isLight ? '#334155' : 'rgba(255, 255, 255, 0.95)',
                          margin: 0,
                          fontWeight: isLight ? '500' : '400',
                          transition: 'color 350ms ease'
                        }}
                      >
                        {role.desc}
                      </p>
                    </div>

                    {/* Bottom Row: Selengkapnya & Arrow */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isHovered ? 'space-between' : 'flex-end',
                        paddingTop: isHovered ? '0.85rem' : '0',
                        borderTop: isHovered && !isLight
                          ? '1px solid rgba(255, 255, 255, 0.22)'
                          : '1px solid transparent',
                        transition: 'all 350ms ease'
                      }}
                    >
                      {isHovered && (
                        <span
                          className="font-label-mono-sm"
                          style={{
                            fontSize: '12px',
                            fontWeight: '700',
                            color: isLight ? '#071320' : '#ffffff',
                            letterSpacing: '0.02em',
                            transition: 'color 350ms ease'
                          }}
                        >
                          {role.actionLabel || 'Selengkapnya'}
                        </span>
                      )}
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: isHovered
                            ? isLight
                              ? 'rgba(7, 19, 32, 0.08)'
                              : 'rgba(255, 255, 255, 0.2)'
                            : 'rgba(7, 19, 32, 0.5)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isHovered && isLight ? '#071320' : '#ffffff',
                          border: 'none',
                          transition: 'all 350ms ease'
                        }}
                      >
                        <ArrowUpRight
                          size={18}
                          style={{
                            transform: isHovered ? 'translate(1px, -1px)' : 'none',
                            transition: 'transform 200ms ease'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reusable Cinematic Role Detail Modal & Interactive Works Gallery */}
      <RoleDetailModal
        isOpen={Boolean(selectedRole)}
        onClose={() => setSelectedRole(null)}
        role={selectedRole}
        allRoles={aboutRoles}
        onSelectRole={(r) => setSelectedRole(r)}
        onOpenContact={() => {
          setSelectedRole(null);
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <style>{`
        @media (min-width: 1024px) {
          .about-roles-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
