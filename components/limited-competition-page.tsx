import Link from "next/link";
import { ArrowRight, CalendarDays, ExternalLink, ShieldAlert, Trophy } from "lucide-react";
import { competitions } from "@/lib/demo-data";
import { DataNotice, PageHero } from "@/components/ui";

const sources = {
  Netball: { label: "Netball Association of Malawi", url: "https://netballmalawi.com/national-team/malawi_queens/" },
  Basketball: { label: "Basketball Association of Malawi / FIBA", url: "https://about.fiba.basketball/en/national-federations/271-malawi" },
} as const;

export function LimitedCompetitionPage({ sport }: { sport: "Netball" | "Basketball" }) {
  const source = sources[sport];
  const records = competitions.filter((competition) => competition.sport === sport);
  return <><PageHero eyebrow={`${sport.toUpperCase()} COMPETITIONS`} title={`${sport} leagues and tournaments`} intro={`A source-aware directory for Malawian ${sport.toLowerCase()} competitions, with season context kept separate from current live data.`}/><main className="container page-content"><DataNotice title={`Limited ${sport.toLowerCase()} competition coverage`} body="Competition identities and formats are directory records. Current standings, fixtures, results and award tables remain unavailable unless a dated organizer source or connected backend supplies them."/><div className="directory-grid">{records.map((record)=><article className="content-card" key={record.slug}><div className="team-tag-row"><span className="sport-pill">{record.sport}</span><span className="preview-badge">{record.trust}</span></div><h2>{record.name}</h2><p>{record.scope} · {record.season}</p><dl><div><dt>Organizer</dt><dd>{record.organizer}</dd></div><div><dt>Format</dt><dd>{record.format}</dd></div><div><dt>Participants</dt><dd>{record.teams}</dd></div></dl><div className="unavailable-field compact"><ShieldAlert size={18}/><strong>Live table unavailable</strong><small>No authoritative season results are connected.</small></div><Link className="text-link" href={`/competitions/${record.slug}`}>Open competition record <ArrowRight size={15}/></Link></article>)}</div>{!records.length&&<div className="empty-state"><Trophy/><h2>No sourced competition records yet</h2><p>Submit an organizer source to expand this hub.</p></div>}<section className="content-card"><h2>Federation source</h2><p>Competition records should be cross-checked against the governing body before publication.</p><a className="source-link" href={source.url} target="_blank" rel="noreferrer">{source.label} <ExternalLink size={14}/></a><small className="source-reviewed"><CalendarDays size={13}/> Review current season sources before publishing</small></section></main></>;
}
