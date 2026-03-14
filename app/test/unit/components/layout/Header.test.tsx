import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "~/components/layout/Header";

describe("Header", () => {
  it("renders without crashing", () => {
    render(<Header />);
    expect(screen.getByTestId("Header")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Header className="custom-class" />);
    const el = screen.getByTestId("Header");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Header><span data-testid="child">Hello</span></Header>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Header variant="primary" />);
    const el = screen.getByTestId("Header");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Header size="lg" />);
    const el = screen.getByTestId("Header");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Header disabled />);
    const el = screen.getByTestId("Header");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Header loading />);
    const el = screen.getByTestId("Header");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Header onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Header"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Header disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Header"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Header loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Header"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Header onClick={onClick} />);
    const el = screen.getByTestId("Header");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Header />);
    expect(screen.getByText("Header")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Header />);
    const el = screen.getByTestId("Header");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Header />);
    const el = screen.getByTestId("Header");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Header id="custom-id" />);
    const el = screen.getByTestId("Header");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Header testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Header aria-label="Accessible name" />);
    const el = screen.getByTestId("Header");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Header variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Header size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Header ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
