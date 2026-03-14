import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorRateWidget } from "~/components/dashboard/ErrorRateWidget";

describe("ErrorRateWidget", () => {
  it("renders without crashing", () => {
    render(<ErrorRateWidget />);
    expect(screen.getByTestId("ErrorRateWidget")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ErrorRateWidget className="custom-class" />);
    const el = screen.getByTestId("ErrorRateWidget");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ErrorRateWidget><span data-testid="child">Hello</span></ErrorRateWidget>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ErrorRateWidget variant="primary" />);
    const el = screen.getByTestId("ErrorRateWidget");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ErrorRateWidget size="lg" />);
    const el = screen.getByTestId("ErrorRateWidget");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ErrorRateWidget disabled />);
    const el = screen.getByTestId("ErrorRateWidget");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ErrorRateWidget loading />);
    const el = screen.getByTestId("ErrorRateWidget");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ErrorRateWidget onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ErrorRateWidget"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ErrorRateWidget disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ErrorRateWidget"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ErrorRateWidget loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ErrorRateWidget"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ErrorRateWidget onClick={onClick} />);
    const el = screen.getByTestId("ErrorRateWidget");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ErrorRateWidget />);
    expect(screen.getByText("Error Rate Widget")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ErrorRateWidget />);
    const el = screen.getByTestId("ErrorRateWidget");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ErrorRateWidget />);
    const el = screen.getByTestId("ErrorRateWidget");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ErrorRateWidget id="custom-id" />);
    const el = screen.getByTestId("ErrorRateWidget");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ErrorRateWidget testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ErrorRateWidget aria-label="Accessible name" />);
    const el = screen.getByTestId("ErrorRateWidget");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ErrorRateWidget variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ErrorRateWidget size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ErrorRateWidget ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
