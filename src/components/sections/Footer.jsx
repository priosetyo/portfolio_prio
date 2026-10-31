import React from 'react';

export function Footer({ settings }) {
  const name = settings?.name || 'Prio Setyo';
  const email = settings?.email || 'contact@prioworks.my.id';
  const linkedin = settings?.linkedin || 'https://linkedin.com/in/priosetyo';
  const github = settings?.github || 'https://github.com/priosetyo';

  return (
    <footer
      style={{
        width: '100%',
        backgroundColor: '#0A2540',
        color: 'var(--color-surface-bright)',
        paddingTop: '3rem',
        paddingBottom: '2rem',
        borderTop: '1px solid rgba(114, 119, 130, 0.2)'
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 var(--margin-mobile)'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--gutter-lg)',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
          className="footer-grid"
        >
          {/* Col 1: Brand & Bio */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-surface-container-lowest)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  boxShadow: 'var(--shadow-sm)'
                }}
                className="font-label-mono-lg"
              >
                PS
              </div>
              <span className="font-headline-sm" style={{ fontWeight: '700', color: 'var(--color-surface-container-lowest)', letterSpacing: '-0.015em' }}>
                {name}
              </span>
            </div>
            <p className="font-body-sm" style={{ color: 'var(--color-outline-variant)', lineHeight: 1.6, maxWidth: '24rem' }}>
              Portfolio architecture of enterprise visual systems, narrative strategy, and international-standard digital transformations.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', paddingTop: '0.25rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.375rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}
                className="font-label-mono-sm"
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#7AC142' }} className="beacon-ping"></span>
                <span style={{ color: 'var(--color-surface-bright)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Dumai Studio (Riau)</span>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.375rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}
                className="font-label-mono-sm"
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-secondary-container)' }}></span>
                <span style={{ color: 'var(--color-surface-bright)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Regional Indonesia</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span className="font-label-mono-sm" style={{ textTransform: 'uppercase', color: 'var(--color-secondary-fixed)', letterSpacing: '0.08em' }}>
              Quick Navigation
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <a href="#about" className="font-body-sm" style={{ color: 'var(--color-outline-variant)', textDecoration: 'none', transition: 'color 150ms ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-outline-variant)')}>
                About Me
              </a>
              <a href="#skills" className="font-body-sm" style={{ color: 'var(--color-outline-variant)', textDecoration: 'none', transition: 'color 150ms ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-outline-variant)')}>
                Core Expertise
              </a>
              <a href="#recent-work" className="font-body-sm" style={{ color: 'var(--color-outline-variant)', textDecoration: 'none', transition: 'color 150ms ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-outline-variant)')}>
                Curated Gallery
              </a>
              <a href="#experiences" className="font-body-sm" style={{ color: 'var(--color-outline-variant)', textDecoration: 'none', transition: 'color 150ms ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-outline-variant)')}>
                Career Journey
              </a>
              <a href="#contact" className="font-body-sm" style={{ color: 'var(--color-outline-variant)', textDecoration: 'none', transition: 'color 150ms ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-outline-variant)')}>
                Contact & Inquiry
              </a>
            </div>
          </div>

          {/* Col 3: Professional Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span className="font-label-mono-sm" style={{ textTransform: 'uppercase', color: 'var(--color-secondary-fixed)', letterSpacing: '0.08em' }}>
              Professional Links
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-outline-variant)', textDecoration: 'none', transition: 'color 150ms ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-outline-variant)')}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-secondary-fixed)' }}>link</span>
                <span>LinkedIn Network</span>
              </a>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-outline-variant)', textDecoration: 'none', transition: 'color 150ms ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-outline-variant)')}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-secondary-fixed)' }}>terminal</span>
                <span>GitHub Repositories</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="font-body-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-outline-variant)', textDecoration: 'none', transition: 'color 150ms ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-outline-variant)')}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-secondary-fixed)' }}>mail</span>
                <span>Direct Mail</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div
          style={{
            paddingTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            color: 'var(--color-outline-variant)'
          }}
          className="font-label-mono-sm footer-bottom-row"
        >
          <p>© 2025 Prio Setyo. All Rights Reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ opacity: 0.6 }}>ISO 27001 Aligned</span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(194, 198, 211, 0.4)' }}></span>
            <span>Enterprise Portfolio System</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 5fr 4fr 3fr !important;
          }
        }
        @media (min-width: 640px) {
          .footer-bottom-row {
            flex-direction: row !important;
          }
        }
      `}</style>
    </footer>
  );
}
