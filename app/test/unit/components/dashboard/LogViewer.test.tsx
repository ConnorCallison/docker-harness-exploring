import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LogViewer } from "~/components/dashboard/LogViewer";

describe("LogViewer", () => {
  it("renders without crashing", () => {
    render(<LogViewer />);
    expect(screen.getByTestId("LogViewer")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<LogViewer className="custom-class" />);
    const el = screen.getByTestId("LogViewer");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<LogViewer><span data-testid="child">Hello</span></LogViewer>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<LogViewer variant="primary" />);
    const el = screen.getByTestId("LogViewer");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<LogViewer size="lg" />);
    const el = screen.getByTestId("LogViewer");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<LogViewer disabled />);
    const el = screen.getByTestId("LogViewer");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<LogViewer loading />);
    const el = screen.getByTestId("LogViewer");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<LogViewer onClick={onClick} />);
    await userEvent.click(screen.getByTestId("LogViewer"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<LogViewer disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("LogViewer"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<LogViewer loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("LogViewer"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<LogViewer onClick={onClick} />);
    const el = screen.getByTestId("LogViewer");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<LogViewer />);
    expect(screen.getByText("Log Viewer")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<LogViewer />);
    const el = screen.getByTestId("LogViewer");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<LogViewer />);
    const el = screen.getByTestId("LogViewer");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<LogViewer id="custom-id" />);
    const el = screen.getByTestId("LogViewer");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<LogViewer testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<LogViewer aria-label="Accessible name" />);
    const el = screen.getByTestId("LogViewer");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<LogViewer variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<LogViewer size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<LogViewer ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
