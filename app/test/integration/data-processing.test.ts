import { describe, it, expect } from "vitest";
import { formatCurrency, formatNumber, formatRelative, formatCompact, formatBytes } from "~/lib/format";
import { paginationSchema, searchSchema } from "~/lib/validators";

describe("data processing integration", () => {
  // Simulate a realistic data pipeline
  interface DataItem {
    id: string;
    name: string;
    revenue: number;
    visitors: number;
    size: number;
    createdAt: string;
  }

  const generateData = (count: number): DataItem[] =>
    Array.from({ length: count }, (_, i) => ({
      id: `item-${i}`,
      name: `Item ${i}`,
      revenue: Math.random() * 100000,
      visitors: Math.floor(Math.random() * 1000000),
      size: Math.floor(Math.random() * 1073741824),
      createdAt: new Date(Date.now() - i * 3600000).toISOString(),
    }));

  describe("pagination", () => {
    const data = generateData(250);

    it("paginates correctly through all pages", () => {
      const params = paginationSchema.parse({ perPage: 25 });
      const totalPages = Math.ceil(data.length / params.perPage);
      expect(totalPages).toBe(10);

      for (let page = 1; page <= totalPages; page++) {
        const start = (page - 1) * params.perPage;
        const end = Math.min(start + params.perPage, data.length);
        const pageData = data.slice(start, end);

        if (page < totalPages) {
          expect(pageData).toHaveLength(params.perPage);
        }
        expect(pageData.length).toBeGreaterThan(0);
      }
    });

    it("sorts by different fields", () => {
      const sorted = [...data].sort((a, b) => b.revenue - a.revenue);
      expect(sorted[0].revenue).toBeGreaterThanOrEqual(sorted[sorted.length - 1].revenue);
    });
  });

  describe("aggregation", () => {
    const data = generateData(100);

    it("computes revenue statistics", () => {
      const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
      const avgRevenue = totalRevenue / data.length;
      const maxRevenue = Math.max(...data.map(d => d.revenue));
      const minRevenue = Math.min(...data.map(d => d.revenue));

      expect(formatCurrency(totalRevenue)).toContain("$");
      expect(formatCurrency(avgRevenue)).toContain("$");
      expect(maxRevenue).toBeGreaterThan(minRevenue);
    });

    it("computes visitor statistics", () => {
      const totalVisitors = data.reduce((sum, d) => sum + d.visitors, 0);
      expect(formatCompact(totalVisitors)).toMatch(/[KMB]/);
    });

    it("computes size statistics", () => {
      const totalSize = data.reduce((sum, d) => sum + d.size, 0);
      expect(formatBytes(totalSize)).toMatch(/(MB|GB|TB)/);
    });
  });

  describe("search and filter", () => {
    const data = generateData(500);

    it("filters by search query", () => {
      const { q } = searchSchema.parse({ q: "Item 1" });
      const filtered = data.filter(d => d.name.includes(q!));
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.length).toBeLessThan(data.length);
    });

    it("filters by revenue range", () => {
      const minRevenue = 25000;
      const maxRevenue = 75000;
      const filtered = data.filter(d => d.revenue >= minRevenue && d.revenue <= maxRevenue);
      expect(filtered.length).toBeGreaterThan(0);
      for (const item of filtered) {
        expect(item.revenue).toBeGreaterThanOrEqual(minRevenue);
        expect(item.revenue).toBeLessThanOrEqual(maxRevenue);
      }
    });

    it("combines search + filter + sort + paginate", () => {
      const params = paginationSchema.parse({ page: 1, perPage: 10 });
      const query = "Item";
      const minRevenue = 10000;

      const pipeline = data
        .filter(d => d.name.includes(query))
        .filter(d => d.revenue >= minRevenue)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, params.perPage);

      expect(pipeline.length).toBeLessThanOrEqual(params.perPage);
      for (let i = 1; i < pipeline.length; i++) {
        expect(pipeline[i - 1].revenue).toBeGreaterThanOrEqual(pipeline[i].revenue);
      }
    });
  });

  describe("formatting pipeline", () => {
    it("formats all fields of a data item", () => {
      const item = generateData(1)[0];
      const formatted = {
        revenue: formatCurrency(item.revenue),
        visitors: formatCompact(item.visitors),
        size: formatBytes(item.size),
        createdAt: formatRelative(item.createdAt),
      };
      expect(formatted.revenue).toContain("$");
      expect(formatted.visitors).toBeTruthy();
      expect(formatted.size).toMatch(/(B|KB|MB|GB)/);
      expect(formatted.createdAt).toBeTruthy();
    });

    it("batch-formats 1000 items", () => {
      const items = generateData(1000);
      const formatted = items.map(item => ({
        ...item,
        revenueFormatted: formatCurrency(item.revenue),
        visitorsFormatted: formatNumber(item.visitors),
      }));
      expect(formatted).toHaveLength(1000);
      for (const item of formatted) {
        expect(item.revenueFormatted).toContain("$");
      }
    });
  });
});
