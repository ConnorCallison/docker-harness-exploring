/**
 * Generates a realistic large React Router v7 app scaffold.
 * Creates ~200 components and ~50 routes to simulate a production app.
 *
 * Run: bun run scripts/generate-app.ts
 */

import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const APP_DIR = join(import.meta.dirname, "../app/src");

// --- Component categories ---
const componentCategories = {
  ui: [
    "Button", "Input", "Select", "Checkbox", "Radio", "Toggle", "Slider",
    "Badge", "Avatar", "Tooltip", "Popover", "Dialog", "Drawer", "Sheet",
    "Card", "Separator", "Skeleton", "Spinner", "Progress", "Alert",
    "Toast", "Tabs", "Accordion", "Breadcrumb", "Pagination", "DropdownMenu",
    "NavigationMenu", "Command", "Calendar", "DatePicker",
  ],
  layout: [
    "Header", "Footer", "Sidebar", "MainLayout", "AuthLayout", "DashboardLayout",
    "PageHeader", "PageContainer", "Section", "Grid", "Stack", "Flex",
    "AspectRatio", "ScrollArea", "ResizablePanel",
  ],
  data: [
    "DataTable", "DataGrid", "SortableTable", "FilterBar", "SearchInput",
    "PaginationControls", "ColumnSelector", "BulkActions", "ExportButton",
    "InlineEdit", "CellRenderer", "RowActions", "TableSkeleton",
    "EmptyState", "ErrorBoundary",
  ],
  charts: [
    "AreaChart", "BarChart", "LineChart", "PieChart", "ScatterChart",
    "ComposedChart", "RadarChart", "FunnelChart", "TreemapChart",
    "ChartTooltip", "ChartLegend", "ChartContainer", "Sparkline",
    "MetricCard", "StatCard",
  ],
  forms: [
    "FormField", "FormLabel", "FormMessage", "FormDescription",
    "TextareaField", "SelectField", "CheckboxField", "RadioGroupField",
    "SwitchField", "DateField", "FileUpload", "RichTextEditor",
    "AutocompleteField", "TagInput", "PhoneInput", "AddressForm",
    "PaymentForm", "ProfileForm", "SettingsForm", "LoginForm",
  ],
  features: [
    "UserMenu", "NotificationBell", "ThemeToggle", "LanguageSwitcher",
    "CommandPalette", "GlobalSearch", "RecentActivity", "OnlineStatus",
    "FilePreview", "ImageGallery", "VideoPlayer", "AudioPlayer",
    "MarkdownRenderer", "CodeBlock", "DiffViewer", "Timeline",
    "KanbanBoard", "CalendarView", "ChatWidget", "CommentThread",
    "ActivityFeed", "AuditLog", "PermissionGate", "FeatureFlag",
    "ABTestWrapper", "AnalyticsTracker", "ErrorReporter", "PerformanceMonitor",
  ],
  dashboard: [
    "OverviewPanel", "RevenueChart", "UserGrowthChart", "ConversionFunnel",
    "TopProductsTable", "RecentOrdersList", "SupportTicketList",
    "SystemHealthIndicator", "UptimeMonitor", "LatencyGraph",
    "MemoryUsageChart", "CPUChart", "DiskUsageChart", "NetworkTrafficChart",
    "ActiveUsersWidget", "SessionDurationWidget", "BounceRateWidget",
    "GeographicMap", "HeatmapWidget", "AlertsPanel",
  ],
};

// --- Route definitions ---
const routes = [
  { path: "_index", name: "Home" },
  { path: "login", name: "Login" },
  { path: "register", name: "Register" },
  { path: "forgot-password", name: "ForgotPassword" },
  { path: "dashboard", name: "Dashboard" },
  { path: "dashboard.overview", name: "DashboardOverview" },
  { path: "dashboard.analytics", name: "DashboardAnalytics" },
  { path: "dashboard.reports", name: "DashboardReports" },
  { path: "dashboard.settings", name: "DashboardSettings" },
  { path: "users", name: "Users" },
  { path: "users._index", name: "UsersList" },
  { path: "users.$userId", name: "UserDetail" },
  { path: "users.$userId.edit", name: "UserEdit" },
  { path: "users.$userId.activity", name: "UserActivity" },
  { path: "products", name: "Products" },
  { path: "products._index", name: "ProductsList" },
  { path: "products.new", name: "ProductNew" },
  { path: "products.$productId", name: "ProductDetail" },
  { path: "products.$productId.edit", name: "ProductEdit" },
  { path: "products.categories", name: "ProductCategories" },
  { path: "orders", name: "Orders" },
  { path: "orders._index", name: "OrdersList" },
  { path: "orders.$orderId", name: "OrderDetail" },
  { path: "orders.$orderId.tracking", name: "OrderTracking" },
  { path: "invoices", name: "Invoices" },
  { path: "invoices._index", name: "InvoicesList" },
  { path: "invoices.$invoiceId", name: "InvoiceDetail" },
  { path: "invoices.new", name: "InvoiceNew" },
  { path: "settings", name: "Settings" },
  { path: "settings.profile", name: "SettingsProfile" },
  { path: "settings.account", name: "SettingsAccount" },
  { path: "settings.billing", name: "SettingsBilling" },
  { path: "settings.notifications", name: "SettingsNotifications" },
  { path: "settings.integrations", name: "SettingsIntegrations" },
  { path: "settings.api-keys", name: "SettingsApiKeys" },
  { path: "settings.team", name: "SettingsTeam" },
  { path: "settings.team.$memberId", name: "SettingsTeamMember" },
  { path: "support", name: "Support" },
  { path: "support.tickets", name: "SupportTickets" },
  { path: "support.tickets.new", name: "SupportTicketNew" },
  { path: "support.tickets.$ticketId", name: "SupportTicketDetail" },
  { path: "support.knowledge-base", name: "KnowledgeBase" },
  { path: "reports", name: "Reports" },
  { path: "reports.sales", name: "ReportsSales" },
  { path: "reports.inventory", name: "ReportsInventory" },
  { path: "reports.customers", name: "ReportsCustomers" },
  { path: "reports.custom", name: "ReportsCustom" },
  { path: "admin", name: "Admin" },
  { path: "admin.system", name: "AdminSystem" },
  { path: "admin.audit-log", name: "AdminAuditLog" },
];

// --- Lib modules ---
const libs = [
  { name: "cn", content: `import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n` },
  { name: "format", content: `import { format, formatDistanceToNow, parseISO } from "date-fns";\n\nexport function formatDate(date: string | Date) {\n  const d = typeof date === "string" ? parseISO(date) : date;\n  return format(d, "MMM d, yyyy");\n}\n\nexport function formatRelative(date: string | Date) {\n  const d = typeof date === "string" ? parseISO(date) : date;\n  return formatDistanceToNow(d, { addSuffix: true });\n}\n\nexport function formatCurrency(amount: number) {\n  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);\n}\n\nexport function formatNumber(n: number) {\n  return new Intl.NumberFormat("en-US").format(n);\n}\n` },
  { name: "validators", content: `import { z } from "zod";\n\nexport const emailSchema = z.string().email();\nexport const passwordSchema = z.string().min(8).max(128);\nexport const nameSchema = z.string().min(1).max(255);\nexport const idSchema = z.string().uuid();\nexport const paginationSchema = z.object({\n  page: z.coerce.number().int().positive().default(1),\n  perPage: z.coerce.number().int().positive().max(100).default(20),\n  sort: z.string().optional(),\n  order: z.enum(["asc", "desc"]).default("desc"),\n});\nexport const searchSchema = z.object({\n  q: z.string().optional(),\n  filters: z.record(z.string()).optional(),\n});\n` },
  { name: "constants", content: `export const APP_NAME = "Docker Harness App";\nexport const API_BASE = "/api";\nexport const DEFAULT_PAGE_SIZE = 20;\nexport const MAX_FILE_SIZE = 10 * 1024 * 1024;\nexport const SUPPORTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];\nexport const ROLES = ["admin", "manager", "member", "viewer"] as const;\nexport type Role = (typeof ROLES)[number];\nexport const STATUS_COLORS: Record<string, string> = {\n  active: "text-green-600 bg-green-50",\n  inactive: "text-gray-600 bg-gray-50",\n  pending: "text-yellow-600 bg-yellow-50",\n  error: "text-red-600 bg-red-50",\n};\n` },
  { name: "hooks", content: `import { useState, useEffect, useCallback, useRef } from "react";\n\nexport function useDebounce<T>(value: T, delay: number): T {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n  useEffect(() => {\n    const handler = setTimeout(() => setDebouncedValue(value), delay);\n    return () => clearTimeout(handler);\n  }, [value, delay]);\n  return debouncedValue;\n}\n\nexport function useLocalStorage<T>(key: string, initialValue: T) {\n  const [storedValue, setStoredValue] = useState<T>(() => {\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch { return initialValue; }\n  });\n  const setValue = (value: T | ((val: T) => T)) => {\n    const valueToStore = value instanceof Function ? value(storedValue) : value;\n    setStoredValue(valueToStore);\n    window.localStorage.setItem(key, JSON.stringify(valueToStore));\n  };\n  return [storedValue, setValue] as const;\n}\n\nexport function useMediaQuery(query: string) {\n  const [matches, setMatches] = useState(false);\n  useEffect(() => {\n    const media = window.matchMedia(query);\n    setMatches(media.matches);\n    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);\n    media.addEventListener("change", listener);\n    return () => media.removeEventListener("change", listener);\n  }, [query]);\n  return matches;\n}\n\nexport function usePrevious<T>(value: T): T | undefined {\n  const ref = useRef<T | undefined>(undefined);\n  useEffect(() => { ref.current = value; });\n  return ref.current;\n}\n` },
  { name: "store", content: `import { create } from "zustand";\nimport { immer } from "zustand/middleware/immer";\n\ninterface AppState {\n  sidebarOpen: boolean;\n  theme: "light" | "dark" | "system";\n  notifications: { id: string; message: string; read: boolean }[];\n  toggleSidebar: () => void;\n  setTheme: (theme: "light" | "dark" | "system") => void;\n  addNotification: (message: string) => void;\n  markRead: (id: string) => void;\n}\n\nexport const useAppStore = create<AppState>()(immer((set) => ({\n  sidebarOpen: true,\n  theme: "system",\n  notifications: [],\n  toggleSidebar: () => set((s) => { s.sidebarOpen = !s.sidebarOpen; }),\n  setTheme: (theme) => set((s) => { s.theme = theme; }),\n  addNotification: (message) => set((s) => {\n    s.notifications.push({ id: crypto.randomUUID(), message, read: false });\n  }),\n  markRead: (id) => set((s) => {\n    const n = s.notifications.find((n) => n.id === id);\n    if (n) n.read = true;\n  }),\n})));\n` },
];

// --- Generate components ---
function generateComponent(name: string, category: string): string {
  const hasState = Math.random() > 0.5;
  const hasProps = Math.random() > 0.3;

  const imports = [`import { cn } from "~/lib/cn";`];
  if (hasState) imports.push(`import { useState } from "react";`);
  if (category === "charts") imports.push(`import { ResponsiveContainer } from "recharts";`);
  if (category === "data") imports.push(`import { formatNumber } from "~/lib/format";`);

  const propsType = hasProps
    ? `\ninterface ${name}Props {\n  className?: string;\n  children?: React.ReactNode;${category === "ui" ? "\n  variant?: \"default\" | \"primary\" | \"secondary\" | \"destructive\";\n  size?: \"sm\" | \"md\" | \"lg\";" : ""}${category === "data" ? "\n  data?: Record<string, unknown>[];\n  loading?: boolean;" : ""}\n}\n`
    : "";

  const propsArg = hasProps ? `{ className, children${category === "ui" ? ", variant = \"default\", size = \"md\"" : ""}${category === "data" ? ", data = [], loading = false" : ""} }: ${name}Props` : "";

  const stateLines = hasState
    ? `\n  const [isActive, setIsActive] = useState(false);\n`
    : "";

  return `${imports.join("\n")}\n${propsType}\nexport function ${name}(${propsArg}) {${stateLines}\n  return (\n    <div className={cn("${name.replace(/([A-Z])/g, "-$1").toLowerCase().slice(1)}", ${hasProps ? "className" : '""'})}>\n      <div className="p-4">\n        <h3 className="text-lg font-semibold">${name.replace(/([A-Z])/g, " $1").trim()}</h3>${hasState ? '\n        <button onClick={() => setIsActive(!isActive)} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white">\n          {isActive ? "Active" : "Inactive"}\n        </button>' : ""}${hasProps && category === "data" ? "\n        {loading ? <div>Loading...</div> : <div>{formatNumber(data.length)} items</div>}" : ""}\n        {${hasProps ? "children" : "null"}}\n      </div>\n    </div>\n  );\n}\n`;
}

function generateRoute(route: { path: string; name: string }): string {
  const hasLoader = Math.random() > 0.3;
  const hasAction = Math.random() > 0.6;
  const isLayout = !route.path.includes(".");

  const imports = [
    `import type { Route } from "./+types/${route.path}";`,
  ];

  // Import some components to make dependencies realistic
  const componentImports: string[] = [];
  if (route.path.includes("dashboard")) {
    componentImports.push(`import { MetricCard } from "~/components/charts/MetricCard";`);
    componentImports.push(`import { AreaChart } from "~/components/charts/AreaChart";`);
  }
  if (route.path.includes("users") || route.path.includes("products") || route.path.includes("orders")) {
    componentImports.push(`import { DataTable } from "~/components/data/DataTable";`);
    componentImports.push(`import { FilterBar } from "~/components/data/FilterBar";`);
  }
  if (route.path.includes("settings")) {
    componentImports.push(`import { Card } from "~/components/ui/Card";`);
    componentImports.push(`import { Button } from "~/components/ui/Button";`);
  }

  imports.push(...componentImports);

  let loaderCode = "";
  if (hasLoader) {
    loaderCode = `\nexport async function loader({ request }: Route.LoaderArgs) {\n  const url = new URL(request.url);\n  const page = Number(url.searchParams.get("page") ?? "1");\n  // Simulated data fetching\n  return {\n    data: Array.from({ length: 20 }, (_, i) => ({\n      id: \`item-\${(page - 1) * 20 + i + 1}\`,\n      name: \`Item \${(page - 1) * 20 + i + 1}\`,\n      status: i % 3 === 0 ? "active" : i % 3 === 1 ? "pending" : "inactive",\n      createdAt: new Date(Date.now() - i * 86400000).toISOString(),\n    })),\n    total: 100,\n    page,\n  };\n}\n`;
  }

  let actionCode = "";
  if (hasAction) {
    actionCode = `\nexport async function action({ request }: Route.ActionArgs) {\n  const formData = await request.formData();\n  const intent = formData.get("intent");\n  if (intent === "delete") {\n    return { success: true, message: "Item deleted" };\n  }\n  return { success: true, message: "Action completed" };\n}\n`;
  }

  const componentCode = isLayout
    ? `\nexport default function ${route.name}({ children }: { children?: React.ReactNode }) {\n  return (\n    <div className="min-h-screen bg-gray-50">\n      <header className="bg-white border-b px-6 py-4">\n        <h1 className="text-2xl font-bold">${route.name.replace(/([A-Z])/g, " $1").trim()}</h1>\n      </header>\n      <main className="p-6">\n        {children}\n      </main>\n    </div>\n  );\n}\n`
    : `\nexport default function ${route.name}(${hasLoader ? `{ loaderData }: Route.ComponentProps` : ""}) {\n  return (\n    <div className="space-y-6">\n      <div className="flex items-center justify-between">\n        <h2 className="text-xl font-semibold">${route.name.replace(/([A-Z])/g, " $1").trim()}</h2>\n      </div>\n      <div className="bg-white rounded-lg shadow p-6">\n        ${hasLoader ? "<pre>{JSON.stringify(loaderData, null, 2)}</pre>" : "<p>Content goes here</p>"}\n      </div>\n    </div>\n  );\n}\n`;

  return `${imports.join("\n")}\n${loaderCode}${actionCode}${componentCode}`;
}

// --- Write files ---
console.log("Generating app scaffold...\n");

// Components
let totalComponents = 0;
for (const [category, names] of Object.entries(componentCategories)) {
  const dir = join(APP_DIR, "components", category);
  mkdirSync(dir, { recursive: true });

  for (const name of names) {
    const content = generateComponent(name, category);
    writeFileSync(join(dir, `${name}.tsx`), content);
    totalComponents++;
  }

  // Index file
  const indexContent = names.map((n) => `export { ${n} } from "./${n}";`).join("\n") + "\n";
  writeFileSync(join(dir, "index.ts"), indexContent);
}
console.log(`Generated ${totalComponents} components across ${Object.keys(componentCategories).length} categories`);

// Routes
const routesDir = join(APP_DIR, "routes");
mkdirSync(routesDir, { recursive: true });
for (const route of routes) {
  const content = generateRoute(route);
  writeFileSync(join(routesDir, `${route.path}.tsx`), content);
}
console.log(`Generated ${routes.length} routes`);

// Lib modules
const libDir = join(APP_DIR, "lib");
mkdirSync(libDir, { recursive: true });
for (const lib of libs) {
  writeFileSync(join(libDir, `${lib.name}.ts`), lib.content);
}
console.log(`Generated ${libs.length} lib modules`);

console.log(`\nTotal files: ${totalComponents + routes.length + libs.length}`);
