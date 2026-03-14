import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SpeechToText } from "~/components/features/SpeechToText";

describe("SpeechToText", () => {
  it("renders without crashing", () => {
    render(<SpeechToText />);
    expect(screen.getByTestId("SpeechToText")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<SpeechToText className="custom-class" />);
    const el = screen.getByTestId("SpeechToText");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<SpeechToText><span data-testid="child">Hello</span></SpeechToText>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<SpeechToText variant="primary" />);
    const el = screen.getByTestId("SpeechToText");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<SpeechToText size="lg" />);
    const el = screen.getByTestId("SpeechToText");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<SpeechToText disabled />);
    const el = screen.getByTestId("SpeechToText");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<SpeechToText loading />);
    const el = screen.getByTestId("SpeechToText");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<SpeechToText onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SpeechToText"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<SpeechToText disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SpeechToText"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<SpeechToText loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SpeechToText"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<SpeechToText onClick={onClick} />);
    const el = screen.getByTestId("SpeechToText");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<SpeechToText />);
    expect(screen.getByText("Speech To Text")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<SpeechToText />);
    const el = screen.getByTestId("SpeechToText");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<SpeechToText />);
    const el = screen.getByTestId("SpeechToText");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<SpeechToText id="custom-id" />);
    const el = screen.getByTestId("SpeechToText");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<SpeechToText testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<SpeechToText aria-label="Accessible name" />);
    const el = screen.getByTestId("SpeechToText");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<SpeechToText variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<SpeechToText size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<SpeechToText ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
