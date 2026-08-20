"use client";

import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <Panel>
        <p className="font-display text-sm uppercase tracking-[0.2em] text-ember">Error</p>
        <h1 className="mt-3 font-display text-3xl uppercase">Something broke</h1>
        <p className="mt-4 text-muted">{error.message || "An unexpected error occurred."}</p>
        <div className="mt-6">
          <Button onClick={reset}>Try again</Button>
        </div>
      </Panel>
    </main>
  );
}
