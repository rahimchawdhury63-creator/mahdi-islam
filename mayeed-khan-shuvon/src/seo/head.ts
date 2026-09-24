/**
 * Complete, per-route <head> payload.
 *
 * Every tag is emitted twice in the build: once into the static HTML by the
 * pre-render step (so crawlers that do not run JavaScript see everything) and
 * once by React on the client, with the client reconciling the exact same
 * values so no duplicate or conflicting tags ever appear.
 */

import { PRIMARY_PHOTO } from "../content/gallery";
import { PERSON, SITE } from "../content/profile";
import { absoluteUrl, ROUTES, type RouteMeta } from "./routes";
import { jsonLd } from "./schema";

/** Social/OG image dimensions — keep in sync with the generated artwork. */
export const OG_IMAGE = {
  url: `${SITE.origin}/og-image.jpg`,
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Md Mayeed Khan Shuvon — LL.B (Honours) graduate and IELTS preparation specialist, Sylhet, Bangladesh",
} as const;

export const TILE = `${SITE.origin}/og-image.jpg`;

export type HeadMetaItem = { name?: string; property?: string; content: string };

export type HeadLink = {
  rel: string;
  href: string;
  type?: string;
  sizes?: string;
  title?: string;
  /** Responsive preload hints — must mirror the hero's <picture> exactly. */
  imagesrcset?: string;
  imagesizes?: string;
  fetchpriority?: "high" | "low" | "auto";
};

export type HeadPayload = {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  keywords: string;
  meta: HeadMetaItem[];
  links: HeadLink[];
  jsonLd: string;
};

/** Must match the `sizes` attribute on the hero <picture> in Hero.tsx. */
const HERO_SIZES = "(max-width: 980px) 92vw, 420px";

/**
 * LCP preloads for the hero photograph.
 *
 * The hero is a <picture> with a WebP source and a JPEG fallback, so both are
 * advertised and the browser fetches exactly one: the `type` attribute makes it
 * skip the format it cannot decode. Preloading only the fallback (as an earlier
 * revision did) cost 350 KB of critical bandwidth for an image that was never
 * displayed.
 */
function heroPreloads(route: RouteMeta): HeadLink[] {
  if (route.key !== "home") return [];
  const photo = PRIMARY_PHOTO;
  if (!photo) {
    return [{ rel: "preload", href: PERSON.photo, type: "image/jpeg", fetchpriority: "high" }];
  }
  return [
    {
      rel: "preload",
      href: photo.webp,
      type: "image/webp",
      imagesrcset: photo.webpSrcset,
      imagesizes: HERO_SIZES,
      fetchpriority: "high",
    },
    {
      rel: "preload",
      href: photo.src,
      type: "image/jpeg",
      imagesrcset: photo.srcset,
      imagesizes: HERO_SIZES,
      fetchpriority: "high",
    },
  ];
}

export function buildHead(route: RouteMeta): HeadPayload {
  const canonical = absoluteUrl(route.path);
  const isHome = route.key === "home";

  const meta: HeadMetaItem[] = [
    { name: "description", content: route.description },
    { name: "keywords", content: route.keywords.join(", ") },
    { name: "author", content: PERSON.fullName },
    { name: "creator", content: PERSON.fullName },
    { name: "publisher", content: PERSON.fullName },
    { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
    { name: "googlebot", content: "index, follow, max-snippet:-1, max-image-preview:large" },
    { name: "bingbot", content: "index, follow, max-snippet:-1, max-image-preview:large" },
    { name: "google", content: "notranslate" },
    { name: "rating", content: "general" },
    { name: "distribution", content: "global" },
    { name: "revisit-after", content: "7 days" },
    { name: "referrer", content: "strict-origin-when-cross-origin" },
    { name: "format-detection", content: "telephone=yes" },
    { name: "geo.region", content: "BD-60" },
    { name: "geo.placename", content: "Sylhet, Bangladesh" },
    { name: "geo.position", content: "24.8949;91.8687" },
    { name: "ICBM", content: "24.8949, 91.8687" },
    { name: "language", content: "English" },
    { name: "theme-color", content: "#fbfaf7" },
    { name: "color-scheme", content: "light dark" },
    // Open Graph
    { property: "og:type", content: isHome ? "profile" : "website" },
    { property: "og:site_name", content: SITE.siteName },
    { property: "og:title", content: route.title },
    { property: "og:description", content: route.description },
    { property: "og:url", content: canonical },
    { property: "og:locale", content: SITE.locale },
    { property: "og:image", content: OG_IMAGE.url },
    { property: "og:image:secure_url", content: OG_IMAGE.url },
    { property: "og:image:type", content: OG_IMAGE.type },
    { property: "og:image:width", content: String(OG_IMAGE.width) },
    { property: "og:image:height", content: String(OG_IMAGE.height) },
    { property: "og:image:alt", content: OG_IMAGE.alt },
    // Open Graph — profile namespace (person entity signals)
    { property: "profile:first_name", content: PERSON.givenName },
    { property: "profile:last_name", content: `${PERSON.additionalName} ${PERSON.familyName}` },
    { property: "profile:username", content: "mayeedkhan" },
    { property: "article:author", content: PERSON.fullName },
    { property: "article:published_time", content: SITE.publishedDate },
    { property: "article:modified_time", content: SITE.lastReviewed },
    // Twitter / X
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: route.title },
    { name: "twitter:description", content: route.description },
    { name: "twitter:image", content: OG_IMAGE.url },
    { name: "twitter:image:alt", content: OG_IMAGE.alt },
    { name: "twitter:label1", content: "Profession" },
    { name: "twitter:data1", content: PERSON.jobTitle },
    { name: "twitter:label2", content: "Location" },
    { name: "twitter:data2", content: "Sylhet, Bangladesh" },
  ];

  const links: HeadPayload["links"] = [
    { rel: "canonical", href: canonical },
    { rel: "icon", href: "/favicon.ico", sizes: "any" },
    { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    { rel: "icon", href: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
    { rel: "manifest", href: "/site.webmanifest" },
    { rel: "author", href: "/humans.txt" },
    { rel: "me", href: `${SITE.origin}/` },
    { rel: "alternate", href: "/llms.txt", type: "text/plain", title: "LLM summary" },
    { rel: "alternate", href: "/llms-full.txt", type: "text/plain", title: "LLM full profile" },
    ...heroPreloads(route),
  ];

  return {
    title: route.title,
    description: route.description,
    canonical,
    robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    keywords: route.keywords.join(", "),
    meta,
    links,
    jsonLd: jsonLd(route),
  };
}

export const ALL_ROUTE_HEADS: HeadPayload[] = ROUTES.map(buildHead);
