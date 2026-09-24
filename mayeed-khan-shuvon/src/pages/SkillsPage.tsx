import { PageHeader } from "../components/PageHeader";
import { Section, Prose, AnswerBox, Callout } from "../components/Section";
import { SkillsBlock, SkillTags } from "../components/SkillsBlock";
import { Link } from "../lib/nav";
import { IELTS_DEEP_DIVE, SKILLS_INTRO } from "../content/narrative";

const LEVELS = [
  { band: "Primary specialisation", detail: "IELTS preparation and academic English instruction across all four modules." },
  { band: "Degree-trained", detail: "Legal research, statutory interpretation, case briefing, legal drafting and critical reasoning." },
  { band: "Applied daily", detail: "Multilingual communication, respectful feedback delivery and time-boxed task management." },
  { band: "Working proficiency", detail: "Document production, spreadsheets, presentation software, email and online learning platforms." },
];

export function SkillsPage() {
  return (
    <>
      <PageHeader
        routeKey="skills"
        lead="Complete skills inventory for Md Mayeed Khan Shuvon: IELTS preparation across Listening, Reading, Writing and Speaking, academic English instruction, legal research and drafting, multilingual communication, and standard digital and operational tooling."
        answer={{
          question: "What are Md Mayeed Khan Shuvon's key skills?",
          answer:
            "His primary skill is IELTS preparation and academic English instruction across Listening, Reading, Writing and Speaking, including band-descriptor-based marking of written work. He also holds legal competencies from an LL.B (Honours) degree — legal research, statutory interpretation, case briefing and drafting — plus multilingual communication in Bangla, English and Hindi, and working proficiency with standard office and online learning software.",
        }}
      />

      <Section
        id="overview"
        eyebrow="01 · Overview"
        title="Skill profile at a glance"
        lead="Four competency clusters, each traceable to a documented source."
      >
        <Prose paragraphs={SKILLS_INTRO} />
        <div className="table-wrap">
          <table className="table table--levels">
            <caption className="table__caption">
              Competency levels claimed by Md Mayeed Khan Shuvon, with the basis for each claim
            </caption>
            <thead>
              <tr>
                <th scope="col">Level</th>
                <th scope="col">Skills covered</th>
              </tr>
            </thead>
            <tbody>
              {LEVELS.map((level) => (
                <tr key={level.band}>
                  <th scope="row">
                    <span className="pill pill--accent">{level.band}</span>
                  </th>
                  <td>{level.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        id="clusters"
        eyebrow="02 · Competency clusters"
        title="Skills in detail"
        variant="tinted"
      >
        <SkillsBlock />
      </Section>

      <Section id="ielts-method" eyebrow="03 · IELTS method" title={IELTS_DEEP_DIVE.title}>
        <Prose paragraphs={IELTS_DEEP_DIVE.paragraphs} />
        <p className="deep-dive__closing">{IELTS_DEEP_DIVE.closing}</p>
        <AnswerBox
          question="How does Md Mayeed Khan Shuvon prepare candidates for IELTS Writing?"
          answer="He begins with a timed diagnostic sample, then marks every response against the four official criteria — Task Achievement or Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. Corrections are demonstrated in the text rather than merely flagged, and only two or three score-bearing changes are prioritised per draft, with lower-priority items logged for the next cycle."
          meta={[
            { label: "Modules covered", value: "Listening, Reading, Writing Task 1, Writing Task 2, Speaking" },
            { label: "Marking standard", value: "Official IELTS band descriptors" },
            { label: "Practice conditions", value: "Full exam timing, no pausing or dictionary use" },
          ]}
        />
        <Callout title="Sample materials available on request">
          <p>
            Specimen annotated Writing feedback, model Task 1 reports, model Task 2 essays and module
            strategy notes can be supplied to employers and partner organisations who wish to assess the
            quality of the output directly.
          </p>
        </Callout>
      </Section>

      <Section
        id="index"
        eyebrow="04 · Index"
        title="Full skill index"
        lead="Every individual competency published in this profile, in one list."
        variant="tinted"
      >
        <SkillTags />
        <p className="section__more">
          <Link to="/experience/">See how these skills were applied in practice →</Link>
        </p>
      </Section>
    </>
  );
}
