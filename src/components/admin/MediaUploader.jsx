import React, { useState } from 'react';
import { resizeImageToWebP, captureVideoPoster } from '../../lib/image';
import { uploadMediaFile, getStoragePublicUrl } from '../../lib/queries';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';
import { Upload, Image as ImageIcon, Video, Link, Trash2, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {/* Upload Buttons & Options */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.6rem 1.25rem',
            borderRadius: '0.75rem',
            backgroundColor: '#000000',
            color: '#ffffff',
            fontSize: 'var(--text-xs)',
            fontWeight: '700',
            cursor: uploading ? 'not-allowed' : 'pointer',
            opacity: uploading ? 0.7 : 1,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'opacity 0.15s ease'
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
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.6rem 1rem',
            borderRadius: '0.75rem',
            backgroundColor: '#f3f3f5',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            color: '#1b1735',
            fontSize: 'var(--text-xs)',
            fontWeight: '600',
            cursor: 'pointer'
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
            borderRadius: '0.75rem',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            fontSize: 'var(--text-xs)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <AlertCircle size={14} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Embed Input Form */}
      {showEmbedForm && (
        <div
          style={{
            padding: '1.25rem',
            backgroundColor: '#f9f9fb',
            borderRadius: '1rem',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          <div style={{ fontWeight: '700', fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: '#000000', letterSpacing: '0.04em' }}>
            Tautan Video Eksternal (YouTube / Vimeo)
          </div>
          <input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={embedUrl}
            onChange={(e) => setEmbedUrl(e.target.value)}
            style={{
              padding: '0.65rem 0.85rem',
              borderRadius: '0.65rem',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              backgroundColor: '#ffffff',
              fontSize: 'var(--text-xs)',
              color: '#000000',
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
                borderRadius: '0.65rem',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                backgroundColor: '#ffffff',
                fontSize: 'var(--text-xs)',
                color: '#000000',
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
                borderRadius: '0.65rem',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                backgroundColor: '#ffffff',
                fontSize: 'var(--text-xs)',
                color: '#000000',
                outline: 'none'
              }}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleAddEmbed}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.65rem',
                backgroundColor: '#000000',
                color: '#ffffff',
                fontSize: 'var(--text-xs)',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Simpan Tautan Video
            </button>
          </div>
        </div>
      )}

      {/* Daftar Media Terpasang */}
      {mediaList.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
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
                  borderRadius: '0.85rem',
                  backgroundColor: '#f9f9fb',
                  border: `1px solid ${hasAlt ? 'rgba(0, 0, 0, 0.06)' : '#dc2626'}`
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: '64px',
                    height: '48px',
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
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Thumbnail"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Video size={18} color="#5b5866" />
                  )}
                </div>

                {/* Alt Text Input */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '4px' }}>
                    <Tag tone={isImg ? 'photo' : 'video'}>
                      {media.kind.toUpperCase()} #{idx + 1}
                    </Tag>
                    {!hasAlt && (
                      <span style={{ fontSize: '0.68rem', color: '#dc2626', fontWeight: '700' }}>
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
                      fontSize: 'var(--text-xs)',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      backgroundColor: '#ffffff',
                      color: 'var(--text-primary)',
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
                    borderRadius: '0.5rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#dc2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={16} />
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
