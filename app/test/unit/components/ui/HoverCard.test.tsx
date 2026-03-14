import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HoverCard } from "~/components/ui/HoverCard";

describe("HoverCard", () => {
  it("renders without crashing", () => {
    render(<HoverCard />);
    expect(screen.getByTestId("HoverCard")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<HoverCard className="custom-class" />);
    const el = screen.getByTestId("HoverCard");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<HoverCard><span data-testid="child">Hello</span></HoverCard>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<HoverCard variant="primary" />);
    const el = screen.getByTestId("HoverCard");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<HoverCard size="lg" />);
    const el = screen.getByTestId("HoverCard");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<HoverCard disabled />);
    const el = screen.getByTestId("HoverCard");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<HoverCard loading />);
    const el = screen.getByTestId("HoverCard");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<HoverCard onClick={onClick} />);
    await userEvent.click(screen.getByTestId("HoverCard"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<HoverCard disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("HoverCard"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<HoverCard loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("HoverCard"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<HoverCard onClick={onClick} />);
    const el = screen.getByTestId("HoverCard");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<HoverCard />);
    expect(screen.getByText("Hover Card")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<HoverCard />);
    const el = screen.getByTestId("HoverCard");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<HoverCard />);
    const el = screen.getByTestId("HoverCard");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<HoverCard id="custom-id" />);
    const el = screen.getByTestId("HoverCard");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<HoverCard testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<HoverCard aria-label="Accessible name" />);
    const el = screen.getByTestId("HoverCard");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<HoverCard variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<HoverCard size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<HoverCard ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
