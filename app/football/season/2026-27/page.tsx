import Link from "next/link";
import { ArrowRight, CalendarDays, ExternalLink, ShieldAlert, Users } from "lucide-react";
import { DataNotice, PageHero } from "@/components/ui";
import { currentFootballSeason } from "@/lib/football-season";
import { teams } from "@/lib/demo-data";

export const metadata = {
  title: "FDH Bank Premiership 2026/27 | Masewera265",
  description: "Season-aware coverage of Malawi's current FDH Bank Premiership season.",
};

export default function CurrentFootballSeasonPage() {
  const linkedClubs = currentFootballSeason.clubs.map((name) => teams.find((team) => team.name.includes(name) || name.includes(team.name.replace(" FC", ""))));
  return <>
    <PageHero eyebrow="CURRENT FOOTBALL SEASON" title="FDH Bank Premiership 2026/27" intro="The current sponsor-era top-flight season, kept separate from historical TNM Super League editions." />
    <main className="container page-content">
      <DataNotice title="Verified season metadata, unavailable live feed" body="FAM's season announcement verifies the competition name, sponsor and opening dates. Standings, current squads, fixtures and results are not connected here and are not copied from the previous TNM-era demo season." />
      <section className="content-card season-overview-card">
        <div className="season-meta-grid"><div><CalendarDays/><span>Season</span><strong>{currentFootballSeason.season}</strong></div><div><Users/><span>Licensed club list</span><strong>{currentFootballSeason.clubs.length} names</strong></div><div><ShieldAlert/><span>Feed status</span><strong>Unavailable</strong></div></div>
        <dl><div><dt>Organizer</dt><dd>{currentFootballSeason.organizer}</dd></div><div><dt>Kick-off</dt><dd>{currentFootballSeason.kickoff}</dd></div><div><dt>Opening event</dt><dd>{currentFootballSeason.openingEvent}</dd></div><div><dt>Current champion</dt><dd>Not applicable until this season is completed</dd></div></dl>
        <a className="source-link" href={currentFootballSeason.sourceUrl} target="_blank" rel="noreferrer">Open FAM season announcement <ExternalLink size={14}/></a><small className="source-reviewed">Reviewed {currentFootballSeason.reviewedAt}</small>
      </section>
      <section className="content-card"><div className="section-heading-row"><div><p className="eyebrow">PARTICIPATION COVERAGE</p><h2>Clubs named in the season source</h2></div><span className="partial-badge">Partial directory links</span></div><p className="muted">The source names these clubs for the season context. A linked profile does not imply that its squad, crest, venue or current results are fully verified.</p><div className="directory-grid season-club-grid">{currentFootballSeason.clubs.map((name, index) => { const club = linkedClubs[index]; return club ? <Link className="directory-card" href={`/teams/${club.slug}`} key={name}><h3>{name}</h3><small>Open partial club record</small><ArrowRight size={16}/></Link> : <article className="directory-card" key={name}><h3>{name}</h3><small>Source-listed · profile pending</small></article>; })}</div></section>
      <section className="content-card unavailable-field"><span>—</span><h2>Standings, fixtures and results unavailable</h2><p>Connect an approved FAM, SULOM or normalized backend feed before publishing current-season sporting outcomes.</p><Link className="button secondary" href="/football/coverage">Review coverage matrix <ArrowRight size={15}/></Link></section>
    </main>
  </>;
}
