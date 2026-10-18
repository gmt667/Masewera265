import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, DataNotice, TrustBadge } from "@/components/ui";
import { DataStatePanel } from "@/components/data-state";
import { TeamLogo } from "@/components/team-logo";
import { publicData } from "@/lib/data-service";

export default async function NationalTeamsPage() {
  const result = await publicData.teams({ participation: "national" });
  const national = result.data.filter((team) => team.isNationalTeam || team.kind === "National team");
  return <><PageHero eyebrow="REPRESENTING MALAWI" title="Malawi National Teams" intro="Independent profiles for Malawi selections across every supported sport, with verified marks used only when an authoritative source is available."/>
    <main className="section container">{result.isDemo && <DataNotice title="Source-aware national team profiles" body="Official marks and identity details are treated separately from fixtures, squads, statistics and histories. Records are labelled by trust level; unverified content is never presented as an authoritative sporting record."/>}
      {national.length ? <div className="team-grid national-grid">{national.map(team => <article className="team-card" key={team.slug}><TeamLogo slug={team.slug} name={team.shortName} size={72}/><div><span className="sport-mini-badge">{team.sport}</span><h2>{team.shortName}</h2><p>{team.about}</p><TrustBadge label={team.trust}/></div><Link href={`/teams/${team.slug}`}>Open team platform <ArrowRight size={16}/></Link></article>)}</div> : <DataStatePanel state={result.state === "ready" ? "empty" : result.state} message={result.message} />}
    </main></>;
}
