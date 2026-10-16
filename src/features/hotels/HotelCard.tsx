import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import { money } from "@/lib/format";
import type { HotelWithRooms } from "@/services/hotelService";

export function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${n} estrellas (demo)`}>
      {Array.from({ length: n }, (_, i) => (
        <Star key={i} aria-hidden className="size-3.5 fill-amber text-amber" />
      ))}
    </span>
  );
}

export function HotelCard({ hotel }: { hotel: HotelWithRooms }) {
  return (
    <article className="group relative overflow-hidden rounded-[1.45rem] border border-border/70 bg-card shadow-[0_14px_40px_rgba(26,45,48,.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(26,45,48,.14)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={hotel.image}
          alt={hotel.name}
          loading="lazy"
          width={900}
          height={600}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
          <span className="inline-flex items-center gap-1.5 text-sm">
            <MapPin className="size-4 text-amber" />
            {hotel.destination}
          </span>
          <span className="rounded-full bg-black/25 px-3 py-1.5 backdrop-blur">
            <Stars n={hotel.stars} />
          </span>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <h3 className="font-display text-[1.8rem] leading-[1.08] tracking-[-0.015em]">
          <Link
            to="/hotels/$id"
            params={{ id: hotel.id }}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {hotel.name}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{hotel.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <li
              key={amenity}
              className="rounded-full border border-border/80 bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground"
            >
              {amenity}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-end justify-between border-t pt-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Desde · noche demo</p>
            <p className="mt-1 text-lg font-semibold">{money(hotel.fromRate)}</p>
          </div>
          <span className="grid size-9 place-items-center rounded-full bg-secondary text-secondary-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
