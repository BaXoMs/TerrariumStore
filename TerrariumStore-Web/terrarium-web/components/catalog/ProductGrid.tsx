"use client";

import { useAnimals, type CatalogFilters } from "@/hooks/useCatalog";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  filters?: CatalogFilters;
}

function SkeletonCard() {
  return (
    <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden">
      <div className="skeleton aspect-[4/3]" />
      <div className="p-4 flex flex-col gap-3">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-5/6 rounded" />
        <div className="flex items-center justify-between mt-2">
          <div className="skeleton h-5 w-20 rounded" />
          <div className="skeleton h-7 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({ filters = {} }: ProductGridProps) {
  const { data: animals = [], isLoading, error } = useAnimals(filters);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-[var(--color-ink-soft)]">
        <p>Hubo un error al cargar el catálogo. Intenta de nuevo.</p>
      </div>
    );
  }

  if (animals.length === 0) {
    return (
      <div className="text-center py-16 text-[var(--color-ink-soft)]">
        <p className="text-lg font-display">No se encontraron animales</p>
        <p className="text-sm mt-1">Intenta ajustar los filtros de búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {animals.map((animal) => (
        <ProductCard key={animal.id} animal={animal} />
      ))}
    </div>
  );
}
