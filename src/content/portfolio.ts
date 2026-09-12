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
  primaryCta: { label: "View my work", href: "/work" },
  secondaryCta: { label: "Download résumé", href: "" }, // wired in component
};

export const CONFIDENTIALITY_NOTICE =
  "This case study is a sanitized explanation of my contribution. Internal names, architecture details, and business information have been omitted or generalized.";

export type ProjectType =
  | "Professional Work"
  | "Engineering Implementation"
  | "Published Research";

export type ProjectCategory =
  | "Backend"
  | "Distributed Systems"
  | "Cloud"
  | "APIs"
  | "Security"
  | "Observability"
  | "Automation"
  | "Research";

export type OwnershipBreakdown = {
  team?: string[];          // what the wider team or system did
  implemented?: string[];   // what I personally implemented
  contributedTo?: string[]; // what I contributed to
  investigated?: string[];  // what I investigated
  validated?: string[];     // what I validated
};

// Private — never rendered. Used to track claim provenance internally.
export type PrivateClaim = {
  claim: string;
  privateSource: string;
  approvedForPublicUse: boolean;
};

export type Project = {
  // identity
  title: string;
  slug: string;
  projectType: ProjectType;
  year: string;

  // surface copy
  shortDescription: string;
  myContribution: string;
  ownershipWording?: string;

  // case-study depth (rendered only when present)
  professionalContext?: string; // "Context"
  problem?: string;
  constraints?: string[];
  approach?: string[];          // "Technical approach"
  decision?: { decision: string; why: string; tradeoff: string };
  alternatives?: string[];
  edgeCases?: string[];         // failure cases or edge cases
  technologies?: string[];
  challenges?: string[];
  outcome?: string;             // qualitative when no verified metric
  confirmedMetrics?: string[];  // only manually-verified counts
  learned?: string;             // "What I learned"
  wouldImprove?: string;        // "What I would improve"
  ownership?: OwnershipBreakdown;
  lessons?: string[];           // short bullet lessons (legacy)

  // research
  publicationUrl?: string;

  // flags
  confidential: boolean;
  featured: boolean;
  categories: ProjectCategory[];
  tags: string[];

  // internal only
  privateClaims?: PrivateClaim[];
};

export const PROJECTS: Project[] = [
  // ---------------- FEATURED ----------------
  {
    slug: "aws-microservices-cdk-ecs",
    title: "AWS-Native Microservices on CDK and ECS Fargate",
    projectType: "Professional Work",
    year: "2026",
    shortDescription:
      "Built AWS-native microservices for a financial subledger platform using TypeScript CDK, ECS Fargate, Aurora PostgreSQL, and Lambda - with routing, auth, and integration tests defined as infrastructure-as-code.",
    myContribution:
      "Implemented service scaffolding and infrastructure-as-code in TypeScript CDK; built containerised services on ECS Fargate backed by Aurora PostgreSQL, with Lambda for event-driven work and integration tests wired into the pipeline.",
    ownershipWording: "Implemented and contributed to",
    professionalContext:
      "Subledger Technology platform inside Asset & Wealth Management. The wider platform spans on-prem and multi-region AWS; this work focused on the AWS-native microservices slice and its supporting infrastructure-as-code, not on owning the broader platform.",
    problem:
      "New services needed a consistent, repeatable way to ship on AWS - networking, container runtime, database access, auth, and tests - without each team re-inventing the deployment shape per service.",
    constraints: [
      "Everything provisioned through code review, not the AWS console",
      "Services had to fit a hybrid model that spans on-prem and multi-region AWS",
      "Database access patterns had to suit a financial workload (durability, predictable failover)",
      "Integration tests had to run in CI against a representative environment, not against mocks only",
    ],
    approach: [
      "Defined service infrastructure in TypeScript CDK so reviewers could read the deployment shape in the same pull request as the code",
      "Ran services on ECS Fargate to avoid managing EC2 capacity and to keep deployments declarative",
      "Used Aurora PostgreSQL as the system of record, with schema and access patterns expressed through migrations",
      "Used Lambda for event-driven and asynchronous edges where running a long-lived container was overkill",
      "Wired routing and auth into the gateway layer as IaC rather than per-service ad-hoc configuration",
      "Added integration tests that exercise real AWS resources from CI to catch wiring mistakes before promotion",
    ],
    decision: {
      decision:
        "Express routing, auth, and integration-test scaffolding as part of the service's CDK stack instead of treating them as separate, hand-managed environment config.",
      why: "When routing and auth were managed outside the service, drift between environments was easy and reviewers could not see in one place what a service actually exposed. Putting it in CDK made the exposed surface reviewable in the same diff as the code.",
      tradeoff:
        "Service authors had to learn the CDK conventions used by the platform, and small routing tweaks now went through code review instead of a console change - slower per change, but auditable.",
    },
    alternatives: [
      "Console-driven networking, gateway routing, and auth configuration (faster initially, but invisible to source control and prone to drift between environments)",
      "Plain CloudFormation YAML instead of CDK (works, but loses the type-checking and shared abstractions that make TypeScript CDK reviewable across teams)",
      "Running services on EC2 instead of ECS Fargate (more control, but adds capacity management without a clear benefit for this workload)",
    ],
    edgeCases: [
      "Cold-start behaviour for Lambda paths on the asynchronous edges",
      "Aurora failover behaviour during planned maintenance windows",
      "Integration tests that passed in CI but pointed at a misconfigured environment resource",
      "Gateway routes that worked in one region but not another because of a region-scoped IaC parameter",
    ],
    technologies: ["AWS", "AWS CDK (TypeScript)", "ECS Fargate", "Aurora PostgreSQL", "AWS Lambda", "API Gateway"],
    challenges: [
      "Keeping the AWS-native slice consistent with on-prem services in the hybrid model",
      "Making integration tests against real AWS resources reliable enough to gate releases",
      "Encoding routing and auth as IaC without making service authors' day-to-day changes painful",
    ],
    outcome:
      "Services landed with a consistent, reviewable deployment shape on AWS, and routing, auth, and integration tests lived alongside the service code in version control rather than in console configuration.",
    learned:
      "Infrastructure that is reviewable in the same diff as the code is dramatically easier to reason about than infrastructure managed in a console. The cost of writing CDK pays itself back the first time you ship the same change across regions.",
    wouldImprove:
      "I would invest more in a shared CDK construct library that captures the routing, auth, and integration-test scaffolding as one reusable unit, so a new service can opt into the platform defaults with a few lines instead of copying patterns across stacks.",
    ownership: {
      team: ["Owned the broader Subledger Technology platform spanning on-prem and multi-region AWS"],
      implemented: [
        "Service infrastructure-as-code in TypeScript CDK",
        "Containerised services on ECS Fargate backed by Aurora PostgreSQL",
        "Lambda-based handlers for event-driven and asynchronous edges",
        "Integration tests running against real AWS resources from CI",
      ],
      contributedTo: [
        "The hybrid API gateway layer that spans on-prem and multi-region AWS",
        "Conventions for routing and auth expressed as IaC",
      ],
      investigated: ["Aurora failover and Lambda cold-start behaviour on critical paths"],
      validated: ["Service behaviour end-to-end via integration tests gated in CI"],
    },
    confidential: true,
    featured: true,
    categories: ["Cloud", "Backend", "APIs"],
    tags: ["AWS", "CDK", "ECS Fargate", "Aurora PostgreSQL", "Lambda", "TypeScript"],
  },
  {
    slug: "automation-framework",
    title: "Automation Framework and Release Workflow",
    projectType: "Professional Work",
    year: "2025",
    shortDescription:
      "Reusable Cypress-based automation framework with REST API and shell-script integrations, executed from CI/CD to validate releases.",
    myContribution:
      "Developed and expanded the framework, added REST API and shell integrations, and wired it into CI/CD pipelines.",
    ownershipWording: "Developed and contributed to",
    professionalContext:
      "Engineering automation system for enterprise services deployed on Kubernetes. Used by release pipelines to validate end-to-end workflows before each rollout.",
    problem:
      "Release validation depended on repetitive manual steps across many workflows, which slowed releases and made regressions easy to miss.",
    constraints: [
      "Coverage had to grow without making the framework harder to maintain",
      "Pipelines had to distinguish real regressions from environment or pipeline noise",
      "Asynchronous application behaviour made naive sleeps unreliable",
    ],
    approach: [
      "Reusable framework components shared across workflows",
      "REST API integrations for workflow setup, state checks, and verification",
      "Shell-script integrations for environment preparation, teardown, and orchestration",
      "Execution from CI/CD so validation runs on every release candidate",
      "Reporting and diagnostics that surface failing steps with enough context to debug",
      "Explicit handling of asynchronous behaviour via waits, polling, and retries",
      "Maintenance and scalability practices to keep the framework usable as coverage grew",
    ],
    decision: {
      decision:
        "Treat asynchronous waits as a first-class framework primitive instead of letting individual workflows handle timing themselves.",
      why: "Individual workflows had grown ad-hoc sleeps and retries that hid real regressions behind flaky failures, so the same async behaviour kept being re-solved per workflow.",
      tradeoff:
        "Authors had to learn a small framework convention instead of writing inline sleeps, and the framework gained a layer of indirection that has to be understood when debugging.",
    },
    alternatives: [
      "Inline sleeps and retries inside each workflow (simpler per file, but encouraged drift and hid regressions)",
      "Outsourcing release validation to manual QA passes (rejected because it does not scale with coverage)",
    ],
    edgeCases: [
      "Pipeline-level flake caused by environment startup, not by the application",
      "Workflows that depended on data created by an earlier step needing strict ordering and cleanup",
      "REST APIs that returned 2xx before the workflow was actually ready",
    ],
    technologies: ["Cypress", "JavaScript", "REST APIs", "Shell scripting", "GitLab CI"],
    challenges: [
      "Asynchronous application behaviour producing intermittent failures",
      "Keeping the framework maintainable as workflow coverage expanded",
      "Distinguishing real regressions from environment or pipeline noise",
    ],
    outcome:
      "Expanded automated coverage to more than 150 workflows, removed repetitive manual release-validation steps, and gave reviewers a clearer signal on whether a failure was a real regression.",
    confirmedMetrics: ["150+ workflows covered by the framework"],
    learned:
      "Most 'flaky tests' are really framework bugs in disguise. Fixing the framework's async model once paid off across every workflow that used it.",
    wouldImprove:
      "With more time I would invest in a structured failure-classifier that groups CI failures by root cause (environment vs application vs framework) so that on-call reviewers see triage hints instead of a raw failure log.",
    ownership: {
      team: ["Owned the broader release process and infrastructure"],
      implemented: [
        "Reusable framework primitives for waits, polling, and retries",
        "REST API and shell-script integration helpers",
      ],
      contributedTo: ["The overall CI/CD pipeline design"],
      investigated: ["Recurring flaky-failure patterns across workflows"],
      validated: ["Workflow coverage across release candidates"],
    },
    confidential: true,
    featured: true,
    categories: ["Automation", "Backend"],
    tags: ["Cypress", "REST APIs", "Shell", "CI/CD", "GitLab CI"],
  },
  {
    slug: "keycloak-identity-flow",
    title: "Keycloak Identity Flow Automation",
    projectType: "Professional Work",
    year: "2025",
    shortDescription:
      "Automated Keycloak identity-provider workflows and root-caused intermittent authentication failures across environments.",
    myContribution:
      "Automated Keycloak workflows via REST APIs, shell scripting, and Cypress; investigated intermittent auth failures and standardised configuration across environments.",
    ownershipWording: "Implemented and contributed to",
    professionalContext:
      "Enterprise services using Keycloak as the identity provider across multiple environments. Work focused on automation, configuration consistency, and failure prevention - not on building an independent authentication product.",
    problem:
      "Authentication failures appeared intermittently across environments with no obvious pattern, and identity-provider configuration was drifting between environments.",
    constraints: [
      "Could not change the identity-provider product itself",
      "Could not store secrets or realm exports in source control without sanitisation",
      "Validation had to run from CI/CD without manual setup per environment",
    ],
    approach: [
      "Automated authentication-flow validation using REST APIs and Cypress",
      "Scripted realm, client, and role setup via the Keycloak Admin REST API",
      "Compared logs and configuration across environments to isolate failures",
      "Identified mismatched client configuration and redirect URIs as a root cause",
      "Standardised the affected configuration across environments",
      "Added CI/CD validation checks to catch the same class of failure earlier",
    ],
    decision: {
      decision:
        "Drive realm and client setup through the Keycloak Admin REST API from scripts instead of editing realm configuration by hand per environment.",
      why: "The intermittent failures kept tracing back to drift between environments: a client redirect URI updated in one environment but not another. Scripted setup made the drift impossible.",
      tradeoff:
        "Setup scripts became a new artifact to maintain, and any future change to identity configuration has to go through the scripts rather than the admin UI.",
    },
    alternatives: [
      "Realm export/import files checked into source control (rejected because exports contain environment-specific secrets and credentials)",
      "Keeping configuration manual but writing a runbook (rejected because runbooks do not catch drift between environments)",
    ],
    edgeCases: [
      "Redirect URI mismatches that only failed under specific browser cookie states",
      "Token-exchange flows that succeeded on the second attempt and masked the underlying misconfiguration",
      "Realm imports failing silently when a role already existed with the same name",
    ],
    technologies: ["Keycloak", "REST APIs", "OIDC", "Cypress", "Shell scripting", "GitLab CI"],
    challenges: [
      "Tracing intermittent failures across services and environments",
      "Keeping identity-provider configuration consistent as environments evolved",
    ],
    outcome:
      "Configuration-driven authentication failures became much rarer after standardising realm and client setup and adding CI/CD validation checks. Environment-to-environment drift was caught earlier in the release process.",
    learned:
      "Most authentication failures are configuration failures. Automating the configuration is more valuable than writing more tests against the authentication flow itself.",
    wouldImprove:
      "I would add an explicit environment-diff report that compares realm and client configuration across environments on every pipeline run, so drift surfaces visually rather than only via failing flows.",
    ownership: {
      team: ["Owned the identity-provider deployment and operational responsibility"],
      implemented: [
        "Scripted realm and client setup against the Keycloak Admin REST API",
        "Automated authentication-flow validation using REST APIs and Cypress",
      ],
      contributedTo: ["Standardising configuration across environments"],
      investigated: ["Intermittent authentication failures and their root causes"],
      validated: ["Authentication flows across releases"],
    },
    confidential: true,
    featured: true,
    categories: ["Security", "Automation", "APIs"],
    tags: ["Keycloak", "REST APIs", "OIDC", "Cypress", "Shell"],
  },
  {
    slug: "kafka-strimzi-upgrade",
    title: "Kafka and Strimzi Upgrade Validation",
    projectType: "Professional Work",
    year: "2025",
    shortDescription:
      "Validated Kafka and Strimzi upgrades on Kubernetes for service compatibility, message-flow stability, and recovery across version changes.",
    myContribution:
      "Contributed to upgrade validation - verified producer and consumer behaviour, Kubernetes deployment changes, pod and service recovery, and message-flow stability across versions.",
    ownershipWording: "Contributed to",
    professionalContext:
      "Apache Kafka deployed via the Strimzi operator on Kubernetes. The wider team owned the Kafka architecture; this work focused on validation of upgrades, not ownership of the platform.",
    problem:
      "Kafka and Strimzi version upgrades carried real risk of message-flow regressions, operator-side surprises, and pod recovery issues, and needed systematic validation before rollout.",
    constraints: [
      "Upgrades had to be rehearsable without affecting production data",
      "Validation had to be reproducible across environments rather than one-shot",
      "Rollback paths had to be considered for each upgrade scenario",
    ],
    approach: [
      "Upgrade planning and pre-upgrade checks",
      "Compatibility verification across Kafka and Strimzi versions",
      "Validation of producer and consumer behaviour before and after upgrade",
      "Verification of Kubernetes deployment changes and operator reconciliation",
      "Investigation of pod and service failures observed during upgrade rehearsals",
      "Message-flow validation including consumer-group state",
      "Rollback considerations for each upgrade scenario",
      "Execution of validation steps through CI/CD",
    ],
    decision: {
      decision:
        "Validate operator-side reconciliation behaviour as a separate concern from broker behaviour, with its own checks in the upgrade rehearsal.",
      why: "Upgrade pain tended to come from the Strimzi operator's reconciliation between versions, not from the brokers themselves, but the two were being treated as one signal.",
      tradeoff:
        "The rehearsal got longer because operator and broker checks now ran as distinct phases instead of one combined pass.",
    },
    alternatives: [
      "Treating the upgrade as a single combined check (faster, but harder to attribute failures)",
      "Skipping rehearsals on minor version bumps (rejected because operator behaviour can still change between minors)",
    ],
    edgeCases: [
      "Pods that recovered on their own after several minutes, masking a slow operator reconciliation",
      "Consumer groups whose offsets appeared correct but whose membership had not stabilised yet",
      "Transient deployment failures during the upgrade that looked like real regressions",
    ],
    technologies: ["Apache Kafka", "Strimzi", "Kubernetes", "kubectl", "GitLab CI"],
    challenges: [
      "Distinguishing environment flakiness from real upgrade regressions",
      "Operator reconciliation behaviour changing between versions",
      "Reproducing transient pod and service failures observed during upgrades",
    ],
    outcome:
      "Provided upgrade validation evidence that supported safer Kafka and Strimzi rollouts on Kubernetes and made operator-side regressions easier to spot during rehearsal.",
    learned:
      "Operator-side reconciliation is often where upgrade pain hides, not the broker itself. Validation is only useful when it clearly separates 'flaky' from 'broken'.",
    wouldImprove:
      "I would automate the comparison of operator state and broker state before and after the upgrade into a single diff artifact attached to the pipeline run, instead of relying on kubectl inspection by hand.",
    ownership: {
      team: ["Owned the Kafka and Strimzi architecture and the upgrade itself"],
      contributedTo: [
        "Upgrade validation across versions",
        "Pre- and post-upgrade verification steps in CI/CD",
      ],
      investigated: [
        "Pod and service failures observed during rehearsals",
        "Operator-side reconciliation behaviour across versions",
      ],
      validated: [
        "Producer and consumer behaviour before and after upgrade",
        "Message-flow stability and consumer-group state",
      ],
    },
    confidential: true,
    featured: true,
    categories: ["Distributed Systems", "Cloud"],
    tags: ["Apache Kafka", "Strimzi", "Kubernetes", "GitLab CI"],
  },
  {
    slug: "kubernetes-cicd-reliability",
    title: "Kubernetes Deployment and CI/CD Reliability",
    projectType: "Professional Work",
    year: "2025",
    shortDescription:
      "Investigated Kubernetes deployment failures and improved CI/CD workflows by diagnosing configuration mismatches, pod failures, and pipeline behaviour.",
    myContribution:
      "Investigated deployment failures (pod startup, CrashLoopBackOff, configuration mismatches), pipeline-stage failures, and environment-specific issues; contributed deployment workflow improvements.",
    ownershipWording: "Investigated and contributed to",
    professionalContext:
      "Enterprise services deployed on Kubernetes with GitLab CI pipelines. This work focused on deployment reliability and CI/CD diagnosis, not on owning a broader Kubernetes platform.",
    problem:
      "Deployments failed intermittently across environments with a mix of pod-level, configuration, and pipeline-stage root causes, slowing delivery.",
    constraints: [
      "Failures often reproduced only in specific environments",
      "Pipeline-stage failures and application failures looked the same to a casual reader of the log",
      "Fixes had to be backwards-compatible with existing deployment manifests",
    ],
    approach: [
      "Analysed Kubernetes events and pod and container logs",
      "Diagnosed pod startup failures and CrashLoopBackOff loops",
      "Identified configuration mismatches in YAML and deployment manifests",
      "Traced pipeline-stage failures to environment-specific causes",
      "Drove configuration consistency across environments",
      "Contributed deployment workflow improvements based on recurring failure patterns",
    ],
    decision: {
      decision:
        "Start every deployment investigation from Kubernetes events and pod descriptions rather than from CI pipeline logs.",
      why: "CI logs were showing symptoms; the actual cause (image pull, readiness probe, config map mismatch) was almost always visible in events much earlier.",
      tradeoff:
        "Investigations took an extra cluster-context step before opening the CI log, which felt slower for the first few minutes but converged on the real cause faster overall.",
    },
    alternatives: [
      "Reading the CI pipeline log top-to-bottom on every failure (familiar, but consistently led people to the wrong layer first)",
      "Re-running the pipeline immediately to see if it was 'just flake' (rejected because it hid real, reproducible failures)",
    ],
    edgeCases: [
      "Readiness probes that passed once and then failed under load during rollout",
      "Config map updates that did not propagate until a pod was manually restarted",
      "Pipeline stages that timed out waiting for a pod that had been evicted",
    ],
    technologies: ["Kubernetes", "kubectl", "YAML", "GitLab CI", "Shell scripting"],
    challenges: [
      "Reproducing environment-specific failures outside the original environment",
      "Distinguishing transient pipeline failures from real deployment regressions",
    ],
    outcome:
      "Recurring deployment and pipeline failure modes were diagnosed and addressed, and reviewers had a more consistent way to triage a failing deployment.",
    learned:
      "Most 'flaky' deployment failures have a real root cause hiding in Kubernetes events or in a config mismatch. Consistent environments cost less than one bad incident.",
    wouldImprove:
      "I would automate a small post-failure diagnostic step in the pipeline that collects pod descriptions, recent events, and config map versions into a single artifact so on-call engineers do not have to recreate that context by hand.",
    ownership: {
      team: ["Owned the broader Kubernetes platform and pipeline infrastructure"],
      contributedTo: ["Deployment workflow improvements based on recurring patterns"],
      investigated: [
        "Pod startup failures and CrashLoopBackOff loops",
        "Configuration mismatches in deployment manifests",
        "Environment-specific pipeline-stage failures",
      ],
      validated: ["Configuration consistency across environments"],
    },
    confidential: true,
    featured: false,
    categories: ["Cloud", "Automation"],
    tags: ["Kubernetes", "GitLab CI", "YAML", "Debugging"],
  },

  // ---------------- ADDITIONAL ----------------
  {
    slug: "rfid-pin-authentication-research",

    title: "Multi-Level RFID and PIN Authentication Research",
    projectType: "Published Research",
    year: "2024",
    shortDescription:
      "A standalone access-control system combining RFID identification with a second PIN-verification step. The work explored how layered authentication could improve access security while remaining practical for embedded hardware.",
    myContribution:
      "Co-authored the paper; contributed to system design, hardware-software integration, and experimental validation.",
    ownershipWording: "Co-authored",
    problem:
      "Single-factor RFID access control is vulnerable to card cloning and loss; PIN-only access control is vulnerable to shoulder-surfing and keypad observation.",
    approach: [
      "RFID-based first-level identity verification",
      "PIN-based second-level authentication",
      "Microcontroller implementation interfacing RFID reader and keypad",
      "Hardware and software integration on a standalone device",
      "Security reasoning around combining independent factors (possession + knowledge)",
      "Experimental methodology and validation of the combined scheme",
    ],
    technologies: ["RFID", "Embedded microcontroller", "Keypad", "Firmware"],
    outcome:
      "Published as 'Multi-level authentication combining RFID and PIN-based access control' at IEEE ICMACC 2024 as a research prototype, not a commercial security product.",
    lessons: [
      "Authentication strength comes from independence of factors, not from stacking similar ones",
      "In access control, the default must be deny - any subsystem fault should fail closed",
    ],
    publicationUrl: LINKS.research,
    confidential: false,
    featured: false,
    categories: ["Research", "Security"],
    tags: ["RFID", "Embedded", "Security", "IEEE"],
  },
];

// Backwards-compat aliases.
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
  "Automation",
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
      "Contributed to Kafka and Strimzi upgrade validation on Kubernetes",
      "Built and integrated 150+ modular Cypress workflows into GitLab CI for release validation",
      "Investigated Kubernetes deployment failures and improved CI/CD reliability",
      "Automated Keycloak and OpenSearch operations via REST APIs and shell scripting",
      "Mentored junior engineers on CI/CD and Kubernetes debugging",
    ],
    stack: ["Kubernetes", "Kafka", "Strimzi", "GitLab CI", "Cypress", "Keycloak", "OpenSearch", "Bash"],
  },
  {
    role: "Project Intern",
    org: "Oracle",
    date: "Jan 2024 - Jul 2024",
    place: "Hyderabad",
    scope: "Test automation contributions on enterprise pipelines.",
    contributions: [
      "Built modular Cypress components for enterprise CI pipelines",
      "Contributed to root-cause analysis on recurring failures",
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
    items: ["REST APIs", "Authentication", "Authorization", "Service integration"],
  },
  {
    label: "Cloud & Infrastructure",
    items: ["AWS", "Kubernetes", "Docker", "Linux", "Infrastructure automation"],
  },
  {
    label: "Distributed Systems",
    items: ["Kafka", "Asynchronous processing", "Fault tolerance"],
  },
  {
    label: "Engineering Productivity",
    items: ["CI/CD", "Git", "GitHub", "GitLab", "Automation", "Debugging"],
  },
  {
    label: "Observability",
    items: ["Prometheus", "Grafana", "Metrics", "Logging", "Alerting"],
  },
];

export const RESEARCH = {
  title: "Multi-level authentication combining RFID and PIN-based access control",
  venue: "IEEE ICMACC 2024",
  note: "Co-authored",
  href: LINKS.research,
  summary:
    "A standalone access-control system combining RFID identification with a second PIN-verification step. The work explored how layered authentication could improve access security while remaining practical for embedded hardware.",
};

export const PUBLIC_REPOS = [
  {
    name: "SONAR-RockVsMine-Prediction-ML-Python",
    href: "https://github.com/Asritha7/SONAR-RockVsMine-Prediction-ML-Python",
    type: "Learning project - Python",
    description:
      "Binary classifier on the UCI SONAR dataset that predicts whether a sonar return is a rock or a mine using logistic regression.",
    tech: ["Python", "NumPy", "pandas", "scikit-learn"],
  },
  {
    name: "YouTube-Comment-Analysis-Python",
    href: "https://github.com/Asritha7/YouTube-Comment-Analysis-Python",
    type: "Learning project - Python",
    description:
      "Pulls comments, likes, and dislikes for a given YouTube video via the YouTube Data API and segregates them by keywords.",
    tech: ["Python", "YouTube Data API", "Google Cloud Console"],
  },
];

// Engineering Notes - short, sanitized technical notes.
export type EngineeringNote = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  whyDifficult: string;
  approach: string;
  technicalDecision: string;
  limitation: string;
  lesson: string;
};

export const ENGINEERING_NOTES: EngineeringNote[] = [
  {
    slug: "automating-keycloak-identity-workflows",
    title: "Automating Keycloak identity workflows",
    summary:
      "What I learned scripting realm, client, and role setup against the Keycloak Admin REST API instead of clicking through the admin UI per environment.",
    problem:
      "Identity-provider configuration was drifting between environments, and the same client redirect URI mismatch kept causing intermittent authentication failures.",
    whyDifficult:
      "Failures only reproduced in some environments. The admin UI was easy to use but invisible to source control, so there was no audit trail for who changed what.",
    approach:
      "Move realm and client setup into scripts that call the Keycloak Admin REST API. Add CI checks that re-apply the desired configuration on every pipeline run.",
    technicalDecision:
      "Idempotent setup scripts - safe to re-run - instead of one-shot exports. Each script reads the current configuration, computes a diff, and only applies what is missing or wrong.",
    limitation:
      "Scripts only cover the configuration that has been encoded. Anything still set by hand in the admin UI can still drift; the discipline only works if every change goes through the scripts.",
    lesson:
      "Most authentication failures are configuration failures. Automating the configuration is more valuable than writing more tests against the authentication flow itself.",
  },
  {
    slug: "validating-kafka-strimzi-upgrades",
    title: "A practical checklist for validating Kafka and Strimzi upgrades",
    summary:
      "How I separate operator-side checks from broker-side checks during an upgrade rehearsal so failures get attributed to the right layer.",
    problem:
      "Upgrades to Kafka or the Strimzi operator carry real risk - message-flow regressions, operator surprises, pod recovery issues - and the failure modes look similar from the outside.",
    whyDifficult:
      "Operator reconciliation behaviour can change between minor versions, and pods can recover on their own after a few minutes. Both effects mask the actual upgrade impact.",
    approach:
      "Run the rehearsal in distinct phases: pre-upgrade snapshot, operator upgrade and reconcile verification, broker upgrade and consumer-group verification, then a rollback dry-run. Validate each phase from CI/CD before moving to the next.",
    technicalDecision:
      "Treat operator state and broker state as two separate signals during the rehearsal instead of a single combined check. The rehearsal got longer, but failures became attributable.",
    limitation:
      "The checklist is only as good as the post-upgrade comparison. Without a structured diff of operator and broker state before and after, subtle regressions can still slip through.",
    lesson:
      "Operator-side reconciliation is often where upgrade pain hides, not the broker itself. Validation only helps when it clearly separates 'flaky' from 'broken'.",
  },
  {
    slug: "investigating-kubernetes-deployment-failures",
    title: "How I investigate Kubernetes deployment failures",
    summary:
      "Why I start from Kubernetes events and pod descriptions rather than the CI pipeline log when a deployment fails.",
    problem:
      "Deployments failed intermittently across environments with a mix of pod-level, configuration, and pipeline-stage root causes, and the CI log usually only showed symptoms.",
    whyDifficult:
      "Pipeline logs and application failures look the same to a casual reader. Re-running the pipeline often masked real, reproducible failures by appearing to 'fix' them.",
    approach:
      "Start every investigation with kubectl get events and kubectl describe pod on the failing deployment. Only open the CI log afterwards, to confirm the symptom matches the cause already visible in the cluster.",
    technicalDecision:
      "Read Kubernetes events first, CI logs second. The extra cluster-context step felt slower for the first few minutes but converged on the actual cause faster overall.",
    limitation:
      "Some failures (image pull, network policy) only show up in cluster-wide logs that a developer may not have access to. Those still need to be escalated to whoever owns the platform.",
    lesson:
      "Most 'flaky' deployment failures have a real root cause hiding in events or config. Consistent environments cost less than one bad incident.",
  },
];

// Testimonials - only render when manually approved.
export type Testimonial = {
  quote: string;
  name: string;            // person name or approved anonymous role
  relationship: string;
  permissionConfirmed: true;
};

export const TESTIMONIALS: Testimonial[] = [];

// Map slug to typed route path for type-safe <Link to=...>
export const PROJECT_ROUTE: Record<string, string> = {
  "aws-microservices-cdk-ecs": "/work/aws-microservices-cdk-ecs",
  "automation-framework": "/work/automation-framework",
  "keycloak-identity-flow": "/work/keycloak-identity-flow",
  "kafka-strimzi-upgrade": "/work/kafka-strimzi-upgrade",
  "kubernetes-cicd-reliability": "/work/kubernetes-cicd-reliability",
  "rfid-pin-authentication-research": "/work/rfid-pin-authentication-research",
};

// CTA label per project type.
export function projectCtaLabel(p: Pick<Project, "projectType">): string {
  switch (p.projectType) {
    case "Published Research":
      return "View research";
    case "Engineering Implementation":
    case "Professional Work":
    default:
      return "Read sanitized case study";
  }
}
