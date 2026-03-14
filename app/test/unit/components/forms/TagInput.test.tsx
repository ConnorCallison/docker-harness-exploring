import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TagInput } from "~/components/forms/TagInput";

describe("TagInput", () => {
  it("renders without crashing", () => {
    render(<TagInput />);
    expect(screen.getByTestId("TagInput")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<TagInput className="custom-class" />);
    const el = screen.getByTestId("TagInput");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<TagInput><span data-testid="child">Hello</span></TagInput>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<TagInput variant="primary" />);
    const el = screen.getByTestId("TagInput");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<TagInput size="lg" />);
    const el = screen.getByTestId("TagInput");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<TagInput disabled />);
    const el = screen.getByTestId("TagInput");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<TagInput loading />);
    const el = screen.getByTestId("TagInput");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<TagInput onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TagInput"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<TagInput disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TagInput"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<TagInput loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TagInput"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<TagInput onClick={onClick} />);
    const el = screen.getByTestId("TagInput");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<TagInput />);
    expect(screen.getByText("Tag Input")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<TagInput />);
    const el = screen.getByTestId("TagInput");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<TagInput />);
    const el = screen.getByTestId("TagInput");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<TagInput id="custom-id" />);
    const el = screen.getByTestId("TagInput");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<TagInput testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<TagInput aria-label="Accessible name" />);
    const el = screen.getByTestId("TagInput");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<TagInput variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<TagInput size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<TagInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
