import React from 'react';

/**
 * Tag / Badge monospaced untuk nomor frame (F01), kategori karya, atau status
 * @param {'default' | 'photo' | 'video' | 'design' | 'copy' | 'accent'} tone
 */
export function Tag({ children, tone = 'default', className = '' }) {
  const toneMap = {
    default: {
      bg: 'var(--color-surface-container)',
      text: 'var(--color-on-surface-variant)',
      border: 'rgba(194, 198, 211, 0.4)'
    },
    accent: {
      bg: 'var(--color-primary-fixed)',
      text: 'var(--color-primary)',
      border: 'rgba(0, 82, 155, 0.2)'
    },
    photo: {
      bg: 'var(--badge-photo-bg)',
      text: 'var(--badge-photo)',
      border: 'rgba(0, 59, 114, 0.15)'
    },
    video: {
      bg: 'var(--badge-video-bg)',
      text: 'var(--badge-video)',
      border: 'rgba(147, 0, 13, 0.15)'
    },
    design: {
      bg: 'var(--badge-design-bg)',
      text: 'var(--badge-design)',
      border: 'rgba(0, 28, 55, 0.15)'
    },
    copy: {
      bg: 'var(--badge-copy-bg)',
      text: 'var(--badge-copy)',
      border: 'rgba(122, 193, 66, 0.35)'
    }
  };

  const current = toneMap[tone] || toneMap.default;

  return (
    <span
      className={`ui-tag font-label-mono-sm ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.2rem 0.65rem',
        fontSize: '11px',
        fontFamily: 'var(--font-mono)',
        fontWeight: '600',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        borderRadius: 'var(--radius-full)',
        backgroundColor: current.bg,
        color: current.text,
        border: `1px solid ${current.border}`,
        lineHeight: 1.25
      }}
    >
      {children}
    </span>
  );
}
