import React from 'react';

export function Contact({ settings }) {
  const email = settings?.email || 'prio.setyo@creativestudio.id';

  return (
    <section
      id="mulai-diskusi"
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: 'var(--space-lg) var(--margin-mobile)',
        width: '100%'
      }}
    >
      <div
        style={{
          width: '100%',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-lg) var(--space-xl)',
          backgroundColor: '#000000',
          color: '#ffffff',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-lg)'
        }}
        className="cta-banner-container"
      >
        {/* Decorative Backdrop Graphic */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '24rem',
            height: '24rem',
            borderRadius: '50%',
            backgroundColor: 'rgba(220, 213, 253, 0.15)',
            filter: 'blur(64px)',
            pointerEvents: 'none'
          }}
        />

        {/* Text Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            position: 'relative',
            zIndex: 1,
            maxWidth: '36rem'
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-secondary-fixed)'
            }}
          >
            KOLABORASI EKSKLUSIF
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 44px)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              fontWeight: '800',
              color: '#ffffff',
              margin: '4px 0 0 0'
            }}
          >
            Siap Mewujudkan Visi Kreatif Anda?
          </h2>

          <p
            style={{
              fontSize: '15px',
              lineHeight: '24px',
              color: 'var(--color-on-primary-container)',
              marginTop: '8px',
              margin: '8px 0 0 0'
            }}
          >
            Terbuka untuk konsultasi strategis Q2/Q3 2025, dewan penasihat kreatif, dan arahan desain transformatif berskala global.
          </p>
        </div>

        {/* Action Button */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="cta-btn-wrapper"
        >
          <a
            href={`mailto:${email}?subject=Inquiry%20Proyek%20Kreatif%202025`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '1rem 2rem',
              borderRadius: '9999px',
              backgroundColor: 'var(--color-secondary-container)',
              color: 'var(--color-on-secondary-fixed)',
              fontFamily: 'var(--font-display)',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-lg)',
              transition: 'all 200ms ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-secondary-container)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Mulai Diskusi Sekarang</span>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              arrow_forward
            </span>
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .cta-banner-container {
            flex-direction: row !important;
            text-align: left !important;
          }
          .cta-btn-wrapper {
            width: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
