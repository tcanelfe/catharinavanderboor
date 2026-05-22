import { createFileRoute, notFound } from "@tanstack/react-router";
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
        ? "Investigación — Catharina van der Boor"
        : "Research — Catharina van der Boor";
    const description =
      lang === "es"
        ? "Investigación sobre desplazamiento forzado, SMAPS y ciencia de la implementación. Proyectos en curso en Uganda, Ucrania y Colombia."
        : "Research on forced displacement, MHPSS, and implementation science. Current projects in Uganda, Ukraine, and Colombia.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/${lang}/research` },
        { property: "og:locale", content: c.ogLocale },
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

  const projects = t("research.projects", { lng: lang, returnObjects: true }) as Array<{
    title: string;
    body: string;
  }>;
  const themes = t("research.themes", { lng: lang, returnObjects: true }) as string[];

  return (
    <article className="mx-auto max-w-[720px] px-6 py-16">
      <h1 className="mb-8">{t("research.title", { lng: lang })}</h1>
      <p className="text-foreground/90 text-[17px]">{t("research.intro", { lng: lang })}</p>

      <section className="mt-14">
        <h2 className="mb-6 text-[1.25rem]">{t("research.projectsTitle", { lng: lang })}</h2>
        <div className="space-y-6">
          {projects.map((p, i) => (
            <div key={i} className="border border-border p-5 rounded-[4px] bg-card">
              <h3 className="text-[1.05rem] mb-2">{p.title}</h3>
              <p className="text-[15.5px] text-foreground/85">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-5 text-[1.25rem]">{t("research.methodsTitle", { lng: lang })}</h2>
        <p className="text-foreground/90 text-[16px]">{t("research.methodsBody", { lng: lang })}</p>
      </section>

      <section className="mt-14">
        <h2 className="mb-5 text-[1.25rem]">{t("research.themesTitle", { lng: lang })}</h2>
        <ul className="flex flex-wrap gap-2">
          {themes.map((tag) => (
            <li
              key={tag}
              className="border border-border bg-card px-3 py-1.5 text-[14px] text-foreground/85 rounded-[4px]"
            >
              {tag}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
