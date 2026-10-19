const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const dist = path.resolve("dist");
const indexPath = path.join(dist, "index.html");
assert.ok(fs.existsSync(indexPath), "dist/index.html is missing; run npm run build first");

const index = fs.readFileSync(indexPath, "utf8");
const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
const redirects = fs.readFileSync(path.join(dist, "_redirects"), "utf8");
const headers = fs.readFileSync(path.join(dist, "_headers"), "utf8");
const assetPaths = [...index.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((match) => match[1]);

assert.ok(assetPaths.length >= 2, "Built HTML must reference versioned assets");
for (const asset of assetPaths) assert.ok(fs.existsSync(path.join(dist, asset)), `Missing built asset ${asset}`);
assert.match(redirects, /\/\* \/index\.html 200/, "SPA fallback rule is missing");
assert.match(headers, /X-Content-Type-Options: nosniff/, "Content sniffing protection is missing");
assert.match(headers, /X-Frame-Options: DENY/, "Frame embedding protection is missing");
assert.match(headers, /\/assets\/\*/, "Immutable asset caching rule is missing");
assert.ok((sitemap.match(/<url>/g) || []).length >= 100, "Generated sitemap is unexpectedly small");
assert.doesNotMatch(sitemap, /\/dashboard/, "Private dashboard route leaked into sitemap");

const contentTypes = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".xml": "application/xml" };
const server = http.createServer((request, response) => {
  const requestPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const candidate = path.resolve(dist, `.${requestPath}`);
  const safeFile = candidate.startsWith(`${dist}${path.sep}`) && fs.existsSync(candidate) && fs.statSync(candidate).isFile()
    ? candidate
    : indexPath;
  response.writeHead(200, { "Content-Type": contentTypes[path.extname(safeFile)] || "application/octet-stream" });
  fs.createReadStream(safeFile).pipe(response);
});

const routes = [
  "/", "/sports/football", "/teams/mighty-wanderers", "/competitions/super-league",
  "/news/example", "/events/example", "/dashboard", "/dashboard/platform", "/missing-route",
];

server.listen(0, "127.0.0.1", async () => {
  try {
    const address = server.address();
    assert.ok(address && typeof address === "object");
    for (const route of routes) {
      const response = await fetch(`http://127.0.0.1:${address.port}${route}`);
      assert.equal(response.status, 200, `${route} did not receive the SPA shell`);
      assert.match(await response.text(), /id="root"/, `${route} did not receive the React root`);
    }
    console.log(`${routes.length} production route refreshes passed; ${assetPaths.length} entry assets, hosting headers and sitemap safety verified.`);
  } finally {
    server.close();
  }
});
