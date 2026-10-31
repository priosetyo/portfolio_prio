import React, { useState } from 'react';
import { Lock, Mail, AlertCircle, ArrowLeft, ShieldCheck, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export function LoginForm({ onLogin, onBackToSite }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMsg('Mohon isi alamat surel dan kata sandi.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await onLogin(email.trim(), password);
      if (res?.error) {
        let msg = res.error.message || 'Login gagal. Periksa kembali email dan kata sandi.';
        if (msg === 'Invalid login credentials') {
          msg = 'Email atau kata sandi tidak cocok. Mohon periksa kembali.';
        } else if (msg.includes('Email not confirmed')) {
          msg = 'Alamat email belum dikonfirmasi di Supabase Auth.';
        }
        setErrorMsg(msg);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem saat menghubungi Supabase Auth.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-md)',
        backgroundColor: '#071320',
        overflow: 'hidden',
        fontFamily: 'var(--font-body)'
      }}
    >
      {/* Stitch Ambient Architectural Lighting Scrims */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.55,
          backgroundImage:
            'radial-gradient(circle at 20% 25%, rgba(0, 82, 155, 0.5), transparent 60%), radial-gradient(circle at 85% 75%, rgba(168, 0, 16, 0.3), transparent 55%)',
          zIndex: 0
        }}
      />

      {/* Precision 4rem Architectural Grid Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.18,
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          zIndex: 0
        }}
      />

      {/* Login Card (Stitch Enterprise Surface) */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '450px',
          padding: '2.5rem',
          borderRadius: 'var(--radius-3xl)',
          backgroundColor: 'var(--color-surface-lowest)',
          border: '1px solid rgba(194, 198, 211, 0.35)',
          boxShadow: 'var(--shadow-2xl)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        {/* Top Bar: Return to public site & Status Pill */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            type="button"
            onClick={onBackToSite}
            className="font-label-mono-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: '600',
              color: 'var(--color-on-surface-variant)',
              backgroundColor: 'var(--color-surface-container)',
              border: '1px solid rgba(194, 198, 211, 0.4)',
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              transition: 'all 200ms ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.backgroundColor = 'var(--color-primary-container)';
              e.currentTarget.style.borderColor = 'var(--color-primary-container)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-on-surface-variant)';
              e.currentTarget.style.backgroundColor = 'var(--color-surface-container)';
              e.currentTarget.style.borderColor = 'rgba(194, 198, 211, 0.4)';
            }}
          >
            <ArrowLeft size={13} />
            <span>Ke Portofolio</span>
          </button>

          <div
            className="font-label-mono-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '10px',
              fontWeight: '700',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              backgroundColor: 'var(--color-secondary-container)',
              padding: '0.3rem 0.75rem',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <span
              className="beacon-ping"
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#7AC142',
                display: 'inline-block'
              }}
            />
            <ShieldCheck size={12} />
            <span>Atelier CMS</span>
          </div>
        </div>

        {/* Brand Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            className="font-label-mono-lg"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--color-primary-container)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '18px',
              boxShadow: 'var(--shadow-md)',
              marginBottom: '0.85rem'
            }}
          >
            PS
          </div>

          <span
            className="font-label-mono-sm"
            style={{
              color: 'var(--color-primary-container)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: '600',
              marginBottom: '0.25rem'
            }}
          >
            ENTERPRISE STUDIO SYSTEM
          </span>

          <h1
            className="font-headline-md"
            style={{
              fontSize: '26px',
              fontWeight: '800',
              letterSpacing: '-0.025em',
              color: 'var(--color-on-surface)',
              margin: 0
            }}
          >
            Admin Portal
          </h1>
          <p
            className="font-body-sm"
            style={{
              color: 'var(--color-on-surface-variant)',
              marginTop: '6px',
              lineHeight: 1.55,
              maxWidth: '330px'
            }}
          >
            Silakan masukkan kredensial administrator Anda untuk mengelola arsitektur portofolio.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-tertiary-fixed)',
              border: '1px solid rgba(168, 0, 16, 0.25)',
              color: 'var(--color-tertiary)',
              fontSize: '12px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0, color: '#ED1C24' }} />
            <span style={{ lineHeight: 1.4 }}>{errorMsg}</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label
              className="font-label-mono-sm"
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: '700',
                color: 'var(--color-secondary)',
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              Email Administrator
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={16}
                color="var(--color-secondary)"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@domain.com"
                required
                autoComplete="email"
                style={{
                  width: '100%',
                  padding: '0.8rem 0.9rem 0.8rem 2.5rem',
                  fontSize: '13px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(194, 198, 211, 0.6)',
                  backgroundColor: 'var(--color-surface-low)',
                  color: 'var(--color-on-surface)',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-primary-container)';
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 82, 155, 0.12)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(194, 198, 211, 0.6)';
                  e.target.style.backgroundColor = 'var(--color-surface-low)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          <div>
            <label
              className="font-label-mono-sm"
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: '700',
                color: 'var(--color-secondary)',
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              Kata Sandi
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                color="var(--color-secondary)"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '0.8rem 2.5rem 0.8rem 2.5rem',
                  fontSize: '13px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(194, 198, 211, 0.6)',
                  backgroundColor: 'var(--color-surface-low)',
                  color: 'var(--color-on-surface)',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-primary-container)';
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 82, 155, 0.12)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(194, 198, 211, 0.6)';
                  e.target.style.backgroundColor = 'var(--color-surface-low)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px'
                }}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="font-label-mono-sm"
            style={{
              width: '100%',
              marginTop: '8px',
              padding: '0.9rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary-container)',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.75 : 1,
              transition: 'all 250ms ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: 'var(--shadow-lg)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-container)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }
            }}
          >
            <Lock size={14} />
            <span>{loading ? 'Memverifikasi Kredensial...' : 'Masuk ke Admin Portal'}</span>
          </button>
        </form>

        {/* Security badge footer */}
        <div
          className="font-label-mono-sm"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '11px',
            color: 'var(--color-secondary)',
            paddingTop: '0.25rem',
            borderTop: '1px solid rgba(194, 198, 211, 0.25)'
          }}
        >
          <CheckCircle2 size={14} color="#7AC142" />
          <span>ISO 27001 Aligned • Terlindungi Supabase Auth</span>
        </div>
      </div>
    </div>
  );
}
