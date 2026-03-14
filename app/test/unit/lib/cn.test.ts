import { describe, it, expect } from "vitest";
import { cn, cx } from "~/lib/cn";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });
  it("handles conditionals", () => {
    expect(cn("base", true && "active", false && "hidden")).toBe("base active");
  });
  it("deduplicates tailwind classes", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
  });
  it("handles empty inputs", () => {
    expect(cn()).toBe("");
  });
  it("handles undefined and null", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });
});

describe("cx", () => {
  it("joins truthy values", () => {
    expect(cx("a", "b", false, "c")).toBe("a b c");
  });
  it("filters out falsy values", () => {
    expect(cx(false, undefined, null, "only")).toBe("only");
  });
});
