interface EmptyStateProps {
  title: string;
  body: string;
}

export function EmptyState({ title, body }: EmptyStateProps) {
  return (
    <div className="rounded-[var(--radius-panel)] border-2 border-dashed border-[var(--color-line)] p-6 text-center">
      <h2 className="display text-3xl text-[var(--color-gold)]">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-[var(--color-text-muted)]">{body}</p>
    </div>
  );
}

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex min-h-32 items-center justify-center" role="status" aria-live="polite">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">{label}…</p>
    </div>
  );
}
