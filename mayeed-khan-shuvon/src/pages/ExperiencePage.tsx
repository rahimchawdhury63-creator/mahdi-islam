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
        lead="Four months of professional IELTS preparation experience in Sylhet, documented responsibility by responsibility, together with the professional reference who can attest to it."
        answer={{
          question: "How much professional experience does Md Mayeed Khan Shuvon have?",
          answer:
            "Md Mayeed Khan Shuvon has four months of professional IELTS preparation experience, carried out in Sylhet. In that period he conducted diagnostic assessments, built multi-week study plans, ran timed Listening and Reading mocks with full error analysis, marked Writing against the official band descriptors, conducted one-to-one Speaking interviews and maintained learner progress records.",
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
        title="What four months of tutoring transfers into"
        variant="tinted"
      >
        <div className="table-wrap">
          <table className="table">
            <caption className="table__caption">
              Capabilities evidenced during IELTS preparation work and where they transfer
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
                <th scope="row">Diagnostic assessment</th>
                <td>Baseline band estimation from timed samples</td>
                <td>Case intake, candidate screening, needs analysis, audit preparation.</td>
              </tr>
              <tr>
                <th scope="row">Precise written feedback</th>
                <td>Band-descriptor-marked Writing scripts returned with demonstrated corrections</td>
                <td>Clinical documentation, regulatory correspondence, editorial review.</td>
              </tr>
              <tr>
                <th scope="row">Regime under fixed deadlines</th>
                <td>Multiple concurrent learners with immovable test dates</td>
                <td>Filing deadlines, examination cycles, regulated reporting schedules.</td>
              </tr>
              <tr>
                <th scope="row">Confidential record-keeping</th>
                <td>Learner progress logs held and released only with permission</td>
                <td>Patient records, personnel files, consent-governed data handling.</td>
              </tr>
              <tr>
                <th scope="row">Explaining complexity simply</th>
                <td>Teaching essay architecture and reading logic to non-specialists</td>
                <td>Patient communication, client briefings, staff induction and training.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <AnswerBox
          question="Is four months of experience enough to be considered competent?"
          answer="It is enough to evidence a working method, to be tested against real learners with real examination dates, and to produce documented outcomes. It is not senior-level experience and is not presented as such. What the four months demonstrate is reliability under a schedule, accurate written output and a structured approach to measurable improvement."
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
