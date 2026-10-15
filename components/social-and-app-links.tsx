import React from "react";

export function AppleLogo({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.67-.82 1.13-1.96 1.01-3.1-.98.04-2.17.66-2.86 1.47-.61.71-1.14 1.87-1 2.98 1.1.09 2.22-.57 2.85-1.35z"/>
    </svg>
  );
}

export function GooglePlayLogo({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3.609 1.814C3.376 2.067 3.24 2.464 3.24 3.003v17.994c0 .54.136.936.369 1.189l.062.062 10.076-10.076v-.344L3.671 1.752l-.062.062z" fill="#00D2FF"/>
      <path d="M17.108 15.534l-3.361-3.362v-.344l3.361-3.362.076.044 3.985 2.264c1.138.647 1.138 1.707 0 2.355l-3.985 2.264-.076.041z" fill="#FFCE00"/>
      <path d="M17.184 15.493l-3.437-3.437L3.609 22.186c.376.398.998.448 1.696.052l11.879-6.745" fill="#FF3A44"/>
      <path d="M17.184 8.507L5.305 1.762C4.607 1.366 3.985 1.416 3.609 1.814l10.138 10.13 3.437-3.437z" fill="#00E676"/>
    </svg>
  );
}

export function AppStoreBadge({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="https://apps.apple.com"
      target="_blank"
      rel="noopener noreferrer"
      className={`app-store-badge ${compact ? "compact" : ""}`}
      aria-label="Download on the App Store"
    >
      <AppleLogo size={compact ? 20 : 26} className="store-badge-icon" />
      <div className="store-badge-text">
        <small>Download on the</small>
        <strong>App Store</strong>
      </div>
    </a>
  );
}

export function GooglePlayBadge({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="https://play.google.com"
      target="_blank"
      rel="noopener noreferrer"
      className={`app-store-badge google-play-badge ${compact ? "compact" : ""}`}
      aria-label="Get it on Google Play"
    >
      <GooglePlayLogo size={compact ? 19 : 24} className="store-badge-icon" />
      <div className="store-badge-text">
        <small>GET IT ON</small>
        <strong>Google Play</strong>
      </div>
    </a>
  );
}

export const socialPlatforms = [
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@masewera265",
    color: "#00f2fe",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.33 6.33 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.19 8.19 0 0 0 4.85 1.57v-3.45a4.85 4.85 0 0 1-1.08-.14z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@masewera265",
    color: "#ff0000",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/masewera265",
    color: "#0a66c2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 1.64-1.64c0-.91-.73-1.64-1.64-1.64a1.64 1.64 0 0 0-1.64 1.64c0 .91.73 1.64 1.64 1.64m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/masewera265",
    color: "#e1306c",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/265888000000",
    color: "#25d366",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25.7-.72 1.27-1.39 1.63-.58.32-1.33.48-2.22.48-.9 0-1.92-.26-3.08-.8-1.57-.72-2.96-1.91-3.96-3.39-.4-.59-.72-1.24-.96-1.92-.35-1-.18-1.87.16-2.42.23-.37.58-.61.94-.61.15 0 .3.03.43.08.15.06.27.17.37.33.24.41.67 1.48.77 1.7.07.15.07.31.01.46-.07.17-.19.33-.33.49l-.26.27c-.12.12-.22.25-.11.45.36.63.85 1.22 1.44 1.72.58.49 1.24.87 1.95 1.13.19.07.32.03.42-.09.13-.15.34-.43.51-.67.11-.15.25-.2.4-.14.15.06 1.45.68 1.68.79.16.08.26.13.3.2.06.12.06.52-.19 1.22z"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/masewera265",
    color: "#1877f2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: "Snapchat",
    href: "https://www.snapchat.com/add/masewera265",
    color: "#fffc00",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.002 2c-3.87 0-6.84 2.68-6.97 6.42-.03.8.17 1.64.48 2.37.15.36.06.52-.22.74-.53.42-1.39.77-1.89 1.41-.33.42-.31.87-.03 1.28.32.48.91.81 1.49.97.28.08.41.22.42.5.04.85.34 1.34 1.05 1.54.49.14.97.02 1.45-.11.23-.06.39-.02.5.19.46.88 1.15 1.48 2.08 1.83.67.25 1.14.85 1.64.85.5 0 .97-.6 1.64-.85.93-.35 1.62-.95 2.08-1.83.11-.21.27-.25.5-.19.48.13.96.25 1.45.11.71-.2 1.01-.69 1.05-1.54.01-.28.14-.42.42-.5.58-.16 1.17-.49 1.49-.97.28-.41.3-.86-.03-1.28-.5-.64-1.36-.99-1.89-1.41-.28-.22-.37-.38-.22-.74.31-.73.51-1.57.48-2.37C18.842 4.68 15.872 2 12.002 2z"/>
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/masewera265",
    color: "#ffffff",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`social-links-grid ${className}`}>
      {socialPlatforms.map((p) => (
        <a
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-btn"
          aria-label={`Follow Masewera265 on ${p.name}`}
          title={p.name}
        >
          {p.icon}
        </a>
      ))}
    </div>
  );
}
