import { GALLERY_ENABLED } from "../content/gallery";
import { SITE } from "../content/profile";

export type RouteKey =
  | "home"
  | "about"
  | "education"
  | "skills"
  | "experience"
  | "gallery"
  | "faq"
  | "contact";

export type RouteMeta = {
  key: RouteKey;
  /** Always written with a leading and trailing slash, e.g. "/about/". */
  path: string;
  /** Kept under 60 characters so it is not truncated in the SERP. */
  title: string;
  /** Kept between 140 and 158 characters. */
  description: string;
  /** Visible page H1 — also the entity title used in the Knowledge Graph. */
  h1: string;
  /** Short label for navigation and breadcrumbs. */
  navLabel: string;
  keywords: string[];
  priority: number;
  changefreq: "weekly" | "monthly" | "yearly";
  /** schema.org type of the page wrapper node. */
  pageType: "ProfilePage" | "CollectionPage" | "AboutPage" | "ContactPage" | "FAQPage";
  /** Routes that only exist when their content exists (e.g. the photo album). */
  requiresContent?: boolean;
};

const ALL_ROUTES: RouteMeta[] = [
  {
    key: "home",
    path: "/",
    title: "Md Mayeed Khan Shuvon — LL.B (Hons) 1st Year, Sylhet",
    description:
      "Official profile of Md Mayeed Khan Shuvon — first-year LL.B (Honours) student, North East University Bangladesh; four months at Hexas (Hexa's), Sylhet.",
    h1: "Md Mayeed Khan Shuvon",
    navLabel: "Home",
    keywords: [
      "Md Mayeed Khan Shuvon",
      "Mayeed Khan Shuvon",
      "LL.B Honours student Sylhet",
      "North East University Bangladesh student",
      "IELTS preparation Sylhet",
      "Hexas Sylhet student experience",
    ],
    priority: 1.0,
    changefreq: "weekly",
    pageType: "ProfilePage",
  },
  {
    key: "about",
    path: "/about/",
    title: "About Md Mayeed Khan Shuvon — Law Student, Sylhet",
    description:
      "Biography and working principles of Md Mayeed Khan Shuvon, a first-year LL.B (Honours) student at North East University Bangladesh in Zindabazar, Sylhet.",
    h1: "About Md Mayeed Khan Shuvon",
    navLabel: "About",
    keywords: [
      "Md Mayeed Khan Shuvon biography",
      "Mayeed Khan Shuvon career objective",
      "Bangladeshi law student profile",
      "multilingual law student Bangladesh",
    ],
    priority: 0.9,
    changefreq: "monthly",
    pageType: "AboutPage",
  },
  {
    key: "education",
    path: "/education/",
    title: "Education — Md Mayeed Khan Shuvon | LL.B (Hons), HSC, SSC",
    description:
      "Qualifications of Md Mayeed Khan Shuvon: LL.B (Honours), North East University Bangladesh (first year, in progress); HSC, Kulaura Govt. College; SSC, Kulaura.",
    h1: "Educational Qualification",
    navLabel: "Education",
    keywords: [
      "Md Mayeed Khan Shuvon education",
      "LL.B Honours North East University Bangladesh",
      "Kulaura Govt College HSC",
      "Nabin Chandra Govt Model High School SSC",
    ],
    priority: 0.8,
    changefreq: "yearly",
    pageType: "CollectionPage",
  },
  {
    key: "skills",
    path: "/skills/",
    title: "Skills — IELTS Preparation & Academic English | Mayeed Khan Shuvon",
    description:
      "IELTS preparation skills of Md Mayeed Khan Shuvon: all four modules, band-descriptor practice, legal research, drafting and multilingual communication.",
    h1: "Skills & Competencies",
    navLabel: "Skills",
    keywords: [
      "IELTS preparation skills",
      "IELTS writing task 2 feedback",
      "band descriptor marking",
      "academic English Sylhet",
      "legal drafting skills",
    ],
    priority: 0.8,
    changefreq: "monthly",
    pageType: "CollectionPage",
  },
  {
    key: "experience",
    path: "/experience/",
    title: "Experience — 4 Months at Hexas, Sylhet | Mayeed Khan Shuvon",
    description:
      "Four months of experience as a student at Hexas (Hexa's), Sylhet, an ICT and English language training institute, with his named professional reference.",
    h1: "Professional Experience",
    navLabel: "Experience",
    keywords: [
      "Hexas Sylhet",
      "Hexas Hexa's Sylhet",
      "ICT English institute Sylhet",
      "student experience Sylhet",
      "IELTS preparation Sylhet",
    ],
    priority: 0.8,
    changefreq: "monthly",
    pageType: "CollectionPage",
  },
  {
    key: "gallery",
    path: "/gallery/",
    title: "Photographs — Md Mayeed Khan Shuvon | Profile Photo Gallery",
    description:
      "Published photographs of Md Mayeed Khan Shuvon — the primary profile portrait plus outdoor photographs, each with a caption and description for image search and accessibility.",
    h1: "Photographs of Md Mayeed Khan Shuvon",
    navLabel: "Gallery",
    keywords: [
      "Md Mayeed Khan Shuvon photo",
      "Mayeed Khan Shuvon picture",
      "Mayeed Khan Shuvon profile photo",
      "Md Mayeed Khan Shuvon Sylhet",
    ],
    priority: 0.6,
    changefreq: "yearly",
    pageType: "CollectionPage",
    requiresContent: true,
  },
  {
    key: "faq",
    path: "/faq/",
    title: "FAQ — Md Mayeed Khan Shuvon | Education, Skills, Contact",
    description:
      "Answers about Md Mayeed Khan Shuvon: who he is, his qualifications, four months at Hexas (Hexa's) in Sylhet, languages, references and how to contact him.",
    h1: "Frequently Asked Questions",
    navLabel: "FAQ",
    keywords: [
      "who is Md Mayeed Khan Shuvon",
      "Mayeed Khan Shuvon qualification",
      "Mayeed Khan Shuvon contact",
      "IELTS preparation Sylhet contact",
    ],
    priority: 0.7,
    changefreq: "monthly",
    pageType: "FAQPage",
  },
  {
    key: "contact",
    path: "/contact/",
    title: "Contact Md Mayeed Khan Shuvon — Phone & Email, Sylhet",
    description:
      "Contact Md Mayeed Khan Shuvon: telephone and WhatsApp +880 1825-723887, email shuvonkhan8947@gmail.com, Zindabazar, Sylhet, Bangladesh. Sunday to Thursday.",
    h1: "Contact Md Mayeed Khan Shuvon",
    navLabel: "Contact",
    keywords: [
      "Md Mayeed Khan Shuvon contact",
      "Mayeed Khan Shuvon phone number",
      "Mayeed Khan Shuvon email",
      "law student Sylhet contact",
    ],
    priority: 0.9,
    changefreq: "monthly",
    pageType: "ContactPage",
  },
];

/**
 * Public route table. Routes flagged `requiresContent` are dropped when their
 * content is absent, which keeps navigation, the sitemap, llms.txt and the
 * manifest free of links to pages or images that do not exist.
 */
export const ROUTES: RouteMeta[] = ALL_ROUTES.filter(
  (route) => !route.requiresContent || GALLERY_ENABLED,
);

export const getRoute = (key: RouteKey): RouteMeta => {
  const found = ROUTES.find((r) => r.key === key);
  if (!found) throw new Error(`Unknown route key: ${key}`);
  return found;
};

/** Absolute URL helper — always returns a canonical, trailing-slash URL. */
export const absoluteUrl = (path: string): string =>
  path === "/" ? `${SITE.origin}/` : `${SITE.origin}${path}`;

/** Path to the breadcrumb trail for a route (Home → …). */
export const breadcrumbFor = (route: RouteMeta): { name: string; path: string }[] => {
  if (route.key === "home") return [{ name: "Home", path: "/" }];
  return [
    { name: "Home", path: "/" },
    { name: route.navLabel, path: route.path },
  ];
};
