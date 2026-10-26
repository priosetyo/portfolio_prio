import React from 'react';
import { Copy, Check } from 'lucide-react';
import { useCopy } from '../../hooks/useCopy';

/**
 * Baris kontak dengan tombol salin interaktif dan seleksi teks
 */
export function CopyField({ label, value, href, icon: Icon, className = '' }) {
  const { copied, copy } = useCopy();

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    copy(value);
  };

  return (
    <div
      className={`ui-copy-field ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-4) var(--space-5)',
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        transition: 'all var(--transition-fast)',
        gap: 'var(--space-3)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', minWidth: 0 }}>
        {Icon && (
          <div
            style={{
              color: 'var(--accent-highlight)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Icon size={20} />
          </div>
        )}
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: '600'
            }}
          >
            {label}
          </div>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                color: 'var(--text-primary)',
                wordBreak: 'break-all',
                textDecoration: 'none'
              }}
            >
              {value}
            </a>
          ) : (
            <span
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                color: 'var(--text-primary)',
                wordBreak: 'break-all'
              }}
            >
              {value}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Salin ${label}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.4rem 0.75rem',
          fontSize: 'var(--text-xs)',
          fontWeight: '600',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: copied ? 'var(--badge-copy-bg)' : 'var(--bg-elevated)',
          color: copied ? 'var(--badge-copy)' : 'var(--text-secondary)',
          border: '1px solid var(--border-subtle)',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'all var(--transition-fast)'
        }}
      >
        {copied ? (
          <>
            <Check size={14} />
            <span>Tersalin!</span>
          </>
        ) : (
          <>
            <Copy size={14} />
            <span>Salin</span>
          </>
        )}
      </button>
    </div>
  );
}
