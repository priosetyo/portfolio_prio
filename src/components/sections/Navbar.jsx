import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export function Navbar({ siteName = 'Prio Setyo', onOpenFilosofi }) {
  const [activeSection, setActiveSection] = useState('karya');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['karya-terpilih', 'toolkit-section', 'pengalaman-section', 'mulai-diskusi'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (targetId === 'filosofi') {
      if (onOpenFilosofi) onOpenFilosofi();
      else {
        const dialog = document.getElementById('dialog-filosofi');
        if (dialog) dialog.showModal();
      }
      return;
    }

    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'rgba(249, 249, 251, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: isScrolled ? '0 1px 8px rgba(0, 0, 0, 0.05)' : '0 1px 8px rgba(0, 0, 0, 0.02)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
        transition: 'all 250ms ease'
      }}
    >
      <div
        style={{
          height: '5rem', /* 80px */
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 var(--margin-mobile)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-md)'
        }}
      >
        {/* Left: Brand & Status Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '0.08em',
                color: 'var(--color-on-surface-variant)',
                textTransform: 'uppercase'
              }}
            >
              DIRECTOR © 2025
            </span>
          </a>

          <div
            className="hide-mobile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-xs)',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              backgroundColor: 'var(--color-surface-container-low)',
              color: 'var(--color-on-surface)'
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 8px #10b981',
                animation: 'pulse 2s infinite'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '0.08em',
                color: 'var(--color-on-surface-variant)',
                textTransform: 'uppercase'
              }}
            >
              AVAILABLE FOR Q2 PROJECTS
            </span>
          </div>
        </div>

        {/* Center: Clean Floating Pill Navigation */}
        <nav
          className="desktop-nav"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '4px',
            padding: '4px',
            borderRadius: '9999px',
            backgroundColor: 'var(--color-surface-container-low)'
          }}
        >
          <a
            href="#karya-terpilih"
            onClick={(e) => handleNavClick(e, 'karya-terpilih')}
            style={{
              padding: '0.375rem 1.25rem',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: '600',
              color: 'var(--color-on-surface)',
              backgroundColor: 'var(--color-surface-container)',
              textDecoration: 'none',
              transition: 'all 150ms ease'
            }}
          >
            Karya
          </a>

          <a
            href="#filosofi"
            onClick={(e) => handleNavClick(e, 'filosofi')}
            style={{
              padding: '0.375rem 1.25rem',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: '500',
              color: 'var(--color-on-surface-variant)',
              backgroundColor: 'transparent',
              textDecoration: 'none',
              transition: 'all 150ms ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-on-surface)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-on-surface-variant)')}
          >
            Filosofi
          </a>

          <a
            href="#toolkit-section"
            onClick={(e) => handleNavClick(e, 'toolkit-section')}
            style={{
              padding: '0.375rem 1.25rem',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: '500',
              color: 'var(--color-on-surface-variant)',
              backgroundColor: 'transparent',
              textDecoration: 'none',
              transition: 'all 150ms ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-on-surface)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-on-surface-variant)')}
          >
            Toolkit
          </a>

          <a
            href="#pengalaman-section"
            onClick={(e) => handleNavClick(e, 'pengalaman-section')}
            style={{
              padding: '0.375rem 1.25rem',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: '500',
              color: 'var(--color-on-surface-variant)',
              backgroundColor: 'transparent',
              textDecoration: 'none',
              transition: 'all 150ms ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-on-surface)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-on-surface-variant)')}
          >
            Pengalaman
          </a>
        </nav>

        {/* Right: Mulai Diskusi Button & Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <a
            href="#mulai-diskusi"
            onClick={(e) => handleNavClick(e, 'mulai-diskusi')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.625rem 1.25rem',
              borderRadius: '9999px',
              backgroundColor: '#000000',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.02em',
              textDecoration: 'none',
              boxShadow: '0 2px 0 rgba(18, 18, 20, 0.04)',
              transition: 'all 200ms ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1b1b1d';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000000';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Mulai Diskusi
          </a>

          {/* Profile Photo / Admin Access */}
          <a
            href="/admin"
            title="Akses Admin CMS"
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'inline-block',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              transition: 'transform 150ms ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDpOtpycEVr4MOXdR1AKcNCANcNvTVsDSJmHh4--o3QuTGlcu9KdCFNYac1HwyfyG6to15QrJ8R22G5cy1OyMRhZSiAA_Yx3IWJXQzq-LmOXl3Uvn2Cx4WEeIRb0jQK7TSboW9ycvAq0mEZnygI6EmxU9BaBz6WcqlXEeg7KRTG3s00S5sf_pZJTtrnFJxvQ4DFCJE22wFdmrlNchqwQ3YZcDPqP9_A5mNytlvjpY"
              alt="Profile Prio Setyo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </a>

          {/* Mobile Menu Button */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '50%',
              backgroundColor: 'var(--color-surface-container-low)',
              color: 'var(--color-on-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid var(--color-surface-container-high)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          {['karya-terpilih', 'filosofi', 'toolkit-section', 'pengalaman-section', 'mulai-diskusi'].map((id) => {
            const labels = {
              'karya-terpilih': 'Karya Terpilih',
              filosofi: 'Filosofi Desain',
              'toolkit-section': 'Creative Toolkit',
              'pengalaman-section': 'Pengalaman Karir',
              'mulai-diskusi': 'Mulai Diskusi'
            };
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--color-on-surface)',
                  backgroundColor: 'var(--color-surface-container-low)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{labels[id]}</span>
                <ArrowUpRight size={16} />
              </a>
            );
          })}
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
        @media (max-width: 1023px) {
          .hide-mobile {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
