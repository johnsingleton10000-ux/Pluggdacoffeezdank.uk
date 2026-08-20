const loopSteps = [
  "Blood Test",
  "Player Profile",
  "Avatar",
  "Starter Deck",
  "Membership",
  "XP",
  "Commerce",
  "Card Rewards",
  "Collection",
  "Trading",
  "Community",
  "Flip",
  "Progression",
] as const;

export function EcosystemLoop() {
  return (
    <section
      aria-labelledby="ecosystem-title"
      className="border-b-2 border-line bg-surface-subtle py-16 sm:py-20"
    >
      <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow">Connected by design</p>
            <h2
              className="mt-3 max-w-3xl font-display text-4xl uppercase leading-[0.9] text-primary sm:text-6xl"
              id="ecosystem-title"
            >
              Every system feeds the next
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-secondary md:text-right">
            Shared IDs, traceable events and server-owned state keep the shop,
            community and game inside one player journey.
          </p>
        </div>

        <ol className="mt-10 flex snap-x gap-3 overflow-x-auto pb-5 scrollbar-thin md:grid md:grid-cols-4 md:overflow-visible xl:grid-cols-7">
          {loopSteps.map((step, index) => (
            <li
              className="group relative flex min-h-32 min-w-36 snap-start flex-col justify-between rounded-xl border-2 border-line bg-canvas p-4 shadow-[4px_4px_0_var(--color-ink)] transition-colors hover:border-purple-muted"
              key={step}
            >
              <span className="font-display text-2xl text-purple-soft">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-black uppercase leading-4 tracking-[0.08em] text-primary">
                {step}
              </span>
              <span
                aria-hidden="true"
                className="absolute -right-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-gold bg-surface-subtle md:block md:[&:nth-child(4n)]:hidden xl:[&:nth-child(4n)]:block xl:[&:nth-child(7n)]:hidden"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
