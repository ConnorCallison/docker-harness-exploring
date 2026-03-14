import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SunburstChart } from "~/components/charts/SunburstChart";

describe("SunburstChart", () => {
  it("renders without crashing", () => {
    render(<SunburstChart />);
    expect(screen.getByTestId("SunburstChart")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<SunburstChart className="custom-class" />);
    const el = screen.getByTestId("SunburstChart");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<SunburstChart><span data-testid="child">Hello</span></SunburstChart>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<SunburstChart variant="primary" />);
    const el = screen.getByTestId("SunburstChart");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<SunburstChart size="lg" />);
    const el = screen.getByTestId("SunburstChart");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<SunburstChart disabled />);
    const el = screen.getByTestId("SunburstChart");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<SunburstChart loading />);
    const el = screen.getByTestId("SunburstChart");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<SunburstChart onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SunburstChart"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<SunburstChart disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SunburstChart"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<SunburstChart loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SunburstChart"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<SunburstChart onClick={onClick} />);
    const el = screen.getByTestId("SunburstChart");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<SunburstChart />);
    expect(screen.getByText("Sunburst Chart")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<SunburstChart />);
    const el = screen.getByTestId("SunburstChart");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<SunburstChart />);
    const el = screen.getByTestId("SunburstChart");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<SunburstChart id="custom-id" />);
    const el = screen.getByTestId("SunburstChart");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<SunburstChart testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<SunburstChart aria-label="Accessible name" />);
    const el = screen.getByTestId("SunburstChart");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<SunburstChart variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<SunburstChart size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<SunburstChart ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
