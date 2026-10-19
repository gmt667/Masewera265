"use client";

import { useMemo, useState } from "react";
import Image from "@/src/platform/image";
import Link from "@/src/platform/link";
import { ArrowRight, MapPin, Users, Zap, Sun, ShieldCheck, Search, Filter, Trophy, Compass } from "lucide-react";
import type { FootballStadium } from "@/lib/football-data";

interface Props {
  stadiums: FootballStadium[];
}

export function FootballStadiumsView({ stadiums }: Props) {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"capacity-desc" | "capacity-asc" | "name">("capacity-desc");

  // Summary Metrics
  const totalCapacity = useMemo(() => {
    return stadiums.reduce((acc, s) => acc + (s.capacityNumber || 0), 0);
  }, [stadiums]);

  const largestStadium = useMemo(() => {
    return [...stadiums].sort((a, b) => (b.capacityNumber || 0) - (a.capacityNumber || 0))[0];
  }, [stadiums]);

  // Filtered & Sorted Stadiums
  const filteredStadiums = useMemo(() => {
    return stadiums
      .filter((s) => {
        const matchesRegion = selectedRegion === "All" || s.region === selectedRegion;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          s.name.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q) ||
          s.district.toLowerCase().includes(q) ||
          s.residentClubs.some((club) => club.toLowerCase().includes(q)) ||
          s.surface.toLowerCase().includes(q);
        return matchesRegion && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "capacity-desc") return (b.capacityNumber || 0) - (a.capacityNumber || 0);
        if (sortBy === "capacity-asc") return (a.capacityNumber || 0) - (b.capacityNumber || 0);
        return a.name.localeCompare(b.name);
      });
  }, [stadiums, selectedRegion, searchQuery, sortBy]);

  const regionCounts = useMemo(() => {
    return {
      All: stadiums.length,
      Central: stadiums.filter((s) => s.region === "Central").length,
      Southern: stadiums.filter((s) => s.region === "Southern").length,
      Northern: stadiums.filter((s) => s.region === "Northern").length,
    };
  }, [stadiums]);

  return (
    <div className="stadiums-view-container">
      {/* Infrastructure Top Overview */}
      <div className="stadiums-overview-strip">
        <div className="overview-metric-card">
          <span className="metric-icon-bubble">
            <Users size={18} />
          </span>
          <div className="metric-copy">
            <strong className="metric-figure">{totalCapacity.toLocaleString()}</strong>
            <span className="metric-title">National Seating Capacity</span>
          </div>
        </div>

        <div className="overview-metric-card">
          <span className="metric-icon-bubble bubble-amber">
            <Trophy size={18} />
          </span>
          <div className="metric-copy">
            <strong className="metric-figure">{largestStadium?.name || "Kamuzu Stadium"}</strong>
            <span className="metric-title">Largest Fortress ({largestStadium?.capacity} cap)</span>
          </div>
        </div>

        <div className="overview-metric-card">
          <span className="metric-icon-bubble bubble-teal">
            <ShieldCheck size={18} />
          </span>
          <div className="metric-copy">
            <strong className="metric-figure">{stadiums.length} Approved Grounds</strong>
            <span className="metric-title">FAM &amp; SULOM Inspected Venues</span>
          </div>
        </div>

        <div className="overview-metric-card">
          <span className="metric-icon-bubble bubble-blue">
            <Compass size={18} />
          </span>
          <div className="metric-copy">
            <strong className="metric-figure">3 Regions Covered</strong>
            <span className="metric-title">North · Central · South</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Region Filter, Capacity Sort */}
      <div className="stadiums-control-bar">
        <div className="stadiums-search-box">
          <Search size={16} className="search-lens-icon" />
          <input
            type="text"
            placeholder="Search venue by name, district, or resident club..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search stadiums"
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>

        <div className="stadiums-filters-row">
          <div className="region-filter-tabs">
            {(["All", "Central", "Southern", "Northern"] as const).map((region) => (
              <button
                key={region}
                className={`region-tab-btn ${selectedRegion === region ? "active" : ""}`}
                onClick={() => setSelectedRegion(region)}
              >
                {region === "All" ? "All Venues" : `${region} Region`}
                <span className="tab-count-pill">{regionCounts[region]}</span>
              </button>
            ))}
          </div>

          <div className="sort-selector-wrap">
            <label htmlFor="stadium-sort">
              <Filter size={13} /> Sort:
            </label>
            <select
              id="stadium-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "capacity-desc" | "capacity-asc" | "name")}
            >
              <option value="capacity-desc">Highest Capacity</option>
              <option value="capacity-asc">Lowest Capacity</option>
              <option value="name">Venue Name (A–Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count Summary */}
      <div className="stadiums-results-summary">
        <p>
          Showing <b>{filteredStadiums.length}</b> of <b>{stadiums.length}</b> verified Malawian grounds
          {selectedRegion !== "All" && <> in <b>{selectedRegion} Region</b></>}
          {searchQuery && <> matching &ldquo;<b>{searchQuery}</b>&rdquo;</>}
        </p>
      </div>

      {/* Stadiums Grid */}
      <div className="stadiums-grid">
        {filteredStadiums.map((stad) => {
          const maxCapacity = 45000;
          const capacityPercent = Math.min(
            100,
            Math.round(((stad.capacityNumber || 10000) / maxCapacity) * 100)
          );

          return (
            <article className="stadium-full-card" key={stad.slug}>
              {/* Venue Photography Header */}
              <div className="stadium-card-media">
                <Image
                  src={stad.image}
                  alt={`${stad.name} pitch and spectator stands`}
                  width={680}
                  height={320}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="stadium-photo"
                />
                <div className="stadium-photo-gradient" />

                <div className="stadium-photo-top-tags">
                  <span className={`stadium-region-badge region-${stad.region.toLowerCase()}`}>
                    {stad.region} Region
                  </span>
                  {stad.tier && (
                    <span className="stadium-tier-badge">
                      {stad.tier.includes("International") ? "International" : "Premiership Grade"}
                    </span>
                  )}
                </div>

                <div className="stadium-photo-bottom-specs">
                  <span className="stadium-capacity-chip">
                    <Users size={14} /> <b>{stad.capacity}</b> seats
                  </span>
                  {stad.floodlights ? (
                    <span className="spec-feature-badge has-lights" title="Equipped for evening floodlit matches">
                      <Zap size={12} /> Floodlights
                    </span>
                  ) : (
                    <span className="spec-feature-badge no-lights" title="Daylight matches only">
                      <Sun size={12} /> Daylight Only
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="stadium-card-body">
                <div className="stadium-header-row">
                  <div>
                    <h2>{stad.name}</h2>
                    <p className="location-line">
                      <MapPin size={13} /> {stad.location} · <b>{stad.district} District</b>
                    </p>
                  </div>
                </div>

                {/* Capacity Visual Progress Bar */}
                <div className="capacity-bar-container">
                  <div className="capacity-bar-header">
                    <span>Capacity scale</span>
                    <b>{stad.capacity} spectator capacity</b>
                  </div>
                  <div className="capacity-bar-track">
                    <div
                      className="capacity-bar-fill"
                      style={{ width: `${capacityPercent}%` }}
                    />
                  </div>
                </div>

                <p className="stadium-summary">{stad.summary}</p>

                {/* Specifications Grid */}
                <div className="stadium-details-box">
                  <div className="detail-item">
                    <span>Playing Surface</span>
                    <b>{stad.surface}</b>
                  </div>
                  <div className="detail-item">
                    <span>Inaugurated / Modernized</span>
                    <b>{stad.opened}</b>
                  </div>
                  <div className="detail-item full-width">
                    <span>Resident &amp; Hosting Clubs</span>
                    <div className="resident-clubs-pills">
                      {stad.residentClubs.map((club) => (
                        <span className="resident-club-tag" key={club}>
                          {club}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <footer className="stadium-card-footer">
                <Link
                  className="button design-primary"
                  href={`/fixtures?location=${encodeURIComponent(stad.district)}`}
                >
                  View Fixtures at {stad.name} <ArrowRight size={14} />
                </Link>
                <Link
                  className="button design-outline stadium-teams-btn"
                  href={`/teams?region=${encodeURIComponent(stad.region)}`}
                >
                  {stad.region} Teams
                </Link>
              </footer>
            </article>
          );
        })}
      </div>

      {filteredStadiums.length === 0 && (
        <div className="empty-stadiums-box">
          <p>No Malawian stadiums found matching your filter criteria.</p>
          <button
            className="button design-primary"
            onClick={() => {
              setSelectedRegion("All");
              setSearchQuery("");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
