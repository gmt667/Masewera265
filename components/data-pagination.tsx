import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import Link from "@/src/platform/link";
import type { PublicPagination } from "@/lib/data-service";

export function DataPagination({ pagination }: { pagination?: PublicPagination }) {
  const { pathname, search } = useLocation();
  if (!pagination || pagination.totalPages <= 1) return null;

  const hrefFor = (page: number) => {
    const params = new URLSearchParams(search);
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };
  const { page, pageSize, total, totalPages } = pagination;
  const first = Math.min((page - 1) * pageSize + 1, total);
  const last = Math.min(page * pageSize, total);

  return (
    <nav className="data-pagination" aria-label="Results pages">
      <p>Showing {first}–{last} of {total}</p>
      <div>
        {page > 1
          ? <Link className="pagination-button" href={hrefFor(page - 1)} aria-label="Previous page"><ChevronLeft /> Previous</Link>
          : <span className="pagination-button disabled" aria-disabled="true"><ChevronLeft /> Previous</span>}
        <span aria-current="page">Page {page} of {totalPages}</span>
        {page < totalPages
          ? <Link className="pagination-button" href={hrefFor(page + 1)} aria-label="Next page">Next <ChevronRight /></Link>
          : <span className="pagination-button disabled" aria-disabled="true">Next <ChevronRight /></span>}
      </div>
    </nav>
  );
}
