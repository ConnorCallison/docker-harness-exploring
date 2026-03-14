import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TagCloud } from "~/components/data/TagCloud";

describe("TagCloud", () => {
  it("renders without crashing", () => {
    render(<TagCloud />);
    expect(screen.getByTestId("TagCloud")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<TagCloud className="custom-class" />);
    const el = screen.getByTestId("TagCloud");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<TagCloud><span data-testid="child">Hello</span></TagCloud>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<TagCloud variant="primary" />);
    const el = screen.getByTestId("TagCloud");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<TagCloud size="lg" />);
    const el = screen.getByTestId("TagCloud");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<TagCloud disabled />);
    const el = screen.getByTestId("TagCloud");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<TagCloud loading />);
    const el = screen.getByTestId("TagCloud");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<TagCloud onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TagCloud"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<TagCloud disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TagCloud"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<TagCloud loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TagCloud"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<TagCloud onClick={onClick} />);
    const el = screen.getByTestId("TagCloud");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<TagCloud />);
    expect(screen.getByText("Tag Cloud")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<TagCloud />);
    const el = screen.getByTestId("TagCloud");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<TagCloud />);
    const el = screen.getByTestId("TagCloud");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<TagCloud id="custom-id" />);
    const el = screen.getByTestId("TagCloud");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<TagCloud testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<TagCloud aria-label="Accessible name" />);
    const el = screen.getByTestId("TagCloud");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<TagCloud variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<TagCloud size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<TagCloud ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
