import { clsx } from "clsx";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-body font-medium text-[var(--color-ink)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "w-full px-3 py-2 rounded-[var(--radius-sm)] border text-sm font-body",
            "bg-[var(--color-paper)] text-[var(--color-ink)]",
            "placeholder:text-[var(--color-ink-soft)]",
            "transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-lime)] focus:border-transparent",
            error
              ? "border-[var(--color-error)]"
              : "border-[var(--color-line)] hover:border-[var(--color-ink-soft)]",
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs text-[var(--color-ink-soft)]">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-[var(--color-error)]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
