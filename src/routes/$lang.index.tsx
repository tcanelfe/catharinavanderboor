import { createFileRoute, Link } from "@tanstack/react-router";
import { getContent, isLang, type Lang } from "@/content";
import { notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  head: ({ params }) => {
    const lang = (isLang(params.lang) ? params.lang : "en") as Lang;
    const c = getContent(lang);
    const otherLang = lang === "en" ? "es" : "en";
    return {
      meta: [
        { title: c.home.metaTitle },
        { name: "description", content: c.home.metaDescription },
        { property: "og:title", content: c.home.metaTitle },
        { property: "og:description", content: c.home.metaDescription },
        { property: "og:url", content: `/${lang}` },
        { property: "og:locale", content: c.ogLocale },
        { property: "og:site_name", content: c.siteName },
        { property: "og:type", content: "website" },
      ],
      links: [
        { rel: "canonical", href: `/${lang}` },
        { rel: "alternate", hrefLang: lang, href: `/${lang}` },
        { rel: "alternate", hrefLang: otherLang, href: `/${otherLang}` },
        { rel: "alternate", hrefLang: "x-default", href: "/en" },
      ],
    };
  },
  component: HomePage,
});

function HomePage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const c = getContent(lang);
  const h = c.home;

  return (
    <>
      <section className="mx-auto max-w-[1100px] px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground mb-6">{c.role}</p>
        <h1 className="font-serif max-w-[18ch]">{h.heroLead}</h1>
        <p className="mt-8 max-w-[60ch] text-[18px] text-foreground/90">{h.heroBody}</p>
        <div className="mt-10">
          <Link
            to="/$lang/contact"
            params={{ lang }}
            className="inline-block bg-primary text-primary-foreground px-6 py-3 text-[15px] no-underline hover:no-underline hover:bg-primary/90 rounded-[4px]"
          >
            {h.cta} →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 py-16 border-t border-border">
        <h2 className="mb-10">{h.anchorsTitle}</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {h.anchors.map((a) => (
            <article key={a.title} className="border border-border p-6 rounded-[4px] bg-card">
              <h3 className="text-[1.1rem] mb-3">{a.title}</h3>
              <p className="text-[15.5px] text-foreground/85">{a.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[720px] px-6 py-16 border-t border-border">
        <h2 className="mb-6">{h.geoTitle}</h2>
        <p className="text-foreground/90">{h.geoBody}</p>
        <p className="mt-4 text-muted-foreground">{h.geoMonitoring}</p>
      </section>

      <section className="mx-auto max-w-[720px] px-6 py-16 border-t border-border">
        <p className="font-serif text-[1.35rem] leading-snug text-foreground">{h.closing}</p>
        <div className="mt-8">
          <Link
            to="/$lang/contact"
            params={{ lang }}
            className="inline-block bg-primary text-primary-foreground px-6 py-3 text-[15px] no-underline hover:no-underline hover:bg-primary/90 rounded-[4px]"
          >
            {h.closingCta} →
          </Link>
        </div>
      </section>
    </>
  );
}
