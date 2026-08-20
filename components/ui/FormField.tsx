import { cn } from "@/lib/utils/cn";
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

type FieldProps = {
  label: string;
  hint?: string;
  children: ReactNode;
};

export function FormField({ label, hint, children }: FieldProps) {
  return (
    <label className="block space-y-2">
      <span className="block font-display text-sm uppercase tracking-[0.16em] text-gold">{label}</span>
      {children}
      {hint ? <span className="block text-sm text-muted">{hint}</span> : null}
    </label>
  );
}

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-touch w-full rounded-xl border-3 border-ink bg-ink px-4 text-cream placeholder:text-muted",
        className,
      )}
      {...props}
    />
  );
}

export function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-xl border-3 border-ink bg-ink px-4 py-3 text-cream placeholder:text-muted",
        className,
      )}
      {...props}
    />
  );
}
