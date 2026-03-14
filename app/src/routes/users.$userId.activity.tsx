import type { Route } from "./+types/users.$userId.activity";
import { useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "~/lib/cn";
import { formatDate, formatCurrency, formatNumber, formatRelative } from "~/lib/format";
import { z } from "zod";
import { MasonryGrid } from "~/components/data/MasonryGrid";
import { Histogram } from "~/components/charts/Histogram";
import { ExportConfigForm } from "~/components/forms/ExportConfigForm";
import { BulkEditDialog } from "~/components/features/BulkEditDialog";
import { AlertsPanel } from "~/components/dashboard/AlertsPanel";

// ─── Types ───

interface UserActivityItem {
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

const UserActivityFilterSchema = z.object({
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
  const filters = UserActivityFilterSchema.parse(Object.fromEntries(url.searchParams));

  // Simulated data generation
  const total = 152;
  const items: UserActivityItem[] = Array.from({ length: filters.perPage }, (_, i) => {
    const idx = (filters.page - 1) * filters.perPage + i;
    const statuses = ["active", "inactive", "pending", "archived"] as const;
    const priorities = ["low", "normal", "high", "critical"] as const;
    return {
      id: `user-${idx + 1}`,
      name: `User Item ${idx + 1}`,
      status: statuses[idx % statuses.length],
      description: `Description for user item ${idx + 1}. This is a detailed description that provides context about this particular item.`,
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

// ─── Action ───

const UserActivityActionSchema = z.discriminatedUnion("intent", [
  z.object({ intent: z.literal("create"), name: z.string().min(1), description: z.string().optional() }),
  z.object({ intent: z.literal("update"), id: z.string(), name: z.string().min(1).optional(), status: z.enum(["active", "inactive", "pending", "archived"]).optional() }),
  z.object({ intent: z.literal("delete"), id: z.string() }),
  z.object({ intent: z.literal("bulk-delete"), ids: z.string().transform(s => s.split(",")) }),
  z.object({ intent: z.literal("export"), format: z.enum(["csv", "json", "xlsx"]).default("csv") }),
]);

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const parsed = UserActivityActionSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  switch (parsed.data.intent) {
    case "create":
      return { success: true, message: "Item created successfully", id: crypto.randomUUID() };
    case "update":
      return { success: true, message: "Item updated successfully" };
    case "delete":
      return { success: true, message: "Item deleted successfully" };
    case "bulk-delete":
      return { success: true, message: `${parsed.data.ids.length} items deleted` };
    case "export":
      return { success: true, message: `Export started in ${parsed.data.format} format` };
  }
}

// ─── Meta ───

export function meta() {
  return [
    { title: "User Activity | Docker Harness App" },
    { name: "description", content: "Manage user activity" },
  ];
}

// ─── Component ───

export default function UserActivity({ loaderData }: Route.ComponentProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"table" | "grid" | "list">("table");
  const [isCreating, setIsCreating] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { items, total, page, perPage, totalPages, aggregates } = loaderData;

  const stats = useMemo(() => [
    { label: "Total", value: formatNumber(total), change: "+12%", trend: "up" as const },
    { label: "Active", value: formatNumber(aggregates.activeCount), change: "+5%", trend: "up" as const },
    { label: "Revenue", value: formatCurrency(aggregates.totalRevenue), change: "+18%", trend: "up" as const },
    { label: "Views", value: formatNumber(aggregates.totalViews), change: "-3%", trend: "down" as const },
  ], [total, aggregates]);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Activity</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and track user activity</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {(["table", "grid", "list"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-colors", viewMode === mode ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100" : "text-gray-500 hover:text-gray-700")}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
          >
            + New
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", stat.trend === "up" ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50")}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Bulk actions */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{selectedIds.size} selected</span>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Edit</button>
          <button className="text-sm text-red-600 hover:text-red-800 font-medium">Delete</button>
          <button className="text-sm text-gray-600 hover:text-gray-800 font-medium">Export</button>
          <button onClick={() => setSelectedIds(new Set())} className="ml-auto text-sm text-gray-500 hover:text-gray-700">Clear</button>
        </div>
      )}

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <th className="w-10 px-4 py-3"><input type="checkbox" className="rounded border-gray-300" /></th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {items.map((item) => (
                <tr key={item.id} className={cn("hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors", selectedIds.has(item.id) && "bg-blue-50/50 dark:bg-blue-900/10")}>
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={selectedIds.has(item.id)} onChange={() => toggleSelect(item.id)} className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{item.name}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[200px]">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                      item.status === "active" ? "bg-green-50 text-green-700" :
                      item.status === "pending" ? "bg-yellow-50 text-yellow-700" :
                      item.status === "inactive" ? "bg-gray-100 text-gray-600" :
                      "bg-red-50 text-red-700"
                    )}>{item.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.priority}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatRelative(item.createdAt)}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{formatCurrency(item.metrics.revenue)}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                      className="text-gray-400 hover:text-gray-600 p-1 rounded"
                    >
                      ⋯
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
          <span className="text-sm text-gray-500">Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, total)} of {total}</span>
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((p) => (
              <button key={p} className={cn("w-8 h-8 rounded-md text-sm font-medium transition-colors", p === page ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700")}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
