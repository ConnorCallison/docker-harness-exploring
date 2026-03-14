import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PaymentForm } from "~/components/forms/PaymentForm";

describe("PaymentForm", () => {
  it("renders without crashing", () => {
    render(<PaymentForm />);
    expect(screen.getByTestId("PaymentForm")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<PaymentForm className="custom-class" />);
    const el = screen.getByTestId("PaymentForm");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<PaymentForm><span data-testid="child">Hello</span></PaymentForm>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<PaymentForm variant="primary" />);
    const el = screen.getByTestId("PaymentForm");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<PaymentForm size="lg" />);
    const el = screen.getByTestId("PaymentForm");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<PaymentForm disabled />);
    const el = screen.getByTestId("PaymentForm");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<PaymentForm loading />);
    const el = screen.getByTestId("PaymentForm");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<PaymentForm onClick={onClick} />);
    await userEvent.click(screen.getByTestId("PaymentForm"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<PaymentForm disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("PaymentForm"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<PaymentForm loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("PaymentForm"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<PaymentForm onClick={onClick} />);
    const el = screen.getByTestId("PaymentForm");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<PaymentForm />);
    expect(screen.getByText("Payment Form")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<PaymentForm />);
    const el = screen.getByTestId("PaymentForm");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<PaymentForm />);
    const el = screen.getByTestId("PaymentForm");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<PaymentForm id="custom-id" />);
    const el = screen.getByTestId("PaymentForm");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<PaymentForm testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<PaymentForm aria-label="Accessible name" />);
    const el = screen.getByTestId("PaymentForm");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<PaymentForm variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<PaymentForm size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<PaymentForm ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
