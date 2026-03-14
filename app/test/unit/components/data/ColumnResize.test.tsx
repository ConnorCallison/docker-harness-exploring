import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ColumnResize } from "~/components/data/ColumnResize";

describe("ColumnResize", () => {
  it("renders without crashing", () => {
    render(<ColumnResize />);
    expect(screen.getByTestId("ColumnResize")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ColumnResize className="custom-class" />);
    const el = screen.getByTestId("ColumnResize");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ColumnResize><span data-testid="child">Hello</span></ColumnResize>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ColumnResize variant="primary" />);
    const el = screen.getByTestId("ColumnResize");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ColumnResize size="lg" />);
    const el = screen.getByTestId("ColumnResize");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ColumnResize disabled />);
    const el = screen.getByTestId("ColumnResize");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ColumnResize loading />);
    const el = screen.getByTestId("ColumnResize");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ColumnResize onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ColumnResize"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ColumnResize disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ColumnResize"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ColumnResize loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ColumnResize"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ColumnResize onClick={onClick} />);
    const el = screen.getByTestId("ColumnResize");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ColumnResize />);
    expect(screen.getByText("Column Resize")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ColumnResize />);
    const el = screen.getByTestId("ColumnResize");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ColumnResize />);
    const el = screen.getByTestId("ColumnResize");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ColumnResize id="custom-id" />);
    const el = screen.getByTestId("ColumnResize");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ColumnResize testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ColumnResize aria-label="Accessible name" />);
    const el = screen.getByTestId("ColumnResize");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ColumnResize variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ColumnResize size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ColumnResize ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
