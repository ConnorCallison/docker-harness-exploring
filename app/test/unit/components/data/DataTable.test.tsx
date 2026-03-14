import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "~/components/data/DataTable";

describe("DataTable", () => {
  it("renders without crashing", () => {
    render(<DataTable />);
    expect(screen.getByTestId("DataTable")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<DataTable className="custom-class" />);
    const el = screen.getByTestId("DataTable");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<DataTable><span data-testid="child">Hello</span></DataTable>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<DataTable variant="primary" />);
    const el = screen.getByTestId("DataTable");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<DataTable size="lg" />);
    const el = screen.getByTestId("DataTable");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<DataTable disabled />);
    const el = screen.getByTestId("DataTable");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<DataTable loading />);
    const el = screen.getByTestId("DataTable");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<DataTable onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DataTable"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<DataTable disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DataTable"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<DataTable loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DataTable"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<DataTable onClick={onClick} />);
    const el = screen.getByTestId("DataTable");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<DataTable />);
    expect(screen.getByText("Data Table")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<DataTable />);
    const el = screen.getByTestId("DataTable");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<DataTable />);
    const el = screen.getByTestId("DataTable");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<DataTable id="custom-id" />);
    const el = screen.getByTestId("DataTable");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<DataTable testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<DataTable aria-label="Accessible name" />);
    const el = screen.getByTestId("DataTable");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<DataTable variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<DataTable size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<DataTable ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
