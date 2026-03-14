import { type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
  route("/", "routes/_index.tsx"),
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("forgot-password", "routes/forgot-password.tsx"),

  layout("routes/dashboard.tsx", [
    route("dashboard", "routes/dashboard.overview.tsx"),
    route("dashboard/analytics", "routes/dashboard.analytics.tsx"),
    route("dashboard/reports", "routes/dashboard.reports.tsx"),
    route("dashboard/settings", "routes/dashboard.settings.tsx"),
  ]),

  layout("routes/users.tsx", [
    route("users", "routes/users._index.tsx"),
    route("users/:userId", "routes/users.$userId.tsx"),
    route("users/:userId/edit", "routes/users.$userId.edit.tsx"),
    route("users/:userId/activity", "routes/users.$userId.activity.tsx"),
  ]),

  layout("routes/products.tsx", [
    route("products", "routes/products._index.tsx"),
    route("products/new", "routes/products.new.tsx"),
    route("products/:productId", "routes/products.$productId.tsx"),
    route("products/:productId/edit", "routes/products.$productId.edit.tsx"),
    route("products/categories", "routes/products.categories.tsx"),
  ]),

  layout("routes/orders.tsx", [
    route("orders", "routes/orders._index.tsx"),
    route("orders/:orderId", "routes/orders.$orderId.tsx"),
    route("orders/:orderId/tracking", "routes/orders.$orderId.tracking.tsx"),
  ]),

  layout("routes/invoices.tsx", [
    route("invoices", "routes/invoices._index.tsx"),
    route("invoices/:invoiceId", "routes/invoices.$invoiceId.tsx"),
    route("invoices/new", "routes/invoices.new.tsx"),
  ]),

  layout("routes/settings.tsx", [
    route("settings/profile", "routes/settings.profile.tsx"),
    route("settings/account", "routes/settings.account.tsx"),
    route("settings/billing", "routes/settings.billing.tsx"),
    route("settings/notifications", "routes/settings.notifications.tsx"),
    route("settings/integrations", "routes/settings.integrations.tsx"),
    route("settings/api-keys", "routes/settings.api-keys.tsx"),
    route("settings/team", "routes/settings.team.tsx"),
    route("settings/team/:memberId", "routes/settings.team.$memberId.tsx"),
  ]),

  layout("routes/support.tsx", [
    route("support/tickets", "routes/support.tickets.tsx"),
    route("support/tickets/new", "routes/support.tickets.new.tsx"),
    route("support/tickets/:ticketId", "routes/support.tickets.$ticketId.tsx"),
    route("support/knowledge-base", "routes/support.knowledge-base.tsx"),
  ]),

  layout("routes/reports.tsx", [
    route("reports/sales", "routes/reports.sales.tsx"),
    route("reports/inventory", "routes/reports.inventory.tsx"),
    route("reports/customers", "routes/reports.customers.tsx"),
    route("reports/custom", "routes/reports.custom.tsx"),
  ]),

  layout("routes/admin.tsx", [
    route("admin/system", "routes/admin.system.tsx"),
    route("admin/audit-log", "routes/admin.audit-log.tsx"),
  ]),
] satisfies RouteConfig;
