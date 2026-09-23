import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { App } from "./App";
/* Self-hosted, Latin-subset fonts — no external font CDN, no third-party
   connection, and nothing loaded that this English-language site cannot use. */
import "./styles/fonts.css";
import "./styles/global.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container #root was not found in the document.");
}

/**
 * Hydration is deferred until the browser is idle.
 *
 * Every page is already complete, indexable static HTML, and every navigation
 * control is a real <a href>, so the site is usable the moment it paints —
 * before a single byte of JavaScript is evaluated. Hydration then upgrades
 * navigation to client-side transitions in the background, which keeps the
 * interactive cost off the critical path (better LCP, INP and TBT).
 */
function hydrate() {
  hydrateRoot(
    container!,
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

const idle = () =>
  typeof window.requestIdleCallback === "function"
    ? window.requestIdleCallback(hydrate, { timeout: 2000 })
    : window.setTimeout(hydrate, 1);

if (document.readyState === "complete") {
  idle();
} else {
  window.addEventListener("load", idle, { once: true });
}
