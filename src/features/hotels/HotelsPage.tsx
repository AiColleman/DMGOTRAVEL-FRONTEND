import { useQuery } from "@tanstack/react-query";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { DemoNote, EmptyState, ErrorState, LoadingState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { DESTINATIONS } from "@/services/catalogService";
import { hotelService, type HotelFilters } from "@/services/hotelService";
import { HotelCard } from "./HotelCard";

const route = getRouteApi("/hotels/");

export function HotelsPage() {
  const search = route.useSearch();
  const navigate = route.useNavigate();
  const update = (v: Partial<HotelFilters>) => navigate({ to: ".", search: (prev) => ({ ...prev, ...v }), replace: true });
  const q = useQuery({ queryKey: ["hotels", search], queryFn: () => hotelService.listHotels(search) });

  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumbs items={[{ label: "Inicio", to: "/" }, { label: "Hoteles" }]} />
      <header className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-2xl space-y-3">
          <p className="eyebrow">Alojamiento opcional</p>
          <h1 className="font-display text-5xl leading-none md:text-6xl">Hoteles seleccionados</h1>
          <p className="text-muted-foreground">Tu experiencia primero. El alojamiento, solo si lo quieres.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="space-y-1 text-sm">
            <span className="block font-medium">Destino</span>
            <select className="field-input w-44" value={search.destino ?? ""} onChange={(e) => update({ destino: (e.target.value || undefined) as HotelFilters["destino"] })}>
              <option value="">Todos</option>
              {DESTINATIONS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>
          <label className="space-y-1 text-sm">
            <span className="block font-medium">Precio máx./noche</span>
            <select className="field-input w-44" value={search.max ?? ""} onChange={(e) => update({ max: e.target.value ? Number(e.target.value) : undefined })}>
              <option value="">Sin límite</option>
              <option value="300">Hasta S/ 300</option>
              <option value="400">Hasta S/ 400</option>
              <option value="600">Hasta S/ 600</option>
            </select>
          </label>
        </div>
      </header>
      <div className="mt-6"><DemoNote>Estrellas, tarifas y disponibilidad son demostrativas. El inventario real se valida por noche en el servidor.</DemoNote></div>
      <section className="mt-8" aria-live="polite">
        <p className="mb-4 text-sm text-muted-foreground">{q.isSuccess ? `${q.data.length} ${q.data.length === 1 ? "hotel" : "hoteles"}` : "Buscando…"}</p>
        {q.isPending && <LoadingState count={4} label="Cargando hoteles" />}
        {q.isError && <ErrorState onRetry={() => q.refetch()} />}
        {q.isSuccess && q.data.length === 0 && (
          <EmptyState title="Sin hoteles para ese filtro" description="Prueba con otro destino o un precio mayor." action={<Button asChild variant="outline" className="h-11"><Link to="/hotels">Limpiar filtros</Link></Button>} />
        )}
        {q.isSuccess && q.data.length > 0 && <div className="grid gap-6 lg:grid-cols-2">{q.data.map((h) => <HotelCard key={h.id} hotel={h} />)}</div>}
      </section>
    </div>
  );
}