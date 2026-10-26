import { supabase } from './supabaseClient';

/**
 * Fetch profil situs & info kontak
 */
export async function getSiteSettings() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching site_settings:', error);
    throw error;
  }
  return data;
}

/**
 * Fetch semua keahlian (skills) dikelompokkan
 */
export async function getSkills() {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
  return data || [];
}

/**
 * Fetch riwayat pengalaman (experiences)
 */
export async function getExperiences() {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching experiences:', error);
    throw error;
  }
  return data || [];
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
  const { data, error } = await supabase
    .from('projects')
    .insert([projectData])
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }
  return data;
}

/**
 * Admin: Update karya
 */
export async function updateProject(id, projectData) {
  const { data, error } = await supabase
    .from('projects')
    .update({ ...projectData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating project:', error);
    throw error;
  }
  return data;
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
 * Admin: Upload file ke bucket portfolio-media
 */
export async function uploadMediaFile(path, fileBlob, contentType = 'image/webp') {
  const { data, error } = await supabase.storage
    .from('portfolio-media')
    .upload(path, fileBlob, {
      contentType,
      upsert: true
    });

  if (error) {
    console.error('Error uploading to storage:', error);
    throw error;
  }
  return data;
}

/**
 * Admin: CRUD Pengalaman
 */
export async function createExperience(expData) {
  const { data, error } = await supabase
    .from('experiences')
    .insert([expData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateExperience(id, expData) {
  const { data, error } = await supabase
    .from('experiences')
    .update(expData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteExperience(id) {
  const { error } = await supabase
    .from('experiences')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

/**
 * Admin: CRUD Keahlian (Skills)
 */
export async function createSkill(skillData) {
  const { data, error } = await supabase
    .from('skills')
    .insert([skillData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSkill(id, skillData) {
  const { data, error } = await supabase
    .from('skills')
    .update(skillData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteSkill(id) {
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}
