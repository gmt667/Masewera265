import Link from "@/src/platform/link";
import { ArrowRight, CalendarDays, ShieldCheck, Trophy, Users } from "lucide-react";
import { teams, athletes, competitions, events } from "@/lib/demo-data";
import { DataNotice, EventCard, SectionHeading, TrustBadge } from "@/components/ui";
import { TeamLogo } from "@/components/team-logo";
import { SportIcon } from "@/components/sport-icon";

export function NetballHome() {
  const clubs = teams.filter((team) => team.sport === "Netball" && !team.isNationalTeam);
  const queens = teams.find((team) => team.slug === "malawi-queens");
  const netballEvents = events.filter((event) => event.sport === "Netball");
  const netballCompetitions = competitions.filter((competition) => competition.sport === "Netball");
  const netballAthletes = athletes.filter((athlete) => athlete.sport === "Netball");
  return <>
    <section className="sport-hero sport-netball"><div className="container"><div className="sport-hero-icon"><SportIcon sport="netball" size={54} /></div><div><span className="functional-badge">Independent limited hub</span><p className="eyebrow">NETBALL ASSOCIATION OF MALAWI</p><h1>Netball in Malawi</h1><p className="lead">A dedicated home for the Malawi Queens, domestic clubs, competitions and the next generation of players.</p><div className="hero-actions"><Link className="button primary" href="/teams/malawi-queens">Explore the Queens <ArrowRight size={16}/></Link><Link className="button ghost-light" href="/fixtures?sport=netball">Netball fixtures <CalendarDays size={16}/></Link></div></div></div></section>
    <main className="container page-content"><DataNotice title="Limited source-aware netball coverage" body="The Queens identity and selected directory records are available. Current squads, rankings, results and statistics remain unavailable unless a dated NAM or competition source supports them. Demonstration fixtures are labelled."/>
      {queens && <section className="content-card national-feature-card"><div className="team-avatar official-logo"><TeamLogo slug={queens.slug} name={queens.name} size={84}/></div><div><p className="eyebrow">MALAWI NATIONAL SELECTION</p><h2>{queens.name}</h2><p>{queens.about}</p><TrustBadge label={queens.trust}/><Link className="text-link" href={`/teams/${queens.slug}`}>Open verified identity profile <ArrowRight size={15}/></Link></div></section>}
      <section className="sport-sub-section"><SectionHeading eyebrow="CLUB DIRECTORY" title="Netball clubs" action="Browse all teams" href="/teams?sport=netball"/><div className="directory-grid">{clubs.map((club)=><Link className="directory-card team-directory-card" href={`/teams/${club.slug}`} key={club.slug}><div className="team-avatar"><TeamLogo slug={club.slug} name={club.name} size={54}/></div><div><h3>{club.name}</h3><p>{club.location} · {club.region} Region</p><small>{club.completeness ?? "Directory record"}</small></div><ArrowRight size={17}/></Link>)}</div></section>
      <section className="stats-band"><div><Users/><strong>{clubs.length}</strong><span>Directory clubs</span></div><div><Trophy/><strong>{netballCompetitions.length}</strong><span>Competition records</span></div><div><CalendarDays/><strong>{netballEvents.length}</strong><span>Labelled events</span></div></section>
      <section className="sport-sub-section"><SectionHeading eyebrow="FIXTURES & RESULTS" title="Netball events" action="Full calendar" href="/fixtures?sport=netball"/>{netballEvents.length ? <div className="event-grid">{netballEvents.map((event)=><EventCard event={event} key={event.id}/>)}</div> : <div className="empty-state"><h3>Connected netball fixtures unavailable</h3><p>No current event feed is connected.</p></div>}</section><Link className="button secondary" href="/netball/competitions">Explore netball competitions <ArrowRight size={15}/></Link>
      <section className="content-card unavailable-field"><span>—</span><h2>Player statistics and rankings unavailable</h2><p>{netballAthletes.length} directory athlete records exist, but no complete compatible season dataset is published.</p><Link className="button secondary" href="/football/coverage">Review data coverage model <ArrowRight size={15}/></Link></section>
      <p className="source-note"><ShieldCheck size={14}/> Identity source: <a href="https://netballmalawi.com/national-team/malawi_queens/" target="_blank" rel="noreferrer">Netball Association of Malawi · Malawi Queens</a></p>
    </main>
  </>;
}
