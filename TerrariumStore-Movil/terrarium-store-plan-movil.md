# Terrarium Store — Plan técnico: APP MÓVIL

## 1. Alcance

App para el cliente (comprador/dueño de mascota exótica), enfocada en consumo rápido: ver catálogo, agendar cita, contactar por WhatsApp. El panel de gestión pesado queda en la web; la app tiene accesos de administración rápidos como fase posterior.

```
┌───────────────────────────────┐
│     App (Expo / React Native) │
│  ┌──────────────────────────┐ │
│  │  Tabs (bottom nav)        │ │
│  │  Inicio · Catálogo · Chat │ │
│  │  Veterinaria · Perfil     │ │
│  └──────────────────────────┘ │
└───────────────┬────────────────┘
                │
       ┌────────▼────────┐
       │  API (FastAPI)  │  ← misma API que consume la web
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
| Framework | **Expo (React Native) + TypeScript** | Un solo código para iOS/Android, mismo patrón que ya usás en RecetApp |
| Routing | **Expo Router** (file-based) | Rutas basadas en archivos, mismo mental model que Next.js — más fácil moverte entre web y app |
| Data fetching | **TanStack Query (React Query)** | Cache, refetch automático, mismo patrón que en la web |
| Estado local | **Zustand** | Para estado de UI simple (filtros activos, favoritos en memoria antes de sync) |
| Formularios | **React Hook Form + Zod** | Agendar cita, registro de mascota, mismo criterio que en web |
| Auth | **JWT en Expo SecureStore** | Almacenamiento seguro del token en el dispositivo |
| Imágenes | **expo-image** | Carga optimizada y con cache de las fotos del catálogo |
| Notificaciones | **Expo Notifications (push)** | Avisos de nuevo stock, cita confirmada |
| Theming | **Tokens compartidos con la web** (mismo archivo de colores/tipografía adaptado a RN) | Que la app y la web se vean como la misma marca, no como dos productos distintos |
| Distribución | **EAS Build + EAS Submit** | Generar builds para App Store / Play Store desde Expo sin Xcode/Android Studio local |

---

## 3. Arquitectura de carpetas

```
terrarium-app/
├── app/                              # Expo Router (file-based routing)
│   ├── (tabs)/                       # el bottom nav de 5 pestañas
│   │   ├── _layout.tsx                # define los tabs, íconos, colores activos
│   │   ├── index.tsx                  # Inicio
│   │   ├── catalogo/
│   │   │   ├── index.tsx              # listado + filtros
│   │   │   └── [id].tsx               # ficha de producto
│   │   ├── chat.tsx                   # puente a WhatsApp + mini-formulario
│   │   ├── veterinaria/
│   │   │   ├── index.tsx              # landing de servicios
│   │   │   ├── agendar.tsx
│   │   │   └── casos/
│   │   │       ├── index.tsx          # listado blog clínico
│   │   │       └── [id].tsx           # caso individual
│   │   └── perfil/
│   │       ├── index.tsx              # detecta el role y muestra la vista correcta
│   │       ├── mis-mascotas.tsx
│   │       ├── mis-citas.tsx
│   │       ├── favoritos.tsx
│   │       └── admin/                 # solo se renderiza si role=admin (fase 3)
│   │           ├── catalogo-rapido.tsx
│   │           └── citas-hoy.tsx
│   ├── (auth)/
│   │   ├── login.tsx
│   │   ├── registro.tsx
│   │   └── invitado.tsx               # modo invitado: navegar sin cuenta
│   ├── producto/[id]/modal.tsx        # vista modal rápida desde notificación push
│   └── _layout.tsx                    # providers globales (auth, query client, fonts)
├── components/
│   ├── ui/                            # Button, Card, Input, Badge — mismos nombres que en web
│   ├── catalog/                       # ProductCard, FilterSheet
│   ├── clinical/                      # ClinicalCaseCard, ClinicalStampBadge
│   └── layout/                        # TabBar custom, Header
├── lib/
│   ├── api.ts                         # cliente fetch hacia FastAPI
│   ├── auth.ts                        # login, refresh token, SecureStore
│   ├── whatsapp.ts                    # generación de links prellenados + Linking.openURL
│   └── notifications.ts               # registro de push token, manejo de recepción
├── hooks/
│   ├── useCatalog.ts
│   ├── useAppointments.ts
│   └── useAuth.ts
├── theme/
│   └── tokens.ts                      # los mismos tokens que en web, en formato RN (StyleSheet)
├── assets/
│   ├── fonts/                         # Fjalla One, Inter, JetBrains Mono
│   └── icons/
├── app.json                           # config de Expo (nombre, ícono, splash, permisos)
└── eas.json                           # perfiles de build (development, preview, production)
```

**Por qué `perfil/admin/` existe pero no se usa desde el día uno**: queda preparada la carpeta y la lógica de detección de rol, pero el contenido real (gestión rápida de catálogo/citas desde el celular) lo dejamos para fase 3, priorizando que la web sea el lugar principal de gestión.

---

## 4. Roles y permisos

| Acción | Invitado (sin cuenta) | Cliente | Admin (fase 3) |
|---|---|---|---|
| Ver catálogo, blog, servicios | ✅ | ✅ | ✅ |
| Contactar por WhatsApp | ✅ | ✅ | ✅ |
| Agendar cita | ❌ (requiere registro) | ✅ | ✅ |
| Guardar favoritos | ❌ | ✅ | ✅ |
| Registrar mascota propia | ❌ | ✅ | — |
| Recibir notificaciones push | ❌ | ✅ | ✅ |
| Marcar producto agotado / accesos rápidos | ❌ | ❌ | ✅ |

---

## 5. Fases

### Fase 1 — MVP (lanzamiento)
- Tabs: Inicio, Catálogo (listado + ficha), Chat (WhatsApp + mini-formulario), Veterinaria (landing + agendar + blog), Perfil básico
- Modo invitado para navegar sin registrarse
- Login/registro simple (email + password, o teléfono)
- Sin push todavía — se agrega en fase 2 una vez validado el flujo base

### Fase 2
- Registro de mascota propia + acceso a "mis citas"
- Favoritos con generación de mensaje WhatsApp con la lista completa
- Notificaciones push: nuevo stock disponible, cita confirmada/recordatorio
- Deep linking: que un push de "nuevo gecko disponible" abra directo la ficha del producto

### Fase 3
- Vista admin simplificada: marcar producto como agotado, ver citas del día, todo desde el celular
- Posible modo offline básico para catálogo (cache de React Query) si la conexión en tienda es inestable

---

## 6. Distribución

- **EAS Build** genera los binarios (`.apk`/`.aab` para Android, `.ipa` para iOS) sin necesitar Mac local
- **EAS Submit** sube directo a Play Store / App Store
- Cuenta de desarrollador: **Google Play Console** (pago único ~$25 USD) y **Apple Developer Program** (~$99 USD/año) — esto lo van a necesitar ellos como dueños de la cuenta, nosotros solo hacemos el build/submit
- Perfil `preview` de EAS para mandarles builds de prueba (via link/QR) antes del lanzamiento oficial, sin pasar por las tiendas

---

## 7. Backend consumido por la app (FastAPI)

Misma API que la web, pero la app **solo consume endpoints de cliente/público** — nada de administración en el MVP (eso queda para fase 3, ver sección 5).

### Auth
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
```
Tokens guardados en **Expo SecureStore** (no en cookies, no aplica en móvil). Modo invitado permite navegar catálogo/blog sin llamar `/auth/*` en absoluto.

### Catálogo — tab `Catálogo`
```
GET    /api/v1/catalog/animals
GET    /api/v1/catalog/animals/{id}
GET    /api/v1/catalog/products
GET    /api/v1/catalog/products/{id}
GET    /api/v1/catalog/categories
```

### Veterinaria — tab `Veterinaria`
```
GET    /api/v1/clinical-cases
GET    /api/v1/clinical-cases/{slug}
POST   /api/v1/appointments
GET    /api/v1/appointments/me
PATCH  /api/v1/appointments/{id}/cancel
```

### Perfil — tab `Perfil`
```
GET/POST/PATCH/DELETE  /api/v1/pets
GET/POST/DELETE        /api/v1/favorites
```

### Utilitario — usado en Chat y fichas de producto
```
GET    /api/v1/whatsapp/link?context=...
POST   /api/v1/uploads/image        (solo si en fase 3 el admin sube fotos desde el celular)
```

### Fase 3 — cuando se active `perfil/admin/`
```
PATCH  /api/v1/admin/animals/{id}          (marcar agotado, accesos rápidos)
GET    /api/v1/admin/appointments          (citas del día)
```

### Notificaciones push
El backend necesita un endpoint propio para registrar el push token del dispositivo, no está en el plan del backend general por ser específico de la app:
```
POST   /api/v1/notifications/register-device   { push_token, platform }
```
Se agrega en fase 2, junto con la lógica de envío desde `services/notification_service.py`.