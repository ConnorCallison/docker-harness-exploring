import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FrozenColumns } from "~/components/data/FrozenColumns";

describe("FrozenColumns", () => {
  it("renders without crashing", () => {
    render(<FrozenColumns />);
    expect(screen.getByTestId("FrozenColumns")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<FrozenColumns className="custom-class" />);
    const el = screen.getByTestId("FrozenColumns");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<FrozenColumns><span data-testid="child">Hello</span></FrozenColumns>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<FrozenColumns variant="primary" />);
    const el = screen.getByTestId("FrozenColumns");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<FrozenColumns size="lg" />);
    const el = screen.getByTestId("FrozenColumns");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<FrozenColumns disabled />);
    const el = screen.getByTestId("FrozenColumns");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<FrozenColumns loading />);
    const el = screen.getByTestId("FrozenColumns");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<FrozenColumns onClick={onClick} />);
    await userEvent.click(screen.getByTestId("FrozenColumns"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<FrozenColumns disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("FrozenColumns"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<FrozenColumns loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("FrozenColumns"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<FrozenColumns onClick={onClick} />);
    const el = screen.getByTestId("FrozenColumns");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<FrozenColumns />);
    expect(screen.getByText("Frozen Columns")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<FrozenColumns />);
    const el = screen.getByTestId("FrozenColumns");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<FrozenColumns />);
    const el = screen.getByTestId("FrozenColumns");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<FrozenColumns id="custom-id" />);
    const el = screen.getByTestId("FrozenColumns");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<FrozenColumns testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<FrozenColumns aria-label="Accessible name" />);
    const el = screen.getByTestId("FrozenColumns");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<FrozenColumns variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<FrozenColumns size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<FrozenColumns ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
