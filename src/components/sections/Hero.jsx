import React, { useState } from 'react';
import { getStoragePublicUrl } from '../../lib/queries';

export function Hero({ settings, onOpenFilosofi }) {
  const [copied, setCopied] = useState(false);
  const [isPlayingShowreel, setIsPlayingShowreel] = useState(false);

  const email = settings?.email || 'prio.setyo@creativestudio.id';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="hero"
      style={{
        width: '100%',
        backgroundColor: 'var(--color-surface)',
        paddingTop: '6.5rem',
        paddingBottom: 'var(--space-lg)'
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 var(--margin-mobile)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-lg)'
        }}
      >
        {/* Super Headline & Architectural Statement Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
          {/* Top Micro Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--color-secondary-container)',
                  color: 'var(--color-on-secondary-fixed)',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}
              >
                Curated Index 2025
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--color-surface-container-high)',
                  color: 'var(--color-on-surface-variant)',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}
              >
                Jakarta (6.2° S) / Tokyo (35.6° N)
              </span>
            </div>
          </div>

          {/* Hero Typography Display */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 'var(--space-md)'
            }}
            className="hero-headline-wrapper"
          >
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.75rem, 8vw, 4.5rem)',
                  lineHeight: 1,
                  fontWeight: '800',
                  color: 'var(--color-primary)',
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  margin: 0
                }}
              >
                {settings?.name || 'PRIO SETYO'}
              </h1>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                paddingBottom: '4px'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  fontWeight: '600',
                  color: 'var(--color-on-surface)',
                  lineHeight: '26px',
                  letterSpacing: '-0.01em'
                }}
              >
                {settings?.headline || 'Visual Creator, Designer & Copywriter'}
              </span>
              <span
                style={{
                  fontSize: '13px',
                  color: 'var(--color-on-surface-variant)',
                  lineHeight: '18px'
                }}
              >
                {settings?.summary || 'Membantu brand mengomunikasikan nilai mereka melalui visual yang kuat, desain fungsional, dan narasi yang berdaya pikat.'}
              </span>
            </div>
          </div>
        </div>

        {/* Bento Grid Section with Left Edge Vertical Rail */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--space-md)',
            alignItems: 'stretch'
          }}
          className="bento-main-grid"
        >
          {/* Left Rail: Architectural Vertical Nav Strip (Desktop Only) */}
          <aside
            className="desktop-rail"
            style={{
              gridColumn: 'span 1',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'var(--space-lg) 0',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--color-surface-container-low)',
              minHeight: '640px',
              userSelect: 'none'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: '12px',
                  fontWeight: '800'
                }}
              >
                PS
              </div>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-tertiary-fixed-dim)'
                }}
              />
            </div>

            <nav
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-xl)',
                padding: 'var(--space-md) 0'
              }}
            >
              <a
                href="#karya-terpilih"
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-on-surface)',
                  textDecoration: 'none',
                  padding: '8px 0',
                  transition: 'color 150ms ease'
                }}
              >
                Karya
              </a>
              <a
                href="#filosofi"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenFilosofi) onOpenFilosofi();
                  else {
                    const d = document.getElementById('dialog-filosofi');
                    if (d) d.showModal();
                  }
                }}
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-on-surface-variant)',
                  textDecoration: 'none',
                  padding: '8px 0',
                  transition: 'color 150ms ease'
                }}
              >
                Filosofi
              </a>
              <a
                href="#toolkit-section"
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-on-surface-variant)',
                  textDecoration: 'none',
                  padding: '8px 0',
                  transition: 'color 150ms ease'
                }}
              >
                Toolkit
              </a>
              <a
                href="#pengalaman-section"
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-on-surface-variant)',
                  textDecoration: 'none',
                  padding: '8px 0',
                  transition: 'color 150ms ease'
                }}
              >
                Pengalaman
              </a>
            </nav>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: '600',
                color: 'var(--color-on-surface-variant)'
              }}
            >
              <span>01</span>
              <div style={{ width: '2px', height: '32px', backgroundColor: 'var(--color-surface-variant)' }} />
              <span>05</span>
            </div>
          </aside>

          {/* Main Profile Bento Card (Lilac Field #e5deff) */}
          <article
            className="profile-bento-card"
            style={{
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--color-secondary-fixed)',
              color: 'var(--color-on-secondary-fixed)',
              padding: 'var(--space-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '640px',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            {/* Ambient accent circle */}
            <div
              style={{
                position: 'absolute',
                top: '-4rem',
                right: '-4rem',
                width: '14rem',
                height: '14rem',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                filter: 'blur(32px)',
                pointerEvents: 'none'
              }}
            />

            {/* Top Micro Badges */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  backgroundColor: '#ffffff',
                  color: 'var(--color-on-surface)',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.08em',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-tertiary-container)'
                  }}
                />
                <span>{(settings?.location || 'INDONESIA').toUpperCase()} BASED</span>
              </div>

              {/* Top Sticker Badge (Rotated) */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-lg)',
                  transform: 'rotate(6deg)',
                  transition: 'transform 200ms ease'
                }}
              >
                <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '-0.05em' }}>★ TOP ★</span>
                <span style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-secondary-fixed)' }}>
                  CREATIVE
                </span>
                <span style={{ fontSize: '10px', fontWeight: '800', fontFamily: 'var(--font-display)' }}>2025</span>
              </div>
            </div>

            {/* Center Portrait & Frame */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: 'var(--space-md) 0', position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  position: 'relative',
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  padding: '6px',
                  backgroundColor: '#ffffff',
                  boxShadow: 'var(--shadow-xl)',
                  marginBottom: 'var(--space-md)'
                }}
              >
                <img
                  src={
                    getStoragePublicUrl(settings?.avatar_url) ||
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuCDpOtpycEVr4MOXdR1AKcNCANcNvTVsDSJmHh4--o3QuTGlcu9KdCFNYac1HwyfyG6to15QrJ8R22G5cy1OyMRhZSiAA_Yx3IWJXQzq-LmOXl3Uvn2Cx4WEeIRb0jQK7TSboW9ycvAq0mEZnygI6EmxU9BaBz6WcqlXEeg7KRTG3s00S5sf_pZJTtrnFJxvQ4DFCJE22wFdmrlNchqwQ3YZcDPqP9_A5mNytlvjpY"
                  }
                  alt={settings?.name || "Prio Setyo Creative Director"}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '4px',
                    right: '8px',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--color-tertiary-fixed)',
                    color: 'var(--color-on-tertiary-fixed)',
                    fontSize: '10px',
                    fontWeight: '700',
                    letterSpacing: '0.05em'
                  }}
                >
                  LEAD
                </span>
              </div>

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-on-secondary-fixed-variant)'
                }}
              >
                {settings?.headline?.toUpperCase() || 'CREATIVE DIRECTOR'}
              </span>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '40px',
                  lineHeight: '46px',
                  letterSpacing: '-0.03em',
                  fontWeight: '700',
                  color: 'var(--color-on-secondary-fixed)',
                  margin: '4px 0 0 0'
                }}
              >
                I'm {settings?.name || 'Prio Setyo'}
              </h2>

              <p
                style={{
                  fontSize: '15px',
                  lineHeight: '24px',
                  color: 'var(--color-on-secondary-fixed-variant)',
                  marginTop: '8px',
                  maxWidth: '320px'
                }}
              >
                {settings?.summary || 'Merancang identitas visual, kampanye spasial, dan narasi digital untuk jenama global terkemuka.'}
              </p>

              {/* Dynamic Social Links */}
              {(settings?.instagram || settings?.linkedin || settings?.github || settings?.youtube || settings?.behance || settings?.vimeo) && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginTop: '12px',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  {settings?.instagram && (
                    <a
                      href={settings.instagram}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        fontSize: '10px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      Instagram
                    </a>
                  )}
                  {settings?.linkedin && (
                    <a
                      href={settings.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        fontSize: '10px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      LinkedIn
                    </a>
                  )}
                  {settings?.behance && (
                    <a
                      href={settings.behance}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        fontSize: '10px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      Behance
                    </a>
                  )}
                  {settings?.youtube && (
                    <a
                      href={settings.youtube}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        fontSize: '10px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      YouTube
                    </a>
                  )}
                  {settings?.github && (
                    <a
                      href={settings.github}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        fontSize: '10px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Bio & Micro Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', paddingTop: 'var(--space-sm)', position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.625rem 0.875rem',
                  borderRadius: '1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-secondary)' }}>
                    mail
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-on-surface)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {email}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Salin Email"
                  style={{
                    padding: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: copied ? '#10b981' : 'var(--color-on-surface-variant)'
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                    {copied ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: 'var(--color-on-secondary-fixed-variant)',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.06em',
                  padding: '4px 8px 0 8px'
                }}
              >
                <span>AVAILABILITY: IMMINENT</span>
                <span>TIMEZONE: GMT+7</span>
              </div>
            </div>
          </article>

          {/* Right Column: Showreel & Metrics Stack */}
          <div
            className="showreel-metrics-stack"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)'
            }}
          >
            {/* Cinematic Showreel Card */}
            <article
              style={{
                position: 'relative',
                width: '100%',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                minHeight: '360px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 'var(--space-lg)',
                boxShadow: 'var(--shadow-md)'
              }}
              className="showreel-card"
            >
              {/* Background Image with Scrim */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA9Bw8naRYvQDN01ucwLtamVgIA7fSRvelaYIR35pGCC4LkMLUtgDaQrwC26rLyCwU_Eft5O0s5tGWFr8Tw3jz7rgfxGxNlfboQ8qQv7FbWwtpIg34o6Cvqu-kqw7IgsDD-N_I56LCfULu8OvSK9ARwqoj5FTKHWm6zl8ECBfv2uZ6TzudafeVPODgn_KRz7uQzpggYxYj4q62HG-Uh2d_UU7UMbgmo3wMqz-zcQY"
                  alt="Cinematic Architectural Showreel"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 700ms ease-out'
                  }}
                  className="showreel-img"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.35) 50%, transparent 100%)'
                  }}
                />
              </div>

              {/* Top Meta Row */}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-sm)' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(12px)',
                    color: 'var(--color-on-surface)',
                    fontSize: '11px',
                    fontWeight: '600',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', animation: 'pulse 1.5s infinite' }} />
                  <span>SHOWREEL 2024–2025 • SPATIAL &amp; CINEMATIC DESIGN</span>
                </span>

                <span
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: '600',
                    letterSpacing: '0.06em'
                  }}
                >
                  03:42 MIN / 4K UHD
                </span>
              </div>

              {/* Center Glowing Frosted Play Trigger */}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'var(--space-md) 0' }}>
                <button
                  type="button"
                  aria-label="Putar Showreel"
                  onClick={() => setIsPlayingShowreel(true)}
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(16px)',
                    color: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-xl)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'transform 300ms ease'
                  }}
                  className="play-btn"
                >
                  <span
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.4)',
                      animation: 'pingGlow 2s infinite',
                      pointerEvents: 'none'
                    }}
                  />
                  <span className="material-symbols-outlined" style={{ fontSize: '36px', fontVariationSettings: "'FILL' 1" }}>
                    play_arrow
                  </span>
                </button>
              </div>

              {/* Bottom Summary Strip */}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-sm)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', color: '#ffffff' }}>
                  <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.7)' }}>
                    STUDIO HIGHLIGHT
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '26px',
                      lineHeight: '32px',
                      fontWeight: '700',
                      letterSpacing: '-0.02em',
                      margin: '4px 0 0 0'
                    }}
                  >
                    Kinetika Spasial &amp; Narasi Visual
                  </h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(12px)',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}
                  >
                    Direction
                  </span>
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(12px)',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}
                  >
                    CGI Architecture
                  </span>
                </div>
              </div>
            </article>

            {/* Metric Trio Bento Cards Row (3 Cards) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 'var(--space-md)'
              }}
            >
              {/* Metric Card 1: Mint Green */}
              <article
                style={{
                  padding: 'var(--space-lg)',
                  borderRadius: 'var(--radius-xl)',
                  backgroundColor: 'var(--color-tertiary-fixed)',
                  color: 'var(--color-on-tertiary-fixed)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '220px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-on-tertiary-fixed-variant)' }}>
                    PORTOFOLIO
                  </span>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      color: 'var(--color-on-surface)',
                      fontSize: '10px',
                      fontWeight: '600'
                    }}
                  >
                    +24% YoY
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', margin: 'var(--space-xs) 0' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '56px', lineHeight: '56px', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--color-on-tertiary-fixed)' }}>
                    120+
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: '600', marginTop: '4px' }}>
                    Proyek Komersial
                  </span>
                </div>

                <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-on-tertiary-fixed-variant)', margin: 0 }}>
                  Skala korporasi internasional &amp; rintisan teknologi tier-1.
                </p>
              </article>

              {/* Metric Card 2: Soft Violet/Lilac */}
              <article
                style={{
                  padding: 'var(--space-lg)',
                  borderRadius: 'var(--radius-xl)',
                  backgroundColor: 'var(--color-secondary-fixed-dim)',
                  color: 'var(--color-on-secondary-fixed)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '220px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-on-secondary-fixed-variant)' }}>
                    REKOGNISI
                  </span>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--color-secondary)', fontVariationSettings: "'FILL' 1" }}>
                    emoji_events
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', margin: 'var(--space-xs) 0' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '56px', lineHeight: '56px', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--color-on-secondary-fixed)' }}>
                    35+
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: '600', marginTop: '4px' }}>
                    Penghargaan Global
                  </span>
                </div>

                <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-on-secondary-fixed-variant)', margin: 0 }}>
                  Termasuk rekognisi Cannes Lions &amp; D&amp;AD Graphite Pencils.
                </p>
              </article>

              {/* Metric Card 3: Warm Peach */}
              <article
                style={{
                  padding: 'var(--space-lg)',
                  borderRadius: 'var(--radius-xl)',
                  backgroundColor: 'var(--color-peach-bg)',
                  color: 'var(--color-peach-text)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '220px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9A3412' }}>
                    JAM TERBANG
                  </span>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#EA580C' }}>
                    timeline
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', margin: 'var(--space-xs) 0' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '56px', lineHeight: '56px', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--color-peach-text)' }}>
                    10+
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: '600', marginTop: '4px' }}>
                    Tahun Pengalaman
                  </span>
                </div>

                <p style={{ fontSize: '13px', lineHeight: '18px', color: '#7C2D12', margin: 0 }}>
                  Kepemimpinan kreatif lintas Asia Pasifik dan Eropa.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>

      {/* Showreel Modal / Video Dialog */}
      {isPlayingShowreel && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setIsPlayingShowreel(false)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '960px',
              aspectRatio: '16/9',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              backgroundColor: '#000000',
              boxShadow: 'var(--shadow-dialog)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Creative Director Showreel"
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .hero-headline-wrapper {
            flex-direction: row !important;
            align-items: flex-end !important;
          }
          .bento-main-grid {
            grid-template-columns: repeat(12, 1fr) !important;
          }
          .desktop-rail {
            display: flex !important;
            grid-column: span 1 !important;
          }
          .profile-bento-card {
            grid-column: span 4 !important;
          }
          .showreel-metrics-stack {
            grid-column: span 7 !important;
          }
        }
        @media (max-width: 1023px) {
          .desktop-rail {
            display: none !important;
          }
          .profile-bento-card {
            grid-column: span 12 !important;
          }
          .showreel-metrics-stack {
            grid-column: span 12 !important;
          }
        }
        .showreel-card:hover .showreel-img {
          transform: scale(1.05);
        }
        .play-btn:hover {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
}
