import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RangeSlider } from "~/components/ui/RangeSlider";

describe("RangeSlider", () => {
  it("renders without crashing", () => {
    render(<RangeSlider />);
    expect(screen.getByTestId("RangeSlider")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<RangeSlider className="custom-class" />);
    const el = screen.getByTestId("RangeSlider");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<RangeSlider><span data-testid="child">Hello</span></RangeSlider>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<RangeSlider variant="primary" />);
    const el = screen.getByTestId("RangeSlider");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<RangeSlider size="lg" />);
    const el = screen.getByTestId("RangeSlider");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<RangeSlider disabled />);
    const el = screen.getByTestId("RangeSlider");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<RangeSlider loading />);
    const el = screen.getByTestId("RangeSlider");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<RangeSlider onClick={onClick} />);
    await userEvent.click(screen.getByTestId("RangeSlider"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<RangeSlider disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("RangeSlider"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<RangeSlider loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("RangeSlider"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<RangeSlider onClick={onClick} />);
    const el = screen.getByTestId("RangeSlider");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<RangeSlider />);
    expect(screen.getByText("Range Slider")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<RangeSlider />);
    const el = screen.getByTestId("RangeSlider");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<RangeSlider />);
    const el = screen.getByTestId("RangeSlider");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<RangeSlider id="custom-id" />);
    const el = screen.getByTestId("RangeSlider");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<RangeSlider testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<RangeSlider aria-label="Accessible name" />);
    const el = screen.getByTestId("RangeSlider");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<RangeSlider variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<RangeSlider size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<RangeSlider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
