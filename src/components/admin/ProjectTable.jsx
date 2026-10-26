import React, { useState } from 'react';
import { Tag } from '../ui/Tag';
import { Button } from '../ui/Button';
import { Edit2, Trash2, Eye, EyeOff, Search, Layers, Image as ImageIcon, Video, Palette, FileText } from 'lucide-react';

export function ProjectTable({ projects = [], onEdit, onDelete, onTogglePublish }) {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.client?.toLowerCase().includes(search.toLowerCase()) ||
      p.slug?.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'all' || p.category === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-elevated)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Table Toolbar */}
      <div
        style={{
          padding: 'var(--space-4) var(--space-6)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-3)'
        }}
      >
        {/* Search Input */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari karya berdasarkan judul atau klien..."
            style={{
              width: '100%',
              padding: 'var(--space-2) var(--space-3) var(--space-2) var(--space-8)',
              fontSize: 'var(--text-xs)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-medium)',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
          <Search
            size={14}
            color="var(--text-tertiary)"
            style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
          />
        </div>

        {/* Filter Category */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            style={{
              padding: 'var(--space-2) var(--space-3)',
              fontSize: 'var(--text-xs)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-medium)',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)'
            }}
          >
            <option value="all">Semua Kategori ({projects.length})</option>
            <option value="photo">Fotografi</option>
            <option value="video">Videografi</option>
            <option value="design">Desain Grafis</option>
            <option value="copy">Copywriting</option>
          </select>
        </div>
      </div>

      {/* Table Content */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 'var(--text-sm)' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
              <th style={{ padding: 'var(--space-3) var(--space-4)', width: '60px', color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', textTransform: 'uppercase' }}>
                Urutan
              </th>
              <th style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', textTransform: 'uppercase' }}>
                Karya & Detail
              </th>
              <th style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', textTransform: 'uppercase' }}>
                Kategori
              </th>
              <th style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', textTransform: 'uppercase' }}>
                Klien & Tahun
              </th>
              <th style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', textAlign: 'center' }}>
                Status Publikasi
              </th>
              <th style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', textAlign: 'right' }}>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                  Tidak ada karya yang sesuai dengan filter.
                </td>
              </tr>
            ) : (
              filtered.map((proj) => {
                const firstMedia = proj.project_media?.[0];
                const thumb = firstMedia?.thumb_path || firstMedia?.poster_path || firstMedia?.storage_path;

                return (
                  <tr
                    key={proj.id}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      transition: 'background-color var(--transition-fast)'
                    }}
                  >
                    {/* Sort Order */}
                    <td style={{ padding: 'var(--space-3) var(--space-4)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                      #{proj.sort_order ?? 0}
                    </td>

                    {/* Judul & Media */}
                    <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <div
                          style={{
                            width: '48px',
                            height: '36px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--bg-secondary)',
                            overflow: 'hidden',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {thumb ? (
                            <img src={thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <Layers size={16} color="var(--text-tertiary)" />
                          )}
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.3 }}>
                            {proj.title}
                          </div>
                          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                            /{proj.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Kategori */}
                    <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                      <Tag tone={proj.category}>{proj.category.toUpperCase()}</Tag>
                    </td>

                    {/* Klien & Tahun */}
                    <td style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>
                      <div>{proj.client || '—'}</div>
                      <div style={{ color: 'var(--text-tertiary)' }}>{proj.year || '—'}</div>
                    </td>

                    {/* Quick Toggle Publish */}
                    <td style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => onTogglePublish(proj.id, !proj.is_published)}
                        title={proj.is_published ? 'Klik untuk sembunyikan ke Draf' : 'Klik untuk publikasikan ke Publik'}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          padding: '0.25rem 0.65rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: '600',
                          backgroundColor: proj.is_published ? 'var(--badge-copy-bg)' : 'var(--bg-secondary)',
                          color: proj.is_published ? 'var(--badge-copy)' : 'var(--text-tertiary)',
                          border: `1px solid ${proj.is_published ? 'transparent' : 'var(--border-subtle)'}`,
                          cursor: 'pointer'
                        }}
                      >
                        {proj.is_published ? <Eye size={12} /> : <EyeOff size={12} />}
                        <span>{proj.is_published ? 'Terbit' : 'Draf'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <button
                          type="button"
                          onClick={() => onEdit(proj)}
                          title="Edit Karya"
                          style={{
                            padding: '0.35rem 0.65rem',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          <Edit2 size={13} />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Yakin ingin menghapus karya "${proj.title}"?`)) {
                              onDelete(proj.id);
                            }
                          }}
                          title="Hapus Karya"
                          style={{
                            padding: '0.35rem',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'transparent',
                            color: 'var(--badge-video)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
