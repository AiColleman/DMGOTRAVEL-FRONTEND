import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { TourDetailPage } from "@/features/catalog/TourDetailPage";

export const Route = createFileRoute("/tours/$id")({
  head: () => ({ meta: [{ title: "Detalle de experiencia — DMGOTRAVEL" }, { name: "description", content: "Itinerario, salidas, incluye y precio demostrativo de la experiencia." }, { property: "og:title", content: "Detalle de experiencia — DMGOTRAVEL" }, { property: "og:description", content: "Itinerario, salidas, incluye y precio demostrativo de la experiencia." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <PublicLayout><TourDetailPage /></PublicLayout>,
});