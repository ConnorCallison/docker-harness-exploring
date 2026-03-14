import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SwitchField } from "~/components/forms/SwitchField";

describe("SwitchField", () => {
  it("renders without crashing", () => {
    render(<SwitchField />);
    expect(screen.getByTestId("SwitchField")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<SwitchField className="custom-class" />);
    const el = screen.getByTestId("SwitchField");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<SwitchField><span data-testid="child">Hello</span></SwitchField>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<SwitchField variant="primary" />);
    const el = screen.getByTestId("SwitchField");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<SwitchField size="lg" />);
    const el = screen.getByTestId("SwitchField");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<SwitchField disabled />);
    const el = screen.getByTestId("SwitchField");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<SwitchField loading />);
    const el = screen.getByTestId("SwitchField");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<SwitchField onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SwitchField"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<SwitchField disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SwitchField"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<SwitchField loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SwitchField"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<SwitchField onClick={onClick} />);
    const el = screen.getByTestId("SwitchField");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<SwitchField />);
    expect(screen.getByText("Switch Field")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<SwitchField />);
    const el = screen.getByTestId("SwitchField");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<SwitchField />);
    const el = screen.getByTestId("SwitchField");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<SwitchField id="custom-id" />);
    const el = screen.getByTestId("SwitchField");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<SwitchField testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<SwitchField aria-label="Accessible name" />);
    const el = screen.getByTestId("SwitchField");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<SwitchField variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<SwitchField size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<SwitchField ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
