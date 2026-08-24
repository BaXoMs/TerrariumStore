import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { whatsapp } from "@/lib/whatsapp";

const LINKS_TIENDA = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/contacto", label: "Contacto" },
  { href: "/nosotros", label: "Nosotros" },
];

const LINKS_VETERINARIA = [
  { href: "/veterinaria", label: "Servicios" },
  { href: "/veterinaria/agendar", label: "Agendar cita" },
  { href: "/veterinaria/casos", label: "Casos clínicos" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-line)] mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Marca */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-lime)] to-[#3d7a1e] flex items-center justify-center text-white font-display text-base">
              T
            </div>
            <span className="font-display text-base text-white">Terrarium Store</span>
          </div>
          <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
            Especialistas en reptiles y animales exóticos en Puebla. Tienda y veterinaria en un solo lugar.
          </p>
          {/* Redes */}
          <div className="flex gap-3 mt-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer"
               className="text-[var(--color-ink-soft)] hover:text-white transition-colors"
               aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"
               className="text-[var(--color-ink-soft)] hover:text-white transition-colors"
               aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>

        {/* Tienda */}
        <div>
          <h3 className="font-display text-[13px] text-[var(--color-bamboo)] uppercase tracking-wider mb-3">
            Tienda
          </h3>
          <ul className="space-y-2">
            {LINKS_TIENDA.map((l) => (
              <li key={l.href}>
                <Link href={l.href}
                      className="text-sm text-[var(--color-ink-soft)] hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Veterinaria */}
        <div>
          <h3 className="font-display text-[13px] text-[var(--color-vet)] uppercase tracking-wider mb-3">
            Veterinaria
          </h3>
          <ul className="space-y-2">
            {LINKS_VETERINARIA.map((l) => (
              <li key={l.href}>
                <Link href={l.href}
                      className="text-sm text-[var(--color-ink-soft)] hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="font-display text-[13px] text-[var(--color-lime)] uppercase tracking-wider mb-3">
            Contacto
          </h3>
          <a
            href={whatsapp.general()}
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm bg-[#25D366] text-white px-3 py-2 rounded-[var(--radius-sm)] hover:brightness-110 transition-all"
          >
            <MessageCircle size={15} />
            Preguntar por WhatsApp
          </a>
          <p className="mt-4 text-xs text-[var(--color-ink-soft)] leading-relaxed">
            Puebla, México<br />
            Lunes – Sábado, 10 am – 7 pm
          </p>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-[var(--color-ink-soft)]/20 py-4 px-4 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-[var(--color-ink-soft)]">
          © {new Date().getFullYear()} Terrarium Store. Todos los derechos reservados.
        </p>
        <p className="text-xs text-[var(--color-ink-soft)]">
          Reptiles & Veterinaria Especializada en Puebla
        </p>
      </div>
    </footer>
  );
}
