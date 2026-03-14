import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckboxField } from "~/components/forms/CheckboxField";

describe("CheckboxField", () => {
  it("renders without crashing", () => {
    render(<CheckboxField />);
    expect(screen.getByTestId("CheckboxField")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<CheckboxField className="custom-class" />);
    const el = screen.getByTestId("CheckboxField");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<CheckboxField><span data-testid="child">Hello</span></CheckboxField>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<CheckboxField variant="primary" />);
    const el = screen.getByTestId("CheckboxField");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<CheckboxField size="lg" />);
    const el = screen.getByTestId("CheckboxField");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<CheckboxField disabled />);
    const el = screen.getByTestId("CheckboxField");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<CheckboxField loading />);
    const el = screen.getByTestId("CheckboxField");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<CheckboxField onClick={onClick} />);
    await userEvent.click(screen.getByTestId("CheckboxField"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<CheckboxField disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("CheckboxField"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<CheckboxField loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("CheckboxField"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<CheckboxField onClick={onClick} />);
    const el = screen.getByTestId("CheckboxField");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<CheckboxField />);
    expect(screen.getByText("Checkbox Field")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<CheckboxField />);
    const el = screen.getByTestId("CheckboxField");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<CheckboxField />);
    const el = screen.getByTestId("CheckboxField");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<CheckboxField id="custom-id" />);
    const el = screen.getByTestId("CheckboxField");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<CheckboxField testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<CheckboxField aria-label="Accessible name" />);
    const el = screen.getByTestId("CheckboxField");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<CheckboxField variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<CheckboxField size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<CheckboxField ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
