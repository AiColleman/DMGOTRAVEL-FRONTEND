# Frontend editorial de DMGOTRAVEL

## Alcance

Rediseño del frontend existente. Los requisitos de `AiColleman/DMGoTravell` se consultaron como referencia, sin modificar ese repositorio.

- Dirección visual: marfil, verde profundo, tipografía editorial y fotografía regional.
- Portada adaptable con Millpu como imagen principal, catálogo, destinos, alojamiento opcional y preguntas frecuentes.
- Fotografías locales con autoría y licencias en `/images/ayacucho/CREDITOS.html`.
- Búsqueda por destino, fecha y cantidad de viajeros; consulta las salidas y cupos de la demo.
- Los parámetros viajan en la URL y se conservan al abrir el detalle desde los resultados.
- Foco visible en tarjetas, controles etiquetados, navegación por teclado y respeto a movimiento reducido.
- Compilación sin descarga de fotografías: `prebuild` verifica los archivos locales.

## Trazabilidad y límites

| Requisitos | Cobertura |
|---|---|
| RF01, RF02 | Catálogo público, filtros, detalle, itinerario y salidas demostrativas. |
| RF17 | Catálogo hotelero existente y tarjetas visualmente coherentes. |
| RF18 | Se comunica que el alojamiento es opcional. La reserva compuesta sigue pendiente. |
| RF05–RF09, RF19, RF21–RF22 | Requieren backend: bloqueo de cupos, importes oficiales, Culqi, confirmación, correos y vencimientos. No se simulan como operaciones reales. |
| RF10–RF16, RF20, RF23–RF24 | No se implementan en este rediseño. Cuenta completa, administración, auditoría y multimedia R2 siguen pendientes. |

Las salidas demo existentes corresponden a noviembre y diciembre de 2026. Una fecha sin salida muestra resultados vacíos; no se inventa disponibilidad. Los hoteles y precios son referenciales. La fotografía de una casona no implica que exista allí el hotel ficticio.

## Verificación

```bash
bun install --frozen-lockfile
bun run typecheck
bun run test
NITRO_PRESET=vercel bun run build
```

Se añadieron pruebas de fechas inválidas, grupos, disponibilidad por salida y conservación del orden de precios. CI ejecuta pruebas, tipos y build también en pull requests.

La compilación Vercel se verificó localmente. La verificación visual en navegador queda pendiente; este entorno no dispone del controlador de navegador requerido. El despliegue de producción no se considera verificado por una compilación local.

## Integración futura

Los componentes conservan los adaptadores `src/services`. El contrato definitivo de filtros `fecha` y `viajeros` debe acordarse con la API ASP.NET Core. El servidor será responsable de autorizar usuarios, recalcular importes y bloquear inventario transaccionalmente; el filtrado cliente no garantiza disponibilidad.
