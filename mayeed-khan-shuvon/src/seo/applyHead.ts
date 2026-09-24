import type { HeadPayload } from "./head";

/**
 * Client-side <head> reconciliation.
 *
 * The pre-rendered HTML already contains the correct tags for the requested
 * route. This module only *updates* those tags (never duplicates them) when the
 * visitor navigates client-side, so the DOM head and the JSON-LD graph stay in
 * lockstep with the address bar.
 */

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${CSS.escape(key)}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  if (el.getAttribute("content") !== content) el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${CSS.escape(rel)}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  if (el.getAttribute("href") !== href) el.setAttribute("href", href);
}

export function syncHead(head: HeadPayload, indexable: boolean): void {
  document.title = head.title;

  for (const item of head.meta) {
    if (item.name) upsertMeta("name", item.name, item.content);
    else if (item.property) upsertMeta("property", item.property, item.content);
  }

  const robots = indexable
    ? "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    : "noindex, follow";
  upsertMeta("name", "robots", robots);

  for (const link of head.links) {
    if (link.rel === "canonical") upsertLink("canonical", link.href);
  }

  let script = document.getElementById("kg-jsonld") as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "kg-jsonld";
    document.head.appendChild(script);
  }
  if (script.textContent !== head.jsonLd) script.textContent = head.jsonLd;

  const htmlLang = document.documentElement.getAttribute("lang");
  if (htmlLang !== "en") document.documentElement.setAttribute("lang", "en");
}
