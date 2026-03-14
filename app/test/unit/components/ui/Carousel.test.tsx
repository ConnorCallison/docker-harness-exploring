import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Carousel } from "~/components/ui/Carousel";

describe("Carousel", () => {
  it("renders without crashing", () => {
    render(<Carousel />);
    expect(screen.getByTestId("Carousel")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Carousel className="custom-class" />);
    const el = screen.getByTestId("Carousel");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Carousel><span data-testid="child">Hello</span></Carousel>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Carousel variant="primary" />);
    const el = screen.getByTestId("Carousel");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Carousel size="lg" />);
    const el = screen.getByTestId("Carousel");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Carousel disabled />);
    const el = screen.getByTestId("Carousel");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Carousel loading />);
    const el = screen.getByTestId("Carousel");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Carousel onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Carousel"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Carousel disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Carousel"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Carousel loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Carousel"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Carousel onClick={onClick} />);
    const el = screen.getByTestId("Carousel");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Carousel />);
    expect(screen.getByText("Carousel")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Carousel />);
    const el = screen.getByTestId("Carousel");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Carousel />);
    const el = screen.getByTestId("Carousel");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Carousel id="custom-id" />);
    const el = screen.getByTestId("Carousel");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Carousel testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Carousel aria-label="Accessible name" />);
    const el = screen.getByTestId("Carousel");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Carousel variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Carousel size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Carousel ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
