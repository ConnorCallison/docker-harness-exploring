import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SchemaEditor } from "~/components/forms/SchemaEditor";

describe("SchemaEditor", () => {
  it("renders without crashing", () => {
    render(<SchemaEditor />);
    expect(screen.getByTestId("SchemaEditor")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<SchemaEditor className="custom-class" />);
    const el = screen.getByTestId("SchemaEditor");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<SchemaEditor><span data-testid="child">Hello</span></SchemaEditor>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<SchemaEditor variant="primary" />);
    const el = screen.getByTestId("SchemaEditor");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<SchemaEditor size="lg" />);
    const el = screen.getByTestId("SchemaEditor");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<SchemaEditor disabled />);
    const el = screen.getByTestId("SchemaEditor");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<SchemaEditor loading />);
    const el = screen.getByTestId("SchemaEditor");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<SchemaEditor onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SchemaEditor"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<SchemaEditor disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SchemaEditor"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<SchemaEditor loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SchemaEditor"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<SchemaEditor onClick={onClick} />);
    const el = screen.getByTestId("SchemaEditor");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<SchemaEditor />);
    expect(screen.getByText("Schema Editor")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<SchemaEditor />);
    const el = screen.getByTestId("SchemaEditor");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<SchemaEditor />);
    const el = screen.getByTestId("SchemaEditor");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<SchemaEditor id="custom-id" />);
    const el = screen.getByTestId("SchemaEditor");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<SchemaEditor testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<SchemaEditor aria-label="Accessible name" />);
    const el = screen.getByTestId("SchemaEditor");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<SchemaEditor variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<SchemaEditor size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<SchemaEditor ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
