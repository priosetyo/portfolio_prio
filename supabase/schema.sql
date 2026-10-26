-- ==============================================================================
-- SCHEMA REVISI WEB PORTOFOLIO PRIO SETYO (Versi 1.0)
-- Berdasarkan: PRD Revisi (prd_web_portofolio_prio_setyo_revisi.md)
-- 5 Tabel Utama: site_settings, projects, project_media, experiences, skills
-- (Tabel 'metrics' dan 'case_studies' telah dihapus sesuai PRD revisi)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 0. BERSIHKAN TABEL LAMA YANG TIDAK LAGI DIGUNAKAN (Jika ada)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS case_studies CASCADE;
DROP TABLE IF EXISTS metrics CASCADE;

-- ------------------------------------------------------------------------------
-- 1. ENUM TYPES
-- ------------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE work_category AS ENUM ('photo', 'video', 'design', 'copy');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE media_kind AS ENUM ('image', 'video', 'embed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ------------------------------------------------------------------------------
-- 2. TABEL: site_settings (Profil Situs, Kontak, Resume)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Prio Setyo',
  headline text,
  summary text,
  email text,
  phone text,
  linkedin text,
  location text,
  cv_path text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 3. TABEL: projects (Galeri Karya Utama)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category work_category NOT NULL,
  summary text,
  description text,
  client text,
  year int,
  role text,
  excerpt text,
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_published boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 4. TABEL: project_media (Relasi Aset Media Foto / Video / Embed)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS project_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  kind media_kind NOT NULL,
  storage_path text,
  thumb_path text,
  external_url text,
  poster_path text,
  width int,
  height int,
  duration_sec int,
  alt_text text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 5. TABEL: experiences (Riwayat Karir, Organisasi & Pendidikan)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL DEFAULT 'work', -- 'work' atau 'education'
  role text NOT NULL,
  org text NOT NULL,
  location text,
  start_date text NOT NULL,
  end_date text,
  bullets text[] NOT NULL DEFAULT '{}',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 6. TABEL: skills (Taksonomi Kelompok Keahlian)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_name text NOT NULL,
  name text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 7. INDEKS UNTUK OPTIMASI PERFORMA
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_is_published ON projects(is_published);
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_project_media_project_id ON project_media(project_id);
CREATE INDEX IF NOT EXISTS idx_project_media_sort_order ON project_media(sort_order);
CREATE INDEX IF NOT EXISTS idx_experiences_sort_order ON experiences(sort_order);
CREATE INDEX IF NOT EXISTS idx_skills_group ON skills(group_name);

-- ------------------------------------------------------------------------------
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Helper check JWT: (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'

-- Policy: site_settings (Publik membaca, Admin kelola)
DROP POLICY IF EXISTS "publik membaca profil situs" ON site_settings;
CREATE POLICY "publik membaca profil situs" ON site_settings
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "admin mengelola profil situs" ON site_settings;
CREATE POLICY "admin mengelola profil situs" ON site_settings
  FOR ALL TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Policy: projects (Publik hanya membaca yang terbit, Admin kelola semua)
DROP POLICY IF EXISTS "publik membaca karya terbit" ON projects;
CREATE POLICY "publik membaca karya terbit" ON projects
  FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "admin mengelola karya" ON projects;
CREATE POLICY "admin mengelola karya" ON projects
  FOR ALL TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Policy: project_media (Publik hanya membaca media dari karya terbit)
DROP POLICY IF EXISTS "publik membaca media karya terbit" ON project_media;
CREATE POLICY "publik membaca media karya terbit" ON project_media
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM projects p WHERE p.id = project_media.project_id AND p.is_published = true
  ));

DROP POLICY IF EXISTS "admin mengelola media karya" ON project_media;
CREATE POLICY "admin mengelola media karya" ON project_media
  FOR ALL TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Policy: experiences (Publik membaca, Admin kelola)
DROP POLICY IF EXISTS "publik membaca experiences" ON experiences;
CREATE POLICY "publik membaca experiences" ON experiences
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "admin mengelola experiences" ON experiences;
CREATE POLICY "admin mengelola experiences" ON experiences
  FOR ALL TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Policy: skills (Publik membaca, Admin kelola)
DROP POLICY IF EXISTS "publik membaca skills" ON skills;
CREATE POLICY "publik membaca skills" ON skills
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "admin mengelola skills" ON skills;
CREATE POLICY "admin mengelola skills" ON skills
  FOR ALL TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ------------------------------------------------------------------------------
-- 9. STORAGE BUCKET & POLICIES (portfolio-media)
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policy Storage: Publik membaca media
DROP POLICY IF EXISTS "publik membaca media storage" ON storage.objects;
CREATE POLICY "publik membaca media storage" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio-media');

-- Policy Storage: Admin upload/update/delete media
DROP POLICY IF EXISTS "admin mengelola storage" ON storage.objects;
CREATE POLICY "admin mengelola storage" ON storage.objects
  FOR ALL TO authenticated
  USING (
    bucket_id = 'portfolio-media' AND
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
  WITH CHECK (
    bucket_id = 'portfolio-media' AND
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- ------------------------------------------------------------------------------
-- 10. DATA AWAL (SEED DATA REVISI)
-- ------------------------------------------------------------------------------

-- Profil default Prio
INSERT INTO site_settings (id, name, headline, summary, email, phone, linkedin, location)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Prio Setyo',
  'Visual Creator, Designer & Copywriter',
  'Membantu brand mengomunikasikan nilai mereka melalui visual yang kuat, desain fungsional, dan narasi yang berdaya pikat.',
  'priosetyo@example.com',
  '+6281234567890',
  'https://linkedin.com/in/priosetyo',
  'Indonesia'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  headline = EXCLUDED.headline,
  summary = EXCLUDED.summary,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  linkedin = EXCLUDED.linkedin,
  location = EXCLUDED.location;

-- Kelompok Keahlian (Skills)
DELETE FROM skills;
INSERT INTO skills (group_name, name, sort_order)
VALUES
  ('Fotografi', 'Commercial & Product Photography', 1),
  ('Fotografi', 'Portrait & Editorial', 2),
  ('Videografi', 'Directing & Cinematography', 3),
  ('Videografi', 'Post-Production & Color Grading', 4),
  ('Desain Grafis', 'Brand Identity & Guidelines', 5),
  ('Desain Grafis', 'Marketing & Social Media Collateral', 6),
  ('Copywriting', 'Direct-Response Ad Copy', 7),
  ('Copywriting', 'Brand Narrative & Concept Storytelling', 8);

-- Riwayat Pengalaman (Experiences)
DELETE FROM experiences;
INSERT INTO experiences (type, role, org, location, start_date, end_date, bullets, sort_order)
VALUES
  ('work', 'Creative Director & Visual Strategist', 'Studio Kreatif Independen', 'Indonesia', '2022', 'Sekarang', ARRAY['Memimpin konseptualisasi visual untuk 30+ brand lokal dan multinasional.', 'Mengintegrasikan narasi copywriting dengan estetika video komersial berkonversi tinggi.'], 1),
  ('work', 'Visual Designer & Content Producer', 'Agensi Media Digital', 'Indonesia', '2020', '2022', ARRAY['Memproduksi aset visual untuk kampanye digital multichannel.', 'Meningkatkan standar visual presentasi pitch klien hingga memenangkan tender utama.'], 2);
