"use client";

import { Megaphone } from "lucide-react";

export default function PromocionesAdminPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-[var(--color-ink)] mb-1">Promociones</h1>
      <p className="text-sm text-[var(--color-ink-soft)] mb-6">Gestión de banners y ofertas</p>
      
      <div className="text-center py-16 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)]">
        <div className="w-16 h-16 bg-[var(--color-line)] rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--color-ink-soft)]">
          <Megaphone size={32} />
        </div>
        <h2 className="font-display text-xl text-[var(--color-ink)]">Módulo en construcción</h2>
        <p className="text-sm text-[var(--color-ink-soft)] mt-2">
          La gestión de promociones se implementará en la próxima fase.
        </p>
      </div>
    </div>
  );
}
