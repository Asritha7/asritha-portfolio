import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyLayout, SimpleArchitectureDiagram } from "@/components/CaseStudyLayout";
import { CASE_STUDIES } from "@/content/portfolio";

const study = CASE_STUDIES.find((c) => c.slug === "api-infrastructure")!;
const url = "https://asritha.dev/work/api-infrastructure";

export const Route = createFileRoute("/work/api-infrastructure")({
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
          title="Client → Edge → Routed upstream"
          desc="Clients reach a regional edge that authenticates, shapes, and routes requests to either an on-prem service path or an AWS service path based on policy and health."
          nodes={["Client", "Regional Edge", "Router / Policy", "On-prem · AWS"]}
        />
      }
    />
  );
}
