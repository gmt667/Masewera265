import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const viewport = {
  themeColor: "#0b111c",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://masewera265.com"),
  title: { default: "Masewera265 | Malawi's Digital Home for Sport", template: "%s | Masewera265" },
  description: "Discover sports, fixtures, results, competitions, teams, athletes and sporting communities across Malawi.",
  applicationName: "Masewera265",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_MW",
    siteName: "Masewera265",
    title: "Masewera265 | Malawi's Digital Home for Sport",
    description: "Discover sports, fixtures, results, competitions, teams, athletes and sporting communities across Malawi.",
    images: [{ url: "/images/hero-banner.jpg", width: 1200, height: 630, alt: "Malawian sport on Masewera265" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Masewera265 | Malawi's Digital Home for Sport",
    description: "Discover sports, fixtures, results, competitions, teams, athletes and sporting communities across Malawi.",
    images: ["/images/hero-banner.jpg"],
  },
  icons: { icon: "/brand-icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-MW">
      <body>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
