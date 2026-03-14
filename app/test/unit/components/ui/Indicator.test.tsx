import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Indicator } from "~/components/ui/Indicator";

describe("Indicator", () => {
  it("renders without crashing", () => {
    render(<Indicator />);
    expect(screen.getByTestId("Indicator")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Indicator className="custom-class" />);
    const el = screen.getByTestId("Indicator");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Indicator><span data-testid="child">Hello</span></Indicator>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Indicator variant="primary" />);
    const el = screen.getByTestId("Indicator");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Indicator size="lg" />);
    const el = screen.getByTestId("Indicator");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Indicator disabled />);
    const el = screen.getByTestId("Indicator");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Indicator loading />);
    const el = screen.getByTestId("Indicator");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Indicator onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Indicator"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Indicator disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Indicator"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Indicator loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Indicator"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Indicator onClick={onClick} />);
    const el = screen.getByTestId("Indicator");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Indicator />);
    expect(screen.getByText("Indicator")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Indicator />);
    const el = screen.getByTestId("Indicator");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Indicator />);
    const el = screen.getByTestId("Indicator");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Indicator id="custom-id" />);
    const el = screen.getByTestId("Indicator");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Indicator testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Indicator aria-label="Accessible name" />);
    const el = screen.getByTestId("Indicator");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Indicator variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Indicator size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Indicator ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
