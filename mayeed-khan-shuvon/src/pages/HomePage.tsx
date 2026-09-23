import { Hero } from "../components/Hero";
import { KeyFacts } from "../components/KeyFacts";
import { Section, Prose, AnswerBox, Callout } from "../components/Section";
import { EducationList } from "../components/EducationList";
import { SkillsBlock, SkillTags } from "../components/SkillsBlock";
import { ExperienceBlock } from "../components/ExperienceBlock";
import { LanguageTable, PersonalParticulars, ReferenceCard } from "../components/FactsTables";
import { FaqBlock } from "../components/FaqBlock";
import { ContactBlock } from "../components/ContactBlock";
import { Gallery } from "../components/Gallery";
import { GALLERY, GALLERY_COUNT, SECONDARY_PHOTOS } from "../content/gallery";
import { Link } from "../lib/nav";
import {
  CAREER_OBJECTIVE,
  EDUCATION_INTRO,
  EDUCATION_OUTRO,
  EXPERIENCE_INTRO,
  EXPERIENCE_OUTRO,
  IELTS_DEEP_DIVE,
  LANGUAGES_INTRO,
  PERSONAL_INTRO,
  PROFESSIONAL_SUMMARY,
  REFERENCES_INTRO,
  SKILLS_INTRO,
  WORKING_PRINCIPLES,
  PROFESSIONAL_INTERESTS,
  CLOSING_STATEMENT,
} from "../content/narrative";
import { PERSON } from "../content/profile";

export function HomePage() {
  return (
    <>
      <Hero />
      <KeyFacts />

      <Section
        id="profile"
        eyebrow="01 · Professional summary"
        title={`Who ${PERSON.fullName} is`}
        lead="An LL.B (Honours) graduate and IELTS preparation specialist, working in three languages from Sylhet, Bangladesh."
        variant="tinted"
      >
        <AnswerBox
          question="Who is Md Mayeed Khan Shuvon?"
          answer="Md Mayeed Khan Shuvon is an LL.B (Honours) graduate of North East University Bangladesh and an IELTS preparation specialist based in Zindabazar, Sylhet. He teaches Listening, Reading, Writing and Speaking strategy, marks written work against the official band descriptors, and works in Bangla, English and Hindi."
          meta={[
            { label: "Profession", value: PERSON.jobTitle },
            { label: "Education", value: "LL.B (Honours), North East University Bangladesh" },
            { label: "Experience", value: "4 months of IELTS preparation tutoring" },
            { label: "Location", value: "Zindabazar, Sylhet, Bangladesh" },
          ]}
        />
        <div className="summary-columns">
          {PROFESSIONAL_SUMMARY.map((block) => (
            <article className="summary-block" key={block.heading} id={block.heading === "Who Md Mayeed Khan Shuvon is" ? "professional-summary" : undefined}>
              <h3 className="summary-block__title">{block.heading}</h3>
              <Prose paragraphs={block.body} />
            </article>
          ))}
        </div>
      </Section>


      {GALLERY_COUNT > 0 && (
        <Section
          id="photographs"
          eyebrow="02 · Photographs"
          title="Photographs"
          lead={`${GALLERY_COUNT} published photograph${GALLERY_COUNT === 1 ? "" : "s"}, each with a caption and a written description.`}
        >
          <Gallery photos={SECONDARY_PHOTOS.length > 0 ? SECONDARY_PHOTOS : GALLERY} />
          <p className="section__more">
            <Link to="/gallery/">See all photographs and how they may be used →</Link>
          </p>
        </Section>
      )}

      <Section
        id="objective"
        eyebrow="03 · Career objective"
        title="Career objective"
        lead="The single sentence that organises everything else on this page."
      >
        <blockquote className="objective">
          <p className="objective__quote">“{CAREER_OBJECTIVE.statement}”</p>
          <footer className="objective__footer">— {PERSON.fullName}, career objective</footer>
        </blockquote>
        <Prose paragraphs={CAREER_OBJECTIVE.expansion} />
        <Callout title="What that means in practice">
          <p>
            He is available for full-time roles, structured traineeships and collaborative projects in
            Sylhet and beyond — including remote and hybrid arrangements — in legal support, academic
            administration, English language instruction and documentation-focused positions.
          </p>
        </Callout>
      </Section>

      <Section
        id="education"
        eyebrow="04 · Education"
        title="Educational qualification"
        lead="SSC at Nabin Chandra Govt. Model High School, HSC at Kulaura Govt. College, and LL.B (Honours) at North East University Bangladesh."
        variant="tinted"
      >
        <EducationList intro={EDUCATION_INTRO} outro={EDUCATION_OUTRO} />
      </Section>

      <Section
        id="skills"
        eyebrow="05 · Skills"
        title="Skills and competencies"
        lead="IELTS preparation and academic English as the primary specialisation, supported by legal, communication and digital competencies."
      >
        <Prose paragraphs={SKILLS_INTRO} />
        <SkillsBlock
          includeDeepDive={
            <article className="deep-dive" id="ielts-method" aria-labelledby="ielts-method-title">
              <h3 className="deep-dive__title" id="ielts-method-title">
                {IELTS_DEEP_DIVE.title}
              </h3>
              <Prose paragraphs={IELTS_DEEP_DIVE.paragraphs} />
              <p className="deep-dive__closing">{IELTS_DEEP_DIVE.closing}</p>
            </article>
          }
        />
        <h3 className="subhead">Full skill index</h3>
        <SkillTags />
      </Section>

      <Section
        id="experience"
        eyebrow="06 · Experience"
        title="Professional experience"
        lead="Four months of continuous IELTS preparation tutoring in Sylhet, presented with its method and its evidence."
        variant="tinted"
      >
        <Prose paragraphs={EXPERIENCE_INTRO} />
        <ExperienceBlock />
        <Prose paragraphs={EXPERIENCE_OUTRO} className="prose--outro" />
      </Section>

      <Section
        id="languages"
        eyebrow="07 · Languages"
        title="Languages"
        lead="Bangla, English and Hindi — used as operational tools, not merely listed as attributes."
      >
        <Prose paragraphs={LANGUAGES_INTRO} />
        <LanguageTable />
      </Section>

      <Section
        id="principles"
        eyebrow="08 · Working principles"
        title="Working principles"
        lead="Six commitments that describe how he works, drawn from legal training and applied to language instruction."
        variant="tinted"
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
        id="interests"
        eyebrow="09 · Professional interests"
        title="Professional interests and direction"
        lead="Where his existing skills are being pointed next."
      >
        <div className="interests">
          {PROFESSIONAL_INTERESTS.map((interest) => (
            <article className="interests__item" key={interest.title}>
              <h3 className="interests__title">{interest.title}</h3>
              <p className="interests__body">{interest.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="personal"
        eyebrow="10 · Personal particulars"
        title="Personal particulars"
        lead="Published openly and accurately so that employers, universities and verification bodies can reconcile them consistently."
        variant="tinted"
      >
        <Prose paragraphs={PERSONAL_INTRO} />
        <PersonalParticulars />
      </Section>

      <Section
        id="references"
        eyebrow="11 · References"
        title="Professional reference"
        lead="A named referee who can speak to academic discipline, reliability and language proficiency."
      >
        <Prose paragraphs={REFERENCES_INTRO} />
        <ReferenceCard />
      </Section>

      <Section
        id="faq"
        eyebrow="12 · Frequently asked questions"
        title="Questions people ask about Md Mayeed Khan Shuvon"
        lead="Short, direct answers — each one written to be quotable on its own."
        variant="tinted"
      >
        <FaqBlock />
      </Section>

      <Section
        id="contact"
        eyebrow="13 · Contact"
        title="Contact Md Mayeed Khan Shuvon"
        lead="Telephone, WhatsApp and email — with the address, hours and documents available on request."
      >
        <ContactBlock />
      </Section>

      <Section
        id="closing"
        eyebrow="14 · About this profile"
        title="Accuracy, structure and the canonical record"
        lead="Why this page exists in this form."
        variant="rule"
      >
        <Prose paragraphs={CLOSING_STATEMENT} />
      </Section>
    </>
  );
}
