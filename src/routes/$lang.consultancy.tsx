import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import "@/i18n";
import { isLang, type Lang, getContent } from "@/content";

export const Route = createFileRoute("/$lang/consultancy")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  head: ({ params }) => {
    const lang = (isLang(params.lang) ? params.lang : "en") as Lang;
    const c = getContent(lang);
    const otherLang = lang === "en" ? "es" : "en";
    const title =
      lang === "es"
        ? "Consultoría — Catharina van der Boor"
        : "Consultancy — Catharina van der Boor";
    const description =
      lang === "es"
        ? "Consultoría en diseño y evaluación de programas SMAPS, adaptación cultural de instrumentos y formación de capacidades para agencias de la ONU, ONG internacionales y ministerios de salud."
        : "Consultancy on MHPSS programme design, evaluation, cultural adaptation of instruments, and capacity building for UN agencies, INGOs, and ministries of health.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/${lang}/consultancy` },
        { property: "og:locale", content: c.ogLocale },
        { property: "og:image", content: "/og-image.jpg" },
        { name: "twitter:image", content: "/og-image.jpg" },
      ],

      links: [
        { rel: "canonical", href: `/${lang}/consultancy` },
        { rel: "alternate", hrefLang: lang, href: `/${lang}/consultancy` },
        { rel: "alternate", hrefLang: otherLang, href: `/${otherLang}/consultancy` },
      ],
    };
  },
  component: ConsultancyPage,
});

function ConsultancyPage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const clients = t("consultancy.clients", { lng: lang, returnObjects: true }) as Array<{
    period: string;
    name: string;
  }>;
  const engagements = t("consultancy.engagements", {
    lng: lang,
    returnObjects: true,
  }) as Array<{ title: string; body: string }>;

  return (
    <article className="mx-auto max-w-[720px] px-6 py-16">
      <h1 className="mb-8">{t("consultancy.title", { lng: lang })}</h1>
      <p className="text-foreground/90 text-[17px]">{t("consultancy.intro", { lng: lang })}</p>

      <section className="mt-14">
        <h2 className="mb-6 text-[1.25rem]">{t("consultancy.clientsTitle", { lng: lang })}</h2>
        <ul className="divide-y divide-border border-y border-border">
          {clients.map((c) => (
            <li
              key={c.name}
              className="grid grid-cols-[10rem_1fr] gap-4 py-3 text-[15.5px]"
            >
              <span className="text-foreground/65 tabular-nums">{c.period}</span>
              <span className="text-foreground/90">{c.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="mb-6 text-[1.25rem]">
          {t("consultancy.engagementsTitle", { lng: lang })}
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {engagements.map((e) => (
            <div key={e.title} className="border border-border p-5 rounded-[4px] bg-card">
              <h3 className="text-[1rem] mb-2">{e.title}</h3>
              <p className="text-[15px] text-foreground/85">{e.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-14 border-t border-border pt-10">
        <Link
          to="/$lang/contact"
          params={{ lang }}
          className="inline-block bg-primary text-primary-foreground px-6 py-3 text-[15px] no-underline hover:no-underline hover:bg-primary/90 rounded-[4px] transition-[transform,background-color] duration-[160ms] ease-out motion-safe:active:scale-[0.97]"
        >
          {t("consultancy.cta", { lng: lang })} →
        </Link>
      </div>
    </article>
  );
}
