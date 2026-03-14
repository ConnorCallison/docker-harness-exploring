import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DatePicker } from "~/components/ui/DatePicker";

describe("DatePicker", () => {
  it("renders without crashing", () => {
    render(<DatePicker />);
    expect(screen.getByTestId("DatePicker")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<DatePicker className="custom-class" />);
    const el = screen.getByTestId("DatePicker");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<DatePicker><span data-testid="child">Hello</span></DatePicker>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<DatePicker variant="primary" />);
    const el = screen.getByTestId("DatePicker");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<DatePicker size="lg" />);
    const el = screen.getByTestId("DatePicker");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<DatePicker disabled />);
    const el = screen.getByTestId("DatePicker");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<DatePicker loading />);
    const el = screen.getByTestId("DatePicker");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<DatePicker onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DatePicker"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<DatePicker disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DatePicker"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<DatePicker loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DatePicker"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<DatePicker onClick={onClick} />);
    const el = screen.getByTestId("DatePicker");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<DatePicker />);
    expect(screen.getByText("Date Picker")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<DatePicker />);
    const el = screen.getByTestId("DatePicker");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<DatePicker />);
    const el = screen.getByTestId("DatePicker");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<DatePicker id="custom-id" />);
    const el = screen.getByTestId("DatePicker");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<DatePicker testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<DatePicker aria-label="Accessible name" />);
    const el = screen.getByTestId("DatePicker");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<DatePicker variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<DatePicker size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<DatePicker ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
