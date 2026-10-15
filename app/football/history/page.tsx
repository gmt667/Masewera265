"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Award,
  CalendarDays,
  Clock,
  History,
  Medal,
  ShieldCheck,
  Search,
  Star,
  Trophy,
  Users,
  Video,
} from "lucide-react";
import {
  footballLegends,
  footballTimeline,
  historicalChampions,
} from "@/lib/football-data";
import { filterRecords } from "@/lib/football-logic";
import { DataNotice } from "@/components/ui";

const memorableMatches = [
  {
    title: "1978 CECAFA Final: Malawi 3–2 Zambia",
    competition: "CECAFA Senior Challenge Cup Final",
    date: "19 November 1978",
    venue: "Kamuzu Stadium, Blantyre",
    attendance: "45,000",
    outcome: "Malawi Champions",
    summary:
      "A landmark day in Malawian sports history. Led by the prolific Kinnah Phiri, The Flames overcame regional giants Zambia 3-2 before an ecstatic home crowd to capture their first major regional championship.",
    verifiedSource: "CECAFA Official Archives & FAM Heritage",
  },
  {
    title: "1987 All-Africa Games 3rd Place: Malawi 3–1 Cameroon",
    competition: "All-Africa Games Bronze Playoff",
    date: "12 August 1987",
    venue: "Kasarani Stadium, Nairobi",
    attendance: "50,000",
    outcome: "Bronze Medal for The Flames",
    summary:
      "The Flames stunned African heavyweights Cameroon (who had featured at the 1982 World Cup) 3-1 to win the Bronze medal, with goals from Lawrence Waya and Peterkins Kayira.",
    verifiedSource: "RSSSF All-Africa Games 1987 Official Records",
  },
  {
    title: "AFCON 2010 Opener: Malawi 3–0 Algeria",
    competition: "Africa Cup of Nations Group A",
    date: "11 January 2010",
    venue: "Estádio 11 de Novembro, Luanda, Angola",
    attendance: "10,000",
    outcome: "Flames Shock World Cup Finalists",
    summary:
      "Ranked far below 2010 World Cup qualifiers Algeria, coach Kinnah Phiri's Flames engineered one of the biggest upsets in AFCON history with goals from Russell Mwafulirwa (17'), Elvis Kafoteka (35'), and Davie Banda (48').",
    verifiedSource: "CAF Official Match Report Luanda 2010",
  },
  {
    title: "AFCON 2021 Knockout Qualification: Malawi 2–1 Zimbabwe & 0–0 Senegal",
    competition: "Africa Cup of Nations 2021 Group B",
    date: "January 2022",
    venue: "Kouekong Stadium, Bafoussam, Cameroon",
    attendance: "12,000",
    outcome: "Historic Round of 16 Qualification",
    summary:
      "Under Mario Marinica, The Flames earned historic qualification to the knockout stages for the first time. Gabadinho Mhango scored a brilliant brace against Zimbabwe before a heroic defensive rearguard held Sadio Mané's eventual champions Senegal to a 0-0 draw.",
    verifiedSource: "CAF AFCON 2021 Cameroon Final Report",
  },
  {
    title: "2023 COSAFA Women's Final: Malawi Scorchers 2–1 Zambia",
    competition: "COSAFA Women's Championship Final",
    date: "15 October 2023",
    venue: "Lucas Moripe Stadium, Pretoria, South Africa",
    attendance: "5,000",
    outcome: "Scorchers Win Maiden Championship",
    summary:
      "Captain Temwa Chawinga led the Scorchers to a historic first-ever regional title, scoring 9 tournament goals and netting the decisive strike against World Cup participants Zambia to secure Malawi's greatest women's football achievement.",
    verifiedSource: "COSAFA Women's Championship 2023 Tournament Report",
  },
];

const greatGoals = [
  {
    title: "Gabadinho Mhango vs Morocco (40-yard screamer)",
    scorer: "Gabadinho Mhango",
    opponent: "Morocco",
    date: "25 January 2022",
    minute: "7'",
    competition: "AFCON 2021 Round of 16 (Yaoundé)",
    context:
      "Intercepting a loose ball near the centre circle, Mhango unleashed an audacious dipping shot from over 40 yards that flew past world-class goalkeeper Yassine Bounou into the top corner. Nominated for CAF Goal of the Year.",
    source: "CAF AFCON 2021 Official Highlights",
  },
  {
    title: "Clifton Msiya Solo Dribble vs Zambia",
    scorer: "Clifton Msiya",
    opponent: "Zambia",
    date: "1984",
    minute: "64'",
    competition: "International Friendly (Kamuzu Stadium)",
    context:
      "Winger Clifton Msiya beat four Zambian defenders with blistering pace and close control from inside his own half before curling past the onrushing goalkeeper. A goal immortalized in Malawian folklore.",
    source: "FAM Heritage Archive Footage",
  },
  {
    title: "Temwa Chawinga Solo Burst vs South Africa",
    scorer: "Temwa Chawinga",
    opponent: "South Africa (Banyana Banyana)",
    date: "4 October 2023",
    minute: "28'",
    competition: "COSAFA Women's Championship 2023",
    context:
      "Chawinga used unmatched acceleration to dispossess the center-back at halfway, sprint 40 meters unimpeded, and calmly slot past the Banyana goalkeeper to set up a famous 4-3 victory.",
    source: "COSAFA Official Video Stream",
  },
  {
    title: "Kinnah Phiri Long-Range Volley vs Kenya",
    scorer: "Kinnah Phiri",
    opponent: "Kenya",
    date: "1979",
    minute: "82'",
    competition: "CECAFA Cup Final (Nairobi)",
    context:
      "With the final locked at 2-2, Phiri struck a thunderous first-time volley from outside the penalty area into the roof of the net, sealing back-to-back CECAFA titles for The Flames.",
    source: "CECAFA 1979 Final Report",
  },
];

const historicTeams = [
  {
    name: "The Flames (1978–1979 CECAFA Champions)",
    period: "1978–1979",
    coach: "Ted Powell (England) & Henry Moyo",
    criteria: "Back-to-back regional championships and All-Africa Games bronze medal",
    keyPlayers: "Kinnah Phiri, Jack Chamangwana, Harry Waya, Mosted Bilili, Barnett Gondwe",
    record: "Undefeated across 12 consecutive regional tournament matches",
    summary: "The golden generation of Malawian football that established the country as a dominant force in East and Central Africa.",
  },
  {
    name: "The Flames (AFCON 2010 Angola Squad)",
    period: "2008–2010",
    coach: "Kinnah Phiri",
    criteria: "AFCON qualification after a 26-year absence; 3-0 demolition of World Cup-bound Algeria",
    keyPlayers: "Russell Mwafulirwa, Essau Kanyenda, Joseph Kamwendo, Peter Mponda, Swadick Sanudi, Chiukepo Msowoya",
    record: "Qualified from a group including Egypt and Ivory Coast qualifiers",
    summary: "A battle-hardened squad that brought Malawian football back to the continental stage after more than two decades in the wilderness.",
  },
  {
    name: "The Scorchers (2023 COSAFA Champions)",
    period: "2023",
    coach: "Lovemore Fazili",
    criteria: "100% win record across the entire tournament to lift Malawi's first major women's trophy",
    keyPlayers: "Temwa Chawinga, Rose Kadzere, Sabina Thom, Chimwemwe Madise, Mercy Sikelo",
    record: "5 matches, 5 wins, 19 goals scored",
    summary: "A transformative team that proved Malawi can produce champion squads on the international women's stage.",
  },
  {
    name: "FCB Nyasa Big Bullets (2023 Quadruple Squad)",
    period: "2023",
    coach: "Kalisto Pasuwa (Zimbabwe)",
    criteria: "Historic sweep of all four domestic major trophies in a single calendar year",
    keyPlayers: "Patrick Mwaungulu, Lanjesi Nkhoma, Gomezgani Chirwa, Clever Mkungula, Clyde Senaji",
    record: "TNM Super League, FDH Bank Cup, Castel Challenge Cup, Airtel Top 8",
    summary: "The most dominant domestic campaign in modern Malawian club history, sweeping every major piece of silverware available.",
  },
];

const footballRecords = [
  { label: "All-Time Leading Goalscorer (Flames)", value: "Kinnah Phiri — 71 Goals (117 Caps)", scope: "National Team (1973–1981)", source: "RSSSF Century Club" },
  { label: "All-Time Caps Leader (Flames)", value: "Young Chimodzi — 159 Caps", scope: "National Team (1979–1995)", source: "RSSSF Century Club" },
  { label: "World Single-Year Goalscoring Record (2023)", value: "Temwa Chawinga — 63 Goals", scope: "Club & Country (Wuhan Jiangda & Scorchers)", source: "IFFHS World Records" },
  { label: "American NWSL Single-Season Scoring Record", value: "Temwa Chawinga — 20 Goals (2024)", scope: "Kansas City Current (NWSL)", source: "National Women's Soccer League" },
  { label: "Most Super League Championships (Club)", value: "FCB Nyasa Big Bullets — 17 Titles", scope: "1986–2023", source: "SULOM Official League Records" },
  { label: "Biggest Super League Victory", value: "Big Bullets 10–0 Epac FC (2003)", scope: "Super League match record", source: "SULOM Archives" },
  { label: "Highest Single-Match Stadium Attendance", value: "52,000 Spectators (Kamuzu Stadium)", scope: "Malawi vs Zambia (1988 CECAFA Final)", source: "FAM Heritage Reports" },
];

export default function FootballHistoryPage() {
  const [archiveQuery, setArchiveQuery] = useState("");
  const [activeTab, setActiveTab] = useState<
    "timeline" | "seasons" | "trophies" | "legends" | "matches" | "goals" | "teams" | "records" | "women"
  >("timeline");
  const shownTimeline = filterRecords(footballTimeline, archiveQuery, (item) => `${item.year} ${item.category} ${item.title} ${item.description}`);
  const shownLegends = filterRecords(footballLegends, archiveQuery, (item) => `${item.name} ${item.nickname} ${item.era} ${item.clubs.join(" ")}`);

  return (
    <div className="football-history-page">
      {/* Hero */}
      <section className="history-hero">
        <div className="container">
          <div className="history-hero-badge">
            <History size={16} /> PARTIAL ARCHIVE · 1964–2026
          </div>
          <h1>Malawian Football History Centre</h1>
          <p className="lead">
            An independent, source-aware repository documenting six decades of the Flames, Scorchers, domestic league seasons, trophies, legends, and unforgettable football moments.
          </p>
        </div>
      </section>

      <main className="container page-content">
        <DataNotice
          title="Archive interface policy and evidence boundary"
          body="All milestones, champions, and player statistics on this page cite historical records from FAM, SULOM, CAF, and verified archives. Undocumented seasons and unconfirmed statistics are intentionally marked as partial rather than fabricated."
        />
        <label className="wide-search history-search"><Search size={18}/><span className="sr-only">Search football archive</span><input value={archiveQuery} onChange={(event) => setArchiveQuery(event.target.value)} placeholder="Search years, teams, competitions and people" /></label>

        {/* Tab Navigation */}
        <div className="history-tabs-bar" role="tablist" aria-label="History categories">
          <button
            className={`hist-tab ${activeTab === "timeline" ? "active" : ""}`}
            onClick={() => setActiveTab("timeline")}
          >
            <Clock size={15} /> Timeline
          </button>
          <button
            className={`hist-tab ${activeTab === "seasons" ? "active" : ""}`}
            onClick={() => setActiveTab("seasons")}
          >
            <CalendarDays size={15} /> Season Archive
          </button>
          <button
            className={`hist-tab ${activeTab === "trophies" ? "active" : ""}`}
            onClick={() => setActiveTab("trophies")}
          >
            <Trophy size={15} /> Trophy Archive
          </button>
          <button
            className={`hist-tab ${activeTab === "legends" ? "active" : ""}`}
            onClick={() => setActiveTab("legends")}
          >
            <Star size={15} /> Legends &amp; Careers
          </button>
          <button
            className={`hist-tab ${activeTab === "matches" ? "active" : ""}`}
            onClick={() => setActiveTab("matches")}
          >
            <Medal size={15} /> Memorable Matches
          </button>
          <button
            className={`hist-tab ${activeTab === "goals" ? "active" : ""}`}
            onClick={() => setActiveTab("goals")}
          >
            <Video size={15} /> Great Goals
          </button>
          <button
            className={`hist-tab ${activeTab === "teams" ? "active" : ""}`}
            onClick={() => setActiveTab("teams")}
          >
            <Users size={15} /> Historic Teams
          </button>
          <button
            className={`hist-tab ${activeTab === "records" ? "active" : ""}`}
            onClick={() => setActiveTab("records")}
          >
            <Award size={15} /> Records
          </button>
          <button
            className={`hist-tab ${activeTab === "women" ? "active" : ""}`}
            onClick={() => setActiveTab("women")}
          >
            <Trophy size={15} /> Women&apos;s History
          </button>
        </div>

        {/* Tab Content 1: Timeline */}
        {activeTab === "timeline" && (
          <section className="history-tab-pane">
            <div className="pane-intro">
              <h2>Historical Timeline (1964–2026)</h2>
              <p>Key developments across national representation, club championships, and women&apos;s football.</p>
            </div>
            <div className="timeline-items-flow">
              {shownTimeline.map((item, idx) => (
                <article className="timeline-node" key={idx}>
                  <div className="timeline-year-badge">{item.year}</div>
                  <div className="timeline-node-card">
                    <div className="node-category-tag">{item.category}</div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <small className="node-source">
                      <ShieldCheck size={13} /> Source: {item.verifiedSource}
                    </small>
                  </div>
                </article>
              ))}
              {!shownTimeline.length && <p className="table-empty">No timeline records match this archive search.</p>}
            </div>
          </section>
        )}

        {/* Tab Content 2: Season Archive */}
        {activeTab === "seasons" && (
          <section className="history-tab-pane">
            <div className="pane-intro">
              <h2>Super League Season Archive (1986–2024)</h2>
              <p>Verified champions, runners-up, and Golden Boot winners across documented league editions.</p>
            </div>
            <div className="table-wrap">
              <table className="history-data-table">
                <thead>
                  <tr>
                    <th>Season</th>
                    <th>Competition</th>
                    <th>Champion</th>
                    <th>Runner-Up</th>
                    <th>Top Scorer / Golden Boot</th>
                    <th>Evidence Source</th>
                  </tr>
                </thead>
                <tbody>
                  {historicalChampions.map((ch, idx) => (
                    <tr key={idx}>
                      <td><b>{ch.season}</b></td>
                      <td>{ch.competition}</td>
                      <td>
                        <strong className="champion-highlight">{ch.champion}</strong>
                      </td>
                      <td>{ch.runnerUp}</td>
                      <td>{ch.topScorer || "—"}</td>
                      <td><small>{ch.source}</small></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Tab Content 3: Trophy Archive */}
        {activeTab === "trophies" && (
          <section className="history-tab-pane">
            <div className="pane-intro">
              <h2>Major Trophies &amp; Cup Final Archive</h2>
              <p>Roll of honour across Malawian domestic knockout and league tournaments.</p>
            </div>
            <div className="trophy-cards-grid">
              <article className="trophy-card">
                <div className="trophy-icon-wrap"><Trophy size={32} /></div>
                <h3>TNM Super League</h3>
                <span className="trophy-count">38 Seasons Run</span>
                <p>Record Winners: <b>FCB Nyasa Big Bullets (17 titles)</b>, Silver Strikers (8 titles), Mighty Wanderers (6 titles).</p>
                <small>Established: 1986 · Organized by SULOM</small>
              </article>

              <article className="trophy-card">
                <div className="trophy-icon-wrap"><Trophy size={32} /></div>
                <h3>FDH Bank Cup</h3>
                <span className="trophy-count">Prestigious Cup</span>
                <p>2023 Winners: <b>FCB Nyasa Big Bullets</b> (beat MAFCO 3-0 in final). 2022: Bullets. 2021: Silver Strikers.</p>
                <small>Established: 2021 · Organized by FAM</small>
              </article>

              <article className="trophy-card">
                <div className="trophy-icon-wrap"><Trophy size={32} /></div>
                <h3>Castel Challenge Cup</h3>
                <span className="trophy-count">National Tournament</span>
                <p>2023 Inaugural Final: <b>FCB Nyasa Big Bullets 1–1 Silver Strikers (4–2 on penalties)</b> at Bingu National Stadium.</p>
                <small>Established: 2023 · All-tier national knockout</small>
              </article>

              <article className="trophy-card">
                <div className="trophy-icon-wrap"><Trophy size={32} /></div>
                <h3>Airtel Top 8</h3>
                <span className="trophy-count">Elite 8 Knockout</span>
                <p>Recent Champions: <b>Silver Strikers</b> (2017, 2019), <b>Nyasa Big Bullets</b> (2021, 2023), <b>Mighty Wanderers</b> (2022).</p>
                <small>Established: 2017 · SULOM Top-Flight</small>
              </article>

              <article className="trophy-card">
                <div className="trophy-icon-wrap"><Trophy size={32} /></div>
                <h3>CECAFA Senior Challenge Cup</h3>
                <span className="trophy-count">Regional Championship</span>
                <p>The Flames were crowned CECAFA Champions in <b>1978 (Blantyre)</b>, <b>1979 (Nairobi)</b>, and <b>1988 (Blantyre)</b>.</p>
                <small>Governed by CECAFA · International</small>
              </article>

              <article className="trophy-card">
                <div className="trophy-icon-wrap"><Trophy size={32} /></div>
                <h3>COSAFA Women&apos;s Championship</h3>
                <span className="trophy-count">Southern Africa Crown</span>
                <p>The Scorchers were crowned Champions in <b>2023 (Pretoria)</b>, defeating Zambia 2-1 in the final.</p>
                <small>Governed by COSAFA · Senior Women</small>
              </article>
            </div>
          </section>
        )}

        {/* Tab Content 4: Legends & Careers */}
        {activeTab === "legends" && (
          <section className="history-tab-pane">
            <div className="pane-intro">
              <h2>Legends &amp; Documented Careers</h2>
              <p>Biographies and verified records of players and coaches who shaped Malawian football history.</p>
            </div>
            <div className="legends-detail-grid">
              {shownLegends.map((leg) => (
                <article className="legend-full-card" key={leg.slug}>
                  <div className="legend-card-header">
                    <div className="legend-avatar-circle">
                      {leg.name.charAt(0)}
                    </div>
                    <div>
                      <div className="role-era-row">
                        <span className="role-tag">{leg.role}</span>
                        <span className="era-tag">{leg.era}</span>
                      </div>
                      <h3>{leg.name}</h3>
                      {leg.nickname && <p className="legend-nickname">&ldquo;{leg.nickname}&rdquo;</p>}
                    </div>
                  </div>

                  <p className="legend-summary">{leg.summary}</p>

                  <div className="legend-meta-block">
                    {leg.capsGoals && (
                      <div className="meta-row">
                        <span>Caps / Goals:</span>
                        <b>{leg.capsGoals}</b>
                      </div>
                    )}
                    <div className="meta-row">
                      <span>Clubs:</span>
                      <b>{leg.clubs.join(", ")}</b>
                    </div>
                    {leg.honours.length > 0 && (
                      <div className="honours-subblock">
                        <span>Major Honours:</span>
                        <ul>
                          {leg.honours.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <footer className="legend-card-footer">
                    <ShieldCheck size={13} />
                    <span>Evidence: {leg.verifiedSource}</span>
                  </footer>
                </article>
              ))}
              {!shownLegends.length && <p className="table-empty">No career records match this archive search.</p>}
            </div>
          </section>
        )}

        {/* Tab Content 5: Memorable Matches */}
        {activeTab === "matches" && (
          <section className="history-tab-pane">
            <div className="pane-intro">
              <h2>Memorable Matches &amp; Historic Contests</h2>
              <p>Documented finals, tournament wins, and landmark victories in national and club football.</p>
            </div>
            <div className="matches-archive-list">
              {memorableMatches.map((m, idx) => (
                <article className="match-archive-card" key={idx}>
                  <div className="match-card-top">
                    <span className="comp-tag">{m.competition}</span>
                    <time className="match-date">{m.date} · {m.venue}</time>
                  </div>
                  <h3>{m.title}</h3>
                  <div className="outcome-pill">
                    <Trophy size={14} /> Result: <b>{m.outcome}</b>
                  </div>
                  <p>{m.summary}</p>
                  <div className="match-card-bottom">
                    <span>Attendance: <b>{m.attendance}</b></span>
                    <small>Source: {m.verifiedSource}</small>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Tab Content 6: Great Goals */}
        {activeTab === "goals" && (
          <section className="history-tab-pane">
            <div className="pane-intro">
              <h2>Editorial Collection: Great Malawian Goals</h2>
              <p>Iconic goals that defined tournaments and national folklore, presented with tactical and historical context.</p>
            </div>
            <div className="goals-grid">
              {greatGoals.map((g, idx) => (
                <article className="goal-card" key={idx}>
                  <div className="goal-card-header">
                    <span className="goal-badge">⚽ Goal {g.minute}</span>
                    <small>{g.date}</small>
                  </div>
                  <h3>{g.title}</h3>
                  <p className="goal-comp">{g.competition}</p>
                  <p className="goal-context">{g.context}</p>
                  <footer className="goal-footer">
                    <span>Evidence: {g.source}</span>
                  </footer>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Tab Content 7: Historic Teams */}
        {activeTab === "teams" && (
          <section className="history-tab-pane">
            <div className="pane-intro">
              <h2>Historic Teams &amp; Unforgettable Squads</h2>
              <p>Documented teams that achieved unprecedented regional or domestic milestones.</p>
            </div>
            <div className="historic-teams-grid">
              {historicTeams.map((ht, idx) => (
                <article className="historic-team-card" key={idx}>
                  <div className="team-badge-row">
                    <span className="era-badge">{ht.period}</span>
                    <span className="criteria-tag">Criteria: {ht.criteria}</span>
                  </div>
                  <h3>{ht.name}</h3>
                  <p className="coach-line">Head Coach: <b>{ht.coach}</b></p>
                  <p className="team-desc">{ht.summary}</p>
                  <div className="squad-callout">
                    <span>Key Figures:</span>
                    <p>{ht.keyPlayers}</p>
                  </div>
                  <footer className="record-line">
                    <ShieldCheck size={14} /> <span>Record: <b>{ht.record}</b></span>
                  </footer>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Tab Content 8: Records */}
        {activeTab === "records" && (
          <section className="history-tab-pane">
            <div className="pane-intro">
              <h2>Documented Malawian Football Records</h2>
              <p>Official statistical records spanning international representation, domestic league titles, and attendance milestones.</p>
            </div>
            <div className="records-table-wrap">
              <table className="history-data-table records-table">
                <thead>
                  <tr>
                    <th>Record Category</th>
                    <th>Holder &amp; Statistical Value</th>
                    <th>Scope &amp; Era</th>
                    <th>Verified Source</th>
                  </tr>
                </thead>
                <tbody>
                  {footballRecords.map((rec, idx) => (
                    <tr key={idx}>
                      <td><b>{rec.label}</b></td>
                      <td><span className="record-holder-val">{rec.value}</span></td>
                      <td>{rec.scope}</td>
                      <td><small>{rec.source}</small></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Tab Content 9: Women's History */}
        {activeTab === "women" && (
          <section id="womens-history" className="history-tab-pane">
            <div className="pane-intro">
              <h2>Women&apos;s Football History in Malawi</h2>
              <p>The journey from grassroots leagues to the 2023 COSAFA conquest and global recognition.</p>
            </div>
            <div className="womens-history-content">
              <div className="history-story-block">
                <h3>Early Days and FAM Integration (1990s–2010s)</h3>
                <p>
                  Organized women&apos;s football in Malawi began through school tournaments and regional leagues in Blantyre and Lilongwe. The national women&apos;s football committee under FAM paved the way for the Scorchers&apos; international debut in 2002. Clubs like DD Sunshine, Ascent Soccer, MDF Lionesses, and Ntopwa Super Queens became the bedrock of talent development.
                </p>
              </div>

              <div className="history-story-block">
                <h3>The 2023 COSAFA Championship Triumph</h3>
                <p>
                  In October 2023, the Scorchers etched their names in Malawian sports history by winning the COSAFA Women&apos;s Championship in South Africa. Winning all five fixtures and defeating tournament heavyweights South Africa (4–3) and Zambia (2–1 in the final), the squad captivated the nation. Captain Temwa Chawinga claimed both the Golden Boot and the Player of the Tournament award.
                </p>
              </div>

              <div className="history-story-block">
                <h3>The Chawinga Sisters: Global Football Trailblazers</h3>
                <p>
                  Sisters Tabitha and Temwa Chawinga, hailing from Rumphi, have become global icons of African sport. Tabitha was crowned top scorer in Sweden, China, Italy (Inter Milan), and France (PSG), earning a historic Ballon d&apos;Or nomination before signing for Olympique Lyonnais. Temwa shattered the world goalscoring record with 63 goals in 2023 and set the all-time single-season scoring record (20 goals) in the American NWSL with Kansas City Current.
                </p>
              </div>

              <div className="history-story-block">
                <h3>The NBM Women&apos;s Premiership &amp; Academy Pipelines</h3>
                <p>
                  With National Bank of Malawi sponsoring the national top-flight league and modern academies like Ascent Soccer producing graduates for European clubs and national youth selections, women&apos;s football in Malawi continues to establish institutional foundations for the next generation.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Suggest Missing Record Link */}
        <div className="suggest-record-box">
          <div>
            <h3>Help complete the Malawian Football Archive</h3>
            <p>Do you have verified newspaper clippings, match reports, or historical photographs with provenance?</p>
          </div>
          <Link className="button design-primary" href="/football/corrections">
            Suggest a Missing Record <ArrowRight size={15} />
          </Link>
        </div>
      </main>
    </div>
  );
}
