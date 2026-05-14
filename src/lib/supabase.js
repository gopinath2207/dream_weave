import { createClient } from '@supabase/supabase-js';

// ── Supabase Client ───────────────────────────────────────────
// Replace VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local
// before deploying!
const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  || 'https://placeholder.supabase.co';
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// ── Helper: fetch portfolio items ─────────────────────────────
export async function fetchPortfolio(category = null) {
  let query = supabase
    .from('portfolio')
    .select('*')
    .order('sort_order', { ascending: true });

  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) console.warn('[Supabase] fetchPortfolio error:', error.message);
  return data || [];
}

// ── Helper: fetch testimonials ────────────────────────────────
export async function fetchTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(8);

  if (error) console.warn('[Supabase] fetchTestimonials error:', error.message);
  return data || [];
}

// ── Helper: fetch site config value ──────────────────────────
export async function fetchConfig(key) {
  const { data, error } = await supabase
    .from('site_config')
    .select('value')
    .eq('key', key)
    .single();

  if (error) return null;
  return data?.value || null;
}
