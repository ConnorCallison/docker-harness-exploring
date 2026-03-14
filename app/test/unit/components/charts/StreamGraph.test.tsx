import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StreamGraph } from "~/components/charts/StreamGraph";

describe("StreamGraph", () => {
  it("renders without crashing", () => {
    render(<StreamGraph />);
    expect(screen.getByTestId("StreamGraph")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<StreamGraph className="custom-class" />);
    const el = screen.getByTestId("StreamGraph");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<StreamGraph><span data-testid="child">Hello</span></StreamGraph>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<StreamGraph variant="primary" />);
    const el = screen.getByTestId("StreamGraph");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<StreamGraph size="lg" />);
    const el = screen.getByTestId("StreamGraph");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<StreamGraph disabled />);
    const el = screen.getByTestId("StreamGraph");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<StreamGraph loading />);
    const el = screen.getByTestId("StreamGraph");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<StreamGraph onClick={onClick} />);
    await userEvent.click(screen.getByTestId("StreamGraph"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<StreamGraph disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("StreamGraph"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<StreamGraph loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("StreamGraph"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<StreamGraph onClick={onClick} />);
    const el = screen.getByTestId("StreamGraph");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<StreamGraph />);
    expect(screen.getByText("Stream Graph")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<StreamGraph />);
    const el = screen.getByTestId("StreamGraph");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<StreamGraph />);
    const el = screen.getByTestId("StreamGraph");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<StreamGraph id="custom-id" />);
    const el = screen.getByTestId("StreamGraph");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<StreamGraph testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<StreamGraph aria-label="Accessible name" />);
    const el = screen.getByTestId("StreamGraph");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<StreamGraph variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<StreamGraph size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<StreamGraph ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
