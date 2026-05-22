import { createFileRoute, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import "@/i18n";
import { isLang, type Lang, getContent } from "@/content";

const EMAIL = "Catharina.van-der-boor@lshtm.ac.uk";
const FORMSPREE =
  ((import.meta as any).env?.VITE_FORMSPREE_ENDPOINT as string | undefined) ||
  "https://formspree.io/f/REPLACE_ME";

export const Route = createFileRoute("/$lang/contact")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  head: ({ params }) => {
    const lang = (isLang(params.lang) ? params.lang : "en") as Lang;
    const c = getContent(lang);
    const otherLang = lang === "en" ? "es" : "en";
    const title =
      lang === "es"
        ? "Contacto — Catharina van der Boor"
        : "Contact — Catharina van der Boor";
    const description =
      lang === "es"
        ? "Consultas de consultoría, colaboración en investigación o medios. Formulario y correo directo."
        : "Consultancy enquiries, research collaboration, or media requests. Form and direct email.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/${lang}/contact` },
        { property: "og:locale", content: c.ogLocale },
        { property: "og:image", content: "/og-image.jpg" },
        { name: "twitter:image", content: "/og-image.jpg" },
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

function ContactPage() {
  const { lang } = Route.useParams() as { lang: Lang };
  const { t, i18n } = useTranslation();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const purposeOptions = t("contact.fields.purposeOptions", {
    lng: lang,
    returnObjects: true,
  }) as Array<{ value: string; label: string }>;

  const isPlaceholder = FORMSPREE.includes("REPLACE_ME");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPlaceholder) return;
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
      <h1 className="mb-8">{t("contact.title", { lng: lang })}</h1>
      <p className="text-foreground/90 text-[17px]">{t("contact.intro", { lng: lang })}</p>

      <section className="mt-10 border border-border rounded-[4px] p-6 bg-card space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground mb-2">
            {t("contact.emailLabel", { lng: lang })}
          </p>
          <a href={`mailto:${EMAIL}`} className="font-serif text-[1.1rem] text-foreground hover:text-primary">
            {EMAIL}
          </a>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground mb-2">LinkedIn</p>
          <a
            href="https://www.linkedin.com/in/vanderboor"
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif text-[1.1rem] text-foreground hover:text-primary"
          >
            linkedin.com/in/vanderboor
          </a>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-6 text-[1.25rem]">{t("contact.formTitle", { lng: lang })}</h2>

        {isPlaceholder && (
          <p className="mb-6 border-l-2 border-primary pl-4 py-2 text-[15px] text-foreground/85 bg-secondary">
            {t("contact.notConfigured", { lng: lang })}
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          <Field id="name" label={t("contact.fields.name", { lng: lang })} required>
            <input id="name" name="name" type="text" required autoComplete="name" className={fieldCls} />
          </Field>
          <Field id="email" label={t("contact.fields.email", { lng: lang })} required>
            <input id="email" name="email" type="email" required autoComplete="email" className={fieldCls} />
          </Field>
          <Field id="organisation" label={t("contact.fields.organisation", { lng: lang })} required>
            <input
              id="organisation"
              name="organisation"
              type="text"
              required
              autoComplete="organization"
              className={fieldCls}
            />
          </Field>
          <Field id="purpose" label={t("contact.fields.purpose", { lng: lang })} required>
            <select id="purpose" name="purpose" required className={fieldCls} defaultValue="">
              <option value="" disabled>—</option>
              {purposeOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>
          <Field id="message" label={t("contact.fields.message", { lng: lang })} required>
            <textarea id="message" name="message" required rows={6} className={fieldCls} />
          </Field>

          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPlaceholder || status === "submitting"}
              className="bg-primary text-primary-foreground px-6 py-3 text-[15px] rounded-[4px] hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting"
                ? t("contact.submitting", { lng: lang })
                : t("contact.submit", { lng: lang })}
            </button>
          </div>

          {status === "success" && (
            <p role="status" className="text-[15px] text-primary border-l-2 border-primary pl-4 py-1">
              {t("contact.success", { lng: lang })}
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="text-[15px] text-destructive border-l-2 border-destructive pl-4 py-1">
              {t("contact.error", { lng: lang })}
            </p>
          )}
        </form>
      </section>
    </article>
  );
}

const fieldCls =
  "w-full bg-background border border-border rounded-[4px] px-3 py-2.5 text-[15px] text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[14px] text-foreground/90">
        {label}
        {required && <span className="text-muted-foreground"> *</span>}
      </label>
      {children}
    </div>
  );
}
