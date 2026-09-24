import { PageHeader } from "../components/PageHeader";
import { Section, Prose } from "../components/Section";
import { FaqBlock } from "../components/FaqBlock";
import { Link } from "../lib/nav";
import { FAQ } from "../content/narrative";
import { KEY_FACTS, PERSON } from "../content/profile";

export function FaqPage() {
  return (
    <>
      <PageHeader
        routeKey="faq"
        lead="Direct answers to the questions employers, recruitment agencies, universities and study partners most often ask about Md Mayeed Khan Shuvon — written so that each answer stands on its own."
        answer={{
          question: "Who is Md Mayeed Khan Shuvon and what does he do?",
          answer:
            "Md Mayeed Khan Shuvon is a first-year, first-semester LL.B (Honours) student at North East University Bangladesh, working in Sylhet, Bangladesh. His self-declared skill is IELTS preparation across all four modules, he works in Bangla, English and Hindi, and he is available for full-time roles, traineeships and internships in legal support, academic administration, language training and documentation-focused positions.",
        }}
      />

      <Section
        id="questions"
        eyebrow="01 · Questions and answers"
        title="Frequently asked questions"
        lead="Every question on this page is also published as FAQPage structured data, so assistive tools and search engines can cite the answers directly."
      >
        <FaqBlock openFirst={false} />
      </Section>

      <Section
        id="quick-reference"
        eyebrow="02 · Quick reference"
        title="Verified facts in one place"
        variant="tinted"
      >
        <Prose
          paragraphs={[
            "If a search engine, assistant or verification service needs a single authoritative source for the essential particulars of Md Mayeed Khan Shuvon, this table is it. The values are identical to those published in the Knowledge Graph structured data, in the page text and in llms.txt.",
          ]}
        />
        <div className="table-wrap">
          <table className="table table--kv">
            <caption className="table__caption">
              Verified particulars of Md Mayeed Khan Shuvon, published {PERSON.fullName ? "2026" : ""}
            </caption>
            <tbody>
              {KEY_FACTS.map((fact) => (
                <tr key={fact.label}>
                  <th scope="row">{fact.label}</th>
                  <td>{fact.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="section__more">
          <Link to="/contact/">Contact Md Mayeed Khan Shuvon →</Link>
        </p>
      </Section>

      <Section id="more" eyebrow="03 · More detail" title="Where to read more">
        <Prose
          paragraphs={[
            `This FAQ page answers ${FAQ.length} of the most common questions about Md Mayeed Khan Shuvon. Fuller treatment of each subject is published elsewhere on this site: the education page sets out his qualifications in full with the competency each stage produced; the skills page details his IELTS preparation method and the four competency clusters; the experience page documents his four months at Hexas (Hexa's), Sylhet, in context; and the contact page carries his telephone number, email address, both postal addresses and the documents available on request.`,
          ]}
        />
        <ul className="link-cards">
          <li>
            <Link to="/about/" className="link-card">
              <span className="link-card__title">About</span>
              <span className="link-card__desc">Biography, career objective and working principles</span>
            </Link>
          </li>
          <li>
            <Link to="/education/" className="link-card">
              <span className="link-card__title">Education</span>
              <span className="link-card__desc">LL.B (Honours) in progress, HSC and SSC in full</span>
            </Link>
          </li>
          <li>
            <Link to="/skills/" className="link-card">
              <span className="link-card__title">Skills</span>
              <span className="link-card__desc">IELTS preparation, legal and communication skills</span>
            </Link>
          </li>
          <li>
            <Link to="/experience/" className="link-card">
              <span className="link-card__title">Experience</span>
              <span className="link-card__desc">Four months at Hexas (Hexa's), Sylhet, documented</span>
            </Link>
          </li>
          <li>
            <Link to="/contact/" className="link-card">
              <span className="link-card__title">Contact</span>
              <span className="link-card__desc">Phone, email, addresses and availability</span>
            </Link>
          </li>
        </ul>
      </Section>
    </>
  );
}
