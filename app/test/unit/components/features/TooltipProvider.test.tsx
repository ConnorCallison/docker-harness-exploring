import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TooltipProvider } from "~/components/features/TooltipProvider";

describe("TooltipProvider", () => {
  it("renders without crashing", () => {
    render(<TooltipProvider />);
    expect(screen.getByTestId("TooltipProvider")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<TooltipProvider className="custom-class" />);
    const el = screen.getByTestId("TooltipProvider");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<TooltipProvider><span data-testid="child">Hello</span></TooltipProvider>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<TooltipProvider variant="primary" />);
    const el = screen.getByTestId("TooltipProvider");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<TooltipProvider size="lg" />);
    const el = screen.getByTestId("TooltipProvider");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<TooltipProvider disabled />);
    const el = screen.getByTestId("TooltipProvider");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<TooltipProvider loading />);
    const el = screen.getByTestId("TooltipProvider");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<TooltipProvider onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TooltipProvider"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<TooltipProvider disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TooltipProvider"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<TooltipProvider loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TooltipProvider"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<TooltipProvider onClick={onClick} />);
    const el = screen.getByTestId("TooltipProvider");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<TooltipProvider />);
    expect(screen.getByText("Tooltip Provider")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<TooltipProvider />);
    const el = screen.getByTestId("TooltipProvider");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<TooltipProvider />);
    const el = screen.getByTestId("TooltipProvider");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<TooltipProvider id="custom-id" />);
    const el = screen.getByTestId("TooltipProvider");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<TooltipProvider testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<TooltipProvider aria-label="Accessible name" />);
    const el = screen.getByTestId("TooltipProvider");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<TooltipProvider variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<TooltipProvider size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<TooltipProvider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
