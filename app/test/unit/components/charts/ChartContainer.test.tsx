import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChartContainer } from "~/components/charts/ChartContainer";

describe("ChartContainer", () => {
  it("renders without crashing", () => {
    render(<ChartContainer />);
    expect(screen.getByTestId("ChartContainer")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ChartContainer className="custom-class" />);
    const el = screen.getByTestId("ChartContainer");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ChartContainer><span data-testid="child">Hello</span></ChartContainer>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ChartContainer variant="primary" />);
    const el = screen.getByTestId("ChartContainer");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ChartContainer size="lg" />);
    const el = screen.getByTestId("ChartContainer");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ChartContainer disabled />);
    const el = screen.getByTestId("ChartContainer");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ChartContainer loading />);
    const el = screen.getByTestId("ChartContainer");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ChartContainer onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ChartContainer"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ChartContainer disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ChartContainer"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ChartContainer loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ChartContainer"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ChartContainer onClick={onClick} />);
    const el = screen.getByTestId("ChartContainer");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ChartContainer />);
    expect(screen.getByText("Chart Container")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ChartContainer />);
    const el = screen.getByTestId("ChartContainer");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ChartContainer />);
    const el = screen.getByTestId("ChartContainer");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ChartContainer id="custom-id" />);
    const el = screen.getByTestId("ChartContainer");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ChartContainer testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ChartContainer aria-label="Accessible name" />);
    const el = screen.getByTestId("ChartContainer");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ChartContainer variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ChartContainer size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ChartContainer ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
