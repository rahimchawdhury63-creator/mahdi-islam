import { Link } from "../lib/nav";
import { CONTACT, PERSON, REFERENCES, SITE } from "../content/profile";
import { ROUTES } from "../seo/routes";

const year = 2026;

export function Footer() {
  return (
    <footer className="site-footer" id="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__col site-footer__col--identity">
            <p className="site-footer__name">{PERSON.fullName}</p>
            <p className="site-footer__role">{PERSON.jobTitle}</p>
            <address className="site-footer__address">
              {CONTACT.presentAddress.street}, {CONTACT.presentAddress.locality}
              <br />
              {CONTACT.presentAddress.region}, {CONTACT.presentAddress.country}
            </address>
            <p className="site-footer__contact">
              <a href={`tel:${CONTACT.telephone}`}>{CONTACT.telephoneDisplay}</a>
              <br />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          </div>

          <nav className="site-footer__col" aria-label="Footer">
            <h2 className="site-footer__heading">Sections</h2>
            <ul className="site-footer__links">
              {ROUTES.map((route) => (
                <li key={route.key}>
                  <Link to={route.path}>{route.navLabel}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__col">
            <h2 className="site-footer__heading">Machine-readable</h2>
            <ul className="site-footer__links">
              <li>
                <a href="/llms.txt">llms.txt</a>
              </li>
              <li>
                <a href="/llms-full.txt">llms-full.txt</a>
              </li>
              <li>
                <a href="/sitemap.xml">sitemap.xml</a>
              </li>
              <li>
                <a href="/robots.txt">robots.txt</a>
              </li>
              <li>
                <a href="/humans.txt">humans.txt</a>
              </li>
              <li>
                <a href="/cv.json">cv.json</a>
              </li>
            </ul>
          </div>

          <div className="site-footer__col">
            <h2 className="site-footer__heading">Availability</h2>
            <p className="site-footer__note">{CONTACT.hours}</p>
            <p className="site-footer__note">
              Languages: <strong>{CONTACT.languagesSpoken}</strong>
            </p>
            <p className="site-footer__note">
              Reference: {REFERENCES[0].name} — {REFERENCES[0].role}, {REFERENCES[0].affiliation},{" "}
              {REFERENCES[0].location}
            </p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {year} {PERSON.fullName}. All rights reserved.
          </p>
          <p className="site-footer__canonical">
            Canonical source: <span>{SITE.origin}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
