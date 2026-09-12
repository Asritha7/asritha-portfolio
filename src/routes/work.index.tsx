import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";

import {
  PROJECTS,
  PROJECT_CATEGORIES,
  PROJECT_ROUTE,
  projectCtaLabel,
  type ProjectCategory,
  SITE,
} from "@/content/portfolio";
import { track } from "@/lib/analytics";
import { ProjectCover, coverVariantForSlug } from "@/components/ProjectCover";

const TITLE = "Work - Asritha Nibhanupudi";
const DESC =
  "All software engineering work by Asritha Nibhanupudi - backend, APIs, distributed systems, cloud, security, observability, and research.";
const URL = "https://asritha.dev/work";

const FILTERS = ["all", ...PROJECT_CATEGORIES.map((c) => c.toLowerCase().replace(/ /g, "-"))] as const;
type FilterSlug = (typeof FILTERS)[number];

const searchSchema = z.object({
  category: fallback(z.enum(FILTERS as unknown as [string, ...string[]]), "all").default("all"),
});

function categoryFromSlug(slug: string): ProjectCategory | "All" {
  if (slug === "all") return "All";
  const match = PROJECT_CATEGORIES.find(
    (c) => c.toLowerCase().replace(/ /g, "-") === slug,
  );
  return match ?? "All";
}

function slugFromCategory(c: ProjectCategory | "All"): FilterSlug {
  if (c === "All") return "all";
  return c.toLowerCase().replace(/ /g, "-") as FilterSlug;
}

export const Route = createFileRoute("/work/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: WorkIndex,
});

function WorkIndex() {
  const { category } = Route.useSearch();
  const navigate = useNavigate({ from: "/work" });
  const current = categoryFromSlug(category);

  const filtered = useMemo(
    () =>
      current === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.categories.includes(current as ProjectCategory)),
    [current],
  );

  const setFilter = (c: ProjectCategory | "All") => {
    const slug = slugFromCategory(c);
    track("work_filter_selected", { category: slug });
    navigate({ search: { category: slug } });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-hairline bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1024px] items-center justify-between px-6 py-4 md:px-10">
          <Link to="/" className="mono-label !font-bold !text-text-primary !text-base">
            {SITE.name}
          </Link>
          <Link
            to="/"
            className="mono-label hover:!text-terra focus-visible:!text-terra rounded-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra"
          >
            ← Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1024px] px-6 py-16 md:px-10 md:py-24">
        <p className="mono-label">ALL WORK</p>
        <h1 className="font-serif-display mt-4 text-[clamp(34px,5vw,52px)]">
          Software engineering <em className="italic" style={{ color: "var(--accent-terra)" }}>work</em>.
        </h1>
        <p className="mt-6 max-w-[60ch] text-[18px] text-text-secondary">
          A selection of software engineering work across backend systems, APIs, distributed systems,
          cloud infrastructure, automation, observability, and security.
        </p>

        {/* Filter */}
        <fieldset className="mt-10">
          <legend className="mono-label mb-3">Filter by category</legend>
          <div role="group" className="flex flex-wrap gap-2">
            {(["All", ...PROJECT_CATEGORIES] as (ProjectCategory | "All")[]).map((c) => {
              const active = current === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 rounded-[3px] border px-3 py-1.5 text-[13px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra ${
                    active
                      ? "border-terra bg-terra text-panel font-medium"
                      : "border-hairline bg-panel text-text-primary hover:bg-warm-fill"
                  }`}
                >
                  {/* non-colour cue: a checkmark glyph when active */}
                  <span aria-hidden="true" className={active ? "opacity-100" : "opacity-0"}>✓</span>
                  <span>{c}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {filtered.map((p) => (
            <li key={p.slug}>
              <Link
                to={PROJECT_ROUTE[p.slug]}
                onClick={() => track("case_study_opened", { slug: p.slug })}
                className="group block h-full overflow-hidden rounded-[3px] border border-hairline bg-panel transition-colors hover:bg-warm-fill focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra"
              >
                <ProjectCover variant={coverVariantForSlug(p.slug)} ratio="3/2" rounded={false} className="border-0 border-b border-hairline" />
                <div className="p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="mono-label">{p.projectType.toUpperCase()}</span>
                  <span className="mono-label">{p.year}</span>
                </div>
                <h2 className="font-serif-display mt-3 text-[22px]">{p.title}</h2>
                <p className="mt-3 text-[15.5px] text-text-secondary">{p.shortDescription}</p>
                <p className="mt-3 text-[14.5px] text-text-secondary">
                  <span className="text-text-primary">My contribution: </span>
                  {p.myContribution}
                </p>
                <ul className="mono-label mt-4 flex flex-wrap gap-x-3 gap-y-2">
                  {p.tags.slice(0, 5).map((t) => (
                    <li key={t} className="!text-[11px]">· {t}</li>
                  ))}
                </ul>
                <span className="mono-label mt-5 inline-flex items-center gap-1 group-hover:!text-terra">
                  {projectCtaLabel(p)} →
                </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {filtered.length === 0 ? (
          <p className="mt-10 text-text-secondary">No projects in this category yet.</p>
        ) : null}
      </main>
    </div>
  );
}
