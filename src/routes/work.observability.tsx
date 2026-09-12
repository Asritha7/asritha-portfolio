import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyLayout, SimpleArchitectureDiagram } from "@/components/CaseStudyLayout";
import { CASE_STUDIES } from "@/content/portfolio";

const study = CASE_STUDIES.find((c) => c.slug === "observability")!;
const url = "https://asritha.dev/work/observability";

export const Route = createFileRoute("/work/observability")({
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
          title="Service → Prometheus → Grafana / Alerts"
          desc="Each service exposes /metrics, scraped by Prometheus; Grafana renders dashboards and alert rules notify on-call when SLIs drift."
          nodes={["Service /metrics", "Prometheus", "Grafana", "On-call alerts"]}
        />
      }
    />
  );
}
