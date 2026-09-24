/**
 * Photograph gallery: the single source of truth for image alt text, captions,
 * page copy and the structured-data nodes that describe each photograph.
 *
 * The binary derivatives are produced by `npm run photos`
 * (scripts/make_assets.py), which writes `gallery.generated.json`. This module
 * joins that machine-generated manifest with the editorial metadata below, so
 * a photograph can never appear on the site without alt text, a caption and a
 * corresponding ImageObject in the Knowledge Graph.
 *
 * When no photographs have been installed yet the gallery is empty, and the
 * /gallery/ route, its navigation entry, its sitemap row and its graph nodes
 * are all omitted automatically — the site never links to an image it cannot
 * serve.
 */

import generated from "./gallery.generated.json";
import config from "./gallery.config.json";

type GeneratedEntry = {
  id: string;
  /** Paths relative to the site root, e.g. /images/gallery/04-stream-900.jpg */
  src: string;
  srcset: string;
  webp: string;
  webpSrcset: string;
  width: number;
  height: number;
  /** Intrinsic size of the 1600px long-edge derivative, for Content-Length hints. */
  fullWidth: number;
  fullHeight: number;
  bytes: number;
};

type Editorial = {
  /** Descriptive alt text — what is in the frame, not "photo of X". */
  alt: string;
  /** Short caption shown under the image. */
  caption: string;
  /** One or two sentences used on the gallery page and in the FAQ/testimonials. */
  context: string;
  /** Where and when the photograph was taken, if supplied by the subject. */
  location: string;
  /** Publication note: how the image may be described. */
  timeframe: string;
  /** The image used for the hero, the social card and Person.image. */
  primary?: boolean;
};

/**
 * Editorial library, keyed by photograph id. Order here is also the fallback
 * order used by `npm run photos -- --auto`.
 *
 * Alt text describes only what is visibly in the frame plus facts supplied by
 * the subject. No location is asserted for a photograph whose location has not
 * been confirmed — inventing one would be a fabricated fact, and this site's
 * whole purpose is to be a trustworthy record.
 */
export const GALLERY_META: Record<string, Editorial> = {
  "04-stream": {
    alt: "Md Mayeed Khan Shuvon standing in a shallow rocky stream, wearing glasses and a blue checked shirt, photographed outdoors in a wooded valley.",
    caption: "Outdoors in a wooded valley",
    context:
      "A front-facing portrait taken on a wooded stream, and the photograph used as the primary profile image across this site. It is chosen because the subject's face is clearly visible and evenly lit, which is what a professional profile photograph has to do.",
    location: "Bangladesh",
    timeframe: "Personal photograph, supplied by the subject",
    primary: true,
  },
  "02-riverside": {
    alt: "Md Mayeed Khan Shuvon on a riverbank wearing sunglasses and a black t-shirt with a bag over one shoulder, with boats and a blue sky behind him.",
    caption: "On the riverbank",
    context:
      "Photographed on a riverbank on a clear day, with the boats and waterline behind him. The image is included for completeness of the personal record rather than as a professional portrait.",
    location: "Bangladesh",
    timeframe: "Personal photograph, supplied by the subject",
  },
  "01-park-bench": {
    alt: "Md Mayeed Khan Shuvon standing beside a pink slatted park bench in a public garden with trees and grass around him.",
    caption: "In a public park",
    context:
      "A full-length photograph taken in a public park. It shows a relaxed, everyday setting rather than a formal one.",
    location: "Sylhet, Bangladesh",
    timeframe: "Personal photograph, supplied by the subject",
  },
  "03-stone-wall": {
    alt: "Md Mayeed Khan Shuvon standing in front of a dry-stone wall with a white arched niche, wearing a checked hooded jacket.",
    caption: "Against a stone wall",
    context:
      "Photographed against a dry-stone wall with a decorative arched niche. The setting is architectural rather than natural.",
    location: "Bangladesh",
    timeframe: "Personal photograph, supplied by the subject",
  },
};

export type GalleryPhoto = GeneratedEntry & Editorial & {
  /** Zero-based position in the album. */
  index: number;
};

const generatedEntries = (generated as GeneratedEntry[]) ?? [];

export const GALLERY: GalleryPhoto[] = generatedEntries
  .filter((entry) => Boolean(GALLERY_META[entry.id]))
  .map((entry, index) => ({ ...entry, ...GALLERY_META[entry.id], index }));

export const GALLERY_ENABLED = GALLERY.length > 0;

/**
 * The photograph used for the hero plate, the social card and Person.image.
 * `gallery.config.json` is the switch — the build script reads the same file, so
 * the hero image and the album order can never disagree.
 */
export const PRIMARY_PHOTO: GalleryPhoto | undefined =
  GALLERY.find((photo) => photo.id === config.primary) ??
  GALLERY.find((photo) => photo.primary) ??
  GALLERY[0];

/** Photographs other than the primary one — used for the album grid. */
export const SECONDARY_PHOTOS: GalleryPhoto[] = GALLERY.filter(
  (photo) => photo.id !== PRIMARY_PHOTO?.id,
);

export const GALLERY_COUNT = GALLERY.length;

/** Absolute URL for an image path, for structured data. */
export const imageUrl = (path: string, origin: string): string =>
  path.startsWith("http") ? path : `${origin}${path}`;
