import { useQuery } from "@tanstack/react-query";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Check, Clock, MapPin, Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { DemoNote, EmptyState, ErrorState, LoadingState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { dateLabel, money } from "@/lib/format";
import { catalogService, themeOf } from "@/services/catalogService";
import type { Tour } from "@/types";
import { TourCard } from "./TourCard";

const route = getRouteApi("/tours/$id");

function BookingSummary({ tour }: { tour: Tour }) {
  const deps = useQuery({
    queryKey: ["departures", tour.id],
    queryFn: () => catalogService.listDepartures(tour.id),
  });
  const search = route.useSearch();
  const [depId, setDepId] = useState(search.fecha ? `${tour.id}-${search.fecha}` : "");
  const [travelers, setTravelers] = useState(search.viajeros ?? 2);
  const dep = deps.data?.find((d) => d.id === depId);
  const free = dep ? dep.capacity - dep.booked : 0;

  const reserve = () => {
    if (!dep) {
      toast.error("Selecciona una fecha de salida.");
      return;
    }
    if (travelers > free) {
      toast.error("No hay cupos suficientes para esa salida.");
      return;
    }
    toast.info("El flujo de reserva se habilita en la siguiente etapa de esta demo.", {
      description: `${tour.name} · ${dateLabel(dep.date)} · ${travelers} viajeros`,
    });
  };

  return (
    <div className="surface space-y-5 p-6">
      <p className="eyebrow">Planea tu experiencia</p>
      <div>
        <p className="text-xs text-muted-foreground">Desde · precio demo por viajero</p>
        <p className="font-mono text-3xl">{money(tour.basePrice)}</p>
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-medium">Salida</legend>
        {deps.isError && <ErrorState onRetry={() => deps.refetch()} />}
        {deps.isSuccess && deps.data.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No hay salidas disponibles para esta experiencia.
          </p>
        )}
        {deps.isPending ? (
          <p className="text-sm text-muted-foreground">Cargando salidas…</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {deps.data?.map((d) => {
              const left = d.capacity - d.booked;
              return (
                <button
                  key={d.id}
                  type="button"
                  disabled={left < travelers}
                  aria-pressed={depId === d.id}
                  onClick={() => setDepId(d.id)}
                  className="min-h-14 rounded-md border px-2 py-1.5 text-left text-sm disabled:opacity-45 aria-pressed:border-primary aria-pressed:ring-2 aria-pressed:ring-primary/20"
                >
                  <span className="block font-medium">{dateLabel(d.date)}</span>
                  <span className="text-xs text-muted-foreground">
                    {left === 0 ? "Agotado" : `${left} cupos demo`}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </fieldset>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium" id="trav">
          Viajeros
        </span>
        <div className="flex items-center gap-2" role="group" aria-labelledby="trav">
          <Button
            variant="outline"
            size="icon"
            className="size-11"
            aria-label="Quitar viajero"
            disabled={travelers <= 1}
            onClick={() => setTravelers((t) => t - 1)}
          >
            <Minus />
          </Button>
          <span className="w-8 text-center font-mono" aria-live="polite">
            {travelers}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="size-11"
            aria-label="Agregar viajero"
            disabled={travelers >= 12}
            onClick={() => setTravelers((t) => t + 1)}
          >
            <Plus />
          </Button>
        </div>
      </div>
      <div className="flex justify-between border-t pt-4 text-sm">
        <span>Total estimado</span>
        <span className="font-mono text-lg">{money(tour.basePrice * travelers)}</span>
      </div>
      <Button size="lg" className="h-12 w-full" onClick={reserve}>
        Consultar selección demo
      </Button>
      <DemoNote>
        El backend recalcula y valida el total antes de confirmar. Fechas y cupos son demostrativos.
      </DemoNote>
    </div>
  );
}

export function TourDetailPage() {
  const { id } = route.useParams();
  const q = useQuery({ queryKey: ["tour", id], queryFn: () => catalogService.getTour(id) });
  const related = useQuery({
    queryKey: ["related", id],
    enabled: !!q.data,
    queryFn: () => catalogService.related(q.data as Tour),
  });

  if (q.isPending)
    return (
      <div className="container-page py-14">
        <LoadingState count={3} label="Cargando experiencia" />
      </div>
    );
  if (q.isError)
    return (
      <div className="container-page py-14">
        <ErrorState onRetry={() => q.refetch()} />
      </div>
    );
  const tour = q.data;
  if (!tour)
    return (
      <div className="container-page py-14">
        <EmptyState
          title="Experiencia no disponible"
          description="Esta experiencia no existe o ya no está publicada."
          action={
            <Button asChild className="h-11">
              <Link to="/tours">Ver catálogo</Link>
            </Button>
          }
        />
      </div>
    );

  return (
    <>
      <section className="relative isolate min-h-[56vh] text-ink-foreground">
        <img
          src={tour.image}
          alt={`${tour.name}, ${tour.destination}`}
          width={1600}
          height={900}
          className="absolute inset-0 -z-10 h-full w-full"
        />
        <div className="hero-shade absolute inset-0 -z-10" />
        <div className="container-page flex min-h-[56vh] flex-col justify-end gap-4 pb-12 pt-10">
          <div className="[&_a]:text-ink-foreground/80 [&_span]:text-ink-foreground [&_nav]:text-ink-foreground/80">
            <Breadcrumbs
              items={[
                { label: "Inicio", to: "/" },
                { label: "Tours", to: "/tours" },
                { label: tour.name },
              ]}
            />
          </div>
          <p className="eyebrow text-amber">
            {themeOf(tour)} · {tour.kind === "package" ? "Paquete" : "Servicio"}
          </p>
          <h1 className="max-w-3xl font-display text-5xl leading-none md:text-7xl">{tour.name}</h1>
          <div className="flex flex-wrap gap-5 text-sm text-ink-foreground/85">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4" />
              {tour.destination}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" />
              {tour.days} {tour.days === 1 ? "día" : "días"}
            </span>
            <span className="font-mono">Desde {money(tour.basePrice)} (demo)</span>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1fr_380px]">
        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="font-display text-3xl">Descripción</h2>
            <p className="text-lg text-muted-foreground">{tour.summary}</p>
            <ul className="grid gap-2 sm:grid-cols-3">
              {tour.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-md bg-secondary px-3 py-3 text-sm text-secondary-foreground"
                >
                  {h}
                </li>
              ))}
            </ul>
          </section>
          <section className="space-y-5">
            <h2 className="font-display text-3xl">Itinerario</h2>
            <ol className="space-y-0 border-l pl-6">
              {tour.itinerary.map((s, i) => (
                <li key={s.title} className="relative pb-6">
                  <span
                    className="absolute -left-[33px] grid size-4 place-items-center rounded-full border-2 border-accent bg-background"
                    aria-hidden
                  />
                  <p className="font-mono text-xs text-muted-foreground">
                    {tour.days === 1 ? "Parada" : "Día"} {i + 1}
                  </p>
                  <h3 className="font-medium">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.detail}</p>
                </li>
              ))}
            </ol>
          </section>
          <section className="grid gap-6 md:grid-cols-2">
            <div className="surface p-6">
              <h2 className="mb-4 font-display text-2xl">Incluye</h2>
              <ul className="space-y-2 text-sm">
                {tour.includes.map((x) => (
                  <li key={x} className="flex gap-2">
                    <Check className="size-4 shrink-0 text-success" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface p-6">
              <h2 className="mb-4 font-display text-2xl">No incluye</h2>
              <ul className="space-y-2 text-sm">
                {tour.excludes.map((x) => (
                  <li key={x} className="flex gap-2">
                    <X className="size-4 shrink-0 text-destructive" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className="space-y-3">
            <h2 className="font-display text-3xl">Punto de encuentro</h2>
            <p className="flex gap-2 text-muted-foreground">
              <MapPin className="mt-1 size-4 shrink-0 text-accent" />
              {tour.meetingPoint}
            </p>
          </section>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Resumen de reserva">
          <BookingSummary key={tour.id} tour={tour} />
        </aside>
      </div>

      {related.data && related.data.length > 0 && (
        <section className="border-t bg-muted/40 py-14">
          <div className="container-page space-y-8">
            <h2 className="font-display text-4xl">También te puede interesar</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.data.map((t) => (
                <TourCard key={t.id} tour={t} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
