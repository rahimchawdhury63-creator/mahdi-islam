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
  lastReviewed: "2026-09-24",
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
  jobTitle: "First-Year LL.B (Honours) Student, North East University Bangladesh",
  shortBio:
    "Md Mayeed Khan Shuvon is a first-year, first-semester LL.B (Honours) student at North East University Bangladesh, with a self-declared IELTS preparation skill and four months of practical experience as a student at Hexas (Hexa's), Sylhet. Based in Zindabazar, Sylhet, he works fluently in Bangla, English and Hindi.",
  dateOfBirth: "2002-09-14",
  nationality: "Bangladeshi",
  maritalStatus: "Single / Unmarried",
  heightNote: "",
  bloodGroupNote: "",
  photo: "/portrait.jpg",
  photoAlt:
    "Portrait photograph of Md Mayeed Khan Shuvon, a first-year LL.B (Honours) student at North East University Bangladesh, in Sylhet, Bangladesh",
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
  /**
   * "completed" drives `alumniOf` / `hasCredential` edges in the Knowledge
   * Graph; "in-progress" must never be emitted as a credential held.
   */
  status: "completed" | "in-progress";
  /** Human-readable status line, e.g. "In progress — first year, first semester". */
  statusDisplay: string;
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
    status: "in-progress",
    statusDisplay: "In progress — first year, first semester",
    summary:
      "Four-year Bachelor of Laws (Honours) programme at North East University Bangladesh covering the constitutional, civil, criminal and procedural foundations of the Bangladeshi and common-law systems. He is currently in first year, first semester of the programme, which is taught, examined and assessed entirely in English.",
    highlights: [
      "First year, first semester of the four-year honours programme, with the full degree in progress at North East University Bangladesh, Sylhet.",
      "English-medium study from the first semester: statutes, cases and course material read, drafted and examined in English.",
      "Formal examination culture: structured written answers, statute reading and timed assessment conditions.",
      "Sustained academic reading in English, which is building the analytical reading speed applied to IELTS preparation work.",
    ],
  },
  {
    id: "hsc",
    level: "Higher Secondary Certificate (HSC)",
    programme: "Higher Secondary Certificate (HSC)",
    institution: "Kulaura Govt. College",
    location: "Kulaura, Moulvibazar, Bangladesh",
    field: "Higher Secondary — Science / Humanities stream",
    status: "completed",
    statusDisplay: "Completed",
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
    status: "completed",
    statusDisplay: "Completed",
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
    level: "Primary skill — self-declared",
    summary:
      "Structured, band-descriptor-driven preparation across all four IELTS modules — Listening, Reading, Writing and Speaking — with an emphasis on measurable score improvement rather than general conversation practice. The skill is self-declared on his curriculum vitae and was developed during his four months at Hexas (Hexa's), Sylhet, an institute whose course line includes a full IELTS range.",
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
          "Every piece of written work is reviewed against the official Task Achievement, Coherence & Cohesion, Lexical Resource and Grammatical Range & Accuracy criteria so that feedback is diagnostic rather than general.",
      },
    ],
  },
  {
    id: "legal-academic",
    title: "Legal & Academic Competencies",
    level: "In development — first-year LL.B (Honours)",
    summary:
      "Discipline, precision and documentation skills, currently being built through first-year LL.B (Honours) study at North East University Bangladesh, with the remaining three years of the honours programme ahead.",
    items: [
      {
        name: "Legal research & statute reading",
        detail:
          "Close reading of statutes, sections, provisos and schedules; locating and citing primary and secondary authority; briefing judgments into facts, issue, holding and ratio — foundations being built through first-year legal study.",
      },
      {
        name: "Legal drafting & documentation",
        detail:
          "Structured drafting of notices, applications, agreements and case notes with attention to defined terms, sequencing and internal consistency — transferable directly to clinical and regulatory documentation once the degree is complete.",
      },
      {
        name: "Analytical & critical reasoning",
        detail:
          "Issue spotting, ratio extraction, distinguishing precedent and constructing balanced written arguments under examination conditions — an ongoing first-year development.",
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
      "Multilingual communication and calm, structured interpersonal handling built through group study, institute coursework and college presentation work.",
    items: [
      {
        name: "Multilingual mediation",
        detail:
          "Fluent switching between Bangla, English and Hindi, including on-the-spot explanation of technical ideas in two languages for audiences of different first languages.",
      },
      {
        name: "Active listening & clarification",
        detail:
          "Confirming understanding before responding, restating an interlocutor's point accurately, and asking precise follow-up questions to close information gaps.",
      },
      {
        name: "Empathetic feedback delivery",
        detail:
          "Correcting written and spoken error without discouraging the recipient: prioritising the two or three corrections that will raise a band score, and recording the rest for later cycles.",
      },
      {
        name: "Time-boxed task management",
        detail:
          "Planning multi-week preparation schedules, tracking progress against targets, and holding strictly to timed mock-test conditions.",
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
    id: "hexas-sylhet",
    role: "Student",
    organisation: "Hexas (Hexa's)",
    location: "Sylhet, Bangladesh",
    period: "4 months",
    duration: "4 months as a student at Hexas (Hexa's)",
    type: "Student programme — the four months recorded on his CV",
    summary:
      "Four months as a student at Hexas (Hexa's) in Sylhet — an ICT and English language training institute whose course line includes IELTS, Spoken English and computer-based programmes. This is the four-month experience recorded on his curriculum vitae, and it is the period for which his professional reference, Rizwan Rahim Chowdhury (a digital content creator at the institute), can attest.",
    responsibilities: [
      "Studied as a student at Hexas (Hexa's) in Sylhet, following the institute's structured, batch-timed programme of scheduled classes and regular assessment.",
      "Practised academic English continuously across listening, reading, writing and speaking in a dedicated language-training environment.",
      "Used the institute's ICT-supported facilities, alongside the computer-based courses it runs, for study and digital work.",
      "Kept to a fixed schedule of attendance, submissions and assessment over the full four-month period.",
      "Worked within the environment of the institute's professional content team, including its digital content creator — his named reference — who can attest to his discipline and reliability.",
    ],
    outcomes: [
      "The four months of practical experience recorded on his CV, attested by the named professional reference.",
      "A self-declared IELTS preparation skill, developed in a professional IELTS-training environment.",
      "Sustained practice of academic English under examination-focused conditions across all four modules.",
      "Exposure to a professional digital content production operation alongside the institute's content team.",
      "The discipline of a fixed schedule: punctuality, attendance and work completed to deadlines.",
    ],
  },
];

export type ReferenceEntry = {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  location: string;
  relationship: string;
  note: string;
};

export const REFERENCES: ReferenceEntry[] = [
  {
    id: "rizwan-rahim-chowdhury",
    name: "Rizwan Rahim Chowdhury",
    role: "Digital content creator",
    affiliation: "Hexas (Hexa's)",
    location: "Sylhet, Bangladesh",
    relationship: "Professional reference — his four-month student period at Hexas (Hexa's)",
    note: "Professional reference for his four-month student period at Hexas (Hexa's) in Sylhet, where he can speak to his academic discipline, reliability and language proficiency. Contact details are provided on request with prior consent, in line with professional courtesy norms.",
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
      "Used daily for legal study, IELTS preparation, written feedback and formal correspondence. Strong academic reading and writing accuracy, with continued focus on formal written fluency.",
  },
  {
    name: "Hindi",
    level: "Conversational proficiency",
    iso: "hi",
    detail:
      "Comfortable conversational fluency, including in multilingual study environments and spoken explanation of everyday and instructional content.",
  },
];

/** Short, quotable one-liners used in answer boxes and LLM summaries. */
export const KEY_FACTS: { label: string; value: string }[] = [
  { label: "Full name", value: "Md Mayeed Khan Shuvon" },
  { label: "Profession", value: "First-year LL.B (Honours) student (North East University Bangladesh); IELTS preparation skill" },
  { label: "Location", value: "Zindabazar, Sylhet, Bangladesh" },
  { label: "Nationality", value: "Bangladeshi" },
  { label: "Date of birth", value: "14 September 2002" },
  { label: "Marital status", value: "Single / unmarried" },
  { label: "Languages", value: "Bangla, English, Hindi" },
  { label: "Education", value: "LL.B (Honours) — first year, first semester (in progress), North East University Bangladesh" },
  { label: "Experience", value: "4 months as a student at Hexas (Hexa's), Sylhet" },
  { label: "Phone", value: "+880 1825-723887" },
  { label: "Email", value: "shuvonkhan8947@gmail.com" },
  { label: "Reference", value: "Rizwan Rahim Chowdhury — digital content creator, Hexas (Hexa's), Sylhet" },
];
