import Image from "@/src/platform/image";
import Link from "@/src/platform/link";
import { AppStoreBadge, GooglePlayBadge, SocialLinks } from "./social-and-app-links";
import { ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { MaseweraLogo } from "./masewera-logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top-strip">
        <div className="container footer-top-inner">
          <div className="footer-top-brand">
            <span className="footer-kicker">MALAWI&apos;S DIGITAL HOME FOR SPORT</span>
            <h3>Official Social Channels Coming Soon</h3>
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
          <MaseweraLogo className="footer-brand-logo" crestSize={42} linkToHome={false} />
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
                  sizes="140px"
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
          <Link href="/live">Demo Match Centre</Link>
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
          <h2>Mobile Apps Coming Soon</h2>
          <p className="footer-app-intro">
            iOS and Android apps are planned. No download or store listing is currently available.
          </p>
          <div className="footer-store-badges">
            <AppStoreBadge />
            <GooglePlayBadge />
          </div>
          <div className="footer-app-perks">
            <span><ShieldCheck size={14} /> Public website available now</span>
            <span><Sparkles size={14} /> Mobile experience in planning</span>
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
