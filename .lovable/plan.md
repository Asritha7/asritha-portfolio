## Goal
Redesign the existing portfolio into a credible Software Engineer portfolio while preserving the current cream/terracotta editorial aesthetic, typography, and restrained motion. Reposition consistently as "Software Engineer," add three featured case studies as their own routes, and tighten content, accessibility, SEO, and the contact form.

## Confirmations needed before I start
A few items I won't guess at — please confirm or mark "leave as placeholder":

1. **Case-study content.** I'll scaffold the three case studies (`/work/api-infrastructure`, `/work/observability`, `/work/kafka-kubernetes`) with the full section structure (Overview → Lessons learned) but use clearly-marked `[TBD]` placeholders for: specific architecture details, metrics, ownership level ("led" vs "contributed to"), and any technology names that might be sensitive. You'll fill these in. OK?
2. **"Best Efforts"** — award or nomination? (I'll mark `[confirm]` if you'd rather decide later.)
3. **"60% metric"** — reduced effort or reduced cycle time?
4. **Contact form via Resend.** This needs Lovable Cloud + the Resend connector + your verified sender domain. Want me to enable Cloud and wire it up now, or keep the current mailto form until you're ready?
5. **Analytics.** Any preference (Plausible, Umami, GA4, none)? Default: skip until you choose one — privacy-friendly options need a key/domain.
6. **Three "public engineering" repo cards** — placeholder cards with `[Coming soon]` and no GitHub link until you publish the repos, correct?

## Plan

### 1. Information architecture & shared data
- New `src/content/portfolio.ts` — single source of truth for hero copy, experience, case-study metadata, principles, capabilities, research. Existing sections re-read from this so nothing contradicts.
- Add types so case-study pages and homepage cards share the same shape.

### 2. Routes
- `src/routes/index.tsx` — restructured homepage (sequence below).
- `src/routes/work.api-infrastructure.tsx`
- `src/routes/work.observability.tsx`
- `src/routes/work.kafka-kubernetes.tsx`
- Each case-study route: own `head()` (title, description, og:title/description, canonical, Article JSON-LD), back-link, full section structure, simple inline SVG architecture diagram with `<title>`/`<desc>` for a11y, and the confidentiality notice where applicable.

### 3. Homepage sequence (replaces current)
1. Hero — new eyebrow / headline / description / CTAs, "Based in Bengaluru, India" chip, education shown separately from location.
2. Featured case studies (3 cards → routes).
3. Professional experience — scope statement + 3-5 contributions per role, action verbs, no QA framing.
4. Engineering principles — the 5 you listed, short prose each.
5. Technical capabilities — your 6 grouped categories, plain chips (no bars/percentages).
6. Published research — IEEE RFID/PIN entry preserved.
7. Earlier projects — collapsed `<details>`, SONAR & YouTube links kept.
8. Contact.
- Remove the duplicated Now / Toolkit / About-bio blocks; keep the marquee (it's restrained) but trim its label.

### 4. Components
- `src/components/CaseStudyCard.tsx`, `CaseStudyLayout.tsx`, `ArchitectureDiagram.tsx` (simple SVG wrapper), `SectionHeading.tsx`, `ContactForm.tsx` (rebuilt with zod, inline errors, loading/success/error states, honeypot, basic in-memory rate limit; wired to Resend only if you greenlight #4).

### 5. Accessibility & motion
- Single `<main>`, proper landmark/heading order, visible focus rings on all interactive elements, `prefers-reduced-motion` already respected — extend to marquee + reveal hooks. Verify contrast for both themes against the cream/terracotta tokens.

### 6. SEO
- Homepage title → "Asritha Nibhanupudi | Software Engineer"
- Homepage meta description → your provided copy.
- Each case-study route → unique title/description, canonical, Article JSON-LD.
- `__root.tsx` — keep WebSite + Person JSON-LD; remove leaf-only tags.
- `public/robots.txt` updated; `src/routes/sitemap[.]xml.ts` server route listing `/`, `/work/*`.
- Keep current OG image; per-page og:url + canonical.

### 7. Performance
- Add `width`/`height` + `loading="lazy"` (except hero portrait which stays eager) and a 2x `srcset` for the portrait.
- Disable marquee animation under `prefers-reduced-motion` and on `<768px`.

### 8. Out of scope this pass (unless you say otherwise)
- Resend wiring (waiting on #4).
- Analytics (waiting on #5).
- Actual case-study prose / metrics (waiting on #1–#3).
- Publishing — I will NOT publish; you review preview first.

## Technical notes
- TanStack Start file-based routing: `work.api-infrastructure.tsx` → `/work/api-infrastructure`, declared as `createFileRoute("/work/api-infrastructure")`.
- Case-study links use `<Link to="/work/...">`, not `<a href>`.
- All new content tokens stay in `src/content/portfolio.ts` so future edits are one-file changes.
- No new dependencies unless you approve Resend (would add `@react-email/components`, `zod` is already in shadcn deps).

Reply with answers to the 6 confirmations (even quick "placeholders everywhere, no Resend, no analytics" is fine) and I'll build it.