"use client";

import Link from "next/link";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";
import { useAnimals } from "@/hooks/useCatalog";
import { Button } from "@/components/ui/Button";
import { StockBadge, CareLevelBadge } from "@/components/ui/Badge";

export default function AdminCatalogoPage() {
  const { data: animals = [], isLoading } = useAnimals();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-[var(--color-ink)]">Catálogo</h1>
          <p className="text-sm text-[var(--color-ink-soft)]">Gestión de animales y productos</p>
        </div>
        <Button variant="primary" size="md" href="/admin/catalogo/nuevo" as="a">
          <Plus size={16} />
          Agregar animal
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-[var(--color-ink-soft)]">Cargando...</div>
      ) : (
        <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-line)] bg-[var(--color-page)]">
                <th className="text-left px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-soft)]">Animal</th>
                <th className="text-left px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-soft)]">Nivel</th>
                <th className="text-left px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-soft)]">Precio</th>
                <th className="text-left px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-soft)]">Stock</th>
                <th className="text-left px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-soft)]">Estado</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-line)]">
              {animals.map((a) => (
                <tr key={a.id} className="hover:bg-[var(--color-page)] transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-[var(--color-ink)]">{a.name}</p>
                    <p className="scientific-name text-xs text-[var(--color-ink-soft)]">{a.scientific_name}</p>
                  </td>
                  <td className="px-4 py-3"><CareLevelBadge level={a.care_level} /></td>
                  <td className="px-4 py-3 font-mono font-semibold text-[var(--color-lime)]">
                    ${a.price.toLocaleString("es-MX")}
                  </td>
                  <td className="px-4 py-3"><StockBadge stock={a.stock} /></td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-mono ${a.is_active ? "text-[var(--color-lime)]" : "text-[var(--color-ink-soft)]"}`}>
                      {a.is_active ? "Activo" : "Oculto"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <Link href={`/admin/catalogo/${a.id}/editar`}
                            className="p-1.5 rounded hover:bg-[var(--color-line)] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
                            title="Editar">
                        <Pencil size={14} />
                      </Link>
                      <button className="p-1.5 rounded hover:bg-[var(--color-line)] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
                              title={a.is_active ? "Ocultar" : "Mostrar"}>
                        {a.is_active ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
