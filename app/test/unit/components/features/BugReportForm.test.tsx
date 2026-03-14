import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BugReportForm } from "~/components/features/BugReportForm";

describe("BugReportForm", () => {
  it("renders without crashing", () => {
    render(<BugReportForm />);
    expect(screen.getByTestId("BugReportForm")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<BugReportForm className="custom-class" />);
    const el = screen.getByTestId("BugReportForm");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<BugReportForm><span data-testid="child">Hello</span></BugReportForm>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<BugReportForm variant="primary" />);
    const el = screen.getByTestId("BugReportForm");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<BugReportForm size="lg" />);
    const el = screen.getByTestId("BugReportForm");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<BugReportForm disabled />);
    const el = screen.getByTestId("BugReportForm");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<BugReportForm loading />);
    const el = screen.getByTestId("BugReportForm");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<BugReportForm onClick={onClick} />);
    await userEvent.click(screen.getByTestId("BugReportForm"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<BugReportForm disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("BugReportForm"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<BugReportForm loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("BugReportForm"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<BugReportForm onClick={onClick} />);
    const el = screen.getByTestId("BugReportForm");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<BugReportForm />);
    expect(screen.getByText("Bug Report Form")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<BugReportForm />);
    const el = screen.getByTestId("BugReportForm");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<BugReportForm />);
    const el = screen.getByTestId("BugReportForm");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<BugReportForm id="custom-id" />);
    const el = screen.getByTestId("BugReportForm");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<BugReportForm testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<BugReportForm aria-label="Accessible name" />);
    const el = screen.getByTestId("BugReportForm");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<BugReportForm variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<BugReportForm size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<BugReportForm ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
