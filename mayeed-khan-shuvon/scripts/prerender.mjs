#!/usr/bin/env node
/**
 * Static site generation (pre-rendering) step.
 *
 *  1. renders every route to HTML with the SSR bundle built from the same
 *     React components the browser hydrates,
 *  2. writes the per-route <head> (title, description, canonical, robots,
 *     Open Graph, Twitter card, JSON-LD Knowledge Graph) into the static file,
 *  3. generates sitemap.xml, robots.txt, llms.txt, llms-full.txt,
 *     ai-profile.json, cv.json and humans.txt from the same content modules,
 *  4. writes 404.html,
 *  5. verifies the output (word count, one <h1>, canonical present) and fails
 *     the build if anything is wrong.
 */

import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-server");

const load = async (file) => import(pathToFileURL(join(ssrDir, file)).href);

const { render } = await load("entry-server.js");
const { getGeneratedFiles, buildHead, ROUTES } = await load("entry-data.js");

/* ------------------------------------------------------------------ head */
function headMarkup(head) {
  const meta = head.meta
    .map((item) =>
      item.name
        ? `    <meta name="${item.name}" content="${escapeAttr(item.content)}" />`
        : `    <meta property="${item.property}" content="${escapeAttr(item.content)}" />`,
    )
    .join("\n");

  const links = head.links
    .map((link) => {
      const attrs = [
        `rel="${link.rel}"`,
        `href="${escapeAttr(link.href)}"`,
        link.type ? `type="${link.type}"` : "",
        link.sizes ? `sizes="${link.sizes}"` : "",
        link.title ? `title="${escapeAttr(link.title)}"` : "",
      ].filter(Boolean);
      return `    <link ${attrs.join(" ")} />`;
    })
    .join("\n");

  return [
    `    <title>${escapeText(head.title)}</title>`,
    meta,
    links,
    `    <script type="application/ld+json" id="kg-jsonld">${head.jsonLd}</script>`,
  ].join("\n");
}

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const escapeText = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ---------------------------------------------------------------- render */
const template = await readFile(join(dist, "index.html"), "utf8");

function buildPage(path, head) {
  let html = template;
  // Drop the generic defaults: the real per-route head is injected below.
  html = html.replace(/<!--app-head-defaults-->[\s\S]*?<!--\/app-head-defaults-->\s*/, "");
  html = html.replace("<!--app-head-->", headMarkup(head));
  const appHtml = render(path);
  html = html.replace("<!--app-html-->", appHtml);
  return html;
}

const written = [];

for (const route of ROUTES) {
  const head = buildHead(route);
  const html = buildPage(route.path, head);
  const outFile =
    route.path === "/" ? join(dist, "index.html") : join(dist, route.path, "index.html");
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, html, "utf8");
  written.push({ file: outFile, html, route });
}

/* ------------------------------------------------------------- 404 page */
{
  const notFound = ROUTES.find((r) => r.key === "home");
  const head = buildHead(notFound);
  let html = template;
  html = html.replace(/<!--app-head-defaults-->[\s\S]*?<!--\/app-head-defaults-->\s*/, "");
  html = html.replace(
    "<!--app-head-->",
    headMarkup({
      ...head,
      title: "Page not found — Md Mayeed Khan Shuvon",
      meta: [
        { name: "robots", content: "noindex, follow" },
        { name: "description", content: "The requested page is not part of the Md Mayeed Khan Shuvon profile." },
      ],
      links: head.links.filter((l) => l.rel === "canonical" || l.rel === "manifest"),
    }),
  );
  html = html.replace("<!--app-html-->", render("/404/"));
  await writeFile(join(dist, "404.html"), html, "utf8");
  written.push({ file: join(dist, "404.html"), html, route: null });
}

/* --------------------------------------------- generated machine files */
for (const file of getGeneratedFiles()) {
  const outFile = join(dist, file.path);
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, file.content, "utf8");
}

/* ------------------------------------------------------------ verification */
const problems = [];

function textOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const report = [];
for (const entry of written) {
  const words = textOf(entry.html).split(" ").filter(Boolean).length;
  const h1s = (entry.html.match(/<h1[\s>]/g) || []).length;
  const canonical = entry.html.includes('rel="canonical"');
  const jsonld = entry.html.includes('id="kg-jsonld"');
  const label = entry.route ? entry.route.path : "/404.html";
  report.push(
    `  ${label.padEnd(14)} ${String(words).padStart(5)} words · h1:${h1s} · canonical:${canonical ? "yes" : "NO"} · jsonld:${jsonld ? "yes" : "NO"}`,
  );
  if (!entry.route) continue;
  if (h1s !== 1) problems.push(`${label}: expected exactly one <h1>, found ${h1s}`);
  if (!canonical) problems.push(`${label}: missing canonical link`);
  if (!jsonld) problems.push(`${label}: missing JSON-LD Knowledge Graph`);
  if (words < 400) problems.push(`${label}: only ${words} words of indexable text`);
}

const homeWords = report[0];
const homeHtml = written[0].html;
if (!homeHtml.includes('"@type":"Person"')) problems.push("home: Person node missing from the graph");
if (!homeHtml.includes("FAQPage")) problems.push("home: FAQPage node missing from the graph");

/* ---------------------------------------------------- asset sanity check */
const assetWarnings = [];
for (const asset of ["portrait.jpg", "og-image.jpg", "favicon.ico", "apple-touch-icon.png"]) {
  if (!existsSync(join(dist, asset))) assetWarnings.push(asset);
}

const sizeOf = async (file) => {
  try {
    const s = await stat(file);
    return `${(s.size / 1024).toFixed(1)} KB`;
  } catch {
    return "n/a";
  }
};

console.log("\nPre-render complete\n");
console.log(report.join("\n"));
console.log(`\n  Generated: ${getGeneratedFiles().map((f) => f.path).join(", ")}`);
console.log(`  dist/index.html: ${await sizeOf(join(dist, "index.html"))}`);
console.log(`  dist/llms-full.txt: ${await sizeOf(join(dist, "llms-full.txt"))}`);
console.log(`  First route (home) indexable text: ${homeWords}`);

if (assetWarnings.length) {
  console.log(
    `\n  NOTE: run "npm run assets" to (re)generate: ${assetWarnings.join(", ")}`,
  );
}

if (problems.length) {
  console.error("\nPre-render verification FAILED:");
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log("\n  Verification passed: every route has one H1, a canonical URL, a JSON-LD graph and 400+ words.\n");
