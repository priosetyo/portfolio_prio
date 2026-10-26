import React from 'react';

export function Experience({ experiences = [], loading }) {
  // If Supabase experiences are loaded and have different structure, normalize them
  const items = experiences.map((exp, idx) => {
    return {
      id: exp.id || `exp-${idx}`,
      period: exp.period || (exp.start_date ? `${exp.start_date} — ${exp.end_date || 'Sekarang'}` : '2024'),
      location: exp.location || 'Jakarta',
      title: exp.role && exp.org ? `${exp.role} — ${exp.org}` : exp.role || exp.title || 'Creative Director',
      description:
        exp.description ||
        (Array.isArray(exp.bullets) ? exp.bullets.join(' ') : 'Memimpin arahan visual dan arsitektur desain komprehensif.'),
      tag: exp.tag || (exp.type === 'work' ? 'Kepemimpinan' : 'Pendidikan'),
      colorTone: exp.colorTone || (idx === 0 ? 'primary' : idx === 1 ? 'secondary' : 'tertiary')
    };
  });

  return (
    <section
      id="pengalaman"
      style={{
        width: '100%',
        backgroundColor: 'var(--color-surface-low)',
        paddingTop: 'var(--space-3xl)',
        paddingBottom: 'var(--space-3xl)'
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
        {/* Section Title & Narrative */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 'var(--space-md)'
          }}
          className="experience-header"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
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
              Jejak Langkah
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: '800',
                color: 'var(--color-on-surface)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                margin: 0
              }}
            >
              Pengalaman Kerja &amp; Kolaborasi
            </h2>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--color-on-surface-variant)',
              maxWidth: '28rem',
              lineHeight: 1.6,
              margin: 0
            }}
          >
            Lebih dari satu dekade memandu visi artistik untuk startup unicorn, agensi periklanan multinasional, dan institusi budaya global.
          </p>
        </div>

        {/* Experience Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {items.map((item, index) => {
            const periodColor =
              item.colorTone === 'primary'
                ? 'var(--color-primary)'
                : item.colorTone === 'secondary'
                ? 'var(--color-secondary)'
                : 'var(--color-tertiary)';

            return (
              <div
                key={item.id}
                className="stitch-exp-card group"
                style={{
                  padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                  borderRadius: 'var(--radius-xl)',
                  backgroundColor: 'var(--color-surface-container)',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid rgba(230, 190, 178, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-lg)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {/* Column 1: Period & Location (25% on desktop) */}
                <div className="stitch-exp-col-1" style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      color: periodColor
                    }}
                  >
                    {item.period}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.6875rem',
                      color: 'var(--color-outline)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginTop: '0.2rem'
                    }}
                  >
                    {item.location}
                  </span>
                </div>

                {/* Column 2: Role & Narrative (50% on desktop) */}
                <div
                  className="stitch-exp-col-2"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-xs)'
                  }}
                >
                  <h3
                    className="stitch-exp-title"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: 'var(--color-on-surface)',
                      transition: 'color var(--transition-fast)',
                      margin: 0
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.875rem',
                      color: 'var(--color-on-surface-variant)',
                      lineHeight: 1.6,
                      margin: 0
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Column 3: Tag / Domain Badge (25% on desktop) */}
                <div className="stitch-exp-col-3" style={{ display: 'flex' }}>
                  <span
                    style={{
                      padding: '0.35rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-surface-lowest)',
                      color:
                        item.colorTone === 'secondary'
                          ? 'var(--color-secondary)'
                          : 'var(--color-on-surface-variant)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.6875rem',
                      fontWeight: '600',
                      border: '1px solid rgba(230, 190, 178, 0.08)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .experience-header {
            flex-direction: row !important;
            align-items: flex-end !important;
          }
        }
        @media (min-width: 1024px) {
          .stitch-exp-card {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
          }
          .stitch-exp-col-1 {
            width: 25% !important;
          }
          .stitch-exp-col-2 {
            width: 50% !important;
          }
          .stitch-exp-col-3 {
            width: 25% !important;
            justify-content: flex-end !important;
          }
        }
        .stitch-exp-card:hover {
          background-color: var(--color-surface-high) !important;
        }
        .stitch-exp-card:hover .stitch-exp-title {
          color: var(--color-primary) !important;
        }
      `}</style>
    </section>
  );
}
