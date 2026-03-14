import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toast } from "~/components/ui/Toast";

describe("Toast", () => {
  it("renders without crashing", () => {
    render(<Toast />);
    expect(screen.getByTestId("Toast")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Toast className="custom-class" />);
    const el = screen.getByTestId("Toast");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Toast><span data-testid="child">Hello</span></Toast>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Toast variant="primary" />);
    const el = screen.getByTestId("Toast");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Toast size="lg" />);
    const el = screen.getByTestId("Toast");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Toast disabled />);
    const el = screen.getByTestId("Toast");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Toast loading />);
    const el = screen.getByTestId("Toast");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Toast onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Toast"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Toast disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Toast"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Toast loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Toast"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Toast onClick={onClick} />);
    const el = screen.getByTestId("Toast");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Toast />);
    expect(screen.getByText("Toast")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Toast />);
    const el = screen.getByTestId("Toast");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Toast />);
    const el = screen.getByTestId("Toast");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Toast id="custom-id" />);
    const el = screen.getByTestId("Toast");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Toast testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Toast aria-label="Accessible name" />);
    const el = screen.getByTestId("Toast");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Toast variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Toast size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Toast ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
