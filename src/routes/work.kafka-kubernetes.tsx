import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyLayout, SimpleArchitectureDiagram } from "@/components/CaseStudyLayout";
import { CASE_STUDIES } from "@/content/portfolio";

const study = CASE_STUDIES.find((c) => c.slug === "kafka-kubernetes")!;
const url = "https://asritha.dev/work/kafka-kubernetes";

export const Route = createFileRoute("/work/kafka-kubernetes")({
  head: () => ({
    meta: [
      { title: `${study.title} — Asritha Nibhanupudi` },
      { name: "description", content: study.blurb },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:title", content: study.title },
      { property: "og:description", content: study.blurb },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: study.title,
          author: { "@type": "Person", name: "Asritha Nibhanupudi" },
          description: study.blurb,
          url,
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <CaseStudyLayout
      study={study}
      diagram={
        <SimpleArchitectureDiagram
          title="CI pipeline: provision → upgrade → validate"
          desc="GitLab CI provisions an ephemeral Kubernetes cluster, installs Strimzi, runs producer/consumer workloads, performs the upgrade, and validates message delivery and operator reconciliation."
          nodes={["Provision K8s", "Baseline workload", "Upgrade", "Validate"]}
        />
      }
    />
  );
}
