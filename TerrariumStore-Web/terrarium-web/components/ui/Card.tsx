import { clsx } from "clsx";
import React from "react";

interface CardProps {
  variant?: "default" | "bamboo" | "vet";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  hover?: boolean;
}

const variantStyles = {
  default: "border-[var(--color-line)]",
  bamboo:  "border-t-4 border-t-[var(--color-bamboo)] border-[var(--color-line)]",
  vet:     "border-t-4 border-t-[var(--color-vet)]     border-[var(--color-line)]",
};

export function Card({ variant = "default", className, children, onClick, hover = false }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "bg-[var(--color-paper)] border rounded-[var(--radius-md)] overflow-hidden",
        variantStyles[variant],
        hover && "transition-shadow duration-200 hover:shadow-md cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={clsx("p-4", className)}>{children}</div>;
}

export function CardFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={clsx("px-4 py-3 border-t border-[var(--color-line)]", className)}>
      {children}
    </div>
  );
}
