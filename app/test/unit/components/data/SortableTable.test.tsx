import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SortableTable } from "~/components/data/SortableTable";

describe("SortableTable", () => {
  it("renders without crashing", () => {
    render(<SortableTable />);
    expect(screen.getByTestId("SortableTable")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<SortableTable className="custom-class" />);
    const el = screen.getByTestId("SortableTable");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<SortableTable><span data-testid="child">Hello</span></SortableTable>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<SortableTable variant="primary" />);
    const el = screen.getByTestId("SortableTable");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<SortableTable size="lg" />);
    const el = screen.getByTestId("SortableTable");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<SortableTable disabled />);
    const el = screen.getByTestId("SortableTable");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<SortableTable loading />);
    const el = screen.getByTestId("SortableTable");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<SortableTable onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SortableTable"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<SortableTable disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SortableTable"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<SortableTable loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SortableTable"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<SortableTable onClick={onClick} />);
    const el = screen.getByTestId("SortableTable");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<SortableTable />);
    expect(screen.getByText("Sortable Table")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<SortableTable />);
    const el = screen.getByTestId("SortableTable");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<SortableTable />);
    const el = screen.getByTestId("SortableTable");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<SortableTable id="custom-id" />);
    const el = screen.getByTestId("SortableTable");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<SortableTable testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<SortableTable aria-label="Accessible name" />);
    const el = screen.getByTestId("SortableTable");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<SortableTable variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<SortableTable size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<SortableTable ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
