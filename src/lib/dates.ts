import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { format, parseISO } from "date-fns";

export function formatInZone(
  instant: Date | string,
  timeZone: string,
  pattern = "MMM d, yyyy h:mm a zzz",
): string {
  const date = typeof instant === "string" ? parseISO(instant) : instant;
  return formatInTimeZone(date, timeZone, pattern);
}

export function formatDateOnly(instant: Date | string, pattern = "MMM d, yyyy"): string {
  const date = typeof instant === "string" ? parseISO(instant) : instant;
  return format(date, pattern);
}

export function toUtcIso(localDate: Date, timeZone: string): string {
  const zoned = toZonedTime(localDate, timeZone);
  return zoned.toISOString();
}
