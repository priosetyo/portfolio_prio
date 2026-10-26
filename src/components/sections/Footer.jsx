import React from 'react';

export function Footer({ siteName = 'Prio Setyo', onNavigateAdmin }) {
  return (
    <footer
      style={{
        width: '100%',
        backgroundColor: 'var(--color-surface-lowest)',
        paddingTop: 'var(--space-2xl)',
        paddingBottom: 'var(--space-2xl)',
        borderTop: '1px solid rgba(42, 41, 46, 0.6)'
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: 'var(--max-width)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2xl)'
        }}
      >
        {/* Top Info Row */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 'var(--space-xl)'
          }}
          className="footer-top-row"
        >
          {/* Brand & Mission Statement */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', maxWidth: '32rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'var(--color-on-surface)'
                }}
              >
                {siteName}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  color: 'var(--color-on-surface-variant)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                / Studio
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                color: 'var(--color-on-surface-variant)',
                margin: 0,
                lineHeight: 1.5
              }}
            >
              Creative Direction &amp; Visual Storytelling. Mengubah narasi kompleks menjadi karya visual berdaya pikat tinggi.
            </p>
          </div>

          {/* Location & Availability Badges */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-xl)'
            }}
            className="footer-meta-badges"
          >
            {/* Studio Lokasi */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-outline)'
                }}
              >
                Studio Lokasi
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  color: 'var(--color-on-surface)',
                  fontWeight: '500'
                }}
              >
                Jakarta &amp; Singapore
              </span>
            </div>

            {/* Ketersediaan */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-outline)'
                }}
              >
                Ketersediaan
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary-container)',
                    animation: 'pulse 2s infinite'
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.75rem',
                    color: 'var(--color-primary)',
                    fontWeight: '600'
                  }}
                >
                  Tersedia untuk Kolaborasi Q2/Q3
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(42, 41, 46, 0.6)' }} />

        {/* Bottom Social & Copyright Row */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-lg)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            color: 'var(--color-on-surface-variant)'
          }}
          className="footer-bottom-row"
        >
          {/* Social Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-lg)' }}>
            <a
              href="https://linkedin.com/in/priosetyo"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>
            <a href="#" className="footer-link">
              Dribbble
            </a>
            <a href="#" className="footer-link">
              Behance
            </a>
            <a href="#" className="footer-link">
              Instagram
            </a>
            <a
              href="/admin"
              onClick={(e) => {
                if (onNavigateAdmin) {
                  e.preventDefault();
                  onNavigateAdmin();
                }
              }}
              className="footer-link"
              style={{ color: 'var(--color-outline)' }}
            >
              Admin Portal
            </a>
          </div>

          {/* Copyright text */}
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              color: 'var(--color-outline)',
              textAlign: 'center'
            }}
            className="footer-copyright"
          >
            © 2025 Prio Setyo. Seluruh hak cipta dilindungi undang-undang.
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: var(--color-on-surface-variant);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        .footer-link:hover {
          color: var(--color-primary) !important;
        }
        @media (min-width: 768px) {
          .footer-top-row {
            flex-direction: row !important;
            align-items: center !important;
          }
          .footer-meta-badges {
            flex-direction: row !important;
            align-items: center !important;
          }
          .footer-bottom-row {
            flex-direction: row !important;
          }
          .footer-copyright {
            text-align: right !important;
          }
        }
      `}</style>
    </footer>
  );
}
