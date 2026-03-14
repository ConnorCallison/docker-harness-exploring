import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle } from "~/components/ui/Toggle";

describe("Toggle", () => {
  it("renders without crashing", () => {
    render(<Toggle />);
    expect(screen.getByTestId("Toggle")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Toggle className="custom-class" />);
    const el = screen.getByTestId("Toggle");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Toggle><span data-testid="child">Hello</span></Toggle>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Toggle variant="primary" />);
    const el = screen.getByTestId("Toggle");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Toggle size="lg" />);
    const el = screen.getByTestId("Toggle");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Toggle disabled />);
    const el = screen.getByTestId("Toggle");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Toggle loading />);
    const el = screen.getByTestId("Toggle");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Toggle onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Toggle"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Toggle disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Toggle"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Toggle loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Toggle"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Toggle onClick={onClick} />);
    const el = screen.getByTestId("Toggle");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Toggle />);
    expect(screen.getByText("Toggle")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Toggle />);
    const el = screen.getByTestId("Toggle");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Toggle />);
    const el = screen.getByTestId("Toggle");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Toggle id="custom-id" />);
    const el = screen.getByTestId("Toggle");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Toggle testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Toggle aria-label="Accessible name" />);
    const el = screen.getByTestId("Toggle");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Toggle variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Toggle size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Toggle ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
