import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Masewera265 | Malawi's Digital Home for Sport", template: "%s | Masewera265" },
  description: "Discover sports, fixtures, results, competitions, teams, athletes and sporting communities across Malawi.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const connectedRequested = process.env.NEXT_PUBLIC_DATA_MODE === "connected";
  const connectedAvailable = Boolean(process.env.MASEWERA265_API_BASE_URL);
  return <html lang="en"><body><SiteHeader/><main id="main">{connectedRequested && !connectedAvailable ? <section className="page-hero"><div className="container"><p className="eyebrow">INTEGRATION UNAVAILABLE</p><h1>Connected data cannot be loaded</h1><p className="lead">Connected mode was requested, but no approved backend endpoint is configured. Demonstration records have not been substituted.</p></div></section> : children}</main><SiteFooter/></body></html>;
}
