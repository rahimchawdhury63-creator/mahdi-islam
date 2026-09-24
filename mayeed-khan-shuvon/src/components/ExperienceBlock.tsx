import { EXPERIENCE } from "../content/profile";

export function ExperienceBlock() {
  return (
    <div className="experience">
      {EXPERIENCE.map((job, index) => (
        <article className="card card--exp" key={job.id} id={job.id}>
          <header className="card__head card__head--exp">
            <div>
              <p className="card__eyebrow">Entry {String(index + 1).padStart(2, "0")}</p>
              <h3 className="card__title card__title--lg">{job.role}</h3>
              <p className="card__meta">
                <span className="card__meta-strong">{job.organisation}</span>
                <span className="card__meta-sep" aria-hidden="true">
                  ·
                </span>
                <span>{job.location}</span>
              </p>
            </div>
            <dl className="stamp">
              <div className="stamp__row">
                <dt>Duration</dt>
                <dd>{job.duration}</dd>
              </div>
              <div className="stamp__row">
                <dt>Type</dt>
                <dd>{job.type}</dd>
              </div>
            </dl>
          </header>

          <p className="card__summary">{job.summary}</p>

          <div className="exp-cols">
            <section className="exp-col" aria-labelledby={`${job.id}-resp`}>
              <h4 id={`${job.id}-resp`} className="exp-col__title">
                What the period involved
              </h4>
              <ul className="ticks ticks--numbered">
                {job.responsibilities.map((item) => (
                  <li key={item.slice(0, 40)}>{item}</li>
                ))}
              </ul>
            </section>
            <section className="exp-col" aria-labelledby={`${job.id}-out`}>
              <h4 id={`${job.id}-out`} className="exp-col__title">
                Outcomes &amp; capabilities evidenced
              </h4>
              <ul className="ticks">
                {job.outcomes.map((item) => (
                  <li key={item.slice(0, 40)}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      ))}
    </div>
  );
}
