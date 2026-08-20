interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
}

export function ProgressBar({ value, max = 100, label }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="dcbd-progress-wrap">
      {label ? <span className="dcbd-progress-label">{label}</span> : null}
      <div
        className="dcbd-progress"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
      >
        <span style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
