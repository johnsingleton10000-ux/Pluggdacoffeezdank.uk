"use client";

import { useEffect, useRef, type PropsWithChildren } from "react";

import { Button } from "@/components/ui/button";

interface ModalProps extends PropsWithChildren {
  readonly open: boolean;
  readonly title: string;
  readonly onClose: () => void;
}

export function Modal({ children, onClose, open, title }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      aria-labelledby="modal-title"
      className="m-auto w-[min(34rem,calc(100%-2rem))] rounded-lg border-2 border-purple-300 bg-surface p-0 text-text shadow-hard backdrop:bg-black/75"
      onCancel={onClose}
      onClose={onClose}
      ref={dialogRef}
    >
      <div className="border-b-2 border-line p-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl text-white" id="modal-title">
            {title}
          </h2>
          <Button aria-label="Close dialog" onClick={onClose} variant="quiet">
            Close
          </Button>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </dialog>
  );
}
