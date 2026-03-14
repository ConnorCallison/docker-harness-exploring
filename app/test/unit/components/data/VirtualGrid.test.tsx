import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VirtualGrid } from "~/components/data/VirtualGrid";

describe("VirtualGrid", () => {
  it("renders without crashing", () => {
    render(<VirtualGrid />);
    expect(screen.getByTestId("VirtualGrid")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<VirtualGrid className="custom-class" />);
    const el = screen.getByTestId("VirtualGrid");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<VirtualGrid><span data-testid="child">Hello</span></VirtualGrid>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<VirtualGrid variant="primary" />);
    const el = screen.getByTestId("VirtualGrid");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<VirtualGrid size="lg" />);
    const el = screen.getByTestId("VirtualGrid");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<VirtualGrid disabled />);
    const el = screen.getByTestId("VirtualGrid");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<VirtualGrid loading />);
    const el = screen.getByTestId("VirtualGrid");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<VirtualGrid onClick={onClick} />);
    await userEvent.click(screen.getByTestId("VirtualGrid"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<VirtualGrid disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("VirtualGrid"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<VirtualGrid loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("VirtualGrid"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<VirtualGrid onClick={onClick} />);
    const el = screen.getByTestId("VirtualGrid");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<VirtualGrid />);
    expect(screen.getByText("Virtual Grid")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<VirtualGrid />);
    const el = screen.getByTestId("VirtualGrid");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<VirtualGrid />);
    const el = screen.getByTestId("VirtualGrid");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<VirtualGrid id="custom-id" />);
    const el = screen.getByTestId("VirtualGrid");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<VirtualGrid testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<VirtualGrid aria-label="Accessible name" />);
    const el = screen.getByTestId("VirtualGrid");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<VirtualGrid variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<VirtualGrid size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<VirtualGrid ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
