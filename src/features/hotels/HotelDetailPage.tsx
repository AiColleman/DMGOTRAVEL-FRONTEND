import { useQuery } from "@tanstack/react-query";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Check, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { DemoNote, EmptyState, ErrorState, LoadingState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { addDays, money, nightsBetween } from "@/lib/format";
import { hotelService } from "@/services/hotelService";
import { Stars } from "./HotelCard";

const route = getRouteApi("/hotels/$id");

export function HotelDetailPage() {
  const { id } = route.useParams();
  const q = useQuery({ queryKey: ["hotel", id], queryFn: () => hotelService.getHotel(id) });
  const [checkIn, setCheckIn] = useState("2026-11-14");
  const [checkOut, setCheckOut] = useState("2026-11-17");
  const valid = checkOut > checkIn;
  const avail = useQuery({ queryKey: ["avail", id, checkIn, checkOut], enabled: valid, queryFn: () => hotelService.availability(id, checkIn, checkOut) });
  const nights = nightsBetween(checkIn, checkOut);

  if (q.isPending) return <div className="container-page py-14"><LoadingState count={2} label="Cargando hotel" /></div>;
  if (q.isError) return <div className="container-page py-14"><ErrorState onRetry={() => q.refetch()} /></div>;
  const hotel = q.data;
  if (!hotel) return (
    <div className="container-page py-14">
      <EmptyState title="Hotel no disponible" description="Este alojamiento no existe o ya no está publicado." action={<Button asChild className="h-11"><Link to="/hotels">Ver hoteles</Link></Button>} />
    </div>
  );

  return (
    <>
      <section className="relative isolate min-h-[50vh] text-ink-foreground">
        <img src={hotel.image} alt={hotel.name} width={1600} height={900} className="absolute inset-0 -z-10 h-full w-full" />
        <div className="hero-shade absolute inset-0 -z-10" />
        <div className="container-page flex min-h-[50vh] flex-col justify-end gap-4 pb-12 pt-10">
          <div className="[&_a]:text-ink-foreground/80 [&_span]:text-ink-foreground [&_nav]:text-ink-foreground/80">
            <Breadcrumbs items={[{ label: "Inicio", to: "/" }, { label: "Hoteles", to: "/hotels" }, { label: hotel.name }]} />
          </div>
          <Stars n={hotel.stars} />
          <h1 className="font-display text-5xl leading-none md:text-7xl">{hotel.name}</h1>
          <p className="flex items-center gap-1.5 text-sm text-ink-foreground/85"><MapPin className="size-4" />{hotel.address} · dirección demo</p>
        </div>
      </section>

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1fr_340px]">
        <div className="space-y-10">
          <section className="space-y-4">
            <p className="text-lg text-muted-foreground">{hotel.summary}</p>
            <h2 className="font-display text-3xl">Servicios</h2>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {hotel.amenities.map((a) => <li key={a} className="flex items-center gap-2 rounded-md border px-3 py-2.5 text-sm"><Check className="size-4 text-success" />{a}</li>)}
            </ul>
          </section>
          <section className="space-y-4">
            <h2 className="font-display text-3xl">Habitaciones</h2>
            <ul className="space-y-3">
              {hotel.rooms.map((r) => {
                const left = avail.data?.[r.id];
                const soldOut = left === 0;
                return (
                  <li key={r.id} className="surface flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-medium">{r.name}</h3>
                      <p className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Users className="size-3.5" />Hasta {r.capacity}</span>
                        <span>{avail.isFetching ? "Consultando…" : !valid ? "Fechas inválidas" : soldOut ? "Sin disponibilidad" : `${left} disponibles (demo)`}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-mono text-lg">{money(r.nightlyRate)}</p>
                        <p className="text-xs text-muted-foreground">por noche</p>
                      </div>
                      <Button className="h-11" disabled={!valid || soldOut || avail.isFetching}
                        onClick={() => toast.info("La selección de alojamiento se habilita junto al flujo de reserva.", { description: `${r.name} · ${nights} noches · ${money(r.nightlyRate * nights)} estimado` })}>
                        Seleccionar alojamiento
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="surface space-y-4 p-6">
            <h2 className="font-display text-2xl">Tus fechas</h2>
            <label className="block space-y-1 text-sm"><span className="font-medium">Entrada</span>
              <input type="date" className="field-input" value={checkIn} min="2026-11-01" max="2026-12-14" onChange={(e) => { setCheckIn(e.target.value); if (e.target.value >= checkOut) setCheckOut(addDays(e.target.value, 1)); }} />
            </label>
            <label className="block space-y-1 text-sm"><span className="font-medium">Salida</span>
              <input type="date" className="field-input" aria-invalid={!valid} value={checkOut} min={addDays(checkIn, 1)} max="2026-12-15" onChange={(e) => setCheckOut(e.target.value)} />
            </label>
            <p className="text-sm text-muted-foreground">{valid ? `${nights} ${nights === 1 ? "noche" : "noches"}` : "La salida debe ser posterior a la entrada."}</p>
          </div>
          <DemoNote>Datos demostrativos. Tarifas y disponibilidad las confirma el servidor; el hotel siempre es opcional en tu reserva.</DemoNote>
        </aside>
      </div>
    </>
  );
}