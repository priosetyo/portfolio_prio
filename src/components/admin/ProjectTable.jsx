import React, { useState } from 'react';
import { Tag } from '../ui/Tag';
import {
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Layers,
  LayoutGrid,
  Table as TableIcon,
  Sparkles,
  ExternalLink,
  X,
  Filter,
  CheckCircle2,
  Clock,
  Calendar,
  User,
  ArrowUpRight
} from 'lucide-react';

const CATEGORY_LABELS = {
  photo: 'Fotografi',
  video: 'Videografi',
  design: 'Desain Grafis',
  copy: 'Copywriting'
};

export function ProjectTable({ projects = [], onEdit, onDelete, onTogglePublish }) {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'published' | 'draft'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [previewProject, setPreviewProject] = useState(null);

  // Filter logic
  const filtered = projects.filter((p) => {
    const matchSearch =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.client?.toLowerCase().includes(search.toLowerCase()) ||
      p.slug?.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'all' || p.category === filterCat;
    const matchStatus =
      filterStatus === 'all' ||
      (filterStatus === 'published' && p.is_published) ||
      (filterStatus === 'draft' && !p.is_published);

    return matchSearch && matchCat && matchStatus;
  });

  const categoryCounts = {
    all: projects.length,
    photo: projects.filter((p) => p.category === 'photo').length,
    video: projects.filter((p) => p.category === 'video').length,
    design: projects.filter((p) => p.category === 'design').length,
    copy: projects.filter((p) => p.category === 'copy').length
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Control Toolbar */}
      <div
        style={{
          padding: '1.25rem',
          borderRadius: '1.25rem',
          backgroundColor: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        {/* Row 1: Search & View Toggle */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem'
          }}
        >
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '420px' }}>
            <Search
              size={15}
              color="var(--text-tertiary)"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari karya berdasarkan judul, klien, atau slug..."
              style={{
                width: '100%',
                padding: '0.65rem 2rem 0.65rem 2.3rem',
                fontSize: 'var(--text-xs)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(194, 198, 211, 0.55)',
                backgroundColor: 'var(--color-surface-low)',
                color: 'var(--color-on-surface)',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary-container)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(194, 198, 211, 0.55)')}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-tertiary)',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Right Controls: Status Filter & View Mode Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            {/* Status Filter */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#f3f3f5',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                borderRadius: '0.75rem',
                padding: '0.2rem'
              }}
            >
              {[
                { id: 'all', label: 'Semua Status' },
                { id: 'published', label: 'Live' },
                { id: 'draft', label: 'Draf' }
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setFilterStatus(st.id)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: '0.55rem',
                    fontSize: '0.72rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: filterStatus === st.id ? '#000000' : 'transparent',
                    color: filterStatus === st.id ? '#ffffff' : '#6b7280',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {/* View Mode Toggle: Grid vs Table */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#f3f3f5',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                borderRadius: '0.75rem',
                padding: '0.2rem'
              }}
            >
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                title="Tampilan Kartu Visual"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.4rem 0.65rem',
                  borderRadius: '0.55rem',
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: viewMode === 'grid' ? '#000000' : 'transparent',
                  color: viewMode === 'grid' ? '#ffffff' : '#6b7280'
                }}
              >
                <LayoutGrid size={13} />
                <span className="hide-mobile">Kartu</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                title="Tampilan Tabel Data"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.4rem 0.65rem',
                  borderRadius: '0.55rem',
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: viewMode === 'table' ? '#000000' : 'transparent',
                  color: viewMode === 'table' ? '#ffffff' : '#6b7280'
                }}
              >
                <TableIcon size={13} />
                <span className="hide-mobile">Tabel</span>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Category Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto', paddingBottom: '2px' }}>
          {[
            { id: 'all', label: 'Semua Kategori' },
            { id: 'photo', label: 'Fotografi' },
            { id: 'video', label: 'Videografi' },
            { id: 'design', label: 'Desain Grafis' },
            { id: 'copy', label: 'Copywriting' }
          ].map((cat) => {
            const isSelected = filterCat === cat.id;
            const count = categoryCounts[cat.id] ?? 0;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCat(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.72rem',
                  fontWeight: isSelected ? '700' : '500',
                  border: isSelected
                    ? '1px solid #000000'
                    : '1px solid rgba(0, 0, 0, 0.08)',
                  backgroundColor: isSelected ? '#000000' : '#ffffff',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{cat.label}</span>
                <span
                  style={{
                    fontSize: '0.62rem',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '9999px',
                    backgroundColor: isSelected ? '#ffffff' : '#f3f3f5',
                    color: isSelected ? '#000000' : '#6b7280'
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content: Card Grid View OR Modern Table View */}
      {filtered.length === 0 ? (
        <div
          style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '1.25rem',
            border: '1px dashed rgba(0, 0, 0, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <Layers size={36} color="var(--text-tertiary)" style={{ opacity: 0.5 }} />
          <h3 style={{ fontSize: 'var(--text-base)', color: '#000000', margin: 0, fontWeight: '700' }}>
            Tidak ada karya yang sesuai kriteria pencarian
          </h3>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0 }}>
            Coba ubah kata kunci atau setel ulang filter kategori & status publikasi.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Visual Card Grid View */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {filtered.map((proj) => {
            const firstMedia = proj.project_media?.[0];
            const thumb = firstMedia?.thumb_path || firstMedia?.poster_path || firstMedia?.storage_path;

            return (
              <div
                key={proj.id}
                style={{
                  borderRadius: '1.25rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.02)';
                }}
              >
                {/* Visual Thumbnail Area */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/10',
                    backgroundColor: '#f3f3f5',
                    overflow: 'hidden'
                  }}
                >
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={proj.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        color: 'var(--text-tertiary)'
                      }}
                    >
                      <Layers size={28} />
                      <span style={{ fontSize: '0.7rem' }}>Tanpa Thumbnail</span>
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.6) 100%)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Top Badges: Category & Sort Order */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      right: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Tag tone={proj.category}>
                      {CATEGORY_LABELS[proj.category] || proj.category.toUpperCase()}
                    </Tag>

                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: '700',
                        color: '#ffffff',
                        backgroundColor: 'rgba(0, 0, 0, 0.65)',
                        backdropFilter: 'blur(8px)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      Urutan #{proj.sort_order ?? 0}
                    </span>
                  </div>

                  {/* Bottom overlay: Client & Year */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '12px',
                      right: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.7rem',
                      color: 'rgba(255, 255, 255, 0.95)'
                    }}
                  >
                    <span style={{ fontWeight: '600' }}>{proj.client || 'Koleksi Studio'}</span>
                    <span>{proj.year || '2026'}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1 }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.05rem',
                        fontWeight: '700',
                        color: '#000000',
                        margin: 0,
                        lineHeight: 1.3
                      }}
                    >
                      {proj.title}
                    </h3>
                    <div
                      style={{
                        fontSize: '0.68rem',
                        color: 'var(--text-tertiary)',
                        fontFamily: 'var(--font-mono)',
                        marginTop: '0.2rem'
                      }}
                    >
                      /{proj.slug}
                    </div>
                  </div>

                  {proj.summary && (
                    <p
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)',
                        margin: 0,
                        lineHeight: 1.45,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {proj.summary}
                    </p>
                  )}

                  {/* Spacer */}
                  <div style={{ flex: 1 }} />

                  {/* Publish Status Toggle & Footer */}
                  <div
                    style={{
                      paddingTop: '0.75rem',
                      borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    {/* 1-Click Interactive Switch */}
                    <button
                      type="button"
                      onClick={() => onTogglePublish(proj.id, !proj.is_published)}
                      title={proj.is_published ? 'Klik untuk arsipkan ke Draf' : 'Klik untuk terbitkan ke Live Publik'}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        border: proj.is_published
                          ? '1px solid rgba(0, 33, 21, 0.15)'
                          : '1px solid rgba(0, 0, 0, 0.08)',
                        backgroundColor: proj.is_published
                          ? 'var(--color-tertiary-fixed)'
                          : '#f3f3f5',
                        color: proj.is_published ? 'var(--color-on-tertiary-fixed)' : 'var(--text-tertiary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          backgroundColor: proj.is_published ? '#059669' : '#9ca3af'
                        }}
                      />
                      <span>{proj.is_published ? 'Terbit (Live)' : 'Draf (Privat)'}</span>
                    </button>

                    {/* Action Buttons: Preview & Edit & Delete */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <button
                        type="button"
                        onClick={() => setPreviewProject(proj)}
                        title="Lihat Pratinjau Cepat"
                        style={{
                          padding: '0.4rem',
                          borderRadius: '0.5rem',
                          backgroundColor: '#f3f3f5',
                          border: '1px solid rgba(0, 0, 0, 0.06)',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#000000';
                          e.currentTarget.style.backgroundColor = 'var(--color-secondary-fixed)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--text-secondary)';
                          e.currentTarget.style.backgroundColor = '#f3f3f5';
                        }}
                      >
                        <Eye size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit(proj)}
                        title="Edit Konten Karya"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.4rem 0.75rem',
                          borderRadius: '0.5rem',
                          backgroundColor: '#000000',
                          border: 'none',
                          color: '#ffffff',
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#222222';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#000000';
                        }}
                      >
                        <Edit3 size={13} />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Yakin ingin menghapus karya "${proj.title}" secara permanen?`)) {
                            onDelete(proj.id);
                          }
                        }}
                        title="Hapus Karya"
                        style={{
                          padding: '0.4rem',
                          borderRadius: '0.5rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: '#dc2626',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'background-color 0.15s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fee2e2')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Modern Compact Table View */
        <div
          style={{
            borderRadius: '1.25rem',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
            overflow: 'hidden'
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 'var(--text-xs)' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9f9fb', borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  <th style={{ padding: '0.75rem 1rem', width: '60px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Urutan
                  </th>
                  <th style={{ padding: '0.75rem 1rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Karya & Slug
                  </th>
                  <th style={{ padding: '0.75rem 1rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Kategori
                  </th>
                  <th style={{ padding: '0.75rem 1rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Klien & Tahun
                  </th>
                  <th style={{ padding: '0.75rem 1rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center' }}>
                    Status
                  </th>
                  <th style={{ padding: '0.75rem 1rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'right' }}>
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((proj) => {
                  const firstMedia = proj.project_media?.[0];
                  const thumb = firstMedia?.thumb_path || firstMedia?.poster_path || firstMedia?.storage_path;

                  return (
                    <tr
                      key={proj.id}
                      style={{
                        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9f9fb')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', fontWeight: '600' }}>
                        #{proj.sort_order ?? 0}
                      </td>

                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div
                            style={{
                              width: '52px',
                              height: '38px',
                              borderRadius: '0.5rem',
                              backgroundColor: '#f3f3f5',
                              overflow: 'hidden',
                              flexShrink: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1px solid rgba(0, 0, 0, 0.06)'
                            }}
                          >
                            {thumb ? (
                              <img src={thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <Layers size={14} color="var(--text-tertiary)" />
                            )}
                          </div>
                          <div>
                            <div style={{ fontWeight: '700', color: '#000000', fontSize: '0.82rem' }}>
                              {proj.title}
                            </div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                              /{proj.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '0.75rem 1rem' }}>
                        <Tag tone={proj.category}>{CATEGORY_LABELS[proj.category] || proj.category.toUpperCase()}</Tag>
                      </td>

                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>
                        <div style={{ fontWeight: '600', color: '#000000' }}>{proj.client || '—'}</div>
                        <div style={{ color: 'var(--text-tertiary)', fontSize: '0.68rem' }}>{proj.year || '—'}</div>
                      </td>

                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => onTogglePublish(proj.id, !proj.is_published)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '9999px',
                            fontSize: '0.68rem',
                            fontWeight: '700',
                            border: proj.is_published
                              ? '1px solid rgba(0, 33, 21, 0.15)'
                              : '1px solid rgba(0, 0, 0, 0.08)',
                            backgroundColor: proj.is_published
                              ? 'var(--color-tertiary-fixed)'
                              : '#f3f3f5',
                            color: proj.is_published ? 'var(--color-on-tertiary-fixed)' : 'var(--text-tertiary)',
                            cursor: 'pointer'
                          }}
                        >
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: proj.is_published ? '#059669' : '#9ca3af'
                            }}
                          />
                          <span>{proj.is_published ? 'Live' : 'Draf'}</span>
                        </button>
                      </td>

                      <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                          <button
                            type="button"
                            onClick={() => setPreviewProject(proj)}
                            title="Pratinjau"
                            style={{
                              padding: '0.35rem',
                              borderRadius: '0.4rem',
                              backgroundColor: '#f3f3f5',
                              border: 'none',
                              color: 'var(--text-secondary)',
                              cursor: 'pointer'
                            }}
                          >
                            <Eye size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => onEdit(proj)}
                            title="Edit"
                            style={{
                              padding: '0.35rem 0.65rem',
                              borderRadius: '0.4rem',
                              backgroundColor: '#000000',
                              border: 'none',
                              color: '#ffffff',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Hapus karya "${proj.title}"?`)) onDelete(proj.id);
                            }}
                            title="Hapus"
                            style={{
                              padding: '0.35rem',
                              borderRadius: '0.4rem',
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: '#dc2626',
                              cursor: 'pointer'
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Built-in Studio Quick Preview Modal */}
      {previewProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(12px)'
          }}
          onClick={() => setPreviewProject(null)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '680px',
              backgroundColor: '#ffffff',
              borderRadius: '1.5rem',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.15)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '90vh'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: '700',
                    color: '#000000',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}
                >
                  Pratinjau Karya
                </span>
                <Tag tone={previewProject.category}>
                  {CATEGORY_LABELS[previewProject.category] || previewProject.category}
                </Tag>
              </div>

              <button
                type="button"
                onClick={() => setPreviewProject(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-tertiary)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Media Preview */}
              {previewProject.project_media?.[0] && (
                <div
                  style={{
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    backgroundColor: '#f3f3f5',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    aspectRatio: '16/9'
                  }}
                >
                  <img
                    src={previewProject.project_media[0].storage_path || previewProject.project_media[0].thumb_path}
                    alt={previewProject.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: '#000000',
                    margin: 0
                  }}
                >
                  {previewProject.title}
                </h2>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-tertiary)',
                    fontFamily: 'var(--font-mono)',
                    marginTop: '0.25rem'
                  }}
                >
                  Slug: /{previewProject.slug} | Klien: {previewProject.client || '—'} | Tahun: {previewProject.year || '—'}
                </div>
              </div>

              {previewProject.summary && (
                <div
                  style={{
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    backgroundColor: 'var(--color-secondary-fixed)',
                    color: '#1b1735',
                    fontSize: '0.82rem',
                    lineHeight: 1.6
                  }}
                >
                  {previewProject.summary}
                </div>
              )}

              {previewProject.description && (
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                  {previewProject.description}
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '0.75rem'
              }}
            >
              <button
                type="button"
                onClick={() => setPreviewProject(null)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.65rem',
                  backgroundColor: '#f3f3f5',
                  color: 'var(--text-secondary)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  const p = previewProject;
                  setPreviewProject(null);
                  onEdit(p);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '0.65rem',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Edit3 size={13} />
                <span>Buka Editor Karya</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
