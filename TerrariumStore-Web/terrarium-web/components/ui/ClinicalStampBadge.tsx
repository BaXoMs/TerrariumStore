import { clsx } from "clsx";

interface ClinicalStampBadgeProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { outer: "w-16 h-16 text-[8px]", gap: "1px" },
  md: { outer: "w-24 h-24 text-[10px]", gap: "2px" },
  lg: { outer: "w-32 h-32 text-[11px]", gap: "2px" },
};

/**
 * Sello "Caso Clínico" — circular, rotado -14°, borde rojo.
 * Exclusivo para marcar contenido veterinario serio.
 */
export function ClinicalStampBadge({ size = "md", className }: ClinicalStampBadgeProps) {
  const s = sizeMap[size];
  return (
    <div
      className={clsx(
        "inline-flex flex-col items-center justify-center rounded-full",
        "border-2 border-[var(--color-vet)] bg-[var(--color-vet-soft)]",
        "text-[var(--color-vet)] font-mono font-semibold uppercase tracking-widest",
        "-rotate-[14deg] select-none shrink-0",
        s.outer,
        className
      )}
      aria-label="Caso Clínico"
    >
      <span className="leading-tight text-center px-1">
        CASO
        <br />
        CLÍNICO
      </span>
    </div>
  );
}
