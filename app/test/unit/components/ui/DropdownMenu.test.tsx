import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DropdownMenu } from "~/components/ui/DropdownMenu";

describe("DropdownMenu", () => {
  it("renders without crashing", () => {
    render(<DropdownMenu />);
    expect(screen.getByTestId("DropdownMenu")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<DropdownMenu className="custom-class" />);
    const el = screen.getByTestId("DropdownMenu");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<DropdownMenu><span data-testid="child">Hello</span></DropdownMenu>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<DropdownMenu variant="primary" />);
    const el = screen.getByTestId("DropdownMenu");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<DropdownMenu size="lg" />);
    const el = screen.getByTestId("DropdownMenu");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<DropdownMenu disabled />);
    const el = screen.getByTestId("DropdownMenu");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<DropdownMenu loading />);
    const el = screen.getByTestId("DropdownMenu");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<DropdownMenu onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DropdownMenu"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<DropdownMenu disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DropdownMenu"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<DropdownMenu loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("DropdownMenu"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<DropdownMenu onClick={onClick} />);
    const el = screen.getByTestId("DropdownMenu");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<DropdownMenu />);
    expect(screen.getByText("Dropdown Menu")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<DropdownMenu />);
    const el = screen.getByTestId("DropdownMenu");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<DropdownMenu />);
    const el = screen.getByTestId("DropdownMenu");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<DropdownMenu id="custom-id" />);
    const el = screen.getByTestId("DropdownMenu");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<DropdownMenu testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<DropdownMenu aria-label="Accessible name" />);
    const el = screen.getByTestId("DropdownMenu");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<DropdownMenu variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<DropdownMenu size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<DropdownMenu ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
