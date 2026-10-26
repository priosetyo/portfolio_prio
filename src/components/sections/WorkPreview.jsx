import React from 'react';
import { Section } from '../ui/Section';
import { Chip } from '../ui/Chip';
import { Tag } from '../ui/Tag';
import { Sparkles, ArrowRight, Image as ImageIcon, Video, Palette, FileText } from 'lucide-react';

export function WorkPreview() {
  const categories = [
    { label: 'Semua', count: '•', icon: Sparkles },
    { label: 'Fotografi', count: 'Photo', icon: ImageIcon },
    { label: 'Videografi', count: 'Video', icon: Video },
    { label: 'Desain Grafis', count: 'Design', icon: Palette },
    { label: 'Copywriting', count: 'Copy', icon: FileText }
  ];

  return (
    <Section
      id="work"
      label="Karya Pilihan"
      title="Galeri Karya Multi-Kategori"
      description="Koleksi karya terkurasi yang mencakup fotografi komersial, produksi video, identitas desain, serta copy iklan berdaya pikat."
    >
      {/* Kategori Preview Chips */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-6)'
        }}
      >
        {categories.map((cat, i) => (
          <Chip
            key={cat.label}
            active={i === 0}
            count={cat.count}
            onClick={() => {}}
          >
            {cat.label}
          </Chip>
        ))}
      </div>

      {/* Fase 4 Bridge Card */}
      <div
        style={{
          padding: 'var(--space-10) var(--space-6)',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--bg-elevated)',
          border: '1px dashed var(--border-medium)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-3)'
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.8rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--accent-highlight-soft)',
            color: 'var(--accent-highlight)',
            fontSize: 'var(--text-xs)',
            fontFamily: 'var(--font-mono)',
            fontWeight: '600'
          }}
        >
          <Sparkles size={14} />
          <span>Fase 3 Tuntas • Fase 4 Menanti</span>
        </div>

        <h3
          style={{
            fontSize: 'var(--text-xl)',
            fontWeight: '700',
            color: 'var(--text-primary)',
            maxWidth: '500px'
          }}
        >
          Galeri Masonry & Media Viewer Interaktif
        </h3>

        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)',
            maxWidth: '520px',
            lineHeight: 1.6
          }}
        >
          Seluruh teks dan struktur data publik (Hero, Tentang, Keahlian, Pengalaman, Kontak) kini telah terintegrasi dinamis dari Supabase. Galeri masonry responsif dengan penomoran frame (F01, F02, ...) dan dialog media akan diaktifkan pada Fase 4.
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
          <Tag tone="photo">F01</Tag>
          <Tag tone="video">F02</Tag>
          <Tag tone="design">F03</Tag>
          <Tag tone="copy">F04</Tag>
        </div>
      </div>
    </Section>
  );
}
