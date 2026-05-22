
# Plan: Dr. Catharina van der Boor — Academic Consultancy Site

A sober, fast, bilingual (EN/ES) personal site funneling every page toward one qualified contact form. No backend, no Supabase.

## 1. Information architecture

Routes mirror the brief, with a language prefix. Default `/` redirects to `/en`.

```
/                       -> redirect to /en
/en                     Home
/en/about               About
/en/research            Research
/en/consultancy         Consultancy
/en/publications        Publications
/en/contact             Contact
/es                     Inicio
/es/sobre-mi            Sobre mí
/es/investigacion       Investigación
/es/consultoria         Consultoría
/es/publicaciones       Publicaciones
/es/contacto            Contacto
```

A pathless `_lang` layout route (e.g. `routes/$lang.tsx`) provides the shared header (nav + EN/ES toggle), main landmark, and footer; child routes render via `<Outlet />`. The toggle swaps between matching EN/ES routes on every page.

A small `src/content/{en,es}.ts` module holds all copy as typed objects. Pages render from this module — no mixed-language pages. Initially I will scaffold pages with **clearly-marked placeholders** for any specific claim (publications, project names, client names, dates) not provided in this brief, so nothing is invented. The user fills these in on the next pass.

## 2. Pages — content blocks

**Home** (`/en`)
- Above-the-fold: name + one-line role ("Global Mental Health researcher and consultant"), 2–3 line hook on what she does, primary teal CTA → Contact.
- Three credibility anchors as plain bordered cards: (a) MHPSS programme design in conflict-affected settings, (b) cultural adaptation & psychometric validation, (c) implementation science for scalable interventions.
- Geographies line: Uganda · Ukraine · Colombia · Sweden · India · Switzerland · UK · Netherlands · Andorra (+ monitoring: Syria, Somalia, Sudan).
- Closing CTA back to Contact.

**About** — bio, positionality statement (placeholder), languages spoken, academic timeline as a vertical typographic list, "Academic roles" with Universitat Carlemany listed once, no link, no detail. Schema.org `Person` JSON-LD here.

**Research** — current projects (placeholders), methodological expertise (R, NVivo, mixed methods, psychometrics, implementation science), thematic areas.

**Consultancy** — services (the six bullets from the brief), engagement models (short-term advisory, evaluation lead, training, technical writing — drafted, user can edit), past clients section as a placeholder list to be filled in.

**Publications** — placeholder list of 6–10 selected publications + prominent link to ORCID (URL placeholder until provided).

**Contact** — short intro, form (name, organisation, email, purpose dropdown, message), LSHTM email displayed as plain text/mailto link. Spanish form uses *usted*. No phone. Submits to Formspree (endpoint via `VITE_FORMSPREE_ENDPOINT`; until set, the form shows a clear "not yet configured" notice rather than failing silently).

## 3. Design system

Tokens written into `src/styles.css` (oklch, with hex equivalents in comments for clarity):

- `--background` = #FAFAF7 (warm off-white)
- `--foreground` = #1A1A1A
- `--muted-foreground` = #5C5C5C
- `--accent` (teal) = #1F4E5F — used only for links, primary CTA, active nav
- `--border` = #E5E5E0
- `--radius` = 4px (cap)
- Shadow: only `0 1px 2px rgba(0,0,0,0.04)` for the contact form input focus
- No gradients, no glass, no emoji

Typography via Google Fonts in `__root.tsx` head links:
- Headings: **Source Serif 4** (400, 600)
- Body: **Inter** (400, 500), 16–17px, line-height 1.6
- Two families only

Layout:
- `max-w-[720px]` for prose pages; `max-w-[1100px]` for home grid
- 8px spacing scale (Tailwind defaults already align)
- Mobile-first, max two columns on desktop
- Buttons: solid teal, white text, `rounded-[4px]`, no shadow
- Links: teal, underline on hover, visible focus ring (WCAG AA)
- Cards: 1px `--border`, no shadow, `rounded-[4px]`

## 4. SEO + performance + a11y

- Per-route `head()` with route-specific `title`, `description`, `og:title`, `og:description`, `og:url`, `og:locale` (`en_GB` / `es_ES`), and `<link rel="alternate" hreflang>` pairs pointing EN↔ES counterparts. Canonical only on leaf routes.
- `__root.tsx` keeps sitewide defaults (`og:type=website`, `og:site_name`, viewport) — no `og:image` at root.
- `Person` JSON-LD on `/en/about` and `/es/sobre-mi`.
- `public/robots.txt` with `Allow: /`.
- Server route `src/routes/sitemap[.]xml.ts` listing all 12 localized routes; `BASE_URL = ""` placeholder until the domain is set.
- Single `<main>` per route via the `$lang` layout.
- Semantic HTML, real focus states, alt text on every image, h1/h2 order, skip-to-content link.
- No heavy libraries: no framer-motion, no carousel, no chart kit. Just Tailwind + shadcn primitives (Button, Input, Textarea, Select, Label) for the form.
- No analytics in v1 (per brief).

## 5. Things I will NOT do

- No phone number anywhere.
- No prominent mention of Universitat Carlemany (single line under About → Academic roles, no link).
- No invented publications, clients, awards, or quotes — placeholders clearly marked `[to confirm]`.
- No stock people photos. Where an image slot would normally sit, I use a restrained typographic block or a thin bordered abstract geometric placeholder.
- No emoji, gradients-as-decoration, shimmer, or floating glass.
- No backend / Supabase / auth.

## Technical notes

- Stack stays TanStack Start. Routes under `src/routes/` using the flat dot/dollar convention; `$lang.tsx` as the layout route renders `<Outlet />`.
- Index route `src/routes/index.tsx` does a 302 to `/en` via `beforeLoad` + `redirect()`.
- Content module: `src/content/en.ts`, `src/content/es.ts`, exported through `src/content/index.ts` keyed by language; pages call `getContent(lang).home.hero` etc.
- Language toggle component reads the current route's `$lang` param and swaps to the equivalent path; mapping table lives next to the content module.
- Formspree endpoint via `import.meta.env.VITE_FORMSPREE_ENDPOINT`. Form posts with `fetch`, shows inline success/error states, no redirect.
- Fonts loaded via `<link rel="preconnect">` + `<link rel="stylesheet">` in root `head()` for fastest LCP.
- Lighthouse target 95+: no client-side JS beyond the form handler and the language toggle.

## Open questions before I build

1. **ORCID URL** and **LSHTM email** — exact strings to embed?
2. **Formspree endpoint** — do you have one, or should I leave a `VITE_FORMSPREE_ENDPOINT` placeholder and a clear "not configured" notice on the form?
3. **Academic timeline** — do you want me to scaffold the timeline structure with `[to confirm]` entries, or wait until you paste the CV bullets?
4. **Publications list** — same: scaffold with placeholders, or pause that page until you provide 6–10 selected entries?

I can proceed with placeholders for all four if you'd rather not block; just say "go with placeholders".
