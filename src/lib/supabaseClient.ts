import { createClient, SupabaseClient } from '@supabase/supabase-js';

// TypeScript Interfaces (for env validation)
interface SupabaseEnv {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
}

// Lazy-initialized singleton client
let supabase: SupabaseClient | null = null;

const getSupabaseClient = (): SupabaseClient => {
  if (supabase) {
    return supabase;
  }

  const env: SupabaseEnv = {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  };

  // Validate env vars
  if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) {
    console.error('Missing Supabase env vars: Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env');
    throw new Error('Supabase client initialization failed: Missing environment variables');
  }

  supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);
  return supabase;
};

export default getSupabaseClient;