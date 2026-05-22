import { createFileRoute, notFound } from "@tanstack/react-router";
import { getContent, isLang, type Lang } from "@/content";

export const Route = createFileRoute("/$lang/research")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  head: ({ params }) => {
    const lang = (isLang(params.lang) ? params.lang : "en") as Lang;
    const c = getContent(lang);
    const otherLang = lang === "en" ? "es" : "en";
    return {
      meta: [
        { title: c.research.metaTitle },
        { name: "description", content: c.research.metaDescription },
        { property: "og:title", content: c.research.metaTitle },
        { property: "og:description", content: c.research.metaDescription },
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
  const c = getContent(lang);
  const r = c.research;

  return (
    <article className="mx-auto max-w-[720px] px-6 py-16">
      <h1 className="mb-8">{r.title}</h1>
      <p className="text-foreground/90 text-[17px]">{r.intro}</p>

      <section className="mt-14">
        <h2 className="mb-6 text-[1.25rem]">{r.projectsTitle}</h2>
        <div className="space-y-6">
          {r.projects.map((p, i) => (
            <div key={i} className="border border-border p-5 rounded-[4px] bg-card">
              <h3 className="text-[1.05rem] mb-2">{p.title}</h3>
              <p className="text-[15.5px] text-foreground/85">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-5 text-[1.25rem]">{r.methodsTitle}</h2>
        <ul className="grid gap-2 sm:grid-cols-2 list-disc list-inside text-foreground/90 marker:text-primary">
          {r.methods.map((m) => (<li key={m}>{m}</li>))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="mb-5 text-[1.25rem]">{r.themesTitle}</h2>
        <ul className="space-y-2 list-disc list-inside text-foreground/90 marker:text-primary">
          {r.themes.map((t) => (<li key={t}>{t}</li>))}
        </ul>
      </section>
    </article>
  );
}
