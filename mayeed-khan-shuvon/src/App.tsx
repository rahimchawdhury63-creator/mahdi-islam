import { useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { NavProvider, normalize, useNav } from "./lib/nav";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { EducationPage } from "./pages/EducationPage";
import { SkillsPage } from "./pages/SkillsPage";
import { ExperiencePage } from "./pages/ExperiencePage";
import { GalleryPage } from "./pages/GalleryPage";
import { FaqPage } from "./pages/FaqPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { getRoute, ROUTES, type RouteKey, type RouteMeta } from "./seo/routes";
import { buildHead } from "./seo/head";
import { syncHead } from "./seo/applyHead";

export { normalize } from "./lib/nav";

export function matchRoute(path: string): RouteMeta | null {
  const normalized = normalize(path);
  return ROUTES.find((route) => route.path === normalized) ?? null;
}

const PAGES: Record<RouteKey, () => JSX.Element> = {
  home: HomePage,
  about: AboutPage,
  education: EducationPage,
  skills: SkillsPage,
  experience: ExperiencePage,
  gallery: GalleryPage,
  faq: FaqPage,
  contact: ContactPage,
};

/**
 * Router + document-head controller.
 *
 * Routing is intentionally dependency-free: seven static routes, one history
 * listener, and a head sync that mirrors what the build step wrote into the
 * static HTML.
 */
function Shell() {
  const { path } = useNav();
  const route = matchRoute(path);
  const Page = route ? PAGES[route.key] : NotFoundPage;

  useEffect(() => {
    syncHead(buildHead(route ?? getRoute("home")), Boolean(route));
  }, [route]);

  return (
    <div className="app-shell">
      <Header currentPath={route ? route.path : ""} />
      <main id="main" className="main" tabIndex={-1}>
        <Page />
      </main>
      <Footer />
    </div>
  );
}

type AppProps = { initialPath?: string };

export function App({ initialPath }: AppProps) {
  const start = normalize(
    initialPath ?? (typeof window !== "undefined" ? window.location.pathname : "/"),
  );
  return (
    <NavProvider initialPath={start}>
      <Shell />
    </NavProvider>
  );
}
