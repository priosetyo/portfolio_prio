import React from 'react';

export function WorkTile({ project, onClick }) {
  const { title, category, categoryLabel, summary, year, project_media = [] } = project;

  const firstMedia = project_media[0] || {};
  const imageSrc =
    firstMedia.thumb_path ||
    firstMedia.storage_path ||
    firstMedia.poster_path ||
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80';

  const displayCategory =
    categoryLabel ||
    (category === 'photo'
      ? 'Fotografi & Seni'
      : category === 'video'
      ? 'Videografi & Sinematografi'
      : category === 'design'
      ? 'Desain UI/UX'
      : 'Copywriting & Editorial');

  return (
    <article
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="stitch-project-card group"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-md)',
        cursor: 'pointer',
        outline: 'none'
      }}
    >
      {/* 1. Aspect 16/11 Media Container */}
      <div
        className="stitch-media-container"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/11',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          backgroundColor: 'var(--color-surface-container)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
        }}
      >
        <img
          src={imageSrc}
          alt={firstMedia.alt_text || title}
          loading="lazy"
          className="stitch-card-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />

        {/* Top-Left Category Pill */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            zIndex: 2
          }}
        >
          <span
            style={{
              padding: '0.35rem 1rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(14, 14, 18, 0.82)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(230, 190, 178, 0.1)',
              color: 'var(--color-secondary)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.6875rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}
          >
            {displayCategory}
          </span>
        </div>

        {/* Bottom-Right Floating Hover CTA Button */}
        <div
          className="stitch-card-cta"
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            width: '2.75rem',
            height: '2.75rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-primary-container)',
            color: 'var(--color-on-primary-container)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)',
            opacity: 0,
            transform: 'translateY(8px)',
            transition: 'all 250ms ease',
            zIndex: 3
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            arrow_outward
          </span>
        </div>
      </div>

      {/* 2. Text Info: Title, Year, Summary */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-xs)',
          padding: '0 0.25rem'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-sm)'
          }}
        >
          <h3
            className="stitch-card-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: '700',
              color: 'var(--color-on-surface)',
              transition: 'color var(--transition-fast)',
              margin: 0
            }}
          >
            {title}
          </h3>
          {year && (
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                color: 'var(--color-outline)',
                fontWeight: '500'
              }}
            >
              {year}
            </span>
          )}
        </div>

        {summary && (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              color: 'var(--color-on-surface-variant)',
              lineHeight: 1.5,
              margin: 0
            }}
          >
            {summary}
          </p>
        )}
      </div>

      <style>{`
        .stitch-project-card:hover .stitch-card-img {
          transform: scale(1.05);
        }
        .stitch-project-card:hover .stitch-card-cta {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .stitch-project-card:hover .stitch-card-title {
          color: var(--color-primary) !important;
        }
      `}</style>
    </article>
  );
}
