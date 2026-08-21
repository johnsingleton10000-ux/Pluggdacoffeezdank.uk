import { ECOSYSTEM_LOOP } from "@/config/ecosystem";

export function EcosystemLoop() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {ECOSYSTEM_LOOP.map((step, index) => (
        <li key={step} className="rounded-2xl border border-purple-neon/30 bg-black/50 p-4">
          <span className="text-xs font-black text-gold">{String(index + 1).padStart(2, "0")}</span>
          <p className="mt-2 font-display text-2xl uppercase">{step}</p>
        </li>
      ))}
    </ol>
  );
}
