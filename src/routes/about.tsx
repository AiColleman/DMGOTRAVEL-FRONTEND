import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { images } from "@/mocks/data";

const values = [
  ["Claridad", "Mostramos qué incluye cada experiencia y qué no, antes de pagar."],
  ["Respeto local", "Trabajamos con guías y comunidades de cada destino."],
  ["Calma", "Itinerarios con tiempo para aclimatarse y disfrutar."],
  ["Responsabilidad", "Pagos seguros y datos tratados con cuidado."],
];

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "Nosotros — DMGOTRAVEL" }, { name: "description", content: "Identidad, misión y valores de DMGOTRAVEL, agencia y operadora turística." }, { property: "og:title", content: "Nosotros — DMGOTRAVEL" }, { property: "og:description", content: "Identidad, misión y valores de DMGOTRAVEL, agencia y operadora turística." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (
    <PublicLayout>
      <section className="container-page grid gap-12 py-16 lg:grid-cols-2 lg:items-center">
        <div className="space-y-5">
          <p className="eyebrow">Nosotros</p>
          <h1 className="font-display text-5xl leading-none md:text-6xl">Una agencia y operadora que viaja contigo</h1>
          <p className="text-lg text-muted-foreground">DMGOTRAVEL nace con una mirada puesta en Ayacucho: que cada viaje se sienta cuidado desde la primera consulta y valore el territorio local.</p>
        </div>
        <img src={images.ayacucho} alt="Centro histórico de Huamanga" width={900} height={700} className="aspect-[4/3] w-full rounded-lg" />
      </section>
      <section className="bg-ink py-16 text-ink-foreground">
        <div className="container-page grid gap-10 md:grid-cols-2">
          <div><p className="eyebrow text-amber">Misión</p><p className="mt-3 font-display text-3xl">Diseñar experiencias responsables desde Ayacucho, con reservas claras, identidad local y acompañamiento humano.</p></div>
          <div><p className="eyebrow text-amber">Compromiso de servicio</p><p className="mt-3 text-ink-foreground/85">Te respondemos personas reales, validamos cada total en el servidor y solo confirmamos tu reserva cuando el pago es válido.</p></div>
        </div>
      </section>
      <section className="container-page py-16">
        <h2 className="font-display text-4xl">Nuestros valores</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(([t, d]) => <li key={t} className="surface p-6"><h3 className="font-medium">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p></li>)}
        </ul>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild size="lg" className="h-12"><Link to="/tours">Explorar experiencias</Link></Button>
          <Button asChild size="lg" variant="outline" className="h-12"><Link to="/hotels">Ver hoteles</Link></Button>
        </div>
      </section>
    </PublicLayout>
  ),
});