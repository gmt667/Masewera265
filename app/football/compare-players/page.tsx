"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftRight, ArrowRight } from "lucide-react";
import { DataNotice, TrustBadge } from "@/components/ui";

interface CompareProfile {
  name: string;
  role: string;
  team: string;
  caps: string;
  goals: string;
  honoursCount: number;
  speedRating: string;
  era: string;
  trust: "Verified" | "Reported" | "Official";
}

const comparisonPool: CompareProfile[] = [
  {
    name: "Kinnah Phiri",
    role: "Striker",
    team: "Big Bullets / The Flames",
    caps: "117",
    goals: "71 (0.61 / game)",
    honoursCount: 5,
    speedRating: "High Workrate",
    era: "1973–1981",
    trust: "Verified",
  },
  {
    name: "Ernest Mtawali",
    role: "Playmaker / Midfielder",
    team: "Mighty Wanderers / Sundowns",
    caps: "70+",
    goals: "12",
    honoursCount: 4,
    speedRating: "Vision & Technique",
    era: "1985–2003",
    trust: "Verified",
  },
  {
    name: "Temwa Chawinga",
    role: "Striker / Winger",
    team: "Kansas City Current / Scorchers",
    caps: "25+",
    goals: "30+ Scorchers / 63 club 2023",
    honoursCount: 6,
    speedRating: "World Elite Pace (34 km/h)",
    era: "2016–Present",
    trust: "Verified",
  },
  {
    name: "Tabitha Chawinga",
    role: "Forward",
    team: "Olympique Lyonnais / Scorchers",
    caps: "35+",
    goals: "35+ Scorchers / Ballon d'Or",
    honoursCount: 7,
    speedRating: "Explosive Finishing",
    era: "2014–Present",
    trust: "Verified",
  },
  {
    name: "Hellings Gabadinho Mhango",
    role: "Forward / Striker",
    team: "Orlando Pirates / The Flames",
    caps: "68",
    goals: "17 (3 AFCON 2021)",
    honoursCount: 3,
    speedRating: "Dynamic Burst",
    era: "2012–Present",
    trust: "Verified",
  },
  {
    name: "Essau Kanyenda",
    role: "Centre Forward",
    team: "FC Rostov / The Flames",
    caps: "72",
    goals: "19",
    honoursCount: 3,
    speedRating: "Physical Power",
    era: "1999–2015",
    trust: "Verified",
  },
  {
    name: "Young Chimodzi",
    role: "Centre Back",
    team: "Silver Strikers / The Flames",
    caps: "159 (Record)",
    goals: "13",
    honoursCount: 4,
    speedRating: "Tactical Positioning",
    era: "1979–1995",
    trust: "Verified",
  },
];

export default function ComparePlayersPage() {
  const [player1Name, setPlayer1Name] = useState(comparisonPool[0].name);
  const [player2Name, setPlayer2Name] = useState(comparisonPool[2].name);

  const p1 = comparisonPool.find((p) => p.name === player1Name) || comparisonPool[0];
  const p2 = comparisonPool.find((p) => p.name === player2Name) || comparisonPool[1];

  return (
    <div className="compare-players-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">STATISTICAL COMPARISON</p>
          <h1>Player Comparison Tool</h1>
          <p className="lead">
            Compare documented statistics, eras, positions, international goals, and honours of Malawian football figures side-by-side.
          </p>
        </div>
      </section>

      <main className="container page-content">
        <DataNotice
          title="Methodology: Sourced career totals vs single-season data"
          body="All comparative figures are derived from documented matches. Where historical appearance totals are incomplete, figures are reported as known minimums rather than projections."
        />

        {/* Selection Bar */}
        <div className="compare-selector-bar">
          <div className="selector-group">
            <label htmlFor="select-p1">Select Player 1:</label>
            <select
              id="select-p1"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
            >
              {comparisonPool.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name} ({p.role} · {p.era})
                </option>
              ))}
            </select>
          </div>

          <div className="vs-circle">
            <ArrowLeftRight size={20} />
          </div>

          <div className="selector-group">
            <label htmlFor="select-p2">Select Player 2:</label>
            <select
              id="select-p2"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
            >
              {comparisonPool.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name} ({p.role} · {p.era})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Head to Head Table */}
        <div className="compare-cards-wrapper">
          <div className="compare-player-header-card">
            <div className="avatar-huge">{p1.name.charAt(0)}</div>
            <h2>{p1.name}</h2>
            <p>{p1.role} · {p1.team}</p>
            <TrustBadge label={p1.trust} />
          </div>

          <div className="compare-player-header-card away">
            <div className="avatar-huge away">{p2.name.charAt(0)}</div>
            <h2>{p2.name}</h2>
            <p>{p2.role} · {p2.team}</p>
            <TrustBadge label={p2.trust} />
          </div>
        </div>

        <div className="compare-metrics-table">
          <div className="metric-row">
            <div className="val p1">{p1.era}</div>
            <div className="metric-label">Era / Active Period</div>
            <div className="val p2">{p2.era}</div>
          </div>
          <div className="metric-row">
            <div className="val p1"><b>{p1.caps}</b></div>
            <div className="metric-label">Documented Caps</div>
            <div className="val p2"><b>{p2.caps}</b></div>
          </div>
          <div className="metric-row">
            <div className="val p1"><b className="text-red">{p1.goals}</b></div>
            <div className="metric-label">Career / Int. Goals</div>
            <div className="val p2"><b className="text-teal">{p2.goals}</b></div>
          </div>
          <div className="metric-row">
            <div className="val p1">{p1.speedRating}</div>
            <div className="metric-label">Play Style / Primary Attribute</div>
            <div className="val p2">{p2.speedRating}</div>
          </div>
          <div className="metric-row">
            <div className="val p1"><b>{p1.honoursCount} Major Titles</b></div>
            <div className="metric-label">Documented Major Honours</div>
            <div className="val p2"><b>{p2.honoursCount} Major Titles</b></div>
          </div>
        </div>

        <div className="compare-footer-cta">
          <Link className="button design-primary" href="/football/history">
            Explore All Legends in History Centre <ArrowRight size={14} />
          </Link>
          <Link className="button design-outline" href="/football/compare-teams">
            Switch to Club Comparison <ArrowLeftRight size={14} />
          </Link>
        </div>
      </main>
    </div>
  );
}
