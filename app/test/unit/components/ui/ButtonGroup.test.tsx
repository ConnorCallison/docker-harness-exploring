import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ButtonGroup } from "~/components/ui/ButtonGroup";

describe("ButtonGroup", () => {
  it("renders without crashing", () => {
    render(<ButtonGroup />);
    expect(screen.getByTestId("ButtonGroup")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ButtonGroup className="custom-class" />);
    const el = screen.getByTestId("ButtonGroup");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ButtonGroup><span data-testid="child">Hello</span></ButtonGroup>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ButtonGroup variant="primary" />);
    const el = screen.getByTestId("ButtonGroup");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ButtonGroup size="lg" />);
    const el = screen.getByTestId("ButtonGroup");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ButtonGroup disabled />);
    const el = screen.getByTestId("ButtonGroup");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ButtonGroup loading />);
    const el = screen.getByTestId("ButtonGroup");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ButtonGroup onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ButtonGroup"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ButtonGroup disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ButtonGroup"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ButtonGroup loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ButtonGroup"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ButtonGroup onClick={onClick} />);
    const el = screen.getByTestId("ButtonGroup");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ButtonGroup />);
    expect(screen.getByText("Button Group")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ButtonGroup />);
    const el = screen.getByTestId("ButtonGroup");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ButtonGroup />);
    const el = screen.getByTestId("ButtonGroup");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ButtonGroup id="custom-id" />);
    const el = screen.getByTestId("ButtonGroup");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ButtonGroup testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ButtonGroup aria-label="Accessible name" />);
    const el = screen.getByTestId("ButtonGroup");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ButtonGroup variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ButtonGroup size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ButtonGroup ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
