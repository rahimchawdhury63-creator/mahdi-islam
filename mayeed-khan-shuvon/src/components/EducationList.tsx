import { EDUCATION } from "../content/profile";

export function EducationList({ intro, outro }: { intro?: string[]; outro?: string[] }) {
  return (
    <>
      {intro && (
        <div className="prose prose--lead">
          {intro.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      )}

      <ol className="timeline">
        {EDUCATION.map((entry, index) => (
          <li className="timeline__item" key={entry.id} id={entry.id}>
            <div className="timeline__marker" aria-hidden="true">
              <span className="timeline__marker-dot" />
              <span className="timeline__marker-line" />
            </div>
            <article className="card card--edu" aria-labelledby={`${entry.id}-title`}>
              <header className="card__head">
                <p className="card__eyebrow">
                  Qualification {String(index + 1).padStart(2, "0")}
                </p>
                <h3 id={`${entry.id}-title`} className="card__title">
                  {entry.programme}
                </h3>
                <p className="card__meta">
                  <span className="card__meta-strong">{entry.institution}</span>
                  <span className="card__meta-sep" aria-hidden="true">
                    ·
                  </span>
                  <span>{entry.location}</span>
                </p>
                <p className="tag-row">
                  <span className="tag tag--level">{entry.level}</span>
                  <span className={`tag${entry.status === "in-progress" ? " tag--status" : ""}`}>
                    {entry.statusDisplay}
                  </span>
                  <span className="tag">{entry.field}</span>
                </p>
              </header>
              <p className="card__summary">{entry.summary}</p>
              <ul className="ticks">
                {entry.highlights.map((point) => (
                  <li key={point.slice(0, 40)}>{point}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>

      {outro && (
        <div className="prose prose--outro">
          {outro.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      )}
    </>
  );
}
