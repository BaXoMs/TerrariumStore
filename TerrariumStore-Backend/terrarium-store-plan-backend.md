# Terrarium Store — Plan técnico: BACKEND (FastAPI)

## 1. Alcance

API REST centralizada que alimenta tanto la web (Next.js) como la app (Expo). Es el único punto de acceso a la base de datos y a los servicios externos (S3, WhatsApp, push notifications). No existe lógica de negocio en el frontend — todo pasa por acá.

```
                ┌──────────────┐   ┌──────────────────────┐
                │  Web Next.js │   │  App Expo/React Native│
                └──────┬───────┘   └──────────┬────────────┘
                       │                      │
                       └──────────┬───────────┘
                                  │
                         ┌────────▼────────┐
                         │  API (FastAPI)  │
                         │  /api/v1/...    │
                         └────────┬────────┘
                                  │
               ┌──────────────────┼──────────────────┐
        ┌──────▼──────┐   ┌───────▼──────┐   ┌───────▼───────┐
        │  PostgreSQL  │   │  Storage S3  │   │  Expo Push /  │
        │ (SQLAlchemy) │   │  (imágenes)  │   │  WhatsApp API │
        └─────────────┘   └──────────────┘   └───────────────┘
```

---

## 2. Stack tecnológico

| Capa | Tecnología | Por qué |
|---|---|---|
| Framework | **FastAPI + Python 3.12** | Async nativo, tipado con Pydantic, generación automática de docs OpenAPI |
| ORM | **SQLAlchemy 2.0 (async)** | Queries async, tipado moderno con `Mapped[]`, compatible con Alembic |
| Migraciones | **Alembic** | Control de versiones del esquema de DB, reversible |
| Validación | **Pydantic v2** | Schemas de entrada/salida en todos los endpoints, sin código extra |
| Auth | **JWT (python-jose) + bcrypt** | Access token (15 min) + refresh token (30 días) en cookies httpOnly para web, SecureStore para app |
| Base de datos | **PostgreSQL 16** | Relaciones complejas (citas, mascotas, casos), full-text search nativo |
| Storage | **boto3** (S3-compatible: Cloudflare R2 / MinIO) | Upload de imágenes de animales, productos, casos clínicos |
| Push | **httpx → Expo Push API** | Envío de notificaciones a dispositivos registrados (fase 2) |
| Tests | **pytest + httpx (AsyncClient)** | Tests de integración contra DB de prueba |
| Deploy | **Coolify** (Docker) | Mismo servidor que la web, servicio separado |

---

## 3. Arquitectura de carpetas

```
terrarium-api/
├── app/
│   ├── main.py                    # Instancia FastAPI, registro de routers, CORS, lifespan
│   ├── core/
│   │   ├── config.py              # Settings con Pydantic BaseSettings (.env)
│   │   ├── security.py            # Generación/verificación JWT, hash de contraseñas
│   │   └── dependencies.py        # get_db, get_current_user, require_admin
│   ├── db/
│   │   ├── base.py                # Base declarativa de SQLAlchemy
│   │   ├── session.py             # AsyncEngine, AsyncSessionLocal
│   │   └── init_db.py             # Seed inicial (categorías, usuario admin)
│   ├── models/                    # Tablas ORM (SQLAlchemy Mapped[])
│   │   ├── user.py
│   │   ├── animal.py
│   │   ├── product.py
│   │   ├── category.py
│   │   ├── appointment.py
│   │   ├── pet.py
│   │   ├── clinical_case.py
│   │   ├── favorite.py
│   │   ├── promotion.py
│   │   └── device_token.py        # Para push notifications (fase 2)
│   ├── schemas/                   # Pydantic schemas (request/response)
│   │   ├── auth.py
│   │   ├── animal.py
│   │   ├── product.py
│   │   ├── appointment.py
│   │   ├── pet.py
│   │   ├── clinical_case.py
│   │   ├── favorite.py
│   │   └── promotion.py
│   ├── routers/                   # Un archivo por recurso
│   │   ├── auth.py
│   │   ├── catalog.py
│   │   ├── appointments.py
│   │   ├── pets.py
│   │   ├── favorites.py
│   │   ├── clinical_cases.py
│   │   ├── promotions.py
│   │   ├── notifications.py       # Registro de device tokens (fase 2)
│   │   ├── uploads.py             # Upload de imágenes a S3
│   │   ├── whatsapp.py            # Generación de links prellenados
│   │   └── admin/
│   │       ├── animals.py
│   │       ├── products.py
│   │       ├── appointments.py
│   │       ├── clinical_cases.py
│   │       ├── promotions.py
│   │       └── stats.py           # (fase 3)
│   └── services/                  # Lógica de negocio desacoplada de los routers
│       ├── storage_service.py     # Upload/delete en S3
│       ├── notification_service.py# Envío de push via Expo (fase 2)
│       └── whatsapp_service.py    # Construcción de URLs de WhatsApp
├── alembic/
│   ├── env.py
│   └── versions/                  # Migraciones autogeneradas
├── tests/
│   ├── conftest.py                # AsyncClient, DB de prueba
│   ├── test_auth.py
│   ├── test_catalog.py
│   └── test_appointments.py
├── .env.example                   # Variables requeridas, sin valores reales
├── Dockerfile
├── docker-compose.yml             # Para desarrollo local (API + PostgreSQL)
└── requirements.txt
```

---

## 4. Esquema de base de datos

### `users`
| Columna | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| email | VARCHAR UNIQUE | |
| hashed_password | VARCHAR | bcrypt |
| role | ENUM(`cliente`, `admin`) | default `cliente` |
| name | VARCHAR | |
| phone | VARCHAR | para contacto/WhatsApp |
| created_at | TIMESTAMP | |

### `animals`
| Columna | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| name | VARCHAR | nombre común |
| scientific_name | VARCHAR | siempre en itálica en frontend |
| category_id | FK → categories | |
| description | TEXT | |
| care_level | ENUM(`básico`, `intermedio`, `avanzado`) | |
| price | NUMERIC(10,2) | |
| stock | INTEGER | 0 = agotado |
| image_urls | JSONB | lista de URLs de S3 |
| slug | VARCHAR UNIQUE | para URLs limpias |
| is_active | BOOLEAN | ocultar sin borrar |
| created_at | TIMESTAMP | |

### `products`
| Columna | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| name | VARCHAR | |
| category_id | FK → categories | |
| description | TEXT | |
| price | NUMERIC(10,2) | |
| stock | INTEGER | |
| image_urls | JSONB | |
| slug | VARCHAR UNIQUE | |
| is_active | BOOLEAN | |
| created_at | TIMESTAMP | |

### `categories`
| Columna | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| name | VARCHAR UNIQUE | ej. "Reptiles", "Sustratos" |
| type | ENUM(`animal`, `product`) | |
| color_accent | VARCHAR | `lime`, `bamboo`, `red` — para badges en UI |

### `appointments`
| Columna | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| user_id | FK → users (nullable) | nullable para citas sin cuenta |
| contact_name | VARCHAR | siempre presente |
| contact_phone | VARCHAR | |
| contact_email | VARCHAR | |
| pet_name | VARCHAR | nombre de la mascota a atender |
| species | VARCHAR | |
| reason | TEXT | motivo de consulta |
| scheduled_at | TIMESTAMP | |
| status | ENUM(`pendiente`, `confirmada`, `cancelada`, `completada`) | |
| notes | TEXT | notas del veterinario (admin only) |
| created_at | TIMESTAMP | |

### `pets`
| Columna | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| user_id | FK → users | |
| name | VARCHAR | |
| species | VARCHAR | |
| scientific_name | VARCHAR | |
| birthdate | DATE | |
| notes | TEXT | |
| image_url | VARCHAR | |
| created_at | TIMESTAMP | |

### `clinical_cases`
| Columna | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| title | VARCHAR | |
| slug | VARCHAR UNIQUE | |
| species | VARCHAR | |
| scientific_name | VARCHAR | |
| summary | TEXT | intro visible en listado |
| body | TEXT | markdown/HTML del caso completo |
| image_urls | JSONB | |
| tags | JSONB | `["pogona", "nutrición"]` — para búsqueda fase 3 |
| source | VARCHAR | ej. "Manual MSD Veterinary" |
| published_at | TIMESTAMP | null = borrador |
| created_at | TIMESTAMP | |

### `favorites`
| Columna | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| user_id | FK → users | |
| animal_id | FK → animals (nullable) | |
| product_id | FK → products (nullable) | |
| created_at | TIMESTAMP | CHECK: solo uno de los dos FK es non-null |

### `promotions`
| Columna | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| title | VARCHAR | |
| description | TEXT | |
| image_url | VARCHAR | |
| cta_label | VARCHAR | ej. "Ver catálogo" |
| cta_url | VARCHAR | ruta interna o externa |
| starts_at | TIMESTAMP | |
| ends_at | TIMESTAMP | null = sin vencimiento |
| is_active | BOOLEAN | |

### `device_tokens` *(fase 2)*
| Columna | Tipo | Notas |
|---|---|---|
| id | UUID PK | |
| user_id | FK → users | |
| push_token | VARCHAR UNIQUE | token de Expo |
| platform | ENUM(`ios`, `android`) | |
| created_at | TIMESTAMP | |

---

## 5. Endpoints completos

### Auth — `/api/v1/auth`
```
POST   /register           Crea usuario con role=cliente
POST   /login              Devuelve access_token + refresh_token
POST   /refresh            Renueva access_token con refresh válido
POST   /logout             Invalida refresh_token (blacklist o delete)
```

### Catálogo — `/api/v1/catalog`
```
GET    /animals            Listado con filtros: category, care_level, in_stock, search
GET    /animals/{id}       Ficha completa (incluye scientific_name, image_urls, price)
GET    /products           Listado con filtros: category, in_stock, search
GET    /products/{id}      Ficha completa
GET    /categories         Todas las categorías (type=animal|product)
```

### Citas — `/api/v1/appointments`
```
POST   /                   Crear cita (con o sin cuenta — contact_* siempre requerido)
GET    /me                 Mis citas (requiere auth, role=cliente)
PATCH  /{id}/cancel        Cancelar propia cita (requiere auth + ownership)
```

### Mascotas — `/api/v1/pets`
```
GET    /                   Mis mascotas (requiere auth)
POST   /                   Registrar mascota
PATCH  /{id}               Editar mascota propia
DELETE /{id}               Eliminar mascota propia
```

### Favoritos — `/api/v1/favorites`
```
GET    /                   Lista de favoritos del usuario (requiere auth)
POST   /                   Agregar favorito { animal_id? | product_id? }
DELETE /{id}               Quitar favorito
```

### Casos Clínicos — `/api/v1/clinical-cases`
```
GET    /                   Listado público (solo published_at IS NOT NULL)
GET    /{slug}             Caso individual
```

### Utilidades
```
GET    /api/v1/whatsapp/link?context=animal|product|appointment&id=...
                           Genera URL de WhatsApp con mensaje prellenado
POST   /api/v1/uploads/image
                           Sube imagen a S3, devuelve URL pública (requiere auth)
```

### Notificaciones — `/api/v1/notifications` *(fase 2)*
```
POST   /register-device    Registra push token { push_token, platform }
```

### Admin — `/api/v1/admin` (requieren role=admin)

**Animales**
```
POST   /animals            Crear animal
PATCH  /animals/{id}       Editar (incluye stock, is_active)
DELETE /animals/{id}       Eliminar (soft delete → is_active = false)
```

**Productos**
```
POST   /products           Crear producto
PATCH  /products/{id}      Editar
DELETE /products/{id}      Soft delete
```

**Citas**
```
GET    /appointments       Agenda completa con filtros (status, date range)
PATCH  /appointments/{id}/status   Cambiar status { confirmada | cancelada | completada }
```

**Casos Clínicos**
```
POST   /clinical-cases     Crear caso (published_at = null → borrador)
PATCH  /clinical-cases/{id} Editar / publicar (set published_at)
DELETE /clinical-cases/{id} Eliminar
```

**Promociones**
```
POST   /promotions         Crear banner/promo
PATCH  /promotions/{id}    Editar
DELETE /promotions/{id}    Eliminar
```

**Estadísticas** *(fase 3)*
```
GET    /stats/overview     Visitas por animal/producto, citas generadas, contactos WA
```

---

## 6. Auth — flujo detallado

```
Cliente                     Next.js API Route              FastAPI
  │─── POST /login ─────────────▶│                            │
  │    { email, password }        │──── POST /api/v1/auth/login ──▶│
  │                               │◀──── { access_token,           │
  │                               │        refresh_token }          │
  │◀── Set-Cookie httpOnly ───────│                            │
  │    (access + refresh)         │                            │
  │                               │                            │
  │─── GET /admin/catalogo ──────▶│                            │
  │    (cookie adjunta auto)      │── Authorization: Bearer ──▶│
  │                               │◀──── 200 OK ───────────────│
  │◀── HTML/JSON ─────────────────│                            │
```

- El **access token** dura 15 minutos. El **refresh token** dura 30 días.
- La web los maneja como cookies httpOnly a través de las API routes de Next.js (el token nunca toca el JS del cliente).
- La app los guarda en **Expo SecureStore** y los adjunta manualmente en el header `Authorization: Bearer`.

---

## 7. Variables de entorno (`.env`)

```env
# Base de datos
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/terrarium_db

# JWT
SECRET_KEY=cambiar_en_produccion
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=30

# S3 / Storage
S3_ENDPOINT_URL=https://...r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
S3_BUCKET_NAME=terrarium-store

# CORS (orígenes permitidos)
ALLOWED_ORIGINS=https://terrariumstore.mx,https://api.terrariumstore.mx

# WhatsApp (número de la tienda)
WHATSAPP_PHONE=52XXXXXXXXXX
```

---

## 8. Fases

### Fase 1 — MVP
- Auth completo (register, login, refresh, logout)
- Catálogo de animales y productos (GET públicos + admin CRUD)
- Citas (POST sin cuenta + GET/PATCH admin)
- Casos clínicos (GET público + admin CRUD)
- Upload de imágenes a S3
- WhatsApp link generator

### Fase 2
- Mascotas (`/pets`) y favoritos (`/favorites`)
- Endpoint de registro de device token
- Servicio de envío de push via Expo Push API
- Endpoint de promociones

### Fase 3
- Estadísticas (`/admin/stats/overview`)
- Niveles de staff (dueño vs. empleado dentro del role admin)
- Full-text search en catálogo y casos clínicos (PostgreSQL `tsvector`)

---

## 9. Despliegue

- **Docker** — imagen basada en `python:3.12-slim`, servidor ASGI con `uvicorn`
- **Coolify** — servicio separado al de la web, mismo servidor
- **URL de producción:** `api.terrariumstore.mx`
- **PostgreSQL** — puede correr en el mismo Coolify como servicio de base de datos
- **Migraciones** — `alembic upgrade head` se ejecuta como comando de inicio del contenedor antes de levantar el servidor
- **Documentación automática** — disponible en `api.terrariumstore.mx/docs` (Swagger UI, desactivar en producción o proteger con auth básico)
