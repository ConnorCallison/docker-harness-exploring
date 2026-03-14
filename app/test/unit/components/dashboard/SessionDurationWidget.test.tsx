import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SessionDurationWidget } from "~/components/dashboard/SessionDurationWidget";

describe("SessionDurationWidget", () => {
  it("renders without crashing", () => {
    render(<SessionDurationWidget />);
    expect(screen.getByTestId("SessionDurationWidget")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<SessionDurationWidget className="custom-class" />);
    const el = screen.getByTestId("SessionDurationWidget");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<SessionDurationWidget><span data-testid="child">Hello</span></SessionDurationWidget>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<SessionDurationWidget variant="primary" />);
    const el = screen.getByTestId("SessionDurationWidget");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<SessionDurationWidget size="lg" />);
    const el = screen.getByTestId("SessionDurationWidget");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<SessionDurationWidget disabled />);
    const el = screen.getByTestId("SessionDurationWidget");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<SessionDurationWidget loading />);
    const el = screen.getByTestId("SessionDurationWidget");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<SessionDurationWidget onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SessionDurationWidget"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<SessionDurationWidget disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SessionDurationWidget"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<SessionDurationWidget loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SessionDurationWidget"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<SessionDurationWidget onClick={onClick} />);
    const el = screen.getByTestId("SessionDurationWidget");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<SessionDurationWidget />);
    expect(screen.getByText("Session Duration Widget")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<SessionDurationWidget />);
    const el = screen.getByTestId("SessionDurationWidget");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<SessionDurationWidget />);
    const el = screen.getByTestId("SessionDurationWidget");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<SessionDurationWidget id="custom-id" />);
    const el = screen.getByTestId("SessionDurationWidget");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<SessionDurationWidget testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<SessionDurationWidget aria-label="Accessible name" />);
    const el = screen.getByTestId("SessionDurationWidget");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<SessionDurationWidget variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<SessionDurationWidget size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<SessionDurationWidget ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
