import React from 'react';

export function Skills({ groupedSkills }) {
  const defaultTools = [
    { code: 'Fg', name: 'Figma', role: 'Design Systems' },
    { code: 'UE5', name: 'Unreal 5.4', role: 'Real-time Sets' },
    { code: 'Bl', name: 'Blender 4', role: 'Procedural 3D' },
    { code: 'C4D', name: 'Cinema 4D', role: 'Redshift Engine' },
    { code: 'Ae', name: 'After Effects', role: 'Kinetic Motion' },
    { code: 'visionOS', icon: 'view_in_ar', name: 'visionOS', role: 'Spatial UX' }
  ];

  // Transform dynamic groupedSkills from database / admin
  const dynamicItems = groupedSkills
    ? Object.entries(groupedSkills).flatMap(([group, items]) =>
        items.map((item) => {
          const words = (item.name || '').trim().split(/\s+/);
          const code =
            words.length > 1
              ? (words[0][0] + words[1][0]).toUpperCase()
              : (item.name || 'SK').slice(0, 3).toUpperCase();
          return {
            id: item.id,
            code,
            name: item.name,
            role: group
          };
        })
      )
    : [];

  const displayTools = dynamicItems.length > 0 ? dynamicItems : defaultTools;

  return (
    <section
      id="toolkit-section"
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 var(--margin-mobile)',
        width: '100%'
      }}
    >
      <div
        style={{
          width: '100%',
          padding: 'var(--space-lg)',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: '#000000',
          color: '#ffffff',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 'var(--space-lg)'
        }}
        className="toolkit-card-container"
      >
        {/* Left Column: Description & Metric Counters */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            maxWidth: '480px'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                backgroundColor: 'var(--color-primary-container)',
                color: 'var(--color-on-primary-container)',
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                width: 'max-content'
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-tertiary-fixed)',
                  boxShadow: '0 0 8px var(--color-tertiary-fixed)',
                  animation: 'pulse 1.5s infinite'
                }}
              />
              <span>Realtime 3D &amp; Spatial Pipeline</span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '40px',
                lineHeight: '46px',
                letterSpacing: '-0.03em',
                fontWeight: '700',
                textTransform: 'uppercase',
                color: '#ffffff',
                margin: '8px 0 0 0'
              }}
            >
              CREATIVE ENGINE &amp; TOOLKIT
            </h3>

            <p
              style={{
                fontSize: '15px',
                lineHeight: '24px',
                color: 'var(--color-on-primary-container)',
                marginTop: '8px'
              }}
            >
              Kombinasi komputasi spasial, tipografi parametrik, dan alur kerja sinematik untuk mewujudkan presisi visual tanpa kompromi.
            </p>
          </div>

          {/* Stats Bar */}
          <div
            style={{
              paddingTop: 'var(--space-md)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-md)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#ffffff'
                }}
              >
                100%
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-on-primary-container)'
                }}
              >
                Fidelity Rate
              </span>
            </div>

            <div style={{ height: '32px', width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  fontWeight: '700',
                  color: 'var(--color-tertiary-fixed)'
                }}
              >
                Sub-second
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-on-primary-container)'
                }}
              >
                Spatial Iteration
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: 6 Badges Grid */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--space-sm)',
            alignContent: 'center'
          }}
        >
          {displayTools.map((t, idx) => (
            <div
              key={t.id || t.name || idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                padding: 'var(--space-sm)',
                borderRadius: '1rem',
                backgroundColor: 'var(--color-primary-container)',
                transition: 'background-color 150ms ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2a292e')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary-container)')}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '0.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '12px',
                  color: '#ffffff'
                }}
              >
                {t.icon ? (
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    {t.icon}
                  </span>
                ) : (
                  t.code
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>
                  {t.name}
                </span>
                <span style={{ fontSize: '10px', color: 'var(--color-on-primary-container)', letterSpacing: '0.04em' }}>
                  {t.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .toolkit-card-container {
            flex-direction: row !important;
            align-items: stretch !important;
          }
        }
      `}</style>
    </section>
  );
}
