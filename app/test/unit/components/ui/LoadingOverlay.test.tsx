import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoadingOverlay } from "~/components/ui/LoadingOverlay";

describe("LoadingOverlay", () => {
  it("renders without crashing", () => {
    render(<LoadingOverlay />);
    expect(screen.getByTestId("LoadingOverlay")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<LoadingOverlay className="custom-class" />);
    const el = screen.getByTestId("LoadingOverlay");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<LoadingOverlay><span data-testid="child">Hello</span></LoadingOverlay>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<LoadingOverlay variant="primary" />);
    const el = screen.getByTestId("LoadingOverlay");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<LoadingOverlay size="lg" />);
    const el = screen.getByTestId("LoadingOverlay");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<LoadingOverlay disabled />);
    const el = screen.getByTestId("LoadingOverlay");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<LoadingOverlay loading />);
    const el = screen.getByTestId("LoadingOverlay");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<LoadingOverlay onClick={onClick} />);
    await userEvent.click(screen.getByTestId("LoadingOverlay"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<LoadingOverlay disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("LoadingOverlay"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<LoadingOverlay loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("LoadingOverlay"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<LoadingOverlay onClick={onClick} />);
    const el = screen.getByTestId("LoadingOverlay");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<LoadingOverlay />);
    expect(screen.getByText("Loading Overlay")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<LoadingOverlay />);
    const el = screen.getByTestId("LoadingOverlay");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<LoadingOverlay />);
    const el = screen.getByTestId("LoadingOverlay");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<LoadingOverlay id="custom-id" />);
    const el = screen.getByTestId("LoadingOverlay");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<LoadingOverlay testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<LoadingOverlay aria-label="Accessible name" />);
    const el = screen.getByTestId("LoadingOverlay");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<LoadingOverlay variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<LoadingOverlay size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<LoadingOverlay ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
