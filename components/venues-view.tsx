"use client";

import { useMemo, useState } from "react";
import Link from "@/src/platform/link";
import Image from "@/src/platform/image";
import { ArrowRight, MapPin, Search, Users, Zap } from "lucide-react";
import type { VenueDetail } from "@/lib/venues-data";
import type { EventRecord } from "@/lib/types";

export function VenuesView({ venuesData, eventsData }: { venuesData: VenueDetail[]; eventsData: EventRecord[] }) {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredVenues = useMemo(() => {
    return venuesData.filter((v) => {
      const matchRegion = selectedRegion === "All" || v.region === selectedRegion;
      const matchType = selectedType === "All" || v.type === selectedType;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q) ||
        v.district.toLowerCase().includes(q) ||
        v.sports.some((s) => s.toLowerCase().includes(q)) ||
        v.residentClubs.some((c) => c.toLowerCase().includes(q));
      return matchRegion && matchType && matchSearch;
    });
  }, [selectedRegion, selectedType, searchQuery, venuesData]);

  const totalCapacity = useMemo(() => {
    return venuesData.reduce((acc, v) => acc + v.capacityNumber, 0);
  }, [venuesData]);

  return (
    <div className="venues-view-wrapper">
      {/* Overview Stat Strip */}
      <div className="venues-stat-strip">
        <div className="stat-card">
          <MapPin size={22} className="stat-icon" />
          <div>
            <strong>{venuesData.length}</strong>
            <span>Active sporting venues</span>
          </div>
        </div>
        <div className="stat-card">
          <Users size={22} className="stat-icon" />
          <div>
            <strong>{totalCapacity.toLocaleString()}</strong>
            <span>Total national capacity</span>
          </div>
        </div>
        <div className="stat-card">
          <Zap size={22} className="stat-icon" />
          <div>
            <strong>3 Regions</strong>
            <span>Southern · Central · Northern</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-panel venues-filter-panel">
        <label className="search-field">
          <Search size={18} />
          <span className="sr-only">Search venues</span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search venue by name, district, or club (e.g. Bingu, Kamuzu, Griffin Saenda, Mzuzu)..."
          />
        </label>

        <label>
          <span>Region</span>
          <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
            <option value="All">All Regions</option>
            <option value="Central">Central Region</option>
            <option value="Southern">Southern Region</option>
            <option value="Northern">Northern Region</option>
          </select>
        </label>

        <label>
          <span>Venue Type</span>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="All">All Facilities</option>
            <option value="Stadium">Stadiums</option>
            <option value="Indoor Complex">Indoor Complexes</option>
            <option value="Court / Pavilion">Courts &amp; Pavilions</option>
            <option value="Community Ground">Community Grounds</option>
          </select>
        </label>
      </div>

      {/* Venues Grid */}
      <div className="venues-grid">
        {filteredVenues.map((v) => {
          const venueEvents = eventsData.filter((e) => e.venueSlug === v.slug);
          return (
            <article className="venue-card-rich" key={v.slug}>
              <div className="venue-card-media">
                <Image
                  src={v.image}
                  alt={v.name}
                  width={500}
                  height={280}
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  className="venue-card-img"
                />
                <span className="venue-type-tag">{v.type}</span>
                <span className="venue-region-tag">{v.region}</span>
              </div>

              <div className="venue-card-body">
                <div className="venue-card-header">
                  <h2>{v.name}</h2>
                  <p className="venue-loc">
                    <MapPin size={14} /> {v.location}
                  </p>
                </div>

                <p className="venue-summary">{v.summary}</p>

                <div className="venue-specs-list">
                  <div>
                    <span>Capacity:</span>
                    <strong>{v.capacity}</strong>
                  </div>
                  <div>
                    <span>Surface:</span>
                    <strong>{v.surface}</strong>
                  </div>
                  <div>
                    <span>Opened:</span>
                    <strong>{v.opened}</strong>
                  </div>
                  <div>
                    <span>Floodlights:</span>
                    <strong>{v.floodlights ? "Yes (Night Matches)" : "No"}</strong>
                  </div>
                </div>

                <div className="venue-sports-pills">
                  {v.sports.map((sport) => (
                    <span className="sport-tag-mini" key={sport}>
                      {sport}
                    </span>
                  ))}
                </div>

                {v.residentClubs.length > 0 && (
                  <div className="venue-tenants">
                    <small>Residents &amp; Regulars:</small>
                    <p>{v.residentClubs.join(" · ")}</p>
                  </div>
                )}
              </div>

              <footer className="venue-card-footer">
                <Link className="button design-primary" href={`/venues/${v.slug}`}>
                  Venue Profile &amp; Events <ArrowRight size={14} />
                </Link>
                {venueEvents.length > 0 && (
                  <span className="venue-events-badge">
                    {venueEvents.length} scheduled event{venueEvents.length > 1 ? "s" : ""}
                  </span>
                )}
              </footer>
            </article>
          );
        })}
      </div>

      {filteredVenues.length === 0 && (
        <div className="empty-state">
          <h3>No venues found</h3>
          <p>Try adjusting your search query or filter selection.</p>
          <button
            className="button secondary"
            onClick={() => {
              setSelectedRegion("All");
              setSelectedType("All");
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
