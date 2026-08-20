import { isSupabaseConfigured } from "@/lib/config/env";

export function GET() {
  return Response.json({
    ok: true,
    service: "dcbd-foundation",
    supabaseConfigured: isSupabaseConfigured(),
  });
}
