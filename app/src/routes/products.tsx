import type { Route } from "./+types/products";
import { useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "~/lib/cn";
import { formatDate, formatCurrency, formatNumber, formatRelative } from "~/lib/format";
import { z } from "zod";
import { Flex } from "~/components/layout/Flex";
import { Command } from "~/components/ui/Command";
import { ComparisonWidget } from "~/components/dashboard/ComparisonWidget";
import { UndoRedo } from "~/components/features/UndoRedo";

// ─── Types ───

interface ProductsItem {
  id: string;
  name: string;
  status: "active" | "inactive" | "pending" | "archived";
  description: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
  tags: string[];
  priority: "low" | "normal" | "high" | "critical";
  assignee: { id: string; name: string; email: string; avatar?: string } | null;
  metrics: { views: number; clicks: number; conversions: number; revenue: number };
}

const ProductsFilterSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().max(100).default(20),
  sort: z.enum(["name", "createdAt", "updatedAt", "status", "priority"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
  status: z.enum(["active", "inactive", "pending", "archived", "all"]).default("all"),
  search: z.string().max(200).optional(),
  tags: z.array(z.string()).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

// ─── Loader ───

export async function loader({ request, params }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const filters = ProductsFilterSchema.parse(Object.fromEntries(url.searchParams));

  // Simulated data generation
  const total = 143;
  const items: ProductsItem[] = Array.from({ length: filters.perPage }, (_, i) => {
    const idx = (filters.page - 1) * filters.perPage + i;
    const statuses = ["active", "inactive", "pending", "archived"] as const;
    const priorities = ["low", "normal", "high", "critical"] as const;
    return {
      id: `products-${idx + 1}`,
      name: `Products Item ${idx + 1}`,
      status: statuses[idx % statuses.length],
      description: `Description for products item ${idx + 1}. This is a detailed description that provides context about this particular item.`,
      createdAt: new Date(Date.now() - idx * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - idx * 43200000).toISOString(),
      metadata: { source: "api", version: `1.${idx % 10}` },
      tags: [`tag-${idx % 5}`, `category-${idx % 3}`],
      priority: priorities[idx % priorities.length],
      assignee: idx % 3 === 0 ? null : {
        id: `user-${idx % 10}`,
        name: `User ${idx % 10}`,
        email: `user${idx % 10}@example.com`,
      },
      metrics: {
        views: Math.floor(Math.random() * 10000),
        clicks: Math.floor(Math.random() * 1000),
        conversions: Math.floor(Math.random() * 100),
        revenue: Math.random() * 50000,
      },
    };
  });

  const aggregates = {
    totalRevenue: items.reduce((sum, item) => sum + item.metrics.revenue, 0),
    totalViews: items.reduce((sum, item) => sum + item.metrics.views, 0),
    avgConversion: items.reduce((sum, item) => sum + item.metrics.conversions, 0) / items.length,
    activeCount: items.filter(i => i.status === "active").length,
    pendingCount: items.filter(i => i.status === "pending").length,
  };

  return {
    items,
    total,
    page: filters.page,
    perPage: filters.perPage,
    totalPages: Math.ceil(total / filters.perPage),
    filters,
    aggregates,
  };
}

// ─── Meta ───

export function meta() {
  return [
    { title: "Products | Docker Harness App" },
    { name: "description", content: "Manage products" },
  ];
}

// ─── Component ───

export default function Products({ children }: { children?: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle sidebar"
            >
              <div className="w-5 h-5 flex flex-col justify-center gap-1">
                <span className="block h-0.5 w-5 bg-gray-600 dark:bg-gray-300" />
                <span className="block h-0.5 w-5 bg-gray-600 dark:bg-gray-300" />
                <span className="block h-0.5 w-5 bg-gray-600 dark:bg-gray-300" />
              </div>
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Products</h1>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-64 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </header>
      <div className="flex">
        {sidebarOpen && (
          <aside className="w-64 shrink-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-h-[calc(100vh-3.5rem)]">
            <nav className="p-4 space-y-1">
              {["Overview", "Analytics", "Reports", "Settings"].map((item) => (
                <a key={item} href="#" className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">{item}</a>
              ))}
            </nav>
          </aside>
        )}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
