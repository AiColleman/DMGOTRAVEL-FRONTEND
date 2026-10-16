import { Link } from "@tanstack/react-router";
import { MapPin, Star } from "lucide-react";
import { money } from "@/lib/format";
import type { HotelWithRooms } from "@/services/hotelService";

export function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${n} estrellas (demo)`}>
      {Array.from({ length: n }, (_, i) => <Star key={i} aria-hidden className="size-3.5 fill-amber text-amber" />)}
    </span>
  );
}

export function HotelCard({ hotel }: { hotel: HotelWithRooms }) {
  return (
    <article className="group relative grid overflow-hidden rounded-lg border bg-card shadow-soft transition-shadow hover:shadow-lift sm:grid-cols-[2fr_3fr]">
      <div className="aspect-[4/3] overflow-hidden bg-muted sm:aspect-auto">
        <img src={hotel.image} alt={hotel.name} loading="lazy" width={700} height={520} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" />{hotel.destination}</span>
          <Stars n={hotel.stars} />
        </div>
        <h3 className="font-display text-2xl leading-tight">
          <Link to="/hotels/$id" params={{ id: hotel.id }} className="after:absolute after:inset-0 focus-visible:outline-none">{hotel.name}</Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{hotel.summary}</p>
        <ul className="flex flex-wrap gap-1.5">
          {hotel.amenities.slice(0, 4).map((a) => <li key={a} className="rounded-sm bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{a}</li>)}
        </ul>
        <div className="mt-auto border-t pt-3">
          <p className="text-xs text-muted-foreground">Desde · por noche (demo)</p>
          <p className="font-mono text-lg">{money(hotel.fromRate)}</p>
        </div>
      </div>
    </article>
  );
}