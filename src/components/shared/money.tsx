import { formatMoney, formatRecurringMoney, type Money, type RecurringMoney } from "@/lib/money";

export function MoneyText({
  value,
  undisclosedLabel = "Undisclosed",
}: {
  value?: Money | null;
  undisclosedLabel?: string;
}) {
  return <span>{formatMoney(value, { undisclosedLabel })}</span>;
}

export function RecurringMoneyText({ value }: { value: RecurringMoney }) {
  return <span>{formatRecurringMoney(value)}</span>;
}
