import Link from "@/src/platform/link";
import { ArrowRight } from "lucide-react";
import { DataStatePanel } from "@/components/data-state";
import { DemoBadge, PageHero } from "@/components/ui";
import { publicData } from "@/lib/data-service";
import { DataPagination } from "@/components/data-pagination";
import { requestedPage, type RouteSearchParams } from "@/lib/pagination";

export const metadata = { title: "News" };

export default async function NewsPage({ searchParams, signal }: { searchParams: Promise<RouteSearchParams>; signal: AbortSignal }) {
  const params = await searchParams;
  const result = await publicData.news({ page: requestedPage(params), pageSize: 12 }, { signal });
  return <>
    <PageHero eyebrow="Stories from Malawian sport" title="Latest news" intro="Published stories organized by sport, place and related records." />
    <div className="container page-content">
      {result.isDemo && <p className="results-count"><span>Representative stories</span><DemoBadge compact /></p>}
      {result.state === "stale" && <DataStatePanel state="stale" message={result.message} />}
      {result.data.length ? <div className="news-list">{result.data.map((article, index) => <article key={article.slug}>
        <div className={`news-visual visual-${index}`}><span>{article.category}</span></div>
        <div>
          <p className="news-meta">{article.sport} · {article.location} · {article.published}</p>
          <h2><Link href={`/news/${article.slug}`}>{article.title}</Link></h2>
          <p>{article.excerpt}</p>
          <Link className="text-link" href={`/news/${article.slug}`}>Read story <ArrowRight /></Link>
        </div>
      </article>)}</div> : <DataStatePanel state={result.state === "ready" ? "empty" : result.state} message={result.message} />}
      <DataPagination pagination={result.pagination} />
    </div>
  </>;
}
