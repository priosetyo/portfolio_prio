import { supabase } from './supabaseClient';

/**
 * Local Storage Helpers & Event Dispatcher
 */
export function notifySiteContentUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('prio_site_content_updated'));
  }
}

export function getLocalSettings() {
  try {
    const saved = localStorage.getItem('prio_site_settings');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return null;
}

export function saveLocalSettings(settings) {
  try {
    localStorage.setItem('prio_site_settings', JSON.stringify(settings));
  } catch (e) {}
}

export function getLocalSkills() {
  try {
    const saved = localStorage.getItem('prio_skills');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return null;
}

export function saveLocalSkills(skills) {
  try {
    localStorage.setItem('prio_skills', JSON.stringify(skills));
  } catch (e) {}
}

export function getLocalExperiences() {
  try {
    const saved = localStorage.getItem('prio_experiences');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return null;
}

export function saveLocalExperiences(exps) {
  try {
    localStorage.setItem('prio_experiences', JSON.stringify(exps));
  } catch (e) {}
}

/**
 * Fetch avatar terbaru dari Supabase Storage bucket 'portfolio-media' subfolder 'avatars'
 */
export async function getLatestAvatarFromStorage() {
  try {
    const { data, error } = await supabase.storage
      .from('portfolio-media')
      .list('avatars', {
        limit: 10,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (!error && Array.isArray(data) && data.length > 0) {
      const validAvatar = data.find((f) => f.name && !f.name.startsWith('.'));
      if (validAvatar) {
        return getStoragePublicUrl(`avatars/${validAvatar.name}`);
      }
    }
  } catch (e) {
    console.warn('Error fetching avatar from Supabase storage:', e);
  }
  return null;
}

/**
 * Fetch foto PNG Hero (tanpa border) terbaru dari Supabase Storage bucket 'portfolio-media' subfolder 'hero-portraits'
 */
export async function getLatestHeroPortraitFromStorage() {
  try {
    const { data, error } = await supabase.storage
      .from('portfolio-media')
      .list('hero-portraits', {
        limit: 10,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (!error && Array.isArray(data) && data.length > 0) {
      const validPortrait = data.find((f) => f.name && !f.name.startsWith('.'));
      if (validPortrait) {
        return getStoragePublicUrl(`hero-portraits/${validPortrait.name}`);
      }
    }
  } catch (e) {
    console.warn('Error fetching hero portrait from Supabase storage:', e);
  }
  return null;
}

/**
 * Fetch profil situs & info kontak
 */
export async function getSiteSettings() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .single();

    if (!error && data) {
      const local = getLocalSettings() || {};
      const merged = { ...local, ...data };

      // Jika avatar_url belum terisi atau masih placeholder lama, ambil foto profil aktual dari Supabase Storage
      const isPlaceholder =
        !merged.avatar_url ||
        merged.avatar_url.includes('lh3.googleusercontent.com');

      if (isPlaceholder) {
        const storageAvatar = await getLatestAvatarFromStorage();
        if (storageAvatar) {
          merged.avatar_url = storageAvatar;
        }
      }

      delete merged.hero_portrait_url;
      if (!merged.hero_bg_slides) {
        try {
          const bgLocal = localStorage.getItem('prio_hero_bg_slides');
          if (bgLocal) merged.hero_bg_slides = JSON.parse(bgLocal);
        } catch (e) {}
      }
      if (!merged.track_record_header && local.track_record_header) {
        merged.track_record_header = local.track_record_header;
      }
      if (!merged.track_record_metrics && local.track_record_metrics) {
        merged.track_record_metrics = local.track_record_metrics;
      }
      if (!merged.spotlight_items && local.spotlight_items) {
        merged.spotlight_items = local.spotlight_items;
      }
      saveLocalSettings(merged);
      return merged;
    }
  } catch (err) {
    console.warn('Menggunakan fallback lokal untuk site_settings:', err);
  }

  // Fallback lokal jika query database gagal
  const local = getLocalSettings() || {};
  delete local.hero_portrait_url;
  if (!local.hero_bg_slides) {
    try {
      const bgLocal = localStorage.getItem('prio_hero_bg_slides');
      if (bgLocal) local.hero_bg_slides = JSON.parse(bgLocal);
    } catch (e) {}
  }
  if (!local.avatar_url || local.avatar_url.includes('lh3.googleusercontent.com')) {
    const storageAvatar = await getLatestAvatarFromStorage();
    if (storageAvatar) {
      local.avatar_url = storageAvatar;
      saveLocalSettings(local);
    }
  }
  return local;
}

/**
 * Fetch semua keahlian (skills) dikelompokkan
 */
export async function getSkills() {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && Array.isArray(data) && data.length > 0) {
      saveLocalSkills(data);
      return data;
    }
  } catch (err) {
    console.warn('Menggunakan fallback lokal untuk skills:', err);
  }
  return getLocalSkills() || [];
}

/**
 * Fetch riwayat pengalaman (experiences)
 */
export async function getExperiences() {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && Array.isArray(data) && data.length > 0) {
      saveLocalExperiences(data);
      return data;
    }
  } catch (err) {
    console.warn('Menggunakan fallback lokal untuk experiences:', err);
  }
  return getLocalExperiences() || [];
}

/**
 * Fetch karya yang terbit (is_published = true) beserta media untuk galeri publik
 */
export async function getPublishedProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_media (
        id,
        kind,
        storage_path,
        thumb_path,
        external_url,
        poster_path,
        width,
        height,
        duration_sec,
        alt_text,
        sort_order
      )
    `)
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching published projects:', error);
    throw error;
  }
  return data || [];
}

/**
 * Admin: Fetch semua karya (draft & terbit)
 */
export async function getAllProjectsAdmin() {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_media (*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching admin projects:', error);
    throw error;
  }
  return data || [];
}

/**
 * Dapatkan public URL dari Supabase Storage bucket 'portfolio-media'
 */
export function getStoragePublicUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const { data } = supabase.storage.from('portfolio-media').getPublicUrl(path);
  return data?.publicUrl || '';
}

/**
 * Admin: Tambah karya baru
 */
export async function createProject(projectData) {
  const { project_media, ...fields } = projectData;

  const { data, error } = await supabase
    .from('projects')
    .insert([fields])
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }

  // Jika ada media yang dilampirkan, simpan ke tabel project_media
  let savedMedia = [];
  if (project_media && Array.isArray(project_media) && project_media.length > 0 && data?.id) {
    const mediaToInsert = project_media.map((m, idx) => ({
      project_id: data.id,
      kind: m.kind || 'image',
      storage_path: m.storage_path || null,
      thumb_path: m.thumb_path || null,
      external_url: m.external_url || null,
      poster_path: m.poster_path || null,
      width: m.width || null,
      height: m.height || null,
      duration_sec: m.duration_sec || null,
      alt_text: m.alt_text || '',
      sort_order: m.sort_order ?? idx
    }));

    const { data: insertedMedia, error: mediaErr } = await supabase
      .from('project_media')
      .insert(mediaToInsert)
      .select();

    if (mediaErr) {
      console.warn('Gagal menyimpan project_media ke Supabase:', mediaErr);
    } else {
      savedMedia = insertedMedia || [];
    }
  }

  return { ...data, project_media: savedMedia.length > 0 ? savedMedia : (project_media || []) };
}

/**
 * Admin: Update karya
 */
export async function updateProject(id, projectData) {
  const { project_media, ...fields } = projectData;

  const { data, error } = await supabase
    .from('projects')
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating project:', error);
    throw error;
  }

  // Sinkronisasi relasi project_media
  let savedMedia = [];
  if (project_media && Array.isArray(project_media)) {
    try {
      // Hapus media lama
      await supabase
        .from('project_media')
        .delete()
        .eq('project_id', id);

      if (project_media.length > 0) {
        const mediaToInsert = project_media.map((m, idx) => ({
          project_id: id,
          kind: m.kind || 'image',
          storage_path: m.storage_path || null,
          thumb_path: m.thumb_path || null,
          external_url: m.external_url || null,
          poster_path: m.poster_path || null,
          width: m.width || null,
          height: m.height || null,
          duration_sec: m.duration_sec || null,
          alt_text: m.alt_text || '',
          sort_order: m.sort_order ?? idx
        }));

        const { data: insertedMedia, error: mediaErr } = await supabase
          .from('project_media')
          .insert(mediaToInsert)
          .select();

        if (mediaErr) {
          console.warn('Gagal memperbarui project_media:', mediaErr);
        } else {
          savedMedia = insertedMedia || [];
        }
      }
    } catch (mediaSyncErr) {
      console.warn('Kesalahan sinkronisasi media:', mediaSyncErr);
    }
  }

  return { ...data, project_media: savedMedia.length > 0 ? savedMedia : (project_media || []) };
}

/**
 * Admin: Hapus karya
 */
export async function deleteProject(id) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
  return true;
}

/**
 * Admin: Toggle publikasi cepat
 */
export async function toggleProjectPublish(id, is_published) {
  const { data, error } = await supabase
    .from('projects')
    .update({ is_published, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error toggling project publish:', error);
    throw error;
  }
  return data;
}

/**
 * Admin: Tambah media karya
 */
export async function createProjectMedia(mediaData) {
  const { data, error } = await supabase
    .from('project_media')
    .insert([mediaData])
    .select()
    .single();

  if (error) {
    console.error('Error creating project media:', error);
    throw error;
  }
  return data;
}

/**
 * Admin: Hapus media karya
 */
export async function deleteProjectMedia(id) {
  const { error } = await supabase
    .from('project_media')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting project media:', error);
    throw error;
  }
  return true;
}

/**
 * Admin: Upload file ke bucket portfolio-media dan kembalikan Public URL
 */
export async function uploadMediaFile(path, fileBlob, contentType = 'image/webp') {
  const { data, error } = await supabase.storage
    .from('portfolio-media')
    .upload(path, fileBlob, {
      contentType,
      upsert: true
    });

  if (error) {
    console.error('Error uploading to Supabase storage:', error);
    throw error;
  }

  const { data: urlData } = supabase.storage
    .from('portfolio-media')
    .getPublicUrl(path);

  return {
    ...data,
    path,
    publicUrl: urlData?.publicUrl || ''
  };
}

/**
 * Admin: CRUD Pengalaman
 */
export async function createExperience(expData) {
  const newExp = { ...expData, id: expData.id || `exp-${Date.now()}` };
  
  // 1. Update local storage immediately
  const existing = getLocalExperiences() || [];
  const updatedList = [newExp, ...existing];
  saveLocalExperiences(updatedList);
  notifySiteContentUpdated();

  // 2. Sync to Supabase
  try {
    const { data, error } = await supabase
      .from('experiences')
      .insert([expData])
      .select()
      .single();

    if (!error && data) {
      const mergedList = updatedList.map((x) => (x.id === newExp.id ? data : x));
      saveLocalExperiences(mergedList);
      return data;
    }
  } catch (err) {
    console.warn('Supabase createExperience sync error, using local:', err);
  }
  return newExp;
}

export async function updateExperience(id, expData) {
  // 1. Update local storage immediately
  const existing = getLocalExperiences() || [];
  const updatedList = existing.map((x) => (x.id === id ? { ...x, ...expData } : x));
  saveLocalExperiences(updatedList);
  notifySiteContentUpdated();

  // 2. Sync to Supabase
  try {
    const { data, error } = await supabase
      .from('experiences')
      .update(expData)
      .eq('id', id)
      .select()
      .single();

    if (!error && data) return data;
  } catch (err) {
    console.warn('Supabase updateExperience sync error, using local:', err);
  }
  return { ...expData, id };
}

export async function deleteExperience(id) {
  // 1. Update local storage immediately
  const existing = getLocalExperiences() || [];
  const updatedList = existing.filter((x) => x.id !== id);
  saveLocalExperiences(updatedList);
  notifySiteContentUpdated();

  // 2. Sync to Supabase
  try {
    await supabase.from('experiences').delete().eq('id', id);
  } catch (err) {
    console.warn('Supabase deleteExperience error:', err);
  }
  return true;
}

/**
 * Admin: CRUD Keahlian (Skills)
 */
export async function createSkill(skillData) {
  const newSkill = { ...skillData, id: skillData.id || `s-${Date.now()}` };

  // 1. Update local storage immediately
  const existing = getLocalSkills() || [];
  const updatedList = [...existing, newSkill];
  saveLocalSkills(updatedList);
  notifySiteContentUpdated();

  // 2. Sync to Supabase
  try {
    const { data, error } = await supabase
      .from('skills')
      .insert([skillData])
      .select()
      .single();

    if (!error && data) {
      const mergedList = updatedList.map((s) => (s.id === newSkill.id ? data : s));
      saveLocalSkills(mergedList);
      return data;
    }
  } catch (err) {
    console.warn('Supabase createSkill sync error, using local:', err);
  }
  return newSkill;
}

export async function updateSkill(id, skillData) {
  // 1. Update local storage immediately
  const existing = getLocalSkills() || [];
  const updatedList = existing.map((s) => (s.id === id ? { ...s, ...skillData } : s));
  saveLocalSkills(updatedList);
  notifySiteContentUpdated();

  // 2. Sync to Supabase
  try {
    const { data, error } = await supabase
      .from('skills')
      .update(skillData)
      .eq('id', id)
      .select()
      .single();

    if (!error && data) return data;
  } catch (err) {
    console.warn('Supabase updateSkill sync error, using local:', err);
  }
  return { ...skillData, id };
}

export async function deleteSkill(id) {
  // 1. Update local storage immediately
  const existing = getLocalSkills() || [];
  const updatedList = existing.filter((s) => s.id !== id);
  saveLocalSkills(updatedList);
  notifySiteContentUpdated();

  // 2. Sync to Supabase
  try {
    await supabase.from('skills').delete().eq('id', id);
  } catch (err) {
    console.warn('Supabase deleteSkill error:', err);
  }
  return true;
}

/**
 * Admin: Update info Profil / Site Settings
 */
export async function updateSiteSettings(settingsData) {
  // 1. Simpan langsung ke local storage
  saveLocalSettings(settingsData);
  notifySiteContentUpdated();

  // 2. Siapkan sinkronisasi ke Supabase
  try {
    const { data: existing } = await supabase
      .from('site_settings')
      .select('id')
      .limit(1)
      .single();

    const targetId = existing?.id;
    let res = null;

    if (targetId) {
      res = await supabase
        .from('site_settings')
        .update(settingsData)
        .eq('id', targetId)
        .select()
        .single();
    } else {
      res = await supabase
        .from('site_settings')
        .insert([settingsData])
        .select()
        .single();
    }

    if (res?.error) {
      // Jika gagal karena kolom bio/sosial belum ditambahkan di Supabase SQL,
      // fallback update kolom standar agar data inti tetap sinkron ke database
      console.warn('Sinkronisasi penuh site_settings ke Supabase gagal, mencoba kolom inti:', res.error);
      const coreFields = {
        name: settingsData.name,
        headline: settingsData.headline,
        summary: settingsData.summary,
        avatar_url: settingsData.avatar_url,
        email: settingsData.email,
        phone: settingsData.phone,
        linkedin: settingsData.linkedin,
        location: settingsData.location
      };
      if (targetId) {
        const { error: coreErr } = await supabase.from('site_settings').update(coreFields).eq('id', targetId);
        if (coreErr) {
          const { avatar_url, ...minFields } = coreFields;
          await supabase.from('site_settings').update(minFields).eq('id', targetId);
        }
      } else {
        const { error: coreErr } = await supabase.from('site_settings').insert([coreFields]);
        if (coreErr) {
          const { avatar_url, ...minFields } = coreFields;
          await supabase.from('site_settings').insert([minFields]);
        }
      }
    }
  } catch (err) {
    console.warn('Update site settings fallback:', err);
  }
  return settingsData;
}

const DEFAULT_MESSAGES = [
  {
    id: 'msg-1',
    name: 'Hiroshi Tanaka',
    email: 'h.tanaka@spatialtokyo.jp',
    company: 'Tokyo Spatial Pavilion 2026',
    subject: 'Undangan Directing & Spatial Architecture Proposal',
    message: 'Halo Prio, kami sangat terkesima dengan portfolio Anda. Kami ingin mendiskusikan peluang kolaborasi untuk kurasi paviliun interaktif kami di Tokyo untuk kuartal mendatang.',
    created_at: '2026-10-25T08:30:00Z',
    is_read: false
  },
  {
    id: 'msg-2',
    name: 'Sarah Wijaya',
    email: 'sarah@kinetikamusik.com',
    company: 'Kinetika Nusantara',
    subject: 'Produksi Commercial Film & Audio-Visual Campaign',
    message: 'Hi Prio! Kami dari Kinetika Records sedang menyiapkan perilisan campaign album baru dan butuh creative direction serta visual identity sinematik.',
    created_at: '2026-10-24T14:15:00Z',
    is_read: true
  },
  {
    id: 'msg-3',
    name: 'Devon Vance',
    email: 'devon@omnicreative.net',
    company: 'Omni Creative Network SG',
    subject: 'Advisory Role & Spatial Brand Experience',
    message: 'Greetings Prio, would love to schedule a quick 30-min discovery call regarding an upcoming spatial OS branding project for a visionOS ecosystem.',
    created_at: '2026-10-22T10:00:00Z',
    is_read: true
  }
];

export function getLocalMessages() {
  try {
    const saved = localStorage.getItem('prio_admin_messages');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return DEFAULT_MESSAGES;
}

export function saveLocalMessages(messages) {
  try {
    localStorage.setItem('prio_admin_messages', JSON.stringify(messages));
  } catch (e) {}
}

