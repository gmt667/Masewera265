import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";
import { articles } from "@/lib/demo-data";
import { DemoBadge } from "@/components/ui";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  return {
    title: a ? `${a.title} | Masewera265 News` : "News Article",
    description: a?.excerpt,
  };
}

export default async function NewsSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();

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
            <DemoBadge compact />
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
