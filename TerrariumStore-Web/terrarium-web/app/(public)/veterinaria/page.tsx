import type { Metadata } from "next";
import Link from "next/link";
import { Stethoscope, Zap, Apple, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ClinicalStampBadge } from "@/components/ui/ClinicalStampBadge";

export const metadata: Metadata = {
  title: "Veterinaria Especializada en Exóticos | Terrarium Store",
  description: "Consultas, urgencias, nutrición y diagnóstico para reptiles y animales exóticos en Puebla. Agendar cita online.",
};

const SERVICES = [
  {
    icon: Stethoscope,
    title: "Consulta General",
    description: "Revisión completa, diagnóstico diferencial y plan terapéutico con referencias bibliográficas (Manual MSD Veterinary).",
    color: "var(--color-vet)",
    bg: "var(--color-vet-soft)",
  },
  {
    icon: Zap,
    title: "Urgencias",
    description: "Atención de emergencias en reptiles y exóticos. Contacta por WhatsApp para evaluación de urgencia.",
    color: "var(--color-bamboo)",
    bg: "var(--color-bamboo-soft)",
  },
  {
    icon: Apple,
    title: "Nutrición y Suplementación",
    description: "Planes dietéticos individualizados por especie, edad y condición clínica. Prevención de MBD y deficiencias.",
    color: "var(--color-lime)",
    bg: "var(--color-lime-soft)",
  },
  {
    icon: Search,
    title: "Diagnóstico por Imagen",
    description: "Radiografías para evaluación ósea, detección de huevos retenidos y cuerpos extraños.",
    color: "var(--color-vet)",
    bg: "var(--color-vet-soft)",
  },
];

const RECENT_CASES = [
  {
    slug: "mbd-pogona", title: "Metabolic Bone Disease en Pogona vitticeps",
    species: "Dragón Barbudo", scientific: "Pogona vitticeps",
    summary: "Caso documentado de MBD secundaria a deficiencia de UVB en ejemplar juvenil. Diagnóstico, tratamiento y seguimiento.",
    date: "Agosto 2025",
  },
  {
    slug: "crypto-gecko", title: "Criptosporidiosis en Eublepharis macularius",
    species: "Gecko Leopardo", scientific: "Eublepharis macularius",
    summary: "Identificación de Cryptosporidium varanii mediante PCR fecal. Manejo paliativo y medidas de bioseguridad.",
    date: "Julio 2025",
  },
  {
    slug: "vit-a-quelonios", title: "Deficiencia de Vitamina A en quelonios acuáticos",
    species: "Tortuga de agua", scientific: "Trachemys scripta",
    summary: "Hipovitaminosis A manifestada como blefaroedema bilateral. Corrección dietética y suplementación.",
    date: "Julio 2025",
  },
];

export default function VeterinariaPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--color-vet-soft)] border-b border-[var(--color-vet)]/20 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-[2px] text-[var(--color-vet)]">
            Veterinaria Especializada
          </span>
          <h1 className="font-display text-4xl text-[var(--color-ink)] mt-2 mb-3 max-w-xl">
            Atención veterinaria para reptiles y exóticos
          </h1>
          <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed max-w-lg mb-6">
            Diagnóstico, tratamiento y seguimiento con rigor científico. Citamos fuentes bibliográficas
            en cada caso clínico.
          </p>
          <Button variant="danger" size="lg" href="/veterinaria/agendar" as="a">
            <Stethoscope size={18} />
            Agendar cita ahora
          </Button>
        </div>
      </section>

      {/* Servicios */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="font-display text-2xl text-[var(--color-ink)] mb-8">Nuestros servicios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s) => (
            <div key={s.title}
                 className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] p-5">
              <div className="w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center mb-3"
                   style={{ background: s.bg }}>
                <s.icon size={20} color={s.color} />
              </div>
              <h3 className="font-display text-[15px] text-[var(--color-ink)] mb-2">{s.title}</h3>
              <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Casos clínicos recientes */}
      <section className="bg-[var(--color-page)] border-t border-[var(--color-line)]">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[2px] text-[var(--color-vet)]">
                Blog Clínico
              </span>
              <h2 className="font-display text-2xl text-[var(--color-ink)] mt-1">Casos clínicos documentados</h2>
            </div>
            <Link href="/veterinaria/casos"
                  className="text-sm font-body font-medium text-[var(--color-vet)] hover:underline flex items-center gap-1">
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RECENT_CASES.map((c) => (
              <Link key={c.slug} href={`/veterinaria/casos/${c.slug}`}
                    className="group bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-3">
                  <ClinicalStampBadge size="sm" className="shrink-0" />
                  <div>
                    <p className="text-[10px] font-mono text-[var(--color-vet)] uppercase tracking-wider">
                      {c.species}
                    </p>
                    <p className="scientific-name text-xs text-[var(--color-ink-soft)]">{c.scientific}</p>
                  </div>
                </div>
                <h3 className="font-display text-[14px] text-[var(--color-ink)] leading-snug group-hover:text-[var(--color-vet)] transition-colors mb-2">
                  {c.title}
                </h3>
                <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed line-clamp-3">
                  {c.summary}
                </p>
                <p className="text-[10px] font-mono text-[var(--color-ink-soft)] mt-3">{c.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
