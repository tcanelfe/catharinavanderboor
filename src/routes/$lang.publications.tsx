import { createFileRoute, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import "@/i18n";
import { isLang, type Lang, getContent } from "@/content";

const ORCID_URL = "https://orcid.org/0000-0003-2710-7601";

interface Publication {
  authors: string;
  year: string;
  title: string;
  journal: string;
  extra?: string;
  url: string;
}

const selectedPublications: Publication[] = [
  {
    authors: "Bogdanov, S; Koss, K; Hook, K; Moore, Q; VAN DER BOOR, C; Masazza, A; Fuhr, DC; Roberts, B; MAY, C; Fedorets, O; Bayer, O; Karachevskyy, A; NADKARNI, A;",
    year: "2025",
    title: "Corrigendum to 'Explanatory models and coping with alcohol misuse among conflict-affected men in Ukraine'",
    journal: "SSM – Mental Health",
    extra: "7, 100398",
    url: "https://www.sciencedirect.com/science/article/pii/S2666560325001781?via%3Dihub",
  },
  {
    authors: "VAN DER BOOR, CF; Kachai, V; Harbar, K; Pastukhova, A; NEUMAN, M; WEISS, HA; GRECO, G; MAY, C; NADKARNI, A; ROBERTS, B; Bogdanov, S; Fuhr, DC;",
    year: "2025",
    title: "Effectiveness and cost-effectiveness of a transdiagnostic intervention targeting alcohol misuse and psychological distress for men in Ukraine: study protocol for a randomised controlled trial.",
    journal: "Trials",
    url: "https://link.springer.com/article/10.1186/s13063-025-09143-8",
  },
  {
    authors: "NADKARNI, A; VAN DER BOOR, C; Ndlovu, JN; Taban, D; Tol, WA; ROBERTS, B; WEISS, HA; Akellot, J; Singh, S; NEUMAN, M; MAY, C; KINYANDA, E; Fuhr, DC;",
    year: "2025",
    title: "Acceptability and feasibility of CHANGE, a non-specialist worker delivered intervention to address alcohol use disorders and psychological distress among conflict-affected populations in Uganda: a qualitative study.",
    journal: "Journal of Migration and Health",
    url: "https://www.sciencedirect.com/science/article/pii/S2666623525000595?via%3Dihub",
  },
  {
    authors: "VAN DER BOOR, CF; Agudelo-Ortiz, DM; Sánchez Díaz, GC; Molina-Bulla, CI; Guevara Morales, LJ; Chiumento, A; Aponte Canencio, DM; White, R;",
    year: "2025",
    title: "The intercultural development and validation of the Indigenous 'Escala de Bienestar Kankuamo' (Kankuamo Well-Being Scale): A capability approach.",
    journal: "Transcultural Psychiatry",
    url: "https://journals.sagepub.com/doi/10.1177/13634615251359777",
  },
  {
    authors: "Bogdanov, S; Koss, K; Hook, K; Moore, Q; VAN DER BOOR, C; Masazza, A; Fuhr, DC; ROBERTS, B; MAY, C; Fedorets, O; Bayer, O; Karachevskyy, A; NADKARNI, A;",
    year: "2025",
    title: "Explanatory models and coping with alcohol misuse among conflict-affected men in Ukraine.",
    journal: "SSM. Mental Health",
    url: "https://www.sciencedirect.com/science/article/pii/S2666560325000106?via%3Dihub",
  },
  {
    authors: "Chaparro Rojas, LA; De La Cruz, PE; Chiumento, A; VAN DER BOOR, CF; Molina-Bulla, CI; Baquero Vargas, MP; Sánchez Díaz, GC; Agudelo-Ortiz, DM; Guevara Morales, LJ; Aponte-Canencio, DM; White, RG;",
    year: "2025",
    title: "Exploring the application of the capability approach to the health and well-being of Indigenous Peoples: a scoping review.",
    journal: "Global Mental Health (Cambridge, England)",
    url: "https://www.cambridge.org/core/journals/global-mental-health/article/exploring-the-application-of-the-capability-approach-to-the-health-and-wellbeing-of-indigenous-peoples-a-scoping-review/67B411D00EE8E12100D72307CEFDDDE0",
  },
  {
    authors: "Andersen, LS; VAN DER BOOR, CF; NADKARNI, A; Taban, D; Massazza, A; Fuhr, DC; ROBERTS, B; Upadhaya, N; Tol, WA; KINYANDA, E;",
    year: "2024",
    title: "Developing an explanatory model of alcohol misuse among South Sudanese refugees in northern Uganda: A qualitative study",
    journal: "SSM – Mental Health",
    url: "https://www.sciencedirect.com/science/article/pii/S2666560324000719?via%3Dihub",
  },
  {
    authors: "Boor, CV D; Sánchez-Díaz, GC; Guevara-Morales, LJ; Molina-Bulla, CI; Agudelo-Ortiz, DM; Montero-Villazón, AJ; Villazón-Rodríguez, MD J; Maestre-Arias, L; Aponte-Canencio, DM;",
    year: "2024",
    title: '"Good life is to be in peace and harmony with everything around us": a qualitative study on good living among the Kankuamo Indigenous people of Colombia.',
    journal: "Cadernos de Saúde Pública",
    url: "https://www.scielo.br/j/csp/a/J6XrLGZsCQ4f5DF6qC3bksG/?lang=es",
  },
  {
    authors: "VAN DER BOOR, CF; Taban, D; Ismail, K; Simon, J; ROBERTS, B; Fuhr, D; Tol, WA; GRECO, G;",
    year: "2024",
    title: "Measuring refugees' capabilities: translation, adaptation, and valuation of the OxCAP-MH into Juba Arabic for use among South Sudanese male refugees in Uganda.",
    journal: "Journal of Patient-Reported Outcomes",
    url: "https://link.springer.com/article/10.1186/s41687-024-00720-0",
  },
  {
    authors: "VAN DER BOOR, CF; Taban, D; Tol, WA; Akellot, J; NEUMAN, M; WEISS, HA; GRECO, G; VASSALL, A; MAY, C; NADKARNI, A; KINYANDA, E; ROBERTS, B; Fuhr, DC;",
    year: "2024",
    title: "Correction: Effectiveness and cost-effectiveness of a transdiagnostic intervention for alcohol misuse and psychological distress in humanitarian settings: study protocol for a randomised controlled trial in Uganda.",
    journal: "Trials",
    url: "https://pubmed.ncbi.nlm.nih.gov/38515145/",
  },
];

function highlightAuthor(authors: string) {
  const parts = authors.split(/(VAN DER BOOR,\s*(?:C|CF)\b)/gi);
  return parts.map((part, i) => {
    if (/VAN DER BOOR,\s*(?:C|CF)/i.test(part)) {
      return (
        <strong key={i} className="font-semibold">
          {part}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

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
        ? "Publicaciones revisadas por pares en salud mental global, desplazamiento forzado y SMAPS. Lista completa en ORCID."
        : "Peer-reviewed publications in global mental health, forced displacement, and MHPSS. Full list on ORCID.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/${lang}/publications` },
        { property: "og:locale", content: c.ogLocale },
        { property: "og:image", content: "/og-image.jpg" },
        { name: "twitter:image", content: "/og-image.jpg" },
      ],

      links: [
        { rel: "canonical", href: `/${lang}/publications` },
        { rel: "alternate", hrefLang: lang, href: `/${lang}/publications` },
        { rel: "alternate", hrefLang: otherLang, href: `/${otherLang}/publications` },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name:
              lang === "es"
                ? "Publicaciones seleccionadas — Catharina van der Boor"
                : "Selected publications — Catharina van der Boor",
            url: `/${lang}/publications`,
            numberOfItems: selectedPublications.length,
            itemListElement: selectedPublications.map((pub, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "ScholarlyArticle",
                name: pub.title,
                headline: pub.title,
                datePublished: pub.year,
                url: pub.url,
                author: pub.authors
                  .split(";")
                  .map((a) => a.trim())
                  .filter(Boolean)
                  .map((name) => ({ "@type": "Person", name })),
                isPartOf: {
                  "@type": "Periodical",
                  name: pub.journal,
                },
              },
            })),
          }),
        },
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
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-[15px] no-underline hover:no-underline hover:bg-primary/90 rounded-[4px] transition-[transform,background-color] duration-[160ms] ease-out motion-safe:active:scale-[0.97]"
        >
          {t("publications.orcidButton", { lng: lang })} →
        </a>
      </div>

      <section className="mt-14">
        <h2 className="mb-6 text-[1.25rem]">{t("publications.selectedTitle", { lng: lang })}</h2>
        <ol className="space-y-6">
          {selectedPublications.map((pub, i) => (
            <li key={i} className="text-[15px] leading-relaxed">
              <p className="text-foreground/80">
                {highlightAuthor(pub.authors)} ({pub.year}).{" "}
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  {pub.title}
                </a>{" "}
                <em>{pub.journal}</em>
                {pub.extra ? `, ${pub.extra}` : ""}.
              </p>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
