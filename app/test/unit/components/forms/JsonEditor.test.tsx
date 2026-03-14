import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { JsonEditor } from "~/components/forms/JsonEditor";

describe("JsonEditor", () => {
  it("renders without crashing", () => {
    render(<JsonEditor />);
    expect(screen.getByTestId("JsonEditor")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<JsonEditor className="custom-class" />);
    const el = screen.getByTestId("JsonEditor");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<JsonEditor><span data-testid="child">Hello</span></JsonEditor>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<JsonEditor variant="primary" />);
    const el = screen.getByTestId("JsonEditor");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<JsonEditor size="lg" />);
    const el = screen.getByTestId("JsonEditor");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<JsonEditor disabled />);
    const el = screen.getByTestId("JsonEditor");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<JsonEditor loading />);
    const el = screen.getByTestId("JsonEditor");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<JsonEditor onClick={onClick} />);
    await userEvent.click(screen.getByTestId("JsonEditor"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<JsonEditor disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("JsonEditor"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<JsonEditor loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("JsonEditor"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<JsonEditor onClick={onClick} />);
    const el = screen.getByTestId("JsonEditor");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<JsonEditor />);
    expect(screen.getByText("Json Editor")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<JsonEditor />);
    const el = screen.getByTestId("JsonEditor");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<JsonEditor />);
    const el = screen.getByTestId("JsonEditor");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<JsonEditor id="custom-id" />);
    const el = screen.getByTestId("JsonEditor");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<JsonEditor testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<JsonEditor aria-label="Accessible name" />);
    const el = screen.getByTestId("JsonEditor");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<JsonEditor variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<JsonEditor size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<JsonEditor ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
