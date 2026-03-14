import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KeyboardShortcuts } from "~/components/features/KeyboardShortcuts";

describe("KeyboardShortcuts", () => {
  it("renders without crashing", () => {
    render(<KeyboardShortcuts />);
    expect(screen.getByTestId("KeyboardShortcuts")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<KeyboardShortcuts className="custom-class" />);
    const el = screen.getByTestId("KeyboardShortcuts");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<KeyboardShortcuts><span data-testid="child">Hello</span></KeyboardShortcuts>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<KeyboardShortcuts variant="primary" />);
    const el = screen.getByTestId("KeyboardShortcuts");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<KeyboardShortcuts size="lg" />);
    const el = screen.getByTestId("KeyboardShortcuts");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<KeyboardShortcuts disabled />);
    const el = screen.getByTestId("KeyboardShortcuts");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<KeyboardShortcuts loading />);
    const el = screen.getByTestId("KeyboardShortcuts");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<KeyboardShortcuts onClick={onClick} />);
    await userEvent.click(screen.getByTestId("KeyboardShortcuts"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<KeyboardShortcuts disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("KeyboardShortcuts"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<KeyboardShortcuts loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("KeyboardShortcuts"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<KeyboardShortcuts onClick={onClick} />);
    const el = screen.getByTestId("KeyboardShortcuts");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<KeyboardShortcuts />);
    expect(screen.getByText("Keyboard Shortcuts")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<KeyboardShortcuts />);
    const el = screen.getByTestId("KeyboardShortcuts");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<KeyboardShortcuts />);
    const el = screen.getByTestId("KeyboardShortcuts");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<KeyboardShortcuts id="custom-id" />);
    const el = screen.getByTestId("KeyboardShortcuts");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<KeyboardShortcuts testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<KeyboardShortcuts aria-label="Accessible name" />);
    const el = screen.getByTestId("KeyboardShortcuts");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<KeyboardShortcuts variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<KeyboardShortcuts size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<KeyboardShortcuts ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
