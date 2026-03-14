import { describe, it, expect } from "vitest";
import {
  formatDate, formatDateTime, formatTime, formatShortDate, formatLongDate,
  formatRelative, formatDuration, formatCurrency, formatNumber,
  formatCompact, formatPercent, formatBytes, getDateRange,
} from "~/lib/format";

describe("format utilities", () => {
  const now = new Date("2026-03-14T12:00:00Z");
  const yesterday = new Date("2026-03-13T12:00:00Z");
  const lastWeek = new Date("2026-03-07T12:00:00Z");

  describe("formatDate", () => {
    it("formats a Date object", () => {
      expect(formatDate(now)).toMatch(/Mar 14, 2026/);
    });
    it("formats an ISO string", () => {
      expect(formatDate("2026-03-14T12:00:00Z")).toMatch(/Mar 14, 2026/);
    });
    it("formats a timestamp", () => {
      expect(formatDate(now.getTime())).toMatch(/2026/);
    });
  });

  describe("formatDateTime", () => {
    it("includes time component", () => {
      const result = formatDateTime(now);
      expect(result).toContain("2026");
    });
  });

  describe("formatDuration", () => {
    it("formats milliseconds", () => { expect(formatDuration(500)).toBe("500ms"); });
    it("formats seconds", () => { expect(formatDuration(3500)).toBe("3.5s"); });
    it("formats minutes", () => { expect(formatDuration(125000)).toBe("2m 5s"); });
    it("formats hours", () => { expect(formatDuration(7325000)).toBe("2h 2m"); });
  });

  describe("formatCurrency", () => {
    it("formats USD by default", () => {
      expect(formatCurrency(1234.56)).toContain("1,234.56");
    });
    it("handles zero", () => {
      expect(formatCurrency(0)).toContain("0.00");
    });
    it("handles large numbers", () => {
      expect(formatCurrency(1000000)).toContain("1,000,000");
    });
  });

  describe("formatNumber", () => {
    it("adds commas", () => {
      expect(formatNumber(1234567)).toBe("1,234,567");
    });
    it("handles zero", () => {
      expect(formatNumber(0)).toBe("0");
    });
  });

  describe("formatCompact", () => {
    it("formats thousands", () => {
      expect(formatCompact(1500)).toMatch(/1\.5K/);
    });
    it("formats millions", () => {
      expect(formatCompact(2500000)).toMatch(/2\.5M/);
    });
  });

  describe("formatPercent", () => {
    it("formats percentage", () => {
      expect(formatPercent(0.75)).toBe("75.0%");
    });
    it("respects decimals", () => {
      expect(formatPercent(0.333, 2)).toBe("33.30%");
    });
  });

  describe("formatBytes", () => {
    it("formats bytes", () => { expect(formatBytes(500)).toBe("500 B"); });
    it("formats KB", () => { expect(formatBytes(1536)).toBe("1.5 KB"); });
    it("formats MB", () => { expect(formatBytes(5242880)).toBe("5.0 MB"); });
    it("formats GB", () => { expect(formatBytes(2147483648)).toBe("2.0 GB"); });
  });

  describe("getDateRange", () => {
    it("returns today range", () => {
      const range = getDateRange("today");
      expect(range.start).toBeDefined();
      expect(range.end).toBeDefined();
      expect(range.start.getTime()).toBeLessThanOrEqual(range.end.getTime());
    });
    it("returns 7d range", () => {
      const range = getDateRange("7d");
      const diff = range.end.getTime() - range.start.getTime();
      expect(diff).toBeGreaterThanOrEqual(6 * 86400000);
    });
    it("returns 30d range", () => {
      const range = getDateRange("30d");
      const diff = range.end.getTime() - range.start.getTime();
      expect(diff).toBeGreaterThanOrEqual(29 * 86400000);
    });
    for (const period of ["today", "yesterday", "7d", "30d", "90d", "thisMonth", "lastMonth", "thisYear"] as const) {
      it(`returns valid range for ${period}`, () => {
        const range = getDateRange(period);
        expect(range.start).toBeInstanceOf(Date);
        expect(range.end).toBeInstanceOf(Date);
      });
    }
  });
});
