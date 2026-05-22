import { createFileRoute, notFound } from "@tanstack/react-router";
import { getContent, isLang, type Lang } from "@/content";

export const Route = createFileRoute("/$lang/about")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  head: ({ params }) => {
    const lang = (isLang(params.lang) ? params.lang : "en") as Lang;
    const c = getContent(lang);
    const otherLang = lang === "en" ? "es" : "en";
    return {
      meta: [
        { title: c.about.metaTitle },
        { name: "description", content: c.about.metaDescription },
        { property: "og:title", content: c.about.metaTitle },
        { property: "og:description", content: c.about.metaDescription },
        { property: "og:url", content: `/${lang}/about` },
        { property: "og:locale", content: c.ogLocale },
        { property: "og:type", content: "profile" },
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
            jobTitle: c.role,
            affiliation: {
              "@type": "Organization",
              name: "London School of Hygiene & Tropical Medicine",
            },
            url: `/${lang}/about`,
          }),
        },
      ],
    };
  },
  component: AboutPage,
});

function AboutPage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const c = getContent(lang);
  const a = c.about;

  return (
    <article className="mx-auto max-w-[720px] px-6 py-16">
      <h1 className="mb-10">{a.title}</h1>
      <div className="space-y-5 text-foreground/90">
        {a.bio.map((p, i) => (<p key={i}>{p}</p>))}
      </div>

      <Section title={a.positionalityTitle}>
        <p className="text-foreground/85">{a.positionality}</p>
      </Section>

      <Section title={a.languagesTitle}>
        <p className="text-foreground/85">{a.languages}</p>
      </Section>

      <Section title={a.timelineTitle}>
        <ul className="space-y-4">
          {a.timeline.map((t, i) => (
            <li key={i} className="grid grid-cols-[120px_1fr] gap-4 border-b border-border pb-4 last:border-0">
              <span className="text-sm uppercase tracking-wide text-muted-foreground">{t.period}</span>
              <span className="text-foreground/90">{t.entry}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={a.rolesTitle}>
        <ul className="space-y-2 text-foreground/90">
          {a.roles.map((r, i) => (<li key={i}>{r}</li>))}
        </ul>
      </Section>

      <p className="mt-16 text-sm text-muted-foreground italic">{a.placeholderNote}</p>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="mb-5 text-[1.25rem]">{title}</h2>
      {children}
    </section>
  );
}
