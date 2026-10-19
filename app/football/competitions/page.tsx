import Link from "@/src/platform/link";
import { ArrowRight } from "lucide-react";
import { PageHero, DataNotice } from "@/components/ui";
import { TeamLogo } from "@/components/team-logo";
import { footballCompetitions, footballSources } from "@/lib/football-data";

export const metadata = {
  title: "Malawian Football Leagues & Cups Directory | Masewera265",
  description: "Season-aware profiles of Malawian football competitions, including the current FDH Bank Premiership and historical TNM Super League editions.",
};

export default function FootballCompetitionsPage() {
  const superLeague = footballCompetitions.find((c) => c.slug === "tnm-super-league");

  return (
    <div className="football-competitions-page">
      <PageHero
        eyebrow="PYRAMID &amp; TOURNAMENTS"
        title="Malawian Leagues &amp; Cups"
        intro="The structured competition hierarchy of Malawian football — from the current FDH Bank Premiership and prestigious knockout cups down to regional and district grassroots pyramids. Historical sponsor names remain attached to their seasons."
      />

      <main className="container page-content">
        <DataNotice
          title="Season-aware competition architecture"
          body="Competition titles, commercial sponsors, and pyramid tiers are recorded with seasonal context. Current sponsors are never applied retrospectively to historical editions."
        />
        <Link className="button design-primary" href="/football/season/2026-27" style={{ marginBottom: 28 }}>Open 2026/27 FDH Bank Premiership season <ArrowRight size={15} /></Link>

        {/* Featured Super League Section */}
        {superLeague && superLeague.standings && (
          <section className="featured-comp-section">
            <div className="featured-comp-header">
              <div className="comp-title-row">
                <span className="tier-tag">{superLeague.tier}</span>
                <h2>{superLeague.name}</h2>
              </div>
              <p>{superLeague.summary}</p>
              <div className="comp-specs-bar">
                <span>Organizer: <b>{superLeague.organizer}</b></span>
                <span>Established: <b>{superLeague.established}</b></span>
                <span>Current Champion: <b>{superLeague.currentChampion}</b></span>
                <span>Format: <b>{superLeague.format}</b></span>
              </div>
            </div>

            <div className="table-wrap">
              <table className="history-data-table standings-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th colSpan={2}>Club</th>
                    <th>P</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {superLeague.standings.map((team) => (
                    <tr key={team.teamSlug} className={team.rank <= 1 ? "row-champions" : team.rank <= 4 ? "row-caf" : team.rank >= 15 ? "row-relegation" : ""}>
                      <td><b>{team.rank}</b></td>
                      <td className="logo-cell">
                        <TeamLogo slug={team.teamSlug} name={team.team} size={28} />
                      </td>
                      <td>
                        <Link href={`/teams/${team.teamSlug}`} className="team-table-link">
                          <strong>{team.team}</strong>
                        </Link>
                      </td>
                      <td>{team.played}</td>
                      <td>{team.won}</td>
                      <td>{team.drawn}</td>
                      <td>{team.lost}</td>
                      <td>{team.gf}</td>
                      <td>{team.ga}</td>
                      <td>{team.gd > 0 ? `+${team.gd}` : team.gd}</td>
                      <td><b>{team.points}</b></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-zone-legend">
              <span><span className="legend-dot champion" />Champions League spot</span>
              <span><span className="legend-dot caf" />CAF Confederation Cup</span>
              <span><span className="legend-dot relegation" />Relegation zone</span>
            </div>
          </section>
        )}

        {/* All Competitions Grid */}
        <section className="all-comps-section">
          <h2>All Malawian Competitions &amp; Tiers</h2>
          <div className="comps-detailed-grid">
            {footballCompetitions.map((comp) => (
              <article className="comp-card-detailed" key={comp.slug}>
                <div className="card-top">
                  <span className="tier-badge">{comp.tier}</span>
                  <span className="cat-pill">{comp.category}</span>
                </div>
                <h3>{comp.name}</h3>
                <p className="comp-desc">{comp.summary}</p>
                <div className="specs-list">
                  <div><span>Organizer:</span> <b>{comp.organizer}</b></div>
                  <div><span>Format:</span> <b>{comp.format}</b></div>
                  <div><span>Established:</span> <b>{comp.established}</b></div>
                  <div><span>Champion:</span> <b>{comp.currentChampion}</b></div>
                </div>
                <footer className="comp-card-footer">
                  <Link className="button design-primary" href={`/competitions/${comp.slug}`}>
                    View {comp.name} Details <ArrowRight size={14} />
                  </Link>
                </footer>
              </article>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section className="football-sources">
          <h2>Authoritative Verification Sources</h2>
          {footballSources.map((source) => (
            <a href={source.url} target="_blank" rel="noreferrer" key={source.url} className="source-item">
              <div>
                <strong>{source.title}</strong>
                {source.note && <p>{source.note}</p>}
              </div>
              <small>Reviewed {source.reviewed}</small>
            </a>
          ))}
        </section>
      </main>
    </div>
  );
}
