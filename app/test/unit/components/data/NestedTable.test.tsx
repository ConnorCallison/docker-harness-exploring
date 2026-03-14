import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NestedTable } from "~/components/data/NestedTable";

describe("NestedTable", () => {
  it("renders without crashing", () => {
    render(<NestedTable />);
    expect(screen.getByTestId("NestedTable")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<NestedTable className="custom-class" />);
    const el = screen.getByTestId("NestedTable");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<NestedTable><span data-testid="child">Hello</span></NestedTable>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<NestedTable variant="primary" />);
    const el = screen.getByTestId("NestedTable");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<NestedTable size="lg" />);
    const el = screen.getByTestId("NestedTable");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<NestedTable disabled />);
    const el = screen.getByTestId("NestedTable");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<NestedTable loading />);
    const el = screen.getByTestId("NestedTable");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<NestedTable onClick={onClick} />);
    await userEvent.click(screen.getByTestId("NestedTable"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<NestedTable disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("NestedTable"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<NestedTable loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("NestedTable"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<NestedTable onClick={onClick} />);
    const el = screen.getByTestId("NestedTable");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<NestedTable />);
    expect(screen.getByText("Nested Table")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<NestedTable />);
    const el = screen.getByTestId("NestedTable");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<NestedTable />);
    const el = screen.getByTestId("NestedTable");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<NestedTable id="custom-id" />);
    const el = screen.getByTestId("NestedTable");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<NestedTable testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<NestedTable aria-label="Accessible name" />);
    const el = screen.getByTestId("NestedTable");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<NestedTable variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<NestedTable size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<NestedTable ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
