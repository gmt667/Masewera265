import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { getSitemapPaths } from "./src/route-metadata";

function sitemapPlugin(siteUrl: string): Plugin {
  const baseUrl = siteUrl.replace(/\/$/, "");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${getSitemapPaths().map((route) => `  <url><loc>${baseUrl}${route === "/" ? "/" : route}</loc></url>`).join("\n")}\n</urlset>\n`;
  return {
    name: "masewera-sitemap",
    configureServer(server) {
      server.middlewares.use("/sitemap.xml", (_request, response) => {
        response.setHeader("Content-Type", "application/xml; charset=utf-8");
        response.end(xml);
      });
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: xml });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
  plugins: [react(), sitemapPlugin(env.VITE_SITE_URL || "https://masewera265.com")],
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("react-router")) return "router";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("node_modules/react")) return "react";
        },
      },
    },
  },
  };
});
