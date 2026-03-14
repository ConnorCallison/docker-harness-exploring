import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Footer } from "~/components/layout/Footer";

describe("Footer", () => {
  it("renders without crashing", () => {
    render(<Footer />);
    expect(screen.getByTestId("Footer")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Footer className="custom-class" />);
    const el = screen.getByTestId("Footer");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<Footer><span data-testid="child">Hello</span></Footer>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<Footer variant="primary" />);
    const el = screen.getByTestId("Footer");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<Footer size="lg" />);
    const el = screen.getByTestId("Footer");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<Footer disabled />);
    const el = screen.getByTestId("Footer");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<Footer loading />);
    const el = screen.getByTestId("Footer");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<Footer onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Footer"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Footer disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Footer"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<Footer loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("Footer"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<Footer onClick={onClick} />);
    const el = screen.getByTestId("Footer");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<Footer />);
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<Footer />);
    const el = screen.getByTestId("Footer");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<Footer />);
    const el = screen.getByTestId("Footer");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<Footer id="custom-id" />);
    const el = screen.getByTestId("Footer");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<Footer testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<Footer aria-label="Accessible name" />);
    const el = screen.getByTestId("Footer");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Footer variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Footer size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Footer ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
