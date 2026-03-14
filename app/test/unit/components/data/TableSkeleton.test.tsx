import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TableSkeleton } from "~/components/data/TableSkeleton";

describe("TableSkeleton", () => {
  it("renders without crashing", () => {
    render(<TableSkeleton />);
    expect(screen.getByTestId("TableSkeleton")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<TableSkeleton className="custom-class" />);
    const el = screen.getByTestId("TableSkeleton");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<TableSkeleton><span data-testid="child">Hello</span></TableSkeleton>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<TableSkeleton variant="primary" />);
    const el = screen.getByTestId("TableSkeleton");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<TableSkeleton size="lg" />);
    const el = screen.getByTestId("TableSkeleton");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<TableSkeleton disabled />);
    const el = screen.getByTestId("TableSkeleton");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<TableSkeleton loading />);
    const el = screen.getByTestId("TableSkeleton");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<TableSkeleton onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TableSkeleton"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<TableSkeleton disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TableSkeleton"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<TableSkeleton loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TableSkeleton"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<TableSkeleton onClick={onClick} />);
    const el = screen.getByTestId("TableSkeleton");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<TableSkeleton />);
    expect(screen.getByText("Table Skeleton")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<TableSkeleton />);
    const el = screen.getByTestId("TableSkeleton");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<TableSkeleton />);
    const el = screen.getByTestId("TableSkeleton");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<TableSkeleton id="custom-id" />);
    const el = screen.getByTestId("TableSkeleton");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<TableSkeleton testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<TableSkeleton aria-label="Accessible name" />);
    const el = screen.getByTestId("TableSkeleton");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<TableSkeleton variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<TableSkeleton size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<TableSkeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
