import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SortConfigForm } from "~/components/forms/SortConfigForm";

describe("SortConfigForm", () => {
  it("renders without crashing", () => {
    render(<SortConfigForm />);
    expect(screen.getByTestId("SortConfigForm")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<SortConfigForm className="custom-class" />);
    const el = screen.getByTestId("SortConfigForm");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<SortConfigForm><span data-testid="child">Hello</span></SortConfigForm>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<SortConfigForm variant="primary" />);
    const el = screen.getByTestId("SortConfigForm");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<SortConfigForm size="lg" />);
    const el = screen.getByTestId("SortConfigForm");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<SortConfigForm disabled />);
    const el = screen.getByTestId("SortConfigForm");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<SortConfigForm loading />);
    const el = screen.getByTestId("SortConfigForm");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<SortConfigForm onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SortConfigForm"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<SortConfigForm disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SortConfigForm"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<SortConfigForm loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SortConfigForm"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<SortConfigForm onClick={onClick} />);
    const el = screen.getByTestId("SortConfigForm");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<SortConfigForm />);
    expect(screen.getByText("Sort Config Form")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<SortConfigForm />);
    const el = screen.getByTestId("SortConfigForm");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<SortConfigForm />);
    const el = screen.getByTestId("SortConfigForm");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<SortConfigForm id="custom-id" />);
    const el = screen.getByTestId("SortConfigForm");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<SortConfigForm testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<SortConfigForm aria-label="Accessible name" />);
    const el = screen.getByTestId("SortConfigForm");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<SortConfigForm variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<SortConfigForm size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<SortConfigForm ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
