import { CONTACT, PERSON, REFERENCES } from "../content/profile";
import { CONTACT_INTRO } from "../content/narrative";

export function ContactBlock() {
  return (
    <div className="contact">
      <div className="contact__intro">
        {CONTACT_INTRO.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>

      <div className="contact__grid">
        <a className="contact__card" href={`tel:${CONTACT.telephone}`}>
          <span className="contact__card-label">Telephone / WhatsApp</span>
          <span className="contact__card-value">{CONTACT.telephoneDisplay}</span>
          <span className="contact__card-hint">Local: {CONTACT.telephoneLocal}</span>
        </a>
        <a className="contact__card" href={`mailto:${CONTACT.email}`}>
          <span className="contact__card-label">Email</span>
          <span className="contact__card-value">{CONTACT.email}</span>
          <span className="contact__card-hint">Preferred for documents and detailed enquiries</span>
        </a>
        <div className="contact__card contact__card--static">
          <span className="contact__card-label">Present address</span>
          <address className="contact__card-value contact__card-value--sm">
            {CONTACT.presentAddress.street}
            <br />
            {CONTACT.presentAddress.locality}, {CONTACT.presentAddress.region}
            <br />
            {CONTACT.presentAddress.country}
          </address>
          <span className="contact__card-hint">Postal code {CONTACT.presentAddress.postalCode}</span>
        </div>
        <div className="contact__card contact__card--static">
          <span className="contact__card-label">Permanent address</span>
          <address className="contact__card-value contact__card-value--sm">
            {CONTACT.permanentAddress.street}
            <br />
            {CONTACT.permanentAddress.locality}, {CONTACT.permanentAddress.region}
            <br />
            {CONTACT.permanentAddress.country}
          </address>
          <span className="contact__card-hint">Postal code {CONTACT.permanentAddress.postalCode}</span>
        </div>
      </div>

      <div className="contact__details">
        <dl className="contact__dl">
          <div>
            <dt>Published availability</dt>
            <dd>{CONTACT.hours}</dd>
          </div>
          <div>
            <dt>Languages for correspondence</dt>
            <dd>{CONTACT.languagesSpoken}</dd>
          </div>
          <div>
            <dt>Typical response time</dt>
            <dd>Within one to two business days</dd>
          </div>
          <div>
            <dt>Professional reference</dt>
            <dd>
              {REFERENCES[0].name}, {REFERENCES[0].affiliation}, {REFERENCES[0].location}
            </dd>
          </div>
          <div>
            <dt>Enquiries welcome from</dt>
            <dd>
              Employers, recruitment agencies, universities, examination centres and prospective IELTS
              candidates
            </dd>
          </div>
          <div>
            <dt>Documents available on request</dt>
            <dd>
              Curriculum vitae, SSC/HSC/LL.B certificates and transcripts, work-sample portfolio of
              annotated IELTS Writing feedback
            </dd>
          </div>
        </dl>
        <p className="contact__note">
          All correspondence is treated as confidential. Documents are shared only with the named
          recipient and are not circulated to third parties.
        </p>
        <p className="contact__signoff">
          — {PERSON.fullName}, {PERSON.jobTitle}
        </p>
      </div>
    </div>
  );
}
