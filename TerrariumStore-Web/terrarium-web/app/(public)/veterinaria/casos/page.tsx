import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ClinicalStampBadge } from "@/components/ui/ClinicalStampBadge";

export const metadata: Metadata = {
  title: "Casos Clínicos — Blog Veterinario | Terrarium Store",
  description: "Casos clínicos documentados de reptiles y animales exóticos. Diagnóstico, tratamiento y seguimiento con referencias bibliográficas.",
};

const CASES = [
  {
    slug: "mbd-pogona", title: "Metabolic Bone Disease en Pogona vitticeps",
    species: "Dragón Barbudo", scientific: "Pogona vitticeps",
    summary: "Caso documentado de MBD secundaria a deficiencia de UVB en ejemplar juvenil de 8 meses. Diagnóstico clínico y radiológico, tratamiento con calcio, vitamina D3 y corrección del enclosure.",
    source: "Manual MSD Veterinary, 2022", date: "Agosto 2025", tags: ["nutrición", "pogona", "MBD"],
  },
  {
    slug: "crypto-gecko", title: "Criptosporidiosis en Eublepharis macularius",
    species: "Gecko Leopardo", scientific: "Eublepharis macularius",
    summary: "Identificación de Cryptosporidium varanii mediante PCR fecal en ejemplar adulto con pérdida de peso progresiva y anorexia. Manejo paliativo y medidas de bioseguridad para colecciones.",
    source: "Frye FL, Reptile Clinician's Handbook", date: "Julio 2025", tags: ["parásitos", "gecko", "bioseguridad"],
  },
  {
    slug: "vit-a-quelonios", title: "Deficiencia de Vitamina A en quelonios acuáticos",
    species: "Tortuga de agua", scientific: "Trachemys scripta",
    summary: "Hipovitaminosis A manifestada como blefaroedema bilateral y apatía en tortuga de orejas rojas. Corrección dietética y suplementación con vitamina A palmitato.",
    source: "Reptile Medicine and Surgery, Mader DR", date: "Julio 2025", tags: ["vitaminas", "tortuga", "nutrición"],
  },
  {
    slug: "stomatitis-boa", title: "Estomatitis infecciosa en Boa constrictor",
    species: "Boa Constrictor", scientific: "Boa constrictor",
    summary: "Estomatitis ulcerativa severa con cultivo positivo a Pseudomonas aeruginosa. Tratamiento antibiótico sistémico y local, manejo del dolor y corrección de factores predisponentes.",
    source: "Infectious Diseases and Pathology of Reptiles, Jacobson ER", date: "Junio 2025", tags: ["infeccioso", "boa", "boca"],
  },
];

export default function CasosPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <span className="text-[11px] font-mono font-semibold uppercase tracking-[2px] text-[var(--color-vet)]">
        Veterinaria · Blog Clínico
      </span>
      <h1 className="font-display text-3xl text-[var(--color-ink)] mt-2 mb-1">Casos clínicos</h1>
      <p className="text-sm text-[var(--color-ink-soft)] mb-10 max-w-xl">
        Documentación de casos reales con diagnóstico diferencial, tratamiento y seguimiento.
        Todas las referencias bibliográficas incluidas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CASES.map((c) => (
          <Link key={c.slug} href={`/veterinaria/casos/${c.slug}`}
                className="group bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] p-6 hover:shadow-md transition-shadow flex gap-5">
            <ClinicalStampBadge size="md" className="shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono text-[var(--color-vet)] uppercase tracking-wider mb-0.5">
                {c.species}
              </p>
              <p className="scientific-name text-xs text-[var(--color-ink-soft)] mb-2">{c.scientific}</p>
              <h2 className="font-display text-[15px] text-[var(--color-ink)] leading-snug group-hover:text-[var(--color-vet)] transition-colors mb-2">
                {c.title}
              </h2>
              <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed line-clamp-3 mb-3">
                {c.summary}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {c.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono text-[var(--color-ink-soft)] bg-[var(--color-line)] px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-[var(--color-ink-soft)] shrink-0 ml-2">{c.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
