import React from "react";
import {
  Accessibility,
  Activity,
  Award,
  Bike,
  CircleDot,
  Crown,
  Disc,
  Flame,
  Flag,
  Shield,
  Target,
  Trophy,
  Waves,
  Zap,
} from "lucide-react";

export function FootballBallIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="12 8 8 11 9.5 15 14.5 15 16 11 12 8" fill="currentColor" fillOpacity="0.25" />
      <line x1="12" y1="2" x2="12" y2="8" />
      <line x1="4.5" y1="6.5" x2="8" y2="11" />
      <line x1="19.5" y1="6.5" x2="16" y2="11" />
      <line x1="6.5" y1="18.5" x2="9.5" y2="15" />
      <line x1="17.5" y1="18.5" x2="14.5" y2="15" />
    </svg>
  );
}

export function SportIcon({
  sport,
  size = 20,
  className = "",
}: {
  sport: string;
  size?: number;
  className?: string;
}) {
  const s = (sport || "").toLowerCase().replace(/[\s_]+/g, "-");

  switch (s) {
    case "football":
      return <FootballBallIcon size={size} className={className} />;
    case "netball":
      return <Target size={size} className={className} />;
    case "basketball":
      return <CircleDot size={size} className={className} />;
    case "volleyball":
      return <Disc size={size} className={className} />;
    case "athletics":
      return <Flame size={size} className={className} />;
    case "boxing":
      return <Shield size={size} className={className} />;
    case "cricket":
      return <Award size={size} className={className} />;
    case "rugby":
      return <Activity size={size} className={className} />;
    case "chess":
      return <Crown size={size} className={className} />;
    case "tennis":
      return <Zap size={size} className={className} />;
    case "hockey":
      return <Trophy size={size} className={className} />;
    case "cycling":
      return <Bike size={size} className={className} />;
    case "swimming":
      return <Waves size={size} className={className} />;
    case "golf":
      return <Flag size={size} className={className} />;
    case "disability-sport":
      return <Accessibility size={size} className={className} />;
    default:
      return <Trophy size={size} className={className} />;
  }
}
