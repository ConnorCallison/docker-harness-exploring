import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Table } from "~/components/ui/Table";

describe("Table", () => {
  it("renders without crashing", () => {
    render(<Table />);
    expect(screen.getByTestId("Table")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Table className="custom-class" />);
    const el = screen.getByTestId("Table");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Table><span data-testid="child">Hello</span></Table>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Table variant="primary" />);
    const el = screen.getByTestId("Table");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Table size="lg" />);
    const el = screen.getByTestId("Table");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Table disabled />);
    const el = screen.getByTestId("Table");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Table loading />);
    const el = screen.getByTestId("Table");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Table onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Table"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Table disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Table"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Table loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Table"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Table onClick={onClick} />);
    const el = screen.getByTestId("Table");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Table />);
    expect(screen.getByText("Table")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Table />);
    const el = screen.getByTestId("Table");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Table />);
    const el = screen.getByTestId("Table");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Table id="custom-id" />);
    const el = screen.getByTestId("Table");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Table testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Table aria-label="Accessible name" />);
    const el = screen.getByTestId("Table");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Table variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Table size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Table ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
