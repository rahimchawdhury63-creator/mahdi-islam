import { Link } from "../lib/nav";
import { ROUTES } from "../seo/routes";
import { PERSON } from "../content/profile";

export function NotFoundPage() {
  return (
    <section className="notfound">
      <div className="container">
        <p className="notfound__code">404</p>
        <h1 className="notfound__title">That page does not exist</h1>
        <p className="notfound__lead">
          The address you requested is not part of the profile of {PERSON.fullName}. Use the links below to
          reach the section you were looking for, or return to the main profile page.
        </p>
        <ul className="link-cards link-cards--compact">
          {ROUTES.map((route) => (
            <li key={route.key}>
              <Link to={route.path} className="link-card">
                <span className="link-card__title">{route.navLabel}</span>
                <span className="link-card__desc">{route.h1}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
