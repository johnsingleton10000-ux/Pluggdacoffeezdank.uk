import { ECOSYSTEM_LOOP } from "@/config/ecosystem";

export function EcosystemLoop() {
  return (
    <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {ECOSYSTEM_LOOP.map((step, index) => (
        <li
          key={step}
          className="min-h-16 rounded-[var(--radius-control)] border-2 border-[var(--color-line)] bg-[var(--color-matte-black)] px-3 py-3"
        >
          <span className="block font-mono text-xs text-[var(--color-gold)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="mt-1 block text-sm font-bold uppercase tracking-wide">{step}</span>
        </li>
      ))}
    </ol>
  );
}
