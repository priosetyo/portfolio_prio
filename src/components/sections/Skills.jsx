import React from 'react';

export function Skills({ onOpenDetailModal }) {
  const tools = [
    {
      icon: 'layers',
      category: 'UI / Spatial System',
      name: 'Figma Spatials',
      desc: 'Enterprise design tokens, massive spatial prototypes, and corporate guideline documentation.',
      level: 'Proficiency: Expert',
      percent: '98%',
      width: '98%'
    },
    {
      icon: 'view_in_ar',
      category: 'Virtual Production',
      name: 'Unreal Engine 5',
      desc: 'Lumen real-time lighting, Nanite environment construction, and LED volume virtual production.',
      level: 'Proficiency: Advanced',
      percent: '90%',
      width: '90%'
    },
    {
      icon: 'palette',
      category: 'Color Science',
      name: 'DaVinci Resolve',
      desc: 'ACES workflow color grading, theatrical cinema mastering, HDR color science, and cinematic finishing.',
      level: 'Proficiency: Expert',
      percent: '96%',
      width: '96%'
    },
    {
      icon: 'animation',
      category: 'Kinetic Motion',
      name: 'Cinema 4D',
      desc: 'Redshift dynamic simulations, high-speed 3D kinetic typography, and broadcast package systems.',
      level: 'Proficiency: Advanced',
      percent: '92%',
      width: '92%'
    },
    {
      icon: 'auto_fix_high',
      category: 'Editorial & Vector',
      name: 'Adobe Creative Cloud',
      desc: 'Photoshop, Illustrator, and InDesign for precision editorial layouts and global brand identities.',
      level: 'Proficiency: Expert',
      percent: '99%',
      width: '99%'
    }
  ];

  const experiments = [
    {
      study: 'STAGE 01',
      title: 'Chromatic Light',
      fullTitle: 'Chromatic Light Study',
      category: 'R&D Visual Lab (Stage 01)',
      desc: 'Volumetric refraction experiment in chromatic red, deep royal blue, and electric white tones over clean dark glass.',
      specs: ['Prism Optical Engine', 'Lumina HDR', 'Chromatic Volumetric Light'],
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOed9W-d1e0L3y5JDIRg1cf2Nfo9QaOORQGr3c-GO_zMJuM00uHYMWFPUkoyWToYvT_8XDJ2NYPMO0nlDXnTFc243XF5HsMebaJaTHHa2lo2VSf0ZyFubkbGnitncmdsNKW5NVQYAJ7Y5ldJ_uHcmlKFulN9Ve5UYkgOZB1iamQkpzRW3vsE5-__O21FT4v5GziE_6PP1u0VPTbuaPhDXDyysKdBOUUgYSs8IMYLC6'
    },
    {
      study: 'STAGE 02',
      title: 'Generative Poster',
      fullTitle: 'Generative Typographic Poster',
      category: 'R&D Visual Lab (Stage 02)',
      desc: 'Generative Swiss constructivist poster system featuring parametric grid structures and dynamic kinetic vector typography.',
      specs: ['Nodebox', 'Type Engine', 'Swiss Grid Architecture'],
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTsmqR_bDZA_j42jqzPYN_z7WAQ1lFqsQ4mID9hqgFxac5vO9mTzIjuBa4fCttyj6dqlmR1NJcATCfJYLXbI6LqUovGbzJNNkZ6hEVNZlghtv_4STFqLhDfwP0IEe7Z6csXedpkUJ03vo1eYjf3IB4sv33h3zs85tMKugMds3csOj4TDSpl7bTgHug91Y05op86SzsMgdK2Y7JRX1TjqwD3lVrwecTb7gDRJ8cbB_F'
    },
    {
      study: 'STAGE 03',
      title: 'Parametric Loops',
      fullTitle: 'Parametric Chrome Loops',
      category: 'R&D Visual Lab (Stage 03)',
      desc: 'Kinetic 3D chrome geometries suspended in a minimalist architectural void with specular cyan and crimson studio highlights.',
      specs: ['Cinema 4D', 'Redshift Raytracing', 'Subsurface Scattering'],
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbhfltJZI3xYKKSvpA12L4IKsgh7rayLRjFX-45rkgMC7cyfNigBJSuiq-IU5I9Y69xBIXvRhdBsCsRS2vD89MJhNC-h99yhoRRutJH05gYdjBs3VL3JScpp-2RojYBbpH-lU6IF4qsQJhyxpgTtPIIfiBI74ayF6ELhPBMjkdcpDbl8LIXGewR44ABDuhM36IWzgk1VxSpNPAkwP8pzE77A3EvzoOEW5Wsnp-FeGM'
    }
  ];

  return (
    <section
      id="skills"
      style={{
        width: '100%',
        backgroundColor: 'var(--color-surface)',
        padding: '5rem 0'
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
          className="skills-header"
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-secondary-container)',
                color: 'var(--color-on-secondary-container)',
                marginBottom: '0.75rem'
              }}
              className="font-label-mono-sm"
            >
              <span>CREATIVE PIPELINE</span>
            </div>
            <h2
              className="font-headline-lg"
              style={{
                color: 'var(--color-on-surface)',
                fontWeight: '700',
                letterSpacing: '-0.025em'
              }}
            >
              Toolkit & Experiments
            </h2>
            <p
              className="font-body-md"
              style={{
                color: 'var(--color-on-surface-variant)',
                maxWidth: '36rem',
                marginTop: '0.5rem'
              }}
            >
              Industry-standard suites and real-time simulation platforms orchestrated with precision to power enterprise-grade creative delivery.
            </p>
          </div>

          <a
            href="#recent-work"
            className="font-label-mono-sm group"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-surface-container)',
              color: 'var(--color-primary-container)',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 300ms ease',
              alignSelf: 'flex-start'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary-container)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-surface-container)';
              e.currentTarget.style.color = 'var(--color-primary-container)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span>View Detailed Pipeline</span>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
          </a>
        </div>

        {/* 5 Vertical Portrait Cards with animated skill bars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem'
          }}
        >
          {tools.map((t) => (
            <div
              key={t.name}
              className="card-motion group"
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-3xl)',
                backgroundColor: 'var(--color-surface-container-lowest)',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid rgba(194, 198, 211, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 350ms ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(0, 82, 155, 0.4)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(194, 198, 211, 0.2)')}
            >
              <div>
                <div
                  style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: 'var(--radius-xl)',
                    backgroundColor: 'var(--color-secondary-container)',
                    color: 'var(--color-primary-container)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    transition: 'all 300ms ease'
                  }}
                  className="group-hover:scale-110"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>{t.icon}</span>
                </div>
                <span
                  className="font-label-mono-sm"
                  style={{
                    fontSize: '10px',
                    color: 'var(--color-secondary)',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}
                >
                  {t.category}
                </span>
                <h3
                  className="font-headline-sm"
                  style={{
                    color: 'var(--color-on-surface)',
                    fontWeight: '700',
                    marginTop: '0.25rem',
                    marginBottom: '0.5rem'
                  }}
                >
                  {t.name}
                </h3>
                <p className="font-body-sm" style={{ color: 'var(--color-on-surface-variant)', lineHeight: 1.6 }}>
                  {t.desc}
                </p>
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem' }}>
                <div
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--color-surface-container)',
                    height: '6px',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                    marginBottom: '0.5rem'
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'var(--color-primary-container)',
                      height: '100%',
                      borderRadius: 'var(--radius-full)',
                      width: t.width,
                      transition: 'all 1000ms ease-out'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--color-secondary)' }}>
                  <span className="font-label-mono-sm" style={{ fontWeight: '600' }}>{t.level}</span>
                  <span className="font-label-mono-sm" style={{ fontWeight: '700', color: 'var(--color-primary-container)' }}>{t.percent}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dark Showcase Container: Q1 Aesthetic Experiments */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#0A2540',
            color: 'var(--color-surface-bright)',
            borderRadius: 'var(--radius-3xl)',
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: 'var(--shadow-2xl)'
          }}
          className="experiments-banner"
        >
          <div
            style={{
              position: 'absolute',
              right: '-6rem',
              top: '-6rem',
              width: '24rem',
              height: '24rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 82, 155, 0.3)',
              filter: 'blur(48px)',
              pointerEvents: 'none'
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '2rem'
            }}
            className="experiments-content"
          >
            <div style={{ maxWidth: '36rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(237, 28, 36, 0.2)',
                  border: '1px solid rgba(237, 28, 36, 0.4)',
                  color: 'var(--color-tertiary-fixed)',
                  marginBottom: '0.75rem'
                }}
                className="font-label-mono-sm"
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ED1C24' }} className="beacon-ping"></span>
                <span>R&D VISUAL LAB</span>
              </div>
              <h3 className="font-headline-md" style={{ fontWeight: '700', color: 'var(--color-surface-container-lowest)', marginBottom: '0.75rem' }}>
                Q1 Aesthetic Experiments
              </h3>
              <p className="font-body-md" style={{ color: 'var(--color-outline-variant)', lineHeight: 1.6 }}>
                Continuous exploration examining chromatic light limits, generative typography posters, and parametric motion loops prior to commercial rollout.
              </p>
            </div>

            {/* 3 Fanned-out mini preview cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                width: '100%'
              }}
            >
              {experiments.map((exp) => (
                <div
                  key={exp.title}
                  className="card-motion group"
                  onClick={() => {
                    if (onOpenDetailModal) {
                      onOpenDetailModal({
                        title: exp.fullTitle,
                        category: exp.category,
                        description: exp.desc,
                        specs: exp.specs
                      });
                    }
                  }}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-xl)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '6rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(238, 237, 242, 0.2)',
                      marginBottom: '0.75rem',
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    <img
                      src={exp.img}
                      alt={exp.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 500ms ease-out'
                      }}
                      className="group-hover:scale-110"
                    />
                  </div>
                  <span className="font-label-mono-sm" style={{ fontSize: '10px', color: 'var(--color-secondary-fixed)', display: 'block' }}>
                    {exp.study}
                  </span>
                  <p className="font-headline-sm" style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-surface-container-lowest)' }}>
                    {exp.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .skills-header {
            flex-direction: row !important;
            align-items: flex-end !important;
          }
        }
        @media (min-width: 1024px) {
          .experiments-content {
            flex-direction: row !important;
            align-items: center !important;
          }
        }
      `}</style>
    </section>
  );
}
