import type { UserProfile } from "../../types/dcbd";

export interface AuthSession {
  user: UserProfile | null;
  accessToken: string | null;
}

/**
 * Keeps auth access behind one server-side boundary. Supabase can implement
 * this contract later without coupling UI components to a provider SDK.
 */
export async function getCurrentSession(): Promise<AuthSession> {
  return { user: null, accessToken: null };
}
