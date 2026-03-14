import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClipboardManager } from "~/components/features/ClipboardManager";

describe("ClipboardManager", () => {
  it("renders without crashing", () => {
    render(<ClipboardManager />);
    expect(screen.getByTestId("ClipboardManager")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ClipboardManager className="custom-class" />);
    const el = screen.getByTestId("ClipboardManager");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ClipboardManager><span data-testid="child">Hello</span></ClipboardManager>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ClipboardManager variant="primary" />);
    const el = screen.getByTestId("ClipboardManager");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ClipboardManager size="lg" />);
    const el = screen.getByTestId("ClipboardManager");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ClipboardManager disabled />);
    const el = screen.getByTestId("ClipboardManager");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ClipboardManager loading />);
    const el = screen.getByTestId("ClipboardManager");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ClipboardManager onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ClipboardManager"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ClipboardManager disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ClipboardManager"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ClipboardManager loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ClipboardManager"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ClipboardManager onClick={onClick} />);
    const el = screen.getByTestId("ClipboardManager");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ClipboardManager />);
    expect(screen.getByText("Clipboard Manager")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ClipboardManager />);
    const el = screen.getByTestId("ClipboardManager");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ClipboardManager />);
    const el = screen.getByTestId("ClipboardManager");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ClipboardManager id="custom-id" />);
    const el = screen.getByTestId("ClipboardManager");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ClipboardManager testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ClipboardManager aria-label="Accessible name" />);
    const el = screen.getByTestId("ClipboardManager");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ClipboardManager variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ClipboardManager size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ClipboardManager ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
