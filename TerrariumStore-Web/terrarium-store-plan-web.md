# Terrarium Store — Plan técnico: PÁGINA WEB

## 1. Alcance

Sitio web público (catálogo, veterinaria, blog clínico) + panel de administración integrado en el mismo proyecto, con acceso restringido por rol.

```
┌───────────────────────────────┐
│      Web (Next.js)            │
│  ┌──────────┐  ┌───────────┐  │
│  │  Público │  │   Admin   │  │
│  │ /catalogo│  │/dashboard │  │
│  │/veterinar│  │/catalogo  │  │
│  │  ...     │  │  ...      │  │
│  └──────────┘  └───────────┘  │
└───────────────┬────────────────┘
                │
       ┌────────▼────────┐
       │  API (FastAPI)  │
       └────────┬────────┘
                │
     ┌──────────┼──────────┐
┌────▼─────┐ ┌──▼──────┐ ┌─▼──────┐
│PostgreSQL│ │Storage S3│ │WhatsApp│
└──────────┘ └─────────┘ └────────┘
```

---

## 2. Stack tecnológico

| Capa | Tecnología | Por qué |
|---|---|---|
| Framework | **Next.js 14 (App Router) + TypeScript** | SSR/SSG para SEO real — la gente busca "venta de pogonas Puebla" en Google, y esto indexa mucho mejor que una SPA pura |
| Estilos | **Tailwind CSS** | Rápido de mantener, y podemos volcar la paleta/tokens que ya definimos como variables de theme |
| Data fetching | **TanStack Query (React Query)** | Cache y refetch automático contra la API, mismo patrón en admin y público |
| Formularios | **React Hook Form + Zod** | Validación consistente (alta de producto, agendar cita, login) |
| Auth | **JWT en cookies httpOnly** (via API routes de Next.js como proxy) | Evita exponer el token al JS del cliente, más seguro para el panel admin |
| Imágenes | **next/image** + **S3-compatible (MinIO / Cloudflare R2)** | Optimización automática de imágenes de animales/productos |
| Tablas admin | **TanStack Table** | Listados de catálogo, citas, casos clínicos con filtros/orden |
| Deploy | **Coolify** | Consistente con tu infraestructura actual |
| Dominio | **Dominio propio** (ej. `terrariumstore.mx`) | A diferencia de tus proyectos internos, esto necesita ser público e indexable |

---

## 3. Arquitectura de carpetas

```
terrarium-web/
├── app/
│   ├── (public)/                    # visible para cualquiera, sin login
│   │   ├── page.tsx                  # Inicio
│   │   ├── catalogo/
│   │   │   ├── page.tsx              # listado + filtros
│   │   │   └── [slug]/page.tsx       # ficha de producto
│   │   ├── veterinaria/
│   │   │   ├── page.tsx              # landing de servicios
│   │   │   ├── agendar/page.tsx
│   │   │   └── casos/
│   │   │       ├── page.tsx          # listado blog clínico
│   │   │       └── [slug]/page.tsx   # caso individual
│   │   ├── nosotros/page.tsx
│   │   └── contacto/page.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── registro/page.tsx
│   ├── (cliente)/                   # requiere sesión, role=cliente
│   │   ├── layout.tsx                # valida sesión, redirige si no hay
│   │   ├── perfil/page.tsx
│   │   ├── mis-mascotas/page.tsx
│   │   ├── mis-citas/page.tsx
│   │   └── favoritos/page.tsx
│   ├── (admin)/                     # requiere sesión, role=admin
│   │   ├── layout.tsx                # sidebar de administración, valida rol
│   │   ├── dashboard/page.tsx
│   │   ├── catalogo/
│   │   │   ├── page.tsx              # listado con acciones
│   │   │   ├── nuevo/page.tsx
│   │   │   └── [id]/editar/page.tsx
│   │   ├── citas/page.tsx            # agenda completa, confirmar/reprogramar
│   │   ├── casos-clinicos/
│   │   │   ├── page.tsx
│   │   │   ├── nuevo/page.tsx
│   │   │   └── [id]/editar/page.tsx
│   │   ├── promociones/page.tsx
│   │   └── estadisticas/page.tsx
│   ├── api/                          # API routes de Next.js (proxy/auth)
│   │   └── auth/[...].ts
│   └── layout.tsx                    # layout raíz: fuentes, providers
├── components/
│   ├── ui/                           # Button, Card, Input, Badge — design system base
│   ├── catalog/                      # ProductCard, FilterBar, ProductGrid
│   ├── clinical/                     # ClinicalCaseCard, ClinicalStampBadge
│   ├── layout/                       # Navbar, Footer, AdminSidebar
│   └── admin/                        # DataTable, FormBuilder, StatCard
├── lib/
│   ├── api.ts                        # cliente fetch hacia FastAPI
│   ├── auth.ts                       # manejo de sesión/rol
│   └── whatsapp.ts                   # generación de links prellenados
├── hooks/
│   ├── useCatalog.ts
│   ├── useAppointments.ts
│   └── useAuth.ts
├── styles/
│   └── tokens.css                    # la paleta y tipografía que ya definimos
├── public/
│   └── og-image.png                  # imagen para compartir en redes
└── tailwind.config.ts
```

**Por qué los grupos de rutas** `(public)`, `(cliente)`, `(admin)`: cada uno tiene su propio `layout.tsx` que valida sesión/rol antes de renderizar. El admin literalmente vive separado del sitio público — mismo dominio, pero con su propio sidebar y sin filtrarse contenido de gestión a un visitante común.

---

## 4. Roles y permisos

| Acción | Visitante (sin sesión) | Cliente | Admin |
|---|---|---|---|
| Ver catálogo, blog, servicios | ✅ | ✅ | ✅ |
| Agendar cita | ✅ (con datos de contacto) | ✅ | ✅ |
| Registrar mascota propia | ❌ | ✅ | — |
| Ver "mis citas" / historial | ❌ | ✅ | — |
| Editar catálogo | ❌ | ❌ | ✅ |
| Gestionar agenda de todos | ❌ | ❌ | ✅ |
| Publicar casos clínicos | ❌ | ❌ | ✅ |
| Ver estadísticas | ❌ | ❌ | ✅ |

---

## 5. Fases

### Fase 1 — MVP (lanzamiento)
- Inicio, Catálogo (listado + ficha), Veterinaria (landing + agendar + blog), Nosotros, Contacto
- Admin: gestión de catálogo (CRUD), gestión de citas, publicar casos clínicos
- WhatsApp por deep link con mensaje prellenado desde ficha de producto
- SEO básico: metadatos, sitemap, OG images

### Fase 2
- Login/registro de clientes, "mis mascotas", "mis citas"
- Favoritos con generación de mensaje WhatsApp con la lista completa
- Promociones/banners gestionables desde admin (como el Buen Fin que vimos en su Instagram)

### Fase 3
- Estadísticas en dashboard admin (qué producto/caso se vio más, qué generó más contacto)
- Niveles de permiso dentro del staff (dueño vs. empleado)
- Blog clínico con búsqueda/filtro por especie o patología

---

## 6. Despliegue

- **Coolify** aloja el proyecto Next.js (build automático con cada push a `main`)
- **Dominio propio** apuntado vía DNS, con certificado TLS automático
- **Storage de imágenes** en bucket S3-compatible, servido a través de `next/image` para optimización
- Backend (FastAPI) puede vivir en el mismo Coolify, como servicio separado que consumen tanto la web como la futura app

---

## 7. Backend consumido por la web (FastAPI)

La web consume la misma API que la app, pero es la **única superficie que usa los endpoints de administración** — el panel admin vive acá, no en la app (por ahora).

### Auth
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
```
Sesión manejada con JWT en **cookie httpOnly** (via API routes de Next.js como proxy) — más seguro que guardar el token en el JS del cliente, especialmente para el panel admin.

### Catálogo (público) — usados en `/catalogo`
```
GET    /api/v1/catalog/animals
GET    /api/v1/catalog/animals/{id}
GET    /api/v1/catalog/products
GET    /api/v1/catalog/products/{id}
GET    /api/v1/catalog/categories
```

### Veterinaria — usados en `/veterinaria`
```
GET    /api/v1/clinical-cases
GET    /api/v1/clinical-cases/{slug}
POST   /api/v1/appointments
GET    /api/v1/appointments/me
PATCH  /api/v1/appointments/{id}/cancel
```

### Cliente logueado — usados en `(cliente)/`
```
GET/POST/PATCH/DELETE  /api/v1/pets
GET/POST/DELETE        /api/v1/favorites
```

### Admin — usados en `(admin)/`, exclusivos de la web
```
POST/PATCH/DELETE  /api/v1/admin/animals
POST/PATCH         /api/v1/admin/products
GET                /api/v1/admin/appointments
PATCH              /api/v1/admin/appointments/{id}/status
POST/PATCH         /api/v1/admin/clinical-cases
POST/PATCH         /api/v1/admin/promotions
GET                /api/v1/admin/stats/overview        (fase 3)
```

### Tablas de base de datos que más toca el admin de la web
`animals`, `products`, `categories`, `appointments`, `clinical_cases`, `promotions` — el CRUD de estas seis tablas prácticamente ES el panel de administración. Estructura completa de columnas en el documento de backend si lo necesitás como referencia aparte.