import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Code } from "~/components/ui/Code";

describe("Code", () => {
  it("renders without crashing", () => {
    render(<Code />);
    expect(screen.getByTestId("Code")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Code className="custom-class" />);
    const el = screen.getByTestId("Code");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Code><span data-testid="child">Hello</span></Code>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Code variant="primary" />);
    const el = screen.getByTestId("Code");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Code size="lg" />);
    const el = screen.getByTestId("Code");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Code disabled />);
    const el = screen.getByTestId("Code");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Code loading />);
    const el = screen.getByTestId("Code");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Code onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Code"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Code disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Code"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Code loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Code"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Code onClick={onClick} />);
    const el = screen.getByTestId("Code");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Code />);
    expect(screen.getByText("Code")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Code />);
    const el = screen.getByTestId("Code");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Code />);
    const el = screen.getByTestId("Code");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Code id="custom-id" />);
    const el = screen.getByTestId("Code");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Code testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Code aria-label="Accessible name" />);
    const el = screen.getByTestId("Code");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Code variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Code size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Code ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
