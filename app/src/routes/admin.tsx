import type { Route } from "./+types/admin";
import { useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "~/lib/cn";
import { formatDate, formatCurrency, formatNumber, formatRelative } from "~/lib/format";
import { PermissionGate } from "~/components/features/PermissionGate";
import { ErrorRateWidget } from "~/components/dashboard/ErrorRateWidget";
import { Table } from "~/components/ui/Table";

// ─── Types ───

interface AdminItem {
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

// ─── Meta ───

export function meta() {
  return [
    { title: "Admin | Docker Harness App" },
    { name: "description", content: "Manage admin" },
  ];
}

// ─── Component ───

export default function Admin({ children }: { children?: React.ReactNode }) {
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
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Admin</h1>
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
