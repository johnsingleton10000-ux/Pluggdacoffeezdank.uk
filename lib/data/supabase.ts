export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;
  return { url, anonKey };
}

/**
 * This module deliberately does not create a client until Supabase is
 * configured. Keep service-role keys server-only when a server client is
 * added; the public anon key is still protected by database RLS policies.
 */
export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null;
}
