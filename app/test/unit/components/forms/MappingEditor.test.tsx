import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MappingEditor } from "~/components/forms/MappingEditor";

describe("MappingEditor", () => {
  it("renders without crashing", () => {
    render(<MappingEditor />);
    expect(screen.getByTestId("MappingEditor")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<MappingEditor className="custom-class" />);
    const el = screen.getByTestId("MappingEditor");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<MappingEditor><span data-testid="child">Hello</span></MappingEditor>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<MappingEditor variant="primary" />);
    const el = screen.getByTestId("MappingEditor");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<MappingEditor size="lg" />);
    const el = screen.getByTestId("MappingEditor");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<MappingEditor disabled />);
    const el = screen.getByTestId("MappingEditor");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<MappingEditor loading />);
    const el = screen.getByTestId("MappingEditor");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<MappingEditor onClick={onClick} />);
    await userEvent.click(screen.getByTestId("MappingEditor"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<MappingEditor disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("MappingEditor"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<MappingEditor loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("MappingEditor"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<MappingEditor onClick={onClick} />);
    const el = screen.getByTestId("MappingEditor");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<MappingEditor />);
    expect(screen.getByText("Mapping Editor")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<MappingEditor />);
    const el = screen.getByTestId("MappingEditor");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<MappingEditor />);
    const el = screen.getByTestId("MappingEditor");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<MappingEditor id="custom-id" />);
    const el = screen.getByTestId("MappingEditor");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<MappingEditor testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<MappingEditor aria-label="Accessible name" />);
    const el = screen.getByTestId("MappingEditor");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<MappingEditor variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<MappingEditor size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<MappingEditor ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
