"use client";

import Link from "@/src/platform/link";
import { useSearchParams } from "@/src/platform/navigation";
import { Search, MapPin, Users, Trophy, ArrowRight, Award } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Athlete, Competition, EventRecord, Sport, Team } from "@/lib/types";
import { DemoBadge, EmptyState, EventCard, TimeNote, TrustBadge } from "./ui";
import { TeamLogo } from "./team-logo";
import { SportIcon } from "./sport-icon";

export function FixtureBrowser({
  resultOnly = false,
  liveOnly = false,
  eventsData,
  sportsData,
}: {
  resultOnly?: boolean;
  liveOnly?: boolean;
  eventsData: EventRecord[];
  sportsData: Sport[];
}) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get("q") || "");
  const [status, setStatus] = useState(
    resultOnly
      ? "FINAL"
      : liveOnly
      ? "LIVE"
      : searchParams?.get("status") || "ALL"
  );
  const [location, setLocation] = useState(searchParams?.get("location") || "ALL");
  const [sport, setSport] = useState(searchParams?.get("sport") || "ALL");

  useEffect(() => {
    if (searchParams) {
      const pSport = searchParams.get("sport");
      if (pSport) setSport(pSport);
      const pLoc = searchParams.get("location");
      if (pLoc) setLocation(pLoc);
      const pQ = searchParams.get("q");
      if (pQ) setQuery(pQ);
      const pStatus = searchParams.get("status");
      if (pStatus && !resultOnly && !liveOnly) setStatus(pStatus);
    }
  }, [searchParams, resultOnly, liveOnly]);

  const filtered = useMemo(
    () =>
      eventsData.filter(
        (event) =>
          (!resultOnly || event.status === "FINAL") &&
          (!liveOnly || event.status === "LIVE") &&
          (status === "ALL" || event.status === status) &&
          (location === "ALL" || event.location.toLowerCase() === location.toLowerCase() || event.venue.toLowerCase().includes(location.toLowerCase())) &&
          (sport === "ALL" || event.sport.toLowerCase() === sport.toLowerCase()) &&
          `${event.home} ${event.away} ${event.competition} ${event.sport} ${event.venue}`
            .toLowerCase()
            .includes(query.toLowerCase())
      ),
    [query, status, location, sport, resultOnly, liveOnly, eventsData]
  );

  const reset = () => {
    setQuery("");
    setStatus(resultOnly ? "FINAL" : liveOnly ? "LIVE" : "ALL");
    setLocation("ALL");
    setSport("ALL");
  };

  const sportList = ["ALL", ...sportsData.map((item) => item.name)];

  return (
    <>
      {/* Sport quick selector tabs */}
      <div className="sport-filter-tabs" role="group" aria-label="Filter by sport">
        {sportList.map((s) => (
          <button
            key={s}
            aria-pressed={sport.toLowerCase() === s.toLowerCase()}
            className={`sport-tab-btn ${sport.toLowerCase() === s.toLowerCase() ? "active" : ""}`}
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
            placeholder="Search team, sport, venue or competition..."
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
            {[...new Set(eventsData.map((event) => event.location))].map((value) => (
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

export function SportsDirectory({ sportsData }: { sportsData: Sport[] }) {
  const [q, setQ] = useState("");
  const shown = sportsData.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));

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
              <span className="functional-badge">Active hub</span>
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

export function TeamDirectory({ teamsData, sportsData }: { teamsData: Team[]; sportsData: Sport[] }) {
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams?.get("q") || "");
  const [region, setRegion] = useState(searchParams?.get("region") || "ALL");
  const [sport, setSport] = useState(searchParams?.get("sport") || "ALL");
  const [category, setCategory] = useState(searchParams?.get("category") || "ALL");

  useEffect(() => {
    if (searchParams) {
      const pRegion = searchParams.get("region");
      if (pRegion) setRegion(pRegion);
      const pSport = searchParams.get("sport");
      if (pSport) setSport(pSport);
      const pCat = searchParams.get("category");
      if (pCat) setCategory(pCat);
      const pQ = searchParams.get("q");
      if (pQ) setQ(pQ);
    }
  }, [searchParams]);

  const sportList = ["ALL", ...sportsData.map((item) => item.name)];

  const shown = useMemo(() => {
    return teamsData.filter((t) => {
      const matchRegion = region === "ALL" || t.region.toLowerCase() === region.toLowerCase();
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
  }, [q, region, sport, category, teamsData]);

  return (
    <>
      {/* Quick Sport Selector Bar */}
      <div className="sport-filter-tabs" role="group" aria-label="Filter teams by sport">
        {sportList.map((s) => (
          <button
            key={s}
            aria-pressed={sport.toLowerCase() === s.toLowerCase()}
            className={`sport-tab-btn ${sport.toLowerCase() === s.toLowerCase() ? "active" : ""}`}
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
            <option value="ALL">All teams &amp; squads</option>
            <option value="NATIONAL">Malawi National Teams</option>
            <option value="CLUBS">League &amp; Club Teams</option>
          </select>
        </label>
        <label>
          <span>Region</span>
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="ALL">All Regions</option>
            <option value="Southern">Southern Region</option>
            <option value="Central">Central Region</option>
            <option value="Northern">Northern Region</option>
            <option value="National">National Selections</option>
          </select>
        </label>
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
      </div>

      <div className="results-count">
        <span>
          {shown.length} {shown.length === 1 ? "team" : "teams"} found
          {sport !== "ALL" && ` · ${sport}`}
          {region !== "ALL" && ` · ${region}`}
        </span>
      </div>

      <div className="directory-grid">
        {shown.map((t) => (
          <Link className="directory-card team-card" href={`/teams/${t.slug}`} key={t.slug}>
            <div className="team-card-crest">
              <TeamLogo slug={t.slug} name={t.name} size={48} />
            </div>
            <div className="team-card-info">
              <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
                <span className="sport-mini-badge">{t.sport}</span>
                {t.isNationalTeam && <span className="national-mini-tag">National</span>}
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

export function AthleteDirectory({ athletesData, sportsData }: { athletesData: Athlete[]; sportsData: Sport[] }) {
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams?.get("q") || "");
  const [sport, setSport] = useState(searchParams?.get("sport") || "ALL");

  useEffect(() => {
    if (searchParams) {
      const pSport = searchParams.get("sport");
      if (pSport) setSport(pSport);
      const pQ = searchParams.get("q");
      if (pQ) setQ(pQ);
    }
  }, [searchParams]);

  const sportList = ["ALL", ...sportsData.map((item) => item.name)];

  const shown = athletesData.filter(
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
            {sportList.map((s) => (
              <option key={s} value={s}>
                {s === "ALL" ? "All sports" : s}
              </option>
            ))}
          </select>
        </label>
        <button
          className="button filter-reset"
          onClick={() => {
            setQ("");
            setSport("ALL");
          }}
        >
          Reset
        </button>
      </div>

      <div className="results-count">
        <span>
          {shown.length} {shown.length === 1 ? "athlete profile" : "athlete profiles"} found
          {sport !== "ALL" && ` in ${sport}`}
        </span>
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

export function CompetitionDirectory({ competitionsData, sportsData }: { competitionsData: Competition[]; sportsData: Sport[] }) {
  const searchParams = useSearchParams();
  const [sport, setSport] = useState(searchParams?.get("sport") || "ALL");

  useEffect(() => {
    if (searchParams) {
      const pSport = searchParams.get("sport");
      if (pSport) setSport(pSport);
    }
  }, [searchParams]);

  const sportList = ["ALL", ...sportsData.map((item) => item.name)];

  const filtered = competitionsData.filter(
    (c) => sport === "ALL" || c.sport.toLowerCase() === sport.toLowerCase()
  );

  return (
    <>
      <div className="sport-filter-tabs" role="group" aria-label="Filter competitions by sport">
        {sportList.map((s) => (
          <button
            key={s}
            aria-pressed={sport.toLowerCase() === s.toLowerCase()}
            className={`sport-tab-btn ${sport.toLowerCase() === s.toLowerCase() ? "active" : ""}`}
            onClick={() => setSport(s)}
          >
            {s === "ALL" ? "All Competitions" : s}
          </button>
        ))}
      </div>

      <div className="results-count">
        <span>
          {filtered.length} {filtered.length === 1 ? "competition" : "competitions"}
          {sport !== "ALL" && ` in ${sport}`}
        </span>
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
