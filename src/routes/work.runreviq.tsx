import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { INDEPENDENT_PROJECTS } from "@/content/portfolio";

const study = INDEPENDENT_PROJECTS.find((project) => project.slug === "runreviq")!;
const url = "https://asritha.dev/work/runreviq";

export const Route = createFileRoute("/work/runreviq")({
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
