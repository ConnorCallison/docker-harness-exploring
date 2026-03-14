import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UndoRedo } from "~/components/features/UndoRedo";

describe("UndoRedo", () => {
  it("renders without crashing", () => {
    render(<UndoRedo />);
    expect(screen.getByTestId("UndoRedo")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<UndoRedo className="custom-class" />);
    const el = screen.getByTestId("UndoRedo");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<UndoRedo><span data-testid="child">Hello</span></UndoRedo>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<UndoRedo variant="primary" />);
    const el = screen.getByTestId("UndoRedo");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<UndoRedo size="lg" />);
    const el = screen.getByTestId("UndoRedo");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<UndoRedo disabled />);
    const el = screen.getByTestId("UndoRedo");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<UndoRedo loading />);
    const el = screen.getByTestId("UndoRedo");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<UndoRedo onClick={onClick} />);
    await userEvent.click(screen.getByTestId("UndoRedo"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<UndoRedo disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("UndoRedo"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<UndoRedo loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("UndoRedo"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<UndoRedo onClick={onClick} />);
    const el = screen.getByTestId("UndoRedo");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<UndoRedo />);
    expect(screen.getByText("Undo Redo")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<UndoRedo />);
    const el = screen.getByTestId("UndoRedo");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<UndoRedo />);
    const el = screen.getByTestId("UndoRedo");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<UndoRedo id="custom-id" />);
    const el = screen.getByTestId("UndoRedo");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<UndoRedo testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<UndoRedo aria-label="Accessible name" />);
    const el = screen.getByTestId("UndoRedo");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<UndoRedo variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<UndoRedo size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<UndoRedo ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
