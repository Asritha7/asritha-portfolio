// Single source of truth for portfolio copy. Edit here; all sections re-read.

export const SITE = {
  name: "Asritha Nibhanupudi",
  role: "Software Engineer",
  location: "Bengaluru, India",
  education: "B.Tech, Electronics & Communications - VNR VJIET",
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

export type ProjectCategory =
  | "Backend"
  | "Distributed Systems"
  | "Cloud"
  | "APIs"
  | "Security"
  | "Observability"
  | "Research";

export type ProjectType = "Professional Work" | "Independent Project" | "Research";

export type Project = {
  slug: string;
  title: string;
  shortDescription: string; // one-line engineering problem (card)
  contribution: string;     // what I personally contributed (card)
  blurb: string;            // longer card/intro blurb
  tags: string[];           // up to 5 surfaced on cards
  categories: ProjectCategory[];
  projectType: ProjectType;
  featured: boolean;
  year: string;
  confidential: boolean;

  // detail-page fields
  overview: string;
  problem: string;
  requirements: string[];
  role: string;
  architecture: string;
  implementation: string[];
  decisions: { decision: string; rationale: string }[];
  alternatives: { option: string; why_not: string }[];
  tradeoffs: string[];
  failureScenarios: string[];
  reliability: string[];
  outcome: string;
  lessons: string[];

  // optional links
  githubUrl?: string;
  publicationUrl?: string;
  liveUrl?: string;
};

const PLACEHOLDER = "[Details to confirm]";

export const PROJECTS: Project[] = [
  // ---------------- FEATURED (3) ----------------
  {
    slug: "api-infrastructure",
    title: "Resilient API Infrastructure",
    shortDescription:
      "Hybrid traffic across on-prem and multi-region AWS needed a single, stable entry point.",
    contribution:
      "Implemented routing, IaC modules, and integration tests for the gateway layer.",
    blurb:
      "Hybrid API gateway spanning on-prem and multi-region AWS, designed for fault tolerance and predictable latency.",
    tags: ["AWS", "API Gateway", "CDK", "ECS Fargate", "Nginx"],
    categories: ["APIs", "Cloud", "Backend"],
    projectType: "Professional Work",
    featured: true,
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
      "Region or on-prem path becomes unhealthy - circuit breaker trips and traffic shifts to the healthy path",
      "Edge configuration regression - caught by integration tests in CI before rollout",
      "Auth provider degradation - gateway fails closed for protected routes and surfaces a clear error",
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
      "Treat gateway config as application code - review it, test it, roll it back the same way",
    ],
  },
  {
    slug: "observability",
    title: "Microservice Observability and Service Reliability",
    shortDescription:
      "Service owners couldn't measure latency, errors, or SLOs consistently across environments.",
    contribution:
      "Onboarded Java services to Prometheus, built RED-style Grafana dashboards, and tuned alerts to SLIs.",
    blurb:
      "Onboarded Java microservices to Prometheus and Grafana so on-call engineers could answer 'is the system healthy?' in seconds.",
    tags: ["Prometheus", "Grafana", "Java", "Kubernetes"],
    categories: ["Observability", "Backend", "Distributed Systems"],
    projectType: "Professional Work",
    featured: true,
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
      "Scrape target down - alert fires before service degradation is user-visible",
      "Alert flapping - tuned thresholds and 'for' durations to dampen noise",
      "Dashboard misread during incident - runbook links embedded in each panel",
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
    shortDescription:
      "Kafka and Kubernetes upgrades shipped on manual rehearsals, with no reliable regression signal.",
    contribution:
      "Built the ephemeral-cluster upgrade test framework and wired it into GitLab CI.",
    blurb:
      "Test strategy and automation that let Apache Kafka and Kubernetes upgrades roll out without regressions.",
    tags: ["Apache Kafka", "Strimzi", "Kubernetes", "GitLab CI"],
    categories: ["Distributed Systems", "Cloud", "Backend"],
    projectType: "Professional Work",
    featured: true,
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
      "Consumer-group rebalance during upgrade - validated message delivery semantics post-upgrade",
      "Operator stuck reconciliation - surfaced via timeout with operator logs attached to the run",
      "Flaky network in CI - retried only specific transient steps, not the whole upgrade",
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

  // ---------------- ADDITIONAL SELECTED WORK (3) ----------------
  {
    slug: "authentication-system",
    title: "Enterprise Authentication System",
    shortDescription:
      "Enterprise services needed centralised auth, RBAC, and consistent token lifecycle.",
    contribution:
      "Automated Keycloak realm/client/role configuration and integrated JWT validation across services.",
    blurb:
      "Centralised authentication and authorization across enterprise services using Keycloak, OIDC, and role-based access control.",
    tags: ["Keycloak", "OAuth 2.0", "OIDC", "JWT", "RBAC"],
    categories: ["Security", "APIs", "Backend"],
    projectType: "Professional Work",
    featured: false,
    year: "2025",
    confidential: true,
    overview:
      "Worked on the authentication and authorization layer for enterprise services, using Keycloak as the identity provider and OIDC as the protocol contract between clients, services, and the IdP.",
    problem:
      "Services were authenticating users in inconsistent ways, with ad-hoc role checks and no clear token lifecycle. The team needed a single identity provider, a consistent token format, and role-based access control that services could enforce uniformly.",
    requirements: [
      "Single source of truth for users, clients, and roles",
      "Standards-based protocol (OIDC over OAuth 2.0) for tokens",
      "Short-lived access tokens with refresh-token rotation",
      "Role-based access control enforceable in each service",
      "Automatable realm, client, and role configuration",
    ],
    role:
      "Implementer. Automated Keycloak configuration via the Admin REST API and shell tooling, integrated JWT validation in services, and helped define the role model. " +
      PLACEHOLDER,
    architecture:
      "Clients perform an OIDC Authorization Code (with PKCE) flow against Keycloak. Services validate JWT access tokens (signature, issuer, audience, expiry) and enforce role claims on protected routes. Refresh tokens are rotated; sessions and tokens have explicit, separate lifetimes.",
    implementation: [
      "Automated Keycloak realm, client, and role setup via the Admin REST API",
      "Integrated JWT validation middleware in services (issuer, audience, signature, expiry)",
      "Wired role-based authorization checks on protected endpoints",
      "Scripted environment-specific configuration so envs stayed reproducible",
    ],
    decisions: [
      {
        decision: "OIDC over a custom auth scheme",
        rationale: "Standard protocol with mature libraries and well-understood security properties.",
      },
      {
        decision: "Short-lived access tokens with refresh rotation",
        rationale: "Reduces the blast radius of a leaked token while keeping the user experience seamless.",
      },
      {
        decision: "Roles as JWT claims, validated per request",
        rationale: "Avoids a network hop to the IdP on every authorization check.",
      },
    ],
    alternatives: [
      {
        option: "Per-service session cookies",
        why_not: "Hard to federate across services and clients; no clean SSO story.",
      },
      {
        option: "Long-lived bearer tokens",
        why_not: "Token leakage becomes a major incident instead of a minor one.",
      },
    ],
    tradeoffs: [
      "JWTs can't be revoked instantly without extra infrastructure - short TTLs are the mitigation",
      "Keycloak adds an operational dependency in exchange for centralised identity",
    ],
    failureScenarios: [
      "Keycloak outage - services keep validating already-issued tokens until expiry; new logins fail explicitly",
      "Token signing key rotation - services refresh JWKS before old keys expire",
      "Role misconfiguration - caught by integration tests asserting expected 401/403 responses",
    ],
    reliability: [
      "Realm and client config managed as code, not clicked through a UI",
      "Token and session lifetimes set explicitly per environment",
      "Auth-related failures logged with enough context to distinguish 401 vs 403 vs upstream",
    ],
    outcome:
      "Services migrated to a consistent OIDC-based auth model with role-based access control and reproducible IdP configuration. " +
      PLACEHOLDER,
    lessons: [
      "Most auth bugs are configuration bugs - automating realm setup pays off quickly",
      "Token lifetime is a security-vs-UX trade-off; pick it deliberately per environment",
    ],
  },
  {
    slug: "realtime-monitoring",
    title: "Real-Time Monitoring and Event Processing System",
    shortDescription:
      "High-volume operational events needed asynchronous processing with reliable delivery and back-pressure handling.",
    contribution:
      "Designed Kafka producer/consumer patterns, retry and dead-letter strategy, and consumer-side observability.",
    blurb:
      "Event-driven pipeline using Kafka for asynchronous processing, with retries, dead-letter queues, and consumer observability.",
    tags: ["Apache Kafka", "Java", "Kubernetes", "Prometheus"],
    categories: ["Distributed Systems", "Backend", "Observability"],
    projectType: "Independent Project",
    featured: false,
    year: "2025",
    confidential: false,
    overview:
      "Reference design for a real-time monitoring and event-processing pipeline built on Kafka, focused on the engineering decisions around delivery semantics, consumer failure handling, and horizontal scalability.",
    problem:
      "Operational events arrive in bursts and must be processed without blocking producers, without losing events on consumer failure, and with enough observability that a stuck consumer is visible before downstream systems are affected.",
    requirements: [
      "Asynchronous decoupling between producers and downstream processing",
      "Bounded back-pressure under burst load",
      "Explicit retry and dead-letter strategy for poison messages",
      "Horizontally scalable consumers without re-ordering correctness",
      "Per-consumer metrics: lag, throughput, error rate",
    ],
    role:
      "Designer and implementer of the reference pipeline. " + PLACEHOLDER,
    architecture:
      "Producers publish to a primary topic partitioned by entity key. A consumer group processes messages and ACKs only after success. Transient failures retry with backoff to a retry topic; persistent failures land in a dead-letter topic for inspection. Consumer lag and processing latency are exported as Prometheus metrics.",
    implementation: [
      "Producer with idempotent writes and explicit acks configuration",
      "Consumer group with manual offset commits after successful processing",
      "Retry topic with bounded backoff; dead-letter topic for poison messages",
      "Prometheus metrics for lag, throughput, errors; alerts on lag growth",
    ],
    decisions: [
      {
        decision: "At-least-once delivery with idempotent consumers",
        rationale: "Simpler to operate than exactly-once and sufficient when consumers handle duplicates.",
      },
      {
        decision: "Partition by entity key",
        rationale: "Preserves per-entity ordering while allowing horizontal consumer scale.",
      },
      {
        decision: "Separate retry and dead-letter topics",
        rationale: "Keeps the main topic free of poison messages and makes failure modes observable.",
      },
    ],
    alternatives: [
      {
        option: "Synchronous HTTP processing",
        why_not: "Producers couple to downstream availability; bursts cause cascading failures.",
      },
      {
        option: "Exactly-once semantics end-to-end",
        why_not: "Operational and performance cost outweighs the benefit when consumers can dedupe.",
      },
    ],
    tradeoffs: [
      "At-least-once means consumers must be idempotent",
      "More topics (retry, DLQ) means more operational surface, but clearer failure modes",
    ],
    failureScenarios: [
      "Consumer crash mid-batch - offsets only committed after success, so messages are re-delivered",
      "Poison message - routed to DLQ after N retries instead of blocking the partition",
      "Broker partial outage - producer retries with backoff; consumer lag alert fires if it persists",
    ],
    reliability: [
      "Bounded retry budget per message to avoid infinite reprocessing",
      "Consumer lag alerts tied to user-visible SLOs, not absolute thresholds",
      "DLQ inspection tooling so failures are diagnosed, not just hidden",
    ],
    outcome:
      "A reference pipeline with explicit delivery semantics, retry/DLQ handling, and consumer observability. " +
      PLACEHOLDER,
    lessons: [
      "Delivery semantics are a design decision, not a default - pick them and write them down",
      "A pipeline without consumer lag metrics is invisible until it's already broken",
    ],
    githubUrl: LINKS.github,
  },
  {
    slug: "rfid-authentication-research",
    title: "RFID and PIN-Based Authentication Research",
    shortDescription:
      "Single-factor RFID access control is vulnerable to card cloning and loss; PIN alone is vulnerable to shoulder-surfing.",
    contribution:
      "Co-authored the system design, implemented hardware-software integration, and ran the experimental validation.",
    blurb:
      "Published IEEE research on multi-level authentication combining RFID and PIN-based access control.",
    tags: ["RFID", "Embedded", "Security", "IEEE"],
    categories: ["Research", "Security"],
    projectType: "Research",
    featured: false,
    year: "2024",
    confidential: false,
    overview:
      "Co-authored research, published at IEEE ICMACC 2024, on a multi-level authentication scheme combining RFID and PIN-based access control to mitigate the weaknesses of either factor in isolation.",
    problem:
      "Single-factor RFID access control fails when a card is lost or cloned. Single-factor PIN access control fails to shoulder-surfing and keypad observation. The work explored a layered scheme where both factors must succeed, and where the system fails closed under tampering.",
    requirements: [
      "Two independent authentication factors (possession + knowledge)",
      "Local enrolment of authorised RFID tags",
      "Bounded retry policy on PIN entry",
      "Clear audit trail of access attempts",
    ],
    role:
      "Co-author. Contributed to system design, hardware-software integration, and experimental validation; co-wrote the paper.",
    architecture:
      "An RFID reader and keypad are interfaced with a microcontroller. A successful read of an authorised tag unlocks the PIN-entry stage; correct PIN entry within the retry budget grants access. Unauthorised reads and failed PIN attempts are logged.",
    implementation: [
      "Microcontroller firmware for RFID reader and keypad integration",
      "Local store of authorised tag IDs and PIN hashes",
      "Bounded PIN-retry policy with lockout on repeated failure",
      "Event log of read attempts and PIN outcomes",
    ],
    decisions: [
      {
        decision: "Two independent factors required for access",
        rationale: "Compromise of one factor (lost card or observed PIN) is not sufficient to gain access.",
      },
      {
        decision: "Bounded retry with lockout",
        rationale: "Mitigates brute-force PIN guessing without permanently denying legitimate users.",
      },
    ],
    alternatives: [
      {
        option: "RFID-only access control",
        why_not: "Vulnerable to card cloning and loss.",
      },
      {
        option: "PIN-only access control",
        why_not: "Vulnerable to shoulder-surfing and keypad observation.",
      },
    ],
    tradeoffs: [
      "Two-factor flow adds a small amount of friction to legitimate users",
      "Local credential store simplifies the prototype but limits scale",
    ],
    failureScenarios: [
      "Lost card - second factor still required, so access is not granted",
      "Observed PIN - card is still required, so access is not granted",
      "Repeated PIN failures - account locked out and event logged",
    ],
    reliability: [
      "Fails closed: any subsystem fault denies access rather than granting it",
      "Access attempts logged for audit, including failed PIN entries",
    ],
    outcome:
      "Published as 'Multi-level authentication combining RFID and PIN-based access control' at IEEE ICMACC 2024.",
    lessons: [
      "Authentication strength comes from independence of factors, not from stacking similar ones",
      "Failure mode matters: in access control, default-deny is the only safe choice",
    ],
    publicationUrl: LINKS.research,
  },
];

// Backwards-compat alias used elsewhere in the codebase.
export type CaseStudy = Project;
export const CASE_STUDIES: Project[] = PROJECTS.filter((p) => p.featured);
export const ADDITIONAL_PROJECTS: Project[] = PROJECTS.filter((p) => !p.featured);

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Backend",
  "Distributed Systems",
  "Cloud",
  "APIs",
  "Security",
  "Observability",
  "Research",
];

export const EXPERIENCE = [
  {
    role: "Analyst, Systems Engineering",
    org: "Goldman Sachs",
    date: "May 2026 - Present",
    place: "Bengaluru · On-site",
    scope:
      "Software engineering on the Subledger Technology platform for Asset & Wealth Management - cloud platform, API infrastructure, and observability.",
    contributions: [
      "Contributed to a hybrid API gateway layer spanning on-prem and multi-region AWS",
      "Built AWS-native microservices using CDK (TypeScript), ECS Fargate, Aurora PostgreSQL, and Lambda",
      "Onboarded Java microservices to Prometheus and Grafana for consistent service-level visibility",
      "Implemented routing, auth, and integration tests as infrastructure-as-code",
    ],
    stack: ["AWS", "CDK", "ECS Fargate", "Aurora", "Lambda", "Prometheus", "Grafana", "Java"],
  },
  {
    role: "Software Engineer - Automation & Infrastructure",
    org: "Oracle",
    date: "Aug 2024 - Apr 2026",
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
    date: "Jan 2024 - Jul 2024",
    place: "Hyderabad",
    scope: "Test automation contributions on enterprise pipelines.",
    contributions: [
      "Built modular Cypress components for enterprise CI pipelines",
      "Contributed to root-cause analysis that reduced bug leakage (~20%)",
    ],
    stack: ["Cypress", "JavaScript", "GitLab CI"],
  },
  {
    role: "Web Developer - Intern",
    org: "Oasis Infobyte",
    date: "Jul 2023 - Aug 2023",
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
    body: "Metrics, logs, and traces are decided alongside the API and the data model - not added after the first incident.",
  },
  {
    title: "Automate repeatable engineering work",
    body: "If a step has to happen more than twice, it belongs in code or a pipeline. Manual rehearsals don't scale.",
  },
  {
    title: "Make technical trade-offs explicit",
    body: "Every design choice rules something out. Writing down what - and why - keeps the team honest later.",
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

// Map slug to typed route path for type-safe <Link to=...>
export const PROJECT_ROUTE: Record<string, string> = {
  "api-infrastructure": "/work/api-infrastructure",
  "observability": "/work/observability",
  "kafka-kubernetes": "/work/kafka-kubernetes",
  "authentication-system": "/work/authentication-system",
  "realtime-monitoring": "/work/realtime-monitoring",
  "rfid-authentication-research": "/work/rfid-authentication-research",
};
