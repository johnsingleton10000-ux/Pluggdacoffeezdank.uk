"use client";

import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";

interface ErrorPageProps {
  readonly reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="mx-auto flex min-h-[70svh] w-full max-w-3xl items-center px-4 py-16 sm:px-6">
      <Panel accent="orange" className="w-full text-center">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-soft">
          System interruption
        </p>
        <h1 className="mt-4 font-display text-4xl uppercase text-white">
          This screen could not load
        </h1>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-text-muted">
          Your account data has not been changed. Try loading the screen again.
        </p>
        <Button className="mt-7" onClick={reset}>
          Try again
        </Button>
      </Panel>
    </main>
  );
}
