import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VideoPlayer } from "~/components/features/VideoPlayer";

describe("VideoPlayer", () => {
  it("renders without crashing", () => {
    render(<VideoPlayer />);
    expect(screen.getByTestId("VideoPlayer")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<VideoPlayer className="custom-class" />);
    const el = screen.getByTestId("VideoPlayer");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<VideoPlayer><span data-testid="child">Hello</span></VideoPlayer>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<VideoPlayer variant="primary" />);
    const el = screen.getByTestId("VideoPlayer");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<VideoPlayer size="lg" />);
    const el = screen.getByTestId("VideoPlayer");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<VideoPlayer disabled />);
    const el = screen.getByTestId("VideoPlayer");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<VideoPlayer loading />);
    const el = screen.getByTestId("VideoPlayer");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<VideoPlayer onClick={onClick} />);
    await userEvent.click(screen.getByTestId("VideoPlayer"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<VideoPlayer disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("VideoPlayer"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<VideoPlayer loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("VideoPlayer"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<VideoPlayer onClick={onClick} />);
    const el = screen.getByTestId("VideoPlayer");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<VideoPlayer />);
    expect(screen.getByText("Video Player")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<VideoPlayer />);
    const el = screen.getByTestId("VideoPlayer");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<VideoPlayer />);
    const el = screen.getByTestId("VideoPlayer");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<VideoPlayer id="custom-id" />);
    const el = screen.getByTestId("VideoPlayer");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<VideoPlayer testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<VideoPlayer aria-label="Accessible name" />);
    const el = screen.getByTestId("VideoPlayer");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<VideoPlayer variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<VideoPlayer size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<VideoPlayer ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
