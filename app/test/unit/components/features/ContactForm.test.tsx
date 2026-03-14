import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "~/components/features/ContactForm";

describe("ContactForm", () => {
  it("renders without crashing", () => {
    render(<ContactForm />);
    expect(screen.getByTestId("ContactForm")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ContactForm className="custom-class" />);
    const el = screen.getByTestId("ContactForm");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ContactForm><span data-testid="child">Hello</span></ContactForm>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ContactForm variant="primary" />);
    const el = screen.getByTestId("ContactForm");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ContactForm size="lg" />);
    const el = screen.getByTestId("ContactForm");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ContactForm disabled />);
    const el = screen.getByTestId("ContactForm");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ContactForm loading />);
    const el = screen.getByTestId("ContactForm");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ContactForm onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ContactForm"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ContactForm disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ContactForm"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ContactForm loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ContactForm"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ContactForm onClick={onClick} />);
    const el = screen.getByTestId("ContactForm");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ContactForm />);
    expect(screen.getByText("Contact Form")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ContactForm />);
    const el = screen.getByTestId("ContactForm");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ContactForm />);
    const el = screen.getByTestId("ContactForm");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ContactForm id="custom-id" />);
    const el = screen.getByTestId("ContactForm");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ContactForm testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ContactForm aria-label="Accessible name" />);
    const el = screen.getByTestId("ContactForm");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ContactForm variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ContactForm size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ContactForm ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
