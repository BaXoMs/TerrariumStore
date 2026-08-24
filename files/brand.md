# Terrarium Store — Brand Guide

## 1. Logo

- Isotipo: letra "T" con textura de bambú, fondo circular verde degradado
- Wordmark: "Terrarium Store" en Fjalla One
- Uso mínimo: no reducir el isotipo por debajo de 24px (ilegible más chico)
- Espacio de seguridad: dejar alrededor del logo un margen equivalente a la altura de la "T"
- Nunca deformar, rotar más de 15° ni aplicar sombra/glow sobre el isotipo

## 2. Paleta de colores

| Nombre | Hex | Uso |
|---|---|---|
| Page | `#F7F4EC` | Fondo base de toda la interfaz |
| Paper | `#FFFFFF` | Superficie de tarjetas |
| Ink | `#16261A` | Texto principal |
| Ink Soft | `#55635A` | Texto secundario/descripciones |
| Line | `#E4DFD1` | Bordes y separadores |
| Lime | `#5FA832` | **Acento único de acción**: CTAs, precios, WhatsApp, estado activo |
| Lime Soft | `#E7F3DA` | Fondo de íconos/badges relacionados a Lime |
| Bamboo | `#B98F4E` | Identidad de la mitad "Tienda" — bordes superiores, íconos comerciales |
| Bamboo Soft | `#F4E9D3` | Fondo de íconos/badges relacionados a Bamboo |
| Red | `#B5342A` | **Exclusivo veterinaria/clínico** — sellos, alertas, casos clínicos |
| Red Soft | `#FBE7E4` | Fondo de íconos/badges relacionados a Red |

### Reglas de combinación (para que no se vea "todo verde")
1. El fondo de página siempre es `Page`, nunca un verde saturado a pantalla completa.
2. `Lime` se usa con propósito, no decorativo — si un elemento no es accionable (botón, precio, link, estado activo), no lleva Lime.
3. `Red` es exclusivo de contenido veterinario/clínico. Nunca se usa en la parte comercial, ni como color de error genérico de formularios (usar un rojo de sistema aparte para eso si hace falta).
4. `Bamboo` identifica visualmente "esto es de la tienda" — se usa en la mitad comercial del home, en categorías de catálogo.
5. Máximo un acento de color fuerte (Lime, Bamboo o Red) por componente. Combinarlos en un mismo elemento rompe la jerarquía.

## 3. Tipografía

| Rol | Fuente | Uso |
|---|---|---|
| Display | Fjalla One | Títulos, headers de sección, wordmark |
| Cuerpo | Inter (400/500/600/700) | Texto de lectura, UI, formularios |
| Mono | JetBrains Mono (500/600) | Precios, fichas técnicas, datos numéricos |

**Regla de nombres científicos**: siempre en Inter itálica — nunca en Display ni en Mono. Ejemplo: *Pogona vitticeps*, *Eublepharis macularius*.

**Jerarquía tipográfica sugerida (web/app)**
- H1 (hero): Fjalla One, 32–34px
- H2 (sección): Fjalla One, 17–18px
- Body: Inter 400, 14px
- Caption/eyebrow: JetBrains Mono 600, 11px, uppercase, letter-spacing 1.5px
- Precio: JetBrains Mono 600, 13–16px según contexto

## 4. Elementos de firma

- **Marco de bambú**: reservado para piezas puntuales (fue descartado como borde permanente de la app — ver decisión del 23/08). Puede reaparecer en piezas de marketing, invitaciones a eventos, o el "Sobre nosotros".
- **Sello "Caso Clínico"**: badge circular rotado ~14°, borde rojo, usado exclusivamente para marcar contenido veterinario serio (blog, fichas de salud). Es el elemento que separa visualmente tienda vs. clínica sin necesitar dos apps distintas.

## 5. Tono de comunicación

- Cercano pero con autoridad técnica — citan fuentes bibliográficas en contenido clínico (ej. Manual MSD), eso se mantiene en todo copy educativo del sitio/app.
- Nombres científicos siempre presentes junto al nombre común, reforzando seriedad profesional.
- CTAs directos y accionables ("Agendar cita", "Preguntar por WhatsApp"), sin relleno.

## 6. Archivos fuente de tokens

- Web: `terrarium-web/styles/tokens.css`
- Móvil: `terrarium-app/theme/tokens.ts`

Ambos derivan de esta guía — si cambia un color acá, se actualiza en los dos archivos.
