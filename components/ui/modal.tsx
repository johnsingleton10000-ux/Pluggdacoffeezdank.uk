import type { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  description?: string;
  open: boolean;
  title: string;
}

export function Modal({
  children,
  description,
  open,
  title,
}: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      aria-label={title}
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-ink/85 p-4 backdrop-blur-sm"
      role="dialog"
    >
      <div className="w-full max-w-lg rounded-2xl border-2 border-line-strong bg-surface p-6 shadow-panel">
        <h2 className="font-display text-3xl uppercase text-primary">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-secondary">{description}</p>
        ) : null}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
