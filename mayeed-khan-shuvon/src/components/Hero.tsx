import { Link } from "../lib/nav";
import { CONTACT, PERSON } from "../content/profile";
import { HERO } from "../content/narrative";
import { PrimaryPortrait } from "./Gallery";
import { PRIMARY_PHOTO, GALLERY_COUNT } from "../content/gallery";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            {HERO.eyebrow}
          </p>
          <h1 id="hero-title" className="hero__title">
            {PERSON.fullName}
          </h1>
          <p className="hero__subtitle">{PERSON.jobTitle}</p>
          <p className="hero__subheadline" id="hero-summary">
            {HERO.subheadline}
          </p>
          <p className="hero__intro">{HERO.intro}</p>

          <div className="hero__actions">
            <a className="btn btn--primary" href={`tel:${CONTACT.telephone}`}>
              Call {CONTACT.telephoneDisplay}
            </a>
            <a className="btn btn--ghost" href={`mailto:${CONTACT.email}`}>
              Email Mr. Shuvon
            </a>
            <Link className="btn btn--link" to="/about/">
              Read the full profile →
            </Link>
          </div>

          <ul className="hero__chips" aria-label="Profile highlights">
            <li>LL.B (Honours) · North East University Bangladesh</li>
            <li>IELTS · all four modules</li>
            <li>Bangla · English · Hindi</li>
            <li>Zindabazar, Sylhet</li>
          </ul>
        </div>

        <figure className="hero__plate">
          <div className="hero__plate-frame">
            <PrimaryPortrait />
            <span className="hero__plate-corner hero__plate-corner--tl" aria-hidden="true" />
            <span className="hero__plate-corner hero__plate-corner--tr" aria-hidden="true" />
            <span className="hero__plate-corner hero__plate-corner--bl" aria-hidden="true" />
            <span className="hero__plate-corner hero__plate-corner--br" aria-hidden="true" />
          </div>
          <figcaption className="hero__plate-caption">
            <span className="hero__plate-label">Fig. 1 — Profile</span>
            <span className="hero__plate-text">
              {PRIMARY_PHOTO ? PRIMARY_PHOTO.caption : "Profile portrait"} · {PERSON.fullName} · LL.B
              (Hons), North East University Bangladesh · IELTS preparation specialist, Sylhet
            </span>
          </figcaption>
          {GALLERY_COUNT > 1 && (
            <p className="hero__plate-more">
              <Link to="/gallery/">
                View all {GALLERY_COUNT} photographs →
              </Link>
            </p>
          )}
        </figure>
      </div>
    </section>
  );
}
