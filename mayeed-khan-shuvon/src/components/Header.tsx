import { useEffect, useState } from "react";
import { Link, useNav } from "../lib/nav";
import { CONTACT, PERSON } from "../content/profile";
import { ROUTES } from "../seo/routes";

export function Header({ currentPath }: { currentPath: string }) {
  const [open, setOpen] = useState(false);
  const { path } = useNav();

  // Close the mobile panel whenever a navigation actually completes.
  useEffect(() => setOpen(false), [path]);

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="utility-bar__inner">
          <p className="utility-bar__item">
            <span className="dot" aria-hidden="true" />
            Available for full-time roles, traineeships &amp; IELTS coaching
          </p>
          <p className="utility-bar__item utility-bar__item--right">
            <a href={`tel:${CONTACT.telephone}`}>{CONTACT.telephoneDisplay}</a>
            <span className="utility-bar__sep" aria-hidden="true">
              ·
            </span>
            <a href={`mailto:${CONTACT.email}`} className="utility-bar__mail">
              {CONTACT.email}
            </a>
          </p>
        </div>
      </div>

      <div className="header-main">
        <div className="header-main__inner">
          <Link to="/" className="brand" aria-label={`${PERSON.fullName} — home`}>
            <span className="brand__mark" aria-hidden="true">
              MK
            </span>
            <span className="brand__text">
              <span className="brand__name">{PERSON.fullName}</span>
              <span className="brand__role">LL.B (Hons) · IELTS Specialist · Sylhet</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Primary">
            <ul className="nav__list">
              {ROUTES.map((route) => {
                const active = route.path === currentPath;
                return (
                  <li key={route.key}>
                    <Link
                      to={route.path}
                      className={`nav__link${active ? " is-active" : ""}`}
                      aria-current={active ? "page" : undefined}
                    >
                      {route.navLabel}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header-actions">
            <Link to="/contact/" className="btn btn--primary btn--sm">
              Get in touch
            </Link>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="menu-toggle__bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="menu-toggle__label">{open ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-nav" className={`mobile-nav${open ? " is-open" : ""}`} hidden={!open}>
        <ul className="mobile-nav__list">
          {ROUTES.map((route) => (
            <li key={route.key}>
              <Link
                to={route.path}
                className={`mobile-nav__link${route.path === currentPath ? " is-active" : ""}`}
              >
                <span>{route.navLabel}</span>
                <span className="mobile-nav__hint">{route.h1}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-nav__contact">
          <a className="btn btn--primary btn--block" href={`tel:${CONTACT.telephone}`}>
            Call {CONTACT.telephoneDisplay}
          </a>
          <a className="btn btn--ghost btn--block" href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
          </a>
        </div>
      </div>
    </header>
  );
}
