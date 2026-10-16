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

  useEffect(() => {
    setOpen(false);
    setExplore(false);
    setAppOpen(false);
  }, [path]);

  // Handle immediate transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close app dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (appDropdownRef.current && !appDropdownRef.current.contains(e.target as Node)) {
        setAppOpen(false);
      }
    }
    if (appOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [appOpen]);

  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* Top Demonstration Mode Notice Bar */}
      <div className={`demo-bar ${scrolled ? "demo-bar-scrolled" : ""}`}>
        <span>DEMONSTRATION MODE</span>
        <p>Representative records only · No live provider connected</p>
      </div>

      {/* Main Navigation Header with Transparent -> Scrolled Glassmorphism Transition */}
      <header className={`site-header ${scrolled ? "is-scrolled" : "is-transparent"}`}>
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

            <div className="explore-menu">
              <button aria-expanded={explore} onClick={() => setExplore(!explore)}>
                More <ChevronDown size={14} className={explore ? "rotate-180" : ""} />
              </button>
              {explore && (
                <div className="menu-popover">
                  <Link href="/teams">Teams & clubs</Link>
                  <Link href="/athletes">Athletes</Link>
                  <Link href="/national-teams">National teams</Link>
                  <Link href="/venues">Venues</Link>
                  <Link href="/organizations">Organizations</Link>
                  <Link href="/dashboard">Dashboard demo</Link>
                  <Link href="/about">About & coverage</Link>
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
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
            <div className="mobile-nav-links">
              {primary.map(([label, href]) => (
                <Link key={href} className={active(href) ? "active" : ""} href={href}>
                  {label}
                </Link>
              ))}
              <span className="mobile-label">Directories</span>
              <Link href="/teams">Teams &amp; clubs</Link>
              <Link href="/athletes">Athletes</Link>
              <Link href="/national-teams">National teams</Link>
              <Link href="/venues">Venues</Link>
              <Link href="/organizations">Organizations</Link>
              <Link href="/dashboard">Dashboard demo</Link>
              <Link href="/about">About &amp; coverage</Link>
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
        )}
      </header>
    </>
  );
}
