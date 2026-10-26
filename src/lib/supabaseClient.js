import { createClient } from '@supabase/supabase-js';

// Baca environment variables Vite
const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(rawUrl && rawKey);

if (!isSupabaseConfigured) {
  console.warn(
    'VITE_SUPABASE_URL atau VITE_SUPABASE_ANON_KEY belum diset di Environment Variables (Vercel). ' +
    'Aplikasi tetap berjalan mulus menggunakan data portofolio kurasi Stitch.'
  );
}

// Gunakan fallback URL aman agar createClient tidak melempar Uncaught Error saat env belum diset
const supabaseUrl = isSupabaseConfigured ? rawUrl : 'https://pipymdkphzhkyvutclfn.supabase.co';
const supabaseAnonKey = isSupabaseConfigured ? rawKey : 'sb_publishable_cFaPd_YnpN7G6Xk_QoDEuQ_BzoYo2fx';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
