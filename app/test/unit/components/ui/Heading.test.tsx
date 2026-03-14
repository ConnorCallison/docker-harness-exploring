import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Heading } from "~/components/ui/Heading";

describe("Heading", () => {
  it("renders without crashing", () => {
    render(<Heading />);
    expect(screen.getByTestId("Heading")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Heading className="custom-class" />);
    const el = screen.getByTestId("Heading");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Heading><span data-testid="child">Hello</span></Heading>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Heading variant="primary" />);
    const el = screen.getByTestId("Heading");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Heading size="lg" />);
    const el = screen.getByTestId("Heading");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Heading disabled />);
    const el = screen.getByTestId("Heading");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Heading loading />);
    const el = screen.getByTestId("Heading");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Heading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Heading"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Heading disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Heading"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Heading loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Heading"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Heading onClick={onClick} />);
    const el = screen.getByTestId("Heading");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Heading />);
    expect(screen.getByText("Heading")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Heading />);
    const el = screen.getByTestId("Heading");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Heading />);
    const el = screen.getByTestId("Heading");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Heading id="custom-id" />);
    const el = screen.getByTestId("Heading");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Heading testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Heading aria-label="Accessible name" />);
    const el = screen.getByTestId("Heading");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Heading variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Heading size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Heading ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
