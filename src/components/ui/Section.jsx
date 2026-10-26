import React from 'react';

/**
 * Reusable Section wrapper dengan label di atas/kiri dan judul besar
 */
export function Section({
  id,
  label,
  title,
  description,
  children,
  className = '',
  hasContainer = true
}) {
  const content = (
    <section
      id={id}
      className={`ui-section ${className}`}
      style={{
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-16)',
        position: 'relative'
      }}
    >
      <div style={{ marginBottom: 'var(--space-8)' }}>
        {label && (
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--accent-highlight)',
              marginBottom: 'var(--space-2)'
            }}
          >
            {label}
          </div>
        )}
        {title && (
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: '800',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              marginBottom: description ? 'var(--space-3)' : 0
            }}
          >
            {title}
          </h2>
        )}
        {description && (
          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--text-secondary)',
              maxWidth: '650px',
              lineHeight: 1.6
            }}
          >
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );

  if (hasContainer) {
    return <div className="container">{content}</div>;
  }

  return content;
}
