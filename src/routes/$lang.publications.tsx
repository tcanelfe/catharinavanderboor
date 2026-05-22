import { createFileRoute, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import "@/i18n";
import { isLang, type Lang, getContent } from "@/content";

const ORCID_URL = "https://orcid.org/0000-0003-2710-7601";

export const Route = createFileRoute("/$lang/publications")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  head: ({ params }) => {
    const lang = (isLang(params.lang) ? params.lang : "en") as Lang;
    const c = getContent(lang);
    const otherLang = lang === "en" ? "es" : "en";
    const title =
      lang === "es"
        ? "Publicaciones — Catharina van der Boor"
        : "Publications — Catharina van der Boor";
    const description =
      lang === "es"
        ? "19 publicaciones revisadas por pares en salud mental global, desplazamiento forzado y SMAPS. Lista completa en ORCID."
        : "19 peer-reviewed publications in global mental health, forced displacement, and MHPSS. Full list on ORCID.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/${lang}/publications` },
        { property: "og:locale", content: c.ogLocale },
      ],
      links: [
        { rel: "canonical", href: `/${lang}/publications` },
        { rel: "alternate", hrefLang: lang, href: `/${lang}/publications` },
        { rel: "alternate", hrefLang: otherLang, href: `/${otherLang}/publications` },
      ],
    };
  },
  component: PublicationsPage,
});

function PublicationsPage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <article className="mx-auto max-w-[720px] px-6 py-16">
      <h1 className="mb-8">{t("publications.title", { lng: lang })}</h1>
      <p className="text-foreground/90 text-[17px]">{t("publications.lead", { lng: lang })}</p>

      <div className="mt-8">
        <a
          href={ORCID_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-[15px] no-underline hover:no-underline hover:bg-primary/90 rounded-[4px]"
        >
          {t("publications.orcidButton", { lng: lang })} →
        </a>
      </div>

      <section className="mt-14">
        <h2 className="mb-5 text-[1.25rem]">{t("publications.selectedTitle", { lng: lang })}</h2>
        <p className="text-foreground/70 italic border-l-2 border-border pl-5 py-2 text-[15px]">
          {t("publications.selectedNote", { lng: lang })}
        </p>
      </section>
    </article>
  );
}
