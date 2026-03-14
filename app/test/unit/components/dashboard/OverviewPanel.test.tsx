import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OverviewPanel } from "~/components/dashboard/OverviewPanel";

describe("OverviewPanel", () => {
  it("renders without crashing", () => {
    render(<OverviewPanel />);
    expect(screen.getByTestId("OverviewPanel")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<OverviewPanel className="custom-class" />);
    const el = screen.getByTestId("OverviewPanel");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<OverviewPanel><span data-testid="child">Hello</span></OverviewPanel>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<OverviewPanel variant="primary" />);
    const el = screen.getByTestId("OverviewPanel");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<OverviewPanel size="lg" />);
    const el = screen.getByTestId("OverviewPanel");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<OverviewPanel disabled />);
    const el = screen.getByTestId("OverviewPanel");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<OverviewPanel loading />);
    const el = screen.getByTestId("OverviewPanel");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<OverviewPanel onClick={onClick} />);
    await userEvent.click(screen.getByTestId("OverviewPanel"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<OverviewPanel disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("OverviewPanel"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<OverviewPanel loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("OverviewPanel"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<OverviewPanel onClick={onClick} />);
    const el = screen.getByTestId("OverviewPanel");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<OverviewPanel />);
    expect(screen.getByText("Overview Panel")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<OverviewPanel />);
    const el = screen.getByTestId("OverviewPanel");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<OverviewPanel />);
    const el = screen.getByTestId("OverviewPanel");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<OverviewPanel id="custom-id" />);
    const el = screen.getByTestId("OverviewPanel");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<OverviewPanel testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<OverviewPanel aria-label="Accessible name" />);
    const el = screen.getByTestId("OverviewPanel");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<OverviewPanel variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<OverviewPanel size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<OverviewPanel ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
