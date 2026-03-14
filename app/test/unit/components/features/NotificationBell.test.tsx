import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NotificationBell } from "~/components/features/NotificationBell";

describe("NotificationBell", () => {
  it("renders without crashing", () => {
    render(<NotificationBell />);
    expect(screen.getByTestId("NotificationBell")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<NotificationBell className="custom-class" />);
    const el = screen.getByTestId("NotificationBell");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<NotificationBell><span data-testid="child">Hello</span></NotificationBell>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<NotificationBell variant="primary" />);
    const el = screen.getByTestId("NotificationBell");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<NotificationBell size="lg" />);
    const el = screen.getByTestId("NotificationBell");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<NotificationBell disabled />);
    const el = screen.getByTestId("NotificationBell");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<NotificationBell loading />);
    const el = screen.getByTestId("NotificationBell");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<NotificationBell onClick={onClick} />);
    await userEvent.click(screen.getByTestId("NotificationBell"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<NotificationBell disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("NotificationBell"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<NotificationBell loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("NotificationBell"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<NotificationBell onClick={onClick} />);
    const el = screen.getByTestId("NotificationBell");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<NotificationBell />);
    expect(screen.getByText("Notification Bell")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<NotificationBell />);
    const el = screen.getByTestId("NotificationBell");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<NotificationBell />);
    const el = screen.getByTestId("NotificationBell");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<NotificationBell id="custom-id" />);
    const el = screen.getByTestId("NotificationBell");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<NotificationBell testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<NotificationBell aria-label="Accessible name" />);
    const el = screen.getByTestId("NotificationBell");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<NotificationBell variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<NotificationBell size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<NotificationBell ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
