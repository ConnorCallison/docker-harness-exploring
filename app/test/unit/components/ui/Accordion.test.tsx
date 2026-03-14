import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "~/components/ui/Accordion";

describe("Accordion", () => {
  it("renders without crashing", () => {
    render(<Accordion />);
    expect(screen.getByTestId("Accordion")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Accordion className="custom-class" />);
    const el = screen.getByTestId("Accordion");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Accordion><span data-testid="child">Hello</span></Accordion>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Accordion variant="primary" />);
    const el = screen.getByTestId("Accordion");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Accordion size="lg" />);
    const el = screen.getByTestId("Accordion");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Accordion disabled />);
    const el = screen.getByTestId("Accordion");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Accordion loading />);
    const el = screen.getByTestId("Accordion");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Accordion onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Accordion"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Accordion disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Accordion"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Accordion loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Accordion"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Accordion onClick={onClick} />);
    const el = screen.getByTestId("Accordion");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Accordion />);
    expect(screen.getByText("Accordion")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Accordion />);
    const el = screen.getByTestId("Accordion");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Accordion />);
    const el = screen.getByTestId("Accordion");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Accordion id="custom-id" />);
    const el = screen.getByTestId("Accordion");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Accordion testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Accordion aria-label="Accessible name" />);
    const el = screen.getByTestId("Accordion");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Accordion variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Accordion size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Accordion ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
