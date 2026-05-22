import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getContent, isLang, type Lang } from "@/content";

export const Route = createFileRoute("/$lang/consultancy")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  head: ({ params }) => {
    const lang = (isLang(params.lang) ? params.lang : "en") as Lang;
    const c = getContent(lang);
    const otherLang = lang === "en" ? "es" : "en";
    return {
      meta: [
        { title: c.consultancy.metaTitle },
        { name: "description", content: c.consultancy.metaDescription },
        { property: "og:title", content: c.consultancy.metaTitle },
        { property: "og:description", content: c.consultancy.metaDescription },
        { property: "og:url", content: `/${lang}/consultancy` },
        { property: "og:locale", content: c.ogLocale },
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
  const c = getContent(lang);
  const x = c.consultancy;

  return (
    <article className="mx-auto max-w-[720px] px-6 py-16">
      <h1 className="mb-8">{x.title}</h1>
      <p className="text-foreground/90 text-[17px]">{x.intro}</p>

      <section className="mt-14">
        <h2 className="mb-6 text-[1.25rem]">{x.servicesTitle}</h2>
        <div className="space-y-5">
          {x.services.map((s) => (
            <div key={s.title} className="border-l-2 border-primary pl-5 py-1">
              <h3 className="text-[1.05rem] mb-2">{s.title}</h3>
              <p className="text-[15.5px] text-foreground/85">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-6 text-[1.25rem]">{x.engagementsTitle}</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {x.engagements.map((e) => (
            <div key={e.title} className="border border-border p-5 rounded-[4px] bg-card">
              <h3 className="text-[1rem] mb-2">{e.title}</h3>
              <p className="text-[15px] text-foreground/85">{e.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-5 text-[1.25rem]">{x.clientsTitle}</h2>
        <p className="text-foreground/85 italic">{x.clientsNote}</p>
      </section>

      <div className="mt-14 border-t border-border pt-10">
        <Link
          to="/$lang/contact"
          params={{ lang }}
          className="inline-block bg-primary text-primary-foreground px-6 py-3 text-[15px] no-underline hover:no-underline hover:bg-primary/90 rounded-[4px]"
        >
          {x.cta} →
        </Link>
      </div>
    </article>
  );
}
