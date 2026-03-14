import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ListView } from "~/components/data/ListView";

describe("ListView", () => {
  it("renders without crashing", () => {
    render(<ListView />);
    expect(screen.getByTestId("ListView")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ListView className="custom-class" />);
    const el = screen.getByTestId("ListView");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ListView><span data-testid="child">Hello</span></ListView>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ListView variant="primary" />);
    const el = screen.getByTestId("ListView");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ListView size="lg" />);
    const el = screen.getByTestId("ListView");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ListView disabled />);
    const el = screen.getByTestId("ListView");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ListView loading />);
    const el = screen.getByTestId("ListView");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ListView onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ListView"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ListView disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ListView"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ListView loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ListView"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ListView onClick={onClick} />);
    const el = screen.getByTestId("ListView");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ListView />);
    expect(screen.getByText("List View")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ListView />);
    const el = screen.getByTestId("ListView");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ListView />);
    const el = screen.getByTestId("ListView");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ListView id="custom-id" />);
    const el = screen.getByTestId("ListView");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ListView testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ListView aria-label="Accessible name" />);
    const el = screen.getByTestId("ListView");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ListView variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ListView size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ListView ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
