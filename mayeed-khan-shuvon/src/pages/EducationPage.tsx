import { PageHeader } from "../components/PageHeader";
import { Section, Prose } from "../components/Section";
import { EducationList } from "../components/EducationList";
import { SkillTags } from "../components/SkillsBlock";
import { Link } from "../lib/nav";
import { EDUCATION_INTRO, EDUCATION_OUTRO } from "../content/narrative";

export function EducationPage() {
  return (
    <>
      <PageHeader
        routeKey="education"
        lead="Full educational history of Md Mayeed Khan Shuvon: LL.B (Honours) at North East University Bangladesh (first year, first semester — in progress), Higher Secondary Certificate at Kulaura Govt. College, and Secondary School Certificate at Nabin Chandra Govt. Model High School."
        answer={{
          question: "What is Md Mayeed Khan Shuvon's educational qualification?",
          answer:
            "Md Mayeed Khan Shuvon is in his first year, first semester of the LL.B (Honours) programme at North East University Bangladesh in Sylhet — in progress, with three years of the degree remaining. He completed the Higher Secondary Certificate (HSC) at Kulaura Govt. College in Moulvibazar, and the Secondary School Certificate (SSC) at Nabin Chandra Govt. Model High School in Kulaura, Moulvibazar.",
        }}
      />

      <Section
        id="qualifications"
        eyebrow="01 · Qualifications"
        title="Educational qualification in full"
        lead="Three institutions, thirteen-plus years of formal education, conducted in two languages, with the English-medium law honours degree in progress at first year."
      >
        <EducationList intro={EDUCATION_INTRO} outro={EDUCATION_OUTRO} />
      </Section>

      <Section
        id="competencies"
        eyebrow="02 · What the education produced"
        title="Academic competencies evidenced by the record"
        variant="tinted"
      >
        <Prose
          paragraphs={[
            "Each stage of the record has produced a distinguishable, testable capability. Secondary education established grammatical accuracy and the habit of sustained written work. Higher secondary study established structured independent revision and timed examination performance. The LL.B (Honours) programme — first year, first semester — is now adding analytical reading of dense primary text, statutory interpretation and structured written argument to that foundation.",
            "The table below maps each competency to the stage at which it was acquired or is being acquired, so that an employer or admissions officer can trace every claim back to its source.",
          ]}
        />
        <div className="table-wrap">
          <table className="table">
            <caption className="table__caption">
              Academic competencies of Md Mayeed Khan Shuvon mapped to the stage where they were acquired
            </caption>
            <thead>
              <tr>
                <th scope="col">Competency</th>
                <th scope="col">Acquired during</th>
                <th scope="col">Manifestation today</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Grammatical accuracy in English</th>
                <td>SSC — Nabin Chandra Govt. Model High School</td>
                <td>Precise written output in English; reliable formal correspondence.</td>
              </tr>
              <tr>
                <th scope="row">Structured independent study</th>
                <td>HSC — Kulaura Govt. College</td>
                <td>Multi-week self-directed study calendars built against fixed examination dates.</td>
              </tr>
              <tr>
                <th scope="row">Timed examination performance</th>
                <td>HSC and LL.B (Honours), first year</td>
                <td>Practice under true test conditions, including timed IELTS practice sets.</td>
              </tr>
              <tr>
                <th scope="row">Analytical reading of dense text</th>
                <td>LL.B (Honours), first year — North East University Bangladesh</td>
                <td>Skimming, scanning and careful reading of statutes and long-form text.</td>
              </tr>
              <tr>
                <th scope="row">Statutory and documentary precision</th>
                <td>LL.B (Honours), first year — North East University Bangladesh</td>
                <td>Documentation discipline, defined terminology and internal consistency in all written output.</td>
              </tr>
              <tr>
                <th scope="row">Structured written argument</th>
                <td>LL.B (Honours), first year — North East University Bangladesh</td>
                <td>Essay and answer architecture: thesis, development, concession, conclusion.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        id="verification"
        eyebrow="03 · Verification"
        title="Verification and documents"
        variant="tinted"
      >
        <Prose
          paragraphs={[
            "Academic certificates, mark sheets, transcripts and institutional testimonials for all three qualifications are held by him and are available for inspection or verification on request. Employers, universities and credential-evaluation services should email shuvonkhan8947@gmail.com with the specific documents required, and clear copies will be supplied directly.",
            "Document requests are answered within one to two business days. Documents are issued only to the named requester and are not circulated further, in line with standard practice for personal academic records.",
          ]}
        />
        <h3 className="subhead">Skill areas built on this academic foundation</h3>
        <SkillTags />
        <p className="section__more">
          <Link to="/skills/">Read the full skills breakdown →</Link>
        </p>
      </Section>
    </>
  );
}
