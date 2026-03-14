import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PieChart } from "~/components/charts/PieChart";

describe("PieChart", () => {
  it("renders without crashing", () => {
    render(<PieChart />);
    expect(screen.getByTestId("PieChart")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<PieChart className="custom-class" />);
    const el = screen.getByTestId("PieChart");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<PieChart><span data-testid="child">Hello</span></PieChart>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<PieChart variant="primary" />);
    const el = screen.getByTestId("PieChart");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<PieChart size="lg" />);
    const el = screen.getByTestId("PieChart");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<PieChart disabled />);
    const el = screen.getByTestId("PieChart");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<PieChart loading />);
    const el = screen.getByTestId("PieChart");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<PieChart onClick={onClick} />);
    await userEvent.click(screen.getByTestId("PieChart"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<PieChart disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("PieChart"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<PieChart loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("PieChart"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<PieChart onClick={onClick} />);
    const el = screen.getByTestId("PieChart");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<PieChart />);
    expect(screen.getByText("Pie Chart")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<PieChart />);
    const el = screen.getByTestId("PieChart");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<PieChart />);
    const el = screen.getByTestId("PieChart");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<PieChart id="custom-id" />);
    const el = screen.getByTestId("PieChart");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<PieChart testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<PieChart aria-label="Accessible name" />);
    const el = screen.getByTestId("PieChart");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<PieChart variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<PieChart size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<PieChart ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
