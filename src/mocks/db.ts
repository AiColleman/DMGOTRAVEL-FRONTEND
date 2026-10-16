/**
 * In-memory mock store used ONLY by the mock service adapters.
 * Pages never import this file — they go through `src/services/*`.
 * Delete this folder once the services call the real API.
 */
import { seedAudit, seedDepartures, seedHotels, seedInventory, seedPayments, seedReservations, seedRoomTypes, seedTours, seedUsers } from "./data";
import type { AuditLog } from "@/types";

export const db = {
  tours: [...seedTours],
  departures: [...seedDepartures],
  hotels: [...seedHotels],
  roomTypes: [...seedRoomTypes],
  inventory: [...seedInventory],
  users: [...seedUsers],
  reservations: [...seedReservations],
  payments: [...seedPayments],
  audit: [...seedAudit],
};

let version = 0;
const listeners = new Set<() => void>();
export const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
export const getVersion = () => version;
export const commit = () => {
  version += 1;
  listeners.forEach((l) => l());
};

export const recordAudit = (entry: Omit<AuditLog, "id" | "at">) => {
  db.audit = [{ ...entry, id: `a-${db.audit.length + 1}-${Date.now()}`, at: new Date().toISOString() }, ...db.audit];
};

/** Simulated network latency so loading states are visible. */
export const delay = (ms = 280) => new Promise((r) => setTimeout(r, ms));