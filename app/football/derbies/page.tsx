import Link from "@/src/platform/link";
import { ArrowRight, MapPin } from "lucide-react";
import { footballDerbies } from "@/lib/football-data";
import { DataNotice } from "@/components/ui";

export const metadata = {
  title: "Malawian Football Derbies & Rivalries | Masewera265",
  description: "The Blantyre Derby, Lilongwe Derby, Forces Derby, and iconic football rivalries across Malawi with documented head-to-head records.",
};

export default function FootballDerbiesPage() {
  return (
    <div className="football-derbies-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">PASSION &amp; HERITAGE</p>
          <h1>Malawian Football Derbies</h1>
          <p className="lead">
            The historic clashes, cultural divisions, and intense rivalries that define football passion across Blantyre, Lilongwe, Mzuzu, and the barracks.
          </p>
        </div>
      </section>

      <main className="container page-content">
        <DataNotice
          title="Derby records and head-to-head context"
          body="Head-to-head records reflect official league, cup, and documented championship fixtures since 1969. Friendly matches and unrecorded regional games are excluded from competitive tallies."
        />

        <div className="derbies-list">
          {footballDerbies.map((derby) => (
            <article className="derby-full-card" key={derby.slug}>
              <div className="derby-card-header">
                <div>
                  <span className="derby-location-tag">
                    <MapPin size={13} /> {derby.city} · {derby.stadium}
                  </span>
                  <h2>{derby.name}</h2>
                  <p className="derby-first-played">First Played: <b>{derby.firstPlayed}</b></p>
                </div>
                <div className="teams-matchup-pill">
                  <span>{derby.teams[0]}</span>
                  <i>VS</i>
                  <span>{derby.teams[1]}</span>
                </div>
              </div>

              <p className="derby-description">{derby.description}</p>

              <div className="derby-h2h-box">
                <h3>Documented Head-to-Head Statistics</h3>
                <div className="h2h-stats-grid">
                  <div className="h2h-stat-tile">
                    <strong>{derby.headToHead.totalMatches}</strong>
                    <span>Total Matches</span>
                  </div>
                  <div className="h2h-stat-tile">
                    <strong className="text-red">{derby.headToHead.team1Wins}</strong>
                    <span>{derby.teams[0]} Wins</span>
                  </div>
                  <div className="h2h-stat-tile">
                    <strong className="text-blue">{derby.headToHead.team2Wins}</strong>
                    <span>{derby.teams[1]} Wins</span>
                  </div>
                  <div className="h2h-stat-tile">
                    <strong>{derby.headToHead.draws}</strong>
                    <span>Drawn Matches</span>
                  </div>
                </div>
              </div>

              <div className="derby-moments-box">
                <h4>Iconic Derby Moments:</h4>
                <ul>
                  {derby.keyMoments.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
              </div>

              <footer className="derby-footer">
                <Link className="button design-outline" href={`/teams/${derby.teamSlugs[0]}`}>
                  Explore {derby.teams[0]} <ArrowRight size={13} />
                </Link>
                <Link className="button design-outline" href={`/teams/${derby.teamSlugs[1]}`}>
                  Explore {derby.teams[1]} <ArrowRight size={13} />
                </Link>
              </footer>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
