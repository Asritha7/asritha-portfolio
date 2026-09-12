# Asritha Nibhanupudi - Portfolio

Personal software engineering portfolio for **Asritha Nibhanupudi**, live at **[asritha.dev](https://asritha.dev)**.

Built as a fast, accessible, SSR-rendered site that showcases professional case studies, engineering notes, published research, and public projects - with a light / amber / dark theme system and an editorial cream + terracotta visual identity.

---

## Tech Stack

- **Framework:** [TanStack Start v1](https://tanstack.com/start) (React 19, SSR)
- **Build tool:** Vite 7
- **Styling:** Tailwind CSS v4 (native CSS `@import`, theme tokens in `src/styles.css`)
- **Routing:** TanStack Router (file-based, under `src/routes/`)
- **Data:** TanStack Query
- **UI primitives:** Radix UI + shadcn/ui
- **Runtime:** Cloudflare Workers (edge)
- **Email:** [Resend](https://resend.com) for the contact form (`contact@asritha.dev`)
- **Analytics:** Lightweight in-house `track()` wrapper (`src/lib/analytics.ts`)

## Features

- Featured engineering case studies with structured ownership breakdowns
- Additional engineering and research section, including IEEE-published RFID + PIN research
- `/notes` - long-form engineering references (Keycloak automation, Kafka/Strimzi upgrades, Kubernetes deployment debugging)
- `/work` - filterable index of all professional and research work
- Server-side contact form with Resend integration
- Three-mode theme toggle: Light / Amber / Dark
- Full-bleed scrolling skills marquee with `prefers-reduced-motion` support
- SEO: per-route metadata, Open Graph, Twitter cards, sitemap, robots, JSON-LD-ready structure
- Accessibility: keyboard navigation, focus rings, ARIA on filter chips, reduced-motion compliance

## Project Structure

```
src/
├── routes/                   # File-based routes (TanStack Router)
│   ├── __root.tsx            # Root layout, head metadata, theme provider
│   ├── index.tsx             # Homepage
│   ├── notes.tsx             # Engineering notes
│   ├── work.index.tsx        # /work - filterable case study index
│   ├── work.*.tsx            # Individual case study pages
│   ├── sitemap[.]xml.ts      # Dynamic sitemap
│   └── api/public/contact.ts # Server route for contact form (Resend)
├── components/
│   ├── CaseStudyLayout.tsx   # Shared layout for case study routes
│   └── ui/                   # shadcn primitives
├── content/
│   └── portfolio.ts          # Single source of truth for projects, notes, capabilities
├── lib/
│   ├── analytics.ts          # track() wrapper
│   └── error-page.ts         # SSR error fallback
├── assets/                   # Portrait, OG image, resume PDF, favicon
├── styles.css                # Tailwind v4 entry + theme tokens
└── router.tsx                # Router bootstrap
```

## Local Development

Requires [Bun](https://bun.sh).

```bash
bun install
bun dev          # http://localhost:8080
bun run build    # production build
bun run preview  # preview the production build
bun run lint
```

## Environment Variables

Secrets such as the Resend API key are managed through the Lovable Cloud dashboard and are not committed to this repository. For local development, create a `.env` file at the project root (do **not** commit it) and add any required keys there. The contact form uses the configured Resend sender and recipient addresses.


## Deployment

The site is deployed to Cloudflare Workers via the [Lovable](https://lovable.dev) platform and served at:

- Production: **https://asritha.dev**
- Lovable URL: `asritha-nibhanupudi-portfolio.lovable.app`

Source code is synced to GitHub at **https://github.com/Asritha7/asritha-nibhanupudi-portfolio**.

HTML responses send `Cache-Control: no-cache` so every refresh sees the latest deployment; hashed JS/CSS assets remain cacheable.

## Editing Content

All portfolio content (case studies, engineering notes, capabilities, principles, testimonials) lives in **`src/content/portfolio.ts`**. Adding a new case study requires:

1. Add an entry to `PROJECTS` (or `ENGINEERING_NOTES`) in `src/content/portfolio.ts`.
2. Create a matching route file in `src/routes/work.<slug>.tsx` using `CaseStudyLayout`.
3. Add the slug to `src/routes/sitemap[.]xml.ts`.

## License

Source code is released under the MIT License (see `LICENSE`). Personal content - portrait photo, resume PDF, written case studies, and research summaries - is © Asritha Nibhanupudi and not licensed for reuse.

## Contact

- Email: [nibhanupudiasritha@gmail.com](mailto:nibhanupudiasritha@gmail.com)
- Site: [asritha.dev](https://asritha.dev)
- GitHub: [@Asritha7](https://github.com/Asritha7)
