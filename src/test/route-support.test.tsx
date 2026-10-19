import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AsyncRoute, RouteMeta } from "@/src/components/route-support";

describe("route support", () => {
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
});
