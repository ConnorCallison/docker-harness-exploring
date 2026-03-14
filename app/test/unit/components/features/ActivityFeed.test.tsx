import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ActivityFeed } from "~/components/features/ActivityFeed";

describe("ActivityFeed", () => {
  it("renders without crashing", () => {
    render(<ActivityFeed />);
    expect(screen.getByTestId("ActivityFeed")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ActivityFeed className="custom-class" />);
    const el = screen.getByTestId("ActivityFeed");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ActivityFeed><span data-testid="child">Hello</span></ActivityFeed>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ActivityFeed variant="primary" />);
    const el = screen.getByTestId("ActivityFeed");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ActivityFeed size="lg" />);
    const el = screen.getByTestId("ActivityFeed");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ActivityFeed disabled />);
    const el = screen.getByTestId("ActivityFeed");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ActivityFeed loading />);
    const el = screen.getByTestId("ActivityFeed");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ActivityFeed onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ActivityFeed"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ActivityFeed disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ActivityFeed"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ActivityFeed loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ActivityFeed"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ActivityFeed onClick={onClick} />);
    const el = screen.getByTestId("ActivityFeed");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ActivityFeed />);
    expect(screen.getByText("Activity Feed")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ActivityFeed />);
    const el = screen.getByTestId("ActivityFeed");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ActivityFeed />);
    const el = screen.getByTestId("ActivityFeed");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ActivityFeed id="custom-id" />);
    const el = screen.getByTestId("ActivityFeed");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ActivityFeed testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ActivityFeed aria-label="Accessible name" />);
    const el = screen.getByTestId("ActivityFeed");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ActivityFeed variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ActivityFeed size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ActivityFeed ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
