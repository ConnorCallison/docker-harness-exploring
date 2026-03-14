import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExpressionInput } from "~/components/forms/ExpressionInput";

describe("ExpressionInput", () => {
  it("renders without crashing", () => {
    render(<ExpressionInput />);
    expect(screen.getByTestId("ExpressionInput")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ExpressionInput className="custom-class" />);
    const el = screen.getByTestId("ExpressionInput");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ExpressionInput><span data-testid="child">Hello</span></ExpressionInput>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ExpressionInput variant="primary" />);
    const el = screen.getByTestId("ExpressionInput");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ExpressionInput size="lg" />);
    const el = screen.getByTestId("ExpressionInput");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ExpressionInput disabled />);
    const el = screen.getByTestId("ExpressionInput");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ExpressionInput loading />);
    const el = screen.getByTestId("ExpressionInput");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ExpressionInput onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ExpressionInput"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ExpressionInput disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ExpressionInput"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ExpressionInput loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ExpressionInput"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ExpressionInput onClick={onClick} />);
    const el = screen.getByTestId("ExpressionInput");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ExpressionInput />);
    expect(screen.getByText("Expression Input")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ExpressionInput />);
    const el = screen.getByTestId("ExpressionInput");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ExpressionInput />);
    const el = screen.getByTestId("ExpressionInput");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ExpressionInput id="custom-id" />);
    const el = screen.getByTestId("ExpressionInput");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ExpressionInput testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ExpressionInput aria-label="Accessible name" />);
    const el = screen.getByTestId("ExpressionInput");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ExpressionInput variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ExpressionInput size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ExpressionInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
