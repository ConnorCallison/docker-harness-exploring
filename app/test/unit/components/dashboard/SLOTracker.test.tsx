import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SLOTracker } from "~/components/dashboard/SLOTracker";

describe("SLOTracker", () => {
  it("renders without crashing", () => {
    render(<SLOTracker />);
    expect(screen.getByTestId("SLOTracker")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<SLOTracker className="custom-class" />);
    const el = screen.getByTestId("SLOTracker");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<SLOTracker><span data-testid="child">Hello</span></SLOTracker>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<SLOTracker variant="primary" />);
    const el = screen.getByTestId("SLOTracker");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<SLOTracker size="lg" />);
    const el = screen.getByTestId("SLOTracker");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<SLOTracker disabled />);
    const el = screen.getByTestId("SLOTracker");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<SLOTracker loading />);
    const el = screen.getByTestId("SLOTracker");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<SLOTracker onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SLOTracker"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<SLOTracker disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SLOTracker"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<SLOTracker loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SLOTracker"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<SLOTracker onClick={onClick} />);
    const el = screen.getByTestId("SLOTracker");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<SLOTracker />);
    expect(screen.getByText("S L O Tracker")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<SLOTracker />);
    const el = screen.getByTestId("SLOTracker");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<SLOTracker />);
    const el = screen.getByTestId("SLOTracker");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<SLOTracker id="custom-id" />);
    const el = screen.getByTestId("SLOTracker");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<SLOTracker testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<SLOTracker aria-label="Accessible name" />);
    const el = screen.getByTestId("SLOTracker");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<SLOTracker variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<SLOTracker size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<SLOTracker ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
