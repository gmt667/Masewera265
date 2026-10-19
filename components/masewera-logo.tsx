import Link from "@/src/platform/link";
import { useId } from "react";

interface MaseweraLogoProps {
  className?: string;
  crestSize?: number;
  showText?: boolean;
  linkToHome?: boolean;
}

export function MaseweraCrest({ size = 36, className = "" }: { size?: number; className?: string }) {
  const id = useId();
  const ids = {
    shield: `${id}-shield`,
    border: `${id}-border`,
    sun: `${id}-sun`,
    red: `${id}-red`,
    green: `${id}-green`,
    shadow: `${id}-shadow`,
  };
  return (
    <svg
      className={`brand-crest ${className}`}
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={ids.shield} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f192b" />
          <stop offset="100%" stopColor="#060a12" />
        </linearGradient>
        <linearGradient id={ids.border} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#ef233c" />
          <stop offset="100%" stopColor="#00d084" />
        </linearGradient>
        <linearGradient id={ids.sun} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#ef233c" />
        </linearGradient>
        <linearGradient id={ids.red} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4d61" />
          <stop offset="100%" stopColor="#c9182b" />
        </linearGradient>
        <linearGradient id={ids.green} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#057a55" />
        </linearGradient>
        <filter id={ids.shadow} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.45" />
        </filter>
      </defs>
      {/* Outer Shield Contour */}
      <path
        d="M22 2.5 C31.5 2.5 39.5 5.5 39.5 15 C39.5 28.5 22 41.5 22 41.5 C22 41.5 4.5 28.5 4.5 15 C4.5 5.5 12.5 2.5 22 2.5 Z"
        fill={`url(#${ids.shield})`}
        stroke={`url(#${ids.border})`}
        strokeWidth="1.6"
        strokeLinejoin="round"
        filter={`url(#${ids.shadow})`}
      />
      {/* Inner Shield Accent */}
      <path
        d="M22 5 C29.5 5 36.5 7.5 36.5 15 C36.5 26.5 22 38 22 38 C22 38 7.5 26.5 7.5 15 C7.5 7.5 14.5 5 22 5 Z"
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="0.8"
      />
      {/* Malawi Rising Sun Rays */}
      <g stroke={`url(#${ids.sun})`} strokeWidth="1.3" strokeLinecap="round" opacity="0.95">
        <line x1="22" y1="7" x2="22" y2="10.5" />
        <line x1="26.2" y1="7.8" x2="24.8" y2="11" />
        <line x1="30" y1="10.2" x2="27.7" y2="12.6" />
        <line x1="32.2" y1="13.8" x2="29.2" y2="14.9" />
        <line x1="17.8" y1="7.8" x2="19.2" y2="11" />
        <line x1="14" y1="10.2" x2="16.3" y2="12.6" />
        <line x1="11.8" y1="13.8" x2="14.8" y2="14.9" />
      </g>
      {/* Rising Sun Core */}
      <circle cx="22" cy="16" r="2.8" fill={`url(#${ids.sun})`} />
      {/* Dynamic Athletic M (Red Flames Swoosh) */}
      <path
        d="M11 30.5 L11 20.5 C11 17 15 16 17.5 19.5 L22 25.5 L26.5 19.5 C29 16 33 17 33 20.5 L33 30.5"
        fill="none"
        stroke={`url(#${ids.red})`}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner Pitch Chevron (Green Swoosh) */}
      <path
        d="M16 30.5 L22 22 L28 30.5"
        fill="none"
        stroke={`url(#${ids.green})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Central Triumph Spark */}
      <circle cx="22" cy="22" r="1.3" fill="#f59e0b" />
      {/* 265 Tag Badge */}
      <rect x="13.5" y="31.5" width="17" height="6.5" rx="3.25" fill="#080f1a" stroke={`url(#${ids.border})`} strokeWidth="0.8" />
      <text
        x="22"
        y="36.2"
        fontFamily="Arial, sans-serif"
        fontSize="4.4"
        fontWeight="900"
        fill="#ffffff"
        textAnchor="middle"
        letterSpacing="0.6"
      >
        265
      </text>
    </svg>
  );
}

export function MaseweraLogo({
  className = "",
  crestSize = 36,
  showText = true,
  linkToHome = true,
}: MaseweraLogoProps) {
  const content = (
    <div className={`brand-logo-wrap ${className}`}>
      <MaseweraCrest size={crestSize} />
      {showText && (
        <div className="brand-text">
          <span className="brand-title">
            <b>MASEWERA</b>
            <strong className="brand-code">265</strong>
          </span>
          <small className="brand-sub">MALAWI&apos;S DIGITAL HOME FOR SPORT</small>
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="brand" aria-label="Masewera265 home">
        {content}
      </Link>
    );
  }

  return content;
}
