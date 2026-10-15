import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-col-brand">
          <div className="footer-brand-logo">
            <svg className="brand-crest" width="36" height="30" viewBox="0 0 44 36" fill="none" aria-hidden="true">
              <path d="M 6 22 A 16 16 0 0 1 38 22" stroke="#e11d48" strokeWidth="5" strokeLinecap="round"/>
              <circle cx="22" cy="18" r="4" fill="#00d084"/>
            </svg>
            <div className="brand-text">
              <span className="brand-title"><b>MASEWERA</b><strong className="brand-code">265</strong></span>
              <small className="brand-sub">MALAWI&apos;S DIGITAL HOME FOR SPORT</small>
            </div>
          </div>
        </div>

        <div>
          <h2>Quick Links</h2>
          <Link href="/">Home</Link>
          <Link href="/sports">Sports</Link>
          <Link href="/fixtures">Fixtures &amp; Results</Link>
          <Link href="/competitions">Competitions</Link>
          <Link href="/national-teams">National Teams</Link>
          <Link href="/news">News</Link>
        </div>

        <div>
          <h2>Explore</h2>
          <Link href="/explore-malawi?region=Northern">Northern Region</Link>
          <Link href="/explore-malawi?region=Central">Central Region</Link>
          <Link href="/explore-malawi?region=Southern">Southern Region</Link>
          <Link href="/sports">All Sports</Link>
        </div>

        <div>
          <h2>About</h2>
          <Link href="/about">Our Mission</Link>
          <Link href="/about#contact">Contact Us</Link>
          <Link href="/about#privacy">Privacy Policy</Link>
        </div>

        <div className="footer-col-dev">
          <span className="dev-label">Developed by</span>
          <div className="astramind-brand">
            <Image
              src="/astramind_logo.png"
              alt="AstraMind Labs logo"
              width={140}
              height={36}
              style={{ objectFit: "contain", height: "auto" }}
            />
          </div>
          <p className="dev-motto">Ideas for a brighter Malawi</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2024 MASEWERA265. All rights reserved.</span>
        <span>Malawi&apos;s Digital Home for Sport | Developed by AstraMind Labs</span>
      </div>
    </footer>
  );
}
