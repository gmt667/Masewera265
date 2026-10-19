"use client";

import { useState } from "react";
import Link from "@/src/platform/link";
import { ArrowLeftRight, ArrowRight, MapPin } from "lucide-react";
import { DataNotice } from "@/components/ui";

interface TeamCompareProfile {
  slug: string;
  name: string;
  nickname: string;
  city: string;
  stadium: string;
  founded: string;
  leagueTitles: number;
  cupTitles: number;
  internationalRecord: string;
  rival: string;
  primaryColor: string;
}

const clubPool: TeamCompareProfile[] = [
  {
    slug: "nyasa-big-bullets",
    name: "FCB Nyasa Big Bullets",
    nickname: "The People's Team / Maule",
    city: "Blantyre",
    stadium: "Kamuzu Stadium (45,000)",
    founded: "1967",
    leagueTitles: 17,
    cupTitles: 14,
    internationalRecord: "CAF Champions League Group Stage (2004)",
    rival: "Mighty Mukuru Wanderers",
    primaryColor: "#c92c38",
  },
  {
    slug: "mighty-wanderers",
    name: "Mighty Mukuru Wanderers",
    nickname: "Nomads / Manoma",
    city: "Blantyre",
    stadium: "Kamuzu Stadium (45,000)",
    founded: "1962",
    leagueTitles: 6,
    cupTitles: 12,
    internationalRecord: "CAF Cup / Confederation Cup campaigns",
    rival: "FCB Nyasa Big Bullets",
    primaryColor: "#1d4ed8",
  },
  {
    slug: "silver-strikers",
    name: "Silver Strikers FC",
    nickname: "The Bankers",
    city: "Lilongwe",
    stadium: "Silver Stadium (20,000)",
    founded: "1977",
    leagueTitles: 8,
    cupTitles: 10,
    internationalRecord: "CAF Confederation Cup regular participants",
    rival: "Civil Service United",
    primaryColor: "#0f766e",
  },
  {
    slug: "civil-service-united",
    name: "Civil Service United",
    nickname: "Civo / The Civil Servants",
    city: "Lilongwe",
    stadium: "CIVO Stadium (25,000)",
    founded: "1978",
    leagueTitles: 1,
    cupTitles: 4,
    internationalRecord: "Regional East & Central club qualifiers",
    rival: "Silver Strikers",
    primaryColor: "#b45309",
  },
  {
    slug: "moyale-barracks",
    name: "Moyale Barracks FC",
    nickname: "Lions of Kaning'ina",
    city: "Mzuzu",
    stadium: "Mzuzu Stadium (15,000)",
    founded: "1967",
    leagueTitles: 0,
    cupTitles: 3,
    internationalRecord: "Military Games African Champions",
    rival: "Kamuzu Barracks / MAFCO",
    primaryColor: "#15803d",
  },
];

export default function CompareTeamsPage() {
  const [t1Slug, setT1Slug] = useState(clubPool[0].slug);
  const [t2Slug, setT2Slug] = useState(clubPool[1].slug);

  const t1 = clubPool.find((c) => c.slug === t1Slug) || clubPool[0];
  const t2 = clubPool.find((c) => c.slug === t2Slug) || clubPool[1];

  return (
    <div className="compare-teams-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">HEAD-TO-HEAD INSTITUTIONAL ANALYSIS</p>
          <h1>Club &amp; Team Comparison</h1>
          <p className="lead">
            Compare Malawian football clubs across founding history, home stadiums, league championships, cup honours, and continental milestones.
          </p>
        </div>
      </section>

      <main className="container page-content">
        <DataNotice
          title="Club data criteria: Official trophies and certified venues"
          body="League championships reflect SULOM-sanctioned seasons from 1986 to present. Cup totals compile documented national knockouts (Castle/Castel Cup, FDH Bank Cup, Airtel Top 8, Chibuku Cup, Carlsberg Cup, BP Top 8)."
        />

        {/* Selector */}
        <div className="compare-selector-bar">
          <div className="selector-group">
            <label htmlFor="select-t1">Club 1:</label>
            <select
              id="select-t1"
              value={t1Slug}
              onChange={(e) => setT1Slug(e.target.value)}
            >
              {clubPool.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name} ({c.city})
                </option>
              ))}
            </select>
          </div>

          <div className="vs-circle">
            <ArrowLeftRight size={20} />
          </div>

          <div className="selector-group">
            <label htmlFor="select-t2">Club 2:</label>
            <select
              id="select-t2"
              value={t2Slug}
              onChange={(e) => setT2Slug(e.target.value)}
            >
              {clubPool.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name} ({c.city})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Club Comparison View */}
        <div className="compare-cards-wrapper">
          <div className="compare-player-header-card" style={{ borderTop: `4px solid ${t1.primaryColor}` }}>
            <h2>{t1.name}</h2>
            <p className="nickname-tag">&ldquo;{t1.nickname}&rdquo;</p>
            <small><MapPin size={12} /> {t1.city}</small>
          </div>

          <div className="compare-player-header-card away" style={{ borderTop: `4px solid ${t2.primaryColor}` }}>
            <h2>{t2.name}</h2>
            <p className="nickname-tag">&ldquo;{t2.nickname}&rdquo;</p>
            <small><MapPin size={12} /> {t2.city}</small>
          </div>
        </div>

        <div className="compare-metrics-table">
          <div className="metric-row">
            <div className="val p1"><b>{t1.founded}</b></div>
            <div className="metric-label">Year Founded</div>
            <div className="val p2"><b>{t2.founded}</b></div>
          </div>
          <div className="metric-row">
            <div className="val p1">{t1.stadium}</div>
            <div className="metric-label">Home Stadium &amp; Capacity</div>
            <div className="val p2">{t2.stadium}</div>
          </div>
          <div className="metric-row">
            <div className="val p1"><b className="text-red">{t1.leagueTitles} Titles</b></div>
            <div className="metric-label">Super League Titles (1986–Present)</div>
            <div className="val p2"><b className="text-blue">{t2.leagueTitles} Titles</b></div>
          </div>
          <div className="metric-row">
            <div className="val p1"><b>{t1.cupTitles} Major Cups</b></div>
            <div className="metric-label">Documented Domestic Cups</div>
            <div className="val p2"><b>{t2.cupTitles} Major Cups</b></div>
          </div>
          <div className="metric-row">
            <div className="val p1"><small>{t1.internationalRecord}</small></div>
            <div className="metric-label">CAF / Continental Milestone</div>
            <div className="val p2"><small>{t2.internationalRecord}</small></div>
          </div>
          <div className="metric-row">
            <div className="val p1">{t1.rival}</div>
            <div className="metric-label">Primary Rivalry</div>
            <div className="val p2">{t2.rival}</div>
          </div>
        </div>

        <div className="compare-footer-cta">
          <Link className="button design-primary" href={`/teams/${t1.slug}`}>
            View {t1.name} Profile <ArrowRight size={14} />
          </Link>
          <Link className="button design-outline" href={`/teams/${t2.slug}`}>
            View {t2.name} Profile <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    </div>
  );
}
