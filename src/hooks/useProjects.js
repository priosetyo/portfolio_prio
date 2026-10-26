import { useState, useEffect, useCallback } from 'react';
import { getPublishedProjects } from '../lib/queries';

// Curated default projects matching exact Google Stitch design
const STITCH_PROJECTS = [
  {
    id: 'stitch-proj-01',
    slug: 'mono-spatial-pavilion',
    title: 'Mono Spatial Pavilion',
    category: 'design',
    categoryLabel: 'Spatial System',
    subCategory: 'Pavilion Architecture',
    locationYear: 'JAKARTA / 2024',
    year: 2024,
    summary: 'Instalasi spasial interaktif berskala 1.200 meter persegi untuk pameran biennial seni rupa kontemporer.',
    description: 'Instalasi spasial interaktif berskala 1.200 meter persegi untuk pameran biennial seni rupa kontemporer. Menggabungkan dinding beton lengkung monumental, skylight terdistribusi halus, dan refleksi kolam zen untuk menciptakan pengalaman spasial yang menenangkan.',
    client: 'Mono Foundation',
    role: 'Spatial Systems & Architecture Director',
    excerpt: 'Instalasi spasial interaktif berskala 1.200 meter persegi untuk pameran biennial seni rupa kontemporer.',
    meta: {
      location: 'Jakarta',
      scale: '1.200 m²',
      materials: 'Concrete, Zen Basin, Diffused Skylight'
    },
    is_published: true,
    sort_order: 1,
    project_media: [
      {
        id: 'media-s1',
        kind: 'image',
        thumb_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa2KOlfDWEI_usA-OnOjp3a2gg2wYXQ8JqEKgT6dPfKs0QED6iQt-6apVB4u0Y88SYYSTkI7iEjrZyQWCwYncdE22z-HdmNDvCA29vfXKaNbMeKhdAgDI_zksjN4ETeC6oHeuFpLQYS7JZFaP4-fkZxU-IDqj82uUMJeraANVwimVd4jJX_52m0mJjIBk0KrLMGGuBwaGc7eKxh2kaKLD0mC8AbkpXv05T0or4Jlg',
        storage_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa2KOlfDWEI_usA-OnOjp3a2gg2wYXQ8JqEKgT6dPfKs0QED6iQt-6apVB4u0Y88SYYSTkI7iEjrZyQWCwYncdE22z-HdmNDvCA29vfXKaNbMeKhdAgDI_zksjN4ETeC6oHeuFpLQYS7JZFaP4-fkZxU-IDqj82uUMJeraANVwimVd4jJX_52m0mJjIBk0KrLMGGuBwaGc7eKxh2kaKLD0mC8AbkpXv05T0or4Jlg',
        alt_text: 'Mono Spatial Pavilion',
        width: 1920,
        height: 1440,
        sort_order: 1
      }
    ]
  },
  {
    id: 'stitch-proj-02',
    slug: 'aura-kinetic-film',
    title: 'Aura Kinetic Film',
    category: 'video',
    categoryLabel: 'Commercial Film',
    subCategory: 'Campaign Direction',
    locationYear: 'TOKYO / 2024',
    year: 2024,
    summary: 'Penyutradaraan kampanye sinematik global untuk peluncuran lini wearable cerdas generasi terbaru.',
    description: 'Penyutradaraan kampanye sinematik global untuk peluncuran lini wearable cerdas generasi terbaru. Menggunakan pencahayaan studio chiaroscuro dramatis, model atletik tertangkap di tengah gerakan dengan kain tipis berpendar, dan estetika butiran film 35mm yang kaya.',
    client: 'Aura Wearables',
    role: 'Campaign Director & Cinematographer',
    excerpt: 'Penyutradaraan kampanye sinematik global untuk peluncuran lini wearable cerdas generasi terbaru.',
    meta: {
      camera: 'Arri Alexa Mini LF & Cooke S4/i',
      grading: 'DaVinci Resolve Studio (35mm Film Grain)',
      location: 'Tokyo & Kyoto'
    },
    is_published: true,
    sort_order: 2,
    project_media: [
      {
        id: 'media-s2',
        kind: 'image',
        thumb_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw-HjHTxu0iiEQ5z7YvjAbVP9wfRoOcfUb13m1mFshL5HU6LfmOEyk_w9r7ILa2sS5f7YN6AT4xK9vAXIfYQRiV0s1IagWRXCZndw5C-09Y5hCK0pIeBZtWRgQ8ROcmnmez5qemMezfiQ9P0sdjBnbsAJkJRPodhoCrxzeh-quGgzLEdorxq0VQtnxJF_SLz3-iHG5jz2SojHZd69KaE4NN6YwL2UGlbXJTZ00ZV8',
        storage_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw-HjHTxu0iiEQ5z7YvjAbVP9wfRoOcfUb13m1mFshL5HU6LfmOEyk_w9r7ILa2sS5f7YN6AT4xK9vAXIfYQRiV0s1IagWRXCZndw5C-09Y5hCK0pIeBZtWRgQ8ROcmnmez5qemMezfiQ9P0sdjBnbsAJkJRPodhoCrxzeh-quGgzLEdorxq0VQtnxJF_SLz3-iHG5jz2SojHZd69KaE4NN6YwL2UGlbXJTZ00ZV8',
        alt_text: 'Aura Kinetic Film Frame',
        width: 1920,
        height: 1440,
        sort_order: 1
      }
    ]
  },
  {
    id: 'stitch-proj-03',
    slug: 'kinetik-identity-voice',
    title: 'Kinetik Identity & Voice',
    category: 'copy',
    categoryLabel: 'Editorial & Copy',
    subCategory: 'Brand Manifesto',
    locationYear: 'BERLIN / 2025',
    year: 2025,
    summary: 'Perumusan arsitektur naratif, pedoman copywriting, dan fotografi editorial untuk kendaraan listrik masa depan.',
    description: 'Perumusan arsitektur naratif, pedoman copywriting, dan fotografi editorial untuk kendaraan listrik masa depan. Tata letak grid Swiss ekstrem, huruf sans-serif tebal, dan tekstur foil debossed pada kertas matte mentah bernuansa off-white.',
    client: 'Kinetik Mobility',
    role: 'Editorial Lead & Brand Architect',
    excerpt: 'Perumusan arsitektur naratif, pedoman copywriting, dan fotografi editorial untuk kendaraan listrik masa depan.',
    meta: {
      type: 'Brand Architecture & Copywriting Manifesto',
      typeface: 'Neue Haas Grotesk & Syne',
      deliverables: 'Brand Book, Motion Manifesto, Editorial'
    },
    is_published: true,
    sort_order: 3,
    project_media: [
      {
        id: 'media-s3',
        kind: 'image',
        thumb_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOa2CZ7oJQpqn24tmFYPG-ipuAF3HbDXddDuzTXTZAyrz6xjDOt8yFhNRKAkgRmmKn_3QxK46zh2_b-h-2PhTyVYBzsVN65eou6dmKd4O_qZwRSwaU5k3tsRRZoV04gACDu0yG9lCCXLgVYWiFyCr-CGC8IHce3IttCfbl-wafpe7Vr5dh2EOaWiOF-_5xa6I5-wae3cbmqwVwku8JQRBHQ17xgv0hTGBrIAocOJg',
        storage_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOa2CZ7oJQpqn24tmFYPG-ipuAF3HbDXddDuzTXTZAyrz6xjDOt8yFhNRKAkgRmmKn_3QxK46zh2_b-h-2PhTyVYBzsVN65eou6dmKd4O_qZwRSwaU5k3tsRRZoV04gACDu0yG9lCCXLgVYWiFyCr-CGC8IHce3IttCfbl-wafpe7Vr5dh2EOaWiOF-_5xa6I5-wae3cbmqwVwku8JQRBHQ17xgv0hTGBrIAocOJg',
        alt_text: 'Kinetik Identity Book Mockup',
        width: 1920,
        height: 1440,
        sort_order: 1
      }
    ]
  },
  {
    id: 'stitch-proj-04',
    slug: 'nova-spatial-os',
    title: 'Nova Spatial OS',
    category: 'design',
    categoryLabel: 'Spatial UI/UX',
    subCategory: 'VisionOS Interface',
    locationYear: 'LONDON / 2024',
    year: 2024,
    summary: 'Next-gen spatial computing design system & modular glass design language.',
    description: 'Perancangan antarmuka komputasi spasial generasi baru yang melayang dalam lapisan kaca translusen dinamis dengan latar belakang deep space obsidian.',
    client: 'Nova Technologies Ltd.',
    role: 'Spatial Systems & UI/UX Director',
    excerpt: 'Next-gen spatial computing design system & modular glass design language.',
    meta: {
      platform: 'VisionOS & Spatial Web',
      tools: 'Figma Spatials, Spline 3D'
    },
    is_published: true,
    sort_order: 4,
    project_media: [
      {
        id: 'media-s4',
        kind: 'image',
        thumb_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEofPaya-ZGWveRCDy8cNUJRN_N5NCwX8ngR_QWgpEBmZTMQSRSh6bxRyttNiIroK5QcXboYpJxqPZs9QkCWZcOtUeAGvDkKGmo-uebF1mBjT3YA7YmeL8Csg_uPYRVhbCmdunD9DPNpU9f3Sb3ARiTfkBAzuu8v5JuA6WzP9sHblTo2IT7q4-IVdBGZ-q_-tkeuAJxBOf8ewixWB6K-4TYKjcKa2VI3i50WA3Er0',
        storage_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEofPaya-ZGWveRCDy8cNUJRN_N5NCwX8ngR_QWgpEBmZTMQSRSh6bxRyttNiIroK5QcXboYpJxqPZs9QkCWZcOtUeAGvDkKGmo-uebF1mBjT3YA7YmeL8Csg_uPYRVhbCmdunD9DPNpU9f3Sb3ARiTfkBAzuu8v5JuA6WzP9sHblTo2IT7q4-IVdBGZ-q_-tkeuAJxBOf8ewixWB6K-4TYKjcKa2VI3i50WA3Er0',
        alt_text: 'Nova Spatial OS',
        width: 1920,
        height: 1080,
        sort_order: 1
      }
    ]
  },
  {
    id: 'stitch-proj-05',
    slug: 'silent-monolith',
    title: 'Silent Monolith',
    category: 'photo',
    categoryLabel: 'Fotografi Arsitektur',
    subCategory: 'Brutalist Monograph',
    locationYear: 'KYOTO / 2024',
    year: 2024,
    summary: 'Editorial visual campaign menyelidiki ruang, arsitektur brutalism, dan kesunyian manusia.',
    description: 'Kampanye visual editorial monokromatik arsitektur beton brutalis monumental di kala senja keemasan.',
    client: 'Monolith Architectural Monograph',
    role: 'Lead Photographer & Art Director',
    excerpt: 'Editorial visual campaign menyelidiki ruang, arsitektur brutalism, dan kesunyian manusia.',
    meta: {
      camera: 'Phase One XF 100MP',
      lens: 'Schneider Kreuznach 35mm LS'
    },
    is_published: true,
    sort_order: 5,
    project_media: [
      {
        id: 'media-s5',
        kind: 'image',
        thumb_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJJWJQHqgaJrmmXgNkWqjiPjVu7ZXUY93Ukc-HYliONfsYpK_nSAnrYbzGboJ0gyL8MSQnESy0w6V8M6mAAlq-Zh1zMtIsBlD2evEHv5yejd9hJk4BSVDi0ZThWFhJ2xzbDkXnZQ-qPEqNJyWPJc7Xiec9xXS4QrDZqG2jWs0Eg49tPpt08SC6Lc3RGOU5LszmeDEkUa64Dfvu31LzCX-tPZBOsWCs6Kz2FuKgrtU',
        storage_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJJWJQHqgaJrmmXgNkWqjiPjVu7ZXUY93Ukc-HYliONfsYpK_nSAnrYbzGboJ0gyL8MSQnESy0w6V8M6mAAlq-Zh1zMtIsBlD2evEHv5yejd9hJk4BSVDi0ZThWFhJ2xzbDkXnZQ-qPEqNJyWPJc7Xiec9xXS4QrDZqG2jWs0Eg49tPpt08SC6Lc3RGOU5LszmeDEkUa64Dfvu31LzCX-tPZBOsWCs6Kz2FuKgrtU',
        alt_text: 'Silent Monolith',
        width: 1920,
        height: 1080,
        sort_order: 1
      }
    ]
  },
  {
    id: 'stitch-proj-06',
    slug: 'echoes-of-nusantara',
    title: 'Echoes of Nusantara',
    category: 'video',
    categoryLabel: 'Sinematografi',
    subCategory: 'Heritage Documentary',
    locationYear: 'NUSANTARA / 2023',
    year: 2023,
    summary: 'Film dokumenter sinematik 4K mengeksplorasi mitologi dan warisan maritim kepulauan.',
    description: 'Tangkapan film dokumenter 4K yang mengabadikan lanskap vulkanik purba Indonesia di kala fajar berkabut.',
    client: 'Nusantara Heritage Foundation',
    role: 'Director & Cinematographer',
    excerpt: 'Film dokumenter sinematik 4K mengeksplorasi mitologi dan warisan maritim kepulauan.',
    meta: {
      camera: 'RED Komodo 6K & Cooke Anamorphic',
      color: 'DaVinci Resolve Studio'
    },
    is_published: true,
    sort_order: 6,
    project_media: [
      {
        id: 'media-s6',
        kind: 'image',
        thumb_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQDL8KyX67MLyaR7WRfaYFlh9D3zIMs9-FgF-5WUMaZP98VJN0u0HWQnagcNiYU21us6WzS1dos1hALtR8p9j1Y1cJS6p7Y5y8PF80Vcr0kUHLBjdnwxTe2og09FZy-SgOiug8FWF4K8yPNODiqBk7_L-EoD4JSpFPMnDuzUUCTGGo1s70qVEUA80yLgJdIy2XO46DFN7rIdbSRUJopu4F23RB7b9BsrukJGrePAc',
        storage_path: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQDL8KyX67MLyaR7WRfaYFlh9D3zIMs9-FgF-5WUMaZP98VJN0u0HWQnagcNiYU21us6WzS1dos1hALtR8p9j1Y1cJS6p7Y5y8PF80Vcr0kUHLBjdnwxTe2og09FZy-SgOiug8FWF4K8yPNODiqBk7_L-EoD4JSpFPMnDuzUUCTGGo1s70qVEUA80yLgJdIy2XO46DFN7rIdbSRUJopu4F23RB7b9BsrukJGrePAc',
        alt_text: 'Echoes of Nusantara',
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
