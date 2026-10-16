import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HotelsPage } from "@/features/hotels/HotelsPage";
import { DESTINATIONS } from "@/services/catalogService";
import type { HotelFilters } from "@/services/hotelService";

export const Route = createFileRoute("/hotels/")({
  validateSearch: (s: Record<string, unknown>): HotelFilters => ({
    destino: (DESTINATIONS as readonly unknown[]).includes(s["destino"]) ? (s["destino"] as HotelFilters["destino"]) : undefined,
    max: typeof s["max"] === "number" ? s["max"] : undefined,
  }),
  head: () => ({ meta: [{ title: "Hoteles seleccionados — DMGOTRAVEL" }, { name: "description", content: "Alojamiento opcional en Ayacucho, Cusco y Arequipa con tarifas demostrativas." }, { property: "og:title", content: "Hoteles seleccionados — DMGOTRAVEL" }, { property: "og:description", content: "Alojamiento opcional en Ayacucho, Cusco y Arequipa con tarifas demostrativas." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <PublicLayout><HotelsPage /></PublicLayout>,
});