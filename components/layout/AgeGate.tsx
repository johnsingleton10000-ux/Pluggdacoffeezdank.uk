"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/config/site";

const STORAGE_KEY = "dcbdAgeOk";
const OPEN_PATHS = new Set(["/privacy", "/terms"]);

export function AgeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    setAllowed(window.localStorage.getItem(STORAGE_KEY) === "yes");
  }, []);

  if (OPEN_PATHS.has(pathname)) return <>{children}</>;

  if (allowed === null) {
    return <div className="min-h-screen bg-[var(--color-bg)]" aria-hidden="true" />;
  }

  if (allowed) return <>{children}</>;

  return (
    <main className="grit flex min-h-screen items-center justify-center px-4 py-10">
      <section className="outline-frame w-full max-w-xl rounded-[var(--radius-panel)] bg-[var(--color-panel)] p-6 text-center sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-gold)]">
          {SITE.ageRestriction} entry
        </p>
        <h1 className="display mt-4 text-5xl sm:text-7xl">{SITE.name}</h1>
        <p className="mt-4 text-base text-[var(--color-text-muted)] sm:text-lg">
          Adult-only ecosystem. Confirm you are 18 or over to continue.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Button type="button" size="lg" onClick={() => {
            window.localStorage.setItem(STORAGE_KEY, "yes");
            setAllowed(true);
          }}>
            I am 18+ enter
          </Button>
          <a
            href="https://www.google.com"
            className="inline-flex min-h-14 items-center justify-center rounded-[var(--radius-control)] border-2 border-[var(--color-line)] px-6 text-base font-bold uppercase"
          >
            Leave
          </a>
        </div>
        <p className="mt-6 text-sm text-[var(--color-text-muted)]">
          <a href="/privacy" className="underline">Privacy</a>
          {" · "}
          <a href="/terms" className="underline">Terms</a>
        </p>
      </section>
    </main>
  );
}
