import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TreemapChart } from "~/components/charts/TreemapChart";

describe("TreemapChart", () => {
  it("renders without crashing", () => {
    render(<TreemapChart />);
    expect(screen.getByTestId("TreemapChart")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<TreemapChart className="custom-class" />);
    const el = screen.getByTestId("TreemapChart");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<TreemapChart><span data-testid="child">Hello</span></TreemapChart>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<TreemapChart variant="primary" />);
    const el = screen.getByTestId("TreemapChart");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<TreemapChart size="lg" />);
    const el = screen.getByTestId("TreemapChart");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<TreemapChart disabled />);
    const el = screen.getByTestId("TreemapChart");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<TreemapChart loading />);
    const el = screen.getByTestId("TreemapChart");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<TreemapChart onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TreemapChart"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<TreemapChart disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TreemapChart"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<TreemapChart loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TreemapChart"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<TreemapChart onClick={onClick} />);
    const el = screen.getByTestId("TreemapChart");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<TreemapChart />);
    expect(screen.getByText("Treemap Chart")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<TreemapChart />);
    const el = screen.getByTestId("TreemapChart");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<TreemapChart />);
    const el = screen.getByTestId("TreemapChart");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<TreemapChart id="custom-id" />);
    const el = screen.getByTestId("TreemapChart");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<TreemapChart testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<TreemapChart aria-label="Accessible name" />);
    const el = screen.getByTestId("TreemapChart");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<TreemapChart variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<TreemapChart size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<TreemapChart ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
