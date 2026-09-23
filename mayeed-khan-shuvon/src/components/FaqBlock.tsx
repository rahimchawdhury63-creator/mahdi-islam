import { FAQ, type FaqItem } from "../content/narrative";

/**
 * FAQ rendered with native <details>/<summary> so the answers are present in
 * the DOM and therefore visible to crawlers and assistants, while staying
 * collapsed (and JS-free) for human visitors.
 */
export function FaqBlock({ items = FAQ, openFirst = true }: { items?: FaqItem[]; openFirst?: boolean }) {
  return (
    <div className="faq" itemScope itemType="https://schema.org/FAQPage">
      {items.map((item, index) => (
        <details
          className="faq__item"
          key={item.question}
          open={openFirst && index === 0}
          itemScope
          itemProp="mainEntity"
          itemType="https://schema.org/Question"
        >
          <summary className="faq__q">
            <span itemProp="name">{item.question}</span>
            <span className="faq__icon" aria-hidden="true" />
          </summary>
          <div
            className="faq__a"
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
          >
            <p itemProp="text">{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
