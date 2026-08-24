import { Package, Calendar, BookOpen, TrendingUp } from "lucide-react";

const STATS = [
  { label: "Animales activos", value: "24", icon: Package, color: "var(--color-bamboo)", bg: "var(--color-bamboo-soft)" },
  { label: "Citas pendientes", value: "7", icon: Calendar, color: "var(--color-vet)", bg: "var(--color-vet-soft)" },
  { label: "Casos publicados", value: "12", icon: BookOpen, color: "var(--color-lime)", bg: "var(--color-lime-soft)" },
  { label: "WhatsApp generados", value: "—", icon: TrendingUp, color: "var(--color-ink-soft)", bg: "var(--color-line)", note: "Fase 3" },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-[var(--color-ink)] mb-1">Dashboard</h1>
      <p className="text-sm text-[var(--color-ink-soft)] mb-8">Resumen del estado de Terrarium Store.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {STATS.map((s) => (
          <div key={s.label}
               className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-[var(--radius-sm)] flex items-center justify-center"
                   style={{ background: s.bg }}>
                <s.icon size={18} color={s.color} />
              </div>
              {s.note && (
                <span className="text-[9px] font-mono text-[var(--color-ink-soft)] bg-[var(--color-line)] px-1.5 py-0.5 rounded-full">
                  {s.note}
                </span>
              )}
            </div>
            <p className="font-display text-3xl text-[var(--color-ink)]">{s.value}</p>
            <p className="text-xs text-[var(--color-ink-soft)] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Accesos rápidos */}
      <h2 className="font-display text-lg text-[var(--color-ink)] mb-4">Accesos rápidos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { href: "/admin/catalogo/nuevo", label: "Agregar animal", variant: "bamboo" },
          { href: "/admin/citas", label: "Ver citas pendientes", variant: "red" },
          { href: "/admin/casos-clinicos/nuevo", label: "Publicar caso clínico", variant: "lime" },
        ].map((btn) => (
          <a key={btn.href} href={btn.href}
             className={`block text-center py-3 px-4 rounded-[var(--radius-sm)] text-sm font-body font-semibold transition-opacity hover:opacity-90 ${
               btn.variant === "bamboo"
                 ? "bg-[var(--color-bamboo-soft)] text-[var(--color-bamboo)] border border-[var(--color-bamboo)]"
                 : btn.variant === "red"
                 ? "bg-[var(--color-vet-soft)] text-[var(--color-vet)] border border-[var(--color-vet)]"
                 : "bg-[var(--color-lime-soft)] text-[var(--color-lime)] border border-[var(--color-lime)]"
             }`}
          >
            {btn.label}
          </a>
        ))}
      </div>
    </div>
  );
}
