import React from 'react';

export function FilosofiDialog({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(16px)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '32rem',
          backgroundColor: '#ffffff',
          color: 'var(--color-on-surface)',
          borderRadius: '1.5rem',
          boxShadow: 'var(--shadow-dialog)',
          overflow: 'hidden',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-secondary-fixed-dim)'
              }}
            />
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--color-on-surface)',
                margin: 0
              }}
            >
              Filosofi Desain
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-on-surface-variant)'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              close
            </span>
          </button>
        </div>

        {/* Quote */}
        <p
          style={{
            fontSize: '15px',
            lineHeight: '24px',
            color: 'var(--color-on-surface-variant)',
            margin: 0,
            fontStyle: 'italic'
          }}
        >
          “Desain bukan sekadar ornamen estetika, melainkan peredam friksi antara intensi manusia dan kompleksitas teknologi modern.”
        </p>

        {/* 3 Core Pillars */}
        <div
          style={{
            padding: '1rem',
            borderRadius: '1rem',
            backgroundColor: 'var(--color-surface-container-low)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-secondary)'
            }}
          >
            3 PILAR UTAMA
          </span>

          <ul
            style={{
              fontSize: '13px',
              lineHeight: '20px',
              color: 'var(--color-on-surface)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              paddingLeft: '1.25rem',
              margin: 0
            }}
          >
            <li>
              <strong>Disiplin Struktural:</strong> Menolak kekacauan visual tanpa mengurangi kedalaman ekspresi.
            </li>
            <li>
              <strong>Ketepatan Spasial:</strong> Menyelaraskan tipografi, skala, dan gerak dalam ritme yang harmonis.
            </li>
            <li>
              <strong>Dampak Emosional:</strong> Menciptakan resonansi instan yang bertahan melampaui tren sesaat.
            </li>
          </ul>
        </div>

        {/* Footer Close Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '4px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              backgroundColor: '#000000',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
