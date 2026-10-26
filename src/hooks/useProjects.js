import { useState, useEffect, useCallback } from 'react';
import { getPublishedProjects } from '../lib/queries';

// Curated default projects matching exact Google Stitch design
const STITCH_PROJECTS = [
  {
    id: 'stitch-proj-01',
    slug: 'nova-spatial-os',
    title: 'Nova Spatial OS',
    category: 'design',
    categoryLabel: 'Desain UI/UX',
    year: 2024,
    summary: 'Next-gen spatial computing design system & modular glass design language.',
    description: 'Perancangan antarmuka komputasi spasial generasi baru yang melayang dalam lapisan kaca translusen dinamis dengan latar belakang deep space obsidian. Dilengkapi mikro-widget neon oranye menyala, menu bertingkat holografis, tipografi data kinetik, dan panel kaca sentuh spasial yang ultra-presisi.',
    client: 'Nova Technologies Ltd.',
    role: 'Spatial Systems & UI/UX Director',
    excerpt: 'Next-gen spatial computing design system & modular glass design language.',
    meta: {
      platform: 'VisionOS & Spatial Web',
      tools: 'Figma Spatials, Spline 3D, Metal Shader',
      language: 'English & Multi-Spatial'
    },
    is_published: true,
    sort_order: 1,
    project_media: [
      {
        id: 'media-s1',
        kind: 'image',
        thumb_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEofPaya-ZGWveRCDy8cNUJRN_N5NCwX8ngR_QWgpEBmZTMQSRSh6bxRyttNiIroK5QcXboYpJxqPZs9QkCWZcOtUeAGvDkKGmo-uebF1mBjT3YA7YmeL8Csg_uPYRVhbCmdunD9DPNpU9f3Sb3ARiTfkBAzuu8v5JuA6WzP9sHblTo2IT7q4-IVdBGZ-q_-tkeuAJxBOf8ewixWB6K-4TYKjcKa2VI3i50WA3Er0',
        storage_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEofPaya-ZGWveRCDy8cNUJRN_N5NCwX8ngR_QWgpEBmZTMQSRSh6bxRyttNiIroK5QcXboYpJxqPZs9QkCWZcOtUeAGvDkKGmo-uebF1mBjT3YA7YmeL8Csg_uPYRVhbCmdunD9DPNpU9f3Sb3ARiTfkBAzuu8v5JuA6WzP9sHblTo2IT7q4-IVdBGZ-q_-tkeuAJxBOf8ewixWB6K-4TYKjcKa2VI3i50WA3Er0',
        alt_text: 'Nova Spatial OS Interface',
        width: 1920,
        height: 1080,
        sort_order: 1
      }
    ]
  },
  {
    id: 'stitch-proj-02',
    slug: 'silent-monolith',
    title: 'Silent Monolith',
    category: 'photo',
    categoryLabel: 'Fotografi & Seni',
    year: 2024,
    summary: 'Editorial visual campaign menyelidiki ruang, arsitektur brutalism, dan kesunyian manusia.',
    description: 'Kampanye visual editorial monokromatik arsitektur beton brutalis monumental di kala senja keemasan. Siluet figur dalam mantel busana tinggi berdiri di lorong lengkung geometris beton, dengan pencahayaan senja vermilion menyentuh tepian monolit.',
    client: 'Monolith Architectural Monograph',
    role: 'Lead Photographer & Art Director',
    excerpt: 'Editorial visual campaign menyelidiki ruang, arsitektur brutalism, dan kesunyian manusia.',
    meta: {
      camera: 'Phase One XF 100MP',
      lens: 'Schneider Kreuznach 35mm LS',
      location: 'Bandung & Kyoto'
    },
    is_published: true,
    sort_order: 2,
    project_media: [
      {
        id: 'media-s2',
        kind: 'image',
        thumb_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJJWJQHqgaJrmmXgNkWqjiPjVu7ZXUY93Ukc-HYliONfsYpK_nSAnrYbzGboJ0gyL8MSQnESy0w6V8M6mAAlq-Zh1zMtIsBlD2evEHv5yejd9hJk4BSVDi0ZThWFhJ2xzbDkXnZQ-qPEqNJyWPJc7Xiec9xXS4QrDZqG2jWs0Eg49tPpt08SC6Lc3RGOU5LszmeDEkUa64Dfvu31LzCX-tPZBOsWCs6Kz2FuKgrtU',
        storage_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJJWJQHqgaJrmmXgNkWqjiPjVu7ZXUY93Ukc-HYliONfsYpK_nSAnrYbzGboJ0gyL8MSQnESy0w6V8M6mAAlq-Zh1zMtIsBlD2evEHv5yejd9hJk4BSVDi0ZThWFhJ2xzbDkXnZQ-qPEqNJyWPJc7Xiec9xXS4QrDZqG2jWs0Eg49tPpt08SC6Lc3RGOU5LszmeDEkUa64Dfvu31LzCX-tPZBOsWCs6Kz2FuKgrtU',
        alt_text: 'Silent Monolith Architectural Photography',
        width: 1920,
        height: 1080,
        sort_order: 1
      }
    ]
  },
  {
    id: 'stitch-proj-03',
    slug: 'echoes-of-nusantara',
    title: 'Echoes of Nusantara',
    category: 'video',
    categoryLabel: 'Videografi & Sinematografi',
    year: 2023,
    summary: 'Film dokumenter sinematik 4K mengeksplorasi mitologi dan warisan maritim kepulauan.',
    description: 'Tangkapan film dokumenter 4K yang mengabadikan lanskap vulkanik purba Indonesia di kala fajar berkabut. Perajin wayang kulit tradisional bekerja di bawah sorotan lampu minyak lentera temaram, debu atmosfer melayang di udara dengan color grade sinematik hangat dan mendalam.',
    client: 'Nusantara Heritage Foundation',
    role: 'Director, Cinematographer & Colorist',
    excerpt: 'Film dokumenter sinematik 4K mengeksplorasi mitologi dan warisan maritim kepulauan.',
    meta: {
      camera: 'RED Komodo 6K & Cooke Anamorphic',
      color: 'DaVinci Resolve Studio (Film Print Emulation)',
      duration: '18 Menit'
    },
    is_published: true,
    sort_order: 3,
    project_media: [
      {
        id: 'media-s3',
        kind: 'image',
        thumb_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQDL8KyX67MLyaR7WRfaYFlh9D3zIMs9-FgF-5WUMaZP98VJN0u0HWQnagcNiYU21us6WzS1dos1hALtR8p9j1Y1cJS6p7Y5y8PF80Vcr0kUHLBjdnwxTe2og09FZy-SgOiug8FWF4K8yPNODiqBk7_L-EoD4JSpFPMnDuzUUCTGGo1s70qVEUA80yLgJdIy2XO46DFN7rIdbSRUJopu4F23RB7b9BsrukJGrePAc',
        storage_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQDL8KyX67MLyaR7WRfaYFlh9D3zIMs9-FgF-5WUMaZP98VJN0u0HWQnagcNiYU21us6WzS1dos1hALtR8p9j1Y1cJS6p7Y5y8PF80Vcr0kUHLBjdnwxTe2og09FZy-SgOiug8FWF4K8yPNODiqBk7_L-EoD4JSpFPMnDuzUUCTGGo1s70qVEUA80yLgJdIy2XO46DFN7rIdbSRUJopu4F23RB7b9BsrukJGrePAc',
        alt_text: 'Echoes of Nusantara Film Still',
        width: 1920,
        height: 1080,
        sort_order: 1
      }
    ]
  },
  {
    id: 'stitch-proj-04',
    slug: 'minimalist-spatial-identity',
    title: 'Minimalist Spatial Identity',
    category: 'copy',
    categoryLabel: 'Copywriting & Editorial',
    year: 2023,
    summary: 'Editorial monograph & narasi kuratorial arsitektur modern Asia Pasifik.',
    description: 'Tata letak publikasi arsitektur hardcover elegan dengan kertas matte Jepang bertesktur, tipografi Swiss klasik, dan narasi kuratorial yang membimbing pembaca menjelajahi ruang hunian hening berlapis kayu dan beton ekspos.',
    client: 'Atelier Spatial Review',
    role: 'Editorial Lead & Curator',
    excerpt: 'Editorial monograph & narasi kuratorial arsitektur modern Asia Pasifik.',
    meta: {
      type: 'Publication & Monograph Hardcover',
      typeface: 'Neue Haas Grotesk & Editorial New',
      pages: '240 Halaman'
    },
    is_published: true,
    sort_order: 4,
    project_media: [
      {
        id: 'media-s4',
        kind: 'image',
        thumb_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIZ9WdXuNxt44iBS-4auf6jTJMPv7tm3YWi_wIOpXTyE7Vkgx8iOwF1ivwHFKiR5cEfEpspADw0AhfNWqEfOgxfFLzTYySK53lPJXMfvZiEu--2OP72hxWRCQGGHwlJm65yLtiTFHVyk3A0p4TbgR3CIKqIF_PBisqPl6luHIr25qafE2z2rqvF6zw8fQD-ta1Q6AVu7Fd0QOIEX6tcO78ogKm4NqP5tHgmK-u_JI',
        storage_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIZ9WdXuNxt44iBS-4auf6jTJMPv7tm3YWi_wIOpXTyE7Vkgx8iOwF1ivwHFKiR5cEfEpspADw0AhfNWqEfOgxfFLzTYySK53lPJXMfvZiEu--2OP72hxWRCQGGHwlJm65yLtiTFHVyk3A0p4TbgR3CIKqIF_PBisqPl6luHIr25qafE2z2rqvF6zw8fQD-ta1Q6AVu7Fd0QOIEX6tcO78ogKm4NqP5tHgmK-u_JI',
        alt_text: 'Minimalist Spatial Identity Book Layout',
        width: 1920,
        height: 1080,
        sort_order: 1
      }
    ]
  },
  {
    id: 'stitch-proj-05',
    slug: 'apex-vanguard',
    title: 'Apex Vanguard',
    category: 'design',
    categoryLabel: 'Brand Identity',
    year: 2022,
    summary: 'Identitas kinetik komprehensif dan sistem visual aplikasi venture capital teknologi.',
    description: 'Sistem identitas jenama berdaya sentak tinggi dan dashboard analitik untuk modal ventura teknologi energi bersih generasi baru. Menggabungkan layout tipografis tajam, diagram data elektrik vermilion dinamis, dan permukaan karbon gelap.',
    client: 'Apex Vanguard Global',
    role: 'Creative Director & Brand Architect',
    excerpt: 'Identitas kinetik komprehensif dan sistem visual aplikasi venture capital teknologi.',
    meta: {
      deliverables: 'Brand Architecture, Design Tokens, Kinetic Design',
      industry: 'Clean Energy & Venture Capital'
    },
    is_published: true,
    sort_order: 5,
    project_media: [
      {
        id: 'media-s5',
        kind: 'image',
        thumb_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDllCkHRIougiyqRWHGJLWDrV55d8vecFNTScdOcV0msY7wcCViWHKSa2M8FXuLkLTVo1yIGcPpWKoYSxwcyUoShAcMnUHbzfengCqLgvUVQdvCKy89YlmsswdywJai31Ka8hDQmttxjuTRY3o349XKSZT-CGuq7kUJ_bA5DNZSNiSTfRc8SxEjFmD3oOQllOCa6d1GKiUkGO_5b1NhpGi3Z7NziIj-LC9ogqR4IBE',
        storage_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDllCkHRIougiyqRWHGJLWDrV55d8vecFNTScdOcV0msY7wcCViWHKSa2M8FXuLkLTVo1yIGcPpWKoYSxwcyUoShAcMnUHbzfengCqLgvUVQdvCKy89YlmsswdywJai31Ka8hDQmttxjuTRY3o349XKSZT-CGuq7kUJ_bA5DNZSNiSTfRc8SxEjFmD3oOQllOCa6d1GKiUkGO_5b1NhpGi3Z7NziIj-LC9ogqR4IBE',
        alt_text: 'Apex Vanguard Brand Identity Interface',
        width: 1920,
        height: 1080,
        sort_order: 1
      }
    ]
  },
  {
    id: 'stitch-proj-06',
    slug: 'komorebi-serenity',
    title: 'Komorebi Serenity',
    category: 'photo',
    categoryLabel: 'Fotografi',
    year: 2022,
    summary: 'Studi puitis interaksi cahaya alami Skandinavia dan arsitektur kayu tradisional Jepang.',
    description: 'Karya fotografi seni rupa medium format yang mengabadikan cahaya matahari yang menyusup di antara dedaunan rimbun pohon cemara dan maple (komorebi). Pola geometris lembut menyentuh lantai tatami dan dinding kayu cedar yang damai.',
    client: 'Nordic-Kyoto Architecture Dialogue',
    role: 'Fine Art Photographer',
    excerpt: 'Studi puitis interaksi cahaya alami Skandinavia dan arsitektur kayu tradisional Jepang.',
    meta: {
      camera: 'Hasselblad 907X 50C',
      lens: 'XCD 45mm f/4 P',
      location: 'Kyoto, Japan'
    },
    is_published: true,
    sort_order: 6,
    project_media: [
      {
        id: 'media-s6',
        kind: 'image',
        thumb_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxR8p1mdUkdU_k_kbTDAThJW9hbl9kZnlKYKbKH5RqvH0cNLGUToLXn74Ffbc1hTGCWQyClrPqtYJtk9C8h6WHDdctHvr-b9Q7XLuxjxskgiuMz5IYCPAdM8hDbAR0AbIGpr_QbAhQHxdYUJxBSddLBNAWh8fnXlMbs7Y9qOx8F8LWP4evYkSjSO8XkhKSXVA9NkLEUcDX6GuugvXfqoyGcUj2tZ1vVwbzE04acXA',
        storage_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxR8p1mdUkdU_k_kbTDAThJW9hbl9kZnlKYKbKH5RqvH0cNLGUToLXn74Ffbc1hTGCWQyClrPqtYJtk9C8h6WHDdctHvr-b9Q7XLuxjxskgiuMz5IYCPAdM8hDbAR0AbIGpr_QbAhQHxdYUJxBSddLBNAWh8fnXlMbs7Y9qOx8F8LWP4evYkSjSO8XkhKSXVA9NkLEUcDX6GuugvXfqoyGcUj2tZ1vVwbzE04acXA',
        alt_text: 'Komorebi Serenity Fine Art Photography',
        width: 1920,
        height: 1080,
        sort_order: 1
      }
    ]
  }
];

export function useProjects() {
  const [projects, setProjects] = useState(STITCH_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getPublishedProjects();
      if (Array.isArray(data) && data.length > 0) {
        setProjects(data);
      } else {
        setProjects(STITCH_PROJECTS);
      }
    } catch (err) {
      console.warn('Gagal memuat projects dari Supabase, menggunakan data Stitch:', err);
      setError(err);
      setProjects(STITCH_PROJECTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects
  };
}
