import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GaugeChart } from "~/components/charts/GaugeChart";

describe("GaugeChart", () => {
  it("renders without crashing", () => {
    render(<GaugeChart />);
    expect(screen.getByTestId("GaugeChart")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<GaugeChart className="custom-class" />);
    const el = screen.getByTestId("GaugeChart");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<GaugeChart><span data-testid="child">Hello</span></GaugeChart>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<GaugeChart variant="primary" />);
    const el = screen.getByTestId("GaugeChart");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<GaugeChart size="lg" />);
    const el = screen.getByTestId("GaugeChart");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<GaugeChart disabled />);
    const el = screen.getByTestId("GaugeChart");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<GaugeChart loading />);
    const el = screen.getByTestId("GaugeChart");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<GaugeChart onClick={onClick} />);
    await userEvent.click(screen.getByTestId("GaugeChart"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<GaugeChart disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("GaugeChart"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<GaugeChart loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("GaugeChart"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<GaugeChart onClick={onClick} />);
    const el = screen.getByTestId("GaugeChart");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<GaugeChart />);
    expect(screen.getByText("Gauge Chart")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<GaugeChart />);
    const el = screen.getByTestId("GaugeChart");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<GaugeChart />);
    const el = screen.getByTestId("GaugeChart");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<GaugeChart id="custom-id" />);
    const el = screen.getByTestId("GaugeChart");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<GaugeChart testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<GaugeChart aria-label="Accessible name" />);
    const el = screen.getByTestId("GaugeChart");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<GaugeChart variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<GaugeChart size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<GaugeChart ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
