export type Money = {
  minorUnits: number;
  currency: "USD";
};

export type RecurringMoney = Money & {
  period: "week" | "month" | "year";
};

export function formatMoney(
  money: Money | null | undefined,
  options?: { undisclosedLabel?: string },
): string {
  if (!money) {
    return options?.undisclosedLabel ?? "Undisclosed";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currency,
    maximumFractionDigits: money.minorUnits % 100 === 0 ? 0 : 2,
  }).format(money.minorUnits / 100);
}

export function formatRecurringMoney(money: RecurringMoney): string {
  return `${formatMoney(money)} / ${money.period}`;
}

export function dollarsToMinor(dollars: number): number {
  return Math.round(dollars * 100);
}

export function normalizeRecurringToMonthly(money: RecurringMoney): Money {
  const factor =
    money.period === "week" ? 52 / 12 : money.period === "year" ? 1 / 12 : 1;
  return {
    minorUnits: Math.round(money.minorUnits * factor),
    currency: money.currency,
  };
}
