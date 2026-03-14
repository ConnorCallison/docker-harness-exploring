import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LayoutConfigForm } from "~/components/forms/LayoutConfigForm";

describe("LayoutConfigForm", () => {
  it("renders without crashing", () => {
    render(<LayoutConfigForm />);
    expect(screen.getByTestId("LayoutConfigForm")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<LayoutConfigForm className="custom-class" />);
    const el = screen.getByTestId("LayoutConfigForm");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<LayoutConfigForm><span data-testid="child">Hello</span></LayoutConfigForm>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<LayoutConfigForm variant="primary" />);
    const el = screen.getByTestId("LayoutConfigForm");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<LayoutConfigForm size="lg" />);
    const el = screen.getByTestId("LayoutConfigForm");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<LayoutConfigForm disabled />);
    const el = screen.getByTestId("LayoutConfigForm");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<LayoutConfigForm loading />);
    const el = screen.getByTestId("LayoutConfigForm");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<LayoutConfigForm onClick={onClick} />);
    await userEvent.click(screen.getByTestId("LayoutConfigForm"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<LayoutConfigForm disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("LayoutConfigForm"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<LayoutConfigForm loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("LayoutConfigForm"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<LayoutConfigForm onClick={onClick} />);
    const el = screen.getByTestId("LayoutConfigForm");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<LayoutConfigForm />);
    expect(screen.getByText("Layout Config Form")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<LayoutConfigForm />);
    const el = screen.getByTestId("LayoutConfigForm");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<LayoutConfigForm />);
    const el = screen.getByTestId("LayoutConfigForm");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<LayoutConfigForm id="custom-id" />);
    const el = screen.getByTestId("LayoutConfigForm");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<LayoutConfigForm testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<LayoutConfigForm aria-label="Accessible name" />);
    const el = screen.getByTestId("LayoutConfigForm");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<LayoutConfigForm variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<LayoutConfigForm size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<LayoutConfigForm ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
