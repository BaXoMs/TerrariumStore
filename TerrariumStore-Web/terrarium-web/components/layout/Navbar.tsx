"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { whatsapp } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/veterinaria", label: "Veterinaria" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-[var(--color-paper)]/95 backdrop-blur-md shadow-sm border-b border-[var(--color-line)]"
          : "bg-[var(--color-page)]"
      )}
    >
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div
            className={clsx(
              "w-8 h-8 rounded-full flex items-center justify-center text-white font-display text-lg",
              "bg-gradient-to-br from-[var(--color-lime)] to-[#3d7a1e]",
              "shadow-sm group-hover:shadow-md transition-shadow"
            )}
          >
            T
          </div>
          <span className="font-display text-lg text-[var(--color-ink)] leading-none">
            Terrarium Store
          </span>
        </Link>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={clsx(
                    "px-3 py-1.5 rounded-[var(--radius-sm)] text-sm font-body font-medium transition-colors",
                    active
                      ? "text-[var(--color-lime)] bg-[var(--color-lime-soft)]"
                      : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] hover:bg-[var(--color-line)]"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA WhatsApp desktop */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="whatsapp"
            size="sm"
            href={whatsapp.general()}
            as="a"
          >
            <MessageCircle size={15} />
            WhatsApp
          </Button>
        </div>

        {/* Hamburguesa móvil */}
        <button
          id="nav-mobile-toggle"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-[var(--radius-sm)] text-[var(--color-ink-soft)] hover:bg-[var(--color-line)]"
          aria-label="Abrir menú"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden border-t border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-4 flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 px-3 rounded-[var(--radius-sm)] text-sm font-body font-medium text-[var(--color-ink)] hover:bg-[var(--color-lime-soft)] hover:text-[var(--color-lime)]"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="whatsapp" size="sm" href={whatsapp.general()} as="a" className="mt-2">
            <MessageCircle size={15} />
            Preguntar por WhatsApp
          </Button>
        </div>
      )}
    </header>
  );
}
