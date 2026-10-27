import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';
import { MediaUploader } from './MediaUploader';
import { getStoragePublicUrl } from '../../lib/queries';
import {
  ArrowLeft,
  Save,
  Sparkles,
  Check,
  AlertCircle,
  Camera,
  Video,
  Palette,
  PenTool,
  Eye,
  Layers,
  Calendar,
  User,
  Building,
  Hash,
  Sliders,
  CheckCircle2
} from 'lucide-react';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

const CATEGORIES = [
  { id: 'photo', label: 'Fotografi', icon: Camera, desc: 'Editorial, Fashion, Still Life' },
  { id: 'video', label: 'Videografi', icon: Video, desc: 'Commercial, Cinematic, 3D Motion' },
  { id: 'design', label: 'Desain Grafis', icon: Palette, desc: 'Spatial UI/UX, Visual Identity' },
  { id: 'copy', label: 'Copywriting', icon: PenTool, desc: 'Brand Storytelling, Tagline' }
];

export function ProjectForm({ project, onSave, onCancel }) {
  const isEditing = Boolean(project?.id);

  const [title, setTitle] = useState(project?.title || '');
  const [slug, setSlug] = useState(project?.slug || '');
  const [category, setCategory] = useState(project?.category || 'photo');
  const [client, setClient] = useState(project?.client || '');
  const [year, setYear] = useState(project?.year || new Date().getFullYear());
  const [role, setRole] = useState(project?.role || '');
  const [summary, setSummary] = useState(project?.summary || '');
  const [description, setDescription] = useState(project?.description || '');
  const [excerpt, setExcerpt] = useState(project?.excerpt || '');
  const [sortOrder, setSortOrder] = useState(project?.sort_order ?? 0);
  const [isPublished, setIsPublished] = useState(project?.is_published ?? true);
  const [meta, setMeta] = useState(project?.meta || {});
  const [mediaList, setMediaList] = useState(project?.project_media || []);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-generate slug dari judul
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEditing || !slug) {
      setSlug(slugify(val));
    }
  };

  const handleMetaChange = (key, val) => {
    setMeta((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim() || !slug.trim()) {
      setErrorMsg('Judul karya dan slug wajib diisi.');
      return;
    }

    // Validasi mandat aksesibilitas PRD: Foto yang diterbitkan wajib memiliki alt_text
    if (category === 'photo' && isPublished) {
      const invalidMedia = mediaList.find((m) => m.kind === 'image' && !m.alt_text?.trim());
      if (invalidMedia) {
        setErrorMsg('Mandat Aksesibilitas: Seluruh media foto terbit WAJIB memiliki Teks Alt yang deskriptif.');
        return;
      }
    }

    setSaving(true);
    try {
      const payload = {
        title,
        slug,
        category,
        client,
        year: parseInt(year, 10) || null,
        role,
        summary,
        description,
        excerpt,
        sort_order: parseInt(sortOrder, 10) || 0,
        is_published: isPublished,
        meta,
        project_media: mediaList
      };

      await onSave(payload, project?.id);
    } catch (err) {
      console.error('Error saving project:', err);
      setErrorMsg(err.message || 'Gagal menyimpan karya.');
    } finally {
      setSaving(false);
    }
  };

  const firstMedia = mediaList?.[0];
  const rawThumb = firstMedia?.thumb_path || firstMedia?.poster_path || firstMedia?.storage_path;
  const thumbUrl = getStoragePublicUrl(rawThumb);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Sticky Header Action Bar */}
      <div
        style={{
          position: 'sticky',
          top: '70px',
          zIndex: 40,
          padding: '1rem 1.5rem',
          borderRadius: '1.25rem',
          backgroundColor: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '9999px',
              backgroundColor: '#f3f3f5',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-xs)',
              fontWeight: '600',
              cursor: 'pointer',
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
            <ArrowLeft size={13} />
            <span>Kembali ke Daftar</span>
          </button>

          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                fontWeight: '800',
                color: '#000000',
                margin: 0
              }}
            >
              {isEditing ? `Ubah Karya: ${title || 'Tanpa Judul'}` : 'Buat Entri Karya Baru'}
            </h2>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>
              {isEditing ? `ID: ${project.id}` : 'Draft Baru Studio Prio Setyo'}
            </span>
          </div>
        </div>

        {/* Top Right Save & Cancel */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: '0.75rem',
              backgroundColor: '#f3f3f5',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-xs)',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.55rem 1.35rem',
              borderRadius: '0.75rem',
              backgroundColor: '#000000',
              color: '#ffffff',
              fontSize: 'var(--text-xs)',
              fontWeight: '700',
              border: 'none',
              cursor: saving ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
            }}
          >
            <Save size={14} />
            <span>{saving ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Terbitkan Karya'}</span>
          </button>
        </div>
      </div>

      {/* Error Notification */}
      {errorMsg && (
        <div
          style={{
            padding: '0.85rem 1.25rem',
            borderRadius: '0.85rem',
            backgroundColor: '#fee2e2',
            border: '1px solid rgba(220, 38, 38, 0.2)',
            color: '#dc2626',
            fontSize: 'var(--text-xs)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main 2-Column Responsive Layout */}
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '1.5rem',
            alignItems: 'start'
          }}
        >
          {/* LEFT COLUMN: Core Details & Storytelling */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Section 1: Kategori Visual Selector */}
            <div
              style={{
                padding: '1.5rem',
                borderRadius: '1.25rem',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}
            >
              <label
                style={{
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                1. Pilih Disiplin / Kategori Karya
              </label>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '0.65rem'
                }}
              >
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = category === cat.id;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      style={{
                        padding: '0.85rem 0.75rem',
                        borderRadius: '0.85rem',
                        border: isSelected
                          ? '1px solid #000000'
                          : '1px solid rgba(0, 0, 0, 0.08)',
                        backgroundColor: isSelected
                          ? 'var(--color-secondary-fixed)'
                          : '#f9f9fb',
                        color: isSelected ? '#1b1735' : 'var(--text-secondary)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '0.35rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '0.5rem',
                          backgroundColor: isSelected
                            ? '#000000'
                            : '#ffffff',
                          color: isSelected ? '#ffffff' : '#5b5866',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      <span style={{ fontSize: '0.82rem', fontWeight: '700', color: isSelected ? '#000000' : 'var(--text-primary)' }}>
                        {cat.label}
                      </span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', lineHeight: 1.2 }}>
                        {cat.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Judul & Slug */}
            <div
              style={{
                padding: '1.5rem',
                borderRadius: '1.25rem',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <label
                style={{
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                2. Judul & Identitas URL
              </label>

              <div>
                <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-tertiary)', marginBottom: '0.35rem' }}>
                  Judul Portofolio *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Contoh: Nova Spatial OS (Vision Pro)"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#f3f3f5',
                    color: '#000000',
                    outline: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#000000')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(0, 0, 0, 0.08)')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-tertiary)', marginBottom: '0.35rem' }}>
                  Slug URL (Otomatis) *
                </label>
                <div style={{ position: 'relative' }}>
                  <span
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-tertiary)'
                    }}
                  >
                    /
                  </span>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="nova-spatial-os"
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem 0.65rem 1.8rem',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      backgroundColor: '#f3f3f5',
                      color: '#000000',
                      outline: 'none'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#000000')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(0, 0, 0, 0.08)')}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Klien, Tahun, Peran */}
            <div
              style={{
                padding: '1.5rem',
                borderRadius: '1.25rem',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <label
                style={{
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                3. Metadata Klien & Produksi
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-tertiary)', marginBottom: '0.35rem' }}>
                    Klien / Brand
                  </label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="Contoh: Spatial Labs Tokyo"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.78rem',
                      borderRadius: '0.65rem',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      backgroundColor: '#f3f3f5',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-tertiary)', marginBottom: '0.35rem' }}>
                    Tahun Rilis
                  </label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2026"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.78rem',
                      borderRadius: '0.65rem',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      backgroundColor: '#f3f3f5',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-tertiary)', marginBottom: '0.35rem' }}>
                    Peran Utama
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Contoh: Creative Director"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.78rem',
                      borderRadius: '0.65rem',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      backgroundColor: '#f3f3f5',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Ringkasan & Narasi */}
            <div
              style={{
                padding: '1.5rem',
                borderRadius: '1.25rem',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <label
                style={{
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                4. Narasi & Storytelling Karya
              </label>

              <div>
                <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-tertiary)', marginBottom: '0.35rem' }}>
                  Ringkasan Kartu (Summary) - Tampil di Showcase
                </label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat untuk kartu portofolio..."
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.78rem',
                    borderRadius: '0.65rem',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#f3f3f5',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-tertiary)', marginBottom: '0.35rem' }}>
                  Deskripsi Lengkap / Naskah
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ceritakan visi desain, proses produksi, serta hasil pencapaian..."
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.78rem',
                    borderRadius: '0.65rem',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#f3f3f5',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>

            {/* Section 5: Metadata Khusus Disiplin (JSONB) */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '1.25rem',
                backgroundColor: '#f9f9fb',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sliders size={13} color="#000000" />
                <span style={{ fontSize: '0.68rem', fontWeight: '700', color: '#000000', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Spesifikasi Teknis ({category.toUpperCase()})
                </span>
              </div>

              {category === 'photo' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
                  {['camera', 'lens', 'aperture', 'shutter', 'iso'].map((field) => (
                    <div key={field}>
                      <label style={{ display: 'block', fontSize: '0.62rem', color: 'var(--text-tertiary)', textTransform: 'capitalize' }}>
                        {field}
                      </label>
                      <input
                        type="text"
                        value={meta[field] || ''}
                        onChange={(e) => handleMetaChange(field, e.target.value)}
                        placeholder={field === 'camera' ? 'Sony A7R V' : '—'}
                        style={{
                          width: '100%',
                          padding: '0.45rem 0.65rem',
                          fontSize: '0.72rem',
                          borderRadius: '0.5rem',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          backgroundColor: '#ffffff',
                          color: '#000000'
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {category === 'video' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
                  {['resolution', 'fps', 'color_grading', 'duration'].map((field) => (
                    <div key={field}>
                      <label style={{ display: 'block', fontSize: '0.62rem', color: 'var(--text-tertiary)', textTransform: 'capitalize' }}>
                        {field.replace('_', ' ')}
                      </label>
                      <input
                        type="text"
                        value={meta[field] || ''}
                        onChange={(e) => handleMetaChange(field, e.target.value)}
                        placeholder={field === 'resolution' ? '4K DCI' : '—'}
                        style={{
                          width: '100%',
                          padding: '0.45rem 0.65rem',
                          fontSize: '0.72rem',
                          borderRadius: '0.5rem',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          backgroundColor: '#ffffff',
                          color: '#000000'
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {category === 'design' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
                  {['tools', 'deliverables', 'typefaces'].map((field) => (
                    <div key={field}>
                      <label style={{ display: 'block', fontSize: '0.62rem', color: 'var(--text-tertiary)', textTransform: 'capitalize' }}>
                        {field}
                      </label>
                      <input
                        type="text"
                        value={meta[field] || ''}
                        onChange={(e) => handleMetaChange(field, e.target.value)}
                        placeholder={field === 'tools' ? 'Figma, Blender' : '—'}
                        style={{
                          width: '100%',
                          padding: '0.45rem 0.65rem',
                          fontSize: '0.72rem',
                          borderRadius: '0.5rem',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          backgroundColor: '#ffffff',
                          color: '#000000'
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {category === 'copy' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
                  {['channel', 'tone_of_voice', 'impact'].map((field) => (
                    <div key={field}>
                      <label style={{ display: 'block', fontSize: '0.62rem', color: 'var(--text-tertiary)', textTransform: 'capitalize' }}>
                        {field.replace('_', ' ')}
                      </label>
                      <input
                        type="text"
                        value={meta[field] || ''}
                        onChange={(e) => handleMetaChange(field, e.target.value)}
                        placeholder={field === 'channel' ? 'Digital Campaign' : '—'}
                        style={{
                          width: '100%',
                          padding: '0.45rem 0.65rem',
                          fontSize: '0.72rem',
                          borderRadius: '0.5rem',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          backgroundColor: '#ffffff',
                          color: '#000000'
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Media Uploads, Live Preview, & Publish Settings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Live Studio Card Preview */}
            <div
              style={{
                padding: '1.5rem',
                borderRadius: '1.25rem',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    color: '#000000',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}
                >
                  Live Preview Kartu Showcase
                </span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>Pratinjau Nyata</span>
              </div>

              {/* Miniature WorkTile Card */}
              <div
                style={{
                  borderRadius: '1rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/10',
                    backgroundColor: '#f3f3f5',
                    overflow: 'hidden'
                  }}
                >
                  {thumbUrl ? (
                    <img src={thumbUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-tertiary)'
                      }}
                    >
                      <Layers size={24} />
                    </div>
                  )}

                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px'
                    }}
                  >
                    <Tag tone={category}>{category.toUpperCase()}</Tag>
                  </div>
                </div>

                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: '#000000',
                      margin: 0
                    }}
                  >
                    {title || 'Judul Karya Baru'}
                  </h4>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                    {client || 'Klien Studio'} • {year || '2026'}
                  </div>
                  {summary && (
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0 0', lineHeight: 1.4 }}>
                      {summary}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Media Uploader Section */}
            {category !== 'copy' && (
              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: '1.25rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      color: '#000000',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}
                  >
                    Asset Media & Visual
                  </div>
                  <p style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)', margin: '0.2rem 0 0 0' }}>
                    Unggah foto (WebP auto), video (poster auto), atau tautkan embed YouTube/Vimeo.
                  </p>
                </div>

                <MediaUploader
                  mediaList={mediaList}
                  onChange={setMediaList}
                  projectId={slug || 'new'}
                />
              </div>
            )}

            {/* Publikasi & Urutan */}
            <div
              style={{
                padding: '1.5rem',
                borderRadius: '1.25rem',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  color: '#000000',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                Status & Urutan Tampil
              </div>

              {/* Status Switch */}
              <div
                onClick={() => setIsPublished(!isPublished)}
                style={{
                  padding: '1rem',
                  borderRadius: '0.85rem',
                  backgroundColor: isPublished ? 'var(--color-tertiary-fixed)' : '#f3f3f5',
                  border: isPublished ? '1px solid rgba(0, 33, 21, 0.15)' : '1px solid rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: isPublished ? '#059669' : '#9ca3af'
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: isPublished ? 'var(--color-on-tertiary-fixed)' : '#000000' }}>
                      {isPublished ? 'Terbit ke Galeri Publik' : 'Simpan sebagai Draf'}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: isPublished ? 'rgba(0, 33, 21, 0.8)' : 'var(--text-tertiary)' }}>
                      {isPublished ? 'Karya dapat dilihat oleh semua pengunjung web' : 'Hanya tampak di panel admin'}
                    </div>
                  </div>
                </div>

                <Tag tone={isPublished ? 'video' : 'default'}>
                  {isPublished ? 'LIVE' : 'DRAF'}
                </Tag>
              </div>

              {/* Sort Order Input */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#000000' }}>
                    Urutan Prioritas (Sort Order)
                  </span>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>
                    Angka lebih kecil tampil lebih awal di beranda
                  </div>
                </div>

                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  style={{
                    width: '80px',
                    padding: '0.5rem',
                    textAlign: 'center',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#f3f3f5',
                    color: '#000000'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
