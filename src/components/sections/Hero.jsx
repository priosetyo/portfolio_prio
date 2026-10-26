import React from 'react';

export function Hero({ settings, loading }) {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const portraitSrc =
    settings?.portrait_url ||
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBRIdAZL_aeKhdNj0j11PfqRxTnoJDygyvYERlJUh1y9rRx9YyOGMjZFiQl_2j6PQW6HhRUnilkbhcYy9GWH70PN11eEfGSJ0G9xlGOkRvIVTqDUnNBug8yJ1IXV-sATFfvm4xFO8mMm9kC-OwxQZeA4hc-JH9O1V9r0PrNBmQBy4g9EOCErIcrj0H9Vk5g8IQa_EHACM41-23zvVgPWQfE6bMjCI3kPYlpgfzFomM';

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'var(--color-surface-lowest)',
        paddingTop: '7rem',
        paddingBottom: 'var(--space-3xl)'
      }}
    >
      {/* Atmospheric Ambient Glow Spheres */}
      <div
        style={{
          position: 'absolute',
          top: '-6rem',
          left: '25%',
          width: '520px',
          height: '520px',
          background: 'radial-gradient(circle, rgba(255, 87, 26, 0.25) 0%, rgba(255, 127, 28, 0.1) 40%, transparent 70%)',
          filter: 'blur(140px)',
          pointerEvents: 'none',
          borderRadius: '50%'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '33%',
          right: '-5rem',
          width: '460px',
          height: '460px',
          background: 'radial-gradient(circle, rgba(255, 87, 26, 0.2) 0%, rgba(255, 181, 158, 0.05) 50%, transparent 70%)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          borderRadius: '50%'
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          maxWidth: 'var(--max-width)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2xl)'
        }}
      >
        {/* Status Badge Pill */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-sm)',
              padding: '0.35rem 1rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(42, 41, 46, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(230, 190, 178, 0.12)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <span
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '8px',
                height: '8px'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-container)',
                  animation: 'pingGlow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                }}
              />
              <span
                style={{
                  position: 'relative',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-container)'
                }}
              />
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6875rem',
                fontWeight: '600',
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              Tersedia untuk Proyek &amp; Kolaborasi Global 2025
            </span>
          </div>
        </div>

        {/* Hero Grid: Typographic Manifesto */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '56rem',
            margin: '0 auto',
            gap: 'var(--space-xl)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--color-secondary)',
                fontWeight: '600'
              }}
            >
              Creative Director &amp; Visual Storyteller
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.75rem, 7vw, 5rem)',
                fontWeight: '800',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: 'var(--color-on-surface)',
                marginTop: 'var(--space-xs)'
              }}
            >
              Prio&nbsp;
              <span className="text-gradient-vermilion">Setyo</span>
            </h1>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 1.8vw, 1.125rem)',
              color: 'var(--color-on-surface-variant)',
              maxWidth: '36rem',
              lineHeight: 1.65,
              margin: '0 auto'
            }}
          >
            Membangun ekosistem visual spektakuler, identitas brand sinematik, dan antarmuka spasial masa depan. Mengubah narasi kompleks menjadi pengalaman sensorik bernilai komersial tinggi.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-md)',
              paddingTop: 'var(--space-xs)'
            }}
          >
            <a
              href="#karya"
              onClick={scrollTo('#karya')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-sm)',
                padding: '0.875rem 2.5rem',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(to right, var(--color-primary-container), var(--color-secondary-container))',
                color: 'var(--color-on-primary-container)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: '700',
                boxShadow: 'var(--shadow-glow)',
                transition: 'all var(--transition-fast)',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span>Lihat Karya</span>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_downward</span>
            </a>

            <a
              href="#kontak"
              onClick={scrollTo('#kontak')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-sm)',
                padding: '0.875rem 2.5rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(42, 41, 46, 0.8)',
                color: 'var(--color-on-surface)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: '600',
                border: '1px solid rgba(230, 190, 178, 0.12)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all var(--transition-fast)',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-highest)';
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(42, 41, 46, 0.8)';
                e.currentTarget.style.color = 'var(--color-on-surface)';
              }}
            >
              <span>Hubungi Saya</span>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>north_east</span>
            </a>
          </div>

          {/* Stats Row: 3 Columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--space-md)',
              paddingTop: 'var(--space-md)',
              maxWidth: '32rem',
              width: '100%',
              margin: '0 auto',
              textAlign: 'center'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'var(--color-on-surface)'
                }}
              >
                11+
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  color: 'var(--color-on-surface-variant)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                Tahun Pengalaman
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'var(--color-on-surface)'
                }}
              >
                38+
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  color: 'var(--color-on-surface-variant)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                Penghargaan Global
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'var(--color-on-surface)'
                }}
              >
                120+
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  color: 'var(--color-on-surface-variant)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                Karya Kurasi
              </span>
            </div>
          </div>
        </div>

        {/* Feature Banner: Studio Portrait with 21:9 ratio & glassmorphic badge */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '56rem',
            margin: '0 auto'
          }}
        >
          <div
            className="portrait-card"
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              backgroundColor: 'var(--color-surface-container)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <img
              src={portraitSrc}
              alt="Cinematic high contrast studio portrait of Prio Setyo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                transition: 'transform 700ms ease'
              }}
              className="portrait-img"
            />
            {/* Dark Vignette Bottom Gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, var(--color-surface-lowest) 0%, transparent 60%)',
                opacity: 0.85
              }}
            />

            {/* Glassmorphic Badge Bottom-Left */}
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
                padding: '0.875rem 1.25rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(14, 14, 18, 0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(230, 190, 178, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              className="atelier-badge"
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.6875rem',
                    color: 'var(--color-primary)',
                    textTransform: 'uppercase',
                    fontWeight: '700',
                    letterSpacing: '0.1em',
                    margin: 0
                  }}
                >
                  Atelier &amp; Studio
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: 'var(--color-on-surface)',
                    margin: '0.15rem 0 0'
                  }}
                >
                  Jakarta / Singapore
                </p>
              </div>

              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(255, 87, 26, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary-container)'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  shutter_speed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .portrait-card {
            aspect-ratio: 21/9 !important;
          }
          .atelier-badge {
            bottom: 1.5rem !important;
            left: 1.5rem !important;
            right: 1.5rem !important;
          }
        }
        .portrait-card:hover .portrait-img {
          transform: scale(1.04);
        }
      `}</style>
    </section>
  );
}
