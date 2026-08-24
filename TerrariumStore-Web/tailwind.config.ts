// terrarium-web/tailwind.config.ts
// Mapea los tokens de styles/tokens.css (CSS variables) a clases de Tailwind.
// Así se usa: bg-page, text-ink, border-line, bg-lime, text-lime, etc.

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "var(--color-page)",
        paper: "var(--color-paper)",
        ink: {
          DEFAULT: "var(--color-ink)",
          soft: "var(--color-ink-soft)",
        },
        line: "var(--color-line)",
        lime: {
          DEFAULT: "var(--color-lime)",
          soft: "var(--color-lime-soft)",
        },
        bamboo: {
          DEFAULT: "var(--color-bamboo)",
          soft: "var(--color-bamboo-soft)",
        },
        red: {
          DEFAULT: "var(--color-red)",
          soft: "var(--color-red-soft)",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      spacing: {
        // múltiplos de 4px ya vienen por default en Tailwind (1 = 4px),
        // se deja explícito acá solo como recordatorio de la regla de marca
      },
    },
  },
  plugins: [],
};

export default config;

/*
Uso típico en un componente:

<div className="bg-page text-ink">
  <span className="font-display text-2xl">Terrarium Store</span>
  <p className="font-body text-ink-soft text-sm">Cuidado especializado</p>
  <span className="font-mono text-lime font-semibold">$1,300</span>
  <p className="font-body italic text-ink-soft text-xs">Pogona vitticeps</p>
</div>

Recordar importar styles/tokens.css en app/layout.tsx antes que cualquier
otro estilo, para que las variables CSS estén disponibles globalmente.
*/
