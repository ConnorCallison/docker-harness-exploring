import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SegmentedControl } from "~/components/ui/SegmentedControl";

describe("SegmentedControl", () => {
  it("renders without crashing", () => {
    render(<SegmentedControl />);
    expect(screen.getByTestId("SegmentedControl")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<SegmentedControl className="custom-class" />);
    const el = screen.getByTestId("SegmentedControl");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<SegmentedControl><span data-testid="child">Hello</span></SegmentedControl>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<SegmentedControl variant="primary" />);
    const el = screen.getByTestId("SegmentedControl");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<SegmentedControl size="lg" />);
    const el = screen.getByTestId("SegmentedControl");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<SegmentedControl disabled />);
    const el = screen.getByTestId("SegmentedControl");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<SegmentedControl loading />);
    const el = screen.getByTestId("SegmentedControl");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<SegmentedControl onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SegmentedControl"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<SegmentedControl disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SegmentedControl"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<SegmentedControl loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SegmentedControl"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<SegmentedControl onClick={onClick} />);
    const el = screen.getByTestId("SegmentedControl");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<SegmentedControl />);
    expect(screen.getByText("Segmented Control")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<SegmentedControl />);
    const el = screen.getByTestId("SegmentedControl");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<SegmentedControl />);
    const el = screen.getByTestId("SegmentedControl");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<SegmentedControl id="custom-id" />);
    const el = screen.getByTestId("SegmentedControl");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<SegmentedControl testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<SegmentedControl aria-label="Accessible name" />);
    const el = screen.getByTestId("SegmentedControl");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<SegmentedControl variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<SegmentedControl size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<SegmentedControl ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
