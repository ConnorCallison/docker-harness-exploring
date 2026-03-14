import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WebhookForm } from "~/components/forms/WebhookForm";

describe("WebhookForm", () => {
  it("renders without crashing", () => {
    render(<WebhookForm />);
    expect(screen.getByTestId("WebhookForm")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<WebhookForm className="custom-class" />);
    const el = screen.getByTestId("WebhookForm");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<WebhookForm><span data-testid="child">Hello</span></WebhookForm>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<WebhookForm variant="primary" />);
    const el = screen.getByTestId("WebhookForm");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<WebhookForm size="lg" />);
    const el = screen.getByTestId("WebhookForm");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<WebhookForm disabled />);
    const el = screen.getByTestId("WebhookForm");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<WebhookForm loading />);
    const el = screen.getByTestId("WebhookForm");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<WebhookForm onClick={onClick} />);
    await userEvent.click(screen.getByTestId("WebhookForm"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<WebhookForm disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("WebhookForm"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<WebhookForm loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("WebhookForm"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<WebhookForm onClick={onClick} />);
    const el = screen.getByTestId("WebhookForm");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<WebhookForm />);
    expect(screen.getByText("Webhook Form")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<WebhookForm />);
    const el = screen.getByTestId("WebhookForm");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<WebhookForm />);
    const el = screen.getByTestId("WebhookForm");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<WebhookForm id="custom-id" />);
    const el = screen.getByTestId("WebhookForm");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<WebhookForm testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<WebhookForm aria-label="Accessible name" />);
    const el = screen.getByTestId("WebhookForm");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<WebhookForm variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<WebhookForm size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<WebhookForm ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
