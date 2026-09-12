import { createFileRoute, Link } from "@tanstack/react-router";
import { HistoryBackLink } from "@/components/HistoryBackLink";
import { ProjectCover } from "@/components/ProjectCover";
import {
  ENGINEERING_NOTES,
  NOTE_ROUTE,
  NOTE_TAGS,
  SITE,
  noteReadingTimeMinutes,
} from "@/content/portfolio";

export const Route = createFileRoute("/notes/")({
  component: NotesIndex,
});

function coverFor(slug: string) {
  if (slug.includes("keycloak")) return "note-keycloak" as const;
  if (slug.includes("kafka")) return "note-kafka" as const;
  if (slug.includes("kubernetes")) return "note-kubernetes" as const;
  return "note" as const;
}

function NotesIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-hairline bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1024px] items-center justify-between px-6 py-4 md:px-10">
          <Link to="/" className="mono-label !font-bold !text-text-primary !text-base">
            {SITE.name}
          </Link>
          <HistoryBackLink href="/" label="← Home" />
        </div>
      </header>

      <main className="mx-auto max-w-[920px] px-6 py-16 md:px-10 md:py-24">
        <p className="mono-label">ENGINEERING NOTES</p>
        <h1 className="font-serif-display mt-4 text-[clamp(34px,5vw,52px)]">
          Practical engineering <em className="italic" style={{ color: "var(--accent-terra)" }}>notes</em>.
        </h1>
        <p className="mt-6 max-w-[64ch] text-[17px] text-text-secondary">
          Short technical references drawn from production work. Each note links to its own page.
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-5">
          {ENGINEERING_NOTES.map((n) => {
            const tags = NOTE_TAGS[n.slug] ?? [];
            const minutes = noteReadingTimeMinutes(n);
            const href = NOTE_ROUTE[n.slug];
            return (
              <li key={n.slug}>
                <Link
                  to={href}
                  className="group block overflow-hidden rounded-[3px] border border-hairline bg-panel transition-colors hover:bg-warm-fill focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra"
                >
                  <div className="flex flex-col gap-0 sm:flex-row sm:items-stretch">
                    <ProjectCover
                      variant={coverFor(n.slug)}
                      ratio="3/2"
                      rounded={false}
                      className="border-0 border-b border-hairline sm:w-[180px] sm:flex-none sm:border-b-0 sm:border-r"
                    />
                    <div className="flex-1 p-5 md:p-6">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="mono-label">ENGINEERING NOTE</span>
                        <span className="mono-label">{minutes} min read</span>
                      </div>
                      <h2 className="font-serif-display mt-2 text-[20px] md:text-[22px]">{n.title}</h2>
                      <p className="mt-2 max-w-[60ch] text-[14.5px] text-text-secondary">{n.summary}</p>
                      {tags.length ? (
                        <ul className="mono-label mt-3 flex flex-wrap gap-x-3 gap-y-2">
                          {tags.slice(0, 3).map((t) => (
                            <li key={t} className="!text-[11px]">· {t}</li>
                          ))}
                        </ul>
                      ) : null}
                      <span className="mono-label mt-3 inline-flex items-center gap-1 group-hover:!text-terra">
                        Read note →
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
