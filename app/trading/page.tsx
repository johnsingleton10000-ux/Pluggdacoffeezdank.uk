"use client";

import { GoldFrame } from "@/components/ui/Panel";

export default function TradingPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="display text-6xl">Trading</h1>
      <p className="mt-4 text-muted">
        Player-to-player trades are a state machine: proposed → accepted / declined / cancelled → completed. The frontend can display a trade. It cannot decide ownership.
      </p>
      <GoldFrame className="mt-8">
        <ol className="space-y-3 text-sm">
          <li>1. Offer cards from your collection</li>
          <li>2. Counter or reject</li>
          <li>3. Both confirm</li>
          <li>4. Server moves ownership</li>
        </ol>
        <p className="mt-6 text-xs uppercase tracking-[0.16em] text-gold">XP half-leverage if a deal collapses — configured in the XP table, not in this page.</p>
      </GoldFrame>
    </main>
  );
}
