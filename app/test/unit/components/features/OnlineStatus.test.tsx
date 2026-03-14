import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OnlineStatus } from "~/components/features/OnlineStatus";

describe("OnlineStatus", () => {
  it("renders without crashing", () => {
    render(<OnlineStatus />);
    expect(screen.getByTestId("OnlineStatus")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<OnlineStatus className="custom-class" />);
    const el = screen.getByTestId("OnlineStatus");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<OnlineStatus><span data-testid="child">Hello</span></OnlineStatus>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<OnlineStatus variant="primary" />);
    const el = screen.getByTestId("OnlineStatus");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<OnlineStatus size="lg" />);
    const el = screen.getByTestId("OnlineStatus");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<OnlineStatus disabled />);
    const el = screen.getByTestId("OnlineStatus");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<OnlineStatus loading />);
    const el = screen.getByTestId("OnlineStatus");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<OnlineStatus onClick={onClick} />);
    await userEvent.click(screen.getByTestId("OnlineStatus"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<OnlineStatus disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("OnlineStatus"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<OnlineStatus loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("OnlineStatus"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<OnlineStatus onClick={onClick} />);
    const el = screen.getByTestId("OnlineStatus");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<OnlineStatus />);
    expect(screen.getByText("Online Status")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<OnlineStatus />);
    const el = screen.getByTestId("OnlineStatus");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<OnlineStatus />);
    const el = screen.getByTestId("OnlineStatus");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<OnlineStatus id="custom-id" />);
    const el = screen.getByTestId("OnlineStatus");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<OnlineStatus testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<OnlineStatus aria-label="Accessible name" />);
    const el = screen.getByTestId("OnlineStatus");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<OnlineStatus variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<OnlineStatus size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<OnlineStatus ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
