import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { JsonInput } from "~/components/ui/JsonInput";

describe("JsonInput", () => {
  it("renders without crashing", () => {
    render(<JsonInput />);
    expect(screen.getByTestId("JsonInput")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<JsonInput className="custom-class" />);
    const el = screen.getByTestId("JsonInput");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<JsonInput><span data-testid="child">Hello</span></JsonInput>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<JsonInput variant="primary" />);
    const el = screen.getByTestId("JsonInput");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<JsonInput size="lg" />);
    const el = screen.getByTestId("JsonInput");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<JsonInput disabled />);
    const el = screen.getByTestId("JsonInput");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<JsonInput loading />);
    const el = screen.getByTestId("JsonInput");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<JsonInput onClick={onClick} />);
    await userEvent.click(screen.getByTestId("JsonInput"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<JsonInput disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("JsonInput"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<JsonInput loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("JsonInput"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<JsonInput onClick={onClick} />);
    const el = screen.getByTestId("JsonInput");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<JsonInput />);
    expect(screen.getByText("Json Input")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<JsonInput />);
    const el = screen.getByTestId("JsonInput");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<JsonInput />);
    const el = screen.getByTestId("JsonInput");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<JsonInput id="custom-id" />);
    const el = screen.getByTestId("JsonInput");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<JsonInput testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<JsonInput aria-label="Accessible name" />);
    const el = screen.getByTestId("JsonInput");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<JsonInput variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<JsonInput size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<JsonInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
