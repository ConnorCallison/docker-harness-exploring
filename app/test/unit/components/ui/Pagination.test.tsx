import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "~/components/ui/Pagination";

describe("Pagination", () => {
  it("renders without crashing", () => {
    render(<Pagination />);
    expect(screen.getByTestId("Pagination")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Pagination className="custom-class" />);
    const el = screen.getByTestId("Pagination");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Pagination><span data-testid="child">Hello</span></Pagination>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Pagination variant="primary" />);
    const el = screen.getByTestId("Pagination");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Pagination size="lg" />);
    const el = screen.getByTestId("Pagination");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Pagination disabled />);
    const el = screen.getByTestId("Pagination");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Pagination loading />);
    const el = screen.getByTestId("Pagination");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Pagination onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Pagination"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Pagination disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Pagination"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Pagination loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Pagination"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Pagination onClick={onClick} />);
    const el = screen.getByTestId("Pagination");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Pagination />);
    expect(screen.getByText("Pagination")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Pagination />);
    const el = screen.getByTestId("Pagination");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Pagination />);
    const el = screen.getByTestId("Pagination");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Pagination id="custom-id" />);
    const el = screen.getByTestId("Pagination");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Pagination testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Pagination aria-label="Accessible name" />);
    const el = screen.getByTestId("Pagination");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Pagination variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Pagination size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Pagination ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
