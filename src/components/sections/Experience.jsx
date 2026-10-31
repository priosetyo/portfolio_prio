import React from 'react';

export function Experience({ experiences = [], onOpenDetailModal }) {
  const defaultTimeline = [
    {
      company: 'Studio Artefak',
      role: 'Principal Creative Director',
      period: '2024 — Present',
      isCurrent: true,
      location: 'Jakarta HQ',
      desc: 'Directing creative vision for energy conglomerates, luxury brands, and commercial scale productions.',
      specs: ['Executive Creative Direction', 'TVC Direction', 'Post-production Supervision']
    },
    {
      company: 'Global Kinetic Agency',
      role: 'Head of Visual Storytelling',
      period: '2022 — 2024',
      isCurrent: false,
      location: 'Singapore Hub',
      desc: 'Directed international video production campaigns for the Southeast Asia market with virtual production integration.',
      specs: ['Virtual Production LED Volume', 'Unreal Engine Realtime', 'Broadcast Strategy']
    },
    {
      company: 'Monolith Creative Lab',
      role: 'Senior Art Director',
      period: '2020 — 2022',
      isCurrent: false,
      location: 'Jakarta Studio',
      desc: 'Architected integrated brand systems, exhibition identities, and exclusive corporate collateral packaging.',
      specs: ['Spatial Identity', 'Corporate Rebranding', 'Packaging Design']
    },
    {
      company: 'Neo Jakarta Advertising',
      role: 'Visual Designer & Motion Specialist',
      period: '2018 — 2020',
      isCurrent: false,
      location: 'Jakarta Agency',
      desc: 'Created kinetic motion graphics, commercial TV boards, and dynamic typography for massive-scale campaigns.',
      specs: ['Motion Graphics Broadcast', 'Kinetic Typography', 'Commercial TVC Boards']
    }
  ];

  // Map dynamic Supabase experiences or use default Stitch timeline
  const items = experiences && experiences.length >= 4
    ? experiences.map((e, idx) => ({
        company: e.org || defaultTimeline[idx]?.company,
        role: e.role || defaultTimeline[idx]?.role,
        period: `${e.start_date || '2020'} — ${e.end_date || 'Present'}`,
        isCurrent: idx === 0,
        location: e.location || defaultTimeline[idx]?.location || 'Jakarta HQ',
        desc: Array.isArray(e.bullets) && e.bullets.length > 0 ? e.bullets.join('. ') : (e.bullets || defaultTimeline[idx]?.desc || ''),
        specs: defaultTimeline[idx]?.specs || ['Creative Direction']
      }))
    : defaultTimeline;

  return (
    <section
      id="experiences"
      style={{
        width: '100%',
        backgroundColor: '#0A2540',
        color: 'var(--color-surface-bright)',
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '2.5rem'
          }}
          className="experience-header"
        >
          <div>
            <span
              className="font-label-mono-sm"
              style={{
                color: 'var(--color-secondary-fixed)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '0.5rem'
              }}
            >
              CAREER JOURNEY
            </span>
            <h2
              className="font-headline-lg"
              style={{
                color: 'var(--color-surface-container-lowest)',
                fontWeight: '700',
                letterSpacing: '-0.025em'
              }}
            >
              Creative Leadership Timeline
            </h2>
          </div>
          <p
            className="font-body-sm md-text-right"
            style={{
              color: 'var(--color-outline-variant)',
              maxWidth: '28rem',
              lineHeight: 1.6
            }}
          >
            A consistent record of steering multidisciplinary teams across commercial advertising and independent studio production.
          </p>
        </div>

        {/* 4 Full-Bleed Interactive Vertical Timeline Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--gutter-lg)'
          }}
        >
          {items.map((item) => (
            <div
              key={item.company + item.period}
              className="card-motion group"
              onClick={() => {
                if (onOpenDetailModal) {
                  onOpenDetailModal({
                    title: item.company,
                    category: `${item.role} (${item.period})`,
                    description: item.desc,
                    specs: Array.isArray(item.specs) ? item.specs : [item.specs]
                  });
                }
              }}
              style={{
                padding: '2rem',
                borderRadius: 'var(--radius-3xl)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <span
                    className="font-label-mono-sm"
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: item.isCurrent ? '#ED1C24' : 'rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      fontWeight: '600',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {item.period}
                  </span>
                  {item.isCurrent && (
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#7AC142' }} className="beacon-ping"></span>
                  )}
                </div>

                <h3
                  className="font-headline-sm"
                  style={{
                    color: 'var(--color-surface-container-lowest)',
                    fontWeight: '700',
                    marginBottom: '0.25rem'
                  }}
                >
                  {item.company}
                </h3>
                <p
                  className="font-label-mono-sm"
                  style={{
                    color: 'var(--color-secondary-fixed)',
                    marginBottom: '1rem'
                  }}
                >
                  {item.role}
                </p>
                <p className="font-body-sm" style={{ color: 'var(--color-outline-variant)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>

              <div
                style={{
                  marginTop: '2rem',
                  paddingTop: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <span className="font-label-mono-sm" style={{ fontSize: '11px', color: 'var(--color-outline-variant)', textTransform: 'uppercase' }}>
                  {item.location}
                </span>
                <div
                  style={{
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-surface-container-lowest)',
                    transition: 'all 300ms ease'
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_outward</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .experience-header {
            flex-direction: row !important;
            align-items: flex-end !important;
          }
        }
      `}</style>
    </section>
  );
}
