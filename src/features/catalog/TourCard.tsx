import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { money } from "@/lib/format";
import { themeOf } from "@/services/catalogService";
import type { Tour } from "@/types";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="group relative overflow-hidden rounded-[1.45rem] border border-border/70 bg-card shadow-[0_14px_40px_rgba(26,45,48,.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(26,45,48,.14)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={tour.image}
          alt={`${tour.name}, ${tour.destination}`}
          loading="lazy"
          width={900}
          height={675}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/5" />

        <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/25 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
          {themeOf(tour)}
        </span>

        <span className="absolute bottom-4 right-4 rounded-2xl bg-white/94 px-4 py-2 text-right text-foreground shadow-lg backdrop-blur">
          <span className="block text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Desde</span>
          <span className="block text-base font-semibold">{money(tour.basePrice)}</span>
        </span>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 text-accent" />
            {tour.destination}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5 text-accent" />
            {tour.days} {tour.days === 1 ? "día" : "días"}
          </span>
        </div>

        <h3 className="mt-3 font-display text-[1.8rem] leading-[1.08] tracking-[-0.015em]">
          <Link
            to="/tours/$id"
            params={{ id: tour.id }}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {tour.name}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{tour.summary}</p>

        <div className="mt-5 flex items-center justify-between border-t pt-4 text-sm">
          <span className="font-medium text-foreground">Ver experiencia</span>
          <span className="grid size-9 place-items-center rounded-full bg-secondary text-secondary-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
