"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { FormField, Input } from "@/components/ui/Form";

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setPending(true);

    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      setError("Authentication is not configured.");
      setPending(false);
      return;
    }

    const result =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setPending(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    if (mode === "signup" && !result.data.session) {
      setMessage("Check your email to confirm the account, then sign in.");
      return;
    }

    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <FormField label="Email" htmlFor="email">
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </FormField>
      <FormField label="Password" htmlFor="password" hint="Minimum 6 characters.">
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
          required
          minLength={6}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </FormField>
      {error ? <p className="text-sm text-[var(--color-danger)]">{error}</p> : null}
      {message ? <p className="text-sm text-[var(--color-success)]">{message}</p> : null}
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Please wait" : mode === "signin" ? "Sign in" : "Create account"}
      </Button>
      <button
        type="button"
        className="min-h-12 text-sm font-bold uppercase tracking-wide text-[var(--color-text-muted)]"
        onClick={() => {
          setMode(mode === "signin" ? "signup" : "signin");
          setError(null);
          setMessage(null);
        }}
      >
        {mode === "signin" ? "Need an account? Create one" : "Already registered? Sign in"}
      </button>
    </form>
  );
}
