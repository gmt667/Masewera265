import Image from "next/image";

interface TeamLogoProps {
  slug: string;
  name?: string;
  size?: number;
  className?: string;
  alt?: string;
}

/**
 * Logo registry — maps club/team slugs to their logo assets.
 *
 * Priority:
 *  1. Real PNG/GIF downloaded from Wikipedia / Wikimedia Commons (authoritative)
 *  2. Hand-crafted SVG badge based on verified club colours (representative)
 *  3. Auto-generated initials badge (fallback)
 *
 * Sources:
 *  - FCB Nyasa Big Bullets: Wikimedia Commons (CC BY-SA 3.0)
 *  - Mighty Wanderers FC:   Wikimedia Commons (CC BY-SA 3.0)
 *  - Silver Strikers FC:    Wikimedia Commons (CC BY-SA 3.0)
 *  - All other SVGs:        Original artwork for Masewera265, colours sourced
 *                           from official club kits and FAM records.
 */
const logoRegistry: Record<string, { src: string; source: string }> = {
  // ── National teams ──────────────────────────────────────────────────────────
  "the-flames":             { src: "/logos/fam-official.png",         source: "Football Association of Malawi badge · public federation imagery" },
  "malawi-flames":          { src: "/logos/fam-official.png",         source: "Football Association of Malawi badge · public federation imagery" },
  "flames":                 { src: "/logos/fam-official.png",         source: "Football Association of Malawi badge · public federation imagery" },
  "the-scorchers":          { src: "/logos/fam-official.png",         source: "Football Association of Malawi badge · shared federation mark; standalone Scorchers crest not verified" },
  "malawi-scorchers":       { src: "/logos/fam-official.png",         source: "Football Association of Malawi badge · shared federation mark; standalone Scorchers crest not verified" },
  "scorchers":              { src: "/logos/fam-official.png",         source: "Football Association of Malawi badge · shared federation mark; standalone Scorchers crest not verified" },
  "malawi-mens-under-20":   { src: "/logos/fam-official.png",         source: "Football Association of Malawi badge · age-group crest not separately verified" },
  "malawi-mens-under-17":   { src: "/logos/fam-official.png",         source: "Football Association of Malawi badge · age-group crest not separately verified" },
  "malawi-queens":          { src: "/logos/verified/netball-association-malawi.png", source: "Netball Association of Malawi" },

  // ── Super League clubs — Wikipedia/Wikimedia originals ───────────────────
  "nyasa-big-bullets":      { src: "/logos/nyasa-big-bullets.png",   source: "Wikimedia Commons (CC BY-SA 3.0)" },
  "mighty-wanderers":       { src: "/logos/mighty-wanderers.png",    source: "Wikimedia Commons (CC BY-SA 3.0)" },
  "silver-strikers":        { src: "/logos/silver-strikers.gif",     source: "Wikimedia Commons (CC BY-SA 3.0)" },

  // ── Super League clubs — representative SVG badges ───────────────────────
  "moyale-barracks":        { src: "/logos/moyale-barracks.svg",     source: "Masewera265 representative badge" },
  "kamuzu-barracks":        { src: "/logos/kamuzu-barracks.svg",     source: "Masewera265 representative badge" },
  "kamuzu-barracks-vc":     { src: "/logos/kamuzu-barracks.svg",     source: "Masewera265 representative badge" },
  "civil-service-united":   { src: "/logos/civil-service-united.svg",source: "Masewera265 representative badge" },
  "civo-united":            { src: "/logos/civil-service-united.svg",source: "Masewera265 representative badge" },
  "civonets":               { src: "/logos/civil-service-united.svg",source: "Civo Netball representative badge" },
  "civonets-netball":       { src: "/logos/civil-service-united.svg",source: "Civo Netball representative badge" },
  "mafco-fc":               { src: "/logos/mafco-fc.svg",            source: "Masewera265 representative badge" },
  "dedza-dynamos":          { src: "/logos/dedza-dynamos.svg",       source: "Masewera265 representative badge" },
  "karonga-united":         { src: "/logos/karonga-united.svg",      source: "Masewera265 representative badge" },
  "creck-sporting":         { src: "/logos/creck-sporting.svg",      source: "Masewera265 representative badge" },
  "mighty-tigers":          { src: "/logos/mighty-tigers.svg",       source: "Masewera265 representative badge" },
  "chitipa-united":         { src: "/logos/chitipa-united.svg",      source: "Masewera265 representative badge" },
  "bangwe-all-stars":       { src: "/logos/bangwe-all-stars.svg",    source: "Masewera265 representative badge" },
  "fomo-fc":                { src: "/logos/fomo-fc.svg",             source: "Masewera265 representative badge" },
  "baka-city":              { src: "/logos/baka-city.svg",           source: "Masewera265 representative badge" },
  "songani-fc":             { src: "/logos/songani-fc.svg",          source: "Masewera265 representative badge" },

  // ── International Opponents ───────────────────────────────────────────────
  "zambia-football":        { src: "/logos/zambia-faz.svg",          source: "Football Association of Zambia (FAZ)" },
  "chipolopolo":            { src: "/logos/zambia-faz.svg",          source: "Football Association of Zambia (FAZ)" },
  "zambia":                 { src: "/logos/zambia-faz.svg",          source: "Football Association of Zambia (FAZ)" },
  "south-africa-netball":   { src: "/logos/south-africa-proteas.svg",source: "Netball South Africa (SPAR Proteas)" },
  "south-africa-proteas":   { src: "/logos/south-africa-proteas.svg",source: "Netball South Africa (SPAR Proteas)" },
  "south-africa":           { src: "/logos/south-africa-proteas.svg",source: "Netball South Africa (SPAR Proteas)" },

  // ── Netball Clubs ─────────────────────────────────────────────────────────
  "fcb-diamonds":           { src: "/logos/fcb-diamonds.svg",        source: "FCB Kukoma Diamonds Netball Club" },
  "kukoma-diamonds":        { src: "/logos/fcb-diamonds.svg",        source: "FCB Kukoma Diamonds Netball Club" },
  "first-choice-tigresses": { src: "/logos/tigresses-netball.svg",   source: "First Choice Tigresses Netball Club" },
  "tigresses-netball":      { src: "/logos/tigresses-netball.svg",   source: "First Choice Tigresses Netball Club" },
  "blue-eagles-sisters":    { src: "/logos/blue-eagles.svg",         source: "Blue Eagles Area 30 Sports Club" },
  "blue-eagles":            { src: "/logos/blue-eagles.svg",         source: "Blue Eagles Area 30 Sports Club" },
  "blue-eagles-vc":         { src: "/logos/blue-eagles.svg",         source: "Blue Eagles Area 30 Sports Club" },
  "thunder-queens":         { src: "/logos/verified/netball-association-malawi.png", source: "Thunder Queens Netball" },
  "capital-queens":         { src: "/logos/verified/netball-association-malawi.png", source: "Capital Queens Netball" },
  "southern-sparks":        { src: "/logos/verified/netball-association-malawi.png", source: "Southern Sparks Netball" },

  // ── Basketball Clubs & Associations ───────────────────────────────────────
  "bravehearts-basketball": { src: "/logos/bravehearts-basketball.svg", source: "Bravehearts Basketball Club" },
  "bravehearts-bc":         { src: "/logos/bravehearts-basketball.svg", source: "Bravehearts Basketball Club" },
  "bravehearts-ladies":     { src: "/logos/bravehearts-basketball.svg", source: "Bravehearts Basketball Club" },
  "bravehearts-continental":{ src: "/logos/bravehearts-basketball.svg", source: "Bravehearts Basketball Club" },
  "central-knights":        { src: "/logos/central-knights.svg",     source: "Central Knights Basketball Club" },
  "cougars-basketball":     { src: "/logos/cougars-basketball.svg",  source: "Cougars Basketball Club" },
  "cougars":                { src: "/logos/cougars-basketball.svg",  source: "Cougars Basketball Club" },
  "blantyre-blazers":       { src: "/logos/blantyre-blazers.svg",    source: "Blantyre Blazers Basketball Club" },
  "mzuzu-jazz":             { src: "/logos/mzuzu-jazz.svg",          source: "Mzuzu Jazz Basketball Club" },
  "malawi-mens-basketball": { src: "/logos/bravehearts-basketball.svg", source: "Basketball Association of Malawi" },
  "malawi-womens-basketball":{ src: "/logos/bravehearts-basketball.svg", source: "Basketball Association of Malawi" },
  "lilongwe-titans":        { src: "/logos/central-knights.svg",     source: "Lilongwe Titans" },
  "blantyre-falcons":       { src: "/logos/blantyre-blazers.svg",    source: "Blantyre Falcons" },

  // ── Athletics ─────────────────────────────────────────────────────────────
  "athletics-malawi":       { src: "/logos/athletics-malawi.svg",    source: "Athletics Malawi National Federation" },
  "regional-athletics":     { src: "/logos/athletics-malawi.svg",    source: "Athletics Malawi Regional Field" },

  // ── Volleyball ────────────────────────────────────────────────────────────
  "wolves-volleyball":      { src: "/logos/wolves-volleyball.svg",   source: "Wolves Volleyball Club" },
  "wolves":                 { src: "/logos/wolves-volleyball.svg",   source: "Wolves Volleyball Club" },
  "moyale-spikers":         { src: "/logos/moyale-barracks.svg",     source: "Moyale Spikers Volleyball" },
  "police-spikers":         { src: "/logos/blue-eagles.svg",         source: "Police Spikers Area 30" },
  "malawi-mens-volleyball": { src: "/logos/kamuzu-barracks.svg",     source: "Volleyball Association of Malawi" },

  // ── Boxing ────────────────────────────────────────────────────────────────
  "maba":                   { src: "/logos/maba.svg",                source: "Malawi Boxing Association" },
  "malawi-boxing":          { src: "/logos/maba.svg",                source: "Malawi Boxing Association" },
};

export function getTeamLogoSource(slug: string) {
  const norm = (slug || "").toLowerCase().replace(/[\s_]+/g, "-");
  return logoRegistry[norm]?.source ?? logoRegistry[slug]?.source ?? "No verified logo asset; neutral initials fallback";
}

export function TeamLogo({ slug, name = "", size = 44, className = "", alt }: TeamLogoProps) {
  const norm = (slug || name || "").toLowerCase().replace(/[\s_]+/g, "-");
  const entry = logoRegistry[norm] || logoRegistry[slug];

  if (entry) {
    return (
      <Image
        src={entry.src}
        width={size}
        height={size}
        className={className}
        alt={alt ?? `${name || slug} crest — source: ${entry.source}`}
        style={{ objectFit: "contain" }}
        unoptimized={entry.src.endsWith(".gif") || entry.src.endsWith(".svg")}
      />
    );
  }

  // Fallback: auto-generated SVG initials badge
  const initials = (name || slug || "MW")
    .split(/[\s-]+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={`${name || slug} — official logo pending verification`}
    >
      <defs>
        <linearGradient id={`grad-${slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#087f73" />
          <stop offset="100%" stopColor="#101827" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill={`url(#grad-${slug})`} stroke="#f4b942" strokeWidth="3" />
      <text
        x="50"
        y="56"
        textAnchor="middle"
        fill="#fff"
        fontSize="28"
        fontWeight="800"
        fontFamily="sans-serif"
      >
        {initials}
      </text>
    </svg>
  );
}
