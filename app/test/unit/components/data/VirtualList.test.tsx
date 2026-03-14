import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VirtualList } from "~/components/data/VirtualList";

describe("VirtualList", () => {
  it("renders without crashing", () => {
    render(<VirtualList />);
    expect(screen.getByTestId("VirtualList")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<VirtualList className="custom-class" />);
    const el = screen.getByTestId("VirtualList");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<VirtualList><span data-testid="child">Hello</span></VirtualList>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<VirtualList variant="primary" />);
    const el = screen.getByTestId("VirtualList");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<VirtualList size="lg" />);
    const el = screen.getByTestId("VirtualList");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<VirtualList disabled />);
    const el = screen.getByTestId("VirtualList");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<VirtualList loading />);
    const el = screen.getByTestId("VirtualList");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<VirtualList onClick={onClick} />);
    await userEvent.click(screen.getByTestId("VirtualList"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<VirtualList disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("VirtualList"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<VirtualList loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("VirtualList"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<VirtualList onClick={onClick} />);
    const el = screen.getByTestId("VirtualList");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<VirtualList />);
    expect(screen.getByText("Virtual List")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<VirtualList />);
    const el = screen.getByTestId("VirtualList");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<VirtualList />);
    const el = screen.getByTestId("VirtualList");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<VirtualList id="custom-id" />);
    const el = screen.getByTestId("VirtualList");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<VirtualList testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<VirtualList aria-label="Accessible name" />);
    const el = screen.getByTestId("VirtualList");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<VirtualList variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<VirtualList size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<VirtualList ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
