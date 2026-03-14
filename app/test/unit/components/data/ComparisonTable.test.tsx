import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComparisonTable } from "~/components/data/ComparisonTable";

describe("ComparisonTable", () => {
  it("renders without crashing", () => {
    render(<ComparisonTable />);
    expect(screen.getByTestId("ComparisonTable")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ComparisonTable className="custom-class" />);
    const el = screen.getByTestId("ComparisonTable");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ComparisonTable><span data-testid="child">Hello</span></ComparisonTable>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ComparisonTable variant="primary" />);
    const el = screen.getByTestId("ComparisonTable");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ComparisonTable size="lg" />);
    const el = screen.getByTestId("ComparisonTable");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ComparisonTable disabled />);
    const el = screen.getByTestId("ComparisonTable");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ComparisonTable loading />);
    const el = screen.getByTestId("ComparisonTable");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ComparisonTable onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ComparisonTable"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ComparisonTable disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ComparisonTable"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ComparisonTable loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ComparisonTable"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ComparisonTable onClick={onClick} />);
    const el = screen.getByTestId("ComparisonTable");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ComparisonTable />);
    expect(screen.getByText("Comparison Table")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ComparisonTable />);
    const el = screen.getByTestId("ComparisonTable");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ComparisonTable />);
    const el = screen.getByTestId("ComparisonTable");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ComparisonTable id="custom-id" />);
    const el = screen.getByTestId("ComparisonTable");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ComparisonTable testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ComparisonTable aria-label="Accessible name" />);
    const el = screen.getByTestId("ComparisonTable");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ComparisonTable variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ComparisonTable size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ComparisonTable ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
