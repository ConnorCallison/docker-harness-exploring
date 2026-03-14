import { describe, it, expect } from "vitest";
import {
  emailSchema, passwordSchema, nameSchema, idSchema, slugSchema,
  urlSchema, phoneSchema, currencySchema, quantitySchema,
  percentageSchema, colorSchema, dateStringSchema, jsonStringSchema,
  paginationSchema, searchSchema,
  createUserSchema, createProductSchema, createOrderSchema,
  createCustomerSchema, createInvoiceSchema, createCampaignSchema, createTicketSchema,
} from "~/lib/validators";

describe("validators", () => {
  describe("emailSchema", () => {
    it("accepts valid emails", () => {
      expect(emailSchema.safeParse("test@example.com").success).toBe(true);
      expect(emailSchema.safeParse("user+tag@domain.co.uk").success).toBe(true);
    });
    it("rejects invalid emails", () => {
      expect(emailSchema.safeParse("notanemail").success).toBe(false);
      expect(emailSchema.safeParse("@missing.user").success).toBe(false);
      expect(emailSchema.safeParse("").success).toBe(false);
    });
  });

  describe("passwordSchema", () => {
    it("accepts strong passwords", () => {
      expect(passwordSchema.safeParse("StrongP4ss").success).toBe(true);
    });
    it("rejects short passwords", () => {
      expect(passwordSchema.safeParse("Short1").success).toBe(false);
    });
    it("rejects passwords without uppercase", () => {
      expect(passwordSchema.safeParse("nouppercase1").success).toBe(false);
    });
    it("rejects passwords without numbers", () => {
      expect(passwordSchema.safeParse("NoNumbers").success).toBe(false);
    });
  });

  describe("slugSchema", () => {
    it("accepts valid slugs", () => {
      expect(slugSchema.safeParse("my-slug").success).toBe(true);
      expect(slugSchema.safeParse("simple").success).toBe(true);
    });
    it("rejects invalid slugs", () => {
      expect(slugSchema.safeParse("Has Spaces").success).toBe(false);
      expect(slugSchema.safeParse("UPPERCASE").success).toBe(false);
      expect(slugSchema.safeParse("special!chars").success).toBe(false);
    });
  });

  describe("currencySchema", () => {
    it("accepts valid amounts", () => {
      expect(currencySchema.safeParse(99.99).success).toBe(true);
      expect(currencySchema.safeParse(0).success).toBe(true);
    });
    it("rejects negative amounts", () => {
      expect(currencySchema.safeParse(-1).success).toBe(false);
    });
  });

  describe("colorSchema", () => {
    it("accepts hex colors", () => {
      expect(colorSchema.safeParse("#fff").success).toBe(true);
      expect(colorSchema.safeParse("#3b82f6").success).toBe(true);
    });
    it("rejects invalid colors", () => {
      expect(colorSchema.safeParse("red").success).toBe(false);
      expect(colorSchema.safeParse("#xyz").success).toBe(false);
    });
  });

  describe("dateStringSchema", () => {
    it("accepts YYYY-MM-DD", () => {
      expect(dateStringSchema.safeParse("2026-03-14").success).toBe(true);
    });
    it("rejects other formats", () => {
      expect(dateStringSchema.safeParse("03/14/2026").success).toBe(false);
      expect(dateStringSchema.safeParse("March 14").success).toBe(false);
    });
  });

  describe("jsonStringSchema", () => {
    it("accepts valid JSON", () => {
      expect(jsonStringSchema.safeParse('{"key":"value"}').success).toBe(true);
      expect(jsonStringSchema.safeParse("[]").success).toBe(true);
    });
    it("rejects invalid JSON", () => {
      expect(jsonStringSchema.safeParse("{invalid}").success).toBe(false);
    });
  });

  describe("paginationSchema", () => {
    it("parses with defaults", () => {
      const result = paginationSchema.parse({});
      expect(result.page).toBe(1);
      expect(result.perPage).toBe(20);
      expect(result.order).toBe("desc");
    });
    it("coerces strings to numbers", () => {
      const result = paginationSchema.parse({ page: "3", perPage: "50" });
      expect(result.page).toBe(3);
      expect(result.perPage).toBe(50);
    });
    it("rejects perPage > 100", () => {
      expect(paginationSchema.safeParse({ perPage: 101 }).success).toBe(false);
    });
  });

  describe("entity schemas", () => {
    const schemas = [
      { name: "createUserSchema", schema: createUserSchema },
      { name: "createProductSchema", schema: createProductSchema },
      { name: "createOrderSchema", schema: createOrderSchema },
      { name: "createCustomerSchema", schema: createCustomerSchema },
      { name: "createInvoiceSchema", schema: createInvoiceSchema },
      { name: "createCampaignSchema", schema: createCampaignSchema },
      { name: "createTicketSchema", schema: createTicketSchema },
    ];

    for (const { name, schema } of schemas) {
      describe(name, () => {
        it("accepts valid input", () => {
          expect(schema.safeParse({ name: "Test Item" }).success).toBe(true);
        });
        it("rejects empty name", () => {
          expect(schema.safeParse({ name: "" }).success).toBe(false);
        });
        it("accepts with all optional fields", () => {
          expect(schema.safeParse({
            name: "Full Item",
            email: "test@example.com",
            status: "active",
            tags: ["tag1", "tag2"],
            notes: "Some notes",
          }).success).toBe(true);
        });
        it("defaults status to active", () => {
          const result = schema.parse({ name: "Test" });
          expect(result.status).toBe("active");
        });
        it("rejects invalid status", () => {
          expect(schema.safeParse({ name: "Test", status: "invalid" }).success).toBe(false);
        });
      });
    }
  });
});
