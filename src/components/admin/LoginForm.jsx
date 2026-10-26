import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Lock, Mail, AlertCircle, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

export function LoginForm({ onLogin, onBackToSite, onDemoLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Mohon isi alamat email dan password.');
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
        backgroundColor: 'var(--bg-primary)'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: 'var(--space-8)',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-dialog)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-6)'
        }}
      >
        {/* Back Link */}
        <div>
          <button
            type="button"
            onClick={onBackToSite}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: 'var(--text-xs)',
              fontWeight: '600',
              color: 'var(--text-secondary)'
            }}
          >
            <ArrowLeft size={14} />
            <span>Kembali ke Portofolio Publik</span>
          </button>
        </div>

        {/* Brand / Logo */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--accent-highlight-soft)',
              color: 'var(--accent-highlight)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--space-3)'
            }}
          >
            <Lock size={24} />
          </div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Admin Dashboard
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>
            Masuk untuk mengelola karya, media, dan profil portofolio Prio Setyo.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div
            style={{
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--badge-video-bg)',
              color: 'var(--badge-video)',
              fontSize: 'var(--text-xs)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}
          >
            <AlertCircle size={16} flexShrink={0} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: 'var(--text-xs)',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-1)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              Email Admin
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="prio@example.com"
                style={{
                  width: '100%',
                  padding: 'var(--space-3) var(--space-4) var(--space-3) var(--space-10)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-medium)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: 'var(--text-sm)'
                }}
              />
              <Mail
                size={18}
                color="var(--text-tertiary)"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: 'var(--text-xs)',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-1)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              Kata Sandi
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{
                  width: '100%',
                  padding: 'var(--space-3) var(--space-4) var(--space-3) var(--space-10)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-medium)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: 'var(--text-sm)'
                }}
              />
              <Lock
                size={18}
                color="var(--text-tertiary)"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            style={{ width: '100%', marginTop: 'var(--space-2)' }}
          >
            {loading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
          </Button>
        </form>

        {/* Demo Mode Bypass (Developer Friendly) */}
        {onDemoLogin && (
          <div
            style={{
              paddingTop: 'var(--space-4)',
              borderTop: '1px dashed var(--border-subtle)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>
              Mode Pengujian Cepat Lokal (Tanpa Auth Supabase):
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onDemoLogin}
              icon={Sparkles}
              style={{ width: '100%' }}
            >
              Masuk sebagai Admin Demo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
