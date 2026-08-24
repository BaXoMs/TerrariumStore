import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Stethoscope, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { whatsapp } from "@/lib/whatsapp";
import { ClinicalStampBadge } from "@/components/ui/ClinicalStampBadge";

export const metadata: Metadata = {
  title: "Terrarium Store — Reptiles & Veterinaria Especializada en Puebla",
  description:
    "Tienda especializada en reptiles y animales exóticos en Puebla. Dragones barbudos, geckos leopardo, crestados y más. Veterinaria especializada en exóticos.",
  openGraph: {
    title: "Terrarium Store",
    description: "Reptiles & Veterinaria Especializada en Puebla",
    images: [{ url: "/og-image.png" }],
  },
};

const FEATURED_ANIMALS = [
  { name: "Dragón Barbudo", scientific: "Pogona vitticeps", price: 1800, slug: "pogona-vitticeps", care: "Intermedio" },
  { name: "Gecko Leopardo", scientific: "Eublepharis macularius", price: 950, slug: "eublepharis-macularius", care: "Básico" },
  { name: "Gecko Crestado", scientific: "Correlophus ciliatus", price: 780, slug: "crested-gecko", care: "Básico" },
  { name: "Eslizón Lengua Azul", scientific: "Tiliqua scincoides", price: 2200, slug: "blue-tongue-skink", care: "Intermedio" },
];

const RECENT_CASES = [
  { title: "Metabolic Bone Disease en Pogona vitticeps", species: "Dragón Barbudo", slug: "mbd-pogona", date: "2025-08" },
  { title: "Criptosporidiosis en Eublepharis macularius", species: "Gecko Leopardo", slug: "crypto-gecko", date: "2025-07" },
  { title: "Deficiencia de Vitamina A en quelonios", species: "Tortuga", slug: "vit-a-quelonios", date: "2025-07" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative min-h-[75vh] flex items-center bg-[var(--color-ink)] overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-lime)] to-transparent" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[var(--color-bamboo)] blur-[120px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-[11px] font-mono font-semibold uppercase tracking-[2px] text-[var(--color-bamboo)] mb-4">
              Reptiles & Veterinaria · Puebla
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
              Tu tienda de<br />
              <span className="text-[var(--color-lime)]">animales exóticos</span><br />
              en Puebla
            </h1>
            <p className="text-[var(--color-ink-soft)] text-base leading-relaxed mb-8 max-w-md">
              Dragones barbudos, geckos leopardo, crestados y más — con asesoría veterinaria especializada incluida.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="lg" href="/catalogo" as="a">
                Ver catálogo
                <ArrowRight size={18} />
              </Button>
              <Button variant="secondary" size="lg" href="/veterinaria/agendar" as="a"
                      className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                Agendar cita
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="hidden md:grid grid-cols-2 gap-4">
            {[
              { number: "+50", label: "Especies disponibles" },
              { number: "8+", label: "Años de experiencia" },
              { number: "100%", label: "Animales sanos certificados" },
              { number: "24h", label: "Atención a urgencias" },
            ].map((s) => (
              <div key={s.label}
                   className="bg-white/5 border border-white/10 rounded-[var(--radius-md)] p-5 backdrop-blur-sm">
                <p className="font-display text-3xl text-[var(--color-lime)]">{s.number}</p>
                <p className="text-sm text-[var(--color-ink-soft)] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Catálogo destacado ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[2px] text-[var(--color-bamboo)]">
              Tienda
            </span>
            <h2 className="font-display text-2xl text-[var(--color-ink)] mt-1">
              Animales disponibles
            </h2>
          </div>
          <Link href="/catalogo"
                className="text-sm font-body font-medium text-[var(--color-lime)] hover:underline flex items-center gap-1">
            Ver todo <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED_ANIMALS.map((a) => (
            <Link key={a.slug} href={`/catalogo/${a.slug}`}
                  className="group bg-[var(--color-paper)] border border-t-4 border-t-[var(--color-bamboo)] border-[var(--color-line)] rounded-[var(--radius-md)] p-4 hover:shadow-md transition-shadow">
              <div className="bg-[var(--color-bamboo-soft)] rounded-[var(--radius-sm)] h-28 mb-3 flex items-center justify-center text-4xl">
                🦎
              </div>
              <h3 className="font-display text-[14px] text-[var(--color-ink)] group-hover:text-[var(--color-lime)] transition-colors">
                {a.name}
              </h3>
              <p className="scientific-name text-xs text-[var(--color-ink-soft)] mt-0.5">
                {a.scientific}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-mono font-semibold text-[var(--color-lime)] text-sm">
                  ${a.price.toLocaleString("es-MX")}
                </span>
                <span className="text-[10px] font-mono text-[var(--color-ink-soft)]">
                  {a.care}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Banner Veterinaria ── */}
      <section className="bg-[var(--color-vet-soft)] border-y border-[var(--color-vet)]/20">
        <div className="max-w-6xl mx-auto px-4 py-14 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[2px] text-[var(--color-vet)]">
              Veterinaria Especializada
            </span>
            <h2 className="font-display text-3xl text-[var(--color-ink)] mt-2 mb-3">
              Tu exótico merece<br />atención especializada
            </h2>
            <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed max-w-md">
              Consultas generales, urgencias, nutrición y casos clínicos documentados con rigor científico.
              Citamos fuentes bibliográficas en cada diagnóstico.
            </p>
            <div className="flex gap-3 mt-6">
              <Button variant="danger" size="md" href="/veterinaria/agendar" as="a">
                <Stethoscope size={16} />
                Agendar cita
              </Button>
              <Button variant="ghost" size="md" href="/veterinaria" as="a">
                Ver servicios
              </Button>
            </div>
          </div>
          <div className="text-8xl shrink-0 select-none">🩺</div>
        </div>
      </section>

      {/* ── Casos Clínicos Recientes ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[2px] text-[var(--color-vet)]">
              Blog Clínico
            </span>
            <h2 className="font-display text-2xl text-[var(--color-ink)] mt-1">
              Casos clínicos recientes
            </h2>
          </div>
          <Link href="/veterinaria/casos"
                className="text-sm font-body font-medium text-[var(--color-vet)] hover:underline flex items-center gap-1">
            Ver todos <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RECENT_CASES.map((c) => (
            <Link key={c.slug} href={`/veterinaria/casos/${c.slug}`}
                  className="group bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] p-5 hover:shadow-md transition-shadow flex gap-4">
              <ClinicalStampBadge size="sm" className="shrink-0 mt-1" />
              <div>
                <p className="text-[10px] font-mono text-[var(--color-vet)] uppercase tracking-wider mb-1">
                  {c.species}
                </p>
                <h3 className="font-display text-[13px] text-[var(--color-ink)] leading-snug group-hover:text-[var(--color-vet)] transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs text-[var(--color-ink-soft)] mt-2">{c.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA WhatsApp global ── */}
      <section className="bg-[var(--color-lime)] py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl text-white mb-2">
            ¿Tienes alguna duda?
          </h2>
          <p className="text-white/80 text-sm mb-6">
            Escríbenos directamente por WhatsApp y te asesoramos sin compromiso.
          </p>
          <Button variant="secondary" size="lg" href={whatsapp.general()} as="a"
                  className="bg-white text-[var(--color-lime)] border-white hover:bg-white/90">
            <MessageCircle size={18} />
            Preguntar por WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
}
