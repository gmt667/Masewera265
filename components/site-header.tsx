"use client";

import Link from "@/src/platform/link";
import { usePathname } from "@/src/platform/navigation";
import { ChevronDown, Menu, Search, Smartphone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MaseweraLogo } from "./masewera-logo";
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(false);
    setExplore(false);
    setAppOpen(false);
  }, [path]);

  // Transparent ONLY at very top (scrollY === 0) — immediately solid the instant any scrolling begins
  useEffect(() => {
    let frame = 0;
    const checkScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 0);
        frame = 0;
      });
    };

    checkScroll();

    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkScroll);
      if (frame) window.cancelAnimationFrame(frame);
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
        if (open) window.requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
      if (e.key === "Tab" && open && mobileNavRef.current) {
        const focusable = Array.from(
          mobileNavRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          menuButtonRef.current?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          menuButtonRef.current?.focus();
        }
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

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileNavRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  const isHomepage = path === "/";
  const hasOverlayHero = isHomepage && import.meta.env.VITE_DATA_MODE !== "connected";
  const isSolid = !hasOverlayHero || scrolled || open || explore || appOpen;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* Main Navigation Header: Transparent at top -> Immediately solid on any scroll */}
      <header
        className={`site-header ${isSolid ? "is-scrolled" : "is-transparent"}`}
        data-scrolled={isSolid ? "true" : "false"}
        data-homepage={hasOverlayHero ? "true" : "false"}
      >
        <div className="nav-shell">
          <MaseweraLogo crestSize={38} />

          <nav className="desktop-nav" aria-label="Main navigation">
            {primary.map(([label, href]) => (
              <Link key={href} className={active(href) ? "active" : ""} href={href} aria-current={active(href) ? "page" : undefined}>
                {label}
              </Link>
            ))}

            <div className="explore-menu" ref={exploreRef}>
              <button
                aria-expanded={explore}
                aria-controls="more-navigation-menu"
                aria-haspopup="menu"
                onClick={() => setExplore(!explore)}
                aria-label="Explore more categories"
              >
                More <ChevronDown size={14} className={explore ? "rotate-180" : ""} />
              </button>
              {explore && (
                <div id="more-navigation-menu" className="menu-popover" role="menu">
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
                aria-controls="app-availability-panel"
                aria-haspopup="dialog"
                aria-label="Masewera265 mobile app availability"
              >
                <Smartphone size={15} />
                <span className="nav-get-app-label">Apps</span>
                <span className="app-store-icons-mini">
                  <AppleLogo size={13} />
                  <GooglePlayLogo size={12} />
                </span>
                <ChevronDown size={12} className={appOpen ? "rotate-180" : ""} />
              </button>

              {appOpen && (
                <div id="app-availability-panel" className="nav-app-popover" role="dialog" aria-label="Download apps">
                  <div className="nav-app-popover-header">
                    <strong>Masewera265 Apps</strong>
                    <p>The iOS and Android apps are planned but not available yet.</p>
                  </div>
                  <div className="nav-app-popover-badges">
                    <AppStoreBadge compact />
                    <GooglePlayBadge compact />
                  </div>
                  <div className="nav-app-popover-footer">
                    <span>Coming soon · No store listing yet</span>
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
              ref={menuButtonRef}
              className="menu-button"
              onClick={() => {
                if (open) menuButtonRef.current?.focus();
                setOpen(!open);
              }}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <>
            <div className="mobile-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
            <nav ref={mobileNavRef} id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
              <div className="mobile-nav-links">
                {primary.map(([label, href]) => (
                  <Link
                    key={href}
                    className={active(href) ? "active" : ""}
                    href={href}
                    aria-current={active(href) ? "page" : undefined}
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
                <span className="mobile-download-title">Masewera265 Apps Coming Soon</span>
                <p>No iOS or Android store listing is available yet.</p>
                <div className="mobile-download-badges">
                  <AppStoreBadge compact />
                  <GooglePlayBadge compact />
                </div>
              </div>
            </nav>
          </>
        )}
      </header>
      <div className={`header-offset ${hasOverlayHero ? "header-offset-home" : ""}`} aria-hidden="true" />
    </>
  );
}
