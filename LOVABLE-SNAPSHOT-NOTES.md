# DMGOTRAVEL Frontend — evolución del snapshot de Lovable

- Proyecto fuente: `DMG TRAVEL: Premium Peru`
- Lovable project ID: `915f214c-1d3e-4833-977e-3f247759b299`
- Snapshot importado originalmente desde: `5d898e9664974d091a7bb03a3402e656d148229e`
- Repositorio actual: `AiColleman/DMGOTRAVEL-FRONTEND`

## Estado actual

El snapshot ya fue estabilizado fuera de Lovable:

- TypeScript corregido.
- Build de producción validado por GitHub Actions.
- Catálogo demo regionalizado a Ayacucho.
- Assets visuales reemplazados por ilustraciones SVG locales.
- Google Fonts removido: se utilizan fuentes del sistema.
- No se cargan imágenes desde URLs externas en runtime.

## Assets regionales locales

```text
src/assets/
├── hero-ayacucho.svg
├── ayacucho.svg
├── millpu.svg
├── quinua.svg
├── wari.svg
├── vilcashuaman.svg
├── huanta.svg
└── hotel-ayacucho.svg
```

Los datos y precios siguen siendo demostrativos hasta conectar la futura API ASP.NET Core mediante `VITE_API_BASE_URL`.
