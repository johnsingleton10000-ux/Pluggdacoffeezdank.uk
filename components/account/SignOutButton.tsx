"use client";

import { createBrowserSupabaseClient } from "@/lib/auth/supabase-browser";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function signOut() {
    const supabase = createBrowserSupabaseClient();
    if (!supabase) return;
    setBusy(true);
    await supabase.auth.signOut();
    router.refresh();
    setBusy(false);
  }

  return (
    <Button variant="ghost" onClick={signOut} disabled={busy}>
      {busy ? "Signing out…" : "Sign out"}
    </Button>
  );
}
