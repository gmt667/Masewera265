import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataStatePanel } from "@/components/data-state";

describe("DataStatePanel", () => {
  it("retries through the screen callback without forcing a page reload", async () => {
    const onRetry = vi.fn();
    render(<DataStatePanel state="stale" retryable onRetry={onRetry} />);

    await userEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("does not offer retry for a non-retryable response", () => {
    render(<DataStatePanel state="error" retryable={false} />);

    expect(screen.queryByRole("button", { name: /try again/i })).not.toBeInTheDocument();
  });
});
