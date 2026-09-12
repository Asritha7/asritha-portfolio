import { createFileRoute, Link } from "@tanstack/react-router";
import { HistoryBackLink } from "@/components/HistoryBackLink";
import { ProjectCover } from "@/components/ProjectCover";
import { ENGINEERING_NOTES, SITE } from "@/content/portfolio";

const TITLE = "Engineering Notes - Asritha Nibhanupudi";
const DESC =
  "Practical engineering notes on Keycloak configuration drift, Kafka and Strimzi upgrade validation, and investigating Kubernetes deployment failures.";
const URL = "https://asritha.dev/notes";

export const Route = createFileRoute("/notes")({
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
  component: NotesIndex,
});

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

      <main className="mx-auto max-w-[820px] px-6 py-16 md:px-10 md:py-24">
        <p className="mono-label">ENGINEERING NOTES</p>
        <h1 className="font-serif-display mt-4 text-[clamp(34px,5vw,52px)]">
          Engineering <em className="italic" style={{ color: "var(--accent-terra)" }}>notes</em>.
        </h1>
        <p className="mt-6 max-w-[60ch] text-[18px] text-text-secondary">
          Practical, sanitized engineering notes. No client names, no internal system names, no proprietary
          details - the engineering shape of the problem, a checklist or decision flow, and the limits of
          the approach.
        </p>

        {/* In-page table of contents */}
        <nav aria-label="Notes table of contents" className="mt-10 rounded-[3px] border border-hairline bg-panel p-5">
          <p className="mono-label !text-[11px]">On this page</p>
          <ul className="mt-3 space-y-2 text-[15px]">
            {ENGINEERING_NOTES.map((n) => (
              <li key={n.slug}>
                <a href={`#${n.slug}`} className="text-text-secondary hover:!text-terra">
                  · {n.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="mt-12 space-y-16">
          {ENGINEERING_NOTES.map((n) => (
            <li key={n.slug} id={n.slug} className="border-t border-hairline pt-10 scroll-mt-24">
              <h2 className="font-serif-display text-[clamp(22px,2.6vw,28px)]">{n.title}</h2>
              <div className="mt-5 md:hidden">
                <ProjectCover variant="note" ratio="3/2" />
              </div>
              <div className="mt-5 hidden md:block md:max-w-[420px]">
                <ProjectCover variant="note" ratio="16/9" />
              </div>
              <p className="mt-4 text-[17px] text-text-secondary">{n.summary}</p>

              <NoteBlock label="Introduction">{n.introduction}</NoteBlock>
              <NoteBlock label="The recurring problem">{n.problem}</NoteBlock>
              <NoteBlock label="Why it is difficult">{n.whyDifficult}</NoteBlock>
              <NoteBlock label="Practical approach">{n.approach}</NoteBlock>

              {n.practicalSteps?.length ? (
                <div className="mt-6">
                  <p className="mono-label !text-text-primary !text-[12px]">Sanitized setup sequence</p>
                  <ol className="mt-3 space-y-2 text-[16.5px] leading-relaxed text-text-secondary">
                    {n.practicalSteps.map((s, i) => (
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

              {n.decisionFlow?.length ? (
                <div className="mt-6">
                  <p className="mono-label !text-text-primary !text-[12px]">Decision flow</p>
                  <p className="sr-only">
                    Ordered list of investigation steps, each followed by a short detail. Steps are read in order.
                  </p>
                  <ol className="mt-3 space-y-3">
                    {n.decisionFlow.map((d, i) => (
                      <li
                        key={i}
                        className="rounded-[3px] border border-hairline bg-panel p-4"
                      >
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
                        {i < (n.decisionFlow?.length ?? 0) - 1 ? (
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

              {n.checklists?.length
                ? n.checklists.map((c) => (
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

              {n.subsections?.length
                ? n.subsections.map((s) => (
                    <NoteBlock key={s.heading} label={s.heading}>
                      {s.body}
                    </NoteBlock>
                  ))
                : null}

              <div className="mt-6 rounded-[3px] border border-hairline bg-panel p-5">
                <p className="mono-label !text-text-primary !text-[12px]">
                  One important decision - {n.importantDecision.title}
                </p>
                <p className="mt-2 text-[16px] leading-relaxed text-text-secondary">
                  {n.importantDecision.body}
                </p>
              </div>

              <div className="mt-6">
                <p className="mono-label !text-text-primary !text-[12px]">Limitations</p>
                <ul className="mt-3 space-y-2 text-[16.5px] leading-relaxed text-text-secondary">
                  {n.limitations.map((l, i) => (
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

              <NoteBlock label="When this approach does not apply">{n.whenNotToApply}</NoteBlock>
              <NoteBlock label="Conclusion">{n.conclusion}</NoteBlock>
            </li>
          ))}
        </ul>

        <div className="mt-16 border-t border-hairline pt-8">
          <HistoryBackLink href="/" label="← Back home" />
        </div>
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
