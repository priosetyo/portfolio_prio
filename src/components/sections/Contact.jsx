import React, { useState } from 'react';

export function Contact({ settings }) {
  const [copiedType, setCopiedType] = useState(null);

  const email = settings?.email || 'contact@prioworks.my.id';
  const phone = settings?.phone || '+62 811-9820-7712';
  const linkedin = settings?.linkedin || 'https://linkedin.com/in/priosetyo';
  const cleanPhone = phone.replace(/[^0-9+]/g, '');

  const copyToClipboard = (text, type) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  return (
    <section
      id="contact"
      style={{
        width: '100%',
        backgroundColor: '#F4F7FA',
        padding: '5rem 0'
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 var(--margin-mobile)'
        }}
      >
        {/* Large Rounded-3xl Dark Card Banner with Photography Overlay */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            borderRadius: 'var(--radius-3xl)',
            backgroundColor: '#071320',
            color: 'var(--color-surface-bright)',
            overflow: 'hidden',
            padding: '3rem 2rem',
            marginBottom: '2.5rem',
            boxShadow: 'var(--shadow-2xl)',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}
          className="contact-hero-banner"
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-ltxDU8TxfjSWHefWdIKKe-IVWKU-6qqCHUuJ8lYZvPen4BZXJn9iiRax7Xnx5_6gVkVr8Z1d6L3IMsv_fHd_tD6PXn0VgHMCbybUXwYeH6opu4biUurhTA6EUD1pqNfTO2fzBxm4xSAQ4b8AKY8SHmEeIjhy8IlfHuLw7tK5h6Z7ulwni1iaI-ovylZ5qAYj_6ufLMMbESynddjKSLzGMuGfuk999Jh0A0jNrvSV')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.25,
            mixBlendMode: 'screen',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #071320 0%, rgba(7, 19, 32, 0.8) 60%, transparent 100%)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '42rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#ED1C24',
              color: 'var(--color-surface-bright)',
              marginBottom: '1rem',
              boxShadow: 'var(--shadow-sm)'
            }}
            className="font-label-mono-sm"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>bolt</span>
            <span>STRATEGIC PROJECT COLLABORATION</span>
          </div>

          <h2
            className="font-headline-lg"
            style={{
              color: 'var(--color-surface-container-lowest)',
              fontWeight: '700',
              letterSpacing: '-0.025em',
              marginBottom: '1rem'
            }}
          >
            Initiate Collaboration
          </h2>

          <p
            className="font-body-lg"
            style={{
              color: 'var(--color-outline-variant)',
              lineHeight: 1.6,
              marginBottom: '2rem'
            }}
          >
            Ready to elevate your visual standards and strategic brand impact to the next frontier? Let's discuss creative briefs, commercial direction, or long-term team advisory.
          </p>

          <a
            href={`mailto:${email}?subject=Project%20Inquiry%202025%20-%20Prio%20Setyo`}
            className="font-label-mono-sm group"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 2rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#00529B',
              color: 'var(--color-surface-container-lowest)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 300ms ease',
              boxShadow: 'var(--shadow-lg)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ED1C24';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-2xl)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#00529B';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
          >
            <span>Schedule 1-on-1 Consultation</span>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>north_east</span>
          </a>
        </div>
      </div>

      {/* 3 Clean White CopyField Cards with Micro-Feedback */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--gutter-lg)'
        }}
      >
        {/* Field 1: Email */}
        <div
          className="card-motion"
          style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-3xl)',
            backgroundColor: 'var(--color-surface-container-lowest)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid rgba(194, 198, 211, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span className="font-label-mono-sm" style={{ color: 'var(--color-secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Official Email
              </span>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary-container)' }}>mail</span>
            </div>
            <p className="font-headline-sm" style={{ fontSize: '17px', fontWeight: '700', color: 'var(--color-on-surface)', wordBreak: 'break-all', marginBottom: '0.25rem' }}>
              {email}
            </p>
            <p className="font-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
              Formal response within 1x24 business hours.
            </p>
          </div>

          <button
            type="button"
            onClick={() => copyToClipboard(email, 'email')}
            className="font-label-mono-sm"
            style={{
              marginTop: '1.5rem',
              width: '100%',
              padding: '0.625rem 1rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: copiedType === 'email' ? 'rgba(122, 193, 66, 0.1)' : 'var(--color-surface-container)',
              border: copiedType === 'email' ? '1px solid rgba(122, 193, 66, 0.4)' : '1px solid transparent',
              color: copiedType === 'email' ? '#7AC142' : 'var(--color-on-surface)',
              fontWeight: '600',
              transition: 'all 300ms ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: copiedType === 'email' ? '#7AC142' : 'inherit' }}>
              {copiedType === 'email' ? 'check_circle' : 'content_copy'}
            </span>
            <span>{copiedType === 'email' ? 'Copied! ✓' : 'Copy Email'}</span>
          </button>
        </div>

        {/* Field 2: WhatsApp */}
        <div
          className="card-motion"
          style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-3xl)',
            backgroundColor: 'var(--color-surface-container-lowest)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid rgba(194, 198, 211, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span className="font-label-mono-sm" style={{ color: 'var(--color-secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Business WhatsApp
              </span>
              <span className="material-symbols-outlined" style={{ color: '#7AC142' }}>chat</span>
            </div>
            <p className="font-headline-sm" style={{ fontSize: '17px', fontWeight: '700', color: 'var(--color-on-surface)', marginBottom: '0.25rem' }}>
              {phone}
            </p>
            <p className="font-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
              Direct executive & curatorial coordination.
            </p>
          </div>

          <button
            type="button"
            onClick={() => copyToClipboard(cleanPhone, 'phone')}
            className="font-label-mono-sm"
            style={{
              marginTop: '1.5rem',
              width: '100%',
              padding: '0.625rem 1rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: copiedType === 'phone' ? 'rgba(122, 193, 66, 0.1)' : 'var(--color-surface-container)',
              border: copiedType === 'phone' ? '1px solid rgba(122, 193, 66, 0.4)' : '1px solid transparent',
              color: copiedType === 'phone' ? '#7AC142' : 'var(--color-on-surface)',
              fontWeight: '600',
              transition: 'all 300ms ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: copiedType === 'phone' ? '#7AC142' : 'inherit' }}>
              {copiedType === 'phone' ? 'check_circle' : 'content_copy'}
            </span>
            <span>{copiedType === 'phone' ? 'Copied! ✓' : 'Copy Number'}</span>
          </button>
        </div>

        {/* Field 3: LinkedIn */}
        <div
          className="card-motion group"
          style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-3xl)',
            backgroundColor: 'var(--color-surface-container-lowest)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid rgba(194, 198, 211, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span className="font-label-mono-sm" style={{ color: 'var(--color-secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                LinkedIn Profile
              </span>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary-container)' }}>link</span>
            </div>
            <p className="font-headline-sm" style={{ fontSize: '17px', fontWeight: '700', color: 'var(--color-on-surface)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '0.25rem' }}>
              {linkedin.replace(/^https?:\/\/(www\.)?/, '')}
            </p>
            <p className="font-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
              Executive networking and publication feed.
            </p>
          </div>

          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label-mono-sm"
            style={{
              marginTop: '1.5rem',
              width: '100%',
              padding: '0.625rem 1rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-surface-container)',
              color: 'var(--color-on-surface)',
              fontWeight: '600',
              transition: 'all 300ms ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-sm)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary-container)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-surface-container)';
              e.currentTarget.style.color = 'var(--color-on-surface)';
            }}
          >
            <span>View Profile</span>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>open_in_new</span>
          </a>
        </div>
      </div>
    </div>

    <style>{`
      @media (min-width: 768px) {
        .contact-hero-banner {
          padding: 4rem !important;
        }
      }
    `}</style>
  </section>
  );
}
