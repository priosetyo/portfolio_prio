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

        {/* Dynamic Social Links & Caps Tags */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
          {(settings?.instagram || settings?.linkedin || settings?.github || settings?.youtube || settings?.behance || settings?.vimeo) && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              {settings?.instagram && (
                <a href={settings.instagram} target="_blank" rel="noreferrer" style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-on-surface)', textDecoration: 'none' }}>
                  INSTAGRAM ↗
                </a>
              )}
              {settings?.linkedin && (
                <a href={settings.linkedin} target="_blank" rel="noreferrer" style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-on-surface)', textDecoration: 'none' }}>
                  LINKEDIN ↗
                </a>
              )}
              {settings?.behance && (
                <a href={settings.behance} target="_blank" rel="noreferrer" style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-on-surface)', textDecoration: 'none' }}>
                  BEHANCE ↗
                </a>
              )}
              {settings?.youtube && (
                <a href={settings.youtube} target="_blank" rel="noreferrer" style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-on-surface)', textDecoration: 'none' }}>
                  YOUTUBE ↗
                </a>
              )}
              {settings?.github && (
                <a href={settings.github} target="_blank" rel="noreferrer" style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-on-surface)', textDecoration: 'none' }}>
                  GITHUB ↗
                </a>
              )}
              {settings?.vimeo && (
                <a href={settings.vimeo} target="_blank" rel="noreferrer" style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-on-surface)', textDecoration: 'none' }}>
                  VIMEO ↗
                </a>
              )}
            </div>
          )}

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
            <span>
              {settings?.location || 'INDONESIA'}
            </span>
            <span>
              ARCHIVE 2020—{currentYear}
            </span>
            <span>
              ALL RIGHTS RESERVED
            </span>
          </div>
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
