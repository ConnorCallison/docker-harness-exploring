import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LatencyGraph } from "~/components/dashboard/LatencyGraph";

describe("LatencyGraph", () => {
  it("renders without crashing", () => {
    render(<LatencyGraph />);
    expect(screen.getByTestId("LatencyGraph")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<LatencyGraph className="custom-class" />);
    const el = screen.getByTestId("LatencyGraph");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<LatencyGraph><span data-testid="child">Hello</span></LatencyGraph>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<LatencyGraph variant="primary" />);
    const el = screen.getByTestId("LatencyGraph");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<LatencyGraph size="lg" />);
    const el = screen.getByTestId("LatencyGraph");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<LatencyGraph disabled />);
    const el = screen.getByTestId("LatencyGraph");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<LatencyGraph loading />);
    const el = screen.getByTestId("LatencyGraph");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<LatencyGraph onClick={onClick} />);
    await userEvent.click(screen.getByTestId("LatencyGraph"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<LatencyGraph disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("LatencyGraph"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<LatencyGraph loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("LatencyGraph"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<LatencyGraph onClick={onClick} />);
    const el = screen.getByTestId("LatencyGraph");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<LatencyGraph />);
    expect(screen.getByText("Latency Graph")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<LatencyGraph />);
    const el = screen.getByTestId("LatencyGraph");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<LatencyGraph />);
    const el = screen.getByTestId("LatencyGraph");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<LatencyGraph id="custom-id" />);
    const el = screen.getByTestId("LatencyGraph");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<LatencyGraph testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<LatencyGraph aria-label="Accessible name" />);
    const el = screen.getByTestId("LatencyGraph");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<LatencyGraph variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<LatencyGraph size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<LatencyGraph ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
