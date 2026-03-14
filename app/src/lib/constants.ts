export const APP_NAME = "Docker Harness App";
export const API_BASE = "/api/v1";
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const MAX_UPLOAD_FILES = 10;
export const SUPPORTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"] as const;
export const SUPPORTED_DOCUMENT_TYPES = ["application/pdf", "text/csv", "application/json", "text/plain"] as const;

export const ROLES = ["super_admin", "admin", "manager", "member", "viewer", "guest"] as const;
export type Role = (typeof ROLES)[number];

export const PERMISSIONS = [
  "users:read",
  "users:create",
  "users:update",
  "users:delete",
  "users:export",
  "products:read",
  "products:create",
  "products:update",
  "products:delete",
  "products:export",
  "orders:read",
  "orders:create",
  "orders:update",
  "orders:delete",
  "orders:export",
  "customers:read",
  "customers:create",
  "customers:update",
  "customers:delete",
  "customers:export",
  "invoices:read",
  "invoices:create",
  "invoices:update",
  "invoices:delete",
  "invoices:export",
  "reports:read",
  "reports:create",
  "reports:update",
  "reports:delete",
  "reports:export",
  "settings:read",
  "settings:create",
  "settings:update",
  "settings:delete",
  "settings:export",
  "admin:read",
  "admin:create",
  "admin:update",
  "admin:delete",
  "admin:export",
] as const;
export type Permission = (typeof PERMISSIONS)[number];

export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  super_admin: PERMISSIONS,
  admin: PERMISSIONS.filter(p => !p.startsWith("admin:")),
  manager: PERMISSIONS.filter(p => !p.startsWith("admin:") && !p.startsWith("settings:")),
  member: PERMISSIONS.filter(p => p.endsWith(":read") || p.endsWith(":create")),
  viewer: PERMISSIONS.filter(p => p.endsWith(":read")),
  guest: [],
};

export const ORDER_STATUSES = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded", "returned"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_COLORS: Record<OrderStatus, { text: string; bg: string; border: string }> = {
  pending: { text: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200" },
  confirmed: { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
  processing: { text: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200" },
  shipped: { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
  delivered: { text: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
  cancelled: { text: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
  refunded: { text: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
  returned: { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
};

export const INVOICE_STATUSES = ["draft", "sent", "viewed", "paid", "overdue", "cancelled", "void"] as const;
export type InvoiceStatus = (typeof INVOICE_STATUSES)[number];

export const INVOICE_STATUS_COLORS: Record<InvoiceStatus, { text: string; bg: string; border: string }> = {
  draft: { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
  sent: { text: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200" },
  viewed: { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
  paid: { text: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
  overdue: { text: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
  cancelled: { text: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
  void: { text: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
};

export const TICKET_STATUSES = ["open", "in_progress", "waiting", "resolved", "closed", "reopened"] as const;
export type TicketStatus = (typeof TICKET_STATUSES)[number];

export const TICKET_STATUS_COLORS: Record<TicketStatus, { text: string; bg: string; border: string }> = {
  open: { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
  in_progress: { text: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200" },
  waiting: { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
  resolved: { text: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
  closed: { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
  reopened: { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
};

export const CAMPAIGN_STATUSES = ["draft", "scheduled", "active", "paused", "completed", "archived"] as const;
export type CampaignStatus = (typeof CAMPAIGN_STATUSES)[number];

export const CAMPAIGN_STATUS_COLORS: Record<CampaignStatus, { text: string; bg: string; border: string }> = {
  draft: { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
  scheduled: { text: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200" },
  active: { text: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
  paused: { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
  completed: { text: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
  archived: { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
};

export const PRODUCT_STATUSES = ["active", "draft", "archived", "out_of_stock", "discontinued"] as const;
export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

export const PRODUCT_STATUS_COLORS: Record<ProductStatus, { text: string; bg: string; border: string }> = {
  active: { text: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
  draft: { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
  archived: { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
  out_of_stock: { text: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
  discontinued: { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
};

export const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 } as const;
export const ANIMATION_DURATION = { fast: 150, normal: 300, slow: 500 } as const;
export const Z_INDEX = { dropdown: 50, sticky: 100, overlay: 200, modal: 300, popover: 400, tooltip: 500, toast: 600 } as const;
