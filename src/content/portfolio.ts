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

export type Project = {
  // identity
  title: string;
  slug: string;
  projectType: ProjectType;
  year: string;

  // surface copy
  shortDescription: string;
  myContribution: string;        // one-line, used on cards
  ownershipWording?: string;     // e.g. "Contributed to", "Implemented", "Co-authored"

  // case-study fields (only rendered when present)
  professionalContext?: string;
  problem?: string;
  approach?: string[];
  technologies?: string[];
  challenges?: string[];
  outcome?: string;
  confirmedMetrics?: string[];
  lessons?: string[];

  // links and flags
  publicationUrl?: string;
  confidential: boolean;
  featured: boolean;
  categories: ProjectCategory[];
  tags: string[]; // surfaced on cards (max ~5)
};

export const PROJECTS: Project[] = [
  // ---------------- FEATURED (4) ----------------
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
    approach: [
      "Reusable framework components shared across workflows",
      "REST API integrations for workflow setup, state checks, and verification",
      "Shell-script integrations for environment preparation, teardown, and orchestration",
      "Execution from CI/CD so validation runs on every release candidate",
      "Reporting and diagnostics that surface failing steps with enough context to debug",
      "Explicit handling of asynchronous application behaviour via waits, polling, and retries",
      "Maintenance and scalability practices to keep the framework usable as coverage grew",
    ],
    technologies: ["Cypress", "JavaScript", "REST APIs", "Shell scripting", "GitLab CI"],
    challenges: [
      "Asynchronous application behaviour producing intermittent failures",
      "Keeping the framework maintainable as workflow coverage expanded",
      "Distinguishing real regressions from environment or pipeline noise",
    ],
    outcome:
      "Expanded automated coverage to more than 150 workflows and reduced repetitive manual release-validation effort.",
    confirmedMetrics: ["150+ workflows covered by the framework"],
    lessons: [
      "A flaky test is usually a framework bug, not an app bug - fix it at the source",
      "Maintainability of automation matters more than raw coverage breadth",
    ],
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
    approach: [
      "Automated authentication-flow validation using REST APIs and Cypress",
      "Scripted realm, client, and role setup via the Keycloak Admin REST API",
      "Compared logs and configuration across environments to isolate failures",
      "Identified mismatched client configuration and redirect URIs as a root cause",
      "Standardised the affected configuration across environments",
      "Added CI/CD validation checks to catch the same class of failure earlier",
    ],
    technologies: ["Keycloak", "REST APIs", "OIDC", "Cypress", "Shell scripting", "GitLab CI"],
    challenges: [
      "Tracing intermittent failures across services and environments",
      "Keeping identity-provider configuration consistent as environments evolved",
    ],
    outcome:
      "Configuration-driven authentication failures were reduced after standardising config and adding CI/CD validation checks, improving environment consistency.",
    lessons: [
      "Most authentication failures are configuration failures - automate the configuration first",
      "Environment drift is invisible until something breaks; CI checks make it visible early",
    ],
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
    technologies: ["Apache Kafka", "Strimzi", "Kubernetes", "kubectl", "GitLab CI"],
    challenges: [
      "Distinguishing environment flakiness from real upgrade regressions",
      "Operator reconciliation behaviour changing between versions",
      "Reproducing transient pod and service failures observed during upgrades",
    ],
    outcome:
      "Provided upgrade validation evidence that supported safer Kafka and Strimzi rollouts on Kubernetes.",
    lessons: [
      "Operator-side reconciliation is often where upgrade pain hides, not the broker itself",
      "Validation is only useful when it clearly separates flaky from broken",
    ],
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
    approach: [
      "Analysed Kubernetes events and pod and container logs",
      "Diagnosed pod startup failures and CrashLoopBackOff loops",
      "Identified configuration mismatches in YAML and deployment manifests",
      "Traced pipeline-stage failures to environment-specific causes",
      "Drove configuration consistency across environments",
      "Contributed deployment workflow improvements based on recurring failure patterns",
    ],
    technologies: ["Kubernetes", "kubectl", "YAML", "GitLab CI", "Shell scripting"],
    challenges: [
      "Reproducing environment-specific failures outside the original environment",
      "Distinguishing transient pipeline failures from real deployment regressions",
    ],
    outcome:
      "Recurring deployment and pipeline failure modes were diagnosed and addressed, improving CI/CD reliability.",
    lessons: [
      "Most 'flaky' deployment failures have a real root cause hiding in events or config",
      "Consistent environments cost less than one bad incident",
    ],
    confidential: true,
    featured: true,
    categories: ["Cloud", "Automation"],
    tags: ["Kubernetes", "GitLab CI", "YAML", "Debugging"],
  },

  // ---------------- ADDITIONAL (2) ----------------
  {
    slug: "uim-sensitive-attribute-encryption",
    title: "Sensitive-Attribute Encryption in Oracle UIM",
    projectType: "Engineering Implementation",
    year: "2025",
    shortDescription:
      "Secure handling of sensitive UIM attributes using AES-256 encryption, role-based decryption controls, API-level access, and upgrade and rollback support.",
    myContribution:
      "Contributed to and demonstrated the secure-attribute handling: AES-256 encryption, role-controlled decryption via SecureDataAccessGroup, an opt-in decryptAttributes API parameter, and upgrade and rollback scripts with backward compatibility.",
    ownershipWording: "Contributed to / demonstrated",
    professionalContext:
      "Oracle Unified Inventory Management (UIM) - enterprise inventory platform. Work concerned secure handling of sensitive attributes within the existing platform, not independent ownership of the complete feature.",
    approach: [
      "AES-256 encryption applied to sensitive attributes at the persistence layer",
      "Role-controlled decryption via SecureDataAccessGroup",
      "Opt-in decryptAttributes parameter at the API boundary so plaintext is never returned by default",
      "Upgrade scripts to encrypt existing data in place",
      "Rollback scripts to safely revert to the prior state",
      "Compatibility maintained across Java and PL/SQL layers",
      "Backward compatibility preserved for existing clients",
    ],
    technologies: ["Java", "PL/SQL", "Oracle UIM", "AES-256"],
    challenges: [
      "Preserving backward compatibility while changing how attributes are stored",
      "Coordinating upgrade and rollback paths across Java and PL/SQL layers",
    ],
    lessons: [
      "Secure defaults (plaintext never returned unless explicitly requested) prevent accidental exposure",
      "Reversible migrations matter as much as the forward path",
    ],
    confidential: true,
    featured: false,
    categories: ["Security", "Backend"],
    tags: ["Java", "PL/SQL", "AES-256", "Oracle UIM"],
  },
  {
    slug: "rfid-pin-authentication-research",
    title: "Multi-Level RFID and PIN Authentication Research",
    projectType: "Published Research",
    year: "2024",
    shortDescription:
      "Peer-reviewed standalone access-control system combining RFID and PIN-based authentication, published at IEEE ICMACC 2024.",
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
      "Published as 'Multi-level authentication combining RFID and PIN-based access control' at IEEE ICMACC 2024.",
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
};

export const PUBLIC_REPOS = [
  {
    name: "SONAR-RockVsMine-Prediction-ML-Python",
    href: "https://github.com/Asritha7/SONAR-RockVsMine-Prediction-ML-Python",
    type: "Machine learning - Python",
    description:
      "Binary classifier on the UCI SONAR dataset that predicts whether a sonar return is a rock or a mine using logistic regression.",
    tech: ["Python", "NumPy", "pandas", "scikit-learn"],
  },
  {
    name: "YouTube-Comment-Analysis-Python",
    href: "https://github.com/Asritha7/YouTube-Comment-Analysis-Python",
    type: "Data analysis - Python",
    description:
      "Pulls comments, likes, and dislikes for a given YouTube video via the YouTube Data API and segregates them by keywords.",
    tech: ["Python", "YouTube Data API", "Google Cloud Console"],
  },
];


// Map slug to typed route path for type-safe <Link to=...>
export const PROJECT_ROUTE: Record<string, string> = {
  "automation-framework": "/work/automation-framework",
  "keycloak-identity-flow": "/work/keycloak-identity-flow",
  "kafka-strimzi-upgrade": "/work/kafka-strimzi-upgrade",
  "kubernetes-cicd-reliability": "/work/kubernetes-cicd-reliability",
  "uim-sensitive-attribute-encryption": "/work/uim-sensitive-attribute-encryption",
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
