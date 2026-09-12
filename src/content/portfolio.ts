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
  team?: string[];          // wider system context / what the wider team or system did
  implemented?: string[];   // components I personally implemented
  contributedTo?: string[]; // what I contributed to
  integrated?: string[];    // components I integrated
  investigated?: string[];  // what I investigated
  validated?: string[];     // components I validated
};

// Private — never rendered. Used to track claim provenance internally.
export type PrivateClaim = {
  claim: string;
  privateSource: string;
  approvedForPublicUse: boolean;
};

export type VerifiedMetric = {
  label: string;
  value: string;
  approvedForPublicUse: boolean;
};

export type EngineeringMoment = {
  symptom: string;
  initialAssumption: string;
  investigation: string;
  rootCause: string;
  changeMade: string;
};

export type Project = {
  // identity
  title: string;
  slug: string;
  shortTitle?: string;
  projectType: ProjectType;
  year: string;

  // surface copy
  shortDescription: string;
  myContribution: string;
  ownershipWording?: string;
  scopeNote?: string; // rendered near start of case study when present

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
  beforeState?: string;
  afterState?: string;
  verifiedMetrics?: VerifiedMetric[];
  confirmedMetrics?: string[];  // legacy
  engineeringMoment?: EngineeringMoment;
  learned?: string;             // "What I learned"
  wouldImprove?: string;        // "What I would improve"
  ownership?: OwnershipBreakdown;
  lessons?: string[];           // short bullet lessons (legacy)

  // links
  publicationUrl?: string;
  repositoryUrl?: string;
  liveUrl?: string;

  // flags
  confidential: boolean;
  featured: boolean;
  categories: ProjectCategory[];
  tags: string[];

  // internal only
  privateClaims?: PrivateClaim[];
  claimEvidence?: PrivateClaim[];
};

export const PROJECTS: Project[] = [
  // ---------------- FEATURED ----------------
  {
    slug: "aws-microservices-cdk-ecs",
    title: "AWS Microservice Infrastructure and Integration",
    projectType: "Professional Work",
    year: "2026",
    shortDescription:
      "Contributed to a defined AWS-native microservice scope using TypeScript CDK, ECS Fargate, Aurora PostgreSQL, and Lambda, including infrastructure definitions, routing, authentication, and integration validation.",
    myContribution:
      "Implemented and contributed to defined service infrastructure and integration components using TypeScript CDK, ECS Fargate, Aurora PostgreSQL and Lambda.",
    ownershipWording: "Contributed to",
    scopeNote:
      "This case study covers my contribution to a defined service and infrastructure scope rather than ownership of the wider platform.",
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
      "Services in the scope I contributed to landed with a consistent, reviewable deployment shape on AWS, and routing, auth, and integration tests lived alongside the service code in version control rather than in console configuration.",
    learned:
      "Infrastructure that is reviewable in the same diff as the code is easier to reason about than infrastructure managed in a console, particularly when the same change has to ship across regions.",
    wouldImprove:
      "I would invest more in a shared CDK construct library that captures the routing, auth, and integration-test scaffolding as one reusable unit, so a new service can opt into the platform defaults with a few lines instead of copying patterns across stacks.",
    ownership: {
      team: ["The wider Subledger Technology platform spanning on-prem and multi-region AWS is owned by the broader team, not by me"],
      implemented: [
        "Service infrastructure-as-code in TypeScript CDK within my scope",
        "Containerised services on ECS Fargate backed by Aurora PostgreSQL within my scope",
        "Lambda-based handlers for event-driven and asynchronous edges within my scope",
        "Integration tests running against real AWS resources from CI for the services I worked on",
      ],
      contributedTo: [
        "Conventions for routing and auth expressed as IaC",
      ],
      integrated: [
        "The hybrid API gateway layer that spans on-prem and multi-region AWS, from the service side",
      ],
      investigated: ["Aurora failover and Lambda cold-start behaviour on critical paths within my scope"],
      validated: ["Service behaviour end-to-end via integration tests gated in CI for the services I worked on"],
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
      "Many recurring failures in this framework came from inconsistent asynchronous handling or shared automation behaviour rather than application regressions. Fixing the framework's async model once paid off across every workflow that used it.",
    wouldImprove:
      "With more time I would invest in a structured failure-classifier that groups CI failures by root cause (environment vs application vs framework) so that reviewers receive triage hints instead of only a raw failure log.",
    ownership: {
      team: ["The broader release process and infrastructure was owned by the wider team"],
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
      why: "The intermittent failures kept tracing back to drift between environments: a client redirect URI updated in one environment but not another. Scripted setup significantly reduced drift for the configuration managed through the automation.",
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
      "In this system, several recurring authentication failures were caused by configuration drift rather than by the authentication implementation itself. Automating the configuration is more valuable than writing more tests against the authentication flow itself.",
    wouldImprove:
      "I would add an explicit environment-diff report that compares realm and client configuration across environments on every pipeline run, so drift surfaces visually rather than only via failing flows.",
    ownership: {
      team: ["The identity-provider deployment and operational responsibility sat with the wider team"],
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
      "During these upgrade rehearsals, several difficult failures appeared in operator reconciliation rather than broker behaviour. Validation is only useful when it clearly separates 'flaky' from 'broken'.",
    wouldImprove:
      "I would automate the comparison of operator state and broker state before and after the upgrade into a single diff artifact attached to the pipeline run, instead of relying on kubectl inspection by hand.",
    ownership: {
      team: ["The Kafka and Strimzi architecture and the upgrade itself were owned by the wider team"],
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
      why: "CI logs were showing symptoms; in the failures I investigated, the actual cause (image pull, readiness probe, config map mismatch) was typically visible in events much earlier.",
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
      "Several deployment failures initially classified as flaky had identifiable causes in Kubernetes events, deployment configuration, or environment state. Consistent environments cost less than one bad incident.",
    wouldImprove:
      "I would automate a small post-failure diagnostic step in the pipeline that collects pod descriptions, recent events, and config map versions into a single artifact so engineers reviewing pipeline failures do not have to recreate that context by hand.",
    ownership: {
      team: ["The broader Kubernetes platform and pipeline infrastructure was owned by the wider team"],
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
      "Contributed to AWS-native microservices using CDK (TypeScript), ECS Fargate, Aurora PostgreSQL, and Lambda",
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
    body: "I prefer the simplest design that satisfies the reliability requirement. In automation and deployment workflows, each additional configuration path creates another opportunity for inconsistency.",
  },
  {
    title: "Make failures understandable",
    body: "I treat useful logs, metrics, and failure messages as part of implementation because they determine how quickly a failed integration or deployment can be diagnosed.",
  },
  {
    title: "Automate repeatable engineering work",
    body: "When a release, validation, or configuration step must be performed repeatedly, I look for a safe way to encode it in a script, framework, or pipeline.",
  },
  {
    title: "Make trade-offs explicit",
    body: "I prefer documenting what a solution improves and what it makes more expensive, slower, or harder to maintain.",
  },
  {
    title: "Build software others can maintain",
    body: "I value reusable components, clear failure behaviour, and code that another engineer can understand without relying on undocumented context.",
  },
];

export const CAPABILITIES: { label: string; items: string[] }[] = [
  {
    label: "Software Development",
    items: ["TypeScript", "JavaScript", "Python", "Java", "SQL", "Bash"],
  },
  {
    label: "Cloud and Service Infrastructure",
    items: ["AWS", "AWS CDK", "ECS Fargate", "Kubernetes", "Docker", "Linux"],
  },
  {
    label: "Distributed Systems and Integrations",
    items: ["Kafka", "REST APIs", "Authentication", "Authorization", "Service integration", "Asynchronous processing"],
  },
  {
    label: "Delivery and Reliability",
    items: ["GitLab CI", "GitHub", "Cypress", "Prometheus", "Grafana", "Logging", "Deployment debugging"],
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

// Engineering Notes - longer, sanitized technical notes intended to be useful
// references, not summaries of the case studies.
export type NoteChecklist = { heading: string; items: string[] };

export type DecisionStep = { step: string; detail?: string };

export type EngineeringNote = {
  slug: string;
  title: string;
  summary: string;
  introduction: string;
  problem: string;
  whyDifficult: string;
  approach: string;
  importantDecision: { title: string; body: string };
  conclusion: string;
  // optional structured content
  practicalSteps?: string[];
  checklists?: NoteChecklist[];
  decisionFlow?: DecisionStep[];          // for the Kubernetes note
  subsections?: { heading: string; body: string }[]; // freeform extra sections
  limitations: string[];
  whenNotToApply: string;
};

export const ENGINEERING_NOTES: EngineeringNote[] = [
  {
    slug: "automating-keycloak-identity-workflows",
    title: "Reducing Keycloak configuration drift with repeatable automation",
    summary:
      "A practical note on driving Keycloak realm, client, and identity-provider configuration from code so the same desired state can be re-applied across environments.",
    introduction:
      "In this note I describe a general pattern for treating Keycloak configuration as desired state and reconciling it through automation, rather than configuring each environment through the admin UI. The goal is to make configuration repeatable and reviewable, not to claim that all authentication issues come from configuration.",
    problem:
      "Authentication behaviour can differ across environments when realm, client, redirect URI, identity-provider, or authentication-flow configuration is changed by hand. Small differences between environments tend to surface as intermittent login or token failures that are hard to attribute, because the runtime symptom rarely names the misconfigured field.",
    whyDifficult:
      "Manual changes through the admin UI are easy to make but invisible to source control, so there is no shared record of what changed, when, or why. Drift accumulates slowly and is usually noticed only when a specific flow breaks in one environment.",
    approach:
      "Express the configuration that matters as a desired state, read the existing state from the Keycloak Admin REST API, and reconcile the two in a way that is safe to re-run. Keep the scope narrow: only the fields the workflow is willing to own should be reconciled. Everything else should be left alone so the automation does not silently overwrite changes it does not understand.",
    subsections: [
      {
        heading: "Desired state versus existing state",
        body:
          "The general idea is to: read the desired configuration from a checked-in source, read the existing configuration from Keycloak, compare only the approved fields, create resources that are missing, update only intended differences, validate critical settings (such as redirect URIs and authentication settings), and return a clear failure message when validation fails. Each of these steps is described as a pattern; the exact implementation depends on the project.",
      },
      {
        heading: "Idempotency",
        body:
          "Rerunning the workflow should not create duplicate clients, roles, flows, or identity-provider entries. The pattern is to look up resources by a stable identifier (for example client ID or alias), create them only when absent, and update only the approved subset of fields when they exist. This is an idempotency goal, not a guarantee — it holds only for the fields the workflow actually manages.",
      },
      {
        heading: "Token expiry during longer workflows",
        body:
          "Administrative access tokens have a limited lifetime. Workflows that run for more than a few minutes (large realms, many clients, retries) can outlive the token they started with. A practical approach is to acquire the token close to where it is used, check for token-expiry errors from the Admin API, and reacquire the token instead of failing the whole run. Token acquisition should not be logged or echoed.",
      },
      {
        heading: "Secret management",
        body:
          "Client secrets, admin credentials, and identity-provider secrets should not be hardcoded in scripts, committed to source control, written to logs, or shipped in client-side configuration. They should be read from the environment or a secrets manager at the point of use, and the workflow should fail with a clear, non-revealing error when a required secret is missing.",
      },
    ],
    practicalSteps: [
      "Retrieve an administrative access token",
      "Read the current realm or client configuration",
      "Compare approved properties with the desired configuration",
      "Create resources that are missing",
      "Update approved properties that differ",
      "Validate redirect URIs and authentication settings",
      "Return a specific error when configuration validation fails",
    ],
    importantDecision: {
      title: "Reconcile only the fields the workflow owns",
      body:
        "It is tempting to push the entire Keycloak export through automation. In this workflow, scoping the reconciliation to a narrow set of approved fields was more useful: it kept the change surface small, made review easier, and avoided overwriting fields that other teams or operators set deliberately.",
    },
    limitations: [
      "Configuration not represented in automation can still drift",
      "Manual changes made directly in the admin UI can still create inconsistencies",
      "Environment-specific secrets require separate handling outside the workflow",
      "Automation does not prevent Keycloak product or infrastructure failures",
    ],
    whenNotToApply:
      "A simple one-off local environment, or a short-lived experiment, may not justify building a complete desired-state workflow. In those cases a documented manual setup is usually enough.",
    conclusion:
      "In this workflow, treating Keycloak configuration as desired state and reconciling a narrow, approved set of fields reduced the kind of drift that previously caused environment-specific authentication failures. The approach is most useful when the same configuration has to exist in more than one environment.",
  },

  {
    slug: "validating-kafka-strimzi-upgrades",
    title: "A practical Kafka and Strimzi upgrade validation checklist",
    summary:
      "A checklist-shaped note for Kafka and Strimzi upgrade rehearsals, organised so failures get attributed to the right layer rather than to 'the upgrade'.",
    introduction:
      "This note collects the checks I have found useful when rehearsing a Kafka and Strimzi upgrade. It is structured as separate checklists for before, during the operator upgrade, during the Kafka upgrade, and after, because in these rehearsals operator-side and broker-side failures looked similar from the outside until they were observed separately.",
    problem:
      "Upgrades to Kafka or the Strimzi operator can introduce message-flow regressions, operator reconciliation surprises, or pod-recovery behaviour that masks the actual impact. Without an explicit checklist, it is easy to declare an upgrade successful while a subtle regression is still in flight.",
    whyDifficult:
      "Operator reconciliation behaviour can change between minor versions, and pods can recover on their own after a few minutes. Both effects make it harder to tell whether a symptom is the upgrade itself, a transient issue, or an application-side effect reacting to a broker restart.",
    approach:
      "Treat the rehearsal as four distinct phases (before, operator upgrade, Kafka upgrade, after) and validate each phase before moving to the next. Keep operator state and broker state as separate signals throughout, because mixing them obscures which layer changed.",
    checklists: [
      {
        heading: "Before the upgrade",
        items: [
          "Record current Kafka and Strimzi versions",
          "Review supported compatibility combinations",
          "Confirm operator reconciliation is healthy",
          "Confirm brokers and dependent applications are healthy",
          "Record relevant topic and consumer-group state",
          "Confirm producer and consumer validation paths",
          "Review rollback assumptions",
          "Capture current warnings or known issues",
        ],
      },
      {
        heading: "During the Strimzi operator upgrade",
        items: [
          "Watch operator rollout status",
          "Inspect reconciliation events",
          "Check custom-resource status",
          "Confirm that expected resources remain managed",
          "Record unexpected warnings or errors",
        ],
      },
      {
        heading: "During the Kafka upgrade",
        items: [
          "Observe broker restart behaviour",
          "Confirm brokers rejoin correctly",
          "Monitor application connectivity",
          "Validate producer behaviour",
          "Validate consumer behaviour",
          "Watch consumer-group stability",
          "Record message-flow failures",
        ],
      },
      {
        heading: "After the upgrade",
        items: [
          "Produce and consume validation messages",
          "Confirm consumer offsets behave as expected",
          "Confirm applications reconnect successfully",
          "Verify operator and broker health",
          "Review logs for new warnings",
          "Recheck rollback assumptions",
          "Document observed compatibility issues",
        ],
      },
    ],
    importantDecision: {
      title: "Treat operator and broker upgrades as separate validation phases",
      body:
        "Running the operator upgrade and the Kafka upgrade as a single combined check made it hard to attribute failures in these rehearsals. Separating them lengthened the rehearsal, but a regression in operator reconciliation no longer looked the same as a broker-side issue, which made each one easier to investigate.",
    },
    limitations: [
      "A checklist cannot prove that all production workloads, traffic patterns, schemas, or failure modes are safe",
      "Rehearsal traffic is rarely identical to production traffic",
      "Some regressions only appear under load or over longer time windows",
      "The checklist is only as useful as the comparison between pre-upgrade and post-upgrade state",
    ],
    whenNotToApply:
      "Exact validation steps vary based on Kafka version, Strimzi version, deployment architecture, and the guarantees the applications need. A fully managed Kafka offering where operator and broker behaviour are not surfaced may need a different shape of checklist.",
    conclusion:
      "During these upgrade rehearsals, the most useful single change was splitting validation into operator-side and broker-side phases. The checklist above is the form that ended up being practical to run; it is intentionally not a claim of zero-risk upgrades.",
  },

  {
    slug: "investigating-kubernetes-deployment-failures",
    title: "Investigating Kubernetes deployment failures before blaming CI",
    summary:
      "A decision flow for narrowing down a failed Kubernetes deployment using cluster-level evidence first, and turning to CI orchestration once the cluster-side picture is clear.",
    introduction:
      "This note describes the order in which I investigate a failed Kubernetes deployment. In the observed deployments, starting from Kubernetes events and pod descriptions identified the cause faster than starting from the CI pipeline log, because the pipeline log usually shows the symptom rather than the underlying cluster behaviour.",
    problem:
      "Deployments can fail intermittently across environments with a mix of pod-level, configuration, and pipeline-stage causes. The CI log often shows only that the deployment did not become healthy in time, which is not enough information to choose where to look next.",
    whyDifficult:
      "A pipeline failure message and an application failure message can look similar to a casual reader. Re-running the pipeline sometimes makes a real, reproducible failure appear to fix itself, which encourages classifying real issues as flaky.",
    approach:
      "Use cluster-level evidence first: events, pod description, current and previous container logs, and configuration comparison. Only inspect CI orchestration after the cluster picture is clear, so the pipeline log is read as confirmation rather than as the primary signal.",
    decisionFlow: [
      { step: "Deployment failed", detail: "Start from cluster-level evidence rather than the CI log." },
      { step: "Check Kubernetes events", detail: "Scheduling, image-pull, mounting, probe, or resource issues often appear here first." },
      { step: "Describe the affected pod", detail: "Container state, restart count, conditions, events, image, mounted configuration, and probe settings." },
      { step: "Check image, configuration, probe, resource, and scheduling errors", detail: "Map each event or condition to one of these categories before going further." },
      { step: "Read current and previous container logs", detail: "Previous-container logs are essential after a restart - the current log may be empty or misleading." },
      { step: "Compare environment-specific configuration", detail: "ConfigMaps, Secrets, image tags, environment variables, resource requests, manifests." },
      { step: "Inspect CI orchestration", detail: "Only after the cluster-level evidence is understood, confirm the symptom matches the cause." },
    ],
    subsections: [
      {
        heading: "Start with events",
        body:
          "Kubernetes events often identify scheduling, image-pull, volume-mounting, probe, or resource issues earlier than a generic pipeline failure message. They are a useful first stop because they describe what the cluster tried to do and where it stopped.",
      },
      {
        heading: "Describe the pod",
        body:
          "A pod description surfaces container state, restart count, conditions, recent events, image information, mounted configuration, and readiness and liveness probe settings. Together these usually narrow the cause to a small number of categories.",
      },
      {
        heading: "Check logs (current and previous)",
        body:
          "Current container logs show what the running process is saying now. Previous-container logs show what the process said before the last restart. After a CrashLoopBackOff or OOMKill, the previous logs are usually the ones that explain the failure.",
      },
      {
        heading: "Compare configuration",
        body:
          "Differences in ConfigMaps, Secrets, image tags, environment variables, resource requests, or deployment manifests can make an issue appear environment-specific. A structured comparison against a known-good environment often turns 'flaky in staging' into a specific configuration delta.",
      },
      {
        heading: "Inspect CI after Kubernetes evidence",
        body:
          "Pipeline orchestration should be investigated after determining whether the cluster rejected, failed, or started the workload incorrectly. By that point the CI log usually confirms the cluster-side cause rather than introducing a new theory.",
      },
    ],
    importantDecision: {
      title: "Cluster evidence first, pipeline log second",
      body:
        "Reading Kubernetes events and pod descriptions before opening the CI log added a few minutes at the start of an investigation but, in the failures I investigated, converged on the actual cause faster overall because it avoided spending time on pipeline theories that the cluster could already disprove.",
    },
    limitations: [
      "Some failures originate in external dependencies (registries, network, cloud provider) and need evidence from outside the cluster",
      "Some errors disappear before investigation begins, especially after a retry",
      "Kubernetes events have limited retention",
      "A pod reporting healthy does not guarantee the application is behaving correctly",
    ],
    whenNotToApply:
      "Networking, cloud-provider, storage, or purely application-level failures may require investigation beyond the pod and the pipeline. If the failure is clearly outside the cluster - for example a build step that never produced an image - the CI log is the right starting point instead.",
    conclusion:
      "In the observed deployments, the single most useful habit was reading Kubernetes events and the pod description before opening the CI log. The decision flow above is the shape that habit ended up taking.",
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
      return "Read case study";
  }
}
