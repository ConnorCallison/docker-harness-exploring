import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dock } from "~/components/layout/Dock";

describe("Dock", () => {
  it("renders without crashing", () => {
    render(<Dock />);
    expect(screen.getByTestId("Dock")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Dock className="custom-class" />);
    const el = screen.getByTestId("Dock");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Dock><span data-testid="child">Hello</span></Dock>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Dock variant="primary" />);
    const el = screen.getByTestId("Dock");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Dock size="lg" />);
    const el = screen.getByTestId("Dock");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Dock disabled />);
    const el = screen.getByTestId("Dock");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Dock loading />);
    const el = screen.getByTestId("Dock");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Dock onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Dock"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Dock disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Dock"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Dock loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Dock"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Dock onClick={onClick} />);
    const el = screen.getByTestId("Dock");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Dock />);
    expect(screen.getByText("Dock")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Dock />);
    const el = screen.getByTestId("Dock");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Dock />);
    const el = screen.getByTestId("Dock");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Dock id="custom-id" />);
    const el = screen.getByTestId("Dock");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Dock testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Dock aria-label="Accessible name" />);
    const el = screen.getByTestId("Dock");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Dock variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Dock size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Dock ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
