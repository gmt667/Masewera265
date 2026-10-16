import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ShieldCheck, Trophy, ArrowRight } from "lucide-react";
import { athletes, events, teams } from "@/lib/demo-data";
import { DataNotice, EventCard, SectionHeading, TrustBadge } from "@/components/ui";
import { getTeamLogoSource, TeamLogo } from "@/components/team-logo";

const identitySources: Record<string, { label: string; href: string }> = {
  "the-flames": { label: "Football Association of Malawi", href: "https://fam.mw/" },
  "the-scorchers": { label: "Football Association of Malawi", href: "https://fam.mw/" },
  "malawi-queens": { label: "Netball Association of Malawi", href: "https://netballmalawi.com/national-team/malawi_queens/" },
  "malawi-basketball": { label: "FIBA federation directory", href: "https://about.fiba.basketball/en/national-federations/271-malawi" },
  "bravehearts-basketball": { label: "FIBA club profile", href: "https://www.fiba.basketball/en/events/fiba-africa-champions-clubs-road-to-bal-2025/news/meet-the-team-bravehearts-bc" },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const team = teams.find((item) => item.slug === slug);
  return {
    title: team ? `${team.name} | Masewera265` : "Team Profile",
  };
}

export default async function TeamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const team = teams.find((item) => item.slug === slug);
  if (!team) notFound();

  const matches = events.filter((event) => event.homeSlug === slug || event.awaySlug === slug);
  const teamAthletes = athletes.filter((a) => a.teamSlug === slug || a.team.toLowerCase().includes(team.shortName.toLowerCase()));
  const identitySource = identitySources[slug] ?? (team.sourceUrl ? { label: "record source", href: team.sourceUrl } : undefined);
  const logoSource = getTeamLogoSource(team.slug);

  return (
    <>
      <section className="profile-hero">
        <div className="container">
          <div className="large-team-avatar official-logo">
            <TeamLogo slug={team.slug} name={team.name} size={100} />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
              <span className="sport-pill">{team.sport}</span>
              {(team.isNationalTeam || team.kind === "National team") && <span className="national-pill">Malawi National Team</span>}
              <TrustBadge label={team.trust} />
            </div>
            <h1>{team.name}</h1>
            {team.nickname && <p className="profile-nickname">&ldquo;{team.nickname}&rdquo;</p>}
            <p>
              <MapPin size={16} /> {team.location}
              {team.region !== "National" && ` / ${team.region} Region`}
            </p>
          </div>
        </div>
      </section>

      <div className="container page-content">
              <DataNotice
          title={`${team.name} identity page`}
          body={team.logoVerified || team.slug === "malawi-queens" ? "The displayed identity mark is linked to an authoritative source. Event records remain demonstration data." : "The displayed initials are a neutral placeholder, not an official logo. A verified club or federation asset is still required."}
              />

        <div className="profile-grid">
          <div>
            <SectionHeading title="Fixtures & results" />
            {matches.length ? (
              <div className="event-list">
                {matches.map((event) => (
                  <EventCard event={event} key={event.id} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span>▣</span>
                <h3>Fixtures Scheduled</h3>
                <p>New fixtures for the upcoming matchday are being updated.</p>
              </div>
            )}

            {teamAthletes.length > 0 && (
              <div style={{ marginTop: 40 }}>
                <SectionHeading title="Key Squad Athletes" />
                <div className="directory-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
                  {teamAthletes.map((a) => (
                    <Link className="directory-card athlete-card" href={`/athletes/${a.slug}`} key={a.slug}>
                      <span className="number-avatar">{a.number}</span>
                      <div>
                        <h2>{a.name}</h2>
                        <p>{a.role}</p>
                        <small>{a.region} Region</small>
                      </div>
                      <ArrowRight size={16} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside>
            <section className="content-card">
              <h2>About</h2>
              <p>{team.about}</p>
              <dl>
                <div>
                  <dt>Entity type</dt>
                  <dd>{team.isNationalTeam || team.kind === "National team" ? "National selection" : "Club / team"}</dd>
                </div>
                <div>
                  <dt>Sport</dt>
                  <dd>{team.sport}</dd>
                </div>
                {team.division && (
                  <div>
                    <dt>Division</dt>
                    <dd>{team.division}</dd>
                  </div>
                )}
                {team.founded && (
                  <div>
                    <dt>Founded</dt>
                    <dd>{team.founded}</dd>
                  </div>
                )}
                {team.venue && (
                  <div>
                    <dt>Home Ground</dt>
                    <dd>{team.venue}</dd>
                  </div>
                )}
                <div>
                  <dt>Base</dt>
                  <dd>{team.location}</dd>
                </div>
                <div>
                  <dt>Record status</dt>
                  <dd>
                    <ShieldCheck size={14} /> {team.trust}
                  </dd>
                </div>
                {team.completeness && <div><dt>Coverage</dt><dd>{team.completeness}</dd></div>}
                {team.activeStatus && <div><dt>Activity status</dt><dd>{team.activeStatus}</dd></div>}
                {team.sourceReviewedAt && (
                  <div>
                    <dt>Source reviewed</dt>
                    <dd>{team.sourceReviewedAt}</dd>
                  </div>
                )}
              </dl>
              {identitySource && <a className="source-link" href={identitySource.href} target="_blank" rel="noreferrer">Identity source: {identitySource.label}</a>}
              <p className="logo-provenance"><strong>Logo status:</strong> {logoSource}</p>
              {team.sourceNote && <p className="source-note">{team.sourceNote}</p>}
              {team.seasonAffiliations?.length ? <div className="season-affiliations"><h3>Verified season affiliations</h3>{team.seasonAffiliations.map((affiliation) => <p key={`${affiliation.season}-${affiliation.competition}`}><a href={affiliation.sourceUrl} target="_blank" rel="noreferrer">{affiliation.season} · {affiliation.competition}</a></p>)}</div> : null}
            </section>

            {team.honors && team.honors.length > 0 && (
              <section className="content-card">
                <h2>
                  <Trophy size={18} style={{ color: "var(--amber)", marginRight: 8, verticalAlign: "middle" }} />
                  Reported highlights (demo)
                </h2>
                <ul className="honors-list">
                  {team.honors.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </section>
            )}

            <Link className="button primary full" href={`/fixtures?sport=${team.sport.toLowerCase()}`}>
              View {team.sport} Fixtures
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
