import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConditionEditor } from "~/components/forms/ConditionEditor";

describe("ConditionEditor", () => {
  it("renders without crashing", () => {
    render(<ConditionEditor />);
    expect(screen.getByTestId("ConditionEditor")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ConditionEditor className="custom-class" />);
    const el = screen.getByTestId("ConditionEditor");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ConditionEditor><span data-testid="child">Hello</span></ConditionEditor>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ConditionEditor variant="primary" />);
    const el = screen.getByTestId("ConditionEditor");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ConditionEditor size="lg" />);
    const el = screen.getByTestId("ConditionEditor");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ConditionEditor disabled />);
    const el = screen.getByTestId("ConditionEditor");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ConditionEditor loading />);
    const el = screen.getByTestId("ConditionEditor");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ConditionEditor onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ConditionEditor"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ConditionEditor disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ConditionEditor"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ConditionEditor loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ConditionEditor"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ConditionEditor onClick={onClick} />);
    const el = screen.getByTestId("ConditionEditor");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ConditionEditor />);
    expect(screen.getByText("Condition Editor")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ConditionEditor />);
    const el = screen.getByTestId("ConditionEditor");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ConditionEditor />);
    const el = screen.getByTestId("ConditionEditor");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ConditionEditor id="custom-id" />);
    const el = screen.getByTestId("ConditionEditor");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ConditionEditor testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ConditionEditor aria-label="Accessible name" />);
    const el = screen.getByTestId("ConditionEditor");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ConditionEditor variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ConditionEditor size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ConditionEditor ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
