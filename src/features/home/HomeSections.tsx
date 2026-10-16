import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  HeartHandshake,
  MapPinned,
  ReceiptText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ErrorState, LoadingState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { TourCard } from "@/features/catalog/TourCard";
import { HotelCard } from "@/features/hotels/HotelCard";
import { destinationImages, images } from "@/mocks/data";
import { catalogService } from "@/services/catalogService";
import { hotelService } from "@/services/hotelService";
import type { Destination } from "@/types";

export function FeaturedTours() {
  const q = useQuery({ queryKey: ["tours", {}], queryFn: () => catalogService.listTours() });

  return (
    <section className="bg-background py-24 md:py-28">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">Experiencias seleccionadas</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-[-0.025em] sm:text-5xl md:text-6xl">
              Rutas que conectan con
              <span className="block text-muted-foreground">el verdadero Ayacucho.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Cultura, historia y naturaleza en itinerarios demo pensados para mostrar cómo se sentirá
              la experiencia final de DMGOTRAVEL.
            </p>
          </div>
          <Button asChild variant="outline" className="h-12 rounded-full px-6">
            <Link to="/tours">
              Ver todas las experiencias <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12">
          {q.isPending && <LoadingState />}
          {q.isError && <ErrorState onRetry={() => q.refetch()} />}
          {q.data && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {q.data.slice(0, 3).map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const featuredDestinations: Array<{
  name: Destination;
  kicker: string;
  description: string;
  className: string;
}> = [
  {
    name: "Ayacucho",
    kicker: "Ciudad & cultura",
    description: "Arquitectura colonial, arte popular y vida urbana andina.",
    className: "md:col-span-7 md:row-span-2",
  },
  {
    name: "Millpu",
    kicker: "Naturaleza",
    description: "Pozas turquesa y quebradas de altura.",
    className: "md:col-span-5",
  },
  {
    name: "Quinua",
    kicker: "Historia",
    description: "Memoria, artesanía y la Pampa de Ayacucho.",
    className: "md:col-span-5",
  },
];

export function Destinations() {
  return (
    <section className="bg-ink py-24 text-ink-foreground md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow text-amber">Territorio ayacuchano</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-[-0.02em] sm:text-5xl md:text-6xl">
              Cada ruta cuenta
              <span className="block text-white/58">una historia diferente.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/62 md:text-base">
            Explora una selección visual de destinos. Los precios y disponibilidades mostrados en el
            prototipo son demostrativos.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[245px] gap-4 md:grid-cols-12 md:auto-rows-[230px]">
          {featuredDestinations.map((destination) => (
            <Link
              key={destination.name}
              to="/tours"
              search={{ destino: destination.name }}
              className={`group relative overflow-hidden rounded-[1.5rem] ${destination.className}`}
            >
              <img
                src={destinationImages[destination.name]}
                alt={destination.name}
                loading="lazy"
                width={1000}
                height={760}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/20 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-7">
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-amber">
                    {destination.kicker}
                  </span>
                  <span className="mt-2 block font-display text-3xl leading-none md:text-4xl">
                    {destination.name}
                  </span>
                  <span className="mt-2 block max-w-md text-sm text-white/70">
                    {destination.description}
                  </span>
                </span>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur transition group-hover:bg-white group-hover:text-ink">
                  <ArrowUpRight className="size-5" />
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
          <span className="mr-1 text-white/50">También puedes explorar:</span>
          {(["Wari", "Vilcashuamán", "Huanta"] as Destination[]).map((destination) => (
            <Link
              key={destination}
              to="/tours"
              search={{ destino: destination }}
              className="rounded-full border border-white/18 px-4 py-2 text-white/78 transition hover:border-white/40 hover:bg-white/8 hover:text-white"
            >
              {destination}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const benefits = [
  {
    Icon: MapPinned,
    title: "Conocimiento local",
    text: "Rutas construidas alrededor de lugares, historias y ritmos propios de Ayacucho.",
  },
  {
    Icon: ReceiptText,
    title: "Reserva sin sorpresas",
    text: "Qué incluye, qué no incluye y cuánto cuesta: visible antes de confirmar.",
  },
  {
    Icon: ShieldCheck,
    title: "Pago protegido",
    text: "La arquitectura está preparada para Culqi sin almacenar datos sensibles de tarjeta.",
  },
  {
    Icon: HeartHandshake,
    title: "Acompañamiento humano",
    text: "Una experiencia diseñada para mantener contacto claro antes, durante y después del viaje.",
  },
];

export function Benefits() {
  return (
    <section className="overflow-hidden bg-[#efe8dc] py-24 md:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow">Nuestra forma de viajar</p>
          <h2 className="mt-4 max-w-xl font-display text-4xl leading-[1.02] tracking-[-0.025em] sm:text-5xl">
            Menos fricción.
            <span className="block text-muted-foreground">Más territorio.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            DMGOTRAVEL busca que la tecnología desaparezca cuando no la necesitas y aparezca justo
            cuando hace falta: para informarte, reservar y darte tranquilidad.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 text-sm shadow-soft">
            <Sparkles className="size-5 text-accent" />
            <span>
              Diseño del prototipo enfocado en <strong>Ayacucho</strong>.
            </span>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {benefits.map(({ Icon, title, text }) => (
            <li
              key={title}
              className="rounded-[1.35rem] border border-white/70 bg-white/72 p-6 shadow-[0_18px_50px_rgba(41,50,45,.06)] backdrop-blur"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function RecommendedHotels() {
  const q = useQuery({ queryKey: ["hotels", {}], queryFn: () => hotelService.listHotels() });

  return (
    <section className="bg-background py-24 md:py-28">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow">Alojamiento opcional</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-[-0.02em] sm:text-5xl">
              Duerme bien.
              <span className="block text-muted-foreground">Viaja a tu manera.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:items-end">
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              El alojamiento se añade solo si lo necesitas. En esta demo mostramos opciones
              referenciales inspiradas en la identidad arquitectónica de la región.
            </p>
            <Button asChild variant="outline" className="h-12 rounded-full px-6">
              <Link to="/hotels">
                Ver alojamientos <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12">
          {q.isPending && <LoadingState count={2} />}
          {q.isError && <ErrorState onRetry={() => q.refetch()} />}
          {q.data && (
            <div className="grid gap-6 lg:grid-cols-2">
              {q.data.slice(0, 2).map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote: "Todo estaba claro desde el inicio: horarios, precio referencial y qué incluía la ruta.",
    name: "Valeria",
    place: "Experiencia demo · Huamanga",
    initials: "VD",
  },
  {
    quote: "Poder elegir el tour primero y decidir el alojamiento después hace que la reserva se sienta mucho más simple.",
    name: "Mateo",
    place: "Experiencia demo · Millpu",
    initials: "MD",
  },
];

export function Testimonials() {
  return (
    <section className="border-y border-border/70 bg-card py-24 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Experiencia de usuario</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
            Diseñado para sentirse claro desde el primer clic.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Testimonios ficticios utilizados únicamente para demostrar la interfaz.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="rounded-[1.4rem] border bg-background p-7 shadow-soft md:p-8"
            >
              <blockquote className="font-display text-2xl leading-snug md:text-3xl">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t pt-5">
                <span className="grid size-10 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {testimonial.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{testimonial.name}</span>
                  <span className="block text-xs text-muted-foreground">{testimonial.place}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="bg-background py-24">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-ink px-7 py-16 text-white shadow-lift sm:px-10 md:px-16 md:py-20">
          <img
            src={images.quinua}
            alt="Pampa de Ayacucho"
            loading="lazy"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,28,35,.94),rgba(7,28,35,.72)_55%,rgba(7,28,35,.34))]" />

          <div className="max-w-2xl">
            <p className="eyebrow text-amber">Tu próximo viaje empieza aquí</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.02] sm:text-5xl md:text-6xl">
              Ayacucho tiene mucho más que mostrarte.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/72">
              Explora las experiencias disponibles en la demo y arma una ruta que se adapte a tu tiempo.
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
                className="h-12 rounded-full border-white/30 bg-white/8 px-6 text-white hover:bg-white hover:text-ink"
              >
                <Link to="/about">Conocer DMGOTRAVEL</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
