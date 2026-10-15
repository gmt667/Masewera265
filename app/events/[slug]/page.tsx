import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock3, MapPin, ShieldCheck } from "lucide-react";
import { events } from "@/lib/demo-data";
import { DataNotice, DemoBadge, TrustBadge } from "@/components/ui";
import { TeamLogo } from "@/components/team-logo";
import { EventTabs } from "@/components/event-tabs";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = events.find((x) => x.slug === slug);
  return {
    title: e ? `${e.home} vs ${e.away} | Masewera265` : "Event Centre",
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = events.find((x) => x.slug === slug);
  if (!e) notFound();

  const scored = e.status === "LIVE" || e.status === "FINAL";

  return (
    <>
      <section className="match-hero">
        <div className="container">
          <div className="match-kicker">
            <span className="sport-pill">{e.sport}</span>
            <span>/</span>
            <Link href={`/competitions/${e.competitionSlug}`}>{e.competition}</Link>
            <span className={`status status-${e.status.toLowerCase()}`}>
              {e.status === "LIVE" && <i />}
              {e.status}
            </span>
          </div>

          <div className="scoreboard">
            <Link href={`/teams/${e.homeSlug}`} className="scoreboard-team">
              <div className="scoreboard-logo">
                <TeamLogo slug={e.homeSlug} name={e.home} size={84} />
              </div>
              <h1>{e.home}</h1>
            </Link>

            <div className="scoreboard-center">
              <span>{e.status}</span>
              <strong>{scored ? `${e.homeScore} â€“ ${e.awayScore}` : e.time}</strong>
              <small>{scored ? (e.status === "LIVE" ? "In Progress" : "Final Score") : "CAT"}</small>
            </div>

            <Link href={`/teams/${e.awaySlug}`} className="scoreboard-team">
              <div className="scoreboard-logo">
                <TeamLogo slug={e.awaySlug} name={e.away} size={84} />
              </div>
              <h2>{e.away}</h2>
            </Link>
          </div>

          <div className="match-details">
            <span>
              <CalendarDays size={16} />
              {e.date}
            </span>
            <span>
              <Clock3 size={16} />
              {e.time} CAT
            </span>
            <Link href={`/venues/${e.venueSlug}`}>
              <MapPin size={16} />
              {e.venue}, {e.location}
            </Link>
          </div>
        </div>
      </section>

      <div className="container page-content">
        <DataNotice />
        <div className="match-layout">
          <div>
            <EventTabs event={e} />
          </div>

          <aside>
            <section className="content-card">
              <h2>Event Information</h2>
              <dl>
                <div>
                  <dt>Sport</dt>
                  <dd>{e.sport}</dd>
                </div>
                <div>
                  <dt>Competition</dt>
                  <dd>{e.competition}</dd>
                </div>
                <div>
                  <dt>Season</dt>
                  <dd>Demonstration season</dd>
                </div>
                <div>
                  <dt>Venue</dt>
                  <dd>{e.venue}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{e.location}</dd>
                </div>
                <div>
                  <dt>Attendance</dt>
                  <dd>{e.attendance ? `${e.attendance} (demo)` : "Unavailable"}</dd>
                </div>
              </dl>
            </section>

            <section className="content-card source-card">
              <h2>
                <ShieldCheck size={18} /> Record Status
              </h2>
              <div style={{ margin: "10px 0" }}>
                <TrustBadge label={e.trust} />
                <DemoBadge compact />
              </div>
              <p>Updated: {e.updated}</p>
              <Link href="/about#trust">Understand verification labels</Link>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}

