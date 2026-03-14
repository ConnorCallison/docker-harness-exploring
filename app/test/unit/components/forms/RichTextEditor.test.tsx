import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RichTextEditor } from "~/components/forms/RichTextEditor";

describe("RichTextEditor", () => {
  it("renders without crashing", () => {
    render(<RichTextEditor />);
    expect(screen.getByTestId("RichTextEditor")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<RichTextEditor className="custom-class" />);
    const el = screen.getByTestId("RichTextEditor");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<RichTextEditor><span data-testid="child">Hello</span></RichTextEditor>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<RichTextEditor variant="primary" />);
    const el = screen.getByTestId("RichTextEditor");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<RichTextEditor size="lg" />);
    const el = screen.getByTestId("RichTextEditor");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<RichTextEditor disabled />);
    const el = screen.getByTestId("RichTextEditor");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<RichTextEditor loading />);
    const el = screen.getByTestId("RichTextEditor");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<RichTextEditor onClick={onClick} />);
    await userEvent.click(screen.getByTestId("RichTextEditor"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<RichTextEditor disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("RichTextEditor"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<RichTextEditor loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("RichTextEditor"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<RichTextEditor onClick={onClick} />);
    const el = screen.getByTestId("RichTextEditor");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<RichTextEditor />);
    expect(screen.getByText("Rich Text Editor")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<RichTextEditor />);
    const el = screen.getByTestId("RichTextEditor");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<RichTextEditor />);
    const el = screen.getByTestId("RichTextEditor");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<RichTextEditor id="custom-id" />);
    const el = screen.getByTestId("RichTextEditor");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<RichTextEditor testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<RichTextEditor aria-label="Accessible name" />);
    const el = screen.getByTestId("RichTextEditor");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<RichTextEditor variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<RichTextEditor size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<RichTextEditor ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
