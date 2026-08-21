export function Crown({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path d="M8 44 L16 18 L32 34 L48 14 L56 44 Z" fill="#ff3fbc" stroke="#f1be48" strokeWidth="2" />
      <rect x="10" y="44" width="44" height="8" rx="2" fill="#f1be48" />
    </svg>
  );
}

export function InfinityMark({ className = "h-8 w-10 text-purple-neon" }: { className?: string }) {
  return (
    <span className={`font-estate text-3xl ${className}`} aria-hidden>
      ∞
    </span>
  );
}

export function WaxSeal() {
  return (
    <div className="relative h-16 w-16 shrink-0">
      <div className="absolute inset-0 rounded-full bg-[#8b1e1e] shadow-[0_0_18px_rgba(196,69,60,.55)]" />
      <div className="absolute inset-2 rounded-full border border-gold/70 grid place-items-center font-estate text-gold">∞</div>
      <div className="absolute left-5 top-14 h-10 w-2 rounded-full bg-[#5a1010]" />
    </div>
  );
}

export function HoodSilhouette({ className = "h-16 w-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 64" className={className} aria-hidden>
      <path d="M8 60 C8 28 14 8 24 8 C34 8 40 28 40 60 Z" fill="#09090b" stroke="#c26bff" strokeWidth="1.5" />
      <circle cx="18" cy="30" r="2.2" fill="#c26bff" />
      <circle cx="30" cy="30" r="2.2" fill="#c26bff" />
    </svg>
  );
}
