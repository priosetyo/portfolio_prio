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
      if (activeCategory === 'photo' || activeCategory === 'fotografi') {
        return p.category === 'photo' || p.category === 'fotografi';
      }
      if (activeCategory === 'video' || activeCategory === 'videografi') {
        return p.category === 'video' || p.category === 'videografi';
      }
      if (activeCategory === 'design' || activeCategory === 'desain') {
        return p.category === 'design' || p.category === 'desain';
      }
      if (activeCategory === 'copy' || activeCategory === 'copywriting') {
        return p.category === 'copy' || p.category === 'copywriting';
      }
      return p.category === activeCategory;
    });
  }, [projects, activeCategory]);

  return (
    <section
      id="karya"
      style={{
        width: '100%',
        backgroundColor: 'var(--color-surface-lowest)',
        paddingTop: 'var(--space-3xl)',
        paddingBottom: 'var(--space-3xl)'
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: 'var(--max-width)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2xl)'
        }}
      >
        {/* Section Header with Stitch Layout & Filter Chips */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 'var(--space-lg)'
          }}
          className="work-header"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-container)',
                  boxShadow: '0 0 10px rgba(255, 87, 26, 0.6)'
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: 'var(--color-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.25em'
                }}
              >
                Portofolio Kurasi
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: '800',
                color: 'var(--color-on-surface)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                margin: 0
              }}
            >
              Karya Terpilih
            </h2>
          </div>

          {/* Filter Chips (Oval Pill Buttons) */}
          <div>
            <WorkFilter activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'var(--gutter)'
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  aspectRatio: '16/11',
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
              padding: 'var(--space-2xl) var(--space-md)',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--color-surface-container)',
              border: '1px dashed var(--border-medium)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-md)'
            }}
          >
            <FolderArchive size={40} color="var(--color-outline)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-on-surface)' }}>
              Belum ada karya untuk kategori ini
            </h3>
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary-container)',
                color: 'var(--color-on-primary-container)',
                fontWeight: '600',
                fontSize: '0.875rem'
              }}
            >
              Tampilkan Semua Karya
            </button>
          </div>
        )}

        {/* 3-Column Showcase Grid */}
        {!loading && filteredProjects.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
              gap: 'var(--gutter)',
              rowGap: 'var(--space-xl)'
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

        {/* Detail Interactive Dialog Modal */}
        <WorkDialog
          open={Boolean(activeProjectData)}
          onClose={() => setActiveProjectData(null)}
          project={activeProjectData?.project}
          frameNo={activeProjectData?.project?.year?.toString() || ''}
        />
      </div>

      <style>{`
        @media (min-width: 768px) {
          .work-header {
            flex-direction: row !important;
            align-items: flex-end !important;
          }
        }
      `}</style>
    </section>
  );
}
