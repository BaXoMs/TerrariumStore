"use client";

import { clsx } from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useCategories } from "@/hooks/useCatalog";

const CARE_LEVELS = [
  { value: "básico", label: "Básico" },
  { value: "intermedio", label: "Intermedio" },
  { value: "avanzado", label: "Avanzado" },
] as const;

export function FilterBar() {
  const router = useRouter();
  const params = useSearchParams();
  const { data: categories = [] } = useCategories();

  const activeCategory = params.get("category") ?? "";
  const activeCareLevel = params.get("care_level") ?? "";
  const inStock = params.get("in_stock") === "true";

  function setFilter(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page"); // reset paginación
    router.push(`?${next.toString()}`, { scroll: false });
  }

  function toggleStock() {
    setFilter("in_stock", inStock ? null : "true");
  }

  const animalCategories = categories.filter((c) => c.type === "animal");

  return (
    <div className="flex flex-col gap-4">
      {/* Categorías */}
      <div>
        <p className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[var(--color-ink-soft)] mb-2">
          Categoría
        </p>
        <div className="flex flex-wrap gap-2">
          <Pill active={!activeCategory} onClick={() => setFilter("category", null)}>
            Todos
          </Pill>
          {animalCategories.map((cat) => (
            <Pill
              key={cat.id}
              active={activeCategory === cat.id}
              onClick={() => setFilter("category", cat.id)}
            >
              {cat.name}
            </Pill>
          ))}
        </div>
      </div>

      {/* Nivel de cuidado */}
      <div>
        <p className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[var(--color-ink-soft)] mb-2">
          Nivel de cuidado
        </p>
        <div className="flex flex-wrap gap-2">
          <Pill active={!activeCareLevel} onClick={() => setFilter("care_level", null)}>
            Todos
          </Pill>
          {CARE_LEVELS.map((l) => (
            <Pill
              key={l.value}
              active={activeCareLevel === l.value}
              onClick={() => setFilter("care_level", l.value)}
            >
              {l.label}
            </Pill>
          ))}
        </div>
      </div>

      {/* Toggle stock */}
      <label className="inline-flex items-center gap-2 cursor-pointer select-none">
        <div
          onClick={toggleStock}
          className={clsx(
            "relative w-9 h-5 rounded-full transition-colors duration-200 cursor-pointer",
            inStock ? "bg-[var(--color-lime)]" : "bg-[var(--color-line)]"
          )}
        >
          <span
            className={clsx(
              "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200",
              inStock ? "translate-x-4" : "translate-x-0.5"
            )}
          />
        </div>
        <span className="text-sm font-body text-[var(--color-ink-soft)]">
          Solo disponibles
        </span>
      </label>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-3 py-1 rounded-full text-sm font-body font-medium transition-colors duration-150 border",
        active
          ? "bg-[var(--color-lime)] text-white border-[var(--color-lime)]"
          : "bg-transparent text-[var(--color-ink-soft)] border-[var(--color-line)] hover:border-[var(--color-lime)] hover:text-[var(--color-lime)]"
      )}
    >
      {children}
    </button>
  );
}
