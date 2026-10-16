import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HotelDetailPage } from "@/features/hotels/HotelDetailPage";

export const Route = createFileRoute("/hotels/$id")({
  head: () => ({ meta: [{ title: "Detalle de hotel — DMGOTRAVEL" }, { name: "description", content: "Servicios, habitaciones y disponibilidad demostrativa del hotel." }, { property: "og:title", content: "Detalle de hotel — DMGOTRAVEL" }, { property: "og:description", content: "Servicios, habitaciones y disponibilidad demostrativa del hotel." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <PublicLayout><HotelDetailPage /></PublicLayout>,
});