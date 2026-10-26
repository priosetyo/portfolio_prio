import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { LoginForm } from './LoginForm';
import { ProjectTable } from './ProjectTable';
import { ProjectForm } from './ProjectForm';
import { TextContentAdmin } from './TextContentAdmin';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';
import {
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
  toggleProjectPublish,
  getExperiences,
  getSkills
} from '../../lib/queries';
import {
  Plus,
  ArrowLeft,
  LogOut,
  Sun,
  Moon,
  Layers,
  Eye,
  FileEdit,
  FolderKanban,
  FileText,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export function AdminPage({ onBackToSite }) {
  const { session, user, isAdmin, loading: authLoading, signIn, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  // Local bypass demo mode untuk kemudahan pengujian
  const [demoAdmin, setDemoAdmin] = useState(false);
  const isAuthenticated = Boolean(session || demoAdmin);

  // Data state
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // UI view state
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'text'
  const [editingProject, setEditingProject] = useState(null); // null = table view, object = editing, {} = new
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Fetch all projects & contents
  const loadAdminData = useCallback(async () => {
    setLoadingData(true);
    try {
      const [projData, expData, skillData] = await Promise.allSettled([
        getAllProjectsAdmin(),
        getExperiences(),
        getSkills()
      ]);

      if (projData.status === 'fulfilled') setProjects(projData.value || []);
      if (expData.status === 'fulfilled') setExperiences(expData.value || []);
      if (skillData.status === 'fulfilled') setSkills(skillData.value || []);
    } catch (err) {
      console.warn('Gagal memuat data admin dari Supabase:', err);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
    }
  }, [isAuthenticated, loadAdminData]);

  // Jika belum login
  if (!isAuthenticated) {
    return (
      <LoginForm
        onLogin={signIn}
        onBackToSite={onBackToSite}
        onDemoLogin={() => setDemoAdmin(true)}
      />
    );
  }

  // Handle Create or Update Project
  const handleSaveProject = async (payload, existingId) => {
    if (existingId) {
      const updated = await updateProject(existingId, payload);
      setProjects((prev) => prev.map((p) => (p.id === existingId ? { ...p, ...payload } : p)));
    } else {
      const created = await createProject(payload);
      setProjects((prev) => [created || { ...payload, id: `proj-${Date.now()}` }, ...prev]);
    }
    setEditingProject(null);
    setIsCreatingNew(false);
    loadAdminData();
  };

  // Handle Delete Project
  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.warn('Hapus proyek error (simulasi state lokal):', err);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Handle Toggle Publish
  const handleTogglePublish = async (id, nextState) => {
    try {
      await toggleProjectPublish(id, nextState);
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, is_published: nextState } : p)));
    } catch (err) {
      console.warn('Toggle publish fallback lokal:', err);
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, is_published: nextState } : p)));
    }
  };

  // Stats calculation
  const totalProjects = projects.length;
  const publishedCount = projects.filter((p) => p.is_published).length;
  const draftCount = totalProjects - publishedCount;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Admin Sticky Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'var(--bg-elevated)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: 'var(--space-3) 0'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-3)'
          }}
        >
          {/* Brand & Mode */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <button
              type="button"
              onClick={onBackToSite}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: 'var(--text-xs)',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <ArrowLeft size={14} />
              <span>Lihat Web Publik</span>
            </button>

            <span style={{ fontWeight: '800', fontSize: 'var(--text-base)', color: 'var(--text-primary)' }}>
              Admin Panel
            </span>

            {demoAdmin && <Tag tone="accent">Mode Demo Aktif</Tag>}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <button
              onClick={toggleTheme}
              title={isDark ? 'Mode Terang' : 'Mode Gelap'}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <Button
              variant="outline"
              size="sm"
              icon={LogOut}
              onClick={() => {
                if (demoAdmin) setDemoAdmin(false);
                else signOut();
              }}
            >
              Keluar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="container" style={{ flex: 1, padding: 'var(--space-8) var(--space-4)' }}>
        {/* Statistics Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-8)'
          }}
        >
          <div style={{ padding: 'var(--space-4) var(--space-5)', backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: '600', textTransform: 'uppercase' }}>
              Total Portofolio Karya
            </div>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: '800', color: 'var(--text-primary)', marginTop: 'var(--space-1)' }}>
              {totalProjects}
            </div>
          </div>

          <div style={{ padding: 'var(--space-4) var(--space-5)', backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--badge-copy)', fontWeight: '600', textTransform: 'uppercase' }}>
              Karya Terbit (Live Publik)
            </div>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: '800', color: 'var(--badge-copy)', marginTop: 'var(--space-1)' }}>
              {publishedCount}
            </div>
          </div>

          <div style={{ padding: 'var(--space-4) var(--space-5)', backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: '600', textTransform: 'uppercase' }}>
              Draf / Tersembunyi
            </div>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: '800', color: 'var(--text-primary)', marginTop: 'var(--space-1)' }}>
              {draftCount}
            </div>
          </div>

          <div style={{ padding: 'var(--space-4) var(--space-5)', backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-highlight)', fontWeight: '600', textTransform: 'uppercase' }}>
              Pengalaman & Keahlian
            </div>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: '800', color: 'var(--accent-highlight)', marginTop: 'var(--space-1)' }}>
              {experiences.length + skills.length}
            </div>
          </div>
        </div>

        {/* View Switcher: Project Form vs Table View */}
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
          <div>
            {/* Navigation Tabs & Primary Action */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-6)'
              }}
            >
              {/* Main Tabs */}
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <Button
                  variant={activeTab === 'projects' ? 'primary' : 'secondary'}
                  size="md"
                  onClick={() => setActiveTab('projects')}
                  icon={FolderKanban}
                >
                  Manajemen Karya ({totalProjects})
                </Button>

                <Button
                  variant={activeTab === 'text' ? 'primary' : 'secondary'}
                  size="md"
                  onClick={() => setActiveTab('text')}
                  icon={FileText}
                >
                  Konten Teks & Keahlian
                </Button>
              </div>

              {/* Action Button */}
              {activeTab === 'projects' && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsCreatingNew(true)}
                  icon={Plus}
                >
                  Tambah Karya Baru
                </Button>
              )}
            </div>

            {/* Content Tabs */}
            {activeTab === 'projects' ? (
              <ProjectTable
                projects={projects}
                onEdit={(proj) => setEditingProject(proj)}
                onDelete={handleDeleteProject}
                onTogglePublish={handleTogglePublish}
              />
            ) : (
              <TextContentAdmin
                experiences={experiences}
                skills={skills}
                onRefresh={loadAdminData}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
