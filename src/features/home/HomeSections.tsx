import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { HeartHandshake, MapPinned, ReceiptText, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ErrorState, LoadingState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { TourCard } from "@/features/catalog/TourCard";
import { HotelCard } from "@/features/hotels/HotelCard";
import { destinationImages } from "@/mocks/data";
import { catalogService, DESTINATIONS } from "@/services/catalogService";
import { hotelService } from "@/services/hotelService";

export function FeaturedTours() {
  const q = useQuery({ queryKey: ["tours", {}], queryFn: () => catalogService.listTours() });
  return (
    <section className="container-page py-20">
      <SectionHeading eyebrow="Experiencias destacadas" title="Ayacucho para descubrir con calma" action={<Button asChild variant="outline" className="h-11"><Link to="/tours">Ver todo el catálogo</Link></Button>}>
        Rutas demo inspiradas en patrimonio, naturaleza y cultura de la región. Precios referenciales.
      </SectionHeading>
      <div className="mt-10">
        {q.isPending && <LoadingState />}
        {q.isError && <ErrorState onRetry={() => q.refetch()} />}
        {q.data && <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{q.data.slice(0, 3).map((t) => <TourCard key={t.id} tour={t} />)}</div>}
      </div>
    </section>
  );
}

export function Destinations() {
  return (
    <section className="bg-ink py-20 text-ink-foreground">
      <div className="container-page">
        <p className="eyebrow text-amber">Destinos curados</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl md:text-5xl">Seis lugares, una región por descubrir</h2>
        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-6">
          {DESTINATIONS.map((d, i) => (
            <li key={d} className={i === 0 ? "col-span-2 md:col-span-1" : ""}>
              <Link to="/tours" search={{ destino: d }} className="group relative block aspect-[3/4] overflow-hidden rounded-md">
                <img src={destinationImages[d]} alt={d} loading="lazy" width={500} height={660} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
                <span className="absolute bottom-4 left-4 font-display text-2xl">{d}</span>
              </Link>
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
    <section className="container-page py-20">
      <SectionHeading eyebrow="Hoteles recomendados" title="Tu experiencia primero. El alojamiento, solo si lo quieres." action={<Button asChild variant="outline" className="h-11"><Link to="/hotels">Ver hoteles</Link></Button>} />
      <div className="mt-10">
        {q.isPending && <LoadingState count={2} />}
        {q.isError && <ErrorState onRetry={() => q.refetch()} />}
        {q.data && <div className="grid gap-6 lg:grid-cols-2">{q.data.slice(0, 2).map((h) => <HotelCard key={h.id} hotel={h} />)}</div>}
      </div>
    </section>
  );
}

const benefits = [
  { Icon: ShieldCheck, title: "Pago protegido", text: "Pagos con Culqi. Nunca guardamos datos de tu tarjeta." },
  { Icon: MapPinned, title: "Operador local", text: "Guías y equipos que conocen cada ruta." },
  { Icon: ReceiptText, title: "Reserva clara", text: "Ves el total antes de pagar; el servidor lo valida." },
  { Icon: HeartHandshake, title: "Soporte humano", text: "Personas reales antes, durante y después del viaje." },
];

export function Benefits() {
  return (
    <section className="border-y bg-muted/50 py-16">
      <ul className="container-page grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ Icon, title, text }) => (
          <li key={title} className="space-y-2">
            <Icon aria-hidden className="size-6 text-accent" />
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const testimonials = [
  { quote: "Todo estuvo explicado desde el inicio: horarios, qué incluía y qué no. Viajamos tranquilos.", name: "Viajera demo", place: "Ayacucho esencial" },
  { quote: "Agregar el hotel fue opcional y sencillo. Elegimos solo el tour y fue perfecto.", name: "Viajero demo", place: "Aguas turquesa de Millpu" },
];

export function Testimonials() {
  return (
    <section className="container-page py-20">
      <p className="eyebrow">Testimonios · contenido demostrativo</p>
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure key={t.place} className="space-y-4 border-l-2 border-accent pl-6">
            <blockquote className="font-display text-3xl leading-snug">“{t.quote}”</blockquote>
            <figcaption className="text-sm text-muted-foreground">{t.name} · {t.place}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="container-page pb-20">
      <div className="flex flex-col items-start gap-6 rounded-lg bg-primary p-10 text-primary-foreground md:flex-row md:items-center md:justify-between md:p-14">
        <div className="max-w-xl space-y-3">
          <h2 className="font-display text-4xl md:text-5xl">¿Listo para descubrir Ayacucho?</h2>
          <p className="text-primary-foreground/80">Elige una ruta, fecha y viajeros. El alojamiento sigue siendo opcional.</p>
        </div>
        <Button asChild size="lg" variant="secondary" className="h-12 px-8"><Link to="/tours">Explorar experiencias</Link></Button>
      </div>
    </section>
  );
}