import type { ReactNode } from "react";
import { Breadcrumbs } from "./Section";
import { breadcrumbFor, getRoute, type RouteKey } from "../seo/routes";

/**
 * Sub-page masthead: breadcrumb, single H1, short lead and a self-contained
 * answer block. One H1 per document is enforced deliberately.
 */
export function PageHeader({
  routeKey,
  lead,
  answer,
  children,
}: {
  routeKey: RouteKey;
  lead: string;
  answer?: { question: string; answer: string };
  children?: ReactNode;
}) {
  const route = getRoute(routeKey);
  return (
    <header className="page-head">
      <div className="container">
        <Breadcrumbs items={breadcrumbFor(route)} />
        <p className="page-head__eyebrow">{route.navLabel} · {route.h1}</p>
        <h1 className="page-head__title">{route.h1}</h1>
        <p className="page-head__lead">{lead}</p>
        {answer && (
          <div className="answer-box answer-box--lead" data-answer-box="true">
            <dl className="answer-box__dl">
              <dt className="answer-box__q">{answer.question}</dt>
              <dd className="answer-box__a">{answer.answer}</dd>
            </dl>
          </div>
        )}
        {children}
      </div>
    </header>
  );
}
