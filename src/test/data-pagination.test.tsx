import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { DataPagination } from "@/components/data-pagination";

describe("DataPagination", () => {
  it("preserves filters while creating accessible page links", () => {
    render(
      <MemoryRouter initialEntries={["/news?sport=football&page=2"]}>
        <DataPagination pagination={{ page: 2, pageSize: 12, total: 30, totalPages: 3 }} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Showing 13–24 of 30")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Previous page" })).toHaveAttribute("href", "/news?sport=football&page=1");
    expect(screen.getByRole("link", { name: "Next page" })).toHaveAttribute("href", "/news?sport=football&page=3");
    expect(screen.getByText("Page 2 of 3")).toHaveAttribute("aria-current", "page");
  });

  it("does not render when only one page exists", () => {
    const { container } = render(
      <MemoryRouter>
        <DataPagination pagination={{ page: 1, pageSize: 12, total: 4, totalPages: 1 }} />
      </MemoryRouter>,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
