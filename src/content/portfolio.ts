// Single source of truth for portfolio copy. Edit here; all sections re-read.

export const SITE = {
  name: "Asritha Nibhanupudi",
  role: "Software Engineer",
  location: "Bengaluru, India",
  education: "B.Tech, Electronics & Communications — VNR VJIET",
  email: "nibhanupudiasritha@gmail.com",
};

export const LINKS = {
  github: "https://github.com/Asritha7",
  linkedin: "https://linkedin.com/in/asritha-nibhanupudi",
  research: "https://ieeexplore.ieee.org/document/10893942",
  email: `mailto:${SITE.email}`,
};

export const HERO = {
  eyebrow: "SOFTWARE ENGINEER · DISTRIBUTED SYSTEMS · CLOUD",
  headline: "I build reliable software systems that scale.",
  description:
    "Software engineer experienced in building backend services, API infrastructure, cloud systems, automation, and observability across AWS and Kubernetes.",
  primaryCta: { label: "View my work", href: "#work" },
  secondaryCta: { label: "Download résumé", href: "" }, // wired in component
};

export type CaseStudy = {
  slug: "api-infrastructure" | "observability" | "kafka-kubernetes";
  title: string;
  blurb: string;
  tags: string[];
  year: string;
  confidential: boolean;
  overview: string;
  problem: string;
  requirements: string[];
  role: string;
  architecture: string; // text description (diagram is a component prop)
  implementation: string[];
  decisions: { decision: string; rationale: string }[];
  alternatives: { option: string; why_not: string }[];
  tradeoffs: string[];
  failureScenarios: string[];
  reliability: string[];
  outcome: string;
  lessons: string[];
};

const PLACEHOLDER = "[Details to confirm]";

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "api-infrastructure",
    title: "Resilient API Infrastructure",
    blurb:
      "Hybrid API gateway spanning on-prem and multi-region AWS, designed for fault tolerance and predictable latency.",
    tags: ["AWS", "API Gateway", "CDK", "ECS Fargate", "Nginx"],
    year: "2026",
    confidential: true,
    overview:
      "Contributed to the design and implementation of an API gateway layer that routes traffic between on-prem services and AWS-native microservices for an asset & wealth management platform.",
    problem:
      "Internal and partner clients needed a single, stable entry point to services hosted both on-prem and across multiple AWS regions, without exposing the underlying topology or coupling clients to deployment changes.",
    requirements: [
      "Stable public contract independent of where a service runs",
      "Predictable latency across hybrid deployments",
      "Graceful degradation when an upstream region or on-prem path is unhealthy",
      "Observability sufficient to debug routing decisions in production",
    ],
    role:
      "Contributor on the platform team. Implemented routing configuration, infrastructure-as-code modules, and validation tests; collaborated with senior engineers on the overall design. " +
      PLACEHOLDER,
    architecture:
      "Clients reach a regional edge that performs authentication and request shaping, then routes to either an on-prem service path or an AWS service path based on policy. Health checks and circuit-breaker rules govern failover.",
    implementation: [
      "Defined infrastructure modules using AWS CDK (TypeScript)",
      "Configured edge routing and request rewriting rules",
      "Wrote integration tests covering routing, failover, and auth paths",
      "Wired structured request logging and routing metrics",
    ],
    decisions: [
      {
        decision: "Edge-level routing instead of client-side service discovery",
        rationale:
          "Keeps the public contract stable and removes routing logic from every client, at the cost of additional infrastructure to operate.",
      },
      {
        decision: "Infrastructure-as-code via CDK",
        rationale:
          "Lets the team review routing and capacity changes through normal code review and roll back deterministically.",
      },
    ],
    alternatives: [
      {
        option: "Direct point-to-point client connections",
        why_not: "Couples every client to topology and complicates region failover.",
      },
      {
        option: "A single global gateway in one region",
        why_not: "Adds cross-region latency for the majority of requests and creates a single failure domain.",
      },
    ],
    tradeoffs: [
      "Operational surface area is larger than a single-region gateway",
      "Additional latency hop in exchange for a stable contract and centralised policy",
    ],
    failureScenarios: [
      "Region or on-prem path becomes unhealthy — circuit breaker trips and traffic shifts to the healthy path",
      "Edge configuration regression — caught by integration tests in CI before rollout",
      "Auth provider degradation — gateway fails closed for protected routes and surfaces a clear error",
    ],
    reliability: [
      "Health-checked upstreams with explicit timeouts",
      "Staged rollouts of edge configuration",
      "Routing metrics and structured logs for post-incident analysis",
    ],
    outcome:
      "Provided a single, stable entry point for hybrid traffic. " + PLACEHOLDER,
    lessons: [
      "A small amount of routing observability pays for itself the first time a partial outage happens",
      "Treat gateway config as application code — review it, test it, roll it back the same way",
    ],
  },
  {
    slug: "observability",
    title: "Microservice Observability and Service Reliability",
    blurb:
      "Onboarded Java microservices to Prometheus and Grafana so on-call engineers could answer 'is the system healthy?' in seconds.",
    tags: ["Prometheus", "Grafana", "Java", "Kubernetes"],
    year: "2026",
    confidential: true,
    overview:
      "Contributed to standing up a Prometheus and Grafana stack and onboarding Java microservices to it, so reliability could be measured rather than guessed.",
    problem:
      "Service owners had limited visibility into request rates, latency distributions, and error budgets across environments, which made incident triage slow and SLO conversations subjective.",
    requirements: [
      "Consistent service metrics across teams",
      "Latency percentiles, not just averages",
      "Dashboards that an on-call engineer can read under pressure",
      "Alerting tied to user-visible behaviour, not infrastructure noise",
    ],
    role:
      "Implementer / contributor. Onboarded services, defined dashboards and alert templates, and worked with service owners on SLI definitions. " +
      PLACEHOLDER,
    architecture:
      "Each service exposes a /metrics endpoint scraped by Prometheus. Grafana renders per-service and per-environment dashboards; alerting rules notify the on-call channel when SLIs drift.",
    implementation: [
      "Added metrics instrumentation to Java services and validated scrape targets",
      "Built reusable Grafana dashboard templates for request rate, error rate, latency, and saturation",
      "Defined alert thresholds tied to SLIs and tuned them against historical noise",
      "Documented an onboarding checklist for future services",
    ],
    decisions: [
      {
        decision: "RED-style dashboards (Rate, Errors, Duration) as the default",
        rationale: "Gives a consistent first read across services so incident triage doesn't require remembering each service's quirks.",
      },
      {
        decision: "Latency percentiles (p50, p95, p99) over averages",
        rationale: "Averages hide tail latency, which is where most user-visible pain lives.",
      },
    ],
    alternatives: [
      {
        option: "A vendor APM-only approach",
        why_not: "Cost and lock-in concerns; Prometheus also fits the existing Kubernetes deployment model.",
      },
      {
        option: "Per-team ad-hoc dashboards",
        why_not: "Inconsistent across services and unreadable during incidents.",
      },
    ],
    tradeoffs: [
      "Prometheus storage and cardinality need active management",
      "Standard dashboards trade some service-specific nuance for consistency",
    ],
    failureScenarios: [
      "Scrape target down — alert fires before service degradation is user-visible",
      "Alert flapping — tuned thresholds and 'for' durations to dampen noise",
      "Dashboard misread during incident — runbook links embedded in each panel",
    ],
    reliability: [
      "SLIs reviewed with service owners rather than imposed",
      "Alert rules versioned alongside the dashboards",
      "Onboarding checklist so new services start observable, not added later",
    ],
    outcome:
      "Service owners gained a consistent view of health and latency across environments. " + PLACEHOLDER,
    lessons: [
      "Dashboards should answer one question each; the rest is noise during an incident",
      "An SLI you can't explain to the team owning the service isn't useful",
    ],
  },
  {
    slug: "kafka-kubernetes",
    title: "Kafka and Kubernetes Upgrade Automation",
    blurb:
      "Test strategy and automation that let Apache Kafka and Kubernetes upgrades roll out without regressions.",
    tags: ["Apache Kafka", "Strimzi", "Kubernetes", "GitLab CI"],
    year: "2025",
    confidential: true,
    overview:
      "Designed and implemented a test strategy for Apache Kafka (Strimzi operator) on Kubernetes so that major version upgrades could ship with confidence.",
    problem:
      "Kafka and Kubernetes version upgrades historically required heavy manual validation. The team needed an automated way to detect regressions in producer/consumer behaviour, partition rebalancing, and operator reconciliation across versions.",
    requirements: [
      "Reproducible upgrade tests in CI",
      "Coverage of producer, consumer, and operator-managed lifecycle",
      "Fast feedback for upgrade pull requests",
      "Clear separation between flaky environment and real regression",
    ],
    role:
      "Implementer. Built the test framework, integrated it into GitLab CI, and partnered with platform engineers on which upgrade scenarios mattered. " +
      PLACEHOLDER,
    architecture:
      "A GitLab CI pipeline spins up a Kubernetes test cluster, installs the target Strimzi version, runs producer/consumer workloads, executes the upgrade, and re-validates message ordering, consumer-group state, and operator reconciliation.",
    implementation: [
      "Modular test stages: provision → baseline → upgrade → validate → teardown",
      "Reusable fixtures for producer/consumer workloads",
      "Retry policy that distinguishes flaky environment from real failure",
      "Reports surfaced as CI artifacts and linked from the merge request",
    ],
    decisions: [
      {
        decision: "Ephemeral clusters per pipeline run",
        rationale: "Eliminates cross-test contamination and makes failures reproducible locally.",
      },
      {
        decision: "Validate operator reconciliation, not just data plane",
        rationale: "Most upgrade pain came from operator-side surprises, not broker behaviour.",
      },
    ],
    alternatives: [
      {
        option: "Manual upgrade rehearsals",
        why_not: "Slow, inconsistent, and hard to reproduce when something breaks.",
      },
      {
        option: "Shared long-lived test cluster",
        why_not: "Cross-test interference made failures non-reproducible.",
      },
    ],
    tradeoffs: [
      "Per-run clusters cost more CI minutes than a shared environment",
      "Test surface area grows with each Kafka/operator version supported",
    ],
    failureScenarios: [
      "Consumer-group rebalance during upgrade — validated message delivery semantics post-upgrade",
      "Operator stuck reconciliation — surfaced via timeout with operator logs attached to the run",
      "Flaky network in CI — retried only specific transient steps, not the whole upgrade",
    ],
    reliability: [
      "Deterministic provisioning so the same pipeline yields the same result",
      "Logs and operator state captured for every failure",
      "Upgrade path documented from the test scenarios, not from memory",
    ],
    outcome:
      "Upgrade pull requests shipped with automated regression coverage instead of manual rehearsals. " + PLACEHOLDER,
    lessons: [
      "Operator reconciliation is the part of a Kafka upgrade that surprises you, not the broker",
      "A test that can't tell flaky from broken will be ignored by the team it's meant to help",
    ],
  },
];

export const EXPERIENCE = [
  {
    role: "Analyst, Systems Engineering",
    org: "Goldman Sachs",
    date: "May 2026 — Present",
    place: "Bengaluru · On-site",
    scope:
      "Software engineering on the Subledger Technology platform for Asset & Wealth Management — cloud platform, API infrastructure, and observability.",
    contributions: [
      "Contributed to a hybrid API gateway layer spanning on-prem and multi-region AWS",
      "Built AWS-native microservices using CDK (TypeScript), ECS Fargate, Aurora PostgreSQL, and Lambda",
      "Onboarded Java microservices to Prometheus and Grafana for consistent service-level visibility",
      "Implemented routing, auth, and integration tests as infrastructure-as-code",
    ],
    stack: ["AWS", "CDK", "ECS Fargate", "Aurora", "Lambda", "Prometheus", "Grafana", "Java"],
  },
  {
    role: "Software Engineer — Automation & Infrastructure",
    org: "Oracle",
    date: "Aug 2024 — Apr 2026",
    place: "Hyderabad",
    scope:
      "Engineering productivity, CI/CD, and platform reliability for enterprise services on Kubernetes.",
    contributions: [
      "Designed an upgrade test strategy for Apache Kafka on Kubernetes (Strimzi operator)",
      "Built and integrated 150+ modular Cypress tests into GitLab CI (~60% less regression effort) [confirm whether reduced effort or cycle time]",
      "Optimised GitLab pipelines for faster, more consistent deployments (~30%)",
      "Automated Keycloak and OpenSearch operations via REST APIs and shell scripting",
      "Mentored junior engineers on CI/CD and Kubernetes debugging",
    ],
    stack: ["Kubernetes", "Kafka", "Strimzi", "GitLab CI", "Cypress", "Keycloak", "OpenSearch", "Bash"],
    note: '"Best Efforts" recognition [confirm award vs nomination]',
  },
  {
    role: "Project Intern",
    org: "Oracle",
    date: "Jan 2024 — Jul 2024",
    place: "Hyderabad",
    scope: "Test automation contributions on enterprise pipelines.",
    contributions: [
      "Built modular Cypress components for enterprise CI pipelines",
      "Contributed to root-cause analysis that reduced bug leakage (~20%)",
    ],
    stack: ["Cypress", "JavaScript", "GitLab CI"],
  },
  {
    role: "Web Developer — Intern",
    org: "Oasis Infobyte",
    date: "Jul 2023 — Aug 2023",
    place: "Remote",
    scope: "Front-end implementation of responsive marketing pages.",
    contributions: [
      "Shipped responsive components and landing pages",
      "Published work to GitHub for review",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
  },
];

export const PRINCIPLES = [
  {
    title: "Reliability before unnecessary complexity",
    body: "Choose the simplest design that meets the reliability goal. Complexity is a cost paid every on-call shift.",
  },
  {
    title: "Observability is part of the system design",
    body: "Metrics, logs, and traces are decided alongside the API and the data model — not added after the first incident.",
  },
  {
    title: "Automate repeatable engineering work",
    body: "If a step has to happen more than twice, it belongs in code or a pipeline. Manual rehearsals don't scale.",
  },
  {
    title: "Make technical trade-offs explicit",
    body: "Every design choice rules something out. Writing down what — and why — keeps the team honest later.",
  },
  {
    title: "Build systems that are understandable and maintainable",
    body: "Code, infrastructure, and dashboards are read more often than they are written. Optimise for the next engineer.",
  },
];

export const CAPABILITIES: { label: string; items: string[] }[] = [
  { label: "Programming", items: ["C++", "Python", "JavaScript", "TypeScript", "SQL", "Bash", "Java"] },
  {
    label: "Backend & APIs",
    items: ["REST APIs", "Authentication", "Authorization", "Service integration", "Event-driven systems"],
  },
  {
    label: "Cloud & Infrastructure",
    items: ["AWS", "Kubernetes", "Docker", "Linux", "Infrastructure automation"],
  },
  {
    label: "Distributed Systems",
    items: ["Kafka", "Asynchronous processing", "Fault tolerance", "Resilient system design"],
  },
  {
    label: "Engineering Productivity",
    items: ["CI/CD", "Git", "GitHub", "GitLab", "Automation", "Debugging"],
  },
  {
    label: "Observability",
    items: ["Prometheus", "Grafana", "Metrics", "Logging", "Alerting", "SLIs"],
  },
];

export const RESEARCH = {
  title: "Multi-level authentication combining RFID and PIN-based access control",
  venue: "IEEE ICMACC 2024",
  note: "Co-authored",
  href: LINKS.research,
};

export const PUBLIC_REPOS = [
  {
    title: "Event-driven backend service using Kafka",
    blurb: "A small production-style service demonstrating asynchronous processing and back-pressure handling.",
    status: "Coming soon",
  },
  {
    title: "REST API with authentication and observability",
    blurb: "A reference API project with structured logging, metrics, and an auth layer wired end-to-end.",
    status: "Coming soon",
  },
  {
    title: "Distributed job-processing service on Docker / Kubernetes",
    blurb: "A worker pool pattern packaged for container deployment with health and readiness signals.",
    status: "Coming soon",
  },
];

export const EARLIER_PROJECTS = [
  { label: "SONAR Rock vs Mine (Python/ML)", href: "https://github.com/Asritha7" },
  { label: "YouTube Comment Analysis (Python)", href: "https://github.com/Asritha7" },
  { label: "Soil Moisture Monitoring (ESP32)", href: "" },
  { label: "Audio Transmission via Li-Fi", href: "" },
  { label: "Website Blocker (Python)", href: "" },
  { label: "PCB Design & Fabrication (KiCad)", href: "" },
];
