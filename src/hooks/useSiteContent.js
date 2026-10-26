import { useState, useEffect, useCallback } from 'react';
import { getSiteSettings, getSkills, getExperiences } from '../lib/queries';

// Fallback data yang aman jika koneksi Supabase belum terisi atau sedang offline
const DEFAULT_SETTINGS = {
  name: 'Prio Setyo',
  headline: 'Creative Director & Visual Storyteller',
  summary: 'Membangun ekosistem visual spektakuler, identitas brand sinematik, dan antarmuka spasial masa depan. Mengubah narasi kompleks menjadi pengalaman sensorik bernilai komersial tinggi.',
  email: 'prio@setyostudio.com',
  phone: '+62 812-3456-7890',
  linkedin: 'priosetyo',
  location: 'Jakarta & Singapore',
  cv_path: null
};

const DEFAULT_SKILLS = [
  { id: 's1', group_name: 'Fotografi', name: 'Commercial & Product Photography', sort_order: 1 },
  { id: 's2', group_name: 'Fotografi', name: 'Portrait & Editorial', sort_order: 2 },
  { id: 's3', group_name: 'Videografi', name: 'Directing & Cinematography', sort_order: 3 },
  { id: 's4', group_name: 'Videografi', name: 'Post-Production & Color Grading', sort_order: 4 },
  { id: 's5', group_name: 'Desain Grafis', name: 'Brand Identity & Guidelines', sort_order: 5 },
  { id: 's6', group_name: 'Desain Grafis', name: 'Marketing & Social Media Collateral', sort_order: 6 },
  { id: 's7', group_name: 'Copywriting', name: 'Direct-Response Ad Copy', sort_order: 7 },
  { id: 's8', group_name: 'Copywriting', name: 'Brand Narrative & Concept Storytelling', sort_order: 8 }
];

const DEFAULT_EXPERIENCES = [
  {
    id: 'exp-s1',
    period: '2022 — Sekarang',
    location: 'Jakarta & Remote Global',
    role: 'Principal Creative Director',
    org: 'Studio Artefak',
    description: 'Memimpin arahan visual, arsitektur jenama, dan desain produk digital untuk 20+ jenama global across APAC and North America.',
    tag: 'Kepemimpinan Studio',
    colorTone: 'primary'
  },
  {
    id: 'exp-s2',
    period: '2019 — 2022',
    location: 'Singapura',
    role: 'Senior Lead Experience Designer',
    org: 'Global Kinetic Agency',
    description: 'Arsitektur pengalaman pengguna fintech dan perbankan digital Asia Tenggara dengan total transaksi jutaan pengguna aktif.',
    tag: 'Digital Banking & UX',
    colorTone: 'secondary'
  },
  {
    id: 'exp-s3',
    period: '2016 — 2019',
    location: 'Jakarta',
    role: 'Visual Designer & Photographer',
    org: 'Monolith Creative Lab',
    description: 'Arahan visual komersial, editorial fotografi kelas dunia, dan perancangan instalasi interaktif brand ritel prestisius.',
    tag: 'Komersial & Fotografi',
    colorTone: 'tertiary'
  },
  {
    id: 'exp-s4',
    period: '2014 — 2016',
    location: 'Jakarta',
    role: 'Junior Art Director & Copywriter',
    org: 'Neo Jakarta Advertising',
    description: 'Penulisan naskah iklan, kampanye terintegrasi 360 derajat, dan elaborasi konsep visual komersial untuk FMCG terkemuka.',
    tag: 'Advertising & Copy',
    colorTone: 'tertiary'
  }
];

/**
 * Custom Hook untuk memuat seluruh konten teks publik secara paralel dari Supabase
 */
export function useSiteContent() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [experiences, setExperiences] = useState(DEFAULT_EXPERIENCES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [settingsRes, skillsRes, experiencesRes] = await Promise.allSettled([
        getSiteSettings(),
        getSkills(),
        getExperiences()
      ]);

      // Set Settings jika sukses dan ada data
      if (settingsRes.status === 'fulfilled' && settingsRes.value) {
        setSettings((prev) => ({ ...prev, ...settingsRes.value }));
      }

      // Set Skills jika sukses dan ada data
      if (skillsRes.status === 'fulfilled' && Array.isArray(skillsRes.value) && skillsRes.value.length > 0) {
        setSkills(skillsRes.value);
      }

      // Set Experiences jika sukses dan ada data
      if (experiencesRes.status === 'fulfilled' && Array.isArray(experiencesRes.value) && experiencesRes.value.length > 0) {
        setExperiences(experiencesRes.value);
      }

      // Periksa apakah ada error fatal
      const errors = [settingsRes, skillsRes, experiencesRes]
        .filter((r) => r.status === 'rejected')
        .map((r) => r.reason);

      if (errors.length > 0) {
        console.warn('Peringatan: Sebagian query Supabase gagal, menggunakan fallback:', errors);
        setError(errors[0]);
      }
    } catch (err) {
      console.error('Error fetching site content:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // Kelompokkan skills berdasarkan group_name
  const groupedSkills = skills.reduce((acc, item) => {
    const group = item.group_name || 'Umum';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {});

  return {
    settings,
    skills,
    groupedSkills,
    experiences,
    loading,
    error,
    refetch: fetchContent
  };
}
