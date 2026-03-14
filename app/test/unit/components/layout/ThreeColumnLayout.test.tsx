import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThreeColumnLayout } from "~/components/layout/ThreeColumnLayout";

describe("ThreeColumnLayout", () => {
  it("renders without crashing", () => {
    render(<ThreeColumnLayout />);
    expect(screen.getByTestId("ThreeColumnLayout")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ThreeColumnLayout className="custom-class" />);
    const el = screen.getByTestId("ThreeColumnLayout");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ThreeColumnLayout><span data-testid="child">Hello</span></ThreeColumnLayout>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ThreeColumnLayout variant="primary" />);
    const el = screen.getByTestId("ThreeColumnLayout");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ThreeColumnLayout size="lg" />);
    const el = screen.getByTestId("ThreeColumnLayout");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ThreeColumnLayout disabled />);
    const el = screen.getByTestId("ThreeColumnLayout");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ThreeColumnLayout loading />);
    const el = screen.getByTestId("ThreeColumnLayout");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ThreeColumnLayout onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ThreeColumnLayout"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ThreeColumnLayout disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ThreeColumnLayout"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ThreeColumnLayout loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ThreeColumnLayout"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ThreeColumnLayout onClick={onClick} />);
    const el = screen.getByTestId("ThreeColumnLayout");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ThreeColumnLayout />);
    expect(screen.getByText("Three Column Layout")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ThreeColumnLayout />);
    const el = screen.getByTestId("ThreeColumnLayout");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ThreeColumnLayout />);
    const el = screen.getByTestId("ThreeColumnLayout");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ThreeColumnLayout id="custom-id" />);
    const el = screen.getByTestId("ThreeColumnLayout");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ThreeColumnLayout testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ThreeColumnLayout aria-label="Accessible name" />);
    const el = screen.getByTestId("ThreeColumnLayout");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ThreeColumnLayout variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ThreeColumnLayout size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ThreeColumnLayout ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
