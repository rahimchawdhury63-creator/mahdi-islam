import { CONTACT, LANGUAGES, PERSON, REFERENCES } from "../content/profile";

export function LanguageTable() {
  return (
    <div className="table-wrap">
      <table className="table">
        <caption className="table__caption">
          Languages spoken by {PERSON.fullName}, with proficiency level and professional use
        </caption>
        <thead>
          <tr>
            <th scope="col">Language</th>
            <th scope="col">Proficiency</th>
            <th scope="col">Where it is used</th>
          </tr>
        </thead>
        <tbody>
          {LANGUAGES.map((language) => (
            <tr key={language.name}>
              <th scope="row">{language.name}</th>
              <td>
                <span className="pill">{language.level}</span>
              </td>
              <td>{language.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PersonalParticulars() {
  const rows: [string, string][] = [
    ["Full name", PERSON.fullName],
    ["Date of birth", "14 September 2002 (14-09-2002)"],
    ["Nationality", PERSON.nationality],
    ["Marital status", PERSON.maritalStatus],
    ["Gender", PERSON.gender],
    ["Languages", CONTACT.languagesSpoken],
    ["Present address", CONTACT.presentAddress.full],
    ["Permanent address", CONTACT.permanentAddress.full],
    ["Mobile number", CONTACT.telephoneDisplay],
    ["Email address", CONTACT.email],
    ["Availability", CONTACT.hours],
  ];

  return (
    <div className="table-wrap">
      <table className="table table--kv">
        <caption className="table__caption">
          Personal particulars of {PERSON.fullName} as supplied by the subject
        </caption>
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ReferenceCard() {
  const reference = REFERENCES[0];
  return (
    <div className="reference-card">
      <dl className="reference-card__dl">
        <div>
          <dt>Reference name</dt>
          <dd>{reference.name}</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{reference.role}</dd>
        </div>
        <div>
          <dt>Organisation</dt>
          <dd>{reference.affiliation}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{reference.location}</dd>
        </div>
        <div>
          <dt>Relationship</dt>
          <dd>Professional reference — his four-month student period at Hexas (Hexa's)</dd>
        </div>
      </dl>
      <p className="reference-card__note">
        Referee contact details are released on request with prior consent, in line with standard
        professional courtesy.
      </p>
    </div>
  );
}
