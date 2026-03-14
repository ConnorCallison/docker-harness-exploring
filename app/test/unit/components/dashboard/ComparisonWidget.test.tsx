import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComparisonWidget } from "~/components/dashboard/ComparisonWidget";

describe("ComparisonWidget", () => {
  it("renders without crashing", () => {
    render(<ComparisonWidget />);
    expect(screen.getByTestId("ComparisonWidget")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ComparisonWidget className="custom-class" />);
    const el = screen.getByTestId("ComparisonWidget");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ComparisonWidget><span data-testid="child">Hello</span></ComparisonWidget>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ComparisonWidget variant="primary" />);
    const el = screen.getByTestId("ComparisonWidget");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ComparisonWidget size="lg" />);
    const el = screen.getByTestId("ComparisonWidget");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ComparisonWidget disabled />);
    const el = screen.getByTestId("ComparisonWidget");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ComparisonWidget loading />);
    const el = screen.getByTestId("ComparisonWidget");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ComparisonWidget onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ComparisonWidget"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ComparisonWidget disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ComparisonWidget"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ComparisonWidget loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ComparisonWidget"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ComparisonWidget onClick={onClick} />);
    const el = screen.getByTestId("ComparisonWidget");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ComparisonWidget />);
    expect(screen.getByText("Comparison Widget")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ComparisonWidget />);
    const el = screen.getByTestId("ComparisonWidget");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ComparisonWidget />);
    const el = screen.getByTestId("ComparisonWidget");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ComparisonWidget id="custom-id" />);
    const el = screen.getByTestId("ComparisonWidget");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ComparisonWidget testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ComparisonWidget aria-label="Accessible name" />);
    const el = screen.getByTestId("ComparisonWidget");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ComparisonWidget variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ComparisonWidget size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ComparisonWidget ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
