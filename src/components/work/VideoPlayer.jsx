import React, { useState } from 'react';
import { Play } from 'lucide-react';

function getEmbedUrl(url) {
  if (!url) return null;

  // YouTube match
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  }

  // Vimeo match
  const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }

  return null;
}

export function VideoPlayer({ url, poster, altText = 'Video showcase', className = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = getEmbedUrl(url);

  if (embedUrl) {
    return (
      <div
        className={`ui-video-player ${className}`}
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%', // 16:9 ratio
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          backgroundColor: '#000000'
        }}
      >
        <iframe
          src={embedUrl}
          title={altText}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`ui-video-player ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <video
        src={url}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        style={{
          width: '100%',
          maxHeight: '70vh',
          display: 'block',
          objectFit: 'contain'
        }}
      >
        <track kind="captions" />
        Browser Anda tidak mendukung tag video HTML5.
      </video>
    </div>
  );
}
