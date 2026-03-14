import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TwoColumnLayout } from "~/components/layout/TwoColumnLayout";

describe("TwoColumnLayout", () => {
  it("renders without crashing", () => {
    render(<TwoColumnLayout />);
    expect(screen.getByTestId("TwoColumnLayout")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<TwoColumnLayout className="custom-class" />);
    const el = screen.getByTestId("TwoColumnLayout");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<TwoColumnLayout><span data-testid="child">Hello</span></TwoColumnLayout>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<TwoColumnLayout variant="primary" />);
    const el = screen.getByTestId("TwoColumnLayout");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<TwoColumnLayout size="lg" />);
    const el = screen.getByTestId("TwoColumnLayout");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<TwoColumnLayout disabled />);
    const el = screen.getByTestId("TwoColumnLayout");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<TwoColumnLayout loading />);
    const el = screen.getByTestId("TwoColumnLayout");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<TwoColumnLayout onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TwoColumnLayout"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<TwoColumnLayout disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TwoColumnLayout"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<TwoColumnLayout loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TwoColumnLayout"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<TwoColumnLayout onClick={onClick} />);
    const el = screen.getByTestId("TwoColumnLayout");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<TwoColumnLayout />);
    expect(screen.getByText("Two Column Layout")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<TwoColumnLayout />);
    const el = screen.getByTestId("TwoColumnLayout");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<TwoColumnLayout />);
    const el = screen.getByTestId("TwoColumnLayout");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<TwoColumnLayout id="custom-id" />);
    const el = screen.getByTestId("TwoColumnLayout");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<TwoColumnLayout testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<TwoColumnLayout aria-label="Accessible name" />);
    const el = screen.getByTestId("TwoColumnLayout");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<TwoColumnLayout variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<TwoColumnLayout size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<TwoColumnLayout ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
