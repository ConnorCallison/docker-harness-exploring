import { describe, it, expect } from "vitest";
import { cn } from "~/lib/cn";
import { formatCurrency, formatNumber, formatPercent, formatBytes, formatDuration, getDateRange } from "~/lib/format";
import { emailSchema, passwordSchema, paginationSchema, createUserSchema, createProductSchema } from "~/lib/validators";
import { ROLES, ROLE_PERMISSIONS, ORDER_STATUSES, ORDER_STATUS_COLORS } from "~/lib/constants";

describe("lib integration", () => {
  describe("format + constants", () => {
    it("formats status-colored currency amounts", () => {
      const statuses = ORDER_STATUSES;
      for (const status of statuses) {
        const colors = ORDER_STATUS_COLORS[status];
        const className = cn(colors.text, colors.bg, "px-2 py-1 rounded");
        expect(className).toBeTruthy();
        expect(formatCurrency(Math.random() * 1000)).toContain("$");
      }
    });

    it("formats metrics for each role", () => {
      for (const role of ROLES) {
        const perms = ROLE_PERMISSIONS[role];
        const permCount = formatNumber(perms.length);
        const permPercent = formatPercent(perms.length / 40);
        expect(permCount).toBeTruthy();
        expect(permPercent).toContain("%");
      }
    });
  });

  describe("validators + format", () => {
    it("validates and formats user input", () => {
      const input = {
        name: "John Doe",
        email: "john@example.com",
        status: "active" as const,
        tags: ["admin", "premium"],
      };

      const result = createUserSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("John Doe");
        const tagCount = formatNumber(result.data.tags.length);
        expect(tagCount).toBe("2");
      }
    });

    it("validates pagination and formats results", () => {
      const params = paginationSchema.parse({ page: "2", perPage: "25" });
      const total = 150;
      const start = (params.page - 1) * params.perPage + 1;
      const end = Math.min(params.page * params.perPage, total);
      expect(formatNumber(start)).toBe("26");
      expect(formatNumber(end)).toBe("50");
    });
  });

  describe("end-to-end data pipeline", () => {
    it("generates, validates, and formats a product catalog", () => {
      const products = Array.from({ length: 50 }, (_, i) => ({
        name: `Product ${i + 1}`,
        status: i % 2 === 0 ? "active" : "inactive",
        tags: [`cat-${i % 5}`],
      }));

      const validated = products.map(p => createProductSchema.parse(p));
      expect(validated).toHaveLength(50);

      const activeCount = validated.filter(p => p.status === "active").length;
      expect(formatNumber(activeCount)).toBe("25");
      expect(formatPercent(activeCount / validated.length)).toBe("50.0%");
    });

    it("processes date ranges with formatting", () => {
      const ranges = ["today", "7d", "30d", "90d", "thisMonth", "thisYear"] as const;
      for (const range of ranges) {
        const { start, end } = getDateRange(range);
        const duration = end.getTime() - start.getTime();
        expect(formatDuration(duration)).toBeTruthy();
      }
    });
  });

  describe("bulk operations", () => {
    it("validates 1000 emails in batch", () => {
      const emails = Array.from({ length: 1000 }, (_, i) => `user${i}@example.com`);
      const results = emails.map(e => emailSchema.safeParse(e));
      expect(results.every(r => r.success)).toBe(true);
    });

    it("validates 1000 passwords with mixed results", () => {
      const passwords = Array.from({ length: 1000 }, (_, i) =>
        i % 2 === 0 ? `StrongP${i}ss` : `weak${i}`
      );
      const results = passwords.map(p => passwordSchema.safeParse(p));
      const valid = results.filter(r => r.success).length;
      expect(valid).toBeGreaterThan(0);
      expect(valid).toBeLessThan(1000);
    });
  });
});
