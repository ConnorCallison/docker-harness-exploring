import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GroupedList } from "~/components/data/GroupedList";

describe("GroupedList", () => {
  it("renders without crashing", () => {
    render(<GroupedList />);
    expect(screen.getByTestId("GroupedList")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<GroupedList className="custom-class" />);
    const el = screen.getByTestId("GroupedList");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<GroupedList><span data-testid="child">Hello</span></GroupedList>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<GroupedList variant="primary" />);
    const el = screen.getByTestId("GroupedList");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<GroupedList size="lg" />);
    const el = screen.getByTestId("GroupedList");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<GroupedList disabled />);
    const el = screen.getByTestId("GroupedList");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<GroupedList loading />);
    const el = screen.getByTestId("GroupedList");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<GroupedList onClick={onClick} />);
    await userEvent.click(screen.getByTestId("GroupedList"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<GroupedList disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("GroupedList"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<GroupedList loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("GroupedList"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<GroupedList onClick={onClick} />);
    const el = screen.getByTestId("GroupedList");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<GroupedList />);
    expect(screen.getByText("Grouped List")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<GroupedList />);
    const el = screen.getByTestId("GroupedList");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<GroupedList />);
    const el = screen.getByTestId("GroupedList");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<GroupedList id="custom-id" />);
    const el = screen.getByTestId("GroupedList");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<GroupedList testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<GroupedList aria-label="Accessible name" />);
    const el = screen.getByTestId("GroupedList");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<GroupedList variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<GroupedList size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<GroupedList ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
