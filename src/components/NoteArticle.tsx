import { Link } from "@tanstack/react-router";
import { HistoryBackLink } from "@/components/HistoryBackLink";
import { ProjectCover } from "@/components/ProjectCover";
import {
  ENGINEERING_NOTES,
  NOTE_ROUTE,
  NOTE_TAGS,
  SITE,
  noteReadingTimeMinutes,
  type EngineeringNote,
} from "@/content/portfolio";

function noteCoverVariant(slug: string) {
  if (slug.includes("keycloak")) return "note-keycloak" as const;
  if (slug.includes("kafka")) return "note-kafka" as const;
  if (slug.includes("kubernetes")) return "note-kubernetes" as const;
  return "note" as const;
}

export function NoteArticle({ note }: { note: EngineeringNote }) {
  const tags = NOTE_TAGS[note.slug] ?? [];
  const minutes = noteReadingTimeMinutes(note);
  const idx = ENGINEERING_NOTES.findIndex((n) => n.slug === note.slug);
  const prev = idx > 0 ? ENGINEERING_NOTES[idx - 1] : null;
  const next = idx >= 0 && idx < ENGINEERING_NOTES.length - 1 ? ENGINEERING_NOTES[idx + 1] : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-hairline bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1024px] items-center justify-between px-6 py-4 md:px-10">
          <Link to="/" className="mono-label !font-bold !text-text-primary !text-base">
            {SITE.name}
          </Link>
          <HistoryBackLink href="/notes" label="← All notes" />
        </div>
      </header>

      <main id="top" className="mx-auto max-w-[820px] px-6 py-16 md:px-10 md:py-24">
        <p className="mono-label">ENGINEERING NOTE · {minutes} min read</p>
        <h1 className="font-serif-display mt-4 text-[clamp(30px,4.4vw,46px)]">{note.title}</h1>
        <p className="mt-6 max-w-[60ch] text-[18px] text-text-secondary">{note.summary}</p>

        {tags.length ? (
          <ul className="mono-label mt-5 flex flex-wrap gap-x-3 gap-y-2">
            {tags.slice(0, 3).map((t) => (
              <li
                key={t}
                className="inline-flex items-center rounded-[3px] border border-hairline bg-panel px-2.5 py-1 !text-[11px]"
              >
                {t}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-8 max-w-[220px]">
          <ProjectCover variant={noteCoverVariant(note.slug)} ratio="3/2" />
        </div>

        <NoteBlock label="Introduction">{note.introduction}</NoteBlock>
        <NoteBlock label="The recurring problem">{note.problem}</NoteBlock>
        <NoteBlock label="Why it is difficult">{note.whyDifficult}</NoteBlock>
        <NoteBlock label="Practical approach">{note.approach}</NoteBlock>

        {note.practicalSteps?.length ? (
          <div className="mt-6">
            <p className="mono-label !text-text-primary !text-[12px]">Sanitized setup sequence</p>
            <ol className="mt-3 space-y-2 text-[16.5px] leading-relaxed text-text-secondary">
              {note.practicalSteps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mono-label !text-[12px] !text-terra shrink-0 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        {note.decisionFlow?.length ? (
          <div className="mt-6">
            <p className="mono-label !text-text-primary !text-[12px]">Decision flow</p>
            <p className="sr-only">
              Ordered list of investigation steps, each followed by a short detail. Steps are read in order.
            </p>
            <ol className="mt-3 space-y-3">
              {note.decisionFlow.map((d, i) => (
                <li key={i} className="rounded-[3px] border border-hairline bg-panel p-4">
                  <div className="flex items-baseline gap-3">
                    <span className="mono-label !text-[11px] !text-terra shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[16px] font-medium text-text-primary">{d.step}</p>
                  </div>
                  {d.detail ? (
                    <p className="mt-1.5 ml-[34px] text-[14.5px] leading-relaxed text-text-secondary">
                      {d.detail}
                    </p>
                  ) : null}
                  {i < (note.decisionFlow?.length ?? 0) - 1 ? (
                    <p
                      aria-hidden="true"
                      className="mono-label !text-[11px] !text-terra mt-3 ml-[8px]"
                    >
                      ↓
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        {note.checklists?.length
          ? note.checklists.map((c) => (
              <div key={c.heading} className="mt-6">
                <p className="mono-label !text-text-primary !text-[12px]">{c.heading}</p>
                <ul className="mt-3 space-y-2 text-[16.5px] leading-relaxed text-text-secondary">
                  {c.items.map((it, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "var(--accent-terra)" }}
                      />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          : null}

        {note.subsections?.length
          ? note.subsections.map((s) => (
              <NoteBlock key={s.heading} label={s.heading}>
                {s.body}
              </NoteBlock>
            ))
          : null}

        <div className="mt-6 rounded-[3px] border border-hairline bg-panel p-5">
          <p className="mono-label !text-text-primary !text-[12px]">
            One important decision - {note.importantDecision.title}
          </p>
          <p className="mt-2 text-[16px] leading-relaxed text-text-secondary">
            {note.importantDecision.body}
          </p>
        </div>

        <div className="mt-6">
          <p className="mono-label !text-text-primary !text-[12px]">Limitations</p>
          <ul className="mt-3 space-y-2 text-[16.5px] leading-relaxed text-text-secondary">
            {note.limitations.map((l, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--accent-terra)" }}
                />
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>

        <NoteBlock label="When this approach does not apply">{note.whenNotToApply}</NoteBlock>
        <NoteBlock label="Conclusion">{note.conclusion}</NoteBlock>

        {/* Article nav: previous / all / next */}
        <nav
          aria-label="Engineering notes navigation"
          className="mt-16 grid grid-cols-1 gap-3 border-t border-hairline pt-8 sm:grid-cols-3"
        >
          <div>
            {prev ? (
              <Link
                to={NOTE_ROUTE[prev.slug]}
                className="mono-label inline-flex flex-col rounded-[3px] border border-hairline bg-panel px-4 py-3 hover:bg-warm-fill hover:!text-terra focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra"
              >
                <span className="!text-[10px] opacity-70">← Previous note</span>
                <span className="mt-1 text-[12px] normal-case">{prev.title}</span>
              </Link>
            ) : (
              <span className="mono-label inline-block opacity-40 px-4 py-3 !text-[11px]">
                - first note -
              </span>
            )}
          </div>
          <div className="sm:text-center">
            <Link
              to="/notes"
              className="mono-label inline-flex items-center justify-center rounded-[3px] border border-hairline bg-panel px-4 py-3 hover:bg-warm-fill hover:!text-terra focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra"
            >
              All notes
            </Link>
          </div>
          <div className="sm:text-right">
            {next ? (
              <Link
                to={NOTE_ROUTE[next.slug]}
                className="mono-label inline-flex flex-col rounded-[3px] border border-hairline bg-panel px-4 py-3 hover:bg-warm-fill hover:!text-terra focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra sm:items-end"
              >
                <span className="!text-[10px] opacity-70">Next note →</span>
                <span className="mt-1 text-[12px] normal-case">{next.title}</span>
              </Link>
            ) : (
              <span className="mono-label inline-block opacity-40 px-4 py-3 !text-[11px]">
                - last note -
              </span>
            )}
          </div>
        </nav>
      </main>
    </div>
  );
}

function NoteBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <p className="mono-label !text-text-primary !text-[12px]">{label}</p>
      <p className="mt-2 text-[16.5px] leading-relaxed text-text-secondary">{children}</p>
    </div>
  );
}
