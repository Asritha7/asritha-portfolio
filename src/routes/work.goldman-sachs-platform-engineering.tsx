import { createFileRoute } from "@tanstack/react-router";
import { CombinedCaseStudy } from "@/components/CombinedCaseStudy";
import { GS_PARENT, GS_SUBSTUDIES } from "@/content/portfolio";

const url = "https://asritha.dev/work/goldman-sachs-platform-engineering";

export const Route = createFileRoute("/work/goldman-sachs-platform-engineering")({
  head: () => ({
    meta: [
      { title: `${GS_PARENT.title} - Asritha Nibhanupudi` },
      { name: "description", content: GS_PARENT.shortDescription },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:title", content: GS_PARENT.title },
      { property: "og:description", content: GS_PARENT.shortDescription },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: () => <CombinedCaseStudy parent={GS_PARENT} studies={GS_SUBSTUDIES} />,
});
