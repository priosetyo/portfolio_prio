import React, { useState } from 'react';
import { Tag } from '../ui/Tag';
import { Button } from '../ui/Button';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Briefcase,
  Award,
  Sparkles,
  Calendar,
  Building,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import {
  createExperience,
  updateExperience,
  deleteExperience,
  createSkill,
  updateSkill,
  deleteSkill
} from '../../lib/queries';

export function TextContentAdmin({ experiences = [], skills = [], onRefresh }) {
  const [activeSubTab, setActiveSubTab] = useState('exp'); // 'exp' | 'skill'

  // Experience state
  const [editingExp, setEditingExp] = useState(null);
  const [expRole, setExpRole] = useState('');
  const [expOrg, setExpOrg] = useState('');
  const [expLocation, setExpLocation] = useState('');
  const [expStart, setExpStart] = useState('');
  const [expEnd, setExpEnd] = useState('');
  const [expBullets, setExpBullets] = useState('');
  const [expSort, setExpSort] = useState(0);

  // Skill state
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillGroup, setSkillGroup] = useState('Fotografi');
  const [skillName, setSkillName] = useState('');
  const [skillSort, setSkillSort] = useState(0);

  // Reset Form Exp
  const resetExpForm = () => {
    setEditingExp(null);
    setExpRole('');
    setExpOrg('');
    setExpLocation('');
    setExpStart('');
    setExpEnd('');
    setExpBullets('');
    setExpSort(0);
  };

  const handleEditExp = (item) => {
    setEditingExp(item);
    setExpRole(item.role || '');
    setExpOrg(item.org || '');
    setExpLocation(item.location || '');
    setExpStart(item.start_date || '');
    setExpEnd(item.end_date || '');
    setExpBullets(Array.isArray(item.bullets) ? item.bullets.join('\n') : '');
    setExpSort(item.sort_order ?? 0);
  };

  const handleSaveExp = async (e) => {
    e.preventDefault();
    const bulletsArray = expBullets
      .split('\n')
      .map((b) => b.trim())
      .filter(Boolean);

    const payload = {
      type: 'work',
      role: expRole,
      org: expOrg,
      location: expLocation,
      start_date: expStart,
      end_date: expEnd,
      bullets: bulletsArray,
      sort_order: parseInt(expSort, 10) || 0
    };

    try {
      if (editingExp?.id) {
        await updateExperience(editingExp.id, payload);
      } else {
        await createExperience(payload);
      }
      resetExpForm();
      onRefresh();
    } catch (err) {
      console.error('Error saving experience:', err);
      alert('Gagal menyimpan pengalaman: ' + err.message);
    }
  };

  const handleDeleteExp = async (id) => {
    if (!window.confirm('Hapus riwayat pengalaman ini?')) return;
    try {
      await deleteExperience(id);
      onRefresh();
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    }
  };

  // Skill Handlers
  const resetSkillForm = () => {
    setEditingSkill(null);
    setSkillName('');
    setSkillSort(0);
  };

  const handleEditSkill = (item) => {
    setEditingSkill(item);
    setSkillGroup(item.group_name || 'Fotografi');
    setSkillName(item.name || '');
    setSkillSort(item.sort_order ?? 0);
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    const payload = {
      group_name: skillGroup,
      name: skillName,
      sort_order: parseInt(skillSort, 10) || 0
    };

    try {
      if (editingSkill?.id) {
        await updateSkill(editingSkill.id, payload);
      } else {
        await createSkill(payload);
      }
      resetSkillForm();
      onRefresh();
    } catch (err) {
      console.error('Error saving skill:', err);
      alert('Gagal menyimpan keahlian: ' + err.message);
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Hapus keahlian ini?')) return;
    try {
      await deleteSkill(id);
      onRefresh();
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Sub Tabs Pill Selector */}
      <div
        style={{
          display: 'inline-flex',
          padding: '0.25rem',
          borderRadius: '9999px',
          backgroundColor: '#f3f3f5',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          alignSelf: 'flex-start'
        }}
      >
        <button
          type="button"
          onClick={() => setActiveSubTab('exp')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.5rem 1.25rem',
            borderRadius: '9999px',
            fontSize: 'var(--text-xs)',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeSubTab === 'exp' ? '#000000' : 'transparent',
            color: activeSubTab === 'exp' ? '#ffffff' : 'var(--text-secondary)',
            transition: 'all 0.15s ease'
          }}
        >
          <Briefcase size={14} />
          <span>Riwayat Pengalaman ({experiences.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('skill')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.5rem 1.25rem',
            borderRadius: '9999px',
            fontSize: 'var(--text-xs)',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeSubTab === 'skill' ? '#000000' : 'transparent',
            color: activeSubTab === 'skill' ? '#ffffff' : 'var(--text-secondary)',
            transition: 'all 0.15s ease'
          }}
        >
          <Award size={14} />
          <span>Toolkit & Kompetensi ({skills.length})</span>
        </button>
      </div>

      {/* TAB 1: PENGALAMAN KERJA */}
      {activeSubTab === 'exp' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '1.5rem',
            alignItems: 'start'
          }}
        >
          {/* List Experiences */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#000000', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Linimasa Karir & Pengalaman
              </h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{experiences.length} Entri</span>
            </div>

            {experiences.map((exp) => (
              <div
                key={exp.id}
                style={{
                  padding: '1.25rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '1rem',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  transition: 'border-color 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#000000' }}>
                      {exp.role}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#000000' }}>
                    <Building size={13} color="var(--text-tertiary)" />
                    <span style={{ fontWeight: '600' }}>{exp.org}</span>
                    <span style={{ color: 'var(--text-tertiary)' }}>•</span>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {exp.start_date} — {exp.end_date || 'Sekarang'}
                    </span>
                  </div>

                  {exp.location && (
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>
                      📍 {exp.location}
                    </div>
                  )}

                  {Array.isArray(exp.bullets) && exp.bullets.length > 0 && (
                    <ul style={{ margin: '0.4rem 0 0 0', paddingLeft: '1.1rem', fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {exp.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.35rem', flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => handleEditExp(exp)}
                    style={{
                      padding: '0.4rem',
                      borderRadius: '0.5rem',
                      backgroundColor: '#f3f3f5',
                      color: 'var(--text-secondary)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    title="Edit Pengalaman"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteExp(exp.id)}
                    style={{
                      padding: '0.4rem',
                      borderRadius: '0.5rem',
                      backgroundColor: 'transparent',
                      color: '#dc2626',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    title="Hapus Pengalaman"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Form Tambah/Ubah Experience */}
          <div
            style={{
              padding: '1.5rem',
              backgroundColor: '#ffffff',
              borderRadius: '1.25rem',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#000000', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {editingExp ? 'Edit Pengalaman' : 'Tambah Pengalaman Baru'}
              </h3>
              {editingExp && (
                <button
                  type="button"
                  onClick={resetExpForm}
                  style={{
                    fontSize: '0.68rem',
                    color: 'var(--text-tertiary)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Batal Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveExp} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  Posisi / Peran *
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
                    fontSize: '0.78rem',
                    borderRadius: '0.65rem',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#f3f3f5',
                    color: '#000000',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
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
                    fontSize: '0.78rem',
                    borderRadius: '0.65rem',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#f3f3f5',
                    color: '#000000',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                    Tahun Mulai *
                  </label>
                  <input
                    type="text"
                    required
                    value={expStart}
                    onChange={(e) => setExpStart(e.target.value)}
                    placeholder="2024"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.78rem',
                      borderRadius: '0.65rem',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      backgroundColor: '#f3f3f5',
                      color: '#000000',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
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
                      fontSize: '0.78rem',
                      borderRadius: '0.65rem',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      backgroundColor: '#f3f3f5',
                      color: '#000000',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  Lokasi (Opsional)
                </label>
                <input
                  type="text"
                  value={expLocation}
                  onChange={(e) => setExpLocation(e.target.value)}
                  placeholder="Jakarta / Remote Global"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.78rem',
                    borderRadius: '0.65rem',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#f3f3f5',
                    color: '#000000',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  Poin Pencapaian (1 baris per poin)
                </label>
                <textarea
                  rows={4}
                  value={expBullets}
                  onChange={(e) => setExpBullets(e.target.value)}
                  placeholder="Memimpin konseptualisasi visual untuk brand global...&#10;Mengarahkan 25+ desainer dan produser video..."
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.78rem',
                    borderRadius: '0.65rem',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#f3f3f5',
                    color: '#000000',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="submit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '0.65rem',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <Save size={13} />
                  <span>{editingExp ? 'Simpan Perubahan' : 'Tambahkan Pengalaman'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: KEAHLIAN & TOOLKIT */}
      {activeSubTab === 'skill' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '1.5rem',
            alignItems: 'start'
          }}
        >
          {/* List Skills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#000000', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Daftar Toolkit & Keahlian Aktif
              </h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{skills.length} Keahlian</span>
            </div>

            {skills.map((skill) => (
              <div
                key={skill.id}
                style={{
                  padding: '0.85rem 1.25rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '0.85rem',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: '700',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '9999px',
                      backgroundColor: 'var(--color-secondary-fixed)',
                      color: '#1b1735'
                    }}
                  >
                    {skill.group_name}
                  </span>
                  <span style={{ fontWeight: '700', fontSize: '0.85rem', color: '#000000' }}>
                    {skill.name}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <button
                    type="button"
                    onClick={() => handleEditSkill(skill)}
                    style={{
                      padding: '0.35rem',
                      borderRadius: '0.4rem',
                      backgroundColor: '#f3f3f5',
                      color: 'var(--text-secondary)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    title="Edit"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteSkill(skill.id)}
                    style={{
                      padding: '0.35rem',
                      borderRadius: '0.4rem',
                      backgroundColor: 'transparent',
                      color: '#dc2626',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    title="Hapus"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Form Tambah/Ubah Skill */}
          <div
            style={{
              padding: '1.5rem',
              backgroundColor: '#ffffff',
              borderRadius: '1.25rem',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#000000', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {editingSkill ? 'Edit Keahlian' : 'Tambah Keahlian Baru'}
              </h3>
              {editingSkill && (
                <button
                  type="button"
                  onClick={resetSkillForm}
                  style={{
                    fontSize: '0.68rem',
                    color: 'var(--text-tertiary)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Batal Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveSkill} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  Kelompok Disiplin *
                </label>
                <select
                  value={skillGroup}
                  onChange={(e) => setSkillGroup(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.78rem',
                    borderRadius: '0.65rem',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#f3f3f5',
                    color: '#000000',
                    outline: 'none'
                  }}
                >
                  <option value="Fotografi">Fotografi</option>
                  <option value="Videografi">Videografi</option>
                  <option value="Desain Grafis">Desain Grafis</option>
                  <option value="Copywriting">Copywriting</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  Nama Toolkit / Kompetensi *
                </label>
                <input
                  type="text"
                  required
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="Contoh: Unreal Engine 5 Spatial Lighting"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.78rem',
                    borderRadius: '0.65rem',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#f3f3f5',
                    color: '#000000',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="submit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '0.65rem',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <Save size={13} />
                  <span>{editingSkill ? 'Simpan Keahlian' : 'Tambahkan Keahlian'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
