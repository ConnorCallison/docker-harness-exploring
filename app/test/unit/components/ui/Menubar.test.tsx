import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menubar } from "~/components/ui/Menubar";

describe("Menubar", () => {
  it("renders without crashing", () => {
    render(<Menubar />);
    expect(screen.getByTestId("Menubar")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Menubar className="custom-class" />);
    const el = screen.getByTestId("Menubar");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Menubar><span data-testid="child">Hello</span></Menubar>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Menubar variant="primary" />);
    const el = screen.getByTestId("Menubar");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Menubar size="lg" />);
    const el = screen.getByTestId("Menubar");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Menubar disabled />);
    const el = screen.getByTestId("Menubar");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Menubar loading />);
    const el = screen.getByTestId("Menubar");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Menubar onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Menubar"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Menubar disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Menubar"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Menubar loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Menubar"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Menubar onClick={onClick} />);
    const el = screen.getByTestId("Menubar");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Menubar />);
    expect(screen.getByText("Menubar")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Menubar />);
    const el = screen.getByTestId("Menubar");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Menubar />);
    const el = screen.getByTestId("Menubar");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Menubar id="custom-id" />);
    const el = screen.getByTestId("Menubar");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Menubar testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Menubar aria-label="Accessible name" />);
    const el = screen.getByTestId("Menubar");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Menubar variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Menubar size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Menubar ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
