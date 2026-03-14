import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "~/components/ui/Textarea";

describe("Textarea", () => {
  it("renders without crashing", () => {
    render(<Textarea />);
    expect(screen.getByTestId("Textarea")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Textarea className="custom-class" />);
    const el = screen.getByTestId("Textarea");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Textarea><span data-testid="child">Hello</span></Textarea>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Textarea variant="primary" />);
    const el = screen.getByTestId("Textarea");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Textarea size="lg" />);
    const el = screen.getByTestId("Textarea");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Textarea disabled />);
    const el = screen.getByTestId("Textarea");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Textarea loading />);
    const el = screen.getByTestId("Textarea");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Textarea onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Textarea"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Textarea disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Textarea"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Textarea loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Textarea"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Textarea onClick={onClick} />);
    const el = screen.getByTestId("Textarea");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Textarea />);
    expect(screen.getByText("Textarea")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Textarea />);
    const el = screen.getByTestId("Textarea");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Textarea />);
    const el = screen.getByTestId("Textarea");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Textarea id="custom-id" />);
    const el = screen.getByTestId("Textarea");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Textarea testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Textarea aria-label="Accessible name" />);
    const el = screen.getByTestId("Textarea");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Textarea variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Textarea size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
