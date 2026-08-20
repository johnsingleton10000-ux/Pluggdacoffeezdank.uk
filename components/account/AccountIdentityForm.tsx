"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { FormField, Input } from "@/components/ui/Form";
import { updateAccountIdentity } from "@/app/account/actions";
import type { UserAccount } from "@/types/account";

export function AccountIdentityForm({ account }: { account: UserAccount }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function onSubmit(formData: FormData) {
    setError(null);
    setSaved(false);
    const result = await updateAccountIdentity(formData);
    if (result.error) {
      setError(result.error);
      return;
    }
    setSaved(true);
    router.refresh();
  }

  async function signOut() {
    const supabase = createBrowserSupabaseClient();
    await supabase?.auth.signOut();
    router.refresh();
  }

  return (
    <div className="grid gap-6">
      <form action={onSubmit} className="grid gap-4">
        <FormField label="Username" htmlFor="username">
          <Input id="username" name="username" defaultValue={account.username ?? ""} minLength={3} maxLength={24} />
        </FormField>
        <FormField label="Display name" htmlFor="displayName">
          <Input id="displayName" name="displayName" defaultValue={account.displayName ?? ""} maxLength={40} />
        </FormField>
        {error ? <p className="text-sm text-[var(--color-danger)]">{error}</p> : null}
        {saved ? <p className="text-sm text-[var(--color-success)]">Saved.</p> : null}
        <Button type="submit">Save identity</Button>
      </form>
      <Button type="button" variant="ghost" onClick={signOut}>
        Sign out
      </Button>
    </div>
  );
}
