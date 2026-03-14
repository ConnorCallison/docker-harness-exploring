import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BottomSheet } from "~/components/layout/BottomSheet";

describe("BottomSheet", () => {
  it("renders without crashing", () => {
    render(<BottomSheet />);
    expect(screen.getByTestId("BottomSheet")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<BottomSheet className="custom-class" />);
    const el = screen.getByTestId("BottomSheet");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<BottomSheet><span data-testid="child">Hello</span></BottomSheet>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<BottomSheet variant="primary" />);
    const el = screen.getByTestId("BottomSheet");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<BottomSheet size="lg" />);
    const el = screen.getByTestId("BottomSheet");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<BottomSheet disabled />);
    const el = screen.getByTestId("BottomSheet");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<BottomSheet loading />);
    const el = screen.getByTestId("BottomSheet");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<BottomSheet onClick={onClick} />);
    await userEvent.click(screen.getByTestId("BottomSheet"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<BottomSheet disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("BottomSheet"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<BottomSheet loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("BottomSheet"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<BottomSheet onClick={onClick} />);
    const el = screen.getByTestId("BottomSheet");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<BottomSheet />);
    expect(screen.getByText("Bottom Sheet")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<BottomSheet />);
    const el = screen.getByTestId("BottomSheet");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<BottomSheet />);
    const el = screen.getByTestId("BottomSheet");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<BottomSheet id="custom-id" />);
    const el = screen.getByTestId("BottomSheet");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<BottomSheet testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<BottomSheet aria-label="Accessible name" />);
    const el = screen.getByTestId("BottomSheet");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<BottomSheet variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<BottomSheet size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<BottomSheet ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
