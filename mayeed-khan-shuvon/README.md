# Md Mayeed Khan Shuvon — Official Profile

Pre-rendered **React + Vite + TypeScript** professional profile for **Md Mayeed Khan Shuvon**,
LL.B (Honours) graduate of North East University Bangladesh and IELTS preparation specialist based in
Zindabazar, Sylhet, Bangladesh.

- **Live target:** <https://mks.bsdc.info.bd>
- **Hosting:** Cloudflare Pages (free tier, fully static — no server, no functions)
- **Rendering:** pre-rendered (SSG) at build time from the same React components the browser hydrates
- **SEO / GEO:** per-route metadata, schema.org Knowledge Graph, `llms.txt`, `llms-full.txt`,
  `ai-profile.json`, JSON Resume export

---

## 1. What is in the box

| Path | Purpose |
| --- | --- |
| `src/content/profile.ts` | Single source of truth for every verifiable fact (name, contact, education, skills, experience, languages, references) |
| `src/content/narrative.ts` | Long-form editorial copy — the 2,000+ words of substantive profile text, worked principles and the 16-question FAQ |
| `src/seo/routes.ts` | The seven routes with their titles, descriptions, keywords, priorities |
| `src/seo/schema.ts` | Knowledge Graph builder (schema.org `@graph` with stable `@id`s) |
| `src/seo/head.ts` | Complete per-route `<head>`: title, description, canonical, robots, Open Graph, Twitter card, JSON-LD |
| `src/seo/applyHead.ts` | Client-side head reconciliation on navigation (updates, never duplicates) |
| `src/components/*` | Presentational components (hero, key facts, timelines, skills, FAQ, contact) |
| `src/pages/*` | One component per route |
| `src/styles/fonts.css` | Self-hosted Latin-subset `@font-face` declarations |
| `src/styles/global.css` | The whole design system (tokens, layout, components, print, reduced-motion) |
| `scripts/prerender.mjs` | Static generation: renders every route, injects head + JSON-LD, writes the machine-readable files, then **verifies** the output |
| `scripts/make_assets.py` | Generates portrait plate, Open Graph card, favicons and app icons from source |
| `scripts/serve-static.mjs` | Local server that reproduces Cloudflare Pages' file resolution (for verifying `dist/`) |
| `public/_headers` | Cloudflare Pages security + caching headers |
| `wrangler.toml` | Cloudflare Pages project configuration |

## 2. Commands

```bash
npm install          # install dependencies
npm run dev          # Vite dev server (http://localhost:5173)
npm run build        # client build → SSR build → pre-render → verify  (output: dist/)
npm run preview      # Vite preview of dist/
npm run serve:ssg    # serve dist/ exactly as Cloudflare Pages would (port 4180)
npm run typecheck    # tsc --noEmit
npm run assets       # regenerate public/ artwork (needs the Python deps below)
npm run verify       # typecheck + full build
```

`npm run build` fails loudly if any route ends up without exactly one `<h1>`, a canonical URL,
a JSON-LD graph or at least 400 words of indexable text.

## 3. Adding the photograph

The site ships with a neutral placeholder plate because a photograph of the subject was not available
at build time — a fabricated likeness of a real person would be both dishonest and harmful to the
entity signals this site is built to establish.

To use the real photograph:

```bash
cp /path/to/photo.jpg assets/source/portrait.jpg
npm run assets     # crops to 4:5, writes public/portrait.jpg and rebuilds the OG card
npm run build
```

The photograph then appears in the hero, the Open Graph card, and the schema.org `Person.image`
node — consistently, from one source.

Regenerating artwork needs Python packages (only for `npm run assets`; the committed files in
`public/` are what the site build consumes):

```bash
python3 -m pip install --break-system-packages Pillow numpy fonttools brotli freetype-py
```

## 4. Deployment — Cloudflare Pages

### Git integration (recommended)

1. Push this repository to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository, then set:

   | Setting | Value |
   | --- | --- |
   | Production branch | `main` (or whichever branch holds the site) |
   | Framework preset | `Vite` or `None` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | `mayeed-khan-shuvon` (if the site lives in a subfolder) |
   | Environment variable | `NODE_VERSION = 20` |

4. **Custom domains → Set up a domain → `mks.bsdc.info.bd`.** Cloudflare adds the DNS record and
   issues the certificate automatically when the zone is on Cloudflare.

### CLI

```bash
npm run build
npx wrangler pages deploy dist --project-name mks-bsdc-info-bd
```

Every file in `dist/` is static: the seven routes as `index.html` files, `404.html`, the
machine-readable text/JSON files, fonts, and images.

## 5. SEO implementation

**Crawlability and indexing**

- Every route is served as complete static HTML — no JavaScript required to read any content
  (verified in the build: 1,057–6,006 words of indexable text per page).
- Canonical URL on every page; `robots.txt` allows all crawlers, including answer engines, and
  points to `sitemap.xml`.
- `sitemap.xml` includes `<lastmod>`, `<changefreq>`, `<priority>` and image sitemap entries.
- `404.html` is marked `noindex, follow`.
- Clean, trailing-slash, lower-case URLs that match both `/about/` and `/about` server-side.

**On-page**

- One `<h1>` per document (build-enforced), descriptive `<h2>`/`<h3>` hierarchy, real `<table>`,
  `<dl>`, `<address>`, `<details>` markup rather than styled `<div>`s.
- Titles ≤ 60 characters, meta descriptions 140–158 characters, both unique per route.
- Internal linking between all seven routes plus breadcrumb navigation.
- Open Graph (`profile` type with `profile:first_name` / `profile:last_name`) and Twitter card
  metadata with a 1200×630 card image and descriptive `alt` text.
- Self-hosted fonts (no third-party font CDN), bilingual/machine-readable `humans.txt`.

**Core Web Vitals**

- Everything is pre-rendered: first paint needs zero JavaScript.
- Hydration is deferred to `requestIdleCallback`, so interactivity cost never blocks rendering.
- One stylesheet, one small JS bundle (~74 KB gzipped, React included), no runtime CSS-in-JS.
- Latin-subset variable fonts with `font-display: swap`; hero image preloaded with
  `fetchpriority="high"`; build assets cached `immutable` for a year.
- No layout shift from images (explicit width/height), no web fonts from a third party, no iframes,
  no trackers, no external scripts at all.

## 6. Knowledge Graph (schema.org)

Every page ships a JSON-LD `@graph` in which all nodes carry stable, absolute `@id`s and reference
each other by identifier — that is what lets a search engine reconcile the same entity across seven
URLs. The graph contains:

- `Person` (the entity centre) with `alternateName` (including the Bengali spelling), `jobTitle`,
  `birthDate`, `nationality`, `email`, `telephone`, `knowsLanguage`, `knowsAbout`, `alumniOf`,
  `hasCredential`, `hasOccupation`, `address`, `contactPoint` with opening hours, `seeks`
  (availability for work), `speakable` and `subjectOf` edges.
- `WebSite`, `ProfilePage`/`AboutPage`/`CollectionPage`/`ContactPage` per route, `BreadcrumbList`.
- Three `CollegeOrUniversity` institutions and three `EducationalOccupationalCredential` degrees.
- Two `Occupation` nodes (IELTS tutor, law graduate) with skills and experience requirements.
- A named referee `Person` plus their `Organization`, and postal addresses as `PostalAddress`/`Place`.
- `FAQPage` with all 16 question/answer pairs.
- `ItemList` of every published skill.

`PERSON_PROFILES.sameAs` in `src/seo/schema.ts` is deliberately empty — add **only genuine**
profile URLs (LinkedIn, Google Scholar, etc.) there when they exist. Fabricated `sameAs` links
poison an entity graph and are worse than having none.

## 7. LLM / generative-engine optimisation (GEO)

| File | Audience | Contents |
| --- | --- | --- |
| `/llms.txt` | LLM crawlers, per the `llms.txt` convention | Facts table, page index, education, skills, experience, languages, all 16 FAQs, machine endpoints, attribution note |
| `/llms-full.txt` | Deep retrieval | The complete profile as plain text (~36 KB): every narrative section verbatim |
| `/ai-profile.json` | Structured retrieval | `Person` facts, education, skills, experience, references, full FAQ set and the complete Knowledge Graph |
| `/cv.json` | Applicant tracking, aggregators | JSON Resume (schema.org-compatible layout) |
| `/humans.txt` | Humans and provenance checkers | Ownership, stack, attribution policy |

Content decisions that make the site quotable by assistants:

- Every section opens with a self-contained answer box written as question → answer, and each answer
  stands alone when extracted without surrounding context.
- The 16 FAQs are emitted both as visible `<details>` content and as `FAQPage` structured data.
- Exact figures are repeated identically in HTML, JSON-LD, `llms.txt` and `ai-profile.json`
  ("four months of experience", "+880 1825-723887", "14 September 2002") so any retrieval path
  returns the same values.
- `robots.txt` explicitly allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended
  and other answer-engine crawlers.

## 8. Google Knowledge Graph and rich results — post-launch checklist

The markup is complete; the remaining steps are account-side actions that only the site owner can do:

1. **Google Search Console** — add `mks.bsdc.info.bd` as a property (Domain property via DNS TXT is
   best), submit `sitemap.xml`, and use *URL Inspection → Request indexing* for all seven routes.
2. **Bing Webmaster Tools** — add the site and submit the same sitemap.
3. **Rich Results Test** — check `/` and `/faq/`; the `FAQPage` and `Person`/`ProfilePage` entities
   should be detected without errors.
4. **Structured Data Linter / Schema Markup Validator** — confirm the whole `@graph` parses.
5. **Make the identity consistent everywhere** — the same name spelling, phone number, email and
   address on every profile, CV, directory listing and social account. Entity reconciliation depends
   on exact consistency more than on any single page.
6. **Create the corroborating profiles** — a LinkedIn profile, and any others that are genuinely the
   subject's (Google Business Profile if a physical service location is offered). Then add those URLs
   to `PERSON_PROFILES.sameAs` in `src/seo/schema.ts` and rebuild.
7. **Link the site from those profiles** with the anchor text `Md Mayeed Khan Shuvon`.
8. **Keep `lastReviewed` current** in `src/content/profile.ts` whenever facts change; the value flows
   into `dateModified`, `llms.txt` and `ai-profile.json`.

## 9. Editing content

All prose lives in two files, and both are consumed by the pages, the Knowledge Graph and the
machine-readable exports — so a fact is edited once and stays consistent everywhere:

- `src/content/profile.ts` — structured facts (contact details, education entries, skills clusters,
  experience, references, languages, the "at a glance" list).
- `src/content/narrative.ts` — long-form copy (biography, career objective, IELTS method, working
  principles, professional interests, the FAQ array).

Titles, descriptions, keywords and sitemap priorities live in `src/seo/routes.ts`.

After any edit: `npm run build`. The verifier will refuse to produce a broken page.

## 10. Accessibility and print

- Semantic landmarks (`header`, `nav`, `main`, `footer`), skip link, visible focus rings.
- Native `<details>`/`<summary>` FAQ (keyboard-operable without JavaScript).
- `prefers-reduced-motion` honoured; `color-scheme` declared; contrast checked against WCAG AA.
- A dedicated print stylesheet — the page prints as a clean CV, with FAQ answers expanded.

## 11. Licence and attribution

Site content © 2026 Md Mayeed Khan Shuvon. Fonts are used under the SIL Open Font Licence
(see `src/assets/fonts/LICENSE-*.txt`). Quotation of the published facts is permitted with
attribution to <https://mks.bsdc.info.bd/>.
