import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ForceGraph } from "~/components/charts/ForceGraph";

describe("ForceGraph", () => {
  it("renders without crashing", () => {
    render(<ForceGraph />);
    expect(screen.getByTestId("ForceGraph")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ForceGraph className="custom-class" />);
    const el = screen.getByTestId("ForceGraph");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ForceGraph><span data-testid="child">Hello</span></ForceGraph>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ForceGraph variant="primary" />);
    const el = screen.getByTestId("ForceGraph");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ForceGraph size="lg" />);
    const el = screen.getByTestId("ForceGraph");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ForceGraph disabled />);
    const el = screen.getByTestId("ForceGraph");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ForceGraph loading />);
    const el = screen.getByTestId("ForceGraph");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ForceGraph onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ForceGraph"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ForceGraph disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ForceGraph"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ForceGraph loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ForceGraph"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ForceGraph onClick={onClick} />);
    const el = screen.getByTestId("ForceGraph");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ForceGraph />);
    expect(screen.getByText("Force Graph")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ForceGraph />);
    const el = screen.getByTestId("ForceGraph");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ForceGraph />);
    const el = screen.getByTestId("ForceGraph");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ForceGraph id="custom-id" />);
    const el = screen.getByTestId("ForceGraph");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ForceGraph testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ForceGraph aria-label="Accessible name" />);
    const el = screen.getByTestId("ForceGraph");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ForceGraph variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ForceGraph size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ForceGraph ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
