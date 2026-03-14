import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "~/components/ui/Tooltip";

describe("Tooltip", () => {
  it("renders without crashing", () => {
    render(<Tooltip />);
    expect(screen.getByTestId("Tooltip")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Tooltip className="custom-class" />);
    const el = screen.getByTestId("Tooltip");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Tooltip><span data-testid="child">Hello</span></Tooltip>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Tooltip variant="primary" />);
    const el = screen.getByTestId("Tooltip");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Tooltip size="lg" />);
    const el = screen.getByTestId("Tooltip");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Tooltip disabled />);
    const el = screen.getByTestId("Tooltip");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Tooltip loading />);
    const el = screen.getByTestId("Tooltip");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Tooltip onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Tooltip"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Tooltip disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Tooltip"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Tooltip loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Tooltip"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Tooltip onClick={onClick} />);
    const el = screen.getByTestId("Tooltip");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Tooltip />);
    expect(screen.getByText("Tooltip")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Tooltip />);
    const el = screen.getByTestId("Tooltip");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Tooltip />);
    const el = screen.getByTestId("Tooltip");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Tooltip id="custom-id" />);
    const el = screen.getByTestId("Tooltip");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Tooltip testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Tooltip aria-label="Accessible name" />);
    const el = screen.getByTestId("Tooltip");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Tooltip variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Tooltip size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Tooltip ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
