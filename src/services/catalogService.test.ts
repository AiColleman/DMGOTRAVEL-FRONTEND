import { describe, expect, it } from "vitest";
import { catalogService } from "./catalogService";
import { validTravelDate, validTravelers } from "@/lib/travel-search";

describe("search validation", () => {
  it("rejects impossible dates and malformed query parameters", () => {
    expect(validTravelDate("2026-02-30")).toBeUndefined();
    expect(validTravelDate("2026-11-07")).toBe("2026-11-07");
    expect(validTravelers("3")).toBe(3);
    for (const n of [0, 13, -1, 1.5, "", "abc", NaN]) expect(validTravelers(n)).toBeUndefined();
  });
});
describe("catalog availability", () => {
  it("combines destination, date and available seats", async () => {
    const available = await catalogService.listTours({
      destino: "Millpu",
      fecha: "2026-11-07",
      viajeros: 9,
    });
    expect(available.map((t) => t.id)).toEqual(["millpu-turquesa"]);
    expect(
      await catalogService.listTours({ destino: "Millpu", fecha: "2026-11-07", viajeros: 10 }),
    ).toEqual([]);
  });
  it("does not show tours without a matching departure", async () => {
    expect(await catalogService.listTours({ fecha: "2026-11-08", viajeros: 1 })).toEqual([]);
  });
  it("preserves the public catalog and price sorting without a date", async () => {
    const result = await catalogService.listTours({ orden: "precio-asc" });
    expect(result).toHaveLength(6);
    expect(result.map((t) => t.basePrice)).toEqual([180, 210, 220, 260, 420, 690]);
  });
});
