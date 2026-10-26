import React from 'react';

export function About({ settings, loading }) {
  const quote =
    settings?.quote ||
    '“Desain bukan sekadar ornamen estetika, melainkan rekayasa persepsi yang memantik rasa penasaran dan memberikan dampak nyata.”';

  return (
    <section
      id="tentang"
      style={{
        width: '100%',
        backgroundColor: 'var(--color-surface)',
        paddingTop: 'var(--space-3xl)',
        paddingBottom: 'var(--space-2xl)'
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
        {/* Section Tagline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 'var(--space-xs)'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: 'var(--color-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.25em'
            }}
          >
            Manifesto &amp; Disiplin
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '800',
              color: 'var(--color-on-surface)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginTop: 'var(--space-xs)'
            }}
          >
            Rekayasa Sensorik &amp; Nilai Estetika
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--color-on-surface-variant)',
              maxWidth: '42rem',
              marginTop: 'var(--space-xs)'
            }}
          >
            Mengintegrasikan kedalaman naratif sinema dengan presisi teknologi antarmuka spasial untuk memantik rasa penasaran audiens.
          </p>
        </div>

        {/* Bento Box Layout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--gutter)'
          }}
          className="bento-grid"
        >
          {/* Bento Card 1: Filosofi Desain (7 cols) */}
          <div
            className="bento-card-7"
            style={{
              gridColumn: 'span 12',
              backgroundColor: 'var(--color-surface-low)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(1.5rem, 4vw, 3rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(230, 190, 178, 0.08)'
            }}
          >
            {/* Ambient subtle light emitter */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '20rem',
                height: '20rem',
                backgroundColor: 'rgba(255, 87, 26, 0.1)',
                borderRadius: '50%',
                filter: 'blur(64px)',
                pointerEvents: 'none'
              }}
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-sm)',
                zIndex: 2,
                width: '100%'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-primary)',
                  fontWeight: '700'
                }}
              >
                Filosofi Desain
              </span>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-outline)', fontSize: '24px' }}>
                format_quote
              </span>
            </div>

            <blockquote
              style={{
                margin: 'var(--space-xl) auto',
                zIndex: 2,
                maxWidth: '36rem'
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.35rem, 2.5vw, 2.25rem)',
                  fontWeight: '700',
                  color: 'var(--color-on-surface)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.015em'
                }}
              >
                “Desain bukan sekadar ornamen estetika, melainkan{' '}
                <span style={{ color: 'var(--color-secondary)' }}>rekayasa persepsi</span> yang memantik rasa penasaran dan memberikan dampak nyata.”
              </p>
            </blockquote>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-sm)',
                zIndex: 2,
                paddingTop: 'var(--space-md)'
              }}
            >
              <div
                style={{
                  padding: '0.35rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-surface-high)',
                  color: 'var(--color-on-surface)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  fontWeight: '500'
                }}
              >
                Art &amp; Commerce Balance
              </div>
              <div
                style={{
                  padding: '0.35rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-surface-high)',
                  color: 'var(--color-on-surface)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  fontWeight: '500'
                }}
              >
                Spatial Intelligence
              </div>
              <div
                style={{
                  padding: '0.35rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-surface-high)',
                  color: 'var(--color-on-surface)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  fontWeight: '500'
                }}
              >
                Human Metaphor
              </div>
            </div>
          </div>

          {/* Bento Card 2: Pilar Strategis & Disiplin Kreasi (5 cols) */}
          <div
            className="bento-card-5"
            style={{
              gridColumn: 'span 12',
              backgroundColor: 'var(--color-surface-container)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid rgba(230, 190, 178, 0.08)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-secondary)',
                  fontWeight: '700'
                }}
              >
                Pilar Strategis
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'var(--color-on-surface)'
                }}
              >
                Disiplin Kreasi
              </h3>
            </div>

            {/* 4 Discipline Rows */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)',
                margin: 'var(--space-lg) 0',
                width: '100%'
              }}
            >
              {/* Item 1 */}
              <div
                style={{
                  padding: '0.875rem 1rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-surface-high)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', textAlign: 'left' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-primary-container)' }}>
                    theater_comedy
                  </span>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: 'var(--color-on-surface)',
                        margin: 0
                      }}
                    >
                      Creative Direction
                    </h4>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        color: 'var(--color-on-surface-variant)',
                        margin: 0
                      }}
                    >
                      Narasi menyeluruh &amp; arsitektur ide
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-outline-variant)', fontSize: '20px' }}>
                  north_east
                </span>
              </div>

              {/* Item 2 */}
              <div
                style={{
                  padding: '0.875rem 1rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-surface-high)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', textAlign: 'left' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-secondary-container)' }}>
                    view_in_ar
                  </span>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: 'var(--color-on-surface)',
                        margin: 0
                      }}
                    >
                      UI/UX Spatial Design
                    </h4>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        color: 'var(--color-on-surface-variant)',
                        margin: 0
                      }}
                    >
                      Antarmuka imersif &amp; arsitektur sistem
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-outline-variant)', fontSize: '20px' }}>
                  north_east
                </span>
              </div>

              {/* Item 3 */}
              <div
                style={{
                  padding: '0.875rem 1rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-surface-high)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', textAlign: 'left' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>
                    camera
                  </span>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: 'var(--color-on-surface)',
                        margin: 0
                      }}
                    >
                      Editorial Photography
                    </h4>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        color: 'var(--color-on-surface-variant)',
                        margin: 0
                      }}
                    >
                      Cahaya terukur &amp; komposisi sinematik
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-outline-variant)', fontSize: '20px' }}>
                  north_east
                </span>
              </div>

              {/* Item 4 */}
              <div
                style={{
                  padding: '0.875rem 1rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-surface-high)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', textAlign: 'left' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-secondary)' }}>
                    movie
                  </span>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: 'var(--color-on-surface)',
                        margin: 0
                      }}
                    >
                      Film &amp; Motion
                    </h4>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        color: 'var(--color-on-surface-variant)',
                        margin: 0
                      }}
                    >
                      Ritme visual berdaya sentak tinggi
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-outline-variant)', fontSize: '20px' }}>
                  north_east
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-xs)',
                color: 'var(--color-secondary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: '600',
                margin: '0 auto'
              }}
            >
              <span>Diselaraskan untuk skala multi-platform</span>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                check_circle
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .bento-card-7 {
            grid-column: span 7 !important;
          }
          .bento-card-5 {
            grid-column: span 5 !important;
          }
        }
      `}</style>
    </section>
  );
}
