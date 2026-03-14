import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LiveChat } from "~/components/features/LiveChat";

describe("LiveChat", () => {
  it("renders without crashing", () => {
    render(<LiveChat />);
    expect(screen.getByTestId("LiveChat")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<LiveChat className="custom-class" />);
    const el = screen.getByTestId("LiveChat");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<LiveChat><span data-testid="child">Hello</span></LiveChat>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<LiveChat variant="primary" />);
    const el = screen.getByTestId("LiveChat");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<LiveChat size="lg" />);
    const el = screen.getByTestId("LiveChat");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<LiveChat disabled />);
    const el = screen.getByTestId("LiveChat");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<LiveChat loading />);
    const el = screen.getByTestId("LiveChat");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<LiveChat onClick={onClick} />);
    await userEvent.click(screen.getByTestId("LiveChat"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<LiveChat disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("LiveChat"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<LiveChat loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("LiveChat"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<LiveChat onClick={onClick} />);
    const el = screen.getByTestId("LiveChat");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<LiveChat />);
    expect(screen.getByText("Live Chat")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<LiveChat />);
    const el = screen.getByTestId("LiveChat");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<LiveChat />);
    const el = screen.getByTestId("LiveChat");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<LiveChat id="custom-id" />);
    const el = screen.getByTestId("LiveChat");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<LiveChat testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<LiveChat aria-label="Accessible name" />);
    const el = screen.getByTestId("LiveChat");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<LiveChat variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<LiveChat size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<LiveChat ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
