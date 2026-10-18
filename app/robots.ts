import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://masewera265.com";
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/dashboard", "/dashboard/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
