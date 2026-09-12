import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import type { CaseStudy } from "@/content/portfolio";

export function CaseStudyLayout({ study, diagram }: { study: CaseStudy; diagram?: ReactNode }) {
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
        <p className="mono-label">CASE STUDY · {study.year}</p>
        <h1 className="font-serif-display mt-4 text-[clamp(34px,5vw,52px)]">{study.title}</h1>
        <p className="mt-6 max-w-[60ch] text-[19px] text-text-secondary">{study.blurb}</p>
        <ul className="mono-label mt-6 flex flex-wrap gap-x-3 gap-y-2">
          {study.tags.map((t) => (
            <li key={t} className="rounded-[3px] border border-hairline bg-panel px-2.5 py-1 !text-[11px]">
              {t}
            </li>
          ))}
        </ul>

        {study.confidential ? (
          <p className="mt-8 rounded-[3px] border border-hairline bg-warm-fill p-4 text-[14px] text-text-secondary">
            Architecture and identifying details have been simplified to protect confidential information.
          </p>
        ) : null}

        <Section heading="Overview">
          <p>{study.overview}</p>
        </Section>

        <Section heading="Engineering problem">
          <p>{study.problem}</p>
        </Section>

        <Section heading="Requirements and constraints">
          <List items={study.requirements} />
        </Section>

        <Section heading="My role and ownership">
          <p>{study.role}</p>
        </Section>

        <Section heading="Simplified architecture">
          <p>{study.architecture}</p>
          {diagram ? <div className="mt-6">{diagram}</div> : null}
        </Section>

        <Section heading="Implementation approach">
          <List items={study.implementation} />
        </Section>

        <Section heading="Important technical decisions">
          <ul className="space-y-5">
            {study.decisions.map((d) => (
              <li key={d.decision}>
                <p className="font-medium text-text-primary">{d.decision}</p>
                <p className="mt-1 text-text-secondary">{d.rationale}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section heading="Alternatives considered">
          <ul className="space-y-5">
            {study.alternatives.map((a) => (
              <li key={a.option}>
                <p className="font-medium text-text-primary">{a.option}</p>
                <p className="mt-1 text-text-secondary">{a.why_not}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section heading="Trade-offs">
          <List items={study.tradeoffs} />
        </Section>

        <Section heading="Failure scenarios">
          <List items={study.failureScenarios} />
        </Section>

        <Section heading="Reliability considerations">
          <List items={study.reliability} />
        </Section>

        <Section heading="Measurable outcome">
          <p>{study.outcome}</p>
        </Section>

        <Section heading="Lessons learned">
          <List items={study.lessons} />
        </Section>

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
          <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--accent-terra)" }} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function SimpleArchitectureDiagram({ title, desc, nodes }: { title: string; desc: string; nodes: string[] }) {
  // A minimal horizontal flow diagram, themable, accessible.
  const w = 720;
  const h = 140;
  const pad = 20;
  const boxW = (w - pad * 2 - (nodes.length - 1) * 16) / nodes.length;
  const boxH = 56;
  const y = (h - boxH) / 2;
  return (
    <figure className="overflow-x-auto rounded-[3px] border border-hairline bg-panel p-4">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-labelledby="diag-title diag-desc"
        className="block w-full"
      >
        <title id="diag-title">{title}</title>
        <desc id="diag-desc">{desc}</desc>
        {nodes.map((n, i) => {
          const x = pad + i * (boxW + 16);
          const cx = x + boxW / 2;
          const cy = y + boxH / 2;
          return (
            <g key={n}>
              <rect
                x={x}
                y={y}
                width={boxW}
                height={boxH}
                rx={3}
                ry={3}
                fill="var(--warm-fill)"
                stroke="var(--border-contrast)"
              />
              <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--foreground)">
                {n}
              </text>
              {i < nodes.length - 1 ? (
                <line
                  x1={x + boxW}
                  y1={cy}
                  x2={x + boxW + 16}
                  y2={cy}
                  stroke="var(--text-muted)"
                  strokeWidth={1.5}
                  markerEnd="url(#arrow)"
                />
              ) : null}
            </g>
          );
        })}
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--text-muted)" />
          </marker>
        </defs>
      </svg>
      <figcaption className="mono-label mt-3">{title}</figcaption>
    </figure>
  );
}
