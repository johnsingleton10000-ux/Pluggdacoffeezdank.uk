import { Panel } from "@/components/ui/Panel";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <Panel>
        <p className="font-display text-2xl uppercase">Loading…</p>
        <p className="mt-2 text-muted">Fetching the next DCBD view.</p>
      </Panel>
    </main>
  );
}
