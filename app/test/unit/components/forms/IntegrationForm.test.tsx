import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntegrationForm } from "~/components/forms/IntegrationForm";

describe("IntegrationForm", () => {
  it("renders without crashing", () => {
    render(<IntegrationForm />);
    expect(screen.getByTestId("IntegrationForm")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<IntegrationForm className="custom-class" />);
    const el = screen.getByTestId("IntegrationForm");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<IntegrationForm><span data-testid="child">Hello</span></IntegrationForm>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<IntegrationForm variant="primary" />);
    const el = screen.getByTestId("IntegrationForm");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<IntegrationForm size="lg" />);
    const el = screen.getByTestId("IntegrationForm");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<IntegrationForm disabled />);
    const el = screen.getByTestId("IntegrationForm");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<IntegrationForm loading />);
    const el = screen.getByTestId("IntegrationForm");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<IntegrationForm onClick={onClick} />);
    await userEvent.click(screen.getByTestId("IntegrationForm"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<IntegrationForm disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("IntegrationForm"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<IntegrationForm loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("IntegrationForm"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<IntegrationForm onClick={onClick} />);
    const el = screen.getByTestId("IntegrationForm");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<IntegrationForm />);
    expect(screen.getByText("Integration Form")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<IntegrationForm />);
    const el = screen.getByTestId("IntegrationForm");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<IntegrationForm />);
    const el = screen.getByTestId("IntegrationForm");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<IntegrationForm id="custom-id" />);
    const el = screen.getByTestId("IntegrationForm");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<IntegrationForm testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<IntegrationForm aria-label="Accessible name" />);
    const el = screen.getByTestId("IntegrationForm");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<IntegrationForm variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<IntegrationForm size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<IntegrationForm ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
