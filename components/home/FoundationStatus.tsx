import { isSupabaseConfigured } from "@/lib/config/env";
import { Panel } from "@/components/ui/Panel";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { RarityLegend } from "@/components/ui/RarityIndicator";
import { XpDisplay } from "@/components/ui/XpDisplay";

export function FoundationStatus() {
  const supabaseReady = isSupabaseConfigured();

  return (
    <section className="px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-2">
        <Panel>
          <p className="font-display text-sm uppercase tracking-[0.2em] text-gold">Foundation status</p>
          <h2 className="mt-3 font-display text-3xl uppercase">Ready for section-by-section builds</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <StatusIndicator label="Design system and navigation" tone="live" />
            </li>
            <li>
              <StatusIndicator label="Domain architecture in /domains" tone="live" />
            </li>
            <li>
              <StatusIndicator
                label={supabaseReady ? "Supabase keys detected" : "Supabase not configured yet"}
                tone={supabaseReady ? "live" : "later"}
              />
            </li>
            <li>
              <StatusIndicator label="Shop, Blood Test, Flip, trading and AI provider" tone="later" />
            </li>
          </ul>
        </Panel>
        <Panel>
          <p className="font-display text-sm uppercase tracking-[0.2em] text-gold">Reusable tokens</p>
          <div className="mt-5">
            <XpDisplay currentXp={0} earnedXp={0} spentXp={0} />
          </div>
          <div className="mt-5">
            <RarityLegend />
          </div>
        </Panel>
      </div>
    </section>
  );
}
