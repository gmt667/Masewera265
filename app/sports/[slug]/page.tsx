import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Trophy, Users, Award, MapPin } from "lucide-react";
import { athletes, competitions, events, sports, teams } from "@/lib/demo-data";
import { DataNotice, EventCard, SectionHeading } from "@/components/ui";
import { TeamLogo } from "@/components/team-logo";
import { FootballHome } from "@/components/football-home";

export function generateStaticParams() {
  return sports.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = sports.find((x) => x.slug === slug);
  return {
    title: s ? `${s.name} Platform | Masewera265` : "Sport Platform",
    description: s?.summary,
  };
}

export default async function SportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sport = sports.find((s) => s.slug === slug);
  if (!sport) notFound();
  if (sport.slug === "football") return <FootballHome />;
  if (sport.availability !== "Functional") return <><section className={`sport-hero sport-${sport.slug}`}><div className="container"><div className="sport-hero-icon">{sport.icon}</div><div><span className="preview-badge">Forthcoming sport hub</span><p className="eyebrow">PRESERVED MULTI-SPORT ARCHITECTURE</p><h1>{sport.name} in Malawi</h1><p>{sport.summary}</p></div></div></section><main className="container page-content"><DataNotice title={`${sport.name} coverage is forthcoming`} body="Masewera265 is prioritizing the Malawian football experience. This route and its configurable structure are preserved, but authoritative teams, competitions, events and statistics have not been connected."/><div className="preview-columns"><div><span>01</span><h3>Teams & participants</h3><p>Directory structures are ready for verified records.</p></div><div><span>02</span><h3>Events & competitions</h3><p>Sport-specific formats will be added with approved sources.</p></div><div><span>03</span><h3>History & media</h3><p>No archive claims or imagery will be published without review.</p></div></div><div className="coming-next"><h2>Football is the active integration</h2><Link href="/sports/football">Explore Malawian football <ArrowRight/></Link></div></main></>;

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
          <div className="sport-hero-icon">{sport.icon}</div>
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
          body={`This ${sport.name} hub uses labelled demonstration records. Team identities, fixtures, totals and competition data are not official unless a record explicitly identifies an authoritative source.`}
        />

        {/* Stats Band */}
        <div className="stats-band">
          <div>
            <Users size={24} />
            <strong>{sportTeams.length || sport.teamsCount || 8}</strong>
            <span>Demo team records</span>
          </div>
          <div>
            <Trophy size={24} />
            <strong>{sportCompetitions.length || 2}</strong>
            <span>Demo competitions</span>
          </div>
          <div>
            <CalendarDays size={24} />
            <strong>{sportEvents.length || 4}</strong>
            <span>Demo events</span>
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
                      <span className="national-pill">🇲🇼 National Squad</span>
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
              <span>{sport.icon}</span>
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
              <span>📅</span>
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
