import { createFileRoute, Link } from "@tanstack/react-router";
import { HistoryBackLink } from "@/components/HistoryBackLink";
import { SITE, LINKS, HERO, CAPABILITIES, EXPERIENCE, CASE_STUDIES, PROJECT_ROUTE } from "@/content/portfolio";
import { track } from "@/lib/analytics";
import resumeAsset from "@/assets/resume.pdf.asset.json";

const resume = resumeAsset.url;

const TITLE = "Asritha Nibhanupudi | Hiring managers";
const DESC =
  "A concise overview for hiring managers: current role, key technologies, and how to contact Asritha Nibhanupudi.";
const URL = "https://asritha.dev/hiring-managers";
const OG_IMAGE = "https://asritha.dev/og-image.jpg";

const currentRole = EXPERIENCE[0];

export const Route = createFileRoute("/hiring-managers")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: HiringManagers,
});

function HiringManagers() {
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
        <p className="mono-label">FOR HIRING MANAGERS</p>
        <h1 className="font-serif-display mt-4 text-[clamp(34px,5vw,52px)]">
          Asritha Nibhanupudi —{" "}
          <em className="italic" style={{ color: "var(--accent-terra)" }}>
            Software Engineer
          </em>
        </h1>
        <p className="mt-6 max-w-[64ch] text-[17px] text-text-secondary">
          {HERO.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={resume}
            download
            onClick={() => track("resume_downloaded")}
            className="rounded-[3px] bg-terra px-5 py-3 text-[15px] font-medium text-panel transition-colors hover:bg-terra-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra"
          >
            Download résumé
          </a>
          <a
            href={LINKS.email}
            onClick={() => track("contact_started")}
            className="rounded-[3px] border border-hairline bg-panel px-5 py-3 text-[15px] font-medium transition-colors hover:bg-warm-fill focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra"
          >
            Email me
          </a>
        </div>

        <section aria-labelledby="start-here-heading" className="mt-12">
          <h2 id="start-here-heading" className="mono-label">Start here</h2>
          <p className="mt-3 text-[15px] text-text-secondary">
            Two case studies covering my current service and infrastructure work, and earlier automation delivery.
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CASE_STUDIES.slice(0, 2).map((study) => (
              <li key={study.slug}>
                <Link
                  to={PROJECT_ROUTE[study.slug]}
                  onClick={() => track("case_study_opened", { slug: study.slug })}
                  className="group block h-full rounded-[3px] border border-hairline bg-panel p-5 transition-colors hover:bg-warm-fill focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra"
                >
                  <span className="mono-label">{study.year} · {study.projectType}</span>
                  <h3 className="font-serif-display mt-3 text-[22px]">{study.title}</h3>
                  <p className="mt-3 text-[15px] text-text-secondary">{study.cardResult}</p>
                  <span className="mono-label mt-4 inline-block group-hover:!text-terra">Read case study →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="mono-label">Current role</h2>
          <div className="mt-4 rounded-[3px] border border-hairline bg-panel p-5 md:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <span className="font-serif-display text-[22px] md:text-[24px]">
                {currentRole.org}
              </span>
              <span className="mono-label">{currentRole.date}</span>
            </div>
            <p className="mt-2 text-[15px] font-medium text-text-primary">
              {currentRole.role}
            </p>
            <p className="mt-3 text-[15px] text-text-secondary">
              {currentRole.scope}
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Java service development and integration changes",
                "AWS infrastructure with CDK and CloudFormation",
                "Event-driven integrations and reliability work",
                "Observability and production troubleshooting",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-[14px] text-text-secondary">
                  <span className="text-terra" aria-hidden="true">
                    ·
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mono-label">Key technologies</h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CAPABILITIES.map((cap) => (
              <li
                key={cap.label}
                className="rounded-[3px] border border-hairline bg-panel p-5"
              >
                <h3 className="mono-label mb-2">{cap.label}</h3>
                <p className="text-[14px] text-text-secondary">
                  {cap.items.join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="mono-label">Profiles and research</h2>
          <p className="mt-4 max-w-[60ch] text-[17px] text-text-secondary">
            Explore my public projects, professional background, and published research.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
            {[
              { href: LINKS.github, label: "GitHub", event: "github_opened" as const },
              { href: LINKS.linkedin, label: "LinkedIn", event: "linkedin_opened" as const },
              { href: LINKS.research, label: "IEEE research", event: "research_opened" as const },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  onClick={() => track(l.event)}
                  className="mono-label inline-flex items-center gap-1 border-b border-transparent !text-text-secondary transition-colors hover:!text-terra hover:border-terra focus-visible:!text-terra"
                >
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
