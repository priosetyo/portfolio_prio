import React, { useState } from 'react';

export function WorkGrid({ onOpenDetailModal }) {
  const [macroFilter, setMacroFilter] = useState('all'); // 'all' or 'studio'
  const [disciplineFilter, setDisciplineFilter] = useState('all'); // 'all', 'fotografi', 'videografi', 'desain', 'copywriting'

  const heroProject = {
    title: 'Pertamina Patra Niaga — Energizing Horizons 2025',
    category: 'videografi',
    categoryLabel: 'Videography & Creative Direction',
    year: '2025',
    duration: '03:45 4K Master',
    desc: 'High-energy commercial manifesto film for Pertamina Patra Niaga. Blending on-site footage of maritime and energy infrastructure with original orchestral scoring.',
    specs: ['Cooke Anamorphic /i', 'RED V-Raptor 8K VV', 'DaVinci ACES Workflow'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuGJpQ0bvyGF_evdEgD6ypGR0OzCkBPkAKUGHNvIPEd0SOnoUkq6_50UaEOgILMSilR4Y2RxZVwGtj1vUdhsZLEPJo62Q0q08L8ycvGqcwGJRiabnD-_IGB3EHvCuxxOAyZ3dSx5jN67aoZaOYVj2xKIdPVv_fql6GyQVjnD-4vmWrM0fQQEoYkN-xxXR31ARxiSoyD8UP-AZ2ebnp68wBcTQldVTOYRN5R-mGSNgh'
  };

  const mediumBento = [
    {
      title: 'Neo Jakarta Spatial Pavilion',
      category: 'desain',
      categoryLabel: 'Graphic & Spatial Design',
      year: '2025',
      desc: 'Exhibition pavilion identity and kinetic typography installation for an architectural pavilion.',
      specs: ['Exhibition System', 'Swiss Architectural Typo', 'Spatial Grid'],
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIXTSazWM_NfVo1v7Jw_a7GoLAhpAPWCDMSUAc3XvbJyuTb1O9TslO_ZReGZxB2ZQsD5U_GSlxX9rI-uBwbr73SfBFzOLIb7IFzJzyvdoqVC-clmfWh2QfRxWpNs7gPXYIYmuPJcjTPSLmyyhuLJTSj0lSWWhH-6YYwopdhbnfjvjdHeRgN0kPuOElmMnE24XllW_oLN1JlEt2SWEzZDRnKllreT94QXvojWUchRD-'
    },
    {
      title: 'Lumina High-Jewelry',
      category: 'fotografi',
      categoryLabel: 'Editorial Photography',
      year: '2024',
      desc: 'Haute joaillerie visual campaign with dramatic chiaroscuro lighting.',
      specs: ['Hasselblad H6D-100c', 'Broncolor Lighting', 'Micro Sculptural Setup'],
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1nN812ZrBgDkgKbBWajCyBH_HgX5Wa8LhTtbj0NSy7jdhtw2zG05pnYfMyoN1xUwpgR0CEidYvIbVoGMwpf306_eX1vwhNeVeGbNGWGMsT4TaYP-hMI6gicXp0Md0tluohncFsw1pzs4sGVFZ_Ca29tTCI4gR302tFfxeY2aRHxDI0InTkkZvjqaw8S7sbkKLGnixb-oX95xDrAgpcsCQ4ADnUgS03awcBrSccQeu'
    },
    {
      title: 'Apex Kinetic Rebrand',
      category: 'copywriting',
      categoryLabel: 'Brand Architecture & Copy',
      year: '2024',
      desc: 'Visual identity transformation for regional venture capital firm in Singapore and Jakarta.',
      specs: ['Design Tokens', 'Manifesto Strategy', 'Enterprise Typography'],
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqAxvOJ0njZRSOnyT4Huvi_WfZdjbQX3UdUOGvnOr2SnmF_hrL5frDnp6LmO2Twg7ECEqlW5-vt5652YFei-5wbXp5PZA62UaxK4NUNNACMj2Y6SrZUW5z9mXXaWebW8F2YRSdo1-aYtB-7FsHkhx-A4y7TaN9UbLL4NcNxSaPx0st5WF0a5oX70hX5xTNcnY-_dxiEdpJysYiJfBDxcyaZTiOhNeiTcGwnFsO5Ne4'
    },
    {
      title: 'Echoes of Nusantara',
      category: 'videografi',
      categoryLabel: 'Cinematography & Docudrama',
      year: '2024',
      desc: 'Short documentary highlighting heritage preservation with authentic 35mm grain grading.',
      specs: ['ARRI Alexa Mini LF', 'Cooke Panchro Classic', 'Ambisonic Audio'],
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOL6vGBo20ewsYQKUTzURPkTL04YcL9CzWFGFG_oQM8hccTsK5rO4HrB0i6glNJQ9V2iPbTkg21pQRf0cZhzXhugAxVNwSRhM0SpfwjDf8cZ8xOPKmGE4JXcbOJ5cA70FKOisPNu50GyQ474bLjiNBTVGoNaenBc3gDXt_-lcwriq1IM0MFgkpwoLAU2ofFMbpZSV1U5VsJeqKyHD0ES7gigpYyQRa-tHImaHXnDSA'
    }
  ];

  const showcaseRow = [
    {
      title: 'Pertamina Lubricants Global Campaign',
      category: 'videografi',
      badge: 'Videography / 2025',
      sub: 'Global Broadcast',
      desc: 'High-speed circuit filming for international lubricants campaign, integrating gyro-stabilized rigs and high-speed cinema optics.',
      specs: ['Sony FX9', 'Gyro Rig', 'Phantom Flex 4K']
    },
    {
      title: 'Studio Artefak Monograph Vol. 4',
      category: 'desain',
      badge: 'Graphic Design / 2025',
      sub: 'Editorial Print',
      desc: 'Hardcover linen monograph with gold foil finishing capturing five years of contemporary visual practice.',
      specs: ['Fedrigoni Papers', 'Hot Foil Stamping', 'Offset 6-Colors']
    },
    {
      title: 'Solaris Industrial Energy Essay',
      category: 'fotografi',
      badge: 'Photography / 2024',
      sub: 'Industrial Essay',
      desc: 'Artistic photographic essay documenting renewable energy plants in East Kalimantan through human-scale geometry.',
      specs: ['Leica SL2', 'Summilux 35mm f/1.4 ASPH', 'Natural Light Chiaroscuro']
    }
  ];

  const filterMatches = (cat) => {
    if (disciplineFilter === 'all') return true;
    return cat === disciplineFilter;
  };

  const isHeroVisible = filterMatches(heroProject.category);

  return (
    <section
      id="recent-work"
      style={{
        width: '100%',
        backgroundColor: '#F4F7FA',
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
        {/* Section Title & Filter System */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
            className="gallery-header-row"
          >
            <div>
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
                CURATED PORTFOLIO
              </span>
              <h2
                className="font-headline-lg"
                style={{
                  color: 'var(--color-on-surface)',
                  fontWeight: '700',
                  letterSpacing: '-0.025em'
                }}
              >
                Selected Works Gallery
              </h2>
            </div>

            {/* Tier 1 Filter: Macro Scope */}
            <div
              style={{
                display: 'inline-flex',
                padding: '0.25rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-surface-container)',
                border: '1px solid rgba(194, 198, 211, 0.3)',
                alignSelf: 'flex-start'
              }}
            >
              <button
                type="button"
                className="font-label-mono-sm"
                onClick={() => {
                  setMacroFilter('all');
                  setDisciplineFilter('all');
                }}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: macroFilter === 'all' ? 'var(--color-primary-container)' : 'transparent',
                  color: macroFilter === 'all' ? '#ffffff' : 'var(--color-on-surface-variant)',
                  fontWeight: '600',
                  transition: 'all 300ms ease',
                  boxShadow: macroFilter === 'all' ? 'var(--shadow-sm)' : 'none'
                }}
              >
                All Works
              </button>
              <button
                type="button"
                className="font-label-mono-sm"
                onClick={() => {
                  setMacroFilter('studio');
                  setDisciplineFilter('desain');
                }}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: macroFilter === 'studio' ? 'var(--color-primary-container)' : 'transparent',
                  color: macroFilter === 'studio' ? '#ffffff' : 'var(--color-on-surface-variant)',
                  fontWeight: '600',
                  transition: 'all 300ms ease',
                  boxShadow: macroFilter === 'studio' ? 'var(--shadow-sm)' : 'none'
                }}
              >
                Studio Experiments
              </button>
            </div>
          </div>

          {/* Tier 2 Filter: Discipline Scope */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', paddingTop: '0.5rem' }}>
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'fotografi', label: 'Photography' },
              { id: 'videografi', label: 'Videography & Directing' },
              { id: 'desain', label: 'Graphic Design' },
              { id: 'copywriting', label: 'Copywriting & Narrative' }
            ].map((btn) => {
              const isActive = disciplineFilter === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setDisciplineFilter(btn.id)}
                  className="font-label-mono-sm"
                  style={{
                    padding: '0.375rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: isActive ? 'var(--color-surface-container-lowest)' : 'transparent',
                    color: isActive ? 'var(--color-primary-container)' : 'var(--color-on-surface-variant)',
                    fontWeight: isActive ? '600' : '500',
                    boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                    border: isActive ? '1px solid rgba(0, 82, 155, 0.2)' : '1px solid transparent',
                    transition: 'all 300ms ease'
                  }}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Bento Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--gutter-lg)',
            marginBottom: '2.5rem',
            alignItems: 'stretch'
          }}
          className="bento-layout-grid"
        >
          {/* Large Left Vertical Bento Card (spans 7 cols) */}
          {isHeroVisible && (
            <div
              className="card-motion group"
              onClick={() => {
                if (onOpenDetailModal) {
                  onOpenDetailModal({
                    title: heroProject.title,
                    category: heroProject.categoryLabel,
                    description: heroProject.desc,
                    specs: heroProject.specs,
                    image: heroProject.img
                  });
                }
              }}
              style={{
                backgroundColor: '#0A2540',
                borderRadius: 'var(--radius-3xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '420px', overflow: 'hidden' }}>
                <img
                  src={heroProject.img}
                  alt={heroProject.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 700ms ease-out' }}
                  className="group-hover:scale-105"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0A2540 0%, rgba(10, 37, 64, 0.3) 60%, transparent 100%)' }} />
                <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    className="font-label-mono-sm"
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: '#ED1C24',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {heroProject.categoryLabel}
                  </span>
                  <span
                    className="font-label-mono-sm"
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(8px)',
                      color: '#ffffff',
                      fontSize: '11px'
                    }}
                  >
                    {heroProject.year}
                  </span>
                </div>

                <div
                  className="font-label-mono-sm"
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'rgba(10, 37, 64, 0.8)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    color: '#ffffff',
                    fontSize: '11px'
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#7AC142' }}>schedule</span>
                  <span>{heroProject.duration}</span>
                </div>
              </div>

              <div style={{ padding: '2rem', color: 'var(--color-surface-container-lowest)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
                  <h3 className="font-headline-md" style={{ fontWeight: '700', color: 'var(--color-surface-container-lowest)' }}>
                    {heroProject.title}
                  </h3>
                  <div
                    style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-primary-container)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-on-primary)',
                      flexShrink: 0,
                      boxShadow: 'var(--shadow-md)',
                      transition: 'all 300ms ease'
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>north_east</span>
                  </div>
                </div>

                <p className="font-body-md" style={{ color: 'var(--color-outline-variant)', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '36rem' }}>
                  {heroProject.desc}
                </p>

                <div
                  className="font-label-mono-sm"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--color-secondary-fixed)'
                  }}
                >
                  <span>Optics: Cooke Anamorphic /i</span>
                  <span>•</span>
                  <span>Sensor: RED V-Raptor 8K VV</span>
                  <span>•</span>
                  <span>Color: DaVinci ACES</span>
                </div>
              </div>
            </div>
          )}

          {/* 4 Medium Bento Cards in 2x2 grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem'
            }}
          >
            {mediumBento
              .filter((item) => filterMatches(item.category))
              .map((item) => (
                <div
                  key={item.title}
                  className="card-motion group"
                  onClick={() => {
                    if (onOpenDetailModal) {
                      onOpenDetailModal({
                        title: item.title,
                        category: `${item.categoryLabel} (${item.year})`,
                        description: item.desc,
                        specs: item.specs,
                        image: item.img
                      });
                    }
                  }}
                  style={{
                    backgroundColor: 'var(--color-surface-container-lowest)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-3xl)',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid rgba(194, 198, 211, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <div style={{ width: '100%', height: '9rem', borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: '1rem', position: 'relative' }}>
                      <img
                        src={item.img}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 500ms ease-out' }}
                        className="group-hover:scale-108"
                      />
                      <span
                        className="font-label-mono-sm"
                        style={{
                          position: 'absolute',
                          top: '0.5rem',
                          left: '0.5rem',
                          padding: '0.125rem 0.5rem',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          color: 'var(--color-on-surface)',
                          fontWeight: '600',
                          fontSize: '10px'
                        }}
                      >
                        {item.year}
                      </span>
                    </div>

                    <span className="font-label-mono-sm" style={{ fontSize: '10px', color: 'var(--color-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.25rem' }}>
                      {item.categoryLabel}
                    </span>
                    <h4 className="font-headline-sm" style={{ fontSize: '17px', fontWeight: '700', color: 'var(--color-on-surface)', marginBottom: '0.5rem' }}>
                      {item.title}
                    </h4>
                    <p className="font-body-sm" style={{ color: 'var(--color-on-surface-variant)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.desc}
                    </p>
                  </div>

                  <div style={{ marginTop: '1rem', paddingTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--color-primary-container)' }}>
                    <span className="font-label-mono-sm" style={{ fontWeight: '600' }}>Explore</span>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* 3-Column Clean Card Showcase underneath */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--gutter-lg)',
            marginBottom: '2.5rem'
          }}
        >
          {showcaseRow
            .filter((item) => filterMatches(item.category))
            .map((item) => (
              <div
                key={item.title}
                className="card-motion group"
                onClick={() => {
                  if (onOpenDetailModal) {
                    onOpenDetailModal({
                      title: item.title,
                      category: item.badge,
                      description: item.desc,
                      specs: item.specs
                    });
                  }
                }}
                style={{
                  backgroundColor: 'var(--color-surface-container-lowest)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-3xl)',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid rgba(194, 198, 211, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span
                      className="font-label-mono-sm"
                      style={{
                        padding: '0.25rem 0.625rem',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: 'rgba(237, 28, 36, 0.1)',
                        color: '#ED1C24',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {item.badge}
                    </span>
                    <span className="font-label-mono-sm" style={{ color: 'var(--color-secondary)' }}>
                      {item.sub}
                    </span>
                  </div>
                  <h4 className="font-headline-sm" style={{ color: 'var(--color-on-surface)', fontWeight: '700', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h4>
                  <p className="font-body-sm" style={{ color: 'var(--color-on-surface-variant)', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {item.desc}
                  </p>
                </div>

                <div
                  className="font-label-mono-sm"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    color: 'var(--color-primary-container)',
                    fontWeight: '600',
                    paddingTop: '1rem'
                  }}
                >
                  <span>View Project</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                </div>
              </div>
            ))}
        </div>

        {/* Work Detail Interactive Technical Specifications Bar */}
        <div
          className="card-motion specs-bar"
          style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-3xl)',
            backgroundColor: 'var(--color-surface-container-lowest)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid rgba(194, 198, 211, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--color-primary-container)',
                color: 'var(--color-on-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>tune</span>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#7AC142' }}></span>
                <span className="font-headline-sm" style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-on-surface)' }}>
                  Production & Studio Standards
                </span>
              </div>
              <p className="font-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                Every work executed to cinema-grade studio hardware specifications and Academy Color Encoding standards.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }} className="font-label-mono-sm">
            <div style={{ padding: '0.375rem 0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface-container)', color: 'var(--color-on-surface)' }}>
              <span style={{ color: 'var(--color-secondary)' }}>Camera:</span> RED V-Raptor 8K VV
            </div>
            <div style={{ padding: '0.375rem 0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface-container)', color: 'var(--color-on-surface)' }}>
              <span style={{ color: 'var(--color-secondary)' }}>Lens:</span> Cooke Anamorphic /i Full Frame
            </div>
            <div style={{ padding: '0.375rem 0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface-container)', color: 'var(--color-on-surface)' }}>
              <span style={{ color: 'var(--color-secondary)' }}>Color:</span> DaVinci Resolve Studio 19
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .gallery-header-row {
            flex-direction: row !important;
            align-items: flex-end !important;
          }
          .specs-bar {
            flex-direction: row !important;
            align-items: center !important;
          }
        }
        @media (min-width: 1024px) {
          .bento-layout-grid {
            grid-template-columns: 7fr 5fr !important;
          }
        }
      `}</style>
    </section>
  );
}
