import type { InputHTMLAttributes } from "react";

import { classNames } from "@/utils/styles";

interface FormFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  readonly id: string;
  readonly label: string;
  readonly hint?: string;
  readonly error?: string;
}

export function FormField({
  className,
  error,
  hint,
  id,
  label,
  ...props
}: FormFieldProps) {
  const descriptionId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={classNames("grid gap-2", className)}>
      <label
        className="text-sm font-black uppercase tracking-[0.1em] text-white"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        aria-describedby={descriptionId}
        aria-invalid={Boolean(error)}
        className="min-h-12 rounded-md border-2 border-line bg-ink px-4 text-base text-white outline-none transition focus:border-purple-300 focus:ring-2 focus:ring-purple-300/30"
        id={id}
        {...props}
      />
      {error ? (
        <p className="text-sm text-orange-soft" id={`${id}-error`}>
          {error}
        </p>
      ) : hint ? (
        <p className="text-sm text-text-muted" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
