# DMGOTRAVEL FRONTEND

Frontend independiente de **DMGOTRAVEL**, con una experiencia turística demo centrada visualmente en la región de **Ayacucho, Perú**.

## Stack

- React + TypeScript + Vite
- TanStack Router
- TanStack Query
- Tailwind CSS
- shadcn/ui
- Bun

## Enfoque regional

El contenido demo utiliza destinos de Ayacucho:

- Huamanga / Ayacucho
- Millpu
- Quinua
- Wari
- Vilcashuamán
- Huanta

Las fotografías de Ayacucho son **JPEG locales incluidos en el repositorio**. El build y la navegación no descargan imágenes de terceros ni fuentes de Google Fonts. Autorías y licencias: [créditos fotográficos](public/images/ayacucho/CREDITOS.html).

Consulta el [alcance del rediseño y trazabilidad de requisitos](docs-premium-frontend.md).

## Arquitectura de integración

El frontend permanece desacoplado. La futura integración con backend pasa por:

```env
VITE_API_BASE_URL=https://api.dmgotravel.com
```

React no accede directamente a PostgreSQL/Supabase.

## Desarrollo local

```bash
bun install
bun run dev
```

## Validación

```bash
bun run typecheck
bun run test
NITRO_PRESET=vercel bun run build
```

GitHub Actions ejecuta ambas validaciones automáticamente en cada push a `main` y en los pull requests.

## Estado funcional actual

Implementado:

- Home pública
- catálogo y detalle de tours
- catálogo y detalle de hoteles
- Nosotros
- Login demo
- Registro demo
- Recuperación de contraseña demo
- base de cuenta de cliente
- services desacoplados y mocks tipados

Pendiente para siguientes etapas:

- flujo completo de reserva
- checkout Culqi real
- cuenta de cliente completa
- panel administrativo
- conexión con ASP.NET Core
