import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (
  import.meta.env.SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_URL
)?.trim();

const supabaseAnonKey = (
  import.meta.env.SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY
)?.trim();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
