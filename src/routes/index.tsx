import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import portraitAsset from "@/assets/portrait.jpg.asset.json";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import {
  SITE,
  LINKS,
  HERO,
  CASE_STUDIES,
  ADDITIONAL_PROJECTS,
  PROJECT_ROUTE,
  EXPERIENCE,
  PRINCIPLES,
  CAPABILITIES,
  RESEARCH,
  PUBLIC_REPOS,
  EARLIER_PROJECTS,
} from "@/content/portfolio";

const portrait = portraitAsset.url;
const resume = resumeAsset.url;

const TITLE = "Asritha Nibhanupudi | Software Engineer";
const DESC =
  "Software engineer experienced in backend systems, distributed systems, APIs, AWS, Kubernetes, automation, and observability.";
const URL = "https://asritha.dev";
const OG_IMAGE = "https://asritha.dev/og-image.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Asritha Nibhanupudi - Software Engineer" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:image:alt", content: "Asritha Nibhanupudi - Software Engineer" },
    ],
    links: [{ rel: "canonical", href: "https://asritha.dev/" }],
  }),
  component: Portfolio,
});

const nav = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "principles", label: "Principles" },
  { id: "capabilities", label: "Capabilities" },
  { id: "contact", label: "Contact" },
];

type ThemeMode = "light" | "dark";

function useThemePreference() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme");
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(saved === "dark" || saved === "light" ? saved : preferred);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("portfolio-theme", theme);
  }, [ready, theme]);

  return {
    theme,
    toggleTheme: () => setTheme((c) => (c === "dark" ? "light" : "dark")),
  };
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Portfolio() {
  useReveal();
  const { theme, toggleTheme } = useThemePreference();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* skip link */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[3px] focus:bg-terra focus:px-3 focus:py-2 focus:text-panel">
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-hairline bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-[46px]">
          <a href="#top" className="mono-label !font-bold !text-text-primary !text-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-terra rounded-[3px]">
            {SITE.name}
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="mono-label transition-colors hover:!text-terra focus-visible:!text-terra rounded-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-terra">
                {n.label}
              </a>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-hairline bg-panel text-text-primary transition-colors hover:text-terra hover:bg-warm-fill focus-visible:outline focus-visible:outline-2 focus-visible:outline-terra"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-hairline bg-panel text-text-primary"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="mono-label rounded-[3px] border border-hairline bg-panel px-3 py-1.5"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              Menu
            </button>
          </div>
        </div>
        {menuOpen ? (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-hairline bg-background px-6 py-4 md:hidden">
            <div className="grid grid-cols-2 gap-3">
              {nav.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setMenuOpen(false)} className="mono-label rounded-[3px] border border-hairline bg-panel px-3 py-2 hover:!text-terra hover:bg-warm-fill">
                  {n.label}
                </a>
              ))}
            </div>
          </nav>
        ) : null}
      </header>

      <main id="main" className="mx-auto max-w-[1280px] px-6 md:px-[46px]">
        <a id="top" />

        {/* Hero */}
        <section aria-labelledby="hero-heading" className="grid grid-cols-1 gap-12 pt-16 pb-20 md:grid-cols-[1fr_360px] md:gap-16 md:pt-24 md:pb-28">
          <div className="reveal">
            <p className="mono-label">{HERO.eyebrow}</p>
            <h1 id="hero-heading" className="font-serif-display mt-6 text-[clamp(36px,6.4vw,68px)]">
              I build <em className="italic" style={{ color: "var(--accent-terra)" }}>reliable</em> software systems that scale.
            </h1>
            <p className="mt-8 max-w-[58ch] text-[19px] text-text-secondary">{HERO.description}</p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#work" className="rounded-[3px] bg-terra px-5 py-3 text-[15px] font-medium text-panel transition-colors hover:bg-terra-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra">
                View my work →
              </a>
              <a href={resume} download className="rounded-[3px] border border-hairline bg-panel px-5 py-3 text-[15px] font-medium transition-colors hover:bg-warm-fill focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra">
                Download résumé
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              <li className="rounded-[3px] border border-hairline bg-panel px-3 py-1.5 mono-label !text-text-primary !text-[11px]">
                Based in {SITE.location}
              </li>
              <li className="rounded-[3px] border border-hairline bg-panel px-3 py-1.5 mono-label !text-text-primary !text-[11px]">
                {SITE.education}
              </li>
            </ul>
            <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
              {[
                { href: LINKS.github, label: "GitHub" },
                { href: LINKS.linkedin, label: "LinkedIn" },
                { href: LINKS.research, label: "Research" },
                { href: LINKS.email, label: "Email" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="mono-label inline-flex items-center gap-1 border-b border-transparent !text-text-secondary transition-colors hover:!text-terra hover:border-terra focus-visible:!text-terra"
                  >
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <aside className="reveal">
            <div className="overflow-hidden rounded-[3px] border border-hairline bg-warm-fill">
              <img
                src={portrait}
                alt={`Portrait of ${SITE.name}`}
                width={1200}
                height={1600}
                className="aspect-[4/5] h-auto w-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </aside>
        </section>

        {/* Featured case studies */}
        <section id="work" aria-labelledby="work-heading" className="border-t border-hairline py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr] md:gap-16">
            <div className="reveal">
              <span className="mono-label">01 - Featured work</span>
              <h2 id="work-heading" className="font-serif-display mt-4 text-[clamp(26px,3vw,32px)]">
                Featured <em className="italic" style={{ color: "var(--accent-terra)" }}>work</em>.
              </h2>
              <p className="mt-3 text-[15px] text-text-secondary">
                A selection of software engineering work across backend systems, APIs, distributed
                systems, cloud infrastructure, automation, observability, and security.
              </p>
            </div>
            <ul className="reveal grid grid-cols-1 gap-5">
              {CASE_STUDIES.map((c, i) => (
                <li key={c.slug}>
                  <Link
                    to={PROJECT_ROUTE[c.slug]}
                    className="group block rounded-[3px] border border-hairline bg-panel p-6 transition-colors hover:bg-warm-fill focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra md:p-8"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="mono-label">0{i + 1} · {c.projectType}</span>
                      <span className="mono-label">{c.year}</span>
                    </div>
                    <h3 className="font-serif-display mt-3 text-[22px] md:text-[26px]">{c.title}</h3>
                    <p className="mt-3 text-[16px] text-text-secondary">{c.shortDescription}</p>
                    <p className="mt-2 text-[15px] text-text-secondary">
                      <span className="text-text-primary">My contribution: </span>
                      {c.contribution}
                    </p>
                    <ul className="mono-label mt-4 flex flex-wrap gap-x-3 gap-y-2">
                      {c.tags.slice(0, 5).map((t) => (
                        <li key={t} className="!text-[11px]">· {t}</li>
                      ))}
                    </ul>
                    <span className="mono-label mt-5 inline-flex items-center gap-1 group-hover:!text-terra">
                      Read case study →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More selected work (compact) */}
          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr] md:gap-16">
            <div className="reveal">
              <span className="mono-label">More selected work</span>
              <h3 className="font-serif-display mt-4 text-[clamp(22px,2.4vw,26px)]">
                Breadth across <em className="italic" style={{ color: "var(--accent-terra)" }}>engineering</em>.
              </h3>
              <p className="mt-3 text-[14.5px] text-text-secondary">
                Shorter writeups across security, distributed systems, and research.
              </p>
            </div>
            <ul className="reveal grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ADDITIONAL_PROJECTS.slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <Link
                    to={PROJECT_ROUTE[p.slug]}
                    className="group flex h-full flex-col rounded-[3px] border border-hairline bg-panel p-5 transition-colors hover:bg-warm-fill focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra"
                  >
                    <span className="mono-label !text-[11px]">{p.projectType.toUpperCase()}</span>
                    <h4 className="font-serif-display mt-2 text-[18px] leading-snug">{p.title}</h4>
                    <p className="mt-2 text-[14px] text-text-secondary">{p.shortDescription}</p>
                    <p className="mt-2 text-[13.5px] text-text-secondary">
                      <span className="text-text-primary">Contribution: </span>
                      {p.contribution}
                    </p>
                    <ul className="mono-label mt-3 flex flex-wrap gap-x-2 gap-y-1.5">
                      {p.tags.slice(0, 4).map((t) => (
                        <li key={t} className="!text-[10.5px]">· {t}</li>
                      ))}
                    </ul>
                    <span className="mono-label mt-auto pt-4 inline-flex items-center gap-1 group-hover:!text-terra">
                      Read details →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex justify-end md:pl-[236px]">
            <Link
              to="/work"
              className="mono-label inline-flex items-center gap-2 rounded-[3px] border border-hairline bg-panel px-4 py-2.5 hover:bg-warm-fill hover:!text-terra focus-visible:outline focus-visible:outline-2 focus-visible:outline-terra"
            >
              View all work →
            </Link>
          </div>
        </section>


        {/* Experience */}
        <section id="experience" aria-labelledby="exp-heading" className="border-t border-hairline py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr] md:gap-16">
            <div className="reveal">
              <span className="mono-label">02 - Experience</span>
              <h2 id="exp-heading" className="font-serif-display mt-4 text-[clamp(26px,3vw,32px)]">
                Professional <em className="italic" style={{ color: "var(--accent-terra)" }}>timeline</em>.
              </h2>
            </div>
            <ol className="relative">
              {EXPERIENCE.map((e, i) => (
                <li key={i} className="reveal relative border-l border-hairline pb-12 pl-8 last:pb-0">
                  <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent-terra)" }} />
                  <p className="mono-label">{e.date} · {e.place}</p>
                  <h3 className="font-serif-display mt-2 text-[22px] md:text-[24px]">
                    {e.role} <span className="text-text-secondary"> - {e.org}</span>
                  </h3>
                  <p className="mt-3 max-w-[64ch] text-[16.5px] text-text-secondary">{e.scope}</p>
                  <ul className="mt-4 space-y-2 text-[16px] text-text-secondary">
                    {e.contributions.map((c, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--accent-terra)" }} />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                  {e.stack ? (
                    <ul className="mono-label mt-4 flex flex-wrap gap-x-3 gap-y-2">
                      {e.stack.map((s) => (
                        <li key={s} className="!text-[11px]">· {s}</li>
                      ))}
                    </ul>
                  ) : null}
                  {"note" in e && e.note ? (
                    <p className="mono-label mt-3 !text-[11px]">{e.note}</p>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Principles */}
        <section id="principles" aria-labelledby="principles-heading" className="border-t border-hairline py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr] md:gap-16">
            <div className="reveal">
              <span className="mono-label">03 - Principles</span>
              <h2 id="principles-heading" className="font-serif-display mt-4 text-[clamp(26px,3vw,32px)]">
                How I <em className="italic" style={{ color: "var(--accent-terra)" }}>think</em>.
              </h2>
            </div>
            <ul className="reveal grid grid-cols-1 gap-5 md:grid-cols-2">
              {PRINCIPLES.map((p) => (
                <li key={p.title} className="rounded-[3px] border border-hairline bg-panel p-5 md:p-6">
                  <h3 className="font-serif-display text-[18px]">{p.title}</h3>
                  <p className="mt-2 text-[15.5px] text-text-secondary">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" aria-labelledby="cap-heading" className="border-t border-hairline py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr] md:gap-16">
            <div className="reveal">
              <span className="mono-label">04 - Capabilities</span>
              <h2 id="cap-heading" className="font-serif-display mt-4 text-[clamp(26px,3vw,32px)]">
                Technical <em className="italic" style={{ color: "var(--accent-terra)" }}>capabilities</em>.
              </h2>
            </div>
            <div className="reveal space-y-8">
              {CAPABILITIES.map((g) => (
                <div key={g.label} className="grid grid-cols-1 gap-4 sm:grid-cols-[200px_1fr]">
                  <p className="mono-label pt-1">{g.label}</p>
                  <ul className="flex flex-wrap gap-2">
                    {g.items.map((t) => (
                      <li key={t} className="rounded-[3px] border border-hairline bg-panel px-3 py-1.5 text-[14px] text-text-primary">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Public engineering work */}
        <section aria-labelledby="repos-heading" className="border-t border-hairline py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr] md:gap-16">
            <div className="reveal">
              <span className="mono-label">05 - Open source</span>
              <h2 id="repos-heading" className="font-serif-display mt-4 text-[clamp(26px,3vw,32px)]">
                Public <em className="italic" style={{ color: "var(--accent-terra)" }}>engineering</em> work.
              </h2>
              <p className="mt-3 text-[15px] text-text-secondary">
                Repositories in progress. Each will ship with architecture notes, tests, and deployment instructions.
              </p>
            </div>
            <ul className="reveal grid grid-cols-1 gap-4">
              {PUBLIC_REPOS.map((r) => (
                <li key={r.title} className="rounded-[3px] border border-hairline bg-panel p-5 md:p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif-display text-[18px]">{r.title}</h3>
                    <span className="mono-label !text-[11px]">{r.status}</span>
                  </div>
                  <p className="mt-2 text-[15.5px] text-text-secondary">{r.blurb}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Research + earlier */}
        <section aria-labelledby="research-heading" className="border-t border-hairline py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr] md:gap-16">
            <div className="reveal">
              <span className="mono-label">06 - Research</span>
              <h2 id="research-heading" className="font-serif-display mt-4 text-[clamp(26px,3vw,32px)]">
                Published <em className="italic" style={{ color: "var(--accent-terra)" }}>research</em>.
              </h2>
            </div>
            <div className="reveal space-y-6">
              <a
                href={RESEARCH.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-[3px] bg-terra p-6 text-dark-foreground transition-colors hover:bg-terra-dark md:p-7"
              >
                <p className="mono-label !text-dark-foreground/80">{RESEARCH.venue} · {RESEARCH.note}</p>
                <h3 className="font-serif-display mt-3 text-[22px] leading-snug">{RESEARCH.title}</h3>
                <span className="mono-label mt-4 inline-flex items-center gap-1 !text-dark-foreground group-hover:underline">
                  Read paper →
                </span>
              </a>
              <details className="rounded-[3px] border border-hairline bg-panel p-5">
                <summary className="mono-label cursor-pointer hover:!text-terra">+ Earlier projects</summary>
                <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2 text-[15px] text-text-secondary sm:grid-cols-2">
                  {EARLIER_PROJECTS.map((p) => (
                    <li key={p.label} className="border-b border-hairline py-2">
                      {p.href ? (
                        <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:!text-terra">
                          {p.label} ↗
                        </a>
                      ) : (
                        p.label
                      )}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
        </section>
      </main>

      {/* Contact + footer */}
      <div className="bg-dark-background text-dark-foreground">
        <section id="contact" aria-labelledby="contact-heading" className="mx-auto max-w-[1280px] px-6 py-24 md:px-[46px] md:py-28">
          <div className="reveal grid grid-cols-1 gap-14 md:grid-cols-[1fr_1fr] md:gap-20">
            <div>
              <span className="mono-label !text-dark-foreground/60">07 - Contact</span>
              <h2 id="contact-heading" className="font-serif-display mt-6 text-[clamp(38px,5.6vw,60px)]">
                Let's talk about <em className="italic" style={{ color: "var(--accent-terra)" }}>software</em>.
              </h2>
              <p className="mt-6 max-w-[42ch] text-[17px] text-dark-foreground/70">
                Open to software engineering roles and collaborations. Reach out about a project, a role, or anything you're building.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={LINKS.email} className="rounded-[3px] border border-dark-foreground/30 px-4 py-2.5 text-[14px] font-medium text-dark-foreground transition-colors hover:bg-dark-foreground/10">
                  Email directly
                </a>
                <a href={resume} download className="rounded-[3px] border border-dark-foreground/30 px-4 py-2.5 text-[14px] font-medium text-dark-foreground transition-colors hover:bg-dark-foreground/10">
                  Résumé
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>

        <footer className="border-t border-dark-foreground/10">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-6 py-8 md:px-[46px]">
            <p className="mono-label !text-dark-foreground/60">© 2026 {SITE.name.toUpperCase()} · {SITE.location.toUpperCase()}</p>
            <ul className="flex flex-wrap gap-x-7 gap-y-2">
              {[
                { href: LINKS.github, label: "GitHub" },
                { href: LINKS.linkedin, label: "LinkedIn" },
                { href: LINKS.email, label: "Email" },
                { href: LINKS.research, label: "Research" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} target={l.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="mono-label inline-flex items-center gap-1 !text-dark-foreground/70 transition-colors hover:!text-dark-foreground">
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
}

type FormState = "idle" | "submitting" | "success" | "error";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const next: typeof errors = {};
    const n = name.trim();
    const em = email.trim();
    const m = message.trim();
    if (!n) next.name = "Please enter your name.";
    else if (n.length > 100) next.name = "Name is too long.";
    if (!em) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) next.email = "Please enter a valid email.";
    if (!m) next.message = "Please enter a message.";
    else if (m.length > 2000) next.message = "Message is too long.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) return; // honeypot tripped - silently drop
    if (!validate()) return;
    setState("submitting");
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          website,
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setState("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setState("error");
    }
  };


  const fieldClass =
    "w-full rounded-[3px] border border-dark-foreground/25 bg-dark-foreground/[0.04] px-4 py-3 text-[15px] text-dark-foreground placeholder:text-dark-foreground/40 outline-none transition-colors focus:border-[var(--accent-terra)] focus:bg-dark-foreground/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-terra)]";

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[3px] border border-dark-foreground/15 bg-dark-foreground/[0.03] p-6 md:p-8">
      <p className="mono-label !text-dark-foreground/60">Send a message</p>

      {/* honeypot */}
      <label className="sr-only" htmlFor="cf-website">Website</label>
      <input
        id="cf-website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute left-[-9999px]"
        aria-hidden="true"
      />

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="cf-name" className="mono-label !text-dark-foreground/60 !text-[11px]">Name</label>
          <input
            id="cf-name"
            required
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "cf-name-err" : undefined}
            className={`${fieldClass} mt-2`}
            placeholder="Your name"
          />
          {errors.name ? <p id="cf-name-err" className="mt-1.5 text-[13px] text-[var(--accent-terra)]">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="cf-email" className="mono-label !text-dark-foreground/60 !text-[11px]">Email</label>
          <input
            id="cf-email"
            type="email"
            required
            maxLength={200}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cf-email-err" : undefined}
            className={`${fieldClass} mt-2`}
            placeholder="you@domain.com"
          />
          {errors.email ? <p id="cf-email-err" className="mt-1.5 text-[13px] text-[var(--accent-terra)]">{errors.email}</p> : null}
        </div>
        <div>
          <label htmlFor="cf-msg" className="mono-label !text-dark-foreground/60 !text-[11px]">Message</label>
          <textarea
            id="cf-msg"
            required
            maxLength={2000}
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "cf-msg-err" : undefined}
            className={`${fieldClass} mt-2 resize-y`}
            placeholder="What are you working on?"
          />
          {errors.message ? <p id="cf-msg-err" className="mt-1.5 text-[13px] text-[var(--accent-terra)]">{errors.message}</p> : null}
        </div>
      </div>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-6 w-full rounded-[3px] bg-terra px-5 py-3 text-[15px] font-medium text-panel transition-colors hover:bg-terra-dark disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-terra)]"
      >
        {state === "submitting" ? "Sending…" : "Send message →"}
      </button>

      {state === "success" ? (
        <p role="status" className="mono-label mt-4 !text-[var(--accent-terra)]">Thank you! Your message has been sent.</p>
      ) : null}
      {state === "error" ? (
        <p role="alert" className="mono-label mt-4 !text-[var(--accent-terra)]">
          Something went wrong. Email me directly at <a href={LINKS.email} className="underline">{SITE.email}</a>.
        </p>
      ) : null}
    </form>
  );
}

