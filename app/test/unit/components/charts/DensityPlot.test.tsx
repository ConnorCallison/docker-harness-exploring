import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DensityPlot } from "~/components/charts/DensityPlot";

describe("DensityPlot", () => {
  it("renders without crashing", () => {
    render(<DensityPlot />);
    expect(screen.getByTestId("DensityPlot")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<DensityPlot className="custom-class" />);
    const el = screen.getByTestId("DensityPlot");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<DensityPlot><span data-testid="child">Hello</span></DensityPlot>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<DensityPlot variant="primary" />);
    const el = screen.getByTestId("DensityPlot");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<DensityPlot size="lg" />);
    const el = screen.getByTestId("DensityPlot");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<DensityPlot disabled />);
    const el = screen.getByTestId("DensityPlot");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<DensityPlot loading />);
    const el = screen.getByTestId("DensityPlot");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<DensityPlot onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DensityPlot"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<DensityPlot disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DensityPlot"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<DensityPlot loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DensityPlot"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<DensityPlot onClick={onClick} />);
    const el = screen.getByTestId("DensityPlot");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<DensityPlot />);
    expect(screen.getByText("Density Plot")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<DensityPlot />);
    const el = screen.getByTestId("DensityPlot");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<DensityPlot />);
    const el = screen.getByTestId("DensityPlot");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<DensityPlot id="custom-id" />);
    const el = screen.getByTestId("DensityPlot");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<DensityPlot testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<DensityPlot aria-label="Accessible name" />);
    const el = screen.getByTestId("DensityPlot");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<DensityPlot variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<DensityPlot size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<DensityPlot ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
