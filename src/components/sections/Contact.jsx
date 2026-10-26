import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { FileDown } from 'lucide-react';

export function Contact({ settings, loading }) {
  const email = settings?.email || 'prio@setyostudio.com';
  const phone = settings?.phone || '+62 812-3456-7890';
  const linkedin = settings?.linkedin || 'priosetyo';
  const cvPath = settings?.cv_path;

  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, key) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2200);
      }).catch(() => fallbackCopy(text, key));
    } else {
      fallbackCopy(text, key);
    }
  };

  const fallbackCopy = (text, key) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    } catch (err) {
      console.error('Copy fallback failed', err);
    }
    textArea.remove();
  };

  // CV public URL
  let cvUrl = null;
  if (cvPath) {
    if (cvPath.startsWith('http')) {
      cvUrl = cvPath;
    } else {
      const { data } = supabase.storage.from('portfolio-media').getPublicUrl(cvPath);
      cvUrl = data?.publicUrl;
    }
  }

  return (
    <section
      id="kontak"
      style={{
        width: '100%',
        backgroundColor: 'var(--color-surface)',
        paddingTop: 'var(--space-3xl)',
        paddingBottom: 'var(--space-3xl)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Atmospheric Under-Glow Reflector */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '350px',
          background: 'radial-gradient(ellipse at bottom, rgba(255, 87, 26, 0.22) 0%, transparent 70%)',
          filter: 'blur(160px)',
          pointerEvents: 'none',
          borderTopLeftRadius: '9999px',
          borderTopRightRadius: '9999px'
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          maxWidth: '56rem',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'var(--space-2xl)'
        }}
      >
        {/* Headline Block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-md)',
            maxWidth: '48rem'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: 'var(--color-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.3em'
            }}
          >
            Inisiasi Kerja Sama
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
              fontWeight: '800',
              color: 'var(--color-on-surface)',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              margin: 0
            }}
          >
            Mari Ciptakan Sesuatu yang Luar Biasa.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              color: 'var(--color-on-surface-variant)',
              maxWidth: '38rem',
              lineHeight: 1.6,
              margin: '0 auto'
            }}
          >
            Terbuka untuk konsultasi visi kreatif, perancangan identitas baru, atau kolaborasi strategis jangka panjang di seluruh dunia.
          </p>
        </div>

        {/* 3 CopyField Interactive Cards */}
        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--gutter)',
            paddingTop: 'var(--space-md)'
          }}
        >
          {/* Card 1: Email */}
          <div
            className="stitch-contact-card group"
            style={{
              padding: 'var(--space-lg)',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--color-surface-container)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-md)',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid rgba(230, 190, 178, 0.08)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-surface-highest)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                transition: 'transform var(--transition-fast)'
              }}
              className="contact-icon-box"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                mail
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  color: 'var(--color-outline)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: '600'
                }}
              >
                Surel Resmi
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: 'var(--color-on-surface)',
                  userSelect: 'all',
                  marginTop: '0.2rem'
                }}
              >
                {email}
              </span>
            </div>

            <button
              onClick={() => copyToClipboard(email, 'email')}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: copiedKey === 'email' ? 'var(--color-primary-container)' : 'var(--color-surface-highest)',
                color: copiedKey === 'email' ? 'var(--color-on-primary-container)' : 'var(--color-on-surface)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-xs)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                content_copy
              </span>
              <span>{copiedKey === 'email' ? 'Tersalin!' : 'Salin Email'}</span>
            </button>
          </div>

          {/* Card 2: WhatsApp */}
          <div
            className="stitch-contact-card group"
            style={{
              padding: 'var(--space-lg)',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--color-surface-container)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-md)',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid rgba(230, 190, 178, 0.08)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-surface-highest)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-secondary-container)',
                transition: 'transform var(--transition-fast)'
              }}
              className="contact-icon-box"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                chat
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  color: 'var(--color-outline)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: '600'
                }}
              >
                WhatsApp Bisnis
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: 'var(--color-on-surface)',
                  userSelect: 'all',
                  marginTop: '0.2rem'
                }}
              >
                {phone}
              </span>
            </div>

            <button
              onClick={() => copyToClipboard(phone.replace(/\s+/g, ''), 'phone')}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: copiedKey === 'phone' ? 'var(--color-primary-container)' : 'var(--color-surface-highest)',
                color: copiedKey === 'phone' ? 'var(--color-on-primary-container)' : 'var(--color-on-surface)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-xs)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                content_copy
              </span>
              <span>{copiedKey === 'phone' ? 'Tersalin!' : 'Salin Nomor'}</span>
            </button>
          </div>

          {/* Card 3: LinkedIn */}
          <div
            className="stitch-contact-card group"
            style={{
              padding: 'var(--space-lg)',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--color-surface-container)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-md)',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid rgba(230, 190, 178, 0.08)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-surface-highest)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                transition: 'transform var(--transition-fast)'
              }}
              className="contact-icon-box"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                share
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  color: 'var(--color-outline)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: '600'
                }}
              >
                LinkedIn Profil
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: 'var(--color-on-surface)',
                  userSelect: 'all',
                  marginTop: '0.2rem'
                }}
              >
                {linkedin}
              </span>
            </div>

            <button
              onClick={() => copyToClipboard(`https://linkedin.com/in/${linkedin.replace(/^https?:\/\/.*linkedin\.com\/in\//, '')}`, 'linkedin')}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: copiedKey === 'linkedin' ? 'var(--color-primary-container)' : 'var(--color-surface-highest)',
                color: copiedKey === 'linkedin' ? 'var(--color-on-primary-container)' : 'var(--color-on-surface)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-xs)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                content_copy
              </span>
              <span>{copiedKey === 'linkedin' ? 'Tersalin!' : 'Salin Profil'}</span>
            </button>
          </div>
        </div>

        {/* Primary Big Action Capsule Button */}
        <div style={{ paddingTop: 'var(--space-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-md)' }}>
          <a
            href={`mailto:${email}?subject=Inquiry%20Konsultasi%20Kreatif%202025`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-md)',
              padding: '1rem 3rem',
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(to right, var(--color-primary-container), var(--color-secondary-container), var(--color-secondary))',
              color: 'var(--color-on-primary-container)',
              fontFamily: 'var(--font-display)',
              fontSize: '1.125rem',
              fontWeight: '700',
              boxShadow: 'var(--shadow-glow-lg)',
              transition: 'all var(--transition-fast)',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
              calendar_today
            </span>
            <span>Jadwalkan Konsultasi 1-on-1 (30 Menit)</span>
          </a>

          {/* Optional CV PDF button if uploaded */}
          {cvUrl && (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                fontSize: '0.875rem',
                color: 'var(--color-outline)',
                textDecoration: 'underline'
              }}
            >
              <FileDown size={15} />
              <span>Unduh Resume / CV (PDF)</span>
            </a>
          )}
        </div>
      </div>

      <style>{`
        .stitch-contact-card:hover {
          background-color: var(--color-surface-high) !important;
        }
        .stitch-contact-card:hover .contact-icon-box {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
}
