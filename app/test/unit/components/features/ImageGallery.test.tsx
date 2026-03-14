import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ImageGallery } from "~/components/features/ImageGallery";

describe("ImageGallery", () => {
  it("renders without crashing", () => {
    render(<ImageGallery />);
    expect(screen.getByTestId("ImageGallery")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<ImageGallery className="custom-class" />);
    const el = screen.getByTestId("ImageGallery");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<ImageGallery><span data-testid="child">Hello</span></ImageGallery>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<ImageGallery variant="primary" />);
    const el = screen.getByTestId("ImageGallery");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<ImageGallery size="lg" />);
    const el = screen.getByTestId("ImageGallery");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<ImageGallery disabled />);
    const el = screen.getByTestId("ImageGallery");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<ImageGallery loading />);
    const el = screen.getByTestId("ImageGallery");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<ImageGallery onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ImageGallery"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<ImageGallery disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ImageGallery"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<ImageGallery loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("ImageGallery"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<ImageGallery onClick={onClick} />);
    const el = screen.getByTestId("ImageGallery");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<ImageGallery />);
    expect(screen.getByText("Image Gallery")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<ImageGallery />);
    const el = screen.getByTestId("ImageGallery");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<ImageGallery />);
    const el = screen.getByTestId("ImageGallery");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<ImageGallery id="custom-id" />);
    const el = screen.getByTestId("ImageGallery");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<ImageGallery testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<ImageGallery aria-label="Accessible name" />);
    const el = screen.getByTestId("ImageGallery");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<ImageGallery variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<ImageGallery size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ImageGallery ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
