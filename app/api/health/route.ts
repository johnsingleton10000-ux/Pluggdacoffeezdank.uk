import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    stage: "foundation",
    authConfigured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  });
}
