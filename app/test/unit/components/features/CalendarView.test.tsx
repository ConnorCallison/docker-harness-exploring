import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalendarView } from "~/components/features/CalendarView";

describe("CalendarView", () => {
  it("renders without crashing", () => {
    render(<CalendarView />);
    expect(screen.getByTestId("CalendarView")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<CalendarView className="custom-class" />);
    const el = screen.getByTestId("CalendarView");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<CalendarView><span data-testid="child">Hello</span></CalendarView>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<CalendarView variant="primary" />);
    const el = screen.getByTestId("CalendarView");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<CalendarView size="lg" />);
    const el = screen.getByTestId("CalendarView");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<CalendarView disabled />);
    const el = screen.getByTestId("CalendarView");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<CalendarView loading />);
    const el = screen.getByTestId("CalendarView");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<CalendarView onClick={onClick} />);
    await userEvent.click(screen.getByTestId("CalendarView"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<CalendarView disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("CalendarView"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<CalendarView loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("CalendarView"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<CalendarView onClick={onClick} />);
    const el = screen.getByTestId("CalendarView");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<CalendarView />);
    expect(screen.getByText("Calendar View")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<CalendarView />);
    const el = screen.getByTestId("CalendarView");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<CalendarView />);
    const el = screen.getByTestId("CalendarView");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<CalendarView id="custom-id" />);
    const el = screen.getByTestId("CalendarView");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<CalendarView testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<CalendarView aria-label="Accessible name" />);
    const el = screen.getByTestId("CalendarView");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<CalendarView variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<CalendarView size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<CalendarView ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
