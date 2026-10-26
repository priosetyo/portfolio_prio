import React from 'react';

export const CATEGORIES = [
  { key: 'all', label: 'Semua' },
  { key: 'photo', label: 'Fotografi' },
  { key: 'video', label: 'Videografi' },
  { key: 'design', label: 'Desain UI/UX' },
  { key: 'copy', label: 'Copywriting' }
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
        gap: 'var(--space-xs)',
        padding: 'var(--space-xs)',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'rgba(42, 41, 46, 0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(230, 190, 178, 0.08)'
      }}
    >
      {CATEGORIES.map((cat) => {
        const isActive =
          activeCategory === cat.key ||
          (activeCategory === 'desain' && cat.key === 'design') ||
          (activeCategory === 'fotografi' && cat.key === 'photo') ||
          (activeCategory === 'videografi' && cat.key === 'video') ||
          (activeCategory === 'copywriting' && cat.key === 'copy');

        return (
          <button
            key={cat.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(cat.key)}
            style={{
              padding: '0.4rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: isActive ? 'var(--color-primary-container)' : 'transparent',
              color: isActive ? 'var(--color-on-primary-container)' : 'var(--color-on-surface-variant)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: isActive ? '700' : '500',
              boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
              transition: 'all var(--transition-fast)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-container)';
                e.currentTarget.style.color = 'var(--color-on-surface)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = 'transparent';
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
