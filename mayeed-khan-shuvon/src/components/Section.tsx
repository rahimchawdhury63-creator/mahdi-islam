import type { ReactNode } from "react";
import { Link } from "../lib/nav";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.path} className="breadcrumbs__item">
              {last ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link to={item.path}>{item.name}</Link>
              )}
              {!last && (
                <span className="breadcrumbs__sep" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  children: ReactNode;
  /** Visual treatment: default paper card, "plate" for framed media. */
  variant?: "default" | "tinted" | "rule";
  as?: "section" | "article" | "div";
};

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  variant = "default",
  as: Tag = "section",
}: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <Tag id={id} className={`section section--${variant}`} aria-labelledby={headingId}>
      <div className="container">
        <header className="section__head">
          {eyebrow && (
            <p className="section__eyebrow">
              <span className="section__eyebrow-mark" aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          <h2 id={headingId} className="section__title">
            {title}
          </h2>
          {lead && <p className="section__lead">{lead}</p>}
        </header>
        <div className="section__body">{children}</div>
      </div>
    </Tag>
  );
}

/** Renders an array of paragraphs with consistent editorial rhythm. */
export function Prose({ paragraphs, className = "" }: { paragraphs: string[]; className?: string }) {
  return (
    <div className={`prose ${className}`.trim()}>
      {paragraphs.map((text) => (
        <p key={text.slice(0, 48)}>{text}</p>
      ))}
    </div>
  );
}

/**
 * A short, self-contained answer block. This is the unit that assistant
 * crawlers and featured snippets lift most readily, so every page opens with
 * one and it is marked up as a definition list for machine parsing.
 */
export function AnswerBox({
  question,
  answer,
  meta,
}: {
  question: string;
  answer: string;
  meta?: { label: string; value: string }[];
}) {
  return (
    <div className="answer-box" data-answer-box="true">
      <dl className="answer-box__dl">
        <dt className="answer-box__q">{question}</dt>
        <dd className="answer-box__a">{answer}</dd>
      </dl>
      {meta && meta.length > 0 && (
        <ul className="answer-box__meta">
          {meta.map((item) => (
            <li key={item.label}>
              <span className="answer-box__meta-label">{item.label}</span>
              <span className="answer-box__meta-value">{item.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="callout">
      <p className="callout__title">{title}</p>
      <div className="callout__body">{children}</div>
    </aside>
  );
}
