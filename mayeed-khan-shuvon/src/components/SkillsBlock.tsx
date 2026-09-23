import { SKILLS } from "../content/profile";

export function SkillsBlock({ includeDeepDive }: { includeDeepDive?: React.ReactNode }) {
  return (
    <>
      <div className="skills-grid">
        {SKILLS.map((group, index) => (
          <article className="card card--skill" key={group.id} id={group.id}>
            <header className="card__head">
              <p className="card__eyebrow">Cluster {String(index + 1).padStart(2, "0")}</p>
              <h3 className="card__title">{group.title}</h3>
              <p className="tag-row">
                <span className="tag tag--accent">{group.level}</span>
              </p>
            </header>
            <p className="card__summary">{group.summary}</p>
            <dl className="deflist">
              {group.items.map((item) => (
                <div className="deflist__row" key={item.name}>
                  <dt className="deflist__term">{item.name}</dt>
                  <dd className="deflist__desc">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
      {includeDeepDive}
    </>
  );
}

export function SkillTags() {
  const items = SKILLS.flatMap((group) => group.items.map((item) => item.name));
  return (
    <ul className="tag-cloud" aria-label="Skill index">
      {items.map((name) => (
        <li key={name} className="tag-cloud__item">
          {name}
        </li>
      ))}
    </ul>
  );
}
