import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ToursPage } from "@/features/catalog/ToursPage";
import { DESTINATIONS, TOUR_THEMES, type TourFilters } from "@/services/catalogService";

const pick = <T extends string>(v: unknown, list: readonly T[]) => (list as readonly unknown[]).includes(v) ? (v as T) : undefined;

export const Route = createFileRoute("/tours/")({
  validateSearch: (s: Record<string, unknown>): TourFilters => ({
    destino: pick(s["destino"], DESTINATIONS),
    categoria: pick(s["categoria"], TOUR_THEMES),
    max: typeof s["max"] === "number" ? s["max"] : undefined,
    duracion: pick(s["duracion"], ["1", "2-3", "4+"] as const),
    orden: pick(s["orden"], ["recomendado", "precio-asc", "precio-desc"] as const),
  }),
  head: () => ({ meta: [{ title: "Tours y experiencias en Perú — DMGOTRAVEL" }, { name: "description", content: "Filtra tours y paquetes por destino, categoría, precio y duración." }, { property: "og:title", content: "Tours y experiencias en Perú — DMGOTRAVEL" }, { property: "og:description", content: "Filtra tours y paquetes por destino, categoría, precio y duración." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <PublicLayout><ToursPage /></PublicLayout>,
});