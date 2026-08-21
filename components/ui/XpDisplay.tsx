export function XpDisplay({ current, label = "XP" }: { current: number; label?: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-purple-neon/40 bg-black/50 px-4 py-2">
      <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-purple-neon">{label}</span>
      <strong className="font-display text-2xl text-cream">{current}</strong>
    </div>
  );
}
