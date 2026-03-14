import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MediaQuery } from "~/components/layout/MediaQuery";

describe("MediaQuery", () => {
  it("renders without crashing", () => {
    render(<MediaQuery />);
    expect(screen.getByTestId("MediaQuery")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<MediaQuery className="custom-class" />);
    const el = screen.getByTestId("MediaQuery");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<MediaQuery><span data-testid="child">Hello</span></MediaQuery>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<MediaQuery variant="primary" />);
    const el = screen.getByTestId("MediaQuery");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<MediaQuery size="lg" />);
    const el = screen.getByTestId("MediaQuery");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<MediaQuery disabled />);
    const el = screen.getByTestId("MediaQuery");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<MediaQuery loading />);
    const el = screen.getByTestId("MediaQuery");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<MediaQuery onClick={onClick} />);
    await userEvent.click(screen.getByTestId("MediaQuery"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<MediaQuery disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("MediaQuery"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<MediaQuery loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("MediaQuery"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<MediaQuery onClick={onClick} />);
    const el = screen.getByTestId("MediaQuery");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<MediaQuery />);
    expect(screen.getByText("Media Query")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<MediaQuery />);
    const el = screen.getByTestId("MediaQuery");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<MediaQuery />);
    const el = screen.getByTestId("MediaQuery");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<MediaQuery id="custom-id" />);
    const el = screen.getByTestId("MediaQuery");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<MediaQuery testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<MediaQuery aria-label="Accessible name" />);
    const el = screen.getByTestId("MediaQuery");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<MediaQuery variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<MediaQuery size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<MediaQuery ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
