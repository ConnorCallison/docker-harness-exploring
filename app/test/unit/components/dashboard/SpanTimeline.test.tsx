import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SpanTimeline } from "~/components/dashboard/SpanTimeline";

describe("SpanTimeline", () => {
  it("renders without crashing", () => {
    render(<SpanTimeline />);
    expect(screen.getByTestId("SpanTimeline")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<SpanTimeline className="custom-class" />);
    const el = screen.getByTestId("SpanTimeline");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<SpanTimeline><span data-testid="child">Hello</span></SpanTimeline>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<SpanTimeline variant="primary" />);
    const el = screen.getByTestId("SpanTimeline");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<SpanTimeline size="lg" />);
    const el = screen.getByTestId("SpanTimeline");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<SpanTimeline disabled />);
    const el = screen.getByTestId("SpanTimeline");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<SpanTimeline loading />);
    const el = screen.getByTestId("SpanTimeline");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<SpanTimeline onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SpanTimeline"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<SpanTimeline disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SpanTimeline"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<SpanTimeline loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SpanTimeline"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<SpanTimeline onClick={onClick} />);
    const el = screen.getByTestId("SpanTimeline");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<SpanTimeline />);
    expect(screen.getByText("Span Timeline")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<SpanTimeline />);
    const el = screen.getByTestId("SpanTimeline");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<SpanTimeline />);
    const el = screen.getByTestId("SpanTimeline");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<SpanTimeline id="custom-id" />);
    const el = screen.getByTestId("SpanTimeline");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<SpanTimeline testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<SpanTimeline aria-label="Accessible name" />);
    const el = screen.getByTestId("SpanTimeline");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<SpanTimeline variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<SpanTimeline size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<SpanTimeline ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
