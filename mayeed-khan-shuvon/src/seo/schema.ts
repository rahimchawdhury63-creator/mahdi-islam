/**
 * schema.org Knowledge Graph builder.
 *
 * Design notes (these matter for entity reconciliation):
 *
 * 1. Every node is given a stable, absolute `@id`. Nodes then reference each
 *    other by `@id` instead of repeating literal objects, which is what turns a
 *    pile of markup into a graph. Search engines and LLM crawlers can merge the
 *    graph across pages because the identifiers never change.
 * 2. The `Person` node is the graph centre and is referenced by `author`,
 *    `publisher`, `about`, `mainEntity` and `alumniOf` style edges.
 * 3. Only verifiable facts supplied by the subject are emitted. No invented
 *    social profiles, awards or metrics — false edges poison an entity graph.
 * 4. `sameAs` is only populated with real profiles. Add real URLs to
 *    `PERSON_PROFILES.sameAs` when social accounts exist.
 */

import {
  CONTACT,
  EDUCATION,
  EXPERIENCE,
  LANGUAGES,
  PERSON,
  REFERENCES,
  SITE,
  SKILLS,
} from "../content/profile";
import { FAQ } from "../content/narrative";
import { GALLERY, PRIMARY_PHOTO, imageUrl } from "../content/gallery";
import { absoluteUrl, breadcrumbFor, type RouteMeta } from "./routes";

const ORIGIN = SITE.origin;

/** Fill these in with genuine profiles only. Empty strings are filtered out. */
export const PERSON_PROFILES = {
  sameAs: [] as string[],
  social: {
    linkedin: "",
    facebook: "",
    x: "",
    youtube: "",
    orcid: "",
    googleScholar: "",
    researchGate: "",
  },
};

const CLEAN_ID = (fragment: string) => `${ORIGIN}/#${fragment}`;

/* ------------------------------------------------------------------ nodes */

export const personNode = () => {
  const sameAs = [
    ...PERSON_PROFILES.sameAs,
    ...Object.values(PERSON_PROFILES.social),
  ].filter(Boolean);

  return {
    "@type": "Person",
    "@id": SITE.entityId,
    name: PERSON.fullName,
    alternateName: [...PERSON.alternateNames],
    givenName: PERSON.givenName,
    additionalName: PERSON.additionalName,
    familyName: PERSON.familyName,
    honorificPrefix: PERSON.honorificPrefix,
    gender: PERSON.gender,
    birthDate: PERSON.dateOfBirth,
    nationality: { "@type": "Country", name: "Bangladesh", "@id": "https://www.wikidata.org/wiki/Q902" },
    description: PERSON.shortBio,
    disambiguatingDescription:
      "Bangladeshi LL.B (Honours) graduate and IELTS preparation specialist from Kulaura, Moulvibazar, resident in Zindabazar, Sylhet.",
    jobTitle: PERSON.jobTitle,
    url: `${ORIGIN}/`,
    mainEntityOfPage: { "@id": SITE.profilePageId },
    image: primaryImageNode(),
    email: `mailto:${CONTACT.email}`,
    telephone: CONTACT.telephone,
    address: [{ "@id": CLEAN_ID("present-address") }, { "@id": CLEAN_ID("permanent-address") }],
    contactPoint: [
      {
        "@type": "ContactPoint",
        "@id": CLEAN_ID("contact-point"),
        contactType: "professional enquiries",
        telephone: CONTACT.telephone,
        email: CONTACT.email,
        availableLanguage: [
          { "@type": "Language", name: "Bangla", alternateName: "bn" },
          { "@type": "Language", name: "English", alternateName: "en" },
          { "@type": "Language", name: "Hindi", alternateName: "hi" },
        ],
        areaServed: { "@type": "Country", name: "Bangladesh" },
        hoursAvailable: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
            opens: "10:00",
            closes: "19:00",
          },
        ],
      },
    ],
    knowsLanguage: LANGUAGES.map((l) => ({
      "@type": "Language",
      name: l.name,
      alternateName: l.iso,
    })),
    knowsAbout: [
      "IELTS preparation",
      "Academic English",
      "English as a second language instruction",
      "Legal studies",
      "Legal drafting",
      "Legal research",
      "Statutory interpretation",
      "Academic writing",
      "Examination technique",
      "Translation and multilingual communication",
      "Regulatory and compliance documentation",
      "Medical and clinical English communication",
    ],
    hasOccupation: [
      { "@id": CLEAN_ID("occupation-ielts-tutor") },
      { "@id": CLEAN_ID("occupation-law-graduate") },
    ],
    seeks: {
      "@type": "Demand",
      name: "Full-time employment, traineeship or collaborative project in legal support, academic administration, language instruction or documentation-focused roles",
      availability: "https://schema.org/InStock",
    },
    alumniOf: EDUCATION.map((e) => ({ "@id": `${ORIGIN}/#${e.id}` })),
    hasCredential: EDUCATION.map((e) => ({ "@id": `${ORIGIN}/#credential-${e.id}` })),
    affiliation: { "@id": CLEAN_ID("referee-affiliation") },
    knows: { "@type": "Person", "@id": CLEAN_ID("reference-person") },
    subjectOf: [
      { "@id": SITE.profilePageId },
      { "@id": CLEAN_ID("faqpage") },
      { "@id": CLEAN_ID("occupation-ielts-tutor") },
    ],
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#hero-summary", "#professional-summary", "#faq"],
    },
    isAccessibleForFree: true,
    ...(sameAs.length ? { sameAs } : {}),
  };
};

export const websiteNode = () => ({
  "@type": "WebSite",
  "@id": SITE.orgId,
  url: `${ORIGIN}/`,
  name: SITE.siteName,
  alternateName: SITE.shortName,
  description:
    "Official professional profile of Md Mayeed Khan Shuvon — education, skills, IELTS preparation experience, languages, references and contact details.",
  inLanguage: "en",
  publisher: { "@id": SITE.entityId },
  copyrightHolder: { "@id": SITE.entityId },
  copyrightYear: 2026,
  isFamilyFriendly: true,
  license: `${ORIGIN}/`,
});

export const addressNodes = () => [
  {
    "@type": ["PostalAddress", "Place"],
    "@id": CLEAN_ID("present-address"),
    name: "Present address of Md Mayeed Khan Shuvon",
    streetAddress: CONTACT.presentAddress.street,
    addressLocality: CONTACT.presentAddress.locality,
    addressRegion: CONTACT.presentAddress.region,
    postalCode: CONTACT.presentAddress.postalCode,
    addressCountry: CONTACT.presentAddress.countryCode,
    description: CONTACT.presentAddress.full,
  },
  {
    "@type": ["PostalAddress", "Place"],
    "@id": CLEAN_ID("permanent-address"),
    name: "Permanent address of Md Mayeed Khan Shuvon",
    streetAddress: CONTACT.permanentAddress.street,
    addressLocality: CONTACT.permanentAddress.locality,
    addressRegion: CONTACT.permanentAddress.region,
    postalCode: CONTACT.permanentAddress.postalCode,
    addressCountry: CONTACT.permanentAddress.countryCode,
    description: CONTACT.permanentAddress.full,
  },
];

export const educationNodes = () => {
  const institutions = EDUCATION.map((e) => ({
    "@type": "CollegeOrUniversity",
    "@id": `${ORIGIN}/#${e.id}`,
    name: e.institution,
    description: e.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: e.location.split(",")[0].trim(),
      addressRegion: "Sylhet Division",
      addressCountry: "BD",
    },
    ...(e.id === "llb-honours"
      ? {
          url: "https://neub.edu.bd/",
          department: {
            "@type": "EducationalOrganization",
            name: "Department of Law, North East University Bangladesh",
          },
        }
      : {}),
  }));

  const credentials = EDUCATION.map((e) => ({
    "@type": "EducationalOccupationalCredential",
    "@id": `${ORIGIN}/#credential-${e.id}`,
    name: e.programme,
    credentialCategory: "degree",
    educationalLevel: e.level,
    about: e.field,
    description: e.summary,
    competencies: e.highlights.join(" "),
    recognizedBy: { "@id": `${ORIGIN}/#${e.id}` },
    holds: { "@id": SITE.entityId },
  }));

  return [...institutions, ...credentials];
};

export const occupationNodes = () => {
  const ielts = EXPERIENCE[0];
  return [
    {
      "@type": "Occupation",
      "@id": CLEAN_ID("occupation-ielts-tutor"),
      name: "IELTS Preparation Tutor",
      alternateName: ["IELTS instructor", "English language tutor", "Academic English coach"],
      description:
        "Teaches IELTS Listening, Reading, Writing and Speaking strategy, runs timed mock examinations, marks written work against the official band descriptors and maintains learner progress records.",
      occupationLocation: {
        "@type": "City",
        name: "Sylhet",
        address: {
          "@type": "PostalAddress",
          addressRegion: "Sylhet Division",
          addressCountry: "BD",
        },
      },
      skills: SKILLS.flatMap((s) => s.items.map((i) => i.name)).slice(0, 14),
      experienceRequirements: {
        "@type": "OccupationalExperienceRequirements",
        monthsOfExperience: 4,
        description: ielts.summary,
      },
      qualifications: "LL.B (Honours); academic English proficiency across all four IELTS modules",
    },
    {
      "@type": "Occupation",
      "@id": CLEAN_ID("occupation-law-graduate"),
      name: "Law Graduate (LL.B Honours)",
      alternateName: ["Legal researcher", "Paralegal", "Legal documentation assistant"],
      description:
        "Legal research, statutory interpretation, case briefing and structured drafting of legal and regulatory documents, produced through a four-year English-medium LL.B (Honours) degree.",
      occupationLocation: { "@type": "Country", name: "Bangladesh" },
      skills: [
        "Legal research",
        "Statutory interpretation",
        "Case briefing",
        "Legal drafting",
        "Critical reasoning",
        "Regulatory and compliance documentation",
      ],
      qualifications: "LL.B (Honours), North East University Bangladesh",
    },
  ];
};

export const referenceNodes = () => {
  const ref = REFERENCES[0];
  return [
    {
      "@type": "Person",
      "@id": CLEAN_ID("reference-person"),
      name: ref.name,
      affiliation: { "@id": CLEAN_ID("referee-affiliation") },
      description:
        "Named professional reference for Md Mayeed Khan Shuvon on academic discipline, reliability and language proficiency.",
    },
    {
      "@type": "Organization",
      "@id": CLEAN_ID("referee-affiliation"),
      name: ref.affiliation,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sylhet",
        addressCountry: "BD",
      },
    },
  ];
};

export const languageNodes = () =>
  LANGUAGES.map((l) => ({
    "@type": "Language",
    "@id": CLEAN_ID(`language-${l.iso}`),
    name: l.name,
    alternateName: l.iso,
    description: `${l.level} — ${l.detail}`,
  }));

export const breadcrumbNode = (route: RouteMeta) => {
  const trail = breadcrumbFor(route);
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(route.path)}#breadcrumb`,
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
};

export const pageNode = (route: RouteMeta) => ({
  "@type": route.pageType,
  "@id": `${absoluteUrl(route.path)}#webpage`,
  url: absoluteUrl(route.path),
  name: route.title,
  headline: route.h1,
  description: route.description,
  inLanguage: "en",
  isPartOf: { "@id": SITE.orgId },
  about: { "@id": SITE.entityId },
  mainEntity:
    route.key === "gallery" ? { "@id": `${ORIGIN}/gallery/#gallery` } : { "@id": SITE.entityId },
  breadcrumb: { "@id": `${absoluteUrl(route.path)}#breadcrumb` },
  primaryImageOfPage: { "@id": CLEAN_ID("portrait") },
  datePublished: SITE.publishedDate,
  dateModified: SITE.lastReviewed,
  lastReviewed: SITE.lastReviewed,
  reviewedBy: { "@id": SITE.entityId },
  audience: {
    "@type": "Audience",
    audienceType: "Employers, recruitment agencies, universities, IELTS candidates",
  },
  ...(route.key === "faq" || route.key === "home"
    ? { significantLink: `${absoluteUrl("/contact/")}` }
    : {}),
});

export const faqNode = () => ({
  "@type": "FAQPage",
  "@id": CLEAN_ID("faqpage"),
  name: "Frequently asked questions about Md Mayeed Khan Shuvon",
  about: { "@id": SITE.entityId },
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
});

export const skillListNode = () => ({
  "@type": "ItemList",
  "@id": CLEAN_ID("skills"),
  name: "Skills and competencies of Md Mayeed Khan Shuvon",
  numberOfItems: SKILLS.reduce((total, group) => total + group.items.length, 0),
  itemListElement: SKILLS.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "ListItem",
      name: item.name,
      description: item.detail,
      item: {
        "@type": "DefinedTerm",
        name: item.name,
        inDefinedTermSet: group.title,
        description: item.detail,
      },
    })),
  ),
});

/**
 * The primary profile image. Prefers the installed photograph; falls back to
 * the static plate so the graph is valid whether or not an album exists.
 */
export const primaryImageNode = () => {
  const photo = PRIMARY_PHOTO;
  const url = imageUrl(photo?.src ?? PERSON.photo, ORIGIN);
  return {
    "@type": "ImageObject",
    "@id": CLEAN_ID("portrait"),
    url,
    contentUrl: url,
    caption: photo?.caption ?? PERSON.photoAlt,
    description: photo?.alt ?? PERSON.photoAlt,
    width: photo ? { "@type": "QuantitativeValue", value: photo.fullWidth, unitCode: "E37" } : undefined,
    height: photo ? { "@type": "QuantitativeValue", value: photo.fullHeight, unitCode: "E37" } : undefined,
    encodingFormat: "image/jpeg",
    representativeOfPage: true,
    creditText: PERSON.fullName,
    creator: { "@id": SITE.entityId },
    copyrightNotice: `© 2026 ${PERSON.fullName}`,
    license: `${ORIGIN}/gallery/`,
    acquireLicensePage: `${ORIGIN}/gallery/`,
  };
};

/** One ImageObject per published photograph. */
export const galleryImageNodes = () =>
  GALLERY.map((photo) => {
    const url = imageUrl(photo.src, ORIGIN);
    return {
      "@type": "ImageObject",
      "@id": `${ORIGIN}/#photo-${photo.id}`,
      url,
      contentUrl: url,
      caption: photo.caption,
      description: photo.alt,
      name: `${PERSON.fullName} — ${photo.caption}`,
      width: { "@type": "QuantitativeValue", value: photo.width, unitCode: "E37" },
      height: { "@type": "QuantitativeValue", value: photo.height, unitCode: "E37" },
      encodingFormat: "image/jpeg",
      about: { "@id": SITE.entityId },
      creator: { "@id": SITE.entityId },
      creditText: PERSON.fullName,
      copyrightNotice: `© 2026 ${PERSON.fullName}`,
      isPartOf: { "@id": `${ORIGIN}/gallery/#gallery` },
      ...(photo.location ? { contentLocation: { "@type": "Place", name: photo.location } } : {}),
      license: `${ORIGIN}/gallery/`,
      acquireLicensePage: `${ORIGIN}/gallery/`,
    };
  });

/** The album itself, referenced by every ImageObject above. */
export const imageGalleryNode = () => ({
  "@type": "ImageGallery",
  "@id": `${ORIGIN}/gallery/#gallery`,
  name: `Photographs of ${PERSON.fullName}`,
  description:
    "Published photographs of Md Mayeed Khan Shuvon, each with a caption and descriptive alt text.",
  about: { "@id": SITE.entityId },
  numberOfItems: GALLERY.length,
  image: GALLERY.map((photo) => ({ "@id": `${ORIGIN}/#photo-${photo.id}` })),
  associatedMedia: GALLERY.map((photo) => ({ "@id": `${ORIGIN}/#photo-${photo.id}` })),
  isPartOf: { "@id": `${ORIGIN}/gallery/#webpage` },
  mainEntityOfPage: { "@id": `${ORIGIN}/gallery/#webpage` },
});

/* ------------------------------------------------------------------ graph */

export const buildGraph = (route: RouteMeta) => {
  const graph: Record<string, unknown>[] = [
    websiteNode(),
    personNode(),
    ...addressNodes(),
    ...educationNodes(),
    ...occupationNodes(),
    ...referenceNodes(),
    ...languageNodes(),
    skillListNode(),
    primaryImageNode(),
    ...galleryImageNodes(),
    pageNode(route),
    breadcrumbNode(route),
  ];

  if (route.key === "gallery") graph.push(imageGalleryNode());

  if (route.key === "faq" || route.key === "home") graph.push(faqNode());

  return { "@context": "https://schema.org", "@graph": graph };
};

/**
 * Serialises the graph. `<` is escaped so the payload can never terminate the
 * surrounding `<script>` element early.
 */
export const jsonLd = (route: RouteMeta): string =>
  JSON.stringify(buildGraph(route)).replace(/</g, "\\u003c");
