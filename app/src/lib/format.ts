import { format, formatDistanceToNow, parseISO, differenceInDays, differenceInHours, differenceInMinutes, isToday, isYesterday, isThisWeek, isThisMonth, isThisYear, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addDays, subDays, addMonths, subMonths, eachDayOfInterval, eachMonthOfInterval, isBefore, isAfter, isSameDay, getYear, getMonth, getDate, getHours, getMinutes } from "date-fns";

export type DateInput = string | Date | number;

function toDate(d: DateInput): Date {
  if (d instanceof Date) return d;
  if (typeof d === "number") return new Date(d);
  return parseISO(d);
}

export function formatDate(date: DateInput): string {
  return format(toDate(date), "MMM d, yyyy");
}

export function formatDateTime(date: DateInput): string {
  return format(toDate(date), "MMM d, yyyy h:mm a");
}

export function formatTime(date: DateInput): string {
  return format(toDate(date), "h:mm a");
}

export function formatShortDate(date: DateInput): string {
  return format(toDate(date), "M/d/yy");
}

export function formatLongDate(date: DateInput): string {
  return format(toDate(date), "EEEE, MMMM d, yyyy");
}

export function formatISO8601(date: DateInput): string {
  return format(toDate(date), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
}

export function formatRFC2822(date: DateInput): string {
  return format(toDate(date), "EEE, dd MMM yyyy HH:mm:ss xx");
}

export function formatRelative(date: DateInput): string {
  const d = toDate(date);
  if (isToday(d)) return formatDistanceToNow(d, { addSuffix: true });
  if (isYesterday(d)) return "yesterday";
  if (isThisWeek(d)) return format(d, "EEEE");
  if (isThisYear(d)) return format(d, "MMM d");
  return format(d, "MMM d, yyyy");
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  if (ms < 3600000) return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
  return `${Math.floor(ms / 3600000)}h ${Math.floor((ms % 3600000) / 60000)}m`;
}

export function formatCurrency(amount: number, currency = "USD", locale = "en-US"): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
}

export function formatNumber(n: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale).format(n);
}

export function formatCompact(n: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

export function formatPercent(n: number, decimals = 1): string {
  return `${(n * 100).toFixed(decimals)}%`;
}

export function formatBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  let size = bytes;
  while (size >= 1024 && i < units.length - 1) { size /= 1024; i++; }
  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function getDateRange(range: "today" | "yesterday" | "7d" | "30d" | "90d" | "thisMonth" | "lastMonth" | "thisYear") {
  const now = new Date();
  switch (range) {
    case "today": return { start: startOfDay(now), end: endOfDay(now) };
    case "yesterday": return { start: startOfDay(subDays(now, 1)), end: endOfDay(subDays(now, 1)) };
    case "7d": return { start: startOfDay(subDays(now, 7)), end: endOfDay(now) };
    case "30d": return { start: startOfDay(subDays(now, 30)), end: endOfDay(now) };
    case "90d": return { start: startOfDay(subDays(now, 90)), end: endOfDay(now) };
    case "thisMonth": return { start: startOfMonth(now), end: endOfMonth(now) };
    case "lastMonth": return { start: startOfMonth(subMonths(now, 1)), end: endOfMonth(subMonths(now, 1)) };
    case "thisYear": return { start: new Date(getYear(now), 0, 1), end: endOfDay(now) };
  }
}
