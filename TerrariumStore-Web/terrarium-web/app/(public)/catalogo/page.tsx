"use client";

import { Suspense } from "react";
import { FilterBar } from "@/components/catalog/FilterBar";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { useSearchParams } from "next/navigation";

function CatalogoContent() {
  const params = useSearchParams();
  const filters = {
    category: params.get("category") ?? undefined,
    care_level: (params.get("care_level") as "básico" | "intermedio" | "avanzado") ?? undefined,
    in_stock: params.get("in_stock") === "true" ? true : undefined,
    search: params.get("search") ?? undefined,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-[2px] text-[var(--color-bamboo)]">
          Tienda
        </span>
        <h1 className="font-display text-3xl text-[var(--color-ink)] mt-1">Catálogo de animales</h1>
        <p className="text-sm text-[var(--color-ink-soft)] mt-1">
          Reptiles y exóticos disponibles — todos sanos y aclimatados.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filtros */}
        <aside className="lg:w-56 shrink-0">
          <FilterBar />
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <ProductGrid filters={filters} />
        </div>
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense>
      <CatalogoContent />
    </Suspense>
  );
}
