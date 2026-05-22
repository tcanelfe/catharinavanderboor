import { createFileRoute, notFound } from "@tanstack/react-router";
import { getContent, isLang, type Lang } from "@/content";

export const Route = createFileRoute("/$lang/publications")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  head: ({ params }) => {
    const lang = (isLang(params.lang) ? params.lang : "en") as Lang;
    const c = getContent(lang);
    const otherLang = lang === "en" ? "es" : "en";
    return {
      meta: [
        { title: c.publications.metaTitle },
        { name: "description", content: c.publications.metaDescription },
        { property: "og:title", content: c.publications.metaTitle },
        { property: "og:description", content: c.publications.metaDescription },
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
  const c = getContent(lang);
  const p = c.publications;

  return (
    <article className="mx-auto max-w-[720px] px-6 py-16">
      <h1 className="mb-8">{p.title}</h1>
      <p className="text-foreground/90 text-[17px]">{p.intro}</p>

      <section className="mt-12">
        <h2 className="mb-5 text-[1.25rem]">{p.listTitle}</h2>
        <p className="text-foreground/85 italic border-l-2 border-border pl-5 py-2">{p.placeholder}</p>
      </section>

      <section className="mt-12 border-t border-border pt-8">
        <p>
          <span className="text-foreground/90">{p.orcidLabel}: </span>
          <span className="text-muted-foreground italic">{p.orcidNote}</span>
        </p>
      </section>
    </article>
  );
}
