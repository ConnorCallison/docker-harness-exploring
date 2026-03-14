import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Strong } from "~/components/ui/Strong";

describe("Strong", () => {
  it("renders without crashing", () => {
    render(<Strong />);
    expect(screen.getByTestId("Strong")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Strong className="custom-class" />);
    const el = screen.getByTestId("Strong");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Strong><span data-testid="child">Hello</span></Strong>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Strong variant="primary" />);
    const el = screen.getByTestId("Strong");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Strong size="lg" />);
    const el = screen.getByTestId("Strong");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Strong disabled />);
    const el = screen.getByTestId("Strong");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Strong loading />);
    const el = screen.getByTestId("Strong");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Strong onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Strong"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Strong disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Strong"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Strong loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Strong"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Strong onClick={onClick} />);
    const el = screen.getByTestId("Strong");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Strong />);
    expect(screen.getByText("Strong")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Strong />);
    const el = screen.getByTestId("Strong");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Strong />);
    const el = screen.getByTestId("Strong");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Strong id="custom-id" />);
    const el = screen.getByTestId("Strong");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Strong testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Strong aria-label="Accessible name" />);
    const el = screen.getByTestId("Strong");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Strong variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Strong size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Strong ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
