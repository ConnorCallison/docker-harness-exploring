import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UptimeMonitor } from "~/components/dashboard/UptimeMonitor";

describe("UptimeMonitor", () => {
  it("renders without crashing", () => {
    render(<UptimeMonitor />);
    expect(screen.getByTestId("UptimeMonitor")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<UptimeMonitor className="custom-class" />);
    const el = screen.getByTestId("UptimeMonitor");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<UptimeMonitor><span data-testid="child">Hello</span></UptimeMonitor>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<UptimeMonitor variant="primary" />);
    const el = screen.getByTestId("UptimeMonitor");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<UptimeMonitor size="lg" />);
    const el = screen.getByTestId("UptimeMonitor");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<UptimeMonitor disabled />);
    const el = screen.getByTestId("UptimeMonitor");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<UptimeMonitor loading />);
    const el = screen.getByTestId("UptimeMonitor");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<UptimeMonitor onClick={onClick} />);
    await userEvent.click(screen.getByTestId("UptimeMonitor"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<UptimeMonitor disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("UptimeMonitor"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<UptimeMonitor loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("UptimeMonitor"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<UptimeMonitor onClick={onClick} />);
    const el = screen.getByTestId("UptimeMonitor");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<UptimeMonitor />);
    expect(screen.getByText("Uptime Monitor")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<UptimeMonitor />);
    const el = screen.getByTestId("UptimeMonitor");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<UptimeMonitor />);
    const el = screen.getByTestId("UptimeMonitor");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<UptimeMonitor id="custom-id" />);
    const el = screen.getByTestId("UptimeMonitor");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<UptimeMonitor testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<UptimeMonitor aria-label="Accessible name" />);
    const el = screen.getByTestId("UptimeMonitor");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<UptimeMonitor variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<UptimeMonitor size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<UptimeMonitor ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
