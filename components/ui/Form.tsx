import { cn } from "@/utils/cn";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
}

export function FormField({ label, htmlFor, hint, children }: FormFieldProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={htmlFor} className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--color-gold)]">
        {label}
      </label>
      {children}
      {hint ? <p className="text-sm text-[var(--color-text-muted)]">{hint}</p> : null}
    </div>
  );
}

const controlClass =
  "min-h-12 w-full rounded-[var(--radius-control)] border-2 border-[var(--color-line)] bg-[var(--color-matte-black)] px-4 text-base text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClass, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(controlClass, "min-h-32 py-3", className)} {...props} />;
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(controlClass, className)} {...props} />;
}
