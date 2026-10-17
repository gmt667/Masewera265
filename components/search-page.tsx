"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { articles, athletes, competitions, sports, teams } from "@/lib/demo-data";
import { malawiVenues } from "@/lib/venues-data";
import { EmptyState, TrustBadge } from "./ui";
import type { TrustLabel } from "@/lib/types";

export function SearchExperience() {
  const searchParams = useSearchParams();
  const initialQ = searchParams?.get("q") || "";
  const [q, setQ] = useState(initialQ);

  useEffect(() => {
    const paramQ = searchParams?.get("q");
    if (paramQ !== null && paramQ !== undefined) {
      setQ(paramQ);
    }
  }, [searchParams]);

  const term = q.trim().toLowerCase();

  const groups = useMemo(() => {
    if (!term) return [];
    return [
      {
        name: "Sports Platforms",
        items: sports
          .filter((x) => x.name.toLowerCase().includes(term) || x.summary.toLowerCase().includes(term))
          .map((x) => ({
            label: x.name,
            sub: `${x.federation || "Sport platform"} · ${x.format}`,
            href: `/sports/${x.slug}`,
          })),
      },
      {
        name: "Teams & Clubs",
        items: teams
          .filter((x) => `${x.name} ${x.location} ${x.nickname || ""}`.toLowerCase().includes(term))
          .map((x) => ({
            label: x.name,
            sub: `${x.sport} · ${x.location} · ${x.region} Region`,
            href: `/teams/${x.slug}`,
            trust: x.trust,
          })),
      },
      {
        name: "Athletes",
        items: athletes
          .filter((x) => `${x.name} ${x.team} ${x.role}`.toLowerCase().includes(term))
          .map((x) => ({
            label: x.name,
            sub: `${x.sport} · ${x.role} (${x.team})`,
            href: `/athletes/${x.slug}`,
            trust: x.trust,
          })),
      },
      {
        name: "Competitions & Cups",
        items: competitions
          .filter((x) => `${x.name} ${x.sport}`.toLowerCase().includes(term))
          .map((x) => ({
            label: x.name,
            sub: `${x.sport} · ${x.season} · ${x.organizer}`,
            href: `/competitions/${x.slug}`,
            trust: x.trust,
          })),
      },
      {
        name: "Venues & Stadiums",
        items: malawiVenues
          .filter(
            (v) =>
              `${v.name} ${v.location} ${v.district} ${v.sports.join(" ")}`.toLowerCase().includes(term)
          )
          .map((v) => ({
            label: v.name,
            sub: `${v.type} · ${v.district} (${v.region} Region) · Cap: ${v.capacity}`,
            href: `/venues/${v.slug}`,
          })),
      },
      {
        name: "News & Features",
        items: articles
          .filter((x) => `${x.title} ${x.excerpt}`.toLowerCase().includes(term))
          .map((x) => ({
            label: x.title,
            sub: `${x.sport} · ${x.published}`,
            href: `/news/${x.slug}`,
          })),
      },
    ];
  }, [term]);

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <label className="search-page-field">
        <Search />
        <span className="sr-only">Search the platform</span>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search sports, teams, athletes, venues, competitions and news..."
        />
        <kbd>Search</kbd>
      </label>

      {!term ? (
        <div className="search-prompt">
          <Search size={36} />
          <h2>Search across Masewera265</h2>
          <p>
            Try searching for <strong>“Kamuzu”</strong>, <strong>“Lilongwe”</strong>, <strong>“Queens”</strong>,{" "}
            <strong>“Bullets”</strong>, <strong>“Bravehearts”</strong>, or <strong>“Netball”</strong>.
          </p>
        </div>
      ) : total === 0 ? (
        <EmptyState onReset={() => setQ("")} />
      ) : (
        <>
          <p className="search-summary">
            {total} result{total > 1 ? "s" : ""} found for <strong>&ldquo;{q}&rdquo;</strong>
          </p>
          <div className="search-groups">
            {groups
              .filter((g) => g.items.length > 0)
              .map((g) => (
                <section key={g.name}>
                  <h2>
                    {g.name} <span>{g.items.length}</span>
                  </h2>
                  {g.items.map((item) => (
                    <Link href={item.href} key={item.href}>
                      <div>
                        <h3>{item.label}</h3>
                        <p>{item.sub}</p>
                      </div>
                      {"trust" in item && item.trust ? (
                        <TrustBadge label={item.trust as TrustLabel} />
                      ) : null}
                      <ArrowRight />
                    </Link>
                  ))}
                </section>
              ))}
          </div>
        </>
      )}
    </>
  );
}
