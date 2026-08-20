"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { site } from "@/lib/config/site";

const STORAGE_KEY = "dcbd-age-ok";

export function AgeGate({ children }: { children: ReactNode }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      setAllowed(true);
    }
  }, []);

  if (allowed) return children;

  return (
    <main className="texture-grit flex min-h-dvh items-center justify-center px-4 py-10">
      <Panel className="w-full max-w-xl text-center">
        <p className="font-display text-sm uppercase tracking-[0.28em] text-ember">18 Gate</p>
        <h1 className="mt-4 font-display text-5xl uppercase leading-none sm:text-6xl">{site.name}</h1>
        <p className="mt-5 text-base text-muted sm:text-lg">
          Adult-only ecosystem. Confirm you are 18 or over to continue.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            onClick={() => {
              sessionStorage.setItem(STORAGE_KEY, "1");
              setAllowed(true);
            }}
          >
            I am 18+ Enter
          </Button>
          <a
            href="https://www.google.com"
            className="inline-flex min-h-touch items-center justify-center rounded-xl border-3 border-line px-6 py-4 font-display uppercase tracking-[0.08em]"
          >
            Leave
          </a>
        </div>
        <p className="mt-6 text-xs text-muted">18+ only. Responsible information only. No medical claims.</p>
      </Panel>
    </main>
  );
}
