import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle, ArrowLeft, ChevronRight } from "lucide-react";
import { CareLevelBadge, StockBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { whatsapp } from "@/lib/whatsapp";

// Datos mock para generar las páginas estáticas
const MOCK_ANIMALS = [
  {
    id: "1", slug: "pogona-vitticeps", name: "Dragón Barbudo",
    scientific_name: "Pogona vitticeps", care_level: "intermedio" as const,
    price: 1800, stock: 3, image_urls: [] as string[],
    description: "El dragón barbudo (Pogona vitticeps) es uno de los reptiles más populares como mascota en el mundo. Originario de las regiones áridas de Australia, es conocido por su temperamento dócil, su actividad diurna y su capacidad de interactuar con los humanos. Son omnívoros y requieren iluminación UVB de calidad para metabolizar correctamente el calcio.",
    category: { name: "Reptiles" },
  },
  {
    id: "2", slug: "eublepharis-macularius", name: "Gecko Leopardo",
    scientific_name: "Eublepharis macularius", care_level: "básico" as const,
    price: 950, stock: 5, image_urls: [] as string[],
    description: "El gecko leopardo (Eublepharis macularius) es una especie nocturna de geco terrestre originaria del sur de Asia. Es una de las primeras especies de reptiles que fue domesticada exitosamente, y hoy existen cientos de morfas genéticas. Su cuidado básico y su longevidad (15-20 años en cautiverio) lo hacen ideal para principiantes.",
    category: { name: "Reptiles" },
  },
  {
    id: "3", slug: "crested-gecko", name: "Gecko Crestado",
    scientific_name: "Correlophus ciliatus", care_level: "básico" as const,
    price: 780, stock: 0, image_urls: [] as string[],
    description: "El gecko crestado (Correlophus ciliatus), también llamado eyelash gecko, es arborícola y originario de Nueva Caledonia. Fue redescubierto en 1994 y desde entonces se ha convertido en un favorito por su facilidad de cuidado y su alimentación con papilla de frutas comercial.",
    category: { name: "Reptiles" },
  },
  {
    id: "4", slug: "blue-tongue-skink", name: "Eslizón Lengua Azul",
    scientific_name: "Tiliqua scincoides", care_level: "intermedio" as const,
    price: 2200, stock: 1, image_urls: [] as string[],
    description: "El eslizón de lengua azul (Tiliqua scincoides) es un lagarto robusto y terrestre de Australia. Es omnívoro, muy dócil y se adapta bien al manejo. Requiere enclosure de buen tamaño, fuente de calor y UVB moderada.",
    category: { name: "Reptiles" },
  },
];

export async function generateStaticParams() {
  return MOCK_ANIMALS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const animal = MOCK_ANIMALS.find((a) => a.slug === slug);
  if (!animal) return {};
  return {
    title: `${animal.name} — ${animal.scientific_name}`,
    description: `Disponible en Terrarium Store Puebla. ${animal.description.slice(0, 120)}...`,
  };
}

export default async function AnimalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const animal = MOCK_ANIMALS.find((a) => a.slug === slug);
  if (!animal) notFound();

  const waLink = whatsapp.animal(animal.name, animal.scientific_name);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-[var(--color-ink-soft)] mb-6">
        <Link href="/" className="hover:text-[var(--color-ink)]">Inicio</Link>
        <ChevronRight size={12} />
        <Link href="/catalogo" className="hover:text-[var(--color-ink)]">Catálogo</Link>
        <ChevronRight size={12} />
        <span className="text-[var(--color-ink)]">{animal.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Galería */}
        <div className="bg-[var(--color-bamboo-soft)] rounded-[var(--radius-md)] aspect-square flex items-center justify-center text-8xl">
          🦎
        </div>

        {/* Info */}
        <div>
          <div className="flex items-start gap-3 mb-1">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[var(--color-bamboo)] bg-[var(--color-bamboo-soft)] px-2 py-0.5 rounded-full border border-[var(--color-bamboo)]">
              {animal.category.name}
            </span>
          </div>

          <h1 className="font-display text-3xl text-[var(--color-ink)] mt-2">{animal.name}</h1>
          <p className="scientific-name text-sm text-[var(--color-ink-soft)] mt-1">{animal.scientific_name}</p>

          <div className="flex items-center gap-3 mt-4">
            <CareLevelBadge level={animal.care_level} />
            <StockBadge stock={animal.stock} />
          </div>

          <p className="font-mono font-semibold text-[var(--color-lime)] text-2xl mt-4">
            ${animal.price.toLocaleString("es-MX")} MXN
          </p>

          <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed mt-4">
            {animal.description}
          </p>

          <div className="flex gap-3 mt-6">
            <Button
              variant="whatsapp"
              size="lg"
              href={animal.stock > 0 ? waLink : undefined}
              disabled={animal.stock === 0}
              as={animal.stock > 0 ? "a" : "button"}
            >
              <MessageCircle size={18} />
              {animal.stock > 0 ? "Preguntar por WhatsApp" : "Sin existencia"}
            </Button>
            <Button variant="secondary" size="lg" href="/catalogo" as="a">
              <ArrowLeft size={16} />
              Volver
            </Button>
          </div>

          {/* Nota de asesoría */}
          <div className="mt-6 p-4 bg-[var(--color-lime-soft)] border border-[var(--color-lime)]/30 rounded-[var(--radius-sm)]">
            <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed">
              💡 Contamos con asesoría veterinaria especializada para nuevos propietarios.{" "}
              <Link href="/veterinaria" className="text-[var(--color-lime)] font-medium hover:underline">
                Ver servicios veterinarios →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
