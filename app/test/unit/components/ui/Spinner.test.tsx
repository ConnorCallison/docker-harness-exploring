import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Spinner } from "~/components/ui/Spinner";

describe("Spinner", () => {
  it("renders without crashing", () => {
    render(<Spinner />);
    expect(screen.getByTestId("Spinner")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Spinner className="custom-class" />);
    const el = screen.getByTestId("Spinner");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Spinner><span data-testid="child">Hello</span></Spinner>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Spinner variant="primary" />);
    const el = screen.getByTestId("Spinner");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Spinner size="lg" />);
    const el = screen.getByTestId("Spinner");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Spinner disabled />);
    const el = screen.getByTestId("Spinner");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Spinner loading />);
    const el = screen.getByTestId("Spinner");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Spinner onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Spinner"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Spinner disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Spinner"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Spinner loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Spinner"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Spinner onClick={onClick} />);
    const el = screen.getByTestId("Spinner");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Spinner />);
    expect(screen.getByText("Spinner")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Spinner />);
    const el = screen.getByTestId("Spinner");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Spinner />);
    const el = screen.getByTestId("Spinner");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Spinner id="custom-id" />);
    const el = screen.getByTestId("Spinner");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Spinner testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Spinner aria-label="Accessible name" />);
    const el = screen.getByTestId("Spinner");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Spinner variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Spinner size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Spinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
