import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Mi cuenta — DMGOTRAVEL" }, { name: "description", content: "Espacio personal del viajero DMGOTRAVEL." }, { property: "og:title", content: "Mi cuenta — DMGOTRAVEL" }, { property: "og:description", content: "Espacio personal del viajero DMGOTRAVEL." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (
    <PublicLayout>
      <section className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
        <Compass aria-hidden className="size-10 text-accent" />
        <p className="eyebrow">Mi cuenta</p>
        <h1 className="max-w-2xl font-display text-4xl md:text-5xl">Tu espacio personal se habilitará en la siguiente etapa de esta demo</h1>
        <p className="max-w-md text-muted-foreground">Mientras tanto, sigue descubriendo experiencias por el Perú.</p>
        <Button asChild size="lg" className="h-12 px-8"><Link to="/tours">Explorar experiencias</Link></Button>
      </section>
    </PublicLayout>
  ),
});