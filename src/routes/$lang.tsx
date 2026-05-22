import { createFileRoute, Link, Outlet, notFound, useLocation } from "@tanstack/react-router";
import { getContent, isLang, type Lang } from "@/content";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  component: LangLayout,
});

function LangLayout() {
  const { lang } = Route.useParams() as { lang: Lang };
  const c = getContent(lang);

  return (
    <div className="min-h-dvh flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-background focus:px-3 focus:py-2 focus:border focus:border-primary"
      >
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

function Header({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const navItems = [
    { to: "/$lang", label: c.nav.home, exact: true },
    { to: "/$lang/about", label: c.nav.about },
    { to: "/$lang/research", label: c.nav.research },
    { to: "/$lang/consultancy", label: c.nav.consultancy },
    { to: "/$lang/publications", label: c.nav.publications },
    { to: "/$lang/contact", label: c.nav.contact },
  ] as const;

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
        </div>
      </div>
    </header>
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
