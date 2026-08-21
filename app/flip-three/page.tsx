import { FlipTable } from "@/components/game/FlipTable";
import { CARD_LAYERS } from "@/config/ecosystem";

export default function FlipThreePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <FlipTable />
      <section className="mt-10 grid gap-3 sm:grid-cols-5">
        {CARD_LAYERS.map((layer) => (
          <div key={layer} className="rounded-xl border border-purple-neon/30 bg-black/40 p-4 text-center text-xs font-black uppercase tracking-[0.16em]">
            {layer}
          </div>
        ))}
      </section>
    </main>
  );
}
