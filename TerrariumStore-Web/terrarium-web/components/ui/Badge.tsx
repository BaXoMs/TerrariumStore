import { clsx } from "clsx";

type BadgeVariant = "lime" | "bamboo" | "red" | "neutral";

const variantStyles: Record<BadgeVariant, string> = {
  lime:    "bg-[var(--color-lime-soft)]    text-[var(--color-lime)]    border border-[var(--color-lime)]",
  bamboo:  "bg-[var(--color-bamboo-soft)]  text-[var(--color-bamboo)]  border border-[var(--color-bamboo)]",
  red:     "bg-[var(--color-vet-soft)]     text-[var(--color-vet)]     border border-[var(--color-vet)]",
  neutral: "bg-[var(--color-line)]         text-[var(--color-ink-soft)] border border-transparent",
};

const careLevelMap: Record<string, BadgeVariant> = {
  básico: "lime",
  intermedio: "bamboo",
  avanzado: "red",
};

interface BadgeProps {
  variant?: BadgeVariant;
  careLevel?: "básico" | "intermedio" | "avanzado";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant, careLevel, children, className }: BadgeProps) {
  const resolvedVariant: BadgeVariant =
    careLevel ? careLevelMap[careLevel] : (variant ?? "neutral");

  return (
    <span
      className={clsx(
        "inline-block text-[11px] font-mono font-semibold uppercase tracking-widest",
        "px-2 py-0.5 rounded-full whitespace-nowrap",
        variantStyles[resolvedVariant],
        className
      )}
    >
      {children}
    </span>
  );
}

/** Badge rápido para nivel de cuidado */
export function CareLevelBadge({ level }: { level: "básico" | "intermedio" | "avanzado" }) {
  return <Badge careLevel={level}>{level}</Badge>;
}

/** Badge de stock */
export function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) return <Badge variant="red">Agotado</Badge>;
  if (stock <= 2) return <Badge variant="bamboo">Últimas unidades</Badge>;
  return <Badge variant="lime">Disponible</Badge>;
}
