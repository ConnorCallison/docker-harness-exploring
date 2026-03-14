import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HeatmapChart } from "~/components/charts/HeatmapChart";

describe("HeatmapChart", () => {
  it("renders without crashing", () => {
    render(<HeatmapChart />);
    expect(screen.getByTestId("HeatmapChart")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<HeatmapChart className="custom-class" />);
    const el = screen.getByTestId("HeatmapChart");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<HeatmapChart><span data-testid="child">Hello</span></HeatmapChart>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<HeatmapChart variant="primary" />);
    const el = screen.getByTestId("HeatmapChart");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<HeatmapChart size="lg" />);
    const el = screen.getByTestId("HeatmapChart");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<HeatmapChart disabled />);
    const el = screen.getByTestId("HeatmapChart");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<HeatmapChart loading />);
    const el = screen.getByTestId("HeatmapChart");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<HeatmapChart onClick={onClick} />);
    await userEvent.click(screen.getByTestId("HeatmapChart"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<HeatmapChart disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("HeatmapChart"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<HeatmapChart loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("HeatmapChart"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<HeatmapChart onClick={onClick} />);
    const el = screen.getByTestId("HeatmapChart");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<HeatmapChart />);
    expect(screen.getByText("Heatmap Chart")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<HeatmapChart />);
    const el = screen.getByTestId("HeatmapChart");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<HeatmapChart />);
    const el = screen.getByTestId("HeatmapChart");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<HeatmapChart id="custom-id" />);
    const el = screen.getByTestId("HeatmapChart");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<HeatmapChart testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<HeatmapChart aria-label="Accessible name" />);
    const el = screen.getByTestId("HeatmapChart");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<HeatmapChart variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<HeatmapChart size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<HeatmapChart ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
