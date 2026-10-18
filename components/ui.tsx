import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, MapPin, Search } from "lucide-react";
import type { EventRecord, TrustLabel } from "@/lib/types";
import { TeamLogo } from "./team-logo";

export function DemoBadge({ compact }: { compact?: boolean } = {}) {
  return <span className={`demo-badge ${compact ? "compact" : ""}`}>Demo data</span>;
}

export function PreviewBadge() {
  return <span className="preview-badge">Preview</span>;
}

export function TrustBadge({ label }: { label: TrustLabel }) {
  return <span className={`trust-badge trust-${label.toLowerCase()}`}>{label}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  action,
  href,
}: {
  eyebrow?: string;
  title: string;
  action?: string;
  href?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p>{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {action && href && (
        <Link href={href}>
          {action}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead">{intro}</p>
        {children}
      </div>
    </section>
  );
}

export function EventCard({ event }: { event: EventRecord }) {
  const score = event.status === "FINAL" || event.status === "LIVE";
  return (
    <article className="event-card">
      <div className="event-top">
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span className="sport-mini-badge">{event.sport}</span>
          <Link href={`/competitions/${event.competitionSlug}`}>{event.competition}</Link>
        </div>
        <span className={`status status-${event.status.toLowerCase()}`}>
          {event.status === "LIVE" && <i />}
          {event.status}
        </span>
      </div>
      <div className="event-teams">
        <Link href={`/teams/${event.homeSlug}`} className="team-col-link">
          <TeamLogo slug={event.homeSlug} name={event.home} size={44} />
          <b>{event.home}</b>
        </Link>
        <div className="event-score">
          {score ? (
            <strong>
              {event.homeScore} <i>–</i> {event.awayScore}
            </strong>
          ) : (
            <>
              <strong>{event.time}</strong>
              <small>CAT</small>
            </>
          )}
        </div>
        <Link href={`/teams/${event.awaySlug}`} className="team-col-link">
          <TeamLogo slug={event.awaySlug} name={event.away} size={44} />
          <b>{event.away}</b>
        </Link>
      </div>
      <div className="event-meta">
        <span>
          <CalendarDays size={14} />
          {event.date}
        </span>
        <span>
          <MapPin size={14} />
          {event.venue}, {event.location}
        </span>
      </div>
      <div className="event-bottom">
        <div>
          <TrustBadge label={event.trust} />
          <DemoBadge compact />
        </div>
        <Link href={`/events/${event.slug}`}>
          Event centre <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}

export function DataNotice({
  title = "Coverage notes",
  body = "Some records on this page are sourced from verified publications. Unverified entries are labelled accordingly and are not presented as official sporting records.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <div className="data-notice">
      <DemoBadge />
      <div>
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
    </div>
  );
}

export function EmptyState({ onReset }: { onReset?: () => void }) {
  return (
    <div className="empty-state">
      <span><Search size={24} /></span>
      <h3>No matching records</h3>
      <p>Try changing the filters or clearing your search.</p>
      {onReset && (
        <button className="button secondary" onClick={onReset}>
          Clear filters
        </button>
      )}
    </div>
  );
}

export function TimeNote() {
  return (
    <p className="time-note">
      <Clock3 size={14} /> All times are shown in Central Africa Time (CAT / Africa/Blantyre).
    </p>
  );
}
