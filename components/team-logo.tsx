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
  "the-flames":             { src: "/logos/flames.svg",              source: "Football Association of Malawi (FAM)" },
  "malawi-flames":          { src: "/logos/flames.svg",              source: "Football Association of Malawi (FAM)" },
  "flames":                 { src: "/logos/flames.svg",              source: "Football Association of Malawi (FAM)" },
  "the-scorchers":          { src: "/logos/scorchers.svg",           source: "Football Association of Malawi (FAM)" },
  "malawi-scorchers":       { src: "/logos/scorchers.svg",           source: "Football Association of Malawi (FAM)" },
  "scorchers":              { src: "/logos/scorchers.svg",           source: "Football Association of Malawi (FAM)" },
  "malawi-queens":          { src: "/logos/verified/netball-association-malawi.png", source: "Netball Association of Malawi" },

  // ── Super League clubs — Wikipedia/Wikimedia originals ───────────────────
  "nyasa-big-bullets":      { src: "/logos/nyasa-big-bullets.png",   source: "Wikimedia Commons (CC BY-SA 3.0)" },
  "mighty-wanderers":       { src: "/logos/mighty-wanderers.png",    source: "Wikimedia Commons (CC BY-SA 3.0)" },
  "silver-strikers":        { src: "/logos/silver-strikers.gif",     source: "Wikimedia Commons (CC BY-SA 3.0)" },

  // ── Super League clubs — representative SVG badges ───────────────────────
  "moyale-barracks":        { src: "/logos/moyale-barracks.svg",     source: "Masewera265 representative badge" },
  "kamuzu-barracks":        { src: "/logos/kamuzu-barracks.svg",     source: "Masewera265 representative badge" },
  "civil-service-united":   { src: "/logos/civil-service-united.svg",source: "Masewera265 representative badge" },
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
};

export function TeamLogo({ slug, name = "", size = 44, className = "", alt }: TeamLogoProps) {
  const entry = logoRegistry[slug];

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
