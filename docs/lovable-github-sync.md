# Lovable and GitHub portfolio update workflow

This portfolio has **two separate Git repositories**. They are not a fork/branch pair and must never be force-pushed or merged into each other.

1. **Lovable editing source:** `Asritha7/asritha-nibhanupudi-portfolio` (private). This is the repository connected to the live Lovable project. Make reviewed site edits here or through Lovable's editor.
2. **Public showcase:** `Asritha7/asritha-portfolio`. This is a curated public source mirror for recruiters and portfolio readers. It is **not** the Lovable publish target.

## Safe content update sequence

1. Inspect both repositories before editing, ensuring there are no unreconciled changes from Lovable. Do not replace a newer Lovable-generated file using stale public-showcase content.
2. Create a feature branch from the **current private default branch**. Update `src/content/portfolio.ts` first; it is the single source of truth for copy, case-study data, and public project cards. When adding a study, create its `src/routes/work.<slug>.tsx` route, update `PROJECT_ROUTE`, include it in `VISIBLE_PROJECTS`, update the `/work` grouping and `sitemap.xml`.
3. Validate with `bun install --frozen-lockfile`, `bun run build`, `bunx tsc --noEmit`, and `bun run lint`. Review any generated route-tree changes, formatting and SEO outputs. Do not commit credentials or private employer details.
4. Merge the private PR only after successful verification. Check in Lovable that the linked project has synchronized with the private repository and that the preview works. Avoid asking Lovable to regenerate the entire app: direct it to preserve the architecture, `src/content/portfolio.ts`, existing routes, styling, accessibility and deploy configuration.
5. Copy the **same reviewed website file changes** into a separate feature branch of the public repository. Compare the two repositories' target files byte-for-byte, review and run its own CI, then merge by ordinary PR. Keep repo histories separate.
6. **Publishing is a distinct manual operation:** use Lovable's **Publish → Update**, inspect the live domain and verify the new project detail URLs and sitemap. A private GitHub merge or public showcase merge **does not** prove the live production site was updated.

## This portfolio update

The new public-source case studies are `/work/runreviq` and `/work/job-intake-service`. They are independent personal engineering projects, separate from employment case studies, and include current limitations explicitly.

**Review checklist:** home displays both GitHub repositories, the `/work` index groups them under Independent Engineering Projects, their detail routes load, metadata/canonicals and sitemap entries are correct, the mobile layout works, and current Lovable contact/theme/analytics integration is unchanged.

Do not copy private `.env`, Lovable credentials or unpublished portfolio content into the public showcase. The fact that source code is available through the GitHub integration does **not** mean the Lovable deployment has updated.
