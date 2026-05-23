## Plan: Slim About + Restore refocused Research tab

### About page (lighter overview)
- Replace `about.bio` (EN + ES) with the single short paragraph:
  > "I work on mental health support for people affected by conflict and displacement. My focus is making interventions work in the real world when they're delivered at scale, in low-resource and humanitarian settings."
- Remove from About page (move to Research): Methods section, Themes section. Keep: bio + headshot, timeline, education, leadership, languages, technical skills.
- Drop `about.methods` / `about.themes` keys + their rendering in `src/routes/$lang.about.tsx`.

### Research tab (recreate, refocused)
- Recreate `src/routes/$lang.research.tsx` (was deleted in earlier turn). No "Current projects" section (those live on the landing page already).
- Sections:
  1. Short intro paragraph about research focus (refined version of existing `research.intro` — kept).
  2. **Methods** chips: Qualitative, Quantitative, Mixed methods, Systematic reviews, Participatory action research.
  3. **Themes** chips: Mental health and psychosocial support, Forced displacement, Conflict, Implementation science, Transcultural care.
  4. Closing CTA line:
     > "Interested in this kind of work for your organisation? Here's how I work with clients." — with "how I work with clients" linking to `/$lang/consultancy`.
- Update `en.json` / `es.json` `research.*` block: keep `intro`, replace `methods`/`themes` arrays to match the About lists, drop `projects`/`projectsTitle`/`methodsBody`, add `ctaText` + `ctaLink` strings.

### Nav + sitemap
- Re-add Research link to header nav in `src/routes/$lang.tsx` (between About and Consultancy).
- Re-add `/en/research` + `/es/research` to `src/routes/sitemap[.]xml.ts`.
- Restore landing page secondary CTA "Read research" → `/$lang/research` in `src/routes/$lang.index.tsx`.

### Files touched
- `src/i18n/locales/en.json`, `src/i18n/locales/es.json`
- `src/routes/$lang.about.tsx`
- `src/routes/$lang.research.tsx` (recreate)
- `src/routes/$lang.tsx` (nav)
- `src/routes/$lang.index.tsx` (CTA link)
- `src/routes/sitemap[.]xml.ts`
