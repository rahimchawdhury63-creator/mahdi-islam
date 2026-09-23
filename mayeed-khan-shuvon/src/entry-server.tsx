import { renderToString } from "react-dom/server";
import { App } from "./App";

/**
 * Server entry used only at build time by `scripts/prerender.mjs`.
 * There is no runtime Node server: Cloudflare Pages serves the generated
 * static files directly.
 */
export function render(path: string): string {
  return renderToString(<App initialPath={path} />);
}
