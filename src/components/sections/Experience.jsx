import React from 'react';

export function Experience({ experiences = [] }) {
  // Curated default experiences from Stitch design
  const defaultExps = [
    {
      id: 'exp-1',
      period: '2022 — SEKARANG',
      role: 'Executive Creative Director',
      org: 'Studio Kinetika Nusantara',
      desc: 'Memimpin 28 desainer multidisiplin, produser 3D, dan sinematografer menangani portofolio enterprise APAC.'
    },
    {
      id: 'exp-2',
      period: '2019 — 2022',
      role: 'Head of Brand Architecture',
      org: 'Omni Creative Network',
      desc: 'Merancang ulang sistem visual bagi 14 rintisan teknologi unicorn dan platform fintech multinasional.'
    },
    {
      id: 'exp-3',
      period: '2015 — 2019',
      role: 'Senior Art Director',
      org: 'Vanguard Media Tokyo',
      desc: 'Mengarahkan kampanye TVC global, instalasi imersif, dan identitas tipografi kontemporer.'
    }
  ];

  const items = experiences && experiences.length > 0
    ? experiences.map((e, idx) => ({
        id: e.id || `exp-${idx}`,
        period: `${e.start_date || '2020'} — ${e.end_date || 'SEKARANG'}`,
        role: e.role,
        org: e.org,
        desc: Array.isArray(e.bullets) && e.bullets.length > 0 ? e.bullets.join('. ') : (e.bullets || defaultExps[idx]?.desc || '')
      }))
    : defaultExps;

  return (
    <section
      id="pengalaman-section"
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: 'var(--space-lg) var(--margin-mobile) 0 var(--margin-mobile)',
        width: '100%'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 'var(--space-lg)',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--color-surface-container-low)',
          boxShadow: 'var(--shadow-sm)',
          gap: 'var(--space-md)'
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-xs)',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-on-surface-variant)'
              }}
            >
              JEJAK KARIER &amp; PERJALANAN
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '26px',
                lineHeight: '32px',
                letterSpacing: '-0.02em',
                fontWeight: '700',
                color: 'var(--color-on-surface)',
                margin: '4px 0 0 0'
              }}
            >
              Kepemimpinan Kreatif Terpilih
            </h3>
          </div>

          <span
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              backgroundColor: 'var(--color-surface-container-highest)',
              color: 'var(--color-on-surface)',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.08em'
            }}
          >
            2015 — SEKARANG
          </span>
        </div>

        {/* 3-Column Experience Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-md)'
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 'var(--space-md)',
                borderRadius: '1rem',
                backgroundColor: 'var(--color-surface-container-lowest)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 200ms ease'
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-secondary)'
                }}
              >
                {item.period}
              </span>

              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  lineHeight: '26px',
                  letterSpacing: '-0.01em',
                  fontWeight: '600',
                  color: 'var(--color-on-surface)',
                  margin: '4px 0 0 0'
                }}
              >
                {item.role}
              </h4>

              <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '2px' }}>
                {item.org}
              </span>

              <p
                style={{
                  fontSize: '13px',
                  lineHeight: '18px',
                  color: 'var(--color-on-surface-variant)',
                  marginTop: '8px',
                  margin: '8px 0 0 0'
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
