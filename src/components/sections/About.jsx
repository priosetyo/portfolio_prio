import React from 'react';
import { getStoragePublicUrl } from '../../lib/queries';

const FALLBACK_PORTRAIT = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2EkKmKy1mzccX4I1an4JCYgBgtk_w8S1-m35WYt9E0YXuyRr1XckjBude9kyhYHX0rKPUbdiVt0LeIoJvRGkxuNr2fVgHMElClPUKoifCTwhVdMv1_Oi01pkKi7ZR30OTL8gzOOrfnVlrIqQY_49iDJe4wUv6J3lbVA8yyetMJjVyWOfTsh0gL38Oe69oP9NL0cll9G1tm-Bm79kakjIzg_1cJaw2F4ZA0CpRXF1';

export function About({ settings, onOpenDetailModal }) {
  const avatarSrc = getStoragePublicUrl(settings?.avatar_url) || FALLBACK_PORTRAIT;
  const name = settings?.name || 'PRIO SETYO';
  const headline = settings?.headline || 'Principal Creative Director';

  const pillars = [
    {
      num: '(01)',
      title: 'Creative Direction & Narrative',
      desc: 'Defining tonal voice, visual composition, and campaign architecture that resonate across touchpoints.',
      specs: ['Standardized Visual Compass', 'Corporate Guidelines', 'Executive Creative Direction']
    },
    {
      num: '(02)',
      title: 'Cinematography & Lighting',
      desc: 'Harnessing anamorphic optics, high dynamic contrast, and deliberate blocking to evoke emotional resonance.',
      specs: ['Cooke Anamorphic /i', 'RED V-Raptor 8K VV', 'ARRI Lighting Setup']
    },
    {
      num: '(03)',
      title: 'Spatial Design & Composition',
      desc: 'Swiss-disciplined structured layouts, generative typographic explorations, and exhibition spatial design.',
      specs: ['Swiss Grid System', 'Exhibition Architecture', 'Spatial Typography']
    },
    {
      num: '(04)',
      title: 'Copywriting & Message Architecture',
      desc: 'High-level verbal formulation, corporate manifestos, and high-conversion scripts provoking decisive action.',
      specs: ['Corporate Manifesto', 'Kinetic Scripting', 'Commercial Tagline Engineering']
    }
  ];

  return (
    <section
      id="about"
      style={{
        width: '100%',
        backgroundColor: '#F4F7FA',
        padding: '5rem 0',
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
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span
            className="font-label-mono-sm"
            style={{
              color: 'var(--color-primary-container)',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            PHILOSOPHY & METHODOLOGY
          </span>
          <h2
            className="font-headline-lg"
            style={{
              color: 'var(--color-on-surface)',
              fontWeight: '700',
              letterSpacing: '-0.025em'
            }}
          >
            The Equilibrium Between Artistic Instinct & Business Calculus
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--gutter-lg)',
            alignItems: 'stretch'
          }}
          className="about-grid"
        >
          {/* Left Column: Portrait Frame */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div
              className="group"
              style={{
                position: 'relative',
                width: '100%',
                height: '520px',
                borderRadius: 'var(--radius-3xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                backgroundColor: 'var(--color-surface-container)'
              }}
            >
              <img
                src={avatarSrc}
                alt={`Portrait ${name}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 700ms ease-out'
                }}
                className="group-hover:scale-105"
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.5rem',
                  background: 'linear-gradient(to top, var(--color-inverse-surface) 0%, rgba(47, 48, 52, 0.7) 60%, transparent 100%)',
                  color: 'var(--color-surface-container-lowest)'
                }}
              >
                <span
                  className="font-label-mono-sm"
                  style={{
                    color: 'var(--color-secondary-fixed)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    display: 'block',
                    marginBottom: '0.25rem'
                  }}
                >
                  {name}
                </span>
                <p className="font-headline-sm" style={{ fontWeight: '700', color: '#ffffff' }}>
                  {headline}
                </p>
                <p className="font-body-sm" style={{ color: 'var(--color-outline-variant)', marginTop: '0.25rem' }}>
                  Synthesizing cinematic visual sharpness with commercial message architecture.
                </p>
              </div>
            </div>

            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--color-surface-container-lowest)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid rgba(194, 198, 211, 0.3)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-primary-container)' }}>camera</span>
                <span className="font-label-mono-sm" style={{ color: 'var(--color-on-surface-variant)', fontWeight: '500' }}>
                  Large Format Camera & Spatial Lighting Specialty
                </span>
              </div>
              <span className="font-label-mono-sm" style={{ color: 'var(--color-secondary)', fontWeight: '700' }}>
                RED / ARRI Certified
              </span>
            </div>
          </div>

          {/* Right Column: Strategic Pillars Card Deck */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
            {/* Card 1: Solid Royal Blue Card */}
            <div
              className="card-motion"
              style={{
                padding: '2rem',
                borderRadius: 'var(--radius-3xl)',
                backgroundColor: '#00529B',
                color: 'var(--color-surface-container-lowest)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span
                  className="font-label-mono-sm"
                  style={{
                    color: 'var(--color-primary-fixed)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: '600'
                  }}
                >
                  Core Essence
                </span>
                <span
                  className="font-label-mono-sm"
                  style={{
                    padding: '0.25rem 0.625rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: 'var(--color-surface-container-lowest)'
                  }}
                >
                  DESIGN PHILOSOPHY
                </span>
              </div>
              <h3 className="font-headline-md" style={{ fontWeight: '700', marginBottom: '0.75rem' }}>
                Design Philosophy
              </h3>
              <div style={{ width: '3rem', height: '4px', backgroundColor: 'var(--color-surface-container-lowest)', marginBottom: '1rem', borderRadius: 'var(--radius-full)' }}></div>
              <p className="font-body-lg" style={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6, fontWeight: '400' }}>
                “Design is not merely what is visible on the surface; it is kinetic energy connecting an entity's core essence with the genuine pulse of its audience.”
              </p>
            </div>

            {/* Overlapping Pillar Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem'
              }}
            >
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="card-motion group"
                  onClick={() => {
                    if (onOpenDetailModal) {
                      onOpenDetailModal({
                        title: pillar.title,
                        category: `${pillar.num} STRATEGIC PILLAR`,
                        description: pillar.desc,
                        specs: pillar.specs
                      });
                    }
                  }}
                  style={{
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-3xl)',
                    backgroundColor: 'var(--color-surface-container-lowest)',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid rgba(194, 198, 211, 0.2)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(237, 28, 36, 0.3)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(194, 198, 211, 0.2)')}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span className="font-label-mono-sm" style={{ color: 'var(--color-secondary)', fontWeight: '700' }}>
                      {pillar.num} STRATEGIC PILLAR
                    </span>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        color: 'var(--color-on-surface-variant)',
                        fontSize: '20px',
                        transition: 'transform 200ms ease, color 200ms ease'
                      }}
                    >
                      north_east
                    </span>
                  </div>
                  <h4
                    className="font-headline-sm"
                    style={{
                      color: 'var(--color-on-surface)',
                      fontWeight: '700',
                      marginBottom: '0.5rem',
                      fontSize: '17px'
                    }}
                  >
                    {pillar.title}
                  </h4>
                  <div style={{ width: '2rem', height: '2px', backgroundColor: '#ED1C24', marginBottom: '0.75rem' }}></div>
                  <p className="font-body-sm" style={{ color: 'var(--color-on-surface-variant)', lineHeight: 1.6 }}>
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem' }}>
              <span className="font-label-mono-sm" style={{ color: 'var(--color-secondary)', fontWeight: '600' }}>
                INTEGRATED STRATEGIC ALIGNMENT (ISO 9001 ALIGNED)
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  aria-label="Previous"
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-surface-container)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-on-surface)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_left</span>
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-surface-container)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-on-surface)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: 5fr 7fr !important;
          }
        }
      `}</style>
    </section>
  );
}
