import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Breadcrumb } from "~/components/ui/Breadcrumb";

describe("Breadcrumb", () => {
  it("renders without crashing", () => {
    render(<Breadcrumb />);
    expect(screen.getByTestId("Breadcrumb")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Breadcrumb className="custom-class" />);
    const el = screen.getByTestId("Breadcrumb");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Breadcrumb><span data-testid="child">Hello</span></Breadcrumb>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Breadcrumb variant="primary" />);
    const el = screen.getByTestId("Breadcrumb");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Breadcrumb size="lg" />);
    const el = screen.getByTestId("Breadcrumb");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Breadcrumb disabled />);
    const el = screen.getByTestId("Breadcrumb");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Breadcrumb loading />);
    const el = screen.getByTestId("Breadcrumb");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Breadcrumb onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Breadcrumb"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Breadcrumb disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Breadcrumb"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Breadcrumb loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Breadcrumb"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Breadcrumb onClick={onClick} />);
    const el = screen.getByTestId("Breadcrumb");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Breadcrumb />);
    expect(screen.getByText("Breadcrumb")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Breadcrumb />);
    const el = screen.getByTestId("Breadcrumb");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Breadcrumb />);
    const el = screen.getByTestId("Breadcrumb");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Breadcrumb id="custom-id" />);
    const el = screen.getByTestId("Breadcrumb");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Breadcrumb testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Breadcrumb aria-label="Accessible name" />);
    const el = screen.getByTestId("Breadcrumb");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Breadcrumb variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Breadcrumb size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Breadcrumb ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
