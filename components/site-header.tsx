"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

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
  useEffect(() => { setOpen(false); setExplore(false); }, [path]);
  const active = (href: string) => href === "/" ? path === "/" : path.startsWith(href);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="demo-bar"><span>DEMONSTRATION MODE</span><p>Representative records only · No live provider connected</p></div>
    <header className="site-header">
      <div className="nav-shell">
        <Link href="/" className="brand" aria-label="Masewera265 home">
          <div className="brand-logo-wrap">
            <svg className="brand-crest" width="34" height="28" viewBox="0 0 44 36" fill="none" aria-hidden="true">
              <path d="M 6 22 A 16 16 0 0 1 38 22" stroke="#e11d48" strokeWidth="5" strokeLinecap="round"/>
              <circle cx="22" cy="18" r="4" fill="#00d084"/>
            </svg>
            <div className="brand-text">
              <span className="brand-title"><b>MASEWERA</b><strong className="brand-code">265</strong></span>
              <small className="brand-sub">MALAWI&apos;S DIGITAL HOME FOR SPORT</small>
            </div>
          </div>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {primary.map(([label, href]) => <Link key={href} className={active(href) ? "active" : ""} href={href}>{label}</Link>)}
          <div className="explore-menu">
            <button aria-expanded={explore} onClick={() => setExplore(!explore)}>More <ChevronDown size={14}/></button>
            {explore && <div className="menu-popover">
              <Link href="/teams">Teams & clubs</Link><Link href="/athletes">Athletes</Link>
              <Link href="/national-teams">National teams</Link><Link href="/venues">Venues</Link><Link href="/organizations">Organizations</Link><Link href="/dashboard">Dashboard demo</Link><Link href="/about">About & coverage</Link>
            </div>}
          </div>
        </nav>
        <div className="nav-actions">
          <Link href="/search" className="icon-button" aria-label="Search"><Search size={20}/></Link>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
        </div>
      </div>
      {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
        {primary.map(([label, href]) => <Link key={href} className={active(href) ? "active" : ""} href={href}>{label}</Link>)}
        <span className="mobile-label">Directories</span>
        <Link href="/teams">Teams & clubs</Link><Link href="/athletes">Athletes</Link><Link href="/national-teams">National teams</Link><Link href="/venues">Venues</Link><Link href="/organizations">Organizations</Link><Link href="/dashboard">Dashboard demo</Link><Link href="/about">About & coverage</Link>
      </nav>}
    </header>
  </>;
}
