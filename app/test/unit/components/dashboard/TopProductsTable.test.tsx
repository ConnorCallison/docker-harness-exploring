import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TopProductsTable } from "~/components/dashboard/TopProductsTable";

describe("TopProductsTable", () => {
  it("renders without crashing", () => {
    render(<TopProductsTable />);
    expect(screen.getByTestId("TopProductsTable")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<TopProductsTable className="custom-class" />);
    const el = screen.getByTestId("TopProductsTable");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<TopProductsTable><span data-testid="child">Hello</span></TopProductsTable>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<TopProductsTable variant="primary" />);
    const el = screen.getByTestId("TopProductsTable");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<TopProductsTable size="lg" />);
    const el = screen.getByTestId("TopProductsTable");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<TopProductsTable disabled />);
    const el = screen.getByTestId("TopProductsTable");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<TopProductsTable loading />);
    const el = screen.getByTestId("TopProductsTable");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<TopProductsTable onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TopProductsTable"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<TopProductsTable disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TopProductsTable"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<TopProductsTable loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TopProductsTable"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<TopProductsTable onClick={onClick} />);
    const el = screen.getByTestId("TopProductsTable");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<TopProductsTable />);
    expect(screen.getByText("Top Products Table")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<TopProductsTable />);
    const el = screen.getByTestId("TopProductsTable");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<TopProductsTable />);
    const el = screen.getByTestId("TopProductsTable");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<TopProductsTable id="custom-id" />);
    const el = screen.getByTestId("TopProductsTable");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<TopProductsTable testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<TopProductsTable aria-label="Accessible name" />);
    const el = screen.getByTestId("TopProductsTable");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<TopProductsTable variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<TopProductsTable size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<TopProductsTable ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
