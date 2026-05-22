import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import "@/i18n";
import { getContent, isLang, type Lang } from "@/content";

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

interface WorkItem {
  title: string;
  body: string;
}

function HomePage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const { t, i18n } = useTranslation();

  // Keep i18n.language in sync with the URL on the client.
  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [lang, i18n]);

  // SSR-safe: read with explicit lng parameter so server output matches the URL.
  const tr = (k: string) => t(k, { lng: lang }) as string;
  const anchors = t("home.anchors", { lng: lang, returnObjects: true }) as string[];
  const work = t("home.work", { lng: lang, returnObjects: true }) as WorkItem[];

  return (
    <>
      {/* 1. Hero */}
      <section className="mx-auto max-w-[1100px] px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <h1 className="font-serif">{tr("home.name")}</h1>
        <p className="mt-8 max-w-[62ch] text-[19px] leading-[1.55] text-foreground/90">
          {tr("home.lede")}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            to="/$lang/contact"
            params={{ lang }}
            className="inline-block bg-primary text-primary-foreground px-6 py-3 text-[15px] no-underline hover:no-underline hover:bg-primary/90 rounded-[4px]"
          >
            {tr("home.ctaPrimary")} →
          </Link>
          <Link
            to="/$lang/research"
            params={{ lang }}
            className="text-[15px] text-primary no-underline hover:underline underline-offset-4"
          >
            {tr("home.ctaSecondary")} →
          </Link>
        </div>
      </section>

      {/* 2. Three credibility anchors */}
      <section className="mx-auto max-w-[1100px] px-6 py-12 border-t border-border">
        <div className="grid gap-6 md:grid-cols-3">
          {anchors.map((a, i) => (
            <div
              key={i}
              className="border border-border rounded-[4px] bg-card px-5 py-6 text-[16px] text-foreground/90"
            >
              {a}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Selected current work */}
      <section className="mx-auto max-w-[1100px] px-6 py-16 border-t border-border">
        <h2 className="mb-10">{tr("home.workTitle")}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {work.map((w, i) => (
            <article key={i} className="border border-border rounded-[4px] bg-card p-6">
              <h3 className="text-[1.05rem] mb-3">{w.title}</h3>
              <p className="text-[15px] text-foreground/85">{w.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Closing band */}
      <section className="mx-auto max-w-[860px] px-6 py-20 border-t border-border">
        <p className="font-serif text-[1.5rem] leading-[1.35] text-foreground">
          {tr("home.closing")}
        </p>
        <div className="mt-10">
          <Link
            to="/$lang/contact"
            params={{ lang }}
            className="inline-block bg-primary text-primary-foreground px-6 py-3 text-[15px] no-underline hover:no-underline hover:bg-primary/90 rounded-[4px]"
          >
            {tr("home.ctaPrimary")} →
          </Link>
        </div>
      </section>
    </>
  );
}
