import { Link } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";
import { money } from "@/lib/format";
import { themeOf } from "@/services/catalogService";
import type { Tour } from "@/types";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border bg-card shadow-soft transition-shadow hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img src={tour.image} alt={`${tour.name}, ${tour.destination}`} loading="lazy" width={800} height={600} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]" />
        <span className="absolute left-3 top-3 rounded-sm bg-card/95 px-2.5 py-1 text-xs font-medium">{themeOf(tour)}</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" />{tour.destination}</span>
          <span className="inline-flex items-center gap-1"><Clock className="size-3.5" />{tour.days} {tour.days === 1 ? "día" : "días"}</span>
        </div>
        <h3 className="font-display text-2xl leading-tight">
          <Link to="/tours/$id" params={{ id: tour.id }} className="after:absolute after:inset-0 focus-visible:outline-none">
            {tour.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{tour.summary}</p>
        <div className="mt-auto flex items-end justify-between border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Desde · precio demo</p>
            <p className="font-mono text-lg font-medium">{money(tour.basePrice)}</p>
          </div>
          <span className="text-sm font-medium text-accent">Ver detalle →</span>
        </div>
      </div>
    </article>
  );
}