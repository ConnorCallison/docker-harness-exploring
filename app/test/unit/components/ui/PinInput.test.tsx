import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PinInput } from "~/components/ui/PinInput";

describe("PinInput", () => {
  it("renders without crashing", () => {
    render(<PinInput />);
    expect(screen.getByTestId("PinInput")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<PinInput className="custom-class" />);
    const el = screen.getByTestId("PinInput");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<PinInput><span data-testid="child">Hello</span></PinInput>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<PinInput variant="primary" />);
    const el = screen.getByTestId("PinInput");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<PinInput size="lg" />);
    const el = screen.getByTestId("PinInput");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<PinInput disabled />);
    const el = screen.getByTestId("PinInput");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<PinInput loading />);
    const el = screen.getByTestId("PinInput");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<PinInput onClick={onClick} />);
    await userEvent.click(screen.getByTestId("PinInput"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<PinInput disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("PinInput"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<PinInput loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("PinInput"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<PinInput onClick={onClick} />);
    const el = screen.getByTestId("PinInput");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<PinInput />);
    expect(screen.getByText("Pin Input")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<PinInput />);
    const el = screen.getByTestId("PinInput");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<PinInput />);
    const el = screen.getByTestId("PinInput");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<PinInput id="custom-id" />);
    const el = screen.getByTestId("PinInput");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<PinInput testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<PinInput aria-label="Accessible name" />);
    const el = screen.getByTestId("PinInput");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<PinInput variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<PinInput size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<PinInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
