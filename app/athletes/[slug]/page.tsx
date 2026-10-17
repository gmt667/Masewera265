import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, MapPin } from "lucide-react";
import { athletes } from "@/lib/demo-data";
import { DataNotice, TrustBadge } from "@/components/ui";

export function generateStaticParams() {
  return athletes.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const athlete = athletes.find((item) => item.slug === slug);
  return {
    title: athlete ? `${athlete.name} (${athlete.team}) | Masewera265` : "Athlete Profile",
  };
}

export default async function AthletePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const athlete = athletes.find((item) => item.slug === slug);
  if (!athlete) notFound();
  const sourced = Boolean(athlete.sourceUrl);

  return <>
    <section className="profile-hero"><div className="container"><span className="athlete-silhouette">{athlete.number}</span><div><p className="eyebrow">{athlete.sport} · Athlete profile</p><h1>{athlete.name}</h1><p>{athlete.role} · <Link href={`/teams/${athlete.teamSlug}`}>{athlete.team}</Link></p><TrustBadge label={athlete.trust}/></div></div></section>
    <div className="container page-content">
      <DataNotice title={sourced ? "Partially sourced athlete record" : "Athlete directory record"} body={sourced ? "Only the dated affiliations and identity details supported by the linked source are verified. Current club, squad number, biography and career totals remain unavailable unless separately sourced." : "This profile has no record-level authoritative source linked yet. Identity details are listed for directory purposes only and must not be treated as a current roster or statistical profile."} />
      <div className="profile-grid"><div>
        <section className="content-card"><h2>Season-specific affiliations</h2>{athlete.affiliations?.length ? athlete.affiliations.map((item) => <article className="affiliation-row" key={`${item.season}-${item.team}`}><div><strong>{item.team}</strong><p>{item.season}</p></div><a href={item.sourceUrl} target="_blank" rel="noreferrer">Evidence <ExternalLink size={14}/></a></article>) : <div className="unavailable-field"><span>—</span><h3>Affiliation history unavailable</h3><p>No season-specific affiliation records have been verified for this profile.</p></div>}</section>
        <section className="content-card"><h2>Published performances</h2><div className="unavailable-field"><span>—</span><h3>Comparable statistics unavailable</h3><p>No complete sourced season dataset supports appearances, starts, minutes, goals or assists. Values are not estimated.</p></div></section>
        <section className="content-card"><h2>Biography and career history</h2><div className="unavailable-field"><span>—</span><h3>Detailed biography pending</h3><p>Birth details, education, full transfer history, honours and career totals require athlete, club, federation or competition sources.</p></div></section>
      </div><aside><section className="content-card"><h2>Profile</h2><dl><div><dt>Role</dt><dd>{athlete.role}</dd></div><div><dt>Directory affiliation</dt><dd><Link href={`/teams/${athlete.teamSlug}`}>{athlete.team}</Link></dd></div><div><dt>Region</dt><dd><MapPin size={14}/> {athlete.region}</dd></div><div><dt>Displayed number</dt><dd>{athlete.number} <small>(not asserted current)</small></dd></div><div><dt>Coverage</dt><dd>{athlete.completeness ?? "Partial"}</dd></div>{athlete.sourceReviewedAt&&<div><dt>Source reviewed</dt><dd>{athlete.sourceReviewedAt}</dd></div>}</dl>{athlete.sourceUrl&&<a className="source-link" href={athlete.sourceUrl} target="_blank" rel="noreferrer">Open record source <ExternalLink size={14}/></a>}{athlete.sourceNote&&<p className="source-note">{athlete.sourceNote}</p>}</section></aside></div>
    </div>
  </>;
}
