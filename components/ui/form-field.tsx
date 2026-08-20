import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: string;
}

export function FormField({
  className,
  error,
  id,
  label,
  ...props
}: FormFieldProps) {
  const inputId = id ?? props.name;
  const errorId = error && inputId ? `${inputId}-error` : undefined;

  return (
    <label className="grid gap-2 text-sm font-bold text-primary" htmlFor={inputId}>
      {label}
      <input
        aria-describedby={errorId}
        aria-invalid={Boolean(error)}
        className={cn(
          "min-h-12 rounded-xl border-2 border-line-strong bg-canvas px-4 text-base text-primary outline-none transition-colors placeholder:text-secondary/70 focus:border-purple-bright focus:ring-2 focus:ring-purple-muted",
          error && "border-orange",
          className,
        )}
        id={inputId}
        {...props}
      />
      {error ? (
        <span className="text-xs font-semibold text-orange-soft" id={errorId}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
