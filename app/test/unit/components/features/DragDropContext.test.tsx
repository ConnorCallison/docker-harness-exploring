import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DragDropContext } from "~/components/features/DragDropContext";

describe("DragDropContext", () => {
  it("renders without crashing", () => {
    render(<DragDropContext />);
    expect(screen.getByTestId("DragDropContext")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<DragDropContext className="custom-class" />);
    const el = screen.getByTestId("DragDropContext");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<DragDropContext><span data-testid="child">Hello</span></DragDropContext>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<DragDropContext variant="primary" />);
    const el = screen.getByTestId("DragDropContext");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<DragDropContext size="lg" />);
    const el = screen.getByTestId("DragDropContext");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<DragDropContext disabled />);
    const el = screen.getByTestId("DragDropContext");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<DragDropContext loading />);
    const el = screen.getByTestId("DragDropContext");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<DragDropContext onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DragDropContext"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<DragDropContext disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DragDropContext"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<DragDropContext loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DragDropContext"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<DragDropContext onClick={onClick} />);
    const el = screen.getByTestId("DragDropContext");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<DragDropContext />);
    expect(screen.getByText("Drag Drop Context")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<DragDropContext />);
    const el = screen.getByTestId("DragDropContext");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<DragDropContext />);
    const el = screen.getByTestId("DragDropContext");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<DragDropContext id="custom-id" />);
    const el = screen.getByTestId("DragDropContext");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<DragDropContext testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<DragDropContext aria-label="Accessible name" />);
    const el = screen.getByTestId("DragDropContext");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<DragDropContext variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<DragDropContext size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<DragDropContext ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
