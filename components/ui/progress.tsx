interface ProgressProps {
  label: string;
  value: number;
  max: number;
}

export function Progress({ label, max, value }: ProgressProps) {
  const safeMax = Math.max(max, 1);
  const safeValue = Math.min(Math.max(value, 0), safeMax);
  const percentage = (safeValue / safeMax) * 100;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.12em]">
        <span className="text-secondary">{label}</span>
        <span className="text-gold-soft">
          {safeValue.toLocaleString()} / {safeMax.toLocaleString()}
        </span>
      </div>
      <div
        aria-label={`${label}: ${Math.round(percentage)}%`}
        aria-valuemax={safeMax}
        aria-valuemin={0}
        aria-valuenow={safeValue}
        className="h-4 overflow-hidden rounded-full border-2 border-ink bg-canvas shadow-[inset_0_0_0_1px_var(--color-line)]"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-gold"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
