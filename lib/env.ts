export function getPublicEnv() {
  return {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://pluggdacoffeezdank.uk",
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  };
}

export function supabaseConfigured() {
  const env = getPublicEnv();
  return Boolean(env.supabaseUrl && env.supabaseAnonKey);
}

export function getStripeSecret() {
  return process.env.STRIPE_SECRET_KEY || "";
}
