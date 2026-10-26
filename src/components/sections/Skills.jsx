import React from 'react';

const TOOLKIT_PILLS = [
  'Figma Spatials',
  'Unreal Engine 5',
  'DaVinci Resolve Studio',
  'Cinema 4D / Octane',
  'Phase One XF'
];

export function Skills({ groupedSkills = {}, loading }) {
  const artworkSrc =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBZKUN_SI6NZ3puaBrvtRv0gTBlp5tPYbBmGv9poKowqWonoPPb6Rq08Bsitb21GU9e2mol3RoVN06il8u3QarPHsh8xTMZiI5tm6LAeDYbIWXfFfkgVjmzFzqnruZdc5Rrf_KIo1e_43LuNOoDa3ziCn1DVr4mLELPaaRxHObTanCYnKvPCG78NPyKVnxd0CiVkulDQh-ObFxi2UB0wovswqqn4FDxlIbO9pODsXA';

  const groupKeys = Object.keys(groupedSkills);

  return (
    <section
      id="keahlian"
      style={{
        width: '100%',
        backgroundColor: 'var(--color-surface)',
        paddingTop: 'var(--space-md)',
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
        {/* Bento Card 3: Creative Toolkit & Pipeline Produksi */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-low)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 'var(--space-xl)',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid rgba(230, 190, 178, 0.08)'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 'var(--space-sm)',
              maxWidth: '42rem',
              margin: '0 auto'
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
              Instrumen &amp; Ekosistem
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                fontWeight: '700',
                color: 'var(--color-on-surface)'
              }}
            >
              Creative Toolkit &amp; Pipeline Produksi
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                color: 'var(--color-on-surface-variant)',
                lineHeight: 1.6
              }}
            >
              Memadukan presisi perangkat lunak modern (Figma Spatial, Unreal Engine 5, DaVinci Resolve Studio, Medium Format Phase One) untuk menciptakan presisi dari nol hingga rilis global.
            </p>

            {/* Toolkit Pills */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 'var(--space-xs)',
                paddingTop: 'var(--space-xs)'
              }}
            >
              {TOOLKIT_PILLS.map((tool, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '0.35rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-surface-highest)',
                    color: 'var(--color-on-surface)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    border: '1px solid rgba(230, 190, 178, 0.1)'
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* 3D Artwork Frame: Eksperimen Estetika Q1 */}
          <div
            style={{
              width: '100%',
              maxWidth: '32rem',
              aspectRatio: '16/9',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              backgroundColor: 'var(--color-surface-highest)',
              position: 'relative',
              boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.5)',
              margin: '0 auto'
            }}
          >
            <img
              src={artworkSrc}
              alt="Eksperimen Estetika Q1 - 3D dynamic glass sculpture"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(14, 14, 18, 0.85) 0%, transparent 60%)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                padding: 'var(--space-md)'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  color: 'var(--color-on-surface)',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-xs)'
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-secondary-container)'
                  }}
                />
                Eksperimen Estetika Q1
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Skill Competencies (fotografi, videografi, desain, copywriting) */}
        {groupKeys.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--space-md)',
              marginTop: 'var(--space-md)'
            }}
          >
            {groupKeys.map((group) => {
              const items = groupedSkills[group] || [];
              return (
                <div
                  key={group}
                  style={{
                    backgroundColor: 'var(--color-surface-container)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-lg)',
                    border: '1px solid rgba(230, 190, 178, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-md)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.125rem',
                        fontWeight: '700',
                        color: 'var(--color-on-surface)'
                      }}
                    >
                      {group}
                    </h4>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6875rem',
                        color: 'var(--color-outline)',
                        backgroundColor: 'var(--color-surface-high)',
                        padding: '0.15rem 0.5rem',
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      {items.length} kompetensi
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                    {items.map((skill) => (
                      <div
                        key={skill.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-sm)',
                          fontSize: '0.875rem',
                          color: 'var(--color-on-surface-variant)',
                          padding: '0.4rem 0.6rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'rgba(42, 41, 46, 0.4)'
                        }}
                      >
                        <span
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-primary-container)',
                            flexShrink: 0
                          }}
                        />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
