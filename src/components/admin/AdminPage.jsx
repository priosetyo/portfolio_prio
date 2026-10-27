import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LoginForm } from './LoginForm';
import { ProjectForm } from './ProjectForm';
import { Tag } from '../ui/Tag';
import {
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
  toggleProjectPublish,
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  getSiteSettings,
  updateSiteSettings,
  getLocalMessages,
  saveLocalMessages,
  getStoragePublicUrl,
  uploadMediaFile
} from '../../lib/queries';
import { resizeImageToWebP } from '../../lib/image';
import {
  FolderKanban,
  Mail,
  User,
  Wrench,
  Clock,
  Share2,
  Plus,
  LogOut,
  ExternalLink,
  CheckCircle2,
  Edit2,
  Trash2,
  Send,
  Building,
  Layers,
  X,
  Save,
  Check,
  AlertCircle,
  Camera,
  Upload,
  Loader2
} from 'lucide-react';

const CATEGORY_LABELS = {
  photo: 'Fotografi',
  video: 'Videografi',
  design: 'Desain Grafis',
  copy: 'Copywriting'
};

const DEFAULT_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDpOtpycEVr4MOXdR1AKcNCANcNvTVsDSJmHh4--o3QuTGlcu9KdCFNYac1HwyfyG6to15QrJ8R22G5cy1OyMRhZSiAA_Yx3IWJXQzq-LmOXl3Uvn2Cx4WEeIRb0jQK7TSboW9ycvAq0mEZnygI6EmxU9BaBz6WcqlXEeg7KRTG3s00S5sf_pZJTtrnFJxvQ4DFCJE22wFdmrlNchqwQ3YZcDPqP9_A5mNytlvjpY';

const DEFAULT_PROFILE = {
  name: 'Prio Setyo',
  headline: 'Visual Creator, Designer & Copywriter',
  summary: 'Membangun ekosistem visual spektakuler, identitas brand sinematik, dan antarmuka spasial masa depan.',
  bio: 'Creative Director berbasis di Jakarta & Tokyo dengan pengalaman 10+ tahun dalam real-time 3D, sinematografi, dan arsitektur jenama transformatif.',
  avatar_url: DEFAULT_AVATAR,
  email: 'prio@setyostudio.com',
  phone: '+62 812-3456-7890',
  location: 'Indonesia',
  instagram: 'https://instagram.com/priosetyo',
  linkedin: 'https://linkedin.com/in/priosetyo',
  github: 'https://github.com/priosetyo',
  youtube: 'https://youtube.com/@priosetyo',
  vimeo: 'https://vimeo.com/priosetyo',
  behance: 'https://behance.net/priosetyo'
};

export function AdminPage({ onBackToSite }) {
  const { session, user, loading: authLoading, signIn, signOut } = useAuth();
  const isAuthenticated = Boolean(session);

  // Tab State: 'projects' | 'messages' | 'profile' | 'skills' | 'experience' | 'social'
  const [activeTab, setActiveTab] = useState('projects');

  // Data states
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Project Editor state
  const [editingProject, setEditingProject] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Skill Editor modal/state
  const [editingSkill, setEditingSkill] = useState(null);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [skillFormName, setSkillFormName] = useState('');
  const [skillFormGroup, setSkillFormGroup] = useState('Fotografi');

  // Experience Editor modal/state
  const [editingExp, setEditingExp] = useState(null);
  const [showExpModal, setShowExpModal] = useState(false);
  const [expRole, setExpRole] = useState('');
  const [expOrg, setExpOrg] = useState('');
  const [expStart, setExpStart] = useState('');
  const [expEnd, setExpEnd] = useState('');
  const [expLocation, setExpLocation] = useState('');
  const [expBullets, setExpBullets] = useState('');

  // Avatar Uploader State
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleAvatarFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    setAvatarError('');

    try {
      const compressed = await resizeImageToWebP(file, 600, 0.9);
      const timestamp = Date.now();
      const storagePath = `avatars/avatar-${timestamp}.webp`;

      const res = await uploadMediaFile(storagePath, compressed.blob);
      const avatarUrl = res?.publicUrl || storagePath;

      setProfile((prev) => ({ ...prev, avatar_url: avatarUrl }));
      showToast('Foto profil berhasil diunggah! Klik "Simpan Perubahan Profil" untuk menerapkan.');
    } catch (err) {
      console.error('Error uploading avatar:', err);
      let msg = err.message || 'Gagal mengunggah foto profil.';
      if (msg.includes('row-level security') || msg.includes('policy') || msg.includes('403')) {
        msg = 'Upload ditolak oleh RLS Supabase Storage. Pastikan policy INSERT untuk bucket "portfolio-media" sudah aktif.';
      }
      setAvatarError(msg);
      showToast('Gagal mengunggah foto profil.');
    } finally {
      setUploadingAvatar(false);
      e.target.value = '';
    }
  };

  // Load All Admin Data
  const loadAdminData = useCallback(async () => {
    setLoadingData(true);
    try {
      const [projRes, expRes, skillRes, settingsRes] = await Promise.allSettled([
        getAllProjectsAdmin(),
        getExperiences(),
        getSkills(),
        getSiteSettings()
      ]);

      if (projRes.status === 'fulfilled' && Array.isArray(projRes.value)) {
        setProjects(projRes.value);
      }
      if (expRes.status === 'fulfilled' && Array.isArray(expRes.value)) {
        setExperiences(expRes.value);
      }
      if (skillRes.status === 'fulfilled' && Array.isArray(skillRes.value)) {
        setSkills(skillRes.value);
      }
      if (settingsRes.status === 'fulfilled' && settingsRes.value) {
        setProfile((prev) => ({ ...prev, ...settingsRes.value }));
      }

      setMessages(getLocalMessages());
    } catch (err) {
      console.warn('Gagal memuat data admin:', err);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
    }
  }, [isAuthenticated, loadAdminData]);

  if (authLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          backgroundColor: '#f9f9fb',
          fontFamily: 'var(--font-sans)'
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            border: '3px solid #e8e8ed',
            borderTopColor: '#000000',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }}
        />
        <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>
          Memeriksa sesi administrator...
        </span>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginForm
        onLogin={signIn}
        onBackToSite={onBackToSite}
      />
    );
  }

  // --- PROJECT ACTIONS ---
  const handleSaveProject = async (payload, existingId) => {
    try {
      if (existingId) {
        await updateProject(existingId, payload);
        setProjects((prev) => prev.map((p) => (p.id === existingId ? { ...p, ...payload } : p)));
        showToast(`Karya "${payload.title}" berhasil diperbarui.`);
      } else {
        const created = await createProject(payload);
        const newProj = created || { ...payload, id: `proj-${Date.now()}` };
        setProjects((prev) => [newProj, ...prev]);
        showToast(`Karya "${payload.title}" berhasil ditambahkan.`);
      }
    } catch (err) {
      console.warn('Fallback save project:', err);
      if (existingId) {
        setProjects((prev) => prev.map((p) => (p.id === existingId ? { ...p, ...payload } : p)));
      } else {
        setProjects((prev) => [{ ...payload, id: `proj-${Date.now()}` }, ...prev]);
      }
      showToast(`Karya "${payload.title}" tersimpan dalam sesi lokal.`);
    }

    setEditingProject(null);
    setIsCreatingNew(false);
  };

  const handleDeleteProject = async (id, title) => {
    if (!window.confirm(`Yakin ingin menghapus karya "${title}"?`)) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast('Karya berhasil dihapus.');
    } catch (err) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast('Karya dihapus dari daftar lokal.');
    }
  };

  const handleTogglePublish = async (id, nextState) => {
    try {
      await toggleProjectPublish(id, nextState);
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, is_published: nextState } : p)));
      showToast(nextState ? 'Status diubah ke Aktif (Live).' : 'Status diubah ke Draf (Privat).');
    } catch (err) {
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, is_published: nextState } : p)));
      showToast(nextState ? 'Status diubah ke Aktif (Live).' : 'Status diubah ke Draf (Privat).');
    }
  };

  // --- MESSAGE ACTIONS ---
  const handleDeleteMessage = (id) => {
    if (!window.confirm('Hapus pesan ini?')) return;
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    saveLocalMessages(updated);
    showToast('Pesan berhasil dihapus.');
  };

  const handleToggleReadMessage = (id) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, is_read: !m.is_read } : m));
    setMessages(updated);
    saveLocalMessages(updated);
  };

  // --- PROFILE ACTIONS ---
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await updateSiteSettings(profile);
      showToast('Profil & biodata berhasil diperbarui.');
    } catch (err) {
      showToast('Profil diperbarui secara lokal.');
    }
  };

  // --- SKILL ACTIONS ---
  const handleOpenAddSkill = () => {
    setEditingSkill(null);
    setSkillFormName('');
    setSkillFormGroup('Fotografi');
    setShowSkillModal(true);
  };

  const handleOpenEditSkill = (item) => {
    setEditingSkill(item);
    setSkillFormName(item.name || '');
    setSkillFormGroup(item.group_name || 'Fotografi');
    setShowSkillModal(true);
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    if (!skillFormName.trim()) return;

    const payload = {
      name: skillFormName.trim(),
      group_name: skillFormGroup,
      sort_order: skills.length + 1
    };

    try {
      if (editingSkill?.id) {
        await updateSkill(editingSkill.id, payload);
        setSkills((prev) => prev.map((s) => (s.id === editingSkill.id ? { ...s, ...payload } : s)));
        showToast('Keahlian berhasil diperbarui.');
      } else {
        const created = await createSkill(payload);
        setSkills((prev) => [...prev, created || { ...payload, id: `s-${Date.now()}` }]);
        showToast('Keahlian berhasil ditambahkan.');
      }
    } catch (err) {
      if (editingSkill?.id) {
        setSkills((prev) => prev.map((s) => (s.id === editingSkill.id ? { ...s, ...payload } : s)));
      } else {
        setSkills((prev) => [...prev, { ...payload, id: `s-${Date.now()}` }]);
      }
      showToast('Keahlian tersimpan.');
    }

    setShowSkillModal(false);
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Hapus keahlian ini?')) return;
    try {
      await deleteSkill(id);
      setSkills((prev) => prev.filter((s) => s.id !== id));
      showToast('Keahlian dihapus.');
    } catch (err) {
      setSkills((prev) => prev.filter((s) => s.id !== id));
      showToast('Keahlian dihapus.');
    }
  };

  // --- EXPERIENCE ACTIONS ---
  const handleOpenAddExp = () => {
    setEditingExp(null);
    setExpRole('');
    setExpOrg('');
    setExpStart('');
    setExpEnd('');
    setExpLocation('');
    setExpBullets('');
    setShowExpModal(true);
  };

  const handleOpenEditExp = (item) => {
    setEditingExp(item);
    setExpRole(item.role || '');
    setExpOrg(item.org || '');
    setExpStart(item.start_date || '');
    setExpEnd(item.end_date || '');
    setExpLocation(item.location || '');
    setExpBullets(Array.isArray(item.bullets) ? item.bullets.join('\n') : '');
    setShowExpModal(true);
  };

  const handleSaveExp = async (e) => {
    e.preventDefault();
    const bulletsArray = expBullets.split('\n').map((b) => b.trim()).filter(Boolean);
    const payload = {
      type: 'work',
      role: expRole,
      org: expOrg,
      location: expLocation,
      start_date: expStart,
      end_date: expEnd,
      bullets: bulletsArray,
      sort_order: experiences.length + 1
    };

    try {
      if (editingExp?.id) {
        await updateExperience(editingExp.id, payload);
        setExperiences((prev) => prev.map((x) => (x.id === editingExp.id ? { ...x, ...payload } : x)));
        showToast('Pengalaman berhasil diperbarui.');
      } else {
        const created = await createExperience(payload);
        setExperiences((prev) => [...prev, created || { ...payload, id: `exp-${Date.now()}` }]);
        showToast('Pengalaman berhasil ditambahkan.');
      }
    } catch (err) {
      if (editingExp?.id) {
        setExperiences((prev) => prev.map((x) => (x.id === editingExp.id ? { ...x, ...payload } : x)));
      } else {
        setExperiences((prev) => [...prev, { ...payload, id: `exp-${Date.now()}` }]);
      }
      showToast('Pengalaman tersimpan.');
    }

    setShowExpModal(false);
  };

  const handleDeleteExp = async (id) => {
    if (!window.confirm('Hapus riwayat pengalaman ini?')) return;
    try {
      await deleteExperience(id);
      setExperiences((prev) => prev.filter((x) => x.id !== id));
      showToast('Pengalaman dihapus.');
    } catch (err) {
      setExperiences((prev) => prev.filter((x) => x.id !== id));
      showToast('Pengalaman dihapus.');
    }
  };

  const unreadMessagesCount = messages.filter((m) => !m.is_read).length;
  const adminEmail = user?.email || profile?.email || 'priosetyo@gmail.com';

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f9f9fb',
        color: '#000000',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-body)'
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.85rem 1.25rem',
            borderRadius: '1rem',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            color: '#000000',
            boxShadow: 'var(--shadow-lg)',
            fontSize: '12px',
            fontWeight: '600'
          }}
        >
          <CheckCircle2 size={16} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER BAR (Matching user screenshot: Avatar + Admin Portal + Email + Actions) */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          padding: '0.85rem 0'
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
        >
          {/* Left: Avatar Monogram + Admin Portal Title + Email */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#000000',
                color: '#ffffff',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: '800',
                fontSize: '13px',
                letterSpacing: '0.04em',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                flexShrink: 0
              }}
            >
              {profile?.avatar_url ? (
                <img
                  src={getStoragePublicUrl(profile.avatar_url)}
                  alt="Admin"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                'PS'
              )}
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: '800',
                  fontSize: '15px',
                  color: '#000000',
                  lineHeight: 1.2
                }}
              >
                Admin Portal
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '1px' }}>
                {adminEmail}
              </div>
            </div>
          </div>

          {/* Right: Lihat Website & Keluar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={onBackToSite}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#000000',
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 150ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f3f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              <ExternalLink size={13} />
              <span>Lihat Website</span>
            </button>

            <button
              type="button"
              onClick={() => signOut()}
              title="Keluar dari Panel Admin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '0.45rem 0.95rem',
                borderRadius: '9999px',
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                border: '1px solid rgba(220, 38, 38, 0.15)',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 150ms ease'
              }}
            >
              <LogOut size={13} />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main style={{ flex: 1, maxWidth: '1360px', width: '100%', margin: '0 auto', padding: '1.5rem 1.5rem 4rem 1.5rem' }}>
        {/* If user is editing or creating a project, show the ProjectForm */}
        {isCreatingNew || editingProject ? (
          <ProjectForm
            project={editingProject}
            onSave={handleSaveProject}
            onCancel={() => {
              setEditingProject(null);
              setIsCreatingNew(false);
            }}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* 6 NAVIGATION PILL TABS (Exactly matching the screenshot) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                overflowX: 'auto',
                paddingBottom: '4px'
              }}
            >
              {[
                { id: 'projects', label: 'Proyek & Karya', icon: FolderKanban, count: projects.length },
                { id: 'messages', label: 'Pesan Masuk', icon: Mail, badge: unreadMessagesCount },
                { id: 'profile', label: 'Profil & Bio', icon: User },
                { id: 'skills', label: 'Keahlian / Tools', icon: Wrench, count: skills.length },
                { id: 'experience', label: 'Riwayat & Karier', icon: Clock, count: experiences.length },
                { id: 'social', label: 'Link Sosial', icon: Share2 }
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 1.15rem',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: isSelected ? '700' : '600',
                      cursor: 'pointer',
                      border: isSelected ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.08)',
                      backgroundColor: isSelected ? '#000000' : '#ffffff',
                      color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                      boxShadow: isSelected ? '0 4px 12px rgba(0, 0, 0, 0.12)' : '0 1px 4px rgba(0, 0, 0, 0.02)',
                      transition: 'all 150ms ease'
                    }}
                  >
                    <Icon size={14} color={isSelected ? '#ffffff' : 'var(--text-secondary)'} />
                    <span>{tab.label}</span>

                    {/* Unread Message Badge */}
                    {tab.badge > 0 && (
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: '800',
                          padding: '1px 6px',
                          borderRadius: '9999px',
                          backgroundColor: '#dc2626',
                          color: '#ffffff'
                        }}
                      >
                        {tab.badge}
                      </span>
                    )}

                    {/* Count badge for projects/skills/exp */}
                    {tab.count !== undefined && (
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: '700',
                          padding: '1px 6px',
                          borderRadius: '9999px',
                          backgroundColor: isSelected ? '#ffffff' : '#f3f3f5',
                          color: isSelected ? '#000000' : 'var(--text-tertiary)'
                        }}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT CARD CONTAINER */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '1.5rem',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.02)',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
            >
              {/* TAB 1: PROYEK & KARYA */}
              {activeTab === 'projects' && (
                <div>
                  {/* Card Header inside container */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      marginBottom: '1.5rem',
                      paddingBottom: '1.25rem',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.25rem',
                          fontWeight: '800',
                          color: '#000000',
                          margin: 0
                        }}
                      >
                        Manajemen Karya & Proyek
                      </h2>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                        Tambah, edit, hapus, dan atur tampilan portofolio karya Anda.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsCreatingNew(true)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '0.6rem 1.25rem',
                        borderRadius: '9999px',
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: '700',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        transition: 'transform 150ms ease, background-color 150ms ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#222222';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#000000';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Plus size={15} />
                      <span>+ Tambah Karya Baru</span>
                    </button>
                  </div>

                  {/* 3-Column Project Card Grid (Anatomy matching user's screenshot) */}
                  {projects.length === 0 ? (
                    <div
                      style={{
                        padding: '3rem 2rem',
                        textAlign: 'center',
                        backgroundColor: '#f9f9fb',
                        borderRadius: '1rem',
                        border: '1px dashed rgba(0, 0, 0, 0.12)'
                      }}
                    >
                      <FolderKanban size={36} color="var(--text-tertiary)" style={{ opacity: 0.5 }} />
                      <div style={{ fontWeight: '700', marginTop: '0.5rem' }}>Belum ada karya yang diunggah</div>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                        Klik tombol "+ Tambah Karya Baru" di atas untuk menambahkan portofolio pertama Anda.
                      </p>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '1.25rem'
                      }}
                    >
                      {projects.map((proj) => {
                        const firstMedia = proj.project_media?.[0];
                        const rawThumb = firstMedia?.thumb_path || firstMedia?.poster_path || firstMedia?.storage_path;
                        const thumb = getStoragePublicUrl(rawThumb);

                        return (
                          <div
                            key={proj.id}
                            style={{
                              borderRadius: '1.25rem',
                              backgroundColor: '#ffffff',
                              border: '1px solid rgba(0, 0, 0, 0.08)',
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                              overflow: 'hidden',
                              display: 'flex',
                              flexDirection: 'column',
                              transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-3px)';
                              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.06)';
                              e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.02)';
                              e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                            }}
                          >
                            {/* Visual Image / Thumbnail */}
                            <div
                              style={{
                                position: 'relative',
                                aspectRatio: '16/10',
                                backgroundColor: '#f3f3f5',
                                overflow: 'hidden'
                              }}
                            >
                              {thumb ? (
                                <img
                                  src={thumb}
                                  alt={proj.title}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                              ) : (
                                <div
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-tertiary)'
                                  }}
                                >
                                  <Layers size={28} />
                                  <span style={{ fontSize: '11px', marginTop: '4px' }}>Tanpa Thumbnail</span>
                                </div>
                              )}

                              {/* Category Badge on top-left of image */}
                              <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                                <Tag tone={proj.category}>
                                  {CATEGORY_LABELS[proj.category] || proj.category}
                                </Tag>
                              </div>
                            </div>

                            {/* Card Content */}
                            <div style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
                              {/* Row: Peran (Left) & Year (Right) */}
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  fontSize: '11px',
                                  color: 'var(--text-tertiary)'
                                }}
                              >
                                <span style={{ fontWeight: '600' }}>
                                  Peran: {proj.role || proj.client || 'Creative Director'}
                                </span>
                                <span>{proj.year || '2026'}</span>
                              </div>

                              {/* Title */}
                              <h3
                                style={{
                                  fontFamily: 'var(--font-display)',
                                  fontSize: '1rem',
                                  fontWeight: '800',
                                  color: '#000000',
                                  margin: '2px 0 0 0',
                                  lineHeight: 1.3
                                }}
                              >
                                {proj.title}
                              </h3>

                              {/* Description / Summary */}
                              {proj.summary && (
                                <p
                                  style={{
                                    fontSize: '12px',
                                    color: 'var(--text-secondary)',
                                    margin: '2px 0 0 0',
                                    lineHeight: 1.45,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                  }}
                                >
                                  {proj.summary}
                                </p>
                              )}

                              {/* Spacer */}
                              <div style={{ flex: 1 }} />

                              {/* Card Footer: Status indicator on left, Edit & Delete on right */}
                              <div
                                style={{
                                  marginTop: '0.75rem',
                                  paddingTop: '0.75rem',
                                  borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between'
                                }}
                              >
                                {/* Status Indicator (Toggleable) */}
                                <button
                                  type="button"
                                  onClick={() => handleTogglePublish(proj.id, !proj.is_published)}
                                  title={proj.is_published ? 'Klik untuk nonaktifkan ke Draf' : 'Klik untuk aktifkan ke Live'}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '0.3rem 0.65rem',
                                    borderRadius: '9999px',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    border: 'none',
                                    backgroundColor: proj.is_published ? 'var(--color-tertiary-fixed)' : '#f3f3f5',
                                    color: proj.is_published ? 'var(--color-on-tertiary-fixed)' : 'var(--text-tertiary)',
                                    cursor: 'pointer'
                                  }}
                                >
                                  <span
                                    style={{
                                      width: '7px',
                                      height: '7px',
                                      borderRadius: '50%',
                                      backgroundColor: proj.is_published ? '#059669' : '#9ca3af'
                                    }}
                                  />
                                  <span>{proj.is_published ? 'Aktif' : 'Draf'}</span>
                                </button>

                                {/* Action Buttons: Edit & Delete */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                  <button
                                    type="button"
                                    onClick={() => setEditingProject(proj)}
                                    title="Edit Karya"
                                    style={{
                                      padding: '0.45rem',
                                      borderRadius: '0.5rem',
                                      backgroundColor: '#f3f3f5',
                                      border: 'none',
                                      color: '#000000',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      transition: 'background-color 150ms ease'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor = 'var(--color-secondary-fixed)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor = '#f3f3f5';
                                    }}
                                  >
                                    <Edit2 size={13} />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleDeleteProject(proj.id, proj.title)}
                                    title="Hapus Karya"
                                    style={{
                                      padding: '0.45rem',
                                      borderRadius: '0.5rem',
                                      backgroundColor: 'transparent',
                                      border: 'none',
                                      color: '#dc2626',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      transition: 'background-color 150ms ease'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor = '#fee2e2';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: PESAN MASUK */}
              {activeTab === 'messages' && (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.5rem',
                      paddingBottom: '1.25rem',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '800', color: '#000000', margin: 0 }}>
                        Pesan Masuk & Inquiry Klien
                      </h2>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                        Daftar pesan dan formulir konsultasi dari calon klien yang masuk melalui website.
                      </p>
                    </div>

                    <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-tertiary)' }}>
                      Total {messages.length} Pesan ({unreadMessagesCount} Belum Dibaca)
                    </div>
                  </div>

                  {messages.length === 0 ? (
                    <div style={{ padding: '3rem 2rem', textAlign: 'center', backgroundColor: '#f9f9fb', borderRadius: '1rem' }}>
                      <Mail size={36} color="var(--text-tertiary)" style={{ opacity: 0.5 }} />
                      <div style={{ fontWeight: '700', marginTop: '0.5rem' }}>Kotak masuk masih kosong</div>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                        Pesan dari pengunjung yang menekan tombol diskusi akan tampil di sini.
                      </p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          style={{
                            padding: '1.25rem',
                            borderRadius: '1rem',
                            backgroundColor: msg.is_read ? '#ffffff' : 'var(--color-secondary-fixed)',
                            border: `1px solid ${msg.is_read ? 'rgba(0, 0, 0, 0.06)' : 'rgba(0, 0, 0, 0.12)'}`,
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.65rem'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                              {!msg.is_read && (
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#000000' }} />
                              )}
                              <span style={{ fontWeight: '800', fontSize: '14px', color: '#000000' }}>{msg.name}</span>
                              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>({msg.email})</span>
                              {msg.company && (
                                <Tag tone="default">{msg.company}</Tag>
                              )}
                            </div>

                            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                              {new Date(msg.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                            </span>
                          </div>

                          <div style={{ fontWeight: '700', fontSize: '13px', color: '#000000' }}>
                            {msg.subject}
                          </div>

                          <p style={{ fontSize: '13px', color: '#333333', lineHeight: 1.6, margin: 0 }}>
                            {msg.message}
                          </p>

                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.25rem' }}>
                            <a
                              href={`mailto:${msg.email}?subject=Re:%20${encodeURIComponent(msg.subject)}`}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '0.4rem 0.85rem',
                                borderRadius: '0.5rem',
                                backgroundColor: '#000000',
                                color: '#ffffff',
                                fontSize: '11px',
                                fontWeight: '700',
                                textDecoration: 'none'
                              }}
                            >
                              <Send size={12} />
                              <span>Balas via Email</span>
                            </a>

                            <button
                              type="button"
                              onClick={() => handleToggleReadMessage(msg.id)}
                              style={{
                                padding: '0.4rem 0.75rem',
                                borderRadius: '0.5rem',
                                backgroundColor: '#ffffff',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                color: 'var(--text-secondary)',
                                fontSize: '11px',
                                fontWeight: '600',
                                cursor: 'pointer'
                              }}
                            >
                              {msg.is_read ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteMessage(msg.id)}
                              style={{
                                padding: '0.4rem',
                                borderRadius: '0.5rem',
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: '#dc2626',
                                cursor: 'pointer'
                              }}
                              title="Hapus Pesan"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: PROFIL & BIO */}
              {activeTab === 'profile' && (
                <div>
                  <div
                    style={{
                      marginBottom: '1.5rem',
                      paddingBottom: '1.25rem',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '800', color: '#000000', margin: 0 }}>
                      Profil & Biodata Studio
                    </h2>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                      Kelola informasi identitas, peran, biografi, kontak, dan lokasi studio Anda.
                    </p>
                  </div>

                  <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Foto Profil / Avatar Uploader */}
                    <div
                      style={{
                        padding: '1.25rem',
                        borderRadius: '1rem',
                        backgroundColor: '#ffffff',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1.25rem',
                        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.02)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        {/* Circular Avatar Preview */}
                        <div
                          style={{
                            position: 'relative',
                            width: '84px',
                            height: '84px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            backgroundColor: '#000000',
                            border: '3px solid #ffffff',
                            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
                            flexShrink: 0
                          }}
                        >
                          {profile.avatar_url ? (
                            <img
                              src={getStoragePublicUrl(profile.avatar_url)}
                              alt="Foto Profil"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <div
                              style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ffffff',
                                fontFamily: 'var(--font-display)',
                                fontWeight: '800',
                                fontSize: '24px'
                              }}
                            >
                              PS
                            </div>
                          )}

                          {uploadingAvatar && (
                            <div
                              style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Loader2 size={24} color="#ffffff" style={{ animation: 'spin 1s linear infinite' }} />
                            </div>
                          )}
                        </div>

                        <div>
                          <div style={{ fontWeight: '800', fontSize: '15px', color: '#000000' }}>
                            Foto Profil Portofolio
                          </div>
                          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '3px 0 0 0' }}>
                            Foto profil utama yang akan muncul di hero section portofolio Anda.
                          </p>
                          {avatarError && (
                            <span style={{ fontSize: '11px', color: '#dc2626', fontWeight: '600', marginTop: '4px', display: 'block' }}>
                              {avatarError}
                            </span>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <label
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '0.6rem 1.25rem',
                            borderRadius: '0.65rem',
                            backgroundColor: '#000000',
                            color: '#ffffff',
                            fontSize: '12px',
                            fontWeight: '700',
                            cursor: uploadingAvatar ? 'not-allowed' : 'pointer',
                            opacity: uploadingAvatar ? 0.7 : 1,
                            transition: 'all 150ms ease',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)'
                          }}
                        >
                          <Camera size={14} />
                          <span>{uploadingAvatar ? 'Mengunggah...' : 'Ganti Foto Profil'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            disabled={uploadingAvatar}
                            onChange={handleAvatarFileSelect}
                            style={{ display: 'none' }}
                          />
                        </label>

                        {profile.avatar_url && profile.avatar_url !== DEFAULT_AVATAR && (
                          <button
                            type="button"
                            onClick={() => setProfile((prev) => ({ ...prev, avatar_url: DEFAULT_AVATAR }))}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '0.6rem 0.95rem',
                              borderRadius: '0.65rem',
                              backgroundColor: '#fee2e2',
                              color: '#dc2626',
                              fontSize: '12px',
                              fontWeight: '600',
                              border: '1px solid rgba(220, 38, 38, 0.15)',
                              cursor: 'pointer'
                            }}
                          >
                            <Trash2 size={13} />
                            <span>Reset Default</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          required
                          value={profile.name || ''}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.65rem 0.85rem',
                            borderRadius: '0.65rem',
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            backgroundColor: '#f3f3f5',
                            fontSize: '13px',
                            color: '#000000',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                          Peran Utama / Tagline
                        </label>
                        <input
                          type="text"
                          value={profile.headline || ''}
                          onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.65rem 0.85rem',
                            borderRadius: '0.65rem',
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            backgroundColor: '#f3f3f5',
                            fontSize: '13px',
                            color: '#000000',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                          Email Kontak
                        </label>
                        <input
                          type="email"
                          value={profile.email || ''}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.65rem 0.85rem',
                            borderRadius: '0.65rem',
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            backgroundColor: '#f3f3f5',
                            fontSize: '13px',
                            color: '#000000',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                          Nomor Telepon / WhatsApp
                        </label>
                        <input
                          type="text"
                          value={profile.phone || ''}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.65rem 0.85rem',
                            borderRadius: '0.65rem',
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            backgroundColor: '#f3f3f5',
                            fontSize: '13px',
                            color: '#000000',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                          Lokasi Studio
                        </label>
                        <input
                          type="text"
                          value={profile.location || ''}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.65rem 0.85rem',
                            borderRadius: '0.65rem',
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            backgroundColor: '#f3f3f5',
                            fontSize: '13px',
                            color: '#000000',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                        Sinopsis Singkat (Hero Statement)
                      </label>
                      <textarea
                        rows={2}
                        value={profile.summary || ''}
                        onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '0.65rem',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          backgroundColor: '#f3f3f5',
                          fontSize: '13px',
                          color: '#000000',
                          outline: 'none',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                        Biografi Lengkap / Filosofi
                      </label>
                      <textarea
                        rows={4}
                        value={profile.bio || ''}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '0.65rem',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          backgroundColor: '#f3f3f5',
                          fontSize: '13px',
                          color: '#000000',
                          outline: 'none',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                      <button
                        type="submit"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '0.65rem 1.5rem',
                          borderRadius: '0.65rem',
                          backgroundColor: '#000000',
                          color: '#ffffff',
                          fontSize: '12px',
                          fontWeight: '700',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
                        }}
                      >
                        <Save size={14} />
                        <span>Simpan Perubahan Profil</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 4: KEAHLIAN / TOOLS */}
              {activeTab === 'skills' && (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      marginBottom: '1.5rem',
                      paddingBottom: '1.25rem',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '800', color: '#000000', margin: 0 }}>
                        Manajemen Keahlian & Tools
                      </h2>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                        Kelola daftar keahlian, teknologi, dan perangkat lunak kreatif yang Anda tampilkan.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleOpenAddSkill}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '0.55rem 1.15rem',
                        borderRadius: '9999px',
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: '700',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={14} />
                      <span>+ Tambah Keahlian</span>
                    </button>
                  </div>

                  {skills.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f9f9fb', borderRadius: '1rem' }}>
                      <Wrench size={32} color="var(--text-tertiary)" style={{ opacity: 0.5 }} />
                      <div style={{ fontWeight: '700', marginTop: '0.5rem' }}>Belum ada keahlian terdaftar</div>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
                      {skills.map((s) => (
                        <div
                          key={s.id}
                          style={{
                            padding: '0.85rem 1rem',
                            borderRadius: '0.75rem',
                            backgroundColor: '#f9f9fb',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <span
                              style={{
                                fontSize: '10px',
                                fontWeight: '700',
                                padding: '2px 8px',
                                borderRadius: '9999px',
                                backgroundColor: 'var(--color-secondary-fixed)',
                                color: '#1b1735'
                              }}
                            >
                              {s.group_name}
                            </span>
                            <span style={{ fontWeight: '700', fontSize: '13px', color: '#000000' }}>{s.name}</span>
                          </div>

                          <div style={{ display: 'flex', gap: '0.25rem' }}>
                            <button
                              type="button"
                              onClick={() => handleOpenEditSkill(s)}
                              style={{ padding: '4px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteSkill(s.id)}
                              style={{ padding: '4px', background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: RIWAYAT & KARIER */}
              {activeTab === 'experience' && (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      marginBottom: '1.5rem',
                      paddingBottom: '1.25rem',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '800', color: '#000000', margin: 0 }}>
                        Riwayat Karier & Pengalaman
                      </h2>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                        Atur linimasa perjalanan karir, posisi, dan pencapaian profesional Anda.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleOpenAddExp}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '0.55rem 1.15rem',
                        borderRadius: '9999px',
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: '700',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={14} />
                      <span>+ Tambah Riwayat</span>
                    </button>
                  </div>

                  {experiences.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f9f9fb', borderRadius: '1rem' }}>
                      <Clock size={32} color="var(--text-tertiary)" style={{ opacity: 0.5 }} />
                      <div style={{ fontWeight: '700', marginTop: '0.5rem' }}>Belum ada riwayat pengalaman</div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {experiences.map((exp) => (
                        <div
                          key={exp.id}
                          style={{
                            padding: '1.15rem 1.25rem',
                            borderRadius: '1rem',
                            backgroundColor: '#f9f9fb',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            gap: '1rem'
                          }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <div style={{ fontWeight: '800', fontSize: '14px', color: '#000000' }}>
                              {exp.role}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#000000' }}>
                              <Building size={13} color="var(--text-tertiary)" />
                              <span style={{ fontWeight: '600' }}>{exp.org}</span>
                              <span style={{ color: 'var(--text-tertiary)' }}>•</span>
                              <span style={{ color: 'var(--text-secondary)' }}>
                                {exp.start_date || exp.period} {exp.end_date ? `— ${exp.end_date}` : ''}
                              </span>
                            </div>

                            {exp.location && (
                              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                                📍 {exp.location}
                              </div>
                            )}

                            {Array.isArray(exp.bullets) && exp.bullets.length > 0 && (
                              <ul style={{ margin: '0.25rem 0 0 0', paddingLeft: '1.25rem', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                {exp.bullets.map((b, idx) => (
                                  <li key={idx}>{b}</li>
                                ))}
                              </ul>
                            )}
                          </div>

                          <div style={{ display: 'flex', gap: '0.25rem' }}>
                            <button
                              type="button"
                              onClick={() => handleOpenEditExp(exp)}
                              style={{ padding: '4px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteExp(exp.id)}
                              style={{ padding: '4px', background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: LINK SOSIAL */}
              {activeTab === 'social' && (
                <div>
                  <div
                    style={{
                      marginBottom: '1.5rem',
                      paddingBottom: '1.25rem',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '800', color: '#000000', margin: 0 }}>
                      Tautan Media Sosial & Jejaring
                    </h2>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                      Atur tautan platform eksternal seperti Instagram, LinkedIn, GitHub, YouTube, dan Vimeo.
                    </p>
                  </div>

                  <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                      {[
                        { key: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/username' },
                        { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/username' },
                        { key: 'github', label: 'GitHub URL', placeholder: 'https://github.com/username' },
                        { key: 'youtube', label: 'YouTube / Showreel URL', placeholder: 'https://youtube.com/@channel' },
                        { key: 'vimeo', label: 'Vimeo Portfolio URL', placeholder: 'https://vimeo.com/username' },
                        { key: 'behance', label: 'Behance / Dribbble URL', placeholder: 'https://behance.net/username' }
                      ].map((field) => (
                        <div key={field.key}>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                            {field.label}
                          </label>
                          <input
                            type="url"
                            value={profile[field.key] || ''}
                            onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                            placeholder={field.placeholder}
                            style={{
                              width: '100%',
                              padding: '0.65rem 0.85rem',
                              borderRadius: '0.65rem',
                              border: '1px solid rgba(0, 0, 0, 0.08)',
                              backgroundColor: '#f3f3f5',
                              fontSize: '13px',
                              color: '#000000',
                              outline: 'none'
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                      <button
                        type="submit"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '0.65rem 1.5rem',
                          borderRadius: '0.65rem',
                          backgroundColor: '#000000',
                          color: '#ffffff',
                          fontSize: '12px',
                          fontWeight: '700',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
                        }}
                      >
                        <Save size={14} />
                        <span>Simpan Tautan Sosial</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* MODAL: TAMBAH / EDIT KEAHLIAN */}
      {showSkillModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setShowSkillModal(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              backgroundColor: '#ffffff',
              borderRadius: '1.25rem',
              padding: '1.5rem',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: '800', fontSize: '1.1rem' }}>
                {editingSkill ? 'Edit Keahlian' : 'Tambah Keahlian Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setShowSkillModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveSkill} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Kelompok Disiplin
                </label>
                <select
                  value={skillFormGroup}
                  onChange={(e) => setSkillFormGroup(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '0.65rem',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#f3f3f5',
                    fontSize: '13px',
                    color: '#000000',
                    outline: 'none'
                  }}
                >
                  <option value="Fotografi">Fotografi</option>
                  <option value="Videografi">Videografi</option>
                  <option value="Desain Grafis">Desain Grafis</option>
                  <option value="Copywriting">Copywriting</option>
                  <option value="3D & Spatial Pipeline">3D & Spatial Pipeline</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Nama Keahlian / Software
                </label>
                <input
                  type="text"
                  required
                  value={skillFormName}
                  onChange={(e) => setSkillFormName(e.target.value)}
                  placeholder="Contoh: Unreal Engine 5 Spatial Lighting"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '0.65rem',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#f3f3f5',
                    fontSize: '13px',
                    color: '#000000',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowSkillModal(false)}
                  style={{
                    padding: '0.55rem 1rem',
                    borderRadius: '0.65rem',
                    backgroundColor: '#f3f3f5',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.55rem 1.25rem',
                    borderRadius: '0.65rem',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Simpan Keahlian
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: TAMBAH / EDIT PENGALAMAN */}
      {showExpModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setShowExpModal(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
              backgroundColor: '#ffffff',
              borderRadius: '1.25rem',
              padding: '1.5rem',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: '800', fontSize: '1.1rem' }}>
                {editingExp ? 'Edit Riwayat Pengalaman' : 'Tambah Riwayat Pengalaman'}
              </h3>
              <button
                type="button"
                onClick={() => setShowExpModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveExp} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Posisi / Jabatan *
                </label>
                <input
                  type="text"
                  required
                  value={expRole}
                  onChange={(e) => setExpRole(e.target.value)}
                  placeholder="Contoh: Principal Creative Director"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '0.65rem',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#f3f3f5',
                    fontSize: '13px',
                    color: '#000000',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Perusahaan / Studio *
                </label>
                <input
                  type="text"
                  required
                  value={expOrg}
                  onChange={(e) => setExpOrg(e.target.value)}
                  placeholder="Contoh: Studio Artefak"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '0.65rem',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#f3f3f5',
                    fontSize: '13px',
                    color: '#000000',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Tahun Mulai
                  </label>
                  <input
                    type="text"
                    value={expStart}
                    onChange={(e) => setExpStart(e.target.value)}
                    placeholder="2024"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '0.65rem',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      backgroundColor: '#f3f3f5',
                      fontSize: '13px',
                      color: '#000000',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Tahun Selesai
                  </label>
                  <input
                    type="text"
                    value={expEnd}
                    onChange={(e) => setExpEnd(e.target.value)}
                    placeholder="Sekarang"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '0.65rem',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      backgroundColor: '#f3f3f5',
                      fontSize: '13px',
                      color: '#000000',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Lokasi (Opsional)
                </label>
                <input
                  type="text"
                  value={expLocation}
                  onChange={(e) => setExpLocation(e.target.value)}
                  placeholder="Jakarta / Tokyo / Remote"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '0.65rem',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#f3f3f5',
                    fontSize: '13px',
                    color: '#000000',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Poin Pencapaian (1 baris per poin)
                </label>
                <textarea
                  rows={3}
                  value={expBullets}
                  onChange={(e) => setExpBullets(e.target.value)}
                  placeholder="Memimpin konseptualisasi visual untuk brand global...&#10;Mengarahkan 25+ desainer..."
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '0.65rem',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#f3f3f5',
                    fontSize: '13px',
                    color: '#000000',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowExpModal(false)}
                  style={{
                    padding: '0.55rem 1rem',
                    borderRadius: '0.65rem',
                    backgroundColor: '#f3f3f5',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.55rem 1.25rem',
                    borderRadius: '0.65rem',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Simpan Pengalaman
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
