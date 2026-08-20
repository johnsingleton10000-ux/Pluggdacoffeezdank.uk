const ecosystemSteps = [
  "Blood Test",
  "Player Profile",
  "Avatar",
  "Starter Deck",
  "Membership",
  "XP",
  "Ecommerce",
  "Card Rewards",
  "Collection",
  "Trading",
  "Community",
  "Flip",
  "Progression",
] as const;

export function EcosystemLoop() {
  return (
    <ol
      aria-label="DCBD connected ecosystem loop"
      className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
    >
      {ecosystemSteps.map((step, index) => (
        <li
          className="flex min-h-16 items-center gap-3 rounded-md border border-line bg-surface-raised px-4 py-3"
          key={step}
        >
          <span className="font-display text-sm text-purple-300">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-bold text-white">{step}</span>
          <span
            aria-hidden="true"
            className="ml-auto text-text-subtle last:hidden"
          >
            →
          </span>
        </li>
      ))}
      <li className="flex min-h-16 items-center justify-center rounded-md border-2 border-gold bg-gold/10 px-4 py-3 font-black uppercase tracking-[0.12em] text-gold-soft">
        Loop again ↻
      </li>
    </ol>
  );
}
