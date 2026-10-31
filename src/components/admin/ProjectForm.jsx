import React, { useState } from 'react';
import { Tag } from '../ui/Tag';
import { MediaUploader } from './MediaUploader';
import { getStoragePublicUrl } from '../../lib/queries';
import {
  ArrowLeft,
  Save,
  AlertCircle,
  Camera,
  Video,
  Palette,
  PenTool,
  Layers,
  Sliders
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

const inputBaseStyle = {
  width: '100%',
  padding: '0.7rem 0.9rem',
  fontSize: '13px',
  borderRadius: 'var(--radius-lg)',
  border: '1px solid rgba(194, 198, 211, 0.55)',
  backgroundColor: 'var(--color-surface-low)',
  color: 'var(--color-on-surface)',
  outline: 'none',
  transition: 'all 0.2s ease'
};

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

  const handleFocus = (e) => {
    e.target.style.borderColor = 'var(--color-primary-container)';
    e.target.style.backgroundColor = '#ffffff';
    e.target.style.boxShadow = '0 0 0 3px rgba(0, 82, 155, 0.12)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = 'rgba(194, 198, 211, 0.55)';
    e.target.style.backgroundColor = 'var(--color-surface-low)';
    e.target.style.boxShadow = 'none';
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
          top: '84px',
          zIndex: 40,
          padding: '1.1rem 1.5rem',
          borderRadius: 'var(--radius-3xl)',
          backgroundColor: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(194, 198, 211, 0.45)',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <button
            type="button"
            onClick={onCancel}
            className="font-label-mono-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-surface-container)',
              border: '1px solid rgba(194, 198, 211, 0.45)',
              color: 'var(--color-on-surface-variant)',
              fontSize: '11px',
              fontWeight: '600',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.backgroundColor = 'var(--color-primary-container)';
              e.currentTarget.style.borderColor = 'var(--color-primary-container)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-on-surface-variant)';
              e.currentTarget.style.backgroundColor = 'var(--color-surface-container)';
              e.currentTarget.style.borderColor = 'rgba(194, 198, 211, 0.45)';
            }}
          >
            <ArrowLeft size={13} />
            <span>Kembali ke Daftar</span>
          </button>

          <div>
            <span
              className="font-label-mono-sm"
              style={{
                display: 'block',
                color: 'var(--color-primary-container)',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              {isEditing ? `ARCHIVE ID: ${project.id}` : 'NEW STUDIO ARCHIVE ENTRY'}
            </span>
            <h2
              className="font-headline-sm"
              style={{
                fontSize: '1.15rem',
                fontWeight: '800',
                color: 'var(--color-on-surface)',
                margin: 0
              }}
            >
              {isEditing ? `Ubah Karya: ${title || 'Tanpa Judul'}` : 'Buat Entri Karya Baru'}
            </h2>
          </div>
        </div>

        {/* Top Right Save & Cancel */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            type="button"
            onClick={onCancel}
            className="font-label-mono-sm"
            style={{
              padding: '0.6rem 1.15rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-surface-container)',
              border: '1px solid rgba(194, 198, 211, 0.45)',
              color: 'var(--color-on-surface-variant)',
              fontSize: '11px',
              fontWeight: '600',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="font-label-mono-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.6rem 1.4rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary-container)',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              border: 'none',
              cursor: saving ? 'not-allowed' : 'pointer',
              boxShadow: 'var(--shadow-md)',
              transition: 'all 200ms ease'
            }}
            onMouseEnter={(e) => {
              if (!saving) e.currentTarget.style.backgroundColor = 'var(--color-primary)';
            }}
            onMouseLeave={(e) => {
              if (!saving) e.currentTarget.style.backgroundColor = 'var(--color-primary-container)';
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
            padding: '0.9rem 1.25rem',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--color-tertiary-fixed)',
            border: '1px solid rgba(168, 0, 16, 0.25)',
            color: 'var(--color-tertiary)',
            fontSize: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}
        >
          <AlertCircle size={16} style={{ flexShrink: 0, color: '#ED1C24' }} />
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
                borderRadius: 'var(--radius-3xl)',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(194, 198, 211, 0.35)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div>
                <span
                  className="font-label-mono-sm"
                  style={{
                    color: 'var(--color-primary-container)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    display: 'block'
                  }}
                >
                  01 / DISCIPLINE CLASSIFICATION
                </span>
                <h3 className="font-headline-sm" style={{ margin: '2px 0 0 0', color: 'var(--color-on-surface)', fontWeight: '700' }}>
                  Pilih Disiplin / Kategori Karya
                </h3>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '0.75rem'
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
                        padding: '1rem 0.85rem',
                        borderRadius: 'var(--radius-2xl)',
                        border: isSelected
                          ? '1.5px solid var(--color-primary-container)'
                          : '1px solid rgba(194, 198, 211, 0.4)',
                        backgroundColor: isSelected
                          ? 'var(--color-secondary-container)'
                          : 'var(--color-section-bg)',
                        color: isSelected ? 'var(--color-on-secondary-fixed)' : 'var(--color-on-surface-variant)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '0.4rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: isSelected
                            ? 'var(--color-primary-container)'
                            : '#ffffff',
                          color: isSelected ? '#ffffff' : 'var(--color-primary-container)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: isSelected ? 'var(--color-primary)' : 'var(--color-on-surface)' }}>
                        {cat.label}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--color-secondary)', lineHeight: 1.3 }}>
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
                borderRadius: 'var(--radius-3xl)',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(194, 198, 211, 0.35)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div>
                <span
                  className="font-label-mono-sm"
                  style={{
                    color: 'var(--color-primary-container)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    display: 'block'
                  }}
                >
                  02 / IDENTITY & SLUG
                </span>
                <h3 className="font-headline-sm" style={{ margin: '2px 0 0 0', color: 'var(--color-on-surface)', fontWeight: '700' }}>
                  Judul & Identitas URL
                </h3>
              </div>

              <div>
                <label className="font-label-mono-sm" style={{ display: 'block', fontSize: '11px', color: 'var(--color-secondary)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  Judul Portofolio *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Contoh: Nova Spatial OS (Vision Pro)"
                  style={{
                    ...inputBaseStyle,
                    fontSize: '14px',
                    fontWeight: '700'
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div>
                <label className="font-label-mono-sm" style={{ display: 'block', fontSize: '11px', color: 'var(--color-secondary)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  Slug URL (Otomatis) *
                </label>
                <div style={{ position: 'relative' }}>
                  <span
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '12px',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-secondary)'
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
                      ...inputBaseStyle,
                      paddingLeft: '1.85rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px'
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Klien, Tahun, Peran */}
            <div
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-3xl)',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(194, 198, 211, 0.35)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div>
                <span
                  className="font-label-mono-sm"
                  style={{
                    color: 'var(--color-primary-container)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    display: 'block'
                  }}
                >
                  03 / PRODUCTION CREDITS
                </span>
                <h3 className="font-headline-sm" style={{ margin: '2px 0 0 0', color: 'var(--color-on-surface)', fontWeight: '700' }}>
                  Metadata Klien & Produksi
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.85rem' }}>
                <div>
                  <label className="font-label-mono-sm" style={{ display: 'block', fontSize: '11px', color: 'var(--color-secondary)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                    Klien / Brand
                  </label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="Contoh: Spatial Labs Tokyo"
                    style={inputBaseStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                <div>
                  <label className="font-label-mono-sm" style={{ display: 'block', fontSize: '11px', color: 'var(--color-secondary)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                    Tahun Rilis
                  </label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2026"
                    style={inputBaseStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                <div>
                  <label className="font-label-mono-sm" style={{ display: 'block', fontSize: '11px', color: 'var(--color-secondary)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                    Peran Utama
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Contoh: Creative Director"
                    style={inputBaseStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Ringkasan & Narasi */}
            <div
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-3xl)',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(194, 198, 211, 0.35)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div>
                <span
                  className="font-label-mono-sm"
                  style={{
                    color: 'var(--color-primary-container)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    display: 'block'
                  }}
                >
                  04 / NARRATIVE ARCHITECTURE
                </span>
                <h3 className="font-headline-sm" style={{ margin: '2px 0 0 0', color: 'var(--color-on-surface)', fontWeight: '700' }}>
                  Narasi & Storytelling Karya
                </h3>
              </div>

              <div>
                <label className="font-label-mono-sm" style={{ display: 'block', fontSize: '11px', color: 'var(--color-secondary)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  Ringkasan Kartu (Summary) - Tampil di Showcase
                </label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat untuk kartu portofolio..."
                  style={{ ...inputBaseStyle, resize: 'vertical' }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div>
                <label className="font-label-mono-sm" style={{ display: 'block', fontSize: '11px', color: 'var(--color-secondary)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  Deskripsi Lengkap / Naskah
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ceritakan visi desain, proses produksi, serta hasil pencapaian..."
                  style={{ ...inputBaseStyle, resize: 'vertical' }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            {/* Section 5: Metadata Khusus Disiplin (JSONB) - Dark Navy Stitch Card */}
            <div
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-3xl)',
                backgroundColor: '#0A2540',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sliders size={14} color="#7AC142" />
                <span
                  className="font-label-mono-sm"
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: 'var(--color-secondary-fixed)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}
                >
                  05 / Spesifikasi Teknis ({category.toUpperCase()})
                </span>
              </div>

              {category === 'photo' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.65rem' }}>
                  {['camera', 'lens', 'aperture', 'shutter', 'iso'].map((field) => (
                    <div key={field}>
                      <label className="font-label-mono-sm" style={{ display: 'block', fontSize: '10px', color: 'var(--color-outline-variant)', textTransform: 'uppercase', marginBottom: '4px' }}>
                        {field}
                      </label>
                      <input
                        type="text"
                        value={meta[field] || ''}
                        onChange={(e) => handleMetaChange(field, e.target.value)}
                        placeholder={field === 'camera' ? 'Sony A7R V' : '—'}
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.7rem',
                          fontSize: '12px',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          color: '#ffffff',
                          outline: 'none'
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {category === 'video' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.65rem' }}>
                  {['resolution', 'fps', 'color_grading', 'duration'].map((field) => (
                    <div key={field}>
                      <label className="font-label-mono-sm" style={{ display: 'block', fontSize: '10px', color: 'var(--color-outline-variant)', textTransform: 'uppercase', marginBottom: '4px' }}>
                        {field.replace('_', ' ')}
                      </label>
                      <input
                        type="text"
                        value={meta[field] || ''}
                        onChange={(e) => handleMetaChange(field, e.target.value)}
                        placeholder={field === 'resolution' ? '4K DCI' : '—'}
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.7rem',
                          fontSize: '12px',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          color: '#ffffff',
                          outline: 'none'
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {category === 'design' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.65rem' }}>
                  {['tools', 'deliverables', 'typefaces'].map((field) => (
                    <div key={field}>
                      <label className="font-label-mono-sm" style={{ display: 'block', fontSize: '10px', color: 'var(--color-outline-variant)', textTransform: 'uppercase', marginBottom: '4px' }}>
                        {field}
                      </label>
                      <input
                        type="text"
                        value={meta[field] || ''}
                        onChange={(e) => handleMetaChange(field, e.target.value)}
                        placeholder={field === 'tools' ? 'Figma, Blender' : '—'}
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.7rem',
                          fontSize: '12px',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          color: '#ffffff',
                          outline: 'none'
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {category === 'copy' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.65rem' }}>
                  {['channel', 'tone_of_voice', 'impact'].map((field) => (
                    <div key={field}>
                      <label className="font-label-mono-sm" style={{ display: 'block', fontSize: '10px', color: 'var(--color-outline-variant)', textTransform: 'uppercase', marginBottom: '4px' }}>
                        {field.replace('_', ' ')}
                      </label>
                      <input
                        type="text"
                        value={meta[field] || ''}
                        onChange={(e) => handleMetaChange(field, e.target.value)}
                        placeholder={field === 'channel' ? 'Digital Campaign' : '—'}
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.7rem',
                          fontSize: '12px',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          color: '#ffffff',
                          outline: 'none'
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
                borderRadius: 'var(--radius-3xl)',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(194, 198, 211, 0.35)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  className="font-label-mono-sm"
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: 'var(--color-primary-container)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}
                >
                  Live Preview Kartu Showcase
                </span>
                <span
                  className="font-label-mono-sm"
                  style={{
                    fontSize: '10px',
                    color: 'var(--color-secondary)',
                    backgroundColor: 'var(--color-surface-container)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  STITCH BENTO PREVIEW
                </span>
              </div>

              {/* Miniature WorkTile Card */}
              <div
                style={{
                  borderRadius: 'var(--radius-2xl)',
                  backgroundColor: 'var(--color-section-bg)',
                  border: '1px solid rgba(194, 198, 211, 0.45)',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/10',
                    backgroundColor: '#0A2540',
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
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        color: 'var(--color-secondary-fixed)'
                      }}
                    >
                      <Layers size={24} />
                      <span className="font-label-mono-sm" style={{ fontSize: '10px' }}>NO MEDIA UPLOADED</span>
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

                <div style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div className="font-label-mono-sm" style={{ fontSize: '10px', color: 'var(--color-secondary)', textTransform: 'uppercase' }}>
                    {client || 'Klien Studio'} • {year || '2026'}
                  </div>
                  <h4
                    className="font-headline-sm"
                    style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: 'var(--color-on-surface)',
                      margin: 0
                    }}
                  >
                    {title || 'Judul Karya Baru'}
                  </h4>
                  {summary && (
                    <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', margin: '0.2rem 0 0 0', lineHeight: 1.5 }}>
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
                  borderRadius: 'var(--radius-3xl)',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(194, 198, 211, 0.35)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <div>
                  <span
                    className="font-label-mono-sm"
                    style={{
                      color: 'var(--color-primary-container)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      display: 'block'
                    }}
                  >
                    ASSET PIPELINE
                  </span>
                  <h3 className="font-headline-sm" style={{ margin: '2px 0 0 0', color: 'var(--color-on-surface)', fontWeight: '700' }}>
                    Asset Media & Visual
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', margin: '0.25rem 0 0 0' }}>
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
                borderRadius: 'var(--radius-3xl)',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(194, 198, 211, 0.35)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div>
                <span
                  className="font-label-mono-sm"
                  style={{
                    color: 'var(--color-primary-container)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    display: 'block'
                  }}
                >
                  PUBLICATION STATUS
                </span>
                <h3 className="font-headline-sm" style={{ margin: '2px 0 0 0', color: 'var(--color-on-surface)', fontWeight: '700' }}>
                  Status & Urutan Tampil
                </h3>
              </div>

              {/* Status Switch */}
              <div
                onClick={() => setIsPublished(!isPublished)}
                style={{
                  padding: '1rem 1.15rem',
                  borderRadius: 'var(--radius-xl)',
                  backgroundColor: isPublished ? 'rgba(122, 193, 66, 0.1)' : 'var(--color-surface-low)',
                  border: isPublished ? '1px solid rgba(122, 193, 66, 0.45)' : '1px solid rgba(194, 198, 211, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    className={isPublished ? 'beacon-ping' : ''}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: isPublished ? '#7AC142' : 'var(--color-outline)'
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-on-surface)' }}>
                      {isPublished ? 'Terbit ke Galeri Publik' : 'Simpan sebagai Draf'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
                      {isPublished ? 'Karya dapat dilihat oleh semua pengunjung web' : 'Hanya tampak di panel admin'}
                    </div>
                  </div>
                </div>

                <Tag tone={isPublished ? 'copy' : 'default'}>
                  {isPublished ? 'LIVE' : 'DRAF'}
                </Tag>
              </div>

              {/* Sort Order Input */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-on-surface)' }}>
                    Urutan Prioritas (Sort Order)
                  </span>
                  <div style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
                    Angka lebih kecil tampil lebih awal di beranda
                  </div>
                </div>

                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  style={{
                    width: '84px',
                    padding: '0.55rem',
                    textAlign: 'center',
                    fontSize: '13px',
                    fontWeight: '700',
                    fontFamily: 'var(--font-mono)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(194, 198, 211, 0.55)',
                    backgroundColor: 'var(--color-surface-low)',
                    color: 'var(--color-on-surface)'
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
