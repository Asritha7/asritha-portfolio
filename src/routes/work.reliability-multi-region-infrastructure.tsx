import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { PROJECTS } from "@/content/portfolio";

const study = PROJECTS.find((p) => p.slug === "reliability-multi-region-infrastructure")!;
const url = "https://asritha.dev/work/reliability-multi-region-infrastructure";

export const Route = createFileRoute("/work/reliability-multi-region-infrastructure")({
  head: () => ({
    meta: [
      { title: `${study.title} - Asritha Nibhanupudi` },
      { name: "description", content: study.shortDescription },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:title", content: study.title },
      { property: "og:description", content: study.shortDescription },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: () => <CaseStudyLayout study={study} />,
});
