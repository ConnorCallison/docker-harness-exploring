import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChordDiagram } from "~/components/charts/ChordDiagram";

describe("ChordDiagram", () => {
  it("renders without crashing", () => {
    render(<ChordDiagram />);
    expect(screen.getByTestId("ChordDiagram")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ChordDiagram className="custom-class" />);
    const el = screen.getByTestId("ChordDiagram");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ChordDiagram><span data-testid="child">Hello</span></ChordDiagram>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ChordDiagram variant="primary" />);
    const el = screen.getByTestId("ChordDiagram");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ChordDiagram size="lg" />);
    const el = screen.getByTestId("ChordDiagram");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ChordDiagram disabled />);
    const el = screen.getByTestId("ChordDiagram");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ChordDiagram loading />);
    const el = screen.getByTestId("ChordDiagram");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ChordDiagram onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ChordDiagram"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ChordDiagram disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ChordDiagram"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ChordDiagram loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ChordDiagram"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ChordDiagram onClick={onClick} />);
    const el = screen.getByTestId("ChordDiagram");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ChordDiagram />);
    expect(screen.getByText("Chord Diagram")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ChordDiagram />);
    const el = screen.getByTestId("ChordDiagram");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ChordDiagram />);
    const el = screen.getByTestId("ChordDiagram");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ChordDiagram id="custom-id" />);
    const el = screen.getByTestId("ChordDiagram");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ChordDiagram testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ChordDiagram aria-label="Accessible name" />);
    const el = screen.getByTestId("ChordDiagram");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ChordDiagram variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ChordDiagram size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ChordDiagram ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
