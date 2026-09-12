import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { HistoryBackLink } from "@/components/HistoryBackLink";
import { CONFIDENTIALITY_NOTICE, type Project } from "@/content/portfolio";
import { track } from "@/lib/analytics";

export function CaseStudyLayout({ study }: { study: Project }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-hairline bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1024px] items-center justify-between px-6 py-4 md:px-10">
          <Link to="/" className="mono-label !font-bold !text-text-primary !text-base">
            Asritha Nibhanupudi
          </Link>
          <HistoryBackLink href="/work" label="← Back to work" />
        </div>
      </header>

      <main id="top" className="mx-auto max-w-[820px] px-6 py-16 md:px-10 md:py-24">
        <p className="mono-label">{study.projectType.toUpperCase()} · {study.year}</p>
        <h1 className="font-serif-display mt-4 text-[clamp(34px,5vw,52px)]">{study.title}</h1>
        <p className="mt-6 max-w-[60ch] text-[19px] text-text-secondary">{study.shortDescription}</p>

        {study.tags?.length ? (
          <ul className="mono-label mt-6 flex flex-wrap gap-x-3 gap-y-2">
            {study.tags.map((t) => (
              <li key={t} className="rounded-[3px] border border-hairline bg-panel px-2.5 py-1 !text-[11px]">
                {t}
              </li>
            ))}
          </ul>
        ) : null}

        {study.confidential ? (
          <p className="mt-8 rounded-[3px] border border-hairline bg-warm-fill p-4 text-[14px] text-text-secondary">
            {CONFIDENTIALITY_NOTICE}
          </p>
        ) : null}

        {study.scopeNote ? (
          <p className="mt-4 rounded-[3px] border border-hairline bg-panel p-4 text-[14px] text-text-secondary">
            <span className="mono-label !text-text-primary !text-[11px]">Scope note · </span>
            {study.scopeNote}
          </p>
        ) : null}

        {study.professionalContext ? (
          <Section heading="Context">
            <p>{study.professionalContext}</p>
          </Section>
        ) : null}

        {study.problem ? (
          <Section heading="Problem">
            <p>{study.problem}</p>
          </Section>
        ) : null}

        {study.constraints?.length ? (
          <Section heading="Constraints">
            <List items={study.constraints} />
          </Section>
        ) : null}

        <Section heading="My contribution">
          {study.ownershipWording ? (
            <p className="mono-label !text-text-primary !text-[12px]">{study.ownershipWording}</p>
          ) : null}
          <p className={study.ownershipWording ? "mt-3" : ""}>{study.myContribution}</p>
        </Section>

        {study.approach?.length ? (
          <Section heading="Technical approach">
            <List items={study.approach} />
          </Section>
        ) : null}

        {study.decision ? (
          <Section heading="One important engineering decision">
            <div className="space-y-4">
              <div>
                <p className="mono-label !text-text-primary !text-[12px]">Decision</p>
                <p className="mt-2">{study.decision.decision}</p>
              </div>
              <div>
                <p className="mono-label !text-text-primary !text-[12px]">Why</p>
                <p className="mt-2">{study.decision.why}</p>
              </div>
              <div>
                <p className="mono-label !text-text-primary !text-[12px]">Trade-off</p>
                <p className="mt-2">{study.decision.tradeoff}</p>
              </div>
            </div>
          </Section>
        ) : null}

        {study.alternatives?.length ? (
          <Section heading="Alternatives considered">
            <List items={study.alternatives} />
          </Section>
        ) : null}

        {study.edgeCases?.length ? (
          <Section heading="Failure cases and edge cases">
            <List items={study.edgeCases} />
          </Section>
        ) : null}

        {study.technologies?.length ? (
          <Section heading="Technologies used">
            <ul className="flex flex-wrap gap-2">
              {study.technologies.map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center rounded-[3px] border border-hairline bg-panel px-3 py-1.5 text-[14px] leading-none text-text-primary"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {study.challenges?.length ? (
          <Section heading="Challenges">
            <List items={study.challenges} />
          </Section>
        ) : null}

        {study.engineeringMoment ? <EngineeringMomentSection moment={study.engineeringMoment} /> : null}

        {study.beforeState || study.afterState ? (
          <Section heading="Before and after">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {study.beforeState ? (
                <div className="rounded-[3px] border border-hairline bg-panel p-4">
                  <p className="mono-label !text-text-primary !text-[12px]">Before</p>
                  <p className="mt-2 text-[15.5px]">{study.beforeState}</p>
                </div>
              ) : null}
              {study.afterState ? (
                <div className="rounded-[3px] border border-hairline bg-panel p-4">
                  <p className="mono-label !text-text-primary !text-[12px]">After</p>
                  <p className="mt-2 text-[15.5px]">{study.afterState}</p>
                </div>
              ) : null}
            </div>
          </Section>
        ) : null}

        {study.outcome ? (
          <Section heading="Verified outcome">
            <p>{study.outcome}</p>
          </Section>
        ) : null}

        {(() => {
          const approved = study.verifiedMetrics?.filter((m) => m.approvedForPublicUse) ?? [];
          if (!approved.length) return null;
          return (
            <Section heading="Verified metrics">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {approved.map((m, i) => (
                  <li key={i} className="rounded-[3px] border border-hairline bg-panel p-4">
                    <p className="mono-label !text-text-primary !text-[12px]">{m.label}</p>
                    <p className="mt-2 font-serif-display text-[22px]">{m.value}</p>
                  </li>
                ))}
              </ul>
            </Section>
          );
        })()}

        {study.confirmedMetrics?.length ? (
          <Section heading="Confirmed measures">
            <List items={study.confirmedMetrics} />
          </Section>
        ) : null}

        {study.learned ? (
          <Section heading="What I learned">
            <p>{study.learned}</p>
          </Section>
        ) : null}

        {study.wouldImprove ? (
          <Section heading="What I would improve">
            <p>{study.wouldImprove}</p>
          </Section>
        ) : null}

        {study.ownership ? <OwnershipSection ownership={study.ownership} /> : null}

        {study.lessons?.length ? (
          <Section heading="Lessons">
            <List items={study.lessons} />
          </Section>
        ) : null}

        {study.publicationUrl ? (
          <Section heading="Publication">
            <a
              href={study.publicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("research_opened")}
              className="mono-label inline-flex items-center gap-1 !text-terra hover:underline"
            >
              View research ↗
            </a>
          </Section>
        ) : null}

        <div className="mt-16 border-t border-hairline pt-8">
          <Link
            to="/work"
            className="mono-label hover:!text-terra focus-visible:!text-terra rounded-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra"
          >
            ← Back to all work
          </Link>
        </div>
      </main>
    </div>
  );
}

function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-serif-display text-[clamp(22px,2.6vw,28px)]">{heading}</h2>
      <div className="mt-4 text-[17px] leading-relaxed text-text-secondary">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span
            className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: "var(--accent-terra)" }}
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function OwnershipSection({ ownership }: { ownership: NonNullable<Project["ownership"]> }) {
  const blocks: Array<{ label: string; items?: string[] }> = [
    { label: "Wider system context", items: ownership.team },
    { label: "My contribution", items: ownership.contributedTo },
    { label: "Components I personally implemented", items: ownership.implemented },
    { label: "Components I integrated", items: ownership.integrated },
    { label: "Components I investigated", items: ownership.investigated },
    { label: "Components I validated", items: ownership.validated },
  ];
  const present = blocks.filter((b) => b.items && b.items.length > 0);
  if (present.length === 0) return null;
  return (
    <Section heading="Ownership breakdown">
      <div className="grid grid-cols-1 gap-5">
        {present.map((b) => (
          <div key={b.label} className="rounded-[3px] border border-hairline bg-panel p-4">
            <p className="mono-label !text-text-primary !text-[12px]">{b.label}</p>
            <ul className="mt-3 space-y-2">
              {b.items!.map((it, i) => (
                <li key={i} className="flex gap-3 text-[15.5px]">
                  <span
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "var(--accent-terra)" }}
                  />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function EngineeringMomentSection({ moment }: { moment: NonNullable<Project["engineeringMoment"]> }) {
  const blocks: Array<[string, string]> = [
    ["Symptom", moment.symptom],
    ["Initial assumption", moment.initialAssumption],
    ["Investigation", moment.investigation],
    ["Root cause", moment.rootCause],
    ["Change made", moment.changeMade],
  ];
  return (
    <Section heading="A concrete engineering moment">
      <div className="space-y-4">
        {blocks.map(([label, body]) => (
          <div key={label}>
            <p className="mono-label !text-text-primary !text-[12px]">{label}</p>
            <p className="mt-2">{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
