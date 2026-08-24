import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { whatsapp } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros | Terrarium Store Puebla",
  description: "Conoce la historia de Terrarium Store, tienda especializada en reptiles y exóticos en Puebla.",
};

export default function NosotrosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <span className="text-[11px] font-mono font-semibold uppercase tracking-[2px] text-[var(--color-bamboo)]">
        Nuestra historia
      </span>
      <h1 className="font-display text-4xl text-[var(--color-ink)] mt-2 mb-6">Sobre Terrarium Store</h1>

      {/* Marco de bambú — elemento de firma, solo en nosotros */}
      <div className="border-4 border-[var(--color-bamboo)] rounded-[var(--radius-md)] p-8 mb-10 bg-[var(--color-bamboo-soft)]">
        <p className="text-base text-[var(--color-ink)] leading-relaxed">
          Somos una tienda especializada en reptiles y animales exóticos ubicada en Puebla, México.
          Nacimos de la pasión por los animales no convencionales y la convicción de que merecen atención
          veterinaria del mismo nivel que cualquier mascota tradicional.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mb-14">
        <div>
          <h2 className="font-display text-xl text-[var(--color-ink)] mb-3">Nuestra filosofía</h2>
          <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
            Creemos que un reptil sano comienza antes de llegar a tu casa. Por eso, todos los animales
            que ofrecemos pasan por un período de cuarentena, revisión veterinaria y aclimatación.
            Nunca vendemos un animal recién importado ni enfermo.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-[var(--color-ink)] mb-3">Veterinaria integrada</h2>
          <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
            Somos la única tienda en Puebla con clínica veterinaria especializada en exóticos integrada.
            Documentamos nuestros casos clínicos con rigor académico, citando fuentes como el Manual MSD
            Veterinary y literatura especializada internacional.
          </p>
        </div>
      </div>

      {/* Valores */}
      <h2 className="font-display text-2xl text-[var(--color-ink)] mb-6">Nuestros valores</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {[
          { emoji: "🔬", title: "Rigor científico", desc: "Diagnósticos basados en evidencia, con referencias bibliográficas" },
          { emoji: "🐉", title: "Bienestar animal", desc: "El bienestar del animal siempre primero, sin excepciones" },
          { emoji: "📚", title: "Educación", desc: "Asesoramos a cada propietario sobre el cuidado correcto" },
          { emoji: "🌿", title: "Sustentabilidad", desc: "Solo animales criados en cautiverio, no capturados del silvestre" },
        ].map((v) => (
          <div key={v.title} className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] p-4 text-center">
            <div className="text-3xl mb-2">{v.emoji}</div>
            <h3 className="font-display text-[13px] text-[var(--color-ink)] mb-1">{v.title}</h3>
            <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button variant="whatsapp" size="lg" href={whatsapp.general()} as="a">
          <MessageCircle size={18} />
          Contáctanos por WhatsApp
        </Button>
      </div>
    </div>
  );
}
