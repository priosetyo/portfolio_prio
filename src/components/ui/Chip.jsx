import React from 'react';

/**
 * Filter Chip dengan hitungan karya
 */
export function Chip({ label, count, pressed = false, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={`ui-chip ${pressed ? 'is-active' : ''} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: '0.45rem 0.95rem',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--text-sm)',
        fontWeight: '500',
        transition: 'all var(--transition-fast)',
        backgroundColor: pressed ? 'var(--accent-primary)' : 'var(--bg-secondary)',
        color: pressed ? 'var(--accent-primary-text)' : 'var(--text-secondary)',
        border: `1px solid ${pressed ? 'transparent' : 'var(--border-subtle)'}`,
        boxShadow: pressed ? 'var(--shadow-sm)' : 'none',
        cursor: 'pointer'
      }}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            opacity: pressed ? 0.9 : 0.65,
            padding: '0.1rem 0.35rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: pressed ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-tertiary)',
            color: pressed ? 'inherit' : 'var(--text-tertiary)',
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}
