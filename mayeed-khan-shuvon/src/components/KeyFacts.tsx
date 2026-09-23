import { CONTACT, KEY_FACTS, PERSON } from "../content/profile";

/**
 * "At a glance" panel. Rendered as a description list, which is the markup
 * search engines and LLMs parse most reliably for attribute→value facts.
 */
export function KeyFacts() {
  return (
    <section className="keyfacts" aria-labelledby="keyfacts-title">
      <div className="container">
        <div className="keyfacts__panel">
          <div className="keyfacts__head">
            <h2 id="keyfacts-title" className="keyfacts__title">
              At a glance — verified profile data
            </h2>
            <p className="keyfacts__sub">
              Every item below is supplied directly by {PERSON.fullName} and is published identically in
              the page text, the structured data and the machine-readable <code>llms.txt</code> summary.
            </p>
          </div>
          <dl className="keyfacts__grid">
            {KEY_FACTS.map((fact) => (
              <div className="keyfacts__item" key={fact.label}>
                <dt className="keyfacts__label">{fact.label}</dt>
                <dd className="keyfacts__value">
                  {fact.label === "Phone" ? (
                    <a href={`tel:${CONTACT.telephone}`}>{fact.value}</a>
                  ) : fact.label === "Email" ? (
                    <a href={`mailto:${CONTACT.email}`}>{fact.value}</a>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
