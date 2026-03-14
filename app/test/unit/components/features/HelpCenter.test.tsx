import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HelpCenter } from "~/components/features/HelpCenter";

describe("HelpCenter", () => {
  it("renders without crashing", () => {
    render(<HelpCenter />);
    expect(screen.getByTestId("HelpCenter")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<HelpCenter className="custom-class" />);
    const el = screen.getByTestId("HelpCenter");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<HelpCenter><span data-testid="child">Hello</span></HelpCenter>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<HelpCenter variant="primary" />);
    const el = screen.getByTestId("HelpCenter");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<HelpCenter size="lg" />);
    const el = screen.getByTestId("HelpCenter");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<HelpCenter disabled />);
    const el = screen.getByTestId("HelpCenter");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<HelpCenter loading />);
    const el = screen.getByTestId("HelpCenter");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<HelpCenter onClick={onClick} />);
    await userEvent.click(screen.getByTestId("HelpCenter"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<HelpCenter disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("HelpCenter"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<HelpCenter loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("HelpCenter"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<HelpCenter onClick={onClick} />);
    const el = screen.getByTestId("HelpCenter");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<HelpCenter />);
    expect(screen.getByText("Help Center")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<HelpCenter />);
    const el = screen.getByTestId("HelpCenter");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<HelpCenter />);
    const el = screen.getByTestId("HelpCenter");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<HelpCenter id="custom-id" />);
    const el = screen.getByTestId("HelpCenter");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<HelpCenter testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<HelpCenter aria-label="Accessible name" />);
    const el = screen.getByTestId("HelpCenter");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<HelpCenter variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<HelpCenter size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<HelpCenter ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
