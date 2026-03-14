import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ServiceMap } from "~/components/dashboard/ServiceMap";

describe("ServiceMap", () => {
  it("renders without crashing", () => {
    render(<ServiceMap />);
    expect(screen.getByTestId("ServiceMap")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ServiceMap className="custom-class" />);
    const el = screen.getByTestId("ServiceMap");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ServiceMap><span data-testid="child">Hello</span></ServiceMap>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ServiceMap variant="primary" />);
    const el = screen.getByTestId("ServiceMap");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ServiceMap size="lg" />);
    const el = screen.getByTestId("ServiceMap");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ServiceMap disabled />);
    const el = screen.getByTestId("ServiceMap");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ServiceMap loading />);
    const el = screen.getByTestId("ServiceMap");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ServiceMap onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ServiceMap"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ServiceMap disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ServiceMap"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ServiceMap loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ServiceMap"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ServiceMap onClick={onClick} />);
    const el = screen.getByTestId("ServiceMap");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ServiceMap />);
    expect(screen.getByText("Service Map")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ServiceMap />);
    const el = screen.getByTestId("ServiceMap");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ServiceMap />);
    const el = screen.getByTestId("ServiceMap");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ServiceMap id="custom-id" />);
    const el = screen.getByTestId("ServiceMap");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ServiceMap testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ServiceMap aria-label="Accessible name" />);
    const el = screen.getByTestId("ServiceMap");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ServiceMap variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ServiceMap size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ServiceMap ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
