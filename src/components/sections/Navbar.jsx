import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { getStoragePublicUrl } from '../../lib/queries';

const SUPABASE_AVATAR_FALLBACK =
  'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/avatars/avatar-1793091534469.webp';

export function Navbar({
  siteName = 'Prio Setyo',
  headline = 'ENERGIZING BRANDS, ELEVATING VISUALS',
  avatarUrl,
  onNavigateAdmin
}) {
  const resolvedAvatar = getStoragePublicUrl(avatarUrl) || SUPABASE_AVATAR_FALLBACK;

  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = useMemo(
    () => [
      { id: 'about', num: '01', label: 'ABOUT ME', desc: 'Filosofi & 4 Pilar Strategis' },
      { id: 'skills', num: '02', label: 'SKILLS', desc: 'Creative Pipeline & R&D Lab' },
      { id: 'recent-work', num: '03', label: 'RECENT WORK', desc: 'Galeri Karya Terkurasi' },
      { id: 'experiences', num: '04', label: 'EXPERIENCES', desc: 'Linimasa Kepemimpinan Karir' },
      { id: 'contact', num: '05', label: 'CONTACT', desc: 'Kolaborasi & Konsultasi Eksekutif' }
    ],
    []
  );

  // Track active section and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Calculate page scroll progress percentage
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
      }

      // Determine active section with navbar offset (96px)
      const sections = ['hero', 'about', 'skills', 'recent-work', 'experiences', 'contact'];
      let current = activeSection;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            current = id === 'hero' ? 'about' : id;
            break;
          }
        }
      }

      // If scrolled to the very bottom, highlight contact
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 40) {
        current = 'contact';
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (targetId) => {
    setMobileMenuOpen(false);

    const target = document.getElementById(targetId);
    if (target) {
      const navbarHeight = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    scrollToSection(targetId);
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: isScrolled
            ? 'rgba(255, 255, 255, 0.96)'
            : 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(194, 198, 211, 0.35)',
          boxShadow: isScrolled
            ? '0 4px 20px rgba(10, 37, 64, 0.07)'
            : '0 1px 6px rgba(10, 37, 64, 0.03)',
          transition: 'all 250ms ease'
        }}
      >
        <div
          className="container"
          style={{
            height: '5rem', /* 80px */
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-md)'
          }}
        >
          {/* Left: Tagline PNG Image */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, 'hero')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none'
              }}
            >
              <img
                src="/tagline-logo.png"
                alt={headline || 'Energizing brands, elevating visuals'}
                style={{
                  height: '26px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </a>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav
            className="desktop-nav"
            aria-label="Primary Navigation"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2rem'
            }}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="font-body-sm"
                  style={{
                    position: 'relative',
                    padding: '0.5rem 0',
                    color: isActive
                      ? 'var(--color-primary-container)'
                      : 'var(--color-on-surface-variant)',
                    fontWeight: isActive ? '600' : '500',
                    borderBottom: isActive
                      ? '2px solid var(--color-primary-container)'
                      : '2px solid transparent',
                    transition: 'all 200ms ease',
                    letterSpacing: '0.02em',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--color-primary-container)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--color-on-surface-variant)';
                    }
                  }}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right: Start Discussion Button & Profile Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Start Discussion CTA Outline Button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hidden-on-mobile font-label-mono-sm"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem 1.2rem',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid var(--color-primary-container)',
                color: 'var(--color-primary-container)',
                fontWeight: '600',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'all 250ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-container)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-primary-container)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>Start Discussion</span>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '16px', marginLeft: '4px' }}
              >
                north_east
              </span>
            </a>

            {/* Profile Avatar / Admin Access */}
            <a
              href="/admin"
              onClick={(e) => {
                if (onNavigateAdmin && !e.metaKey && !e.ctrlKey) {
                  e.preventDefault();
                  onNavigateAdmin();
                }
              }}
              title="Access Atelier CMS"
              style={{
                width: '2.35rem',
                height: '2.35rem',
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1.5px solid rgba(0, 82, 155, 0.35)',
                transition: 'transform 150ms ease, border-color 150ms ease, box-shadow 150ms ease',
                backgroundColor: 'var(--color-primary)',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.06)';
                e.currentTarget.style.borderColor = 'var(--color-primary-container)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = 'rgba(0, 82, 155, 0.35)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <img
                src={resolvedAvatar}
                alt={siteName ? `Profile ${siteName}` : 'Profile Prio Setyo'}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
              aria-expanded={mobileMenuOpen}
              style={{
                width: '2.4rem',
                height: '2.4rem',
                borderRadius: '50%',
                backgroundColor: mobileMenuOpen
                  ? 'var(--color-primary-container)'
                  : 'var(--color-surface-container)',
                color: mobileMenuOpen ? '#ffffff' : 'var(--color-on-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 200ms ease'
              }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Subtle Reading / Scroll Progress Line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '2px',
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, var(--color-primary-container) 0%, #ED1C24 100%)',
            transition: 'width 100ms ease-out',
            pointerEvents: 'none'
          }}
        />

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(194, 198, 211, 0.45)',
              boxShadow: 'var(--shadow-xl)',
              padding: '1.25rem var(--margin-mobile) 1.5rem var(--margin-mobile)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem'
            }}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  style={{
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-xl)',
                    color: isActive ? '#ffffff' : 'var(--color-on-surface)',
                    backgroundColor: isActive
                      ? 'var(--color-primary-container)'
                      : 'var(--color-surface-low)',
                    border: isActive
                      ? '1px solid var(--color-primary-container)'
                      : '1px solid rgba(194, 198, 211, 0.25)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 150ms ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span
                      className="font-label-mono-sm"
                      style={{
                        fontSize: '11px',
                        color: isActive
                          ? 'var(--color-secondary-fixed)'
                          : 'var(--color-secondary)',
                        fontWeight: '700'
                      }}
                    >
                      {item.num}
                    </span>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', lineHeight: 1.2 }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '2px' }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight size={16} />
                </a>
              );
            })}

            {/* Bottom Mobile CTA Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.6rem',
                marginTop: '0.4rem'
              }}
            >
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="font-label-mono-sm"
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-xl)',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#ffffff',
                  backgroundColor: '#ED1C24',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  textTransform: 'uppercase'
                }}
              >
                <span>Start Discussion</span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href="/admin"
                onClick={(e) => {
                  if (onNavigateAdmin && !e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onNavigateAdmin();
                  }
                }}
                className="font-label-mono-sm"
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-xl)',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: 'var(--color-primary)',
                  backgroundColor: 'var(--color-secondary-container)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  textTransform: 'uppercase'
                }}
              >
                <ShieldCheck size={14} />
                <span>Atelier CMS</span>
              </a>
            </div>
          </div>
        )}
      </header>

      <style>{`
        @media (min-width: 1120px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
        @media (min-width: 640px) {
          .hidden-on-mobile {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
}
