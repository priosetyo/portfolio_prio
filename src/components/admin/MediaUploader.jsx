import React, { useState } from 'react';
import { resizeImageToWebP, captureVideoPoster } from '../../lib/image';
import { uploadMediaFile, getStoragePublicUrl } from '../../lib/queries';
import { Tag } from '../ui/Tag';
import { Upload, Video, Link, Trash2, AlertCircle, Loader2 } from 'lucide-react';

export function MediaUploader({ mediaList = [], onChange, projectId = 'temp' }) {
  const [uploading, setUploading] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [embedAlt, setEmbedAlt] = useState('');
  const [embedDuration, setEmbedDuration] = useState('');
  const [showEmbedForm, setShowEmbedForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle upload file (Image or Video)
  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg('');
    setUploading(true);
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    try {
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 8);

      if (isImage) {
        // 1. Kompres WebP 800px (Thumbnail) & 2400px (High-res)
        setProgressMsg('Mengompresi gambar ke WebP (800px & 2400px)...');
        const [thumbResult, fullResult] = await Promise.all([
          resizeImageToWebP(file, 800, 0.8),
          resizeImageToWebP(file, 2400, 0.85)
        ]);

        setProgressMsg('Mengunggah ke Supabase Storage (portfolio-media)...');
        const thumbPath = `photo/${projectId}/${timestamp}-${randomId}-thumb.webp`;
        const fullPath = `photo/${projectId}/${timestamp}-${randomId}-full.webp`;

        // Upload ke Supabase Storage
        const [thumbUpload, fullUpload] = await Promise.all([
          uploadMediaFile(thumbPath, thumbResult.blob),
          uploadMediaFile(fullPath, fullResult.blob)
        ]);

        const fullUrl = fullUpload?.publicUrl || fullPath;
        const thumbUrl = thumbUpload?.publicUrl || thumbPath;

        // Buat objek media baru dengan URL permanen Supabase
        const newMedia = {
          id: `media-${timestamp}`,
          kind: 'image',
          storage_path: fullUrl,
          thumb_path: thumbUrl,
          width: fullResult.width,
          height: fullResult.height,
          alt_text: file.name.replace(/\.[^/.]+$/, ''), // Default dari nama file
          sort_order: mediaList.length + 1
        };

        onChange([...mediaList, newMedia]);
      } else if (isVideo) {
        // 2. Ekstrak 1 frame poster video
        setProgressMsg('Mengekstrak frame poster video...');
        const posterResult = await captureVideoPoster(file);

        setProgressMsg('Memproses & mengunggah video...');
        const posterPath = `video/${projectId}/${timestamp}-${randomId}-poster.webp`;
        const videoPath = `video/${projectId}/${timestamp}-${randomId}-video.mp4`;

        const [posterUpload, videoUpload] = await Promise.all([
          uploadMediaFile(posterPath, posterResult.blob),
          uploadMediaFile(videoPath, file, file.type || 'video/mp4')
        ]);

        const videoUrl = videoUpload?.publicUrl || videoPath;
        const posterUrl = posterUpload?.publicUrl || posterPath;

        const newMedia = {
          id: `media-${timestamp}`,
          kind: 'video',
          storage_path: videoUrl,
          poster_path: posterUrl,
          width: posterResult.width,
          height: posterResult.height,
          duration_sec: posterResult.duration,
          alt_text: file.name.replace(/\.[^/.]+$/, ''),
          sort_order: mediaList.length + 1
        };

        onChange([...mediaList, newMedia]);
      }
    } catch (err) {
      console.error('Error handling media file:', err);
      let msg = err.message || 'Gagal memproses file media';
      if (
        msg.includes('row-level security') ||
        msg.includes('policy') ||
        msg.includes('403') ||
        msg.includes('Unauthorized') ||
        msg.includes('violates')
      ) {
        msg = 'Upload ditolak oleh Supabase Storage RLS Policy. Mohon jalankan SQL policy INSERT untuk bucket "portfolio-media" di Supabase SQL Editor.';
      } else if (msg.includes('Bucket not found')) {
        msg = 'Bucket "portfolio-media" tidak ditemukan di Supabase Storage.';
      }
      setErrorMsg(msg);
    } finally {
      setUploading(false);
      setProgressMsg('');
      e.target.value = '';
    }
  };

  // Handle tambah embed YouTube / Vimeo
  const handleAddEmbed = (e) => {
    e.preventDefault();
    if (!embedUrl) return;

    const newMedia = {
      id: `embed-${Date.now()}`,
      kind: 'embed',
      external_url: embedUrl,
      alt_text: embedAlt || 'Video Promosi Komersial',
      duration_sec: parseInt(embedDuration, 10) || null,
      sort_order: mediaList.length + 1
    };

    onChange([...mediaList, newMedia]);
    setEmbedUrl('');
    setEmbedAlt('');
    setEmbedDuration('');
    setShowEmbedForm(false);
  };

  // Update alt text untuk media tertentu
  const handleAltChange = (id, newAlt) => {
    onChange(
      mediaList.map((m) => (m.id === id ? { ...m, alt_text: newAlt } : m))
    );
  };

  // Hapus media
  const handleRemoveMedia = (id) => {
    onChange(mediaList.filter((m) => m.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Upload Buttons & Options */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        <label
          className="font-label-mono-sm"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-primary-container)',
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            cursor: uploading ? 'not-allowed' : 'pointer',
            opacity: uploading ? 0.7 : 1,
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 200ms ease'
          }}
        >
          {uploading ? <Loader2 size={15} className="spin" /> : <Upload size={15} />}
          <span>{uploading ? progressMsg || 'Mengunggah...' : 'Pilih Foto / Video'}</span>
          <input
            type="file"
            accept="image/*,video/*"
            disabled={uploading}
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </label>

        <button
          type="button"
          onClick={() => setShowEmbedForm(!showEmbedForm)}
          className="font-label-mono-sm"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.65rem 1.15rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-surface-container)',
            border: '1px solid rgba(194, 198, 211, 0.5)',
            color: 'var(--color-primary-container)',
            fontSize: '11px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            cursor: 'pointer',
            transition: 'all 200ms ease'
          }}
        >
          <Link size={14} />
          <span>{showEmbedForm ? 'Tutup Input Embed' : 'Tautkan YouTube / Vimeo'}</span>
        </button>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div
          style={{
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--color-tertiary-fixed)',
            border: '1px solid rgba(168, 0, 16, 0.25)',
            color: 'var(--color-tertiary)',
            fontSize: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <AlertCircle size={15} color="#ED1C24" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Embed Input Form */}
      {showEmbedForm && (
        <div
          style={{
            padding: '1.25rem',
            backgroundColor: 'var(--color-section-bg)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(194, 198, 211, 0.45)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          <div
            className="font-label-mono-sm"
            style={{
              fontWeight: '700',
              fontSize: '11px',
              textTransform: 'uppercase',
              color: 'var(--color-primary-container)',
              letterSpacing: '0.06em'
            }}
          >
            Tautan Video Eksternal (YouTube / Vimeo)
          </div>
          <input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={embedUrl}
            onChange={(e) => setEmbedUrl(e.target.value)}
            style={{
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(194, 198, 211, 0.5)',
              backgroundColor: '#ffffff',
              fontSize: '12px',
              color: 'var(--color-on-surface)',
              outline: 'none'
            }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
            <input
              type="text"
              placeholder="Alt text / Judul video..."
              value={embedAlt}
              onChange={(e) => setEmbedAlt(e.target.value)}
              style={{
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(194, 198, 211, 0.5)',
                backgroundColor: '#ffffff',
                fontSize: '12px',
                color: 'var(--color-on-surface)',
                outline: 'none'
              }}
            />
            <input
              type="number"
              placeholder="Durasi (detik), contoh: 90"
              value={embedDuration}
              onChange={(e) => setEmbedDuration(e.target.value)}
              style={{
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(194, 198, 211, 0.5)',
                backgroundColor: '#ffffff',
                fontSize: '12px',
                color: 'var(--color-on-surface)',
                outline: 'none'
              }}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleAddEmbed}
              className="font-label-mono-sm"
              style={{
                padding: '0.55rem 1.15rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary-container)',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              Simpan Tautan Video
            </button>
          </div>
        </div>
      )}

      {/* Daftar Media Terpasang */}
      {mediaList.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <div
            className="font-label-mono-sm"
            style={{
              fontSize: '11px',
              fontWeight: '700',
              color: 'var(--color-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            MEDIA TERKAIT ({mediaList.length}) — Teks Alt wajib diisi untuk kepatuhan aksesibilitas:
          </div>

          {mediaList.map((media, idx) => {
            const isImg = media.kind === 'image';
            const rawPreview = media.thumb_path || media.storage_path || media.poster_path;
            const previewUrl = getStoragePublicUrl(rawPreview);
            const hasAlt = Boolean(media.alt_text?.trim());

            return (
              <div
                key={media.id || idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-xl)',
                  backgroundColor: 'var(--color-section-bg)',
                  border: `1px solid ${hasAlt ? 'rgba(194, 198, 211, 0.45)' : '#ED1C24'}`
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: '64px',
                    height: '48px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-surface-container)',
                    overflow: 'hidden',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(194, 198, 211, 0.4)'
                  }}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Thumbnail"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Video size={18} color="var(--color-secondary)" />
                  )}
                </div>

                {/* Alt Text Input */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '4px' }}>
                    <Tag tone={isImg ? 'photo' : 'video'}>
                      {media.kind.toUpperCase()} #{idx + 1}
                    </Tag>
                    {!hasAlt && (
                      <span
                        className="font-label-mono-sm"
                        style={{ fontSize: '10px', color: '#ED1C24', fontWeight: '700' }}
                      >
                        *Wajib isi Alt Text
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    value={media.alt_text || ''}
                    onChange={(e) => handleAltChange(media.id, e.target.value)}
                    placeholder="Deskripsi gambar/video untuk pembaca layar (Alt text)..."
                    style={{
                      width: '100%',
                      padding: '0.45rem 0.65rem',
                      fontSize: '12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(194, 198, 211, 0.5)',
                      backgroundColor: '#ffffff',
                      color: 'var(--color-on-surface)',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveMedia(media.id)}
                  title="Hapus Media"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(237, 28, 36, 0.08)',
                    border: '1px solid rgba(237, 28, 36, 0.2)',
                    color: '#ED1C24',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
