import React, { useState } from 'react';
import { Tag } from '../ui/Tag';
import { Button } from '../ui/Button';
import { Plus, Edit2, Trash2, Save, X, Briefcase, Award } from 'lucide-react';
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Sub Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        <Button
          variant={activeSubTab === 'exp' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setActiveSubTab('exp')}
          icon={Briefcase}
        >
          Pengalaman Kerja ({experiences.length})
        </Button>
        <Button
          variant={activeSubTab === 'skill' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setActiveSubTab('skill')}
          icon={Award}
        >
          Keahlian & Kompetensi ({skills.length})
        </Button>
      </div>

      {/* TAB 1: PENGALAMAN */}
      {activeSubTab === 'exp' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
          {/* List Experiences */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: '700' }}>Daftar Riwayat Karir</h3>
            {experiences.map((exp) => (
              <div
                key={exp.id}
                style={{
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}
              >
                <div>
                  <div style={{ fontWeight: '700', fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                    {exp.role}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-highlight)', fontWeight: '600' }}>
                    {exp.org} • {exp.start_date} — {exp.end_date || 'Sekarang'}
                  </div>
                  {exp.location && (
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                      {exp.location}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <button
                    type="button"
                    onClick={() => handleEditExp(exp)}
                    style={{ padding: '4px', color: 'var(--text-secondary)' }}
                    title="Edit"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteExp(exp.id)}
                    style={{ padding: '4px', color: 'var(--badge-video)' }}
                    title="Hapus"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Form Tambah/Ubah Experience */}
          <div
            style={{
              padding: 'var(--space-5)',
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              height: 'fit-content'
            }}
          >
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: '700', marginBottom: 'var(--space-4)' }}>
              {editingExp ? 'Edit Pengalaman' : 'Tambah Pengalaman Baru'}
            </h3>
            <form onSubmit={handleSaveExp} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: '600', marginBottom: '2px' }}>
                  Posisi / Peran *
                </label>
                <input
                  type="text"
                  required
                  value={expRole}
                  onChange={(e) => setExpRole(e.target.value)}
                  placeholder="e.g. Creative Director"
                  style={{ width: '100%', padding: 'var(--space-2)', fontSize: 'var(--text-xs)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-secondary)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: '600', marginBottom: '2px' }}>
                  Organisasi / Perusahaan *
                </label>
                <input
                  type="text"
                  required
                  value={expOrg}
                  onChange={(e) => setExpOrg(e.target.value)}
                  placeholder="e.g. Studio Kreatif"
                  style={{ width: '100%', padding: 'var(--space-2)', fontSize: 'var(--text-xs)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-secondary)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: '600', marginBottom: '2px' }}>
                    Tahun Mulai *
                  </label>
                  <input
                    type="text"
                    required
                    value={expStart}
                    onChange={(e) => setExpStart(e.target.value)}
                    placeholder="2022"
                    style={{ width: '100%', padding: 'var(--space-2)', fontSize: 'var(--text-xs)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-secondary)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: '600', marginBottom: '2px' }}>
                    Tahun Selesai
                  </label>
                  <input
                    type="text"
                    value={expEnd}
                    onChange={(e) => setExpEnd(e.target.value)}
                    placeholder="Sekarang / 2024"
                    style={{ width: '100%', padding: 'var(--space-2)', fontSize: 'var(--text-xs)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-secondary)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: '600', marginBottom: '2px' }}>
                  Poin Pencapaian (1 baris per poin)
                </label>
                <textarea
                  rows={4}
                  value={expBullets}
                  onChange={(e) => setExpBullets(e.target.value)}
                  placeholder="Memimpin konseptualisasi visual untuk 30+ brand...&#10;Meningkatkan engagement kampanye video..."
                  style={{ width: '100%', padding: 'var(--space-2)', fontSize: 'var(--text-xs)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-secondary)', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                {editingExp && (
                  <Button variant="secondary" size="sm" onClick={resetExpForm}>
                    Batal
                  </Button>
                )}
                <Button variant="primary" size="sm" type="submit" icon={Save}>
                  Simpan
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: KEAHLIAN (SKILLS) */}
      {activeSubTab === 'skill' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
          {/* List Skills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: '700', marginBottom: 'var(--space-2)' }}>
              Daftar Keahlian Aktif
            </h3>
            {skills.map((skill) => (
              <div
                key={skill.id}
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  backgroundColor: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Tag tone="default">{skill.group_name}</Tag>
                  <span style={{ fontWeight: '600', fontSize: 'var(--text-sm)' }}>{skill.name}</span>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <button
                    type="button"
                    onClick={() => handleEditSkill(skill)}
                    style={{ padding: '4px', color: 'var(--text-secondary)' }}
                    title="Edit"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteSkill(skill.id)}
                    style={{ padding: '4px', color: 'var(--badge-video)' }}
                    title="Hapus"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Form Tambah/Ubah Skill */}
          <div
            style={{
              padding: 'var(--space-5)',
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              height: 'fit-content'
            }}
          >
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: '700', marginBottom: 'var(--space-4)' }}>
              {editingSkill ? 'Edit Keahlian' : 'Tambah Keahlian Baru'}
            </h3>
            <form onSubmit={handleSaveSkill} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: '600', marginBottom: '2px' }}>
                  Kelompok Keahlian *
                </label>
                <select
                  value={skillGroup}
                  onChange={(e) => setSkillGroup(e.target.value)}
                  style={{ width: '100%', padding: 'var(--space-2)', fontSize: 'var(--text-xs)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-secondary)' }}
                >
                  <option value="Fotografi">Fotografi</option>
                  <option value="Videografi">Videografi</option>
                  <option value="Desain Grafis">Desain Grafis</option>
                  <option value="Copywriting">Copywriting</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: '600', marginBottom: '2px' }}>
                  Nama Keahlian / Kompetensi *
                </label>
                <input
                  type="text"
                  required
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="e.g. Color Grading & Finishing"
                  style={{ width: '100%', padding: 'var(--space-2)', fontSize: 'var(--text-xs)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-secondary)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                {editingSkill && (
                  <Button variant="secondary" size="sm" onClick={resetSkillForm}>
                    Batal
                  </Button>
                )}
                <Button variant="primary" size="sm" type="submit" icon={Save}>
                  Simpan Keahlian
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
