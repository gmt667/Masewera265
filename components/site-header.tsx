"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, Smartphone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AppleLogo, AppStoreBadge, GooglePlayBadge, GooglePlayLogo } from "./social-and-app-links";

const primary = [
  ["Home", "/"],
  ["Sports", "/sports"],
  ["Fixtures & Results", "/fixtures"],
  ["Competitions", "/competitions"],
  ["National Teams", "/national-teams"],
  ["News", "/news"],
];

export function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [explore, setExplore] = useState(false);
  const [appOpen, setAppOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const appDropdownRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setExplore(false);
    setAppOpen(false);
  }, [path]);

  // Transparent ONLY at very top (scrollY === 0) — immediately solid the instant any scrolling begins
  useEffect(() => {
    const checkScroll = () => {
      const scrollY =
        (typeof window !== "undefined"
          ? window.scrollY ||
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0
          : 0);
      setScrolled(scrollY > 0);
    };

    checkScroll();

    window.addEventListener("scroll", checkScroll, { passive: true });
    document.addEventListener("scroll", checkScroll, { passive: true, capture: true });
    window.addEventListener("wheel", checkScroll, { passive: true });
    window.addEventListener("touchmove", checkScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkScroll);
      document.removeEventListener("scroll", checkScroll);
      window.removeEventListener("wheel", checkScroll);
      window.removeEventListener("touchmove", checkScroll);
    };
  }, [path]);

  // Close popovers and mobile menu on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (appDropdownRef.current && !appDropdownRef.current.contains(target)) {
        setAppOpen(false);
      }
      if (exploreRef.current && !exploreRef.current.contains(target)) {
        setExplore(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setAppOpen(false);
        setExplore(false);
        setOpen(false);
      }
    }
    if (appOpen || explore || open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [appOpen, explore, open]);

  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  const isSolid = scrolled || open;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* Main Navigation Header: Transparent at top -> Immediately solid on any scroll */}
      <header
        className={`site-header ${isSolid ? "is-scrolled" : "is-transparent"}`}
        data-scrolled={isSolid ? "true" : "false"}
        style={{
          backgroundColor: isSolid ? "#0b111c" : "transparent",
        }}
      >
        <div className="nav-shell">
          <Link href="/" className="brand" aria-label="Masewera265 home">
            <div className="brand-logo-wrap">
              <svg className="brand-crest" width="34" height="28" viewBox="0 0 44 36" fill="none" aria-hidden="true">
                <path d="M 6 22 A 16 16 0 0 1 38 22" stroke="#e11d48" strokeWidth="5" strokeLinecap="round" />
                <circle cx="22" cy="18" r="4" fill="#00d084" />
              </svg>
              <div className="brand-text">
                <span className="brand-title">
                  <b>MASEWERA</b>
                  <strong className="brand-code">265</strong>
                </span>
                <small className="brand-sub">MALAWI&apos;S DIGITAL HOME FOR SPORT</small>
              </div>
            </div>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {primary.map(([label, href]) => (
              <Link key={href} className={active(href) ? "active" : ""} href={href}>
                {label}
              </Link>
            ))}

            <div className="explore-menu" ref={exploreRef}>
              <button
                aria-expanded={explore}
                onClick={() => setExplore(!explore)}
                aria-label="Explore more categories"
              >
                More <ChevronDown size={14} className={explore ? "rotate-180" : ""} />
              </button>
              {explore && (
                <div className="menu-popover" role="menu">
                  <Link href="/teams" role="menuitem" onClick={() => setExplore(false)}>Teams & clubs</Link>
                  <Link href="/athletes" role="menuitem" onClick={() => setExplore(false)}>Athletes</Link>
                  <Link href="/national-teams" role="menuitem" onClick={() => setExplore(false)}>National teams</Link>
                  <Link href="/venues" role="menuitem" onClick={() => setExplore(false)}>Venues</Link>
                  <Link href="/organizations" role="menuitem" onClick={() => setExplore(false)}>Organizations</Link>
                  <Link href="/dashboard" role="menuitem" onClick={() => setExplore(false)}>Dashboard</Link>
                  <Link href="/about" role="menuitem" onClick={() => setExplore(false)}>About & coverage</Link>
                </div>
              )}
            </div>
          </nav>

          <div className="nav-actions">
            {/* Download App Dropdown Trigger (Desktop) */}
            <div className="nav-app-wrap" ref={appDropdownRef}>
              <button
                className={`nav-get-app-btn ${appOpen ? "active" : ""}`}
                onClick={() => setAppOpen(!appOpen)}
                aria-expanded={appOpen}
                aria-label="Download Masewera265 mobile app"
              >
                <Smartphone size={15} />
                <span className="nav-get-app-label">Get App</span>
                <span className="app-store-icons-mini">
                  <AppleLogo size={13} />
                  <GooglePlayLogo size={12} />
                </span>
                <ChevronDown size={12} className={appOpen ? "rotate-180" : ""} />
              </button>

              {appOpen && (
                <div className="nav-app-popover" role="dialog" aria-label="Download apps">
                  <div className="nav-app-popover-header">
                    <strong>Get Masewera265 App</strong>
                    <p>Live scores, fixtures, standings &amp; alerts on your phone</p>
                  </div>
                  <div className="nav-app-popover-badges">
                    <AppStoreBadge compact />
                    <GooglePlayBadge compact />
                  </div>
                  <div className="nav-app-popover-footer">
                    <span>Free on iOS &amp; Android · Low Data</span>
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <Link href="/search" className="icon-button" aria-label="Search Masewera265">
              <Search size={19} />
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              className="menu-button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <>
            <div className="mobile-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
            <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
              <div className="mobile-nav-links">
                {primary.map(([label, href]) => (
                  <Link
                    key={href}
                    className={active(href) ? "active" : ""}
                    href={href}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
                <span className="mobile-label">Directories</span>
                <Link href="/teams" onClick={() => setOpen(false)}>Teams &amp; clubs</Link>
                <Link href="/athletes" onClick={() => setOpen(false)}>Athletes</Link>
                <Link href="/national-teams" onClick={() => setOpen(false)}>National teams</Link>
                <Link href="/venues" onClick={() => setOpen(false)}>Venues</Link>
                <Link href="/organizations" onClick={() => setOpen(false)}>Organizations</Link>
                <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
                <Link href="/about" onClick={() => setOpen(false)}>About &amp; coverage</Link>
              </div>

              <div className="mobile-app-download-box">
                <span className="mobile-download-title">Download Masewera265 App</span>
                <p>Experience Malawi sport on the go with real-time updates</p>
                <div className="mobile-download-badges">
                  <AppStoreBadge compact />
                  <GooglePlayBadge compact />
                </div>
              </div>
            </nav>
          </>
        )}
      </header>
    </>
  );
}
