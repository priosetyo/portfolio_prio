import React from 'react';

export function Footer({ settings }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        width: '100%',
        backgroundColor: 'var(--color-surface-container-lowest)',
        borderTop: '1px solid rgba(0, 0, 0, 0.04)',
        boxShadow: '0 -1px 12px rgba(0, 0, 0, 0.02)',
        marginTop: 'var(--space-xl)'
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: 'var(--space-xl) var(--margin-mobile)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 'var(--space-lg)'
        }}
        className="footer-content"
      >
        {/* Brand & Statement */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              fontWeight: '600',
              letterSpacing: '-0.01em',
              color: 'var(--color-on-surface)'
            }}
          >
            {settings?.name || 'Prio Setyo'}
          </span>
          <p
            style={{
              fontSize: '13px',
              lineHeight: '18px',
              color: 'var(--color-on-surface-variant)',
              maxWidth: '28rem',
              margin: 0
            }}
          >
            Executive Creative Direction, Brand Systems &amp; High-Impact Digital Experiences.
          </p>
        </div>

        {/* Caps Tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 'var(--space-md)',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-on-surface-variant)'
          }}
        >
          <span style={{ cursor: 'pointer', transition: 'color 150ms ease' }}>
            {settings?.location || 'JAKARTA / REMOTE'}
          </span>
          <span style={{ cursor: 'pointer', transition: 'color 150ms ease' }}>
            ARCHIVE 2020—{currentYear}
          </span>
          <span style={{ cursor: 'pointer', transition: 'color 150ms ease' }}>
            ALL RIGHTS RESERVED
          </span>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-content {
            flex-direction: row !important;
            align-items: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
