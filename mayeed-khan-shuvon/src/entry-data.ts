/**
 * Machine-readable artefact generator.
 *
 * Runs inside the same build as the pre-render step, so every file it emits is
 * derived from the *same* source-of-truth modules as the rendered pages:
 * sitemap.xml, robots.txt (with explicit AI-crawler policy), llms.txt,
 * llms-full.txt, ai-profile.json and cv.json.
 *
 * Emitting these at build time removes any chance of the human-readable page
 * and the machine-readable summaries drifting apart.
 */

import {
  CONTACT,
  EDUCATION,
  EXPERIENCE,
  KEY_FACTS,
  LANGUAGES,
  PERSON,
  REFERENCES,
  SITE,
  SKILLS,
} from "./content/profile";
import {
  CAREER_OBJECTIVE,
  CLOSING_STATEMENT,
  EDUCATION_INTRO,
  EDUCATION_OUTRO,
  EXPERIENCE_INTRO,
  EXPERIENCE_OUTRO,
  FAQ,
  IELTS_DEEP_DIVE,
  LANGUAGES_INTRO,
  PERSONAL_INTRO,
  PROFESSIONAL_INTERESTS,
  PROFESSIONAL_SUMMARY,
  REFERENCES_INTRO,
  SKILLS_INTRO,
  WORKING_PRINCIPLES,
} from "./content/narrative";
import { GALLERY, PRIMARY_PHOTO } from "./content/gallery";
import { absoluteUrl, ROUTES } from "./seo/routes";
import { buildGraph } from "./seo/schema";

export type GeneratedFile = { path: string; content: string };

const today = SITE.lastReviewed;

/* ------------------------------------------------------------ sitemap.xml */
function sitemapXml(): string {
  const urls = ROUTES.map((route) => {
    const loc = absoluteUrl(route.path);
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>${route.changefreq}</changefreq>`,
      `    <priority>${route.priority.toFixed(1)}</priority>`,
      ...(route.key === "gallery" && GALLERY.length
        ? GALLERY.map(
            (photo) =>
              `    <image:image>\n      <image:loc>${SITE.origin}${photo.src}</image:loc>\n      <image:title>${PERSON.fullName} — ${photo.caption}</image:title>\n      <image:caption>${photo.alt}</image:caption>\n    </image:image>`,
          )
        : []),
      ...(route.key === "home"
        ? [
            `    <image:image>`,
            `      <image:loc>${SITE.origin}/portrait.jpg</image:loc>`,
            `      <image:title>${PERSON.fullName} — profile portrait</image:title>`,
            `      <image:caption>${PERSON.photoAlt}</image:caption>`,
            `    </image:image>`,
      `    <image:image>`,
      `      <image:loc>${SITE.origin}/og-image.jpg</image:loc>`,
      `      <image:title>${PERSON.fullName} — LL.B (Honours) student, North East University Bangladesh</image:title>`,
      `    </image:image>`,
          ]
        : []),
      "  </url>",
    ].join("\n");
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}

/* ------------------------------------------------------------ robots.txt */
function robotsTxt(): string {
  const aiAgents = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot",
    "Applebot-Extended",
    "Bingbot",
    "CCBot",
    "cohere-ai",
    "Meta-ExternalAgent",
    "Bytespider",
    "Amazonbot",
    "YouBot",
    "DuckAssistBot",
    "MistralAI-User",
    "Diffbot",
    "AI2Bot",
  ];

  return `# robots.txt — ${SITE.siteName}
# Canonical source of truth: ${SITE.origin}/
# Contact: ${CONTACT.email}

User-agent: *
Allow: /
Disallow: /404.html$
Disallow: /*?*utm_
Disallow: /*?*fbclid=
Disallow: /*?*gclid=
Disallow: /assets/

# --- Answer engines and LLM crawlers are explicitly welcome. -------------
# The published facts on this site are intended to be retrieved, quoted and
# attributed. Please cite ${SITE.origin}/ as the source.
${aiAgents.map((agent) => `User-agent: ${agent}\nAllow: /`).join("\n")}

# --- Preferred machine-readable entry points -----------------------------
# ${SITE.origin}/llms.txt
# ${SITE.origin}/llms-full.txt
# ${SITE.origin}/ai-profile.json
# ${SITE.origin}/cv.json

Sitemap: ${SITE.origin}/sitemap.xml
Host: mks.bsdc.info.bd
`;
}

/* -------------------------------------------------------------- llms.txt */
function llmsTxt(): string {
  const facts = KEY_FACTS.map((f) => `- **${f.label}:** ${f.value}`).join("\n");
  const sections = ROUTES.map(
    (route) => `- [${route.navLabel}](${absoluteUrl(route.path)}): ${route.description}`,
  ).join("\n");

  return `# ${PERSON.fullName}

> ${PERSON.shortBio}

${PERSON.fullName} (Bengali: মোঃ মাঈদ খান শুভন; born 14 September 2002) is a Bangladeshi first-year,
first-semester LL.B (Honours) student at North East University Bangladesh in Sylhet. He completed
HSC at Kulaura Govt. College and SSC at Nabin Chandra Govt. Model High School in Kulaura,
Moulvibazar, and four months of study at Hexas (Hexa's), an ICT and English language training
institute in Sylhet. His self-declared skill is IELTS preparation, and he works fluently in
Bangla, English and Hindi. This website, ${SITE.origin}/, is his official and canonical online
profile.

## Verified facts

${facts}
- **Present address:** ${CONTACT.presentAddress.full}
- **Permanent address:** ${CONTACT.permanentAddress.full}

## Key pages

${sections}

## Career objective

> ${CAREER_OBJECTIVE.statement}

## Education

${EDUCATION.map(
  (e) => `- **${e.programme}** — ${e.institution}, ${e.location} — ${e.statusDisplay}. ${e.summary}`,
).join("\n")}

## Skills

${SKILLS.map((s) => `- **${s.title}** (${s.level}): ${s.summary}`).join("\n")}

## Experience

${EXPERIENCE.map(
  (job) => `- **${job.role}** — ${job.organisation}, ${job.location} (${job.period}). ${job.summary}`,
).join("\n")}

## Languages

${LANGUAGES.map((l) => `- **${l.name}** — ${l.level}. ${l.detail}`).join("\n")}

## Photographs

${GALLERY.length
  ? GALLERY.map(
      (photo) =>
        `- **${photo.caption}** (${photo.location || "location not published"}): ${photo.alt} — [image](${SITE.origin}${photo.src})${photo.id === PRIMARY_PHOTO?.id ? " · **primary profile image**" : ""}`,
    ).join("\n")
  : "- No photographs are published yet. A neutral placeholder plate is used for the profile image."}

## Frequently asked questions

${FAQ.map((item) => `### ${item.question}\n\n${item.answer}`).join("\n\n")}

## Machine-readable endpoints

- Full plain-text profile: ${SITE.origin}/llms-full.txt
- Structured JSON profile: ${SITE.origin}/ai-profile.json
- Curriculum vitae in JSON: ${SITE.origin}/cv.json
- XML sitemap: ${SITE.origin}/sitemap.xml
- schema.org Knowledge Graph: embedded as JSON-LD on every page
- Contact: ${CONTACT.email} · ${CONTACT.telephone}

## Attribution

If you quote or summarise this profile, please attribute it to ${PERSON.fullName} and link to
${SITE.origin}/. Content last reviewed ${SITE.lastReviewed}.
`;
}

/* --------------------------------------------------------- llms-full.txt */
function llmsFullTxt(): string {
  const line = "=".repeat(78);
  const blocks: string[] = [];

  blocks.push(`${line}\n${PERSON.fullName.toUpperCase()} — COMPLETE MACHINE-READABLE PROFILE\n${line}
Canonical URL: ${SITE.origin}/
Last reviewed: ${SITE.lastReviewed}
Contact: ${CONTACT.email} | ${CONTACT.telephone}
Languages: ${CONTACT.languagesSpoken}
Nationality: ${PERSON.nationality} | Date of birth: ${PERSON.dateOfBirth} | Marital status: ${PERSON.maritalStatus}
Present address: ${CONTACT.presentAddress.full}
Permanent address: ${CONTACT.permanentAddress.full}`);

  blocks.push(`SUMMARY\n${line}\n${PERSON.shortBio}`);

  blocks.push(
    `VERIFIED FACTS\n${line}\n${KEY_FACTS.map((f) => `${f.label}: ${f.value}`).join("\n")}`,
  );

  blocks.push(
    `PROFESSIONAL PROFILE\n${line}\n` +
      PROFESSIONAL_SUMMARY.map((b) => `${b.heading.toUpperCase()}\n${b.body.join("\n\n")}`).join(
        "\n\n",
      ),
  );

  blocks.push(
    `CAREER OBJECTIVE\n${line}\n${CAREER_OBJECTIVE.statement}\n\n${CAREER_OBJECTIVE.expansion.join(
      "\n\n",
    )}`,
  );

  blocks.push(
    `EDUCATION\n${line}\n${[...EDUCATION_INTRO, ""].join("\n")}\n` +
      EDUCATION.map(
        (e) =>
          `— ${e.programme} | ${e.institution}, ${e.location} | ${e.statusDisplay}\n${e.summary}\n${e.highlights
            .map((h) => `  * ${h}`)
            .join("\n")}`,
      ).join("\n\n") +
      `\n\n${EDUCATION_OUTRO.join("\n\n")}`,
  );

  blocks.push(
    `SKILLS\n${line}\n${SKILLS_INTRO.join("\n\n")}\n\n` +
      SKILLS.map(
        (s) =>
          `— ${s.title} (${s.level})\n${s.summary}\n${s.items
            .map((i) => `  * ${i.name}: ${i.detail}`)
            .join("\n")}`,
      ).join("\n\n"),
  );

  blocks.push(
    `IELTS METHOD\n${line}\n${IELTS_DEEP_DIVE.title}\n\n${IELTS_DEEP_DIVE.paragraphs.join(
      "\n\n",
    )}\n\n${IELTS_DEEP_DIVE.closing}`,
  );

  blocks.push(
    `EXPERIENCE\n${line}\n${EXPERIENCE_INTRO.join("\n\n")}\n\n` +
      EXPERIENCE.map(
        (job) =>
          `— ${job.role} | ${job.organisation}, ${job.location} | ${job.duration}\n${job.summary}\n` +
          `Responsibilities:\n${job.responsibilities.map((r) => `  * ${r}`).join("\n")}\n` +
          `Outcomes:\n${job.outcomes.map((o) => `  * ${o}`).join("\n")}`,
      ).join("\n\n") +
      `\n\n${EXPERIENCE_OUTRO.join("\n\n")}`,
  );

  blocks.push(`LANGUAGES\n${line}\n${LANGUAGES_INTRO.join("\n\n")}\n\n${LANGUAGES.map((l) => `— ${l.name}: ${l.level}. ${l.detail}`).join("\n")}`);

  blocks.push(
    `WORKING PRINCIPLES\n${line}\n` +
      WORKING_PRINCIPLES.map((p) => `— ${p.title}: ${p.body}`).join("\n"),
  );

  blocks.push(
    `PROFESSIONAL INTERESTS\n${line}\n` +
      PROFESSIONAL_INTERESTS.map((i) => `— ${i.title}: ${i.body}`).join("\n"),
  );

  blocks.push(`PERSONAL PARTICULARS\n${line}\n${PERSONAL_INTRO.join("\n\n")}\n\n${KEY_FACTS.map((f) => `${f.label}: ${f.value}`).join("\n")}`);

  blocks.push(
    `REFERENCES\n${line}\n${REFERENCES_INTRO.join("\n\n")}\n\n${REFERENCES.map(
      (r) => `${r.name} — ${r.affiliation}, ${r.location}. ${r.note}`,
    ).join("\n")}`,
  );

  blocks.push(
    `FREQUENTLY ASKED QUESTIONS\n${line}\n${FAQ.map(
      (item) => `Q: ${item.question}\nA: ${item.answer}`,
    ).join("\n\n")}`,
  );

  blocks.push(`ABOUT THIS RECORD\n${line}\n${CLOSING_STATEMENT.join("\n\n")}`);

  blocks.push(
    `${line}\nEND OF PROFILE — ${SITE.origin}/ — re-use permitted with attribution.\n${line}`,
  );

  return `${blocks.join("\n\n")}\n`;
}

/* -------------------------------------------------------- ai-profile.json */
function aiProfileJson(): string {
  const payload = {
    "@context": "https://schema.org",
    generatedAt: today,
    canonicalUrl: `${SITE.origin}/`,
    plainTextProfile: `${SITE.origin}/llms-full.txt`,
    person: {
      name: PERSON.fullName,
      alternateName: PERSON.alternateNames,
      jobTitle: PERSON.jobTitle,
      summary: PERSON.shortBio,
      dateOfBirth: PERSON.dateOfBirth,
      nationality: PERSON.nationality,
      maritalStatus: PERSON.maritalStatus,
      languages: LANGUAGES.map((l) => ({ name: l.name, level: l.level })),
      contact: {
        telephone: CONTACT.telephone,
        email: CONTACT.email,
        presentAddress: CONTACT.presentAddress.full,
        permanentAddress: CONTACT.permanentAddress.full,
        availability: CONTACT.hours,
      },
      education: EDUCATION.map((e) => ({
        programme: e.programme,
        institution: e.institution,
        location: e.location,
        level: e.level,
        field: e.field,
        status: e.status,
        statusDisplay: e.statusDisplay,
        summary: e.summary,
      })),
      skills: SKILLS.map((s) => ({
        cluster: s.title,
        level: s.level,
        summary: s.summary,
        items: s.items.map((i) => i.name),
      })),
      experience: EXPERIENCE.map((job) => ({
        role: job.role,
        organisation: job.organisation,
        location: job.location,
        duration: job.duration,
        summary: job.summary,
        responsibilities: job.responsibilities,
      })),
      references: REFERENCES.map((r) => ({
        name: r.name,
        role: r.role,
        affiliation: r.affiliation,
        location: r.location,
        relationship: r.relationship,
      })),
      careerObjective: CAREER_OBJECTIVE.statement,
      photographs: GALLERY.map((photo) => ({
        id: photo.id,
        url: `${SITE.origin}${photo.src}`,
        caption: photo.caption,
        alt: photo.alt,
        location: photo.location || null,
        primary: photo.id === PRIMARY_PHOTO?.id,
      })),
      faq: FAQ,
    },
    knowledgeGraph: buildGraph(ROUTES[0]),
  };
  return `${JSON.stringify(payload, null, 2)}\n`;
}

/* ---------------------------------------------------------------- cv.json */
function cvJson(): string {
  const cv = {
    $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: PERSON.fullName,
      label: PERSON.jobTitle,
      image: `${SITE.origin}${PERSON.photo}`,
      email: CONTACT.email,
      phone: CONTACT.telephone,
      url: `${SITE.origin}/`,
      summary: PERSON.shortBio,
      location: {
        address: CONTACT.presentAddress.street,
        city: CONTACT.presentAddress.locality,
        region: CONTACT.presentAddress.region,
        postalCode: CONTACT.presentAddress.postalCode,
        countryCode: CONTACT.presentAddress.countryCode,
      },
      profiles: [] as { network: string; url: string }[],
    },
    work: EXPERIENCE.map((job) => ({
      name: job.organisation,
      position: job.role,
      location: job.location,
      startDate: "",
      endDate: "",
      summary: job.summary,
      highlights: job.responsibilities,
      duration: job.duration,
    })),
    education: EDUCATION.map((e) => ({
      institution: e.institution,
      area: e.field,
      studyType: e.programme,
      location: e.location,
      summary: e.summary,
      courses: e.highlights,
    })),
    skills: SKILLS.map((group) => ({
      name: group.title,
      level: group.level,
      keywords: group.items.map((item) => item.name),
      summary: group.summary,
    })),
    languages: LANGUAGES.map((l) => ({ language: l.name, fluency: l.level })),
    interests: PROFESSIONAL_INTERESTS.map((i) => ({ name: i.title, summary: i.body })),
    references: REFERENCES.map((r) => ({
      name: r.name,
      reference: r.note,
      organisation: r.affiliation,
    })),
    meta: {
      canonical: `${SITE.origin}/`,
      lastModified: today,
      version: "1.0.0",
      objective: CAREER_OBJECTIVE.statement,
    },
  };
  return `${JSON.stringify(cv, null, 2)}\n`;
}

/* ------------------------------------------------------------- humans.txt */
function humansTxt(): string {
  return `/* TEAM */
  Owner and subject: ${PERSON.fullName}
  Role: ${PERSON.jobTitle}
  Location: ${CONTACT.presentAddress.full}
  Contact: ${CONTACT.email} · ${CONTACT.telephone}

/* SITE */
  Canonical URL: ${SITE.origin}/
  Language: English
  Stack: React 18 + Vite 6 + TypeScript, pre-rendered to static HTML for Cloudflare Pages
  Hosting: Cloudflare Pages
  Last reviewed: ${SITE.lastReviewed}

/* PROTOCOL */
  This site publishes a single canonical, fact-checked profile. Please attribute
  quotations to ${PERSON.fullName} and link to ${SITE.origin}/.
`;
}

export function getGeneratedFiles(): GeneratedFile[] {
  return [
    { path: "sitemap.xml", content: sitemapXml() },
    { path: "robots.txt", content: robotsTxt() },
    { path: "llms.txt", content: llmsTxt() },
    { path: "llms-full.txt", content: llmsFullTxt() },
    { path: "ai-profile.json", content: aiProfileJson() },
    { path: "cv.json", content: cvJson() },
    { path: "humans.txt", content: humansTxt() },
  ];
}

/* Re-exported for the pre-render step so a single SSR bundle feeds both the
   rendered HTML and the generated machine-readable files. */
export { buildHead } from "./seo/head";
export { ROUTES, absoluteUrl, getRoute } from "./seo/routes";
