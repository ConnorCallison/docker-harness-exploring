import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "~/components/forms/RegisterForm";

describe("RegisterForm", () => {
  it("renders without crashing", () => {
    render(<RegisterForm />);
    expect(screen.getByTestId("RegisterForm")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<RegisterForm className="custom-class" />);
    const el = screen.getByTestId("RegisterForm");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<RegisterForm><span data-testid="child">Hello</span></RegisterForm>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<RegisterForm variant="primary" />);
    const el = screen.getByTestId("RegisterForm");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<RegisterForm size="lg" />);
    const el = screen.getByTestId("RegisterForm");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<RegisterForm disabled />);
    const el = screen.getByTestId("RegisterForm");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<RegisterForm loading />);
    const el = screen.getByTestId("RegisterForm");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<RegisterForm onClick={onClick} />);
    await userEvent.click(screen.getByTestId("RegisterForm"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<RegisterForm disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("RegisterForm"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<RegisterForm loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("RegisterForm"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<RegisterForm onClick={onClick} />);
    const el = screen.getByTestId("RegisterForm");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<RegisterForm />);
    expect(screen.getByText("Register Form")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<RegisterForm />);
    const el = screen.getByTestId("RegisterForm");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<RegisterForm />);
    const el = screen.getByTestId("RegisterForm");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<RegisterForm id="custom-id" />);
    const el = screen.getByTestId("RegisterForm");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<RegisterForm testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<RegisterForm aria-label="Accessible name" />);
    const el = screen.getByTestId("RegisterForm");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<RegisterForm variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<RegisterForm size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<RegisterForm ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
