import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Asritha Nibhanupudi — Software Engineer" },
      { name: "description", content: "Software engineer working across cloud platform engineering, API gateway infrastructure, and observability. Currently at Goldman Sachs." },
      { property: "og:title", content: "Asritha Nibhanupudi — Software Engineer" },
      { property: "og:description", content: "Cloud platform engineering, distributed systems, and observability." },
    ],
  }),
  component: Portfolio,
});

const nav = [
  { id: "work", label: "Work" },
  { id: "now", label: "Now" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const work = [
  { n: "01", title: "API Gateway Infrastructure", desc: "Hybrid on-prem + multi-region AWS routing layer.", tags: ["CDK", "ECS Fargate", "Nginx"], year: "2026" },
  { n: "02", title: "Observability Onboarding", desc: "Prometheus + Grafana for Java microservices across environments.", tags: ["Prometheus", "Grafana", "Java"], year: "2026" },
  { n: "03", title: "Kafka / Strimzi Test Strategy", desc: "Zero regression across major version upgrades on Kubernetes-native event streaming.", tags: ["Kafka", "Strimzi", "K8s"], year: "2025" },
  { n: "04", title: "Cypress Automation Framework", desc: "150+ modular tests, ~60% less regression effort, integrated into GitLab CI.", tags: ["Cypress", "GitLab CI"], year: "2025" },
  { n: "05", title: "GitLab CI/CD Pipeline Optimisation", desc: "~30% faster deployments, improved release consistency.", tags: ["GitLab", "CI/CD"], year: "2025" },
  { n: "06", title: "Keycloak / OpenSearch Automation", desc: "Identity flows via REST APIs + shell scripting, ~50% less manual ops.", tags: ["Keycloak", "OpenSearch", "Bash"], year: "2025" },
  { n: "07", title: "AI-assisted Legacy Test Automation (UIM)", desc: "Automated high-volume legacy regression suites.", tags: ["AI", "QA"], year: "2025" },
  { n: "08", title: "RFID + PIN Multi-level Authentication", desc: "Published research, IEEE ICMACC 2024 — microcontroller-based secure access.", tags: ["IEEE", "Embedded"], year: "2024" },
];

const earlier = [
  "SONAR Rock vs Mine (Python/ML)",
  "Soil Moisture Monitoring (ESP32)",
  "Audio Transmission via Li-Fi",
  "YouTube Comment Analysis (Python)",
  "Website Blocker (Python)",
  "PCB Design & Fabrication (KiCad)",
  "CodeCademy landing-page clone",
  "Temperature Converter",
  "Digital Clock",
  "Dark / Light toggle",
];

const experience = [
  {
    role: "Analyst, Systems Engineering",
    org: "Goldman Sachs",
    date: "May 2026 — Present",
    place: "Bengaluru · On-site",
    body: "Subledger Technology platform for Asset & Wealth Management. Cloud platform engineering across hybrid API gateway infra and AWS-native microservices (CDK, Fargate, Aurora, Lambda). Onboarding Prometheus + Grafana observability for Java microservices.",
  },
  {
    role: "Software Engineer — QA Automation & Infrastructure",
    org: "Oracle",
    date: "Aug 2024 — Apr 2026",
    place: "Hyderabad",
    body: "CI/CD & release engineering on GitLab (~30% faster deploys). 150+ Cypress tests (~60% less regression). Kafka/Strimzi test strategy across version upgrades. Kubernetes deployments. Keycloak/OpenSearch automation. AI-assisted legacy test automation. \"Best Efforts\" nominee; mentored juniors on CI/CD & K8s debugging.",
  },
  {
    role: "Project Intern",
    org: "Oracle",
    date: "Jan 2024 — Jul 2024",
    place: "Hyderabad",
    body: "Modular Cypress components for enterprise pipelines; root-cause analysis reducing bug leakage by ~20%.",
  },
  {
    role: "Web Developer — Intern",
    org: "Oasis Infobyte",
    date: "Jul 2023 — Aug 2023",
    place: "Remote",
    body: "Responsive front-end components & landing pages (HTML/CSS/JS); shipped projects to GitHub.",
  },
];

const skills = [
  { label: "Cloud & Platform", items: ["AWS", "CDK", "ECS Fargate", "Aurora PostgreSQL", "Lambda", "Nginx"] },
  { label: "Distributed & Infra", items: ["Kubernetes", "Apache Kafka", "Strimzi", "Linux"] },
  { label: "CI/CD & QA", items: ["GitLab CI/CD", "Cypress", "Keycloak", "OpenSearch"] },
  { label: "Observability", items: ["Prometheus", "Grafana"] },
  { label: "Languages", items: ["TypeScript", "Python", "Java", "C++", "REST APIs"] },
];

const links = {
  github: "https://github.com/Asritha7",
  linkedin: "https://linkedin.com/in/asritha-nibhanupudi",
  research: "https://ieeexplore.ieee.org/",
  email: "mailto:asritha.nibhanupudi@example.com",
};

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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = document.getElementById("portrait-wrap");
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        el.style.transform = `translateY(${Math.min(y * 0.06, 40)}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

function Portfolio() {
  useReveal();
  useParallax();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-hairline bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-[46px]">
          <a href="#top" className="mono-label !text-text-primary">Asritha Nibhanupudi</a>
          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="mono-label transition-colors hover:!text-terra">
                {n.label}
              </a>
            ))}
            <span className="flex items-center gap-2 rounded-[3px] border border-hairline bg-panel px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: "var(--status-green)" }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--status-green)" }} />
              </span>
              <span className="mono-label !text-text-primary !text-[11px]">Available</span>
            </span>
          </nav>
          <a href="#contact" className="mono-label md:hidden">Menu</a>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-[1280px] px-6 md:px-[46px]">
        {/* Hero */}
        <section className="grid grid-cols-1 gap-12 pt-16 pb-24 md:grid-cols-[1fr_360px] md:gap-16 md:pt-24 md:pb-32">
          <div className="reveal">
            <p className="mono-label">Analyst · Systems Engineering · Goldman Sachs</p>
            <h1 className="font-serif-display mt-6 text-[clamp(38px,7vw,72px)]">
              Engineering calm,{" "}
              <em className="italic" style={{ color: "var(--accent-terra)" }}>reliable</em>{" "}
              systems behind asset &amp; wealth management.
            </h1>
            <p className="mt-8 max-w-[58ch] text-[19px] text-text-secondary">
              I'm a software engineer working across cloud platform engineering, API gateway infrastructure, and observability — building on AWS and on-prem systems that stay quiet under pressure.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#work" className="rounded-[3px] bg-terra px-5 py-3 text-[15px] font-medium text-panel transition-colors hover:bg-terra-dark">
                View selected work →
              </a>
              <a href="/resume.pdf" download className="rounded-[3px] border border-hairline bg-panel px-5 py-3 text-[15px] font-medium transition-colors hover:bg-warm-fill">
                Download résumé
              </a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
              {[
                { href: links.github, label: "GitHub" },
                { href: links.linkedin, label: "LinkedIn" },
                { href: links.research, label: "Research" },
                { href: links.email, label: "Email" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="mono-label inline-flex items-center gap-1 border-b border-transparent !text-text-secondary transition-colors hover:!text-terra hover:border-terra"
                  >
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <aside className="reveal">
            <div id="portrait-wrap" className="will-change-transform">
              <div className="overflow-hidden rounded-[3px] border border-hairline bg-warm-fill">
                <img
                  src={portrait}
                  alt="Portrait of Asritha Nibhanupudi"
                  width={768}
                  height={960}
                  className="aspect-[4/5] h-auto w-full object-cover"
                />
              </div>
              <p className="mono-label mt-3">B.Tech ECE — VNR VJIET · Bengaluru, India</p>
            </div>
          </aside>
        </section>

        {/* Now */}
        <section id="now" className="border-t border-hairline py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[200px_1fr] md:gap-16">
            <div className="reveal">
              <span className="mono-label" style={{ color: "var(--accent-terra-dark)" }}>Now —</span>
            </div>
            <div className="reveal">
              <p className="font-serif-display text-[clamp(24px,3.4vw,34px)] italic">
                Cloud platform engineering on hybrid API gateways &amp; AWS-native microservices.
              </p>
              <ul className="mt-8 space-y-4 text-[18px] text-text-secondary">
                <li className="flex gap-4">
                  <span className="mono-label pt-1.5">01</span>
                  <span>Hybrid API gateway infrastructure spanning on-prem and multi-region AWS.</span>
                </li>
                <li className="flex gap-4">
                  <span className="mono-label pt-1.5">02</span>
                  <span>AWS-native microservices using <strong className="text-text-primary font-medium">CDK (TypeScript), ECS Fargate, Aurora PostgreSQL, Lambda</strong>.</span>
                </li>
                <li className="flex gap-4">
                  <span className="mono-label pt-1.5">03</span>
                  <span>Onboarding <strong className="text-text-primary font-medium">Prometheus + Grafana</strong> observability for Java microservices.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="border-t border-hairline py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[200px_1fr] md:gap-16">
            <div className="reveal">
              <span className="mono-label">§ 01 — Work</span>
              <h2 className="font-serif-display mt-4 text-[clamp(26px,3vw,32px)]">
                Selected <em className="italic" style={{ color: "var(--accent-terra)" }}>work</em>.
              </h2>
            </div>
            <ul className="reveal">
              {work.map((w) => (
                <li key={w.n} className="group border-t border-hairline first:border-t-0">
                  <a href="#contact" className="grid grid-cols-[40px_1fr_auto] items-baseline gap-6 py-6 transition-colors group-hover:bg-[#F4E9DA]">
                    <span className="mono-label">{w.n}</span>
                    <div className="min-w-0">
                      <h3 className="font-serif-display text-[22px] md:text-[26px]">{w.title}</h3>
                      <p className="mt-2 text-[16px] text-text-secondary">{w.desc}</p>
                      <p className="mono-label mt-3">{w.tags.join(" · ")}</p>
                    </div>
                    <span className="mono-label whitespace-nowrap transition-transform group-hover:-translate-x-1 group-hover:!text-terra">
                      {w.year} →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <details className="mt-12 ml-0 md:ml-[216px]">
            <summary className="mono-label cursor-pointer hover:!text-terra">+ Earlier &amp; academic projects</summary>
            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2 text-[15px] text-text-secondary sm:grid-cols-2 lg:grid-cols-3">
              {earlier.map((p) => (
                <li key={p} className="border-b border-hairline py-2">{p}</li>
              ))}
            </ul>
          </details>
        </section>

        {/* Experience */}
        <section id="experience" className="border-t border-hairline py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[200px_1fr] md:gap-16">
            <div className="reveal">
              <span className="mono-label">§ 02 — Experience</span>
              <h2 className="font-serif-display mt-4 text-[clamp(26px,3vw,32px)]">
                A short <em className="italic" style={{ color: "var(--accent-terra)" }}>timeline</em>.
              </h2>
            </div>
            <ol className="relative">
              {experience.map((e, i) => (
                <li key={i} className="reveal relative border-l border-hairline pb-12 pl-8 last:pb-0">
                  <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent-terra)" }} />
                  <p className="mono-label">{e.date} · {e.place}</p>
                  <h3 className="font-serif-display mt-2 text-[22px] md:text-[26px]">
                    {e.role} <span className="text-text-secondary"> — {e.org}</span>
                  </h3>
                  <p className="mt-3 max-w-[62ch] text-[16.5px] text-text-secondary">{e.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Skills */}
        <section className="border-t border-hairline py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[200px_1fr] md:gap-16">
            <div className="reveal">
              <span className="mono-label">§ 03 — Toolkit</span>
              <h2 className="font-serif-display mt-4 text-[clamp(26px,3vw,32px)]">
                Tools I <em className="italic" style={{ color: "var(--accent-terra)" }}>reach for</em>.
              </h2>
            </div>
            <div className="reveal space-y-8">
              {skills.map((g) => (
                <div key={g.label} className="grid grid-cols-1 gap-4 sm:grid-cols-[180px_1fr]">
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

        {/* About */}
        <section id="about" className="border-t border-hairline py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_320px] md:gap-16">
            <div className="reveal">
              <span className="mono-label">§ 04 — About</span>
              <h2 className="font-serif-display mt-4 text-[clamp(28px,3.6vw,38px)]">
                Calm, precise, and a little <em className="italic" style={{ color: "var(--accent-terra)" }}>obsessed</em> with reliability.
              </h2>
              <div className="mt-8 max-w-[60ch] space-y-5 text-[18px] text-text-secondary">
                <p>
                  I grew up taking things apart — circuit boards, scripts, anything that hinted at a system. That curiosity carried into an ECE degree at VNR VJIET and then into building software that quietly holds production together.
                </p>
                <p>
                  Today, I work on cloud-native platforms and infrastructure at Goldman Sachs, with a soft spot for the unglamorous work: clean pipelines, careful migrations, observability that actually answers your questions at 3am.
                </p>
                <p>
                  I co-authored an IEEE ICMACC 2024 paper on RFID + PIN multi-level authentication, and I'm always eager to connect with engineers and industry leaders about backend development, cloud-native platforms, and the future of engineering.
                </p>
              </div>
            </div>
            <aside className="reveal">
              <div className="overflow-hidden rounded-[3px] border border-hairline bg-warm-fill">
                <img
                  src={portrait}
                  alt="Asritha Nibhanupudi"
                  loading="lazy"
                  width={768}
                  height={960}
                  className="aspect-[4/5] h-auto w-full object-cover"
                />
              </div>
              <dl className="mt-5 space-y-3 border-t border-hairline pt-5 text-[14px]">
                <div className="flex justify-between"><dt className="mono-label">Based</dt><dd>Bengaluru, IN</dd></div>
                <div className="flex justify-between"><dt className="mono-label">Role</dt><dd>Analyst, SE</dd></div>
                <div className="flex justify-between"><dt className="mono-label">Degree</dt><dd>B.Tech ECE</dd></div>
                <div className="flex justify-between"><dt className="mono-label">Research</dt><dd>IEEE ICMACC '24</dd></div>
              </dl>
            </aside>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-hairline py-24">
          <div className="reveal mx-auto max-w-[900px] text-center md:text-left">
            <span className="mono-label">§ 05 — Contact</span>
            <h2 className="font-serif-display mt-6 text-[clamp(40px,7vw,76px)]">
              Let's build something{" "}
              <em className="italic" style={{ color: "var(--accent-terra)" }}>reliable</em>.
            </h2>
            <p className="mt-6 max-w-[55ch] text-[19px] text-text-secondary md:mx-0">
              Open to conversations about backend systems, cloud platforms, and the engineering culture that holds them together.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3 md:justify-start">
              <a href={links.email} className="rounded-[3px] bg-terra px-5 py-3 text-[15px] font-medium text-panel transition-colors hover:bg-terra-dark">
                Say hello →
              </a>
              <a href="/resume.pdf" download className="rounded-[3px] border border-hairline bg-panel px-5 py-3 text-[15px] font-medium transition-colors hover:bg-warm-fill">
                Download résumé
              </a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
              {[
                { href: links.github, label: "GitHub" },
                { href: links.linkedin, label: "LinkedIn" },
                { href: links.email, label: "Email" },
                { href: links.research, label: "Research" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} target={l.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer" className="mono-label border-b border-transparent !text-text-secondary transition-colors hover:!text-terra hover:border-terra">
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-6 py-8 md:px-[46px]">
          <p className="mono-label">© 2026 — Asritha Nibhanupudi</p>
          <p className="mono-label">Set in Newsreader, Hanken Grotesk &amp; JetBrains Mono.</p>
        </div>
      </footer>
    </div>
  );
}
