import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ScatterChart } from "~/components/charts/ScatterChart";

describe("ScatterChart", () => {
  it("renders without crashing", () => {
    render(<ScatterChart />);
    expect(screen.getByTestId("ScatterChart")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ScatterChart className="custom-class" />);
    const el = screen.getByTestId("ScatterChart");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ScatterChart><span data-testid="child">Hello</span></ScatterChart>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ScatterChart variant="primary" />);
    const el = screen.getByTestId("ScatterChart");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ScatterChart size="lg" />);
    const el = screen.getByTestId("ScatterChart");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ScatterChart disabled />);
    const el = screen.getByTestId("ScatterChart");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ScatterChart loading />);
    const el = screen.getByTestId("ScatterChart");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ScatterChart onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ScatterChart"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ScatterChart disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ScatterChart"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ScatterChart loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ScatterChart"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ScatterChart onClick={onClick} />);
    const el = screen.getByTestId("ScatterChart");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ScatterChart />);
    expect(screen.getByText("Scatter Chart")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ScatterChart />);
    const el = screen.getByTestId("ScatterChart");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ScatterChart />);
    const el = screen.getByTestId("ScatterChart");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ScatterChart id="custom-id" />);
    const el = screen.getByTestId("ScatterChart");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ScatterChart testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ScatterChart aria-label="Accessible name" />);
    const el = screen.getByTestId("ScatterChart");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ScatterChart variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ScatterChart size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ScatterChart ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
