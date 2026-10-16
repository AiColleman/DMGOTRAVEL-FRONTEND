import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { TourDetailPage } from "@/features/catalog/TourDetailPage";

import { validTravelDate, validTravelers } from "@/lib/travel-search";

export const Route = createFileRoute("/tours/$id")({
  validateSearch: (
    s: Record<string, unknown>,
  ): { fecha?: string | undefined; viajeros?: number | undefined } => ({
    fecha: validTravelDate(s["fecha"]),
    viajeros: validTravelers(s["viajeros"]),
  }),
  head: () => ({
    meta: [
      { title: "Detalle de experiencia — DMGOTRAVEL" },
      {
        name: "description",
        content: "Itinerario, salidas, incluye y precio demostrativo de la experiencia.",
      },
      { property: "og:title", content: "Detalle de experiencia — DMGOTRAVEL" },
      {
        property: "og:description",
        content: "Itinerario, salidas, incluye y precio demostrativo de la experiencia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PublicLayout>
      <TourDetailPage />
    </PublicLayout>
  ),
});
