import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import "@/i18n";
import { isLang, type Lang, getContent } from "@/content";

export const Route = createFileRoute("/$lang/research")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  head: ({ params }) => {
    const lang = (isLang(params.lang) ? params.lang : "en") as Lang;
    const c = getContent(lang);
    const otherLang = lang === "en" ? "es" : "en";
    const title =
      lang === "es"
        ? "Investigación — Dra. Catharina van der Boor"
        : "Research — Dr. Catharina van der Boor";
    const description =
      lang === "es"
        ? "Investigación sobre desplazamiento forzado, SMAPS y ciencia de la implementación: métodos, temáticas y modalidades de colaboración."
        : "Research on forced displacement, MHPSS, and implementation science — methods, themes, and how I work with partners.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/${lang}/research` },
        { property: "og:locale", content: c.ogLocale },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "/og-image.jpg" },
        { name: "twitter:image", content: "/og-image.jpg" },
      ],
      links: [
        { rel: "canonical", href: `/${lang}/research` },
        { rel: "alternate", hrefLang: lang, href: `/${lang}/research` },
        { rel: "alternate", hrefLang: otherLang, href: `/${otherLang}/research` },
      ],
    };
  },
  component: ResearchPage,
});

function ResearchPage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const tr = (k: string) => t(k, { lng: lang }) as string;
  const methods = t("research.methods", { lng: lang, returnObjects: true }) as string[];
  const themes = t("research.themes", { lng: lang, returnObjects: true }) as string[];

  return (
    <article className="mx-auto max-w-[1100px] px-6 py-16">
      <h1 className="mb-10">{tr("research.title")}</h1>

      <section className="max-w-[62ch] text-foreground/90 text-[17px] leading-[1.6]">
        <p>{tr("research.intro")}</p>
      </section>

      <section className="mt-16 max-w-[720px]">
        <h2 className="mb-6 text-[1.25rem]">{tr("research.methodsTitle")}</h2>
        <ul className="flex flex-wrap gap-2">
          {methods.map((m) => (
            <li
              key={m}
              className="border border-border bg-card px-3 py-1.5 text-[14px] text-foreground/85 rounded-[4px]"
            >
              {m}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 max-w-[720px]">
        <h2 className="mb-6 text-[1.25rem]">{tr("research.themesTitle")}</h2>
        <ul className="flex flex-wrap gap-2">
          {themes.map((th) => (
            <li
              key={th}
              className="border border-border bg-card px-3 py-1.5 text-[14px] text-foreground/85 rounded-[4px]"
            >
              {th}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 max-w-[62ch] border-t border-border pt-10">
        <p className="text-foreground/90 text-[17px]">
          {tr("research.ctaPrefix")}{" "}
          <Link
            to="/$lang/consultancy"
            params={{ lang }}
            className="text-primary no-underline hover:underline underline-offset-4"
          >
            {tr("research.ctaLinkText")}
          </Link>
        </p>
      </section>
    </article>
  );
}
