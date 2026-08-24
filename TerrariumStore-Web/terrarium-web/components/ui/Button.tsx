import { clsx } from "clsx";
import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "whatsapp";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  href?: string;
  as?: "button" | "a";
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[var(--color-lime)] text-white hover:brightness-110 active:brightness-95 shadow-sm",
  secondary:
    "bg-transparent border border-[var(--color-line)] text-[var(--color-ink)] hover:bg-[var(--color-lime-soft)] hover:border-[var(--color-lime)]",
  ghost:
    "bg-transparent text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] hover:bg-[var(--color-line)]",
  danger:
    "bg-[var(--color-vet)] text-white hover:brightness-110 active:brightness-95",
  whatsapp:
    "bg-[#25D366] text-white hover:brightness-110 active:brightness-95 shadow-sm",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-xs px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2 gap-2",
  lg: "text-base px-6 py-3 gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  href,
  as: Tag = "button",
  ...props
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center font-body font-semibold",
    "rounded-[var(--radius-sm)] transition-all duration-150 cursor-pointer",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-lime)]",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button {...props} disabled={disabled || loading} className={classes}>
      {loading && (
        <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
