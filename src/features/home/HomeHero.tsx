import { Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { images } from "@/mocks/data";
import { DESTINATIONS, TOUR_THEMES } from "@/services/catalogService";
import type { Destination } from "@/types";

export function HomeHero() {
  const navigate = useNavigate();
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [viajeros, setViajeros] = useState(2);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/tours", search: { destino: (destino || undefined) as Destination | undefined } });
  };

  return (
    <section className="relative isolate overflow-hidden text-ink-foreground">
      <img src={images.andes} alt="Montañas de los Andes peruanos al amanecer" width={1920} height={1080} className="absolute inset-0 -z-10 h-full w-full" />
      <div className="hero-shade absolute inset-0 -z-10" />
      <div className="container-page flex min-h-[88vh] flex-col justify-end gap-8 pb-14 pt-24">
        <div className="max-w-3xl space-y-5">
          <p className="eyebrow text-amber">Agencia y operadora turística · Perú</p>
          <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl md:text-8xl">Viajes que se sienten mucho antes de partir.</h1>
          <p className="max-w-xl text-lg text-ink-foreground/85">Ayacucho, Cusco, Arequipa, Lima y Millpu con guías locales, reservas claras y el alojamiento solo si lo quieres.</p>
        </div>
        <form onSubmit={submit} className="grid gap-3 rounded-lg bg-card p-3 text-foreground shadow-lift md:grid-cols-[1.3fr_1fr_0.8fr_auto]" aria-label="Buscar experiencias">
          <label className="space-y-1 px-2"><span className="text-xs font-medium text-muted-foreground">Destino</span>
            <select className="field-input border-0 px-0 shadow-none" value={destino} onChange={(e) => setDestino(e.target.value)}>
              <option value="">Todos los destinos</option>
              {DESTINATIONS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>
          <label className="space-y-1 px-2 md:border-l"><span className="text-xs font-medium text-muted-foreground">Fecha</span>
            <input type="date" className="field-input border-0 px-0 shadow-none" value={fecha} min="2026-11-01" onChange={(e) => setFecha(e.target.value)} />
          </label>
          <label className="space-y-1 px-2 md:border-l"><span className="text-xs font-medium text-muted-foreground">Viajeros</span>
            <input type="number" min={1} max={12} className="field-input border-0 px-0 shadow-none" value={viajeros} onChange={(e) => setViajeros(Math.max(1, Math.min(12, Number(e.target.value) || 1)))} />
          </label>
          <Button type="submit" size="lg" className="h-14 px-8"><Search /> Buscar</Button>
        </form>
        <ul className="flex flex-wrap gap-2" aria-label="Explorar por categoría">
          {TOUR_THEMES.map((t) => (
            <li key={t}>
              <Link to="/tours" search={{ categoria: t }} className="inline-flex min-h-11 items-center rounded-full border border-ink-foreground/35 px-4 text-sm hover:bg-ink-foreground hover:text-ink">{t}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}