import { Panel } from "@/components/ui/Panel";

export function StorySection() {
  return (
    <section id="story" className="px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <Panel>
          <p className="font-display text-sm uppercase tracking-[0.2em] text-gold">Founder story</p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl">CastroPlugger</h2>
          <p className="mt-5 text-muted">
            Born from real life, long nights and the drive to build something different — not another faceless shop.
          </p>
        </Panel>
        <div className="flex flex-col justify-center">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-gold">The original route</p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl">
            From story to card to community
          </h2>
          <p className="mt-5 text-muted">
            Shop, forum and Flip are not separate websites. They share one player, one ledger and one collection.
          </p>
        </div>
      </div>
    </section>
  );
}
