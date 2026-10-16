/**
 * Demo seed data. Fictional — prices, ratings and availability are NOT real
 * and exist only to exercise the UI until the ASP.NET Core API is connected.
 */
import ayacucho from "@/assets/ayacucho.jpg";
import andes from "@/assets/andes-hero.jpg";
import millpu from "@/assets/millpu.jpg";
import hotelImg from "@/assets/hotel.jpg";
import cusco from "@/assets/cusco.jpg";
import arequipa from "@/assets/arequipa.jpg";
import lima from "@/assets/lima.jpg";
import type { AuditLog, Hotel, Payment, Reservation, RoomInventory, RoomType, Tour, TourDeparture, User } from "@/types";

export const images = { ayacucho, andes, millpu, hotel: hotelImg, cusco, arequipa, lima };

export const destinationImages: Record<string, string> = {
  Ayacucho: ayacucho,
  Cusco: cusco,
  Arequipa: arequipa,
  Lima: lima,
  Millpu: millpu,
};

const std = {
  includes: ["Guía local certificado", "Traslados indicados en el itinerario", "Entradas a los atractivos del programa", "Asistencia 24/7"],
  excludes: ["Vuelos nacionales o internacionales", "Alimentación no indicada", "Gastos personales y propinas"],
};

export const seedTours: Tour[] = [
  {
    id: "ayacucho-esencial", name: "Ayacucho esencial", destination: "Ayacucho", kind: "package", category: "Cultura y tradición", days: 4, basePrice: 690, image: ayacucho,
    summary: "Huamanga, sus 33 iglesias, talleres de retablo y la pampa histórica de Quinua en un recorrido pausado.",
    highlights: ["Centro histórico de Huamanga", "Talleres artesanales del barrio Santa Ana", "Pampa de Quinua"],
    itinerary: [
      { title: "Llegada a Huamanga", detail: "Recepción, traslado y caminata de orientación por la Plaza Mayor." },
      { title: "Arte popular", detail: "Visita a talleres de retablo, piedra de Huamanga y textilería." },
      { title: "Quinua y Wari", detail: "Complejo arqueológico Wari y santuario histórico de la Pampa de Ayacucho." },
      { title: "Despedida", detail: "Mañana libre y traslado de salida." },
    ],
    ...std, meetingPoint: "Plaza Mayor de Huamanga (punto de encuentro referencial)", active: true,
  },
  {
    id: "millpu-turquesa", name: "Aguas turquesa de Millpu", destination: "Millpu", kind: "service", category: "Naturaleza", days: 1, basePrice: 180, image: millpu,
    summary: "Un día entre pozas color turquesa escalonadas en la quebrada de Circamarca.",
    highlights: ["Pozas naturales escalonadas", "Mirador de la quebrada", "Almuerzo campestre"],
    itinerary: [
      { title: "Salida temprana", detail: "Recojo en hotel y viaje escénico por los Andes." },
      { title: "Millpu", detail: "Caminata guiada por las pozas y tiempo libre para fotografía." },
    ],
    ...std, meetingPoint: "Recojo en hoteles del centro de Huamanga", active: true,
  },
  {
    id: "cusco-valle-sagrado", name: "Cusco y Valle Sagrado", destination: "Cusco", kind: "package", category: "Historia inca", days: 5, basePrice: 1480, image: cusco,
    summary: "La capital inca, Pisac, Ollantaytambo y mercados andinos con tiempo para aclimatarse.",
    highlights: ["Qorikancha y Sacsayhuamán", "Mercado de Pisac", "Fortaleza de Ollantaytambo"],
    itinerary: [
      { title: "Cusco", detail: "Llegada y aclimatación con mate de coca." },
      { title: "City tour", detail: "Catedral, Qorikancha y parques arqueológicos cercanos." },
      { title: "Valle Sagrado", detail: "Pisac, almuerzo en Urubamba y Ollantaytambo." },
      { title: "Chinchero", detail: "Comunidad tejedora y paisaje de altura." },
      { title: "Salida", detail: "Traslado al aeropuerto." },
    ],
    ...std, meetingPoint: "Plaza de Armas de Cusco", active: true,
  },
  {
    id: "arequipa-blanca", name: "Arequipa blanca y Colca", destination: "Arequipa", kind: "package", category: "Paisaje y gastronomía", days: 3, basePrice: 890, image: arequipa,
    summary: "Sillar volcánico, el monasterio de Santa Catalina y el vuelo del cóndor en el Colca.",
    highlights: ["Monasterio de Santa Catalina", "Picantería tradicional", "Cruz del Cóndor"],
    itinerary: [
      { title: "Ciudad blanca", detail: "Centro histórico y miradores de Yanahuara." },
      { title: "Colca", detail: "Ruta por la reserva de Salinas y Aguada Blanca." },
      { title: "Cruz del Cóndor", detail: "Observación del cóndor y retorno a Arequipa." },
    ],
    ...std, meetingPoint: "Plaza de Armas de Arequipa", active: true,
  },
  {
    id: "lima-gastronomica", name: "Lima gastronómica", destination: "Lima", kind: "service", category: "Gastronomía", days: 1, basePrice: 320, image: lima,
    summary: "Mercados, cevichería de barrio y el malecón de Miraflores al atardecer.",
    highlights: ["Mercado de Surquillo", "Clase de ceviche", "Malecón al atardecer"],
    itinerary: [{ title: "Sabores de Lima", detail: "Mercado, clase práctica y paseo por Barranco y Miraflores." }],
    ...std, meetingPoint: "Parque Kennedy, Miraflores", active: true,
  },
  {
    id: "vilcashuaman", name: "Vilcashuamán ancestral", destination: "Ayacucho", kind: "package", category: "Arqueología", days: 2, basePrice: 420, image: andes,
    summary: "El Ushnu, el templo del Sol y la Luna y caminos ancestrales entre montañas.",
    highlights: ["Ushnu inca", "Templo del Sol y la Luna", "Laguna de Pomacocha"],
    itinerary: [
      { title: "Ruta a Vilcashuamán", detail: "Viaje por los Andes con paradas panorámicas." },
      { title: "Legado inca", detail: "Visita arqueológica guiada y retorno." },
    ],
    ...std, meetingPoint: "Oficina DMGOTRAVEL en Huamanga (referencial)", active: true,
  },
];

const depDates = ["2026-11-07", "2026-11-14", "2026-11-21", "2026-11-28", "2026-12-05"];
export const seedDepartures: TourDeparture[] = seedTours.flatMap((t, ti) =>
  depDates.map((date, di) => ({ id: `${t.id}-${date}`, tourId: t.id, date, capacity: 12, booked: (ti * 3 + di * 4) % 13 })),
);

export const seedHotels: Hotel[] = [
  { id: "refugio-andes", name: "Refugio de los Andes", destination: "Ayacucho", address: "A 12 min del centro de Huamanga", stars: 4, image: hotelImg, summary: "Calma andina, patios de piedra y desayunos con productos locales.", amenities: ["Desayuno", "Wi‑Fi", "Terraza", "Estacionamiento"], active: true },
  { id: "casa-colonial", name: "Casa Colonial Huamanga", destination: "Ayacucho", address: "Centro histórico de Huamanga", stars: 4, image: ayacucho, summary: "Casona restaurada con detalles artesanales a pasos de la Plaza Mayor.", amenities: ["Desayuno", "Wi‑Fi", "Patio colonial", "Recepción 24 h"], active: true },
  { id: "san-blas-boutique", name: "San Blas Boutique", destination: "Cusco", address: "Barrio de San Blas, Cusco", stars: 5, image: cusco, summary: "Habitaciones con vista a los tejados del barrio de los artesanos.", amenities: ["Desayuno", "Oxígeno", "Spa", "Wi‑Fi"], active: true },
  { id: "sillar-house", name: "Sillar House", destination: "Arequipa", address: "Yanahuara, Arequipa", stars: 4, image: arequipa, summary: "Arquitectura en sillar con vista al Misti.", amenities: ["Desayuno", "Piscina", "Wi‑Fi"], active: true },
];

export const seedRoomTypes: RoomType[] = [
  { id: "refugio-doble", hotelId: "refugio-andes", name: "Doble andina", capacity: 2, nightlyRate: 280, active: true },
  { id: "refugio-suite", hotelId: "refugio-andes", name: "Suite con terraza", capacity: 3, nightlyRate: 420, active: true },
  { id: "casa-doble", hotelId: "casa-colonial", name: "Doble colonial", capacity: 2, nightlyRate: 320, active: true },
  { id: "casa-familiar", hotelId: "casa-colonial", name: "Familiar superior", capacity: 4, nightlyRate: 480, active: true },
  { id: "sanblas-deluxe", hotelId: "san-blas-boutique", name: "Deluxe con vista", capacity: 2, nightlyRate: 560, active: true },
  { id: "sillar-doble", hotelId: "sillar-house", name: "Doble sillar", capacity: 2, nightlyRate: 300, active: true },
];

const invDates = Array.from({ length: 45 }, (_, i) => {
  const d = new Date(Date.UTC(2026, 10, 1 + i));
  return d.toISOString().slice(0, 10);
});
export const seedInventory: RoomInventory[] = seedRoomTypes.flatMap((r, ri) =>
  invDates.map((date, di) => ({ roomTypeId: r.id, date, available: (ri + di) % 9 === 0 ? 0 : 2 + ((ri + di) % 4), rate: r.nightlyRate })),
);

export const seedUsers: User[] = [
  { id: "u-valeria", firstName: "Valeria", lastName: "Demo", email: "valeria@example.com", role: "customer", deleted: false, createdAt: "2026-06-12T15:20:00Z" },
  { id: "u-mateo", firstName: "Mateo", lastName: "Demo", email: "mateo@example.com", role: "customer", deleted: false, createdAt: "2026-07-03T10:05:00Z" },
  { id: "u-lucia", firstName: "Lucía", lastName: "Demo", email: "lucia@example.com", role: "customer", deleted: true, createdAt: "2026-05-21T18:40:00Z" },
  { id: "u-admin", firstName: "Admin", lastName: "Demo", email: "admin@example.com", role: "admin", deleted: false, createdAt: "2026-01-02T09:00:00Z" },
];

export const seedReservations: Reservation[] = [
  {
    id: "r-1", code: "DMG-260041", userId: "u-valeria", customerName: "Valeria Demo", status: "confirmed", total: 3300, createdAt: "2026-10-02T14:10:00Z",
    items: [
      { kind: "tour", tourId: "ayacucho-esencial", departureId: "ayacucho-esencial-2026-11-14", travelers: 2, unitPrice: 690 },
      { kind: "hotel", hotelId: "casa-colonial", roomTypeId: "casa-doble", checkIn: "2026-11-14", checkOut: "2026-11-17", rooms: 2, guests: 2, nightlyRate: 320 },
    ],
  },
  {
    id: "r-2", code: "DMG-260042", userId: "u-valeria", customerName: "Valeria Demo", status: "pending", total: 360, createdAt: "2026-10-08T09:38:00Z", expiresAt: "2026-10-09T09:38:00Z",
    items: [{ kind: "tour", tourId: "millpu-turquesa", departureId: "millpu-turquesa-2026-11-21", travelers: 2, unitPrice: 180 }],
  },
  {
    id: "r-3", code: "DMG-260039", userId: "u-valeria", customerName: "Valeria Demo", status: "completed", total: 640, createdAt: "2026-08-20T11:00:00Z",
    items: [{ kind: "tour", tourId: "lima-gastronomica", departureId: "lima-gastronomica-2026-11-07", travelers: 2, unitPrice: 320 }],
  },
  {
    id: "r-4", code: "DMG-260038", userId: "u-mateo", customerName: "Mateo Demo", status: "cancelled", total: 420, createdAt: "2026-08-02T16:30:00Z",
    items: [{ kind: "tour", tourId: "vilcashuaman", departureId: "vilcashuaman-2026-11-07", travelers: 1, unitPrice: 420 }],
  },
  {
    id: "r-5", code: "DMG-260043", userId: "u-mateo", customerName: "Mateo Demo", status: "pending", total: 2960, createdAt: "2026-10-08T20:12:00Z", expiresAt: "2026-10-09T20:12:00Z",
    items: [{ kind: "tour", tourId: "cusco-valle-sagrado", departureId: "cusco-valle-sagrado-2026-11-28", travelers: 2, unitPrice: 1480 }],
  },
];

export const seedPayments: Payment[] = [
  { id: "p-1", reservationId: "r-1", amount: 3300, currency: "PEN", status: "succeeded", provider: "Culqi", reference: "chr_demo_••••41", createdAt: "2026-10-02T14:12:00Z" },
  { id: "p-2", reservationId: "r-3", amount: 640, currency: "PEN", status: "succeeded", provider: "Culqi", reference: "chr_demo_••••39", createdAt: "2026-08-20T11:03:00Z" },
  { id: "p-3", reservationId: "r-4", amount: 420, currency: "PEN", status: "refunded", provider: "Culqi", reference: "chr_demo_••••38", createdAt: "2026-08-02T16:31:00Z" },
  { id: "p-4", reservationId: "r-5", amount: 2960, currency: "PEN", status: "failed", provider: "Culqi", reference: "chr_demo_••••43", createdAt: "2026-10-08T20:15:00Z" },
  { id: "p-5", reservationId: "r-2", amount: 360, currency: "PEN", status: "processing", provider: "Culqi", reference: "chr_demo_••••42", createdAt: "2026-10-08T09:40:00Z" },
  { id: "p-6", reservationId: "r-1", amount: 640, currency: "PEN", status: "partially_refunded", provider: "Culqi", reference: "chr_demo_••••40", createdAt: "2026-10-04T10:00:00Z" },
];

export const seedAudit: AuditLog[] = [
  { id: "a-1", actor: "Sistema (webhook demo)", action: "payment.succeeded", entity: "Payment", entityId: "p-1", at: "2026-10-02T14:12:30Z" },
  { id: "a-2", actor: "Sistema", action: "reservation.confirmed", entity: "Reservation", entityId: "DMG-260041", at: "2026-10-02T14:12:31Z" },
  { id: "a-3", actor: "Valeria Demo", action: "reservation.created", entity: "Reservation", entityId: "DMG-260042", at: "2026-10-08T09:38:00Z" },
  { id: "a-4", actor: "Admin Demo", action: "tour.updated", entity: "Tour", entityId: "cusco-valle-sagrado", at: "2026-10-07T17:22:00Z" },
  { id: "a-5", actor: "Admin Demo", action: "user.deactivated", entity: "User", entityId: "u-lucia", at: "2026-09-15T12:00:00Z" },
];