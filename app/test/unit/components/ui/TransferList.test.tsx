import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TransferList } from "~/components/ui/TransferList";

describe("TransferList", () => {
  it("renders without crashing", () => {
    render(<TransferList />);
    expect(screen.getByTestId("TransferList")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<TransferList className="custom-class" />);
    const el = screen.getByTestId("TransferList");
    expect(el.className).toContain("custom-class");
  });

  it("renders children", () => {
    render(<TransferList><span data-testid="child">Hello</span></TransferList>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies variant prop", () => {
    render(<TransferList variant="primary" />);
    const el = screen.getByTestId("TransferList");
    expect(el.className).toContain("variant-primary");
  });

  it("applies size prop", () => {
    render(<TransferList size="lg" />);
    const el = screen.getByTestId("TransferList");
    expect(el.className).toContain("size-lg");
  });

  it("handles disabled state", () => {
    render(<TransferList disabled />);
    const el = screen.getByTestId("TransferList");
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("handles loading state", () => {
    render(<TransferList loading />);
    const el = screen.getByTestId("TransferList");
    expect(el).toHaveAttribute("aria-busy", "true");
  });

  it("fires onClick handler", async () => {
    const onClick = vi.fn();
    render(<TransferList onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TransferList"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<TransferList disabled onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TransferList"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", async () => {
    const onClick = vi.fn();
    render(<TransferList loading onClick={onClick} />);
    await userEvent.click(screen.getByTestId("TransferList"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles keyboard interaction", async () => {
    const onClick = vi.fn();
    render(<TransferList onClick={onClick} />);
    const el = screen.getByTestId("TransferList");
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();
  });

  it("displays component name in header", () => {
    render(<TransferList />);
    expect(screen.getByText("Transfer List")).toBeInTheDocument();
  });

  it("shows hover state on mouse enter", async () => {
    render(<TransferList />);
    const el = screen.getByTestId("TransferList");
    fireEvent.mouseEnter(el);
    await waitFor(() => {
      expect(screen.getByText("Hovered")).toBeInTheDocument();
    });
  });

  it("clears hover state on mouse leave", async () => {
    render(<TransferList />);
    const el = screen.getByTestId("TransferList");
    fireEvent.mouseEnter(el);
    fireEvent.mouseLeave(el);
    await waitFor(() => {
      expect(screen.queryByText("Hovered")).not.toBeInTheDocument();
    });
  });

  it("accepts custom id", () => {
    render(<TransferList id="custom-id" />);
    const el = screen.getByTestId("TransferList");
    expect(el).toHaveAttribute("id", "custom-id");
  });

  it("accepts custom testId", () => {
    render(<TransferList testId="my-test-id" />);
    expect(screen.getByTestId("my-test-id")).toBeInTheDocument();
  });

  it("accepts aria-label", () => {
    render(<TransferList aria-label="Accessible name" />);
    const el = screen.getByTestId("TransferList");
    expect(el).toHaveAttribute("aria-label", "Accessible name");
  });

  it("renders all variant options", () => {
    const variants = ["default", "primary", "secondary", "destructive"] as const;
    for (const variant of variants) {
      const { unmount } = render(<TransferList variant={variant} testId={`${variant}-test`} />);
      expect(screen.getByTestId(`${variant}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all size options", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { unmount } = render(<TransferList size={size} testId={`${size}-test`} />);
      expect(screen.getByTestId(`${size}-test`)).toBeInTheDocument();
      unmount();
    }
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<TransferList ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
