import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Award, ShieldCheck, Trophy } from "lucide-react";
import { competitions } from "@/lib/demo-data";
import { footballCompetitions, historicalChampions } from "@/lib/football-data";
import { DataNotice, EventCard, SectionHeading, TrustBadge } from "@/components/ui";
import { SportIcon } from "@/components/sport-icon";
import { DataStatePanel } from "@/components/data-state";
import { dataMode, publicData } from "@/lib/data-service";

export function generateStaticParams() {
  const allComps = [...competitions, ...footballCompetitions];
  const seen = new Set<string>();
  const params: { slug: string }[] = [];
  for (const c of allComps) {
    if (!seen.has(c.slug)) {
      seen.add(c.slug);
      params.push({ slug: c.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = dataMode === "demo" ? (
    competitions.find((x) => x.slug === slug) || footballCompetitions.find((x) => x.slug === slug)
  ) : undefined;
  return {
    title: c ? `${c.name} | Masewera265` : "Competition Profile",
  };
}

export default async function CompetitionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const competitionResult = dataMode === "connected" ? await publicData.competition(slug) : null;
  const c = dataMode === "demo"
    ? competitions.find((x) => x.slug === slug) || footballCompetitions.find((x) => x.slug === slug)
    : competitionResult?.data[0];

  if (competitionResult?.state === "empty" || (dataMode === "demo" && !c)) notFound();
  if (!c) return <main className="container page-content"><DataStatePanel state={competitionResult?.state === "ready" || !competitionResult ? "error" : competitionResult.state} message={competitionResult?.message} /></main>;

  const footballDetail = dataMode === "demo" ? footballCompetitions.find((x) => x.slug === slug) : undefined;
  const eventResult = await publicData.events({ competition: slug });
  const matches = eventResult.data.filter((e) => e.competitionSlug === slug);
  const relevantChampions = historicalChampions.filter(
    (h) =>
      h.competition.toLowerCase().includes(c.name.toLowerCase()) ||
      c.name.toLowerCase().includes(h.competition.toLowerCase()) ||
      (slug === "tnm-super-league" && h.competition.includes("Super League"))
  );

  return (
    <div className="competition-detail-page">
      <section className="profile-hero competition-profile">
        <div className="container">
          <span className="large-team-avatar official-logo">
            <Trophy size={48} />
          </span>
          <div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
              <span className="sport-pill">{"sport" in c ? c.sport : "Football"}</span>
              {footballDetail && <span className="national-pill">{footballDetail.tier}</span>}
              <TrustBadge label={"trust" in c ? c.trust : "Verified"} />
            </div>
            <h1>{c.name}</h1>
            <p className="comp-hero-sub">
              Organized by <b>{"organizer" in c ? c.organizer : "SULOM / FAM"}</b> · {"format" in c ? c.format : "Championship"}
            </p>
          </div>
        </div>
      </section>

      <div className="container page-content">
        {dataMode === "demo" && <DataNotice
          title={`${c.name} competition record`}
          body="League standings, tournament structures, and historical champions are referenced against official FAM, SULOM, and governing body publications."
        />}

        <div className="profile-grid">
          <div>
            {/* Standings Table if available */}
            {footballDetail?.standings && (
              <section className="content-card" style={{ marginBottom: 35 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div>
                    <p className="eyebrow">2025/26 SEASON TABLE</p>
                    <h2 style={{ margin: 0 }}>Current Standings</h2>
                  </div>
                  <span className="trust-badge trust-official">Official SULOM Standings</span>
                </div>

                <div className="table-wrap">
                  <table className="history-data-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Club</th>
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
                      {footballDetail.standings.map((row) => (
                        <tr key={row.teamSlug}>
                          <td><b>{row.rank}</b></td>
                          <td>
                            <Link href={`/teams/${row.teamSlug}`} className="team-table-link">
                              <strong>{row.team}</strong>
                            </Link>
                          </td>
                          <td>{row.played}</td>
                          <td>{row.won}</td>
                          <td>{row.drawn}</td>
                          <td>{row.lost}</td>
                          <td>{row.gf}</td>
                          <td>{row.ga}</td>
                          <td>{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                          <td><b>{row.points}</b></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: 14, fontSize: 11, color: "var(--muted)", display: "flex", flexDirection: "column", gap: 4 }}>
                  <span>• <b>1st Place:</b> Qualifies for CAF Champions League preliminary rounds</span>
                  <span>• <b>Top 8:</b> Qualifies for the subsequent Airtel Top 8 knockout cup</span>
                  <span>• <b>Bottom 3:</b> Relegated to the National Division League (Tier 2)</span>
                </div>
              </section>
            )}

            {/* Competition Events */}
            <section style={{ marginBottom: 35 }}>
              <SectionHeading title="Recent & Upcoming Fixtures" />
              {matches.length ? (
                <div className="event-list">
                  {matches.map((e) => (
                    <EventCard event={e} key={e.id} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <span><SportIcon sport={(c && "sport" in c ? c.sport : "football")} size={28} /></span>
                  <h3>Scheduled matchday in preparation</h3>
                  <p>Official match schedules will appear following publication by the competition committee.</p>
                </div>
              )}
            </section>

            {/* Historical Champions Roll of Honour */}
            {relevantChampions.length > 0 && (
              <section className="content-card">
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <Award size={20} color="var(--amber)" />
                  <h2 style={{ margin: 0 }}>Historical Roll of Honour</h2>
                </div>
                <div className="table-wrap">
                  <table className="history-data-table">
                    <thead>
                      <tr>
                        <th>Season</th>
                        <th>Champion</th>
                        <th>Runner-Up</th>
                        <th>Top Scorer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {relevantChampions.map((ch, idx) => (
                        <tr key={idx}>
                          <td><b>{ch.season}</b></td>
                          <td><strong className="text-teal">{ch.champion}</strong></td>
                          <td>{ch.runnerUp}</td>
                          <td>{ch.topScorer || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </div>

          <aside>
            <section className="content-card">
              <h2>Competition Info</h2>
              <dl>
                <div>
                  <dt>Format</dt>
                  <dd>{footballDetail ? footballDetail.format : ("format" in c ? c.format : "Round-Robin")}</dd>
                </div>
                <div>
                  <dt>Pyramid Tier</dt>
                  <dd>{footballDetail ? footballDetail.tier : ("scope" in c ? c.scope : "National")}</dd>
                </div>
                {footballDetail?.established && (
                  <div>
                    <dt>Established</dt>
                    <dd>{footballDetail.established}</dd>
                  </div>
                )}
                {footballDetail?.currentChampion && (
                  <div>
                    <dt>Reigning Champion</dt>
                    <dd><b>{footballDetail.currentChampion}</b></dd>
                  </div>
                )}
                {footballDetail?.sponsor && <div><dt>Current sponsor</dt><dd>{footballDetail.sponsor} · {footballDetail.season}</dd></div>}
                {footballDetail?.historicalNames && <div><dt>Historical sponsor names</dt><dd>{footballDetail.historicalNames.map((item) => `${item.name} (${item.period})`).join("; ")}</dd></div>}
                {footballDetail?.sourceUrl && <div><dt>Current naming source</dt><dd><a href={footballDetail.sourceUrl} target="_blank" rel="noreferrer">FAM announcement</a> · reviewed {footballDetail.reviewedAt}</dd></div>}
                <div>
                  <dt>Governing Body</dt>
                  <dd>{footballDetail ? footballDetail.organizer : ("organizer" in c ? c.organizer : "SULOM / FAM")}</dd>
                </div>
                <div>
                  <dt>Verification</dt>
                  <dd><ShieldCheck size={14} /> {"trust" in c ? c.trust : "Verified"}</dd>
                </div>
              </dl>
            </section>

            <section className="content-card">
              <h2>Rules &amp; Tiebreakers</h2>
              <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--muted)" }}>
                Standings in Malawian league competitions are decided by: (1) Total Points, (2) Goal Difference, (3) Goals Scored, (4) Head-to-Head record between tied clubs, (5) Playoff match if deciding championship or relegation.
              </p>
            </section>

            <Link className="button primary full" href="/football/competitions">
              View All Leagues &amp; Cups <ArrowRight size={14} />
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
