import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getStoragePublicUrl } from '../../lib/queries';

export function WorkTile({ project, onClick }) {
  const {
    title,
    category,
    categoryLabel,
    subCategory,
    locationYear,
    summary,
    client,
    year,
    project_media = []
  } = project;

  const firstMedia = project_media[0] || {};
  const rawImageSrc =
    firstMedia.thumb_path ||
    firstMedia.storage_path ||
    firstMedia.poster_path ||
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBa2KOlfDWEI_usA-OnOjp3a2gg2wYXQ8JqEKgT6dPfKs0QED6iQt-6apVB4u0Y88SYYSTkI7iEjrZyQWCwYncdE22z-HdmNDvCA29vfXKaNbMeKhdAgDI_zksjN4ETeC6oHeuFpLQYS7JZFaP4-fkZxU-IDqj82uUMJeraANVwimVd4jJX_52m0mJjIBk0KrLMGGuBwaGc7eKxh2kaKLD0mC8AbkpXv05T0or4Jlg';
  const imageSrc = getStoragePublicUrl(rawImageSrc);

  const badgeCategory =
    categoryLabel ||
    (category === 'design'
      ? 'SPATIAL SYSTEM'
      : category === 'video'
      ? 'COMMERCIAL FILM'
      : category === 'photo'
      ? 'FINE ART & PHOTO'
      : 'EDITORIAL & COPY');

  const locYearBadge = locationYear || `STUDIO / ${year || 2024}`;
  const subCategoryLabel = subCategory || (category === 'design' ? 'Pavilion Architecture' : category === 'video' ? 'Campaign Direction' : 'Brand Manifesto');

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
      className="project-item group"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-xl)',
        backgroundColor: 'var(--color-surface-container-lowest)',
        padding: 'var(--space-md)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 300ms ease',
        cursor: 'pointer',
        outline: 'none',
        height: '100%',
        justifyContent: 'space-between'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* 4/3 Aspect Media Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4/3',
          borderRadius: '1rem',
          overflow: 'hidden',
          marginBottom: 'var(--space-md)',
          backgroundColor: 'var(--color-surface-container)'
        }}
      >
        <img
          src={imageSrc}
          alt={firstMedia.alt_text || title}
          loading="lazy"
          className="project-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 500ms ease'
          }}
        />

        {/* Top-Left Badge */}
        <div style={{ position: 'absolute', top: 'var(--space-sm)', left: 'var(--space-sm)' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(12px)',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.08em',
              color: 'var(--color-on-surface)'
            }}
          >
            {badgeCategory}
          </span>
        </div>

        {/* Bottom-Right Location & Year Badge */}
        <div style={{ position: 'absolute', bottom: 'var(--space-sm)', right: 'var(--space-sm)' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: '#ffffff',
              fontSize: '10px',
              fontWeight: '700',
              letterSpacing: '0.06em'
            }}
          >
            {locYearBadge}
          </span>
        </div>
      </div>

      {/* Body & Meta */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-secondary)'
            }}
          >
            {subCategoryLabel}
          </span>

          <h3
            className="project-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              lineHeight: '26px',
              letterSpacing: '-0.01em',
              fontWeight: '600',
              color: 'var(--color-on-surface)',
              margin: '2px 0 0 0',
              transition: 'color 150ms ease'
            }}
          >
            {title}
          </h3>

          <p
            style={{
              fontSize: '13px',
              lineHeight: '18px',
              color: 'var(--color-on-surface-variant)',
              marginTop: '4px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {summary}
          </p>
        </div>

        {/* Bottom Bar: Client & Arrow CTA */}
        <div
          style={{
            paddingTop: 'var(--space-md)',
            marginTop: 'var(--space-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(0, 0, 0, 0.04)'
          }}
        >
          <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>
            Client: {client || 'Mono Foundation'}
          </span>

          <div
            className="arrow-circle"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-surface-container-low)',
              color: 'var(--color-on-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 200ms ease'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              arrow_outward
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .project-item:hover .project-img {
          transform: scale(1.05);
        }
        .project-item:hover .project-title {
          color: #000000;
        }
        .project-item:hover .arrow-circle {
          background-color: #000000 !important;
          color: #ffffff !important;
        }
      `}</style>
    </article>
  );
}
