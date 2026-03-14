import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterChips } from "~/components/data/FilterChips";

describe("FilterChips", () => {
  it("renders without crashing", () => {
    render(<FilterChips />);
    expect(screen.getByTestId("FilterChips")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<FilterChips className="custom-class" />);
    const el = screen.getByTestId("FilterChips");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<FilterChips><span data-testid="child">Hello</span></FilterChips>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<FilterChips variant="primary" />);
    const el = screen.getByTestId("FilterChips");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<FilterChips size="lg" />);
    const el = screen.getByTestId("FilterChips");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<FilterChips disabled />);
    const el = screen.getByTestId("FilterChips");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<FilterChips loading />);
    const el = screen.getByTestId("FilterChips");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<FilterChips onClick={onClick} />);
    await userEvent.click(screen.getByTestId("FilterChips"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<FilterChips disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("FilterChips"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<FilterChips loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("FilterChips"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<FilterChips onClick={onClick} />);
    const el = screen.getByTestId("FilterChips");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<FilterChips />);
    expect(screen.getByText("Filter Chips")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<FilterChips />);
    const el = screen.getByTestId("FilterChips");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<FilterChips />);
    const el = screen.getByTestId("FilterChips");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<FilterChips id="custom-id" />);
    const el = screen.getByTestId("FilterChips");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<FilterChips testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<FilterChips aria-label="Accessible name" />);
    const el = screen.getByTestId("FilterChips");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<FilterChips variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<FilterChips size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<FilterChips ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
