import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Resizable } from "~/components/ui/Resizable";

describe("Resizable", () => {
  it("renders without crashing", () => {
    render(<Resizable />);
    expect(screen.getByTestId("Resizable")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Resizable className="custom-class" />);
    const el = screen.getByTestId("Resizable");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Resizable><span data-testid="child">Hello</span></Resizable>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Resizable variant="primary" />);
    const el = screen.getByTestId("Resizable");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Resizable size="lg" />);
    const el = screen.getByTestId("Resizable");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Resizable disabled />);
    const el = screen.getByTestId("Resizable");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Resizable loading />);
    const el = screen.getByTestId("Resizable");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Resizable onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Resizable"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Resizable disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Resizable"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Resizable loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Resizable"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Resizable onClick={onClick} />);
    const el = screen.getByTestId("Resizable");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Resizable />);
    expect(screen.getByText("Resizable")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Resizable />);
    const el = screen.getByTestId("Resizable");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Resizable />);
    const el = screen.getByTestId("Resizable");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Resizable id="custom-id" />);
    const el = screen.getByTestId("Resizable");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Resizable testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Resizable aria-label="Accessible name" />);
    const el = screen.getByTestId("Resizable");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Resizable variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Resizable size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Resizable ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
