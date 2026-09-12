import { createFileRoute, Link } from "@tanstack/react-router";
import { ENGINEERING_NOTES, SITE } from "@/content/portfolio";

const TITLE = "Engineering Notes - Asritha Nibhanupudi";
const DESC =
  "Short, sanitized engineering notes on identity automation, Kafka and Strimzi upgrades, and Kubernetes deployment investigation.";
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
          <Link to="/" className="mono-label hover:!text-terra">
            ← Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[820px] px-6 py-16 md:px-10 md:py-24">
        <p className="mono-label">ENGINEERING NOTES</p>
        <h1 className="font-serif-display mt-4 text-[clamp(34px,5vw,52px)]">
          Engineering <em className="italic" style={{ color: "var(--accent-terra)" }}>notes</em>.
        </h1>
        <p className="mt-6 max-w-[60ch] text-[18px] text-text-secondary">
          Short technical notes on work I genuinely understand. No client names, no internal system
          names, no proprietary details - just the engineering shape of the problem and what I took away
          from it.
        </p>

        <ul className="mt-12 space-y-12">
          {ENGINEERING_NOTES.map((n) => (
            <li key={n.slug} id={n.slug} className="border-t border-hairline pt-10">
              <h2 className="font-serif-display text-[clamp(22px,2.6vw,28px)]">{n.title}</h2>
              <p className="mt-4 text-[17px] text-text-secondary">{n.summary}</p>

              <NoteBlock label="Problem">{n.problem}</NoteBlock>
              <NoteBlock label="Why it was difficult">{n.whyDifficult}</NoteBlock>
              <NoteBlock label="Approach">{n.approach}</NoteBlock>
              <NoteBlock label="Technical decision">{n.technicalDecision}</NoteBlock>
              <NoteBlock label="Limitation or mistake">{n.limitation}</NoteBlock>
              <NoteBlock label="General lesson">{n.lesson}</NoteBlock>
            </li>
          ))}
        </ul>

        <div className="mt-16 border-t border-hairline pt-8">
          <Link to="/" className="mono-label hover:!text-terra">
            ← Back home
          </Link>
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
