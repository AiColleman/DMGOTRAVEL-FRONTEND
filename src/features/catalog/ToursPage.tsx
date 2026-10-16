import { useQuery } from "@tanstack/react-query";
import { getRouteApi, Link } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { EmptyState, ErrorState, LoadingState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  catalogService,
  DESTINATIONS,
  TOUR_THEMES,
  type TourFilters,
} from "@/services/catalogService";
import { TourCard } from "./TourCard";

import { todayInPeru } from "@/lib/travel-search";

const route = getRouteApi("/tours/");

function Filters({
  value,
  onChange,
}: {
  value: TourFilters;
  onChange: (v: Partial<TourFilters>) => void;
}) {
  return (
    <div className="space-y-6">
      <label className="block space-y-2">
        <span className="text-sm font-medium">Fecha de salida</span>
        <input
          className="field-input"
          type="date"
          min={todayInPeru()}
          value={value.fecha ?? ""}
          onChange={(e) => onChange({ fecha: e.target.value || undefined })}
        />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium">Viajeros</span>
        <select
          className="field-input"
          value={value.viajeros ?? ""}
          onChange={(e) =>
            onChange({ viajeros: e.target.value ? Number(e.target.value) : undefined })
          }
        >
          <option value="">Cualquier grupo</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} {i === 0 ? "persona" : "personas"}
            </option>
          ))}
        </select>
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium">Destino</span>
        <select
          className="field-input"
          value={value.destino ?? ""}
          onChange={(e) =>
            onChange({ destino: (e.target.value || undefined) as TourFilters["destino"] })
          }
        >
          <option value="">Todos</option>
          {DESTINATIONS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </label>
      <fieldset className="space-y-2">
        <legend className="mb-2 text-sm font-medium">Categoría</legend>
        <div className="flex flex-wrap gap-2">
          {[undefined, ...TOUR_THEMES].map((t) => (
            <button
              key={t ?? "all"}
              type="button"
              aria-pressed={value.categoria === t}
              onClick={() => onChange({ categoria: t })}
              className="min-h-10 rounded-md border px-3 text-sm aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground"
            >
              {t ?? "Todas"}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="block space-y-2">
        <span className="flex justify-between text-sm font-medium">
          Precio máximo{" "}
          <span className="font-mono text-muted-foreground">S/ {value.max ?? 1500}</span>
        </span>
        <input
          type="range"
          min={150}
          max={1500}
          step={50}
          value={value.max ?? 1500}
          className="w-full accent-[var(--accent)]"
          onChange={(e) =>
            onChange({ max: Number(e.target.value) >= 1500 ? undefined : Number(e.target.value) })
          }
        />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium">Duración</span>
        <select
          className="field-input"
          value={value.duracion ?? ""}
          onChange={(e) =>
            onChange({ duracion: (e.target.value || undefined) as TourFilters["duracion"] })
          }
        >
          <option value="">Cualquiera</option>
          <option value="1">1 día</option>
          <option value="2-3">2 a 3 días</option>
          <option value="4+">4 días o más</option>
        </select>
      </label>
    </div>
  );
}

export function ToursPage() {
  const search = route.useSearch();
  const navigate = route.useNavigate();
  const update = (v: Partial<TourFilters>) =>
    navigate({ to: ".", search: (prev) => ({ ...prev, ...v }), replace: true });
  const query = useQuery({
    queryKey: ["tours", search],
    queryFn: () => catalogService.listTours(search),
  });
  const hasFilters = !!(
    search.destino ||
    search.categoria ||
    search.max ||
    search.duracion ||
    search.fecha ||
    search.viajeros
  );

  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumbs items={[{ label: "Inicio", to: "/" }, { label: "Tours" }]} />
      <header className="mt-6 max-w-2xl space-y-3">
        <p className="eyebrow">Catálogo</p>
        <h1 className="font-display text-5xl leading-none md:text-6xl">Experiencias en Ayacucho</h1>
        <p className="text-muted-foreground">
          Caminos ancestrales, cultura viva y paisajes que sorprenden. Encuentra una experiencia a
          tu medida. Precios y cupos demostrativos.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block" aria-label="Filtros">
          <div className="sticky top-24 surface p-5">
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest">
              Tu viaje, a tu manera
            </p>
            <Filters value={search} onChange={update} />
            {hasFilters && (
              <Button asChild variant="ghost" className="mt-5 w-full">
                <Link to="/tours">Limpiar filtros</Link>
              </Button>
            )}
          </div>
        </aside>
        <section aria-live="polite">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {query.isSuccess
                ? `${query.data.length} ${query.data.length === 1 ? "experiencia" : "experiencias"}`
                : "Buscando…"}
            </p>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-11 lg:hidden">
                    <SlidersHorizontal /> Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="max-h-[85vh] overflow-y-auto bg-background p-6"
                >
                  <SheetHeader className="px-0">
                    <SheetTitle>Filtrar experiencias</SheetTitle>
                  </SheetHeader>
                  <Filters value={search} onChange={update} />
                </SheetContent>
              </Sheet>
              <label className="flex items-center gap-2 text-sm">
                <span className="sr-only sm:not-sr-only">Ordenar</span>
                <select
                  className="field-input w-auto"
                  value={search.orden ?? "recomendado"}
                  onChange={(e) => update({ orden: e.target.value as TourFilters["orden"] })}
                >
                  <option value="recomendado">Recomendado</option>
                  <option value="precio-asc">Precio: menor a mayor</option>
                  <option value="precio-desc">Precio: mayor a menor</option>
                </select>
              </label>
            </div>
          </div>
          {query.isPending && <LoadingState count={6} label="Cargando experiencias" />}
          {query.isError && <ErrorState onRetry={() => query.refetch()} />}
          {query.isSuccess && query.data.length === 0 && (
            <EmptyState
              title="Sin resultados"
              description="No encontramos experiencias con esos filtros. Prueba otra fecha, reduce el grupo o amplía el destino."
              action={
                hasFilters ? (
                  <Button asChild variant="outline" className="h-11">
                    <Link to="/tours">Limpiar filtros</Link>
                  </Button>
                ) : undefined
              }
            />
          )}
          {query.isSuccess && query.data.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {query.data.map((t) => (
                <TourCard
                  key={t.id}
                  tour={t}
                  search={{ fecha: search.fecha, viajeros: search.viajeros }}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
