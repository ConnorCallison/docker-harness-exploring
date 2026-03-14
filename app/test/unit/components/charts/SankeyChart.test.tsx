import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SankeyChart } from "~/components/charts/SankeyChart";

describe("SankeyChart", () => {
  it("renders without crashing", () => {
    render(<SankeyChart />);
    expect(screen.getByTestId("SankeyChart")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<SankeyChart className="custom-class" />);
    const el = screen.getByTestId("SankeyChart");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<SankeyChart><span data-testid="child">Hello</span></SankeyChart>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<SankeyChart variant="primary" />);
    const el = screen.getByTestId("SankeyChart");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<SankeyChart size="lg" />);
    const el = screen.getByTestId("SankeyChart");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<SankeyChart disabled />);
    const el = screen.getByTestId("SankeyChart");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<SankeyChart loading />);
    const el = screen.getByTestId("SankeyChart");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<SankeyChart onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SankeyChart"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<SankeyChart disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SankeyChart"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<SankeyChart loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SankeyChart"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<SankeyChart onClick={onClick} />);
    const el = screen.getByTestId("SankeyChart");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<SankeyChart />);
    expect(screen.getByText("Sankey Chart")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<SankeyChart />);
    const el = screen.getByTestId("SankeyChart");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<SankeyChart />);
    const el = screen.getByTestId("SankeyChart");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<SankeyChart id="custom-id" />);
    const el = screen.getByTestId("SankeyChart");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<SankeyChart testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<SankeyChart aria-label="Accessible name" />);
    const el = screen.getByTestId("SankeyChart");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<SankeyChart variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<SankeyChart size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<SankeyChart ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
