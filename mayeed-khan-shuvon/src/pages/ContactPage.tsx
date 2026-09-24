import { PageHeader } from "../components/PageHeader";
import { Section, Prose, AnswerBox } from "../components/Section";
import { ContactBlock } from "../components/ContactBlock";
import { PersonalParticulars, LanguageTable, ReferenceCard } from "../components/FactsTables";
import { Link } from "../lib/nav";
import { PERSONAL_INTRO, REFERENCES_INTRO, LANGUAGES_INTRO } from "../content/narrative";

export function ContactPage() {
  return (
    <>
      <PageHeader
        routeKey="contact"
        lead="Contact details for Md Mayeed Khan Shuvon: telephone and WhatsApp +880 1825-723887, email shuvonkhan8947@gmail.com, present address Zindabazar, Sylhet, and permanent address Uttor Chatol Gaon, Kulaura, Moulvibazar."
        answer={{
          question: "How do I contact Md Mayeed Khan Shuvon?",
          answer:
            "Call or message +880 1825-723887 (Bangladesh), or email shuvonkhan8947@gmail.com. He is based at Zindabazar, Sylhet, Sylhet Division, Bangladesh, and his published availability is Sunday to Thursday, 10:00 to 19:00 Bangladesh Standard Time. Replies are normally returned within one to two business days.",
        }}
      />

      <Section id="contact" eyebrow="01 · Contact" title="How to reach him">
        <ContactBlock />
      </Section>

      <Section
        id="enquiry"
        eyebrow="02 · Making an enquiry"
        title="What to include in your message"
        variant="tinted"
      >
        <Prose
          paragraphs={[
            "Employers, recruitment agencies, universities and examination centres are asked to include the role, project or requirement, the organisation name, any deadline that applies, and the best times to call. Students and study partners are asked to state the programme, module or arrangement they are working towards, any relevant dates, and their preferred times to be reached.",
            "Enquiries are answered in the order received. Anything requiring a formal document — a curriculum vitae, a certificate copy, or a work sample — should be sent by email so that the request and the response are both recorded in writing.",
          ]}
        />
        <AnswerBox
          question="Is Md Mayeed Khan Shuvon available for remote or online work?"
          answer="Yes. He is available for remote, hybrid and on-site engagements. Study support, peer practice and documentation work are all deliverable online without any reduction in scope, since timed practice, marked written feedback and structured oral exchange all work in a virtual format."
        />
      </Section>

      <Section
        id="particulars"
        eyebrow="03 · Verified particulars"
        title="Personal particulars for verification"
      >
        <Prose paragraphs={PERSONAL_INTRO} />
        <PersonalParticulars />
      </Section>

      <Section id="languages" eyebrow="04 · Languages" title="Languages for correspondence" variant="tinted">
        <Prose paragraphs={LANGUAGES_INTRO} />
        <LanguageTable />
      </Section>

      <Section id="references" eyebrow="05 · References" title="Professional reference">
        <Prose paragraphs={REFERENCES_INTRO} />
        <ReferenceCard />
        <p className="section__more">
          <Link to="/">Return to the full professional profile →</Link>
        </p>
      </Section>
    </>
  );
}
