import React from 'react';
import { getStoragePublicUrl } from '../../lib/queries';
import {
  Camera,
  Award,
  TrendingUp,
  Palette,
  ArrowUpRight,
  Briefcase,
  MapPin,
  ArrowRight
} from 'lucide-react';

const FALLBACK_PORTRAIT =
  'https://pipymdkphzhkyvutclfn.supabase.co/storage/v1/object/public/portfolio-media/avatars/avatar-1793091534469.webp';

export function About({ settings, onOpenDetailModal }) {
  const avatarSrc = getStoragePublicUrl(settings?.avatar_url) || FALLBACK_PORTRAIT;
  const name = settings?.name || 'PRIO SETYO';
  const headline = settings?.headline || 'Visual Creator, Designer & Copywriter';
  const location = settings?.location || 'Dumai, Riau | Indonesia';

  const pillars = [
    {
      num: '01',
      icon: Camera,
      title: 'Commercial Photography & Video',
      desc: 'Dokumentasi visual skala industri energi, sinematografi aerial drone, dan video profil korporat dengan pencahayaan sinematik yang presisi.',
      specs: [
        'Industrial & Refinery Documentation',
        'Aerial Drone Cinematography',
        'Broadcast-Grade Video Profile Production',
        'Cinematic High-Dynamic Lighting'
      ]
    },
    {
      num: '02',
      icon: Award,
      title: 'Strategic Corporate Storytelling',
      desc: 'Mengelola komunikasi terintegrasi, narasi keberlanjutan (ESG), dan publikasi kehumasan yang mengantarkan penghargaan Anugrah Humas Indonesia.',
      specs: [
        'Winner — Anugrah Humas Indonesia',
        'ESG & CSR Impact Storytelling',
        'Stakeholder & Corporate Reputation Strategy',
        'Integrated Internal & External PR Campaign'
      ]
    },
    {
      num: '03',
      icon: TrendingUp,
      title: 'Audience & Digital Growth',
      desc: 'Membawa akun Instagram @pertaminaru2 melesat dari 8.000 hingga 67.000+ followers—menjadi akun kilang refinery #1 paling banyak diikuti di Indonesia.',
      specs: [
        '#1 Most-Followed Refinery Account Nationwide',
        'Growth from 8,000 to 67,000+ Followers',
        'High-Engagement Social Media Architecture',
        'Data-Driven Content Optimization'
      ]
    },
    {
      num: '04',
      icon: Palette,
      title: 'Brand Identity & Copywriting',
      desc: 'Menyusun identitas visual yang terstruktur dengan disiplin Swiss Modernist, desain editorial laporan korporat, dan naskah narasi persuasif bernilai komersial.',
      specs: [
        'Swiss Grid Publication & Editorial Design',
        'Corporate Manifesto & Campaign Scripting',
        'Brand Identity Architecture & Guidelines',
        'High-Retention Creative Copywriting'
      ]
    }
  ];

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      style={{
        width: '100%',
        backgroundColor: '#F4F7FA',
        padding: '5rem 0',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 var(--margin-mobile)'
        }}
      >
        {/* Header Section */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span
            className="font-label-mono-sm"
            style={{
              color: 'var(--color-primary-container)',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            ABOUT PRIO SETYO
          </span>
          <h2
            className="font-headline-lg"
            style={{
              color: 'var(--color-on-surface)',
              fontWeight: '700',
              letterSpacing: '-0.025em',
              marginBottom: '0.65rem'
            }}
          >
            Visual Creator, Designer & Strategic Communicator
          </h2>
          <p
            className="font-body-md"
            style={{
              color: 'var(--color-outline-variant)',
              maxWidth: '44rem',
              lineHeight: 1.6,
              margin: 0
            }}
          >
            Menjembatani kedisiplinan dan presisi komunikasi industri energi dengan estetika visual modern, desain fungsional, dan narasi digital berdaya pikat.
          </p>
        </div>

        {/* 2-Columns Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--gutter-lg)',
            alignItems: 'stretch'
          }}
          className="about-grid"
        >
          {/* Kolom Kiri: Foto Potret & Identitas Visual */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div
              className="group"
              style={{
                position: 'relative',
                width: '100%',
                height: '520px',
                borderRadius: 'var(--radius-3xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                backgroundColor: '#071320'
              }}
            >
              <img
                src={avatarSrc}
                alt={`Portrait ${name}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  transition: 'transform 700ms ease-out'
                }}
                className="group-hover:scale-105"
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.75rem',
                  background:
                    'linear-gradient(to top, rgba(7, 19, 32, 0.95) 0%, rgba(7, 19, 32, 0.72) 60%, transparent 100%)',
                  color: '#ffffff'
                }}
              >
                <span
                  className="font-label-mono-sm"
                  style={{
                    color: '#d2e4ff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    fontWeight: '700',
                    display: 'block',
                    marginBottom: '0.25rem'
                  }}
                >
                  {name}
                </span>
                <p
                  className="font-headline-sm"
                  style={{ fontWeight: '700', color: '#ffffff', margin: 0 }}
                >
                  {headline}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'rgba(255, 255, 255, 0.75)',
                    marginTop: '0.4rem',
                    fontSize: '12px'
                  }}
                  className="font-label-mono-sm"
                >
                  <MapPin size={13} color="#ffffff" />
                  <span>{location}</span>
                </div>
              </div>
            </div>

            {/* Sub-card: Industri Migas & Kredensial */}
            <div
              style={{
                marginTop: '1rem',
                padding: '1.1rem 1.25rem',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--color-surface-container-lowest)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid rgba(194, 198, 211, 0.3)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '0.5rem',
                    backgroundColor: '#00529B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff'
                  }}
                >
                  <Briefcase size={16} />
                </div>
                <div>
                  <span
                    className="font-label-mono-sm"
                    style={{
                      display: 'block',
                      color: 'var(--color-on-surface)',
                      fontWeight: '700',
                      fontSize: '12px'
                    }}
                  >
                    Oil & Gas Corporate Communication
                  </span>
                  <span
                    className="font-label-mono-sm"
                    style={{
                      color: 'var(--color-outline-variant)',
                      fontSize: '11px'
                    }}
                  >
                    PT Pertamina Patra Niaga Refinery Unit Dumai
                  </span>
                </div>
              </div>
              <span
                className="font-label-mono-sm"
                style={{
                  color: '#00529B',
                  fontWeight: '800',
                  fontSize: '11px',
                  padding: '0.3rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: '#d5e3ff'
                }}
              >
                6+ Years
              </span>
            </div>
          </div>

          {/* Kolom Kanan: Manifesto Filosofi & 4 Pilar Keahlian */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.25rem'
            }}
          >
            {/* Card 1: Solid Royal Blue Card (Philosophy & Core Essence) */}
            <div
              className="card-motion"
              style={{
                padding: '2rem 2.25rem',
                borderRadius: 'var(--radius-3xl)',
                backgroundColor: '#00529B',
                color: 'var(--color-surface-container-lowest)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}
              >
                <span
                  className="font-label-mono-sm"
                  style={{
                    color: 'var(--color-primary-fixed)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: '700'
                  }}
                >
                  CORE ESSENCE • PHILOSOPHY
                </span>
                <span
                  className="font-label-mono-sm"
                  style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: 'var(--color-surface-container-lowest)',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}
                >
                  ENERGIZING BRANDS
                </span>
              </div>
              <h3
                className="font-headline-md"
                style={{
                  fontWeight: '700',
                  marginBottom: '0.65rem',
                  letterSpacing: '-0.02em',
                  color: '#ffffff'
                }}
              >
                Energizing Brands, Elevating Visuals
              </h3>
              <div
                style={{
                  width: '3.5rem',
                  height: '3px',
                  backgroundColor: '#ffffff',
                  marginBottom: '1rem',
                  borderRadius: 'var(--radius-full)'
                }}
              />
              <p
                className="font-body-md"
                style={{
                  color: 'rgba(255, 255, 255, 0.92)',
                  lineHeight: 1.68,
                  fontWeight: '400',
                  margin: 0
                }}
              >
                Bagi saya, karya visual bukan sekadar estetika di permukaan—ia adalah jembatan kinetik yang menghubungkan nilai industri dengan denyut hati audiens. Melalui perpaduan kepekaan artistik fotografi, sinematografi, desain grafis terstruktur, dan penulisan naskah yang terukur, saya membantu korporasi dan brand mengomunikasikan pesan berbobot dengan cara yang berdaya pikat dan mudah dipahami.
              </p>
            </div>

            {/* 4 Pilar Keahlian (Grid 2x2 Clean & Interactive) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem'
              }}
            >
              {pillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="card-motion group"
                    onClick={() => {
                      if (onOpenDetailModal) {
                        onOpenDetailModal({
                          title: pillar.title,
                          category: `(${pillar.num}) STRATEGIC PILLAR`,
                          description: pillar.desc,
                          specs: pillar.specs
                        });
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ' ') && onOpenDetailModal) {
                        e.preventDefault();
                        onOpenDetailModal({
                          title: pillar.title,
                          category: `(${pillar.num}) STRATEGIC PILLAR`,
                          description: pillar.desc,
                          specs: pillar.specs
                        });
                      }
                    }}
                    style={{
                      padding: '1.5rem',
                      borderRadius: 'var(--radius-3xl)',
                      backgroundColor: 'var(--color-surface-container-lowest)',
                      boxShadow: 'var(--shadow-sm)',
                      border: '1px solid rgba(194, 198, 211, 0.25)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 250ms ease'
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          marginBottom: '0.75rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '0.4rem',
                              backgroundColor: 'rgba(0, 82, 155, 0.08)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--color-primary-container)'
                            }}
                          >
                            <IconComponent size={15} />
                          </div>
                          <span
                            className="font-label-mono-sm"
                            style={{ color: 'var(--color-secondary)', fontWeight: '700' }}
                          >
                            ({pillar.num}) PILLAR
                          </span>
                        </div>
                        <ArrowUpRight
                          size={16}
                          style={{
                            color: 'var(--color-outline-variant)',
                            transition: 'transform 200ms ease, color 200ms ease'
                          }}
                          className="group-hover:text-[#00529B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                      <h4
                        className="font-headline-sm"
                        style={{
                          color: 'var(--color-on-surface)',
                          fontWeight: '700',
                          marginBottom: '0.5rem',
                          fontSize: '16px',
                          letterSpacing: '-0.015em'
                        }}
                      >
                        {pillar.title}
                      </h4>
                      <div
                        style={{
                          width: '2rem',
                          height: '2px',
                          backgroundColor: '#00529B',
                          marginBottom: '0.75rem',
                          borderRadius: 'var(--radius-full)'
                        }}
                      />
                      <p
                        className="font-body-sm"
                        style={{
                          color: 'var(--color-on-surface-variant)',
                          lineHeight: 1.6,
                          margin: 0
                        }}
                      >
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Strategic Status Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(194, 198, 211, 0.25)',
                gap: '1rem',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#7AC142'
                  }}
                />
                <span
                  className="font-label-mono-sm"
                  style={{
                    color: 'var(--color-on-surface-variant)',
                    fontWeight: '600',
                    fontSize: '11px',
                    letterSpacing: '0.04em'
                  }}
                >
                  TERBUKA UNTUK KOLABORASI & PROJECT KREATIF
                </span>
              </div>
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="font-label-mono-sm group"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--color-primary-container)',
                  fontWeight: '700',
                  textDecoration: 'none',
                  fontSize: '11px'
                }}
              >
                <span>HUBUNGI PRIO</span>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: 5fr 7fr !important;
          }
        }
      `}</style>
    </section>
  );
}
