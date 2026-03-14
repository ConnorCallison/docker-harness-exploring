export const APP_NAME = "Docker Harness App";
export const API_BASE = "/api";
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const SUPPORTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
export const ROLES = ["admin", "manager", "member", "viewer"] as const;
export type Role = (typeof ROLES)[number];
export const STATUS_COLORS: Record<string, string> = {
  active: "text-green-600 bg-green-50",
  inactive: "text-gray-600 bg-gray-50",
  pending: "text-yellow-600 bg-yellow-50",
  error: "text-red-600 bg-red-50",
};
