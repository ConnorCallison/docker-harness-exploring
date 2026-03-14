import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover } from "~/components/ui/Popover";

describe("Popover", () => {
  it("renders without crashing", () => {
    render(<Popover />);
    expect(screen.getByTestId("Popover")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Popover className="custom-class" />);
    const el = screen.getByTestId("Popover");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Popover><span data-testid="child">Hello</span></Popover>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Popover variant="primary" />);
    const el = screen.getByTestId("Popover");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Popover size="lg" />);
    const el = screen.getByTestId("Popover");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Popover disabled />);
    const el = screen.getByTestId("Popover");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Popover loading />);
    const el = screen.getByTestId("Popover");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Popover onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Popover"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Popover disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Popover"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Popover loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Popover"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Popover onClick={onClick} />);
    const el = screen.getByTestId("Popover");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Popover />);
    expect(screen.getByText("Popover")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Popover />);
    const el = screen.getByTestId("Popover");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Popover />);
    const el = screen.getByTestId("Popover");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Popover id="custom-id" />);
    const el = screen.getByTestId("Popover");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Popover testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Popover aria-label="Accessible name" />);
    const el = screen.getByTestId("Popover");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Popover variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Popover size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Popover ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
