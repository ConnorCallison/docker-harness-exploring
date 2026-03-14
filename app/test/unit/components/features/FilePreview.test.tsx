import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilePreview } from "~/components/features/FilePreview";

describe("FilePreview", () => {
  it("renders without crashing", () => {
    render(<FilePreview />);
    expect(screen.getByTestId("FilePreview")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<FilePreview className="custom-class" />);
    const el = screen.getByTestId("FilePreview");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<FilePreview><span data-testid="child">Hello</span></FilePreview>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<FilePreview variant="primary" />);
    const el = screen.getByTestId("FilePreview");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<FilePreview size="lg" />);
    const el = screen.getByTestId("FilePreview");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<FilePreview disabled />);
    const el = screen.getByTestId("FilePreview");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<FilePreview loading />);
    const el = screen.getByTestId("FilePreview");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<FilePreview onClick={onClick} />);
    await userEvent.click(screen.getByTestId("FilePreview"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<FilePreview disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("FilePreview"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<FilePreview loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("FilePreview"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<FilePreview onClick={onClick} />);
    const el = screen.getByTestId("FilePreview");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<FilePreview />);
    expect(screen.getByText("File Preview")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<FilePreview />);
    const el = screen.getByTestId("FilePreview");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<FilePreview />);
    const el = screen.getByTestId("FilePreview");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<FilePreview id="custom-id" />);
    const el = screen.getByTestId("FilePreview");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<FilePreview testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<FilePreview aria-label="Accessible name" />);
    const el = screen.getByTestId("FilePreview");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<FilePreview variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<FilePreview size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<FilePreview ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
