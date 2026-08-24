import type { Metadata } from "next";
import { MessageCircle, MapPin, Clock } from "lucide-react";
import { whatsapp } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contacto | Terrarium Store Puebla",
  description: "Contáctanos por WhatsApp, visítanos en Puebla o síguenos en redes sociales.",
};

export default function ContactoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <span className="text-[11px] font-mono font-semibold uppercase tracking-[2px] text-[var(--color-lime)]">
        Contacto
      </span>
      <h1 className="font-display text-4xl text-[var(--color-ink)] mt-2 mb-10">Estamos aquí para ayudarte</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Info */}
        <div className="flex flex-col gap-6">
          {/* WhatsApp — CTA principal */}
          <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-[var(--radius-md)] p-5">
            <h2 className="font-display text-lg text-[var(--color-ink)] mb-1">WhatsApp</h2>
            <p className="text-sm text-[var(--color-ink-soft)] mb-3">La forma más rápida de contactarnos.</p>
            <Button variant="whatsapp" size="md" href={whatsapp.general()} as="a">
              <MessageCircle size={16} />
              Abrir chat
            </Button>
          </div>

          {/* Ubicación */}
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} color="var(--color-bamboo)" />
              <h2 className="font-display text-lg text-[var(--color-ink)]">Ubicación</h2>
            </div>
            <p className="text-sm text-[var(--color-ink-soft)]">Puebla, México</p>
            <p className="text-xs text-[var(--color-ink-soft)] mt-1">
              Dirección exacta disponible por WhatsApp.
            </p>
          </div>

          {/* Horarios */}
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={16} color="var(--color-lime)" />
              <h2 className="font-display text-lg text-[var(--color-ink)]">Horarios</h2>
            </div>
            <div className="space-y-1.5">
              {[
                { day: "Lunes – Viernes", hours: "10:00 – 19:00" },
                { day: "Sábado", hours: "10:00 – 18:00" },
                { day: "Domingo", hours: "Cerrado" },
              ].map((h) => (
                <div key={h.day} className="flex justify-between text-sm">
                  <span className="text-[var(--color-ink-soft)]">{h.day}</span>
                  <span className={`font-mono font-semibold ${h.hours === "Cerrado" ? "text-[var(--color-vet)]" : "text-[var(--color-lime)]"}`}>
                    {h.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Redes */}
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer"
               className="flex items-center gap-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              @TerrariumStoreMx
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"
               className="flex items-center gap-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              Terrarium Store
            </a>
          </div>
        </div>

        {/* FAQ rápida */}
        <div>
          <h2 className="font-display text-xl text-[var(--color-ink)] mb-4">Preguntas frecuentes</h2>
          <div className="flex flex-col gap-4">
            {[
              { q: "¿Hacen envíos?", a: "Sí, a toda la república con transportista especializado en animales vivos. Contáctanos para cotizar." },
              { q: "¿Los animales tienen garantía?", a: "Todos nuestros animales salen con revisión veterinaria. Ante cualquier problema de salud en las primeras 72h, lo atendemos sin costo." },
              { q: "¿Aceptan animales en adopción?", a: "Evaluamos caso por caso. Escríbenos con detalles del animal." },
              { q: "¿Puedo agendar cita sin comprar?", a: "Sí, la veterinaria es un servicio independiente de la tienda. Cualquier persona puede agendar." },
            ].map((item) => (
              <div key={item.q} className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-sm)] p-4">
                <p className="font-display text-[14px] text-[var(--color-ink)] mb-1">{item.q}</p>
                <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
