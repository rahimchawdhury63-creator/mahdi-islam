import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";

type NavContextValue = {
  path: string;
  navigate: (to: string) => void;
};

const NavContext = createContext<NavContextValue>({ path: "/", navigate: () => {} });

export const normalize = (raw: string): string => {
  if (!raw) return "/";
  let path = raw.split("?")[0].split("#")[0];
  if (!path.startsWith("/")) path = `/${path}`;
  path = path.replace(/\/index\.html?$/i, "/");
  if (path.length > 1 && !path.endsWith("/")) path += "/";
  return path;
};

export function NavProvider({
  children,
  initialPath = "/",
}: {
  children: ReactNode;
  initialPath?: string;
}) {
  const [path, setPath] = useState(normalize(initialPath));

  useEffect(() => {
    const onPop = () => setPath(normalize(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    const target = normalize(to);
    if (typeof window !== "undefined" && target !== normalize(window.location.pathname)) {
      window.history.pushState({}, "", target);
    }
    setPath(target);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return <NavContext.Provider value={{ path, navigate }}>{children}</NavContext.Provider>;
}

export const useNav = () => useContext(NavContext);

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  children: ReactNode;
};

/** Internal link that performs a client-side transition but stays a real <a href>. */
export function Link({ to, children, onClick, ...rest }: LinkProps) {
  const { navigate } = useNav();
  return (
    <a
      href={to}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return;
        }
        event.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
