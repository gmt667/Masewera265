import { Suspense } from "react";
import { HomeExperience } from "@/components/home-experience";
import Link from "@/src/platform/link";
import { DataStatePanel } from "@/components/data-state";
import { EventCard, PageHero, TrustBadge } from "@/components/ui";
import { dataMode, publicData } from "@/lib/data-service";

export const metadata = {
  title: "Masewera265 | Malawi's Digital Home for Sport",
  description:
    "Every sport. Every community. Explore Malawian football, netball, basketball, athletics, fixtures, results, national teams, and sports hubs.",
};

export default async function HomePage() {
  if (dataMode === "connected") {
    const [eventResult, teamResult, newsResult] = await Promise.all([
      publicData.events({ pageSize: 6 }), publicData.teams({ pageSize: 6 }), publicData.news({ pageSize: 3 }),
    ]);
    const failure = [eventResult, teamResult, newsResult].find((result) => result.state === "unavailable" || result.state === "error");
    return <>
      <PageHero eyebrow="CONNECTED PUBLIC DATA" title="Malawi's Digital Home for Sport" intro="Current public records from the configured Masewera265 data service." />
      <div className="container page-content">
        {failure ? <DataStatePanel state={failure.state === "ready" ? "error" : failure.state} message={failure.message} /> : <>
          <section className="sport-sub-section"><h2>Events</h2><div className="event-grid">{eventResult.data.map((event) => <EventCard event={event} key={event.id} />)}</div></section>
          <section className="sport-sub-section"><h2>Teams</h2><div className="directory-grid">{teamResult.data.map((team) => <Link className="directory-card" href={`/teams/${team.slug}`} key={team.slug}><TrustBadge label={team.trust} /><h3>{team.name}</h3><p>{team.sport} · {team.location}</p></Link>)}</div></section>
          <section className="sport-sub-section"><h2>News</h2><div className="directory-grid">{newsResult.data.map((article) => <Link className="directory-card" href={`/news/${article.slug}`} key={article.slug}><h3>{article.title}</h3><p>{article.published}</p></Link>)}</div></section>
        </>}
      </div>
    </>;
  }
  return (
    <Suspense fallback={<div className="design-home-loading" style={{ minHeight: "80vh" }} />}>
      <HomeExperience />
    </Suspense>
  );
}
