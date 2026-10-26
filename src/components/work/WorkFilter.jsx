import React from 'react';

export const CATEGORIES = [
  { key: 'all', label: 'Semua Karya' },
  { key: 'fotografi', label: 'Fotografi' },
  { key: 'videografi', label: 'Videografi' },
  { key: 'desain', label: 'Desain' },
  { key: 'copywriting', label: 'Copywriting' }
];

export function WorkFilter({ activeCategory, onSelectCategory }) {
  return (
    <div
      role="tablist"
      aria-label="Filter kategori karya"
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '8px',
        padding: '4px',
        borderRadius: '9999px',
        backgroundColor: 'var(--color-surface-container-low)'
      }}
    >
      {CATEGORIES.map((cat) => {
        const isActive =
          activeCategory === cat.key ||
          (activeCategory === 'all' && cat.key === 'all') ||
          (activeCategory === 'photo' && cat.key === 'fotografi') ||
          (activeCategory === 'video' && cat.key === 'videografi') ||
          (activeCategory === 'design' && cat.key === 'desain') ||
          (activeCategory === 'copy' && cat.key === 'copywriting');

        return (
          <button
            key={cat.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(cat.key)}
            style={{
              padding: '0.375rem 1.25rem',
              borderRadius: '9999px',
              backgroundColor: isActive ? '#000000' : 'transparent',
              color: isActive ? '#ffffff' : 'var(--color-on-surface-variant)',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: isActive ? '600' : '500',
              border: 'none',
              cursor: 'pointer',
              boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
              transition: 'all 150ms ease'
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = 'var(--color-on-surface)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = 'var(--color-on-surface-variant)';
              }
            }}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
