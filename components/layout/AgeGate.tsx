"use client";

import { usePlayer } from "@/lib/state/player";
import { Button } from "@/components/ui/Button";

export function AgeGate() {
  const { state, ready, setAgeOk } = usePlayer();
  if (!ready || state.ageOk) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/95 p-5 grit-bg">
      <div className="gold-frame drip w-full max-w-xl rounded-3xl p-8 text-center">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-lime">18 Gate • Respect the cycle</p>
        <h1 className="graffiti-title mt-4 text-5xl sm:text-6xl">Da Cofeez Dank</h1>
        <p className="mt-4 text-muted">A product-first universe with Estate membership, collectible cards and Flip Three. Adults only.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="pink" onClick={setAgeOk}>I am 18+ • Enter</Button>
          <a className="btn btn-ghost" href="https://www.google.com">Leave</a>
        </div>
        <p className="mt-4 text-xs text-muted">Age restricted. Follow UK law. Product information must be verified before publishing.</p>
      </div>
    </div>
  );
}
