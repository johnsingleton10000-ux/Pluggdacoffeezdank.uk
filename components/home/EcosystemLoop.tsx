import { ECOSYSTEM_LOOP } from "@/lib/config/ecosystem";
import { Panel } from "@/components/ui/Panel";

export function EcosystemLoop() {
  return (
    <section id="loop" className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-sm uppercase tracking-[0.2em] text-gold">Core loop</p>
        <h2 className="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl">One ecosystem</h2>
        <p className="mt-4 max-w-2xl text-muted">
          Systems are wired as relationships now. Rewards, questions, avatars and game rules are not invented in this foundation.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {ECOSYSTEM_LOOP.map((step, index) => (
            <Panel key={step} className="min-h-[7rem]">
              <p className="font-mono text-sm text-gold">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-2 font-display text-xl uppercase leading-tight">{step}</p>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}
