"use client";

import { cn } from "@/lib/utils/cn";
import { useEffect } from "react";
import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ open, title, children, onClose }: ModalProps) {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-ink/80"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dcbd-modal-title"
        className={cn(
          "relative z-10 w-full max-w-lg rounded-[var(--radius-panel)] border-3 border-ink bg-panel p-5 shadow-stamp",
          "max-h-[85dvh] overflow-y-auto",
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id="dcbd-modal-title" className="font-display text-2xl uppercase tracking-wide">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-touch min-w-touch items-center justify-center rounded-xl border-3 border-ink bg-raised"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
