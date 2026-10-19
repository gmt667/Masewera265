import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { AsyncRoute, RouteMeta } from "@/src/components/route-support";
import { RouteScrollManager } from "@/src/App";

describe("route support", () => {
  it("moves focus to the main landmark after navigation", async () => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      callback(0);
      return 1;
    });
    const focus = vi.spyOn(HTMLElement.prototype, "focus");
    render(
      <MemoryRouter initialEntries={["/teams?page=2"]}>
        <RouteScrollManager />
        <div id="main" role="main" tabIndex={-1} />
      </MemoryRouter>,
    );

    await waitFor(() => expect(focus).toHaveBeenCalledWith({ preventScroll: true }));
  });

  it("updates the document title and description", async () => {
    document.head.innerHTML = '<meta name="description" content="Initial">';
    render(<RouteMeta title="Fixtures" description="Malawi fixture listings" />);
    await waitFor(() => expect(document.title).toBe("Fixtures | Masewera265"));
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute("content", "Malawi fixture listings");
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "index,follow");
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute("content", "Fixtures | Masewera265");
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "http://localhost:3000/");
  });

  it("shows loading content before resolving an asynchronous route", async () => {
    let resolve!: (value: React.ReactNode) => void;
    const load = () => new Promise<React.ReactNode>((done) => { resolve = done; });
    render(<AsyncRoute load={load} />);
    expect(screen.getByRole("status")).toHaveTextContent(/loading masewera265/i);
    resolve(<h1>Loaded route</h1>);
    await waitFor(() => expect(screen.getByRole("heading", { name: "Loaded route" })).toBeInTheDocument());
  });

  it("retries a failed route in place", async () => {
    const load = vi.fn()
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce(<h1>Recovered route</h1>);
    render(<AsyncRoute load={load} />);

    await screen.findByRole("alert");
    await userEvent.click(screen.getByRole("button", { name: /try again/i }));

    expect(await screen.findByRole("heading", { name: "Recovered route" })).toBeInTheDocument();
    expect(load).toHaveBeenCalledTimes(2);
  });

  it("aborts obsolete route loads on unmount", () => {
    let signal: AbortSignal | undefined;
    const load = vi.fn((nextSignal: AbortSignal) => {
      signal = nextSignal;
      return new Promise<React.ReactNode>(() => undefined);
    });
    const view = render(<AsyncRoute load={load} />);

    view.unmount();
    expect(signal?.aborted).toBe(true);
  });
});
