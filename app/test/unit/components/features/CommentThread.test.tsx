import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommentThread } from "~/components/features/CommentThread";

describe("CommentThread", () => {
  it("renders without crashing", () => {
    render(<CommentThread />);
    expect(screen.getByTestId("CommentThread")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<CommentThread className="custom-class" />);
    const el = screen.getByTestId("CommentThread");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<CommentThread><span data-testid="child">Hello</span></CommentThread>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<CommentThread variant="primary" />);
    const el = screen.getByTestId("CommentThread");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<CommentThread size="lg" />);
    const el = screen.getByTestId("CommentThread");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<CommentThread disabled />);
    const el = screen.getByTestId("CommentThread");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<CommentThread loading />);
    const el = screen.getByTestId("CommentThread");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<CommentThread onClick={onClick} />);
    await userEvent.click(screen.getByTestId("CommentThread"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<CommentThread disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("CommentThread"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<CommentThread loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("CommentThread"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<CommentThread onClick={onClick} />);
    const el = screen.getByTestId("CommentThread");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<CommentThread />);
    expect(screen.getByText("Comment Thread")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<CommentThread />);
    const el = screen.getByTestId("CommentThread");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<CommentThread />);
    const el = screen.getByTestId("CommentThread");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<CommentThread id="custom-id" />);
    const el = screen.getByTestId("CommentThread");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<CommentThread testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<CommentThread aria-label="Accessible name" />);
    const el = screen.getByTestId("CommentThread");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<CommentThread variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<CommentThread size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<CommentThread ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
