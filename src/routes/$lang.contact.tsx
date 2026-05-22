import { createFileRoute, notFound } from "@tanstack/react-router";
import { getContent, isLang, type Lang } from "@/content";
import { useState } from "react";

export const Route = createFileRoute("/$lang/contact")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  head: ({ params }) => {
    const lang = (isLang(params.lang) ? params.lang : "en") as Lang;
    const c = getContent(lang);
    const otherLang = lang === "en" ? "es" : "en";
    return {
      meta: [
        { title: c.contact.metaTitle },
        { name: "description", content: c.contact.metaDescription },
        { property: "og:title", content: c.contact.metaTitle },
        { property: "og:description", content: c.contact.metaDescription },
        { property: "og:url", content: `/${lang}/contact` },
        { property: "og:locale", content: c.ogLocale },
      ],
      links: [
        { rel: "canonical", href: `/${lang}/contact` },
        { rel: "alternate", hrefLang: lang, href: `/${lang}/contact` },
        { rel: "alternate", hrefLang: otherLang, href: `/${otherLang}/contact` },
      ],
    };
  },
  component: ContactPage,
});

const FORMSPREE = (import.meta as any).env?.VITE_FORMSPREE_ENDPOINT as string | undefined;

function ContactPage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const c = getContent(lang);
  const k = c.contact;
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!FORMSPREE) return;
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <article className="mx-auto max-w-[720px] px-6 py-16">
      <h1 className="mb-8">{k.title}</h1>
      <p className="text-foreground/90 text-[17px]">{k.intro}</p>

      <section className="mt-10 border border-border rounded-[4px] p-6 bg-card">
        <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground mb-2">{k.emailLabel}</p>
        <p className="font-serif text-[1.1rem]">{k.emailValue}</p>
      </section>

      <section className="mt-12">
        <h2 className="mb-6 text-[1.25rem]">{k.formTitle}</h2>

        {!FORMSPREE && (
          <p className="mb-6 border-l-2 border-primary pl-4 py-2 text-[15px] text-foreground/85 bg-secondary">
            {k.notConfigured}
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          <Field id="name" label={k.fields.name} required>
            <input id="name" name="name" type="text" required autoComplete="name" className={fieldCls} />
          </Field>
          <Field id="organisation" label={k.fields.organisation} required>
            <input id="organisation" name="organisation" type="text" required autoComplete="organization" className={fieldCls} />
          </Field>
          <Field id="email" label={k.fields.email} required>
            <input id="email" name="email" type="email" required autoComplete="email" className={fieldCls} />
          </Field>
          <Field id="purpose" label={k.fields.purpose} required>
            <select id="purpose" name="purpose" required className={fieldCls} defaultValue="">
              <option value="" disabled>—</option>
              {k.fields.purposeOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>
          <Field id="message" label={k.fields.message} required>
            <textarea id="message" name="message" required rows={6} className={fieldCls} />
          </Field>

          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div className="pt-2">
            <button
              type="submit"
              disabled={!FORMSPREE || status === "submitting"}
              className="bg-primary text-primary-foreground px-6 py-3 text-[15px] rounded-[4px] hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? k.submitting : k.submit}
            </button>
          </div>

          {status === "success" && (
            <p role="status" className="text-[15px] text-primary border-l-2 border-primary pl-4 py-1">{k.success}</p>
          )}
          {status === "error" && (
            <p role="alert" className="text-[15px] text-destructive border-l-2 border-destructive pl-4 py-1">{k.error}</p>
          )}
        </form>
      </section>
    </article>
  );
}

const fieldCls =
  "w-full bg-background border border-border rounded-[4px] px-3 py-2.5 text-[15px] text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[14px] text-foreground/90">
        {label}{required && <span className="text-muted-foreground"> *</span>}
      </label>
      {children}
    </div>
  );
}
