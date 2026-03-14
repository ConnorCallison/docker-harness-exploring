import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataList } from "~/components/ui/DataList";

describe("DataList", () => {
  it("renders without crashing", () => {
    render(<DataList />);
    expect(screen.getByTestId("DataList")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<DataList className="custom-class" />);
    const el = screen.getByTestId("DataList");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<DataList><span data-testid="child">Hello</span></DataList>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<DataList variant="primary" />);
    const el = screen.getByTestId("DataList");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<DataList size="lg" />);
    const el = screen.getByTestId("DataList");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<DataList disabled />);
    const el = screen.getByTestId("DataList");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<DataList loading />);
    const el = screen.getByTestId("DataList");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<DataList onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DataList"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<DataList disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DataList"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<DataList loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DataList"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<DataList onClick={onClick} />);
    const el = screen.getByTestId("DataList");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<DataList />);
    expect(screen.getByText("Data List")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<DataList />);
    const el = screen.getByTestId("DataList");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<DataList />);
    const el = screen.getByTestId("DataList");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<DataList id="custom-id" />);
    const el = screen.getByTestId("DataList");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<DataList testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<DataList aria-label="Accessible name" />);
    const el = screen.getByTestId("DataList");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<DataList variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<DataList size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<DataList ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
