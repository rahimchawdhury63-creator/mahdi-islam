#!/usr/bin/env node
/**
 * Minimal static file server used to verify the pre-rendered output exactly as
 * Cloudflare Pages would serve it (directory index resolution, 404.html).
 *
 *   node scripts/serve-static.mjs [port]
 */
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.argv[2] || process.env.PORT || 4180);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
};

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  const safe = normalize(clean).replace(/^(\.\.[/\\])+/, "");
  const candidates = [];
  candidates.push(join(root, safe));
  if (safe.endsWith("/")) candidates.push(join(root, safe, "index.html"));
  else candidates.push(join(root, `${safe}.html`), join(root, safe, "index.html"));

  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return candidate;
    } catch {
      /* keep looking */
    }
  }
  return null;
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(req.url || "/");
  if (!file) {
    try {
      const body = await (await import("node:fs/promises")).readFile(join(root, "404.html"));
      res.writeHead(404, { "content-type": TYPES[".html"] });
      res.end(body);
    } catch {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("404");
    }
    return;
  }
  res.writeHead(200, {
    "content-type": TYPES[extname(file)] || "application/octet-stream",
    "cache-control": "public, max-age=0, must-revalidate",
  });
  createReadStream(file).pipe(res);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Serving pre-rendered dist/ on http://0.0.0.0:${port}`);
});
