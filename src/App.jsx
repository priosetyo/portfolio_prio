import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useSiteContent } from './hooks/useSiteContent';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { Skills } from './components/sections/Skills';
import { WorkGrid } from './components/work/WorkGrid';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';
import { FilosofiDialog } from './components/sections/FilosofiDialog';
import { AlertCircle, RefreshCw, Loader2 } from 'lucide-react';

// Code splitting rute admin
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
        backgroundColor: '#0e0e12',
        color: '#ffffff',
        gap: 'var(--space-sm)'
      }}
    >
      <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: '#ff571a' }} />
      <span style={{ fontSize: '13px', fontWeight: '600' }}>Memuat Atelier CMS...</span>
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
  const [isFilosofiOpen, setIsFilosofiOpen] = useState(false);

  // Listener untuk navigasi browser popstate
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

  // RUTE KHUSUS ADMIN (/admin)
  if (route.startsWith('/admin')) {
    return (
      <Suspense fallback={<AdminLoadingFallback />}>
        <AdminPage onBackToSite={() => navigateTo('/')} />
      </Suspense>
    );
  }

  // RUTE PUBLIK UTAMA (/)
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-on-surface)'
      }}
    >
      {/* Skip link untuk aksesibilitas */}
      <a href="#hero" className="skip-link">
        Loncat ke Konten Utama
      </a>

      {/* Sticky Top Navbar */}
      <Navbar
        siteName={settings?.name || 'Prio Setyo'}
        onOpenFilosofi={() => setIsFilosofiOpen(true)}
      />

      {/* Graceful Degradation Banner if Supabase connection is offline */}
      {error && (
        <div
          style={{
            backgroundColor: 'var(--color-secondary-container)',
            borderBottom: '1px solid var(--color-outline-variant)',
            padding: '0.5rem 1rem',
            color: 'var(--color-on-secondary-fixed)'
          }}
        >
          <div
            style={{
              maxWidth: '1440px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              fontWeight: '500'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={15} />
              <span>
                Sedang menggunakan salinan arsip lokal (Koneksi Supabase terputus / simulasi).
              </span>
            </div>
            <button
              onClick={refetch}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'underline',
                fontWeight: '600',
                border: 'none',
                background: 'none',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={12} />
              Coba Lagi
            </button>
          </div>
        </div>
      )}

      {/* Main Public Content (Flow matching new Stitch Design) */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
        {/* 1. Hero Section: Statement Bar + Bento Grid (Rail, Lilac Profile, Showreel, 3 Metric Cards) */}
        <Hero
          settings={settings}
          loading={loading}
          onOpenFilosofi={() => setIsFilosofiOpen(true)}
        />

        {/* 2. Toolkit & Creative Engine (Obsidian Solid Card) */}
        <Skills groupedSkills={groupedSkills} loading={loading} />

        {/* 3. Extended Curated Work Gallery (Filter Chips & 3-Column 4/3 Grid) */}
        <WorkGrid />

        {/* 4. Experience Timeline Strip (3 White Cards) */}
        <Experience experiences={experiences} loading={loading} />

        {/* 5. Ultimate Call to Action Banner (Black Obsidian with Lilac Pill CTA) */}
        <Contact settings={settings} loading={loading} />
      </main>

      {/* Footer */}
      <Footer settings={settings} />

      {/* Interactive Filosofi Dialog Modal */}
      <FilosofiDialog
        isOpen={isFilosofiOpen}
        onClose={() => setIsFilosofiOpen(false)}
        settings={settings}
      />
    </div>
  );
}
