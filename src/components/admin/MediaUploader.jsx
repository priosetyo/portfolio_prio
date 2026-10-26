import React, { useState } from 'react';
import { resizeImageToWebP, captureVideoPoster } from '../../lib/image';
import { uploadMediaFile } from '../../lib/queries';
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

        setProgressMsg('Mengunggah ke Supabase Storage...');
        const thumbPath = `photo/${projectId}/${timestamp}-${randomId}-thumb.webp`;
        const fullPath = `photo/${projectId}/${timestamp}-${randomId}-full.webp`;

        try {
          await Promise.all([
            uploadMediaFile(thumbPath, thumbResult.blob),
            uploadMediaFile(fullPath, fullResult.blob)
          ]);
        } catch (uploadErr) {
          console.warn('Storage upload bypass/simulasi:', uploadErr);
        }

        // Buat objek media baru
        const newMedia = {
          id: `media-${timestamp}`,
          kind: 'image',
          storage_path: URL.createObjectURL(fullResult.blob),
          thumb_path: URL.createObjectURL(thumbResult.blob),
          width: fullResult.width,
          height: fullResult.height,
          alt_text: file.name.replace(/\.[^/.]+$/, ''), // Default dari nama file, wajib dicek
          sort_order: mediaList.length + 1
        };

        onChange([...mediaList, newMedia]);
      } else if (isVideo) {
        // 2. Ekstrak 1 frame poster video
        setProgressMsg('Mengekstrak frame poster video...');
        const posterResult = await captureVideoPoster(file);

        setProgressMsg('Memproses video...');
        const posterPath = `video/${projectId}/${timestamp}-${randomId}-poster.webp`;
        const videoPath = `video/${projectId}/${timestamp}-${randomId}-video.mp4`;

        try {
          await uploadMediaFile(posterPath, posterResult.blob);
          await uploadMediaFile(videoPath, file, file.type || 'video/mp4');
        } catch (uploadErr) {
          console.warn('Storage upload bypass/simulasi:', uploadErr);
        }

        const newMedia = {
          id: `media-${timestamp}`,
          kind: 'video',
          storage_path: URL.createObjectURL(file),
          poster_path: URL.createObjectURL(posterResult.blob),
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
      setErrorMsg(err.message || 'Gagal memproses file media');
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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.6rem 1.2rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--accent-primary)',
            color: 'var(--accent-primary-text)',
            fontSize: 'var(--text-sm)',
            fontWeight: '600',
            cursor: uploading ? 'not-allowed' : 'pointer',
            opacity: uploading ? 0.7 : 1
          }}
        >
          {uploading ? <Loader2 size={16} className="spin" /> : <Upload size={16} />}
          <span>{uploading ? progressMsg || 'Mengunggah...' : 'Pilih Foto / Video'}</span>
          <input
            type="file"
            accept="image/*,video/*"
            disabled={uploading}
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </label>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowEmbedForm(!showEmbedForm)}
          icon={Link}
        >
          {showEmbedForm ? 'Tutup Input Embed' : 'Tautkan YouTube / Vimeo'}
        </Button>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div
          style={{
            padding: 'var(--space-3)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--badge-video-bg)',
            color: 'var(--badge-video)',
            fontSize: 'var(--text-xs)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)'
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
            padding: 'var(--space-4)',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)'
          }}
        >
          <div style={{ fontWeight: '600', fontSize: 'var(--text-xs)', textTransform: 'uppercase' }}>
            Tautan Video Eksternal (YouTube / Vimeo)
          </div>
          <input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={embedUrl}
            onChange={(e) => setEmbedUrl(e.target.value)}
            style={{
              padding: 'var(--space-2) var(--space-3)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-medium)',
              fontSize: 'var(--text-sm)'
            }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
            <input
              type="text"
              placeholder="Alt text / Judul video..."
              value={embedAlt}
              onChange={(e) => setEmbedAlt(e.target.value)}
              style={{
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-medium)',
                fontSize: 'var(--text-xs)'
              }}
            />
            <input
              type="number"
              placeholder="Durasi (detik), contoh: 90"
              value={embedDuration}
              onChange={(e) => setEmbedDuration(e.target.value)}
              style={{
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-medium)',
                fontSize: 'var(--text-xs)'
              }}
            />
          </div>
          <div>
            <Button size="sm" variant="primary" onClick={handleAddEmbed}>
              Simpan Tautan Video
            </Button>
          </div>
        </div>
      )}

      {/* Daftar Media Terpasang */}
      {mediaList.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <div style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: 'var(--text-tertiary)' }}>
            MEDIA TERKAIT ({mediaList.length}) — Teks Alt wajib diisi untuk kepatuhan aksesibilitas:
          </div>

          {mediaList.map((media, idx) => {
            const isImg = media.kind === 'image';
            const isVid = media.kind === 'video' || media.kind === 'embed';
            const previewUrl = media.thumb_path || media.storage_path || media.poster_path;
            const hasAlt = Boolean(media.alt_text?.trim());

            return (
              <div
                key={media.id || idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: `1px solid ${hasAlt ? 'var(--border-subtle)' : 'var(--badge-video)'}`
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: '64px',
                    height: '48px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: '#000',
                    overflow: 'hidden',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Thumbnail"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Video size={18} color="#fff" />
                  )}
                </div>

                {/* Alt Text Input */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: '4px' }}>
                    <Tag tone={isImg ? 'photo' : 'video'}>
                      {media.kind.toUpperCase()} #{idx + 1}
                    </Tag>
                    {!hasAlt && (
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--badge-video)', fontWeight: '600' }}>
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
                      padding: '0.35rem 0.6rem',
                      fontSize: 'var(--text-xs)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-medium)',
                      backgroundColor: 'var(--bg-elevated)',
                      color: 'var(--text-primary)'
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
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--badge-video)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
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
