/**
 * Generates a large realistic React Router v7 app scaffold.
 * Target: 1500+ files, 150k+ lines, 15-20MB source.
 *
 * Run: bun run scripts/generate-app.ts
 */

import { mkdirSync, writeFileSync, rmSync, existsSync } from "fs";
import { join } from "path";

const APP_DIR = join(import.meta.dirname, "../app/src");
const seed = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
};
const seededRandom = (s: string) => {
  const h = seed(s);
  return ((h & 0x7fffffff) % 1000) / 1000;
};

// ─── Component categories (500 total) ───

const uiComponents = [
  "Button","Input","Select","Checkbox","Radio","Toggle","Slider","Badge","Avatar",
  "Tooltip","Popover","Dialog","Drawer","Sheet","Card","Separator","Skeleton",
  "Spinner","Progress","Alert","Toast","Tabs","Accordion","Breadcrumb","Pagination",
  "DropdownMenu","NavigationMenu","Command","Calendar","DatePicker","Switch",
  "Label","Textarea","ScrollArea","AspectRatio","Collapsible","ContextMenu",
  "HoverCard","Menubar","RadioGroup","Resizable","Sonner","InputOTP",
  "Carousel","Table","DataList","Callout","Kbd","Code","Heading","Text",
  "BlockQuote","Link","Em","Strong","VisuallyHidden","Portal","Slot",
  "IconButton","ButtonGroup","CloseButton","CopyButton","ThemeIcon",
  "ColorSwatch","Indicator","Overlay","LoadingOverlay","BackgroundImage",
  "Image","NumberInput","PasswordInput","PinInput","ColorInput","FileInput",
  "JsonInput","Chip","MultiSelect","TransferList","SegmentedControl","Rating",
  "StepperInput","RangeSlider","ColorPicker","TimeInput","YearPicker",
];
const layoutComponents = [
  "Header","Footer","Sidebar","MainLayout","AuthLayout","DashboardLayout",
  "PageHeader","PageContainer","Section","Grid","Stack","Flex","Center",
  "Container","SimpleGrid","MediaQuery","AppShell","Navbar","Aside",
  "SplitView","MasterDetail","TwoColumnLayout","ThreeColumnLayout",
  "StickyHeader","FloatingNav","Dock","StatusBar","BottomSheet","PanelGroup",
];
const dataComponents = [
  "DataTable","DataGrid","SortableTable","FilterBar","SearchInput",
  "PaginationControls","ColumnSelector","BulkActions","ExportButton",
  "InlineEdit","CellRenderer","RowActions","TableSkeleton","EmptyState",
  "ErrorBoundary","VirtualList","VirtualGrid","TreeView","ListView",
  "CardGrid","MasonryGrid","InfiniteScroll","LazyLoad","DataCard",
  "StatDisplay","ComparisonTable","PivotTable","GroupedList","TimelineList",
  "FeedList","NestedTable","ExpandableRow","SelectableList","DragSortList",
  "TagCloud","WordCloud","DataExplorer","QueryBuilder","FilterChips",
  "ActiveFilters","SavedFilters","ColumnResize","ColumnDrag","FrozenColumns",
];
const chartComponents = [
  "AreaChart","BarChart","LineChart","PieChart","ScatterChart","ComposedChart",
  "RadarChart","FunnelChart","TreemapChart","ChartTooltip","ChartLegend",
  "ChartContainer","Sparkline","MetricCard","StatCard","DonutChart",
  "GaugeChart","BulletChart","WaterfallChart","SankeyChart","CandlestickChart",
  "BoxPlotChart","ViolinChart","HeatmapChart","BubbleChart","StackedBarChart",
  "GroupedBarChart","AreaStackChart","MultiAxisChart","MiniChart","TrendLine",
  "Histogram","DensityPlot","ParallelCoordinates","ChordDiagram","ForceGraph",
  "SunburstChart","IciclePlot","StreamGraph","RidgePlot","BeeswarmPlot",
];
const formComponents = [
  "FormField","FormLabel","FormMessage","FormDescription","TextareaField",
  "SelectField","CheckboxField","RadioGroupField","SwitchField","DateField",
  "FileUpload","RichTextEditor","AutocompleteField","TagInput","PhoneInput",
  "AddressForm","PaymentForm","ProfileForm","SettingsForm","LoginForm",
  "RegisterForm","ResetPasswordForm","TwoFactorForm","InviteForm",
  "BulkImportForm","ExportConfigForm","WebhookForm","ApiKeyForm",
  "NotificationPrefsForm","IntegrationForm","CustomFieldForm","RuleBuilder",
  "ConditionEditor","ExpressionInput","CronEditor","JsonEditor","YamlEditor",
  "TemplateEditor","VariableInput","MappingEditor","SchemaEditor","FilterForm",
  "SortConfigForm","LayoutConfigForm","ThemeConfigForm","LocaleConfigForm",
];
const featureComponents = [
  "UserMenu","NotificationBell","ThemeToggle","LanguageSwitcher","CommandPalette",
  "GlobalSearch","RecentActivity","OnlineStatus","FilePreview","ImageGallery",
  "VideoPlayer","AudioPlayer","MarkdownRenderer","CodeBlock","DiffViewer",
  "Timeline","KanbanBoard","CalendarView","ChatWidget","CommentThread",
  "ActivityFeed","AuditLog","PermissionGate","FeatureFlag","ABTestWrapper",
  "AnalyticsTracker","ErrorReporter","PerformanceMonitor","Spotlight",
  "QuickActions","KeyboardShortcuts","TooltipProvider","DragDropContext",
  "SelectionProvider","UndoRedo","ClipboardManager","ShareDialog",
  "EmbedDialog","ExportDialog","ImportDialog","BulkEditDialog",
  "ConfirmDialog","WizardDialog","OnboardingFlow","TourGuide",
  "ChangelogViewer","StatusPage","MaintenanceBanner","AnnouncementBar",
  "CookieConsent","FeedbackWidget","SatisfactionSurvey","NpsWidget",
  "BugReportForm","ScreenRecorder","SessionReplay","HelpCenter",
  "ContactForm","LiveChat","Chatbot","VoiceInput","SpeechToText",
];
const dashboardComponents = [
  "OverviewPanel","RevenueChart","UserGrowthChart","ConversionFunnel",
  "TopProductsTable","RecentOrdersList","SupportTicketList",
  "SystemHealthIndicator","UptimeMonitor","LatencyGraph",
  "MemoryUsageChart","CPUChart","DiskUsageChart","NetworkTrafficChart",
  "ActiveUsersWidget","SessionDurationWidget","BounceRateWidget",
  "GeographicMap","HeatmapWidget","AlertsPanel","RealtimeCounter",
  "EventStream","LogViewer","MetricsExplorer","TraceViewer",
  "SpanTimeline","ServiceMap","DependencyGraph","ErrorRateWidget",
  "ThroughputWidget","P99LatencyWidget","SLOTracker","BudgetTracker",
  "CostExplorer","ResourceUsage","CapacityPlanner","ForecastWidget",
  "AnomalyDetector","CorrelationView","ComparisonWidget","BenchmarkWidget",
];

const componentCategories: Record<string, string[]> = {
  ui: uiComponents,
  layout: layoutComponents,
  data: dataComponents,
  charts: chartComponents,
  forms: formComponents,
  features: featureComponents,
  dashboard: dashboardComponents,
};

// ─── Routes (150 total) ───

const routeDefs = [
  { path: "_index", name: "Home" },
  { path: "login", name: "Login" },
  { path: "register", name: "Register" },
  { path: "forgot-password", name: "ForgotPassword" },
  { path: "verify-email", name: "VerifyEmail" },
  { path: "onboarding", name: "Onboarding" },
  { path: "onboarding.step1", name: "OnboardingStep1" },
  { path: "onboarding.step2", name: "OnboardingStep2" },
  { path: "onboarding.step3", name: "OnboardingStep3" },
  { path: "dashboard", name: "Dashboard" },
  { path: "dashboard.overview", name: "DashboardOverview" },
  { path: "dashboard.analytics", name: "DashboardAnalytics" },
  { path: "dashboard.reports", name: "DashboardReports" },
  { path: "dashboard.settings", name: "DashboardSettings" },
  { path: "dashboard.realtime", name: "DashboardRealtime" },
  { path: "dashboard.metrics", name: "DashboardMetrics" },
  { path: "dashboard.alerts", name: "DashboardAlerts" },
  { path: "dashboard.logs", name: "DashboardLogs" },
  { path: "users", name: "Users" },
  { path: "users._index", name: "UsersList" },
  { path: "users.new", name: "UsersNew" },
  { path: "users.$userId", name: "UserDetail" },
  { path: "users.$userId.edit", name: "UserEdit" },
  { path: "users.$userId.activity", name: "UserActivity" },
  { path: "users.$userId.permissions", name: "UserPermissions" },
  { path: "users.$userId.sessions", name: "UserSessions" },
  { path: "users.$userId.audit", name: "UserAudit" },
  { path: "users.roles", name: "UsersRoles" },
  { path: "users.roles.$roleId", name: "UsersRoleDetail" },
  { path: "users.groups", name: "UsersGroups" },
  { path: "users.invitations", name: "UsersInvitations" },
  { path: "products", name: "Products" },
  { path: "products._index", name: "ProductsList" },
  { path: "products.new", name: "ProductNew" },
  { path: "products.$productId", name: "ProductDetail" },
  { path: "products.$productId.edit", name: "ProductEdit" },
  { path: "products.$productId.variants", name: "ProductVariants" },
  { path: "products.$productId.media", name: "ProductMedia" },
  { path: "products.$productId.reviews", name: "ProductReviews" },
  { path: "products.$productId.analytics", name: "ProductAnalytics" },
  { path: "products.categories", name: "ProductCategories" },
  { path: "products.categories.$catId", name: "ProductCategoryDetail" },
  { path: "products.collections", name: "ProductCollections" },
  { path: "products.inventory", name: "ProductInventory" },
  { path: "products.pricing", name: "ProductPricing" },
  { path: "products.import", name: "ProductImport" },
  { path: "products.export", name: "ProductExport" },
  { path: "orders", name: "Orders" },
  { path: "orders._index", name: "OrdersList" },
  { path: "orders.$orderId", name: "OrderDetail" },
  { path: "orders.$orderId.tracking", name: "OrderTracking" },
  { path: "orders.$orderId.refund", name: "OrderRefund" },
  { path: "orders.$orderId.notes", name: "OrderNotes" },
  { path: "orders.$orderId.timeline", name: "OrderTimeline" },
  { path: "orders.returns", name: "OrderReturns" },
  { path: "orders.returns.$returnId", name: "OrderReturnDetail" },
  { path: "orders.fulfillment", name: "OrderFulfillment" },
  { path: "orders.shipments", name: "OrderShipments" },
  { path: "invoices", name: "Invoices" },
  { path: "invoices._index", name: "InvoicesList" },
  { path: "invoices.$invoiceId", name: "InvoiceDetail" },
  { path: "invoices.new", name: "InvoiceNew" },
  { path: "invoices.$invoiceId.send", name: "InvoiceSend" },
  { path: "invoices.recurring", name: "InvoicesRecurring" },
  { path: "invoices.templates", name: "InvoiceTemplates" },
  { path: "customers", name: "Customers" },
  { path: "customers._index", name: "CustomersList" },
  { path: "customers.new", name: "CustomerNew" },
  { path: "customers.$customerId", name: "CustomerDetail" },
  { path: "customers.$customerId.edit", name: "CustomerEdit" },
  { path: "customers.$customerId.orders", name: "CustomerOrders" },
  { path: "customers.$customerId.notes", name: "CustomerNotes" },
  { path: "customers.$customerId.segments", name: "CustomerSegments" },
  { path: "customers.segments", name: "Segments" },
  { path: "customers.segments.$segmentId", name: "SegmentDetail" },
  { path: "customers.import", name: "CustomerImport" },
  { path: "marketing", name: "Marketing" },
  { path: "marketing.campaigns", name: "MarketingCampaigns" },
  { path: "marketing.campaigns.new", name: "MarketingCampaignNew" },
  { path: "marketing.campaigns.$campaignId", name: "MarketingCampaignDetail" },
  { path: "marketing.email", name: "MarketingEmail" },
  { path: "marketing.email.templates", name: "MarketingEmailTemplates" },
  { path: "marketing.automations", name: "MarketingAutomations" },
  { path: "marketing.automations.$automationId", name: "MarketingAutomationDetail" },
  { path: "marketing.coupons", name: "MarketingCoupons" },
  { path: "marketing.coupons.new", name: "MarketingCouponNew" },
  { path: "marketing.analytics", name: "MarketingAnalytics" },
  { path: "marketing.seo", name: "MarketingSEO" },
  { path: "content", name: "Content" },
  { path: "content.pages", name: "ContentPages" },
  { path: "content.pages.new", name: "ContentPageNew" },
  { path: "content.pages.$pageId", name: "ContentPageDetail" },
  { path: "content.blog", name: "ContentBlog" },
  { path: "content.blog.new", name: "ContentBlogNew" },
  { path: "content.blog.$postId", name: "ContentBlogDetail" },
  { path: "content.media", name: "ContentMedia" },
  { path: "content.navigation", name: "ContentNavigation" },
  { path: "content.redirects", name: "ContentRedirects" },
  { path: "settings", name: "Settings" },
  { path: "settings.profile", name: "SettingsProfile" },
  { path: "settings.account", name: "SettingsAccount" },
  { path: "settings.billing", name: "SettingsBilling" },
  { path: "settings.billing.plans", name: "SettingsBillingPlans" },
  { path: "settings.billing.invoices", name: "SettingsBillingInvoices" },
  { path: "settings.billing.payment-methods", name: "SettingsPaymentMethods" },
  { path: "settings.notifications", name: "SettingsNotifications" },
  { path: "settings.integrations", name: "SettingsIntegrations" },
  { path: "settings.integrations.$integrationId", name: "SettingsIntegrationDetail" },
  { path: "settings.api-keys", name: "SettingsApiKeys" },
  { path: "settings.webhooks", name: "SettingsWebhooks" },
  { path: "settings.webhooks.new", name: "SettingsWebhookNew" },
  { path: "settings.webhooks.$webhookId", name: "SettingsWebhookDetail" },
  { path: "settings.team", name: "SettingsTeam" },
  { path: "settings.team.$memberId", name: "SettingsTeamMember" },
  { path: "settings.security", name: "SettingsSecurity" },
  { path: "settings.security.two-factor", name: "SettingsTwoFactor" },
  { path: "settings.security.sessions", name: "SettingsSessions" },
  { path: "settings.domains", name: "SettingsDomains" },
  { path: "settings.emails", name: "SettingsEmails" },
  { path: "settings.shipping", name: "SettingsShipping" },
  { path: "settings.taxes", name: "SettingsTaxes" },
  { path: "settings.checkout", name: "SettingsCheckout" },
  { path: "settings.localization", name: "SettingsLocalization" },
  { path: "support", name: "Support" },
  { path: "support.tickets", name: "SupportTickets" },
  { path: "support.tickets.new", name: "SupportTicketNew" },
  { path: "support.tickets.$ticketId", name: "SupportTicketDetail" },
  { path: "support.knowledge-base", name: "KnowledgeBase" },
  { path: "support.knowledge-base.$articleId", name: "KnowledgeBaseArticle" },
  { path: "support.chat", name: "SupportChat" },
  { path: "reports", name: "Reports" },
  { path: "reports.sales", name: "ReportsSales" },
  { path: "reports.sales.daily", name: "ReportsSalesDaily" },
  { path: "reports.sales.monthly", name: "ReportsSalesMonthly" },
  { path: "reports.inventory", name: "ReportsInventory" },
  { path: "reports.customers", name: "ReportsCustomers" },
  { path: "reports.custom", name: "ReportsCustom" },
  { path: "reports.custom.new", name: "ReportsCustomNew" },
  { path: "reports.custom.$reportId", name: "ReportsCustomDetail" },
  { path: "reports.exports", name: "ReportsExports" },
  { path: "admin", name: "Admin" },
  { path: "admin.system", name: "AdminSystem" },
  { path: "admin.audit-log", name: "AdminAuditLog" },
  { path: "admin.feature-flags", name: "AdminFeatureFlags" },
  { path: "admin.maintenance", name: "AdminMaintenance" },
  { path: "admin.migrations", name: "AdminMigrations" },
  { path: "admin.cache", name: "AdminCache" },
  { path: "admin.queues", name: "AdminQueues" },
  { path: "admin.workers", name: "AdminWorkers" },
];

// ─── Lib modules (20 total) ───

function generateLibModule(name: string, idx: number): string {
  // Generate 200-500 lines of realistic lib code
  const lines: string[] = [];

  switch (name) {
    case "cn":
      lines.push(`import { clsx, type ClassValue } from "clsx";`);
      lines.push(`import { twMerge } from "tailwind-merge";`);
      lines.push(``);
      lines.push(`export function cn(...inputs: ClassValue[]) {`);
      lines.push(`  return twMerge(clsx(inputs));`);
      lines.push(`}`);
      lines.push(``);
      lines.push(`export function cx(...classes: (string | boolean | undefined | null)[]) {`);
      lines.push(`  return classes.filter(Boolean).join(" ");`);
      lines.push(`}`);
      break;

    case "format":
      lines.push(`import { format, formatDistanceToNow, parseISO, differenceInDays, differenceInHours, differenceInMinutes, isToday, isYesterday, isThisWeek, isThisMonth, isThisYear, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addDays, subDays, addMonths, subMonths, eachDayOfInterval, eachMonthOfInterval, isBefore, isAfter, isSameDay, getYear, getMonth, getDate, getHours, getMinutes } from "date-fns";`);
      lines.push(``);
      lines.push(`export type DateInput = string | Date | number;`);
      lines.push(``);
      lines.push(`function toDate(d: DateInput): Date {`);
      lines.push(`  if (d instanceof Date) return d;`);
      lines.push(`  if (typeof d === "number") return new Date(d);`);
      lines.push(`  return parseISO(d);`);
      lines.push(`}`);
      lines.push(``);
      for (const fn of ["formatDate", "formatDateTime", "formatTime", "formatShortDate", "formatLongDate", "formatISO8601", "formatRFC2822"]) {
        const fmt = fn === "formatDate" ? "MMM d, yyyy" : fn === "formatDateTime" ? "MMM d, yyyy h:mm a" : fn === "formatTime" ? "h:mm a" : fn === "formatShortDate" ? "M/d/yy" : fn === "formatLongDate" ? "EEEE, MMMM d, yyyy" : fn === "formatISO8601" ? "yyyy-MM-dd'T'HH:mm:ss.SSSxxx" : "EEE, dd MMM yyyy HH:mm:ss xx";
        lines.push(`export function ${fn}(date: DateInput): string {`);
        lines.push(`  return format(toDate(date), "${fmt}");`);
        lines.push(`}`);
        lines.push(``);
      }
      lines.push(`export function formatRelative(date: DateInput): string {`);
      lines.push(`  const d = toDate(date);`);
      lines.push(`  if (isToday(d)) return formatDistanceToNow(d, { addSuffix: true });`);
      lines.push(`  if (isYesterday(d)) return "yesterday";`);
      lines.push(`  if (isThisWeek(d)) return format(d, "EEEE");`);
      lines.push(`  if (isThisYear(d)) return format(d, "MMM d");`);
      lines.push(`  return format(d, "MMM d, yyyy");`);
      lines.push(`}`);
      lines.push(``);
      lines.push(`export function formatDuration(ms: number): string {`);
      lines.push(`  if (ms < 1000) return \`\${ms}ms\`;`);
      lines.push(`  if (ms < 60000) return \`\${(ms / 1000).toFixed(1)}s\`;`);
      lines.push(`  if (ms < 3600000) return \`\${Math.floor(ms / 60000)}m \${Math.floor((ms % 60000) / 1000)}s\`;`);
      lines.push(`  return \`\${Math.floor(ms / 3600000)}h \${Math.floor((ms % 3600000) / 60000)}m\`;`);
      lines.push(`}`);
      lines.push(``);
      lines.push(`export function formatCurrency(amount: number, currency = "USD", locale = "en-US"): string {`);
      lines.push(`  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);`);
      lines.push(`}`);
      lines.push(``);
      lines.push(`export function formatNumber(n: number, locale = "en-US"): string {`);
      lines.push(`  return new Intl.NumberFormat(locale).format(n);`);
      lines.push(`}`);
      lines.push(``);
      lines.push(`export function formatCompact(n: number): string {`);
      lines.push(`  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);`);
      lines.push(`}`);
      lines.push(``);
      lines.push(`export function formatPercent(n: number, decimals = 1): string {`);
      lines.push(`  return \`\${(n * 100).toFixed(decimals)}%\`;`);
      lines.push(`}`);
      lines.push(``);
      lines.push(`export function formatBytes(bytes: number): string {`);
      lines.push(`  const units = ["B", "KB", "MB", "GB", "TB"];`);
      lines.push(`  let i = 0;`);
      lines.push(`  let size = bytes;`);
      lines.push(`  while (size >= 1024 && i < units.length - 1) { size /= 1024; i++; }`);
      lines.push(`  return \`\${size.toFixed(i === 0 ? 0 : 1)} \${units[i]}\`;`);
      lines.push(`}`);
      lines.push(``);
      lines.push(`export function getDateRange(range: "today" | "yesterday" | "7d" | "30d" | "90d" | "thisMonth" | "lastMonth" | "thisYear") {`);
      lines.push(`  const now = new Date();`);
      lines.push(`  switch (range) {`);
      lines.push(`    case "today": return { start: startOfDay(now), end: endOfDay(now) };`);
      lines.push(`    case "yesterday": return { start: startOfDay(subDays(now, 1)), end: endOfDay(subDays(now, 1)) };`);
      lines.push(`    case "7d": return { start: startOfDay(subDays(now, 7)), end: endOfDay(now) };`);
      lines.push(`    case "30d": return { start: startOfDay(subDays(now, 30)), end: endOfDay(now) };`);
      lines.push(`    case "90d": return { start: startOfDay(subDays(now, 90)), end: endOfDay(now) };`);
      lines.push(`    case "thisMonth": return { start: startOfMonth(now), end: endOfMonth(now) };`);
      lines.push(`    case "lastMonth": return { start: startOfMonth(subMonths(now, 1)), end: endOfMonth(subMonths(now, 1)) };`);
      lines.push(`    case "thisYear": return { start: new Date(getYear(now), 0, 1), end: endOfDay(now) };`);
      lines.push(`  }`);
      lines.push(`}`);
      break;

    case "validators":
      lines.push(`import { z } from "zod";`);
      lines.push(``);
      for (const [schema, def] of Object.entries({
        email: `z.string().email("Invalid email address").min(5).max(255)`,
        password: `z.string().min(8, "Password must be at least 8 characters").max(128).regex(/[A-Z]/, "Must contain uppercase").regex(/[a-z]/, "Must contain lowercase").regex(/[0-9]/, "Must contain a number")`,
        name: `z.string().min(1, "Name is required").max(255).trim()`,
        id: `z.string().uuid("Invalid ID format")`,
        slug: `z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format").min(1).max(255)`,
        url: `z.string().url("Invalid URL").max(2048)`,
        phone: `z.string().regex(/^\\+?[1-9]\\d{1,14}$/, "Invalid phone number")`,
        currency: `z.number().min(0).max(999999999.99).multipleOf(0.01)`,
        quantity: `z.number().int().min(0).max(999999)`,
        percentage: `z.number().min(0).max(100)`,
        color: `z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Invalid hex color")`,
        dateString: `z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/, "Expected YYYY-MM-DD format")`,
        jsonString: `z.string().refine((val) => { try { JSON.parse(val); return true; } catch { return false; } }, "Invalid JSON")`,
      })) {
        lines.push(`export const ${schema}Schema = ${def};`);
        lines.push(``);
      }
      lines.push(`export const paginationSchema = z.object({`);
      lines.push(`  page: z.coerce.number().int().positive().default(1),`);
      lines.push(`  perPage: z.coerce.number().int().positive().max(100).default(20),`);
      lines.push(`  sort: z.string().optional(),`);
      lines.push(`  order: z.enum(["asc", "desc"]).default("desc"),`);
      lines.push(`  cursor: z.string().optional(),`);
      lines.push(`});`);
      lines.push(``);
      lines.push(`export const searchSchema = z.object({`);
      lines.push(`  q: z.string().max(500).optional(),`);
      lines.push(`  filters: z.record(z.string()).optional(),`);
      lines.push(`  dateRange: z.object({ start: z.string(), end: z.string() }).optional(),`);
      lines.push(`});`);
      lines.push(``);
      for (const entity of ["user", "product", "order", "customer", "invoice", "campaign", "ticket"]) {
        const cap = entity.charAt(0).toUpperCase() + entity.slice(1);
        lines.push(`export const create${cap}Schema = z.object({`);
        lines.push(`  name: nameSchema,`);
        lines.push(`  email: emailSchema.optional(),`);
        lines.push(`  status: z.enum(["active", "inactive", "pending", "archived"]).default("active"),`);
        lines.push(`  tags: z.array(z.string().max(50)).max(20).default([]),`);
        lines.push(`  metadata: z.record(z.unknown()).optional(),`);
        lines.push(`  notes: z.string().max(5000).optional(),`);
        lines.push(`});`);
        lines.push(``);
        lines.push(`export const update${cap}Schema = create${cap}Schema.partial();`);
        lines.push(``);
        lines.push(`export type Create${cap}Input = z.infer<typeof create${cap}Schema>;`);
        lines.push(`export type Update${cap}Input = z.infer<typeof update${cap}Schema>;`);
        lines.push(``);
      }
      break;

    case "constants":
      lines.push(`export const APP_NAME = "Docker Harness App";`);
      lines.push(`export const API_BASE = "/api/v1";`);
      lines.push(`export const DEFAULT_PAGE_SIZE = 20;`);
      lines.push(`export const MAX_PAGE_SIZE = 100;`);
      lines.push(`export const MAX_FILE_SIZE = 10 * 1024 * 1024;`);
      lines.push(`export const MAX_UPLOAD_FILES = 10;`);
      lines.push(`export const SUPPORTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"] as const;`);
      lines.push(`export const SUPPORTED_DOCUMENT_TYPES = ["application/pdf", "text/csv", "application/json", "text/plain"] as const;`);
      lines.push(``);
      lines.push(`export const ROLES = ["super_admin", "admin", "manager", "member", "viewer", "guest"] as const;`);
      lines.push(`export type Role = (typeof ROLES)[number];`);
      lines.push(``);
      lines.push(`export const PERMISSIONS = [`);
      for (const resource of ["users", "products", "orders", "customers", "invoices", "reports", "settings", "admin"]) {
        for (const action of ["read", "create", "update", "delete", "export"]) {
          lines.push(`  "${resource}:${action}",`);
        }
      }
      lines.push(`] as const;`);
      lines.push(`export type Permission = (typeof PERMISSIONS)[number];`);
      lines.push(``);
      lines.push(`export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {`);
      lines.push(`  super_admin: PERMISSIONS,`);
      lines.push(`  admin: PERMISSIONS.filter(p => !p.startsWith("admin:")),`);
      lines.push(`  manager: PERMISSIONS.filter(p => !p.startsWith("admin:") && !p.startsWith("settings:")),`);
      lines.push(`  member: PERMISSIONS.filter(p => p.endsWith(":read") || p.endsWith(":create")),`);
      lines.push(`  viewer: PERMISSIONS.filter(p => p.endsWith(":read")),`);
      lines.push(`  guest: [],`);
      lines.push(`};`);
      lines.push(``);
      for (const [statusGroup, statuses] of Object.entries({
        order: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded", "returned"],
        invoice: ["draft", "sent", "viewed", "paid", "overdue", "cancelled", "void"],
        ticket: ["open", "in_progress", "waiting", "resolved", "closed", "reopened"],
        campaign: ["draft", "scheduled", "active", "paused", "completed", "archived"],
        product: ["active", "draft", "archived", "out_of_stock", "discontinued"],
      })) {
        const cap = statusGroup.charAt(0).toUpperCase() + statusGroup.slice(1);
        lines.push(`export const ${statusGroup.toUpperCase()}_STATUSES = [${statuses.map(s => `"${s}"`).join(", ")}] as const;`);
        lines.push(`export type ${cap}Status = (typeof ${statusGroup.toUpperCase()}_STATUSES)[number];`);
        lines.push(``);
        lines.push(`export const ${statusGroup.toUpperCase()}_STATUS_COLORS: Record<${cap}Status, { text: string; bg: string; border: string }> = {`);
        for (const s of statuses) {
          const colors = s.includes("active") || s.includes("delivered") || s.includes("paid") || s.includes("resolved") || s.includes("completed")
            ? { text: "text-green-700", bg: "bg-green-50", border: "border-green-200" }
            : s.includes("pending") || s.includes("processing") || s.includes("in_progress") || s.includes("scheduled") || s.includes("sent")
              ? { text: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200" }
              : s.includes("cancelled") || s.includes("refunded") || s.includes("overdue") || s.includes("void") || s.includes("out_of_stock")
                ? { text: "text-red-700", bg: "bg-red-50", border: "border-red-200" }
                : { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" };
          lines.push(`  ${s}: { text: "${colors.text}", bg: "${colors.bg}", border: "${colors.border}" },`);
        }
        lines.push(`};`);
        lines.push(``);
      }
      lines.push(`export const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 } as const;`);
      lines.push(`export const ANIMATION_DURATION = { fast: 150, normal: 300, slow: 500 } as const;`);
      lines.push(`export const Z_INDEX = { dropdown: 50, sticky: 100, overlay: 200, modal: 300, popover: 400, tooltip: 500, toast: 600 } as const;`);
      break;

    default:
      // Generate a generic large utility module
      lines.push(`/**`);
      lines.push(` * ${name} utility module`);
      lines.push(` * Auto-generated for Docker build benchmarking`);
      lines.push(` */`);
      lines.push(``);
      lines.push(`import { z } from "zod";`);
      lines.push(``);

      // Generate 15-25 exported functions/types per module
      const fnCount = 15 + (idx % 11);
      for (let i = 0; i < fnCount; i++) {
        const fnName = `${name}Util${i + 1}`;
        lines.push(`export interface ${fnName}Options {`);
        lines.push(`  enabled?: boolean;`);
        lines.push(`  timeout?: number;`);
        lines.push(`  retries?: number;`);
        lines.push(`  onSuccess?: (result: ${fnName}Result) => void;`);
        lines.push(`  onError?: (error: Error) => void;`);
        lines.push(`  metadata?: Record<string, unknown>;`);
        lines.push(`  tags?: string[];`);
        lines.push(`  priority?: "low" | "normal" | "high" | "critical";`);
        lines.push(`}`);
        lines.push(``);
        lines.push(`export interface ${fnName}Result {`);
        lines.push(`  id: string;`);
        lines.push(`  status: "success" | "failure" | "pending";`);
        lines.push(`  data: Record<string, unknown>;`);
        lines.push(`  timestamp: number;`);
        lines.push(`  duration: number;`);
        lines.push(`  retryCount: number;`);
        lines.push(`}`);
        lines.push(``);
        lines.push(`export const ${fnName}Schema = z.object({`);
        lines.push(`  enabled: z.boolean().default(true),`);
        lines.push(`  timeout: z.number().int().positive().default(${3000 + i * 500}),`);
        lines.push(`  retries: z.number().int().min(0).max(10).default(3),`);
        lines.push(`  priority: z.enum(["low", "normal", "high", "critical"]).default("normal"),`);
        lines.push(`});`);
        lines.push(``);
        lines.push(`export function ${fnName}(input: unknown, options: ${fnName}Options = {}): ${fnName}Result {`);
        lines.push(`  const config = ${fnName}Schema.parse(options);`);
        lines.push(`  const startTime = Date.now();`);
        lines.push(`  const id = \`${fnName.toLowerCase()}-\${startTime}-\${Math.random().toString(36).slice(2, 8)}\`;`);
        lines.push(``);
        lines.push(`  try {`);
        lines.push(`    const data = typeof input === "object" && input !== null ? { ...input as Record<string, unknown> } : { value: input };`);
        lines.push(`    const result: ${fnName}Result = {`);
        lines.push(`      id,`);
        lines.push(`      status: "success",`);
        lines.push(`      data,`);
        lines.push(`      timestamp: startTime,`);
        lines.push(`      duration: Date.now() - startTime,`);
        lines.push(`      retryCount: 0,`);
        lines.push(`    };`);
        lines.push(`    config.enabled && options.onSuccess?.(result);`);
        lines.push(`    return result;`);
        lines.push(`  } catch (error) {`);
        lines.push(`    const err = error instanceof Error ? error : new Error(String(error));`);
        lines.push(`    options.onError?.(err);`);
        lines.push(`    return { id, status: "failure", data: { error: err.message }, timestamp: startTime, duration: Date.now() - startTime, retryCount: config.retries };`);
        lines.push(`  }`);
        lines.push(`}`);
        lines.push(``);
      }
      break;
  }

  return lines.join("\n") + "\n";
}

const libModules = [
  "cn", "format", "validators", "constants", "hooks", "store",
  "api-client", "permissions", "analytics", "cache", "crypto",
  "debounce", "events", "logger", "query", "router-utils",
  "storage", "theme", "toast-utils", "type-guards",
];

// ─── Component generator (100-300 lines each) ───

function generateComponent(name: string, category: string, allComponents: Record<string, string[]>): string {
  const r = seededRandom(name + category);
  const lines: string[] = [];

  // Imports
  lines.push(`import { cn } from "~/lib/cn";`);
  lines.push(`import { useState, useEffect, useCallback, useMemo, useRef, forwardRef } from "react";`);

  if (category === "charts") {
    lines.push(`import { ResponsiveContainer, Tooltip, Legend } from "recharts";`);
  }
  if (category === "data") {
    lines.push(`import { formatNumber, formatCurrency, formatRelative } from "~/lib/format";`);
  }
  if (category === "forms") {
    lines.push(`import { useForm } from "react-hook-form";`);
    lines.push(`import { zodResolver } from "@hookform/resolvers/zod";`);
    lines.push(`import { z } from "zod";`);
  }
  if (category === "features") {
    lines.push(`import { useAppStore } from "~/lib/store";`);
  }
  if (r > 0.5) {
    lines.push(`import { motion, AnimatePresence } from "framer-motion";`);
  }
  if (r > 0.3 && category === "ui") {
    lines.push(`import { cva, type VariantProps } from "class-variance-authority";`);
  }

  // Import 1-3 sibling components
  const siblings = allComponents[category] || [];
  const importCount = Math.min(3, Math.floor(r * 4));
  for (let i = 0; i < importCount; i++) {
    const sib = siblings[(seed(name) + i) % siblings.length];
    if (sib !== name) {
      lines.push(`import type { ${sib}Props } from "./${sib}";`);
    }
  }

  lines.push(``);

  // Types and interfaces (10-30 lines)
  lines.push(`// ─── Types ───`);
  lines.push(``);
  const variantCount = 3 + Math.floor(r * 5);
  const variants = ["default", "primary", "secondary", "destructive", "outline", "ghost", "link", "success"].slice(0, variantCount);
  const sizes = ["xs", "sm", "md", "lg", "xl"];

  lines.push(`export type ${name}Variant = ${variants.map(v => `"${v}"`).join(" | ")};`);
  lines.push(`export type ${name}Size = ${sizes.map(s => `"${s}"`).join(" | ")};`);
  lines.push(``);

  lines.push(`export interface ${name}Props {`);
  lines.push(`  className?: string;`);
  lines.push(`  children?: React.ReactNode;`);
  lines.push(`  variant?: ${name}Variant;`);
  lines.push(`  size?: ${name}Size;`);
  lines.push(`  disabled?: boolean;`);
  lines.push(`  loading?: boolean;`);
  lines.push(`  id?: string;`);
  lines.push(`  testId?: string;`);

  if (category === "data") {
    lines.push(`  data?: Record<string, unknown>[];`);
    lines.push(`  columns?: { key: string; label: string; sortable?: boolean; width?: number }[];`);
    lines.push(`  onSort?: (key: string, direction: "asc" | "desc") => void;`);
    lines.push(`  onFilter?: (filters: Record<string, string>) => void;`);
    lines.push(`  onSelect?: (ids: string[]) => void;`);
    lines.push(`  selectable?: boolean;`);
    lines.push(`  pagination?: { page: number; perPage: number; total: number };`);
    lines.push(`  onPageChange?: (page: number) => void;`);
    lines.push(`  emptyMessage?: string;`);
    lines.push(`  searchable?: boolean;`);
    lines.push(`  exportable?: boolean;`);
  }

  if (category === "charts") {
    lines.push(`  data?: { name: string; value: number; category?: string }[];`);
    lines.push(`  xKey?: string;`);
    lines.push(`  yKey?: string;`);
    lines.push(`  color?: string;`);
    lines.push(`  showGrid?: boolean;`);
    lines.push(`  showTooltip?: boolean;`);
    lines.push(`  showLegend?: boolean;`);
    lines.push(`  animate?: boolean;`);
    lines.push(`  height?: number;`);
    lines.push(`  formatValue?: (value: number) => string;`);
  }

  if (category === "forms") {
    lines.push(`  name?: string;`);
    lines.push(`  label?: string;`);
    lines.push(`  placeholder?: string;`);
    lines.push(`  required?: boolean;`);
    lines.push(`  error?: string;`);
    lines.push(`  description?: string;`);
    lines.push(`  onChange?: (value: unknown) => void;`);
    lines.push(`  onBlur?: () => void;`);
    lines.push(`  defaultValue?: unknown;`);
    lines.push(`  autoFocus?: boolean;`);
  }

  if (category === "features") {
    lines.push(`  onAction?: (action: string, payload?: unknown) => void;`);
    lines.push(`  permissions?: string[];`);
    lines.push(`  featureFlag?: string;`);
    lines.push(`  analytics?: { event: string; properties?: Record<string, unknown> };`);
  }

  lines.push(`  onClick?: (event: React.MouseEvent) => void;`);
  lines.push(`  onKeyDown?: (event: React.KeyboardEvent) => void;`);
  lines.push(`  "aria-label"?: string;`);
  lines.push(`  "aria-describedby"?: string;`);
  lines.push(`  role?: string;`);
  lines.push(`  tabIndex?: number;`);
  lines.push(`}`);
  lines.push(``);

  // CVA variants if UI component
  if (category === "ui" && r > 0.3) {
    const kebab = name.replace(/([A-Z])/g, "-$1").toLowerCase().slice(1);
    lines.push(`const ${name.charAt(0).toLowerCase() + name.slice(1)}Variants = cva(`);
    lines.push(`  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",`);
    lines.push(`  {`);
    lines.push(`    variants: {`);
    lines.push(`      variant: {`);
    for (const v of variants) {
      lines.push(`        ${v}: "${v === "default" ? "bg-primary text-primary-foreground hover:bg-primary/90" : v === "destructive" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : v === "outline" ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" : v === "ghost" ? "hover:bg-accent hover:text-accent-foreground" : `bg-${v}-500 text-white hover:bg-${v}-600`}",`);
    }
    lines.push(`      },`);
    lines.push(`      size: {`);
    for (const s of sizes) {
      const px = s === "xs" ? "px-2 py-0.5 text-xs" : s === "sm" ? "px-3 py-1.5 text-sm" : s === "md" ? "px-4 py-2 text-sm" : s === "lg" ? "px-6 py-3 text-base" : "px-8 py-4 text-lg";
      lines.push(`        ${s}: "${px}",`);
    }
    lines.push(`      },`);
    lines.push(`    },`);
    lines.push(`    defaultVariants: { variant: "default", size: "md" },`);
    lines.push(`  }`);
    lines.push(`);`);
    lines.push(``);
  }

  // State and hooks (10-30 lines)
  lines.push(`// ─── Component ───`);
  lines.push(``);
  lines.push(`export const ${name} = forwardRef<HTMLDivElement, ${name}Props>(function ${name}(`);
  lines.push(`  { className, children, variant = "default", size = "md", disabled = false, loading = false, id, testId, onClick, onKeyDown, ...props },`);
  lines.push(`  ref`);
  lines.push(`) {`);
  lines.push(`  const [isHovered, setIsHovered] = useState(false);`);
  lines.push(`  const [isFocused, setIsFocused] = useState(false);`);
  lines.push(`  const [isActive, setIsActive] = useState(false);`);
  lines.push(`  const [internalState, setInternalState] = useState<Record<string, unknown>>({});`);
  lines.push(`  const mountedRef = useRef(true);`);
  lines.push(`  const timerRef = useRef<ReturnType<typeof setTimeout>>();`);
  lines.push(``);

  lines.push(`  useEffect(() => {`);
  lines.push(`    mountedRef.current = true;`);
  lines.push(`    return () => {`);
  lines.push(`      mountedRef.current = false;`);
  lines.push(`      if (timerRef.current) clearTimeout(timerRef.current);`);
  lines.push(`    };`);
  lines.push(`  }, []);`);
  lines.push(``);

  lines.push(`  const handleClick = useCallback((e: React.MouseEvent) => {`);
  lines.push(`    if (disabled || loading) return;`);
  lines.push(`    setIsActive(true);`);
  lines.push(`    timerRef.current = setTimeout(() => mountedRef.current && setIsActive(false), 150);`);
  lines.push(`    onClick?.(e);`);
  lines.push(`  }, [disabled, loading, onClick]);`);
  lines.push(``);

  lines.push(`  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {`);
  lines.push(`    if (e.key === "Enter" || e.key === " ") {`);
  lines.push(`      e.preventDefault();`);
  lines.push(`      handleClick(e as unknown as React.MouseEvent);`);
  lines.push(`    }`);
  lines.push(`    onKeyDown?.(e);`);
  lines.push(`  }, [handleClick, onKeyDown]);`);
  lines.push(``);

  // Memoized computations
  lines.push(`  const computedClassName = useMemo(() => {`);
  lines.push(`    const baseClasses = [`);
  lines.push(`      "${name.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "")}",`);
  lines.push(`      \`variant-\${variant}\`,`);
  lines.push(`      \`size-\${size}\`,`);
  lines.push(`      isHovered && "is-hovered",`);
  lines.push(`      isFocused && "is-focused",`);
  lines.push(`      isActive && "is-active",`);
  lines.push(`      disabled && "is-disabled",`);
  lines.push(`      loading && "is-loading",`);
  lines.push(`    ].filter(Boolean);`);
  lines.push(`    return cn(...baseClasses, className);`);
  lines.push(`  }, [variant, size, isHovered, isFocused, isActive, disabled, loading, className]);`);
  lines.push(``);

  // Category-specific logic
  if (category === "data") {
    lines.push(`  const processedData = useMemo(() => {`);
    lines.push(`    const raw = (props as ${name}Props).data ?? [];`);
    lines.push(`    return raw.map((item, index) => ({`);
    lines.push(`      ...item,`);
    lines.push(`      _index: index,`);
    lines.push(`      _id: (item as Record<string, unknown>).id ?? \`row-\${index}\`,`);
    lines.push(`      _formatted: Object.fromEntries(`);
    lines.push(`        Object.entries(item).map(([k, v]) => [`);
    lines.push(`          k,`);
    lines.push(`          typeof v === "number" ? formatNumber(v) : String(v ?? ""),`);
    lines.push(`        ])`);
    lines.push(`      ),`);
    lines.push(`    }));`);
    lines.push(`  }, [(props as ${name}Props).data]);`);
    lines.push(``);
  }

  if (category === "charts") {
    lines.push(`  const chartData = useMemo(() => {`);
    lines.push(`    const raw = (props as ${name}Props).data ?? [];`);
    lines.push(`    return raw.map((d, i) => ({`);
    lines.push(`      ...d,`);
    lines.push(`      _color: d.category ? \`hsl(\${(i * 360) / raw.length}, 70%, 50%)\` : (props as ${name}Props).color ?? "#3b82f6",`);
    lines.push(`    }));`);
    lines.push(`  }, [(props as ${name}Props).data, (props as ${name}Props).color]);`);
    lines.push(``);
  }

  // Render (30-60 lines)
  lines.push(`  return (`);
  lines.push(`    <div`);
  lines.push(`      ref={ref}`);
  lines.push(`      id={id}`);
  lines.push(`      data-testid={testId ?? "${name}"}`);
  lines.push(`      className={computedClassName}`);
  lines.push(`      onClick={handleClick}`);
  lines.push(`      onKeyDown={handleKeyDown}`);
  lines.push(`      onMouseEnter={() => setIsHovered(true)}`);
  lines.push(`      onMouseLeave={() => { setIsHovered(false); setIsActive(false); }}`);
  lines.push(`      onFocus={() => setIsFocused(true)}`);
  lines.push(`      onBlur={() => setIsFocused(false)}`);
  lines.push(`      role={props.role ?? "button"}`);
  lines.push(`      tabIndex={props.tabIndex ?? (disabled ? -1 : 0)}`);
  lines.push(`      aria-label={props["aria-label"]}`);
  lines.push(`      aria-describedby={props["aria-describedby"]}`);
  lines.push(`      aria-disabled={disabled}`);
  lines.push(`      aria-busy={loading}`);
  lines.push(`    >`);

  // Loading overlay
  lines.push(`      {loading && (`);
  lines.push(`        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 rounded-inherit z-10">`);
  lines.push(`          <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" />`);
  lines.push(`        </div>`);
  lines.push(`      )}`);

  // Header section
  lines.push(`      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">`);
  lines.push(`        <div className="flex items-center gap-3">`);
  lines.push(`          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">`);
  lines.push(`            <span className="text-white font-semibold text-sm">${name.slice(0, 2).toUpperCase()}</span>`);
  lines.push(`          </div>`);
  lines.push(`          <div>`);
  lines.push(`            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">${name.replace(/([A-Z])/g, " $1").trim()}</h3>`);
  lines.push(`            <p className="text-xs text-gray-500 dark:text-gray-400">Variant: {variant} &middot; Size: {size}</p>`);
  lines.push(`          </div>`);
  lines.push(`        </div>`);
  lines.push(`        <div className="flex items-center gap-2">`);
  lines.push(`          {isHovered && <span className="text-xs text-blue-500">Hovered</span>}`);
  lines.push(`          {isFocused && <span className="text-xs text-green-500">Focused</span>}`);
  lines.push(`          {isActive && <span className="text-xs text-orange-500">Active</span>}`);
  lines.push(`        </div>`);
  lines.push(`      </div>`);

  // Content
  lines.push(`      <div className="p-4 space-y-4">`);

  if (category === "data") {
    lines.push(`        <div className="overflow-x-auto">`);
    lines.push(`          <table className="w-full text-sm">`);
    lines.push(`            <thead>`);
    lines.push(`              <tr className="border-b border-gray-200 dark:border-gray-700">`);
    lines.push(`                {((props as ${name}Props).columns ?? []).map((col) => (`);
    lines.push(`                  <th key={col.key} className="px-3 py-2 text-left font-medium text-gray-500">{col.label}</th>`);
    lines.push(`                ))}`);
    lines.push(`              </tr>`);
    lines.push(`            </thead>`);
    lines.push(`            <tbody>`);
    lines.push(`              {processedData.slice(0, 10).map((row) => (`);
    lines.push(`                <tr key={row._id as string} className="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50">`);
    lines.push(`                  {((props as ${name}Props).columns ?? []).map((col) => (`);
    lines.push(`                    <td key={col.key} className="px-3 py-2 text-gray-700 dark:text-gray-300">`);
    lines.push(`                      {(row._formatted as Record<string, string>)[col.key] ?? "—"}`);
    lines.push(`                    </td>`);
    lines.push(`                  ))}`);
    lines.push(`                </tr>`);
    lines.push(`              ))}`);
    lines.push(`            </tbody>`);
    lines.push(`          </table>`);
    lines.push(`        </div>`);
  }

  if (category === "charts") {
    lines.push(`        <div style={{ height: (props as ${name}Props).height ?? 300 }}>`);
    lines.push(`          <ResponsiveContainer width="100%" height="100%">`);
    lines.push(`            <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-800/50 rounded-lg">`);
    lines.push(`              <span className="text-gray-400">Chart: {chartData.length} data points</span>`);
    lines.push(`            </div>`);
    lines.push(`          </ResponsiveContainer>`);
    lines.push(`        </div>`);
  }

  if (category === "forms") {
    lines.push(`        <div className="space-y-3">`);
    lines.push(`          {(props as ${name}Props).label && (`);
    lines.push(`            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">`);
    lines.push(`              {(props as ${name}Props).label}`);
    lines.push(`              {(props as ${name}Props).required && <span className="text-red-500 ml-1">*</span>}`);
    lines.push(`            </label>`);
    lines.push(`          )}`);
    lines.push(`          <div className="relative">`);
    lines.push(`            <input`);
    lines.push(`              type="text"`);
    lines.push(`              name={(props as ${name}Props).name}`);
    lines.push(`              placeholder={(props as ${name}Props).placeholder}`);
    lines.push(`              disabled={disabled}`);
    lines.push(`              autoFocus={(props as ${name}Props).autoFocus}`);
    lines.push(`              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"`);
    lines.push(`            />`);
    lines.push(`          </div>`);
    lines.push(`          {(props as ${name}Props).description && (`);
    lines.push(`            <p className="text-xs text-gray-500">{(props as ${name}Props).description}</p>`);
    lines.push(`          )}`);
    lines.push(`          {(props as ${name}Props).error && (`);
    lines.push(`            <p className="text-xs text-red-500 flex items-center gap-1">`);
    lines.push(`              <span className="inline-block w-3 h-3">⚠</span>`);
    lines.push(`              {(props as ${name}Props).error}`);
    lines.push(`            </p>`);
    lines.push(`          )}`);
    lines.push(`        </div>`);
  }

  // Generic children slot
  lines.push(`        <div className="min-h-[2rem]">`);
  lines.push(`          {children}`);
  lines.push(`        </div>`);
  lines.push(`      </div>`);

  // Footer
  lines.push(`      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500">`);
  lines.push(`        <span>${category}/${name}</span>`);
  lines.push(`        <span>{new Date().toLocaleDateString()}</span>`);
  lines.push(`      </div>`);
  lines.push(`    </div>`);
  lines.push(`  );`);
  lines.push(`});`);
  lines.push(``);

  // Default export alias
  lines.push(`export default ${name};`);
  lines.push(``);

  return lines.join("\n");
}

// ─── Route generator (200-400 lines each) ───

function generateRoute(route: { path: string; name: string }, allComponents: Record<string, string[]>): string {
  const r = seededRandom(route.name);
  const hasLoader = r > 0.15;
  const hasAction = r > 0.5;
  const isLayout = !route.path.includes(".");
  const lines: string[] = [];

  // Imports
  lines.push(`import type { Route } from "./+types/${route.path}";`);
  lines.push(`import { useState, useEffect, useCallback, useMemo } from "react";`);
  lines.push(`import { cn } from "~/lib/cn";`);
  lines.push(`import { formatDate, formatCurrency, formatNumber, formatRelative } from "~/lib/format";`);

  if (hasLoader || hasAction) {
    lines.push(`import { z } from "zod";`);
  }

  // Import 3-6 components
  const categories = Object.keys(allComponents);
  const importedComponents: string[] = [];
  const importCount = 3 + Math.floor(r * 4);
  for (let i = 0; i < importCount; i++) {
    const cat = categories[Math.abs(seed(route.name) + i) % categories.length];
    const comps = allComponents[cat];
    if (!comps || comps.length === 0) continue;
    const comp = comps[Math.abs(seed(route.name + cat) + i) % comps.length];
    if (!importedComponents.includes(comp)) {
      lines.push(`import { ${comp} } from "~/components/${cat}/${comp}";`);
      importedComponents.push(comp);
    }
  }

  lines.push(``);

  // Types for this route
  lines.push(`// ─── Types ───`);
  lines.push(``);
  const entityName = route.name.replace(/([A-Z])/g, " $1").trim().split(" ")[0];
  lines.push(`interface ${route.name}Item {`);
  lines.push(`  id: string;`);
  lines.push(`  name: string;`);
  lines.push(`  status: "active" | "inactive" | "pending" | "archived";`);
  lines.push(`  description: string;`);
  lines.push(`  createdAt: string;`);
  lines.push(`  updatedAt: string;`);
  lines.push(`  metadata: Record<string, unknown>;`);
  lines.push(`  tags: string[];`);
  lines.push(`  priority: "low" | "normal" | "high" | "critical";`);
  lines.push(`  assignee: { id: string; name: string; email: string; avatar?: string } | null;`);
  lines.push(`  metrics: { views: number; clicks: number; conversions: number; revenue: number };`);
  lines.push(`}`);
  lines.push(``);

  // Validation schema
  if (hasLoader || hasAction) {
    lines.push(`const ${route.name}FilterSchema = z.object({`);
    lines.push(`  page: z.coerce.number().int().positive().default(1),`);
    lines.push(`  perPage: z.coerce.number().int().positive().max(100).default(20),`);
    lines.push(`  sort: z.enum(["name", "createdAt", "updatedAt", "status", "priority"]).default("createdAt"),`);
    lines.push(`  order: z.enum(["asc", "desc"]).default("desc"),`);
    lines.push(`  status: z.enum(["active", "inactive", "pending", "archived", "all"]).default("all"),`);
    lines.push(`  search: z.string().max(200).optional(),`);
    lines.push(`  tags: z.array(z.string()).optional(),`);
    lines.push(`  dateFrom: z.string().optional(),`);
    lines.push(`  dateTo: z.string().optional(),`);
    lines.push(`});`);
    lines.push(``);
  }

  // Loader
  if (hasLoader) {
    lines.push(`// ─── Loader ───`);
    lines.push(``);
    lines.push(`export async function loader({ request, params }: Route.LoaderArgs) {`);
    lines.push(`  const url = new URL(request.url);`);
    lines.push(`  const filters = ${route.name}FilterSchema.parse(Object.fromEntries(url.searchParams));`);
    lines.push(``);
    lines.push(`  // Simulated data generation`);
    lines.push(`  const total = ${50 + Math.floor(r * 200)};`);
    lines.push(`  const items: ${route.name}Item[] = Array.from({ length: filters.perPage }, (_, i) => {`);
    lines.push(`    const idx = (filters.page - 1) * filters.perPage + i;`);
    lines.push(`    const statuses = ["active", "inactive", "pending", "archived"] as const;`);
    lines.push(`    const priorities = ["low", "normal", "high", "critical"] as const;`);
    lines.push(`    return {`);
    lines.push(`      id: \`${entityName.toLowerCase()}-\${idx + 1}\`,`);
    lines.push(`      name: \`${entityName} Item \${idx + 1}\`,`);
    lines.push(`      status: statuses[idx % statuses.length],`);
    lines.push(`      description: \`Description for ${entityName.toLowerCase()} item \${idx + 1}. This is a detailed description that provides context about this particular item.\`,`);
    lines.push(`      createdAt: new Date(Date.now() - idx * 86400000).toISOString(),`);
    lines.push(`      updatedAt: new Date(Date.now() - idx * 43200000).toISOString(),`);
    lines.push(`      metadata: { source: "api", version: \`1.\${idx % 10}\` },`);
    lines.push(`      tags: [\`tag-\${idx % 5}\`, \`category-\${idx % 3}\`],`);
    lines.push(`      priority: priorities[idx % priorities.length],`);
    lines.push(`      assignee: idx % 3 === 0 ? null : {`);
    lines.push(`        id: \`user-\${idx % 10}\`,`);
    lines.push(`        name: \`User \${idx % 10}\`,`);
    lines.push(`        email: \`user\${idx % 10}@example.com\`,`);
    lines.push(`      },`);
    lines.push(`      metrics: {`);
    lines.push(`        views: Math.floor(Math.random() * 10000),`);
    lines.push(`        clicks: Math.floor(Math.random() * 1000),`);
    lines.push(`        conversions: Math.floor(Math.random() * 100),`);
    lines.push(`        revenue: Math.random() * 50000,`);
    lines.push(`      },`);
    lines.push(`    };`);
    lines.push(`  });`);
    lines.push(``);
    lines.push(`  const aggregates = {`);
    lines.push(`    totalRevenue: items.reduce((sum, item) => sum + item.metrics.revenue, 0),`);
    lines.push(`    totalViews: items.reduce((sum, item) => sum + item.metrics.views, 0),`);
    lines.push(`    avgConversion: items.reduce((sum, item) => sum + item.metrics.conversions, 0) / items.length,`);
    lines.push(`    activeCount: items.filter(i => i.status === "active").length,`);
    lines.push(`    pendingCount: items.filter(i => i.status === "pending").length,`);
    lines.push(`  };`);
    lines.push(``);
    lines.push(`  return {`);
    lines.push(`    items,`);
    lines.push(`    total,`);
    lines.push(`    page: filters.page,`);
    lines.push(`    perPage: filters.perPage,`);
    lines.push(`    totalPages: Math.ceil(total / filters.perPage),`);
    lines.push(`    filters,`);
    lines.push(`    aggregates,`);
    lines.push(`  };`);
    lines.push(`}`);
    lines.push(``);
  }

  // Action
  if (hasAction) {
    lines.push(`// ─── Action ───`);
    lines.push(``);
    lines.push(`const ${route.name}ActionSchema = z.discriminatedUnion("intent", [`);
    lines.push(`  z.object({ intent: z.literal("create"), name: z.string().min(1), description: z.string().optional() }),`);
    lines.push(`  z.object({ intent: z.literal("update"), id: z.string(), name: z.string().min(1).optional(), status: z.enum(["active", "inactive", "pending", "archived"]).optional() }),`);
    lines.push(`  z.object({ intent: z.literal("delete"), id: z.string() }),`);
    lines.push(`  z.object({ intent: z.literal("bulk-delete"), ids: z.string().transform(s => s.split(",")) }),`);
    lines.push(`  z.object({ intent: z.literal("export"), format: z.enum(["csv", "json", "xlsx"]).default("csv") }),`);
    lines.push(`]);`);
    lines.push(``);
    lines.push(`export async function action({ request }: Route.ActionArgs) {`);
    lines.push(`  const formData = await request.formData();`);
    lines.push(`  const data = Object.fromEntries(formData);`);
    lines.push(`  const parsed = ${route.name}ActionSchema.safeParse(data);`);
    lines.push(``);
    lines.push(`  if (!parsed.success) {`);
    lines.push(`    return { success: false, errors: parsed.error.flatten().fieldErrors };`);
    lines.push(`  }`);
    lines.push(``);
    lines.push(`  switch (parsed.data.intent) {`);
    lines.push(`    case "create":`);
    lines.push(`      return { success: true, message: "Item created successfully", id: crypto.randomUUID() };`);
    lines.push(`    case "update":`);
    lines.push(`      return { success: true, message: "Item updated successfully" };`);
    lines.push(`    case "delete":`);
    lines.push(`      return { success: true, message: "Item deleted successfully" };`);
    lines.push(`    case "bulk-delete":`);
    lines.push(`      return { success: true, message: \`\${parsed.data.ids.length} items deleted\` };`);
    lines.push(`    case "export":`);
    lines.push(`      return { success: true, message: \`Export started in \${parsed.data.format} format\` };`);
    lines.push(`  }`);
    lines.push(`}`);
    lines.push(``);
  }

  // Meta
  lines.push(`// ─── Meta ───`);
  lines.push(``);
  lines.push(`export function meta() {`);
  lines.push(`  return [`);
  lines.push(`    { title: "${route.name.replace(/([A-Z])/g, " $1").trim()} | Docker Harness App" },`);
  lines.push(`    { name: "description", content: "Manage ${route.name.replace(/([A-Z])/g, " $1").trim().toLowerCase()}" },`);
  lines.push(`  ];`);
  lines.push(`}`);
  lines.push(``);

  // Component
  lines.push(`// ─── Component ───`);
  lines.push(``);

  if (isLayout) {
    lines.push(`export default function ${route.name}({ children }: { children?: React.ReactNode }) {`);
    lines.push(`  const [sidebarOpen, setSidebarOpen] = useState(true);`);
    lines.push(`  const [searchQuery, setSearchQuery] = useState("");`);
    lines.push(``);
    lines.push(`  return (`);
    lines.push(`    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">`);
    lines.push(`      <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">`);
    lines.push(`        <div className="flex items-center justify-between px-6 py-3">`);
    lines.push(`          <div className="flex items-center gap-4">`);
    lines.push(`            <button`);
    lines.push(`              onClick={() => setSidebarOpen(!sidebarOpen)}`);
    lines.push(`              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"`);
    lines.push(`              aria-label="Toggle sidebar"`);
    lines.push(`            >`);
    lines.push(`              <div className="w-5 h-5 flex flex-col justify-center gap-1">`);
    lines.push(`                <span className="block h-0.5 w-5 bg-gray-600 dark:bg-gray-300" />`);
    lines.push(`                <span className="block h-0.5 w-5 bg-gray-600 dark:bg-gray-300" />`);
    lines.push(`                <span className="block h-0.5 w-5 bg-gray-600 dark:bg-gray-300" />`);
    lines.push(`              </div>`);
    lines.push(`            </button>`);
    lines.push(`            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">${route.name.replace(/([A-Z])/g, " $1").trim()}</h1>`);
    lines.push(`          </div>`);
    lines.push(`          <div className="flex items-center gap-3">`);
    lines.push(`            <input`);
    lines.push(`              type="search"`);
    lines.push(`              value={searchQuery}`);
    lines.push(`              onChange={(e) => setSearchQuery(e.target.value)}`);
    lines.push(`              placeholder="Search..."`);
    lines.push(`              className="w-64 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"`);
    lines.push(`            />`);
    lines.push(`          </div>`);
    lines.push(`        </div>`);
    lines.push(`      </header>`);
    lines.push(`      <div className="flex">`);
    lines.push(`        {sidebarOpen && (`);
    lines.push(`          <aside className="w-64 shrink-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-h-[calc(100vh-3.5rem)]">`);
    lines.push(`            <nav className="p-4 space-y-1">`);
    lines.push(`              {["Overview", "Analytics", "Reports", "Settings"].map((item) => (`);
    lines.push(`                <a key={item} href="#" className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">{item}</a>`);
    lines.push(`              ))}`);
    lines.push(`            </nav>`);
    lines.push(`          </aside>`);
    lines.push(`        )}`);
    lines.push(`        <main className="flex-1 p-6 overflow-auto">{children}</main>`);
    lines.push(`      </div>`);
    lines.push(`    </div>`);
    lines.push(`  );`);
    lines.push(`}`);
  } else {
    lines.push(`export default function ${route.name}(${hasLoader ? `{ loaderData }: Route.ComponentProps` : ""}) {`);
    lines.push(`  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());`);
    lines.push(`  const [viewMode, setViewMode] = useState<"table" | "grid" | "list">("table");`);
    lines.push(`  const [isCreating, setIsCreating] = useState(false);`);
    lines.push(`  const [expandedId, setExpandedId] = useState<string | null>(null);`);
    lines.push(``);

    if (hasLoader) {
      lines.push(`  const { items, total, page, perPage, totalPages, aggregates } = loaderData;`);
      lines.push(``);
      lines.push(`  const stats = useMemo(() => [`);
      lines.push(`    { label: "Total", value: formatNumber(total), change: "+12%", trend: "up" as const },`);
      lines.push(`    { label: "Active", value: formatNumber(aggregates.activeCount), change: "+5%", trend: "up" as const },`);
      lines.push(`    { label: "Revenue", value: formatCurrency(aggregates.totalRevenue), change: "+18%", trend: "up" as const },`);
      lines.push(`    { label: "Views", value: formatNumber(aggregates.totalViews), change: "-3%", trend: "down" as const },`);
      lines.push(`  ], [total, aggregates]);`);
      lines.push(``);
    }

    lines.push(`  const toggleSelect = useCallback((id: string) => {`);
    lines.push(`    setSelectedIds(prev => {`);
    lines.push(`      const next = new Set(prev);`);
    lines.push(`      if (next.has(id)) next.delete(id); else next.add(id);`);
    lines.push(`      return next;`);
    lines.push(`    });`);
    lines.push(`  }, []);`);
    lines.push(``);

    lines.push(`  return (`);
    lines.push(`    <div className="space-y-6">`);
    lines.push(`      {/* Header */}`);
    lines.push(`      <div className="flex items-center justify-between">`);
    lines.push(`        <div>`);
    lines.push(`          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">${route.name.replace(/([A-Z])/g, " $1").trim()}</h2>`);
    lines.push(`          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and track ${route.name.replace(/([A-Z])/g, " $1").trim().toLowerCase()}</p>`);
    lines.push(`        </div>`);
    lines.push(`        <div className="flex items-center gap-3">`);
    lines.push(`          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">`);
    lines.push(`            {(["table", "grid", "list"] as const).map((mode) => (`);
    lines.push(`              <button`);
    lines.push(`                key={mode}`);
    lines.push(`                onClick={() => setViewMode(mode)}`);
    lines.push(`                className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-colors", viewMode === mode ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100" : "text-gray-500 hover:text-gray-700")}`);
    lines.push(`              >`);
    lines.push(`                {mode.charAt(0).toUpperCase() + mode.slice(1)}`);
    lines.push(`              </button>`);
    lines.push(`            ))}`);
    lines.push(`          </div>`);
    lines.push(`          <button`);
    lines.push(`            onClick={() => setIsCreating(true)}`);
    lines.push(`            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"`);
    lines.push(`          >`);
    lines.push(`            + New`);
    lines.push(`          </button>`);
    lines.push(`        </div>`);
    lines.push(`      </div>`);
    lines.push(``);

    // Stats cards
    if (hasLoader) {
      lines.push(`      {/* Stats */}`);
      lines.push(`      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">`);
      lines.push(`        {stats.map((stat) => (`);
      lines.push(`          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">`);
      lines.push(`            <div className="flex items-center justify-between">`);
      lines.push(`              <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>`);
      lines.push(`              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", stat.trend === "up" ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50")}>`);
      lines.push(`                {stat.change}`);
      lines.push(`              </span>`);
      lines.push(`            </div>`);
      lines.push(`            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">{stat.value}</div>`);
      lines.push(`          </div>`);
      lines.push(`        ))}`);
      lines.push(`      </div>`);
      lines.push(``);
    }

    // Bulk actions bar
    lines.push(`      {/* Bulk actions */}`);
    lines.push(`      {selectedIds.size > 0 && (`);
    lines.push(`        <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">`);
    lines.push(`          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{selectedIds.size} selected</span>`);
    lines.push(`          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Edit</button>`);
    lines.push(`          <button className="text-sm text-red-600 hover:text-red-800 font-medium">Delete</button>`);
    lines.push(`          <button className="text-sm text-gray-600 hover:text-gray-800 font-medium">Export</button>`);
    lines.push(`          <button onClick={() => setSelectedIds(new Set())} className="ml-auto text-sm text-gray-500 hover:text-gray-700">Clear</button>`);
    lines.push(`        </div>`);
    lines.push(`      )}`);
    lines.push(``);

    // Content area
    if (hasLoader) {
      lines.push(`      {/* Content */}`);
      lines.push(`      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">`);
      lines.push(`        <div className="overflow-x-auto">`);
      lines.push(`          <table className="w-full">`);
      lines.push(`            <thead>`);
      lines.push(`              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">`);
      lines.push(`                <th className="w-10 px-4 py-3"><input type="checkbox" className="rounded border-gray-300" /></th>`);
      lines.push(`                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>`);
      lines.push(`                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>`);
      lines.push(`                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>`);
      lines.push(`                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>`);
      lines.push(`                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue</th>`);
      lines.push(`                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>`);
      lines.push(`              </tr>`);
      lines.push(`            </thead>`);
      lines.push(`            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">`);
      lines.push(`              {items.map((item) => (`);
      lines.push(`                <tr key={item.id} className={cn("hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors", selectedIds.has(item.id) && "bg-blue-50/50 dark:bg-blue-900/10")}>`);
      lines.push(`                  <td className="px-4 py-3">`);
      lines.push(`                    <input type="checkbox" checked={selectedIds.has(item.id)} onChange={() => toggleSelect(item.id)} className="rounded border-gray-300" />`);
      lines.push(`                  </td>`);
      lines.push(`                  <td className="px-4 py-3">`);
      lines.push(`                    <div className="flex items-center gap-3">`);
      lines.push(`                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">`);
      lines.push(`                        {item.name.charAt(0)}`);
      lines.push(`                      </div>`);
      lines.push(`                      <div>`);
      lines.push(`                        <div className="font-medium text-gray-900 dark:text-gray-100">{item.name}</div>`);
      lines.push(`                        <div className="text-xs text-gray-500 truncate max-w-[200px]">{item.description}</div>`);
      lines.push(`                      </div>`);
      lines.push(`                    </div>`);
      lines.push(`                  </td>`);
      lines.push(`                  <td className="px-4 py-3">`);
      lines.push(`                    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",`);
      lines.push(`                      item.status === "active" ? "bg-green-50 text-green-700" :`);
      lines.push(`                      item.status === "pending" ? "bg-yellow-50 text-yellow-700" :`);
      lines.push(`                      item.status === "inactive" ? "bg-gray-100 text-gray-600" :`);
      lines.push(`                      "bg-red-50 text-red-700"`);
      lines.push(`                    )}>{item.status}</span>`);
      lines.push(`                  </td>`);
      lines.push(`                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.priority}</td>`);
      lines.push(`                  <td className="px-4 py-3 text-sm text-gray-500">{formatRelative(item.createdAt)}</td>`);
      lines.push(`                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{formatCurrency(item.metrics.revenue)}</td>`);
      lines.push(`                  <td className="px-4 py-3 text-right">`);
      lines.push(`                    <button`);
      lines.push(`                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}`);
      lines.push(`                      className="text-gray-400 hover:text-gray-600 p-1 rounded"`);
      lines.push(`                    >`);
      lines.push(`                      ⋯`);
      lines.push(`                    </button>`);
      lines.push(`                  </td>`);
      lines.push(`                </tr>`);
      lines.push(`              ))}`);
      lines.push(`            </tbody>`);
      lines.push(`          </table>`);
      lines.push(`        </div>`);
      lines.push(``);
      lines.push(`        {/* Pagination */}`);
      lines.push(`        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">`);
      lines.push(`          <span className="text-sm text-gray-500">Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, total)} of {total}</span>`);
      lines.push(`          <div className="flex items-center gap-2">`);
      lines.push(`            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((p) => (`);
      lines.push(`              <button key={p} className={cn("w-8 h-8 rounded-md text-sm font-medium transition-colors", p === page ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700")}>{p}</button>`);
      lines.push(`            ))}`);
      lines.push(`          </div>`);
      lines.push(`        </div>`);
      lines.push(`      </div>`);
    } else {
      lines.push(`      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-8 text-center">`);
      lines.push(`        <p className="text-gray-500 dark:text-gray-400">Content for ${route.name.replace(/([A-Z])/g, " $1").trim()}</p>`);
      lines.push(`      </div>`);
    }

    lines.push(`    </div>`);
    lines.push(`  );`);
    lines.push(`}`);
  }

  lines.push(``);
  return lines.join("\n");
}

// ─── Root layout ───

function generateRootLayout(): string {
  return `import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { Route } from "./+types/root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./app.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 1 } },
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
`;
}

// ─── Main ───

console.log("Generating large app scaffold...\n");

// Clean generated dirs
for (const dir of ["components", "routes", "lib"]) {
  const fullPath = join(APP_DIR, dir);
  if (existsSync(fullPath)) {
    rmSync(fullPath, { recursive: true });
  }
}

// Components
let totalComponents = 0;
for (const [category, names] of Object.entries(componentCategories)) {
  const dir = join(APP_DIR, "components", category);
  mkdirSync(dir, { recursive: true });

  for (const name of names) {
    const content = generateComponent(name, category, componentCategories);
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
for (const route of routeDefs) {
  const content = generateRoute(route, componentCategories);
  writeFileSync(join(routesDir, `${route.path}.tsx`), content);
}
console.log(`Generated ${routeDefs.length} routes`);

// Lib modules
const libDir = join(APP_DIR, "lib");
mkdirSync(libDir, { recursive: true });
for (let i = 0; i < libModules.length; i++) {
  const name = libModules[i];
  const content = generateLibModule(name, i);
  writeFileSync(join(libDir, `${name}.ts`), content);
}
console.log(`Generated ${libModules.length} lib modules`);

// Root layout
writeFileSync(join(APP_DIR, "root.tsx"), generateRootLayout());

// CSS
writeFileSync(join(APP_DIR, "app.css"), `@import "tailwindcss";\n`);

// Total
const totalFiles = totalComponents + Object.keys(componentCategories).length + routeDefs.length + libModules.length + 2;
console.log(`\nTotal files: ${totalFiles}`);
console.log("Done! Run 'du -sh app/src' to check size.");
