import React, { useState, useEffect, useMemo } from 'react';
import { ArrowUpRight, ArrowRight, Layers, Award, Briefcase } from 'lucide-react';
import { getStoragePublicUrl } from '../../lib/queries';
import { useProjects } from '../../hooks/useProjects';

const HERO_PORTRAIT_FALLBACK =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCpHxtffRyMCl7o-J292Nepd-E2nswNXwo8wvxFNwYXyZ1HWF32bq4ZqGRfTQ8_v5VW71LxoFjFI-zlRb8fg5fcPONf3PfNeZFwSJvR0knkoYGQRnnvMMP3ImMcP41og8M4W2T9HrSb7IvCYv1oinkBTrlTz9fSEx5wKHDeekShJPspwR_ldIZFPcWzcoiMOozpASkGIID8kqd7PvtOAIl3xG-JHt9J0Q-hJjDYM51m';

const CATEGORY_LABELS = {
  photo: 'Photography',
  video: 'Videography',
  design: 'Graphic Design',
  copy: 'Copywriting'
};

export const DEFAULT_TRACK_RECORD_HEADER = {
  eyebrow: 'TRACK RECORD SUMMARY',
  title: 'Enterprise-Scale Precision',
  subtitle:
    'Translating strategic vision for energy conglomerates, multinational ventures, and cultural institutions into high-impact kinetic assets.',
  spotlightLabel: 'Film & Brand Identity Spotlight'
};

export const DEFAULT_TRACK_RECORD_METRICS = [
  {
    id: 'metric-1',
    value: '10+',
    badge: 'Active Years',
    title: 'Years of Industry Experience',
    desc: 'Leading creative direction from independent film production to multi-channel campaigns for national energy conglomerates and regional corporations.',
    footerText: 'Est. 2014 — DUMAI, RIAU, INDONESIA'
  },
  {
    id: 'metric-2',
    value: '42',
    badge: 'Honors',
    title: 'Global Awards & Selections',
    desc: 'International film festival curator selections, Asia-Pacific enterprise visual identity recognitions, and kinetic typography design showcases.',
    footerText: 'Cannes Shortlist, Citra Pariwara Gold',
    modalSpecs: [
      'Citra Pariwara Gold — Best Direction & Cinematography',
      'Cannes Lions Shortlist — Corporate Film Craft',
      'Tokyo TDC Selection — Kinetic Typography & Spatial UI',
      'Asia-Pacific Enterprise Brand Architecture Honor'
    ]
  },
  {
    id: 'metric-3',
    value: '180+',
    badge: 'Released Portfolio',
    title: 'Commercial & Editorial Scale',
    desc: '8K commercial resolution content, high-impact corporate monographs, and full-spectrum digital experience architectures.',
    footerText: ''
  }
];

export const DEFAULT_SPOTLIGHT_PROJECTS = [
  {
    id: 'default-spot-1',
    title: 'Pertamina Patra Niaga Anthem',
    category: 'CINEMA COMMERCIAL',
    discipline: 'video',
    tag: 'CAMPAIGN DIRECTION',
    client: 'Pertamina Patra Niaga',
    locationYear: 'DUMAI, RIAU, INDONESIA / 2025',
    desc: 'High-energy commercial manifesto film for Pertamina Patra Niaga. Blending on-site footage of maritime and energy infrastructure with original orchestral scoring.',
    specs: ['RED V-Raptor 8K VV', 'Cooke Anamorphic /i', 'DaVinci ACES Workflow'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAw-HjHTxu0iiEQ5z7YvjAbVP9wfRoOcfUb13m1mFshL5HU6LfmOEyk_w9r7ILa2sS5f7YN6AT4xK9vAXIfYQRiV0s1IagWRXCZndw5C-09Y5hCK0pIeBZtWRgQ8ROcmnmez5qemMezfiQ9P0sdjBnbsAJkJRPodhoCrxzeh-quGgzLEdorxq0VQtnxJF_SLz3-iHG5jz2SojHZd69KaE4NN6YwL2UGlbXJTZ00ZV8'
  },
  {
    id: 'default-spot-2',
    title: 'Kinetic Spatials 2026',
    category: 'SPATIAL UX',
    discipline: 'design',
    tag: 'INTERACTIVE SYSTEMS',
    client: 'Nova Technologies',
    locationYear: 'LONDON / 2025',
    desc: 'Spatial UI tokens, variable typography systems, and high-fidelity interaction prototypes for next-generation spatial computing platforms.',
    specs: ['Figma Spatial Engine', 'VisionOS Prototyping', 'Design Tokens'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAEofPaya-ZGWveRCDy8cNUJRN_N5NCwX8ngR_QWgpEBmZTMQSRSh6bxRyttNiIroK5QcXboYpJxqPZs9QkCWZcOtUeAGvDkKGmo-uebF1mBjT3YA7YmeL8Csg_uPYRVhbCmdunD9DPNpU9f3Sb3ARiTfkBAzuu8v5JuA6WzP9sHblTo2IT7q4-IVdBGZ-q_-tkeuAJxBOf8ewixWB6K-4TYKjcKa2VI3i50WA3Er0'
  },
  {
    id: 'default-spot-3',
    title: 'Lumina Narrative Film',
    category: 'CINEMA FILM',
    discipline: 'video',
    tag: 'NARRATIVE STORYTELLING',
    client: 'Lumina Pictures',
    locationYear: 'TOKYO / 2024',
    desc: 'Short narrative cinema exploring high-contrast chiaroscuro and atmospheric volumetric lighting across urban nocturnal landscapes.',
    specs: ['ARRI Alexa Mini LF', 'Cooke Panchro Classic', 'ACES 2065-1'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQDL8KyX67MLyaR7WRfaYFlh9D3zIMs9-FgF-5WUMaZP98VJN0u0HWQnagcNiYU21us6WzS1dos1hALtR8p9j1Y1cJS6p7Y5y8PF80Vcr0kUHLBjdnwxTe2og09FZy-SgOiug8FWF4K8yPNODiqBk7_L-EoD4JSpFPMnDuzUUCTGGo1s70qVEUA80yLgJdIy2XO46DFN7rIdbSRUJopu4F23RB7b9BsrukJGrePAc'
  },
  {
    id: 'default-spot-4',
    title: 'Monolith Corporate Identity',
    category: 'BRAND SYSTEM',
    discipline: 'copy',
    tag: 'BRAND ARCHITECTURE',
    client: 'Monolith Group',
    locationYear: 'BERLIN / 2025',
    desc: 'Comprehensive visual architecture, editorial voice manifesto, and corporate design guidelines for modern industrial enterprises.',
    specs: ['Swiss Grid Architecture', 'Corporate Typographic System', 'Brand Guidelines'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBOa2CZ7oJQpqn24tmFYPG-ipuAF3HbDXddDuzTXTZAyrz6xjDOt8yFhNRKAkgRmmKn_3QxK46zh2_b-h-2PhTyVYBzsVN65eou6dmKd4O_qZwRSwaU5k3tsRRZoV04gACDu0yG9lCCXLgVYWiFyCr-CGC8IHce3IttCfbl-wafpe7Vr5dh2EOaWiOF-_5xa6I5-wae3cbmqwVwku8JQRBHQ17xgv0hTGBrIAocOJg'
  },
  {
    id: 'default-spot-5',
    title: 'Silent Monolith Monograph',
    category: 'ARCHITECTURAL PHOTO',
    discipline: 'photo',
    tag: 'BRUTALIST MONOGRAPH',
    client: 'Monolith Foundation',
    locationYear: 'KYOTO / 2024',
    desc: 'Monochromatic and golden-hour architectural photography series investigating spatial silence and monumental concrete geometry.',
    specs: ['Phase One XF 100MP', 'Schneider 35mm LS', 'Archival Pigment Print'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAJJWJQHqgaJrmmXgNkWqjiPjVu7ZXUY93Ukc-HYliONfsYpK_nSAnrYbzGboJ0gyL8MSQnESy0w6V8M6mAAlq-Zh1zMtIsBlD2evEHv5yejd9hJk4BSVDi0ZThWFhJ2xzbDkXnZQ-qPEqNJyWPJc7Xiec9xXS4QrDZqG2jWs0Eg49tPpt08SC6Lc3RGOU5LszmeDEkUa64Dfvu31LzCX-tPZBOsWCs6Kz2FuKgrtU'
  }
];

export const DEFAULT_HERO_BG_SLIDES = DEFAULT_SPOTLIGHT_PROJECTS.map((p) => p.image);

export const isVideoSlide = (slide) => {
  if (!slide) return false;
  if (typeof slide === 'object') {
    if (slide.type === 'video') return true;
    if (slide.type === 'photo' || slide.type === 'image') return false;
    slide = slide.url || '';
  }
  const s = String(slide).toLowerCase();
  return (
    s.endsWith('.mp4') ||
    s.endsWith('.webm') ||
    s.endsWith('.mov') ||
    s.endsWith('.ogg') ||
    s.includes('.mp4?') ||
    s.includes('.webm?') ||
    s.includes('/video/')
  );
};

export const getSlideUrl = (slide) => {
  if (!slide) return '';
  const raw = typeof slide === 'object' ? slide.url : slide;
  return getStoragePublicUrl(raw) || raw;
};

export function Hero({ settings, onOpenFilosofi, onOpenDetailModal }) {
  const { projects = [] } = useProjects();
  const [activeSpotlight, setActiveSpotlight] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHoveringSpotlight, setIsHoveringSpotlight] = useState(false);
  const [heroPortraitUrl, setHeroPortraitUrl] = useState(
    () => settings?.hero_png_url || localStorage.getItem('prio_hero_png_url') || ''
  );

  useEffect(() => {
    try {
      localStorage.removeItem('prio_hero_portrait_url');
    } catch (e) {}
    if (settings?.hero_png_url !== undefined) {
      setHeroPortraitUrl(settings.hero_png_url || '');
    }
  }, [settings?.hero_png_url]);

  // Section 1: Hero Background Slideshow (Maks 5 Foto atau Video, 3 Detik Transisi Apple)
  const heroBgSlides = useMemo(() => {
    let customSlides = settings?.hero_bg_slides;
    if (typeof customSlides === 'string') {
      try {
        customSlides = JSON.parse(customSlides);
      } catch (e) {
        customSlides = customSlides.split(',').map((s) => s.trim()).filter(Boolean);
      }
    }
    if (!customSlides || !Array.isArray(customSlides) || customSlides.length === 0) {
      try {
        const local = localStorage.getItem('prio_hero_bg_slides');
        if (local) customSlides = JSON.parse(local);
      } catch (e) {}
    }
    if (Array.isArray(customSlides) && customSlides.length > 0) {
      return customSlides.slice(0, 5).map((item) => {
        if (typeof item === 'object') {
          return { ...item, url: getSlideUrl(item) };
        }
        return getSlideUrl(item);
      });
    }
    return DEFAULT_HERO_BG_SLIDES;
  }, [settings?.hero_bg_slides]);

  const [activeBgIndex, setActiveBgIndex] = useState(0);

  // Transisi per foto/video 3 detik (gaya Apple)
  useEffect(() => {
    if (heroBgSlides.length <= 1) return undefined;
    const timer = setInterval(() => {
      setActiveBgIndex((prev) => (prev + 1) % heroBgSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [heroBgSlides.length]);

  // Section 2: Track Record Header & 3 Metrics (Customizable via Admin)
  const trackRecordHeader = useMemo(() => {
    let custom = settings?.track_record_header;
    if (typeof custom === 'string') {
      try {
        custom = JSON.parse(custom);
      } catch (e) {
        custom = null;
      }
    }
    return {
      ...DEFAULT_TRACK_RECORD_HEADER,
      ...(custom && typeof custom === 'object' ? custom : {})
    };
  }, [settings?.track_record_header]);

  const trackRecordMetrics = useMemo(() => {
    let custom = settings?.track_record_metrics;
    if (typeof custom === 'string') {
      try {
        custom = JSON.parse(custom);
      } catch (e) {
        custom = null;
      }
    }
    if (Array.isArray(custom) && custom.length > 0) {
      return DEFAULT_TRACK_RECORD_METRICS.map((def, idx) => {
        const item = custom[idx] || {};
        return {
          ...def,
          ...item,
          modalSpecs:
            Array.isArray(item.modalSpecs) && item.modalSpecs.length > 0
              ? item.modalSpecs
              : typeof item.modalSpecs === 'string' && item.modalSpecs.trim()
                ? item.modalSpecs.split('\n').map((s) => s.trim()).filter(Boolean)
                : def.modalSpecs
        };
      });
    }
    return DEFAULT_TRACK_RECORD_METRICS;
  }, [settings?.track_record_metrics]);

  // Build 5 dynamic spotlight projects from Admin spotlight_items OR CMS projects, padded by defaults
  const spotlightProjects = useMemo(() => {
    const mappedFromCms = projects.slice(0, 5).map((p, idx) => {
      const firstMedia = p.project_media?.[0];
      const rawThumb = firstMedia?.storage_path || firstMedia?.thumb_path || firstMedia?.poster_path;
      const resolvedImage =
        getStoragePublicUrl(rawThumb) ||
        DEFAULT_SPOTLIGHT_PROJECTS[idx % DEFAULT_SPOTLIGHT_PROJECTS.length].image;

      const metaSpecs = p.meta
        ? Object.entries(p.meta)
            .filter(([, val]) => Boolean(val))
            .map(([k, val]) => `${k.replace(/_/g, ' ').toUpperCase()}: ${val}`)
        : [];

      const fallbackSpecs = DEFAULT_SPOTLIGHT_PROJECTS[idx % DEFAULT_SPOTLIGHT_PROJECTS.length].specs;

      return {
        id: p.id || `cms-spot-${idx}`,
        title: p.title || 'Untitled Project',
        category: (p.categoryLabel || CATEGORY_LABELS[p.category] || 'FEATURED WORK').toUpperCase(),
        discipline: p.category || 'design',
        tag: (p.subCategory || p.role || 'ENTERPRISE DIRECTIVE').toUpperCase(),
        client: p.client || 'Enterprise Partner',
        locationYear:
          p.locationYear ||
          `${(p.meta?.location || 'DUMAI, RIAU, INDONESIA').toUpperCase()} / ${p.year || '2025'}`,
        desc:
          p.description ||
          p.summary ||
          p.excerpt ||
          DEFAULT_SPOTLIGHT_PROJECTS[idx % DEFAULT_SPOTLIGHT_PROJECTS.length].desc,
        specs: metaSpecs.length > 0 ? metaSpecs.slice(0, 3) : fallbackSpecs,
        image: resolvedImage
      };
    });

    const autoList = [...mappedFromCms];
    for (let i = autoList.length; i < 5; i += 1) {
      autoList.push(DEFAULT_SPOTLIGHT_PROJECTS[i]);
    }

    let customSpots = settings?.spotlight_items;
    if (typeof customSpots === 'string') {
      try {
        customSpots = JSON.parse(customSpots);
      } catch (e) {
        customSpots = null;
      }
    }

    if (Array.isArray(customSpots) && customSpots.length > 0) {
      return [0, 1, 2, 3, 4].map((idx) => {
        const fallback = autoList[idx] || DEFAULT_SPOTLIGHT_PROJECTS[idx];
        const item = customSpots[idx];
        if (!item || typeof item !== 'object') return fallback;
        const specsArr = Array.isArray(item.specs)
          ? item.specs.filter(Boolean)
          : typeof item.specs === 'string' && item.specs.trim()
            ? item.specs.split(',').map((s) => s.trim()).filter(Boolean)
            : fallback.specs;

        return {
          id: item.id || fallback.id || `spot-${idx}`,
          title: item.title || fallback.title,
          category: (item.category || fallback.category || 'FEATURED WORK').toUpperCase(),
          discipline: item.discipline || fallback.discipline || 'design',
          tag: (item.tag || fallback.tag || 'ENTERPRISE DIRECTIVE').toUpperCase(),
          client: item.client || fallback.client || 'Enterprise Partner',
          locationYear: (item.locationYear || fallback.locationYear || 'DUMAI, RIAU, INDONESIA / 2025').toUpperCase(),
          desc: item.desc || fallback.desc,
          specs: specsArr.length > 0 ? specsArr : fallback.specs,
          image: getStoragePublicUrl(item.image) || item.image || fallback.image
        };
      });
    }

    return autoList.slice(0, 5);
  }, [projects, settings?.spotlight_items]);

  const currentProject = spotlightProjects[activeSpotlight] || spotlightProjects[0];

  // Auto-advance spotlight every 6.5 seconds unless paused or hovered
  useEffect(() => {
    if (!isAutoPlaying || isHoveringSpotlight) return undefined;
    const timer = setInterval(() => {
      setActiveSpotlight((prev) => (prev + 1) % spotlightProjects.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, isHoveringSpotlight, spotlightProjects.length]);

  const name = settings?.name || 'PRIO SETYO';
  const headline = settings?.headline || 'CREATIVE DIRECTOR & VISUAL STORYTELLER';
  const summary =
    settings?.summary ||
    'Orchestrating cinematic visual narratives, high-energy brand architectures, and world-class digital experiences with Swiss discipline precision and kinetic modernist energy.';
  const locationLabel = 'DUMAI, RIAU, INDONESIA';

  const scrollToSection = (e, targetId) => {
    if (e) e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const navbarHeight = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleInspectProject = (projectItem) => {
    if (!onOpenDetailModal || !projectItem) return;
    onOpenDetailModal({
      title: projectItem.title,
      category: `${projectItem.category} • ${projectItem.locationYear}`,
      description: projectItem.desc,
      specs: projectItem.specs,
      image: projectItem.image,
      tags: [projectItem.tag, `CLIENT: ${projectItem.client}`]
    });
  };

  const handlePrevSpotlight = () => {
    setActiveSpotlight((prev) => (prev - 1 + spotlightProjects.length) % spotlightProjects.length);
  };

  const handleNextSpotlight = () => {
    setActiveSpotlight((prev) => (prev + 1) % spotlightProjects.length);
  };

  return (
    <>
      {/* ==========================================
          SECTION 1: HERO SECTION (CINEMATIC FULL-BLEED)
          ========================================== */}
      <section
        id="hero"
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#071320',
          color: 'var(--color-surface-bright)',
          overflow: 'hidden',
          paddingTop: '5.5rem' /* Offset sticky navbar height */
        }}
      >
        {/* Ambient architectural lighting scrims */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0.45,
            backgroundImage:
              'radial-gradient(circle at 18% 22%, rgba(0, 82, 155, 0.5), transparent 58%), radial-gradient(circle at 82% 75%, rgba(237, 28, 36, 0.22), transparent 55%)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0.18,
            backgroundImage:
              'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '4rem 4rem'
          }}
        />

        {/* Dynamic Cinematic Background Slideshow (Foto atau Video, Apple-style Ken Burns & Smooth Crossfade, 3s duration, max 5 items) */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {heroBgSlides.map((slideItem, idx) => {
            const isActive = idx === activeBgIndex;
            const isVideo = isVideoSlide(slideItem);
            const mediaUrl = getSlideUrl(slideItem);

            return (
              <div
                key={`${mediaUrl}-${idx}`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: isActive ? 0.88 : 0,
                  transform: isActive ? 'scale(1.04)' : 'scale(1.0)',
                  transition: 'opacity 1100ms cubic-bezier(0.25, 1, 0.5, 1), transform 3200ms cubic-bezier(0.25, 1, 0.5, 1)',
                  willChange: 'opacity, transform',
                  overflow: 'hidden'
                }}
              >
                {isVideo ? (
                  <video
                    src={mediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'contrast(1.05) brightness(0.98)'
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url('${mediaUrl}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'contrast(1.05) brightness(0.98)'
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Layer Overlay: Pekat di sisi kiri (teks jelas), makin tipis dari tengah ke kanan (foto/video background terang & jelas) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'linear-gradient(90deg, rgba(7, 19, 32, 0.95) 0%, rgba(7, 19, 32, 0.86) 36%, rgba(7, 19, 32, 0.50) 54%, rgba(7, 19, 32, 0.20) 76%, rgba(7, 19, 32, 0.06) 100%), linear-gradient(180deg, rgba(7, 19, 32, 0.50) 0%, rgba(7, 19, 32, 0.0) 22%, rgba(7, 19, 32, 0.0) 76%, rgba(10, 37, 64, 0.94) 100%)'
          }}
        />

        <div
          className="container"
          style={{
            position: 'relative',
            paddingTop: '2.25rem',
            paddingBottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 'clamp(560px, 78vh, 760px)',
            gap: '1.5rem'
          }}
        >
          {/* Top Row: Regional Telemetry (Rata Kanan Rapi) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '100%'
            }}
          >
            <div
              className="font-label-mono-sm"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                textAlign: 'right',
                gap: '0.5rem',
                color: 'var(--color-secondary-fixed)',
                letterSpacing: '0.08em',
                fontWeight: '600'
              }}
            >
              <span>DUMAI, RIAU | INDONESIA</span>
            </div>
          </div>

          {/* Main Hero Row: Monumental Typography (Left) + Borderless PNG Portrait Slot (Right, Flush Bottom) */}
          <div className="hero-content-row">
            {/* Left Side: Monumental Typography */}
            <div
              className="hero-text-column"
              style={{
                maxWidth: '50rem',
                flex: '1 1 540px',
                textAlign: 'left',
                alignSelf: 'center',
                padding: '2rem 0 4.5rem 0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', textAlign: 'left' }}>
                <span
                  className="font-label-mono-lg"
                  style={{
                    color: 'var(--color-secondary-fixed)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    textAlign: 'left'
                  }}
                >
                  {headline}
                </span>
              </div>

              <h1
                className="font-display-xl"
                style={{
                  color: 'var(--color-surface-container-lowest)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.92,
                  marginBottom: '1.5rem',
                  fontSize: 'clamp(3rem, 7vw, 7.5rem)',
                  fontWeight: '800',
                  textAlign: 'left'
                }}
              >
                {name}
              </h1>

              <p
                className="font-body-lg"
                style={{
                  color: 'var(--color-outline-variant)',
                  maxWidth: '42rem',
                  lineHeight: 1.65,
                  marginBottom: 0,
                  textAlign: 'left'
                }}
              >
                {summary}
              </p>
            </div>

            {/* Right Side: Borderless PNG Profile Photo Slot (Flush to bottom edge, hidden on mobile if empty) */}
            <div
              className={`hero-portrait-slot ${!heroPortraitUrl ? 'hero-portrait-empty' : ''}`}
              style={{
                position: 'relative',
                flex: '0 0 auto',
                width: 'clamp(336px, 41vw, 552px)',
                height: heroPortraitUrl ? 'clamp(408px, 53vw, 624px)' : '1px',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                alignSelf: 'flex-end',
                marginBottom: 0,
                border: 'none',
                background: 'transparent',
                boxShadow: 'none',
                pointerEvents: 'none'
              }}
            >
              {heroPortraitUrl && (
                <img
                  src={getStoragePublicUrl(heroPortraitUrl)}
                  alt={name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                    border: 'none',
                    background: 'transparent',
                    boxShadow: 'none',
                    display: 'block'
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Bottom Center: Apple-Style Background Slide Progress Bar (Animated 3s Fill, Tanpa Label FOTO/VIDEO) */}
        <div
          style={{
            position: 'absolute',
            bottom: '1.35rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '0.42rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(7, 19, 32, 0.52)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {heroBgSlides.map((slideItem, i) => {
            const isCurrent = i === activeBgIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActiveBgIndex(i)}
                style={{
                  position: 'relative',
                  width: isCurrent ? '32px' : '8px',
                  height: '3px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(255, 255, 255, 0.28)',
                  transition: 'width 400ms cubic-bezier(0.25, 1, 0.5, 1)',
                  cursor: 'pointer',
                  padding: 0,
                  overflow: 'hidden',
                  border: 'none'
                }}
                aria-label={`Background Slide ${i + 1}`}
              >
                {isCurrent && (
                  <span
                    key={`progress-${activeBgIndex}`}
                    className="hero-slide-progress-fill"
                  />
                )}
              </button>
            );
          })}
          <span
            className="font-label-mono-sm"
            style={{
              fontSize: '10px',
              color: 'rgba(255, 255, 255, 0.72)',
              marginLeft: '4px',
              letterSpacing: '0.05em',
              fontWeight: '600'
            }}
          >
            0{activeBgIndex + 1} / 0{heroBgSlides.length}
          </span>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: KEY METRICS ("TRACK RECORD SUMMARY") & SPOTLIGHT
          ========================================== */}
      <section
        style={{
          width: '100%',
          backgroundColor: '#0A2540',
          color: 'var(--color-surface-bright)',
          padding: '4.5rem 0',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)'
        }}
      >
        <div className="container">
          {/* Header Row */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.25rem',
              marginBottom: '2.5rem'
            }}
            className="md-row-header"
          >
            <div>
              <span
                className="font-label-mono-sm"
                style={{
                  color: 'var(--color-secondary-fixed)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  display: 'block',
                  marginBottom: '0.5rem',
                  textAlign: 'left'
                }}
              >
                {trackRecordHeader.eyebrow}
              </span>
              <h2
                className="font-headline-lg"
                style={{
                  color: 'var(--color-surface-container-lowest)',
                  fontWeight: '700',
                  letterSpacing: '-0.025em',
                  margin: 0,
                  textAlign: 'left'
                }}
              >
                {trackRecordHeader.title}
              </h2>
            </div>
            <p
              className="font-body-sm md-text-right"
              style={{
                color: 'var(--color-outline-variant)',
                maxWidth: '28rem',
                lineHeight: 1.6,
                margin: 0
              }}
            >
              {trackRecordHeader.subtitle}
            </p>
          </div>

          {/* 3 Columns Colossal Metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--gutter-lg)'
            }}
          >
            {/* Metric 1: Years of Industry Experience */}
            <div
              className="card-motion"
              onClick={(e) => scrollToSection(e, 'experiences')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') scrollToSection(e, 'experiences');
              }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '2rem',
                borderRadius: 'var(--radius-3xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}
                >
                  <span
                    className="font-display-xl"
                    style={{
                      fontWeight: '800',
                      color: 'var(--color-surface-container-lowest)',
                      letterSpacing: '-0.03em'
                    }}
                  >
                    {trackRecordMetrics[0]?.value || '10+'}
                  </span>
                  <span
                    className="font-label-mono-sm"
                    style={{
                      color: '#7AC142',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      fontWeight: '600'
                    }}
                  >
                    {trackRecordMetrics[0]?.badge || 'Active Years'}
                  </span>
                </div>
                <div
                  style={{
                    width: '4rem',
                    height: '4px',
                    backgroundColor: '#7AC142',
                    marginBottom: '1.5rem',
                    borderRadius: 'var(--radius-full)'
                  }}
                />
                <h3
                  className="font-headline-sm"
                  style={{
                    color: 'var(--color-surface-bright)',
                    fontWeight: '700',
                    marginBottom: '0.5rem'
                  }}
                >
                  {trackRecordMetrics[0]?.title || 'Years of Industry Experience'}
                </h3>
                <p
                  className="font-body-sm"
                  style={{ color: 'var(--color-outline-variant)', lineHeight: 1.6 }}
                >
                  {trackRecordMetrics[0]?.desc}
                </p>
              </div>

              <div
                style={{
                  marginTop: '2rem',
                  paddingTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  color: 'var(--color-secondary-fixed)'
                }}
                className="font-label-mono-sm"
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Briefcase size={15} color="#7AC142" />
                  <span>{trackRecordMetrics[0]?.footerText || `Est. 2014 — ${locationLabel}`}</span>
                </span>
                <ArrowRight size={15} color="#7AC142" />
              </div>
            </div>

            {/* Metric 2: Global Awards & Selections */}
            <div
              className="card-motion"
              onClick={() => {
                if (onOpenDetailModal) {
                  onOpenDetailModal({
                    title: trackRecordMetrics[1]?.title || 'Global Awards & Festival Selections',
                    category: `${(trackRecordMetrics[1]?.badge || 'HONORS').toUpperCase()} • TRACK RECORD`,
                    description: trackRecordMetrics[1]?.desc,
                    specs: trackRecordMetrics[1]?.modalSpecs || DEFAULT_TRACK_RECORD_METRICS[1].modalSpecs,
                    image: spotlightProjects[0]?.image || DEFAULT_SPOTLIGHT_PROJECTS[0].image,
                    tags: [`${trackRecordMetrics[1]?.value || '42'} ${(trackRecordMetrics[1]?.badge || 'HONORS').toUpperCase()}`, 'INTERNATIONAL CURATION']
                  });
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && onOpenDetailModal) {
                  e.preventDefault();
                  onOpenDetailModal({
                    title: trackRecordMetrics[1]?.title || 'Global Awards & Festival Selections',
                    category: `${(trackRecordMetrics[1]?.badge || 'HONORS').toUpperCase()} • TRACK RECORD`,
                    description: trackRecordMetrics[1]?.desc,
                    specs: trackRecordMetrics[1]?.modalSpecs || DEFAULT_TRACK_RECORD_METRICS[1].modalSpecs,
                    image: spotlightProjects[0]?.image || DEFAULT_SPOTLIGHT_PROJECTS[0].image,
                    tags: [`${trackRecordMetrics[1]?.value || '42'} ${(trackRecordMetrics[1]?.badge || 'HONORS').toUpperCase()}`, 'INTERNATIONAL CURATION']
                  });
                }
              }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '2rem',
                borderRadius: 'var(--radius-3xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}
                >
                  <span
                    className="font-display-xl"
                    style={{
                      fontWeight: '800',
                      color: 'var(--color-surface-container-lowest)',
                      letterSpacing: '-0.03em'
                    }}
                  >
                    {trackRecordMetrics[1]?.value || '42'}
                  </span>
                  <span
                    className="font-label-mono-sm"
                    style={{
                      color: '#7AC142',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      fontWeight: '600'
                    }}
                  >
                    {trackRecordMetrics[1]?.badge || 'Honors'}
                  </span>
                </div>
                <div
                  style={{
                    width: '4rem',
                    height: '4px',
                    backgroundColor: '#7AC142',
                    marginBottom: '1.5rem',
                    borderRadius: 'var(--radius-full)'
                  }}
                />
                <h3
                  className="font-headline-sm"
                  style={{
                    color: 'var(--color-surface-bright)',
                    fontWeight: '700',
                    marginBottom: '0.5rem'
                  }}
                >
                  {trackRecordMetrics[1]?.title || 'Global Awards & Selections'}
                </h3>
                <p
                  className="font-body-sm"
                  style={{ color: 'var(--color-outline-variant)', lineHeight: 1.6 }}
                >
                  {trackRecordMetrics[1]?.desc}
                </p>
              </div>

              <div
                style={{
                  marginTop: '2rem',
                  paddingTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  color: 'var(--color-secondary-fixed)'
                }}
                className="font-label-mono-sm"
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={15} color="#ED1C24" />
                  <span>{trackRecordMetrics[1]?.footerText || 'Cannes Shortlist, Citra Pariwara Gold'}</span>
                </span>
                <ArrowUpRight size={15} color="#7AC142" />
              </div>
            </div>

            {/* Metric 3: Commercial & Editorial Scale Projects */}
            <div
              className="card-motion"
              onClick={(e) => scrollToSection(e, 'recent-work')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') scrollToSection(e, 'recent-work');
              }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '2rem',
                borderRadius: 'var(--radius-3xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}
                >
                  <span
                    className="font-display-xl"
                    style={{
                      fontWeight: '800',
                      color: 'var(--color-surface-container-lowest)',
                      letterSpacing: '-0.03em'
                    }}
                  >
                    {trackRecordMetrics[2]?.value || '180+'}
                  </span>
                  <span
                    className="font-label-mono-sm"
                    style={{
                      color: '#7AC142',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      fontWeight: '600'
                    }}
                  >
                    {trackRecordMetrics[2]?.badge || 'Released Portfolio'}
                  </span>
                </div>
                <div
                  style={{
                    width: '4rem',
                    height: '4px',
                    backgroundColor: '#7AC142',
                    marginBottom: '1.5rem',
                    borderRadius: 'var(--radius-full)'
                  }}
                />
                <h3
                  className="font-headline-sm"
                  style={{
                    color: 'var(--color-surface-bright)',
                    fontWeight: '700',
                    marginBottom: '0.5rem'
                  }}
                >
                  {trackRecordMetrics[2]?.title || 'Commercial & Editorial Scale'}
                </h3>
                <p
                  className="font-body-sm"
                  style={{ color: 'var(--color-outline-variant)', lineHeight: 1.6 }}
                >
                  {trackRecordMetrics[2]?.desc}
                </p>
              </div>

              <div
                style={{
                  marginTop: '2rem',
                  paddingTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  color: 'var(--color-secondary-fixed)'
                }}
                className="font-label-mono-sm"
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Layers size={15} color="#38BDF8" />
                  <span>
                    {trackRecordMetrics[2]?.footerText
                      ? trackRecordMetrics[2].footerText
                      : `${projects.length} Featured in Curated Archive`}
                  </span>
                </span>
                <ArrowRight size={15} color="#7AC142" />
              </div>
            </div>
          </div>

          {/* Film & Brand Identity Spotlight (Moved below Track Record Summary) */}
          <div
            onMouseEnter={() => setIsHoveringSpotlight(true)}
            onMouseLeave={() => setIsHoveringSpotlight(false)}
            style={{
              marginTop: '3.5rem',
              paddingTop: '2.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'var(--color-outline-variant)',
                marginBottom: '0.75rem'
              }}
            >
              <span
                className="font-label-mono-sm"
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-secondary-fixed)'
                }}
              >
                {trackRecordHeader.spotlightLabel || 'Film & Brand Identity Spotlight'}
              </span>
              <span className="font-label-mono-sm" id="hero-slider-counter" style={{ fontWeight: '600' }}>
                0{activeSpotlight + 1} / 0{spotlightProjects.length}
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.75rem'
              }}
            >
              {spotlightProjects.map((p, idx) => {
                const isActive = activeSpotlight === idx;
                return (
                  <button
                    key={p.id || idx}
                    type="button"
                    onMouseEnter={() => setActiveSpotlight(idx)}
                    onClick={() => {
                      setActiveSpotlight(idx);
                      handleInspectProject(p);
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '0.95rem 1rem',
                      borderRadius: 'var(--radius-xl)',
                      backgroundColor: isActive
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(255, 255, 255, 0.04)',
                      border: isActive
                        ? '1px solid #ED1C24'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer',
                      transition: 'all 300ms ease',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                    className="group"
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.4rem',
                          marginBottom: '0.4rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', minWidth: 0 }}>
                          <span
                            style={{
                              width: '7px',
                              height: '7px',
                              borderRadius: '50%',
                              flexShrink: 0,
                              backgroundColor: isActive ? '#ED1C24' : 'rgba(194, 198, 211, 0.4)',
                              transition: 'background-color 200ms ease'
                            }}
                          />
                          <span
                            className="font-label-mono-sm"
                            style={{
                              fontSize: '10px',
                              color: isActive ? '#ffdad6' : 'var(--color-outline-variant)',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.04em',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            0{idx + 1} • {p.category}
                          </span>
                        </div>
                        {isActive && (
                          <span
                            className="font-label-mono-sm"
                            style={{
                              fontSize: '9px',
                              color: '#7AC142',
                              fontWeight: '700',
                              flexShrink: 0,
                              letterSpacing: '0.04em'
                            }}
                          >
                            OPEN ↗
                          </span>
                        )}
                      </div>

                      <p
                        className="font-body-sm"
                        style={{
                          color: isActive
                            ? 'var(--color-surface-container-lowest)'
                            : 'var(--color-outline-variant)',
                          fontWeight: isActive ? '700' : '500',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          margin: 0
                        }}
                      >
                        {p.title}
                      </p>
                    </div>

                    <div
                      style={{
                        height: '2px',
                        width: isActive ? '100%' : '0%',
                        backgroundColor: isActive ? '#ED1C24' : 'var(--color-primary-fixed-dim)',
                        marginTop: '0.6rem',
                        borderRadius: 'var(--radius-full)',
                        transition: 'all 300ms ease'
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes heroSlideProgress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .hero-slide-progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          height: 100%;
          background-color: #ED1C24;
          border-radius: 9999px;
          animation: heroSlideProgress 3000ms linear forwards;
        }
        .hero-content-row {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          gap: 2rem;
          flex: 1;
          margin: 0;
          padding: 0;
          width: 100%;
        }
        @media (max-width: 1023px) {
          .hero-portrait-empty {
            display: none !important;
          }
          .hero-portrait-slot {
            align-self: center !important;
          }
        }
        @media (min-width: 768px) {
          .hidden-mobile {
            display: flex !important;
          }
          .md-row-header {
            flex-direction: row !important;
            align-items: flex-end !important;
          }
          .md-text-right {
            text-align: right !important;
          }
        }
        @media (min-width: 1024px) {
          .hero-content-row {
            flex-direction: row;
            align-items: stretch;
          }
        }
      `}</style>
    </>
  );
}
