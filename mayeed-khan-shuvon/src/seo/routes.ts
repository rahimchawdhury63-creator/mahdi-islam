import { SITE } from "../content/profile";

export type RouteKey =
  | "home"
  | "about"
  | "education"
  | "skills"
  | "experience"
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
};

export const ROUTES: RouteMeta[] = [
  {
    key: "home",
    path: "/",
    title: "Md Mayeed Khan Shuvon — LL.B (Hons) & IELTS Specialist, Sylhet",
    description:
      "Official profile of Md Mayeed Khan Shuvon — LL.B (Honours) graduate of North East University Bangladesh and IELTS preparation specialist in Sylhet, Bangladesh.",
    h1: "Md Mayeed Khan Shuvon",
    navLabel: "Home",
    keywords: [
      "Md Mayeed Khan Shuvon",
      "Mayeed Khan Shuvon",
      "IELTS preparation Sylhet",
      "LL.B Honours graduate Bangladesh",
      "North East University Bangladesh law graduate",
      "English tutor Sylhet",
    ],
    priority: 1.0,
    changefreq: "weekly",
    pageType: "ProfilePage",
  },
  {
    key: "about",
    path: "/about/",
    title: "About Md Mayeed Khan Shuvon — Legal Graduate & English Tutor",
    description:
      "Biography, career objective and working principles of Md Mayeed Khan Shuvon, an LL.B (Honours) graduate and IELTS preparation specialist based in Zindabazar, Sylhet.",
    h1: "About Md Mayeed Khan Shuvon",
    navLabel: "About",
    keywords: [
      "Md Mayeed Khan Shuvon biography",
      "Mayeed Khan Shuvon career objective",
      "Bangladeshi law graduate profile",
      "multilingual English tutor Bangladesh",
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
      "Educational qualification of Md Mayeed Khan Shuvon: LL.B (Honours) at North East University Bangladesh, HSC at Kulaura Govt. College and SSC at Nabin Chandra Govt. Model High School.",
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
      "IELTS preparation skills of Md Mayeed Khan Shuvon: Listening, Reading, Writing and Speaking strategy, band-descriptor marking, legal research, drafting and multilingual communication.",
    h1: "Skills & Competencies",
    navLabel: "Skills",
    keywords: [
      "IELTS preparation skills",
      "IELTS writing task 2 feedback",
      "band descriptor marking",
      "academic English instructor Sylhet",
      "legal drafting skills",
    ],
    priority: 0.8,
    changefreq: "monthly",
    pageType: "CollectionPage",
  },
  {
    key: "experience",
    path: "/experience/",
    title: "Experience — IELTS Preparation Tutor, Sylhet | Mayeed Khan Shuvon",
    description:
      "Four months of IELTS preparation tutoring experience in Sylhet: diagnostic assessment, study planning, timed mock examinations, band-descriptor marking and recorded learner progress.",
    h1: "Professional Experience",
    navLabel: "Experience",
    keywords: [
      "IELTS tutor Sylhet experience",
      "IELTS preparation teacher Bangladesh",
      "English tutoring experience Sylhet",
    ],
    priority: 0.8,
    changefreq: "monthly",
    pageType: "CollectionPage",
  },
  {
    key: "faq",
    path: "/faq/",
    title: "FAQ — Md Mayeed Khan Shuvon | Education, Skills, Contact",
    description:
      "Answers about Md Mayeed Khan Shuvon: who he is, his qualifications, IELTS experience, languages, availability, references and how to contact him in Sylhet, Bangladesh.",
    h1: "Frequently Asked Questions",
    navLabel: "FAQ",
    keywords: [
      "who is Md Mayeed Khan Shuvon",
      "Mayeed Khan Shuvon qualification",
      "Mayeed Khan Shuvon contact",
      "IELTS tutor Sylhet contact",
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
      "Contact Md Mayeed Khan Shuvon: telephone and WhatsApp +880 1825-723887, email shuvonkhan8947@gmail.com, Zindabazar, Sylhet, Bangladesh. Available Sunday to Thursday.",
    h1: "Contact Md Mayeed Khan Shuvon",
    navLabel: "Contact",
    keywords: [
      "Md Mayeed Khan Shuvon contact",
      "Mayeed Khan Shuvon phone number",
      "Mayeed Khan Shuvon email",
      "IELTS tutor contact Sylhet",
    ],
    priority: 0.9,
    changefreq: "monthly",
    pageType: "ContactPage",
  },
];

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
