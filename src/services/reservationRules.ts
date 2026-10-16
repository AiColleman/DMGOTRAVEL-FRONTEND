/**
 * UI-side mirror of the documented reservation rules. The backend remains the
 * authority; these guards only decide which actions the UI offers.
 */
import type { ReservationItem, ReservationStatus } from "@/types";
import { nightsBetween } from "@/lib/format";

export type Actor = "customer" | "admin" | "payment";

/** pending -> confirmed only via validated payment; completed/cancelled are terminal. */
export function canTransition(from: ReservationStatus, to: ReservationStatus, actor: Actor): boolean {
  if (from === "pending" && to === "confirmed") return actor === "payment";
  if (from === "pending" && to === "cancelled") return actor === "customer" || actor === "admin";
  if (from === "confirmed" && to === "completed") return actor === "admin";
  if (from === "confirmed" && to === "cancelled") return actor === "admin";
  return false;
}

export const customerCanPay = (s: ReservationStatus) => s === "pending";
export const customerCanCancel = (s: ReservationStatus) => canTransition(s, "cancelled", "customer");

export function itemSubtotal(item: ReservationItem): number {
  if (item.kind === "tour") return item.unitPrice * item.travelers;
  return item.nightlyRate * item.rooms * nightsBetween(item.checkIn, item.checkOut);
}

/** Informative total only — the server recalculates before charging. */
export const informativeTotal = (items: ReservationItem[]) => items.reduce((s, i) => s + itemSubtotal(i), 0);