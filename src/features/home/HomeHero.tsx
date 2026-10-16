import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, MapPin, Search, ShieldCheck, Users } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { images } from "@/mocks/data";
import { DESTINATIONS } from "@/services/catalogService";
import type { Destination } from "@/types";

export function HomeHero() {
  const navigate = useNavigate();
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [viajeros, setViajeros] = useState(2);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/tours",
      search: { destino: (destino || undefined) as Destination | undefined },
    });
  };

  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <img
        src={images.andes}
        alt="Plaza Mayor de Ayacucho"
        width={1800}
        height={1050}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,28,36,.92)_0%,rgba(8,28,36,.74)_38%,rgba(8,28,36,.28)_72%,rgba(8,28,36,.18)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-ink/70 to-transparent" />

      <div className="container-page flex min-h-[calc(100vh-72px)] flex-col justify-between pb-8 pt-20 md:pb-10 md:pt-28">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
            <MapPin className="size-4 text-amber" />
            Ayacucho · Perú
          </div>

          <h1 className="max-w-4xl font-display text-5xl leading-[0.96] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[5.7rem]">
            Descubre Ayacucho
            <span className="block text-white/72">con otra mirada.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/82 sm:text-lg md:text-xl">
            Cultura viva, paisajes andinos y rutas con identidad local. Diseña una experiencia clara,
            flexible y acompañada desde Huamanga hacia los lugares que hacen única a la región.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 rounded-full bg-white px-6 text-ink hover:bg-white/90">
              <Link to="/tours">
                Explorar experiencias <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/35 bg-white/8 px-6 text-white hover:bg-white hover:text-ink"
            >
              <Link to="/hotels">Ver alojamientos</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/74">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-amber" /> Reserva clara
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-amber" /> Rutas locales
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="size-4 text-amber" /> Acompañamiento humano
            </span>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="mt-14 grid gap-2 rounded-[1.4rem] border border-white/20 bg-white/96 p-2.5 text-foreground shadow-[0_24px_80px_rgba(0,0,0,.28)] backdrop-blur md:grid-cols-[1.3fr_1fr_.8fr_auto]"
          aria-label="Buscar experiencias"
        >
          <label className="group flex min-h-[72px] items-center gap-3 rounded-2xl px-4 transition-colors hover:bg-muted/60">
            <MapPin className="size-5 shrink-0 text-accent" />
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Destino
              </span>
              <select
                className="mt-1 w-full appearance-none bg-transparent text-sm font-medium outline-none"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
              >
                <option value="">Toda la región</option>
                {DESTINATIONS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </span>
          </label>

          <label className="flex min-h-[72px] items-center gap-3 rounded-2xl px-4 transition-colors hover:bg-muted/60 md:border-l">
            <CalendarDays className="size-5 shrink-0 text-accent" />
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Fecha
              </span>
              <input
                type="date"
                className="mt-1 w-full bg-transparent text-sm font-medium outline-none"
                value={fecha}
                min="2026-11-01"
                onChange={(e) => setFecha(e.target.value)}
              />
            </span>
          </label>

          <label className="flex min-h-[72px] items-center gap-3 rounded-2xl px-4 transition-colors hover:bg-muted/60 md:border-l">
            <Users className="size-5 shrink-0 text-accent" />
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Viajeros
              </span>
              <input
                type="number"
                min={1}
                max={12}
                className="mt-1 w-full bg-transparent text-sm font-medium outline-none"
                value={viajeros}
                onChange={(e) => setViajeros(Math.max(1, Math.min(12, Number(e.target.value) || 1)))}
              />
            </span>
          </label>

          <Button type="submit" size="lg" className="h-[72px] rounded-2xl px-7 text-base">
            <Search className="size-5" />
            Buscar
          </Button>
        </form>
      </div>
    </section>
  );
}
