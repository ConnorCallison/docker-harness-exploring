import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChartLegend } from "~/components/charts/ChartLegend";

describe("ChartLegend", () => {
  it("renders without crashing", () => {
    render(<ChartLegend />);
    expect(screen.getByTestId("ChartLegend")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ChartLegend className="custom-class" />);
    const el = screen.getByTestId("ChartLegend");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ChartLegend><span data-testid="child">Hello</span></ChartLegend>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ChartLegend variant="primary" />);
    const el = screen.getByTestId("ChartLegend");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ChartLegend size="lg" />);
    const el = screen.getByTestId("ChartLegend");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ChartLegend disabled />);
    const el = screen.getByTestId("ChartLegend");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ChartLegend loading />);
    const el = screen.getByTestId("ChartLegend");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ChartLegend onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ChartLegend"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ChartLegend disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ChartLegend"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ChartLegend loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ChartLegend"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ChartLegend onClick={onClick} />);
    const el = screen.getByTestId("ChartLegend");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ChartLegend />);
    expect(screen.getByText("Chart Legend")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ChartLegend />);
    const el = screen.getByTestId("ChartLegend");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ChartLegend />);
    const el = screen.getByTestId("ChartLegend");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ChartLegend id="custom-id" />);
    const el = screen.getByTestId("ChartLegend");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ChartLegend testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ChartLegend aria-label="Accessible name" />);
    const el = screen.getByTestId("ChartLegend");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ChartLegend variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ChartLegend size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ChartLegend ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
