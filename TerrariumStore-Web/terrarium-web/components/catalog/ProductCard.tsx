import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import type { Animal } from "@/lib/types";
import { whatsapp } from "@/lib/whatsapp";
import { Badge, StockBadge, CareLevelBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
  animal: Animal;
}

export function ProductCard({ animal }: ProductCardProps) {
  const waLink = whatsapp.animal(animal.name, animal.scientific_name);
  const available = animal.stock > 0;

  return (
    <article className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden group hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Imagen */}
      <Link href={`/catalogo/${animal.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-[var(--color-line)]">
        {animal.image_urls[0] ? (
          <Image
            src={animal.image_urls[0]}
            alt={animal.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--color-ink-soft)]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21,15 16,10 5,21" />
            </svg>
          </div>
        )}
        {/* Badge de acento bamboo en imagen */}
        <div className="absolute top-2 left-2">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[var(--color-bamboo)] bg-[var(--color-bamboo-soft)] border border-[var(--color-bamboo)] px-2 py-0.5 rounded-full">
            {animal.category?.name ?? "Reptil"}
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/catalogo/${animal.slug}`}>
              <h3 className="font-display text-[15px] text-[var(--color-ink)] leading-snug hover:text-[var(--color-lime)] transition-colors">
                {animal.name}
              </h3>
            </Link>
            <p className="scientific-name text-xs text-[var(--color-ink-soft)] mt-0.5">
              {animal.scientific_name}
            </p>
          </div>
          <StockBadge stock={animal.stock} />
        </div>

        <CareLevelBadge level={animal.care_level} />

        <p className="text-xs text-[var(--color-ink-soft)] line-clamp-2 flex-1">
          {animal.description}
        </p>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 flex items-center justify-between gap-2">
        <span className="font-mono font-semibold text-[var(--color-lime)] text-[15px]">
          ${animal.price.toLocaleString("es-MX")} MXN
        </span>
        <Button
          variant="whatsapp"
          size="sm"
          href={available ? waLink : undefined}
          disabled={!available}
          as={available ? "a" : "button"}
        >
          <MessageCircle size={13} />
          {available ? "Preguntar" : "Agotado"}
        </Button>
      </div>
    </article>
  );
}
