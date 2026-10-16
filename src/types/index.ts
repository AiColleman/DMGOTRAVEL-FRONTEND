/**
 * Central domain contracts. They mirror the DTOs expected from the future
 * ASP.NET Core REST API. When the real OpenAPI contract is published,
 * align these types with it — never the other way around.
 */
export type Role = "customer" | "admin";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: Role;
  /** Logical deletion: the backend keeps the record. */
  deleted: boolean;
  createdAt: string;
}

export type TourKind = "package" | "service";
export type Destination = "Ayacucho" | "Millpu" | "Quinua" | "Wari" | "Vilcashuamán" | "Huanta";

export interface Tour {
  id: string;
  name: string;
  destination: Destination;
  kind: TourKind;
  category: string;
  days: number;
  /** Informative base price per traveler in PEN. Final price is validated by the server. */
  basePrice: number;
  image: string;
  summary: string;
  highlights: string[];
  itinerary: { title: string; detail: string }[];
  includes: string[];
  excludes: string[];
  meetingPoint: string;
  active: boolean;
}

export interface TourDeparture {
  id: string;
  tourId: string;
  date: string; // ISO yyyy-mm-dd
  capacity: number;
  booked: number;
}

export interface RoomType {
  id: string;
  hotelId: string;
  name: string;
  capacity: number;
  nightlyRate: number;
  active: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  destination: Destination;
  address: string;
  stars: number;
  image: string;
  summary: string;
  amenities: string[];
  active: boolean;
}

export interface RoomInventory {
  roomTypeId: string;
  date: string;
  available: number;
  rate: number;
}

export type ReservationStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type ReservationItem =
  | { kind: "tour"; tourId: string; departureId: string; travelers: number; unitPrice: number }
  | {
      kind: "hotel";
      hotelId: string;
      roomTypeId: string;
      checkIn: string;
      checkOut: string;
      rooms: number;
      guests: number;
      nightlyRate: number;
    };

export interface Reservation {
  id: string;
  code: string;
  userId: string;
  customerName: string;
  status: ReservationStatus;
  items: ReservationItem[];
  /** Informative total in PEN; authoritative total comes from the backend. */
  total: number;
  createdAt: string;
  expiresAt?: string;
}

export type PaymentStatus = "pending" | "processing" | "succeeded" | "failed" | "refunded" | "partially_refunded";

export interface Payment {
  id: string;
  reservationId: string;
  amount: number;
  currency: "PEN";
  status: PaymentStatus;
  provider: "Culqi";
  /** Masked reference only. Card data never reaches the frontend. */
  reference: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  entity: string;
  entityId: string;
  /** ISO timestamp in UTC. */
  at: string;
}

export interface BookingDraft {
  tourId: string;
  departureId: string;
  travelers: number;
  hotel?: { hotelId: string; roomTypeId: string; checkIn: string; checkOut: string; rooms: number; guests: number };
}