import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/site-header";

describe("SiteHeader", () => {
  it("opens, labels and closes the mobile navigation with Escape", async () => {
    render(<MemoryRouter initialEntries={["/sports"]}><SiteHeader /></MemoryRouter>);
    const toggle = screen.getByRole("button", { name: /open navigation menu/i });

    fireEvent.click(toggle);
    const mobileNavigation = screen.getByRole("navigation", { name: /mobile navigation/i });
    expect(mobileNavigation).toBeInTheDocument();
    expect(within(mobileNavigation).getByRole("link", { name: "Sports" })).toHaveAttribute("aria-current", "page");
    await waitFor(() => expect(document.body.style.overflow).toBe("hidden"));

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("navigation", { name: /mobile navigation/i })).not.toBeInTheDocument();
    await waitFor(() => expect(toggle).toHaveFocus());
    expect(document.body.style.overflow).toBe("");
  });

  it("uses the solid navbar state away from the homepage", () => {
    render(<MemoryRouter initialEntries={["/news"]}><SiteHeader /></MemoryRouter>);
    expect(document.querySelector(".site-header")).toHaveClass("is-scrolled");
  });
});
