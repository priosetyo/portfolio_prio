import React, { useState, useMemo } from 'react';
import { WorkFilter } from './WorkFilter';
import { WorkTile } from './WorkTile';
import { WorkDialog } from './WorkDialog';
import { useProjects } from '../../hooks/useProjects';
import { FolderArchive } from 'lucide-react';

export function WorkGrid() {
  const { projects = [], loading } = useProjects();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeProjectData, setActiveProjectData] = useState(null);

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => {
      const cat = p.category?.toLowerCase() || '';
      if (activeCategory === 'fotografi' || activeCategory === 'photo') {
        return cat.includes('photo') || cat.includes('fotografi');
      }
      if (activeCategory === 'videografi' || activeCategory === 'video') {
        return cat.includes('video') || cat.includes('videografi');
      }
      if (activeCategory === 'desain' || activeCategory === 'design') {
        return cat.includes('design') || cat.includes('desain');
      }
      if (activeCategory === 'copywriting' || activeCategory === 'copy') {
        return cat.includes('copy') || cat.includes('copywriting');
      }
      return cat === activeCategory.toLowerCase();
    });
  }, [projects, activeCategory]);

  return (
    <section
      id="karya-terpilih"
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: 'var(--space-lg) var(--margin-mobile) 0 var(--margin-mobile)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-md)'
      }}
    >
      {/* Header Row: Title & Filter Chips */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 'var(--space-sm)'
        }}
        className="work-gallery-header"
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#000000' }} />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-on-surface-variant)'
              }}
            >
              ARSIP TERPILIH 2023—2025
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '40px',
              lineHeight: '46px',
              letterSpacing: '-0.03em',
              fontWeight: '700',
              color: '#000000',
              margin: '4px 0 0 0'
            }}
          >
            Eksplorasi Karya Terpilih
          </h2>
        </div>

        {/* Filter Chips */}
        <div>
          <WorkFilter activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-md)'
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                aspectRatio: '4/3',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--color-surface-container)',
                animation: 'pulse 1.5s infinite'
              }}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredProjects.length === 0 && (
        <div
          style={{
            padding: 'var(--space-xl) var(--space-md)',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--color-surface-container-low)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-sm)'
          }}
        >
          <FolderArchive size={36} color="var(--color-outline)" />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--color-on-surface)' }}>
            Belum ada karya untuk kategori ini
          </h3>
          <button
            onClick={() => setActiveCategory('all')}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              backgroundColor: '#000000',
              color: '#ffffff',
              fontWeight: '600',
              fontSize: '12px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Tampilkan Semua Karya
          </button>
        </div>
      )}

      {/* 3-Column Curated Projects Grid */}
      {!loading && filteredProjects.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'var(--space-md)'
          }}
        >
          {filteredProjects.map((project) => (
            <WorkTile
              key={project.id}
              project={project}
              onClick={() => setActiveProjectData({ project })}
            />
          ))}
        </div>
      )}

      {/* Interactive Detail Modal Dialog */}
      <WorkDialog
        open={Boolean(activeProjectData)}
        onClose={() => setActiveProjectData(null)}
        project={activeProjectData?.project}
        frameNo={activeProjectData?.project?.year?.toString() || ''}
      />

      <style>{`
        @media (min-width: 768px) {
          .work-gallery-header {
            flex-direction: row !important;
            align-items: flex-end !important;
          }
        }
      `}</style>
    </section>
  );
}
