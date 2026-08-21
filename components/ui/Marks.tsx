export function InfinityMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 32" className={className} aria-hidden>
      <path
        d="M16 16c0-6 5-10 10-10 8 0 12 10 22 10 5 0 10-4 10-10s-5-10-10-10c-10 0-14 10-22 10-5 0-10-4-10-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CrownMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 48" className={className} aria-hidden>
      <path d="M6 40h52L50 16 32 28 14 10 6 40z" fill="currentColor" />
      <rect x="8" y="40" width="48" height="6" rx="2" fill="currentColor" />
    </svg>
  );
}

export function VaultIcon({ name, className = "h-8 w-8" }: { name: string; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round" as const };
  if (name === "leaf") return <svg viewBox="0 0 32 32" className={className}><path d="M16 28c8-10 10-18 10-22-8 2-16 8-20 18 4 2 8 4 10 4z" {...common} /><path d="M16 28V12" {...common} /></svg>;
  if (name === "diamond" || name === "crystal") return <svg viewBox="0 0 32 32" className={className}><path d="M16 4 4 12l12 16 12-16L16 4z" {...common} /></svg>;
  if (name === "candy") return <svg viewBox="0 0 32 32" className={className}><rect x="8" y="10" width="16" height="12" rx="6" {...common} /><path d="M8 16H4m24 0h-4" {...common} /></svg>;
  if (name === "dropper") return <svg viewBox="0 0 32 32" className={className}><path d="M16 4v8m-4 4h8v12a4 4 0 0 1-8 0V16z" {...common} /></svg>;
  if (name === "cap") return <svg viewBox="0 0 32 32" className={className}><path d="M6 18c0-6 4-10 10-10s10 4 10 10H6zm20 0h4" {...common} /></svg>;
  if (name === "cup") return <svg viewBox="0 0 32 32" className={className}><path d="M8 10h14v10a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6V10zm14 2h4a3 3 0 0 1 0 6h-4" {...common} /></svg>;
  if (name === "crown") return <CrownMark className={className} />;
  if (name === "card") return <svg viewBox="0 0 32 32" className={className}><rect x="8" y="4" width="16" height="24" rx="2" {...common} /></svg>;
  return <svg viewBox="0 0 32 32" className={className}><path d="M16 4l3 9h9l-7 6 3 9-8-6-8 6 3-9-7-6h9z" {...common} /></svg>;
}
