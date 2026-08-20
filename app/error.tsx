"use client";

import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="grid min-h-[70svh] place-items-center px-4 py-16">
      <section className="w-full max-w-xl rounded-2xl border-2 border-orange-muted bg-orange-wash p-6 text-center shadow-panel sm:p-8">
        <p className="eyebrow">System interruption</p>
        <h1 className="mt-4 font-display text-4xl uppercase text-primary">
          The connection dropped
        </h1>
        <p className="mt-4 text-sm leading-6 text-secondary">
          DCBD could not load this view. Your trusted account state has not been
          changed.
        </p>
        {error.digest ? (
          <p className="mt-3 text-xs text-secondary/70">
            Reference: {error.digest}
          </p>
        ) : null}
        <Button className="mt-7" onClick={reset}>
          Try again
        </Button>
      </section>
    </main>
  );
}
