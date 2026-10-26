import React, { useState } from 'react';
import { Lock, Mail, AlertCircle, ArrowLeft, ShieldCheck, Eye, EyeOff, Zap, CheckCircle2 } from 'lucide-react';

export function LoginForm({ onLogin, onBackToSite, onDemoLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Mohon isi alamat surel dan kata sandi.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await onLogin(email, password);
      if (res?.error) {
        setErrorMsg(res.error.message || 'Login gagal. Periksa kembali email dan kata sandi.');
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
        backgroundColor: '#f9f9fb',
        overflow: 'hidden'
      }}
    >
      {/* Background Ambient Pastel Halos */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '540px',
          height: '540px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229, 222, 255, 0.6) 0%, rgba(220, 213, 253, 0.2) 45%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(50px)',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: '360px',
          height: '360px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(195, 236, 215, 0.4) 0%, transparent 65%)',
          pointerEvents: 'none',
          filter: 'blur(45px)',
          zIndex: 0
        }}
      />

      {/* Login Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '460px',
          padding: '2.5rem',
          borderRadius: '1.5rem',
          backgroundColor: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        {/* Top Bar: Return to public site */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            type="button"
            onClick={onBackToSite}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: '600',
              color: 'var(--color-on-surface-variant)',
              backgroundColor: 'var(--color-surface-container-low)',
              border: 'none',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              transition: 'all 150ms ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#000000';
              e.currentTarget.style.backgroundColor = 'var(--color-surface-container)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-on-surface-variant)';
              e.currentTarget.style.backgroundColor = 'var(--color-surface-container-low)';
            }}
          >
            <ArrowLeft size={13} />
            <span>Ke Portofolio</span>
          </button>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '10px',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-on-secondary-fixed)',
              backgroundColor: 'var(--color-secondary-container)',
              padding: '0.25rem 0.65rem',
              borderRadius: '9999px'
            }}
          >
            <ShieldCheck size={12} />
            <span>Studio Portal</span>
          </div>
        </div>

        {/* Brand Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '1rem',
              backgroundColor: '#000000',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontWeight: '800',
              fontSize: '18px',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
              marginBottom: '0.85rem'
            }}
          >
            PS
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '26px',
              fontWeight: '800',
              letterSpacing: '-0.02em',
              color: '#000000',
              margin: 0
            }}
          >
            Atelier CMS
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-on-surface-variant)',
              marginTop: '4px',
              lineHeight: 1.5,
              maxWidth: '320px'
            }}
          >
            Sistem kurasi karya visual, media, dan narasi kreatif Prio Setyo.
          </p>
        </div>

        {/* Demo Fast Access Pill Button */}
        {onDemoLogin && (
          <div
            style={{
              padding: '1rem',
              borderRadius: '1rem',
              backgroundColor: 'var(--color-secondary-fixed)',
              border: '1px solid rgba(95, 90, 124, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    boxShadow: '0 0 8px #10b981'
                  }}
                />
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-on-secondary-fixed)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Akses Pengujian Cepat
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-on-secondary-fixed-variant)' }}>1-Klik Langsung Masuk</span>
            </div>

            <button
              type="button"
              onClick={onDemoLogin}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '0.65rem 1rem',
                borderRadius: '0.75rem',
                backgroundColor: '#000000',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                transition: 'transform 150ms ease, background-color 150ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.backgroundColor = '#1b1b1d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = '#000000';
              }}
            >
              <Zap size={14} fill="#ffffff" />
              <span>Masuk Mode Demo Studio</span>
            </button>
          </div>
        )}

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(0, 0, 0, 0.06)' }} />
          <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            atau via email admin
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(0, 0, 0, 0.06)' }} />
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              backgroundColor: '#ffdad6',
              border: '1px solid #ba1a1a',
              color: '#93000a',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <AlertCircle size={15} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: '700',
                color: 'var(--color-on-surface-variant)',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              Email Administrator
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={16}
                color="var(--color-outline)"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@domain.com"
                required
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                  fontSize: '13px',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--color-surface-container-high)',
                  backgroundColor: 'var(--color-surface-container-low)',
                  color: 'var(--color-on-surface)',
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#000000';
                  e.target.style.backgroundColor = '#ffffff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--color-surface-container-high)';
                  e.target.style.backgroundColor = 'var(--color-surface-container-low)';
                }}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: '700',
                color: 'var(--color-on-surface-variant)',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              Kata Sandi
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                color="var(--color-outline)"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                style={{
                  width: '100%',
                  padding: '0.65rem 2.4rem 0.65rem 2.4rem',
                  fontSize: '13px',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--color-surface-container-high)',
                  backgroundColor: 'var(--color-surface-container-low)',
                  color: 'var(--color-on-surface)',
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#000000';
                  e.target.style.backgroundColor = '#ffffff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--color-surface-container-high)';
                  e.target.style.backgroundColor = 'var(--color-surface-container-low)';
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
                  color: 'var(--color-outline)',
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
            style={{
              width: '100%',
              marginTop: '4px',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              backgroundColor: 'var(--color-surface-container-high)',
              color: 'var(--color-on-surface)',
              fontSize: '12px',
              fontWeight: '700',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 150ms ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#000000';
                e.currentTarget.style.color = '#ffffff';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-container-high)';
                e.currentTarget.style.color = 'var(--color-on-surface)';
              }
            }}
          >
            <Lock size={13} />
            <span>{loading ? 'Memverifikasi...' : 'Masuk dengan Kredensial'}</span>
          </button>
        </form>

        {/* Security badge footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '11px',
            color: 'var(--color-on-surface-variant)'
          }}
        >
          <CheckCircle2 size={13} color="#10b981" />
          <span>Sesi terenkripsi & dilindungi Supabase Auth</span>
        </div>
      </div>
    </div>
  );
}
