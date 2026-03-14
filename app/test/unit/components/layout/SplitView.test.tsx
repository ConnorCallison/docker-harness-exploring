import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SplitView } from "~/components/layout/SplitView";

describe("SplitView", () => {
  it("renders without crashing", () => {
    render(<SplitView />);
    expect(screen.getByTestId("SplitView")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<SplitView className="custom-class" />);
    const el = screen.getByTestId("SplitView");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<SplitView><span data-testid="child">Hello</span></SplitView>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<SplitView variant="primary" />);
    const el = screen.getByTestId("SplitView");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<SplitView size="lg" />);
    const el = screen.getByTestId("SplitView");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<SplitView disabled />);
    const el = screen.getByTestId("SplitView");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<SplitView loading />);
    const el = screen.getByTestId("SplitView");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<SplitView onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SplitView"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<SplitView disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SplitView"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<SplitView loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SplitView"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<SplitView onClick={onClick} />);
    const el = screen.getByTestId("SplitView");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<SplitView />);
    expect(screen.getByText("Split View")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<SplitView />);
    const el = screen.getByTestId("SplitView");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<SplitView />);
    const el = screen.getByTestId("SplitView");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<SplitView id="custom-id" />);
    const el = screen.getByTestId("SplitView");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<SplitView testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<SplitView aria-label="Accessible name" />);
    const el = screen.getByTestId("SplitView");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<SplitView variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<SplitView size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<SplitView ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
