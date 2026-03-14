import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AlertsPanel } from "~/components/dashboard/AlertsPanel";

describe("AlertsPanel", () => {
  it("renders without crashing", () => {
    render(<AlertsPanel />);
    expect(screen.getByTestId("AlertsPanel")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<AlertsPanel className="custom-class" />);
    const el = screen.getByTestId("AlertsPanel");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<AlertsPanel><span data-testid="child">Hello</span></AlertsPanel>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<AlertsPanel variant="primary" />);
    const el = screen.getByTestId("AlertsPanel");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<AlertsPanel size="lg" />);
    const el = screen.getByTestId("AlertsPanel");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<AlertsPanel disabled />);
    const el = screen.getByTestId("AlertsPanel");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<AlertsPanel loading />);
    const el = screen.getByTestId("AlertsPanel");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<AlertsPanel onClick={onClick} />);
    await userEvent.click(screen.getByTestId("AlertsPanel"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<AlertsPanel disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("AlertsPanel"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<AlertsPanel loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("AlertsPanel"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<AlertsPanel onClick={onClick} />);
    const el = screen.getByTestId("AlertsPanel");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<AlertsPanel />);
    expect(screen.getByText("Alerts Panel")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<AlertsPanel />);
    const el = screen.getByTestId("AlertsPanel");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<AlertsPanel />);
    const el = screen.getByTestId("AlertsPanel");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<AlertsPanel id="custom-id" />);
    const el = screen.getByTestId("AlertsPanel");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<AlertsPanel testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<AlertsPanel aria-label="Accessible name" />);
    const el = screen.getByTestId("AlertsPanel");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<AlertsPanel variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<AlertsPanel size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<AlertsPanel ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
