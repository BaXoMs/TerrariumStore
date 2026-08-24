import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ClinicalStampBadge } from "@/components/ui/ClinicalStampBadge";

const CASES = [
  { id: "1", slug: "mbd-pogona", title: "Metabolic Bone Disease en Pogona vitticeps", species: "Dragón Barbudo", date: "Agosto 2025", published: true },
  { id: "2", slug: "crypto-gecko", title: "Criptosporidiosis en Eublepharis macularius", species: "Gecko Leopardo", date: "Julio 2025", published: true },
  { id: "3", slug: "vit-a-quelonios", title: "Deficiencia de Vitamina A en quelonios", species: "Tortuga", date: "Julio 2025", published: true },
  { id: "4", slug: "stomatitis-boa", title: "Estomatitis infecciosa en Boa constrictor", species: "Boa", date: "Junio 2025", published: false },
];

export default function AdminCasosPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-[var(--color-ink)]">Casos Clínicos</h1>
          <p className="text-sm text-[var(--color-ink-soft)]">Blog veterinario</p>
        </div>
        <Button variant="danger" size="md" href="/admin/casos-clinicos/nuevo" as="a">
          <Plus size={16} />
          Nuevo caso
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {CASES.map((c) => (
          <div key={c.id}
               className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] p-4 flex items-center gap-4">
            <ClinicalStampBadge size="sm" className="shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-[14px] text-[var(--color-ink)] truncate">{c.title}</h3>
              <p className="text-xs text-[var(--color-ink-soft)] mt-0.5">{c.species} · {c.date}</p>
            </div>
            <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full shrink-0 ${
              c.published ? "bg-[var(--color-lime-soft)] text-[var(--color-lime)]" : "bg-[var(--color-line)] text-[var(--color-ink-soft)]"
            }`}>
              {c.published ? "Publicado" : "Borrador"}
            </span>
            <div className="flex gap-1 shrink-0">
              <Link href={`/veterinaria/casos/${c.slug}`} target="_blank"
                    className="text-xs px-2 py-1 rounded border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-lime)] hover:text-[var(--color-lime)] transition-colors">
                Ver
              </Link>
              <Link href={`/admin/casos-clinicos/${c.id}/editar`}
                    className="text-xs px-2 py-1 rounded border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-bamboo)] hover:text-[var(--color-bamboo)] transition-colors">
                Editar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
