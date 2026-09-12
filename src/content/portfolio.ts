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
  eyebrow: "SOFTWARE ENGINEER · BACKEND · CLOUD · PLATFORM ENGINEERING · JAVA · AWS · DISTRIBUTED SYSTEMS",
  headline: "I build reliable software systems across application, cloud, and platform layers.",
  description:
    "I work across the full lifecycle of a service: application changes and integrations, deployment and infrastructure, monitoring, failure recovery, and production troubleshooting.",
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

// Private - never rendered. Used to track claim provenance internally.
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
  // Compact homepage-card copy (two paragraphs). When present, the homepage
  // card renders these instead of the labelled Problem/Contribution/Result
  // block so the card stays under ~45 visible words.
  cardContribution?: string;
  cardResult?: string;
  ownershipWording?: string;
  scopeNote?: string; // rendered near start of case study when present

  // case-study depth (rendered only when present)
  professionalContext?: string; // "Context"
  problem?: string;
  // Optional compressed summary copy used in the case-study Summary panel.
  // Falls back to derived first-sentence of problem/outcome when absent.
  summaryProblem?: string;
  summaryRole?: string;
  summaryResult?: string;
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
    slug: "java-application-service-engineering",
    title: "Java Application and Service Engineering",
    projectType: "Professional Work",
    year: "2026",
    shortDescription:
      "Contributing to Java service development on a subledger platform - application changes, configuration and dependency updates, integration work, and merge-request review in GitLab.",
    myContribution:
      "Developing Java application and configuration changes, integrating services with platform components, and taking changes through GitLab merge-request review, build, and deployment.",
    cardContribution:
      "Developing Java application, configuration, build, and dependency changes, and integrating services with surrounding platform components.",
    cardResult:
      "Changes move through GitLab merge-request review with build and integration checks before deployment.",
    ownershipWording: "Contributed to",
    summaryProblem: "Service changes had to land safely in a platform with many integration points.",
    summaryRole: "Developing Java application, configuration, and integration changes within a defined service scope.",
    summaryResult: "Changes ship through reviewed merge requests with build and integration validation.",
    scopeNote:
      "This case study covers my contribution to defined services rather than ownership of the wider platform.",
    professionalContext:
      "Subledger Technology platform inside Asset & Wealth Management. The platform spans on-prem and multi-region AWS; my work sits on the service layer and its integrations.",
    problem:
      "Application changes in a platform with many integration points can fail late - at build, dependency resolution, or integration time - rather than in the change itself.",
    constraints: [
      "Every change goes through merge-request review before it can be deployed",
      "Services must stay compatible with existing consumers and upstream data contracts",
      "Dependency and build changes must not alter runtime behaviour silently",
    ],
    approach: [
      "Developing Java application and configuration changes within a defined service scope",
      "Updating build and dependency configuration when versions or transitive conflicts require it",
      "Integrating services with platform components such as messaging, storage, and relational data",
      "Raising, reviewing, and revising changes through GitLab merge requests",
      "Adding or extending tests so integration behaviour is checked before deployment",
      "Troubleshooting behaviour reported in higher environments and production",
    ],
    decision: {
      decision:
        "Keep integration behaviour covered by tests that run in the pipeline rather than relying on manual verification after deployment.",
      why: "Integration mistakes - a changed contract, a missing configuration value, an unexpected dependency version - were the failures most likely to surface late and cost the most time to trace.",
      tradeoff:
        "Pipelines take longer and the tests need maintenance when contracts change, but failures are attributed before promotion instead of after.",
    },
    alternatives: [
      "Relying on manual verification in a shared environment after deployment (faster per change, but failures surface later and are harder to attribute)",
      "Pinning every dependency indefinitely to avoid build churn (stable short-term, but accumulates upgrade risk)",
    ],
    edgeCases: [
      "Transitive dependency upgrades that compile cleanly but change runtime behaviour",
      "Configuration values present in one environment and absent in another",
      "Changes that pass in isolation but break a consumer's expectations",
    ],
    technologies: ["Java", "REST APIs", "PostgreSQL", "GitLab", "GitLab CI"],
    challenges: [
      "Keeping integration contracts stable while services evolve",
      "Diagnosing failures that originate in configuration or dependency changes rather than application logic",
    ],
    outcome:
      "Application, configuration, and integration changes in my scope ship through reviewed merge requests with build and integration checks, so integration problems are caught before deployment rather than in a shared environment.",
    learned:
      "Most of the time I spent on failing changes traced back to configuration or dependency differences rather than application logic, which is why I now check those first.",
    wouldImprove:
      "I would push more contract-level checks into the pipeline so a change that breaks a consumer fails in review rather than in a shared environment.",
    ownership: {
      team: ["The wider platform, its architecture, and its release process are owned by the broader team"],
      implemented: [
        "Java application and configuration changes within my service scope",
        "Build and dependency updates for the services I worked on",
        "Tests covering integration behaviour for those services",
      ],
      contributedTo: ["Service integration design within my scope", "Merge-request review of related changes"],
      investigated: ["Build, dependency, and integration failures on the services I worked on"],
      validated: ["Service behaviour through pipeline builds and integration tests"],
    },
    confidential: true,
    featured: true,
    categories: ["Backend", "APIs"],
    tags: ["Java", "REST APIs", "PostgreSQL", "GitLab CI", "Integration"],
  },
  {
    slug: "aws-microservices-cdk-ecs",
    title: "AWS Platform and Event-Driven Systems",
    projectType: "Professional Work",
    year: "2026",
    shortDescription:
      "Building and maintaining AWS-native services with CDK and CloudFormation - ECS Fargate, Lambda, API Gateway, Aurora PostgreSQL - and event-driven integrations over Kafka/MSK, Debezium CDC, EventBridge, and SQS.",
    myContribution:
      "Building and maintaining service infrastructure with AWS CDK and CloudFormation, and developing event-driven integrations using Kafka/MSK, Debezium CDC, EventBridge, SQS with dead-letter queues, and S3.",
    cardContribution:
      "Building AWS service infrastructure with CDK and CloudFormation, and developing event-driven integrations over Kafka/MSK, Debezium CDC, EventBridge, and SQS.",
    cardResult:
      "Routing, authentication, database access, and event wiring live in version-controlled infrastructure definitions rather than console configuration.",
    ownershipWording: "Contributed to",
    summaryProblem: "New services needed a repeatable AWS deployment and event-integration pattern.",
    summaryRole: "Building service infrastructure and event-driven integrations within a defined scope.",
    summaryResult: "Deployment and event wiring moved into version-controlled infrastructure definitions.",
    scopeNote:
      "This case study covers my contribution to a defined service and infrastructure scope rather than ownership of the wider platform.",
    professionalContext:
      "Subledger Technology platform inside Asset & Wealth Management. The wider platform spans on-prem and multi-region AWS; this work focused on the AWS-native services slice, its infrastructure-as-code, and its event-driven integrations.",
    problem:
      "New services needed a consistent way to ship on AWS - private networking, container runtime, database access, auth - and a consistent way to move data between services asynchronously without each team inventing its own pattern.",
    constraints: [
      "Everything provisioned through code review, not the AWS console",
      "Services had to fit a hybrid model spanning on-prem and multi-region AWS",
      "Traffic had to stay on private networking paths",
      "Event delivery needed explicit failure handling rather than best-effort retries",
    ],
    approach: [
      "Defining service infrastructure in CDK and CloudFormation so the deployment shape is reviewable alongside the code",
      "Running services on ECS Fargate, with Lambda for event-driven and asynchronous edges",
      "Using Aurora PostgreSQL as the system of record, with schema changes applied through Flyway migrations",
      "Exposing services through API Gateway with routing and authentication expressed as infrastructure code",
      "Keeping traffic on private networking paths using VPC endpoints, PrivateLink, and hybrid connectivity",
      "Developing event-driven integrations over Kafka/MSK and Debezium change data capture, with EventBridge routing, SQS queues, dead-letter queues for poison messages, and S3 for durable payloads",
    ],
    decision: {
      decision:
        "Give every asynchronous consumer an explicit dead-letter path instead of relying on retries alone.",
      why: "A single unprocessable message can otherwise stall a consumer or be silently dropped; a dead-letter queue keeps the failure visible and the stream moving.",
      tradeoff:
        "Dead-letter queues need monitoring and a replay path, which is extra operational surface per consumer.",
    },
    alternatives: [
      "Console-driven networking, routing, and auth configuration (faster initially, but invisible to source control and prone to drift)",
      "Synchronous service-to-service calls instead of events (simpler to trace, but couples availability of the two services)",
      "Application-level polling instead of change data capture (fewer moving parts, but higher latency and more load on the database)",
    ],
    edgeCases: [
      "Duplicate event delivery requiring idempotent consumers",
      "Change-data-capture connector restarts replaying from an earlier offset",
      "Messages landing in a dead-letter queue with no owner watching it",
      "Cold-start behaviour on Lambda paths at the asynchronous edges",
    ],
    technologies: [
      "AWS",
      "AWS CDK",
      "CloudFormation",
      "ECS Fargate",
      "AWS Lambda",
      "API Gateway",
      "Aurora PostgreSQL",
      "Flyway",
      "Kafka / MSK",
      "Debezium",
      "EventBridge",
      "SQS",
      "S3",
    ],
    challenges: [
      "Keeping the AWS-native slice consistent with on-prem services in the hybrid model",
      "Making asynchronous integrations safe to retry without duplicating effects",
      "Encoding routing and auth as infrastructure code without slowing routine changes",
    ],
    outcome:
      "Services in my scope ship with a consistent, reviewable deployment shape on AWS, and their event integrations have explicit retry and dead-letter behaviour instead of implicit best-effort delivery.",
    learned:
      "Infrastructure that is reviewable in the same diff as the code is easier to reason about than console configuration, especially when the same change has to ship across regions.",
    wouldImprove:
      "I would invest more in a shared construct library so a new service can adopt the platform defaults for networking, routing, and event wiring in a few lines.",
    ownership: {
      team: ["The wider platform spanning on-prem and multi-region AWS is owned by the broader team"],
      implemented: [
        "Service infrastructure-as-code in CDK within my scope",
        "Containerised services on ECS Fargate backed by Aurora PostgreSQL within my scope",
        "Lambda handlers and queue consumers for asynchronous edges within my scope",
      ],
      contributedTo: ["Conventions for routing and authentication expressed as infrastructure code"],
      integrated: [
        "Kafka/MSK topics, Debezium change data capture, EventBridge rules, SQS queues and dead-letter queues, and S3, from the service side",
        "The hybrid API gateway layer spanning on-prem and multi-region AWS, from the service side",
      ],
      investigated: ["Event replay, duplicate delivery, and Lambda cold-start behaviour within my scope"],
      validated: ["Service and event-flow behaviour through integration tests gated in CI"],
    },
    confidential: true,
    featured: true,
    categories: ["Cloud", "Distributed Systems", "Backend"],
    tags: ["AWS CDK", "ECS Fargate", "Lambda", "Kafka / MSK", "Debezium", "EventBridge"],
  },
  {
    slug: "reliability-multi-region-infrastructure",
    title: "Reliability and Multi-Region Infrastructure",
    projectType: "Professional Work",
    year: "2026",
    shortDescription:
      "Strengthening deployment and recovery behaviour with blue-green releases, ECS Auto Scaling, multi-region disaster recovery on Aurora Global Database, and fault-injection exercises using AWS FIS.",
    myContribution:
      "Contributing to blue-green deployment and auto-scaling configuration, and executing multi-region disaster-recovery and fault-injection exercises to check recovery behaviour.",
    cardContribution:
      "Contributing to blue-green deployment and ECS Auto Scaling configuration, and executing multi-region disaster-recovery exercises.",
    cardResult:
      "Recovery behaviour is exercised deliberately with AWS FIS rather than discovered during an incident.",
    ownershipWording: "Contributed to",
    summaryProblem: "Recovery behaviour was assumed rather than exercised.",
    summaryRole: "Contributing to deployment and scaling configuration and running recovery exercises.",
    summaryResult: "Failover and rollback paths are rehearsed and their behaviour recorded.",
    scopeNote:
      "This case study covers my contribution to reliability work on defined services rather than ownership of the platform's resilience strategy.",
    professionalContext:
      "Multi-region AWS services on a financial platform where an unavailable service and a wrong result both matter.",
    problem:
      "Deployments and regional failure paths existed, but their behaviour under load and during failover was largely assumed rather than observed.",
    constraints: [
      "Exercises had to run without risking production data",
      "Rollback had to be possible at any point during a release",
      "Cross-region replication lag had to be accounted for in recovery expectations",
    ],
    approach: [
      "Contributing to blue-green deployment configuration so a release can be shifted back without redeploying",
      "Tuning ECS Auto Scaling policies against observed load rather than fixed capacity guesses",
      "Configuring and exercising multi-region disaster recovery on Aurora Global Database",
      "Executing fault-injection experiments with AWS FIS to observe how services behave when a dependency degrades",
      "Recording what each exercise showed, including the cases where recovery was slower than expected",
    ],
    decision: {
      decision:
        "Exercise failure paths deliberately with fault injection instead of waiting for a real incident to reveal them.",
      why: "Recovery configuration that is never exercised tends to be correct only on paper; scaling and failover assumptions are easiest to check while nobody is paged.",
      tradeoff:
        "Experiments cost time and need careful scoping so they do not affect real traffic or data.",
    },
    alternatives: [
      "Relying on documented runbooks alone (cheap, but does not verify the system behaves as the runbook assumes)",
      "In-place rolling deployments only (simpler, but rollback is slower than shifting traffic back)",
    ],
    edgeCases: [
      "Failover completing while replication lag left recent writes behind",
      "Auto Scaling reacting after the load spike had already caused errors",
      "Health checks reporting healthy while a downstream dependency was degraded",
    ],
    technologies: [
      "AWS",
      "ECS Fargate",
      "ECS Auto Scaling",
      "Aurora Global Database",
      "AWS FIS",
      "CloudFormation",
    ],
    challenges: [
      "Designing experiments that are informative without being risky",
      "Setting recovery expectations that account for replication lag",
    ],
    outcome:
      "Failover and rollback paths for the services in my scope are rehearsed rather than assumed, and the observed behaviour - including slower-than-expected cases - is written down.",
    learned:
      "A recovery path that has never been exercised is an assumption. Running the experiment is usually cheaper than discovering the gap during an incident.",
    wouldImprove:
      "I would run fault-injection experiments on a regular schedule rather than around specific changes, so drift in recovery behaviour is noticed early.",
    ownership: {
      team: ["The platform's overall resilience strategy is owned by the wider team"],
      contributedTo: [
        "Blue-green deployment configuration for services in my scope",
        "ECS Auto Scaling policies for those services",
      ],
      integrated: ["Aurora Global Database replication into the recovery path for my scope"],
      investigated: ["Failover, scaling, and degradation behaviour observed during exercises"],
      validated: ["Recovery behaviour through disaster-recovery and AWS FIS exercises"],
    },
    confidential: true,
    featured: true,
    categories: ["Cloud", "Observability"],
    tags: ["Blue-green", "ECS Auto Scaling", "Aurora Global Database", "AWS FIS", "DR"],
  },
  {
    slug: "observability-and-slos",
    title: "Observability and SLOs",
    projectType: "Professional Work",
    year: "2026",
    shortDescription:
      "Building service dashboards and SLO-based monitoring with Prometheus, Grafana, and CloudWatch, and using them during production troubleshooting.",
    myContribution:
      "Developing and integrating service metrics, dashboards, and SLO-based alerts across Prometheus, Grafana, and CloudWatch, and using them to troubleshoot production behaviour.",
    cardContribution:
      "Building service metrics, dashboards, and SLO-based alerts with Prometheus, Grafana, and CloudWatch.",
    cardResult:
      "Alerts are tied to service-level objectives, so a page reflects user-visible impact rather than an isolated resource metric.",
    ownershipWording: "Contributed to",
    summaryProblem: "Alerts fired on resource metrics that did not always mean user-visible impact.",
    summaryRole: "Building metrics, dashboards, and SLO-based alerting for services in my scope.",
    summaryResult: "Monitoring reflects service-level objectives and supports faster troubleshooting.",
    scopeNote:
      "This case study covers monitoring work on defined services rather than ownership of the platform's observability stack.",
    professionalContext:
      "Multi-region AWS and on-prem services where operational signals come from both Prometheus/Grafana and CloudWatch.",
    problem:
      "Monitoring was resource-centric: alerts fired on CPU, memory, or queue depth, which did not reliably indicate whether the service was actually failing its consumers.",
    constraints: [
      "Signals had to work across both AWS-native and on-prem service paths",
      "Alerts had to be actionable enough to page on",
      "Dashboards had to be usable by someone unfamiliar with the service internals",
    ],
    approach: [
      "Instrumenting services with request, latency, error, and queue-processing metrics",
      "Defining service-level objectives for availability and latency on the paths consumers depend on",
      "Building Grafana dashboards that show the objective first and the supporting resource metrics second",
      "Wiring CloudWatch metrics, logs, and alarms for AWS-managed components such as queues, databases, and Lambda paths",
      "Alerting on objective burn and on dead-letter growth rather than on raw resource thresholds",
      "Using these signals during production troubleshooting to narrow a symptom to a layer",
    ],
    decision: {
      decision:
        "Alert on service-level objective burn and dead-letter growth rather than on raw CPU or memory thresholds.",
      why: "Resource thresholds produced pages nobody could act on, while real consumer-visible failures could stay invisible; objective-based alerts describe impact.",
      tradeoff:
        "Objectives need agreement and periodic revision, and a burn-rate alert is less immediately obvious than 'CPU is high'.",
    },
    alternatives: [
      "Keeping threshold alerts on resource metrics (simple to configure, but weak signal-to-noise)",
      "Relying on log searches during incidents only (flexible, but slow and dependent on knowing what to search for)",
    ],
    edgeCases: [
      "Metrics missing for a short window after a deployment, briefly resembling an outage",
      "Objectives satisfied in aggregate while one consumer path was failing",
      "Alerts that fired correctly but pointed at a symptom one layer below the cause",
    ],
    technologies: ["Prometheus", "Grafana", "CloudWatch", "SLOs", "AWS"],
    challenges: [
      "Choosing objectives that reflect consumer expectations rather than convenient numbers",
      "Keeping dashboards readable as the number of services grew",
    ],
    outcome:
      "Services in my scope have dashboards and alerts tied to service-level objectives, and production investigations start from a signal that indicates consumer impact rather than a resource metric.",
    learned:
      "An alert is only useful if someone can act on it. Tying alerts to objectives made it clearer which pages needed a response and which needed a fix in the monitoring itself.",
    wouldImprove:
      "I would connect dashboards more directly to trace data so moving from an objective breach to the failing request path takes fewer steps.",
    ownership: {
      team: ["The platform-wide observability stack is operated by the wider team"],
      implemented: [
        "Service instrumentation and dashboards for services in my scope",
        "SLO-based alert rules for those services",
      ],
      contributedTo: ["Definition of availability and latency objectives for my scope"],
      integrated: ["CloudWatch metrics, logs, and alarms for AWS-managed components"],
      investigated: ["Production issues using metrics, logs, and dashboards"],
      validated: ["Alert behaviour against real incidents and exercises"],
    },
    confidential: true,
    featured: true,
    categories: ["Observability", "Cloud"],
    tags: ["Prometheus", "Grafana", "CloudWatch", "SLOs", "Troubleshooting"],
  },
  {
    slug: "iac-zero-downtime-migrations",
    title: "Infrastructure as Code and Zero-Downtime Migrations",
    projectType: "Professional Work",
    year: "2026",
    shortDescription:
      "Executing CloudFormation and database migrations on running services without downtime, using staged changes, Flyway migrations, and reviewable infrastructure definitions.",
    myContribution:
      "Executed CloudFormation stack and schema migrations on live services in stages, and onboarded services onto the reviewed infrastructure-as-code workflow.",
    cardContribution:
      "Executed staged CloudFormation and Flyway schema migrations on running services, keeping changes reviewable in code.",
    cardResult:
      "Stack and schema changes were applied without taking services offline, with a rollback position at each stage.",
    ownershipWording: "Implemented and contributed to",
    summaryProblem: "Stack and schema changes risked downtime or resource replacement on live services.",
    summaryRole: "Executed staged infrastructure and schema migrations on running services.",
    summaryResult: "Migrations completed without downtime, with a rollback position at each stage.",
    scopeNote:
      "This case study covers migrations I executed on defined services rather than a platform-wide migration programme.",
    professionalContext:
      "Long-lived CloudFormation stacks and Aurora PostgreSQL databases behind services that consumers depend on during business hours.",
    problem:
      "Some infrastructure changes replace resources rather than update them, and some schema changes break running application versions - both can cause downtime if applied in one step.",
    constraints: [
      "Services had to stay available while the change was applied",
      "Every change had to be reviewable in source control before it ran",
      "Old and new application versions had to work against the same schema during a rollout",
    ],
    approach: [
      "Reading change sets before applying them, to see which resources would be replaced rather than updated",
      "Splitting risky changes into stages that are each safe on their own",
      "Making schema changes backwards-compatible first with Flyway migrations - add, backfill, switch reads, then remove",
      "Pairing infrastructure changes with blue-green traffic shifts where a resource had to be replaced",
      "Onboarding services onto the reviewed infrastructure-as-code workflow so future changes follow the same path",
      "Verifying behaviour with metrics and dashboards during and after each stage",
    ],
    decision: {
      decision:
        "Make every schema change backwards-compatible for one release before removing anything.",
      why: "During a rollout both the old and new application versions run at once, so a destructive change in the same step breaks whichever version is not yet updated.",
      tradeoff:
        "A single logical change becomes several releases, which is slower but leaves a safe rollback position at each stage.",
    },
    alternatives: [
      "Applying the full change in one deployment window (fewer steps, but no safe rollback and risk of downtime)",
      "Taking a short maintenance window (predictable, but unnecessary once changes are staged properly)",
    ],
    edgeCases: [
      "CloudFormation updates that quietly replace a resource and change its endpoint",
      "Migrations that lock a table long enough to time out requests",
      "Backfills that must run in batches to avoid replication lag",
    ],
    technologies: ["CloudFormation", "AWS CDK", "Aurora PostgreSQL", "Flyway", "GitLab CI"],
    challenges: [
      "Predicting which infrastructure changes cause replacement",
      "Sequencing schema changes so both application versions keep working",
    ],
    outcome:
      "Stack and schema migrations in my scope were applied to running services without downtime, and each stage left a position the change could be rolled back from.",
    learned:
      "Reading the change set before applying it is the cheapest step in the whole migration, and it is the one that most often changes the plan.",
    wouldImprove:
      "I would automate a pre-apply report that flags replacement-causing changes and long-locking migrations before a reviewer approves them.",
    ownership: {
      team: ["The wider platform's infrastructure standards are owned by the broader team"],
      implemented: [
        "Staged CloudFormation and schema migrations on services in my scope",
        "Flyway migration sequences for backwards-compatible schema changes",
      ],
      contributedTo: ["The reviewed infrastructure-as-code workflow used by those services"],
      investigated: ["Change-set behaviour and migration locking before applying changes"],
      validated: ["Service availability during and after each migration stage"],
    },
    confidential: true,
    featured: true,
    categories: ["Cloud", "Backend"],
    tags: ["CloudFormation", "Flyway", "Aurora PostgreSQL", "Zero downtime", "IaC"],
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
    cardContribution:
      "Developed reusable Cypress utilities and connected workflow automation to CI/CD execution and failure diagnostics.",
    cardResult:
      "Expanded reusable coverage across 150+ workflows while making recurring failures easier to investigate.",
    ownershipWording: "Developed and contributed to",
    summaryProblem: "Release validation depended on repetitive manual steps that hid regressions.",
    summaryRole: "Built reusable framework primitives and wired them into CI/CD execution.",
    summaryResult: "Coverage grew past 150 workflows with clearer signal on real regressions.",
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
      contributedTo: ["CI/CD integration and execution design for the automation framework"],
      investigated: ["Recurring flaky-failure patterns across workflows"],
      validated: ["Workflow coverage across release candidates"],
    },
    confidential: true,
    featured: false,
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
    cardContribution:
      "Automated selected Keycloak realm, client, and identity-flow configuration through REST APIs, scripts, and CI/CD validation.",
    cardResult:
      "Configuration covered by the automation moved from manual per-environment setup to scripted, CI-validated setup, allowing mismatches to be detected earlier.",
    ownershipWording: "Implemented and contributed to",
    summaryProblem: "Auth failures appeared intermittently as identity-provider config drifted between environments.",
    summaryRole: "Scripted realm and client setup and automated flow validation in CI.",
    summaryResult: "Covered configuration moved from manual per-environment setup to scripted, CI-validated setup.",
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
      "Configuration covered by the automation moved from manual per-environment setup to scripted, CI-validated setup, allowing mismatches to be detected earlier in the release process.",
    learned:
      "In this system, several recurring authentication failures were caused by configuration drift rather than by the authentication implementation itself. For this failure class, automating the affected configuration addressed the root cause more directly than adding additional flow-level checks.",
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
    featured: false,
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
    summaryProblem: "Kafka and Strimzi upgrades risked message-flow and operator-side regressions.",
    summaryRole: "Contributed to upgrade validation across producer, consumer, and operator behaviour.",
    summaryResult: "Rehearsals separated operator-side issues from broker issues, supporting safer rollouts.",
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
      why: "During the upgrade rehearsals I worked on, several difficult failures originated in Strimzi operator reconciliation rather than broker behaviour, but the two were being treated as one signal.",
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
      "During these upgrade rehearsals, several difficult failures appeared in operator reconciliation rather than broker behaviour. In these rehearsals, validation was most useful when it clearly separated transient behaviour from confirmed regressions.",
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
    featured: false,
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
    summaryProblem: "Deployments failed intermittently across pod, config, and pipeline-stage causes.",
    summaryRole: "Investigated failures from cluster events first and contributed workflow improvements.",
    summaryResult: "Recurring failure modes were triaged consistently and addressed at their actual layer.",
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
      "Several deployment failures initially classified as flaky had identifiable causes in Kubernetes events, deployment configuration, or environment state. Improving configuration consistency reduced repeated investigation of environment-specific deployment failures.",
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
// Additional Engineering Work: non-featured professional/implementation work
// only. Research lives in its own Published Research section so it never
// appears twice on the homepage.
export const ADDITIONAL_PROJECTS: Project[] = PROJECTS.filter(
  (p) => !p.featured && p.projectType !== "Published Research",
);

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
    role: "Analyst, Software Engineering (SWE I)",
    org: "Goldman Sachs",
    date: "May 2026 - Present",
    place: "Bengaluru · On-site",
    scope:
      "Software engineering on the Subledger Technology platform for Asset & Wealth Management - Java services, AWS platform engineering, event-driven integrations, reliability, and observability.",
    contributions: [
      "Contributing to Java service development, including application, configuration, build, dependency, and integration changes reviewed through GitLab merge requests",
      "Building and maintaining AWS infrastructure with CDK and CloudFormation - ECS Fargate, Lambda, API Gateway, Aurora PostgreSQL with Flyway migrations, and private networking with hybrid connectivity",
      "Developing and integrating event-driven flows over Kafka/MSK, Debezium change data capture, EventBridge, SQS with dead-letter queues, and S3",
      "Strengthening reliability through blue-green deployments, ECS Auto Scaling, multi-region disaster recovery on Aurora Global Database, and fault-injection exercises with AWS FIS",
      "Executed zero-downtime CloudFormation and schema migrations, and onboarded services onto the reviewed infrastructure-as-code workflow",
      "Built Prometheus, Grafana, and CloudWatch dashboards with SLO-based monitoring, and used them during production troubleshooting",
    ],
    stack: ["Java", "AWS", "CDK", "Kafka / MSK", "Prometheus", "Grafana"],
  },
  {
    role: "Associate Quality Analyst",
    org: "Oracle",
    date: "Aug 2024 - Apr 2026",
    place: "Hyderabad",
    scope:
      "Software engineering, automation, and infrastructure responsibilities for enterprise services.",
    contributions: [
      "Built and integrated 150+ modular Cypress workflows into GitLab CI, plus REST API integrations for Keycloak and OpenSearch",
      "Investigated Kubernetes deployment failures and authentication issues, and contributed CI/CD reliability improvements",
    ],
    stack: ["Cypress", "Kubernetes", "Keycloak", "GitLab CI"],
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
    items: ["Java", "TypeScript", "Python", "C++", "REST APIs", "PostgreSQL"],
  },
  {
    label: "Cloud and Infrastructure",
    items: [
      "AWS",
      "AWS CDK",
      "CloudFormation",
      "ECS Fargate",
      "Lambda",
      "API Gateway",
      "Aurora PostgreSQL",
      "VPC / PrivateLink",
      "Kubernetes",
      "Docker",
    ],
  },
  {
    label: "Distributed Systems",
    items: ["Kafka / MSK", "Debezium CDC", "EventBridge", "SQS / DLQ"],
  },
  {
    label: "Reliability and Delivery",
    items: [
      "GitLab CI/CD",
      "Prometheus",
      "Grafana",
      "CloudWatch",
      "SLOs",
      "Disaster recovery",
      "Blue-green deployments",
      "AWS FIS",
    ],
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
          "Rerunning the workflow should not create duplicate clients, roles, flows, or identity-provider entries. The pattern is to look up resources by a stable identifier (for example client ID or alias), create them only when absent, and update only the approved subset of fields when they exist. This is an idempotency goal, not a guarantee - it holds only for the fields the workflow actually manages.",
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
  "java-application-service-engineering": "/work/java-application-service-engineering",
  "aws-microservices-cdk-ecs": "/work/aws-microservices-cdk-ecs",
  "reliability-multi-region-infrastructure": "/work/reliability-multi-region-infrastructure",
  "observability-and-slos": "/work/observability-and-slos",
  "iac-zero-downtime-migrations": "/work/iac-zero-downtime-migrations",
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

// Pull the first sentence out of a longer paragraph (used by summary panels
// and homepage cards). Does not invent content - just truncates at the first
// terminal punctuation.
export function firstSentence(s?: string): string {
  if (!s) return "";
  const m = s.match(/^[^.!?]+[.!?]/);
  return (m ? m[0] : s).trim();
}

// Notes - slug to dedicated article route, plus topic tags and a simple
// reading-time estimate calculated from the article fields.
export const NOTE_ROUTE: Record<string, string> = {
  "automating-keycloak-identity-workflows": "/notes/keycloak-configuration-drift",
  "validating-kafka-strimzi-upgrades": "/notes/kafka-strimzi-upgrade-checklist",
  "investigating-kubernetes-deployment-failures": "/notes/kubernetes-deployment-debugging",
};

export const NOTE_TAGS: Record<string, string[]> = {
  "automating-keycloak-identity-workflows": ["Keycloak", "Identity", "Automation"],
  "validating-kafka-strimzi-upgrades": ["Kafka", "Strimzi", "Upgrades"],
  "investigating-kubernetes-deployment-failures": ["Kubernetes", "Debugging", "CI/CD"],
};

export function noteReadingTimeMinutes(n: EngineeringNote): number {
  const parts: string[] = [
    n.summary,
    n.introduction,
    n.problem,
    n.whyDifficult,
    n.approach,
    n.importantDecision.title,
    n.importantDecision.body,
    n.conclusion,
    n.whenNotToApply,
    ...(n.limitations ?? []),
    ...(n.practicalSteps ?? []),
    ...((n.checklists ?? []).flatMap((c) => [c.heading, ...c.items])),
    ...((n.decisionFlow ?? []).flatMap((d) => [d.step, d.detail ?? ""])),
    ...((n.subsections ?? []).flatMap((s) => [s.heading, s.body])),
  ];
  const words = parts.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 220));
}
