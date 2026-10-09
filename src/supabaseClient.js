import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.ANON_KEY?.trim();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
