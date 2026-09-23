/**
 * Single source of truth for every verifiable fact published about
 * Md Mayeed Khan Shuvon.
 *
 * This module is imported by BOTH the browser bundle and the Node pre-render
 * step, so the exact same strings end up in the rendered HTML, the JSON-LD
 * Knowledge Graph and the `llms.txt` / `llms-full.txt` machine-readable
 * summaries. Consistency of these entities is what search engines use to
 * reconcile a person across the web (NAP + entity reconciliation).
 */

export const SITE = {
  /** Canonical origin, no trailing slash. */
  origin: "https://mks.bsdc.info.bd",
  name: "Md Mayeed Khan Shuvon",
  siteName: "Md Mayeed Khan Shuvon — Official Profile",
  shortName: "Mayeed Khan Shuvon",
  locale: "en_US",
  htmlLang: "en",
  publishedDate: "2026-01-01",
  lastReviewed: "2026-09-23",
  /** Absolute URL of the primary entity for this site. */
  entityId: "https://mks.bsdc.info.bd/#person",
  orgId: "https://mks.bsdc.info.bd/#website",
  profilePageId: "https://mks.bsdc.info.bd/#profilepage",
} as const;

export const PERSON = {
  fullName: "Md Mayeed Khan Shuvon",
  /** Latin transliteration alternatives people actually search with. */
  alternateNames: [
    "Mayeed Khan Shuvon",
    "Md. Mayeed Khan Shuvon",
    "Mayeed Khan",
    "Mayeed Khan Shuvon Sylhet",
    "মোঃ মাঈদ খান শুভন",
  ],
  givenName: "Mayeed",
  additionalName: "Khan",
  familyName: "Shuvon",
  honorificPrefix: "Md",
  gender: "Male",
  jobTitle: "LL.B (Honours) Graduate & IELTS Preparation Specialist",
  shortBio:
    "Md Mayeed Khan Shuvon is an LL.B (Honours) graduate of North East University Bangladesh and an IELTS preparation specialist based in Zindabazar, Sylhet.",
  dateOfBirth: "2002-09-14",
  nationality: "Bangladeshi",
  maritalStatus: "Single / Unmarried",
  heightNote: "",
  bloodGroupNote: "",
  photo: "/portrait.jpg",
  photoAlt:
    "Portrait photograph of Md Mayeed Khan Shuvon, LL.B (Honours) graduate and IELTS preparation specialist from Sylhet, Bangladesh",
} as const;

export const CONTACT = {
  telephone: "+8801825723887",
  telephoneDisplay: "+880 1825-723887",
  telephoneLocal: "01825723887",
  email: "shuvonkhan8947@gmail.com",
  website: SITE.origin,
  presentAddress: {
    label: "Present Address",
    street: "Zindabazar",
    locality: "Sylhet",
    region: "Sylhet Division",
    postalCode: "3100",
    country: "Bangladesh",
    countryCode: "BD",
    full: "Zindabazar, Sylhet, Sylhet Division 3100, Bangladesh",
  },
  permanentAddress: {
    label: "Permanent Address",
    street: "Uttor Chatol Gaon",
    locality: "Kulaura",
    region: "Moulvibazar, Sylhet Division",
    postalCode: "3230",
    country: "Bangladesh",
    countryCode: "BD",
    full: "Uttor Chatol Gaon, Kulaura, Moulvibazar, Sylhet Division 3230, Bangladesh",
  },
  hours: "Sunday – Thursday, 10:00 – 19:00 (Bangladesh Standard Time, UTC+6)",
  languagesSpoken: "Bangla, English, Hindi",
} as const;

export type EducationEntry = {
  id: string;
  level: string;
  programme: string;
  institution: string;
  location: string;
  field: string;
  summary: string;
  highlights: string[];
};

export const EDUCATION: EducationEntry[] = [
  {
    id: "llb-honours",
    level: "University",
    programme: "LL.B (Honours)",
    institution: "North East University Bangladesh",
    location: "Sylhet, Bangladesh",
    field: "Law & Legal Studies",
    summary:
      "Four-year Bachelor of Laws (Honours) programme covering the constitutional, civil, criminal and procedural foundations of the Bangladeshi and common-law systems, taught and examined entirely in English.",
    highlights: [
      "Core modules in Constitutional Law, Law of Contract, Law of Torts, Criminal Law, Family Law and Land Law.",
      "Procedural training in the Code of Civil Procedure and the Code of Criminal Procedure, including drafting of plaints, written statements and petitions.",
      "Continuous assessment through moot-style argument, case-brief writing and statute interpretation exercises.",
      "Sustained academic reading in English, which built the analytical reading speed later applied to IELTS preparation work.",
    ],
  },
  {
    id: "hsc",
    level: "Higher Secondary Certificate (HSC)",
    programme: "Higher Secondary Certificate (HSC)",
    institution: "Kulaura Govt. College",
    location: "Kulaura, Moulvibazar, Bangladesh",
    field: "Higher Secondary — Science / Humanities stream",
    summary:
      "Completed the Higher Secondary Certificate at one of the leading government colleges in the Kulaura upazila of Moulvibazar district, preparing the academic foundation for university-level legal study.",
    highlights: [
      "Two-year intermediate programme with formal examinations in English, Bangla and elective subjects.",
      "Developed structured note-taking, timed examination writing and independent study habits.",
      "Active in classroom presentation work, which strengthened spoken English confidence.",
    ],
  },
  {
    id: "ssc",
    level: "Secondary School Certificate (SSC)",
    programme: "Secondary School Certificate (SSC)",
    institution: "Nabin Chandra Govt. Model High School",
    location: "Kulaura, Moulvibazar, Bangladesh",
    field: "Secondary Education",
    summary:
      "Completed secondary education at Nabin Chandra Govt. Model High School, a historic government institution in Kulaura, where foundational English grammar and composition skills were established.",
    highlights: [
      "Ten-year foundation in Bangla, English, mathematics and general science.",
      "Early interest in debate, reading and translation between Bangla and English.",
      "Built the grammatical accuracy that underpins all later language work.",
    ],
  },
];

export type SkillGroup = {
  id: string;
  title: string;
  level: string;
  summary: string;
  items: { name: string; detail: string }[];
};

export const SKILLS: SkillGroup[] = [
  {
    id: "ielts-preparation",
    title: "IELTS Preparation & Academic English",
    level: "Primary specialisation",
    summary:
      "Structured, band-descriptor-driven coaching across all four IELTS modules — Listening, Reading, Writing and Speaking — with an emphasis on measurable score improvement rather than general conversation practice.",
    items: [
      {
        name: "Listening (Academic & General Training)",
        detail:
          "Section-by-section strategy for form, note, table, map and multiple-matching tasks; accent tolerance training across British, Australian, North American and South Asian varieties; paraphrase-spotting and distractor management.",
      },
      {
        name: "Reading (Academic & General Training)",
        detail:
          "Skimming and scanning discipline, True/False/Not Given and Yes/No/Not Given logic, heading-matching, summary completion and diagram labelling, all trained against real time limits.",
      },
      {
        name: "Writing Task 1 (Report)",
        detail:
          "Data description of line graphs, bar charts, pie charts, tables, maps and process diagrams; overview sentences, trend vocabulary, comparison structures and cohesive paragraphing.",
      },
      {
        name: "Writing Task 2 (Essay)",
        detail:
          "Opinion, discussion, problem–solution, advantage–disadvantage and two-part questions; thesis-led planning, topic sentences, exemplification, concession and counter-argument, plus grammatical range control.",
      },
      {
        name: "Speaking",
        detail:
          "Part 1 fluency warm-ups, Part 2 cue-card note-planning in one minute, Part 3 abstract discussion strategies; pronunciation clarity, stress and intonation, idiomatic but accurate lexical choice.",
      },
      {
        name: "Band descriptor analysis",
        detail:
          "Every piece of learner writing is marked against the official Task Achievement, Coherence & Cohesion, Lexical Resource and Grammatical Range & Accuracy criteria so that feedback is diagnostic rather than general.",
      },
    ],
  },
  {
    id: "legal-academic",
    title: "Legal & Academic Competencies",
    level: "LL.B (Honours) trained",
    summary:
      "Discipline, precision and documentation skills developed through a full four-year law honours degree and applied to every professional task.",
    items: [
      {
        name: "Legal research & statute reading",
        detail:
          "Close reading of statutes, sections, provisos and schedules; locating and citing primary and secondary authority; briefing reported judgments into facts, issue, holding and ratio.",
      },
      {
        name: "Legal drafting & documentation",
        detail:
          "Structured drafting of notices, applications, agreements and case notes with attention to defined terms, sequencing and internal consistency — transferable directly to clinical and regulatory documentation.",
      },
      {
        name: "Analytical & critical reasoning",
        detail:
          "Issue spotting, ratio extraction, distinguishing precedent and constructing balanced written arguments under examination conditions.",
      },
      {
        name: "Regulatory & compliance literacy",
        detail:
          "Working understanding of how statutory frameworks, consent requirements and record-keeping duties operate in regulated professional settings, including health-adjacent contexts.",
      },
    ],
  },
  {
    id: "communication",
    title: "Communication & Professional Skills",
    level: "Applied daily",
    summary:
      "Multilingual communication and calm, structured interpersonal handling built through tutoring, group study and college presentation work.",
    items: [
      {
        name: "Multilingual mediation",
        detail:
          "Fluent switching between Bangla, English and Hindi, including on-the-spot explanation of technical ideas in two languages for learners of different first languages.",
      },
      {
        name: "Active listening & clarification",
        detail:
          "Confirming understanding before responding, restating a learner's or interlocutor's point accurately, and asking precise follow-up questions to close information gaps.",
      },
      {
        name: "Empathetic feedback delivery",
        detail:
          "Correcting written and spoken error without discouraging the learner: prioritising the two or three corrections that will raise a band score, and recording the rest for later cycles.",
      },
      {
        name: "Time-boxed task management",
        detail:
          "Planning multi-week preparation schedules, tracking learner progress against targets, and holding strictly to timed mock-test conditions.",
      },
    ],
  },
  {
    id: "digital-operational",
    title: "Digital & Operational Skills",
    level: "Working proficiency",
    summary:
      "Practical day-to-day tooling that keeps correspondence, records and reporting reliable.",
    items: [
      {
        name: "Document production",
        detail:
          "Microsoft Word and Google Docs for formatted reports, tables of contents, headers, footers and version-controlled drafts; spreadsheet use for tracking and simple analysis.",
      },
      {
        name: "Presentation & visual communication",
        detail:
          "Microsoft PowerPoint and Google Slides for clear lesson materials, slide decks and structured briefing presentations.",
      },
      {
        name: "Email & record discipline",
        detail:
          "Professional email register, subject-line clarity, prompt reply etiquette and consistent filing conventions for correspondence and student records.",
      },
      {
        name: "Online learning platforms",
        detail:
          "Comfortable operating in virtual classrooms, shared drives and messaging channels for scheduling, material distribution and feedback return.",
      },
    ],
  },
];

export type ExperienceEntry = {
  id: string;
  role: string;
  organisation: string;
  location: string;
  period: string;
  duration: string;
  type: string;
  summary: string;
  responsibilities: string[];
  outcomes: string[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "ielts-tutor",
    role: "IELTS Preparation Tutor & Language Support Assistant",
    organisation: "Private coaching practice (peer and learner-based tutoring)",
    location: "Sylhet, Bangladesh",
    period: "4 months",
    duration: "4 months of continuous, supervised preparation and tutoring work",
    type: "Professional training experience",
    summary:
      "Four months of hands-on IELTS preparation work: diagnosing learner weaknesses, planning module-specific schedules, running timed practice under real examination conditions and returning written feedback marked against official band descriptors.",
    responsibilities: [
      "Conducted diagnostic assessment of learners' current Listening, Reading, Writing and Speaking performance to establish a baseline band estimate.",
      "Prepared structured session plans and multi-week study calendars aligned to each learner's target band and test date.",
      "Marked Writing Task 1 and Task 2 responses against the four official assessment criteria and returned corrective feedback on lexis, cohesion and grammar.",
      "Ran timed Listening and Reading mocks, then walked learners through every incorrect answer to identify whether the cause was vocabulary, pacing or trap-question logic.",
      "Conducted one-to-one Speaking interviews in exam format, using recorded playback to correct pronunciation, stress and hesitation patterns.",
      "Explained academic vocabulary, collocation and register to learners whose first language is Bangla, frequently mediating in Hindi for multilingual groups.",
      "Maintained learner progress records, attendance notes and mock-test logs to evidence improvement over the preparation cycle.",
    ],
    outcomes: [
      "Built a reusable library of module-specific strategy notes, model answers and timed practice sets.",
      "Developed the ability to give precise, evidence-based written feedback quickly and consistently.",
      "Strengthened personal command of academic English under pressure, since every explanation had to be immediate and accurate.",
      "Learned to manage a schedule of concurrent learners with different test dates and different weaknesses without losing quality of feedback.",
    ],
  },
];

export type ReferenceEntry = {
  id: string;
  name: string;
  affiliation: string;
  location: string;
  relationship: string;
  note: string;
};

export const REFERENCES: ReferenceEntry[] = [
  {
    id: "rizwan-rahim-chowdhury",
    name: "Rizwan Rahim Chowdhury",
    affiliation: "Hexas",
    location: "Sylhet, Bangladesh",
    relationship: "Professional reference",
    note: "Professional reference for academic discipline, reliability and language proficiency. Contact details are provided on request with prior consent, in line with professional courtesy norms.",
  },
];

export const LANGUAGES = [
  {
    name: "Bangla (Bengali)",
    level: "Native / first language",
    iso: "bn",
    detail:
      "Native fluency in speech and writing, including formal register for academic and administrative correspondence.",
  },
  {
    name: "English",
    level: "Professional working proficiency",
    iso: "en",
    detail:
      "Used daily for legal study, IELTS instruction, written feedback and formal correspondence. Strong academic reading and writing accuracy, with continued focus on formal written fluency.",
  },
  {
    name: "Hindi",
    level: "Conversational proficiency",
    iso: "hi",
    detail:
      "Comfortable conversational fluency, including in multilingual teaching environments and spoken explanation of everyday and instructional content.",
  },
];

/** Short, quotable one-liners used in answer boxes and LLM summaries. */
export const KEY_FACTS: { label: string; value: string }[] = [
  { label: "Full name", value: "Md Mayeed Khan Shuvon" },
  { label: "Profession", value: "LL.B (Honours) graduate; IELTS preparation specialist" },
  { label: "Location", value: "Zindabazar, Sylhet, Bangladesh" },
  { label: "Nationality", value: "Bangladeshi" },
  { label: "Date of birth", value: "14 September 2002" },
  { label: "Marital status", value: "Single / unmarried" },
  { label: "Languages", value: "Bangla, English, Hindi" },
  { label: "Education", value: "LL.B (Honours), North East University Bangladesh" },
  { label: "Experience", value: "4 months of IELTS preparation tutoring" },
  { label: "Phone", value: "+880 1825-723887" },
  { label: "Email", value: "shuvonkhan8947@gmail.com" },
  { label: "Reference", value: "Rizwan Rahim Chowdhury, Hexas, Sylhet" },
];
