import React from 'react';
import { Dialog } from '../ui/Dialog';
import { Tag } from '../ui/Tag';
import { MediaViewer } from './MediaViewer';
import { VideoPlayer } from './VideoPlayer';
import { getCategoryLabel } from '../../lib/format';
import { Calendar, User, Briefcase, Info, Quote, Layers, ArrowLeft } from 'lucide-react';

export function WorkDialog({ project, frameNo, open, onClose }) {
  if (!project) return null;

  const {
    title,
    category,
    summary,
    description,
    client,
    year,
    role,
    meta = {},
    project_media = []
  } = project;

  const isVideo = category === 'video';
  const isCopy = category === 'copy';
  const categoryLabel = getCategoryLabel(category);

  // Filter media yang relevan
  const videoMedia = isVideo ? project_media.find((m) => m.kind === 'video' || m.external_url) : null;
  const imageMediaList = project_media.filter((m) => m.kind === 'image');

  // Keys untuk meta dinamis
  const metaEntries = Object.entries(meta || {});

  return (
    <Dialog open={open} onClose={onClose} maxWidth="960px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* 1. Header Informasi Karya */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Tag tone="default">{frameNo}</Tag>
            <Tag tone={category}>{categoryLabel}</Tag>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
              fontWeight: '800',
              lineHeight: 1.25,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em'
            }}
          >
            {title}
          </h2>

          {(client || year || role) && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 'var(--space-4)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                fontWeight: '500'
              }}
            >
              {client && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Briefcase size={13} color="var(--text-tertiary)" />
                  <span>Klien: <strong>{client}</strong></span>
                </div>
              )}
              {year && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Calendar size={13} color="var(--text-tertiary)" />
                  <span>Tahun: <strong>{year}</strong></span>
                </div>
              )}
              {role && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <User size={13} color="var(--text-tertiary)" />
                  <span>Peran: <strong>{role}</strong></span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 2. Media Presentation (Video, Image Carousel, or Copywriting Showcase) */}
        <div>
          {isVideo && videoMedia ? (
            <VideoPlayer
              url={videoMedia.storage_path || videoMedia.external_url}
              poster={videoMedia.poster_path}
              altText={videoMedia.alt_text || title}
            />
          ) : !isCopy && imageMediaList.length > 0 ? (
            <MediaViewer mediaList={imageMediaList} />
          ) : isCopy ? (
            <div
              style={{
                padding: 'var(--space-8) var(--space-6)',
                backgroundColor: 'var(--badge-copy-bg)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
                position: 'relative'
              }}
            >
              <Quote size={36} color="var(--badge-copy)" style={{ marginBottom: 'var(--space-3)', opacity: 0.7 }} />
              <div
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  fontStyle: 'italic',
                  lineHeight: 1.7,
                  color: 'var(--text-primary)',
                  whiteSpace: 'pre-line'
                }}
              >
                {description || summary}
              </div>
            </div>
          ) : null}
        </div>

        {/* 3. Deskripsi & Meta Teknis Proyek */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: metaEntries.length > 0 ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr',
            gap: 'var(--space-6)',
            paddingTop: 'var(--space-4)',
            borderTop: '1px solid var(--border-subtle)'
          }}
        >
          {/* Kolom Kiri: Deskripsi Proyek (jika bukan copywriting yang sudah ditampilkan di atas) */}
          {!isCopy && (
            <div>
              <h4
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-tertiary)',
                  marginBottom: 'var(--space-2)'
                }}
              >
                Tentang Proyek
              </h4>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-line'
                }}
              >
                {description || summary}
              </p>
            </div>
          )}

          {/* Kolom Kanan / Detail: Metadata Teknis (Kamera, Resolusi, Tools, Objective, dsb) */}
          {metaEntries.length > 0 && (
            <div
              style={{
                padding: 'var(--space-4)',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <h4
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--accent-highlight)',
                  marginBottom: 'var(--space-3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Info size={14} />
                <span>Spesifikasi Teknis & Metadata</span>
              </h4>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)'
                }}
              >
                {metaEntries.map(([key, val]) => (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      fontSize: 'var(--text-xs)',
                      padding: 'var(--space-1) 0',
                      borderBottom: '1px dashed var(--border-subtle)'
                    }}
                  >
                    <span style={{ color: 'var(--text-tertiary)', textTransform: 'capitalize' }}>
                      {key.replace(/_/g, ' ')}:
                    </span>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)', textAlign: 'right' }}>
                      {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}
