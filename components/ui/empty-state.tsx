import type { ReactNode } from "react";

interface EmptyStateProps {
  action?: ReactNode;
  description: string;
  title: string;
}

export function EmptyState({
  action,
  description,
  title,
}: EmptyStateProps) {
  return (
    <section className="rounded-2xl border-2 border-dashed border-line-strong bg-surface-subtle p-7 text-center">
      <span aria-hidden="true" className="font-display text-4xl text-purple-soft">
        ◇
      </span>
      <h2 className="mt-3 font-display text-2xl uppercase text-primary">
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-secondary">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </section>
  );
}
