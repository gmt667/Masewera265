import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Trophy, Users, Award, MapPin } from "lucide-react";
import { athletes, competitions, events, sports, teams } from "@/lib/demo-data";
import { DataNotice, EventCard, SectionHeading, TrustBadge } from "@/components/ui";
import { TeamLogo } from "@/components/team-logo";
import { SportIcon } from "@/components/sport-icon";
import { FootballHome } from "@/components/football-home";
import { NetballHome } from "@/components/netball-home";
import { BasketballHome } from "@/components/basketball-home";
import { CricketHome } from "@/components/cricket-home";
import { AthleticsHome } from "@/components/athletics-home";
import { VolleyballHome } from "@/components/volleyball-home";
import { BoxingHome } from "@/components/boxing-home";
import { CyclingHome } from "@/components/cycling-home";
import { SwimmingHome } from "@/components/swimming-home";
import { TennisHome } from "@/components/tennis-home";
import { HockeyHome } from "@/components/hockey-home";
import { HandballHome } from "@/components/handball-home";
import { RugbyHome } from "@/components/rugby-home";
import { ChessHome } from "@/components/chess-home";
import { DataStatePanel } from "@/components/data-state";
import { dataMode, publicData } from "@/lib/data-service";

export function generateStaticParams() {
  return sports.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = dataMode === "demo" ? sports.find((x) => x.slug === slug) : undefined;
  return {
    title: s ? `${s.name} Platform | Masewera265` : "Sport Platform",
    description: s?.summary,
  };
}

export default async function SportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (dataMode === "connected") {
    const sportResult = await publicData.sport(slug);
    const connectedSport = sportResult.data[0];
    if (sportResult.state === "empty") notFound();
    if (!connectedSport) return <main className="container page-content"><DataStatePanel state={sportResult.state === "ready" ? "error" : sportResult.state} message={sportResult.message} /></main>;
    const [teamResult, eventResult, competitionResult, athleteResult] = await Promise.all([
      publicData.teams({ sport: connectedSport.name }), publicData.events({ sport: connectedSport.name }),
      publicData.competitions({ sport: connectedSport.name }), publicData.athletes({ sport: connectedSport.name }),
    ]);
    return <>
      <section className={`sport-hero sport-${connectedSport.slug}`}><div className="container"><div className="sport-hero-icon"><SportIcon sport={connectedSport.slug} size={54} /></div><div><p className="eyebrow">CONNECTED SPORT PLATFORM</p><h1>{connectedSport.name} in Malawi</h1><p>{connectedSport.summary}</p></div></div></section>
      <main className="container page-content">
        <section className="sport-sub-section"><SectionHeading title={`${connectedSport.name} teams`} /><div className="directory-grid">{teamResult.data.map((team) => <Link className="directory-card" href={`/teams/${team.slug}`} key={team.slug}><TrustBadge label={team.trust} /><h3>{team.name}</h3><p>{team.location}</p></Link>)}</div></section>
        <section className="sport-sub-section"><SectionHeading title={`${connectedSport.name} events`} /><div className="event-grid">{eventResult.data.map((event) => <EventCard event={event} key={event.id} />)}</div></section>
        <section className="sport-sub-section"><SectionHeading title="Competitions" /><div className="directory-grid">{competitionResult.data.map((competition) => <Link className="directory-card" href={`/competitions/${competition.slug}`} key={competition.slug}><h3>{competition.name}</h3><p>{competition.season}</p></Link>)}</div></section>
        <section className="sport-sub-section"><SectionHeading title="Athletes" /><div className="directory-grid">{athleteResult.data.map((athlete) => <Link className="directory-card" href={`/athletes/${athlete.slug}`} key={athlete.slug}><h3>{athlete.name}</h3><p>{athlete.role}</p></Link>)}</div></section>
      </main>
    </>;
  }
  const sport = sports.find((s) => s.slug === slug);
  if (!sport) notFound();
  if (sport.slug === "football") return <FootballHome />;
  if (sport.slug === "netball") return <NetballHome />;
  if (sport.slug === "basketball") return <BasketballHome />;
  if (sport.slug === "cricket") return <CricketHome />;
  if (sport.slug === "athletics") return <AthleticsHome />;
  if (sport.slug === "volleyball") return <VolleyballHome />;
  if (sport.slug === "boxing") return <BoxingHome />;
  if (sport.slug === "cycling") return <CyclingHome />;
  if (sport.slug === "swimming") return <SwimmingHome />;
  if (sport.slug === "tennis") return <TennisHome />;
  if (sport.slug === "hockey") return <HockeyHome />;
  if (sport.slug === "handball") return <HandballHome />;
  if (sport.slug === "rugby") return <RugbyHome />;
  if (sport.slug === "chess") return <ChessHome />;
  if (sport.availability !== "Functional") return <><section className={`sport-hero sport-${sport.slug}`}><div className="container"><div className="sport-hero-icon"><SportIcon sport={sport.slug} size={54} /></div><div><span className="preview-badge">Forthcoming sport hub</span><p className="eyebrow">PRESERVED MULTI-SPORT ARCHITECTURE</p><h1>{sport.name} in Malawi</h1><p>{sport.summary}</p></div></div></section><main className="container page-content"><DataNotice title={`${sport.name} coverage is forthcoming`} body="Masewera265 is prioritizing the Malawian football experience. This route and its configurable structure are preserved, but authoritative teams, competitions, events and statistics have not been connected."/><div className="preview-columns"><div><span>01</span><h3>Teams & participants</h3><p>Directory structures are ready for verified records.</p></div><div><span>02</span><h3>Events & competitions</h3><p>Sport-specific formats will be added with approved sources.</p></div><div><span>03</span><h3>History & media</h3><p>No archive claims or imagery will be published without review.</p></div></div><div className="coming-next"><h2>Football is the active integration</h2><Link href="/sports/football">Explore Malawian football <ArrowRight/></Link></div></main></>;

  // Filter sport-specific assets
  const sportTeams = teams.filter((t) => t.sport.toLowerCase() === sport.name.toLowerCase());
  const sportEvents = events.filter((e) => e.sport.toLowerCase() === sport.name.toLowerCase());
  const sportCompetitions = competitions.filter((c) => c.sport.toLowerCase() === sport.name.toLowerCase());
  const sportAthletes = athletes.filter((a) => a.sport.toLowerCase() === sport.name.toLowerCase());
  const nationalTeams = sportTeams.filter((t) => t.isNationalTeam);
  const clubTeams = sportTeams.filter((t) => !t.isNationalTeam);

  return (
    <>
      <section className={`sport-hero sport-${sport.slug}`}>
        <div className="container">
          <div className="sport-hero-icon"><SportIcon sport={sport.slug} size={54} /></div>
          <div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
              <span className="functional-badge">Independent sport hub</span>
              {sport.ranking && (
                <span className="sport-hero-rank">
                  <Award size={13} /> {sport.ranking}
                </span>
              )}
            </div>
            <p className="eyebrow">{sport.federation || "National Discipline"}</p>
            <h1>{sport.name} in Malawi</h1>
            <p className="lead">{sport.summary}</p>
            <div className="hero-actions">
              <Link className="button primary" href={`/fixtures?sport=${sport.name.toLowerCase()}`}>
                {sport.name} Fixtures & Results <ArrowRight size={16} />
              </Link>
              <Link className="button ghost-light" href="/teams">
                Browse {sport.name} Teams
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container page-content">
        <DataNotice
          title={`Dedicated ${sport.name} Platform`}
          body={`The ${sport.name} hub connects verified clubs, competitions, fixtures and athletes from official sources. Records with incomplete sourcing are labelled accordingly.`}
        />

        {/* Stats Band */}
        <div className="stats-band">
          <div>
            <Users size={24} />
            <strong>{sportTeams.length || sport.teamsCount || 8}</strong>
            <span>Registered teams</span>
          </div>
          <div>
            <Trophy size={24} />
            <strong>{sportCompetitions.length || 2}</strong>
            <span>Competitions</span>
          </div>
          <div>
            <CalendarDays size={24} />
            <strong>{sportEvents.length || 4}</strong>
            <span>Events</span>
          </div>
        </div>

        {/* National Teams Spotlight (if present) */}
        {nationalTeams.length > 0 && (
          <section className="sport-sub-section">
            <SectionHeading
              eyebrow="National Pride"
              title={`Malawi ${sport.name} selections`}
            />
            <div className="directory-grid national-teams-grid">
              {nationalTeams.map((nt) => (
                <Link
                  className="directory-card team-directory-card national-team-card"
                  href={`/teams/${nt.slug}`}
                  key={nt.slug}
                >
                  <div className="team-avatar official-logo">
                    <TeamLogo slug={nt.slug} name={nt.name} size={72} />
                  </div>
                  <div className="team-card-details">
                    <div className="team-tag-row">
                      <span className="national-pill">National Squad</span>
                      <span className="sport-pill">{nt.sport}</span>
                    </div>
                    <h2>{nt.name}</h2>
                    {nt.nickname && <p className="team-nickname">&ldquo;{nt.nickname}&rdquo;</p>}
                    <p className="team-location">
                      <MapPin size={13} /> {nt.venue || nt.location}
                    </p>
                  </div>
                  <span className="card-arrow">
                    <ArrowRight size={18} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Teams & Clubs Grid */}
        <section className="sport-sub-section">
          <SectionHeading
            eyebrow="Clubs & Academies"
            title={`${sport.name} Clubs`}
            action="All teams directory"
            href={`/teams?sport=${sport.name.toLowerCase()}`}
          />
          {clubTeams.length > 0 ? (
            <div className="directory-grid">
              {clubTeams.map((t) => (
                <Link className="directory-card team-directory-card" href={`/teams/${t.slug}`} key={t.slug}>
                  <div className="team-avatar official-logo">
                    <TeamLogo slug={t.slug} name={t.name} size={64} />
                  </div>
                  <div className="team-card-details">
                    <div className="team-tag-row">
                      <span className="sport-pill">{t.sport}</span>
                      <span className="trust-badge trust-official">{t.trust}</span>
                    </div>
                    <h2>{t.name}</h2>
                    {t.nickname && <p className="team-nickname">&ldquo;{t.nickname}&rdquo;</p>}
                    <p className="team-location">
                      <MapPin size={13} /> {t.location} · {t.region}
                    </p>
                    {t.division && <small className="team-division">{t.division}</small>}
                  </div>
                  <span className="card-arrow">
                    <ArrowRight size={18} />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span><SportIcon sport={sport.slug} size={28} /></span>
              <h3>Affiliated Clubs</h3>
              <p>Explore all registered {sport.name} clubs and regional academies across Malawi.</p>
              <Link className="button secondary" href="/teams">
                View All Teams
              </Link>
            </div>
          )}
        </section>

        {/* Fixtures & Results for this sport */}
        <section className="sport-sub-section">
          <SectionHeading
            eyebrow="Action"
            title={`Upcoming & Recent ${sport.name} Events`}
            action="Full fixtures calendar"
            href={`/fixtures?sport=${sport.name.toLowerCase()}`}
          />
          {sportEvents.length > 0 ? (
            <div className="event-grid">
              {sportEvents.map((e) => (
                <EventCard event={e} key={e.id} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span><CalendarDays size={28} /></span>
              <h3>Fixtures in preparation</h3>
              <p>Match schedules for the upcoming {sport.name} round are being updated.</p>
            </div>
          )}
        </section>

        {/* Competitions */}
        {sportCompetitions.length > 0 && (
          <section className="sport-sub-section">
            <SectionHeading
              eyebrow="Leagues & Tournaments"
              title={`${sport.name} Competitions`}
              action="All competitions"
              href="/competitions"
            />
            <div className="directory-grid">
              {sportCompetitions.map((c, i) => (
                <Link className="directory-card comp-directory-card" href={`/competitions/${c.slug}`} key={c.slug}>
                  <span className={`comp-icon symbol-${i % 3}`}>
                    <Trophy />
                  </span>
                  <div>
                    <h2>{c.name}</h2>
                    <p>
                      {c.season} · {c.scope} · {c.format}
                    </p>
                    <small>{c.organizer}</small>
                  </div>
                  <ArrowRight size={18} />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Athletes in this sport */}
        {sportAthletes.length > 0 && (
          <section className="sport-sub-section">
            <SectionHeading
              eyebrow="Stars of the Sport"
              title={`Featured ${sport.name} Athletes`}
              action="All athletes"
              href="/athletes"
            />
            <div className="directory-grid">
              {sportAthletes.map((a) => (
                <Link className="directory-card athlete-card" href={`/athletes/${a.slug}`} key={a.slug}>
                  <span className="number-avatar">{a.number}</span>
                  <div>
                    <h2>{a.name}</h2>
                    <p>
                      {a.role} · {a.team}
                    </p>
                    <small>{a.region} Region</small>
                  </div>
                  <ArrowRight size={18} />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Rules & Discipline Overview */}
        <section className="content-card" style={{ marginTop: 40, padding: 32 }}>
          <h2 style={{ fontSize: 24, marginBottom: 12 }}>{sport.name} Governance & Format</h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)" }}>
            Governed by the <strong>{sport.federation || "National Federation"}</strong>. The standard match format is{" "}
            <strong>{sport.format}</strong>. Masewera265 guarantees independent, dedicated digital infrastructure for{" "}
            {sport.name}, ensuring matches, standings, statistics, and club profiles receive top-tier spotlighting.
          </p>
        </section>
      </div>
    </>
  );
}
