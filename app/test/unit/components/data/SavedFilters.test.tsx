import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SavedFilters } from "~/components/data/SavedFilters";

describe("SavedFilters", () => {
  it("renders without crashing", () => {
    render(<SavedFilters />);
    expect(screen.getByTestId("SavedFilters")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<SavedFilters className="custom-class" />);
    const el = screen.getByTestId("SavedFilters");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<SavedFilters><span data-testid="child">Hello</span></SavedFilters>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<SavedFilters variant="primary" />);
    const el = screen.getByTestId("SavedFilters");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<SavedFilters size="lg" />);
    const el = screen.getByTestId("SavedFilters");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<SavedFilters disabled />);
    const el = screen.getByTestId("SavedFilters");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<SavedFilters loading />);
    const el = screen.getByTestId("SavedFilters");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<SavedFilters onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SavedFilters"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<SavedFilters disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SavedFilters"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<SavedFilters loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SavedFilters"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<SavedFilters onClick={onClick} />);
    const el = screen.getByTestId("SavedFilters");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<SavedFilters />);
    expect(screen.getByText("Saved Filters")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<SavedFilters />);
    const el = screen.getByTestId("SavedFilters");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<SavedFilters />);
    const el = screen.getByTestId("SavedFilters");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<SavedFilters id="custom-id" />);
    const el = screen.getByTestId("SavedFilters");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<SavedFilters testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<SavedFilters aria-label="Accessible name" />);
    const el = screen.getByTestId("SavedFilters");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<SavedFilters variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<SavedFilters size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<SavedFilters ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
