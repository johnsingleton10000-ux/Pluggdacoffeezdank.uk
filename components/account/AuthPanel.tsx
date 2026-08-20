"use client";

import { useState, type FormEvent } from "react";
import { createBrowserSupabaseClient } from "@/lib/auth/supabase-browser";
import { Button } from "@/components/ui/Button";
import { FormField, TextInput } from "@/components/ui/FormField";
import { Panel } from "@/components/ui/Panel";

export function AuthPanel() {
  const supabase = createBrowserSupabaseClient();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  if (!supabase) {
    return (
      <Panel>
        <h2 className="font-display text-3xl uppercase">Sign in is not configured</h2>
        <p className="mt-3 text-muted">
          Add <code className="text-gold">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="text-gold">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to enable authentication.
          The service role key must stay server-side.
        </p>
      </Panel>
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setStatus("loading");
    setMessage(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/account` },
    });
    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }
    setStatus("sent");
    setMessage("Check your email for the sign-in link.");
  }

  return (
    <Panel>
      <h2 className="font-display text-3xl uppercase">Sign in</h2>
      <p className="mt-3 text-muted">Account data is loaded from the server. Browser values are not trusted.</p>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <FormField label="Email" hint="Magic link sign-in. Passwords can be added later.">
          <TextInput
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormField>
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send sign-in link"}
        </Button>
      </form>
      {message ? (
        <p className={`mt-4 text-sm ${status === "error" ? "text-danger" : "text-success"}`} role="status">
          {message}
        </p>
      ) : null}
    </Panel>
  );
}
