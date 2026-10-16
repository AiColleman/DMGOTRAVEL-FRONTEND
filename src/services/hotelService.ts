/**
 * Hotel service — future endpoint: GET {VITE_API_BASE_URL}/api/v1/hotels/*.
 * Nightly availability is informative; the backend locks inventory per night.
 */
import { apiClient, USE_MOCKS } from "./apiClient";
import { db, delay } from "@/mocks/db";
import type { Destination, Hotel, RoomInventory, RoomType } from "@/types";

export interface HotelFilters {
  destino?: Destination | undefined;
  max?: number | undefined;
}

export interface HotelWithRooms extends Hotel {
  rooms: RoomType[];
  fromRate: number;
}

const withRooms = (h: Hotel): HotelWithRooms => {
  const rooms = db.roomTypes.filter((r) => r.hotelId === h.id && r.active);
  return { ...h, rooms, fromRate: Math.min(...rooms.map((r) => r.nightlyRate)) };
};

export const hotelService = {
  async listHotels(filters: HotelFilters = {}): Promise<HotelWithRooms[]> {
    if (!USE_MOCKS) return apiClient<HotelWithRooms[]>(`/hotels?${new URLSearchParams(filters as Record<string, string>)}`);
    await delay();
    return db.hotels
      .filter((h) => h.active && (!filters.destino || h.destination === filters.destino))
      .map(withRooms)
      .filter((h) => !filters.max || h.fromRate <= filters.max);
  },

  async getHotel(id: string): Promise<HotelWithRooms | null> {
    if (!USE_MOCKS) return apiClient<HotelWithRooms>(`/hotels/${id}`);
    await delay();
    const h = db.hotels.find((x) => x.id === id && x.active);
    return h ? withRooms(h) : null;
  },

  /** Minimum availability per room type across [checkIn, checkOut). */
  async availability(hotelId: string, checkIn: string, checkOut: string): Promise<Record<string, number>> {
    if (!USE_MOCKS) return apiClient(`/hotels/${hotelId}/availability?checkIn=${checkIn}&checkOut=${checkOut}`);
    await delay(150);
    const rooms = db.roomTypes.filter((r) => r.hotelId === hotelId);
    const result: Record<string, number> = {};
    for (const r of rooms) {
      const nights: RoomInventory[] = db.inventory.filter((i) => i.roomTypeId === r.id && i.date >= checkIn && i.date < checkOut);
      result[r.id] = nights.length ? Math.min(...nights.map((n) => n.available)) : 0;
    }
    return result;
  },
};