import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, DataNotice, TrustBadge } from "@/components/ui";
import { TeamLogo } from "@/components/team-logo";
import { teams } from "@/lib/demo-data";

export default function NationalTeamsPage() {
  const national = teams.filter(team => team.isNationalTeam || team.kind === "National team");
  return <><PageHero eyebrow="REPRESENTING MALAWI" title="Malawi National Teams" intro="Independent profiles for Malawi selections across every supported sport, with verified marks used only when an authoritative source is available."/>
    <main className="section container"><DataNotice title="Profile structures with demonstration records" body="Names and marks are treated separately from sample fixtures, squads, statistics and histories. Unverified content is never presented as an authoritative sporting record."/>
      <div className="team-grid national-grid">{national.map(team => <article className="team-card" key={team.slug}><TeamLogo slug={team.slug} name={team.shortName} size={72}/><div><span className="sport-mini-badge">{team.sport}</span><h2>{team.shortName}</h2><p>{team.about}</p><TrustBadge label={team.trust}/></div><Link href={`/teams/${team.slug}`}>Open team platform <ArrowRight size={16}/></Link></article>)}</div>
    </main></>;
}
