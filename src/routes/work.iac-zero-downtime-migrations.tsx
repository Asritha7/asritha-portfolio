import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { PROJECTS } from "@/content/portfolio";

const study = PROJECTS.find((p) => p.slug === "iac-zero-downtime-migrations")!;
const url = "https://asritha.dev/work/iac-zero-downtime-migrations";

export const Route = createFileRoute("/work/iac-zero-downtime-migrations")({
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
