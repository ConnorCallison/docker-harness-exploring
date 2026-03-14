import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SatisfactionSurvey } from "~/components/features/SatisfactionSurvey";

describe("SatisfactionSurvey", () => {
  it("renders without crashing", () => {
    render(<SatisfactionSurvey />);
    expect(screen.getByTestId("SatisfactionSurvey")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<SatisfactionSurvey className="custom-class" />);
    const el = screen.getByTestId("SatisfactionSurvey");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<SatisfactionSurvey><span data-testid="child">Hello</span></SatisfactionSurvey>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<SatisfactionSurvey variant="primary" />);
    const el = screen.getByTestId("SatisfactionSurvey");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<SatisfactionSurvey size="lg" />);
    const el = screen.getByTestId("SatisfactionSurvey");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<SatisfactionSurvey disabled />);
    const el = screen.getByTestId("SatisfactionSurvey");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<SatisfactionSurvey loading />);
    const el = screen.getByTestId("SatisfactionSurvey");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<SatisfactionSurvey onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SatisfactionSurvey"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<SatisfactionSurvey disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SatisfactionSurvey"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<SatisfactionSurvey loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("SatisfactionSurvey"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<SatisfactionSurvey onClick={onClick} />);
    const el = screen.getByTestId("SatisfactionSurvey");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<SatisfactionSurvey />);
    expect(screen.getByText("Satisfaction Survey")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<SatisfactionSurvey />);
    const el = screen.getByTestId("SatisfactionSurvey");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<SatisfactionSurvey />);
    const el = screen.getByTestId("SatisfactionSurvey");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<SatisfactionSurvey id="custom-id" />);
    const el = screen.getByTestId("SatisfactionSurvey");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<SatisfactionSurvey testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<SatisfactionSurvey aria-label="Accessible name" />);
    const el = screen.getByTestId("SatisfactionSurvey");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<SatisfactionSurvey variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<SatisfactionSurvey size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<SatisfactionSurvey ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
