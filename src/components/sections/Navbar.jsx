import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function Navbar({ siteName = 'Prio Setyo' }) {
  const { isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('karya');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section spy
      const sections = ['tentang', 'keahlian', 'karya', 'pengalaman', 'kontak'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'tentang', label: 'Tentang', href: '#tentang' },
    { id: 'keahlian', label: 'Keahlian', href: '#keahlian' },
    { id: 'karya', label: 'Karya', href: '#karya' },
    { id: 'pengalaman', label: 'Pengalaman', href: '#pengalaman' },
    { id: 'kontak', label: 'Kontak', href: '#kontak' }
  ];

  const handleLinkClick = (e, href, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(id);
    const target = document.querySelector(href);
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
        backgroundColor: isScrolled ? 'rgba(19, 19, 23, 0.88)' : 'rgba(19, 19, 23, 0.75)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: isScrolled ? '0 1px 8px rgba(0, 0, 0, 0.25)' : '0 1px 8px rgba(0, 0, 0, 0.04)',
        borderBottom: '1px solid rgba(230, 190, 178, 0.08)',
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
          gap: 'var(--gutter)'
        }}
      >
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-sm)',
              textDecoration: 'none'
            }}
            className="brand-group"
          >
            <div
              style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-surface-high)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all var(--transition-fast)'
              }}
              className="brand-avatar"
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  color: 'var(--color-primary)',
                  transition: 'color var(--transition-fast)'
                }}
                className="brand-avatar-text"
              >
                PS
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.125rem',
                fontWeight: '700',
                letterSpacing: '-0.025em',
                color: 'var(--color-on-surface)'
              }}
            >
              {siteName}
            </span>
          </a>
        </div>

        {/* Center Floating Pill Nav (Desktop) */}
        <nav
          className="desktop-nav"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 'var(--space-xs)',
            padding: 'var(--space-xs)',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(27, 27, 31, 0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(230, 190, 178, 0.08)'
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, link.id)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? '600' : '500',
                  color: isActive ? 'var(--color-on-surface)' : 'var(--color-on-surface-variant)',
                  backgroundColor: isActive ? 'var(--color-surface-high)' : 'transparent',
                  transition: 'all var(--transition-fast)',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--color-on-surface)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--color-on-surface-variant)';
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action & CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <a
            href="#kontak"
            onClick={(e) => handleLinkClick(e, '#kontak', 'kontak')}
            className="desktop-nav"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary-container)',
              color: 'var(--color-on-primary-container)',
              fontSize: '0.875rem',
              fontWeight: '600',
              letterSpacing: '0.04em',
              boxShadow: '0 8px 24px -4px rgba(255, 87, 26, 0.45)',
              transition: 'all var(--transition-fast)',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-secondary-container)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary-container)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Hubungi Saya
          </a>

          {/* Person Avatar badge / Quick Admin Link */}
          <a
            href="/admin"
            title="Admin Dashboard"
            aria-label="Admin Dashboard"
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform var(--transition-fast)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-on-primary)' }}>
              person
            </span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Buka Menu"
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-surface-container)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--color-on-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-surface-lowest)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: 'var(--space-md) var(--margin-mobile) var(--space-xl)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-xs)'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href, link.id)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                fontWeight: activeSection === link.id ? '700' : '500',
                color: activeSection === link.id ? 'var(--color-primary)' : 'var(--color-on-surface)',
                backgroundColor: activeSection === link.id ? 'var(--color-surface-high)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textDecoration: 'none'
              }}
            >
              <span>{link.label}</span>
              <ArrowUpRight size={16} color="var(--color-outline)" />
            </a>
          ))}

          <a
            href="#kontak"
            onClick={(e) => handleLinkClick(e, '#kontak', 'kontak')}
            style={{
              marginTop: 'var(--space-md)',
              padding: '0.875rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary-container)',
              color: 'var(--color-on-primary-container)',
              fontSize: '0.875rem',
              fontWeight: '700',
              textAlign: 'center',
              boxShadow: '0 8px 24px -4px rgba(255, 87, 26, 0.45)',
              textDecoration: 'none'
            }}
          >
            Hubungi Saya
          </a>
        </div>
      )}

      <style>{`
        .brand-group:hover .brand-avatar {
          background-color: var(--color-primary-container) !important;
        }
        .brand-group:hover .brand-avatar-text {
          color: var(--color-on-primary-container) !important;
        }
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
