import React from 'react';

/**
 * Tag / Badge monospaced untuk nomor frame (F01), kategori karya, atau status
 * @param {'default' | 'photo' | 'video' | 'design' | 'copy' | 'accent'} tone
 */
export function Tag({ children, tone = 'default', className = '' }) {
  const toneMap = {
    default: {
      bg: 'var(--bg-secondary)',
      text: 'var(--text-secondary)',
      border: 'var(--border-subtle)'
    },
    accent: {
      bg: 'var(--accent-highlight-soft)',
      text: 'var(--accent-highlight)',
      border: 'transparent'
    },
    photo: {
      bg: 'var(--badge-photo-bg)',
      text: 'var(--badge-photo)',
      border: 'transparent'
    },
    video: {
      bg: 'var(--badge-video-bg)',
      text: 'var(--badge-video)',
      border: 'transparent'
    },
    design: {
      bg: 'var(--badge-design-bg)',
      text: 'var(--badge-design)',
      border: 'transparent'
    },
    copy: {
      bg: 'var(--badge-copy-bg)',
      text: 'var(--badge-copy)',
      border: 'transparent'
    }
  };

  const current = toneMap[tone] || toneMap.default;

  return (
    <span
      className={`ui-tag ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.2rem 0.55rem',
        fontSize: 'var(--text-xs)',
        fontFamily: 'var(--font-mono)',
        fontWeight: '600',
        letterSpacing: '0.04em',
        borderRadius: 'var(--radius-sm)',
        backgroundColor: current.bg,
        color: current.text,
        border: `1px solid ${current.border}`,
        lineHeight: 1.2
      }}
    >
      {children}
    </span>
  );
}
