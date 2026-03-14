import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Flex } from "~/components/layout/Flex";

describe("Flex", () => {
  it("renders without crashing", () => {
    render(<Flex />);
    expect(screen.getByTestId("Flex")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Flex className="custom-class" />);
    const el = screen.getByTestId("Flex");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Flex><span data-testid="child">Hello</span></Flex>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Flex variant="primary" />);
    const el = screen.getByTestId("Flex");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Flex size="lg" />);
    const el = screen.getByTestId("Flex");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Flex disabled />);
    const el = screen.getByTestId("Flex");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Flex loading />);
    const el = screen.getByTestId("Flex");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Flex onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Flex"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Flex disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Flex"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Flex loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Flex"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Flex onClick={onClick} />);
    const el = screen.getByTestId("Flex");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Flex />);
    expect(screen.getByText("Flex")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Flex />);
    const el = screen.getByTestId("Flex");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Flex />);
    const el = screen.getByTestId("Flex");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Flex id="custom-id" />);
    const el = screen.getByTestId("Flex");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Flex testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Flex aria-label="Accessible name" />);
    const el = screen.getByTestId("Flex");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Flex variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Flex size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Flex ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
