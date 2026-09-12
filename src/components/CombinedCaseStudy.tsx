import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { HistoryBackLink } from "@/components/HistoryBackLink";
import { ProjectCover, coverVariantForSlug } from "@/components/ProjectCover";
import { CONFIDENTIALITY_NOTICE, firstSentence, type Project } from "@/content/portfolio";

/**
 * One parent case study that presents several related sub-studies as
 * subsections. Each sub-study keeps its own scope, contribution, decision,
 * and outcome, and its detail (constraints, alternatives, edge cases,
 * ownership, lessons) sits inside a native <details> block so the page can be
 * reviewed in two minutes or read in full.
 */
export function CombinedCaseStudy({
  parent,
  studies,
}: {
  parent: Project;
  studies: Project[];
}) {
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
        <p className="mono-label">{parent.projectType.toUpperCase()} · {parent.year}</p>
        <h1 className="font-serif-display mt-4 text-[clamp(34px,5vw,52px)]">{parent.title}</h1>
        <p className="mt-6 max-w-[60ch] text-[19px] text-text-secondary">{parent.shortDescription}</p>

        <div className="mt-8 max-w-[220px]">
          <ProjectCover variant={coverVariantForSlug(parent.slug)} ratio="3/2" />
        </div>

        {parent.confidential ? (
          <p className="mt-6 rounded-[3px] border border-hairline bg-warm-fill p-4 text-[14px] text-text-secondary">
            {CONFIDENTIALITY_NOTICE}
          </p>
        ) : null}

        <aside
          aria-label="Case study summary"
          className="mt-8 rounded-[3px] border border-hairline bg-panel p-5 md:p-6"
        >
          <p className="mono-label !text-text-primary !text-[11px]">Summary</p>
          <dl className="mt-4 grid grid-cols-1 gap-4">
            {parent.summaryProblem ? <Row label="Problem">{parent.summaryProblem}</Row> : null}
            <Row label="My role">{parent.summaryRole ?? parent.myContribution}</Row>
            {parent.summaryResult ? <Row label="Result">{parent.summaryResult}</Row> : null}
            {parent.technologies?.length ? (
              <div>
                <dt className="mono-label !text-text-primary !text-[11px]">Core technologies</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {parent.technologies.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-[3px] border border-hairline bg-background px-2.5 py-1 text-[13px] leading-none"
                    >
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            ) : null}
            {parent.scopeNote ? <Row label="Scope">{parent.scopeNote}</Row> : null}
          </dl>
        </aside>

        {parent.professionalContext ? (
          <section className="mt-12">
            <h2 className="font-serif-display text-[clamp(22px,2.6vw,28px)]">Context</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-text-secondary">
              {parent.professionalContext}
            </p>
          </section>
        ) : null}

        {/* In-page contents so a reviewer can jump to one area */}
        <nav aria-label="Sections" className="mt-12 rounded-[3px] border border-hairline bg-panel p-5 md:p-6">
          <p className="mono-label !text-text-primary !text-[11px]">Areas of work</p>
          <ol className="mt-4 space-y-2">
            {studies.map((s, i) => (
              <li key={s.slug} className="text-[15.5px]">
                <a
                  href={`#${s.slug}`}
                  className="hover:!text-terra rounded-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra"
                >
                  <span className="mono-label !text-[11px]">0{i + 1}</span>{" "}
                  <span className="text-text-primary">{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {studies.map((s, i) => (
          <SubStudy key={s.slug} study={s} index={i + 1} />
        ))}

        <div className="mt-16 border-t border-hairline pt-8">
          <HistoryBackLink href="/work" label="← Back to all work" />
        </div>
      </main>
    </div>
  );
}

function SubStudy({ study, index }: { study: Project; index: number }) {
  const problem = study.summaryProblem || firstSentence(study.problem) || study.shortDescription;
  const result = study.summaryResult || firstSentence(study.outcome);

  const hasDetails = Boolean(
    study.constraints?.length ||
      study.approach?.length ||
      study.alternatives?.length ||
      study.edgeCases?.length ||
      study.technologies?.length ||
      study.challenges?.length ||
      study.engineeringMoment ||
      study.ownership ||
      study.learned ||
      study.wouldImprove,
  );

  return (
    <section id={study.slug} className="mt-16 scroll-mt-24 border-t border-hairline pt-10">
      <p className="mono-label">0{index}</p>
      <h2 className="font-serif-display mt-3 text-[clamp(24px,3vw,32px)]">{study.title}</h2>
      <p className="mt-4 text-[17px] leading-relaxed text-text-secondary">{study.shortDescription}</p>

      <dl className="mt-6 grid grid-cols-1 gap-4 rounded-[3px] border border-hairline bg-panel p-5">
        {problem ? <Row label="Problem">{problem}</Row> : null}
        <Row label="What I contributed">
          {study.ownershipWording ? `${study.ownershipWording}: ` : ""}
          {study.myContribution}
        </Row>
        {result ? <Row label="Result">{result}</Row> : null}
      </dl>

      {study.decision ? (
        <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-text-secondary">
          <div>
            <p className="mono-label !text-text-primary !text-[12px]">Key decision</p>
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
      ) : null}

      {hasDetails ? (
        <details className="tech-details mt-6 rounded-[3px] border border-hairline bg-panel">
          <summary className="cursor-pointer list-none px-5 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra">
            <span className="mono-label !text-text-primary !text-[12px] tech-details-when-closed">
              Show technical details ↓
            </span>
            <span className="mono-label !text-text-primary !text-[12px] tech-details-when-open">
              Hide technical details ↑
            </span>
          </summary>
          <div className="space-y-8 border-t border-hairline px-5 py-6 text-[16px] leading-relaxed text-text-secondary">
            {study.scopeNote ? (
              <Block heading="Scope">
                <p>{study.scopeNote}</p>
              </Block>
            ) : null}
            {study.problem ? (
              <Block heading="Engineering problem">
                <p>{study.problem}</p>
              </Block>
            ) : null}
            {study.constraints?.length ? (
              <Block heading="Constraints">
                <List items={study.constraints} />
              </Block>
            ) : null}
            {study.approach?.length ? (
              <Block heading="Technical approach">
                <List items={study.approach} />
              </Block>
            ) : null}
            {study.alternatives?.length ? (
              <Block heading="Alternatives considered">
                <List items={study.alternatives} />
              </Block>
            ) : null}
            {study.edgeCases?.length ? (
              <Block heading="Failure cases and edge cases">
                <List items={study.edgeCases} />
              </Block>
            ) : null}
            {study.challenges?.length ? (
              <Block heading="Challenges">
                <List items={study.challenges} />
              </Block>
            ) : null}
            {study.engineeringMoment ? (
              <Block heading="A concrete engineering moment">
                <div className="space-y-4">
                  {(
                    [
                      ["Symptom", study.engineeringMoment.symptom],
                      ["Initial assumption", study.engineeringMoment.initialAssumption],
                      ["Investigation", study.engineeringMoment.investigation],
                      ["Root cause", study.engineeringMoment.rootCause],
                      ["Change made", study.engineeringMoment.changeMade],
                    ] as Array<[string, string]>
                  ).map(([label, body]) => (
                    <div key={label}>
                      <p className="mono-label !text-text-primary !text-[12px]">{label}</p>
                      <p className="mt-2">{body}</p>
                    </div>
                  ))}
                </div>
              </Block>
            ) : null}
            {study.outcome ? (
              <Block heading="Outcome">
                <p>{study.outcome}</p>
              </Block>
            ) : null}
            {study.technologies?.length ? (
              <Block heading="Technologies">
                <ul className="flex flex-wrap gap-2">
                  {study.technologies.map((t) => (
                    <li
                      key={t}
                      className="inline-flex items-center rounded-[3px] border border-hairline bg-background px-3 py-1.5 text-[14px] leading-none text-text-primary"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Block>
            ) : null}
            {study.ownership ? (
              <Block heading="Ownership breakdown">
                <div className="grid grid-cols-1 gap-5">
                  {(
                    [
                      ["Wider system context", study.ownership.team],
                      ["My contribution", study.ownership.contributedTo],
                      ["Components I personally implemented", study.ownership.implemented],
                      ["Components I integrated", study.ownership.integrated],
                      ["Components I investigated", study.ownership.investigated],
                      ["Components I validated", study.ownership.validated],
                    ] as Array<[string, string[] | undefined]>
                  )
                    .filter(([, items]) => items && items.length > 0)
                    .map(([label, items]) => (
                      <div key={label} className="rounded-[3px] border border-hairline bg-background p-4">
                        <p className="mono-label !text-text-primary !text-[12px]">{label}</p>
                        <div className="mt-3">
                          <List items={items!} />
                        </div>
                      </div>
                    ))}
                </div>
              </Block>
            ) : null}
            {study.learned ? (
              <Block heading="What I learned">
                <p>{study.learned}</p>
              </Block>
            ) : null}
            {study.wouldImprove ? (
              <Block heading="What I would improve">
                <p>{study.wouldImprove}</p>
              </Block>
            ) : null}
          </div>
        </details>
      ) : null}
    </section>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="mono-label !text-text-primary !text-[11px]">{label}</dt>
      <dd className="mt-1.5 text-[15.5px] text-text-secondary">{children}</dd>
    </div>
  );
}

function Block({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-serif-display text-[19px] text-text-primary">{heading}</h3>
      <div className="mt-3">{children}</div>
    </div>
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
