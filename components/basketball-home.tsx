import Link from "next/link";
import { ArrowRight, BarChart3, CalendarDays, ShieldCheck, Trophy, Users } from "lucide-react";
import { teams, athletes, competitions, events } from "@/lib/demo-data";
import { DataNotice, EventCard, SectionHeading, TrustBadge } from "@/components/ui";
import { TeamLogo } from "@/components/team-logo";
import { SportIcon } from "@/components/sport-icon";

export function BasketballHome() {
  const clubs = teams.filter((team) => team.sport === "Basketball" && !team.isNationalTeam);
  const bravehearts = teams.find((team) => team.slug === "bravehearts-basketball");
  const basketballEvents = events.filter((event) => event.sport === "Basketball");
  const basketballCompetitions = competitions.filter((competition) => competition.sport === "Basketball");
  const basketballAthletes = athletes.filter((athlete) => athlete.sport === "Basketball");
  return <>
    <section className="sport-hero sport-basketball"><div className="container"><div className="sport-hero-icon"><SportIcon sport="basketball" size={54} /></div><div><span className="functional-badge">Independent limited hub</span><p className="eyebrow">BASKETBALL ASSOCIATION OF MALAWI</p><h1>Basketball in Malawi</h1><p className="lead">A dedicated platform for Bravehearts, domestic clubs, BASMAL competitions and Malawi’s basketball community.</p><div className="hero-actions"><Link className="button primary" href="/teams/bravehearts-basketball">Explore Bravehearts <ArrowRight size={16}/></Link><Link className="button ghost-light" href="/fixtures?sport=basketball">Basketball fixtures <CalendarDays size={16}/></Link></div></div></div></section>
    <main className="container page-content"><DataNotice title="Limited source-aware basketball coverage" body="FIBA-sourced Bravehearts identity and selected directory records are available. Current rosters, BASMAL standings, player statistics and live results remain unavailable without connected federation or competition feeds."/>
      {bravehearts && <section className="content-card national-feature-card"><div className="team-avatar official-logo"><TeamLogo slug={bravehearts.slug} name={bravehearts.name} size={84}/></div><div><p className="eyebrow">FEATURED CLUB</p><h2>{bravehearts.name}</h2><p>{bravehearts.about}</p><TrustBadge label={bravehearts.trust}/><Link className="text-link" href={`/teams/${bravehearts.slug}`}>Open sourced identity profile <ArrowRight size={15}/></Link></div></section>}
      <section className="sport-sub-section"><SectionHeading eyebrow="CLUB DIRECTORY" title="Basketball clubs" action="Browse all teams" href="/teams?sport=basketball"/><div className="directory-grid">{clubs.map((club)=><Link className="directory-card team-directory-card" href={`/teams/${club.slug}`} key={club.slug}><div className="team-avatar"><TeamLogo slug={club.slug} name={club.name} size={54}/></div><div><h3>{club.name}</h3><p>{club.location} · {club.region} Region</p><small>{club.completeness ?? "Directory record"}</small></div><ArrowRight size={17}/></Link>)}</div></section>
      <section className="stats-band"><div><Users/><strong>{clubs.length}</strong><span>Directory clubs</span></div><div><Trophy/><strong>{basketballCompetitions.length}</strong><span>Competition records</span></div><div><CalendarDays/><strong>{basketballEvents.length}</strong><span>Labelled events</span></div></section>
      <section className="sport-sub-section"><SectionHeading eyebrow="FIXTURES & RESULTS" title="Basketball events" action="Full calendar" href="/fixtures?sport=basketball"/>{basketballEvents.length ? <div className="event-grid">{basketballEvents.map((event)=><EventCard event={event} key={event.id}/>)}</div> : <div className="empty-state"><h3>Connected basketball fixtures unavailable</h3><p>No current event feed is connected.</p></div>}</section><Link className="button secondary" href="/basketball/competitions">Explore basketball competitions <ArrowRight size={15}/></Link>
      <section className="content-card unavailable-field"><span>—</span><BarChart3/><h2>Standings and player statistics unavailable</h2><p>{basketballAthletes.length} directory athlete records exist, but no complete compatible season dataset is published.</p><Link className="button secondary" href="/about#data-modes">Review data modes <ArrowRight size={15}/></Link></section>
      <p className="source-note"><ShieldCheck size={14}/> Identity source: <a href="https://www.fiba.basketball/en/events/fiba-africa-champions-clubs-road-to-bal-2025/news/meet-the-team-bravehearts-bc" target="_blank" rel="noreferrer">FIBA Bravehearts club profile</a></p>
    </main>
  </>;
}
