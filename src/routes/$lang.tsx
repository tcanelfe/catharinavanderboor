import { createFileRoute, Link, Outlet, notFound, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getContent, isLang, type Lang } from "@/content";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  component: LangLayout,
});

function LangLayout() {
  const { lang } = Route.useParams() as { lang: Lang };

  return (
    <div className="min-h-dvh flex flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header lang={lang} />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer lang={lang} />
    </div>
  );
}

type NavItem = { to: "/$lang" | "/$lang/about" | "/$lang/consultancy" | "/$lang/publications" | "/$lang/contact"; label: string; exact?: boolean };

function Header({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const navItems: NavItem[] = [
    { to: "/$lang", label: c.nav.home, exact: true },
    { to: "/$lang/about", label: c.nav.about },
    { to: "/$lang/consultancy", label: c.nav.consultancy },
    { to: "/$lang/publications", label: c.nav.publications },
    { to: "/$lang/contact", label: c.nav.contact },
  ];

  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-[1100px] px-6 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link
          to="/$lang"
          params={{ lang }}
          className="font-serif text-lg text-foreground no-underline hover:no-underline"
        >
          {c.fullName}
        </Link>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <nav aria-label="Primary" className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                params={{ lang }}
                activeOptions={{ exact: item.exact ?? false }}
                activeProps={{
                  className: "text-primary underline underline-offset-4",
                }}
                inactiveProps={{
                  className: "text-foreground hover:text-primary no-underline hover:underline underline-offset-4",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LangSwitch lang={lang} />
          <ThemeToggle lang={lang} />
        </div>
      </div>
    </header>
  );
}

function ThemeToggle({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore storage errors */
    }
  };

  const label =
    c.themeToggle?.[isDark ? "toLight" : "toDark"] ??
    (isDark ? "Switch to light theme" : "Switch to dark theme");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-[4px] border border-border text-foreground/80 hover:text-primary hover:border-primary transition-[transform,color,border-color] duration-[160ms] ease-out motion-safe:active:scale-[0.93]"
    >
      {mounted ? (
        isDark ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )
      ) : (
        <span className="block h-3.5 w-3.5" />
      )}
    </button>
  );
}

function LangSwitch({ lang }: { lang: Lang }) {
  const location = useLocation();
  const c = getContent(lang);

  // Replace the leading /<lang> in the current pathname with the other lang
  const swap = (target: Lang) => {
    const rest = location.pathname.replace(/^\/(en|es)/, "");
    return `/${target}${rest}` || `/${target}`;
  };

  return (
    <div className="flex items-center gap-1 text-[13px]" aria-label={c.langSwitch.label}>
      {(["en", "es"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-muted-foreground">·</span>}
          {l === lang ? (
            <span className="text-foreground font-medium">{c.langSwitch[l]}</span>
          ) : (
            <a
              href={swap(l)}
              className="text-muted-foreground hover:text-primary no-underline hover:underline"
              hrefLang={l}
              onClick={(e) => {
                const url = swap(l);
                const doc = document as Document & {
                  startViewTransition?: (cb: () => void) => unknown;
                };
                if (typeof doc.startViewTransition === "function") {
                  e.preventDefault();
                  doc.startViewTransition(() => {
                    window.location.href = url;
                  });
                }
              }}
            >
              {c.langSwitch[l]}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border mt-16">
      <div className="mx-auto max-w-[1100px] px-6 py-10 text-sm text-muted-foreground flex flex-col gap-2 md:flex-row md:justify-between">
        <div>© {year} {c.fullName}. {c.footer.rights}</div>
        <div>{c.footer.email}: {c.contact.emailValue}</div>
      </div>
    </footer>
  );
}
