import { NextResponse, type NextRequest } from "next/server";
import { supabaseConfigured } from "@/lib/env";

export async function middleware(request: NextRequest) {
  if (!supabaseConfigured()) return NextResponse.next();
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/|assets/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
