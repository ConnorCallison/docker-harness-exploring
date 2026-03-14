import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DonutChart } from "~/components/charts/DonutChart";

describe("DonutChart", () => {
  it("renders without crashing", () => {
    render(<DonutChart />);
    expect(screen.getByTestId("DonutChart")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<DonutChart className="custom-class" />);
    const el = screen.getByTestId("DonutChart");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<DonutChart><span data-testid="child">Hello</span></DonutChart>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<DonutChart variant="primary" />);
    const el = screen.getByTestId("DonutChart");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<DonutChart size="lg" />);
    const el = screen.getByTestId("DonutChart");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<DonutChart disabled />);
    const el = screen.getByTestId("DonutChart");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<DonutChart loading />);
    const el = screen.getByTestId("DonutChart");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<DonutChart onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DonutChart"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<DonutChart disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DonutChart"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<DonutChart loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DonutChart"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<DonutChart onClick={onClick} />);
    const el = screen.getByTestId("DonutChart");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<DonutChart />);
    expect(screen.getByText("Donut Chart")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<DonutChart />);
    const el = screen.getByTestId("DonutChart");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<DonutChart />);
    const el = screen.getByTestId("DonutChart");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<DonutChart id="custom-id" />);
    const el = screen.getByTestId("DonutChart");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<DonutChart testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<DonutChart aria-label="Accessible name" />);
    const el = screen.getByTestId("DonutChart");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<DonutChart variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<DonutChart size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<DonutChart ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
