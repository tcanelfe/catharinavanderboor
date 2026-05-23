## Plan

### 1. Merge Research into About (remove Research tab)

- Add a "Methods" and "Themes" section to the About page, after Leadership (or before Languages).
- Keep About page intro short — replace the current 3-paragraph third-person bio with the new first-person "Hi there, my name is Carine…" text (single paragraph).
- Remove the "Current projects" content from Research entirely (it duplicates the landing page).
- Delete the `/research` route file (`src/routes/$lang.research.tsx`) and remove the Research link from the header nav.
- Update sitemap to drop `/research`.

### 2. Update Methods and Themes (now on About)

- **Methods**: Qualitative, quantitative, mixed methods, systematic reviews, participatory action research.
- **Themes**: Mental health and psychosocial support, Forced displacement, Conflict, Implementation Science, Transcultural care.

### 3. Update About bio text (EN + ES)

Replace `about.bio` with:
> "Hi there, my name is Carine (short for Catharina). For the last eight years I've worked in global mental health, focusing on people who have been forcibly displaced by conflict or disaster. I care deeply about social justice and about decolonising research: working with affected communities rather than studying them, and designing projects around the needs they identify themselves. That commitment shapes both how I work and what I work on. When I take on a project, I bring the same motivation to it: careful methods, honest answers, and a real dedication to the people the work is meant to serve."

Mirror in Spanish.

### 4. Trim Leadership list (EN + ES)

Keep only the first two items:
- Associate Editor of Conflict and Health (2025–present); expert reviewer for The Lancet Psychiatry, Global Mental Health, Trials, and Social Psychiatry and Psychiatric Epidemiology.
- Co-founder and board member of the Mental Health and Psychosocial Research Network.

(Remove the mentor clause from item 2, plus items 3, 4, and 5 entirely.)

### Files to edit
- `src/i18n/locales/en.json`, `src/i18n/locales/es.json` — bio, leadership, methods/themes carry-over.
- `src/routes/$lang.about.tsx` — add Methods + Themes sections.
- `src/routes/$lang.research.tsx` — delete.
- Header nav component — remove Research link.
- `src/routes/sitemap[.]xml.ts` — remove `/research`.

### Note / push-back
Removing the Research tab means the research narrative (intro + methods + themes) lives only on About, and the URL `/{lang}/research` will 404. If anything currently links to it externally, those links break. Let me know if you'd rather **keep the Research route as a redirect** to About, or fully drop it.
