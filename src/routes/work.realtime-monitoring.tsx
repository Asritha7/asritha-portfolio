import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyLayout, SimpleArchitectureDiagram } from "@/components/CaseStudyLayout";
import { PROJECTS } from "@/content/portfolio";

const study = PROJECTS.find((c) => c.slug === "realtime-monitoring")!;
const url = "https://asritha.dev/work/realtime-monitoring";

export const Route = createFileRoute("/work/realtime-monitoring")({
  head: () => ({
    meta: [
      { title: `${study.title} - Asritha Nibhanupudi` },
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
          title="Producer → Kafka → Consumer (retry · DLQ)"
          desc="Producers publish to a partitioned topic; consumers process at-least-once, retry transient failures with backoff, and route poison messages to a dead-letter topic."
          nodes={["Producer", "Kafka topic", "Consumer group", "Retry · DLQ"]}
        />
      }
    />
  );
}
