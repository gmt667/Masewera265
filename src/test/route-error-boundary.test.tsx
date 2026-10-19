import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RouteErrorBoundaryShell } from "@/src/components/route-error-boundary";

function BrokenRoute(): never {
  throw new Error("chunk unavailable");
}

describe("RouteErrorBoundaryShell", () => {
  beforeEach(() => vi.spyOn(console, "error").mockImplementation(() => undefined));
  afterEach(() => vi.restoreAllMocks());

  it("shows a recoverable state when a route module fails", () => {
    render(
      <MemoryRouter initialEntries={["/teams"]}>
        <RouteErrorBoundaryShell><BrokenRoute /></RouteErrorBoundaryShell>
      </MemoryRouter>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(/page module could not be loaded/i);
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });
});
