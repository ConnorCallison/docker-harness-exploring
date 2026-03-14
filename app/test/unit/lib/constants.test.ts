import { describe, it, expect } from "vitest";
import {
  ROLES, PERMISSIONS, ROLE_PERMISSIONS,
  ORDER_STATUSES, INVOICE_STATUSES, TICKET_STATUSES, CAMPAIGN_STATUSES, PRODUCT_STATUSES,
  ORDER_STATUS_COLORS, INVOICE_STATUS_COLORS, TICKET_STATUS_COLORS,
  BREAKPOINTS, ANIMATION_DURATION, Z_INDEX,
} from "~/lib/constants";

describe("constants", () => {
  describe("ROLES", () => {
    it("contains expected roles", () => {
      expect(ROLES).toContain("admin");
      expect(ROLES).toContain("member");
      expect(ROLES).toContain("viewer");
    });
    it("has 6 roles", () => {
      expect(ROLES).toHaveLength(6);
    });
  });

  describe("PERMISSIONS", () => {
    it("contains resource:action format", () => {
      for (const perm of PERMISSIONS) {
        expect(perm).toMatch(/^\w+:(read|create|update|delete|export)$/);
      }
    });
    it("has permissions for all resources", () => {
      const resources = new Set(PERMISSIONS.map(p => p.split(":")[0]));
      expect(resources.has("users")).toBe(true);
      expect(resources.has("products")).toBe(true);
      expect(resources.has("orders")).toBe(true);
    });
  });

  describe("ROLE_PERMISSIONS", () => {
    it("super_admin has all permissions", () => {
      expect(ROLE_PERMISSIONS.super_admin).toEqual(PERMISSIONS);
    });
    it("admin has no admin permissions", () => {
      const adminPerms = ROLE_PERMISSIONS.admin;
      expect(adminPerms.some(p => p.startsWith("admin:"))).toBe(false);
    });
    it("viewer has only read permissions", () => {
      const viewerPerms = ROLE_PERMISSIONS.viewer;
      for (const perm of viewerPerms) {
        expect(perm).toMatch(/:read$/);
      }
    });
    it("guest has no permissions", () => {
      expect(ROLE_PERMISSIONS.guest).toHaveLength(0);
    });
    it("role hierarchy is ordered by permission count", () => {
      expect(ROLE_PERMISSIONS.super_admin.length).toBeGreaterThanOrEqual(ROLE_PERMISSIONS.admin.length);
      expect(ROLE_PERMISSIONS.admin.length).toBeGreaterThanOrEqual(ROLE_PERMISSIONS.manager.length);
      expect(ROLE_PERMISSIONS.manager.length).toBeGreaterThanOrEqual(ROLE_PERMISSIONS.member.length);
      expect(ROLE_PERMISSIONS.member.length).toBeGreaterThanOrEqual(ROLE_PERMISSIONS.viewer.length);
      expect(ROLE_PERMISSIONS.viewer.length).toBeGreaterThanOrEqual(ROLE_PERMISSIONS.guest.length);
    });
  });

  describe("status constants", () => {
    for (const [name, statuses] of Object.entries({
      ORDER_STATUSES, INVOICE_STATUSES, TICKET_STATUSES, CAMPAIGN_STATUSES, PRODUCT_STATUSES,
    })) {
      it(`${name} is a non-empty array of strings`, () => {
        expect(Array.isArray(statuses)).toBe(true);
        expect(statuses.length).toBeGreaterThan(0);
        for (const s of statuses) {
          expect(typeof s).toBe("string");
        }
      });
    }
  });

  describe("status colors", () => {
    for (const [name, colors] of Object.entries({
      ORDER_STATUS_COLORS, INVOICE_STATUS_COLORS, TICKET_STATUS_COLORS,
    })) {
      it(`${name} has text, bg, border for each status`, () => {
        for (const [status, color] of Object.entries(colors)) {
          expect(color).toHaveProperty("text");
          expect(color).toHaveProperty("bg");
          expect(color).toHaveProperty("border");
          expect(typeof color.text).toBe("string");
          expect(typeof color.bg).toBe("string");
          expect(typeof color.border).toBe("string");
        }
      });
    }
  });

  describe("design tokens", () => {
    it("BREAKPOINTS are ordered", () => {
      expect(BREAKPOINTS.sm).toBeLessThan(BREAKPOINTS.md);
      expect(BREAKPOINTS.md).toBeLessThan(BREAKPOINTS.lg);
      expect(BREAKPOINTS.lg).toBeLessThan(BREAKPOINTS.xl);
    });
    it("ANIMATION_DURATION is ordered", () => {
      expect(ANIMATION_DURATION.fast).toBeLessThan(ANIMATION_DURATION.normal);
      expect(ANIMATION_DURATION.normal).toBeLessThan(ANIMATION_DURATION.slow);
    });
    it("Z_INDEX is ordered", () => {
      expect(Z_INDEX.dropdown).toBeLessThan(Z_INDEX.modal);
      expect(Z_INDEX.modal).toBeLessThan(Z_INDEX.tooltip);
      expect(Z_INDEX.tooltip).toBeLessThan(Z_INDEX.toast);
    });
  });
});
