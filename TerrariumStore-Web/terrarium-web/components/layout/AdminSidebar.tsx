"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Calendar, BookOpen, Megaphone, LogOut } from "lucide-react";
import { clsx } from "clsx";
import { useAuth } from "@/hooks/useAuth";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/catalogo", label: "Catálogo", icon: Package },
  { href: "/admin/citas", label: "Citas", icon: Calendar },
  { href: "/admin/casos-clinicos", label: "Casos Clínicos", icon: BookOpen },
  { href: "/admin/promociones", label: "Promociones", icon: Megaphone },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="w-56 shrink-0 bg-[var(--color-ink)] min-h-screen flex flex-col sticky top-0">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-lime)] to-[#3d7a1e] flex items-center justify-center text-white font-display text-base">
            T
          </div>
          <div>
            <p className="font-display text-sm text-white leading-none">Terrarium Store</p>
            <p className="text-[10px] font-mono text-[var(--color-ink-soft)] mt-0.5">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navegación */}
      <nav className="flex-1 p-3 flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-sm)] text-sm font-body transition-colors",
                active
                  ? "bg-[var(--color-lime)] text-white font-semibold"
                  : "text-[var(--color-ink-soft)] hover:text-white hover:bg-white/10"
              )}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/10">
        <button
          id="admin-logout-btn"
          onClick={() => logout.mutate()}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-sm)] text-sm text-[var(--color-ink-soft)] hover:text-white hover:bg-white/10 transition-colors"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
