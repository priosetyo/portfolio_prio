import React, { useEffect } from 'react';
import { X, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const HELVETICA_STACK = "'Helvetica Neue', Helvetica, Arial, sans-serif";

export function WorkDetailModal({ isOpen, onClose, data }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  const {
    title = 'Project Detail',
    category = 'Case Study',
    description = '',
    specs = [],
    tags = [],
    image = '',
    link = ''
  } = data;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundColor: 'rgba(7, 19, 32, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        fontFamily: HELVETICA_STACK,
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          backgroundColor: '#071320',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          overflowY: 'auto',
          boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 82, 155, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          fontFamily: HELVETICA_STACK
        }}
      >
        {/* Modal Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: '#0A2540'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{
                fontFamily: HELVETICA_STACK,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#7AC142',
                backgroundColor: 'rgba(122, 193, 66, 0.12)',
                padding: '4px 10px',
                borderRadius: '4px',
                border: '1px solid rgba(122, 193, 66, 0.25)',
                fontWeight: 700
              }}
            >
              {category}
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: 'rgba(255, 255, 255, 0.45)',
                fontSize: '0.75rem',
                fontFamily: HELVETICA_STACK,
                fontWeight: 500,
                letterSpacing: '0.06em'
              }}
            >
              <ShieldCheck size={14} color="#7AC142" />
              <span>VERIFIED DIRECTIVE</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Dialog"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(237, 28, 36, 0.2)';
              e.currentTarget.style.borderColor = '#ED1C24';
              e.currentTarget.style.color = '#ED1C24';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.color = '#ffffff';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Image if provided */}
        {image && (
          <div style={{ width: '100%', height: '240px', overflow: 'hidden', position: 'relative' }}>
            <img
              src={image}
              alt={title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, #071320 0%, transparent 60%)'
              }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div
          style={{
            padding: '2rem 1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            fontFamily: HELVETICA_STACK
          }}
        >
          <div>
            <h3
              id="modal-title"
              style={{
                fontFamily: HELVETICA_STACK,
                fontSize: '1.75rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                marginBottom: '0.75rem',
                lineHeight: 1.2
              }}
            >
              {title}
            </h3>
            <p
              id="modal-description"
              style={{
                fontFamily: HELVETICA_STACK,
                fontSize: '0.975rem',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.7,
                whiteSpace: 'pre-line',
                margin: 0
              }}
            >
              {description}
            </p>
          </div>

          {/* Technical Specs List */}
          {specs && specs.length > 0 && (
            <div
              id="modal-specs"
              style={{
                backgroundColor: '#0A2540',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                padding: '1.25rem'
              }}
            >
              <h4
                style={{
                  fontFamily: HELVETICA_STACK,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'rgba(255, 255, 255, 0.55)',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: 0
                }}
              >
                <Zap size={14} color="#7AC142" /> Execution Specs & Tools
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '0.75rem'
                }}
              >
                {specs.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      fontFamily: HELVETICA_STACK,
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.85)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span style={{ color: '#7AC142' }}>▸</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontFamily: HELVETICA_STACK,
                    fontSize: '0.75rem',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}
                >
                  #{String(tag).replace(/^#/, '')}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: '#0A2540',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
            fontFamily: HELVETICA_STACK
          }}
        >
          <div
            style={{
              fontFamily: HELVETICA_STACK,
              fontSize: '0.75rem',
              letterSpacing: '0.06em',
              color: 'rgba(255, 255, 255, 0.45)'
            }}
          >
            PRIO SETYO DESIGN ENTERPRISE • CONFIDENTIAL ARCHIVE
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                fontFamily: HELVETICA_STACK,
                padding: '0.6rem 1.25rem',
                fontSize: '0.825rem',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.8)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
              }}
            >
              Close
            </button>

            <a
              href={link || '#contact'}
              target={link ? '_blank' : undefined}
              rel={link ? 'noopener noreferrer' : undefined}
              onClick={link ? undefined : onClose}
              style={{
                fontFamily: HELVETICA_STACK,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.6rem 1.25rem',
                fontSize: '0.825rem',
                fontWeight: 600,
                color: '#ffffff',
                backgroundColor: '#00529B',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#003d75';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#00529B';
              }}
            >
              Discuss Similar Project <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
