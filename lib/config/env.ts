function readEnv(name: string): string | undefined {
  const value = process.env[name];
  if (!value || value.trim() === "") return undefined;
  return value.trim();
}

export const publicEnv = {
  siteUrl: readEnv("NEXT_PUBLIC_SITE_URL") ?? "http://localhost:3000",
  supabaseUrl: readEnv("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
} as const;

export function isSupabaseConfigured(): boolean {
  return Boolean(publicEnv.supabaseUrl && publicEnv.supabaseAnonKey);
}

export function getServiceRoleKey(): string | undefined {
  return readEnv("SUPABASE_SERVICE_ROLE_KEY");
}

export function getStripeSecretKey(): string | undefined {
  return readEnv("STRIPE_SECRET_KEY");
}

export function assertServerSecret(name: "SUPABASE_SERVICE_ROLE_KEY" | "STRIPE_SECRET_KEY"): string {
  const value = name === "STRIPE_SECRET_KEY" ? getStripeSecretKey() : getServiceRoleKey();
  if (!value) {
    throw new Error(`${name} is not configured.`);
  }
  return value;
}
