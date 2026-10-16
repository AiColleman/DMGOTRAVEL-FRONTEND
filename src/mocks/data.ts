/**
 * Demo seed data. Fictional — prices, ratings and availability are NOT real
 * and exist only to exercise the UI until the ASP.NET Core API is connected.
 *
 * Visual and catalog focus: Ayacucho region, Peru.
 */
const ayacucho = "/images/ayacucho/huamanga.jpg";
const andes = "/images/ayacucho/hero-huamanga.jpg";
const millpu = "/images/ayacucho/millpu.jpg";
const hotelImg = "/images/ayacucho/casona.jpg";
const quinua = "/images/ayacucho/quinua.jpg";
const wari = "/images/ayacucho/wari.jpg";
const vilcashuaman = "/images/ayacucho/vilcashuaman.jpg";
const huanta = "/images/ayacucho/huanta.jpg";
import type { AuditLog, Hotel, Payment, Reservation, RoomInventory, RoomType, Tour, TourDeparture, User } from "@/types";

export const images = { ayacucho, andes, millpu, hotel: hotelImg, quinua, wari, vilcashuaman, huanta };

export const destinationImages: Record<string, string> = {
  Ayacucho: ayacucho,
  Millpu: millpu,
  Quinua: quinua,
  Wari: wari,
  "Vilcashuamán": vilcashuaman,
  Huanta: huanta,
};

const std = {
  includes: ["Guía local", "Traslados indicados en el itinerario", "Entradas del programa", "Asistencia durante la experiencia"],
  excludes: ["Vuelos nacionales o internacionales", "Alimentación no indicada", "Gastos personales y propinas"],
};

export const seedTours: Tour[] = [
  {
    id: "ayacucho-esencial",
    name: "Ayacucho esencial",
    destination: "Ayacucho",
    kind: "package",
    category: "Cultura y tradición",
    days: 4,
    basePrice: 690,
    image: ayacucho,
    summary: "Huamanga, arte popular, memoria histórica y paisajes andinos en un recorrido pausado por el corazón de Ayacucho.",
    highlights: ["Centro histórico de Huamanga", "Barrio artesanal de Santa Ana", "Miradores de la ciudad"],
    itinerary: [
      { title: "Llegada a Huamanga", detail: "Recepción y caminata de orientación por el centro histórico." },
      { title: "Arte popular", detail: "Talleres demostrativos de retablo, piedra de Huamanga y textilería." },
      { title: "Historia regional", detail: "Ruta cultural por espacios históricos y miradores." },
      { title: "Despedida", detail: "Mañana libre y traslado de salida." },
    ],
    ...std,
    meetingPoint: "Plaza Mayor de Huamanga (referencial)",
    active: true,
  },
  {
    id: "millpu-turquesa",
    name: "Aguas turquesa de Millpu",
    destination: "Millpu",
    kind: "service",
    category: "Naturaleza",
    days: 1,
    basePrice: 180,
    image: millpu,
    summary: "Una jornada entre pozas turquesa y formaciones rocosas en la zona de Circamarca.",
    highlights: ["Pozas naturales", "Miradores de la quebrada", "Paisaje altoandino"],
    itinerary: [
      { title: "Salida desde Huamanga", detail: "Viaje terrestre por paisajes altoandinos." },
      { title: "Millpu", detail: "Caminata guiada por los miradores y tiempo para fotografía." },
    ],
    ...std,
    meetingPoint: "Recojo referencial en el centro de Huamanga",
    active: true,
  },
  {
    id: "quinua-pampa",
    name: "Quinua y Pampa de Ayacucho",
    destination: "Quinua",
    kind: "service",
    category: "Historia y memoria",
    days: 1,
    basePrice: 220,
    image: quinua,
    summary: "Historia republicana, cerámica tradicional y paisaje de la Pampa de Ayacucho en una ruta cultural de día completo.",
    highlights: ["Santuario histórico", "Pueblo de Quinua", "Cerámica tradicional"],
    itinerary: [
      { title: "Pampa de Ayacucho", detail: "Recorrido interpretativo por el santuario histórico." },
      { title: "Quinua", detail: "Visita al pueblo y demostración artesanal referencial." },
    ],
    ...std,
    meetingPoint: "Plaza Mayor de Huamanga (referencial)",
    active: true,
  },
  {
    id: "wari-arqueologico",
    name: "Complejo arqueológico Wari",
    destination: "Wari",
    kind: "service",
    category: "Patrimonio arqueológico",
    days: 1,
    basePrice: 260,
    image: wari,
    summary: "Una aproximación al legado de una de las sociedades prehispánicas más importantes de los Andes centrales.",
    highlights: ["Arquitectura prehispánica", "Paisaje cultural", "Interpretación arqueológica"],
    itinerary: [
      { title: "Salida desde Huamanga", detail: "Traslado hacia el complejo arqueológico." },
      { title: "Recorrido Wari", detail: "Visita guiada por sectores representativos del sitio." },
    ],
    ...std,
    meetingPoint: "Centro de Huamanga (referencial)",
    active: true,
  },
  {
    id: "vilcashuaman-ancestral",
    name: "Vilcashuamán ancestral",
    destination: "Vilcashuamán",
    kind: "package",
    category: "Arqueología",
    days: 2,
    basePrice: 420,
    image: vilcashuaman,
    summary: "Arquitectura inca, plazas históricas y rutas altoandinas en una experiencia cultural de dos días.",
    highlights: ["Ushnu", "Templo del Sol y la Luna", "Paisaje altoandino"],
    itinerary: [
      { title: "Ruta a Vilcashuamán", detail: "Viaje con paradas panorámicas y llegada al poblado." },
      { title: "Legado inca", detail: "Recorrido guiado por los principales espacios arqueológicos." },
    ],
    ...std,
    meetingPoint: "Centro de Huamanga (referencial)",
    active: true,
  },
  {
    id: "huanta-valle",
    name: "Huanta, valle y tradición",
    destination: "Huanta",
    kind: "service",
    category: "Valle y gastronomía",
    days: 1,
    basePrice: 210,
    image: huanta,
    summary: "Paisaje de valle, mercados y sabores regionales en una salida tranquila desde Huamanga.",
    highlights: ["Valle de Huanta", "Mercado local", "Productos regionales"],
    itinerary: [
      { title: "Ruta al valle", detail: "Salida desde Huamanga hacia Huanta." },
      { title: "Tradición local", detail: "Recorrido demostrativo por espacios urbanos, mercado y paisaje de valle." },
    ],
    ...std,
    meetingPoint: "Centro de Huamanga (referencial)",
    active: true,
  },
];

const depDates = ["2026-11-07", "2026-11-14", "2026-11-21", "2026-11-28", "2026-12-05"];
export const seedDepartures: TourDeparture[] = seedTours.flatMap((t, ti) =>
  depDates.map((date, di) => ({
    id: `${t.id}-${date}`,
    tourId: t.id,
    date,
    capacity: 12,
    booked: (ti * 3 + di * 4) % 13,
  })),
);

export const seedHotels: Hotel[] = [
  {
    id: "refugio-andes",
    name: "Refugio de los Andes",
    destination: "Ayacucho",
    address: "Zona referencial cercana al centro de Huamanga",
    stars: 4,
    image: hotelImg,
    summary: "Alojamiento demo de inspiración colonial, patios tranquilos y detalles artesanales.",
    amenities: ["Desayuno", "Wi-Fi", "Terraza", "Estacionamiento"],
    active: true,
  },
  {
    id: "casa-colonial",
    name: "Casa Colonial Huamanga",
    destination: "Ayacucho",
    address: "Centro histórico de Huamanga (referencial)",
    stars: 4,
    image: ayacucho,
    summary: "Casona demo con estética regional a pocos minutos de la Plaza Mayor.",
    amenities: ["Desayuno", "Wi-Fi", "Patio colonial", "Recepción 24 h"],
    active: true,
  },
  {
    id: "posada-quinua",
    name: "Posada de Quinua",
    destination: "Quinua",
    address: "Quinua, Ayacucho (referencial)",
    stars: 3,
    image: quinua,
    summary: "Hospedaje demo inspirado en arquitectura tradicional y entorno rural.",
    amenities: ["Desayuno", "Wi-Fi", "Jardín", "Traslado coordinado"],
    active: true,
  },
  {
    id: "valle-huanta",
    name: "Hotel Valle Huanta",
    destination: "Huanta",
    address: "Huanta, Ayacucho (referencial)",
    stars: 4,
    image: huanta,
    summary: "Alojamiento demo con vista de valle y espacios de descanso.",
    amenities: ["Desayuno", "Wi-Fi", "Terraza", "Restaurante"],
    active: true,
  },
];

export const seedRoomTypes: RoomType[] = [
  { id: "refugio-doble", hotelId: "refugio-andes", name: "Doble andina", capacity: 2, nightlyRate: 280, active: true },
  { id: "refugio-suite", hotelId: "refugio-andes", name: "Suite con terraza", capacity: 3, nightlyRate: 420, active: true },
  { id: "casa-doble", hotelId: "casa-colonial", name: "Doble colonial", capacity: 2, nightlyRate: 320, active: true },
  { id: "casa-familiar", hotelId: "casa-colonial", name: "Familiar superior", capacity: 4, nightlyRate: 480, active: true },
  { id: "quinua-doble", hotelId: "posada-quinua", name: "Doble tradicional", capacity: 2, nightlyRate: 240, active: true },
  { id: "huanta-deluxe", hotelId: "valle-huanta", name: "Deluxe valle", capacity: 3, nightlyRate: 310, active: true },
];

const invDates = Array.from({ length: 45 }, (_, i) => {
  const d = new Date(Date.UTC(2026, 10, 1 + i));
  return d.toISOString().slice(0, 10);
});
export const seedInventory: RoomInventory[] = seedRoomTypes.flatMap((r, ri) =>
  invDates.map((date, di) => ({
    roomTypeId: r.id,
    date,
    available: (ri + di) % 9 === 0 ? 0 : 2 + ((ri + di) % 4),
    rate: r.nightlyRate,
  })),
);

export const seedUsers: User[] = [
  { id: "u-valeria", firstName: "Valeria", lastName: "Demo", email: "valeria@example.com", role: "customer", deleted: false, createdAt: "2026-06-12T15:20:00Z" },
  { id: "u-mateo", firstName: "Mateo", lastName: "Demo", email: "mateo@example.com", role: "customer", deleted: false, createdAt: "2026-07-03T10:05:00Z" },
  { id: "u-lucia", firstName: "Lucía", lastName: "Demo", email: "lucia@example.com", role: "customer", deleted: true, createdAt: "2026-05-21T18:40:00Z" },
  { id: "u-admin", firstName: "Admin", lastName: "Demo", email: "admin@example.com", role: "admin", deleted: false, createdAt: "2026-01-02T09:00:00Z" },
];

export const seedReservations: Reservation[] = [
  {
    id: "r-1",
    code: "DMG-260041",
    userId: "u-valeria",
    customerName: "Valeria Demo",
    status: "confirmed",
    total: 3300,
    createdAt: "2026-10-02T14:10:00Z",
    items: [
      { kind: "tour", tourId: "ayacucho-esencial", departureId: "ayacucho-esencial-2026-11-14", travelers: 2, unitPrice: 690 },
      { kind: "hotel", hotelId: "casa-colonial", roomTypeId: "casa-doble", checkIn: "2026-11-14", checkOut: "2026-11-17", rooms: 2, guests: 2, nightlyRate: 320 },
    ],
  },
  {
    id: "r-2",
    code: "DMG-260042",
    userId: "u-valeria",
    customerName: "Valeria Demo",
    status: "pending",
    total: 360,
    createdAt: "2026-10-08T09:38:00Z",
    expiresAt: "2026-10-09T09:38:00Z",
    items: [{ kind: "tour", tourId: "millpu-turquesa", departureId: "millpu-turquesa-2026-11-21", travelers: 2, unitPrice: 180 }],
  },
  {
    id: "r-3",
    code: "DMG-260039",
    userId: "u-valeria",
    customerName: "Valeria Demo",
    status: "completed",
    total: 440,
    createdAt: "2026-08-20T11:00:00Z",
    items: [{ kind: "tour", tourId: "quinua-pampa", departureId: "quinua-pampa-2026-11-07", travelers: 2, unitPrice: 220 }],
  },
  {
    id: "r-4",
    code: "DMG-260038",
    userId: "u-mateo",
    customerName: "Mateo Demo",
    status: "cancelled",
    total: 420,
    createdAt: "2026-08-02T16:30:00Z",
    items: [{ kind: "tour", tourId: "vilcashuaman-ancestral", departureId: "vilcashuaman-ancestral-2026-11-07", travelers: 1, unitPrice: 420 }],
  },
  {
    id: "r-5",
    code: "DMG-260043",
    userId: "u-mateo",
    customerName: "Mateo Demo",
    status: "pending",
    total: 520,
    createdAt: "2026-10-08T20:12:00Z",
    expiresAt: "2026-10-09T20:12:00Z",
    items: [{ kind: "tour", tourId: "wari-arqueologico", departureId: "wari-arqueologico-2026-11-28", travelers: 2, unitPrice: 260 }],
  },
];

export const seedPayments: Payment[] = [
  { id: "p-1", reservationId: "r-1", amount: 3300, currency: "PEN", status: "succeeded", provider: "Culqi", reference: "chr_demo_••••41", createdAt: "2026-10-02T14:12:00Z" },
  { id: "p-2", reservationId: "r-3", amount: 440, currency: "PEN", status: "succeeded", provider: "Culqi", reference: "chr_demo_••••39", createdAt: "2026-08-20T11:03:00Z" },
  { id: "p-3", reservationId: "r-4", amount: 420, currency: "PEN", status: "refunded", provider: "Culqi", reference: "chr_demo_••••38", createdAt: "2026-08-02T16:31:00Z" },
  { id: "p-4", reservationId: "r-5", amount: 520, currency: "PEN", status: "failed", provider: "Culqi", reference: "chr_demo_••••43", createdAt: "2026-10-08T20:15:00Z" },
  { id: "p-5", reservationId: "r-2", amount: 360, currency: "PEN", status: "processing", provider: "Culqi", reference: "chr_demo_••••42", createdAt: "2026-10-08T09:40:00Z" },
  { id: "p-6", reservationId: "r-1", amount: 640, currency: "PEN", status: "partially_refunded", provider: "Culqi", reference: "chr_demo_••••40", createdAt: "2026-10-04T10:00:00Z" },
];

export const seedAudit: AuditLog[] = [
  { id: "a-1", actor: "Sistema (webhook demo)", action: "payment.succeeded", entity: "Payment", entityId: "p-1", at: "2026-10-02T14:12:30Z" },
  { id: "a-2", actor: "Sistema", action: "reservation.confirmed", entity: "Reservation", entityId: "DMG-260041", at: "2026-10-02T14:12:31Z" },
  { id: "a-3", actor: "Valeria Demo", action: "reservation.created", entity: "Reservation", entityId: "DMG-260042", at: "2026-10-08T09:38:00Z" },
  { id: "a-4", actor: "Admin Demo", action: "tour.updated", entity: "Tour", entityId: "wari-arqueologico", at: "2026-10-07T17:22:00Z" },
  { id: "a-5", actor: "Admin Demo", action: "user.deactivated", entity: "User", entityId: "u-lucia", at: "2026-09-15T12:00:00Z" },
];
