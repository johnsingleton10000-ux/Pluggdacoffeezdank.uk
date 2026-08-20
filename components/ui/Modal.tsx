"use client";

import { cn } from "@/utils/cn";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/75"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dcbd-modal-title"
        className={cn(
          "relative z-10 w-full max-w-lg rounded-[var(--radius-panel)] border-2 border-[var(--color-line)] bg-[var(--color-panel)] p-5 shadow-panel sm:p-7",
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id="dcbd-modal-title" className="display text-3xl">
            {title}
          </h2>
          <Button type="button" variant="ghost" size="md" onClick={onClose}>
            Close
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
