import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { CONFIDENTIALITY_NOTICE, type Project } from "@/content/portfolio";

export function CaseStudyLayout({ study }: { study: Project }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-hairline bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1024px] items-center justify-between px-6 py-4 md:px-10">
          <Link to="/" className="mono-label !font-bold !text-text-primary !text-base">
            Asritha Nibhanupudi
          </Link>
          <BackToWorkLink label="← Back to work" />
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

        {study.professionalContext ? (
          <Section heading="Professional context">
            <p>{study.professionalContext}</p>
          </Section>
        ) : null}

        <Section heading="My contribution">
          {study.ownershipWording ? (
            <p className="mono-label !text-text-primary !text-[12px]">{study.ownershipWording}</p>
          ) : null}
          <p className={study.ownershipWording ? "mt-3" : ""}>{study.myContribution}</p>
        </Section>

        {study.problem ? (
          <Section heading="Problem">
            <p>{study.problem}</p>
          </Section>
        ) : null}

        {study.approach?.length ? (
          <Section heading="Approach">
            <List items={study.approach} />
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

        {study.outcome ? (
          <Section heading="Outcome">
            <p>{study.outcome}</p>
          </Section>
        ) : null}

        {study.confirmedMetrics?.length ? (
          <Section heading="Confirmed metrics">
            <List items={study.confirmedMetrics} />
          </Section>
        ) : null}

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
              className="mono-label inline-flex items-center gap-1 !text-terra hover:underline"
            >
              View research ↗
            </a>
          </Section>
        ) : null}

        <div className="mt-16 border-t border-hairline pt-8">
          <BackToWorkLink label="← Back to all work" />
        </div>
      </main>
    </div>
  );
}

function BackToWorkLink({ label }: { label: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      e.preventDefault();
      window.history.back();
    }
  };
  return (
    <a href="/#work" onClick={handleClick} className="mono-label hover:!text-terra">
      {label}
    </a>
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
