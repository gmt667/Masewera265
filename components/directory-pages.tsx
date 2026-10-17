"use client";

import Link from "next/link";
import { Search, MapPin, Users, Trophy, ArrowRight, Award } from "lucide-react";
import { useMemo, useState } from "react";
import { athletes, competitions, events, sports, teams } from "@/lib/demo-data";
import { DemoBadge, EmptyState, EventCard, TimeNote, TrustBadge } from "./ui";
import { TeamLogo } from "./team-logo";
import { SportIcon } from "./sport-icon";

export function FixtureBrowser({
  resultOnly = false,
  liveOnly = false,
}: {
  resultOnly?: boolean;
  liveOnly?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(resultOnly ? "FINAL" : liveOnly ? "LIVE" : "ALL");
  const [location, setLocation] = useState("ALL");
  const [sport, setSport] = useState("ALL");

  const filtered = useMemo(
    () =>
      events.filter(
        (event) =>
          (!resultOnly || event.status === "FINAL") &&
          (!liveOnly || event.status === "LIVE") &&
          (status === "ALL" || event.status === status) &&
          (location === "ALL" || event.location === location) &&
          (sport === "ALL" || event.sport.toLowerCase() === sport.toLowerCase()) &&
          `${event.home} ${event.away} ${event.competition} ${event.sport}`
            .toLowerCase()
            .includes(query.toLowerCase())
      ),
    [query, status, location, sport, resultOnly, liveOnly]
  );

  const reset = () => {
    setQuery("");
    setStatus(resultOnly ? "FINAL" : liveOnly ? "LIVE" : "ALL");
    setLocation("ALL");
    setSport("ALL");
  };

  const sportList = ["ALL", ...sports.map((item) => item.name)];

  return (
    <>
      {/* Sport quick selector tabs */}
      <div className="sport-filter-tabs" role="tablist" aria-label="Filter by sport">
        {sportList.map((s) => (
          <button
            key={s}
            role="tab"
            aria-selected={sport === s}
            className={`sport-tab-btn ${sport === s ? "active" : ""}`}
            onClick={() => setSport(s)}
          >
            {s === "ALL" ? "All Disciplines" : s}
          </button>
        ))}
      </div>

      <div className="filter-panel">
        <label className="search-field">
          <Search />
          <span className="sr-only">Search events</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search team, sport or competition"
          />
        </label>
        <label>
          <span>Status</span>
          <select value={status} onChange={(e) => setStatus(e.target.value)} disabled={resultOnly || liveOnly}>
            <option value="ALL">All statuses</option>
            <option value="LIVE">Live now</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="FINAL">Final results</option>
          </select>
        </label>
        <label>
          <span>Location</span>
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="ALL">All locations</option>
            {[...new Set(events.map((event) => event.location))].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <button className="button filter-reset" onClick={reset}>
          Reset
        </button>
      </div>

      <TimeNote />
      <div className="results-count">
        <span>
          {filtered.length} {filtered.length === 1 ? "event" : "events"} {sport !== "ALL" && `in ${sport}`}
        </span>
        <DemoBadge compact />
      </div>

      {filtered.length ? (
        <div className="event-list">
          {filtered.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>
      ) : (
        <EmptyState onReset={reset} />
      )}
    </>
  );
}

export function SportsDirectory() {
  const [q, setQ] = useState("");
  const shown = sports.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <label className="wide-search">
        <Search />
        <span className="sr-only">Search sports</span>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a sport platform..." />
      </label>

      <div className="directory-grid sports-grid">
        {shown.map((s) => (
          <Link href={`/sports/${s.slug}`} className="directory-card sport-directory-card" key={s.slug}>
            <div className="sport-card-header">
              <span className="big-icon"><SportIcon sport={s.slug} size={32} /></span>
              <span className={s.availability === "Functional" ? "functional-badge" : "preview-badge"}>{s.availability === "Functional" ? "Football-first platform" : "Forthcoming"}</span>
            </div>
            <h2>{s.name}</h2>
            {s.federation && <p className="sport-federation">{s.federation}</p>}
            <p className="sport-summary">{s.summary}</p>
            {s.ranking && (
              <div className="sport-meta-tag">
                <Award size={13} /> {s.ranking}
              </div>
            )}
            <div className="sport-card-footer">
              <small>{s.format}</small>
              <span className="card-arrow">
                <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>
      {!shown.length && <EmptyState onReset={() => setQ("")} />}
    </>
  );
}

export function TeamDirectory() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("ALL");
  const [sport, setSport] = useState("ALL");
  const [category, setCategory] = useState("ALL");

  const sportList = ["ALL", ...sports.map((item) => item.name)];

  const shown = useMemo(() => {
    return teams.filter((t) => {
      const matchRegion = region === "ALL" || t.region === region;
      const matchSport = sport === "ALL" || t.sport.toLowerCase() === sport.toLowerCase();
      const matchCat =
        category === "ALL" ||
        (category === "NATIONAL" && (t.isNationalTeam || t.kind === "National team")) ||
        (category === "CLUBS" && !t.isNationalTeam && t.kind !== "National team");
      const matchQuery =
        t.name.toLowerCase().includes(q.toLowerCase()) ||
        (t.nickname && t.nickname.toLowerCase().includes(q.toLowerCase())) ||
        t.location.toLowerCase().includes(q.toLowerCase()) ||
        t.sport.toLowerCase().includes(q.toLowerCase());

      return matchRegion && matchSport && matchCat && matchQuery;
    });
  }, [q, region, sport, category]);

  return (
    <>
      {/* Quick Sport Selector Bar */}
      <div className="sport-filter-tabs" role="tablist" aria-label="Filter teams by sport">
        {sportList.map((s) => (
          <button
            key={s}
            role="tab"
            aria-selected={sport === s}
            className={`sport-tab-btn ${sport === s ? "active" : ""}`}
            onClick={() => setSport(s)}
          >
            {s === "ALL" ? "All Sports" : s}
          </button>
        ))}
      </div>

      <div className="filter-panel">
        <label className="search-field">
          <Search />
          <span className="sr-only">Search teams</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search teams (e.g. Bravehearts, Bullets, Queens, Flames, Tigresses)..."
          />
        </label>
        <label>
          <span>Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="ALL">All teams & squads</option>
            <option value="NATIONAL">Malawi National Teams</option>
            <option value="CLUBS">League & Club Teams</option>
          </select>
        </label>
        <label>
          <span>Region</span>
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="ALL">All regions</option>
            <option value="National">National Squads</option>
            <option value="Central">Central Region</option>
            <option value="Southern">Southern Region</option>
            <option value="Northern">Northern Region</option>
          </select>
        </label>
        {(q || region !== "ALL" || sport !== "ALL" || category !== "ALL") && (
          <button
            className="button filter-reset"
            onClick={() => {
              setQ("");
              setRegion("ALL");
              setSport("ALL");
              setCategory("ALL");
            }}
          >
            Reset
          </button>
        )}
      </div>

      <div className="results-count">
        <span>
          {shown.length} {shown.length === 1 ? "team" : "teams"}{" "}
          {sport !== "ALL" && `in ${sport}`}
        </span>
        <DemoBadge compact />
      </div>

      <div className="directory-grid teams-grid">
        {shown.map((t) => (
          <Link
            className={`directory-card team-directory-card ${t.isNationalTeam || t.kind === "National team" ? "national-team-card" : ""}`}
            href={`/teams/${t.slug}`}
            key={t.slug}
          >
            <div className="team-avatar official-logo">
              <TeamLogo slug={t.slug} name={t.name} size={68} />
            </div>
            <div className="team-card-details">
              <div className="team-tag-row">
                <span className="sport-pill">{t.sport}</span>
                {(t.isNationalTeam || t.kind === "National team") && <span className="national-pill">Malawi National Team</span>}
                <TrustBadge label={t.trust} />
              </div>
              <h2>{t.name}</h2>
              {t.nickname && <p className="team-nickname">&ldquo;{t.nickname}&rdquo;</p>}
              <p className="team-location">
                <MapPin size={13} /> {t.location} · {t.region} Region
              </p>
              {t.division && <small className="team-division">{t.division}</small>}
            </div>
            <span className="card-arrow">
              <ArrowRight size={18} />
            </span>
          </Link>
        ))}
      </div>
      {!shown.length && (
        <EmptyState
          onReset={() => {
            setQ("");
            setRegion("ALL");
            setSport("ALL");
            setCategory("ALL");
          }}
        />
      )}
    </>
  );
}

export function AthleteDirectory() {
  const [q, setQ] = useState("");
  const [sport, setSport] = useState("ALL");

  const shown = athletes.filter(
    (a) =>
      (sport === "ALL" || a.sport.toLowerCase() === sport.toLowerCase()) &&
      `${a.name} ${a.team} ${a.role}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <div className="filter-panel">
        <label className="search-field">
          <Search />
          <span className="sr-only">Search athletes</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search athlete, team or role (e.g. Mwai Kumwenda, Patrick Nhlema, Temwa Chawinga)..."
          />
        </label>
        <label>
          <span>Sport</span>
          <select value={sport} onChange={(e) => setSport(e.target.value)}>
            <option value="ALL">All sports</option>
            <option value="Basketball">Basketball</option>
            <option value="Netball">Netball</option>
            <option value="Football">Football</option>
            <option value="Volleyball">Volleyball</option>
            <option value="Athletics">Athletics</option>
          </select>
        </label>
      </div>

      <div className="directory-grid">
        {shown.map((a) => (
          <Link className="directory-card athlete-card" href={`/athletes/${a.slug}`} key={a.slug}>
            <span className="number-avatar">{a.number}</span>
            <div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span className="sport-mini-badge">{a.sport}</span>
                <TrustBadge label={a.trust} />
              </div>
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
      {!shown.length && (
        <EmptyState
          onReset={() => {
            setQ("");
            setSport("ALL");
          }}
        />
      )}
    </>
  );
}

export function CompetitionDirectory() {
  const [sport, setSport] = useState("ALL");
  const filtered = competitions.filter(
    (c) => sport === "ALL" || c.sport.toLowerCase() === sport.toLowerCase()
  );

  return (
    <>
      <div className="sport-filter-tabs" role="tablist">
        {["ALL", "Basketball", "Netball", "Football", "Volleyball", "Athletics", "Boxing"].map((s) => (
          <button
            key={s}
            role="tab"
            aria-selected={sport === s}
            className={`sport-tab-btn ${sport === s ? "active" : ""}`}
            onClick={() => setSport(s)}
          >
            {s === "ALL" ? "All Competitions" : s}
          </button>
        ))}
      </div>

      <div className="directory-grid">
        {filtered.map((c, i) => (
          <Link className="directory-card comp-directory-card" href={`/competitions/${c.slug}`} key={c.slug}>
            <span className={`comp-icon symbol-${i % 3}`}>
              <Trophy />
            </span>
            <div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span className="sport-mini-badge">{c.sport}</span>
                <TrustBadge label={c.trust} />
              </div>
              <h2>{c.name}</h2>
              <p>
                {c.season} · {c.scope} · {c.format}
              </p>
              <small>
                <Users size={13} /> {c.teams} participating teams
              </small>
            </div>
            <ArrowRight size={18} />
          </Link>
        ))}
      </div>
    </>
  );
}
