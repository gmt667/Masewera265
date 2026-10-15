import Image from "next/image";
import Link from "next/link";
import { AppStoreBadge, GooglePlayBadge, SocialLinks } from "./social-and-app-links";
import { ExternalLink, ShieldCheck, Sparkles } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top-strip">
        <div className="container footer-top-inner">
          <div className="footer-top-brand">
            <span className="footer-kicker">MALAWI&apos;S DIGITAL HOME FOR SPORT</span>
            <h3>Follow Masewera265 Across All Platforms</h3>
          </div>
          {/* Social Icons for TikTok, YouTube, LinkedIn, Instagram, WhatsApp, Facebook, Snapchat, X */}
          <div className="footer-top-socials">
            <SocialLinks />
          </div>
        </div>
      </div>

      <div className="container footer-grid">
        {/* Brand Column */}
        <div className="footer-col-brand">
          <div className="footer-brand-logo">
            <svg className="brand-crest" width="38" height="32" viewBox="0 0 44 36" fill="none" aria-hidden="true">
              <path d="M 6 22 A 16 16 0 0 1 38 22" stroke="#e11d48" strokeWidth="5" strokeLinecap="round"/>
              <circle cx="22" cy="18" r="4" fill="#00d084"/>
            </svg>
            <div className="brand-text">
              <span className="brand-title"><b>MASEWERA</b><strong className="brand-code">265</strong></span>
              <small className="brand-sub">MALAWI&apos;S DIGITAL HOME FOR SPORT</small>
            </div>
          </div>
          <p className="footer-brand-desc">
            The national multi-sport platform connecting all 14 Malawian sporting disciplines, 28 districts, national teams, leagues, and athletes under one digital roof.
          </p>
          <div className="malawi-stripe" />

          {/* Developer Showcase: AstraMind Labs */}
          <div className="footer-developer-card">
            <span className="dev-tag">ENGINEERED BY</span>
            <a
              href="https://astramindlabs.page.gd/?i=1"
              target="_blank"
              rel="noopener noreferrer"
              className="astramind-external-card"
              title="Visit AstraMind Labs (opens in new tab)"
            >
              <div className="astramind-brand-row">
                <Image
                  src="/astramind_logo.png"
                  alt="AstraMind Labs logo"
                  width={140}
                  height={36}
                  style={{ objectFit: "contain", height: "auto" }}
                />
                <ExternalLink size={14} className="astramind-external-icon" />
              </div>
              <p className="dev-motto">Ideas for a brighter Malawi</p>
              <span className="astramind-visit-btn">Visit astramindlabs.page.gd &rarr;</span>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h2>Platform</h2>
          <Link href="/">Home</Link>
          <Link href="/sports">Sports Hub</Link>
          <Link href="/fixtures">Fixtures &amp; Schedules</Link>
          <Link href="/results">Match Results</Link>
          <Link href="/live">Live Centre</Link>
          <Link href="/competitions">Competitions &amp; Cups</Link>
          <Link href="/national-teams">National Teams Hub</Link>
          <Link href="/news">News &amp; Features</Link>
        </div>

        {/* Explore Malawi Column */}
        <div>
          <h2>Explore Malawi</h2>
          <Link href="/explore-malawi?region=Northern">Northern Region</Link>
          <Link href="/explore-malawi?region=Central">Central Region</Link>
          <Link href="/explore-malawi?region=Southern">Southern Region</Link>
          <Link href="/teams">Teams &amp; Clubs Directory</Link>
          <Link href="/athletes">Athletes Directory</Link>
          <Link href="/venues">Venues &amp; Stadiums</Link>
          <Link href="/organizations">Associations &amp; Federations</Link>
          <Link href="/dashboard">Role-based Dashboard</Link>
        </div>

        {/* App Download Column */}
        <div className="footer-col-app">
          <h2>Get The Mobile App</h2>
          <p className="footer-app-intro">
            Fast scores, instant lineups, live alerts and low-data match updates directly on your smartphone.
          </p>
          <div className="footer-store-badges">
            <AppStoreBadge />
            <GooglePlayBadge />
          </div>
          <div className="footer-app-perks">
            <span><ShieldCheck size={14} /> Optimized for Malawi networks</span>
            <span><Sparkles size={14} /> Free on iOS &amp; Android</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom Legal Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner container">
          <span>&copy; {new Date().getFullYear()} MASEWERA265. All rights reserved.</span>
          <span className="footer-dev-credit">
            Developed with pride by{" "}
            <a
              href="https://astramindlabs.page.gd/?i=1"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-astramind-anchor"
            >
              AstraMind Labs
            </a>
          </span>
          <div className="footer-legal-links">
            <Link href="/about">About</Link>
            <Link href="/about#trust">Trust &amp; Verification</Link>
            <Link href="/about#privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
