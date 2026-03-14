import { z } from "zod";

export const emailSchema = z.string().email();
export const passwordSchema = z.string().min(8).max(128);
export const nameSchema = z.string().min(1).max(255);
export const idSchema = z.string().uuid();
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().max(100).default(20),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).default("desc"),
});
export const searchSchema = z.object({
  q: z.string().optional(),
  filters: z.record(z.string()).optional(),
});
