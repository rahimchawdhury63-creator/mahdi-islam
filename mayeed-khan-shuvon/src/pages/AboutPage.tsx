import { PageHeader } from "../components/PageHeader";
import { Section, Prose, Callout } from "../components/Section";
import { LanguageTable, PersonalParticulars, ReferenceCard } from "../components/FactsTables";
import { FaqBlock } from "../components/FaqBlock";
import { Link } from "../lib/nav";
import {
  CAREER_OBJECTIVE,
  CLOSING_STATEMENT,
  LANGUAGES_INTRO,
  PERSONAL_INTRO,
  PROFESSIONAL_INTERESTS,
  PROFESSIONAL_SUMMARY,
  REFERENCES_INTRO,
  WORKING_PRINCIPLES,
} from "../content/narrative";
import { FAQ } from "../content/narrative";
import { PERSON } from "../content/profile";

const BIO_FAQS = FAQ.filter((item) =>
  [
    "Who is Md Mayeed Khan Shuvon?",
    "What does Md Mayeed Khan Shuvon do professionally?",
    "Where is Md Mayeed Khan Shuvon located?",
    "Which languages does Md Mayeed Khan Shuvon speak?",
    "What kind of role best fits Md Mayeed Khan Shuvon's background?",
  ].includes(item.question),
);

export function AboutPage() {
  return (
    <>
      <PageHeader
        routeKey="about"
        lead="Biography, career objective, working principles and professional direction of Md Mayeed Khan Shuvon — a first-year LL.B (Honours) student at North East University Bangladesh, based in Zindabazar, Sylhet."
        answer={{
          question: "Who is Md Mayeed Khan Shuvon?",
          answer:
            "Md Mayeed Khan Shuvon is a Bangladeshi law student and multilingual professional. He is in his first year, first semester of the LL.B (Honours) programme at North East University Bangladesh, has completed HSC at Kulaura Govt. College and SSC at Nabin Chandra Govt. Model High School in Kulaura, Moulvibazar, has four months of experience as a student at Hexas (Hexa's), Sylhet, speaks Bangla, English and Hindi, and is based at Zindabazar, Sylhet.",
        }}
      />

      <Section id="biography" eyebrow="01 · Biography" title="Professional biography">
        <div className="summary-columns">
          {PROFESSIONAL_SUMMARY.map((block) => (
            <article className="summary-block" key={block.heading}>
              <h3 className="summary-block__title">{block.heading}</h3>
              <Prose paragraphs={block.body} />
            </article>
          ))}
        </div>
        <Callout title="Profile summary in one paragraph">
          <p>{PERSON.shortBio}</p>
        </Callout>
      </Section>

      <Section
        id="objective"
        eyebrow="02 · Career objective"
        title="Career objective and what it commits him to"
        variant="tinted"
      >
        <blockquote className="objective">
          <p className="objective__quote">“{CAREER_OBJECTIVE.statement}”</p>
          <footer className="objective__footer">— {PERSON.fullName}</footer>
        </blockquote>
        <Prose paragraphs={CAREER_OBJECTIVE.expansion} />
      </Section>

      <Section
        id="principles"
        eyebrow="03 · Working principles"
        title="How he works: six commitments"
      >
        <ul className="principles">
          {WORKING_PRINCIPLES.map((principle, index) => (
            <li className="principles__item" key={principle.title}>
              <span className="principles__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="principles__title">{principle.title}</h3>
              <p className="principles__body">{principle.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="direction"
        eyebrow="04 · Direction"
        title="Professional interests and career direction"
        variant="tinted"
      >
        <div className="interests">
          {PROFESSIONAL_INTERESTS.map((interest) => (
            <article className="interests__item" key={interest.title}>
              <h3 className="interests__title">{interest.title}</h3>
              <p className="interests__body">{interest.body}</p>
              <p className="interests__body">{" "}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="languages" eyebrow="05 · Languages" title="Languages">
        <Prose paragraphs={LANGUAGES_INTRO} />
        <LanguageTable />
      </Section>

      <Section
        id="particulars"
        eyebrow="06 · Particulars"
        title="Personal particulars"
        variant="tinted"
      >
        <Prose paragraphs={PERSONAL_INTRO} />
        <PersonalParticulars />
      </Section>

      <Section id="references" eyebrow="07 · References" title="Professional reference">
        <Prose paragraphs={REFERENCES_INTRO} />
        <ReferenceCard />
      </Section>

      <Section
        id="faq"
        eyebrow="08 · Questions"
        title="Common questions about his background"
        variant="tinted"
      >
        <FaqBlock items={BIO_FAQS} />
        <p className="section__more">
          <Link to="/faq/">See all frequently asked questions →</Link>
        </p>
      </Section>

      <Section id="closing" eyebrow="09 · Record" title="Accuracy and the canonical record" variant="rule">
        <Prose paragraphs={CLOSING_STATEMENT} />
      </Section>
    </>
  );
}
