import Link from "@/src/platform/link";
import { notFound } from "@/src/platform/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";
import { articles } from "@/lib/demo-data";
import { DemoBadge } from "@/components/ui";
import { DataStatePanel } from "@/components/data-state";
import { dataMode, publicData } from "@/lib/data-service";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = dataMode === "demo" ? articles.find((x) => x.slug === slug) : undefined;
  return {
    title: a ? `${a.title} | Masewera265 News` : "News Article",
    description: a?.excerpt,
  };
}

export default async function NewsSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await publicData.article(slug);
  const a = result.data[0];
  if (result.state === "empty") notFound();
  if (!a) return <main className="container page-content"><DataStatePanel state={result.state === "ready" ? "error" : result.state} message={result.message} /></main>;

  return (
    <article>
      <header className="article-hero">
        <div className="article-wrap">
          <Link href="/news" className="back-link">
            <ArrowLeft size={16} /> All News
          </Link>
          <p className="eyebrow">
            {a.category} · {a.sport}
          </p>
          <h1>{a.title}</h1>
          <p className="article-deck">{a.excerpt}</p>
          <div className="article-byline">
            {result.isDemo && <DemoBadge compact />}
            <span>{a.published}</span>
            <span>
              <Clock3 size={14} /> {a.readTime}
            </span>
          </div>
        </div>
      </header>
      <div className="article-visual">
        <span>MASEWERA265 / {a.sport.toUpperCase()}</span>
      </div>
      <div className="article-wrap article-body">
        {a.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <aside>
          <strong>About this story</strong>
          <p>
            This article is documented editorial and archival coverage for Masewera265, Malawi&apos;s digital home for sport.
          </p>
        </aside>
      </div>
    </article>
  );
}
