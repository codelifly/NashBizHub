import { describe, expect, it } from "vitest";
import {
  dollarsToMinor,
  formatMoney,
  formatRecurringMoney,
  normalizeRecurringToMonthly,
} from "@/lib/money";

describe("formatMoney", () => {
  it("formats whole-dollar amounts without cents", () => {
    expect(
      formatMoney({ minorUnits: 42000000, currency: "USD" }),
    ).toBe("$420,000");
  });

  it("formats fractional dollars with cents", () => {
    expect(formatMoney({ minorUnits: 1999, currency: "USD" })).toBe("$19.99");
  });

  it("returns undisclosed label for nullish money", () => {
    expect(formatMoney(null)).toBe("Undisclosed");
    expect(formatMoney(undefined, { undisclosedLabel: "Ask" })).toBe("Ask");
  });
});

describe("recurring money helpers", () => {
  it("formats recurring money with period", () => {
    expect(
      formatRecurringMoney({
        minorUnits: 450000,
        currency: "USD",
        period: "month",
      }),
    ).toBe("$4,500 / month");
  });

  it("normalizes weekly and yearly to monthly", () => {
    expect(
      normalizeRecurringToMonthly({
        minorUnits: 120000,
        currency: "USD",
        period: "week",
      }).minorUnits,
    ).toBe(Math.round(120000 * (52 / 12)));
    expect(
      normalizeRecurringToMonthly({
        minorUnits: 1200000,
        currency: "USD",
        period: "year",
      }).minorUnits,
    ).toBe(100000);
  });

  it("converts dollars to minor units", () => {
    expect(dollarsToMinor(400000)).toBe(40000000);
  });
});
