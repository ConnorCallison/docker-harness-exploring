import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConversionFunnel } from "~/components/dashboard/ConversionFunnel";

describe("ConversionFunnel", () => {
  it("renders without crashing", () => {
    render(<ConversionFunnel />);
    expect(screen.getByTestId("ConversionFunnel")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ConversionFunnel className="custom-class" />);
    const el = screen.getByTestId("ConversionFunnel");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ConversionFunnel><span data-testid="child">Hello</span></ConversionFunnel>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ConversionFunnel variant="primary" />);
    const el = screen.getByTestId("ConversionFunnel");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ConversionFunnel size="lg" />);
    const el = screen.getByTestId("ConversionFunnel");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ConversionFunnel disabled />);
    const el = screen.getByTestId("ConversionFunnel");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ConversionFunnel loading />);
    const el = screen.getByTestId("ConversionFunnel");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ConversionFunnel onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ConversionFunnel"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ConversionFunnel disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ConversionFunnel"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ConversionFunnel loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ConversionFunnel"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ConversionFunnel onClick={onClick} />);
    const el = screen.getByTestId("ConversionFunnel");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ConversionFunnel />);
    expect(screen.getByText("Conversion Funnel")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ConversionFunnel />);
    const el = screen.getByTestId("ConversionFunnel");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ConversionFunnel />);
    const el = screen.getByTestId("ConversionFunnel");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ConversionFunnel id="custom-id" />);
    const el = screen.getByTestId("ConversionFunnel");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ConversionFunnel testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ConversionFunnel aria-label="Accessible name" />);
    const el = screen.getByTestId("ConversionFunnel");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ConversionFunnel variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ConversionFunnel size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ConversionFunnel ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
