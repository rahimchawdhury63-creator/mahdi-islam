import { PageHeader } from "../components/PageHeader";
import { Section, Prose, AnswerBox } from "../components/Section";
import { ExperienceBlock } from "../components/ExperienceBlock";
import { ReferenceCard } from "../components/FactsTables";
import { Link } from "../lib/nav";
import { EXPERIENCE_INTRO, EXPERIENCE_OUTRO, REFERENCES_INTRO } from "../content/narrative";

export function ExperiencePage() {
  return (
    <>
      <PageHeader
        routeKey="experience"
        lead="Four months of experience as a student at Hexas (Hexa's), Sylhet — an ICT and English language training institute — documented with its context, and with the professional reference who can attest to the period."
        answer={{
          question: "How much professional experience does Md Mayeed Khan Shuvon have?",
          answer:
            "Md Mayeed Khan Shuvon has four months of professional experience, carried out as a student at Hexas (Hexa's) in Sylhet, an ICT and English language training institute. That period — the four months recorded on his CV — is where his self-declared IELTS preparation skill was developed and practised. His professional reference for the period is Rizwan Rahim Chowdhury, a digital content creator at the institute.",
        }}
      />

      <Section
        id="record"
        eyebrow="01 · Experience record"
        title="Professional experience in detail"
      >
        <Prose paragraphs={EXPERIENCE_INTRO} />
        <ExperienceBlock />
        <Prose paragraphs={EXPERIENCE_OUTRO} className="prose--outro" />
      </Section>

      <Section
        id="transferable"
        eyebrow="02 · Transferable capability"
        title="What four months at Hexas (Hexa's) transfers into"
        variant="tinted"
      >
        <div className="table-wrap">
          <table className="table">
            <caption className="table__caption">
              Capabilities evidenced during the four-month student period at Hexas (Hexa's), Sylhet, and where they transfer
            </caption>
            <thead>
              <tr>
                <th scope="col">Capability</th>
                <th scope="col">Evidenced by</th>
                <th scope="col">Transfers to</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Sustained academic English practice</th>
                <td>Daily listening, reading, writing and speaking work in an examination-focused institute</td>
                <td>Legal study in English, IELTS preparation, academic correspondence.</td>
              </tr>
              <tr>
                <th scope="row">Regime under a fixed schedule</th>
                <td>Timetabled classes, regular attendance and assessment over four months</td>
                <td>Filing deadlines, examination cycles, regulated reporting schedules.</td>
              </tr>
              <tr>
                <th scope="row">Digital and ICT working environment</th>
                <td>ICT-supported study at an institute that also runs computer-based courses</td>
                <td>Office software work, online platforms, remote working arrangements.</td>
              </tr>
              <tr>
                <th scope="row">Professional team exposure</th>
                <td>Working alongside the institute's content team, including his reference, a digital content creator</td>
                <td>Client briefings, editorial review, content production support.</td>
              </tr>
              <tr>
                <th scope="row">Confident multilingual communication</th>
                <td>Practice across Bangla, English and Hindi in a multilingual setting</td>
                <td>Client and staff communication, bilingual documentation, interpretation support.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <AnswerBox
          question="Is four months of experience enough to be considered competent?"
          answer="It is enough to evidence reliability under a schedule, consistent attendance and a structured approach to an examination-focused environment. It is not senior-level experience and is not presented as such. His four months are stated exactly as supplied — four months, as a student at Hexas (Hexa's), attested by a named professional reference."
        />
      </Section>

      <Section id="references" eyebrow="03 · Reference" title="Professional reference">
        <Prose paragraphs={REFERENCES_INTRO} />
        <ReferenceCard />
        <p className="section__more">
          <Link to="/skills/">Review the underlying skill set →</Link>
        </p>
      </Section>
    </>
  );
}
