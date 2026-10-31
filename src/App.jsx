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
import { FilosofiDialog } from './components/sections/FilosofiDialog';
import { WorkDetailModal } from './components/work/WorkDetailModal';
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
        backgroundColor: '#071320',
        color: '#ffffff',
        gap: 'var(--space-sm)'
      }}
    >
      <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: '#ED1C24' }} />
      <span style={{ fontSize: '13px', fontWeight: '600', fontFamily: 'var(--font-mono)' }}>
        Memuat Atelier CMS...
      </span>
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
  const [modalState, setModalState] = useState({
    isOpen: false,
    data: null
  });

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

  const handleOpenDetailModal = (item) => {
    setModalState({
      isOpen: true,
      data: item
    });
  };

  const handleCloseDetailModal = () => {
    setModalState({
      isOpen: false,
      data: null
    });
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
        backgroundColor: '#071320',
        color: '#ffffff',
        fontFamily: 'var(--font-body)'
      }}
    >
      {/* Skip link untuk aksesibilitas */}
      <a href="#hero" className="skip-link">
        Loncat ke Konten Utama
      </a>

      {/* Sticky Top Navbar */}
      <Navbar
        siteName={settings?.name || 'Prio Setyo'}
        avatarUrl={settings?.avatar_url}
        onNavigateAdmin={() => navigateTo('/admin')}
      />

      {/* Graceful Degradation Banner if Supabase connection is offline */}
      {error && (
        <div
          style={{
            backgroundColor: '#0A2540',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '0.5rem 1.5rem',
            color: '#ffffff'
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              fontWeight: '500',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={15} color="#ED1C24" />
              <span>
                Sedang menggunakan salinan arsip lokal (Koneksi Supabase disinkronkan otomatis).
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
                color: '#7AC142',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={12} />
              Coba Lagi
            </button>
          </div>
        </div>
      )}

      {/* Main Public Content (Flow matching new Stitch Enterprise Design) */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Section 1 & Section 2: Hero Spotlight & Key Metrics */}
        <Hero
          settings={settings}
          loading={loading}
          onOpenFilosofi={() => setIsFilosofiOpen(true)}
          onOpenDetailModal={handleOpenDetailModal}
        />

        {/* Section 3: Tentang Saya & 4 Pilar Strategis */}
        <About
          settings={settings}
          loading={loading}
          onOpenDetailModal={handleOpenDetailModal}
          onOpenFilosofi={() => setIsFilosofiOpen(true)}
        />

        {/* Section 4: Creative Toolkit & Eksperimen Visual */}
        <Skills
          groupedSkills={groupedSkills}
          loading={loading}
          onOpenDetailModal={handleOpenDetailModal}
        />

        {/* Section 5: Galeri Karya Terkurasi (Bento Grid) */}
        <WorkGrid
          onOpenDetailModal={handleOpenDetailModal}
        />

        {/* Section 6: Linimasa Pengalaman Profesional */}
        <Experience
          experiences={experiences}
          loading={loading}
          onOpenDetailModal={handleOpenDetailModal}
        />

        {/* Section 7: Kontak & Kolaborasi Interaktif */}
        <Contact
          settings={settings}
          loading={loading}
        />
      </main>

      {/* Footer Enterprise */}
      <Footer settings={settings} />

      {/* Interactive Detail Modal Dialog */}
      <WorkDetailModal
        isOpen={modalState.isOpen}
        onClose={handleCloseDetailModal}
        data={modalState.data}
      />

      {/* Interactive Filosofi Dialog Modal */}
      <FilosofiDialog
        isOpen={isFilosofiOpen}
        onClose={() => setIsFilosofiOpen(false)}
        settings={settings}
      />
    </div>
  );
}
