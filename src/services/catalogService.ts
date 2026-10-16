/**
 * Catalog service — future endpoint: GET {VITE_API_BASE_URL}/api/v1/catalog/*.
 * While USE_MOCKS is true, data comes from the in-memory demo store.
 * Prices are informative; the backend recalculates every total.
 */
import { apiClient, USE_MOCKS } from "./apiClient";
import { db, delay } from "@/mocks/db";
import type { Destination, Tour, TourDeparture } from "@/types";

export type TourTheme = "Aventura" | "Cultural" | "Naturaleza" | "Gastronomía";
export const TOUR_THEMES: TourTheme[] = ["Aventura", "Cultural", "Naturaleza", "Gastronomía"];
export const DESTINATIONS: Destination[] = ["Ayacucho", "Cusco", "Arequipa", "Lima", "Millpu"];

const themeByCategory: Record<string, TourTheme> = {
  "Cultura y tradición": "Cultural",
  Naturaleza: "Naturaleza",
  "Historia inca": "Cultural",
  "Paisaje y gastronomía": "Aventura",
  Gastronomía: "Gastronomía",
  Arqueología: "Aventura",
};
export const themeOf = (tour: Tour): TourTheme => themeByCategory[tour.category] ?? "Cultural";

export type TourSort = "recomendado" | "precio-asc" | "precio-desc";
export interface TourFilters {
  destino?: Destination | undefined;
  categoria?: TourTheme | undefined;
  max?: number | undefined;
  duracion?: "1" | "2-3" | "4+" | undefined;
  orden?: TourSort | undefined;
  q?: string | undefined;
}

const matchDuration = (days: number, d?: TourFilters["duracion"]) =>
  !d || (d === "1" ? days === 1 : d === "2-3" ? days >= 2 && days <= 3 : days >= 4);

export const catalogService = {
  async listTours(filters: TourFilters = {}): Promise<Tour[]> {
    if (!USE_MOCKS) return apiClient<Tour[]>(`/catalog/tours?${new URLSearchParams(filters as Record<string, string>)}`);
    await delay();
    const q = filters.q?.trim().toLowerCase();
    const list = db.tours.filter(
      (t) =>
        t.active &&
        (!filters.destino || t.destination === filters.destino) &&
        (!filters.categoria || themeOf(t) === filters.categoria) &&
        (!filters.max || t.basePrice <= filters.max) &&
        matchDuration(t.days, filters.duracion) &&
        (!q || `${t.name} ${t.destination} ${t.summary}`.toLowerCase().includes(q)),
    );
    if (filters.orden === "precio-asc") return [...list].sort((a, b) => a.basePrice - b.basePrice);
    if (filters.orden === "precio-desc") return [...list].sort((a, b) => b.basePrice - a.basePrice);
    return list;
  },

  async getTour(id: string): Promise<Tour | null> {
    if (!USE_MOCKS) return apiClient<Tour>(`/catalog/tours/${id}`);
    await delay();
    return db.tours.find((t) => t.id === id && t.active) ?? null;
  },

  async listDepartures(tourId: string): Promise<TourDeparture[]> {
    if (!USE_MOCKS) return apiClient<TourDeparture[]>(`/catalog/tours/${tourId}/departures`);
    await delay(150);
    return db.departures.filter((d) => d.tourId === tourId);
  },

  async related(tour: Tour, limit = 3): Promise<Tour[]> {
    const all = await this.listTours();
    return all
      .filter((t) => t.id !== tour.id)
      .sort((a, b) => Number(b.destination === tour.destination) - Number(a.destination === tour.destination))
      .slice(0, limit);
  },
};