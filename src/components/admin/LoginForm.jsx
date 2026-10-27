import React, { useState } from 'react';
import { Lock, Mail, AlertCircle, ArrowLeft, ShieldCheck, Eye, EyeOff, Zap, CheckCircle2 } from 'lucide-react';

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
          maxWidth: '440px',
          padding: '2.5rem',
          borderRadius: '1.5rem',
          backgroundColor: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.08)',
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
            <span>Admin Portal</span>
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
              fontSize: '24px',
              fontWeight: '800',
              letterSpacing: '-0.02em',
              color: '#000000',
              margin: 0
            }}
          >
            Admin Portal
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-on-surface-variant)',
              marginTop: '6px',
              lineHeight: 1.5,
              maxWidth: '320px'
            }}
          >
            Silakan masukkan kredensial administrator Anda untuk mengelola portofolio.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#b91c1c',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span style={{ lineHeight: 1.4 }}>{errorMsg}</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: '700',
                color: 'var(--color-on-surface-variant)',
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
                color="var(--color-outline)"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
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
                  padding: '0.75rem 0.85rem 0.75rem 2.4rem',
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
                color="var(--color-outline)"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
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
                  padding: '0.75rem 2.4rem 0.75rem 2.4rem',
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
              marginTop: '8px',
              padding: '0.85rem 1.25rem',
              borderRadius: '0.75rem',
              backgroundColor: '#000000',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '700',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.75 : 1,
              transition: 'all 150ms ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#262629';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#000000';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            <Lock size={14} />
            <span>{loading ? 'Memverifikasi Kredensial...' : 'Masuk ke Admin Portal'}</span>
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
