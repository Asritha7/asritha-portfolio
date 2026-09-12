import { createFileRoute, Link } from "@tanstack/react-router";
import { HistoryBackLink } from "@/components/HistoryBackLink";
import { PROJECTS, SITE, CONFIDENTIALITY_NOTICE, LINKS } from "@/content/portfolio";
import { track } from "@/lib/analytics";

const study = PROJECTS.find((p) => p.slug === "rfid-pin-authentication-research")!;
const url = "https://asritha.dev/work/rfid-pin-authentication-research";

export const Route = createFileRoute("/work/rfid-pin-authentication-research")({
  head: () => ({
    meta: [
      { title: `${study.title} - Asritha Nibhanupudi` },
      { name: "description", content: study.shortDescription },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:title", content: study.title },
      { property: "og:description", content: study.shortDescription },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-hairline bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1024px] items-center justify-between px-6 py-4 md:px-10">
          <Link to="/" className="mono-label !font-bold !text-text-primary !text-base">
            {SITE.name}
          </Link>
          <HistoryBackLink href="/work" label="← Back to work" />
        </div>
      </header>

      <main id="top" className="mx-auto max-w-[820px] px-6 py-16 md:px-10 md:py-24">
        <p className="mono-label">PUBLISHED RESEARCH · {study.year}</p>
        <h1 className="font-serif-display mt-4 text-[clamp(34px,5vw,52px)]">{study.title}</h1>
        <p className="mt-6 max-w-[60ch] text-[19px] text-text-secondary">{study.shortDescription}</p>

        <ul className="mono-label mt-6 flex flex-wrap gap-x-3 gap-y-2">
          {study.tags.map((t) => (
            <li key={t} className="rounded-[3px] border border-hairline bg-panel px-2.5 py-1 !text-[11px]">{t}</li>
          ))}
        </ul>

        <p className="mt-8 rounded-[3px] border border-hairline bg-warm-fill p-4 text-[14px] text-text-secondary">
          This is a research prototype, not a production-ready commercial security system.
          {study.confidential ? ` ${CONFIDENTIALITY_NOTICE}` : ""}
        </p>

        <Section heading="Research problem">
          <p>
            Single-factor RFID access control is vulnerable to card cloning and loss, and PIN-only
            access control is vulnerable to shoulder-surfing and keypad observation. Either factor
            on its own gives a weak guarantee that the person at the door is the person who is
            authorised to enter.
          </p>
        </Section>

        <Section heading="Motivation">
          <p>
            We wanted to explore whether combining two independent authentication factors -
            possession of an RFID card and knowledge of a PIN - could meaningfully raise the bar
            for unauthorised access while remaining practical to build on embedded hardware
            (a microcontroller, an RFID reader, and a keypad) rather than requiring a networked
            access-control backend.
          </p>
        </Section>

        <Section heading="Proposed authentication flow">
          <FlowDiagram />
          <ol className="mt-6 list-decimal space-y-2 pl-5 text-[16.5px]">
            <li>User presents an RFID card to the reader.</li>
            <li>Microcontroller verifies the card identifier against a stored allow-list.</li>
            <li>If the card is recognised, the user is prompted for a PIN on the keypad.</li>
            <li>Microcontroller verifies the PIN against the entry bound to that card.</li>
            <li>Access is granted only if both factors pass; any failure defaults to deny.</li>
          </ol>
        </Section>

        <Section heading="Hardware and software components">
          <ul className="space-y-2">
            <Bullet>Microcontroller acting as the controller for both authentication factors</Bullet>
            <Bullet>RFID reader module for the first-factor identity check</Bullet>
            <Bullet>Matrix keypad for second-factor PIN entry</Bullet>
            <Bullet>Status indicator (LED / display) for the access decision</Bullet>
            <Bullet>Firmware implementing the flow, the allow-list, and the fail-closed behaviour</Bullet>
          </ul>
        </Section>

        <Section heading="My contribution">
          <p className="mono-label !text-text-primary !text-[12px]">Co-authored</p>
          <p className="mt-3">
            Contributed to system design, hardware-software integration, and experimental
            validation of the combined RFID + PIN scheme, and co-authored the resulting paper.
          </p>
        </Section>

        <Section heading="Experimental setup">
          <p>
            The combined scheme was assembled on a standalone microcontroller-based prototype
            wired to the RFID reader and keypad. We exercised each layer independently and then
            end-to-end: presenting valid and invalid cards, entering correct and incorrect PINs
            for each card, and observing how the system handled subsystem-level faults.
          </p>
        </Section>

        <Section heading="Findings">
          <ul className="space-y-2">
            <Bullet>
              Combining an independent possession factor (RFID) with an independent knowledge
              factor (PIN) is meaningfully stronger than either factor alone, because the
              attacker now has to defeat two unrelated mechanisms.
            </Bullet>
            <Bullet>
              The combined flow was practical to implement on embedded hardware without a
              networked backend, which makes the design suitable for the standalone
              access-control scenarios we targeted.
            </Bullet>
            <Bullet>
              Designing the system to fail closed on any subsystem fault is just as important
              as the cryptographic or procedural strength of either individual factor.
            </Bullet>
          </ul>
        </Section>

        <Section heading="Limitations">
          <ul className="space-y-2">
            <Bullet>This is a research prototype, not a production access-control product.</Bullet>
            <Bullet>The allow-list is stored locally on the device, which limits scalability across many doors.</Bullet>
            <Bullet>The threat model does not include physically tamper-resistant enclosures or networked revocation.</Bullet>
            <Bullet>PIN entropy and lockout behaviour would need to be hardened before any real deployment.</Bullet>
          </ul>
        </Section>

        <Section heading="Publication">
          <a
            href={LINKS.research}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("research_opened")}
            className="mono-label inline-flex items-center gap-1 !text-terra hover:underline"
          >
            View paper on IEEE Xplore ↗
          </a>
          <p className="mt-2 text-[14.5px] text-text-secondary">
            Published as 'Multi-level authentication combining RFID and PIN-based access control' at IEEE ICMACC 2024.
          </p>
        </Section>

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

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-serif-display text-[clamp(22px,2.6vw,28px)]">{heading}</h2>
      <div className="mt-4 text-[17px] leading-relaxed text-text-secondary">{children}</div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--accent-terra)" }} />
      <span>{children}</span>
    </li>
  );
}

function FlowDiagram() {
  const steps = [
    { label: "RFID card", sub: "Possession factor" },
    { label: "Reader", sub: "Identity check" },
    { label: "PIN entry", sub: "Knowledge factor" },
    { label: "Verify", sub: "Both must pass" },
    { label: "Access", sub: "Else: deny" },
  ];
  return (
    <figure className="mt-6">
      <svg
        viewBox="0 0 720 140"
        role="img"
        aria-labelledby="flow-title flow-desc"
        className="w-full max-w-full"
      >
        <title id="flow-title">Two-factor authentication flow</title>
        <desc id="flow-desc">
          RFID card is read by the reader, then the user enters a PIN. Both factors must pass; any
          failure denies access.
        </desc>
        {steps.map((s, i) => {
          const x = 20 + i * 140;
          return (
            <g key={i}>
              <rect
                x={x}
                y={30}
                width={120}
                height={70}
                rx={4}
                fill="var(--panel)"
                stroke="var(--hairline)"
              />
              <text
                x={x + 60}
                y={60}
                textAnchor="middle"
                fontFamily="JetBrains Mono, monospace"
                fontSize="13"
                fill="var(--foreground)"
              >
                {s.label}
              </text>
              <text
                x={x + 60}
                y={82}
                textAnchor="middle"
                fontFamily="JetBrains Mono, monospace"
                fontSize="10"
                fill="var(--text-muted)"
              >
                {s.sub}
              </text>
              {i < steps.length - 1 ? (
                <g>
                  <line
                    x1={x + 120}
                    y1={65}
                    x2={x + 140}
                    y2={65}
                    stroke="var(--accent-terra)"
                    strokeWidth={2}
                  />
                  <polygon
                    points={`${x + 140},65 ${x + 134},61 ${x + 134},69`}
                    fill="var(--accent-terra)"
                  />
                </g>
              ) : null}
            </g>
          );
        })}
      </svg>
      <figcaption className="mono-label mt-3 !text-[11px]">
        Flow: RFID card → reader → PIN entry → verify (both must pass) → access. Any failure denies.
      </figcaption>
    </figure>
  );
}
