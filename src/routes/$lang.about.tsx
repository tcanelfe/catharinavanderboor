import { createFileRoute, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import "@/i18n";
import { isLang, type Lang, getContent } from "@/content";
import headshot from "@/assets/headshot.jpg";

const ORCID_URL = "https://orcid.org/0000-0003-2710-7601";

export const Route = createFileRoute("/$lang/about")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  head: ({ params }) => {
    const lang = (isLang(params.lang) ? params.lang : "en") as Lang;
    const c = getContent(lang);
    const otherLang = lang === "en" ? "es" : "en";
    const title =
      lang === "es"
        ? "Sobre mí — Dra. Catharina van der Boor"
        : "About — Dr. Catharina van der Boor";
    const description =
      lang === "es"
        ? "Biografía, trayectoria académica y profesional, formación, idiomas y competencias técnicas de la Dra. Catharina van der Boor."
        : "Biography, academic and professional timeline, education, languages, and technical skills of Dr. Catharina van der Boor.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/${lang}/about` },
        { property: "og:locale", content: c.ogLocale },
        { property: "og:type", content: "profile" },
        { property: "og:image", content: "/og-image.jpg" },
        { name: "twitter:image", content: "/og-image.jpg" },
      ],

      links: [
        { rel: "canonical", href: `/${lang}/about` },
        { rel: "alternate", hrefLang: lang, href: `/${lang}/about` },
        { rel: "alternate", hrefLang: otherLang, href: `/${otherLang}/about` },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Catharina van der Boor",
            honorificPrefix: lang === "es" ? "Dra." : "Dr.",
            jobTitle:
              lang === "es"
                ? "Profesora Titular de Salud Mental Global"
                : "Senior Lecturer in Global Mental Health",
            affiliation: {
              "@type": "Organization",
              name: "London School of Hygiene & Tropical Medicine",
              url: "https://www.lshtm.ac.uk",
            },
            url: ORCID_URL,
            sameAs: [ORCID_URL, "https://www.linkedin.com/in/vanderboor"],
            identifier: ORCID_URL,
          }),
        },
      ],
    };
  },
  component: AboutPage,
});

interface TimelineEntry { period: string; role: string }
interface EducationEntry { period: string; degree: string; detail: string }

function AboutPage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const tr = (k: string) => t(k, { lng: lang }) as string;
  const bio = t("about.bio", { lng: lang, returnObjects: true }) as string[];
  const timeline = t("about.timeline", { lng: lang, returnObjects: true }) as TimelineEntry[];
  const education = t("about.education", { lng: lang, returnObjects: true }) as EducationEntry[];
  const languages = t("about.languages", { lng: lang, returnObjects: true }) as string[];
  const skills = t("about.skills", { lng: lang, returnObjects: true }) as string[];
  const leadership = t("about.leadership", { lng: lang, returnObjects: true }) as string[];

  return (
    <article className="mx-auto max-w-[1100px] px-6 py-16">
      <h1 className="mb-12">{tr("about.title")}</h1>

      {/* 1. Bio + headshot */}
      <section className="grid gap-10 md:grid-cols-[1fr_280px] md:gap-12 md:items-start">
        {/* Headshot — first in DOM so it appears at top on mobile; placed in right column on desktop */}
        <div className="md:col-start-2 md:row-start-1">
          <img
            src={headshot}
            alt={tr("about.headshotAlt")}
            width={280}
            height={280}
            loading="eager"
            className="w-[280px] h-[280px] max-w-full object-cover rounded-[4px] border border-border"
          />
        </div>
        <div className="md:col-start-1 md:row-start-1 space-y-5 text-foreground/90 max-w-[62ch]">
          {bio.map((p, i) => (<p key={i}>{p}</p>))}
        </div>
      </section>

      {/* 2. Timeline */}
      <section className="mt-16 max-w-[720px]">
        <h2 className="mb-6 text-[1.25rem]">{tr("about.timelineTitle")}</h2>
        <ul className="border-t border-border">
          {timeline.map((entry, i) => (
            <li
              key={i}
              className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 border-b border-border py-4"
            >
              <span className="text-sm uppercase tracking-wide text-muted-foreground">
                {entry.period}
              </span>
              <span className="text-foreground/90">{entry.role}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Education */}
      <section className="mt-16 max-w-[720px]">
        <h2 className="mb-6 text-[1.25rem]">{tr("about.educationTitle")}</h2>
        <ul className="border-t border-border">
          {education.map((e, i) => (
            <li
              key={i}
              className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 border-b border-border py-4"
            >
              <span className="text-sm uppercase tracking-wide text-muted-foreground">{e.period}</span>
              <span className="text-foreground/90">
                <span className="block">{e.degree}</span>
                {e.detail && (
                  <span className="block text-[15px] text-muted-foreground mt-1">{e.detail}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Languages */}
      <section className="mt-16 max-w-[720px]">
        <h2 className="mb-6 text-[1.25rem]">{tr("about.languagesTitle")}</h2>
        <ul className="space-y-2 text-foreground/90">
          {languages.map((l) => (<li key={l}>{l}</li>))}
        </ul>
      </section>

      {/* 5. Technical skills */}
      <section className="mt-16 max-w-[720px]">
        <h2 className="mb-6 text-[1.25rem]">{tr("about.skillsTitle")}</h2>
        <ul className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <li
              key={s}
              className="border border-border rounded-[4px] bg-card px-3 py-1.5 text-[14px] text-foreground/90"
            >
              {s}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
