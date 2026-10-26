import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';
import { MediaUploader } from './MediaUploader';
import { ArrowLeft, Save, Sparkles, Check, AlertCircle } from 'lucide-react';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

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
  const [isPublished, setIsPublished] = useState(project?.is_published ?? false);
  const [meta, setMeta] = useState(project?.meta || {});
  const [mediaList, setMediaList] = useState(project?.project_media || []);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-generate slug dari judul jika belum diedit manual
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
      setErrorMsg('Judul dan slug wajib diisi.');
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

  return (
    <div
      style={{
        padding: 'var(--space-6)',
        backgroundColor: 'var(--bg-elevated)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Header Form */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-6)',
          paddingBottom: 'var(--space-4)',
          borderBottom: '1px solid var(--border-subtle)'
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: 'var(--text-sm)',
            fontWeight: '600',
            color: 'var(--text-secondary)'
          }}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Daftar Karya</span>
        </button>

        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: '800', color: 'var(--text-primary)' }}>
          {isEditing ? 'Ubah Data Karya' : 'Tambah Karya Baru'}
        </h2>
      </div>

      {errorMsg && (
        <div
          style={{
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--badge-video-bg)',
            color: 'var(--badge-video)',
            fontSize: 'var(--text-xs)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-6)'
          }}
        >
          <AlertCircle size={16} flexShrink={0} />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* Row 1: Judul & Slug */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: '600', marginBottom: 'var(--space-1)', color: 'var(--text-secondary)' }}>
              Judul Karya *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="Contoh: Lumina Botanical Editorial"
              style={{
                width: '100%',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                backgroundColor: 'var(--bg-secondary)',
                fontSize: 'var(--text-sm)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: '600', marginBottom: 'var(--space-1)', color: 'var(--text-secondary)' }}>
              Slug URL *
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="lumina-botanical-editorial"
              style={{
                width: '100%',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                backgroundColor: 'var(--bg-secondary)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
        </div>

        {/* Row 2: Kategori, Klien, Tahun, Peran */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: '600', marginBottom: 'var(--space-1)', color: 'var(--text-secondary)' }}>
              Kategori Karya *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                backgroundColor: 'var(--bg-secondary)',
                fontSize: 'var(--text-sm)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="photo">Fotografi (Photo)</option>
              <option value="video">Videografi (Video)</option>
              <option value="design">Desain Grafis (Design)</option>
              <option value="copy">Copywriting (Copy)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: '600', marginBottom: 'var(--space-1)', color: 'var(--text-secondary)' }}>
              Klien / Brand
            </label>
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Contoh: Velos Performance"
              style={{
                width: '100%',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                backgroundColor: 'var(--bg-secondary)',
                fontSize: 'var(--text-sm)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: '600', marginBottom: 'var(--space-1)', color: 'var(--text-secondary)' }}>
              Tahun
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="2024"
              style={{
                width: '100%',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                backgroundColor: 'var(--bg-secondary)',
                fontSize: 'var(--text-sm)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: '600', marginBottom: 'var(--space-1)', color: 'var(--text-secondary)' }}>
              Peran Anda
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Contoh: Director & Colorist"
              style={{
                width: '100%',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                backgroundColor: 'var(--bg-secondary)',
                fontSize: 'var(--text-sm)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
        </div>

        {/* Row 3: Ringkasan & Excerpt */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: '600', marginBottom: 'var(--space-1)', color: 'var(--text-secondary)' }}>
              Ringkasan Singkat (Summary)
            </label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Deskripsi 1-2 kalimat untuk kartu karya..."
              style={{
                width: '100%',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                backgroundColor: 'var(--bg-secondary)',
                fontSize: 'var(--text-sm)',
                color: 'var(--text-primary)',
                resize: 'vertical'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: '600', marginBottom: 'var(--space-1)', color: 'var(--text-secondary)' }}>
              Kutipan Penonjol (Excerpt / Headline)
            </label>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Kalimat kunci atau quote berkesan..."
              style={{
                width: '100%',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-medium)',
                backgroundColor: 'var(--bg-secondary)',
                fontSize: 'var(--text-sm)',
                color: 'var(--text-primary)',
                resize: 'vertical'
              }}
            />
          </div>
        </div>

        {/* Row 4: Deskripsi Lengkap */}
        <div>
          <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: '600', marginBottom: 'var(--space-1)', color: 'var(--text-secondary)' }}>
            Deskripsi Lengkap / Teks Narasi Copywriting
          </label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan proses kreasi, tantangan, atau masukkan teks lengkap naskah copywriting..."
            style={{
              width: '100%',
              padding: 'var(--space-3)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-medium)',
              backgroundColor: 'var(--bg-secondary)',
              fontSize: 'var(--text-sm)',
              color: 'var(--text-primary)',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Field Dinamis Metadata JSONB berdasarkan Kategori */}
        <div
          style={{
            padding: 'var(--space-5)',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ fontSize: 'var(--text-xs)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-highlight)', marginBottom: 'var(--space-4)' }}>
            Metadata Khusus: {category.toUpperCase()} (Tersimpan sebagai JSONB)
          </div>

          {category === 'photo' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
              {['camera', 'lens', 'aperture', 'shutter', 'iso', 'lighting'].map((field) => (
                <div key={field}>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', textTransform: 'capitalize', color: 'var(--text-secondary)', marginBottom: '2px' }}>
                    {field}
                  </label>
                  <input
                    type="text"
                    value={meta[field] || ''}
                    onChange={(e) => handleMetaChange(field, e.target.value)}
                    placeholder={`e.g. ${field === 'camera' ? 'Sony A7R V' : field === 'lens' ? '90mm Macro' : ''}`}
                    style={{
                      width: '100%',
                      padding: 'var(--space-2) var(--space-3)',
                      fontSize: 'var(--text-xs)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-medium)',
                      backgroundColor: 'var(--bg-elevated)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {category === 'video' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
              {['resolution', 'fps', 'color_grading', 'duration', 'sound_design'].map((field) => (
                <div key={field}>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', textTransform: 'capitalize', color: 'var(--text-secondary)', marginBottom: '2px' }}>
                    {field.replace('_', ' ')}
                  </label>
                  <input
                    type="text"
                    value={meta[field] || ''}
                    onChange={(e) => handleMetaChange(field, e.target.value)}
                    placeholder={`e.g. ${field === 'resolution' ? '4K DCI' : field === 'duration' ? '90s' : ''}`}
                    style={{
                      width: '100%',
                      padding: 'var(--space-2) var(--space-3)',
                      fontSize: 'var(--text-xs)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-medium)',
                      backgroundColor: 'var(--bg-elevated)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {category === 'design' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
              {['tools', 'deliverables', 'typefaces', 'color_palette'].map((field) => (
                <div key={field}>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', textTransform: 'capitalize', color: 'var(--text-secondary)', marginBottom: '2px' }}>
                    {field.replace('_', ' ')}
                  </label>
                  <input
                    type="text"
                    value={meta[field] || ''}
                    onChange={(e) => handleMetaChange(field, e.target.value)}
                    placeholder={`e.g. ${field === 'tools' ? 'Illustrator, Figma' : ''}`}
                    style={{
                      width: '100%',
                      padding: 'var(--space-2) var(--space-3)',
                      fontSize: 'var(--text-xs)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-medium)',
                      backgroundColor: 'var(--bg-elevated)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {category === 'copy' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
              {['channel', 'objective', 'tone_of_voice', 'impact'].map((field) => (
                <div key={field}>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', textTransform: 'capitalize', color: 'var(--text-secondary)', marginBottom: '2px' }}>
                    {field.replace('_', ' ')}
                  </label>
                  <input
                    type="text"
                    value={meta[field] || ''}
                    onChange={(e) => handleMetaChange(field, e.target.value)}
                    placeholder={`e.g. ${field === 'objective' ? 'Brand Affinity' : ''}`}
                    style={{
                      width: '100%',
                      padding: 'var(--space-2) var(--space-3)',
                      fontSize: 'var(--text-xs)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-medium)',
                      backgroundColor: 'var(--bg-elevated)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Media Uploader Section (Foto, Video, Desain) */}
        {category !== 'copy' && (
          <div
            style={{
              padding: 'var(--space-5)',
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: '700', marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>
              Pengelolaan File Media & Poster
            </div>
            <MediaUploader
              mediaList={mediaList}
              onChange={setMediaList}
              projectId={slug || 'new'}
            />
          </div>
        )}

        {/* Pengaturan Publikasi & Urutan */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--space-4)',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            gap: 'var(--space-4)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--badge-copy)' }}
              />
              <span style={{ fontWeight: '600', fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                Terbitkan ke Galeri Publik (is_published)
              </span>
            </label>
            <Tag tone={isPublished ? 'copy' : 'default'}>
              {isPublished ? 'LIVE TERBIT' : 'DRAF (TERSEMBUNYI)'}
            </Tag>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <label style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: 'var(--text-secondary)' }}>
              Urutan Tampil (sort_order):
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={{
                width: '70px',
                padding: 'var(--space-1) var(--space-2)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-medium)',
                backgroundColor: 'var(--bg-elevated)',
                fontSize: 'var(--text-xs)',
                textAlign: 'center'
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
          <Button variant="secondary" size="md" onClick={onCancel}>
            Batal
          </Button>
          <Button variant="primary" size="md" type="submit" disabled={saving} icon={Save}>
            {saving ? 'Menyimpan...' : isEditing ? 'Perbarui Karya' : 'Simpan Karya Baru'}
          </Button>
        </div>
      </form>
    </div>
  );
}
