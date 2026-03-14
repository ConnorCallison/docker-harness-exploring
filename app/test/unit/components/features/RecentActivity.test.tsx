import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RecentActivity } from "~/components/features/RecentActivity";

describe("RecentActivity", () => {
  it("renders without crashing", () => {
    render(<RecentActivity />);
    expect(screen.getByTestId("RecentActivity")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<RecentActivity className="custom-class" />);
    const el = screen.getByTestId("RecentActivity");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<RecentActivity><span data-testid="child">Hello</span></RecentActivity>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<RecentActivity variant="primary" />);
    const el = screen.getByTestId("RecentActivity");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<RecentActivity size="lg" />);
    const el = screen.getByTestId("RecentActivity");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<RecentActivity disabled />);
    const el = screen.getByTestId("RecentActivity");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<RecentActivity loading />);
    const el = screen.getByTestId("RecentActivity");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<RecentActivity onClick={onClick} />);
    await userEvent.click(screen.getByTestId("RecentActivity"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<RecentActivity disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("RecentActivity"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<RecentActivity loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("RecentActivity"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<RecentActivity onClick={onClick} />);
    const el = screen.getByTestId("RecentActivity");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<RecentActivity />);
    expect(screen.getByText("Recent Activity")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<RecentActivity />);
    const el = screen.getByTestId("RecentActivity");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<RecentActivity />);
    const el = screen.getByTestId("RecentActivity");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<RecentActivity id="custom-id" />);
    const el = screen.getByTestId("RecentActivity");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<RecentActivity testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<RecentActivity aria-label="Accessible name" />);
    const el = screen.getByTestId("RecentActivity");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<RecentActivity variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<RecentActivity size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<RecentActivity ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
