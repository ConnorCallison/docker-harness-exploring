import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageSwitcher } from "~/components/features/LanguageSwitcher";

describe("LanguageSwitcher", () => {
  it("renders without crashing", () => {
    render(<LanguageSwitcher />);
    expect(screen.getByTestId("LanguageSwitcher")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<LanguageSwitcher className="custom-class" />);
    const el = screen.getByTestId("LanguageSwitcher");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<LanguageSwitcher><span data-testid="child">Hello</span></LanguageSwitcher>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<LanguageSwitcher variant="primary" />);
    const el = screen.getByTestId("LanguageSwitcher");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<LanguageSwitcher size="lg" />);
    const el = screen.getByTestId("LanguageSwitcher");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<LanguageSwitcher disabled />);
    const el = screen.getByTestId("LanguageSwitcher");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<LanguageSwitcher loading />);
    const el = screen.getByTestId("LanguageSwitcher");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<LanguageSwitcher onClick={onClick} />);
    await userEvent.click(screen.getByTestId("LanguageSwitcher"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<LanguageSwitcher disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("LanguageSwitcher"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<LanguageSwitcher loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("LanguageSwitcher"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<LanguageSwitcher onClick={onClick} />);
    const el = screen.getByTestId("LanguageSwitcher");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText("Language Switcher")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<LanguageSwitcher />);
    const el = screen.getByTestId("LanguageSwitcher");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<LanguageSwitcher />);
    const el = screen.getByTestId("LanguageSwitcher");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<LanguageSwitcher id="custom-id" />);
    const el = screen.getByTestId("LanguageSwitcher");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<LanguageSwitcher testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<LanguageSwitcher aria-label="Accessible name" />);
    const el = screen.getByTestId("LanguageSwitcher");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<LanguageSwitcher variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<LanguageSwitcher size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<LanguageSwitcher ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
