import { z } from "zod";

export const emailSchema = z.string().email("Invalid email address").min(5).max(255);

export const passwordSchema = z.string().min(8, "Password must be at least 8 characters").max(128).regex(/[A-Z]/, "Must contain uppercase").regex(/[a-z]/, "Must contain lowercase").regex(/[0-9]/, "Must contain a number");

export const nameSchema = z.string().min(1, "Name is required").max(255).trim();

export const idSchema = z.string().uuid("Invalid ID format");

export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format").min(1).max(255);

export const urlSchema = z.string().url("Invalid URL").max(2048);

export const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number");

export const currencySchema = z.number().min(0).max(999999999.99).multipleOf(0.01);

export const quantitySchema = z.number().int().min(0).max(999999);

export const percentageSchema = z.number().min(0).max(100);

export const colorSchema = z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Invalid hex color");

export const dateStringSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected YYYY-MM-DD format");

export const jsonStringSchema = z.string().refine((val) => { try { JSON.parse(val); return true; } catch { return false; } }, "Invalid JSON");

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().max(100).default(20),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).default("desc"),
  cursor: z.string().optional(),
});

export const searchSchema = z.object({
  q: z.string().max(500).optional(),
  filters: z.record(z.string()).optional(),
  dateRange: z.object({ start: z.string(), end: z.string() }).optional(),
});

export const createUserSchema = z.object({
  name: nameSchema,
  email: emailSchema.optional(),
  status: z.enum(["active", "inactive", "pending", "archived"]).default("active"),
  tags: z.array(z.string().max(50)).max(20).default([]),
  metadata: z.record(z.unknown()).optional(),
  notes: z.string().max(5000).optional(),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const createProductSchema = z.object({
  name: nameSchema,
  email: emailSchema.optional(),
  status: z.enum(["active", "inactive", "pending", "archived"]).default("active"),
  tags: z.array(z.string().max(50)).max(20).default([]),
  metadata: z.record(z.unknown()).optional(),
  notes: z.string().max(5000).optional(),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export const createOrderSchema = z.object({
  name: nameSchema,
  email: emailSchema.optional(),
  status: z.enum(["active", "inactive", "pending", "archived"]).default("active"),
  tags: z.array(z.string().max(50)).max(20).default([]),
  metadata: z.record(z.unknown()).optional(),
  notes: z.string().max(5000).optional(),
});

export const updateOrderSchema = createOrderSchema.partial();

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;

export const createCustomerSchema = z.object({
  name: nameSchema,
  email: emailSchema.optional(),
  status: z.enum(["active", "inactive", "pending", "archived"]).default("active"),
  tags: z.array(z.string().max(50)).max(20).default([]),
  metadata: z.record(z.unknown()).optional(),
  notes: z.string().max(5000).optional(),
});

export const updateCustomerSchema = createCustomerSchema.partial();

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;

export const createInvoiceSchema = z.object({
  name: nameSchema,
  email: emailSchema.optional(),
  status: z.enum(["active", "inactive", "pending", "archived"]).default("active"),
  tags: z.array(z.string().max(50)).max(20).default([]),
  metadata: z.record(z.unknown()).optional(),
  notes: z.string().max(5000).optional(),
});

export const updateInvoiceSchema = createInvoiceSchema.partial();

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
export type UpdateInvoiceInput = z.infer<typeof updateInvoiceSchema>;

export const createCampaignSchema = z.object({
  name: nameSchema,
  email: emailSchema.optional(),
  status: z.enum(["active", "inactive", "pending", "archived"]).default("active"),
  tags: z.array(z.string().max(50)).max(20).default([]),
  metadata: z.record(z.unknown()).optional(),
  notes: z.string().max(5000).optional(),
});

export const updateCampaignSchema = createCampaignSchema.partial();

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;
export type UpdateCampaignInput = z.infer<typeof updateCampaignSchema>;

export const createTicketSchema = z.object({
  name: nameSchema,
  email: emailSchema.optional(),
  status: z.enum(["active", "inactive", "pending", "archived"]).default("active"),
  tags: z.array(z.string().max(50)).max(20).default([]),
  metadata: z.record(z.unknown()).optional(),
  notes: z.string().max(5000).optional(),
});

export const updateTicketSchema = createTicketSchema.partial();

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
export type UpdateTicketInput = z.infer<typeof updateTicketSchema>;

