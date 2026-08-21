"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { GoldFrame } from "@/components/ui/Panel";

const KEY = "dcbdAgeOk";

export function AgeGate({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    setAllowed(localStorage.getItem(KEY) === "yes");
  }, []);

  if (allowed === null) {
    return <div className="min-h-screen bg-void" />;
  }

  if (!allowed) {
    return (
      <main className="relative z-10 grid min-h-screen place-items-center px-4 py-10">
        <GoldFrame className="w-full max-w-2xl text-center drip-edge">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-green-neon">18 Gate • Respect the cycle</p>
          <h1 className="graffiti mt-5 text-5xl sm:text-7xl">Da Cofeez Dank</h1>
          <p className="mt-6 text-muted">Adult-only DCBD universe. Enter only if you are 18 or over.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              variant="pink"
              onClick={() => {
                localStorage.setItem(KEY, "yes");
                setAllowed(true);
              }}
            >
              I am 18+ • Enter
            </Button>
            <a href="https://www.google.com" className="inline-flex min-h-touch items-center justify-center rounded-xl border border-white/20 px-6 py-3 font-black uppercase">
              Leave
            </a>
          </div>
          <p className="mt-6 text-xs text-muted">18+ only. Educational product information. No medical claims.</p>
        </GoldFrame>
      </main>
    );
  }

  return <>{children}</>;
}
