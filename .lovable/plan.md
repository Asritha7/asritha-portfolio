# Portfolio Hardening Plan

Goal: raise credibility, depth, routing correctness, accessibility, and measurement of the existing site without touching the visual identity, hero positioning, or the full-bleed skills marquee.

## 1. Case-study depth (Priority 1)

Extend the schema in `src/content/portfolio.ts` so every featured study supports a richer structure (additive, no breaking renames):

```ts
type CaseStudy = {
  // existing fields stay
  context: string
  problem: string
  constraints: string[]
  myContribution: string         // already exists
  approach: string
  decision: { decision: string; why: string; tradeoff: string }
  alternatives: string[]
  edgeCases: string[]
  outcome: string                // qualitative when no verified metric
  learned: string
  wouldImprove: string
  ownershipBreakdown: {
    team: string[]
    implemented: string[]
    contributedTo: string[]
    investigated: string[]
    validated: string[]
  }
  claims?: Array<{ claim: string; privateSource: string; approvedForPublicUse: boolean }> // not rendered
}
```

Update `CaseStudyLayout.tsx` to render the new sections with clear headings:
Context → Problem → Constraints → My contribution → Approach → Decision (Decision/Why/Trade-off block) → Alternatives → Edge cases → Outcome → What I learned → What I would improve → Ownership breakdown.

Audit each of the four featured studies (Automation Framework, Keycloak, Kafka/Strimzi, Kubernetes CI/CD, UIM Encryption). Any study lacking real depth gets moved to **Additional Engineering Work** instead of being padded. Verbs are downgraded to "contributed to / investigated / validated" where ownership isn't confirmed.

## 2. Evidence and metrics (Priority 2)

Sweep every number on the site. Remove any unverified percentage, latency, availability, user count, cost, or business impact. Replace with precise qualitative outcomes (e.g. "removed the manual redeploy step from the release checklist"). Keep verified counts (workflows automated, environments supported, releases handled) only where the user can confirm them - I'll default to qualitative wording and flag any number I'm unsure about for the user to confirm in preview. `claims[]` is stored in the data model but never rendered. No "Metric pending confirmation" strings ship to the UI.

## 3. Research entry (Priority 3)

Expand the RFID + PIN entry:
- Homepage card: use the suggested plain-English summary.
- New route `src/routes/work/rfid-pin-research.tsx` (or reuse the existing route) with: research problem, motivation, proposed authentication flow, hardware/software components, my contribution, experimental setup, findings, limitations, IEEE publication link.
- Add a simple accessible flow diagram in SVG (RFID tag → reader → PIN entry → verification → access decision) with proper `<title>`/`<desc>` and a text fallback.
- No "production-ready commercial security system" language.

## 4. Public Projects (Priority 4)

Rename the section to **Public Projects** with the exact description provided. Keep only the two verified repos already shown (SONAR rock-vs-mine, YouTube comment analysis). No live-demo links unless one actually works. Classify them honestly as learning/experiment projects. Section sits below professional work and research.

## 5. Engineering Notes (Priority 5)

Add a new section + route `/notes` with 2-3 short notes based on real experience:
- Automating Keycloak identity workflows
- A checklist for validating Kafka/Strimzi upgrades
- Investigating Kubernetes deployment failures

Each note follows: Problem → Why it was difficult → Approach → Technical decision → Limitation or mistake → General lesson. No client names, system names, screenshots, or proprietary details.

## 6. /work routing + filters (Priority 6)

`/work` already exists. Harden it:
- Use TanStack `validateSearch` with a Zod schema for `category` (`all | featured | research | security | infrastructure | public`). Invalid values fall back to `all`.
- Filter chips are real `<button>`s with `aria-pressed`, visible focus ring, and an icon/underline in addition to colour for the selected state.
- Direct links, refresh, and Back/Forward all work because state lives in the URL.
- Homepage "View my work" and the bottom "View all work" both route to `/work` via `<Link to="/work">`.

## 7. 404 page (Priority 7)

Set `notFoundComponent` on `__root.tsx` and `defaultNotFoundComponent` on the router. Branded page with the exact heading, description, and two CTAs (Return home, View my work). Matches existing cream/terracotta tokens.

## 8. Reduced motion (Priority 8)

Add a global CSS block under `@media (prefers-reduced-motion: reduce)` in `src/styles.css` that:
- Pauses the marquee animation and lets the strip wrap as a static visible list.
- Disables entrance/parallax/smooth-scroll animations and any counters.
- Sets `scroll-behavior: auto`.

Update `useReveal`/`useParallax` hooks to short-circuit when `matchMedia('(prefers-reduced-motion: reduce)').matches`.

## 9. Analytics (Priority 9)

Add **Plausible** (script tag in `__root.tsx` head, no cookies, no PII). Create a tiny `src/lib/analytics.ts` wrapper `track(event)` that no-ops when `window.plausible` is missing. Wire these events only:
`case_study_opened`, `resume_downloaded`, `github_opened`, `linkedin_opened`, `research_opened`, `contact_started`, `contact_submitted`, `work_filter_selected`. No form contents, no names, no emails. I'll ask you for the Plausible domain before enabling.

## 10. Testimonials (Priority 10)

Add an optional `testimonials: Testimonial[]` array in `portfolio.ts`. The section only renders when the array is non-empty. Schema supports quote, name-or-approved-role, relationship, and a `permissionConfirmed: true` gate. Ships empty - nothing rendered until you provide approved quotes.

## Acceptance pass

After implementing, I'll verify with Playwright at mobile/tablet/desktop: hero positioning unchanged, `/work` filters via URL, 404 renders for `/does-not-exist`, marquee freezes under emulated reduced motion, keyboard tab order works on filters and CTAs. I will NOT publish - you review the preview first.

## What I need from you before/while building

1. **Plausible (or Umami) domain** - which one, and the domain to register (likely `asritha.dev`).
2. **Number audit** - I'll list every numerical claim currently on the site and ask which are verified; unverified ones become qualitative wording.
3. **Ownership wording per case study** - for each of the 4-5 studies, a one-line confirmation of whether you "implemented", "contributed to", "investigated", or "validated" the work.
4. **Engineering Notes** - confirm the three topic picks above, or swap.

I'll start with items 6 (routing), 7 (404), 8 (reduced motion), and 10 (testimonials scaffold) since they need no input from you, then come back with the audit questions for 1, 2, 3, 5, and 9.
