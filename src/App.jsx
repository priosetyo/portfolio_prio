import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useSiteContent } from './hooks/useSiteContent';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { WorkGrid } from './components/work/WorkGrid';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';
import { AlertCircle, RefreshCw, Loader2 } from 'lucide-react';

// Code splitting rute admin (Lazy Loading untuk optimasi performa awal)
const AdminPage = lazy(() =>
  import('./components/admin/AdminPage').then((module) => ({ default: module.AdminPage }))
);

function AdminLoadingFallback() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        gap: 'var(--space-3)'
      }}
    >
      <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent-highlight)' }} />
      <span style={{ fontSize: 'var(--text-sm)', fontWeight: '600' }}>Memuat Admin Dashboard...</span>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(window.location.pathname);

  // Listener untuk navigasi browser back/forward
  useEffect(() => {
    const handlePopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const {
    settings,
    groupedSkills,
    experiences,
    loading,
    error,
    refetch
  } = useSiteContent();

  // RUTE KHUSUS ADMIN (/admin) dengan Suspense
  if (route.startsWith('/admin')) {
    return (
      <Suspense fallback={<AdminLoadingFallback />}>
        <AdminPage onBackToSite={() => navigateTo('/')} />
      </Suspense>
    );
  }

  // RUTE PUBLIK UTAMA (/)
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Aksesibilitas: Skip link untuk navigasi keyboard & pembaca layar */}
      <a href="#hero" className="skip-link">
        Loncat ke Konten Utama
      </a>

      {/* Sticky Glassmorphic Navbar */}
      <Navbar siteName={settings?.name || 'Prio Setyo'} />

      {/* Jaringan Error Notification (Graceful Degradation Banner) */}
      {error && (
        <div
          style={{
            backgroundColor: 'var(--badge-video-bg)',
            borderBottom: '1px solid var(--badge-video)',
            padding: 'var(--space-3) var(--space-4)',
            color: 'var(--badge-video)'
          }}
        >
          <div
            className="container"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 'var(--text-xs)',
              fontWeight: '500'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <AlertCircle size={16} />
              <span>
                Sedang menggunakan salinan lokal (Supabase terputus / belum dikonfigurasi sepenuhnya).
              </span>
            </div>
            <button
              onClick={refetch}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                textDecoration: 'underline',
                fontWeight: '600'
              }}
            >
              <RefreshCw size={12} />
              Coba Lagi
            </button>
          </div>
        </div>
      )}

      {/* Main Public Content Sections */}
      <main style={{ flex: 1 }}>
        {/* 1. Hero Section (F01: Responsive on 360px without initial scroll) */}
        <Hero settings={settings} loading={loading} />

        {/* 2. About Section (F02: Dynamic profil dari site_settings) */}
        <About settings={settings} loading={loading} />

        {/* 3. Skills Section (F03: Dynamic kelompok keahlian dari skills) */}
        <Skills groupedSkills={groupedSkills} loading={loading} />

        {/* 4. Work Section (F04: Galeri interaktif & filter kategori) */}
        <WorkGrid />

        {/* 5. Experience Section (F06: Garis waktu karir dari experiences) */}
        <Experience experiences={experiences} loading={loading} />

        {/* 6. Contact Section (F07: Baris salin cepat & unduh CV PDF) */}
        <Contact settings={settings} loading={loading} />
      </main>

      {/* Footer dengan Link Cepat ke Admin Panel */}
      <Footer
        siteName={settings?.name || 'Prio Setyo'}
        onNavigateAdmin={() => navigateTo('/admin')}
      />
    </div>
  );
}
