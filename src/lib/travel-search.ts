/** Stable calendar date for the destination, independent of the visitor's timezone. */
export const todayInPeru = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Lima",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

export function validTravelDate(value: unknown): string | undefined {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
    ? value
    : undefined;
}
export function validTravelers(value: unknown): number | undefined {
  const count = typeof value === "string" && value.trim() !== "" ? Number(value) : value;
  return typeof count === "number" && Number.isInteger(count) && count >= 1 && count <= 12
    ? count
    : undefined;
}
